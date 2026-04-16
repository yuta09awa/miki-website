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
// BMI cluster SEO enhancement — cure chemistry depth + cross-product linking
// Ref: Stenzenberger (ASM 2001); Iredale/Ward/Hamerton (Prog. Polym. Sci. 2017);
//      Huntsman Matrimid / COMPIMIDE / KERIMID datasheets
// ────────────────────────────────────────────────────────────────────────────

const updates = [
  // ── BMI-1000 ────────────────────────────────────────────────────────────
  {
    id: 'product-bmi-1000',
    patch: {
      descriptionLong: [
        block(
          'BMI-1000 (CAS 13676-54-5) is 4,4\u2032-diphenylmethane bismaleimide \u2014 the benchmark bismaleimide monomer for high-performance thermoset resin formulation. Crystalline yellow powder with a sharp melting range (147\u2013168 \u00b0C), it delivers exceptional thermal stability (Tg >300 \u00b0C after cure) and excellent electrical insulation for electronic packaging.',
        ),
        block(
          'Cure chemistry: BMI-1000 cures by addition reaction \u2014 no volatile by-products are released, enabling void-free prepreg consolidation. Three pathways dominate: (1) thermal radical homopolymerization of the maleimide double bond above 200 \u00b0C; (2) Michael addition with aromatic diamines such as DDM and DDS that overcomes the steric hindrance of aromatic BMI homopolymerization; (3) "ene" reaction with allyl co-monomers such as DABPA (2,2\u2032-diallyl bisphenol A) followed by Diels\u2013Alder cycloaddition \u2014 the classic Matrimid\u00AE-style chemistry.',
        ),
        block(
          'Typical formulation: BMI-1000 / DABPA at a 1.2:1 molar ratio maximizes fracture toughness (K1C, G1C) while retaining Tg > 270 \u00b0C. Cure schedule: 175\u2013200 \u00b0C gel, followed by 220\u2013250 \u00b0C post-cure. For extra toughness and reduced brittleness, formulators blend in BMI-2300 (polyphenylmethane oligomer) or the hindered BMI-5100; BMI-TMH acts as an aliphatic reactive diluent for lower melt viscosity.',
        ),
        block(
          'Primary applications: aerospace prepregs, semiconductor encapsulants, copper-clad laminates for high-frequency PCBs, and high-temperature structural adhesives. Commonly paired with s-BPDA / 4,4\u2032-ODA polyimide interlayers in multilayer electronics where addition-cure BMI and condensation-cure polyimide provide complementary thermal/dielectric performance.',
        ),
      ],
      featureBullets: [
        'Melting point: 147\u2013168 \u00b0C (sharp range, high purity)',
        'Cured Tg > 300 \u00b0C \u2014 stable to 250 \u00b0C continuous service',
        'Addition cure \u2014 no volatile by-products, void-free consolidation',
        'Michael addition pathway with DDM / DDS diamines',
        'Ene/Diels\u2013Alder cure with DABPA co-monomer (1.2:1 optimal)',
        'Cure window 175\u2013250 \u00b0C; post-cure at 220\u2013250 \u00b0C',
        'Tough\u00AD ness modifiable with BMI-2300 oligomer or BMI-TMH diluent',
        'Soluble in NMP, DMF, DMAc for prepreg and varnish',
      ],
      seo: {
        title: 'BMI-1000 CAS 13676-54-5 | 4,4\u2032-Diphenylmethane Bismaleimide | MIKI USA',
        metaDescription:
          'High-purity BMI-1000 (CAS 13676-54-5), 4,4\u2032-diphenylmethane bismaleimide for aerospace prepregs, semiconductor encapsulants, and high-frequency laminates. Cures with DABPA via ene/Diels\u2013Alder at 220\u2013250 \u00b0C. Tg > 300 \u00b0C.',
        keywords:
          'BMI-1000, 13676-54-5, 4,4\u2032-diphenylmethane bismaleimide, MDA BMI, Matrimid, bismaleimide monomer, BMI DABPA cure, ene reaction BMI, Michael addition BMI, DDS cure, DDM bismaleimide, aerospace prepreg, high-Tg thermoset, electronic encapsulant, high-frequency laminate',
      },
    },
  },

  // ── BMI-2300 ────────────────────────────────────────────────────────────
  {
    id: 'product-bmi-2300',
    patch: {
      descriptionLong: [
        block(
          'BMI-2300 (CAS 67784-74-1) is a polymethylene polyphenyl polybismaleimide oligomer derived from polymeric MDA (PMDI backbone). The multi-functional structure delivers higher crosslink density than monomeric BMI-1000 \u2014 producing networks with elevated Tg, superior char yield, and better retention of mechanical properties above 250 \u00b0C.',
        ),
        block(
          'Cure chemistry: like all BMIs, cures via addition with no volatiles. The multiple maleimide groups per molecule accelerate gelation and raise crosslink density in radical homopolymerization and Michael-addition networks. Most commonly blended with BMI-1000 (typically 20\u201340 wt% BMI-2300) and toughened with DABPA to balance crosslink density against fracture toughness.',
        ),
        block(
          'Process: Yellow-brown flake, mp 125\u2013160 \u00b0C; soluble in NMP, DMF, DMAc for solution processing. Standard cure: 180 \u00b0C gel / 230 \u00b0C post-cure. Compatible with DDS, DDM diamines and BMI-TMH reactive diluent for viscosity control.',
        ),
        block(
          'Primary applications: aerospace structural composites, BMI-modified epoxy laminates for high-frequency PCBs, high-temperature adhesives, and semiconductor molding compounds requiring extreme thermal endurance. Often used alongside BMI-4000 (non-hazardous bisphenol-A ether BMI) where regulatory constraints favor the non-hazardous grade.',
        ),
      ],
      featureBullets: [
        'Melting range: 125\u2013160 \u00b0C',
        'Multi-functional BMI oligomer \u2014 higher crosslink density than BMI-1000',
        'Excellent thermal stability and char retention > 300 \u00b0C',
        'Toughness modifier: typically 20\u201340 wt% in BMI-1000 blends',
        'Addition cure \u2014 no volatiles, void-free composite consolidation',
        'Compatible with DABPA, DDS, DDM co-reactants',
        'Soluble in NMP, DMF, DMAc for prepreg and varnish',
      ],
      seo: {
        title: 'BMI-2300 CAS 67784-74-1 | Polyphenylmethane Bismaleimide Oligomer | MIKI USA',
        metaDescription:
          'BMI-2300 (CAS 67784-74-1), multi-functional polyphenylmethane bismaleimide oligomer for high-Tg aerospace composites, semiconductor molding, and BMI-modified epoxy laminates. Ideal blend partner for BMI-1000 / DABPA networks.',
        keywords:
          'BMI-2300, 67784-74-1, polyphenylmethane bismaleimide, polymeric BMI, multi-functional bismaleimide, BMI oligomer, aerospace composite, BMI-1000 blend, BMI DABPA cure, high-Tg thermoset, semiconductor molding compound',
      },
    },
  },

  // ── BMI-3000H ───────────────────────────────────────────────────────────
  {
    id: 'product-bmi-3000h',
    patch: {
      descriptionLong: [
        block(
          'BMI-3000H (CAS 3006-93-7) is N,N\u2032-m-phenylene bismaleimide \u2014 a yellow crystalline bismaleimide best known as a rubber vulcanization crosslinker and peroxide co-agent. The rigid m-phenylene backbone is short, stiff, and highly reactive, producing tight crosslinks that dramatically improve heat resistance, tear strength, and compression set of cured elastomers.',
        ),
        block(
          'Cure chemistry in rubber: BMI-3000H acts as a radical-trap co-agent that reacts with macro-radicals generated by peroxide decomposition. The maleimide C=C couples polymer chains through stable C\u2013C bonds rather than peroxide-derived C\u2013O\u2013O linkages, producing rubber networks that retain properties at continuous service temperatures above 200 \u00b0C.',
        ),
        block(
          'Cure chemistry in thermosets: as a rigid, short-chain BMI it also functions as a crosslink booster in BMI-1000 / BMI-2300 / DABPA formulations and as a reactive diluent in BMI varnishes. Michael addition with diamines is slower than the longer-spacer BMIs due to steric constraints, but radical homopolymerization is highly favorable.',
        ),
        block(
          'Primary applications: peroxide co-agent for EPDM, HNBR, and CR vulcanization; heat-aging stabilizer for specialty elastomers; reactive modifier in high-Tg BMI thermoset networks. Safety: skin/eye irritant and potential respiratory sensitizer \u2014 handle with appropriate PPE, avoid dust generation, store below 40 \u00b0C away from peroxides and strong bases.',
        ),
      ],
      featureBullets: [
        'Rigid m-phenylene backbone \u2014 highest crosslink density of the BMI family',
        'Peroxide co-agent for EPDM, HNBR, CR rubber vulcanization',
        'Raises cured rubber heat resistance above 200 \u00b0C',
        'Improves tear strength and compression set of elastomers',
        'Crosslink booster in BMI-1000 / BMI-2300 / DABPA thermosets',
        'Radical homopolymerization favored over Michael addition',
        'High thermal stability \u2014 minimal weight loss < 300 \u00b0C',
      ],
      seo: {
        title: 'BMI-3000H CAS 3006-93-7 | m-Phenylene Bismaleimide Crosslinker | MIKI USA',
        metaDescription:
          'BMI-3000H (CAS 3006-93-7), N,N\u2032-m-phenylene bismaleimide rubber vulcanization crosslinker and peroxide co-agent for EPDM, HNBR, CR elastomers. Also a crosslink booster for BMI-1000 thermoset networks. Heat resistance > 200 \u00b0C.',
        keywords:
          'BMI-3000H, 3006-93-7, m-phenylene bismaleimide, N,N\u2032-(1,3-phenylene)dimaleimide, rubber vulcanization crosslinker, peroxide co-agent, EPDM crosslinker, HNBR co-agent, bismaleimide monomer, heat-resistant rubber, BMI crosslink booster',
      },
    },
  },

  // ── BMI-4000 (existing) ─────────────────────────────────────────────────
  {
    id: 'product-bmi-4000',
    patch: {
      descriptionShort:
        'BMI-4000 is the bisphenol A diphenyl ether bismaleimide \u2014 a non-hazardous grade bismaleimide with flexible ether-propane spacer delivering improved solubility, lower cure stress, and toughened BMI networks. Preferred where regulatory constraints or worker-safety concerns favor non-hazardous classification over traditional aromatic BMIs.',
      descriptionLong: [
        block(
          'BMI-4000 (CAS 79922-55-7) is 4,4\u2032-bis(4-maleimidophenoxy)phenyl]propane \u2014 a bisphenol-A based bismaleimide with two flexible ether linkages connecting the maleimide groups to the isopropylidene core. The flexible spacer softens the network backbone, producing BMI resins with reduced brittleness, lower cure shrinkage, and improved solubility over rigid-backbone BMI-1000.',
        ),
        block(
          'Cure chemistry: addition cure with no volatile by-products. Michael addition with aromatic diamines (DDS, DDM) is rapid due to the flexible accessible maleimide groups; "ene" reaction with DABPA proceeds at lower temperatures than with BMI-1000, enabling 170\u2013190 \u00b0C gel and 200\u2013230 \u00b0C post-cure schedules. Excellent miscibility with BMI-1000, BMI-5100, and BMI-TMH for hybrid networks.',
        ),
        block(
          'Regulatory: BMI-4000 is offered as a non-hazardous grade \u2014 preferred where MDA-based BMIs face REACH, GHS, or customer-specific restrictions. Melting range 134\u2013163 \u00b0C; soluble in NMP, DMF, acetone, MEK for broad process compatibility.',
        ),
        block(
          'Primary applications: electronic encapsulants, toughened aerospace composite resins, BMI-modified epoxy laminates, and high-temperature adhesives where worker-safety or regulatory profile favors the bisphenol-A ether BMI family.',
        ),
      ],
      featureBullets: [
        'Non-hazardous grade bismaleimide',
        'Bisphenol-A diphenyl ether structure \u2014 toughened networks',
        'Melting range 134\u2013163 \u00b0C',
        'Addition cure \u2014 no volatiles, void-free consolidation',
        'Michael addition and "ene" cure compatible',
        'Soluble in NMP, DMF, acetone, MEK',
        'Miscible with BMI-1000, BMI-5100, BMI-TMH, DABPA',
        'Lower cure temperature window than MDA-BMI',
      ],
      applicationTags: [
        'Bismaleimides',
        'Aerospace Composites',
        'Electronic Encapsulation',
        'High-Performance Resins',
        'High-Frequency Laminates',
      ],
      seo: {
        title: 'BMI-4000 CAS 79922-55-7 | Non-Hazardous Bisphenol-A Ether BMI | MIKI USA',
        metaDescription:
          'BMI-4000 (CAS 79922-55-7), non-hazardous bisphenol-A diphenyl ether bismaleimide. Toughened BMI networks, improved solubility, preferred where MDA-BMI regulatory constraints apply.',
        keywords:
          'BMI-4000, 79922-55-7, bisphenol A diphenyl ether bismaleimide, non-hazardous BMI, BPA ether BMI, toughened bismaleimide, BMI REACH, flexible BMI, BMI-1000 alternative',
      },
    },
  },

  // ── BMI-5100 ────────────────────────────────────────────────────────────
  {
    id: 'product-bmi-5100',
    patch: {
      descriptionLong: [
        block(
          'BMI-5100 (CAS 105391-33-1) is 3,3\u2032-dimethyl-5,5\u2032-diethyl-4,4\u2032-diphenylmethane bismaleimide \u2014 a sterically hindered BMI designed to overcome the brittleness, poor solubility, and high Dk of unsubstituted MDA-BMI. The ortho-alkyl substitution disrupts chain packing, yielding a lower melting range (140\u2013158 \u00b0C), improved solubility in common solvents, and reduced cured-resin brittleness.',
        ),
        block(
          'Cure chemistry: same addition-cure mechanisms as BMI-1000 (radical homopolymerization, Michael addition with DDS/DDM diamines, "ene"/Diels\u2013Alder with DABPA), but with notably lower melt viscosity during processing. The alkyl substitution reduces water uptake and dielectric constant of the cured network \u2014 a key advantage for high-frequency PCB laminates and 5G antenna substrates.',
        ),
        block(
          'Typical formulation: BMI-5100 / DABPA at 1.2:1 molar ratio (same optimum as BMI-1000), optionally with 10\u201330% BMI-1000 for modulus or BMI-TMH for further viscosity reduction. Cure at 180\u2013200 \u00b0C gel, 220\u2013250 \u00b0C post-cure.',
        ),
        block(
          'Primary applications: low-Dk high-frequency laminates, 5G / mmWave antenna substrates, toughened aerospace prepregs, and electronic encapsulants where processability, toughness, and dielectric performance are all critical.',
        ),
      ],
      featureBullets: [
        'Melting range: 140\u2013158 \u00b0C',
        'Tetra-alkyl substitution \u2014 lower Dk / Df than BMI-1000',
        'Improved solubility in NMP, DMF, DMAc, acetone, MEK',
        'Toughened cured network \u2014 reduced brittleness',
        'Low water absorption for humid-environment stability',
        'BMI-5100 / DABPA 1.2:1 optimal for fracture toughness',
        'Ideal for 5G / mmWave high-frequency PCB laminates',
      ],
      seo: {
        title: 'BMI-5100 CAS 105391-33-1 | Alkylated Diphenylmethane Bismaleimide | MIKI USA',
        metaDescription:
          'BMI-5100 (CAS 105391-33-1), tetra-alkyl substituted diphenylmethane bismaleimide. Low-Dk, toughened BMI monomer for 5G / mmWave high-frequency laminates and aerospace prepregs. Optimal BMI/DABPA 1.2:1 formulation.',
        keywords:
          'BMI-5100, 105391-33-1, alkylated bismaleimide, low Dk BMI, toughened bismaleimide, 5G laminate resin, mmWave PCB, aerospace prepreg, hindered BMI monomer, BMI DABPA formulation',
      },
    },
  },

  // ── BMI-TMH ─────────────────────────────────────────────────────────────
  {
    id: 'product-bmi-tmh',
    patch: {
      descriptionLong: [
        block(
          'BMI-TMH (CAS 39979-46-9) is 1,6-bismaleimide-(2,2,4-trimethyl)hexane \u2014 an aliphatic bismaleimide with a flexible, branched C6 spacer. Unlike aromatic BMIs, it is a low-melting (73\u2013110 \u00b0C) semi-liquid that flows easily at moderate temperatures, making it an excellent reactive diluent and chain-flexibilizer.',
        ),
        block(
          'Cure chemistry: radical homopolymerization and Michael addition with diamines proceed readily; the aliphatic C6 spacer produces tougher, less brittle networks than aromatic BMIs. In BMI-1000 / BMI-5100 prepreg systems, 10\u201325 wt% BMI-TMH lowers melt viscosity without compromising cured Tg drastically, while halving cure shrinkage versus pure aromatic BMI blends. Also UV- and radical-curable on its own for photopolymer applications.',
        ),
        block(
          'Formulation partners: works with DABPA (ene reaction), DDS/DDM (Michael addition), and miscible with acrylate, methacrylate, epoxy, and cyanate ester resins for hybrid interpenetrating-network design.',
        ),
        block(
          'Primary applications: reactive diluent for BMI-1000 / BMI-5100 aerospace prepregs, UV-curable photopolymer resins (including stereolithography and dental composite formulations), flexible BMI coatings, and specialty high-temperature adhesives.',
        ),
      ],
      featureBullets: [
        'Melting range: 73\u2013110 \u00b0C (low-viscosity aliphatic BMI)',
        'Flexible C6 spacer \u2014 toughens aromatic BMI networks',
        'Reactive diluent: 10\u201325 wt% in BMI-1000 / BMI-5100 prepregs',
        'UV and radical curable \u2014 usable in photopolymer resins',
        'Lower cure shrinkage than aromatic BMIs',
        'Miscible with epoxy, acrylate, methacrylate, cyanate ester',
        'Compatible with DABPA, DDS, DDM co-reactants',
      ],
      seo: {
        title: 'BMI-TMH CAS 39979-46-9 | Aliphatic Bismaleimide Reactive Diluent | MIKI USA',
        metaDescription:
          'BMI-TMH (CAS 39979-46-9), aliphatic 1,6-bismaleimide-(2,2,4-trimethyl)hexane. Low-viscosity reactive diluent and toughener for BMI-1000, BMI-5100, epoxy, and UV-cure resin systems.',
        keywords:
          'BMI-TMH, 39979-46-9, aliphatic bismaleimide, trimethylhexane bismaleimide, BMI reactive diluent, BMI toughener, UV-curable bismaleimide, photopolymer monomer, flexible BMI, BMI-1000 diluent',
      },
    },
  },

  // ── DABPA ───────────────────────────────────────────────────────────────
  {
    id: 'product-dabpa',
    patch: {
      descriptionLong: [
        block(
          'DABPA (CAS 1745-89-7) is 2,2\u2032-diallyl bisphenol A \u2014 the industry-standard co-monomer for toughening bismaleimide (BMI) resins and the core of Huntsman\u2019s Matrimid\u00AE chemistry. The allyl groups react with maleimide double bonds via an "ene" reaction, followed by Diels\u2013Alder cycloaddition, while the bisphenol-A backbone contributes processability and toughness to the cured network.',
        ),
        block(
          'Cure chemistry: DABPA\u2019s low viscosity eliminates solvents from prepreg formulations; it copolymerizes with BMI to reduce crosslink density and improve fracture toughness (K1C, G1C). Published data on COMPIMIDE\u00AE 353 and comparable systems shows that a BMI / DABPA 1.2:1 molar ratio maximizes fracture toughness while keeping Tg > 270 \u00b0C. The phenolic hydroxyls can also co-cure with epoxy resins for hybrid BMI/epoxy interpenetrating networks.',
        ),
        block(
          'Compatibility: DABPA is the universal toughening partner for the BMI family \u2014 formulations with BMI-1000 (aerospace standard), BMI-2300 (high-crosslink-density oligomer), BMI-4000 (non-hazardous grade), BMI-5100 (low-Dk alkylated), and BMI-TMH (aliphatic diluent). Often combined with DDS or DDM diamines for Michael-addition co-cure to fine-tune Tg, modulus, and toughness.',
        ),
        block(
          'Product status: developing stage \u2014 contact MIKI USA technical sales for sample quantities, pilot lot availability, and formulation support.',
        ),
      ],
      featureBullets: [
        'Benchmark toughening co-monomer for bismaleimide resins',
        'Ene / Diels\u2013Alder reaction with maleimide C=C',
        'BMI / DABPA 1.2:1 molar ratio optimal for toughness',
        'Low-viscosity \u2014 solvent replacement in prepreg formulation',
        'Copolymerizes with BMI-1000, BMI-2300, BMI-4000, BMI-5100, BMI-TMH',
        'Phenolic OH enables hybrid BMI / epoxy co-cure',
        'Developing stage \u2014 contact sales for pilot samples',
      ],
      seo: {
        title: 'DABPA CAS 1745-89-7 | 2,2\u2032-Diallyl Bisphenol A BMI Co-Monomer | MIKI USA',
        metaDescription:
          'DABPA (CAS 1745-89-7), 2,2\u2032-diallyl bisphenol A \u2014 benchmark BMI toughening co-monomer. Ene/Diels\u2013Alder cure with BMI-1000, BMI-2300, BMI-5100 at 1.2:1 optimal ratio. Developing-stage availability.',
        keywords:
          'DABPA, 1745-89-7, 2,2\u2032-diallyl bisphenol A, BMI co-monomer, bismaleimide toughener, BMI/DABPA prepreg, Matrimid chemistry, ene reaction, Diels-Alder BMI, aerospace composite resin, allyl phenol',
      },
    },
  },
]

for (const u of updates) {
  try {
    await c.patch(u.id).set(u.patch).commit()
    console.log(`\u2713 ${u.id} enhanced`)
  } catch (err) {
    console.error(`\u2717 ${u.id} \u2014`, err?.message || err)
  }
}

console.log(
  '\nCross-product SEO links now in place:\n' +
    ' BMI-1000 \u21C4 BMI-2300, BMI-5100, BMI-TMH, DABPA, DDS, DDM, s-BPDA, 4,4\u2032-ODA\n' +
    ' BMI-2300 \u21C4 BMI-1000, BMI-4000, DABPA, BMI-TMH\n' +
    ' BMI-3000H \u21C4 BMI-1000, BMI-2300, DABPA + EPDM/HNBR/CR rubber\n' +
    ' BMI-4000 \u21C4 BMI-1000, BMI-5100, BMI-TMH, DABPA\n' +
    ' BMI-5100 \u21C4 BMI-1000, BMI-TMH, DABPA\n' +
    ' BMI-TMH \u21C4 BMI-1000, BMI-5100, DABPA\n' +
    ' DABPA \u21C4 entire BMI family + DDS/DDM',
)
