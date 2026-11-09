/** Hand-made mappings that the old site only had in client-side code. Editable later in admin. */

type L3 = { az: string; en: string; ru: string }

/** Pillar pages -> icon-strip short names + built-in icon key. Order = strip order. */
export const categoryMeta: Record<string, { short: L3; icon: string; order: number }> = {
  'hovuz-tikintisi': { short: { az: 'Hovuz', en: 'Pools', ru: 'Бассейны' }, icon: 'pool', order: 1 },
  'infinity-hovuz-tikintisi': { short: { az: 'Infinity hovuz', en: 'Infinity pool', ru: 'Инфинити бассейн' }, icon: 'infinity', order: 2 },
  'villa-hovuzu-tikintisi': { short: { az: 'Villa hovuzu', en: 'Villa pool', ru: 'Бассейн для виллы' }, icon: 'villa', order: 3 },
  'sauna-tikintisi-baki': { short: { az: 'Sauna', en: 'Sauna', ru: 'Сауна' }, icon: 'sauna', order: 4 },
  'turk-hamami-tikintisi-baki': { short: { az: 'Türk hamamı', en: 'Turkish hammam', ru: 'Турецкий хамам' }, icon: 'hammam', order: 5 },
  'rus-hamami-tikintisi-baki': { short: { az: 'Rus hamamı', en: 'Russian banya', ru: 'Русская баня' }, icon: 'banya', order: 6 },
  'buxar-otagi-tikintisi': { short: { az: 'Buxar otağı', en: 'Steam room', ru: 'Паровая' }, icon: 'steam', order: 7 },
  'spa-tikintisi-baki': { short: { az: 'SPA', en: 'SPA', ru: 'СПА' }, icon: 'spa', order: 8 },
  'fitnes-zali-tikintisi': { short: { az: 'Fitnes zalı', en: 'Fitness club', ru: 'Фитнес-клуб' }, icon: 'fitness', order: 9 },
}

/** Project slug -> AZ project-category tab name (old site's filter, counts match: 3/2/3/2/5/5/1). */
const PROJECT_CATS: Record<string, string> = {
  bilgeh: 'Infinity Hovuz',
  badamdar: 'Infinity Hovuz',
  'villa-badam': 'Villa Hovuzu',
  goradil: 'Villa Hovuzu',
  'buzovna-hovuz': 'Villa Hovuzu',
  'hyatt-pool': 'İctimai Hovuz',
  'makfit-hovuz': 'İctimai Hovuz',
  'myclass-hovuz': 'İctimai Hovuz',
  'crown-saunaa': 'Sauna',
  'myclass-sauna': 'Sauna',
  'crown-turk': 'Türk Hamamı',
  'myclass-hamam': 'Türk Hamamı',
  'crown-kise': 'Türk Hamamı',
  'myclass-kise': 'Türk Hamamı',
  'crown-rus': 'Türk Hamamı',
  'crown-buz': 'SPA',
  'crown-buxar': 'SPA',
  'myclass-buxar': 'SPA',
  'myclass-masaj': 'SPA',
  'myclass-cakuzi': 'SPA',
  'myclass-duzotagi': 'Duz Otağı',
}
export const projectCategoryOf = (slug: string) => PROJECT_CATS[slug]

/** Service slug or project-category name -> pillar category slug. */
export function serviceCategoryOf(key: string): string {
  const k = key.toLowerCase()
  if (k.includes('infinity')) return 'infinity-hovuz-tikintisi'
  if (k.includes('villa')) return 'villa-hovuzu-tikintisi'
  if (k.includes('sauna')) return 'sauna-tikintisi-baki'
  if (k.includes('türk') || k.includes('hamam')) return 'turk-hamami-tikintisi-baki'
  if (k.includes('rus')) return 'rus-hamami-tikintisi-baki'
  if (k.includes('buxar')) return 'buxar-otagi-tikintisi'
  if (k.includes('spa') || k.includes('duz') || k.includes('wellness')) return 'spa-tikintisi-baki'
  return 'hovuz-tikintisi'
}

/** Placeholder team — the user will replace names/photos in admin. Team page is noindex until then. */
export const teamPlaceholders: { name: string; position: L3; bio: L3 }[] = [
  {
    name: 'Rauf Əliyev',
    position: { az: 'Baş direktor', en: 'General Director', ru: 'Генеральный директор' },
    bio: { az: 'Nümunə məlumat — admin paneldən dəyişin.', en: 'Placeholder — edit in admin.', ru: 'Пример — измените в админ-панели.' },
  },
  {
    name: 'Nigar Hüseynova',
    position: { az: 'Baş memar', en: 'Lead Architect', ru: 'Главный архитектор' },
    bio: { az: 'Nümunə məlumat — admin paneldən dəyişin.', en: 'Placeholder — edit in admin.', ru: 'Пример — измените в админ-панели.' },
  },
  {
    name: 'Elvin Məmmədov',
    position: { az: 'Layihə rəhbəri', en: 'Project Manager', ru: 'Руководитель проектов' },
    bio: { az: 'Nümunə məlumat — admin paneldən dəyişin.', en: 'Placeholder — edit in admin.', ru: 'Пример — измените в админ-панели.' },
  },
  {
    name: 'Kamran Quliyev',
    position: { az: 'Hidravlika mühəndisi', en: 'Hydraulic Engineer', ru: 'Инженер-гидравлик' },
    bio: { az: 'Nümunə məlumat — admin paneldən dəyişin.', en: 'Placeholder — edit in admin.', ru: 'Пример — измените в админ-панели.' },
  },
  {
    name: 'Aysel Rzayeva',
    position: { az: 'Müştəri əlaqələri meneceri', en: 'Client Relations Manager', ru: 'Менеджер по работе с клиентами' },
    bio: { az: 'Nümunə məlumat — admin paneldən dəyişin.', en: 'Placeholder — edit in admin.', ru: 'Пример — измените в админ-панели.' },
  },
  {
    name: 'Tural Babayev',
    position: { az: 'Sahə rəisi', en: 'Site Supervisor', ru: 'Начальник участка' },
    bio: { az: 'Nümunə məlumat — admin paneldən dəyişin.', en: 'Placeholder — edit in admin.', ru: 'Пример — измените в админ-панели.' },
  },
]
