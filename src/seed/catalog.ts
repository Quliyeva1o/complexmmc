/**
 * `npm run seed:catalog` — import the 2026 price catalogue (data/catalogs/products.json + images,
 * extracted from the PDF) into Products and Product categories. Mosaics have their own script
 * (seed:mosaics). Re-running updates existing products (matched by SKU) and keeps their images.
 */
import fs from 'fs'
import path from 'path'

import config from '@payload-config'
import { getPayload } from 'payload'

type L = { az: string; en: string; ru: string }
type Row = {
  slug: string
  title: string
  category: string
  origin: string | null
  summary: string | null
  specs: { key: string; value: string }[]
  variants: { label: string; price: number }[]
  matrix: { widths: number[]; rows: { length: number; prices: number[] }[] } | null
  image: string | null
  source: string
}

/** Catalogue sections → product categories (name + short description in 3 languages). */
const CATEGORIES: Record<string, { name: L; slug: L; desc: L }> = {
  mozaika: { name: { az: 'Mozaika', en: 'Mosaic', ru: 'Мозаика' }, slug: { az: 'mozaika', en: 'mosaic', ru: 'mozaika-dlya-bassejna' }, desc: { az: 'Betaş (Türkiyə) və Squamers (İspaniya) şüşə hovuz mozaikaları', en: 'Betaş (Turkey) and Squamers (Spain) glass pool mosaics', ru: 'Стеклянная мозаика для бассейна Betaş (Турция) и Squamers (Испания)' } },
  keramika: { name: { az: 'Hovuz keramikası', en: 'Pool tiles', ru: 'Плитка для бассейна' }, slug: { az: 'hovuz-keramikasi', en: 'pool-tiles', ru: 'plitka-dlya-bassejna' }, desc: { az: 'Hovuz və hovuzətrafı üçün keramika və porselen plitələr', en: 'Ceramic and porcelain tiles for pools and pool decks', ru: 'Керамическая и керамогранитная плитка для бассейна и обходной дорожки' } },
  'kenar-elementleri': { name: { az: 'Hovuz kənarı və bordür elementləri', en: 'Coping and edge pieces', ru: 'Бортовые и угловые элементы' }, slug: { az: 'hovuz-kenari-elementleri', en: 'coping-and-edge-pieces', ru: 'bortovye-elementy' }, desc: { az: 'Tutmaq, künc, pillə və daşma kanalı elementləri', en: 'Coping stones, corners, steps and overflow channel pieces', ru: 'Бортовой камень, углы, ступени и элементы переливного канала' } },
  izolyasiya: { name: { az: 'İzolyasiya və tikinti kimyəviləri', en: 'Waterproofing and building chemicals', ru: 'Гидроизоляция и строительная химия' }, slug: { az: 'izolyasiya-materiallari', en: 'waterproofing', ru: 'gidroizolyaciya' }, desc: { az: 'Hidroizolyasiya, yapışdırıcı, fuga və təmir harcları', en: 'Waterproofing, tile adhesives, grout and repair mortars', ru: 'Гидроизоляция, плиточный клей, затирка и ремонтные составы' } },
  robotlar: { name: { az: 'Hovuz robotları', en: 'Pool robots', ru: 'Роботы-пылесосы для бассейна' }, slug: { az: 'hovuz-robotlari', en: 'pool-robots', ru: 'roboty-dlya-bassejna' }, desc: { az: 'Kabelli və kabelsiz avtomatik təmizləyici robotlar', en: 'Corded and cordless automatic cleaning robots', ru: 'Проводные и беспроводные роботы-очистители' } },
  ortukler: { name: { az: 'Hovuz örtükləri', en: 'Pool covers', ru: 'Покрытия для бассейна' }, slug: { az: 'hovuz-ortukleri', en: 'pool-covers', ru: 'pokrytiya-dlya-bassejna' }, desc: { az: 'Rulo və prestij tipli hovuz örtükləri — qiymət ölçüyə görə', en: 'Roller and Prestige pool covers — priced by size', ru: 'Рулонные и купольные покрытия — цена по размеру' } },
  filtrler: { name: { az: 'Filtrlər və filtr mediası', en: 'Filters and filter media', ru: 'Фильтры и загрузка' }, slug: { az: 'hovuz-filtrleri', en: 'pool-filters', ru: 'filtry-dlya-bassejna' }, desc: { az: 'Qum filtrləri, 6 yollu vanalar, kvars qum və şüşə mediya', en: 'Sand filters, 6-way valves, quartz sand and glass media', ru: 'Песочные фильтры, 6-ходовые клапаны, кварц и стекло' } },
  nasoslar: { name: { az: 'Nasoslar və ehtiyat hissələri', en: 'Pumps and spare parts', ru: 'Насосы и запчасти' }, slug: { az: 'hovuz-nasoslari', en: 'pool-pumps', ru: 'nasosy-dlya-bassejna' }, desc: { az: 'Sirkulyasiya nasosları, bloverlər və hissələri', en: 'Circulation pumps, blowers and spare parts', ru: 'Циркуляционные насосы, воздуходувки и запчасти' } },
  'isitme-dezinfeksiya': { name: { az: 'İsitmə, əks axın və dezinfeksiya', en: 'Heating, counter-current and disinfection', ru: 'Подогрев, противоток и дезинфекция' }, slug: { az: 'isitme-ve-dezinfeksiya', en: 'heating-and-disinfection', ru: 'podogrev-i-dezinfekciya' }, desc: { az: 'Eşenjor, heat pump, nəmalıcı, əks axın, UV və dozaj sistemləri', en: 'Heat exchangers, heat pumps, dehumidifiers, counter-current, UV and dosing', ru: 'Теплообменники, тепловые насосы, осушители, противоток, УФ и дозирование' } },
  'boru-fitinq': { name: { az: 'PVC boru və fitinqlər', en: 'PVC pipes and fittings', ru: 'Трубы и фитинги ПВХ' }, slug: { az: 'pvc-boru-fitinq', en: 'pvc-pipes-fittings', ru: 'truby-fitingi-pvh' }, desc: { az: 'Pimtaş U-PVC borular, fitinqlər və vanalar', en: 'Pimtaş U-PVC pipes, fittings and valves', ru: 'Трубы, фитинги и краны Pimtaş U-PVC' } },
  aksesuarlar: { name: { az: 'Şəlalə, pilləkən və süzgəclər', en: 'Waterfalls, ladders and inlets', ru: 'Водопады, лестницы и закладные' }, slug: { az: 'hovuz-aksesuarlari', en: 'pool-accessories', ru: 'aksessuary-dlya-bassejna' }, desc: { az: 'Paslanmaz şəlalələr, pilləkənlər, skimmerlər, jetlər, dib süzgəcləri', en: 'Stainless waterfalls, ladders, skimmers, jets and main drains', ru: 'Водопады, лестницы, скиммеры, форсунки и донные сливы' } },
  isiqlar: { name: { az: 'Hovuz işıqları', en: 'Pool lights', ru: 'Освещение бассейна' }, slug: { az: 'hovuz-isiqlari', en: 'pool-lights', ru: 'osveshchenie-bassejna' }, desc: { az: 'LED lampalar, projektorlar və trafolar', en: 'LED lights, projectors and transformers', ru: 'LED-светильники, прожекторы и трансформаторы' } },
  'izqara-tutamaq': { name: { az: 'İzqara və tutamaqlar', en: 'Gratings and pool edge tiles', ru: 'Решётки и бортовая плитка' }, slug: { az: 'izqara-ve-tutamaq', en: 'gratings', ru: 'reshetki' }, desc: { az: 'Daşma izqaraları, porselen tutamaq və kaymaz plitələr', en: 'Overflow gratings, porcelain coping and non-slip tiles', ru: 'Переливные решётки, фарфоровый борт и противоскользящая плитка' } },
  kimyevi: { name: { az: 'Hovuz kimyəviləri', en: 'Pool chemicals', ru: 'Химия для бассейна' }, slug: { az: 'hovuz-kimyevileri', en: 'pool-chemicals', ru: 'himiya-dlya-bassejna' }, desc: { az: 'Xlor, pH tənzimləyicilər, yosun önləyici və test dəstləri', en: 'Chlorine, pH regulators, algaecides and test kits', ru: 'Хлор, регуляторы pH, альгициды и тесты' } },
  temizlik: { name: { az: 'Təmizlik aksesuarları', en: 'Cleaning accessories', ru: 'Аксессуары для чистки' }, slug: { az: 'temizlik-aksesuarlari', en: 'cleaning-accessories', ru: 'aksessuary-dlya-chistki' }, desc: { az: 'Xortumlar, teleskopik saplar, vakum süpürgələri', en: 'Hoses, telescopic poles and vacuum heads', ru: 'Шланги, телескопические штанги, щётки-пылесосы' } },
}
const ORIGIN: Record<string, L> = { İspaniya: { az: 'İspaniya', en: 'Spain', ru: 'Испания' }, Türkiyə: { az: 'Türkiyə', en: 'Turkey', ru: 'Турция' } }

const payload = await getPayload({ config })
const ctx = { disableRevalidate: true }
const rows: Row[] = JSON.parse(fs.readFileSync(path.resolve('data/catalogs/products.json'), 'utf8'))
// single-price products have no size label in the catalogue
for (const r of rows) for (const v of r.variants) if (!v.label) v.label = 'Standart'

// ---- categories
const catIds: Record<string, number> = {}
for (const [key, c] of Object.entries(CATEGORIES)) {
  let doc = (await payload.find({ collection: 'product-categories', where: { slug: { equals: c.slug.az } }, locale: 'az', limit: 1, depth: 0, context: ctx })).docs[0]
  if (!doc) doc = await payload.create({ collection: 'product-categories', locale: 'az', context: ctx, data: { title: c.name.az, slug: c.slug.az, excerpt: c.desc.az } as never })
  for (const l of ['az', 'en', 'ru'] as const) await payload.update({ collection: 'product-categories', id: doc.id, locale: l, context: ctx, data: { title: c.name[l], slug: c.slug[l], excerpt: c.desc[l] } as never })
  catIds[key] = doc.id
}

// ---- products
let created = 0
let updated = 0
for (const r of rows) {
  const sku = r.slug.toUpperCase()
  const prices = [...r.variants.map((v) => v.price), ...(r.matrix?.rows.flatMap((x) => x.prices) ?? [])].filter((x) => x > 0)
  const existing = (await payload.find({ collection: 'products', where: { sku: { equals: sku } }, limit: 1, depth: 0, context: ctx })).docs[0]
  let imageId = (existing?.images as number[] | undefined)?.[0]
  if (!imageId && r.image) {
    const media = await payload.create({ collection: 'media', context: ctx, filePath: path.resolve(r.image), data: { alt: r.title } as never })
    imageId = media.id
  }
  const cat = CATEGORIES[r.category]
  const origin = r.origin ? ORIGIN[r.origin] : null
  const base = {
    category: catIds[r.category],
    sku,
    priceFrom: prices.length ? Math.min(...prices) : null,
    inStock: true,
    images: imageId ? [imageId] : [],
    priceMatrix: r.matrix,
    _status: 'published',
  }
  const metaTitle = (l: 'az' | 'en' | 'ru') => ({ az: `${r.title} qiyməti`, en: `${r.title} price`, ru: `${r.title} — цена` })[l]
  const loc = (l: 'az' | 'en' | 'ru') => ({
    title: r.title,
    meta: { title: metaTitle(l), description: (r.summary ?? `${r.title} — ${cat.desc[l].charAt(0).toLowerCase()}${cat.desc[l].slice(1)}${origin ? ` (${origin[l]})` : ''}.`).slice(0, 155) },
    origin: origin?.[l] ?? null,
    spec: cat.name[l],
    excerpt: r.summary ?? `${r.title} — ${cat.desc[l].charAt(0).toLowerCase()}${cat.desc[l].slice(1)}${origin ? ` (${origin[l]})` : ''}.`,
  })
  let doc = existing
  if (doc) {
    await payload.update({ collection: 'products', id: doc.id, locale: 'az', context: ctx, data: { ...base, ...loc('az'), variants: r.variants, specs: r.specs } as never })
    updated++
  } else {
    doc = await payload.create({ collection: 'products', locale: 'az', context: ctx, data: { ...base, ...loc('az'), slug: r.slug, variants: r.variants, specs: r.specs } as never })
    created++
  }
  // other languages: product names, sizes and specs stay as in the catalogue; same array rows (ids)
  const fresh = await payload.findByID({ collection: 'products', id: doc.id, locale: 'az', depth: 0, context: ctx })
  for (const l of ['en', 'ru'] as const) {
    await payload.update({
      collection: 'products',
      id: doc.id,
      locale: l,
      context: ctx,
      data: { ...loc(l), slug: r.slug, _status: 'published', variants: fresh.variants ?? [], specs: fresh.specs ?? [] } as never,
    })
  }
}
console.log(`catalogue: ${created} created, ${updated} updated, ${Object.keys(catIds).length} categories`)
process.exit(0)
