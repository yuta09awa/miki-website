import Link from 'next/link'
import Image from 'next/image'
import {notFound} from 'next/navigation'
import {PortableText} from '@portabletext/react'
import type {Metadata} from 'next'
import {client} from '@/sanity/lib/client'
import {solutionBySlugQuery} from '@/sanity/lib/queries'
import {urlFor} from '@/sanity/lib/image'
import SampleRequestForm from '@/components/SampleRequestForm'
import {SolutionDiagram} from '@/components/SolutionDiagrams'
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type SanityImageSource = any

export const revalidate = 60

type Family = {
  _key: string
  name?: string
  description?: string
  image?: SanityImageSource
  bullets?: string[]
}

type Solution = {
  _id: string
  title: string
  slug: string
  category: string
  isPillar?: boolean
  eyebrow?: string
  tagline?: string
  heroImage?: SanityImageSource
  problem?: any
  approach?: any
  productFamilies?: Family[]
  specTable?: {_key: string; label: string; value: string}[]
  industries?: string[]
  related?: {title: string; slug: string; tagline?: string; heroImage?: SanityImageSource}[]
  seo?: {title?: string; description?: string; keywords?: string[]}
}

export async function generateStaticParams() {
  const slugs = await client.fetch<{slug: string}[]>(
    `*[_type == "solution" && defined(slug.current)]{"slug": slug.current}`,
  )
  return slugs.map((s) => ({slug: s.slug}))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{slug: string}>
}): Promise<Metadata> {
  const {slug} = await params
  const sol = await client.fetch<Solution | null>(solutionBySlugQuery, {slug})
  if (!sol) return {title: 'Solution not found'}
  return {
    title: sol.seo?.title || `${sol.title} | Miki Sangyo USA`,
    description: sol.seo?.description || sol.tagline,
    keywords: sol.seo?.keywords,
    alternates: {canonical: `/solutions/${sol.slug}`},
    openGraph: {
      title: sol.seo?.title || sol.title,
      description: sol.seo?.description || sol.tagline,
      type: 'article',
    },
  }
}

export default async function SolutionPage({params}: {params: Promise<{slug: string}>}) {
  const {slug} = await params
  const sol = await client.fetch<Solution | null>(solutionBySlugQuery, {slug})
  if (!sol) notFound()

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: sol.title,
    description: sol.seo?.description || sol.tagline,
    brand: {'@type': 'Organization', name: 'Miki Sangyo USA'},
    category: sol.category,
  }

  return (
    <div className="bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{__html: JSON.stringify(jsonLd)}}
      />
      {/* Breadcrumb */}
      <div className="bg-slate-50 border-b border-slate-200">
        <div className="mx-auto max-w-7xl px-6 py-3 text-sm text-slate-600">
          <Link href="/" className="hover:text-blue-600">
            Home
          </Link>
          <span className="mx-2">/</span>
          <Link href="/solutions" className="hover:text-blue-600">
            Solutions
          </Link>
          {!sol.isPillar && (
            <>
              <span className="mx-2">/</span>
              <Link
                href={`/solutions/${sol.category}`}
                className="hover:text-blue-600 capitalize"
              >
                {sol.category.replace(/-/g, ' ')}
              </Link>
            </>
          )}
          <span className="mx-2">/</span>
          <span className="text-slate-900">{sol.title}</span>
        </div>
      </div>

      {/* Hero */}
      <section className="bg-slate-900 text-white py-16">
        <div className="mx-auto max-w-7xl px-6 grid md:grid-cols-2 gap-10 items-center">
          <div>
            {sol.eyebrow && (
              <p className="text-blue-300 text-sm font-medium uppercase tracking-wider mb-3">
                {sol.eyebrow}
              </p>
            )}
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{sol.title}</h1>
            {sol.tagline && (
              <p className="text-slate-300 max-w-3xl text-lg">{sol.tagline}</p>
            )}
            {sol.industries && sol.industries.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-6">
                {sol.industries.map((i) => (
                  <span
                    key={i}
                    className="text-xs bg-slate-800 border border-slate-700 text-slate-200 px-3 py-1.5 rounded-full"
                  >
                    {i}
                  </span>
                ))}
              </div>
            )}
          </div>
          <div className="rounded-lg overflow-hidden border border-slate-700">
            <SolutionDiagram slug={sol.slug} className="w-full h-auto" />
          </div>
        </div>
      </section>

      {/* Problem + Approach */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-6 grid md:grid-cols-2 gap-12">
          {sol.problem && (
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">The Challenge</h2>
              <div className="prose prose-slate max-w-none text-slate-600">
                <PortableText value={sol.problem} />
              </div>
            </div>
          )}
          {sol.approach && (
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">Our Approach</h2>
              <div className="prose prose-slate max-w-none text-slate-600">
                <PortableText value={sol.approach} />
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Product Families */}
      {sol.productFamilies && sol.productFamilies.length > 0 && (
        <section className="py-16 bg-slate-50">
          <div className="mx-auto max-w-7xl px-6">
            <h2 className="text-3xl font-bold text-slate-900 mb-10 text-center">
              Product Families
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sol.productFamilies.map((f) => (
                <div
                  key={f._key}
                  className="bg-white border border-slate-200 rounded-lg overflow-hidden flex flex-col"
                >
                  <div className="relative h-44 bg-slate-100">
                    {f.image ? (
                      <Image
                        src={urlFor(f.image).width(600).url()}
                        alt={f.name || ''}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="absolute inset-0 grid place-items-center text-slate-400 text-xs">
                        Image coming soon
                      </div>
                    )}
                  </div>
                  <div className="p-6 flex-1 flex flex-col">
                    <h3 className="font-semibold text-slate-900 mb-2">{f.name}</h3>
                    {f.description && (
                      <p className="text-sm text-slate-600 mb-4">{f.description}</p>
                    )}
                    {f.bullets && f.bullets.length > 0 && (
                      <ul className="text-sm text-slate-600 space-y-1.5 mt-auto">
                        {f.bullets.map((b, i) => (
                          <li key={i} className="flex gap-2">
                            <span className="text-blue-600">•</span>
                            <span>{b}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Specs */}
      {sol.specTable && sol.specTable.length > 0 && (
        <section className="py-16">
          <div className="mx-auto max-w-4xl px-6">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Typical Specifications</h2>
            <div className="border border-slate-200 rounded-lg overflow-hidden">
              <table className="w-full text-sm">
                <tbody>
                  {sol.specTable.map((row, i) => (
                    <tr key={row._key} className={i % 2 ? 'bg-slate-50' : 'bg-white'}>
                      <td className="px-4 py-3 font-medium text-slate-900 w-1/3">{row.label}</td>
                      <td className="px-4 py-3 text-slate-600">{row.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      )}

      {/* Related */}
      {sol.related && sol.related.length > 0 && (
        <section className="py-16 bg-slate-50">
          <div className="mx-auto max-w-7xl px-6">
            <h2 className="text-2xl font-bold text-slate-900 mb-8">Related Solutions</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {sol.related.map((r) => (
                <Link
                  key={r.slug}
                  href={`/solutions/${r.slug}`}
                  className="bg-white border border-slate-200 rounded-lg p-6 hover:border-blue-500 transition-colors"
                >
                  <h3 className="font-semibold text-slate-900 mb-2">{r.title}</h3>
                  <p className="text-sm text-slate-600 line-clamp-3">{r.tagline}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA / Sample Request */}
      <section className="py-16">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="text-2xl font-bold text-slate-900 mb-2 text-center">
            Request More Information
          </h2>
          <p className="text-slate-600 text-center mb-8">
            Talk to our team about deploying this solution at your facility.
          </p>
          <SampleRequestForm productName={sol.title} />
        </div>
      </section>
    </div>
  )
}
