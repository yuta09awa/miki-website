import {createClient} from 'next-sanity'

export const client = createClient({
  projectId: 'g8n7tvko',
  dataset: 'production',
  apiVersion: '2025-01-01',
  useCdn: false,
  // Server-only token. Never imported into client components.
  token: process.env.SANITY_API_TOKEN,
  perspective: 'published',
})
