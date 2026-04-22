import Link from 'next/link'
import Image from 'next/image'
import type {Metadata} from 'next'
import {client} from '@/sanity/lib/client'
import {productsListQuery} from '@/sanity/lib/queries'
import {urlFor} from '@/sanity/lib/image'
import ProductsFilterSidebar from '@/components/ProductsFilterSidebar'

export const metadata: Metadata = {
  title: 'Product Catalog | Miki Sangyo USA',
  description:
    'Browse our complete catalog of specialty chemicals, monomers, optical materials, filter media, coatings, and battery materials. Search by CAS number, application, or category.',
  alternates: {canonical: '/products'},
}

export const revalidate = 60

type Product = {
  _id: string
  productName: string
  productCode?: string
  slug: string
  category?: string
  casNumber?: string
  descriptionShort?: string
  applicationTags?: string[]
  featureBullets?: string[]
  images?: any[]
  productType?: string
}

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{tag?: string; feature?: string; category?: string; q?: string}>
}) {
  const {tag, feature, category, q} = await searchParams
  const all = await client.fetch<Product[]>(productsListQuery)

  const slugify = (s: string) =>
    s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')

  const filtered = all.filter((p) => {
    if (tag && !p.applicationTags?.includes(tag)) return false
    if (feature && !p.featureBullets?.includes(feature)) return false
    if (category) {
      const want = slugify(category)
      const have = slugify(p.category ?? '')
      if (!have.includes(want) && !want.includes(have)) return false
    }
    if (q) {
      const hay = `${p.productName} ${p.productCode ?? ''} ${p.casNumber ?? ''} ${p.category ?? ''}`.toLowerCase()
      if (!hay.includes(q.toLowerCase())) return false
    }
    return true
  })

  const activeFilter = tag || feature || category || q
  const filterLabel = tag
    ? `Tag: ${tag}`
    : feature
      ? `Feature: ${feature}`
      : category
        ? `Category: ${category}`
        : q
          ? `Search: ${q}`
          : null

  // Build filter facets from the full product list
  const categoryCounts = new Map<string, number>()
  const typeCounts = new Map<string, number>()
  const tagCounts = new Map<string, number>()
  // Track one slug per category/tag so we can link directly when count === 1
  const categorySlug = new Map<string, string>()
  const tagSlug = new Map<string, string>()
  for (const p of all) {
    if (p.category) {
      categoryCounts.set(p.category, (categoryCounts.get(p.category) ?? 0) + 1)
      categorySlug.set(p.category, p.slug)
    }
    if (p.productType) typeCounts.set(p.productType, (typeCounts.get(p.productType) ?? 0) + 1)
    for (const t of p.applicationTags ?? []) {
      tagCounts.set(t, (tagCounts.get(t) ?? 0) + 1)
      tagSlug.set(t, p.slug)
    }
  }
  const sortedCategories = [...categoryCounts.entries()].sort((a, b) => b[1] - a[1])
  const sortedTypes = [...typeCounts.entries()].sort((a, b) => b[1] - a[1])
  const topTags = [...tagCounts.entries()].sort((a, b) => b[1] - a[1]).slice(0, 20)

  // Direct-link maps: only populated when that facet has exactly 1 product
  const categoryDirectSlugs: Record<string, string> = Object.fromEntries(
    [...categoryCounts.entries()]
      .filter(([, n]) => n === 1)
      .map(([c]) => [c, categorySlug.get(c)!])
  )
  const tagDirectSlugs: Record<string, string> = Object.fromEntries(
    [...tagCounts.entries()]
      .filter(([, n]) => n === 1)
      .map(([t]) => [t, tagSlug.get(t)!])
  )

  return (
    <div className="bg-white">
      <div className="border-b border-slate-200 bg-slate-50">
        <div className="mx-auto max-w-7xl px-6 py-12">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">Product Catalog</h1>
          <p className="text-slate-600">
            {filtered.length} {filtered.length === 1 ? 'product' : 'products'}
            {filterLabel && <> · filtered by <span className="font-medium">{filterLabel}</span></>}
          </p>
          {activeFilter && (
            <Link
              href="/products"
              className="inline-block mt-3 text-sm text-blue-600 hover:underline"
            >
              ← Clear filter
            </Link>
          )}
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 py-12 grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-10">
        <ProductsFilterSidebar
          sortedCategories={sortedCategories}
          sortedTypes={sortedTypes}
          topTags={topTags}
          q={q}
          tag={tag}
          category={category}
          categoryDirectSlugs={categoryDirectSlugs}
          tagDirectSlugs={tagDirectSlugs}
        />

        <div>
        {filtered.length === 0 ? (
          <p className="text-slate-500 text-center py-16">No products match this filter.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {filtered.map((p) => {
              const img = p.images?.[0]
              return (
                <Link
                  key={p._id}
                  href={`/products/${p.slug}`}
                  className="group rounded-xl border border-slate-200 bg-white overflow-hidden transition hover:-translate-y-1 hover:shadow-lg hover:border-blue-200"
                >
                  <div className="aspect-square bg-slate-50 flex items-center justify-center p-4">
                    {img ? (
                      <Image
                        src={urlFor(img).width(400).fit('max').url()}
                        alt={p.productName}
                        width={300}
                        height={300}
                        className="object-contain max-h-full w-auto"
                      />
                    ) : (
                      <div className="text-slate-300 text-xs">No image</div>
                    )}
                  </div>
                  <div className="p-4 border-t border-slate-100">
                    {p.category && (
                      <div className="text-xs text-blue-600 mb-1">{p.category}</div>
                    )}
                    <div className="font-semibold text-slate-900 text-sm leading-snug group-hover:text-blue-700">
                      {p.productName}
                    </div>
                    {p.casNumber && (
                      <div className="text-xs text-slate-500 mt-1">CAS {p.casNumber}</div>
                    )}
                  </div>
                </Link>
              )
            })}
          </div>
        )}
        </div>
      </div>
    </div>
  )
}
