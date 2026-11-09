import type { ContentEntry } from '../types'
import { pillarMetaFor } from './meta'

/**
 * Pillar: SPA centre. Facts: old site (zones, safety, EU components) + Crown and My Class project data
 * (hammam, banya, sauna, steam, kese, ice pool, salt room, massage, jacuzzi, pool).
 */
export const spaTikintisi: ContentEntry = {
  collection: 'categories',
  slug: 'spa-tikintisi-baki',
  locales: {
    az: {
      ...pillarMetaFor('spa-tikintisi-baki', 'az'),
      html: `
<p>SPA mərkəzinin tikintisi adi tikintidən fərqlidir: bir məkanda yüksək rütubət, yüksək temperatur, su, güclü elektrik və intensiv ventilyasiya birləşir və bunların hamısı təhlükəsiz və gigiyenik işləməlidir. Complex MMC otellər, fitnes klubları, klinikalar və lüks villalar üçün SPA və wellness komplekslərini konsepsiyadan açılışa qədər – açar təslim tikir. <strong>Crown Wellness Club</strong>-un tam SPA kompleksi və <strong>My Class Yasamal</strong>-ın wellness zonası bizim işimizdir.</p>

<h2>SPA kompleksinin zonaları</h2>
<h3>İsti zonalar</h3>
<ul>
<li><a href="/turk-hamami-tikintisi-baki">Türk hamamı</a> – mərmər, göbək daşı, günbəz tavan;</li>
<li><a href="/rus-hamami-tikintisi-baki">Rus hamamı (banya)</a> – ağac konstruksiya, kamenka;</li>
<li><a href="/sauna-tikintisi-baki">Fin saunası</a> və infraqırmızı sauna;</li>
<li><a href="/buxar-otagi-tikintisi">Buxar otağı</a> – 40–50°C, 90–100% rütubət;</li>
<li>Kisə otağı – isti mərmər üzərində dəri baxımı.</li>
</ul>
<h3>Soyuq zonalar</h3>
<ul>
<li>Buz (şok) hovuzu, şok duşu, şok vedrəsi, buz bulağı – isti–soyuq kontrastı üçün.</li>
</ul>
<h3>Su zonası</h3>
<ul>
<li><a href="/hovuz-tikintisi">Hovuz</a>, cakuzi və hidromasaj sistemləri.</li>
</ul>
<h3>Terapiya və istirahət</h3>
<ul>
<li>Duz otağı (haloterapiya) – Himalay duz kristalları, halogenerator;</li>
<li>Masaj otaqları, relaks zonası, isti daş oturacaqlar.</li>
</ul>

<h2>Zonalaşdırma: müştəri axını necə qurulur?</h2>
<p>Yaxşı SPA-da qonaq soyunub-geyinmə otağından çıxaraq məntiqi ardıcıllıqla hərəkət edir: duş → isti zona → soyuq zona → istirahət → yenidən isti zona. "Quru" (relaks, masaj) və "yaş" (hamam, hovuz) zonalar arasında keçidlər sürüşməyən döşəmə, drenaj və temperatur fərqi nəzərə alınaraq planlaşdırılır. Bu ardıcıllığı layihənin ilk mərhələsində 3D vizualizasiya ilə sizinlə birlikdə müəyyən edirik.</p>

<h2>Mühəndislik standartları və təhlükəsizlik</h2>
<ul>
<li><strong>Ventilyasiya:</strong> hər zona üçün ayrıca hava mübadiləsi; rütubətli zonaların havası quru zonalara keçməməlidir.</li>
<li><strong>Hidroizolyasiya:</strong> bütün yaş zonalarda çoxqatlı, elastik izolyasiya və su sınağı.</li>
<li><strong>Elektrik təhlükəsizliyi:</strong> buxar generatorları, sauna sobaları və nasoslar yaş mühit üçün qoruma sinfinə uyğun quraşdırılır.</li>
<li><strong>Su hazırlığı:</strong> hovuz və cakuzi üçün filtrasiya, UV dezinfeksiya və avtomatik dozaj.</li>
<li><strong>Enerji:</strong> istilik pompası və istilik bərpası ilə işlətmə xərcinin azaldılması.</li>
</ul>
<p>Avadanlıqlarda İspaniya, Almaniya və İtaliyanın aparıcı istehsalçılarının komponentlərindən istifadə edirik. Avadanlıq təchizatı haqqında: <a href="/services/spa-avadanliqlari">SPA və wellness avadanlıqları</a>.</p>

<h2>Layihədən açılışa qədər</h2>
<ol>
<li>Konsepsiya: hədəf auditoriya, qonaq sayı, zonaların tərkibi və sahəsi.</li>
<li>Layihələndirmə: memarlıq, zonalaşdırma, ventilyasiya, su, elektrik, isitmə; iş həcmi cədvəli (BOQ). Bax: <a href="/spa-layiheledirilmesi">SPA layihələndirilməsi</a>.</li>
<li>Tikinti: konstruksiya, hidroizolyasiya, mühəndis sistemləri.</li>
<li>Bitirmə işləri: mərmər, mozaika, ağac, işıqlandırma.</li>
<li>Avadanlıq montajı və istismara buraxılma.</li>
<li>Personalın təlimi və təhvil.</li>
</ol>
<p>Müddət kompleksin tərkibindən asılıdır. İstinad üçün: Crown SPA-da türk hamamı 28 gün, rus hamamı 20 gün, sauna 16 gün, buxar otağı 15 gün, buz hovuzu 15 gün, kisə otağı 12 gündə tamamlanıb.</p>

<h2>Otel üçün SPA</h2>
<p>Otel SPA-sı həm qonaqlar, həm də kənar üzvlər üçün gəlir mənbəyidir. Sahə məhdud olduqda kompakt, lakin tam ritual təklif edən kombinasiya seçirik: hovuz + hamam + sauna + buxar + relaks. Ətraflı: <a href="/blog/otel-ucun-spa-zonasi-layihelendirme">otel üçün SPA zonasının layihələndirilməsi</a>, <a href="/blog/spa-merkezi-acmaq-ucun-avadanliq-siyahisi">SPA mərkəzi açmaq üçün avadanlıq siyahısı</a>.</p>

<h2>Villa üçün SPA</h2>
<p>Villada SPA adətən hovuz kənarında və ya zirzəmidə qurulur: sauna və ya hamam, buxar otağı, şok duşu və istirahət künc. Bütün zonalar vahid texniki otaqdan idarə olunur.</p>

<h2>Tamamladığımız SPA layihələri</h2>
<h3>Crown Wellness Club – tam SPA kompleksi</h3>
<ul>
<li><a href="/projects/crown-turk">Türk hamamı</a> – 6×5 m, mərmər, 28 gün</li>
<li><a href="/projects/crown-rus">Rus hamamı</a> – 4×4 m, 20 gün</li>
<li><a href="/projects/crown-saunaa">Fin saunası</a> – 4×3 m, Harvia, 16 gün</li>
<li><a href="/projects/crown-buxar">Buxar otağı</a> – 4×3 m, 15 gün</li>
<li><a href="/projects/crown-buz">Buz (şok) hovuzu</a> – 3×3 m, mozaika, 15 gün</li>
<li><a href="/projects/crown-kise">Kisə otağı</a> – 3×3 m, mərmər, 12 gün</li>
</ul>
<h3>My Class Yasamal – idman kompleksinin wellness zonası</h3>
<ul>
<li><a href="/projects/myclass-hovuz">Hovuz</a> – 20×10 m daşma, 55 gün</li>
<li><a href="/projects/myclass-cakuzi">Cakuzi</a> – 4×4 m, 20 gün</li>
<li><a href="/projects/myclass-hamam">Türk hamamı</a> – 5×4 m, 25 gün</li>
<li><a href="/projects/myclass-sauna">Sauna</a> – 3×3 m, 15 gün</li>
<li><a href="/projects/myclass-buxar">Buxar otağı</a> – 3×2 m, 12 gün</li>
<li><a href="/projects/myclass-duzotagi">Duz otağı</a> – 4×3 m, Himalay duzu, 18 gün</li>
<li><a href="/projects/myclass-masaj">Masaj otağı</a> – 3×3 m, 10 gün</li>
<li><a href="/projects/myclass-kise">Kisə otağı</a> – 3×3 m, 12 gün</li>
</ul>

<h2>Qiymət</h2>
<p>SPA kompleksinin qiyməti zonaların sayından və sahəsindən, materiallardan (mərmər, mozaika, ağac) və avadanlıq səviyyəsindən asılıdır. Planınızı və ya sahənin ölçülərini göndərin – konsepsiya və ilkin büdcə hazırlayaq. <a href="/contact">Bizimlə əlaqə</a>.</p>
`,
    },
    en: {
      ...pillarMetaFor('spa-tikintisi-baki', 'en'),
      html: `
<p>Building a spa centre is different from ordinary construction: high humidity, high temperatures, water, heavy electrical loads and intensive ventilation all meet in one space, and all of it must work safely and hygienically. Complex MMC builds spa and wellness complexes for hotels, fitness clubs, clinics and luxury villas – turnkey, from concept to opening. The full spa complex at <strong>Crown Wellness Club</strong> and the wellness area at <strong>My Class Yasamal</strong> are our work.</p>

<h2>Zones of a spa complex</h2>
<h3>Hot zones</h3>
<ul>
<li><a href="/en/turkish-hammam-construction">Turkish hammam</a> – marble, göbek taşı, domed ceiling;</li>
<li><a href="/en/russian-banya-construction">Russian banya</a> – wooden construction, kamenka;</li>
<li><a href="/en/sauna-construction">Finnish sauna</a> and infrared sauna;</li>
<li><a href="/en/steam-room-construction">Steam room</a> – 40–50°C, 90–100% humidity;</li>
<li>Kese room – skin care on heated marble.</li>
</ul>
<h3>Cold zones</h3>
<ul>
<li>Ice (plunge) pool, ice shower, cold bucket, ice fountain – for hot–cold contrast.</li>
</ul>
<h3>Water zone</h3>
<ul>
<li><a href="/en/swimming-pool-construction">Pool</a>, jacuzzi and hydromassage systems.</li>
</ul>
<h3>Therapy and relaxation</h3>
<ul>
<li>Salt room (halotherapy) – Himalayan salt crystals, halogenerator;</li>
<li>Massage rooms, relaxation area, heated stone loungers.</li>
</ul>

<h2>Zoning: how guests move through the spa</h2>
<p>In a good spa, guests leave the changing room and move in a logical sequence: shower → hot zone → cold zone → rest → hot zone again. Transitions between "dry" (relaxation, massage) and "wet" (hammam, pool) zones are planned with non-slip flooring, drainage and temperature differences in mind. We define this flow with you at the very first stage using a 3D visualisation.</p>

<h2>Engineering standards and safety</h2>
<ul>
<li><strong>Ventilation:</strong> separate air exchange for each zone; humid air must not reach the dry zones.</li>
<li><strong>Waterproofing:</strong> multi-layer, elastic waterproofing and water testing in all wet zones.</li>
<li><strong>Electrical safety:</strong> steam generators, sauna heaters and pumps installed with protection ratings for wet environments.</li>
<li><strong>Water treatment:</strong> filtration, UV disinfection and automatic dosing for the pool and jacuzzi.</li>
<li><strong>Energy:</strong> heat pumps and heat recovery to cut running costs.</li>
</ul>
<p>We use components from leading Spanish, German and Italian manufacturers.</p>

<h2>From design to opening</h2>
<ol>
<li>Concept: target audience, number of guests, zone mix and floor area.</li>
<li>Design: architecture, zoning, ventilation, water, electrics, heating; bill of quantities (BOQ).</li>
<li>Construction: structure, waterproofing, building services.</li>
<li>Finishing: marble, mosaic, wood, lighting.</li>
<li>Equipment installation and commissioning.</li>
<li>Staff training and handover.</li>
</ol>
<p>Timelines depend on the mix of zones. For reference, at Crown SPA the Turkish hammam took 28 days, the Russian banya 20 days, the sauna 16 days, the steam room 15 days, the ice pool 15 days and the kese room 12 days.</p>

<h2>Spa for hotels</h2>
<p>A hotel spa earns revenue from both guests and outside members. When space is limited we choose a compact combination that still offers the full ritual: pool + hammam + sauna + steam + relaxation.</p>

<h2>Spa for villas</h2>
<p>At a villa the spa is usually built by the pool or in the basement: a sauna or hammam, a steam room, an ice shower and a relaxation corner, all controlled from a single plant room.</p>

<h2>Our completed spa projects</h2>
<h3>Crown Wellness Club – full spa complex</h3>
<ul>
<li><a href="/en/projects/crown-turk">Turkish hammam</a> – 6×5 m, marble, 28 days</li>
<li><a href="/en/projects/crown-rus">Russian banya</a> – 4×4 m, 20 days</li>
<li><a href="/en/projects/crown-saunaa">Finnish sauna</a> – 4×3 m, Harvia, 16 days</li>
<li><a href="/en/projects/crown-buxar">Steam room</a> – 4×3 m, 15 days</li>
<li><a href="/en/projects/crown-buz">Ice (plunge) pool</a> – 3×3 m, mosaic, 15 days</li>
<li><a href="/en/projects/crown-kise">Kese room</a> – 3×3 m, marble, 12 days</li>
</ul>
<h3>My Class Yasamal – wellness area of a sports complex</h3>
<ul>
<li><a href="/en/projects/myclass-hovuz">Pool</a> – 20×10 m overflow, 55 days</li>
<li><a href="/en/projects/myclass-cakuzi">Jacuzzi</a> – 4×4 m, 20 days</li>
<li><a href="/en/projects/myclass-hamam">Turkish hammam</a> – 5×4 m, 25 days</li>
<li><a href="/en/projects/myclass-sauna">Sauna</a> – 3×3 m, 15 days</li>
<li><a href="/en/projects/myclass-buxar">Steam room</a> – 3×2 m, 12 days</li>
<li><a href="/en/projects/myclass-duzotagi">Salt room</a> – 4×3 m, Himalayan salt, 18 days</li>
<li><a href="/en/projects/myclass-masaj">Massage room</a> – 3×3 m, 10 days</li>
<li><a href="/en/projects/myclass-kise">Kese room</a> – 3×3 m, 12 days</li>
</ul>

<h2>Price</h2>
<p>The price of a spa complex depends on the number and size of zones, materials (marble, mosaic, wood) and the level of equipment. Send us your plan or floor dimensions and we will prepare a concept and an initial budget. <a href="/en/contact">Contact us</a>.</p>
`,
    },
    ru: {
      ...pillarMetaFor('spa-tikintisi-baki', 'ru'),
      html: `
<p>Строительство СПА-центра отличается от обычной стройки: в одном пространстве сходятся высокая влажность, высокая температура, вода, мощная электрика и интенсивная вентиляция — и всё это должно работать безопасно и гигиенично. Complex MMC строит СПА и велнес-комплексы для отелей, фитнес-клубов, клиник и премиальных вилл под ключ — от концепции до открытия. Полный СПА-комплекс <strong>Crown Wellness Club</strong> и велнес-зона <strong>My Class Ясамал</strong> — наша работа.</p>

<h2>Зоны СПА-комплекса</h2>
<h3>Горячие зоны</h3>
<ul>
<li><a href="/ru/stroitelstvo-turetskogo-hamama">Турецкий хамам</a> — мрамор, гёбек-таш, купол;</li>
<li><a href="/ru/stroitelstvo-russkoj-bani">Русская баня</a> — деревянная конструкция, каменка;</li>
<li><a href="/ru/stroitelstvo-saun">Финская</a> и инфракрасная сауна;</li>
<li><a href="/ru/parovaya-komnata">Паровая</a> — 40–50°C, влажность 90–100%;</li>
<li>Кесе-комната — уход за кожей на подогреваемом мраморе.</li>
</ul>
<h3>Холодные зоны</h3>
<ul>
<li>Ледяная купель, ледяной душ, обливное ведро, ледогенератор — для контраста «жар–холод».</li>
</ul>
<h3>Водная зона</h3>
<ul>
<li><a href="/ru/stroitelstvo-bassejnov">Бассейн</a>, джакузи и гидромассажные системы.</li>
</ul>
<h3>Терапия и отдых</h3>
<ul>
<li>Соляная комната (галотерапия) — кристаллы гималайской соли, галогенератор;</li>
<li>Массажные кабинеты, зона релаксации, подогреваемые каменные лежаки.</li>
</ul>

<h2>Зонирование: маршрут гостя</h2>
<p>В хорошем СПА гость выходит из раздевалки и движется в логичной последовательности: душ → горячая зона → холодная → отдых → снова горячая. Переходы между «сухими» (релакс, массаж) и «мокрыми» (хамам, бассейн) зонами проектируются с учётом нескользящих полов, дренажа и перепада температур. Маршрут определяем вместе с вами на первом этапе по 3D-визуализации.</p>

<h2>Инженерные стандарты и безопасность</h2>
<ul>
<li><strong>Вентиляция:</strong> отдельный воздухообмен для каждой зоны; влажный воздух не должен попадать в сухие зоны.</li>
<li><strong>Гидроизоляция:</strong> многослойная эластичная гидроизоляция и водный тест во всех мокрых зонах.</li>
<li><strong>Электробезопасность:</strong> парогенераторы, печи и насосы с классом защиты для влажных помещений.</li>
<li><strong>Водоподготовка:</strong> фильтрация, УФ-обеззараживание и автодозирование для бассейна и джакузи.</li>
<li><strong>Энергия:</strong> тепловые насосы и рекуперация тепла снижают эксплуатационные расходы.</li>
</ul>
<p>Используем компоненты ведущих производителей Испании, Германии и Италии.</p>

<h2>От проекта до открытия</h2>
<ol>
<li>Концепция: целевая аудитория, число гостей, состав и площадь зон.</li>
<li>Проектирование: архитектура, зонирование, вентиляция, водоснабжение, электрика, отопление; ведомость объёмов работ (BOQ).</li>
<li>Строительство: конструкции, гидроизоляция, инженерные системы.</li>
<li>Отделка: мрамор, мозаика, дерево, освещение.</li>
<li>Монтаж оборудования и пусконаладка.</li>
<li>Обучение персонала и сдача.</li>
</ol>
<p>Сроки зависят от состава комплекса. Для ориентира: в Crown SPA турецкий хамам построен за 28 дней, русская баня — за 20, сауна — за 16, паровая — за 15, ледяная купель — за 15, кесе-комната — за 12 дней.</p>

<h2>СПА для отеля</h2>
<p>СПА в отеле приносит доход и от гостей, и от внешних членов клуба. При ограниченной площади выбираем компактную комбинацию с полным ритуалом: бассейн + хамам + сауна + паровая + зона отдыха.</p>

<h2>СПА для виллы</h2>
<p>На вилле СПА обычно размещают у бассейна или в цокольном этаже: сауна или хамам, паровая, ледяной душ и уголок отдыха — всё управляется из одного техпомещения.</p>

<h2>Наши СПА-проекты</h2>
<h3>Crown Wellness Club — полный СПА-комплекс</h3>
<ul>
<li><a href="/ru/projects/crown-turk">Турецкий хамам</a> — 6×5 м, мрамор, 28 дней</li>
<li><a href="/ru/projects/crown-rus">Русская баня</a> — 4×4 м, 20 дней</li>
<li><a href="/ru/projects/crown-saunaa">Финская сауна</a> — 4×3 м, Harvia, 16 дней</li>
<li><a href="/ru/projects/crown-buxar">Паровая</a> — 4×3 м, 15 дней</li>
<li><a href="/ru/projects/crown-buz">Ледяная купель</a> — 3×3 м, мозаика, 15 дней</li>
<li><a href="/ru/projects/crown-kise">Кесе-комната</a> — 3×3 м, мрамор, 12 дней</li>
</ul>
<h3>My Class Ясамал — велнес-зона спорткомплекса</h3>
<ul>
<li><a href="/ru/projects/myclass-hovuz">Бассейн</a> — 20×10 м, переливной, 55 дней</li>
<li><a href="/ru/projects/myclass-cakuzi">Джакузи</a> — 4×4 м, 20 дней</li>
<li><a href="/ru/projects/myclass-hamam">Турецкий хамам</a> — 5×4 м, 25 дней</li>
<li><a href="/ru/projects/myclass-sauna">Сауна</a> — 3×3 м, 15 дней</li>
<li><a href="/ru/projects/myclass-buxar">Паровая</a> — 3×2 м, 12 дней</li>
<li><a href="/ru/projects/myclass-duzotagi">Соляная комната</a> — 4×3 м, гималайская соль, 18 дней</li>
<li><a href="/ru/projects/myclass-masaj">Массажный кабинет</a> — 3×3 м, 10 дней</li>
<li><a href="/ru/projects/myclass-kise">Кесе-комната</a> — 3×3 м, 12 дней</li>
</ul>

<h2>Стоимость</h2>
<p>Цена СПА-комплекса зависит от количества и площади зон, материалов (мрамор, мозаика, дерево) и уровня оборудования. Пришлите план или размеры помещения — подготовим концепцию и предварительный бюджет. <a href="/ru/contact">Связаться с нами</a>.</p>
`,
    },
  },
}
