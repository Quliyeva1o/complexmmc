import Image from 'next/image'
import Link from 'next/link'

/**
 * Catalogue product card: product photo on a soft panel (cut-outs and tiles both read well),
 * category line, 20px title, "from" price. Whole card links. Same radius/spacing as the template cards.
 */
export function ProductCard({ href, title, image, category, price }: { href: string; title: string; image?: { src: string; alt: string } | null; category?: string | null; price?: string | null }) {
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-[var(--radius-card)] border border-border bg-white transition-shadow duration-[var(--duration)] hover:shadow-card">
      <div className="relative aspect-[4/3] overflow-hidden bg-soft">
        {image && <Image src={image.src} alt={image.alt} fill sizes="(min-width:1024px) 300px, (min-width:640px) 45vw, 100vw" className="object-contain p-4 transition-transform duration-300 group-hover:scale-105" />}
      </div>
      <div className="flex flex-1 flex-col gap-2 p-5">
        {category && <p className="text-label text-primary-strong uppercase">{category}</p>}
        <h3 className="text-h4">
          <Link href={href} className="after:absolute after:inset-0">
            {title}
          </Link>
        </h3>
        {price && <p className="mt-auto pt-2 font-display text-h4 text-heading">{price}</p>}
      </div>
    </article>
  )
}
