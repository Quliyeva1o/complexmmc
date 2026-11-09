import type { Loc } from '../types'

type L3 = Record<Loc, string>

/** Building blocks shared by projects of the same type (3 languages). */
export type ProjectKind = {
  scope: Record<Loc, string[]>
  tech: L3
  pillar: L3 // link to the pillar page per locale
  pillarLabel: L3
}

export const KINDS = {
  commercialPool: {
    scope: {
      az: ['Mühəndis layihəsi və hidravlik hesablama', 'Dəmir-beton hovuz kasası və daşma kanalı', 'Balans çəni və avtomatik səviyyə nəzarəti', 'Kommersiya sinif hidroizolyasiya və su sınağı', 'Mozaika üzlük', 'Filtrasiya, UV və avtomatik xlorlama', 'Sualtı LED işıqlandırma, sınaq və işə salınma'],
      en: ['Engineering design and hydraulic calculation', 'Reinforced concrete pool shell and overflow channel', 'Balance tank with automatic level control', 'Commercial-grade waterproofing and water test', 'Mosaic finish', 'Filtration, UV and automatic chlorination', 'Underwater LED lighting, testing and commissioning'],
      ru: ['Инженерный проект и гидравлический расчёт', 'Железобетонная чаша и переливной лоток', 'Переливная ёмкость с автоматикой уровня', 'Гидроизоляция коммерческого класса и водный тест', 'Облицовка мозаикой', 'Фильтрация, УФ и автоматическое хлорирование', 'Подводная LED-подсветка, испытания и пуск'],
    },
    tech: {
      az: 'Kommersiya hovuzunda su gün ərzində yüzlərlə üzgüçünün yükünü daşıyır. Buna görə daşma sistemi seçilir: səth suyu bütün perimetr boyu kanala axır və balans çəni vasitəsilə filtrasiyaya qayıdır. Filtrasiya yüksək dövriyyəli kommersiya nasosları ilə, dezinfeksiya isə UV lampa və avtomatik xlor/pH dozajı ilə aparılır – su keyfiyyəti istifadəçi sayından asılı olmadan sabit qalır.',
      en: 'A commercial pool carries the load of hundreds of swimmers a day, so an overflow system is used: surface water flows into a channel along the whole perimeter and returns to filtration through a balance tank. Filtration runs on high-turnover commercial pumps, and disinfection combines UV lamps with automatic chlorine/pH dosing, so water quality stays stable regardless of the number of users.',
      ru: 'Коммерческий бассейн ежедневно принимает сотни пловцов, поэтому применяется переливная система: поверхностная вода уходит в лоток по всему периметру и через переливную ёмкость возвращается на фильтрацию. Фильтрация работает на высокопроизводительных коммерческих насосах, обеззараживание — на УФ-лампах и автоматическом дозировании хлора и pH, поэтому качество воды стабильно при любой нагрузке.',
    },
    pillar: { az: '/hovuz-tikintisi', en: '/en/swimming-pool-construction', ru: '/ru/stroitelstvo-bassejnov' },
    pillarLabel: { az: 'Hovuz tikintisi', en: 'Swimming pool construction', ru: 'Строительство бассейнов' },
  },
  villaPool: {
    scope: {
      az: ['Sahə baxışı və fərdi dizayn', 'Qazıntı və dəmir-beton konstruksiya', 'Çoxlaylı hidroizolyasiya və su sınağı', 'Mozaika üzlük', 'Filtrasiya və dezinfeksiya avadanlığı', 'Texniki otaq və ətraf zonanın abadlaşdırılması', 'Təhvil və istifadə təlimi'],
      en: ['Site visit and custom design', 'Excavation and reinforced concrete structure', 'Multi-layer waterproofing and water test', 'Mosaic finish', 'Filtration and disinfection equipment', 'Plant room and landscaping around the pool', 'Handover and user training'],
      ru: ['Выезд и индивидуальный дизайн', 'Котлован и железобетонная конструкция', 'Многослойная гидроизоляция и водный тест', 'Облицовка мозаикой', 'Оборудование фильтрации и обеззараживания', 'Техпомещение и благоустройство вокруг бассейна', 'Сдача и обучение'],
    },
    tech: {
      az: 'Villa hovuzunda əsas məqsəd uzunömürlü konstruksiya və asan baxımdır. Beton fasiləsiz tökülür, boru keçidləri betonlamadan əvvəl hermetik qoyulur, üzlükdən əvvəl hovuz su ilə doldurulub səviyyə 7–10 gün izlənir. Filtr və nasos gizli texniki otaqda yerləşdirilir ki, həyətin görünüşü pozulmasın və səs-küy evə çatmasın.',
      en: 'For a villa pool the main goals are a long-lasting structure and easy maintenance. Concrete is poured without interruption, pipe penetrations are sealed before pouring, and before finishing the pool is filled and the level monitored for 7–10 days. The filter and pump sit in a hidden plant room so the garden view stays clean and noise does not reach the house.',
      ru: 'Главное для бассейна виллы — долговечная конструкция и простой уход. Бетон заливается непрерывно, закладные герметизируются до бетонирования, а перед облицовкой чашу наполняют и 7–10 дней контролируют уровень. Фильтр и насос размещены в скрытом техпомещении, чтобы не портить вид двора и не беспокоить шумом дом.',
    },
    pillar: { az: '/villa-hovuzu-tikintisi', en: '/en/villa-pool-construction', ru: '/ru/bassejn-dlya-villy' },
    pillarLabel: { az: 'Villa hovuzu tikintisi', en: 'Villa pool construction', ru: 'Бассейн для виллы' },
  },
  infinityPool: {
    scope: {
      az: ['Mənzərə və torpaq analizi', 'Hidravlik hesablama və balans çəninin həcmi', 'Dəmir-beton kasa, daşma divarı və gizli oluq', 'Daşma kənarının millimetr dəqiqliyi ilə nivelirlənməsi', 'Hidroizolyasiya və su sınağı', 'Mozaika üzlük', 'Filtrasiya, avtomatik səviyyə nəzarəti və təhvil'],
      en: ['View and soil analysis', 'Hydraulic calculation and balance tank sizing', 'Concrete shell, weir wall and hidden gutter', 'Millimetre-accurate levelling of the overflow edge', 'Waterproofing and water test', 'Mosaic finish', 'Filtration, automatic level control and handover'],
      ru: ['Анализ вида и грунта', 'Гидравлический расчёт и объём переливной ёмкости', 'Железобетонная чаша, водослив и скрытый лоток', 'Нивелирование переливного борта с точностью до миллиметра', 'Гидроизоляция и водный тест', 'Облицовка мозаикой', 'Фильтрация, автоматика уровня и сдача'],
    },
    tech: {
      az: 'İnfinity effektinin əsası daşma kənarının tam üfüqi olmasıdır: kiçik meyl suyun bir küncdən axmasına səbəb olur və effekt pozulur. Kənar betonlamadan sonra ayrıca düzəldilir və su ilə sınanır. Daşan su gizli oluqdan balans çəninə yönəlir, filtrasiyadan keçib dibdəki jetlərlə yenidən hovuza qayıdır.',
      en: 'The infinity effect depends on a perfectly level overflow edge: even a slight tilt makes water pour from one corner and ruins the effect. The edge is finished separately after concreting and tested with water. Overflowing water goes through a hidden gutter to the balance tank, passes filtration and returns through floor inlets.',
      ru: 'Эффект инфинити держится на идеально горизонтальном переливном борте: даже небольшой уклон заставляет воду стекать с одного угла, и эффект пропадает. Борт доводится отдельно после бетонирования и проверяется водой. Переливающаяся вода через скрытый лоток уходит в ёмкость, проходит фильтрацию и возвращается через донные форсунки.',
    },
    pillar: { az: '/infinity-hovuz-tikintisi', en: '/en/infinity-pool-construction', ru: '/ru/stroitelstvo-infiniti-bassejnov' },
    pillarLabel: { az: 'İnfinity hovuz tikintisi', en: 'Infinity pool construction', ru: 'Инфинити-бассейны' },
  },
  hammam: {
    scope: {
      az: ['Konsepsiya və zonalaşdırma', 'Günbəz tavanın qurulması', 'Döşəmə, göbək daşı və oturacaqların isidilməsi', 'Çoxqatlı hidroizolyasiya', 'Ağ mərmər üzlük və kurnalar', 'Buxar generatoru, drenaj və ventilyasiya', 'Sınaq istismarı və təhvil'],
      en: ['Concept and zoning', 'Domed ceiling', 'Heating of the floor, göbek taşı and benches', 'Multi-layer waterproofing', 'White marble cladding and basins', 'Steam generator, drainage and ventilation', 'Trial operation and handover'],
      ru: ['Концепция и зонирование', 'Купольный потолок', 'Подогрев пола, гёбек-таша и лежаков', 'Многослойная гидроизоляция', 'Облицовка белым мрамором и курны', 'Парогенератор, дренаж и вентиляция', 'Пробная эксплуатация и сдача'],
    },
    tech: {
      az: 'Mərmər soyuq materialdır, ona görə hamamın komfortu isidilmiş döşəmə, göbək daşı və oturacaqlardan asılıdır. Buxar generatoru otağı 40–45°C və 90–100% rütubətdə saxlayır, günbəz tavan isə kondensatın istifadəçilərin üstünə damlamasına imkan vermir – su divarlar boyu drenaja axır. Mərmər birləşmələrində antibakterial derz tətbiq olunur.',
      en: 'Marble is a cold material, so the comfort of a hammam depends on the heated floor, göbek taşı and benches. The steam generator keeps the room at 40–45°C and 90–100% humidity, and the domed ceiling stops condensation dripping on bathers – the water runs down the walls to the drains. Marble joints are finished with antibacterial grout.',
      ru: 'Мрамор — холодный материал, поэтому комфорт хамама зависит от подогрева пола, гёбек-таша и лежаков. Парогенератор поддерживает 40–45°C и влажность 90–100%, а купольный потолок не даёт конденсату капать на людей — вода стекает по стенам в дренаж. Мраморные швы заполнены антибактериальной затиркой.',
    },
    pillar: { az: '/turk-hamami-tikintisi-baki', en: '/en/turkish-hammam-construction', ru: '/ru/stroitelstvo-turetskogo-hamama' },
    pillarLabel: { az: 'Türk hamamı tikintisi', en: 'Turkish hammam construction', ru: 'Строительство турецкого хамама' },
  },
  kese: {
    scope: {
      az: ['Hamam kompleksi ilə birlikdə planlaşdırma', 'Hidroizolyasiya və drenaj', 'Mərmər üzlük', 'İsidilən göbək daşı', 'Xüsusi kran və duş sistemi', 'Buxar mühitinin hamamla birləşdirilməsi'],
      en: ['Planning together with the hammam complex', 'Waterproofing and drainage', 'Marble cladding', 'Heated göbek taşı', 'Dedicated tap and shower system', 'Connection to the hammam steam environment'],
      ru: ['Планирование вместе с банным комплексом', 'Гидроизоляция и дренаж', 'Облицовка мрамором', 'Подогреваемый гёбек-таш', 'Специальная система кранов и душа', 'Объединение с паровой средой хамама'],
    },
    tech: {
      az: 'Kisə otağı hamam ritualının dəri baxımı mərhələsidir. Isti mərmər üzərində dərin təmizləmə aparılır, buna görə göbək daşı altdan isidilir, otaq hamamın buxar mühiti ilə birləşir və su ayrıca xəttlə drenaja axıdılır. Mərmər və derz nəmə davamlı, asan təmizlənən materiallardan seçilir.',
      en: 'The kese room is the skin-care stage of the hammam ritual. Deep scrubbing is done on warm marble, so the stone is heated from below, the room shares the hammam’s steam environment and water drains through a separate line. Marble and grout are chosen to resist moisture and be easy to clean.',
      ru: 'Кесе-комната — этап ухода за кожей в ритуале хамама. Глубокий пилинг проводится на тёплом мраморе, поэтому камень подогревается снизу, помещение объединено с паровой средой хамама, а вода отводится отдельной линией. Мрамор и затирка подобраны влагостойкие и легко моющиеся.',
    },
    pillar: { az: '/turk-hamami-tikintisi-baki', en: '/en/turkish-hammam-construction', ru: '/ru/stroitelstvo-turetskogo-hamama' },
    pillarLabel: { az: 'Türk hamamı tikintisi', en: 'Turkish hammam construction', ru: 'Строительство турецкого хамама' },
  },
  sauna: {
    scope: {
      az: ['Ölçü və soba gücünün hesablanması', 'Karkas və istiyə davamlı silikon kabel', 'Daş yunu izolyasiya və folqa buxar bariyeri', 'Termo-ağac üzlük və oturacaqlar', 'HARVIA sobası və idarəetmə pultu', 'Ventilyasiya, LED işıq və sınaq qızdırılması'],
      en: ['Sizing and heater power calculation', 'Frame and heat-resistant silicone wiring', 'Stone wool insulation and foil vapour barrier', 'Thermo-wood lining and benches', 'HARVIA heater and control panel', 'Ventilation, LED lighting and test heating'],
      ru: ['Расчёт размеров и мощности печи', 'Каркас и термостойкий силиконовый кабель', 'Утепление каменной ватой и фольгированная пароизоляция', 'Отделка и полки из термодерева', 'Печь HARVIA и пульт управления', 'Вентиляция, LED-подсветка и пробный прогрев'],
    },
    tech: {
      az: 'Fin saunasında temperatur 70–100°C, rütubət isə 10–20% saxlanılır. Saunanın tez qızması və az enerji sərf etməsi görünməyən hissədən – izolyasiya və buxar bariyerindən asılıdır. Sobanın yanında təmiz hava girişi, əks tərəfdə yuxarıda çıxış qurulur ki, hava dövriyyəsi Fin sauna normalarına uyğun olsun.',
      en: 'A Finnish sauna is kept at 70–100°C with 10–20% humidity. How fast it heats and how little energy it uses depends on the invisible part – insulation and the vapour barrier. Fresh air enters near the heater and exits high on the opposite wall, so circulation meets Finnish sauna standards.',
      ru: 'В финской сауне поддерживается 70–100°C при влажности 10–20%. Насколько быстро она прогревается и сколько тратит энергии, зависит от невидимой части — утепления и пароизоляции. Приток воздуха устроен у печи, вытяжка — вверху на противоположной стене, по нормам финской сауны.',
    },
    pillar: { az: '/sauna-tikintisi-baki', en: '/en/sauna-construction', ru: '/ru/stroitelstvo-saun' },
    pillarLabel: { az: 'Sauna tikintisi', en: 'Sauna construction', ru: 'Строительство саун' },
  },
  steam: {
    scope: {
      az: ['Otaq həcminə görə generator gücünün seçimi', 'Çoxqatlı elastik hidroizolyasiya', 'Kondensat üçün maili tavan və trapa meylli döşəmə', 'Keramika plitə üzlük', 'Buxara davamlı şüşə qapı', 'Gizli buxar generatoru və aromaterapiya sistemi'],
      en: ['Generator power selected for the room volume', 'Multi-layer elastic waterproofing', 'Sloped ceiling for condensation and floor falling to the drain', 'Ceramic tile finish', 'Steam-resistant glass door', 'Concealed steam generator and aromatherapy system'],
      ru: ['Подбор мощности генератора по объёму', 'Многослойная эластичная гидроизоляция', 'Наклонный потолок для конденсата и пол с уклоном к трапу', 'Облицовка керамической плиткой', 'Паростойкая стеклянная дверь', 'Скрытый парогенератор и система ароматерапии'],
    },
    tech: {
      az: 'Buxar otağında rütubət 100%-ə yaxındır, ona görə nəm konstruksiyaya keçməməlidir: divar, döşəmə və tavan çoxqatlı izolyasiya ilə örtülür. Generator otaqdan kənarda, texniki şkafda yerləşir və buxarı xüsusi başlıqla verir. Aroma dozatoru buxara efir yağları əlavə etməyə imkan verir.',
      en: 'Humidity in a steam room is close to 100%, so moisture must never reach the structure: walls, floor and ceiling are fully waterproofed. The generator sits outside the room in a technical cabinet and feeds steam through a special outlet. An aroma doser lets essential oils be added to the steam.',
      ru: 'Влажность в паровой близка к 100%, поэтому влага не должна попасть в конструкцию: стены, пол и потолок полностью гидроизолированы. Генератор вынесен из помещения в технический шкаф и подаёт пар через специальную форсунку. Дозатор позволяет добавлять в пар эфирные масла.',
    },
    pillar: { az: '/buxar-otagi-tikintisi', en: '/en/steam-room-construction', ru: '/ru/parovaya-komnata' },
    pillarLabel: { az: 'Buxar otağı tikintisi', en: 'Steam room construction', ru: 'Строительство парной' },
  },
  banya: {
    scope: {
      az: ['Kamenka gücü və ventilyasiyanın hesablanması', 'Karkas və elektrik xətləri', 'Daş yunu izolyasiya və folqa buxar bariyeri', 'Ağac interyer və pilləli oturacaqlar', 'Ənənəvi kamenka sobası və daşlar', 'İstirahət zonası'],
      en: ['Kamenka power and ventilation calculation', 'Frame and wiring', 'Stone wool insulation and foil vapour barrier', 'Wooden interior and tiered benches', 'Traditional kamenka stove and stones', 'Relaxation area'],
      ru: ['Расчёт мощности каменки и вентиляции', 'Каркас и электрика', 'Утепление каменной ватой и фольгированная пароизоляция', 'Деревянный интерьер и многоярусные полки', 'Традиционная каменка и камни', 'Зона отдыха'],
    },
    tech: {
      az: 'Rus hamamında buxar qızdırılmış daşlara su töküldükdə yaranır və temperatur yüksək rejimə qalxır. Ağacın illərlə qaralmadan qalması üçün divar arxasında folqa buxar bariyeri mütləqdir – banya tikintisində ən çox buraxılan səhv bu qatın olmamasıdır. Pilləli oturacaqlar istifadəçiyə istini pillə seçərək tənzimləməyə imkan verir.',
      en: 'In a Russian banya steam is created by pouring water on hot stones, taking the room to a high-heat mode. A foil vapour barrier behind the walls is essential for the wood to stay unblemished for years – leaving it out is the most common banya-building mistake. Tiered benches let bathers choose their heat level.',
      ru: 'В русской бане пар возникает, когда воду поддают на раскалённые камни, и температура выходит на высокий режим. Чтобы дерево годами не темнело, за обшивкой обязательна фольгированная пароизоляция — её отсутствие самая частая ошибка при строительстве бань. Ярусные полки позволяют выбрать комфортный жар.',
    },
    pillar: { az: '/rus-hamami-tikintisi-baki', en: '/en/russian-banya-construction', ru: '/ru/stroitelstvo-russkoj-bani' },
    pillarLabel: { az: 'Rus hamamı tikintisi', en: 'Russian banya construction', ru: 'Строительство русской бани' },
  },
  spaRoom: {
    scope: {
      az: ['SPA dövrəsində yerinin planlaşdırılması', 'Hidroizolyasiya, drenaj və ventilyasiya', 'Bitirmə işləri və üzlük', 'Avadanlığın quraşdırılması', 'İdarəetmə sistemi və sınaq'],
      en: ['Planning its place in the spa circuit', 'Waterproofing, drainage and ventilation', 'Finishing and cladding', 'Equipment installation', 'Control system and testing'],
      ru: ['Место в СПА-маршруте', 'Гидроизоляция, дренаж и вентиляция', 'Отделка и облицовка', 'Монтаж оборудования', 'Система управления и испытания'],
    },
    tech: {
      az: 'SPA zonasında hər otaq qonağın ümumi marşrutunun bir hissəsidir: isti zona → soyuq zona → istirahət. Ona görə otaq yalnız özü üçün yox, qonşu zonalarla birlikdə planlaşdırılır – ventilyasiya, drenaj və elektrik bütün kompleks üçün vahid sxemlə həll olunur.',
      en: 'In a spa every room is part of the guest’s route: hot zone → cold zone → rest. So the room is planned not on its own but together with the neighbouring zones – ventilation, drainage and electrics follow a single scheme for the whole complex.',
      ru: 'В СПА каждое помещение — часть маршрута гостя: горячая зона → холодная → отдых. Поэтому помещение проектируется вместе с соседними зонами — вентиляция, дренаж и электрика решаются единой схемой для всего комплекса.',
    },
    pillar: { az: '/spa-tikintisi-baki', en: '/en/spa-center-construction', ru: '/ru/stroitelstvo-spa-centrov' },
    pillarLabel: { az: 'SPA mərkəzi tikintisi', en: 'Spa centre construction', ru: 'Строительство СПА-центров' },
  },
} satisfies Record<string, ProjectKind>

export type KindKey = keyof typeof KINDS

export type ProjectData = {
  slug: string
  kind: KindKey
  /** ≤ 60 chars per locale (brand added by template). */
  title: L3
  /** Facts for meta description: short label of what was built. */
  what: L3
  place: L3
  size: string
  days: number
  /** Optional extra project-specific paragraph (beyond the migrated intro). */
  extra?: L3
  /** Sibling project slugs to link (same complex / same type). */
  related?: string[]
}
