/**
 * `npm run content:home-services` — make the home page's two services sections show the service
 * lines (Hovuz, SPA, Sauna, Türk hamamı, Rus hamamı, Buxar otağı, Fitnes zalı) instead of only
 * pool services, and give the projects slider a mix of pools, hammams, saunas and SPA, in all
 * three languages. Re-running is safe.
 */
import config from '@payload-config'
import { getPayload } from 'payload'

const payload = await getPayload({ config })

const bySlug = async (slug: string) =>
  (await payload.find({ collection: 'categories', locale: 'az', where: { slug: { equals: slug } }, limit: 1, depth: 0 })).docs[0]?.id as number

const FULL = ['hovuz-tikintisi', 'spa-tikintisi-baki', 'sauna-tikintisi-baki', 'turk-hamami-tikintisi-baki', 'rus-hamami-tikintisi-baki', 'buxar-otagi-tikintisi', 'fitnes-zali-tikintisi']
const TOP = ['hovuz-tikintisi', 'spa-tikintisi-baki', 'turk-hamami-tikintisi-baki']
const full = (await Promise.all(FULL.map(bySlug))).filter(Boolean)
const top = (await Promise.all(TOP.map(bySlug))).filter(Boolean)

// projects slider: alternate pool and wellness work (slugs of published projects)
const SLIDES = ['hyatt-pool', 'crown-turk', 'badamdar', 'crown-saunaa', 'myclass-hamam', 'crown-rus', 'buzovna-hovuz', 'crown-buxar', 'myclass-cakuzi']
const slides = (
  await Promise.all(
    SLIDES.map(async (slug) => (await payload.find({ collection: 'projects', locale: 'az', where: { slug: { equals: slug } }, limit: 1, depth: 0 })).docs[0]?.id as number),
  )
).filter(Boolean)

const HEADING = {
  az: { eyebrow: 'Xidmətlərimiz', heading: 'Hovuz, SPA, sauna və hamam tikintisi', intro: 'Hovuzdan türk hamamına, saunadan fitnes zalına qədər — layihə, tikinti və avadanlıq bir komandadan.' },
  en: { eyebrow: 'Our services', heading: 'Pools, SPA, saunas and hammams', intro: 'From pools to Turkish hammams, saunas and gyms — design, construction and equipment from one team.' },
  ru: { eyebrow: 'Наши услуги', heading: 'Бассейны, SPA, сауны и хаммамы', intro: 'От бассейна до турецкого хаммама, сауны и фитнес-зала — проект, строительство и оборудование от одной команды.' },
} as const

const home = (await payload.find({ collection: 'pages', locale: 'az', where: { slug: { equals: 'home' } }, limit: 1, depth: 0 })).docs[0]
if (!home) throw new Error('home page not found')

for (const locale of ['az', 'en', 'ru'] as const) {
  const doc = await payload.findByID({ collection: 'pages', id: home.id, locale, depth: 0, fallbackLocale: false })
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const layout = ((doc.layout ?? []) as any[]).map((b) => {
    if (b.blockType === 'projectsCarousel') return { ...b, source: 'manual', items: slides }
    if (b.blockType !== 'servicesGrid') return b
    if (b.layout === 'tabs') return { ...b, show: 'categories', categoryItems: full, header: { ...(b.header ?? {}), ...HEADING[locale] } }
    if (b.layout === 'overlay') return { ...b, show: 'categories', categoryItems: top }
    return b
  })
  await payload.update({ collection: 'pages', id: home.id, locale, data: { layout }, depth: 0 })
  console.log(locale, 'updated')
}
process.exit(0)
