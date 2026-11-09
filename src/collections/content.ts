import type { Field } from 'payload'

import { detailBlocks, pageBlocks } from '@/blocks'
import { contentCollection } from './_factory'

const G = {
  content: 'Məzmun',
  catalog: 'Kataloq',
  company: 'Şirkət',
  blog: 'Bloq',
} as const

const title: Field = { name: 'title', label: 'Başlıq', type: 'text', localized: true, required: true }
const excerpt: Field = { name: 'excerpt', label: 'Qısa təsvir', type: 'textarea', localized: true }
const cover: Field = { name: 'cover', label: 'Örtük şəkli', type: 'upload', relationTo: 'media' }
const gallery: Field = {
  name: 'gallery', label: 'Qalereya', type: 'upload', relationTo: 'media', hasMany: true,
}
const banner: Field = {
  name: 'banner', label: 'Səhifə banneri', type: 'upload', relationTo: 'media',
  admin: { description: 'Daxili səhifənin yuxarısındakı fon şəkli.' },
}
const layout = (blocks = detailBlocks): Field => ({
  name: 'layout', label: 'Bölmələr', type: 'blocks', blocks, localized: false,
})
const faqs: Field = {
  name: 'faqs', label: 'FAQ (bu səhifədə)', type: 'relationship', relationTo: 'faqs', hasMany: true,
}
const tabs = (main: Field[], extra: Field[] = []): Field => ({
  type: 'tabs',
  tabs: [
    { label: 'Əsas', fields: main },
    { label: 'Bölmələr', fields: [layout(), ...extra] },
  ],
})

/* ---------------------------------------------------------------- Pages */
export const Pages = contentCollection({
  slug: 'pages',
  singular: 'Səhifə',
  plural: 'Səhifələr',
  group: G.content,
  routable: true,
  drafts: true,
  orderable: false,
  description: 'Ana səhifə, Haqqımızda, Əlaqə, FAQ, qiymət səhifələri və s. Ana səhifənin slug-ı: "home".',
  fields: [
    title,
    banner,
    { name: 'intro', label: 'Banner alt mətni', type: 'textarea', localized: true },
    { name: 'layout', label: 'Bölmələr', type: 'blocks', blocks: pageBlocks },
  ],
})

/* ---------------------------------------------------------------- Categories (pillar pages) */
export const Categories = contentCollection({
  slug: 'categories',
  singular: 'Kateqoriya',
  plural: 'Kateqoriyalar (Hovuz, Sauna, Hamam…)',
  group: G.content,
  routable: true,
  drafts: true,
  description: 'Hero altındakı ikon zolağı + hər kateqoriyanın əsas (pillar) SEO səhifəsi.',
  defaultColumns: ['title', 'shortName', 'showOnHome', 'slug'],
  fields: [
    tabs(
      [
        title,
        {
          type: 'row',
          fields: [
            { name: 'shortName', label: 'Qısa ad (ikon altında)', type: 'text', localized: true, required: true },
            { name: 'showOnHome', label: 'Ana səhifədə göstər', type: 'checkbox', defaultValue: true },
          ],
        },
        {
          name: 'icon', label: 'İkon (SVG)', type: 'upload', relationTo: 'media',
          admin: { description: 'Nazik xətli SVG. Rəngi palitradan avtomatik alır.' },
        },
        { name: 'iconKey', label: 'Daxili ikon (SVG yüklənməyibsə)', type: 'text', admin: { description: 'məs: pool, sauna, hammam' } },
        banner,
        excerpt,
        cover,
        { name: 'body', label: 'Əsas SEO mətni', type: 'richText', localized: true },
      ],
      [faqs],
    ),
  ],
})

/* ---------------------------------------------------------------- Services */
export const Services = contentCollection({
  slug: 'services',
  singular: 'Xidmət',
  plural: 'Xidmətlər',
  group: G.content,
  routable: true,
  drafts: true,
  defaultColumns: ['title', 'category', 'slug', '_status'],
  fields: [
    tabs(
      [
        title,
        { name: 'category', label: 'Kateqoriya', type: 'relationship', relationTo: 'categories', hasMany: true },
        {
          name: 'projectTypes', label: 'Layihə tipi (filtr)', type: 'select', hasMany: true,
          options: [
            { label: 'Villa Wellness', value: 'villa' },
            { label: 'Otel Wellness', value: 'hotel' },
            { label: 'Kommersiya Hovuzu', value: 'commercial' },
          ],
        },
        excerpt,
        { name: 'icon', label: 'İkon (SVG)', type: 'upload', relationTo: 'media' },
        cover,
        banner,
        { name: 'body', label: 'Mətn', type: 'richText', localized: true },
        {
          name: 'counter', label: 'Sayğac', type: 'group',
          fields: [{ type: 'row', fields: [
            { name: 'value', label: 'Rəqəm', type: 'number' },
            { name: 'label', label: 'Etiket', type: 'text', localized: true },
          ] }],
        },
        {
          name: 'features', label: 'Xüsusiyyətlər (01–06)', type: 'array',
          fields: [
            { name: 'title', label: 'Başlıq', type: 'text', localized: true, required: true },
            { name: 'description', label: 'Təsvir', type: 'textarea', localized: true },
          ],
        },
        gallery,
      ],
      [
        faqs,
        { name: 'relatedProjects', label: 'Əlaqəli layihələr', type: 'relationship', relationTo: 'projects', hasMany: true },
        { name: 'relatedProducts', label: 'Əlaqəli məhsullar', type: 'relationship', relationTo: 'products', hasMany: true },
      ],
    ),
  ],
})

/* ---------------------------------------------------------------- Service areas */
export const ServiceAreas = contentCollection({
  slug: 'service-areas',
  singular: 'Xidmət ərazisi',
  plural: 'Xidmət əraziləri',
  group: G.content,
  routable: true,
  drafts: true,
  description: 'Rayon səhifələri (Bilgəh, Novxanı…). Hər birində unikal mətn olmalıdır — kopya mətn SEO-ya zərər verir.',
  fields: [
    tabs(
      [
        title,
        { name: 'district', label: 'Rayon / qəsəbə', type: 'text', localized: true, required: true },
        excerpt,
        banner,
        { name: 'body', label: 'Unikal mətn', type: 'richText', localized: true },
        {
          type: 'row',
          fields: [
            { name: 'lat', label: 'Enlik', type: 'number' },
            { name: 'lng', label: 'Uzunluq', type: 'number' },
          ],
        },
      ],
      [faqs, { name: 'projects', label: 'Bu ərazidəki layihələr', type: 'relationship', relationTo: 'projects', hasMany: true }],
    ),
  ],
})

/* ---------------------------------------------------------------- Projects */
export const ProjectCategories = contentCollection({
  slug: 'project-categories',
  singular: 'Layihə kateqoriyası',
  plural: 'Layihə kateqoriyaları',
  group: G.content,
  routable: true,
  fields: [title],
})

export const Projects = contentCollection({
  slug: 'projects',
  singular: 'Layihə',
  plural: 'Layihələr',
  group: G.content,
  routable: true,
  drafts: true,
  defaultColumns: ['title', 'location', 'projectCategories', 'featured', '_status'],
  fields: [
    tabs(
      [
        title,
        { name: 'projectCategories', label: 'Kateqoriyalar', type: 'relationship', relationTo: 'project-categories', hasMany: true },
        { name: 'reference', label: 'Referans (obyekt)', type: 'relationship', relationTo: 'references' },
        {
          type: 'row',
          fields: [
            { name: 'location', label: 'Yer', type: 'text', localized: true },
            { name: 'size', label: 'Ölçü (məs. 14x6 m)', type: 'text' },
          ],
        },
        {
          type: 'row',
          fields: [
            { name: 'durationDays', label: 'Müddət (gün)', type: 'number' },
            { name: 'year', label: 'İl', type: 'number' },
            { name: 'workType', label: 'İş növü', type: 'text', localized: true },
          ],
        },
        { name: 'featured', label: 'Ana səhifədə göstər', type: 'checkbox', defaultValue: false },
        excerpt,
        cover,
        banner,
        { name: 'body', label: 'Təsvir', type: 'richText', localized: true },
        {
          name: 'highlights', label: 'Əsas məqamlar', type: 'array',
          fields: [
            { name: 'title', label: 'Başlıq', type: 'text', localized: true, required: true },
            { name: 'description', label: 'Təsvir', type: 'textarea', localized: true },
          ],
        },
        gallery,
        {
          name: 'beforeAfter', label: 'Əvvəl / Sonra', type: 'array',
          fields: [{ type: 'row', fields: [
            { name: 'before', label: 'Əvvəl', type: 'upload', relationTo: 'media', required: true },
            { name: 'after', label: 'Sonra', type: 'upload', relationTo: 'media', required: true },
          ] }],
        },
      ],
      [
        { name: 'services', label: 'Göstərilən xidmətlər', type: 'relationship', relationTo: 'services', hasMany: true },
        { name: 'testimonial', label: 'Rəy', type: 'relationship', relationTo: 'testimonials' },
      ],
    ),
  ],
})

/* ---------------------------------------------------------------- Company */
export const References = contentCollection({
  slug: 'references',
  singular: 'Referans',
  plural: 'Referanslar',
  group: G.company,
  titleField: 'name',
  description: 'Bizə etibar edən obyektlər (Hyatt Regency, My Class…).',
  fields: [
    { name: 'name', label: 'Ad', type: 'text', required: true },
    { name: 'type', label: 'Tip (Otel, Fitnes Klubu…)', type: 'text', localized: true },
    { name: 'subtitle', label: 'Alt başlıq', type: 'text', localized: true },
    { type: 'row', fields: [
      { name: 'image', label: 'Şəkil', type: 'upload', relationTo: 'media' },
      { name: 'logo', label: 'Loqo', type: 'upload', relationTo: 'media' },
    ] },
    { name: 'projects', label: 'Layihələr', type: 'relationship', relationTo: 'projects', hasMany: true },
  ],
})

export const Brands = contentCollection({
  slug: 'brands',
  singular: 'Brend',
  plural: 'Brendlər / Tərəfdaşlar',
  group: G.company,
  titleField: 'name',
  fields: [
    { name: 'name', label: 'Ad', type: 'text', required: true },
    { name: 'logo', label: 'Loqo', type: 'upload', relationTo: 'media', required: true },
    { name: 'country', label: 'Ölkə', type: 'text', localized: true },
    { name: 'description', label: 'Təsvir', type: 'text', localized: true },
    { name: 'website', label: 'Sayt', type: 'text' },
  ],
})

export const Team = contentCollection({
  slug: 'team',
  singular: 'Komanda üzvü',
  plural: 'Komanda',
  group: G.company,
  titleField: 'name',
  fields: [
    { name: 'name', label: 'Ad Soyad', type: 'text', required: true },
    { name: 'position', label: 'Vəzifə', type: 'text', localized: true, required: true },
    { name: 'photo', label: 'Foto', type: 'upload', relationTo: 'media' },
    { name: 'bio', label: 'Bio', type: 'textarea', localized: true },
    {
      name: 'socials', label: 'Sosial', type: 'array',
      fields: [{ type: 'row', fields: [
        { name: 'network', label: 'Şəbəkə', type: 'select', options: ['linkedin', 'instagram', 'facebook'] },
        { name: 'url', label: 'URL', type: 'text' },
      ] }],
    },
  ],
})

export const Certificates = contentCollection({
  slug: 'certificates',
  singular: 'Sertifikat',
  plural: 'Sertifikatlar',
  group: G.company,
  fields: [
    title,
    { type: 'row', fields: [
      { name: 'issuer', label: 'Verən qurum', type: 'text', localized: true },
      { name: 'number', label: 'Nömrə', type: 'text' },
    ] },
    { type: 'row', fields: [
      { name: 'issuedAt', label: 'Verilmə tarixi', type: 'date' },
      { name: 'validUntil', label: 'Etibarlıdır', type: 'date' },
    ] },
    { name: 'image', label: 'Şəkil', type: 'upload', relationTo: 'media', required: true },
    { name: 'file', label: 'PDF', type: 'upload', relationTo: 'media' },
  ],
})

export const Testimonials = contentCollection({
  slug: 'testimonials',
  singular: 'Rəy',
  plural: 'Rəylər',
  group: G.company,
  titleField: 'name',
  description: 'Yalnız real müştəri rəyləri. Bölmə hazırda saytda söndürülüb.',
  fields: [
    { name: 'name', label: 'Ad', type: 'text', required: true },
    { name: 'role', label: 'Obyekt / vəzifə', type: 'text', localized: true },
    { name: 'photo', label: 'Foto', type: 'upload', relationTo: 'media' },
    { name: 'rating', label: 'Reytinq', type: 'number', min: 1, max: 5, defaultValue: 5 },
    { name: 'quote', label: 'Rəy', type: 'textarea', localized: true, required: true },
    { type: 'row', fields: [
      { name: 'date', label: 'Tarix', type: 'date' },
      { name: 'source', label: 'Mənbə', type: 'select', options: ['google', 'instagram', 'direct'] },
    ] },
    { name: 'project', label: 'Layihə', type: 'relationship', relationTo: 'projects' },
  ],
})

export const Gallery = contentCollection({
  slug: 'gallery',
  singular: 'Qalereya şəkli',
  plural: 'Qalereya',
  group: G.company,
  titleField: 'title',
  fields: [
    title,
    { name: 'image', label: 'Şəkil', type: 'upload', relationTo: 'media', required: true },
    { name: 'category', label: 'Kateqoriya', type: 'relationship', relationTo: 'categories' },
    { name: 'project', label: 'Layihə', type: 'relationship', relationTo: 'projects' },
  ],
})

export const FAQs = contentCollection({
  slug: 'faqs',
  singular: 'Sual',
  plural: 'FAQ',
  group: G.content,
  titleField: 'question',
  defaultColumns: ['question', 'category', 'showOnFaqPage'],
  fields: [
    { name: 'question', label: 'Sual', type: 'text', localized: true, required: true },
    { name: 'answer', label: 'Cavab', type: 'richText', localized: true, required: true },
    { name: 'category', label: 'Kateqoriya', type: 'relationship', relationTo: 'categories' },
    { name: 'showOnFaqPage', label: 'FAQ səhifəsində göstər', type: 'checkbox', defaultValue: true },
  ],
})

/* ---------------------------------------------------------------- Catalog */
export const ProductCategories = contentCollection({
  slug: 'product-categories',
  singular: 'Məhsul kateqoriyası',
  plural: 'Məhsul kateqoriyaları',
  group: G.catalog,
  routable: true,
  fields: [
    title,
    { name: 'parent', label: 'Ana kateqoriya', type: 'relationship', relationTo: 'product-categories' },
    excerpt,
    { name: 'image', label: 'Şəkil', type: 'upload', relationTo: 'media' },
  ],
})

export const Products = contentCollection({
  slug: 'products',
  singular: 'Məhsul',
  plural: 'Məhsullar',
  group: G.catalog,
  routable: true,
  drafts: true,
  defaultColumns: ['title', 'category', 'brand', 'priceFrom', '_status'],
  fields: [
    title,
    { type: 'row', fields: [
      { name: 'category', label: 'Kateqoriya', type: 'relationship', relationTo: 'product-categories', required: true },
      { name: 'brand', label: 'Brend', type: 'relationship', relationTo: 'brands' },
    ] },
    { type: 'row', fields: [
      { name: 'origin', label: 'Mənşə ölkə', type: 'text', localized: true },
      { name: 'sku', label: 'Kod (SKU)', type: 'text' },
      { name: 'priceFrom', label: 'Başlayan qiymət (AZN)', type: 'number' },
      { name: 'inStock', label: 'Stokda', type: 'checkbox', defaultValue: true },
    ] },
    { name: 'spec', label: 'Qısa spesifikasiya', type: 'text', localized: true },
    excerpt,
    { name: 'images', label: 'Şəkillər', type: 'upload', relationTo: 'media', hasMany: true },
    { name: 'description', label: 'Təsvir', type: 'richText', localized: true },
    {
      name: 'specs', label: 'Texniki göstəricilər', type: 'array',
      fields: [{ type: 'row', fields: [
        { name: 'key', label: 'Göstərici', type: 'text', localized: true, required: true },
        { name: 'value', label: 'Dəyər', type: 'text', localized: true, required: true },
      ] }],
    },
    {
      name: 'variants', label: 'Variantlar (ölçü → qiymət)', type: 'array',
      fields: [{ type: 'row', fields: [
        { name: 'label', label: 'Variant', type: 'text', localized: true, required: true },
        { name: 'price', label: 'Qiymət (AZN)', type: 'number' },
      ] }],
    },
    { name: 'datasheet', label: 'PDF sənəd', type: 'upload', relationTo: 'media' },
  ],
})

/* ---------------------------------------------------------------- Blog */
export const PostCategories = contentCollection({
  slug: 'post-categories',
  singular: 'Bloq kateqoriyası',
  plural: 'Bloq kateqoriyaları',
  group: G.blog,
  routable: true,
  fields: [title],
})

export const Tags = contentCollection({
  slug: 'tags',
  singular: 'Teq',
  plural: 'Teqlər',
  group: G.blog,
  routable: true,
  fields: [title],
})

export const Posts = contentCollection({
  slug: 'posts',
  singular: 'Yazı',
  plural: 'Yazılar',
  group: G.blog,
  routable: true,
  drafts: true,
  orderable: false,
  defaultColumns: ['title', 'publishedAt', 'categories', '_status'],
  fields: [
    title,
    excerpt,
    cover,
    { name: 'content', label: 'Məzmun', type: 'richText', localized: true, required: true },
    { name: 'publishedAt', label: 'Dərc tarixi', type: 'date', admin: { position: 'sidebar' } },
    { name: 'author', label: 'Müəllif (komanda)', type: 'relationship', relationTo: 'team', admin: { position: 'sidebar' } },
    { name: 'authorName', label: 'Müəllif adı (komandada yoxdursa)', type: 'text', admin: { position: 'sidebar' } },
    { name: 'categories', label: 'Kateqoriyalar', type: 'relationship', relationTo: 'post-categories', hasMany: true, admin: { position: 'sidebar' } },
    { name: 'tags', label: 'Teqlər', type: 'relationship', relationTo: 'tags', hasMany: true, admin: { position: 'sidebar' } },
    { name: 'relatedPosts', label: 'Oxşar yazılar', type: 'relationship', relationTo: 'posts', hasMany: true },
    faqs,
  ],
})

export const contentCollections = [
  Pages,
  Categories,
  Services,
  ServiceAreas,
  Projects,
  ProjectCategories,
  FAQs,
  References,
  Brands,
  Team,
  Certificates,
  Testimonials,
  Gallery,
  Products,
  ProductCategories,
  Posts,
  PostCategories,
  Tags,
]

/** Collections that get SEO fields, sitemap entries and redirects on slug change. */
export const routableSlugs = [
  'pages',
  'categories',
  'services',
  'service-areas',
  'projects',
  'project-categories',
  'products',
  'product-categories',
  'posts',
  'post-categories',
  'tags',
] as const
