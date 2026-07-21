'use client'

import { useEffect, useState } from 'react'

const FPS = 25

const desktopLaserLines = Array.from({ length: 9 }, (_, index) => index)
const mobileLaserLines = Array.from({ length: 5 }, (_, index) => index)
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
      aria-hidden="true"
      className={`pointer-events-none
        absolute inset-0 z-[8]
        overflow-hidden
        [contain:layout_paint]`}
    >
      {/* Oscurecimiento y profundidad general */}
      <div
        className={`absolute inset-0
          bg-[radial-gradient(circle_at_center,transparent_28%,rgba(0,0,0,0.15)_64%,rgba(0,0,0,0.68)_100%)]`}
      />

      {/* ========================================================= */}
      {/* RIG MÓVIL */}
      {/* ========================================================= */}

      <div className={`absolute inset-0 overflow-hidden md:hidden`}>
        {/* Haze móvil */}
        <div
          className={`hero-mobile-haze
            absolute -bottom-[12%] left-1/2
            h-[58%] w-[115%]
            -translate-x-1/2
            rounded-[50%]
            bg-[radial-gradient(ellipse_at_center,rgba(244,161,92,0.13)_0%,rgba(244,161,92,0.045)_42%,transparent_73%)]
            blur-[55px]
            mix-blend-screen`}
        />

        {/* Beams móviles */}
        <div className={`absolute inset-0 overflow-hidden`}>
          <span
            className={`hero-mobile-beam
              hero-mobile-beam-one
              absolute bottom-[-18%] left-[-8%]
              h-[118%] w-[34%]
              origin-bottom
              opacity-45
              mix-blend-screen`}
          />

          <span
            className={`hero-mobile-beam
              hero-mobile-beam-two
              absolute bottom-[-20%] left-[33%]
              h-[120%] w-[30%]
              origin-bottom
              opacity-40
              mix-blend-screen`}
          />

          <span
            className={`hero-mobile-beam
              hero-mobile-beam-three
              absolute right-[-7%] bottom-[-18%]
              h-[118%] w-[34%]
              origin-bottom
              opacity-45
              mix-blend-screen`}
          />
        </div>

        {/* Láseres móviles sutiles */}
        {/* <div
          className={`absolute top-[21%] left-1/2
            h-[24rem] w-[145%]
            -translate-x-1/2`}
        >
          <span
            className={`hero-mobile-laser-source
              absolute top-0 left-1/2
              size-1.5
              -translate-x-1/2
              rounded-full
              bg-[#ffd8b0]
              shadow-[0_0_8px_rgba(255,222,188,0.9),0_0_20px_rgba(244,161,92,0.55)]`}
          />

          {mobileLaserLines.map((line) => {
            const center = (mobileLaserLines.length - 1) / 2
            const angle = (line - center) * 8

            return (
              <span
                key={line}
                className={`hero-mobile-laser
                  absolute top-0 left-1/2
                  block h-px w-[72%]
                  origin-left
                  bg-[linear-gradient(90deg,rgba(255,235,214,0.58),rgba(244,161,92,0.2)_46%,transparent)]
                  opacity-25
                  shadow-[0_0_5px_rgba(244,161,92,0.28)]`}
                style={{
                  transform: `rotate(${angle}deg)`,
                  animationDelay: `${line * 140}ms`,
                }}
              />
            )
          })}
        </div> */}

        {/* REC móvil */}
        <div
          className={`absolute top-[5.5rem] left-6
            flex items-center gap-2
            font-body
            text-[0.45rem]
            font-medium uppercase
            tracking-[0.22em]
            text-white/30`}
        >
          <span
            className={`hero-rec-dot
              size-1.5
              rounded-full
              bg-red-500/55
              shadow-[0_0_7px_rgba(239,68,68,0.55)]`}
          />

          <span>REC</span>
        </div>

        {/* Timecode móvil decorativo */}
        <div
          className={`absolute top-[5.5rem] right-6
            font-mono
            text-[0.48rem]
            tracking-[0.14em]
            text-white/24`}
        >
          00:00:00:00
        </div>

        {/* Esquinas móviles */}
        {/* <HudCorner className={`top-[9.5rem] left-6 border-t border-l`} />
        <HudCorner className={`top-[9.5rem] right-6 border-t border-r`} />
        <HudCorner className={`bottom-[5.5rem] left-6 border-b border-l`} />
        <HudCorner className={`right-6 bottom-[5.5rem] border-r border-b`} /> */}
      </div>

      {/* ========================================================= */}
      {/* RIG TABLET Y ESCRITORIO */}
      {/* ========================================================= */}

      <div className={`absolute inset-0 hidden overflow-hidden md:block`}>
        {/* Haze izquierdo */}
        <div
          className={`hero-desktop-haze-left
            absolute -top-[15%] -left-[18%]
            h-[130%] w-[48%]
            bg-[radial-gradient(ellipse_at_center,rgba(244,161,92,0.15)_0%,rgba(244,161,92,0.045)_38%,transparent_72%)]
            opacity-50
            blur-[75px]
            mix-blend-screen`}
        />

        {/* Haze derecho */}
        <div
          className={`hero-desktop-haze-right
            absolute -top-[10%] -right-[20%]
            h-[125%] w-[50%]
            bg-[radial-gradient(ellipse_at_center,rgba(255,225,197,0.12)_0%,rgba(244,161,92,0.035)_42%,transparent_74%)]
            opacity-40
            blur-[80px]
            mix-blend-screen`}
        />

        {/* Beams de escritorio */}
        <div className={`absolute inset-0 overflow-hidden`}>
          <span
            className={`hero-desktop-beam
              hero-desktop-beam-one
              absolute bottom-[-32vh] left-[3%]
              h-[145vh] w-[26vw]
              max-w-[24rem]
              origin-bottom
              opacity-55
              mix-blend-screen`}
          />

          <span
            className={`hero-desktop-beam
              hero-desktop-beam-two
              absolute bottom-[-32vh] left-[26%]
              h-[145vh] w-[23vw]
              max-w-[21rem]
              origin-bottom
              opacity-48
              mix-blend-screen`}
          />

          <span
            className={`hero-desktop-beam
              hero-desktop-beam-three
              absolute right-[26%] bottom-[-32vh]
              h-[145vh] w-[23vw]
              max-w-[21rem]
              origin-bottom
              opacity-48
              mix-blend-screen`}
          />

          <span
            className={`hero-desktop-beam
              hero-desktop-beam-four
              absolute right-[3%] bottom-[-32vh]
              h-[145vh] w-[26vw]
              max-w-[24rem]
              origin-bottom
              opacity-55
              mix-blend-screen`}
          />
        </div>

        {/* Láseres de escritorio */}
        {/* <div
          className={`absolute top-[16%] left-1/2
            hidden h-[38rem] w-[78rem]
            -translate-x-1/2
            lg:block`}
        >
          <span
            className={`hero-desktop-laser-source
              absolute top-0 left-1/2
              size-2.5
              -translate-x-1/2
              rounded-full
              bg-[#ffe1c4]
              shadow-[0_0_10px_rgba(255,231,207,1),0_0_28px_rgba(244,161,92,0.72)]`}
          />

          {desktopLaserLines.map((line) => {
            const center = (desktopLaserLines.length - 1) / 2
            const angle = (line - center) * 4.6

            return (
              <span
                key={line}
                className={`hero-desktop-laser
                  absolute top-0 left-1/2
                  block h-px w-[58%]
                  origin-left
                  bg-[linear-gradient(90deg,rgba(255,237,218,0.82),rgba(244,161,92,0.46)_30%,rgba(244,161,92,0.08)_68%,transparent)]
                  opacity-40
                  shadow-[0_0_6px_rgba(244,161,92,0.42)]`}
                style={{
                  transform: `rotate(${angle}deg)`,
                  animationDelay: `${line * 130}ms`,
                }}
              />
            )
          })}
        </div> */}

        {/* REC */}
        <div
          className={`absolute top-[clamp(5.5rem,8vw,7.5rem)]
            left-[clamp(1.5rem,4vw,4.5rem)]
            flex items-center gap-2
            font-body text-[0.48rem]
            font-medium uppercase
            tracking-[0.22em]
            text-white/35`}
        >
          <span
            className={`hero-rec-dot
              size-[0.38rem]
              rounded-full
              bg-red-500/80
              shadow-[0_0_8px_rgba(239,68,68,0.7)]`}
          />

          <span>REC</span>
        </div>

        {/* Timecode */}
        <div
          className={`absolute top-[clamp(5.5rem,8vw,7.5rem)]
            right-[clamp(1.5rem,4vw,4.5rem)]
            flex items-center gap-2.5
            font-body uppercase`}
        >
          <span
            className={`text-[0.42rem]
              font-medium tracking-[0.2em]
              text-white/25`}
          >
            TC
          </span>

          <strong
            className={`min-w-[8.5rem]
              font-mono text-[0.68rem]
              font-normal tracking-[0.12em]
              text-white/45`}
          >
            {formatTimecode(frames)}
          </strong>
        </div>

        {/* Datos laterales */}
        <div
          className={`absolute top-1/2
            left-[clamp(1.5rem,4vw,4.5rem)]
            hidden -translate-y-1/2
            flex-col gap-4
            lg:flex`}
        >
          <SystemItem label="UNIVERSE" value="02" />
          <SystemItem label="DMX" value="ACTIVE" />
          <SystemItem label="FPS" value="60" />
        </div>

        {/* Medidor de audio */}
        <div
          className={`absolute right-[clamp(1.5rem,4vw,4.5rem)]
            bottom-[clamp(12.5rem,9vw,8rem)]
            hidden w-[10rem]
            lg:block`}
        >
          <div
            className={`mb-2 flex items-center justify-between
              font-body text-[0.36rem]
              font-medium uppercase
              tracking-[0.17em]
              text-white/25`}
          >
            <span>MASTER</span>
            <span>-06 DB</span>
          </div>

          <div className={`flex h-10 items-end gap-[0.18rem]`}>
            {audioBars.map((bar) => (
              <span
                key={bar}
                className={`hero-audio-bar
                  block min-h-px flex-1
                  origin-bottom
                  bg-[linear-gradient(180deg,rgba(255,223,191,0.6),rgba(244,161,92,0.15))]
                  opacity-30`}
                style={{
                  animationDelay: `${bar * 70}ms`,
                }}
              />
            ))}
          </div>
        </div>

        {/* Esquinas */}
        {/* <HudCorner
          className={`top-[5rem] left-[1.5rem] border-t border-l lg:left-[3rem]`}
        />
        <HudCorner
          className={`top-[5rem] right-[1.5rem] border-t border-r lg:right-[3rem]`}
        />
        <HudCorner
          className={`bottom-[4.5rem] left-[1.5rem] border-b border-l lg:left-[3rem]`}
        />
        <HudCorner
          className={`right-[1.5rem] bottom-[4.5rem] border-r border-b lg:right-[3rem]`}
        /> */}

        {/* Línea inferior */}
        <div
          className={`absolute right-[clamp(1.5rem,4vw,4.5rem)]
            bottom-[1rem]
            left-[clamp(1.5rem,4vw,4.5rem)]
            hidden
            items-center justify-between
            border-t border-white/[0.07]
            pt-2.5
            font-body text-[0.34rem]
            font-medium uppercase
            tracking-[0.18em]
            text-white/20
            xl:flex`}
        >
          <span>ARTNET</span>
          <span>CH 001–512</span>
          <span>LIGHT DESIGN</span>
          <span>LIVE OUTPUT</span>
        </div>
      </div>

      <style jsx>{`
        .hero-mobile-beam,
        .hero-desktop-beam {
          clip-path: polygon(47% 100%, 53% 100%, 100% 0%, 0% 0%);
          background: linear-gradient(
            to top,
            rgba(255, 218, 178, 0.48) 0%,
            rgba(244, 161, 92, 0.22) 20%,
            rgba(255, 229, 202, 0.1) 54%,
            rgba(255, 255, 255, 0.025) 82%,
            transparent 100%
          );
          filter: blur(9px);
          will-change: transform;
        }

        .hero-mobile-beam-one {
          animation: mobile-beam-one 6.5s ease-in-out infinite alternate;
        }

        .hero-mobile-beam-two {
          animation: mobile-beam-two 7.2s ease-in-out infinite alternate;
        }

        .hero-mobile-beam-three {
          animation: mobile-beam-three 6.8s ease-in-out infinite alternate;
        }

        .hero-desktop-beam-one {
          animation: desktop-beam-one 7s ease-in-out infinite alternate;
        }

        .hero-desktop-beam-two {
          animation: desktop-beam-two 6.2s ease-in-out infinite alternate;
        }

        .hero-desktop-beam-three {
          animation: desktop-beam-three 6.5s ease-in-out infinite alternate;
        }

        .hero-desktop-beam-four {
          animation: desktop-beam-four 7.3s ease-in-out infinite alternate;
        }

        .hero-mobile-laser,
        .hero-desktop-laser {
          animation: laser-pulse 2.8s ease-in-out infinite;
        }

        .hero-mobile-laser-source,
        .hero-desktop-laser-source {
          animation: laser-source 2.2s ease-in-out infinite alternate;
        }

        .hero-mobile-haze {
          animation: mobile-haze 7s ease-in-out infinite alternate;
        }

        .hero-desktop-haze-left {
          animation: desktop-haze-left 9s ease-in-out infinite alternate;
        }

        .hero-desktop-haze-right {
          animation: desktop-haze-right 10s ease-in-out infinite alternate;
        }

        .hero-rec-dot {
          animation: rec-pulse 1.4s ease-in-out infinite;
        }

        .hero-audio-bar {
          animation: audio-meter 1.25s ease-in-out infinite alternate;
        }

        @keyframes mobile-beam-one {
          from {
            transform: rotate(-15deg);
          }

          to {
            transform: rotate(4deg);
          }
        }

        @keyframes mobile-beam-two {
          from {
            transform: rotate(-8deg);
          }

          to {
            transform: rotate(9deg);
          }
        }

        @keyframes mobile-beam-three {
          from {
            transform: rotate(15deg);
          }

          to {
            transform: rotate(-4deg);
          }
        }

        @keyframes desktop-beam-one {
          from {
            transform: rotate(-27deg);
          }

          to {
            transform: rotate(-7deg);
          }
        }

        @keyframes desktop-beam-two {
          from {
            transform: rotate(-15deg);
          }

          to {
            transform: rotate(9deg);
          }
        }

        @keyframes desktop-beam-three {
          from {
            transform: rotate(15deg);
          }

          to {
            transform: rotate(-9deg);
          }
        }

        @keyframes desktop-beam-four {
          from {
            transform: rotate(27deg);
          }

          to {
            transform: rotate(7deg);
          }
        }

        @keyframes laser-pulse {
          0%,
          100% {
            opacity: 0.18;
          }

          45% {
            opacity: 0.62;
          }

          70% {
            opacity: 0.3;
          }
        }

        @keyframes laser-source {
          from {
            opacity: 0.55;
            transform: translateX(-50%) scale(0.8);
          }

          to {
            opacity: 1;
            transform: translateX(-50%) scale(1.2);
          }
        }

        @keyframes mobile-haze {
          from {
            opacity: 0.55;
            transform: translateX(-50%) scale(0.9);
          }

          to {
            opacity: 0.95;
            transform: translateX(-50%) scale(1.08);
          }
        }

        @keyframes desktop-haze-left {
          from {
            transform: translate3d(-3%, 0, 0) scale(0.95);
          }

          to {
            transform: translate3d(6%, 3%, 0) scale(1.08);
          }
        }

        @keyframes desktop-haze-right {
          from {
            transform: translate3d(3%, 0, 0) scale(0.96);
          }

          to {
            transform: translate3d(-5%, 2%, 0) scale(1.07);
          }
        }

        @keyframes rec-pulse {
          0%,
          100% {
            opacity: 0.35;
          }

          50% {
            opacity: 1;
          }
        }

        @keyframes audio-meter {
          from {
            transform: scaleY(0.18);
          }

          to {
            transform: scaleY(1);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .hero-mobile-beam,
          .hero-desktop-beam,
          .hero-mobile-laser,
          .hero-desktop-laser,
          .hero-mobile-laser-source,
          .hero-desktop-laser-source,
          .hero-mobile-haze,
          .hero-desktop-haze-left,
          .hero-desktop-haze-right,
          .hero-rec-dot,
          .hero-audio-bar {
            animation: none;
          }
        }
      `}</style>
    </div>
  )
}

interface SystemItemProps {
  label: string
  value: string
}

function SystemItem({ label, value }: SystemItemProps) {
  return (
    <div className={`flex min-w-[5rem] flex-col gap-1 font-body uppercase`}>
      <span
        className={`text-[0.34rem]
          font-medium tracking-[0.2em]
          text-white/20`}
      >
        {label}
      </span>

      <strong
        className={`text-[0.5rem]
          font-medium tracking-[0.14em]
          text-[rgba(244,161,92,0.52)]`}
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
        md:size-7
        ${className}
      `}
    />
  )
}
