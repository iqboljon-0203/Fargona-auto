
import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import dynamic from 'next/dynamic'
import { supabase } from '@/lib/supabase'

const CarShowcase = dynamic(() => import('@/components/CarShowcase'))
const AboutSection = dynamic(() => import('@/components/AboutSection'))
const NewsSection = dynamic(() => import('@/components/NewsSection'))
const ContactSection = dynamic(() => import('@/components/ContactSection'))
const LocationSection = dynamic(() => import('@/components/LocationSection'))
const Footer = dynamic(() => import('@/components/Footer'))

export default async function Home() {
  const [aboutDataRes, newsDataRes] = await Promise.all([
    supabase.from('about').select('*').single(),
    supabase.from('news').select('*').order('created_at', { ascending: false }).limit(4)
  ])

  return (
    <main id="main-content" className="bg-zinc-50 dark:bg-zinc-950 min-h-screen text-zinc-950 dark:text-white overflow-x-hidden selection:bg-yellow-500 selection:text-black">
      <Navbar />
      <Hero />
      <CarShowcase />
      <AboutSection initialData={aboutDataRes.data} />
      <NewsSection initialNews={newsDataRes.data || []} />
      <ContactSection />
      <LocationSection />
      <Footer />
    </main>
  )
}
