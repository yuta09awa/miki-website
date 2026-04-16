import type {Metadata} from 'next'
import {Geist, Geist_Mono} from 'next/font/google'
import './globals.css'

const geistSans = Geist({variable: '--font-geist-sans', subsets: ['latin']})
const geistMono = Geist_Mono({variable: '--font-geist-mono', subsets: ['latin']})

export const metadata: Metadata = {
  metadataBase: new URL('https://www.mikisangyo.com'),
  title: 'Miki Sangyo USA Inc. - A Forest of Value | 350+ Years of Excellence',
  description:
    'Beyond 350 years of heritage since 1674, Miki Sangyo connects global manufacturers and customers through expertise in specialty chemicals and products across Japan, USA, Germany, Thailand, India, and China.',
  keywords: [
    'chemical supply',
    'industrial chemicals',
    'Miki Sangyo',
    'specialty chemicals',
    'pharmaceuticals',
    'laboratory chemicals',
    'industrial reagents',
  ],
  authors: [{name: 'Miki Sangyo USA Inc.'}],
  alternates: {canonical: 'https://www.mikisangyo.com/'},
  openGraph: {
    type: 'website',
    url: 'https://www.mikisangyo.com/',
    title: 'Miki Sangyo USA Inc. - Global Chemical Supply Excellence',
    description:
      'A leading global supplier of specialty chemicals and products since 1674, providing innovative solutions for various industries with locations in Japan, USA, Germany, Thailand, India, and China.',
    images: ['/og-image.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Miki Sangyo USA Inc. - Global Chemical Supply Excellence',
    description:
      'A leading global supplier of specialty chemicals and products since 1674, providing innovative solutions for various industries with locations in Japan, USA, Germany, Thailand, India, and China.',
    images: ['/og-image.png'],
  },
}

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <head>
        <link rel="dns-prefetch" href="https://cdn.sanity.io" />
        <link rel="preconnect" href="https://cdn.sanity.io" crossOrigin="anonymous" />
      </head>
      <body className="min-h-full flex flex-col bg-white text-slate-900">
        {children}
      </body>
    </html>
  )
}
