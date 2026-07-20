'use client'

import { useEffect, useState } from 'react'

function formatTimecode(totalFrames: number) {
  const fps = 25
  const frames = totalFrames % fps
  const totalSeconds = Math.floor(totalFrames / fps)
  const seconds = totalSeconds % 60
  const totalMinutes = Math.floor(totalSeconds / 60)
  const minutes = totalMinutes % 60
  const hours = Math.floor(totalMinutes / 60)

  return [hours, minutes, seconds, frames]
    .map((value) => value.toString().padStart(2, '0'))
    .join(':')
}

export default function GlobalTechnicalHud() {
  const [frames, setFrames] = useState(0)
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const interval = window.setInterval(() => {
      setFrames((current) => current + 1)
    }, 40)

    const updateScrollProgress = () => {
      const scrollableHeight =
        document.documentElement.scrollHeight - window.innerHeight

      if (scrollableHeight <= 0) {
        setScrollProgress(0)
        return
      }

      const progress = Math.min(
        Math.max(window.scrollY / scrollableHeight, 0),
        1,
      )

      setScrollProgress(progress)
    }

    updateScrollProgress()

    window.addEventListener('scroll', updateScrollProgress, {
      passive: true,
    })

    window.addEventListener('resize', updateScrollProgress)

    return () => {
      window.clearInterval(interval)
      window.removeEventListener('scroll', updateScrollProgress)
      window.removeEventListener('resize', updateScrollProgress)
    }
  }, [])

  const progressPercentage = Math.round(scrollProgress * 100)

  return (
    <div
      className="global-technical-hud"
      aria-hidden="true"
    >
      {/* Línea superior */}
      <div className="global-hud-top">
        <div className="global-hud-status">
          <span className="global-hud-led" />
          <span>System active</span>
        </div>

        <div className="global-hud-top-center">
          <span>AF / LIVE CONTROL</span>
        </div>

        <div className="global-hud-timecode">
          <span>TC</span>
          <strong>{formatTimecode(frames)}</strong>
        </div>
      </div>

      {/* Lateral izquierdo */}
      <div className="global-hud-left">
        <div className="global-hud-data-block">
          <span>NET</span>
          <strong>ONLINE</strong>
        </div>

        <div className="global-hud-data-block">
          <span>PROTOCOL</span>
          <strong>ARTNET</strong>
        </div>

        <div className="global-hud-data-block">
          <span>UNIVERSE</span>
          <strong>01–04</strong>
        </div>

        <div className="global-hud-data-block">
          <span>DMX</span>
          <strong>ACTIVE</strong>
        </div>
      </div>

      {/* Lateral derecho */}
      <div className="global-hud-right">
        <div className="global-hud-data-block">
          <span>MASTER</span>
          <strong>100%</strong>
        </div>

        <div className="global-hud-data-block">
          <span>FPS</span>
          <strong>60</strong>
        </div>

        <div className="global-hud-data-block">
          <span>OUTPUT</span>
          <strong>LIVE</strong>
        </div>

        <div className="global-hud-data-block">
          <span>MODE</span>
          <strong>SHOW</strong>
        </div>
      </div>

      {/* Progreso vertical */}
      <div className="global-hud-progress">
        <span className="global-hud-progress-label">
          {progressPercentage.toString().padStart(3, '0')}
        </span>

        <div className="global-hud-progress-track">
          <span
            className="global-hud-progress-fill"
            style={{
              transform: `scaleY(${scrollProgress})`,
            }}
          />
        </div>

        <span className="global-hud-progress-label">100</span>
      </div>

      {/* Línea inferior */}
      <div className="global-hud-bottom">
        <div className="global-hud-bottom-left">
          <span>CH 001–512</span>
          <span>LIGHT DESIGN</span>
        </div>

        <div className="global-hud-bottom-center">
          <span className="global-hud-record-dot" />
          <span>LIVE OUTPUT</span>
        </div>

        <div className="global-hud-bottom-right">
          <span>CÓRDOBA</span>
          <span>ARGENTINA</span>
        </div>
      </div>

      {/* Marcas de encuadre */}
      <span className="global-hud-corner global-hud-corner-top-left" />
      <span className="global-hud-corner global-hud-corner-top-right" />
      <span className="global-hud-corner global-hud-corner-bottom-left" />
      <span className="global-hud-corner global-hud-corner-bottom-right" />
    </div>
  )
}