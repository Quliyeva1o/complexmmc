'use client'

/**
 * Small list-view cells for the admin (PLAN.md §12, step 6): a picture instead of a file name,
 * and a clear yes / no instead of "true" / "false".
 */
type MediaLike = { url?: string | null; alt?: string | null; sizes?: { thumb?: { url?: string | null } } } | number | string | null | undefined

export function ThumbCell({ cellData }: { cellData?: unknown }) {
  const first = (Array.isArray(cellData) ? cellData[0] : cellData) as MediaLike
  const src = first && typeof first === 'object' ? first.sizes?.thumb?.url || first.url : null
  if (!src) return <span className="cmmc-thumb cmmc-thumb--empty" aria-hidden="true" />
  // eslint-disable-next-line @next/next/no-img-element
  return <img className="cmmc-thumb" src={src} alt="" loading="lazy" />
}

export function BoolCell({ cellData }: { cellData?: unknown }) {
  return cellData ? <span className="cmmc-pill cmmc-pill--done">Bəli</span> : <span className="cmmc-bool-no">—</span>
}
