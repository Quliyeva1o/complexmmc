'use client'

import Image from 'next/image'
import { useCallback, useEffect, useState } from 'react'

import { UiIcon } from '@/components/icons/UiIcon'

type Img = { src: string; alt: string; full: string }

/** Photo grid with a keyboard-accessible lightbox (template project / gallery pages). */
export function Gallery({ images, labels }: { images: Img[]; labels: { close: string; prev: string; next: string; open: string } }) {
  const [open, setOpen] = useState<number | null>(null)
  const close = useCallback(() => setOpen(null), [])
  const step = useCallback((d: number) => setOpen((i) => (i === null ? i : (i + d + images.length) % images.length)), [images.length])

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
      <ul className="grid grid-cols-2 gap-4 md:grid-cols-3">
        {images.map((img, i) => (
          <li key={img.src} className={i === 0 ? 'col-span-2 row-span-2' : undefined}>
            <button
              type="button"
              onClick={() => setOpen(i)}
              aria-label={`${labels.open}: ${img.alt}`}
              className="group relative block aspect-square w-full overflow-hidden rounded-[var(--radius-media)] bg-soft"
            >
              <Image src={img.src} alt={img.alt} fill sizes={i === 0 ? '(min-width:768px) 66vw, 100vw' : '(min-width:768px) 33vw, 50vw'} className="object-cover transition-transform duration-700 group-hover:scale-105" />
            </button>
          </li>
        ))}
      </ul>

      {open !== null && (
        <div role="dialog" aria-modal="true" aria-label={images[open].alt} className="fixed inset-0 z-[60] flex items-center justify-center bg-[rgb(0_26_77/0.94)] p-4" onClick={close}>
          <div className="relative h-full max-h-[85vh] w-full max-w-6xl" onClick={(e) => e.stopPropagation()}>
            <Image src={images[open].full} alt={images[open].alt} fill sizes="100vw" className="object-contain" />
          </div>
          <p className="absolute bottom-6 left-1/2 -translate-x-1/2 text-sm text-white/80">
            {open + 1} / {images.length}
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
