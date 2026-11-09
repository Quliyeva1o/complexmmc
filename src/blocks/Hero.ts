import type { Block } from 'payload'

import { blockSettings, linkField } from '@/fields/sectionHeader'

export const HeroBlock: Block = {
  slug: 'hero',
  labels: { singular: 'Hero', plural: 'Hero' },
  interfaceName: 'HeroBlock',
  fields: [
    {
      name: 'rotatingWords',
      label: 'Dəyişən sətirlər',
      type: 'array',
      maxRows: 5,
      admin: { description: 'Məs: "Layihələndiririk", "Tikirik", "Baxım edirik".' },
      fields: [{ name: 'text', label: 'Mətn', type: 'text', localized: true, required: true }],
    },
    { name: 'heading', label: 'Başlıq (H1)', type: 'text', localized: true, required: true },
    { name: 'subheading', label: 'Alt mətn', type: 'textarea', localized: true },
    linkField('primaryCta', 'Əsas düymə'),
    linkField('secondaryCta', 'İkinci düymə'),
    {
      name: 'badges',
      label: 'Etibar nişanları',
      type: 'array',
      maxRows: 4,
      fields: [{ name: 'text', label: 'Mətn', type: 'text', localized: true, required: true }],
    },
    {
      type: 'row',
      fields: [
        { name: 'backgroundImage', label: 'Fon şəkli', type: 'upload', relationTo: 'media' },
        { name: 'backgroundVideo', label: 'Fon videosu (mp4, opsional)', type: 'upload', relationTo: 'media' },
      ],
    },
    {
      name: 'infoCard',
      label: 'Yan kart (Pulsuz baxış)',
      type: 'group',
      fields: [
        { name: 'enabled', label: 'Göstər', type: 'checkbox', defaultValue: true },
        { name: 'title', label: 'Başlıq', type: 'text', localized: true },
        { name: 'text', label: 'Mətn', type: 'text', localized: true },
        { name: 'phone', label: 'Telefon', type: 'text' },
      ],
    },
    blockSettings,
  ],
}
