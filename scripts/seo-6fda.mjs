import fs from 'node:fs'
import path from 'node:path'
import {createClient} from '@sanity/client'

const env = fs.readFileSync(path.resolve(process.cwd(), '.env.local'), 'utf8')
for (const l of env.split('\n')) {
  const [k, ...v] = l.split('=')
  if (k && v.length) process.env[k.trim()] = v.join('=').trim()
}

const client = createClient({
  projectId: 'g8n7tvko',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
})

const key = () => Math.random().toString(36).slice(2, 10)

const block = (text, style = 'normal') => ({
  _type: 'block', _key: key(), style,
  markDefs: [],
  children: [{_type: 'span', _key: key(), text, marks: []}],
})

const linkBlock = (segments) => ({
  _type: 'block', _key: key(), style: 'normal',
  markDefs: segments
    .filter(s => s.href)
    .map(s => ({_type: 'link', _key: s.markKey, href: s.href})),
  children: segments.map(s => ({
    _type: 'span', _key: key(),
    text: s.text,
    marks: s.markKey ? [s.markKey] : [],
  })),
})

// Related products to cross-link
const relatedProducts = [
  {slug: 'bapp',    name: 'BAPP',    type: 'Aromatic diamine co-monomer'},
  {slug: '4-4-oda', name: '4,4\'-ODA', type: 'Aromatic diamine co-monomer'},
  {slug: '3-4-oda', name: '3,4\'-ODA', type: 'Aromatic diamine co-monomer'},
  {slug: 'jbz-fa100n', name: 'JBZ-FA100N', type: 'Benzoxazine for polybenzoxazole pathway'},
]

// Fetch all related product IDs
const relatedRefs = await Promise.all(
  relatedProducts.map(async r => {
    const p = await client.fetch(
      `*[_type=="product" && slug.current==$slug][0]{_id}`,
      {slug: r.slug}
    )
    return p ? {
      _type: 'object', _key: key(),
      relationType: r.slug.startsWith('jbz') ? 'alternative' : 'monomer',
      note: r.type,
      product: {_type: 'reference', _ref: p._id},
    } : null
  })
)

const product = await client.fetch(
  `*[_type=="product" && (slug.current=="6fda" || _id=="drafts.product-6fda")][0]{_id}`,
)
if (!product) { console.error('6FDA not found'); process.exit(1) }

const lk1 = key(), lk2 = key(), lk3 = key()

await client
  .patch(product._id)
  .set({
    productName: '6FDA',
    productCode: '6FDA',
    iupacName: "4,4′-(Hexafluoroisopropylidene)diphthalic anhydride",
    casNumber: '1107-00-2',
    tscaStatus: 'Listed',

    descriptionShort:
      'High-purity fluorinated dianhydride monomer for synthesis of colorless polyimides (CPI), low-Dk/Df resins, and gas-separation membranes. CAS 1107-00-2.',

    descriptionLong: [
      // === Product Overview ===
      block('Product Overview', 'h2'),
      block(
        '6FDA (4,4′-(Hexafluoroisopropylidene)diphthalic anhydride, CAS 1107-00-2) is the premier fluorinated dianhydride monomer for engineering high-performance polyimide resins. Its twin trifluoromethyl (–CF₃) groups disrupt polymer chain packing, yielding amorphous 6F polyimides with a unique combination of optical transparency, low dielectric constant, outstanding solubility in organic solvents, and exceptional thermal stability. These properties make 6FDA the monomer of choice for colorless polyimide (CPI) films, high-frequency laminates, gas-permeable polymer membranes, and aerospace composite materials.'
      ),

      // === Key Applications ===
      block('Key Applications', 'h2'),

      block('5G / 6G Antenna Materials & High-Frequency PCB Laminates', 'h3'),
      block(
        '6FDA-based polyimides deliver low dielectric constant (Dk) and low dissipation factor (Df), critical properties that prevent signal loss in high-frequency 5G and 6G PCB laminates. As antenna miniaturisation demands increasingly stringent Dk/Df control, 6FDA-DAM and related copolymers are replacing conventional thermosets in next-generation electronic chemicals and substrate materials.'
      ),

      block('Aerospace & Polyimide Prepregs', 'h3'),
      block(
        'Amorphous 6F polyimides exhibit high thermal stability with glass transition temperatures (Tg) well above 250 °C and less than 5% weight loss at temperatures exceeding 500 °C. These characteristics, combined with high tensile strength and modulus, qualify 6FDA-based resins for lightweight aerospace composite materials and polyimide prepregs where long-term thermal endurance is mandatory.'
      ),

      block('Gas Separation Membranes', 'h3'),
      block(
        '6FDA-derived polyimides are extensively studied for gas-permeable polymer membranes and carbon molecular sieve membranes used to separate O₂/N₂, CO₂/CH₄, and H₂ streams. Their outstanding permeability/selectivity trade-off, combined with excellent chemical resistance to hydrolysis, makes them a benchmark material in academic and industrial R&D — competing directly with membrane-grade polymers in literature searches such as "6FDA-DAM gas separation" and "Anupama polyimide membranes."'
      ),

      block('Flexible Displays & Optics', 'h3'),
      block(
        'High optical transparency and low refractive index enable 6FDA polyimides to serve as colorless polyimide (CPI) films — transparent, flexible glass substitutes in foldable OLED displays, flexible solar cells, and CMOS-contact image sensors (CISs). These materials are also used in optical fiber waveguides and optical lenses from polymers where CPI film and low-birefringence polyimide films are specified.'
      ),

      block('OLED Packaging & Microelectronics', 'h3'),
      block(
        'Very low water absorption and excellent chemical resistance make 6FDA-based high-performance polymers suitable as OLED packaging films and microelectronics encapsulants, protecting sensitive organic layers from moisture ingress over the device lifetime.'
      ),

      // === Properties ===
      block('Properties of Amorphous 6F Polyimides', 'h2'),
      block(
        'The following key properties are characteristic of amorphous 6F polyimides — fluorinated polyimides using 6FDA as the dianhydride building block:'
      ),
      block('• High thermal stability: Tg well above 250 °C; <5% weight loss at temperatures exceeding 500 °C'),
      block('• High mechanical strength: high modulus of elasticity, tensile strength, and elongation at break in films and fibers'),
      block('• Excellent chemical resistance to hydrolysis and very low water absorption'),
      block('• Outstanding solubility in common organic solvents (NMP, DMF, THF) — enabling easy processing into films and fibers'),
      block('• High optical transparency and low refractive index — critical for CPI and optical waveguide applications'),
      block('• Low dielectric constant, low thermal coefficient of expansion, and low surface energy'),

      // === Synthesis ===
      block('Synthesis & Intermediates', 'h2'),
      block(
        '6FDA-based fluorinated polyimides are synthesised in a two-step process. First, the cyclic dianhydride 6FDA undergoes ring-opening reaction with an aromatic diamine — such as BAPP, 4,4\'-ODA, 3,4\'-ODA, 3,5-diaminobenzoic acid, or DAM — to form a polyamic acid precursor via nucleophilic addition. Subsequent thermal or chemical imidization (dehydration and cyclisation) closes the imide ring to yield the final polyimide.'
      ),
      block(
        'The trifluoromethyl groups on 6FDA prevent efficient chain packing, producing an amorphous morphology that retains solubility in common solvents even after imidization — a distinctive processing advantage over wholly aromatic polyimides. The imidization process can also be conducted hydrothermally in water at elevated pressure and temperature (200 °C) under sustainable green chemistry conditions.'
      ),
      linkBlock([
        {text: 'When 6FDA is paired with a diamine bearing hydroxyl groups (e.g., 3,3\'-dihydroxybenzidine), the initial polyimide undergoes thermal CO₂ elimination to form the corresponding polybenzoxazole — a reaction pathway that connects 6FDA chemistry with Miki Sangyo\'s benzoxazine portfolio, including '},
        {text: 'JBZ-FA100N', href: '/products/jbz-fa100n', markKey: lk1},
        {text: '. Internal hyperlink for crawler: this cross-category connection is highlighted for SEO and formulation guidance.', href: undefined},
      ]),
    ],

    featureBullets: [
      'Tg > 250 °C; <5% weight loss at 500 °C — premier aerospace polyimide monomer',
      'Low Dk/Df — specified for 5G/6G high-frequency laminates and PCB substrates',
      'Colorless polyimide (CPI) film precursor for foldable OLED and flexible solar cells',
      'Outstanding solubility in organic solvents — easy processability into films and fibers',
      'Very low water absorption — OLED packaging and microelectronics encapsulation',
      'Gas-permeable membrane monomer — O₂/N₂, CO₂/CH₄, H₂ separation benchmark',
    ],

    applicationTags: [
      '5G & 6G Electronics',
      'Aerospace Composites',
      'Gas Separation Membranes',
      'Flexible Displays (CPI)',
      'OLED Packaging',
      'Optical Fibers',
      'Microelectronics',
      'High-Frequency PCB Laminates',
    ],

    chemicalSpecs: {
      purity: '>99.0%',
      appearance: 'White crystalline powder',
      mw: 444.24,
      mp_c: 243,
      tg_c: null,
    },

    performanceTable: {
      caption: 'Technical Specifications — 6FDA (CAS 1107-00-2)',
      benchmarkLabel: 'Typical for PMDA',
      rows: [
        {property: 'Chemical Name', value: '4,4′-(Hexafluoroisopropylidene)diphthalic anhydride', unit: '', benchmark: '', notes: 'IUPAC name'},
        {property: 'CAS Number', value: '1107-00-2', unit: '', benchmark: '', notes: ''},
        {property: 'Molecular Weight', value: '444.24', unit: 'g/mol', benchmark: '218.12', notes: 'PMDA benchmark'},
        {property: 'Purity', value: '>99.0', unit: '%', benchmark: '>98.0', notes: 'HPLC'},
        {property: 'Appearance', value: 'White crystalline powder', unit: '', benchmark: '', notes: ''},
        {property: 'Melting Point', value: '243', unit: '°C', benchmark: '286', notes: ''},
        {property: 'Polyimide Tg (6FDA-ODA)', value: '>280', unit: '°C', benchmark: '~385 (PMDA-ODA)', notes: 'Varies by diamine'},
        {property: '5% Weight Loss Temp', value: '>500', unit: '°C', benchmark: '>500', notes: 'TGA in N₂'},
        {property: 'Dielectric Constant (Dk)', value: '2.7–3.0', unit: 'at 1 GHz', benchmark: '3.4–3.6', notes: 'Vs. PMDA-ODA film'},
        {property: 'Water Absorption', value: '<0.5', unit: '%', benchmark: '~2.5', notes: 'Vs. non-fluorinated PI'},
        {property: 'Refractive Index (n)', value: '~1.56', unit: '', benchmark: '~1.70', notes: 'Enables CPI films'},
        {property: 'Solubility', value: 'NMP, DMF, THF, DMAc', unit: '', benchmark: 'NMP only', notes: 'Superior processability'},
      ],
    },

    seo: {
      title: 'High-Purity 6FDA (CAS 1107-00-2) | Fluorinated Dianhydride Monomer | Miki Sangyo USA',
      description:
        '6FDA — 4,4′-(Hexafluoroisopropylidene)diphthalic anhydride, CAS 1107-00-2. Premier monomer for colorless polyimide (CPI) films, 5G/6G low-Dk laminates, gas separation membranes, and aerospace composites. Request a quote.',
    },

    relatedProducts: relatedRefs.filter(Boolean),
  })
  .commit()

console.log('✓ 6FDA SEO content updated successfully')
