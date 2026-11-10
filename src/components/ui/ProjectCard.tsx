import Image from 'next/image'
import Link from 'next/link'

/**
 * Template project card (Pooluxe "Project Style 1"), measured 1:1:
 * 415×233 photo (15px radius, grows to 1.1 on hover) · 20px gap · 26px title ·
 * grey pills (location, "completed in N days") · 16/30 three-line excerpt.
 */
export function ProjectCard({
  href,
  title,
  image,
  excerpt,
  facts,
  labels,
}: {
  href: string
  title: string
  image?: { src: string; alt: string } | null
  /** kept for callers; the template card shows no category badge */
  category?: string
  excerpt?: string | null
  facts: { size?: string | null; days?: number | null; place?: string | null }
  labels: { view: string; daysUnit: string; completedIn?: string }
}) {
  const pill = 'inline-flex h-7 items-center rounded-full bg-soft px-3 text-xs font-medium text-heading'
  const done = facts.days ? (labels.completedIn ? labels.completedIn.replace('{n}', String(facts.days)) : `${facts.days} ${labels.daysUnit}`) : null
  return (
    <article className="group flex h-full flex-col gap-4" data-reveal>
      <Link href={href} className="relative block aspect-[415/233] overflow-hidden rounded-[var(--radius-media)] bg-soft" tabIndex={-1} aria-hidden="true">
        {image && (
          <Image
            src={image.src}
            alt={image.alt}
            fill
            sizes="(min-width: 1024px) 415px, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        )}
      </Link>
      <h3 className="text-h3">
        <Link href={href} className="transition-colors hover:text-primary-strong">
          {title}
        </Link>
      </h3>
      {(facts.place || done) && (
        <ul className="flex flex-wrap gap-2">
          {facts.place && <li className={pill}>{facts.place}</li>}
          {done && <li className={pill}>{done}</li>}
        </ul>
      )}
      {excerpt && <p className="line-clamp-3 text-card">{excerpt}</p>}
    </article>
  )
}
