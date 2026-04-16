import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center bg-white">
      <div className="text-center px-6">
        <p className="text-blue-600 text-sm font-medium uppercase tracking-wider mb-3">404</p>
        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">Page Not Found</h1>
        <p className="text-slate-600 max-w-md mx-auto mb-8">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            href="/"
            className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-md font-medium text-sm transition"
          >
            Go Home
          </Link>
          <Link
            href="/products"
            className="border border-slate-300 hover:border-slate-400 text-slate-700 px-6 py-3 rounded-md font-medium text-sm transition"
          >
            Browse Products
          </Link>
          <Link
            href="/contact"
            className="border border-slate-300 hover:border-slate-400 text-slate-700 px-6 py-3 rounded-md font-medium text-sm transition"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  )
}
