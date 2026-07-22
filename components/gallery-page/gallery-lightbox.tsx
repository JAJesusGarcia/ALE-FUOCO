'use client'

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import Image from 'next/image'
import { useCallback, useEffect } from 'react'
import type { GalleryArchiveImage } from '@/data/gallery-images'

interface GalleryLightboxProps {
  images: GalleryArchiveImage[]
  activeIndex: number | null
  onClose: () => void
  onChange: (index: number) => void
}

export default function GalleryLightbox({
  images,
  activeIndex,
  onClose,
  onChange,
}: GalleryLightboxProps) {
  const shouldReduceMotion = useReducedMotion()

  const showPrevious = useCallback(() => {
    if (activeIndex === null) {
      return
    }

    const previousIndex =
      activeIndex === 0 ? images.length - 1 : activeIndex - 1

    onChange(previousIndex)
  }, [activeIndex, images.length, onChange])

  const showNext = useCallback(() => {
    if (activeIndex === null) {
      return
    }

    const nextIndex = activeIndex === images.length - 1 ? 0 : activeIndex + 1

    onChange(nextIndex)
  }, [activeIndex, images.length, onChange])

  useEffect(() => {
    if (activeIndex === null) {
      return
    }

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
      }

      if (event.key === 'ArrowLeft') {
        showPrevious()
      }

      if (event.key === 'ArrowRight') {
        showNext()
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [activeIndex, onClose, showNext, showPrevious])

  const activeImage = activeIndex === null ? null : images[activeIndex]

  return (
    <AnimatePresence>
      {activeImage && activeIndex !== null && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label={`Vista ampliada de ${activeImage.title}`}
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
            fixed inset-0 z-[100]
            flex flex-col
            bg-black
          "
        >
          <div
            className="
              flex h-20
              items-center justify-between
              border-b border-white/10
              px-5
              md:px-8
            "
          >
            <div>
              <p
                className="
                  font-body
                  text-[0.55rem]
                  font-medium uppercase
                  tracking-[0.22em]
                  text-warm
                "
              >
                {activeImage.category}
              </p>

              <p
                className="
                  mt-1
                  font-body
                  text-xs
                  text-white/45
                "
              >
                {String(activeIndex + 1).padStart(2, '0')} /{' '}
                {String(images.length).padStart(2, '0')}
              </p>
            </div>

            <button
              type="button"
              onClick={onClose}
              aria-label="Cerrar imagen"
              className="
                flex size-11
                items-center justify-center
                rounded-full
                border border-white/15
                text-white
                transition-colors duration-300
                hover:border-white
                hover:bg-white
                hover:text-black
                focus-visible:outline-none
                focus-visible:ring-2
                focus-visible:ring-warm
              "
            >
              <X size={19} strokeWidth={1.5} aria-hidden="true" />
            </button>
          </div>

          <div className="relative flex-1 overflow-hidden">
            <motion.div
              key={activeImage.id}
              initial={
                shouldReduceMotion
                  ? false
                  : {
                      opacity: 0,
                      scale: 0.98,
                    }
              }
              animate={{
                opacity: 1,
                scale: 1,
              }}
              transition={{
                duration: shouldReduceMotion ? 0 : 0.45,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="absolute inset-5 md:inset-8"
            >
              <Image
                src={activeImage.src}
                alt={activeImage.alt}
                fill
                quality={95}
                sizes="100vw"
                className={`object-contain ${activeImage.position ?? 'object-center'}`}
              />
            </motion.div>

            <button
              type="button"
              onClick={showPrevious}
              aria-label="Imagen anterior"
              className="
                absolute left-4 top-1/2
                z-10
                flex size-11
                -translate-y-1/2
                items-center justify-center
                rounded-full
                border border-white/15
                bg-black/40
                text-white
                transition-colors duration-300
                hover:border-white
                hover:bg-white
                hover:text-black
                focus-visible:outline-none
                focus-visible:ring-2
                focus-visible:ring-warm
                md:left-8
              "
            >
              <ChevronLeft size={20} strokeWidth={1.5} aria-hidden="true" />
            </button>

            <button
              type="button"
              onClick={showNext}
              aria-label="Imagen siguiente"
              className="
                absolute right-4 top-1/2
                z-10
                flex size-11
                -translate-y-1/2
                items-center justify-center
                rounded-full
                border border-white/15
                bg-black/40
                text-white
                transition-colors duration-300
                hover:border-white
                hover:bg-white
                hover:text-black
                focus-visible:outline-none
                focus-visible:ring-2
                focus-visible:ring-warm
                md:right-8
              "
            >
              <ChevronRight size={20} strokeWidth={1.5} aria-hidden="true" />
            </button>
          </div>

          <div
            className="
              grid gap-3
              border-t border-white/10
              px-5 py-5
              md:grid-cols-[1fr_auto]
              md:items-end
              md:px-8
            "
          >
            <h2
              className="
                font-display
                text-3xl
                font-light
                tracking-[-0.03em]
                text-white
                md:text-4xl
              "
            >
              {activeImage.title}
            </h2>

            <p
              className="
                font-body
                text-[0.58rem]
                font-medium uppercase
                tracking-[0.2em]
                text-white/40
              "
            >
              {[activeImage.location, activeImage.year]
                .filter(Boolean)
                .join(' · ')}
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
