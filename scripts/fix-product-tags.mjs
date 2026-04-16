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

// ────────────────────────────────────────────────────────────────────────────
// Corrected application tags & descriptions aligned to actual Miki markets:
//   Semiconductor, Aerospace, Specialty Resins (DAP/DAIP), Polyimides,
//   Bismaleimides, Optical Materials, Pharma/Bio, EV Battery, Custom Synthesis
// ────────────────────────────────────────────────────────────────────────────
const fixes = [
  // ── Adamantyl ──────────────────────────────────────────────────────────
  {
    slug: '1-adamantanecarboxylic-acid',
    applicationTags: ['Semiconductor Lithography', 'ArF Photoresists', 'High-Tg Polymers', 'Pharma Intermediate', 'Low-Dk Materials'],
    descriptionShort:
      '1-Adamantanecarboxylic acid is a rigid, cage-structured carboxylic acid — a key building block for 193 nm ArF photoresists used in semiconductor lithography, as well as high-Tg specialty polymers and pharmaceutical intermediates.',
  },
  {
    slug: 'adamantane',
    applicationTags: ['Semiconductor Lithography', 'ArF Photoresists', 'Specialty Polymers', 'Pharma Intermediate', 'Low-Dk Materials'],
    descriptionShort:
      'Adamantane is the rigid diamondoid hydrocarbon (C₁₀H₁₆) that serves as the parent cage for adamantyl-functionalized monomers used in semiconductor photoresists, specialty polymers, and pharmaceutical synthesis.',
  },

  // ── Allyl Ethers ───────────────────────────────────────────────────────
  {
    slug: 'glycerine-monoally',
    applicationTags: ['Specialty Monomer', 'Crosslinker', 'Reactive Diluent', 'UV/EB Coatings', 'Polyurethane'],
    descriptionShort:
      'Glycerine monoallyl ether is a bifunctional monomer combining a reactive allyl group with a vicinal diol, used as a crosslinker and reactive diluent in specialty coatings and polymer formulations.',
  },

  // ── Anhydrides ─────────────────────────────────────────────────────────
  {
    slug: '4-methylhexahydrophthalic-anhydride',
    applicationTags: ['Electronic Encapsulation', 'Epoxy Curing', 'Semiconductor', 'Optical Resins', 'Electrical Insulation'],
    descriptionShort:
      'MHHPA is a liquid alicyclic anhydride epoxy curing agent producing transparent, low-color thermosets for electronic encapsulation, semiconductor applications, and optical resins.',
  },
  {
    slug: '4-pepa',
    applicationTags: ['Aerospace Composites', 'Polyimides', 'High-Temp Resins', 'Endcap Monomer', 'Semiconductor'],
    descriptionShort:
      '4-PEPA is a phenylethynyl-functionalized endcap anhydride that enables thermally cured, void-free polyimides with exceptional high-temperature stability for aerospace composite matrices and semiconductor applications.',
  },
  {
    slug: 'bpaf',
    applicationTags: ['Polyimides', 'Semiconductor Packaging', 'Low-Dk Materials', 'Flexible Displays', 'Aerospace Films'],
    descriptionShort:
      'BPAF (6FDA) is a hexafluoroisopropylidene-bridged aromatic dianhydride yielding high-performance fluorinated polyimides with low dielectric constant for semiconductor packaging, flexible displays, and aerospace films.',
  },
  {
    slug: 'bpf-pa',
    applicationTags: ['Polyimides', 'Optical Materials', 'Flexible Displays', 'High-Tg Polymers', 'Cardo Monomers'],
    descriptionShort:
      'BPF-PA is a fluorene-bridged aromatic dianhydride producing cardo-structure polyimides with high Tg, low birefringence, and excellent optical transparency for flexible displays and optical material applications.',
  },
  {
    slug: 'bt-100',
    applicationTags: ['Epoxy Curing', 'Semiconductor Encapsulation', 'Electronic Packaging', 'Thermoset Resins'],
    descriptionShort:
      'BT-100 is a specialty anhydride curing agent for high-performance epoxy thermoset resins used in semiconductor encapsulation and electronic packaging.',
  },
  {
    slug: 'hhpa',
    applicationTags: ['Electronic Encapsulation', 'Epoxy Curing', 'Semiconductor', 'Optical Resins', 'Electrical Insulation'],
    descriptionShort:
      'HHPA is a saturated alicyclic anhydride epoxy curing agent producing UV-stable, transparent thermosets for electronic encapsulation, semiconductor applications, and optical resins.',
  },
  {
    slug: 'pa',
    applicationTags: ['Specialty Resins', 'Unsaturated Polyesters', 'Alkyd Resins', 'Epoxy Curing', 'Industrial Chemical'],
    descriptionShort:
      'Phthalic anhydride is a foundational aromatic anhydride used to manufacture specialty resins including unsaturated polyesters, alkyd coatings, and epoxy curing agents for industrial applications.',
  },
  {
    slug: 'tahq',
    applicationTags: ['Polyimides', 'LCP', 'Semiconductor Materials', 'High-Temp Polyesters', 'Specialty Monomer'],
    descriptionShort:
      'TAHQ is a specialty aromatic anhydride monomer for liquid-crystal polymers (LCP), high-Tg polyesters, and polyimides used in semiconductor and electronic material applications.',
  },
  {
    slug: 'tda-100',
    applicationTags: ['Polyimides', 'Semiconductor Packaging', 'Aerospace Films', 'Flexible Circuits', 'Electronic Materials'],
    descriptionShort:
      'TDA-100 is a specialty aromatic dianhydride for high-performance polyimides used in semiconductor packaging, aerospace films, and flexible circuit substrates.',
  },
  {
    slug: 'thpa',
    applicationTags: ['Epoxy Curing', 'Specialty Resins', 'Unsaturated Polyesters', 'Alkyd Resins', 'Specialty Monomer'],
    descriptionShort:
      'THPA is a partially saturated alicyclic anhydride used as an epoxy curing agent and intermediate for specialty polyester and alkyd resin systems.',
  },
  {
    slug: 'tmeg-100',
    applicationTags: ['Polyimides', 'Semiconductor', 'Magnet Wire Enamel', 'Flexible Circuits', 'Electrical Insulation'],
    descriptionShort:
      'TMEG-100 is an ester-linked aromatic dianhydride for solvent-soluble polyimides with balanced thermal and mechanical properties, used in semiconductor applications, wire enamels, and flexible circuitry.',
  },
  {
    slug: 'a-odpa',
    applicationTags: ['Polyimides', 'Semiconductor Packaging', 'Optical Materials', 'Aerospace Films', 'Low-CTE Films'],
    descriptionShort:
      'a-ODPA is the asymmetric oxydiphthalic dianhydride isomer producing highly soluble, transparent polyimides with low CTE for semiconductor packaging and optical applications.',
  },

  // ── Anilines / Diamines ────────────────────────────────────────────────
  {
    slug: 'bisa-m',
    applicationTags: ['Polyimides', 'High-Performance Resins', 'Semiconductor', 'Epoxy Curing', 'Specialty Diamine'],
    descriptionShort:
      'BisA-M is a bisaniline aromatic diamine with meta-isopropylidene bridging, used as a monomer for soluble, transparent polyimides and high-performance epoxy resins for semiconductor and electronics applications.',
  },
  {
    slug: 'bisa-p',
    applicationTags: ['Polyimides', 'Aerospace', 'High-Performance Resins', 'Semiconductor', 'Specialty Diamine'],
    descriptionShort:
      'BisA-P is the para-isomer bisaniline — a rigid aromatic diamine monomer producing high-Tg polyimides and engineering polymers for aerospace and semiconductor applications.',
  },

  // ── Bismaleimide ───────────────────────────────────────────────────────
  {
    slug: 'bmi-7000',
    applicationTags: ['Bismaleimide', 'Aerospace Composites', 'Semiconductor Laminates', 'High-Temp Resins', 'Structural Adhesives'],
    descriptionShort:
      'BMI-7000 is a bismaleimide thermoset resin for high-temperature structural composites in aerospace, semiconductor-grade electronic laminates, and adhesives requiring service above 200 °C.',
  },

  // ── Coatings - Lens ────────────────────────────────────────────────────
  {
    slug: 'lh-3h',
    applicationTags: ['Optical Materials', 'Lens Coating', 'Hard Coat', 'Ophthalmic Lenses'],
    descriptionShort:
      'LH-3H is a hard-coat varnish for plastic optical and ophthalmic lenses, providing abrasion resistance and optical clarity.',
  },
  {
    slug: 'or-510',
    applicationTags: ['Optical Materials', 'Hydrophobic Coating', 'Anti-Smudge', 'Lens Coating'],
    descriptionShort:
      'OR-510 is a fluorinated hydrophobic top-coat imparting water- and oil-repellency and anti-smudge performance to optical lenses and precision surfaces.',
  },
  {
    slug: 'z-117',
    applicationTags: ['Optical Materials', 'Lens Coating', 'Hard Coat', 'Ophthalmic Lenses'],
    descriptionShort:
      'Z-117 is a specialty varnish for plastic optical and ophthalmic lenses, providing hard-coat protection with excellent adhesion and optical clarity.',
  },

  // ── Commodity ──────────────────────────────────────────────────────────
  {
    slug: '3-chloropropene',
    applicationTags: ['Epoxy Intermediates', 'Allyl Chemistry', 'Specialty Chemical', 'Industrial Chemical'],
    descriptionShort:
      'Allyl chloride (3-chloropropene) is a reactive bulk chemical intermediate used to manufacture epichlorohydrin for epoxy resins, allyl amines, allyl ethers, and specialty monomers.',
  },

  // ── Diols ──────────────────────────────────────────────────────────────
  {
    slug: 'deg',
    applicationTags: ['Specialty Resins', 'Polyesters', 'Polyurethanes', 'Industrial Chemical'],
    descriptionShort:
      'Diethylene glycol is a versatile diol used in unsaturated polyester resins, polyurethane systems, and specialty chemical formulations.',
  },
  {
    slug: 'meg',
    applicationTags: ['Polyesters', 'Polyurethanes', 'Industrial Chemical', 'Specialty Resins'],
    descriptionShort:
      'Monoethylene glycol is a high-volume industrial diol used to produce polyester resins, polyurethane polyols, and heat-transfer fluids.',
  },
  {
    slug: 'teg',
    applicationTags: ['Polyurethanes', 'Specialty Resins', 'Industrial Chemical', 'Process Chemical'],
    descriptionShort:
      'Triethylene glycol is a high-boiling, hygroscopic diol used in polyurethane formulations, gas dehydration, and specialty chemical applications.',
  },

  // ── Epoxides ───────────────────────────────────────────────────────────
  {
    slug: '2386-87-0',
    applicationTags: ['Electronic Encapsulation', 'Cycloaliphatic Epoxy', 'Electronic Adhesives', 'Optical Materials', 'Cationic UV Cure'],
    descriptionShort:
      'A cycloaliphatic diepoxide producing UV-stable, transparent, low-dielectric thermosets for electronic encapsulation, electronic adhesives, and optical applications.',
  },
  {
    slug: '29829-07-0',
    applicationTags: ['Electronic Encapsulation', 'Cycloaliphatic Epoxy', 'Optical Materials', 'Flexible Coatings', 'Cationic UV Cure'],
    descriptionShort:
      'A flexible cycloaliphatic diepoxide with an adipate linker, delivering tough, UV-stable networks for electronic encapsulation and optical applications.',
  },
  {
    slug: 'e201',
    applicationTags: ['Electronic Encapsulation', 'Epoxy Resins', 'Optical Materials', 'Semiconductor'],
    descriptionShort:
      'E201 is a specialty epoxide resin for high-performance electronic encapsulation, semiconductor applications, and optical thermosets.',
  },
  {
    slug: 'tgmap',
    applicationTags: ['Aerospace Composites', 'Epoxy Resins', 'Structural Adhesives', 'High-Tg Polymers', 'Semiconductor'],
    descriptionShort:
      'TGMAP is a trifunctional aromatic epoxy resin delivering high crosslink density and Tg for aerospace composite matrices, structural adhesives, and semiconductor-grade laminates.',
  },
  {
    slug: 'tgpap',
    applicationTags: ['Aerospace Composites', 'Epoxy Resins', 'RTM / Infusion', 'Structural Adhesives', 'Semiconductor'],
    descriptionShort:
      'TGPAP is a trifunctional aromatic epoxy resin with very low viscosity, ideal for aerospace prepreg and RTM composite matrices, structural adhesives, and semiconductor-grade applications.',
  },

  // ── Fluorene Derivatives ───────────────────────────────────────────────
  {
    slug: 'bafl',
    applicationTags: ['Polyimides', 'Flexible Displays', 'Optical Materials', 'High-Tg Polymers', 'Fluorene Monomers'],
    descriptionShort:
      'BAFL is a fluorene-based cardo aromatic diamine producing transparent, high-Tg, low-birefringence polyimides for flexible display substrates and optical material applications.',
  },
  {
    slug: 'bahf',
    applicationTags: ['Semiconductor Packaging', 'Polyimides', 'Polybenzoxazoles', 'Low-Dk Materials', 'Fluorinated Monomers'],
    descriptionShort:
      'BAHF is a fluorinated aromatic diamine-diol monomer for polybenzoxazoles and polyimides with low dielectric constant, used in semiconductor advanced packaging.',
  },
  {
    slug: 'baofl',
    applicationTags: ['Polyimides', 'Flexible Displays', 'Optical Materials', 'Fluorene Monomers', 'High-Tg Polymers'],
    descriptionShort:
      'BAOFL is a fluorene-based ether-linked aromatic diamine producing soluble, transparent, high-Tg polyimides for flexible display substrates and optical applications.',
  },
  {
    slug: 'bapf',
    applicationTags: ['Polyimides', 'Flexible Displays', 'Optical Materials', 'Fluorene Monomers', 'High-Tg Polymers'],
    descriptionShort:
      'BAPF is a fluorene-based cardo aromatic diamine monomer for transparent, high-Tg polyimides used in flexible displays and optical material applications.',
  },

  // ── Lens Manufacturing ─────────────────────────────────────────────────
  {
    slug: 'riki-16js',
    applicationTags: ['Optical Materials', 'Lens Manufacturing', 'High-Index Lenses', 'Ophthalmic'],
    descriptionShort:
      'RIKI 16JS is a specialty monomer system for high-index optical lens manufacturing, delivering excellent optical clarity and processability.',
  },
  {
    slug: 'tl-3',
    applicationTags: ['Optical Materials', 'Lens Manufacturing', 'Process Additive', 'Ophthalmic'],
    descriptionShort:
      'TL-3 is a specialty additive for optical lens manufacturing, supporting process stability and optical clarity.',
  },
  {
    slug: 'tp-7673',
    applicationTags: ['Optical Materials', 'Lens Manufacturing', 'Ophthalmic'],
    descriptionShort:
      'TP-7673 is a specialty lens-grade material for optical and ophthalmic lens manufacturing.',
  },
  {
    slug: 'tt-55',
    applicationTags: ['Optical Materials', 'Lens Manufacturing', 'Ophthalmic'],
    descriptionShort:
      'TT-55 is a specialty lens-grade material for optical and ophthalmic lens manufacturing processes.',
  },

  // ── Methacrylates ──────────────────────────────────────────────────────
  {
    slug: 'biphenylyl-methacrylate',
    applicationTags: ['Optical Materials', 'High-Index Polymers', 'Lens Monomers', 'Methacrylates'],
    descriptionShort:
      'Biphenylyl methacrylate is an aromatic methacrylate monomer with a biphenyl pendant, used to make high-refractive-index transparent polymers for optical applications.',
  },
  {
    slug: 'ctfma',
    applicationTags: ['Optical Materials', 'Fluoromethacrylates', 'Low-RI Polymers', 'Specialty Coatings'],
    descriptionShort:
      'CTFMA is a fluorinated methacrylate monomer producing low-surface-energy, low-refractive-index polymers for optical coatings and specialty applications.',
  },
  {
    slug: 'gmec',
    applicationTags: ['Specialty Resins', 'Methacrylates', 'Specialty Coatings', 'Adhesives'],
    descriptionShort:
      'GMEC is a specialty functional methacrylate monomer used as a building block in specialty acrylic resins, coatings, and adhesive formulations.',
  },
  {
    slug: 'glycerol-carbonate-methacrylate',
    applicationTags: ['Specialty Resins', 'Functional Monomers', 'Non-Isocyanate Polyurethanes', 'Coatings', 'Methacrylates'],
    descriptionShort:
      'Glycerol carbonate methacrylate is a bifunctional monomer combining a methacrylate with a reactive cyclic carbonate, enabling non-isocyanate polyurethanes and specialty resin systems.',
  },
  {
    slug: 'mma',
    applicationTags: ['PMMA', 'Specialty Resins', 'Methacrylates', 'Coatings', 'Industrial Chemical'],
    descriptionShort:
      'Methyl methacrylate is a high-volume methacrylate monomer used to produce PMMA, specialty acrylic resins, coatings, and copolymers for industrial and optical applications.',
  },

  // ── DAP / DAIP (Specialty Resins) ──────────────────────────────────────
  {
    slug: 'daip-m',
    applicationTags: ['Specialty Resins', 'Electronic Encapsulation', 'Electrical Insulation', 'Thermoset Resins', 'Aerospace Electronics'],
    descriptionShort:
      'DAIP monomer is a high-performance crosslinkable allyl monomer producing heat-resistant, dimensionally stable thermosets for electronic encapsulation, electrical insulation, and specialty resin applications.',
  },
  {
    slug: 'daip-prepolymer',
    applicationTags: ['Specialty Resins', 'Electronic Encapsulation', 'Electrical Insulation', 'Molding Compounds', 'Aerospace Electronics'],
    descriptionShort:
      'DAIP prepolymer is a partially polymerized diallyl isophthalate resin for thermoset molding compounds used in electronic encapsulation and electrical insulation.',
  },
  {
    slug: 'dap-prepolymer',
    applicationTags: ['Specialty Resins', 'Electronic Encapsulation', 'Electrical Insulation', 'Mil-Spec Connectors', 'Molding Compounds'],
    descriptionShort:
      'DAP prepolymer is a partially polymerized diallyl phthalate resin used in electronic encapsulation, electrical insulation, mil-spec connectors, and IC sockets.',
  },

  // ── R&D ────────────────────────────────────────────────────────────────
  {
    slug: 'rd24-083-3',
    applicationTags: ['Custom Synthesis', 'R&D Sample', 'Specialty Polymers'],
    descriptionShort:
      'RD24-083-3 is a development-stage polymer research sample. Structure and properties are subject to ongoing R&D — contact us for details and NDA arrangements.',
  },

  // ── Toluidines / Anilines ──────────────────────────────────────────────
  {
    slug: 'demt',
    applicationTags: ['High-Performance Resins', 'Polymerization Accelerator', 'Dental Resins', 'Acrylic Adhesives', 'Toluidines'],
    descriptionShort:
      'N,N-Diethyl-m-toluidine (DEmT) is a tertiary aromatic amine accelerator for peroxide-initiated room-temperature cure of methacrylate and unsaturated polyester resin systems, including dental resins and high-performance adhesives.',
  },
  {
    slug: 'dmpt',
    applicationTags: ['High-Performance Resins', 'Polymerization Accelerator', 'Dental Resins', 'Acrylic Adhesives', 'Toluidines'],
    descriptionShort:
      'N,N-Dimethyl-p-toluidine (DMpT) is a tertiary aromatic amine accelerator enabling rapid room-temperature cure of methacrylate and unsaturated polyester resins for dental, high-performance adhesive, and specialty applications.',
  },
  {
    slug: 'emt',
    applicationTags: ['High-Performance Resins', 'Specialty Amines', 'Toluidines', 'Chemical Intermediate'],
    descriptionShort:
      'N-Ethyl-m-toluidine is a secondary aromatic amine used as an intermediate for high-performance resins, specialty amines, and chemical synthesis.',
  },
  {
    slug: 'eot',
    applicationTags: ['High-Performance Resins', 'Specialty Amines', 'Toluidines', 'Chemical Intermediate'],
    descriptionShort:
      'N-Ethyl-o-toluidine is a secondary aromatic amine intermediate for high-performance resins, specialty amine synthesis, and chemical manufacturing.',
  },
]

// ────────────────────────────────────────────────────────────────────────────
// Run patches
// ────────────────────────────────────────────────────────────────────────────
let ok = 0
let fail = 0
for (const {slug, ...fields} of fixes) {
  try {
    await c.patch(`product-${slug}`).set(fields).commit()
    console.log(`✓ product-${slug}`)
    ok++
  } catch (err) {
    console.error(`✗ product-${slug} —`, err?.message || err)
    fail++
  }
}

console.log(`\nDone. ${ok} patched, ${fail} failed (of ${fixes.length}).`)
