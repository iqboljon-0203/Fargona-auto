'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { FileDown, Calendar, FileText } from 'lucide-react'
import { getLocalizedText } from '@/lib/i18n-utils'
import { useParams } from 'next/navigation'
import Image from 'next/image'
import LangLink from '@/components/LangLink'

interface ReportsListClientProps {
  reports: any[]
  t: any
}

export default function ReportsListClient({ reports, t }: ReportsListClientProps) {
  const { lang } = useParams() as { lang: string }
  const currentLang = lang || 'uz'

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

  if (!reports || reports.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-20 bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-200 dark:border-zinc-800 text-center">
        <div className="w-16 h-16 bg-zinc-100 dark:bg-zinc-800 rounded-2xl flex items-center justify-center text-zinc-400 mb-6">
          <FileText size={32} />
        </div>
        <p className="text-zinc-500 font-medium">{t?.empty || 'Hozircha hisobotlar mavjud emas'}</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {reports.map((item, i) => {
        const itemTitle = getLocalizedText(item.title, currentLang)
        const itemDescription = getLocalizedText(item.description, currentLang)

        return (
          <motion.article
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="flex flex-col bg-white dark:bg-zinc-900 rounded-3xl overflow-hidden border border-zinc-200 dark:border-zinc-800 shadow-xl dark:shadow-none hover:border-yellow-500 transition-all duration-300 group"
          >
            <LangLink href={`/reports/${item.slug || item.id}`} className="block w-full">
              {item.image ? (
                <div className="relative h-48 w-full overflow-hidden flex-shrink-0 bg-zinc-100 dark:bg-zinc-800 border-b border-zinc-200 dark:border-zinc-800">
                  <Image
                    src={item.image}
                    alt={itemTitle}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              ) : (
                <div className="relative h-48 w-full flex items-center justify-center bg-zinc-100 dark:bg-zinc-800 flex-shrink-0 border-b border-zinc-200 dark:border-zinc-800">
                  <FileText size={48} className="text-zinc-300 dark:text-zinc-700" />
                </div>
              )}
              
              <div className="px-8 pt-8 flex flex-col">
                <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-zinc-400 mb-4">
                  <Calendar size={14} className="text-yellow-500" />
                  {formatDate(item.created_at)}
                </div>
                
                <h3 className="text-xl font-bold text-zinc-950 dark:text-white mb-3 group-hover:text-yellow-500 transition-colors leading-tight uppercase tracking-tight">
                  {itemTitle}
                </h3>
                
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed mb-6 font-medium line-clamp-3">
                  {itemDescription}
                </p>
              </div>
            </LangLink>
              
            <div className="p-8 pt-0 mt-auto">
              <div className="border-t border-zinc-100 dark:border-zinc-800 pt-6">
                {item.file_url ? (
                  <a 
                    href={item.file_url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full bg-zinc-100 hover:bg-yellow-500 dark:bg-zinc-800 dark:hover:bg-yellow-500 text-zinc-900 dark:text-white hover:text-black font-bold uppercase tracking-widest text-xs py-3.5 rounded-xl transition-colors duration-300"
                  >
                    <FileDown size={16} />
                    {t?.download || 'Yuklab olish'}
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
  )
}
