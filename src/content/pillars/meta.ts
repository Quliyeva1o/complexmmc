import type { ContentEntry } from '../types'

/**
 * Meta title / description / excerpt for the other 8 pillar pages (bodies follow in later batches).
 * Title ≤ 60 chars (brand is appended by the template), description 140–155 chars with a CTA.
 */
const meta = (
  slug: string,
  az: [string, string, string],
  en: [string, string, string],
  ru: [string, string, string],
): ContentEntry => ({
  collection: 'categories',
  slug,
  locales: Object.fromEntries(
    (
      [
        ['az', az],
        ['en', en],
        ['ru', ru],
      ] as const
    ).map(([l, [metaTitle, metaDescription, excerpt]]) => [l, { metaTitle, metaDescription, excerpt }]),
  ),
})

export const pillarMeta: ContentEntry[] = [
  meta(
    'infinity-hovuz-tikintisi',
    [
      'İnfinity Hovuz Tikintisi Bakıda – Dəniz Mənzərəli Hovuzlar',
      'Bakı və Abşeronda infinity (sonsuzluq) hovuz tikintisi: hidravlik hesablama, balans çəni, mozaika. Bilgəh və Badamdar layihələri. Pulsuz baxış üçün yazın.',
      'Kənarı üfüqə qovuşan, dəniz və şəhər mənzərəli villalar üçün infinity daşma hovuzların layihələndirilməsi və tikintisi.',
    ],
    [
      'Infinity Pool Construction in Baku – Sea-View Pools',
      'Infinity pool construction in Baku and Absheron: hydraulic design, balance tank, mosaic finish. See our Bilgah and Badamdar projects. Book a free visit.',
      'Design and construction of infinity overflow pools whose edge merges with the horizon, for sea-view and hillside villas.',
    ],
    [
      'Строительство инфинити-бассейнов в Баку – с видом на море',
      'Инфинити-бассейны в Баку и на Абшероне: гидравлический расчёт, переливная ёмкость, мозаика. Проекты в Бильгя и Бадамдаре. Запишитесь на бесплатный выезд.',
      'Проектирование и строительство инфинити-бассейнов, сливающихся с горизонтом, для вилл с видом на море и на склоне.',
    ],
  ),
  meta(
    'villa-hovuzu-tikintisi',
    [
      'Villa Hovuzu Tikintisi – Bağ Evi üçün Hovuz, Bakı',
      'Villa və bağ evi üçün fərdi ölçülü skimmer, daşma və infinity hovuz tikintisi Bakı və Abşeronda. 30–45 gündə təhvil, 12 il zəmanət. Pulsuz baxış istəyin.',
      'Həyətinizə, torpağınıza və büdcənizə uyğun ölçü və formada villa və bağ evi hovuzlarının açar təslim tikintisi.',
    ],
    [
      'Villa Pool Construction in Baku – Country House Pools',
      'Custom skimmer, overflow and infinity pools for villas and country houses in Baku and Absheron. Handover in 30–45 days, 12-year warranty. Book a visit.',
      'Turnkey villa and country-house pools in a size and shape that fit your plot, soil and budget.',
    ],
    [
      'Бассейн для виллы и загородного дома в Баку – под ключ',
      'Скиммерные, переливные и инфинити-бассейны для вилл и загородных домов в Баку и на Абшероне. Сдача за 30–45 дней, гарантия 12 лет. Бесплатный выезд.',
      'Бассейны под ключ для вилл и загородных домов — размер и форма под ваш участок, грунт и бюджет.',
    ],
  ),
  meta(
    'sauna-tikintisi-baki',
    [
      'Sauna Tikintisi Bakıda – Fin Saunası, Ev və Otel Saunası',
      'Bakıda fin saunası, infraqırmızı sauna və ev saunası tikintisi: cökə, abaş, kedr ağacı, Harvia sobaları. Crown SPA və My Class layihələri. Qiymət soruşun.',
      'Ev, villa, otel və fitnes klubları üçün fin saunası, infraqırmızı sauna və kombinə sauna zonalarının tikintisi.',
    ],
    [
      'Sauna Construction in Baku – Finnish, Home & Hotel Saunas',
      'Finnish, infrared and home sauna construction in Baku: linden, abachi and cedar wood, Harvia heaters. Crown SPA and My Class projects. Get a free quote.',
      'Finnish saunas, infrared saunas and combined sauna zones for homes, villas, hotels and fitness clubs.',
    ],
    [
      'Строительство саун в Баку – финская, домашняя, для отелей',
      'Финские, инфракрасные и домашние сауны в Баку: липа, абаши, кедр, печи Harvia. Проекты Crown SPA и My Class. Получите бесплатный расчёт стоимости.',
      'Финские и инфракрасные сауны, комбинированные зоны для домов, вилл, отелей и фитнес-клубов.',
    ],
  ),
  meta(
    'turk-hamami-tikintisi-baki',
    [
      'Türk Hamamı Tikintisi Bakıda – Mərmər Hamam, Göbək Daşı',
      'Bakıda türk hamamı tikintisi: mərmər üzlük, göbək daşı, kisə otağı, buxar sistemi. Crown SPA və My Class hamamları bizim işimizdir. Layihəniz üçün yazın.',
      'Villa, otel və SPA mərkəzləri üçün mərmər üzlüklü, ənənəvi buxar sistemli türk hamamlarının layihələndirilməsi və tikintisi.',
    ],
    [
      'Turkish Hammam Construction in Baku – Marble Hammams',
      'Turkish hammam construction in Baku: marble cladding, göbek taşı, kese room, steam system. We built the hammams at Crown SPA and My Class. Ask for a quote.',
      'Design and construction of traditional marble Turkish hammams with steam systems for villas, hotels and spa centres.',
    ],
    [
      'Строительство турецкого хамама в Баку – мраморный хамам',
      'Турецкий хамам в Баку: мраморная облицовка, гёбек-таш, кесе-комната, парогенератор. Хамамы Crown SPA и My Class — наша работа. Запросите расчёт.',
      'Проектирование и строительство традиционных мраморных турецких хамамов с паровой системой для вилл, отелей и СПА.',
    ],
  ),
  meta(
    'rus-hamami-tikintisi-baki',
    [
      'Rus Hamamı (Banya) Tikintisi Bakı – Odun və Elektrik Sobalı',
      'Bakıda rus hamamı (banya) tikintisi: istiyə davamlı ağac, odun və ya elektrik kamenka, 60–90°C, folqa buxar bariyeri. Crown SPA referansı. Bizə yazın.',
      'Ev, villa və SPA kompleksləri üçün odun və ya elektrik sobalı, ənənəvi rus hamamlarının (banya) tikintisi.',
    ],
    [
      'Russian Banya Construction in Baku – Wood & Electric Heaters',
      'Russian banya construction in Baku: heat-resistant wood, wood or electric kamenka, 60–90°C, foil vapour barrier. Crown SPA reference. Ask for a free quote.',
      'Traditional Russian banyas with wood-fired or electric heaters for homes, villas and spa complexes.',
    ],
    [
      'Строительство русской бани в Баку – дровяная и электрическая',
      'Русская баня в Баку: термостойкая древесина, дровяная или электрическая каменка, 60–90°C, пароизоляция. Референс — Crown SPA. Узнайте стоимость.',
      'Традиционные русские бани с дровяной или электрической печью для домов, вилл и СПА-комплексов.',
    ],
  ),
  meta(
    'buxar-otagi-tikintisi',
    [
      'Buxar Otağı Tikintisi Bakıda – Buxar Generatoru, Mozaika',
      'Bakıda buxar otağı (steam room) tikintisi: buxar generatoru, mozaika və mərmər üzlük, 100% rütubət idarəetməsi. Crown SPA və My Class layihələri. Yazın.',
      'Villa, otel və SPA zonaları üçün buxar generatorlu, mozaika və ya mərmər üzlüklü buxar otaqlarının tikintisi.',
    ],
    [
      'Steam Room Construction in Baku – Generators & Mosaic',
      'Steam room construction in Baku: steam generator, mosaic or marble finish, 100% humidity control. Crown SPA and My Class projects. Contact us for a quote.',
      'Steam rooms with steam generators and mosaic or marble finishes for villas, hotels and spa areas.',
    ],
    [
      'Строительство парной в Баку – парогенератор и мозаика',
      'Паровая комната (хаммам-парная) в Баку: парогенератор, мозаика или мрамор, контроль 100% влажности. Проекты Crown SPA и My Class. Запросите расчёт.',
      'Паровые комнаты с парогенератором, облицовкой мозаикой или мрамором для вилл, отелей и СПА-зон.',
    ],
  ),
  meta(
    'spa-tikintisi-baki',
    [
      'SPA Mərkəzi Tikintisi Bakıda – Otel və Villa SPA Zonası',
      'Bakıda SPA kompleksi tikintisi: hovuz, türk və rus hamamı, sauna, buxar və duz otağı – konsepsiyadan açılışa qədər. Crown Wellness Club referansı. Yazın.',
      'Otel, fitnes klubu və villalar üçün hovuz, hamam, sauna və relaks zonalarını birləşdirən SPA komplekslərinin açar təslim tikintisi.',
    ],
    [
      'Spa Centre Construction in Baku – Hotel & Villa Spas',
      'Spa complex construction in Baku: pool, Turkish and Russian baths, sauna, steam and salt rooms – from concept to opening. Crown Wellness Club reference.',
      'Turnkey spa complexes for hotels, fitness clubs and villas combining pools, hammams, saunas and relaxation areas.',
    ],
    [
      'Строительство СПА-центров в Баку – для отелей и вилл',
      'СПА-комплексы в Баку: бассейн, турецкий хамам и русская баня, сауна, паровая и соляная комнаты — от концепции до открытия. Референс — Crown Wellness Club.',
      'СПА-комплексы под ключ для отелей, фитнес-клубов и вилл: бассейны, хамамы, сауны и зоны отдыха.',
    ],
  ),
  meta(
    'fitnes-zali-tikintisi',
    [
      'Fitnes Klubu Tikintisi Bakıda – Hovuz, Sauna, Hamam Zonası',
      'Fitnes klubları üçün kommersiya hovuzu, sauna, türk hamamı və buxar otağı tikintisi Bakıda. Makfit və My Class layihələri. Layihəniz üçün bizə yazın.',
      'Fitnes və idman klubları üçün kommersiya hovuzları, sauna, hamam və SPA zonalarının layihələndirilməsi və tikintisi.',
    ],
    [
      'Fitness Club Construction in Baku – Pool, Sauna & Hammam',
      'Commercial pools, saunas, Turkish hammams and steam rooms for fitness clubs in Baku. See our Makfit and My Class projects. Contact us about your project.',
      'Design and construction of commercial pools, saunas, hammams and spa areas for fitness and sports clubs.',
    ],
    [
      'Строительство фитнес-клубов в Баку – бассейн, сауна, хамам',
      'Коммерческие бассейны, сауны, турецкие хамамы и паровые для фитнес-клубов в Баку. Проекты Makfit и My Class. Напишите нам — выезд бесплатный.',
      'Проектирование и строительство коммерческих бассейнов, саун, хамамов и СПА-зон для фитнес- и спортклубов.',
    ],
  ),
]

/** Meta/excerpt of a pillar for one locale — full pillar files spread this into their locale objects. */
export function pillarMetaFor(slug: string, l: 'az' | 'en' | 'ru') {
  const e = pillarMeta.find((x) => x.slug === slug)
  const m = e?.locales[l]
  if (!m) throw new Error(`no pillar meta for ${slug}/${l}`)
  return { metaTitle: m.metaTitle, metaDescription: m.metaDescription, excerpt: m.excerpt }
}
