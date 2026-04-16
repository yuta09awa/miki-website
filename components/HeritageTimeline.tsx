type Milestone = {year?: string; title?: string; description?: string}

export default function HeritageTimeline({
  title,
  intro,
  milestones,
}: {
  title?: string
  intro?: string
  milestones?: Milestone[]
}) {
  if (!milestones?.length) return null

  return (
    <section id="heritage" className="bg-white py-20 scroll-mt-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center max-w-3xl mx-auto mb-14">
          {title && (
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-5">{title}</h2>
          )}
          {intro && <p className="text-slate-600 leading-relaxed">{intro}</p>}
        </div>

        <div className="relative">
          <div
            aria-hidden
            className="hidden md:block absolute left-0 right-0 top-[34px] h-px bg-gradient-to-r from-transparent via-blue-200 to-transparent"
          />
          <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7 gap-8">
            {milestones.map((m, i) => (
              <li key={i} className="relative text-center">
                <div className="hidden md:flex justify-center mb-4">
                  <div className="w-4 h-4 rounded-full bg-blue-600 ring-4 ring-blue-100 relative z-10" />
                </div>
                <div className="text-2xl font-bold text-blue-600 mb-1">{m.year}</div>
                {m.title && (
                  <div className="font-semibold text-slate-900 text-sm mb-1">{m.title}</div>
                )}
                {m.description && (
                  <p className="text-xs text-slate-600 leading-relaxed">{m.description}</p>
                )}
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
