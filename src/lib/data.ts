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

/** The same document's path in every locale that has a slug (for hreflang + language switch). */
export const getAlternates = (collection: CollectionSlug, id: number, toPath: (slug: string, locale: Locale) => string) =>
  unstable_cache(
    async () => {
      const doc = (await (await payloadClient()).findByID({ collection, id, locale: 'all', depth: 0, select: { slug: true } as never })) as { slug?: Record<string, string | null> }
      const out: Partial<Record<Locale, string>> = {}
      for (const [l, s] of Object.entries(doc.slug ?? {})) if (s) out[l as Locale] = toPath(s, l as Locale)
      return out
    },
    ['alternates', collection, String(id)],
    { tags: [collection] },
  )()
