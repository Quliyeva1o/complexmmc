import Image from 'next/image'
import Link from 'next/link'

import { CategoryStrip } from '@/components/home/CategoryStrip'
import { FaqItem } from '@/components/inner/InnerParts'
import { AccordionGroup } from '@/components/ui/Accordion'
import { UiIcon } from '@/components/icons/UiIcon'
import { Button, cx, Section, SectionHeader, sectionTone } from '@/components/ui/primitives'
import { ServiceCard } from '@/components/ui/ServiceCard'
import { ServiceOverlayCard } from '@/components/ui/ServiceOverlayCard'
import { findDocs, getGlobal } from '@/lib/data'
import { faqLd, ldScript } from '@/lib/jsonld'
import { mediaProps } from '@/lib/media'
import { docPath, resolveLink } from '@/lib/urls'
import type {
  BeforeAfter as BeforeAfterDoc,
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
  const { id } = blockTheme(block, ctx)
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
    <section id={id} aria-label={h?.eyebrow ?? undefined} className={cx(sectionTone(ctx.tone), 'py-[var(--section-y)]')}>
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
                className={`group relative overflow-hidden rounded-[var(--radius-card)] bg-[#0B1B2B] ${cell[i % 4]}`}
              >
                <figure className="relative m-0 size-full">
                  {img && (
                    <Image
                      src={img.src}
                      alt={img.alt}
                      fill
                      sizes="(max-width: 640px) 100vw, 50vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  )}
                  <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_top,rgba(11,27,43,0.88)_0%,rgba(11,27,43,0.25)_48%,rgba(11,27,43,0)_70%)]" />
                  {r.type && (
                    <span className="absolute top-4 left-4 rounded-full border border-white/30 bg-white/16 px-2.5 py-1 text-xs font-semibold tracking-[0.1em] text-white uppercase backdrop-blur-md">
                      {r.type}
                    </span>
                  )}
                  <figcaption className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
                    <span className="mb-3 block h-[2px] w-8 bg-primary transition-all duration-500 group-hover:w-16" />
                    <h3
                      className={`m-0 text-white ${big ? 'text-h3' : 'text-h4'}`}
                    >
                      {r.name}
                    </h3>
                    {r.subtitle && (
                      <p className="m-0 mt-1 text-sm text-white/78">
                        {r.subtitle}
                      </p>
                    )}
                  </figcaption>
                </figure>
                {href && (
                  <Link
                    href={href}
                    className="absolute inset-0 rounded-[var(--radius-card)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-primary-strong)]"
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
    <Section {...blockTheme(block, ctx)}>
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
    <section id={blockTheme(block, ctx).id} className={cx('overflow-hidden py-[var(--section-y)]', sectionTone(ctx.tone))}>
      <div className="container-x">
        <SectionHeader eyebrow={block.header?.eyebrow} heading={block.header?.heading} intro={block.header?.intro} />
        <ProjectsShowcase slides={slides} viewLabel={ctx.d.viewProject} />
        {cta && (
          <div className="mt-14 flex justify-center">
            <Button href={cta.href} variant="dark">
              {cta.label}
            </Button>
          </div>
        )}
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ Before / After (turanprojects.az) */
export async function BeforeAfterBlock({ block, ctx }: { block: B; ctx: BlockCtx }) {
  // pairs come from the "Əvvəl & Sonra" collection; the block's own (old) list still wins if filled
  const source: any[] = block.pairs?.length
    ? block.pairs
    : await findDocs<BeforeAfterDoc>('before-after', ctx.locale, { where: { showOnHome: { equals: true } }, depth: 1, limit: 20 })
  const pairs = source
    .map((p: any) => {
      const before = mediaProps(p.before as Media, 'large')
      const after = mediaProps(p.after as Media, 'large')
      return before && after ? { title: p.title, caption: p.caption, before, after } : null
    })
    .filter(Boolean) as BAPairT[]
  // The block's button label doubles as the picker prompt ("Digər tamamlanmış layihələrə baxın →")
  const cta = resolveLink(block.cta, ctx.locale)
  return (
    <section id={blockTheme(block, ctx).id} className={cx(sectionTone(ctx.tone), 'py-[var(--section-y)]')}>
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
/** One card shape for the services section, whether it lists services or service lines (categories). */
type SvcCard = { id: string; title: string; label: string; excerpt?: string | null; cover: unknown; href: string; points: string[]; icon: string }

/** Section headings of a category page (minus questions, reference and price ones): a real summary of what it covers. */
function topicsOf(body: any): string[] {
  const out: string[] = []
  const walk = (n: any) => {
    if (!n) return
    if (n.type === 'heading' && n.tag === 'h2') out.push((n.children ?? []).map((c: any) => c.text ?? '').join('').trim())
    ;(n.children ?? []).forEach(walk)
  }
  walk(body?.root)
  // statements only ("Sauna Üçün Material Seçimi"), not questions or reference / price headings
  const topics = out.filter((t) => t && !t.endsWith('?') && !/layihələrimiz|tamamladığımız|referans|^qiymət$|our projects|completed|reference|^price$|наши проекты|выполненные|референс|^цена$/i.test(t))
  return topics.length >= 2 ? topics.slice(0, 4) : []
}

async function serviceCards(block: B, ctx: BlockCtx): Promise<SvcCard[]> {
  if (block.show === 'categories') {
    const picked = ((block.categoryItems ?? []) as (Category | number)[]).map((c) => (typeof c === 'object' ? c.id : c))
    const cats = await findDocs<Category>('categories', ctx.locale, {
      where: picked.length ? { and: [published, { id: { in: picked } }] } : published,
      depth: 1,
      limit: 50,
    })
    const ordered = picked.length ? picked.map((id) => cats.find((c) => c.id === id)).filter(Boolean) as Category[] : cats
    return ordered.map((c) => ({
      id: 'c' + c.id,
      title: c.title,
      label: c.shortName || c.title,
      excerpt: c.excerpt,
      cover: c.cover,
      href: docPath('categories', c.slug, ctx.locale),
      points: topicsOf(c.body),
      icon: c.iconKey ?? 'pool',
    }))
  }
  const services = await itemsFor<Service>(block, 'services', ctx.locale, { where: published })
  return services.map((s) => {
    const cat = (s.category ?? []).find((c) => typeof c === 'object') as Category | undefined
    return {
      id: String(s.id),
      title: s.title,
      label: s.title.split(':')[0],
      excerpt: s.excerpt,
      cover: s.cover,
      href: docPath('services', s.slug, ctx.locale),
      points: (s.features ?? []).slice(0, 4).map((f) => f.title),
      icon: cat?.iconKey ?? 'pool',
    }
  })
}

export async function ServicesGridBlock({ block, ctx }: { block: B; ctx: BlockCtx }) {
  const cards = await serviceCards(block, ctx)
  const cta = resolveLink(block.cta, ctx.locale)
  const header = (
    <SectionHeader eyebrow={block.header?.eyebrow} heading={block.header?.heading} intro={block.header?.intro} />
  )
  const ctaRow = cta && (
    <div className="mt-10 text-center">
      <Button href={cta.href} variant="outline">
        {cta.label}
      </Button>
    </div>
  )
  if (block.layout === 'overlay') {
    return (
      <section id={blockTheme(block, ctx).id} className={cx('py-[var(--section-y)]', sectionTone(ctx.tone))}>
        <div className="container-x">
          {(block.header?.heading || block.header?.eyebrow) && header}
          <ul className="grid gap-[var(--grid-gap)] md:grid-cols-2 lg:grid-cols-3">
            {cards.map((c) => (
              <li key={c.id} data-reveal>
                <ServiceOverlayCard href={c.href} title={c.title} excerpt={c.excerpt} image={mediaProps(c.cover as Media, 'card')} cta={ctx.d.readMore} />
              </li>
            ))}
          </ul>
          {ctaRow}
        </div>
      </section>
    )
  }
  if (block.layout === 'tabs') {
    return (
      <Section {...blockTheme(block, ctx)}>
        {header}
        <PillTabs
          tabs={cards.map((c) => {
            const img = mediaProps(c.cover as Media, 'large')
            return {
              id: c.id,
              label: c.label,
              content: (
                <div className="grid items-center gap-8 rounded-[var(--radius-card)] border border-border bg-white p-6 md:p-10 lg:grid-cols-2 lg:gap-12">
                  <div>
                    <h3>{c.title}</h3>
                    {c.excerpt && <p className="mt-4">{c.excerpt}</p>}
                    {c.points.length > 0 && (
                      <ul className="mt-6 grid gap-3">
                        {c.points.map((p) => (
                          <li key={p} className="flex gap-3 text-card text-heading">
                            <UiIcon name="check" className="mt-1 shrink-0 text-primary-strong" />
                            {p}
                          </li>
                        ))}
                      </ul>
                    )}
                    <Button href={c.href} className="mt-8">
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
        {ctaRow}
      </Section>
    )
  }
  return (
    <Section {...blockTheme(block, ctx)}>
      {header}
      <ul className="grid gap-[var(--grid-gap)] sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((c) => (
          <li key={c.id} data-reveal>
            <ServiceCard href={c.href} title={c.title} excerpt={c.excerpt} image={mediaProps(c.cover as Media, 'card')} icon={c.icon} />
          </li>
        ))}
      </ul>
      {ctaRow}
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
  // FAQPage structured data for every FAQ section (home, contact, FAQ page, …)
  const ld = faqs.length ? <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: ldScript([faqLd(faqs)!]) }} /> : null
  // one open answer at a time, smooth height animation (PLAN.md §11 step 7)
  const list = (
    <AccordionGroup defaultOpen={faqs[0] ? String(faqs[0].id) : null} className="divide-y divide-border border-y border-border">
      {faqs.map((f) => (
        <FaqItem key={f.id} faq={f} variant="line" />
      ))}
    </AccordionGroup>
  )
  if (!block.showContactForm) {
    // Template (Pooluxe contact page): centred badge + 48px H2, two columns of bordered accordions
    const half = Math.ceil(faqs.length / 2)
    const cols = [faqs.slice(0, half), faqs.slice(half)].filter((c) => c.length)
    return (
      <Section {...blockTheme(block, ctx)}>
        {ld}
        <SectionHeader
          eyebrow={block.header?.eyebrow || (block.header?.heading ? ctx.d.haveQuestions : undefined)}
          heading={block.header?.heading}
          intro={block.header?.intro}
        />
        <AccordionGroup defaultOpen={faqs[0] ? String(faqs[0].id) : null} className="grid items-start gap-3 md:grid-cols-2 md:gap-[var(--grid-gap)]">
          {cols.map((col, ci) => (
            <div key={ci} className="flex flex-col gap-3">
              {col.map((f) => (
                <FaqItem key={f.id} faq={f} />
              ))}
            </div>
          ))}
        </AccordionGroup>
      </Section>
    )
  }
  return (
    <Section {...blockTheme(block, ctx)}>
        {ld}
      <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr]">
        <div data-reveal>
          <SectionHeader align="start" eyebrow={block.header?.eyebrow} heading={block.header?.heading} intro={block.header?.intro} className="mb-0" />
          <div className="mt-8 rounded-[var(--radius-card)] bg-soft p-[var(--card-pad)] md:p-8">
            <h3>{ctx.d.stillQuestions}</h3>
            {phone && (
              <a
                href={`tel:${phone.replace(/[^\d+]/g, '')}`}
                className="mt-3 flex items-center gap-2 font-display text-lg font-semibold text-heading hover:text-primary-strong"
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
    <Section {...blockTheme(block, ctx)}>
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
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  )}
                  {date && (
                    <span className="absolute top-4 left-4 rounded-[var(--radius-sm)] bg-primary px-3 py-2 text-center leading-none text-on-primary">
                      <span className="block font-display text-lg font-bold">
                        {date.find((d) => d.type === 'day')?.value}
                      </span>
                      <span className="block text-xs font-semibold">
                        {date.find((d) => d.type === 'month')?.value}
                      </span>
                    </span>
                  )}
                </Link>
                <h3 className="mt-5 text-h4">
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
