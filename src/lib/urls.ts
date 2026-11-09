import { type Locale, localePrefix } from '@/i18n/config'

/**
 * URL scheme — kept identical to the old turanprojects.az paths so rankings carry over.
 *   pages / categories / service-areas -> /{slug}   (home -> /)
 *   services -> /services/{slug}, projects -> /projects/{slug}, posts -> /blog/{slug}
 */
export const COLLECTION_BASE: Record<string, string> = {
  pages: '',
  categories: '',
  'service-areas': '',
  services: '/services',
  projects: '/projects',
  posts: '/blog',
  products: '/products',
  'post-categories': '/blog/kateqoriya',
}

export function docPath(collection: string, slug: string | null | undefined, locale: Locale) {
  const pre = localePrefix(locale)
  if (collection === 'pages' && (!slug || slug === 'home')) return pre || '/'
  if (collection === 'project-categories') return `${pre}/projects?kateqoriya=${slug}`
  const base = COLLECTION_BASE[collection] ?? ''
  return `${pre}${base}/${slug ?? ''}`
}

type LinkValue = {
  label?: string | null
  type?: 'internal' | 'custom' | null
  url?: string | null
  newTab?: boolean | null
  reference?: { relationTo: string; value: unknown } | null
}

/** Resolves a CMS link group to { href, label, newTab }. Returns null when nothing usable is set. */
export function resolveLink(link: LinkValue | null | undefined, locale: Locale, fallbackLabel?: string) {
  if (!link) return null
  let href: string | null = null
  let label = link.label ?? null
  if (link.type === 'internal' && link.reference) {
    const v = link.reference.value as { slug?: string; shortName?: string; title?: string } | number | null
    if (v && typeof v === 'object') {
      href = docPath(link.reference.relationTo, v.slug, locale)
      label = label || v.shortName || v.title || null
    }
  } else if (link.url) {
    href = link.url
  }
  if (!href) return null
  return { href, label: label || fallbackLabel || '', newTab: Boolean(link.newTab) }
}
