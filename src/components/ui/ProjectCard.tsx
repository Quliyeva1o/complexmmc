import Image from 'next/image'
import Link from 'next/link'

import { UiIcon } from '@/components/icons/UiIcon'

/**
 * Template "Latest Projects" card: photo, title, a meta line (place · size · duration),
 * short description and a "View project" pill.
 */
export function ProjectCard({
  href,
  title,
  image,
  category,
  excerpt,
  facts,
  labels,
}: {
  href: string
  title: string
  image?: { src: string; alt: string } | null
  category?: string
  excerpt?: string | null
  facts: { size?: string | null; days?: number | null; place?: string | null }
  labels: { view: string; daysUnit: string }
}) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-[var(--radius-card)] bg-white shadow-[var(--shadow-card)] ring-1 ring-heading/5" data-reveal>
      <Link href={href} className="relative block aspect-[4/3] overflow-hidden bg-soft" tabIndex={-1} aria-hidden="true">
        {image && (
          <Image
            src={image.src}
            alt={image.alt}
            fill
            sizes="(min-width: 1024px) 420px, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
        )}
        {category && <span className="absolute top-4 left-4 rounded-[var(--radius-badge)] bg-white px-3 py-1 text-sm font-semibold text-heading">{category}</span>}
      </Link>
      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-xl leading-snug">
          <Link href={href} className="transition-colors hover:text-primary">
            {title}
          </Link>
        </h3>
        <p className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm">
          {facts.place && (
            <span className="flex items-center gap-1.5">
              <UiIcon name="pin" className="text-primary" />
              {facts.place}
            </span>
          )}
          {facts.size && (
            <span className="flex items-center gap-1.5">
              <UiIcon name="ruler" className="text-primary" />
              {facts.size}
            </span>
          )}
          {facts.days ? (
            <span className="flex items-center gap-1.5">
              <UiIcon name="calendar" className="text-primary" />
              {facts.days} {labels.daysUnit}
            </span>
          ) : null}
        </p>
        {excerpt && <p className="mt-3 line-clamp-3">{excerpt}</p>}
        <div className="mt-auto pt-6">
          <Link
            href={href}
            className="inline-flex min-h-[42px] items-center rounded-[var(--radius-pill)] border border-heading/15 px-5 text-sm font-bold text-heading transition-colors group-hover:border-primary group-hover:bg-primary group-hover:text-on-primary"
          >
            {labels.view}
          </Link>
        </div>
      </div>
    </article>
  )
}
