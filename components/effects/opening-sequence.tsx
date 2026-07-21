'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { useReducedMotion } from 'framer-motion'

const INTRO_DURATION = 2400
const EXIT_DURATION = 700

export default function OpeningSequence() {
  const shouldReduceMotion = useReducedMotion()
  const [isVisible, setIsVisible] = useState(true)
  const [isExiting, setIsExiting] = useState(false)

  useEffect(() => {
    if (shouldReduceMotion) {
      const reducedMotionTimer = window.setTimeout(() => {
        setIsVisible(false)
      }, 350)

      return () => window.clearTimeout(reducedMotionTimer)
    }

    const exitTimer = window.setTimeout(() => {
      setIsExiting(true)
    }, INTRO_DURATION)

    const removeTimer = window.setTimeout(() => {
      setIsVisible(false)
    }, INTRO_DURATION + EXIT_DURATION)

    return () => {
      window.clearTimeout(exitTimer)
      window.clearTimeout(removeTimer)
    }
  }, [shouldReduceMotion])

  if (!isVisible) {
    return null
  }

  return (
    <div
      aria-hidden="true"
      className={`
        opening-sequence
        ${isExiting ? 'opening-sequence--exiting' : ''}
      `}
    >
      <div className="opening-sequence__background" />

      <div className="opening-sequence__haze opening-sequence__haze--one" />
      <div className="opening-sequence__haze opening-sequence__haze--two" />

      <div className="opening-sequence__beams">
        <span className="opening-sequence__beam opening-sequence__beam--one" />
        <span className="opening-sequence__beam opening-sequence__beam--two" />
        <span className="opening-sequence__beam opening-sequence__beam--three" />
        <span className="opening-sequence__beam opening-sequence__beam--four" />
        <span className="opening-sequence__beam opening-sequence__beam--five" />
      </div>

      <div className="opening-sequence__logo">
        <Image
          src="/images/logo-ale1.webp"
          alt=""
          width={1000}
          height={500}
          priority
          sizes="(max-width: 767px) 18rem, 28rem"
          className="h-auto w-full"
        />
      </div>

      <div className="opening-sequence__glow" />

      <style jsx>{`
        .opening-sequence {
          position: fixed;
          inset: 0;
          z-index: 9999;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          background: #050505;
          opacity: 1;
          visibility: visible;
          transition:
            opacity ${EXIT_DURATION}ms cubic-bezier(0.16, 1, 0.3, 1),
            visibility ${EXIT_DURATION}ms;
        }

        .opening-sequence--exiting {
          opacity: 0;
          visibility: hidden;
          pointer-events: none;
        }

        .opening-sequence__background {
          position: absolute;
          inset: 0;
          background:
            radial-gradient(
              circle at 50% 68%,
              rgba(255, 255, 255, 0.055),
              transparent 30%
            ),
            linear-gradient(180deg, #020202 0%, #080706 55%, #020202 100%);
        }

        .opening-sequence__beams {
          position: absolute;
          inset: 0;
          overflow: hidden;
          opacity: 0;
          animation: beams-appear 900ms ease-out 150ms forwards;
        }

        .opening-sequence__beam {
          position: absolute;
          bottom: -22vh;
          left: 50%;
          width: clamp(5rem, 10vw, 10rem);
          height: 135vh;
          transform-origin: 50% 100%;
          clip-path: polygon(43% 100%, 57% 100%, 100% 0%, 0% 0%);
          background: linear-gradient(
            to top,
            rgba(255, 244, 219, 0.32) 0%,
            rgba(255, 248, 232, 0.13) 24%,
            rgba(255, 255, 255, 0.045) 62%,
            transparent 100%
          );
          filter: blur(12px);
          mix-blend-mode: screen;
          will-change: transform;
        }

        .opening-sequence__beam--one {
          margin-left: -42vw;
          opacity: 0.56;
          animation: beam-one 4.8s ease-in-out infinite alternate;
        }

        .opening-sequence__beam--two {
          margin-left: -23vw;
          opacity: 0.72;
          animation: beam-two 4.2s ease-in-out infinite alternate;
        }

        .opening-sequence__beam--three {
          margin-left: -5vw;
          opacity: 0.45;
          animation: beam-three 5s ease-in-out infinite alternate;
        }

        .opening-sequence__beam--four {
          margin-left: 15vw;
          opacity: 0.68;
          animation: beam-four 4.5s ease-in-out infinite alternate;
        }

        .opening-sequence__beam--five {
          margin-left: 34vw;
          opacity: 0.5;
          animation: beam-five 5.2s ease-in-out infinite alternate;
        }

        .opening-sequence__haze {
          position: absolute;
          border-radius: 9999px;
          background: rgba(255, 245, 224, 0.075);
          filter: blur(90px);
          opacity: 0;
          animation: haze-appear 1.2s ease-out 250ms forwards;
        }

        .opening-sequence__haze--one {
          bottom: 6%;
          left: 18%;
          width: 44vw;
          height: 25vh;
        }

        .opening-sequence__haze--two {
          right: 8%;
          bottom: 18%;
          width: 38vw;
          height: 22vh;
        }

        .opening-sequence__logo {
          position: relative;
          z-index: 4;
          width: min(72vw, 29rem);
          opacity: 0;
          transform: translateY(12px) scale(0.985);
          filter: brightness(0.85);
          animation: logo-appear 1.2s cubic-bezier(0.16, 1, 0.3, 1) 350ms
            forwards;
        }

        .opening-sequence__glow {
          position: absolute;
          z-index: 3;
          width: min(72vw, 31rem);
          height: 10rem;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.065);
          filter: blur(70px);
          opacity: 0;
          animation: glow-appear 1.1s ease-out 650ms forwards;
        }

        @keyframes beams-appear {
          from {
            opacity: 0;
          }

          to {
            opacity: 1;
          }
        }

        @keyframes haze-appear {
          from {
            opacity: 0;
            transform: scale(0.82);
          }

          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes logo-appear {
          0% {
            opacity: 0;
            transform: translateY(12px) scale(0.985);
            filter: brightness(0.8);
          }

          65% {
            opacity: 1;
          }

          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
            filter: brightness(1.08);
          }
        }

        @keyframes glow-appear {
          from {
            opacity: 0;
            transform: scale(0.75);
          }

          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes beam-one {
          from {
            transform: translateX(-50%) rotate(-30deg);
          }

          to {
            transform: translateX(-50%) rotate(-10deg);
          }
        }

        @keyframes beam-two {
          from {
            transform: translateX(-50%) rotate(-17deg);
          }

          to {
            transform: translateX(-50%) rotate(8deg);
          }
        }

        @keyframes beam-three {
          from {
            transform: translateX(-50%) rotate(-7deg);
          }

          to {
            transform: translateX(-50%) rotate(14deg);
          }
        }

        @keyframes beam-four {
          from {
            transform: translateX(-50%) rotate(13deg);
          }

          to {
            transform: translateX(-50%) rotate(-7deg);
          }
        }

        @keyframes beam-five {
          from {
            transform: translateX(-50%) rotate(29deg);
          }

          to {
            transform: translateX(-50%) rotate(8deg);
          }
        }

        @media (max-width: 767px) {
          .opening-sequence__beam {
            width: 5rem;
            height: 115vh;
            filter: blur(10px);
          }

          .opening-sequence__beam--one {
            margin-left: -58vw;
          }

          .opening-sequence__beam--two {
            margin-left: -32vw;
          }

          .opening-sequence__beam--three {
            margin-left: -8vw;
          }

          .opening-sequence__beam--four {
            margin-left: 20vw;
          }

          .opening-sequence__beam--five {
            margin-left: 48vw;
          }

          .opening-sequence__logo {
            width: min(78vw, 21rem);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .opening-sequence__beam,
          .opening-sequence__beams,
          .opening-sequence__haze,
          .opening-sequence__logo,
          .opening-sequence__glow {
            animation: none;
          }

          .opening-sequence__logo {
            opacity: 1;
            transform: none;
            filter: none;
          }
        }
      `}</style>
    </div>
  )
}
