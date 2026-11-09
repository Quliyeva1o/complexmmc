import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

import { PageBanner, SiteCTA } from '@/components/inner/InnerParts'
import { PageShell } from '@/components/layout/PageShell'
import { type Locale, localePrefix, localeCodes } from '@/i18n/config'
import { t } from '@/i18n/dictionary'
import { findBySlug, findDocs } from '@/lib/data'
import { breadcrumbLd, ldScript } from '@/lib/jsonld'
import { mediaProps } from '@/lib/media'
import { buildMetadata } from '@/lib/seo'
import { docPath } from '@/lib/urls'
import type { Media, Page, Service } from '@/payload-types'

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
  const [page, services] = await Promise.all([
    findBySlug<Page>('pages', 'services', locale, 1),
    findDocs<Service>('services', locale, { where: { _status: { equals: 'published' } }, depth: 1 }),
  ])
  const home = localePrefix(locale) || '/'
  return (
    <PageShell locale={locale} alternates={paths} overlayHeader>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: ldScript([breadcrumbLd([{ name: d.breadcrumbHome, path: home }, { name: d.services, path: paths[locale] }])]) }} />
      <PageBanner title={page?.title ?? d.services} intro={page?.intro} image={page?.banner} crumbs={[{ name: d.breadcrumbHome, href: home }, { name: d.services }]} />

      <section className="py-[var(--section-y)]">
        <ul className="container-x grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => {
            const img = mediaProps(s.cover as Media, 'card')
            const href = docPath('services', s.slug, locale)
            return (
              <li key={s.id} data-reveal>
                <Link href={href} className="group flex h-full flex-col overflow-hidden rounded-[var(--radius-card)] bg-white shadow-[var(--shadow-card)] ring-1 ring-heading/5">
                  <div className="relative aspect-[4/3] overflow-hidden bg-soft">
                    {img && <Image src={img.src} alt={img.alt} fill sizes="(min-width:1024px) 420px, (min-width:640px) 50vw, 100vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />}
                  </div>
                  <div className="flex flex-1 flex-col p-7">
                    <h2 className="text-h4 transition-colors group-hover:text-primary">{s.title}</h2>
                    {s.excerpt && <p className="mt-3 line-clamp-3">{s.excerpt}</p>}
                    <span className="mt-auto inline-flex pt-5 font-display font-bold text-heading underline decoration-primary decoration-2 underline-offset-4">{d.readMore}</span>
                  </div>
                </Link>
              </li>
            )
          })}
        </ul>
      </section>

      <SiteCTA locale={locale} d={d} />
    </PageShell>
  )
}
