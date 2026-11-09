import { RichText } from '@payloadcms/richtext-lexical/react'
import Image from 'next/image'
import Link from 'next/link'

import { CategoryStrip } from '@/components/home/CategoryStrip'
import { UiIcon } from '@/components/icons/UiIcon'
import { Button, Eyebrow, Section, SectionHeader, TwoTone } from '@/components/ui/primitives'
import { ProjectCard } from '@/components/ui/ProjectCard'
import { findDocs, getGlobal } from '@/lib/data'
import { mediaProps } from '@/lib/media'
import { docPath, resolveLink } from '@/lib/urls'
import type { Brand, Category, Faq, Form, Media, Post, Project, ProjectCategory, Reference, Service, SiteSetting } from '@/payload-types'
import { BeforeAfterSlider, FilterGrid, LeadForm, PillTabs } from './interactive'
import { blockTheme, type BlockCtx } from './shared'

/* eslint-disable @typescript-eslint/no-explicit-any */
type B = any

/** "auto" → newest by admin order; "manual" → the editor's picks in their order. */
async function itemsFor<T>(block: B, collection: any, locale: BlockCtx['locale'], extra: { where?: any; sort?: string; depth?: number } = {}): Promise<T[]> {
  if (block.source === 'manual') return ((block.items ?? []) as (T | number)[]).filter((x) => typeof x === 'object') as T[]
  return findDocs<T>(collection, locale, { limit: block.limit ?? 6, depth: extra.depth ?? 1, where: extra.where, sort: extra.sort })
}

const published = { _status: { equals: 'published' } }

/* ------------------------------------------------------------------ Category icon strip */
export async function CategoryStripBlock({ block, ctx }: { block: B; ctx: BlockCtx }) {
  const cats = await itemsFor<Category>(block, 'categories', ctx.locale, { where: { and: [published, { showOnHome: { equals: true } }] }, depth: 0 })
  return (
    <div className="pb-6">
      <CategoryStrip
        label={ctx.d.categories}
        overlapHero={ctx.prevBlock === 'hero'}
        items={cats.map((c) => ({ href: docPath('categories', c.slug, ctx.locale), label: c.shortName, icon: c.iconKey ?? 'pool', title: c.title }))}
      />
    </div>
  )
}

/* ------------------------------------------------------------------ References (+ brand marquee) */
export async function ReferencesBlock({ block, ctx }: { block: B; ctx: BlockCtx }) {
  const [refs, brands] = await Promise.all([
    itemsFor<Reference>(block, 'references', ctx.locale),
    block.showBrandMarquee ? findDocs<Brand>('brands', ctx.locale, { depth: 1 }) : Promise.resolve([] as Brand[]),
  ])
  return (
    <Section {...blockTheme(block)}>
      <SectionHeader eyebrow={block.header?.eyebrow} heading={block.header?.heading} intro={block.header?.intro} />
      <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {refs.map((r) => {
          const img = mediaProps(r.image as Media, 'card')
          const firstProject = (r.projects ?? []).find((p) => typeof p === 'object') as Project | undefined
          const href = firstProject ? docPath('projects', firstProject.slug, ctx.locale) : undefined
          const inner = (
            <figure className="group relative aspect-[3/4] overflow-hidden rounded-[var(--radius-media)] bg-dark">
              {img && <Image src={img.src} alt={img.alt} fill sizes="(min-width:1024px) 25vw, 50vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />}
              <div className="absolute inset-0 bg-gradient-to-t from-[rgb(0_26_77/0.9)] via-[rgb(0_26_77/0.2)] to-transparent" />
              {r.type && <span className="absolute top-4 left-4 rounded-[var(--radius-badge)] bg-white/90 px-3 py-1 text-sm font-semibold text-heading">{r.type}</span>}
              <figcaption className="absolute inset-x-0 bottom-0 p-6 text-white">
                <h3 className="text-2xl text-white">{r.name}</h3>
                {r.subtitle && <p className="mt-1 text-sm text-white/80">{r.subtitle}</p>}
              </figcaption>
            </figure>
          )
          return (
            <li key={r.id} data-reveal>
              {href ? (
                <Link href={href} className="block">
                  {inner}
                </Link>
              ) : (
                inner
              )}
            </li>
          )
        })}
      </ul>
      {brands.length > 0 && <BrandMarquee brands={brands} />}
    </Section>
  )
}

function BrandMarquee({ brands }: { brands: Brand[] }) {
  const logos = brands.map((b) => ({ b, img: mediaProps(b.logo as Media, 'thumb') })).filter((x) => x.img)
  const row = (hidden: boolean) =>
    logos.map(({ b, img }) => (
      <li key={`${b.id}-${hidden}`} className="mx-6 flex h-20 w-40 shrink-0 items-center justify-center" aria-hidden={hidden || undefined}>
        <Image src={img!.src} alt={hidden ? '' : `${b.name}${b.description ? ` – ${b.description}` : ''}`} width={160} height={64} className="max-h-14 w-auto object-contain opacity-70 grayscale transition hover:opacity-100 hover:grayscale-0" />
      </li>
    ))
  return (
    <div className="mt-16 overflow-hidden border-y border-border py-6 [mask-image:linear-gradient(90deg,transparent,black_10%,black_90%,transparent)]">
      <ul className="marquee">
        {row(false)}
        {row(true)}
      </ul>
    </div>
  )
}

export async function BrandLogosBlock({ block, ctx }: { block: B; ctx: BlockCtx }) {
  const brands = await itemsFor<Brand>(block, 'brands', ctx.locale, { depth: 1 })
  return (
    <Section {...blockTheme(block)}>
      <SectionHeader eyebrow={block.header?.eyebrow} heading={block.header?.heading} intro={block.header?.intro} />
      <BrandMarquee brands={brands} />
    </Section>
  )
}

/* ------------------------------------------------------------------ Projects (template "Latest Projects") */
export async function ProjectsCarouselBlock({ block, ctx }: { block: B; ctx: BlockCtx }) {
  const projects = await itemsFor<Project>(block, 'projects', ctx.locale, {
    where: block.source === 'manual' ? undefined : { and: [published, { featured: { equals: true } }] },
  })
  const cats = new Map<string, string>()
  for (const p of projects) for (const c of p.projectCategories ?? []) if (typeof c === 'object') cats.set(String((c as ProjectCategory).id), (c as ProjectCategory).title)
  const cta = resolveLink(block.cta, ctx.locale)
  return (
    <Section {...blockTheme(block)}>
      <SectionHeader align="split" eyebrow={block.header?.eyebrow} heading={block.header?.heading} intro={block.header?.intro} action={cta && <Button href={cta.href} variant="dark">{cta.label}</Button>} />
      <FilterGrid
        allLabel={ctx.d.all}
        filters={block.showCategoryTabs ? [...cats].map(([key, label]) => ({ key, label })) : []}
        className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
        items={projects.map((p) => {
          const cat = (p.projectCategories ?? []).find((c) => typeof c === 'object') as ProjectCategory | undefined
          return {
            key: String(p.id),
            cats: (p.projectCategories ?? []).map((c) => String(typeof c === 'object' ? c.id : c)),
            node: (
              <ProjectCard
                href={docPath('projects', p.slug, ctx.locale)}
                title={p.title}
                image={mediaProps(p.cover as Media, 'card')}
                category={cat?.title}
                excerpt={p.excerpt}
                facts={{ size: p.size, days: p.durationDays, place: p.location }}
                labels={{ view: ctx.d.viewProject, daysUnit: ctx.d.days }}
              />
            ),
          }
        })}
      />
    </Section>
  )
}

/* ------------------------------------------------------------------ Before / After (template section 1) */
export function BeforeAfterBlock({ block, ctx }: { block: B; ctx: BlockCtx }) {
  const pairs = (block.pairs ?? [])
    .map((p: any) => {
      const before = mediaProps(p.before as Media, 'large')
      const after = mediaProps(p.after as Media, 'large')
      return before && after ? { title: p.title, caption: p.caption, before, after } : null
    })
    .filter(Boolean)
  const cta = resolveLink(block.cta, ctx.locale)
  return (
    <Section {...blockTheme(block)}>
      <SectionHeader eyebrow={block.header?.eyebrow} heading={block.header?.heading} intro={block.header?.intro} />
      <div data-reveal>
        <BeforeAfterSlider pairs={pairs} labels={{ before: ctx.d.before, after: ctx.d.after, drag: ctx.d.drag }} />
      </div>
      {cta && (
        <div className="mt-10 text-center">
          <Button href={cta.href} variant="outline">
            {cta.label}
          </Button>
        </div>
      )}
    </Section>
  )
}

/* ------------------------------------------------------------------ Services: tabs (template section 2) or grid */
export async function ServicesGridBlock({ block, ctx }: { block: B; ctx: BlockCtx }) {
  const services = await itemsFor<Service>(block, 'services', ctx.locale, { where: published })
  const cta = resolveLink(block.cta, ctx.locale)
  if (block.layout === 'tabs') {
    return (
      <Section {...blockTheme(block)}>
        <SectionHeader eyebrow={block.header?.eyebrow} heading={block.header?.heading} intro={block.header?.intro} />
        <PillTabs
          tabs={services.map((s) => {
            const img = mediaProps(s.cover as Media, 'large')
            const feats = (s.features ?? []).slice(0, 4)
            return {
              id: String(s.id),
              label: s.title.split(':')[0],
              content: (
                <div className="grid items-center gap-10 rounded-[var(--radius-card)] bg-soft p-6 md:p-10 lg:grid-cols-2">
                  <div>
                    <h3 className="text-h4">{s.title}</h3>
                    {s.excerpt && <p className="mt-4">{s.excerpt}</p>}
                    {feats.length > 0 && (
                      <ul className="mt-6 grid gap-3">
                        {feats.map((f) => (
                          <li key={f.id} className="flex gap-3 text-heading">
                            <UiIcon name="check" className="mt-1.5 shrink-0 text-primary" />
                            {f.title}
                          </li>
                        ))}
                      </ul>
                    )}
                    <Button href={docPath('services', s.slug, ctx.locale)} className="mt-8">
                      {ctx.d.readMore}
                    </Button>
                  </div>
                  {img && (
                    <div className="relative aspect-[4/3] overflow-hidden rounded-[var(--radius-media)]">
                      <Image src={img.src} alt={img.alt} fill sizes="(min-width:1024px) 600px, 100vw" className="object-cover" />
                    </div>
                  )}
                </div>
              ),
            }
          })}
        />
        {cta && (
          <div className="mt-10 text-center">
            <Button href={cta.href} variant="outline">
              {cta.label}
            </Button>
          </div>
        )}
      </Section>
    )
  }
  return (
    <Section {...blockTheme(block)}>
      <SectionHeader eyebrow={block.header?.eyebrow} heading={block.header?.heading} intro={block.header?.intro} />
      <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((s) => {
          const img = mediaProps(s.cover as Media, 'card')
          const href = docPath('services', s.slug, ctx.locale)
          return (
            <li key={s.id} data-reveal>
              <Link href={href} className="group block overflow-hidden rounded-[var(--radius-card)] bg-white ring-1 ring-heading/5 transition-shadow hover:shadow-[var(--shadow-card)]">
                <div className="relative aspect-[4/3] overflow-hidden">
                  {img && <Image src={img.src} alt={img.alt} fill sizes="(min-width:1024px) 420px, 50vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />}
                </div>
                <div className="p-6">
                  <h3 className="text-h4 transition-colors group-hover:text-primary">{s.title}</h3>
                  {s.excerpt && <p className="mt-3 line-clamp-3">{s.excerpt}</p>}
                </div>
              </Link>
            </li>
          )
        })}
      </ul>
    </Section>
  )
}

/* ------------------------------------------------------------------ FAQ (template "Any Question?") */
export async function FAQBlock({ block, ctx }: { block: B; ctx: BlockCtx }) {
  const faqs = await itemsFor<Faq>(block, 'faqs', ctx.locale, { where: { showOnFaqPage: { equals: true } } })
  const [settings, forms] = await Promise.all([
    getGlobal<SiteSetting>('site-settings', ctx.locale, 0),
    block.showContactForm ? findDocs<Form>('forms', ctx.locale, { limit: 1, depth: 0, sort: 'createdAt' }) : Promise.resolve([] as Form[]),
  ])
  const phone = settings.phones?.find((p) => p.primary)?.number ?? settings.phones?.[0]?.number
  const list = (
    <div className="divide-y divide-border border-t border-border">
      {faqs.map((f, i) => (
        <details key={f.id} className="group py-5" open={i === 0}>
          <summary className="flex cursor-pointer list-none items-start justify-between gap-6 font-display text-lg font-bold text-heading [&::-webkit-details-marker]:hidden">
            {f.question}
            <span className="mt-0.5 grid size-8 shrink-0 place-items-center rounded-full bg-badge text-heading transition-transform duration-300 group-open:rotate-45 group-open:bg-primary">
              <UiIcon name="plus" />
            </span>
          </summary>
          <div className="prose-pool mt-3 pr-12">
            <RichText data={f.answer} />
          </div>
        </details>
      ))}
    </div>
  )
  if (!block.showContactForm) {
    return (
      <Section {...blockTheme(block)}>
        <SectionHeader eyebrow={block.header?.eyebrow} heading={block.header?.heading} intro={block.header?.intro} />
        <div className="mx-auto max-w-4xl">{list}</div>
      </Section>
    )
  }
  return (
    <Section {...blockTheme(block)}>
      <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr]">
        <div data-reveal>
          {block.header?.eyebrow && <Eyebrow>{block.header.eyebrow}</Eyebrow>}
          {block.header?.heading && (
            <h2 className="mt-5">
              <TwoTone text={block.header.heading} />
            </h2>
          )}
          {block.header?.intro && <p className="mt-5">{block.header.intro}</p>}
          <div className="mt-8 rounded-[var(--radius-card)] bg-soft p-8">
            <h3 className="text-xl">{ctx.d.stillQuestions}</h3>
            {phone && (
              <a href={`tel:${phone.replace(/[^\d+]/g, '')}`} className="mt-3 flex items-center gap-2 font-display text-xl font-bold text-heading hover:text-primary">
                <UiIcon name="phone" className="text-primary" />
                {phone}
              </a>
            )}
            {forms[0] && (
              <div className="mt-6">
                <LeadForm
                  compact
                  formId={forms[0].id}
                  labels={{ name: ctx.d.name, phone: ctx.d.phone, message: ctx.d.message, send: ctx.d.send, sending: ctx.d.sending, sent: ctx.d.sent, error: ctx.d.formError }}
                />
              </div>
            )}
          </div>
        </div>
        <div data-reveal>{list}</div>
      </div>
    </Section>
  )
}

/* ------------------------------------------------------------------ Latest posts (template blog cards) */
export async function LatestPostsBlock({ block, ctx }: { block: B; ctx: BlockCtx }) {
  const posts = await itemsFor<Post>(block, 'posts', ctx.locale, { where: published, sort: '-publishedAt' })
  const cta = resolveLink(block.cta, ctx.locale)
  const fmt = new Intl.DateTimeFormat(ctx.locale === 'az' ? 'az-Latn-AZ' : ctx.locale, { day: '2-digit', month: 'short' })
  return (
    <Section {...blockTheme(block)}>
      <SectionHeader align="split" eyebrow={block.header?.eyebrow} heading={block.header?.heading} intro={block.header?.intro} action={cta && <Button href={cta.href} variant="dark">{cta.label}</Button>} />
      <ul className="grid gap-8 md:grid-cols-3">
        {posts.map((p) => {
          const img = mediaProps(p.cover as Media, 'card')
          const href = docPath('posts', p.slug, ctx.locale)
          const date = p.publishedAt ? fmt.formatToParts(new Date(p.publishedAt)) : null
          return (
            <li key={p.id} data-reveal>
              <article className="group">
                <Link href={href} className="relative block aspect-[16/11] overflow-hidden rounded-[var(--radius-media)] bg-soft" tabIndex={-1} aria-hidden="true">
                  {img && <Image src={img.src} alt={img.alt} fill sizes="(min-width:768px) 33vw, 100vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />}
                  {date && (
                    <span className="absolute top-4 left-4 rounded-[var(--radius-sm)] bg-primary px-3 py-2 text-center leading-none text-on-primary">
                      <span className="block font-display text-xl font-extrabold">{date.find((d) => d.type === 'day')?.value}</span>
                      <span className="block text-xs font-semibold">{date.find((d) => d.type === 'month')?.value}</span>
                    </span>
                  )}
                </Link>
                <h3 className="mt-5 text-xl leading-snug">
                  <Link href={href} className="transition-colors hover:text-primary">
                    {p.title}
                  </Link>
                </h3>
                {p.excerpt && <p className="mt-3 line-clamp-2">{p.excerpt}</p>}
              </article>
            </li>
          )
        })}
      </ul>
    </Section>
  )
}
