import type {MetadataRoute} from 'next'
import {client} from '@/sanity/lib/client'

const BASE = 'https://www.mikisangyo.com'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {url: BASE, lastModified: new Date(), changeFrequency: 'weekly', priority: 1},
    {url: `${BASE}/products`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9},
    {url: `${BASE}/solutions`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9},
    {url: `${BASE}/about`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7},
    {url: `${BASE}/contact`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7},
    {url: `${BASE}/products/bmi`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8},
    {url: `${BASE}/privacy`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.2},
    {url: `${BASE}/terms`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.2},
    {url: `${BASE}/cookies`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.2},
  ]

  // Dynamic product pages
  const productSlugs = await client.fetch<string[]>(
    `*[_type == "product" && defined(slug.current)][].slug.current`,
  )
  const productPages: MetadataRoute.Sitemap = productSlugs.map((slug) => ({
    url: `${BASE}/products/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  // Dynamic solution pages
  const solutionSlugs = await client.fetch<string[]>(
    `*[_type == "solution" && defined(slug.current)][].slug.current`,
  )
  const solutionPages: MetadataRoute.Sitemap = solutionSlugs.map((slug) => ({
    url: `${BASE}/solutions/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  return [...staticPages, ...productPages, ...solutionPages]
}
