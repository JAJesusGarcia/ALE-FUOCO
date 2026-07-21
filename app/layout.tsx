import type {
  Metadata,
  Viewport,
} from 'next'
import type { ReactNode } from 'react'

import {
  Cormorant_Garamond,
  Inter,
} from 'next/font/google'

import Footer from '@/components/footer'
import Navbar from '@/components/navbar'
import FloatingWhatsApp from '@/components/ui/floating-whatsapp'

import './globals.css'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: [
    '300',
    '400',
    '500',
    '600',
    '700',
  ],
  style: [
    'normal',
    'italic',
  ],
  variable: '--font-cormorant',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  weight: [
    '300',
    '400',
    '500',
    '600',
  ],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default:
      'Ale Fuoco | Iluminación, Sonido y Producción Técnica',
    template: '%s | Ale Fuoco',
  },
  description:
    'Diseño de iluminación, sonido profesional y producción técnica para eventos sociales, corporativos y experiencias en vivo.',
  applicationName: 'Ale Fuoco',
  authors: [
    {
      name: 'Ale Fuoco',
    },
  ],
  creator: 'Ale Fuoco',
  publisher: 'Ale Fuoco',
  category: 'Producción de eventos',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  colorScheme: 'dark',
  themeColor: '#151310',
}

interface RootLayoutProps {
  children: ReactNode
}

export default function RootLayout({
  children,
}: Readonly<RootLayoutProps>) {
  return (
    <html
      lang="es"
      className={`
        ${cormorant.variable}
        ${inter.variable}
      `}
    >
      <body
        className="
          min-h-screen
          overflow-x-clip
          bg-background
          font-body
          text-foreground
          antialiased
        "
      >
        <div className="relative min-h-screen">
          <Navbar />

          <div className="relative z-10">
            {children}
          </div>

          <Footer />

          <FloatingWhatsApp />
        </div>
      </body>
    </html>
  )
}