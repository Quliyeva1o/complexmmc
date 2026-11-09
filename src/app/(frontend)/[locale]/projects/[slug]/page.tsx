import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { BeforeAfterSlider } from '@/components/blocks/interactive'
import { Gallery } from '@/components/inner/Gallery'
import { FactsTable, PageBanner, Prose, QuoteCard, SiteCTA, WithSidebar } from '@/components/inner/InnerParts'
import { PageShell } from '@/components/layout/PageShell'
import { UiIcon } from '@/components/icons/UiIcon'
import { ProjectCard } from '@/components/ui/ProjectCard'
import { type Locale, localeCodes, localePrefix } from '@/i18n/config'
import { t } from '@/i18n/dictionary'
import { findBySlug, findDocs, getAlternates } from '@/lib/data'
import { breadcrumbLd, ldScript, projectLd } from '@/lib/jsonld'
import { mediaProps } from '@/lib/media'
import { buildMetadata } from '@/lib/seo'
import { docPath } from '@/lib/urls'
import type { Media, Project, ProjectCategory, Reference } from '@/payload-types'

/** /projects/{slug} — template "Project Single": overview, gallery, highlights, details, related. */
export const revalidate = 3600
export const dynamicParams = true

export async function generateStaticParams() {
  const out: { locale: string; slug: string }[] = []
  for (const locale of localeCodes) {
    const docs = await findDocs<Project>('projects', locale, { where: { _status: { equals: 'published' } }, depth: 0, limit: 500 })
    for (const p of docs) if (p.slug) out.push({ locale, slug: p.slug })
  }
  return out
}

type P = { params: Promise<{ locale: Locale; slug: string }> }
const toPath = (slug: string, l: Locale) => docPath('projects', slug, l)

export async function generateMetadata({ params }: P): Promise<Metadata> {
  const { locale, slug } = await params
  const p = await findBySlug<Project>('projects', decodeURIComponent(slug), locale, 1)
  if (!p) return {}
  return buildMetadata({ locale, paths: await getAlternates('projects', p.id, toPath), meta: { ...p.meta, image: p.meta?.image ?? p.cover }, fallbackTitle: p.title, fallbackDescription: p.excerpt })
}

export default async function ProjectPage({ params }: P) {
  const { locale, slug } = await params
  const d = t(locale)
  const p = await findBySlug<Project>('projects', decodeURIComponent(slug), locale, 2)
  if (!p) notFound()

  const catIds = (p.projectCategories ?? []).map((c) => (typeof c === 'object' ? c.id : c))
  const [alternates, related] = await Promise.all([
    getAlternates('projects', p.id, toPath),
    findDocs<Project>('projects', locale, {
      where: { and: [{ _status: { equals: 'published' } }, { id: { not_equals: p.id } }, ...(catIds.length ? [{ projectCategories: { in: catIds } }] : [])] },
      limit: 3,
      depth: 1,
    }),
  ])

  const path = toPath(p.slug!, locale)
  const home = localePrefix(locale) || '/'
  const cat = (p.projectCategories ?? []).find((c) => typeof c === 'object') as ProjectCategory | undefined
  const ref = typeof p.reference === 'object' ? (p.reference as Reference | null) : null
  const gallery = (p.gallery ?? [])
    .map((m) => {
      const thumb = mediaProps(m as Media, 'card')
      const full = mediaProps(m as Media, 'hero')
      return thumb && full ? { src: thumb.src, alt: thumb.alt, full: full.src } : null
    })
    .filter(Boolean) as { src: string; alt: string; full: string }[]
  const pairs = (p.beforeAfter ?? [])
    .map((ba) => {
      const before = mediaProps(ba.before as Media, 'large')
      const after = mediaProps(ba.after as Media, 'large')
      return before && after ? { title: p.title, before, after } : null
    })
    .filter(Boolean) as { title: string; before: { src: string; alt: string }; after: { src: string; alt: string } }[]

  const ld = [
    projectLd({ name: p.title, description: p.excerpt, path, images: gallery.map((g) => g.full), location: p.location, year: p.year }),
    breadcrumbLd([{ name: d.breadcrumbHome, path: home }, { name: d.projects, path: `${localePrefix(locale)}/projects` }, { name: p.title, path }]),
  ]

  return (
    <PageShell locale={locale} alternates={alternates} overlayHeader>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: ldScript(ld) }} />
      <PageBanner
        title={p.title}
        image={p.banner ?? p.cover}
        crumbs={[{ name: d.breadcrumbHome, href: home }, { name: d.projects, href: `${localePrefix(locale)}/projects` }, { name: p.title }]}
      />

      <WithSidebar
        sidebar={
          <>
            <div>
              <h2 className="mb-4 text-xl">{d.projectDetails}</h2>
              <FactsTable
                rows={[
                  { label: d.reference, value: ref?.name },
                  { label: d.location, value: p.location },
                  { label: d.size, value: p.size },
                  { label: d.duration, value: p.durationDays ? `${p.durationDays} ${d.days}` : null },
                  { label: d.workType, value: p.workType },
                  { label: d.category, value: cat?.title },
                  { label: d.year, value: p.year },
                ]}
              />
            </div>
            <QuoteCard locale={locale} d={d} text={d.freeQuoteText} />
          </>
        }
      >
        {p.excerpt && <p className="font-display text-xl leading-relaxed font-semibold text-heading">{p.excerpt}</p>}

        {gallery.length > 0 && (
          <div className="mt-8">
            <Gallery images={gallery} labels={{ close: d.close, prev: d.prev, next: d.next, open: d.openImage }} />
          </div>
        )}

        <Prose data={p.body} className="mt-10" />

        {(p.highlights ?? []).length > 0 && (
          <section className="mt-12">
            <h2 className="mb-6 text-[clamp(1.625rem,1.3rem+1.2vw,2.25rem)]">{d.highlights}</h2>
            <ul className="grid gap-4 sm:grid-cols-2">
              {p.highlights!.map((h) => (
                <li key={h.id} className="flex gap-3 rounded-[var(--radius-card)] bg-soft p-5">
                  <span className="grid size-8 shrink-0 place-items-center rounded-full bg-primary text-on-primary">
                    <UiIcon name="check" />
                  </span>
                  <span>
                    <span className="block font-display font-bold text-heading">{h.title}</span>
                    {h.description && <span className="mt-1 block">{h.description}</span>}
                  </span>
                </li>
              ))}
            </ul>
          </section>
        )}

        {pairs.length > 0 && (
          <section className="mt-14">
            <h2 className="mb-6 text-[clamp(1.625rem,1.3rem+1.2vw,2.25rem)]">{d.beforeAfter}</h2>
            <BeforeAfterSlider pairs={pairs} labels={{ before: d.before, after: d.after, drag: d.drag }} />
          </section>
        )}
      </WithSidebar>

      {related.length > 0 && (
        <section className="bg-soft py-[var(--section-y)]">
          <div className="container-x">
            <h2 className="mb-10 text-center">{d.relatedProjects}</h2>
            <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((r) => (
                <li key={r.id}>
                  <ProjectCard
                    href={docPath('projects', r.slug, locale)}
                    title={r.title}
                    image={mediaProps(r.cover as Media, 'card')}
                    excerpt={r.excerpt}
                    facts={{ size: r.size, days: r.durationDays, place: r.location }}
                    labels={{ view: d.viewProject, daysUnit: d.days }}
                  />
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <SiteCTA locale={locale} d={d} />
    </PageShell>
  )
}
