'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ArrowRight, Calendar } from 'lucide-react'
import { newsData } from '@/data/newsData'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export default function NewsPage() {
  return (
    <div className="bg-zinc-50 dark:bg-zinc-950 min-h-screen text-zinc-950 dark:text-white selection:bg-yellow-500 selection:text-black">
      <Navbar />
      <main className="pt-32 pb-24">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <p className="text-xs text-yellow-500 uppercase tracking-widest font-semibold mb-2">Barcha xabarlar</p>
            <h1 className="text-4xl md:text-5xl font-bold uppercase tracking-tighter">
              Yangiliklar<span className="text-yellow-500"> Arxivi</span>
            </h1>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {newsData.map((item, i) => (
              <Link href={`/news/${item.id}`} key={item.id} className="block h-full group">
                <motion.article
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="h-full bg-white dark:bg-zinc-900 rounded-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800 hover:border-yellow-500/40 transition-colors duration-300 flex flex-col shadow-lg dark:shadow-none"
                >
                  <div className="relative h-56 w-full overflow-hidden flex-shrink-0">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-white/90 via-black/5 to-transparent dark:from-zinc-900/90 dark:via-black/20" />
                    <span className={`absolute top-4 left-4 text-xs font-bold uppercase px-3 py-1 rounded-full tracking-widest shadow ${item.categoryColor}`}>
                      {item.category}
                    </span>
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex items-center gap-2 text-xs text-zinc-500 dark:text-gray-500 mb-3">
                      <Calendar size={12} />
                      {item.date}
                    </div>
                    <h3 className="text-lg font-bold text-zinc-950 dark:text-white mb-3 group-hover:text-yellow-500 transition-colors leading-snug">
                      {item.title}
                    </h3>
                    <p className="text-sm text-zinc-600 dark:text-gray-400 leading-relaxed flex-1 line-clamp-3">
                      {item.excerpt}
                    </p>
                    <div className="flex items-center gap-1 mt-5 text-yellow-500 text-sm font-semibold">
                      Batafsil <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </motion.article>
              </Link>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
