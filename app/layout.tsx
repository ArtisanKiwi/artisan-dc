import type { Metadata } from 'next'
import { DM_Sans } from 'next/font/google'
import './globals.css'

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-dm-sans',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Artisan DC — Customer Acquisition Platform for Consumer Brands',
  description:
    'ADC helps challenger consumer brands acquire customers, validate products and scale across Australia and New Zealand through shows, markets, events and mall activations.',
  keywords: [
    'customer acquisition',
    'consumer brands',
    'direct commerce',
    'experiential retail',
    'Australia New Zealand',
    'brand growth',
    'FMCG',
  ],
  openGraph: {
    title: 'Artisan DC — Customer Acquisition Platform for Consumer Brands',
    description:
      'Real customers. Real data. Real growth. ADC is the demand-first platform helping challenger brands scale across ANZ.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={dmSans.variable}>
      <body className="font-sans bg-navy text-cream antialiased">
        {children}
      </body>
    </html>
  )
}
