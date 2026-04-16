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

// Map old messy categories → clean normalized categories
const remap = {
  // Merge Methacrylate + Methacrylates
  'Methacrylate': 'Acrylates & Methacrylates',
  'Methacrylates': 'Acrylates & Methacrylates',
  'Acrylate': 'Acrylates & Methacrylates',

  // Allyl + Phthalates
  'Allyl Ethers': 'Allyl Ethers & Phthalates',
  'Phthlates': 'Allyl Ethers & Phthalates',
  'Diallyl phthalate': 'Allyl Ethers & Phthalates',

  // Epoxides
  'Epoxide': 'Epoxides',
  'Epoxy': 'Epoxides',

  // Anhydrides + Curing Agent
  'Anhydrides': 'Anhydrides & Curing Agents',
  'Curing Agent': 'Anhydrides & Curing Agents',

  // Diols + Commodity
  'Diols': 'Diols & Commodity',
  'Commodity': 'Diols & Commodity',

  // High-Performance Resins
  'Polyimide': 'Polyimide Monomers',
  'Thermoset': 'Bismaleimides & Thermosets',
  'Bismaleimide': 'Bismaleimides & Thermosets',
  'Fluorene derivatives': 'Fluorene Derivatives',

  // Anilines move to high-perf resins
  'Aniline': 'Anilines',

  // Toluidines stay
  'Toluidine': 'Toluidines',

  // Adamantyl stays
  'Adamantyl': 'Adamantyl',

  // Specialty stays
  'Specialty': 'Specialty Intermediates',

  // Bio-based → Sustainable Materials
  'Bio-Based Monomers': 'Sustainable Materials',

  // Bio / Pharma stays
  'Bio / Pharma': 'Bio & Pharma',

  // Optical / Lens categories
  'Lens Manufacturing': 'Lens Manufacturing',
  'Coating - Lens Varnish': 'Optical Coatings',
  'Coatings - Lens Varnish': 'Optical Coatings',
  'Coatings - Hydrophobic': 'Optical Coatings',

  // R&D
  'Polymer': 'Development Samples',
}

const products = await c.fetch(`*[_type=="product"]{_id, category}`)
let ok = 0, skip = 0

for (const p of products) {
  const newCat = remap[p.category]
  if (!newCat || newCat === p.category) {
    skip++
    continue
  }
  try {
    await c.patch(p._id).set({category: newCat}).commit()
    console.log(`✓ ${p._id}: ${p.category} → ${newCat}`)
    ok++
  } catch (e) {
    console.error(`✗ ${p._id}:`, e.message)
  }
}

console.log(`\nDone. ${ok} updated, ${skip} unchanged.`)
