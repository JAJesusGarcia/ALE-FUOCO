import { ArrowUp, Mail, MapPin, Phone } from 'lucide-react'

import { FaFacebookF, FaInstagram } from 'react-icons/fa6'

const navLinks = [
  { label: 'Inicio', href: '#inicio' },
  { label: 'Galería', href: '#galeria' },
  { label: 'Sobre Ale', href: '#sobre' },
  { label: 'Comentarios', href: '#comentarios' },
  { label: 'Contacto', href: '#contacto' },
]

const contactLinks = [
  {
    label: '+54 341 667 9247',
    href: 'tel:+543416679247',
    icon: Phone,
    external: false,
  },
  {
    label: 'alejandrofuoco@hotmail.com',
    href: 'mailto:alejandrofuoco@hotmail.com',
    icon: Mail,
    external: false,
  },
]

const socialLinks = [
  {
    label: '@ale_fuoco',
    href: 'https://www.instagram.com/ale_fuoco/',
    icon: FaInstagram,
  },
  {
    label: 'Ale Fuoco Dj',
    href: 'https://www.facebook.com/AleFuocoDj',
    icon: FaFacebookF,
  },
]

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer
      className="
        relative overflow-hidden
        border-t border-white/10
        bg-background
      "
    >
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute right-0 top-0
          hidden size-96
          rounded-full
          bg-warm/5
          blur-[130px]
          md:block
        "
      />

      <div
        className="
          relative mx-auto
          w-full max-w-[90rem]
          px-6 py-16
          md:px-10 md:py-24
          lg:px-14
          xl:px-16
        "
      >
        {/* Cabecera */}
        <div
          className="
            grid gap-12
            border-b border-white/10
            pb-14
            md:grid-cols-[1.4fr_0.6fr]
            md:items-end
            md:pb-20
          "
        >
          <div>
            <p
              className="
                mb-6
                font-body
                text-[0.58rem]
                font-medium uppercase
                tracking-[0.28em]
                text-warm
              "
            >
              Ale Fuoco Eventos
            </p>

            <h2
              className="
                max-w-4xl
                font-display
                text-[clamp(3.5rem,8vw,8rem)]
                font-light
                leading-[0.82]
                tracking-[-0.045em]
                text-foreground
              "
            >
              Hagamos algo
              <span className="block italic text-foreground/60">
                inolvidable.
              </span>
            </h2>
          </div>

          <div className="md:justify-self-end">
            <a
              href="#contacto"
              className="
                group inline-flex min-w-56
                items-center justify-between
                gap-8
                border border-white/15
                px-6 py-4
                font-body
                text-[0.62rem]
                font-medium uppercase
                tracking-[0.2em]
                text-foreground
                transition-colors duration-300
                hover:border-warm
                hover:bg-warm
                hover:text-warm-foreground
                focus-visible:outline-none
                focus-visible:ring-2
                focus-visible:ring-warm
                focus-visible:ring-offset-2
                focus-visible:ring-offset-background
              "
            >
              Empezar un proyecto
              <span
                aria-hidden="true"
                className="
                  text-lg
                  transition-transform duration-300
                  md:group-hover:translate-x-1
                "
              >
                ↗
              </span>
            </a>
          </div>
        </div>

        {/* Información */}
        <div
          className="
            grid gap-12 py-14
            md:grid-cols-2
            lg:grid-cols-[1.25fr_0.65fr_1fr]
            lg:gap-20
          "
        >
          <div>
            <a
              href="#inicio"
              className="
                inline-flex flex-col
                focus-visible:outline-none
                focus-visible:ring-2
                focus-visible:ring-warm
                focus-visible:ring-offset-4
                focus-visible:ring-offset-background
              "
              aria-label="Volver al inicio"
            >
              <span
                className="
                  font-display
                  text-4xl font-light
                  tracking-[-0.03em]
                  text-foreground
                "
              >
                Ale Fuoco
              </span>

              <span
                className="
                  mt-2
                  font-body
                  text-[0.58rem]
                  font-medium uppercase
                  tracking-[0.28em]
                  text-warm
                "
              >
                Producción de eventos
              </span>
            </a>

            <p
              className="
                mt-7 max-w-sm
                font-body
                text-sm font-light
                leading-7
                text-muted-foreground
              "
            >
              Producción de eventos sociales, corporativos y privados,
              desarrollados con sensibilidad, dedicación y atención en cada
              detalle.
            </p>
          </div>

          <nav aria-label="Navegación del pie de página">
            <p
              className="
                mb-6
                font-body
                text-[0.6rem]
                font-medium uppercase
                tracking-[0.25em]
                text-muted-foreground
              "
            >
              Explorar
            </p>

            <ul className="space-y-3">
              {navLinks.map((link, index) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="
                      group inline-flex
                      items-center gap-3
                      font-body text-sm
                      text-foreground/65
                      transition-colors duration-300
                      hover:text-foreground
                      focus-visible:outline-none
                      focus-visible:text-foreground
                    "
                  >
                    <span
                      aria-hidden="true"
                      className="text-[0.55rem] text-muted-foreground"
                    >
                      {String(index + 1).padStart(2, '0')}
                    </span>

                    <span>{link.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p
              className="
                mb-6
                font-body
                text-[0.6rem]
                font-medium uppercase
                tracking-[0.25em]
                text-muted-foreground
              "
            >
              Contacto
            </p>

            <ul className="space-y-4">
              {contactLinks.map((item) => {
                const Icon = item.icon

                return (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      className="
                        group flex items-center gap-3
                        font-body text-sm
                        text-foreground/65
                        transition-colors duration-300
                        hover:text-foreground
                        focus-visible:outline-none
                        focus-visible:text-foreground
                      "
                    >
                      <Icon
                        size={15}
                        strokeWidth={1.4}
                        aria-hidden="true"
                        className="shrink-0 text-warm"
                      />

                      <span className="break-all">{item.label}</span>
                    </a>
                  </li>
                )
              })}

              {socialLinks.map((item) => {
                const Icon = item.icon

                return (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="
                        group flex items-center gap-3
                        font-body text-sm
                        text-foreground/65
                        transition-colors duration-300
                        hover:text-foreground
                        focus-visible:outline-none
                        focus-visible:text-foreground
                      "
                    >
                      <Icon
                        size={15}
                        aria-hidden="true"
                        className="
                          shrink-0 text-warm
                          transition-transform duration-300
                          md:group-hover:scale-110
                        "
                      />

                      <span>{item.label}</span>
                    </a>
                  </li>
                )
              })}

              <li
                className="
                  flex items-center gap-3
                  font-body text-sm
                  text-foreground/65
                "
              >
                <MapPin
                  size={15}
                  strokeWidth={1.4}
                  aria-hidden="true"
                  className="shrink-0 text-warm"
                />

                <span>Rosario, Santa Fe, Argentina</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Barra inferior */}
        <div
          className="
            flex flex-col gap-5
            border-t border-white/10
            pt-7
            md:flex-row
            md:items-center
            md:justify-between
          "
        >
          <div
            className="
              flex flex-col gap-2
              sm:flex-row
              sm:items-center
              sm:gap-6
            "
          >
            <p className="font-body text-[0.65rem] text-muted-foreground">
              © {currentYear} Ale Fuoco.
            </p>

            <p className="font-body text-[0.65rem] text-muted-foreground">
              Todos los derechos reservados.
            </p>
          </div>

          <a
            href="#inicio"
            aria-label="Volver arriba"
            className="
              group inline-flex w-fit
              items-center gap-3
              font-body
              text-[0.6rem]
              font-medium uppercase
              tracking-[0.2em]
              text-muted-foreground
              transition-colors duration-300
              hover:text-foreground
              focus-visible:outline-none
              focus-visible:text-foreground
            "
          >
            Volver arriba
            <span
              className="
                flex size-8
                items-center justify-center
                rounded-full
                border border-white/10
                transition-all duration-300
                md:group-hover:-translate-y-1
                md:group-hover:border-warm
                md:group-hover:text-warm
              "
            >
              <ArrowUp size={13} strokeWidth={1.5} aria-hidden="true" />
            </span>
          </a>
        </div>
      </div>
    </footer>
  )
}
