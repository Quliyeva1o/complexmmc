/**
 * `npm run content:hero-video` — put the turanprojects.az hero video + poster on the home hero
 * (PLAN.md §11 step 5). Uploads both files to Media once (matched by sourceUrl) and points the
 * home page's hero block (published row + its versions) at them. Re-running is safe.
 * Usage: npm run content:hero-video -- <dir with turan-hero.mp4 and turan-hero-poster.webp>
 */
import path from 'node:path'

import config from '@payload-config'
import { getPayload } from 'payload'

const dir = process.argv[2]
if (!dir) throw new Error('pass the folder that holds turan-hero.mp4 and turan-hero-poster.webp')

const payload = await getPayload({ config })
const pool = (payload.db as unknown as { pool: { query: (q: string, v?: unknown[]) => Promise<{ rowCount: number; rows: { id: number }[] }> } }).pool

const FILES = [
  {
    file: 'turan-hero-poster.webp',
    sourceUrl: 'https://www.turanprojects.az/assets/images/hero-poster.webp',
    alt: { az: 'Complex MMC tərəfindən tikilmiş açıq hovuz', en: 'Outdoor pool built by Complex MMC', ru: 'Открытый бассейн, построенный Complex MMC' },
  },
  {
    file: 'turan-hero.mp4',
    sourceUrl: 'https://www.turanprojects.az/assets/videos/2.mp4',
    alt: { az: 'Hovuz layihələrimizdən video', en: 'Video from our pool projects', ru: 'Видео наших проектов бассейнов' },
  },
]

const ids: number[] = []
for (const f of FILES) {
  const found = await payload.find({ collection: 'media', where: { sourceUrl: { equals: f.sourceUrl } }, limit: 1, depth: 0 })
  let id = found.docs[0]?.id as number | undefined
  if (!id) {
    const doc = await payload.create({
      collection: 'media',
      locale: 'az',
      data: { alt: f.alt.az, sourceUrl: f.sourceUrl },
      filePath: path.join(dir, f.file),
    })
    id = doc.id as number
    for (const l of ['en', 'ru'] as const) await payload.update({ collection: 'media', id, locale: l, data: { alt: f.alt[l] } })
  }
  ids.push(id)
}
const [poster, video] = ids

const home = await pool.query(`select _parent_id as id from pages_locales where slug = 'home' limit 1`)
const homeId = home.rows[0]?.id
if (!homeId) throw new Error('home page not found')
const a = await pool.query(`update pages_blocks_hero set background_image_id = $1, background_video_id = $2 where _parent_id = $3`, [poster, video, homeId])
const b = await pool.query(
  `update _pages_v_blocks_hero h set background_image_id = $1, background_video_id = $2
     from _pages_v v where h._parent_id = v.id and v.parent_id = $3`,
  [poster, video, homeId],
)
console.log(`poster media ${poster}, video media ${video}; hero rows updated: ${a.rowCount} published, ${b.rowCount} versions`)
process.exit(0)
