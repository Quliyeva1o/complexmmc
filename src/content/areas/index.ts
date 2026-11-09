import type { ContentEntry, Loc } from '../types'

/**
 * 15 service-area pages. Each page = unique intro + unique local notes + a profile block
 * (coastal / hillside / near-office / inland / residential complex) + links.
 * Only safe facts are used: coast vs inland, distance to the Novxanı office, real projects in the area.
 */
type L3 = Record<Loc, string>
type Profile = 'coastal' | 'hillside' | 'nearOffice' | 'inland' | 'complex'

type Area = {
  slug: string
  name: L3 // locative-free name per locale
  profile: Profile
  intro: L3
  notes: Record<Loc, string[]>
  project?: { slug: string; label: L3 }
  /** EN/RU slugs (old site had none). */
  slugs: { en: string; ru: string }
}

const pre = (l: Loc) => (l === 'az' ? '' : `/${l}`)

const PROFILE: Record<Profile, { h2: L3; text: L3; types: L3 }> = {
  coastal: {
    h2: { az: 'Sahil şəraitində hovuz', en: 'Building a pool on the coast', ru: 'Бассейн в прибрежных условиях' },
    text: {
      az: 'Dənizə yaxın sahələrdə duzlu hava metal hissələrin korroziyasına, adi izolyasiya materiallarının isə vaxtından əvvəl köhnəlməsinə səbəb olur. Ona görə sahil layihələrində paslanmaz (AISI 316) aksesuarlar, elastik və duza davamlı hidroizolyasiya membranları, korroziyaya davamlı nasos və filtr korpusları seçirik. Küləyin istiqaməti hovuzun yerləşməsinə və suyun buxarlanmasına təsir etdiyi üçün layihədə nəzərə alınır; avtomatik örtük isə həm buxarlanmanı, həm də qum və yarpaq çirklənməsini azaldır.',
      en: 'Near the sea, salty air corrodes metal parts and wears out ordinary waterproofing early. On coastal projects we therefore use stainless (AISI 316) fittings, elastic salt-resistant waterproofing membranes and corrosion-resistant pump and filter housings. Wind direction affects where the pool sits and how fast water evaporates, so it is part of the design; an automatic cover reduces both evaporation and sand and leaf debris.',
      ru: 'У моря солёный воздух вызывает коррозию металла и преждевременный износ обычной гидроизоляции. Поэтому в прибрежных проектах используем нержавеющую фурнитуру (AISI 316), эластичные солестойкие гидроизоляционные мембраны и коррозионностойкие корпуса насосов и фильтров. Направление ветра влияет на расположение бассейна и испарение, поэтому учитывается в проекте; автоматическое покрытие снижает и испарение, и загрязнение песком и листвой.',
    },
    types: {
      az: 'Dəniz mənzərəsi varsa – infinity və ya daşma hovuz; büdcə və sürət əsasdırsa – skimmer hovuz.',
      en: 'With a sea view – an infinity or overflow pool; if budget and speed come first – a skimmer pool.',
      ru: 'При виде на море — инфинити или переливной бассейн; если важны бюджет и сроки — скиммерный.',
    },
  },
  hillside: {
    h2: { az: 'Yamaclı sahədə hovuz', en: 'Building a pool on a slope', ru: 'Бассейн на склоне' },
    text: {
      az: 'Relyefli sahələrdə hovuzun bir tərəfi torpaqda, digər tərəfi havada qala bilər. Layihədən əvvəl torpaq sürüşməsi riski, dayaq divarlarının möhkəmliyi və drenaj sistemi təhlil edilir, yamac üçün gücləndirilmiş təməl hazırlanır. Bunun əvəzində yamac infinity effekti üçün ideal imkan yaradır: daşma kənarı mənzərəyə yönəldilir, oluq və balans çəni isə hündürlük fərqində gizlədilir.',
      en: 'On sloping plots one side of the pool may sit in the ground and the other in the air. Before design we analyse landslide risk, retaining-wall strength and drainage, and prepare a reinforced foundation for the slope. In return, the slope is ideal for an infinity effect: the overflow edge faces the view, while the gutter and balance tank are hidden in the level difference.',
      ru: 'На участке с рельефом одна сторона чаши может быть в грунте, другая — «в воздухе». До проектирования анализируем риск оползня, прочность подпорных стен и дренаж, готовим усиленное основание. Зато склон идеален для эффекта инфинити: переливной борт обращён к виду, а лоток и ёмкость прячутся в перепаде высот.',
    },
    types: {
      az: 'Panoramik mənzərə üçün infinity hovuz ən təsirli seçimdir.',
      en: 'For a panoramic view, an infinity pool is the most striking choice.',
      ru: 'Для панорамного вида самый эффектный выбор — инфинити-бассейн.',
    },
  },
  nearOffice: {
    h2: { az: 'Ofisimizə yaxınlığın üstünlüyü', en: 'The advantage of being close to our office', ru: 'Преимущество близости к нашему офису' },
    text: {
      az: 'Rəsmi ofisimiz və texniki anbarımız Binəqədi–Novxanı şossesində, Novxanı kəndindədir. Bu ərazidə sahəyə baxış çox vaxt eyni gün təşkil olunur, material və avadanlıq əlavə logistika gecikməsi olmadan çatdırılır, tikinti boyu mühəndislərimiz sahəyə tez-tez gəlib işi yerində yoxlayır. Tikintidən sonra servis və qışlama xidməti də operativ göstərilir.',
      en: 'Our office and technical warehouse are on the Binagadi–Novkhani highway in Novkhani. In this area a site visit can often be arranged the same day, materials and equipment arrive without extra logistics delays, and our engineers visit the site frequently during construction. After handover, service and winterisation are just as quick.',
      ru: 'Наш офис и технический склад находятся на шоссе Бинагади–Новханы, в Новханах. В этом районе выезд на участок часто возможен в тот же день, материалы и оборудование доставляются без лишних логистических задержек, а инженеры регулярно контролируют работы на месте. После сдачи сервис и консервация на зиму — так же оперативно.',
    },
    types: {
      az: 'Fərdi evlər üçün ən çox skimmer və daşma hovuz seçilir.',
      en: 'For private houses, skimmer and overflow pools are the most common choice.',
      ru: 'Для частных домов чаще всего выбирают скиммерный или переливной бассейн.',
    },
  },
  inland: {
    h2: { az: 'Fərdi ev sahəsində hovuz', en: 'A pool on a private house plot', ru: 'Бассейн на участке частного дома' },
    text: {
      az: 'Fərdi ev sahələrində hovuz tikintisinə başlamazdan əvvəl torpağın daşıma qabiliyyəti, yeraltı su səviyyəsi və mövcud su, kanalizasiya və elektrik xətlərinin yeri dəqiqləşdirilir. Hovuz evə, hasara və ağaclara nəzərən elə yerləşdirilir ki, günəş daha çox düşsün, texniki otağın səsi isə evə çatmasın. Bu ilkin analiz hovuzun uzunmüddətli etibarlılığını təmin edir.',
      en: 'On private plots we first check the soil’s bearing capacity, the groundwater level and the location of existing water, sewer and power lines. The pool is placed relative to the house, fence and trees so it gets the most sun and the plant room noise does not reach the house. This preliminary analysis is what makes a pool reliable in the long run.',
      ru: 'На частном участке сначала проверяем несущую способность грунта, уровень грунтовых вод и расположение существующих сетей водопровода, канализации и электричества. Бассейн размещаем относительно дома, забора и деревьев так, чтобы было больше солнца, а шум техпомещения не доходил до дома. Такой предварительный анализ обеспечивает долговечность бассейна.',
    },
    types: {
      az: 'Kompakt həyətlər üçün skimmer hovuz, geniş sahələr üçün daşma hovuz uyğundur.',
      en: 'A skimmer pool suits compact gardens; an overflow pool suits larger plots.',
      ru: 'Для компактных дворов подходит скиммерный бассейн, для больших участков — переливной.',
    },
  },
  complex: {
    h2: { az: 'Yaşayış kompleksində tikinti', en: 'Building inside a residential complex', ru: 'Строительство в жилом комплексе' },
    text: {
      az: 'Qapalı villa komplekslərində işlər kompleksin daxili qaydalarına – iş saatlarına, texnika və materialların giriş qaydasına, səs-küy məhdudiyyətlərinə – uyğun planlaşdırılır. Qazıntı və beton işləri qonşuları minimum narahat edəcək ardıcıllıqla aparılır, sahə hər gün təmiz təhvil verilir.',
      en: 'In gated villa complexes the work is planned around the complex rules – working hours, access for machinery and materials, and noise limits. Excavation and concreting are sequenced to disturb neighbours as little as possible, and the site is left clean every day.',
      ru: 'В закрытых коттеджных комплексах работы планируются по внутренним правилам — часы работы, порядок въезда техники и завоза материалов, ограничения по шуму. Земляные и бетонные работы ведутся так, чтобы минимально беспокоить соседей, а площадка ежедневно убирается.',
    },
    types: {
      az: 'Villa sahəsinə görə skimmer, daşma və ya infinity hovuz.',
      en: 'Skimmer, overflow or infinity, depending on the villa plot.',
      ru: 'Скиммерный, переливной или инфинити — в зависимости от участка.',
    },
  },
}

const AREAS: Area[] = [
  {
    slug: 'hovuz-tikintisi-bilgeh', profile: 'coastal', slugs: { en: 'pool-construction-bilgah', ru: 'stroitelstvo-bassejnov-bilgya' },
    name: { az: 'Bilgəh', en: 'Bilgah', ru: 'Бильгя' },
    intro: {
      az: 'Bilgəh Xəzər sahilində, villa hovuzlarının ən çox tikildiyi qəsəbələrdən biridir. Burada əsas tələb ikidir: dəniz mənzərəsini hovuza qatmaq və konstruksiyanı duzlu havadan qorumaq. Mircəlal küçəsindəki 14×6 m infinity hovuzumuz hər ikisinə nümunədir.',
      en: 'Bilgah, on the Caspian shore, is one of the settlements where villa pools are built most often. Two things matter here: bringing the sea view into the pool and protecting the structure from salty air. Our 14×6 m infinity pool on Mircalal Street is an example of both.',
      ru: 'Бильгя на берегу Каспия — один из посёлков, где строят больше всего бассейнов для вилл. Здесь важны две вещи: включить вид на море в бассейн и защитить конструкцию от солёного воздуха. Наш инфинити-бассейн 14×6 м на улице Мирджалала — пример и того, и другого.',
    },
    notes: {
      az: ['Dənizə baxan tərəfdə infinity kənarı – su Xəzərlə birləşir.', 'Paslanmaz armatur və aksesuarlar, yüksək sıxlıqlı beton.', 'Sahilə məsafəyə görə drenaj və torpağın duzluluğunun yoxlanması.'],
      en: ['An infinity edge on the sea side, so the water meets the Caspian.', 'Stainless fittings and high-density concrete.', 'Drainage and soil salinity checked according to distance from the shore.'],
      ru: ['Инфинити-борт со стороны моря — вода сливается с Каспием.', 'Нержавеющая фурнитура и бетон высокой плотности.', 'Проверка дренажа и засолённости грунта в зависимости от расстояния до берега.'],
    },
    project: { slug: 'bilgeh', label: { az: 'Bilgəh, Mircəlal küçəsi – 14×6 m infinity hovuz, 50 gün', en: 'Bilgah, Mircalal St. – 14×6 m infinity pool, 50 days', ru: 'Бильгя, ул. Мирджалала — инфинити 14×6 м, 50 дней' } },
  },
  {
    slug: 'hovuz-tikintisi-badamdar', profile: 'hillside', slugs: { en: 'pool-construction-badamdar', ru: 'stroitelstvo-bassejnov-badamdar' },
    name: { az: 'Badamdar', en: 'Badamdar', ru: 'Бадамдар' },
    intro: {
      az: 'Badamdar Bakının yüksəklikdə yerləşən, şəhər və dəniz panoramasına baxan villa qəsəbəsidir. Relyef mühəndislik baxımından çətinlik yaradır, lakin eyni zamanda hovuzu şəhər mənzərəsinin davamına çevirmək imkanı verir. Burada 10×5 m infinity hovuz və 8×4 m minimal skimmer hovuz (Villa Badam) tikmişik.',
      en: 'Badamdar is an elevated villa district overlooking the city and the bay. The terrain is an engineering challenge, but it also lets the pool become an extension of the city view. Here we built a 10×5 m infinity pool and an 8×4 m minimalist skimmer pool (Villa Badam).',
      ru: 'Бадамдар — посёлок вилл на возвышенности с панорамой города и бухты. Рельеф усложняет инженерную часть, зато позволяет сделать бассейн продолжением городского вида. Здесь мы построили инфинити-бассейн 10×5 м и минималистичный скиммерный 8×4 м (Villa Badam).',
    },
    notes: {
      az: ['Torpaq sürüşməsi riski və dayaq divarlarının hesablanması.', 'Yamac üçün gücləndirilmiş dəmir-beton təməl.', 'Daşma kənarı şəhər panoramasına yönəldilir, oluq gizlədilir.'],
      en: ['Landslide risk and retaining-wall calculations.', 'A reinforced concrete foundation for the slope.', 'The overflow edge faces the city panorama; the gutter is hidden.'],
      ru: ['Расчёт риска оползня и подпорных стен.', 'Усиленное железобетонное основание для склона.', 'Переливной борт обращён к панораме города, лоток скрыт.'],
    },
    project: { slug: 'badamdar', label: { az: 'Badamdar – 10×5 m infinity hovuz, 45 gün', en: 'Badamdar – 10×5 m infinity pool, 45 days', ru: 'Бадамдар — инфинити 10×5 м, 45 дней' } },
  },
  {
    slug: 'hovuz-tikintisi-buzovna', profile: 'coastal', slugs: { en: 'pool-construction-buzovna', ru: 'stroitelstvo-bassejnov-buzovna' },
    name: { az: 'Buzovna', en: 'Buzovna', ru: 'Бузовна' },
    intro: {
      az: 'Buzovna Abşeronun şimal sahilində, güclü küləkləri ilə tanınan villa qəsəbəsidir. Burada hovuz yalnız gözəl görünməməli, küləyə və duzlu havaya da tab gətirməlidir. Dəniz mənzərəli 12×5 m açıq hovuzumuz bu şərtlərə uyğun tikilib.',
      en: 'Buzovna is a villa settlement on the northern Absheron coast, known for strong winds. A pool here must not only look good but also withstand wind and salty air. Our 12×5 m sea-view outdoor pool was built for exactly these conditions.',
      ru: 'Бузовна — посёлок вилл на северном побережье Абшерона, известный сильными ветрами. Бассейн здесь должен не только красиво выглядеть, но и выдерживать ветер и солёный воздух. Наш открытый бассейн 12×5 м с видом на море построен именно под эти условия.',
    },
    notes: {
      az: ['Küləyin istiqamətinə görə hovuzun yerləşməsi və istirahət zonası.', 'Buxarlanmanı və qum çirklənməsini azaltmaq üçün örtük.', 'Peyzajla ahəngdar dizayn.'],
      en: ['Pool position and lounge area planned around wind direction.', 'A cover to reduce evaporation and windblown sand.', 'A design that blends with the landscape.'],
      ru: ['Расположение бассейна и зоны отдыха с учётом ветра.', 'Покрытие против испарения и песка.', 'Дизайн в гармонии с ландшафтом.'],
    },
    project: { slug: 'buzovna-hovuz', label: { az: 'Buzovna – 12×5 m dəniz mənzərəli hovuz, 40 gün', en: 'Buzovna – 12×5 m sea-view pool, 40 days', ru: 'Бузовна — бассейн 12×5 м с видом на море, 40 дней' } },
  },
  {
    slug: 'hovuz-tikintisi-novxani', profile: 'nearOffice', slugs: { en: 'pool-construction-novkhani', ru: 'stroitelstvo-bassejnov-novhany' },
    name: { az: 'Novxanı', en: 'Novkhani', ru: 'Новханы' },
    intro: {
      az: 'Novxanı Complex MMC-nin doğma ərazisidir – rəsmi ofisimiz və texniki anbarımız buradadır. Novxanıda hovuz tikdirən müştərilərimiz ən sürətli baxışı, ən qısa material çatdırılmasını və tikinti boyu ən sıx nəzarəti alırlar.',
      en: 'Novkhani is Complex MMC’s home ground – our office and technical warehouse are here. Clients building a pool in Novkhani get the fastest site visit, the shortest material deliveries and the closest supervision during construction.',
      ru: 'Новханы — «домашний» район Complex MMC: здесь наш офис и технический склад. Клиенты, строящие бассейн в Новханах, получают самый быстрый выезд, самую короткую доставку материалов и самый плотный контроль во время стройки.',
    },
    notes: {
      az: ['Sahəyə baxış çox vaxt müraciət günü.', 'Novxanı və qonşu kəndlərdə (Saray, Fatmayı) servis və qışlama.', 'Tikintidən sonra texniki dəstək üçün yaxın məsafə.'],
      en: ['A site visit often on the day you contact us.', 'Service and winterisation in Novkhani and nearby villages (Saray, Fatmayi).', 'Short distance for after-sales technical support.'],
      ru: ['Выезд часто в день обращения.', 'Сервис и консервация в Новханах и соседних сёлах (Сарай, Фатмаи).', 'Близко для технической поддержки после сдачи.'],
    },
  },
  {
    slug: 'hovuz-tikintisi-merdekan', profile: 'coastal', slugs: { en: 'pool-construction-mardakan', ru: 'stroitelstvo-bassejnov-mardakan' },
    name: { az: 'Mərdəkan', en: 'Mardakan', ru: 'Мардакян' },
    intro: {
      az: 'Mərdəkan geniş bağ evi sahələri və köhnə bağları ilə tanınan qəsəbədir. Böyük həyətlər hovuzun forma və ölçüsündə sərbəstlik verir – üzmə üçün uzun düzbucaqlı hovuzdan bağla birləşən sərbəst formalı hovuza qədər. Burada əsas vəzifə hovuzu mövcud ağaclar və bağ elementləri ilə düzgün birləşdirməkdir.',
      en: 'Mardakan is known for large country-house plots and mature gardens. Big gardens give freedom in pool shape and size – from a long rectangular lap pool to a free-form pool that blends into the garden. The key task here is fitting the pool around existing trees and garden features.',
      ru: 'Мардакян известен большими дачными участками и старыми садами. Просторные дворы дают свободу в форме и размере — от длинного прямоугольного бассейна для плавания до свободной формы, вписанной в сад. Главная задача здесь — правильно сочетать бассейн с существующими деревьями и садом.',
    },
    notes: {
      az: ['Ağac köklərinə və kölgəyə görə hovuzun yerinin seçilməsi.', 'Yarpaq tullantısına qarşı əlavə skimmer və ya avtomatik örtük.', 'Sahilə yaxın sahələrdə duza davamlı materiallar.'],
      en: ['Choosing the pool position around tree roots and shade.', 'Extra skimmers or an automatic cover against falling leaves.', 'Salt-resistant materials on plots near the shore.'],
      ru: ['Выбор места с учётом корней деревьев и тени.', 'Дополнительные скиммеры или покрытие против листвы.', 'Солестойкие материалы на участках у берега.'],
    },
  },
  {
    slug: 'hovuz-tikintisi-lokbatan', profile: 'inland', slugs: { en: 'pool-construction-lokbatan', ru: 'stroitelstvo-bassejnov-lokbatan' },
    name: { az: 'Lökbatan', en: 'Lokbatan', ru: 'Локбатан' },
    intro: {
      az: 'Lökbatan Bakının cənub-qərbində, fərdi ev tikintisinin sürətlə genişləndiyi qəsəbədir. Yeni tikilən evlərdə hovuzu ev layihəsi ilə eyni vaxtda planlaşdırmaq ən sərfəli yoldur – kommunikasiyalar, texniki otaq və həyət planı birlikdə həll olunur.',
      en: 'Lokbatan, south-west of Baku, is a settlement where private house building is growing fast. For new houses the most cost-effective approach is to plan the pool together with the house – utilities, plant room and garden layout are solved at once.',
      ru: 'Локбатан на юго-западе Баку — посёлок, где быстро растёт частное строительство. Для новых домов выгоднее всего планировать бассейн вместе с домом — коммуникации, техпомещение и планировка двора решаются сразу.',
    },
    notes: {
      az: ['Ev tikintisi ilə paralel planlaşdırma – sonradan söküntü olmadan.', 'Mövcud və planlaşdırılan kommunikasiya xətlərinin yoxlanılması.', 'Torpaq və yeraltı suya görə təməl həlli.'],
      en: ['Planning in parallel with the house – no demolition later.', 'Checking existing and planned utility lines.', 'Foundation design based on soil and groundwater.'],
      ru: ['Планирование параллельно со строительством дома — без переделок.', 'Проверка существующих и будущих коммуникаций.', 'Решение основания по грунту и грунтовым водам.'],
    },
  },
  {
    slug: 'hovuz-tikintisi-suvelan', profile: 'inland', slugs: { en: 'pool-construction-shuvalan', ru: 'stroitelstvo-bassejnov-shuvelyan' },
    name: { az: 'Şüvəlan', en: 'Shuvalan', ru: 'Шувелян' },
    intro: {
      az: 'Şüvəlan yaşıllıqlı, sakit bağ evi qəsəbəsidir. Ağaclı həyətlərdə hovuz kölgə və yarpaqla "yaşamalı" olur, ona görə yerləşmə və təmizlik həlləri burada xüsusilə vacibdir.',
      en: 'Shuvalan is a green, quiet country-house settlement. In leafy gardens a pool has to "live" with shade and leaves, so placement and cleaning solutions matter especially here.',
      ru: 'Шувелян — зелёный, тихий дачный посёлок. В саду с деревьями бассейну приходится «жить» с тенью и листвой, поэтому расположение и система очистки здесь особенно важны.',
    },
    notes: {
      az: ['Kölgəli sahələrdə su temperaturunun saxlanması üçün isitmə və örtük.', 'Yarpaqlara qarşı əlavə skimmer və robot təmizləyici.', 'Mövcud ağac və bitki örtüyünü qoruyan yerləşmə.'],
      en: ['Heating and a cover to keep water warm in shaded areas.', 'Extra skimmers and a robotic cleaner against leaves.', 'Placement that protects existing trees and planting.'],
      ru: ['Подогрев и покрытие, чтобы вода не остывала в тени.', 'Дополнительные скиммеры и робот-пылесос против листвы.', 'Расположение, сохраняющее деревья и зелень.'],
    },
  },
  {
    slug: 'hovuz-tikintisi-turkan', profile: 'coastal', slugs: { en: 'pool-construction-turkan', ru: 'stroitelstvo-bassejnov-turkan' },
    name: { az: 'Türkan', en: 'Turkan', ru: 'Тюркян' },
    intro: {
      az: 'Türkan Abşeronun cənub-şərq sahilində yerləşən qəsəbədir. Sahil iqlimi burada da materialların seçimini müəyyən edir, lakin sahələr adətən daha genişdir – bu, hovuzla yanaşı istirahət zonası, köşk və ya sauna üçün də yer verir.',
      en: 'Turkan is a settlement on the south-eastern Absheron coast. The coastal climate shapes material choices here too, but plots are often larger – leaving room for a lounge area, a pavilion or a sauna next to the pool.',
      ru: 'Тюркян — посёлок на юго-восточном побережье Абшерона. Прибрежный климат и здесь определяет выбор материалов, но участки часто просторнее — рядом с бассейном хватает места для зоны отдыха, беседки или сауны.',
    },
    notes: {
      az: ['Duzlu-nəm havaya davamlı hidroizolyasiya və paslanmaz aksesuarlar.', 'Hovuz kənarında köşk, istirahət zonası və ya sauna ilə vahid layihə.', 'İsitmə üçün istilik pompası – mövsümü uzadır.'],
      en: ['Salt- and moisture-resistant waterproofing and stainless fittings.', 'One project with a pavilion, lounge or sauna next to the pool.', 'A heat pump to extend the swimming season.'],
      ru: ['Гидроизоляция, стойкая к солёному влажному воздуху, нержавеющая фурнитура.', 'Единый проект с беседкой, зоной отдыха или сауной.', 'Тепловой насос для продления сезона.'],
    },
  },
  {
    slug: 'hovuz-tikintisi-nardaran', profile: 'coastal', slugs: { en: 'pool-construction-nardaran', ru: 'stroitelstvo-bassejnov-nardaran' },
    name: { az: 'Nardaran', en: 'Nardaran', ru: 'Нардаран' },
    intro: {
      az: 'Nardaran Abşeronun şimal sahilində, Bilgəh və Pirşağı arasında yerləşir. Ərazidə həm sahilə yaxın villalar, həm də daxildə fərdi evlər var – ona görə hovuz həlli sahənin dənizə məsafəsindən asılı olaraq seçilir.',
      en: 'Nardaran lies on the northern Absheron coast between Bilgah and Pirshagi. The area has both seaside villas and inland private houses, so the pool solution depends on how far the plot is from the sea.',
      ru: 'Нардаран расположен на северном побережье Абшерона, между Бильгя и Пиршагами. Здесь есть и виллы у моря, и частные дома в глубине, поэтому решение для бассейна зависит от удалённости участка от моря.',
    },
    notes: {
      az: ['Sahilə yaxın sahələrdə duza davamlı material paketi.', 'Daxildəki sahələrdə torpaq, yeraltı su və kommunikasiya analizi.', 'Ailə istifadəsi üçün dayaz zona və geniş giriş pilləkəni.'],
      en: ['A salt-resistant material package for plots near the shore.', 'Soil, groundwater and utility checks for inland plots.', 'A shallow zone and wide entry steps for family use.'],
      ru: ['Солестойкий пакет материалов для участков у берега.', 'Анализ грунта, грунтовых вод и сетей для участков в глубине.', 'Мелкая зона и широкие ступени для семейного отдыха.'],
    },
  },
  {
    slug: 'hovuz-tikintisi-zagulba', profile: 'coastal', slugs: { en: 'pool-construction-zagulba', ru: 'stroitelstvo-bassejnov-zagulba' },
    name: { az: 'Zağulba', en: 'Zagulba', ru: 'Загульба' },
    intro: {
      az: 'Zağulba çimərlikləri və istirahət evləri ilə tanınan sahil qəsəbəsidir. İstirahət evlərində hovuz çox vaxt mövsümi istifadə olunur, buna görə burada qışlama, asan baxım və uzaqdan idarəetmə xüsusilə dəyərlidir.',
      en: 'Zagulba is a coastal settlement known for its beaches and holiday homes. In holiday homes the pool is often used seasonally, so winterisation, easy maintenance and remote control are especially valuable here.',
      ru: 'Загульба — прибрежный посёлок, известный пляжами и домами для отдыха. В таких домах бассейн часто используется сезонно, поэтому здесь особенно ценны консервация на зиму, простой уход и удалённое управление.',
    },
    notes: {
      az: ['Mövsümlər arası qışlama və yazda yenidən işə salma xidməti.', 'Avtomatik dozaj və robot təmizləyici – sahib olmadıqda da su təmiz qalır.', 'Duza davamlı konstruksiya və avadanlıq.'],
      en: ['Winterisation between seasons and spring start-up service.', 'Automatic dosing and a robotic cleaner keep water clean when owners are away.', 'Salt-resistant structure and equipment.'],
      ru: ['Консервация между сезонами и весенний запуск.', 'Автодозирование и робот-пылесос — вода чистая, даже когда хозяев нет.', 'Солестойкие конструкция и оборудование.'],
    },
  },
  {
    slug: 'hovuz-tikintisi-pirshagi', profile: 'coastal', slugs: { en: 'pool-construction-pirshagi', ru: 'stroitelstvo-bassejnov-pirshagi' },
    name: { az: 'Pirşağı', en: 'Pirshagi', ru: 'Пиршаги' },
    intro: {
      az: 'Pirşağı Abşeronun şimal sahilindəki istirahət qəsəbəsidir, çoxsaylı bağ evi və villası var. Sahil havası və qumlu küləklər burada hovuzun həm konstruksiyasına, həm də gündəlik baxımına təsir edir.',
      en: 'Pirshagi is a holiday settlement on the northern Absheron coast with many country houses and villas. Sea air and sandy winds affect both the pool structure and its day-to-day maintenance here.',
      ru: 'Пиршаги — курортный посёлок на северном побережье Абшерона с множеством дач и вилл. Морской воздух и ветер с песком влияют здесь и на конструкцию бассейна, и на ежедневный уход.',
    },
    notes: {
      az: ['Qumlu küləyə görə güclü filtrasiya və örtük.', 'Paslanmaz aksesuarlar və duza davamlı membranlar.', 'Ailə istifadəsi üçün təhlükəsiz giriş və dayaz zona.'],
      en: ['Stronger filtration and a cover because of sandy winds.', 'Stainless fittings and salt-resistant membranes.', 'Safe entry and a shallow zone for family use.'],
      ru: ['Усиленная фильтрация и покрытие из-за ветра с песком.', 'Нержавеющая фурнитура и солестойкие мембраны.', 'Безопасный вход и мелкая зона для семьи.'],
    },
  },
  {
    slug: 'hovuz-tikintisi-goradil', profile: 'inland', slugs: { en: 'pool-construction-goradil', ru: 'stroitelstvo-bassejnov-goradil' },
    name: { az: 'Görədil', en: 'Goradil', ru: 'Горадиль' },
    intro: {
      az: 'Görədil fərdi villa tikintisinin genişləndiyi qəsəbədir. Burada 12×6 m villa hovuzunu dizayndan təhvilə qədər tikmişik – hovuzla birlikdə ətraf daş döşəmə, istirahət zonası və gizli texniki otaq da layihəyə daxil idi.',
      en: 'Goradil is a settlement where private villa building is growing. Here we built a 12×6 m villa pool from design to handover – stone paving, a lounge area and a hidden plant room were part of the same project.',
      ru: 'Горадиль — посёлок, где растёт строительство частных вилл. Здесь мы построили бассейн 12×6 м для виллы от проекта до сдачи — каменное мощение, зона отдыха и скрытое техпомещение вошли в тот же проект.',
    },
    notes: {
      az: ['Hovuz və ətraf zonanın (daş döşəmə, istirahət yeri) vahid dizaynı.', 'Texniki otağın görünməz yerləşdirilməsi.', 'Fərdi ölçü və forma.'],
      en: ['A single design for the pool and its surroundings (paving, lounge).', 'A hidden plant room.', 'Custom size and shape.'],
      ru: ['Единый дизайн бассейна и окружения (мощение, зона отдыха).', 'Скрытое техпомещение.', 'Индивидуальные размер и форма.'],
    },
    project: { slug: 'goradil', label: { az: 'Görədil – 12×6 m villa hovuzu, 45 gün', en: 'Goradil – 12×6 m villa pool, 45 days', ru: 'Горадиль — бассейн 12×6 м, 45 дней' } },
  },
  {
    slug: 'hovuz-tikintisi-saray', profile: 'nearOffice', slugs: { en: 'pool-construction-saray', ru: 'stroitelstvo-bassejnov-saray' },
    name: { az: 'Saray', en: 'Saray', ru: 'Сарай' },
    intro: {
      az: 'Saray qəsəbəsi Novxanıdakı ofisimizə ən yaxın ərazilərdən biridir. Sumqayıt istiqamətində böyüyən bu qəsəbədə yeni fərdi evlər üçün hovuzu ev tikintisi ilə paralel planlaşdırmağı tövsiyə edirik.',
      en: 'Saray is one of the closest areas to our Novkhani office. In this growing settlement towards Sumgayit we recommend planning the pool in parallel with new house construction.',
      ru: 'Сарай — один из ближайших к нашему офису в Новханах районов. В этом растущем посёлке в сторону Сумгаита рекомендуем планировать бассейн параллельно со строительством нового дома.',
    },
    notes: {
      az: ['Ofisə yaxınlıq – sürətli baxış və tez-tez nəzarət.', 'Yeni evlərdə kommunikasiyaların hovuzla birlikdə çəkilməsi.', 'Kompakt həyətlər üçün skimmer hovuz həlləri.'],
      en: ['Close to our office – quick visits and frequent supervision.', 'Utilities laid together with the pool in new houses.', 'Skimmer pool solutions for compact gardens.'],
      ru: ['Близко к офису — быстрый выезд и частый контроль.', 'Прокладка коммуникаций вместе с бассейном в новых домах.', 'Скиммерные решения для компактных дворов.'],
    },
  },
  {
    slug: 'hovuz-tikintisi-fatmayi', profile: 'nearOffice', slugs: { en: 'pool-construction-fatmayi', ru: 'stroitelstvo-bassejnov-fatmai' },
    name: { az: 'Fatmayı', en: 'Fatmayi', ru: 'Фатмаи' },
    intro: {
      az: 'Fatmayı Novxanı ilə qonşu, bağ evləri ilə tanınan kənddir. Mövsümi istifadə olunan bağ evlərində hovuzun sadə baxımı və qış aylarında düzgün qorunması əsas mövzudur – ofisimizə yaxınlıq bu xidmətləri operativ edir.',
      en: 'Fatmayi, next to Novkhani, is a village known for country houses. In seasonal country houses the main topics are easy maintenance and protecting the pool properly in winter – being close to our office makes these services quick.',
      ru: 'Фатмаи — соседнее с Новханами село, известное дачами. Для сезонных дач главное — простой уход и правильная консервация бассейна на зиму; близость к офису делает эти услуги оперативными.',
    },
    notes: {
      az: ['Qışlama və yazda işə salma xidməti.', 'Baxımı asanlaşdıran avtomatika.', 'Ofisə yaxınlıq – sürətli baxış.'],
      en: ['Winterisation and spring start-up.', 'Automation that makes maintenance easy.', 'Close to our office – quick site visits.'],
      ru: ['Консервация и весенний запуск.', 'Автоматика, упрощающая уход.', 'Близко к офису — быстрый выезд.'],
    },
  },
  {
    slug: 'hovuz-tikintisi-sea-breeze', profile: 'complex', slugs: { en: 'pool-construction-sea-breeze', ru: 'stroitelstvo-bassejnov-sea-breeze' },
    name: { az: 'Sea Breeze', en: 'Sea Breeze', ru: 'Sea Breeze' },
    intro: {
      az: 'Sea Breeze Bakı ətrafının ən tanınan müasir villa komplekslərindən biridir və Novxanıdakı ofisimizə çox yaxındır. Kompleksdə çoxsaylı villa üçün hovuz tikmişik, buna görə daxili qaydalar və infrastruktur bizə yaxşı tanışdır.',
      en: 'Sea Breeze is one of the best-known modern villa complexes near Baku and is very close to our Novkhani office. We have built pools for many villas in the complex, so its internal rules and infrastructure are well known to us.',
      ru: 'Sea Breeze — один из самых известных современных коттеджных комплексов под Баку, совсем рядом с нашим офисом в Новханах. Мы построили бассейны для многих вилл комплекса, поэтому хорошо знаем его внутренние правила и инфраструктуру.',
    },
    notes: {
      az: ['Kompleksin iş saatlarına və giriş qaydalarına uyğun cədvəl.', 'Sahilə yaxınlığa görə duza davamlı materiallar.', 'Ofisə yaxınlıq – operativ nəzarət və servis.'],
      en: ['A schedule that follows the complex’s working hours and access rules.', 'Salt-resistant materials because of the nearby shore.', 'Close to our office – fast supervision and service.'],
      ru: ['График по часам работы и правилам доступа комплекса.', 'Солестойкие материалы из-за близости моря.', 'Близко к офису — оперативный контроль и сервис.'],
    },
  },
]

const T = {
  title: { az: (loc: string) => `${loc} hovuz tikintisi`, en: (n: string) => `Pool construction in ${n}`, ru: (n: string) => `Строительство бассейнов: ${n}` },
  notesH: { az: (loc: string) => `${loc} nəyə diqqət edirik`, en: (n: string) => `What we pay attention to in ${n}`, ru: (n: string) => `На что обращаем внимание: ${n}` },
  typesH: { az: 'Hansı hovuz uyğundur?', en: 'Which pool fits?', ru: 'Какой бассейн подойдёт?' },
  stepsH: { az: 'İş ardıcıllığı', en: 'How the work goes', ru: 'Порядок работ' },
  steps: {
    az: ['Pulsuz sahə baxışı və ölçmə', 'Layihə, 3D vizualizasiya və iş həcmi cədvəli (BOQ)', 'Qazıntı və dəmir-beton konstruksiya', 'Hidroizolyasiya və 7–10 günlük su sınağı', 'Üzlük, filtrasiya və avadanlıq', 'Təhvil, təlim və 12 il yazılı zəmanət'],
    en: ['Free site visit and measurements', 'Design, 3D visualisation and bill of quantities (BOQ)', 'Excavation and reinforced concrete', 'Waterproofing and a 7–10 day water test', 'Finishing, filtration and equipment', 'Handover, training and a 12-year written warranty'],
    ru: ['Бесплатный выезд и обмеры', 'Проект, 3D-визуализация и ведомость объёмов (BOQ)', 'Котлован и железобетон', 'Гидроизоляция и водный тест 7–10 дней', 'Облицовка, фильтрация и оборудование', 'Сдача, обучение и письменная гарантия 12 лет'],
  },
  projectH: { az: 'Bu ərazidə tamamladığımız layihə', en: 'Our project in this area', ru: 'Наш проект в этом районе' },
  moreH: { az: 'Ətraflı', en: 'Learn more', ru: 'Подробнее' },
  more: {
    az: `<a href="/hovuz-tikintisi">Hovuz tikintisi</a> · <a href="/infinity-hovuz-tikintisi">İnfinity hovuz</a> · <a href="/villa-hovuzu-tikintisi">Villa hovuzu</a> · <a href="/hovuz-qislama-xidmeti">Qışlama xidməti</a> · <a href="/projects">Bütün layihələr</a>`,
    en: `<a href="/en/swimming-pool-construction">Pool construction</a> · <a href="/en/infinity-pool-construction">Infinity pools</a> · <a href="/en/villa-pool-construction">Villa pools</a> · <a href="/en/projects">All projects</a>`,
    ru: `<a href="/ru/stroitelstvo-bassejnov">Строительство бассейнов</a> · <a href="/ru/stroitelstvo-infiniti-bassejnov">Инфинити-бассейны</a> · <a href="/ru/bassejn-dlya-villy">Бассейн для виллы</a> · <a href="/ru/projects">Все проекты</a>`,
  },
  cta: {
    az: (loc: string) => `${loc} hovuz tikdirmək istəyirsiniz? <a href="/contact">Pulsuz baxış üçün yazın</a> və ya <a href="/qiymet-hesabla">qiymət təklifi alın</a>.`,
    en: (n: string) => `Planning a pool in ${n}? <a href="/en/contact">Book a free site visit</a> or <a href="/en/price-calculator">get a quote</a>.`,
    ru: (n: string) => `Планируете бассейн (${n})? <a href="/ru/contact">Запишитесь на бесплатный выезд</a> или <a href="/ru/kalkulyator-stoimosti">получите расчёт</a>.`,
  },
}

/** AZ locative: Bilgəh -> Bilgəhdə, Badamdar -> Badamdarda… (vowel harmony + after-vowel "da/də"). */
function azLoc(n: string) {
  const vowels = n.toLowerCase().match(/[aıoueəiöü]/g) ?? []
  const last = vowels[vowels.length - 1] ?? 'a'
  const back = 'aıou'.includes(last)
  const suffix = back ? 'da' : 'də'
  return `${n}${suffix}`
}

function metaFor(a: Area, l: Loc) {
  const n = a.name[l]
  const p = PROFILE[a.profile]
  const titles = {
    az: [`${n} Hovuz Tikintisi – Villa və Bağ Evi Hovuzları`, `${n} Hovuz Tikintisi – Açar Təslim`],
    en: [`Pool Construction in ${n}, Baku – Villa Pools`, `Pool Construction in ${n} – Turnkey`],
    ru: [`Строительство бассейнов — ${n}, Баку`, `Бассейн под ключ — ${n}`],
  }[l]
  const metaTitle = titles.find((t) => t.length <= 60) ?? titles[titles.length - 1]
  const lead = {
    az: `${azLoc(n)} hovuz tikintisi: ${{ coastal: 'duzlu havaya davamlı materiallar', hillside: 'yamac üçün mühəndislik və infinity dizayn', nearOffice: 'ofisimizə yaxın, sürətli baxış', inland: 'torpaq və kommunikasiya analizi ilə', complex: 'kompleks qaydalarına uyğun tikinti' }[a.profile]}, 12 il yazılı zəmanət. Layihə və tikinti bir müqavilə ilə.`,
    en: `Pool construction in ${n}: ${{ coastal: 'salt-resistant materials', hillside: 'slope engineering and infinity design', nearOffice: 'close to our office, fast site visits', inland: 'soil and utility checks first', complex: 'work planned around complex rules' }[a.profile]}, 12-year written warranty. Design and build under one contract.`,
    ru: `Бассейны — ${n}: ${{ coastal: 'солестойкие материалы', hillside: 'инженерия склона и инфинити', nearOffice: 'рядом с офисом, быстрый выезд', inland: 'сначала анализ грунта и сетей', complex: 'работа по правилам комплекса' }[a.profile]}, письменная гарантия 12 лет. Проект и стройка по одному договору.`,
  }[l]
  const ctas = {
    az: [' Pulsuz sahə baxışı üçün bizə yazın.', ' Pulsuz baxış üçün yazın.', ' Bizə yazın.', ''],
    en: [' Contact us for a free site visit.', ' Book a free site visit.', ' Contact us.', ''],
    ru: [' Запишитесь на бесплатный выезд специалиста.', ' Бесплатный выезд на участок.', ' Пишите нам.', ''],
  }[l]
  const opts = ctas.map((c) => lead + c)
  const metaDescription = opts.find((o) => o.length >= 140 && o.length <= 155) ?? opts.find((o) => o.length <= 155) ?? lead
  void p
  return { metaTitle, metaDescription }
}

export const areaEntries: ContentEntry[] = AREAS.map((a) => ({
  collection: 'service-areas',
  slug: a.slug,
  locales: Object.fromEntries(
    (['az', 'en', 'ru'] as Loc[]).map((l) => {
      const n = a.name[l]
      const nLoc = azLoc(n) // AZ templates receive the locative form (Bilgəhdə, Badamdarda…)
      const p = PROFILE[a.profile]
      const html = [
        `<p>${a.intro[l]}</p>`,
        `<h2>${l === 'az' ? T.notesH.az(nLoc) : T.notesH[l](n)}</h2><ul>${a.notes[l].map((x) => `<li>${x}</li>`).join('')}</ul>`,
        `<h2>${p.h2[l]}</h2><p>${p.text[l]}</p>`,
        `<h2>${T.typesH[l]}</h2><p>${p.types[l]}</p>`,
        `<h2>${T.stepsH[l]}</h2><ol>${T.steps[l].map((s) => `<li>${s}</li>`).join('')}</ol>`,
        a.project ? `<h2>${T.projectH[l]}</h2><p><a href="${pre(l)}/projects/${a.project.slug}">${a.project.label[l]}</a></p>` : '',
        `<h2>${T.moreH[l]}</h2><p>${T.more[l]}</p>`,
        `<p>${l === 'az' ? T.cta.az(nLoc) : T.cta[l](n)}</p>`,
      ].join('\n')
      const excerpt = a.intro[l].split('. ')[0] + '.'
      return [
        l,
        {
          ...metaFor(a, l),
          excerpt,
          html,
          ...(l === 'az' ? {} : { slug: a.slugs[l] }),
        },
      ]
    }),
  ),
}))
