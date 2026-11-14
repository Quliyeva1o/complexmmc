import { RichText } from '@payloadcms/richtext-lexical/react'
import Image from 'next/image'
import type { ReactNode } from 'react'

import { UiIcon } from '@/components/icons/UiIcon'
import { Button, cx, Section, SectionHeader, sectionTone } from '@/components/ui/primitives'
import { getGlobal } from '@/lib/data'
import { mediaProps } from '@/lib/media'
import { resolveLink } from '@/lib/urls'
import type {
  Media,
  SiteSetting,
} from '@/payload-types'
import { blockTheme, type BlockCtx } from './shared'

/* eslint-disable @typescript-eslint/no-explicit-any */
type B = any

/* ------------------------------------------------------------------ Stats */
export function StatsBlock({ block, ctx }: { block: B; ctx: BlockCtx }) {
  const items = (block.items ?? []) as { value: number; suffix?: string; label: string; id?: string }[]
  const dark = (ctx.tone ?? block.settings?.theme) === 'dark'
  return (
    <section className={cx('py-12 md:py-16', sectionTone(ctx.tone ?? (dark ? 'dark' : 'soft')))}>
      <ul className="container-x grid grid-cols-2 gap-y-10 lg:grid-cols-4">
        {items.map((s, i) => (
          <li key={s.id ?? i} className={cx('px-4 text-center', i > 0 && 'lg:border-l', dark ? 'border-white/15' : 'border-heading/10')} data-reveal>
            <p className={cx('font-display text-[clamp(2rem,1.7rem+1.3vw,2.75rem)] leading-none font-bold tracking-[-0.02em]', dark ? 'text-white' : 'text-heading')}>
              {s.value}
              <span className="text-primary">{s.suffix}</span>
            </p>
            <p className={cx('mt-2 text-sm', dark ? 'text-on-dark-muted' : 'text-text')}>{s.label}</p>
          </li>
        ))}
      </ul>
    </section>
  )
}

/* ------------------------------------------------------------------ About intro (template "Welcome") */
export function AboutIntroBlock({ block, ctx }: { block: B; ctx: BlockCtx }) {
  const big = mediaProps(block.imageLarge as Media, 'large')
  const small = mediaProps(block.imageSmall as Media, 'card')
  const cta = resolveLink(block.cta, ctx.locale)
  const bullets = (block.bullets ?? []) as { id?: string; text: string }[]
  const grid = block.bulletsAsGrid && bullets.length > 0
  return (
    <>
      {/* Template "About Us" intro: 582×370 photo + 250×250 photo overlapping its corner, text right */}
      <Section {...blockTheme(block, ctx)}>
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div className="relative pr-[50px] pb-[50px]" data-reveal>
            {big && (
              <div className="relative aspect-[582/370] overflow-hidden rounded-[var(--radius-card)]">
                <Image src={big.src} alt={big.alt} fill sizes="(min-width:1024px) 582px, 100vw" className="object-cover" />
              </div>
            )}
            {small && (
              <div className="absolute right-0 bottom-0 aspect-square w-[40%] max-w-[250px] overflow-hidden rounded-[var(--radius-card)]">
                <Image src={small.src} alt={small.alt} fill sizes="250px" className="object-cover" />
              </div>
            )}
          </div>
          <div className="flex flex-col gap-5" data-reveal>
            <SectionHeader align="start" eyebrow={block.header?.eyebrow} heading={block.header?.heading} className="mb-0" />
            {block.body && (
              <div className="prose-pool max-w-none">
                <RichText data={block.body} />
              </div>
            )}
            {!grid && bullets.length > 0 && (
              <ul className="grid gap-3">
                {bullets.map((b) => (
                  <li key={b.id ?? b.text} className="flex gap-3 text-heading">
                    <UiIcon name="check" className="mt-1.5 shrink-0 text-primary" />
                    <span>{b.text}</span>
                  </li>
                ))}
              </ul>
            )}
            {cta && (
              <div>
                <Button href={cta.href}>{cta.label}</Button>
              </div>
            )}
          </div>
        </div>
      </Section>

      {/* Template "Why Choose Us": cyan 10% band, 3 columns of 80px navy number squares */}
      {grid && (
        <section className={sectionTone(ctx.tone2 ?? 'soft')}>
          <div className="container-x py-[var(--section-y)]">
            <SectionHeader eyebrow={block.gridHeader?.eyebrow} heading={block.gridHeader?.heading} intro={block.gridHeader?.intro} />
            <ol className="grid gap-x-[var(--grid-gap)] gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
              {bullets.map((b, i) => {
                const [title, ...rest] = b.text.split(/\s+[—–-]\s+/)
                const desc = rest.join(' — ')
                return (
                  <li key={b.id ?? b.text} className="flex flex-col border-t border-border pt-6" data-reveal>
                    <span className="text-sm font-semibold text-primary-strong tabular-nums">{String(i + 1).padStart(2, '0')}</span>
                    <div className="mt-3">
                      <h3 className="text-h4">{desc ? title : b.text}</h3>
                      {desc && <p className="mt-2 text-card">{desc}</p>}
                    </div>
                  </li>
                )
              })}
            </ol>
          </div>
        </section>
      )}
    </>
  )
}

/* ------------------------------------------------------------------ Warranty (styled like the template's "Pool Packages") */
export function WarrantyBlock({ block, ctx }: { block: B; ctx: BlockCtx }) {
  const items = (block.items ?? []) as { label: string; value: string; id?: string }[]
  const cta = resolveLink(block.cta, ctx.locale)
  const dark = (ctx.tone ?? 'dark') === 'dark'
  return (
    <Section {...blockTheme(block, ctx)} theme={dark ? 'dark' : ctx.tone}>
      <SectionHeader dark={dark} eyebrow={block.header?.eyebrow} heading={block.header?.heading} intro={block.header?.intro} />
      <ul className="grid gap-[var(--grid-gap)] sm:grid-cols-2 lg:grid-cols-4">
        {items.map((w, i) => {
          const [num, ...unit] = String(w.value).split(' ')
          return (
            <li key={w.id ?? i} className={cx('rounded-[var(--radius-card)] p-[var(--card-pad)] md:p-8', dark ? 'bg-white/5 ring-1 ring-white/10' : 'border border-border bg-white')} data-reveal>
              <h3 className="text-h4">{w.label}</h3>
              <p className={cx('mt-4 font-display text-h1 font-bold', dark ? 'text-white' : 'text-heading')}>
                {num}
                <span className={cx('ml-2 text-lg font-semibold', dark ? 'text-primary' : 'text-primary-strong')}>{unit.join(' ')}</span>
              </p>
            </li>
          )
        })}
      </ul>
      {cta && (
        <div className="mt-12 text-center">
          <Button href={cta.href}>{cta.label}</Button>
        </div>
      )}
    </Section>
  )
}

/* Picks a meaningful UiIcon by keyword so process/feature cards aren't just a bare number —
   editors can still override per item with their own uploaded icon (the `icon` field). */
const ICON_KEYWORDS: [RegExp, string][] = [
  [/baxış|görüş/i, 'pin'],
  [/layihələndir/i, 'ruler'],
  [/qazıntı/i, 'compass'],
  [/beton/i, 'shield'],
  [/su keçirməz|izolyasiya/i, 'drop'],
  [/üzlük|mozaika|keramika/i, 'gem'],
  [/filtrasiya|texnologiya/i, 'gear'],
  [/açar|anahtar|təhvil/i, 'check'],
  [/komanda/i, 'compass'],
  [/fərdi/i, 'ruler'],
  [/lisenziya/i, 'shield'],
  [/müasir|həll/i, 'gear'],
]
const iconFor = (title: string) => ICON_KEYWORDS.find(([re]) => re.test(title))?.[1]

function CardIcon({ icon, fallback }: { icon?: Media | number | null; fallback: ReactNode }) {
  const img = mediaProps(icon as Media, 'thumb')
  return (
    <span className="grid size-10 place-items-center rounded-full bg-primary-soft text-sm font-semibold text-primary-strong">
      {img ? <Image src={img.src} alt="" width={20} height={20} className="object-contain" /> : fallback}
    </span>
  )
}

/* ------------------------------------------------------------------ Process (template "Our Process") */
export function ProcessBlock({ block, ctx }: { block: B; ctx: BlockCtx }) {
  const steps = (block.steps ?? []) as { title: string; duration?: string; description?: string; id?: string; icon?: Media | number | null }[]
  const cta = resolveLink(block.cta, ctx.locale)
  return (
    <Section {...blockTheme(block, ctx)}>
      <SectionHeader eyebrow={block.header?.eyebrow} heading={block.header?.heading} intro={block.header?.intro} />
      {/* calm steps: hairline on top, an icon + small teal step number, title, optional duration, text */}
      <ol className="grid gap-x-[var(--grid-gap)] gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
        {steps.map((s, i) => (
          <li key={s.id ?? i} className="flex flex-col border-t border-border pt-6" data-reveal>
            <div className="flex items-center gap-3">
              <CardIcon icon={s.icon} fallback={<UiIcon name={iconFor(s.title) ?? 'chevron'} className="text-[20px]" />} />
              <span className="text-sm font-semibold text-primary-strong tabular-nums">{String(i + 1).padStart(2, '0')}</span>
            </div>
            <h3 className="mt-3 text-h4">{s.title}</h3>
            {s.duration && <p className="mt-2 text-xs font-medium text-muted">{s.duration}</p>}
            {s.description && <p className="mt-3 text-card">{s.description}</p>}
          </li>
        ))}
      </ol>
      {(block.footnote || cta) && (
        <div className="mt-12 flex flex-col items-center gap-5 text-center">
          {block.footnote && <p className="text-h4 text-heading">{block.footnote}</p>}
          {cta && <Button href={cta.href}>{cta.label}</Button>}
        </div>
      )}
    </Section>
  )
}

/* ------------------------------------------------------------------ Feature grid (template "Why Choose Us") */
export function FeatureGridBlock({ block, ctx }: { block: B; ctx: BlockCtx }) {
  const items = (block.items ?? []) as { title: string; description?: string; id?: string; icon?: Media | number | null }[]
  return (
    <Section {...blockTheme(block, ctx)}>
      <SectionHeader eyebrow={block.header?.eyebrow} heading={block.header?.heading} intro={block.header?.intro} />
      <ul className={cx('grid gap-[var(--grid-gap)] sm:grid-cols-2', items.length === 4 ? 'lg:grid-cols-4' : 'lg:grid-cols-3')}>
        {items.map((f, i) => (
          <li key={f.id ?? i} className="rounded-[var(--radius-card)] border border-border bg-white p-[var(--card-pad)]" data-reveal>
            <CardIcon icon={f.icon} fallback={block.numbered === false ? <UiIcon name={iconFor(f.title) ?? 'check'} className="text-[20px]" /> : i + 1} />
            <h3 className="mt-5 text-h4">{f.title}</h3>
            {f.description && <p className="mt-2 text-card">{f.description}</p>}
          </li>
        ))}
      </ul>
    </Section>
  )
}

/* ------------------------------------------------------------------ CTA band */
export async function CTABlock({ block, ctx }: { block: B; ctx: BlockCtx }) {
  const cta = resolveLink(block.primaryCta, ctx.locale)
  const img = mediaProps(block.image as Media, 'hero')
  const settings = block.showPhone ? await getGlobal<SiteSetting>('site-settings', ctx.locale, 0) : null
  const phone = settings?.phones?.find((p) => p.primary)?.number ?? settings?.phones?.[0]?.number
  return (
    <section className="relative isolate overflow-hidden bg-dark py-20 text-white">
      {img && <Image src={img.src} alt="" fill sizes="100vw" className="-z-20 object-cover" />}
      <div className="absolute inset-0 -z-10 bg-[image:var(--hero-overlay)]" />
      <div className="container-x flex flex-col items-start gap-8 lg:flex-row lg:items-center lg:justify-between">
        <SectionHeader dark align="start" eyebrow={ctx.d.contact} heading={block.heading} intro={block.text} className="mb-0 max-w-2xl text-left" />
        <div className="flex flex-wrap items-center justify-center gap-4">
          {cta && <Button href={cta.href}>{cta.label}</Button>}
          {phone && (
            <a href={`tel:${phone.replace(/[^\d+]/g, '')}`} className="flex items-center gap-2 font-display text-lg font-semibold text-white hover:text-primary">
              <UiIcon name="phone" className="text-primary" />
              {phone}
            </a>
          )}
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ Rich text & media+content (inner pages) */
export function RichTextBlock({ block, ctx }: { block: B; ctx: BlockCtx }) {
  return (
    <Section {...blockTheme(block, ctx)}>
      <div className={cx('prose-pool', block.width === 'wide' ? 'max-w-none' : 'mx-auto')}>
        <RichText data={block.content} />
      </div>
    </Section>
  )
}

export function MediaContentBlock({ block, ctx }: { block: B; ctx: BlockCtx }) {
  const img = mediaProps(block.image as Media, 'large')
  const cta = resolveLink(block.cta, ctx.locale)
  return (
    <Section {...blockTheme(block, ctx)}>
      <div className="grid items-center gap-12 lg:grid-cols-2">
        {img && (
          <div className={cx('relative aspect-[4/3] overflow-hidden rounded-[var(--radius-media)]', block.imagePosition === 'left' ? 'lg:order-first' : 'lg:order-last')} data-reveal>
            <Image src={img.src} alt={img.alt} fill sizes="(min-width:1024px) 50vw, 100vw" className="object-cover" />
          </div>
        )}
        <div data-reveal>
          <SectionHeader align="start" eyebrow={block.header?.eyebrow} heading={block.header?.heading} className="mb-0" />
          {block.body && (
            <div className="prose-pool mt-6">
              <RichText data={block.body} />
            </div>
          )}
          {cta && (
            <Button href={cta.href} className="mt-8">
              {cta.label}
            </Button>
          )}
        </div>
      </div>
    </Section>
  )
}
