import type { Metadata } from 'next'

import { PageBanner } from '@/components/inner/InnerParts'
import { PageShell } from '@/components/layout/PageShell'
import { Section, SectionHeader } from '@/components/ui/primitives'
import { ServiceCard } from '@/components/ui/ServiceCard'
import { type Locale, localePrefix, localeCodes } from '@/i18n/config'
import { t } from '@/i18n/dictionary'
import { findBySlug, findDocs } from '@/lib/data'
import { breadcrumbLd, ldScript } from '@/lib/jsonld'
import { mediaProps } from '@/lib/media'
import { buildMetadata } from '@/lib/seo'
import { docPath } from '@/lib/urls'
import type { Category, Media, Page, Service } from '@/payload-types'

/** /services — template "All Services 1": banner + service card grid. */
export const revalidate = 3600
const paths = Object.fromEntries(localeCodes.map((l) => [l, `${localePrefix(l)}/services`])) as Record<Locale, string>

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }): Promise<Metadata> {
  const { locale } = await params
  const page = await findBySlug<Page>('pages', 'services', locale, 0)
  return buildMetadata({ locale, paths, meta: page?.meta, fallbackTitle: t(locale).services })
}

export default async function ServicesPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params
  const d = t(locale)
  const [page, services, lines] = await Promise.all([
    findBySlug<Page>('pages', 'services', locale, 1),
    findDocs<Service>('services', locale, { where: { _status: { equals: 'published' } }, depth: 1 }),
    findDocs<Category>('categories', locale, { where: { _status: { equals: 'published' } }, depth: 1, limit: 50 }),
  ])
  const home = localePrefix(locale) || '/'
  return (
    <PageShell locale={locale} alternates={paths} overlayHeader>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: ldScript([breadcrumbLd([{ name: d.breadcrumbHome, path: home }, { name: d.services, path: paths[locale] }])]) }} />
      <PageBanner title={page?.title ?? d.services} intro={page?.intro} image={page?.banner} crumbs={[{ name: d.breadcrumbHome, href: home }, { name: d.services }]} />

      {/* service lines first (pool, SPA, sauna, hammams, steam room, gym), then the pool/SPA solutions */}
      {lines.length > 0 && (
        <Section>
          <SectionHeader eyebrow={d.services} heading={d.serviceLines} intro={d.serviceLinesIntro} />
          <ul className="grid gap-[var(--grid-gap)] sm:grid-cols-2 lg:grid-cols-3">
            {lines.map((c) => (
              <li key={c.id} data-reveal>
                <ServiceCard href={docPath('categories', c.slug, locale)} title={c.title} excerpt={c.excerpt} image={mediaProps(c.cover as Media, 'card')} icon={c.iconKey ?? 'pool'} />
              </li>
            ))}
          </ul>
        </Section>
      )}

      <Section theme="soft">
        <SectionHeader eyebrow={d.services} heading={d.solutions} intro={d.solutionsIntro} />
        <ul className="grid gap-[var(--grid-gap)] sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => {
            const cat = (s.category ?? []).find((c) => typeof c === 'object') as Category | undefined
            return (
              <li key={s.id} data-reveal>
                <ServiceCard href={docPath('services', s.slug, locale)} title={s.title} excerpt={s.excerpt} image={mediaProps(s.cover as Media, 'card')} icon={cat?.iconKey ?? 'pool'} />
              </li>
            )
          })}
        </ul>
      </Section>
    </PageShell>
  )
}
