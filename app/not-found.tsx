import Link from 'next/link'
import { ArrowLeft, ArrowUpRight, Home } from 'lucide-react'

export default function NotFound() {
  return (
    <main
      className="
        relative flex
        min-h-[100svh]
        overflow-hidden
        bg-background
        px-6 pb-16 pt-32
        md:px-10
        md:pb-20
        md:pt-40
        lg:px-14
        xl:px-16
      "
    >
      {/* Fondo */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute inset-0
          bg-[radial-gradient(circle_at_70%_35%,rgba(181,126,70,0.12),transparent_30rem)]
        "
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute inset-0
          bg-[linear-gradient(180deg,transparent_0%,rgba(10,9,8,0.25)_50%,rgba(10,9,8,0.9)_100%)]
        "
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute inset-x-0 top-1/2
          h-px
          bg-gradient-to-r
          from-transparent
          via-white/10
          to-transparent
        "
      />

      {/* Número decorativo */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute left-1/2 top-1/2
          hidden
          -translate-x-1/2 -translate-y-1/2
          select-none
          font-display
          text-[clamp(24rem,48vw,52rem)]
          font-light
          leading-none
          tracking-[-0.09em]
          text-white/[0.018]
          md:block
        "
      >
        404
      </div>

      <div
        className="
          relative z-10
          mx-auto flex
          w-full max-w-[90rem]
          flex-col justify-between
        "
      >
        {/* Encabezado técnico */}
        <div className="flex items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <span aria-hidden="true" className="h-px w-10 bg-warm" />

            <p
              className="
                font-body
                text-[0.56rem]
                font-medium uppercase
                tracking-[0.28em]
                text-warm
              "
            >
              Error de navegación
            </p>
          </div>

          <p
            className="
              hidden
              font-body
              text-[0.54rem]
              uppercase
              tracking-[0.22em]
              text-muted-foreground
              sm:block
            "
          >
            Código 404
          </p>
        </div>

        {/* Contenido */}
        <div
          className="
            my-auto grid
            gap-12 py-20
            lg:grid-cols-[1fr_0.7fr]
            lg:items-end
            lg:gap-20
          "
        >
          <div>
            <p
              className="
                mb-7
                font-body
                text-[0.62rem]
                uppercase
                tracking-[0.24em]
                text-muted-foreground
              "
            >
              Esta escena no está disponible
            </p>

            <h1
              className="
                max-w-[10ch]
                font-display
                text-[clamp(4.8rem,13vw,11rem)]
                font-light
                leading-[0.78]
                tracking-[-0.06em]
                text-foreground
              "
            >
              Fuera de
              <span className="block italic text-foreground/45">programa.</span>
            </h1>
          </div>

          <div className="max-w-md lg:pb-3">
            <p
              className="
                font-body
                text-base font-light
                leading-8
                text-muted-foreground
              "
            >
              La página que buscás no existe, cambió de dirección o ya no está
              disponible. Podés volver al inicio y continuar recorriendo los
              trabajos de Ale.
            </p>

            <div
              className="
                mt-9 flex
                flex-col gap-3
                sm:flex-row
              "
            >
              <Link
                href="/"
                className="
                  group inline-flex
                  min-h-14 min-w-48
                  items-center justify-between
                  gap-5
                  bg-warm
                  px-6 py-4
                  font-body
                  text-[0.6rem]
                  font-semibold uppercase
                  tracking-[0.18em]
                  text-background
                  transition-colors duration-300
                  hover:bg-foreground
                  focus-visible:outline-none
                  focus-visible:ring-2
                  focus-visible:ring-warm
                  focus-visible:ring-offset-2
                  focus-visible:ring-offset-background
                "
              >
                <span className="flex items-center gap-3">
                  <Home size={15} strokeWidth={1.5} aria-hidden="true" />
                  Volver al inicio
                </span>

                <ArrowUpRight
                  size={15}
                  strokeWidth={1.5}
                  aria-hidden="true"
                  className="
                    transition-transform duration-300
                    md:group-hover:-translate-y-0.5
                    md:group-hover:translate-x-0.5
                  "
                />
              </Link>

              <Link
                href="/#contacto"
                className="
                  group inline-flex
                  min-h-14 min-w-44
                  items-center justify-between
                  gap-5
                  border border-white/15
                  px-6 py-4
                  font-body
                  text-[0.6rem]
                  font-medium uppercase
                  tracking-[0.18em]
                  text-foreground
                  transition-colors duration-300
                  hover:border-white/40
                  hover:bg-white/5
                  focus-visible:outline-none
                  focus-visible:ring-2
                  focus-visible:ring-white
                  focus-visible:ring-offset-2
                  focus-visible:ring-offset-background
                "
              >
                Contacto
                <ArrowUpRight
                  size={15}
                  strokeWidth={1.5}
                  aria-hidden="true"
                  className="
                    transition-transform duration-300
                    md:group-hover:-translate-y-0.5
                    md:group-hover:translate-x-0.5
                  "
                />
              </Link>
            </div>
          </div>
        </div>

        {/* Pie técnico */}
        <div
          className="
            flex flex-col gap-5
            border-t border-white/10
            pt-6
            sm:flex-row
            sm:items-center
            sm:justify-between
          "
        >
          <Link
            href="/"
            className="
              group inline-flex
              items-center gap-3
              font-body
              text-[0.56rem]
              uppercase
              tracking-[0.18em]
              text-muted-foreground
              transition-colors duration-300
              hover:text-warm
              focus-visible:outline-none
              focus-visible:text-warm
            "
          >
            <ArrowLeft
              size={14}
              strokeWidth={1.5}
              aria-hidden="true"
              className="
                transition-transform duration-300
                md:group-hover:-translate-x-1
              "
            />
            Regresar a Ale Fuoco
          </Link>

          <p
            className="
              font-body
              text-[0.52rem]
              uppercase
              tracking-[0.2em]
              text-white/25
            "
          >
            Iluminación · sonido · producción técnica
          </p>
        </div>
      </div>
    </main>
  )
}
