import type { Metadata } from 'next'

import { PageShell } from '@/components/layout/PageShell'
import { Button, Eyebrow, Section, SectionHeader } from '@/components/ui/primitives'
import type { Locale } from '@/i18n/config'

/**
 * Design review only: the design system (PLAN.md §11, step 1) on one page — type scale, colours,
 * spacing, radius, buttons, tags, inputs, a card and the section rhythm. Not indexed.
 */
export const metadata: Metadata = { title: 'Design system', robots: { index: false, follow: false } }

const TYPE = [
  { cls: 'text-h1', name: 'H1', spec: '44 → 30px · 700 · −0.02em · 1.15', tag: 'h1' as const },
  { cls: 'text-h2', name: 'H2', spec: '34 → 26px · 700 · −0.02em · 1.25', tag: 'h2' as const },
  { cls: 'text-h3', name: 'H3', spec: '22 → 19px · 600 · −0.01em · 1.3', tag: 'h3' as const },
  { cls: 'text-h4', name: 'H4', spec: '18 → 17px · 600 · 1.35', tag: 'h4' as const },
]
const COLORS = [
  ['primary', '--color-primary'],
  ['primary-strong', '--color-primary-strong'],
  ['primary-soft', '--color-primary-soft'],
  ['heading', '--color-heading'],
  ['text', '--color-text'],
  ['text-muted', '--color-text-muted'],
  ['soft', '--color-soft'],
  ['border', '--color-border'],
  ['dark', '--color-dark'],
]
const SPACE = [4, 8, 12, 16, 24, 32, 48, 64, 96]

const Label = ({ children }: { children: React.ReactNode }) => (
  <p className="mb-4 text-label text-muted uppercase">{children}</p>
)

export default async function DesignPreview({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params
  return (
    <PageShell locale={locale} alternates={{ az: '/preview/design', en: '/en/preview/design', ru: '/ru/preview/design' }}>
      <Section className="pt-40">
        <SectionHeader
          align="start"
          eyebrow="Dizayn sistemi"
          heading="Vahid, minimalist sistem"
          intro="Bütün ölçülər, rənglər və boşluqlar bir mənbədən gəlir (tokens.css). Hər komponent eyni şkaladan istifadə edir."
        />

        {/* ------------------------------------------------ type */}
        <Label>Tipoqrafiya</Label>
        <div className="divide-y divide-border border-y border-border">
          {TYPE.map((t) => (
            <div key={t.name} className="grid gap-2 py-6 md:grid-cols-[160px_1fr] md:items-baseline">
              <div className="text-sm text-muted">
                <span className="font-semibold text-heading">{t.name}</span> · {t.spec}
              </div>
              <t.tag className={t.cls}>Bakıda hovuz tikintisi və servis</t.tag>
            </div>
          ))}
          <div className="grid gap-2 py-6 md:grid-cols-[160px_1fr]">
            <div className="text-sm text-muted"><span className="font-semibold text-heading">Lead</span> · 18px · 1.7</div>
            <p className="text-lg">Layihələndirmədən təhvilə qədər hovuzunuzun bütün mərhələlərini bir komanda idarə edir.</p>
          </div>
          <div className="grid gap-2 py-6 md:grid-cols-[160px_1fr]">
            <div className="text-sm text-muted"><span className="font-semibold text-heading">Body</span> · 16px · 1.7</div>
            <p className="max-w-[var(--measure)]">
              Hər hovuz yerinə, torpağına və istifadəsinə görə fərqlidir. Ona görə də işə ölçü və layihə ilə başlayırıq,
              sonra materialı və avadanlığı birlikdə seçirik.
            </p>
          </div>
          <div className="grid gap-2 py-6 md:grid-cols-[160px_1fr]">
            <div className="text-sm text-muted"><span className="font-semibold text-heading">Small</span> · 14px · 1.5</div>
            <p className="text-sm">Qiymətlər təxminidir, dəqiq smeta yerə baxışdan sonra hazırlanır.</p>
          </div>
          <div className="grid gap-2 py-6 md:grid-cols-[160px_1fr]">
            <div className="text-sm text-muted"><span className="font-semibold text-heading">Label</span> · 12px · 600 · +0.12em</div>
            <p className="text-label text-primary-strong uppercase">Xidmətlərimiz</p>
          </div>
        </div>

        {/* ------------------------------------------------ heading → text rhythm */}
        <div className="mt-16 grid gap-10 md:grid-cols-2">
          <div>
            <Label>Başlıq → mətn (16px)</Label>
            <h3>Skimmer hovuz</h3>
            <p className="mt-[var(--space-heading-text)]">
              Su səthi kənardakı skimmerlərlə təmizlənir. Kiçik və orta ölçülü həyət hovuzları üçün qənaətli həll.
            </p>
          </div>
          <div>
            <Label>Taglər</Label>
            <div className="flex flex-wrap gap-2">
              <Eyebrow>Hovuz</Eyebrow>
              <Eyebrow>SPA</Eyebrow>
              <Eyebrow>Sauna</Eyebrow>
              <span className="inline-flex h-8 items-center rounded-full border border-border px-3.5 text-sm text-heading">Aktiv olmayan</span>
              <span className="inline-flex h-8 items-center rounded-full bg-heading px-3.5 text-sm text-white">Seçilmiş</span>
            </div>
          </div>
        </div>
      </Section>

      {/* ------------------------------------------------ colours, spacing, radius */}
      <Section theme="soft">
        <SectionHeader align="start" eyebrow="Rənglər və ölçülər" heading="Rəng, boşluq, künc" />
        <Label>Rənglər (semantik)</Label>
        <div className="grid grid-cols-3 gap-4 sm:grid-cols-5 lg:grid-cols-9">
          {COLORS.map(([name, v]) => (
            <div key={name}>
              <div className="h-16 rounded-[var(--radius-sm)] border border-black/5" style={{ background: `var(${v})` }} />
              <p className="mt-2 text-xs text-muted">{name}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 grid gap-12 md:grid-cols-2">
          <div>
            <Label>Boşluq şkalası (4px əsaslı)</Label>
            <div className="flex flex-col gap-2">
              {SPACE.map((n) => (
                <div key={n} className="flex items-center gap-4">
                  <span className="w-8 text-right text-xs text-muted">{n}</span>
                  <span className="h-3 rounded-sm bg-primary" style={{ width: n * 2 }} />
                </div>
              ))}
            </div>
            <p className="mt-6 text-sm">Başlıq → mətn 16 · başlıq bloku → məzmun 40–48 · bölmələr 96 (mobil 64) · kart daxili 20–24 · grid 16–24</p>
          </div>
          <div>
            <Label>Künc radiusu və kölgə</Label>
            <div className="grid grid-cols-2 gap-4">
              {[
                ['8 · input', 'var(--radius-sm)', ''],
                ['12 · şəkil', 'var(--radius-media)', ''],
                ['16 · kart', 'var(--radius-card)', 'shadow-sm'],
                ['16 · kart + kölgə', 'var(--radius-card)', 'shadow-card'],
              ].map(([n, r, sh]) => (
                <div key={n} className={`grid h-24 place-items-center bg-white text-sm text-heading ${sh}`} style={{ borderRadius: r }}>
                  {n}
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* ------------------------------------------------ buttons + inputs */}
      <Section>
        <SectionHeader align="start" eyebrow="Komponentlər" heading="Düymələr və formalar" />
        <Label>Düymələr (48px)</Label>
        <div className="flex flex-wrap items-center gap-4">
          <Button href="#">Pulsuz məsləhət</Button>
          <Button href="#" variant="dark">Layihələrə bax</Button>
          <Button href="#" variant="outline">Ətraflı</Button>
          <Button href="#" variant="outline" arrow={false}>Oxlu deyil</Button>
        </div>

        <div className="mt-16 grid gap-12 md:grid-cols-2">
          <div>
            <Label>Input (48px · 8px radius)</Label>
            <form className="grid gap-4">
              <label className="grid gap-2">
                <span className="text-sm font-medium text-heading">Ad, soyad</span>
                <input className="h-12 rounded-[var(--radius-sm)] border border-border bg-white px-4 text-heading outline-none transition-[border-color,box-shadow] duration-[var(--duration-fast)] placeholder:text-muted focus:border-primary-strong focus:ring-4 focus:ring-primary/15" placeholder="Adınız" />
              </label>
              <label className="grid gap-2">
                <span className="text-sm font-medium text-heading">Mesaj</span>
                <textarea rows={4} className="rounded-[var(--radius-sm)] border border-border bg-white px-4 py-3 text-heading outline-none transition-[border-color,box-shadow] duration-[var(--duration-fast)] placeholder:text-muted focus:border-primary-strong focus:ring-4 focus:ring-primary/15" placeholder="Hovuzun ölçüsü, yeri…" />
              </label>
            </form>
            <p className="mt-3 text-sm">Forma dizaynı 3-cü addımda bütün saytda bu üsluba keçəcək.</p>
          </div>
          <div>
            <Label>Kart</Label>
            <article className="rounded-[var(--radius-card)] border border-border bg-white p-[var(--card-pad)] shadow-sm">
              <span className="text-label text-primary-strong uppercase">Hovuz</span>
              <h3 className="mt-3">Daşan (overflow) hovuz</h3>
              <p className="mt-[var(--space-heading-text)] text-sm">Su səviyyəsi kənarla bərabərdir, səth güzgü kimi görünür. Balans çəni və daha güclü filtrasiya tələb edir.</p>
            </article>
          </div>
        </div>
      </Section>

      {/* ------------------------------------------------ dark accent section */}
      <Section theme="dark">
        <SectionHeader dark eyebrow="Tünd bölmə" heading="Yalnız 1–2 vurğu bölməsi tünd olur" intro="Qalan bölmələr ağ və açıq fon arasında növbələşir — bu, səhifəni sakit və oxunaqlı edir." />
        <div className="flex flex-wrap justify-center gap-4">
          <Button href="#">Pulsuz məsləhət</Button>
          <Button href="#" variant="glass">Bizə zəng edin</Button>
        </div>
      </Section>
    </PageShell>
  )
}
