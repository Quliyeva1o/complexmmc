import { Gutter } from '@payloadcms/ui'
import Link from 'next/link'
import type { Payload } from 'payload'

import { bakuDate } from './date'

/**
 * Admin home (PLAN.md §12, step 3): what the team does every day, in that order —
 * new requests (with one-click call / WhatsApp), quick "add" actions, recently edited projects.
 */
type Props = { payload: Payload; user?: { name?: string | null; email?: string } | null }

const A = '/admin'
const SUB = `${A}/collections/form-submissions`
const fmt = (d: string) => bakuDate(d)
const digits = (p?: string | null) => (p ?? '').replace(/[^\d+]/g, '')
const KIND: Record<string, string> = { contact: 'Əlaqə', quote: 'Qiymət' }
const STATUS: Record<string, string> = { new: 'Yeni', seen: 'Baxıldı', done: 'Cavablandı' }

type Sub = { id: number; name?: string | null; phone?: string | null; kind?: string | null; status?: string | null; page?: string | null; createdAt: string }
type Proj = { id: number; title?: string | null; _status?: string | null; updatedAt: string }

const ICONS: Record<string, string> = {
  mail: 'M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Zm18 3-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7',
  coins: 'M14 8A6 6 0 1 1 2 8a6 6 0 0 1 12 0Zm4.1 2.4A6 6 0 1 1 10.3 18M7 6h1v4m8.7 3.9.7.7-2.8 2.8',
  inbox: 'M22 12h-6l-2 3h-4l-2-3H2m3.5-6.9L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.5-6.9A2 2 0 0 0 16.8 4H7.2a2 2 0 0 0-1.7 1.1Z',
  folder: 'M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.7-.9l-.8-1.2A2 2 0 0 0 7.9 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z',
}
function StatIcon({ name }: { name: string }) {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d={ICONS[name]} />
    </svg>
  )
}

export async function AdminDashboard({ payload, user }: Props) {
  const since = new Date(Date.now() - 30 * 864e5).toISOString()
  const count = (where: object) => payload.count({ collection: 'form-submissions', overrideAccess: true, where: where as never }).then((r) => r.totalDocs)
  const has = (slug: string) => payload.config.collections.some((c) => c.slug === slug)

  const [newContact, newQuote, month, latest, projects, projectCount] = await Promise.all([
    count({ and: [{ kind: { equals: 'contact' } }, { status: { equals: 'new' } }] }),
    count({ and: [{ kind: { equals: 'quote' } }, { status: { equals: 'new' } }] }),
    count({ createdAt: { greater_than: since } }),
    payload.find({ collection: 'form-submissions', overrideAccess: true, depth: 0, limit: 6, sort: '-createdAt' }).then((r) => r.docs as unknown as Sub[]),
    payload.find({ collection: 'projects', overrideAccess: true, depth: 0, limit: 5, sort: '-updatedAt', draft: true }).then((r) => r.docs as unknown as Proj[]),
    payload.count({ collection: 'projects', overrideAccess: true, where: { _status: { equals: 'published' } } }).then((r) => r.totalDocs),
  ])

  const stats = [
    { icon: 'mail', label: 'Yeni əlaqə müraciəti', value: newContact, href: `${SUB}?where[kind][equals]=contact&where[status][equals]=new`, accent: newContact > 0 },
    { icon: 'coins', label: 'Yeni qiymət müraciəti', value: newQuote, href: `${SUB}?where[kind][equals]=quote&where[status][equals]=new`, accent: newQuote > 0 },
    { icon: 'inbox', label: 'Son 30 gündə müraciət', value: month, href: SUB },
    { icon: 'folder', label: 'Dərc olunmuş layihə', value: projectCount, href: `${A}/collections/projects` },
  ]
  const actions = [
    { label: 'Yeni layihə', href: `${A}/collections/projects/create` },
    has('before-after') && { label: 'Əvvəl & Sonra əlavə et', href: `${A}/collections/before-after/create` },
    { label: 'Yeni məhsul', href: `${A}/collections/products/create` },
    { label: 'Yeni bloq yazısı', href: `${A}/collections/posts/create` },
  ].filter(Boolean) as { label: string; href: string }[]

  const hello = user?.name?.split(' ')[0]

  return (
    <Gutter className="cmmc-dash">
      <header className="cmmc-dash__head">
        <div>
          <h1>{hello ? `Salam, ${hello}` : 'İdarə paneli'}</h1>
          <p>Yeni müraciətlər, tez əməliyyatlar və son dəyişikliklər.</p>
        </div>
        <a className="btn btn--style-secondary btn--size-medium" href="/" target="_blank" rel="noopener noreferrer">
          Sayta bax ↗
        </a>
      </header>

      <section className="cmmc-dash__stats" aria-label="Göstəricilər">
        {stats.map((s) => (
          <Link key={s.label} href={s.href} prefetch={false} className={`cmmc-stat${s.accent ? ' cmmc-stat--accent' : ''}`}>
            <span className="cmmc-stat__icon" aria-hidden="true">
              <StatIcon name={s.icon} />
            </span>
            <span className="cmmc-stat__value">{s.value}</span>
            <span className="cmmc-stat__label">{s.label}</span>
          </Link>
        ))}
      </section>

      <div className="cmmc-dash__grid">
        <section className="cmmc-panel">
          <div className="cmmc-panel__head">
            <h2>Son müraciətlər</h2>
            <Link href={SUB} prefetch={false}>Hamısı →</Link>
          </div>
          {latest.length === 0 ? (
            <p className="cmmc-empty">Hələ müraciət yoxdur.</p>
          ) : (
            <ul className="cmmc-list">
              {latest.map((r) => (
                <li key={r.id} className="cmmc-req">
                  <Link href={`${SUB}/${r.id}`} prefetch={false} className="cmmc-req__main">
                    <span className="cmmc-req__name">{r.name || 'Adsız'}</span>
                    <span className="cmmc-req__meta">
                      <span className={`cmmc-pill cmmc-pill--${r.kind ?? 'contact'}`}>{KIND[r.kind ?? 'contact']}</span>
                      <span className={`cmmc-pill cmmc-pill--${r.status ?? 'new'}`}>{STATUS[r.status ?? 'new']}</span>
                      <span>{fmt(r.createdAt)}</span>
                    </span>
                  </Link>
                  {r.phone && (
                    <span className="cmmc-req__actions">
                      <a href={`tel:${digits(r.phone)}`} className="cmmc-icon-btn" title="Zəng et">
                        {r.phone}
                      </a>
                      <a href={`https://wa.me/${digits(r.phone).replace('+', '')}`} target="_blank" rel="noopener noreferrer" className="cmmc-icon-btn cmmc-icon-btn--wa" title="WhatsApp">
                        WhatsApp
                      </a>
                    </span>
                  )}
                </li>
              ))}
            </ul>
          )}
        </section>

        <div className="cmmc-dash__side">
          <section className="cmmc-panel">
            <div className="cmmc-panel__head">
              <h2>Tez əməliyyatlar</h2>
            </div>
            <div className="cmmc-actions">
              {actions.map((a) => (
                <Link key={a.href} href={a.href} prefetch={false} className="cmmc-action">
                  <span aria-hidden="true">+</span>
                  {a.label}
                </Link>
              ))}
            </div>
          </section>

          <section className="cmmc-panel">
            <div className="cmmc-panel__head">
              <h2>Son dəyişdirilən layihələr</h2>
              <Link href={`${A}/collections/projects`} prefetch={false}>Hamısı →</Link>
            </div>
            <ul className="cmmc-list">
              {projects.map((p) => (
                <li key={p.id}>
                  <Link href={`${A}/collections/projects/${p.id}`} prefetch={false} className="cmmc-proj">
                    <span>{p.title}</span>
                    <span className={`cmmc-pill cmmc-pill--${p._status === 'published' ? 'done' : 'draft'}`}>{p._status === 'published' ? 'Dərc olunub' : 'Dərc gözləyir'}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </Gutter>
  )
}
