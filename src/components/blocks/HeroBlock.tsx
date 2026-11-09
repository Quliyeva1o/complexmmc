import Image from 'next/image'

import { UiIcon } from '@/components/icons/UiIcon'
import { Button } from '@/components/ui/primitives'
import { mediaProps } from '@/lib/media'
import { resolveLink } from '@/lib/urls'
import type { HeroBlock as HeroT, Media } from '@/payload-types'
import type { BlockCtx } from './shared'

/**
 * Template homepage-3 hero: full-screen photo with navy overlay, a large rotating word,
 * the H1 in accent colour, a subtitle, one pill button and three check-mark badges — centred.
 */
export function HeroBlock({ block, ctx }: { block: HeroT; ctx: BlockCtx }) {
  const img = mediaProps(block.backgroundImage as Media, 'hero')
  const primary = resolveLink(block.primaryCta as never, ctx.locale)
  const secondary = resolveLink(block.secondaryCta as never, ctx.locale)
  const words = (block.rotatingWords ?? []).map((w) => w.text)

  return (
    <section className="relative isolate flex min-h-[100svh] items-center overflow-hidden bg-dark text-center text-white">
      {img && <Image src={img.src} alt={img.alt} fill priority sizes="100vw" className="-z-20 object-cover" />}
      <div className="absolute inset-0 -z-10 bg-[image:var(--hero-overlay)]" />

      <div className="container-x pt-32 pb-24">
        {words.length > 0 && (
          <p className="hero-rotator font-display text-mega leading-[1.3] font-bold tracking-[-0.02em] text-white" aria-hidden="true">
            {words.map((w, i) => (
              <span key={w} style={{ animationDelay: `${i * 3}s` }}>
                {w}
              </span>
            ))}
          </p>
        )}
        <h1 className="mx-auto max-w-5xl text-[clamp(2rem,1.3rem+2.6vw,3.25rem)] leading-[1.15] text-primary">{block.heading}</h1>
        {block.subheading && <p className="mx-auto mt-5 max-w-2xl text-lg text-white/80">{block.subheading}</p>}
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          {primary && <Button href={primary.href}>{primary.label}</Button>}
          {secondary && (
            <Button href={secondary.href} variant="outlineLight">
              {secondary.label}
            </Button>
          )}
        </div>
        {block.badges && block.badges.length > 0 && (
          <ul className="mt-8 flex flex-wrap justify-center gap-x-8 gap-y-2 text-white/90">
            {block.badges.map((b) => (
              <li key={b.id ?? b.text} className="flex items-center gap-2">
                <UiIcon name="check" className="text-primary" />
                {b.text}
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  )
}
