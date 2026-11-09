import type { Block } from 'payload'

import {
  BrandLogosBlock,
  CategoryStripBlock,
  CertificatesBlock,
  FAQBlock,
  GalleryBlock,
  LatestPostsBlock,
  ProductsShowcaseBlock,
  ProjectsCarouselBlock,
  ReferencesBlock,
  ServiceAreasBlock,
  ServicesGridBlock,
  TeamBlock,
  TestimonialsBlock,
} from './collectionBlocks'
import {
  AboutIntroBlock,
  BeforeAfterBlock,
  CalculatorBlock,
  ContactFormBlock,
  CTABlock,
  FeatureGridBlock,
  MediaContentBlock,
  PriceTableBlock,
  ProcessBlock,
  RichTextBlock,
  StatsBlock,
  VideoBlock,
  WarrantyBlock,
} from './contentBlocks'
import { HeroBlock } from './Hero'

/**
 * Block library available in the page builder.
 * To add a new section: create the config here + a renderer in src/components/blocks.
 */
export const pageBlocks: Block[] = [
  HeroBlock,
  CategoryStripBlock,
  StatsBlock,
  ReferencesBlock,
  ProjectsCarouselBlock,
  AboutIntroBlock,
  BeforeAfterBlock,
  ServicesGridBlock,
  WarrantyBlock,
  ProcessBlock,
  ProductsShowcaseBlock,
  FAQBlock,
  LatestPostsBlock,
  TeamBlock,
  CertificatesBlock,
  BrandLogosBlock,
  GalleryBlock,
  ServiceAreasBlock,
  PriceTableBlock,
  FeatureGridBlock,
  MediaContentBlock,
  RichTextBlock,
  CTABlock,
  ContactFormBlock,
  VideoBlock,
  CalculatorBlock,
  TestimonialsBlock,
]

/** Lighter set for inner documents (service, category, project, area pages). */
export const detailBlocks: Block[] = pageBlocks.filter((b) => b.slug !== 'hero')
