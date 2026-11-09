import type { Payload } from 'payload'

import { type Loc, type MediaStore, upsertGlobal } from './lib'

type Any = Record<string, any> // eslint-disable-line @typescript-eslint/no-explicit-any
type Ctx = {
  payload: Payload
  media: MediaStore
  docs: { type: string; locales: Partial<Record<Loc, Any>> }[]
  categoryIds: Record<string, number>
  log: (s: string) => void
}

const t = (az: string, en: string, ru: string) => ({ az, en, ru })
const pre = (l: Loc) => (l === 'az' ? '' : `/${l}`)
const custom = (label: string, url: string) => ({ link: { label, type: 'custom', url } })

export async function seedGlobals({ payload, log, categoryIds }: Ctx) {
  log('Globals…')
  const L = (l: Loc) => l

  /* ------------------------------------------------ site settings (contacts = old site, per user) */
  const settings = (l: Loc) => ({
    companyName: 'Complex MMC',
    tagline: t(
      'Peşəkar hovuz, spa və mühəndislik həlləri ilə rahatlıq və estetik dizaynı birləşdiririk.',
      'We combine comfort and aesthetic design with professional pool, spa and engineering solutions.',
      'Объединяем комфорт и эстетику с профессиональными решениями для бассейнов, спа и инженерии.',
    )[l],
    phones: [
      { label: t('Əsas nömrə', 'Main', 'Основной')[l], number: '+994 50 312 76 57', primary: true },
      { label: t('Mobil', 'Mobile', 'Мобильный')[l], number: '+994 55 751 31 15' },
      { label: t('Mobil', 'Mobile', 'Мобильный')[l], number: '+994 50 635 05 20' },
      { label: t('Ofis', 'Office', 'Офис')[l], number: '+994 12 348 28 75' },
    ],
    email: 'office@turanprojects.az',
    whatsapp: '+994557513115',
    address: t('Abşeron r., Binəqədi-Novxanı şossesi, Novxanı kəndi', 'Absheron district, Binagadi–Novkhani highway, Novkhani village', 'Абшеронский р-н, шоссе Бинагади–Новханы, пос. Новханы')[l],
    addressNote: t('Berlin Avto ilə üzbəüz', 'Opposite Berlin Avto', 'Напротив Berlin Avto')[l],
    city: t('Novxanı, Abşeron', 'Novkhani, Absheron', 'Новханы, Абшерон')[l],
    lat: 40.5304726,
    lng: 49.7860155,
    mapUrl: 'https://www.google.com/maps?cid=9998247709482654691',
    openingHours: [{ days: ['Mo', 'Tu', 'We', 'Th', 'Fr'], opens: '09:00', closes: '18:00' }],
    hoursNote: t('Zənglərə 24 saat cavab veririk', 'We answer calls 24/7', 'Отвечаем на звонки 24/7')[l],
    socials: [
      { network: 'instagram', url: 'https://www.instagram.com/turanprojects.az' },
      { network: 'tiktok', url: 'https://www.tiktok.com/@turanprojects.az' },
    ],
    floatingWhatsapp: true,
    floatingQuote: true,
    quoteLink: { label: t('Qiymət təklifi al', 'Get a quote', 'Получить предложение')[l], type: 'custom', url: `${pre(l)}/${t('qiymet-hesabla', 'price-calculator', 'kalkulyator-stoimosti')[l]}` },
    siteUrl: 'https://complexmmc.az',
    titleTemplate: '%s | Complex MMC',
    defaultDescription: t(
      'Bakıda hovuz, sauna, türk hamamı və SPA tikintisi. Lisenziyalı şirkət, 20+ il təcrübə, konstruksiyaya 12 il yazılı zəmanət.',
      'Pool, sauna, Turkish hammam and SPA construction in Baku. Licensed company, 20+ years of experience, 12-year written structural warranty.',
      'Строительство бассейнов, саун, турецких хамамов и СПА в Баку. Лицензированная компания, 20+ лет опыта, 12 лет письменной гарантии.',
    )[l],
    businessType: 'GeneralContractor',
    priceRange: '$$',
    areaServed: ['Bakı', 'Abşeron', 'Sumqayıt', 'Gəncə', 'Azərbaycan'],
  })
  await upsertGlobal(payload, 'site-settings', settings('az'), { en: settings('en'), ru: settings('ru') })

  /* ------------------------------------------------ header */
  const header = (l: Loc) => ({
    nav: [
      custom(t('Ana səhifə', 'Home', 'Главная')[l], `${pre(l)}/` || '/'),
      custom(t('Haqqımızda', 'About', 'О нас')[l], `${pre(l)}/about`),
      {
        ...custom(t('Xidmətlər', 'Services', 'Услуги')[l], `${pre(l)}/services`),
        children: Object.entries(categoryIds).map(([slugAz, id]) => ({
          link: { label: '', type: 'internal', reference: { relationTo: 'categories', value: id }, _slug: slugAz },
        })),
      },
      custom(t('Layihələr', 'Projects', 'Проекты')[l], `${pre(l)}/projects`),
      custom(t('Məhsullar', 'Products', 'Продукция')[l], `${pre(l)}/products`),
      custom(t('Bloq', 'Blog', 'Блог')[l], `${pre(l)}/blog`),
      custom(t('Əlaqə', 'Contact', 'Контакты')[l], `${pre(l)}/contact`),
    ],
    cta: { label: t('Qiymət hesabla', 'Get a quote', 'Рассчитать цену')[l], type: 'custom', url: `${pre(l)}/${t('qiymet-hesabla', 'price-calculator', 'kalkulyator-stoimosti')[l]}` },
  })
  // empty child labels -> renderer falls back to the category's short name
  const strip = (h: ReturnType<typeof header>) => JSON.parse(JSON.stringify(h).replace(/,"_slug":"[^"]*"/g, ''))
  await upsertGlobal(payload, 'header', strip(header('az')), { en: strip(header('en')), ru: strip(header('ru')) })

  /* ------------------------------------------------ footer */
  const footer = (l: Loc) => ({
    about: settings(l).tagline,
    columns: [
      {
        title: t('Keçidlər', 'Links', 'Ссылки')[l],
        source: 'manual',
        links: [
          custom(t('Haqqımızda', 'About', 'О нас')[l], `${pre(l)}/about`),
          custom(t('Layihələr', 'Projects', 'Проекты')[l], `${pre(l)}/projects`),
          custom(t('Qalereya', 'Gallery', 'Галерея')[l], `${pre(l)}/${t('qalereya', 'gallery', 'galereya')[l]}`),
          custom(t('Necə işləyirik', 'How we work', 'Как мы работаем')[l], `${pre(l)}/${t('nece-isleyirik', 'how-we-work', 'kak-my-rabotaem')[l]}`),
          custom('FAQ', `${pre(l)}/faq`),
          custom(t('Zəmanət', 'Warranty', 'Гарантия')[l], `${pre(l)}/${t('zemanet', 'warranty', 'garantiya')[l]}`),
          custom(t('Əlaqə', 'Contact', 'Контакты')[l], `${pre(l)}/contact`),
        ],
      },
      { title: t('Xidmətlər', 'Services', 'Услуги')[l], source: 'categories' },
      { title: t('Xidmət ərazilərimiz', 'Service areas', 'Районы работ')[l], source: 'service-areas' },
    ],
    legalLinks: [
      custom(t('Gizlilik siyasəti', 'Privacy policy', 'Политика конфиденциальности')[l], `${pre(l)}/${t('gizlilik-siyaseti', 'privacy-policy', 'politika-konfidencialnosti')[l]}`),
      custom(t('İstifadə şərtləri', 'Terms of use', 'Условия использования')[l], `${pre(l)}/${t('istifade-sertleri', 'terms-of-service', 'usloviya-ispolzovaniya')[l]}`),
    ],
    copyright: t('© {year} Complex MMC. Bütün hüquqlar qorunur.', '© {year} Complex MMC. All rights reserved.', '© {year} Complex MMC. Все права защищены.')[l],
  })
  await upsertGlobal(payload, 'footer', footer('az'), { en: footer('en'), ru: footer('ru') })
  void L
}
