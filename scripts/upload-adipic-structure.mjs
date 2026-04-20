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

// 1. Upload the SVG as a Sanity image asset
const svgBuffer = fs.readFileSync('public/products/adipic-acid-structure.svg')
const asset = await client.assets.upload('image', svgBuffer, {
  filename: 'adipic-acid-structure.svg',
  contentType: 'image/svg+xml',
})
console.log('✓ Uploaded asset:', asset._id)

// 2. Fetch the product
const product = await client.fetch(
  `*[_type=="product" && slug.current=="bio-based-adipic-acid"][0]{_id, images}`
)
if (!product) { console.error('Product not found'); process.exit(1) }

// 3. Prepend the new image to the images array
const newImage = {
  _type: 'image',
  _key: Math.random().toString(36).slice(2),
  asset: {_type: 'reference', _ref: asset._id},
  alt: 'Adipic acid skeletal structure — HOOC-(CH₂)₄-COOH',
}
const images = [newImage, ...(product.images ?? [])]
await client.patch(product._id).set({images}).commit()
console.log('✓ Patched product images for bio-based-adipic-acid')
