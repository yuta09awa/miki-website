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
// Polyimide backbone monomers — dianhydrides (a-BPDA, s-BPDA) + diamines
// ────────────────────────────────────────────────────────────────────────────

const products = [
  // ── Dianhydrides ─────────────────────────────────────────────────────────
  {
    _id: 'product-a-bpda',
    slug: 'a-bpda',
    productCode: 'a-BPDA',
    category: 'Dianhydride',
    productName: 'a-BPDA (2,3,3\u2032,4\u2032-Biphenyltetracarboxylic Dianhydride)',
    casNumber: '36978-41-3',
    descriptionShort:
      'a-BPDA is the asymmetric 2,3,3\u2032,4\u2032 isomer of biphenyltetracarboxylic dianhydride \u2014 a specialty dianhydride that yields soluble, low-CTE polyimides with enhanced processability over the symmetric s-BPDA. Ideal for solution-cast polyimide films and flexible electronics.',
    descriptionLong: [
      block(
        'a-BPDA (CAS 36978-41-3) is the asymmetric 2,3,3\u2032,4\u2032-biphenyltetracarboxylic dianhydride isomer. Unlike the symmetric s-BPDA, the kinked asymmetric structure disrupts chain packing to produce soluble, amorphous polyimides while retaining the low coefficient of thermal expansion (CTE) characteristic of rigid-rod polyimide backbones.',
      ),
      block(
        'Reacts with aromatic diamines (p-PDA, 4,4\u2032-ODA, TFMB) to form polyamic acids that imidize thermally or chemically. The resulting polyimides combine low CTE (<20 ppm/\u00b0C), high Tg (>300 \u00b0C), and solvent solubility \u2014 enabling solution-cast films, spin-coated dielectric layers, and flexible substrates for OLED displays.',
      ),
      block(
        'Primary applications: flexible display substrates, low-CTE interlayer dielectrics, colorless polyimide films, and aerospace polyimide composites.',
      ),
    ],
    featureBullets: [
      'Asymmetric 2,3,3\u2032,4\u2032-BPDA isomer \u2014 solubility with low CTE',
      'Yields soluble, amorphous polyimides vs. crystalline s-BPDA',
      'Low CTE < 20 ppm/\u00b0C in rigid-rod polyimide formulations',
      'Tg > 300 \u00b0C after thermal imidization',
      'Enables solution casting and spin-coating process',
      'Ideal for flexible display substrates and CPI films',
    ],
    applicationTags: [
      'Polyimides',
      'Flexible Displays',
      'Semiconductor Packaging',
      'Optical Materials',
      'Aerospace Composites',
    ],
    seo: {
      title: 'a-BPDA CAS 36978-41-3 | Asymmetric Biphenyl Dianhydride | MIKI USA',
      metaDescription:
        'a-BPDA (CAS 36978-41-3), asymmetric 2,3,3\u2032,4\u2032-biphenyltetracarboxylic dianhydride for soluble low-CTE polyimides, flexible displays, and colorless polyimide films.',
      keywords:
        'a-BPDA, 36978-41-3, asymmetric BPDA, 2,3,3\u2032,4\u2032-biphenyltetracarboxylic dianhydride, soluble polyimide, low CTE polyimide, flexible display polyimide, CPI precursor',
    },
  },
  {
    _id: 'product-s-bpda',
    slug: 's-bpda',
    productCode: 's-BPDA',
    category: 'Dianhydride',
    productName: 's-BPDA (3,3\u2032,4,4\u2032-Biphenyltetracarboxylic Dianhydride)',
    casNumber: '2420-87-3',
    descriptionShort:
      's-BPDA is the symmetric 3,3\u2032,4,4\u2032-biphenyltetracarboxylic dianhydride \u2014 the classic rigid-rod dianhydride for ultra-low CTE polyimides such as Upilex-type films. Delivers the highest thermal and dimensional stability in the polyimide monomer family.',
    descriptionLong: [
      block(
        's-BPDA (CAS 2420-87-3) is 3,3\u2032,4,4\u2032-biphenyltetracarboxylic dianhydride \u2014 the symmetric rigid-rod dianhydride used to manufacture Upilex-type polyimide films. Its coplanar biphenyl core yields highly ordered, semi-crystalline polyimide chains with the lowest CTE (3\u20138 ppm/\u00b0C) of any commercial polyimide.',
      ),
      block(
        'Reacts with aromatic diamines (p-PDA in particular) to form BPDA-PDA polyamic acid \u2014 the precursor for ultra-thin, dimensionally stable dielectric films used in semiconductor interlayer dielectrics, flexible printed circuits, and high-temperature insulation. Tg exceeds 350 \u00b0C; decomposition above 550 \u00b0C.',
      ),
      block(
        'Primary applications: semiconductor buffer coatings, flexible printed circuit substrates, MEMS passivation, and aerospace insulation films.',
      ),
    ],
    featureBullets: [
      'Symmetric rigid-rod dianhydride \u2014 lowest CTE polyimide monomer',
      'CTE as low as 3\u20138 ppm/\u00b0C in BPDA-PDA system',
      'Tg > 350 \u00b0C, Td > 550 \u00b0C',
      'Precursor for Upilex-type polyimide films',
      'High chemical resistance and low moisture uptake',
      'Industry standard for semiconductor buffer coatings',
    ],
    applicationTags: [
      'Polyimides',
      'Semiconductor Packaging',
      'Flexible Displays',
      'Aerospace Composites',
      'Electronic Encapsulation',
    ],
    seo: {
      title: 's-BPDA CAS 2420-87-3 | Symmetric Biphenyl Dianhydride | MIKI USA',
      metaDescription:
        's-BPDA (CAS 2420-87-3), symmetric 3,3\u2032,4,4\u2032-biphenyltetracarboxylic dianhydride for ultra-low CTE polyimide films, Upilex-type chemistry, and semiconductor buffer coatings.',
      keywords:
        's-BPDA, 2420-87-3, 3,3\u2032,4,4\u2032-biphenyltetracarboxylic dianhydride, symmetric BPDA, Upilex, BPDA-PDA, low CTE polyimide, semiconductor buffer coating, rigid-rod polyimide',
    },
  },

  // ── Diamines ─────────────────────────────────────────────────────────────
  {
    _id: 'product-p-pda',
    slug: 'p-pda',
    productCode: 'p-PDA',
    category: 'Diamine',
    productName: 'p-PDA (p-Phenylenediamine)',
    casNumber: '106-50-3',
    descriptionShort:
      'p-PDA is the rigid p-phenylenediamine \u2014 the classic low-CTE diamine for Upilex-type polyimide chemistry. Paired with BPDA or PMDA to yield the highest-modulus, lowest-CTE polyimide films in the industry.',
    descriptionLong: [
      block(
        'p-PDA (CAS 106-50-3) is 1,4-phenylenediamine \u2014 the rigid para-substituted aromatic diamine that, combined with s-BPDA, produces the lowest-CTE commercial polyimides (BPDA-PDA / Upilex-S chemistry).',
      ),
      block(
        'The linear p-phenylene structure enforces chain alignment and crystallinity in the polyamic acid \u2014 after thermal imidization, the film exhibits CTE as low as 3 ppm/\u00b0C, tensile modulus above 9 GPa, and Tg above 350 \u00b0C.',
      ),
      block(
        'Primary applications: semiconductor interlayer dielectrics, flexible printed circuit base films, MEMS passivation, and high-temperature wire insulation.',
      ),
    ],
    featureBullets: [
      'Rigid linear para-aromatic diamine',
      'Enables CTE as low as 3 ppm/\u00b0C in BPDA-PDA polyimide',
      'Yields high-modulus (>9 GPa) polyimide films',
      'Tg > 350 \u00b0C after imidization',
      'Industry standard for Upilex-type chemistry',
      'Low moisture uptake \u2014 stable electrical performance',
    ],
    applicationTags: [
      'Polyimides',
      'Semiconductor Packaging',
      'Flexible Displays',
      'Electronic Encapsulation',
    ],
    seo: {
      title: 'p-PDA CAS 106-50-3 | p-Phenylenediamine Polyimide Monomer | MIKI USA',
      metaDescription:
        'High-purity p-PDA (CAS 106-50-3), p-phenylenediamine diamine for ultra-low CTE polyimide films, BPDA-PDA / Upilex chemistry, and semiconductor interlayer dielectrics.',
      keywords:
        'p-PDA, 106-50-3, p-phenylenediamine, 1,4-phenylenediamine, BPDA-PDA, Upilex diamine, low CTE polyimide, rigid diamine, polyimide monomer',
    },
  },
  {
    _id: 'product-m-pda',
    slug: 'm-pda',
    productCode: 'm-PDA',
    category: 'Diamine',
    productName: 'm-PDA (m-Phenylenediamine)',
    casNumber: '108-45-2',
    descriptionShort:
      'm-PDA is m-phenylenediamine \u2014 a kinked aromatic diamine used to produce soluble, amorphous polyimides and high-Tg epoxy curing agents. The meta linkage improves processability versus p-PDA while retaining thermal stability.',
    descriptionLong: [
      block(
        'm-PDA (CAS 108-45-2) is 1,3-phenylenediamine \u2014 the meta-substituted aromatic diamine. The kinked meta geometry produces amorphous polyimides with improved solubility in NMP and DMAc over the rigid-rod p-PDA grade.',
      ),
      block(
        'Reacts with aromatic dianhydrides (BPDA, ODPA, 6FDA) to form soluble polyamic acids for solution-cast films and spin-coated dielectric layers. Also serves as a high-performance aromatic curing agent for epoxy resins in aerospace prepregs and filament-wound composites.',
      ),
      block(
        'Primary applications: soluble polyimides for electronics, epoxy curing agent for aerospace composites, and intermediate for specialty aromatic polymers.',
      ),
    ],
    featureBullets: [
      'Kinked meta aromatic diamine \u2014 soluble polyimides',
      'Yields amorphous, processable polyimide films',
      'High-Tg aromatic curing agent for epoxy resins',
      'Compatible with BPDA, ODPA, 6FDA dianhydrides',
      'Good solubility in NMP, DMAc, DMF',
      'Intermediate for specialty aromatic polymers',
    ],
    applicationTags: [
      'Polyimides',
      'Aerospace Composites',
      'High-Performance Resins',
      'Electronic Encapsulation',
    ],
    seo: {
      title: 'm-PDA CAS 108-45-2 | m-Phenylenediamine Polyimide Monomer | MIKI USA',
      metaDescription:
        'High-purity m-PDA (CAS 108-45-2), m-phenylenediamine for soluble polyimides, high-Tg epoxy curing agent, and aerospace composite resin formulation.',
      keywords:
        'm-PDA, 108-45-2, m-phenylenediamine, 1,3-phenylenediamine, soluble polyimide, epoxy curing agent, aerospace curing agent, aromatic diamine, polyimide monomer',
    },
  },
  {
    _id: 'product-3-4-oda',
    slug: '3-4-oda',
    productCode: '3,4\u2032-ODA',
    category: 'Diamine',
    productName: '3,4\u2032-ODA (3,4\u2032-Oxydianiline)',
    casNumber: '2657-87-6',
    descriptionShort:
      '3,4\u2032-ODA is the asymmetric oxydianiline isomer \u2014 a diamine that yields soluble, low dielectric constant polyimides with balanced Tg (~274 \u00b0C) and Dk ~3.2. Ideal where both solubility and dielectric performance are needed.',
    descriptionLong: [
      block(
        '3,4\u2032-ODA (CAS 2657-87-6) is 3,4\u2032-oxydianiline \u2014 the asymmetric oxydianiline isomer. The offset ether linkage disrupts chain packing to produce amorphous, solvent-soluble polyimides that retain low dielectric constant (Dk ~3.2) and low dissipation factor (Df ~0.0085).',
      ),
      block(
        'Reacts with aromatic dianhydrides (BPDA, ODPA, 6FDA) to form soluble polyamic acids for spin-coated and solution-cast films. Balanced Tg of ~274 \u00b0C and improved processability make it a preferred choice for semiconductor packaging dielectrics and flexible circuit base films.',
      ),
      block(
        'Primary applications: low-Dk semiconductor dielectrics, flexible printed circuits, colorless polyimide films, and high-frequency laminates.',
      ),
    ],
    featureBullets: [
      'Asymmetric 3,4\u2032-oxydianiline diamine',
      'Tg \u2248 274 \u00b0C after imidization',
      'Low Dk \u2248 3.2, Df \u2248 0.0085',
      'Soluble, amorphous polyimide networks',
      'Process flexibility for spin-coating and casting',
      'Balanced thermal/dielectric/solubility profile',
    ],
    applicationTags: [
      'Polyimides',
      'Semiconductor Packaging',
      '5G / High-Frequency Laminates',
      'Flexible Displays',
      'Electronic Encapsulation',
    ],
    chemicalSpecs: {tg_c: '274', dielectricConstant: '3.2', dissipationFactor: '0.0085'},
    seo: {
      title: '3,4\u2032-ODA CAS 2657-87-6 | Asymmetric Oxydianiline | MIKI USA',
      metaDescription:
        '3,4\u2032-ODA (CAS 2657-87-6), asymmetric 3,4\u2032-oxydianiline diamine for soluble low-Dk polyimides, semiconductor dielectrics, and flexible circuit films. Tg 274 \u00b0C.',
      keywords:
        '3,4\u2032-ODA, 2657-87-6, 3,4\u2032-oxydianiline, asymmetric oxydianiline, low Dk polyimide, soluble polyimide diamine, semiconductor dielectric, flexible circuit base film',
    },
  },
  {
    _id: 'product-4-4-oda',
    slug: '4-4-oda',
    productCode: '4,4\u2032-ODA',
    category: 'Diamine',
    productName: '4,4\u2032-ODA (4,4\u2032-Oxydianiline)',
    casNumber: '101-80-4',
    descriptionShort:
      '4,4\u2032-ODA is the classic 4,4\u2032-oxydianiline \u2014 paired with PMDA to produce Kapton-type polyimide, the world\u2019s most widely used aromatic polyimide film. Excellent thermal stability, electrical insulation, and chemical resistance.',
    descriptionLong: [
      block(
        '4,4\u2032-ODA (CAS 101-80-4) is 4,4\u2032-oxydianiline \u2014 the diamine that, combined with pyromellitic dianhydride (PMDA), yields PMDA-ODA polyamic acid (Kapton precursor). The resulting polyimide film delivers Tg above 390 \u00b0C, continuous service above 260 \u00b0C, and outstanding electrical insulation across a wide temperature range.',
      ),
      block(
        'The symmetric para-ether linkage provides chain flexibility for processability while retaining high thermal stability and chemical resistance. Also used with BPDA, BTDA, and 6FDA to produce a wide range of polyimide grades for electronics, aerospace, and industrial insulation.',
      ),
      block(
        'Primary applications: Kapton-type polyimide films, flexible printed circuit substrates, aerospace insulation, and high-temperature wire enamels.',
      ),
    ],
    featureBullets: [
      'Industry-standard diamine for Kapton-type polyimide',
      'Tg > 390 \u00b0C in PMDA-ODA system',
      'Continuous service > 260 \u00b0C',
      'Excellent electrical insulation across T range',
      'Compatible with BPDA, BTDA, 6FDA dianhydrides',
      'Proven in aerospace, electronics, and wire enamel',
    ],
    applicationTags: [
      'Polyimides',
      'Aerospace Composites',
      'Electronic Encapsulation',
      'Semiconductor Packaging',
      'Flexible Displays',
    ],
    seo: {
      title: '4,4\u2032-ODA CAS 101-80-4 | 4,4\u2032-Oxydianiline Polyimide Diamine | MIKI USA',
      metaDescription:
        '4,4\u2032-ODA (CAS 101-80-4), 4,4\u2032-oxydianiline diamine for Kapton-type polyimide films, flexible circuits, and high-temperature aerospace insulation. PMDA-ODA precursor.',
      keywords:
        '4,4\u2032-ODA, 101-80-4, 4,4\u2032-oxydianiline, PMDA-ODA, Kapton precursor, polyimide diamine, aromatic diamine, aerospace polyimide, flexible circuit film',
    },
  },
  {
    _id: 'product-bapp',
    slug: 'bapp',
    productCode: 'BAPP',
    category: 'Diamine',
    productName: 'BAPP (2,2-Bis[4-(4-Aminophenoxy)phenyl]propane)',
    casNumber: '13080-86-9',
    descriptionShort:
      'BAPP is a bisphenol-A based flexible ether-diamine \u2014 produces soluble, low-modulus polyimides with excellent film-forming ability and balanced thermal/dielectric performance for semiconductor passivation and flexible electronics.',
    descriptionLong: [
      block(
        'BAPP (CAS 13080-86-9) is 2,2-bis[4-(4-aminophenoxy)phenyl]propane \u2014 a bisphenol-A backbone diamine with two flexible ether linkages. The isopropylidene and dual ether groups yield highly soluble, amorphous polyimides with excellent film-forming properties and low modulus.',
      ),
      block(
        'Reacts with BPDA, ODPA, 6FDA, and PMDA to form polyamic acids soluble in NMP, DMAc, and \u03b3-butyrolactone \u2014 compatible with spin-coating, inkjet, and photolithographic processes used in semiconductor fabrication.',
      ),
      block(
        'Primary applications: semiconductor buffer/passivation coatings, photosensitive polyimide, flexible display substrates, and low-stress electronic encapsulation.',
      ),
    ],
    featureBullets: [
      'Bisphenol-A backbone with dual ether linkages',
      'Excellent solubility in NMP, DMAc, \u03b3-butyrolactone',
      'Low-modulus, low-stress polyimide films',
      'Balanced Tg (\u223c260 \u00b0C) with film flexibility',
      'Ideal for photosensitive polyimide formulation',
      'Compatible with BPDA, ODPA, 6FDA, PMDA',
    ],
    applicationTags: [
      'Polyimides',
      'Semiconductor Packaging',
      'Flexible Displays',
      'Electronic Encapsulation',
      'Photosensitive Resins',
    ],
    seo: {
      title: 'BAPP CAS 13080-86-9 | Bisphenol-A Ether Diamine | MIKI USA',
      metaDescription:
        'BAPP (CAS 13080-86-9), 2,2-bis[4-(4-aminophenoxy)phenyl]propane for soluble low-modulus polyimides, photosensitive polyimide, and semiconductor buffer coatings.',
      keywords:
        'BAPP, 13080-86-9, 2,2-bis[4-(4-aminophenoxy)phenyl]propane, bisphenol A diamine, soluble polyimide, photosensitive polyimide, semiconductor buffer coating, flexible polyimide',
    },
  },
  {
    _id: 'product-apbn',
    slug: 'apbn',
    productCode: 'APBN',
    category: 'Diamine',
    productName: 'APBN (1,3-Bis(3-Aminophenoxy)benzene)',
    casNumber: '10526-07-5',
    descriptionShort:
      'APBN is 1,3-bis(3-aminophenoxy)benzene \u2014 a flexible triphenyl-ether diamine producing soluble, low-Dk polyimides (Dk 3.0, Df 0.0044) with Tg ~206 \u00b0C. Excellent for high-frequency substrates and melt-processable polyimide films.',
    descriptionLong: [
      block(
        'APBN (CAS 10526-07-5) is 1,3-bis(3-aminophenoxy)benzene \u2014 a flexible triphenyl-ether diamine with three aromatic rings connected by meta-ether linkages. The meta-kinked structure yields amorphous, melt-processable polyimides with exceptionally low dielectric constant and loss.',
      ),
      block(
        'Typical polyimide properties: Tg \u2248 206 \u00b0C, Dk 3.0, Df 0.0044 \u2014 among the lowest dielectric loss values in the aromatic polyimide family. Soluble in common solvents for solution casting; compatible with BPDA, ODPA, and 6FDA dianhydrides.',
      ),
      block(
        'Primary applications: 5G / mmWave high-frequency laminates, low-loss flexible circuit substrates, and melt-processable polyimide films.',
      ),
    ],
    featureBullets: [
      'Triphenyl-ether flexible diamine',
      'Tg \u2248 206 \u00b0C after imidization',
      'Very low Dk \u2248 3.0, Df \u2248 0.0044',
      'Amorphous, melt-processable polyimides',
      'Excellent solubility in NMP, DMAc',
      'Ideal for 5G high-frequency substrates',
    ],
    applicationTags: [
      'Polyimides',
      '5G / High-Frequency Laminates',
      'Semiconductor Packaging',
      'Flexible Displays',
      'Electronic Encapsulation',
    ],
    chemicalSpecs: {tg_c: '206', dielectricConstant: '3.0', dissipationFactor: '0.0044'},
    seo: {
      title: 'APBN CAS 10526-07-5 | 1,3-Bis(3-aminophenoxy)benzene | MIKI USA',
      metaDescription:
        'APBN (CAS 10526-07-5), 1,3-bis(3-aminophenoxy)benzene triphenyl-ether diamine for low-Dk 5G laminates and melt-processable polyimides. Dk 3.0, Df 0.0044.',
      keywords:
        'APBN, 10526-07-5, 1,3-bis(3-aminophenoxy)benzene, triphenyl ether diamine, low Dk polyimide, 5G laminate, melt processable polyimide, mmWave substrate',
    },
  },
  {
    _id: 'product-3-5-daba',
    slug: '3-5-daba',
    productCode: '3,5-DABA',
    category: 'Diamine',
    productName: '3,5-DABA (3,5-Diaminobenzoic Acid)',
    casNumber: '535-87-5',
    descriptionShort:
      '3,5-DABA is 3,5-diaminobenzoic acid \u2014 a carboxylic-acid functionalized diamine that introduces \u2013COOH side groups into polyimide backbones for crosslinking, metal chelation, or photosensitive resin formulation.',
    descriptionLong: [
      block(
        '3,5-DABA (CAS 535-87-5) is 3,5-diaminobenzoic acid \u2014 an aromatic diamine bearing a pendant carboxylic acid group. Copolymerized with standard polyimide diamines, it introduces \u2013COOH groups along the polyimide chain for post-synthetic modification, metal ion chelation, or crosslinking with epoxy co-monomers.',
      ),
      block(
        'The carboxylic side group also enables photosensitive polyimide (PSPI) formulation by attaching photoreactive groups such as methacrylate esters. Common in semiconductor buffer coatings where lithographic patterning is required.',
      ),
      block(
        'Primary applications: photosensitive polyimide precursors, crosslinkable polyimide networks, metal-chelating dielectric films, and functionalized gas separation membranes.',
      ),
    ],
    featureBullets: [
      'Pendant \u2013COOH group for post-functionalization',
      'Enables photosensitive polyimide (PSPI) synthesis',
      'Crosslinkable with epoxy co-monomers',
      'Metal chelation for functional dielectric films',
      'Compatible with BPDA, ODPA, 6FDA',
      'Used in gas separation membrane tuning',
    ],
    applicationTags: [
      'Polyimides',
      'Semiconductor Packaging',
      'Photosensitive Resins',
      'Gas Separation Membranes',
    ],
    seo: {
      title: '3,5-DABA CAS 535-87-5 | 3,5-Diaminobenzoic Acid | MIKI USA',
      metaDescription:
        '3,5-DABA (CAS 535-87-5), 3,5-diaminobenzoic acid functional diamine for photosensitive polyimides, crosslinkable PI networks, and gas separation membranes.',
      keywords:
        '3,5-DABA, 535-87-5, 3,5-diaminobenzoic acid, functional diamine, photosensitive polyimide, PSPI, crosslinkable polyimide, gas separation membrane monomer',
    },
  },
  {
    _id: 'product-tmda',
    slug: 'tmda',
    productCode: 'TMDA',
    category: 'Diamine',
    productName: 'TMDA (2,4,6-Trimethyl-1,3-phenylenediamine)',
    casNumber: '3102-70-3',
    descriptionShort:
      'TMDA is 2,4,6-trimethyl-m-phenylenediamine \u2014 a hindered aromatic diamine used in high-free-volume gas separation polyimides. The methyl substituents restrict chain packing, dramatically boosting gas permeability for CO\u2082/CH\u2084 and O\u2082/N\u2082 separation.',
    descriptionLong: [
      block(
        'TMDA (CAS 3102-70-3) is 2,4,6-trimethyl-1,3-phenylenediamine \u2014 a hindered aromatic diamine with three methyl substituents flanking the amine groups. The steric bulk restricts chain packing and increases fractional free volume (FFV) of the resulting polyimide.',
      ),
      block(
        'Paired with 6FDA, TMDA produces 6FDA-TMDA polyimide with exceptionally high gas permeability and strong solubility selectivity \u2014 a benchmark material for natural gas sweetening (CO\u2082/CH\u2084), air separation (O\u2082/N\u2082), and hydrogen purification.',
      ),
      block(
        'Primary applications: gas separation membranes, thermally rearranged (TR) polymer precursors, and high-free-volume polyimide films.',
      ),
    ],
    featureBullets: [
      'Hindered trimethyl-m-phenylenediamine',
      'High free volume polyimide films',
      '6FDA-TMDA: benchmark CO\u2082/CH\u2084 separation polymer',
      'Amorphous, soluble polyimides',
      'Precursor for thermally rearranged (TR) polymers',
      'Used for H\u2082, O\u2082/N\u2082, and CO\u2082/CH\u2084 separation',
    ],
    applicationTags: [
      'Polyimides',
      'Gas Separation Membranes',
      'High-Performance Resins',
      'Semiconductor Packaging',
    ],
    seo: {
      title: 'TMDA CAS 3102-70-3 | Trimethyl-m-Phenylenediamine | MIKI USA',
      metaDescription:
        'TMDA (CAS 3102-70-3), 2,4,6-trimethyl-m-phenylenediamine hindered diamine for high-free-volume 6FDA-TMDA gas separation polyimides and TR polymers.',
      keywords:
        'TMDA, 3102-70-3, 2,4,6-trimethyl-m-phenylenediamine, hindered diamine, 6FDA-TMDA, gas separation polyimide, CO2 CH4 membrane, thermally rearranged polymer',
    },
  },
  {
    _id: 'product-bfaf',
    slug: 'bfaf',
    productCode: 'BFAF',
    category: 'Diamine',
    productName: 'BFAF (9,9-Bis(4-Amino-3-trifluoromethylphenyl)fluorene)',
    casNumber: '173470-69-8',
    descriptionShort:
      'BFAF is a fluorinated fluorene-cardo diamine combining the bulky fluorene cardo structure with trifluoromethyl groups \u2014 yields colorless polyimides with simultaneously high Tg, low Dk, low birefringence, and high optical transparency. Developing-stage availability.',
    descriptionLong: [
      block(
        'BFAF (CAS 173470-69-8) is 9,9-bis(4-amino-3-trifluoromethylphenyl)fluorene \u2014 a rare diamine that unites two high-performance polyimide design motifs: the cardo fluorene structure (for high Tg, high Tg, low birefringence) and the trifluoromethyl substituent (for low dielectric constant and high optical transparency).',
      ),
      block(
        'Polyimides from BFAF exhibit Tg above 340 \u00b0C, near-water-clear transparency in the visible range, and Dk values below 3.0 \u2014 an exceptional combination for flexible OLED displays, optical waveguides, and colorless polyimide (CPI) cover films.',
      ),
      block(
        'Product status: developing stage \u2014 contact MIKI USA for sample availability, pilot lot quantities, and joint development projects.',
      ),
    ],
    featureBullets: [
      'Combines fluorene cardo + CF\u2083 groups',
      'Tg > 340 \u00b0C with optical transparency',
      'Very low dielectric constant (Dk < 3.0)',
      'Near-zero birefringence CPI films',
      'Excellent solubility for solution casting',
      'Developing stage \u2014 contact sales for samples',
    ],
    applicationTags: [
      'Polyimides',
      'Flexible Displays',
      'Optical Materials',
      'Semiconductor Packaging',
      '5G / High-Frequency Laminates',
    ],
    seo: {
      title: 'BFAF CAS 173470-69-8 | Fluorinated Fluorene Diamine | MIKI USA',
      metaDescription:
        'BFAF (CAS 173470-69-8), 9,9-bis(4-amino-3-trifluoromethylphenyl)fluorene for colorless polyimide CPI films, flexible OLED substrates, and low-Dk optical polyimides.',
      keywords:
        'BFAF, 173470-69-8, fluorinated fluorene diamine, cardo diamine, colorless polyimide, CPI, flexible OLED cover film, low Dk polyimide, optical polyimide',
    },
  },
]

for (const p of products) {
  const {_id, slug, category, ...rest} = p
  const doc = {
    _id,
    _type: 'product',
    productType: 'chemical',
    slug: {_type: 'slug', current: slug},
    category,
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
