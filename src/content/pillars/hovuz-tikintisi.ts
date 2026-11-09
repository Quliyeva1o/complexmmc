import type { ContentEntry } from '../types'

/**
 * Pillar: Pool construction. Sample page for Stage 2b — sets tone and structure for the rest.
 * Facts used only from the old site (process, durations, warranty, references, brands).
 * No prices: they come from the client's estimates (see /hovuz-qiymetleri).
 */
export const hovuzTikintisi: ContentEntry = {
  collection: 'categories',
  slug: 'hovuz-tikintisi',
  locales: {
    az: {
      metaTitle: 'Hovuz Tikintisi Bakıda – Açar Təslim, 12 İl Zəmanət',
      metaDescription:
        'Bakı və Abşeronda skimmer, daşma və infinity hovuz tikintisi: layihə, beton, hidroizolyasiya, filtrasiya. 12 il yazılı zəmanət. Pulsuz baxış üçün yazın.',
      excerpt:
        'Villa, bağ evi, otel və idman obyektləri üçün skimmer, daşma və infinity hovuzların layihədən təhvilə qədər açar təslim tikintisi.',
      html: `
<p>Complex MMC 20 ildən artıqdır ki, Bakı və Abşeron yarımadasında hovuz layihələndirir və tikir. Ölçmədən və mühəndis layihəsindən başlayaraq qazıntı, dəmir-beton konstruksiya, hidroizolyasiya, üzlük, filtrasiya və təhvilə qədər bütün işləri <strong>bir komanda və bir müqavilə</strong> ilə yerinə yetiririk. Konstruksiyaya, hidroizolyasiyaya və izolyasiyaya <strong>12 illik yazılı zəmanət</strong> veririk.</p>
<p>Bu səhifədə hovuz növlərini, tikinti mərhələlərini, materialları və qiymətə təsir edən amilləri izah edirik ki, qərarı məlumatlı şəkildə verəsiniz.</p>

<h2>Hansı hovuzları tikirik?</h2>
<h3>Skimmerli hovuz</h3>
<p>Su səviyyəsi hovuzun kənarından təxminən 10–15 sm aşağıda olur, səth suyu divara quraşdırılmış skimmer pəncərələri vasitəsilə filtrasiyaya göndərilir. Tikintisi daha sadə və sürətlidir, buna görə villa və bağ evləri üçün ən çox seçilən variantdır. Ətraflı: <a href="/skimmer-hovuz-nedir">skimmer hovuz nədir</a>.</p>
<h3>Daşma (overflow) hovuz</h3>
<p>Su hovuzun kənarı ilə eyni səviyyədə olur və bütün perimetr boyu oluğa daşır. Daşan su balans çənində toplanır, filtrasiyadan keçib yenidən hovuza qayıdır. Səth daim təmiz qalır, görünüş daha premium olur. Otel və ictimai hovuzlarda standart həll budur. Ətraflı: <a href="/dasma-hovuz-nedir">daşma hovuz nədir</a>.</p>
<h3>İnfinity hovuz</h3>
<p>Bir və ya bir neçə kənarı görünməz şəkildə üfüqə qovuşur – su dənizlə və ya mənzərə ilə birləşirmiş kimi görünür. Yamacda və dəniz mənzərəli villalarda ən təsirli həlldir, lakin dəqiq nivelir və hidravlik hesablama tələb edir. Bilgəh və Badamdardakı infinity hovuzlarımız bu növdəndir. Bax: <a href="/infinity-hovuz-tikintisi">infinity hovuz tikintisi</a>.</p>
<h3>Villa və bağ evi hovuzu</h3>
<p>Həyətin ölçüsünə, torpağın vəziyyətinə və istifadə məqsədinə uyğun fərdi ölçü və forma seçilir: üzmək üçün uzunsov, istirahət üçün geniş pilləkənli və ya uşaqlar üçün dayaz zonalı. Bax: <a href="/villa-hovuzu-tikintisi">villa hovuzu tikintisi</a>.</p>
<h3>Otel, fitnes klubu və ictimai hovuzlar</h3>
<p>Kommersiya hovuzlarında su yükü və gigiyena tələbləri daha yüksəkdir. Hyatt Regency Bakı (25×12 m), Makfit (25×15 m) və My Class Yasamal (20×10 m) hovuzlarında yüksək tutumlu filtrasiya, UV dezinfeksiya və avtomatik kimyəvi dozaj sistemləri tətbiq etmişik.</p>
<h3>Qapalı, şok və uşaq hovuzları</h3>
<p>SPA zonaları üçün buz (şok) hovuzları, cakuzi, qapalı hovuzlar və uşaq hovuzları da tikirik. Bu layihələr adətən <a href="/spa-tikintisi-baki">SPA kompleksi</a> ilə birlikdə planlaşdırılır.</p>

<h2>Skimmer, daşma, yoxsa infinity: necə seçməli?</h2>
<ul>
<li><strong>Büdcə və müddət əsasdırsa</strong> – skimmerli hovuz: daha az mühəndislik işi, balans çəni tələb olunmur.</li>
<li><strong>Estetika və su keyfiyyəti əsasdırsa</strong> – daşma hovuz: səth daim təmizlənir, su kənarla bir səviyyədədir.</li>
<li><strong>Mənzərə varsa</strong> – infinity hovuz: dəniz və ya şəhər mənzərəsi hovuzun davamına çevrilir.</li>
<li><strong>Kommersiya obyekti üçün</strong> – daşma hovuz, çünki çox sayda üzgüçü olduqda su səthini skimmerlər effektiv təmizləyə bilmir.</li>
</ul>
<p>Qərarı sahə baxışından sonra birlikdə veririk: ərazinin mailliyi, yeraltı su səviyyəsi və texniki otaq üçün yer seçimə birbaşa təsir edir.</p>

<h2>Hovuz tikintisi mərhələləri</h2>
<ol>
<li><strong>Pulsuz baxış (1 gün):</strong> mütəxəssisimiz ərazini ölçür, torpaq şəraitini və texnikanın girişini qiymətləndirir.</li>
<li><strong>Layihələndirmə (3–5 gün):</strong> 3D vizualizasiya, konstruksiya və hidravlik hesablama, material seçimi, iş həcmi cədvəli (BOQ).</li>
<li><strong>Qazıntı (1–3 gün):</strong> kotlovan açılır, dib sıxlaşdırılır, torpaq növünə görə metod seçilir.</li>
<li><strong>Dəmir-beton konstruksiya (5–7 gün):</strong> armatur karkası yığılır, boru keçidləri qoyulur, yüksək sıxlıqlı beton fasiləsiz tökülür; minimum 28 gün möhkəmlənmə.</li>
<li><strong>Hidroizolyasiya (3–5 gün):</strong> kristalizasiya örtüyü və ya PVC membran çəkilir, ardınca 7–10 gün su sızma testi aparılır.</li>
<li><strong>Üzlük işləri (5–10 gün):</strong> şüşə mozaika, porselen kafel və ya membran suya davamlı yapışdırıcılarla vurulur.</li>
<li><strong>Filtrasiya və texniki otaq (2–3 gün):</strong> nasos, filtr, dezinfeksiya, isitmə və avtomatika quraşdırılır.</li>
<li><strong>Təhvil (1 gün):</strong> sınaq doldurulması, pH balansı, istifadə təlimi, təhvil-təslim aktı və zəmanət sənədi.</li>
</ol>
<p>Villa hovuzlarında ümumi müddət orta hesabla <strong>30–45 gündür</strong>, böyük kommersiya hovuzlarında 2–4 ay. Ətraflı: <a href="/blog/hovuz-tikintisi-merheleleri">hovuz tikintisi mərhələləri</a>.</p>

<h2>Konstruksiya və hidroizolyasiya: hovuzun ömrünü nə müəyyən edir?</h2>
<p>Hovuzun ən baha təmiri – sızma ilə bağlıdır. Sızmaların böyük hissəsi iki səbəbdən yaranır: beton tökülməsində fasilə (soyuq birləşmə) və səhv seçilmiş və ya düzgün çəkilməmiş izolyasiya. Buna görə:</p>
<ul>
<li>betonu bir mərhələdə, fasiləsiz tökürük, boru keçidlərini beton tökülməzdən əvvəl hermetik muftalarla qoyuruq;</li>
<li>dəniz sahilində (Bilgəh, Mərdəkan, Buzovna) duzlu havaya davamlı materiallar və paslanmaz aksesuarlar seçirik;</li>
<li>üzlükdən əvvəl hovuzu su ilə doldurub 7–10 gün səviyyəni izləyirik – problem varsa, kafel altında yox, açıq səthdə aşkarlanır.</li>
</ul>
<p>Materiallar haqqında: <a href="/blog/hovuz-hidroizolyasiya-materiallari">hovuz hidroizolyasiya materialları</a>, <a href="/blog/beton-hovuz-struktur-muhendisliyi-armatur-dilatasiya">beton hovuzun struktur mühəndisliyi</a>.</p>

<h2>Üzlük materialları</h2>
<ul>
<li><strong>Şüşə mozaika</strong> – ən uzunömürlü və rəng seçimi ən geniş olan variant; əyri formalı hovuzlar üçün idealdır.</li>
<li><strong>Porselen hovuz kafeli</strong> – iri formatlı, müasir görünüşlü və təmizlənməsi asandır. İspaniya istehsalı Rosa Gres və Mayor Ceramica kolleksiyalarından istifadə edirik.</li>
<li><strong>PVC membran (layner)</strong> – ən sərfəli həll; müəyyən müddətdən sonra dəyişdirilməsi tələb oluna bilər.</li>
</ul>
<p>Yapışdırıcı və izolyasiya kimyəviləri üçün Kalekim məhsulları tətbiq edilir. Material seçimi haqqında: <a href="/blog/hovuz-material-secimi">hovuz material seçimi</a>.</p>

<h2>Filtrasiya, isitmə və avtomatika</h2>
<p>Su keyfiyyəti düzgün hesablanmış filtrasiyadan asılıdır: hovuzun bütün su həcmi gündə 4–6 dəfə filtrdən keçməlidir. Texniki otaqda bu avadanlıqları quraşdırırıq:</p>
<ul>
<li>qum (kvars və ya şüşə media) filtrləri və sirkulyasiya nasosları – AstralPool, Speck Pumpen, Nurpool;</li>
<li>UV dezinfeksiya, duz elektrolizi və avtomatik pH/xlor dozajı – kimyəvi maddə istifadəsini azaldır;</li>
<li>istilik pompası – açıq hovuzda üzmə mövsümünü aprel–oktyabr aralığına qədər uzadır; təbii qaz olmayan ərazilər üçün idealdır;</li>
<li>LED işıqlandırma və qarşı-axın sistemləri – Hugo Lahme (Almaniya);</li>
<li>Pimtaş PVC boru və fitinq sistemi.</li>
</ul>
<p>Ətraflı: <a href="/blog/hovuz-filtr-sistemi">hovuz filtr sistemi</a>, <a href="/blog/istilik-pompasi-ile-hovuz-isitme">istilik pompası ilə hovuz isitmə</a>.</p>

<h2>Hovuz tikintisinin qiyməti nədən asılıdır?</h2>
<p>Eyni ölçülü iki hovuzun qiyməti fərqli ola bilər. Qiymətə ən çox təsir edən amillər:</p>
<ul>
<li><strong>Ölçü və dərinlik</strong> – qazıntı, armatur və beton həcmini müəyyən edir;</li>
<li><strong>Hovuz növü</strong> – daşma və infinity hovuzlar balans çəni və dəqiq nivelir tələb edir;</li>
<li><strong>Üzlük</strong> – mozaika, porselen kafel və ya membran;</li>
<li><strong>Avadanlıq</strong> – filtrasiya, isitmə, dezinfeksiya, işıqlandırma, avtomatik örtük;</li>
<li><strong>Ərazi</strong> – torpaq, yeraltı su, texnikanın girişi.</li>
</ul>
<p>Hər layihə üçün sahə baxışından sonra iş həcmi cədvəli (BOQ) ilə şəffaf təklif hazırlayırıq. İlkin təxmin üçün <a href="/qiymet-hesabla">qiymət kalkulyatorundan</a> istifadə edin və ya <a href="/hovuz-qiymetleri">hovuz qiymətləri</a> səhifəsinə baxın.</p>

<h2>Tamamladığımız hovuz layihələri</h2>
<ul>
<li><a href="/projects/hyatt-pool">Hyatt Regency Bakı – çöl hovuzu</a>: 25×12 m, daşma, mozaika, 60 gün.</li>
<li><a href="/projects/makfit-hovuz">Makfit fitnes klubu</a>: 25×15 m kommersiya daşma hovuzu, 70 gün.</li>
<li><a href="/projects/myclass-hovuz">My Class Yasamal</a>: 20×10 m kommersiya daşma hovuzu, 55 gün.</li>
<li><a href="/projects/bilgeh">Bilgəh, Mircəlal küçəsi</a>: 14×6 m dəniz mənzərəli infinity hovuz, 50 gün.</li>
<li><a href="/projects/badamdar">Badamdar</a>: 10×5 m Bakı panoramalı infinity hovuz, 45 gün.</li>
<li><a href="/projects/goradil">Görədil</a>: 12×6 m villa hovuzu, 45 gün.</li>
<li><a href="/projects/buzovna-hovuz">Buzovna</a>: 12×5 m dəniz mənzərəli skimmer hovuz, 40 gün.</li>
<li><a href="/projects/villa-badam">Villa Badam</a>: 8×4 m skimmer hovuz, 35 gün.</li>
</ul>
<p>Bütün işlər: <a href="/projects">layihələrimiz</a>.</p>

<h2>Zəmanət və təhvil</h2>
<p>Rəsmi tikinti lisenziyasına malik şirkət kimi zəmanəti şifahi yox, müqavilədə yazılı veririk:</p>
<ul>
<li>Konstruksiya – <strong>12 il</strong></li>
<li>Hidroizolyasiya – <strong>12 il</strong></li>
<li>İzolyasiya – <strong>12 il</strong></li>
<li>İşçilik – <strong>1 il</strong>; avadanlıqlara istehsalçı zəmanəti tətbiq olunur.</li>
</ul>
<p>İş sonunda təhvil-təslim aktı, zəmanət sənədi və istifadə təlimatı təqdim olunur. Şərtlər: <a href="/zemanet">zəmanət</a>. Tikintidən sonra <a href="/hovuz-qislama-xidmeti">qışlama</a> və servis xidməti də göstəririk.</p>

<h2>Bakı və Abşeronda hovuz tikintisi</h2>
<p>Hər qəsəbənin torpaq, yeraltı su və iqlim şəraiti fərqlidir – sahil zonasında duzlu hava, bəzi ərazilərdə yüksək qrunt suları. Layihəni yerli şəraitə uyğunlaşdırırıq:</p>
<ul>
<li><a href="/hovuz-tikintisi-bilgeh">Bilgəh</a>, <a href="/hovuz-tikintisi-novxani">Novxanı</a>, <a href="/hovuz-tikintisi-merdekan">Mərdəkan</a>, <a href="/hovuz-tikintisi-buzovna">Buzovna</a>, <a href="/hovuz-tikintisi-badamdar">Badamdar</a></li>
<li><a href="/hovuz-tikintisi-suvelan">Şüvəlan</a>, <a href="/hovuz-tikintisi-nardaran">Nardaran</a>, <a href="/hovuz-tikintisi-zagulba">Zağulba</a>, <a href="/hovuz-tikintisi-pirshagi">Pirşağı</a>, <a href="/hovuz-tikintisi-turkan">Türkan</a></li>
<li><a href="/hovuz-tikintisi-goradil">Görədil</a>, <a href="/hovuz-tikintisi-saray">Saray</a>, <a href="/hovuz-tikintisi-fatmayi">Fatmayı</a>, <a href="/hovuz-tikintisi-lokbatan">Lökbatan</a>, <a href="/hovuz-tikintisi-sea-breeze">Sea Breeze</a></li>
</ul>
<p>Hovuzla yanaşı <a href="/sauna-tikintisi-baki">sauna</a>, <a href="/turk-hamami-tikintisi-baki">türk hamamı</a> və <a href="/spa-tikintisi-baki">SPA</a> zonasını da eyni layihədə qura bilərik. <a href="/contact">Pulsuz baxış üçün bizimlə əlaqə saxlayın</a>.</p>
`,
    },

    en: {
      metaTitle: 'Swimming Pool Construction in Baku – Turnkey, 12-Yr Warranty',
      metaDescription:
        'Skimmer, overflow and infinity pool construction in Baku and Absheron: design, concrete, waterproofing, filtration. 12-year warranty. Book a free visit.',
      excerpt:
        'Turnkey construction of skimmer, overflow and infinity pools for villas, country houses, hotels and sports facilities — from design to handover.',
      html: `
<p>For more than 20 years Complex MMC has been designing and building swimming pools in Baku and on the Absheron peninsula. From site survey and engineering design to excavation, reinforced concrete, waterproofing, finishing, filtration and handover, everything is done by <strong>one team under one contract</strong>. The structure, waterproofing and insulation are covered by a <strong>12-year written warranty</strong>.</p>
<p>This page explains pool types, construction stages, materials and the factors that drive the price, so you can make an informed decision.</p>

<h2>Which pools do we build?</h2>
<h3>Skimmer pool</h3>
<p>The water level sits about 10–15 cm below the pool edge, and surface water is drawn into the filtration through skimmer openings in the wall. It is simpler and faster to build, which makes it the most popular choice for villas and country houses.</p>
<h3>Overflow pool</h3>
<p>The water is level with the edge and overflows into a gutter along the whole perimeter. It collects in a balance tank, passes through filtration and returns to the pool. The surface stays clean and the look is more premium. This is the standard solution for hotels and public pools.</p>
<h3>Infinity pool</h3>
<p>One or more edges disappear into the horizon, so the water seems to merge with the sea or the view. It is the most striking option for hillside and sea-view villas, but it requires precise levelling and hydraulic calculation. Our infinity pools in Bilgah and Badamdar are of this type.</p>
<h3>Villa and country-house pools</h3>
<p>Size and shape are chosen to fit the plot, the soil and how you plan to use the pool: long and narrow for swimming, wide steps for relaxing, or a shallow zone for children.</p>
<h3>Hotel, fitness club and public pools</h3>
<p>Commercial pools carry a higher bather load and stricter hygiene requirements. At Hyatt Regency Baku (25×12 m), Makfit (25×15 m) and My Class Yasamal (20×10 m) we installed high-capacity filtration, UV disinfection and automatic chemical dosing.</p>
<h3>Indoor, plunge and children's pools</h3>
<p>We also build ice (plunge) pools, jacuzzis, indoor pools and children's pools for spa areas. These are usually planned together with a <a href="/en/spa-center-construction">spa complex</a>.</p>

<h2>Skimmer, overflow or infinity: how to choose?</h2>
<ul>
<li><strong>Budget and time first</strong> – a skimmer pool: less engineering work, no balance tank.</li>
<li><strong>Looks and water quality first</strong> – an overflow pool: the surface is constantly cleaned and the water is flush with the edge.</li>
<li><strong>There is a view</strong> – an infinity pool: the sea or the city becomes part of the pool.</li>
<li><strong>Commercial facility</strong> – an overflow pool, because skimmers cannot clean the surface effectively when many people swim.</li>
</ul>
<p>We make the decision together after the site visit: the slope of the plot, groundwater level and space for the plant room all affect the choice.</p>

<h2>Pool construction stages</h2>
<ol>
<li><strong>Free site visit (1 day):</strong> our specialist measures the plot and assesses the soil and machinery access.</li>
<li><strong>Design (3–5 days):</strong> 3D visualisation, structural and hydraulic calculations, material selection, bill of quantities (BOQ).</li>
<li><strong>Excavation (1–3 days):</strong> the pit is dug and the base compacted; the method depends on the soil type.</li>
<li><strong>Reinforced concrete (5–7 days):</strong> the rebar cage is assembled, pipe sleeves are set and high-density concrete is poured without interruption; at least 28 days of curing.</li>
<li><strong>Waterproofing (3–5 days):</strong> a crystalline coating or PVC membrane is applied, followed by a 7–10 day leak test.</li>
<li><strong>Finishing (5–10 days):</strong> glass mosaic, porcelain tiles or membrane are laid with water-resistant adhesives.</li>
<li><strong>Filtration and plant room (2–3 days):</strong> pump, filter, disinfection, heating and automation are installed.</li>
<li><strong>Handover (1 day):</strong> test filling, pH balancing, user training, handover certificate and warranty document.</li>
</ol>
<p>A villa pool takes on average <strong>30–45 days</strong>; large commercial pools take 2–4 months.</p>

<h2>Structure and waterproofing: what determines a pool's lifespan?</h2>
<p>The most expensive pool repairs are caused by leaks, and most leaks have two causes: a break in the concrete pour (a cold joint) and the wrong waterproofing, or waterproofing applied incorrectly. That is why we:</p>
<ul>
<li>pour the concrete in one continuous stage and set pipe penetrations with sealed sleeves before pouring;</li>
<li>use salt-air-resistant materials and stainless fittings on the coast (Bilgah, Mardakan, Buzovna);</li>
<li>fill the pool and monitor the level for 7–10 days before finishing, so any problem is found on an open surface, not under the tiles.</li>
</ul>

<h2>Finishing materials</h2>
<ul>
<li><strong>Glass mosaic</strong> – the most durable option with the widest colour choice; ideal for curved shapes.</li>
<li><strong>Porcelain pool tiles</strong> – large-format, modern-looking and easy to clean. We use Spanish collections by Rosa Gres and Mayor Ceramica.</li>
<li><strong>PVC membrane (liner)</strong> – the most economical solution; it may need replacing after a number of years.</li>
</ul>
<p>Adhesives and waterproofing chemicals are by Kalekim.</p>

<h2>Filtration, heating and automation</h2>
<p>Water quality depends on correctly sized filtration: the full pool volume should pass through the filter 4–6 times a day. In the plant room we install:</p>
<ul>
<li>sand (quartz or glass media) filters and circulation pumps – AstralPool, Speck Pumpen, Nurpool;</li>
<li>UV disinfection, salt electrolysis and automatic pH/chlorine dosing, which reduce chemical use;</li>
<li>a heat pump, which extends the outdoor season from April to October and is ideal where there is no natural gas;</li>
<li>LED lighting and counter-current systems by Hugo Lahme (Germany);</li>
<li>Pimtaş PVC pipe and fitting systems.</li>
</ul>

<h2>What does pool construction cost depend on?</h2>
<p>Two pools of the same size can have different prices. The main factors are:</p>
<ul>
<li><strong>Size and depth</strong> – they determine excavation, rebar and concrete volumes;</li>
<li><strong>Pool type</strong> – overflow and infinity pools need a balance tank and precise levelling;</li>
<li><strong>Finish</strong> – mosaic, porcelain tiles or membrane;</li>
<li><strong>Equipment</strong> – filtration, heating, disinfection, lighting, automatic cover;</li>
<li><strong>Site</strong> – soil, groundwater, machinery access.</li>
</ul>
<p>After a site visit we prepare a transparent quote with a bill of quantities. For a first estimate, use our <a href="/en/price-calculator">price calculator</a> or see <a href="/en/pool-construction-cost">pool construction cost</a>.</p>

<h2>Completed pool projects</h2>
<ul>
<li><a href="/en/projects/hyatt-pool">Hyatt Regency Baku – outdoor pool</a>: 25×12 m, overflow, mosaic, 60 days.</li>
<li><a href="/en/projects/makfit-hovuz">Makfit fitness club</a>: 25×15 m commercial overflow pool, 70 days.</li>
<li><a href="/en/projects/myclass-hovuz">My Class Yasamal</a>: 20×10 m commercial overflow pool, 55 days.</li>
<li><a href="/en/projects/bilgeh">Bilgah, Mircalal St.</a>: 14×6 m sea-view infinity pool, 50 days.</li>
<li><a href="/en/projects/badamdar">Badamdar</a>: 10×5 m infinity pool overlooking Baku, 45 days.</li>
<li><a href="/en/projects/goradil">Goradil</a>: 12×6 m villa pool, 45 days.</li>
<li><a href="/en/projects/buzovna-hovuz">Buzovna</a>: 12×5 m sea-view skimmer pool, 40 days.</li>
<li><a href="/en/projects/villa-badam">Villa Badam</a>: 8×4 m skimmer pool, 35 days.</li>
</ul>

<h2>Warranty and handover</h2>
<p>As a company with an official construction license, we give a written warranty in the contract, not a verbal promise:</p>
<ul>
<li>Structure – <strong>12 years</strong></li>
<li>Waterproofing – <strong>12 years</strong></li>
<li>Insulation – <strong>12 years</strong></li>
<li>Workmanship – <strong>1 year</strong>; equipment is covered by the manufacturer's warranty.</li>
</ul>
<p>At the end you receive a handover certificate, a warranty document and operating instructions. Terms: <a href="/en/warranty">warranty</a>.</p>

<h2>Pool construction across Baku and Absheron</h2>
<p>Each settlement has its own soil, groundwater and climate – salty air on the coast, high groundwater in some areas – and we adapt the design to local conditions. We build in Bilgah, Novkhani, Mardakan, Buzovna, Badamdar, Shuvalan, Nardaran, Zagulba, Pirshagi, Turkan, Goradil, Saray, Fatmayi, Lokbatan and Sea Breeze.</p>
<p>Next to the pool we can build a <a href="/en/sauna-construction">sauna</a>, a <a href="/en/turkish-hammam-construction">Turkish hammam</a> and a <a href="/en/spa-center-construction">spa area</a> in the same project. <a href="/en/contact">Contact us for a free site visit</a>.</p>
`,
    },

    ru: {
      metaTitle: 'Строительство бассейнов в Баку – под ключ, гарантия 12 лет',
      metaDescription:
        'Скиммерные, переливные и инфинити-бассейны в Баку и на Абшероне: проект, бетон, гидроизоляция, фильтрация. Гарантия 12 лет. Запишитесь на бесплатный выезд.',
      excerpt:
        'Строительство скиммерных, переливных и инфинити-бассейнов под ключ для вилл, загородных домов, отелей и спортивных объектов — от проекта до сдачи.',
      html: `
<p>Complex MMC более 20 лет проектирует и строит бассейны в Баку и на Абшеронском полуострове. Обмер и инженерный проект, котлован, железобетон, гидроизоляция, облицовка, фильтрация и сдача объекта — всё выполняет <strong>одна команда по одному договору</strong>. На конструкцию, гидроизоляцию и изоляцию даём <strong>письменную гарантию 12 лет</strong>.</p>
<p>На этой странице мы объясняем типы бассейнов, этапы строительства, материалы и факторы, влияющие на цену, чтобы вы могли принять взвешенное решение.</p>

<h2>Какие бассейны мы строим?</h2>
<h3>Скиммерный бассейн</h3>
<p>Уровень воды примерно на 10–15 см ниже борта, поверхностная вода уходит в фильтрацию через скиммеры в стене. Строится проще и быстрее, поэтому это самый популярный вариант для вилл и загородных домов.</p>
<h3>Переливной бассейн</h3>
<p>Вода находится на одном уровне с бортом и переливается в лоток по всему периметру. Она собирается в переливной ёмкости, проходит фильтрацию и возвращается в чашу. Поверхность всегда чистая, вид — более премиальный. Это стандарт для отелей и общественных бассейнов.</p>
<h3>Инфинити-бассейн</h3>
<p>Один или несколько бортов незаметно сливаются с горизонтом — кажется, что вода переходит в море или пейзаж. Самое эффектное решение для вилл на склоне и с видом на море, но оно требует точного нивелирования и гидравлического расчёта. Наши инфинити-бассейны в Бильгя и Бадамдаре — именно такие.</p>
<h3>Бассейн для виллы и загородного дома</h3>
<p>Размер и форма подбираются под участок, грунт и задачу: вытянутый — для плавания, с широкими ступенями — для отдыха, с мелкой зоной — для детей.</p>
<h3>Бассейны для отелей, фитнес-клубов и общественные</h3>
<p>В коммерческих бассейнах выше нагрузка и строже санитарные требования. В Hyatt Regency Baku (25×12 м), Makfit (25×15 м) и My Class Ясамал (20×10 м) мы установили фильтрацию большой производительности, УФ-обеззараживание и автоматическое дозирование химии.</p>
<h3>Крытые, купели и детские бассейны</h3>
<p>Для СПА-зон строим купели (ледяные бассейны), джакузи, крытые и детские бассейны. Обычно их проектируют вместе со <a href="/ru/stroitelstvo-spa-centrov">СПА-комплексом</a>.</p>

<h2>Скиммерный, переливной или инфинити: как выбрать?</h2>
<ul>
<li><strong>Важны бюджет и сроки</strong> — скиммерный: меньше инженерных работ, не нужна переливная ёмкость.</li>
<li><strong>Важны эстетика и качество воды</strong> — переливной: поверхность постоянно очищается, вода вровень с бортом.</li>
<li><strong>Есть вид</strong> — инфинити: море или город становятся продолжением бассейна.</li>
<li><strong>Коммерческий объект</strong> — переливной, так как при большом числе пловцов скиммеры не справляются с очисткой поверхности.</li>
</ul>
<p>Решение принимаем вместе после выезда на объект: уклон участка, уровень грунтовых вод и место под техническое помещение напрямую влияют на выбор.</p>

<h2>Этапы строительства бассейна</h2>
<ol>
<li><strong>Бесплатный выезд (1 день):</strong> специалист делает обмер, оценивает грунт и подъезд техники.</li>
<li><strong>Проектирование (3–5 дней):</strong> 3D-визуализация, конструктивный и гидравлический расчёт, подбор материалов, ведомость объёмов работ (BOQ).</li>
<li><strong>Котлован (1–3 дня):</strong> разработка и уплотнение основания; метод зависит от типа грунта.</li>
<li><strong>Железобетон (5–7 дней):</strong> вязка арматурного каркаса, установка закладных, непрерывная заливка бетона высокой плотности; набор прочности — не менее 28 дней.</li>
<li><strong>Гидроизоляция (3–5 дней):</strong> проникающее покрытие или ПВХ-мембрана, затем тест на протечки 7–10 дней.</li>
<li><strong>Облицовка (5–10 дней):</strong> стеклянная мозаика, керамогранит или мембрана на водостойких клеях.</li>
<li><strong>Фильтрация и техпомещение (2–3 дня):</strong> насос, фильтр, обеззараживание, подогрев и автоматика.</li>
<li><strong>Сдача (1 день):</strong> пробное заполнение, настройка pH, обучение, акт приёма-передачи и гарантийный документ.</li>
</ol>
<p>Бассейн для виллы строится в среднем <strong>30–45 дней</strong>, крупные коммерческие — 2–4 месяца.</p>

<h2>Конструкция и гидроизоляция: от чего зависит срок службы бассейна?</h2>
<p>Самый дорогой ремонт бассейна связан с протечками. Чаще всего у них две причины: перерыв в бетонировании («холодный шов») и неправильно выбранная или нанесённая гидроизоляция. Поэтому мы:</p>
<ul>
<li>заливаем бетон за один непрерывный этап, а закладные трубы ставим с герметичными гильзами до заливки;</li>
<li>на побережье (Бильгя, Мардакян, Бузовна) применяем материалы, стойкие к солёному воздуху, и нержавеющую фурнитуру;</li>
<li>до облицовки наполняем чашу и 7–10 дней контролируем уровень — проблема обнаруживается на открытой поверхности, а не под плиткой.</li>
</ul>

<h2>Облицовочные материалы</h2>
<ul>
<li><strong>Стеклянная мозаика</strong> — самая долговечная, с широкой палитрой; идеальна для криволинейных форм.</li>
<li><strong>Керамогранит для бассейнов</strong> — крупный формат, современный вид, лёгкий уход. Используем испанские коллекции Rosa Gres и Mayor Ceramica.</li>
<li><strong>ПВХ-мембрана (лайнер)</strong> — самое экономичное решение; через несколько лет может потребоваться замена.</li>
</ul>
<p>Клеевые и гидроизоляционные составы — Kalekim.</p>

<h2>Фильтрация, подогрев и автоматика</h2>
<p>Качество воды зависит от правильно рассчитанной фильтрации: весь объём бассейна должен проходить через фильтр 4–6 раз в сутки. В техпомещении устанавливаем:</p>
<ul>
<li>песчаные фильтры (кварц или стеклянная загрузка) и циркуляционные насосы — AstralPool, Speck Pumpen, Nurpool;</li>
<li>УФ-обеззараживание, солевой электролиз и автоматическое дозирование pH/хлора — меньше химии;</li>
<li>тепловой насос — продлевает сезон открытого бассейна с апреля по октябрь, идеален там, где нет газа;</li>
<li>LED-подсветку и противотоки Hugo Lahme (Германия);</li>
<li>трубы и фитинги ПВХ Pimtaş.</li>
</ul>

<h2>От чего зависит стоимость строительства бассейна?</h2>
<p>Два бассейна одного размера могут стоить по-разному. Главные факторы:</p>
<ul>
<li><strong>Размер и глубина</strong> — объём земляных работ, арматуры и бетона;</li>
<li><strong>Тип бассейна</strong> — переливному и инфинити нужны ёмкость и точное нивелирование;</li>
<li><strong>Облицовка</strong> — мозаика, керамогранит или мембрана;</li>
<li><strong>Оборудование</strong> — фильтрация, подогрев, обеззараживание, подсветка, автоматическое покрытие;</li>
<li><strong>Участок</strong> — грунт, грунтовые воды, подъезд техники.</li>
</ul>
<p>После выезда готовим прозрачное предложение с ведомостью объёмов работ. Для предварительной оценки воспользуйтесь <a href="/ru/kalkulyator-stoimosti">калькулятором стоимости</a>.</p>

<h2>Наши завершённые бассейны</h2>
<ul>
<li><a href="/ru/projects/hyatt-pool">Hyatt Regency Baku — открытый бассейн</a>: 25×12 м, переливной, мозаика, 60 дней.</li>
<li><a href="/ru/projects/makfit-hovuz">Фитнес-клуб Makfit</a>: 25×15 м, коммерческий переливной, 70 дней.</li>
<li><a href="/ru/projects/myclass-hovuz">My Class Ясамал</a>: 20×10 м, коммерческий переливной, 55 дней.</li>
<li><a href="/ru/projects/bilgeh">Бильгя, ул. Мирджалала</a>: 14×6 м, инфинити с видом на море, 50 дней.</li>
<li><a href="/ru/projects/badamdar">Бадамдар</a>: 10×5 м, инфинити с панорамой Баку, 45 дней.</li>
<li><a href="/ru/projects/goradil">Горадиль</a>: 12×6 м, бассейн для виллы, 45 дней.</li>
<li><a href="/ru/projects/buzovna-hovuz">Бузовна</a>: 12×5 м, скиммерный с видом на море, 40 дней.</li>
<li><a href="/ru/projects/villa-badam">Villa Badam</a>: 8×4 м, скиммерный, 35 дней.</li>
</ul>

<h2>Гарантия и сдача объекта</h2>
<p>Как компания с официальной строительной лицензией, мы даём гарантию письменно в договоре, а не на словах:</p>
<ul>
<li>Конструкция — <strong>12 лет</strong></li>
<li>Гидроизоляция — <strong>12 лет</strong></li>
<li>Изоляция — <strong>12 лет</strong></li>
<li>Работы — <strong>1 год</strong>; на оборудование действует гарантия производителя.</li>
</ul>
<p>По завершении вы получаете акт приёма-передачи, гарантийный документ и инструкцию по эксплуатации. Условия: <a href="/ru/garantiya">гарантия</a>.</p>

<h2>Строительство бассейнов в Баку и на Абшероне</h2>
<p>В каждом посёлке свои грунты, грунтовые воды и климат — солёный воздух на побережье, высокие грунтовые воды в ряде районов, — и мы адаптируем проект к местным условиям. Работаем в Бильгя, Новханы, Мардакяне, Бузовне, Бадамдаре, Шувеляне, Нардаране, Загульбе, Пиршагах, Туркане, Горадиле, Сарае, Фатмаи, Локбатане и Sea Breeze.</p>
<p>Рядом с бассейном в рамках одного проекта можем построить <a href="/ru/stroitelstvo-saun">сауну</a>, <a href="/ru/stroitelstvo-turetskogo-hamama">турецкий хамам</a> и <a href="/ru/stroitelstvo-spa-centrov">СПА-зону</a>. <a href="/ru/contact">Запишитесь на бесплатный выезд</a>.</p>
`,
    },
  },
}
