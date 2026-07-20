'use client'

import {
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'

import {
  AnimatePresence,
  motion,
  useInView,
} from 'framer-motion'

import {
  ArrowLeft,
  ArrowRight,
  Check,
  Loader2,
  Send,
  Star,
} from 'lucide-react'

import type {
  PublicTestimonial,
} from '@/lib/testimonials/types'

const initialTestimonials: PublicTestimonial[] = [
  {
    id: 'martina-luciano',
    name: 'Martina y Luciano',
    event: 'Boda',
    service: 'Iluminación y sonido',
    rating: 5,
    createdAt: '2026-01-01T00:00:00.000Z',
    comment:
      'Ale entendió perfectamente el clima que queríamos lograr. La iluminación acompañó cada momento de la noche y el sonido fue impecable. Todo se sintió cuidado, elegante y muy natural.',
  },
  {
    id: 'carolina-rodriguez',
    name: 'Carolina Rodríguez',
    event: 'Cumpleaños de 50',
    service: 'Diseño de iluminación',
    rating: 5,
    createdAt: '2026-01-02T00:00:00.000Z',
    comment:
      'El lugar cambió por completo. Ale logró darle profundidad, calidez y personalidad a cada espacio sin que se sintiera exagerado. La iluminación terminó siendo una parte central de la experiencia.',
  },
  {
    id: 'grupo-beltran',
    name: 'Grupo Beltrán S.A.',
    event: 'Gala corporativa',
    service: 'Producción técnica',
    rating: 5,
    createdAt: '2026-01-03T00:00:00.000Z',
    comment:
      'Trabajamos con Ale para nuestra cena anual y la ejecución técnica fue impecable. Sonido claro, iluminación precisa y una operación muy profesional durante todo el evento.',
  },
  {
    id: 'sofia-mendez',
    name: 'Sofía Méndez',
    event: 'Evento social',
    service: 'Ambientación lumínica',
    rating: 5,
    createdAt: '2026-01-04T00:00:00.000Z',
    comment:
      'Ale consiguió que un espacio bastante simple se sintiera completamente distinto. Cada luz tenía un sentido y todo se adaptó perfectamente al ritmo de la noche.',
  },
  {
    id: 'federacion-cultural',
    name: 'Federación Cultural del Norte',
    event: 'Evento cultural',
    service: 'Sonido y operación',
    rating: 5,
    createdAt: '2026-01-05T00:00:00.000Z',
    comment:
      'Fue un placer trabajar con alguien tan comprometido con el resultado. Ale resolvió cada necesidad técnica con criterio, tranquilidad y mucha atención durante toda la jornada.',
  },
]

interface FormState {
  name: string
  event: string
  service: string
  comment: string
  rating: number
  website: string
}

const emptyForm: FormState = {
  name: '',
  event: '',
  service: '',
  comment: '',
  rating: 5,
  website: '',
}

export default function Testimonials() {
  const sectionRef =
    useRef<HTMLElement | null>(null)

  const startedAtRef = useRef(Date.now())

  const inView = useInView(sectionRef, {
    once: true,
    margin: '-80px',
  })

  const [dynamicTestimonials, setDynamicTestimonials] =
    useState<PublicTestimonial[]>([])

  const [activeIndex, setActiveIndex] =
    useState(0)

  const [form, setForm] =
    useState<FormState>(emptyForm)

  const [isSubmitting, setIsSubmitting] =
    useState(false)

  const [submitStatus, setSubmitStatus] =
    useState<
      | {
          type: 'success' | 'error'
          message: string
        }
      | null
    >(null)

  const testimonials = useMemo(() => {
    const existingIds = new Set(
      initialTestimonials.map(
        (testimonial) => testimonial.id,
      ),
    )

    return [
      ...initialTestimonials,
      ...dynamicTestimonials.filter(
        (testimonial) =>
          !existingIds.has(testimonial.id),
      ),
    ]
  }, [dynamicTestimonials])

  useEffect(() => {
    const controller = new AbortController()

    async function loadTestimonials() {
      try {
        const response = await fetch(
          '/api/testimonials',
          {
            cache: 'no-store',
            signal: controller.signal,
          },
        )

        if (!response.ok) return

        const data = (await response.json()) as {
          testimonials?: PublicTestimonial[]
        }

        setDynamicTestimonials(
          data.testimonials ?? [],
        )
      } catch (error) {
        if (
          error instanceof Error &&
          error.name === 'AbortError'
        ) {
          return
        }

        console.error(
          'No se pudieron cargar los testimonios:',
          error,
        )
      }
    }

    void loadTestimonials()

    return () => controller.abort()
  }, [])

  useEffect(() => {
    if (activeIndex >= testimonials.length) {
      setActiveIndex(0)
    }
  }, [activeIndex, testimonials.length])

  const activeTestimonial =
    testimonials[activeIndex]

  const previous = () => {
    setActiveIndex((current) =>
      current === 0
        ? testimonials.length - 1
        : current - 1,
    )
  }

  const next = () => {
    setActiveIndex((current) =>
      current === testimonials.length - 1
        ? 0
        : current + 1,
    )
  }

  const updateField = <
    Key extends keyof FormState,
  >(
    key: Key,
    value: FormState[Key],
  ) => {
    setForm((current) => ({
      ...current,
      [key]: value,
    }))
  }

  const submitTestimonial = async (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault()

    if (isSubmitting) return

    setIsSubmitting(true)
    setSubmitStatus(null)

    try {
      const response = await fetch(
        '/api/testimonials',
        {
          method: 'POST',
          headers: {
            'Content-Type':
              'application/json',
          },
          body: JSON.stringify({
            ...form,
            startedAt:
              startedAtRef.current,
          }),
        },
      )

      const data = (await response.json()) as {
        message?: string
        error?: string
      }

      if (!response.ok) {
        throw new Error(
          data.error ??
            'No fue posible enviar el comentario.',
        )
      }

      setSubmitStatus({
        type: 'success',
        message:
          data.message ??
          'Tu experiencia fue enviada.',
      })

      setForm(emptyForm)
      startedAtRef.current = Date.now()
    } catch (error) {
      setSubmitStatus({
        type: 'error',
        message:
          error instanceof Error
            ? error.message
            : 'Ocurrió un error inesperado.',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!activeTestimonial) {
    return null
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
          initial={{
            opacity: 0,
            y: 35,
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

          <p className="max-w-sm font-body text-sm font-light leading-7 text-muted-foreground md:text-right">
            Historias reales sobre el diseño,
            la técnica y la experiencia de
            construir cada evento juntos.
          </p>
        </motion.div>

        {/* Testimonial editorial */}
        <motion.div
          initial={{
            opacity: 0,
            y: 30,
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
            duration: 0.9,
            delay: 0.15,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="relative mt-12 min-h-[34rem] overflow-hidden border-y border-white/10 md:min-h-[40rem]"
        >
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute left-1/2 top-1/2 h-[28rem] w-[28rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-warm/[0.035] blur-[130px]" />

            <span className="absolute -left-5 -top-20 font-display text-[22rem] font-light italic leading-none text-white/[0.018] md:text-[34rem]">
              “
            </span>

            <span className="absolute -bottom-48 right-5 font-display text-[22rem] font-light italic leading-none text-white/[0.018] md:text-[34rem]">
              ”
            </span>
          </div>

          <div className="relative flex min-h-[34rem] flex-col justify-between px-1 py-10 sm:px-8 md:min-h-[40rem] md:px-16 md:py-16 lg:px-24">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 font-body text-[0.56rem] uppercase tracking-[0.2em] text-muted-foreground">
                <span className="h-1.5 w-1.5 rounded-full bg-warm shadow-[0_0_12px_rgba(244,161,92,0.65)]" />

                Client feedback
              </div>

              <div className="font-body text-[0.58rem] tracking-[0.18em] text-muted-foreground">
                {String(activeIndex + 1).padStart(
                  2,
                  '0',
                )}

                <span className="mx-3 text-white/15">
                  /
                </span>

                {String(testimonials.length).padStart(
                  2,
                  '0',
                )}
              </div>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeTestimonial.id}
                initial={{
                  opacity: 0,
                  y: 22,
                  filter: 'blur(8px)',
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                  filter: 'blur(0px)',
                }}
                exit={{
                  opacity: 0,
                  y: -18,
                  filter: 'blur(8px)',
                }}
                transition={{
                  duration: 0.65,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="mx-auto my-14 w-full max-w-5xl"
              >
                <p className="text-center font-display text-[clamp(2rem,4.2vw,4.6rem)] font-light italic leading-[1.08] tracking-[-0.025em] text-foreground/90">
                  “{activeTestimonial.comment}”
                </p>

                <div className="mt-12 flex justify-center gap-1">
                  {Array.from({
                    length:
                      activeTestimonial.rating,
                  }).map((_, index) => (
                    <Star
                      key={index}
                      size={12}
                      strokeWidth={1}
                      className="fill-warm text-warm"
                    />
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="flex flex-col gap-7 border-t border-white/10 pt-7 md:flex-row md:items-end md:justify-between">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`${activeTestimonial.id}-author`}
                  initial={{
                    opacity: 0,
                    x: -12,
                  }}
                  animate={{
                    opacity: 1,
                    x: 0,
                  }}
                  exit={{
                    opacity: 0,
                    x: 12,
                  }}
                  transition={{
                    duration: 0.4,
                  }}
                >
                  <p className="font-body text-sm font-medium text-foreground">
                    {activeTestimonial.name}
                  </p>

                  <div className="mt-3 flex flex-wrap items-center gap-3 font-body text-[0.56rem] uppercase tracking-[0.17em] text-muted-foreground">
                    <span>
                      {activeTestimonial.event}
                    </span>

                    <span className="h-px w-5 bg-white/15" />

                    <span className="text-warm">
                      {activeTestimonial.service}
                    </span>
                  </div>
                </motion.div>
              </AnimatePresence>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={previous}
                  aria-label="Testimonio anterior"
                  className="focus-ring group flex items-center gap-3 py-2 font-body text-[0.56rem] uppercase tracking-[0.18em] text-muted-foreground transition-colors hover:text-warm"
                >
                  <ArrowLeft
                    size={15}
                    strokeWidth={1.4}
                    className="transition-transform group-hover:-translate-x-1"
                  />

                  Anterior
                </button>

                <span className="h-5 w-px bg-white/10" />

                <button
                  type="button"
                  onClick={next}
                  aria-label="Siguiente testimonio"
                  className="focus-ring group flex items-center gap-3 py-2 font-body text-[0.56rem] uppercase tracking-[0.18em] text-muted-foreground transition-colors hover:text-warm"
                >
                  Siguiente

                  <ArrowRight
                    size={15}
                    strokeWidth={1.4}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Indicadores */}
        <div className="mt-5 flex items-center justify-center gap-2">
          {testimonials.map(
            (testimonial, index) => (
              <button
                key={`${testimonial.id}-indicator`}
                type="button"
                onClick={() =>
                  setActiveIndex(index)
                }
                aria-label={`Ir al testimonio ${
                  index + 1
                }`}
                className={`h-px transition-all duration-500 ${
                  activeIndex === index
                    ? 'w-12 bg-warm'
                    : 'w-5 bg-white/15 hover:bg-white/35'
                }`}
              />
            ),
          )}
        </div>

        {/* Formulario */}
        <motion.div
          initial={{
            opacity: 0,
            y: 35,
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
            duration: 0.9,
            delay: 0.25,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="mt-24 grid gap-14 border-t border-white/10 pt-16 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24"
        >
          <div>
            <p className="section-eyebrow">
              Share your experience
            </p>

            <h3 className="mt-7 max-w-[9ch] font-display text-[clamp(3rem,5vw,5.5rem)] font-light leading-[0.9] tracking-[-0.04em] text-foreground">
              ¿Trabajaste
              <span className="block italic text-foreground/50">
                con Ale?
              </span>
            </h3>

            <p className="mt-8 max-w-sm font-body text-sm font-light leading-7 text-muted-foreground">
              Contanos cómo fue la experiencia.
              El comentario será revisado antes
              de publicarse.
            </p>
          </div>

          <form
            onSubmit={submitTestimonial}
            className="grid gap-8"
          >
            {/* Honeypot oculto */}
            <div
              className="absolute -left-[9999px]"
              aria-hidden="true"
            >
              <label htmlFor="testimonial-website">
                Website
              </label>

              <input
                id="testimonial-website"
                type="text"
                tabIndex={-1}
                autoComplete="off"
                value={form.website}
                onChange={(event) =>
                  updateField(
                    'website',
                    event.target.value,
                  )
                }
              />
            </div>

            <div className="grid gap-8 md:grid-cols-2">
              <label className="grid gap-3">
                <span className="font-body text-[0.56rem] uppercase tracking-[0.18em] text-muted-foreground">
                  Nombre
                </span>

                <input
                  type="text"
                  required
                  minLength={2}
                  maxLength={80}
                  value={form.name}
                  onChange={(event) =>
                    updateField(
                      'name',
                      event.target.value,
                    )
                  }
                  placeholder="Tu nombre"
                  className="focus-ring border-0 border-b border-white/15 bg-transparent px-0 py-4 font-body text-base text-foreground outline-none transition-colors placeholder:text-white/20 focus:border-warm"
                />
              </label>

              <label className="grid gap-3">
                <span className="font-body text-[0.56rem] uppercase tracking-[0.18em] text-muted-foreground">
                  Tipo de evento
                </span>

                <input
                  type="text"
                  required
                  minLength={2}
                  maxLength={80}
                  value={form.event}
                  onChange={(event) =>
                    updateField(
                      'event',
                      event.target.value,
                    )
                  }
                  placeholder="Boda, gala, cumpleaños..."
                  className="focus-ring border-0 border-b border-white/15 bg-transparent px-0 py-4 font-body text-base text-foreground outline-none transition-colors placeholder:text-white/20 focus:border-warm"
                />
              </label>
            </div>

            <label className="grid gap-3">
              <span className="font-body text-[0.56rem] uppercase tracking-[0.18em] text-muted-foreground">
                Servicio
              </span>

              <input
                type="text"
                maxLength={100}
                value={form.service}
                onChange={(event) =>
                  updateField(
                    'service',
                    event.target.value,
                  )
                }
                placeholder="Iluminación, sonido, producción técnica..."
                className="focus-ring border-0 border-b border-white/15 bg-transparent px-0 py-4 font-body text-base text-foreground outline-none transition-colors placeholder:text-white/20 focus:border-warm"
              />
            </label>

            <fieldset className="grid gap-4">
              <legend className="font-body text-[0.56rem] uppercase tracking-[0.18em] text-muted-foreground">
                Calificación
              </legend>

              <div className="flex gap-2">
                {Array.from({
                  length: 5,
                }).map((_, index) => {
                  const value = index + 1
                  const active =
                    value <= form.rating

                  return (
                    <button
                      key={value}
                      type="button"
                      onClick={() =>
                        updateField(
                          'rating',
                          value,
                        )
                      }
                      aria-label={`${value} estrellas`}
                      className="focus-ring p-1"
                    >
                      <Star
                        size={18}
                        strokeWidth={1.2}
                        className={
                          active
                            ? 'fill-warm text-warm'
                            : 'text-white/20'
                        }
                      />
                    </button>
                  )
                })}
              </div>
            </fieldset>

            <label className="grid gap-3">
              <div className="flex items-center justify-between">
                <span className="font-body text-[0.56rem] uppercase tracking-[0.18em] text-muted-foreground">
                  Tu experiencia
                </span>

                <span className="font-body text-[0.52rem] tracking-[0.12em] text-white/25">
                  {form.comment.length} / 700
                </span>
              </div>

              <textarea
                required
                minLength={20}
                maxLength={700}
                rows={6}
                value={form.comment}
                onChange={(event) =>
                  updateField(
                    'comment',
                    event.target.value,
                  )
                }
                placeholder="Contanos cómo fue trabajar con Ale..."
                className="focus-ring resize-none border border-white/10 bg-surface/50 p-5 font-body text-base font-light leading-7 text-foreground outline-none transition-colors placeholder:text-white/20 focus:border-warm/60"
              />
            </label>

            <div className="flex flex-col gap-5 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
              <p className="max-w-sm font-body text-[0.58rem] font-light leading-5 text-muted-foreground">
                Al enviar aceptás que el comentario
                pueda publicarse luego de ser
                revisado.
              </p>

              <button
                type="submit"
                disabled={isSubmitting}
                className="focus-ring group inline-flex min-w-44 items-center justify-center gap-3 bg-warm px-7 py-4 font-body text-[0.58rem] font-semibold uppercase tracking-[0.18em] text-background transition-all hover:bg-foreground disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <Loader2
                      size={15}
                      className="animate-spin"
                    />

                    Enviando
                  </>
                ) : (
                  <>
                    Enviar experiencia

                    <Send
                      size={14}
                      strokeWidth={1.5}
                      className="transition-transform group-hover:translate-x-1"
                    />
                  </>
                )}
              </button>
            </div>

            <AnimatePresence>
              {submitStatus && (
                <motion.div
                  initial={{
                    opacity: 0,
                    y: 8,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  exit={{
                    opacity: 0,
                    y: -8,
                  }}
                  className={`flex items-start gap-3 border p-4 font-body text-sm leading-6 ${
                    submitStatus.type ===
                    'success'
                      ? 'border-warm/30 bg-warm/5 text-foreground'
                      : 'border-red-400/25 bg-red-400/5 text-red-200'
                  }`}
                >
                  {submitStatus.type ===
                    'success' && (
                    <Check
                      size={17}
                      className="mt-1 shrink-0 text-warm"
                    />
                  )}

                  <span>
                    {submitStatus.message}
                  </span>
                </motion.div>
              )}
            </AnimatePresence>
          </form>
        </motion.div>
      </div>
    </section>
  )
}