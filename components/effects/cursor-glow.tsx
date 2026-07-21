'use client'

import { useEffect, useRef } from 'react'
import {
  motion,
  useMotionValue,
  useSpring,
} from 'framer-motion'

export default function CursorGlow() {
  const containerRef = useRef<HTMLDivElement | null>(null)

  const pointerX = useMotionValue(-300)
  const pointerY = useMotionValue(-300)

  const smoothX = useSpring(pointerX, {
    stiffness: 90,
    damping: 22,
    mass: 0.35,
  })

  const smoothY = useSpring(pointerY, {
    stiffness: 90,
    damping: 22,
    mass: 0.35,
  })

  useEffect(() => {
    const pointerQuery = window.matchMedia(
      '(hover: hover) and (pointer: fine)',
    )

    const reducedMotionQuery = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    )

    const setVisibility = (visible: boolean) => {
      if (!containerRef.current) return

      containerRef.current.dataset.visible = String(visible)
    }

    const handlePointerMove = (event: PointerEvent) => {
      if (
        !pointerQuery.matches ||
        reducedMotionQuery.matches ||
        event.pointerType === 'touch'
      ) {
        return
      }

      pointerX.set(event.clientX)
      pointerY.set(event.clientY)
      setVisibility(true)
    }

    const handlePointerLeave = () => {
      setVisibility(false)
    }

    const handleWindowBlur = () => {
      setVisibility(false)
    }

    const handleMediaChange = () => {
      if (
        !pointerQuery.matches ||
        reducedMotionQuery.matches
      ) {
        setVisibility(false)
        pointerX.set(-300)
        pointerY.set(-300)
      }
    }

    window.addEventListener(
      'pointermove',
      handlePointerMove,
      {
        passive: true,
      },
    )

    document.documentElement.addEventListener(
      'pointerleave',
      handlePointerLeave,
    )

    window.addEventListener('blur', handleWindowBlur)

    pointerQuery.addEventListener(
      'change',
      handleMediaChange,
    )

    reducedMotionQuery.addEventListener(
      'change',
      handleMediaChange,
    )

    handleMediaChange()

    return () => {
      window.removeEventListener(
        'pointermove',
        handlePointerMove,
      )

      document.documentElement.removeEventListener(
        'pointerleave',
        handlePointerLeave,
      )

      window.removeEventListener(
        'blur',
        handleWindowBlur,
      )

      pointerQuery.removeEventListener(
        'change',
        handleMediaChange,
      )

      reducedMotionQuery.removeEventListener(
        'change',
        handleMediaChange,
      )
    }
  }, [pointerX, pointerY])

  return (
    <div
      ref={containerRef}
      data-visible="false"
      aria-hidden="true"
      className="
        pointer-events-none
        fixed inset-0 z-[70]
        hidden overflow-hidden
        opacity-0
        transition-opacity duration-500
        data-[visible=true]:opacity-100
        lg:block
        motion-reduce:hidden
      "
    >
      <motion.div
        className="
          absolute top-0 left-0
          size-[26rem]
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          bg-[radial-gradient(circle,rgba(244,161,92,0.10)_0%,rgba(244,161,92,0.035)_38%,transparent_72%)]
          blur-[55px]
          mix-blend-screen
          will-change-transform
        "
        style={{
          x: smoothX,
          y: smoothY,
        }}
      />

      <motion.div
        className="
          absolute top-0 left-0
          size-24
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          bg-[radial-gradient(circle,rgba(255,224,194,0.16)_0%,rgba(244,161,92,0.055)_38%,transparent_72%)]
          blur-[18px]
          mix-blend-screen
          will-change-transform
        "
        style={{
          x: smoothX,
          y: smoothY,
        }}
      />
    </div>
  )
}