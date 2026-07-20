'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'

const navLinks = [
  { label: 'Inicio', href: '#inicio' },
  { label: 'Galería', href: '#galeria' },
  { label: 'Sobre Ale', href: '#sobre' },
  { label: 'Comentarios', href: '#comentarios' },
  { label: 'Contacto', href: '#contacto' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40)
    }

    handleScroll()

    window.addEventListener('scroll', handleScroll, {
      passive: true,
    })

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''

    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  const handleNav = (href: string) => {
    setMenuOpen(false)

    const element = document.querySelector(href)

    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      })
    }
  }

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{
          duration: 0.8,
          ease: [0.16, 1, 0.3, 1],
        }}
        className={`fixed inset-x-0 top-0 z-50 border-b transition-all duration-500 ${
          scrolled
            ? 'border-white/10 bg-background/80 shadow-[0_1rem_4rem_rgba(0,0,0,0.18)] backdrop-blur-xl'
            : 'border-transparent bg-transparent'
        }`}
      >
        <nav className="site-container flex h-18 items-center justify-between md:h-22">
          <button
            type="button"
            onClick={() => handleNav('#inicio')}
            className="group relative z-50 flex flex-col items-start text-left"
            aria-label="Ir al inicio"
          >
            <span
              className={`font-display text-[1.7rem] leading-none tracking-[0.08em] transition-colors duration-300 md:text-[2rem] ${
                scrolled || menuOpen
                  ? 'text-foreground'
                  : 'text-white'
              }`}
            >
              Ale Fuoco
            </span>

            <span
              className={`mt-1 font-body text-[0.55rem] font-medium uppercase tracking-[0.28em] transition-colors duration-300 ${
                scrolled || menuOpen
                  ? 'text-warm'
                  : 'text-white/55'
              }`}
            >
              Producción de eventos
            </span>
          </button>

          <ul className="hidden items-center gap-7 lg:flex xl:gap-9">
            {navLinks.map((link) => (
              <li key={link.href}>
                <button
                  type="button"
                  onClick={() => handleNav(link.href)}
                  className={`group relative py-2 font-body text-[0.65rem] font-medium uppercase tracking-[0.18em] transition-colors duration-300 ${
                    scrolled
                      ? 'text-foreground/65 hover:text-foreground'
                      : 'text-white/70 hover:text-white'
                  }`}
                >
                  {link.label}

                  <span className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-warm transition-transform duration-300 group-hover:scale-x-100" />
                </button>
              </li>
            ))}
          </ul>

          <div className="hidden lg:block">
            <button
              type="button"
              onClick={() => handleNav('#contacto')}
              className={`focus-ring border px-5 py-2.5 font-body text-[0.62rem] font-medium uppercase tracking-[0.18em] transition-all duration-300 ${
                scrolled
                  ? 'border-foreground/20 text-foreground hover:border-warm hover:bg-warm hover:text-warm-foreground'
                  : 'border-white/35 text-white hover:border-white hover:bg-white hover:text-background'
              }`}
            >
              Hablemos
            </button>
          </div>

          <button
            type="button"
            onClick={() => setMenuOpen((current) => !current)}
            className={`focus-ring relative z-50 flex h-11 w-11 items-center justify-center rounded-full border transition-all duration-300 lg:hidden ${
              scrolled || menuOpen
                ? 'border-white/10 bg-white/5 text-foreground'
                : 'border-white/25 bg-black/10 text-white backdrop-blur-md'
            }`}
            aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
          >
            <AnimatePresence mode="wait" initial={false}>
              {menuOpen ? (
                <motion.span
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X size={19} strokeWidth={1.5} />
                </motion.span>
              ) : (
                <motion.span
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu size={20} strokeWidth={1.5} />
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </nav>
      </motion.header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-navigation"
            className="fixed inset-0 z-40 overflow-hidden bg-background lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_15%,rgba(181,126,70,0.14),transparent_32rem)]" />

            <div className="film-grain absolute inset-0 opacity-60" />

            <div className="site-container relative flex min-h-screen flex-col justify-center pt-24">
              <span className="section-eyebrow mb-10">
                Navegación
              </span>

              <ul className="flex flex-col">
                {navLinks.map((link, index) => (
                  <motion.li
                    key={link.href}
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: 0.08 + index * 0.07,
                      duration: 0.55,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className="border-b border-white/10"
                  >
                    <button
                      type="button"
                      onClick={() => handleNav(link.href)}
                      className="group flex w-full items-center justify-between py-5 text-left"
                    >
                      <span className="font-display text-[clamp(2.7rem,12vw,4.8rem)] leading-none tracking-[-0.03em] text-foreground transition-colors duration-300 group-hover:text-warm">
                        {link.label}
                      </span>

                      <span className="font-body text-[0.6rem] tracking-[0.2em] text-muted-foreground">
                        0{index + 1}
                      </span>
                    </button>
                  </motion.li>
                ))}
              </ul>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.55 }}
                className="mt-10 max-w-xs font-body text-sm font-light leading-relaxed text-muted-foreground"
              >
                Producción de experiencias sociales, corporativas y privadas.
              </motion.p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

// 'use client'

// import { useEffect, useState } from 'react'
// import { motion, AnimatePresence } from 'framer-motion'
// import { Menu, X } from 'lucide-react'

// const navLinks = [
//   { label: 'Inicio', href: '#inicio' },
//   { label: 'Galería', href: '#galeria' },
//   { label: 'Sobre Ale', href: '#sobre' },
//   { label: 'Comentarios', href: '#comentarios' },
//   { label: 'Contacto', href: '#contacto' },
// ]

// export default function Navbar() {
//   const [scrolled, setScrolled] = useState(false)
//   const [menuOpen, setMenuOpen] = useState(false)

//   useEffect(() => {
//     const handleScroll = () => setScrolled(window.scrollY > 40)
//     window.addEventListener('scroll', handleScroll, { passive: true })
//     return () => window.removeEventListener('scroll', handleScroll)
//   }, [])

//   const handleNav = (href: string) => {
//     setMenuOpen(false)
//     const el = document.querySelector(href)
//     if (el) el.scrollIntoView({ behavior: 'smooth' })
//   }

//   return (
//     <>
//       <motion.header
//         className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
//           scrolled
//             ? 'bg-background/95 backdrop-blur-md border-b border-border'
//             : 'bg-transparent'
//         }`}
//         initial={{ y: -80, opacity: 0 }}
//         animate={{ y: 0, opacity: 1 }}
//         transition={{ duration: 0.7, ease: 'easeOut' }}
//       >
//         <nav className="max-w-7xl mx-auto px-6 md:px-12 h-16 md:h-20 flex items-center justify-between">
//           {/* Logo */}
//           <button
//             onClick={() => handleNav('#inicio')}
//             className={`font-sans text-xl md:text-2xl tracking-widest uppercase transition-colors duration-300 ${
//               scrolled ? 'text-foreground' : 'text-white'
//             }`}
//             style={{ fontFamily: 'var(--font-display)', letterSpacing: '0.18em' }}
//           >
//             Ale Fuoco
//           </button>

//           {/* Desktop nav links */}
//           <ul className="hidden md:flex items-center gap-8">
//             {navLinks.map((link) => (
//               <li key={link.href}>
//                 <button
//                   onClick={() => handleNav(link.href)}
//                   className={`font-body text-xs tracking-[0.12em] uppercase transition-colors duration-300 hover:opacity-70 ${
//                     scrolled ? 'text-foreground' : 'text-white/90'
//                   }`}
//                   style={{ fontFamily: 'var(--font-body)' }}
//                 >
//                   {link.label}
//                 </button>
//               </li>
//             ))}
//           </ul>

//           {/* Mobile menu button */}
//           <button
//             onClick={() => setMenuOpen(!menuOpen)}
//             className={`md:hidden p-2 transition-colors duration-300 ${scrolled ? 'text-foreground' : 'text-white'}`}
//             aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
//           >
//             {menuOpen ? <X size={22} /> : <Menu size={22} />}
//           </button>
//         </nav>
//       </motion.header>

//       {/* Mobile menu */}
//       <AnimatePresence>
//         {menuOpen && (
//           <motion.div
//             className="fixed inset-0 z-40 bg-background flex flex-col items-center justify-center"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             transition={{ duration: 0.3 }}
//           >
//             <ul className="flex flex-col items-center gap-8">
//               {navLinks.map((link, i) => (
//                 <motion.li
//                   key={link.href}
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ delay: i * 0.08, duration: 0.4 }}
//                 >
//                   <button
//                     onClick={() => handleNav(link.href)}
//                     className="font-sans text-3xl tracking-widest uppercase text-foreground"
//                     style={{ fontFamily: 'var(--font-display)' }}
//                   >
//                     {link.label}
//                   </button>
//                 </motion.li>
//               ))}
//             </ul>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </>
//   )
// }
