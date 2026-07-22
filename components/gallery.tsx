'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Image from 'next/image'
import {
  ArrowDownRight,
  Lightbulb,
  Play,
  SlidersHorizontal,
  Volume2,
} from 'lucide-react'
import TechnicalMediaHud from '@/components/effects/technical-media-hud'

type GalleryItem =
  | {
      type: 'image'
      src: string
      title: string
      description: string
      category: string
      number: string
      layout: string
      position?: string
      channel?: string
      universe?: string
    }
  | {
      type: 'video'
      src: string
      poster: string
      title: string
      description: string
      category: string
      number: string
      layout: string
      position?: string
      channel?: string
      universe?: string
    }

const galleryItems: GalleryItem[] = [
  {
    type: 'image',
    src: '/images/gallery-01.webp',
    title: 'Escenarios con identidad propia',
    description:
      'Diseño lumínico pensado para acompañar la música, la arquitectura y cada momento del evento.',
    category: 'Iluminación profesional',
    number: '01',
    channel: '001',
    universe: '01',
    layout: 'md:col-span-2 md:row-span-2',
    position: 'object-center',
  },
  {
    type: 'image',
    src: '/images/gallery-02.webp',
    title: 'Cobertura clara y equilibrada',
    description:
      'Sistemas de sonido configurados para que cada palabra y cada canción se escuchen con claridad.',
    category: 'Sonido profesional',
    number: '02',
    channel: '024',
    universe: '01',
    layout: 'md:col-span-1',
    position: 'object-center',
  },
  {
    type: 'image',
    src: '/images/gallery-03.webp',
    title: 'Coordinación técnica integral',
    description:
      'Planificación, montaje y coordinación de todos los sistemas técnicos durante el evento.',
    category: 'Producción técnica',
    number: '03',
    channel: '112',
    universe: '02',
    layout: 'md:col-span-1',
    position: 'object-center',
  },
  {
    type: 'image',
    src: '/images/gallery-04.webp',
    title: 'Impacto visual en gran formato',
    description:
      'Pantallas LED para shows, eventos corporativos y producciones que necesitan una comunicación visual de alto impacto.',
    category: 'Pantallas LED y proyección',
    number: '04',
    channel: '206',
    universe: '02',
    layout: 'md:col-span-1',
    position: 'object-center',
  },
  {
    type: 'image',
    src: '/images/gallery-05.webp',
    title: 'Control en tiempo real',
    description:
      'Operación técnica de iluminación, sonido y sistemas durante todo el desarrollo del evento.',
    category: 'Operación en vivo',
    number: '05',
    channel: '320',
    universe: '03',
    layout: 'md:col-span-2',
    position: 'object-center',
  },
  {
    type: 'image',
    src: '/images/gallery-07.webp',
    title: 'La música marca el momento',
    description:
      'Selección musical, mezcla en vivo y acompañamiento de cada momento para mantener la energía del evento.',
    category: 'DJ Profesional',
    number: '06',
    channel: '408',
    universe: '04',
    layout: 'md:col-span-1',
    position: 'object-center',
  },
]

const disciplines = [
  {
    icon: Lightbulb,
    label: 'Iluminación',
  },
  {
    icon: Volume2,
    label: 'Sonido',
  },
  {
    icon: SlidersHorizontal,
    label: 'Operación',
  },
]

export default function Gallery() {
  const headerRef = useRef<HTMLDivElement | null>(null)

  const headerInView = useInView(headerRef, {
    once: true,
    margin: '-80px',
  })

  return (
    <section
      id="galeria"
      className="relative overflow-hidden bg-background py-[clamp(5rem,10vw,10rem)]"
    >
      {/* Glow ambiental */}
      <div className="pointer-events-none absolute left-0 top-1/4 h-[35rem] w-[35rem] -translate-x-1/2 rounded-full bg-warm/5 blur-[150px]" />

      <div className="pointer-events-none absolute right-0 top-2/3 h-[30rem] w-[30rem] translate-x-1/2 rounded-full bg-warm/4 blur-[160px]" />

      <div className="relative mx-auto w-[min(100%-2rem,90rem)] md:w-[min(100%-4rem,90rem)]">
        {/* Header */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 35 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{
            duration: 0.9,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="grid gap-10 border-b border-white/10 pb-12 lg:grid-cols-[1fr_0.8fr] lg:items-end"
        >
          <div>
            <div className="mb-6 flex items-center gap-4">
              <span className="h-px w-10 bg-warm" />

              <p className="font-body text-[0.7rem] font-medium leading-none tracking-[0.2em] text-warm uppercase">
                Trabajos seleccionados
              </p>
            </div>

            <h2 className="max-w-[10ch] font-display text-[clamp(4rem,9vw,8rem)] font-light leading-[0.82] tracking-[-0.05em] text-foreground">
              Producción técnica
              <span className="block italic text-foreground/55">
                para eventos.
              </span>
            </h2>
          </div>

          <div className="lg:justify-self-end">
            <p className="max-w-lg font-body text-sm font-light leading-7 text-muted-foreground md:text-base">
              Una selección de eventos donde combinamos DJ, sonido profesional,
              iluminación, pantallas LED y producción técnica para crear
              experiencias únicas.
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              {disciplines.map((discipline) => {
                const Icon = discipline.icon

                return (
                  <span
                    key={discipline.label}
                    className="flex items-center gap-2 border border-white/10 px-3 py-2 font-body text-[0.55rem] font-medium uppercase tracking-[0.17em] text-foreground/60"
                  >
                    <Icon size={13} strokeWidth={1.5} className="text-warm" />

                    {discipline.label}
                  </span>
                )
              })}
            </div>
          </div>
        </motion.div>

        {/* Gallery */}
        <div className="mt-12 grid auto-rows-[24rem] grid-cols-1 gap-4 md:auto-rows-[21rem] md:grid-cols-3 md:gap-5">
          {galleryItems.map((item, index) => (
            <GalleryCard
              key={`${item.number}-${item.title}`}
              item={item}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

function GalleryCard({ item, index }: { item: GalleryItem; index: number }) {
  const cardRef = useRef<HTMLElement | null>(null)

  const inView = useInView(cardRef, {
    once: true,
    margin: '-80px',
  })

  return (
    <motion.article
      ref={cardRef}
      initial={{
        opacity: 0,
        y: 40,
        scale: 0.985,
      }}
      animate={
        inView
          ? {
              opacity: 1,
              y: 0,
              scale: 1,
            }
          : {}
      }
      transition={{
        duration: 0.85,
        delay: Math.min(index * 0.08, 0.32),
        ease: [0.16, 1, 0.3, 1],
      }}
      className={`
      group relative isolate
      overflow-hidden bg-surface
      [transform:translateZ(0)]
      ${item.layout}
    `}
    >
      {/* Media */}
      <div className="absolute inset-0 overflow-hidden">
        {item.type === 'video' ? (
          <video
            src={item.src}
            poster={item.poster}
            muted
            loop
            autoPlay
            playsInline
            preload="metadata"
            aria-label={item.title}
            className={`h-full w-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.055] ${
              item.position ?? 'object-center'
            }`}
          />
        ) : (
          <Image
            src={item.src}
            alt={item.title}
            fill
            quality={90}
            className={`object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.055] ${
              item.position ?? 'object-center'
            }`}
            sizes={
              item.layout.includes('md:col-span-2')
                ? '(max-width: 768px) 100vw, 66vw'
                : '(max-width: 768px) 100vw, 33vw'
            }
          />
        )}
      </div>

      {/* Spotlight superior */}
      <div
        className="
          pointer-events-none
          absolute -top-[30%] left-1/2 z-[2]
          h-[65%] w-[75%]
          -translate-x-1/2
          bg-[radial-gradient(ellipse_at_center,rgba(255,225,195,0.16)_0%,rgba(244,161,92,0.05)_38%,transparent_72%)]
          opacity-25
          blur-[38px]
          transition-all duration-1000
          group-hover:scale-110
          group-hover:opacity-50
        "
      />

      {/* Overlays */}
      <div className="absolute inset-0 bg-black/15 transition-colors duration-700 group-hover:bg-black/30" />

      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,7,6,0.08)_10%,rgba(8,7,6,0.15)_42%,rgba(8,7,6,0.96)_100%)]" />

      <div className="absolute inset-0 opacity-0 ring-1 ring-inset ring-warm/45 transition-opacity duration-500 group-hover:opacity-100" />

      {/* Barrido cálido */}
      <div
        className="
          gallery-animate-light-sweep
          pointer-events-none
          absolute inset-y-0 -left-[45%] z-[3]
          w-[35%]
          skew-x-[-18deg]
          bg-[linear-gradient(90deg,transparent,rgba(255,224,192,0.09),transparent)]
          opacity-0
          mix-blend-screen
          group-hover:opacity-100
        "
      />

      {/* HUD técnico */}
      <TechnicalMediaHud
        number={item.number}
        category={item.category}
        type={item.type}
        channel={item.channel}
        universe={item.universe}
      />

      {/* Top content */}
      <div className="absolute inset-x-0 top-0 z-20 flex items-start justify-between p-5 transition-opacity duration-500 group-hover:opacity-0 md:p-6">
        <span className="font-body text-[0.55rem] font-medium uppercase tracking-[0.2em] text-white/55">
          {item.number}
        </span>

        {item.type === 'video' && (
          <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-black/20 text-white backdrop-blur-md">
            <Play size={14} strokeWidth={1.5} fill="currentColor" />
          </span>
        )}
      </div>

      {/* Bottom content */}
      <div className="absolute inset-x-0 bottom-0 z-20 p-5 md:p-7">
        <div className="flex items-end justify-between gap-6">
          <div className="max-w-xl">
            <p className="font-body text-[0.55rem] font-medium uppercase tracking-[0.2em] text-warm">
              {item.category}
            </p>

            <h3 className="mt-3 font-display text-3xl font-light leading-none tracking-[-0.025em] text-white md:text-4xl">
              {item.title}
            </h3>

            <p
              className="
                mt-3 max-w-md
                font-body text-xs font-light leading-6
                text-white/65
                transition-all duration-500
                md:translate-y-3
                md:text-sm md:text-white/0
                md:group-hover:translate-y-0
                md:group-hover:text-white/65
              "
            >
              {item.description}
            </p>
          </div>

          <span className="hidden h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/15 text-white/60 transition-all duration-500 group-hover:rotate-[-8deg] group-hover:border-warm group-hover:bg-warm group-hover:text-warm-foreground sm:flex">
            <ArrowDownRight size={16} strokeWidth={1.5} />
          </span>
        </div>
      </div>
    </motion.article>
  )
}
