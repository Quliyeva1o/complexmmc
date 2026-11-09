import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { RenderBlocks } from '@/components/blocks/RenderBlocks'
import { PageShell } from '@/components/layout/PageShell'
import { type Locale, localePrefix } from '@/i18n/config'
import { findBySlug } from '@/lib/data'
import type { Page } from '@/payload-types'

/**
 * Design review only: the home page with a forced hero variant, so the client can compare
 * /preview/hero/classic, /preview/hero/video and /preview/hero/rotating. Not indexed.
 */
export const metadata: Metadata = { title: 'Hero preview', robots: { index: false, follow: false } }
export const dynamic = 'force-dynamic'
const VARIANTS = ['classic', 'video', 'rotating']

export default async function HeroPreview({ params }: { params: Promise<{ locale: Locale; variant: string }> }) {
  const { locale, variant } = await params
  if (!VARIANTS.includes(variant)) notFound()
  const page = await findBySlug<Page>('pages', 'home', locale)
  if (!page) notFound()
  const pre = localePrefix(locale)
  return (
    <PageShell locale={locale} overlayHeader alternates={{ az: `/preview/hero/${variant}`, en: `/en/preview/hero/${variant}`, ru: `/ru/preview/hero/${variant}` }}>
      <nav aria-label="Hero variants" className="fixed bottom-5 left-1/2 z-[70] flex -translate-x-1/2 gap-2 rounded-full bg-white p-2 shadow-[var(--shadow-card)]">
        {VARIANTS.map((v, i) => (
          <a key={v} href={`${pre}/preview/hero/${v}`} aria-current={v === variant ? 'page' : undefined} className={`rounded-full px-4 py-2 text-sm font-bold ${v === variant ? 'bg-primary text-heading' : 'text-heading hover:bg-soft'}`}>
            V{i + 1}
          </a>
        ))}
      </nav>
      <RenderBlocks blocks={page.layout} locale={locale} heroVariant={variant} />
    </PageShell>
  )
}
