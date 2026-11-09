import type { MetadataRoute } from 'next'
import type { CollectionSlug } from 'payload'

import { type Locale, localeCodes, locales } from '@/i18n/config'
import { findAllLocaleSlugs, findDocs } from '@/lib/data'
import { mediaProps } from '@/lib/media'
import { docPath } from '@/lib/urls'
import type { Media } from '@/payload-types'

/**
 * /sitemap.xml — every published, indexable URL in az / en / ru with hreflang alternates
 * (x-default → AZ) and the cover image. Rebuilt hourly; admin saves revalidate the data.
 * Only collections that have a public route are listed.
 */
export const revalidate = 3600

const SITE = (process.env.NEXT_PUBLIC_SERVER_URL || 'https://complexmmc.az').replace(/\/$/, '')

type Doc = {
  id: number
  slug?: string | null
  updatedAt?: string
  _status?: string | null
  meta?: { noindex?: boolean | null } | null
  cover?: Media | number | null
  images?: (Media | number)[] | null
}

const SOURCES: { collection: CollectionSlug; priority: number; changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency'] }[] = [
  { collection: 'pages', priority: 0.8, changeFrequency: 'weekly' },
  { collection: 'categories', priority: 0.9, changeFrequency: 'weekly' },
  { collection: 'services', priority: 0.9, changeFrequency: 'monthly' },
  { collection: 'service-areas', priority: 0.7, changeFrequency: 'monthly' },
  { collection: 'projects', priority: 0.7, changeFrequency: 'monthly' },
  { collection: 'posts', priority: 0.6, changeFrequency: 'monthly' },
]

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const out: MetadataRoute.Sitemap = []

  for (const src of SOURCES) {
    // Locales where each document really exists (own slug, not an untranslated AZ copy)
    const real = new Map((await findAllLocaleSlugs(src.collection)).map((d) => [d.id, d.slugs]))
    // Same documents in each language: id -> { locale -> doc }
    const byId = new Map<number, Partial<Record<Locale, Doc>>>()
    for (const locale of localeCodes) {
      const docs = await findDocs<Doc>(src.collection, locale, { where: { _status: { equals: 'published' } }, depth: 1, limit: 1000 })
      for (const d of docs) {
        if (!d.slug || d.meta?.noindex || real.get(d.id)?.[locale] !== d.slug) continue
        byId.set(d.id, { ...byId.get(d.id), [locale]: d })
      }
    }

    for (const perLocale of byId.values()) {
      const paths: Partial<Record<Locale, string>> = {}
      for (const l of localeCodes) if (perLocale[l]?.slug) paths[l] = docPath(src.collection, perLocale[l]!.slug, l)
      const languages: Record<string, string> = {}
      for (const l of locales) if (paths[l.code]) languages[l.hreflang] = SITE + paths[l.code]
      if (paths.az) languages['x-default'] = SITE + paths.az

      for (const l of localeCodes) {
        const d = perLocale[l]
        if (!d || !paths[l]) continue
        const isHome = src.collection === 'pages' && d.slug === 'home'
        const cover = mediaProps(d.cover as Media, 'large')
        out.push({
          url: SITE + paths[l],
          lastModified: d.updatedAt ? new Date(d.updatedAt) : undefined,
          changeFrequency: isHome ? 'daily' : src.changeFrequency,
          priority: isHome ? 1 : src.priority,
          alternates: { languages },
          images: cover ? [SITE + cover.src] : undefined,
        })
      }
    }
  }
  return out
}
