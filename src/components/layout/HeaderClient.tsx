'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'

import { UiIcon } from '@/components/icons/UiIcon'
import { cx } from '@/components/ui/primitives'

export type NavItem = { href: string; label: string; children?: { href: string; label: string }[] }

export function HeaderClient({
  brand,
  homeHref,
  logo,
  nav,
  cta,
  languages,
  overlay,
  menuLabel,
}: {
  brand: string
  homeHref: string
  logo?: { src: string; srcLight?: string } | null
  nav: NavItem[]
  cta?: { href: string; label: string } | null
  languages: { code: string; label: string; href: string; active: boolean }[]
  /** Transparent header over a hero image (home). */
  overlay: boolean
  menuLabel: { open: string; close: string; lang: string }
}) {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 40)
    on()
    window.addEventListener('scroll', on, { passive: true })
    return () => window.removeEventListener('scroll', on)
  }, [])

  useEffect(() => {
    document.documentElement.style.overflow = open ? 'hidden' : ''
  }, [open])

  const light = overlay && !scrolled && !open // white text over hero
  return (
    <header
      className={cx(
        'fixed inset-x-0 top-0 z-50 transition-[background,box-shadow] duration-300',
        light ? 'bg-transparent' : 'bg-white shadow-[0_6px_30px_-12px_rgb(0_26_77/0.18)]',
      )}
    >
      <div className="container-x flex h-20 items-center justify-between gap-6">
        <Link href={homeHref} className="flex items-center" aria-label={brand}>
          {logo ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={light && logo.srcLight ? logo.srcLight : logo.src} alt={brand} className="h-9 w-auto" />
          ) : (
            <span className={cx('whitespace-nowrap font-display text-2xl font-extrabold tracking-tight', light ? 'text-white' : 'text-heading')}>
              Complex<span className="text-primary"> MMC</span>
            </span>
          )}
        </Link>

        {/* desktop nav */}
        <nav aria-label="Main" className="hidden xl:block">
          <ul className="flex items-center gap-7">
            {nav.map((item) => (
              <li key={item.href} className="group relative">
                <Link
                  href={item.href}
                  className={cx(
                    'flex items-center gap-1 whitespace-nowrap py-7 font-display text-base font-semibold transition-colors',
                    light ? 'text-white hover:text-primary' : 'text-heading hover:text-primary',
                  )}
                >
                  {item.label}
                  {item.children?.length ? <UiIcon name="chevron" className="rotate-90 text-sm" /> : null}
                </Link>
                {item.children?.length ? (
                  <ul className="invisible absolute top-full left-0 w-64 translate-y-2 rounded-[var(--radius-card)] bg-white py-3 opacity-0 shadow-[var(--shadow-card)] transition-all duration-300 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                    {item.children.map((c) => (
                      <li key={c.href}>
                        <Link href={c.href} className="block px-5 py-2 text-sm font-medium text-heading transition-colors hover:bg-soft hover:text-primary">
                          {c.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          <div className="hidden items-center gap-1 sm:flex" aria-label={menuLabel.lang}>
            {languages.map((l) => (
              <Link
                key={l.code}
                href={l.href}
                hrefLang={l.code}
                aria-current={l.active ? 'true' : undefined}
                className={cx(
                  'rounded-full px-2 py-1 text-sm font-semibold uppercase',
                  l.active ? 'text-primary' : light ? 'text-white/80 hover:text-white' : 'text-heading/70 hover:text-heading',
                )}
              >
                {l.code}
              </Link>
            ))}
          </div>
          {cta && (
            <Link
              href={cta.href}
              className="hidden min-h-[46px] items-center rounded-[var(--radius-pill)] bg-primary px-6 font-bold text-on-primary transition-colors hover:bg-primary-hover md:inline-flex"
            >
              {cta.label}
            </Link>
          )}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label={open ? menuLabel.close : menuLabel.open}
            className={cx('grid size-11 place-items-center rounded-full text-2xl xl:hidden', light ? 'text-white' : 'text-heading')}
          >
            <UiIcon name={open ? 'close' : 'menu'} />
          </button>
        </div>
      </div>

      {/* mobile drawer */}
      {open && (
        <div className="h-[calc(100dvh-5rem)] overflow-y-auto border-t border-border bg-white xl:hidden">
          <nav aria-label="Mobile" className="container-x py-6">
            <ul className="divide-y divide-border">
              {nav.map((item) => (
                <li key={item.href} className="py-3">
                  <Link href={item.href} onClick={() => setOpen(false)} className="block font-display text-lg font-bold text-heading">
                    {item.label}
                  </Link>
                  {item.children?.length ? (
                    <ul className="mt-2 grid grid-cols-2 gap-x-4 gap-y-1">
                      {item.children.map((c) => (
                        <li key={c.href}>
                          <Link href={c.href} onClick={() => setOpen(false)} className="block py-1 text-sm text-text">
                            {c.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </li>
              ))}
            </ul>
            <div className="mt-6 flex gap-2">
              {languages.map((l) => (
                <Link key={l.code} href={l.href} hrefLang={l.code} className={cx('rounded-full border px-4 py-2 text-sm font-semibold uppercase', l.active ? 'border-primary bg-primary text-on-primary' : 'border-border text-heading')}>
                  {l.code}
                </Link>
              ))}
            </div>
            {cta && (
              <Link href={cta.href} onClick={() => setOpen(false)} className="mt-6 flex min-h-12 items-center justify-center rounded-[var(--radius-pill)] bg-primary font-bold text-on-primary">
                {cta.label}
              </Link>
            )}
          </nav>
        </div>
      )}
    </header>
  )
}
