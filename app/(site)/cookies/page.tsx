import type {Metadata} from 'next'

export const metadata: Metadata = {
  title: 'Cookie Policy | Miki Sangyo USA',
  description: 'Cookie policy for the Miki Sangyo USA Inc. website.',
  alternates: {canonical: '/cookies'},
}

export default function CookiesPage() {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-3xl px-6 py-20">
        <h1 className="text-4xl font-bold text-slate-900 mb-8">Cookie Policy</h1>
        <div className="prose prose-slate max-w-none text-slate-700 space-y-6">
          <p className="text-sm text-slate-500">
            Last updated: {new Date().toLocaleDateString('en-US', {month: 'long', day: 'numeric', year: 'numeric'})}
          </p>

          <h2 className="text-2xl font-bold text-slate-900 mt-10">What Are Cookies</h2>
          <p>
            Cookies are small text files stored on your device when you visit a website. They help the website
            remember your preferences and improve your browsing experience.
          </p>

          <h2 className="text-2xl font-bold text-slate-900 mt-10">How We Use Cookies</h2>
          <p>The Miki Sangyo USA website uses cookies for the following purposes:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Essential cookies</strong> — Required for the website to function properly, such as session management.</li>
            <li><strong>Analytics cookies</strong> — Help us understand how visitors interact with our website so we can improve it.</li>
          </ul>

          <h2 className="text-2xl font-bold text-slate-900 mt-10">Third-Party Cookies</h2>
          <p>
            We may use third-party services (such as analytics providers) that set their own cookies. We do not
            control these cookies and recommend reviewing the privacy policies of those services.
          </p>

          <h2 className="text-2xl font-bold text-slate-900 mt-10">Managing Cookies</h2>
          <p>
            You can control and delete cookies through your browser settings. Please note that disabling cookies
            may affect the functionality of this website.
          </p>

          <h2 className="text-2xl font-bold text-slate-900 mt-10">Contact</h2>
          <p>
            For questions about our use of cookies, contact us at{' '}
            <a href="mailto:info@mikisangyo.com" className="text-blue-600 hover:underline">info@mikisangyo.com</a>.
          </p>
        </div>
      </div>
    </div>
  )
}
