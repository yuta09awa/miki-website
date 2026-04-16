import type {Metadata} from 'next'
import {client} from '@/sanity/lib/client'
import {officesQuery} from '@/sanity/lib/queries'
import ContactSection from '@/components/ContactSection'

export const revalidate = 60

export const metadata: Metadata = {
  title: 'Contact Us | Miki Sangyo USA',
  description:
    'Get in touch with Miki Sangyo USA for specialty chemical inquiries, product samples, technical data sheets, and custom formulations. Offices in Japan, USA, Germany, Thailand, India, and China.',
  alternates: {canonical: '/contact'},
}

export default async function ContactPage() {
  const offices = await client.fetch(officesQuery)

  return (
    <div className="bg-white">
      <section className="bg-slate-900 text-white py-20">
        <div className="mx-auto max-w-7xl px-6 text-center">
          <p className="text-blue-300 text-sm font-medium uppercase tracking-wider mb-3">
            Get in Touch
          </p>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Contact Us</h1>
          <p className="text-slate-300 max-w-2xl mx-auto text-lg">
            Whether you need product samples, technical data sheets, or pricing — our team is
            ready to help you find the right solution.
          </p>
        </div>
      </section>
      <ContactSection offices={offices ?? []} />
    </div>
  )
}
