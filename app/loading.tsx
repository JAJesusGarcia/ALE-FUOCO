export default function Loading() {
  return (
    <main
      className="
        fixed inset-0 z-[100]
        flex min-h-[100svh]
        items-center justify-center
        overflow-hidden
        bg-background
        px-6
      "
      role="status"
      aria-live="polite"
      aria-label="Cargando contenido"
    >
      {/* Gradiente ambiental */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute inset-0
          bg-[radial-gradient(circle_at_50%_100%,rgba(244,161,92,0.12),transparent_42%)]
        "
      />

      {/* Oscurecimiento superior */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute inset-0
          bg-[linear-gradient(180deg,rgba(5,5,5,0.78)_0%,transparent_48%,rgba(5,5,5,0.35)_100%)]
        "
      />

      {/* Haces de luz */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute bottom-[-22rem] left-1/2
          size-[44rem]
          -translate-x-1/2
          animate-[spin_12s_linear_infinite]
          opacity-70
          motion-reduce:animate-none
          md:bottom-[-34rem]
          md:size-[68rem]
        "
      >
        <div
          className="
            absolute inset-0
            bg-[conic-gradient(from_0deg_at_50%_50%,transparent_0deg,transparent_35deg,rgba(244,161,92,0.08)_49deg,transparent_63deg,transparent_118deg,rgba(255,255,255,0.045)_132deg,transparent_148deg,transparent_210deg,rgba(244,161,92,0.07)_225deg,transparent_242deg,transparent_310deg,rgba(255,255,255,0.035)_325deg,transparent_340deg)]
          "
        />
      </div>

      {/* Segundo conjunto de haces */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute bottom-[-19rem] left-1/2
          size-[38rem]
          -translate-x-1/2
          animate-[spin_18s_linear_infinite_reverse]
          opacity-60
          motion-reduce:animate-none
          md:bottom-[-29rem]
          md:size-[58rem]
        "
      >
        <div
          className="
            absolute inset-0
            bg-[conic-gradient(from_18deg_at_50%_50%,transparent_0deg,transparent_68deg,rgba(244,161,92,0.07)_82deg,transparent_98deg,transparent_180deg,rgba(255,255,255,0.035)_195deg,transparent_212deg,transparent_288deg,rgba(244,161,92,0.055)_302deg,transparent_319deg)]
          "
        />
      </div>

      {/* Haz central */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute bottom-0 left-1/2
          h-[70vh] w-40
          -translate-x-1/2
          origin-bottom
          animate-pulse
          bg-[linear-gradient(to_top,rgba(244,161,92,0.1),transparent_72%)]
          opacity-60
          [clip-path:polygon(44%_100%,56%_100%,100%_0%,0%_0%)]
          motion-reduce:animate-none
          md:w-72
        "
      />

      {/* Línea de horizonte */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute bottom-[18%] left-1/2
          h-px w-[70vw] max-w-5xl
          -translate-x-1/2
          bg-gradient-to-r
          from-transparent
          via-warm/30
          to-transparent
        "
      />

      {/* Resplandor inferior */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute bottom-[10%] left-1/2
          h-24 w-72
          -translate-x-1/2
          rounded-full
          bg-warm/10
          blur-[55px]
          md:h-32
          md:w-[32rem]
          md:blur-[80px]
        "
      />

      {/* Contenido */}
      <div
        className="
          relative z-10
          flex flex-col
          items-center text-center
        "
      >
        {/* Símbolo */}
        <div className="relative flex size-24 items-center justify-center">
          <div
            aria-hidden="true"
            className="
              absolute inset-0
              animate-[spin_7s_linear_infinite]
              rounded-full
              border border-white/10
              motion-reduce:animate-none
            "
          >
            <span
              className="
                absolute left-1/2 top-[-2px]
                size-1.5
                -translate-x-1/2
                rounded-full
                bg-warm
                shadow-[0_0_14px_rgba(244,161,92,0.8)]
              "
            />
          </div>

          <div
            aria-hidden="true"
            className="
              absolute inset-3
              animate-[spin_4s_linear_infinite_reverse]
              rounded-full
              border border-white/5
              motion-reduce:animate-none
            "
          >
            <span
              className="
                absolute bottom-[-2px] left-1/2
                size-1
                -translate-x-1/2
                rounded-full
                bg-white/70
                shadow-[0_0_10px_rgba(255,255,255,0.55)]
              "
            />
          </div>

          <div
            aria-hidden="true"
            className="
              size-2
              animate-pulse
              rounded-full
              bg-warm
              shadow-[0_0_18px_rgba(244,161,92,0.75)]
              motion-reduce:animate-none
            "
          />
        </div>

        <div className="mt-10 flex items-center gap-4">
          <span
            aria-hidden="true"
            className="
              h-px w-8
              bg-gradient-to-r
              from-transparent
              to-warm/70
            "
          />

          <p
            className="
              font-body
              text-[0.56rem]
              font-medium uppercase
              tracking-[0.32em]
              text-warm
            "
          >
            Preparando la escena
          </p>

          <span
            aria-hidden="true"
            className="
              h-px w-8
              bg-gradient-to-l
              from-transparent
              to-warm/70
            "
          />
        </div>

        <p
          className="
            mt-5
            font-display
            text-3xl
            font-light italic
            tracking-[-0.025em]
            text-foreground/80
            sm:text-4xl
          "
        >
          Ale Fuoco
        </p>

        {/* Indicador inferior */}
        <div
          aria-hidden="true"
          className="
            mt-9 h-px w-36
            overflow-hidden
            bg-white/10
          "
        >
          <div
            className="
              h-full w-1/2
              animate-[pulse_1.3s_ease-in-out_infinite]
              bg-gradient-to-r
              from-transparent
              via-warm
              to-transparent
              motion-reduce:animate-none
            "
          />
        </div>

        <span className="sr-only">
          Cargando el sitio de Ale Fuoco
        </span>
      </div>

      {/* Información técnica */}
      <div
        aria-hidden="true"
        className="
          absolute bottom-8 left-6 right-6
          flex items-center justify-between
          font-body
          text-[0.48rem]
          uppercase
          tracking-[0.2em]
          text-white/20
          md:bottom-10
          md:left-10
          md:right-10
        "
      >
        <span>Lighting design</span>

        <span className="hidden sm:block">
          Sound · Technical production
        </span>

        <span>Loading</span>
      </div>
    </main>
  )
}