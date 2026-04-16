import type {Metadata} from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy | Miki Sangyo USA',
  description: 'Privacy policy for Miki Sangyo USA Inc. website.',
  alternates: {canonical: '/privacy'},
}

export default function PrivacyPage() {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-3xl px-6 py-20">
        <h1 className="text-4xl font-bold text-slate-900 mb-8">Privacy Policy</h1>
        <div className="prose prose-slate max-w-none text-slate-700 space-y-6">
          <p className="text-sm text-slate-500">
            Last updated: {new Date().toLocaleDateString('en-US', {month: 'long', day: 'numeric', year: 'numeric'})}
          </p>

          <h2 className="text-2xl font-bold text-slate-900 mt-10">1. Introduction</h2>
          <p>
            Miki Sangyo USA Inc. (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) respects your privacy and is committed
            to protecting the personal information you share with us. This Privacy Policy explains how we collect,
            use, and safeguard your information when you visit our website.
          </p>

          <h2 className="text-2xl font-bold text-slate-900 mt-10">2. Information We Collect</h2>
          <p>We may collect the following types of information:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Contact information</strong> — name, email address, phone number, and company name when you submit a form or request.</li>
            <li><strong>Usage data</strong> — pages visited, time on site, browser type, and referring URL collected automatically through standard web technologies.</li>
            <li><strong>Inquiry details</strong> — product interests, sample requests, and any additional information you provide in messages.</li>
          </ul>

          <h2 className="text-2xl font-bold text-slate-900 mt-10">3. How We Use Your Information</h2>
          <p>We use your information to:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Respond to your inquiries and requests</li>
            <li>Provide product information, samples, and technical documentation</li>
            <li>Improve our website and services</li>
            <li>Comply with legal obligations</li>
          </ul>

          <h2 className="text-2xl font-bold text-slate-900 mt-10">4. Information Sharing</h2>
          <p>
            We do not sell, trade, or rent your personal information to third parties. We may share your information
            with affiliated Miki Sangyo offices worldwide solely to fulfill your requests.
          </p>

          <h2 className="text-2xl font-bold text-slate-900 mt-10">5. Data Security</h2>
          <p>
            We implement reasonable security measures to protect your personal information. However, no method of
            transmission over the Internet is 100% secure, and we cannot guarantee absolute security.
          </p>

          <h2 className="text-2xl font-bold text-slate-900 mt-10">6. Your Rights</h2>
          <p>
            You may request access to, correction of, or deletion of your personal data by contacting us at{' '}
            <a href="mailto:info@mikisangyo.com" className="text-blue-600 hover:underline">info@mikisangyo.com</a>.
          </p>

          <h2 className="text-2xl font-bold text-slate-900 mt-10">7. Contact</h2>
          <p>
            For questions about this Privacy Policy, contact us at{' '}
            <a href="mailto:info@mikisangyo.com" className="text-blue-600 hover:underline">info@mikisangyo.com</a>.
          </p>
        </div>
      </div>
    </div>
  )
}
