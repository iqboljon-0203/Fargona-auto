
import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import dynamic from 'next/dynamic'

const CarShowcase = dynamic(() => import('@/components/CarShowcase'))
const AboutSection = dynamic(() => import('@/components/AboutSection'))
const NewsSection = dynamic(() => import('@/components/NewsSection'))
const ContactSection = dynamic(() => import('@/components/ContactSection'))
const LocationSection = dynamic(() => import('@/components/LocationSection'))
const Footer = dynamic(() => import('@/components/Footer'))

export default async function Home() {
  return (
    <main id="main-content" className="bg-zinc-50 dark:bg-zinc-950 min-h-screen text-zinc-950 dark:text-white overflow-x-hidden selection:bg-yellow-500 selection:text-black">
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
