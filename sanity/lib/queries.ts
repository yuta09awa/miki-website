import {groq} from 'next-sanity'

export const siteSettingsQuery = groq`*[_id == "siteSettings"][0]{
  siteName, tagline, logo, nav, stats, footer, social, contactEmail, contactPhone
}`

export const homePageQuery = groq`*[_id == "homePage"][0]{
  hero,
  "featuredProducts": coalesce(
    featuredProducts[]->{_id, productName, productCode, "slug": slug.current, casNumber, iupacName, category, descriptionShort, applicationTags, images, productType},
    *[_type == "product" && featured == true] | order(productCode asc){_id, productName, productCode, "slug": slug.current, casNumber, iupacName, category, descriptionShort, applicationTags, images, productType}
  ),
  featuredMarkets[]->{_id, name, "slug": slug.current, icon, image, descriptionShort},
  featuredServices[]->{_id, title, icon, summary},
  faqs[]->{_id, question, answer, category},
  seo
}`

export const officesQuery = groq`*[_type == "office"] | order(order asc){
  _id, name, country, city, address, phone, email, isHeadquarters, established, coordinates
}`

export const faqsQuery = groq`*[_type == "faq"] | order(order asc){_id, question, answer, category}`

export const navigationMenusQuery = groq`*[_type == "navigationMenu"] | order(order asc){
  _id, title, "slug": slug.current, flat,
  categories[]{categoryName, items[]{label, link}}
}`

export const productBySlugQuery = groq`*[_type == "product" && slug.current == $slug][0]{
  _id, productType, productName, productCode, "slug": slug.current,
  category, iupacName, casNumber, tscaStatus, htsCode,
  descriptionShort, descriptionLong,
  featureBullets, performanceTable, applicationTags, images,
  datasheet{asset->{_ref, url}},
  chemicalSpecs, opticalSpecs, seo, featured,
  relatedProducts[]{
    relationType,
    note,
    "product": product->{
      _id, productName, productCode, "slug": slug.current,
      casNumber, category, descriptionShort, images, productType
    }
  }
}`

export const productSlugsQuery = groq`*[_type == "product" && defined(slug.current)][].slug.current`

export const productsListQuery = groq`*[_type == "product" && defined(slug.current)] | order(productName asc){
  _id, productName, productCode, "slug": slug.current, category, casNumber,
  descriptionShort, applicationTags, featureBullets, images, productType
}`

// Used by /products/bmi comparison landing page — every BMI grade + DABPA.
export const bmiFamilyQuery = groq`*[_type == "product" && (
  category match "Bismaleimide*" || slug.current match "bmi-*" || slug.current == "dabpa"
)] | order(productCode asc){
  _id, productName, productCode, "slug": slug.current, category,
  casNumber, iupacName, descriptionShort, chemicalSpecs, applicationTags
}`

export const solutionsListQuery = groq`*[_type == "solution"] | order(category asc, order asc){
  _id, title, "slug": slug.current, category, isPillar, eyebrow, tagline, heroImage, industries
}`

export const solutionBySlugQuery = groq`*[_type == "solution" && slug.current == $slug][0]{
  _id, title, "slug": slug.current, category, isPillar, eyebrow, tagline, heroImage,
  problem, approach, productFamilies, specTable, industries,
  "related": *[_type == "solution" && category == ^.category && slug.current != ^.slug.current] | order(order asc){
    title, "slug": slug.current, tagline, heroImage
  },
  seo
}`

export const solutionsByCategoryQuery = groq`*[_type == "solution" && category == $category] | order(isPillar desc, order asc){
  _id, title, "slug": slug.current, isPillar, tagline, heroImage
}`

export const aboutPageQuery = groq`*[_id == "aboutPage"][0]{
  heroEyebrow, heroTitle, heroSubtitle,
  philosophy{title, intro, pillars[]{icon, title, description}},
  heritage{title, intro, milestones[]{year, title, description}},
  sustainability{title, intro, pillars[]{icon, title, description}}
}`
