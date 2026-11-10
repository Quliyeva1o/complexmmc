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
  const pill = 'inline-flex items-center rounded-[25px] bg-soft px-[15px] py-2 text-[14px] leading-[14px]'
  const done = facts.days ? (labels.completedIn ? labels.completedIn.replace('{n}', String(facts.days)) : `${facts.days} ${labels.daysUnit}`) : null
  return (
    <article className="group flex h-full flex-col gap-5" data-reveal>
      <Link href={href} className="relative block aspect-[415/233] overflow-hidden rounded-[15px] bg-soft" tabIndex={-1} aria-hidden="true">
        {image && (
          <Image
            src={image.src}
            alt={image.alt}
            fill
            sizes="(min-width: 1024px) 415px, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-300 group-hover:scale-110"
          />
        )}
      </Link>
      <h3 className="text-[22px] leading-none tracking-normal md:text-[26px]">
        <Link href={href} className="leading-[1.2]">
          {title}
        </Link>
      </h3>
      {(facts.place || done) && (
        <ul className="flex flex-wrap gap-[15px]">
          {facts.place && <li className={pill}>{facts.place}</li>}
          {done && <li className={pill}>{done}</li>}
        </ul>
      )}
      {excerpt && <p className="line-clamp-3 leading-[30px]">{excerpt}</p>}
    </article>
  )
}
