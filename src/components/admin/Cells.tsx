'use client'

import { useEffect, useState } from 'react'

/**
 * Small list-view cells for the admin (PLAN.md §12, step 6): a picture instead of a file name,
 * and a clear yes / no instead of "true" / "false".
 */
type MediaDoc = { url?: string | null; sizes?: { thumb?: { url?: string | null } } }
type MediaLike = MediaDoc | number | string | null | undefined

const thumbOf = (m: MediaDoc | null | undefined) => m?.sizes?.thumb?.url || m?.url || null

// the list query runs at depth 0, so cells get media ids: load each one once per page
const cache = new Map<string, Promise<string | null>>()
function loadThumb(id: string) {
  if (!cache.has(id)) {
    cache.set(
      id,
      fetch(`/api/media/${id}?depth=0`, { credentials: 'include' })
        .then((r) => (r.ok ? (r.json() as Promise<MediaDoc>) : null))
        .then(thumbOf)
        .catch(() => null),
    )
  }
  return cache.get(id)!
}

export function ThumbCell({ cellData }: { cellData?: unknown }) {
  const first = (Array.isArray(cellData) ? cellData[0] : cellData) as MediaLike
  const direct = first && typeof first === 'object' ? thumbOf(first) : null
  const id = typeof first === 'number' || typeof first === 'string' ? String(first) : null
  const [src, setSrc] = useState<string | null>(direct)

  useEffect(() => {
    if (direct || !id) return
    let alive = true
    loadThumb(id).then((u) => alive && setSrc(u))
    return () => {
      alive = false
    }
  }, [direct, id])

  if (!src) return <span className="cmmc-thumb cmmc-thumb--empty" aria-hidden="true" />
  // eslint-disable-next-line @next/next/no-img-element
  return <img className="cmmc-thumb" src={src} alt="" loading="lazy" />
}

export function BoolCell({ cellData }: { cellData?: unknown }) {
  return cellData ? <span className="cmmc-pill cmmc-pill--done">Bəli</span> : <span className="cmmc-bool-no">—</span>
}
