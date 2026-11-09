/**
 * Stage 2 — imports turanprojects.az content (src/seed/data/turan.json) into Payload.
 *
 *   SEED_ASSETS_DIR=<folder with downloaded /assets files> npm run seed
 *
 * Idempotent: every document is matched by its AZ slug (or a natural key) and updated.
 */
import 'dotenv/config'
import fs from 'node:fs'
import path from 'node:path'
import { getPayload } from 'payload'

import config from '@payload-config'
import { cleanTitle, initRichText, lastSeg, type L, type Loc, MediaStore, rt, rtText, upsert, upsertGlobal } from './lib'
import { categoryMeta, projectCategoryOf, serviceCategoryOf, teamPlaceholders } from './maps'

type Any = Record<string, any> // eslint-disable-line @typescript-eslint/no-explicit-any
type Doc = { type: string; az: string; alts: Record<Loc, string | null>; locales: Partial<Record<Loc, Any>> }

const dataFile = path.resolve('src/seed/data/turan.json')
const assetsDir = process.env.SEED_ASSETS_DIR
if (!assetsDir) throw new Error('Set SEED_ASSETS_DIR to the folder containing the downloaded /assets tree')

const { docs } = JSON.parse(fs.readFileSync(dataFile, 'utf8')) as { docs: Doc[] }
const byType = (t: string) => docs.filter((d) => d.type === t)
const one = (t: string) => byType(t)[0]

/** Pick a field from each locale -> { az, en, ru } */
const pick = <T>(d: Doc, f: (x: Any) => T): L<T> =>
  Object.fromEntries((['az', 'en', 'ru'] as Loc[]).filter((l) => d.locales[l]).map((l) => [l, f(d.locales[l]!)]))

const slugs = (d: Doc) => pick(d, (x) => lastSeg(x.path))

const seoOf = (x: Any, image?: number) => ({
  meta: { title: cleanTitle(x.title), description: x.description, ...(image ? { image } : {}) },
})

/** Splits base (az) and per-locale overrides out of a locale->data builder. */
function localized(d: Doc, build: (x: Any, l: Loc) => Any) {
  const base = build(d.locales.az!, 'az')
  const locales: L<Any> = {}
  for (const l of ['en', 'ru'] as Loc[]) if (d.locales[l]) locales[l] = build(d.locales[l]!, l)
  return { base, locales }
}

async function run() {
  const payload = await getPayload({ config })
  await initRichText(payload.config)
  const media = new MediaStore(payload, assetsDir!)
  const log = (s: string) => payload.logger.info(s)

  /* ------------------------------------------------ FAQ helper (dedupe by AZ question) */
  const faqIds = new Map<string, number>()
  async function faqsFor(d: Doc, extra: Any = {}) {
    const az: Any[] = d.locales.az?.faqs ?? []
    const ids: (number)[] = []
    for (let i = 0; i < az.length; i++) {
      const q = az[i].q as string
      if (faqIds.has(q)) {
        ids.push(faqIds.get(q)!)
        continue
      }
      const locales: L<Any> = {}
      for (const l of ['en', 'ru'] as Loc[]) {
        const f = d.locales[l]?.faqs?.[i]
        if (f) locales[l] = { question: f.q, answer: rt(f.a) }
      }
      const id = await upsert(payload, {
        collection: 'faqs',
        match: { field: 'question', value: q },
        base: { question: q, answer: rt(az[i].a), ...extra },
        locales,
      })
      faqIds.set(q, id)
      ids.push(id)
    }
    return ids
  }

  /* ------------------------------------------------ project categories */
  log('Project categories…')
  const pl = one('projectsList')
  const tabNames = pick(pl, (x) => (x.tabs as string[]).slice(1))
  const projectCatIds: Record<string, number> = {}
  for (let i = 0; i < (tabNames.az?.length ?? 0); i++) {
    const az = tabNames.az![i]
    projectCatIds[az] = await upsert(payload, {
      collection: 'project-categories',
      match: { field: 'slug', value: lastSeg(az) || az },
      base: { title: az },
      locales: { en: tabNames.en?.[i] ? { title: tabNames.en[i] } : undefined, ru: tabNames.ru?.[i] ? { title: tabNames.ru[i] } : undefined },
    })
  }

  /* ------------------------------------------------ categories (pillar pages) */
  log('Categories (pillar pages)…')
  const categoryIds: Record<string, number> = {}
  const pillarDocs = byType('category').sort((a, b) => (categoryMeta[lastSeg(a.az)]?.order ?? 99) - (categoryMeta[lastSeg(b.az)]?.order ?? 99))
  for (const d of pillarDocs) {
    const slug = slugs(d)
    const m = categoryMeta[slug.az!]
    const banner = await media.get(d.locales.az!.heroImage?.src, pick(d, (x) => x.heroImage?.alt || x.h1))
    const faqs = await faqsFor(d)
    const { base, locales } = localized(d, (x, l) => ({
      title: x.h1,
      shortName: m?.short[l] ?? x.h1,
      excerpt: x.intro,
      body: rt(x.bodyHtml),
      slug: lastSeg(x.path),
      ...seoOf(x, banner),
    }))
    categoryIds[slug.az!] = await upsert(payload, {
      collection: 'categories',
      match: { field: 'slug', value: slug.az! },
      base: { ...base, banner, cover: banner, iconKey: m?.icon, showOnHome: true, faqs },
      locales,
      draft: false,
    })
  }
  // FAQ -> category link
  for (const d of byType('category')) {
    for (const f of d.locales.az?.faqs ?? []) {
      const id = faqIds.get(f.q)
      if (id) await payload.update({ collection: 'faqs', id, data: { category: categoryIds[slugs(d).az!] }, context: { disableRevalidate: true } })
    }
  }

  /* ------------------------------------------------ references + brands */
  log('References & brands…')
  const home = one('home')
  const refIds: Record<string, number> = {}
  for (let i = 0; i < home.locales.az!.references.length; i++) {
    const r = home.locales.az!.references[i]
    const image = await media.get(r.image, { az: r.alt, en: home.locales.en?.references[i]?.alt, ru: home.locales.ru?.references[i]?.alt })
    const loc = (l: Loc) => home.locales[l]?.references[i]
    refIds[r.name] = await upsert(payload, {
      collection: 'references',
      match: { field: 'name', value: r.name },
      base: { name: r.name, type: r.type, subtitle: r.subtitle, image },
      locales: Object.fromEntries((['en', 'ru'] as Loc[]).filter((l) => loc(l)).map((l) => [l, { type: loc(l).type, subtitle: loc(l).subtitle }])),
    })
  }
  for (let i = 0; i < home.locales.az!.partners.length; i++) {
    const p = home.locales.az!.partners[i]
    const [name, ...rest] = String(p.alt).split(/\s+—\s+/)
    const desc = (l: Loc) => String(home.locales[l]?.partners[i]?.alt ?? '').split(/\s+—\s+/).slice(1).join(' — ')
    const logo = await media.get(p.logo, { az: `${name} loqosu`, en: `${name} logo`, ru: `Логотип ${name}` })
    if (!logo) continue
    await upsert(payload, {
      collection: 'brands',
      match: { field: 'name', value: name },
      base: { name, logo, description: rest.join(' — ') },
      locales: { en: { description: desc('en') }, ru: { description: desc('ru') } },
    })
  }

  /* ------------------------------------------------ projects */
  log('Projects…')
  const cardByHref = (l: Loc, href: string) => (pl.locales[l]?.cards as Any[] | undefined)?.find((c) => c.href === href)
  const projectIds: Record<string, number> = {}
  for (const d of byType('project')) {
    const s = slugs(d)
    const az = d.locales.az!
    const card = cardByHref('az', az.path)
    const cover = await media.get(card?.cover?.src ?? az.gallery?.[0]?.src, pick(d, (x) => cardByHref(x.path.startsWith('/en') ? 'en' : x.path.startsWith('/ru') ? 'ru' : 'az', x.path)?.cover?.alt ?? x.h1))
    const gallery: (number)[] = []
    for (let i = 0; i < (az.gallery?.length ?? 0); i++) {
      const id = await media.get(az.gallery[i].src, pick(d, (x) => x.gallery?.[i]?.alt))
      if (id) gallery.push(id)
    }
    const before = az.beforeAfter ? await media.get(az.beforeAfter.before, pick(d, (x) => `${x.h1} — ${x.path.startsWith('/en') ? 'before' : x.path.startsWith('/ru') ? 'до' : 'əvvəl'}`)) : undefined
    const after = az.beforeAfter ? await media.get(az.beforeAfter.after) : undefined
    const refName = Object.keys(refIds).find((n) => az.h1.toLowerCase().includes(n.split(' ')[0].toLowerCase()))
    const catAz = projectCategoryOf(s.az!)
    const { base, locales } = localized(d, (x, l) => {
      const c = cardByHref(l, x.path)
      return {
        title: x.h1,
        excerpt: c?.excerpt || x.excerpt,
        location: x.location || c?.dl?.[Object.keys(c?.dl ?? {})[0]],
        workType: c?.dl ? Object.values(c.dl)[3] : x.material,
        body: rt(x.bodyHtml),
        highlights: (x.highlights as string[]).map((h) => ({ title: h })),
        slug: lastSeg(x.path),
        ...seoOf(x, cover),
      }
    })
    projectIds[s.az!] = await upsert(payload, {
      collection: 'projects',
      match: { field: 'slug', value: s.az! },
      base: {
        ...base,
        size: az.size,
        durationDays: az.durationDays,
        cover,
        gallery,
        beforeAfter: before && after ? [{ before, after }] : [],
        projectCategories: catAz && projectCatIds[catAz] ? [projectCatIds[catAz]] : [],
        reference: refName ? refIds[refName] : undefined,
        featured: ['bilgeh', 'badamdar', 'hyatt-pool', 'myclass-hovuz', 'makfit-hovuz', 'crown-turk', 'goradil', 'myclass-sauna', 'crown-buxar'].includes(s.az!),
      },
      locales,
      draft: false,
    })
  }
  // reference -> projects
  for (const [name, id] of Object.entries(refIds)) {
    const key = name.split(' ')[0].toLowerCase()
    const ids = Object.entries(projectIds).filter(([slug]) => slug.startsWith(key === 'hyatt' ? 'hyatt' : key)).map(([, v]) => v)
    await payload.update({ collection: 'references', id, data: { projects: ids }, context: { disableRevalidate: true } })
  }

  /* ------------------------------------------------ gallery (from project photos) */
  log('Gallery…')
  for (const d of byType('project')) {
    const az = d.locales.az!
    const catAz = projectCategoryOf(slugs(d).az!)
    for (let i = 0; i < (az.gallery?.length ?? 0); i++) {
      const image = await media.get(az.gallery[i].src)
      if (!image) continue
      await upsert(payload, {
        collection: 'gallery',
        match: { field: 'image', value: String(image) },
        base: {
          title: `${az.h1} — ${i + 1}`,
          image,
          project: projectIds[slugs(d).az!],
          category: categoryIds[serviceCategoryOf(catAz ?? '')] ?? undefined,
        },
        locales: Object.fromEntries((['en', 'ru'] as Loc[]).filter((l) => d.locales[l]).map((l) => [l, { title: `${d.locales[l]!.h1} — ${i + 1}` }])),
      })
    }
  }

  /* ------------------------------------------------ service areas */
  log('Service areas…')
  for (const d of byType('area')) {
    const s = slugs(d)
    const banner = await media.get(d.locales.az!.heroImage?.src, pick(d, (x) => x.heroImage?.alt || x.h1))
    const faqs = await faqsFor(d)
    const projSlug = lastSeg(d.locales.az!.asideProject)
    const { base, locales } = localized(d, (x) => ({
      title: x.h1,
      district: x.h1.replace(/^(Hovuz Tikintisi|Pool Construction( in)?|Строительство бассейнов( в)?)\s*/i, '') || x.h1,
      excerpt: x.intro,
      body: rt(x.bodyHtml),
      slug: lastSeg(x.path),
      ...seoOf(x, banner),
    }))
    await upsert(payload, {
      collection: 'service-areas',
      match: { field: 'slug', value: s.az! },
      base: { ...base, banner, faqs, projects: projectIds[projSlug] ? [projectIds[projSlug]] : [] },
      locales,
      draft: false,
    })
  }

  /* ------------------------------------------------ services */
  log('Services…')
  const sl = one('servicesList')
  for (const d of byType('service')) {
    const s = slugs(d)
    const az = d.locales.az!
    const card = (sl.locales.az!.cards as Any[]).find((c) => c.href === az.path)
    const cover = await media.get(az.image?.src ?? card?.image, pick(d, (x) => x.image?.alt || x.h1))
    const faqs = await faqsFor(d)
    const cat = categoryIds[serviceCategoryOf(s.az!)]
    const { base, locales } = localized(d, (x, l) => {
      const c = (sl.locales[l]?.cards as Any[] | undefined)?.find((k) => k.href === x.path)
      return {
        title: x.h1,
        excerpt: c?.excerpt || x.excerpt,
        body: rt(x.bodyHtml),
        features: (x.benefits as string[]).map((b) => ({ title: b })),
        slug: lastSeg(x.path),
        ...seoOf(x, cover),
      }
    })
    await upsert(payload, {
      collection: 'services',
      match: { field: 'slug', value: s.az! },
      base: { ...base, cover, category: cat ? [cat] : [], faqs },
      locales,
      draft: false,
    })
  }

  /* ------------------------------------------------ blog */
  log('Blog…')
  const postCatIds: Record<string, number> = {}
  for (const d of byType('post')) {
    const s = slugs(d)
    const az = d.locales.az!
    if (az.category && !postCatIds[az.category]) {
      postCatIds[az.category] = await upsert(payload, {
        collection: 'post-categories',
        match: { field: 'title', value: az.category },
        base: { title: az.category },
        locales: Object.fromEntries((['en', 'ru'] as Loc[]).filter((l) => d.locales[l]?.category).map((l) => [l, { title: d.locales[l]!.category }])),
      })
    }
    const cover = await media.get(az.cover?.src, pick(d, (x) => x.cover?.alt || x.h1))
    const faqs = await faqsFor(d)
    const { base, locales } = localized(d, (x) => ({
      title: x.h1,
      excerpt: x.description,
      content: rt(x.bodyHtml) ?? rtText(x.description),
      slug: lastSeg(x.path),
      ...seoOf(x, cover),
    }))
    await upsert(payload, {
      collection: 'posts',
      match: { field: 'slug', value: s.az! },
      base: {
        ...base,
        cover,
        faqs,
        authorName: az.author || undefined,
        publishedAt: az.date ? new Date(az.date).toISOString() : undefined,
        categories: az.category ? [postCatIds[az.category]] : [],
      },
      locales,
      draft: false,
    })
  }

  /* ------------------------------------------------ team (placeholder — replace in admin) */
  log('Team (placeholder)…')
  for (const t of teamPlaceholders) {
    await upsert(payload, {
      collection: 'team',
      match: { field: 'name', value: t.name },
      base: { name: t.name, position: t.position.az, bio: t.bio.az },
      locales: { en: { position: t.position.en, bio: t.bio.en }, ru: { position: t.position.ru, bio: t.bio.ru } },
    })
  }

  /* ------------------------------------------------ certificate */
  log('Certificates…')
  const about = one('about')
  const certSrc = String(about.locales.az!.bodyHtml).match(/src="([^"]*certificate[^"]*)"/)?.[1]
  const certImg = await media.get(certSrc, { az: 'Complex MMC – Rəsmi tikinti lisenziyası', en: 'Complex MMC – Official construction license', ru: 'Complex MMC – Официальная строительная лицензия' })
  if (certImg) {
    await upsert(payload, {
      collection: 'certificates',
      match: { field: 'title', value: 'Rəsmi tikinti lisenziyası' },
      base: { title: 'Rəsmi tikinti lisenziyası', issuer: 'Azərbaycan Respublikası', image: certImg },
      locales: { en: { title: 'Official construction license', issuer: 'Republic of Azerbaijan' }, ru: { title: 'Официальная строительная лицензия', issuer: 'Азербайджанская Республика' } },
    })
  }

  /* ------------------------------------------------ pages, globals, redirects */
  const { seedPages } = await import('./pages')
  await seedPages({ payload, media, docs, faqsFor, categoryIds, log })
  const { seedGlobals } = await import('./globals')
  await seedGlobals({ payload, media, docs, categoryIds, log })
  const { seedRedirects } = await import('./redirects')
  await seedRedirects({ payload, docs, log })

  log('✔ Seed finished')
  process.exit(0)
}

// top-level await: `payload run` exits as soon as the module finishes loading
try {
  await run()
} catch (e) {
  console.error(e)
  process.exit(1)
}
