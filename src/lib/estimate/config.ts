import type { Locale } from '@/i18n/config'
import { getGlobal } from '@/lib/data'
import type { Calculator } from '@/payload-types'
import { DEFAULT_EXTRAS, DEFAULT_PLACES, DEFAULT_PRICES } from './defaults'
import type { EstimateConfig, Extra, Place, PriceItem } from './types'

const same = (s: string) => ({ az: s, en: s, ru: s })

/**
 * Calculator config from admin (Qiymət kalkulyatoru); every empty list falls back to the defaults
 * built from the real estimates, and missing price keys are filled from the defaults too.
 */
export async function getEstimateConfig(locale: Locale): Promise<EstimateConfig & { mode: 'price' | 'lead'; defaultDepth: number; disclaimer?: string | null }> {
  const g = await getGlobal<Calculator>('calculator', locale, 0)
  const adminPrices: PriceItem[] = (g.prices ?? []).map((p) => ({ key: p.key, price: p.price, premium: p.premium ?? null }))
  const prices = [...adminPrices, ...DEFAULT_PRICES.filter((d) => !adminPrices.some((p) => p.key === d.key))]
  const places: Place[] = g.places?.length
    ? g.places.map((p) => ({ key: p.key, name: same(p.name), zone: p.zone ?? 'absheron', transport: p.transport, pump: p.pump, truck: p.truck, confirmed: !!p.confirmed }))
    : DEFAULT_PLACES
  const extras: Extra[] = g.extras?.length ? g.extras.map((x) => ({ key: x.key, name: same(x.name), min: x.min, max: x.max })) : DEFAULT_EXTRAS
  return {
    mode: (g.mode as 'price' | 'lead') ?? 'price',
    defaultDepth: g.defaultDepth ?? 1.5,
    disclaimer: g.disclaimer,
    prices,
    places,
    extras,
    rangePercent: g.rangePercent ?? 10,
    unknownPlacePercent: g.unknownPlacePercent ?? 30,
  }
}
