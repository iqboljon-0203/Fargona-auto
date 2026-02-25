'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, FileText, FileDown, Calendar } from 'lucide-react'
import LangLink from '@/components/LangLink'
import { useDictionary } from '@/components/DictionaryProvider'
import { getLocalizedText } from '@/lib/i18n-utils'
import { useParams } from 'next/navigation'
import Image from 'next/image'

interface ReportsSectionProps {
  initialReports?: any[]
}

export default function ReportsSection({ initialReports = [] }: ReportsSectionProps) {
  const dict = useDictionary() as any
  const t = dict.reports
  const { lang } = useParams() as { lang: string }
  const currentLang = lang || 'uz'

  // Only show up to 3 reports on the home page
  const displayReports = initialReports.slice(0, 3)

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
    <section id="reports" className="py-24 bg-white dark:bg-zinc-950 transition-colors relative">
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-2 mb-4"
            >
              <div className="h-px w-8 bg-yellow-500" />
              <span className="text-yellow-500 font-bold uppercase tracking-widest text-sm">
                {t?.label || 'Kompaniya Hisobotlari'}
              </span>
            </motion.div>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-zinc-950 dark:text-white"
            >
              {t?.title_1 || 'Jamiyat'} <span className="text-yellow-500">{t?.title_2 || 'Hisobotlari'}</span>
            </motion.h2>
          </div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <LangLink 
              href="/reports"
              className="group flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-zinc-950 dark:text-white hover:text-yellow-500 dark:hover:text-yellow-500 transition-colors"
            >
              {t?.all || 'Barchasi'}
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </LangLink>
          </motion.div>
        </div>

        {displayReports.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-12 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl">
            <div className="w-16 h-16 bg-white dark:bg-zinc-800 rounded-2xl flex items-center justify-center text-zinc-400 mb-4 shadow-sm">
              <FileText size={28} />
            </div>
            <p className="text-zinc-500 font-medium text-center">
              {dict.reports_page?.empty || 'Hozircha hisobotlar mavjud emas'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayReports.map((item, i) => {
            const itemTitle = getLocalizedText(item.title, currentLang)
            const itemDescription = getLocalizedText(item.description, currentLang)

            return (
              <motion.article
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex flex-col bg-zinc-50 dark:bg-zinc-900 rounded-3xl overflow-hidden border border-zinc-200 dark:border-zinc-800 shadow-lg dark:shadow-none hover:border-yellow-500 transition-all duration-300 group"
              >
                <LangLink href={`/reports/${item.slug || item.id}`} className="block w-full">
                  {item.image ? (
                    <div className="relative h-48 w-full overflow-hidden flex-shrink-0 bg-zinc-200 dark:bg-zinc-800 border-b border-zinc-200 dark:border-zinc-800">
                      <Image
                        src={item.image}
                        alt={itemTitle}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  ) : (
                    <div className="relative h-48 w-full flex items-center justify-center bg-zinc-200 dark:bg-zinc-800 flex-shrink-0 border-b border-zinc-200 dark:border-zinc-800">
                      <FileText size={48} className="text-zinc-400 dark:text-zinc-700" />
                    </div>
                  )}
                  
                  <div className="px-8 pt-8 flex flex-col">
                    <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-zinc-500 mb-4">
                      <Calendar size={14} className="text-yellow-500" />
                      {formatDate(item.created_at)}
                    </div>
                    
                    <h3 className="text-xl font-bold text-zinc-950 dark:text-white mb-3 group-hover:text-yellow-500 transition-colors leading-tight uppercase tracking-tight">
                      {itemTitle}
                    </h3>
                    
                    <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed mb-6 font-medium line-clamp-2">
                      {itemDescription}
                    </p>
                  </div>
                </LangLink>
                  
                <div className="p-8 pt-0 mt-auto">
                  <div className="border-t border-zinc-200 dark:border-zinc-800 pt-6">
                    {item.file_url ? (
                      <a 
                        href={item.file_url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 w-full bg-white hover:bg-yellow-500 dark:bg-zinc-800 dark:hover:bg-yellow-500 border border-zinc-200 dark:border-zinc-800 dark:hover:border-yellow-500 text-zinc-900 dark:text-white hover:text-black font-bold uppercase tracking-widest text-xs py-3.5 rounded-xl transition-colors duration-300 shadow-sm"
                      >
                        <FileDown size={16} />
                        {dict.reports_page?.download || 'Yuklab olish'}
                      </a>
                    ) : (
                      <button disabled className="flex items-center justify-center gap-2 w-full bg-zinc-100 dark:bg-zinc-800/50 text-zinc-400 dark:text-zinc-600 font-bold uppercase tracking-widest text-xs py-3.5 rounded-xl cursor-not-allowed">
                        <FileDown size={16} />
                        Fayl mavjud emas
                      </button>
                    )}
                  </div>
                </div>
              </motion.article>
            )
          })}
          </div>
        )}
      </div>
    </section>
  )
}
