/**
 * Downloads every image referenced in turan.json (original files, not the resized
 * /_next/image variants) into <outDir>, keeping the source path.
 *
 *   node scripts/migrate/download-images.mjs <outDir> [turan.json]
 */
import { mkdir, writeFile, readFile, access } from 'node:fs/promises'
import path from 'node:path'

const [, , outDir, dataFile = 'src/seed/data/turan.json'] = process.argv
if (!outDir) throw new Error('usage: download-images.mjs <outDir> [turan.json]')

const BASE = 'https://www.turanprojects.az'
const { images } = JSON.parse(await readFile(dataFile, 'utf8'))
// Extra static assets used outside page content (hero / about / certificate / contact banners)
const extra = ['/assets/images/logo.webp', '/assets/images/og-image.webp']

let ok = 0, skip = 0
const failed = []
for (const src of [...images, ...extra]) {
  const dest = path.join(outDir, decodeURIComponent(src))
  try { await access(dest); skip++; continue } catch {}
  try {
    const res = await fetch(BASE + encodeURI(decodeURIComponent(src)), { headers: { 'User-Agent': 'Mozilla/5.0 (compatible; ComplexMigration/1.0)' } })
    if (!res.ok) throw new Error(String(res.status))
    await mkdir(path.dirname(dest), { recursive: true })
    await writeFile(dest, Buffer.from(await res.arrayBuffer()))
    ok++
  } catch (e) {
    failed.push(`${src} (${e.message})`)
  }
  await new Promise((r) => setTimeout(r, 250))
}
console.log(JSON.stringify({ ok, skip, failed }))
