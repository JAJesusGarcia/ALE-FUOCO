
import About from '@/components/about'
import Contact from '@/components/contact'
import SectionReveal from '@/components/effects/section-reveal'
import SectionTransition from '@/components/effects/section-transition'
import Gallery from '@/components/gallery'
import Hero from '@/components/hero'
import Testimonials from '@/components/testimonials'


export default function HomePage() {
  return (
    <main className="overflow-hidden">
      <Hero />

      <SectionTransition
        label="Selected works"
        number="01"
      />

      <SectionReveal className="cinematic-section">
        <Gallery />
      </SectionReveal>

      <SectionTransition
        label="Profile"
        number="02"
        direction="left"
      />

      <SectionReveal
        className="cinematic-section"
        distance={45}
      >
        <About />
      </SectionReveal>

      <SectionTransition
        label="Testimonials"
        number="03"
      />

      <SectionReveal
        className="cinematic-section"
        distance={40}
      >
        <Testimonials />
      </SectionReveal>

      <SectionTransition
        label="Contact channel"
        number="04"
        direction="left"
      />

      <SectionReveal
        className="cinematic-section"
        distance={35}
      >
        <Contact />
      </SectionReveal>
    </main>
  )
}