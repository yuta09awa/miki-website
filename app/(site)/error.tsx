'use client'

import Link from 'next/link'

export default function Error({
  error,
  reset,
}: {
  error: Error & {digest?: string}
  reset: () => void
}) {
  return (
    <div className="min-h-[60vh] flex items-center justify-center bg-white">
      <div className="text-center px-6">
        <p className="text-red-600 text-sm font-medium uppercase tracking-wider mb-3">Error</p>
        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
          Something went wrong
        </h1>
        <p className="text-slate-600 max-w-md mx-auto mb-8">
          We&apos;re sorry — an unexpected error occurred. Please try again or contact us if the
          problem persists.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <button
            onClick={reset}
            className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-md font-medium text-sm transition"
          >
            Try Again
          </button>
          <Link
            href="/"
            className="border border-slate-300 hover:border-slate-400 text-slate-700 px-6 py-3 rounded-md font-medium text-sm transition"
          >
            Go Home
          </Link>
        </div>
      </div>
    </div>
  )
}
