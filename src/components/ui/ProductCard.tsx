import Image from 'next/image'
import Link from 'next/link'

/**
 * Catalogue product card: product photo on a soft panel (cut-outs and tiles both read well),
 * category line, 20px title, "from" price. Whole card links. Same radius/spacing as the template cards.
 */
export function ProductCard({ href, title, image, category, price }: { href: string; title: string; image?: { src: string; alt: string } | null; category?: string | null; price?: string | null }) {
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-[15px] bg-white ring-1 ring-[#E5E7EB] transition-shadow duration-300 hover:shadow-[0_10px_30px_rgba(18,34,59,0.08)]">
      <div className="relative aspect-[4/3] overflow-hidden bg-soft">
        {image && <Image src={image.src} alt={image.alt} fill sizes="(min-width:1024px) 300px, (min-width:640px) 45vw, 100vw" className="object-contain p-4 transition-transform duration-300 group-hover:scale-105" />}
      </div>
      <div className="flex flex-1 flex-col gap-2 p-5">
        {category && <p className="text-[12px] font-bold tracking-[0.12em] text-[var(--section-eyebrow)] uppercase">{category}</p>}
        <h3 className="text-[18px] leading-[1.3] tracking-normal">
          <Link href={href} className="after:absolute after:inset-0">
            {title}
          </Link>
        </h3>
        {price && <p className="mt-auto pt-2 font-display text-[18px] font-bold text-heading">{price}</p>}
      </div>
    </article>
  )
}
