// Reads image-upload-report.json, walks the image folder to find each
// unmatched file's parent folder, and creates a stub `product` document
// for each one (productCode + productName + category from folder).
//
// Usage: node scripts/create-product-stubs.mjs "Chemical Images"
// Output: new-products.ndjson  (then import with `sanity dataset import`)

import fs from 'node:fs'
import path from 'node:path'

const ROOT = process.cwd()
const folderArg = process.argv[2]
if (!folderArg) {
  console.error('Usage: node scripts/create-product-stubs.mjs "<image-folder>"')
  process.exit(1)
}
const IMG_ROOT = path.resolve(folderArg)
const REPORT = path.join(ROOT, 'image-upload-report.json')
const OUT = path.join(ROOT, 'new-products.ndjson')

const report = JSON.parse(fs.readFileSync(REPORT, 'utf8'))
const unmatchedNames = new Set(report.unmatched.map((u) => u.file))

// Walk image folder, build filename → category map
const fileCategory = new Map()
function walk(dir, category) {
  for (const entry of fs.readdirSync(dir, {withFileTypes: true})) {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) walk(full, entry.name)
    else if (/\.(png|jpe?g|webp|gif)$/i.test(entry.name)) {
      // First occurrence wins (skip dupes across folders)
      if (!fileCategory.has(entry.name)) fileCategory.set(entry.name, category)
    }
  }
}
walk(IMG_ROOT, 'Uncategorized')

function slugify(s) {
  return String(s)
    .toLowerCase()
    .replace(/[''`]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 96)
}

const seen = new Set()
const stubs = []

for (const filename of unmatchedNames) {
  const stem = path.basename(filename, path.extname(filename))
  const slug = slugify(stem)
  if (seen.has(slug)) continue
  seen.add(slug)

  const category = fileCategory.get(filename) || 'Uncategorized'

  stubs.push({
    _id: `product-${slug}`,
    _type: 'product',
    productType: 'chemical',
    productName: stem,
    productCode: stem,
    slug: {_type: 'slug', current: slug},
    category,
    descriptionShort: `${stem} — pending product details.`,
    featured: false,
  })
}

const out = fs.createWriteStream(OUT)
for (const s of stubs) out.write(JSON.stringify(s) + '\n')
out.end()
await new Promise((r) => out.on('close', r))

console.log(`✓ Wrote ${stubs.length} product stubs to ${path.relative(ROOT, OUT)}`)
console.log(`\nNext: npx sanity dataset import new-products.ndjson production`)
console.log(`Then:  node scripts/upload-product-images.mjs "${folderArg}"`)
