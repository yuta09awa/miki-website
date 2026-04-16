import {PortableText, type PortableTextBlock} from 'next-sanity'

type Faq = {_id: string; question: string; answer: PortableTextBlock[]}

export default function FaqSection({faqs}: {faqs: Faq[]}) {
  if (!faqs?.length) return null
  return (
    <section className="bg-slate-50 py-24">
      <div className="mx-auto max-w-3xl px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-slate-900 mb-3">Frequently Asked Questions</h2>
          <p className="text-slate-600">
            Find answers to common questions about our chemical supply services
          </p>
        </div>
        <div className="space-y-3">
          {faqs.map((f) => (
            <details
              key={f._id}
              className="group bg-white border border-slate-200 rounded-lg px-5 py-4"
            >
              <summary className="flex items-center justify-between cursor-pointer list-none font-semibold text-slate-900">
                {f.question}
                <span className="text-slate-400 group-open:rotate-180 transition-transform">▾</span>
              </summary>
              <div className="mt-3 text-slate-600 text-sm leading-relaxed prose prose-sm max-w-none">
                <PortableText value={f.answer} />
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
