// Seeds navigation menus: Products, Bio & Pharma, Optical, Solutions, Markets.
// Usage: node scripts/seed-navigation.mjs
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

const menus = [
  {
    _id: 'navigationMenu.products',
    _type: 'navigationMenu',
    title: 'Products',
    slug: {_type: 'slug', current: 'products'},
    order: 0,
    flat: false,
    categories: [
      {
        _key: 'monomers',
        categoryName: 'Monomers & Building Blocks',
        items: [
          {_key: 'acr', label: 'Acrylates & Methacrylates', link: '/products?category=Acrylates+%26+Methacrylates'},
          {_key: 'allyl', label: 'Allyl Ethers & Phthalates', link: '/products?category=Allyl+Ethers+%26+Phthalates'},
          {_key: 'epox', label: 'Epoxides', link: '/products?category=Epoxides'},
          {_key: 'anh', label: 'Anhydrides & Curing Agents', link: '/products?category=Anhydrides+%26+Curing+Agents'},
          {_key: 'diols', label: 'Diols & Commodity', link: '/products?category=Diols+%26+Commodity'},
        ],
      },
      {
        _key: 'highperf',
        categoryName: 'High-Performance Resins',
        items: [
          {_key: 'pi', label: 'Polyimide Monomers', link: '/products?category=Polyimide+Monomers'},
          {_key: 'bmi', label: 'Bismaleimides & Thermosets', link: '/products?category=Bismaleimides+%26+Thermosets'},
          {_key: 'fl', label: 'Fluorene Derivatives', link: '/products?category=Fluorene+Derivatives'},
          {_key: 'ani', label: 'Anilines', link: '/products?category=Anilines'},
        ],
      },
      {
        _key: 'spec',
        categoryName: 'Specialty Chemicals',
        items: [
          {_key: 'si', label: 'Specialty Intermediates', link: '/products?category=Specialty+Intermediates'},
          {_key: 'adam', label: 'Adamantyl', link: '/products?category=Adamantyl'},
          {_key: 'tol', label: 'Toluidines', link: '/products?category=Toluidines'},
          {_key: 'all', label: 'All Products →', link: '/products'},
        ],
      },
    ],
  },
  {
    _id: 'navigationMenu.biopharma',
    _type: 'navigationMenu',
    title: 'Bio & Pharma',
    slug: {_type: 'slug', current: 'bio-pharma'},
    order: 1,
    flat: false,
    categories: [
      {
        _key: 'reagents',
        categoryName: 'Peptide & Amino Acid Reagents',
        items: [
          {_key: 'aa', label: 'Amino Acids & Derivatives', link: '/products?category=Bio+%26+Pharma'},
          {_key: 'glp1', label: 'GLP-1 Building Blocks', link: '/products/glp-1-peptide-building-blocks'},
          {_key: 'adc', label: 'ADC Linkers & Payloads', link: '/products/adc-cytotoxin-building-blocks'},
          {_key: 'macro', label: 'Macrocyclic Peptides', link: '/products/macrocyclic-peptide-building-blocks'},
        ],
      },
      {
        _key: 'rnd',
        categoryName: 'Research & Custom Synthesis',
        items: [
          {_key: 'cust', label: 'Custom Synthesis', link: '/solutions/custom-synthesis'},
          {_key: 'rnd2', label: 'Bio & Pharma R&D', link: '/markets/pharmaceuticals'},
        ],
      },
    ],
  },
  {
    _id: 'navigationMenu.optical',
    _type: 'navigationMenu',
    title: 'Optical',
    slug: {_type: 'slug', current: 'optical'},
    order: 2,
    flat: false,
    categories: [
      {
        _key: 'lens',
        categoryName: 'Lens Manufacturing',
        items: [
          {_key: 'lm', label: 'Manufacturing Materials', link: '/products?category=Lens+Manufacturing'},
          {_key: 'coat', label: 'Coatings (Varnish & Hydrophobic)', link: '/products?category=Optical+Coatings'},
        ],
      },
      {
        _key: 'optmat',
        categoryName: 'Optical Materials',
        items: [
          {_key: 'flu', label: 'Fluorene Monomers', link: '/products?category=Fluorene+Derivatives'},
          {_key: 'hri', label: 'High-Refractive-Index', link: '/products?tag=Optical+Materials'},
          {_key: 'cpi', label: 'Colorless Polyimide (CPI)', link: '/products?tag=Flexible+Displays'},
        ],
      },
    ],
  },
  {
    _id: 'navigationMenu.solutions',
    _type: 'navigationMenu',
    title: 'Solutions',
    slug: {_type: 'slug', current: 'solutions'},
    order: 3,
    flat: false,
    categories: [
      {
        _key: 'static',
        categoryName: 'Static & Dust Control',
        items: [
          {_key: 'overview', label: 'Overview', link: '/solutions/static-control'},
          {_key: 'ion', label: 'Air-less Ionizers', link: '/solutions/anti-static-ionizers'},
          {_key: 'web', label: 'Non-Contact Web Cleaners', link: '/solutions/non-contact-film-web-cleaner'},
          {_key: 'bench', label: 'Clean Benches', link: '/solutions/ionizing-clean-bench'},
          {_key: 'room', label: 'Cleanroom Construction', link: '/solutions/cleanroom-construction'},
          {_key: 'abf', label: 'Air-Blow-Free', link: '/solutions/air-blow-free-sustainability'},
        ],
      },
      {
        _key: 'sustain',
        categoryName: 'Sustainable Materials',
        items: [
          {_key: 'bio', label: 'Bio-Based Adipic Acid', link: '/products?category=Sustainable+Materials'},
        ],
      },
    ],
  },
  {
    _id: 'navigationMenu.markets',
    _type: 'navigationMenu',
    title: 'Markets',
    slug: {_type: 'slug', current: 'markets'},
    order: 4,
    flat: false,
    categories: [
      {
        _key: 'energy',
        categoryName: 'Energy & Mobility',
        items: [
          {_key: 'mcc', label: 'MCC — Battery-Grade Cellulose', link: '/products/mcc-battery-grade'},
          {_key: 'evbat', label: 'EV Battery Materials', link: '/products?tag=EV+Battery+Materials'},
          {_key: 'auto', label: 'Automotive', link: '/markets/automotive'},
        ],
      },
      {
        _key: 'industrial',
        categoryName: 'Industrial Materials',
        items: [
          {_key: 'elec', label: 'Electronics', link: '/markets/electronics'},
          {_key: 'semi', label: 'Semiconductor', link: '/markets/semiconductor'},
          {_key: 'aero', label: 'Aerospace', link: '/markets/aerospace'},
        ],
      },
      {
        _key: 'specialty',
        categoryName: 'Specialty Products',
        items: [
          {_key: 'opt', label: 'Optical Materials', link: '/markets/optical-materials'},
          {_key: 'filt', label: 'Filter Media', link: '/markets/filter-media'},
          {_key: 'coat', label: 'Coatings', link: '/markets/coatings'},
        ],
      },
      {
        _key: 'chemapp',
        categoryName: 'Chemical Applications',
        items: [
          {_key: 'pharma', label: 'Pharmaceuticals', link: '/markets/pharmaceuticals'},
          {_key: 'paint', label: 'Paint and Coatings', link: '/markets/paint-and-coatings'},
          {_key: 'adh', label: 'Adhesives', link: '/markets/adhesives'},
        ],
      },
    ],
  },
]

// Delete old menu IDs that are being replaced
const oldIds = ['navigationMenu.chemicals']
for (const id of oldIds) {
  try {
    await client.delete(id)
    console.log(`✗ Deleted old: ${id}`)
  } catch (e) {
    // ignore if doesn't exist
  }
}

for (const m of menus) {
  await client.createOrReplace(m)
  console.log(`✓ ${m.title}`)
}
console.log('Done.')
