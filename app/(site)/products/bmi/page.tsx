import Link from 'next/link'
import type {Metadata} from 'next'
import {client} from '@/sanity/lib/client'
import {bmiFamilyQuery} from '@/sanity/lib/queries'

export const revalidate = 300

type BmiProduct = {
  _id: string
  productName: string
  productCode?: string
  slug: string
  category?: string
  casNumber?: string
  iupacName?: string
  descriptionShort?: string
  chemicalSpecs?: {
    tg_c?: string
    mp_c?: string
    dielectricConstant?: string
    dissipationFactor?: string
  }
  applicationTags?: string[]
}

export const metadata: Metadata = {
  title:
    'Bismaleimide (BMI) Resin Comparison — All Grades, Tg, MP, Dk, Cure Chemistry | MIKI USA',
  description:
    'Side-by-side comparison of every bismaleimide grade — BMI-1000, BMI-2300, BMI-3000H, BMI-4000, BMI-5100, BMI-TMH, plus DABPA co-monomer. Compare melting point, cured Tg, dielectric constant, cure mechanism, and primary application for aerospace composites, 5G laminates, semiconductor encapsulants, and rubber vulcanization.',
  keywords:
    'bismaleimide resin comparison, BMI grades, BMI Tg comparison, BMI-1000 vs BMI-2300, BMI-5100 low Dk, BMI-3000H rubber crosslinker, BMI-4000 non-hazardous, BMI-TMH aliphatic diluent, DABPA co-monomer, bismaleimide cure chemistry, BMI DABPA formulation, aerospace BMI prepreg, 5G laminate resin',
  alternates: {canonical: 'https://www.mikisangyo.com/products/bmi'},
}

// Curated role blurbs + cure-chemistry labels — keyed by productCode to avoid
// fragile string-matching against productName.
const META_BY_CODE: Record<
  string,
  {role: string; cure: string}
> = {
  'BMI-1000': {
    role: 'Aerospace standard, MDA-BMI',
    cure: 'Radical + Michael (DDS/DDM) + ene (DABPA)',
  },
  'BMI-2300': {
    role: 'Multi-functional oligomer, high crosslink density',
    cure: 'Radical + Michael — blend partner for BMI-1000',
  },
  'BMI-3000H': {
    role: 'Rubber vulcanization crosslinker',
    cure: 'Radical — peroxide co-agent (EPDM/HNBR/CR)',
  },
  'BMI-4000': {
    role: 'Non-hazardous BPA-ether BMI',
    cure: 'Radical + Michael + ene, lower cure window',
  },
  'BMI-5100': {
    role: 'Low-Dk alkylated BMI for 5G/mmWave',
    cure: 'Radical + Michael + ene (DABPA)',
  },
  'BMI-TMH': {
    role: 'Aliphatic reactive diluent & toughener',
    cure: 'Radical + Michael — also UV-curable',
  },
  DABPA: {
    role: 'Universal BMI toughening co-monomer',
    cure: 'Ene / Diels–Alder partner for all BMI grades',
  },
}

function order(p: BmiProduct) {
  const c = p.productCode || p.productName
  if (c.startsWith('DABPA')) return 99
  const n = parseInt(c.replace(/\D/g, ''), 10)
  return isFinite(n) ? n : 100
}

export default async function BmiFamilyPage() {
  const products = await client.fetch<BmiProduct[]>(bmiFamilyQuery)
  const sorted = [...products].sort((a, b) => order(a) - order(b))

  const jsonLd = {
    '@context': 'https://schema.org/',
    '@type': 'TechArticle',
    headline: 'Bismaleimide (BMI) Resin Family — Comparative Technical Data',
    description: metadata.description as string,
    author: {'@type': 'Organization', name: 'Miki Sangyo USA Inc.'},
    publisher: {'@type': 'Organization', name: 'Miki Sangyo USA Inc.'},
    url: 'https://www.mikisangyo.com/products/bmi',
    about: sorted.map((p) => ({
      '@type': 'Product',
      name: p.productName,
      sku: p.productCode,
      ...(p.casNumber && {
        identifier: {'@type': 'PropertyValue', propertyID: 'CAS', value: p.casNumber},
      }),
      url: `https://www.mikisangyo.com/products/${p.slug}`,
    })),
  }

  return (
    <article className="bg-white">
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{__html: JSON.stringify(jsonLd)}}
      />

      {/* Breadcrumbs */}
      <div className="border-b border-slate-200 bg-slate-50">
        <div className="mx-auto max-w-7xl px-6 py-4 text-sm text-slate-600">
          <Link href="/" className="hover:text-blue-600">Home</Link>
          <span className="mx-2">/</span>
          <Link href="/products" className="hover:text-blue-600">Products</Link>
          <span className="mx-2">/</span>
          <span className="text-slate-900">Bismaleimide (BMI) Resin Family</span>
        </div>
      </div>

      {/* Hero */}
      <section className="mx-auto max-w-5xl px-6 py-12">
        <span className="inline-block text-xs font-medium text-blue-600 bg-blue-50 px-2.5 py-1 rounded mb-3">
          Bismaleimide (BMI)
        </span>
        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
          Bismaleimide (BMI) Resin Family — Grade Comparison &amp; Cure Chemistry
        </h1>
        <p className="text-slate-600 leading-relaxed">
          Every commercial bismaleimide grade from MIKI USA, compared side-by-side. BMIs cure
          by addition reaction — no volatile by-products — via radical homopolymerization,
          Michael addition with aromatic diamines (DDS/DDM), or the ene/Diels–Alder pathway
          with DABPA co-monomer. Published data on toughened systems identifies a{' '}
          <span className="font-semibold text-slate-800">BMI / DABPA 1.2:1 molar ratio</span>{' '}
          as the fracture-toughness optimum for most grades.
        </p>
      </section>

      {/* Comparison table */}
      <section className="border-t border-slate-200">
        <div className="mx-auto max-w-7xl px-6 py-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-5">
            Technical Data — All BMI Grades
          </h2>
          <div className="overflow-x-auto rounded-lg border border-slate-200">
            <table className="min-w-full divide-y divide-slate-200 text-sm">
              <caption className="caption-bottom text-xs text-slate-500 py-3 px-4 text-left">
                Melting point, cured Tg, dielectric constant, and primary role for each BMI
                grade. Contact sales for full datasheets and dissipation factor (Df) by grade.
              </caption>
              <thead className="bg-slate-50">
                <tr>
                  <th scope="col" className="px-4 py-3 text-left font-semibold text-slate-700">Grade</th>
                  <th scope="col" className="px-4 py-3 text-left font-semibold text-slate-700">CAS</th>
                  <th scope="col" className="px-4 py-3 text-left font-semibold text-slate-700">MP (°C)</th>
                  <th scope="col" className="px-4 py-3 text-left font-semibold text-slate-700">Cured Tg (°C)</th>
                  <th scope="col" className="px-4 py-3 text-left font-semibold text-slate-700">Dk</th>
                  <th scope="col" className="px-4 py-3 text-left font-semibold text-slate-700">Role</th>
                  <th scope="col" className="px-4 py-3 text-left font-semibold text-slate-700">Cure Chemistry</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white">
                {sorted.map((p) => {
                  const meta = META_BY_CODE[p.productCode || ''] || {role: '', cure: ''}
                  return (
                    <tr key={p._id} className="hover:bg-slate-50">
                      <th scope="row" className="px-4 py-3 text-left font-medium">
                        <Link
                          href={`/products/${p.slug}`}
                          className="text-blue-600 hover:underline"
                        >
                          {p.productCode || p.productName}
                        </Link>
                      </th>
                      <td className="px-4 py-3 text-slate-700 font-mono whitespace-nowrap">
                        {p.casNumber || '—'}
                      </td>
                      <td className="px-4 py-3 text-slate-700 font-mono whitespace-nowrap">
                        {p.chemicalSpecs?.mp_c || '—'}
                      </td>
                      <td className="px-4 py-3 text-slate-700 font-mono whitespace-nowrap">
                        {p.chemicalSpecs?.tg_c || '—'}
                      </td>
                      <td className="px-4 py-3 text-slate-700 font-mono whitespace-nowrap">
                        {p.chemicalSpecs?.dielectricConstant || '—'}
                      </td>
                      <td className="px-4 py-3 text-slate-700">{meta.role}</td>
                      <td className="px-4 py-3 text-slate-500">{meta.cure}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Grade cards — each links to full product page */}
      <section className="border-t border-slate-200 bg-slate-50">
        <div className="mx-auto max-w-7xl px-6 py-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-5">Grade Detail Pages</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {sorted.map((p) => (
              <Link
                key={p._id}
                href={`/products/${p.slug}`}
                className="block bg-white border border-slate-200 rounded-lg p-5 hover:border-blue-300 hover:shadow-sm transition"
              >
                <div className="text-xs font-medium text-blue-600 mb-1">{p.productCode}</div>
                <div className="font-semibold text-slate-900 mb-2">{p.productName}</div>
                {p.descriptionShort && (
                  <p className="text-sm text-slate-600 line-clamp-3">{p.descriptionShort}</p>
                )}
                {p.casNumber && (
                  <div className="mt-3 text-xs text-slate-500 font-mono">CAS {p.casNumber}</div>
                )}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Cure chemistry explainer — long-tail SEO body */}
      <section className="border-t border-slate-200">
        <div className="mx-auto max-w-4xl px-6 py-12 prose prose-slate max-w-none text-slate-700">
          <h2>BMI Cure Chemistry — Three Parallel Pathways</h2>
          <p>
            Bismaleimide resins cure by <strong>addition reaction</strong>, releasing no
            volatile by-products. This enables void-free consolidation of prepregs and
            encapsulants without the autoclave vacuum cycles required by condensation
            polyimides. Three mechanisms dominate formulation work:
          </p>
          <ol>
            <li>
              <strong>Radical homopolymerization</strong> of the maleimide C=C bond above
              200 °C. Dominant in monomeric aromatic BMIs (BMI-1000, BMI-3000H).
            </li>
            <li>
              <strong>Michael addition</strong> with aromatic diamines such as DDM and DDS —
              overcomes the steric hindrance that limits thermal homopolymerization alone.
              KERIMID® 601 and COMPIMIDE® 200 are commercial examples.
            </li>
            <li>
              <strong>Ene reaction + Diels–Alder</strong> with allyl co-monomers, principally{' '}
              <Link href="/products/dabpa" className="text-blue-600 hover:underline">
                DABPA
              </Link>{' '}
              (2,2′-diallyl bisphenol A). The basis of Huntsman's Matrimid® chemistry.
            </li>
          </ol>
          <h2>Selecting a Grade</h2>
          <ul>
            <li>
              <strong>Aerospace prepregs:</strong>{' '}
              <Link href="/products/bmi-1000" className="text-blue-600 hover:underline">
                BMI-1000
              </Link>{' '}
              + DABPA 1.2:1, optionally toughened with{' '}
              <Link href="/products/bmi-2300" className="text-blue-600 hover:underline">
                BMI-2300
              </Link>{' '}
              oligomer.
            </li>
            <li>
              <strong>5G / mmWave laminates:</strong>{' '}
              <Link href="/products/bmi-5100" className="text-blue-600 hover:underline">
                BMI-5100
              </Link>{' '}
              for lowest Dk/Df, blended with{' '}
              <Link href="/products/bmi-tmh" className="text-blue-600 hover:underline">
                BMI-TMH
              </Link>{' '}
              as a reactive diluent.
            </li>
            <li>
              <strong>Non-hazardous / regulated environments:</strong>{' '}
              <Link href="/products/bmi-4000" className="text-blue-600 hover:underline">
                BMI-4000
              </Link>{' '}
              BPA-ether BMI replaces MDA-derived grades.
            </li>
            <li>
              <strong>Rubber vulcanization:</strong>{' '}
              <Link href="/products/bmi-3000h" className="text-blue-600 hover:underline">
                BMI-3000H
              </Link>{' '}
              as a peroxide co-agent for EPDM, HNBR, and CR elastomers.
            </li>
          </ul>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="border-t border-slate-200 bg-slate-50">
        <div className="mx-auto max-w-4xl px-6 py-12 text-center">
          <h2 className="text-2xl font-bold text-slate-900 mb-3">
            Need datasheets or a formulation review?
          </h2>
          <p className="text-slate-600 mb-6">
            Our technical sales team supports BMI prepreg, laminate, and encapsulant
            development with sample quantities and joint-development agreements.
          </p>
          <Link
            href="/#contact"
            className="inline-block bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded font-medium"
          >
            Contact Technical Sales
          </Link>
        </div>
      </section>
    </article>
  )
}
