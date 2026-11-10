import Image from 'next/image'
import Link from 'next/link'

import { Gallery, type GalleryImg } from '@/components/inner/Gallery'
import { UiIcon } from '@/components/icons/UiIcon'
import { Button, Section, SectionHeader } from '@/components/ui/primitives'
import { findDocs, getGlobal } from '@/lib/data'
import { mediaProps } from '@/lib/media'
import { docPath, resolveLink } from '@/lib/urls'
import type { Category, Certificate, Form, Media, ServiceArea, SiteSetting, Team, Testimonial } from '@/payload-types'
import { EstimateForm } from './EstimateForm'
import { LeadForm } from './interactive'
import { blockTheme, type BlockCtx } from './shared'

/* eslint-disable @typescript-eslint/no-explicit-any */
type B = any

async function itemsFor<T>(block: B, collection: any, locale: BlockCtx['locale'], extra: { where?: any; depth?: number } = {}): Promise<T[]> {
  if (block.source === 'manual') return ((block.items ?? []) as (T | number)[]).filter((x) => typeof x === 'object') as T[]
  return findDocs<T>(collection, locale, { limit: block.limit ?? 12, depth: extra.depth ?? 1, where: extra.where })
}

const initials = (name: string) =>
  name
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0])
    .join('')

/* ------------------------------------------------------------------ Team (template "Team") */
export async function TeamBlock({ block, ctx }: { block: B; ctx: BlockCtx }) {
  const team = await itemsFor<Team>(block, 'team', ctx.locale)
  return (
    <Section {...blockTheme(block)}>
      <SectionHeader eyebrow={block.header?.eyebrow} heading={block.header?.heading} intro={block.header?.intro} />
      {/* Template "Team" card: 304×439 photo (16px radius, grows 1.1 on hover), white name box inset 19px */}
      <ul className="grid gap-[30px] sm:grid-cols-2 lg:grid-cols-4">
        {team.map((m) => {
          const img = mediaProps(m.photo as Media, 'card')
          return (
            <li key={m.id} className="group relative aspect-[304/439] overflow-hidden rounded-[16px] bg-soft" data-reveal>
              {img ? (
                <Image src={img.src} alt={img.alt || m.name} fill sizes="(min-width:1024px) 304px, 50vw" className="object-cover transition-transform duration-500 group-hover:scale-110" />
              ) : (
                <span className="absolute inset-0 grid place-items-center pb-24 font-display text-6xl font-extrabold text-primary/40" aria-hidden="true">
                  {initials(m.name)}
                </span>
              )}
              <div className="absolute inset-x-[19px] bottom-[19px] z-10 rounded-[8px] bg-white px-3 py-5 text-center">
                <h3 className="mb-[5px] text-[20px] leading-none tracking-normal">{m.name}</h3>
                <p className="leading-[30px]">{m.position}</p>
              </div>
            </li>
          )
        })}
      </ul>
    </Section>
  )
}

/* ------------------------------------------------------------------ Certificates (about page) */
export async function CertificatesBlock({ block, ctx }: { block: B; ctx: BlockCtx }) {
  const certs = await itemsFor<Certificate>(block, 'certificates', ctx.locale)
  const images = certs
    .map((c) => {
      const thumb = mediaProps(c.image as Media, 'card')
      const full = mediaProps(c.image as Media, 'hero')
      return thumb && full ? { src: thumb.src, alt: thumb.alt || c.title, full: full.src, caption: c.title } : null
    })
    .filter(Boolean) as GalleryImg[]
  if (!images.length) return null
  return (
    <Section {...blockTheme(block)}>
      <SectionHeader eyebrow={block.header?.eyebrow} heading={block.header?.heading} intro={block.header?.intro} />
      <div className="mx-auto max-w-4xl">
        <Gallery images={images} layout="grid" fit="contain" labels={{ close: ctx.d.close, prev: ctx.d.prev, next: ctx.d.next, open: ctx.d.openImage }} />
      </div>
    </Section>
  )
}

/* ------------------------------------------------------------------ Gallery (template "Gallery": filter + lightbox) */
export async function GalleryBlock({ block, ctx }: { block: B; ctx: BlockCtx }) {
  const items = await itemsFor<{ id: number; title: string; image: Media | number; category?: Category | number | null }>(block, 'gallery', ctx.locale, { depth: 1 })
  const cats = new Map<string, string>()
  const images = items
    .map((g) => {
      const thumb = mediaProps(g.image as Media, 'card')
      const full = mediaProps(g.image as Media, 'hero')
      const cat = typeof g.category === 'object' && g.category ? g.category : null
      if (cat) cats.set(String(cat.id), cat.shortName)
      return thumb && full ? { src: thumb.src, alt: thumb.alt || g.title, full: full.src, cat: cat ? String(cat.id) : undefined } : null
    })
    .filter(Boolean) as GalleryImg[]
  return (
    <Section {...blockTheme(block)}>
      <SectionHeader eyebrow={block.header?.eyebrow} heading={block.header?.heading} intro={block.header?.intro} />
      <Gallery
        images={images}
        layout="grid"
        filters={block.showFilters ? [...cats].map(([key, label]) => ({ key, label })) : undefined}
        labels={{ close: ctx.d.close, prev: ctx.d.prev, next: ctx.d.next, open: ctx.d.openImage, all: ctx.d.all, view: ctx.d.view }}
      />
    </Section>
  )
}

/* ------------------------------------------------------------------ Contact (template "Contact": info cards + form + map) */
export async function ContactFormBlock({ block, ctx }: { block: B; ctx: BlockCtx }) {
  const s = await getGlobal<SiteSetting>('site-settings', ctx.locale, 1)
  const form = typeof block.form === 'object' ? (block.form as Form) : (await findDocs<Form>('forms', ctx.locale, { limit: 1, depth: 0, sort: 'createdAt' }))[0]
  const tel = (n: string) => `tel:${n.replace(/[^\d+]/g, '')}`
  const hours = s.openingHours?.[0]
  const wa = s.whatsapp ? `https://wa.me/${s.whatsapp.replace(/\D/g, '')}` : null
  const link = 'transition-colors hover:text-primary'
  // Template "Contact": four centred info cards (80px navy icon circle, 18px title, 14/30 text)
  const cards = [
    {
      icon: 'pin',
      title: ctx.d.visitUs,
      body: (
        <>
          <p>{s.address}</p>
          {s.addressNote && <p>{s.addressNote}</p>}
          {s.mapUrl && (
            <a href={s.mapUrl} target="_blank" rel="noopener noreferrer" className="font-semibold text-heading hover:text-primary">
              {ctx.d.openMap} →
            </a>
          )}
        </>
      ),
    },
    {
      icon: 'phone',
      title: ctx.d.callUs,
      body: (
        <ul>
          {(s.phones ?? []).map((p) => (
            <li key={p.number}>
              {p.label && <span>{p.label}: </span>}
              <a href={tel(p.number)} className={link}>
                {p.number}
              </a>
            </li>
          ))}
        </ul>
      ),
    },
    {
      icon: 'chat',
      title: ctx.d.emailUs,
      body: (
        <>
          {s.email && (
            <a href={`mailto:${s.email}`} className={`break-all ${link}`}>
              {s.email}
            </a>
          )}
          {hours && (
            <p>
              {(hours.days ?? []).join(', ')}: {hours.opens}–{hours.closes}
            </p>
          )}
          {s.hoursNote && <p>{s.hoursNote}</p>}
        </>
      ),
    },
    ...(wa
      ? [
          {
            icon: 'chat',
            title: ctx.d.chatWithUs,
            body: (
              <>
                <p>{ctx.d.chatText}</p>
                {hours && (
                  <p>
                    {hours.opens}–{hours.closes}
                  </p>
                )}
                <a href={wa} target="_blank" rel="noopener noreferrer" className="text-base font-semibold text-heading hover:text-primary">
                  {ctx.d.startChat} →
                </a>
              </>
            ),
          },
        ]
      : []),
  ]

  return (
    <div id={blockTheme(block).id}>
      {block.showContactInfo !== false && (
        <section className="px-[15px]">
          <ul className="mx-auto grid max-w-[1304px] gap-[30px] py-[60px] sm:grid-cols-2 md:py-[100px] lg:grid-cols-4">
            {cards.map((c) => (
              <li key={c.title} data-reveal className="rounded-[10px] bg-soft p-[25px] text-center">
                <span className="mx-auto mb-5 flex size-20 items-center justify-center rounded-full bg-header-sticky text-[32px] text-white">
                  <UiIcon name={c.icon} />
                </span>
                <h2 className="mb-[14px] text-[18px] leading-none tracking-normal">{c.title}</h2>
                <div className="mx-auto max-w-[254px] text-[14px] leading-[30px]">{c.body}</div>
              </li>
            ))}
          </ul>
        </section>
      )}

      <section className="bg-soft px-[15px]">
        <div className="mx-auto flex max-w-[1304px] flex-col gap-5 py-[60px] md:py-[100px] lg:flex-row lg:items-center">
          <div className="flex-1 lg:max-w-[637px]" data-reveal>
            {/* template shows only the intro text here; the heading stays for document outline */}
            {block.header?.heading && <h2 className="sr-only">{block.header.heading}</h2>}
            <p className="mb-[35px] max-w-[421px] leading-[30px]">{block.header?.intro || ctx.d.contactIntro}</p>
            {form && (
              <LeadForm
                variant="template"
                withEmail
                formId={form.id}
                labels={{ name: ctx.d.name, phone: ctx.d.phone, email: ctx.d.emailField, message: ctx.d.message, send: ctx.d.send, sending: ctx.d.sending, sent: ctx.d.sent, error: ctx.d.formError }}
              />
            )}
          </div>
          {block.showMap !== false && s.lat && s.lng && (
            <div className="flex-1 p-2.5" data-reveal>
              <iframe
                title={ctx.d.mapTitle}
                src={`https://maps.google.com/maps?q=${s.lat},${s.lng}&z=14&hl=${ctx.locale}&output=embed`}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="block h-[380px] w-full rounded-[15px] border-0"
              />
            </div>
          )}
        </div>
      </section>
    </div>
  )
}

/* ------------------------------------------------------------------ Testimonials (template "Testimonial") */
export async function TestimonialsBlock({ block, ctx }: { block: B; ctx: BlockCtx }) {
  const items = await itemsFor<Testimonial>(block, 'testimonials', ctx.locale)
  if (!items.length) return null
  return (
    <Section {...blockTheme(block)}>
      <SectionHeader eyebrow={block.header?.eyebrow} heading={block.header?.heading} intro={block.header?.intro} />
      {/* Template "Testimonial" card: #F4F7FB, 15px radius, 30px padding; avatar + name + date row, stars, quote */}
      <ul className="grid gap-[30px] md:grid-cols-2 lg:grid-cols-3">
        {items.map((r) => {
          const img = mediaProps(r.photo as Media, 'thumb')
          const date = r.date ? new Intl.DateTimeFormat({ az: 'az-Latn-AZ', en: 'en-GB', ru: 'ru-RU' }[ctx.locale], { day: 'numeric', month: 'long', year: 'numeric' }).format(new Date(r.date)) : null
          return (
            <li key={r.id} className="rounded-[15px] bg-soft p-[30px]" data-reveal>
              <figure>
                <figcaption className="flex items-center gap-[15px]">
                  {img ? (
                    <Image src={img.src} alt={r.name} width={40} height={40} className="size-10 rounded-full object-cover" />
                  ) : (
                    <span className="grid size-10 shrink-0 place-items-center rounded-full bg-primary font-display text-sm font-bold text-heading">{initials(r.name)}</span>
                  )}
                  <span className="min-w-0 flex-1">
                    <span className="block font-display leading-[30px] font-bold text-heading">{r.name}</span>
                    {(date || r.role) && <span className="block text-[14px] leading-[20px]">{date ?? r.role}</span>}
                  </span>
                </figcaption>
                <p className="mt-6 text-[18px] tracking-[2px] text-star" aria-label={`${r.rating ?? 5}/5`}>
                  {'★'.repeat(r.rating ?? 5)}
                </p>
                <blockquote className="mt-3 leading-[30px]">“{r.quote}”</blockquote>
              </figure>
            </li>
          )
        })}
      </ul>
    </Section>
  )
}

/* ------------------------------------------------------------------ Service areas (links) */
export async function ServiceAreasBlock({ block, ctx }: { block: B; ctx: BlockCtx }) {
  const areas = await itemsFor<ServiceArea>(block, 'service-areas', ctx.locale, { where: { _status: { equals: 'published' } }, depth: 0 })
  return (
    <Section {...blockTheme(block)}>
      <SectionHeader eyebrow={block.header?.eyebrow} heading={block.header?.heading} intro={block.header?.intro} />
      <ul className="flex flex-wrap justify-center gap-3">
        {areas.map((a) => (
          <li key={a.id}>
            <Link href={docPath('service-areas', a.slug, ctx.locale)} className="inline-flex items-center gap-2 rounded-[var(--radius-badge)] bg-badge px-5 py-2.5 font-display font-bold text-heading transition-colors hover:bg-primary">
              <UiIcon name="pin" />
              {a.district}
            </Link>
          </li>
        ))}
      </ul>
    </Section>
  )
}

/* ------------------------------------------------------------------ Price table (price pages) */
export function PriceTableBlock({ block, ctx }: { block: B; ctx: BlockCtx }) {
  const rows = (block.rows ?? []) as { item: string; priceFrom?: number; priceTo?: number; unit?: string; note?: string; id?: string }[]
  const fmt = new Intl.NumberFormat(ctx.locale === 'az' ? 'az-Latn-AZ' : ctx.locale)
  const cta = resolveLink(block.cta, ctx.locale)
  return (
    <Section {...blockTheme(block)}>
      <SectionHeader eyebrow={block.header?.eyebrow} heading={block.header?.heading} intro={block.header?.intro} />
      <div className="mx-auto max-w-4xl overflow-x-auto rounded-[var(--radius-card)] ring-1 ring-border">
        <table className="w-full text-left">
          <tbody className="divide-y divide-border">
            {rows.map((r, i) => (
              <tr key={r.id ?? i} className="bg-white even:bg-soft">
                <th scope="row" className="px-6 py-4 font-display font-bold text-heading">
                  {r.item}
                  {r.note && <span className="block text-sm font-normal text-text">{r.note}</span>}
                </th>
                <td className="px-6 py-4 text-right font-display font-extrabold whitespace-nowrap text-heading">
                  {r.priceFrom != null && fmt.format(r.priceFrom)}
                  {r.priceTo != null && ` – ${fmt.format(r.priceTo)}`} <span className="text-sm font-semibold text-primary">{r.unit}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {block.disclaimer && <p className="mx-auto mt-4 max-w-4xl text-sm">{block.disclaimer}</p>}
      {cta && (
        <div className="mt-8 text-center">
          <Button href={cta.href}>{cta.label}</Button>
        </div>
      )}
    </Section>
  )
}

/* ------------------------------------------------------------------ Video */
export function VideoBlock({ block, ctx }: { block: B; ctx: BlockCtx }) {
  const poster = mediaProps(block.poster as Media, 'large')
  const file = typeof block.file === 'object' && block.file ? (block.file as Media) : null
  return (
    <Section {...blockTheme(block)}>
      <SectionHeader eyebrow={block.header?.eyebrow} heading={block.header?.heading} intro={block.header?.intro} />
      <div className="relative mx-auto aspect-video max-w-5xl overflow-hidden rounded-[var(--radius-media)] bg-dark">
        {block.youtubeId ? (
          <iframe
            title={block.header?.heading || ctx.d.watchVideo}
            src={`https://www.youtube-nocookie.com/embed/${block.youtubeId}`}
            loading="lazy"
            allow="accelerometer; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 size-full border-0"
          />
        ) : file?.url ? (
          <video controls preload="none" poster={poster?.src} className="absolute inset-0 size-full object-cover">
            <source src={file.url.replace(/^https?:\/\/[^/]+/, '')} type={file.mimeType ?? 'video/mp4'} />
          </video>
        ) : poster ? (
          <Image src={poster.src} alt={poster.alt} fill sizes="100vw" className="object-cover" />
        ) : null}
      </div>
    </Section>
  )
}

/* ------------------------------------------------------------------ Calculator placeholder (full wizard in Stage 7) */
const ESTIMATE_SIDE = {
  az: { eyebrow: 'Pulsuz qiymət təklifi', text: 'Dəqiq qiymət ölçüdən, materiallardan və əlavələrdən asılıdır. Mütəxəssisimiz obyektə pulsuz baxış keçirib yazılı təklif hazırlayır.', items: ['Pulsuz baxış və məsləhət', 'Fərdi layihələndirmə', 'Lisenziyalı tikinti', 'Konstruksiyaya 12 il yazılı zəmanət'] },
  en: { eyebrow: 'Free quote', text: 'The exact price depends on size, materials and extras. Our specialist visits your site for free and prepares a written quote.', items: ['Free site visit and consultation', 'Custom design', 'Licensed construction', '12-year written structural warranty'] },
  ru: { eyebrow: 'Бесплатный расчёт', text: 'Точная цена зависит от размера, материалов и дополнительных опций. Специалист бесплатно приедет на объект и подготовит письменное предложение.', items: ['Бесплатный выезд и консультация', 'Индивидуальный проект', 'Лицензированное строительство', '12 лет письменной гарантии на конструкцию'] },
} as const

/* Template "Cost Estimator": 856px form panel + 403px navy info card */
export async function CalculatorBlock({ block, ctx }: { block: B; ctx: BlockCtx }) {
  const [form, s] = await Promise.all([
    findDocs<Form>('forms', ctx.locale, { limit: 1, depth: 0, sort: 'createdAt' }).then((r) => r[0]),
    getGlobal<SiteSetting>('site-settings', ctx.locale, 0),
  ])
  const side = ESTIMATE_SIDE[ctx.locale]
  const phone = s.phones?.find((p) => p.primary)?.number ?? s.phones?.[0]?.number
  return (
    <section id={blockTheme(block).id} className="px-[15px]">
      <div className="mx-auto flex max-w-[1304px] flex-col gap-[45px] py-[60px] md:py-[100px] lg:flex-row lg:items-start">
        <div className="min-w-0 flex-1 lg:max-w-[856px]" data-reveal>
          {form && <EstimateForm locale={ctx.locale} formId={form.id} />}
        </div>
        <aside className="w-full shrink-0 rounded-[15px] bg-dark p-10 lg:w-[403px]" data-reveal>
          <SectionHeader dark align="start" eyebrow={block.header?.eyebrow || side.eyebrow} heading={block.header?.heading} className="mb-0" />
          <p className="mt-5 leading-[30px] text-white/80">{block.header?.intro || side.text}</p>
          <ul className="mt-[45px] border-t border-[rgb(222_226_230/0.5)] pt-[25px] pb-[30px]">
            {side.items.map((it) => (
              <li key={it} className="flex items-center gap-[5px] leading-[30px] text-white">
                <UiIcon name="check" className="shrink-0 text-[18px] text-primary" />
                {it}
              </li>
            ))}
          </ul>
          {phone && (
            <a href={`tel:${phone.replace(/[^\d+]/g, '')}`} className="font-display text-[26px] font-bold text-white transition-colors hover:text-primary">
              {phone}
            </a>
          )}
        </aside>
      </div>
    </section>
  )
}
