import {PortableText} from '@portabletext/react'
import PillarCard from './PillarCard'

type Pillar = {icon?: string; title?: string; description?: string}
type Section = {title?: string; intro?: any; pillars?: Pillar[]}

export default function AboutSections({
  philosophy,
  sustainability,
}: {
  philosophy?: Section
  sustainability?: Section
}) {
  return (
    <>
      {philosophy && (
        <section id="about" className="bg-white py-20 scroll-mt-20">
          <div className="mx-auto max-w-7xl px-6">
            <div className="text-center max-w-3xl mx-auto mb-12">
              {philosophy.title && (
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
                  {philosophy.title}
                </h2>
              )}
              {philosophy.intro && (
                <div className="text-slate-600 space-y-4 leading-relaxed">
                  <PortableText value={philosophy.intro} />
                </div>
              )}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {philosophy.pillars?.map((p, i) => (
                <PillarCard key={i} {...p} theme="blue" />
              ))}
            </div>
          </div>
        </section>
      )}

      {sustainability && (
        <section id="sustainability" className="bg-slate-50 py-20 scroll-mt-20">
          <div className="mx-auto max-w-7xl px-6">
            <div className="text-center max-w-3xl mx-auto mb-12">
              {sustainability.title && (
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
                  {sustainability.title}
                </h2>
              )}
              {sustainability.intro && (
                <div className="text-slate-600 space-y-4 leading-relaxed">
                  <PortableText value={sustainability.intro} />
                </div>
              )}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {sustainability.pillars?.map((p, i) => (
                <PillarCard key={i} {...p} theme="green" />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  )
}
