/**
 * Site languages. AZ is default and has NO url prefix (keeps old turanprojects.az URLs intact);
 * EN and RU live under /en and /ru.
 */
export const locales = [
  { code: 'az', label: 'Azərbaycan', short: 'AZ', hreflang: 'az' },
  { code: 'en', label: 'English', short: 'EN', hreflang: 'en' },
  { code: 'ru', label: 'Русский', short: 'RU', hreflang: 'ru' },
] as const

export type Locale = (typeof locales)[number]['code']

export const defaultLocale: Locale = 'az'

export const localeCodes = locales.map((l) => l.code) as Locale[]

export const isLocale = (v: string | undefined): v is Locale =>
  Boolean(v && (localeCodes as string[]).includes(v))

/** "/" + locale prefix (empty for default locale). */
export const localePrefix = (locale: Locale) => (locale === defaultLocale ? '' : `/${locale}`)
