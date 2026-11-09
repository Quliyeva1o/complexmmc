import fs from 'node:fs'
import path from 'node:path'
import type { Payload } from 'payload'

import type { Loc } from './lib'

type Doc = { type: string; az: string; alts: Record<Loc, string | null> }

/**
 * 1) In-site redirects (CMS "Yönləndirmələr"): removed tools -> calculator.
 * 2) docs/redirects-turanprojects.csv: full old-URL -> new-URL map for the domain move.
 *    Paths are kept 1:1, so at hosting level a single rule is enough:
 *      turanprojects.az/*  ->  301  https://complexmmc.az/*   (+ the exceptions below)
 */
export async function seedRedirects({ payload, docs, log }: { payload: Payload; docs: Doc[]; log: (s: string) => void }) {
  log('Redirects…')
  const removed: [string, string][] = [
    ['/create', '/qiymet-hesabla'],
    ['/hovuz-vizualizasiyasi', '/qiymet-hesabla'],
    ['/en/pool-visualization', '/en/price-calculator'],
    ['/ru/vizualizaciya-bassejna', '/ru/kalkulyator-stoimosti'],
    ['/en/create', '/en/price-calculator'],
    ['/ru/create', '/ru/kalkulyator-stoimosti'],
  ]
  for (const [from, to] of removed) {
    const found = await payload.find({ collection: 'redirects', where: { from: { equals: from } }, limit: 1 })
    const data = { from, to: { type: 'custom', url: to }, type: '301' }
    if (found.docs[0]) await payload.update({ collection: 'redirects', id: found.docs[0].id, data: data as never })
    else await payload.create({ collection: 'redirects', data: data as never })
  }

  // Full migration map (documentation + input for nginx / Cloudflare rules at deploy)
  const rows = ['old_url,new_url,status']
  const removedMap = new Map(removed)
  const all = new Set<string>(['/'])
  for (const d of docs) for (const p of Object.values(d.alts)) if (p) all.add(p)
  all.add('/products')
  for (const p of ['/hovuz-vizualizasiyasi', '/en/pool-visualization', '/ru/vizualizaciya-bassejna', '/create']) all.add(p)
  for (const p of [...all].sort()) {
    const to = removedMap.get(p) ?? p
    rows.push(`https://www.turanprojects.az${p === '/' ? '' : p},https://complexmmc.az${to === '/' ? '' : to},301`)
  }
  const out = path.resolve('docs/redirects-turanprojects.csv')
  fs.mkdirSync(path.dirname(out), { recursive: true })
  fs.writeFileSync(out, rows.join('\n') + '\n')
  log(`  ${rows.length - 1} URL mappings -> docs/redirects-turanprojects.csv`)
}
