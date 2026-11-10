/**
 * Admin menu structure (PLAN.md §12, step 2) — one place for the order of the sidebar groups,
 * which collection/global sits where, and which groups start closed. Used by payload.config
 * (admin.group of each entity) and by the custom sidebar (src/components/admin/AdminNav.tsx).
 * "Müraciətlər" (form submissions) is rendered separately at the very top.
 */
export const NAV_GROUPS: { label: string; slugs: string[]; collapsed?: boolean }[] = [
  { label: 'Layihələr', slugs: ['projects', 'before-after', 'references', 'project-categories'] },
  { label: 'Məhsullar', slugs: ['products', 'product-categories'] },
  { label: 'Bloq', slugs: ['posts', 'post-categories', 'tags'] },
  { label: 'Şirkət', slugs: ['team', 'certificates', 'testimonials', 'gallery', 'brands'] },
  { label: 'Parametrlər', slugs: ['site-settings', 'header', 'footer', 'theme', 'calculator'] },
  { label: 'Məzmun', slugs: ['pages', 'categories', 'services', 'service-areas', 'faqs', 'forms'], collapsed: true },
  { label: 'Sistem', slugs: ['media', 'users', 'redirects'], collapsed: true },
]

export const REQUESTS_GROUP = 'Müraciətlər'

export const groupOf = (slug: string) => NAV_GROUPS.find((g) => g.slugs.includes(slug))?.label

/** Set admin.group on every collection/global from NAV_GROUPS (so the dashboard agrees with the sidebar). */
export function withNavGroup<T extends { slug: string; admin?: Record<string, unknown> }>(entity: T): T {
  const group = entity.slug === 'form-submissions' ? REQUESTS_GROUP : groupOf(entity.slug)
  return group ? { ...entity, admin: { ...(entity.admin ?? {}), group } } : entity
}
