import {PortableText} from '@portabletext/react'
import type {Metadata} from 'next'
import {client} from '@/sanity/lib/client'
import {aboutPageQuery} from '@/sanity/lib/queries'
import PillarCard from '@/components/PillarCard'

export const metadata: Metadata = {
  title: 'About | Miki Sangyo USA',
  description:
    'Learn about Miki Sangyo — over 350 years of heritage since 1674. Our philosophy, sustainability initiatives, and global presence across Japan, USA, Germany, Thailand, India, and China.',
  alternates: {canonical: '/about'},
}

export const revalidate = 60

type Pillar = {icon?: string; title?: string; description?: string}
type Section = {title?: string; intro?: any; pillars?: Pillar[]}
type AboutData = {
  heroEyebrow?: string
  heroTitle?: string
  heroSubtitle?: string
  philosophy?: Section
  sustainability?: Section
}

export default async function AboutPage() {
  const data = await client.fetch<AboutData | null>(aboutPageQuery)
  if (!data) {
    return (
      <div className="mx-auto max-w-3xl px-6 py-24 text-center">
        <h1 className="text-3xl font-bold text-slate-900 mb-4">About</h1>
        <p className="text-slate-600">
          The About Page document hasn&apos;t been created yet in Studio.
        </p>
      </div>
    )
  }

  return (
    <>
      {(data.heroTitle || data.heroSubtitle) && (
        <section className="bg-white border-b border-slate-200">
          <div className="mx-auto max-w-5xl px-6 py-20 text-center">
            {data.heroEyebrow && (
              <p className="text-blue-600 text-sm font-medium mb-3">{data.heroEyebrow}</p>
            )}
            {data.heroTitle && (
              <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-5">
                {data.heroTitle}
              </h1>
            )}
            {data.heroSubtitle && (
              <p className="text-lg text-slate-600 max-w-3xl mx-auto">{data.heroSubtitle}</p>
            )}
          </div>
        </section>
      )}

      {data.philosophy && (
        <section className="bg-white py-20">
          <div className="mx-auto max-w-7xl px-6">
            <div className="text-center max-w-3xl mx-auto mb-12">
              {data.philosophy.title && (
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
                  {data.philosophy.title}
                </h2>
              )}
              {data.philosophy.intro && (
                <div className="text-slate-600 space-y-4 leading-relaxed">
                  <PortableText value={data.philosophy.intro} />
                </div>
              )}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {data.philosophy.pillars?.map((p, i) => (
                <PillarCard key={i} {...p} theme="blue" />
              ))}
            </div>
          </div>
        </section>
      )}

      {data.sustainability && (
        <section className="bg-slate-50 py-20">
          <div className="mx-auto max-w-7xl px-6">
            <div className="text-center max-w-3xl mx-auto mb-12">
              {data.sustainability.title && (
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
                  {data.sustainability.title}
                </h2>
              )}
              {data.sustainability.intro && (
                <div className="text-slate-600 space-y-4 leading-relaxed">
                  <PortableText value={data.sustainability.intro} />
                </div>
              )}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {data.sustainability.pillars?.map((p, i) => (
                <PillarCard key={i} {...p} theme="green" />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  )
}
