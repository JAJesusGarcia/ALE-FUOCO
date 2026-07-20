'use client'

import {
  type ChangeEvent,
  type FormEvent,
  useRef,
  useState,
} from 'react'
import { motion, useInView } from 'framer-motion'
import {
  ArrowUpRight,
  Camera,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
} from 'lucide-react'

const contactInfo = [
  {
    icon: MessageCircle,
    label: 'WhatsApp',
    value: '+54 9 351 000 0000',
    href: 'https://wa.me/5493510000000',
  },
  {
    icon: Phone,
    label: 'Teléfono',
    value: '+54 341 667 9247',
    href: 'tel:+543510000000',
  },
  {
    icon: Mail,
    label: 'Email',
    value: 'alejandrofuoco@hotmail.com',
    href: 'mailto:alejandrofuoco@hotmail.com',
  },
  {
    icon: Camera,
    label: 'Instagram',
    value: '@ale_fuoco',
    href: 'https://instagram.com/alefuoco',
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

export default function Contact() {
  const sectionRef = useRef<HTMLElement | null>(null)

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

    const whatsappUrl = `https://wa.me/5493510000000?text=${encodeURIComponent(
      message,
    )}`

    window.open(whatsappUrl, '_blank', 'noopener,noreferrer')
  }

  return (
    <section
      ref={sectionRef}
      id="contacto"
      className="relative overflow-hidden border-t border-white/10 bg-[oklch(0.095_0.007_55)]"
    >
      {/* Ambient lights */}
      <div className="pointer-events-none absolute -left-48 top-20 h-[32rem] w-[32rem] rounded-full bg-warm/8 blur-[150px]" />

      <div className="pointer-events-none absolute -right-48 bottom-0 h-[28rem] w-[28rem] rounded-full bg-white/4 blur-[140px]" />

      <div className="site-container relative section-spacing">
        <div className="grid gap-16 lg:grid-cols-[0.9fr_1.1fr] lg:gap-24 xl:gap-32">
          {/* Information */}
          <motion.div
            initial={{ opacity: 0, y: 35 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{
              duration: 0.9,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            <div className="mb-8 flex items-center gap-4">
              <span className="h-px w-10 bg-warm" />

              <p className="section-eyebrow">
                Contacto
              </p>
            </div>

            <h2 className="max-w-[8ch] font-display text-[clamp(4rem,8vw,8rem)] font-light leading-[0.82] tracking-[-0.05em] text-foreground">
              Tu evento
              <span className="block italic text-foreground/55">
                empieza acá.
              </span>
            </h2>

            <p className="mt-8 max-w-lg font-body text-base font-light leading-8 text-muted-foreground md:text-lg">
              Contanos qué querés lograr. Diseñamos una propuesta técnica y
              visual que combine iluminación, sonido y operación para crear una
              experiencia sólida de principio a fin.
            </p>

            <div className="mt-10 border-l border-warm/60 pl-5">
              <p className="font-display text-xl font-light italic leading-relaxed text-foreground/75">
                “La técnica no debería distraer. Debería hacer que todo se
                sienta mejor.”
              </p>
            </div>

            <ul className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
              {contactInfo.map((item) => {
                const Icon = item.icon

                return (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      target={
                        item.href.startsWith('http')
                          ? '_blank'
                          : undefined
                      }
                      rel={
                        item.href.startsWith('http')
                          ? 'noopener noreferrer'
                          : undefined
                      }
                      className="group flex min-h-20 items-center gap-4 border border-white/10 bg-white/[0.025] px-4 py-4 transition-all duration-300 hover:border-warm/50 hover:bg-white/[0.045]"
                    >
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/10 text-warm transition-all duration-300 group-hover:border-warm/50 group-hover:bg-warm group-hover:text-warm-foreground">
                        <Icon size={16} strokeWidth={1.5} />
                      </span>

                      <span className="min-w-0">
                        <span className="block font-body text-[0.56rem] font-medium uppercase tracking-[0.2em] text-muted-foreground">
                          {item.label}
                        </span>

                        <span className="mt-1 block truncate font-body text-sm text-foreground/75 transition-colors duration-300 group-hover:text-foreground">
                          {item.value}
                        </span>
                      </span>
                    </a>
                  </li>
                )
              })}
            </ul>

            <div className="mt-8 flex items-center gap-3 font-body text-xs text-muted-foreground">
              <MapPin
                size={14}
                strokeWidth={1.5}
                className="text-warm"
              />

              <span>Rosario, Santa Fe.  Argentina · Disponibilidad para viajar</span>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 35 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{
              duration: 0.9,
              delay: 0.12,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="relative"
          >
            <div className="border border-white/10 bg-white/[0.025] p-6 backdrop-blur-sm sm:p-8 md:p-10">
              <div className="mb-10 flex items-start justify-between gap-6 border-b border-white/10 pb-7">
                <div>
                  <p className="font-body text-[0.6rem] font-medium uppercase tracking-[0.22em] text-warm">
                    Nuevo proyecto
                  </p>

                  <h3 className="mt-3 font-display text-3xl font-light text-foreground md:text-4xl">
                    Contanos la idea
                  </h3>
                </div>

                <span className="hidden font-body text-[0.55rem] uppercase tracking-[0.18em] text-muted-foreground sm:block">
                  Respuesta directa
                  <br />
                  por WhatsApp
                </span>
              </div>

              <form
                onSubmit={handleSubmit}
                className="grid gap-7"
              >
                <div className="grid gap-7 md:grid-cols-2">
                  <Field
                    label="Nombre"
                    htmlFor="name"
                  >
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      autoComplete="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Tu nombre"
                      className="contact-field"
                    />
                  </Field>

                  <Field
                    label="Email"
                    htmlFor="email"
                  >
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      autoComplete="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="tu@email.com"
                      className="contact-field"
                    />
                  </Field>
                </div>

                <div className="grid gap-7 md:grid-cols-2">
                  <Field
                    label="Teléfono"
                    htmlFor="phone"
                  >
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      autoComplete="tel"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="+54 9..."
                      className="contact-field"
                    />
                  </Field>

                  <Field
                    label="Servicio"
                    htmlFor="service"
                  >
                    <select
                      id="service"
                      name="service"
                      value={form.service}
                      onChange={handleChange}
                      className="contact-field cursor-pointer"
                    >
                      <option
                        value=""
                        className="bg-background"
                      >
                        Seleccionar
                      </option>

                      {serviceOptions.map((service) => (
                        <option
                          key={service}
                          value={service}
                          className="bg-background"
                        >
                          {service}
                        </option>
                      ))}
                    </select>
                  </Field>
                </div>

                <Field
                  label="Proyecto"
                  htmlFor="message"
                >
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Tipo de evento, fecha estimada, lugar, cantidad de personas y qué experiencia te gustaría crear..."
                    className="contact-field resize-none"
                  />
                </Field>

                <div className="flex flex-col gap-4 border-t border-white/10 pt-7 sm:flex-row sm:items-center sm:justify-between">
                  <p className="max-w-xs font-body text-xs font-light leading-5 text-muted-foreground">
                    Al enviar, se abrirá WhatsApp con tu mensaje listo para
                    compartir.
                  </p>

                  <button
                    type="submit"
                    className="focus-ring group flex min-w-52 items-center justify-between gap-8 bg-foreground px-6 py-4 font-body text-[0.62rem] font-medium uppercase tracking-[0.18em] text-background transition-all duration-300 hover:bg-warm hover:text-warm-foreground"
                  >
                    Enviar consulta

                    <ArrowUpRight
                      size={16}
                      strokeWidth={1.5}
                      className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
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

function Field({
  label,
  htmlFor,
  children,
}: {
  label: string
  htmlFor: string
  children: React.ReactNode
}) {
  return (
    <div className="group flex flex-col gap-2">
      <label
        htmlFor={htmlFor}
        className="font-body text-[0.58rem] font-medium uppercase tracking-[0.2em] text-muted-foreground transition-colors duration-300 group-focus-within:text-warm"
      >
        {label}
      </label>

      {children}
    </div>
  )
}

// 'use client'

// import { useRef, useState } from 'react'
// import { motion, useInView } from 'framer-motion'
// import { Phone, Mail, ExternalLink, MessageSquare } from 'lucide-react'

// const contactInfo = [
//   {
//     icon: MessageSquare,
//     label: 'WhatsApp',
//     value: '+54 9 351 000 0000',
//     href: 'https://wa.me/5493510000000',
//   },
//   {
//     icon: Phone,
//     label: 'Teléfono',
//     value: '+54 341 667 9247',
//     href: 'tel:+543510000000',
//   },
//   {
//     icon: Mail,
//     label: 'Email',
//     value: 'alejandrofuoco@hotmail.com',
//     href: 'mailto:alejandrofuoco@hotmail.com',
//   },
//   {
//     icon: ExternalLink,
//     label: 'Instagram',
//     value: '@ale_fuoco',
//     href: 'https://instagram.com/alefuoco',
//   },
// ]

// export default function Contact() {
//   const ref = useRef(null)
//   const inView = useInView(ref, { once: true, margin: '-60px' })

//   const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' })
//   const [sent, setSent] = useState(false)

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
//   }

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault()
//     // TODO: integrate with Server Actions or Resend
//     setSent(true)
//   }

//   return (
//     <section id="contacto" className="bg-foreground py-24 md:py-36">
//       <div ref={ref} className="max-w-7xl mx-auto px-6 md:px-12">
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-24">
//           {/* Left col */}
//           <motion.div
//             initial={{ opacity: 0, y: 30 }}
//             animate={inView ? { opacity: 1, y: 0 } : {}}
//             transition={{ duration: 0.8 }}
//           >
//             <p
//               className="text-xs tracking-[0.25em] uppercase text-background/50 mb-6"
//               style={{ fontFamily: 'var(--font-body)' }}
//             >
//               Hablemos
//             </p>
//             <h2
//               className="text-5xl md:text-7xl font-light text-background leading-none mb-10"
//               style={{ fontFamily: 'var(--font-display)' }}
//             >
//               Contacto
//             </h2>
//             <p
//               className="text-base md:text-lg text-background/60 leading-relaxed mb-12 max-w-sm"
//               style={{ fontFamily: 'var(--font-body)' }}
//             >
//               ¿Tenés un evento en mente? Escribinos y contanos qué estás imaginando. La primera charla es sin
//               compromisos.
//             </p>

//             <ul className="space-y-6">
//               {contactInfo.map((item) => (
//                 <li key={item.label}>
//                   <a
//                     href={item.href}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="flex items-center gap-4 group"
//                   >
//                     <span className="flex items-center justify-center w-10 h-10 border border-background/20 text-background/60 group-hover:border-background/60 group-hover:text-background transition-colors duration-300">
//                       <item.icon size={16} strokeWidth={1.5} />
//                     </span>
//                     <div>
//                       <p
//                         className="text-xs tracking-[0.1em] uppercase text-background/40 mb-0.5"
//                         style={{ fontFamily: 'var(--font-body)' }}
//                       >
//                         {item.label}
//                       </p>
//                       <p
//                         className="text-sm text-background/80 group-hover:text-background transition-colors duration-300"
//                         style={{ fontFamily: 'var(--font-body)' }}
//                       >
//                         {item.value}
//                       </p>
//                     </div>
//                   </a>
//                 </li>
//               ))}
//             </ul>
//           </motion.div>

//           {/* Right col — Contact form */}
//           <motion.div
//             initial={{ opacity: 0, y: 30 }}
//             animate={inView ? { opacity: 1, y: 0 } : {}}
//             transition={{ duration: 0.8, delay: 0.15 }}
//           >
//             {sent ? (
//               <div className="h-full flex flex-col items-start justify-center">
//                 <p
//                   className="text-4xl md:text-5xl font-light text-background leading-snug"
//                   style={{ fontFamily: 'var(--font-display)' }}
//                 >
//                   Gracias por
//                   <br />
//                   <em>escribirnos.</em>
//                 </p>
//                 <p
//                   className="mt-6 text-background/60 text-base"
//                   style={{ fontFamily: 'var(--font-body)' }}
//                 >
//                   Nos pondremos en contacto contigo muy pronto.
//                 </p>
//               </div>
//             ) : (
//               <form onSubmit={handleSubmit} className="flex flex-col gap-6" noValidate>
//                 {/* Name */}
//                 <div className="flex flex-col gap-2">
//                   <label
//                     htmlFor="name"
//                     className="text-xs tracking-[0.15em] uppercase text-background/50"
//                     style={{ fontFamily: 'var(--font-body)' }}
//                   >
//                     Nombre
//                   </label>
//                   <input
//                     id="name"
//                     name="name"
//                     type="text"
//                     required
//                     value={form.name}
//                     onChange={handleChange}
//                     placeholder="Tu nombre"
//                     className="bg-transparent border-b border-background/20 focus:border-background/60 outline-none py-3 text-background placeholder:text-background/30 transition-colors duration-300 text-sm"
//                     style={{ fontFamily: 'var(--font-body)' }}
//                   />
//                 </div>

//                 {/* Email */}
//                 <div className="flex flex-col gap-2">
//                   <label
//                     htmlFor="email"
//                     className="text-xs tracking-[0.15em] uppercase text-background/50"
//                     style={{ fontFamily: 'var(--font-body)' }}
//                   >
//                     Email
//                   </label>
//                   <input
//                     id="email"
//                     name="email"
//                     type="email"
//                     required
//                     value={form.email}
//                     onChange={handleChange}
//                     placeholder="tu@email.com"
//                     className="bg-transparent border-b border-background/20 focus:border-background/60 outline-none py-3 text-background placeholder:text-background/30 transition-colors duration-300 text-sm"
//                     style={{ fontFamily: 'var(--font-body)' }}
//                   />
//                 </div>

//                 {/* Phone */}
//                 <div className="flex flex-col gap-2">
//                   <label
//                     htmlFor="phone"
//                     className="text-xs tracking-[0.15em] uppercase text-background/50"
//                     style={{ fontFamily: 'var(--font-body)' }}
//                   >
//                     Teléfono
//                   </label>
//                   <input
//                     id="phone"
//                     name="phone"
//                     type="tel"
//                     value={form.phone}
//                     onChange={handleChange}
//                     placeholder="+54 341 667 9247"
//                     className="bg-transparent border-b border-background/20 focus:border-background/60 outline-none py-3 text-background placeholder:text-background/30 transition-colors duration-300 text-sm"
//                     style={{ fontFamily: 'var(--font-body)' }}
//                   />
//                 </div>

//                 {/* Message */}
//                 <div className="flex flex-col gap-2">
//                   <label
//                     htmlFor="message"
//                     className="text-xs tracking-[0.15em] uppercase text-background/50"
//                     style={{ fontFamily: 'var(--font-body)' }}
//                   >
//                     Mensaje
//                   </label>
//                   <textarea
//                     id="message"
//                     name="message"
//                     required
//                     rows={4}
//                     value={form.message}
//                     onChange={handleChange}
//                     placeholder="Contanos sobre tu evento..."
//                     className="bg-transparent border-b border-background/20 focus:border-background/60 outline-none py-3 text-background placeholder:text-background/30 transition-colors duration-300 text-sm resize-none"
//                     style={{ fontFamily: 'var(--font-body)' }}
//                   />
//                 </div>

//                 <button
//                   type="submit"
//                   className="mt-4 self-start px-8 py-3 bg-background text-foreground text-xs tracking-[0.15em] uppercase transition-all duration-300 hover:bg-background/90 active:scale-95"
//                   style={{ fontFamily: 'var(--font-body)' }}
//                 >
//                   Enviar mensaje
//                 </button>
//               </form>
//             )}
//           </motion.div>
//         </div>
//       </div>
//     </section>
//   )
// }
