/**
 * Re-imports only the Pages collection (home, about, contact, info/legal pages…) without
 * touching categories, services, projects or posts (which may carry editor drafts).
 *
 *   SEED_ASSETS_DIR=<downloaded /assets> npm run seed:pages
 */
import 'dotenv/config'
import fs from 'node:fs'
import path from 'node:path'
import { getPayload } from 'payload'

import config from '@payload-config'
import { initRichText, type L, type Loc, MediaStore, rt, upsert } from './lib'
import { seedPages } from './pages'

/* eslint-disable @typescript-eslint/no-explicit-any */
type Doc = { type: string; az: string; alts: Record<Loc, string | null>; locales: Partial<Record<Loc, any>> }

const assetsDir = process.env.SEED_ASSETS_DIR
if (!assetsDir) throw new Error('Set SEED_ASSETS_DIR')
const { docs } = JSON.parse(fs.readFileSync(path.resolve('src/seed/data/turan.json'), 'utf8')) as { docs: Doc[] }

const payload = await getPayload({ config })
await initRichText(payload.config)
const media = new MediaStore(payload, assetsDir)

/** Same FAQ logic as the full seed: match by AZ question, create when missing. */
async function faqsFor(d: Doc, extra: Record<string, unknown> = {}) {
  const ids: number[] = []
  const az: any[] = d.locales.az?.faqs ?? []
  for (let i = 0; i < az.length; i++) {
    const locales: L<Record<string, unknown>> = {}
    for (const l of ['en', 'ru'] as Loc[]) {
      const f = d.locales[l]?.faqs?.[i]
      if (f) locales[l] = { question: f.q, answer: rt(f.a) }
    }
    ids.push(await upsert(payload, { collection: 'faqs', match: { field: 'question', value: az[i].q }, base: { question: az[i].q, answer: rt(az[i].a), ...extra }, locales }))
  }
  return ids
}

try {
  await seedPages({ payload, media, docs, faqsFor, categoryIds: {}, log: (s) => payload.logger.info(s) })
  payload.logger.info('✔ Pages re-imported')
  process.exit(0)
} catch (e) {
  console.error(e)
  process.exit(1)
}
