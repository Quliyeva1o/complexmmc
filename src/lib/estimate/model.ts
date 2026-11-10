/**
 * Pool cost model. Quantities are functions of the pool geometry, calibrated on real Complex MMC
 * estimates (Mərdəkan 8×4, Quba 10×5, Buzovna 9×4.5, Badamdar 12×6 …); prices come from config.
 *
 *   area A = L·W        perimeter P = 2(L+W)        volume V = A·D
 *   surface S = A + P·D (finish area)
 *   shell = (L+0.5)(W+0.5) + (P+2)(D+0.3)           (concrete walls + floor, outer)
 *   excavation = (L+1.5)(W+1.5)(D+0.5)
 */
import { OTHER_PLACE } from './defaults'
import type { EstimateConfig, EstimateInput, EstimateLine, EstimateResult, Place, Section } from './types'

const r1 = (n: number) => Math.round(n * 10) / 10
const r2 = (n: number) => Math.round(n * 100) / 100

export function placeFor(config: EstimateConfig, key: string | null): Place {
  return config.places.find((p) => p.key === key) ?? { key: 'other', name: { az: '', en: '', ru: '' }, ...OTHER_PLACE }
}

export function computeEstimate(input: EstimateInput, config: EstimateConfig): EstimateResult {
  const L = clamp(input.length, 2, 50)
  const W = clamp(input.width, 1.5, 30)
  const D = clamp(input.depth, 0.6, 3)
  const A = L * W
  const P = 2 * (L + W)
  const V = A * D
  const S = A + P * D
  const shell = (L + 0.5) * (W + 0.5) + (P + 2) * (D + 0.3)
  const exc = (L + 1.5) * (W + 1.5) * (D + 0.5)
  const overflow = input.type === 'overflow'
  const premium = input.pack === 'premium'
  const place = placeFor(config, input.placeKey)

  const priceOf = (key: string) => {
    const p = config.prices.find((x) => x.key === key)
    if (!p) return 0
    return premium && p.premium ? p.premium : p.price
  }
  const lines: EstimateLine[] = []
  const r = config.rangePercent / 100
  const add = (key: string, section: Section, qty: number, unit: string, price: number, spread = r) => {
    if (qty <= 0 || price <= 0) return
    const total = qty * price
    lines.push({ key, section, qty, unit, price: r2(price), total, min: total * (1 - spread), max: total * (1 + spread) })
  }

  /* ---------------------------------------------------------------- structure (full build only) */
  if (input.scope === 'full') {
    add('excavation', 'structure', Math.ceil(exc), 'm3', priceOf('excavation'))
    add('soil_trucks', 'structure', Math.ceil(exc / 7), 'truck', place.truck, place.confirmed ? r : config.unknownPlacePercent / 100)
    add('rebar', 'structure', r2(shell * 0.028), 't', priceOf('rebar'))
    add('tie_wire', 'structure', 1, 'lot', priceOf('tie_wire'))
    add('concrete', 'structure', r1(shell * 0.31), 'm3', priceOf('concrete'))
    add('concrete_pump', 'structure', shell > 130 ? 3 : 2, 'pour', place.pump, place.confirmed ? r : config.unknownPlacePercent / 100)
    add('formwork', 'structure', 1, 'lot', priceOf('formwork_base') + priceOf('formwork_per_m') * P)
    if (overflow) add('channel_timber', 'structure', r2(P * 0.025), 'm3', priceOf('channel_timber'))
    add('blocks', 'structure', Math.round(30 * P), 'pcs', priceOf('blocks'))
    add('base_aggregates', 'structure', r1(A * 0.17), 'm3', priceOf('base_aggregates'))
    add('structure_cement', 'structure', 10, 'bag', priceOf('structure_cement'))
    add('labor_concrete', 'structure', Math.round(shell * 1.3), 'm2', priceOf('labor_concrete'))
    add('labor_masonry', 'structure', Math.round(2.25 * P), 'm2', priceOf('labor_masonry'))
    if (overflow) add('labor_channel_concrete', 'structure', Math.round(P + 5), 'lm', priceOf('labor_channel_concrete'))
    add('compaction', 'structure', 1, 'job', priceOf('compaction'))
  }

  /* ---------------------------------------------------------------- finishing */
  const finishM2 = Math.ceil(S * 1.03)
  add('finish_material', 'finish', finishM2, 'm2', input.finish.price)
  add('labor_finish', 'finish', finishM2, 'm2', input.finish.kind === 'ceramic' ? Math.max(priceOf('labor_finish'), 30) : priceOf('labor_finish'))
  // coping: 30×60 pieces (standard) or 35×120 (premium) along the edge
  add('coping', 'finish', Math.ceil((P + 4) / (premium ? 1.2 : 0.6)), 'pcs', priceOf('coping'))
  add('labor_coping', 'finish', Math.round(P + 1), 'lm', priceOf('labor_coping'))
  if (overflow) {
    add('grating', 'finish', Math.round(P + 3), 'lm', priceOf('grating'))
    add('channel_tiles', 'finish', Math.ceil(P * 0.7), 'm2', priceOf('channel_tiles'))
    add('labor_channel_finish', 'finish', Math.round(P + 2), 'lm', priceOf('labor_channel_finish'))
  } else {
    add('skimmers', 'finish', Math.max(1, Math.ceil(A / 25)), 'pcs', priceOf('skimmers'))
  }
  add('tile_adhesive', 'finish', Math.ceil(S * 0.19), 'bag', priceOf('tile_adhesive'))
  add('repair_mortar', 'finish', Math.ceil(S * 0.05), 'bag', priceOf('repair_mortar'))
  add('grout', 'finish', Math.ceil(S * 0.08), 'bag', priceOf('grout'))
  add('waterproofing', 'finish', Math.ceil(S * 0.15), 'set', priceOf('waterproofing'))
  add('skim_coat', 'finish', Math.ceil(S * 0.21), 'bag', priceOf('skim_coat'))
  add('sand', 'finish', r1(S * 0.11), 'm3', priceOf('sand'))
  add('cement', 'finish', Math.ceil(S * 0.7), 'bag', priceOf('cement'))
  add('plant_room', 'finish', 12, 'm2', priceOf('plant_room'))
  add('edge_prep', 'finish', Math.round(P + 1), 'lm', priceOf('edge_prep') + priceOf('edge_prep_tools') / Math.round(P + 1))
  add('labor_plaster', 'finish', Math.ceil(S * 1.4), 'm2', priceOf('labor_plaster'))
  add('labor_skim', 'finish', Math.ceil(S), 'm2', priceOf('labor_skim'))
  add('labor_waterproofing', 'finish', Math.ceil(S * 1.55), 'm2', priceOf('labor_waterproofing'))

  /* ---------------------------------------------------------------- technical (filtration, light) */
  add('pumps', 'technical', V > 160 ? 4 : 2, 'pcs', V <= 60 ? priceOf('pump_small') : priceOf('pump_large'))
  add('filter', 'technical', V > 100 ? 2 : 1, 'pcs', priceOf('filter'))
  add('filter_media', 'technical', Math.max(150, Math.round(V * 3)), 'kg', priceOf('filter_media'))
  add('pipes', 'technical', Math.round(P * 2.6), 'm', priceOf('pipes'))
  add('fittings', 'technical', 1, 'lot', priceOf('fittings') * (V > 100 ? 1.5 : 1))
  add('return_jets', 'technical', Math.round(A / 5.2) + 3, 'pcs', priceOf('return_jets'))
  add('main_drain', 'technical', A > 60 ? 2 : 1, 'pcs', priceOf('main_drain'))
  const lights = Math.ceil(A / 5.5)
  add('lights', 'technical', lights, 'pcs', priceOf('lights'))
  add('transformers', 'technical', Math.ceil(lights / 6), 'pcs', priceOf('transformers'))
  add('cable', 'technical', Math.round(4.5 * P), 'm', priceOf('cable'))
  add('control_panel', 'technical', 1, 'pcs', priceOf('control_panel'))
  add('ladder', 'technical', A > 60 ? 2 : 1, 'pcs', priceOf('ladder'))
  add('cleaning_kit', 'technical', 1, 'set', priceOf('cleaning_kit'))
  add('labor_mep', 'technical', 1, 'job', priceOf('labor_mep_base') + priceOf('labor_mep_per_m3') * V)

  /* ---------------------------------------------------------------- logistics (depends on place) */
  const sizeFactor = clamp(Math.pow(A / 36, 0.35), 0.8, 1.8)
  const scopeFactor = input.scope === 'full' ? 1 : 0.75
  add('logistics', 'logistics', 1, 'lot', place.transport * sizeFactor * scopeFactor, place.confirmed ? r : config.unknownPlacePercent / 100)

  /* ---------------------------------------------------------------- extras */
  for (const key of input.extras) {
    const x = config.extras.find((e) => e.key === key)
    if (!x) continue
    const mid = (x.min + x.max) / 2
    lines.push({ key, section: 'extras', qty: 1, unit: 'set', price: mid, total: mid, min: x.min, max: x.max })
  }

  const empty = () => ({ total: 0, min: 0, max: 0 })
  const sections: EstimateResult['sections'] = { structure: empty(), finish: empty(), technical: empty(), logistics: empty(), extras: empty() }
  for (const l of lines) {
    sections[l.section].total += l.total
    sections[l.section].min += l.min
    sections[l.section].max += l.max
  }
  const sum = (k: 'total' | 'min' | 'max') => Object.values(sections).reduce((a, s) => a + s[k], 0)
  const round10 = (n: number) => Math.round(n / 10) * 10
  return {
    geometry: { area: r1(A), perimeter: r1(P), volume: r1(V), surface: r1(S) },
    lines,
    sections,
    total: round10(sum('total')),
    min: round10(sum('min')),
    max: round10(sum('max')),
  }
}

function clamp(n: number, lo: number, hi: number) {
  return Math.min(hi, Math.max(lo, Number.isFinite(n) ? n : lo))
}
