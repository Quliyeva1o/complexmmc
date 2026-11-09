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
