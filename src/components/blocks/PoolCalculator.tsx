'use client'

import Image from 'next/image'
import { type FormEvent, useMemo, useState } from 'react'

import { ButtonContent, buttonClass, cx, FIELD, FIELD_LABEL } from '@/components/ui/primitives'
import type { Locale } from '@/i18n/config'
import { ITEM_LABELS, STANDARD_MOSAIC } from '@/lib/estimate/defaults'
import { computeEstimate, placeFor } from '@/lib/estimate/model'
import type { EstimateConfig, Finish, Pack, PoolType, Scope, Section } from '@/lib/estimate/types'

export type MosaicOption = { id: string; name: string; brand: string; image?: string | null; href?: string | null; variants: { label: string; price: number }[] }

const T = {
  az: {
    size: 'Hovuzun ölçüləri', length: 'Uzunluq (m)', width: 'En (m)', depth: 'Dərinlik (m)',
    type: 'Hovuz növü', overflow: 'Daşma (overflow)', skimmer: 'Skimmer',
    scope: 'İşin həcmi', full: 'Tam tikinti (beton daxil)', finish: 'Hazır beton üzərində (bəzək + texniki)',
    pack: 'Paket', standard: 'Standart', premium: 'Premium',
    packNote: { standard: 'Türkiyə avadanlığı (Atlaspool), 30×60 tutmaq, standart LED', premium: 'Premium jetlər, güclü LED, 35×120 tutmaq, gücləndirilmiş nasoslar' },
    place: 'Obyektin yeri', placePh: 'Yeri seçin', other: 'Siyahıda yoxdur — özüm yazım', otherPh: 'Kənd / rayon adı',
    zones: { absheron: 'Abşeron', baku: 'Bakı şəhəri', west: 'Novxanı, Sumqayıt', regions: 'Regionlar' } as Record<string, string>,
    finishTitle: 'Üzlük (mozaika)', standardMosaic: 'Standart şüşə mozaika', perM2: '/m²', allBrands: 'Hamısı', viewProduct: 'Məhsula bax', sizeLabel: 'Ölçü',
    extras: 'Əlavələr',
    result: 'Təxmini qiymət', from: 'dən', geometry: 'Su səthi', volume: 'Həcm', surface: 'Üzlük sahəsi',
    sections: { structure: 'Beton konstruksiya', finish: 'Bəzək işləri', technical: 'Texniki (filtrasiya, işıq)', logistics: 'Nəqliyyat və köməkçi xərclər', extras: 'Əlavələr' } as Record<Section, string>,
    details: 'Ətraflı smeta', hideDetails: 'Smetanı gizlət', qty: 'Miqdar', price: 'Qiymət', total: 'Cəm',
    approxPlace: 'Bu ərazi üçün nəqliyyat xərcləri təxminidir — dəqiq rəqəm baxışdan sonra verilir.',
    contact: 'Dəqiq smeta alın', name: 'Adınız', phone: 'Telefon', email: 'E-poçt (istəyə görə)', note: 'Əlavə qeyd',
    send: 'Pulsuz baxış və dəqiq smeta istəyirəm', sending: 'Göndərilir…', sent: 'Təşəkkür edirik! Mütəxəssisimiz tezliklə sizinlə əlaqə saxlayacaq.', error: 'Göndərmək alınmadı. Zəhmət olmasa telefonla əlaqə saxlayın.',
    leadOnly: 'Seçimlərinizi göndərin — mütəxəssisimiz qiyməti hesablayıb sizinlə əlaqə saxlayacaq.',
  },
  en: {
    size: 'Pool dimensions', length: 'Length (m)', width: 'Width (m)', depth: 'Depth (m)',
    type: 'Pool type', overflow: 'Overflow', skimmer: 'Skimmer',
    scope: 'Scope of work', full: 'Full build (with concrete shell)', finish: 'On an existing shell (finishing + equipment)',
    pack: 'Package', standard: 'Standard', premium: 'Premium',
    packNote: { standard: 'Turkish equipment (Atlaspool), 30×60 coping, standard LED', premium: 'Premium jets, stronger LED, 35×120 coping, upgraded pumps' },
    place: 'Project location', placePh: 'Select location', other: 'Not listed — I will type it', otherPh: 'Village / district',
    zones: { absheron: 'Absheron', baku: 'Baku city', west: 'Novkhani, Sumgait', regions: 'Regions' } as Record<string, string>,
    finishTitle: 'Finish (mosaic)', standardMosaic: 'Standard glass mosaic', perM2: '/m²', allBrands: 'All', viewProduct: 'View product', sizeLabel: 'Size',
    extras: 'Extras',
    result: 'Estimated price', from: '', geometry: 'Water surface', volume: 'Volume', surface: 'Finish area',
    sections: { structure: 'Concrete structure', finish: 'Finishing works', technical: 'Equipment (filtration, lighting)', logistics: 'Transport and site costs', extras: 'Extras' } as Record<Section, string>,
    details: 'Detailed estimate', hideDetails: 'Hide estimate', qty: 'Qty', price: 'Price', total: 'Total',
    approxPlace: 'Transport costs for this location are approximate — the exact figure follows the site visit.',
    contact: 'Get an exact estimate', name: 'Your name', phone: 'Phone', email: 'E-mail (optional)', note: 'Notes',
    send: 'Request a free site visit and exact estimate', sending: 'Sending…', sent: 'Thank you! Our specialist will contact you shortly.', error: 'Sending failed. Please call us instead.',
    leadOnly: 'Send your choices — our specialist will calculate the price and contact you.',
  },
  ru: {
    size: 'Размеры бассейна', length: 'Длина (м)', width: 'Ширина (м)', depth: 'Глубина (м)',
    type: 'Тип бассейна', overflow: 'Переливной', skimmer: 'Скиммерный',
    scope: 'Объём работ', full: 'Полное строительство (с бетонной чашей)', finish: 'По готовой чаше (отделка + оборудование)',
    pack: 'Пакет', standard: 'Стандарт', premium: 'Премиум',
    packNote: { standard: 'Турецкое оборудование (Atlaspool), борт 30×60, стандартный LED', premium: 'Премиальные форсунки, мощный LED, борт 35×120, усиленные насосы' },
    place: 'Расположение объекта', placePh: 'Выберите место', other: 'Нет в списке — укажу сам', otherPh: 'Посёлок / район',
    zones: { absheron: 'Абшерон', baku: 'Город Баку', west: 'Новханы, Сумгаит', regions: 'Регионы' } as Record<string, string>,
    finishTitle: 'Облицовка (мозаика)', standardMosaic: 'Стандартная стеклянная мозаика', perM2: '/м²', allBrands: 'Все', viewProduct: 'Смотреть товар', sizeLabel: 'Размер',
    extras: 'Дополнительно',
    result: 'Ориентировочная цена', from: '', geometry: 'Площадь воды', volume: 'Объём', surface: 'Площадь облицовки',
    sections: { structure: 'Бетонная конструкция', finish: 'Отделочные работы', technical: 'Оборудование (фильтрация, свет)', logistics: 'Транспорт и сопутствующие расходы', extras: 'Дополнительно' } as Record<Section, string>,
    details: 'Подробная смета', hideDetails: 'Скрыть смету', qty: 'Кол-во', price: 'Цена', total: 'Сумма',
    approxPlace: 'Транспортные расходы для этого места ориентировочные — точная цифра после выезда.',
    contact: 'Получить точную смету', name: 'Ваше имя', phone: 'Телефон', email: 'E-mail (необязательно)', note: 'Комментарий',
    send: 'Хочу бесплатный выезд и точную смету', sending: 'Отправка…', sent: 'Спасибо! Наш специалист скоро свяжется с вами.', error: 'Не удалось отправить. Пожалуйста, позвоните нам.',
    leadOnly: 'Отправьте ваш выбор — специалист рассчитает цену и свяжется с вами.',
  },
}

// AZ uses space-grouped numbers like RU ("29 280"); browsers' az locale data is inconsistent
const INTL: Record<Locale, string> = { az: 'ru-RU', en: 'en-GB', ru: 'ru-RU' }
const field = cx(FIELD, 'h-12')
const label = cx(FIELD_LABEL, 'mb-2 block')
const pill = (on: boolean) => `inline-flex h-10 items-center rounded-full border px-4 text-sm font-medium transition-colors duration-[var(--duration-fast)] ${on ? 'border-heading bg-heading text-white' : 'border-border bg-white text-heading hover:border-heading/30'}`

/**
 * Pool cost calculator (template "Cost Estimator" layout): configuration on the left,
 * live price range + section totals + detailed estimate on the right, lead form at the end.
 */
export function PoolCalculator({
  locale,
  config,
  mosaics,
  mode,
  defaultDepth,
  disclaimer,
  formId,
}: {
  locale: Locale
  config: EstimateConfig
  mosaics: MosaicOption[]
  mode: 'price' | 'lead'
  defaultDepth: number
  disclaimer?: string | null
  formId?: number | string
}) {
  const t = T[locale]
  const nf = useMemo(() => new Intl.NumberFormat(INTL[locale], { maximumFractionDigits: 0 }), [locale])
  const nf2 = useMemo(() => new Intl.NumberFormat(INTL[locale], { maximumFractionDigits: 2 }), [locale])
  const money = (n: number) => `${nf.format(n)} ₼`

  const [length, setLength] = useState('8')
  const [width, setWidth] = useState('4')
  const [depth, setDepth] = useState(String(defaultDepth))
  const [type, setType] = useState<PoolType>('overflow')
  const [scope, setScope] = useState<Scope>('full')
  const [pack, setPack] = useState<Pack>('standard')
  const [placeKey, setPlaceKey] = useState<string>('')
  const [otherPlace, setOtherPlace] = useState('')
  const [mosaicId, setMosaicId] = useState<string>(STANDARD_MOSAIC.id)
  const [variantIdx, setVariantIdx] = useState(0)
  const [brand, setBrand] = useState<string>('')
  const [extras, setExtras] = useState<string[]>([])
  const [showDetails, setShowDetails] = useState(false)
  const [state, setState] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')

  const mosaic = mosaics.find((m) => m.id === mosaicId)
  const finish: Finish = mosaic
    ? { id: mosaic.id, name: `${mosaic.name} (${mosaic.variants[variantIdx]?.label ?? ''})`, price: mosaic.variants[variantIdx]?.price ?? mosaic.variants[0].price, kind: 'mosaic', image: mosaic.image }
    : { ...STANDARD_MOSAIC, name: t.standardMosaic }
  const num = (s: string) => Number(String(s).replace(',', '.'))
  const ready = num(length) > 0 && num(width) > 0 && num(depth) > 0 && (placeKey !== '' || otherPlace.trim() !== '')
  const effectivePlace = placeKey === '__other' || placeKey === '' ? null : placeKey
  const result = useMemo(
    () => computeEstimate({ length: num(length) || 0, width: num(width) || 0, depth: num(depth) || defaultDepth, type, scope, pack, placeKey: effectivePlace, finish, extras }, config),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [length, width, depth, type, scope, pack, effectivePlace, finish.price, finish.kind, extras, config],
  )
  const place = placeFor(config, effectivePlace)
  const zones = [...new Set(config.places.map((p) => p.zone))]
  const brands = [...new Set(mosaics.map((m) => m.brand))]

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const fd = new FormData(e.currentTarget)
    if (fd.get('website') || !formId) return
    const placeName = effectivePlace ? place.name[locale] : otherPlace
    const summary = [
      `${t.size}: ${length} × ${width} × ${depth} m`,
      `${t.type}: ${type === 'overflow' ? t.overflow : t.skimmer}`,
      `${t.scope}: ${scope === 'full' ? t.full : t.finish}`,
      `${t.pack}: ${pack === 'premium' ? t.premium : t.standard}`,
      `${t.place}: ${placeName}`,
      `${t.finishTitle}: ${finish.name} — ${finish.price} ₼/m²`,
      extras.length ? `${t.extras}: ${extras.map((k) => config.extras.find((x) => x.key === k)?.name[locale] ?? k).join(', ')}` : '',
      mode === 'price' ? `${t.result}: ${money(result.min)} – ${money(result.max)}` : '',
      String(fd.get('note') ?? '').trim() ? `${t.note}: ${String(fd.get('note')).trim()}` : '',
    ]
      .filter(Boolean)
      .join('\n')
    setState('sending')
    try {
      const res = await fetch('/api/form-submissions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          form: formId,
          submissionData: [
            { field: 'name', value: String(fd.get('name') ?? '') },
            { field: 'phone', value: String(fd.get('phone') ?? '') },
            { field: 'email', value: String(fd.get('email') ?? '') },
            { field: 'message', value: summary },
            { field: 'page', value: window.location.pathname },
            // marks the request as a price quote in admin → Müraciətlər
            { field: 'kind', value: 'quote' },
          ],
        }),
      })
      setState(res.ok ? 'sent' : 'error')
    } catch {
      setState('error')
    }
  }

  const sectionOrder: Section[] = ['structure', 'finish', 'technical', 'logistics', 'extras']

  return (
    <div className="flex flex-col gap-[45px] lg:flex-row lg:items-start">
      {/* ------------------------------------------------------------------ configuration */}
      <form onSubmit={onSubmit} className="min-w-0 flex-1 rounded-[var(--radius-card)] bg-soft px-6 pt-5 pb-10 md:px-10 lg:max-w-[856px]">
        <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
        <div className="flex flex-col gap-[30px] pt-[30px]">
          <fieldset>
            <legend className={label}>{t.size}</legend>
            <div className="grid grid-cols-3 gap-3 md:gap-[30px]">
              {(
                [
                  [t.length, length, setLength, 2, 50],
                  [t.width, width, setWidth, 1.5, 30],
                  [t.depth, depth, setDepth, 0.6, 3],
                ] as const
              ).map(([lbl, v, set, min, max]) => (
                <label key={lbl} className="block">
                  <span className="mb-1 block text-sm text-text">{lbl}</span>
                  <input type="number" inputMode="decimal" step="0.1" min={min} max={max} value={v} onChange={(e) => set(e.target.value)} className={field} required />
                </label>
              ))}
            </div>
          </fieldset>

          <fieldset>
            <legend className={label}>{t.type}</legend>
            <div className="flex flex-wrap gap-2.5">
              {(['overflow', 'skimmer'] as const).map((k) => (
                <button key={k} type="button" aria-pressed={type === k} onClick={() => setType(k)} className={pill(type === k)}>
                  {t[k]}
                </button>
              ))}
            </div>
          </fieldset>

          <fieldset>
            <legend className={label}>{t.scope}</legend>
            <div className="flex flex-wrap gap-2.5">
              {(['full', 'finish'] as const).map((k) => (
                <button key={k} type="button" aria-pressed={scope === k} onClick={() => setScope(k)} className={pill(scope === k)}>
                  {t[k]}
                </button>
              ))}
            </div>
          </fieldset>

          <fieldset>
            <legend className={label}>{t.pack}</legend>
            <div className="grid gap-2.5 sm:grid-cols-2">
              {(['standard', 'premium'] as const).map((k) => (
                <button key={k} type="button" aria-pressed={pack === k} onClick={() => setPack(k)} className={`rounded-[var(--radius-media)] border p-4 text-left transition-colors ${pack === k ? 'border-primary bg-white ring-2 ring-primary' : 'border-border bg-white hover:border-primary'}`}>
                  <span className="block font-display text-h4 text-heading">{t[k]}</span>
                  <span className="mt-1 block text-sm">{t.packNote[k]}</span>
                </button>
              ))}
            </div>
          </fieldset>

          <div>
            <label htmlFor="calc-place" className={label}>
              {t.place}
            </label>
            <select id="calc-place" value={placeKey} onChange={(e) => setPlaceKey(e.target.value)} className={field} required>
              <option value="" disabled>
                {t.placePh}
              </option>
              {zones.map((z) => (
                <optgroup key={z} label={t.zones[z] ?? z}>
                  {config.places
                    .filter((p) => p.zone === z)
                    .map((p) => (
                      <option key={p.key} value={p.key}>
                        {p.name[locale]}
                      </option>
                    ))}
                </optgroup>
              ))}
              <option value="__other">{t.other}</option>
            </select>
            {placeKey === '__other' && <input value={otherPlace} onChange={(e) => setOtherPlace(e.target.value)} placeholder={t.otherPh} aria-label={t.otherPh} className={`${field} mt-3`} required />}
          </div>

          {/* mosaic picker */}
          <fieldset>
            <legend className={label}>{t.finishTitle}</legend>
            {brands.length > 1 && (
              <div className="mb-4 flex flex-wrap gap-2.5" role="group">
                {['', ...brands].map((b) => (
                  <button key={b || 'all'} type="button" aria-pressed={brand === b} onClick={() => setBrand(b)} className={`inline-flex h-9 items-center rounded-full px-3.5 text-sm font-medium transition-colors ${brand === b ? 'bg-heading text-white' : 'text-text hover:bg-soft'}`}>
                    {b || t.allBrands}
                  </button>
                ))}
              </div>
            )}
            <ul className="grid max-h-[520px] grid-cols-2 gap-3 overflow-y-auto pr-1 sm:grid-cols-3 md:grid-cols-4">
              <li>
                <button type="button" aria-pressed={mosaicId === STANDARD_MOSAIC.id} onClick={() => setMosaicId(STANDARD_MOSAIC.id)} className={`h-full w-full overflow-hidden rounded-[var(--radius-sm)] border bg-white text-left transition-colors ${mosaicId === STANDARD_MOSAIC.id ? 'border-primary ring-2 ring-primary' : 'border-border hover:border-primary'}`}>
                  <span
                    className="block aspect-[16/9]"
                    aria-hidden="true"
                    style={{ backgroundColor: '#3ccfe0', backgroundImage: 'linear-gradient(90deg, rgba(255,255,255,.7) 1px, transparent 1px), linear-gradient(rgba(255,255,255,.7) 1px, transparent 1px)', backgroundSize: '12px 12px' }}
                  />
                  <span className="block p-2.5 text-sm leading-[18px] font-semibold text-heading">{t.standardMosaic}</span>
                  <span className="block px-2.5 pb-2.5 text-sm">
                    {STANDARD_MOSAIC.price} ₼{t.perM2}
                  </span>
                </button>
              </li>
              {mosaics
                .filter((m) => !brand || m.brand === brand)
                .map((m) => {
                  const on = mosaicId === m.id
                  return (
                    <li key={m.id}>
                      <button
                        type="button"
                        aria-pressed={on}
                        onClick={() => {
                          setMosaicId(m.id)
                          setVariantIdx(0)
                        }}
                        className={`h-full w-full overflow-hidden rounded-[var(--radius-sm)] border bg-white text-left transition-colors ${on ? 'border-primary ring-2 ring-primary' : 'border-border hover:border-primary'}`}
                      >
                        <span className="relative block aspect-[16/9] bg-soft">{m.image && <Image src={m.image} alt={m.name} fill sizes="200px" className="object-cover" />}</span>
                        <span className="block p-2.5 text-sm leading-[18px] font-semibold text-heading">{m.name}</span>
                        <span className="block px-2.5 pb-2.5 text-sm">
                          {nf2.format(Math.min(...m.variants.map((v) => v.price)))} ₼{t.perM2}
                        </span>
                      </button>
                    </li>
                  )
                })}
            </ul>
            {mosaic && (
              <div className="mt-4 flex flex-wrap items-center gap-3 rounded-[var(--radius-sm)] bg-white p-3">
                <span className="text-sm font-semibold text-heading">{mosaic.name}</span>
                {mosaic.variants.length > 1 && (
                  <label className="flex items-center gap-2 text-sm">
                    {t.sizeLabel}
                    <select value={variantIdx} onChange={(e) => setVariantIdx(Number(e.target.value))} className="h-9 rounded-[6px] border border-border px-2">
                      {mosaic.variants.map((v, i) => (
                        <option key={v.label} value={i}>
                          {v.label} — {nf2.format(v.price)} ₼{t.perM2}
                        </option>
                      ))}
                    </select>
                  </label>
                )}
                {mosaic.href && (
                  <a href={mosaic.href} target="_blank" rel="noopener" className="text-sm font-semibold text-[var(--color-primary-strong)] hover:underline">
                    {t.viewProduct} →
                  </a>
                )}
              </div>
            )}
          </fieldset>

          <fieldset>
            <legend className={label}>{t.extras}</legend>
            <div className="grid gap-x-[30px] gap-y-2.5 sm:grid-cols-2">
              {config.extras.map((x) => (
                <label key={x.key} className="flex cursor-pointer items-start gap-2.5 leading-5">
                  <input type="checkbox" checked={extras.includes(x.key)} onChange={(e) => setExtras((cur) => (e.target.checked ? [...cur, x.key] : cur.filter((k) => k !== x.key)))} className="mt-1 size-4 shrink-0 accent-primary" />
                  <span>
                    {x.name[locale]}
                    {mode === 'price' && <span className="block text-sm text-text">{x.min === x.max ? money(x.min) : `${money(x.min)} – ${money(x.max)}`}</span>}
                  </span>
                </label>
              ))}
            </div>
          </fieldset>

          {/* lead */}
          <div className="border-t border-border pt-[30px]">
            <p className="mb-4 text-h3 font-display text-heading">{t.contact}</p>
            {state === 'sent' ? (
              <p role="status" className="rounded-[var(--radius-sm)] bg-white p-6 font-semibold text-heading">
                {t.sent}
              </p>
            ) : (
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <input name="name" required placeholder={t.name} aria-label={t.name} autoComplete="name" className={field} />
                <input name="phone" type="tel" required placeholder={t.phone} aria-label={t.phone} autoComplete="tel" className={field} />
                <input name="email" type="email" placeholder={t.email} aria-label={t.email} autoComplete="email" className={`${field} md:col-span-2`} />
                <textarea name="note" placeholder={t.note} aria-label={t.note} className={cx(FIELD, 'h-[100px] resize-y py-3 md:col-span-2')} />
                <div className="md:col-span-2">
                  <button type="submit" disabled={state === 'sending' || !ready} className={buttonClass('primary')}>
                    <ButtonContent>{state === 'sending' ? t.sending : t.send}</ButtonContent>
                  </button>
                  {state === 'error' && (
                    <p role="alert" className="mt-3 text-sm text-red-700">
                      {t.error}
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </form>

      {/* ------------------------------------------------------------------ result */}
      <aside className="w-full shrink-0 rounded-[var(--radius-card)] bg-dark p-8 text-white lg:sticky lg:top-[110px] lg:w-[403px] md:p-10" aria-live="polite">
        <p className="sh-eyebrow mb-4 inline-flex items-center gap-2 text-label text-primary uppercase">
          {t.result}
          <span aria-hidden="true" className="inline-block h-px w-5 bg-[var(--section-eyebrow)]" />
        </p>
        {mode === 'price' ? (
          <>
            <p className="font-display text-h2">
              {ready ? (
                <>
                  {money(result.min)}
                  <span className="block text-xl text-white/70">– {money(result.max)}</span>
                </>
              ) : (
                <span className="text-xl text-white/70">{t.placePh}</span>
              )}
            </p>
            <dl className="mt-5 grid grid-cols-3 gap-2 text-sm text-white/70">
              <div>
                <dt>{t.geometry}</dt>
                <dd className="font-semibold text-white">{nf2.format(result.geometry.area)} m²</dd>
              </div>
              <div>
                <dt>{t.volume}</dt>
                <dd className="font-semibold text-white">{nf2.format(result.geometry.volume)} m³</dd>
              </div>
              <div>
                <dt>{t.surface}</dt>
                <dd className="font-semibold text-white">{nf2.format(result.geometry.surface)} m²</dd>
              </div>
            </dl>
            <ul className="mt-6 border-t border-[rgb(222_226_230/0.5)] pt-5">
              {sectionOrder
                .filter((s) => result.sections[s].total > 0)
                .map((s) => (
                  <li key={s} className="flex items-baseline justify-between gap-4 py-1.5 leading-6">
                    <span className="text-white/80">{t.sections[s]}</span>
                    <span className="shrink-0 font-semibold">{money(result.sections[s].total)}</span>
                  </li>
                ))}
            </ul>
            {ready && !place.confirmed && <p className="mt-4 rounded-[8px] bg-white/10 p-3 text-sm leading-5 text-white/80">{t.approxPlace}</p>}
            <button type="button" onClick={() => setShowDetails((v) => !v)} aria-expanded={showDetails} className="mt-6 text-sm font-semibold text-primary hover:underline">
              {showDetails ? t.hideDetails : t.details} {showDetails ? '↑' : '↓'}
            </button>
            {showDetails && (
              <div className="mt-4 max-h-[460px] overflow-y-auto pr-1 text-sm">
                {sectionOrder
                  .filter((s) => result.sections[s].total > 0)
                  .map((s) => (
                    <div key={s} className="mb-4">
                      <p className="mb-1 font-semibold text-primary">{t.sections[s]}</p>
                      <table className="w-full">
                        <tbody>
                          {result.lines
                            .filter((l) => l.section === s)
                            .map((l) => {
                              const meta = ITEM_LABELS[l.key]
                              const name = meta?.name[locale] ?? config.extras.find((x) => x.key === l.key)?.name[locale] ?? l.key
                              return (
                                <tr key={l.key} className="border-b border-white/10 align-top">
                                  <td className="py-1.5 pr-2 text-white/80">
                                    {l.key === 'finish_material' ? finish.name : name}
                                    {l.section !== 'extras' && (
                                      <span className="block text-white/50">
                                        {nf2.format(l.qty)} {meta?.unit[locale] ?? ''} × {nf2.format(l.price)} ₼
                                      </span>
                                    )}
                                  </td>
                                  <td className="py-1.5 text-right font-semibold whitespace-nowrap">{money(l.total)}</td>
                                </tr>
                              )
                            })}
                        </tbody>
                      </table>
                    </div>
                  ))}
              </div>
            )}
          </>
        ) : (
          <p className="text-white/80">{t.leadOnly}</p>
        )}
        {disclaimer && <p className="mt-6 border-t border-white/15 pt-4 text-sm leading-5 text-white/60">{disclaimer}</p>}
      </aside>
    </div>
  )
}
