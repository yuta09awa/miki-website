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

await c
  .patch('product.amino-acids-peptide-reagents')
  .set({
    productName: 'Amino Acids, Derivatives & Peptide Reagents',
    descriptionShort:
      'A 5,000+ product catalog of high-purity amino acids, protected derivatives, peptide synthesis reagents, and resins — backed by 40+ years of supply to leading pharmaceutical companies and academic research labs. Custom synthesis welcomed, including non-natural amino acid derivatives.',
    descriptionLong: [
      block(
        'Through our specialist Japanese manufacturing partner, Miki Sangyo USA offers North American researchers and pharmaceutical manufacturers access to one of the most comprehensive catalogs of amino acid and peptide synthesis building blocks available — over 5,000 products covering N-terminal and C-terminal protected amino acids, unique and unnatural amino acids, building blocks beyond amino acids, and a complete line of resins, coupling reagents, and solvents for solid-phase peptide synthesis.',
      ),
      block(
        'Production of Boc-amino acids began in 1982. The catalog has expanded continuously since — Z-amino acids, Fmoc-amino acids, pre-loaded resins, and a deep specialty bench for non-natural amino acids and custom-built derivatives. The same quality, breadth, and technical depth trusted by top Japanese pharmaceutical companies and renowned academic laboratories is now available to U.S. customers through Miki Sangyo USA.',
      ),
      block(
        'High purity is non-negotiable. Internal purity criteria are set above conventional commercial grade, and every shipment is documented to meet pharmaceutical-program quality expectations.',
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
      'Custom synthesis of non-natural amino acid derivatives, dipeptides, tripeptides, and bulk manufacturing',
      'In-house production of ADC peptide linkers and photoaffinity / fluorescent / isotope-labeled probes',
      '40+ years of dedicated peptide reagent manufacturing since 1982',
    ],
    applicationTags: [
      'Peptide synthesis',
      'SPPS',
      'Drug discovery',
      'API intermediates',
      'Custom synthesis',
      'Unnatural amino acids',
      'ADC linkers',
      'GLP-1',
      'Macrocyclic peptides',
      'PROTAC',
      'Pharmaceutical R&D',
      'Academic research',
    ],
    seo: {
      title: 'Amino Acids & Peptide Reagents (5,000+) | Miki Sangyo USA',
      metaDescription:
        '5,000+ amino acids, Fmoc/Boc/Z derivatives, peptide reagents, and SPPS resins. Custom synthesis of non-natural amino acids, ADC linkers, and isotope-labeled peptides.',
      keywords:
        'amino acids, peptide reagents, Fmoc amino acids, Boc amino acids, unnatural amino acids, custom peptide synthesis, SPPS, ADC linkers, GLP-1 building blocks',
    },
    featured: true,
  })
  .commit()
console.log('✓ updated parent product')

const landings = [
  {
    _id: 'product.glp1-peptide-building-blocks',
    productName: 'GLP-1 & Metabolic Peptide Building Blocks',
    productCode: 'GLP1-BB',
    slug: 'glp1-peptide-building-blocks',
    short:
      'Specialty building blocks for GLP-1 receptor agonist programs — Aib (α-aminoisobutyric acid), N-methyl amino acids, and fatty-acid linker reagents used in semaglutide-, tirzepatide-, and retatrutide-class peptides.',
    long: [
      'GLP-1 and dual / triple incretin agonists are the fastest-growing peptide therapeutic class. Their synthesis depends on a small set of unnatural amino acid building blocks that confer the protease resistance and half-life extension these drugs require — most notably α-aminoisobutyric acid (Aib) at positions 2 and 8, conformation-locking N-methyl residues, and γ-glutamyl C18 fatty diacid linkers for albumin binding.',
      'Miki Sangyo USA supplies pharmaceutical-grade Fmoc-Aib-OH, Boc-Aib-OH, the full N-methyl Fmoc amino acid series, fatty acid linker reagents, and pre-loaded Wang and Wang-PEG resins for SPPS of GLP-1-class peptides. Bulk and custom-loading orders supported, including loading-controlled pre-loaded resins built to tight mmol/g targets.',
      'Custom synthesis is welcomed for analog programs requiring novel unnatural amino acids or specialized fatty acid spacers.',
    ],
    bullets: [
      'Fmoc-Aib-OH and Boc-Aib-OH (α-aminoisobutyric acid)',
      'N-methyl Fmoc amino acid series for backbone modification',
      'γ-Glu-C18 fatty diacid albumin-binding linker reagents',
      'Pre-loaded Wang and Wang-PEG resins with controlled loading',
      'Custom synthesis of novel GLP-1 program analogs',
      'Manufactured by a 40+ year peptide reagent specialist trusted by top global pharma',
    ],
    tags: [
      'GLP-1',
      'Semaglutide',
      'Tirzepatide',
      'Incretin agonists',
      'Aib',
      'N-methyl amino acids',
      'Metabolic disease',
      'SPPS',
      'Pharmaceutical R&D',
    ],
    seoTitle: 'GLP-1 Peptide Building Blocks (Aib, N-Methyl AAs) | Miki Sangyo USA',
    seoMeta:
      'Pharmaceutical-grade Aib, N-methyl amino acids, fatty acid linkers, and pre-loaded resins for GLP-1, tirzepatide, and incretin agonist peptide synthesis.',
  },
  {
    _id: 'product.adc-peptide-linkers',
    productName: 'ADC Peptide Linkers & Conjugation Reagents',
    productCode: 'ADC-LNK',
    slug: 'adc-peptide-linkers',
    short:
      'Cleavable peptide linkers and bifunctional building blocks for antibody-drug conjugate (ADC) programs — including Val-Cit-pAB and Val-Ala-pAB cathepsin-cleavable linkers, diamino-amino acids for branched payload attachment, and PEG-spaced bioconjugation reagents.',
    long: [
      'Cathepsin-cleavable peptide linkers are the workhorse chemistry of every approved antibody-drug conjugate. The Val-Cit-pAB and Val-Ala-pAB families are the dominant choices for tumor-selective payload release, and demand has accelerated dramatically as ADCs have moved from oncology niche to mainline standard of care.',
      'Miki Sangyo USA supplies the complete ADC linker building block set: Aloc- and Fmoc-protected Val-Cit-pAB and Val-Ala-pAB reagents (including the activated -pNP forms ready for payload coupling), diamino-amino acids (Lys, Orn, Dab, Dap) for branched payload architectures, PEG-spaced amino acid building blocks for solubility tuning, and N-monoprotected diamines for linker construction.',
      'Custom synthesis of novel cleavable linker variants, isotope-labeled tracers for ADC PK studies, and bulk quantities are all supported.',
    ],
    bullets: [
      'Val-Cit-pAB and Val-Ala-pAB cathepsin-cleavable linkers (Aloc, Fmoc, and -pNP activated forms)',
      'Diamino-amino acids: Lys, Orn, Dab, Dap for branched payload conjugation',
      'PEG-spaced amino acids and N-monoprotected diamines (Fmoc / Boc)',
      'Stable-isotope-labeled linker variants for ADC PK and metabolite studies',
      'Pre-loaded resins compatible with linker synthesis workflows',
      'Custom synthesis of novel cleavable linker chemistries',
    ],
    tags: [
      'ADC linkers',
      'Antibody-drug conjugates',
      'Val-Cit-pAB',
      'Val-Ala-pAB',
      'Cathepsin cleavable',
      'Bioconjugation',
      'Oncology',
      'Payload chemistry',
      'Custom synthesis',
    ],
    seoTitle: 'ADC Peptide Linkers (Val-Cit-pAB, Val-Ala-pAB) | Miki Sangyo USA',
    seoMeta:
      'Val-Cit-pAB, Val-Ala-pAB cathepsin-cleavable ADC linkers, diamino-amino acids, and PEG conjugation reagents for antibody-drug conjugate development.',
  },
  {
    _id: 'product.macrocyclic-oral-peptide-building-blocks',
    productName: 'Macrocyclic & Oral Peptide Building Blocks',
    productCode: 'MAC-BB',
    slug: 'macrocyclic-oral-peptide-building-blocks',
    short:
      'A specialty bench of unnatural amino acids that enable macrocyclic and orally bioavailable peptide therapeutics — β-homo, γ-, and ω-amino acids, D-amino acids, cyclic amino acids, Pro analogs, N-methyl, α-methyl, and substituted phenylalanine building blocks.',
    long: [
      'Macrocyclic peptides and orally bioavailable cyclic peptides are the most active frontier in modern peptide drug discovery. Their synthesis depends on a deep bench of unnatural amino acids that enable backbone constraint, protease resistance, conformational locking, and membrane permeability — areas where commercial availability is limited and quality varies widely.',
      'Miki Sangyo USA supplies the full specialty bench: β-homo and γ-amino acids for backbone foldamer chemistry, ω- and α-aminoalkanoic acids for ring closure and tether chemistry, D-amino acids in Fmoc-protected form, cyclic amino acids (excluding Pro / Pyr), 4-alkyl Pro and α-alkyl Pro analogs, pyrrolidine-3-carboxylic acid scaffolds, polycyclic aromatic amino acids, homoamino acids, and an extensive substituted phenylalanine series including biaryl Phe (Bph), 2-Ph and 3-Ph substituted Phe, and azo-Phe variants.',
      'Custom synthesis of novel unnatural amino acids and bulk quantities of catalog items are core capabilities. We are particularly well-suited to early-stage discovery programs that need 100 mg–10 g of a non-catalog building block on a tight timeline.',
    ],
    bullets: [
      'β-homo amino acids and γ-amino acids for foldamer chemistry',
      'D-amino acids (Fmoc-D-AA-OH series) for stability and topology',
      'Cyclic amino acids, α-alkyl Pro, 4-alkyl Pro, and Pro analogs',
      'Substituted phenylalanines: Fmoc-Phe(2-Ph), Fmoc-Phe(3-Ph), Fmoc-Bph, azo-Phe',
      'N-methyl and α-methyl amino acids for membrane permeability',
      'Linear alkyl side-chain amino acids and their N-methyl analogs',
      'Custom synthesis of novel unnatural amino acid scaffolds at discovery scale',
    ],
    tags: [
      'Macrocyclic peptides',
      'Oral peptides',
      'Unnatural amino acids',
      'D-amino acids',
      'β-amino acids',
      'N-methyl amino acids',
      'Foldamers',
      'Cyclic peptides',
      'Drug discovery',
      'Custom synthesis',
    ],
    seoTitle: 'Macrocyclic & Oral Peptide Building Blocks | Miki Sangyo USA',
    seoMeta:
      'Unnatural amino acids for macrocyclic and oral peptides — β-homo, γ-, D-, N-methyl, cyclic, and substituted phenylalanine building blocks. Custom synthesis available.',
  },
]

for (const p of landings) {
  await c.createOrReplace({
    _id: p._id,
    _type: 'product',
    productType: 'chemical',
    productName: p.productName,
    productCode: p.productCode,
    slug: {_type: 'slug', current: p.slug},
    category: 'Bio / Pharma',
    descriptionShort: p.short,
    descriptionLong: p.long.map(block),
    featureBullets: p.bullets,
    applicationTags: p.tags,
    seo: {title: p.seoTitle, metaDescription: p.seoMeta},
    featured: true,
  })
  console.log('✓', p._id)
}
