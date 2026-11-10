/**
 * `npm run content:before-after` — move the home page's "Əvvəl & Sonra" pairs into the new
 * "Əvvəl & Sonra" collection (PLAN.md §12, step 5), with their titles/captions in az/en/ru, then
 * empty the block's own list so the section reads from the collection. Safe to re-run: pairs that
 * already exist (same before + after images) are skipped.
 */
import config from '@payload-config'
import { getPayload } from 'payload'

const payload = await getPayload({ config })
const locales = ['az', 'en', 'ru'] as const
const idOf = (v: unknown) => (v && typeof v === 'object' ? (v as { id: number }).id : (v as number | undefined))

const home = (await payload.find({ collection: 'pages', locale: 'az', where: { slug: { equals: 'home' } }, limit: 1, depth: 0 })).docs[0]
if (!home) throw new Error('home page not found')

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Pair = { title?: string; caption?: string; before?: unknown; after?: unknown; project?: unknown }
const byLocale = {} as Record<(typeof locales)[number], Pair[]>
for (const locale of locales) {
  const doc = await payload.findByID({ collection: 'pages', id: home.id, locale, depth: 0, fallbackLocale: false })
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const block = ((doc.layout ?? []) as any[]).find((b) => b.blockType === 'beforeAfter')
  byLocale[locale] = (block?.pairs ?? []) as Pair[]
}

let created = 0
for (const [i, p] of byLocale.az.entries()) {
  const before = idOf(p.before)
  const after = idOf(p.after)
  if (!before || !after) continue
  const exists = await payload.find({
    collection: 'before-after',
    where: { and: [{ before: { equals: before } }, { after: { equals: after } }] },
    limit: 1,
    depth: 0,
  })
  if (exists.docs.length) continue
  const doc = await payload.create({
    collection: 'before-after',
    locale: 'az',
    data: { title: p.title ?? `Əvvəl & Sonra ${i + 1}`, caption: p.caption, before, after, project: idOf(p.project), showOnHome: true },
  })
  for (const l of ['en', 'ru'] as const) {
    const t = byLocale[l][i]
    if (t?.title) await payload.update({ collection: 'before-after', id: doc.id, locale: l, data: { title: t.title, caption: t.caption } })
  }
  created++
}

// the block now reads from the collection
for (const locale of locales) {
  const doc = await payload.findByID({ collection: 'pages', id: home.id, locale, depth: 0, fallbackLocale: false })
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const layout = ((doc.layout ?? []) as any[]).map((b) => (b.blockType === 'beforeAfter' ? { ...b, pairs: [] } : b))
  await payload.update({ collection: 'pages', id: home.id, locale, data: { layout }, depth: 0 })
}
console.log(`before/after pairs created: ${created}; home block now reads from the collection`)
process.exit(0)
