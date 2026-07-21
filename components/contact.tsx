'use client'

import {
  type ChangeEvent,
  type FormEvent,
  type ReactNode,
  useRef,
  useState,
} from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import {
  ArrowUpRight,
  Camera,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
} from 'lucide-react'

const WHATSAPP_NUMBER = '5493416679247'
const PHONE_NUMBER = '+543416679247'

const contactInfo = [
  {
    icon: MessageCircle,
    label: 'WhatsApp',
    value: '+54 9 341 667 9247',
    href: `https://wa.me/${WHATSAPP_NUMBER}`,
    external: true,
  },
  {
    icon: Phone,
    label: 'Teléfono',
    value: '+54 341 667 9247',
    href: `tel:${PHONE_NUMBER}`,
    external: false,
  },
  {
    icon: Mail,
    label: 'Email',
    value: 'alejandrofuoco@hotmail.com',
    href: 'mailto:alejandrofuoco@hotmail.com',
    external: false,
  },
  {
    icon: Camera,
    label: 'Instagram',
    value: '@ale_fuoco',
    href: 'https://www.instagram.com/ale_fuoco/',
    external: true,
  },
]

const serviceOptions = [
  'Diseño de iluminación',
  'Sonido',
  'Iluminación y sonido',
  'Operación técnica',
  'Evento corporativo',
  'Evento social',
  'Otro proyecto',
]

interface ContactForm {
  name: string
  email: string
  phone: string
  service: string
  message: string
}

const initialForm: ContactForm = {
  name: '',
  email: '',
  phone: '',
  service: '',
  message: '',
}

const motionEase = [0.16, 1, 0.3, 1] as const

const fieldClassName = `
  w-full
  border-0 border-b border-white/15
  bg-transparent
  px-0 py-3
  font-body text-sm
  text-foreground
  outline-none
  transition-colors duration-300
  placeholder:text-muted-foreground/55
  hover:border-white/30
  focus:border-warm
  focus:outline-none
  focus:ring-0
  disabled:cursor-not-allowed
  disabled:opacity-50
`

export default function Contact() {
  const sectionRef = useRef<HTMLElement | null>(null)
  const shouldReduceMotion = useReducedMotion()

  const inView = useInView(sectionRef, {
    once: true,
    margin: '-80px',
  })

  const [form, setForm] = useState<ContactForm>(initialForm)

  const handleChange = (
    event: ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = event.target

    setForm((current) => ({
      ...current,
      [name]: value,
    }))
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const message = [
      'Hola Ale, te escribo desde la página web.',
      '',
      `Nombre: ${form.name}`,
      `Email: ${form.email}`,
      form.phone ? `Teléfono: ${form.phone}` : '',
      form.service ? `Servicio: ${form.service}` : '',
      '',
      `Proyecto: ${form.message}`,
    ]
      .filter(Boolean)
      .join('\n')

    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
      message,
    )}`

    window.open(whatsappUrl, '_blank', 'noopener,noreferrer')
  }

  const informationInitial = shouldReduceMotion
    ? false
    : {
        opacity: 0,
        y: 35,
      }

  const formInitial = shouldReduceMotion
    ? false
    : {
        opacity: 0,
        y: 35,
      }

  return (
    <section
      ref={sectionRef}
      id="contacto"
      className="
        relative overflow-hidden
        border-t border-white/10
        bg-[oklch(0.095_0.007_55)]
      "
    >
      {/* Luces ambientales desactivadas en móvil */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute -left-48 top-20
          hidden size-[32rem]
          rounded-full
          bg-warm/8
          blur-[150px]
          md:block
        "
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute -right-48 bottom-0
          hidden size-[28rem]
          rounded-full
          bg-white/4
          blur-[140px]
          lg:block
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
            lg:grid-cols-[0.9fr_1.1fr]
            lg:gap-24
            xl:gap-32
          "
        >
          {/* Información */}
          <motion.div
            initial={informationInitial}
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
          >
            <div className="mb-8 flex items-center gap-4">
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
                Contacto
              </p>
            </div>

            <h2
              className="
                max-w-[8ch]
                font-display
                text-[clamp(4rem,8vw,8rem)]
                font-light
                leading-[0.82]
                tracking-[-0.05em]
                text-foreground
              "
            >
              Hablemos de
              <span className="block italic text-foreground/55">
                tu próximo evento.
              </span>
            </h2>

            <p
              className="
                mt-8 max-w-lg
                font-body
                text-base font-light
                leading-8
                text-muted-foreground
                md:text-lg
              "
            >
              Contanos tu idea y diseñaremos una propuesta técnica a medida con
              DJ, sonido profesional, iluminación, pantallas LED y producción
              integral para que cada detalle salga como fue pensado.
            </p>

            <div className="mt-10 border-l border-warm/60 pl-5">
              <p
                className="
                  font-display
                  text-xl font-light italic
                  leading-relaxed
                  text-foreground/75
                "
              >
                "Los mejores eventos son aquellos donde la técnica simplemente
                hace que todo funcione."
              </p>
            </div>

            <ul
              className="
                mt-12 grid gap-3
                sm:grid-cols-2
                lg:grid-cols-1
                xl:grid-cols-2
              "
            >
              {contactInfo.map((item) => {
                const Icon = item.icon

                return (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      target={item.external ? '_blank' : undefined}
                      rel={item.external ? 'noopener noreferrer' : undefined}
                      aria-label={`${item.label}: ${item.value}`}
                      className="
                        group flex min-h-20
                        items-center gap-4
                        border border-white/10
                        bg-white/[0.025]
                        px-4 py-4
                        transition-colors duration-300
                        hover:border-warm/50
                        hover:bg-white/[0.045]
                        focus-visible:border-warm
                        focus-visible:outline-none
                        focus-visible:ring-2
                        focus-visible:ring-warm/45
                        focus-visible:ring-offset-2
                        focus-visible:ring-offset-background
                      "
                    >
                      <span
                        className="
                          flex size-10 shrink-0
                          items-center justify-center
                          rounded-full
                          border border-white/10
                          text-warm
                          transition-colors duration-300
                          md:group-hover:border-warm/50
                          md:group-hover:bg-warm
                          md:group-hover:text-warm-foreground
                        "
                      >
                        <Icon size={16} strokeWidth={1.5} aria-hidden="true" />
                      </span>

                      <span className="min-w-0">
                        <span
                          className="
                            block
                            font-body
                            text-[0.56rem]
                            font-medium uppercase
                            tracking-[0.2em]
                            text-muted-foreground
                          "
                        >
                          {item.label}
                        </span>

                        <span
                          className="
                            mt-1 block truncate
                            font-body text-sm
                            text-foreground/75
                            transition-colors duration-300
                            md:group-hover:text-foreground
                          "
                        >
                          {item.value}
                        </span>
                      </span>
                    </a>
                  </li>
                )
              })}
            </ul>

            <div
              className="
                mt-8 flex items-center gap-3
                font-body text-xs
                text-muted-foreground
              "
            >
              <MapPin
                size={14}
                strokeWidth={1.5}
                className="shrink-0 text-warm"
                aria-hidden="true"
              />

              <span>Rosario, Santa Fe · Disponibilidad para viajar</span>
            </div>
          </motion.div>

          {/* Formulario */}
          <motion.div
            initial={formInitial}
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
              delay: shouldReduceMotion ? 0 : 0.12,
              ease: motionEase,
            }}
            className="relative"
          >
            <div
              className="
                border border-white/10
                bg-white/[0.025]
                p-6
                sm:p-8
                md:p-10
                md:backdrop-blur-sm
              "
            >
              <div
                className="
                  mb-10 flex
                  items-start justify-between
                  gap-6
                  border-b border-white/10
                  pb-7
                "
              >
                <div>
                  <p
                    className="
                      font-body
                      text-[0.6rem]
                      font-medium uppercase
                      tracking-[0.22em]
                      text-warm
                    "
                  >
                    Nuevo proyecto
                  </p>

                  <h3
                    className="
                      mt-3
                      font-display
                      text-3xl font-light
                      text-foreground
                      md:text-4xl
                    "
                  >
                    Contanos la idea
                  </h3>
                </div>

                <span
                  className="
                    hidden
                    font-body
                    text-[0.55rem] uppercase
                    tracking-[0.18em]
                    text-muted-foreground
                    sm:block
                  "
                >
                  Respuesta directa
                  <br />
                  por WhatsApp
                </span>
              </div>

              <form onSubmit={handleSubmit} className="grid gap-7">
                <div className="grid gap-7 md:grid-cols-2">
                  <Field label="Nombre" htmlFor="name">
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      autoComplete="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Tu nombre"
                      className={fieldClassName}
                    />
                  </Field>

                  <Field label="Email" htmlFor="email">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      autoComplete="email"
                      inputMode="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="tu@email.com"
                      className={fieldClassName}
                    />
                  </Field>
                </div>

                <div className="grid gap-7 md:grid-cols-2">
                  <Field label="Teléfono" htmlFor="phone">
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      autoComplete="tel"
                      inputMode="tel"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="+54 9..."
                      className={fieldClassName}
                    />
                  </Field>

                  <Field label="Servicio" htmlFor="service">
                    <select
                      id="service"
                      name="service"
                      value={form.service}
                      onChange={handleChange}
                      className={`${fieldClassName} cursor-pointer appearance-none`}
                    >
                      <option
                        value=""
                        className="bg-background text-foreground"
                      >
                        Seleccionar
                      </option>

                      {serviceOptions.map((service) => (
                        <option
                          key={service}
                          value={service}
                          className="bg-background text-foreground"
                        >
                          {service}
                        </option>
                      ))}
                    </select>
                  </Field>
                </div>

                <Field label="Proyecto" htmlFor="message">
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Contanos el tipo de evento, la fecha, la ubicación, la cantidad de invitados y los servicios que necesitás. Nosotros nos encargamos del resto."
                    className={`${fieldClassName} resize-none`}
                  />
                </Field>

                <div
                  className="
                    flex flex-col gap-4
                    border-t border-white/10
                    pt-7
                    sm:flex-row
                    sm:items-center
                    sm:justify-between
                  "
                >
                  {/* <p
                    className="
                      max-w-xs
                      font-body
                      text-xs font-light
                      leading-5
                      text-muted-foreground
                    "
                  >
                    Al enviar el formulario se abrirá WhatsApp con toda la
                    información lista para que podamos asesorarte.
                  </p> */}

                  <button
                    type="submit"
                    className="
                      group flex min-w-52
                      items-center justify-between
                      gap-8
                      bg-foreground
                      px-6 py-4
                      font-body
                      text-[0.62rem]
                      font-medium uppercase
                      tracking-[0.18em]
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
                    Enviar consulta
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
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

interface FieldProps {
  label: string
  htmlFor: string
  children: ReactNode
}

function Field({ label, htmlFor, children }: FieldProps) {
  return (
    <div className="group flex flex-col gap-2">
      <label
        htmlFor={htmlFor}
        className="
          font-body
          text-[0.58rem]
          font-medium uppercase
          tracking-[0.2em]
          text-muted-foreground
          transition-colors duration-300
          group-focus-within:text-warm
        "
      >
        {label}
      </label>

      {children}
    </div>
  )
}
