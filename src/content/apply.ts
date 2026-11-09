/**
 * Applies src/content/** entries to the CMS as DRAFT versions (published pages stay untouched
 * until an editor presses "Publish" in admin).
 *
 *   npm run content            -> all entries
 *   npm run content -- hovuz   -> only entries whose slug contains "hovuz"
 */
import 'dotenv/config'
import { getPayload } from 'payload'

import config from '@payload-config'
import { initRichText, rt } from '../seed/lib'
import { entries } from './index'
import type { Loc } from './types'

const filter = process.argv.slice(2).find((a) => !a.startsWith('-'))
const BODY_FIELD: Record<string, string> = {
  categories: 'body',
  services: 'body',
  'service-areas': 'body',
  projects: 'body',
  posts: 'content',
}

const warn: string[] = []
const check = (slug: string, l: Loc, title: string, desc: string) => {
  if (title.length > 60) warn.push(`${slug}/${l}: meta title ${title.length} > 60`)
  if (desc.length < 120 || desc.length > 160) warn.push(`${slug}/${l}: meta description ${desc.length} (target 140–155)`)
}

async function main() {
  const payload = await getPayload({ config })
  await initRichText(payload.config)
  const ctx = { disableRevalidate: true }

  for (const e of entries.filter((x) => !filter || x.slug.includes(filter))) {
    const found = await payload.find({
      collection: e.collection,
      where: { slug: { equals: e.slug } },
      locale: 'az',
      limit: 1,
      depth: 0,
      draft: true,
    })
    const doc = found.docs[0] as { id: number; faqs?: (number | { id: number })[] } | undefined
    if (!doc) {
      warn.push(`${e.collection}/${e.slug}: not found`)
      continue
    }

    // extra FAQs (published immediately — they only appear through the draft page that links them)
    let faqIds = (doc.faqs ?? []).map((f) => (typeof f === 'object' ? f.id : f))
    for (const f of e.faqs ?? []) {
      const ex = await payload.find({ collection: 'faqs', where: { question: { equals: f.az.q } }, limit: 1, depth: 0 })
      let id = ex.docs[0]?.id
      if (!id) {
        id = (await payload.create({ collection: 'faqs', locale: 'az', data: { question: f.az.q, answer: rt(f.az.a), showOnFaqPage: false } as never, context: ctx })).id
      }
      for (const l of ['en', 'ru'] as const) {
        await payload.update({ collection: 'faqs', id, locale: l, data: { question: f[l].q, answer: rt(f[l].a) }, context: ctx })
      }
      if (!faqIds.includes(id)) faqIds = [...faqIds, id]
    }

    for (const l of ['az', 'en', 'ru'] as Loc[]) {
      const c = e.locales[l]
      if (!c) continue
      check(e.slug, l, c.metaTitle, c.metaDescription)
      const data: Record<string, unknown> = {
        excerpt: c.excerpt,
        meta: { title: c.metaTitle, description: c.metaDescription },
      }
      if (c.slug) data.slug = c.slug
      const bodyField = BODY_FIELD[e.collection]
      if (bodyField && c.html) data[bodyField] = rt(c.html)
      if (l === 'az' && 'faqs' in doc) data.faqs = faqIds
      await payload.update({ collection: e.collection, id: doc.id, locale: l, draft: true, data: data as never, context: ctx })
    }
    payload.logger.info(`✔ ${e.collection}/${e.slug} -> draft`)
  }

  if (warn.length) payload.logger.warn('\n  ' + warn.join('\n  '))
  process.exit(0)
}

try {
  await main()
} catch (err) {
  console.error(err)
  process.exit(1)
}
