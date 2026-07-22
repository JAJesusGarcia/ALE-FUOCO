'use client'

import { useCallback } from 'react'
import Image from 'next/image'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowDown, ArrowUpRight } from 'lucide-react'

import HeroCinematicRig from '@/components/effects/hero-cinematic-rig'

const motionEase = [0.16, 1, 0.3, 1] as const

export default function Hero() {
  const shouldReduceMotion = useReducedMotion()

  const scrollToSection = useCallback((selector: string) => {
    const element = document.querySelector<HTMLElement>(selector)

    if (!element) {
      return
    }

    element.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    })
  }, [])

  return (
    <section
      id="inicio"
      className="
        relative
        h-[100svh]
        min-h-[44rem]
        w-full
        overflow-hidden
        bg-background
        md:min-h-[48rem]
      "
    >
      {/* Imagen de fondo */}
      <motion.div
        initial={
          shouldReduceMotion
            ? false
            : {
                scale: 1.08,
              }
        }
        animate={{
          scale: 1,
        }}
        transition={{
          duration: shouldReduceMotion ? 0 : 2,
          ease: motionEase,
        }}
        className="absolute inset-0 z-0"
      >
        {/*
        <Image
          src="/images/hero.webp"
          alt="Diseño de iluminación y producción técnica de Ale Fuoco"
          fill
          priority
          quality={95}
          sizes="100vw"
          className="object-cover object-center"
        />
        */}
      </motion.div>

      {/* Oscurecimiento general */}
      <div aria-hidden="true" className="absolute inset-0 z-[1] bg-black/35" />

      {/* Gradiente horizontal */}
      <div
        aria-hidden="true"
        className="
          absolute inset-0 z-[1]
          bg-[linear-gradient(90deg,rgba(10,9,8,0.94)_0%,rgba(10,9,8,0.68)_38%,rgba(10,9,8,0.16)_72%,rgba(10,9,8,0.36)_100%)]
        "
      />

      {/* Gradiente vertical */}
      <div
        aria-hidden="true"
        className="
          absolute inset-0 z-[1]
          bg-[linear-gradient(180deg,rgba(10,9,8,0.58)_0%,transparent_28%,transparent_58%,rgba(10,9,8,0.94)_100%)]
        "
      />

      {/* Transición inferior */}
      <div
        aria-hidden="true"
        className="
          absolute inset-x-0 bottom-0 z-[1]
          h-64
          bg-gradient-to-t
          from-background
          via-background/45
          to-transparent
        "
      />

      {/* Resplandor cálido de escritorio */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute left-[12%] top-[30%] z-[1]
          hidden size-96
          rounded-full
          bg-warm/10
          blur-[120px]
          md:block
        "
      />

      {/* Sistema técnico y efectos cinematográficos */}
      <HeroCinematicRig />

      {/* Máscara inferior para separar el HUD de la información */}
      {/* <div
        aria-hidden="true"
        className="
        pointer-events-none
        absolute inset-x-0 bottom-0 z-[8]
        hidden h-32
        bg-gradient-to-t
        from-background
        via-background/95
        to-transparent
        md:block
        "
      /> */}

      {/* Contenido principal */}
      <div
        className="
          relative z-10
          mx-auto flex
          h-full min-h-[44rem]
          w-full max-w-[90rem]
          flex-col justify-end
          px-6 pb-16 pt-32
          md:min-h-[48rem]
          md:justify-center
          md:px-10
          md:pb-12
          md:pt-32
          lg:px-14
          xl:px-16
        "
      >
        <div
          className="
    mx-auto flex
    w-full max-w-5xl
    flex-col items-center
    text-center
    md:mx-0
    md:translate-y-8
    md:items-start
    md:text-left
    lg:translate-y-10
  "
        >
          {/* Descripción superior, solo tablet y escritorio */}
          <motion.div
            initial={
              shouldReduceMotion
                ? false
                : {
                    opacity: 0,
                    y: 22,
                  }
            }
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: shouldReduceMotion ? 0 : 0.8,
              delay: shouldReduceMotion ? 0 : 0.2,
              ease: motionEase,
            }}
            className="
              mb-7 hidden
              items-center gap-4
              md:flex
            "
          >
            <span aria-hidden="true" className="h-px w-10 shrink-0 bg-warm" />

            <p
              className="
                font-body
                text-[0.68rem]
                font-medium uppercase
                tracking-[0.3em]
                text-white/70
              "
            >
              DJ · Sonido Profesional · Iluminación · Pantallas LED · Producción
              Técnica
            </p>
          </motion.div>

          {/* Logo */}
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
              duration: shouldReduceMotion ? 0 : 1.05,
              delay: shouldReduceMotion ? 0 : 0.38,
              ease: motionEase,
            }}
            className="
              w-full
              max-w-[18rem]
              min-[390px]:max-w-[19rem]
              sm:max-w-[21rem]
              md:max-w-[28rem]
              lg:max-w-[34rem]
            "
          >
            <Image
              src="/images/logo-ale1.webp"
              alt="Ale Fuoco"
              width={800}
              height={300}
              priority
              sizes="
                (max-width: 379px) 15rem,
                (max-width: 629px) 16rem,
                (max-width: 757px) 18rem,
                (max-width: 1013px) 25rem,
                31rem
              "
              className="
                h-auto
                w-full
                select-none
                brightness-105
                contrast-105
                drop-shadow-[0_0_18px_rgba(255,255,255,0.05)]
              "
            />
          </motion.div>

          {/* Texto principal y botones */}
          <motion.div
            initial={
              shouldReduceMotion
                ? false
                : {
                    opacity: 0,
                    y: 24,
                  }
            }
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: shouldReduceMotion ? 0 : 0.9,
              delay: shouldReduceMotion ? 0 : 0.72,
              ease: motionEase,
            }}
            className="
  mt-5 flex
  w-full
  max-w-3xl
  flex-col
  gap-4
  sm:mt-7
  sm:gap-5
  md:mt-10
"
          >
            <p
              className="
                max-w-[22rem]
                font-display
                text-[1.12rem]
                font-light italic
                leading-[1.75]
                text-white/70
                sm:max-w-lg
                sm:text-xl
                md:text-2xl
                md:leading-relaxed
              "
            >
              Producción técnica integral para eventos sociales, corporativos y
              privados.
            </p>
            <p
              className="
  max-w-xl
  font-body
  text-sm
  leading-7
  text-white/65
  sm:text-base
  md:text-lg
  md:leading-8
"
            >
              DJ, sonido profesional, iluminación, pantallas LED y producción
              técnica para eventos sociales, corporativos y privados.
            </p>

            <div
              className="
                flex w-full
                flex-col gap-2
                sm:w-auto
                sm:flex-row
              "
            >
              <button
                type="button"
                onClick={() => scrollToSection('#galeria')}
                className="
                  group flex
                  min-w-44
                  items-center justify-between
                  gap-5
                  bg-white
                  px-6 py-4
                  font-body
                  text-[0.62rem]
                  font-medium uppercase
                  tracking-[0.19em]
                  text-background
                  transition-colors duration-300
                  hover:bg-warm
                  hover:text-warm-foreground
                  focus-visible:outline-none
                  focus-visible:ring-2
                  focus-visible:ring-warm
                  focus-visible:ring-offset-2
                  focus-visible:ring-offset-background
                  active:scale-[0.99]
                "
              >
                <span>Ver trabajos</span>

                <ArrowUpRight
                  size={16}
                  strokeWidth={1.5}
                  aria-hidden="true"
                  className="
                    transition-transform duration-300
                    md:group-hover:-translate-y-0.5
                    md:group-hover:translate-x-0.5
                  "
                />
              </button>

              <button
                type="button"
                onClick={() => scrollToSection('#contacto')}
                className="
                  group flex
                  min-w-44
                  items-center justify-between
                  gap-5
                  border border-white/30
                  bg-black/10
                  px-6 py-4
                  font-body
                  text-[0.62rem]
                  font-medium uppercase
                  tracking-[0.19em]
                  text-white
                  transition-colors duration-300
                  hover:border-white
                  hover:bg-white
                  hover:text-background
                  focus-visible:outline-none
                  focus-visible:ring-2
                  focus-visible:ring-white
                  focus-visible:ring-offset-2
                  focus-visible:ring-offset-background
                  active:scale-[0.99]
                  md:backdrop-blur-sm
                "
              >
                <span>Contactar</span>

                <ArrowUpRight
                  size={16}
                  strokeWidth={1.5}
                  aria-hidden="true"
                  className="
                    transition-transform duration-300
                    md:group-hover:-translate-y-0.5
                    md:group-hover:translate-x-0.5
                  "
                />
              </button>
            </div>
          </motion.div>
        </div>

        {/* Información inferior de escritorio */}
        <motion.div
          initial={
            shouldReduceMotion
              ? false
              : {
                  opacity: 0,
                }
          }
          animate={{
            opacity: 1,
          }}
          transition={{
            duration: shouldReduceMotion ? 0 : 1,
            delay: shouldReduceMotion ? 0 : 1.1,
          }}
          className="
            mt-12 hidden
            items-end justify-between
            border-t border-white/15
            pt-5
            md:flex
          "
        >
          <div className="flex items-center gap-10">
            <div>
              <p
                className="
                  font-body
                  text-[0.55rem]
                  uppercase
                  tracking-[0.25em]
                  text-white/40
                "
              >
                Especialidad
              </p>

              <p className="mt-2 font-body text-xs text-white/70">
                Producción técnica integral
              </p>
            </div>

            <div>
              <p
                className="
                  font-body
                  text-[0.55rem]
                  uppercase
                  tracking-[0.25em]
                  text-white/40
                "
              >
                Operación
              </p>

              <p className="mt-2 font-body text-xs text-white/70">
                Operación técnica en vivo
              </p>
            </div>

            <div>
              <p
                className="
                  font-body
                  text-[0.55rem]
                  uppercase
                  tracking-[0.25em]
                  text-white/40
                "
              >
                Ubicación
              </p>

              <p className="mt-2 font-body text-xs text-white/70">
                Rosario, Santa Fe, Argentina
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => scrollToSection('#galeria')}
            className="
              group flex
              items-center gap-3
              font-body
              text-[0.58rem]
              uppercase
              tracking-[0.2em]
              text-white/55
              transition-colors duration-300
              hover:text-white
              focus-visible:outline-none
              focus-visible:text-white
            "
          >
            <span>Descubrir</span>

            <span
              className="
                flex size-9
                items-center justify-center
                rounded-full
                border border-white/20
                transition-colors duration-300
                md:group-hover:border-warm
                md:group-hover:text-warm
              "
            >
              <ArrowDown size={14} strokeWidth={1.5} aria-hidden="true" />
            </span>
          </button>
        </motion.div>
      </div>

      {/* Indicador inferior móvil */}
      <motion.button
        type="button"
        onClick={() => scrollToSection('#galeria')}
        aria-label="Ir a la galería"
        animate={
          shouldReduceMotion
            ? undefined
            : {
                y: [0, 5, 0],
              }
        }
        transition={
          shouldReduceMotion
            ? undefined
            : {
                repeat: Infinity,
                duration: 2,
                ease: 'easeInOut',
              }
        }
        className="
          absolute bottom-2 left-1/2 z-20
          flex size-11
          -translate-x-1/2
          items-center justify-center
          rounded-full
          border border-white/20
          bg-black/15
          text-white/70
          focus-visible:outline-none
          focus-visible:ring-2
          focus-visible:ring-white
          focus-visible:ring-offset-2
          focus-visible:ring-offset-background
          md:hidden
        "
      >
        <ArrowDown size={16} strokeWidth={1.5} aria-hidden="true" />
      </motion.button>
    </section>
  )
}
