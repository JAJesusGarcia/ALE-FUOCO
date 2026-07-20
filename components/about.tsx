'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Image from 'next/image'

const stats = [
  { value: '15+', label: 'Años de experiencia' },
  { value: '300+', label: 'Eventos realizados' },
  { value: '100%', label: 'Atención personalizada' },
]

export default function About() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="sobre" className="bg-secondary/40 py-24 md:py-36">
      <div ref={ref} className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-24 items-center">
          {/* Portrait */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, ease: 'easeOut' }}
          >
            <div className="relative aspect-[3/4] overflow-hidden max-w-md mx-auto lg:mx-0">
              <Image
                src="/images/ale-fuoco.png"
                alt="Ale Fuoco, productor de eventos"
                fill
                className="object-cover object-top"
                sizes="(max-width: 1024px) 80vw, 40vw"
              />
            </div>
            {/* Decorative offset border */}
            <div className="absolute -bottom-4 -right-4 w-full h-full border border-border -z-10 max-w-md mx-auto lg:mx-0" />
          </motion.div>

          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.15, ease: 'easeOut' }}
          >
            <p
              className="text-xs tracking-[0.25em] uppercase text-muted-foreground mb-6"
              style={{ fontFamily: 'var(--font-body)' }}
            >
              Sobre Ale
            </p>
            <h2
              className="text-4xl md:text-6xl font-light text-foreground leading-tight mb-8"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Cada evento
              <br />
              <em>cuenta una historia.</em>
            </h2>

            <div className="space-y-5 mb-12">
              <p
                className="text-base md:text-lg text-muted-foreground leading-relaxed"
                style={{ fontFamily: 'var(--font-body)' }}
              >
                Con más de 15 años de experiencia, Ale Fuoco es un productor de eventos que construyó su nombre
                sobre la base del detalle, la calidez y el compromiso genuino con cada cliente.
              </p>
              <p
                className="text-base md:text-lg text-muted-foreground leading-relaxed"
                style={{ fontFamily: 'var(--font-body)' }}
              >
                Trabaja de manera independiente para ofrecer una atención completamente personalizada. No hay
                eventos estandarizados. Cada celebración se diseña desde cero, escuchando lo que el cliente
                realmente quiere vivir.
              </p>
              <p
                className="text-base md:text-lg text-muted-foreground leading-relaxed"
                style={{ fontFamily: 'var(--font-body)' }}
              >
                Su pasión es convertir ideas en momentos que las personas recuerdan para siempre.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 border-t border-border pt-8">
              {stats.map((stat) => (
                <div key={stat.label}>
                  <p
                    className="text-3xl md:text-4xl font-light text-foreground mb-1"
                    style={{ fontFamily: 'var(--font-display)' }}
                  >
                    {stat.value}
                  </p>
                  <p
                    className="text-xs text-muted-foreground leading-snug"
                    style={{ fontFamily: 'var(--font-body)' }}
                  >
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
