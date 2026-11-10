import type { Block } from 'payload'

import { blockSettings, linkField, sectionHeader } from '@/fields/sectionHeader'

export const StatsBlock: Block = {
  slug: 'stats',
  labels: { singular: 'Statistika', plural: 'Statistika' },
  fields: [
    sectionHeader(),
    {
      name: 'items',
      label: 'Göstəricilər',
      type: 'array',
      maxRows: 6,
      fields: [
        {
          type: 'row',
          fields: [
            { name: 'value', label: 'Rəqəm', type: 'number', required: true },
            { name: 'suffix', label: 'Sonluq (+, %, il)', type: 'text', localized: true },
          ],
        },
        { name: 'label', label: 'Etiket', type: 'text', localized: true, required: true },
      ],
    },
    blockSettings,
  ],
}

export const AboutIntroBlock: Block = {
  slug: 'aboutIntro',
  labels: { singular: 'Haqqımızda (qısa)', plural: 'Haqqımızda (qısa)' },
  fields: [
    sectionHeader(),
    { name: 'body', label: 'Mətn', type: 'richText', localized: true },
    {
      name: 'bullets',
      label: 'Bəndlər',
      type: 'array',
      admin: { description: '"Başlıq — mətn" formatında yazsanız, "Niyə biz" bölməsində başlıq və mətn ayrıca göstərilir.' },
      fields: [{ name: 'text', label: 'Mətn', type: 'text', localized: true, required: true }],
    },
    {
      name: 'bulletsAsGrid',
      label: 'Bəndləri ayrıca "Niyə biz" bölməsi kimi göstər (nömrəli kartlar)',
      type: 'checkbox',
      defaultValue: false,
    },
    {
      name: 'gridHeader',
      label: '"Niyə biz" bölməsinin başlığı',
      type: 'group',
      admin: { condition: (_: unknown, s: { bulletsAsGrid?: boolean }) => !!s?.bulletsAsGrid },
      fields: [
        { name: 'eyebrow', label: 'Üst yazı', type: 'text', localized: true },
        { name: 'heading', label: 'Başlıq', type: 'text', localized: true },
        { name: 'intro', label: 'Giriş mətni', type: 'textarea', localized: true },
      ],
    },
    {
      type: 'row',
      fields: [
        { name: 'imageLarge', label: 'Böyük şəkil', type: 'upload', relationTo: 'media' },
        { name: 'imageSmall', label: 'Kiçik şəkil', type: 'upload', relationTo: 'media' },
      ],
    },
    {
      name: 'badge',
      label: 'Şəkil nişanı',
      type: 'group',
      fields: [
        {
          type: 'row',
          fields: [
            { name: 'value', label: 'Dəyər (20+)', type: 'text' },
            { name: 'label', label: 'Etiket', type: 'text', localized: true },
          ],
        },
      ],
    },
    linkField('cta', 'Düymə'),
    blockSettings,
  ],
}

export const BeforeAfterBlock: Block = {
  slug: 'beforeAfter',
  labels: { singular: 'Əvvəl / Sonra', plural: 'Əvvəl / Sonra' },
  fields: [
    sectionHeader(),
    {
      name: 'pairs',
      label: 'Müqayisələr (köhnə)',
      type: 'array',
      admin: {
        description: 'Boş saxlayın: cütlər «Layihələr → Əvvəl & Sonra» bölməsindən avtomatik götürülür.',
        initCollapsed: true,
      },
      fields: [
        { name: 'title', label: 'Başlıq', type: 'text', localized: true, required: true },
        { name: 'caption', label: 'Alt yazı', type: 'text', localized: true },
        {
          type: 'row',
          fields: [
            { name: 'before', label: 'Əvvəl', type: 'upload', relationTo: 'media', required: true },
            { name: 'after', label: 'Sonra', type: 'upload', relationTo: 'media', required: true },
          ],
        },
        { name: 'project', label: 'Layihə', type: 'relationship', relationTo: 'projects' },
      ],
    },
    linkField('cta', 'Düymə'),
    blockSettings,
  ],
}

export const WarrantyBlock: Block = {
  slug: 'warranty',
  labels: { singular: 'Zəmanət', plural: 'Zəmanət' },
  fields: [
    sectionHeader(),
    {
      name: 'items',
      label: 'Plitələr',
      type: 'array',
      fields: [
        {
          type: 'row',
          fields: [
            { name: 'label', label: 'Ad', type: 'text', localized: true, required: true },
            { name: 'value', label: 'Müddət (12 il)', type: 'text', localized: true, required: true },
          ],
        },
      ],
    },
    linkField('cta', 'Düymə'),
    blockSettings,
  ],
}

export const ProcessBlock: Block = {
  slug: 'process',
  labels: { singular: 'Proses (mərhələlər)', plural: 'Proses' },
  fields: [
    sectionHeader(),
    {
      name: 'steps',
      label: 'Mərhələlər',
      type: 'array',
      fields: [
        {
          type: 'row',
          fields: [
            { name: 'title', label: 'Başlıq', type: 'text', localized: true, required: true },
            { name: 'duration', label: 'Müddət', type: 'text', localized: true },
          ],
        },
        { name: 'description', label: 'Təsvir', type: 'textarea', localized: true },
        { name: 'icon', label: 'İkon (SVG)', type: 'upload', relationTo: 'media' },
      ],
    },
    { name: 'footnote', label: 'Alt qeyd (Orta müddət: 4–8 həftə)', type: 'text', localized: true },
    linkField('cta', 'Düymə'),
    blockSettings,
  ],
}

export const FeatureGridBlock: Block = {
  slug: 'featureGrid',
  labels: { singular: 'Xüsusiyyətlər (nömrəli)', plural: 'Xüsusiyyətlər' },
  fields: [
    sectionHeader(),
    {
      name: 'numbered', label: 'Nömrələ (01, 02…)', type: 'checkbox', defaultValue: true,
    },
    {
      name: 'items',
      label: 'Elementlər',
      type: 'array',
      fields: [
        { name: 'title', label: 'Başlıq', type: 'text', localized: true, required: true },
        { name: 'description', label: 'Təsvir', type: 'textarea', localized: true },
        { name: 'icon', label: 'İkon (SVG)', type: 'upload', relationTo: 'media' },
      ],
    },
    blockSettings,
  ],
}

export const PriceTableBlock: Block = {
  slug: 'priceTable',
  labels: { singular: 'Qiymət cədvəli', plural: 'Qiymət cədvəlləri' },
  fields: [
    sectionHeader(),
    {
      name: 'rows',
      label: 'Sətirlər',
      type: 'array',
      fields: [
        { name: 'item', label: 'İş / ölçü', type: 'text', localized: true, required: true },
        {
          type: 'row',
          fields: [
            { name: 'priceFrom', label: 'Qiymət (min)', type: 'number' },
            { name: 'priceTo', label: 'Qiymət (max)', type: 'number' },
            { name: 'unit', label: 'Vahid (AZN, AZN/m²)', type: 'text', localized: true, defaultValue: 'AZN' },
          ],
        },
        { name: 'note', label: 'Qeyd', type: 'text', localized: true },
      ],
    },
    { name: 'disclaimer', label: 'Qeyd (qiymətlər təxminidir…)', type: 'textarea', localized: true },
    { name: 'updatedOn', label: 'Qiymətlərin yenilənmə tarixi', type: 'date' },
    linkField('cta', 'Düymə (kalkulyator)'),
    blockSettings,
  ],
}

export const MediaContentBlock: Block = {
  slug: 'mediaContent',
  labels: { singular: 'Mətn + şəkil', plural: 'Mətn + şəkil' },
  fields: [
    sectionHeader(),
    { name: 'body', label: 'Mətn', type: 'richText', localized: true },
    { name: 'image', label: 'Şəkil', type: 'upload', relationTo: 'media' },
    {
      name: 'imagePosition', label: 'Şəkil yeri', type: 'radio', defaultValue: 'right',
      options: [{ label: 'Sağda', value: 'right' }, { label: 'Solda', value: 'left' }],
    },
    linkField('cta', 'Düymə'),
    blockSettings,
  ],
}

export const RichTextBlock: Block = {
  slug: 'richText',
  labels: { singular: 'Zəngin mətn', plural: 'Zəngin mətn' },
  fields: [
    { name: 'content', label: 'Məzmun', type: 'richText', localized: true, required: true },
    {
      name: 'width', label: 'En', type: 'select', defaultValue: 'prose',
      options: [{ label: 'Oxunaqlı (dar)', value: 'prose' }, { label: 'Geniş', value: 'wide' }],
    },
    blockSettings,
  ],
}

export const CTABlock: Block = {
  slug: 'cta',
  labels: { singular: 'CTA zolağı', plural: 'CTA zolaqları' },
  fields: [
    { name: 'heading', label: 'Başlıq', type: 'text', localized: true, required: true },
    { name: 'text', label: 'Mətn', type: 'textarea', localized: true },
    linkField('primaryCta', 'Əsas düymə'),
    { name: 'showPhone', label: 'Telefonu göstər', type: 'checkbox', defaultValue: true },
    { name: 'image', label: 'Fon şəkli', type: 'upload', relationTo: 'media' },
    blockSettings,
  ],
}

export const ContactFormBlock: Block = {
  slug: 'contactForm',
  labels: { singular: 'Əlaqə forması', plural: 'Əlaqə formaları' },
  fields: [
    sectionHeader(),
    { name: 'form', label: 'Forma', type: 'relationship', relationTo: 'forms', required: true },
    { name: 'showContactInfo', label: 'Əlaqə kartlarını göstər', type: 'checkbox', defaultValue: true },
    { name: 'showMap', label: 'Xəritə linki', type: 'checkbox', defaultValue: true },
    blockSettings,
  ],
}

export const VideoBlock: Block = {
  slug: 'video',
  labels: { singular: 'Video', plural: 'Video' },
  fields: [
    sectionHeader(),
    { name: 'poster', label: 'Örtük şəkli', type: 'upload', relationTo: 'media', required: true },
    { name: 'file', label: 'Video faylı', type: 'upload', relationTo: 'media' },
    { name: 'youtubeId', label: 'YouTube ID (alternativ)', type: 'text' },
    blockSettings,
  ],
}

export const CalculatorBlock: Block = {
  slug: 'calculator',
  labels: { singular: 'Qiymət kalkulyatoru', plural: 'Qiymət kalkulyatoru' },
  // Options / prices live in the "Kalkulyator" global; this block only places it on a page.
  fields: [sectionHeader(), blockSettings],
}
