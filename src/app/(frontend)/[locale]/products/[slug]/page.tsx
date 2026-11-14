import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import { UiIcon } from '@/components/icons/UiIcon'
import { PageBanner } from '@/components/inner/InnerParts'
import { PageShell } from '@/components/layout/PageShell'
import { ProductCard } from '@/components/ui/ProductCard'
import { Button, SectionHeader } from '@/components/ui/primitives'
import { isLocale, type Locale, localeCodes, localePrefix } from '@/i18n/config'
import { t } from '@/i18n/dictionary'
import { findBySlug, findDocs, getAlternates, getGlobal } from '@/lib/data'
import { breadcrumbLd, ldScript, productLd } from '@/lib/jsonld'
import { mediaProps } from '@/lib/media'
import { getProducts, money } from '@/lib/products'
import { buildMetadata } from '@/lib/seo'
import { docPath } from '@/lib/urls'
import type { Media, Product, ProductCategory, SiteSetting } from '@/payload-types'

/** /products/{slug} — product photo + info, size/price table, size matrix (covers), specs, similar products. */
export const revalidate = 3600
export const dynamicParams = true

export async function generateStaticParams() {
  const out: { locale: string; slug: string }[] = []
  for (const locale of localeCodes) for (const p of await findDocs<Product>('products', locale, { where: { _status: { equals: 'published' } }, depth: 0, limit: 1000 })) if (p.slug) out.push({ locale, slug: p.slug })
  return out
}

type P = { params: Promise<{ locale: Locale; slug: string }> }
const toPath = (slug: string, l: Locale) => docPath('products', slug, l)
type Matrix = { widths: number[]; rows: { length: number; prices: number[] }[] }

export async function generateMetadata({ params }: P): Promise<Metadata> {
  const { locale, slug } = await params
  if (!isLocale(locale)) return {}
  const p = await findBySlug<Product>('products', decodeURIComponent(slug), locale, 1)
  if (!p) return {}
  const d = t(locale)
  const cat = typeof p.category === 'object' ? p.category : null
  const desc = p.excerpt ?? `${p.title}${cat ? ` — ${cat.title}` : ''}${p.priceFrom ? `. ${d.priceFrom.replace('{price}', money(p.priceFrom))}` : ''}.`
  return buildMetadata({ locale, paths: await getAlternates('products', p.id, toPath), meta: { ...p.meta, image: p.meta?.image ?? p.images?.[0] }, fallbackTitle: p.title, fallbackDescription: desc })
}

export default async function ProductPage({ params }: P) {
  const { locale, slug } = await params
  const d = t(locale)
  const p = await findBySlug<Product>('products', decodeURIComponent(slug), locale, 1)
  if (!p) notFound()
  const [all, alternates, settings] = await Promise.all([getProducts(locale), getAlternates('products', p.id, toPath), getGlobal<SiteSetting>('site-settings', locale, 0)])
  const cat = (typeof p.category === 'object' ? p.category : null) as ProductCategory | null
  const similar = all.filter((x) => x.id !== p.id && (typeof x.category === 'object' ? x.category.id : x.category) === cat?.id).slice(0, 4)
  const img = mediaProps((p.images?.[0] ?? null) as Media, 'large')
  const variants = (p.variants ?? []).filter((v) => v.price)
  const matrix = (p.priceMatrix ?? null) as Matrix | null
  const prices = [...variants.map((v) => v.price!), ...(matrix?.rows.flatMap((r) => r.prices) ?? [])].filter((x) => x > 0)
  const path = toPath(p.slug!, locale)
  const home = localePrefix(locale) || '/'
  const productsPath = `${localePrefix(locale)}/products`
  const catPath = cat ? docPath('product-categories', cat.slug, locale) : productsPath
  const wa = settings.whatsapp ? `https://wa.me/${settings.whatsapp.replace(/\D/g, '')}?text=${encodeURIComponent(p.title)}` : null
  const quoteHref = { az: '/qiymet-hesabla', en: '/en/price-calculator', ru: '/ru/kalkulyator-stoimosti' }[locale]

  const ld = [
    productLd({ name: p.title, description: p.excerpt, path, image: img?.src, sku: p.sku, category: cat?.title, low: prices.length ? Math.min(...prices) : null, high: prices.length ? Math.max(...prices) : null, count: prices.length || 1 }),
    breadcrumbLd([{ name: d.breadcrumbHome, path: home }, { name: d.products, path: productsPath }, ...(cat ? [{ name: cat.title, path: catPath }] : []), { name: p.title, path }]),
  ]

  return (
    <PageShell locale={locale} alternates={alternates} overlayHeader>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: ldScript(ld) }} />
      <PageBanner small title={p.title} crumbs={[{ name: d.breadcrumbHome, href: home }, { name: d.products, href: productsPath }, ...(cat ? [{ name: cat.title, href: catPath }] : []), { name: p.title }]} />

      <div className="container-x">
        <div className="grid gap-[45px] py-[60px] md:py-[100px] lg:grid-cols-2">
          <div className="relative aspect-square overflow-hidden rounded-[var(--radius-card)] bg-soft lg:sticky lg:top-[110px] lg:self-start">
            {img && <Image src={img.src} alt={img.alt} fill priority sizes="(min-width:1024px) 630px, 100vw" className="object-contain p-8" />}
          </div>

          <div className="flex min-w-0 flex-col gap-6">
            <SectionHeader align="start" eyebrow={cat?.title} heading={p.title} intro={p.excerpt} className="mb-0" />
            <dl className="flex flex-wrap gap-[15px]">
              {prices.length > 0 && (
                <div className="rounded-full bg-card-tint px-5 py-2.5 font-display text-h4 text-heading">
                  <dt className="sr-only">{d.priceCol}</dt>
                  <dd>{d.priceFrom.replace('{price}', money(Math.min(...prices)))}</dd>
                </div>
              )}
              {p.origin && (
                <div className="rounded-full bg-soft px-[15px] py-2.5 text-sm">
                  <dt className="inline">{d.origin}: </dt>
                  <dd className="inline font-semibold text-heading">{p.origin}</dd>
                </div>
              )}
              {p.inStock && (
                <div className="flex items-center gap-1.5 rounded-full bg-soft px-[15px] py-2.5 text-sm font-semibold text-heading">
                  <UiIcon name="check" className="text-primary" />
                  <dd>{d.inStock}</dd>
                </div>
              )}
            </dl>

            {variants.length > 0 && (
              <section>
                <h2 className="mb-3 text-h3">{d.variantsTitle}</h2>
                <table className="w-full overflow-hidden rounded-[var(--radius-sm)] text-left">
                  <thead className="bg-dark text-white">
                    <tr>
                      <th className="px-4 py-3 text-sm font-semibold">{d.sizeCol}</th>
                      <th className="px-4 py-3 text-right text-sm font-semibold">{d.priceCol}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {variants.map((v, i) => (
                      <tr key={v.id ?? i} className="border-b border-[#E5E7EB] odd:bg-soft">
                        <td className="px-4 py-3 leading-6">{v.label}</td>
                        <td className="px-4 py-3 text-right font-semibold whitespace-nowrap text-heading">{money(v.price)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </section>
            )}

            {matrix && matrix.rows.length > 0 && (
              <section>
                <h2 className="mb-3 text-h3">{d.matrixTitle}</h2>
                <div className="overflow-x-auto rounded-[var(--radius-sm)] ring-1 ring-[#E5E7EB]">
                  <table className="w-full text-center text-sm">
                    <thead className="bg-dark text-white">
                      <tr>
                        <th className="sticky left-0 bg-dark px-3 py-2.5">↓ × →</th>
                        {matrix.widths.map((w) => (
                          <th key={w} className="px-3 py-2.5 font-semibold">
                            {w}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {matrix.rows.map((r) => (
                        <tr key={r.length} className="border-b border-[#E5E7EB] odd:bg-soft">
                          <th className="sticky left-0 bg-inherit px-3 py-2 font-semibold text-heading">{r.length}</th>
                          {r.prices.map((x, i) => (
                            <td key={i} className="px-3 py-2 whitespace-nowrap">
                              {money(x)}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>
            )}

            {(p.specs ?? []).length > 0 && (
              <section>
                <h2 className="mb-3 text-h3">{d.specsTitle}</h2>
                <dl className="divide-y divide-[#E5E7EB] rounded-[var(--radius-sm)] ring-1 ring-[#E5E7EB]">
                  {p.specs!.map((s) => (
                    <div key={s.id ?? s.key} className="flex justify-between gap-6 px-4 py-3">
                      <dt>{s.key}</dt>
                      <dd className="text-right font-semibold text-heading">{s.value}</dd>
                    </div>
                  ))}
                </dl>
              </section>
            )}

            <div className="flex flex-wrap items-center gap-4 rounded-[var(--radius-card)] bg-dark p-6 md:p-8">
              <p className="w-full font-display text-h4 text-white">{d.orderProduct}</p>
              {wa && (
                <Button href={wa} target="_blank">
                  {d.whatsapp}
                </Button>
              )}
              <Link href={quoteHref} className="font-semibold text-primary hover:underline">
                {d.quote} →
              </Link>
            </div>
            <p className="text-sm">{d.catalogNote}</p>
          </div>
        </div>
      </div>

      {similar.length > 0 && (
        <section className="bg-soft">
          <div className="container-x py-[60px] md:py-[100px]">
            <SectionHeader heading={d.similarProducts} />
            <ul className="grid gap-[30px] sm:grid-cols-2 lg:grid-cols-4">
              {similar.map((x) => (
                <li key={x.id}>
                  <ProductCard href={docPath('products', x.slug, locale)} title={x.title} image={mediaProps((x.images?.[0] ?? null) as Media, 'card')} price={x.priceFrom ? d.priceFrom.replace('{price}', money(x.priceFrom)) : d.askPrice} />
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}
    </PageShell>
  )
}
