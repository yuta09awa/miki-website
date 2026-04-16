import {Award, MapPin, FlaskConical, Microscope} from 'lucide-react'

const ITEMS = [
  {
    icon: MapPin,
    title: 'Sourced from Japan',
    description: 'Manufacturing partners with decades of specialty chemistry expertise.',
  },
  {
    icon: Award,
    title: 'Pharmaceutical-grade quality',
    description: 'Purity standards set above conventional commercial grade on every shipment.',
  },
  {
    icon: FlaskConical,
    title: 'Industrial materials',
    description: 'Polyimides, bismaleimides, optical films, and high-performance monomers.',
  },
  {
    icon: Microscope,
    title: 'Bio & pharma reagents',
    description: 'Amino acids, peptide building blocks, ADC linkers, and custom synthesis.',
  },
]

export default function TrustStrip() {
  return (
    <section className="bg-white border-b border-slate-200">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {ITEMS.map(({icon: Icon, title, description}) => (
            <div key={title} className="flex gap-4">
              <div className="shrink-0 w-11 h-11 rounded-lg bg-blue-50 grid place-items-center">
                <Icon className="w-5 h-5 text-blue-600" strokeWidth={1.75} />
              </div>
              <div>
                <h3 className="font-semibold text-slate-900 text-sm mb-1">{title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
