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
const block = (t) => ({
  _type: 'block',
  _key: k(),
  style: 'normal',
  markDefs: [],
  children: [{_type: 'span', _key: k(), text: t, marks: []}],
})

// 1. Restore hero — but with first-person supplier language (no distributor hints)
await c
  .patch('homePage')
  .set({
    hero: {
      eyebrow: 'A Forest of Value',
      title: 'Miki Sangyo USA Inc.',
      subtitle:
        'A heritage of over 350 years delivering specialty chemicals and high-performance materials — from advanced industrial monomers to pharmaceutical-grade amino acids and peptide reagents.',
      primaryCta: {label: 'Browse Products', href: '/products'},
      secondaryCta: {label: 'Contact Our Team', href: '/contact'},
      pillars: [
        {_key: 'p1', icon: 'building', title: 'Professionalism', description: 'Deep expertise across specialty chemicals.'},
        {_key: 'p2', icon: 'globe', title: 'Flexibility', description: 'Custom solutions for every requirement.'},
        {_key: 'p3', icon: 'shield', title: 'Creativity', description: 'Innovation rooted in a 350-year heritage.'},
        {_key: 'p4', icon: 'box', title: '350+ Years Heritage', description: 'Trusted partnerships since 1674.'},
      ],
    },
  })
  .unset(['featuredProducts'])
  .commit()
console.log('✓ hero restored, featured cleared')

// 2. Stats — keep 5,000+ bio/pharma slot, restore the rest
await c
  .patch('siteSettings')
  .set({
    stats: [
      {_key: 's1', value: '350+', label: 'Years of Heritage'},
      {_key: 's2', value: '1967', label: 'Serving North America Since'},
      {_key: 's3', value: '5,000+', label: 'Bio & Pharma Reagents'},
      {_key: 's4', value: '5', label: 'Global Offices'},
    ],
  })
  .commit()
console.log('✓ stats updated (5,000+ kept)')

// 3. Scrub distributor / partner / "manufactured by" language from product descriptions
await c
  .patch('product.amino-acids-peptide-reagents')
  .set({
    descriptionShort:
      'A 5,000+ product catalog of high-purity amino acids, protected derivatives, peptide synthesis reagents, and resins — supplying leading pharmaceutical companies and academic research labs for over 40 years. Custom synthesis welcomed, including non-natural amino acid derivatives.',
    descriptionLong: [
      block(
        'Miki Sangyo offers one of the most comprehensive catalogs of amino acid and peptide synthesis building blocks available — over 5,000 products covering N-terminal and C-terminal protected amino acids, unique and unnatural amino acids, building blocks beyond amino acids, and a complete line of resins, coupling reagents, and solvents for solid-phase peptide synthesis.',
      ),
      block(
        'Our Boc-amino acid line was introduced in 1982. The catalog has expanded continuously since — Z-amino acids, Fmoc-amino acids, pre-loaded resins, and a deep specialty bench for non-natural amino acids and custom-built derivatives. Top pharmaceutical companies and renowned academic laboratories rely on this catalog for their most demanding programs.',
      ),
      block(
        'High purity is non-negotiable. Our internal purity criteria are set above conventional commercial grade, and every shipment is documented to meet pharmaceutical-program quality expectations.',
      ),
      block(
        'Custom synthesis is a core strength. Specialty capabilities include: linear alkyl side-chain amino acids and their N-methyl analogs, substituted phenylalanine derivatives, stable-isotope-labeled peptides, fluorescently labeled amino acids, photoaffinity probes, ADC peptide linkers (Val-Cit-pAB and Val-Ala-pAB families), N-methyl-PAL-PEG resins, and loading-controlled pre-loaded resins built to tight mmol/g targets.',
      ),
    ],
    featureBullets: [
      '5,000+ catalog products spanning Fmoc, Boc, Z, Aloc, Ac, and Trt protected amino acids',
      'Complete C-terminal protected ester and amide series',
      'D-amino acids, N-methyl amino acids, β-homo, ω-, phosphorylated, and substituted amino acids',
      'Pre-loaded Wang, Wang-PEG, and Cl-Trt(2-Cl) resins with controlled loading',
      'Coupling reagents, racemization suppressors, deprotection reagents, and SPPS solvents',
      'Custom synthesis of non-natural amino acid derivatives, dipeptides, tripeptides, and bulk programs',
      'In-house ADC peptide linkers and photoaffinity / fluorescent / isotope-labeled probes',
      '40+ years of dedicated peptide reagent manufacturing since 1982',
    ],
  })
  .commit()
console.log('✓ amino-acids parent scrubbed')

await c
  .patch('product.glp1-peptide-building-blocks')
  .set({
    descriptionLong: [
      block(
        'GLP-1 and dual / triple incretin agonists are the fastest-growing peptide therapeutic class. Their synthesis depends on a small set of unnatural amino acid building blocks that confer the protease resistance and half-life extension these drugs require — most notably α-aminoisobutyric acid (Aib) at positions 2 and 8, conformation-locking N-methyl residues, and γ-glutamyl C18 fatty diacid linkers for albumin binding.',
      ),
      block(
        'Miki Sangyo USA supplies pharmaceutical-grade Fmoc-Aib-OH, Boc-Aib-OH, the full N-methyl Fmoc amino acid series, fatty acid linker reagents, and pre-loaded Wang and Wang-PEG resins for SPPS of GLP-1-class peptides. Bulk and custom-loading orders are supported, including loading-controlled pre-loaded resins built to tight mmol/g targets.',
      ),
      block(
        'Custom synthesis is welcomed for analog programs requiring novel unnatural amino acids or specialized fatty acid spacers.',
      ),
    ],
    featureBullets: [
      'Fmoc-Aib-OH and Boc-Aib-OH (α-aminoisobutyric acid)',
      'N-methyl Fmoc amino acid series for backbone modification',
      'γ-Glu-C18 fatty diacid albumin-binding linker reagents',
      'Pre-loaded Wang and Wang-PEG resins with controlled loading',
      'Custom synthesis of novel GLP-1 program analogs',
      '40+ years of pharmaceutical-grade peptide reagent manufacturing',
    ],
  })
  .commit()
console.log('✓ glp1 scrubbed')

// Bio-based adipic acid — also scrub if needed (it didn't reference partners, but tighten)
await c
  .patch('product.biobased-adipic-acid')
  .set({
    descriptionLong: [
      block(
        'A breakthrough in sustainable chemistry: 100% bio-based adipic acid produced through microbial fermentation of inedible biomass waste. Unlike most bio-attributed products on the market that rely on a biomass-balance approach blending renewable and fossil-based feedstocks, this material is fully bio-derived from carbon to carbon.',
      ),
      block(
        'Conventional adipic acid manufacturing is one of the largest industrial sources of nitrous oxide (N₂O) — a greenhouse gas roughly 300 times more potent than CO₂. Our fermentation route is emission-free and avoids N₂O entirely, dramatically reducing the carbon and climate footprint of downstream products such as nylon 6,6, polyurethanes, plasticizers, and specialty polyesters.',
      ),
      block(
        'By using inedible biomass waste as the feedstock, the process avoids any competition with food supply and turns agricultural and forestry residues into a high-value building-block monomer for next-generation sustainable materials.',
      ),
    ],
  })
  .commit()
console.log('✓ bio adipic scrubbed')
