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
const fam = (name, description, bullets) => ({
  _key: k(),
  _type: 'object',
  name,
  description,
  bullets,
})

const solutions = [
  {
    _id: 'solution-static-control',
    slug: 'static-control',
    title: 'Static Control & Contamination Solutions',
    isPillar: true,
    order: 0,
    eyebrow: 'Solutions',
    tagline:
      'Industrial-grade ionization, non-contact cleaning, and ultra-clean workspace systems for electronics, optics, film, and precision manufacturing.',
    industries: ['Semiconductor', 'Display', 'Optical Films', 'Battery', 'Pharmaceutical', 'Web Converting'],
    problem: [
      block(
        'Static electricity and airborne particulate are silent yield killers in modern manufacturing. A single charged particle on a photomask, optical film, or battery separator can scrap a panel, ruin a roll, or trigger a costly field failure — and conventional ionizers and air-blow cleaning often introduce as many particles as they remove.',
      ),
      block(
        'The cost compounds at every step: rework, scrap, line stoppage, contaminated cleanrooms, and sustainability penalties from compressed-air consumption that can account for 20–30% of a fab’s total electricity bill.',
      ),
    ],
    approach: [
      block(
        'Our static-control product line takes a fundamentally different approach: air-less ionization, non-contact dust removal, and ultra-clean workstation environments engineered to eliminate static and particulate at the source — without compressed air, without contact, and without recontamination.',
      ),
      block(
        'The system is built around three core technologies — air-less static elimination, non-contact film and web cleaning, and Class 1-grade ionizing clean benches — and is deployed everywhere from semiconductor fabs to optical film converters, battery separator lines, and pharmaceutical packaging.',
      ),
    ],
    seo: {
      title: 'Static Control Solutions for Electronics, Optics & Film | Miki Sangyo USA',
      description:
        'Air-less ionizers, non-contact web cleaners, and Class 1 ionizing clean benches for semiconductor, display, optical film, and battery manufacturing. Eliminate static and particulate without compressed air.',
      keywords: [
        'static control',
        'ionizer',
        'non-contact web cleaner',
        'cleanroom',
        'static eliminator',
        'film cleaning',
        'ionizing clean bench',
      ],
    },
  },
  {
    _id: 'solution-anti-static-ionizers',
    slug: 'anti-static-ionizers',
    title: 'Air-less Ionizers & Static Eliminators',
    isPillar: false,
    order: 1,
    eyebrow: 'Static Control',
    tagline:
      'Compressed-air-free ionization for cleanrooms, electronics assembly, and precision optics. Eliminate static at the source with zero particle generation.',
    industries: ['Semiconductor', 'Electronics Assembly', 'Optics', 'Display', 'Medical Devices'],
    problem: [
      block(
        'Conventional ionizers rely on compressed air to deliver ions to the target — a method that introduces vibration, particulate, oil mist, and energy waste. In a Class 1 cleanroom, the air itself becomes the contamination source.',
      ),
    ],
    approach: [
      block(
        'Our air-less ionizing product line generates and delivers balanced ion clouds without any compressed air or moving parts. The result is silent, vibration-free, particle-free static elimination that holds surface potential within ±5 V on sensitive substrates and consumes a fraction of the energy of conventional bar ionizers.',
      ),
      block(
        'Bar, point, nozzle, and space-ionizing form factors are available, with built-in self-cleaning emitter electrodes and closed-loop ion balance feedback for installations that require continuous, hands-off operation.',
      ),
    ],
    productFamilies: [
      fam('Bar Ionizers', 'Long-format air-less bars for conveyor lines, web processes, and bench-top installations.', [
        'Air-less operation — no compressed air required',
        'Ion balance ±5 V on standard plate monitor',
        'Self-cleaning tungsten emitters',
        '24/7 continuous-duty rated',
      ]),
      fam('Point & Nozzle Ionizers', 'Targeted ionization for spot decharging of small parts, pick-and-place, and inspection stations.', [
        'Pinpoint ion delivery to 5–50 mm targets',
        'No vibration, no oil mist',
        'Footprint under 25 mm',
      ]),
      fam('Space Ionizers', 'Room and zone ionization for cleanrooms, EPA workstations, and assembly cells.', [
        'Covers 1–10 m³ working volume',
        'Ceiling, wall, or pedestal mount',
        'Plug-and-play — no facility air',
      ]),
    ],
    specTable: [
      {_key: k(), label: 'Ion Balance', value: '±5 V (standard plate monitor)'},
      {_key: k(), label: 'Compressed Air', value: 'None required'},
      {_key: k(), label: 'Decay Time (1000→100 V)', value: '< 2 sec at 300 mm'},
      {_key: k(), label: 'Cleanroom Rating', value: 'Class 1 compatible'},
    ],
    seo: {
      title: 'Air-less Ionizers & Static Eliminators | Miki Sangyo USA',
      description:
        'Compressed-air-free bar, point, and space ionizers for Class 1 cleanrooms. Eliminate static on semiconductor, optical, and electronic assembly lines with zero particle generation.',
      keywords: ['ionizer', 'static eliminator', 'air-less ionizer', 'cleanroom ionizer', 'bar ionizer', 'ESD'],
    },
  },
  {
    _id: 'solution-non-contact-web-cleaner',
    slug: 'non-contact-film-web-cleaner',
    title: 'Non-Contact Film & Web Cleaners',
    isPillar: false,
    order: 2,
    eyebrow: 'Static Control',
    tagline:
      'Remove sub-micron particles from moving film, foil, and web without rollers, brushes, or contact. Higher dust removal rate, zero scratch risk.',
    industries: ['Optical Film', 'Battery Separator', 'Flexible Display', 'Packaging', 'Roll-to-Roll Electronics'],
    problem: [
      block(
        'Contact cleaning rollers wear, generate their own debris, and can scratch high-value optical or battery films. Air-knife systems blow particles around the room rather than capturing them. Both compromise yield on the films that matter most.',
      ),
    ],
    approach: [
      block(
        'Our non-contact web cleaner uses a patented ionization-and-vacuum-capture method to lift and remove particulate from a moving web without ever touching it. Cleaning efficiency exceeds conventional contact rollers across the 0.3 µm and larger range, with no roller wear, no consumables, and full particulate capture into a sealed collection chamber.',
      ),
      block(
        'Standard widths cover 300 mm to 3000 mm web, with line speeds up to 300 m/min. Modular construction allows retrofit on existing R2R coaters, slitters, and laminators.',
      ),
    ],
    productFamilies: [
      fam('Web Cleaner Modules', 'In-line non-contact cleaning heads for R2R film processing.', [
        'Web widths 300–3000 mm',
        'Line speeds up to 300 m/min',
        '> 99% removal of 1 µm particles',
        'No consumables, no roller wear',
        'Sealed particulate capture chamber',
      ]),
      fam('Sheet Cleaners', 'Discrete-sheet non-contact cleaners for cut substrates, glass, and rigid panels.', [
        'Up to 1500 mm sheet width',
        'Two-sided cleaning available',
        'Conveyor or in-line integration',
      ]),
    ],
    seo: {
      title: 'Non-Contact Film & Web Cleaners | Miki Sangyo USA',
      description:
        'Patented non-contact web cleaners for optical film, battery separator, and flexible display lines. Remove sub-micron particulate without rollers, scratches, or consumables.',
      keywords: ['web cleaner', 'film cleaner', 'non-contact cleaning', 'roll to roll', 'particle removal'],
    },
  },
  {
    _id: 'solution-clean-bench',
    slug: 'ionizing-clean-bench',
    title: 'Class 1 Ionizing Clean Benches',
    isPillar: false,
    order: 3,
    eyebrow: 'Static Control',
    tagline:
      'Tabletop ultra-clean workstations that transform any desk into a Class 1 ionized environment for inspection, assembly, and precision rework.',
    industries: ['QA/Inspection', 'Optical Assembly', 'Medical Device', 'R&D Labs'],
    problem: [
      block(
        'Building a true Class 1 cleanroom is expensive and slow. But many critical operations — final inspection, optical bonding, medical device packaging, sample prep — only need a single clean workstation, not a whole room.',
      ),
    ],
    approach: [
      block(
        'Our ionizing clean bench delivers Class 1 air quality at the work surface in a self-contained tabletop unit. HEPA-filtered laminar flow combined with integrated air-less ionization eliminates both particulate and static charge in a single enclosure — no facility air, no construction, no permit.',
      ),
    ],
    productFamilies: [
      fam('Tabletop Clean Bench', 'Self-contained Class 1 workstation with integrated ionization.', [
        'ISO Class 1 air at work surface',
        'Built-in air-less ionizer (±5 V balance)',
        'HEPA + ULPA filtration',
        '600–1500 mm working widths',
        'Single 120/240 V plug — no facility air',
      ]),
      fam('Pass-Through Clean Box', 'Sealed transfer enclosure for moving sensitive parts between zones.', [
        'Maintains Class 1 during transfer',
        'Interlocked doors',
        'Integrated ionization',
      ]),
    ],
    seo: {
      title: 'Class 1 Ionizing Clean Bench — Tabletop Ultra-Clean Workstation',
      description:
        'Tabletop ionizing clean bench delivering ISO Class 1 air quality and ±5 V static control. No facility air, no cleanroom construction. Ideal for inspection, optical, and medical device work.',
      keywords: ['clean bench', 'ionizing clean bench', 'Class 1 workstation', 'laminar flow hood', 'ESD bench'],
    },
  },
  {
    _id: 'solution-cleanroom-construction',
    slug: 'cleanroom-construction',
    title: 'Clean Environment Construction',
    isPillar: false,
    order: 4,
    eyebrow: 'Static Control',
    tagline:
      'Turnkey design and build of dust-free, static-free production environments — from single rooms to full fabrication suites.',
    industries: ['Semiconductor', 'Display', 'Battery', 'Pharmaceutical', 'Medical Device'],
    problem: [
      block(
        'A cleanroom is only as good as its weakest seam. Generic build-outs that ignore static, airflow patterns, and integrated ionization frequently fail particle counts on day one — and the rebuild costs more than getting it right.',
      ),
    ],
    approach: [
      block(
        'We design and deliver complete clean environment construction projects with static control engineered in from the start. Every project is built around integrated ionization, validated airflow, and ISO 14644 compliance, and is delivered turnkey from layout through commissioning.',
      ),
    ],
    productFamilies: [
      fam('Modular Cleanroom Build', 'Single rooms, suites, or full production halls — ISO Class 1 to Class 8.', [
        'Integrated ionization throughout',
        'Validated to ISO 14644',
        'Modular wall and ceiling systems',
        'Turnkey installation and commissioning',
      ]),
      fam('Retrofit & Upgrade', 'Add static control, airflow correction, and HEPA upgrades to existing cleanrooms.', [
        'No production shutdown required for most upgrades',
        'Particle count validation pre/post',
        'ESD compliance assessment',
      ]),
    ],
    seo: {
      title: 'Cleanroom Construction & Static-Controlled Environments',
      description:
        'Turnkey design and construction of ISO 14644 cleanrooms with integrated static control. Single rooms to full fabrication suites for semiconductor, battery, and pharmaceutical manufacturing.',
      keywords: ['cleanroom construction', 'cleanroom design', 'ISO 14644', 'dust-free room', 'static-controlled environment'],
    },
  },
  {
    _id: 'solution-air-blow-free',
    slug: 'air-blow-free-sustainability',
    title: 'Air-Blow-Free Manufacturing',
    isPillar: false,
    order: 5,
    eyebrow: 'Static Control',
    tagline:
      'Cut compressed-air consumption by 60–90% across cleanroom and assembly operations. Lower energy bills, lower carbon footprint, fewer particles.',
    industries: ['All Cleanroom Manufacturing'],
    problem: [
      block(
        'Compressed air is the dirty secret of modern manufacturing energy bills — typically 10–30% of a fab’s electricity goes to producing it, and most of that air is wasted on ionization, blow-off cleaning, and air knives that introduce as many problems as they solve.',
      ),
    ],
    approach: [
      block(
        'Our air-blow-free product family eliminates the need for compressed air across the entire static-control and cleaning workflow. Air-less ionizers, non-contact web cleaners, and sealed clean benches replace blow-off systems with vacuum-capture and closed-loop ionization — cutting compressed-air load by 60–90% and removing one of the largest hidden cost and carbon line items in cleanroom manufacturing.',
      ),
      block(
        'Sites that have converted report payback in under 18 months purely on energy savings, before counting yield improvements from reduced particulate recontamination.',
      ),
    ],
    seo: {
      title: 'Air-Blow-Free Manufacturing — Compressed Air Reduction for Cleanrooms',
      description:
        'Eliminate compressed-air waste in cleanroom static control and cleaning. Air-less ionizers and non-contact cleaners cut compressed-air load by 60–90% with sub-18-month payback.',
      keywords: ['compressed air reduction', 'sustainable manufacturing', 'cleanroom energy', 'air-less ionizer'],
    },
  },
]

let ok = 0,
  fail = 0
for (const sol of solutions) {
  try {
    await c.createOrReplace({
      _type: 'solution',
      category: 'static-control',
      ...sol,
      slug: {_type: 'slug', current: sol.slug},
    })
    console.log(`✓ ${sol._id}`)
    ok++
  } catch (e) {
    console.error(`✗ ${sol._id} —`, e.message)
    fail++
  }
}
console.log(`\nDone. ${ok} succeeded, ${fail} failed.`)
