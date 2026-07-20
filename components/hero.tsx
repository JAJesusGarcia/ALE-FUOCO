'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { ChevronDown } from 'lucide-react'

export default function Hero() {
  const scrollToGallery = () => {
    const el = document.querySelector('#galeria')
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  const scrollToContact = () => {
    const el = document.querySelector('#contacto')
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="inicio" className="relative w-full h-screen min-h-[600px] overflow-hidden">
      {/* Background image */}
      <Image
        src="/images/hero.png"
        alt="Evento producido por Ale Fuoco"
        fill
        priority
        className="object-cover object-center"
        sizes="100vw"
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/55" />

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
        <motion.p
          className="text-white/60 text-xs md:text-sm tracking-[0.3em] uppercase mb-6"
          style={{ fontFamily: 'var(--font-body)' }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.3 }}
        >
          Producción de eventos
        </motion.p>

        <motion.h1
          className="text-white font-light leading-none tracking-wide mb-6"
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(4rem, 12vw, 10rem)',
            letterSpacing: '0.05em',
          }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          Ale Fuoco
        </motion.h1>

        <motion.p
          className="text-white/75 text-base md:text-xl font-light max-w-lg leading-relaxed mb-12"
          style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic' }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.75 }}
        >
          Producción de eventos sociales, corporativos y privados.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row items-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.95 }}
        >
          <button
            onClick={scrollToGallery}
            className="px-8 py-3 bg-white text-foreground text-xs tracking-[0.15em] uppercase transition-all duration-300 hover:bg-white/90 active:scale-95"
            style={{ fontFamily: 'var(--font-body)' }}
          >
            Ver trabajos
          </button>
          <button
            onClick={scrollToContact}
            className="px-8 py-3 border border-white/60 text-white text-xs tracking-[0.15em] uppercase transition-all duration-300 hover:bg-white/10 active:scale-95"
            style={{ fontFamily: 'var(--font-body)' }}
          >
            Contactar
          </button>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.button
        onClick={scrollToGallery}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 text-white/50 hover:text-white/80 transition-colors"
        aria-label="Desplazarse hacia abajo"
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2.2, ease: 'easeInOut' }}
      >
        <ChevronDown size={28} strokeWidth={1.5} />
      </motion.button>
    </section>
  )
}
