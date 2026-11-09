import type { Locale } from '@/i18n/config'
import type { Dict } from '@/i18n/dictionary'

/** Props every block renderer receives. */
export type BlockCtx = { locale: Locale; d: Dict; isFirst: boolean; prevBlock?: string }

/** Block settings group → section props. */
export const blockTheme = (b: { settings?: { theme?: string | null; anchorId?: string | null } | null }) => ({
  theme: (b.settings?.theme ?? 'light') as 'light' | 'soft' | 'sand' | 'dark',
  id: b.settings?.anchorId || undefined,
})
