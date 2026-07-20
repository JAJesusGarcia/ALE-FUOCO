'use client'

import { useEffect, useRef } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export default function CursorGlow() {
  const containerRef = useRef<HTMLDivElement | null>(null)

  const mouseX = useMotionValue(-300)
  const mouseY = useMotionValue(-300)

  const smoothX = useSpring(mouseX, {
    stiffness: 90,
    damping: 22,
    mass: 0.35,
  })

  const smoothY = useSpring(mouseY, {
    stiffness: 90,
    damping: 22,
    mass: 0.35,
  })

  useEffect(() => {
    const mediaQuery = window.matchMedia(
      '(hover: hover) and (pointer: fine)',
    )

    if (!mediaQuery.matches) return

    const handleMouseMove = (event: MouseEvent) => {
      mouseX.set(event.clientX)
      mouseY.set(event.clientY)

      if (containerRef.current) {
        containerRef.current.dataset.visible = 'true'
      }
    }

    const handleMouseLeave = () => {
      if (containerRef.current) {
        containerRef.current.dataset.visible = 'false'
      }
    }

    window.addEventListener('mousemove', handleMouseMove)
    document.documentElement.addEventListener(
      'mouseleave',
      handleMouseLeave,
    )

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      document.documentElement.removeEventListener(
        'mouseleave',
        handleMouseLeave,
      )
    }
  }, [mouseX, mouseY])

  return (
    <div
      ref={containerRef}
      className="cursor-glow-container"
      data-visible="false"
      aria-hidden="true"
    >
      <motion.div
        className="cursor-glow-main"
        style={{
          x: smoothX,
          y: smoothY,
        }}
      />

      <motion.div
        className="cursor-glow-core"
        style={{
          x: smoothX,
          y: smoothY,
        }}
      />
    </div>
  )
}