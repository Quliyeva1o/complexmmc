import Link from 'next/link'

import { CategoryIcon } from '@/components/icons/CategoryIcon'
import { cx } from '@/components/ui/primitives'

export type StripItem = { href: string; label: string; icon: string; title?: string }

/**
 * Category icon strip right under the hero (client's request). A white card row that overlaps
 * the bottom of the hero; each item links to the category's main (pillar) page.
 * Mobile: horizontal snap-scroll; desktop: one row.
 */
export function CategoryStrip({ items, label, overlapHero = true }: { items: StripItem[]; label: string; overlapHero?: boolean }) {
  return (
    <nav aria-label={label} className={cx('relative z-10', overlapHero && '-mt-20')}>
      <div className="container-x">
        <ul className="flex snap-x snap-mandatory gap-2 overflow-x-auto rounded-[var(--radius-card)] bg-white p-3 shadow-[var(--shadow-card)] [scrollbar-width:none] lg:grid lg:grid-cols-9 lg:overflow-visible">
          {items.map((it) => (
            <li key={it.href} className="w-28 shrink-0 snap-start lg:w-auto">
              <Link
                href={it.href}
                title={it.title ?? it.label}
                className="group flex h-full flex-col items-center gap-3 rounded-[0.75rem] px-2 pt-5 pb-4 text-center transition-colors duration-300 hover:bg-primary-soft focus-visible:bg-primary-soft"
              >
                <CategoryIcon name={it.icon} className="h-12 w-12 text-primary transition-transform duration-300 group-hover:-translate-y-1" />
                <span className="font-display text-sm leading-tight font-bold text-heading">{it.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}
