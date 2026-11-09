import { postgresAdapter } from '@payloadcms/db-postgres'
import { nodemailerAdapter } from '@payloadcms/email-nodemailer'
import { formBuilderPlugin } from '@payloadcms/plugin-form-builder'
import { redirectsPlugin } from '@payloadcms/plugin-redirects'
import { seoPlugin } from '@payloadcms/plugin-seo'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { az } from '@payloadcms/translations/languages/az'
import { en } from '@payloadcms/translations/languages/en'
import { ru } from '@payloadcms/translations/languages/ru'
import path from 'path'
import { buildConfig, type Field } from 'payload'
import sharp from 'sharp'
import { fileURLToPath } from 'url'

import { contentCollections, routableSlugs } from './collections/content'
import { Media } from './collections/Media'
import { Users } from './collections/Users'
import { globals } from './globals'
import { defaultLocale, locales } from './i18n/config'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

const serverURL = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'

const seoExtraFields: Field[] = [
  {
    name: 'canonical',
    label: 'Canonical URL (boş = avtomatik)',
    type: 'text',
    localized: true,
  },
  {
    name: 'noindex',
    label: 'Google-da indeksləmə (noindex)',
    type: 'checkbox',
    defaultValue: false,
  },
]

const smtpConfigured = Boolean(process.env.SMTP_USER && process.env.SMTP_PASS)

export default buildConfig({
  serverURL,
  admin: {
    user: Users.slug,
    meta: { titleSuffix: ' — Complex Admin' },
    importMap: { baseDir: path.resolve(dirname) },
  },
  i18n: {
    supportedLanguages: { az, en, ru },
    fallbackLanguage: 'az',
  },
  localization: {
    locales: locales.map((l) => ({ code: l.code, label: l.label })),
    defaultLocale,
    fallback: true,
  },
  collections: [...contentCollections, Media, Users],
  globals,
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: { outputFile: path.resolve(dirname, 'payload-types.ts') },
  db: postgresAdapter({
    pool: { connectionString: process.env.DATABASE_URL || '' },
    // Dev schema push diffs hundreds of tables (localized blocks) on every reload and can take
    // minutes. It is off by default; run `npm run db:push` after changing collections/blocks.
    push: process.env.PAYLOAD_DB_PUSH === 'true',
    migrationDir: path.resolve(dirname, 'migrations'),
  }),
  email: smtpConfigured
    ? nodemailerAdapter({
        defaultFromAddress: process.env.SMTP_FROM || process.env.SMTP_USER!,
        defaultFromName: 'Complex MMC',
        transportOptions: {
          host: process.env.SMTP_HOST || 'smtp.gmail.com',
          port: Number(process.env.SMTP_PORT || 465),
          secure: true,
          auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
        },
      })
    : undefined,
  sharp,
  plugins: [
    seoPlugin({
      collections: [...routableSlugs],
      uploadsCollection: 'media',
      tabbedUI: true,
      generateTitle: ({ doc }) => (doc as { title?: string })?.title ?? '',
      generateDescription: ({ doc }) => (doc as { excerpt?: string })?.excerpt ?? '',
      fields: ({ defaultFields }) => [...defaultFields, ...seoExtraFields],
    }),
    redirectsPlugin({
      collections: [...routableSlugs],
      redirectTypes: ['301', '302'],
      overrides: {
        labels: { singular: 'Yönləndirmə', plural: 'Yönləndirmələr' },
        admin: { group: 'Sistem' },
      },
    }),
    formBuilderPlugin({
      fields: { payment: false, state: false, country: false },
      formOverrides: {
        labels: { singular: 'Forma', plural: 'Formalar' },
        admin: { group: 'Formalar' },
      },
      formSubmissionOverrides: {
        labels: { singular: 'Müraciət', plural: 'Müraciətlər' },
        admin: { group: 'Formalar' },
      },
    }),
  ],
})
