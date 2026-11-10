'use client'

import Image from 'next/image'
import { useRef, useState } from 'react'

type Img = { src: string; alt: string; full: string }

const Arrow = ({ d }: { d: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="size-5" aria-hidden="true">
    <path d={d} />
  </svg>
)

/**
 * Template "Project Single" gallery (Pooluxe), measured 1:1: 839×465 slide (12px radius),
 * 46px cyan half-pill arrows flush with the left/right edges, a row of four 187×117 thumbnails
 * 30px below. Swipe on touch, arrow keys when focused.
 */
export function ProjectSlider({ images, labels }: { images: Img[]; labels: { prev: string; next: string; open: string } }) {
  const [i, setI] = useState(0)
  const startX = useRef<number | null>(null)
  const n = images.length
  if (!n) return null
  const go = (k: number) => setI(((k % n) + n) % n)
  // thumbnails: a window of four (4×187 + 3×30 = 838px) that keeps the active one visible
  const start = n <= 4 ? 0 : Math.min(Math.max(i - 1, 0), n - 4)
  const thumbs = images.slice(start, start + 4)

  return (
    <div
      className="mb-10"
      onKeyDown={(e) => {
        if (e.key === 'ArrowLeft') go(i - 1)
        if (e.key === 'ArrowRight') go(i + 1)
      }}
    >
      <div
        className="relative aspect-[839/465] cursor-grab overflow-hidden rounded-[12px] bg-soft"
        onPointerDown={(e) => (startX.current = e.clientX)}
        onPointerUp={(e) => {
          if (startX.current === null) return
          const dx = e.clientX - startX.current
          if (Math.abs(dx) > 40) go(dx < 0 ? i + 1 : i - 1)
          startX.current = null
        }}
      >
        <div className="flex h-full transition-transform duration-500 ease-out" style={{ transform: `translateX(-${i * 100}%)` }}>
          {images.map((img, k) => (
            <div key={img.full} className="relative h-full w-full shrink-0" aria-hidden={k !== i}>
              <Image src={img.full} alt={img.alt} fill priority={k === 0} sizes="(min-width:1024px) 839px, 100vw" className="object-cover" draggable={false} />
            </div>
          ))}
        </div>
        {n > 1 && (
          <>
            <button type="button" onClick={() => go(i - 1)} aria-label={labels.prev} className="absolute top-1/2 left-0 grid size-[46px] -translate-y-1/2 place-items-center rounded-r-[25px] bg-[var(--color-primary)] text-heading transition-colors hover:bg-dark hover:text-white">
              <Arrow d="M15 6l-6 6 6 6" />
            </button>
            <button type="button" onClick={() => go(i + 1)} aria-label={labels.next} className="absolute top-1/2 right-0 grid size-[46px] -translate-y-1/2 place-items-center rounded-l-[25px] bg-[var(--color-primary)] text-heading transition-colors hover:bg-dark hover:text-white">
              <Arrow d="M9 6l6 6-6 6" />
            </button>
          </>
        )}
      </div>
      {n > 1 && (
        <ul className="mt-[30px] grid grid-cols-4 gap-3 sm:gap-[30px]">
          {thumbs.map((img, k) => {
            const idx = start + k
            return (
              <li key={img.full}>
                <button type="button" onClick={() => go(idx)} aria-label={`${labels.open} ${idx + 1}`} aria-current={idx === i || undefined} className="relative block aspect-[187/117] w-full overflow-hidden">
                  <Image src={img.src} alt="" fill sizes="187px" className="object-cover" />
                </button>
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}
