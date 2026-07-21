'use client'

const leftLedBars = Array.from({ length: 16 }, (_, index) => index)
const rightSignalBars = Array.from({ length: 22 }, (_, index) => index)

export default function AmbientStageEffects() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-[12] hidden overflow-hidden [contain:layout_paint] md:block"
      aria-hidden="true"
    >
      {/* Haze lateral izquierdo */}
      <div
        className="
          stage-animate-haze-left
          absolute inset-y-0 -left-28
          w-[clamp(7rem,12vw,13rem)]
          bg-[linear-gradient(180deg,transparent_5%,rgba(244,161,92,0.06)_26%,rgba(244,161,92,0.025)_58%,transparent_95%)]
          opacity-25
          blur-[70px]
          mix-blend-screen
        "
      />

      {/* Haze lateral derecho */}
      <div
        className="
          stage-animate-haze-right
          absolute inset-y-0 -right-28
          w-[clamp(7rem,12vw,13rem)]
          bg-[linear-gradient(180deg,transparent_10%,rgba(255,225,197,0.035)_38%,rgba(244,161,92,0.055)_72%,transparent_96%)]
          opacity-25
          blur-[70px]
          mix-blend-screen
        "
      />

      {/* Beam vertical izquierdo */}
      <div
        className="
          stage-animate-beam-left
          absolute -top-[10%] left-[clamp(1rem,3.5vw,4rem)]
          hidden h-[120%]
          w-[clamp(2.5rem,4vw,4.5rem)]
          origin-top
          bg-[linear-gradient(180deg,transparent,rgba(255,225,194,0.12)_20%,rgba(244,161,92,0.045)_65%,transparent)]
          opacity-[0.08]
          blur-[16px]
          mix-blend-screen
          lg:block
        "
      />

      {/* Beam vertical derecho */}
      <div
        className="
          stage-animate-beam-right
          absolute -top-[10%] right-[clamp(1rem,3.5vw,4rem)]
          hidden h-[120%]
          w-[clamp(2.5rem,4vw,4.5rem)]
          origin-top
          bg-[linear-gradient(180deg,transparent,rgba(244,161,92,0.055)_25%,rgba(255,231,207,0.1)_72%,transparent)]
          opacity-[0.08]
          blur-[16px]
          mix-blend-screen
          lg:block
        "
      />

      {/* Control lateral izquierdo */}
      <div
        className="
          absolute top-1/2 left-3
          flex h-[min(40vh,24rem)]
          min-h-64 -translate-y-1/2
          flex-col items-center gap-3
          opacity-25
          lg:left-[clamp(0.75rem,1.8vw,2rem)]
          lg:h-[min(46vh,27rem)]
          lg:min-h-72
          lg:opacity-[0.38]
        "
      >
        <div className="hidden flex-col items-center gap-1 font-body uppercase lg:flex">
          <span className="text-[0.32rem] font-medium tracking-[0.22em] text-white/25">
            DMX
          </span>

          <strong className="text-[0.42rem] font-medium tracking-[0.17em] text-[rgba(244,161,92,0.58)]">
            001
          </strong>
        </div>

        <div
          className="
            flex w-[0.4rem] flex-1
            flex-col justify-between
            border-y border-white/[0.06]
            py-1.5
          "
        >
          {leftLedBars.map((item) => {
            const highlighted = item % 3 === 0
            const glowing = item % 5 === 0

            return (
              <span
                key={item}
                className={[
                  'stage-animate-led-pulse',
                  'h-[0.22rem] w-full',
                  highlighted
                    ? 'bg-[rgba(244,161,92,0.16)]'
                    : 'bg-white/[0.07]',
                  glowing
                    ? 'shadow-[0_0_6px_rgba(244,161,92,0.12)]'
                    : '',
                ].join(' ')}
                style={{
                  animationDelay: `${item * 110}ms`,
                }}
              />
            )
          })}
        </div>

        <span
          className="
            hidden font-body text-[0.3rem]
            font-medium tracking-[0.26em]
            text-white/20 uppercase
            [writing-mode:vertical-rl]
            lg:block
          "
        >
          LIGHT
        </span>
      </div>

      {/* Señal lateral derecha */}
      <div
        className="
          absolute top-1/2 right-3
          flex h-[min(40vh,24rem)]
          min-h-64 -translate-y-1/2
          flex-col items-center gap-3
          opacity-25
          lg:right-[clamp(0.75rem,1.8vw,2rem)]
          lg:h-[min(46vh,27rem)]
          lg:min-h-72
          lg:opacity-[0.38]
        "
      >
        <div className="hidden flex-col items-center gap-1 font-body uppercase lg:flex">
          <span className="text-[0.32rem] font-medium tracking-[0.22em] text-white/25">
            OUT
          </span>

          <strong className="text-[0.42rem] font-medium tracking-[0.17em] text-[rgba(244,161,92,0.58)]">
            LIVE
          </strong>
        </div>

        <div
          className="
            flex w-8 flex-1
            flex-col items-end justify-between
            border-y border-white/[0.06]
            py-1.5
            lg:w-10
          "
        >
          {rightSignalBars.map((bar) => {
            const width =
              20 +
              Math.abs(
                Math.sin(bar * 0.65) * 45 +
                  Math.sin(bar * 0.22) * 20,
              )

            return (
              <span
                key={bar}
                className="
                  stage-animate-signal-pulse
                  block h-px min-w-[12%]
                  origin-right
                  bg-[linear-gradient(90deg,transparent,rgba(244,161,92,0.42))]
                  opacity-30
                "
                style={{
                  width: `${Math.min(width, 90)}%`,
                  animationDelay: `${bar * 65}ms`,
                }}
              />
            )
          })}
        </div>

        <span
          className="
            hidden font-body text-[0.3rem]
            font-medium tracking-[0.26em]
            text-white/20 uppercase
            [writing-mode:vertical-rl]
            lg:block
          "
        >
          AUDIO
        </span>
      </div>

      {/* Estado inferior */}
      <div
        className="
          absolute bottom-[4.2rem] left-1/2
          hidden -translate-x-1/2
          items-center gap-2
          font-body text-[0.34rem]
          font-medium tracking-[0.2em]
          text-white/20 uppercase
          xl:flex
        "
      >
        <span
          className="
            stage-animate-system-pulse
            size-[0.3rem]
            rounded-full
            bg-[rgba(244,161,92,0.7)]
            shadow-[0_0_7px_rgba(244,161,92,0.5)]
          "
        />

        <span>System active</span>
      </div>
    </div>
  )
}