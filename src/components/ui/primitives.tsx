import Link from 'next/link'
import type { ComponentProps, ElementType, ReactNode } from 'react'

export const cx = (...c: (string | false | null | undefined)[]) => c.filter(Boolean).join(' ')

/* ------------------------------------------------------------------ Two-tone heading text */
/**
 * Template-style headings show their second part in the accent colour.
 * Editors mark that part with asterisks in admin: "Bakıda *hovuz tikintisi*".
 */
export function TwoTone({ text }: { text?: string | null }) {
  if (!text) return null
  const parts = text.split(/\*([^*]+)\*/g)
  if (parts.length === 1) {
    // no marker: accent the last word (or last two on longer headings), like the template
    const words = text.trim().split(/\s+/)
    if (words.length < 3) return <>{text}</>
    const n = words.length >= 5 ? 2 : 1
    return (
      <>
        {words.slice(0, -n).join(' ')} <span className="text-accent">{words.slice(-n).join(' ')}</span>
      </>
    )
  }
  return (
    <>
      {parts.map((p, i) =>
        i % 2 === 1 ? (
          <span key={i} className="text-accent">
            {p}
          </span>
        ) : (
          p
        ),
      )}
    </>
  )
}
export const plain = (text?: string | null) => (text ?? '').replace(/\*/g, '')

/* ------------------------------------------------------------------ Button (pill, turanprojects style) */
type ButtonVariant = 'primary' | 'dark' | 'outline' | 'outlineLight' | 'glass'
const BUTTON: Record<ButtonVariant, { base: string; icon: string }> = {
  primary: { base: 'bg-primary text-on-primary hover:bg-primary-hover', icon: 'bg-white/35' },
  dark: { base: 'bg-heading text-white hover:bg-dark-2', icon: 'bg-white/15' },
  outline: { base: 'border border-heading/15 text-heading hover:border-heading/40 hover:bg-heading/[0.03]', icon: 'bg-heading/[0.06]' },
  // on photos / dark sections: frosted glass with a hairline border
  outlineLight: { base: 'border border-white/30 bg-white/10 text-white backdrop-blur-md hover:bg-white/20', icon: 'bg-white/15' },
  glass: { base: 'border border-white/30 bg-white/10 text-white backdrop-blur-md hover:bg-white/20', icon: 'bg-white/15' },
}

export function ArrowIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={cx('size-4', className)} fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5 12h14" />
      <path d="m13 6 6 6-6 6" />
    </svg>
  )
}

/** Classes of the site button, for <button>s that can't use the <Button> link. */
export const buttonClass = (variant: ButtonVariant = 'primary', arrow = true) =>
  cx(
    'group/btn inline-flex min-h-12 max-w-full items-center justify-center gap-3 rounded-[var(--radius-pill)] py-1.5 text-[15px] leading-tight font-semibold transition-[background-color,border-color,color,opacity] duration-[var(--duration)] disabled:opacity-60',
    arrow ? 'pr-1.5 pl-6' : 'px-6',
    BUTTON[variant].base,
  )

/** The inside of a site button: label + arrow in a circle that nudges forward on hover. */
export function ButtonContent({ children, variant = 'primary', arrow = true }: { children: ReactNode; variant?: ButtonVariant; arrow?: boolean }) {
  return (
    <>
      <span className="min-w-0">{children}</span>
      {arrow && (
        <span className={cx('grid size-9 shrink-0 place-items-center rounded-full transition-transform duration-[var(--duration)] ease-[var(--ease)] group-hover/btn:translate-x-0.5', BUTTON[variant].icon)}>
          <ArrowIcon />
        </span>
      )}
    </>
  )
}

/**
 * One button for the whole site: 48px pill, 15px semibold label, and (by default) the arrow in a
 * circle on the right that nudges forward on hover — the turanprojects.az button.
 */
export function Button({
  href,
  variant = 'primary',
  arrow = true,
  children,
  className,
  ...rest
}: { href: string; variant?: ButtonVariant; arrow?: boolean; children: ReactNode } & Omit<ComponentProps<typeof Link>, 'href'>) {
  return (
    <Link href={href} className={cx(buttonClass(variant, arrow), className)} {...rest}>
      <ButtonContent variant={variant} arrow={arrow}>
        {children}
      </ButtonContent>
    </Link>
  )
}

/* ------------------------------------------------------------------ Form fields */
/** One input style site-wide: 48px, 8px radius, hairline border, soft focus ring. */
export const FIELD =
  'w-full rounded-[var(--radius-sm)] border border-border bg-white px-4 text-[15px] text-heading outline-none transition-[border-color,box-shadow] duration-[var(--duration-fast)] placeholder:text-muted/80 hover:border-heading/25 focus:border-primary-strong focus:ring-4 focus:ring-primary/15'
export const FIELD_LABEL = 'text-sm font-medium text-heading'

/* ------------------------------------------------------------------ Section */
export type SectionTheme = 'light' | 'soft' | 'sand' | 'dark'
/** Background (+ text colours for dark) of a section theme — also for blocks that render their own <section>. */
export const sectionTone = (t: SectionTheme = 'light') => THEME[t]
const THEME: Record<SectionTheme, string> = {
  light: 'bg-bg',
  soft: 'bg-soft',
  sand: 'bg-soft',
  dark: 'bg-dark text-on-dark-muted [&_h2]:text-white [&_h3]:text-white [&_h4]:text-white [&_h6]:text-white [&_.sh-eyebrow]:text-primary [&_.sh-intro]:text-white/70',
}

export function Section({
  theme = 'light',
  id,
  className,
  children,
  as: Tag = 'section',
  bleed = false,
}: {
  theme?: SectionTheme
  id?: string
  className?: string
  children: ReactNode
  as?: ElementType
  bleed?: boolean
}) {
  return (
    <Tag id={id} className={cx('py-[var(--section-y)]', THEME[theme], className)}>
      {bleed ? children : <div className="container-x">{children}</div>}
    </Tag>
  )
}

/* ------------------------------------------------------------------ Eyebrow badge + header */
export function Eyebrow({ children, dark = false }: { children: ReactNode; dark?: boolean }) {
  return (
    <span
      className={cx(
        'inline-flex h-7 items-center rounded-[var(--radius-pill)] px-3 text-label uppercase',
        dark ? 'bg-white/15 text-white' : 'bg-primary-soft text-primary-strong',
      )}
    >
      {children}
    </span>
  )
}

/**
 * The one section header used across the site (style of the "Əvvəl & Sonra" header), on the
 * design-system rhythm: — EYEBROW — (12px label, teal lines) · 16px · H2 (34→26px) · 16px ·
 * 40px rule · 16px · intro (16px muted). 40–48px to the content below.
 */
export function SectionHeader({
  eyebrow,
  heading,
  intro,
  as: H = 'h2',
  align = 'center',
  dark = false,
  action,
  className,
}: {
  eyebrow?: string | null
  heading?: string | null
  intro?: string | null
  as?: 'h1' | 'h2' | 'h3'
  /** "split" is kept for older blocks and renders like "start" with the action beside it */
  align?: 'start' | 'center' | 'split'
  dark?: boolean
  action?: ReactNode
  /** overrides the default bottom margin */
  className?: string
}) {
  if (!heading && !eyebrow && !intro) return null
  const center = align === 'center'
  const line = <span aria-hidden="true" className="inline-block h-px w-4 bg-[var(--section-eyebrow)]" />
  return (
    <header className={cx(className ?? 'mb-[var(--space-header-content)]', center ? 'mx-auto max-w-2xl text-center' : 'max-w-2xl', align === 'split' && 'md:max-w-none')} data-reveal>
      <div className={cx(align === 'split' && 'md:flex md:items-end md:justify-between md:gap-10')}>
        <div className={cx(align === 'split' && 'max-w-2xl')}>
          {eyebrow && (
            <p className={cx('sh-eyebrow mb-4 inline-flex items-center gap-2.5 text-label uppercase', dark ? 'text-primary' : 'text-[var(--section-eyebrow)]')}>
              {center && line}
              {eyebrow}
              {line}
            </p>
          )}
          {heading && (
            <H className={cx('text-h2', dark ? 'text-white' : 'text-[var(--section-title)]')}>
              {heading.replace(/\*/g, '')}
            </H>
          )}
          <div
            aria-hidden="true"
            className={cx(
              'mt-4 h-0.5 w-10 rounded-full',
              center ? 'mx-auto bg-[linear-gradient(90deg,transparent,var(--section-eyebrow),transparent)]' : 'bg-[linear-gradient(90deg,var(--section-eyebrow),transparent)]',
            )}
          />
          {intro && <p className={cx('sh-intro mt-4 text-base', dark ? 'text-white/70' : 'text-[var(--section-intro)]')}>{intro}</p>}
        </div>
        {action && <div className={cx(align === 'split' ? 'mt-6 shrink-0 md:mt-0' : 'mt-8')}>{action}</div>}
      </div>
    </header>
  )
}
