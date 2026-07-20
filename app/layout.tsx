import type { Metadata, Viewport } from 'next'
import { Cormorant_Garamond, Inter } from 'next/font/google'
import './globals.css'

const _cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-display',
})

const _inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-body',
})

export const metadata: Metadata = {
  title: 'Ale Fuoco — Producción de Eventos',
  description:
    'Producción de eventos sociales, corporativos y privados. Experiencias únicas y memorables de la mano de Ale Fuoco.',
  keywords: ['producción de eventos', 'eventos sociales', 'eventos corporativos', 'eventos privados', 'Argentina'],
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#f9f6f0',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" className="bg-background">
      <body className={`${_cormorant.variable} ${_inter.variable} antialiased`}>{children}</body>
    </html>
  )
}
