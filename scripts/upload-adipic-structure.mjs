import fs from 'node:fs'
import path from 'node:path'
import {createClient} from '@sanity/client'

const envPath = path.resolve(process.cwd(), '.env.local')
for (const line of fs.readFileSync(envPath, 'utf8').split('\n')) {
  const [k, ...v] = line.split('=')
  if (k && v.length) process.env[k.trim()] = v.join('=').trim()
}

const client = createClient({
  projectId: 'g8n7tvko',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
})

// 1. Upload the PNG
const buffer = fs.readFileSync('public/products/adipic-acid-structure.png')
const asset = await client.assets.upload('image', buffer, {
  filename: 'adipic-acid-structure.png',
  contentType: 'image/png',
})
console.log('✓ Uploaded asset:', asset._id)

// 2. Fetch product
const product = await client.fetch(
  `*[_type=="product" && slug.current=="bio-based-adipic-acid"][0]{_id}`
)
if (!product) { console.error('Product not found'); process.exit(1) }

// 3. REPLACE images array with only this one image (no leftovers)
const images = [{
  _type: 'image',
  _key: 'adipic-structure',
  asset: {_type: 'reference', _ref: asset._id},
  alt: 'Adipic acid skeletal structure — HOOC-(CH₂)₄-COOH',
}]

await client.patch(product._id).set({images}).commit()
console.log('✓ Replaced product images — only the new PNG remains')
