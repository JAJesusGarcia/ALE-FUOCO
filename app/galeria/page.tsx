import type { Metadata } from 'next'
import GalleryGrid from '@/components/gallery-page/gallery-grid'
import GalleryHero from '@/components/gallery-page/gallery-hero'

export const metadata: Metadata = {
  title: 'Archivo Visual | Ale Fuoco',
  description:
    'Galería de eventos, iluminación, sonido, pantallas LED, producción técnica y DJ profesional de Ale Fuoco.',
}

export default function GalleryPage() {
  return (
    <main className="relative overflow-x-clip">
      <GalleryHero />
      <GalleryGrid />
    </main>
  )
}
