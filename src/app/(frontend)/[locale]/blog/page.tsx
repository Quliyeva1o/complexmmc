import type { Metadata } from 'next'

import { PageBanner } from '@/components/inner/InnerParts'
import { PageShell } from '@/components/layout/PageShell'
import { PostCard } from '@/components/ui/PostCard'
import { isLocale, type Locale, localeCodes, localePrefix } from '@/i18n/config'
import { t } from '@/i18n/dictionary'
import { findBySlug, findDocs } from '@/lib/data'
import { breadcrumbLd, ldScript } from '@/lib/jsonld'
import { mediaProps } from '@/lib/media'
import { buildMetadata } from '@/lib/seo'
import { docPath } from '@/lib/urls'
import type { Media, Page, Post, Team } from '@/payload-types'

/** /blog — template "Blog" (Pooluxe): banner + 3-column post grid. */
export const revalidate = 3600
const paths = Object.fromEntries(localeCodes.map((l) => [l, `${localePrefix(l)}/blog`])) as Record<Locale, string>

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }): Promise<Metadata> {
  const { locale } = await params
  if (!isLocale(locale)) return {}
  const page = await findBySlug<Page>('pages', 'blog', locale, 0)
  return buildMetadata({ locale, paths, meta: page?.meta, fallbackTitle: page?.title ?? 'Blog' })
}

export default async function BlogPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params
  const d = t(locale)
  const [page, posts] = await Promise.all([
    findBySlug<Page>('pages', 'blog', locale, 1),
    findDocs<Post>('posts', locale, { where: { _status: { equals: 'published' } }, sort: '-publishedAt', depth: 1, limit: 100 }),
  ])
  const home = localePrefix(locale) || '/'
  const title = page?.title ?? 'Blog'
  return (
    <PageShell locale={locale} alternates={paths} overlayHeader>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: ldScript([breadcrumbLd([{ name: d.breadcrumbHome, path: home }, { name: title, path: paths[locale] }])]) }} />
      <PageBanner title={title} intro={page?.intro} image={page?.banner} crumbs={[{ name: d.breadcrumbHome, href: home }, { name: title }]} />

      <div className="px-[15px]">
        <ul className="mx-auto grid max-w-[1304px] gap-[30px] py-[60px] sm:grid-cols-2 md:py-[100px] lg:grid-cols-3">
          {posts.map((p) => {
            const author = typeof p.author === 'object' && p.author ? (p.author as Team) : null
            return (
              <li key={p.id} data-reveal>
                <PostCard
                  href={docPath('posts', p.slug, locale)}
                  title={p.title}
                  excerpt={p.excerpt}
                  image={mediaProps(p.cover as Media, 'card')}
                  date={p.publishedAt}
                  author={{ name: author?.name ?? p.authorName ?? 'Complex MMC', photo: author ? mediaProps(author.photo as Media, 'thumb') : null }}
                  locale={locale}
                />
              </li>
            )
          })}
        </ul>
      </div>
    </PageShell>
  )
}
