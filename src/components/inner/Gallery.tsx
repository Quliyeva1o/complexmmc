'use client'

import Image from 'next/image'
import { useCallback, useEffect, useMemo, useState } from 'react'

import { UiIcon } from '@/components/icons/UiIcon'
import { cx } from '@/components/ui/primitives'

export type GalleryImg = { src: string; alt: string; full: string; cat?: string; caption?: string }
type Labels = { close: string; prev: string; next: string; open: string; all?: string }

/**
 * Photo grid with a keyboard-accessible lightbox (template project / gallery pages).
 * layout "feature": first photo large (project page); "grid": even 3-col grid (gallery page).
 * fit "contain": shows whole image on a light card (certificates).
 * filters: optional category pills (gallery page).
 */
export function Gallery({
  images,
  labels,
  layout = 'feature',
  fit = 'cover',
  filters,
}: {
  images: GalleryImg[]
  labels: Labels
  layout?: 'feature' | 'grid'
  fit?: 'cover' | 'contain'
  filters?: { key: string; label: string }[]
}) {
  const [cat, setCat] = useState<string | null>(null)
  const shown = useMemo(() => (cat ? images.filter((i) => i.cat === cat) : images), [images, cat])
  const [open, setOpen] = useState<number | null>(null)
  const close = useCallback(() => setOpen(null), [])
  const step = useCallback((d: number) => setOpen((i) => (i === null ? i : (i + d + shown.length) % shown.length)), [shown.length])

  useEffect(() => {
    if (open === null) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
      if (e.key === 'ArrowRight') step(1)
      if (e.key === 'ArrowLeft') step(-1)
    }
    document.addEventListener('keydown', onKey)
    document.documentElement.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.documentElement.style.overflow = ''
    }
  }, [open, close, step])

  if (!images.length) return null
  return (
    <>
      {filters && filters.length > 1 && (
        <div className="mb-10 flex flex-wrap justify-center gap-3" role="group">
          {[{ key: '', label: labels.all ?? 'All' }, ...filters].map((f) => (
            <button
              key={f.key || 'all'}
              type="button"
              aria-pressed={(cat ?? '') === f.key}
              onClick={() => setCat(f.key || null)}
              className={cx(
                'rounded-[var(--radius-badge)] px-5 py-2 font-display text-sm font-bold transition-colors',
                (cat ?? '') === f.key ? 'bg-primary text-on-primary' : 'bg-badge text-heading hover:bg-primary-soft',
              )}
            >
              {f.label}
            </button>
          ))}
        </div>
      )}

      <ul className={cx('grid gap-4', layout === 'grid' ? 'grid-cols-2 lg:grid-cols-3' : 'grid-cols-2 md:grid-cols-3')}>
        {shown.map((img, i) => (
          <li key={img.src} className={layout === 'feature' && i === 0 ? 'col-span-2 row-span-2' : undefined}>
            <button
              type="button"
              onClick={() => setOpen(i)}
              aria-label={`${labels.open}: ${img.alt}`}
              className={cx(
                'group relative block w-full overflow-hidden rounded-[var(--radius-media)]',
                fit === 'contain' ? 'aspect-[3/4] bg-white p-4 shadow-[var(--shadow-card)] ring-1 ring-heading/5' : 'aspect-square bg-soft',
              )}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes={layout === 'feature' && i === 0 ? '(min-width:768px) 66vw, 100vw' : '(min-width:1024px) 33vw, 50vw'}
                className={cx(fit === 'contain' ? 'object-contain p-4' : 'object-cover transition-transform duration-700 group-hover:scale-105')}
              />
              {fit === 'cover' && (
                <span className="absolute inset-0 grid place-items-center bg-[rgb(0_26_77/0.45)] opacity-0 transition-opacity group-hover:opacity-100" aria-hidden="true">
                  <span className="grid size-12 place-items-center rounded-full bg-primary text-xl text-on-primary">
                    <UiIcon name="plus" />
                  </span>
                </span>
              )}
            </button>
            {img.caption && <p className="mt-3 text-center font-display font-bold text-heading">{img.caption}</p>}
          </li>
        ))}
      </ul>

      {open !== null && shown[open] && (
        <div role="dialog" aria-modal="true" aria-label={shown[open].alt} className="fixed inset-0 z-[60] flex items-center justify-center bg-[rgb(0_26_77/0.95)] p-4" onClick={close}>
          <div className="relative h-full max-h-[85vh] w-full max-w-6xl" onClick={(e) => e.stopPropagation()}>
            <Image src={shown[open].full} alt={shown[open].alt} fill sizes="100vw" className="object-contain" />
          </div>
          <p className="absolute bottom-6 left-1/2 -translate-x-1/2 text-sm text-white/80">
            {open + 1} / {shown.length}
          </p>
          {[
            { label: labels.close, icon: 'close', cls: 'top-5 right-5', on: close },
            { label: labels.prev, icon: 'chevron', cls: 'left-4 top-1/2 -translate-y-1/2 [&_svg]:-scale-x-100', on: () => step(-1) },
            { label: labels.next, icon: 'chevron', cls: 'right-4 top-1/2 -translate-y-1/2', on: () => step(1) },
          ].map((b) => (
            <button
              key={b.label}
              type="button"
              aria-label={b.label}
              onClick={(e) => {
                e.stopPropagation()
                b.on()
              }}
              className={`absolute grid size-12 place-items-center rounded-full bg-white/10 text-2xl text-white hover:bg-primary hover:text-heading ${b.cls}`}
            >
              <UiIcon name={b.icon} />
            </button>
          ))}
        </div>
      )}
    </>
  )
}
