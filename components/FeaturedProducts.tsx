import Link from 'next/link'
import Image from 'next/image'
import {urlFor} from '@/sanity/lib/image'
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type SanityImageSource = any

type Product = {
  _id: string
  productName: string
  productCode?: string
  slug: string
  casNumber?: string
  iupacName?: string
  category?: string
  descriptionShort?: string
  applicationTags?: string[]
  productType?: string
  images?: SanityImageSource[]
}

export default function FeaturedProducts({products}: {products: Product[]}) {
  if (!products?.length) return null
  return (
    <section className="py-16 bg-white">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center mb-10">
          <h2 className="text-4xl font-bold text-slate-900 mb-3">Featured Products</h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Discover our selection of high-quality chemical products, trusted by laboratories and
            industries worldwide.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((p) => (
            <article
              key={p._id}
              className="border border-slate-200 rounded-lg bg-white overflow-hidden flex flex-col hover:shadow-md transition-shadow"
            >
              <div className="relative h-44 bg-white">
                {p.images?.[0] ? (
                  <Image
                    src={urlFor(p.images[0]).width(600).fit('max').url()}
                    alt={p.productName}
                    fill
                    sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                    className="object-contain p-4"
                  />
                ) : (
                  <div className="absolute inset-0 grid place-items-center text-slate-400 text-xs">
                    No image
                  </div>
                )}
                <span className="absolute top-3 right-3 text-xs bg-blue-600 text-white px-2 py-1 rounded">
                  Featured
                </span>
                {p.category && (
                  <span className="absolute bottom-3 left-3 text-xs bg-white border border-slate-200 text-slate-700 px-2 py-1 rounded">
                    {p.category}
                  </span>
                )}
              </div>
              <div className="p-5 flex-1 flex flex-col">
                <h3 className="font-semibold text-slate-900 mb-1">{p.productName}</h3>
                <div className="text-xs text-slate-500 mb-3">
                  {p.productCode && <span>{p.productCode}</span>}
                  {p.casNumber && (
                    <>
                      {p.productCode && <span> · </span>}
                      <span>CAS: {p.casNumber}</span>
                    </>
                  )}
                </div>
                {p.descriptionShort && (
                  <p className="text-sm text-slate-600 mb-4 line-clamp-3">{p.descriptionShort}</p>
                )}
                {p.applicationTags && p.applicationTags.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {p.applicationTags.slice(0, 3).map((tag) => (
                      <Link
                        key={tag}
                        href={`/products?tag=${encodeURIComponent(tag)}`}
                        className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded-full hover:bg-blue-100 transition"
                      >
                        {tag}
                      </Link>
                    ))}
                  </div>
                )}
                <Link
                  href={`/products/${p.slug}`}
                  className="mt-auto text-center border border-slate-300 hover:border-slate-900 text-slate-900 text-sm py-2 rounded transition-colors"
                >
                  View Details
                </Link>
              </div>
            </article>
          ))}
        </div>
        <div className="text-center mt-12">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-md font-medium text-sm"
          >
            View All Products →
          </Link>
        </div>
      </div>
    </section>
  )
}
