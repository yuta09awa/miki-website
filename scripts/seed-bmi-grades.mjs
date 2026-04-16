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

// ────────────────────────────────────────────────────────────────────────────
// BMI Grade Family — Bismaleimide monomers & oligomers
// ────────────────────────────────────────────────────────────────────────────

const products = [
  {
    _id: 'product-bmi-1000',
    slug: 'bmi-1000',
    productCode: 'BMI-1000',
    productName: 'BMI-1000 (4,4\u2032-Diphenylmethane Bismaleimide)',
    casNumber: '13676-54-5',
    iupacName: '1,1\u2032-(Methylenedi-4,1-phenylene)bismaleimide',
    descriptionShort:
      'BMI-1000 is the industry-standard 4,4\u2032-diphenylmethane bismaleimide \u2014 a high-purity crystalline bismaleimide monomer for electronic encapsulants, high-Tg thermoset composites, and heat-resistant adhesives. Forms thermally stable networks via Michael addition or radical homopolymerization.',
    descriptionLong: [
      block(
        'BMI-1000 (CAS 13676-54-5) is 4,4\u2032-diphenylmethane bismaleimide \u2014 the benchmark bismaleimide monomer for high-performance thermoset resin formulation. Crystalline yellow powder with a sharp melting range (147\u2013168 \u00b0C), it delivers exceptional thermal stability (Tg >300 \u00b0C after cure) and excellent electrical insulation for electronic packaging.',
      ),
      block(
        'Cures via radical or thermal homopolymerization of the maleimide double bonds, or via Michael addition with diamines (DDM, DDS) and diallyl co-monomers such as DABPA to form toughened BMI networks. Compatible with epoxy, cyanate ester, and benzoxazine co-resins to tailor Tg, toughness, and dielectric performance.',
      ),
      block(
        'Primary applications: aerospace prepregs, semiconductor encapsulants, copper-clad laminates for high-frequency PCBs, and high-temperature structural adhesives.',
      ),
    ],
    featureBullets: [
      'Melting point: 147\u2013168 \u00b0C (sharp range, high purity)',
      'Cured Tg > 300 \u00b0C',
      'Low dielectric constant and dissipation factor after cure',
      'Soluble in NMP, DMF, DMAc for prepreg and varnish formulation',
      'Crosslinks via Michael addition with diamines or diallyl co-monomers',
      'Industry-standard BMI building block for high-performance composites',
    ],
    applicationTags: [
      'Bismaleimides',
      'Aerospace Composites',
      'Electronic Encapsulation',
      'High-Frequency Laminates',
      'High-Performance Resins',
    ],
    chemicalSpecs: {mp_c: '147\u2013168', tg_c: '>300'},
    seo: {
      title: 'BMI-1000 CAS 13676-54-5 | 4,4\u2032-Diphenylmethane Bismaleimide | MIKI USA',
      metaDescription:
        'High-purity BMI-1000 (CAS 13676-54-5), 4,4\u2032-diphenylmethane bismaleimide monomer for aerospace composites, semiconductor encapsulants, and high-frequency laminates. Tg > 300 \u00b0C.',
      keywords:
        'BMI-1000, 13676-54-5, 4,4\u2032-diphenylmethane bismaleimide, MDA BMI, bismaleimide monomer, aerospace prepreg, BMI resin, high-Tg thermoset, DDM bismaleimide, electronic encapsulant, high-frequency laminate',
    },
  },

  {
    _id: 'product-bmi-2300',
    slug: 'bmi-2300',
    productCode: 'BMI-2300',
    productName: 'BMI-2300 (Polyphenylmethane Bismaleimide Oligomer)',
    casNumber: '67784-74-1',
    iupacName: 'Poly(methylene)polyphenyl polybismaleimide',
    descriptionShort:
      'BMI-2300 is a polyphenylmethane maleimide oligomer \u2014 a multi-functional bismaleimide for toughened high-Tg thermoset networks. Its oligomeric structure increases crosslink density and thermal stability relative to monomeric BMIs.',
    descriptionLong: [
      block(
        'BMI-2300 (CAS 67784-74-1) is a polymethylene polyphenyl polybismaleimide oligomer derived from polymeric MDA. The multi-functional structure yields highly crosslinked networks with elevated Tg, improved char yield, and superior retention of mechanical properties at temperatures above 250 \u00b0C.',
      ),
      block(
        'Processed as a melt or solution-blended with BMI-1000, DABPA, or diamine co-reactants to balance toughness and thermal performance. Supplied as a yellow-brown flake with melting range 125\u2013160 \u00b0C, soluble in polar aprotic solvents for prepreg and varnish formulation.',
      ),
      block(
        'Primary applications: aerospace structural composites, high-temperature adhesives, BMI-modified epoxy laminates, and semiconductor molding compounds requiring extreme thermal endurance.',
      ),
    ],
    featureBullets: [
      'Melting range: 125\u2013160 \u00b0C',
      'Multi-functional BMI oligomer \u2014 higher crosslink density than monomeric BMIs',
      'Excellent thermal stability and char retention above 300 \u00b0C',
      'Soluble in NMP, DMF, DMAc for solution processing',
      'Tougheness modifier for BMI-1000 / DDM-BMI systems',
      'Compatible with DABPA, DDS, and epoxy co-resins',
    ],
    applicationTags: [
      'Bismaleimides',
      'Aerospace Composites',
      'Semiconductor Packaging',
      'High-Performance Resins',
      'Electronic Encapsulation',
    ],
    chemicalSpecs: {mp_c: '125\u2013160'},
    seo: {
      title: 'BMI-2300 CAS 67784-74-1 | Polyphenylmethane Bismaleimide Oligomer | MIKI USA',
      metaDescription:
        'BMI-2300 (CAS 67784-74-1), multi-functional polyphenylmethane bismaleimide oligomer for high-Tg aerospace composites, semiconductor molding, and BMI-modified epoxy laminates.',
      keywords:
        'BMI-2300, 67784-74-1, polyphenylmethane bismaleimide, polymeric BMI, multi-functional bismaleimide, BMI oligomer, aerospace composite, high-Tg thermoset, semiconductor molding compound',
    },
  },

  {
    _id: 'product-bmi-3000h',
    slug: 'bmi-3000h',
    productCode: 'BMI-3000H',
    productName: 'BMI-3000H (N,N\u2032-m-Phenylene Bismaleimide)',
    casNumber: '3006-93-7',
    iupacName: 'N,N\u2032-(1,3-Phenylene)dimaleimide',
    descriptionShort:
      'BMI-3000H is N,N\u2032-m-phenylene bismaleimide \u2014 a specialty rubber vulcanization crosslinker and thermoset co-agent. Used to increase crosslink density, heat resistance, and hardness of peroxide-cured elastomers and as a reactive modifier in resin systems.',
    descriptionLong: [
      block(
        'BMI-3000H (CAS 3006-93-7) is N,N\u2032-m-phenylene bismaleimide \u2014 a yellow crystalline bismaleimide best known as a rubber vulcanization crosslinker and peroxide co-agent. The rigid m-phenylene backbone produces tight, thermally stable crosslinks that dramatically improve heat resistance, tear strength, and compression set of cured elastomers.',
      ),
      block(
        'In elastomer compounds it acts as a radical-trap co-agent for EPDM, HNBR, and CR, enabling high-temperature service (>200 \u00b0C). In thermoset resins it serves as a chain extender and crosslink booster for BMI-1000/DABPA networks, and as a reactive diluent in BMI varnishes.',
      ),
      block(
        'Safety: handle with appropriate PPE \u2014 skin/eye irritant and respiratory sensitizer. Avoid dust generation; store below 40 \u00b0C away from peroxides and strong bases.',
      ),
    ],
    featureBullets: [
      'Rigid m-phenylene backbone \u2014 highest crosslink density of the BMI family',
      'Peroxide co-agent for EPDM, HNBR, CR rubber vulcanization',
      'Raises cured rubber heat resistance above 200 \u00b0C',
      'Improves tear strength and compression set of elastomers',
      'Reactive modifier for BMI-1000 / DABPA thermoset networks',
      'High thermal stability \u2014 minimal weight loss below 300 \u00b0C',
    ],
    applicationTags: [
      'Bismaleimides',
      'Rubber Vulcanization',
      'Specialty Elastomers',
      'High-Performance Resins',
      'Electronic Encapsulation',
    ],
    seo: {
      title: 'BMI-3000H CAS 3006-93-7 | m-Phenylene Bismaleimide Crosslinker | MIKI USA',
      metaDescription:
        'BMI-3000H (CAS 3006-93-7), N,N\u2032-m-phenylene bismaleimide rubber vulcanization crosslinker and peroxide co-agent for EPDM, HNBR, CR elastomers. Heat resistance >200 \u00b0C.',
      keywords:
        'BMI-3000H, 3006-93-7, m-phenylene bismaleimide, N,N\u2032-(1,3-phenylene)dimaleimide, rubber vulcanization crosslinker, peroxide co-agent, EPDM crosslinker, HNBR, bismaleimide monomer, heat-resistant rubber',
    },
  },

  {
    _id: 'product-bmi-5100',
    slug: 'bmi-5100',
    productCode: 'BMI-5100',
    productName: 'BMI-5100 (3,3\u2032-Dimethyl-5,5\u2032-Diethyl-4,4\u2032-Diphenylmethane Bismaleimide)',
    casNumber: '105391-33-1',
    iupacName:
      '1,1\u2032-[Methylenebis(3-ethyl-6-methyl-4,1-phenylene)]bismaleimide',
    descriptionShort:
      'BMI-5100 is a tetra-alkyl substituted diphenylmethane bismaleimide. The bulky ortho methyl/ethyl groups lower melt viscosity, improve solubility, and deliver toughened BMI networks with reduced dielectric loss for high-frequency electronics.',
    descriptionLong: [
      block(
        'BMI-5100 (CAS 105391-33-1) is 3,3\u2032-dimethyl-5,5\u2032-diethyl-4,4\u2032-diphenylmethane bismaleimide \u2014 a sterically hindered BMI designed to overcome the brittleness and poor solubility of unsubstituted MDA-BMI. The ortho-alkyl substitution disrupts chain packing, yielding a lower melting range (140\u2013158 \u00b0C), improved solubility in common solvents, and reduced cured-resin brittleness.',
      ),
      block(
        'Cures via thermal radical polymerization or Michael addition with diamines and DABPA. The alkyl substitution also lowers water uptake and dielectric constant of the cured network \u2014 a key advantage for high-frequency PCB laminates and 5G antenna substrates.',
      ),
      block(
        'Primary applications: low-Dk high-frequency laminates, toughened aerospace prepregs, and electronic encapsulants where processability and dielectric performance are both critical.',
      ),
    ],
    featureBullets: [
      'Melting range: 140\u2013158 \u00b0C',
      'Tetra-alkyl substitution \u2014 lower Dk/Df than MDA-BMI',
      'Improved solubility in NMP, DMF, DMAc, acetone',
      'Toughened cured network \u2014 reduced brittleness',
      'Low water absorption for humid-environment stability',
      'Ideal for 5G / high-frequency PCB laminates',
    ],
    applicationTags: [
      'Bismaleimides',
      '5G / High-Frequency Laminates',
      'Aerospace Composites',
      'Electronic Encapsulation',
      'High-Performance Resins',
    ],
    chemicalSpecs: {mp_c: '140\u2013158'},
    seo: {
      title: 'BMI-5100 CAS 105391-33-1 | Alkylated Diphenylmethane Bismaleimide | MIKI USA',
      metaDescription:
        'BMI-5100 (CAS 105391-33-1), tetra-alkyl substituted diphenylmethane bismaleimide. Low-Dk, toughened BMI monomer for 5G high-frequency laminates and aerospace prepregs.',
      keywords:
        'BMI-5100, 105391-33-1, alkylated bismaleimide, low Dk BMI, toughened bismaleimide, 5G laminate resin, high-frequency PCB, aerospace prepreg, hindered BMI monomer',
    },
  },

  {
    _id: 'product-bmi-tmh',
    slug: 'bmi-tmh',
    productCode: 'BMI-TMH',
    productName: 'BMI-TMH (1,6-Bismaleimide-(2,2,4-Trimethyl)hexane)',
    casNumber: '39979-46-9',
    iupacName: '1,1\u2032-(2,2,4-Trimethylhexane-1,6-diyl)bismaleimide',
    descriptionShort:
      'BMI-TMH is an aliphatic bismaleimide with a branched trimethylhexane spacer \u2014 a low-viscosity liquid BMI that acts as a reactive diluent and flexibilizer for aromatic BMI, epoxy, and UV-cure systems.',
    descriptionLong: [
      block(
        'BMI-TMH (CAS 39979-46-9) is 1,6-bismaleimide-(2,2,4-trimethyl)hexane \u2014 an aliphatic bismaleimide with a flexible, branched C6 spacer. Unlike aromatic BMIs, it is a low-melting (73\u2013110 \u00b0C) semi-liquid that flows easily at moderate temperatures, making it an excellent reactive diluent.',
      ),
      block(
        'The flexible aliphatic backbone dramatically tougheness BMI-1000 and BMI-5100 networks, lowers cure-shrinkage, and improves processability of prepreg and RTM resin systems. Also used as a UV- and radical-curable monomer in 3D printing resins, specialty adhesives, and dental composite formulations.',
      ),
      block(
        'Compatible with diamine and DABPA co-reactants; miscible with acrylate, methacrylate, and epoxy resins for hybrid network design.',
      ),
    ],
    featureBullets: [
      'Melting range: 73\u2013110 \u00b0C (low-viscosity aliphatic BMI)',
      'Flexible C6 spacer \u2014 toughens aromatic BMI networks',
      'Reactive diluent for BMI-1000 / BMI-5100 prepreg systems',
      'UV and radical curable \u2014 usable in photopolymer resins',
      'Lower cure shrinkage than aromatic BMIs',
      'Miscible with epoxy, acrylate, methacrylate co-resins',
    ],
    applicationTags: [
      'Bismaleimides',
      'High-Performance Resins',
      'Photopolymer Resins',
      'Aerospace Composites',
      'Specialty Adhesives',
    ],
    chemicalSpecs: {mp_c: '73\u2013110'},
    seo: {
      title: 'BMI-TMH CAS 39979-46-9 | Aliphatic Bismaleimide Reactive Diluent | MIKI USA',
      metaDescription:
        'BMI-TMH (CAS 39979-46-9), aliphatic 1,6-bismaleimide-(2,2,4-trimethyl)hexane. Low-viscosity reactive diluent and toughener for BMI, epoxy, and UV-cure resin systems.',
      keywords:
        'BMI-TMH, 39979-46-9, aliphatic bismaleimide, trimethylhexane bismaleimide, BMI reactive diluent, BMI toughener, UV-curable bismaleimide, photopolymer monomer, flexible BMI',
    },
  },

  {
    _id: 'product-dabpa',
    slug: 'dabpa',
    productCode: 'DABPA',
    productName: 'DABPA (2,2\u2032-Diallyl Bisphenol A)',
    casNumber: '1745-89-7',
    iupacName: '4,4\u2032-(Propane-2,2-diyl)bis(2-allylphenol)',
    descriptionShort:
      'DABPA is 2,2\u2032-diallyl bisphenol A \u2014 the benchmark co-monomer for toughening bismaleimide resins. Reacts with BMI via "ene" and Michael addition to form BMI/DABPA networks with excellent toughness, thermal stability, and processability. Currently at developing-stage availability.',
    descriptionLong: [
      block(
        'DABPA (CAS 1745-89-7) is 2,2\u2032-diallyl bisphenol A \u2014 the industry-standard co-monomer for toughening bismaleimide (BMI) resins. The allyl groups react with maleimide double bonds via an "ene" reaction followed by Diels\u2013Alder and Michael addition, while the bisphenol-A backbone contributes processability and toughness to the cured network.',
      ),
      block(
        'BMI/DABPA blends (typically 1:0.87 molar ratio) are the core chemistry behind commercial toughened BMI prepregs for aerospace structural composites, radomes, and high-temperature printed circuit boards. The phenolic hydroxyls can also co-cure with epoxy resins for hybrid BMI/epoxy networks.',
      ),
      block(
        'Product status: developing stage \u2014 contact MIKI USA technical sales for sample quantities, pilot lot availability, and formulation support.',
      ),
    ],
    featureBullets: [
      'Benchmark toughening co-monomer for bismaleimide resins',
      'Reacts with BMI via "ene" and Michael addition',
      'Produces tough, void-free BMI/DABPA prepreg networks',
      'Compatible with BMI-1000, BMI-2300, BMI-5100',
      'Phenolic OH enables hybrid BMI/epoxy co-cure',
      'Developing stage \u2014 contact sales for pilot samples',
    ],
    applicationTags: [
      'Bismaleimides',
      'Aerospace Composites',
      'High-Performance Resins',
      'Electronic Encapsulation',
      'High-Frequency Laminates',
    ],
    seo: {
      title: 'DABPA CAS 1745-89-7 | 2,2\u2032-Diallyl Bisphenol A BMI Co-Monomer | MIKI USA',
      metaDescription:
        'DABPA (CAS 1745-89-7), 2,2\u2032-diallyl bisphenol A \u2014 benchmark BMI toughening co-monomer for aerospace prepregs and high-temperature laminates. Developing-stage availability.',
      keywords:
        'DABPA, 1745-89-7, 2,2\u2032-diallyl bisphenol A, BMI co-monomer, bismaleimide toughener, BMI/DABPA prepreg, aerospace composite resin, ene reaction, allyl phenol',
    },
  },
]

for (const p of products) {
  const {_id, slug, ...rest} = p
  const doc = {
    _id,
    _type: 'product',
    productType: 'chemical',
    slug: {_type: 'slug', current: slug},
    category: 'Bismaleimide (BMI)',
    tscaStatus: 'N/A',
    ...rest,
  }
  try {
    await c.createOrReplace(doc)
    console.log(`\u2713 ${_id} (${p.productCode}) upserted`)
  } catch (err) {
    console.error(`\u2717 ${_id} \u2014`, err?.message || err)
  }
}
