'use client'

import { useEffect, useState } from 'react'

/**
 * TEMPORARY design-review control (PLAN.md §11 step 2): a floating "Palitra" button that swaps the
 * site palette (data-palette on <html>, values in tokens.css) and remembers the choice in this
 * browser. Remove this component and PALETTE_SCRIPT once the client has picked a palette.
 */
const PALETTES = [
  { id: 'okean', name: 'Okean', colors: ['#26cadd', '#122844', '#0f2440'] },
  { id: 'laguna', name: 'Laguna', colors: ['#3aa8e0', '#10233d', '#0d2a4a'] },
  { id: 'turan', name: 'Turan', colors: ['#0b9aa6', '#122844', '#f4f7f9'] },
  { id: 'mermer', name: 'Mərmər', colors: ['#5fa8a3', '#1f2a30', '#f6f4f0'] },
  { id: 'gece', name: 'Gecə', colors: ['#d4a64a', '#141a26', '#f7f6f2'] },
] as const

const KEY = 'cmmc-palette'

/** Runs in <head> before first paint so a saved palette never flashes the default one. */
export const PALETTE_SCRIPT = `try{var p=localStorage.getItem('${KEY}');if(p==='okean')delete document.documentElement.dataset.palette;else if(p)document.documentElement.dataset.palette=p}catch(e){}`

export function PalettePicker() {
  const [open, setOpen] = useState(false)
  const [current, setCurrent] = useState('okean')

  useEffect(() => {
    setCurrent(document.documentElement.dataset.palette || 'okean')
  }, [])

  const pick = (id: string) => {
    if (id === 'okean') delete document.documentElement.dataset.palette
    else document.documentElement.dataset.palette = id
    try {
      localStorage.setItem(KEY, id)
    } catch {}
    setCurrent(id)
  }

  return (
    <div className="fixed bottom-5 left-16 z-[80] flex flex-col items-start gap-2">
      {open && (
        <div role="radiogroup" aria-label="Palitra" className="w-56 rounded-[var(--radius-card)] border border-border bg-white p-2 shadow-card">
          {PALETTES.map((p) => (
            <button
              key={p.id}
              type="button"
              role="radio"
              aria-checked={current === p.id}
              onClick={() => pick(p.id)}
              className={`flex w-full items-center gap-3 rounded-[var(--radius-sm)] px-3 py-2.5 text-left text-sm text-heading transition-colors duration-[var(--duration-fast)] ${current === p.id ? 'bg-soft font-semibold' : 'hover:bg-soft'}`}
            >
              <span className="flex -space-x-1.5">
                {p.colors.map((c) => (
                  <span key={c} className="size-5 rounded-full border-2 border-white" style={{ background: c }} />
                ))}
              </span>
              {p.name}
            </button>
          ))}
        </div>
      )}
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="inline-flex h-11 items-center gap-2 rounded-full bg-heading px-4 text-sm font-semibold text-white shadow-card"
      >
        <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
          <path d="M12 3a9 9 0 1 0 0 18c1.1 0 1.5-.8 1.5-1.6 0-1.2-1-1.6-1-2.6 0-.9.7-1.6 1.6-1.6H16a5 5 0 0 0 5-5C21 6.3 17 3 12 3Z" />
          <circle cx="7.5" cy="11" r="1" fill="currentColor" />
          <circle cx="10" cy="7" r="1" fill="currentColor" />
          <circle cx="15" cy="7.5" r="1" fill="currentColor" />
        </svg>
        Palitra
      </button>
    </div>
  )
}
