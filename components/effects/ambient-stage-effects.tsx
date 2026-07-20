'use client'

const leftLedBars = Array.from({ length: 16 }, (_, index) => index)
const rightSignalBars = Array.from({ length: 22 }, (_, index) => index)

export default function AmbientStageEffects() {
  return (
    <div
      className="stage-effects"
      aria-hidden="true"
    >
      {/* Haze lateral */}
      <div className="stage-side-haze stage-side-haze-left" />
      <div className="stage-side-haze stage-side-haze-right" />

      {/* Beams verticales */}
      <div className="stage-vertical-beam stage-vertical-beam-left" />
      <div className="stage-vertical-beam stage-vertical-beam-right" />

      {/* Control lateral izquierdo */}
      <div className="stage-side-panel stage-side-panel-left">
        <div className="stage-side-panel-heading">
          <span>DMX</span>
          <strong>001</strong>
        </div>

        <div className="stage-vertical-led-track">
          {leftLedBars.map((item) => (
            <span
              key={item}
              className="stage-vertical-led"
              style={{
                animationDelay: `${item * 110}ms`,
              }}
            />
          ))}
        </div>

        <span className="stage-side-caption">
          LIGHT
        </span>
      </div>

      {/* Señal lateral derecha */}
      <div className="stage-side-panel stage-side-panel-right">
        <div className="stage-side-panel-heading">
          <span>OUT</span>
          <strong>LIVE</strong>
        </div>

        <div className="stage-vertical-signal">
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
                className="stage-vertical-signal-line"
                style={{
                  width: `${Math.min(width, 90)}%`,
                  animationDelay: `${bar * 65}ms`,
                }}
              />
            )
          })}
        </div>

        <span className="stage-side-caption">
          AUDIO
        </span>
      </div>

      {/* Estado inferior */}
      <div className="stage-system-status">
        <span className="stage-system-dot" />
        <span>System active</span>
      </div>
    </div>
  )
}