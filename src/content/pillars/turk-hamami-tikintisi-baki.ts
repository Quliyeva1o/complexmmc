import type { ContentEntry } from '../types'
import { pillarMetaFor } from './meta'

/** Pillar: Turkish hammam. Facts: old site (elements, materials, heating, dome) + Crown 6×5/28d, My Class 5×4/25d, kese rooms. */
export const turkHamami: ContentEntry = {
  collection: 'categories',
  slug: 'turk-hamami-tikintisi-baki',
  locales: {
    az: {
      ...pillarMetaFor('turk-hamami-tikintisi-baki', 'az'),
      html: `
<p>Türk hamamı həm mühəndislik, həm də daş ustalığı işidir: mərmər istini düzgün paylamalı, buxar bərabər yayılmalı, kondensat drenaja getməli, otaq illərlə kif tutmadan işləməlidir. Complex MMC Bakıda villa, otel, fitnes klubu və SPA mərkəzləri üçün klassik şərq memarlığına uyğun, müasir texnologiyalarla təchiz olunmuş türk hamamları tikir. Crown SPA (6×5 m) və My Class Yasamal (5×4 m) hamamları bizim işimizdir.</p>

<h2>Türk hamamının əsas elementləri</h2>
<ul>
<li><strong>Göbək daşı</strong> – hamamın mərkəzində, altdan elektrik kabeli və ya isti su boruları ilə qızdırılan böyük mərmər platforma. Kisələnmə və köpük masajı burada aparılır.</li>
<li><strong>Kurnalar və musluqlar</strong> – su yığmaq və yuyunmaq üçün mərmərdən oyulmuş qablar, isti və soyuq su kranları.</li>
<li><strong>Buxar generatoru</strong> – 40–50°C temperatur və 90–100% rütubət yaradır; texniki otaqda quraşdırılır.</li>
<li><strong>Günbəz tavan</strong> – buxar damcıları istifadəçilərin üstünə tökülmür, günbəzin divarı ilə süzülüb drenaja gedir. Günbəzdə rəngli şüşə "fil gözü" pəncərələri klassik atmosfer yaradır.</li>
<li><strong>İsidilən oturacaq və divarlar</strong> – mərmər soyuq materialdır; döşəmə və oturacaqların isidilməsi hamamın komfortunu müəyyən edir.</li>
</ul>

<h2>Mühəndislik: hamamı uzunömürlü edən hissə</h2>
<h3>Hidroizolyasiya</h3>
<p>Divar, döşəmə və günbəz çoxqatlı, sement və akril əsaslı, elastikliyini itirməyən sızdırmazlıq məhlulları ilə örtülür. Nəm konstruksiyaya keçərsə, mərmər arxasında kif və çatlar yaranır – bunu sonradan düzəltmək ən baha təmirdir.</p>
<h3>İsitmə</h3>
<p>Döşəmə, göbək daşı və oturacaqlar altında elektrik kabelləri və ya isti su boruları ilə isitmə sistemi quraşdırırıq. Seçim obyektdəki enerji mənbəyindən və istifadə intensivliyindən asılıdır: kommersiya hamamlarında isti su sistemi daha sərfəli olur.</p>
<h3>Drenaj və ventilyasiya</h3>
<p>Döşəmə trapa doğru meylli olur, kurnaların suyu ayrıca xəttlə axıdılır. Səssiz ventilyasiya buxarın rahat yayılmasını və hamamdan sonra otağın tez qurumasını təmin edir.</p>
<h3>İşıq və aromaterapiya</h3>
<p>Nəmə davamlı LED işıqlar və avtomatik aroma dozatoru hamamın atmosferini tamamlayır.</p>

<h2>Materiallar</h2>
<ul>
<li><strong>Mərmər</strong> – kurnalar, göbək daşı və oturacaqlar üçün əsasən Marmara White və ya digər premium təbii mərmər.</li>
<li><strong>Şüşə mozaika</strong> – divar bəzəkləri və şərq naxışlı pannolar üçün.</li>
<li><strong>Antibakterial derz</strong> – mərmər birləşmələrində kif və göbələk yaranmasının qarşısını alır.</li>
</ul>

<h2>Hamam kompleksi: kisə otağı, buxar otağı, relaks zonası</h2>
<p>Klassik hamam ritualı bir neçə otaqdan ibarətdir. Əsas hamam zalının yanında adətən <strong>kisə otağı</strong> (isti göbək daşı ilə dərin dəri baxımı), <a href="/buxar-otagi-tikintisi">buxar otağı</a>, <a href="/sauna-tikintisi-baki">sauna</a>, şok duşu və istirahət zonası planlaşdırılır. Crown SPA və My Class-da bu otaqların hamısını biz tikmişik.</p>

<h2>Tikinti mərhələləri</h2>
<ol>
<li>Sahə baxışı, ölçmə, enerji və su mənbələrinin yoxlanılması.</li>
<li>Konsepsiya və layihə: zonalaşdırma, günbəz, isitmə və buxar sistemi, 3D vizualizasiya.</li>
<li>Konstruksiya və günbəz tavanın qurulması.</li>
<li>İsitmə xətləri, su və drenaj sistemləri.</li>
<li>Çoxqatlı hidroizolyasiya və sınaq.</li>
<li>Mərmər işləri: göbək daşı, kurnalar, oturacaqlar, divar üzlüyü.</li>
<li>Buxar generatoru, işıq, ventilyasiya, aroma sistemi.</li>
<li>Sınaq istismarı və təhvil.</li>
</ol>
<p>Crown SPA-dakı 6×5 m hamamı <strong>28 günə</strong>, My Class-dakı 5×4 m hamamı <strong>25 günə</strong> təhvil vermişik.</p>

<h2>Türk hamamı, yoxsa rus hamamı?</h2>
<p>Türk hamamı "islədən" sistemdir: mülayim istilik (40–50°C), çox yüksək rütubət, mərmər və ritual. <a href="/rus-hamami-tikintisi-baki">Rus hamamı</a> isə "qızdıran" sistemdir: ağac konstruksiya, kamenka sobası, daha yüksək temperatur. Geniş villalarda hər ikisini ortaq istirahət zonası ilə bir layihədə qururuq. Ətraflı: <a href="/blog/turk-vs-rus-hamami">türk və rus hamamı müqayisəsi</a>, <a href="/blog/turk-hamami-qurulmasi">türk hamamı qurulması</a>.</p>

<h2>Tamamladığımız hamam layihələri</h2>
<ul>
<li><a href="/projects/crown-turk">Crown SPA – türk hamamı</a>: 6×5 m, ağ mərmər, mərkəzi göbək daşı, günbəz tavan və rəngli şüşə, 28 gün.</li>
<li><a href="/projects/myclass-hamam">My Class Yasamal – türk hamamı</a>: 5×4 m, ağ mərmər, göbək daşı, buxar generatoru, 25 gün.</li>
<li><a href="/projects/crown-kise">Crown SPA – kisə otağı</a>: 3×3 m, mərmər, isti göbək daşı, 12 gün.</li>
<li><a href="/projects/myclass-kise">My Class – kisə otağı</a>: 3×3 m, 12 gün.</li>
</ul>

<h2>Qiymət</h2>
<p>Hamamın qiyməti ölçüdən, mərmərin növündən, günbəzin formasından, isitmə sistemindən və əlavə otaqlardan (kisə, buxar, relaks) asılıdır. Ölçüləri və istəklərinizi göndərin – fərdi layihə və təklif hazırlayaq. <a href="/contact">Bizimlə əlaqə</a>.</p>
`,
    },
    en: {
      ...pillarMetaFor('turk-hamami-tikintisi-baki', 'en'),
      html: `
<p>A Turkish hammam is both engineering and stonework: the marble must distribute heat evenly, steam must spread uniformly, condensation must reach the drains, and the room must work for years without mould. Complex MMC builds Turkish hammams in Baku for villas, hotels, fitness clubs and spa centres, following classic Eastern architecture with modern technology. The hammams at Crown SPA (6×5 m) and My Class Yasamal (5×4 m) are our work.</p>

<h2>The main elements of a Turkish hammam</h2>
<ul>
<li><strong>Göbek taşı</strong> – a large marble platform in the centre, heated from below by electric cables or hot-water pipes. Scrubbing (kese) and foam massage take place here.</li>
<li><strong>Kurnas and taps</strong> – basins carved from marble for collecting water and washing, with hot and cold taps.</li>
<li><strong>Steam generator</strong> – creates 40–50°C and 90–100% humidity; installed in a technical room.</li>
<li><strong>Domed ceiling</strong> – steam droplets do not fall on bathers but run down the dome to the drains. Coloured glass "elephant eye" openings in the dome create the classic atmosphere.</li>
<li><strong>Heated benches and walls</strong> – marble is a cold material, so heating the floor and benches defines the comfort of the hammam.</li>
</ul>

<h2>Engineering: what makes a hammam last</h2>
<h3>Waterproofing</h3>
<p>Walls, floor and dome are covered with multi-layer cement- and acrylic-based sealing compounds that stay elastic. If moisture reaches the structure, mould and cracks appear behind the marble – the most expensive repair to fix later.</p>
<h3>Heating</h3>
<p>We install heating under the floor, the göbek taşı and the benches using electric cables or hot-water pipes. The choice depends on the energy source on site and how intensively the hammam is used; in commercial hammams a hot-water system is usually more economical.</p>
<h3>Drainage and ventilation</h3>
<p>The floor slopes towards the drains, and water from the basins is led away on a separate line. Quiet ventilation spreads the steam comfortably and dries the room quickly after use.</p>
<h3>Lighting and aromatherapy</h3>
<p>Moisture-proof LED lighting and automatic aroma dosing complete the atmosphere of the hammam.</p>

<h2>Materials</h2>
<ul>
<li><strong>Marble</strong> – for basins, the göbek taşı and benches, mostly Marmara White or other premium natural marble.</li>
<li><strong>Glass mosaic</strong> – for wall decoration and Eastern-pattern panels.</li>
<li><strong>Antibacterial grout</strong> – prevents mould and fungus in the marble joints.</li>
</ul>

<h2>The hammam complex: kese room, steam room, relaxation area</h2>
<p>A classic hammam ritual uses several rooms. Next to the main hall we usually plan a <strong>kese room</strong> (deep skin care on a heated marble stone), a <a href="/en/steam-room-construction">steam room</a>, a <a href="/en/sauna-construction">sauna</a>, an ice shower and a relaxation area. At Crown SPA and My Class we built all of these rooms.</p>

<h2>Construction stages</h2>
<ol>
<li>Site visit, measurements, check of energy and water supply.</li>
<li>Concept and design: zoning, dome, heating and steam systems, 3D visualisation.</li>
<li>Structure and domed ceiling.</li>
<li>Heating lines, water and drainage.</li>
<li>Multi-layer waterproofing and testing.</li>
<li>Marble work: göbek taşı, basins, benches, wall cladding.</li>
<li>Steam generator, lighting, ventilation, aroma system.</li>
<li>Trial operation and handover.</li>
</ol>
<p>We handed over the 6×5 m hammam at Crown SPA in <strong>28 days</strong> and the 5×4 m hammam at My Class in <strong>25 days</strong>.</p>

<h2>Turkish hammam or Russian banya?</h2>
<p>A Turkish hammam is a "wet" system: mild heat (40–50°C), very high humidity, marble and ritual. A <a href="/en/russian-banya-construction">Russian banya</a> is a "hot" system: wooden construction, a kamenka stove and higher temperatures. In large villas we build both in one project with a shared relaxation area.</p>

<h2>Our completed hammam projects</h2>
<ul>
<li><a href="/en/projects/crown-turk">Crown SPA – Turkish hammam</a>: 6×5 m, white marble, central göbek taşı, domed ceiling with coloured glass, 28 days.</li>
<li><a href="/en/projects/myclass-hamam">My Class Yasamal – Turkish hammam</a>: 5×4 m, white marble, göbek taşı, steam generator, 25 days.</li>
<li><a href="/en/projects/crown-kise">Crown SPA – kese room</a>: 3×3 m, marble, heated stone, 12 days.</li>
<li><a href="/en/projects/myclass-kise">My Class – kese room</a>: 3×3 m, 12 days.</li>
</ul>

<h2>Price</h2>
<p>The price of a hammam depends on its size, the type of marble, the dome, the heating system and additional rooms (kese, steam, relaxation). Send us the dimensions and your wishes and we will prepare a personal design and quote. <a href="/en/contact">Contact us</a>.</p>
`,
    },
    ru: {
      ...pillarMetaFor('turk-hamami-tikintisi-baki', 'ru'),
      html: `
<p>Турецкий хамам — это одновременно инженерия и работа с камнем: мрамор должен равномерно отдавать тепло, пар — распределяться по помещению, конденсат — уходить в дренаж, а сама парная — годами работать без плесени. Complex MMC строит в Баку турецкие хамамы для вилл, отелей, фитнес-клубов и СПА-центров — в традициях восточной архитектуры и с современными технологиями. Хамамы Crown SPA (6×5 м) и My Class Ясамал (5×4 м) — наша работа.</p>

<h2>Основные элементы турецкого хамама</h2>
<ul>
<li><strong>Гёбек-таш</strong> — большой мраморный подиум в центре, подогреваемый снизу электрическим кабелем или трубами с горячей водой. На нём делают пилинг кесе и пенный массаж.</li>
<li><strong>Курны и краны</strong> — мраморные чаши для набора воды и омовения, с горячей и холодной водой.</li>
<li><strong>Парогенератор</strong> — создаёт 40–50°C и влажность 90–100%; устанавливается в техпомещении.</li>
<li><strong>Купольный потолок</strong> — капли конденсата не падают на людей, а стекают по куполу в дренаж. Цветные стеклянные «слоновьи глаза» в куполе создают классическую атмосферу.</li>
<li><strong>Подогрев лежаков и стен</strong> — мрамор холодный материал, поэтому подогрев пола и лежаков определяет комфорт хамама.</li>
</ul>

<h2>Инженерия: что делает хамам долговечным</h2>
<h3>Гидроизоляция</h3>
<p>Стены, пол и купол покрываются многослойными цементно-акриловыми составами, сохраняющими эластичность. Если влага проникнет в конструкцию, за мрамором появятся плесень и трещины — это самый дорогой ремонт.</p>
<h3>Подогрев</h3>
<p>Под полом, гёбек-ташем и лежаками монтируем электрический кабельный или водяной подогрев. Выбор зависит от источника энергии на объекте и интенсивности использования: для коммерческих хамамов водяная система обычно выгоднее.</p>
<h3>Дренаж и вентиляция</h3>
<p>Пол выполняется с уклоном к трапам, вода из курн отводится отдельной линией. Бесшумная вентиляция обеспечивает комфортное распределение пара и быстрое просыхание после работы.</p>
<h3>Свет и ароматерапия</h3>
<p>Влагостойкие LED-светильники и автоматическое дозирование ароматов дополняют атмосферу хамама.</p>

<h2>Материалы</h2>
<ul>
<li><strong>Мрамор</strong> — для курн, гёбек-таша и лежаков, чаще всего Marmara White или другой премиальный натуральный мрамор.</li>
<li><strong>Стеклянная мозаика</strong> — для декора стен и панно с восточным орнаментом.</li>
<li><strong>Антибактериальная затирка</strong> — защищает мраморные швы от плесени и грибка.</li>
</ul>

<h2>Банный комплекс: кесе-комната, паровая, зона отдыха</h2>
<p>Классический ритуал хамама включает несколько помещений. Рядом с основным залом обычно проектируют <strong>кесе-комнату</strong> (глубокий уход за кожей на подогреваемом мраморе), <a href="/ru/parovaya-komnata">паровую</a>, <a href="/ru/stroitelstvo-saun">сауну</a>, ледяной душ и зону отдыха. В Crown SPA и My Class все эти помещения построены нами.</p>

<h2>Этапы строительства</h2>
<ol>
<li>Выезд, обмеры, проверка энергоснабжения и водоснабжения.</li>
<li>Концепция и проект: зонирование, купол, системы подогрева и пара, 3D-визуализация.</li>
<li>Конструкция и купольный потолок.</li>
<li>Линии подогрева, водоснабжение и дренаж.</li>
<li>Многослойная гидроизоляция и испытания.</li>
<li>Мраморные работы: гёбек-таш, курны, лежаки, облицовка стен.</li>
<li>Парогенератор, свет, вентиляция, ароматизация.</li>
<li>Пробная эксплуатация и сдача.</li>
</ol>
<p>Хамам 6×5 м в Crown SPA мы сдали за <strong>28 дней</strong>, хамам 5×4 м в My Class — за <strong>25 дней</strong>.</p>

<h2>Турецкий хамам или русская баня?</h2>
<p>Хамам — «влажная» система: мягкое тепло (40–50°C), очень высокая влажность, мрамор и ритуал. <a href="/ru/stroitelstvo-russkoj-bani">Русская баня</a> — «жаркая»: деревянная конструкция, печь-каменка, более высокая температура. На больших виллах строим и то, и другое в одном проекте с общей зоной отдыха.</p>

<h2>Наши хамамы</h2>
<ul>
<li><a href="/ru/projects/crown-turk">Crown SPA — турецкий хамам</a>: 6×5 м, белый мрамор, центральный гёбек-таш, купол с цветным стеклом, 28 дней.</li>
<li><a href="/ru/projects/myclass-hamam">My Class Ясамал — турецкий хамам</a>: 5×4 м, белый мрамор, гёбек-таш, парогенератор, 25 дней.</li>
<li><a href="/ru/projects/crown-kise">Crown SPA — кесе-комната</a>: 3×3 м, мрамор, подогреваемый камень, 12 дней.</li>
<li><a href="/ru/projects/myclass-kise">My Class — кесе-комната</a>: 3×3 м, 12 дней.</li>
</ul>

<h2>Стоимость</h2>
<p>Цена хамама зависит от размера, вида мрамора, формы купола, системы подогрева и дополнительных помещений (кесе, паровая, отдых). Пришлите размеры и пожелания — подготовим индивидуальный проект и предложение. <a href="/ru/contact">Связаться с нами</a>.</p>
`,
    },
  },
}
