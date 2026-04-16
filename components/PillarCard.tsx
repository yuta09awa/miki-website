import {
  Building2,
  Globe,
  Lightbulb,
  ShieldCheck,
  Leaf,
  Recycle,
  Heart,
  Package,
  type LucideIcon,
} from 'lucide-react'

const ICONS: Record<string, LucideIcon> = {
  Building2,
  Globe,
  Lightbulb,
  ShieldCheck,
  Leaf,
  Recycle,
  Heart,
  Package,
}

export type PillarTheme = 'blue' | 'green'

export default function PillarCard({
  icon,
  title,
  description,
  theme = 'blue',
}: {
  icon?: string
  title?: string
  description?: string
  theme?: PillarTheme
}) {
  const Icon = (icon && ICONS[icon]) || Package
  const color =
    theme === 'green'
      ? {bg: 'bg-green-50', icon: 'text-green-600', ring: 'hover:border-green-200'}
      : {bg: 'bg-blue-50', icon: 'text-blue-600', ring: 'hover:border-blue-200'}

  return (
    <div
      className={`group rounded-xl border border-slate-200 bg-white p-6 transition
                  hover:-translate-y-1 hover:shadow-lg ${color.ring}
                  cursor-default text-center`}
    >
      <div
        className={`w-12 h-12 mx-auto mb-4 rounded-full ${color.bg} grid place-items-center`}
      >
        <Icon className={`w-6 h-6 ${color.icon}`} strokeWidth={1.75} />
      </div>
      <h3 className="font-semibold text-slate-900 mb-2 group-hover:text-blue-700 transition-colors">
        {title}
      </h3>
      <p className="text-sm text-slate-600 leading-relaxed">{description}</p>
    </div>
  )
}
