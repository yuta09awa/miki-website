import type {Metadata} from 'next'

export const metadata: Metadata = {
  title: 'Terms of Service | Miki Sangyo USA',
  description: 'Terms of service for the Miki Sangyo USA Inc. website.',
  alternates: {canonical: '/terms'},
}

export default function TermsPage() {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-3xl px-6 py-20">
        <h1 className="text-4xl font-bold text-slate-900 mb-8">Terms of Service</h1>
        <div className="prose prose-slate max-w-none text-slate-700 space-y-6">
          <p className="text-sm text-slate-500">
            Last updated: {new Date().toLocaleDateString('en-US', {month: 'long', day: 'numeric', year: 'numeric'})}
          </p>

          <h2 className="text-2xl font-bold text-slate-900 mt-10">1. Acceptance of Terms</h2>
          <p>
            By accessing and using the Miki Sangyo USA Inc. website, you accept and agree to be bound by these
            Terms of Service. If you do not agree, please do not use this website.
          </p>

          <h2 className="text-2xl font-bold text-slate-900 mt-10">2. Use of Website</h2>
          <p>
            This website is provided for informational purposes about our products and services. Product
            specifications, availability, and pricing are subject to change without notice and should be confirmed
            directly with our sales team.
          </p>

          <h2 className="text-2xl font-bold text-slate-900 mt-10">3. Intellectual Property</h2>
          <p>
            All content on this website, including text, graphics, logos, and product data, is the property of
            Miki Sangyo USA Inc. or its licensors and is protected by applicable intellectual property laws.
          </p>

          <h2 className="text-2xl font-bold text-slate-900 mt-10">4. Product Information Disclaimer</h2>
          <p>
            Product information provided on this website is for reference purposes only. While we strive for
            accuracy, we do not warrant that product descriptions, specifications, or other content is error-free.
            Always refer to the official Technical Data Sheet (TDS) and Safety Data Sheet (SDS) for authoritative
            product data.
          </p>

          <h2 className="text-2xl font-bold text-slate-900 mt-10">5. Limitation of Liability</h2>
          <p>
            Miki Sangyo USA Inc. shall not be liable for any direct, indirect, incidental, or consequential damages
            arising from the use of or inability to use this website or the information contained herein.
          </p>

          <h2 className="text-2xl font-bold text-slate-900 mt-10">6. Governing Law</h2>
          <p>
            These terms shall be governed by and construed in accordance with the laws of the United States,
            without regard to its conflict of law provisions.
          </p>

          <h2 className="text-2xl font-bold text-slate-900 mt-10">7. Contact</h2>
          <p>
            For questions about these Terms of Service, contact us at{' '}
            <a href="mailto:info@mikisangyo.com" className="text-blue-600 hover:underline">info@mikisangyo.com</a>.
          </p>
        </div>
      </div>
    </div>
  )
}
