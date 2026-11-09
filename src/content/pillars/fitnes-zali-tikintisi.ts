import type { ContentEntry } from '../types'
import { pillarMetaFor } from './meta'

/** Pillar: Fitness club. Facts: old site (zones, joint technical planning) + Makfit 25×15/70d, My Class wellness area. */
export const fitnesZali: ContentEntry = {
  collection: 'categories',
  slug: 'fitnes-zali-tikintisi',
  locales: {
    az: {
      ...pillarMetaFor('fitnes-zali-tikintisi', 'az'),
      html: `
<p>Fitnes klubunun gəliri yalnız məşq zalından deyil, çox vaxt wellness zonasından da asılıdır: hovuz, sauna, buxar otağı və hamam üzvlüyü cəlbedici edir və qonaqların klubda daha uzun qalmasına səbəb olur. Complex MMC fitnes və idman klubları üçün kommersiya hovuzlarını, sauna, hamam və SPA zonalarını tikir. <strong>Makfit</strong>-in 25×15 m hovuzu və <strong>My Class Yasamal</strong>-ın hovuz, cakuzi, hamam, sauna, buxar və duz otağından ibarət wellness zonası bizim işimizdir.</p>

<h2>Fitnes klubu üçün nələri tikirik?</h2>
<ul>
<li><strong>Kommersiya hovuzu</strong> – daşma tipli, yüksək tutumlu filtrasiya, UV dezinfeksiya və avtomatik dozaj ilə. Bax: <a href="/hovuz-tikintisi">hovuz tikintisi</a>.</li>
<li><strong>Cakuzi və hidromasaj</strong> – hovuz zonasının davamı kimi.</li>
<li><strong>İsti zonalar</strong> – <a href="/sauna-tikintisi-baki">sauna</a>, <a href="/buxar-otagi-tikintisi">buxar otağı</a>, <a href="/turk-hamami-tikintisi-baki">türk hamamı</a>, <a href="/rus-hamami-tikintisi-baki">rus hamamı</a>.</li>
<li><strong>Terapiya otaqları</strong> – duz otağı, masaj və kisə otaqları.</li>
<li><strong>Soyunub-geyinmə və duş zonaları</strong> – yaş zonaların düzgün ayrılması, sürüşməyən döşəmə və drenaj.</li>
</ul>

<h2>Niyə hamısını bir layihədə planlaşdırmaq lazımdır?</h2>
<p>Məşq zalında intensiv hərəkət üçün güclü hava mübadiləsi lazımdır, hovuz və hamam zonasında isə rütubət idarə olunmalıdır. Bu sistemlər ayrı-ayrı planlaşdırıldıqda nəmli hava zala keçir, kondensat və kif yaranır, enerji sərfiyyatı artır – sonradan düzəltmək baha başa gəlir. Ona görə texniki otağın ölçüsünü, ventilyasiya aqreqatlarını, su və elektrik gücünü layihənin əvvəlində bütün zonalar üçün birlikdə hesablayırıq.</p>

<h2>Kommersiya hovuzunun xüsusiyyətləri</h2>
<ul>
<li><strong>Daşma sistemi:</strong> çox sayda üzgüçü olduqda səth suyunu yalnız daşma kanalı effektiv təmizləyir.</li>
<li><strong>Balans çəni:</strong> üzgüçülərin sıxışdırdığı suyu qəbul edir və səviyyəni sabit saxlayır.</li>
<li><strong>Filtrasiya tutumu:</strong> su keyfiyyəti gün ərzində dəyişən yükə görə hesablanır.</li>
<li><strong>Dezinfeksiya:</strong> UV, avtomatik xlor və pH dozajı – gigiyena tələblərinə uyğun.</li>
<li><strong>İsitmə və istilik bərpası:</strong> il boyu istifadə üçün işlətmə xərcini azaldır.</li>
</ul>
<p>Ətraflı: <a href="/blog/din-19643-hovuz-su-keyfiyyeti-standarti">DIN 19643 hovuz su keyfiyyəti standartı</a>, <a href="/blog/hovuz-hidravlik-hesablama-su-izolyasiyasi">hovuzun hidravlik hesablanması</a>.</p>

<h2>Layihə mərhələləri</h2>
<ol>
<li>Konsepsiya: üzv sayı, zonaların tərkibi, iş saatları.</li>
<li>Layihə: zonalaşdırma, ventilyasiya, su hazırlığı, elektrik, isitmə, iş həcmi cədvəli (BOQ).</li>
<li>Hovuz və yaş zonaların konstruksiyası, hidroizolyasiya və sınaq.</li>
<li>İsti zonaların tikintisi və bitirmə işləri.</li>
<li>Avadanlıq montajı, istismara buraxılma, personal təlimi.</li>
</ol>
<p>Makfit-in 25×15 m kommersiya hovuzu <strong>70 gündə</strong>, My Class-ın 20×10 m hovuzu <strong>55 gündə</strong> tamamlanıb; wellness otaqları 10–25 gün aralığında təhvil verilib.</p>

<h2>Tamamladığımız layihələr</h2>
<h3>Makfit fitnes klubu</h3>
<ul>
<li><a href="/projects/makfit-hovuz">Kommersiya daşma hovuzu</a> – 25×15 m, 70 gün.</li>
</ul>
<h3>My Class Yasamal idman kompleksi</h3>
<ul>
<li><a href="/projects/myclass-hovuz">Hovuz</a> – 20×10 m daşma, 55 gün</li>
<li><a href="/projects/myclass-cakuzi">Cakuzi</a> – 4×4 m, 20 gün</li>
<li><a href="/projects/myclass-hamam">Türk hamamı</a> – 5×4 m, 25 gün</li>
<li><a href="/projects/myclass-sauna">Sauna</a> – 3×3 m, 15 gün</li>
<li><a href="/projects/myclass-buxar">Buxar otağı</a> – 3×2 m, 12 gün</li>
<li><a href="/projects/myclass-duzotagi">Duz otağı</a> – 4×3 m, 18 gün</li>
</ul>
<p>Otel və digər kommersiya obyektləri üçün eyni yanaşma: <a href="/spa-tikintisi-baki">SPA mərkəzi tikintisi</a>.</p>

<h2>Qiymət</h2>
<p>Qiymət zalın və hovuzun sahəsindən, wellness zonasının tərkibindən və seçilən materiallardan asılıdır. Sahənin ölçüsünü və hansı zonaları istədiyinizi göndərin – fərdi təklif hazırlayaq. <a href="/contact">Bizimlə əlaqə</a>.</p>
`,
    },
    en: {
      ...pillarMetaFor('fitnes-zali-tikintisi', 'en'),
      html: `
<p>A fitness club's revenue often depends not only on the gym floor but also on the wellness area: a pool, sauna, steam room and hammam make membership more attractive and keep members in the club longer. Complex MMC builds commercial pools, saunas, hammams and spa areas for fitness and sports clubs. The 25×15 m pool at <strong>Makfit</strong> and the wellness area at <strong>My Class Yasamal</strong> – pool, jacuzzi, hammam, sauna, steam and salt room – are our work.</p>

<h2>What do we build for fitness clubs?</h2>
<ul>
<li><strong>Commercial pool</strong> – overflow type with high-capacity filtration, UV disinfection and automatic dosing. See <a href="/en/swimming-pool-construction">swimming pool construction</a>.</li>
<li><strong>Jacuzzi and hydromassage</strong> – as an extension of the pool area.</li>
<li><strong>Hot zones</strong> – <a href="/en/sauna-construction">sauna</a>, <a href="/en/steam-room-construction">steam room</a>, <a href="/en/turkish-hammam-construction">Turkish hammam</a>, <a href="/en/russian-banya-construction">Russian banya</a>.</li>
<li><strong>Therapy rooms</strong> – salt room, massage and kese rooms.</li>
<li><strong>Changing rooms and showers</strong> – proper separation of wet zones, non-slip floors and drainage.</li>
</ul>

<h2>Why plan everything as one project?</h2>
<p>The gym needs strong air exchange for intense exercise, while the pool and hammam areas need humidity control. When these systems are planned separately, humid air leaks into the gym, condensation and mould appear, and energy use rises – and fixing it later is expensive. That is why we size the plant room, ventilation units, water and electrical capacity for all zones together at the start.</p>

<h2>What makes a commercial pool different</h2>
<ul>
<li><strong>Overflow system:</strong> with many swimmers, only an overflow channel cleans the surface water effectively.</li>
<li><strong>Balance tank:</strong> absorbs the water displaced by swimmers and keeps the level stable.</li>
<li><strong>Filtration capacity:</strong> sized for the load that changes throughout the day.</li>
<li><strong>Disinfection:</strong> UV plus automatic chlorine and pH dosing to meet hygiene requirements.</li>
<li><strong>Heating and heat recovery:</strong> cut running costs for year-round use.</li>
</ul>

<h2>Project stages</h2>
<ol>
<li>Concept: number of members, zone mix, opening hours.</li>
<li>Design: zoning, ventilation, water treatment, electrics, heating, bill of quantities (BOQ).</li>
<li>Pool and wet-zone structures, waterproofing and testing.</li>
<li>Hot zones and finishing.</li>
<li>Equipment installation, commissioning, staff training.</li>
</ol>
<p>Makfit's 25×15 m commercial pool was completed in <strong>70 days</strong> and My Class's 20×10 m pool in <strong>55 days</strong>; the wellness rooms were handed over in 10–25 days each.</p>

<h2>Our completed projects</h2>
<h3>Makfit fitness club</h3>
<ul>
<li><a href="/en/projects/makfit-hovuz">Commercial overflow pool</a> – 25×15 m, 70 days.</li>
</ul>
<h3>My Class Yasamal sports complex</h3>
<ul>
<li><a href="/en/projects/myclass-hovuz">Pool</a> – 20×10 m overflow, 55 days</li>
<li><a href="/en/projects/myclass-cakuzi">Jacuzzi</a> – 4×4 m, 20 days</li>
<li><a href="/en/projects/myclass-hamam">Turkish hammam</a> – 5×4 m, 25 days</li>
<li><a href="/en/projects/myclass-sauna">Sauna</a> – 3×3 m, 15 days</li>
<li><a href="/en/projects/myclass-buxar">Steam room</a> – 3×2 m, 12 days</li>
<li><a href="/en/projects/myclass-duzotagi">Salt room</a> – 4×3 m, 18 days</li>
</ul>
<p>The same approach for hotels and other commercial venues: <a href="/en/spa-center-construction">spa centre construction</a>.</p>

<h2>Price</h2>
<p>The price depends on the gym and pool area, the wellness mix and the chosen materials. Send us the floor dimensions and the zones you want, and we will prepare a personal quote. <a href="/en/contact">Contact us</a>.</p>
`,
    },
    ru: {
      ...pillarMetaFor('fitnes-zali-tikintisi', 'ru'),
      html: `
<p>Доход фитнес-клуба часто зависит не только от тренажёрного зала, но и от велнес-зоны: бассейн, сауна, паровая и хамам делают абонемент привлекательнее и удерживают гостей в клубе дольше. Complex MMC строит для фитнес- и спортклубов коммерческие бассейны, сауны, хамамы и СПА-зоны. Бассейн 25×15 м в <strong>Makfit</strong> и велнес-зона <strong>My Class Ясамал</strong> — бассейн, джакузи, хамам, сауна, паровая и соляная комната — наша работа.</p>

<h2>Что мы строим для фитнес-клубов</h2>
<ul>
<li><strong>Коммерческий бассейн</strong> — переливной, с фильтрацией большой производительности, УФ-обеззараживанием и автодозированием. См. <a href="/ru/stroitelstvo-bassejnov">строительство бассейнов</a>.</li>
<li><strong>Джакузи и гидромассаж</strong> — как продолжение зоны бассейна.</li>
<li><strong>Горячие зоны</strong> — <a href="/ru/stroitelstvo-saun">сауна</a>, <a href="/ru/parovaya-komnata">паровая</a>, <a href="/ru/stroitelstvo-turetskogo-hamama">турецкий хамам</a>, <a href="/ru/stroitelstvo-russkoj-bani">русская баня</a>.</li>
<li><strong>Терапевтические помещения</strong> — соляная комната, массажные и кесе-кабинеты.</li>
<li><strong>Раздевалки и душевые</strong> — правильное разделение мокрых зон, нескользящий пол и дренаж.</li>
</ul>

<h2>Почему всё нужно проектировать вместе</h2>
<p>Тренажёрному залу нужен мощный воздухообмен, а зоне бассейна и хамама — контроль влажности. Если системы проектировать раздельно, влажный воздух попадает в зал, появляются конденсат и плесень, растёт расход энергии — исправлять это потом дорого. Поэтому размер техпомещения, вентиляционные установки, водо- и электроснабжение мы рассчитываем для всех зон сразу, в начале проекта.</p>

<h2>Особенности коммерческого бассейна</h2>
<ul>
<li><strong>Переливная система:</strong> при большом числе пловцов поверхность эффективно очищает только переливной лоток.</li>
<li><strong>Переливная ёмкость:</strong> принимает вытесненную пловцами воду и поддерживает стабильный уровень.</li>
<li><strong>Производительность фильтрации:</strong> рассчитывается на меняющуюся в течение дня нагрузку.</li>
<li><strong>Обеззараживание:</strong> УФ и автоматическое дозирование хлора и pH по санитарным требованиям.</li>
<li><strong>Подогрев и рекуперация:</strong> снижают затраты при круглогодичной работе.</li>
</ul>

<h2>Этапы проекта</h2>
<ol>
<li>Концепция: количество членов клуба, состав зон, режим работы.</li>
<li>Проект: зонирование, вентиляция, водоподготовка, электрика, отопление, ведомость объёмов работ (BOQ).</li>
<li>Конструкции бассейна и мокрых зон, гидроизоляция и испытания.</li>
<li>Горячие зоны и отделка.</li>
<li>Монтаж оборудования, пусконаладка, обучение персонала.</li>
</ol>
<p>Коммерческий бассейн Makfit 25×15 м построен за <strong>70 дней</strong>, бассейн My Class 20×10 м — за <strong>55 дней</strong>; велнес-помещения сданы за 10–25 дней каждое.</p>

<h2>Наши проекты</h2>
<h3>Фитнес-клуб Makfit</h3>
<ul>
<li><a href="/ru/projects/makfit-hovuz">Коммерческий переливной бассейн</a> — 25×15 м, 70 дней.</li>
</ul>
<h3>Спорткомплекс My Class Ясамал</h3>
<ul>
<li><a href="/ru/projects/myclass-hovuz">Бассейн</a> — 20×10 м, переливной, 55 дней</li>
<li><a href="/ru/projects/myclass-cakuzi">Джакузи</a> — 4×4 м, 20 дней</li>
<li><a href="/ru/projects/myclass-hamam">Турецкий хамам</a> — 5×4 м, 25 дней</li>
<li><a href="/ru/projects/myclass-sauna">Сауна</a> — 3×3 м, 15 дней</li>
<li><a href="/ru/projects/myclass-buxar">Паровая</a> — 3×2 м, 12 дней</li>
<li><a href="/ru/projects/myclass-duzotagi">Соляная комната</a> — 4×3 м, 18 дней</li>
</ul>
<p>Тот же подход для отелей и других коммерческих объектов: <a href="/ru/stroitelstvo-spa-centrov">строительство СПА-центров</a>.</p>

<h2>Стоимость</h2>
<p>Цена зависит от площади зала и бассейна, состава велнес-зоны и выбранных материалов. Пришлите размеры помещения и нужные зоны — подготовим индивидуальное предложение. <a href="/ru/contact">Связаться с нами</a>.</p>
`,
    },
  },
}
