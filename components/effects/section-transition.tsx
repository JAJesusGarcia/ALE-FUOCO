'use client'

import { motion } from 'framer-motion'

interface SectionTransitionProps {
  label?: string
  number?: string
  direction?: 'left' | 'right'
}

export default function SectionTransition({
  label = 'Next sequence',
  number = '02',
  direction = 'right',
}: SectionTransitionProps) {
  const originClass =
    direction === 'left' ? 'origin-right' : 'origin-left'

  return (
    <div
      className="
        pointer-events-none
        relative mx-auto
        flex w-[min(100%-2rem,90rem)]
        items-center gap-4
        py-8
        md:w-[min(100%-4rem,90rem)]
        md:gap-6
        md:py-10
      "
      aria-hidden="true"
    >
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{
          once: true,
          amount: 0.6,
        }}
        transition={{
          duration: 1.5,
          ease: [0.16, 1, 0.3, 1],
        }}
        className={`
          h-px flex-1
          bg-[linear-gradient(90deg,transparent,rgba(244,161,92,0.45),rgba(255,255,255,0.08))]
          ${originClass}
        `}
      />

      <motion.div
        initial={{
          opacity: 0,
          y: 10,
        }}
        whileInView={{
          opacity: 1,
          y: 0,
        }}
        viewport={{
          once: true,
          amount: 0.6,
        }}
        transition={{
          duration: 0.8,
          delay: 0.45,
          ease: [0.16, 1, 0.3, 1],
        }}
        className="
          flex shrink-0
          items-center gap-3
          font-body uppercase
        "
      >
        <span
          className="
            hidden
            text-[0.42rem]
            font-medium tracking-[0.2em]
            text-white/20
            sm:inline
          "
        >
          {label}
        </span>

        <strong
          className="
            font-mono text-[0.5rem]
            font-normal tracking-[0.14em]
            text-warm/55
          "
        >
          {number}
        </strong>
      </motion.div>

      <motion.span
        initial={{
          opacity: 0,
          scale: 0.5,
        }}
        whileInView={{
          opacity: 1,
          scale: 1,
        }}
        viewport={{
          once: true,
          amount: 0.6,
        }}
        transition={{
          duration: 0.7,
          delay: 0.7,
          ease: [0.16, 1, 0.3, 1],
        }}
        className="
          size-[0.35rem]
          shrink-0 rounded-full
          bg-warm/70
          shadow-[0_0_8px_rgba(244,161,92,0.45)]
        "
      />
    </div>
  )
}