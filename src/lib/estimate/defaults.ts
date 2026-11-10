/**
 * Default price data for the pool calculator, taken from 21 real Complex MMC estimates (2025–2026):
 * median unit prices; `premium` = the higher-grade product the estimates use for premium jobs.
 * Everything here can be overridden in admin (Qiymət kalkulyatoru global).
 */
import type { Extra, L10n, Place, PriceItem } from './types'

const t = (az: string, en: string, ru: string): L10n => ({ az, en, ru })

/** Line labels + units shown in the breakdown. */
export const ITEM_LABELS: Record<string, { name: L10n; unit: L10n }> = {
  // structure
  excavation: { name: t('Qazıntı və geri doldurma', 'Excavation and backfill', 'Земляные работы и обратная засыпка'), unit: t('m³', 'm³', 'м³') },
  soil_trucks: { name: t('Torpağın daşınması', 'Soil removal', 'Вывоз грунта'), unit: t('maşın', 'truck', 'машина') },
  rebar: { name: t('Armatur A500', 'Rebar A500', 'Арматура A500'), unit: t('ton', 't', 'т') },
  tie_wire: { name: t('Katinka, məftil, xırdavat', 'Tie wire and fixings', 'Вязальная проволока, крепёж'), unit: t('lot', 'lot', 'компл.') },
  concrete: { name: t('Beton M350–M400', 'Concrete M350–M400', 'Бетон M350–M400'), unit: t('m³', 'm³', 'м³') },
  concrete_pump: { name: t('Beton pompası', 'Concrete pump', 'Бетононасос'), unit: t('dəfə', 'pour', 'заливка') },
  formwork: { name: t('Qəlib (taxta, dikt) icarəsi', 'Formwork rental', 'Аренда опалубки'), unit: t('lot', 'lot', 'компл.') },
  channel_timber: { name: t('Daşma kanalı üçün taxta', 'Timber for overflow channel', 'Доска для переливного канала'), unit: t('m³', 'm³', 'м³') },
  blocks: { name: t('Hörgü daşı (kubik)', 'Masonry blocks', 'Кладочный камень'), unit: t('ədəd', 'pcs', 'шт.') },
  base_aggregates: { name: t('Qum və şeben (əsas)', 'Sand and gravel base', 'Песок и щебень (основание)'), unit: t('m³', 'm³', 'м³') },
  structure_cement: { name: t('Sement M400', 'Cement M400', 'Цемент M400'), unit: t('kisə', 'bag', 'мешок') },
  labor_concrete: { name: t('Usta haqqı: qəlib və armirovka', 'Labour: formwork and reinforcement', 'Работа: опалубка и армирование'), unit: t('m²', 'm²', 'м²') },
  labor_masonry: { name: t('Usta haqqı: hörgü kontur', 'Labour: masonry contour', 'Работа: кладка контура'), unit: t('m²', 'm²', 'м²') },
  labor_channel_concrete: { name: t('Usta haqqı: daşma kanalı', 'Labour: overflow channel', 'Работа: переливной канал'), unit: t('p.m', 'lm', 'п.м') },
  compaction: { name: t('Trambovka və əks doldurma', 'Compaction and backfill', 'Трамбовка и обратная засыпка'), unit: t('iş', 'job', 'работа') },
  // finishing
  finish_material: { name: t('Üzlük materialı', 'Pool finish material', 'Облицовочный материал'), unit: t('m²', 'm²', 'м²') },
  labor_finish: { name: t('Usta haqqı: mozaika / keramika', 'Labour: mosaic / tiles', 'Работа: мозаика / плитка'), unit: t('m²', 'm²', 'м²') },
  coping: { name: t('Hovuz kənarı daşı (tutmaq)', 'Coping stones', 'Бортовой камень'), unit: t('ədəd', 'pcs', 'шт.') },
  labor_coping: { name: t('Usta haqqı: tutmaq', 'Labour: coping', 'Работа: бортовой камень'), unit: t('p.m', 'lm', 'п.м') },
  grating: { name: t('Daşma izqarası, profil, künclər', 'Overflow grating, profile, corners', 'Переливная решётка, профиль, углы'), unit: t('p.m', 'lm', 'п.м') },
  channel_tiles: { name: t('Daşma kanalı üçün kafel', 'Overflow channel tiles', 'Плитка переливного канала'), unit: t('m²', 'm²', 'м²') },
  labor_channel_finish: { name: t('Usta haqqı: kanal suvaq, izolyasiya, kafel', 'Labour: channel plaster, waterproofing, tiles', 'Работа: канал — штукатурка, гидроизоляция, плитка'), unit: t('p.m', 'lm', 'п.м') },
  skimmers: { name: t('Skimmer', 'Skimmer', 'Скиммер'), unit: t('ədəd', 'pcs', 'шт.') },
  tile_adhesive: { name: t('Sika yapışdırıcı (Graniplus / FLX)', 'Sika tile adhesive', 'Клей для плитки Sika'), unit: t('kisə', 'bag', 'мешок') },
  repair_mortar: { name: t('Sika 612 təmir harcı', 'Sika 612 repair mortar', 'Ремонтный раствор Sika 612'), unit: t('kisə', 'bag', 'мешок') },
  grout: { name: t('Sika FugaFlex fuga', 'Sika FugaFlex grout', 'Затирка Sika FugaFlex'), unit: t('kisə', 'bag', 'мешок') },
  waterproofing: { name: t('SikaTop Seal-107 hidroizolyasiya', 'SikaTop Seal-107 waterproofing', 'Гидроизоляция SikaTop Seal-107'), unit: t('set', 'set', 'компл.') },
  skim_coat: { name: t('Mata (Mr Fix, ağ mata)', 'Skim coat (Mr Fix)', 'Шпатлёвка (Mr Fix)'), unit: t('kisə', 'bag', 'мешок') },
  sand: { name: t('Qum (atsept)', 'Sand', 'Песок'), unit: t('m³', 'm³', 'м³') },
  cement: { name: t('Sement', 'Cement', 'Цемент'), unit: t('kisə', 'bag', 'мешок') },
  plant_room: { name: t('Texniki otaq döşəməsi (metlax + işçilik)', 'Plant room floor (tiles + labour)', 'Пол техпомещения (плитка + работа)'), unit: t('m²', 'm²', 'м²') },
  edge_prep: { name: t('Bort hissəsinin hazırlanması', 'Edge preparation', 'Подготовка борта'), unit: t('p.m', 'lm', 'п.м') },
  labor_plaster: { name: t('Usta haqqı: suvaq və styajka', 'Labour: plaster and screed', 'Работа: штукатурка и стяжка'), unit: t('m²', 'm²', 'м²') },
  labor_skim: { name: t('Usta haqqı: mata', 'Labour: skim coat', 'Работа: шпатлёвка'), unit: t('m²', 'm²', 'м²') },
  labor_waterproofing: { name: t('Usta haqqı: izolyasiya (2 qat)', 'Labour: waterproofing (2 coats)', 'Работа: гидроизоляция (2 слоя)'), unit: t('m²', 'm²', 'м²') },
  // technical
  pumps: { name: t('Dövriyyə nasosu (motor)', 'Circulation pump', 'Циркуляционный насос'), unit: t('ədəd', 'pcs', 'шт.') },
  filter: { name: t('Qum filtri + çoxyollu vana', 'Sand filter + multiport valve', 'Песочный фильтр + многоходовой клапан'), unit: t('ədəd', 'pcs', 'шт.') },
  filter_media: { name: t('Filtr mediyası (aktiv şüşə)', 'Filter media (active glass)', 'Фильтрующая загрузка (активное стекло)'), unit: t('kq', 'kg', 'кг') },
  pipes: { name: t('PVC borular (Pimtaş)', 'PVC pipes (Pimtaş)', 'Трубы ПВХ (Pimtaş)'), unit: t('m', 'm', 'м') },
  fittings: { name: t('PVC fitinqlər, vanalar, klapanlar', 'PVC fittings and valves', 'Фитинги и краны ПВХ'), unit: t('lot', 'lot', 'компл.') },
  return_jets: { name: t('Geri dönüş jetləri + vakuum ağzı', 'Return jets + vacuum point', 'Форсунки возврата + пылесосная'), unit: t('ədəd', 'pcs', 'шт.') },
  main_drain: { name: t('Dib əmiş süzgəci', 'Main drain', 'Донный слив'), unit: t('ədəd', 'pcs', 'шт.') },
  lights: { name: t('LED lampa IP68', 'LED light IP68', 'LED-прожектор IP68'), unit: t('ədəd', 'pcs', 'шт.') },
  transformers: { name: t('Germetik trafo', 'Sealed transformer', 'Герметичный трансформатор'), unit: t('ədəd', 'pcs', 'шт.') },
  cable: { name: t('Kabel 2×2.5 mm', 'Cable 2×2.5 mm', 'Кабель 2×2,5 мм'), unit: t('m', 'm', 'м') },
  control_panel: { name: t('İdarəetmə panosu', 'Control panel', 'Щит управления'), unit: t('ədəd', 'pcs', 'шт.') },
  ladder: { name: t('Paslanmaz pilləkən', 'Stainless steel ladder', 'Лестница из нержавеющей стали'), unit: t('ədəd', 'pcs', 'шт.') },
  cleaning_kit: { name: t('Təmizlik dəsti (süpürgə, şlanq, test)', 'Cleaning kit', 'Комплект для чистки'), unit: t('dəst', 'set', 'компл.') },
  labor_mep: { name: t('Mexanik və elektrik montajı, testlər', 'Mechanical and electrical installation, tests', 'Монтаж механики и электрики, испытания'), unit: t('iş', 'job', 'работа') },
  // logistics
  logistics: { name: t('Nəqliyyat, materialların daşınması və köməkçi xərclər', 'Transport, delivery and site costs', 'Транспорт, доставка и сопутствующие расходы'), unit: t('lot', 'lot', 'компл.') },
}

/** Median unit prices (AZN) from the estimates; premium = higher grade used in premium jobs. */
export const DEFAULT_PRICES: PriceItem[] = [
  { key: 'excavation', price: 6.5 },
  { key: 'rebar', price: 1100, premium: 1300 },
  { key: 'tie_wire', price: 260 },
  { key: 'concrete', price: 115, premium: 120 },
  { key: 'formwork_base', price: 600 },
  { key: 'formwork_per_m', price: 15 },
  { key: 'channel_timber', price: 330 },
  { key: 'blocks', price: 0.75 },
  { key: 'base_aggregates', price: 28 },
  { key: 'structure_cement', price: 9 },
  { key: 'labor_concrete', price: 20 },
  { key: 'labor_masonry', price: 6.5 },
  { key: 'labor_channel_concrete', price: 20 },
  { key: 'compaction', price: 400 },
  { key: 'labor_finish', price: 22, premium: 30 },
  { key: 'coping', price: 40, premium: 55 },
  { key: 'labor_coping', price: 30 },
  { key: 'grating', price: 26, premium: 37 }, // izqara 15/25 + 2.2 m profile 3.5/4 + corners, per metre
  { key: 'channel_tiles', price: 12.5, premium: 15 },
  { key: 'labor_channel_finish', price: 45, premium: 65 },
  { key: 'skimmers', price: 75, premium: 120 },
  { key: 'tile_adhesive', price: 30, premium: 35 },
  { key: 'repair_mortar', price: 28 },
  { key: 'grout', price: 35 },
  { key: 'waterproofing', price: 110 },
  { key: 'skim_coat', price: 16 },
  { key: 'sand', price: 30 },
  { key: 'cement', price: 8.8 },
  { key: 'plant_room', price: 28 },
  { key: 'edge_prep', price: 10 },
  { key: 'edge_prep_tools', price: 200, premium: 500 },
  { key: 'labor_plaster', price: 10 },
  { key: 'labor_skim', price: 5, premium: 6 },
  { key: 'labor_waterproofing', price: 8, premium: 10 },
  { key: 'pump_small', price: 380, premium: 550 }, // ≤ 60 m³
  { key: 'pump_large', price: 480, premium: 550 },
  { key: 'filter', price: 630, premium: 950 }, // filter 580/900 + multiport valve 50
  { key: 'filter_media', price: 0.95, premium: 1 },
  { key: 'pipes', price: 6, premium: 5.5 },
  { key: 'fittings', price: 600, premium: 1200 },
  { key: 'return_jets', price: 7, premium: 65 },
  { key: 'main_drain', price: 25, premium: 240 },
  { key: 'lights', price: 80, premium: 150 },
  { key: 'transformers', price: 70, premium: 120 },
  { key: 'cable', price: 1.5, premium: 2.5 },
  { key: 'control_panel', price: 300, premium: 550 },
  { key: 'ladder', price: 270, premium: 350 },
  { key: 'cleaning_kit', price: 180, premium: 250 },
  { key: 'labor_mep_base', price: 400, premium: 900 },
  { key: 'labor_mep_per_m3', price: 2.5, premium: 6 },
]

const abs = (k: string, az: string, en: string, ru: string, confirmed = false, v = { transport: 1300, pump: 250, truck: 60 }): Place => ({ key: k, name: t(az, en, ru), zone: 'absheron', confirmed, ...v })
const city = (k: string, az: string, en: string, ru: string, confirmed = false, v = { transport: 1800, pump: 500, truck: 110 }): Place => ({ key: k, name: t(az, en, ru), zone: 'baku', confirmed, ...v })
const west = (k: string, az: string, en: string, ru: string, confirmed = false, v = { transport: 2000, pump: 700, truck: 75 }): Place => ({ key: k, name: t(az, en, ru), zone: 'west', confirmed, ...v })
const reg = (k: string, az: string, en: string, ru: string, confirmed = false, v = { transport: 2800, pump: 300, truck: 95 }): Place => ({ key: k, name: t(az, en, ru), zone: 'regions', confirmed, ...v })

/**
 * Places. Confirmed values come from real estimates (transport = all transport/overhead lines of
 * a full 8×4–10×5 job); the rest use their zone's value and are shown with a wider range.
 */
export const DEFAULT_PLACES: Place[] = [
  abs('merdekan', 'Mərdəkan', 'Mardakan', 'Мардакян', true, { transport: 1230, pump: 250, truck: 50 }),
  abs('buzovna', 'Buzovna', 'Buzovna', 'Бузовна', true, { transport: 1150, pump: 200, truck: 60 }),
  abs('bilgeh', 'Bilgəh', 'Bilgah', 'Бильгя'),
  abs('shuvelan', 'Şüvəlan', 'Shuvalan', 'Шувеляны'),
  abs('nardaran', 'Nardaran', 'Nardaran', 'Нардаран'),
  abs('pirshagi', 'Pirşağı', 'Pirshagi', 'Пиршаги'),
  abs('zagulba', 'Zağulba', 'Zagulba', 'Загульба'),
  abs('turkan', 'Türkan', 'Turkan', 'Тюркян'),
  abs('qala', 'Qala', 'Gala', 'Гала'),
  abs('mashtaga', 'Maştağa', 'Mashtaga', 'Маштага'),
  abs('goradil', 'Goradil', 'Goradil', 'Горадиль'),
  abs('fatmayi', 'Fatmayı', 'Fatmai', 'Фатмаи'),
  city('badamdar', 'Badamdar', 'Badamdar', 'Бадамдар', true, { transport: 1590, pump: 500, truck: 120 }),
  city('shixov', 'Şıxov', 'Shikhov', 'Шихово', true, { transport: 1800, pump: 500, truck: 125 }),
  city('baku', 'Bakı şəhəri', 'Baku city', 'город Баку'),
  west('novxani', 'Novxanı', 'Novkhani', 'Новханы', true, { transport: 1800, pump: 900, truck: 75 }),
  west('jorat', 'Corat', 'Jorat', 'Джорат'),
  west('sumqayit', 'Sumqayıt', 'Sumgait', 'Сумгаит'),
  reg('quba', 'Quba', 'Guba', 'Губа', true, { transport: 2660, pump: 250, truck: 95 }),
  reg('qusar', 'Qusar', 'Gusar', 'Гусар'),
  reg('qebele', 'Qəbələ', 'Gabala', 'Габала'),
  reg('shamaxi', 'Şamaxı', 'Shamakhi', 'Шемаха'),
  reg('ismayilli', 'İsmayıllı', 'Ismayilli', 'Исмаиллы'),
  reg('lenkeran', 'Lənkəran', 'Lankaran', 'Ленкорань'),
]

/** Fallback for a place the client types in themselves. */
export const OTHER_PLACE: Omit<Place, 'key' | 'name'> = { zone: 'other', transport: 2200, pump: 450, truck: 95, confirmed: false }

/** Extras (AZN). Equal min/max = exact price from the estimates. */
export const DEFAULT_EXTRAS: Extra[] = [
  { key: 'jetstream', name: t('Jetstream (əks axın) sistemi', 'Jetstream (counter-current) system', 'Система противотока Jetstream'), min: 4050, max: 4050 },
  { key: 'waterfall', name: t('Şəlalə (paslanmaz 304)', 'Waterfall (stainless 304)', 'Водопад (нерж. 304)'), min: 1100, max: 1450 },
  { key: 'heating', name: t('İsitmə (eşenjor + bağlantılar)', 'Heating (heat exchanger + connections)', 'Подогрев (теплообменник + обвязка)'), min: 1250, max: 1950 },
  { key: 'dosing', name: t('Avtomatik dozaj (pH / xlor)', 'Automatic dosing (pH / chlorine)', 'Автоматическое дозирование (pH / хлор)'), min: 3500, max: 3500 },
  { key: 'salt', name: t('Duz elektroliz (xlorinator)', 'Salt chlorinator', 'Солевой хлоринатор'), min: 2500, max: 6800 },
  { key: 'uv', name: t('UV dezinfeksiya sistemi', 'UV disinfection system', 'УФ-дезинфекция'), min: 4700, max: 4700 },
  { key: 'led_remote', name: t('Rəngli LED idarəetmə pultu', 'Colour LED remote control', 'Пульт управления цветной подсветкой'), min: 240, max: 240 },
]

/** Standard finish when the client picks none: Uzbek glass mosaic (estimate median). */
export const STANDARD_MOSAIC = { id: 'standard', name: 'Standart şüşə mozaika (2.5×2.5)', price: 20, kind: 'mosaic' as const }
