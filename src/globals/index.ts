import type { Field, GlobalConfig } from 'payload'

import { anyone, authenticated } from '@/access'
import { linkField } from '@/fields/sectionHeader'
import { revalidateGlobal } from '@/hooks/revalidate'

const base = (slug: string, label: string, fields: Field[], group = 'Parametrlər'): GlobalConfig => ({
  slug,
  label,
  admin: { group },
  access: { read: anyone, update: authenticated },
  hooks: { afterChange: [revalidateGlobal(slug)] },
  fields,
})

/* ---------------------------------------------------------------- Site settings */
export const SiteSettings = base('site-settings', 'Sayt parametrləri', [
  {
    type: 'tabs',
    tabs: [
      {
        label: 'Şirkət',
        fields: [
          { name: 'companyName', label: 'Şirkət adı', type: 'text', required: true, defaultValue: 'Complex MMC' },
          { name: 'tagline', label: 'Qısa şüar', type: 'text', localized: true },
          { type: 'row', fields: [
            { name: 'logo', label: 'Loqo (açıq fon)', type: 'upload', relationTo: 'media' },
            { name: 'logoLight', label: 'Loqo (tünd fon)', type: 'upload', relationTo: 'media' },
            { name: 'favicon', label: 'Favicon', type: 'upload', relationTo: 'media' },
          ] },
          { name: 'foundedYear', label: 'Təsis ili', type: 'number' },
        ],
      },
      {
        label: 'Əlaqə',
        fields: [
          {
            name: 'phones', label: 'Telefonlar', type: 'array',
            fields: [{ type: 'row', fields: [
              { name: 'label', label: 'Etiket', type: 'text', localized: true },
              { name: 'number', label: 'Nömrə', type: 'text', required: true },
              { name: 'primary', label: 'Əsas', type: 'checkbox' },
            ] }],
          },
          { type: 'row', fields: [
            { name: 'email', label: 'E-poçt', type: 'email' },
            { name: 'whatsapp', label: 'WhatsApp nömrəsi', type: 'text' },
          ] },
          { name: 'address', label: 'Ünvan', type: 'text', localized: true },
          { name: 'addressNote', label: 'Ünvan qeydi (məs. Berlin Avto ilə üzbəüz)', type: 'text', localized: true },
          { type: 'row', fields: [
            { name: 'city', label: 'Şəhər', type: 'text', localized: true },
            { name: 'postalCode', label: 'Poçt indeksi', type: 'text' },
          ] },
          { type: 'row', fields: [
            { name: 'lat', label: 'Enlik', type: 'number' },
            { name: 'lng', label: 'Uzunluq', type: 'number' },
          ] },
          { name: 'mapUrl', label: 'Google Maps linki', type: 'text' },
          {
            name: 'openingHours', label: 'İş saatları', type: 'array',
            fields: [{ type: 'row', fields: [
              { name: 'days', label: 'Günlər', type: 'select', hasMany: true,
                options: ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'] },
              { name: 'opens', label: 'Açılır', type: 'text', defaultValue: '09:00' },
              { name: 'closes', label: 'Bağlanır', type: 'text', defaultValue: '18:00' },
            ] }],
          },
          { name: 'hoursNote', label: 'Qeyd (Zənglərə 24 saat cavab veririk)', type: 'text', localized: true },
        ],
      },
      {
        label: 'Sosial',
        fields: [
          {
            name: 'socials', label: 'Sosial şəbəkələr', type: 'array',
            fields: [{ type: 'row', fields: [
              { name: 'network', label: 'Şəbəkə', type: 'select', required: true,
                options: ['instagram', 'tiktok', 'facebook', 'youtube', 'linkedin', 'whatsapp'] },
              { name: 'url', label: 'URL', type: 'text', required: true },
            ] }],
          },
        ],
      },
      {
        label: 'Floating düymələr',
        fields: [
          { name: 'floatingWhatsapp', label: 'WhatsApp düyməsi', type: 'checkbox', defaultValue: true },
          { name: 'floatingQuote', label: '"Qiymət təklifi al" düyməsi', type: 'checkbox', defaultValue: true },
          linkField('quoteLink', 'Qiymət təklifi linki'),
        ],
      },
      {
        label: 'SEO / Analitika',
        fields: [
          { name: 'siteUrl', label: 'Saytın ünvanı', type: 'text', defaultValue: 'https://complexmmc.az' },
          { name: 'titleTemplate', label: 'Başlıq şablonu', type: 'text', localized: true, defaultValue: '%s | Complex MMC',
            admin: { description: '%s yerinə səhifənin başlığı yazılır.' } },
          { name: 'defaultDescription', label: 'Default description', type: 'textarea', localized: true },
          { name: 'defaultOgImage', label: 'Default OG şəkli (1200×630)', type: 'upload', relationTo: 'media' },
          { name: 'businessType', label: 'Schema.org biznes tipi', type: 'select', defaultValue: 'GeneralContractor',
            options: ['GeneralContractor', 'HomeAndConstructionBusiness', 'LocalBusiness'] },
          { name: 'priceRange', label: 'Qiymət aralığı (schema)', type: 'text', defaultValue: '$$' },
          { name: 'areaServed', label: 'Xidmət əraziləri (schema)', type: 'text', hasMany: true },
          { type: 'row', fields: [
            { name: 'gtmId', label: 'GTM ID', type: 'text' },
            { name: 'ga4Id', label: 'GA4 ID', type: 'text' },
          ] },
          { type: 'row', fields: [
            { name: 'googleVerification', label: 'Google Search Console kodu', type: 'text' },
            { name: 'yandexVerification', label: 'Yandex kodu', type: 'text' },
          ] },
        ],
      },
    ],
  },
])

/* ---------------------------------------------------------------- Navigation */
const navItem: Field[] = [
  linkField('link', 'Link'),
  {
    name: 'children', label: 'Alt menyu', type: 'array',
    fields: [linkField('link', 'Link')],
  },
]

export const Header = base('header', 'Header (menyu)', [
  { name: 'nav', label: 'Menyu', type: 'array', fields: navItem },
  linkField('cta', 'Header düyməsi'),
])

export const Footer = base('footer', 'Footer', [
  { name: 'about', label: 'Qısa mətn', type: 'textarea', localized: true },
  {
    name: 'columns', label: 'Sütunlar', type: 'array', maxRows: 5,
    fields: [
      { name: 'title', label: 'Başlıq', type: 'text', localized: true },
      {
        name: 'source', label: 'Mənbə', type: 'select', defaultValue: 'manual',
        options: [
          { label: 'Əl ilə linklər', value: 'manual' },
          { label: 'Kateqoriyalar', value: 'categories' },
          { label: 'Xidmətlər', value: 'services' },
          { label: 'Xidmət əraziləri', value: 'service-areas' },
        ],
      },
      { name: 'links', label: 'Linklər', type: 'array', fields: [linkField('link', 'Link')],
        admin: { condition: (_, s) => s?.source === 'manual' } },
    ],
  },
  { name: 'legalLinks', label: 'Hüquqi linklər', type: 'array', fields: [linkField('link', 'Link')] },
  { name: 'copyright', label: 'Copyright mətni', type: 'text', localized: true,
    defaultValue: '© {year} Complex MMC. Bütün hüquqlar qorunur.' },
])

/* ---------------------------------------------------------------- Theme (overrides tokens.css) */
const hex = (name: string, label: string, def: string): Field => ({
  name, label, type: 'text', defaultValue: def,
  validate: (v: unknown) => !v || /^#([0-9a-f]{3}|[0-9a-f]{6})$/i.test(String(v)) || 'HEX formatında: #0C7E91',
  admin: { width: '33%' },
})

export const Theme = base('theme', 'Tema (rənglər)', [
  { name: 'enabled', label: 'Admin rənglərini tətbiq et', type: 'checkbox', defaultValue: false,
    admin: { description: 'Söndürülübsə src/styles/tokens.css-dəki default palitra işləyir.' } },
  { type: 'row', fields: [
    hex('primary', 'Əsas (düymələr)', '#0C7E91'),
    hex('primaryHover', 'Əsas (hover)', '#0E6575'),
    hex('primarySoft', 'Əsas (açıq fon)', '#EEFBFC'),
  ] },
  { type: 'row', fields: [
    hex('accent', 'Aksent (isti)', '#B9814F'),
    hex('heading', 'Başlıqlar', '#082A32'),
    hex('text', 'Mətn', '#0F2A30'),
  ] },
  { type: 'row', fields: [
    hex('bg', 'Fon', '#F7FBFB'),
    hex('darkSection', 'Tünd bölmə', '#082A32'),
    hex('sand', 'Qum fon', '#FAF6F0'),
  ] },
], 'Parametrlər')

/* ---------------------------------------------------------------- Calculator */
export const Calculator = base('calculator', 'Qiymət kalkulyatoru', [
  {
    name: 'mode', label: 'Rejim', type: 'radio', defaultValue: 'lead',
    options: [
      { label: 'Yalnız müraciət al (qiymət göstərmə)', value: 'lead' },
      { label: 'Təxmini qiyməti göstər', value: 'price' },
    ],
  },
  { type: 'row', fields: [
    { name: 'currency', label: 'Valyuta', type: 'text', defaultValue: 'AZN' },
    { name: 'rangePercent', label: 'Diapazon ± %', type: 'number', defaultValue: 15 },
    { name: 'minPrice', label: 'Minimum qiymət', type: 'number' },
  ] },
  {
    name: 'objectTypes', label: 'Obyekt / hovuz növləri', type: 'array',
    fields: [
      { type: 'row', fields: [
        { name: 'label', label: 'Ad', type: 'text', localized: true, required: true },
        { name: 'key', label: 'Açar', type: 'text', required: true },
        { name: 'basePerM2', label: 'Baza qiymət (AZN/m²)', type: 'number' },
        { name: 'fixed', label: 'Sabit əlavə (AZN)', type: 'number' },
      ] },
      { name: 'usesDepth', label: 'Dərinlik soruşulsun', type: 'checkbox', defaultValue: true },
    ],
  },
  {
    name: 'finishes', label: 'Üzlük növləri', type: 'array',
    fields: [{ type: 'row', fields: [
      { name: 'label', label: 'Ad', type: 'text', localized: true, required: true },
      { name: 'coefficient', label: 'Əmsal', type: 'number', defaultValue: 1 },
    ] }],
  },
  {
    name: 'depths', label: 'Dərinlik variantları', type: 'array',
    fields: [{ type: 'row', fields: [
      { name: 'label', label: 'Ad', type: 'text', localized: true, required: true },
      { name: 'coefficient', label: 'Əmsal', type: 'number', defaultValue: 1 },
    ] }],
  },
  {
    name: 'addons', label: 'Əlavələr', type: 'array',
    fields: [{ type: 'row', fields: [
      { name: 'label', label: 'Ad', type: 'text', localized: true, required: true },
      { name: 'price', label: 'Qiymət', type: 'number' },
      { name: 'unit', label: 'Vahid', type: 'select', defaultValue: 'fixed',
        options: [{ label: 'Sabit', value: 'fixed' }, { label: 'm²-ə görə', value: 'perM2' }] },
    ] }],
  },
  {
    name: 'areas', label: 'Ərazilər', type: 'array',
    fields: [{ type: 'row', fields: [
      { name: 'label', label: 'Ad', type: 'text', localized: true, required: true },
      { name: 'coefficient', label: 'Əmsal', type: 'number', defaultValue: 1 },
    ] }],
  },
  { name: 'disclaimer', label: 'Nəticə altındakı qeyd', type: 'textarea', localized: true },
  { name: 'notifyForm', label: 'Müraciət forması', type: 'relationship', relationTo: 'forms' },
])

export const globals = [SiteSettings, Header, Footer, Theme, Calculator]
