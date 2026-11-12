import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId } from '../env'

/**
 * Server-side Sanity client. The dataset is private, so reads use a
 * Viewer token from `SANITY_API_READ_TOKEN` (no NEXT_PUBLIC_ prefix,
 * so it is never bundled for the browser). Only published documents
 * are returned.
 */
export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  token: process.env.SANITY_API_READ_TOKEN,
  perspective: 'published',
})
