
import React from 'react'
import LangLink from '@/components/LangLink'
import Image from 'next/image'
import { ArrowLeft, ArrowRight, Calendar } from 'lucide-react'
import { newsData } from '@/data/newsData'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { supabase } from '@/lib/supabase'
import { getDictionary } from '@/get-dictionary'
import { Locale } from '@/i18n-config'
import NewsListClient from '@/components/NewsListClient'

export const dynamic = 'force-dynamic'

export default async function NewsPage({ params }: { params: Promise<{ lang: Locale }> }) {
  const { lang } = await params
  const dict = await getDictionary(lang)
  const t = (dict as any).news

  // 1. Fetch from Supabase
  const { data: dbNews } = await supabase
    .from('news')
    .select('*')
    .order('created_at', { ascending: false })

  // 2. Fallback / Merge
  const displayNews = (dbNews && dbNews.length > 0) ? dbNews : newsData

  return (
    <div className="bg-zinc-50 dark:bg-zinc-950 min-h-screen text-zinc-950 dark:text-white selection:bg-yellow-500 selection:text-black">
      <Navbar />
      <main className="pt-32 pb-24">
        <div className="container mx-auto px-6">
          <div className="mb-12">
            <LangLink
              href="/"
              className="flex items-center gap-2 text-sm text-zinc-500 hover:text-yellow-500 transition-colors mb-6 group font-medium uppercase tracking-wider"
            >
              <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
              {t?.back}
            </LangLink>
            
            <p className="text-xs text-yellow-500 uppercase tracking-widest font-semibold mb-2">{t?.page_label}</p>
            <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter">
              {t?.page_title_1}<span className="text-yellow-500">{t?.page_title_2}</span>
            </h1>
          </div>

          <NewsListClient news={displayNews} dict={dict} t={t} />
        </div>
      </main>
      <Footer />
    </div>
  )
}

