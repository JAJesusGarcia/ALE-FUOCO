'use client'

import { useEffect, useState } from 'react'

const FPS = 25

function formatTimecode(totalFrames: number) {
  const frames = totalFrames % FPS
  const totalSeconds = Math.floor(totalFrames / FPS)
  const seconds = totalSeconds % 60
  const totalMinutes = Math.floor(totalSeconds / 60)
  const minutes = totalMinutes % 60
  const hours = Math.floor(totalMinutes / 60) % 24

  return [hours, minutes, seconds, frames]
    .map((value) => value.toString().padStart(2, '0'))
    .join(':')
}

export default function GlobalTechnicalHud() {
  const [frames, setFrames] = useState(0)
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const desktopQuery = window.matchMedia('(min-width: 768px)')
    const reducedMotionQuery = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    )

    let timecodeAnimationFrame: number | null = null
    let scrollAnimationFrame: number | null = null
    let initialTimestamp: number | null = null
    let previousFrame = -1

    const stopTimecode = () => {
      if (timecodeAnimationFrame !== null) {
        window.cancelAnimationFrame(timecodeAnimationFrame)
        timecodeAnimationFrame = null
      }

      initialTimestamp = null
      previousFrame = -1
    }

    const updateTimecode = (timestamp: number) => {
      if (
        !desktopQuery.matches ||
        reducedMotionQuery.matches ||
        document.visibilityState !== 'visible'
      ) {
        stopTimecode()
        return
      }

      if (initialTimestamp === null) {
        initialTimestamp = timestamp
      }

      const elapsedMilliseconds = timestamp - initialTimestamp
      const nextFrame = Math.floor(
        elapsedMilliseconds / (1000 / FPS),
      )

      if (nextFrame !== previousFrame) {
        previousFrame = nextFrame
        setFrames(nextFrame)
      }

      timecodeAnimationFrame =
        window.requestAnimationFrame(updateTimecode)
    }

    const startTimecode = () => {
      stopTimecode()

      if (
        desktopQuery.matches &&
        !reducedMotionQuery.matches &&
        document.visibilityState === 'visible'
      ) {
        timecodeAnimationFrame =
          window.requestAnimationFrame(updateTimecode)
      }
    }

    const calculateScrollProgress = () => {
      scrollAnimationFrame = null

      if (!desktopQuery.matches) {
        setScrollProgress(0)
        return
      }

      const documentHeight =
        document.documentElement.scrollHeight
      const viewportHeight = window.innerHeight
      const scrollableHeight =
        documentHeight - viewportHeight

      const nextProgress =
        scrollableHeight > 0
          ? Math.min(
              Math.max(window.scrollY / scrollableHeight, 0),
              1,
            )
          : 0

      setScrollProgress((currentProgress) => {
        if (
          Math.abs(currentProgress - nextProgress) <
          0.001
        ) {
          return currentProgress
        }

        return nextProgress
      })
    }

    const requestScrollUpdate = () => {
      if (scrollAnimationFrame !== null) return

      scrollAnimationFrame =
        window.requestAnimationFrame(
          calculateScrollProgress,
        )
    }

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        startTimecode()
        requestScrollUpdate()
      } else {
        stopTimecode()
      }
    }

    const handleMediaChange = () => {
      startTimecode()
      requestScrollUpdate()
    }

    desktopQuery.addEventListener('change', handleMediaChange)
    reducedMotionQuery.addEventListener(
      'change',
      handleMediaChange,
    )

    document.addEventListener(
      'visibilitychange',
      handleVisibilityChange,
    )

    window.addEventListener('scroll', requestScrollUpdate, {
      passive: true,
    })

    window.addEventListener('resize', requestScrollUpdate, {
      passive: true,
    })

    startTimecode()
    requestScrollUpdate()

    return () => {
      stopTimecode()

      if (scrollAnimationFrame !== null) {
        window.cancelAnimationFrame(scrollAnimationFrame)
      }

      desktopQuery.removeEventListener(
        'change',
        handleMediaChange,
      )

      reducedMotionQuery.removeEventListener(
        'change',
        handleMediaChange,
      )

      document.removeEventListener(
        'visibilitychange',
        handleVisibilityChange,
      )

      window.removeEventListener(
        'scroll',
        requestScrollUpdate,
      )

      window.removeEventListener(
        'resize',
        requestScrollUpdate,
      )
    }
  }, [])

  const progressPercentage = Math.round(
    scrollProgress * 100,
  )
    .toString()
    .padStart(3, '0')

  return (
    <div
      className="
        pointer-events-none
        fixed inset-0 z-[90]
        hidden overflow-hidden
        font-body
        [contain:layout_paint]
        md:block
      "
      aria-hidden="true"
    >
      {/* Barra superior */}
      <div
        className="
          absolute top-0 right-0 left-0
          flex h-9 items-center
          justify-between
          border-b border-white/[0.06]
          bg-black/[0.08]
          px-[clamp(1.25rem,3vw,3rem)]
          text-[0.34rem]
          font-medium tracking-[0.18em]
          text-white/20 uppercase
        "
      >
        <div className="flex items-center gap-2">
          <span
            className="
              global-hud-animate-led
              size-[0.3rem]
              rounded-full
              bg-[rgba(244,161,92,0.65)]
              shadow-[0_0_7px_rgba(244,161,92,0.45)]
            "
          />

          <span>System active</span>
        </div>

        <div
          className="
            absolute left-1/2
            hidden -translate-x-1/2
            lg:block
          "
        >
          <span>AF / LIVE CONTROL</span>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-white/15">
            TC
          </span>

          <strong
            className="
              min-w-[7.5rem]
              font-mono text-[0.55rem]
              font-normal tracking-[0.12em]
              text-white/30
            "
          >
            {formatTimecode(frames)}
          </strong>
        </div>
      </div>

      {/* Progreso lateral */}
      <div
        className="
          absolute top-1/2 right-[clamp(0.6rem,1.3vw,1.25rem)]
          flex h-[min(42vh,24rem)]
          -translate-y-1/2
          flex-col items-center gap-2
          opacity-60
        "
      >
        <span
          className="
            min-w-[1.5rem]
            text-center
            font-mono text-[0.34rem]
            tracking-[0.1em]
            text-white/20
          "
        >
          {progressPercentage}
        </span>

        <div
          className="
            relative w-px flex-1
            overflow-hidden
            bg-white/[0.08]
          "
        >
          <span
            className="
              absolute inset-0
              origin-top
              bg-[linear-gradient(180deg,rgba(244,161,92,0.25),rgba(244,161,92,0.72))]
              shadow-[0_0_8px_rgba(244,161,92,0.28)]
              transition-transform
              duration-150
              ease-out
            "
            style={{
              transform: `scaleY(${scrollProgress})`,
            }}
          />
        </div>

        <span
          className="
            min-w-[1.5rem]
            text-center
            font-mono text-[0.34rem]
            tracking-[0.1em]
            text-white/20
          "
        >
          100
        </span>
      </div>

      {/* Barra inferior */}
      <div
        className="
          absolute right-0 bottom-0 left-0
          flex h-9 items-center
          justify-between
          border-t border-white/[0.06]
          bg-black/[0.08]
          px-[clamp(1.25rem,3vw,3rem)]
          text-[0.34rem]
          font-medium tracking-[0.18em]
          text-white/20 uppercase
        "
      >
        <div className="hidden items-center gap-5 lg:flex">
          <span>CH 001–512</span>
          <span>LIGHT DESIGN</span>
        </div>

        <div
          className="
            absolute left-1/2
            flex -translate-x-1/2
            items-center gap-2
          "
        >
          <span
            className="
              global-hud-animate-record
              size-[0.3rem]
              rounded-full
              bg-red-500/70
              shadow-[0_0_7px_rgba(239,68,68,0.45)]
            "
          />

          <span>LIVE OUTPUT</span>
        </div>

        <div
          className="
            ml-auto hidden
            items-center gap-5
            lg:flex
          "
        >
          <span>CÓRDOBA</span>
          <span>ARGENTINA</span>
        </div>
      </div>

      {/* Esquinas técnicas */}
      <HudCorner className="top-12 left-5 border-t border-l lg:left-10" />

      <HudCorner className="top-12 right-5 border-t border-r lg:right-10" />

      <HudCorner className="bottom-12 left-5 border-b border-l lg:left-10" />

      <HudCorner className="right-5 bottom-12 border-r border-b lg:right-10" />
    </div>
  )
}

interface HudCornerProps {
  className: string
}

function HudCorner({ className }: HudCornerProps) {
  return (
    <span
      className={`
        absolute size-4
        border-white/[0.12]
        lg:size-6
        ${className}
      `}
    />
  )
}