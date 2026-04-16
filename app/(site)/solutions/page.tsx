import Link from 'next/link'
import Image from 'next/image'
import type {Metadata} from 'next'
import {client} from '@/sanity/lib/client'
import {solutionsListQuery} from '@/sanity/lib/queries'
import {urlFor} from '@/sanity/lib/image'
import {SolutionDiagram} from '@/components/SolutionDiagrams'
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type SanityImageSource = any

export const revalidate = 60

export const metadata: Metadata = {
  title: 'Solutions | Miki Sangyo USA',
  description:
    'Engineered solutions for static control, contamination, and specialty manufacturing — from air-less ionizers to non-contact web cleaners and Class 1 clean benches.',
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
  industries?: string[]
}

export default async function SolutionsIndexPage() {
  const all = await client.fetch<Solution[]>(solutionsListQuery)
  const byCat = new Map<string, Solution[]>()
  for (const s of all) {
    if (!byCat.has(s.category)) byCat.set(s.category, [])
    byCat.get(s.category)!.push(s)
  }

  return (
    <div className="bg-white">
      <section className="bg-slate-900 text-white py-20">
        <div className="mx-auto max-w-7xl px-6">
          <p className="text-blue-300 text-sm font-medium uppercase tracking-wider mb-3">Solutions</p>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Engineered Solutions</h1>
          <p className="text-slate-300 max-w-3xl text-lg">
            Beyond chemicals, we deliver complete solutions for the toughest contamination, static, and
            material-handling challenges in modern manufacturing.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-7xl px-6 space-y-16">
          {[...byCat.entries()].map(([cat, items]) => {
            const pillar = items.find((i) => i.isPillar)
            const subs = items.filter((i) => !i.isPillar)
            return (
              <div key={cat}>
                {pillar && (
                  <div className="mb-8">
                    <Link
                      href={`/solutions/${pillar.slug}`}
                      className="block group border border-slate-200 rounded-lg overflow-hidden hover:border-blue-500 transition-colors"
                    >
                      <div className="grid md:grid-cols-2">
                        <div className="relative h-64 md:h-auto bg-slate-900">
                          {pillar.heroImage ? (
                            <Image
                              src={urlFor(pillar.heroImage).width(800).url()}
                              alt={pillar.title}
                              fill
                              className="object-cover"
                            />
                          ) : (
                            <SolutionDiagram slug={pillar.slug} className="w-full h-full" />
                          )}
                        </div>
                        <div className="p-8">
                          <p className="text-blue-600 text-xs font-semibold uppercase tracking-wider mb-2">
                            {pillar.eyebrow || 'Solution Category'}
                          </p>
                          <h2 className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-blue-600">
                            {pillar.title}
                          </h2>
                          <p className="text-slate-600 mb-4">{pillar.tagline}</p>
                          {pillar.industries && (
                            <div className="flex flex-wrap gap-2">
                              {pillar.industries.slice(0, 5).map((i) => (
                                <span
                                  key={i}
                                  className="text-xs bg-slate-100 text-slate-700 px-2 py-1 rounded"
                                >
                                  {i}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </Link>
                  </div>
                )}
                {subs.length > 0 && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {subs.map((s) => (
                      <Link
                        key={s._id}
                        href={`/solutions/${s.slug}`}
                        className="border border-slate-200 rounded-lg overflow-hidden hover:border-blue-500 transition-colors group"
                      >
                        <div className="relative h-40 bg-slate-900">
                          {s.heroImage ? (
                            <Image
                              src={urlFor(s.heroImage).width(600).url()}
                              alt={s.title}
                              fill
                              className="object-cover"
                            />
                          ) : (
                            <SolutionDiagram slug={s.slug} className="w-full h-full" />
                          )}
                        </div>
                        <div className="p-5">
                          <h3 className="font-semibold text-slate-900 mb-2 group-hover:text-blue-600">
                            {s.title}
                          </h3>
                          <p className="text-sm text-slate-600 line-clamp-3">{s.tagline}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </section>
    </div>
  )
}
