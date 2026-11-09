import type { Field, FieldHook } from 'payload'

import { slugify } from '@/lib/slugify'

const formatSlug =
  (fallbackField: string): FieldHook =>
  ({ value, data, operation, originalDoc }) => {
    if (typeof value === 'string' && value.trim()) return slugify(value)
    if (operation === 'create' || !originalDoc?.slug) {
      const source = data?.[fallbackField]
      if (typeof source === 'string' && source.trim()) return slugify(source)
    }
    return value
  }

/**
 * Localized slug (each language has its own URL).
 * Empty -> generated from `fallbackField` on save. Changing it on a published doc
 * creates a 301 via the redirects collection (see hooks/createRedirectOnSlugChange).
 */
export const slugField = (fallbackField = 'title', overrides: Partial<Field> = {}): Field =>
  ({
    name: 'slug',
    label: 'Slug (URL)',
    type: 'text',
    localized: true,
    index: true,
    admin: {
      position: 'sidebar',
      description: 'Boş qoysanız başlıqdan avtomatik yaranır. Yalnız latın hərfləri, rəqəm və "-".',
    },
    hooks: { beforeValidate: [formatSlug(fallbackField)] },
    ...overrides,
  }) as Field
