// Bulk-upload product images to Sanity and attach them to matching products.
//
// Setup:
//   1. Get a Sanity API token (Editor role) from
//      https://www.sanity.io/manage/project/g8n7tvko/api
//   2. Create miki-website/.env.local with:
//      SANITY_API_TOKEN=sk...
//   3. Extract your image zip somewhere on disk.
//
// Run:
//   node scripts/upload-product-images.mjs "C:/path/to/Chemical Images"
//   node scripts/upload-product-images.mjs "C:/path/to/folder" --force
//
// Matching strategy (normalized: lowercase, punctuation stripped, single spaces):
//   1. productCode exact match
//   2. iupacName exact match
//   3. productName exact match
//   4. iupacName fuzzy (Levenshtein <= 2)
//   5. productName fuzzy (Levenshtein <= 2)
//
// Idempotent: products that already have images are skipped unless --force.
// Writes a full report to image-upload-report.json.

import fs from 'node:fs'
import path from 'node:path'
import {createClient} from '@sanity/client'

// Load .env.local manually (no dependency needed)
const envPath = path.resolve(process.cwd(), '.env.local')
if (fs.existsSync(envPath)) {
  for (const line of fs.readFileSync(envPath, 'utf8').split(/\r?\n/)) {
    const m = line.match(/^([A-Z_][A-Z0-9_]*)=(.*)$/)
    if (m) process.env[m[1]] ??= m[2].replace(/^["']|["']$/g, '')
  }
}

const TOKEN = process.env.SANITY_API_TOKEN
if (!TOKEN) {
  console.error('❌ Missing SANITY_API_TOKEN in .env.local')
  process.exit(1)
}

const folderArg = process.argv[2]
const force = process.argv.includes('--force')
if (!folderArg) {
  console.error('Usage: node scripts/upload-product-images.mjs "<folder>" [--force]')
  process.exit(1)
}
const ROOT_DIR = path.resolve(folderArg)
if (!fs.existsSync(ROOT_DIR)) {
  console.error(`❌ Folder not found: ${ROOT_DIR}`)
  process.exit(1)
}

const client = createClient({
  projectId: 'g8n7tvko',
  dataset: 'production',
  apiVersion: '2025-01-01',
  token: TOKEN,
  useCdn: false,
})

// ---------- helpers ----------
const IMG_EXT = new Set(['.png', '.jpg', '.jpeg', '.webp', '.gif'])

function normalize(s) {
  return String(s || '')
    .toLowerCase()
    .replace(/[''`]/g, '')
    .replace(/[^a-z0-9]+/g, ' ')
    .trim()
    .replace(/\s+/g, ' ')
}

function levenshtein(a, b) {
  if (a === b) return 0
  if (!a.length) return b.length
  if (!b.length) return a.length
  const v0 = new Array(b.length + 1)
  const v1 = new Array(b.length + 1)
  for (let i = 0; i <= b.length; i++) v0[i] = i
  for (let i = 0; i < a.length; i++) {
    v1[0] = i + 1
    for (let j = 0; j < b.length; j++) {
      const cost = a[i] === b[j] ? 0 : 1
      v1[j + 1] = Math.min(v1[j] + 1, v0[j + 1] + 1, v0[j] + cost)
    }
    for (let i2 = 0; i2 <= b.length; i2++) v0[i2] = v1[i2]
  }
  return v1[b.length]
}

function walk(dir) {
  const out = []
  for (const entry of fs.readdirSync(dir, {withFileTypes: true})) {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) out.push(...walk(full))
    else if (IMG_EXT.has(path.extname(entry.name).toLowerCase())) out.push(full)
  }
  return out
}

// ---------- load products ----------
console.log('Fetching products from Sanity...')
const products = await client.fetch(
  `*[_type == "product"]{_id, productName, productCode, iupacName, "imageCount": count(images)}`,
)
console.log(`  ${products.length} products loaded`)

// Build lookup indexes
const byCode = new Map()
const byIupac = new Map()
const byName = new Map()
for (const p of products) {
  if (p.productCode) byCode.set(normalize(p.productCode), p)
  if (p.iupacName) byIupac.set(normalize(p.iupacName), p)
  if (p.productName) byName.set(normalize(p.productName), p)
}

function findProduct(filenameNoExt) {
  const norm = normalize(filenameNoExt)

  // 1. exact code
  if (byCode.has(norm)) return {product: byCode.get(norm), method: 'productCode'}
  // 2. exact iupac
  if (byIupac.has(norm)) return {product: byIupac.get(norm), method: 'iupacName'}
  // 3. exact name
  if (byName.has(norm)) return {product: byName.get(norm), method: 'productName'}

  // Fuzzy matching disabled — short product codes (BMI-7000 vs BMI-1000)
  // produced too many false positives. Exact matches only.
  return null
}

// ---------- process files ----------
const files = walk(ROOT_DIR)
console.log(`Found ${files.length} image files in ${ROOT_DIR}\n`)

const report = {matched: [], skipped: [], unmatched: [], errors: []}

for (const file of files) {
  const filename = path.basename(file)
  const stem = path.basename(file, path.extname(file))
  const match = findProduct(stem)

  if (!match) {
    report.unmatched.push({file: filename, normalized: normalize(stem)})
    console.log(`✗ UNMATCHED  ${filename}`)
    continue
  }

  const {product, method} = match

  if (product.imageCount > 0 && !force) {
    report.skipped.push({file: filename, product: product.productName, reason: 'has images'})
    console.log(`- skip      ${filename} → ${product.productName} (already has image)`)
    continue
  }

  try {
    const buffer = fs.readFileSync(file)
    const asset = await client.assets.upload('image', buffer, {filename})

    await client
      .patch(product._id)
      .setIfMissing({images: []})
      .append('images', [
        {
          _type: 'image',
          _key: Math.random().toString(36).slice(2, 10),
          asset: {_type: 'reference', _ref: asset._id},
        },
      ])
      .commit()

    report.matched.push({file: filename, product: product.productName, method, assetId: asset._id})
    console.log(`✓ ${method.padEnd(20)} ${filename} → ${product.productName}`)
  } catch (err) {
    report.errors.push({file: filename, error: err.message})
    console.log(`✗ ERROR     ${filename}: ${err.message}`)
  }
}

const reportPath = path.resolve(process.cwd(), 'image-upload-report.json')
fs.writeFileSync(reportPath, JSON.stringify(report, null, 2))

console.log(`
─────────────────────────────────────────
  matched:   ${report.matched.length}
  skipped:   ${report.skipped.length} (already had images)
  unmatched: ${report.unmatched.length}
  errors:    ${report.errors.length}
─────────────────────────────────────────
Full report: ${path.relative(process.cwd(), reportPath)}
${report.unmatched.length ? '\nFix unmatched filenames and re-run (matched products will be skipped).' : ''}
`)
