import type { Field } from 'payload'

/** Eyebrow + heading + intro used by almost every section/block. */
export const sectionHeader = (defaults: { eyebrow?: string; heading?: string } = {}): Field => ({
  name: 'header',
  label: 'Bölmə başlığı',
  type: 'group',
  fields: [
    {
      type: 'row',
      fields: [
        { name: 'eyebrow', label: 'Üst etiket', type: 'text', localized: true, defaultValue: defaults.eyebrow },
        { name: 'heading', label: 'Başlıq (H2)', type: 'text', localized: true, defaultValue: defaults.heading },
      ],
    },
    { name: 'intro', label: 'Giriş mətni', type: 'textarea', localized: true },
  ],
})

/** Visual options shared by blocks. Colors come from CSS tokens, never hard-coded. */
export const blockSettings: Field = {
  name: 'settings',
  label: 'Görünüş',
  type: 'group',
  admin: { position: 'sidebar' },
  fields: [
    {
      name: 'theme',
      label: 'Fon',
      type: 'select',
      defaultValue: 'light',
      options: [
        { label: 'Açıq', value: 'light' },
        { label: 'Aqua (yumşaq)', value: 'soft' },
        { label: 'Qum (isti)', value: 'sand' },
        { label: 'Tünd', value: 'dark' },
      ],
    },
    { name: 'anchorId', label: 'Anchor ID (#)', type: 'text' },
    { name: 'hidden', label: 'Gizlət', type: 'checkbox', defaultValue: false },
  ],
}

export const linkField = (name = 'link', label = 'Link'): Field => ({
  name,
  label,
  type: 'group',
  fields: [
    {
      type: 'row',
      fields: [
        { name: 'label', label: 'Mətn', type: 'text', localized: true },
        {
          name: 'type',
          label: 'Növ',
          type: 'radio',
          defaultValue: 'internal',
          options: [
            { label: 'Daxili', value: 'internal' },
            { label: 'Xarici / URL', value: 'custom' },
          ],
        },
      ],
    },
    {
      name: 'reference',
      label: 'Səhifə',
      type: 'relationship',
      relationTo: ['pages', 'categories', 'services', 'projects', 'posts', 'service-areas'],
      admin: { condition: (_, s) => s?.type === 'internal' },
    },
    {
      name: 'url',
      label: 'URL',
      type: 'text',
      localized: true,
      admin: { condition: (_, s) => s?.type === 'custom' },
    },
    { name: 'newTab', label: 'Yeni pəncərədə', type: 'checkbox' },
  ],
})
