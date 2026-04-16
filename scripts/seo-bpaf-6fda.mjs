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
// BPAF / 6FDA — SEO-optimized product content
// ────────────────────────────────────────────────────────────────────────────

const payload = {
  // ── Product Name (H1) ────────────────────────────────────────────────
  productName: 'High-Purity 6FDA (CAS 1107-00-2) Fluorinated Dianhydride',

  // ── Short Description ────────────────────────────────────────────────
  descriptionShort:
    '6FDA (BPAF) is a hexafluoroisopropylidene-bridged aromatic dianhydride — the essential monomer for manufacturing low dielectric constant polyimide resins. Reacting 6FDA with aromatic diamines produces amorphous 6F polyimides with exceptional optical transparency, thermal stability above 500 °C, and outstanding solubility in organic solvents for processing ease.',

  // ── Long Description (Portable Text blocks) ──────────────────────────
  // Embeds Synthesis & Intermediates cluster + LSI keywords
  descriptionLong: [
    block(
      '4,4\u2032-(Hexafluoroisopropylidene)diphthalic anhydride \u2014 commonly known as 6FDA \u2014 is an aromatic dianhydride featuring the \u2013C(CF\u2083)\u2082\u2013 hexafluoroisopropylidene bridge. The bulky trifluoromethyl groups disrupt chain packing and reduce polarizability, producing polyimides with uniquely low dielectric constant (Dk), low dissipation factor (Df), and high optical transparency in the visible range.',
    ),
    block(
      '6FDA reacts with aromatic diamines to form a polyamic acid precursor, which undergoes thermal imidization to yield high-performance polyimide films and coatings. The fluorinated backbone gives these polymers outstanding solubility in common organic solvents (NMP, DMAc), enabling solution casting, spin-coating, and film extrusion processes. With specific diamines, 6FDA-based polyamic acids can also undergo thermal elimination to form polybenzoxazole (PBO) \u2014 expanding the material design space for advanced semiconductor packaging.',
    ),
    block(
      'Key polymer systems include 6FDA-DAM, 6FDA-ODA, and 6FDA-durene, each tailored for specific performance envelopes in electronics, aerospace composites, optical applications, and gas separation membranes.',
    ),
  ],

  // ── Feature Bullets (Properties/Specs cluster) ───────────────────────
  featureBullets: [
    'High thermal stability \u2014 Tg > 300 \u00b0C, low weight loss (<5%) at 500 \u00b0C',
    'Low dielectric constant (Dk) and dissipation factor (Df) for high-frequency applications',
    'High optical transparency \u2014 enables colorless polyimide (CPI) films in the visible range',
    'Low refractive index from trifluoromethyl groups',
    'Outstanding solubility in organic solvents (NMP, DMAc) for solution processing',
    'Low water absorption \u2014 maintains dielectric performance in humid environments',
    'Polyamic acid precursor route enables spin-coating and film casting',
    'Amorphous 6F polyimide structure with excellent dimensional stability',
  ],

  // ── Application Tags ─────────────────────────────────────────────────
  applicationTags: [
    'Polyimides',
    '5G / High-Frequency Laminates',
    'Aerospace Composites',
    'Flexible Displays',
    'Semiconductor Packaging',
    'Gas Separation Membranes',
    'Optical Materials',
  ],

  // ── SEO Metadata ─────────────────────────────────────────────────────
  seo: {
    title: '6FDA CAS 1107-00-2 | Fluorinated Dianhydride for Polyimide | MIKI USA',
    metaDescription:
      'Source high-purity 6FDA (CAS 1107-00-2), a premium fluorinated dianhydride for low dielectric constant polyimide. Ideal for 5G antenna materials, aerospace composites, and gas separation membranes.',
    keywords:
      '6FDA, 1107-00-2, BPAF, fluorinated dianhydride, low dielectric constant polyimide, colorless polyimide CPI, 6FDA-DAM, polyimide prepreg, 5G antenna materials, high-frequency laminates, aerospace composites, gas separation membrane, polyamic acid, high-performance polymers, electronic chemicals',
  },
}

try {
  await c.patch('product-bpaf').set(payload).commit()
  console.log('✓ product-bpaf (6FDA) updated successfully')
} catch (err) {
  console.error('✗ product-bpaf \u2014', err?.message || err)
}
