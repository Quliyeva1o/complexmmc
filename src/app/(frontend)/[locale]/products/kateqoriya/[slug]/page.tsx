import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import { UiIcon } from '@/components/icons/UiIcon'
import { PageBanner } from '@/components/inner/InnerParts'
import { PageShell } from '@/components/layout/PageShell'
import { ProductCard } from '@/components/ui/ProductCard'
import { cx } from '@/components/ui/primitives'
import { isLocale, type Locale, localeCodes, localePrefix } from '@/i18n/config'
import { t } from '@/i18n/dictionary'
import { findBySlug, findDocs, getAlternates } from '@/lib/data'
import { breadcrumbLd, ldScript } from '@/lib/jsonld'
import { mediaProps } from '@/lib/media'
import { getProductCategories, getProducts, money } from '@/lib/products'
import { buildMetadata } from '@/lib/seo'
import { docPath } from '@/lib/urls'
import type { Media, ProductCategory } from '@/payload-types'

/** /products/kateqoriya/{slug} — category nav (service-page style) + product grid. */
export const revalidate = 3600
export const dynamicParams = true

export async function generateStaticParams() {
  const out: { locale: string; slug: string }[] = []
  for (const locale of localeCodes) for (const c of await findDocs<ProductCategory>('product-categories', locale, { depth: 0, limit: 100 })) if (c.slug) out.push({ locale, slug: c.slug })
  return out
}

type P = { params: Promise<{ locale: Locale; slug: string }> }
const toPath = (slug: string, l: Locale) => docPath('product-categories', slug, l)

export async function generateMetadata({ params }: P): Promise<Metadata> {
  const { locale, slug } = await params
  if (!isLocale(locale)) return {}
  const c = await findBySlug<ProductCategory>('product-categories', decodeURIComponent(slug), locale, 1)
  if (!c) return {}
  return buildMetadata({ locale, paths: await getAlternates('product-categories', c.id, toPath), meta: c.meta, fallbackTitle: c.title, fallbackDescription: c.excerpt })
}

export default async function ProductCategoryPage({ params }: P) {
  const { locale, slug } = await params
  const d = t(locale)
  const cat = await findBySlug<ProductCategory>('product-categories', decodeURIComponent(slug), locale, 1)
  if (!cat) notFound()
  const [all, cats, alternates] = await Promise.all([getProducts(locale), getProductCategories(locale), getAlternates('product-categories', cat.id, toPath)])
  const products = all.filter((p) => (typeof p.category === 'object' ? p.category.id : p.category) === cat.id)
  const home = localePrefix(locale) || '/'
  const productsPath = `${localePrefix(locale)}/products`
  const path = toPath(cat.slug!, locale)

  return (
    <PageShell locale={locale} alternates={alternates} overlayHeader>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: ldScript([breadcrumbLd([{ name: d.breadcrumbHome, path: home }, { name: d.products, path: productsPath }, { name: cat.title, path }])]) }} />
      <PageBanner title={cat.title} intro={cat.excerpt} crumbs={[{ name: d.breadcrumbHome, href: home }, { name: d.products, href: productsPath }, { name: cat.title }]} />

      <div className="px-[15px]">
        <div className="mx-auto flex max-w-[1304px] flex-col gap-[45px] py-[60px] md:py-[100px] lg:flex-row">
          <aside className="w-full shrink-0 lg:w-[286px]">
            <nav aria-label={d.productCategories}>
              <ul className="flex flex-col gap-[15px]">
                {cats.map(({ cat: c, count }) => {
                  const href = toPath(c.slug!, locale)
                  const on = c.id === cat.id
                  return (
                    <li key={c.id}>
                      <Link
                        href={href}
                        aria-current={on ? 'page' : undefined}
                        className={cx(
                          'flex min-h-[60px] items-center justify-between gap-2 rounded-[10px] px-[25px] py-[15px] font-display text-[17px] leading-[1.35] font-bold transition-colors duration-300',
                          on ? 'bg-header-sticky text-white' : 'bg-soft text-heading hover:bg-header-sticky hover:text-white',
                        )}
                      >
                        <span>{c.title}</span>
                        <span className={cx('shrink-0 text-[13px] font-semibold', on ? 'text-white/70' : 'text-text')}>{count}</span>
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </nav>
          </aside>

          <div className="min-w-0 flex-1">
            <ul className="grid gap-[30px] sm:grid-cols-2 xl:grid-cols-3">
              {products.map((p) => (
                <li key={p.id} data-reveal>
                  <ProductCard
                    href={docPath('products', p.slug, locale)}
                    title={p.title}
                    image={mediaProps((p.images?.[0] ?? null) as Media, 'card')}
                    price={p.priceFrom ? d.priceFrom.replace('{price}', money(p.priceFrom)) : d.askPrice}
                  />
                </li>
              ))}
            </ul>
            <p className="mt-10 flex items-start gap-2 text-[14px] leading-6">
              <UiIcon name="check" className="mt-1 shrink-0 text-primary" />
              {d.catalogNote}
            </p>
          </div>
        </div>
      </div>
    </PageShell>
  )
}
