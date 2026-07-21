interface TechnicalMediaHudProps {
  number: string
  category: string
  type: 'image' | 'video'
  channel?: string
  universe?: string
}

const FPS = 25

function formatTimecode(totalFrames: number) {
  const frames = totalFrames % FPS
  const totalSeconds = Math.floor(totalFrames / FPS)
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
  const initialFrames = Number(number) * 725
  const timecode = formatTimecode(initialFrames)

  return (
    <div
      className="
        pointer-events-none
        absolute inset-0 z-10
        hidden overflow-hidden
        font-body
        md:block
      "
      aria-hidden="true"
    >
      {/* Esquinas técnicas */}
      <HudCorner className="top-4 left-4 border-t border-l" />

      <HudCorner className="top-4 right-4 border-t border-r" />

      <HudCorner className="bottom-4 left-4 border-b border-l" />

      <HudCorner className="right-4 bottom-4 border-r border-b" />

      {/* Línea superior */}
      <div
        className="
          absolute top-5 right-6 left-6
          flex items-center justify-between
          opacity-0
          transition-opacity duration-500
          group-hover:opacity-100
        "
      >
        <div
          className="
            flex items-center gap-2
            text-[0.42rem]
            font-medium tracking-[0.2em]
            text-white/50 uppercase
          "
        >
          <span
            className={`
              size-[0.32rem]
              rounded-full
              shadow-[0_0_7px_currentColor]
              ${
                type === 'video'
                  ? 'technical-hud-animate-record bg-red-500/80 text-red-500'
                  : 'technical-hud-animate-live bg-warm/80 text-warm'
              }
            `}
          />

          <span>{type === 'video' ? 'REC' : 'LIVE'}</span>
        </div>

        <div
          className="
            flex items-center gap-2
            font-mono text-[0.42rem]
            tracking-[0.12em]
            text-white/40
          "
        >
          <span className="text-white/25">TC</span>

          <strong className="font-normal">
            {timecode}
          </strong>
        </div>
      </div>

      {/* Datos laterales izquierdos */}
      <div
        className="
          absolute top-1/2 left-5
          flex -translate-y-1/2
          flex-col gap-1
          opacity-0
          transition-opacity duration-500
          group-hover:opacity-100
        "
      >
        <TechnicalLabel label="DMX" value="ACTIVE" />
        <TechnicalLabel label="UNIVERSE" value={universe} />
      </div>

      {/* Datos laterales derechos */}
      <div
        className="
          absolute top-1/2 right-5
          flex -translate-y-1/2
          flex-col items-end gap-1
          opacity-0
          transition-opacity duration-500
          group-hover:opacity-100
        "
      >
        <TechnicalLabel
          label="CH"
          value={channel}
          align="right"
        />

        <TechnicalLabel
          label="OUTPUT"
          value="100%"
          align="right"
        />
      </div>

      {/* Marcador central */}
      <div
        className="
          absolute top-1/2 left-1/2
          flex -translate-x-1/2 -translate-y-1/2
          items-center
          opacity-0
          transition-opacity duration-500
          group-hover:opacity-100
        "
      >
        <span
          className="
            h-px w-8
            bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.25))]
          "
        />

        <span
          className="
            mx-2 size-3
            border border-white/30
            shadow-[0_0_8px_rgba(255,255,255,0.08)]
          "
        />

        <span
          className="
            h-px w-8
            bg-[linear-gradient(90deg,rgba(255,255,255,0.25),transparent)]
          "
        />
      </div>

      {/* Línea inferior */}
      <div
        className="
          absolute right-6 bottom-5 left-6
          flex items-center justify-between
          border-t border-white/[0.08]
          pt-2
          text-[0.38rem]
          font-medium tracking-[0.17em]
          text-white/35 uppercase
          opacity-0
          transition-opacity duration-500
          group-hover:opacity-100
        "
      >
        <span className="max-w-[60%] truncate">
          {category}
        </span>

        <span>AF · {number}</span>
      </div>

      {/* Línea de escaneo */}
      <div
        className="
          technical-hud-animate-scan
          absolute right-0 left-0
          h-px
          bg-[linear-gradient(90deg,transparent,rgba(244,161,92,0.25),transparent)]
          opacity-0
          group-hover:opacity-100
        "
      />
    </div>
  )
}

interface HudCornerProps {
  className: string
}

function HudCorner({ className }: HudCornerProps) {
  return (
    <span
      className={`
        absolute size-5
        border-white/[0.15]
        opacity-0
        transition-opacity duration-500
        group-hover:opacity-100
        ${className}
      `}
    />
  )
}

interface TechnicalLabelProps {
  label: string
  value: string
  align?: 'left' | 'right'
}

function TechnicalLabel({
  label,
  value,
  align = 'left',
}: TechnicalLabelProps) {
  return (
    <div
      className={`
        mb-2 flex flex-col gap-1
        ${align === 'right' ? 'items-end' : 'items-start'}
      `}
    >
      <span
        className="
          text-[0.34rem]
          font-medium tracking-[0.18em]
          text-white/25 uppercase
        "
      >
        {label}
      </span>

      <strong
        className="
          text-[0.43rem]
          font-medium tracking-[0.13em]
          text-warm/65 uppercase
        "
      >
        {value}
      </strong>
    </div>
  )
}