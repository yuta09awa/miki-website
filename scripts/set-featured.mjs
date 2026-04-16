// Sets featured=true on a specific list of products by productCode
// and clears featured on all others.
// Usage: node scripts/set-featured.mjs

import fs from 'node:fs'
import path from 'node:path'
import {createClient} from '@sanity/client'

const envPath = path.resolve(process.cwd(), '.env.local')
if (fs.existsSync(envPath)) {
  for (const line of fs.readFileSync(envPath, 'utf8').split(/\r?\n/)) {
    const m = line.match(/^([A-Z_][A-Z0-9_]*)=(.*)$/)
    if (m) process.env[m[1]] ??= m[2].replace(/^["']|["']$/g, '')
  }
}

const client = createClient({
  projectId: 'g8n7tvko',
  dataset: 'production',
  apiVersion: '2025-01-01',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
})

const FEATURED_CODES = [
  // BMIs
  'BMI-1000',
  'BMI-2300',
  'BMI-3000H',
  'BMI-4000',
  'BMI-5100',
  'BMI-7000',
  'BMI-TMH',
  // Dianhydrides
  '6FDA',
  's-BPDA',
  'a-BPDA',
  'ODPA',
  // Diamines
  "3,4'-ODA",
  'BAPP',
  // New stubs (Bisphenols)
  'BisA-M',
  'BisA-P',
]

// Clear featured on every currently-featured product
const currentlyFeatured = await client.fetch(`*[_type == "product" && featured == true]{_id, productCode}`)
console.log(`Clearing featured on ${currentlyFeatured.length} products...`)
for (const p of currentlyFeatured) {
  await client.patch(p._id).set({featured: false}).commit()
}

// Set featured on the requested ones
const targets = await client.fetch(
  `*[_type == "product" && productCode in $codes]{_id, productCode}`,
  {codes: FEATURED_CODES},
)
console.log(`\nSetting featured on ${targets.length} products:`)
const found = new Set()
for (const p of targets) {
  await client.patch(p._id).set({featured: true}).commit()
  console.log(`  ✓ ${p.productCode}`)
  found.add(p.productCode)
}

const missing = FEATURED_CODES.filter((c) => !found.has(c))
if (missing.length) {
  console.log(`\n⚠ Not found in catalog (skipped):`)
  for (const c of missing) console.log(`  - ${c}`)
}
console.log('\nDone.')
