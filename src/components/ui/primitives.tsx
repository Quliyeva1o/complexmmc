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

/* ------------------------------------------------------------------ Button (pill) */
type ButtonVariant = 'primary' | 'dark' | 'outline' | 'outlineLight'
const BUTTON: Record<ButtonVariant, string> = {
  // template: cyan with navy text → navy with white text
  primary: 'bg-primary text-on-primary hover:bg-heading hover:text-white',
  dark: 'bg-heading text-white hover:bg-primary hover:text-on-primary',
  outline: 'border border-heading/20 text-heading hover:border-heading hover:bg-heading hover:text-white',
  outlineLight: 'border border-white/40 text-white hover:bg-white hover:text-heading',
}

export function Button({
  href,
  variant = 'primary',
  children,
  className,
  ...rest
}: { href: string; variant?: ButtonVariant; children: ReactNode } & Omit<ComponentProps<typeof Link>, 'href'>) {
  return (
    <Link
      href={href}
      className={cx(
        'btn-slide inline-flex items-center justify-center rounded-[var(--radius-pill)] px-5 py-[13px] text-base leading-4 font-bold transition-colors duration-300',
        BUTTON[variant],
        className,
      )}
      {...rest}
    >
      <span>{children}</span>
      <span aria-hidden="true">{children}</span>
    </Link>
  )
}

/* ------------------------------------------------------------------ Section */
export type SectionTheme = 'light' | 'soft' | 'sand' | 'dark'
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
        'inline-flex items-center rounded-[var(--radius-badge)] px-4 py-1 text-base',
        dark ? 'bg-white/20 text-white' : 'bg-badge text-text',
      )}
    >
      {children}
    </span>
  )
}

/**
 * The one section header used across the site (style of the "Əvvəl & Sonra" header):
 * — EYEBROW — (11px, 0.28em tracking, teal lines) · 24–34px extrabold title ·
 * 48px gradient rule · 15–16px intro.
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
  const line = <span aria-hidden="true" className="inline-block h-px w-5 bg-[var(--section-eyebrow)]" />
  return (
    <header className={cx(className ?? 'mb-12 md:mb-16', center ? 'mx-auto max-w-3xl text-center' : 'max-w-3xl', align === 'split' && 'md:max-w-none')} data-reveal>
      <div className={cx(align === 'split' && 'md:flex md:items-end md:justify-between md:gap-10')}>
        <div className={cx(align === 'split' && 'max-w-3xl')}>
          {eyebrow && (
            <p className={cx('sh-eyebrow mb-5 inline-flex items-center gap-2 text-[11px] leading-none font-bold tracking-[0.28em] uppercase', dark ? 'text-primary' : 'text-[var(--section-eyebrow)]')}>
              {center && line}
              {eyebrow}
              {line}
            </p>
          )}
          {heading && (
            <H className={cx('mb-6 text-[clamp(24px,3.4vw,34px)] leading-[1.1] font-extrabold tracking-tight', dark ? 'text-white' : 'text-[var(--section-title)]')}>
              {heading.replace(/\*/g, '')}
            </H>
          )}
          <div
            aria-hidden="true"
            className={cx(
              'mb-6 h-0.5 w-12',
              center ? 'mx-auto bg-[linear-gradient(90deg,transparent,var(--section-eyebrow),transparent)]' : 'bg-[linear-gradient(90deg,var(--section-eyebrow),transparent)]',
            )}
          />
          {intro && <p className={cx('sh-intro text-[15px] leading-relaxed sm:text-[16px]', dark ? 'text-white/70' : 'text-[var(--section-intro)]')}>{intro}</p>}
        </div>
        {action && <div className={cx(align === 'split' ? 'mt-6 shrink-0 md:mt-0' : 'mt-8')}>{action}</div>}
      </div>
    </header>
  )
}
