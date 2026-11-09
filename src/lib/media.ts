import type { Media } from '@/payload-types'

type Size = 'thumb' | 'card' | 'large' | 'hero' | 'og'

/** Resolves a Payload upload (populated doc or id) to { src, alt, width, height }. */
export function mediaProps(m: Media | number | null | undefined, size?: Size) {
  if (!m || typeof m === 'number') return null
  const s = size ? m.sizes?.[size] : undefined
  const abs = s?.url || m.url
  if (!abs) return null
  // Payload prefixes serverURL; keep paths relative so next/image serves them as local files
  const src = abs.replace(/^https?:\/\/[^/]+/, '')
  return {
    src,
    alt: m.alt ?? '',
    width: s?.width ?? m.width ?? 1200,
    height: s?.height ?? m.height ?? 800,
  }
}
