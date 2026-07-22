import About from '@/components/about'
import Contact from '@/components/contact'
import SectionTransition from '@/components/effects/section-transition'
import Gallery from '@/components/gallery'
import Hero from '@/components/hero'
import Services from '@/components/services'
import Testimonials from '@/components/testimonials'

export default function HomePage() {
  return (
    <main className="relative overflow-x-clip">
      <Hero />

      <SectionTransition label="Services" number="02" />

      <Services />

      <SectionTransition label="Selected works" number="03" direction="left" />

      <Gallery />

      <SectionTransition label="Profile" number="04" />

      <About />

      <SectionTransition label="Testimonials" number="05" direction="left" />

      <Testimonials />

      <SectionTransition label="Contact channel" number="06" />

      <Contact />
    </main>
  )
}
