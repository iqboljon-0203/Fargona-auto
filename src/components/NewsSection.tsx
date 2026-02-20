
'use client'

import React, { useEffect, useState } from 'react'
import LangLink from '@/components/LangLink'
import NewsImage from '@/components/NewsImage'
import { motion } from 'framer-motion'
import { ArrowRight, Calendar, Loader2 } from 'lucide-react'
import { newsData } from '@/data/newsData'
import { useDictionary } from '@/components/DictionaryProvider'
import { supabase } from '@/lib/supabase'

export default function NewsSection() {
  const [dbNews, setDbNews] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const dict = useDictionary() as any
  const t = dict.news

  useEffect(() => {
    const fetchNews = async () => {
      const { data } = await supabase
        .from('news')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(4)
      
      if (data && data.length > 0) setDbNews(data)
      setLoading(false)
    }
    fetchNews()
  }, [])

  // Date formatter helper
  const formatDate = (dateStr: string) => {
    if (!dateStr) return ''
    // If it's already in ISO format from DB
    if (dateStr.includes('T')) {
      try {
        const [datePart] = dateStr.split('T')
        const [year, month, day] = datePart.split('-')
        return `${day}.${month}.${year}`
      } catch (e) {
        return dateStr
      }
    }
    // If it's DD.MM.YYYY from static data
    const parts = dateStr.split('.')
    if (parts.length === 3) {
      return `${parts[0]}.${parts[1]}.${parts[2]}`
    }
    return dateStr
  }

  // Priority: DB News > Static newsData
  const displayNews = dbNews.length > 0 ? dbNews : newsData
  const [featured, ...rest] = displayNews

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Aksiya': return 'bg-red-500 text-white'
      case 'Yangi model': return 'bg-blue-500 text-white'
      case 'Xizmat': return 'bg-emerald-500 text-white'
      default: return 'bg-yellow-500 text-black'
    }
  }

  if (loading) return null

  return (
    <section id="news" className="bg-zinc-50 dark:bg-zinc-950 py-24 text-zinc-950 dark:text-white overflow-hidden">
      <div className="container mx-auto px-6">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4 relative z-20">
          <div>
            <p className="text-xs text-yellow-500 uppercase tracking-widest font-semibold mb-3">
              {t?.label || "Oxirgi yangiliklar"}
            </p>
            <h2 className="text-4xl md:text-5xl font-bold uppercase tracking-tighter leading-tight text-zinc-950 dark:text-white">
              {t?.title_1 || "So'nggi"}<span className="text-yellow-500">{t?.title_2 || " Yangiliklar"}</span>
            </h2>
          </div>
          <LangLink 
            href="/news" 
            className="flex items-center gap-2 text-sm text-zinc-600 dark:text-gray-400 hover:text-yellow-500 transition-colors font-medium uppercase tracking-wider group self-start md:self-auto"
          >
            {t?.all || "Barchasi"}
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </LangLink>
        </div>

        {/* Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">

          {/* Featured card */}
          {featured && (
            <LangLink href={`/news/${featured.slug}`} className="lg:col-span-3 block">
              <motion.article
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="h-full group cursor-pointer bg-white dark:bg-zinc-900 rounded-3xl overflow-hidden border border-zinc-200 dark:border-zinc-800 hover:border-yellow-500 transition-all duration-500 flex flex-col shadow-xl dark:shadow-none"
              >
                <div className="relative h-72 md:h-96 w-full overflow-hidden flex-shrink-0">
                  <NewsImage
                    src={featured.image}
                    alt={featured.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 60vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-1000"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-50 via-transparent to-transparent dark:from-zinc-950" />
                  <span className={`absolute top-6 left-6 text-[10px] font-bold uppercase px-4 py-2 rounded-full tracking-widest shadow-lg ${getCategoryColor(featured.category)}`}>
                    {featured.category}
                  </span>
                </div>
                <div className="p-8 flex flex-col flex-1">
                  <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-zinc-400 mb-4">
                    <Calendar size={14} className="text-yellow-500" />
                    {formatDate(featured.created_at || featured.date)}
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold text-zinc-950 dark:text-white mb-4 group-hover:text-yellow-500 transition-colors leading-tight tracking-tight uppercase">
                    {featured.title}
                  </h3>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed flex-1 line-clamp-2">
                    {featured.excerpt}
                  </p>
                  <div className="flex items-center gap-2 mt-8 text-yellow-500 text-xs font-bold uppercase tracking-widest group/btn">
                    {t?.read_more || "Batafsil O'qish"} 
                    <ArrowRight size={14} className="group-hover/btn:translate-x-2 transition-transform" />
                  </div>
                </div>
              </motion.article>
            </LangLink>
          )}

          {/* Right column — small cards */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            {rest.map((item, i) => (
              <LangLink href={`/news/${item.slug}`} key={item.id} className="block flex-1">
                <motion.article
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="h-full group cursor-pointer bg-white dark:bg-zinc-900 rounded-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800 hover:border-yellow-500 transition-all duration-500 flex gap-0 shadow-lg dark:shadow-none"
                >
                  <div className="relative w-32 md:w-44 shrink-0 overflow-hidden">
                    <NewsImage
                      src={item.image}
                      alt={item.title}
                      fill
                      sizes="200px"
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent to-zinc-50/20 dark:to-zinc-950/20" />
                  </div>

                  <div className="p-6 flex flex-col justify-between flex-1 min-w-0">
                    <div>
                      <span className={`text-[9px] font-bold uppercase px-3 py-1 rounded-full tracking-widest inline-block mb-3 shadow-sm ${getCategoryColor(item.category)}`}>
                        {item.category}
                      </span>
                      <h4 className="text-base font-bold text-zinc-950 dark:text-white group-hover:text-yellow-500 transition-colors leading-tight line-clamp-2 uppercase">
                        {item.title}
                      </h4>
                      <p className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-2 line-clamp-1 leading-relaxed">
                        {item.excerpt}
                      </p>
                    </div>
                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center gap-2 text-[10px] font-bold text-zinc-400">
                        <Calendar size={12} className="text-yellow-500" />
                        {formatDate(item.created_at || item.date)}
                      </div>
                      <div className="w-8 h-8 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-400 group-hover:bg-yellow-500 group-hover:text-black transition-all">
                        <ArrowRight size={14} />
                      </div>
                    </div>
                  </div>
                </motion.article>
              </LangLink>
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}
