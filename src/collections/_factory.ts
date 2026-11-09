import type { CollectionConfig, Field } from 'payload'

import { anyone, authenticated, publishedOrAuthenticated } from '@/access'
import { slugField } from '@/fields/slug'
import { revalidateAfterChange, revalidateAfterDelete } from '@/hooks/revalidate'

type Options = {
  slug: string
  singular: string
  plural: string
  group: string
  fields: Field[]
  /** Field used as admin title + slug source. */
  titleField?: string
  /** Adds localized slug field (routable docs). */
  routable?: boolean
  /** Draft / publish workflow + version history. */
  drafts?: boolean
  /** Drag-and-drop ordering in admin list. */
  orderable?: boolean
  defaultColumns?: string[]
  description?: string
  overrides?: Partial<CollectionConfig>
}

/**
 * Every content collection is built through this factory so that access, ordering,
 * drafts, slugs and cache revalidation stay consistent. New section = new collection file.
 */
export function contentCollection({
  slug,
  singular,
  plural,
  group,
  fields,
  titleField = 'title',
  routable = false,
  drafts = false,
  orderable = true,
  defaultColumns,
  description,
  overrides = {},
}: Options): CollectionConfig {
  return {
    slug,
    labels: { singular, plural },
    orderable,
    admin: {
      group,
      useAsTitle: titleField,
      description,
      defaultColumns: defaultColumns ?? [titleField, ...(routable ? ['slug'] : []), 'updatedAt'],
      ...(overrides.admin ?? {}),
    },
    access: {
      read: drafts ? publishedOrAuthenticated : anyone,
      create: authenticated,
      update: authenticated,
      delete: authenticated,
      ...(overrides.access ?? {}),
    },
    versions: drafts ? { drafts: { schedulePublish: true }, maxPerDoc: 25 } : false,
    hooks: {
      afterChange: [revalidateAfterChange(slug)],
      afterDelete: [revalidateAfterDelete(slug)],
      ...(overrides.hooks ?? {}),
    },
    fields: [...fields, ...(routable ? [slugField(titleField)] : [])],
    ...Object.fromEntries(
      Object.entries(overrides).filter(([k]) => !['admin', 'access', 'hooks'].includes(k)),
    ),
  }
}
