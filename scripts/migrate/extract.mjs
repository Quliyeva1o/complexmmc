/**
 * Stage 2 — content extraction from the downloaded turanprojects.az HTML.
 *
 *   node scripts/migrate/extract.mjs <downloadDir> [outFile]
 *
 * <downloadDir> must contain sitemap.json + html/*.html (made by the downloader).
 * Output: structured JSON (src/seed/data/turan.json by default) consumed by src/seed/index.ts.
 * Brand names are rewritten to "Complex MMC" here (see BRAND_RULES).
 */
import * as cheerio from 'cheerio'
import { readFile, writeFile, mkdir } from 'node:fs/promises'
import path from 'node:path'

const [, , dir, outArg] = process.argv
if (!dir) throw new Error('usage: extract.mjs <downloadDir> [outFile]')
const OUT = outArg ?? path.resolve('src/seed/data/turan.json')

/* ------------------------------------------------------------------ brand */
const BRAND_RULES = [
  [/Turan İnşaat 21 MMC/g, 'Complex MMC'],
  [/Turan İnşaat MMC/g, 'Complex MMC'],
  [/Turan Construction LLC/g, 'Complex MMC'],
  [/Turan İnşaat(?! MMC)/g, 'Complex MMC'],
  [/TURAN İNŞAAT/g, 'COMPLEX MMC'],
  [/TURAN CONSTRUCTION/g, 'COMPLEX MMC'],
  [/Turan Construction/g, 'Complex MMC'],
  [/Turan Projects/g, 'Complex MMC'],
  [/(https?:\/\/)?www\.turanprojects\.az/g, 'https://complexmmc.az'],
  // bare domain in prose ("turanprojects.az saytından") — keep @handles, emails and instagram/tiktok URLs
  [/(?<![@/\w.])turanprojects\.az/g, 'complexmmc.az'],
  // Cloudflare-obfuscated e-mail -> real address (from the old site's JSON-LD)
  [/<a href="\/cdn-cgi\/l\/email-protection[^"]*">\[email(&nbsp;|\s)protected\]<\/a>/g, '<a href="mailto:office@turanprojects.az">office@turanprojects.az</a>'],
]
const brand = (s) => (typeof s === 'string' ? BRAND_RULES.reduce((t, [re, to]) => t.replace(re, to), s) : s)
const deepBrand = (v) =>
  Array.isArray(v) ? v.map(deepBrand) : v && typeof v === 'object'
    ? Object.fromEntries(Object.entries(v).map(([k, x]) => [k, deepBrand(x)]))
    : brand(v)

/* ------------------------------------------------------------------ helpers */
const txt = (s) => (s ?? '').replace(/\s+/g, ' ').trim()

/** /_next/image?url=%2Fassets%2Fx.webp&w=… -> /assets/x.webp */
const imgSrc = (src) => {
  if (!src) return null
  const m = src.match(/[?&]url=([^&]+)/)
  return m ? decodeURIComponent(m[1]) : src
}

const fileFor = (loc) => path.join(dir, 'html', (loc === '/' ? '_root' : loc.slice(1).replace(/\//g, '__')) + '.html')

/** Turn decorative "✓ / • / 1 + text" div grids into real lists, then strip to semantic HTML. */
function cleanHtml($, el) {
  const $el = $(el).clone()
  $el.find('script,style,svg,button,nav,aside,form,template,[aria-hidden="true"]').remove()
  $el.find('a[aria-label^="Bütün"],a[aria-label^="All"],a[aria-label^="Все"]').remove()

  // <li><span>✓</span><span>text</span></li> -> <li>text</li>
  $el.find('li').each((_, li) => {
    const spans = $(li).children('span')
    if (spans.length >= 2 && $(li).children().length === spans.length) {
      $(li).html(spans.slice(1).map((__, s) => $(s).html()).get().join(' '))
    }
  })
  // <div><div><span>1</span><p>..</p></div>…</div> -> <ol>/<ul>
  $el.find('div').each((_, d) => {
    const kids = $(d).children()
    if (kids.length < 2) return
    const items = kids.toArray().filter((k) => k.tagName === 'div' && $(k).children('p').length === 1)
    if (items.length !== kids.length) return
    const ordered = items.every((k) => /^\d+$/.test(txt($(k).children('span').first().text())))
    const li = items.map((k) => `<li>${$(k).children('p').html()}</li>`).join('')
    $(d).replaceWith(ordered ? `<ol>${li}</ol>` : `<ul>${li}</ul>`)
  })

  // unwrap layout wrappers, keep semantic tags only
  const KEEP = new Set(['p', 'h2', 'h3', 'h4', 'ul', 'ol', 'li', 'strong', 'b', 'em', 'i', 'a', 'blockquote', 'table', 'thead', 'tbody', 'tr', 'th', 'td', 'br', 'img'])
  let changed = true
  while (changed) {
    changed = false
    $el.find('*').each((_, n) => {
      if (!KEEP.has(n.tagName)) {
        $(n).replaceWith($(n).contents())
        changed = true
      }
    })
  }
  $el.find('*').each((_, n) => {
    const keep = n.tagName === 'a' ? ['href'] : n.tagName === 'img' ? ['src', 'alt'] : []
    for (const a of Object.keys(n.attribs ?? {})) if (!keep.includes(a)) $(n).removeAttr(a)
    if (n.tagName === 'img') $(n).attr('src', imgSrc($(n).attr('src')))
    if (n.tagName === 'h1') n.tagName = 'h2'
  })
  $el.find('p').each((_, p) => { if (!txt($(p).text()) && !$(p).find('img').length) $(p).remove() })
  return $el.html().replace(/<!--.*?-->/g, '').replace(/\n\s*/g, '\n').trim()
}

function faqsFrom($, root = $('body')) {
  const out = []
  $(root).find('button[aria-expanded]').each((_, b) => {
    const q = txt($(b).children('span').first().text())
    const a = $(b).next('div')
    if (q && a.length && !/menyu|menu|меню|language/i.test(q)) out.push({ q, a: cleanHtml($, a) })
  })
  return out
}

function meta($) {
  return {
    title: txt($('title').first().text()),
    description: $('meta[name="description"]').attr('content') ?? '',
    ogImage: imgSrc($('meta[property="og:image"]').attr('content') ?? '')?.replace(/^https?:\/\/www\.turanprojects\.az/, ''),
    canonical: $('link[rel="canonical"]').attr('href') ?? '',
  }
}

/** The "TURAN İNŞAAT — HOVUZ TİKİNTİSİ" banner used by most list pages. */
function bannerSection($) {
  const s = $('section[aria-label$="Hero Section"]').first()
  if (!s.length) return null
  return {
    eyebrow: txt(s.find('p').first().text()),
    title: txt(s.find('h3').first().text()),
    intro: txt(s.find('p').eq(1).text()),
    image: imgSrc(s.find('img').attr('src')),
  }
}

/** Pillar / area / info pages: <header><img><h1><p></header><main><article>… */
function pillar($) {
  const h = $('body > div header, header').filter((_, e) => $(e).find('h1').length).first()
  return {
    eyebrow: txt(h.find('h1').prev().text()),
    h1: txt(h.find('h1').text()),
    intro: txt(h.find('h1').next('p').text()),
    heroImage: { src: imgSrc(h.find('img').attr('src')), alt: h.find('img').attr('alt') ?? '' },
    bodyHtml: cleanHtml($, $('main article').first()),
    asideProject: $('main aside a[href^="/projects/"]').attr('href') ?? null,
  }
}

function service($) {
  const art = $('main article').first()
  const head = art.children('header').first()
  const img = art.children('img').first()
  const body = art.clone()
  body.children('header').children('h1, p').remove()
  body.children('img').remove()
  body.find('section').filter((_, s) => /Tez-tez|Frequently|Часто/i.test($(s).text().slice(0, 400)) && $(s).find('button[aria-expanded]').length).remove()
  const benefits = []
  art.find('section').each((_, s) => {
    if (/Üstünlük|Advantages|Benefits|Преимущества/i.test($(s).find('h2').first().text())) {
      $(s).find('li').each((__, li) => benefits.push(txt($(li).children('span').last().text() || $(li).text())))
    }
  })
  return {
    h1: txt(head.find('h1').text()),
    excerpt: txt(head.children('p').first().text()),
    image: { src: imgSrc(img.attr('src')), alt: img.attr('alt') ?? '' },
    bodyHtml: cleanHtml($, body),
    benefits,
  }
}

function project($) {
  const art = $('article[itemtype$="Article"]').first()
  const sections = {}
  art.children('div').each((_, d) => {
    const h = txt($(d).children('h2').text())
    if (h) sections[h] = d
  })
  const [aboutKey, featKey] = Object.keys(sections)
  const params = {}
  $('section[aria-label="Layihə detalları"], section[aria-label$="details"], section[aria-label*="етал"]')
    .find('div > div')
    .each((_, row) => {
      const s = $(row).children('span')
      if (s.length === 2) params[txt(s.eq(0).text())] = txt(s.eq(1).text())
    })
  const gallery = []
  $('div[role="list"] img').each((_, i) => gallery.push({ src: imgSrc($(i).attr('src')), alt: $(i).attr('alt') ?? '' }))
  const ba = $('section[aria-label*="müqayisə"], section[aria-label*="comparison"], section[aria-label*="равнени"]').find('img')
  const pv = Object.values(params)
  return {
    h1: txt(art.find('h1').text()),
    excerpt: txt(art.find('[itemprop="description"]').first().text()),
    bodyHtml: aboutKey ? cleanHtml($, $(sections[aboutKey]).children().not('h2')) : '',
    highlights: featKey ? $(sections[featKey]).find('li').map((_, li) => txt($(li).children('span').last().text())).get() : [],
    keywords: art.find('div[aria-label] > span').map((_, s) => txt($(s).text())).get(),
    params, // { "Şəhər / Bölgə": ..., "İnşaat Müddəti": ..., "Hovuz Ölçüləri": ..., "Materiallar": ... }
    location: pv[0] ?? '',
    durationDays: Number((pv[1] ?? '').match(/\d+/)?.[0] ?? 0) || null,
    size: pv[2] ?? '',
    material: pv[3] ?? '',
    gallery,
    beforeAfter: ba.length >= 2 ? { after: imgSrc(ba.eq(0).attr('src')), before: imgSrc(ba.eq(1).attr('src')) } : null,
    serviceLink: art.find('p > a[href]').last().attr('href') ?? null,
  }
}

function post($) {
  const art = $('main article').first()
  const head = art.children('header').first()
  const metaSpans = head.find('div span')
  const author = txt(metaSpans.filter((_, s) => $(s).find('strong').length).find('strong').text())
  const date = (txt(head.text()).match(/\d{4}-\d{2}-\d{2}/) ?? [null])[0]
  const coverImg = art.children('div').first().find('img').first()
  const body = art.children('div').eq(1)
  return {
    category: txt(head.children('span').first().text()),
    h1: txt(head.find('h1').text()),
    author,
    date,
    cover: { src: imgSrc(coverImg.attr('src')), alt: coverImg.attr('alt') ?? '' },
    bodyHtml: cleanHtml($, body.length ? body : art),
  }
}

/* ---------------------------------------------- listing / special pages */
function servicesList($) {
  const cards = []
  $('main a[href^="/services/"], main a[href^="/en/services/"], main a[href^="/ru/services/"]').each((_, a) => {
    const card = $(a).closest('article, li, div')
    const href = $(a).attr('href')
    if (cards.some((c) => c.href === href)) return
    cards.push({
      href,
      title: txt(card.find('h2, h3').first().text()),
      excerpt: txt(card.find('p').first().text()),
      image: imgSrc(card.find('img').attr('src')),
    })
  })
  const filters = $('[role="tablist"] button').map((_, b) => txt($(b).text())).get()
  return { banner: bannerSection($), h1: txt($('main h1').first().text()), cards, filters }
}

function projectsList($) {
  const cards = $('article[itemtype$="CreativeWork"]').map((_, a) => ({
    href: $(a).find('a[href*="/projects/"]').first().attr('href'),
    title: txt($(a).find('h3').text()),
    cover: { src: imgSrc($(a).find('img').attr('src')), alt: $(a).find('img').attr('alt') ?? '' },
    dl: Object.fromEntries($(a).find('dl > div').map((__, d) => [[txt($(d).find('dt').text()), txt($(d).find('dd').text())]]).get()),
    excerpt: txt($(a).find('[itemprop="description"]').text()),
  })).get()
  const tabs = $('[role="tablist"] button').map((_, b) => txt($(b).contents().filter((__, n) => n.type === 'text').text())).get()
  return { banner: bannerSection($), h1: txt($('h1').first().text()), intro: txt($('h1').first().next('p').text()), cards, tabs }
}

function home($) {
  const sectionByHeading = (re) => $('section').filter((_, s) => re.test($(s).find('h2').first().text())).first()
  const refs = sectionByHeading(/etibar edən|trust us|доверяют/i)
  const partners = sectionByHeading(/Dünya Markalarının|World Brands|мировых брендов/i)
  const warranty = sectionByHeading(/Zəmanət|Warranty|Гарантия/i)
  const process = sectionByHeading(/mərhələsi|stages|этапов/i)
  const why = sectionByHeading(/Keyfiyyət və Peşəkarlıq|Quality and Professionalism|Качество/i)
  const ba = sectionByHeading(/Dəyişimi|transformation|изменени/i)
  const heroH1 = $('h1').first()
  return {
    hero: (() => {
      // hero block = the one containing the "projects" CTA next to the external design-app CTA
      const cta = $('a[href="/projects"], a[href="/en/projects"], a[href="/ru/projects"]').filter((_, a) => $(a).siblings('a[target="_blank"]').length).first()
      const box = cta.parent().parent()
      const clientsP = box.children('p').last()
      return {
        h1: txt(heroH1.text()),
        seoIntro: txt(heroH1.prev('p').text() || heroH1.next('p').text()),
        eyebrow: txt(box.children('p, span, div').first().text()),
        tagline: txt(box.find('h2, h3').first().text()),
        body: txt(box.find('h2, h3').first().nextAll('p').first().text()),
        ctaPrimary: txt(cta.siblings('a[target="_blank"]').text()),
        ctaSecondary: txt(cta.text()),
        clients: txt(clientsP.contents().filter((__, n) => n.type === 'text').text()).replace(/^[\s:·]+/, ''),
        image: imgSrc(box.parent().find('img').first().attr('src')),
      }
    })(),
    references: refs.find('figure').map((_, f) => ({
      image: imgSrc($(f).find('img').attr('src')),
      alt: $(f).find('img').attr('alt'),
      type: txt($(f).children('span').first().text()),
      name: txt($(f).find('figcaption h3').text()),
      subtitle: txt($(f).find('figcaption p').text()),
    })).get(),
    referencesHeader: { h2: txt(refs.find('h2').first().text()), intro: txt(refs.find('h2').first().nextAll('p').first().text()) },
    partners: partners.find('img').map((_, i) => ({ logo: imgSrc($(i).attr('src')), alt: $(i).attr('alt') })).get(),
    partnersHeader: { h2: txt(partners.find('h2').first().text()), intro: txt(partners.find('h2').first().nextAll('p').first().text()) },
    warranty: {
      h2: txt(warranty.find('h2').first().text()),
      intro: txt(warranty.find('h2').first().nextAll('p').first().text()),
      tiles: warranty.find('div').filter((_, d) => $(d).children().length === 2 && /\d/.test($(d).text()) && $(d).text().length < 40)
        .map((_, d) => ({ a: txt($(d).children().eq(0).text()), b: txt($(d).children().eq(1).text()) })).get(),
    },
    process: {
      h2: txt(process.find('h2').first().text()),
      intro: txt(process.find('h2').first().nextAll('p').first().text()),
      // each step: <div><p>Title</p><p>Description</p><span>duration</span></div>
      steps: process.find('div').filter((_, d) => $(d).children('p').length === 2 && $(d).children('span').length === 1)
        .map((_, d) => ({
          title: txt($(d).children('p').eq(0).text()),
          description: txt($(d).children('p').eq(1).text()),
          duration: txt($(d).children('span').text()),
        })).get(),
      footnote: txt(process.text().match(/(Orta tikinti müddəti|Average construction time|Средний срок)[^A-ZƏÜÖĞIİŞÇА-Я]{0,40}/)?.[0] ?? ''),
    },
    why: {
      h2: txt(why.find('h2').first().text()),
      items: why.find('div').filter((_, d) => $(d).children('p').length === 2 && $(d).children('div').length === 1 && !$(d).find('span').length)
        .map((_, d) => ({ title: txt($(d).children('p').eq(0).text()), text: txt($(d).children('p').eq(1).text()) })).get(),
      counters: why.find('div > p').filter((_, p) => $(p).prev('div').find('span').length > 0).map((_, p) => txt($(p).text())).get(),
    },
    beforeAfter: {
      h2: txt(ba.find('h2').first().text()),
      intro: txt(ba.find('h2').first().nextAll('p').first().text()),
      images: ba.find('img').map((_, i) => ({ src: imgSrc($(i).attr('src')), alt: $(i).attr('alt') })).get(),
    },
    faqs: faqsFrom($),
  }
}

function about($) {
  const intro = $('main section').eq(1)
  const story = $('main section').eq(2)
  const cta = $('main section').last()
  return {
    banner: bannerSection($),
    tagline: txt(intro.find('p').first().text()),
    eyebrow: txt(intro.find('h1').prevAll('span').first().text() || intro.find('span').filter((_, x) => /^[A-ZƏÜÖĞİŞÇА-Я ]{4,}$/.test(txt($(x).text()))).first().text()),
    h1: txt(intro.find('h1').text()),
    body: txt(intro.find('p').filter((_, p) => txt($(p).text()).length > 120).first().text()),
    bullets: intro.find('li').map((_, li) => { const t = $(li).find('span').map((__, x) => txt($(x).text())).get().filter(Boolean); return { title: t[0] ?? '', text: (t[1] ?? '').replace(/^—s*/, '') } }).get(),
    certificate: { src: imgSrc(intro.find('img').last().attr('src')), alt: intro.find('img').last().attr('alt') },
    story: { eyebrow: txt(story.find('span').filter((_, x) => txt($(x).text())).first().text()), h2: txt(story.find('h2').text()), p: txt(story.find('p').text()) },
    cta: { heading: txt(cta.find('h2, h3, p').first().text()), text: txt(cta.find('p').first().text()) },
  }
}

function genericMain($) {
  const main = $('main').first().length ? $('main').first() : $('body')
  const c = main.clone()
  c.find('header[role="banner"], footer, #magic-cursor').remove()
  c.find('h1').first().prevAll().remove()
  c.find('h1').first().remove()
  c.find('section[aria-label$="Hero Section"]').remove()
  c.find('section').filter((_, s) => $(s).find('button[aria-expanded]').length > 1).remove()
  return { h1: txt($('h1').first().text()), bodyHtml: cleanHtml($, c) }
}

/* ------------------------------------------------------------------ type */
const PILLARS = new Set([
  '/hovuz-tikintisi', '/infinity-hovuz-tikintisi', '/villa-hovuzu-tikintisi', '/sauna-tikintisi-baki',
  '/turk-hamami-tikintisi-baki', '/rus-hamami-tikintisi-baki', '/buxar-otagi-tikintisi',
  '/spa-tikintisi-baki', '/fitnes-zali-tikintisi',
])
const INFO = new Set(['/hovuz-qiymetleri', '/sauna-qiymetleri', '/dasma-hovuz-nedir', '/skimmer-hovuz-nedir', '/hovuz-qislama-xidmeti', '/spa-layiheledirilmesi'])
const SKIP = new Set(['/hovuz-vizualizasiyasi', '/products'])

function typeOf(az) {
  if (az === '/') return 'home'
  if (SKIP.has(az)) return 'skip'
  if (az.startsWith('/services/')) return 'service'
  if (az.startsWith('/projects/')) return 'project'
  if (az.startsWith('/blog/')) return 'post'
  if (az.startsWith('/hovuz-tikintisi-')) return 'area'
  if (PILLARS.has(az)) return 'category'
  if (INFO.has(az)) return 'info'
  return { '/services': 'servicesList', '/projects': 'projectsList', '/blog': 'blogList', '/about': 'about', '/contact': 'contact', '/zemanet': 'legal', '/gizlilik-siyaseti': 'legal', '/istifade-sertleri': 'legal' }[az] ?? 'unknown'
}

/* ------------------------------------------------------------------ main */
const groups = JSON.parse(await readFile(path.join(dir, 'sitemap.json'), 'utf8'))
const byAz = new Map()
for (const g of groups) {
  const az = g.alts.az ?? g.loc
  if (!byAz.has(az)) byAz.set(az, { az, alts: g.alts })
}

const docs = []
const images = new Set()
const collectImages = (v) => {
  if (!v) return
  if (typeof v === 'string') {
    if (/^\/(assets|_next\/static\/media)\//.test(v)) images.add(v)
    for (const m of v.matchAll(/src="(\/(?:assets|_next\/static\/media)\/[^"]+)"/g)) images.add(m[1])
  } else if (typeof v === 'object') Object.values(v).forEach(collectImages)
}

for (const { az, alts } of byAz.values()) {
  const type = typeOf(az)
  if (type === 'skip') continue
  const doc = { type, az, alts: { az: alts.az ?? az, en: alts.en ?? null, ru: alts.ru ?? null }, locales: {} }
  for (const loc of ['az', 'en', 'ru']) {
    const p = doc.alts[loc]
    if (!p) continue
    let html
    try { html = await readFile(fileFor(p), 'utf8') } catch { continue }
    const $ = cheerio.load(html)
    const base = { path: p, ...meta($) }
    const extractor = {
      home, category: pillar, area: pillar, info: pillar, service, project, post,
      servicesList, projectsList, blogList: genericMain, about, contact: genericMain, legal: genericMain, unknown: genericMain,
    }[type]
    const data = extractor($)
    const faqs = ['category', 'area', 'info', 'service', 'post', 'legal'].includes(type) ? faqsFrom($) : undefined
    doc.locales[loc] = deepBrand({ ...base, ...data, ...(faqs ? { faqs } : {}) })
    collectImages(doc.locales[loc])
  }
  docs.push(doc)
}

await mkdir(path.dirname(OUT), { recursive: true })
await writeFile(OUT, JSON.stringify({ extractedAt: new Date().toISOString(), docs, images: [...images].sort() }, null, 1))

const count = docs.reduce((a, d) => ((a[d.type] = (a[d.type] ?? 0) + 1), a), {})
console.log(JSON.stringify({ docs: docs.length, byType: count, images: images.size, out: OUT }))
