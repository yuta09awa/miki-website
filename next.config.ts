import type {NextConfig} from 'next'
import path from 'node:path'

const nextConfig: NextConfig = {
  // Pin the project root. Without this, Next walks up and finds the parent
  // Sanity Studio at C:\Users\admin\Miki, breaking module resolution.
  turbopack: {
    root: path.resolve(__dirname),
  },
  images: {
    remotePatterns: [
      {protocol: 'https', hostname: 'cdn.sanity.io'},
      {protocol: 'https', hostname: 'mikisangyo.co.jp'},
    ],
  },
  async redirects() {
    return [
      // Markets section has no pages — redirect to relevant product filters
      {source: '/markets/pharmaceuticals', destination: '/products?category=Pharmaceutical+%26+Biotech', permanent: false},
      {source: '/markets/industrial',      destination: '/products?category=Specialty+Intermediates',   permanent: false},
      {source: '/markets/automotive',      destination: '/products?category=Specialty+Intermediates',   permanent: false},
      {source: '/markets/electronics',     destination: '/products?category=Electronic+Chemicals',       permanent: false},
      {source: '/markets/specialty',       destination: '/products',                                     permanent: false},
      {source: '/markets/:path*',          destination: '/products',                                     permanent: false},
      {source: '/markets',                 destination: '/products',                                     permanent: false},
      // Solution page seeded but never created in Sanity
      {source: '/solutions/custom-synthesis', destination: '/solutions',                                 permanent: false},
    ]
  },
}

export default nextConfig
