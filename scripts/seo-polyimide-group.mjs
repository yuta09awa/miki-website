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
// SEO-optimized polyimide monomer group + BMI
// Following the 6FDA model:
//   - Clean product names (no CAS stuffing)
//   - Properties cluster in featureBullets (specific temps, Tg, Dk)
//   - Synthesis cluster in descriptionLong (reaction pathways, precursors)
//   - Application tags aligned to real end markets
//   - Meta title with CAS for Google SERP
// ────────────────────────────────────────────────────────────────────────────
const products = [

  // ── a-ODPA ─────────────────────────────────────────────────────────────
  {
    slug: 'a-odpa',
    productName: 'a-ODPA (Asymmetric Oxydiphthalic Anhydride)',
    descriptionShort:
      'a-ODPA is the asymmetric 2,3,3\u2032,4\u2032-oxydiphthalic dianhydride isomer \u2014 a key monomer for producing highly soluble, transparent polyimides with low CTE and low dielectric constant. The asymmetric substitution pattern disrupts chain packing, enabling solution-processable polyimide films for semiconductor packaging and optical applications.',
    descriptionLong: [
      block(
        'a-ODPA (2,3,3\u2032,4\u2032-oxydiphthalic anhydride) is the asymmetric isomer of ODPA. The ether bridge between phthalic anhydride units combined with the 2,3-substitution pattern disrupts chain regularity and suppresses crystallization, dramatically improving the solubility of derived polyimides in organic solvents such as NMP and DMAc.',
      ),
      block(
        'Reacting a-ODPA with aromatic diamines via the polyamic acid precursor route and subsequent thermal imidization yields polyimide films with high thermal stability (Tg typically 280\u2013320 \u00b0C), low coefficient of thermal expansion, optical transparency in the visible range, and low dielectric constant \u2014 critical properties for advanced semiconductor packaging and flexible electronic substrates.',
      ),
      block(
        'The improved processability over symmetric ODPA makes a-ODPA particularly attractive for solution-cast polyimide films, spin-coated dielectric layers, and transparent flexible substrates where both performance and manufacturing ease are required.',
      ),
    ],
    featureBullets: [
      'Asymmetric 2,3,3\u2032,4\u2032-oxydiphthalic dianhydride isomer',
      'High thermal stability \u2014 Tg 280\u2013320 \u00b0C depending on diamine partner',
      'Outstanding solubility in organic solvents (NMP, DMAc) for solution processing',
      'Low coefficient of thermal expansion (CTE) for dimensional stability',
      'Optical transparency in the visible range',
      'Low dielectric constant (Dk) for electronic applications',
      'Polyamic acid precursor route enables spin-coating and film casting',
    ],
    applicationTags: ['Polyimides', 'Semiconductor Packaging', 'Optical Materials', 'Flexible Electronics', 'Low-CTE Films'],
    seo: {
      title: 'a-ODPA CAS 50662-95-8 | Asymmetric Oxydiphthalic Dianhydride | MIKI USA',
      metaDescription: 'Source a-ODPA (CAS 50662-95-8), an asymmetric dianhydride for soluble, transparent polyimides with low CTE. For semiconductor packaging and optical films.',
      keywords: 'a-ODPA, 50662-95-8, asymmetric oxydiphthalic anhydride, soluble polyimide, low CTE polyimide, semiconductor packaging, polyamic acid, transparent polyimide, dianhydride monomer',
    },
  },

  // ── BPF-PA ─────────────────────────────────────────────────────────────
  {
    slug: 'bpf-pa',
    productName: 'BPF-PA (Fluorene Dianhydride)',
    descriptionShort:
      'BPF-PA is a fluorene-bridged cardo aromatic dianhydride that produces polyimides with high Tg (>300 \u00b0C), low birefringence, and high refractive index. The orthogonal fluorene structure enables transparent, dimensionally stable films for flexible display substrates and optical applications.',
    descriptionLong: [
      block(
        'BPF-PA, 4,4\u2032-(9H-fluorene-9,9-diyl)bis(phthalic anhydride), is a cardo-type aromatic dianhydride in which two phthalic anhydride units are joined through the 9,9\u2032-position of a fluorene ring. The bulky, orthogonal fluorene core disrupts through-plane chain packing and suppresses birefringence while maintaining a high refractive index \u2014 a rare combination in polyimide monomers.',
      ),
      block(
        'Polyimides synthesized from BPF-PA via the polyamic acid precursor route combine glass transition temperatures often exceeding 300 \u00b0C with visible-range optical transparency, low CTE, and high refractive index. These properties make BPF-PA-based polyimides candidates for flexible OLED substrates, optical compensation films, transparent cover layers, and waveguide materials.',
      ),
      block(
        'The cardo structure also provides good organic-solvent solubility, enabling solution processing for thin-film electronic and optical applications.',
      ),
    ],
    featureBullets: [
      'Fluorene-bridged cardo aromatic dianhydride',
      'High Tg polyimides (>300 \u00b0C)',
      'Low birefringence \u2014 ideal for optical films and display substrates',
      'High refractive index from fluorene core',
      'Optical transparency in the visible range',
      'Good organic-solvent solubility for solution processing',
      'Low CTE for dimensional stability on flexible substrates',
    ],
    applicationTags: ['Polyimides', 'Flexible Displays', 'Optical Materials', 'High-Tg Polymers', 'Fluorene Monomers'],
    seo: {
      title: 'BPF-PA CAS 135876-30-1 | Fluorene Dianhydride for Polyimide | MIKI USA',
      metaDescription: 'BPF-PA fluorene cardo dianhydride for transparent, high-Tg polyimides with low birefringence. For flexible OLED substrates and optical films.',
      keywords: 'BPF-PA, 135876-30-1, fluorene dianhydride, cardo polyimide, low birefringence, high refractive index, flexible OLED substrate, optical polyimide, transparent polyimide',
    },
  },

  // ── TDA-100 ────────────────────────────────────────────────────────────
  {
    slug: 'tda-100',
    productName: 'TDA-100 (Specialty Dianhydride)',
    descriptionShort:
      'TDA-100 is a specialty aromatic dianhydride for high-performance polyimide synthesis. Its rigid, symmetrical structure delivers high Tg, excellent mechanical properties, and low dielectric constant \u2014 used in semiconductor flexible circuits, aerospace films, and advanced electronic packaging.',
    descriptionLong: [
      block(
        'TDA-100 is a specialty aromatic dianhydride designed for polyimide and poly(ester-imide) synthesis where balanced thermal, mechanical, and dielectric properties are required. The rigid aromatic backbone provides high glass transition temperature and dimensional stability, while the molecular geometry enables good film-forming characteristics.',
      ),
      block(
        'Polyimides derived from TDA-100 are used in flexible circuit substrates for semiconductor packaging, high-temperature insulation films for aerospace wiring, and dielectric interlayers in advanced electronic packaging. The material is compatible with standard polyamic acid solution processing and thermal imidization.',
      ),
    ],
    featureBullets: [
      'Aromatic dianhydride for polyimide synthesis',
      'High Tg and dimensional stability',
      'Low dielectric constant for electronic applications',
      'Compatible with polyamic acid solution processing',
      'Suitable for flexible circuit substrates',
      'Aerospace-grade thermal stability',
    ],
    applicationTags: ['Polyimides', 'Semiconductor Packaging', 'Aerospace Films', 'Flexible Circuits', 'Electronic Materials'],
    seo: {
      title: 'TDA-100 Specialty Dianhydride | Polyimide Monomer | MIKI USA',
      metaDescription: 'TDA-100 aromatic dianhydride for high-Tg polyimides. For semiconductor flexible circuits, aerospace films, and advanced electronic packaging.',
      keywords: 'TDA-100, specialty dianhydride, polyimide monomer, flexible circuit substrate, aerospace polyimide film, electronic packaging, high-Tg polyimide',
    },
  },

  // ── TMEG-100 ───────────────────────────────────────────────────────────
  {
    slug: 'tmeg-100',
    productName: 'TMEG-100 (Ester-Linked Dianhydride)',
    descriptionShort:
      'TMEG-100 (ethylene glycol bis(anhydrotrimellitate)) is an ester-linked aromatic dianhydride that produces solution-processable polyimides and poly(ester-imide)s. The flexible ester spacer improves solubility while maintaining thermal performance \u2014 used in semiconductor wire insulation, magnet wire enamels, and flexible circuit coatings.',
    descriptionLong: [
      block(
        'TMEG-100, ethylene glycol bis(anhydrotrimellitate), is an aromatic dianhydride featuring two trimellitic anhydride units joined by a flexible ethylene glycol ester linkage. This ester spacer dramatically improves the organic-solvent solubility and processability of derived polyimides compared to rigid all-aromatic dianhydrides, while the trimellitic ends deliver high thermal performance.',
      ),
      block(
        'TMEG-100 reacts with aromatic diamines via the standard polyamic acid route to produce solution-processable polyimides and poly(ester-imide)s. The resulting polymers combine thermal stability with good adhesion, flexibility, and film-forming properties \u2014 critical for wire enamel insulation, flexible circuit coatings, and semiconductor packaging applications.',
      ),
    ],
    featureBullets: [
      'Ester-linked aromatic dianhydride (ethylene glycol bis(anhydrotrimellitate))',
      'Produces solution-processable polyimides and poly(ester-imide)s',
      'Excellent organic-solvent solubility (NMP, DMAc)',
      'Good adhesion and flexibility in cured films',
      'Thermal stability for wire enamel and insulation',
      'Standard polyamic acid processing route',
    ],
    applicationTags: ['Polyimides', 'Semiconductor', 'Magnet Wire Enamel', 'Flexible Circuits', 'Electrical Insulation'],
    seo: {
      title: 'TMEG-100 CAS 1732-93-4 | Ester Dianhydride for Polyimide | MIKI USA',
      metaDescription: 'TMEG-100 ester-linked dianhydride for solution-processable polyimides. For semiconductor wire insulation, magnet wire enamels, and flexible circuits.',
      keywords: 'TMEG-100, 1732-93-4, ethylene glycol bis anhydrotrimellitate, ester dianhydride, polyimide monomer, magnet wire enamel, flexible circuit, wire insulation',
    },
  },

  // ── 4-PEPA ─────────────────────────────────────────────────────────────
  {
    slug: '4-pepa',
    productName: '4-PEPA (Phenylethynyl Endcap Anhydride)',
    descriptionShort:
      '4-PEPA is a phenylethynyl-functionalized endcap anhydride that terminates polyimide oligomers for addition-cure crosslinking. Thermal cure at 370\u2013400 \u00b0C produces void-free, high-Tg networks with service temperatures above 300 \u00b0C \u2014 the enabling chemistry behind PETI-class aerospace composite resins.',
    descriptionLong: [
      block(
        '4-Phenylethynylphthalic anhydride (4-PEPA) is a reactive endcap monomer used to terminate polyimide oligomers with phenylethynyl groups. On thermal cure at 370\u2013400 \u00b0C, the phenylethynyl groups undergo addition crosslinking without releasing volatiles \u2014 producing void-free, fully dense thermoset networks with glass transition temperatures well above 300 \u00b0C.',
      ),
      block(
        'This volatile-free cure mechanism is critical for aerospace composite manufacturing where porosity destroys mechanical performance. PEPA-terminated oligomers (PETI-family resins) are a backbone technology for next-generation aerospace composite matrices, high-temperature structural adhesives, and semiconductor high-temp encapsulants that must withstand sustained service above 300 \u00b0C.',
      ),
      block(
        'The phenylethynyl endcap also enables melt-processable oligomers with controlled molecular weight, allowing resin transfer molding (RTM) and autoclave processing of carbon-fiber composites.',
      ),
    ],
    featureBullets: [
      'Phenylethynyl addition-cure endcap for polyimide oligomers',
      'Volatile-free thermal crosslinking at 370\u2013400 \u00b0C',
      'Void-free, fully dense cured networks',
      'Service temperatures above 300 \u00b0C',
      'Key chemistry for PETI-class aerospace resins',
      'Enables melt-processable, controlled-MW oligomers',
      'Compatible with RTM and autoclave composite processing',
    ],
    applicationTags: ['Aerospace Composites', 'Polyimides', 'High-Temp Resins', 'Semiconductor', 'Structural Adhesives'],
    seo: {
      title: '4-PEPA CAS 119389-05-8 | Phenylethynyl Polyimide Endcap | MIKI USA',
      metaDescription: '4-PEPA endcap anhydride for void-free, high-Tg polyimide composites. Cure at 370-400\u00b0C for PETI aerospace resins with service above 300\u00b0C.',
      keywords: '4-PEPA, 119389-05-8, phenylethynylphthalic anhydride, polyimide endcap, PETI resin, aerospace composite, void-free cure, high-temperature polyimide, addition cure',
    },
  },

  // ── BAFL ───────────────────────────────────────────────────────────────
  {
    slug: 'bafl',
    productName: 'BAFL (9,9-Bis(4-aminophenyl)fluorene)',
    descriptionShort:
      'BAFL is a fluorene-based cardo aromatic diamine that produces transparent, high-Tg polyimides with low birefringence and high refractive index. The rigid orthogonal fluorene cage disrupts chain packing to suppress optical anisotropy \u2014 essential for flexible display substrates, optical compensation films, and semiconductor optical packaging.',
    descriptionLong: [
      block(
        '9,9-Bis(4-aminophenyl)fluorene (BAFL) is a cardo-structure aromatic diamine in which two aminophenyl groups are connected through the 9,9\u2032-position of a fluorene unit. The rigid, orthogonal fluorene core creates a three-dimensional molecular geometry that disrupts in-plane chain packing and suppresses birefringence \u2014 yielding polyimides with exceptional optical isotropy.',
      ),
      block(
        'Polyimides synthesized from BAFL with aromatic dianhydrides (6FDA, BPDA, PMDA) via the polyamic acid precursor route combine Tg values often exceeding 350 \u00b0C with high refractive index (n > 1.65), visible-light transparency, and low CTE. These properties are critical for next-generation flexible OLED display substrates, optical compensation films, and transparent electronic packaging.',
      ),
      block(
        'BAFL is also used in high-performance photoresist formulations where the fluorene core provides etch resistance and high resolution in semiconductor lithography.',
      ),
    ],
    featureBullets: [
      'Fluorene cardo aromatic diamine',
      'High-Tg polyimides (>350 \u00b0C with rigid dianhydrides)',
      'Low birefringence \u2014 suppressed optical anisotropy',
      'High refractive index (n > 1.65)',
      'Visible-light optical transparency',
      'Low CTE for dimensional stability on flexible substrates',
      'Etch-resistant fluorene core for photoresist applications',
    ],
    applicationTags: ['Polyimides', 'Flexible Displays', 'Optical Materials', 'High-Tg Polymers', 'Semiconductor Lithography'],
    seo: {
      title: 'BAFL CAS 15499-84-0 | Fluorene Diamine for Polyimide | MIKI USA',
      metaDescription: 'BAFL fluorene cardo diamine for transparent, high-Tg polyimides with low birefringence. For flexible OLED substrates and optical films.',
      keywords: 'BAFL, 15499-84-0, 9,9-bis(4-aminophenyl)fluorene, fluorene diamine, cardo polyimide, low birefringence, high refractive index, flexible display substrate, optical polyimide',
    },
  },

  // ── BAHF ───────────────────────────────────────────────────────────────
  {
    slug: 'bahf',
    productName: 'BAHF (Fluorinated Amino-Phenol Monomer)',
    descriptionShort:
      'BAHF is a fluorinated aromatic diamine-diol monomer with dual amine and hydroxyl functionality. It enables synthesis of both polyimides and polybenzoxazoles (PBOs) with low dielectric constant, low moisture uptake, and high optical transparency \u2014 used in photosensitive dielectrics for semiconductor advanced packaging.',
    descriptionLong: [
      block(
        'BAHF, 2,2-bis(3-amino-4-hydroxyphenyl)hexafluoropropane, combines two ortho-aminophenol groups bridged by a hexafluoroisopropylidene linker. This dual amine-hydroxyl functionality enables two distinct polymer pathways: polyimide synthesis through the amine groups, and polybenzoxazole (PBO) formation through thermal cyclodehydration of the ortho-aminophenol units.',
      ),
      block(
        'The fluorinated \u2013C(CF\u2083)\u2082\u2013 bridge imparts low dielectric constant (Dk < 2.8), low moisture uptake, and high optical transparency. BAHF-based polymers are the basis for photosensitive polyimide and PBO formulations widely used as interlayer dielectrics and redistribution layer (RDL) materials in semiconductor advanced packaging, including fan-out wafer-level packaging (FOWLP) and 2.5D/3D integration.',
      ),
      block(
        'The polybenzoxazole pathway from BAHF offers even higher thermal stability and lower dielectric constant than conventional polyimides, making it a critical monomer for next-generation semiconductor dielectric materials.',
      ),
    ],
    featureBullets: [
      'Dual amine + hydroxyl functionality \u2014 polyimide and PBO synthesis',
      'Low dielectric constant (Dk < 2.8) from fluorinated backbone',
      'Low moisture uptake for stable dielectric performance',
      'High optical transparency for photosensitive formulations',
      'Polybenzoxazole (PBO) pathway via thermal cyclodehydration',
      'Used in photosensitive dielectrics for advanced semiconductor packaging',
      'Compatible with fan-out wafer-level packaging (FOWLP) processes',
    ],
    applicationTags: ['Semiconductor Packaging', 'Polyimides', 'Polybenzoxazoles', 'Low-Dk Materials', 'Photosensitive Dielectrics'],
    seo: {
      title: 'BAHF CAS 83558-87-6 | Fluorinated Monomer for PBO & Polyimide | MIKI USA',
      metaDescription: 'BAHF fluorinated amino-phenol for polybenzoxazole and low-Dk polyimide dielectrics. For semiconductor advanced packaging and FOWLP.',
      keywords: 'BAHF, 83558-87-6, fluorinated diamine, polybenzoxazole, PBO, low dielectric constant, semiconductor packaging, photosensitive polyimide, FOWLP, advanced packaging',
    },
  },

  // ── BAOFL ──────────────────────────────────────────────────────────────
  {
    slug: 'baofl',
    productName: 'BAOFL (Fluorene Ether Diamine)',
    descriptionShort:
      'BAOFL is a fluorene-based aromatic diamine with flexible ether (phenoxy) linkages that improve solubility and processability while maintaining the high Tg and optical transparency of fluorene cardo polyimides. Used in solution-cast films for flexible display substrates and advanced electronic packaging.',
    descriptionLong: [
      block(
        'BAOFL, 9,9-bis[4-(4-aminophenoxy)phenyl]fluorene, is a fluorene cardo diamine in which the aminophenyl groups are joined to the fluorene core through flexible ether (phenoxy) linkages. These ether spacers significantly improve organic-solvent solubility and reduce melt viscosity compared to directly-bonded fluorene diamines like BAFL, enabling easier film processing while retaining the optical and thermal benefits of the cardo structure.',
      ),
      block(
        'Polyimides derived from BAOFL via the polyamic acid route combine Tg values above 300 \u00b0C with low birefringence, high refractive index, and visible-light transparency. The improved processability makes BAOFL particularly suitable for solution-cast flexible display substrates, optical compensation films, photosensitive polyimide formulations, and transparent electronic packaging.',
      ),
    ],
    featureBullets: [
      'Fluorene cardo diamine with flexible ether linkages',
      'Improved organic-solvent solubility over BAFL',
      'High-Tg polyimides (>300 \u00b0C)',
      'Low birefringence and high refractive index',
      'Optical transparency in the visible range',
      'Solution-processable for film casting and spin-coating',
    ],
    applicationTags: ['Polyimides', 'Flexible Displays', 'Optical Materials', 'Fluorene Monomers', 'Semiconductor Packaging'],
    seo: {
      title: 'BAOFL CAS 117363-47-4 | Fluorene Ether Diamine for Polyimide | MIKI USA',
      metaDescription: 'BAOFL fluorene ether diamine for soluble, transparent polyimides. For flexible display substrates and optical packaging.',
      keywords: 'BAOFL, 117363-47-4, fluorene diamine, ether diamine, cardo polyimide, flexible display, optical polyimide, soluble polyimide',
    },
  },

  // ── BAPF ───────────────────────────────────────────────────────────────
  {
    slug: 'bapf',
    productName: 'BAPF (Fluorene Cardo Diamine)',
    descriptionShort:
      'BAPF is a fluorene-based cardo aromatic diamine producing transparent, high-Tg polyimides with high refractive index and low birefringence. Used as a specialty monomer for flexible OLED substrates, optical compensation films, and photoresist formulations.',
    descriptionLong: [
      block(
        'BAPF is a cardo-structure fluorene aromatic diamine. Its orthogonal, rigid fluorene core disrupts chain packing in derived polymers, yielding polyimides and polyamides with outstanding optical transparency, high refractive index, and glass transition temperatures often exceeding 300 \u00b0C.',
      ),
      block(
        'Reacting BAPF with aromatic dianhydrides via the polyamic acid precursor route produces polyimides with a unique combination of thermal stability, optical clarity, and dimensional isotropy. Applications include transparent polyimides for flexible OLED display substrates, optical films, high-performance photoresists, and other advanced electronic and optical materials.',
      ),
    ],
    featureBullets: [
      'Fluorene cardo aromatic diamine',
      'High Tg (>300 \u00b0C) with rigid dianhydride partners',
      'High refractive index',
      'Low birefringence for optical applications',
      'Visible-light transparency',
      'Compatible with standard polyamic acid processing',
    ],
    applicationTags: ['Polyimides', 'Flexible Displays', 'Optical Materials', 'Fluorene Monomers', 'Semiconductor Lithography'],
    seo: {
      title: 'BAPF CAS 15499-84-0 | Fluorene Cardo Diamine for Polyimide | MIKI USA',
      metaDescription: 'BAPF fluorene cardo diamine for transparent, high-Tg polyimides. For OLED substrates, optical films, and photoresist applications.',
      keywords: 'BAPF, fluorene diamine, cardo polyimide, transparent polyimide, high refractive index, OLED substrate, optical film, photoresist',
    },
  },

  // ── BisA-M ─────────────────────────────────────────────────────────────
  {
    slug: 'bisa-m',
    productName: 'BisA-M (Bisaniline M Diamine)',
    descriptionShort:
      'BisA-M is a meta-linked bisaniline aromatic diamine with bulky isopropylidene bridging groups. The non-coplanar structure disrupts chain packing to produce soluble, transparent polyimides with good processability \u2014 used as a monomer for semiconductor dielectric films, high-Tg epoxy curing, and specialty polymer synthesis.',
    descriptionLong: [
      block(
        'Bisaniline M is a meta-substituted aromatic diamine featuring two isopropylidene bridges linked through a central benzene ring. The bulky, non-coplanar structure disrupts chain packing, yielding polyimides and epoxy networks with improved organic-solvent solubility, optical transparency, and excellent film-forming properties.',
      ),
      block(
        'BisA-M reacts with aromatic dianhydrides via the standard polyamic acid route to produce soluble, transparent polyimides for electronics dielectric layers. It also serves as an amine curing agent for multifunctional epoxy resins, delivering high-Tg networks with good toughness and transparency for semiconductor and aerospace applications.',
      ),
    ],
    featureBullets: [
      'Meta-linked aromatic diamine with isopropylidene bridges',
      'Produces soluble, transparent polyimides',
      'Good organic-solvent solubility for solution processing',
      'High-Tg epoxy curing agent',
      'Improved toughness over rigid diamines',
      'Used in electronics dielectric films',
    ],
    applicationTags: ['Polyimides', 'Semiconductor', 'High-Performance Resins', 'Epoxy Curing', 'Specialty Diamine'],
    seo: {
      title: 'BisA-M CAS 2687-27-6 | Bisaniline M Aromatic Diamine | MIKI USA',
      metaDescription: 'BisA-M bisaniline aromatic diamine for soluble polyimides and high-Tg epoxy curing. For semiconductor dielectrics and specialty polymers.',
      keywords: 'BisA-M, bisaniline M, 2687-27-6, aromatic diamine, soluble polyimide, epoxy curing agent, semiconductor dielectric',
    },
  },

  // ── BisA-P ─────────────────────────────────────────────────────────────
  {
    slug: 'bisa-p',
    productName: 'BisA-P (Bisaniline P Diamine)',
    descriptionShort:
      'BisA-P is the para-linked bisaniline aromatic diamine \u2014 a rigid monomer producing high-Tg, thermally stable polyimides and polybenzoxazoles. The linear para structure maximizes glass transition temperature and mechanical strength for aerospace and semiconductor high-temperature applications.',
    descriptionLong: [
      block(
        'Bisaniline P is the para-linked analog of bisaniline M, featuring isopropylidene bridges and para aniline groups through a central benzene ring. The more linear, rigid structure boosts glass transition temperatures and thermal stability while maintaining reasonable processability compared to all-rigid diamines.',
      ),
      block(
        'BisA-P is used as an aromatic diamine monomer for high-performance polyimides, polybenzoxazoles, and polyamides requiring maximum thermal and mechanical performance. It also serves as a curing agent for high-Tg multifunctional epoxy systems in aerospace composites and semiconductor high-temperature laminates.',
      ),
    ],
    featureBullets: [
      'Para-linked aromatic diamine for maximum Tg',
      'Rigid backbone for high thermal stability',
      'Monomer for polyimides, PBOs, and polyamides',
      'High-Tg multifunctional epoxy curing agent',
      'Aerospace and semiconductor high-temp applications',
      'Higher Tg than meta-isomer BisA-M',
    ],
    applicationTags: ['Polyimides', 'Aerospace Composites', 'Semiconductor', 'High-Performance Resins', 'Specialty Diamine'],
    seo: {
      title: 'BisA-P CAS 2688-84-8 | Bisaniline P Aromatic Diamine | MIKI USA',
      metaDescription: 'BisA-P para-linked bisaniline diamine for high-Tg polyimides and epoxy curing. For aerospace composites and semiconductor applications.',
      keywords: 'BisA-P, bisaniline P, 2688-84-8, aromatic diamine, high-Tg polyimide, aerospace polyimide, semiconductor, epoxy curing agent',
    },
  },

  // ── BMI-7000 ───────────────────────────────────────────────────────────
  {
    slug: 'bmi-7000',
    productName: 'BMI-7000 (Bismaleimide Resin)',
    descriptionShort:
      'BMI-7000 is a bismaleimide thermoset resin for high-temperature structural composites. With Tg values of 230\u2013380 \u00b0C and continuous service to 200\u2013230 \u00b0C, bismaleimide bridges the performance gap between epoxy and polyimide systems \u2014 used in aerospace composite structures, semiconductor-grade laminates, and high-temperature adhesives.',
    descriptionLong: [
      block(
        'BMI-7000 is a bismaleimide (BMI) thermoset resin based on addition-cure maleimide chemistry. BMI resins combine the high thermal stability approaching polyimides with the processability of epoxies, curing without volatile byproducts to produce void-free networks with glass transition temperatures typically 230\u2013380 \u00b0C depending on formulation.',
      ),
      block(
        'Available grades include acetic anhydride dried (electronics grade, unground and micronized) and azeotropic distillation dried variants (no acetic anhydride content, unground and micronized). Azeotropic distillation drying is sometimes preferred for aerospace applications to minimize outgassing in composite structures. Micronized grades offer improved resin flow and wetting in prepreg and molding operations.',
      ),
      block(
        'BMI-7000 is used as a matrix resin in carbon-fiber aerospace composites (including fighter aircraft structural components), as a base resin for high-Tg semiconductor electronic laminates and prepregs, and in high-temperature structural adhesives. The cure shrinkage of approximately 0.007% is dramatically lower than epoxy systems (>3%), providing dimensional stability critical for precision aerospace and electronic applications.',
      ),
    ],
    featureBullets: [
      'Bismaleimide addition-cure thermoset \u2014 Tg 230\u2013380 \u00b0C',
      'Continuous service temperature 200\u2013230 \u00b0C (wet), up to 250 \u00b0C (dry)',
      'Void-free cure without volatile byproducts',
      'Cure shrinkage ~0.007% vs >3% for epoxy',
      'Electronics grade (acetic anhydride dried) and aerospace grade (azeotropic distillation dried) available',
      'Micronized grades for improved resin flow and prepreg processing',
      'Azeotropic drying eliminates outgassing risk for aerospace composites',
      'Bridges epoxy\u2013polyimide performance gap',
    ],
    applicationTags: ['Bismaleimide', 'Aerospace Composites', 'Semiconductor Laminates', 'High-Temp Resins', 'Structural Adhesives'],
    seo: {
      title: 'BMI-7000 Bismaleimide Resin | Aerospace & Electronics Grade | MIKI USA',
      metaDescription: 'BMI-7000 bismaleimide resin with Tg 230-380\u00b0C. Electronics and aerospace grades available. For carbon-fiber composites, electronic laminates, and structural adhesives.',
      keywords: 'BMI-7000, bismaleimide, BMI resin, aerospace composite, electronic laminate, high-temperature resin, addition cure, void-free thermoset, acetic anhydride dried, azeotropic distillation, carbon fiber composite',
    },
  },
]

// ────────────────────────────────────────────────────────────────────────────
// Run patches
// ────────────────────────────────────────────────────────────────────────────
let ok = 0
let fail = 0
for (const {slug, ...fields} of products) {
  try {
    await c.patch(`product-${slug}`).set(fields).commit()
    console.log(`\u2713 product-${slug}`)
    ok++
  } catch (err) {
    console.error(`\u2717 product-${slug} \u2014`, err?.message || err)
    fail++
  }
}

console.log(`\nDone. ${ok} patched, ${fail} failed (of ${products.length}).`)
