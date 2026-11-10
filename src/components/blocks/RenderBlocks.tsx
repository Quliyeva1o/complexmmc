import type { ComponentType } from 'react'

import type { Locale } from '@/i18n/config'
import { t } from '@/i18n/dictionary'
import {
  BeforeAfterBlock,
  BrandLogosBlock,
  CategoryStripBlock,
  FAQBlock,
  LatestPostsBlock,
  ProjectsCarouselBlock,
  ReferencesBlock,
  ServicesGridBlock,
} from './CollectionBlocks'
import {
  AboutIntroBlock,
  CTABlock,
  FeatureGridBlock,
  MediaContentBlock,
  ProcessBlock,
  RichTextBlock,
  StatsBlock,
  WarrantyBlock,
} from './ContentBlocks'
import {
  CalculatorBlock,
  CertificatesBlock,
  ContactFormBlock,
  GalleryBlock,
  isEmptyBlock,
  PriceTableBlock,
  ServiceAreasBlock,
  TeamBlock,
  TestimonialsBlock,
  VideoBlock,
} from './CompanyBlocks'
import { HeroBlock } from './HeroBlock'
import type { BlockCtx, Tone } from './shared'

/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * blockType → renderer. To add a section: block config in src/blocks + a renderer here.
 * Unknown block types render nothing.
 */
const RENDERERS: Record<string, ComponentType<{ block: any; ctx: BlockCtx }>> = {
  hero: HeroBlock,
  categoryStrip: CategoryStripBlock,
  stats: StatsBlock,
  references: ReferencesBlock,
  projectsCarousel: ProjectsCarouselBlock,
  aboutIntro: AboutIntroBlock,
  beforeAfter: BeforeAfterBlock,
  servicesGrid: ServicesGridBlock,
  warranty: WarrantyBlock,
  process: ProcessBlock,
  featureGrid: FeatureGridBlock,
  faq: FAQBlock,
  latestPosts: LatestPostsBlock,
  cta: CTABlock,
  brandLogos: BrandLogosBlock,
  richText: RichTextBlock,
  mediaContent: MediaContentBlock,
  team: TeamBlock,
  certificates: CertificatesBlock,
  gallery: GalleryBlock,
  contactForm: ContactFormBlock,
  testimonials: TestimonialsBlock,
  serviceAreas: ServiceAreasBlock,
  priceTable: PriceTableBlock,
  video: VideoBlock,
  calculator: CalculatorBlock,
}

/** Accent sections: the only ones on a dark background. */
const DARK = new Set(['warranty', 'cta'])
/** Blocks with no background of their own (they sit on the hero / page). */
const NO_TONE = new Set(['hero', 'categoryStrip'])
/** Blocks that render two sections; the second gets the opposite tone. */
const twoSections = (b: any) =>
  (b.blockType === 'aboutIntro' && b.bulletsAsGrid && (b.bullets ?? []).length > 0) ||
  (b.blockType === 'contactForm' && b.showContactInfo !== false)

/**
 * Section rhythm: after the hero, sections alternate white → soft → white…; dark accent sections
 * (warranty, final CTA) break the run and the next one starts white again. Editors' per-block
 * theme is ignored on purpose so every page keeps the same calm rhythm.
 */
function assignTones(blocks: any[]): { tone?: Tone; tone2?: Tone }[] {
  let next: Tone = 'light'
  const flip = (t: Tone): Tone => (t === 'light' ? 'soft' : 'light')
  return blocks.map((b, i) => {
    if (NO_TONE.has(b.blockType)) return {}
    // a dark accent never sits directly under the (dark) page banner
    if (DARK.has(b.blockType) && !(i === 0 && b.blockType !== 'cta')) {
      next = 'light'
      return { tone: 'dark' }
    }
    const tone = next
    if (twoSections(b)) {
      next = tone
      return { tone, tone2: flip(tone) }
    }
    next = flip(tone)
    return { tone }
  })
}

export async function RenderBlocks({ blocks, locale, heroVariant }: { blocks?: any[] | null; locale: Locale; heroVariant?: string }) {
  const d = t(locale)
  const shown = (blocks ?? []).filter((b) => !b.settings?.hidden)
  const empty = await Promise.all(shown.map((b) => isEmptyBlock(b, locale)))
  const visible = shown
    .filter((_, i) => !empty[i])
    .map((b) => (heroVariant && b.blockType === 'hero' ? { ...b, variant: heroVariant } : b))
  const tones = assignTones(visible)
  return (
    <>
      {visible.map((b, i) => {
        const R = RENDERERS[b.blockType]
        if (!R) return null
        return <R key={b.id ?? i} block={b} ctx={{ locale, d, isFirst: i === 0, ...tones[i], prevBlock: visible[i - 1] && (visible[i - 1].blockType === 'hero' ? `hero:${visible[i - 1].variant ?? 'rotating'}` : visible[i - 1].blockType) }} />
      })}
    </>
  )
}
