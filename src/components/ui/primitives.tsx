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
  primary: 'bg-primary text-on-primary hover:bg-primary-hover',
  dark: 'bg-heading text-white hover:bg-dark-2',
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
        'inline-flex min-h-[46px] items-center justify-center gap-2 rounded-[var(--radius-pill)] px-6 text-base leading-none font-bold transition-colors duration-300',
        BUTTON[variant],
        className,
      )}
      {...rest}
    >
      {children}
    </Link>
  )
}

/* ------------------------------------------------------------------ Section */
export type SectionTheme = 'light' | 'soft' | 'sand' | 'dark'
const THEME: Record<SectionTheme, string> = {
  light: 'bg-bg',
  soft: 'bg-soft',
  sand: 'bg-soft',
  dark: 'bg-dark text-on-dark-muted [&_h2]:text-white [&_h3]:text-white [&_h4]:text-white [&_h6]:text-white',
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

export function SectionHeader({
  eyebrow,
  heading,
  intro,
  as: H = 'h2',
  align = 'center',
  dark = false,
  action,
}: {
  eyebrow?: string | null
  heading?: string | null
  intro?: string | null
  as?: 'h1' | 'h2' | 'h3'
  align?: 'start' | 'center' | 'split'
  dark?: boolean
  action?: ReactNode
}) {
  if (!heading && !eyebrow && !intro) return null
  if (align === 'split') {
    // heading left, intro/action right — used above grids
    return (
      <header className="mb-12 grid gap-6 md:mb-16 md:grid-cols-2 md:items-end" data-reveal>
        <div>
          {eyebrow && <Eyebrow dark={dark}>{eyebrow}</Eyebrow>}
          {heading && (
            <H className="mt-5">
              <TwoTone text={heading} />
            </H>
          )}
        </div>
        <div className="md:justify-self-end md:text-right">
          {intro && <p className={cx('max-w-xl', dark ? 'text-on-dark-muted' : 'text-text')}>{intro}</p>}
          {action && <div className="mt-6">{action}</div>}
        </div>
      </header>
    )
  }
  return (
    <header className={cx('mb-12 md:mb-16', align === 'center' ? 'mx-auto max-w-3xl text-center' : 'max-w-3xl')} data-reveal>
      {eyebrow && <Eyebrow dark={dark}>{eyebrow}</Eyebrow>}
      {heading && (
        <H className="mt-5">
          <TwoTone text={heading} />
        </H>
      )}
      {intro && <p className={cx('mt-5', dark ? 'text-on-dark-muted' : 'text-text')}>{intro}</p>}
      {action && <div className="mt-8">{action}</div>}
    </header>
  )
}
