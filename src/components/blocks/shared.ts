import type { Locale } from '@/i18n/config'
import type { Dict } from '@/i18n/dictionary'

/** Props every block renderer receives. */
export type Tone = 'light' | 'soft' | 'dark'
/**
 * Props every block renderer receives. `tone` is the section background RenderBlocks assigns so
 * a page alternates white / soft sections, with dark kept for 1–2 accent sections (PLAN.md §11.4).
 */
export type BlockCtx = { locale: Locale; d: Dict; isFirst: boolean; prevBlock?: string; tone?: Tone; tone2?: Tone }

/** Block settings group → section props. */
export const blockTheme = (b: { settings?: { theme?: string | null; anchorId?: string | null } | null }, ctx?: { tone?: Tone }) => ({
  theme: (ctx?.tone ?? b.settings?.theme ?? 'light') as 'light' | 'soft' | 'sand' | 'dark',
  id: b.settings?.anchorId || undefined,
})
