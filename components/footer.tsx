import {
  ArrowUp,
  Mail,
  MapPin,
  Phone,
} from 'lucide-react'

const navLinks = [
  { label: 'Inicio', href: '#inicio' },
  { label: 'Galería', href: '#galeria' },
  { label: 'Sobre Ale', href: '#sobre' },
  { label: 'Comentarios', href: '#comentarios' },
  { label: 'Contacto', href: '#contacto' },
]

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-background">
      <div className="absolute right-0 top-0 h-96 w-96 rounded-full bg-warm/5 blur-[130px]" />

      <div className="site-container relative py-16 md:py-24">
        {/* Cabecera */}
        <div className="grid gap-12 border-b border-white/10 pb-14 md:grid-cols-[1.4fr_0.6fr] md:items-end md:pb-20">
          <div>
            <p className="section-eyebrow mb-6">
              Ale Fuoco Eventos
            </p>

            <h2 className="max-w-4xl font-display text-[clamp(3.5rem,8vw,8rem)] font-light leading-[0.82] tracking-[-0.045em] text-foreground">
              Hagamos algo
              <span className="block italic text-foreground/60">
                inolvidable.
              </span>
            </h2>
          </div>

          <div className="md:justify-self-end">
            <a
              href="#contacto"
              className="focus-ring group inline-flex min-w-56 items-center justify-between gap-8 border border-white/15 px-6 py-4 font-body text-[0.62rem] font-medium uppercase tracking-[0.2em] text-foreground transition-all duration-300 hover:border-warm hover:bg-warm hover:text-warm-foreground"
            >
              Empezar un proyecto

              <span className="text-lg transition-transform duration-300 group-hover:translate-x-1">
                ↗
              </span>
            </a>
          </div>
        </div>

        {/* Información */}
        <div className="grid gap-12 py-14 md:grid-cols-2 lg:grid-cols-[1.25fr_0.65fr_1fr] lg:gap-20">
          <div>
            <a
              href="#inicio"
              className="inline-flex flex-col"
              aria-label="Volver al inicio"
            >
              <span className="font-display text-4xl font-light tracking-[-0.03em] text-foreground">
                Ale Fuoco
              </span>

              <span className="mt-2 font-body text-[0.58rem] font-medium uppercase tracking-[0.28em] text-warm">
                Producción de eventos
              </span>
            </a>

            <p className="mt-7 max-w-sm font-body text-sm font-light leading-7 text-muted-foreground">
              Producción de eventos sociales, corporativos y privados,
              desarrollados con sensibilidad, dedicación y atención en cada
              detalle.
            </p>
          </div>

          <nav aria-label="Navegación del pie de página">
            <p className="mb-6 font-body text-[0.6rem] font-medium uppercase tracking-[0.25em] text-muted-foreground">
              Explorar
            </p>

            <ul className="space-y-3">
              {navLinks.map((link, index) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="group inline-flex items-center gap-3 font-body text-sm text-foreground/65 transition-colors duration-300 hover:text-foreground"
                  >
                    <span className="text-[0.55rem] text-muted-foreground">
                      0{index + 1}
                    </span>

                    <span>{link.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="mb-6 font-body text-[0.6rem] font-medium uppercase tracking-[0.25em] text-muted-foreground">
              Contacto
            </p>

            <ul className="space-y-4">
              <li>
                <a
                  href="tel:+543510000000"
                  className="group flex items-center gap-3 font-body text-sm text-foreground/65 transition-colors duration-300 hover:text-foreground"
                >
                  <Phone
                    size={15}
                    strokeWidth={1.4}
                    className="text-warm"
                  />

                  <span>+54 351 000 0000</span>
                </a>
              </li>

              <li>
                <a
                  href="mailto:hola@alefuoco.com"
                  className="group flex items-center gap-3 font-body text-sm text-foreground/65 transition-colors duration-300 hover:text-foreground"
                >
                  <Mail
                    size={15}
                    strokeWidth={1.4}
                    className="text-warm"
                  />

                  <span>hola@alefuoco.com</span>
                </a>
              </li>

              <li>
                <a
                  href="https://instagram.com/alefuoco"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3 font-body text-sm text-foreground/65 transition-colors duration-300 hover:text-foreground"
                >
                  {/* <Instagram
                    size={15}
                    strokeWidth={1.4}
                    className="text-warm"
                  /> */}

                  <span>@alefuoco</span>
                </a>
              </li>

              <li className="flex items-center gap-3 font-body text-sm text-foreground/65">
                <MapPin
                  size={15}
                  strokeWidth={1.4}
                  className="text-warm"
                />

                <span>Córdoba, Argentina</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Barra inferior */}
        <div className="flex flex-col gap-5 border-t border-white/10 pt-7 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-6">
            <p className="font-body text-[0.65rem] text-muted-foreground">
              © {new Date().getFullYear()} Ale Fuoco.
            </p>

            <p className="font-body text-[0.65rem] text-muted-foreground">
              Todos los derechos reservados.
            </p>
          </div>

          <a
            href="#inicio"
            className="group inline-flex w-fit items-center gap-3 font-body text-[0.6rem] font-medium uppercase tracking-[0.2em] text-muted-foreground transition-colors duration-300 hover:text-foreground"
            aria-label="Volver arriba"
          >
            Volver arriba

            <span className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 transition-all duration-300 group-hover:-translate-y-1 group-hover:border-warm group-hover:text-warm">
              <ArrowUp size={13} strokeWidth={1.5} />
            </span>
          </a>
        </div>
      </div>
    </footer>
  )
}


// import { ExternalLink, Mail, Phone } from 'lucide-react'

// const navLinks = [
//   { label: 'Inicio', href: '#inicio' },
//   { label: 'Galería', href: '#galeria' },
//   { label: 'Sobre Ale', href: '#sobre' },
//   { label: 'Comentarios', href: '#comentarios' },
//   { label: 'Contacto', href: '#contacto' },
// ]

// export default function Footer() {
//   return (
//     <footer className="bg-background border-t border-border py-16 px-6 md:px-12">
//       <div className="max-w-7xl mx-auto">
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
//           {/* Brand */}
//           <div>
//             <p
//               className="text-2xl tracking-widest uppercase text-foreground mb-3"
//               style={{ fontFamily: 'var(--font-display)', letterSpacing: '0.18em' }}
//             >
//               Ale Fuoco
//             </p>
//             <p
//               className="text-sm text-muted-foreground leading-relaxed max-w-xs"
//               style={{ fontFamily: 'var(--font-body)' }}
//             >
//               Producción de eventos sociales, corporativos y privados. Córdoba, Argentina.
//             </p>
//           </div>

//           {/* Nav */}
//           <nav aria-label="Navegación del pie de página">
//             <p
//               className="text-xs tracking-[0.2em] uppercase text-muted-foreground mb-4"
//               style={{ fontFamily: 'var(--font-body)' }}
//             >
//               Navegación
//             </p>
//             <ul className="space-y-2">
//               {navLinks.map((link) => (
//                 <li key={link.href}>
//                   <a
//                     href={link.href}
//                     className="text-sm text-foreground/70 hover:text-foreground transition-colors duration-200"
//                     style={{ fontFamily: 'var(--font-body)' }}
//                   >
//                     {link.label}
//                   </a>
//                 </li>
//               ))}
//             </ul>
//           </nav>

//           {/* Contact */}
//           <div>
//             <p
//               className="text-xs tracking-[0.2em] uppercase text-muted-foreground mb-4"
//               style={{ fontFamily: 'var(--font-body)' }}
//             >
//               Contacto
//             </p>
//             <ul className="space-y-3">
//               <li>
//                 <a
//                   href="tel:+543510000000"
//                   className="flex items-center gap-2 text-sm text-foreground/70 hover:text-foreground transition-colors duration-200"
//                   style={{ fontFamily: 'var(--font-body)' }}
//                 >
//                   <Phone size={14} strokeWidth={1.5} />
//                   +54 351 000 0000
//                 </a>
//               </li>
//               <li>
//                 <a
//                   href="mailto:hola@alefuoco.com"
//                   className="flex items-center gap-2 text-sm text-foreground/70 hover:text-foreground transition-colors duration-200"
//                   style={{ fontFamily: 'var(--font-body)' }}
//                 >
//                   <Mail size={14} strokeWidth={1.5} />
//                   hola@alefuoco.com
//                 </a>
//               </li>
//               <li>
//                 <a
//                   href="https://instagram.com/alefuoco"
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="flex items-center gap-2 text-sm text-foreground/70 hover:text-foreground transition-colors duration-200"
//                   style={{ fontFamily: 'var(--font-body)' }}
//                 >
//                   <ExternalLink size={14} strokeWidth={1.5} />
//                   @alefuoco
//                 </a>
//               </li>
//             </ul>
//           </div>
//         </div>

//         {/* Bottom bar */}
//         <div className="border-t border-border pt-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
//           <p
//             className="text-xs text-muted-foreground"
//             style={{ fontFamily: 'var(--font-body)' }}
//           >
//             © {new Date().getFullYear()} Ale Fuoco. Todos los derechos reservados.
//           </p>
//           <p
//             className="text-xs text-muted-foreground"
//             style={{ fontFamily: 'var(--font-body)' }}
//           >
//             Córdoba, Argentina
//           </p>
//         </div>
//       </div>
//     </footer>
//   )
// }
