'use client'

/**
 * Home sections carried over 1:1 from the old turanprojects.az design
 * ("Layihələrimiz" slider and "Əvvəl & Sonra" comparison).
 */
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useId, useRef, useState } from 'react'

type Img = { src: string; alt: string }

const Arrow = ({ d, size = 15, stroke = 'currentColor' }: { d: string; size?: number; stroke?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ width: size, height: size, stroke }} aria-hidden="true">
    <path d={d} />
  </svg>
)

/* ------------------------------------------------------------------ Projects slider */
export type ProjectSlide = { title: string; excerpt?: string | null; href: string; image: Img }

export function ProjectsShowcase({ slides, viewLabel, interval = 2000 }: { slides: ProjectSlide[]; viewLabel: string; interval?: number }) {
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)
  const [cursor, setCursor] = useState<{ x: number; y: number } | null>(null)
  const router = useRouter()
  const n = slides.length
  // Auto-advance is driven by the active progress bar's CSS animation ending,
  // so hover-pause freezes bar and timer together (and reduced motion stops both).

  const s = slides[active]
  if (!s) return null
  const pad = (x: number) => String(x).padStart(2, '0')

  return (
    <div className="flex flex-col items-stretch gap-10 lg:flex-row lg:gap-16">
      <div className="order-2 flex flex-1 flex-col justify-center lg:order-1 lg:max-w-[420px]" aria-live="polite">
        <div key={active} className="op-text-in">
          <span className="mb-4 inline-block text-xs font-bold tracking-widest text-primary-strong">
            {pad(active + 1)} / {pad(n)}
          </span>
          <h3 className="mb-4 text-h3 text-[var(--color-heading)]">{s.title}</h3>
          {s.excerpt && <p className="mb-8 text-card text-muted">{s.excerpt}</p>}
          <Link href={s.href} className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--color-primary-strong)]">
            {viewLabel}
            <span className="sr-only">: {s.title}</span>
            <Arrow d="M5 12h14M13 6l6 6-6 6" />
          </Link>
        </div>
        {n > 1 && (
          <div className="mt-10 flex items-center gap-2.5">
            {slides.map((sl, i) => (
              <button
                key={sl.href + i}
                type="button"
                aria-label={sl.title}
                aria-current={i === active || undefined}
                onClick={() => setActive(i)}
                className="group relative flex min-h-11 flex-1 cursor-pointer items-center border-0 bg-transparent p-0"
              >
                <span className="relative block h-[3px] w-full overflow-hidden rounded-full bg-[rgba(18,34,59,0.1)] group-hover:bg-[rgba(18,34,59,0.18)]">
                  <span
                    key={i === active ? `run-${active}` : 'idle'}
                    className={`absolute inset-y-0 left-0 rounded-full bg-[var(--color-primary-strong)] ${i < active ? 'w-full' : i === active ? 'op-bar-run w-0' : 'w-0'}`}
                    style={i === active ? { ['--op-dur' as string]: `${interval}ms`, animationPlayState: paused ? 'paused' : 'running' } : undefined}
                    onAnimationEnd={i === active ? () => setActive((a) => (a + 1) % n) : undefined}
                  />
                </span>
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="order-1 flex-1 lg:order-2" onMouseEnter={() => setPaused(true)} onMouseLeave={() => { setPaused(false); setCursor(null) }}>
        <div
          role="link"
          tabIndex={-1}
          aria-hidden="true"
          onClick={() => router.push(s.href)}
          onMouseMove={(e) => {
            const r = e.currentTarget.getBoundingClientRect()
            setCursor({ x: e.clientX - r.left - 23, y: e.clientY - r.top - 23 })
          }}
          className="relative block w-full cursor-none"
        >
          <span
            className="pointer-events-none absolute top-0 left-0 z-10 flex size-[46px] items-center justify-center rounded-full bg-white/85 shadow-[0_8px_24px_rgba(10,30,48,0.18)] backdrop-blur-[2px] transition-[transform,opacity] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
            style={{ opacity: cursor ? 1 : 0, transform: `translate(${cursor?.x ?? 0}px, ${cursor?.y ?? 0}px)` }}
          >
            <Arrow d="M9 6l6 6-6 6" size={16} stroke="var(--color-heading)" />
          </span>
          <div key={active} className="op-image-in relative overflow-hidden rounded-2xl">
            <Image src={s.image.src} alt={s.image.alt} width={900} height={560} sizes="(min-width:1024px) 760px, 100vw" className="h-[320px] w-full object-cover sm:h-[420px] lg:h-[480px]" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent" />
          </div>
        </div>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ Before / After */
export type BAPairT = { title: string; caption?: string | null; before: Img; after: Img }

export function BeforeAfterTuran({
  pairs,
  prompt,
  labels,
}: {
  pairs: BAPairT[]
  prompt?: string
  labels: { before: string; after: string; drag: string; stages: string }
}) {
  const [active, setActive] = useState(0)
  const [pos, setPos] = useState(50)
  const [dragging, setDragging] = useState(false)
  const box = useRef<HTMLDivElement>(null)
  const id = useId()
  const p = pairs[active]
  if (!p) return null

  const move = (clientX: number) => {
    const r = box.current?.getBoundingClientRect()
    if (!r) return
    setPos(Math.min(100, Math.max(0, ((clientX - r.left) / r.width) * 100)))
  }

  return (
    <>
      {pairs.length > 1 && (
        <div className="mb-7" data-reveal>
          {prompt && (
            <p className="mb-3.5 flex items-center justify-center gap-2 text-sm font-bold text-[var(--color-heading)]">
              {prompt}
              <span className="ba-picker-arrow text-[var(--color-primary-strong)]" aria-hidden="true">
                →
              </span>
            </p>
          )}
          <div className="flex flex-wrap justify-center gap-3.5" role="tablist">
            {pairs.map((pp, i) => {
              const on = i === active
              return (
                <button
                  key={pp.title + i}
                  type="button"
                  role="tab"
                  aria-selected={on}
                  onClick={() => {
                    setActive(i)
                    setPos(50)
                  }}
                  className="group flex w-[108px] cursor-pointer flex-col items-center gap-2 border-0 bg-transparent p-0"
                >
                  <span
                    className={`relative inline-block h-[78px] w-[108px] overflow-hidden rounded-xl border-[2.5px] transition-[border-color,transform,box-shadow] duration-200 group-hover:-translate-y-[3px] ${on ? 'border-[var(--color-primary-strong)] shadow-[0_8px_20px_rgba(11,154,166,0.28)]' : 'border-[rgba(18,34,59,0.1)] group-hover:border-[rgba(11,154,166,0.5)]'}`}
                  >
                    <Image src={pp.after.src} alt="" fill sizes="108px" className="object-cover" />
                    <span className={`absolute top-1.5 left-1.5 flex size-5 items-center justify-center rounded-full text-[11px] font-bold text-white backdrop-blur-[4px] ${on ? 'bg-[var(--color-primary-strong)]' : 'bg-[rgba(18,34,59,0.65)]'}`}>{i + 1}</span>
                  </span>
                  <span className={`text-center text-xs leading-[1.3] font-bold transition-colors ${on ? 'text-[var(--color-heading)]' : 'text-muted'}`}>{pp.title}</span>
                </button>
              )
            })}
          </div>
        </div>
      )}

      <div data-reveal>
        <div
          ref={box}
          className="group/ba relative aspect-video w-full touch-pan-y overflow-hidden rounded-[var(--radius-sm)] shadow-[0_10px_30px_rgba(18,34,59,0.08)] select-none"
          onPointerDown={(e) => {
            ;(e.target as HTMLElement).setPointerCapture?.(e.pointerId)
            setDragging(true)
            move(e.clientX)
          }}
          onPointerMove={(e) => e.buttons === 1 && move(e.clientX)}
          onPointerUp={() => setDragging(false)}
        >
          <Image src={p.after.src} alt={p.after.alt} fill sizes="(min-width:1008px) 912px, 100vw" className="object-cover" />
          <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
            <Image src={p.before.src} alt={p.before.alt} fill sizes="(min-width:1008px) 912px, 100vw" className="object-cover" />
          </div>
          <div className="pointer-events-none absolute inset-y-0 w-[3px] -translate-x-1/2 bg-white shadow-[0_0_12px_rgba(0,0,0,0.3)]" style={{ left: `${pos}%` }}>
            <span
              className={`absolute top-1/2 left-1/2 flex size-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center gap-0.5 rounded-full bg-white text-[var(--color-heading)] shadow-[0_4px_20px_rgba(0,0,0,0.25)] transition-[transform,box-shadow] duration-150 group-hover/ba:scale-110 group-hover/ba:shadow-[0_6px_28px_rgba(0,0,0,0.3)] ${dragging ? 'scale-110' : ''}`}
            >
              <Arrow d="M15 6l-6 6 6 6" size={14} />
              <Arrow d="M9 6l6 6-6 6" size={14} />
            </span>
          </div>
          <span className="pointer-events-none absolute bottom-3.5 left-4 rounded-full bg-black/55 px-3 py-[5px] text-xs font-bold tracking-[0.04em] text-white uppercase backdrop-blur-md">{labels.before}</span>
          <span className="pointer-events-none absolute right-4 bottom-3.5 rounded-full bg-black/55 px-3 py-[5px] text-xs font-bold tracking-[0.04em] text-white uppercase backdrop-blur-md">{labels.after}</span>
          <span className="ba-hint pointer-events-none absolute top-3.5 left-1/2 flex -translate-x-1/2 items-center gap-[5px] rounded-full bg-[rgba(18,34,59,0.7)] px-3 py-[5px] text-xs font-medium whitespace-nowrap text-white/90 backdrop-blur-md" aria-hidden="true">
            ↔ {labels.drag}
          </span>
          {/* keyboard + screen-reader control */}
          <label htmlFor={id} className="sr-only">
            {labels.drag}
          </label>
          <input id={id} type="range" min={0} max={100} value={Math.round(pos)} onChange={(e) => setPos(Number(e.target.value))} className="absolute inset-0 h-full w-full cursor-col-resize opacity-0" />
        </div>
        <div className="mt-4 text-center">
          <p className="text-base font-bold text-[var(--color-heading)]">{p.title}</p>
          <p className="mt-0.5 text-sm text-muted">{p.caption || labels.stages}</p>
        </div>
      </div>
    </>
  )
}
