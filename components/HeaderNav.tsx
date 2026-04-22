'use client'

import Link from 'next/link'
import Image from 'next/image'
import {useState} from 'react'
import type {NavMenu} from './Header'

export default function HeaderNav({siteName, menus}: {siteName: string; menus: NavMenu[]}) {
  const [open, setOpen] = useState<string | null>(null)
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur border-b border-slate-200">
      <div className="mx-auto max-w-7xl px-6 h-16 flex items-center justify-between">
        <Link href="/" aria-label={siteName} className="flex items-center">
          <Image src="/miki-logo.png" alt={siteName} width={128} height={128} className="h-9 w-9" priority />
        </Link>

        {/* Desktop nav */}
        <nav
          className="hidden lg:flex items-center gap-1"
          onMouseLeave={() => setOpen(null)}
        >
          {menus.map((m) => (
            <div
              key={m._id}
              className="relative"
              onMouseEnter={() => setOpen(m._id)}
            >
              <button
                type="button"
                className="px-3 py-2 text-sm text-slate-700 hover:text-blue-600 transition-colors flex items-center gap-1"
                onClick={() => setOpen(open === m._id ? null : m._id)}
              >
                {m.title}
                <svg width="12" height="12" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M5.23 7.21a.75.75 0 011.06.02L10 11.06l3.71-3.83a.75.75 0 111.08 1.04l-4.25 4.39a.75.75 0 01-1.08 0L5.21 8.27a.75.75 0 01.02-1.06z" />
                </svg>
              </button>

              {open === m._id && (
                <div
                  className={
                    'absolute left-1/2 -translate-x-1/2 top-full pt-3 ' +
                    (m.flat ? 'w-64' : (m.categories?.length ?? 0) >= 3 ? 'w-[560px]' : (m.categories?.length ?? 0) === 2 ? 'w-[400px]' : 'w-[240px]')
                  }
                >
                  <div className="bg-white border border-slate-200 rounded-lg shadow-lg p-6">
                    {m.flat ? (
                      <ul className="space-y-2">
                        {m.categories?.[0]?.items?.map((it) => (
                          <li key={it.link}>
                            <Link
                              href={it.link}
                              onClick={() => setOpen(null)}
                              className="block text-sm text-slate-700 hover:text-blue-600"
                            >
                              {it.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <div className={`grid gap-8 ${(m.categories?.length ?? 0) >= 3 ? 'grid-cols-3' : (m.categories?.length ?? 0) === 2 ? 'grid-cols-2' : 'grid-cols-1'}`}>
                        {m.categories?.map((cat, i) => (
                          <div key={i}>
                            {cat.categoryName && (
                              <h4 className="font-semibold text-slate-900 text-sm mb-3 tracking-tight">
                                {cat.categoryName}
                              </h4>
                            )}
                            <ul className="space-y-2 pl-4 border-l border-slate-100">
                              {cat.items?.map((it) => (
                                <li key={it.link}>
                                  <Link
                                    href={it.link}
                                    onClick={() => setOpen(null)}
                                    className="block text-sm text-slate-600 hover:text-blue-600"
                                  >
                                    {it.label}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}

          <Link
            href="/#about"
            className="px-3 py-2 text-sm text-slate-700 hover:text-blue-600 transition-colors"
          >
            About
          </Link>
          <Link
            href="/contact"
            className="ml-2 bg-blue-600 hover:bg-blue-500 text-white text-sm px-4 py-2 rounded-md transition"
          >
            Contact
          </Link>
        </nav>

        {/* Mobile hamburger */}
        <button
          type="button"
          className="lg:hidden p-2 text-slate-700 hover:text-blue-600"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? (
            <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 6l12 12M6 18L18 6" />
            </svg>
          ) : (
            <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white max-h-[80vh] overflow-y-auto">
          <div className="mx-auto max-w-7xl px-6 py-4 space-y-4">
            {menus.map((m) => (
              <div key={m._id}>
                <button
                  type="button"
                  className="w-full flex items-center justify-between text-sm font-semibold text-slate-900 py-2"
                  onClick={() => setOpen(open === m._id ? null : m._id)}
                >
                  {m.title}
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className={`transition-transform ${open === m._id ? 'rotate-180' : ''}`}
                  >
                    <path d="M5.23 7.21a.75.75 0 011.06.02L10 11.06l3.71-3.83a.75.75 0 111.08 1.04l-4.25 4.39a.75.75 0 01-1.08 0L5.21 8.27a.75.75 0 01.02-1.06z" />
                  </svg>
                </button>
                {open === m._id && (
                  <div className="pl-6 pb-2 space-y-3">
                    {m.categories?.map((cat, i) => (
                      <div key={i}>
                        {cat.categoryName && (
                          <p className="text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                            {cat.categoryName}
                          </p>
                        )}
                        <ul className="space-y-1 pl-6 border-l border-slate-100 ml-1">
                          {cat.items?.map((it) => (
                            <li key={it.link}>
                              <Link
                                href={it.link}
                                onClick={() => { setOpen(null); setMobileOpen(false) }}
                                className="block text-sm text-slate-600 hover:text-blue-600 py-1"
                              >
                                {it.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div className="border-t border-slate-100 pt-3 space-y-2">
              <Link
                href="/#about"
                onClick={() => setMobileOpen(false)}
                className="block text-sm text-slate-700 hover:text-blue-600 py-1"
              >
                About
              </Link>
              <Link
                href="/contact"
                onClick={() => setMobileOpen(false)}
                className="inline-block bg-blue-600 hover:bg-blue-500 text-white text-sm px-4 py-2 rounded-md transition"
              >
                Contact
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
