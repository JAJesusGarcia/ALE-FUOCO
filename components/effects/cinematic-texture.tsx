'use client'

export default function CinematicTexture() {
  return (
    <div
      className="cinematic-texture"
      aria-hidden="true"
    >
      <div className="cinematic-grain" />
      <div className="cinematic-vignette" />
      <div className="cinematic-flare cinematic-flare-one" />
      <div className="cinematic-flare cinematic-flare-two" />
    </div>
  )
}