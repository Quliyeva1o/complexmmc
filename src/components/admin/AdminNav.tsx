import { DefaultNavClient, NavHamburger, NavWrapper } from '@payloadcms/next/client'
import { Logout } from '@payloadcms/ui'
import { EntityType, groupNavItems } from '@payloadcms/ui/shared'
import Link from 'next/link'
import type { Payload, PayloadRequest, SanitizedPermissions, VisibleEntities } from 'payload'
import type { I18nClient } from '@payloadcms/translations'

import { NAV_GROUPS } from '@/admin/groups'

/**
 * Admin sidebar (PLAN.md §12, step 2). Same building blocks as Payload's default nav, but:
 *  - "Müraciətlər" first: contact and price requests as separate links with a "new" counter;
 *  - groups in the order of NAV_GROUPS (most used first), globals included in that order;
 *  - "Məzmun" and "Sistem" start closed until the user opens them (then their choice is kept).
 */
type Props = {
  payload: Payload
  permissions: SanitizedPermissions
  i18n: I18nClient
  req?: PayloadRequest
  user?: { id: number | string; collection?: string } | null
  visibleEntities: VisibleEntities
}

const ADMIN = '/admin'

async function navPrefs(payload: Payload, user: Props['user']) {
  if (!user?.collection) return null
  const res = await payload.find({
    collection: 'payload-preferences',
    depth: 0,
    limit: 1,
    pagination: false,
    overrideAccess: true,
    where: { and: [{ key: { equals: 'nav' } }, { 'user.relationTo': { equals: user.collection } }, { 'user.value': { equals: user.id } }] },
  })
  return (res.docs[0]?.value ?? null) as { groups?: Record<string, { open?: boolean }> } | null
}

async function newCount(payload: Payload, kind: 'contact' | 'quote') {
  const { totalDocs } = await payload.count({
    collection: 'form-submissions',
    overrideAccess: true,
    where: { and: [{ kind: { equals: kind } }, { status: { equals: 'new' } }] },
  })
  return totalDocs
}

export async function AdminNav({ payload, permissions, i18n, user, visibleEntities }: Props) {
  if (!payload?.config) return null
  const { collections, globals } = payload.config

  // Payload's own grouping (labels, permissions), then re-sorted into our groups
  const raw = groupNavItems(
    [
      ...collections
        .filter(({ slug }) => visibleEntities.collections.includes(slug) && slug !== 'form-submissions')
        .map((entity) => ({ type: EntityType.collection as const, entity })),
      ...globals.filter(({ slug }) => visibleEntities.globals.includes(slug)).map((entity) => ({ type: EntityType.global as const, entity })),
    ],
    permissions,
    i18n,
  )
  const all = raw.flatMap((g) => g.entities)
  const placed = new Set<string>()
  const groups = NAV_GROUPS.map((g) => {
    const entities = g.slugs.map((slug) => all.find((e) => e.slug === slug)).filter((e): e is (typeof all)[number] => Boolean(e))
    entities.forEach((e) => placed.add(e.slug))
    return { label: g.label, entities }
  })
  const rest = all.filter((e) => !placed.has(e.slug))
  if (rest.length) groups.splice(groups.length - 2, 0, { label: 'Digər', entities: rest })

  const prefs = await navPrefs(payload, user)
  const navPreferences = {
    ...(prefs ?? {}),
    groups: Object.fromEntries(
      NAV_GROUPS.map((g) => [g.label, { open: prefs?.groups?.[g.label]?.open ?? !g.collapsed }]),
    ),
  }

  const canSeeRequests = visibleEntities.collections.includes('form-submissions')
  const [contactNew, quoteNew] = canSeeRequests ? await Promise.all([newCount(payload, 'contact'), newCount(payload, 'quote')]) : [0, 0]
  const base = `${ADMIN}/collections/form-submissions`
  const requests = [
    { id: 'req-contact', label: 'Əlaqə müraciətləri', href: `${base}?where[kind][equals]=contact`, count: contactNew },
    { id: 'req-quote', label: 'Qiymət müraciətləri', href: `${base}?where[kind][equals]=quote`, count: quoteNew },
    { id: 'req-all', label: 'Bütün müraciətlər', href: base, count: 0 },
  ]

  return (
    <NavWrapper baseClass="nav">
      <nav className="nav__wrap">
        <Link id="nav-dashboard" href={ADMIN} prefetch={false} className="nav__link admin-home-link">
          <span className="nav__link-label">İdarə paneli</span>
        </Link>
        {canSeeRequests && (
          <div className="admin-requests">
            <p className="admin-requests__label">Müraciətlər</p>
            {requests.map((r) => (
              <Link key={r.href} id={r.id} href={r.href} prefetch={false} className="nav__link admin-requests__link">
                <span className="nav__link-label">{r.label}</span>
                {r.count > 0 && (
                  <span className="admin-requests__count" aria-label={`${r.count} yeni`}>
                    {r.count}
                  </span>
                )}
              </Link>
            ))}
          </div>
        )}
        <DefaultNavClient groups={groups} navPreferences={navPreferences as never} />
        <div className="nav__controls">
          <Logout />
        </div>
      </nav>
      <div className="nav__header">
        <div className="nav__header-content">
          <NavHamburger baseClass="nav" />
        </div>
      </div>
    </NavWrapper>
  )
}
