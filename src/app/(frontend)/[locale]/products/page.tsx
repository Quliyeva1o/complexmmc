import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

import { PageBanner } from '@/components/inner/InnerParts'
import { PageShell } from '@/components/layout/PageShell'
import { isLocale, type Locale, localeCodes, localePrefix } from '@/i18n/config'
import { t } from '@/i18n/dictionary'
import { findBySlug } from '@/lib/data'
import { breadcrumbLd, ldScript } from '@/lib/jsonld'
import { mediaProps } from '@/lib/media'
import { getProductCategories, money } from '@/lib/products'
import { buildMetadata } from '@/lib/seo'
import { docPath } from '@/lib/urls'
import type { Media, Page } from '@/payload-types'

/** /products — catalogue overview: one card per product category. */
export const revalidate = 3600
const paths = Object.fromEntries(localeCodes.map((l) => [l, `${localePrefix(l)}/products`])) as Record<Locale, string>

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }): Promise<Metadata> {
  const { locale } = await params
  if (!isLocale(locale)) return {}
  const page = await findBySlug<Page>('pages', 'products', locale, 0)
  return buildMetadata({ locale, paths, meta: page?.meta, fallbackTitle: page?.title ?? t(locale).products })
}

export default async function ProductsPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params
  const d = t(locale)
  const [page, cats] = await Promise.all([findBySlug<Page>('pages', 'products', locale, 1), getProductCategories(locale)])
  const home = localePrefix(locale) || '/'
  const title = page?.title ?? d.products
  return (
    <PageShell locale={locale} alternates={paths} overlayHeader>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: ldScript([breadcrumbLd([{ name: d.breadcrumbHome, path: home }, { name: title, path: paths[locale] }])]) }} />
      <PageBanner title={title} intro={page?.intro} image={page?.banner} crumbs={[{ name: d.breadcrumbHome, href: home }, { name: title }]} />

      <div className="px-[15px]">
        <ul className="mx-auto grid max-w-[1304px] gap-[30px] py-[60px] sm:grid-cols-2 md:py-[100px] lg:grid-cols-3">
          {cats.map(({ cat, count, min, cover }) => {
            const img = mediaProps(cover as Media, 'card')
            return (
              <li key={cat.id} data-reveal>
                <article className="group relative flex h-full flex-col overflow-hidden rounded-[16px] bg-card-tint">
                  <div className="relative aspect-[415/233] overflow-hidden bg-white">
                    {img && <Image src={img.src} alt="" fill sizes="(min-width:1024px) 415px, (min-width:640px) 50vw, 100vw" className="object-contain p-6 transition-transform duration-300 group-hover:scale-110" />}
                  </div>
                  <div className="flex flex-1 flex-col gap-3 px-6 pt-6 pb-7">
                    <h2 className="text-[22px] leading-[1.3] tracking-[-0.2px] md:text-[24px]">
                      <Link href={docPath('product-categories', cat.slug, locale)} className="after:absolute after:inset-0">
                        {cat.title}
                      </Link>
                    </h2>
                    {cat.excerpt && <p className="leading-[28px] text-[#5A6378]">{cat.excerpt}</p>}
                    <p className="mt-auto flex flex-wrap items-center gap-[15px] pt-2">
                      <span className="rounded-[25px] bg-white px-[15px] py-2 text-[14px] leading-[14px]">{d.productCount.replace('{n}', String(count))}</span>
                      {min != null && <span className="rounded-[25px] bg-white px-[15px] py-2 text-[14px] leading-[14px] font-semibold text-heading">{d.priceFrom.replace('{price}', money(min))}</span>}
                    </p>
                  </div>
                </article>
              </li>
            )
          })}
        </ul>
      </div>
    </PageShell>
  )
}
