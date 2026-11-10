import type { Metadata, Viewport } from 'next'
import { Inter, Manrope } from 'next/font/google'
import { notFound } from 'next/navigation'
import type { ReactNode } from 'react'

import { EntranceAnimations } from '@/components/ui/EntranceAnimations'
import { PALETTE_SCRIPT, PalettePicker } from '@/components/ui/PalettePicker'
import { isLocale, localeCodes } from '@/i18n/config'
import { getGlobal } from '@/lib/data'
import type { Theme } from '@/payload-types'
import '@/styles/globals.css'

// Template typography: Manrope headings + Inter body. Both cover Azerbaijani (ə ş ğ İ ı) and Cyrillic.
const heading = Manrope({
  subsets: ['latin', 'latin-ext', 'cyrillic'],
  variable: '--font-heading',
  display: 'swap',
})
const body = Inter({
  subsets: ['latin', 'latin-ext', 'cyrillic'],
  variable: '--font-body',
  display: 'swap',
})

export const viewport: Viewport = {
  themeColor: '#002362',
  width: 'device-width',
  initialScale: 1,
}

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'),
}

export function generateStaticParams() {
  return localeCodes.map((locale) => ({ locale }))
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()

  // admin → Parametrlər → Tema: palette + optional own colours (tokens.css holds the palettes)
  const theme = await getGlobal<Theme>('theme', locale, 0).catch(() => null)
  const palette = theme?.palette && theme.palette !== 'okean' ? theme.palette : undefined
  const own = theme?.enabled ? themeCss(theme) : ''

  return (
    <html lang={locale} className={`${heading.variable} ${body.variable}`} data-palette={palette} suppressHydrationWarning>
      <head>
        {own && <style dangerouslySetInnerHTML={{ __html: own }} />}
        {/* temporary palette review (PLAN.md §11 step 2) — remove with PalettePicker */}
        <script dangerouslySetInnerHTML={{ __html: PALETTE_SCRIPT }} />
      </head>
      <body>
        {children}
        <EntranceAnimations />
        <PalettePicker />
      </body>
    </html>
  )
}

const HEX = /^#([0-9a-f]{3}|[0-9a-f]{6})$/i
/** Own colours from the Theme global → CSS variables (beats the palette selectors in tokens.css). */
function themeCss(t: Theme) {
  const map: [keyof Theme, string[]][] = [
    ['primary', ['--color-primary']],
    ['primaryHover', ['--color-primary-hover']],
    ['primaryStrong', ['--color-primary-strong', '--color-accent']],
    ['heading', ['--color-heading']],
    ['text', ['--color-text']],
    ['bg', ['--color-soft']],
    ['darkSection', ['--color-dark', '--color-header-sticky']],
  ]
  const decls = map.flatMap(([k, vars]) => {
    const v = t[k]
    return typeof v === 'string' && HEX.test(v) ? vars.map((name) => `${name}:${v}`) : []
  })
  return decls.length ? `html:root,html:root[data-palette]{${decls.join(';')}}` : ''
}
