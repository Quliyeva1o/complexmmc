import Image from 'next/image'
import Link from 'next/link'

type Img = { src: string; alt: string } | null

/**
 * Template "Homepage 2" feature card: tall photo, navy gradient at the bottom,
 * on hover the card darkens and the text + button slide open.
 */
export function ServiceOverlayCard({ href, title, excerpt, image, cta }: { href: string; title: string; excerpt?: string | null; image: Img; cta: string }) {
  return (
    <article className="group relative aspect-[4/5] overflow-hidden rounded-[var(--radius-media)] bg-dark">
      {image && <Image src={image.src} alt={image.alt} fill sizes="(min-width:1024px) 420px, (min-width:768px) 50vw, 100vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />}
      <div className="absolute inset-x-0 bottom-0 h-[60%] bg-[linear-gradient(0deg,#002362,rgb(0_35_98/0))]" />
      <div className="absolute inset-0 bg-dark opacity-0 transition-opacity duration-500 group-hover:opacity-90" />
      <div className="absolute inset-x-0 bottom-0 p-8 text-left">
        <h3 className="mb-5 text-[22px] leading-tight tracking-[-0.2px] text-white md:text-[26px]">{title}</h3>
        <div className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-500 group-hover:grid-rows-[1fr] group-focus-within:grid-rows-[1fr]">
          <div className="overflow-hidden">
            {excerpt && <p className="mb-6 line-clamp-4 text-white/80">{excerpt}</p>}
            <Link href={href} className="relative z-10 inline-flex rounded-[var(--radius-pill)] border border-white/40 px-5 py-[13px] text-base leading-4 font-bold text-white transition-colors hover:border-primary hover:bg-primary hover:text-heading">
              {cta}
              <span className="sr-only">: {title}</span>
            </Link>
          </div>
        </div>
      </div>
    </article>
  )
}
