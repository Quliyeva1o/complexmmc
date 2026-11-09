import type { Metadata } from 'next'
import Image from 'next/image'
import { notFound } from 'next/navigation'

import { FaqList, PageBanner, Prose, QuoteCard, SideList, SiteCTA, WithSidebar } from '@/components/inner/InnerParts'
import { PageShell } from '@/components/layout/PageShell'
import { ProjectCard } from '@/components/ui/ProjectCard'
import { type Locale, localeCodes, localePrefix } from '@/i18n/config'
import { t } from '@/i18n/dictionary'
import { findBySlug, findDocs, getAlternates } from '@/lib/data'
import { breadcrumbLd, faqLd, ldScript, serviceLd } from '@/lib/jsonld'
import { mediaProps } from '@/lib/media'
import { buildMetadata } from '@/lib/seo'
import { docPath } from '@/lib/urls'
import type { Faq, Media, Project, Service } from '@/payload-types'

/** /services/{slug} — template "Pool Construction": sidebar service list + content + numbered features. */
export const revalidate = 3600
export const dynamicParams = true

export async function generateStaticParams() {
  const out: { locale: string; slug: string }[] = []
  for (const locale of localeCodes) {
    const docs = await findDocs<Service>('services', locale, { where: { _status: { equals: 'published' } }, depth: 0 })
    for (const s of docs) if (s.slug) out.push({ locale, slug: s.slug })
  }
  return out
}

type P = { params: Promise<{ locale: Locale; slug: string }> }
const toPath = (slug: string, l: Locale) => docPath('services', slug, l)

export async function generateMetadata({ params }: P): Promise<Metadata> {
  const { locale, slug } = await params
  const s = await findBySlug<Service>('services', decodeURIComponent(slug), locale, 1)
  if (!s) return {}
  return buildMetadata({ locale, paths: await getAlternates('services', s.id, toPath), meta: { ...s.meta, image: s.meta?.image ?? s.cover }, fallbackTitle: s.title, fallbackDescription: s.excerpt })
}

export default async function ServicePage({ params }: P) {
  const { locale, slug } = await params
  const d = t(locale)
  const s = await findBySlug<Service>('services', decodeURIComponent(slug), locale, 2)
  if (!s) notFound()
  const [all, alternates] = await Promise.all([
    findDocs<Service>('services', locale, { where: { _status: { equals: 'published' } }, depth: 0 }),
    getAlternates('services', s.id, toPath),
  ])
  const path = toPath(s.slug!, locale)
  const home = localePrefix(locale) || '/'
  const cover = mediaProps(s.cover as Media, 'large')
  const faqs = (s.faqs ?? []).filter((f): f is Faq => typeof f === 'object')
  const projects = (s.relatedProjects ?? []).filter((p): p is Project => typeof p === 'object')
  const features = s.features ?? []

  const ld = [
    serviceLd({ name: s.title, description: s.excerpt, path, image: cover?.src }),
    breadcrumbLd([{ name: d.breadcrumbHome, path: home }, { name: d.services, path: `${localePrefix(locale)}/services` }, { name: s.title, path }]),
    faqLd(faqs),
  ].filter(Boolean) as object[]

  return (
    <PageShell locale={locale} alternates={alternates} overlayHeader>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: ldScript(ld) }} />
      <PageBanner
        title={s.title}
        image={s.banner ?? s.cover}
        crumbs={[{ name: d.breadcrumbHome, href: home }, { name: d.services, href: `${localePrefix(locale)}/services` }, { name: s.title }]}
      />

      <WithSidebar
        sidebarFirst
        sidebar={
          <>
            <SideList title={d.allServices} activeHref={path} items={all.map((x) => ({ href: toPath(x.slug!, locale), label: x.title.split(':')[0] }))} />
            <QuoteCard locale={locale} d={d} text={d.freeQuoteText} />
          </>
        }
      >
        {s.excerpt && <p className="font-display text-xl leading-relaxed font-semibold text-heading">{s.excerpt}</p>}
        {cover && (
          <div className="relative mt-8 aspect-[16/9] overflow-hidden rounded-[var(--radius-media)]">
            <Image src={cover.src} alt={cover.alt} fill priority sizes="(min-width:1024px) 860px, 100vw" className="object-cover" />
            {s.counter?.value ? (
              <div className="absolute bottom-5 left-5 rounded-[var(--radius-card)] bg-primary px-6 py-4 text-on-primary">
                <p className="font-display text-4xl leading-none font-extrabold">{s.counter.value}+</p>
                <p className="mt-1 text-sm font-semibold">{s.counter.label}</p>
              </div>
            ) : null}
          </div>
        )}
        <Prose data={s.body} className="mt-10" />

        {features.length > 0 && (
          <section className="mt-14">
            <ol className="grid gap-5 sm:grid-cols-2">
              {features.map((f, i) => (
                <li key={f.id ?? i} className="rounded-[var(--radius-card)] bg-soft p-6">
                  <span className="font-display text-3xl font-extrabold text-primary">{String(i + 1).padStart(2, '0')}</span>
                  <h3 className="mt-3 text-lg leading-snug">{f.title}</h3>
                  {f.description && <p className="mt-2">{f.description}</p>}
                </li>
              ))}
            </ol>
          </section>
        )}

        <FaqList faqs={faqs} heading={d.faqHeading} />

        {projects.length > 0 && (
          <section className="mt-16">
            <h2 className="mb-6 text-[clamp(1.625rem,1.3rem+1.2vw,2.25rem)]">{d.relatedProjects}</h2>
            <ul className="grid gap-6 sm:grid-cols-2">
              {projects.slice(0, 4).map((p) => (
                <li key={p.id}>
                  <ProjectCard
                    href={docPath('projects', p.slug, locale)}
                    title={p.title}
                    image={mediaProps(p.cover as Media, 'card')}
                    excerpt={p.excerpt}
                    facts={{ size: p.size, days: p.durationDays, place: p.location }}
                    labels={{ view: d.viewProject, daysUnit: d.days }}
                  />
                </li>
              ))}
            </ul>
          </section>
        )}
      </WithSidebar>

      <SiteCTA locale={locale} d={d} />
    </PageShell>
  )
}
