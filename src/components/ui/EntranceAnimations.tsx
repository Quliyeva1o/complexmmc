'use client'

import { usePathname } from 'next/navigation'
import { useEffect } from 'react'

/**
 * Entrance animations (PLAN.md §11 step 6): a short 0.6s fade + 16px rise, started just before
 * an element scrolls into view. Items in the same list are staggered 70ms apart (max 280ms).
 * Without JS, without IntersectionObserver or with reduced motion nothing is hidden.
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
      if (i >= 0) el.style.setProperty('--reveal-delay', `${Math.min((i % 4) * 70, 280)}ms`)
    }

    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('is-in')
            io.unobserve(e.target)
          }
        }),
      // start ~10% of a screen before the element appears, so nothing waits on screen to show up
      { rootMargin: '0px 0px 10% 0px' },
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
