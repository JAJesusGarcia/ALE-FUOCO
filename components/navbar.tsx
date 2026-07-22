'use client'

import { useCallback, useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { usePathname, useRouter } from 'next/navigation'

const navLinks = [
  { label: 'Inicio', href: '#inicio' },
  { label: 'Servicios', href: '#servicios' },
  { label: 'Galería', href: '#galeria' },
  { label: 'Sobre Ale', href: '#sobre' },
  { label: 'Comentarios', href: '#comentarios' },
  { label: 'Contacto', href: '#contacto' },
]

const motionEase = [0.16, 1, 0.3, 1] as const

export default function Navbar() {
  const shouldReduceMotion = useReducedMotion()
  const router = useRouter()
  const pathname = usePathname()

  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    let ticking = false

    const updateScrolledState = () => {
      setScrolled(window.scrollY > 40)
      ticking = false
    }

    const handleScroll = () => {
      if (ticking) {
        return
      }

      ticking = true
      window.requestAnimationFrame(updateScrolledState)
    }

    updateScrolledState()

    window.addEventListener('scroll', handleScroll, {
      passive: true,
    })

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  useEffect(() => {
    if (!menuOpen) {
      return
    }

    const previousOverflow = document.body.style.overflow

    document.body.style.overflow = 'hidden'

    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [menuOpen])

  useEffect(() => {
    if (!menuOpen) {
      return
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMenuOpen(false)
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [menuOpen])

  useEffect(() => {
    const mediaQuery = window.matchMedia('(min-width: 1024px)')

    const handleDesktopChange = (event: MediaQueryListEvent) => {
      if (event.matches) {
        setMenuOpen(false)
      }
    }

    mediaQuery.addEventListener('change', handleDesktopChange)

    return () => {
      mediaQuery.removeEventListener('change', handleDesktopChange)
    }
  }, [])

  // const handleNav = useCallback((href: string) => {
  //   setMenuOpen(false)

  //   window.requestAnimationFrame(() => {
  //     const element = document.querySelector<HTMLElement>(href)

  //     if (!element) {
  //       return
  //     }

  //     element.scrollIntoView({
  //       behavior: 'smooth',
  //       block: 'start',
  //     })
  //   })
  // }, [])

  const handleNav = useCallback(
    (href: string) => {
      setMenuOpen(false)

      if (pathname !== '/') {
        router.push(`/${href}`)
        return
      }

      window.requestAnimationFrame(() => {
        const element = document.querySelector<HTMLElement>(href)

        if (!element) {
          return
        }

        element.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        })

        window.history.replaceState(null, '', href)
      })
    },
    [pathname, router],
  )

  const toggleMenu = useCallback(() => {
    setMenuOpen((current) => !current)
  }, [])

  const headerHasBackground = scrolled || menuOpen

  return (
    <>
      <motion.header
        initial={
          shouldReduceMotion
            ? false
            : {
                y: -80,
                opacity: 0,
              }
        }
        animate={{
          y: 0,
          opacity: 1,
        }}
        transition={{
          duration: shouldReduceMotion ? 0 : 0.8,
          ease: motionEase,
        }}
        className={`
          fixed inset-x-0 top-0 z-50
          border-b
          transition-[background-color,border-color,box-shadow]
          duration-500
          ${
            headerHasBackground
              ? `
                border-white/10
                bg-background/95
                shadow-[0_1rem_4rem_rgba(0,0,0,0.18)]
                md:bg-background/80
                md:backdrop-blur-xl
              `
              : `
                border-transparent
                bg-transparent
              `
          }
        `}
      >
        <nav
          aria-label="Navegación principal"
          className="
            mx-auto flex
            h-[4.5rem]
            w-full max-w-[90rem]
            items-center justify-between
            px-6
            md:h-[5.5rem]
            md:px-10
            lg:px-14
            xl:px-16
          "
        >
          <button
            type="button"
            onClick={() => handleNav('#inicio')}
            aria-label="Ir al inicio"
            className="
              group relative z-50
              flex flex-col
              items-start
              text-left
              focus-visible:outline-none
              focus-visible:ring-2
              focus-visible:ring-warm
              focus-visible:ring-offset-4
              focus-visible:ring-offset-background
            "
          >
            <span
              className={`
                font-display
                text-[1.7rem]
                leading-none
                tracking-[0.08em]
                transition-colors duration-300
                md:text-[2rem]
                ${headerHasBackground ? 'text-foreground' : 'text-white'}
              `}
            >
              Ale Fuoco
            </span>

            <span
              className={`
                mt-1
                font-body
                text-[0.55rem]
                font-medium uppercase
                tracking-[0.28em]
                transition-colors duration-300
                ${headerHasBackground ? 'text-warm' : 'text-white/55'}
              `}
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
                  className={`
                    group relative py-2
                    font-body
                    text-[0.65rem]
                    font-medium uppercase
                    tracking-[0.18em]
                    transition-colors duration-300
                    focus-visible:outline-none
                    focus-visible:text-warm
                    ${
                      scrolled
                        ? `
                          text-foreground/65
                          hover:text-foreground
                        `
                        : `
                          text-white/70
                          hover:text-white
                        `
                    }
                  `}
                >
                  {link.label}

                  <span
                    aria-hidden="true"
                    className="
                      absolute inset-x-0 bottom-0
                      h-px
                      origin-left
                      scale-x-0
                      bg-warm
                      transition-transform duration-300
                      group-hover:scale-x-100
                      group-focus-visible:scale-x-100
                    "
                  />
                </button>
              </li>
            ))}
          </ul>

          <div className="hidden lg:block">
            <button
              type="button"
              onClick={() => handleNav('#contacto')}
              className={`
                border
                px-5 py-2.5
                font-body
                text-[0.62rem]
                font-medium uppercase
                tracking-[0.18em]
                transition-colors duration-300
                focus-visible:outline-none
                focus-visible:ring-2
                focus-visible:ring-warm
                focus-visible:ring-offset-2
                focus-visible:ring-offset-background
                ${
                  scrolled
                    ? `
                      border-foreground/20
                      text-foreground
                      hover:border-warm
                      hover:bg-warm
                      hover:text-warm-foreground
                    `
                    : `
                      border-white/35
                      text-white
                      hover:border-white
                      hover:bg-white
                      hover:text-background
                    `
                }
              `}
            >
              Hablemos
            </button>
          </div>

          <button
            type="button"
            onClick={toggleMenu}
            aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            className={`
              relative z-50
              flex size-11
              items-center justify-center
              rounded-full
              border
              transition-colors duration-300
              focus-visible:outline-none
              focus-visible:ring-2
              focus-visible:ring-warm
              focus-visible:ring-offset-2
              focus-visible:ring-offset-background
              lg:hidden
              ${
                headerHasBackground
                  ? `
                    border-white/10
                    bg-white/5
                    text-foreground
                  `
                  : `
                    border-white/25
                    bg-black/10
                    text-white
                    md:backdrop-blur-md
                  `
              }
            `}
          >
            <AnimatePresence mode="wait" initial={false}>
              {menuOpen ? (
                <motion.span
                  key="close"
                  initial={
                    shouldReduceMotion
                      ? false
                      : {
                          rotate: -90,
                          opacity: 0,
                        }
                  }
                  animate={{
                    rotate: 0,
                    opacity: 1,
                  }}
                  exit={
                    shouldReduceMotion
                      ? undefined
                      : {
                          rotate: 90,
                          opacity: 0,
                        }
                  }
                  transition={{
                    duration: shouldReduceMotion ? 0 : 0.2,
                  }}
                >
                  <X size={19} strokeWidth={1.5} aria-hidden="true" />
                </motion.span>
              ) : (
                <motion.span
                  key="menu"
                  initial={
                    shouldReduceMotion
                      ? false
                      : {
                          rotate: 90,
                          opacity: 0,
                        }
                  }
                  animate={{
                    rotate: 0,
                    opacity: 1,
                  }}
                  exit={
                    shouldReduceMotion
                      ? undefined
                      : {
                          rotate: -90,
                          opacity: 0,
                        }
                  }
                  transition={{
                    duration: shouldReduceMotion ? 0 : 0.2,
                  }}
                >
                  <Menu size={20} strokeWidth={1.5} aria-hidden="true" />
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
            role="dialog"
            aria-modal="true"
            aria-label="Menú de navegación"
            initial={
              shouldReduceMotion
                ? false
                : {
                    opacity: 0,
                  }
            }
            animate={{
              opacity: 1,
            }}
            exit={
              shouldReduceMotion
                ? undefined
                : {
                    opacity: 0,
                  }
            }
            transition={{
              duration: shouldReduceMotion ? 0 : 0.35,
            }}
            className="
              fixed inset-0 z-40
              overflow-y-auto
              bg-background
              lg:hidden
            "
          >
            <div
              aria-hidden="true"
              className="
                pointer-events-none
                absolute inset-0
                bg-[radial-gradient(circle_at_80%_15%,rgba(181,126,70,0.14),transparent_32rem)]
              "
            />

            <div
              className="
                relative mx-auto
                flex min-h-[100svh]
                w-full max-w-[90rem]
                flex-col justify-center
                px-6 pb-12 pt-28
                md:px-10
              "
            >
              <span
                className="
                  mb-10
                  font-body
                  text-[0.58rem]
                  font-medium uppercase
                  tracking-[0.28em]
                  text-warm
                "
              >
                Navegación
              </span>

              <ul className="flex flex-col">
                {navLinks.map((link, index) => (
                  <motion.li
                    key={link.href}
                    initial={
                      shouldReduceMotion
                        ? false
                        : {
                            opacity: 0,
                            y: 24,
                          }
                    }
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    transition={{
                      delay: shouldReduceMotion ? 0 : 0.08 + index * 0.07,
                      duration: shouldReduceMotion ? 0 : 0.55,
                      ease: motionEase,
                    }}
                    className="border-b border-white/10"
                  >
                    <button
                      type="button"
                      onClick={() => handleNav(link.href)}
                      className="
                        group flex w-full
                        items-center justify-between
                        py-5
                        text-left
                        focus-visible:outline-none
                        focus-visible:text-warm
                      "
                    >
                      <span
                        className="
                          font-display
                          text-[clamp(2.7rem,12vw,4.8rem)]
                          leading-none
                          tracking-[-0.03em]
                          text-foreground
                          transition-colors duration-300
                          group-hover:text-warm
                          group-focus-visible:text-warm
                        "
                      >
                        {link.label}
                      </span>

                      <span
                        aria-hidden="true"
                        className="
                          font-body
                          text-[0.6rem]
                          tracking-[0.2em]
                          text-muted-foreground
                        "
                      >
                        {String(index + 1).padStart(2, '0')}
                      </span>
                    </button>
                  </motion.li>
                ))}
              </ul>

              <motion.p
                initial={
                  shouldReduceMotion
                    ? false
                    : {
                        opacity: 0,
                      }
                }
                animate={{
                  opacity: 1,
                }}
                transition={{
                  delay: shouldReduceMotion ? 0 : 0.55,
                  duration: shouldReduceMotion ? 0 : 0.5,
                }}
                className="
                  mt-10 max-w-xs
                  font-body
                  text-sm font-light
                  leading-relaxed
                  text-muted-foreground
                "
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
