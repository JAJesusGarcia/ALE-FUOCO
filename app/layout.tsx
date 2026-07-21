import type { Metadata, Viewport } from 'next'
import { Cormorant_Garamond, Inter } from 'next/font/google'

// import AmbientStageEffects from '@/components/effects/ambient-stage-effects'
// import GlobalTechnicalHud from '@/components/effects/global-technical-hud'
import FloatingWhatsApp from '@/components/ui/floating-whatsapp'
import './globals.css'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'

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
    default:
      'Ale Fuoco | Iluminación, Sonido y Producción Técnica',
    template: '%s | Ale Fuoco',
  },
  description:
    'Diseño de iluminación, sonido profesional y producción técnica para eventos sociales, corporativos y experiencias en vivo.',
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
        <div className="relative min-h-screen">
          <Navbar />

          <main className="relative z-10">
            {children}
          </main>

          <Footer />

          {/* <AmbientStageEffects /> */}

          {/* <GlobalTechnicalHud /> */}

          <FloatingWhatsApp />
        </div>
      </body>
    </html>
  )
}