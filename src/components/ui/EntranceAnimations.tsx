'use client'

import { usePathname } from 'next/navigation'
import { useEffect } from 'react'

/**
 * Template-style entrance animations (Elementor fadeInUp / fadeInRight, 1.25s).
 * Elements with [data-reveal] animate once when they enter the viewport. Items in the same
 * list get staggered delays (300ms, 400ms, … like the template). Without JS, without
 * IntersectionObserver or with reduced motion nothing is hidden.
 */
export function EntranceAnimations() {
  const pathname = usePathname()

  useEffect(() => {
    const root = document.documentElement
    if (!('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      root.classList.remove('js-anim')
      return
    }
    root.classList.add('js-anim')

    const els = [...document.querySelectorAll<HTMLElement>('[data-reveal]:not(.is-in)')]
    for (const el of els) {
      const siblings = el.parentElement?.parentElement?.tagName === 'UL' || el.tagName === 'LI'
        ? [...(el.closest('ul, ol')?.querySelectorAll<HTMLElement>(':scope > li[data-reveal], :scope > li > [data-reveal]') ?? [])]
        : []
      const i = siblings.indexOf(el)
      if (i >= 0) el.style.setProperty('--reveal-delay', `${Math.min(300 + i * 100, 800)}ms`)
    }

    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('is-in')
            io.unobserve(e.target)
          }
        }),
      { rootMargin: '0px 0px -60px 0px' },
    )
    els.forEach((el) => io.observe(el))
    // anything already scrolled past (anchor links, restored scroll) is shown immediately
    els.forEach((el) => {
      if (el.getBoundingClientRect().bottom < 0) el.classList.add('is-in')
    })
    return () => io.disconnect()
  }, [pathname])

  return null
}
