import type { Locale } from '@/i18n/config'
import type { Media, SiteSetting } from '@/payload-types'
import { mediaProps } from './media'

const SITE = () => (process.env.NEXT_PUBLIC_SERVER_URL || 'https://complexmmc.az').replace(/\/$/, '')
const DAYS: Record<string, string> = { Mo: 'Monday', Tu: 'Tuesday', We: 'Wednesday', Th: 'Thursday', Fr: 'Friday', Sa: 'Saturday', Su: 'Sunday' }

/** Organization + local business (GeneralContractor) — the company entity referenced by every page. */
export function organizationLd(s: SiteSetting, locale: Locale) {
  const base = SITE()
  const logo = mediaProps(s.logo as Media)
  return {
    '@type': [s.businessType || 'GeneralContractor', 'Organization'],
    '@id': `${base}/#organization`,
    name: s.companyName,
    url: base,
    logo: logo ? base + logo.src : undefined,
    description: s.defaultDescription || undefined,
    telephone: (s.phones ?? []).map((p) => p.number.replace(/\s/g, '')),
    email: s.email || undefined,
    priceRange: s.priceRange || undefined,
    address: s.address
      ? { '@type': 'PostalAddress', streetAddress: s.address, addressLocality: s.city || undefined, postalCode: s.postalCode || undefined, addressCountry: 'AZ' }
      : undefined,
    geo: s.lat && s.lng ? { '@type': 'GeoCoordinates', latitude: s.lat, longitude: s.lng } : undefined,
    hasMap: s.mapUrl || undefined,
    areaServed: s.areaServed?.length ? s.areaServed : undefined,
    openingHoursSpecification: (s.openingHours ?? []).map((h) => ({
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: (h.days ?? []).map((d) => DAYS[d]),
      opens: h.opens,
      closes: h.closes,
    })),
    sameAs: [...(s.socials ?? []).map((x) => x.url), s.mapUrl].filter(Boolean),
    knowsLanguage: ['az', 'en', 'ru'],
    inLanguage: locale,
  }
}

export function websiteLd(s: SiteSetting, locale: Locale) {
  const base = SITE()
  return {
    '@type': 'WebSite',
    '@id': `${base}/#website`,
    url: base,
    name: s.companyName,
    inLanguage: ['az', 'en', 'ru'],
    publisher: { '@id': `${base}/#organization` },
    description: s.defaultDescription || undefined,
  }
}

export function breadcrumbLd(items: { name: string; path: string }[]) {
  const base = SITE()
  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({ '@type': 'ListItem', position: i + 1, name: it.name, item: base + it.path })),
  }
}

/** Renders one <script type="application/ld+json"> with an @graph. */
export const ldScript = (graph: object[]) =>
  JSON.stringify({ '@context': 'https://schema.org', '@graph': graph }).replace(/</g, '\\u003c')

/** Plain text from Lexical JSON (for FAQ answers in structured data). */
export function lexicalText(node: unknown): string {
  if (!node || typeof node !== 'object') return ''
  const n = node as { text?: string; root?: unknown; children?: unknown[]; type?: string }
  if (n.root) return lexicalText(n.root)
  if (typeof n.text === 'string') return n.text
  const inner = (n.children ?? []).map(lexicalText).join(n.type === 'root' ? '\n' : '')
  return n.type === 'paragraph' || n.type === 'listitem' ? inner + ' ' : inner
}

export function faqLd(faqs: { question: string; answer?: unknown }[]) {
  if (!faqs.length) return null
  return {
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: lexicalText(f.answer).replace(/\s+/g, ' ').trim() },
    })),
  }
}

/** A service / category / service-area page as schema.org Service offered by the company. */
export function serviceLd(o: { name: string; description?: string | null; path: string; image?: string | null; areaServed?: string[]; serviceType?: string }) {
  const base = SITE()
  return {
    '@type': 'Service',
    '@id': `${base}${o.path}#service`,
    name: o.name,
    serviceType: o.serviceType ?? o.name,
    description: o.description || undefined,
    url: base + o.path,
    image: o.image ? base + o.image : undefined,
    provider: { '@id': `${base}/#organization` },
    areaServed: (o.areaServed ?? ['Bakı', 'Abşeron']).map((a) => ({ '@type': 'Place', name: a })),
  }
}

/** A completed project as CreativeWork with its photos and location. */
export function projectLd(o: { name: string; description?: string | null; path: string; images: string[]; location?: string | null; year?: number | null }) {
  const base = SITE()
  return {
    '@type': 'CreativeWork',
    '@id': `${base}${o.path}#project`,
    name: o.name,
    description: o.description || undefined,
    url: base + o.path,
    image: o.images.map((i) => base + i),
    locationCreated: o.location ? { '@type': 'Place', name: o.location } : undefined,
    dateCreated: o.year ? String(o.year) : undefined,
    creator: { '@id': `${base}/#organization` },
  }
}

/** A blog post as schema.org BlogPosting. */
export function articleLd(o: { headline: string; description?: string | null; path: string; image?: string | null; datePublished?: string | null; dateModified?: string | null; author?: string | null; locale: string }) {
  const base = SITE()
  return {
    '@type': 'BlogPosting',
    '@id': `${base}${o.path}#article`,
    headline: o.headline,
    description: o.description || undefined,
    url: base + o.path,
    mainEntityOfPage: base + o.path,
    image: o.image ? base + o.image : undefined,
    datePublished: o.datePublished || undefined,
    dateModified: o.dateModified || o.datePublished || undefined,
    inLanguage: o.locale,
    author: o.author ? { '@type': 'Person', name: o.author } : { '@id': `${base}/#organization` },
    publisher: { '@id': `${base}/#organization` },
  }
}

/** A catalogue product with its price range (AggregateOffer in AZN). */
export function productLd(o: { name: string; description?: string | null; path: string; image?: string | null; sku?: string | null; brand?: string | null; category?: string | null; low?: number | null; high?: number | null; count?: number }) {
  const base = SITE()
  return {
    '@type': 'Product',
    '@id': `${base}${o.path}#product`,
    name: o.name,
    description: o.description || undefined,
    url: base + o.path,
    image: o.image ? base + o.image : undefined,
    sku: o.sku || undefined,
    category: o.category || undefined,
    brand: o.brand ? { '@type': 'Brand', name: o.brand } : undefined,
    offers:
      o.low != null
        ? {
            '@type': 'AggregateOffer',
            priceCurrency: 'AZN',
            lowPrice: o.low,
            highPrice: o.high ?? o.low,
            offerCount: o.count ?? 1,
            availability: 'https://schema.org/InStock',
            seller: { '@id': `${base}/#organization` },
          }
        : undefined,
  }
}
