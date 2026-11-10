'use client'

import { useDocumentInfo } from '@payloadcms/ui'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

import { bakuDate } from './date'

/**
 * Requests (form submissions) in admin — PLAN.md §12, step 4:
 *  - KindCell / StatusCell: coloured pills in the list;
 *  - RequestCard: the request as a readable card (call / WhatsApp, page, every answer) at the top
 *    of the detail page; opening a "Yeni" request marks it "Baxıldı".
 */
const KIND: Record<string, string> = { contact: 'Əlaqə', quote: 'Qiymət' }
const STATUS: Record<string, string> = { new: 'Yeni', seen: 'Baxıldı', done: 'Cavablandı' }
const LABEL: Record<string, string> = { name: 'Ad', phone: 'Telefon', email: 'E-poçt', message: 'Mesaj', page: 'Səhifə' }
const HIDDEN = new Set(['kind'])
const digits = (p?: string | null) => (p ?? '').replace(/[^\d+]/g, '')

export function KindCell({ cellData }: { cellData?: unknown }) {
  const v = String(cellData ?? 'contact')
  return <span className={`cmmc-pill cmmc-pill--${v}`}>{KIND[v] ?? v}</span>
}

export function StatusCell({ cellData }: { cellData?: unknown }) {
  const v = String(cellData ?? 'new')
  return <span className={`cmmc-pill cmmc-pill--${v}`}>{STATUS[v] ?? v}</span>
}

type Doc = {
  id: number
  name?: string
  phone?: string
  page?: string
  kind?: string
  status?: string
  createdAt: string
  submissionData?: { field: string; value: string }[]
}

export function RequestCard() {
  const { id } = useDocumentInfo()
  const router = useRouter()
  const [doc, setDoc] = useState<Doc | null>(null)

  useEffect(() => {
    if (!id) return
    let alive = true
    fetch(`/api/form-submissions/${id}?depth=0`, { credentials: 'include' })
      .then((r) => (r.ok ? r.json() : null))
      .then(async (d: Doc | null) => {
        if (!alive || !d) return
        setDoc(d)
        if (d.status === 'new') {
          // opened = seen; refresh so the sidebar status field shows it too
          const res = await fetch(`/api/form-submissions/${id}`, {
            method: 'PATCH',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ status: 'seen' }),
          })
          if (res.ok && alive) router.refresh()
        }
      })
      .catch(() => {})
    return () => {
      alive = false
    }
  }, [id, router])

  if (!id || !doc) return null
  const rows = (doc.submissionData ?? []).filter((r) => r.value && !HIDDEN.has(r.field))
  const when = bakuDate(doc.createdAt, true)
  return (
    <div className="cmmc-reqcard">
      <div className="cmmc-reqcard__head">
        <div>
          <p className="cmmc-reqcard__name">{doc.name || 'Adsız'}</p>
          <p className="cmmc-reqcard__meta">
            <span className={`cmmc-pill cmmc-pill--${doc.kind ?? 'contact'}`}>{KIND[doc.kind ?? 'contact']}</span>
            <span>{when}</span>
            {doc.page && (
              <a href={doc.page} target="_blank" rel="noopener noreferrer">
                {doc.page}
              </a>
            )}
          </p>
        </div>
        {doc.phone && (
          <div className="cmmc-req__actions">
            <a href={`tel:${digits(doc.phone)}`} className="cmmc-icon-btn">
              Zəng et · {doc.phone}
            </a>
            <a href={`https://wa.me/${digits(doc.phone).replace('+', '')}`} target="_blank" rel="noopener noreferrer" className="cmmc-icon-btn cmmc-icon-btn--wa">
              WhatsApp
            </a>
          </div>
        )}
      </div>
      <dl className="cmmc-reqcard__rows">
        {rows.map((r) => (
          <div key={r.field}>
            <dt>{LABEL[r.field] ?? r.field}</dt>
            <dd>{r.value}</dd>
          </div>
        ))}
      </dl>
      <p className="cmmc-reqcard__hint">Statusu sağ paneldə dəyişin: zəng etdikdən sonra «Cavablandı» seçin.</p>
    </div>
  )
}
