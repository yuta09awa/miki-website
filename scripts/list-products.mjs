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

const c = createClient({
  projectId: 'g8n7tvko',
  dataset: 'production',
  apiVersion: '2025-01-01',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
})

const products = await c.fetch(
  `*[_type=="product"]|order(category asc, productName asc){
    productName, productCode, casNumber, iupacName, category, "slug": slug.current,
    descriptionShort,
    "hasLong": count(descriptionLong) > 0,
    "hasBullets": count(featureBullets) > 0,
    "hasImage": count(images) > 0,
    applicationTags
  }`,
)

const esc = (v) => {
  if (v == null) return ''
  const s = String(v).replace(/\r?\n/g, ' ').replace(/"/g, '""')
  return /[",]/.test(s) ? `"${s}"` : s
}

const headers = [
  'category',
  'product_name',
  'product_code',
  'cas_number',
  'iupac_name',
  'slug',
  'short_description',
  'application_tags',
  'has_long_desc',
  'has_bullets',
  'has_image',
]

const rows = products.map((p) =>
  [
    p.category,
    p.productName,
    p.productCode,
    p.casNumber,
    p.iupacName,
    p.slug,
    p.descriptionShort,
    (p.applicationTags || []).join('; '),
    p.hasLong ? 'yes' : 'no',
    p.hasBullets ? 'yes' : 'no',
    p.hasImage ? 'yes' : 'no',
  ]
    .map(esc)
    .join(','),
)

const out = `${headers.join(',')}\n${rows.join('\n')}\n`
fs.writeFileSync('PRODUCT_LIST.csv', out)
console.log(`Written ${products.length} rows to PRODUCT_LIST.csv`)
