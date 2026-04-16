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

const seo = (title, metaDescription, keywords) => ({title, metaDescription, keywords})

// ────────────────────────────────────────────────────────────────────────────
// Product content definitions
// ────────────────────────────────────────────────────────────────────────────
const products = [
  // ── Adamantyl ───────────────────────────────────────────────────────────
  {
    slug: '1-adamantanecarboxylic-acid',
    productName: '1-Adamantanecarboxylic Acid',
    iupacName: 'Adamantane-1-carboxylic acid',
    casNumber: '828-51-3',
    descriptionShort:
      '1-Adamantanecarboxylic acid is a rigid, cage-structured carboxylic acid used as a building block for high-Tg polymers, photoresists, and pharmaceutical intermediates.',
    descriptionLong: [
      block(
        'Adamantane-1-carboxylic acid features the highly symmetric tricyclic adamantane cage fused to a carboxylic acid functional group. The bulky, lipophilic cage imparts exceptional thermal and oxidative stability, low dielectric constant, and high optical transparency to materials and molecules built from it.',
      ),
      block(
        'It is widely used as a monomer precursor for 193 nm photoresists in advanced semiconductor lithography, as a building block in high-heat and low-dielectric polymers, and as an intermediate in medicinal chemistry where the adamantyl group improves metabolic stability and membrane permeability.',
      ),
    ],
    featureBullets: [
      'Rigid, highly symmetric adamantane cage',
      'High thermal and oxidative stability',
      'Low dielectric constant and high transparency',
      'Key monomer precursor for 193 nm ArF photoresists',
      'Improves metabolic stability of drug candidates',
      'Building block for low-Dk / high-Tg polymers',
    ],
    applicationTags: ['Photoresists', 'Semiconductors', 'High-Tg Polymers', 'Pharma Intermediate', 'Low-Dk Materials'],
    seo: seo(
      '1-Adamantanecarboxylic Acid (CAS 828-51-3) | Miki Sangyo USA',
      'High-purity 1-adamantanecarboxylic acid for 193 nm photoresists, high-Tg polymers, and pharmaceutical intermediates.',
      '1-adamantanecarboxylic acid, 828-51-3, adamantane carboxylic acid, photoresist monomer, ArF',
    ),
  },
  {
    slug: 'adamantane',
    productName: 'Adamantane',
    iupacName: 'Tricyclo[3.3.1.1³,⁷]decane',
    casNumber: '281-23-2',
    descriptionShort:
      'Adamantane is the rigid, diamondoid tricyclic hydrocarbon (C₁₀H₁₆) that serves as the parent cage for adamantyl-functionalized monomers, photoresists, and pharmaceuticals.',
    descriptionLong: [
      block(
        'Adamantane is a colorless crystalline hydrocarbon with a highly symmetric cage structure identical to a single repeating unit of the diamond lattice. Its unusual rigidity, thermal stability, and lipophilicity have made it a cornerstone scaffold in specialty chemistry.',
      ),
      block(
        'Adamantane derivatives are used in advanced semiconductor photoresists, high-Tg transparent polymers with low dielectric constants, lubricant additives, and pharmaceuticals — notably amantadine and memantine. Adamantane itself is the starting material for the entire adamantyl-functionalized derivatives family.',
      ),
    ],
    featureBullets: [
      'Diamondoid cage hydrocarbon (C₁₀H₁₆)',
      'Exceptional thermal and chemical stability',
      'Parent scaffold for adamantyl derivatives',
      'Used in 193 nm semiconductor photoresists',
      'Key intermediate for pharmaceuticals (amantadine, memantine)',
      'Enables high-Tg, low-Dk optical polymers',
    ],
    applicationTags: ['Photoresists', 'Pharma Intermediate', 'High-Tg Polymers', 'Semiconductors', 'Specialty Monomers'],
    seo: seo(
      'Adamantane (CAS 281-23-2) | Miki Sangyo USA',
      'High-purity adamantane for semiconductor photoresists, high-Tg polymers, and pharmaceutical synthesis.',
      'adamantane, 281-23-2, diamondoid, adamantyl, photoresist, amantadine',
    ),
  },

  // ── Allyl Ethers ────────────────────────────────────────────────────────
  {
    slug: 'glycerine-monoally',
    productName: 'Glycerine Monoallyl Ether',
    iupacName: '3-(Allyloxy)propane-1,2-diol',
    casNumber: '123-34-2',
    descriptionShort:
      'Glycerine monoallyl ether is a bifunctional monomer combining a reactive allyl group with a vicinal diol, used as a crosslinker and modifier in UV-cure resins, coatings, and specialty polymers.',
    descriptionLong: [
      block(
        'Glycerine monoallyl ether (3-allyloxy-1,2-propanediol) combines a radically polymerizable allyl ether with two hydroxyl groups. This dual functionality allows the monomer to participate in both free-radical polymerization and hydroxyl-based crosslinking such as urethane or epoxy curing.',
      ),
      block(
        'It is used as a reactive diluent and crosslinker in UV/EB-curable coatings, specialty polyurethanes, epoxy modifiers, and as an intermediate in glycidyl ether synthesis. The hydrophilic diol imparts surface wettability and adhesion properties to cured films.',
      ),
    ],
    featureBullets: [
      'Bifunctional allyl ether plus vicinal diol',
      'Reactive diluent for UV/EB-curable systems',
      'Crosslinker for polyurethane and epoxy formulations',
      'Imparts hydrophilicity and adhesion',
      'Intermediate for glycidyl ether synthesis',
    ],
    applicationTags: ['UV/EB Coatings', 'Polyurethane', 'Reactive Diluent', 'Crosslinker', 'Specialty Monomer'],
    seo: seo(
      'Glycerine Monoallyl Ether | Miki Sangyo USA',
      'Bifunctional allyl ether diol monomer for UV-cure coatings, polyurethanes, and epoxy crosslinking.',
      'glycerine monoallyl ether, 3-allyloxy-1,2-propanediol, reactive diluent, allyl monomer',
    ),
  },

  // ── Anhydrides ──────────────────────────────────────────────────────────
  {
    slug: '4-methylhexahydrophthalic-anhydride',
    productName: '4-Methylhexahydrophthalic Anhydride (MHHPA)',
    iupacName: '4-Methylhexahydro-2-benzofuran-1,3-dione',
    casNumber: '25550-51-0',
    descriptionShort:
      'MHHPA is a liquid alicyclic anhydride epoxy curing agent producing transparent, low-color, weather-resistant thermosets for LED encapsulation, electrical insulation, and optical applications.',
    descriptionLong: [
      block(
        '4-Methylhexahydrophthalic anhydride (MHHPA) is a saturated alicyclic anhydride widely used as an epoxy resin hardener. Unlike aromatic anhydrides, its fully hydrogenated ring gives cured resins outstanding UV stability, low yellowing, and high optical transparency.',
      ),
      block(
        'MHHPA is a low-viscosity liquid at room temperature, easing formulation and processing. It cures bisphenol-A and cycloaliphatic epoxies to high-Tg, low-stress thermosets with excellent electrical insulation, making it a standard hardener for LED encapsulation, optical lenses, transformer castings, and high-voltage insulators.',
      ),
    ],
    featureBullets: [
      'Liquid alicyclic anhydride epoxy hardener',
      'Low viscosity — easy formulation and processing',
      'Excellent optical clarity and low yellowing',
      'Superior UV and weather resistance',
      'High-Tg, low-stress cured networks',
      'Standard for LED encapsulation and electrical casting',
    ],
    applicationTags: ['Epoxy Curing', 'LED Encapsulation', 'Electrical Insulation', 'Optical Resins', 'Transparent Thermosets'],
    seo: seo(
      '4-Methylhexahydrophthalic Anhydride MHHPA (CAS 25550-51-0)',
      'Liquid MHHPA epoxy hardener for LED encapsulation, optical resins, and high-voltage electrical casting.',
      'MHHPA, 4-methylhexahydrophthalic anhydride, 25550-51-0, epoxy hardener, LED encapsulant',
    ),
  },
  {
    slug: '4-pepa',
    productName: '4-Phenylethynylphthalic Anhydride (4-PEPA)',
    iupacName: '4-(Phenylethynyl)-1,3-isobenzofurandione',
    casNumber: '119389-05-8',
    descriptionShort:
      '4-PEPA is a phenylethynyl-functionalized endcap anhydride that enables thermally cured, void-free polyimides and oligomers with exceptional high-temperature stability for aerospace composites.',
    descriptionLong: [
      block(
        '4-Phenylethynylphthalic anhydride (4-PEPA) is a reactive endcap monomer used to terminate polyimide oligomers with a phenylethynyl group. On thermal cure (typically 370–400 °C), the phenylethynyl groups undergo addition crosslinking without releasing volatiles, producing void-free, high-Tg, thermally stable networks.',
      ),
      block(
        'PEPA-terminated oligomers such as PETI-family resins are a backbone technology for next-generation aerospace composite matrices, high-temperature electronics, and structural adhesives that must withstand sustained service above 300 °C.',
      ),
    ],
    featureBullets: [
      'Phenylethynyl addition-cure endcap',
      'Volatile-free thermal crosslinking',
      'Produces void-free, high-Tg polyimides',
      'Service temperatures above 300 °C',
      'Key for PETI-class aerospace resins',
      'Enables melt-processable oligomers',
    ],
    applicationTags: ['Polyimides', 'Aerospace Composites', 'High-Temp Resins', 'Endcap Monomer', 'Thermoset'],
    seo: seo(
      '4-PEPA Phenylethynylphthalic Anhydride | Miki Sangyo USA',
      '4-PEPA endcap for high-temperature polyimides and PETI aerospace composite resins.',
      '4-PEPA, phenylethynylphthalic anhydride, polyimide endcap, PETI, aerospace resin',
    ),
  },
  {
    slug: 'bpaf',
    productName: 'BPAF (Bisphenol AF Dianhydride)',
    iupacName:
      '4,4′-(Hexafluoroisopropylidene)diphthalic anhydride',
    casNumber: '1107-00-2',
    descriptionShort:
      'BPAF (6FDA) is a hexafluoroisopropylidene-bridged aromatic dianhydride that yields high-performance fluorinated polyimides with low dielectric constant, high optical transparency, and gas-separation capability.',
    descriptionLong: [
      block(
        '4,4′-(Hexafluoroisopropylidene)diphthalic anhydride — commonly known as 6FDA or BPAF — is an aromatic dianhydride featuring the –C(CF₃)₂– hexafluoroisopropylidene bridge. This fluorinated linkage disrupts chain packing and reduces polarizability, giving resulting polyimides uniquely low refractive index, low dielectric constant, and high optical transparency.',
      ),
      block(
        '6FDA-based polyimides are used in flexible display substrates, low-Dk interlayer dielectrics for advanced packaging, aerospace films, and high-performance gas-separation membranes for CO₂/CH₄ and O₂/N₂ separations.',
      ),
    ],
    featureBullets: [
      'Hexafluoroisopropylidene aromatic dianhydride',
      'Produces colorless, transparent polyimides',
      'Low dielectric constant (Dk) and loss',
      'Key monomer for gas-separation membranes',
      'Used in flexible displays and advanced packaging',
      'Also called 6FDA',
    ],
    applicationTags: ['Polyimides', 'Low-Dk Materials', 'Flexible Displays', 'Gas Separation', 'Advanced Packaging'],
    seo: seo(
      'BPAF / 6FDA Dianhydride (CAS 1107-00-2) | Miki Sangyo USA',
      '6FDA hexafluoroisopropylidene dianhydride for transparent, low-Dk polyimides and gas-separation membranes.',
      'BPAF, 6FDA, 1107-00-2, fluorinated polyimide, low-Dk, gas separation membrane',
    ),
  },
  {
    slug: 'bpf-pa',
    productName: 'BPF-PA (Bisphenol F Phthalate Dianhydride)',
    iupacName: '4,4′-(9H-Fluorene-9,9-diyl)bis(phthalic anhydride)',
    casNumber: '135876-30-1',
    descriptionShort:
      'BPF-PA is a fluorene-bridged aromatic dianhydride producing cardo-structure polyimides with high Tg, low birefringence, and excellent optical transparency.',
    descriptionLong: [
      block(
        'BPF-PA is a cardo-type aromatic dianhydride in which two phthalic anhydride units are joined through the 9,9′-position of a fluorene ring. The orthogonal, bulky fluorene group disrupts chain packing and suppresses through-plane birefringence, giving derived polyimides exceptional optical transparency and dimensional isotropy.',
      ),
      block(
        'Polymers built from BPF-PA combine glass transition temperatures often exceeding 300 °C with visible-range transparency, low CTE, and high refractive index — making them candidate materials for flexible OLED substrates, optical films, and transparent electronics.',
      ),
    ],
    featureBullets: [
      'Fluorene-bridged cardo aromatic dianhydride',
      'High Tg (>300 °C) polyimides',
      'Low birefringence — suitable for optical films',
      'High refractive index',
      'Visible-light transparency',
      'For flexible OLED substrates and transparent electronics',
    ],
    applicationTags: ['Polyimides', 'Cardo Monomers', 'Optical Films', 'Flexible Displays', 'High-Tg Polymers'],
    seo: seo(
      'BPF-PA Fluorene Dianhydride | Miki Sangyo USA',
      'Fluorene-cardo dianhydride for transparent, high-Tg, low-birefringence polyimides.',
      'BPF-PA, fluorene dianhydride, cardo polyimide, optical polyimide, flexible display',
    ),
  },
  {
    slug: 'bt-100',
    productName: 'BT-100 Specialty Anhydride',
    descriptionShort:
      'BT-100 is a specialty anhydride product used as a curing agent and building block for high-performance thermoset resins.',
    descriptionLong: [
      block(
        'BT-100 is a specialty anhydride material supplied as a curing agent and reactive monomer for epoxy and polyimide systems. It is formulated to deliver thermoset networks with balanced thermal stability, electrical insulation, and processability.',
      ),
      block(
        'Typical applications include epoxy curing for electronic encapsulants, high-heat adhesives, and thermally stable coatings. Full technical data and SDS are available on request.',
      ),
    ],
    featureBullets: [
      'Specialty anhydride curing agent',
      'Balanced thermal stability and processability',
      'Suitable for electronic encapsulation',
      'For high-heat adhesives and coatings',
      'Full TDS / SDS on request',
    ],
    applicationTags: ['Epoxy Curing', 'Electronics', 'Thermoset Resins', 'Adhesives'],
    seo: seo(
      'BT-100 Specialty Anhydride | Miki Sangyo USA',
      'BT-100 anhydride curing agent for high-performance epoxy and thermoset resins.',
      'BT-100, specialty anhydride, epoxy curing agent, thermoset',
    ),
  },
  {
    slug: 'hhpa',
    productName: 'Hexahydrophthalic Anhydride (HHPA)',
    iupacName: 'Hexahydro-2-benzofuran-1,3(2H)-dione',
    casNumber: '85-42-7',
    descriptionShort:
      'HHPA is a saturated alicyclic anhydride epoxy curing agent producing UV-stable, transparent, low-color thermosets used in LED encapsulants, optical resins, and electrical casting.',
    descriptionLong: [
      block(
        'Hexahydrophthalic anhydride (HHPA) is the fully hydrogenated analog of phthalic anhydride. Its saturated cyclohexane ring eliminates aromatic UV absorption, giving cured epoxy networks exceptional optical clarity, color stability, and weather resistance.',
      ),
      block(
        'HHPA is a workhorse hardener for liquid-epoxy systems in LED encapsulation, optical lenses, high-voltage insulators, transformer casting, and transparent composites. It gives high-Tg networks with low dielectric loss and good mechanical strength.',
      ),
    ],
    featureBullets: [
      'Saturated alicyclic anhydride hardener',
      'UV-stable, non-yellowing cured resins',
      'High optical clarity',
      'Standard for LED encapsulation',
      'Excellent electrical insulation',
      'High-Tg, low-stress networks',
    ],
    applicationTags: ['Epoxy Curing', 'LED Encapsulation', 'Electrical Insulation', 'Optical Resins', 'Transparent Thermosets'],
    seo: seo(
      'Hexahydrophthalic Anhydride HHPA (CAS 85-42-7)',
      'HHPA saturated anhydride epoxy hardener for LED encapsulation, optical, and electrical casting resins.',
      'HHPA, hexahydrophthalic anhydride, 85-42-7, epoxy hardener, LED encapsulant',
    ),
  },
  {
    slug: 'pa',
    productName: 'Phthalic Anhydride (PA)',
    iupacName: '2-Benzofuran-1,3-dione',
    casNumber: '85-44-9',
    descriptionShort:
      'Phthalic anhydride is a major commodity aromatic anhydride used to manufacture plasticizers, unsaturated polyester resins, alkyd paints, and dye intermediates.',
    descriptionLong: [
      block(
        'Phthalic anhydride is produced by the vapor-phase oxidation of o-xylene or naphthalene and is one of the most important aromatic anhydrides in industrial chemistry. It is a crystalline solid at room temperature and reacts readily with alcohols and amines to form esters and imides.',
      ),
      block(
        'Its largest uses are in phthalate plasticizers (DOP, DINP, DOTP), unsaturated polyester resins for fiberglass-reinforced plastics, alkyd coating resins, dye and pigment intermediates, and as a curing agent for epoxy resins.',
      ),
    ],
    featureBullets: [
      'High-purity commodity aromatic anhydride',
      'Intermediate for phthalate plasticizers',
      'Precursor for unsaturated polyester and alkyd resins',
      'Epoxy curing agent',
      'Dye, pigment, and pharmaceutical intermediate',
    ],
    applicationTags: ['Plasticizers', 'Unsaturated Polyesters', 'Alkyd Resins', 'Epoxy Curing', 'Dye Intermediate'],
    seo: seo(
      'Phthalic Anhydride PA (CAS 85-44-9) | Miki Sangyo USA',
      'High-purity phthalic anhydride for plasticizers, polyester resins, alkyds, and epoxy curing.',
      'phthalic anhydride, PA, 85-44-9, plasticizer intermediate, polyester resin',
    ),
  },
  {
    slug: 'tahq',
    productName: 'TAHQ (Hydroquinone Diacetate / Terephthalate Anhydride)',
    descriptionShort:
      'TAHQ is a specialty aromatic anhydride monomer used as a building block for liquid-crystal polymers, high-Tg polyesters, and high-performance polyimides.',
    descriptionLong: [
      block(
        'TAHQ is a specialty aromatic anhydride monomer developed for high-performance polymer synthesis. Its rigid aromatic core contributes to thermal stability, high glass transition temperatures, and dimensional stability in the resulting polymers.',
      ),
      block(
        'Typical applications include liquid-crystalline polymers, high-temperature polyesters, engineering polyimides, and advanced electronic materials where heat resistance and mechanical performance are critical.',
      ),
    ],
    featureBullets: [
      'Rigid aromatic anhydride monomer',
      'Building block for LCPs and high-Tg polyesters',
      'Excellent thermal stability',
      'Used in engineering polyimides',
      'For advanced electronic materials',
    ],
    applicationTags: ['LCP', 'Polyimides', 'High-Temp Polyesters', 'Specialty Monomer', 'Electronic Materials'],
    seo: seo(
      'TAHQ Specialty Anhydride | Miki Sangyo USA',
      'TAHQ aromatic anhydride monomer for LCPs, high-Tg polyesters, and engineering polyimides.',
      'TAHQ, specialty anhydride, LCP monomer, high-Tg polyester',
    ),
  },
  {
    slug: 'tda-100',
    productName: 'TDA-100 Specialty Dianhydride',
    descriptionShort:
      'TDA-100 is a specialty aromatic dianhydride monomer used in the synthesis of high-performance polyimides and thermally stable engineering polymers.',
    descriptionLong: [
      block(
        'TDA-100 is a specialty aromatic dianhydride supplied for the synthesis of polyimides and related high-performance polymers. Its rigid, symmetrical structure delivers thermal stability, high glass transition temperatures, and favorable mechanical and dielectric properties.',
      ),
      block(
        'TDA-100 is used in electronics, aerospace films, flexible circuit substrates, and advanced packaging resins. Full technical data is available on request.',
      ),
    ],
    featureBullets: [
      'Aromatic dianhydride polyimide monomer',
      'High thermal stability',
      'High-Tg resins',
      'Suitable for flexible circuits and advanced packaging',
      'TDS available on request',
    ],
    applicationTags: ['Polyimides', 'Electronics', 'Flexible Circuits', 'Aerospace Films', 'Advanced Packaging'],
    seo: seo(
      'TDA-100 Specialty Dianhydride | Miki Sangyo USA',
      'TDA-100 aromatic dianhydride for high-performance polyimide and engineering polymer synthesis.',
      'TDA-100, specialty dianhydride, polyimide monomer',
    ),
  },
  {
    slug: 'thpa',
    productName: 'Tetrahydrophthalic Anhydride (THPA)',
    iupacName: '3a,4,7,7a-Tetrahydro-2-benzofuran-1,3-dione',
    casNumber: '85-43-8',
    descriptionShort:
      'THPA is a partially saturated alicyclic anhydride used as an epoxy curing agent and intermediate for UV-stable polyester and alkyd resins.',
    descriptionLong: [
      block(
        'Tetrahydrophthalic anhydride (THPA) is the partial hydrogenation product of phthalic anhydride, retaining a single double bond in the cyclohexene ring. This residual unsaturation allows it to participate in copolymerization with unsaturated polyesters while the alicyclic ring provides improved UV stability over purely aromatic anhydrides.',
      ),
      block(
        'THPA is used as an epoxy curing agent yielding transparent, weather-resistant networks, as a reactive intermediate for alkyd and unsaturated polyester resins, and as a building block for agrochemical and pharmaceutical synthesis.',
      ),
    ],
    featureBullets: [
      'Partially saturated alicyclic anhydride',
      'Epoxy curing agent with improved UV stability',
      'Intermediate for unsaturated polyester and alkyd resins',
      'Retains reactive double bond for copolymerization',
      'Used in agro and pharma synthesis',
    ],
    applicationTags: ['Epoxy Curing', 'Unsaturated Polyesters', 'Alkyd Resins', 'Specialty Monomer'],
    seo: seo(
      'Tetrahydrophthalic Anhydride THPA (CAS 85-43-8)',
      'THPA alicyclic anhydride for epoxy curing, unsaturated polyesters, and alkyd resins.',
      'THPA, tetrahydrophthalic anhydride, 85-43-8, epoxy curing',
    ),
  },
  {
    slug: 'tmeg-100',
    productName: 'TMEG-100 Aromatic Dianhydride',
    iupacName: 'Ethylene glycol bis(anhydrotrimellitate)',
    casNumber: '1732-93-4',
    descriptionShort:
      'TMEG-100 is an ester-linked aromatic dianhydride used as a monomer for solvent-soluble, processable polyimides with balanced thermal and mechanical properties.',
    descriptionLong: [
      block(
        'TMEG-100, ethylene glycol bis(anhydrotrimellitate), is an aromatic dianhydride in which two trimellitic anhydride units are joined by a flexible ethylene glycol ester linkage. The flexible spacer improves solubility and processability while the aromatic anhydride ends deliver high thermal performance.',
      ),
      block(
        'It is used as a monomer for solution-processable polyimides and poly(ester-imide)s in electronics insulation, magnet wire enamels, and flexible circuitry where solubility, adhesion, and heat resistance must be balanced.',
      ),
    ],
    featureBullets: [
      'Aromatic ester-linked dianhydride',
      'Produces solution-processable polyimides',
      'Excellent heat resistance with good flexibility',
      'Used in magnet wire enamels',
      'Suited to flexible circuits and electrical insulation',
    ],
    applicationTags: ['Polyimides', 'Magnet Wire Enamel', 'Flexible Circuits', 'Electrical Insulation'],
    seo: seo(
      'TMEG-100 Dianhydride (CAS 1732-93-4) | Miki Sangyo USA',
      'TMEG-100 ester-linked dianhydride for solution-processable polyimides and wire enamels.',
      'TMEG-100, 1732-93-4, ester dianhydride, polyimide monomer, magnet wire',
    ),
  },
  {
    slug: 'a-odpa',
    productName: 'a-ODPA (2,3,3′,4′-Oxydiphthalic Anhydride)',
    iupacName: '2,3,3′,4′-Oxydiphthalic anhydride',
    casNumber: '50662-95-8',
    descriptionShort:
      'a-ODPA is the asymmetric oxydiphthalic dianhydride isomer used to produce highly soluble, transparent polyimides with low CTE and excellent optical properties.',
    descriptionLong: [
      block(
        'a-ODPA is the asymmetric 2,3,3′,4′- isomer of oxydiphthalic anhydride. The ether bridge between phthalic anhydride units and the asymmetric 2,3-substitution disrupt chain packing, improving solubility in organic solvents and suppressing crystallization in derived polyimides.',
      ),
      block(
        'Polyimides based on a-ODPA combine high thermal stability with improved processability, optical transparency, and low thermal expansion — making them candidates for flexible display substrates, optical films, and advanced electronic packaging.',
      ),
    ],
    featureBullets: [
      'Asymmetric oxydiphthalic dianhydride isomer',
      'Improved solubility of derived polyimides',
      'Optical transparency',
      'Low CTE and dimensional stability',
      'For flexible displays and advanced packaging',
    ],
    applicationTags: ['Polyimides', 'Flexible Displays', 'Optical Films', 'Advanced Packaging'],
    seo: seo(
      'a-ODPA Asymmetric Oxydiphthalic Anhydride',
      'Asymmetric a-ODPA dianhydride for soluble, transparent polyimides with low CTE.',
      'a-ODPA, 2,3,3,4-oxydiphthalic anhydride, asymmetric dianhydride, polyimide',
    ),
  },

  // ── Aniline ─────────────────────────────────────────────────────────────
  {
    slug: 'bisa-m',
    productName: 'BisA-M (Bisaniline M)',
    iupacName: '4,4′-(1,3-Phenylenediisopropylidene)bisaniline',
    casNumber: '2687-27-6',
    descriptionShort:
      'BisA-M is a bisaniline aromatic diamine with meta-isopropylidene bridging groups, used as a monomer for soluble, transparent polyimides and high-performance epoxy curing.',
    descriptionLong: [
      block(
        'Bisaniline M is a meta-substituted aromatic diamine featuring two isopropylidene bridges linked through a central benzene ring. The bulky, non-coplanar structure disrupts chain packing, yielding polyimides and epoxies with improved organic-solvent solubility and optical transparency.',
      ),
      block(
        'It is used as a diamine monomer for polyimides, polyamides, and polybenzoxazoles in advanced electronics, as well as an amine curing agent for high-Tg epoxy resins with good toughness and transparency.',
      ),
    ],
    featureBullets: [
      'Meta-linked aromatic diamine',
      'Bulky isopropylidene structure — improves solubility',
      'Monomer for soluble, transparent polyimides',
      'Epoxy curing agent with high Tg',
      'Used in advanced electronics and coatings',
    ],
    applicationTags: ['Polyimides', 'Epoxy Curing', 'Electronics', 'Specialty Diamine'],
    seo: seo(
      'BisA-M Bisaniline M Diamine (CAS 2687-27-6)',
      'Meta-linked bisaniline diamine for soluble polyimides and high-Tg epoxy curing.',
      'BisA-M, bisaniline M, 2687-27-6, aromatic diamine, polyimide monomer',
    ),
  },
  {
    slug: 'bisa-p',
    productName: 'BisA-P (Bisaniline P)',
    iupacName: '4,4′-(1,4-Phenylenediisopropylidene)bisaniline',
    casNumber: '2688-84-8',
    descriptionShort:
      'BisA-P is the para-isomer of bisaniline — a rigid aromatic diamine monomer producing high-Tg, thermally stable polyimides and engineering polymers.',
    descriptionLong: [
      block(
        'Bisaniline P is the para-linked analog of bisaniline M, featuring isopropylidene bridges and para aniline groups through a central benzene ring. The more linear, rigid structure boosts glass transition temperatures and thermal stability while maintaining reasonable processability.',
      ),
      block(
        'It is used as an aromatic diamine monomer for high-performance polyimides, polybenzoxazoles, and polyamides, and as a curing agent for high-Tg epoxy systems in aerospace and advanced electronics applications.',
      ),
    ],
    featureBullets: [
      'Para-linked aromatic diamine',
      'Rigid backbone — high Tg polymers',
      'Monomer for polyimides and PBOs',
      'High-Tg epoxy curing agent',
      'Aerospace and electronics applications',
    ],
    applicationTags: ['Polyimides', 'Epoxy Curing', 'Aerospace', 'High-Tg Polymers', 'Specialty Diamine'],
    seo: seo(
      'BisA-P Bisaniline P Diamine (CAS 2688-84-8)',
      'Para-linked bisaniline diamine monomer for high-Tg polyimides and epoxy curing.',
      'BisA-P, bisaniline P, 2688-84-8, aromatic diamine, polyimide monomer',
    ),
  },

  // ── Bismaleimide ────────────────────────────────────────────────────────
  {
    slug: 'bmi-7000',
    productName: 'BMI-7000 Bismaleimide Resin',
    descriptionShort:
      'BMI-7000 is a bismaleimide thermoset resin used for high-temperature structural composites, electronic laminates, and adhesives requiring service above 200 °C.',
    descriptionLong: [
      block(
        'BMI-7000 is a bismaleimide (BMI) resin built on the well-known addition-cure maleimide chemistry. BMI thermosets combine the high thermal stability of polyimides with the processability of epoxies, curing without volatile byproducts to give void-free networks with Tg typically exceeding 250 °C.',
      ),
      block(
        'BMI-7000 is used as a matrix resin in carbon-fiber aerospace composites, as a base resin for high-Tg electronic laminates and prepregs, and in high-temperature structural adhesives and coatings.',
      ),
    ],
    featureBullets: [
      'Bismaleimide addition-cure thermoset',
      'Service temperature above 200 °C',
      'Void-free cure without volatiles',
      'For carbon-fiber aerospace composites',
      'High-Tg electronic laminates',
      'High-temperature adhesives',
    ],
    applicationTags: ['Bismaleimide', 'Aerospace Composites', 'Electronic Laminates', 'High-Temp Resins', 'Adhesives'],
    seo: seo(
      'BMI-7000 Bismaleimide Resin | Miki Sangyo USA',
      'BMI-7000 bismaleimide thermoset for aerospace composites and high-Tg electronic laminates.',
      'BMI-7000, bismaleimide, BMI resin, aerospace composite, electronic laminate',
    ),
  },

  // ── Coating - Lens Varnish ──────────────────────────────────────────────
  {
    slug: 'lh-3h',
    productName: 'LH-3H Lens Hard Coating',
    descriptionShort:
      'LH-3H is a hard-coat varnish for plastic ophthalmic and optical lenses, providing abrasion resistance, adhesion, and optical clarity.',
    descriptionLong: [
      block(
        'LH-3H is a specialty hard-coat formulation developed for plastic ophthalmic and optical lens manufacturing. It forms a thin, highly crosslinked film that greatly improves scratch and abrasion resistance while maintaining optical clarity and adhesion to a range of plastic substrates.',
      ),
      block(
        'LH-3H is typically applied by dip coating, followed by thermal curing, and serves as the foundation layer beneath anti-reflection and hydrophobic topcoats in multi-layer lens coating stacks.',
      ),
    ],
    featureBullets: [
      'Hard-coat varnish for plastic lenses',
      'Excellent scratch and abrasion resistance',
      'Strong adhesion to lens substrates',
      'High optical clarity',
      'Compatible with multi-layer coating stacks',
    ],
    applicationTags: ['Lens Coating', 'Hard Coat', 'Ophthalmic', 'Optical Lenses'],
    seo: seo(
      'LH-3H Lens Hard Coating | Miki Sangyo USA',
      'LH-3H hard-coat varnish for scratch-resistant plastic ophthalmic and optical lenses.',
      'LH-3H, lens hard coat, ophthalmic coating, scratch resistance',
    ),
  },

  // ── Coatings - Hydrophobic ──────────────────────────────────────────────
  {
    slug: 'or-510',
    productName: 'OR-510 Hydrophobic Coating',
    descriptionShort:
      'OR-510 is a fluorinated hydrophobic top-coat solution that imparts water- and oil-repellency, anti-smudge performance, and easy-clean properties to optical lenses and displays.',
    descriptionLong: [
      block(
        'OR-510 is a solvent-borne fluorinated hydrophobic/oleophobic coating. When applied as the outermost layer of a lens or display coating stack, it chemically bonds to the underlying anti-reflection layer to form a low-surface-energy surface with high water contact angle and excellent anti-smudge performance.',
      ),
      block(
        'OR-510 is used as a finishing layer on ophthalmic lenses, camera optics, display cover glass, and touch panels where easy-clean, anti-fingerprint, and anti-water properties are required.',
      ),
    ],
    featureBullets: [
      'Fluorinated hydrophobic/oleophobic top coat',
      'High water contact angle',
      'Anti-fingerprint, anti-smudge performance',
      'Easy-clean surface',
      'For ophthalmic, display, and camera optics',
    ],
    applicationTags: ['Hydrophobic Coating', 'Anti-Smudge', 'Lens Coating', 'Display Coatings'],
    seo: seo(
      'OR-510 Hydrophobic Lens Coating | Miki Sangyo USA',
      'OR-510 fluorinated hydrophobic top-coat for anti-smudge ophthalmic lenses and display surfaces.',
      'OR-510, hydrophobic coating, anti-smudge, lens topcoat, oleophobic',
    ),
  },

  // ── Coatings - Lens Varnish ─────────────────────────────────────────────
  {
    slug: 'z-117',
    productName: 'Z-117 Lens Varnish',
    descriptionShort:
      'Z-117 is a specialty varnish for plastic optical and ophthalmic lenses, providing hard-coat protection with excellent adhesion and optical clarity.',
    descriptionLong: [
      block(
        'Z-117 is a lens-grade varnish formulated to produce a thin, crosslinked protective film on plastic optical and ophthalmic lens substrates. It delivers improved scratch resistance, adhesion, and chemical durability while maintaining high optical transmission.',
      ),
      block(
        'It is compatible with standard dip-coating and thermal cure processes and can be used as a hard-coat under anti-reflection and hydrophobic topcoat stacks.',
      ),
    ],
    featureBullets: [
      'Lens-grade hard-coat varnish',
      'High optical clarity',
      'Excellent adhesion to plastic lenses',
      'Improved scratch resistance',
      'Compatible with AR/hydrophobic stacks',
    ],
    applicationTags: ['Lens Coating', 'Hard Coat', 'Ophthalmic', 'Optical Lenses'],
    seo: seo(
      'Z-117 Lens Varnish | Miki Sangyo USA',
      'Z-117 hard-coat varnish for plastic optical and ophthalmic lens manufacturing.',
      'Z-117, lens varnish, hard coat, ophthalmic coating',
    ),
  },

  // ── Commodity ───────────────────────────────────────────────────────────
  {
    slug: '3-chloropropene',
    productName: '3-Chloropropene (Allyl Chloride)',
    iupacName: '3-Chloroprop-1-ene',
    casNumber: '107-05-1',
    descriptionShort:
      'Allyl chloride (3-chloropropene) is a reactive bulk chemical intermediate used to manufacture epichlorohydrin, glycerin, allyl amines, allyl ethers, and specialty monomers.',
    descriptionLong: [
      block(
        '3-Chloropropene, commonly known as allyl chloride, is a highly reactive, low-boiling liquid that combines an allylic double bond with a labile chlorine. This dual reactivity makes it one of the most versatile C₃ building blocks in industrial organic chemistry.',
      ),
      block(
        'Its largest use is as the feedstock for epichlorohydrin — the precursor for epoxy resins and synthetic glycerin. It is also used to produce allylamines, allyl ethers, quaternary ammonium compounds, agrochemicals, and specialty pharmaceuticals.',
      ),
    ],
    featureBullets: [
      'Reactive allylic C₃ building block',
      'Feedstock for epichlorohydrin and synthetic glycerin',
      'Raw material for allyl amines and ethers',
      'Intermediate for epoxy resins',
      'Used in agrochemicals and pharma synthesis',
    ],
    applicationTags: ['Commodity Chemical', 'Epoxy Intermediates', 'Allyl Chemistry', 'Agrochemicals'],
    seo: seo(
      'Allyl Chloride 3-Chloropropene (CAS 107-05-1)',
      'High-purity allyl chloride for epichlorohydrin, allyl amines, allyl ethers, and specialty synthesis.',
      'allyl chloride, 3-chloropropene, 107-05-1, epichlorohydrin feedstock',
    ),
  },

  // ── Diols ───────────────────────────────────────────────────────────────
  {
    slug: 'deg',
    productName: 'Diethylene Glycol (DEG)',
    iupacName: '2,2′-Oxydiethanol',
    casNumber: '111-46-6',
    descriptionShort:
      'Diethylene glycol is a versatile bulk diol used in unsaturated polyester resins, polyurethanes, plasticizers, humectants, and as an industrial solvent.',
    descriptionLong: [
      block(
        'Diethylene glycol (DEG) is a colorless, hygroscopic, high-boiling diol produced as a co-product of ethylene glycol manufacture. It combines two reactive primary hydroxyl groups with an ether linkage that provides flexibility and hydrogen-bonding.',
      ),
      block(
        'DEG is used in unsaturated polyester resins, polyurethane polyols, alkyd coatings, triethylene glycol production, plasticizers, humectants for tobacco and adhesives, and as a dehydration agent in natural-gas processing.',
      ),
    ],
    featureBullets: [
      'Hygroscopic bulk diol',
      'Polyol for polyurethanes',
      'Building block for unsaturated polyester resins',
      'Feedstock for triethylene glycol',
      'Industrial humectant and solvent',
      'Natural-gas dehydration',
    ],
    applicationTags: ['Polyesters', 'Polyurethanes', 'Humectant', 'Solvent', 'Commodity Chemical'],
    seo: seo(
      'Diethylene Glycol DEG (CAS 111-46-6) | Miki Sangyo USA',
      'High-purity diethylene glycol for polyurethanes, unsaturated polyesters, and humectant applications.',
      'DEG, diethylene glycol, 111-46-6, polyurethane polyol, humectant',
    ),
  },
  {
    slug: 'meg',
    productName: 'Monoethylene Glycol (MEG)',
    iupacName: 'Ethane-1,2-diol',
    casNumber: '107-21-1',
    descriptionShort:
      'Monoethylene glycol is the largest-volume industrial diol used to produce PET resin and fiber, engine coolants, heat-transfer fluids, and polyurethane polyols.',
    descriptionLong: [
      block(
        'Monoethylene glycol (MEG), ethane-1,2-diol, is the simplest diol and one of the world\'s largest-volume petrochemicals. It is a colorless, odorless, sweet-tasting liquid with excellent water miscibility and a very low freezing point.',
      ),
      block(
        'Its dominant use is as the co-monomer with terephthalic acid for polyethylene terephthalate (PET) resin, fibers, and film. MEG is also the base fluid for engine antifreeze and heat-transfer fluids, a polyurethane polyol, and a feedstock for 1,4-dioxane and glyoxal.',
      ),
    ],
    featureBullets: [
      'Simplest industrial diol',
      'Primary monomer for PET resin and fiber',
      'Engine coolants and heat-transfer fluids',
      'Polyurethane polyol',
      'Water-miscible with low freezing point',
    ],
    applicationTags: ['PET Production', 'Polyurethanes', 'Coolants', 'Commodity Chemical'],
    seo: seo(
      'Monoethylene Glycol MEG (CAS 107-21-1) | Miki Sangyo USA',
      'High-purity MEG for PET polyester resin, antifreeze, heat-transfer fluids, and polyurethane polyols.',
      'MEG, monoethylene glycol, 107-21-1, PET monomer, antifreeze',
    ),
  },
  {
    slug: 'teg',
    productName: 'Triethylene Glycol (TEG)',
    iupacName: '2-[2-(2-Hydroxyethoxy)ethoxy]ethanol',
    casNumber: '112-27-6',
    descriptionShort:
      'Triethylene glycol is a high-boiling, hygroscopic diol widely used in natural-gas dehydration, humectants, plasticizers, and as a polyol for polyurethanes.',
    descriptionLong: [
      block(
        'Triethylene glycol (TEG) is a colorless, odorless, high-boiling, highly hygroscopic diol with three ether linkages between terminal hydroxyl groups. Its thermal stability and affinity for water make it ideal for dehydration and humidification applications.',
      ),
      block(
        'TEG is the industry-standard absorbent for natural-gas dehydration, a humectant in adhesives and textiles, a plasticizer intermediate, a polyol for polyurethanes, and a solvent for air disinfectant sprays.',
      ),
    ],
    featureBullets: [
      'Highly hygroscopic high-boiling diol',
      'Industry-standard natural-gas dehydration fluid',
      'Humectant in adhesives and textiles',
      'Polyurethane polyol',
      'Plasticizer intermediate',
    ],
    applicationTags: ['Natural Gas Dehydration', 'Humectant', 'Polyurethanes', 'Commodity Chemical'],
    seo: seo(
      'Triethylene Glycol TEG (CAS 112-27-6) | Miki Sangyo USA',
      'High-purity TEG for natural-gas dehydration, humectants, and polyurethane polyols.',
      'TEG, triethylene glycol, 112-27-6, natural gas dehydration, humectant',
    ),
  },

  // ── Epoxide ─────────────────────────────────────────────────────────────
  {
    slug: '2386-87-0',
    productName: '3,4-Epoxycyclohexylmethyl 3,4-Epoxycyclohexanecarboxylate',
    iupacName: '(3,4-Epoxycyclohexyl)methyl 3,4-epoxycyclohexane-1-carboxylate',
    casNumber: '2386-87-0',
    descriptionShort:
      'A cycloaliphatic diepoxide (commonly known as ERL-4221 / UVR-6105 / CEL-2021P type) producing UV-stable, transparent, low-dielectric thermosets for cationic UV cure and electrical/electronic applications.',
    descriptionLong: [
      block(
        '3,4-Epoxycyclohexylmethyl 3,4-epoxycyclohexanecarboxylate is one of the most widely used cycloaliphatic diepoxides. With two strained cyclohexene oxide rings, it cures rapidly under cationic initiation (photoacid or thermal), forming networks that are transparent, UV-stable, and low in dielectric loss.',
      ),
      block(
        'It is the workhorse monomer for UV/EB cationic cure inks, coatings, and 3D-printing resins, as well as for optical encapsulants, electrical castings, and low-stress electronic adhesives. Unlike aromatic epoxies, its saturated rings deliver outstanding color stability and weatherability.',
      ),
    ],
    featureBullets: [
      'Cycloaliphatic diepoxide',
      'Rapid cationic UV / thermal cure',
      'Transparent, non-yellowing networks',
      'Low dielectric constant and loss',
      'For UV inks, coatings, and 3D printing',
      'Electrical and optical encapsulation',
    ],
    applicationTags: ['Cationic UV Cure', 'Cycloaliphatic Epoxy', 'Optical Encapsulation', 'Electronic Adhesives', '3D Printing'],
    seo: seo(
      'Cycloaliphatic Diepoxide (CAS 2386-87-0) | Miki Sangyo USA',
      '3,4-Epoxycyclohexylmethyl 3,4-epoxycyclohexanecarboxylate for UV cationic cure and optical encapsulation.',
      '2386-87-0, cycloaliphatic epoxy, cationic UV cure, ERL-4221',
    ),
  },
  {
    slug: '29829-07-0',
    productName: 'Bis[(3,4-Epoxycyclohexyl)methyl] Adipate',
    iupacName: 'Bis[(3,4-epoxycyclohexyl)methyl] hexanedioate',
    casNumber: '29829-07-0',
    descriptionShort:
      'A flexible cycloaliphatic diepoxide with an adipate linker, delivering tough, UV-stable cationic-cure networks with improved flexibility over conventional cycloaliphatic epoxies.',
    descriptionLong: [
      block(
        'Bis[(3,4-epoxycyclohexyl)methyl] adipate is a cycloaliphatic diepoxide in which two epoxycyclohexane methyl groups are joined through an adipate diester linker. The flexible six-carbon diester backbone reduces cured-network brittleness compared to compact cycloaliphatic epoxies while preserving UV stability and optical clarity.',
      ),
      block(
        'It is used as a flexibilizing cycloaliphatic epoxy in cationic UV-cure coatings and adhesives, optical encapsulants, and electrical castings where toughness and weather resistance must both be high.',
      ),
    ],
    featureBullets: [
      'Flexible cycloaliphatic diepoxide',
      'Adipate-linked — improved toughness',
      'Cationic UV and thermal cure',
      'UV-stable, non-yellowing',
      'For flexible optical encapsulation',
      'Tough electronic adhesives',
    ],
    applicationTags: ['Cationic UV Cure', 'Cycloaliphatic Epoxy', 'Flexible Coatings', 'Optical Encapsulation'],
    seo: seo(
      'Bis(Epoxycyclohexylmethyl) Adipate (CAS 29829-07-0)',
      'Flexible cycloaliphatic diepoxide for tough, UV-stable cationic-cure coatings and encapsulants.',
      '29829-07-0, cycloaliphatic epoxy, flexible epoxy, cationic UV cure',
    ),
  },
  {
    slug: 'e201',
    productName: 'E201 Specialty Epoxide',
    descriptionShort:
      'E201 is a specialty epoxide resin used in high-performance coatings, electronic encapsulants, and optical thermoset applications.',
    descriptionLong: [
      block(
        'E201 is a specialty epoxide supplied as a reactive building block for thermoset formulations. It delivers a balance of processability, thermal stability, and optical clarity for applications where commodity epoxies fall short.',
      ),
      block(
        'Typical uses include high-performance coatings, optical encapsulants, electronic adhesives, and advanced composite matrix formulations. Full technical data is available on request.',
      ),
    ],
    featureBullets: [
      'Specialty epoxide resin',
      'Good thermal stability',
      'Suitable for optical encapsulation',
      'High-performance coatings and adhesives',
      'TDS available on request',
    ],
    applicationTags: ['Epoxy Resins', 'Coatings', 'Optical Encapsulation', 'Electronics'],
    seo: seo(
      'E201 Specialty Epoxide | Miki Sangyo USA',
      'E201 specialty epoxide resin for high-performance coatings and optical encapsulants.',
      'E201, specialty epoxide, epoxy resin',
    ),
  },
  {
    slug: 'tgmap',
    productName: 'TGMAP (Triglycidyl m-Aminophenol)',
    iupacName: 'N,N-Diglycidyl-4-glycidyloxyaniline (m-isomer)',
    casNumber: '5026-74-4',
    descriptionShort:
      'TGMAP is a trifunctional aromatic epoxy resin delivering high crosslink density, high Tg, and excellent mechanical performance for aerospace composites and structural adhesives.',
    descriptionLong: [
      block(
        'Triglycidyl m-aminophenol (TGMAP) is a trifunctional aromatic glycidyl amine epoxy built on the m-aminophenol backbone. Its three epoxy groups yield highly crosslinked networks with glass transition temperatures often exceeding 250 °C after amine cure.',
      ),
      block(
        'TGMAP is a key component of high-performance aerospace prepreg matrices, structural adhesives, and electronic laminates where high Tg, modulus, and hot/wet performance are required.',
      ),
    ],
    featureBullets: [
      'Trifunctional aromatic glycidyl amine epoxy',
      'Very high crosslink density',
      'Tg often above 250 °C',
      'For aerospace prepreg matrices',
      'Structural adhesives and laminates',
    ],
    applicationTags: ['Epoxy Resins', 'Aerospace Composites', 'Structural Adhesives', 'High-Tg Polymers'],
    seo: seo(
      'TGMAP Triglycidyl m-Aminophenol Epoxy',
      'Trifunctional TGMAP epoxy resin for aerospace composites and high-Tg structural adhesives.',
      'TGMAP, triglycidyl m-aminophenol, aerospace epoxy, high Tg',
    ),
  },
  {
    slug: 'tgpap',
    productName: 'TGPAP (Triglycidyl p-Aminophenol)',
    iupacName: 'N,N-Diglycidyl-4-glycidyloxyaniline',
    casNumber: '5026-74-4',
    descriptionShort:
      'TGPAP is a trifunctional aromatic epoxy resin — the para-aminophenol isomer — delivering very high Tg, high modulus, and low viscosity for aerospace prepregs and structural adhesives.',
    descriptionLong: [
      block(
        'Triglycidyl p-aminophenol (TGPAP) is a trifunctional aromatic glycidyl amine epoxy based on the para-aminophenol backbone. It is one of the lowest-viscosity high-functional epoxies available, which makes it ideal for resin transfer molding (RTM) and infusion processes while still delivering Tg values above 250 °C after amine cure.',
      ),
      block(
        'TGPAP is a cornerstone resin for aerospace prepreg systems, structural adhesives, and electronic laminates requiring maximum hot/wet performance and mechanical retention at elevated temperatures.',
      ),
    ],
    featureBullets: [
      'Trifunctional aromatic glycidyl amine epoxy',
      'Very low viscosity — ideal for RTM/infusion',
      'Tg above 250 °C',
      'High modulus and hot/wet performance',
      'Standard aerospace prepreg component',
    ],
    applicationTags: ['Epoxy Resins', 'Aerospace Composites', 'RTM / Infusion', 'Structural Adhesives', 'High-Tg Polymers'],
    seo: seo(
      'TGPAP Triglycidyl p-Aminophenol Epoxy',
      'Low-viscosity trifunctional TGPAP epoxy for aerospace prepreg and RTM composite matrices.',
      'TGPAP, triglycidyl p-aminophenol, aerospace epoxy, RTM resin',
    ),
  },

  // ── Fluorene derivatives ────────────────────────────────────────────────
  {
    slug: 'bafl',
    productName: 'BAFL (9,9-Bis(4-aminophenyl)fluorene)',
    iupacName: '4,4′-(9H-Fluorene-9,9-diyl)dianiline',
    casNumber: '15499-84-0',
    descriptionShort:
      'BAFL is a fluorene-based cardo aromatic diamine used to make transparent, high-Tg, low-birefringence polyimides and polyamides for optical and electronic applications.',
    descriptionLong: [
      block(
        '9,9-Bis(4-aminophenyl)fluorene (BAFL) is a cardo-structure aromatic diamine in which two aminophenyl groups are joined through the 9,9′-position of a fluorene unit. The rigid, orthogonal fluorene cage disrupts chain packing and suppresses birefringence, yielding polymers with exceptional optical transparency and dimensional isotropy.',
      ),
      block(
        'Polymers built from BAFL combine Tg values often above 300 °C with high refractive index, low birefringence, and visible-light transparency. Applications include flexible OLED substrates, optical films, high-performance photoresists, and transparent electronic materials.',
      ),
    ],
    featureBullets: [
      'Fluorene cardo aromatic diamine',
      'High-Tg, transparent polyimides',
      'Low birefringence and high refractive index',
      'For flexible display substrates',
      'Photoresist and optical film applications',
    ],
    applicationTags: ['Fluorene Monomers', 'Polyimides', 'Optical Films', 'Flexible Displays', 'High-Tg Polymers'],
    seo: seo(
      'BAFL 9,9-Bis(4-aminophenyl)fluorene (CAS 15499-84-0)',
      'BAFL fluorene cardo diamine for transparent high-Tg polyimides and optical films.',
      'BAFL, 9,9-bis(4-aminophenyl)fluorene, 15499-84-0, cardo diamine, fluorene',
    ),
  },
  {
    slug: 'bahf',
    productName: 'BAHF (2,2-Bis(3-amino-4-hydroxyphenyl)hexafluoropropane)',
    iupacName: '4,4′-(Hexafluoroisopropylidene)bis(2-aminophenol)',
    casNumber: '83558-87-6',
    descriptionShort:
      'BAHF is a fluorinated aromatic diamine-diol monomer used to synthesize polybenzoxazoles and polyimides with low dielectric constant, high transparency, and outstanding thermal stability.',
    descriptionLong: [
      block(
        'BAHF combines two ortho-aminophenol groups bridged by a hexafluoroisopropylidene linker. Its dual amine and hydroxyl functionality enables synthesis of polybenzoxazoles (PBOs) through cyclization, while the fluorinated bridge imparts low dielectric constant, low moisture uptake, and high optical transparency.',
      ),
      block(
        'BAHF-based polymers are used in photosensitive polyimide and PBO formulations for advanced semiconductor packaging, flexible displays, and low-Dk interlayer dielectrics.',
      ),
    ],
    featureBullets: [
      'Fluorinated amino-phenol monomer',
      'Precursor to polybenzoxazoles (PBOs)',
      'Low dielectric constant and moisture uptake',
      'High optical transparency',
      'For photosensitive polyimides and advanced packaging',
    ],
    applicationTags: ['Fluorene / Fluorinated Monomers', 'Polyimides', 'Polybenzoxazoles', 'Low-Dk Materials', 'Advanced Packaging'],
    seo: seo(
      'BAHF Fluorinated Amino-Phenol (CAS 83558-87-6)',
      'BAHF fluorinated amino-phenol monomer for PBO and low-Dk polyimide synthesis.',
      'BAHF, 83558-87-6, polybenzoxazole, fluorinated diamine, low-Dk',
    ),
  },
  {
    slug: 'baofl',
    productName: 'BAOFL (9,9-Bis(4-aminophenoxyphenyl)fluorene)',
    iupacName: '9,9-Bis[4-(4-aminophenoxy)phenyl]fluorene',
    casNumber: '117363-47-4',
    descriptionShort:
      'BAOFL is a fluorene-based ether-linked aromatic diamine producing soluble, transparent, high-Tg polyimides with improved processability and low birefringence.',
    descriptionLong: [
      block(
        'BAOFL is a fluorene cardo diamine in which the aminophenyl groups are joined to the fluorene core through flexible ether (phenoxy) linkages. The ether groups improve solubility and processability of derived polymers while the rigid fluorene maintains high Tg and suppresses birefringence.',
      ),
      block(
        'Polyimides from BAOFL are used in flexible display substrates, optical films, transparent electronic materials, and photosensitive polyimide formulations for advanced packaging.',
      ),
    ],
    featureBullets: [
      'Fluorene cardo diamine with ether linkage',
      'Produces soluble, processable polyimides',
      'High Tg and optical transparency',
      'Low birefringence',
      'For flexible displays and advanced packaging',
    ],
    applicationTags: ['Fluorene Monomers', 'Polyimides', 'Optical Films', 'Flexible Displays', 'Advanced Packaging'],
    seo: seo(
      'BAOFL Fluorene Ether Diamine | Miki Sangyo USA',
      'BAOFL fluorene ether diamine for soluble, transparent high-Tg polyimides.',
      'BAOFL, fluorene diamine, cardo polyimide, optical polyimide',
    ),
  },
  {
    slug: 'bapf',
    productName: 'BAPF (9,9-Bis(aminophenyl)fluorene derivative)',
    iupacName: '9,9-Bis(4-aminophenyl)fluorene',
    casNumber: '15499-84-0',
    descriptionShort:
      'BAPF is a fluorene-based cardo aromatic diamine used as a monomer for transparent, high-Tg polyimides, polyamides, and optical polymers.',
    descriptionLong: [
      block(
        'BAPF is a cardo-structure fluorene aromatic diamine. Its orthogonal, rigid fluorene core disrupts chain packing in derived polymers, yielding polyimides and polyamides with outstanding optical transparency, high refractive index, and glass transition temperatures often exceeding 300 °C.',
      ),
      block(
        'BAPF is used in the synthesis of transparent polyimides for flexible OLED substrates, optical films, high-performance photoresists, and other advanced electronic materials.',
      ),
    ],
    featureBullets: [
      'Fluorene cardo aromatic diamine',
      'High Tg and high refractive index',
      'Visible-light transparency',
      'For transparent polyimides',
      'Flexible display and photoresist applications',
    ],
    applicationTags: ['Fluorene Monomers', 'Polyimides', 'Optical Films', 'Flexible Displays', 'Specialty Diamine'],
    seo: seo(
      'BAPF Fluorene Diamine | Miki Sangyo USA',
      'BAPF fluorene cardo diamine for transparent, high-Tg polyimide and optical polymer synthesis.',
      'BAPF, fluorene diamine, cardo polyimide, optical polyimide',
    ),
  },

  // ── Lens Manufacturing ──────────────────────────────────────────────────
  {
    slug: 'riki-16js',
    productName: 'RIKI 16JS Lens Material',
    descriptionShort:
      'RIKI 16JS is a specialty monomer system for high-index ophthalmic lens manufacturing, delivering excellent optical clarity, impact resistance, and processability.',
    descriptionLong: [
      block(
        'RIKI 16JS is a lens-grade monomer formulation developed for high-refractive-index ophthalmic lenses. It is designed for conventional cast-molding processes and yields lenses with high optical transmission, low chromatic aberration, and good mechanical toughness.',
      ),
      block(
        'Typical applications include prescription eyewear lenses with mid-to-high refractive index (around 1.60), sunglasses, and specialty optical components.',
      ),
    ],
    featureBullets: [
      'High-index ophthalmic lens monomer',
      'Cast-moldable formulation',
      'High optical transmission',
      'Good impact resistance',
      'For prescription eyewear',
    ],
    applicationTags: ['Lens Manufacturing', 'Ophthalmic', 'High-Index Lenses', 'Optical Materials'],
    seo: seo(
      'RIKI 16JS High-Index Lens Monomer | Miki Sangyo USA',
      'RIKI 16JS monomer system for high-index ophthalmic lens manufacturing.',
      'RIKI 16JS, high index lens, ophthalmic monomer',
    ),
  },
  {
    slug: 'tl-3',
    productName: 'TL-3 Lens Manufacturing Additive',
    descriptionShort:
      'TL-3 is a specialty additive for ophthalmic lens manufacturing, supporting process stability, optical clarity, and lens performance.',
    descriptionLong: [
      block(
        'TL-3 is a lens-grade specialty additive used during ophthalmic lens casting and curing. It supports process stability and contributes to optical performance, clarity, and handling of finished lenses.',
      ),
      block(
        'It is typically used in conjunction with high-index monomer systems in cast-molded lens manufacturing. Full technical details are available on request.',
      ),
    ],
    featureBullets: [
      'Lens-grade specialty additive',
      'Supports casting process stability',
      'Maintains optical clarity',
      'For high-index monomer systems',
      'TDS available on request',
    ],
    applicationTags: ['Lens Manufacturing', 'Ophthalmic', 'Optical Materials', 'Process Additive'],
    seo: seo(
      'TL-3 Lens Manufacturing Additive | Miki Sangyo USA',
      'TL-3 specialty additive for ophthalmic lens casting and curing processes.',
      'TL-3, lens additive, ophthalmic manufacturing',
    ),
  },
  {
    slug: 'tp-7673',
    productName: 'TP-7673 Lens Manufacturing Material',
    descriptionShort:
      'TP-7673 is a specialty lens-grade material used in ophthalmic and optical lens manufacturing for process and performance enhancement.',
    descriptionLong: [
      block(
        'TP-7673 is a specialty material supplied for ophthalmic and optical lens manufacturing. It is formulated to support lens casting and curing processes, contributing to optical clarity and finished lens performance.',
      ),
      block(
        'Typical applications include high-index and mid-index ophthalmic lens systems. Full TDS and handling details are available on request.',
      ),
    ],
    featureBullets: [
      'Specialty lens-manufacturing material',
      'Supports casting and curing',
      'Contributes to optical clarity',
      'For ophthalmic lens systems',
      'TDS available on request',
    ],
    applicationTags: ['Lens Manufacturing', 'Ophthalmic', 'Optical Materials'],
    seo: seo(
      'TP-7673 Lens Manufacturing Material | Miki Sangyo USA',
      'TP-7673 specialty material for ophthalmic and optical lens manufacturing.',
      'TP-7673, lens manufacturing, ophthalmic material',
    ),
  },
  {
    slug: 'tt-55',
    productName: 'TT-55 Lens Manufacturing Material',
    descriptionShort:
      'TT-55 is a specialty lens-grade material used in ophthalmic and optical lens manufacturing to support casting, curing, and finished-lens performance.',
    descriptionLong: [
      block(
        'TT-55 is a lens-grade specialty material developed for ophthalmic and optical lens manufacturing. It supports casting and curing processes and contributes to finished lens optical clarity, toughness, and durability.',
      ),
      block(
        'TT-55 is typically used in combination with mid- and high-index monomer systems. Full technical data is available on request.',
      ),
    ],
    featureBullets: [
      'Specialty lens-manufacturing material',
      'Supports casting and curing',
      'Contributes to lens clarity and durability',
      'Compatible with mid/high-index systems',
      'TDS available on request',
    ],
    applicationTags: ['Lens Manufacturing', 'Ophthalmic', 'Optical Materials'],
    seo: seo(
      'TT-55 Lens Manufacturing Material | Miki Sangyo USA',
      'TT-55 specialty lens material for ophthalmic casting and curing processes.',
      'TT-55, lens manufacturing, ophthalmic material',
    ),
  },

  // ── Methacrylates ───────────────────────────────────────────────────────
  {
    slug: 'biphenylyl-methacrylate',
    productName: 'Biphenylyl Methacrylate',
    iupacName: '[1,1′-Biphenyl]-4-yl 2-methylprop-2-enoate',
    casNumber: '24308-78-1',
    descriptionShort:
      'Biphenylyl methacrylate is an aromatic methacrylate monomer with a biphenyl pendant, used to make high-refractive-index transparent polymers for optical and ophthalmic applications.',
    descriptionLong: [
      block(
        'Biphenyl-4-yl methacrylate is an aromatic methacrylate monomer featuring a rigid biphenyl group attached to the methacrylate ester oxygen. Incorporating biphenyl rings into an acrylic polymer sharply increases refractive index while maintaining optical transparency, Tg, and thermal stability.',
      ),
      block(
        'It is used as a co-monomer in high-refractive-index acrylic polymers for ophthalmic lenses, optical films, LED encapsulants, and light-management layers in displays.',
      ),
    ],
    featureBullets: [
      'Aromatic high-RI methacrylate monomer',
      'Biphenyl pendant for high refractive index',
      'Optical transparency',
      'Compatible with standard radical polymerization',
      'For high-index lenses and optical films',
    ],
    applicationTags: ['Methacrylates', 'High-Index Polymers', 'Optical Materials', 'Lens Monomers'],
    seo: seo(
      'Biphenylyl Methacrylate (CAS 24308-78-1) | Miki Sangyo USA',
      'Biphenyl methacrylate aromatic monomer for high-refractive-index optical and lens polymers.',
      'biphenylyl methacrylate, 24308-78-1, high RI monomer, optical methacrylate',
    ),
  },
  {
    slug: 'ctfma',
    productName: 'CTFMA (2,2,2-Trifluoroethyl Methacrylate)',
    iupacName: '2,2,2-Trifluoroethyl 2-methylprop-2-enoate',
    casNumber: '352-87-4',
    descriptionShort:
      'CTFMA is a fluorinated methacrylate monomer used to make low-surface-energy, low-refractive-index, chemically resistant polymers for coatings, optical films, and specialty elastomers.',
    descriptionLong: [
      block(
        '2,2,2-Trifluoroethyl methacrylate (CTFMA) is a fluorinated methacrylate whose pendant trifluoroethyl group imparts low surface energy, low refractive index, and excellent chemical and weather resistance to the resulting polymers.',
      ),
      block(
        'CTFMA is used as a co-monomer in hydrophobic and oleophobic coatings, low-RI cladding layers for polymer optical fibers, anti-fouling surfaces, and specialty methacrylate elastomers and adhesives.',
      ),
    ],
    featureBullets: [
      'Fluorinated methacrylate monomer',
      'Low surface energy',
      'Low refractive index',
      'Excellent chemical and weather resistance',
      'For hydrophobic coatings and POF cladding',
    ],
    applicationTags: ['Fluoromethacrylates', 'Hydrophobic Coatings', 'Optical Fibers', 'Low-RI Polymers'],
    seo: seo(
      'CTFMA Trifluoroethyl Methacrylate (CAS 352-87-4)',
      'CTFMA fluorinated methacrylate for hydrophobic coatings, low-RI polymers, and POF cladding.',
      'CTFMA, trifluoroethyl methacrylate, 352-87-4, fluoromethacrylate',
    ),
  },
  {
    slug: 'gmec',
    productName: 'GMEC Specialty Methacrylate',
    descriptionShort:
      'GMEC is a specialty functional methacrylate monomer used as a building block in specialty acrylic polymers, coatings, and adhesives.',
    descriptionLong: [
      block(
        'GMEC is a specialty functional methacrylate monomer supplied as a building block for advanced acrylic polymers. Its functionality enables tailored properties such as adhesion, crosslinking, or compatibilization in formulated coatings, adhesives, and resins.',
      ),
      block(
        'Typical applications include specialty coatings, pressure-sensitive and structural adhesives, and engineering acrylic polymers. Full TDS is available on request.',
      ),
    ],
    featureBullets: [
      'Functional methacrylate monomer',
      'Enables tailored polymer properties',
      'For specialty coatings and adhesives',
      'Compatible with standard radical polymerization',
      'TDS available on request',
    ],
    applicationTags: ['Methacrylates', 'Specialty Coatings', 'Adhesives', 'Specialty Monomer'],
    seo: seo(
      'GMEC Specialty Methacrylate | Miki Sangyo USA',
      'GMEC functional methacrylate monomer for specialty coatings and adhesives.',
      'GMEC, specialty methacrylate, functional monomer',
    ),
  },
  {
    slug: 'glycerol-carbonate-methacrylate',
    productName: 'Glycerol Carbonate Methacrylate',
    iupacName: '(2-Oxo-1,3-dioxolan-4-yl)methyl methacrylate',
    casNumber: '13818-44-5',
    descriptionShort:
      'Glycerol carbonate methacrylate is a bifunctional monomer combining a polymerizable methacrylate with a reactive cyclic carbonate, enabling dual-cure polymers, non-isocyanate polyurethanes, and bio-based coatings.',
    descriptionLong: [
      block(
        'Glycerol carbonate methacrylate, (2-oxo-1,3-dioxolan-4-yl)methyl methacrylate, is a bifunctional monomer pairing a radically polymerizable methacrylate with a cyclic carbonate ring. This dual functionality lets the same molecule first build an acrylic polymer backbone, then undergo ring-opening with amines to form hydroxy-urethane (non-isocyanate urethane) crosslinks.',
      ),
      block(
        'It is used as a building block for dual-cure coatings, non-isocyanate polyurethane (NIPU) systems, bio-based functional polymers, and surface-functionalization monomers for adhesion promotion.',
      ),
    ],
    featureBullets: [
      'Bifunctional methacrylate + cyclic carbonate',
      'Enables non-isocyanate polyurethane (NIPU) chemistry',
      'Dual-cure polymer building block',
      'Bio-based feedstock compatibility',
      'Adhesion-promoting functional monomer',
    ],
    applicationTags: ['Methacrylates', 'Non-Isocyanate Polyurethanes', 'Dual Cure', 'Functional Monomers', 'Coatings'],
    seo: seo(
      'Glycerol Carbonate Methacrylate (CAS 13818-44-5)',
      'Bifunctional glycerol carbonate methacrylate for dual-cure and non-isocyanate polyurethane systems.',
      'glycerol carbonate methacrylate, 13818-44-5, cyclic carbonate monomer, NIPU',
    ),
  },
  {
    slug: 'mma',
    productName: 'Methyl Methacrylate (MMA)',
    iupacName: 'Methyl 2-methylprop-2-enoate',
    casNumber: '80-62-6',
    descriptionShort:
      'Methyl methacrylate is the world\'s largest-volume methacrylate monomer, used to produce PMMA (acrylic glass), coatings, adhesives, and specialty copolymers.',
    descriptionLong: [
      block(
        'Methyl methacrylate (MMA) is a colorless, low-viscosity liquid and the most widely used methacrylate monomer. It polymerizes readily by free-radical mechanisms to form poly(methyl methacrylate) (PMMA) — a transparent, UV-stable, impact-modifiable plastic commonly known as acrylic glass or Plexiglas-type resin.',
      ),
      block(
        'MMA is the building block for cast and extruded acrylic sheet, molding compounds, emulsion and solvent-borne acrylic coatings, dental and bone cements, pressure-sensitive adhesives, and a huge range of specialty copolymers.',
      ),
    ],
    featureBullets: [
      'Largest-volume methacrylate monomer',
      'Precursor to PMMA (acrylic glass)',
      'Excellent optical clarity and UV stability',
      'For cast/extruded sheet and molding compounds',
      'Acrylic coatings and adhesives',
      'Dental and bone cements',
    ],
    applicationTags: ['Methacrylates', 'PMMA', 'Coatings', 'Adhesives', 'Commodity Monomer'],
    seo: seo(
      'Methyl Methacrylate MMA (CAS 80-62-6) | Miki Sangyo USA',
      'High-purity MMA methyl methacrylate monomer for PMMA acrylic sheet, coatings, and adhesives.',
      'MMA, methyl methacrylate, 80-62-6, PMMA, acrylic monomer',
    ),
  },

  // ── Phthalates ──────────────────────────────────────────────────────────
  {
    slug: 'daip-m',
    productName: 'DAIP-M (Diallyl Isophthalate Monomer)',
    iupacName: 'Di(prop-2-en-1-yl) benzene-1,3-dicarboxylate',
    casNumber: '1087-21-4',
    descriptionShort:
      'Diallyl isophthalate monomer (DAIP-M) is a high-performance crosslinkable allyl monomer used to produce heat-resistant, dimensionally stable thermosets for electrical, electronic, and composite applications.',
    descriptionLong: [
      block(
        'Diallyl isophthalate (DAIP) is the meta-isomer of diallyl phthalate, featuring two allyl ester groups in the 1,3-positions of a benzene ring. The meta substitution yields polymers with higher heat resistance and dimensional stability than the ortho-phthalate analog.',
      ),
      block(
        'DAIP monomer is used to produce prepolymers that cure into highly crosslinked thermosets with outstanding electrical insulation, dimensional stability, and chemical resistance — widely used in electrical connectors, aerospace components, and glass-reinforced molding compounds.',
      ),
    ],
    featureBullets: [
      'Meta-diallyl phthalate monomer',
      'High heat and dimensional stability',
      'Excellent electrical insulation',
      'For heat-resistant connectors and composites',
      'Glass-reinforced molding compounds',
    ],
    applicationTags: ['Allyl Monomers', 'Thermoset Resins', 'Electrical Connectors', 'Composites', 'High-Heat Plastics'],
    seo: seo(
      'DAIP-M Diallyl Isophthalate Monomer (CAS 1087-21-4)',
      'DAIP-M meta-diallyl phthalate monomer for heat-resistant electrical and composite thermosets.',
      'DAIP, diallyl isophthalate, 1087-21-4, allyl monomer, thermoset',
    ),
  },
  {
    slug: 'daip-prepolymer',
    productName: 'DAIP Prepolymer (Diallyl Isophthalate Prepolymer)',
    descriptionShort:
      'DAIP prepolymer is a partially polymerized diallyl isophthalate resin used to produce heat-resistant, dimensionally stable thermoset molding compounds for electrical and electronic applications.',
    descriptionLong: [
      block(
        'DAIP prepolymer is produced by partial polymerization of diallyl isophthalate monomer, yielding a solid resin with residual allyl functionality. It is formulated with fillers, glass fiber, and peroxide initiators into high-performance thermoset molding compounds.',
      ),
      block(
        'Cured DAIP prepolymer delivers some of the best dimensional stability, electrical insulation, and chemical resistance of any thermoset, making it the standard material for high-reliability electrical connectors, sockets, and aerospace electronic housings.',
      ),
    ],
    featureBullets: [
      'Partially polymerized DAIP resin',
      'For glass-reinforced thermoset molding',
      'Outstanding dimensional stability',
      'Excellent electrical insulation',
      'For high-reliability connectors',
    ],
    applicationTags: ['Allyl Monomers', 'Thermoset Resins', 'Molding Compounds', 'Electrical Connectors', 'Aerospace Electronics'],
    seo: seo(
      'DAIP Prepolymer Diallyl Isophthalate | Miki Sangyo USA',
      'DAIP prepolymer for heat-resistant thermoset molding compounds and electrical connectors.',
      'DAIP prepolymer, diallyl isophthalate, thermoset molding, electrical connector',
    ),
  },
  {
    slug: 'dap-prepolymer',
    productName: 'DAP Prepolymer (Diallyl Phthalate Prepolymer)',
    descriptionShort:
      'DAP prepolymer is a partially polymerized diallyl phthalate resin used in glass-reinforced thermoset molding compounds for high-reliability electrical, electronic, and aerospace components.',
    descriptionLong: [
      block(
        'DAP prepolymer is produced by partial polymerization of diallyl phthalate monomer, giving a solid resin with residual allyl groups. It is compounded with fillers, glass fiber, and peroxide initiators into thermoset molding compounds that cure rapidly to dense, dimensionally stable parts.',
      ),
      block(
        'Cured DAP is among the most dimensionally stable thermosets available, with outstanding electrical insulation properties, low moisture uptake, and excellent chemical and arc resistance. It is the material of choice for military and aerospace connectors, IC sockets, and high-reliability electronic housings.',
      ),
    ],
    featureBullets: [
      'Partially polymerized diallyl phthalate',
      'Glass-reinforced thermoset molding compound',
      'Best-in-class dimensional stability',
      'Low moisture uptake',
      'Outstanding electrical insulation',
      'Mil-spec electrical connectors',
    ],
    applicationTags: ['Allyl Monomers', 'Thermoset Resins', 'Molding Compounds', 'Mil-Spec Connectors', 'Aerospace Electronics'],
    seo: seo(
      'DAP Prepolymer Diallyl Phthalate | Miki Sangyo USA',
      'DAP prepolymer thermoset resin for mil-spec connectors and aerospace electronic components.',
      'DAP prepolymer, diallyl phthalate, thermoset, mil-spec connector',
    ),
  },

  // ── Polymer (R&D) ───────────────────────────────────────────────────────
  {
    slug: 'rd24-083-3',
    productName: 'RD24-083-3 Development Polymer Sample',
    descriptionShort:
      'RD24-083-3 is a development-stage polymer research sample. Structure, properties, and availability are subject to ongoing R&D — contact us for details.',
    descriptionLong: [
      block(
        'RD24-083-3 is an internal development-stage polymer sample supplied for evaluation and collaborative R&D programs. Full structural, property, and handling details are not publicly disclosed and may evolve as the project advances.',
      ),
      block(
        'If you are interested in evaluating RD24-083-3 for a specific application, please contact Miki Sangyo USA to discuss availability, technical data, and non-disclosure arrangements.',
      ),
    ],
    featureBullets: [
      'Development-stage polymer sample',
      'R&D and evaluation only',
      'Technical data under NDA',
      'Contact us for availability',
    ],
    applicationTags: ['R&D Sample', 'Development Polymer', 'Specialty Polymers'],
    seo: seo(
      'RD24-083-3 Development Polymer | Miki Sangyo USA',
      'RD24-083-3 development-stage polymer research sample — contact us for details.',
      'RD24-083-3, development polymer, R&D sample, specialty polymer',
    ),
  },

  // ── Toluidine ───────────────────────────────────────────────────────────
  {
    slug: 'demt',
    productName: 'N,N-Diethyl-m-toluidine (DEmT)',
    iupacName: 'N,N-Diethyl-3-methylaniline',
    casNumber: '91-67-8',
    descriptionShort:
      'N,N-Diethyl-m-toluidine (DEmT) is a tertiary aromatic amine used as a room-temperature polymerization accelerator for peroxide-initiated acrylic, methacrylate, and unsaturated polyester resins — including dental, bone cement, and structural adhesive systems.',
    descriptionLong: [
      block(
        'N,N-Diethyl-m-toluidine (DEmT) is a tertiary aromatic amine commonly used as an accelerator (activator) in redox cure systems with organic peroxides such as benzoyl peroxide. The amine lone pair promotes low-temperature decomposition of the peroxide, enabling rapid room-temperature cure of methacrylate and unsaturated polyester resins.',
      ),
      block(
        'It is widely used in dental self-cure resins, bone cements (PMMA), anaerobic and structural acrylic adhesives, and cold-cure unsaturated polyester systems. DEmT generally offers lower discoloration than its p-toluidine analog.',
      ),
    ],
    featureBullets: [
      'Tertiary aromatic amine accelerator',
      'Redox cure with organic peroxides',
      'Rapid room-temperature methacrylate cure',
      'For dental and bone cement systems',
      'Structural acrylic and UP adhesives',
      'Lower discoloration than para-isomer',
    ],
    applicationTags: ['Polymerization Accelerator', 'Dental Resins', 'Bone Cement', 'Acrylic Adhesives', 'Toluidines'],
    seo: seo(
      'N,N-Diethyl-m-toluidine DEmT (CAS 91-67-8)',
      'DEmT tertiary amine accelerator for room-temperature cure of methacrylate and polyester resins.',
      'DEmT, N,N-diethyl-m-toluidine, 91-67-8, polymerization accelerator, dental resin',
    ),
  },
  {
    slug: 'dmpt',
    productName: 'N,N-Dimethyl-p-toluidine (DMpT)',
    iupacName: 'N,N,4-Trimethylaniline',
    casNumber: '99-97-8',
    descriptionShort:
      'N,N-Dimethyl-p-toluidine (DMpT) is a tertiary aromatic amine accelerator widely used with organic peroxides to enable rapid room-temperature cure of methacrylate and unsaturated polyester resins in dental, bone cement, and adhesive applications.',
    descriptionLong: [
      block(
        'N,N-Dimethyl-p-toluidine (DMpT) is one of the most widely used tertiary amine accelerators for peroxide-initiated redox cure systems. Combined with benzoyl peroxide it drives rapid room-temperature polymerization of methacrylates and unsaturated polyesters.',
      ),
      block(
        'It is the standard activator in PMMA dental self-cure resins, orthopedic bone cements, anaerobic and structural acrylic adhesives, and cold-cure unsaturated polyester casting systems.',
      ),
    ],
    featureBullets: [
      'Tertiary aromatic amine accelerator',
      'Standard activator with benzoyl peroxide',
      'Rapid room-temperature cure',
      'Used in dental self-cure resins',
      'PMMA bone cement systems',
      'Structural acrylic adhesives',
    ],
    applicationTags: ['Polymerization Accelerator', 'Dental Resins', 'Bone Cement', 'Acrylic Adhesives', 'Toluidines'],
    seo: seo(
      'N,N-Dimethyl-p-toluidine DMpT (CAS 99-97-8)',
      'DMpT tertiary amine accelerator for dental resins, bone cement, and structural acrylic adhesives.',
      'DMpT, N,N-dimethyl-p-toluidine, 99-97-8, accelerator, bone cement',
    ),
  },
  {
    slug: 'emt',
    productName: 'N-Ethyl-m-toluidine (EmT)',
    iupacName: 'N-Ethyl-3-methylaniline',
    casNumber: '102-27-2',
    descriptionShort:
      'N-Ethyl-m-toluidine is a secondary aromatic amine used as an intermediate in dyes, pigments, agrochemicals, and polymerization accelerators.',
    descriptionLong: [
      block(
        'N-Ethyl-m-toluidine is a secondary aromatic amine combining an ethyl-substituted amine with a meta-methyl aniline ring. Its reactive N-H and aromatic ring make it a versatile building block for synthesis of tertiary amines, dyes, and specialty chemicals.',
      ),
      block(
        'It is used as an intermediate in the production of xanthene and triphenylmethane dyes, pigments, agrochemicals, and tertiary amine polymerization accelerators.',
      ),
    ],
    featureBullets: [
      'Secondary aromatic amine',
      'Meta-substituted toluidine',
      'Intermediate for dyes and pigments',
      'Precursor for tertiary amines',
      'Used in agrochemical synthesis',
    ],
    applicationTags: ['Toluidines', 'Dye Intermediate', 'Agrochemicals', 'Specialty Amines'],
    seo: seo(
      'N-Ethyl-m-toluidine EmT (CAS 102-27-2) | Miki Sangyo USA',
      'N-Ethyl-m-toluidine secondary aromatic amine intermediate for dyes, pigments, and specialty chemicals.',
      'EmT, N-ethyl-m-toluidine, 102-27-2, aromatic amine, dye intermediate',
    ),
  },
  {
    slug: 'eot',
    productName: 'N-Ethyl-o-toluidine (EoT)',
    iupacName: 'N-Ethyl-2-methylaniline',
    casNumber: '94-68-8',
    descriptionShort:
      'N-Ethyl-o-toluidine is a secondary aromatic amine used as an intermediate in the production of dyes, pigments, agrochemicals, and specialty amines.',
    descriptionLong: [
      block(
        'N-Ethyl-o-toluidine is a secondary aromatic amine derived from o-toluidine by N-ethylation. Its secondary amine functionality and ortho-methyl aromatic ring make it a useful intermediate for further alkylation, diazotization, and coupling reactions.',
      ),
      block(
        'It is used in the synthesis of dyes and pigments, tertiary amine accelerators, agrochemicals, and specialty chemical intermediates.',
      ),
    ],
    featureBullets: [
      'Secondary aromatic amine',
      'Ortho-substituted toluidine',
      'Intermediate for dyes and pigments',
      'Precursor for tertiary amines',
      'Agrochemical synthesis',
    ],
    applicationTags: ['Toluidines', 'Dye Intermediate', 'Agrochemicals', 'Specialty Amines'],
    seo: seo(
      'N-Ethyl-o-toluidine EoT (CAS 94-68-8) | Miki Sangyo USA',
      'N-Ethyl-o-toluidine secondary aromatic amine for dye, pigment, and agrochemical synthesis.',
      'EoT, N-ethyl-o-toluidine, 94-68-8, aromatic amine, dye intermediate',
    ),
  },
]

// ────────────────────────────────────────────────────────────────────────────
// Run patches
// ────────────────────────────────────────────────────────────────────────────
let ok = 0
let fail = 0
for (const p of products) {
  const {slug, ...fields} = p
  // Strip undefined keys so we don't wipe unrelated data
  const payload = {}
  for (const [k2, v] of Object.entries(fields)) {
    if (v !== undefined && v !== null && v !== '') payload[k2] = v
  }
  try {
    await c.patch(`product-${slug}`).set(payload).commit()
    console.log(`✓ product-${slug}`)
    ok++
  } catch (err) {
    console.error(`✗ product-${slug} —`, err?.message || err)
    fail++
  }
}

console.log(`\nDone. ${ok} succeeded, ${fail} failed (of ${products.length}).`)
