'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { ArrowDown, ArrowUpRight } from 'lucide-react'

export default function Hero() {
  const scrollToSection = (selector: string) => {
    const element = document.querySelector(selector)

    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      })
    }
  }

  return (
    <section
      id="inicio"
      className="film-grain relative min-h-[44rem] w-full overflow-hidden bg-background md:min-h-[48rem]"
      style={{
        height: '100svh',
      }}
    >
      {/* Imagen de fondo */}
      <motion.div
        initial={{ scale: 1.08 }}
        animate={{ scale: 1 }}
        transition={{
          duration: 2,
          ease: [0.16, 1, 0.3, 1],
        }}
        className="absolute inset-0"
      >
        <Image
          src="/images/hero.png"
          alt="Evento producido por Ale Fuoco"
          fill
          priority
          quality={95}
          sizes="100vw"
          className="object-cover object-center"
        />
      </motion.div>

      {/* Overlays cinematográficos */}
      <div className="absolute inset-0 bg-black/35" />

      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(10,9,8,0.92)_0%,rgba(10,9,8,0.62)_38%,rgba(10,9,8,0.15)_72%,rgba(10,9,8,0.32)_100%)]" />

      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,9,8,0.55)_0%,transparent_28%,transparent_58%,rgba(10,9,8,0.92)_100%)]" />

      <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-background via-background/45 to-transparent" />

      {/* Resplandor cálido */}
      <div className="absolute left-[12%] top-[30%] h-96 w-96 rounded-full bg-warm/10 blur-[120px]" />

      {/* Contenido */}
      <div className="site-container relative z-10 flex h-full min-h-[44rem] flex-col justify-end pb-16 pt-32 md:min-h-[48rem] md:justify-center md:pb-12 md:pt-32">
        <div className="max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              delay: 0.2,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="mb-7 flex items-center gap-4"
          >
            <span className="h-px w-10 bg-warm" />

            <p className="font-body text-[0.62rem] font-medium uppercase tracking-[0.3em] text-white/70 md:text-[0.68rem]">
              Producción integral de eventos
            </p>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 1.05,
              delay: 0.38,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="max-w-[10ch] font-display text-[clamp(4.3rem,13vw,11rem)] font-light leading-[0.76] tracking-[-0.055em] text-white"
          >
            Ale
            <span className="block pl-[0.2em] italic text-white/82">
              Fuoco
            </span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.9,
              delay: 0.72,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="mt-8 flex max-w-3xl flex-col gap-8 md:mt-10 md:flex-row md:items-end md:justify-between"
          >
            <p className="max-w-lg font-display text-xl font-light italic leading-relaxed text-white/70 md:text-2xl">
              Ideas, personas y detalles que se transforman en experiencias
              memorables.
            </p>

            <div className="flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={() => scrollToSection('#galeria')}
                className="focus-ring group flex min-w-44 items-center justify-between gap-5 bg-white px-6 py-4 font-body text-[0.62rem] font-medium uppercase tracking-[0.19em] text-background transition-all duration-300 hover:bg-warm hover:text-warm-foreground"
              >
                Ver trabajos

                <ArrowUpRight
                  size={16}
                  strokeWidth={1.5}
                  className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </button>

              <button
                type="button"
                onClick={() => scrollToSection('#contacto')}
                className="focus-ring group flex min-w-44 items-center justify-between gap-5 border border-white/30 bg-black/10 px-6 py-4 font-body text-[0.62rem] font-medium uppercase tracking-[0.19em] text-white backdrop-blur-sm transition-all duration-300 hover:border-white hover:bg-white hover:text-background"
              >
                Contactar

                <ArrowUpRight
                  size={16}
                  strokeWidth={1.5}
                  className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </button>
            </div>
          </motion.div>
        </div>

        {/* Información inferior */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 1,
            delay: 1.1,
          }}
          className="mt-12 hidden items-end justify-between border-t border-white/15 pt-5 md:flex"
        >
          <div className="flex items-center gap-10">
            <div>
              <p className="font-body text-[0.55rem] uppercase tracking-[0.25em] text-white/40">
                Especialidad
              </p>

              <p className="mt-2 font-body text-xs text-white/72">
                Eventos sociales y corporativos
              </p>
            </div>

            <div>
              <p className="font-body text-[0.55rem] uppercase tracking-[0.25em] text-white/40">
                Ubicación
              </p>

              <p className="mt-2 font-body text-xs text-white/72">
                Córdoba, Argentina
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => scrollToSection('#galeria')}
            className="group flex items-center gap-3 font-body text-[0.58rem] uppercase tracking-[0.2em] text-white/55 transition-colors hover:text-white"
          >
            Descubrir

            <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 transition-colors group-hover:border-warm group-hover:text-warm">
              <ArrowDown size={14} strokeWidth={1.5} />
            </span>
          </button>
        </motion.div>
      </div>

      {/* Indicador móvil */}
      <motion.button
        type="button"
        onClick={() => scrollToSection('#galeria')}
        className="absolute bottom-5 right-5 z-20 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-black/15 text-white/70 backdrop-blur-sm md:hidden"
        aria-label="Ir a la galería"
        animate={{
          y: [0, 5, 0],
        }}
        transition={{
          repeat: Infinity,
          duration: 2,
          ease: 'easeInOut',
        }}
      >
        <ArrowDown size={16} strokeWidth={1.5} />
      </motion.button>
    </section>
  )
}

// 'use client'

// import { motion } from 'framer-motion'
// import Image from 'next/image'
// import { ChevronDown } from 'lucide-react'

// export default function Hero() {
//   const scrollToGallery = () => {
//     const el = document.querySelector('#galeria')
//     if (el) el.scrollIntoView({ behavior: 'smooth' })
//   }

//   const scrollToContact = () => {
//     const el = document.querySelector('#contacto')
//     if (el) el.scrollIntoView({ behavior: 'smooth' })
//   }

//   return (
//     <section id="inicio" className="relative w-full h-screen min-h-[600px] overflow-hidden">
//       {/* Background image */}
//       <Image
//         src="/images/hero.png"
//         alt="Evento producido por Ale Fuoco"
//         fill
//         priority
//         className="object-cover object-center"
//         sizes="100vw"
//       />

//       {/* Dark overlay */}
//       <div className="absolute inset-0 bg-black/55" />

//       {/* Content */}
//       <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
//         <motion.p
//           className="text-white/60 text-xs md:text-sm tracking-[0.3em] uppercase mb-6"
//           style={{ fontFamily: 'var(--font-body)' }}
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.9, delay: 0.3 }}
//         >
//           Producción de eventos
//         </motion.p>

//         <motion.h1
//           className="text-white font-light leading-none tracking-wide mb-6"
//           style={{
//             fontFamily: 'var(--font-display)',
//             fontSize: 'clamp(4rem, 12vw, 10rem)',
//             letterSpacing: '0.05em',
//           }}
//           initial={{ opacity: 0, y: 30 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 1, delay: 0.5 }}
//         >
//           Ale Fuoco
//         </motion.h1>

//         <motion.p
//           className="text-white/75 text-base md:text-xl font-light max-w-lg leading-relaxed mb-12"
//           style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic' }}
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.9, delay: 0.75 }}
//         >
//           Producción de eventos sociales, corporativos y privados.
//         </motion.p>

//         <motion.div
//           className="flex flex-col sm:flex-row items-center gap-4"
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.9, delay: 0.95 }}
//         >
//           <button
//             onClick={scrollToGallery}
//             className="px-8 py-3 bg-white text-foreground text-xs tracking-[0.15em] uppercase transition-all duration-300 hover:bg-white/90 active:scale-95"
//             style={{ fontFamily: 'var(--font-body)' }}
//           >
//             Ver trabajos
//           </button>
//           <button
//             onClick={scrollToContact}
//             className="px-8 py-3 border border-white/60 text-white text-xs tracking-[0.15em] uppercase transition-all duration-300 hover:bg-white/10 active:scale-95"
//             style={{ fontFamily: 'var(--font-body)' }}
//           >
//             Contactar
//           </button>
//         </motion.div>
//       </div>

//       {/* Scroll indicator */}
//       <motion.button
//         onClick={scrollToGallery}
//         className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 text-white/50 hover:text-white/80 transition-colors"
//         aria-label="Desplazarse hacia abajo"
//         animate={{ y: [0, 8, 0] }}
//         transition={{ repeat: Infinity, duration: 2.2, ease: 'easeInOut' }}
//       >
//         <ChevronDown size={28} strokeWidth={1.5} />
//       </motion.button>
//     </section>
//   )
// }
