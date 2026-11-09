import { RichText } from '@payloadcms/richtext-lexical/react'
import Image from 'next/image'

import { UiIcon } from '@/components/icons/UiIcon'
import { Button, cx, Eyebrow, Section, SectionHeader, TwoTone } from '@/components/ui/primitives'
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
export function StatsBlock({ block }: { block: B; ctx: BlockCtx }) {
  const items = (block.items ?? []) as { value: number; suffix?: string; label: string; id?: string }[]
  const dark = block.settings?.theme === 'dark'
  return (
    <section className={cx('py-14', dark ? 'bg-dark' : 'bg-soft')}>
      <ul className="container-x grid grid-cols-2 gap-y-10 lg:grid-cols-4">
        {items.map((s, i) => (
          <li key={s.id ?? i} className={cx('px-4 text-center', i > 0 && 'lg:border-l', dark ? 'border-white/15' : 'border-heading/10')} data-reveal>
            <p className={cx('font-display text-[clamp(2.5rem,2rem+2vw,3.5rem)] leading-none font-extrabold tracking-[-0.04em]', dark ? 'text-white' : 'text-heading')}>
              {s.value}
              <span className="text-primary">{s.suffix}</span>
            </p>
            <p className={cx('mt-3', dark ? 'text-on-dark-muted' : 'text-text')}>{s.label}</p>
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
  return (
    <Section {...blockTheme(block)}>
      <div className="grid items-center gap-14 lg:grid-cols-2">
        <div className="relative pb-16 lg:pr-16" data-reveal>
          {big && (
            <div className="relative aspect-[5/6] overflow-hidden rounded-[var(--radius-media)] lg:w-[85%]">
              <Image src={big.src} alt={big.alt} fill sizes="(min-width:1024px) 40vw, 100vw" className="object-cover" />
            </div>
          )}
          {small && (
            <div className="absolute right-0 bottom-0 aspect-square w-[46%] overflow-hidden rounded-[var(--radius-media)] border-8 border-white shadow-[var(--shadow-card)]">
              <Image src={small.src} alt={small.alt} fill sizes="25vw" className="object-cover" />
            </div>
          )}
          {block.badge?.value && (
            <div className="absolute top-8 left-6 rounded-[var(--radius-card)] bg-primary px-6 py-4 text-on-primary shadow-[var(--shadow-card)]">
              <p className="font-display text-4xl leading-none font-extrabold">{block.badge.value}</p>
              <p className="mt-1 text-sm font-semibold">{block.badge.label}</p>
            </div>
          )}
        </div>
        <div data-reveal>
          {block.header?.eyebrow && <Eyebrow>{block.header.eyebrow}</Eyebrow>}
          {block.header?.heading && (
            <h2 className="mt-5">
              <TwoTone text={block.header.heading} />
            </h2>
          )}
          {block.body && (
            <div className="prose-pool mt-6">
              <RichText data={block.body} />
            </div>
          )}
          {block.bullets?.length > 0 && (
            <ul className="mt-6 grid gap-3">
              {block.bullets.map((b: any) => (
                <li key={b.id} className="flex gap-3 text-heading">
                  <UiIcon name="check" className="mt-1.5 shrink-0 text-primary" />
                  <span>{b.text}</span>
                </li>
              ))}
            </ul>
          )}
          {cta && (
            <Button href={cta.href} className="mt-9">
              {cta.label}
            </Button>
          )}
        </div>
      </div>
    </Section>
  )
}

/* ------------------------------------------------------------------ Warranty (styled like the template's "Pool Packages") */
export function WarrantyBlock({ block, ctx }: { block: B; ctx: BlockCtx }) {
  const items = (block.items ?? []) as { label: string; value: string; id?: string }[]
  const cta = resolveLink(block.cta, ctx.locale)
  return (
    <Section theme="dark" id={block.settings?.anchorId || undefined}>
      <SectionHeader dark eyebrow={block.header?.eyebrow} heading={block.header?.heading} intro={block.header?.intro} />
      <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((w, i) => {
          const [num, ...unit] = String(w.value).split(' ')
          return (
            <li key={w.id ?? i} className="rounded-[var(--radius-media)] bg-white/5 p-10 ring-1 ring-white/10 transition-colors hover:bg-white/10" data-reveal>
              <h3 className="text-xl">{w.label}</h3>
              <p className="mt-6 font-display text-5xl leading-none font-extrabold tracking-[-0.04em] text-white">
                {num}
                <span className="ml-2 text-lg font-semibold text-primary">{unit.join(' ')}</span>
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

/* ------------------------------------------------------------------ Process (template "Our Process") */
export function ProcessBlock({ block, ctx }: { block: B; ctx: BlockCtx }) {
  const steps = (block.steps ?? []) as { title: string; duration?: string; description?: string; id?: string }[]
  const cta = resolveLink(block.cta, ctx.locale)
  return (
    <Section theme={block.settings?.theme === 'dark' ? 'light' : (block.settings?.theme ?? 'light')} id={block.settings?.anchorId || undefined}>
      <SectionHeader eyebrow={block.header?.eyebrow} heading={block.header?.heading} intro={block.header?.intro} />
      <ol className="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
        {steps.map((s, i) => (
          <li key={s.id ?? i} className="relative" data-reveal>
            <div className="flex items-center gap-4">
              <span className="grid size-14 shrink-0 place-items-center rounded-full bg-primary font-display text-lg font-extrabold text-on-primary">
                {String(i + 1).padStart(2, '0')}
              </span>
              {i < steps.length - 1 && <span className="hidden h-px flex-1 border-t-2 border-dashed border-primary/40 lg:block" aria-hidden="true" />}
            </div>
            <h3 className="mt-6 text-xl">{s.title}</h3>
            {s.duration && <p className="mt-2 inline-flex rounded-[var(--radius-badge)] bg-badge px-3 py-0.5 text-sm font-semibold text-heading">{s.duration}</p>}
            {s.description && <p className="mt-3">{s.description}</p>}
          </li>
        ))}
      </ol>
      {(block.footnote || cta) && (
        <div className="mt-14 flex flex-col items-center gap-5 text-center">
          {block.footnote && <p className="font-display text-lg font-bold text-heading">{block.footnote}</p>}
          {cta && <Button href={cta.href}>{cta.label}</Button>}
        </div>
      )}
    </Section>
  )
}

/* ------------------------------------------------------------------ Feature grid (template "Why Choose Us") */
export function FeatureGridBlock({ block }: { block: B; ctx: BlockCtx }) {
  const items = (block.items ?? []) as { title: string; description?: string; id?: string }[]
  return (
    <Section {...blockTheme(block)}>
      <SectionHeader eyebrow={block.header?.eyebrow} heading={block.header?.heading} intro={block.header?.intro} />
      <ul className={cx('grid gap-6 sm:grid-cols-2', items.length === 4 ? 'lg:grid-cols-4' : 'lg:grid-cols-3')}>
        {items.map((f, i) => (
          <li key={f.id ?? i} className="rounded-[var(--radius-card)] bg-white p-8 shadow-[var(--shadow-card)] ring-1 ring-heading/5" data-reveal>
            <span className="grid size-12 place-items-center rounded-full bg-primary-soft font-display text-lg font-extrabold text-heading">
              {block.numbered === false ? <UiIcon name="check" className="text-primary" /> : i + 1}
            </span>
            <h3 className="mt-6 text-xl">{f.title}</h3>
            {f.description && <p className="mt-3">{f.description}</p>}
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
      <div className="container-x flex flex-col items-center gap-8 text-center lg:flex-row lg:justify-between lg:text-left" data-reveal>
        <div className="max-w-2xl">
          <h2 className="text-white">
            <TwoTone text={block.heading} />
          </h2>
          {block.text && <p className="mt-4 text-white/80">{block.text}</p>}
        </div>
        <div className="flex flex-wrap items-center justify-center gap-4">
          {cta && <Button href={cta.href}>{cta.label}</Button>}
          {phone && (
            <a href={`tel:${phone.replace(/[^\d+]/g, '')}`} className="flex items-center gap-2 font-display text-xl font-bold text-white hover:text-primary">
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
export function RichTextBlock({ block }: { block: B; ctx: BlockCtx }) {
  return (
    <Section {...blockTheme(block)}>
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
    <Section {...blockTheme(block)}>
      <div className="grid items-center gap-12 lg:grid-cols-2">
        {img && (
          <div className={cx('relative aspect-[4/3] overflow-hidden rounded-[var(--radius-media)]', block.imagePosition === 'left' ? 'lg:order-first' : 'lg:order-last')} data-reveal>
            <Image src={img.src} alt={img.alt} fill sizes="(min-width:1024px) 50vw, 100vw" className="object-cover" />
          </div>
        )}
        <div data-reveal>
          {block.header?.eyebrow && <Eyebrow>{block.header.eyebrow}</Eyebrow>}
          {block.header?.heading && (
            <h2 className="mt-5">
              <TwoTone text={block.header.heading} />
            </h2>
          )}
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
