'use client'

import { type FormEvent, useState } from 'react'

import type { Locale } from '@/i18n/config'

/** Option lists for the estimate request (template "Cost Estimator"). Prices come later from the estimates. */
const T = {
  az: {
    name: 'Adınız', phone: 'Telefon', email: 'E-poçt (istəyə görə)',
    type: 'Obyekt növü', typePh: 'Növü seçin', types: ['Skimmer hovuz', 'Daşma (overflow) hovuz', 'Infinity hovuz', 'Qapalı hovuz', 'Sauna / hamam', 'SPA kompleksi'],
    size: 'Ölçü', sizePh: 'Ölçünü seçin', sizes: ['4×8 m-ə qədər', '5×10 m', '6×12 m', 'Daha böyük / fərdi'],
    finish: 'Daxili üzlük', finishPh: 'Üzlüyü seçin', finishes: ['Şüşə mozaika', 'Keramika', 'PVC layner', 'Təbii daş', 'Hələ bilmirəm'],
    time: 'Başlama vaxtı', timePh: 'Vaxtı seçin', times: ['1 ay ərzində', '1–3 ay', '3–6 ay', 'Hələ qərar verməmişəm'],
    extrasLabel: 'Əlavələr', extras: ['Şəlalə', 'Ağıllı idarəetmə', 'LED işıqlandırma', 'Hidromassaj / SPA', 'İsitmə sistemi', 'Hovuzətrafı döşəmə'],
    budget: 'Təxmini büdcə', budgetPh: 'Büdcəni seçin', budgets: ['20 000 AZN-ə qədər', '20 000 – 50 000 AZN', '50 000 – 100 000 AZN', '100 000 AZN-dən çox'],
    details: 'Layihə haqqında', detailsPh: 'Ünvan, ərazinin ölçüsü, istəkləriniz…',
    send: 'Qiymət təklifi al', sending: 'Göndərilir…', sent: 'Təşəkkür edirik! Mütəxəssisimiz tezliklə sizinlə əlaqə saxlayacaq.', error: 'Göndərmək alınmadı. Zəhmət olmasa telefonla əlaqə saxlayın.',
  },
  en: {
    name: 'Your name', phone: 'Phone', email: 'E-mail (optional)',
    type: 'Project type', typePh: 'Select type', types: ['Skimmer pool', 'Overflow pool', 'Infinity pool', 'Indoor pool', 'Sauna / hammam', 'SPA complex'],
    size: 'Size', sizePh: 'Select size', sizes: ['Up to 4×8 m', '5×10 m', '6×12 m', 'Larger / custom'],
    finish: 'Interior finish', finishPh: 'Select finish', finishes: ['Glass mosaic', 'Ceramic tiles', 'PVC liner', 'Natural stone', 'Not sure yet'],
    time: 'Project timeline', timePh: 'Select timeline', times: ['Within 1 month', '1–3 months', '3–6 months', 'Not decided yet'],
    extrasLabel: 'Extras', extras: ['Waterfall', 'Smart automation', 'LED lighting', 'Hydromassage / SPA', 'Heating system', 'Pool decking'],
    budget: 'Estimated budget', budgetPh: 'Select budget range', budgets: ['Up to 20,000 AZN', '20,000 – 50,000 AZN', '50,000 – 100,000 AZN', 'Over 100,000 AZN'],
    details: 'Project details', detailsPh: 'Address, plot size, your wishes…',
    send: 'Get a quote', sending: 'Sending…', sent: 'Thank you! Our specialist will contact you shortly.', error: 'Sending failed. Please call us instead.',
  },
  ru: {
    name: 'Ваше имя', phone: 'Телефон', email: 'E-mail (необязательно)',
    type: 'Тип объекта', typePh: 'Выберите тип', types: ['Скиммерный бассейн', 'Переливной бассейн', 'Бассейн инфинити', 'Крытый бассейн', 'Сауна / хаммам', 'SPA-комплекс'],
    size: 'Размер', sizePh: 'Выберите размер', sizes: ['До 4×8 м', '5×10 м', '6×12 м', 'Больше / индивидуально'],
    finish: 'Отделка чаши', finishPh: 'Выберите отделку', finishes: ['Стеклянная мозаика', 'Керамика', 'ПВХ-лайнер', 'Натуральный камень', 'Пока не знаю'],
    time: 'Сроки начала', timePh: 'Выберите срок', times: ['В течение месяца', '1–3 месяца', '3–6 месяцев', 'Ещё не решил'],
    extrasLabel: 'Дополнительно', extras: ['Водопад', 'Умное управление', 'LED-подсветка', 'Гидромассаж / SPA', 'Подогрев', 'Настил вокруг бассейна'],
    budget: 'Примерный бюджет', budgetPh: 'Выберите бюджет', budgets: ['До 20 000 AZN', '20 000 – 50 000 AZN', '50 000 – 100 000 AZN', 'Более 100 000 AZN'],
    details: 'О проекте', detailsPh: 'Адрес, размер участка, пожелания…',
    send: 'Получить предложение', sending: 'Отправка…', sent: 'Спасибо! Наш специалист скоро свяжется с вами.', error: 'Не удалось отправить. Пожалуйста, позвоните нам.',
  },
} satisfies Record<Locale, Record<string, string | string[]>>

const field = 'h-[46px] w-full rounded-[8px] border border-[#D1D5DB] bg-black/[0.024] px-3 py-2.5 text-[14px] text-[#111827] outline-none transition-colors focus:border-primary'
const label = 'mb-2 block text-[17px] font-medium text-[#4B5563]'

/**
 * Template "Cost Estimator" form (Pooluxe), measured 1:1: #F4F7FB panel, 15px radius,
 * 20/40/40 padding, two-column 46px fields with 17px labels, three-column extras, 120px textarea,
 * pill button. Sends the selections as one lead (the price list arrives with the estimates).
 */
export function EstimateForm({ locale, formId }: { locale: Locale; formId: number | string }) {
  const t = T[locale]
  const [state, setState] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const fd = new FormData(e.currentTarget)
    if (fd.get('website')) return
    const pick = (k: string) => String(fd.get(k) ?? '').trim()
    const extras = fd.getAll('extras').map(String)
    const summary = [
      [t.type, pick('type')],
      [t.size, pick('size')],
      [t.finish, pick('finish')],
      [t.time, pick('time')],
      [t.extrasLabel, extras.join(', ')],
      [t.budget, pick('budget')],
      [t.details, pick('details')],
    ]
      .filter(([, v]) => v)
      .map(([k, v]) => `${k}: ${v}`)
      .join('\n')
    setState('sending')
    try {
      const res = await fetch('/api/form-submissions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          form: formId,
          submissionData: [
            { field: 'name', value: pick('name') },
            { field: 'phone', value: pick('phone') },
            { field: 'email', value: pick('email') },
            { field: 'message', value: summary },
            { field: 'page', value: window.location.pathname },
          ],
        }),
      })
      setState(res.ok ? 'sent' : 'error')
    } catch {
      setState('error')
    }
  }

  if (state === 'sent')
    return (
      <p role="status" className="rounded-[15px] bg-soft p-10 font-semibold text-heading">
        {t.sent}
      </p>
    )

  const select = (name: string, lbl: string, ph: string, opts: string[]) => (
    <div>
      <label htmlFor={`est-${name}`} className={label}>
        {lbl}
      </label>
      <select id={`est-${name}`} name={name} defaultValue="" className={field}>
        <option value="">{ph}</option>
        {opts.map((o) => (
          <option key={o} value={o} className="text-[#111827]">
            {o}
          </option>
        ))}
      </select>
    </div>
  )

  return (
    <form onSubmit={onSubmit} className="rounded-[15px] bg-soft px-6 pt-5 pb-10 md:px-10">
      <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
      <div className="grid gap-x-[30px] gap-y-[30px] pt-[30px] md:grid-cols-2">
        <div>
          <label htmlFor="est-name" className={label}>
            {t.name}
          </label>
          <input id="est-name" name="name" required autoComplete="name" className={field} />
        </div>
        <div>
          <label htmlFor="est-phone" className={label}>
            {t.phone}
          </label>
          <input id="est-phone" name="phone" type="tel" required autoComplete="tel" className={field} />
        </div>
        {select('type', t.type, t.typePh, t.types)}
        {select('size', t.size, t.sizePh, t.sizes)}
        {select('finish', t.finish, t.finishPh, t.finishes)}
        {select('time', t.time, t.timePh, t.times)}

        <fieldset className="md:col-span-2">
          <legend className={label}>{t.extrasLabel}</legend>
          <div className="grid gap-x-[30px] gap-y-2.5 sm:grid-cols-3">
            {t.extras.map((x) => (
              <label key={x} className="flex cursor-pointer items-center gap-2.5 leading-5">
                <input type="checkbox" name="extras" value={x} className="size-3 shrink-0 rounded-[5px] accent-primary" />
                {x}
              </label>
            ))}
          </div>
        </fieldset>

        <div className="md:col-span-2">{select('budget', t.budget, t.budgetPh, t.budgets)}</div>
        <div className="md:col-span-2">
          <label htmlFor="est-email" className={label}>
            {t.email}
          </label>
          <input id="est-email" name="email" type="email" autoComplete="email" className={field} />
        </div>
        <div className="md:col-span-2">
          <label htmlFor="est-details" className={label}>
            {t.details}
          </label>
          <textarea id="est-details" name="details" placeholder={t.detailsPh} className={`${field} h-[120px] resize-y placeholder:text-[#9CA3AF]`} />
          <button
            type="submit"
            disabled={state === 'sending'}
            className="mt-[26px] rounded-[25px] bg-primary px-5 py-1.5 text-base leading-[30px] font-semibold text-heading transition-colors duration-300 hover:bg-dark hover:text-white disabled:opacity-60"
          >
            {state === 'sending' ? t.sending : t.send}
          </button>
          {state === 'error' && (
            <p role="alert" className="mt-3 text-sm text-red-700">
              {t.error}
            </p>
          )}
        </div>
      </div>
    </form>
  )
}
