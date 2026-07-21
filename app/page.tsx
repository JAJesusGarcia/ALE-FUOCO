import About from '@/components/about'
import Contact from '@/components/contact'
import SectionTransition from '@/components/effects/section-transition'
import Gallery from '@/components/gallery'
import Hero from '@/components/hero'
import Testimonials from '@/components/testimonials'

export default function HomePage() {
  return (
    <main className="relative overflow-x-clip">
      <Hero />

      <SectionTransition
        label="Selected works"
        number="01"
      />

      <Gallery />

      <SectionTransition
        label="Profile"
        number="02"
        direction="left"
      />

      <About />

      <SectionTransition
        label="Testimonials"
        number="03"
      />

      <Testimonials />

      <SectionTransition
        label="Contact channel"
        number="04"
        direction="left"
      />

      <Contact />
    </main>
  )
}