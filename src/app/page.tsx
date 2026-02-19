
import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import CarShowcase from '@/components/CarShowcase'
import AboutSection from '@/components/AboutSection'
import NewsSection from '@/components/NewsSection'
import ContactSection from '@/components/ContactSection'
import LocationSection from '@/components/LocationSection'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main className="bg-black min-h-screen text-white overflow-x-hidden selection:bg-yellow-500 selection:text-black">
      <Navbar />
      <Hero />
      <CarShowcase />
      <AboutSection />
      <NewsSection />
      <ContactSection />
      <LocationSection />
      <Footer />
    </main>
  )
}
