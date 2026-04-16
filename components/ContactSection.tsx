'use client'

type Office = {
  _id: string
  name: string
  country?: string
  city?: string
  address?: string
  phone?: string
  email?: string
  isHeadquarters?: boolean
}

export default function ContactSection({offices}: {offices: Office[]}) {
  const jp = offices.find((o) => o.country === 'Japan')
  const usa = offices.find((o) => o.country === 'USA')
  return (
    <section id="contact" className="py-16 bg-white">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center mb-10">
          <h2 className="text-4xl font-bold text-slate-900 mb-3">Partner with Miki Sangyo</h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Whether you need laboratory chemicals, industrial reagents, or custom formulations, our
            experts are here to help you find the right products for your needs.
          </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <form
            className="bg-white border border-slate-200 rounded-lg p-8 space-y-5"
            onSubmit={(e) => {
              e.preventDefault()
              const f = e.currentTarget as HTMLFormElement
              const data = new FormData(f)
              const name = String(data.get('name') || '')
              const email = String(data.get('email') || '')
              const subject = String(data.get('subject') || 'Website inquiry')
              const message = String(data.get('message') || '')
              const body = `From: ${name} <${email}>\n\n${message}`
              window.location.href = `mailto:info@mikisangyo.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
            }}
          >
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Name</label>
                <input
                  name="name"
                  required
                  className="w-full border border-slate-300 rounded px-3 py-2 text-sm"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  required
                  className="w-full border border-slate-300 rounded px-3 py-2 text-sm"
                  placeholder="your@email.com"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Subject</label>
              <input
                name="subject"
                className="w-full border border-slate-300 rounded px-3 py-2 text-sm"
                placeholder="How can we help?"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Message</label>
              <textarea
                name="message"
                required
                rows={5}
                className="w-full border border-slate-300 rounded px-3 py-2 text-sm"
                placeholder="Your message"
              />
            </div>
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-500 text-white px-5 py-2.5 rounded font-medium text-sm"
            >
              Send Message
            </button>
          </form>
          <div className="space-y-6">
            <div className="border border-slate-200 rounded-lg p-6">
              <h3 className="font-semibold text-slate-900 mb-2">🏢 Company Information</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Miki Sangyo — A leading global supplier of specialty chemicals and products since
                1674, with offices in Japan, USA, Germany, Thailand, India, and China.
              </p>
            </div>
            {jp && (
              <div className="border border-slate-200 rounded-lg p-6">
                <h3 className="font-semibold text-slate-900 mb-2">📍 Japan Headquarters</h3>
                <p className="text-slate-600 text-sm">{jp.address}</p>
                {jp.phone && <p className="text-slate-600 text-sm mt-1">📞 {jp.phone}</p>}
              </div>
            )}
            {usa && (
              <div className="border border-slate-200 rounded-lg p-6">
                <h3 className="font-semibold text-slate-900 mb-2">📍 USA Headquarters</h3>
                <p className="text-slate-600 text-sm">{usa.address}</p>
                {usa.phone && <p className="text-slate-600 text-sm mt-1">📞 {usa.phone}</p>}
              </div>
            )}
            <div className="border border-slate-200 rounded-lg p-6">
              <h3 className="font-semibold text-slate-900 mb-2">🌐 Global Network</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                With offices in Japan, USA, India, Thailand, Germany, and China, our global network
                ensures we can provide consistent quality and service worldwide.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
