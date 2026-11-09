import turan from '../../seed/data/turan.json'
import type { ContentEntry, Loc } from '../types'
import { PROJECTS } from './data'
import { KINDS } from './types'

const LOCS: Loc[] = ['az', 'en', 'ru']
const pre = (l: Loc) => (l === 'az' ? '' : `/${l}`)

const T = {
  scope: { az: 'Görülən işlər', en: 'Scope of work', ru: 'Выполненные работы' },
  tech: { az: 'Texniki həll', en: 'Technical solution', ru: 'Техническое решение' },
  result: { az: 'Nəticə', en: 'Result', ru: 'Результат' },
  related: { az: 'Oxşar layihələr', en: 'Related projects', ru: 'Похожие проекты' },
  days: { az: 'gün', en: 'days', ru: 'дней' },
  done: {
    az: (what: string, size: string, days: number, place: string) => `${place} – ${size} ölçülü obyekt (${what.charAt(0).toLowerCase() + what.slice(1)}) layihədən təhvilə qədər <strong>${days} gündə</strong> tamamlandı. Bütün işləri – layihə, tikinti, avadanlıq quraşdırılması və sınaq – Complex MMC komandası bir müqavilə ilə yerinə yetirdi.`,
    en: (what: string, size: string, days: number, place: string) => `${place} – the ${size} project (${what.charAt(0).toLowerCase() + what.slice(1)}) was completed from design to handover in <strong>${days} days</strong>. Design, construction, equipment installation and testing were all carried out by the Complex MMC team under one contract.`,
    ru: (what: string, size: string, days: number, place: string) => `${place} — объект размером ${size} (${what.charAt(0).toLowerCase() + what.slice(1)}) выполнен от проекта до сдачи за <strong>${days} дней</strong>. Проектирование, строительство, монтаж оборудования и испытания выполнила команда Complex MMC по одному договору.`,
  },
  more: { az: 'Bu növ layihələr haqqında ətraflı', en: 'More about this type of project', ru: 'Подробнее о таких проектах' },
  cta: {
    az: `Oxşar layihə planlaşdırırsınız? <a href="/contact">Pulsuz baxış üçün bizə yazın</a> və ya <a href="/qiymet-hesabla">qiymət təklifi alın</a>.`,
    en: `Planning a similar project? <a href="/en/contact">Book a free site visit</a> or <a href="/en/price-calculator">get a quote</a>.`,
    ru: `Планируете похожий проект? <a href="/ru/contact">Запишитесь на бесплатный выезд</a> или <a href="/ru/kalkulyator-stoimosti">получите расчёт</a>.`,
  },
}

/** Meta description candidates; the first one within 140–155 chars wins. */
function metaDescription(l: Loc, what: string, place: string, size: string, days: number) {
  const base = {
    az: `${what}: ${place}, ${size}, ${days} gündə təhvil. Complex MMC layihələndirib və tikib.`,
    en: `${what}: ${place}, ${size}, handed over in ${days} days. Designed and built by Complex MMC.`,
    ru: `${what}: ${place}, ${size}, сдан за ${days} дней. Проект и строительство — Complex MMC.`,
  }[l]
  const ctas = {
    az: [' Oxşar layihə üçün pulsuz baxış istəyin.', ' Oxşar layihə üçün bizə yazın.', ' Pulsuz baxış istəyin.', ' Bizə yazın.', ''],
    en: [' Book a free site visit for a similar project.', ' Ask us about a similar project.', ' Book a free site visit.', ' Contact us.', ''],
    ru: [' Запишитесь на бесплатный выезд для похожего проекта.', ' Напишите нам о похожем проекте.', ' Бесплатный выезд.', ' Пишите нам.', ''],
  }[l]
  const options = ctas.map((c) => base + c)
  return options.find((o) => o.length >= 140 && o.length <= 155) ?? options.find((o) => o.length <= 155) ?? base.slice(0, 155)
}

type TuranDoc = { az: string; locales: Partial<Record<Loc, { bodyHtml?: string }>> }
const migrated = (slug: string, l: Loc) => {
  const d = (turan.docs as unknown as TuranDoc[]).find((x) => x.az === `/projects/${slug}`)
  const html = (d?.locales[l]?.bodyHtml ?? d?.locales.az?.bodyHtml ?? '').trim()
  return html.startsWith('<') ? html : html ? `<p>${html}</p>` : ''
}

export const projectEntries: ContentEntry[] = PROJECTS.map((p0) => {
  const k = KINDS[p0.kind]
  return {
    collection: 'projects',
    slug: p0.slug,
    locales: Object.fromEntries(
      LOCS.map((l) => {
        // RU uses Cyrillic units: 6×5 m -> 6×5 м
        const p = l === 'ru' ? { ...p0, size: p0.size.replace(/ m$/, ' м') } : p0
        const related = (p.related ?? [])
          .map((s) => PROJECTS.find((x) => x.slug === s))
          .filter(Boolean)
          .map((r) => `<li><a href="${pre(l)}/projects/${r!.slug}">${r!.title[l]}</a></li>`)
          .join('')
        const html = [
          migrated(p.slug, l),
          p.extra ? `<p>${p.extra[l]}</p>` : '',
          `<h2>${T.scope[l]}</h2><ul>${k.scope[l].map((s) => `<li>${s}</li>`).join('')}</ul>`,
          `<h2>${T.tech[l]}</h2><p>${k.tech[l]}</p>`,
          `<h2>${T.result[l]}</h2><p>${T.done[l](p.what[l], p.size, p.days, p.place[l])}</p>`,
          related ? `<h2>${T.related[l]}</h2><ul>${related}</ul>` : '',
          `<p>${T.more[l]}: <a href="${k.pillar[l]}">${k.pillarLabel[l]}</a>. ${T.cta[l]}</p>`,
        ].join('\n')
        return [
          l,
          {
            metaTitle: p.title[l],
            metaDescription: metaDescription(l, p.what[l], p.place[l], p.size, p.days),
            excerpt: `${p.what[l]} – ${p.place[l]}, ${p.size}, ${p.days} ${T.days[l]}.`,
            html,
          },
        ]
      }),
    ),
  }
})
