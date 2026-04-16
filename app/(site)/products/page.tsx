import Link from 'next/link'
import Image from 'next/image'
import type {Metadata} from 'next'
import {client} from '@/sanity/lib/client'
import {productsListQuery} from '@/sanity/lib/queries'
import {urlFor} from '@/sanity/lib/image'

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
  for (const p of all) {
    if (p.category) categoryCounts.set(p.category, (categoryCounts.get(p.category) ?? 0) + 1)
    if (p.productType) typeCounts.set(p.productType, (typeCounts.get(p.productType) ?? 0) + 1)
    for (const t of p.applicationTags ?? []) tagCounts.set(t, (tagCounts.get(t) ?? 0) + 1)
  }
  const sortedCategories = [...categoryCounts.entries()].sort((a, b) => b[1] - a[1])
  const sortedTypes = [...typeCounts.entries()].sort((a, b) => b[1] - a[1])
  const topTags = [...tagCounts.entries()].sort((a, b) => b[1] - a[1]).slice(0, 20)

  const TYPE_LABEL: Record<string, string> = {
    chemical: 'Chemical / Monomer',
    optical: 'Optical Material',
    filter: 'Filter Media',
    coating: 'Coating',
    battery: 'Battery Material',
  }

  const isActiveCategory = (c: string) =>
    !!category && slugify(category) === slugify(c)

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
        <aside className="space-y-8">
          <form action="/products" method="get">
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wide mb-2">
              Search
            </label>
            <input
              type="search"
              name="q"
              defaultValue={q ?? ''}
              placeholder="Name, code, CAS…"
              className="w-full border border-slate-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
            />
          </form>

          {sortedTypes.length > 1 && (
            <div>
              <h3 className="text-xs font-semibold text-slate-700 uppercase tracking-wide mb-3">
                Product Type
              </h3>
              <ul className="space-y-1.5 text-sm">
                {sortedTypes.map(([t, n]) => (
                  <li key={t}>
                    <Link
                      href={`/products?category=${encodeURIComponent(t)}`}
                      className="flex justify-between text-slate-600 hover:text-blue-600"
                    >
                      <span>{TYPE_LABEL[t] ?? t}</span>
                      <span className="text-slate-400">{n}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {sortedCategories.length > 0 && (
            <div>
              <h3 className="text-xs font-semibold text-slate-700 uppercase tracking-wide mb-3">
                Categories
              </h3>
              <ul className="space-y-1.5 text-sm max-h-80 overflow-y-auto pr-2">
                {sortedCategories.map(([c, n]) => {
                  const active = isActiveCategory(c)
                  return (
                    <li key={c}>
                      <Link
                        href={active ? '/products' : `/products?category=${encodeURIComponent(c)}`}
                        className={`flex justify-between rounded px-2 py-1 -mx-2 ${
                          active
                            ? 'bg-blue-50 text-blue-700 font-medium'
                            : 'text-slate-600 hover:text-blue-600 hover:bg-slate-50'
                        }`}
                      >
                        <span className="truncate">{c}</span>
                        <span className="text-slate-400">{n}</span>
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </div>
          )}

          {topTags.length > 0 && (
            <div>
              <h3 className="text-xs font-semibold text-slate-700 uppercase tracking-wide mb-3">
                Applications
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {topTags.map(([t, n]) => {
                  const active = tag === t
                  return (
                    <Link
                      key={t}
                      href={active ? '/products' : `/products?tag=${encodeURIComponent(t)}`}
                      className={`text-xs px-2 py-1 rounded-full transition ${
                        active
                          ? 'bg-blue-600 text-white'
                          : 'bg-blue-50 text-blue-700 hover:bg-blue-100'
                      }`}
                    >
                      {t} <span className="opacity-60">{n}</span>
                    </Link>
                  )
                })}
              </div>
            </div>
          )}
        </aside>

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
