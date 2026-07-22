'use client'

import { motion, useReducedMotion } from 'framer-motion'
import Image from 'next/image'

const motionEase = [0.16, 1, 0.3, 1] as const

export default function GalleryHero() {
  const shouldReduceMotion = useReducedMotion()

  const handleExplore = () => {
    document.querySelector('#archivo')?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    })
  }

  return (
    <section
      className="
        relative
        flex min-h-[92svh]
        items-end
        overflow-hidden
        bg-background
      "
    >
      <Image
        src="/images/gallery-1.webp"
        alt="Producción técnica e iluminación profesional de Ale Fuoco"
        fill
        priority
        quality={95}
        sizes="100vw"
        className="object-cover object-center"
      />

      <div
        aria-hidden="true"
        className="
          absolute inset-0
          bg-gradient-to-t
          from-background
          via-background/45
          to-black/25
        "
      />

      <div
        aria-hidden="true"
        className="
          absolute inset-0
          bg-[linear-gradient(90deg,rgba(0,0,0,0.55),transparent_70%)]
        "
      />

      <div
        className="
          relative z-10
          mx-auto
          w-full max-w-[90rem]
          px-6 pb-14 pt-36
          md:px-10
          md:pb-20
          lg:px-14
          lg:pb-24
          xl:px-16
        "
      >
        <motion.div
          initial={
            shouldReduceMotion
              ? false
              : {
                  opacity: 0,
                  y: 35,
                }
          }
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: shouldReduceMotion ? 0 : 1,
            ease: motionEase,
          }}
          className="max-w-5xl"
        >
          <div className="mb-7 flex items-center gap-4">
            <span aria-hidden="true" className="h-px w-10 bg-warm" />

            <p
              className="
                font-body
                text-[0.58rem]
                font-medium uppercase
                tracking-[0.28em]
                text-warm
              "
            >
              Archivo visual
            </p>
          </div>

          <h1
            className="
              max-w-[10ch]
              font-display
              text-[clamp(4.6rem,12vw,11rem)]
              font-light
              leading-[0.78]
              tracking-[-0.055em]
              text-white
            "
          >
            Momentos que
            <span className="block italic text-white/55">toman forma.</span>
          </h1>

          <div
            className="
              mt-10
              grid gap-8
              border-t border-white/20
              pt-7
              md:grid-cols-[1fr_auto]
              md:items-end
            "
          >
            <p
              className="
                max-w-xl
                font-body
                text-sm
                font-light
                leading-7
                text-white/65
                md:text-base
                md:leading-8
              "
            >
              Una selección de eventos sociales, corporativos y producciones
              donde el sonido, la iluminación, las pantallas y la operación
              técnica acompañan cada experiencia.
            </p>

            <button
              type="button"
              onClick={handleExplore}
              className="
                group
                flex items-center gap-4
                justify-self-start
                font-body
                text-[0.6rem]
                font-medium uppercase
                tracking-[0.22em]
                text-white
                transition-colors duration-300
                hover:text-warm
                focus-visible:outline-none
                focus-visible:text-warm
                md:justify-self-end
              "
            >
              Explorar archivo
              <span
                aria-hidden="true"
                className="
                  h-px w-12
                  bg-current
                  transition-transform duration-500
                  group-hover:translate-x-2
                "
              />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
