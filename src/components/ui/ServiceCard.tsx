import Image from 'next/image'
import Link from 'next/link'

/**
 * Template "service card" (Pooluxe All Services 1), measured 1:1: cyan 10% background, 16px radius,
 * 16:9 photo (415×233) that grows to 1.1 on hover, 60px navy circle icon centred over the photo
 * edge (−30px), 26px/1.3 title, 16/30 #5A6378 description, 20px bottom padding. Whole card links.
 */
export function ServiceCard({ href, title, excerpt, image }: { href: string; title: string; excerpt?: string | null; image?: { src: string; alt: string } | null; /** kept for callers; the template shows the same arrow on every card */ icon?: string }) {
  return (
    <article className="group relative flex h-full flex-col items-center overflow-hidden rounded-[var(--radius-card)] bg-card-tint pb-4 text-center">
      <div className="relative aspect-[415/233] w-full overflow-hidden">
        {image && <Image src={image.src} alt={image.alt} fill sizes="(min-width:1024px) 415px, (min-width:640px) 50vw, 100vw" className="object-cover transition-transform duration-300 group-hover:scale-105 group-focus-within:scale-105" />}
      </div>
      <span className="relative z-10 -mt-6 mb-4 grid size-12 place-items-center rounded-full bg-header-sticky text-white">
        {/* template card icon: the same diagonal "go" arrow on every card */}
        <svg viewBox="0 0 24 24" className="size-[18px]" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M6 18 18 6" />
          <path d="M9 6h9v9" />
        </svg>
      </span>
      <div className="px-[var(--card-pad)]">
        <h3 className="mb-2 text-h3">
          <Link href={href} className="after:absolute after:inset-0 after:z-20">
            {title}
          </Link>
        </h3>
        {excerpt && <p className="mb-4 line-clamp-3 text-card text-muted">{excerpt}</p>}
      </div>
    </article>
  )
}
