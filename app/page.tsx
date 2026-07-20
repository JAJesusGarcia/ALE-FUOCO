import Navbar from '@/components/navbar'
import Hero from '@/components/hero'
import Gallery from '@/components/gallery'
import About from '@/components/about'
import Testimonials from '@/components/testimonials'
import Contact from '@/components/contact'
import Footer from '@/components/footer'

export default function HomePage() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Gallery />
      <About />
      <Testimonials />
      <Contact />
      <Footer />
    </main>
  )
}
