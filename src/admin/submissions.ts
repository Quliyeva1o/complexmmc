import type { CollectionBeforeChangeHook, Field } from 'payload'

/**
 * Extra fields on form submissions (PLAN.md §12): readable columns (name, phone, page), the kind
 * of request (contact / price quote) and a simple workflow status. Filled from submissionData on
 * create, so the forms on the site don't need to change.
 */
export const submissionFields: Field[] = [
  {
    // readable request card with call / WhatsApp buttons; opening a new request marks it seen
    name: 'requestCard',
    type: 'ui',
    admin: { components: { Field: '/components/admin/SubmissionUI#RequestCard' } },
  },
  {
    name: 'kind',
    label: 'Növ',
    type: 'select',
    defaultValue: 'contact',
    options: [
      { label: 'Əlaqə', value: 'contact' },
      { label: 'Qiymət', value: 'quote' },
    ],
    admin: { position: 'sidebar', components: { Cell: '/components/admin/SubmissionUI#KindCell' } },
    index: true,
  },
  {
    name: 'status',
    label: 'Status',
    type: 'select',
    defaultValue: 'new',
    options: [
      { label: 'Yeni', value: 'new' },
      { label: 'Baxıldı', value: 'seen' },
      { label: 'Cavablandı', value: 'done' },
    ],
    admin: { position: 'sidebar', components: { Cell: '/components/admin/SubmissionUI#StatusCell' } },
    index: true,
  },
  // columns for the list; shown in the card above, so hidden in the form
  { name: 'name', label: 'Ad', type: 'text', admin: { readOnly: true, hidden: true } },
  { name: 'phone', label: 'Telefon', type: 'text', admin: { readOnly: true, hidden: true } },
  { name: 'page', label: 'Səhifə', type: 'text', admin: { readOnly: true, hidden: true } },
]

type Row = { field?: string; value?: unknown }

/** quote = sent from the pool calculator (it marks itself with kind=quote; older ones by page). */
export const deriveSubmission: CollectionBeforeChangeHook = ({ data, operation }) => {
  if (operation !== 'create') return data
  const rows = (data.submissionData ?? []) as Row[]
  const get = (f: string) => String(rows.find((r) => r.field === f)?.value ?? '').trim()
  const page = get('page')
  return {
    ...data,
    name: data.name || get('name'),
    phone: data.phone || get('phone'),
    page: data.page || page,
    kind: get('kind') === 'quote' || /qiymet-hesabla|price-calculator|kalkulyator/i.test(page) ? 'quote' : data.kind || 'contact',
    status: data.status || 'new',
  }
}
