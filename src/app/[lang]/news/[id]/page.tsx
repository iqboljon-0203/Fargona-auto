
import React from 'react'
import NewsImage from '@/components/NewsImage'
import LangLink from '@/components/LangLink'
import { notFound } from 'next/navigation'
import { ArrowLeft, Calendar } from 'lucide-react'
import { newsData } from '@/data/newsData'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { supabase } from '@/lib/supabase'
import { getLocalizedText } from '@/lib/i18n-utils'

import { getDictionary } from '@/get-dictionary'
import { Locale } from '@/i18n-config'

// Make page dynamic to show new additions immediately
export const dynamic = 'force-dynamic'

export default async function NewsDetailPage({ params }: { params: Promise<{ id: string; lang: Locale }> }) {
  const resolvedParams = await params
  const { id, lang } = resolvedParams
  const dict = await getDictionary(lang)
  const t = (dict as any).news

  // 1. Try to fetch from Supabase
  const { data: dbNews } = await supabase
    .from('news')
    .select('*')
    .eq('slug', id)
    .single()

  // 2. Fallback to static data if not in DB
  let newsItem = dbNews
  let source = 'db'

  if (!newsItem) {
    newsItem = newsData.find((item) => item.slug === id)
    source = 'static'
  }

  if (!newsItem) {
    notFound()
  }

  const getCategoryColor = (categoryRaw: any) => {
    const category = getLocalizedText(categoryRaw, 'uz');
    switch (category) {
      case 'Aksiya': return 'bg-red-500 text-white'
      case 'Yangi model': return 'bg-blue-500 text-white'
      case 'Xizmat': return 'bg-emerald-500 text-white'
      default: return 'bg-yellow-500 text-black'
    }
  }

  // Formatting for display
  const title = getLocalizedText(newsItem.title, lang)
  let content = getLocalizedText(newsItem.content, lang)
  if (!content) {
    content = `<p>${getLocalizedText(newsItem.excerpt, lang)}</p>`
  }
  const category = getLocalizedText(newsItem.category, lang)
  const categoryRaw = newsItem.category
  const image = newsItem.image
  let dateStr = newsItem.date
  if (newsItem.created_at) {
    try {
      const [datePart] = newsItem.created_at.split('T')
      const [year, month, day] = datePart.split('-')
      dateStr = `${day}.${month}.${year}`
    } catch (e) {
      dateStr = newsItem.created_at
    }
  }

  return (
    <div className="bg-zinc-50 dark:bg-zinc-950 min-h-screen text-zinc-950 dark:text-white selection:bg-yellow-500 selection:text-black">
      <Navbar />
      <main className="pt-32 pb-24">
        <article className="container mx-auto px-6 max-w-4xl">
          <LangLink href="/news" className="inline-flex items-center gap-2 text-sm text-zinc-500 hover:text-yellow-500 transition-colors mb-8 group font-medium uppercase tracking-wider">
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            {t.back}
          </LangLink>
          
          <header className="mb-8">
            <div className="flex flex-wrap items-center gap-4 mb-6 text-xs font-bold uppercase tracking-widest">
              <span className={`px-4 py-1.5 rounded-full shadow-sm ${getCategoryColor(categoryRaw)}`}>
                {category}
              </span>
              <div className="flex items-center gap-2 text-zinc-500 dark:text-gray-400">
                <Calendar size={14} className="text-yellow-500" />
                {dateStr}
              </div>
            </div>
            
            <h1 className="text-3xl md:text-5xl font-black leading-tight mb-8 uppercase tracking-tighter">
              {title}
            </h1>
          </header>

          <div className="relative aspect-video w-full rounded-3xl overflow-hidden mb-12 shadow-2xl border border-zinc-200 dark:border-zinc-800">
            <NewsImage
              src={image}
              alt={title || 'News image'}
              fill
              className="object-cover"
              priority
            />
          </div>

          <div 
            className="prose prose-lg dark:prose-invert max-w-none space-y-6 text-lg leading-relaxed text-zinc-700 dark:text-gray-300 [&>p]:mb-4 [&>ul]:list-disc [&>ul]:pl-5 [&>ul]:mb-6 [&>li]:mb-2 [&>h2]:text-2xl [&>h2]:font-bold [&>h2]:mt-8 [&>h2]:mb-4 [&>h2]:uppercase [&>h2]:tracking-tight"
            dangerouslySetInnerHTML={{ __html: content }}
          />
        </article>
      </main>
      <Footer />
    </div>
  )
}
