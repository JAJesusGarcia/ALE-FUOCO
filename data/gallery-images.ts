export interface GalleryArchiveImage {
  id: string
  src: string
  alt: string
  title: string
  category: string
  location?: string
  year?: string
  layout: string
  position?: string
}

export const galleryArchiveImages: GalleryArchiveImage[] = [
  {
    id: 'gallery-01',
    src: '/images/gallery-1.webp',
    alt: 'Diseño de iluminación profesional durante un evento',
    title: 'Escenarios con identidad propia',
    category: 'Iluminación profesional',
    location: 'Rosario',
    year: '2026',
    layout: 'md:col-span-2 md:row-span-2',
    position: 'object-center',
  },
  {
    id: 'gallery-02',
    src: '/images/gallery-2.webp',
    alt: 'Sistema de sonido profesional instalado en un evento',
    title: 'Cobertura clara y equilibrada',
    category: 'Sonido profesional',
    location: 'Rosario',
    year: '2026',
    layout: 'md:col-span-1 md:row-span-1',
    position: 'object-center',
  },
  {
    id: 'gallery-03',
    src: '/images/gallery-3.webp',
    alt: 'Coordinación técnica integral detrás de un evento',
    title: 'Coordinación técnica integral',
    category: 'Producción técnica',
    location: 'Santa Fe',
    year: '2026',
    layout: 'md:col-span-1 md:row-span-1',
    position: 'object-center',
  },
  {
    id: 'gallery-04',
    src: '/images/gallery-4.webp',
    alt: 'Pantalla LED de gran formato durante una producción',
    title: 'Impacto visual en gran formato',
    category: 'Pantallas LED',
    location: 'Rosario',
    year: '2026',
    layout: 'md:col-span-2 md:row-span-1',
    position: 'object-center',
  },
  {
    id: 'gallery-05',
    src: '/images/gallery-5.webp',
    alt: 'Operador técnico trabajando durante un evento',
    title: 'Control en tiempo real',
    category: 'Operación en vivo',
    location: 'Rosario',
    year: '2026',
    layout: 'md:col-span-1 md:row-span-2',
    position: 'object-center',
  },
  {
    id: 'gallery-06',
    src: '/images/gallery-6.webp',
    alt: 'DJ profesional mezclando música durante un evento',
    title: 'La música marca el momento',
    category: 'DJ Profesional',
    location: 'Santa Fe',
    year: '2026',
    layout: 'md:col-span-2 md:row-span-2',
    position: 'object-center',
  },
]
