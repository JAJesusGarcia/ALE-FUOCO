'use client'

import { useEffect, useState } from 'react'

const laserLines = Array.from({ length: 9 }, (_, index) => index)
const audioBars = Array.from({ length: 18 }, (_, index) => index)

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

export default function HeroCinematicRig() {
  const [frames, setFrames] = useState(0)

  useEffect(() => {
    const interval = window.setInterval(() => {
      setFrames((current) => current + 1)
    }, 40)

    return () => window.clearInterval(interval)
  }, [])

  return (
    <div className="hero-rig" aria-hidden="true">
      <div className="hero-rig-vignette" />
      <div className="hero-rig-haze hero-rig-haze-left" />
      <div className="hero-rig-haze hero-rig-haze-right" />

      <div className="hero-rig-beam hero-rig-beam-one" />
      <div className="hero-rig-beam hero-rig-beam-two" />
      <div className="hero-rig-beam hero-rig-beam-three" />
      <div className="hero-rig-beam hero-rig-beam-four" />

      <div className="hero-rig-lasers">
        {laserLines.map((line) => (
          <span
            key={line}
            className="hero-rig-laser"
            style={{
              transform: `rotate(${line * 3.8 - 15}deg)`,
              animationDelay: `${line * 180}ms`,
            }}
          />
        ))}
      </div>

      <div className="hero-rig-rec">
        <span className="hero-rig-rec-dot" />
        <span>REC</span>
      </div>

      <div className="hero-rig-timecode">
        <span>TC</span>
        <strong>{formatTimecode(frames)}</strong>
      </div>

      <div className="hero-rig-system">
        <div>
          <span>UNIVERSE</span>
          <strong>02</strong>
        </div>

        <div>
          <span>DMX</span>
          <strong>ACTIVE</strong>
        </div>

        <div>
          <span>FPS</span>
          <strong>60</strong>
        </div>
      </div>

      <div className="hero-rig-audio">
        <div className="hero-rig-audio-header">
          <span>MASTER</span>
          <span>-06 DB</span>
        </div>

        <div className="hero-rig-audio-bars">
          {audioBars.map((bar) => (
            <span
              key={bar}
              style={{
                animationDelay: `${bar * 70}ms`,
              }}
            />
          ))}
        </div>
      </div>

      <div className="hero-rig-corner hero-rig-corner-top-left" />
      <div className="hero-rig-corner hero-rig-corner-top-right" />
      <div className="hero-rig-corner hero-rig-corner-bottom-left" />
      <div className="hero-rig-corner hero-rig-corner-bottom-right" />

      <div className="hero-rig-bottom-line">
        <span>ARTNET</span>
        <span>CH 001–512</span>
        <span>LIGHT DESIGN</span>
        <span>LIVE OUTPUT</span>
      </div>
    </div>
  )
}