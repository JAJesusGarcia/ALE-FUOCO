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
  return (
    <div
      className="section-transition"
      aria-hidden="true"
    >
      <motion.div
        initial={{
          scaleX: 0,
        }}
        whileInView={{
          scaleX: 1,
        }}
        viewport={{
          once: true,
          amount: 0.6,
        }}
        transition={{
          duration: 1.5,
          ease: [0.16, 1, 0.3, 1],
        }}
        className={`section-transition-line ${
          direction === 'left'
            ? 'origin-right'
            : 'origin-left'
        }`}
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
        className="section-transition-data"
      >
        <span>{label}</span>

        <strong>{number}</strong>
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
        className="section-transition-led"
      />
    </div>
  )
}