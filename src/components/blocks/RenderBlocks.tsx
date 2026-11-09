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
  PriceTableBlock,
  ServiceAreasBlock,
  TeamBlock,
  TestimonialsBlock,
  VideoBlock,
} from './CompanyBlocks'
import { HeroBlock } from './HeroBlock'
import type { BlockCtx } from './shared'

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

export function RenderBlocks({ blocks, locale, heroVariant }: { blocks?: any[] | null; locale: Locale; heroVariant?: string }) {
  const d = t(locale)
  const visible = (blocks ?? [])
    .filter((b) => !b.settings?.hidden)
    .map((b) => (heroVariant && b.blockType === 'hero' ? { ...b, variant: heroVariant } : b))
  return (
    <>
      {visible.map((b, i) => {
        const R = RENDERERS[b.blockType]
        if (!R) return null
        return <R key={b.id ?? i} block={b} ctx={{ locale, d, isFirst: i === 0, prevBlock: visible[i - 1] && (visible[i - 1].blockType === 'hero' ? `hero:${visible[i - 1].variant ?? 'rotating'}` : visible[i - 1].blockType) }} />
      })}
    </>
  )
}
