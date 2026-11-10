'use client'

import { useEffect, useRef } from 'react'

/**
 * Background video for the hero. The poster image is server-rendered underneath; the video file
 * is only attached on tablet/desktop, when the visitor hasn't asked for reduced motion or data
 * saving — phones keep the light poster (PLAN.md §11 step 5). It fades in once it can play.
 */
export function HeroVideoBg({ src, type }: { src: string; type: string }) {
  const ref = useRef<HTMLVideoElement>(null)
  useEffect(() => {
    const v = ref.current
    if (!v) return
    const conn = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection
    const ok =
      window.matchMedia('(min-width: 768px)').matches &&
      !window.matchMedia('(prefers-reduced-motion: reduce)').matches &&
      !conn?.saveData
    if (!ok) return
    const source = document.createElement('source')
    source.src = src
    source.type = type
    v.appendChild(source)
    v.load()
    v.play().catch(() => {})
  }, [src, type])
  return (
    <video
      ref={ref}
      muted
      loop
      playsInline
      preload="none"
      aria-hidden="true"
      onPlaying={(e) => e.currentTarget.classList.remove('opacity-0')}
      className="absolute inset-0 -z-20 size-full object-cover opacity-0 transition-opacity duration-500"
    />
  )
}
