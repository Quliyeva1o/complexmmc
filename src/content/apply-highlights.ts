/**
 * `npm run content:highlights` — fill empty project highlight descriptions (az/en/ru) from
 * src/content/projects/highlights.ts, matched by each row's AZ title.
 * Writes straight to the published rows AND the version rows, so unpublished drafts (stage 2b
 * content) keep their place as the latest version. Never overwrites a description an editor set.
 */
import config from '@payload-config'
import { getPayload } from 'payload'

import { HIGHLIGHT_DESCRIPTIONS } from './projects/highlights'

const payload = await getPayload({ config })
const pool = (payload.db as unknown as { pool: { query: (q: string, v?: unknown[]) => Promise<{ rowCount: number }> } }).pool

let total = 0
for (const table of ['projects_highlights_locales', '_projects_v_version_highlights_locales']) {
  for (const [azTitle, d] of Object.entries(HIGHLIGHT_DESCRIPTIONS)) {
    for (const locale of ['az', 'en', 'ru'] as const) {
      const res = await pool.query(
        `update ${table} l set description = $1
           from ${table} a
          where a._parent_id = l._parent_id and a._locale = 'az' and a.title = $2
            and l._locale = $3 and coalesce(l.description, '') = ''`,
        [d[locale], azTitle, locale],
      )
      total += res.rowCount
    }
  }
}
const missing = await pool.query(
  `select 1 from projects_highlights_locales where _locale = 'az' and coalesce(description, '') = ''`,
)
console.log(`highlight descriptions written: ${total}; published rows still empty: ${missing.rowCount}`)
process.exit(0)
