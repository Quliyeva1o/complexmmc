import { postgresAdapter } from '@payloadcms/db-postgres'
import { nodemailerAdapter } from '@payloadcms/email-nodemailer'
import { formBuilderPlugin } from '@payloadcms/plugin-form-builder'
import { redirectsPlugin } from '@payloadcms/plugin-redirects'
import { seoPlugin } from '@payloadcms/plugin-seo'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { az } from '@payloadcms/translations/languages/az'
import path from 'path'
import { buildConfig, type Field } from 'payload'
import sharp from 'sharp'
import { fileURLToPath } from 'url'

import { authenticated } from './access'
import { REQUESTS_GROUP, withNavGroup } from './admin/groups'
import { deriveSubmission, submissionFields } from './admin/submissions'
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
    // one calm light theme that matches the site (PLAN.md §12)
    theme: 'light',
    dateFormat: 'd MMMM yyyy, HH:mm',
    components: {
      Nav: '/components/admin/AdminNav#AdminNav',
      views: { dashboard: { Component: '/components/admin/AdminDashboard#AdminDashboard' } },
      graphics: {
        Logo: '/components/admin/AdminBrand#AdminLogo',
        Icon: '/components/admin/AdminBrand#AdminIcon',
      },
    },
    importMap: { baseDir: path.resolve(dirname) },
  },
  // Admin interface in Azerbaijani only: all our labels are AZ, and a browser in English would
  // otherwise mix Payload's own English texts in ("Created At", "Search by…"). Content stays 3-lingual.
  i18n: {
    supportedLanguages: { az },
    fallbackLanguage: 'az',
  },
  localization: {
    locales: locales.map((l) => ({ code: l.code, label: l.label })),
    defaultLocale,
    fallback: true,
  },
  collections: [...contentCollections, Media, Users].map(withNavGroup),
  globals: globals.map(withNavGroup),
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: { outputFile: path.resolve(dirname, 'payload-types.ts') },
  db: postgresAdapter({
    // `next build` prerenders with one process per CPU, each with its own pool: keep pools small
    // so the build (and dev server alongside it) stays under Postgres' 100-connection default.
    pool: { connectionString: process.env.DATABASE_URL || '', max: Number(process.env.DB_POOL_MAX) || 4 },
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
        admin: { group: 'Məzmun' },
      },
      formSubmissionOverrides: {
        labels: { singular: 'Müraciət', plural: 'Müraciətlər' },
        // the plugin makes submissions read-only; staff need to change the status
        access: { update: authenticated },
        admin: {
          group: REQUESTS_GROUP,
          useAsTitle: 'name',
          defaultColumns: ['name', 'phone', 'kind', 'status', 'page', 'createdAt'],
          listSearchableFields: ['name', 'phone'],
          description: 'Saytdakı formalardan gələn müraciətlər. Yeni müraciəti açanda status avtomatik «Baxıldı» olur.',
        },
        // the raw form answers stay below the card, read-only, for reference
        fields: ({ defaultFields }) => [
          ...submissionFields,
          ...defaultFields.map((f) =>
            'name' in f && f.name === 'submissionData'
              ? ({ ...f, label: 'Formanın bütün cavabları', admin: { ...f.admin, readOnly: true, initCollapsed: true } } as Field)
              : f,
          ),
        ],
        hooks: { beforeChange: [deriveSubmission] },
      },
    }),
  ],
})
