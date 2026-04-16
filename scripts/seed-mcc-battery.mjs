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

const k = () => Math.random().toString(36).slice(2, 10)
const block = (t, style = 'normal') => ({
  _type: 'block',
  _key: k(),
  style,
  markDefs: [],
  children: [{_type: 'span', _key: k(), text: t, marks: []}],
})

// ────────────────────────────────────────────────────────────────────────────
// MCC (Microcrystalline Cellulose) — Battery-grade for Li-ion separator
// Spec-led SEO: application / performance / comparison / compliance clusters
// ────────────────────────────────────────────────────────────────────────────

const doc = {
  _id: 'product-mcc-battery-grade',
  _type: 'product',
  productType: 'battery',
  productName:
    'Battery-Grade Microcrystalline Cellulose (MCC) for Lithium-Ion Separator Coatings & Anode Binders',
  productCode: 'MCC-Battery',
  slug: {_type: 'slug', current: 'mcc-battery-grade'},
  category: 'EV Battery Materials',
  casNumber: '9004-34-6',
  iupacName: 'Microcrystalline cellulose',
  tscaStatus: 'Listed',
  htsCode: '3912.90.0000',
  descriptionShort:
    'Battery-grade Microcrystalline Cellulose (MCC) — a high-purity, rigid granular cellulose for advanced lithium-ion battery separator coatings and aqueous silicon-anode binders. Delivers measurable gains in electrolyte wetting angle (from ~50\u00B0 to <10\u00B0), thermal shrinkage resistance, and Li-ion migration number for next-generation EV cell designs.',

  descriptionLong: [
    // ── Role / Hero ────────────────────────────────────────────────────────
    block('Role in Lithium-Ion Batteries', 'h2'),
    block(
      'Microcrystalline Cellulose (MCC) is a high-purity, partially depolymerized crystalline cellulose supplied as a free-flowing white powder. In lithium-ion battery manufacturing, battery-grade MCC functions as (1) a functional coating on polypropylene (PP) and polyethylene (PE) separators to improve electrolyte wetting and thermal stability, and (2) an aqueous binder component for silicon and silicon-composite anodes where volume expansion demands mechanically robust, ion-permeable networks.',
    ),

    // ── Mechanism ──────────────────────────────────────────────────────────
    block('Mechanism: Rigid Granular Packing & Ion Transport', 'h2'),
    block(
      'Unlike cellulose nanofibers (CNF) which rely on fiber entanglement, MCC forms a rigid granular packing structure on the separator surface. The stacked crystalline domains create permeable ion transport pathways with tuned tortuosity \u2014 high enough to suppress dendrite growth, low enough to preserve ionic conductivity.',
    ),
    block(
      'The hydroxyl-rich MCC surface has strong interfacial affinity for polar carbonate electrolytes. On a PP separator, the MCC coating reduces the electrolyte contact angle from ~50\u00B0 (bare PP) to below 10\u00B0 \u2014 driving faster electrolyte wetting during cell formation, more uniform SEI formation, and higher first-cycle coulombic efficiency.',
    ),
    block(
      'For silicon-composite anodes, MCC\u2019s viscoelasticity and hydrogen-bond network accommodate up to 300% silicon volume expansion without delamination, outperforming CMC/SBR systems in capacity retention over extended cycling.',
    ),

    // ── Performance Data is now rendered from the performanceTable field
    //     (see below) as a semantic <table> for Google featured-snippet eligibility.

    // ── Comparison ─────────────────────────────────────────────────────────
    block('Comparison: MCC vs. CNF vs. CMC', 'h2'),
    block(
      'MCC vs. CNF (cellulose nanofibers): MCC delivers rigid granular packing with predictable tortuosity and lower slurry viscosity, enabling roll-to-roll coating at higher solids loading. CNF achieves mechanical reinforcement through fiber entanglement but requires aggressive dispersion and can clog micro-pores.',
    ),
    block(
      'MCC vs. CMC (carboxymethyl cellulose) binder: CMC provides ionic adhesion but swells excessively in electrolyte, reducing cycle life. MCC, supplied with or without surface carboxylation, offers tunable interfacial affinity with less swelling \u2014 critical for silicon anodes with repeated volume cycling.',
    ),

    // ── Application Routes ─────────────────────────────────────────────────
    block('Application Routes', 'h2'),
    block(
      '1. Aqueous separator coating: disperse 3\u20138 wt% MCC in water, apply by slot-die or gravure onto PP/PE separator, dry at 60\u201380\u00B0C. Typical coat weight 1\u20133 g/m\u00B2 per side.',
    ),
    block(
      '2. Silicon-anode aqueous binder: co-formulate MCC with CMC/SBR or PAA at 2\u20135 wt% of active material. Compatible with Si/graphite and Si/C composite anodes.',
    ),
    block(
      '3. Hybrid ceramic-cellulose separator: combine MCC with Al\u2082O\u2083 or boehmite for dual thermal + electrolyte-wetting functionality.',
    ),

    // ── Spec & Compliance ──────────────────────────────────────────────────
    block('Specifications & Compliance', 'h2'),
    block('CAS Number: 9004-34-6 \u00B7 IUPAC: Microcrystalline cellulose'),
    block('HTS / HTSUS: 3912.90.0000 (Cellulose and its chemical derivatives)'),
    block('TSCA: Listed \u00B7 REACH: Registered \u00B7 Food-grade and battery-grade specifications available'),
    block(
      'Typical grade options: particle size 20\u2013180 \u00B5m, degree of polymerization 150\u2013350, moisture <5%, heavy metals <10 ppm, sulfated ash <0.1%. Custom grades for specific coating rheology or anode binder compatibility available on request.',
    ),
  ],

  performanceTable: {
    caption:
      'Performance of MCC-coated polypropylene separator vs. uncoated PP baseline, measured at 25\u00B0C with standard 1 M LiPF\u2086 in EC/DEC electrolyte unless noted.',
    benchmarkLabel: 'Uncoated PP',
    rows: [
      {
        _key: 'r1',
        property: 'Electrolyte contact angle',
        value: '<10',
        unit: '\u00B0',
        benchmark: '~50',
        notes: 'Faster wetting during cell formation',
      },
      {
        _key: 'r2',
        property: 'Thermal shrinkage (150\u00B0C, 1 h)',
        value: '<3',
        unit: '%',
        benchmark: '>30',
        notes: 'Improved internal-short resistance',
      },
      {
        _key: 'r3',
        property: 'Capacity retention @ 100 cycles, 0.5C',
        value: '88\u201392',
        unit: '%',
        benchmark: '~75',
        notes: 'NMC622 / graphite half-cell',
      },
      {
        _key: 'r4',
        property: 'Li-ion migration number (t\u208A)',
        value: '0.45\u20130.55',
        unit: '',
        benchmark: '~0.35',
        notes: 'Lower concentration polarization',
      },
      {
        _key: 'r5',
        property: 'Dendrite growth onset',
        value: '>2\u00D7 delayed',
        unit: '',
        benchmark: 'baseline',
        notes: 'Accelerated Li-plating protocol',
      },
      {
        _key: 'r6',
        property: 'Gurley number (air permeability)',
        value: 'retained',
        unit: 's / 100 mL',
        benchmark: '',
        notes: 'Within ceramic-coated range',
      },
    ],
  },

  featureBullets: [
    'Electrolyte contact angle reduced from ~50\u00B0 to <10\u00B0 on PP separator',
    'Thermal shrinkage <3% at 150\u00B0C / 1 h (vs. >30% uncoated PP)',
    'Capacity retention 88\u201392% after 100 cycles at 0.5C',
    'Li-ion migration number (t+) optimized to 0.45\u20130.55',
    'Rigid granular packing \u2014 dendrite growth onset delayed >2\u00D7',
    'Aqueous processing \u2014 eliminates NMP solvent in separator coating',
    'Compatible with silicon-composite anode binders (CMC/SBR/PAA hybrids)',
    'CAS 9004-34-6 \u00B7 HTS 3912.90.0000 \u00B7 TSCA Listed \u00B7 REACH Registered',
  ],

  applicationTags: [
    'EV Battery Materials',
    'Battery Separator Coatings',
    'Silicon Anode Binders',
    'Lithium-Ion Batteries',
    'Sustainable Materials',
    'Aqueous Processing',
  ],

  seo: {
    title: 'Battery-Grade MCC (CAS 9004-34-6) | Li-Ion Separator Coating | MIKI USA',
    metaDescription:
      'Battery-grade Microcrystalline Cellulose (MCC) for Li-ion separator coatings and silicon-anode binders. Electrolyte wetting angle <10\u00B0, 88\u201392% capacity retention @ 100 cycles. CAS 9004-34-6, HTS 3912.90.0000.',
    keywords:
      'microcrystalline cellulose, MCC, battery-grade MCC, 9004-34-6, HTS 3912.90.0000, MCC battery separator coating, aqueous binder silicon anode, MCC modified PP separator, electrolyte wetting angle, Li-ion migration number, thermal shrinkage cellulose coating, MCC vs CNF, MCC vs CMC binder, rigid granular packing, dendrite growth inhibition, interfacial affinity, EV battery materials, REACH compliant battery materials, sustainable lithium-ion',
  },

  relatedProducts: [],
  featured: true,
}

try {
  await c.createOrReplace(doc)
  console.log(`\u2713 ${doc._id} upserted`)
  console.log(`  URL: /products/mcc-battery-grade`)
  console.log(`  CAS: ${doc.casNumber} \u00B7 HTS: ${doc.htsCode}`)
} catch (err) {
  console.error(`\u2717 ${doc._id} \u2014`, err?.message || err)
}
