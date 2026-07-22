'use client'

import { motion, useInView, useReducedMotion } from 'framer-motion'
import Image from 'next/image'
import { useRef, useState } from 'react'
import { galleryArchiveImages } from '@/data/gallery-images'
import GalleryLightbox from './gallery-lightbox'

const motionEase = [0.16, 1, 0.3, 1] as const

export default function GalleryGrid() {
  const sectionRef = useRef<HTMLElement | null>(null)
  const shouldReduceMotion = useReducedMotion()
  const inView = useInView(sectionRef, {
    once: true,
    margin: '-80px',
  })

  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  return (
    <>
      <section
        ref={sectionRef}
        id="archivo"
        className="
          relative
          bg-background
          py-24
          md:py-32
          lg:py-40
        "
      >
        <div
          className="
            mx-auto
            w-full max-w-[90rem]
            px-6
            md:px-10
            lg:px-14
            xl:px-16
          "
        >
          <motion.div
            initial={
              shouldReduceMotion
                ? false
                : {
                    opacity: 0,
                    y: 30,
                  }
            }
            animate={
              inView || shouldReduceMotion
                ? {
                    opacity: 1,
                    y: 0,
                  }
                : {}
            }
            transition={{
              duration: shouldReduceMotion ? 0 : 0.85,
              ease: motionEase,
            }}
            className="
              mb-14
              grid gap-8
              border-b border-white/10
              pb-10
              md:grid-cols-[1fr_auto]
              md:items-end
              md:pb-14
            "
          >
            <div>
              <p
                className="
                  mb-5
                  font-body
                  text-[0.58rem]
                  font-medium uppercase
                  tracking-[0.28em]
                  text-warm
                "
              >
                Selección completa
              </p>

              <h2
                className="
                  max-w-[12ch]
                  font-display
                  text-[clamp(3.5rem,7vw,7rem)]
                  font-light
                  leading-[0.88]
                  tracking-[-0.045em]
                  text-foreground
                "
              >
                Cada evento
                <span className="block italic text-foreground/45">
                  cuenta una historia.
                </span>
              </h2>
            </div>

            <p
              className="
                font-body
                text-[0.58rem]
                font-medium uppercase
                tracking-[0.2em]
                text-muted-foreground
                md:text-right
              "
            >
              {String(galleryArchiveImages.length).padStart(2, '0')} imágenes
            </p>
          </motion.div>

          <div
            className="
              grid
              auto-rows-[15rem]
              grid-cols-1
              gap-3
              md:auto-rows-[18rem]
              md:grid-cols-3
              md:gap-4
              lg:auto-rows-[21rem]
            "
          >
            {galleryArchiveImages.map((image, index) => (
              <motion.button
                key={image.id}
                type="button"
                onClick={() => setActiveIndex(index)}
                initial={
                  shouldReduceMotion
                    ? false
                    : {
                        opacity: 0,
                        y: 30,
                      }
                }
                animate={
                  inView || shouldReduceMotion
                    ? {
                        opacity: 1,
                        y: 0,
                      }
                    : {}
                }
                transition={{
                  duration: shouldReduceMotion ? 0 : 0.75,
                  delay: shouldReduceMotion ? 0 : index * 0.07,
                  ease: motionEase,
                }}
                className={`
                  group
                  relative
                  overflow-hidden
                  bg-white/5
                  text-left
                  focus-visible:outline-none
                  focus-visible:ring-2
                  focus-visible:ring-warm
                  ${image.layout}
                `}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  quality={92}
                  sizes="
                    (max-width: 768px) 100vw,
                    (max-width: 1200px) 66vw,
                    50vw
                  "
                  className={`
                    object-cover
                    transition-transform
                    duration-1000
                    ease-out
                    group-hover:scale-[1.035]
                    ${image.position ?? 'object-center'}
                  `}
                />

                <div
                  aria-hidden="true"
                  className="
                    absolute inset-0
                    bg-gradient-to-t
                    from-black/80
                    via-black/10
                    to-transparent
                    opacity-75
                    transition-opacity duration-500
                    group-hover:opacity-100
                  "
                />

                <div
                  className="
                    absolute inset-x-0 bottom-0
                    p-5
                    md:p-7
                  "
                >
                  <p
                    className="
                      font-body
                      text-[0.52rem]
                      font-medium uppercase
                      tracking-[0.2em]
                      text-warm
                    "
                  >
                    {image.category}
                  </p>

                  <h3
                    className="
                      mt-2
                      max-w-md
                      font-display
                      text-3xl
                      font-light
                      leading-none
                      tracking-[-0.03em]
                      text-white
                      md:text-4xl
                    "
                  >
                    {image.title}
                  </h3>

                  <div
                    className="
                      mt-4
                      flex items-center gap-3
                      font-body
                      text-[0.52rem]
                      uppercase
                      tracking-[0.18em]
                      text-white/45
                    "
                  >
                    <span>{String(index + 1).padStart(2, '0')}</span>

                    <span aria-hidden="true" className="h-px w-8 bg-white/30" />

                    <span>Ver imagen</span>
                  </div>
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      <GalleryLightbox
        images={galleryArchiveImages}
        activeIndex={activeIndex}
        onClose={() => setActiveIndex(null)}
        onChange={setActiveIndex}
      />
    </>
  )
}
