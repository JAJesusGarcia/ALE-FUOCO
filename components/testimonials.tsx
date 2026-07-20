'use client'

import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import {
  ArrowLeft,
  ArrowRight,
  MessageSquarePlus,
  Quote,
} from 'lucide-react'

const testimonials = [
  {
    name: 'Martina y Luciano',
    event: 'Boda',
    service: 'Iluminación y sonido',
    comment:
      'Ale entendió perfectamente el clima que queríamos lograr. La iluminación acompañó cada momento de la noche y el sonido fue impecable. Todo se sintió cuidado, elegante y muy natural.',
  },
  {
    name: 'Carolina Rodríguez',
    event: 'Cumpleaños de 50',
    service: 'Diseño de iluminación',
    comment:
      'El lugar cambió por completo. Ale logró darle profundidad, calidez y personalidad a cada espacio sin que se sintiera exagerado. La iluminación terminó siendo una parte central de la experiencia.',
  },
  {
    name: 'Grupo Beltrán S.A.',
    event: 'Gala corporativa',
    service: 'Producción técnica',
    comment:
      'Trabajamos con Ale para nuestra cena anual y la ejecución técnica fue impecable. Sonido claro, iluminación precisa y una operación muy profesional durante todo el evento.',
  },
  {
    name: 'Sofía Méndez',
    event: 'Evento social',
    service: 'Ambientación lumínica',
    comment:
      'Ale consiguió que un espacio bastante simple se sintiera completamente distinto. Cada luz tenía un sentido y todo se adaptó perfectamente al ritmo de la noche.',
  },
  {
    name: 'Federación Cultural del Norte',
    event: 'Evento cultural',
    service: 'Sonido y operación',
    comment:
      'Fue un placer trabajar con alguien tan comprometido con el resultado. Ale resolvió cada necesidad técnica con criterio, tranquilidad y mucha atención durante toda la jornada.',
  },
]

export default function Testimonials() {
  const sectionRef = useRef<HTMLElement | null>(null)
  const carouselRef = useRef<HTMLDivElement | null>(null)

  const inView = useInView(sectionRef, {
    once: true,
    margin: '-80px',
  })

  const [activeIndex, setActiveIndex] = useState(0)

  const scrollToCard = (index: number) => {
    const carousel = carouselRef.current

    if (!carousel) return

    const cards = Array.from(
      carousel.querySelectorAll<HTMLElement>('[data-testimonial-card]'),
    )

    const safeIndex = Math.min(
      Math.max(index, 0),
      cards.length - 1,
    )

    cards[safeIndex]?.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'start',
    })

    setActiveIndex(safeIndex)
  }

  const previous = () => {
    scrollToCard(
      activeIndex === 0
        ? testimonials.length - 1
        : activeIndex - 1,
    )
  }

  const next = () => {
    scrollToCard(
      activeIndex === testimonials.length - 1
        ? 0
        : activeIndex + 1,
    )
  }

  const handleScroll = () => {
    const carousel = carouselRef.current

    if (!carousel) return

    const cards = Array.from(
      carousel.querySelectorAll<HTMLElement>('[data-testimonial-card]'),
    )

    const carouselLeft = carousel.getBoundingClientRect().left

    let closestIndex = 0
    let closestDistance = Number.POSITIVE_INFINITY

    cards.forEach((card, index) => {
      const distance = Math.abs(
        card.getBoundingClientRect().left - carouselLeft,
      )

      if (distance < closestDistance) {
        closestDistance = distance
        closestIndex = index
      }
    })

    setActiveIndex(closestIndex)
  }

  return (
    <section
      ref={sectionRef}
      id="comentarios"
      className="relative overflow-hidden bg-background section-spacing"
    >
      <div className="pointer-events-none absolute right-0 top-0 h-[34rem] w-[34rem] rounded-full bg-warm/5 blur-[150px]" />

      <div className="site-container relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{
            duration: 0.9,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="grid gap-10 border-b border-white/10 pb-10 md:grid-cols-[1fr_auto] md:items-end md:pb-14"
        >
          <div>
            <div className="mb-6 flex items-center gap-4">
              <span className="h-px w-10 bg-warm" />

              <p className="section-eyebrow">
                Experiencias
              </p>
            </div>

            <h2 className="max-w-[10ch] font-display text-[clamp(3.8rem,8vw,7.5rem)] font-light leading-[0.85] tracking-[-0.045em] text-foreground">
              Lo que queda
              <span className="block italic text-foreground/55">
                después del show.
              </span>
            </h2>
          </div>

          <div className="flex flex-col items-start gap-5 md:items-end">
            <p className="max-w-sm font-body text-sm font-light leading-7 text-muted-foreground md:text-right">
              Opiniones sobre el diseño, la técnica y la experiencia de trabajar
              juntos.
            </p>

            <button
              type="button"
              onClick={() => {
                document
                  .querySelector('#contacto')
                  ?.scrollIntoView({
                    behavior: 'smooth',
                  })
              }}
              className="group flex items-center gap-3 font-body text-[0.6rem] font-medium uppercase tracking-[0.18em] text-foreground/65 transition-colors duration-300 hover:text-warm"
            >
              <MessageSquarePlus
                size={15}
                strokeWidth={1.5}
              />

              Contar una experiencia
            </button>
          </div>
        </motion.div>

        {/* Controls */}
        <div className="mt-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="font-display text-3xl font-light text-foreground">
              {String(activeIndex + 1).padStart(2, '0')}
            </span>

            <span className="h-px w-8 bg-white/15" />

            <span className="font-body text-xs text-muted-foreground">
              {String(testimonials.length).padStart(2, '0')}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={previous}
              aria-label="Testimonio anterior"
              className="focus-ring group flex h-11 w-11 items-center justify-center rounded-full border border-white/10 text-foreground/60 transition-all duration-300 hover:border-warm hover:text-warm"
            >
              <ArrowLeft
                size={16}
                strokeWidth={1.5}
                className="transition-transform duration-300 group-hover:-translate-x-0.5"
              />
            </button>

            <button
              type="button"
              onClick={next}
              aria-label="Siguiente testimonio"
              className="focus-ring group flex h-11 w-11 items-center justify-center rounded-full border border-white/10 text-foreground/60 transition-all duration-300 hover:border-warm hover:text-warm"
            >
              <ArrowRight
                size={16}
                strokeWidth={1.5}
                className="transition-transform duration-300 group-hover:translate-x-0.5"
              />
            </button>
          </div>
        </div>

        {/* Carousel */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{
            duration: 0.9,
            delay: 0.15,
            ease: [0.16, 1, 0.3, 1],
          }}
          ref={carouselRef}
          onScroll={handleScroll}
          className="scrollbar-hidden mt-8 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4 md:gap-6"
        >
          {testimonials.map((testimonial, index) => (
            <article
              key={`${testimonial.name}-${testimonial.event}`}
              data-testimonial-card
              className="group relative flex min-h-[31rem] w-[88%] shrink-0 snap-start flex-col justify-between overflow-hidden border border-white/10 bg-surface p-7 transition-colors duration-500 hover:border-warm/35 sm:w-[72%] md:min-h-[34rem] md:w-[54%] md:p-10 lg:w-[42%] xl:w-[36%]"
            >
              <div className="absolute right-6 top-6 font-display text-[7rem] leading-none text-white/[0.025] transition-colors duration-500 group-hover:text-warm/[0.045] md:text-[10rem]">
                {String(index + 1).padStart(2, '0')}
              </div>

              <div className="relative">
                <Quote
                  size={30}
                  strokeWidth={1}
                  className="text-warm"
                />

                <p className="mt-10 font-display text-[1.75rem] font-light italic leading-[1.25] text-foreground/88 md:text-[2rem]">
                  {testimonial.comment}
                </p>
              </div>

              <div className="relative mt-12 border-t border-white/10 pt-6">
                <div className="flex items-end justify-between gap-5">
                  <div>
                    <p className="font-body text-sm font-medium text-foreground">
                      {testimonial.name}
                    </p>

                    <p className="mt-1 font-body text-[0.58rem] uppercase tracking-[0.18em] text-muted-foreground">
                      {testimonial.event}
                    </p>
                  </div>

                  <span className="max-w-32 text-right font-body text-[0.55rem] uppercase leading-5 tracking-[0.15em] text-warm">
                    {testimonial.service}
                  </span>
                </div>
              </div>
            </article>
          ))}
        </motion.div>

        {/* Pagination */}
        <div className="mt-5 flex items-center gap-2">
          {testimonials.map((testimonial, index) => (
            <button
              key={`${testimonial.name}-indicator`}
              type="button"
              onClick={() => scrollToCard(index)}
              aria-label={`Ir al testimonio ${index + 1}`}
              className={`h-px transition-all duration-500 ${
                activeIndex === index
                  ? 'w-12 bg-warm'
                  : 'w-5 bg-white/15 hover:bg-white/35'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

