import { unstable_cache } from 'next/cache'
import type { CollectionSlug, GlobalSlug, Where } from 'payload'

import type { Locale } from '@/i18n/config'
import { payloadClient } from './payload'

/**
 * Cached reads. Cache tags match the admin revalidation hooks (src/hooks/revalidate.ts):
 * saving a doc in admin invalidates its collection tag → only affected pages re-render (ISR).
 */

export const getGlobal = <T = Record<string, unknown>>(slug: GlobalSlug, locale: Locale, depth = 1) =>
  unstable_cache(
    async () => (await payloadClient()).findGlobal({ slug, locale, depth }) as Promise<T>,
    ['global', slug, locale, String(depth)],
    { tags: [`global:${slug}`] },
  )()

export const findDocs = <T = Record<string, unknown>>(
  collection: CollectionSlug,
  locale: Locale,
  opts: { where?: Where; limit?: number; sort?: string; depth?: number } = {},
) =>
  unstable_cache(
    async () => {
      const res = await (await payloadClient()).find({
        collection,
        locale,
        where: opts.where,
        limit: opts.limit ?? 100,
        sort: opts.sort ?? '_order',
        depth: opts.depth ?? 1,
        pagination: false,
      })
      return res.docs as T[]
    },
    ['docs', collection, locale, JSON.stringify(opts)],
    { tags: [collection] },
  )()

export const findBySlug = async <T = Record<string, unknown>>(collection: CollectionSlug, slug: string, locale: Locale, depth = 2) =>
  (await findDocs<T>(collection, locale, { where: { slug: { equals: slug } }, limit: 1, depth, sort: 'createdAt' }))[0] ?? null

type AllLocaleDoc = {
  id: number
  slug?: Record<string, string | null> | null
  title?: Record<string, string | null> | null
  meta?: { title?: Record<string, string | null> | null } | Record<string, { title?: string | null } | null> | null
}
const LOCALE_SELECT = { slug: true, title: true, meta: { title: true } } as never

const metaTitle = (doc: AllLocaleDoc, l: string) => {
  const m = doc.meta as Record<string, unknown> | null | undefined
  if (!m) return null
  const t = m.title as Record<string, string | null> | undefined
  if (t && typeof t === 'object') return t[l] ?? null // localized field inside the group
  return ((m[l] as { title?: string | null } | undefined)?.title ?? null) // localized group
}

/**
 * Locales in which a document really exists: it has its own slug, and it is not an untranslated
 * copy of the AZ version (same slug + title + SEO title). Those copies came from AZ-only pages of
 * the old site; listing them would create duplicate content in other languages.
 */
export function realLocales(doc: AllLocaleDoc): Partial<Record<Locale, string>> {
  const out: Partial<Record<Locale, string>> = {}
  const az = { slug: doc.slug?.az, title: doc.title?.az, meta: metaTitle(doc, 'az') }
  for (const [l, s] of Object.entries(doc.slug ?? {})) {
    if (!s) continue
    const copy = l !== 'az' && s === az.slug && doc.title?.[l] === az.title && metaTitle(doc, l) === az.meta
    if (!copy) out[l as Locale] = s
  }
  return out
}

/** Every published document of a collection with its real per-locale slugs (sitemap). */
export const findAllLocaleSlugs = (collection: CollectionSlug, publishedOnly = true) =>
  unstable_cache(
    async () => {
      const res = await (await payloadClient()).find({ collection, locale: 'all', depth: 0, limit: 2000, pagination: false, where: publishedOnly ? { _status: { equals: 'published' } } : undefined, select: LOCALE_SELECT })
      return (res.docs as unknown as AllLocaleDoc[]).map((d) => ({ id: d.id, slugs: realLocales(d) }))
    },
    ['all-locale-slugs', collection, String(publishedOnly)],
    { tags: [collection] },
  )()

/** The same document's path in every locale where it really exists (hreflang + language switch). */
export const getAlternates = (collection: CollectionSlug, id: number, toPath: (slug: string, locale: Locale) => string) =>
  unstable_cache(
    async () => {
      const doc = (await (await payloadClient()).findByID({ collection, id, locale: 'all', depth: 0, select: LOCALE_SELECT })) as unknown as AllLocaleDoc
      const out: Partial<Record<Locale, string>> = {}
      for (const [l, s] of Object.entries(realLocales(doc))) if (s) out[l as Locale] = toPath(s, l as Locale)
      return out
    },
    ['alternates-v2', collection, String(id)],
    { tags: [collection] },
  )()
