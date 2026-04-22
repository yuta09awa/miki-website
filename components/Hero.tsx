import Link from 'next/link'
import {Building2, Globe, ShieldCheck, Package, type LucideIcon} from 'lucide-react'

const ICON_MAP: Record<string, LucideIcon> = {
  building: Building2,
  professionalism: Building2,
  globe: Globe,
  flexibility: Globe,
  shield: ShieldCheck,
  shieldcheck: ShieldCheck,
  creativity: ShieldCheck,
  package: Package,
  heritage: Package,
}

function pickIcon(p: {icon?: string; title?: string}): LucideIcon {
  const key = (p.icon || p.title || '').toLowerCase().replace(/[^a-z]/g, '')
  for (const [k, Icon] of Object.entries(ICON_MAP)) {
    if (key.includes(k)) return Icon
  }
  return Package
}

type Cta = {label?: string; href?: string}
type Pillar = {icon?: string; title?: string; description?: string}
type HeroProps = {
  eyebrow?: string
  title?: string
  subtitle?: string
  primaryCta?: Cta
  secondaryCta?: Cta
  pillars?: Pillar[]
}

export default function Hero({hero}: {hero?: HeroProps}) {
  if (!hero) return null
  return (
    <section className="relative overflow-hidden text-white">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            'url(https://mikisangyo.co.jp/en/wp-content/themes/mikitheme/assets/images/history-back.jpg)',
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-gray-900/95 to-gray-900/75" />
      <div className="relative mx-auto max-w-7xl px-6 py-28">
        {hero.eyebrow && <p className="text-blue-300 text-sm mb-3">{hero.eyebrow}</p>}
        {hero.title && (
          <h1 className="font-official text-5xl md:text-6xl font-bold mb-6 max-w-3xl tracking-tight">
            {hero.title}
          </h1>
        )}
        {hero.subtitle && (
          <p className="text-lg text-slate-200 max-w-2xl mb-8 leading-relaxed">{hero.subtitle}</p>
        )}
        <div className="flex flex-wrap gap-4 mb-16">
          {hero.primaryCta?.href && (
            <Link
              href={hero.primaryCta.href}
              className="bg-blue-600 hover:bg-blue-500 transition px-6 py-3 rounded-md font-medium text-sm"
            >
              {hero.primaryCta.label}
            </Link>
          )}
          {hero.secondaryCta?.href && (
            <Link
              href={hero.secondaryCta.href}
              className="bg-slate-700/60 hover:bg-slate-700 transition px-6 py-3 rounded-md font-medium text-sm"
            >
              {hero.secondaryCta.label}
            </Link>
          )}
        </div>
        {hero.pillars && hero.pillars.length > 0 && (
          <div className="flex flex-wrap justify-center md:justify-start gap-8">
            {hero.pillars.map((p, i) => {
              const Icon = pickIcon(p)
              return (
                <div key={i} className="text-center w-24">
                  <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-slate-700/60 grid place-items-center">
                    <Icon className="w-6 h-6 text-white" strokeWidth={1.75} />
                  </div>
                  <div className="text-sm font-medium text-blue-300">{p.title}</div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </section>
  )
}
