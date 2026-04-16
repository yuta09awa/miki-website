import {client} from '@/sanity/lib/client'
import {siteSettingsQuery, navigationMenusQuery} from '@/sanity/lib/queries'
import HeaderNav from './HeaderNav'

type SiteSettings = {siteName?: string}
export type MenuItem = {label: string; link: string}
export type MenuCategory = {categoryName?: string; items?: MenuItem[]}
export type NavMenu = {
  _id: string
  title: string
  slug: string
  flat?: boolean
  categories?: MenuCategory[]
}

export default async function Header() {
  const [settings, menus] = await Promise.all([
    client.fetch<SiteSettings | null>(siteSettingsQuery),
    client.fetch<NavMenu[]>(navigationMenusQuery),
  ])

  return <HeaderNav siteName={settings?.siteName ?? 'Miki Sangyo'} menus={menus ?? []} />
}
