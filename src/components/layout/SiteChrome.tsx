import Link from 'next/link'

import { UiIcon } from '@/components/icons/UiIcon'
import { type Locale, locales, localePrefix } from '@/i18n/config'
import { t } from '@/i18n/dictionary'
import { findDocs, getGlobal } from '@/lib/data'
import { mediaProps } from '@/lib/media'
import { docPath, resolveLink } from '@/lib/urls'
import type { Category, Footer as FooterT, Header as HeaderT, Media, ServiceArea, SiteSetting } from '@/payload-types'
import { HeaderClient, type NavItem } from './HeaderClient'

const telHref = (n: string) => `tel:${n.replace(/[^\d+]/g, '')}`

/* ------------------------------------------------------------------ Header */
export async function SiteHeader({
  locale,
  alternates,
  overlay = false,
}: {
  locale: Locale
  /** Same page in other languages: { az: '/about', en: '/en/about', ru: '/ru/about' } */
  alternates?: Partial<Record<Locale, string>>
  overlay?: boolean
}) {
  const [header, settings] = await Promise.all([
    getGlobal<HeaderT>('header', locale, 2),
    getGlobal<SiteSetting>('site-settings', locale, 1),
  ])
  const d = t(locale)
  const nav: NavItem[] = (header.nav ?? [])
    .map((item) => {
      const link = resolveLink(item.link as never, locale)
      if (!link) return null
      return {
        href: link.href,
        label: link.label,
        children: (item.children ?? [])
          .map((c) => resolveLink(c.link as never, locale))
          .filter(Boolean)
          .map((c) => ({ href: c!.href, label: c!.label })),
      }
    })
    .filter(Boolean) as NavItem[]

  const logo = mediaProps(settings.logo as Media)
  const logoLight = mediaProps(settings.logoLight as Media)
  const cta = resolveLink(header.cta as never, locale)

  return (
    <HeaderClient
      brand={settings.companyName}
      homeHref={localePrefix(locale) || '/'}
      logo={logo ? { src: logo.src, srcLight: logoLight?.src } : null}
      nav={nav}
      cta={cta}
      overlay={overlay}
      menuLabel={{ open: d.menuOpen, close: d.menuClose, lang: d.language }}
      languages={locales.map((l) => ({
        code: l.code,
        label: l.label,
        href: alternates?.[l.code] ?? (localePrefix(l.code) || '/'),
        active: l.code === locale,
      }))}
    />
  )
}

/* ------------------------------------------------------------------ Footer */
export async function SiteFooter({ locale }: { locale: Locale }) {
  const [footer, s, cats, areas] = await Promise.all([
    getGlobal<FooterT>('footer', locale, 2),
    getGlobal<SiteSetting>('site-settings', locale, 1),
    findDocs<Category>('categories', locale, { depth: 0, where: { _status: { equals: 'published' } } }),
    findDocs<ServiceArea>('service-areas', locale, { depth: 0, where: { _status: { equals: 'published' } } }),
  ])
  const d = t(locale)
  const year = new Date().getFullYear()

  const columnLinks = (col: NonNullable<FooterT['columns']>[number]) => {
    if (col.source === 'categories') return cats.map((c) => ({ href: docPath('categories', c.slug, locale), label: c.shortName }))
    if (col.source === 'service-areas') return areas.map((a) => ({ href: docPath('service-areas', a.slug, locale), label: a.district }))
    return (col.links ?? []).map((l) => resolveLink(l.link as never, locale)).filter(Boolean) as { href: string; label: string }[]
  }

  return (
    <footer className="bg-dark text-on-dark-muted">
      <div className="container-x grid gap-12 py-20 md:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_1fr_1.3fr]">
        <div>
          <Link href={localePrefix(locale) || '/'} className="font-display text-2xl font-extrabold tracking-tight text-white">
            Complex<span className="text-primary"> MMC</span>
          </Link>
          {footer.about && <p className="mt-5 max-w-xs">{footer.about}</p>}
          {s.socials && s.socials.length > 0 && (
            <ul className="mt-6 flex gap-3" aria-label={d.follow}>
              {s.socials.map((so) => (
                <li key={so.url}>
                  <a href={so.url} target="_blank" rel="noopener noreferrer" className="inline-flex h-10 items-center rounded-full bg-white/10 px-4 text-sm font-semibold text-white capitalize transition-colors hover:bg-primary hover:text-heading">
                    {so.network}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>

        {(footer.columns ?? []).map((col) => (
          <div key={col.id ?? col.title}>
            <h2 className="font-display text-xl font-bold text-white">{col.title}</h2>
            <ul className="mt-5 space-y-2 text-[0.95rem]">
              {columnLinks(col).map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="transition-colors hover:text-primary">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div>
          <h2 className="font-display text-xl font-bold text-white">{d.contact}</h2>
          <ul className="mt-5 space-y-4 text-[0.95rem]">
            {s.address && (
              <li className="flex gap-3">
                <UiIcon name="pin" className="mt-1.5 shrink-0 text-primary" />
                <span>
                  {s.address}
                  {s.addressNote && <span className="block text-sm text-white/55">{s.addressNote}</span>}
                </span>
              </li>
            )}
            {(s.phones ?? []).slice(0, 3).map((p) => (
              <li key={p.number} className="flex gap-3">
                <UiIcon name="phone" className="mt-1.5 shrink-0 text-primary" />
                <a href={telHref(p.number)} className="font-semibold text-white transition-colors hover:text-primary">
                  {p.number}
                </a>
              </li>
            ))}
            {s.email && (
              <li className="flex gap-3">
                <UiIcon name="chat" className="mt-1.5 shrink-0 text-primary" />
                <a href={`mailto:${s.email}`} className="transition-colors hover:text-primary">
                  {s.email}
                </a>
              </li>
            )}
            {s.openingHours?.[0] && (
              <li className="flex gap-3">
                <UiIcon name="clock" className="mt-1.5 shrink-0 text-primary" />
                <span>
                  {s.openingHours[0].opens}–{s.openingHours[0].closes}
                  {s.hoursNote && <span className="block text-sm text-white/55">{s.hoursNote}</span>}
                </span>
              </li>
            )}
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-x flex flex-col gap-3 py-6 text-sm md:flex-row md:items-center md:justify-between">
          <p>{(footer.copyright ?? `© {year} Complex MMC. ${d.allRights}`).replace('{year}', String(year))}</p>
          <ul className="flex gap-6">
            {(footer.legalLinks ?? []).map((l) => {
              const r = resolveLink(l.link as never, locale)
              return r ? (
                <li key={r.href}>
                  <Link href={r.href} className="hover:text-primary">
                    {r.label}
                  </Link>
                </li>
              ) : null
            })}
          </ul>
        </div>
      </div>
    </footer>
  )
}

/* ------------------------------------------------------------------ Floating actions */
export async function FloatingActions({ locale }: { locale: Locale }) {
  const s = await getGlobal<SiteSetting>('site-settings', locale, 1)
  const d = t(locale)
  if (!s.floatingWhatsapp || !s.whatsapp) return null
  return (
    <a
      href={`https://wa.me/${s.whatsapp.replace(/\D/g, '')}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={d.whatsapp}
      className="fixed right-5 bottom-5 z-40 grid size-14 place-items-center rounded-full bg-primary text-2xl text-on-primary shadow-[var(--shadow-card)] transition-transform hover:scale-105"
    >
      <UiIcon name="chat" />
    </a>
  )
}
