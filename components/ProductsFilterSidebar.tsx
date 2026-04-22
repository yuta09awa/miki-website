'use client'

import {useState} from 'react'
import Link from 'next/link'

type Props = {
  sortedCategories: [string, number][]
  sortedTypes: [string, number][]
  topTags: [string, number][]
  q?: string
  tag?: string
  category?: string
}

const slugify = (s: string) =>
  s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')

const TYPE_LABEL: Record<string, string> = {
  chemical: 'Chemical / Monomer',
  optical: 'Optical Material',
  filter: 'Filter Media',
  coating: 'Coating',
  battery: 'Battery Material',
}

export default function ProductsFilterSidebar({
  sortedCategories,
  sortedTypes,
  topTags,
  q,
  tag,
  category,
}: Props) {
  const activeCategory = (c: string) =>
    !!category && slugify(category) === slugify(c)
  const [open, setOpen] = useState(false)

  const activeCount = [tag, category, q].filter(Boolean).length

  return (
    <aside>
      {/* Mobile toggle */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="lg:hidden w-full flex items-center justify-between border border-slate-300 rounded-lg px-4 py-2.5 text-sm font-medium text-slate-700 bg-white hover:bg-slate-50 mb-4"
      >
        <span className="flex items-center gap-2">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707L13 13.414V19a1 1 0 01-.553.894l-4 2A1 1 0 017 21v-7.586L3.293 6.707A1 1 0 013 6V4z" />
          </svg>
          Filters
          {activeCount > 0 && (
            <span className="bg-blue-600 text-white text-xs rounded-full px-1.5 py-0.5 leading-none">
              {activeCount}
            </span>
          )}
        </span>
        <svg
          className={`w-4 h-4 text-slate-500 transition-transform ${open ? 'rotate-180' : ''}`}
          fill="none" stroke="currentColor" viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Filter content — always visible on desktop, toggle on mobile */}
      <div className={`space-y-8 ${open ? 'block' : 'hidden'} lg:block`}>
        <form action="/products" method="get">
          <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wide mb-2">
            Search
          </label>
          <input
            type="search"
            name="q"
            defaultValue={q ?? ''}
            placeholder="Name, code, CAS…"
            className="w-full border border-slate-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
          />
        </form>

        {sortedTypes.length > 1 && (
          <div>
            <h3 className="text-xs font-semibold text-slate-700 uppercase tracking-wide mb-3">
              Product Type
            </h3>
            <ul className="space-y-1.5 text-sm">
              {sortedTypes.map(([t, n]) => (
                <li key={t}>
                  <Link
                    href={`/products?category=${encodeURIComponent(t)}`}
                    className="flex justify-between text-slate-600 hover:text-blue-600"
                  >
                    <span>{TYPE_LABEL[t] ?? t}</span>
                    <span className="text-slate-400">{n}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}

        {sortedCategories.length > 0 && (
          <div>
            <h3 className="text-xs font-semibold text-slate-700 uppercase tracking-wide mb-3">
              Categories
            </h3>
            <ul className="space-y-1.5 text-sm max-h-80 overflow-y-auto pr-2">
              {sortedCategories.map(([c, n]) => {
                const active = activeCategory(c)
                return (
                  <li key={c}>
                    <Link
                      href={active ? '/products' : `/products?category=${encodeURIComponent(c)}`}
                      className={`flex justify-between rounded px-2 py-1 -mx-2 ${
                        active
                          ? 'bg-blue-50 text-blue-700 font-medium'
                          : 'text-slate-600 hover:text-blue-600 hover:bg-slate-50'
                      }`}
                    >
                      <span className="truncate">{c}</span>
                      <span className="text-slate-400">{n}</span>
                    </Link>
                  </li>
                )
              })}
            </ul>
          </div>
        )}

        {topTags.length > 0 && (
          <div>
            <h3 className="text-xs font-semibold text-slate-700 uppercase tracking-wide mb-3">
              Applications
            </h3>
            <div className="flex flex-wrap gap-1.5">
              {topTags.map(([t, n]) => {
                const active = tag === t
                return (
                  <Link
                    key={t}
                    href={active ? '/products' : `/products?tag=${encodeURIComponent(t)}`}
                    className={`text-xs px-2 py-1 rounded-full transition ${
                      active
                        ? 'bg-blue-600 text-white'
                        : 'bg-blue-50 text-blue-700 hover:bg-blue-100'
                    }`}
                  >
                    {t} <span className="opacity-60">{n}</span>
                  </Link>
                )
              })}
            </div>
          </div>
        )}
      </div>
    </aside>
  )
}
