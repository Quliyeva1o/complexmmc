import type { Metadata, Viewport } from 'next'
import { Manrope } from 'next/font/google'
import { notFound } from 'next/navigation'
import type { ReactNode } from 'react'

import { isLocale, localeCodes } from '@/i18n/config'
import '@/styles/globals.css'

// Manrope: Latin-ext (ə, ğ, ı, ş) + Cyrillic. Self-hosted by next/font, no external request.
const body = Manrope({
  subsets: ['latin', 'latin-ext', 'cyrillic'],
  variable: '--font-body',
  display: 'swap',
})

export const viewport: Viewport = {
  themeColor: '#082a32',
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
    <html lang={locale} className={body.variable}>
      <body>{children}</body>
    </html>
  )
}
