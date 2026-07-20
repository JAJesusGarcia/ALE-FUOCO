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
    src: '/images/gallery-1.webp',
    title: 'Diseño para una noche única',
    description:
      'Iluminación ambiental y escénica diseñada para acompañar cada momento del evento.',
    category: 'Diseño de iluminación',
    number: '01',
    channel: '001',
    universe: '01',
    layout: 'md:col-span-2 md:row-span-2',
    position: 'object-center',
  },
  {
    type: 'image',
    src: '/images/gallery-2.webp',
    title: 'Atmósfera cálida',
    description:
      'Temperatura, intensidad y dirección de iluminacion pensadas para transformar el espacio.',
    category: 'Ambientación lumínica',
    number: '02',
    channel: '024',
    universe: '01',
    layout: 'md:col-span-1',
    position: 'object-center',
  },
  {
    type: 'image',
    src: '/images/gallery-3.webp',
    title: 'Producción corporativa',
    description:
      'Diseño técnico preciso para presentaciones, galas y experiencias de marca.',
    category: 'Producción técnica',
    number: '03',
    channel: '112',
    universe: '02',
    layout: 'md:col-span-1',
    position: 'object-center',
  },
  {
    type: 'image',
    src: '/images/gallery-4.webp',
    title: 'Luz integrada al espacio',
    description:
      'Iluminación decorativa y funcional adaptada a la arquitectura y al entorno.',
    category: 'Iluminación',
    number: '04',
    channel: '206',
    universe: '02',
    layout: 'md:col-span-1',
    position: 'object-center',
  },
  {
    type: 'image',
    src: '/images/gallery-5.webp',
    title: 'Escena y movimiento',
    description:
      'Operación de luces sincronizada con el ritmo, la música y los momentos principales.',
    category: 'Operación en vivo',
    number: '05',
    channel: '320',
    universe: '03',
    layout: 'md:col-span-2',
    position: 'object-center',
  },
  {
    type: 'image',
    src: '/images/gallery-6.webp',
    title: 'Sonido que acompaña',
    description:
      'Cobertura clara y equilibrada para que cada palabra y cada canción lleguen correctamente.',
    category: 'Sonido',
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
      className="relative overflow-hidden bg-background section-spacing"
    >
      {/* Glow ambiental */}
      <div className="pointer-events-none absolute left-0 top-1/4 h-[35rem] w-[35rem] -translate-x-1/2 rounded-full bg-warm/5 blur-[150px]" />

      <div className="pointer-events-none absolute right-0 top-2/3 h-[30rem] w-[30rem] translate-x-1/2 rounded-full bg-warm/4 blur-[160px]" />

      <div className="site-container relative">
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

              <p className="section-eyebrow">
                Trabajos seleccionados
              </p>
            </div>

            <h2 className="max-w-[10ch] font-display text-[clamp(4rem,9vw,8rem)] font-light leading-[0.82] tracking-[-0.05em] text-foreground">
              Iluminación, sonido

              <span className="block italic text-foreground/55">
                y movimiento.
              </span>
            </h2>
          </div>

          <div className="lg:justify-self-end">
            <p className="max-w-lg font-body text-sm font-light leading-7 text-muted-foreground md:text-base">
              Una selección de espacios transformados mediante diseño de
              iluminación, sonido profesional y operación técnica en vivo.
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              {disciplines.map((discipline) => {
                const Icon = discipline.icon

                return (
                  <span
                    key={discipline.label}
                    className="flex items-center gap-2 border border-white/10 px-3 py-2 font-body text-[0.55rem] font-medium uppercase tracking-[0.17em] text-foreground/60"
                  >
                    <Icon
                      size={13}
                      strokeWidth={1.5}
                      className="text-warm"
                    />

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

function GalleryCard({
  item,
  index,
}: {
  item: GalleryItem
  index: number
}) {
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
      className={`gallery-technical-card group relative isolate overflow-hidden bg-surface ${item.layout}`}
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
      <div className="gallery-card-spotlight" />

      {/* Overlays */}
      <div className="absolute inset-0 bg-black/15 transition-colors duration-700 group-hover:bg-black/30" />

      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,7,6,0.08)_10%,rgba(8,7,6,0.15)_42%,rgba(8,7,6,0.96)_100%)]" />

      <div className="absolute inset-0 opacity-0 ring-1 ring-inset ring-warm/45 transition-opacity duration-500 group-hover:opacity-100" />

      {/* Barrido cálido */}
      <div className="gallery-card-light-sweep" />

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
            <Play
              size={14}
              strokeWidth={1.5}
              fill="currentColor"
            />
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

            <p className="mt-3 max-w-md translate-y-3 font-body text-xs font-light leading-6 text-white/0 transition-all duration-500 group-hover:translate-y-0 group-hover:text-white/65 md:text-sm">
              {item.description}
            </p>
          </div>

          <span className="hidden h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/15 text-white/60 transition-all duration-500 group-hover:rotate-[-8deg] group-hover:border-warm group-hover:bg-warm group-hover:text-warm-foreground sm:flex">
            <ArrowDownRight
              size={16}
              strokeWidth={1.5}
            />
          </span>
        </div>
      </div>
    </motion.article>
  )
}