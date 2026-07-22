import { FaLinkedinIn, FaWhatsapp } from 'react-icons/fa6'

interface DeveloperSignatureProps {
  clientName: string
  className?: string
}

const WHATSAPP_NUMBER = '5493416153479'

// Reemplazá esta URL por la dirección exacta de tu perfil.
const LINKEDIN_URL = 'https://www.linkedin.com/in/jesusjagarcia/'

export default function DeveloperSignature({
  clientName,
  className = '',
}: DeveloperSignatureProps) {
  const whatsappMessage = `Hola Jesús, vi la web de ${clientName} y me gustaría consultarte por el desarrollo de una página similar.`

  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    whatsappMessage,
  )}`

  return (
    <div
      className={`
        border-t border-white/10
        px-6 py-10
        text-center
        ${className}
      `}
    >
      <p
        className="
          font-body
          text-[0.55rem]
          font-medium uppercase
          tracking-[0.32em]
          text-foreground/35
        "
      >
        Designed &amp; Developed by
      </p>

      <p
        className="
          mt-3
          font-display
          text-xl font-light
          tracking-[-0.02em]
          text-foreground/75
        "
      >
        Jesús García
      </p>

      <div className="mt-5 flex items-center justify-center gap-3">
        <a
          href={LINKEDIN_URL}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Ver el perfil de LinkedIn de Jesús García"
          title="LinkedIn"
          className="
            group flex size-9
            items-center justify-center
            rounded-full
            border border-white/10
            text-foreground/40
            transition-all duration-300
            hover:-translate-y-0.5
            hover:border-warm/60
            hover:text-warm
            focus-visible:outline-none
            focus-visible:ring-2
            focus-visible:ring-warm
            focus-visible:ring-offset-2
            focus-visible:ring-offset-background
          "
        >
          <FaLinkedinIn
            size={14}
            aria-hidden="true"
            className="transition-transform duration-300 group-hover:scale-110"
          />
        </a>

        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Contactar a Jesús García por WhatsApp"
          title="WhatsApp"
          className="
            group flex size-9
            items-center justify-center
            rounded-full
            border border-white/10
            text-foreground/40
            transition-all duration-300
            hover:-translate-y-0.5
            hover:border-warm/60
            hover:text-warm
            focus-visible:outline-none
            focus-visible:ring-2
            focus-visible:ring-warm
            focus-visible:ring-offset-2
            focus-visible:ring-offset-background
          "
        >
          <FaWhatsapp
            size={15}
            aria-hidden="true"
            className="transition-transform duration-300 group-hover:scale-110"
          />
        </a>
      </div>
    </div>
  )
}
