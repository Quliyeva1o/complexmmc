import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { RenderBlocks } from '@/components/blocks/RenderBlocks'
import { PageShell } from '@/components/layout/PageShell'
import { type Locale, localeCodes, localePrefix } from '@/i18n/config'
import { findBySlug, getGlobal } from '@/lib/data'
import { ldScript, organizationLd, websiteLd } from '@/lib/jsonld'
import { buildMetadata } from '@/lib/seo'
import type { Page, SiteSetting } from '@/payload-types'

/** Home pages: / (az), /en, /ru — content from the "home" page in admin. */
export const revalidate = 3600

const homePaths = Object.fromEntries(localeCodes.map((l) => [l, localePrefix(l) || '/'])) as Record<Locale, string>

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }): Promise<Metadata> {
  const { locale } = await params
  const page = await findBySlug<Page>('pages', 'home', locale)
  return buildMetadata({ locale, paths: homePaths, meta: page?.meta, fallbackTitle: 'Complex MMC' })
}

export default async function Home({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params
  const [page, settings] = await Promise.all([findBySlug<Page>('pages', 'home', locale), getGlobal<SiteSetting>('site-settings', locale, 1)])
  if (!page) notFound()
  const firstIsHero = page.layout?.[0]?.blockType === 'hero'
  return (
    <PageShell locale={locale} alternates={homePaths} overlayHeader={firstIsHero}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: ldScript([organizationLd(settings, locale), websiteLd(settings, locale)]) }} />
      <RenderBlocks blocks={page.layout} locale={locale} />
    </PageShell>
  )
}
