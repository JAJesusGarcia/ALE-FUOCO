'use client'

import { motion } from 'framer-motion'
import { MessageCircle } from 'lucide-react'

const WHATSAPP_NUMBER = '5493416679247'

const WHATSAPP_MESSAGE =
  'Hola Ale, vi tu web y quería consultarte por un evento.'

export default function FloatingWhatsApp() {
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    WHATSAPP_MESSAGE,
  )}`

  return (
    <motion.a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contactar a Ale por WhatsApp"
      initial={{
        opacity: 0,
        scale: 0.8,
        y: 20,
      }}
      animate={{
        opacity: 1,
        scale: 1,
        y: 0,
      }}
      transition={{
        duration: 0.8,
        delay: 1.2,
        ease: [0.16, 1, 0.3, 1],
      }}
      whileHover={{
        scale: 1.06,
        y: -3,
      }}
      whileTap={{
        scale: 0.94,
      }}
      className="group fixed bottom-5 right-5 z-[80] flex items-center gap-3 sm:bottom-15 sm:right-15"
    >
      {/* Texto flotante */}
      <span className="pointer-events-none hidden translate-x-3 whitespace-nowrap border border-white/10 bg-background/90 px-4 py-3 font-body text-[0.56rem] font-medium uppercase tracking-[0.16em] text-foreground/70 opacity-0 shadow-2xl backdrop-blur-xl transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100 md:block">
        Hablar con Ale
      </span>

      {/* Botón */}
      <span className="relative flex h-14 w-14 items-center justify-center rounded-full border border-warm/40 bg-background/90 text-warm shadow-[0_0_30px_rgba(244,161,92,0.16)] backdrop-blur-xl transition-all duration-300 group-hover:border-warm group-hover:bg-warm group-hover:text-background sm:h-16 sm:w-16">
        {/* Pulso exterior */}
        <span className="absolute inset-0 animate-ping rounded-full border border-warm/20 opacity-30" />

        {/* Glow */}
        <span className="absolute inset-2 rounded-full bg-warm/10 blur-md transition-opacity duration-300 group-hover:opacity-0" />

        <MessageCircle
          size={25}
          strokeWidth={1.6}
          className="relative z-10"
        />

        {/* Indicador online */}
        <span className="absolute right-0 top-0 h-3.5 w-3.5 rounded-full border-2 border-background bg-[#25D366] shadow-[0_0_10px_rgba(37,211,102,0.6)]" />
      </span>
    </motion.a>
  )
}