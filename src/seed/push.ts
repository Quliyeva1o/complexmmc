/**
 * `npm run db:push` — sync the dev database schema with the Payload config once.
 * (Initialising Payload with PAYLOAD_DB_PUSH=true performs the push.)
 */
import config from '@payload-config'
import { getPayload } from 'payload'

await getPayload({ config })
console.log('Schema is in sync.')
process.exit(0)
