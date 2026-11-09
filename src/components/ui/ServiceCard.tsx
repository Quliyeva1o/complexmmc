import Image from 'next/image'
import Link from 'next/link'

import { CategoryIcon } from '@/components/icons/CategoryIcon'

/**
 * Template "service card": cyan 10% background, 16px radius, photo on top, a 60px navy circle
 * icon overlapping the photo, centred 26px title and 16/30 description. Whole card is a link.
 */
export function ServiceCard({ href, title, excerpt, image, icon = 'pool' }: { href: string; title: string; excerpt?: string | null; image?: { src: string; alt: string } | null; icon?: string }) {
  return (
    <article className="group relative flex h-full flex-col items-center overflow-hidden rounded-[var(--radius-card)] bg-card-tint pb-5 text-center transition-shadow duration-300 hover:shadow-[var(--shadow-card)]">
      <div className="relative aspect-[4/3] w-full overflow-hidden">
        {image && <Image src={image.src} alt={image.alt} fill sizes="(min-width:1024px) 420px, (min-width:640px) 50vw, 100vw" className="object-cover transition-transform duration-[400ms] group-hover:scale-105" />}
      </div>
      <span className="relative z-10 -mt-[30px] mb-[15px] grid size-[60px] place-items-center rounded-full bg-header-sticky text-white transition-transform duration-300 group-hover:scale-110">
        <CategoryIcon name={icon} className="size-8" />
      </span>
      <h3 className="px-6 text-h4 transition-colors duration-300 group-hover:text-primary">
        <Link href={href} className="after:absolute after:inset-0 after:z-20">
          {title}
        </Link>
      </h3>
      {excerpt && <p className="mt-[15px] line-clamp-3 px-6">{excerpt}</p>}
    </article>
  )
}
