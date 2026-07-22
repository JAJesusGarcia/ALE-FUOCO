'use client'

const meterSegments = Array.from({ length: 32 }, (_, index) => index)

const scaleLabels = [
  { label: '0', position: 'top-0' },
  { label: '-3', position: 'top-[9%]' },
  { label: '-6', position: 'top-[18%]' },
  { label: '-9', position: 'top-[28%]' },
  { label: '-12', position: 'top-[38%]' },
  { label: '-18', position: 'top-[53%]' },
  { label: '-24', position: 'top-[68%]' },
  { label: '-30', position: 'top-[82%]' },
  { label: '-40', position: 'bottom-0' },
]

function getSegmentClass(index: number) {
  if (index >= 29) {
    return `
      bg-red-500
      shadow-[0_0_7px_rgba(239,68,68,0.75)]
    `
  }

  if (index >= 24) {
    return `
      bg-amber-400
      shadow-[0_0_6px_rgba(251,191,36,0.55)]
    `
  }

  return `
    bg-emerald-400
    shadow-[0_0_5px_rgba(52,211,153,0.45)]
  `
}

interface MeterSegmentsProps {
  active?: boolean
}

function MeterSegments({ active = false }: MeterSegmentsProps) {
  return (
    <div
      className={`
        flex h-full
        flex-col-reverse
        justify-between
      `}
    >
      {meterSegments.map((segment) => (
        <span
          key={segment}
          className={`
            block
            h-[4px] w-[8px]
            shrink-0
            rounded-[1px]
            ${active ? getSegmentClass(segment) : 'bg-white/10'}
          `}
        />
      ))}
    </div>
  )
}

interface MeterChannelProps {
  label: string
  animationClass: string
  peakClass: string
}

function MeterChannel({ label, animationClass, peakClass }: MeterChannelProps) {
  return (
    <div className="flex flex-col items-center">
      <div className="relative h-72 w-3">
        {/* Segmentos apagados */}
        <div className="absolute inset-0 opacity-70">
          <MeterSegments />
        </div>

        {/* Segmentos activos */}
        <div
          className={`
            absolute inset-x-0 bottom-0
            overflow-hidden
            ${animationClass}
          `}
        >
          <div className="absolute inset-x-0 bottom-0 h-72">
            <MeterSegments active />
          </div>
        </div>

        {/* Peak hold */}
        <span
          className={`
            absolute left-1/2
            h-[3px] w-3
            -translate-x-1/2
            rounded-[1px]
            bg-red-400
            shadow-[0_0_8px_rgba(248,113,113,0.85)]
            ${peakClass}
          `}
        />
      </div>

      <span
        className={`
          mt-3
          font-body
          text-[0.42rem]
          font-semibold uppercase
          tracking-[0.2em]
          text-white/55
        `}
      >
        {label}
      </span>
    </div>
  )
}

export default function MasterOutputMeter() {
  return (
    <div
      className={`
        absolute
        right-[clamp(1.5rem,4vw,4.5rem)]
        top-1/2
        hidden
        -translate-y-1/2
        lg:block
      `}
    >
      <div className="relative">
        {/* Encabezado */}
        <div
          className={`
            mb-5 flex
            min-w-[7.5rem]
            items-center justify-between
            font-body
            text-[0.42rem]
            font-medium uppercase
            tracking-[0.2em]
            text-white/40
          `}
        >
          <span>Master</span>
          <span className="text-white/30">-06 dB</span>
        </div>

        {/* Medidor */}
        <div className="flex items-start gap-3">
          {/* Escala */}
          <div className="relative h-100 w-6">
            {scaleLabels.map(({ label, position }) => (
              <span
                key={label}
                className={`
                  absolute right-0
                  -translate-y-1/2
                  font-mono
                  text-[0.38rem]
                  leading-none
                  text-white/35
                  ${position}
                `}
              >
                {label}
              </span>
            ))}
          </div>

          {/* Canales */}
          <div className="flex gap-3">
            <MeterChannel
              label="L"
              animationClass="master-meter-level-left"
              peakClass="master-meter-peak-left"
            />

            <MeterChannel
              label="R"
              animationClass="master-meter-level-right"
              peakClass="master-meter-peak-right"
            />
          </div>
        </div>

        {/* Estado */}
        <div
          className={`
            mt-5 flex
            items-center justify-between
            font-body
            text-[0.4rem]
            font-medium uppercase
            tracking-[0.18em]
            text-white/35
          `}
        >
          <span>Output</span>

          <span className="flex items-center gap-2">
            <span
              className={`
                master-output-active
                size-1.5
                rounded-full
                bg-emerald-400
                shadow-[0_0_8px_rgba(52,211,153,0.8)]
              `}
            />
            Active
          </span>
        </div>
      </div>

      <style jsx global>{`
        .master-meter-level-left {
          animation: master-meter-level-left 2.4s linear infinite;
        }

        .master-meter-level-right {
          animation: master-meter-level-right 2.05s linear infinite;
        }

        .master-meter-peak-left {
          animation: master-meter-peak-left 2.4s linear infinite;
        }

        .master-meter-peak-right {
          animation: master-meter-peak-right 2.05s linear infinite;
        }

        .master-output-active {
          animation: master-output-active 1.4s ease-in-out infinite;
        }

        @keyframes master-meter-level-left {
          0% {
            height: 38%;
          }

          8% {
            height: 64%;
          }

          16% {
            height: 48%;
          }

          25% {
            height: 79%;
          }

          34% {
            height: 58%;
          }

          43% {
            height: 88%;
          }

          52% {
            height: 67%;
          }

          61% {
            height: 73%;
          }

          70% {
            height: 46%;
          }

          79% {
            height: 83%;
          }

          89% {
            height: 55%;
          }

          100% {
            height: 38%;
          }
        }

        @keyframes master-meter-level-right {
          0% {
            height: 46%;
          }

          10% {
            height: 72%;
          }

          19% {
            height: 54%;
          }

          28% {
            height: 86%;
          }

          37% {
            height: 62%;
          }

          46% {
            height: 76%;
          }

          55% {
            height: 51%;
          }

          64% {
            height: 91%;
          }

          73% {
            height: 68%;
          }

          82% {
            height: 81%;
          }

          91% {
            height: 57%;
          }

          100% {
            height: 46%;
          }
        }

        @keyframes master-meter-peak-left {
          0% {
            bottom: 39%;
            opacity: 0;
          }

          24% {
            bottom: 80%;
            opacity: 0.85;
          }

          43% {
            bottom: 89%;
            opacity: 1;
          }

          70% {
            bottom: 47%;
            opacity: 0;
          }

          79% {
            bottom: 84%;
            opacity: 0.9;
          }

          100% {
            bottom: 39%;
            opacity: 0;
          }
        }

        @keyframes master-meter-peak-right {
          0% {
            bottom: 47%;
            opacity: 0;
          }

          28% {
            bottom: 87%;
            opacity: 1;
          }

          55% {
            bottom: 52%;
            opacity: 0;
          }

          64% {
            bottom: 92%;
            opacity: 1;
          }

          82% {
            bottom: 82%;
            opacity: 0.75;
          }

          100% {
            bottom: 47%;
            opacity: 0;
          }
        }

        @keyframes master-output-active {
          0%,
          100% {
            opacity: 0.45;
          }

          50% {
            opacity: 1;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .master-meter-level-left {
            animation: none;
            height: 68%;
          }

          .master-meter-level-right {
            animation: none;
            height: 74%;
          }

          .master-meter-peak-left,
          .master-meter-peak-right,
          .master-output-active {
            animation: none;
          }

          .master-meter-peak-left {
            bottom: 69%;
          }

          .master-meter-peak-right {
            bottom: 75%;
          }
        }
      `}</style>
    </div>
  )
}
