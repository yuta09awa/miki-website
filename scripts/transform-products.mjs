// Transforms miki_materials.jsonl + miki_optical.jsonl into a single
// products.ndjson file matching the unified `product` schema.
//
// Usage:
//   node scripts/transform-products.mjs
// Then import into Sanity:
//   npx sanity dataset import products.ndjson production --replace

import fs from 'node:fs'
import path from 'node:path'
import readline from 'node:readline'

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1')), '..')
const OUT = path.join(ROOT, 'products.ndjson')

// SEO meta-description patches keyed by productCode.
// Source seo.csv had 87 descriptions exceeding Sanity's 160-char limit.
const seoPatches = JSON.parse(
  fs.readFileSync(path.join(ROOT, 'scripts', 'seo-patches.json'), 'utf8'),
)

// Products to surface in the homepage "Featured Products" section.
const FEATURED_CODES = new Set(['a-BPDA', 's-BPDA', '6FDA', 'BMI-1000'])

const sources = [
  {file: 'miki_materials.jsonl', productType: 'chemical'},
  {file: 'miki_optical.jsonl', productType: 'optical'},
]

const out = fs.createWriteStream(OUT)
let total = 0
const seenIds = new Set()

function slugify(s) {
  return String(s)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 96)
}

// Minimal Portable Text: one block per paragraph.
function toPortableText(text) {
  if (!text || typeof text !== 'string') return undefined
  const paragraphs = text.split(/\n\s*\n|\n/).map((p) => p.trim()).filter(Boolean)
  return paragraphs.map((p, i) => ({
    _type: 'block',
    _key: `b${i}`,
    style: 'normal',
    markDefs: [],
    children: [{_type: 'span', _key: `s${i}`, text: p, marks: []}],
  }))
}

function transformChemical(doc) {
  const name = doc.productName || doc.productCode || ''
  // Prefer productCode for slug: it's unique per SKU. Some products share a
  // productName (e.g. three "Benzoxazine Homopolymer" entries with distinct
  // codes JBZ-OP100D/I/N), which would collide on name-based slugs.
  const slugBasis = doc.productCode || name
  const slugCurrent = slugify(slugBasis)
  const id = `product-${slugCurrent}`
  const spec = doc.specifications || {}

  return {
    _id: id,
    _type: 'product',
    productType: 'chemical',
    productName: name,
    productCode: doc.productCode || undefined,
    slug: {_type: 'slug', current: slugCurrent},
    category: doc.category || undefined,
    iupacName: doc.iupacName || undefined,
    casNumber: doc.casNumber || undefined,
    tscaStatus: doc.tscaStatus || undefined,
    descriptionShort: doc.descriptionShort || undefined,
    descriptionLong: toPortableText(doc.descriptionLong),
    featureBullets: Array.isArray(doc.featureBullets) && doc.featureBullets.length ? doc.featureBullets : undefined,
    applicationTags: Array.isArray(doc.applicationTags) && doc.applicationTags.length ? doc.applicationTags : undefined,
    chemicalSpecs: {
      tg_c: spec.tg_c ?? undefined,
      mp_c: spec.mp_c ?? undefined,
      dielectricConstant: spec.dielectricConstant ?? undefined,
      dissipationFactor: spec.dissipationFactor ?? undefined,
    },
    seo: doc.seo
      ? {
          title: doc.seo.title || undefined,
          metaDescription:
            seoPatches[doc.productCode] || doc.seo.metaDescription || undefined,
          keywords: doc.seo.keywords || undefined,
        }
      : undefined,
    featured: FEATURED_CODES.has(doc.productCode),
  }
}

function transformOptical(doc) {
  const name = doc.productName || ''
  const slugCurrent = doc.slug?.current || slugify(name)
  const id = `product-${slugCurrent}`

  // refractiveIndex/transmission are always null in source — drop them.
  return {
    _id: id,
    _type: 'product',
    productType: 'optical',
    productName: name,
    slug: {_type: 'slug', current: slugCurrent},
    category: doc.category || undefined,
    descriptionShort: doc.description || undefined,
    opticalSpecs: {
      application: doc.application || undefined,
    },
    featured: false,
  }
}

function clean(obj) {
  if (Array.isArray(obj)) return obj.map(clean)
  if (obj && typeof obj === 'object') {
    const out = {}
    for (const [k, v] of Object.entries(obj)) {
      if (v === undefined) continue
      const cleaned = clean(v)
      if (cleaned && typeof cleaned === 'object' && !Array.isArray(cleaned) && Object.keys(cleaned).length === 0) continue
      out[k] = cleaned
    }
    return out
  }
  return obj
}

async function processFile(file, productType) {
  const p = path.join(ROOT, file)
  if (!fs.existsSync(p)) {
    console.warn(`Skip: ${file} not found`)
    return
  }
  const rl = readline.createInterface({input: fs.createReadStream(p), crlfDelay: Infinity})
  let count = 0
  for await (const line of rl) {
    const trimmed = line.trim()
    if (!trimmed) continue
    let doc
    try {
      doc = JSON.parse(trimmed)
    } catch (e) {
      console.warn(`Bad JSON in ${file}:`, e.message)
      continue
    }
    const transformed = productType === 'chemical' ? transformChemical(doc) : transformOptical(doc)
    if (seenIds.has(transformed._id)) {
      console.error(`Duplicate _id: ${transformed._id} (${file}, productCode=${doc.productCode || 'n/a'})`)
      process.exitCode = 1
      continue
    }
    seenIds.add(transformed._id)
    out.write(JSON.stringify(clean(transformed)) + '\n')
    count++
    total++
  }
  console.log(`${file}: ${count} docs`)
}

for (const {file, productType} of sources) {
  await processFile(file, productType)
}
out.end()
await new Promise((r) => out.on('close', r))
console.log(`\n✓ Wrote ${total} docs to ${path.relative(ROOT, OUT)}`)
console.log(`\nNext: npx sanity dataset import products.ndjson production --replace`)
