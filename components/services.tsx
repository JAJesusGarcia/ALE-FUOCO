'use client'

import { motion, useInView, useReducedMotion } from 'framer-motion'
import { useRef } from 'react'

const motionEase = [0.16, 1, 0.3, 1] as const

const services = [
  {
    number: '01',
    title: 'DJ Profesional',
    description:
      'Selección musical, mezcla en vivo y acompañamiento de cada momento para construir el ritmo y la energía del evento.',
    detail: 'Musicalización · Mezcla · Operación',
  },
  {
    number: '02',
    title: 'Sonido Profesional',
    description:
      'Sistemas configurados según el espacio y la cantidad de personas para lograr cobertura uniforme, claridad y presencia.',
    detail: 'PA · Monitoreo · Microfonía',
  },
  {
    number: '03',
    title: 'Iluminación',
    description:
      'Diseño lumínico ambiental, decorativo y escénico pensado para transformar el espacio y acompañar cada momento.',
    detail: 'Diseño · Programación · Operación',
  },
  {
    number: '04',
    title: 'Pantallas LED',
    description:
      'Sistemas visuales para shows, eventos corporativos, celebraciones y producciones que requieren comunicación de alto impacto.',
    detail: 'LED · Contenido · Operación visual',
  },
  {
    number: '05',
    title: 'Producción Técnica',
    description:
      'Planificación, montaje y coordinación de sonido, iluminación, video y operación durante todo el desarrollo del evento.',
    detail: 'Planificación · Montaje · Coordinación',
  },
  {
    number: '06',
    title: 'Rental',
    description:
      'Alquiler de equipamiento profesional con opciones de entrega, instalación, asistencia técnica y operación especializada.',
    detail: 'Equipamiento · Montaje · Soporte',
  },
]

export default function Services() {
  const sectionRef = useRef<HTMLElement | null>(null)
  const shouldReduceMotion = useReducedMotion()
  const inView = useInView(sectionRef, {
    once: true,
    margin: '-80px',
  })

  const revealInitial = shouldReduceMotion
    ? false
    : {
        opacity: 0,
        y: 35,
      }

  return (
    <section
      ref={sectionRef}
      id="servicios"
      className="
        relative
        overflow-hidden
        bg-background
        py-24
        md:py-28
        lg:py-36
      "
    >
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute -right-40 top-1/4
          hidden size-[34rem]
          rounded-full
          bg-warm/[0.045]
          blur-[150px]
          md:block
        "
      />

      <div
        className="
          relative
          mx-auto
          w-full max-w-[90rem]
          px-6
          md:px-10
          lg:px-14
          xl:px-16
        "
      >
        <motion.div
          initial={revealInitial}
          animate={
            inView || shouldReduceMotion
              ? {
                  opacity: 1,
                  y: 0,
                }
              : {}
          }
          transition={{
            duration: shouldReduceMotion ? 0 : 0.9,
            ease: motionEase,
          }}
          className="
            grid gap-10
            border-b border-white/10
            pb-12
            md:grid-cols-[1fr_auto]
            md:items-end
            md:pb-16
          "
        >
          <div>
            <div className="mb-6 flex items-center gap-4">
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
                Servicios
              </p>
            </div>

            <h2
              className="
                max-w-[11ch]
                font-display
                text-[clamp(3.8rem,8vw,7.5rem)]
                font-light
                leading-[0.86]
                tracking-[-0.045em]
                text-foreground
              "
            >
              Todo lo técnico.
              <span className="block italic text-foreground/50">
                Una sola producción.
              </span>
            </h2>
          </div>

          <p
            className="
              max-w-sm
              font-body
              text-sm
              font-light
              leading-7
              text-muted-foreground
              md:text-right
            "
          >
            Soluciones integrales para eventos sociales, corporativos y
            privados, desde la planificación y el montaje hasta la operación en
            vivo.
          </p>
        </motion.div>

        <div className="mt-4">
          {services.map((service, index) => (
            <motion.article
              key={service.number}
              initial={
                shouldReduceMotion
                  ? false
                  : {
                      opacity: 0,
                      y: 28,
                    }
              }
              animate={
                inView || shouldReduceMotion
                  ? {
                      opacity: 1,
                      y: 0,
                    }
                  : {}
              }
              transition={{
                duration: shouldReduceMotion ? 0 : 0.75,
                delay: shouldReduceMotion ? 0 : 0.08 * index,
                ease: motionEase,
              }}
              className="
                group
                grid gap-6
                border-b border-white/10
                py-9
                md:grid-cols-[5rem_minmax(0,0.8fr)_minmax(0,1.2fr)]
                md:items-start
                md:gap-10
                md:py-12
              "
            >
              <span
                className="
                  font-body
                  text-[0.56rem]
                  font-medium
                  tracking-[0.24em]
                  text-warm/75
                "
              >
                {service.number}
              </span>

              <div>
                <h3
                  className="
                    font-display
                    text-[clamp(2.2rem,4vw,4.4rem)]
                    font-light
                    leading-none
                    tracking-[-0.035em]
                    text-foreground
                    transition-transform duration-500
                    md:group-hover:translate-x-2
                  "
                >
                  {service.title}
                </h3>

                <p
                  className="
                    mt-5
                    font-body
                    text-[0.52rem]
                    font-medium uppercase
                    tracking-[0.2em]
                    text-white/30
                  "
                >
                  {service.detail}
                </p>
              </div>

              <p
                className="
                  max-w-xl
                  font-body
                  text-sm
                  font-light
                  leading-7
                  text-muted-foreground
                  md:justify-self-end
                  md:text-base
                  md:leading-8
                "
              >
                {service.description}
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
