import Image from 'next/image'
import Link from 'next/link'

import type { Locale } from '@/i18n/config'

type Img = { src: string; alt: string } | null

const INTL: Record<Locale, string> = { az: 'az-Latn-AZ', en: 'en-GB', ru: 'ru-RU' }

export const formatDate = (iso: string | null | undefined, locale: Locale) =>
  iso ? new Intl.DateTimeFormat(INTL[locale], { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'Asia/Baku' }).format(new Date(iso)) : ''

const dayMonth = (iso: string, locale: Locale) => {
  const d = new Date(iso)
  const month = new Intl.DateTimeFormat(INTL[locale], { month: 'short', timeZone: 'Asia/Baku' }).format(d).replace('.', '')
  const day = new Intl.DateTimeFormat('en-GB', { day: '2-digit', timeZone: 'Asia/Baku' }).format(d)
  return { day, month: month.charAt(0).toUpperCase() + month.slice(1) }
}

export function CalendarIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 448 512" className={className} aria-hidden="true" fill="currentColor" width="14" height="16">
      <path d="M148 288h-40c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12zm108-12v-40c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12h40c6.6 0 12-5.4 12-12zm96 0v-40c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12h40c6.6 0 12-5.4 12-12zm-96 96v-40c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12h40c6.6 0 12-5.4 12-12zm-96 0v-40c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12h40c6.6 0 12-5.4 12-12zm192 0v-40c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12h40c6.6 0 12-5.4 12-12zm96-260v352c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V112c0-26.5 21.5-48 48-48h48V12c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v52h128V12c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v52h48c26.5 0 48 21.5 48 48zm-48 346V160H48v298c0 3.3 2.7 6 6 6h340c3.3 0 6-2.7 6-6z" />
    </svg>
  )
}

/** Author line: 20px avatar (photo or initial) + name. */
export function AuthorMeta({ name, photo }: { name: string; photo?: Img }) {
  return (
    <span className="inline-flex items-center gap-1.5">
      {photo ? (
        <Image src={photo.src} alt="" width={20} height={20} className="size-5 rounded-full object-cover" />
      ) : (
        <span className="grid size-5 place-items-center rounded-full bg-primary text-[10px] font-bold text-heading" aria-hidden="true">
          {name.charAt(0)}
        </span>
      )}
      {name}
    </span>
  )
}

/** Template "Blog" grid card (Pooluxe blog page): 415×276 image, glass date badge, title, excerpt, meta. */
export function PostCard({
  href,
  title,
  excerpt,
  image,
  date,
  author,
  locale,
  headingLevel = 'h2',
}: {
  href: string
  title: string
  excerpt?: string | null
  image: Img
  date?: string | null
  author: { name: string; photo?: Img }
  locale: Locale
  headingLevel?: 'h2' | 'h3'
}) {
  const H = headingLevel
  const dm = date ? dayMonth(date, locale) : null
  return (
    <article className="relative">
      <Link href={href} tabIndex={-1} aria-hidden="true" className="group/img relative block aspect-[415/276] overflow-hidden rounded-[var(--radius-media)] bg-soft">
        {image && (
          <Image
            src={image.src}
            alt={image.alt}
            fill
            sizes="(min-width:1024px) 415px, (min-width:640px) 50vw, 100vw"
            className="object-cover transition-transform duration-500 group-hover/img:scale-105"
          />
        )}
      </Link>
      {dm && (
        <div className="pointer-events-none absolute top-0 right-0 m-4 rounded-[var(--radius-sm)] bg-white/90 px-3 py-2 text-center text-heading backdrop-blur-md" aria-hidden="true">
          <span className="block font-display text-lg leading-none font-bold">{dm.day}</span>
          <span className="mt-1 block text-xs leading-none">{dm.month}</span>
        </div>
      )}
      <H className="mt-5 mb-3 text-h4">
        <Link href={href} className="transition-colors duration-300 hover:text-primary-strong">
          {title}
        </Link>
      </H>
      {excerpt && <p className="line-clamp-3 text-card">{excerpt}</p>}
      <ul className="mt-4 inline-flex flex-wrap items-center text-sm leading-none text-muted">
        <li>
          <AuthorMeta name={author.name} photo={author.photo} />
        </li>
        {date && (
          <li className="ml-2.5 inline-flex items-center gap-[5px] pl-2.5">
            <CalendarIcon className="relative top-px" />
            <time dateTime={date}>{formatDate(date, locale)}</time>
          </li>
        )}
      </ul>
    </article>
  )
}
