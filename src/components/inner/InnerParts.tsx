import { RichText } from '@payloadcms/richtext-lexical/react'
import Image from 'next/image'
import Link from 'next/link'
import type { ReactNode } from 'react'

import { CTABlock } from '@/components/blocks/ContentBlocks'
import { UiIcon } from '@/components/icons/UiIcon'
import { Button, cx } from '@/components/ui/primitives'
import type { Locale } from '@/i18n/config'
import type { Dict } from '@/i18n/dictionary'
import { getGlobal } from '@/lib/data'
import { mediaProps } from '@/lib/media'
import type { Faq, Media, SiteSetting } from '@/payload-types'

/* ------------------------------------------------------------------ Page banner (template inner-page header) */
export type Crumb = { name: string; href?: string }

/** Large H1 on a photo with navy overlay and a breadcrumb under it — like the template's inner pages. */
export function PageBanner({ title, intro, image, crumbs }: { title: string; intro?: string | null; image?: Media | number | null; crumbs: Crumb[] }) {
  const img = mediaProps(image as Media, 'hero')
  return (
    <section className="relative isolate overflow-hidden bg-dark pt-40 pb-20 text-center text-white md:pt-48 md:pb-28">
      {img && <Image src={img.src} alt="" fill priority sizes="100vw" className="-z-20 object-cover" />}
      <div className="absolute inset-0 -z-10 bg-[image:var(--hero-overlay)]" />
      <div className="container-x">
        <h1 className="mx-auto max-w-4xl text-h1 leading-[1.1] text-white">{title}</h1>
        {intro && <p className="mx-auto mt-5 max-w-2xl text-lg text-white/80">{intro}</p>}
        <nav aria-label="Breadcrumb" className="mt-6">
          <ol className="inline-flex flex-wrap items-center justify-center gap-2 rounded-[var(--radius-badge)] bg-white/10 px-5 py-2 text-sm">
            {crumbs.map((c, i) => (
              <li key={i} className="flex items-center gap-2">
                {i > 0 && <span aria-hidden="true" className="text-white/50">/</span>}
                {c.href && i < crumbs.length - 1 ? (
                  <Link href={c.href} className="text-white/85 hover:text-primary">
                    {c.name}
                  </Link>
                ) : (
                  <span aria-current="page" className="text-primary">
                    {c.name}
                  </span>
                )}
              </li>
            ))}
          </ol>
        </nav>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ Rich text body */
export function Prose({ data, className }: { data?: unknown; className?: string }) {
  if (!data) return null
  return (
    <div className={cx('prose-pool', className)}>
      {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
      <RichText data={data as any} />
    </div>
  )
}

/* ------------------------------------------------------------------ FAQ list (accordion) */
export function FaqList({ faqs, heading }: { faqs: Faq[]; heading?: string }) {
  if (!faqs.length) return null
  return (
    <section className="mt-16">
      {heading && <h2 className="mb-6 text-[clamp(1.625rem,1.3rem+1.2vw,2.25rem)]">{heading}</h2>}
      <div className="divide-y divide-border border-y border-border">
        {faqs.map((f, i) => (
          <details key={f.id} className="group py-5" open={i === 0}>
            <summary className="flex cursor-pointer list-none items-start justify-between gap-6 font-display text-lg font-bold text-heading [&::-webkit-details-marker]:hidden">
              {f.question}
              <span className="mt-0.5 grid size-8 shrink-0 place-items-center rounded-full bg-badge transition-transform duration-300 group-open:rotate-45 group-open:bg-primary">
                <UiIcon name="plus" />
              </span>
            </summary>
            <Prose data={f.answer} className="mt-3 pr-12" />
          </details>
        ))}
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ Sidebar boxes */
export function SideList({ title, items, activeHref }: { title: string; items: { href: string; label: string }[]; activeHref?: string }) {
  return (
    <div className="rounded-[var(--radius-card)] bg-soft p-6">
      <h2 className="mb-4 text-xl">{title}</h2>
      <ul className="grid gap-2">
        {items.map((it) => {
          const active = it.href === activeHref
          return (
            <li key={it.href}>
              <Link
                href={it.href}
                aria-current={active ? 'page' : undefined}
                className={cx(
                  'flex items-center justify-between gap-3 rounded-[0.625rem] px-4 py-3 font-display text-[0.95rem] font-semibold transition-colors',
                  active ? 'bg-primary text-on-primary' : 'bg-white text-heading hover:bg-primary hover:text-on-primary',
                )}
              >
                {it.label}
                <UiIcon name="chevron" className="shrink-0" />
              </Link>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export async function QuoteCard({ locale, d, title, text }: { locale: Locale; d: Dict; title?: string; text?: string }) {
  const s = await getGlobal<SiteSetting>('site-settings', locale, 0)
  const phone = s.phones?.find((p) => p.primary)?.number ?? s.phones?.[0]?.number
  const calc = { az: '/qiymet-hesabla', en: '/en/price-calculator', ru: '/ru/kalkulyator-stoimosti' }[locale]
  return (
    <div className="rounded-[var(--radius-card)] bg-dark p-8 text-white">
      <h2 className="text-xl text-white">{title ?? d.quote}</h2>
      {text && <p className="mt-3 text-white/75">{text}</p>}
      {phone && (
        <a href={`tel:${phone.replace(/[^\d+]/g, '')}`} className="mt-5 flex items-center gap-2 font-display text-xl font-bold text-white hover:text-primary">
          <UiIcon name="phone" className="text-primary" />
          {phone}
        </a>
      )}
      <Button href={calc} className="mt-6 w-full">
        {d.quote}
      </Button>
    </div>
  )
}

/* ------------------------------------------------------------------ Two-column layout with sticky sidebar */
export function WithSidebar({ children, sidebar, sidebarFirst = false }: { children: ReactNode; sidebar: ReactNode; sidebarFirst?: boolean }) {
  return (
    <div className="container-x grid gap-12 py-[var(--section-y)] lg:grid-cols-[minmax(0,1fr)_300px] xl:grid-cols-[minmax(0,1fr)_340px]">
      <div className={cx('min-w-0', sidebarFirst && 'lg:order-2')}>{children}</div>
      <aside className={cx('grid content-start gap-6 lg:sticky lg:top-28', sidebarFirst && 'lg:order-1')}>{sidebar}</aside>
    </div>
  )
}

/* ------------------------------------------------------------------ Facts table (project details) */
export function FactsTable({ rows }: { rows: { label: string; value?: string | number | null }[] }) {
  const shown = rows.filter((r) => r.value)
  if (!shown.length) return null
  return (
    <dl className="divide-y divide-border rounded-[var(--radius-card)] bg-soft px-6">
      {shown.map((r) => (
        <div key={r.label} className="flex items-baseline justify-between gap-6 py-4">
          <dt className="text-text">{r.label}</dt>
          <dd className="text-right font-display font-bold text-heading">{r.value}</dd>
        </div>
      ))}
    </dl>
  )
}

/* ------------------------------------------------------------------ Standard closing CTA band */

export function SiteCTA({ locale, d }: { locale: Locale; d: Dict }) {
  return (
    <CTABlock
      block={{
        heading: { az: 'Layihənizi bizimlə həyata keçirin', en: 'Bring your project to life with us', ru: 'Реализуйте свой проект с нами' }[locale],
        text: d.freeQuoteText,
        showPhone: true,
        primaryCta: { type: 'custom', label: d.quote, url: { az: '/qiymet-hesabla', en: '/en/price-calculator', ru: '/ru/kalkulyator-stoimosti' }[locale] },
      }}
      ctx={{ locale, d, isFirst: false }}
    />
  )
}
