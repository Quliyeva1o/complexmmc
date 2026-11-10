import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import { RenderBlocks } from '@/components/blocks/RenderBlocks'
import { FaqList, PageBanner, Prose, QuoteCard, SideList, SiteCTA, WithSidebar } from '@/components/inner/InnerParts'
import { PageShell } from '@/components/layout/PageShell'
import { ProjectCard } from '@/components/ui/ProjectCard'
import { type Locale, localeCodes, localePrefix } from '@/i18n/config'
import { type Dict, t } from '@/i18n/dictionary'
import { findBySlug, findDocs, getAlternates } from '@/lib/data'
import { breadcrumbLd, faqLd, ldScript, serviceLd } from '@/lib/jsonld'
import { mediaProps } from '@/lib/media'
import { buildMetadata } from '@/lib/seo'
import { docPath } from '@/lib/urls'
import type { Category, Faq, Media, Page, Project, Service, ServiceArea } from '@/payload-types'

/**
 * Root-level URLs, same structure as the old site:
 *   /about, /contact, /zemanet…       -> Pages (block builder)
 *   /hovuz-tikintisi, /sauna-…        -> Categories (pillar pages)
 *   /hovuz-tikintisi-bilgeh…          -> Service areas
 */
export const revalidate = 3600
export const dynamicParams = true

// List pages with their own routes (or later stages) are excluded from the catch-all.
const RESERVED = new Set(['home', 'services', 'projects'])
const published = { _status: { equals: 'published' } }

export async function generateStaticParams() {
  const out: { locale: string; slug: string }[] = []
  for (const locale of localeCodes) {
    const [pages, cats, areas] = await Promise.all([
      findDocs<Page>('pages', locale, { where: published, depth: 0, sort: 'createdAt' }),
      findDocs<Category>('categories', locale, { where: published, depth: 0 }),
      findDocs<ServiceArea>('service-areas', locale, { where: published, depth: 0 }),
    ])
    for (const d of [...pages, ...cats, ...areas]) if (d.slug && !RESERVED.has(d.slug)) out.push({ locale, slug: d.slug })
  }
  return out
}

type Resolved =
  | { kind: 'page'; doc: Page }
  | { kind: 'category'; doc: Category }
  | { kind: 'area'; doc: ServiceArea }

async function resolve(slug: string, locale: Locale, depth = 2): Promise<Resolved | null> {
  if (RESERVED.has(slug)) return null
  const page = await findBySlug<Page>('pages', slug, locale, depth)
  if (page) return { kind: 'page', doc: page }
  const cat = await findBySlug<Category>('categories', slug, locale, depth)
  if (cat) return { kind: 'category', doc: cat }
  const area = await findBySlug<ServiceArea>('service-areas', slug, locale, depth)
  if (area) return { kind: 'area', doc: area }
  return null
}

const COLLECTION = { page: 'pages', category: 'categories', area: 'service-areas' } as const
type P = { params: Promise<{ locale: Locale; slug: string }> }

export async function generateMetadata({ params }: P): Promise<Metadata> {
  const { locale, slug } = await params
  const r = await resolve(decodeURIComponent(slug), locale, 1)
  if (!r) return {}
  const col = COLLECTION[r.kind]
  const paths = await getAlternates(col, r.doc.id, (s, l) => docPath(col, s, l))
  const doc = r.doc as Page & Partial<Category>
  return buildMetadata({
    locale,
    paths,
    meta: { ...doc.meta, image: doc.meta?.image ?? doc.cover ?? doc.banner },
    fallbackTitle: doc.title,
    fallbackDescription: doc.excerpt ?? (r.kind === 'page' ? r.doc.intro : null),
  })
}

export default async function SlugPage({ params }: P) {
  const { locale, slug } = await params
  const r = await resolve(decodeURIComponent(slug), locale)
  if (!r) notFound()
  const d = t(locale)
  const col = COLLECTION[r.kind]
  const alternates = await getAlternates(col, r.doc.id, (s, l) => docPath(col, s, l))
  const path = docPath(col, r.doc.slug, locale)
  const home = localePrefix(locale) || '/'

  if (r.kind === 'page') return <CmsPage page={r.doc} locale={locale} d={d} path={path} home={home} alternates={alternates} />
  if (r.kind === 'category') return <CategoryPage cat={r.doc} locale={locale} d={d} path={path} home={home} alternates={alternates} />
  return <AreaPage area={r.doc} locale={locale} d={d} path={path} home={home} alternates={alternates} />
}

type Common = { locale: Locale; d: Dict; path: string; home: string; alternates: Partial<Record<Locale, string>> }

/* ------------------------------------------------------------------ CMS page (blocks) */
function CmsPage({ page, locale, d, path, home, alternates }: Common & { page: Page }) {
  return (
    <PageShell locale={locale} alternates={alternates} overlayHeader>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: ldScript([breadcrumbLd([{ name: d.breadcrumbHome, path: home }, { name: page.title, path }])]) }} />
      <PageBanner title={page.title} intro={page.intro} image={page.banner} crumbs={[{ name: d.breadcrumbHome, href: home }, { name: page.title }]} />
      <RenderBlocks blocks={page.layout} locale={locale} />
    </PageShell>
  )
}

/* ------------------------------------------------------------------ Category (pillar) page */
async function CategoryPage({ cat, locale, d, path, home, alternates }: Common & { cat: Category }) {
  const [cats, services, gallery] = await Promise.all([
    findDocs<Category>('categories', locale, { where: published, depth: 0 }),
    findDocs<Service>('services', locale, { where: { and: [published, { category: { in: [cat.id] } }] }, depth: 1 }),
    findDocs<{ project?: Project | number | null }>('gallery', locale, { where: { category: { equals: cat.id } }, depth: 2, limit: 60 }),
  ])
  // projects shown on this pillar = projects whose photos are filed under this category
  const projects = [...new Map(gallery.map((g) => g.project).filter((p): p is Project => typeof p === 'object' && !!p).map((p) => [p.id, p])).values()].slice(0, 4)
  const faqs = (cat.faqs ?? []).filter((f): f is Faq => typeof f === 'object')
  const cover = mediaProps(cat.cover as Media, 'large')

  const ld = [
    serviceLd({ name: cat.title, description: cat.excerpt, path, image: cover?.src }),
    breadcrumbLd([{ name: d.breadcrumbHome, path: home }, { name: cat.title, path }]),
    faqLd(faqs),
  ].filter(Boolean) as object[]

  return (
    <PageShell locale={locale} alternates={alternates} overlayHeader>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: ldScript(ld) }} />
      <PageBanner title={cat.title} intro={cat.excerpt} image={cat.banner ?? cat.cover} crumbs={[{ name: d.breadcrumbHome, href: home }, { name: cat.title }]} />
      <WithSidebar
        sidebar={
          <>
            <SideList title={d.categories} activeHref={path} items={cats.map((c) => ({ href: docPath('categories', c.slug, locale), label: c.shortName }))} />
            <QuoteCard locale={locale} d={d} text={d.freeQuoteText} />
          </>
        }
      >
        <Prose data={cat.body} />

        {services.length > 0 && (
          <section className="mt-16">
            <h2 className="mb-6 text-[clamp(1.625rem,1.3rem+1.2vw,2.25rem)]">{d.categoryServices}</h2>
            <ul className="grid gap-5 sm:grid-cols-2">
              {services.map((s) => {
                const img = mediaProps(s.cover as Media, 'thumb')
                return (
                  <li key={s.id}>
                    <Link href={docPath('services', s.slug, locale)} className="group flex gap-4 rounded-[var(--radius-card)] bg-soft p-4 transition-colors hover:bg-primary-soft">
                      {img && (
                        <span className="relative size-20 shrink-0 overflow-hidden rounded-[0.625rem]">
                          <Image src={img.src} alt="" fill sizes="80px" className="object-cover" />
                        </span>
                      )}
                      <span>
                        <span className="block font-display font-bold text-heading group-hover:text-primary">{s.title}</span>
                        {s.excerpt && <span className="mt-1 line-clamp-2 block text-sm">{s.excerpt}</span>}
                      </span>
                    </Link>
                  </li>
                )
              })}
            </ul>
          </section>
        )}

        {projects.length > 0 && (
          <section className="mt-16">
            <h2 className="mb-6 text-[clamp(1.625rem,1.3rem+1.2vw,2.25rem)]">{d.relatedProjects}</h2>
            <ul className="grid gap-6 sm:grid-cols-2">
              {projects.map((p) => (
                <li key={p.id}>
                  <ProjectCard
                    href={docPath('projects', p.slug, locale)}
                    title={p.title}
                    image={mediaProps(p.cover as Media, 'card')}
                    excerpt={p.excerpt}
                    facts={{ size: p.size, days: p.durationDays, place: p.location }}
                    labels={{ view: d.viewProject, daysUnit: d.days, completedIn: d.completedIn }}
                  />
                </li>
              ))}
            </ul>
          </section>
        )}

        <FaqList faqs={faqs} heading={d.faqHeading} />
      </WithSidebar>
      <RenderBlocks blocks={cat.layout} locale={locale} />
      <SiteCTA locale={locale} d={d} />
    </PageShell>
  )
}

/* ------------------------------------------------------------------ Service area page */
async function AreaPage({ area, locale, d, path, home, alternates }: Common & { area: ServiceArea }) {
  const areas = await findDocs<ServiceArea>('service-areas', locale, { where: published, depth: 0 })
  const projects = (area.projects ?? []).filter((p): p is Project => typeof p === 'object')
  const faqs = (area.faqs ?? []).filter((f): f is Faq => typeof f === 'object')

  const ld = [
    serviceLd({ name: area.title, description: area.excerpt, path, serviceType: d.services, areaServed: [area.district, 'Bakı'] }),
    breadcrumbLd([{ name: d.breadcrumbHome, path: home }, { name: area.title, path }]),
    faqLd(faqs),
  ].filter(Boolean) as object[]

  return (
    <PageShell locale={locale} alternates={alternates} overlayHeader>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: ldScript(ld) }} />
      <PageBanner title={area.title} intro={area.excerpt} image={area.banner} crumbs={[{ name: d.breadcrumbHome, href: home }, { name: area.title }]} />
      <WithSidebar
        sidebar={
          <>
            <SideList title={d.serviceAreas} activeHref={path} items={areas.map((a) => ({ href: docPath('service-areas', a.slug, locale), label: a.district }))} />
            <QuoteCard locale={locale} d={d} text={d.freeQuoteText} />
          </>
        }
      >
        <Prose data={area.body} />
        {projects.length > 0 && (
          <section className="mt-16">
            <h2 className="mb-6 text-[clamp(1.625rem,1.3rem+1.2vw,2.25rem)]">{d.areaProjects}</h2>
            <ul className="grid gap-6 sm:grid-cols-2">
              {projects.map((p) => (
                <li key={p.id}>
                  <ProjectCard
                    href={docPath('projects', p.slug, locale)}
                    title={p.title}
                    image={mediaProps(p.cover as Media, 'card')}
                    excerpt={p.excerpt}
                    facts={{ size: p.size, days: p.durationDays, place: p.location }}
                    labels={{ view: d.viewProject, daysUnit: d.days, completedIn: d.completedIn }}
                  />
                </li>
              ))}
            </ul>
          </section>
        )}
        <FaqList faqs={faqs} heading={d.faqHeading} />
      </WithSidebar>
      <SiteCTA locale={locale} d={d} />
    </PageShell>
  )
}
