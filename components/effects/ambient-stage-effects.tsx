'use client'

const waveformBars = Array.from({ length: 38 }, (_, index) => index)
const ledBars = Array.from({ length: 18 }, (_, index) => index)

export default function AmbientStageEffects() {
  return (
    <div
      className="stage-effects"
      aria-hidden="true"
    >
      {/* Haze */}
      <div className="stage-haze stage-haze-one" />
      <div className="stage-haze stage-haze-two" />

      {/* Beams */}
      <div className="stage-beam stage-beam-one" />
      <div className="stage-beam stage-beam-two" />

      {/* LED bar izquierda */}
      <div className="stage-led-stage stage-led-left">
        <span className="stage-led-title">DMX 001</span>

        <div className="stage-led-row">
          {ledBars.map((item) => (
            <span
              key={item}
              className="stage-led-pixel"
              style={{
                animationDelay: `${item * 90}ms`,
              }}
            />
          ))}
        </div>
      </div>

      {/* LED bar derecha */}
      <div className="stage-led-stage stage-led-right">
        <span className="stage-led-title">LIVE OUTPUT</span>

        <div className="stage-led-row">
          {ledBars.slice(0, 12).map((item) => (
            <span
              key={item}
              className="stage-led-pixel"
              style={{
                animationDelay: `${500 + item * 120}ms`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Waveform */}
      <div className="stage-audio-waveform">
        <div className="stage-waveform-heading">
          <span>AUDIO SIGNAL</span>
          <span>48 KHZ</span>
        </div>

        <div className="stage-waveform-content">
          {waveformBars.map((bar) => {
            const height =
              10 +
              Math.abs(
                Math.sin(bar * 0.6) * 18 +
                  Math.sin(bar * 0.22) * 9,
              )

            return (
              <span
                key={bar}
                className="stage-waveform-line"
                style={{
                  height: `${height}px`,
                  animationDelay: `${bar * 45}ms`,
                }}
              />
            )
          })}
        </div>
      </div>

      {/* Status */}
      <div className="stage-system-status">
        <span className="stage-system-dot" />
        <span>SYSTEM ACTIVE</span>
      </div>
    </div>
  )
}


// 'use client'

// const ledBars = Array.from({ length: 14 }, (_, index) => index)
// const waveformBars = Array.from({ length: 36 }, (_, index) => index)

// export default function AmbientStageEffects() {
//   return (
//     <div
//       className="stage-effects"
//       aria-hidden="true"
//     >
//       {/* Haze ambiental */}
//       <div className="stage-haze stage-haze-left" />
//       <div className="stage-haze stage-haze-right" />
//       <div className="stage-haze stage-haze-center" />

//       {/* Haces de cabezales móviles */}
//       <div className="stage-beam stage-beam-left" />
//       <div className="stage-beam stage-beam-right" />
//       <div className="stage-beam stage-beam-center" />

//       {/* Gobo proyectado */}
//       <div className="stage-gobo">
//         <span />
//         <span />
//         <span />
//         <span />
//         <span />
//         <span />
//       </div>

//       {/* Barra LED lateral */}
//       <div className="stage-led-system stage-led-system-left">
//         <span className="stage-led-label">DMX 001</span>

//         <div className="stage-led-bars">
//           {ledBars.map((bar) => (
//             <span
//               key={bar}
//               className="stage-led-bar"
//               style={{
//                 animationDelay: `${bar * 110}ms`,
//               }}
//             />
//           ))}
//         </div>
//       </div>

//       {/* Barra LED derecha */}
//       <div className="stage-led-system stage-led-system-right">
//         <span className="stage-led-label">LIVE</span>

//         <div className="stage-led-bars">
//           {ledBars.slice(0, 9).map((bar) => (
//             <span
//               key={bar}
//               className="stage-led-bar"
//               style={{
//                 animationDelay: `${700 + bar * 130}ms`,
//               }}
//             />
//           ))}
//         </div>
//       </div>

//       {/* Waveform inferior */}
//       <div className="stage-waveform">
//         <div className="stage-waveform-info">
//           <span>AUDIO SIGNAL</span>
//           <span>48 KHZ</span>
//         </div>

//         <div className="stage-waveform-bars">
//           {waveformBars.map((bar) => {
//             const height =
//               12 +
//               Math.abs(
//                 Math.sin(bar * 0.72) * 18 +
//                   Math.sin(bar * 0.24) * 10,
//               )

//             return (
//               <span
//                 key={bar}
//                 className="stage-waveform-bar"
//                 style={{
//                   height: `${height}px`,
//                   animationDelay: `${bar * 45}ms`,
//                 }}
//               />
//             )
//           })}
//         </div>
//       </div>

//       {/* Indicadores técnicos */}
//       <div className="stage-status stage-status-top">
//         <span className="stage-status-light" />
//         <span>SYSTEM ACTIVE</span>
//       </div>

//       <div className="stage-status stage-status-bottom">
//         <span>CH 01</span>
//         <span className="stage-status-divider" />
//         <span>MASTER</span>
//         <span className="stage-status-light" />
//       </div>

//       {/* Líneas de interfaz */}
//       <div className="stage-interface-line stage-interface-line-one" />
//       <div className="stage-interface-line stage-interface-line-two" />
//     </div>
//   )
// }