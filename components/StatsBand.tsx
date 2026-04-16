type Stat = {value?: string; label?: string}

export default function StatsBand({stats}: {stats?: Stat[]}) {
  if (!stats?.length) return null
  return (
    <section className="bg-blue-600 text-white py-16">
      <div
        className="mx-auto max-w-7xl px-6 grid grid-cols-2 lg:grid-cols-4 gap-8 text-center"
      >
        {stats.map((s, i) => (
          <div key={i}>
            <div className="text-5xl font-bold mb-2">{s.value}</div>
            <div className="text-blue-100 text-sm">{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  )
}
