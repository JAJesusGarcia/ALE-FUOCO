'use client'

import { useEffect, useState } from 'react'

interface TechnicalMediaHudProps {
  number: string
  category: string
  type: 'image' | 'video'
  channel?: string
  universe?: string
}

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

export default function TechnicalMediaHud({
  number,
  category,
  type,
  channel = '001',
  universe = '02',
}: TechnicalMediaHudProps) {
  const [frames, setFrames] = useState(Number(number) * 725)

  useEffect(() => {
    const interval = window.setInterval(() => {
      setFrames((current) => current + 1)
    }, 40)

    return () => window.clearInterval(interval)
  }, [])

  return (
    <div className="technical-hud" aria-hidden="true">
      {/* Esquinas técnicas */}
      <span className="technical-hud-corner technical-hud-corner-top-left" />
      <span className="technical-hud-corner technical-hud-corner-top-right" />
      <span className="technical-hud-corner technical-hud-corner-bottom-left" />
      <span className="technical-hud-corner technical-hud-corner-bottom-right" />

      {/* Línea superior */}
      <div className="technical-hud-top">
        <div className="technical-hud-status">
          <span className="technical-hud-live-dot" />
          <span>{type === 'video' ? 'REC' : 'LIVE'}</span>
        </div>

        <div className="technical-hud-timecode">
          <span>TC</span>
          <strong>{formatTimecode(frames)}</strong>
        </div>
      </div>

      {/* Datos laterales */}
      <div className="technical-hud-left">
        <span>DMX</span>
        <strong>ACTIVE</strong>

        <span>UNIVERSE</span>
        <strong>{universe}</strong>
      </div>

      <div className="technical-hud-right">
        <span>CH</span>
        <strong>{channel}</strong>

        <span>OUTPUT</span>
        <strong>100%</strong>
      </div>

      {/* Centro */}
      <div className="technical-hud-center">
        <span className="technical-hud-focus-line technical-hud-focus-line-left" />
        <span className="technical-hud-focus-square" />
        <span className="technical-hud-focus-line technical-hud-focus-line-right" />
      </div>

      {/* Línea inferior */}
      <div className="technical-hud-bottom">
        <span>{category}</span>
        <span>AF · {number}</span>
      </div>

      {/* Scan line */}
      <div className="technical-hud-scan" />
    </div>
  )
}