import Link from 'next/link'
import {client} from '@/sanity/lib/client'
import {siteSettingsQuery, navigationMenusQuery} from '@/sanity/lib/queries'
import type {NavMenu} from './Header'

type SiteSettings = {
  siteName?: string
  footer?: {blurb?: string; copyright?: string}
}

export default async function Footer() {
  const [settings, menus] = await Promise.all([
    client.fetch<SiteSettings | null>(siteSettingsQuery),
    client.fetch<NavMenu[]>(navigationMenusQuery),
  ])

  return (
    <footer className="bg-white border-t border-slate-200 mt-24">
      <div className="mx-auto max-w-7xl px-6 py-12">
        {/*
          Responsive mega-nav:
            - < sm  (mobile)   : stacked, single column — easy thumb-scroll
            - sm–md (landscape): 2-up, menus pair naturally
            - ≥ md  (tablet+)  : all 5 menus in one row
          Skipping a 3-col intermediate avoids the tall "Products" column pushing
          the last two menus onto a second row below it.
        */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-x-6 lg:gap-x-10 gap-y-10 items-stretch">
          {menus.map((m) => (
            <div key={m._id} className="flex flex-col h-full min-w-0">
              <h3 className="font-semibold text-slate-900 text-xs uppercase tracking-wider mb-4">{m.title}</h3>
              {m.flat ? (
                <ul className="space-y-1.5 flex-1">
                  {m.categories?.[0]?.items?.map((it) => (
                    <li key={it.link}>
                      <Link href={it.link} className="text-xs text-slate-500 hover:text-blue-600 leading-tight">
                        {it.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="space-y-5 flex-1">
                  {m.categories?.map((cat, i) => (
                    <div key={i}>
                      {cat.categoryName && (
                        <div className="text-xs font-semibold text-slate-800 mb-2 tracking-tight">
                          {cat.categoryName}
                        </div>
                      )}
                      <ul className="space-y-1.5 pl-4 border-l border-slate-100">
                        {cat.items?.map((it) => (
                          <li key={it.link}>
                            <Link
                              href={it.link}
                              className="text-xs text-slate-500 hover:text-blue-600 leading-tight"
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
        </div>

        {settings?.footer?.blurb && (
          <p className="mt-8 text-xs text-slate-500 max-w-xl leading-relaxed">
            {settings.footer.blurb}
          </p>
        )}
      </div>

      <div className="border-t border-slate-200">
        <div className="mx-auto max-w-7xl px-6 py-5 flex flex-col md:flex-row justify-between text-xs text-slate-500">
          <span>
            {settings?.footer?.copyright ? (
              settings.footer.copyright
            ) : (
              <>
                © {new Date().getFullYear()}{' '}
                <span className="font-official">
                  {settings?.siteName || 'Miki Sangyo USA Inc.'}
                </span>
                . All rights reserved.
              </>
            )}
          </span>
          <div className="flex gap-5 mt-2 md:mt-0">
            <Link href="/privacy" className="hover:text-blue-600">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-blue-600">Terms of Service</Link>
            <Link href="/cookies" className="hover:text-blue-600">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
