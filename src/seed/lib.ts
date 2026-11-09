import { convertHTMLToLexical, editorConfigFactory } from '@payloadcms/richtext-lexical'
import { JSDOM } from 'jsdom'
import fs from 'node:fs'
import path from 'node:path'
import type { Payload, SanitizedConfig } from 'payload'

export type Loc = 'az' | 'en' | 'ru'
export const LOCS: Loc[] = ['az', 'en', 'ru']
export type L<T> = Partial<Record<Loc, T>>

/* ------------------------------------------------------------------ rich text */
let editorConfig: Awaited<ReturnType<typeof editorConfigFactory.default>> | null = null

export async function initRichText(config: SanitizedConfig) {
  editorConfig = await editorConfigFactory.default({ config })
}

/** HTML -> Lexical JSON. Images are stripped (galleries are stored as uploads). */
export function rt(html?: string | null) {
  if (!html || !editorConfig) return undefined
  let clean = html.replace(/<img[^>]*>/g, '').trim()
  if (!clean) return undefined
  if (!clean.startsWith('<')) clean = `<p>${clean}</p>`
  return convertHTMLToLexical({ editorConfig, html: clean, JSDOM })
}

/** Plain text -> minimal Lexical paragraph(s). */
export function rtText(text?: string | null) {
  if (!text) return undefined
  return rt(
    text
      .split(/\n{2,}/)
      .map((p) => `<p>${p.replace(/&/g, '&amp;').replace(/</g, '&lt;')}</p>`)
      .join(''),
  )
}

/* ------------------------------------------------------------------ slugs */
export const lastSeg = (p?: string | null) => (p ? p.split('/').filter(Boolean).pop() ?? '' : '')

/* ------------------------------------------------------------------ media */
export class MediaStore {
  private cache = new Map<string, number>()
  constructor(
    private payload: Payload,
    private assetsDir: string,
  ) {}

  /** Uploads once per source path; alt is localized. Returns media id or undefined if file missing. */
  async get(src?: string | null, alt: L<string> = {}): Promise<number | undefined> {
    if (!src) return undefined
    const key = decodeURIComponent(src)
    if (this.cache.has(key)) return this.cache.get(key)

    const existing = await this.payload.find({
      collection: 'media',
      where: { sourceUrl: { equals: key } },
      limit: 1,
      depth: 0,
    })
    if (existing.docs[0]) {
      this.cache.set(key, existing.docs[0].id)
      return existing.docs[0].id
    }

    const filePath = path.join(this.assetsDir, key)
    if (!fs.existsSync(filePath)) {
      console.warn(`  ! missing file ${key}`)
      return undefined
    }
    const fallbackAlt = alt.az || alt.en || path.basename(key).replace(/\.[a-z]+$/i, '').replace(/[-_]/g, ' ')
    const doc = await this.payload.create({
      collection: 'media',
      locale: 'az',
      data: { alt: fallbackAlt, sourceUrl: key },
      filePath,
      context: { disableRevalidate: true },
    })
    for (const l of ['en', 'ru'] as const) {
      if (alt[l]) {
        await this.payload.update({
          collection: 'media',
          id: doc.id,
          locale: l,
          data: { alt: alt[l] },
          context: { disableRevalidate: true },
        })
      }
    }
    this.cache.set(key, doc.id)
    return doc.id
  }
}

/* ------------------------------------------------------------------ upsert */
type Upsert = {
  collection: string
  /** Lookup: field + AZ value that identifies the doc (usually slug). */
  match: { field: string; value: string }
  /** Non-localized + AZ values. */
  base: Record<string, unknown>
  /** Localized overrides per locale (en / ru). */
  locales?: L<Record<string, unknown>>
  draft?: boolean
}

/**
 * Idempotent create-or-update. AZ values are written first, then each extra locale.
 * Arrays with localized sub-fields keep their row ids so translations line up.
 */
export async function upsert(payload: Payload, { collection, match, base, locales = {}, draft }: Upsert) {
  const ctx = { disableRevalidate: true }
  const found = await payload.find({
    collection: collection as never,
    where: { [match.field]: { equals: match.value } },
    locale: 'az',
    limit: 1,
    depth: 0,
    draft: true,
  })
  const status = draft === undefined ? {} : { _status: draft ? 'draft' : 'published' }
  let doc = found.docs[0] as { id: number } | undefined
  if (doc) {
    doc = (await payload.update({
      collection: collection as never,
      id: doc.id,
      locale: 'az',
      data: { ...base, ...status } as never,
      context: ctx,
    })) as { id: number }
  } else {
    doc = (await payload.create({
      collection: collection as never,
      locale: 'az',
      data: { ...base, ...status } as never,
      context: ctx,
    })) as { id: number }
  }
  for (const l of ['en', 'ru'] as const) {
    const data = locales[l]
    if (!data || !Object.keys(data).length) continue
    const current = (await payload.findByID({ collection: collection as never, id: doc.id, depth: 0, locale: l, draft: true })) as Record<string, unknown>
    await payload.update({
      collection: collection as never,
      id: doc.id,
      locale: l,
      data: mergeRowIds(current, data) as never,
      context: ctx,
    })
  }
  return doc.id
}

/** Copies `id` of existing array rows onto translated rows (same index) so Payload treats them as the same rows. */
function mergeRowIds(current: unknown, data: unknown): unknown {
  if (Array.isArray(data) && Array.isArray(current)) {
    return data.map((row, i) => {
      const cur = current[i] as Record<string, unknown> | undefined
      if (!row || typeof row !== 'object' || !cur || typeof cur !== 'object') return row
      const merged = mergeRowIds(cur, row) as Record<string, unknown>
      return 'id' in cur ? { ...merged, id: cur.id } : merged
    })
  }
  if (data && typeof data === 'object' && !Array.isArray(data) && current && typeof current === 'object') {
    // Lexical JSON (has `root`) is replaced as a whole
    if ('root' in (data as object)) return data
    const out: Record<string, unknown> = { ...(data as object) }
    for (const [k, v] of Object.entries(data as object)) {
      out[k] = mergeRowIds((current as Record<string, unknown>)[k], v)
    }
    return out
  }
  return data
}

export async function upsertGlobal(payload: Payload, slug: string, base: Record<string, unknown>, locales: L<Record<string, unknown>> = {}) {
  const ctx = { disableRevalidate: true }
  await payload.updateGlobal({ slug: slug as never, locale: 'az', data: base as never, context: ctx })
  for (const l of ['en', 'ru'] as const) {
    const data = locales[l]
    if (!data) continue
    const current = (await payload.findGlobal({ slug: slug as never, locale: l, depth: 0 })) as Record<string, unknown>
    await payload.updateGlobal({ slug: slug as never, locale: l, data: mergeRowIds(current, data) as never, context: ctx })
  }
}

/** Old <title> values end with " | Complex MMC"; the site's title template adds the brand itself. */
export const cleanTitle = (t?: string | null) => (t ?? '').replace(/\s*[|–-]\s*Complex MMC\s*$/i, '').trim()
