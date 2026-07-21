'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { motion, useInView } from 'framer-motion'
import { Lightbulb, SlidersHorizontal, Volume2 } from 'lucide-react'

const specialties = [
  {
    icon: Lightbulb,
    title: 'Producción técnica',
    description:
      'Planificación integral de todos los recursos técnicos necesarios para cada evento.',
  },
  {
    icon: Volume2,
    title: 'Sonido profesional',
    description:
      'Equipamiento configurado para lograr cobertura uniforme y máxima claridad.',
  },
  {
    icon: SlidersHorizontal,
    title: 'Iluminación profesional',
    description:
      'Diseño lumínico pensado para potenciar cada espacio y cada momento del evento.',
  },
]

const principles = [
  {
    value: 'Producción',
    label: 'Planificación integral',
  },
  {
    value: 'Sonido',
    label: 'Cobertura profesional',
  },
  {
    value: 'Iluminación',
    label: 'Diseño y operación',
  },
]

const motionEase = [0.16, 1, 0.3, 1] as const

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
      className="
        relative overflow-hidden
        border-y border-white/10
        bg-surface
      "
    >
      {/* Luz ambiental decorativa: desactivada en móviles */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute right-0 top-0
          hidden size-[35rem]
          translate-x-1/3
          rounded-full
          bg-warm/6
          blur-[150px]
          md:block
        "
      />

      <div
        className="
          relative mx-auto
          w-full max-w-[90rem]
          px-6 py-24
          md:px-10 md:py-28
          lg:px-14 lg:py-36
          xl:px-16
        "
      >
        <div
          className="
            grid gap-16
            lg:grid-cols-[0.92fr_1.08fr]
            lg:items-center
            lg:gap-24
            xl:gap-32
          "
        >
          {/* Retrato */}
          <motion.div
            initial={{
              opacity: 0,
              x: -40,
            }}
            animate={
              inView
                ? {
                    opacity: 1,
                    x: 0,
                  }
                : {}
            }
            transition={{
              duration: 1,
              ease: motionEase,
            }}
            className="relative"
          >
            <div className="relative mx-auto max-w-[34rem] lg:mx-0">
              <div
                className="
                  relative aspect-[4/5]
                  overflow-hidden
                  bg-muted
                "
              >
                <Image
                  src="/images/ale-fuoco.webp"
                  alt="Ale Fuoco trabajando en diseño de iluminación y sonido"
                  fill
                  quality={95}
                  sizes="(max-width: 1024px) 90vw, 42vw"
                  className="
                    object-cover object-top
                    grayscale-[15%]
                    transition-transform
                    duration-[1600ms]
                    md:hover:scale-[1.025]
                  "
                />

                <div
                  aria-hidden="true"
                  className="
                    absolute inset-0
                    bg-[linear-gradient(180deg,transparent_50%,rgba(8,7,6,0.8)_100%)]
                  "
                />

                <div
                  aria-hidden="true"
                  className="
                    absolute inset-0
                    ring-1 ring-inset
                    ring-white/10
                  "
                />

                <div className="absolute inset-x-0 bottom-0 p-6 md:p-8">
                  <p
                    className="
                      font-body
                      text-[0.55rem]
                      font-medium uppercase
                      tracking-[0.22em]
                      text-warm
                    "
                  >
                    DJ · Sonido · Iluminación · Producción Técnica
                  </p>

                  <p
                    className="
                      mt-3 max-w-sm
                      font-display
                      text-2xl font-light italic
                      leading-snug
                      text-white/80
                      md:text-3xl
                    "
                  >
                    La técnica hace posible cada gran evento.
                  </p>
                </div>
              </div>

              {/* Marco desplazado */}
              <div
                aria-hidden="true"
                className="
                  absolute -bottom-4 -right-4
                  -z-10
                  h-full w-full
                  border border-white/10
                "
              />

              {/* Línea decorativa */}
              <div
                aria-hidden="true"
                className="
                  absolute -left-4 top-10
                  hidden h-24 w-px
                  bg-gradient-to-b
                  from-transparent via-warm to-transparent
                  md:block
                "
              />

              {/* Tarjeta técnica flotante */}
              <motion.div
                initial={{
                  opacity: 0,
                  y: 20,
                }}
                animate={
                  inView
                    ? {
                        opacity: 1,
                        y: 0,
                      }
                    : {}
                }
                transition={{
                  duration: 0.8,
                  delay: 0.5,
                  ease: motionEase,
                }}
                className="
                  cinematic-glass
                  absolute
                  -bottom-[3.75rem]
                  right-4
                  hidden max-w-[14rem]
                  border-white/10
                  p-5
                  sm:block
                  md:right-8
                "
              >
                <p
                  className="
                    font-body
                    text-[0.52rem]
                    font-medium uppercase
                    tracking-[0.2em]
                    text-warm
                  "
                >
                  En cada proyecto
                </p>

                <p
                  className="
                    mt-3
                    font-body
                    text-xs font-light
                    leading-5
                    text-foreground/65
                  "
                >
                  Planificación, montaje, operación y acompañamiento técnico de
                  principio a fin.
                </p>
              </motion.div>
            </div>
          </motion.div>

          {/* Contenido */}
          <motion.div
            initial={{
              opacity: 0,
              x: 40,
            }}
            animate={
              inView
                ? {
                    opacity: 1,
                    x: 0,
                  }
                : {}
            }
            transition={{
              duration: 1,
              delay: 0.12,
              ease: motionEase,
            }}
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
                Sobre Ale
              </p>
            </div>

            <h2
              className="
                max-w-[11ch]
                font-display
                text-[clamp(3.7rem,7vw,7rem)]
                font-light
                leading-[0.86]
                tracking-[-0.045em]
                text-foreground
              "
            >
              Mucho más que
              <span className="block italic text-foreground/55">
                instalar equipos.
              </span>
            </h2>

            <div className="mt-9 max-w-2xl space-y-5">
              <p
                className="
                  font-body
                  text-base font-light
                  leading-8
                  text-foreground/72
                  md:text-lg
                "
              >
                Ale Fuoco desarrolla la producción técnica integral de eventos
                sociales, corporativos y privados, integrando sonido
                profesional, iluminación, pantallas LED, DJ y operación técnica.
              </p>

              <p
                className="
                  font-body
                  text-base font-light
                  leading-8
                  text-muted-foreground
                  md:text-lg
                "
              >
                Cada proyecto comienza analizando el espacio, el tipo de evento,
                la cantidad de invitados y la experiencia que se busca generar.
                A partir de eso se diseña una propuesta técnica adaptada a cada
                necesidad.
              </p>

              <p
                className="
                  font-body
                  text-base font-light
                  leading-8
                  text-muted-foreground
                  md:text-lg
                "
              >
                El objetivo no es solamente aportar equipamiento. Es lograr que
                el sonido, la iluminación, el contenido visual y la operación
                técnica funcionen como un solo sistema durante todo el evento.
              </p>
            </div>

            {/* Especialidades */}
            <div
              className="
                mt-12
                divide-y divide-white/10
                border-y border-white/10
              "
            >
              {specialties.map((specialty, index) => {
                const Icon = specialty.icon

                return (
                  <motion.div
                    key={specialty.title}
                    initial={{
                      opacity: 0,
                      y: 20,
                    }}
                    animate={
                      inView
                        ? {
                            opacity: 1,
                            y: 0,
                          }
                        : {}
                    }
                    transition={{
                      duration: 0.7,
                      delay: 0.35 + index * 0.1,
                      ease: motionEase,
                    }}
                    className="
                      group grid gap-4 py-6
                      sm:grid-cols-[3rem_1fr]
                      sm:items-start
                    "
                  >
                    <span
                      className="
                        flex size-10
                        items-center justify-center
                        rounded-full
                        border border-white/10
                        text-warm
                        transition-colors duration-300
                        md:group-hover:border-warm
                        md:group-hover:bg-warm
                        md:group-hover:text-warm-foreground
                      "
                    >
                      <Icon size={16} strokeWidth={1.5} aria-hidden="true" />
                    </span>

                    <div>
                      <h3
                        className="
                          font-display
                          text-2xl font-light
                          text-foreground
                        "
                      >
                        {specialty.title}
                      </h3>

                      <p
                        className="
                          mt-2 max-w-xl
                          font-body
                          text-sm font-light
                          leading-6
                          text-muted-foreground
                        "
                      >
                        {specialty.description}
                      </p>
                    </div>
                  </motion.div>
                )
              })}
            </div>

            {/* Principios */}
            <div
              className="
                mt-10
                grid grid-cols-1 gap-6
                sm:grid-cols-3
                sm:gap-4
              "
            >
              {principles.map((principle) => (
                <div
                  key={principle.value}
                  className="
                    border-l border-white/10
                    pl-4
                    first:border-warm
                  "
                >
                  <p
                    className="
                      font-display
                      text-2xl font-light italic
                      text-foreground
                      md:text-3xl
                    "
                  >
                    {principle.value}
                  </p>

                  <p
                    className="
                      mt-2 max-w-[8rem]
                      font-body
                      text-[0.55rem] uppercase
                      leading-4
                      tracking-[0.12em]
                      text-muted-foreground
                    "
                  >
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
