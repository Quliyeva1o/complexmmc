import type { MetadataRoute } from 'next'

const SITE = (process.env.NEXT_PUBLIC_SERVER_URL || 'https://complexmmc.az').replace(/\/$/, '')

/** /robots.txt — public site open to all crawlers; admin, API and internal previews closed. */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        // uploaded images are served from /api/media/file/* — keep them crawlable for Google Images
        allow: ['/', '/api/media/file/'],
        disallow: ['/admin', '/api/', '/preview/', '/en/preview/', '/ru/preview/', '/next/'],
      },
    ],
    sitemap: `${SITE}/sitemap.xml`,
    host: SITE,
  }
}
