import { RichText } from '@payloadcms/richtext-lexical/react'
import Image from 'next/image'

import { UiIcon } from '@/components/icons/UiIcon'
import { Button, cx, Section, SectionHeader } from '@/components/ui/primitives'
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
  const bullets = (block.bullets ?? []) as { id?: string; text: string }[]
  const grid = block.bulletsAsGrid && bullets.length > 0
  return (
    <>
      {/* Template "About Us" intro: 582×370 photo + 250×250 photo overlapping its corner, text right */}
      <Section {...blockTheme(block)}>
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div className="relative pr-[50px] pb-[50px]" data-reveal>
            {big && (
              <div className="relative aspect-[582/370] overflow-hidden rounded-[15px]">
                <Image src={big.src} alt={big.alt} fill sizes="(min-width:1024px) 582px, 100vw" className="object-cover" />
              </div>
            )}
            {small && (
              <div className="absolute right-0 bottom-0 aspect-square w-[40%] max-w-[250px] overflow-hidden rounded-[15px]">
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
        <section className="bg-card-tint px-[15px]">
          <div className="mx-auto max-w-[1304px] py-[60px] md:py-[100px]">
            <SectionHeader eyebrow={block.gridHeader?.eyebrow} heading={block.gridHeader?.heading} intro={block.gridHeader?.intro} className="mb-5" />
            <ol className="grid gap-x-[30px] gap-y-10 pt-5 sm:grid-cols-2 lg:grid-cols-3">
              {bullets.map((b, i) => {
                const [title, ...rest] = b.text.split(/\s+[—–-]\s+/)
                const desc = rest.join(' — ')
                return (
                  <li key={b.id ?? b.text} className="flex gap-5" data-reveal>
                    <span className="grid size-20 shrink-0 place-items-center rounded-[15px] bg-header-sticky text-[40px] leading-none text-white">{i + 1}</span>
                    <div>
                      <h3 className="mb-[14px] text-[20px] leading-none tracking-normal">{desc ? title : b.text}</h3>
                      {desc && <p className="leading-[30px]">{desc}</p>}
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
      {/* Template "How it works": centred columns, 80px cyan circle, 20px title, arrow between columns */}
      <ol className="grid gap-x-[30px] gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
        {steps.map((s, i) => (
          <li key={s.id ?? i} className="relative flex flex-col items-center gap-5 px-[5px] text-center" data-reveal>
            <span className="grid size-20 shrink-0 place-items-center rounded-full bg-primary font-display text-[30px] leading-none font-bold text-heading">
              {String(i + 1).padStart(2, '0')}
            </span>
            <div>
              <h3 className="mb-[14px] text-[20px] leading-none tracking-normal">{s.title}</h3>
              {s.duration && <p className="mb-3 inline-flex rounded-[25px] bg-soft px-[15px] py-2 text-[14px] leading-[14px]">{s.duration}</p>}
              {s.description && <p className="leading-[30px]">{s.description}</p>}
            </div>
            {/* arrow in the gap to the next column (not after the last step of a row) */}
            {(i + 1) % 4 !== 0 && i < steps.length - 1 && (
              <svg viewBox="0 0 24 24" className="absolute top-[132px] -right-[27px] hidden size-6 fill-heading lg:block" aria-hidden="true">
                <path d="M23.124,9.879,18.538,5.293,17.124,6.707l4.262,4.263L0,11l0,2,21.446-.03-4.323,4.323,1.414,1.414,4.587-4.586A3.007,3.007,0,0,0,23.124,9.879Z" />
              </svg>
            )}
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
      <div className="container-x flex flex-col items-start gap-8 lg:flex-row lg:items-center lg:justify-between">
        <SectionHeader dark align="start" eyebrow={ctx.d.contact} heading={block.heading} intro={block.text} className="mb-0 max-w-2xl text-left" />
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
