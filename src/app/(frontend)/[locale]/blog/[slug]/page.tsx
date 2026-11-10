import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import { FaqList, PageBanner, Prose } from '@/components/inner/InnerParts'
import { PageShell } from '@/components/layout/PageShell'
import { AuthorMeta, CalendarIcon, formatDate } from '@/components/ui/PostCard'
import { isLocale, type Locale, localeCodes, localePrefix } from '@/i18n/config'
import { t } from '@/i18n/dictionary'
import { findBySlug, findDocs, getAlternates } from '@/lib/data'
import { articleLd, breadcrumbLd, faqLd, ldScript } from '@/lib/jsonld'
import { mediaProps } from '@/lib/media'
import { buildMetadata } from '@/lib/seo'
import { docPath } from '@/lib/urls'
import type { Faq, Media, Post, PostCategory, Team } from '@/payload-types'

/**
 * /blog/{slug} — template blog single (Pooluxe): banner (48px title) ·
 * [818px article: intro · featured image · content | 441px sidebar: related posts · topics].
 */
export const revalidate = 3600
export const dynamicParams = true

export async function generateStaticParams() {
  const out: { locale: string; slug: string }[] = []
  for (const locale of localeCodes) {
    const docs = await findDocs<Post>('posts', locale, { where: { _status: { equals: 'published' } }, depth: 0, limit: 500 })
    for (const p of docs) if (p.slug) out.push({ locale, slug: p.slug })
  }
  return out
}

type P = { params: Promise<{ locale: Locale; slug: string }> }
const toPath = (slug: string, l: Locale) => docPath('posts', slug, l)

export async function generateMetadata({ params }: P): Promise<Metadata> {
  const { locale, slug } = await params
  if (!isLocale(locale)) return {}
  const p = await findBySlug<Post>('posts', decodeURIComponent(slug), locale, 1)
  if (!p) return {}
  const meta = await buildMetadata({ locale, paths: await getAlternates('posts', p.id, toPath), meta: { ...p.meta, image: p.meta?.image ?? p.cover }, fallbackTitle: p.title, fallbackDescription: p.excerpt })
  return { ...meta, openGraph: { ...meta.openGraph, type: 'article', publishedTime: p.publishedAt ?? undefined, modifiedTime: p.updatedAt } }
}

export default async function PostPage({ params }: P) {
  const { locale, slug } = await params
  const d = t(locale)
  const p = await findBySlug<Post>('posts', decodeURIComponent(slug), locale, 2)
  if (!p) notFound()
  const [latest, cats, alternates] = await Promise.all([
    findDocs<Post>('posts', locale, { where: { and: [{ _status: { equals: 'published' } }, { id: { not_equals: p.id } }] }, sort: '-publishedAt', depth: 1, limit: 3 }),
    findDocs<PostCategory>('post-categories', locale, { depth: 0, limit: 30 }),
    getAlternates('posts', p.id, toPath),
  ])
  const picked = (p.relatedPosts ?? []).filter((x): x is Post => typeof x === 'object')
  const related = (picked.length ? picked : latest).slice(0, 3)
  const path = toPath(p.slug!, locale)
  const home = localePrefix(locale) || '/'
  const blogPath = `${localePrefix(locale)}/blog`
  const cover = mediaProps(p.cover as Media, 'large')
  const faqs = (p.faqs ?? []).filter((f): f is Faq => typeof f === 'object')
  const author = typeof p.author === 'object' && p.author ? (p.author as Team) : null
  const authorName = author?.name ?? p.authorName ?? 'Complex MMC'
  const postCats = (p.categories ?? []).filter((c): c is PostCategory => typeof c === 'object')
  const topics = cats.length ? cats : postCats

  const ld = [
    articleLd({ headline: p.title, description: p.excerpt, path, image: cover?.src, datePublished: p.publishedAt, dateModified: p.updatedAt, author: author?.name ?? p.authorName, locale }),
    breadcrumbLd([{ name: d.breadcrumbHome, path: home }, { name: d.blog, path: blogPath }, { name: p.title, path }]),
    faqLd(faqs),
  ].filter(Boolean) as object[]

  return (
    <PageShell locale={locale} alternates={alternates} overlayHeader>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: ldScript(ld) }} />
      <PageBanner small title={p.title} image={p.cover} crumbs={[{ name: d.breadcrumbHome, href: home }, { name: d.blog, href: blogPath }, { name: p.title }]} />

      <div className="px-[15px]">
        <div className="mx-auto flex max-w-[1304px] flex-col gap-[45px] py-[60px] md:py-[100px] lg:flex-row">
          {/* ---------------------------------------------------------- article */}
          <article className="min-w-0 flex-1 lg:max-w-[818px]">
            <div className="flex flex-col gap-5 px-2.5 py-2.5">
              <ul className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
                <li>
                  <AuthorMeta name={authorName} photo={author ? mediaProps(author.photo as Media, 'thumb') : null} />
                </li>
                {p.publishedAt && (
                  <li className="inline-flex items-center gap-[5px]">
                    <CalendarIcon />
                    <time dateTime={p.publishedAt}>{formatDate(p.publishedAt, locale)}</time>
                  </li>
                )}
                {postCats.map((c) => (
                  <li key={c.id} className="rounded-full bg-badge px-3 py-[5px] text-xs text-heading">
                    {c.title}
                  </li>
                ))}
              </ul>
              {p.excerpt && <p >{p.excerpt}</p>}
              {cover && (
                <div className="relative aspect-[798/532] overflow-hidden rounded-[var(--radius-card)]">
                  <Image src={cover.src} alt={cover.alt} fill priority sizes="(min-width:1024px) 798px, 100vw" className="object-cover" />
                </div>
              )}
              <Prose data={p.content} className="prose-post max-w-none" />
              <FaqList faqs={faqs} heading={d.faqHeading} />
            </div>
          </article>

          {/* ---------------------------------------------------------- sidebar */}
          <aside className="flex w-full shrink-0 flex-col gap-5 lg:w-[441px]">
            {related.length > 0 && (
              <section>
                <h2 className="mb-5 text-h3">{d.relatedPosts}</h2>
                <ul className="flex flex-col gap-[30px]">
                  {related.map((r) => {
                    const img = mediaProps(r.cover as Media, 'thumb')
                    const href = toPath(r.slug!, locale)
                    return (
                      <li key={r.id} className="flex items-center gap-[30px]">
                        <Link href={href} tabIndex={-1} aria-hidden="true" className="relative h-[73px] w-[110px] shrink-0 overflow-hidden rounded-[4px] bg-soft">
                          {img && <Image src={img.src} alt="" fill sizes="110px" className="object-cover" />}
                        </Link>
                        <div className="min-w-0">
                          <h3 className="line-clamp-2 text-h4">
                            <Link href={href} className="transition-colors duration-300 hover:text-primary">
                              {r.title}
                            </Link>
                          </h3>
                          {r.publishedAt && (
                            <time dateTime={r.publishedAt} className="mt-1.5 block text-sm">
                              {formatDate(r.publishedAt, locale)}
                            </time>
                          )}
                        </div>
                      </li>
                    )
                  })}
                </ul>
              </section>
            )}
            {topics.length > 0 && (
              <section className="pt-10">
                <h2 className="mb-[25px] text-h3">{d.popularTags}</h2>
                <ul className="flex flex-wrap gap-2">
                  {topics.map((c) => (
                    <li key={c.id} className="rounded-full bg-primary px-3 py-[5px] text-xs text-heading">
                      {c.title}
                    </li>
                  ))}
                </ul>
              </section>
            )}
          </aside>
        </div>
      </div>
    </PageShell>
  )
}
