import type { Metadata } from 'next'

import { PageBanner } from '@/components/inner/InnerParts'
import { PageShell } from '@/components/layout/PageShell'
import { ProjectCard } from '@/components/ui/ProjectCard'
import { type Locale, localeCodes, localePrefix } from '@/i18n/config'
import { t } from '@/i18n/dictionary'
import { findBySlug, findDocs } from '@/lib/data'
import { breadcrumbLd, ldScript } from '@/lib/jsonld'
import { mediaProps } from '@/lib/media'
import { buildMetadata } from '@/lib/seo'
import { docPath } from '@/lib/urls'
import type { Media, Page, Project } from '@/payload-types'

/** /projects — template "Project Style 1": banner + 3-column project card grid. */
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
  const [page, projects] = await Promise.all([
    findBySlug<Page>('pages', 'projects', locale, 1),
    findDocs<Project>('projects', locale, { where: { _status: { equals: 'published' } }, depth: 1, limit: 200 }),
  ])
  const home = localePrefix(locale) || '/'

  return (
    <PageShell locale={locale} alternates={paths} overlayHeader>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: ldScript([breadcrumbLd([{ name: d.breadcrumbHome, path: home }, { name: d.projects, path: paths[locale] }])]) }} />
      <PageBanner title={page?.title ?? d.projects} intro={page?.intro} image={page?.banner} crumbs={[{ name: d.breadcrumbHome, href: home }, { name: d.projects }]} />

      <div className="px-[15px]">
        <ul className="mx-auto grid max-w-[1304px] gap-x-[30px] gap-y-10 py-[60px] sm:grid-cols-2 md:py-[100px] lg:grid-cols-3">
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
      </div>
    </PageShell>
  )
}
