'use client'

import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { Phone, Mail, ExternalLink, MessageSquare } from 'lucide-react'

const contactInfo = [
  {
    icon: MessageSquare,
    label: 'WhatsApp',
    value: '+54 9 351 000 0000',
    href: 'https://wa.me/5493510000000',
  },
  {
    icon: Phone,
    label: 'Teléfono',
    value: '+54 351 000 0000',
    href: 'tel:+543510000000',
  },
  {
    icon: Mail,
    label: 'Email',
    value: 'hola@alefuoco.com',
    href: 'mailto:hola@alefuoco.com',
  },
  {
    icon: ExternalLink,
    label: 'Instagram',
    value: '@alefuoco',
    href: 'https://instagram.com/alefuoco',
  },
]

export default function Contact() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' })
  const [sent, setSent] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: integrate with Server Actions or Resend
    setSent(true)
  }

  return (
    <section id="contacto" className="bg-foreground py-24 md:py-36">
      <div ref={ref} className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-24">
          {/* Left col */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <p
              className="text-xs tracking-[0.25em] uppercase text-background/50 mb-6"
              style={{ fontFamily: 'var(--font-body)' }}
            >
              Hablemos
            </p>
            <h2
              className="text-5xl md:text-7xl font-light text-background leading-none mb-10"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Contacto
            </h2>
            <p
              className="text-base md:text-lg text-background/60 leading-relaxed mb-12 max-w-sm"
              style={{ fontFamily: 'var(--font-body)' }}
            >
              ¿Tenés un evento en mente? Escribinos y contanos qué estás imaginando. La primera charla es sin
              compromisos.
            </p>

            <ul className="space-y-6">
              {contactInfo.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 group"
                  >
                    <span className="flex items-center justify-center w-10 h-10 border border-background/20 text-background/60 group-hover:border-background/60 group-hover:text-background transition-colors duration-300">
                      <item.icon size={16} strokeWidth={1.5} />
                    </span>
                    <div>
                      <p
                        className="text-xs tracking-[0.1em] uppercase text-background/40 mb-0.5"
                        style={{ fontFamily: 'var(--font-body)' }}
                      >
                        {item.label}
                      </p>
                      <p
                        className="text-sm text-background/80 group-hover:text-background transition-colors duration-300"
                        style={{ fontFamily: 'var(--font-body)' }}
                      >
                        {item.value}
                      </p>
                    </div>
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Right col — Contact form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.15 }}
          >
            {sent ? (
              <div className="h-full flex flex-col items-start justify-center">
                <p
                  className="text-4xl md:text-5xl font-light text-background leading-snug"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  Gracias por
                  <br />
                  <em>escribirnos.</em>
                </p>
                <p
                  className="mt-6 text-background/60 text-base"
                  style={{ fontFamily: 'var(--font-body)' }}
                >
                  Nos pondremos en contacto contigo muy pronto.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-6" noValidate>
                {/* Name */}
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="name"
                    className="text-xs tracking-[0.15em] uppercase text-background/50"
                    style={{ fontFamily: 'var(--font-body)' }}
                  >
                    Nombre
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Tu nombre"
                    className="bg-transparent border-b border-background/20 focus:border-background/60 outline-none py-3 text-background placeholder:text-background/30 transition-colors duration-300 text-sm"
                    style={{ fontFamily: 'var(--font-body)' }}
                  />
                </div>

                {/* Email */}
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="email"
                    className="text-xs tracking-[0.15em] uppercase text-background/50"
                    style={{ fontFamily: 'var(--font-body)' }}
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={form.email}
                    onChange={handleChange}
                    placeholder="tu@email.com"
                    className="bg-transparent border-b border-background/20 focus:border-background/60 outline-none py-3 text-background placeholder:text-background/30 transition-colors duration-300 text-sm"
                    style={{ fontFamily: 'var(--font-body)' }}
                  />
                </div>

                {/* Phone */}
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="phone"
                    className="text-xs tracking-[0.15em] uppercase text-background/50"
                    style={{ fontFamily: 'var(--font-body)' }}
                  >
                    Teléfono
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="+54 351 000 0000"
                    className="bg-transparent border-b border-background/20 focus:border-background/60 outline-none py-3 text-background placeholder:text-background/30 transition-colors duration-300 text-sm"
                    style={{ fontFamily: 'var(--font-body)' }}
                  />
                </div>

                {/* Message */}
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="message"
                    className="text-xs tracking-[0.15em] uppercase text-background/50"
                    style={{ fontFamily: 'var(--font-body)' }}
                  >
                    Mensaje
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={4}
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Contanos sobre tu evento..."
                    className="bg-transparent border-b border-background/20 focus:border-background/60 outline-none py-3 text-background placeholder:text-background/30 transition-colors duration-300 text-sm resize-none"
                    style={{ fontFamily: 'var(--font-body)' }}
                  />
                </div>

                <button
                  type="submit"
                  className="mt-4 self-start px-8 py-3 bg-background text-foreground text-xs tracking-[0.15em] uppercase transition-all duration-300 hover:bg-background/90 active:scale-95"
                  style={{ fontFamily: 'var(--font-body)' }}
                >
                  Enviar mensaje
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
