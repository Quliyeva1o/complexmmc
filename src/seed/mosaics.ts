/**
 * `npm run seed:mosaics` — import the pool mosaics from the 2026 price catalogue
 * (data/catalogs/mosaics.json + images, extracted from the PDF) into Products under the
 * "Mozaika" category. Re-running updates existing products (matched by SKU).
 */
import fs from 'fs'
import path from 'path'

import config from '@payload-config'
import { getPayload } from 'payload'

type Row = { slug: string; brand: string; origin: string; name: string; sizes: { size: string; price: number }[]; image: string; source: string }

const payload = await getPayload({ config })
const ctx = { disableRevalidate: true }
const rows: Row[] = JSON.parse(fs.readFileSync(path.resolve('data/catalogs/mosaics.json'), 'utf8'))

// category
const catTitle = { az: 'Mozaika', en: 'Mosaic', ru: 'Мозаика' } as const
let cat = (await payload.find({ collection: 'product-categories', where: { slug: { equals: 'mozaika' } }, limit: 1, locale: 'az', context: ctx })).docs[0]
if (!cat) cat = await payload.create({ collection: 'product-categories', locale: 'az', context: ctx, data: { title: catTitle.az, slug: 'mozaika' } as never })
for (const l of ['en', 'ru'] as const) await payload.update({ collection: 'product-categories', id: cat.id, locale: l, context: ctx, data: { title: catTitle[l], slug: l === 'en' ? 'mosaic' : 'mozaika-ru' } as never })

const sizeLabel = (s: string, l: 'az' | 'en' | 'ru') => s.replace('cm', l === 'ru' ? 'см' : l === 'az' ? 'sm' : 'cm').replace(/x/g, '×')
let created = 0
let updated = 0
for (const r of rows) {
  const sku = r.slug.toUpperCase()
  const title = `${r.brand} ${r.name}`
  const minPrice = Math.min(...r.sizes.map((s) => s.price))
  const existing = (await payload.find({ collection: 'products', where: { sku: { equals: sku } }, limit: 1, depth: 0, context: ctx })).docs[0]

  // image (upload once)
  let imageId = (existing?.images as number[] | undefined)?.[0]
  if (!imageId) {
    const media = await payload.create({ collection: 'media', context: ctx, filePath: path.resolve(r.image), data: { alt: `${title} hovuz mozaikası` } as never })
    imageId = media.id
  }
  const base = {
    category: cat.id,
    sku,
    priceFrom: minPrice,
    inStock: true,
    images: [imageId],
    _status: 'published',
  }
  const loc = (l: 'az' | 'en' | 'ru') => ({
    title,
    meta: {
      title: { az: `${title} hovuz mozaikası qiyməti`, en: `${title} pool mosaic price`, ru: `${title} мозаика для бассейна — цена` }[l],
      description: { az: `${title} şüşə hovuz mozaikası (${r.origin}). Ölçülər və qiymətlər: ${r.sizes.map((x) => `${sizeLabel(x.size, 'az')} — ${x.price} ₼/m²`).join(', ')}.`, en: `${title} glass pool mosaic. Sizes and prices: ${r.sizes.map((x) => `${sizeLabel(x.size, 'en')} — ${x.price} AZN/m²`).join(', ')}.`, ru: `${title} стеклянная мозаика для бассейна. Размеры и цены: ${r.sizes.map((x) => `${sizeLabel(x.size, 'ru')} — ${x.price} ₼/м²`).join(', ')}.` }[l].slice(0, 155),
    },
    origin: { az: r.origin, en: r.origin === 'Türkiyə' ? 'Turkey' : 'Spain', ru: r.origin === 'Türkiyə' ? 'Турция' : 'Испания' }[l],
    spec: { az: 'Silikonlu şüşə hovuz mozaikası', en: 'Glass pool mosaic on silicone mesh', ru: 'Стеклянная мозаика для бассейна на силиконовой сетке' }[l],
    excerpt: {
      az: `${r.brand} ${r.name} — hovuz üçün şüşə mozaika (${r.origin}). Ölçülər: ${r.sizes.map((s) => sizeLabel(s.size, 'az')).join(', ')}.`,
      en: `${r.brand} ${r.name} — glass pool mosaic made in ${r.origin === 'Türkiyə' ? 'Turkey' : 'Spain'}. Sizes: ${r.sizes.map((s) => sizeLabel(s.size, 'en')).join(', ')}.`,
      ru: `${r.brand} ${r.name} — стеклянная мозаика для бассейна (${r.origin === 'Türkiyə' ? 'Турция' : 'Испания'}). Размеры: ${r.sizes.map((s) => sizeLabel(s.size, 'ru')).join(', ')}.`,
    }[l],
    variants: r.sizes.map((s) => ({ label: sizeLabel(s.size, l), price: s.price })),
  })
  let doc = existing
  if (doc) {
    await payload.update({ collection: 'products', id: doc.id, locale: 'az', context: ctx, data: { ...base, ...loc('az') } as never })
    updated++
  } else {
    doc = await payload.create({ collection: 'products', locale: 'az', context: ctx, data: { ...base, ...loc('az'), slug: r.slug } as never })
    created++
  }
  // other languages: same variant rows (keep ids) with translated labels
  const fresh = await payload.findByID({ collection: 'products', id: doc.id, locale: 'az', depth: 0, context: ctx })
  for (const l of ['en', 'ru'] as const) {
    const t = loc(l)
    await payload.update({
      collection: 'products',
      id: doc.id,
      locale: l,
      context: ctx,
      data: { ...t, slug: r.slug, _status: 'published', variants: (fresh.variants ?? []).map((v, i) => ({ ...v, label: t.variants[i]?.label ?? v.label })) } as never,
    })
  }
}
console.log(`mosaics: ${created} created, ${updated} updated (category id ${cat.id})`)
process.exit(0)
