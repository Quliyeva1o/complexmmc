'use client'

import Image from 'next/image'
import { type FormEvent, type ReactNode, useId, useRef, useState } from 'react'

import { UiIcon } from '@/components/icons/UiIcon'
import { cx } from '@/components/ui/primitives'

/* ------------------------------------------------------------------ Before / After comparison slider */
export type BAPair = { title: string; caption?: string; before: { src: string; alt: string }; after: { src: string; alt: string } }

export function BeforeAfterSlider({ pairs, labels }: { pairs: BAPair[]; labels: { before: string; after: string; drag: string } }) {
  const [active, setActive] = useState(0)
  const [pos, setPos] = useState(50)
  const box = useRef<HTMLDivElement>(null)
  const id = useId()
  const p = pairs[active]
  if (!p) return null

  const move = (clientX: number) => {
    const r = box.current?.getBoundingClientRect()
    if (!r) return
    setPos(Math.min(100, Math.max(0, ((clientX - r.left) / r.width) * 100)))
  }

  return (
    <div>
      <div
        ref={box}
        className="relative aspect-[16/9] w-full touch-pan-y overflow-hidden rounded-[var(--radius-media)] select-none md:aspect-[992/450]"
        onPointerDown={(e) => {
          ;(e.target as HTMLElement).setPointerCapture?.(e.pointerId)
          move(e.clientX)
        }}
        onPointerMove={(e) => e.buttons === 1 && move(e.clientX)}
      >
        <Image src={p.after.src} alt={p.after.alt} fill sizes="(min-width:1320px) 1260px, 100vw" className="object-cover" />
        <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
          <Image src={p.before.src} alt={p.before.alt} fill sizes="(min-width:1320px) 1260px, 100vw" className="object-cover" />
        </div>
        <span className="absolute top-4 left-4 rounded-[var(--radius-badge)] bg-heading/80 px-4 py-1 text-sm font-semibold text-white">{labels.before}</span>
        <span className="absolute top-4 right-4 rounded-[var(--radius-badge)] bg-primary px-4 py-1 text-sm font-semibold text-on-primary">{labels.after}</span>
        <div className="pointer-events-none absolute inset-y-0 w-0.5 bg-white" style={{ left: `${pos}%` }}>
          <span className="absolute top-1/2 left-1/2 grid size-12 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white text-heading shadow-[var(--shadow-card)]">
            <UiIcon name="chevron" className="-scale-x-100" />
            <UiIcon name="chevron" className="-ml-3" />
          </span>
        </div>
        {/* keyboard + screen-reader control */}
        <label htmlFor={id} className="sr-only">
          {labels.drag}
        </label>
        <input
          id={id}
          type="range"
          min={0}
          max={100}
          value={Math.round(pos)}
          onChange={(e) => setPos(Number(e.target.value))}
          className="absolute inset-x-0 bottom-0 h-full w-full cursor-ew-resize opacity-0"
        />
      </div>

      {pairs.length > 1 && (
        <ul className="mt-6 flex snap-x gap-3 overflow-x-auto pb-1 [scrollbar-width:none]">
          {pairs.map((pp, i) => (
            <li key={pp.title} className="shrink-0 snap-start">
              <button
                type="button"
                onClick={() => {
                  setActive(i)
                  setPos(50)
                }}
                aria-pressed={i === active}
                className={cx(
                  'flex items-center gap-3 rounded-[var(--radius-pill)] border py-1.5 pr-5 pl-1.5 text-sm font-semibold transition-colors',
                  i === active ? 'border-primary bg-primary text-on-primary' : 'border-border bg-white text-heading hover:border-primary',
                )}
              >
                <span className="relative size-9 overflow-hidden rounded-full">
                  <Image src={pp.after.src} alt="" fill sizes="36px" className="object-cover" />
                </span>
                {pp.title}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

/* ------------------------------------------------------------------ Pill tabs (template "Complete Solutions") */
export function PillTabs({ tabs }: { tabs: { id: string; label: string; content: ReactNode }[] }) {
  const [active, setActive] = useState(0)
  const base = useId()
  return (
    <div>
      <div role="tablist" className="mb-10 flex flex-wrap justify-center gap-3">
        {tabs.map((t, i) => (
          <button
            key={t.id}
            role="tab"
            id={`${base}-t${i}`}
            aria-selected={i === active}
            aria-controls={`${base}-p${i}`}
            onClick={() => setActive(i)}
            className={cx(
              'rounded-[var(--radius-badge)] px-6 py-2.5 font-display font-bold transition-colors',
              i === active ? 'bg-primary text-on-primary' : 'bg-badge text-heading hover:bg-primary-soft',
            )}
          >
            {t.label}
          </button>
        ))}
      </div>
      {tabs.map((t, i) => (
        <div key={t.id} role="tabpanel" id={`${base}-p${i}`} aria-labelledby={`${base}-t${i}`} hidden={i !== active}>
          {t.content}
        </div>
      ))}
    </div>
  )
}

/* ------------------------------------------------------------------ Filterable grid (projects by category) */
export function FilterGrid({
  filters,
  items,
  allLabel,
  className,
}: {
  filters: { key: string; label: string }[]
  items: { key: string; cats: string[]; node: ReactNode }[]
  allLabel: string
  className?: string
}) {
  const [f, setF] = useState<string | null>(null)
  const shown = f ? items.filter((i) => i.cats.includes(f)) : items
  return (
    <div>
      {filters.length > 1 && (
        <div className="mb-10 flex flex-wrap justify-center gap-3" role="group">
          {[{ key: '', label: allLabel }, ...filters].map((x) => (
            <button
              key={x.key || 'all'}
              type="button"
              aria-pressed={(f ?? '') === x.key}
              onClick={() => setF(x.key || null)}
              className={cx(
                'rounded-[var(--radius-badge)] px-5 py-2 font-display text-sm font-bold transition-colors',
                (f ?? '') === x.key ? 'bg-primary text-on-primary' : 'bg-badge text-heading hover:bg-primary-soft',
              )}
            >
              {x.label}
            </button>
          ))}
        </div>
      )}
      <ul className={className}>
        {shown.map((i) => (
          <li key={i.key}>{i.node}</li>
        ))}
      </ul>
    </div>
  )
}

/* ------------------------------------------------------------------ Short lead form (FAQ side / contact) */
export function LeadForm({
  formId,
  labels,
  compact = false,
  withEmail = false,
  variant = 'default',
}: {
  formId: number | string
  labels: { name: string; phone: string; message: string; send: string; sending: string; sent: string; error: string; email?: string }
  compact?: boolean
  withEmail?: boolean
  /** "template" = Pooluxe contact form: stacked 46px fields, full-width pill button */
  variant?: 'default' | 'template'
}) {
  const [state, setState] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')
  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const fd = new FormData(e.currentTarget)
    if (fd.get('website')) return // honeypot
    setState('sending')
    try {
      const res = await fetch('/api/form-submissions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          form: formId,
          submissionData: ['name', 'phone', ...(withEmail ? ['email'] : []), 'message']
            .map((field) => ({ field, value: String(fd.get(field) ?? '') }))
            .concat([{ field: 'page', value: window.location.pathname }]),
        }),
      })
      setState(res.ok ? 'sent' : 'error')
    } catch {
      setState('error')
    }
  }
  if (state === 'sent')
    return (
      <p role="status" className="rounded-[var(--radius-card)] bg-primary-soft p-6 font-semibold text-heading">
        {labels.sent}
      </p>
    )
  if (variant === 'template') {
    const tf = 'w-full rounded-[4px] border border-[#D1D5DB] bg-black/[0.024] p-2.5 text-[14px] leading-[24px] text-[#111827] outline-none transition-colors placeholder:text-[#6b7280] focus:border-primary'
    return (
      <form onSubmit={onSubmit} className="flex flex-col">
        <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
        <div className="flex flex-col gap-4">
          <input name="name" required placeholder={labels.name} aria-label={labels.name} className={cx(tf, 'h-[46px]')} autoComplete="name" />
          {withEmail && <input name="email" type="email" placeholder={labels.email} aria-label={labels.email} className={cx(tf, 'h-[46px]')} autoComplete="email" />}
          <input name="phone" required type="tel" placeholder={labels.phone} aria-label={labels.phone} className={cx(tf, 'h-[46px]')} autoComplete="tel" />
          <textarea name="message" placeholder={labels.message} aria-label={labels.message} className={cx(tf, 'h-[100px] resize-y')} />
        </div>
        <button
          type="submit"
          disabled={state === 'sending'}
          className="mt-2.5 w-full rounded-[25px] bg-primary px-5 py-1.5 text-base leading-[30px] font-bold text-heading transition-colors duration-300 hover:bg-dark hover:text-white disabled:opacity-60"
        >
          {state === 'sending' ? labels.sending : labels.send}
        </button>
        {state === 'error' && (
          <p role="alert" className="mt-3 text-sm text-red-700">
            {labels.error}
          </p>
        )}
      </form>
    )
  }
  const field = 'w-full rounded-[var(--radius-sm)] border border-border bg-white px-4 py-3 text-heading outline-none transition-colors placeholder:text-muted focus:border-primary'
  return (
    <form onSubmit={onSubmit} className="grid gap-4">
      <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
      <div className={cx('grid gap-4', !compact && 'sm:grid-cols-2')}>
        <input name="name" required placeholder={labels.name} aria-label={labels.name} className={field} autoComplete="name" />
        <input name="phone" required type="tel" placeholder={labels.phone} aria-label={labels.phone} className={field} autoComplete="tel" />
      </div>
      {withEmail && <input name="email" type="email" placeholder={labels.email} aria-label={labels.email} className={field} autoComplete="email" />}
      <textarea name="message" rows={compact ? 3 : 5} placeholder={labels.message} aria-label={labels.message} className={field} />
      <button
        type="submit"
        disabled={state === 'sending'}
        className="inline-flex min-h-[46px] items-center justify-center rounded-[var(--radius-pill)] bg-primary px-8 font-bold text-on-primary transition-colors hover:bg-primary-hover disabled:opacity-60"
      >
        {state === 'sending' ? labels.sending : labels.send}
      </button>
      {state === 'error' && (
        <p role="alert" className="text-sm text-red-700">
          {labels.error}
        </p>
      )}
    </form>
  )
}

