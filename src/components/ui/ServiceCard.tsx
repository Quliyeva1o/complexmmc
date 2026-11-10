import Image from 'next/image'
import Link from 'next/link'

import { CategoryIcon } from '@/components/icons/CategoryIcon'

/**
 * Template "service card" (Pooluxe All Services 1), measured 1:1: cyan 10% background, 16px radius,
 * 16:9 photo (415×233) that grows to 1.1 on hover, 60px navy circle icon centred over the photo
 * edge (−30px), 26px/1.3 title, 16/30 #5A6378 description, 20px bottom padding. Whole card links.
 */
export function ServiceCard({ href, title, excerpt, image, icon = 'pool' }: { href: string; title: string; excerpt?: string | null; image?: { src: string; alt: string } | null; icon?: string }) {
  return (
    <article className="group relative flex h-full flex-col items-center overflow-hidden rounded-[16px] bg-card-tint pb-5 text-center">
      <div className="relative aspect-[415/233] w-full overflow-hidden">
        {image && <Image src={image.src} alt={image.alt} fill sizes="(min-width:1024px) 415px, (min-width:640px) 50vw, 100vw" className="object-cover transition-transform duration-300 group-hover:scale-110 group-focus-within:scale-110" />}
      </div>
      <span className="relative z-10 -mt-[30px] mb-[15px] grid size-[60px] place-items-center rounded-full bg-header-sticky text-white">
        <CategoryIcon name={icon} className="size-5" />
      </span>
      <div className="px-5">
        <h3 className="mb-[15px] text-[22px] leading-[1.3] tracking-[-0.2px] md:text-[26px]">
          <Link href={href} className="after:absolute after:inset-0 after:z-20">
            {title}
          </Link>
        </h3>
        {excerpt && <p className="mb-[22px] line-clamp-3 leading-[30px] text-[#5A6378]">{excerpt}</p>}
      </div>
    </article>
  )
}
