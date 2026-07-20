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
    const interval = window.setInterval(() => {
      setFrames((current) => current + 1)
    }, 1000 / FPS)

    let ticking = false

    const updateScrollProgress = () => {
      const scrollableHeight =
        document.documentElement.scrollHeight - window.innerHeight

      const progress =
        scrollableHeight > 0
          ? Math.min(Math.max(window.scrollY / scrollableHeight, 0), 1)
          : 0

      setScrollProgress(progress)
      ticking = false
    }

    const requestScrollUpdate = () => {
      if (ticking) return

      ticking = true
      window.requestAnimationFrame(updateScrollProgress)
    }

    updateScrollProgress()

    window.addEventListener('scroll', requestScrollUpdate, {
      passive: true,
    })

    window.addEventListener('resize', requestScrollUpdate)

    return () => {
      window.clearInterval(interval)
      window.removeEventListener('scroll', requestScrollUpdate)
      window.removeEventListener('resize', requestScrollUpdate)
    }
  }, [])

  const progressPercentage = Math.round(scrollProgress * 100)
    .toString()
    .padStart(3, '0')

  return (
    <div
      className="global-technical-hud"
      aria-hidden="true"
    >
      {/* Barra superior */}
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

      {/* Progreso lateral */}
      <div className="global-hud-progress">
        <span className="global-hud-progress-label">
          {progressPercentage}
        </span>

        <div className="global-hud-progress-track">
          <span
            className="global-hud-progress-fill"
            style={{
              transform: `scaleY(${scrollProgress})`,
            }}
          />
        </div>

        <span className="global-hud-progress-label">
          100
        </span>
      </div>

      {/* Barra inferior */}
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

      {/* Marcas técnicas */}
      <span className="global-hud-corner global-hud-corner-top-left" />
      <span className="global-hud-corner global-hud-corner-top-right" />
      <span className="global-hud-corner global-hud-corner-bottom-left" />
      <span className="global-hud-corner global-hud-corner-bottom-right" />
    </div>
  )
}