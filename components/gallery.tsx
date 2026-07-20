'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Image from 'next/image'

const galleryItems = [
  {
    src: '/images/gallery-1.png',
    title: 'Boda en Villa Allende',
    description: 'Ceremonia y recepción para 200 personas en una estancia privada.',
    category: 'Bodas',
  },
  {
    src: '/images/gallery-2.png',
    title: 'Cumpleaños de 50',
    description: 'Celebración íntima al aire libre con diseño botánico y cálida ambientación.',
    category: 'Social',
  },
  {
    src: '/images/gallery-3.png',
    title: 'Gala Corporativa',
    description: 'Cena de gala para empresa multinacional con producción de alto nivel.',
    category: 'Corporativo',
  },
  {
    src: '/images/gallery-4.png',
    title: 'Cocktail al Jardín',
    description: 'Evento de casamiento en jardín privado con decoración floral frondosa.',
    category: 'Bodas',
  },
  {
    src: '/images/gallery-5.png',
    title: 'Lanzamiento de Producto',
    description: 'Presentación de marca con producción escénica y ambientación exclusiva.',
    category: 'Corporativo',
  },
  {
    src: '/images/gallery-6.png',
    title: 'Cena Privada',
    description: 'Velada para 30 personas en terraza con atmósfera bohemia y romantica.',
    category: 'Privado',
  },
]

function GalleryCard({
  item,
  index,
}: {
  item: (typeof galleryItems)[0]
  index: number
}) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <motion.article
      ref={ref}
      className="group relative overflow-hidden"
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.1, ease: 'easeOut' }}
    >
      {/* Image */}
      <div className="relative overflow-hidden aspect-[3/4]">
        <Image
          src={item.src}
          alt={item.title}
          fill
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        {/* Subtle overlay on hover */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500" />
      </div>

      {/* Text */}
      <div className="pt-4 pb-2">
        <p
          className="text-xs tracking-[0.2em] uppercase text-muted-foreground mb-1"
          style={{ fontFamily: 'var(--font-body)' }}
        >
          {item.category}
        </p>
        <h3
          className="text-xl text-foreground font-light leading-snug mb-1"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          {item.title}
        </h3>
        <p
          className="text-sm text-muted-foreground leading-relaxed"
          style={{ fontFamily: 'var(--font-body)' }}
        >
          {item.description}
        </p>
      </div>
    </motion.article>
  )
}

export default function Gallery() {
  const headerRef = useRef(null)
  const headerInView = useInView(headerRef, { once: true, margin: '-60px' })

  return (
    <section id="galeria" className="py-24 md:py-36 px-6 md:px-12 max-w-7xl mx-auto">
      {/* Header */}
      <motion.div
        ref={headerRef}
        className="mb-16 md:mb-20"
        initial={{ opacity: 0, y: 30 }}
        animate={headerInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <p
          className="text-xs tracking-[0.25em] uppercase text-muted-foreground mb-4"
          style={{ fontFamily: 'var(--font-body)' }}
        >
          Trabajos
        </p>
        <h2
          className="text-5xl md:text-7xl font-light text-foreground leading-none"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          Galería
        </h2>
      </motion.div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
        {galleryItems.map((item, i) => (
          <GalleryCard key={item.title} item={item} index={i} />
        ))}
      </div>
    </section>
  )
}
