// Placeholder until Stage 4 (homepage). Proves locale routing + tokens work.
export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  return (
    <main className="container-x py-24">
      <p className="text-sm font-semibold uppercase tracking-widest text-accent">Complex MMC</p>
      <h1 className="mt-3 text-4xl font-bold">Sayt qurulur — {locale.toUpperCase()}</h1>
      <p className="mt-4 max-w-xl text-muted">
        Admin panel: <a className="text-primary underline" href="/admin">/admin</a>
      </p>
      <div className="mt-10 flex flex-wrap gap-3">
        {['bg-primary', 'bg-primary-bright', 'bg-accent', 'bg-dark', 'bg-sand', 'bg-primary-soft'].map(
          (c) => (
            <span key={c} className={`${c} h-14 w-24 rounded-md border border-border`} title={c} />
          ),
        )}
      </div>
    </main>
  )
}
