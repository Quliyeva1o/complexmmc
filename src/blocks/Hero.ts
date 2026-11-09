import type { Block } from 'payload'

import { blockSettings, linkField } from '@/fields/sectionHeader'

export const HeroBlock: Block = {
  slug: 'hero',
  labels: { singular: 'Hero', plural: 'Hero' },
  interfaceName: 'HeroBlock',
  fields: [
    {
      name: 'variant',
      label: 'Görünüş (variant)',
      type: 'select',
      defaultValue: 'rotating',
      admin: { description: 'V1 = sol tərəfdə başlıq + Pulsuz baxış kartı; V2 = böyük başlıq + video + xidmət kartları; V3 = fırlanan böyük sözlər.' },
      options: [
        { label: 'V1 — Klassik (sol tərəf)', value: 'classic' },
        { label: 'V2 — Video + xidmət kartları', value: 'video' },
        { label: 'V3 — Fırlanan sözlər', value: 'rotating' },
      ],
    },
    {
      name: 'rotatingWords',
      label: 'Dəyişən sətirlər',
      type: 'array',
      maxRows: 5,
      admin: { description: 'Məs: "Layihələndiririk", "Tikirik", "Baxım edirik".' },
      fields: [{ name: 'text', label: 'Mətn', type: 'text', localized: true, required: true }],
    },
    { name: 'heading', label: 'Başlıq (H1)', type: 'text', localized: true, required: true },
    {
      name: 'shortHeading',
      label: 'Qısa başlıq (V2 üçün, 2–4 söz)',
      type: 'text',
      localized: true,
      admin: { description: 'V2 variantında çox böyük H1 kimi göstərilir. Açar söz saxlayın, məs: "Bakıda *hovuz* tikintisi". * arası cyan rəngdə olur.' },
    },
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
        { name: 'image', label: 'Dairəvi şəkil (V1)', type: 'upload', relationTo: 'media' },
      ],
    },
    blockSettings,
  ],
}
