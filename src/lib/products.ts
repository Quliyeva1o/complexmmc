import type { Locale } from '@/i18n/config'
import { findDocs } from '@/lib/data'
import type { Product, ProductCategory } from '@/payload-types'

const published = { _status: { equals: 'published' } } as const

/** All published products of the catalogue (≈300, cached by the data layer). */
export const getProducts = (locale: Locale) => findDocs<Product>('products', locale, { where: published, depth: 1, limit: 1000, sort: 'priceFrom' })

/** Product categories that actually have products, with count, lowest price and a cover image. */
export async function getProductCategories(locale: Locale) {
  const [cats, products] = await Promise.all([findDocs<ProductCategory>('product-categories', locale, { depth: 0, limit: 100, sort: 'createdAt' }), getProducts(locale)])
  return cats
    .map((c) => {
      const items = products.filter((p) => (typeof p.category === 'object' ? p.category.id : p.category) === c.id)
      const prices = items.map((p) => p.priceFrom ?? 0).filter((x) => x > 0)
      return { cat: c, count: items.length, min: prices.length ? Math.min(...prices) : null, cover: items.find((p) => p.images?.length)?.images?.[0] ?? null }
    })
    .filter((x) => x.count > 0)
}

/** "1 312,03 ₼" — space-grouped, up to 2 decimals. */
export const money = (n: number | null | undefined) => (n == null ? '' : `${new Intl.NumberFormat('ru-RU', { maximumFractionDigits: 2 }).format(n)} ₼`)
