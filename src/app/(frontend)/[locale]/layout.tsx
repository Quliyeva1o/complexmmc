import type { Metadata, Viewport } from 'next'
import { Inter, Manrope } from 'next/font/google'
import { notFound } from 'next/navigation'
import type { ReactNode } from 'react'

import { EntranceAnimations } from '@/components/ui/EntranceAnimations'
import { isLocale, localeCodes } from '@/i18n/config'
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

  return (
    <html lang={locale} className={`${heading.variable} ${body.variable}`} suppressHydrationWarning>
      <body>
        {children}
        <EntranceAnimations />
      </body>
    </html>
  )
}
