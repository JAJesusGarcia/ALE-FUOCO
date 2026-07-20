import type { Metadata, Viewport } from 'next'
import { Cormorant_Garamond, Inter } from 'next/font/google'
import './globals.css'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'Ale Fuoco | Producción de Eventos',
    template: '%s | Ale Fuoco',
  },
  description:
    'Producción integral de eventos sociales, corporativos y privados. Experiencias únicas, cuidadas y memorables de la mano de Ale Fuoco.',
  keywords: [
    'Ale Fuoco',
    'producción de eventos',
    'productor de eventos',
    'eventos sociales',
    'eventos corporativos',
    'eventos privados',
    'organización de eventos',
    'Argentina',
  ],
  authors: [
    {
      name: 'Ale Fuoco Eventos',
    },
  ],
  creator: 'Ale Fuoco Eventos',
  publisher: 'Ale Fuoco Eventos',
  category: 'Eventos',
  applicationName: 'Ale Fuoco Eventos',
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: 'website',
    locale: 'es_AR',
    siteName: 'Ale Fuoco Eventos',
    title: 'Ale Fuoco | Producción de Eventos',
    description:
      'Producción integral de eventos sociales, corporativos y privados. Experiencias únicas y memorables.',
    images: [
      {
        url: '/images/hero.png',
        width: 1200,
        height: 630,
        alt: 'Ale Fuoco produciendo una experiencia de eventos',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ale Fuoco | Producción de Eventos',
    description:
      'Producción integral de eventos sociales, corporativos y privados.',
    images: ['/images/hero.png'],
  },
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  colorScheme: 'dark',
  themeColor: '#151310',
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="es"
      className={`${cormorant.variable} ${inter.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-screen bg-background font-body text-foreground antialiased">
        {children}
      </body>
    </html>
  )
}