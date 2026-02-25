import React from 'react'
import LangLink from '@/components/LangLink'
import { ArrowLeft, Calendar, FileDown } from 'lucide-react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { supabase } from '@/lib/supabase'
import { getDictionary } from '@/get-dictionary'
import { Locale } from '@/i18n-config'
import { getLocalizedText } from '@/lib/i18n-utils'
import Image from 'next/image'
import { notFound } from 'next/navigation'

export const dynamic = 'force-dynamic'

export default async function ReportDetailPage({ params }: { params: Promise<{ lang: Locale, slug: string }> }) {
  const { lang, slug } = await params
  const dict = await getDictionary(lang)
  const t = (dict as any).reports_page

  // Try to find report by slug or id safely
  const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(slug);
  
  const query = isUuid
    ? supabase.from('reports').select('*').or(`slug.eq.${slug},id.eq.${slug}`).single()
    : supabase.from('reports').select('*').eq('slug', slug).single();

  const { data: report, error } = await query;

  if (error || !report) {
    notFound()
  }

  const currentLang = lang || 'uz'
  const title = getLocalizedText(report.title, currentLang)
  const description = getLocalizedText(report.description, currentLang)
  const content = getLocalizedText(report.content, currentLang)

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
    <div className="bg-zinc-50 dark:bg-zinc-950 min-h-screen text-zinc-950 dark:text-white selection:bg-yellow-500 selection:text-black">
      <Navbar />
      <main className="pt-32 pb-24">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="mb-12">
            <LangLink
              href="/reports"
              className="flex items-center gap-2 text-sm text-zinc-500 hover:text-yellow-500 transition-colors mb-6 group font-medium uppercase tracking-wider"
            >
              <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
              {t?.back || 'Ortga qaytish'}
            </LangLink>
            
            <p className="text-xs text-yellow-500 uppercase tracking-widest font-semibold mb-3 flex items-center gap-2">
              <Calendar size={14} />
              {formatDate(report.created_at)}
            </p>
            
            <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-6 leading-tight">
              {title}
            </h1>
            
            {description && (
              <p className="text-lg md:text-xl text-zinc-600 dark:text-zinc-400 font-medium leading-relaxed">
                {description}
              </p>
            )}
          </div>

          {report.image && (
            <div className="relative w-full aspect-[21/9] rounded-3xl overflow-hidden mb-12 shadow-2xl">
              <Image 
                src={report.image} 
                alt={title} 
                fill 
                className="object-cover" 
                sizes="(max-width: 1200px) 100vw, 1200px" 
                priority
              />
            </div>
          )}

          <article className="prose prose-zinc dark:prose-invert prose-lg max-w-none text-zinc-700 dark:text-zinc-300 font-medium leading-relaxed mb-16">
            <div dangerouslySetInnerHTML={{ __html: content || '' }} />
          </article>

          {report.file_url && (
            <div className="bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-8 flex flex-col items-center justify-center text-center mt-12">
              <p className="font-bold uppercase tracking-widest mb-2">Hujjat biriktirilgan</p>
              <p className="text-zinc-500 text-sm mb-6 max-w-sm">Hisobotning to'liq nusxasini pdf yoki docx formatda pastdagi tugma orqali yuklab olishingiz mumkin</p>
              
              <a 
                href={report.file_url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-yellow-500 hover:bg-yellow-400 text-black font-black uppercase tracking-widest text-sm px-8 py-4 rounded-xl transition-all shadow-lg shadow-yellow-500/20"
              >
                <FileDown size={20} />
                {t?.download || 'Yuklab olish'}
              </a>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}
