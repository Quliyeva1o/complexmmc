import type { CollectionConfig } from 'payload'

import { anyone, authenticated } from '@/access'

export const Media: CollectionConfig = {
  slug: 'media',
  labels: { singular: 'Media', plural: 'Media' },
  admin: { group: 'Sistem', useAsTitle: 'alt', defaultColumns: ['filename', 'alt', 'folder'] },
  folders: true,
  access: { read: anyone, create: authenticated, update: authenticated, delete: authenticated },
  fields: [
    {
      name: 'alt',
      label: 'Alt mətn (SEO)',
      type: 'text',
      localized: true,
      required: true,
      admin: { description: 'Şəkildə nə olduğunu qısa təsvir edin, məs: "Bilgəhdə infinity daşma hovuz, mozaika üzlük".' },
    },
    { name: 'caption', label: 'Alt yazı', type: 'text', localized: true },
    {
      name: 'sourceUrl',
      label: 'Mənbə (köçürmə)',
      type: 'text',
      index: true,
      admin: { readOnly: true, position: 'sidebar', condition: (d) => Boolean(d?.sourceUrl) },
    },
  ],
  upload: {
    staticDir: 'media',
    mimeTypes: ['image/*', 'video/mp4', 'video/webm', 'application/pdf'],
    focalPoint: true,
    crop: true,
    formatOptions: { format: 'webp', options: { quality: 82 } },
    imageSizes: [
      { name: 'thumb', width: 400, formatOptions: { format: 'webp', options: { quality: 75 } } },
      { name: 'card', width: 768, formatOptions: { format: 'webp', options: { quality: 80 } } },
      { name: 'large', width: 1440, formatOptions: { format: 'webp', options: { quality: 80 } } },
      { name: 'hero', width: 2048, formatOptions: { format: 'webp', options: { quality: 80 } } },
      { name: 'og', width: 1200, height: 630, position: 'centre', formatOptions: { format: 'jpeg', options: { quality: 82 } } },
    ],
  },
}
