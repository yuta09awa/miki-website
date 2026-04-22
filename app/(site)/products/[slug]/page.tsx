import Link from 'next/link'
import Image from 'next/image'
import {notFound} from 'next/navigation'
import {PortableText} from '@portabletext/react'
import type {Metadata} from 'next'
import {client} from '@/sanity/lib/client'
import {productBySlugQuery, productSlugsQuery, singleProductFacetsQuery} from '@/sanity/lib/queries'
import {urlFor} from '@/sanity/lib/image'
import SampleRequestForm from '@/components/SampleRequestForm'

export const revalidate = 60

type RelatedProduct = {
  relationType: string
  note?: string
  product?: {
    _id: string
    productName: string
    productCode?: string
    slug: string
    casNumber?: string
    category?: string
    descriptionShort?: string
    images?: any[]
    productType?: string
  }
}

type Product = {
  _id: string
  productType?: string
  productName: string
  productCode?: string
  slug: string
  category?: string
  iupacName?: string
  casNumber?: string
  tscaStatus?: string
  htsCode?: string
  descriptionShort?: string
  descriptionLong?: any
  featureBullets?: string[]
  performanceTable?: {
    caption?: string
    benchmarkLabel?: string
    rows?: {
      property: string
      value: string
      unit?: string
      benchmark?: string
      notes?: string
    }[]
  }
  applicationTags?: string[]
  images?: any[]
  datasheet?: {asset?: {_ref: string; url?: string}}
  chemicalSpecs?: Record<string, string>
  opticalSpecs?: Record<string, string>
  relatedProducts?: RelatedProduct[]
  seo?: {title?: string; metaDescription?: string; keywords?: string}
}

export async function generateStaticParams() {
  const slugs = await client.fetch<string[]>(productSlugsQuery)
  return slugs.map((slug) => ({slug}))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{slug: string}>
}): Promise<Metadata> {
  const {slug} = await params
  const product = await client.fetch<Product | null>(productBySlugQuery, {slug})
  if (!product) return {title: 'Product not found'}
  return {
    title: product.seo?.title || `${product.productName} | Miki Sangyo USA`,
    description: product.seo?.metaDescription || product.descriptionShort,
    keywords: product.seo?.keywords,
  }
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{slug: string}>
}) {
  const {slug} = await params
  const [product, facets] = await Promise.all([
    client.fetch<Product | null>(productBySlugQuery, {slug}),
    client.fetch<{
      categories: {category: string; slug: string}[]
      tags: {tags: string[]; slug: string}[]
    }>(singleProductFacetsQuery),
  ])
  if (!product) notFound()

  // Build direct-link maps for facets with exactly 1 product
  const catCounts = new Map<string, number>()
  const catSlug = new Map<string, string>()
  for (const {category, slug: s} of facets.categories) {
    catCounts.set(category, (catCounts.get(category) ?? 0) + 1)
    catSlug.set(category, s)
  }
  const tagCounts = new Map<string, number>()
  const tagSlug = new Map<string, string>()
  for (const {tags, slug: s} of facets.tags) {
    for (const t of tags ?? []) {
      tagCounts.set(t, (tagCounts.get(t) ?? 0) + 1)
      tagSlug.set(t, s)
    }
  }
  const categoryHref = product.category
    ? catCounts.get(product.category) === 1
      ? `/products/${catSlug.get(product.category)}`
      : `/products?category=${encodeURIComponent(product.category)}`
    : '/products'
  const tagHref = (t: string) =>
    tagCounts.get(t) === 1
      ? `/products/${tagSlug.get(t)}`
      : `/products?tag=${encodeURIComponent(t)}`

  const heroImg = product.images?.[0]
  const specs =
    product.productType === 'optical' ? product.opticalSpecs : product.chemicalSpecs
  const specEntries = specs
    ? Object.entries(specs).filter(([k, v]) => v && k !== '_type')
    : []

  const pageUrl = `https://www.mikisangyo.com/products/${product.slug}`
  const imageUrl = heroImg ? urlFor(heroImg).width(1200).fit('max').url() : undefined
  const jsonLd = {
    '@context': 'https://schema.org/',
    '@type': 'Product',
    name: product.productName,
    ...(product.productCode && {sku: product.productCode}),
    ...(product.casNumber && {
      identifier: {'@type': 'PropertyValue', propertyID: 'CAS', value: product.casNumber},
    }),
    ...(product.iupacName && {alternateName: product.iupacName}),
    ...(imageUrl && {image: imageUrl}),
    description: product.descriptionShort,
    category: product.category,
    brand: {'@type': 'Brand', name: 'Miki Sangyo USA'},
    manufacturer: {'@type': 'Organization', name: 'Miki Sangyo USA Inc.'},
    url: pageUrl,
    ...(product.htsCode && {
      additionalProperty: {
        '@type': 'PropertyValue',
        propertyID: 'HTSUS',
        name: 'Harmonized Tariff Schedule',
        value: product.htsCode,
      },
    }),
  }

  return (
    <article className="bg-white">
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{__html: JSON.stringify(jsonLd)}}
      />
      <div className="border-b border-slate-200 bg-slate-50">
        <div className="mx-auto max-w-7xl px-6 py-4 text-sm text-slate-600">
          <Link href="/" className="hover:text-blue-600">
            Home
          </Link>
          <span className="mx-2">/</span>
          <Link href="/products" className="hover:text-blue-600">
            Products
          </Link>
          {product.category && (
            <>
              <span className="mx-2">/</span>
              <Link href={categoryHref} className="hover:text-blue-600">
                {product.category}
              </Link>
            </>
          )}
          <span className="mx-2">/</span>
          <span className="text-slate-900">{product.productName}</span>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 py-12 grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="space-y-4">
          <div className="bg-white border border-slate-200 rounded-xl p-6 flex items-center justify-center min-h-[400px]">
            {heroImg ? (
              <Image
                src={urlFor(heroImg).width(800).fit('max').url()}
                alt={product.productName}
                width={600}
                height={600}
                className="object-contain max-h-[420px] w-auto"
              />
            ) : (
              <div className="text-slate-400 text-sm">No image</div>
            )}
          </div>
          {product.images && product.images.length > 1 && (
            <div className="grid grid-cols-4 gap-2">
              {product.images.slice(1, 5).map((img, i) => (
                <div
                  key={i}
                  className="bg-slate-50 border border-slate-200 rounded-lg p-2 flex items-center justify-center aspect-square"
                >
                  <Image
                    src={urlFor(img).width(200).fit('max').url()}
                    alt={`${product.productName} - image ${i + 2}`}
                    width={150}
                    height={150}
                    className="object-contain max-h-full w-auto"
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        <div>
          {product.category && (
            <Link
              href={categoryHref}
              className="inline-block text-xs font-medium text-blue-600 bg-blue-50 px-2.5 py-1 rounded mb-3 hover:bg-blue-100"
            >
              {product.category}
            </Link>
          )}
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-3">
            {product.productName}
          </h1>
          {product.descriptionShort && (
            <p className="text-slate-600 leading-relaxed mb-6">{product.descriptionShort}</p>
          )}

          <dl className="grid grid-cols-2 gap-y-3 text-sm border-t border-slate-200 pt-5">
            {product.productCode && (
              <>
                <dt className="text-slate-500">Product Code</dt>
                <dd className="text-slate-900 font-medium">{product.productCode}</dd>
              </>
            )}
            {product.casNumber && (
              <>
                <dt className="text-slate-500">CAS Number</dt>
                <dd className="text-slate-900 font-medium">{product.casNumber}</dd>
              </>
            )}
            {product.iupacName && (
              <>
                <dt className="text-slate-500">IUPAC Name</dt>
                <dd className="text-slate-900 font-medium">{product.iupacName}</dd>
              </>
            )}
            {product.tscaStatus && (
              <>
                <dt className="text-slate-500">TSCA Status</dt>
                <dd className="text-slate-900 font-medium">{product.tscaStatus}</dd>
              </>
            )}
            {product.htsCode && (
              <>
                <dt className="text-slate-500">HTS Code</dt>
                <dd className="text-slate-900 font-medium">{product.htsCode}</dd>
              </>
            )}
            {specEntries.map(([k, v]) => (
              <div key={k} className="contents">
                <dt className="text-slate-500">{k}</dt>
                <dd className="text-slate-900 font-medium">{String(v)}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#request"
              className="bg-blue-600 hover:bg-blue-500 text-white px-5 py-2.5 rounded font-medium text-sm"
            >
              Request Quote
            </a>
            {product.datasheet?.asset && (
              <a
                href={product.datasheet.asset.url || '#'}
                target="_blank"
                rel="noopener noreferrer"
                className="border border-blue-300 hover:border-blue-400 text-blue-700 bg-blue-50 hover:bg-blue-100 px-5 py-2.5 rounded font-medium text-sm transition"
              >
                ↓ Download Datasheet
              </a>
            )}
            <Link
              href="/products"
              className="border border-slate-300 hover:border-slate-400 text-slate-700 px-5 py-2.5 rounded font-medium text-sm"
            >
              Back to Catalog
            </Link>
          </div>
        </div>
      </div>

      {product.descriptionLong && (
        <section className="border-t border-slate-200">
          <div className="mx-auto max-w-4xl px-6 py-12">
            <h2 className="text-2xl font-bold text-slate-900 mb-5">Overview</h2>
            <div className="prose prose-slate max-w-none text-slate-700 space-y-4">
              <PortableText value={product.descriptionLong} />
            </div>
          </div>
        </section>
      )}

      {!!product.performanceTable?.rows?.length && (
        <section className="border-t border-slate-200">
          <div className="mx-auto max-w-4xl px-6 py-12">
            <h2 className="text-2xl font-bold text-slate-900 mb-5">Performance Data</h2>
            <div className="overflow-x-auto rounded-lg border border-slate-200">
              <table className="min-w-full divide-y divide-slate-200 text-sm">
                {product.performanceTable.caption && (
                  <caption className="caption-bottom text-xs text-slate-500 py-3 px-4 text-left">
                    {product.performanceTable.caption}
                  </caption>
                )}
                <thead className="bg-slate-50">
                  <tr>
                    <th scope="col" className="px-4 py-3 text-left font-semibold text-slate-700">
                      Property
                    </th>
                    <th scope="col" className="px-4 py-3 text-left font-semibold text-slate-700">
                      Value
                    </th>
                    <th scope="col" className="px-4 py-3 text-left font-semibold text-slate-700">
                      Unit
                    </th>
                    {product.performanceTable.rows.some((r) => r.benchmark) && (
                      <th scope="col" className="px-4 py-3 text-left font-semibold text-slate-700">
                        {product.performanceTable.benchmarkLabel || 'Benchmark'}
                      </th>
                    )}
                    {product.performanceTable.rows.some((r) => r.notes) && (
                      <th scope="col" className="px-4 py-3 text-left font-semibold text-slate-700">
                        Notes
                      </th>
                    )}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 bg-white">
                  {product.performanceTable.rows.map((r, i) => (
                    <tr key={i} className="hover:bg-slate-50">
                      <th scope="row" className="px-4 py-3 text-left font-medium text-slate-900">
                        {r.property}
                      </th>
                      <td className="px-4 py-3 text-slate-700 font-mono">{r.value}</td>
                      <td className="px-4 py-3 text-slate-500">{r.unit || ''}</td>
                      {product.performanceTable!.rows!.some((rr) => rr.benchmark) && (
                        <td className="px-4 py-3 text-slate-500 font-mono">{r.benchmark || '—'}</td>
                      )}
                      {product.performanceTable!.rows!.some((rr) => rr.notes) && (
                        <td className="px-4 py-3 text-slate-500">{r.notes || ''}</td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      )}

      {!!product.featureBullets?.length && (
        <section className="border-t border-slate-200 bg-slate-50">
          <div className="mx-auto max-w-4xl px-6 py-12">
            <h2 className="text-2xl font-bold text-slate-900 mb-5">Key Features</h2>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {product.featureBullets.map((f) => (
                <li key={f} className="bg-white border border-slate-200 rounded-lg px-4 py-3 text-sm text-slate-700">
                  {f}
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {!!product.applicationTags?.length && (
        <section className="border-t border-slate-200">
          <div className="mx-auto max-w-4xl px-6 py-12">
            <h2 className="text-2xl font-bold text-slate-900 mb-5">Applications</h2>
            <div className="flex flex-wrap gap-2">
              {product.applicationTags.map((t) => (
                <Link
                  key={t}
                  href={tagHref(t)}
                  className="inline-block bg-blue-50 hover:bg-blue-100 text-blue-700 text-sm px-3 py-1.5 rounded-full transition"
                >
                  {t}
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {!!product.relatedProducts?.length && (
        <section className="border-t border-slate-200">
          <div className="mx-auto max-w-7xl px-6 py-12">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Related Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {product.relatedProducts
                .filter((rp) => rp.product)
                .map((rp) => {
                  const rel = rp.product!
                  const relImg = rel.images?.[0]
                  const RELATION_LABEL: Record<string, string> = {
                    formulation: 'Formulation Partner',
                    curing: 'Curing Agent / Co-Reactant',
                    monomer: 'Complementary Monomer',
                    series: 'Same Series',
                    alternative: 'Alternative Grade',
                  }
                  return (
                    <Link
                      key={rel._id}
                      href={`/products/${rel.slug}`}
                      className="group rounded-xl border border-slate-200 bg-white overflow-hidden transition hover:-translate-y-1 hover:shadow-lg hover:border-blue-200"
                    >
                      <div className="aspect-square bg-slate-50 flex items-center justify-center p-4">
                        {relImg ? (
                          <Image
                            src={urlFor(relImg).width(300).fit('max').url()}
                            alt={rel.productName}
                            width={200}
                            height={200}
                            className="object-contain max-h-full w-auto"
                          />
                        ) : (
                          <div className="text-slate-300 text-xs">No image</div>
                        )}
                      </div>
                      <div className="p-4 border-t border-slate-100">
                        <div className="text-xs text-blue-600 mb-1">
                          {RELATION_LABEL[rp.relationType] || rp.relationType}
                        </div>
                        <div className="font-semibold text-slate-900 text-sm leading-snug group-hover:text-blue-700">
                          {rel.productName}
                        </div>
                        {rp.note && (
                          <div className="text-xs text-slate-500 mt-1">{rp.note}</div>
                        )}
                        {rel.casNumber && (
                          <div className="text-xs text-slate-400 mt-1">CAS {rel.casNumber}</div>
                        )}
                      </div>
                    </Link>
                  )
                })}
            </div>
          </div>
        </section>
      )}

      <section id="request" className="border-t border-slate-200 bg-slate-50 scroll-mt-20">
        <div className="mx-auto max-w-4xl px-6 py-12">
          <SampleRequestForm
            productName={product.productName}
            productCode={product.productCode}
          />
        </div>
      </section>
    </article>
  )
}
