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
/**
 * Pool cost calculator data. Quantities are calculated in code (src/lib/estimate/model.ts);
 * here admins keep the prices up to date. Empty lists fall back to the defaults built from
 * the company's real estimates (src/lib/estimate/defaults.ts).
 */
export const Calculator = base('calculator', 'Qiymət kalkulyatoru', [
  {
    name: 'mode', label: 'Rejim', type: 'radio', defaultValue: 'price',
    options: [
      { label: 'Təxmini qiyməti göstər', value: 'price' },
      { label: 'Yalnız müraciət al (qiymət göstərmə)', value: 'lead' },
    ],
  },
  { type: 'row', fields: [
    { name: 'rangePercent', label: 'Dəqiq qiymətlər üçün diapazon ± %', type: 'number', defaultValue: 10, min: 0, max: 50 },
    { name: 'unknownPlacePercent', label: 'Siyahıda olmayan / təsdiqlənməmiş yer üçün ± %', type: 'number', defaultValue: 30, min: 0, max: 100 },
    { name: 'defaultDepth', label: 'Standart dərinlik (m)', type: 'number', defaultValue: 1.5, min: 0.6, max: 3 },
  ] },
  {
    type: 'tabs',
    tabs: [
      {
        label: 'Vahid qiymətlər',
        description: 'Açar sözə görə qiymət (AZN). "Premium" sütunu Premium paket seçiləndə istifadə olunur; boşdursa, adi qiymət götürülür. Boş siyahı = smetalardan götürülmüş standart qiymətlər.',
        fields: [{
          name: 'prices', label: 'Qiymətlər', type: 'array',
          admin: { initCollapsed: true },
          fields: [{ type: 'row', fields: [
            { name: 'key', label: 'Açar', type: 'text', required: true, admin: { width: '40%' } },
            { name: 'price', label: 'Standart (AZN)', type: 'number', required: true, admin: { width: '30%' } },
            { name: 'premium', label: 'Premium (AZN)', type: 'number', admin: { width: '30%' } },
          ] }],
        }],
      },
      {
        label: 'Yerlər (rayonlar)',
        description: 'Nəqliyyat və köməkçi xərclər (bütün iş üçün), beton pompası (bir dəfəlik), torpaq maşını (bir reys). "Təsdiqlənib" = real smetadan götürülüb, dəqiq göstərilir.',
        fields: [{
          name: 'places', label: 'Yerlər', type: 'array',
          admin: { initCollapsed: true },
          fields: [
            { type: 'row', fields: [
              { name: 'key', label: 'Açar', type: 'text', required: true },
              { name: 'name', label: 'Ad', type: 'text', localized: true, required: true },
              { name: 'zone', label: 'Zona', type: 'select', defaultValue: 'absheron', options: [
                { label: 'Abşeron', value: 'absheron' }, { label: 'Bakı şəhəri', value: 'baku' }, { label: 'Qərb (Novxanı, Sumqayıt)', value: 'west' }, { label: 'Regionlar', value: 'regions' },
              ] },
            ] },
            { type: 'row', fields: [
              { name: 'transport', label: 'Nəqliyyat və köməkçi (AZN)', type: 'number', required: true },
              { name: 'pump', label: 'Beton pompası (AZN/dəfə)', type: 'number', required: true },
              { name: 'truck', label: 'Torpaq maşını (AZN/reys)', type: 'number', required: true },
              { name: 'confirmed', label: 'Təsdiqlənib', type: 'checkbox', defaultValue: false },
            ] },
          ],
        }],
      },
      {
        label: 'Əlavələr',
        description: 'Min = Maks olarsa dəqiq qiymət göstərilir, fərqlidirsə aralıq.',
        fields: [{
          name: 'extras', label: 'Əlavələr', type: 'array',
          admin: { initCollapsed: true },
          fields: [{ type: 'row', fields: [
            { name: 'key', label: 'Açar', type: 'text', required: true },
            { name: 'name', label: 'Ad', type: 'text', localized: true, required: true },
            { name: 'min', label: 'Min (AZN)', type: 'number', required: true },
            { name: 'max', label: 'Maks (AZN)', type: 'number', required: true },
          ] }],
        }],
      },
    ],
  },
  { name: 'disclaimer', label: 'Nəticə altındakı qeyd', type: 'textarea', localized: true },
  { name: 'notifyForm', label: 'Müraciət forması', type: 'relationship', relationTo: 'forms' },
])

export const globals = [SiteSettings, Header, Footer, Theme, Calculator]
