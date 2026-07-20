import { ExternalLink, Mail, Phone } from 'lucide-react'

const navLinks = [
  { label: 'Inicio', href: '#inicio' },
  { label: 'Galería', href: '#galeria' },
  { label: 'Sobre Ale', href: '#sobre' },
  { label: 'Comentarios', href: '#comentarios' },
  { label: 'Contacto', href: '#contacto' },
]

export default function Footer() {
  return (
    <footer className="bg-background border-t border-border py-16 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <p
              className="text-2xl tracking-widest uppercase text-foreground mb-3"
              style={{ fontFamily: 'var(--font-display)', letterSpacing: '0.18em' }}
            >
              Ale Fuoco
            </p>
            <p
              className="text-sm text-muted-foreground leading-relaxed max-w-xs"
              style={{ fontFamily: 'var(--font-body)' }}
            >
              Producción de eventos sociales, corporativos y privados. Córdoba, Argentina.
            </p>
          </div>

          {/* Nav */}
          <nav aria-label="Navegación del pie de página">
            <p
              className="text-xs tracking-[0.2em] uppercase text-muted-foreground mb-4"
              style={{ fontFamily: 'var(--font-body)' }}
            >
              Navegación
            </p>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-foreground/70 hover:text-foreground transition-colors duration-200"
                    style={{ fontFamily: 'var(--font-body)' }}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact */}
          <div>
            <p
              className="text-xs tracking-[0.2em] uppercase text-muted-foreground mb-4"
              style={{ fontFamily: 'var(--font-body)' }}
            >
              Contacto
            </p>
            <ul className="space-y-3">
              <li>
                <a
                  href="tel:+543510000000"
                  className="flex items-center gap-2 text-sm text-foreground/70 hover:text-foreground transition-colors duration-200"
                  style={{ fontFamily: 'var(--font-body)' }}
                >
                  <Phone size={14} strokeWidth={1.5} />
                  +54 351 000 0000
                </a>
              </li>
              <li>
                <a
                  href="mailto:hola@alefuoco.com"
                  className="flex items-center gap-2 text-sm text-foreground/70 hover:text-foreground transition-colors duration-200"
                  style={{ fontFamily: 'var(--font-body)' }}
                >
                  <Mail size={14} strokeWidth={1.5} />
                  hola@alefuoco.com
                </a>
              </li>
              <li>
                <a
                  href="https://instagram.com/alefuoco"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-foreground/70 hover:text-foreground transition-colors duration-200"
                  style={{ fontFamily: 'var(--font-body)' }}
                >
                  <ExternalLink size={14} strokeWidth={1.5} />
                  @alefuoco
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-border pt-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
          <p
            className="text-xs text-muted-foreground"
            style={{ fontFamily: 'var(--font-body)' }}
          >
            © {new Date().getFullYear()} Ale Fuoco. Todos los derechos reservados.
          </p>
          <p
            className="text-xs text-muted-foreground"
            style={{ fontFamily: 'var(--font-body)' }}
          >
            Córdoba, Argentina
          </p>
        </div>
      </div>
    </footer>
  )
}
