import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, Calendar } from 'lucide-react'
import { newsData } from '@/data/newsData'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export function generateStaticParams() {
  return newsData.map((item) => ({
    slug: item.slug,
  }))
}

export default async function NewsDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params
  const { slug } = resolvedParams
  const newsItem = newsData.find((item) => item.slug === slug)

  if (!newsItem) {
    notFound()
  }

  return (
    <div className="bg-zinc-50 dark:bg-zinc-950 min-h-screen text-zinc-950 dark:text-white selection:bg-yellow-500 selection:text-black">
      <Navbar />
      <main className="pt-32 pb-24">
        <article className="container mx-auto px-6 max-w-4xl">
          <Link href="/news" className="inline-flex items-center gap-2 text-sm text-zinc-500 hover:text-yellow-500 transition-colors mb-8 group font-medium uppercase tracking-wider">
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            Ortga qaytish
          </Link>
          
          <header className="mb-8">
            <div className="flex flex-wrap items-center gap-4 mb-6 text-xs font-semibold uppercase tracking-wider">
              <span className={`px-3 py-1 rounded-full ${newsItem.categoryColor}`}>
                {newsItem.category}
              </span>
              <div className="flex items-center gap-2 text-zinc-500 dark:text-gray-400">
                <Calendar size={14} />
                {newsItem.date}
              </div>
            </div>
            
            <h1 className="text-3xl md:text-5xl font-bold leading-tight mb-8">
              {newsItem.title}
            </h1>
          </header>

          <div className="relative aspect-video w-full rounded-2xl overflow-hidden mb-12 shadow-lg border border-zinc-200 dark:border-zinc-800">
            <Image
              src={newsItem.image}
              alt={newsItem.title}
              fill
              className="object-cover"
              priority
            />
          </div>

          <div 
            className="space-y-6 text-lg leading-relaxed text-zinc-700 dark:text-gray-300 [&>p]:mb-4 [&>ul]:list-disc [&>ul]:pl-5 [&>ul]:mb-6 [&>li]:mb-2"
            dangerouslySetInnerHTML={{ __html: newsItem.content || `<p>${newsItem.excerpt}</p>` }}
          />
        </article>
      </main>
      <Footer />
    </div>
  )
}
