import { RichText } from '@payloadcms/richtext-lexical/react'
import Image from 'next/image'
import Link from 'next/link'
import type { ReactNode } from 'react'

import { CTABlock } from '@/components/blocks/ContentBlocks'
import { UiIcon } from '@/components/icons/UiIcon'
import { Button, cx, SectionHeader } from '@/components/ui/primitives'
import type { Locale } from '@/i18n/config'
import type { Dict } from '@/i18n/dictionary'
import { getGlobal } from '@/lib/data'
import { mediaProps } from '@/lib/media'
import type { Faq, Media, SiteSetting } from '@/payload-types'

/* ------------------------------------------------------------------ Page banner (template inner-page header) */
export type Crumb = { name: string; href?: string }

/**
 * Template page title band: photo + navy 80% overlay + left gradient; 64px white title on the
 * left, breadcrumb on the right (padding 200/140px desktop, 140/60px mobile).
 */
export function PageBanner({ title, intro, image, crumbs, small = false }: { title: string; intro?: string | null; image?: Media | number | null; crumbs: Crumb[]; /** 48px title (template blog post) */ small?: boolean }) {
  const img = mediaProps(image as Media, 'hero')
  return (
    <section className="relative isolate overflow-hidden bg-dark pt-[140px] pb-[60px] text-white md:pt-[200px] md:pb-[140px]">
      {img && <Image src={img.src} alt="" fill priority sizes="100vw" className="-z-20 object-cover" />}
      <div className="absolute inset-0 -z-10 bg-[image:var(--banner-overlay)]" />
      <div className="container-x flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div className="max-w-3xl">
          <h1 className={small ? 'text-[32px] leading-[1.2] text-white md:text-[40px] lg:text-[48px]' : 'text-h1 leading-[1.1] text-white'}>{title}</h1>
          {intro && <p className="mt-4 max-w-2xl text-white/80">{intro}</p>}
        </div>
        <nav aria-label="Breadcrumb" className="shrink-0">
          <ol className="flex flex-wrap items-center gap-2 text-white/80">
            {crumbs.map((c, i) => (
              <li key={i} className="flex items-center gap-2">
                {i > 0 && <UiIcon name="chevron" className="text-xs text-primary" />}
                {c.href && i < crumbs.length - 1 ? (
                  <Link href={c.href} className="transition-colors hover:text-primary">
                    {c.name}
                  </Link>
                ) : (
                  <span aria-current="page" className="text-white">
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
/** Template accordion item (Pooluxe contact/FAQ): 1px #ddd border, 16px radius, 15/25 padding. */
export function FaqItem({ faq, open = false }: { faq: Faq; open?: boolean }) {
  return (
    <details className="group rounded-[16px] border border-[#ddd] px-[25px] py-[15px]" open={open}>
      <summary className="flex cursor-pointer list-none items-center justify-between gap-2.5 [&::-webkit-details-marker]:hidden">
        <h3 className="font-body text-base leading-[30px] font-semibold tracking-normal text-heading">{faq.question}</h3>
        <span className="shrink-0 text-2xl text-heading transition-transform duration-300 group-open:rotate-45" aria-hidden="true">
          <UiIcon name="plus" />
        </span>
      </summary>
      <Prose data={faq.answer} className="max-w-none pt-2.5 pr-8" />
    </details>
  )
}

export function FaqList({ faqs, heading }: { faqs: Faq[]; heading?: string }) {
  if (!faqs.length) return null
  return (
    <section className="pt-[30px] pb-10">
      {heading && <SectionHeader align="start" heading={heading} className="mb-2" />}
      <div className="flex flex-col gap-5">
        {faqs.map((f, i) => (
          <FaqItem key={f.id} faq={f} open={i === 0} />
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
