import type { Metadata } from 'next'

import { defaultLocale, type Locale, locales } from '@/i18n/config'
import type { Media, SiteSetting } from '@/payload-types'
import { getGlobal } from './data'
import { mediaProps } from './media'

const SITE = () => (process.env.NEXT_PUBLIC_SERVER_URL || 'https://complexmmc.az').replace(/\/$/, '')

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
  const self = paths[locale] ?? '/'
  const title = meta?.title || fallbackTitle || settings.companyName
  const template = settings.titleTemplate || '%s | Complex MMC'
  const fullTitle = absoluteTitle ? title : template.replace('%s', title)
  const description = meta?.description || fallbackDescription || settings.defaultDescription || undefined
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
