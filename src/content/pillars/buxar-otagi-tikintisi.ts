import type { ContentEntry } from '../types'
import { pillarMetaFor } from './meta'

/** Pillar: Steam room. Facts: old site (40–50°C, 90–100% RH, stages, Crown 4×3/15d, My Class 3×2/12d). */
export const buxarOtagi: ContentEntry = {
  collection: 'categories',
  slug: 'buxar-otagi-tikintisi',
  locales: {
    az: {
      ...pillarMetaFor('buxar-otagi-tikintisi', 'az'),
      html: `
<p>Buxar otağı (steam room) SPA zonalarının ən çox istifadə olunan hissəsidir: yumşaq istilik, 90–100% rütubət, dərini nəmləndirən və tənəffüs yollarını açan mühit. Amma bu mühit konstruksiya üçün ən ağır şəraitdir – divar və tavan daim isti buxarla təmasdadır. Complex MMC buxar otaqlarını hamam və hovuzla eyni mühəndislik yanaşması ilə tikir: hermetik konstruksiya, çoxlaylı hidroizolyasiya, düzgün drenaj və otağın həcminə uyğun buxar generatoru.</p>

<h2>Buxar otağı necə işləyir?</h2>
<p>Otaqdan kənarda, texniki sahədə quraşdırılan buxar generatoru suyu qaynadır və buxarı xüsusi başlıq vasitəsilə otağa verir. Temperatur adətən <strong>40–50°C</strong>, rütubət isə <strong>90–100%</strong> olur. Bu, saunadan xeyli mülayim rejimdir – ürək-damar sistemi üçün yüngül, dəri və tənəffüs üçün faydalıdır. Sensor və idarəetmə paneli temperaturu və iş vaxtını avtomatik saxlayır.</p>

<h2>Tikinti mərhələləri</h2>
<ol>
<li><strong>Layihə və hesablama:</strong> otağın həcmi, divar materialı və istifadə tezliyi nəzərə alınır; buxar generatorunun gücü bu göstəricilərə görə seçilir.</li>
<li><strong>Hidroizolyasiya:</strong> divar, döşəmə və tavan çoxqatlı elastik izolyasiya ilə örtülür – nəm konstruksiyaya keçməməlidir.</li>
<li><strong>Maili və ya günbəz tavan:</strong> kondensat damcıları insanın üstünə düşmür, divarlarla aşağı axır.</li>
<li><strong>Döşəmə və drenaj:</strong> döşəmə trapa doğru meylli olur, su heç yerdə yığılmır.</li>
<li><strong>Üzlük:</strong> mərmər, keramika və ya şüşə mozaika; birləşmə yerləri üçün kif əmələ gətirməyən epoksi derz.</li>
<li><strong>Oturacaqlar, kabin və qapı:</strong> oturacaqlar nəm və istiyə davamlı materialdan, qapı hermetik şüşədən.</li>
<li><strong>Buxar generatoru, işıq və aromaterapiya:</strong> generator texniki sahəyə, nəmə davamlı LED işıqlar və istəyə görə aroma dozatoru quraşdırılır.</li>
<li><strong>Sınaq və təhvil.</strong></li>
</ol>

<h2>Niyə tavan maili olur?</h2>
<p>Buxar soyuq səthə toxunanda kondensata çevrilir. Düz tavanda damcılar toplanır və oturanların üstünə düşür – bu həm narahatlıq yaradır, həm də gigiyenik deyil. Maili və ya günbəz tavanda isə su divarlar boyunca axıb trapa gedir. Bu, buxar otağı layihəsinin əsas qaydalarından biridir.</p>

<h2>Buxar generatoru necə seçilir?</h2>
<p>Generatorun gücü otağın həcmindən və divar materialından asılıdır: mərmər və daş divarlar akril və ya şüşə kabinadan daha çox istilik udur, ona görə eyni həcmdə daha güclü generator lazımdır. Kommersiya obyektlərində gün boyu fasiləsiz iş üçün avtomatik yuyulma (əhəng təmizləmə) funksiyalı peşəkar generatorlar seçirik.</p>

<h2>Buxar otağı, sauna və türk hamamı – fərq nədir?</h2>
<ul>
<li><strong>Sauna</strong> – quru, 80–100°C, ağac üzlük. Bax: <a href="/sauna-tikintisi-baki">sauna tikintisi</a>.</li>
<li><strong>Buxar otağı</strong> – kompakt və hermetik, 40–50°C, 90–100% rütubət, daş və ya mozaika üzlük.</li>
<li><strong>Türk hamamı</strong> – mərmərlə üzlənmiş böyük məkan, göbək daşı və kurnalar, ritual xarakterli. Bax: <a href="/turk-hamami-tikintisi-baki">türk hamamı tikintisi</a>.</li>
</ul>
<p>Ətraflı müqayisə: <a href="/blog/sauna-buxar-otagi-ve-hamam-ferqi">sauna, buxar otağı və hamam fərqi</a>.</p>

<h2>Evdə buxar otağı</h2>
<p>Buxar otağı villada ayrıca otaq kimi və ya geniş duş kabinasının davamı kimi qurula bilər. Əsas şərtlər: hidroizolyasiya üçün yer, drenaj, ventilyasiya və generator üçün yaxınlıqda texniki sahə. Kiçik buxar otağı mərmər və ya mozaika üzlüklə hamam zonasının prestijini əhəmiyyətli dərəcədə artırır.</p>

<h2>Otel, fitnes və SPA mərkəzləri üçün</h2>
<p>Kommersiya obyektlərində buxar otağı adətən hovuz, sauna, hamam və duş zonası ilə birlikdə layihələndirilir. Bu zaman ventilyasiya, drenaj və elektrik bütün zonalar üçün vahid planla həll olunur. Bax: <a href="/spa-tikintisi-baki">SPA mərkəzi tikintisi</a>.</p>

<h2>Tamamladığımız buxar otaqları</h2>
<ul>
<li><a href="/projects/crown-buxar">Crown SPA – buxar otağı</a>: 4×3 m, yüksək rütubət idarəetməsi, 15 gün.</li>
<li><a href="/projects/myclass-buxar">My Class Yasamal – buxar otağı</a>: 3×2 m, 12 gün.</li>
</ul>
<p>Hər iki obyektdə yanındakı fin saunası və türk hamamı da bizim işimizdir.</p>

<h2>Qiymət</h2>
<p>Buxar otağının qiyməti ölçüdən, üzlük materialından (mərmər, keramika, mozaika) və generatorun gücündən asılıdır. Otağınızın ölçülərini göndərin – fərdi təklif hazırlayaq. <a href="/contact">Bizimlə əlaqə</a>.</p>
`,
    },
    en: {
      ...pillarMetaFor('buxar-otagi-tikintisi', 'en'),
      html: `
<p>The steam room is the most used part of any spa: gentle heat, 90–100% humidity and an atmosphere that moisturises the skin and opens the airways. For the building, however, it is the harshest environment of all – walls and ceiling are constantly in contact with hot steam. Complex MMC builds steam rooms with the same engineering approach as hammams and pools: a sealed structure, multi-layer waterproofing, proper drainage and a steam generator sized for the room.</p>

<h2>How does a steam room work?</h2>
<p>A steam generator installed outside the room, in a technical area, boils water and feeds steam into the room through a special outlet. The temperature is usually <strong>40–50°C</strong> and humidity <strong>90–100%</strong>. This is much milder than a sauna – easier on the cardiovascular system and good for the skin and breathing. A sensor and control panel keep temperature and running time automatically.</p>

<h2>Construction stages</h2>
<ol>
<li><strong>Design and calculation:</strong> room volume, wall material and frequency of use determine the generator power.</li>
<li><strong>Waterproofing:</strong> walls, floor and ceiling get multi-layer elastic waterproofing so no moisture reaches the structure.</li>
<li><strong>Sloped or domed ceiling:</strong> condensation runs down the walls instead of dripping on people.</li>
<li><strong>Floor and drainage:</strong> the floor slopes towards the drain so water never pools.</li>
<li><strong>Finish:</strong> marble, ceramic or glass mosaic with mould-resistant epoxy grout.</li>
<li><strong>Benches, enclosure and door:</strong> benches in heat- and moisture-resistant material, a sealed glass door.</li>
<li><strong>Generator, lighting and aromatherapy:</strong> the generator goes in the technical area, with moisture-proof LED lights and optional aroma dosing.</li>
<li><strong>Testing and handover.</strong></li>
</ol>

<h2>Why is the ceiling sloped?</h2>
<p>Steam turns into condensation when it touches a cooler surface. On a flat ceiling droplets collect and fall on bathers, which is both unpleasant and unhygienic. On a sloped or domed ceiling the water runs down the walls to the drain. It is one of the basic rules of steam room design.</p>

<h2>Choosing the steam generator</h2>
<p>Generator power depends on room volume and wall material: marble and stone absorb more heat than an acrylic or glass enclosure, so the same volume needs a stronger generator. For commercial venues running all day we choose professional generators with automatic flushing (descaling).</p>

<h2>Steam room, sauna and Turkish hammam – what's the difference?</h2>
<ul>
<li><strong>Sauna</strong> – dry, 80–100°C, wood interior. See <a href="/en/sauna-construction">sauna construction</a>.</li>
<li><strong>Steam room</strong> – compact and sealed, 40–50°C, 90–100% humidity, stone or mosaic finish.</li>
<li><strong>Turkish hammam</strong> – a larger marble space with a göbek taşı (heated central stone) and basins, built around ritual. See <a href="/en/turkish-hammam-construction">Turkish hammam construction</a>.</li>
</ul>

<h2>A steam room at home</h2>
<p>At a villa a steam room can be a separate room or an extension of a large shower. The key requirements are space for waterproofing, drainage, ventilation and a nearby technical area for the generator. Even a small marble or mosaic steam room greatly raises the prestige of a bathroom area.</p>

<h2>For hotels, fitness clubs and spas</h2>
<p>In commercial venues the steam room is usually designed together with the pool, sauna, hammam and showers, so ventilation, drainage and electrics are planned for all zones at once. See <a href="/en/spa-center-construction">spa centre construction</a>.</p>

<h2>Our completed steam rooms</h2>
<ul>
<li><a href="/en/projects/crown-buxar">Crown SPA – steam room</a>: 4×3 m, high-humidity control, 15 days.</li>
<li><a href="/en/projects/myclass-buxar">My Class Yasamal – steam room</a>: 3×2 m, 12 days.</li>
</ul>
<p>We also built the Finnish sauna and Turkish hammam next to them at both venues.</p>

<h2>Price</h2>
<p>The price depends on the size, the finish (marble, ceramic, mosaic) and the generator power. Send us your room dimensions and we will prepare a personal quote. <a href="/en/contact">Contact us</a>.</p>
`,
    },
    ru: {
      ...pillarMetaFor('buxar-otagi-tikintisi', 'ru'),
      html: `
<p>Паровая (стим-рум) — самая посещаемая часть СПА: мягкое тепло, влажность 90–100%, атмосфера, которая увлажняет кожу и раскрывает дыхательные пути. Но для конструкции это самые тяжёлые условия: стены и потолок постоянно контактируют с горячим паром. Complex MMC строит паровые с тем же инженерным подходом, что хамамы и бассейны: герметичная конструкция, многослойная гидроизоляция, правильный дренаж и парогенератор под объём помещения.</p>

<h2>Как работает паровая?</h2>
<p>Парогенератор, установленный вне парной в техническом помещении, кипятит воду и подаёт пар через специальную форсунку. Температура обычно <strong>40–50°C</strong>, влажность — <strong>90–100%</strong>. Это гораздо мягче сауны: щадяще для сердца и сосудов, полезно для кожи и дыхания. Датчик и пульт автоматически поддерживают температуру и время работы.</p>

<h2>Этапы строительства</h2>
<ol>
<li><strong>Проект и расчёт:</strong> объём, материал стен и интенсивность использования определяют мощность генератора.</li>
<li><strong>Гидроизоляция:</strong> стены, пол и потолок — многослойная эластичная гидроизоляция, влага не должна попасть в конструкцию.</li>
<li><strong>Наклонный или купольный потолок:</strong> конденсат стекает по стенам, а не капает на людей.</li>
<li><strong>Пол и дренаж:</strong> уклон к трапу, вода нигде не застаивается.</li>
<li><strong>Облицовка:</strong> мрамор, керамика или стеклянная мозаика; эпоксидная затирка, не образующая плесени.</li>
<li><strong>Скамьи, кабина и дверь:</strong> скамьи из влаго- и термостойких материалов, герметичная стеклянная дверь.</li>
<li><strong>Парогенератор, свет и ароматерапия:</strong> генератор — в техпомещении, влагостойкие LED-светильники, по желанию — дозатор ароматов.</li>
<li><strong>Испытания и сдача.</strong></li>
</ol>

<h2>Зачем наклонный потолок?</h2>
<p>Пар, касаясь более холодной поверхности, превращается в конденсат. На плоском потолке капли собираются и падают на отдыхающих — это и неприятно, и негигиенично. На наклонном или купольном потолке вода стекает по стенам к трапу. Это одно из базовых правил проектирования паровой.</p>

<h2>Как выбрать парогенератор</h2>
<p>Мощность зависит от объёма помещения и материала стен: мрамор и камень поглощают больше тепла, чем акриловая или стеклянная кабина, поэтому при том же объёме нужен более мощный генератор. Для коммерческих объектов с работой весь день выбираем профессиональные генераторы с автоматической промывкой (удалением накипи).</p>

<h2>Паровая, сауна и турецкий хамам — в чём разница?</h2>
<ul>
<li><strong>Сауна</strong> — сухой жар 80–100°C, деревянная отделка. См. <a href="/ru/stroitelstvo-saun">строительство саун</a>.</li>
<li><strong>Паровая</strong> — компактная и герметичная, 40–50°C, влажность 90–100%, камень или мозаика.</li>
<li><strong>Турецкий хамам</strong> — большое мраморное пространство с гёбек-ташем (подогреваемым камнем) и курнами, банный ритуал. См. <a href="/ru/stroitelstvo-turetskogo-hamama">строительство турецкого хамама</a>.</li>
</ul>

<h2>Паровая дома</h2>
<p>На вилле паровую можно сделать отдельной комнатой или продолжением большой душевой. Главное — место под гидроизоляцию, дренаж, вентиляцию и техническое помещение для генератора рядом. Даже небольшая паровая в мраморе или мозаике заметно повышает статус банной зоны.</p>

<h2>Для отелей, фитнес-клубов и СПА</h2>
<p>В коммерческих объектах паровую обычно проектируют вместе с бассейном, сауной, хамамом и душевыми, поэтому вентиляцию, дренаж и электрику решают единым планом. См. <a href="/ru/stroitelstvo-spa-centrov">строительство СПА-центров</a>.</p>

<h2>Наши паровые</h2>
<ul>
<li><a href="/ru/projects/crown-buxar">Crown SPA — паровая</a>: 4×3 м, контроль высокой влажности, 15 дней.</li>
<li><a href="/ru/projects/myclass-buxar">My Class Ясамал — паровая</a>: 3×2 м, 12 дней.</li>
</ul>
<p>На обоих объектах соседние финская сауна и турецкий хамам также построены нами.</p>

<h2>Стоимость</h2>
<p>Цена паровой зависит от размера, облицовки (мрамор, керамика, мозаика) и мощности генератора. Пришлите размеры помещения — подготовим индивидуальное предложение. <a href="/ru/contact">Связаться с нами</a>.</p>
`,
    },
  },
}
