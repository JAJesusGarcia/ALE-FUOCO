'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Image from 'next/image'
import {
  Lightbulb,
  SlidersHorizontal,
  Volume2,
} from 'lucide-react'

const specialties = [
  {
    icon: Lightbulb,
    title: 'Diseño de iluminación',
    description:
      'Diseño lumínico pensado según el espacio, la estética y el ritmo de cada evento.',
  },
  {
    icon: Volume2,
    title: 'Sonido profesional',
    description:
      'Sistemas configurados para conseguir cobertura, claridad y equilibrio.',
  },
  {
    icon: SlidersHorizontal,
    title: 'Operación en vivo',
    description:
      'Control técnico durante todo el evento para acompañar cada momento.',
  },
]

const principles = [
  {
    value: 'Iluminación',
    label: 'Atmósfera y profundidad',
  },
  {
    value: 'Sonido',
    label: 'Claridad y presencia',
  },
  {
    value: 'Live',
    label: 'Operación en tiempo real',
  },
]

export default function About() {
  const sectionRef = useRef<HTMLElement | null>(null)

  const inView = useInView(sectionRef, {
    once: true,
    margin: '-80px',
  })

  return (
    <section
      ref={sectionRef}
      id="sobre"
      className="relative overflow-hidden border-y border-white/10 bg-surface"
    >
      <div className="pointer-events-none absolute right-0 top-0 h-[35rem] w-[35rem] translate-x-1/3 rounded-full bg-warm/6 blur-[150px]" />

      <div className="site-container relative section-spacing">
        <div className="grid gap-16 lg:grid-cols-[0.92fr_1.08fr] lg:items-center lg:gap-24 xl:gap-32">
          {/* Portrait */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{
              duration: 1,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="relative"
          >
            <div className="relative mx-auto max-w-[34rem] lg:mx-0">
              <div className="relative aspect-[4/5] overflow-hidden bg-muted">
                <Image
                  src="/images/ale-fuoco.webp"
                  alt="Ale Fuoco trabajando en diseño de iluminación y sonido"
                  fill
                  quality={95}
                  className="object-cover object-top grayscale-[15%] transition-transform duration-[1600ms] hover:scale-[1.025]"
                  sizes="(max-width: 1024px) 90vw, 42vw"
                />

                <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_50%,rgba(8,7,6,0.8)_100%)]" />

                <div className="absolute inset-0 ring-1 ring-inset ring-white/10" />

                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                  <p className="font-body text-[0.55rem] font-medium uppercase tracking-[0.22em] text-warm">
                    Diseño · Técnica · Operación
                  </p>

                  <p className="mt-3 max-w-sm font-display text-2xl font-light italic leading-snug text-white/80 md:text-3xl">
                    La técnica también puede tener sensibilidad.
                  </p>
                </div>
              </div>

              {/* Decorative lines */}
              <div className="absolute -bottom-4 -right-4 -z-10 h-full w-full border border-white/10" />

              <div className="absolute -left-4 top-10 hidden h-24 w-px bg-gradient-to-b from-transparent via-warm to-transparent md:block" />

              {/* Floating technical card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.8,
                  delay: 0.5,
                }}
                className="cinematic-glass absolute -bottom-15 right-4 hidden max-w-[14rem] border-white/10 p-5 sm:block md:right-8"
              >
                <p className="font-body text-[0.52rem] font-medium uppercase tracking-[0.2em] text-warm">
                  En cada proyecto
                </p>

                <p className="mt-3 font-body text-xs font-light leading-5 text-foreground/65">
                  Diseño previo, montaje, programación y operación técnica.
                </p>
              </motion.div>
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{
              duration: 1,
              delay: 0.12,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            <div className="mb-7 flex items-center gap-4">
              <span className="h-px w-10 bg-warm" />

              <p className="section-eyebrow">
                Sobre Ale
              </p>
            </div>

            <h2 className="max-w-[11ch] font-display text-[clamp(3.7rem,7vw,7rem)] font-light leading-[0.86] tracking-[-0.045em] text-foreground">
              Diseñar cómo
              <span className="block italic text-foreground/55">
                se siente un espacio.
              </span>
            </h2>

            <div className="mt-9 max-w-2xl space-y-5">
              <p className="font-body text-base font-light leading-8 text-foreground/72 md:text-lg">
                Ale Fuoco desarrolla propuestas de iluminación y sonido para
                eventos sociales, corporativos y producciones especiales.
              </p>

              <p className="font-body text-base font-light leading-8 text-muted-foreground md:text-lg">
                Su trabajo comienza mucho antes de encender una consola. Cada
                proyecto parte del análisis del espacio, la cantidad de
                personas, la propuesta estética y los diferentes momentos que
                debe atravesar el evento.
              </p>

              <p className="font-body text-base font-light leading-8 text-muted-foreground md:text-lg">
                El objetivo no es simplemente instalar equipos. Es lograr que
                la iluminación, el sonido y la operación técnica trabajen como
                una sola experiencia.
              </p>
            </div>

            {/* Specialties */}
            <div className="mt-12 divide-y divide-white/10 border-y border-white/10">
              {specialties.map((specialty, index) => {
                const Icon = specialty.icon

                return (
                  <motion.div
                    key={specialty.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{
                      duration: 0.7,
                      delay: 0.35 + index * 0.1,
                    }}
                    className="group grid gap-4 py-6 sm:grid-cols-[3rem_1fr] sm:items-start"
                  >
                    <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-warm transition-all duration-300 group-hover:border-warm group-hover:bg-warm group-hover:text-warm-foreground">
                      <Icon
                        size={16}
                        strokeWidth={1.5}
                      />
                    </span>

                    <div>
                      <h3 className="font-display text-2xl font-light text-foreground">
                        {specialty.title}
                      </h3>

                      <p className="mt-2 max-w-xl font-body text-sm font-light leading-6 text-muted-foreground">
                        {specialty.description}
                      </p>
                    </div>
                  </motion.div>
                )
              })}
            </div>

            {/* Principles */}
            <div className="mt-10 grid grid-cols-3 gap-4">
              {principles.map((principle) => (
                <div
                  key={principle.value}
                  className="border-l border-white/10 pl-4 first:border-warm"
                >
                  <p className="font-display text-2xl font-light italic text-foreground md:text-3xl">
                    {principle.value}
                  </p>

                  <p className="mt-2 max-w-[8rem] font-body text-[0.55rem] uppercase leading-4 tracking-[0.12em] text-muted-foreground">
                    {principle.label}
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



// 'use client'

// import { useRef } from 'react'
// import { motion, useInView } from 'framer-motion'
// import Image from 'next/image'

// const stats = [
//   { value: '15+', label: 'Años de experiencia' },
//   { value: '300+', label: 'Eventos realizados' },
//   { value: '100%', label: 'Atención personalizada' },
// ]

// export default function About() {
//   const ref = useRef(null)
//   const inView = useInView(ref, { once: true, margin: '-80px' })

//   return (
//     <section id="sobre" className="bg-secondary/40 py-24 md:py-36">
//       <div ref={ref} className="max-w-7xl mx-auto px-6 md:px-12">
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-24 items-center">
//           {/* Portrait */}
//           <motion.div
//             className="relative"
//             initial={{ opacity: 0, x: -40 }}
//             animate={inView ? { opacity: 1, x: 0 } : {}}
//             transition={{ duration: 0.9, ease: 'easeOut' }}
//           >
//             <div className="relative aspect-[3/4] overflow-hidden max-w-md mx-auto lg:mx-0">
//               <Image
//                 src="/images/ale-fuoco.png"
//                 alt="Ale Fuoco, productor de eventos"
//                 fill
//                 className="object-cover object-top"
//                 sizes="(max-width: 1024px) 80vw, 40vw"
//               />
//             </div>
//             {/* Decorative offset border */}
//             <div className="absolute -bottom-4 -right-4 w-full h-full border border-border -z-10 max-w-md mx-auto lg:mx-0" />
//           </motion.div>

//           {/* Text */}
//           <motion.div
//             initial={{ opacity: 0, x: 40 }}
//             animate={inView ? { opacity: 1, x: 0 } : {}}
//             transition={{ duration: 0.9, delay: 0.15, ease: 'easeOut' }}
//           >
//             <p
//               className="text-xs tracking-[0.25em] uppercase text-muted-foreground mb-6"
//               style={{ fontFamily: 'var(--font-body)' }}
//             >
//               Sobre Ale
//             </p>
//             <h2
//               className="text-4xl md:text-6xl font-light text-foreground leading-tight mb-8"
//               style={{ fontFamily: 'var(--font-display)' }}
//             >
//               Cada evento
//               <br />
//               <em>cuenta una historia.</em>
//             </h2>

//             <div className="space-y-5 mb-12">
//               <p
//                 className="text-base md:text-lg text-muted-foreground leading-relaxed"
//                 style={{ fontFamily: 'var(--font-body)' }}
//               >
//                 Con más de 15 años de experiencia, Ale Fuoco es un productor de eventos que construyó su nombre
//                 sobre la base del detalle, la calidez y el compromiso genuino con cada cliente.
//               </p>
//               <p
//                 className="text-base md:text-lg text-muted-foreground leading-relaxed"
//                 style={{ fontFamily: 'var(--font-body)' }}
//               >
//                 Trabaja de manera independiente para ofrecer una atención completamente personalizada. No hay
//                 eventos estandarizados. Cada celebración se diseña desde cero, escuchando lo que el cliente
//                 realmente quiere vivir.
//               </p>
//               <p
//                 className="text-base md:text-lg text-muted-foreground leading-relaxed"
//                 style={{ fontFamily: 'var(--font-body)' }}
//               >
//                 Su pasión es convertir ideas en momentos que las personas recuerdan para siempre.
//               </p>
//             </div>

//             {/* Stats */}
//             <div className="grid grid-cols-3 gap-6 border-t border-border pt-8">
//               {stats.map((stat) => (
//                 <div key={stat.label}>
//                   <p
//                     className="text-3xl md:text-4xl font-light text-foreground mb-1"
//                     style={{ fontFamily: 'var(--font-display)' }}
//                   >
//                     {stat.value}
//                   </p>
//                   <p
//                     className="text-xs text-muted-foreground leading-snug"
//                     style={{ fontFamily: 'var(--font-body)' }}
//                   >
//                     {stat.label}
//                   </p>
//                 </div>
//               ))}
//             </div>
//           </motion.div>
//         </div>
//       </div>
//     </section>
//   )
// }
