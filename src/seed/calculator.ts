/**
 * \`npm run seed:calculator\` — fill the "Qiymət kalkulyatoru" global with the default prices,
 * places and extras (built from the company's real estimates) in az / en / ru.
 * Existing admin edits are overwritten, so run it once.
 */
import config from '@payload-config'
import { getPayload } from 'payload'

import { DEFAULT_EXTRAS, DEFAULT_PLACES, DEFAULT_PRICES } from '../lib/estimate/defaults'

const payload = await getPayload({ config })
const ctx = { disableRevalidate: true }

await payload.updateGlobal({
  slug: 'calculator',
  locale: 'az',
  context: ctx,
  data: {
    mode: 'price',
    rangePercent: 10,
    unknownPlacePercent: 30,
    defaultDepth: 1.5,
    prices: DEFAULT_PRICES.map((p) => ({ key: p.key, price: p.price, premium: p.premium ?? null })),
    places: DEFAULT_PLACES.map((p) => ({ key: p.key, name: p.name.az, zone: p.zone as 'absheron', transport: p.transport, pump: p.pump, truck: p.truck, confirmed: p.confirmed })),
    extras: DEFAULT_EXTRAS.map((x) => ({ key: x.key, name: x.name.az, min: x.min, max: x.max })),
    disclaimer: 'Qiymət təxminidir və sizin seçimlərinizə əsaslanır. Dəqiq qiymət obyektə pulsuz baxışdan sonra yazılı smeta ilə verilir.',
  } as never,
})

// localized names: same rows (ids), other languages
const az = await payload.findGlobal({ slug: 'calculator', locale: 'az', depth: 0 })
for (const locale of ['en', 'ru'] as const) {
  await payload.updateGlobal({
    slug: 'calculator',
    locale,
    context: ctx,
    data: {
      places: (az.places ?? []).map((row, i) => ({ ...row, name: DEFAULT_PLACES[i].name[locale] })),
      extras: (az.extras ?? []).map((row, i) => ({ ...row, name: DEFAULT_EXTRAS[i].name[locale] })),
      disclaimer:
        locale === 'en'
          ? 'This is an estimate based on your choices. The exact price is given in a written estimate after a free site visit.'
          : 'Это ориентировочная стоимость по вашему выбору. Точная цена указывается в письменной смете после бесплатного выезда на объект.',
    } as never,
  })
}
console.log('calculator seeded:', DEFAULT_PRICES.length, 'prices,', DEFAULT_PLACES.length, 'places,', DEFAULT_EXTRAS.length, 'extras')
process.exit(0)
