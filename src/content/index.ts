import { buxarOtagi } from './pillars/buxar-otagi-tikintisi'
import { fitnesZali } from './pillars/fitnes-zali-tikintisi'
import { hovuzTikintisi } from './pillars/hovuz-tikintisi'
import { infinityHovuz } from './pillars/infinity-hovuz-tikintisi'
import { pillarMeta } from './pillars/meta'
import { rusHamami } from './pillars/rus-hamami-tikintisi-baki'
import { saunaTikintisi } from './pillars/sauna-tikintisi-baki'
import { spaTikintisi } from './pillars/spa-tikintisi-baki'
import { turkHamami } from './pillars/turk-hamami-tikintisi-baki'
import { villaHovuzu } from './pillars/villa-hovuzu-tikintisi'
import { areaEntries } from './areas'
import { projectEntries } from './projects'
import type { ContentEntry } from './types'

/** Full pages written in Stage 2b. */
const full: ContentEntry[] = [
  hovuzTikintisi,
  infinityHovuz,
  villaHovuzu,
  saunaTikintisi,
  turkHamami,
  rusHamami,
  buxarOtagi,
  spaTikintisi,
  fitnesZali,
]

/** Every content entry; meta-only entries are skipped once a full page exists for that slug. */
export const entries: ContentEntry[] = [
  ...full,
  ...pillarMeta.filter((m) => !full.some((f) => f.slug === m.slug)),
  ...projectEntries,
  ...areaEntries,
]
