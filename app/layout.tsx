import type { Metadata } from 'next'
import { Space_Grotesk } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-space-grotesk',
});

export const metadata: Metadata = {
  title: 'SmartAccounts - AI-Powered Tax Simulation & Training Platform',
  description: 'India\'s leading EdTech platform for GST, TDS & accounting training. Real-world tax simulations, AI-powered learning, and certification programs for institutes and professionals.',
  keywords: ['GST training', 'TDS training', 'accounting education', 'tax simulation', 'CA coaching', 'EdTech India'],
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`bg-background ${spaceGrotesk.variable}`}>
      <body className="antialiased min-h-screen" style={{ fontFamily: 'var(--font-space-grotesk), Space Grotesk, sans-serif' }}>
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
