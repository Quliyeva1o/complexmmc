import type { Metadata } from 'next'

import { FilterGrid } from '@/components/blocks/interactive'
import { PageBanner, SiteCTA } from '@/components/inner/InnerParts'
import { PageShell } from '@/components/layout/PageShell'
import { ProjectCard } from '@/components/ui/ProjectCard'
import { type Locale, localeCodes, localePrefix } from '@/i18n/config'
import { t } from '@/i18n/dictionary'
import { findBySlug, findDocs } from '@/lib/data'
import { breadcrumbLd, ldScript } from '@/lib/jsonld'
import { mediaProps } from '@/lib/media'
import { buildMetadata } from '@/lib/seo'
import { docPath } from '@/lib/urls'
import type { Media, Page, Project, ProjectCategory } from '@/payload-types'

/** /projects — template "Project Style 1": banner, category filter, project card grid. */
export const revalidate = 3600
const paths = Object.fromEntries(localeCodes.map((l) => [l, `${localePrefix(l)}/projects`])) as Record<Locale, string>

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }): Promise<Metadata> {
  const { locale } = await params
  const page = await findBySlug<Page>('pages', 'projects', locale, 0)
  return buildMetadata({ locale, paths, meta: page?.meta, fallbackTitle: t(locale).projects })
}

export default async function ProjectsPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params
  const d = t(locale)
  const [page, projects, cats] = await Promise.all([
    findBySlug<Page>('pages', 'projects', locale, 1),
    findDocs<Project>('projects', locale, { where: { _status: { equals: 'published' } }, depth: 1, limit: 200 }),
    findDocs<ProjectCategory>('project-categories', locale, { depth: 0 }),
  ])
  const home = localePrefix(locale) || '/'
  const usedCats = cats.filter((c) => projects.some((p) => (p.projectCategories ?? []).some((pc) => (typeof pc === 'object' ? pc.id : pc) === c.id)))

  return (
    <PageShell locale={locale} alternates={paths} overlayHeader>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: ldScript([breadcrumbLd([{ name: d.breadcrumbHome, path: home }, { name: d.projects, path: paths[locale] }])]) }} />
      <PageBanner title={page?.title ?? d.projects} intro={page?.intro} image={page?.banner} crumbs={[{ name: d.breadcrumbHome, href: home }, { name: d.projects }]} />

      <section className="py-[var(--section-y)]">
        <div className="container-x">
          <FilterGrid
            allLabel={d.all}
            filters={usedCats.map((c) => ({ key: String(c.id), label: c.title }))}
            className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
            items={projects.map((p) => {
              const cat = (p.projectCategories ?? []).find((c) => typeof c === 'object') as ProjectCategory | undefined
              return {
                key: String(p.id),
                cats: (p.projectCategories ?? []).map((c) => String(typeof c === 'object' ? c.id : c)),
                node: (
                  <ProjectCard
                    href={docPath('projects', p.slug, locale)}
                    title={p.title}
                    image={mediaProps(p.cover as Media, 'card')}
                    category={cat?.title}
                    excerpt={p.excerpt}
                    facts={{ size: p.size, days: p.durationDays, place: p.location }}
                    labels={{ view: d.viewProject, daysUnit: d.days }}
                  />
                ),
              }
            })}
          />
        </div>
      </section>

      <SiteCTA locale={locale} d={d} />
    </PageShell>
  )
}
