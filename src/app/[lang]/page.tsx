

export const dynamic = 'force-dynamic'

import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import nextDynamic from 'next/dynamic'
import { supabase } from '@/lib/supabase'

const CarShowcase = nextDynamic(() => import('@/components/CarShowcase'))
const AboutSection = nextDynamic(() => import('@/components/AboutSection'))
const NewsSection = nextDynamic(() => import('@/components/NewsSection'))
const ReportsSection = nextDynamic(() => import('@/components/ReportsSection'))
const ContactSection = nextDynamic(() => import('@/components/ContactSection'))
const LocationSection = nextDynamic(() => import('@/components/LocationSection'))
const Footer = nextDynamic(() => import('@/components/Footer'))

export default async function Home() {
  const [aboutDataRes, newsDataRes, reportsDataRes] = await Promise.all([
    supabase.from('about').select('*').single(),
    supabase.from('news').select('*').order('created_at', { ascending: false }).limit(4),
    supabase.from('reports').select('*').order('created_at', { ascending: false }).limit(3)
  ])

  return (
    <main id="main-content" className="bg-zinc-50 dark:bg-zinc-950 min-h-screen text-zinc-950 dark:text-white overflow-x-hidden selection:bg-yellow-500 selection:text-black">
      <Navbar />
      <Hero />
      <CarShowcase />
      <AboutSection initialData={aboutDataRes.data} />
      <NewsSection initialNews={newsDataRes.data || []} />
      <ReportsSection initialReports={reportsDataRes.data || []} />
      <ContactSection />
      <LocationSection />
      <Footer />
    </main>
  )
}
