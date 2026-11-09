import type { CollectionAfterChangeHook, CollectionAfterDeleteHook, GlobalAfterChangeHook } from 'payload'
import { revalidateTag } from 'next/cache'

/**
 * Frontend data fetches are tagged by collection / global slug.
 * Any admin save invalidates only that tag -> ISR rebuilds just the affected pages.
 */
const safeRevalidate = (tag: string) => {
  try {
    revalidateTag(tag, 'max')
  } catch {
    // Outside a Next.js request (seed scripts, CLI) there is nothing to revalidate.
  }
}

export const revalidateAfterChange =
  (slug: string): CollectionAfterChangeHook =>
  ({ doc, req }) => {
    if (!req.context?.disableRevalidate) {
      safeRevalidate(slug)
      safeRevalidate('sitemap')
    }
    return doc
  }

export const revalidateAfterDelete =
  (slug: string): CollectionAfterDeleteHook =>
  ({ doc, req }) => {
    if (!req.context?.disableRevalidate) {
      safeRevalidate(slug)
      safeRevalidate('sitemap')
    }
    return doc
  }

export const revalidateGlobal =
  (slug: string): GlobalAfterChangeHook =>
  ({ doc, req }) => {
    if (!req.context?.disableRevalidate) safeRevalidate(`global:${slug}`)
    return doc
  }
