import { RichText } from '@payloadcms/richtext-lexical/react'
import Image from 'next/image'
import Link from 'next/link'

import { CategoryStrip } from '@/components/home/CategoryStrip'
import { FaqItem } from '@/components/inner/InnerParts'
import { UiIcon } from '@/components/icons/UiIcon'
import { Button, Section, SectionHeader } from '@/components/ui/primitives'
import { ServiceCard } from '@/components/ui/ServiceCard'
import { ServiceOverlayCard } from '@/components/ui/ServiceOverlayCard'
import { findDocs, getGlobal } from '@/lib/data'
import { mediaProps } from '@/lib/media'
import { docPath, resolveLink } from '@/lib/urls'
import type {
  Brand,
  Category,
  Faq,
  Form,
  Media,
  Post,
  Project,
  Reference,
  Service,
  SiteSetting,
} from '@/payload-types'
import { LeadForm, PillTabs } from './interactive'
import { type BAPairT, BeforeAfterTuran, type ProjectSlide, ProjectsShowcase } from './turan'
import { blockTheme, type BlockCtx } from './shared'

/* eslint-disable @typescript-eslint/no-explicit-any */
type B = any

/** "auto" → newest by admin order; "manual" → the editor's picks in their order. */
async function itemsFor<T>(
  block: B,
  collection: any,
  locale: BlockCtx['locale'],
  extra: { where?: any; sort?: string; depth?: number } = {},
): Promise<T[]> {
  if (block.source === 'manual')
    return ((block.items ?? []) as (T | number)[]).filter((x) => typeof x === 'object') as T[]
  return findDocs<T>(collection, locale, {
    limit: block.limit ?? 6,
    depth: extra.depth ?? 1,
    where: extra.where,
    sort: extra.sort,
  })
}

const published = { _status: { equals: 'published' } }

/* ------------------------------------------------------------------ Category icon strip */
export async function CategoryStripBlock({ block, ctx }: { block: B; ctx: BlockCtx }) {
  const cats = await itemsFor<Category>(block, 'categories', ctx.locale, {
    where: { and: [published, { showOnHome: { equals: true } }] },
    depth: 0,
  })
  return (
    <div className="pb-6">
      <CategoryStrip
        label={ctx.d.categories}
        overlapHero={ctx.prevBlock === 'hero:rotating'}
        items={cats.map((c) => ({
          href: docPath('categories', c.slug, ctx.locale),
          label: c.shortName,
          icon: c.iconKey ?? 'pool',
          title: c.title,
        }))}
      />
    </div>
  )
}

/* ------------------------------------------------------------------ References (+ brand marquee) */
export async function ReferencesBlock({ block, ctx }: { block: B; ctx: BlockCtx }) {
  const [refs, brands] = await Promise.all([
    itemsFor<Reference>(block, 'references', ctx.locale),
    block.showBrandMarquee
      ? findDocs<Brand>('brands', ctx.locale, { depth: 1 })
      : Promise.resolve([] as Brand[]),
  ])
  const { id } = blockTheme(block)
  const h = block.header
  // Same bento rhythm as the old turanprojects.az section, repeated every 4 items:
  // big (2 rows) · wide · small · small
  const cell = [
    'sm:row-span-2 lg:col-span-6 lg:row-span-2',
    'lg:col-span-6',
    'lg:col-span-3',
    'sm:col-span-2 lg:col-span-3',
  ]
  return (
    <section id={id} aria-label={h?.eyebrow ?? undefined} className="bg-[#f7f8fa] py-14 lg:py-20">
      <div className="mx-auto max-w-[1300px] px-6 sm:px-8 lg:px-12">
        <SectionHeader eyebrow={h?.eyebrow} heading={h?.heading} intro={h?.intro} />
        <ul className="grid auto-rows-[240px] grid-cols-1 gap-4 sm:grid-cols-2 lg:auto-rows-[230px] lg:grid-cols-12">
          {refs.map((r, i) => {
            const big = i % 4 === 0
            const img = mediaProps(r.image as Media, big ? 'large' : 'card')
            const firstProject = (r.projects ?? []).find((p) => typeof p === 'object') as
              Project | undefined
            const href = firstProject
              ? docPath('projects', firstProject.slug, ctx.locale)
              : undefined
            return (
              <li
                key={r.id}
                data-reveal
                className={`group relative overflow-hidden rounded-[28px] bg-[#0B1B2B] ${cell[i % 4]}`}
              >
                <figure className="relative m-0 size-full">
                  {img && (
                    <Image
                      src={img.src}
                      alt={img.alt}
                      fill
                      sizes="(max-width: 640px) 100vw, 50vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  )}
                  <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_top,rgba(11,27,43,0.88)_0%,rgba(11,27,43,0.25)_48%,rgba(11,27,43,0)_70%)]" />
                  {r.type && (
                    <span className="absolute top-4 left-4 rounded-full border border-white/30 bg-white/16 px-3 py-1 text-[10px] font-bold tracking-[0.18em] text-white uppercase backdrop-blur-md">
                      {r.type}
                    </span>
                  )}
                  <figcaption className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
                    <span className="mb-3 block h-[2px] w-8 bg-[#B98A4E] transition-all duration-500 group-hover:w-16" />
                    <h3
                      className={`m-0 leading-tight font-extrabold tracking-normal text-white ${big ? 'text-[26px] sm:text-[32px]' : 'text-[19px]'}`}
                    >
                      {r.name}
                    </h3>
                    {r.subtitle && (
                      <p className="m-0 mt-1 text-[13px] leading-snug text-white/78">
                        {r.subtitle}
                      </p>
                    )}
                  </figcaption>
                </figure>
                {href && (
                  <Link
                    href={href}
                    className="absolute inset-0 rounded-[28px] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0B9AA6]"
                    aria-label={`${r.name}${r.subtitle ? ` – ${r.subtitle}` : ''}`}
                  />
                )}
              </li>
            )
          })}
        </ul>
        {brands.length > 0 && <BrandMarquee brands={brands} />}
      </div>
    </section>
  )
}

function BrandMarquee({ brands }: { brands: Brand[] }) {
  const logos = brands
    .map((b) => ({ b, img: mediaProps(b.logo as Media, 'thumb') }))
    .filter((x) => x.img)
  const row = (hidden: boolean) =>
    logos.map(({ b, img }) => (
      <li
        key={`${b.id}-${hidden}`}
        className="mx-6 flex h-20 w-40 shrink-0 items-center justify-center"
        aria-hidden={hidden || undefined}
      >
        <Image
          src={img!.src}
          alt={hidden ? '' : `${b.name}${b.description ? ` – ${b.description}` : ''}`}
          width={160}
          height={64}
          className="max-h-14 w-auto object-contain opacity-70 grayscale transition hover:opacity-100 hover:grayscale-0"
        />
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
      <SectionHeader
        eyebrow={block.header?.eyebrow}
        heading={block.header?.heading}
        intro={block.header?.intro}
      />
      <BrandMarquee brands={brands} />
    </Section>
  )
}

/* ------------------------------------------------------------------ Projects (turanprojects.az "Layihələrimiz" slider) */
export async function ProjectsCarouselBlock({ block, ctx }: { block: B; ctx: BlockCtx }) {
  const projects = await itemsFor<Project>(block, 'projects', ctx.locale, {
    where:
      block.source === 'manual' ? undefined : { and: [published, { featured: { equals: true } }] },
  })
  const slides = projects
    .map((p) => {
      const image = mediaProps(p.cover as Media, 'large')
      return image
        ? { title: p.title, excerpt: p.excerpt, href: docPath('projects', p.slug, ctx.locale), image }
        : null
    })
    .filter(Boolean) as ProjectSlide[]
  const cta = resolveLink(block.cta, ctx.locale)
  return (
    <section id={blockTheme(block).id} className="overflow-hidden bg-white pt-5 pb-15 lg:pt-12 lg:pb-22">
      <div className="mx-auto max-w-[1340px] px-6 pt-12 sm:px-8 lg:px-12">
        <SectionHeader eyebrow={block.header?.eyebrow} heading={block.header?.heading} intro={block.header?.intro} />
        <ProjectsShowcase slides={slides} viewLabel={ctx.d.viewProject} />
        {cta && (
          <div className="mt-14 flex justify-center">
            <Link
              href={cta.href}
              className="inline-flex items-center justify-center rounded-full bg-[#122844] px-7 py-3.5 text-[14px] font-semibold text-white transition-opacity hover:opacity-90"
            >
              {cta.label}
            </Link>
          </div>
        )}
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ Before / After (turanprojects.az) */
export function BeforeAfterBlock({ block, ctx }: { block: B; ctx: BlockCtx }) {
  const pairs = (block.pairs ?? [])
    .map((p: any) => {
      const before = mediaProps(p.before as Media, 'large')
      const after = mediaProps(p.after as Media, 'large')
      return before && after ? { title: p.title, caption: p.caption, before, after } : null
    })
    .filter(Boolean) as BAPairT[]
  // The block's button label doubles as the picker prompt ("Digər tamamlanmış layihələrə baxın →")
  const cta = resolveLink(block.cta, ctx.locale)
  return (
    <section id={blockTheme(block).id} className="bg-white py-20">
      <div className="mx-auto max-w-[960px] px-6">
        <SectionHeader eyebrow={block.header?.eyebrow} heading={block.header?.heading} intro={block.header?.intro} />
        <BeforeAfterTuran
          pairs={pairs}
          prompt={cta?.label}
          labels={{ before: ctx.d.before, after: ctx.d.after, drag: ctx.d.drag, stages: ctx.d.baStages }}
        />
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ Services: tabs (template section 2) or grid */
export async function ServicesGridBlock({ block, ctx }: { block: B; ctx: BlockCtx }) {
  const services = await itemsFor<Service>(block, 'services', ctx.locale, { where: published })
  const cta = resolveLink(block.cta, ctx.locale)
  if (block.layout === 'overlay') {
    const hasHeader = block.header?.heading || block.header?.eyebrow
    return (
      <section
        id={blockTheme(block).id}
        className="bg-header-sticky py-[var(--section-y)] text-on-dark-muted [&_.sh-eyebrow]:text-primary [&_.sh-intro]:text-white/70 [&_h2]:text-white"
      >
        <div className="container-x">
          {hasHeader && (
            <SectionHeader
              eyebrow={block.header?.eyebrow}
              heading={block.header?.heading}
              intro={block.header?.intro}
            />
          )}
          <ul className="grid gap-[30px] md:grid-cols-2 lg:grid-cols-3">
            {services.map((s) => (
              <li key={s.id} data-reveal>
                <ServiceOverlayCard
                  href={docPath('services', s.slug, ctx.locale)}
                  title={s.title}
                  excerpt={s.excerpt}
                  image={mediaProps(s.cover as Media, 'card')}
                  cta={ctx.d.readMore}
                />
              </li>
            ))}
          </ul>
        </div>
      </section>
    )
  }
  if (block.layout === 'tabs') {
    return (
      <Section {...blockTheme(block)}>
        <SectionHeader
          eyebrow={block.header?.eyebrow}
          heading={block.header?.heading}
          intro={block.header?.intro}
        />
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
                      <Image
                        src={img.src}
                        alt={img.alt}
                        fill
                        sizes="(min-width:1024px) 600px, 100vw"
                        className="object-cover"
                      />
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
      <SectionHeader
        eyebrow={block.header?.eyebrow}
        heading={block.header?.heading}
        intro={block.header?.intro}
      />
      <ul className="grid gap-[30px] sm:grid-cols-2 lg:grid-cols-3">
        {services.map((s) => {
          const cat = (s.category ?? []).find((c) => typeof c === 'object') as Category | undefined
          return (
            <li key={s.id} data-reveal>
              <ServiceCard
                href={docPath('services', s.slug, ctx.locale)}
                title={s.title}
                excerpt={s.excerpt}
                image={mediaProps(s.cover as Media, 'card')}
                icon={cat?.iconKey ?? 'pool'}
              />
            </li>
          )
        })}
      </ul>
    </Section>
  )
}

/* ------------------------------------------------------------------ FAQ (template "Any Question?") */
export async function FAQBlock({ block, ctx }: { block: B; ctx: BlockCtx }) {
  const faqs = await itemsFor<Faq>(block, 'faqs', ctx.locale, {
    where: { showOnFaqPage: { equals: true } },
  })
  const [settings, forms] = await Promise.all([
    getGlobal<SiteSetting>('site-settings', ctx.locale, 0),
    block.showContactForm
      ? findDocs<Form>('forms', ctx.locale, { limit: 1, depth: 0, sort: 'createdAt' })
      : Promise.resolve([] as Form[]),
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
    // Template (Pooluxe contact page): centred badge + 48px H2, two columns of bordered accordions
    const half = Math.ceil(faqs.length / 2)
    const cols = [faqs.slice(0, half), faqs.slice(half)].filter((c) => c.length)
    return (
      <Section {...blockTheme(block)}>
        <SectionHeader
          eyebrow={block.header?.eyebrow || ctx.d.haveQuestions}
          heading={block.header?.heading}
          intro={block.header?.intro}
        />
        <div className="grid gap-5 p-2.5 md:grid-cols-2 md:gap-[30px]">
          {cols.map((col, ci) => (
            <div key={ci} className="flex flex-col gap-5">
              {col.map((f) => (
                <FaqItem key={f.id} faq={f} />
              ))}
            </div>
          ))}
        </div>
      </Section>
    )
  }
  return (
    <Section {...blockTheme(block)}>
      <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr]">
        <div data-reveal>
          <SectionHeader align="start" eyebrow={block.header?.eyebrow} heading={block.header?.heading} intro={block.header?.intro} className="mb-0" />
          <div className="mt-8 rounded-[var(--radius-card)] bg-soft p-8">
            <h3 className="text-xl">{ctx.d.stillQuestions}</h3>
            {phone && (
              <a
                href={`tel:${phone.replace(/[^\d+]/g, '')}`}
                className="mt-3 flex items-center gap-2 font-display text-xl font-bold text-heading hover:text-primary"
              >
                <UiIcon name="phone" className="text-primary" />
                {phone}
              </a>
            )}
            {forms[0] && (
              <div className="mt-6">
                <LeadForm
                  compact
                  formId={forms[0].id}
                  labels={{
                    name: ctx.d.name,
                    phone: ctx.d.phone,
                    message: ctx.d.message,
                    send: ctx.d.send,
                    sending: ctx.d.sending,
                    sent: ctx.d.sent,
                    error: ctx.d.formError,
                  }}
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
  const posts = await itemsFor<Post>(block, 'posts', ctx.locale, {
    where: published,
    sort: '-publishedAt',
  })
  const cta = resolveLink(block.cta, ctx.locale)
  const fmt = new Intl.DateTimeFormat(ctx.locale === 'az' ? 'az-Latn-AZ' : ctx.locale, {
    day: '2-digit',
    month: 'short',
  })
  return (
    <Section {...blockTheme(block)}>
      <SectionHeader
        align="split"
        eyebrow={block.header?.eyebrow}
        heading={block.header?.heading}
        intro={block.header?.intro}
        action={
          cta && (
            <Button href={cta.href} variant="dark">
              {cta.label}
            </Button>
          )
        }
      />
      <ul className="grid gap-8 md:grid-cols-3">
        {posts.map((p) => {
          const img = mediaProps(p.cover as Media, 'card')
          const href = docPath('posts', p.slug, ctx.locale)
          const date = p.publishedAt ? fmt.formatToParts(new Date(p.publishedAt)) : null
          return (
            <li key={p.id} data-reveal>
              <article className="group">
                <Link
                  href={href}
                  className="relative block aspect-[16/11] overflow-hidden rounded-[var(--radius-media)] bg-soft"
                  tabIndex={-1}
                  aria-hidden="true"
                >
                  {img && (
                    <Image
                      src={img.src}
                      alt={img.alt}
                      fill
                      sizes="(min-width:768px) 33vw, 100vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  )}
                  {date && (
                    <span className="absolute top-4 left-4 rounded-[var(--radius-sm)] bg-primary px-3 py-2 text-center leading-none text-on-primary">
                      <span className="block font-display text-xl font-extrabold">
                        {date.find((d) => d.type === 'day')?.value}
                      </span>
                      <span className="block text-xs font-semibold">
                        {date.find((d) => d.type === 'month')?.value}
                      </span>
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
