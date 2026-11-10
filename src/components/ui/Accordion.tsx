'use client'

import { createContext, type ReactNode, useContext, useId, useState } from 'react'

import { UiIcon } from '@/components/icons/UiIcon'
import { cx } from '@/components/ui/primitives'

/**
 * FAQ accordion (PLAN.md §11 step 7): only one answer is open per group — opening another closes
 * the previous one — and both move with a smooth ~300ms height animation (grid-rows 0fr ↔ 1fr).
 * Answers stay in the HTML when closed (good for SEO / FAQPage data), just inert and collapsed.
 */
type Group = { open: string | null; toggle: (id: string) => void }
const GroupCtx = createContext<Group | null>(null)

export function AccordionGroup({ children, defaultOpen = null, className }: { children: ReactNode; defaultOpen?: string | null; className?: string }) {
  const [open, setOpen] = useState<string | null>(defaultOpen)
  return (
    <GroupCtx.Provider value={{ open, toggle: (id) => setOpen((cur) => (cur === id ? null : id)) }}>
      <div className={className}>{children}</div>
    </GroupCtx.Provider>
  )
}

export function AccordionItem({
  id,
  question,
  children,
  variant = 'card',
}: {
  id: string
  question: string
  children: ReactNode
  /** card = bordered box (FAQ lists); line = divider rows (FAQ next to the form) */
  variant?: 'card' | 'line'
}) {
  const group = useContext(GroupCtx)
  const [solo, setSolo] = useState(false)
  const open = group ? group.open === id : solo
  const toggle = () => (group ? group.toggle(id) : setSolo((o) => !o))
  const uid = useId()
  return (
    <div
      className={cx(
        'transition-colors duration-[var(--duration)]',
        variant === 'card' ? cx('rounded-[var(--radius-card)] border bg-white', open ? 'border-heading/20' : 'border-border hover:border-heading/20') : 'py-1',
      )}
    >
      <h3 className="text-base">
        <button
          type="button"
          id={`${uid}-q`}
          aria-expanded={open}
          aria-controls={`${uid}-a`}
          onClick={toggle}
          className={cx('flex w-full cursor-pointer items-center justify-between gap-4 text-left font-display text-[17px] leading-snug font-semibold text-heading', variant === 'card' ? 'px-5 py-4 md:px-6' : 'py-4')}
        >
          {question}
          <span
            aria-hidden="true"
            className={cx(
              'grid size-8 shrink-0 place-items-center rounded-full transition-[transform,background-color,color] duration-[var(--duration)] ease-[var(--ease)]',
              open ? 'rotate-45 bg-heading text-white' : 'bg-soft text-heading',
            )}
          >
            <UiIcon name="plus" />
          </span>
        </button>
      </h3>
      <div
        id={`${uid}-a`}
        role="region"
        aria-labelledby={`${uid}-q`}
        inert={!open}
        className="grid transition-[grid-template-rows,opacity] duration-[var(--duration)] ease-[var(--ease)]"
        style={{ gridTemplateRows: open ? '1fr' : '0fr', opacity: open ? 1 : 0 }}
      >
        <div className="overflow-hidden">
          <div className={cx('text-card', variant === 'card' ? 'px-5 pb-5 md:pr-14 md:pl-6' : 'pr-12 pb-5')}>{children}</div>
        </div>
      </div>
    </div>
  )
}
