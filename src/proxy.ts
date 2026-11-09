import { NextResponse, type NextRequest } from 'next/server'

import { defaultLocale, localeCodes } from './i18n/config'

/**
 * Locale routing:
 *  /about        -> internally rewritten to /az/about (AZ has no prefix — old URLs keep working)
 *  /en/about     -> served as-is
 *  /az/about     -> 308 to /about (avoid duplicate URLs)
 */
export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl
  const first = pathname.split('/')[1]

  if (first === defaultLocale) {
    const url = req.nextUrl.clone()
    url.pathname = pathname.replace(/^\/az(?=\/|$)/, '') || '/'
    return NextResponse.redirect(url, 308)
  }

  if ((localeCodes as string[]).includes(first)) return NextResponse.next()

  const url = req.nextUrl.clone()
  url.pathname = `/${defaultLocale}${pathname === '/' ? '' : pathname}`
  return NextResponse.rewrite(url)
}

export const config = {
  // Skip admin, API, Next internals, uploaded media and files with an extension.
  matcher: ['/((?!admin|api|_next|media|next|.*\\..*).*)'],
}
