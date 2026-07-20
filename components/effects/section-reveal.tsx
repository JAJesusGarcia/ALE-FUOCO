'use client'

import type { ReactNode } from 'react'
import { motion } from 'framer-motion'

interface SectionRevealProps {
  children: ReactNode
  className?: string
  delay?: number
  duration?: number
  distance?: number
  once?: boolean
}

export default function SectionReveal({
  children,
  className = '',
  delay = 0,
  duration = 1,
  distance = 55,
  once = true,
}: SectionRevealProps) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: distance,
        scale: 0.985,
        filter: 'blur(14px)',
      }}
      whileInView={{
        opacity: 1,
        y: 0,
        scale: 1,
        filter: 'blur(0px)',
      }}
      viewport={{
        once,
        amount: 0.15,
        margin: '-60px 0px',
      }}
      transition={{
        duration,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}