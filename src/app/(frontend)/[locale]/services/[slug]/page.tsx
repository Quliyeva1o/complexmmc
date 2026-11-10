import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import { UiIcon } from '@/components/icons/UiIcon'
import { FaqList, PageBanner, Prose } from '@/components/inner/InnerParts'
import { PageShell } from '@/components/layout/PageShell'
import { ProjectCard } from '@/components/ui/ProjectCard'
import { Button, cx, SectionHeader } from '@/components/ui/primitives'
import { type Locale, localeCodes, localePrefix } from '@/i18n/config'
import { t } from '@/i18n/dictionary'
import { findBySlug, findDocs, getAlternates } from '@/lib/data'
import { breadcrumbLd, faqLd, ldScript, serviceLd } from '@/lib/jsonld'
import { mediaProps } from '@/lib/media'
import { buildMetadata } from '@/lib/seo'
import { docPath } from '@/lib/urls'
import type { Category, Faq, Media, Project, Service } from '@/payload-types'

/**
 * /services/{slug} — template "Pool Construction" (Pooluxe service single), measured 1:1:
 * banner · [286px service nav | intro (badge + H2 + text / square image) · counter box ·
 * numbered feature cards · dark CTA box]. SEO body, FAQ and related projects sit between.
 */
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
const quoteHref: Record<Locale, string> = { az: '/qiymet-hesabla', en: '/en/price-calculator', ru: '/ru/kalkulyator-stoimosti' }
const FEATURE_ICONS = ['compass', 'gem', 'drop', 'gear', 'leaf', 'shield']

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
  const cat = (s.category ?? []).find((c) => typeof c === 'object') as Category | undefined

  // "Hovuz Növləri: Skimmer, Daşma, İnfinity" → badge "Hovuz Növləri", H2 "Skimmer, Daşma, İnfinity"
  const [lead, rest] = s.title.includes(':') ? s.title.split(/:\s*/, 2) : [cat?.shortName ?? d.services, s.title]
  const badge = lead
  const headline = s.headline || rest
  const counter = { value: s.counter?.value ?? 20, label: s.counter?.label || d.yearsExperience, title: s.counter?.title || d.svcPromiseTitle, text: s.counter?.text || d.svcPromiseText }

  const ld = [
    serviceLd({ name: s.title, description: s.excerpt, path, image: cover?.src }),
    breadcrumbLd([{ name: d.breadcrumbHome, path: home }, { name: d.services, path: `${localePrefix(locale)}/services` }, { name: s.title, path }]),
    faqLd(faqs),
  ].filter(Boolean) as object[]

  return (
    <PageShell locale={locale} alternates={alternates} overlayHeader>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: ldScript(ld) }} />
      <PageBanner title={s.title} image={s.banner ?? s.cover} crumbs={[{ name: d.breadcrumbHome, href: home }, { name: d.services, href: `${localePrefix(locale)}/services` }, { name: s.title }]} />

      <div className="px-[15px]">
        <div className="mx-auto flex max-w-[1304px] flex-col gap-[45px] py-[60px] md:py-[100px] lg:flex-row">
          {/* ---------------------------------------------------------- service navigation */}
          <aside className="w-full shrink-0 lg:w-[286px]">
            <nav aria-label={d.allServices}>
              <ul className="flex flex-col gap-[15px]">
                {all.map((x) => {
                  const href = toPath(x.slug!, locale)
                  const on = href === path
                  return (
                    <li key={x.id}>
                      <Link
                        href={href}
                        aria-current={on ? 'page' : undefined}
                        className={cx(
                          'flex min-h-[60px] items-center justify-between gap-2 rounded-[10px] px-[25px] py-[15px] font-display text-[18px] leading-[1.5] font-bold transition-colors duration-300 ease-in-out lg:text-[20px]',
                          on ? 'bg-header-sticky text-white' : 'bg-soft text-heading hover:bg-header-sticky hover:text-white',
                        )}
                      >
                        <span>{x.title.split(':')[0]}</span>
                        <UiIcon name="arrowRight" className="shrink-0 text-base" />
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </nav>
          </aside>

          <div className="flex min-w-0 flex-1 flex-col gap-5">
            {/* ---------------------------------------------------------- intro: badge + H2 + text | image */}
            <section className="grid items-center gap-10 md:grid-cols-2">
              <div className="flex flex-col gap-5">
                <SectionHeader align="start" eyebrow={badge} heading={headline} intro={s.excerpt} className="mb-0" />
              </div>
              {cover && (
                <div className="relative aspect-square overflow-hidden rounded-[15px]">
                  <Image src={cover.src} alt={cover.alt} fill priority sizes="(min-width:1024px) 467px, 100vw" className="object-cover" />
                </div>
              )}
            </section>

            {/* ---------------------------------------------------------- counter box */}
            <section className="mt-5 flex flex-col gap-x-10 gap-y-[30px] rounded-[15px] bg-primary/20 p-[30px] md:flex-row md:items-center md:p-10">
              <div className="shrink-0">
                <p className="font-body text-[56px] leading-none font-semibold text-primary md:text-[72px]">{counter.value}+</p>
                <p className="mt-1 leading-[30px]">{counter.label}</p>
              </div>
              <div>
                <h3 className="mb-[25px] text-[22px] leading-none tracking-normal md:text-[26px]">{counter.title}</h3>
                <p className="leading-[30px]">{counter.text}</p>
              </div>
            </section>

            {/* ---------------------------------------------------------- SEO body (pillar content) */}
            <Prose data={s.body} className="max-w-none pt-[30px]" />

            {/* ---------------------------------------------------------- numbered feature cards */}
            {features.length > 0 && (
              <ol className="grid gap-[30px] pt-[30px] pb-10 md:grid-cols-2">
                {features.map((f, i) => (
                  <li key={f.id ?? i} data-reveal className="relative rounded-[15px] bg-card-tint p-10 transition-colors duration-[400ms] ease-in-out">
                    <span className="mb-[30px] flex size-[70px] items-center justify-center rounded-[16px] bg-primary text-[32px] text-dark">
                      <UiIcon name={FEATURE_ICONS[i % FEATURE_ICONS.length]} />
                    </span>
                    <span className="absolute top-[30px] right-10 font-body text-[14px] leading-[30px] font-bold text-heading">{String(i + 1).padStart(2, '0')}</span>
                    <h3 className="mb-[14px] text-[22px] leading-none tracking-normal md:text-[24px]">{f.title}</h3>
                    {f.description && <p className="mt-[15px] leading-[30px]">{f.description}</p>}
                  </li>
                ))}
              </ol>
            )}

            <FaqList faqs={faqs} heading={d.faqHeading} />

            {projects.length > 0 && (
              <section className="pt-[30px] pb-10">
                <SectionHeader align="start" heading={d.relatedProjects} className="mb-2" />
                <ul className="grid gap-[30px] sm:grid-cols-2">
                  {projects.slice(0, 4).map((p) => (
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

            {/* ---------------------------------------------------------- dark CTA box */}
            <section className="flex flex-col gap-5 rounded-[15px] bg-dark p-[30px] md:flex-row md:items-center md:justify-between md:p-10">
              <SectionHeader dark align="start" eyebrow={d.contact} heading={d.svcCtaTitle} intro={d.svcCtaText} className="mb-0 p-2.5 md:max-w-[612px]" />
              <Button href={quoteHref[locale]} className="shrink-0 self-start md:self-center">
                {d.startProject}
              </Button>
            </section>
          </div>
        </div>
      </div>
    </PageShell>
  )
}
