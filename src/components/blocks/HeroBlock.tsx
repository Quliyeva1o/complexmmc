import Image from 'next/image'

import { UiIcon } from '@/components/icons/UiIcon'
import { Button, TwoTone } from '@/components/ui/primitives'
import { ServiceOverlayCard } from '@/components/ui/ServiceOverlayCard'
import { findDocs } from '@/lib/data'
import { mediaProps } from '@/lib/media'
import { docPath, resolveLink } from '@/lib/urls'
import type { HeroBlock as HeroT, Media, Service } from '@/payload-types'
import { HeroVideoBg } from './HeroVideoBg'
import type { BlockCtx } from './shared'

type Variant = 'classic' | 'video' | 'rotating'

/**
 * Hero in the three layouts of the client's template (chosen in admin → Hero → Görünüş):
 *   classic  = Pooluxe Homepage 1   video = Homepage 2   rotating = Homepage 3
 */
export async function HeroBlock({ block, ctx, variant }: { block: HeroT; ctx: BlockCtx; variant?: Variant }) {
  const v = (variant ?? (block as HeroT & { variant?: Variant }).variant ?? 'rotating') as Variant
  if (v === 'classic') return <HeroClassic block={block} ctx={ctx} />
  if (v === 'video') return <HeroVideo block={block} ctx={ctx} />
  return <HeroRotating block={block} ctx={ctx} />
}

function Checks({ items, className, itemClass = 'text-[#F8F9FA]' }: { items: { text: string; id?: string | null }[]; className?: string; itemClass?: string }) {
  return (
    <ul className={className}>
      {items.map((b) => (
        <li key={b.id ?? b.text} className={`flex items-center gap-2 ${itemClass}`}>
          <UiIcon name="check" className="text-sm text-primary" />
          {b.text}
        </li>
      ))}
    </ul>
  )
}

/* ------------------------------------------------------------------ V1 — Homepage 1 */
function HeroClassic({ block, ctx }: { block: HeroT; ctx: BlockCtx }) {
  const img = mediaProps(block.backgroundImage as Media, 'hero')
  const primary = resolveLink(block.primaryCta as never, ctx.locale)
  const card = block.infoCard
  const cardImg = mediaProps((card as { image?: Media } | undefined)?.image as Media, 'thumb')
  return (
    <section className="relative isolate flex overflow-hidden bg-dark text-white">
      {img && <Image src={img.src} alt={img.alt} fill priority fetchPriority="high" sizes="100vw" className="-z-30 object-cover" />}
      {/* navy 80% at 30% + left half navy→transparent at 70% (template overlays) */}
      <div className="absolute inset-0 -z-20 bg-[rgb(0_35_98/0.24)]" />
      <div className="absolute inset-y-0 left-0 -z-10 w-full bg-[linear-gradient(90deg,rgb(0_35_98/0.7),rgb(0_35_98/0))] md:w-1/2" />
      <div className="container-x mt-[120px] mb-[60px] flex w-full flex-col md:mt-[180px] lg:mt-[200px] lg:flex-row lg:items-end lg:justify-between">
        <div>
          <h1 className="mb-[5px] max-w-[870px] text-[42px] leading-[1.25] text-white md:text-[52px] lg:text-[64px]">
            <TwoTone text={block.heading} />
          </h1>
          {block.subheading && <p className="mb-[5px] max-w-[420px] text-white/80">{block.subheading}</p>}
          {primary && (
            <Button href={primary.href} className="mt-5">
              {primary.label}
            </Button>
          )}
          {block.badges?.length ? <Checks items={block.badges} className="mt-[15px] flex flex-wrap gap-x-[30px] gap-y-2 lg:gap-x-[45px]" /> : null}
        </div>
        {card?.enabled && card.phone && (
          <a href={`tel:${card.phone.replace(/[^\d+]/g, '')}`} className="mt-[30px] flex items-center gap-5 self-start lg:self-end">
            <span className="relative size-20 shrink-0 overflow-hidden rounded-full bg-primary/20">
              {cardImg && <Image src={cardImg.src} alt="" fill sizes="80px" className="object-cover" />}
            </span>
            <span>
              <span className="block text-[18px] font-bold text-white">{card.title}</span>
              <span className="block font-display text-[26px] leading-tight font-bold text-white md:text-[32px]">{card.phone}</span>
            </span>
          </a>
        )}
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ V2 — Homepage 2 */
async function HeroVideo({ block, ctx }: { block: HeroT; ctx: BlockCtx }) {
  const img = mediaProps(block.backgroundImage as Media, 'hero')
  const video = videoOf(block)
  const primary = resolveLink(block.primaryCta as never, ctx.locale)
  const services = await findDocs<Service>('services', ctx.locale, { where: { _status: { equals: 'published' } }, depth: 1, limit: 3 })
  return (
    <>
      <section className="relative isolate flex min-h-[600px] items-end overflow-hidden bg-dark text-center text-white md:min-h-[800px]">
        {img && <Image src={img.src} alt={img.alt} fill priority fetchPriority="high" sizes="100vw" className="-z-30 object-cover" />}
        {video && <HeroVideoBg src={video.src} type={video.type} />}
        <div className="absolute inset-0 -z-10 bg-[image:var(--hero-overlay)]" />
        <div className="container-x flex w-full flex-col items-center pt-20 pb-20 md:pt-0">
          {(() => {
            const short = (block as HeroT & { shortHeading?: string | null }).shortHeading
            const text = short || block.heading
            // the template's 120px size is meant for 2–4 words; long SEO headings fall back to 64px
            const big = text.replace(/\*/g, '').length <= 32
            return (
              <h1 className={big ? '-mt-2.5 mb-[5px] text-[42px] leading-[1.1] text-white md:text-[52px] lg:text-[80px] xl:text-[120px]' : 'mb-[5px] max-w-[900px] text-[32px] leading-[1.15] text-white md:text-[52px] lg:text-[64px]'}>
                <TwoTone text={text} />
              </h1>
            )
          })()}
          {block.subheading && <p className="mb-[5px] max-w-[490px] text-white/80">{block.subheading}</p>}
          {primary && (
            <Button href={primary.href} className="mt-5">
              {primary.label}
            </Button>
          )}
          {block.badges?.length ? (
            <Checks items={block.badges} itemClass="font-medium text-white" className="flex w-full flex-wrap justify-center gap-x-8 gap-y-2 pt-5 md:justify-between md:pt-[120px]" />
          ) : null}
        </div>
      </section>
      {services.length > 0 && (
        <section className="bg-header-sticky px-[15px] py-[60px] md:py-[100px]">
          <ul className="container-x grid gap-[30px] md:grid-cols-2 lg:grid-cols-3">
            {services.map((s) => (
              <li key={s.id} data-reveal>
                <ServiceOverlayCard href={docPath('services', s.slug, ctx.locale)} title={s.title} excerpt={s.excerpt} image={mediaProps(s.cover as Media, 'card')} cta={ctx.d.readMore} />
              </li>
            ))}
          </ul>
        </section>
      )}
    </>
  )
}

/* ------------------------------------------------------------------ V3 — rotating words (+ turanprojects video) */
const videoOf = (block: HeroT) =>
  typeof block.backgroundVideo === 'object' && block.backgroundVideo?.url
    ? { src: (block.backgroundVideo as Media).url!.replace(/^https?:\/\/[^/]+/, ''), type: (block.backgroundVideo as Media).mimeType ?? 'video/mp4' }
    : null

function HeroRotating({ block, ctx }: { block: HeroT; ctx: BlockCtx }) {
  const img = mediaProps(block.backgroundImage as Media, 'hero')
  const video = videoOf(block)
  const primary = resolveLink(block.primaryCta as never, ctx.locale)
  const secondary = resolveLink(block.secondaryCta as never, ctx.locale)
  const words = (block.rotatingWords ?? []).map((w) => w.text)
  return (
    <section className="relative isolate flex h-[100svh] flex-col justify-center overflow-hidden bg-dark pt-28 pb-32 text-center text-white lg:h-[calc(100svh+100px)]">
      {img && <Image src={img.src} alt={img.alt} fill priority fetchPriority="high" sizes="100vw" className="-z-30 object-cover" />}
      {video && <HeroVideoBg src={video.src} type={video.type} />}
      <div className="absolute inset-0 -z-10 bg-[image:var(--hero-overlay)]" />
      <div className="pointer-events-none absolute bottom-0 left-1/2 h-[200px] w-[600px] -translate-x-1/2 rounded-full bg-[#087D87]/10 blur-3xl" />
      <div className="container-x flex flex-col items-center [&_.text-accent]:text-primary">
        {words.length > 0 && (
          <p className="hero-zoom mb-3 max-w-full font-display text-mega font-bold text-white" aria-hidden="true">
            {words.map((w, i) => (
              <span key={w} style={{ animationDelay: `${i * 3}s` }}>
                {w}
              </span>
            ))}
          </p>
        )}
        <h1 className="max-w-[760px] text-h2 font-semibold text-white">
          <TwoTone text={block.heading} />
        </h1>
        {block.subheading && <p className="mt-5 max-w-[620px] text-base text-white/80 md:text-lg">{block.subheading}</p>}
        {(primary || secondary) && (
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            {primary && <Button href={primary.href}>{primary.label}</Button>}
            {secondary && (
              <Button href={secondary.href} variant="glass">
                {secondary.label}
              </Button>
            )}
          </div>
        )}
        {block.badges?.length ? <Checks items={block.badges} itemClass="text-sm text-white/85" className="mt-8 flex flex-wrap justify-center gap-x-6 gap-y-2" /> : null}
      </div>
    </section>
  )
}
