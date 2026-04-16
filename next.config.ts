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
}

export default nextConfig
