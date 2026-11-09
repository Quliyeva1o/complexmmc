import type { Metadata } from 'next'

import { defaultLocale, type Locale, locales } from '@/i18n/config'
import type { Media, SiteSetting } from '@/payload-types'
import { getGlobal } from './data'
import { mediaProps } from './media'

const SITE = () => (process.env.NEXT_PUBLIC_SERVER_URL || 'https://complexmmc.az').replace(/\/$/, '')

/** Cut at a word boundary so the snippet isn't truncated mid-word by search engines. */
const clip = (s: string | undefined, max: number) => {
  if (!s || s.length <= max) return s
  const cut = s.slice(0, max - 1)
  return cut.slice(0, cut.lastIndexOf(' ') > max * 0.6 ? cut.lastIndexOf(' ') : cut.length).replace(/[\s,;:–—-]+$/, '') + '…'
}

type SeoInput = {
  locale: Locale
  /** Path of this page in every locale that has it, e.g. { az: '/about', en: '/en/about' }. */
  paths: Partial<Record<Locale, string>>
  meta?: { title?: string | null; description?: string | null; image?: Media | number | null; canonical?: string | null; noindex?: boolean | null } | null
  fallbackTitle?: string
  fallbackDescription?: string | null
  /** true for the home page: title is used without the template suffix. */
  absoluteTitle?: boolean
}

/**
 * Per-page metadata: title template from admin, description, canonical, hreflang
 * (az / en / ru + x-default → AZ), Open Graph and robots.
 */
export async function buildMetadata({ locale, paths, meta, fallbackTitle, fallbackDescription, absoluteTitle }: SeoInput): Promise<Metadata> {
  const settings = await getGlobal<SiteSetting>('site-settings', locale, 1)
  const base = SITE()
  // An untranslated language copy has no entry of its own → canonical points to the AZ original.
  const self = paths[locale] ?? paths[defaultLocale] ?? '/'
  const title = meta?.title || fallbackTitle || settings.companyName
  const template = settings.titleTemplate || '%s | Complex MMC'
  // Brand suffix only when it fits (Google shows ~60–65 chars) and the title doesn't already carry it
  const withBrand = template.replace('%s', title)
  const fullTitle = absoluteTitle || title.includes(settings.companyName || 'Complex MMC') || withBrand.length > 65 ? title : withBrand
  const description = clip(meta?.description || fallbackDescription || settings.defaultDescription || undefined, 160)
  const ogImg = mediaProps((meta?.image as Media) ?? (settings.defaultOgImage as Media), 'og')

  const languages: Record<string, string> = {}
  for (const l of locales) if (paths[l.code]) languages[l.hreflang] = base + paths[l.code]
  if (paths[defaultLocale]) languages['x-default'] = base + paths[defaultLocale]

  return {
    title: { absolute: fullTitle },
    description,
    alternates: { canonical: meta?.canonical || base + self, languages },
    robots: meta?.noindex ? { index: false, follow: true } : { index: true, follow: true },
    openGraph: {
      type: 'website',
      url: base + self,
      siteName: settings.companyName,
      title: fullTitle,
      description,
      locale: { az: 'az_AZ', en: 'en_US', ru: 'ru_RU' }[locale],
      images: ogImg ? [{ url: base + ogImg.src, width: ogImg.width, height: ogImg.height, alt: ogImg.alt }] : undefined,
    },
    twitter: { card: 'summary_large_image', title: fullTitle, description },
    verification: {
      google: settings.googleVerification || undefined,
      yandex: settings.yandexVerification || undefined,
    },
  }
}
