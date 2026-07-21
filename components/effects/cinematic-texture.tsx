export default function CinematicTexture() {
  return (
    <div
      className="
        pointer-events-none
        fixed inset-0 z-[60]
        overflow-hidden
        [contain:paint]
      "
      aria-hidden="true"
    >
      {/* Grano cinematográfico */}
      <div
        className="
          cinematic-animate-grain
          absolute -inset-[50%]
          opacity-[0.035]
          mix-blend-soft-light
          // [background-image:url('/images/noise.png')]
          [background-repeat:repeat]
          [background-size:180px_180px]
          motion-reduce:hidden
        "
      />

      {/* Viñeta */}
      <div
        className="
          absolute inset-0
          bg-[radial-gradient(circle_at_center,transparent_34%,rgba(0,0,0,0.12)_62%,rgba(0,0,0,0.58)_100%)]
        "
      />

      {/* Flare izquierdo */}
      <div
        className="
          cinematic-animate-flare-one
          absolute -top-[18%] -left-[22%]
          hidden h-[65rem] w-[65rem]
          rounded-full
          bg-[radial-gradient(circle,rgba(244,161,92,0.055)_0%,rgba(244,161,92,0.018)_38%,transparent_70%)]
          opacity-50
          blur-[90px]
          mix-blend-screen
          md:block
        "
      />

      {/* Flare derecho */}
      <div
        className="
          cinematic-animate-flare-two
          absolute -right-[24%] -bottom-[28%]
          hidden h-[58rem] w-[58rem]
          rounded-full
          bg-[radial-gradient(circle,rgba(255,223,190,0.045)_0%,rgba(244,161,92,0.014)_42%,transparent_72%)]
          opacity-40
          blur-[100px]
          mix-blend-screen
          lg:block
        "
      />
    </div>
  )
}
