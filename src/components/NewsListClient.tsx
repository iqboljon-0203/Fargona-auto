
'use client'

import React from 'react'
import NewsImage from '@/components/NewsImage'
import { motion } from 'framer-motion'
import { ArrowRight, Calendar } from 'lucide-react'
import LangLink from '@/components/LangLink'

interface NewsListClientProps {
  news: any[]
  dict: any
  t: any
}

export default function NewsListClient({ news, dict, t }: NewsListClientProps) {
  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Aksiya': return 'bg-red-500 text-white'
      case 'Yangi model': return 'bg-blue-500 text-white'
      case 'Xizmat': return 'bg-emerald-500 text-white'
      default: return 'bg-yellow-500 text-black'
    }
  }

  const formatDate = (dateStr: string) => {
    if (!dateStr) return ''
    if (dateStr.includes('T')) {
      try {
        const [datePart] = dateStr.split('T')
        const [year, month, day] = datePart.split('-')
        return `${day}.${month}.${year}`
      } catch (e) {
        return dateStr
      }
    }
    return dateStr
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {news.map((item, i) => {
        // Handle translations if available in dictionary
        const itemDict = dict.news_items?.[item.slug] || {}
        const itemTitle = itemDict.title || item.title
        const itemExcerpt = itemDict.excerpt || item.excerpt
        // Category translation if exists
        const itemCategory = dict.news_items?.categories?.[item.category] || item.category

        return (
          <LangLink href={`/news/${item.slug}`} key={item.id} className="block h-full group">
            <motion.article
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="h-full bg-white dark:bg-zinc-900 rounded-3xl overflow-hidden border border-zinc-200 dark:border-zinc-800 hover:border-yellow-500 transition-all duration-500 flex flex-col shadow-xl dark:shadow-none"
            >
              <div className="relative h-60 w-full overflow-hidden flex-shrink-0">
                <NewsImage
                  src={item.image}
                  alt={itemTitle}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover group-hover:scale-110 transition-transform duration-1000"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-white/20 via-transparent to-transparent dark:from-zinc-900/20" />
                <span className={`absolute top-5 left-5 text-[10px] font-bold uppercase px-3 py-1.5 rounded-full tracking-widest shadow-lg ${getCategoryColor(item.category)}`}>
                  {itemCategory}
                </span>
              </div>
              <div className="p-8 flex flex-col flex-1">
                <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-zinc-400 mb-4">
                  <Calendar size={14} className="text-yellow-500" />
                  {formatDate(item.created_at || item.date)}
                </div>
                <h3 className="text-xl font-bold text-zinc-950 dark:text-white mb-4 group-hover:text-yellow-500 transition-colors leading-tight uppercase tracking-tight">
                  {itemTitle}
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed flex-1 line-clamp-3 font-medium">
                  {itemExcerpt}
                </p>
                <div className="flex items-center gap-2 mt-8 text-yellow-500 text-xs font-bold uppercase tracking-widest group/btn">
                  {t?.read_more || "Batafsil O'qish"} 
                  <ArrowRight size={14} className="group-hover/btn:translate-x-2 transition-transform" />
                </div>
              </div>
            </motion.article>
          </LangLink>
        )
      })}
    </div>
  )
}
