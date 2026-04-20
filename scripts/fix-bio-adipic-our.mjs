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

const product = await client.fetch(
  `*[_type=="product" && slug.current=="bio-based-adipic-acid"][0]{_id, descriptionLong}`
)

if (!product) {
  console.log('Product not found'); process.exit(1)
}

// Walk portable-text blocks and replace "Our fermentation" → "The fermentation"
function fixText(text) {
  return text.replace(/\bOur fermentation\b/g, 'The fermentation')
             .replace(/\bour fermentation\b/g, 'the fermentation')
}

const fixed = product.descriptionLong?.map(block => {
  if (block._type !== 'block') return block
  return {
    ...block,
    children: block.children?.map(child =>
      child._type === 'span'
        ? {...child, text: fixText(child.text ?? '')}
        : child
    ),
  }
})

await client.patch(product._id).set({descriptionLong: fixed}).commit()
console.log('✓ Patched — "Our fermentation" → "The fermentation"')
