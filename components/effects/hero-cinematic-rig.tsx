'use client'

import { useEffect, useState } from 'react'

const FPS = 25

const laserLines = Array.from({ length: 9 }, (_, index) => index)
const audioBars = Array.from({ length: 18 }, (_, index) => index)

function formatTimecode(totalFrames: number) {
  const frames = totalFrames % FPS
  const totalSeconds = Math.floor(totalFrames / FPS)
  const seconds = totalSeconds % 60
  const totalMinutes = Math.floor(totalSeconds / 60)
  const minutes = totalMinutes % 60
  const hours = Math.floor(totalMinutes / 60)

  return [hours, minutes, seconds, frames]
    .map((value) => value.toString().padStart(2, '0'))
    .join(':')
}

export default function HeroCinematicRig() {
  const [frames, setFrames] = useState(0)

  useEffect(() => {
    const desktopQuery = window.matchMedia('(min-width: 768px)')
    const reducedMotionQuery = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    )

    let animationFrameId: number | null = null
    let initialTimestamp: number | null = null
    let previousFrame = -1

    const stopTimecode = () => {
      if (animationFrameId !== null) {
        window.cancelAnimationFrame(animationFrameId)
        animationFrameId = null
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
      const nextFrame = Math.floor(elapsedMilliseconds / (1000 / FPS))

      if (nextFrame !== previousFrame) {
        previousFrame = nextFrame
        setFrames(nextFrame)
      }

      animationFrameId = window.requestAnimationFrame(updateTimecode)
    }

    const startTimecode = () => {
      stopTimecode()

      if (
        desktopQuery.matches &&
        !reducedMotionQuery.matches &&
        document.visibilityState === 'visible'
      ) {
        animationFrameId = window.requestAnimationFrame(updateTimecode)
      }
    }

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        startTimecode()
      } else {
        stopTimecode()
      }
    }

    desktopQuery.addEventListener('change', startTimecode)
    reducedMotionQuery.addEventListener('change', startTimecode)
    document.addEventListener('visibilitychange', handleVisibilityChange)

    startTimecode()

    return () => {
      stopTimecode()

      desktopQuery.removeEventListener('change', startTimecode)
      reducedMotionQuery.removeEventListener('change', startTimecode)
      document.removeEventListener('visibilitychange', handleVisibilityChange)
    }
  }, [])

  return (
    <div
      className="
  pointer-events-none
  absolute inset-0 z-[8]
  overflow-hidden
  [contain:layout_paint]
"
      aria-hidden="true"
    >
      {/* Vignette general */}
      <div
        className="
          absolute inset-0
          bg-[radial-gradient(circle_at_center,transparent_20%,rgba(0,0,0,0.18)_58%,rgba(0,0,0,0.76)_100%)]
        "
      />

      {/* Haze izquierdo */}
      <div
        className="
          hero-animate-haze-left
          absolute -top-[15%] -left-[18%]
          h-[130%] w-[48%]
          bg-[radial-gradient(ellipse_at_center,rgba(244,161,92,0.11)_0%,rgba(244,161,92,0.035)_38%,transparent_72%)]
          opacity-30
          blur-[75px]
          mix-blend-screen
        "
      />

      {/* Haze derecho */}
      <div
        className="
          hero-animate-haze-right
          absolute -top-[10%] -right-[20%]
          h-[125%] w-[50%]
          bg-[radial-gradient(ellipse_at_center,rgba(255,225,197,0.085)_0%,rgba(244,161,92,0.025)_42%,transparent_74%)]
          opacity-25
          blur-[80px]
          mix-blend-screen
        "
      />

      {/* Beams */}
      {/* Beams tipo buscacielos */}
      <div className="absolute inset-0 overflow-hidden">
        <span
          className="
      hero-searchlight hero-searchlight-one
      absolute bottom-[-32vh] left-[4%]
      h-[145vh] w-[28vw]
      max-w-[24rem]
      origin-bottom
      opacity-65
      mix-blend-screen
    "
        />

        <span
          className="
      hero-searchlight hero-searchlight-two
      absolute bottom-[-32vh] left-[26%]
      h-[145vh] w-[25vw]
      max-w-[22rem]
      origin-bottom
      opacity-55
      mix-blend-screen
    "
        />

        <span
          className="
      hero-searchlight hero-searchlight-three
      absolute right-[25%] bottom-[-32vh]
      h-[145vh] w-[25vw]
      max-w-[22rem]
      origin-bottom
      opacity-55
      mix-blend-screen
    "
        />

        <span
          className="
      hero-searchlight hero-searchlight-four
      absolute right-[3%] bottom-[-32vh]
      h-[145vh] w-[28vw]
      max-w-[24rem]
      origin-bottom
      opacity-65
      mix-blend-screen
    "
        />
      </div>

      <div
        className="
          hero-animate-beam-two
          absolute -top-[20%] left-[29%]
          h-[128%] w-[6.5rem]
          origin-top
          bg-[linear-gradient(180deg,rgba(244,161,92,0.12),rgba(244,161,92,0.025)_62%,transparent_94%)]
          opacity-[0.07]
          blur-[20px]
          mix-blend-screen
        "
      />

      <div
        className="
          hero-animate-beam-three
          absolute -top-[20%] right-[27%]
          h-[128%] w-[7rem]
          origin-top
          bg-[linear-gradient(180deg,rgba(255,226,198,0.13),rgba(244,161,92,0.03)_58%,transparent_94%)]
          opacity-[0.07]
          blur-[20px]
          mix-blend-screen
        "
      />

      <div
        className="
          hero-animate-beam-four
          absolute -top-[18%] right-[7%]
          h-[125%] w-[8rem]
          origin-top
          bg-[linear-gradient(180deg,rgba(244,161,92,0.14),rgba(244,161,92,0.035)_56%,transparent_92%)]
          opacity-[0.08]
          blur-[18px]
          mix-blend-screen
        "
      />

      {/* Láseres */}
      {/* Láseres escénicos */}
      {/* <div
        className="
    absolute top-[18%] left-1/2
    h-[70vh] w-[150vw]
    max-w-[110rem]
    -translate-x-1/2
    overflow-visible
  "
      >
        <div
          className="
      hero-laser-head
      absolute top-0 left-1/2
      size-3
      -translate-x-1/2
      rounded-full
      bg-orange-100
      shadow-[0_0_12px_rgba(255,214,170,1),0_0_30px_rgba(244,161,92,0.9),0_0_70px_rgba(244,161,92,0.55)]
    "
        />

        {laserLines.map((line) => {
          const center = (laserLines.length - 1) / 2
          const angle = (line - center) * 5.8

          return (
            <span
              key={line}
              className="
          hero-laser-line
          absolute top-0 left-1/2
          block h-[2px] w-[64vw]
          max-w-[62rem]
          origin-left
          bg-[linear-gradient(90deg,rgba(255,236,210,0.98)_0%,rgba(244,161,92,0.8)_18%,rgba(244,161,92,0.28)_62%,transparent_100%)]
          opacity-70
          shadow-[0_0_5px_rgba(255,235,210,0.95),0_0_14px_rgba(244,161,92,0.7)]
        "
              style={{
                transform: `rotate(${angle}deg)`,
                animationDelay: `${line * 90}ms`,
              }}
            />
          )
        })}
      </div> */}

      {/* REC */}
      <div
        className="
          absolute top-[clamp(5.5rem,8vw,7.5rem)]
          left-[clamp(1.5rem,4vw,4.5rem)]
          flex items-center gap-2
          font-body text-[0.48rem]
          font-medium tracking-[0.22em]
          text-white/35 uppercase
        "
      >
        <span
          className="
            hero-animate-rec
            size-[0.38rem]
            rounded-full
            bg-red-500/80
            shadow-[0_0_8px_rgba(239,68,68,0.7)]
          "
        />

        <span>REC</span>
      </div>

      {/* Timecode */}
      <div
        className="
          absolute top-[clamp(5.5rem,8vw,7.5rem)]
          right-[clamp(1.5rem,4vw,4.5rem)]
          flex items-center gap-2.5
          font-body uppercase
        "
      >
        <span
          className="
            text-[0.42rem]
            font-medium tracking-[0.2em]
            text-white/25
          "
        >
          TC
        </span>

        <strong
          className="
            min-w-[8.5rem]
            font-mono text-[0.68rem]
            font-normal tracking-[0.12em]
            text-white/45
          "
        >
          {formatTimecode(frames)}
        </strong>
      </div>

      {/* Datos de sistema */}
      <div
        className="
          absolute top-1/2
          left-[clamp(1.5rem,4vw,4.5rem)]
          hidden -translate-y-1/2
          flex-col gap-4
          lg:flex
        "
      >
        <SystemItem label="UNIVERSE" value="02" />
        <SystemItem label="DMX" value="ACTIVE" />
        <SystemItem label="FPS" value="60" />
      </div>

      {/* Medidor de audio */}
      <div
        className="
          absolute right-[clamp(1.5rem,4vw,4.5rem)]
          bottom-[clamp(5.5rem,9vw,8rem)]
          hidden w-[10rem]
          lg:block
        "
      >
        <div
          className="
            mb-2 flex items-center justify-between
            font-body text-[0.36rem]
            font-medium tracking-[0.17em]
            text-white/25 uppercase
          "
        >
          <span>MASTER</span>
          <span>-06 DB</span>
        </div>

        <div className="flex h-10 items-end gap-[0.18rem]">
          {audioBars.map((bar) => (
            <span
              key={bar}
              className="
                hero-animate-audio
                block min-h-px flex-1
                origin-bottom
                bg-[linear-gradient(180deg,rgba(255,223,191,0.6),rgba(244,161,92,0.15))]
                opacity-30
              "
              style={{
                animationDelay: `${bar * 70}ms`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Esquinas técnicas */}
      <HudCorner className="top-[5rem] left-[1.5rem] border-t border-l lg:left-[3rem]" />

      <HudCorner className="top-[5rem] right-[1.5rem] border-t border-r lg:right-[3rem]" />

      <HudCorner className="bottom-[4.5rem] left-[1.5rem] border-b border-l lg:left-[3rem]" />

      <HudCorner className="right-[1.5rem] bottom-[4.5rem] border-r border-b lg:right-[3rem]" />

      {/* Línea inferior */}
      <div
        className="
          absolute right-[clamp(1.5rem,4vw,4.5rem)]
          bottom-[2.2rem]
          left-[clamp(1.5rem,4vw,4.5rem)]
          hidden
          items-center justify-between
          border-t border-white/[0.07]
          pt-2.5
          font-body text-[0.34rem]
          font-medium tracking-[0.18em]
          text-white/20 uppercase
          xl:flex
        "
      >
        <span>ARTNET</span>
        <span>CH 001–512</span>
        <span>LIGHT DESIGN</span>
        <span>LIVE OUTPUT</span>
      </div>
    </div>
  )
}

interface SystemItemProps {
  label: string
  value: string
}

function SystemItem({ label, value }: SystemItemProps) {
  return (
    <div className="flex min-w-[5rem] flex-col gap-1 font-body uppercase">
      <span
        className="
          text-[0.34rem]
          font-medium tracking-[0.2em]
          text-white/20
        "
      >
        {label}
      </span>

      <strong
        className="
          text-[0.5rem]
          font-medium tracking-[0.14em]
          text-[rgba(244,161,92,0.52)]
        "
      >
        {value}
      </strong>
    </div>
  )
}

interface HudCornerProps {
  className: string
}

function HudCorner({ className }: HudCornerProps) {
  return (
    <div
      className={`
        absolute size-5
        border-white/[0.16]
        lg:size-7
        ${className}
      `}
    />
  )
}
