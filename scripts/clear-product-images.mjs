// Clears the images[] array for specific products by productCode.
// Usage: node scripts/clear-product-images.mjs CODE1 CODE2 ...
// Or:    node scripts/clear-product-images.mjs --all   (DANGEROUS: clears every product)

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

const TOKEN = process.env.SANITY_API_TOKEN
if (!TOKEN) {
  console.error('Missing SANITY_API_TOKEN')
  process.exit(1)
}

const client = createClient({
  projectId: 'g8n7tvko',
  dataset: 'production',
  apiVersion: '2025-01-01',
  token: TOKEN,
  useCdn: false,
})

const args = process.argv.slice(2)
if (args.length === 0) {
  console.error('Usage: node scripts/clear-product-images.mjs CODE1 CODE2 ...')
  process.exit(1)
}

let products
if (args[0] === '--all') {
  products = await client.fetch(`*[_type == "product" && count(images) > 0]{_id, productCode}`)
} else {
  products = await client.fetch(
    `*[_type == "product" && productCode in $codes]{_id, productCode}`,
    {codes: args},
  )
}

console.log(`Clearing images for ${products.length} products...`)
for (const p of products) {
  await client.patch(p._id).unset(['images']).commit()
  console.log(`  ✓ ${p.productCode}`)
}
console.log('Done.')
