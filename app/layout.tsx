import type { Metadata, Viewport } from 'next'
import { Cormorant_Garamond, Inter } from 'next/font/google'
import AmbientStageEffects from '@/components/effects/ambient-stage-effects'
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
    default: 'Ale Fuoco | Iluminación, Sonido y Producción Técnica',
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
          {children}

          <AmbientStageEffects />
        </div>
      </body>
    </html>
  )
}


// import type { Metadata, Viewport } from 'next'
// import { Cormorant_Garamond, Inter } from 'next/font/google'
// import AmbientStageEffects from '@/components/effects/ambient-stage-effects'
// import './globals.css'

// const cormorant = Cormorant_Garamond({
//   subsets: ['latin'],
//   weight: ['300', '400', '500', '600', '700'],
//   style: ['normal', 'italic'],
//   variable: '--font-cormorant',
//   display: 'swap',
// })

// const inter = Inter({
//   subsets: ['latin'],
//   weight: ['300', '400', '500', '600'],
//   variable: '--font-inter',
//   display: 'swap',
// })

// export const metadata: Metadata = {
//   title: {
//     default: 'Ale Fuoco | Iluminación, Sonido y Producción Técnica',
//     template: '%s | Ale Fuoco',
//   },

//   description:
//     'Diseño de iluminación, sonido profesional y producción técnica para eventos sociales, corporativos y experiencias en vivo.',

//   keywords: [
//     'Ale Fuoco',
//     'diseño de iluminación',
//     'iluminación para eventos',
//     'sonido profesional',
//     'producción técnica',
//     'operación de iluminación',
//     'operación de sonido',
//     'eventos sociales',
//     'eventos corporativos',
//     'Argentina',
//   ],

//   authors: [
//     {
//       name: 'Ale Fuoco',
//     },
//   ],

//   creator: 'Ale Fuoco',
//   publisher: 'Ale Fuoco',

//   category: 'Iluminación y sonido',
//   applicationName: 'Ale Fuoco',

//   robots: {
//     index: true,
//     follow: true,
//   },

//   openGraph: {
//     type: 'website',
//     locale: 'es_AR',
//     siteName: 'Ale Fuoco',
//     title: 'Ale Fuoco | Iluminación, Sonido y Producción Técnica',
//     description:
//       'Diseño de iluminación, sonido profesional y operación técnica para eventos y experiencias en vivo.',
//     images: [
//       {
//         url: '/images/hero.png',
//         width: 1200,
//         height: 630,
//         alt: 'Diseño de iluminación y producción técnica de Ale Fuoco',
//       },
//     ],
//   },

//   twitter: {
//     card: 'summary_large_image',
//     title: 'Ale Fuoco | Iluminación, Sonido y Producción Técnica',
//     description:
//       'Diseño de iluminación, sonido profesional y producción técnica para eventos.',
//     images: ['/images/hero.png'],
//   },

//   icons: {
//     icon: [
//       {
//         url: '/icon-light-32x32.png',
//         media: '(prefers-color-scheme: dark)',
//       },
//       {
//         url: '/icon-dark-32x32.png',
//         media: '(prefers-color-scheme: light)',
//       },
//       {
//         url: '/icon.svg',
//         type: 'image/svg+xml',
//       },
//     ],
//     apple: '/apple-icon.png',
//   },
// }

// export const viewport: Viewport = {
//   colorScheme: 'dark',
//   themeColor: '#151310',
//   width: 'device-width',
//   initialScale: 1,
//   viewportFit: 'cover',
// }

// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode
// }>) {
//   return (
//     <html
//       lang="es"
//       className={`${cormorant.variable} ${inter.variable}`}
//       suppressHydrationWarning
//     >
//       <body className="min-h-screen bg-background font-body text-foreground antialiased">
//         <AmbientStageEffects />

//         <div className="relative z-10 min-h-screen">
//           {children}
//         </div>
//       </body>
//     </html>
//   )
// }