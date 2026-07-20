'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { MessageSquarePlus } from 'lucide-react'

const testimonials = [
  {
    name: 'Martina y Luciano',
    event: 'Boda',
    comment:
      'Ale convirtió nuestra boda en algo que superó todas nuestras expectativas. Cada detalle fue cuidado con una atención que no imaginábamos posible. Fue como tener un amigo muy talentoso organizando el día más importante de nuestras vidas.',
  },
  {
    name: 'Carolina Rodríguez',
    event: 'Cumpleaños de 50',
    comment:
      'Quería algo íntimo y especial para mis 50. Ale entendió exactamente lo que buscaba sin que tuviera que explicarlo mucho. El resultado fue una noche mágica que todos mis invitados siguen recordando.',
  },
  {
    name: 'Grupo Beltrán S.A.',
    event: 'Gala Corporativa',
    comment:
      'Trabajamos con Ale para nuestra cena anual de empresa y el resultado fue impecable. Profesionalismo, creatividad y una ejecución perfecta. Lo volvemos a convocar sin dudarlo.',
  },
  {
    name: 'Sofía Méndez',
    event: 'Baby Shower',
    comment:
      'Nunca pensé que una reunión íntima podía sentirse tan especial. Ale logró que cada rincón contara algo. Sus ideas son siempre originales y el trato es increíblemente cálido.',
  },
  {
    name: 'Federación Cultural del Norte',
    event: 'Evento Cultural',
    comment:
      'Un placer trabajar con alguien tan comprometido con el resultado final. Ale aportó ideas que no habíamos considerado y que hicieron la diferencia. Muy recomendable.',
  },
]

export default function Testimonials() {
  const headerRef = useRef(null)
  const headerInView = useInView(headerRef, { once: true, margin: '-60px' })

  return (
    <section id="comentarios" className="py-24 md:py-36 px-6 md:px-12 max-w-7xl mx-auto">
      {/* Header */}
      <motion.div
        ref={headerRef}
        className="mb-16 md:mb-20 flex flex-col md:flex-row md:items-end md:justify-between gap-6"
        initial={{ opacity: 0, y: 30 }}
        animate={headerInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
      >
        <div>
          <p
            className="text-xs tracking-[0.25em] uppercase text-muted-foreground mb-4"
            style={{ fontFamily: 'var(--font-body)' }}
          >
            Experiencias
          </p>
          <h2
            className="text-5xl md:text-7xl font-light text-foreground leading-none"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Lo que dicen
          </h2>
        </div>

        {/* Share experience button — UI ready for future moderation */}
        <button
          className="flex items-center gap-3 px-6 py-3 border border-foreground text-foreground text-xs tracking-[0.12em] uppercase transition-all duration-300 hover:bg-foreground hover:text-background self-start md:self-auto"
          style={{ fontFamily: 'var(--font-body)' }}
          onClick={() => {
            /* TODO: integrate with backend/moderation flow */
            alert('Próximamente: formulario para compartir tu experiencia.')
          }}
        >
          <MessageSquarePlus size={15} strokeWidth={1.5} />
          Compartir experiencia
        </button>
      </motion.div>

      {/* Testimonials grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-border">
        {testimonials.map((t, i) => (
          <TestimonialCard key={t.name} testimonial={t} index={i} />
        ))}
      </div>
    </section>
  )
}

function TestimonialCard({
  testimonial,
  index,
}: {
  testimonial: (typeof testimonials)[0]
  index: number
}) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <motion.div
      ref={ref}
      className="bg-background p-8 md:p-10 flex flex-col gap-6"
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.08 }}
    >
      {/* Opening quote mark */}
      <span
        className="text-6xl font-light text-border leading-none select-none"
        style={{ fontFamily: 'var(--font-display)' }}
        aria-hidden="true"
      >
        &ldquo;
      </span>

      <p
        className="text-base md:text-lg text-foreground font-light leading-relaxed flex-1 -mt-4"
        style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic' }}
      >
        {testimonial.comment}
      </p>

      <div className="border-t border-border pt-5">
        <p
          className="text-sm font-medium text-foreground"
          style={{ fontFamily: 'var(--font-body)' }}
        >
          {testimonial.name}
        </p>
        <p
          className="text-xs text-muted-foreground tracking-[0.1em] uppercase mt-0.5"
          style={{ fontFamily: 'var(--font-body)' }}
        >
          {testimonial.event}
        </p>
      </div>
    </motion.div>
  )
}
