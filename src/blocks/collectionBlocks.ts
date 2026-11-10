import type { Block } from 'payload'

import { blockSettings, linkField, sectionHeader } from '@/fields/sectionHeader'

/**
 * Blocks that render items from a collection. Each one supports:
 *  - "auto"   -> latest / featured items by order
 *  - "manual" -> editor picks items and their order
 */
const sourceFields = (relationTo: string, defaultLimit = 6) => [
  {
    name: 'source',
    label: 'Mənbə',
    type: 'radio' as const,
    defaultValue: 'auto',
    options: [
      { label: 'Avtomatik (sıraya görə)', value: 'auto' },
      { label: 'Əl ilə seçim', value: 'manual' },
    ],
  },
  {
    name: 'items',
    label: 'Seçilmiş elementlər',
    type: 'relationship' as const,
    relationTo: relationTo as never,
    hasMany: true,
    admin: { condition: (_: unknown, s: { source?: string }) => s?.source === 'manual' },
  },
  {
    name: 'limit',
    label: 'Say',
    type: 'number' as const,
    defaultValue: defaultLimit,
    admin: { condition: (_: unknown, s: { source?: string }) => s?.source !== 'manual' },
  },
]

const make = (
  slug: string,
  singular: string,
  relationTo: string,
  extra: Block['fields'] = [],
  defaultLimit = 6,
): Block => ({
  slug,
  labels: { singular, plural: singular },
  fields: [sectionHeader(), ...sourceFields(relationTo, defaultLimit), ...extra, linkField('cta', 'Düymə'), blockSettings],
})

export const CategoryStripBlock = make('categoryStrip', 'Kateqoriya ikonları', 'categories', [], 12)

export const ReferencesBlock = make('references', 'Referanslar', 'references', [
  { name: 'showBrandMarquee', label: 'Altında brend loqoları (marquee)', type: 'checkbox', defaultValue: true },
], 8)

export const ProjectsCarouselBlock = make('projectsCarousel', 'Layihələr karuseli', 'projects', [
  { name: 'showCategoryTabs', label: 'Kateqoriya tabları', type: 'checkbox', defaultValue: true },
], 9)

export const ServicesGridBlock = make('servicesGrid', 'Xidmətlər grid', 'services', [
  {
    name: 'layout', label: 'Görünüş', type: 'select', defaultValue: 'grid',
    options: [
      { label: 'Grid', value: 'grid' },
      { label: 'Tablar (şəkil + bəndlər)', value: 'tabs' },
      { label: 'Böyük şəkilli kartlar (tünd fon)', value: 'overlay' },
    ],
  },
  {
    name: 'show',
    label: 'Nə göstərilsin',
    type: 'select',
    defaultValue: 'services',
    admin: { description: 'İstiqamətlər = Hovuz, SPA, Sauna, Türk hamamı… səhifələri (kateqoriyalar).' },
    options: [
      { label: 'Xidmətlər (Xidmətlər kolleksiyası)', value: 'services' },
      { label: 'İstiqamətlər (kateqoriya səhifələri)', value: 'categories' },
    ],
  },
  {
    name: 'categoryItems',
    label: 'İstiqamətlər (sıra ilə)',
    type: 'relationship',
    relationTo: 'categories',
    hasMany: true,
    admin: {
      description: 'Boş qalsa bütün dərc olunmuş istiqamətlər admin sırası ilə göstərilir.',
      condition: (_: unknown, s: { show?: string }) => s?.show === 'categories',
    },
  },
])

export const ProductsShowcaseBlock = make('productsShowcase', 'Məhsullar', 'products', [
  { name: 'showCategoryTabs', label: 'Kateqoriya tabları', type: 'checkbox', defaultValue: true },
], 8)

export const FAQBlock = make('faq', 'FAQ (akkordeon)', 'faqs', [
  { name: 'showContactForm', label: 'Yanında qısa forma', type: 'checkbox', defaultValue: true },
], 6)

export const LatestPostsBlock = make('latestPosts', 'Son bloq yazıları', 'posts', [], 3)
export const TeamBlock = make('team', 'Komanda', 'team', [], 8)
export const CertificatesBlock = make('certificates', 'Sertifikatlar', 'certificates', [], 8)
export const BrandLogosBlock = make('brandLogos', 'Brend loqoları', 'brands', [
  { name: 'marquee', label: 'Sonsuz sürüşən zolaq', type: 'checkbox', defaultValue: true },
], 12)
export const GalleryBlock = make('gallery', 'Qalereya', 'gallery', [
  { name: 'showFilters', label: 'Kateqoriya filtri', type: 'checkbox', defaultValue: true },
], 12)
export const TestimonialsBlock = make('testimonials', 'Rəylər', 'testimonials', [], 8)
export const ServiceAreasBlock = make('serviceAreas', 'Xidmət əraziləri', 'service-areas', [], 20)
