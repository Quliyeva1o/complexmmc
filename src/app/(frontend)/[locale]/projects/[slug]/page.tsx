import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { BeforeAfterSlider } from '@/components/blocks/interactive'
import { ProjectSlider } from '@/components/inner/ProjectSlider'
import { PageBanner, Prose } from '@/components/inner/InnerParts'
import { UiIcon } from '@/components/icons/UiIcon'
import { PageShell } from '@/components/layout/PageShell'
import { ProjectCard } from '@/components/ui/ProjectCard'
import { SectionHeader } from '@/components/ui/primitives'
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
    const docs = await findDocs<Project>('projects', locale, {
      where: { _status: { equals: 'published' } },
      depth: 0,
      limit: 500,
    })
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
  return buildMetadata({
    locale,
    paths: await getAlternates('projects', p.id, toPath),
    meta: { ...p.meta, image: p.meta?.image ?? p.cover },
    fallbackTitle: p.title,
    fallbackDescription: p.excerpt,
  })
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
      where: {
        and: [
          { _status: { equals: 'published' } },
          { id: { not_equals: p.id } },
          ...(catIds.length ? [{ projectCategories: { in: catIds } }] : []),
        ],
      },
      limit: 3,
      depth: 1,
    }),
  ])

  const path = toPath(p.slug!, locale)
  const home = localePrefix(locale) || '/'
  const cat = (p.projectCategories ?? []).find((c) => typeof c === 'object') as
    ProjectCategory | undefined
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
    .filter(Boolean) as {
    title: string
    before: { src: string; alt: string }
    after: { src: string; alt: string }
  }[]

  const ld = [
    projectLd({
      name: p.title,
      description: p.excerpt,
      path,
      images: gallery.map((g) => g.full),
      location: p.location,
      year: p.year,
    }),
    breadcrumbLd([
      { name: d.breadcrumbHome, path: home },
      { name: d.projects, path: `${localePrefix(locale)}/projects` },
      { name: p.title, path },
    ]),
  ]

  return (
    <PageShell locale={locale} alternates={alternates} overlayHeader>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: ldScript(ld) }} />
      <PageBanner
        title={p.title}
        image={p.banner ?? p.cover}
        crumbs={[
          { name: d.breadcrumbHome, href: home },
          { name: d.projects, href: `${localePrefix(locale)}/projects` },
          { name: p.title },
        ]}
      />

      <div className="px-[15px]">
        <div className="mx-auto flex max-w-[1304px] flex-col gap-[45px] py-[60px] md:py-[100px] lg:flex-row">
          {/* ---------------------------------------------------------- main column (839px) */}
          <div className="flex min-w-0 flex-1 flex-col gap-5 lg:max-w-[839px]">
            {p.excerpt && (
              <p className="font-display text-[22px] leading-[1.5] font-bold text-heading md:text-[26px]">
                {p.excerpt}
              </p>
            )}
            {gallery.length > 0 && (
              <div className="pt-5">
                <ProjectSlider
                  images={gallery}
                  labels={{ prev: d.prev, next: d.next, open: d.openImage }}
                />
              </div>
            )}
            <Prose data={p.body} className="max-w-none" />

            {(p.highlights ?? []).length > 0 && (
              <section className="pt-10">
                <SectionHeader align="start" heading={d.highlights} className="mb-2" />
                <ul className="grid gap-[30px] sm:grid-cols-2">
                  {p.highlights!.map((h) => (
                    <li key={h.id} className="flex h-full flex-col gap-4 rounded-[15px] bg-soft p-[30px]" data-reveal>
                      <div className="flex items-start gap-4">
                        <span className="grid size-11 shrink-0 place-items-center rounded-full bg-primary text-[18px] text-heading" aria-hidden="true">
                          <UiIcon name="check" />
                        </span>
                        <h3 className="pt-2 text-[19px] leading-[1.35] tracking-normal md:text-[20px]">{h.title}</h3>
                      </div>
                      {h.description && <p className="leading-[28px]">{h.description}</p>}
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {pairs.length > 0 && (
              <section className="flex flex-col gap-5 pt-10">
                <h2 className="text-[22px] leading-[1.5] tracking-normal md:text-[26px]">
                  {d.beforeAfter}
                </h2>
                <BeforeAfterSlider
                  pairs={pairs}
                  labels={{ before: d.before, after: d.after, drag: d.drag }}
                />
              </section>
            )}
          </div>

          {/* ---------------------------------------------------------- sidebar (420px) */}
          <aside className="w-full shrink-0 lg:w-[420px]">
            <h2 className="mb-5 text-[26px] leading-none tracking-normal">{d.projectDetails}</h2>
            <dl className="flex flex-col gap-5 pb-[50px]">
              {[
                { label: d.reference, value: ref?.name },
                { label: d.location, value: p.location },
                { label: d.category, value: cat?.title },
                { label: d.workType, value: p.workType },
                { label: d.size, value: p.size },
                { label: d.duration, value: p.durationDays ? `${p.durationDays} ${d.days}` : null },
                { label: d.year, value: p.year },
              ]
                .filter((r) => r.value)
                .map((r) => (
                  <div
                    key={r.label}
                    className="flex items-baseline justify-between gap-6 leading-4"
                  >
                    <dt>{r.label}</dt>
                    <dd className="text-right font-semibold">{r.value}</dd>
                  </div>
                ))}
            </dl>
          </aside>
        </div>
      </div>

      {related.length > 0 && (
        <section className="bg-soft px-[15px] py-[60px] md:py-[100px]">
          <div className="mx-auto max-w-[1304px]">
            <SectionHeader heading={d.relatedProjects} />
            <ul className="grid gap-x-[30px] gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((r) => (
                <li key={r.id}>
                  <ProjectCard
                    href={docPath('projects', r.slug, locale)}
                    title={r.title}
                    image={mediaProps(r.cover as Media, 'card')}
                    excerpt={r.excerpt}
                    facts={{ size: r.size, days: r.durationDays, place: r.location }}
                    labels={{ view: d.viewProject, daysUnit: d.days, completedIn: d.completedIn }}
                  />
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}
    </PageShell>
  )
}
