/** Pool cost estimate — shared types (UI, admin data and the calculation model). */
import type { Locale } from '@/i18n/config'

export type L10n = Record<Locale, string>

export type PoolType = 'overflow' | 'skimmer'
export type Scope = 'full' | 'finish' // full = with concrete shell; finish = on an existing shell
export type Pack = 'standard' | 'premium'
export type Section = 'structure' | 'finish' | 'technical' | 'extras' | 'logistics'

/** One unit price. `premium` is used when the premium package is chosen (falls back to `price`). */
export type PriceItem = { key: string; price: number; premium?: number | null }

/**
 * A place the client can choose. Logistics differ by place: transport/overheads for the whole job,
 * concrete pump per pour, one soil truck. `confirmed` = taken from real estimates for that place
 * (exact); otherwise the value is a zone estimate and the result shows a wider range.
 */
export type Place = { key: string; name: L10n; zone: string; transport: number; pump: number; truck: number; confirmed: boolean }

/** Optional extras with a known price or a min–max range. */
export type Extra = { key: string; name: L10n; min: number; max: number }

/** A selectable pool finish. `price` is per m² of material (labour is priced separately). */
export type Finish = { id: string; name: string; price: number; kind: 'mosaic' | 'ceramic'; image?: string | null; brand?: string | null; href?: string | null }

export type EstimateConfig = {
  prices: PriceItem[]
  places: Place[]
  extras: Extra[]
  /** ± % shown around exact lines (rounding, small site differences) */
  rangePercent: number
  /** ± % for logistics when the place is not confirmed / typed in by the client */
  unknownPlacePercent: number
}

export type EstimateInput = {
  length: number
  width: number
  depth: number
  type: PoolType
  scope: Scope
  pack: Pack
  placeKey: string | null // null = client typed their own place
  finish: Finish
  extras: string[]
}

export type EstimateLine = { key: string; section: Section; qty: number; unit: string; price: number; total: number; min: number; max: number }

export type EstimateResult = {
  geometry: { area: number; perimeter: number; volume: number; surface: number }
  lines: EstimateLine[]
  sections: Record<Section, { total: number; min: number; max: number }>
  total: number
  min: number
  max: number
}
