import type { ContentEntry } from '../types'
import { pillarMetaFor } from './meta'

/** Pillar: Sauna. Facts: old site (woods, insulation, Harvia, Crown 4×3/16d, My Class 3×3/15d), sauna blog. */
export const saunaTikintisi: ContentEntry = {
  collection: 'categories',
  slug: 'sauna-tikintisi-baki',
  locales: {
    az: {
      ...pillarMetaFor('sauna-tikintisi-baki', 'az'),
      html: `
<p>Yaxşı sauna tez qızır, istini uzun saxlayır, az enerji sərf edir və illər boyu ağacı qaralmadan, qoxusu dəyişmədən xidmət edir. Bunların hamısı görünməyən hissədən – izolyasiyadan, ventilyasiyadan və düzgün seçilmiş sobadan asılıdır. Complex MMC Bakıda ev, villa, otel və fitnes klubları üçün fin saunası, infraqırmızı sauna və kombinə SPA zonaları tikir. Crown SPA və My Class Yasamal saunaları bizim işimizdir.</p>

<h2>Sauna növləri</h2>
<h3>Fin saunası (quru sauna)</h3>
<p>80–100°C temperatur və 10–20% aşağı rütubət. Sobanın isti daşlarına su tökməklə qısa müddətə buxar yaradılır. Klassik sauna təcrübəsi və ən çox sifariş olunan növdür.</p>
<h3>İnfraqırmızı sauna</h3>
<p>Havanı deyil, bədəni infraqırmızı panellərlə birbaşa qızdırır; temperatur 45–60°C-dir. Yüksək istini sevməyənlər üçün rahatdır, elektrik sərfiyyatı ənənəvi sobadan xeyli azdır, kiçik mənzil və evlərə asan yerləşir.</p>
<h3>Buxar otağı və rus hamamı</h3>
<p>Daha aşağı temperatur və yüksək rütubət istəyənlər üçün <a href="/buxar-otagi-tikintisi">buxar otağı</a> (40–50°C, 90–100% rütubət) və ya <a href="/rus-hamami-tikintisi-baki">rus hamamı</a> (60–70°C, kəskin buxarla) uyğundur. Fərqlər haqqında: <a href="/blog/sauna-buxar-otagi-ve-hamam-ferqi">sauna, buxar otağı və hamam fərqi</a>.</p>

<h2>Sauna üçün ağac seçimi</h2>
<ul>
<li><strong>Cökə (lipa)</strong> – açıq rəngli, xoş qoxulu, səthi az qızır; divar və tavan üçün ən populyar seçim.</li>
<li><strong>Kedr (sidr)</strong> – antiseptik xüsusiyyətli, rütubətə çox davamlı, premium aromalı.</li>
<li><strong>Abaş (Afrika palıdı)</strong> – istini özündə saxlamır və səthi qızmır; oturacaq (polk) və söykənəcəklər üçün əvəzolunmazdır.</li>
<li><strong>Hemlok və termo-ağac</strong> – sabit ölçülü, rütubət və istiyə davamlı; müasir dizaynlı saunalarda. My Class saunası termo-ağacla tikilib.</li>
</ul>
<p>Ağacın keyfiyyəti qədər montaj da vacibdir: panellər təbii genişlənməyə imkan verən boşluqla yığılır, metal bərkidicilər səthdə görünmür ki, dəriyə toxunub yandırmasın.</p>

<h2>Görünməyən hissə: izolyasiya və ventilyasiya</h2>
<p>Düzgün izolyasiya edilməmiş sauna gec qızır, tez soyuyur və çox elektrik sərf edir. Hər saunada bu sistemi qururuq:</p>
<ul>
<li>daş yunu istilik izolyasiyası;</li>
<li>alüminium folqalı buxar bariyeri – nəmin divara keçməsinin və kif yaranmasının qarşısını alır;</li>
<li>folqa ilə ağac üzlük arasında havalandırma boşluğu;</li>
<li>sobanın yanında təmiz hava girişi, əks tərəfdə yuxarıda çıxış – havanın dövriyyəsi üçün.</li>
</ul>
<p>Elektrik xətləri istiyə davamlı silikon kabellərlə çəkilir, işıqlandırma yüksək temperatura davamlı LED ilə həll olunur.</p>

<h2>Soba necə seçilir?</h2>
<p>Elektrik sobasının gücü otağın həcminə görə hesablanır: təxmini qayda – hər kubmetrə ~1 kVt, şüşə divar və ya izolyasiyasız səth olduqda daha çox. Tipik 4–8 m³ ev saunası üçün 4–9 kVt soba otağı 30–40 dəqiqəyə tam istiliyə çatdırır. Kommersiya obyektlərində fasiləsiz iş üçün peşəkar sobalar seçilir – Crown SPA-da Harvia sobası quraşdırmışıq. Odun sobası da mümkündür, lakin baca və yanğın təhlükəsizliyi tələbləri əlavə olunur.</p>

<h2>Sauna tikintisi mərhələləri</h2>
<ol>
<li>Ölçü, yerləşmə və elektrik gücünün yoxlanılması.</li>
<li>Layihə: ölçü, oturacaqların düzülüşü, soba gücü, ventilyasiya sxemi, 3D vizualizasiya.</li>
<li>Karkas və elektrik xətləri (silikon kabel).</li>
<li>İzolyasiya, buxar bariyeri, havalandırma boşluğu.</li>
<li>Ağac panellərin, oturacaqların və şüşə qapının montajı.</li>
<li>Soba, idarəetmə pultu, LED işıqlar və aksesuarlar.</li>
<li>Sınaq qızdırılması və təhvil.</li>
</ol>
<p>Kompakt ev saunası 1–2 həftəyə, kommersiya saunası 2–3 həftəyə hazır olur. Crown SPA-dakı 4×3 m fin saunasını <strong>16 günə</strong>, My Class-dakı 3×3 m saunanı <strong>15 günə</strong> təhvil vermişik.</p>

<h2>Evdə sauna</h2>
<p>Sauna zirzəmidə, hovuz kənarındakı köşkdə, vanna otağının yanında və ya ayrıca bağ evində qurula bilər. Əsas şərtlər: kifayət qədər elektrik gücü, ventilyasiya imkanı və yaxınlıqda duş. Ətraflı: <a href="/blog/evde-sauna-qurasdirilmasi">evdə sauna quraşdırılması</a>.</p>

<h2>Otel, fitnes klubu və SPA üçün</h2>
<p>Kommersiya saunası gün ərzində fasiləsiz işləyir, buna görə daha güclü soba, davamlı ağac, asan təmizlənən oturacaqlar və gigiyena tələblərinə uyğun ventilyasiya lazımdır. Adətən sauna buxar otağı, hamam, duş və relaks zonası ilə birlikdə layihələndirilir – bax: <a href="/spa-tikintisi-baki">SPA mərkəzi tikintisi</a> və <a href="/fitnes-zali-tikintisi">fitnes klubu tikintisi</a>.</p>

<h2>Tamamladığımız saunalar</h2>
<ul>
<li><a href="/projects/crown-saunaa">Crown SPA – fin saunası</a>: 4×3 m, Harvia sobası, 16 gün.</li>
<li><a href="/projects/myclass-sauna">My Class Yasamal – fin saunası</a>: 3×3 m, termo-ağac, 15 gün.</li>
</ul>
<p>Hər iki obyektdə buxar otağı və hamam zonaları da bizim tərəfimizdən tikilib.</p>

<h2>Qiymət</h2>
<p>Saunanın qiyməti ölçüdən, ağac növündən, soba gücündən və aksesuarlardan (şüşə qapı, işıqlandırma, aromaterapiya) asılıdır. Ölçüləri göndərin – fərdi təklif hazırlayaq; ilkin məlumat üçün <a href="/sauna-qiymetleri">sauna qiymətləri</a> səhifəsinə baxın və ya <a href="/contact">bizə yazın</a>.</p>
`,
    },
    en: {
      ...pillarMetaFor('sauna-tikintisi-baki', 'en'),
      html: `
<p>A good sauna heats up quickly, holds the heat, uses little energy and serves for years without the wood darkening or the smell changing. All of that depends on the invisible parts – insulation, ventilation and the right heater. Complex MMC builds Finnish saunas, infrared saunas and combined spa zones in Baku for homes, villas, hotels and fitness clubs. The saunas at Crown SPA and My Class Yasamal are our work.</p>

<h2>Types of sauna</h2>
<h3>Finnish (dry) sauna</h3>
<p>80–100°C with low humidity of 10–20%. Pouring water on the hot stones creates a short burst of steam. This is the classic sauna experience and the type ordered most often.</p>
<h3>Infrared sauna</h3>
<p>It heats the body directly with infrared panels rather than heating the air; the temperature is 45–60°C. It suits people who dislike intense heat, uses much less electricity than a conventional heater and fits easily into apartments and houses.</p>
<h3>Steam room and Russian banya</h3>
<p>For lower temperatures and higher humidity, a <a href="/en/steam-room-construction">steam room</a> (40–50°C, 90–100% humidity) or a <a href="/en/russian-banya-construction">Russian banya</a> (60–70°C with bursts of hot steam) is the right choice.</p>

<h2>Choosing the wood</h2>
<ul>
<li><strong>Linden</strong> – light-coloured, pleasant-smelling, stays relatively cool; the most popular choice for walls and ceilings.</li>
<li><strong>Cedar</strong> – naturally antiseptic, very resistant to moisture, with a premium aroma.</li>
<li><strong>Abachi (African oak)</strong> – does not store heat and its surface stays cool; indispensable for benches and backrests.</li>
<li><strong>Hemlock and thermo-wood</strong> – dimensionally stable and resistant to heat and humidity; used in modern saunas. The My Class sauna is built with thermo-wood.</li>
</ul>
<p>Installation matters as much as the wood: panels are fitted with gaps for natural expansion, and metal fixings are hidden so they never touch and burn the skin.</p>

<h2>The invisible part: insulation and ventilation</h2>
<p>A poorly insulated sauna heats slowly, cools quickly and wastes electricity. In every sauna we build:</p>
<ul>
<li>stone wool thermal insulation;</li>
<li>an aluminium-foil vapour barrier that stops moisture entering the walls and prevents mould;</li>
<li>a ventilation gap between the foil and the wood cladding;</li>
<li>fresh-air intake near the heater and an exhaust high on the opposite side for air circulation.</li>
</ul>
<p>Wiring uses heat-resistant silicone cables, and lighting is high-temperature-rated LED.</p>

<h2>How to choose the heater</h2>
<p>Electric heater power is calculated from the room volume: as a rule of thumb about 1 kW per cubic metre, more if there are glass walls or uninsulated surfaces. For a typical 4–8 m³ home sauna, a 4–9 kW heater brings the room to full temperature in 30–40 minutes. Commercial facilities need professional heaters for continuous operation – at Crown SPA we installed a Harvia heater. A wood-burning stove is possible too, but adds chimney and fire-safety requirements.</p>

<h2>Sauna construction stages</h2>
<ol>
<li>Checking size, location and available electrical power.</li>
<li>Design: dimensions, bench layout, heater power, ventilation scheme, 3D visualisation.</li>
<li>Frame and wiring (silicone cable).</li>
<li>Insulation, vapour barrier, ventilation gap.</li>
<li>Wood panels, benches and glass door.</li>
<li>Heater, control panel, LED lights and accessories.</li>
<li>Test heating and handover.</li>
</ol>
<p>A compact home sauna takes 1–2 weeks, a commercial one 2–3 weeks. We handed over the 4×3 m Finnish sauna at Crown SPA in <strong>16 days</strong> and the 3×3 m sauna at My Class in <strong>15 days</strong>.</p>

<h2>A sauna at home</h2>
<p>A sauna can be built in a basement, a pool-side pavilion, next to a bathroom or in a separate garden building. The key requirements are enough electrical power, ventilation and a shower nearby.</p>

<h2>For hotels, fitness clubs and spas</h2>
<p>A commercial sauna runs all day, so it needs a stronger heater, durable wood, easy-to-clean benches and ventilation that meets hygiene requirements. It is usually designed together with a steam room, hammam, showers and a relaxation area – see <a href="/en/spa-center-construction">spa centre construction</a> and <a href="/en/fitness-club-construction">fitness club construction</a>.</p>

<h2>Our completed saunas</h2>
<ul>
<li><a href="/en/projects/crown-saunaa">Crown SPA – Finnish sauna</a>: 4×3 m, Harvia heater, 16 days.</li>
<li><a href="/en/projects/myclass-sauna">My Class Yasamal – Finnish sauna</a>: 3×3 m, thermo-wood, 15 days.</li>
</ul>
<p>We also built the steam rooms and hammam areas at both venues.</p>

<h2>Price</h2>
<p>The price of a sauna depends on its size, the type of wood, heater power and accessories (glass door, lighting, aromatherapy). Send us the dimensions and we will prepare a personal quote – <a href="/en/contact">contact us</a>.</p>
`,
    },
    ru: {
      ...pillarMetaFor('sauna-tikintisi-baki', 'ru'),
      html: `
<p>Хорошая сауна быстро прогревается, долго держит тепло, расходует мало энергии и годами служит без потемнения дерева и посторонних запахов. Всё это зависит от того, чего не видно: утепления, вентиляции и правильно подобранной печи. Complex MMC строит в Баку финские и инфракрасные сауны и комбинированные СПА-зоны для домов, вилл, отелей и фитнес-клубов. Сауны Crown SPA и My Class Ясамал — наша работа.</p>

<h2>Виды саун</h2>
<h3>Финская (сухая) сауна</h3>
<p>80–100°C при низкой влажности 10–20%. Поливая воду на горячие камни, создают кратковременный пар. Классика и самый востребованный вид.</p>
<h3>Инфракрасная сауна</h3>
<p>Греет не воздух, а тело — инфракрасными панелями; температура 45–60°C. Подходит тем, кто не любит сильный жар, потребляет значительно меньше электроэнергии и легко размещается в квартире или доме.</p>
<h3>Паровая и русская баня</h3>
<p>Тем, кто предпочитает более низкую температуру и высокую влажность, подойдут <a href="/ru/parovaya-komnata">паровая</a> (40–50°C, влажность 90–100%) или <a href="/ru/stroitelstvo-russkoj-bani">русская баня</a> (60–70°C, с резким паром).</p>

<h2>Выбор древесины</h2>
<ul>
<li><strong>Липа</strong> — светлая, с приятным запахом, мало нагревается; самый популярный вариант для стен и потолка.</li>
<li><strong>Кедр</strong> — природный антисептик, очень стоек к влаге, с премиальным ароматом.</li>
<li><strong>Абаши (африканский дуб)</strong> — не накапливает тепло, поверхность не обжигает; незаменим для полков и спинок.</li>
<li><strong>Хемлок и термодерево</strong> — стабильны по размеру, стойки к жару и влаге; для саун в современном стиле. Сауна My Class выполнена из термодерева.</li>
</ul>
<p>Монтаж важен не меньше древесины: панели собираются с зазором на естественное расширение, металлический крепёж скрыт, чтобы не обжигать кожу.</p>

<h2>Невидимая часть: утепление и вентиляция</h2>
<p>Плохо утеплённая сауна долго греется, быстро остывает и тратит много электроэнергии. В каждой сауне мы делаем:</p>
<ul>
<li>теплоизоляцию из каменной ваты;</li>
<li>пароизоляцию из алюминиевой фольги — влага не проникает в стены, нет плесени;</li>
<li>вентиляционный зазор между фольгой и вагонкой;</li>
<li>приток свежего воздуха у печи и вытяжку вверху на противоположной стене.</li>
</ul>
<p>Проводка — термостойким силиконовым кабелем, освещение — жаростойкими LED-светильниками.</p>

<h2>Как выбрать печь</h2>
<p>Мощность электропечи считают по объёму парной: ориентировочно около 1 кВт на кубометр, больше — при стеклянных стенах или неутеплённых поверхностях. Для типичной домашней сауны 4–8 м³ печь 4–9 кВт прогревает помещение за 30–40 минут. Для коммерческих объектов с непрерывной работой нужны профессиональные печи — в Crown SPA мы установили печь Harvia. Возможна и дровяная печь, но добавляются требования к дымоходу и пожарной безопасности.</p>

<h2>Этапы строительства сауны</h2>
<ol>
<li>Проверка размеров, места и доступной электрической мощности.</li>
<li>Проект: размеры, расстановка полков, мощность печи, схема вентиляции, 3D-визуализация.</li>
<li>Каркас и проводка (силиконовый кабель).</li>
<li>Утепление, пароизоляция, вентзазор.</li>
<li>Вагонка, полки и стеклянная дверь.</li>
<li>Печь, пульт управления, LED-подсветка и аксессуары.</li>
<li>Пробный прогрев и сдача.</li>
</ol>
<p>Компактная домашняя сауна готова за 1–2 недели, коммерческая — за 2–3. Финскую сауну 4×3 м в Crown SPA мы сдали за <strong>16 дней</strong>, сауну 3×3 м в My Class — за <strong>15 дней</strong>.</p>

<h2>Сауна дома</h2>
<p>Сауну можно разместить в подвале, павильоне у бассейна, рядом с ванной комнатой или в отдельном садовом домике. Главное — достаточная электрическая мощность, возможность вентиляции и душ поблизости.</p>

<h2>Для отелей, фитнес-клубов и СПА</h2>
<p>Коммерческая сауна работает весь день: нужны более мощная печь, износостойкая древесина, легко моющиеся полки и вентиляция по санитарным нормам. Обычно её проектируют вместе с паровой, хамамом, душевыми и зоной отдыха — см. <a href="/ru/stroitelstvo-spa-centrov">строительство СПА-центров</a> и <a href="/ru/stroitelstvo-fitnes-zalov">строительство фитнес-клубов</a>.</p>

<h2>Наши сауны</h2>
<ul>
<li><a href="/ru/projects/crown-saunaa">Crown SPA — финская сауна</a>: 4×3 м, печь Harvia, 16 дней.</li>
<li><a href="/ru/projects/myclass-sauna">My Class Ясамал — финская сауна</a>: 3×3 м, термодерево, 15 дней.</li>
</ul>
<p>На обоих объектах паровые и хамамы также построены нами.</p>

<h2>Стоимость</h2>
<p>Цена сауны зависит от размера, породы дерева, мощности печи и аксессуаров (стеклянная дверь, подсветка, ароматерапия). Пришлите размеры — подготовим индивидуальное предложение: <a href="/ru/contact">свяжитесь с нами</a>.</p>
`,
    },
  },
}
