import type { Payload } from 'payload'

import { cleanTitle, lastSeg, type L, type Loc, type MediaStore, rt, rtText, upsert } from './lib'

type Any = Record<string, any> // eslint-disable-line @typescript-eslint/no-explicit-any
type Doc = { type: string; az: string; alts: Record<Loc, string | null>; locales: Partial<Record<Loc, Any>> }
type Ctx = {
  payload: Payload
  media: MediaStore
  docs: Doc[]
  faqsFor: (d: Doc, extra?: Any) => Promise<(number)[]>
  categoryIds: Record<string, number>
  log: (s: string) => void
}

const LOCS: Loc[] = ['az', 'en', 'ru']
const t = (az: string, en: string, ru: string) => ({ az, en, ru })
type T = ReturnType<typeof t>

const custom = (label: string, url: string) => ({ label, type: 'custom', url })
const page = (label: string, id: number | undefined) =>
  id ? { label, type: 'internal', reference: { relationTo: 'pages', value: id } } : { label, type: 'custom', url: '/' }
const pre = (l: Loc) => (l === 'az' ? '' : `/${l}`)
const header = (eyebrow?: string, heading?: string, intro?: string) => ({ eyebrow, heading, intro })

/**
 * Writes a page in all three locales. `layout(l)` must return the FULL block list for that
 * locale (non-localized values identical) because `layout` rows are shared between locales.
 */
async function savePage(
  ctx: Ctx,
  key: string,
  slug: T,
  data: (l: Loc) => Any,
  extra: Any = {},
) {
  const locales: L<Any> = {}
  for (const l of ['en', 'ru'] as Loc[]) locales[l] = { ...data(l), slug: slug[l] }
  return upsert(ctx.payload, {
    collection: 'pages',
    match: { field: 'slug', value: slug.az },
    base: { ...data('az'), slug: slug.az, ...extra },
    locales,
    draft: false,
  }).then((id) => {
    ctx.log(`  page ${key} -> ${slug.az}`)
    return id
  })
}

export async function seedPages(ctx: Ctx) {
  const { payload, media, docs, faqsFor, log } = ctx
  const byType = (ty: string) => docs.filter((d) => d.type === ty)
  const one = (ty: string) => byType(ty)[0]
  const L = (d: Doc, l: Loc) => d.locales[l] ?? d.locales.az!
  log('Pages…')

  /* ------------------------------------------------ forms */
  const leadsTo = process.env.LEADS_TO
  const formFields = (l: Loc) => [
    { blockType: 'text', name: 'name', label: t('Adınız', 'Your name', 'Ваше имя')[l], required: true, width: 50 },
    { blockType: 'text', name: 'phone', label: t('Telefon', 'Phone', 'Телефон')[l], required: true, width: 50 },
    { blockType: 'email', name: 'email', label: t('E-poçt', 'E-mail', 'E-mail')[l], required: false, width: 100 },
    { blockType: 'textarea', name: 'message', label: t('Mesajınız', 'Your message', 'Ваше сообщение')[l], required: false, width: 100 },
  ]
  const formData = (l: Loc) => ({
    title: 'Əlaqə forması',
    fields: formFields(l),
    submitButtonLabel: t('Göndər', 'Send', 'Отправить')[l],
    confirmationType: 'message',
    confirmationMessage: rtText(
      t(
        'Təşəkkür edirik! Mütəxəssisimiz qısa zamanda sizinlə əlaqə saxlayacaq.',
        'Thank you! Our specialist will contact you shortly.',
        'Спасибо! Наш специалист скоро свяжется с вами.',
      )[l],
    ),
  })
  const contactForm = await upsert(payload, {
    collection: 'forms',
    match: { field: 'title', value: 'Əlaqə forması' },
    base: {
      ...formData('az'),
      emails: leadsTo
        ? [{ emailTo: leadsTo, subject: 'Yeni müraciət — complexmmc.az', message: rtText('Yeni müraciət: {{*:table}}') }]
        : [],
    },
    locales: { en: formData('en'), ru: formData('ru') },
  })

  /* ------------------------------------------------ calculator page (needed by home CTA) */
  const calcId = await savePage(ctx, 'calculator', t('qiymet-hesabla', 'price-calculator', 'kalkulyator-stoimosti'), (l) => ({
    title: t('Qiymət kalkulyatoru', 'Price calculator', 'Калькулятор стоимости')[l],
    intro: t(
      'Layihəniz haqqında qısa məlumat verin — mütəxəssisimiz fərdi qiymət təklifi hazırlasın.',
      'Tell us about your project and our specialist will prepare a personal quote.',
      'Расскажите о проекте — наш специалист подготовит индивидуальное предложение.',
    )[l],
    layout: [{ blockType: 'calculator', header: header(undefined, t('Qiymət təklifi alın', 'Get a quote', 'Получить предложение')[l]) }],
    meta: {
      title: t('Hovuz və SPA qiymət kalkulyatoru', 'Pool & SPA price calculator', 'Калькулятор стоимости бассейна и СПА')[l],
      description: t(
        'Hovuz, sauna, hamam və SPA layihəniz üçün pulsuz qiymət təklifi alın.',
        'Get a free quote for your pool, sauna, hammam or SPA project.',
        'Получите бесплатное предложение для бассейна, сауны, хамама или СПА.',
      )[l],
    },
  }))

  /* ------------------------------------------------ home */
  const home = one('home')
  const about = one('about')
  const homeFaqs = await faqsFor(home, { showOnFaqPage: true })
  const heroImg = await media.get('/assets/projects/bilgeh/hovuz.webp')
  const aboutBig = await media.get('/assets/projects/hyattRegency/hovuz1.webp')
  const aboutSmall = await media.get('/assets/projects/crown/Trkhamami2.webp')
  const projectBA = async (slug: string, titleAz: string) => {
    const p = byType('project').find((d) => lastSeg(d.az) === slug)
    const ba = p?.locales.az?.beforeAfter
    if (!ba) return null
    const project = (await payload.find({ collection: 'projects', where: { slug: { equals: slug } }, limit: 1, depth: 0 })).docs[0]
    return {
      before: await media.get(ba.before),
      after: await media.get(ba.after),
      project: project?.id,
      titles: LOCS.map((l) => (l === 'az' ? titleAz : p?.locales[l]?.h1 ?? titleAz)),
    }
  }
  const pairs = (
    await Promise.all([
      projectBA('bilgeh', 'Bilgəh Villa Hovuzu'),
      projectBA('makfit-hovuz', 'Makfit Kommersiya Hovuzu'),
      projectBA('crown-turk', 'Crown SPA — Türk Hamamı'),
      projectBA('crown-buxar', 'Crown SPA — Buxar Otağı'),
      projectBA('crown-kise', 'Crown SPA — Kisə Otağı'),
    ])
  ).filter((p): p is NonNullable<typeof p> => Boolean(p?.before && p?.after))

  await savePage(ctx, 'home', t('home', 'home', 'home'), (l) => {
    const h = L(home, l)
    const a = L(about, l)
    return {
      title: t('Ana səhifə', 'Home', 'Главная')[l],
      layout: [
        {
          blockType: 'hero',
          rotatingWords: [t('Layihələndiririk', 'We design', 'Проектируем'), t('Tikirik', 'We build', 'Строим'), t('Baxım edirik', 'We maintain', 'Обслуживаем')].map((w) => ({ text: w[l] })),
          heading: h.hero.h1,
          subheading: h.hero.body,
          primaryCta: page(h.hero.ctaPrimary || t('Pulsuz qiymət təklifi al', 'Get a free quote', 'Бесплатное предложение')[l], calcId),
          secondaryCta: custom(h.hero.ctaSecondary || 'Layihələr', `${pre(l)}/projects`),
          badges: [t('Rəsmi lisenziya', 'Official license', 'Официальная лицензия'), t('12 il yazılı zəmanət', '12-year written warranty', '12 лет письменной гарантии'), t('20+ il təcrübə', '20+ years of experience', '20+ лет опыта')].map((b) => ({ text: b[l] })),
          backgroundImage: heroImg,
          infoCard: {
            enabled: true,
            title: t('Pulsuz baxış', 'Free site visit', 'Бесплатный выезд')[l],
            text: t('Mütəxəssisimiz obyektinizə gəlir', 'Our specialist visits your site', 'Специалист приедет на объект')[l],
            phone: '+994 55 751 31 15',
          },
        },
        {
          blockType: 'categoryStrip',
          header: header(t('Xidmət sahələri', 'What we build', 'Направления')[l], t('Nə tikirik?', 'What do we build?', 'Что мы строим?')[l]),
          source: 'auto',
          limit: 12,
        },
        {
          blockType: 'stats',
          settings: { theme: 'dark' },
          items: [
            { value: 20, suffix: '+', label: h.why.counters?.[1] ?? 'İllik təcrübə' },
            { value: 21, suffix: '+', label: h.why.counters?.[0] ?? 'Tamamlanmış layihə' },
            { value: 12, suffix: t(' il', ' yrs', ' лет')[l], label: t('Konstruksiyaya zəmanət', 'Structural warranty', 'Гарантия на конструкцию')[l] },
            { value: 8, suffix: '', label: t('Beynəlxalq brend tərəfdaş', 'International brand partners', 'Международных брендов-партнёров')[l] },
          ],
        },
        {
          blockType: 'references',
          header: header(t('Referanslarımız', 'Our references', 'Наши референсы')[l], h.referencesHeader.h2, h.referencesHeader.intro),
          source: 'auto',
          limit: 8,
          showBrandMarquee: true,
        },
        {
          blockType: 'projectsCarousel',
          header: header(t('Layihələrimiz', 'Our projects', 'Наши проекты')[l], t('Real hovuz və SPA layihələrimiz', 'Our real pool and SPA projects', 'Наши реальные проекты бассейнов и СПА')[l]),
          source: 'auto',
          limit: 9,
          showCategoryTabs: true,
          cta: custom(t('Bütün layihələr', 'All projects', 'Все проекты')[l], `${pre(l)}/projects`),
        },
        {
          blockType: 'aboutIntro',
          header: header(a.eyebrow, a.h1),
          body: rtText(a.body),
          bullets: (a.bullets as Any[]).map((b) => ({ text: `${b.title} — ${String(b.text).trim()}` })),
          imageLarge: aboutBig,
          imageSmall: aboutSmall,
          badge: { value: '20+', label: t('İllik təcrübə', 'Years of experience', 'Лет опыта')[l] },
          cta: custom(t('Haqqımızda', 'About us', 'О нас')[l], `${pre(l)}/about`),
        },
        {
          blockType: 'beforeAfter',
          header: header(t('Əvvəl & Sonra', 'Before & After', 'До и после')[l], h.beforeAfter.h2, h.beforeAfter.intro),
          pairs: pairs.map((p) => ({ title: p.titles[LOCS.indexOf(l)], before: p.before, after: p.after, project: p.project })),
          cta: custom(t('Digər tamamlanmış layihələrə baxın', 'See other completed projects', 'Другие завершённые проекты')[l], `${pre(l)}/projects`),
        },
        {
          blockType: 'servicesGrid',
          header: header(t('Xidmətlərimiz', 'Our services', 'Наши услуги')[l], t('Premium hovuz və spa layihələri', 'Premium pool and spa projects', 'Премиальные проекты бассейнов и СПА')[l]),
          source: 'auto',
          limit: 6,
          layout: 'tabs',
          cta: custom(t('Bütün xidmətlər', 'All services', 'Все услуги')[l], `${pre(l)}/services`),
        },
        {
          blockType: 'warranty',
          settings: { theme: 'soft' },
          header: header(t('Zəmanət', 'Warranty', 'Гарантия')[l], h.warranty.h2, h.warranty.intro),
          items: (h.warranty.tiles as Any[]).filter((x) => x.a).map((x) => ({ label: x.a, value: x.b })),
          cta: custom(t('Zəmanət şərtlərinə bax', 'View warranty terms', 'Условия гарантии')[l], l === 'az' ? '/zemanet' : l === 'en' ? '/en/warranty' : '/ru/garantiya'),
        },
        {
          blockType: 'process',
          settings: { theme: 'dark' },
          header: header(t('Necə işləyirik?', 'How we work', 'Как мы работаем')[l], h.process.h2, h.process.intro),
          steps: (h.process.steps as Any[]).map((s) => ({ title: s.title, duration: s.duration, description: s.description })),
          footnote: h.process.footnote,
          cta: page(t('Layihəni başlat', 'Start your project', 'Начать проект')[l], calcId),
        },
        {
          blockType: 'featureGrid',
          header: header(t('Niyə bizi seçməlisiniz?', 'Why choose us?', 'Почему мы?')[l], h.why.h2),
          numbered: false,
          items: (h.why.items as Any[]).map((x) => ({ title: x.title, description: x.text })),
        },
        {
          blockType: 'faq',
          header: header(t('Tez-tez soruşulan suallar', 'FAQ', 'Частые вопросы')[l], t('Cavabı tapmaq asandır', 'Answers made easy', 'Ответы на ваши вопросы')[l]),
          source: 'manual',
          items: homeFaqs,
          showContactForm: true,
        },
        {
          blockType: 'latestPosts',
          header: header(t('Bloq', 'Blog', 'Блог')[l], t('Faydalı məqalələr', 'Useful articles', 'Полезные статьи')[l]),
          source: 'auto',
          limit: 3,
          cta: custom(t('Bütün məqalələr', 'All articles', 'Все статьи')[l], `${pre(l)}/blog`),
        },
        {
          blockType: 'cta',
          heading: t('Layihənizi bizimlə həyata keçirin', 'Bring your project to life with us', 'Реализуйте свой проект с нами')[l],
          text: a.cta?.text,
          primaryCta: page(t('Pulsuz qiymət təklifi al', 'Get a free quote', 'Бесплатное предложение')[l], calcId),
          showPhone: true,
        },
      ],
      meta: { title: cleanTitle(h.title), description: h.description },
    }
  })

  /* ------------------------------------------------ about */
  const certs = (await payload.find({ collection: 'certificates', limit: 10, depth: 0 })).docs.map((d) => d.id)
  const aboutBanner = await media.get(about.locales.az!.banner?.image)
  const storyImg = await media.get('/assets/projects/myclass/sauna.webp')
  await savePage(ctx, 'about', t('about', 'about', 'about'), (l) => {
    const a = L(about, l)
    return {
      title: a.banner?.title ?? 'Haqqımızda',
      banner: aboutBanner,
      intro: a.banner?.intro,
      layout: [
        {
          blockType: 'aboutIntro',
          header: header(a.tagline, a.h1),
          body: rtText(a.body),
          bullets: (a.bullets as Any[]).map((b) => ({ text: `${b.title} — ${String(b.text).trim()}` })),
          imageLarge: aboutBig,
          imageSmall: aboutSmall,
          badge: { value: '20+', label: t('İllik təcrübə', 'Years of experience', 'Лет опыта')[l] },
        },
        {
          blockType: 'mediaContent',
          header: header(a.story.eyebrow, a.story.h2),
          body: rtText(a.story.p),
          image: storyImg,
          imagePosition: 'left',
        },
        {
          blockType: 'certificates',
          header: header(t('Sertifikatlar', 'Certificates', 'Сертификаты')[l], t('Rəsmi lisenziya və sertifikatlar', 'Official license and certificates', 'Официальная лицензия и сертификаты')[l]),
          source: 'manual',
          items: certs,
        },
        {
          blockType: 'stats',
          settings: { theme: 'dark' },
          items: [
            { value: 20, suffix: '+', label: t('İllik təcrübə', 'Years of experience', 'Лет опыта')[l] },
            { value: 21, suffix: '+', label: t('Tamamlanmış layihə', 'Completed projects', 'Завершённых проектов')[l] },
            { value: 12, suffix: t(' il', ' yrs', ' лет')[l], label: t('Konstruksiyaya zəmanət', 'Structural warranty', 'Гарантия на конструкцию')[l] },
          ],
        },
        { blockType: 'team', header: header(t('Komanda', 'Team', 'Команда')[l], t('Peşəkar komandamız', 'Our professional team', 'Наша команда')[l]), source: 'auto', limit: 4 },
        { blockType: 'references', header: header(t('Referanslarımız', 'Our references', 'Наши референсы')[l], L(home, l).referencesHeader.h2), source: 'auto', limit: 8, showBrandMarquee: true },
        {
          blockType: 'cta',
          heading: t('Layihənizi bizimlə həyata keçirin', 'Bring your project to life with us', 'Реализуйте свой проект с нами')[l],
          text: a.cta?.text,
          primaryCta: custom(t('Əlaqə saxla', 'Contact us', 'Связаться')[l], `${pre(l)}/contact`),
          showPhone: true,
        },
      ],
      meta: { title: cleanTitle(a.title), description: a.description },
    }
  })

  /* ------------------------------------------------ contact */
  const contact = one('contact')
  const contactBanner = await media.get('/_next/static/media/contactus.66bb7536.webp')
  await savePage(ctx, 'contact', t('contact', 'contact', 'contact'), (l) => {
    const c = L(contact, l)
    return {
      title: c.h1,
      banner: contactBanner,
      intro: t(
        'Qiymət sorğuları və əməkdaşlıq üçün bizimlə rahat şəkildə əlaqə saxlayın.',
        'Contact us for price requests and cooperation.',
        'Свяжитесь с нами по вопросам цен и сотрудничества.',
      )[l],
      layout: [
        {
          blockType: 'contactForm',
          header: header(t('Və ya buradan yazın', 'Or write to us', 'Или напишите нам')[l], t('Müraciət göndərin', 'Send a request', 'Отправить заявку')[l]),
          form: contactForm,
          showContactInfo: true,
          showMap: true,
        },
        { blockType: 'faq', header: header(undefined, t('Tez-tez soruşulan suallar', 'Frequently asked questions', 'Частые вопросы')[l]), source: 'manual', items: homeFaqs, showContactForm: false },
      ],
      meta: { title: cleanTitle(c.title), description: c.description },
    }
  })

  /* ------------------------------------------------ list pages (banner + SEO for /services, /projects, /blog, /products) */
  const lists: [string, Doc | undefined, T, T][] = [
    ['services', one('servicesList'), t('services', 'services', 'services'), t('Xidmətlər', 'Services', 'Услуги')],
    ['projects', one('projectsList'), t('projects', 'projects', 'projects'), t('Layihələr', 'Projects', 'Проекты')],
    ['blog', one('blogList'), t('blog', 'blog', 'blog'), t('Bloq', 'Blog', 'Блог')],
  ]
  for (const [key, d, slug, title] of lists) {
    if (!d) continue
    const banner = await media.get(d.locales.az!.banner?.image ?? '/_next/static/media/services.a6bd403e.webp')
    await savePage(ctx, key, slug, (l) => {
      const x = L(d, l)
      return {
        title: x.h1 || title[l],
        banner,
        intro: x.intro || x.banner?.intro,
        layout: [],
        meta: { title: cleanTitle(x.title), description: x.description },
      }
    })
  }
  await savePage(ctx, 'products', t('products', 'products', 'products'), (l) => ({
    title: t('Məhsullarımız', 'Our products', 'Наша продукция')[l],
    intro: t('Hovuz və SPA üçün geniş məhsul çeşidimizlə tanış olun.', 'Explore our wide range of pool and SPA products.', 'Широкий ассортимент продукции для бассейнов и СПА.')[l],
    layout: [{ blockType: 'brandLogos', header: header(undefined, t('İstifadə etdiyimiz brendlər', 'Brands we use', 'Бренды, с которыми работаем')[l]), source: 'auto', limit: 12, marquee: false }],
    meta: {
      title: t('Hovuz kimyəvi maddələri, filtr və avadanlıqlar', 'Pool chemicals, filters and equipment', 'Химия, фильтры и оборудование для бассейнов')[l],
      description: t('Hovuz və SPA avadanlıqları kataloqu — tezliklə.', 'Pool and SPA equipment catalog — coming soon.', 'Каталог оборудования для бассейнов и СПА — скоро.')[l],
    },
  }))

  /* ------------------------------------------------ legal + info pages (rich text) */
  for (const d of [...byType('legal'), ...byType('info')]) {
    const faqs = await faqsFor(d)
    const banner = await media.get(d.locales.az!.heroImage?.src)
    const isWarranty = lastSeg(d.az) === 'zemanet'
    await savePage(ctx, lastSeg(d.az), { az: lastSeg(d.alts.az), en: lastSeg(d.alts.en) || lastSeg(d.alts.az), ru: lastSeg(d.alts.ru) || lastSeg(d.alts.az) }, (l) => {
      const x = L(d, l)
      return {
        title: x.h1,
        banner,
        intro: x.intro,
        layout: [
          ...(isWarranty
            ? [{
                blockType: 'warranty',
                header: header(undefined, undefined),
                items: (L(home, l).warranty.tiles as Any[]).filter((w) => w.a).map((w) => ({ label: w.a, value: w.b })),
              }]
            : []),
          { blockType: 'richText', content: rt(x.bodyHtml) ?? rtText(x.description), width: 'prose' },
          ...(faqs.length ? [{ blockType: 'faq', header: header(undefined, t('Tez-tez soruşulan suallar', 'Frequently asked questions', 'Частые вопросы')[l]), source: 'manual', items: faqs, showContactForm: false }] : []),
          { blockType: 'cta', heading: t('Pulsuz məsləhət alın', 'Get a free consultation', 'Получите бесплатную консультацию')[l], primaryCta: page(t('Qiymət təklifi al', 'Get a quote', 'Получить предложение')[l], calcId), showPhone: true },
        ],
        meta: { title: cleanTitle(x.title), description: x.description },
      }
    })
  }

  /* ------------------------------------------------ new pages: FAQ, gallery, team, how we work */
  await savePage(ctx, 'faq', t('faq', 'faq', 'faq'), (l) => ({
    title: t('Tez-tez soruşulan suallar', 'Frequently asked questions', 'Частые вопросы')[l],
    intro: t('Hovuz, sauna, hamam və SPA tikintisi ilə bağlı ən çox verilən suallar.', 'The most common questions about pool, sauna, hammam and SPA construction.', 'Самые частые вопросы о строительстве бассейнов, саун, хамамов и СПА.')[l],
    layout: [{ blockType: 'faq', header: header(), source: 'auto', limit: 100, showContactForm: true }],
    meta: { title: t('FAQ — Hovuz və SPA tikintisi', 'FAQ — Pool & SPA construction', 'FAQ — Строительство бассейнов и СПА')[l] },
  }))
  await savePage(ctx, 'gallery', t('qalereya', 'gallery', 'galereya'), (l) => ({
    title: t('Qalereya', 'Gallery', 'Галерея')[l],
    intro: t('Tamamladığımız hovuz, sauna, hamam və SPA layihələrindən fotolar.', 'Photos from our completed pool, sauna, hammam and SPA projects.', 'Фото наших завершённых проектов бассейнов, саун, хамамов и СПА.')[l],
    layout: [{ blockType: 'gallery', header: header(), source: 'auto', limit: 200, showFilters: true }],
    meta: { title: t('Qalereya — hovuz və SPA layihələri', 'Gallery — pool & SPA projects', 'Галерея — проекты бассейнов и СПА')[l] },
  }))
  await savePage(
    ctx,
    'team',
    t('komanda', 'team', 'komanda'),
    (l) => ({
      title: t('Komandamız', 'Our team', 'Наша команда')[l],
      layout: [{ blockType: 'team', header: header(), source: 'auto', limit: 50 }],
      meta: { title: t('Komandamız', 'Our team', 'Наша команда')[l], noindex: true },
    }),
  )
  const home8 = (l: Loc) => L(home, l).process
  await savePage(ctx, 'how-we-work', t('nece-isleyirik', 'how-we-work', 'kak-my-rabotaem'), (l) => ({
    title: t('Necə işləyirik', 'How we work', 'Как мы работаем')[l],
    intro: home8(l).intro,
    layout: [
      { blockType: 'process', header: header(undefined, home8(l).h2), steps: (home8(l).steps as Any[]).map((s) => ({ title: s.title, duration: s.duration, description: s.description })), footnote: home8(l).footnote },
      { blockType: 'cta', heading: t('Layihənizi başladaq', "Let's start your project", 'Начнём ваш проект')[l], primaryCta: page(t('Qiymət təklifi al', 'Get a quote', 'Получить предложение')[l], calcId), showPhone: true },
    ],
    meta: { title: t('Necə işləyirik — 8 mərhələ', 'How we work — 8 stages', 'Как мы работаем — 8 этапов')[l] },
  }))
}
