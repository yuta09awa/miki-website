// Generates seed.ndjson for singletons + FAQs + offices.
// Run: node scripts/seed-content.mjs
// Then: npx sanity dataset import seed.ndjson production --replace

import fs from 'node:fs'
import path from 'node:path'

const ROOT = path.resolve(
  path.dirname(new URL(import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1')),
  '..',
)
const OUT = path.join(ROOT, 'seed.ndjson')

const pt = (text, i = 0) => ({
  _type: 'block',
  _key: `b${i}`,
  style: 'normal',
  markDefs: [],
  children: [{_type: 'span', _key: `s${i}`, text, marks: []}],
})

const docs = []

// Site settings singleton
docs.push({
  _id: 'siteSettings',
  _type: 'siteSettings',
  siteName: 'Miki Sangyo USA Inc.',
  tagline: 'A leading global supplier of specialty chemicals and materials since 1961.',
  nav: [
    {label: 'Markets', href: '/markets'},
    {label: 'Chemicals', href: '/products?type=chemical'},
    {label: 'Optical Products', href: '/products?type=optical'},
    {label: 'About Us', href: '/about'},
    {label: 'Contact', href: '/contact'},
  ],
  stats: [
    {value: '25+', label: 'Years of Experience'},
    {value: '150+', label: 'Global Partners'},
    {value: '1000+', label: 'Products Available'},
    {value: '500+', label: 'Satisfied Clients'},
  ],
  footer: {
    blurb:
      'A leading global supplier of specialty chemicals and materials since 1961, providing innovative solutions for various industries.',
    columns: [
      {
        heading: 'Markets',
        links: [
          {label: 'Industrial Materials', href: '/markets/industrial'},
          {label: 'Automotive', href: '/markets/automotive'},
          {label: 'Electronics', href: '/markets/electronics'},
          {label: 'Specialty Products', href: '/markets/specialty'},
          {label: 'All Markets', href: '/markets'},
        ],
      },
      {
        heading: 'Chemicals',
        links: [
          {label: 'Epoxy & Bismaleimide Resins', href: '/products?category=epoxy'},
          {label: 'Polyimide', href: '/products?category=polyimide'},
          {label: 'Hardeners', href: '/products?category=hardeners'},
          {label: 'All Chemicals', href: '/products?type=chemical'},
        ],
      },
      {
        heading: 'Optical Products',
        links: [
          {label: 'Masking Tape', href: '/products?category=masking'},
          {label: 'Anti Slip Sheet', href: '/products?category=antislip'},
          {label: 'Coating Materials', href: '/products?category=coating'},
          {label: 'Evaporation Materials', href: '/products?category=evaporation'},
        ],
      },
    ],
    copyright: '© 2026 Miki Sangyo USA Inc. All rights reserved.',
  },
  contactEmail: 'info@mikisangyo.com',
  contactPhone: '+81 3-3279-1751',
})

// Home page singleton
docs.push({
  _id: 'homePage',
  _type: 'homePage',
  hero: {
    eyebrow: 'A Forest of Value',
    title: 'Miki Sangyo USA Inc.',
    subtitle:
      'With a heritage of over 350 years, connecting global manufacturers and customers through our expertise in specialty chemicals and materials across Japan, USA, China, India, Germany, and Thailand.',
    primaryCta: {label: 'Browse Products', href: '/products'},
    secondaryCta: {label: 'Contact Our Team', href: '/contact'},
    pillars: [
      {icon: 'building', title: 'Professionalism', description: 'Deep expertise across specialty chemicals.'},
      {icon: 'globe', title: 'Flexibility', description: 'Custom solutions for every requirement.'},
      {icon: 'shield', title: 'Creativity', description: 'Innovation rooted in a 350-year heritage.'},
      {icon: 'box', title: '350+ Years Heritage', description: 'Trusted partnerships since 1674.'},
    ],
  },
  seo: {
    title: 'Miki Sangyo USA — Specialty Chemicals & Optical Materials',
    metaDescription:
      'Miki Sangyo USA supplies specialty chemicals, polyimide monomers, and optical materials to electronics, aerospace, and industrial markets worldwide.',
  },
})

// FAQs
const faqs = [
  {
    q: 'What types of chemicals do you supply?',
    a: 'We supply a broad portfolio of specialty chemicals including polyimide monomers (dianhydrides and diamines), bismaleimides, benzoxazines, epoxy resins, acrylates, methacrylates, and curing agents. Our catalog covers over 100 products for electronics, aerospace, and industrial applications.',
    c: 'Products',
  },
  {
    q: 'Do you provide technical support for your products?',
    a: 'Yes. Our team of chemists and application engineers provides technical consultation, formulation guidance, and specification support for every product we supply. Contact us to discuss your specific application requirements.',
    c: 'Technical',
  },
  {
    q: 'What are your minimum order quantities?',
    a: 'MOQs vary by product. Research quantities are available for most items, while commercial orders typically start at 1 kg for specialty monomers. Contact our sales team for quotes on specific products.',
    c: 'Ordering',
  },
  {
    q: 'Do you ship internationally?',
    a: 'Yes. With offices in Japan, USA, China, India, Germany, and Thailand, we ship worldwide with full regulatory compliance including TSCA, REACH, and other regional requirements.',
    c: 'Shipping',
  },
  {
    q: 'How can I request a sample or quote?',
    a: 'Use the contact form below or email our technical sales team directly. Include the product name, quantity, and application details so we can respond quickly with pricing and lead time.',
    c: 'Ordering',
  },
  {
    q: 'What quality certifications do you maintain?',
    a: 'Our suppliers maintain ISO 9001 quality management systems. Certificates of Analysis (CoA) are provided with every shipment, and we can supply additional documentation including SDS, TDS, and regulatory compliance statements.',
    c: 'General',
  },
]
faqs.forEach((f, i) => {
  docs.push({
    _id: `faq-${i + 1}`,
    _type: 'faq',
    question: f.q,
    answer: [pt(f.a)],
    category: f.c,
    order: i,
  })
})

// Offices
const offices = [
  {
    id: 'office-japan',
    name: 'Miki Sangyo Co., Ltd.',
    country: 'Japan',
    city: 'Tokyo',
    address: '3-4-5 Nihonbashi-Honcho, Chuo-ku, Tokyo 103-0023, Japan',
    phone: '+81 3-3279-1751',
    isHeadquarters: true,
    established: 1674,
    coordinates: {lat: 35.687, lng: 139.775},
    order: 0,
  },
  {
    id: 'office-usa',
    name: 'Miki Sangyo USA Inc.',
    country: 'USA',
    city: 'Parsippany, NJ',
    address: '400 Interpace Pkwy, Parsippany, NJ 07054',
    phone: '(973) 263-4111',
    isHeadquarters: false,
    coordinates: {lat: 40.858, lng: -74.426},
    order: 1,
  },
  {
    id: 'office-china',
    name: 'Miki Sangyo Shanghai',
    country: 'China',
    city: 'Shanghai',
    address: 'Shanghai, China',
    isHeadquarters: false,
    coordinates: {lat: 31.23, lng: 121.474},
    order: 2,
  },
  {
    id: 'office-germany',
    name: 'Miki Sangyo Europe GmbH',
    country: 'Germany',
    city: 'Düsseldorf',
    address: 'Düsseldorf, Germany',
    isHeadquarters: false,
    coordinates: {lat: 51.228, lng: 6.776},
    order: 3,
  },
  {
    id: 'office-thailand',
    name: 'Miki Sangyo Thailand',
    country: 'Thailand',
    city: 'Bangkok',
    address: 'Bangkok, Thailand',
    isHeadquarters: false,
    coordinates: {lat: 13.756, lng: 100.501},
    order: 4,
  },
  {
    id: 'office-indonesia',
    name: 'Miki Sangyo Indonesia',
    country: 'Indonesia',
    city: 'Jakarta',
    address: 'Jakarta, Indonesia',
    isHeadquarters: false,
    coordinates: {lat: -6.208, lng: 106.846},
    order: 5,
  },
]
offices.forEach((o) => {
  docs.push({
    _id: o.id,
    _type: 'office',
    name: o.name,
    country: o.country,
    city: o.city,
    address: o.address,
    phone: o.phone,
    isHeadquarters: o.isHeadquarters,
    established: o.established,
    coordinates: o.coordinates,
    order: o.order,
  })
})

const out = fs.createWriteStream(OUT)
for (const d of docs) out.write(JSON.stringify(d) + '\n')
out.end()
await new Promise((r) => out.on('close', r))
console.log(`✓ Wrote ${docs.length} seed docs to ${path.relative(ROOT, OUT)}`)
console.log(`\nNext: npx sanity dataset import seed.ndjson production --replace`)
