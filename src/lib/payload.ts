import config from '@payload-config'
import { getPayload } from 'payload'

/** Shared Payload Local API client for server components (no HTTP round-trip). */
export const payloadClient = () => getPayload({ config })
