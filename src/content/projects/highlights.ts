/**
 * Short descriptions for project highlights (keyed by the AZ highlight title from the old site).
 * Each explains what the feature is and why it matters — no project-specific figures are invented.
 * Applied by `npm run content:highlights`; editors can change them per project in admin.
 */
type D = { az: string; en: string; ru: string }

export const HIGHLIGHT_DESCRIPTIONS: Record<string, D> = {
  'Professional quraşdırma': {
    az: 'Avadanlıq istehsalçı tələblərinə uyğun quraşdırılır, hər birləşmə və elektrik xətti təhvildən əvvəl sınaqdan keçirilir.',
    en: 'Equipment is installed to the manufacturer’s requirements; every joint and electrical line is tested before handover.',
    ru: 'Оборудование монтируется по требованиям производителя, каждое соединение и электролиния проверяются до сдачи.',
  },
  'Mozaika üzlük': {
    az: 'Şüşə mozaika suya, kimyəvi maddələrə və günəşə davamlıdır, rəngini illərlə saxlayır və hovuz formasına asan uyğunlaşır.',
    en: 'Glass mosaic withstands water, chemicals and sunlight, keeps its colour for years and follows any pool shape.',
    ru: 'Стеклянная мозаика устойчива к воде, химии и солнцу, годами сохраняет цвет и легко повторяет форму чаши.',
  },
  'Professional tikinti': {
    az: 'Bütün mərhələlər — qazıntı, beton, izolyasiya və üzlük — öz komandamız tərəfindən, texniki nəzarət altında aparılır.',
    en: 'Every stage — excavation, concrete, waterproofing and finishing — is carried out by our own team under technical supervision.',
    ru: 'Все этапы — котлован, бетон, гидроизоляция и облицовка — выполняет наша бригада под техническим надзором.',
  },
  'Keramika plitə üzlük': {
    az: 'Hovuz üçün nəzərdə tutulmuş keramika plitə su udmur, sürüşməyə qarşı səthə malikdir və asan təmizlənir.',
    en: 'Pool-grade ceramic tiles do not absorb water, have a slip-resistant surface and are easy to clean.',
    ru: 'Керамическая плитка для бассейнов не впитывает воду, имеет противоскользящую поверхность и легко моется.',
  },
  'Kommersiya sinif hovuz': {
    az: 'Gündəlik çox sayda istifadəçiyə hesablanmış filtrasiya, dezinfeksiya və konstruksiya — su keyfiyyəti yük artanda da sabit qalır.',
    en: 'Filtration, disinfection and structure sized for many daily users, so water quality stays stable under heavy use.',
    ru: 'Фильтрация, обеззараживание и конструкция рассчитаны на большую ежедневную нагрузку — качество воды стабильно.',
  },
  'Professional buxar generatoru': {
    az: 'Buxar generatoru otağı qısa müddətdə istiləşdirir və temperaturu avtomatik saxlayır; texniki otaqda yerləşdirilir.',
    en: 'The steam generator heats the room quickly and holds the temperature automatically; it is installed in the plant room.',
    ru: 'Парогенератор быстро прогревает помещение и автоматически держит температуру; устанавливается в техпомещении.',
  },
  'Professional su keçirməzlik': {
    az: 'Çoxqatlı elastik hidroizolyasiya betonu su və kimyəvi təsirdən qoruyur; üzlükdən əvvəl hovuz su ilə sınanır.',
    en: 'Multi-layer elastic waterproofing protects the concrete from water and chemicals; the pool is water-tested before finishing.',
    ru: 'Многослойная эластичная гидроизоляция защищает бетон от воды и химии; перед облицовкой чашу испытывают водой.',
  },
  'Ağ mərmər üzlük': {
    az: 'Ağ mərmər hamamın klassik görünüşünü yaradır, istini yaxşı saxlayır və nəmli mühitdə uzunömürlüdür.',
    en: 'White marble gives the hammam its classic look, holds heat well and lasts long in a humid environment.',
    ru: 'Белый мрамор создаёт классический облик хаммама, хорошо держит тепло и долговечен во влажной среде.',
  },
  'Mərmər üzlük': {
    az: 'Mərmər üzlük buxara və istiyə davamlıdır, isti səthlər yaradır və hamamın estetikasını tamamlayır.',
    en: 'Marble cladding resists steam and heat, gives warm surfaces and completes the look of the hammam.',
    ru: 'Мраморная облицовка устойчива к пару и теплу, даёт тёплые поверхности и завершает облик хаммама.',
  },
  'SPA zonasına inteqrasiya': {
    az: 'Obyekt mövcud SPA zonasının planına, ventilyasiyasına və texniki sistemlərinə uyğun yerləşdirilib.',
    en: 'Fitted into the existing spa area’s layout, ventilation and technical systems.',
    ru: 'Объект вписан в планировку, вентиляцию и инженерные системы существующей спа-зоны.',
  },
  'Ənənəvi göbəktaşı': {
    az: 'Hamamın mərkəzindəki isidilən mərmər platforma — uzanmaq, istiləşmək və köpük masajı üçün.',
    en: 'The heated marble platform at the centre of the hammam — for lying down, warming up and foam massage.',
    ru: 'Подогреваемая мраморная платформа в центре хаммама — для отдыха, прогрева и пенного массажа.',
  },
  'Buxar generator sistemi': {
    az: 'Buxar generatoru, buxar çıxışları və idarəetmə paneli bir sistem kimi quraşdırılır, temperatur avtomatik tənzimlənir.',
    en: 'Steam generator, outlets and control panel work as one system with automatic temperature control.',
    ru: 'Парогенератор, паровыпуски и пульт работают как единая система с автоматическим контролем температуры.',
  },
  'Keyfiyyətə nəzarət': {
    az: 'Hər mərhələ növbəti başlamadan əvvəl yoxlanılır: beton, izolyasiya sınağı, üzlük və avadanlığın işə salınması.',
    en: 'Each stage is checked before the next begins: concrete, waterproofing test, finishing and equipment start-up.',
    ru: 'Каждый этап проверяется до начала следующего: бетон, тест гидроизоляции, облицовка и запуск оборудования.',
  },
  'Aromaterapiya dəstəyi': {
    az: 'Buxar sisteminə aromat dozatoru qoşulur — otaq efir yağlarının ətri ilə doldurulur.',
    en: 'An aroma dispenser is connected to the steam system so the room fills with essential-oil fragrance.',
    ru: 'К паровой системе подключён аромадозатор — помещение наполняется ароматом эфирных масел.',
  },
  '42–48°C temperatur': {
    az: 'Hamam üçün rahat temperatur aralığı: bədən yavaş-yavaş istiləşir, ürəyə yük düşmür.',
    en: 'A comfortable hammam temperature range: the body warms up gradually without straining the heart.',
    ru: 'Комфортный для хаммама диапазон: тело прогревается постепенно, без нагрузки на сердце.',
  },
  'Daş döşəmə ətraf zona': {
    az: 'Hovuz ətrafı təbii daşla döşənib — sürüşmür, günəşdə çox qızmır və bağın görünüşü ilə uyğunlaşır.',
    en: 'The pool surround is paved with natural stone — non-slip, stays cooler in the sun and suits the garden.',
    ru: 'Территория вокруг бассейна вымощена натуральным камнем — не скользит, меньше нагревается и сочетается с садом.',
  },
  'Antibakterial üzlük': {
    az: 'Məsaməsiz səth bakteriya və kif yığılmasının qarşısını alır, gigiyenik təmizliyi asanlaşdırır.',
    en: 'A non-porous surface prevents bacteria and mould from building up and makes hygienic cleaning easy.',
    ru: 'Непористая поверхность не даёт скапливаться бактериям и плесени, упрощает гигиеническую уборку.',
  },
  'Himalay duz kristalları': {
    az: 'Divarlar Himalay duzu kristalları ilə üzlənib — duz otağına xas mikroiqlim və isti işıq effekti yaradır.',
    en: 'Walls clad with Himalayan salt crystals create the salt-room microclimate and a warm glow.',
    ru: 'Стены облицованы кристаллами гималайской соли — создают микроклимат соляной комнаты и тёплое свечение.',
  },
  Göbəktaşı: {
    az: 'Hamamın mərkəzi isidilən mərmər platforması — istirahət və ənənəvi köpük masajı yeri.',
    en: 'The central heated marble platform of the hammam — the place for rest and traditional foam massage.',
    ru: 'Центральная подогреваемая мраморная платформа — место отдыха и традиционного пенного массажа.',
  },
  'Temperatur tənzimləmə': {
    az: 'Temperatur paneldən təyin olunur və sistem onu avtomatik saxlayır.',
    en: 'The temperature is set on the panel and held automatically by the system.',
    ru: 'Температура задаётся на панели и автоматически поддерживается системой.',
  },
  'Yüksək dövriyyəli filtrasiya': {
    az: 'Hovuz suyu gün ərzində dəfələrlə filtrdən keçir — su yüksək istifadədə də şəffaf qalır.',
    en: 'Pool water passes through the filters many times a day, staying clear even under heavy use.',
    ru: 'Вода многократно проходит через фильтры за сутки и остаётся прозрачной даже при большой нагрузке.',
  },
  '70–100°C temperatur': {
    az: 'Klassik sauna rejimi: quru isti hava bədəni dərindən qızdırır və tərləməni gücləndirir.',
    en: 'The classic sauna regime: dry hot air warms the body deeply and promotes sweating.',
    ru: 'Классический режим сауны: сухой горячий воздух глубоко прогревает тело и усиливает потоотделение.',
  },
  'Gizli su toplama oluğu': {
    az: 'Daşan su görünməyən oluqla balans çəninə yığılır — kənar təmiz və minimal görünür.',
    en: 'Overflow water is collected by a concealed gutter into the balance tank, keeping the edge clean and minimal.',
    ru: 'Переливающаяся вода уходит в скрытый лоток и переливную ёмкость — борт выглядит чисто и минималистично.',
  },
  'Infinity / overflow konstruksiya': {
    az: 'Su kənardan daşaraq sonsuzluq effekti yaradır; daşma kənarı millimetr dəqiqliyi ilə nivelirlənir.',
    en: 'Water spills over the edge to create the infinity effect; the overflow edge is levelled to the millimetre.',
    ru: 'Вода переливается через край, создавая эффект бесконечности; борт выведен с точностью до миллиметра.',
  },
  'Düzgün ventilyasiya sistemi': {
    az: 'Nəmli havanın kənarlaşdırılması divarları kifdən, konstruksiyanı korroziyadan qoruyur.',
    en: 'Removing humid air protects the walls from mould and the structure from corrosion.',
    ru: 'Удаление влажного воздуха защищает стены от плесени, а конструкцию — от коррозии.',
  },
  'Duzlu hava davamlı materiallar': {
    az: 'Dəniz kənarı üçün paslanmaz polad, xüsusi fuga və UV-yə davamlı materiallar seçilib.',
    en: 'Stainless steel, special grout and UV-resistant materials chosen for the seaside.',
    ru: 'Для побережья выбраны нержавеющая сталь, специальная затирка и УФ-стойкие материалы.',
  },
  'Soyutma agreqeti': {
    az: 'Soyuq su hovuzunun temperaturunu sabit aşağı səviyyədə saxlayan soyutma avadanlığı.',
    en: 'Cooling equipment that keeps the cold-plunge water at a steady low temperature.',
    ru: 'Холодильный агрегат, поддерживающий стабильно низкую температуру купели.',
  },
  'Avtomatik dezinfeksiya': {
    az: 'Xlor və pH avtomatik ölçülür və dozalanır — əl ilə kimyəvi əlavəyə ehtiyac azalır.',
    en: 'Chlorine and pH are measured and dosed automatically, reducing manual chemical handling.',
    ru: 'Хлор и pH измеряются и дозируются автоматически — ручного внесения химии почти не нужно.',
  },
  'SPA dövrəsinə inteqrasiya': {
    az: 'Obyekt sauna, hamam və hovuz arasında rahat keçidli SPA marşrutunun bir hissəsi kimi planlaşdırılıb.',
    en: 'Planned as part of a spa route with easy transitions between sauna, hammam and pool.',
    ru: 'Спланирован как часть спа-маршрута с удобными переходами между сауной, хаммамом и бассейном.',
  },
  'Dərin dəri təmizliyi üçün dizayn': {
    az: 'Buxar və isti mərmər məsamələri açır, kisə və köpük prosedurları üçün ideal şərait yaradır.',
    en: 'Steam and warm marble open the pores, creating ideal conditions for kese scrub and foam rituals.',
    ru: 'Пар и тёплый мрамор раскрывают поры — идеальные условия для кесе и пенных процедур.',
  },
  'UV + avtomatik xlorlama': {
    az: 'UV lampa mikroorqanizmləri zərərsizləşdirir, avtomatik xlorlama isə xlor sərfini və iyini azaldır.',
    en: 'UV neutralises micro-organisms while automatic chlorination keeps chlorine use and odour low.',
    ru: 'УФ-лампа обезвреживает микроорганизмы, автоматическое хлорирование снижает расход и запах хлора.',
  },
  'Dəniz mənzərəli açıq hovuz': {
    az: 'Hovuz dəniz mənzərəsinə yönəldilib, konstruksiya isə dəniz küləyi və duzlu havaya görə seçilib.',
    en: 'The pool faces the sea view, with a structure chosen for sea wind and salty air.',
    ru: 'Бассейн ориентирован на вид моря, конструкция подобрана с учётом ветра и солёного воздуха.',
  },
  'Ağac interyer': {
    az: 'İstiyə davamlı ağac interyer sauna atmosferi yaradır və toxunanda yandırmır.',
    en: 'A heat-resistant wooden interior creates the sauna atmosphere and stays comfortable to touch.',
    ru: 'Термостойкий деревянный интерьер создаёт атмосферу сауны и не обжигает при касании.',
  },
  'Klassik Ottoman dizayn': {
    az: 'Günbəz, mərmər və kurnalarla ənənəvi Osmanlı hamamı üslubu.',
    en: 'The traditional Ottoman hammam style with a dome, marble and basins.',
    ru: 'Традиционный стиль османского хаммама — купол, мрамор и курны.',
  },
  'Yüksək güclü filtrasiya': {
    az: 'Hovuzun həcminə və istifadəsinə görə seçilmiş güclü nasos və filtr suyu tez təmizləyir.',
    en: 'A powerful pump and filter sized to the pool’s volume and use clean the water quickly.',
    ru: 'Мощный насос и фильтр, подобранные под объём и нагрузку бассейна, быстро очищают воду.',
  },
  'Hamam kompleksinə inteqrasiya': {
    az: 'Obyekt hamam kompleksinin planına və mövcud texniki sistemlərinə bağlanıb.',
    en: 'Connected to the bath complex’s layout and existing technical systems.',
    ru: 'Объект встроен в планировку банного комплекса и его инженерные системы.',
  },
  'Panoramik görünüş': {
    az: 'Hovuz ətraf mənzərəni ön plana çıxaracaq şəkildə yerləşdirilib.',
    en: 'The pool is positioned to put the surrounding view in the foreground.',
    ru: 'Бассейн расположен так, чтобы открывать окружающий вид.',
  },
  'Qapalı texniki sistem': {
    az: 'Nasos, filtr və borular görünməyən texniki zonada toplanıb — həm səssiz, həm təhlükəsiz.',
    en: 'Pump, filter and piping are housed in a concealed technical area — quiet and safe.',
    ru: 'Насос, фильтр и трубы собраны в скрытой технической зоне — тихо и безопасно.',
  },
  '45°C-yə qədər temperatur': {
    az: 'İstirahət üçün yumşaq istilik rejimi — uzun qalmağa imkan verir.',
    en: 'A gentle heat setting for relaxation that allows a longer stay.',
    ru: 'Мягкий тепловой режим для отдыха, позволяющий находиться дольше.',
  },
  'İsti divar örtükləri': {
    az: 'Divar səthləri isidilir və ya istini saxlayan materialla üzlənir — otaq bərabər istiləşir.',
    en: 'Wall surfaces are heated or clad with heat-retaining material so the room warms evenly.',
    ru: 'Стены подогреваются или облицованы теплоёмким материалом — помещение прогревается равномерно.',
  },
  'Tam anahtar təhvil': {
    az: 'Layihədən işə salınmaya qədər bütün işlər bir müqavilə ilə görülür, obyekt istifadəyə hazır təhvil verilir.',
    en: 'All work from design to start-up under one contract; the facility is handed over ready to use.',
    ru: 'Все работы от проекта до запуска по одному договору; объект сдаётся готовым к использованию.',
  },
  '8–15°C soyuq su temperaturu': {
    az: 'Sauna və hamamdan sonra kontrast üçün soyuq su hovuzu — qan dövranını canlandırır.',
    en: 'A cold plunge for contrast after the sauna or hammam that boosts circulation.',
    ru: 'Купель для контраста после сауны или хаммама — тонизирует кровообращение.',
  },
  'Lüks tamamlanma': {
    az: 'Premium materiallar və diqqətli detal işi — kənarlar, birləşmələr və işıqlandırma.',
    en: 'Premium materials and careful detailing — edges, joints and lighting.',
    ru: 'Премиальные материалы и тщательная проработка деталей — кромки, стыки и освещение.',
  },
  'İsti göbəktaşı': {
    az: 'Altdan isidilən mərmər platforma — bədəni bərabər istiləşdirir.',
    en: 'A marble platform heated from below that warms the body evenly.',
    ru: 'Мраморная платформа с подогревом снизу равномерно прогревает тело.',
  },
  'İstirahət zonası': {
    az: 'Prosedurlar arasında dincəlmək üçün ayrılmış rahat zona.',
    en: 'A comfortable area set aside for resting between treatments.',
    ru: 'Комфортная зона для отдыха между процедурами.',
  },
  'Tam məhrəmiyyət dizaynı': {
    az: 'Planlama və şüşələr kənar baxışdan qoruyacaq şəkildə seçilib.',
    en: 'Layout and glazing chosen to keep the space private from outside views.',
    ru: 'Планировка и остекление подобраны так, чтобы пространство было закрыто от посторонних глаз.',
  },
  'Thermowood divar/tavan': {
    az: 'Termik işlənmiş ağac nəmə və temperatur dəyişməsinə davamlıdır, əyilmir və uzun xidmət edir.',
    en: 'Thermally modified wood resists moisture and temperature changes, does not warp and lasts long.',
    ru: 'Термодерево устойчиво к влаге и перепадам температур, не коробится и служит долго.',
  },
  'Aspen oturacaqlar': {
    az: 'Osina (aspen) ağacı az qızır, qatran buraxmır — sauna oturacaqları üçün klassik seçim.',
    en: 'Aspen stays relatively cool and releases no resin — a classic choice for sauna benches.',
    ru: 'Осина слабо нагревается и не выделяет смолу — классика для полков сауны.',
  },
  'Keyfiyyətli ventilyasiya': {
    az: 'Düzgün hava axını təmiz havanı təmin edir və ağacın ömrünü uzadır.',
    en: 'Proper airflow keeps the air fresh and extends the life of the wood.',
    ru: 'Правильный воздухообмен поддерживает свежий воздух и продлевает срок службы дерева.',
  },
  'Günbəz tavan və rəngli şüşə': {
    az: 'Günbəz kondensatın divara axmasını təmin edir, rəngli şüşələr isə yumşaq işıq verir.',
    en: 'The dome lets condensation run down the walls, while stained glass gives soft light.',
    ru: 'Купол отводит конденсат по стенам, а витражи дают мягкий свет.',
  },
  'Aromaterapiya sistemi': {
    az: 'Efir yağları buxara avtomatik əlavə olunur — prosedurun rahatlıq effekti artır.',
    en: 'Essential oils are added to the steam automatically, enhancing relaxation.',
    ru: 'Эфирные масла автоматически добавляются в пар, усиливая расслабляющий эффект.',
  },
  '100% nəmlik rejimi': {
    az: 'Buxar otağında tam nəmlik — tənəffüs yollarını yumşaldır, dərini nəmləndirir.',
    en: 'Full humidity in the steam room soothes the airways and hydrates the skin.',
    ru: 'Полная влажность в парной смягчает дыхательные пути и увлажняет кожу.',
  },
  'Mikronize duz aerozolu': {
    az: 'Halogenerator duzu xırda hissəciklərə ayırıb havaya verir — tənəffüs yolları üçün faydalı mühit.',
    en: 'The halogenerator disperses finely ground salt into the air, a beneficial environment for the airways.',
    ru: 'Галогенератор распыляет мелкодисперсную соль — полезная среда для дыхательных путей.',
  },
  'Fərdi ölçü və forma': {
    az: 'Ölçü və forma əraziyə, istifadə məqsədinə və müştərinin istəyinə görə layihələndirilib.',
    en: 'Size and shape designed around the site, the intended use and the client’s wishes.',
    ru: 'Размер и форма спроектированы под участок, назначение и пожелания заказчика.',
  },
  'Dəniz mənzərəli infinity hovuz': {
    az: 'Daşma kənarı dənizlə birləşirmiş kimi görünür — infinity effekti mənzərəni tamamlayır.',
    en: 'The overflow edge seems to merge with the sea — the infinity effect completes the view.',
    ru: 'Переливной борт словно сливается с морем — эффект инфинити дополняет вид.',
  },
  'HARVIA peçi': {
    az: 'Harvia — Finlandiyanın tanınmış sauna peçi istehsalçısı; peç bərabər və sabit istilik verir.',
    en: 'Harvia is a well-known Finnish sauna stove maker; the stove gives even, steady heat.',
    ru: 'Harvia — известный финский производитель печей для саун; печь даёт ровный стабильный жар.',
  },
  'Dərin dəri baxımı üçün dizayn': {
    az: 'Buxar və isti səthlər dərini prosedurlara hazırlayır — kisə, köpük və maska üçün.',
    en: 'Steam and warm surfaces prepare the skin for treatments — kese, foam and masks.',
    ru: 'Пар и тёплые поверхности готовят кожу к процедурам — кесе, пене и маскам.',
  },
  'Anahtar təhvil icra': {
    az: 'Layihə, tikinti, avadanlıq və işə salınma — hamısı bir komanda və bir müqavilə ilə.',
    en: 'Design, construction, equipment and start-up — all by one team under one contract.',
    ru: 'Проект, строительство, оборудование и запуск — одной командой по одному договору.',
  },
  'Buxar (par) sistemi': {
    az: 'Rus hamamında nəm buxar daşları qızdıran peçdən alınır və rahat şəkildə tənzimlənir.',
    en: 'In a Russian bath the moist steam comes from the stove’s heated stones and is easy to control.',
    ru: 'В русской бане влажный пар получают от раскалённых камней печи и легко регулируют.',
  },
  'Tikintidən işə salınmaya tam icra': {
    az: 'Tikinti, üzlük, avadanlıq montajı və işə salınma eyni komanda tərəfindən ardıcıl icra olunur.',
    en: 'Construction, finishing, equipment installation and commissioning delivered in sequence by one team.',
    ru: 'Строительство, облицовка, монтаж оборудования и запуск выполняются последовательно одной командой.',
  },
  'Temperatur/nəmlik nəzarəti': {
    az: 'Sensorlar temperaturu və nəmliyi izləyir, sistem rejimi avtomatik saxlayır.',
    en: 'Sensors monitor temperature and humidity and the system holds the set regime automatically.',
    ru: 'Датчики контролируют температуру и влажность, система автоматически держит заданный режим.',
  },
  'Texniki servis dəstəyi': {
    az: 'Təhvildən sonra profilaktika və texniki xidmət göstərilir.',
    en: 'Preventive maintenance and technical service are provided after handover.',
    ru: 'После сдачи проводится профилактика и техническое обслуживание.',
  },
  'HARVIA elektrik peçi': {
    az: 'Harvia elektrik peçi tez qızır, paneldən idarə olunur və təhlükəsiz istismar üçün qoruyucularla təchiz olunub.',
    en: 'The Harvia electric stove heats quickly, is panel-controlled and has safety cut-outs.',
    ru: 'Электропечь Harvia быстро нагревается, управляется с панели и оснащена защитой.',
  },
  'Gizli filtrasiya sistemi': {
    az: 'Filtr və nasos görünməyən yerdə quraşdırılıb — həyətin görünüşü pozulmur, səs eşidilmir.',
    en: 'Filter and pump are installed out of sight, so the garden view stays clean and quiet.',
    ru: 'Фильтр и насос установлены скрыто — вид двора не нарушается, шума не слышно.',
  },
  'LED sualtı işıqlandırma': {
    az: 'Su altında LED lampalar axşam hovuza dərinlik və təhlükəsizlik verir, az enerji sərf edir.',
    en: 'Underwater LED lights add depth and safety in the evening while using little energy.',
    ru: 'Подводные LED-светильники вечером придают глубину и безопасность при малом расходе энергии.',
  },
  'Özəl seans imkanı': {
    az: 'Obyekt ayrıca qrup və ya şəxsi istifadə üçün bağlana bilir.',
    en: 'The facility can be closed for private groups or individual sessions.',
    ru: 'Объект можно закрыть для приватной группы или индивидуального сеанса.',
  },
  'Xüsusi kran/duş sistemi': {
    az: 'Prosedur üçün ayrıca isti/soyuq su kranları və duş xətti çəkilib.',
    en: 'Dedicated hot and cold taps and a shower line installed for the rituals.',
    ru: 'Для процедур проведены отдельные краны горячей и холодной воды и душевая линия.',
  },
  'SPA kompleksinə inteqrasiya': {
    az: 'Obyekt SPA kompleksinin planına, ventilyasiyasına və texniki sistemlərinə uyğun qurulub.',
    en: 'Built to fit the spa complex’s layout, ventilation and technical systems.',
    ru: 'Построен с учётом планировки, вентиляции и инженерии спа-комплекса.',
  },
  'Termo-işlənmiş ağac (thermowood)': {
    az: 'Termo-işlənmiş ağac nəm və istidən deformasiya olmur, çürüməyə davamlıdır.',
    en: 'Thermo-treated wood does not deform with moisture or heat and resists rot.',
    ru: 'Термообработанная древесина не деформируется от влаги и тепла и устойчива к гниению.',
  },
  'Halogenerator sistemi': {
    az: 'Halogenerator duz aerozolunu havaya bərabər paylayır — duz otağının əsas avadanlığıdır.',
    en: 'The halogenerator spreads salt aerosol evenly in the air — the core of a salt room.',
    ru: 'Галогенератор равномерно распыляет солевой аэрозоль — основное оборудование соляной комнаты.',
  },
  'Sualtı LED işıqlandırma': {
    az: 'LED lampalar suyun rəngini canlandırır, gecə istifadəsini təhlükəsiz edir.',
    en: 'LED lights bring the water colour to life and make night use safe.',
    ru: 'LED-светильники оживляют цвет воды и делают вечернее купание безопасным.',
  },
  'Gizli buxar generatoru': {
    az: 'Generator texniki zonada gizlədilib, buxar otağa yalnız buxar çıxışları ilə verilir.',
    en: 'The generator is hidden in the technical area; steam enters the room only through outlets.',
    ru: 'Генератор скрыт в технической зоне, пар подаётся в помещение только через паровыпуски.',
  },
  'Klassik Fin saunası dizaynı': {
    az: 'Quru isti, ağac interyer və peç üzərinə su ilə idarə olunan buxar — klassik Fin saunası.',
    en: 'Dry heat, a wooden interior and steam controlled by water on the stove — the classic Finnish sauna.',
    ru: 'Сухой жар, деревянный интерьер и пар, регулируемый поливом камней, — классическая финская сауна.',
  },
  'Yüksək keyfiyyətli mozaika': {
    az: 'Rəngi solmayan, suya və kimyəvi maddələrə davamlı şüşə mozaika.',
    en: 'Glass mosaic that does not fade and withstands water and chemicals.',
    ru: 'Стеклянная мозаика, которая не выцветает и устойчива к воде и химии.',
  },
  'Terapevtik effekt': {
    az: 'İstilik və nəmlik əzələləri rahatlaşdırır, qan dövranını yaxşılaşdırır.',
    en: 'Heat and humidity relax the muscles and improve circulation.',
    ru: 'Тепло и влажность расслабляют мышцы и улучшают кровообращение.',
  },
  'Buxar ilə qızdırma': {
    az: 'Otaq buxarla qızdırılır — istilik bərabər yayılır, hava nəmli və yumşaq olur.',
    en: 'The room is heated by steam, so the warmth spreads evenly and the air feels soft and moist.',
    ru: 'Помещение прогревается паром — тепло распределяется равномерно, воздух мягкий и влажный.',
  },
  'Avtomatik filtrasiya sistemi': {
    az: 'Taymer və idarəetmə paneli filtrasiyanı avtomatik işə salır və dayandırır.',
    en: 'A timer and control panel start and stop filtration automatically.',
    ru: 'Таймер и пульт автоматически включают и выключают фильтрацию.',
  },
  'Peyzajla harmonik dizayn': {
    az: 'Hovuzun forması və materialları bağın landşaftına uyğun seçilib.',
    en: 'The pool’s shape and materials were chosen to suit the garden landscape.',
    ru: 'Форма и материалы бассейна подобраны в гармонии с ландшафтом сада.',
  },
  'Küləyə və duzlu havaya davamlı konstruksiya': {
    az: 'Sahil şəraiti üçün korroziyaya davamlı avadanlıq və möhkəm kənar həlləri seçilib.',
    en: 'Corrosion-resistant equipment and sturdy edge details chosen for coastal conditions.',
    ru: 'Для прибрежных условий выбраны коррозионностойкое оборудование и прочные решения борта.',
  },
  '40–45°C temperatur': {
    az: 'Buxar otağı üçün rahat istilik — yüksək nəmlikdə bədən yumşaq istiləşir.',
    en: 'A comfortable steam-room heat — the body warms gently at high humidity.',
    ru: 'Комфортная для парной температура — при высокой влажности тело прогревается мягко.',
  },
  '70–100°C temperatur diapazonu': {
    az: 'İstilik paneldən istəyə görə təyin olunur — yüngüldən intensivə qədər sauna rejimi.',
    en: 'Heat is set on the panel as desired — from a mild to an intense sauna session.',
    ru: 'Жар задаётся на панели по желанию — от мягкого до интенсивного режима сауны.',
  },
  '90–100% nəmlik': {
    az: 'Buxar otağına xas yüksək nəmlik dərini nəmləndirir və tənəffüsü yüngülləşdirir.',
    en: 'The high humidity typical of a steam room hydrates the skin and eases breathing.',
    ru: 'Высокая влажность парной увлажняет кожу и облегчает дыхание.',
  },
  'Hava nasosları': {
    az: 'Hava nasosları (bloverlər) hidromasaj üçün suya hava qabarcıqları verir.',
    en: 'Air pumps (blowers) feed air bubbles into the water for hydromassage.',
    ru: 'Воздушные насосы (блоуэры) подают пузырьки воздуха для гидромассажа.',
  },
  'Akustik izolyasiya': {
    az: 'Avadanlığın səsi istirahət zonasına keçmir.',
    en: 'Equipment noise is kept out of the relaxation area.',
    ru: 'Шум оборудования не проникает в зону отдыха.',
  },
  'Çox tərəfli işıqlandırma': {
    az: 'Tavan, divar və sualtı işıqlar birlikdə yumşaq və rahat atmosfer yaradır.',
    en: 'Ceiling, wall and underwater lights together create a soft, calm atmosphere.',
    ru: 'Потолочный, настенный и подводный свет вместе создают мягкую спокойную атмосферу.',
  },
  'Qaymaz döşəmə': {
    az: 'Yaş ayaqla belə sürüşməyən döşəmə təhlükəsizliyi təmin edir.',
    en: 'Flooring that stays non-slip even under wet feet keeps users safe.',
    ru: 'Пол не скользит даже под мокрыми ногами — это безопасность для посетителей.',
  },
  'Buxara davamlı şüşə qapı': {
    az: 'Temperlənmiş şüşə qapı buxarı içəridə saxlayır və otağı vizual böyüdür.',
    en: 'A tempered glass door keeps steam inside and makes the room feel larger.',
    ru: 'Дверь из закалённого стекла удерживает пар и визуально увеличивает помещение.',
  },
  'Hidromasaj jet sistemi': {
    az: 'Su və hava qarışığı verən jetlər əzələləri masaj edir və rahatlıq verir.',
    en: 'Jets delivering a water-air mix massage the muscles and help you relax.',
    ru: 'Форсунки с водно-воздушной смесью массируют мышцы и расслабляют.',
  },
  'Gizli texniki otaq': {
    az: 'Filtr və nasos gizli texniki otaqdadır — həyətin görünüşü və sakitliyi qorunur.',
    en: 'Filter and pump sit in a hidden plant room, keeping the garden tidy and quiet.',
    ru: 'Фильтр и насос в скрытом техпомещении — двор остаётся аккуратным и тихим.',
  },
  'Mərkəzi göbəktaşı': {
    az: 'Hamamın mərkəzindəki isidilən mərmər platforma — ənənəvi masajın keçirildiyi yer.',
    en: 'The heated marble platform at the centre of the hammam, where the traditional massage takes place.',
    ru: 'Подогреваемая мраморная платформа в центре хаммама — место традиционного массажа.',
  },
  'UV və xlorla dezinfeksiya': {
    az: 'UV lampa ilə xlorun birgə istifadəsi suyu etibarlı zərərsizləşdirir, xlor sərfini azaldır.',
    en: 'UV combined with chlorine disinfects water reliably while reducing chlorine use.',
    ru: 'УФ в сочетании с хлором надёжно обеззараживает воду и снижает расход хлора.',
  },
  'Armatur-beton konstruksiya': {
    az: 'Hovuz kasası iki qat armaturla dəmir-betondan tökülür — torpaq təzyiqinə və suyun yükünə davamlıdır.',
    en: 'The pool shell is cast in reinforced concrete with two layers of rebar, resisting soil pressure and water load.',
    ru: 'Чаша отлита из железобетона с двойным армированием — выдерживает давление грунта и нагрузку воды.',
  },
  'Abşeron iqlimi üçün xüsusi materiallar': {
    az: 'İsti yay, külək və duzlu hava nəzərə alınaraq izolyasiya, fuga və avadanlıq seçilib.',
    en: 'Waterproofing, grout and equipment chosen for hot summers, wind and salty air.',
    ru: 'Гидроизоляция, затирка и оборудование подобраны с учётом жаркого лета, ветра и солёного воздуха.',
  },
  'Kommersiya sinif su keçirməzlik sistemi': {
    az: 'Yüksək yükə hesablanmış çoxqatlı hidroizolyasiya — beton illərlə qorunur.',
    en: 'Multi-layer waterproofing rated for heavy use protects the concrete for years.',
    ru: 'Многослойная гидроизоляция для высоких нагрузок защищает бетон долгие годы.',
  },
  '10–20% aşağı nəmlik': {
    az: 'Quru isti Fin saunasının əsasıdır — yüksək temperatur rahat qəbul olunur.',
    en: 'Dry heat is the essence of the Finnish sauna — high temperatures feel comfortable.',
    ru: 'Сухой жар — основа финской сауны: высокая температура переносится комфортно.',
  },
  'Buxar mühiti': {
    az: 'Yüksək nəmlikli yumşaq buxar dərini nəmləndirir və bədəni yüngül istiləşdirir.',
    en: 'Soft, highly humid steam hydrates the skin and warms the body gently.',
    ru: 'Мягкий влажный пар увлажняет кожу и бережно прогревает тело.',
  },
  'Ətraf ərazinin abadlaşdırılması': {
    az: 'Hovuz ətrafında döşəmə, işıqlandırma və yaşıllıq işləri tamamlanır.',
    en: 'Paving, lighting and planting around the pool are completed as part of the job.',
    ru: 'Вокруг бассейна выполняются мощение, освещение и озеленение.',
  },
  'Fərdi dizayn': {
    az: 'Hər layihə ərazinin ölçüsünə, evin memarlığına və müştərinin istəyinə görə hazırlanır.',
    en: 'Each project is designed around the plot size, the house’s architecture and the client’s wishes.',
    ru: 'Каждый проект готовится под размеры участка, архитектуру дома и пожелания заказчика.',
  },
  'Estetik kənar dizayn': {
    az: 'Kənar daşları və daşma detalları hovuzun görünüşünü tamamlayır, təhlükəsiz tutacaq yaradır.',
    en: 'Coping and overflow details complete the pool’s look and give a safe handhold.',
    ru: 'Бортовой камень и детали перелива завершают облик бассейна и дают надёжную опору.',
  },
  'Klassik Ottoman atmosferi': {
    az: 'Mərmər, günbəz və yumşaq işıqla ənənəvi Osmanlı hamamının ab-havası.',
    en: 'Marble, a dome and soft light recreate the mood of a traditional Ottoman hammam.',
    ru: 'Мрамор, купол и мягкий свет воссоздают атмосферу традиционного османского хаммама.',
  },
  '80–110°C temperatur rejimi': {
    az: 'İntensiv sauna rejimi — istilik paneldən tənzimlənir.',
    en: 'An intense sauna regime, adjustable from the control panel.',
    ru: 'Интенсивный режим сауны с регулировкой на панели управления.',
  },
  'Antibakterial akril üzlük': {
    az: 'Hamar akril səth bakteriya saxlamır, asan təmizlənir və suya davamlıdır.',
    en: 'A smooth acrylic surface does not harbour bacteria, cleans easily and is water-resistant.',
    ru: 'Гладкий акрил не удерживает бактерии, легко моется и влагостоек.',
  },
  'Müasir çoxpilləli filtrasiya': {
    az: 'Mexaniki filtrasiya, UV və kimyəvi dozaj ardıcıl işləyir — su həm şəffaf, həm təhlükəsiz olur.',
    en: 'Mechanical filtration, UV and chemical dosing work in sequence for clear and safe water.',
    ru: 'Механическая фильтрация, УФ и дозирование химии работают последовательно — вода чистая и безопасная.',
  },
  'Kompakt dizayn': {
    az: 'Məhdud sahədən maksimum istifadə — bütün funksiyalar kiçik ərazidə yerləşdirilib.',
    en: 'Making the most of a small space, with every function fitted into a compact footprint.',
    ru: 'Максимум пользы на небольшой площади — все функции размещены компактно.',
  },
  'Sualtı işıqlandırma': {
    az: 'Su altındakı işıqlar hovuzu axşam da istifadəyə yararlı və cəlbedici edir.',
    en: 'Underwater lights make the pool usable and attractive in the evening.',
    ru: 'Подводное освещение делает бассейн удобным и эффектным вечером.',
  },
  'Minimal müasir dizayn': {
    az: 'Sadə xətlər, gizli detallar və təmiz kənarlar — müasir memarlıqla uyğun görünüş.',
    en: 'Clean lines, concealed details and crisp edges that suit modern architecture.',
    ru: 'Чистые линии, скрытые детали и аккуратные кромки в духе современной архитектуры.',
  },
  'Panoramik şəhər mənzərəsi': {
    az: 'Hovuz şəhər mənzərəsinə açılır — istirahət zamanı panorama ön plandadır.',
    en: 'The pool opens onto the city view, keeping the panorama in front while you relax.',
    ru: 'Бассейн открыт на городской пейзаж — панорама всегда перед глазами.',
  },
  'Müasir masaj çarpayıları': {
    az: 'Prosedurlar üçün erqonomik, nəmə davamlı masaj çarpayıları.',
    en: 'Ergonomic, moisture-resistant massage beds for treatments.',
    ru: 'Эргономичные влагостойкие массажные столы для процедур.',
  },
  '40–45°C / 90–100% nəmlik': {
    az: 'Buxar otağının klassik rejimi: mülayim istilik və tam nəmlik.',
    en: 'The classic steam-room regime: moderate heat and full humidity.',
    ru: 'Классический режим парной: умеренное тепло и полная влажность.',
  },
  'Hamar səthlər': {
    az: 'Birləşməsi az, hamar səthlər su və kir saxlamır, asan təmizlənir.',
    en: 'Smooth surfaces with few joints hold no water or dirt and are easy to clean.',
    ru: 'Гладкие поверхности с минимумом швов не задерживают воду и грязь и легко моются.',
  },
  'Ənənəvi peç (каменка)': {
    az: 'Daşlarla doldurulmuş peç sabit istilik və yumşaq buxar verir — rus hamamının əsasıdır.',
    en: 'A stove filled with stones gives steady heat and soft steam — the heart of a Russian bath.',
    ru: 'Печь-каменка даёт стабильный жар и мягкий пар — основа русской бани.',
  },
  'Avtomatik su səriyyəsi nəzarəti': {
    az: 'Su səviyyəsi avtomatik izlənir və lazım olduqda doldurulur — nasos quru işləmir.',
    en: 'The water level is monitored and topped up automatically, so the pump never runs dry.',
    ru: 'Уровень воды контролируется и пополняется автоматически — насос не работает всухую.',
  },
  'Ənənəvi Fin sauna texnologiyası': {
    az: 'Quru isti hava, düzgün ventilyasiya və daş peç — Fin saunasının sınanmış həlli.',
    en: 'Dry hot air, proper ventilation and a stone-filled stove — the proven Finnish sauna setup.',
    ru: 'Сухой горячий воздух, правильная вентиляция и печь с камнями — проверенное решение финской сауны.',
  },
}
