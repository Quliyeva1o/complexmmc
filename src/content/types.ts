/**
 * Hand-written (Stage 2b) content that replaces the thin migrated texts.
 * Applied to the CMS as DRAFTS by `npm run content` — the editor reviews and publishes.
 */
export type Loc = 'az' | 'en' | 'ru'

export type LocalizedPage = {
  /** ≤ 60 chars, main keyword first. The site appends " | Complex MMC". */
  metaTitle: string
  /** 140–155 chars, ends with a call to action. */
  metaDescription: string
  /** Banner subtitle / card text. */
  excerpt: string
  /** Body HTML: h2/h3/p/ul/ol/strong/a only. Converted to Lexical on apply. */
  html?: string
  /** Set only when this locale has no slug yet (new EN/RU page). */
  slug?: string
}

export type ContentFAQ = Record<Loc, { q: string; a: string }>

export type ContentEntry = {
  collection: 'categories' | 'services' | 'service-areas' | 'projects' | 'pages' | 'posts'
  /** AZ slug of the existing document. */
  slug: string
  locales: Partial<Record<Loc, LocalizedPage>>
  /** Extra FAQs appended to the document's existing FAQ list. */
  faqs?: ContentFAQ[]
}
