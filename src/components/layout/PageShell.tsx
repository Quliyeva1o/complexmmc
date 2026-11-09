import type { ReactNode } from 'react'

import type { Locale } from '@/i18n/config'
import { FloatingActions, SiteFooter, SiteHeader } from './SiteChrome'

/** Header + main + footer for every public page. */
export function PageShell({
  locale,
  alternates,
  overlayHeader = false,
  children,
}: {
  locale: Locale
  alternates?: Partial<Record<Locale, string>>
  overlayHeader?: boolean
  children: ReactNode
}) {
  return (
    <>
      <SiteHeader locale={locale} alternates={alternates} overlay={overlayHeader} />
      <main id="main" className={overlayHeader ? undefined : 'pt-20'}>
        {children}
      </main>
      <SiteFooter locale={locale} />
      <FloatingActions locale={locale} />
    </>
  )
}
