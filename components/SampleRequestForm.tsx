'use client'

import {useState} from 'react'

const DOC_OPTIONS = [
  {id: 'sample', label: 'Product Sample'},
  {id: 'tds', label: 'Technical Data Sheet (TDS)'},
  {id: 'sds', label: 'Safety Data Sheet (SDS)'},
  {id: 'quote', label: 'Pricing & Lead Time'},
]

export default function SampleRequestForm({
  productName,
  productCode,
}: {
  productName: string
  productCode?: string
}) {
  const [submitted, setSubmitted] = useState(false)
  const [requests, setRequests] = useState<string[]>(['sample', 'tds', 'sds'])

  const toggle = (id: string) =>
    setRequests((r) => (r.includes(id) ? r.filter((x) => x !== id) : [...r, id]))

  if (submitted) {
    return (
      <div className="rounded-xl border border-green-200 bg-green-50 p-6 text-center">
        <h3 className="font-semibold text-green-900 mb-1">Request received</h3>
        <p className="text-sm text-green-800">
          Thank you. Our team will follow up within one business day with the materials you
          requested for <span className="font-medium">{productName}</span>.
        </p>
      </div>
    )
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        // TODO: wire to real endpoint (Sanity, Resend, HubSpot, etc.)
        setSubmitted(true)
      }}
      className="rounded-xl border border-slate-200 bg-white p-6 space-y-5"
    >
      <div>
        <h3 className="text-xl font-bold text-slate-900 mb-1">Request Sample &amp; Documents</h3>
        <p className="text-sm text-slate-600">
          For <span className="font-medium text-slate-900">{productName}</span>
          {productCode && <span className="text-slate-500"> · {productCode}</span>}
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-medium text-slate-700 mb-1">Full Name *</label>
          <input
            required
            className="w-full border border-slate-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-slate-700 mb-1">Company *</label>
          <input
            required
            className="w-full border border-slate-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-slate-700 mb-1">Work Email *</label>
          <input
            required
            type="email"
            className="w-full border border-slate-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-slate-700 mb-1">Phone</label>
          <input
            type="tel"
            className="w-full border border-slate-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="col-span-2">
          <label className="block text-xs font-medium text-slate-700 mb-1">
            Estimated Annual Volume
          </label>
          <input
            placeholder="e.g. 500 kg / year"
            className="w-full border border-slate-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
          />
        </div>
      </div>

      <fieldset>
        <legend className="block text-xs font-medium text-slate-700 mb-2">
          What would you like to receive? *
        </legend>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {DOC_OPTIONS.map((opt) => (
            <label
              key={opt.id}
              className="flex items-center gap-2 text-sm text-slate-700 border border-slate-200 rounded-md px-3 py-2 cursor-pointer hover:border-blue-300 hover:bg-blue-50/40 transition"
            >
              <input
                type="checkbox"
                checked={requests.includes(opt.id)}
                onChange={() => toggle(opt.id)}
                className="accent-blue-600"
              />
              {opt.label}
            </label>
          ))}
        </div>
      </fieldset>

      <div>
        <label className="block text-xs font-medium text-slate-700 mb-1">
          Application / Notes
        </label>
        <textarea
          rows={3}
          placeholder="Briefly describe your application, target spec, or any questions."
          className="w-full border border-slate-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
        />
      </div>

      <button
        type="submit"
        disabled={requests.length === 0}
        className="w-full bg-blue-600 hover:bg-blue-500 disabled:bg-slate-300 text-white px-5 py-3 rounded font-medium text-sm transition"
      >
        Submit Request
      </button>
      <p className="text-xs text-slate-500 text-center">
        We respond to inquiries within one business day.
      </p>
    </form>
  )
}
