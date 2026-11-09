import type { ContentEntry } from '../types'
import { pillarMetaFor } from './meta'

/** Pillar: Russian banya. Facts: old site (kamenka, 60–70°C / up to 90°C dry, foil barrier, woods, tiers, cold zone, 8–12y renewal) + Crown 4×4/20d. */
export const rusHamami: ContentEntry = {
  collection: 'categories',
  slug: 'rus-hamami-tikintisi-baki',
  locales: {
    az: {
      ...pillarMetaFor('rus-hamami-tikintisi-baki', 'az'),
      html: `
<p>Rus hamamı (banya) yüksək temperatur və güclü tərləmə üzərində qurulan, əzələ bərpası və detoks effekti axtaranlar üçün intensiv təcrübədir. Complex MMC Bakı və Abşeronda banyanın ağac konstruksiyasını, kamenka sistemini, izolyasiyasını və soyuq zonasını bir layihə kimi hesablayıb tikir. Crown SPA kompleksindəki 4×4 m rus hamamı bizim işimizdir.</p>

<h2>Rus banyası necə işləyir?</h2>
<p>Banyanın mərkəzində odun və ya elektrik sobası – <strong>kamenka</strong> dayanır. Sobanın üstündəki daş yığınına su töküldükdə otaq kəskin, isti buxarla dolur. Temperatur adətən <strong>60–70°C</strong>, "quru buxar" rejimində 90°C-dən yuxarı qalxır, rütubət orta səviyyədə saxlanılır. Ənənəvi venik (palıd və ya tozağacı süpürgəsi) proseduru və ardınca soyuq su – banyanın mərkəzi ritualıdır.</p>
<p>Bu, türk hamamının "islədən" sistemindən kökündən fərqlidir: türk hamamında mərmər, günbəz tavan və buxar generatoru olur, temperatur 40–50°C, rütubət 90–100% saxlanılır. Bax: <a href="/turk-hamami-tikintisi-baki">türk hamamı tikintisi</a>.</p>

<h2>Tikintinin kritik detalları</h2>
<h3>Folqa buxar bariyeri</h3>
<p>Ağacın rütubətdən qorunması üçün divar arxasında folqa buxar bariyeri mütləqdir. Bu qat olmadıqda ağac tezliklə qaralır və çürüyür – banya tikintisində ən çox buraxılan səhv budur. Bariyerin arxasında daş yunu istilik izolyasiyası, önündə isə havalandırma boşluğu olur.</p>
<h3>Ağac seçimi</h3>
<p>Daxili üzlük tamamilə ağacdan qurulur, əsasən cökə (lipa) və kedr. Bu ağaclar yüksək temperaturda dəriyi yandıracaq qədər qızmır və xoş aroma verir. Oturacaqlar üçün səthi isti saxlamayan ağac növləri seçilir.</p>
<h3>Pilləli oturacaqlar</h3>
<p>Oturacaqlar pillə-pillə yığılır. Yuxarı pillə daha isti olur, istifadəçi tərləmə səviyyəsini sadəcə pillə seçərək tənzimləyir.</p>
<h3>Kamenka seçimi</h3>
<p>Odun sobası ənənəvi atmosfer və güclü buxar verir, lakin baca, yanğın təhlükəsizliyi və odun saxlama yeri tələb edir. Elektrik kamenka şəhər daxilində və kommersiya obyektlərində daha praktikdir. Soba gücü otağın həcminə və daş kütləsinə görə hesablanır.</p>
<h3>Soyuq zona</h3>
<p>Buxardan sonra soyuq suya – plunge hovuza, şok vedrəsinə və ya duşa – girilir. Bu "isti–soyuq" kontrastı qan dövranını sürətləndirir. Soyuq zona layihənin ayrılmaz hissəsi kimi planlaşdırılır. Bax: <a href="/hovuz-tikintisi">hovuz tikintisi</a>.</p>

<h2>Tikinti mərhələləri</h2>
<ol>
<li>Sahə baxışı, enerji mənbəyi (odun və ya elektrik) seçimi.</li>
<li>Layihə: buxar otağı, yuyunma otağı, istirahət zonası, soyuq zona; soba gücü və ventilyasiya hesabı.</li>
<li>Karkas, elektrik xətləri və lazım olduqda baca.</li>
<li>Daş yunu izolyasiya, folqa buxar bariyeri, havalandırma boşluğu.</li>
<li>Ağac üzlük və pilləli oturacaqlar.</li>
<li>Kamenka, daşlar, işıqlandırma.</li>
<li>Soyuq zona: plunge hovuz, şok vedrəsi və ya duş.</li>
<li>Sınaq qızdırılması və təhvil.</li>
</ol>
<p>Crown SPA-dakı 4×4 m rus hamamını kamenka sistemi və ağac konstruksiya ilə birlikdə <strong>20 günə</strong> təhvil vermişik.</p>

<h2>Baxım və uzunömürlülük</h2>
<p>Rus hamamı material baxımından türk hamamından sərfəlidir, lakin baxımı davamlıdır: ağacın müntəzəm qoruyucu maddə ilə işlənməsi və hər 8–12 ildən bir bəzi hissələrin yenilənməsi tələb olunur. Bu xərci layihələndirmə mərhələsində əvvəlcədən hesablayıb sizə bildiririk.</p>

<h2>Rus və türk hamamı bir layihədə</h2>
<p>Geniş sahəli villalarda hər iki otağı ayrı texniki sistemlərlə, lakin ortaq istirahət zonası ilə birləşdiririk – ailə fərqli günlərdə fərqli təcrübə seçə bilir. Crown SPA kompleksində də rus hamamı, türk hamamı, sauna, buxar və kisə otaqları yan-yana işləyir. Müqayisə: <a href="/blog/turk-vs-rus-hamami">türk və rus hamamı</a>.</p>

<h2>Referans layihə</h2>
<ul>
<li><a href="/projects/crown-rus">Crown SPA – rus hamamı (banya)</a>: 4×4 m, ənənəvi kamenka, ağac interyer, istirahət zonası, 20 gün.</li>
<li><a href="/projects/crown-saunaa">Crown SPA – fin saunası</a>: 4×3 m, Harvia, 16 gün.</li>
</ul>

<h2>Qiymət</h2>
<p>Banyanın qiyməti ölçüdən, ağac növündən, kamenkanın tipindən (odun və ya elektrik), soyuq zonanın tərkibindən və istirahət otağından asılıdır. Ölçüləri göndərin – fərdi təklif hazırlayaq. <a href="/contact">Bizimlə əlaqə</a>.</p>
`,
    },
    en: {
      ...pillarMetaFor('rus-hamami-tikintisi-baki', 'en'),
      html: `
<p>A Russian banya is an intense experience built on high heat and heavy sweating, for people looking for muscle recovery and a detox effect. Complex MMC designs and builds the wooden structure, the kamenka stove system, the insulation and the cold zone of a banya in Baku and Absheron as one project. The 4×4 m Russian banya at the Crown SPA complex is our work.</p>

<h2>How does a Russian banya work?</h2>
<p>At its heart is a wood-fired or electric stove – the <strong>kamenka</strong>. When water is poured onto the stones on top of the stove, the room fills with sharp, hot steam. The temperature is usually <strong>60–70°C</strong> and rises above 90°C in "dry steam" mode, with moderate humidity. The traditional venik (oak or birch whisk) treatment followed by cold water is the central ritual.</p>
<p>This is fundamentally different from the "wet" system of a Turkish hammam, which uses marble, a domed ceiling and a steam generator at 40–50°C and 90–100% humidity. See <a href="/en/turkish-hammam-construction">Turkish hammam construction</a>.</p>

<h2>Critical construction details</h2>
<h3>Foil vapour barrier</h3>
<p>A foil vapour barrier behind the walls is essential to protect the wood from moisture. Without it the wood soon darkens and rots – the most common mistake in banya construction. Behind the barrier is stone wool insulation, and in front of it a ventilation gap.</p>
<h3>Choice of wood</h3>
<p>The interior is lined entirely with wood, mainly linden and cedar. These woods do not get hot enough to burn the skin and give a pleasant aroma. For benches we choose species whose surface does not hold heat.</p>
<h3>Tiered benches</h3>
<p>Benches are built in tiers. The upper tier is hotter, so bathers adjust how much they sweat simply by choosing the tier.</p>
<h3>Choosing the kamenka</h3>
<p>A wood-fired stove gives the traditional atmosphere and strong steam, but requires a chimney, fire-safety measures and space for firewood. An electric kamenka is more practical in the city and in commercial venues. Stove power is calculated from the room volume and the stone mass.</p>
<h3>Cold zone</h3>
<p>After the steam you plunge into cold water – a plunge pool, a cold bucket or a shower. This hot–cold contrast boosts circulation, so the cold zone is planned as an integral part of the project.</p>

<h2>Construction stages</h2>
<ol>
<li>Site visit and choice of energy source (wood or electric).</li>
<li>Design: steam room, washing room, relaxation area, cold zone; stove power and ventilation calculations.</li>
<li>Frame, wiring and, if needed, a chimney.</li>
<li>Stone wool insulation, foil vapour barrier, ventilation gap.</li>
<li>Wood lining and tiered benches.</li>
<li>Kamenka, stones and lighting.</li>
<li>Cold zone: plunge pool, cold bucket or shower.</li>
<li>Test heating and handover.</li>
</ol>
<p>We handed over the 4×4 m Russian banya at Crown SPA, including the kamenka system and wooden structure, in <strong>20 days</strong>.</p>

<h2>Maintenance and lifespan</h2>
<p>A Russian banya is cheaper than a Turkish hammam in terms of materials, but needs ongoing care: the wood has to be treated regularly with a protective agent, and some parts renewed every 8–12 years. We calculate this cost at the design stage and share it with you upfront.</p>

<h2>Russian and Turkish baths in one project</h2>
<p>In large villas we combine both rooms with separate technical systems but a shared relaxation area, so the family can choose a different experience on different days. At Crown SPA the Russian banya, Turkish hammam, sauna, steam room and kese room work side by side.</p>

<h2>Reference projects</h2>
<ul>
<li><a href="/en/projects/crown-rus">Crown SPA – Russian banya</a>: 4×4 m, traditional kamenka, wooden interior, relaxation area, 20 days.</li>
<li><a href="/en/projects/crown-saunaa">Crown SPA – Finnish sauna</a>: 4×3 m, Harvia, 16 days.</li>
</ul>

<h2>Price</h2>
<p>The price of a banya depends on its size, the wood, the type of kamenka (wood or electric), the cold zone and the relaxation room. Send us the dimensions and we will prepare a personal quote. <a href="/en/contact">Contact us</a>.</p>
`,
    },
    ru: {
      ...pillarMetaFor('rus-hamami-tikintisi-baki', 'ru'),
      html: `
<p>Русская баня — интенсивная практика на высокой температуре и обильном потоотделении для тех, кому важны восстановление мышц и детокс-эффект. Complex MMC проектирует и строит в Баку и на Абшероне деревянную конструкцию бани, систему каменки, утепление и холодную зону как единый проект. Русская баня 4×4 м в комплексе Crown SPA — наша работа.</p>

<h2>Как работает русская баня?</h2>
<p>В центре — дровяная или электрическая печь, <strong>каменка</strong>. Когда на камни поддают воду, помещение наполняется резким горячим паром. Температура обычно <strong>60–70°C</strong>, в режиме «сухого пара» — выше 90°C, влажность умеренная. Парение веником (дубовым или берёзовым) и последующее обливание холодной водой — главный ритуал.</p>
<p>Это принципиально отличается от «влажной» системы турецкого хамама: там мрамор, купольный потолок и парогенератор, 40–50°C и влажность 90–100%. См. <a href="/ru/stroitelstvo-turetskogo-hamama">строительство турецкого хамама</a>.</p>

<h2>Критически важные детали</h2>
<h3>Фольгированная пароизоляция</h3>
<p>Чтобы защитить дерево от влаги, за обшивкой обязательно нужна фольгированная пароизоляция. Без неё древесина быстро темнеет и гниёт — это самая частая ошибка при строительстве бань. За пароизоляцией — утеплитель из каменной ваты, перед ней — вентиляционный зазор.</p>
<h3>Выбор древесины</h3>
<p>Внутренняя отделка полностью деревянная, в основном липа и кедр. Эти породы не нагреваются настолько, чтобы обжигать кожу, и дают приятный аромат. Для полков выбирают древесину, поверхность которой не накапливает тепло.</p>
<h3>Многоярусные полки</h3>
<p>Полки собираются ярусами. Наверху жарче — человек регулирует интенсивность, просто выбирая ярус.</p>
<h3>Выбор каменки</h3>
<p>Дровяная печь даёт традиционную атмосферу и сильный пар, но требует дымохода, мер пожарной безопасности и места для дров. Электрическая каменка практичнее в городе и в коммерческих объектах. Мощность печи рассчитывается по объёму парной и массе камней.</p>
<h3>Холодная зона</h3>
<p>После парной — холодная вода: купель, обливное ведро или душ. Контраст «жар–холод» разгоняет кровообращение, поэтому холодная зона проектируется как неотъемлемая часть бани.</p>

<h2>Этапы строительства</h2>
<ol>
<li>Выезд, выбор источника энергии (дрова или электричество).</li>
<li>Проект: парная, моечная, комната отдыха, холодная зона; расчёт мощности печи и вентиляции.</li>
<li>Каркас, электрика и при необходимости дымоход.</li>
<li>Каменная вата, фольгированная пароизоляция, вентзазор.</li>
<li>Деревянная обшивка и многоярусные полки.</li>
<li>Каменка, камни, освещение.</li>
<li>Холодная зона: купель, обливное ведро или душ.</li>
<li>Пробная топка и сдача.</li>
</ol>
<p>Русскую баню 4×4 м в Crown SPA вместе с каменкой и деревянной конструкцией мы сдали за <strong>20 дней</strong>.</p>

<h2>Уход и долговечность</h2>
<p>По материалам русская баня выгоднее турецкого хамама, но требует постоянного ухода: регулярной пропитки дерева защитными составами и обновления части элементов раз в 8–12 лет. Эти расходы мы заранее рассчитываем и озвучиваем на этапе проектирования.</p>

<h2>Русская баня и хамам в одном проекте</h2>
<p>На больших виллах объединяем оба помещения с раздельными инженерными системами и общей зоной отдыха — семья может выбирать разный формат в разные дни. В Crown SPA русская баня, турецкий хамам, сауна, паровая и кесе-комната работают рядом.</p>

<h2>Референсы</h2>
<ul>
<li><a href="/ru/projects/crown-rus">Crown SPA — русская баня</a>: 4×4 м, традиционная каменка, деревянный интерьер, зона отдыха, 20 дней.</li>
<li><a href="/ru/projects/crown-saunaa">Crown SPA — финская сауна</a>: 4×3 м, Harvia, 16 дней.</li>
</ul>

<h2>Стоимость</h2>
<p>Цена бани зависит от размера, породы дерева, типа каменки (дровяная или электрическая), состава холодной зоны и комнаты отдыха. Пришлите размеры — подготовим индивидуальное предложение. <a href="/ru/contact">Связаться с нами</a>.</p>
`,
    },
  },
}
