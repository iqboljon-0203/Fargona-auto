
'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ArrowRight, Calendar } from 'lucide-react'
import { newsData } from '@/data/newsData'



export default function NewsSection() {
  const [featured, ...rest] = newsData

  return (
    <section id="news" className="bg-zinc-50 dark:bg-zinc-950 py-24 text-zinc-950 dark:text-white">
      <div className="container mx-auto px-6">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4"
        >
          <div>
            <p className="text-xs text-yellow-500 uppercase tracking-widest font-semibold mb-2">So'nggi xabarlar</p>
            <h2 className="text-4xl md:text-5xl font-bold uppercase tracking-tighter">
              Yangi<span className="text-yellow-500">liklar</span>
            </h2>
          </div>
          <Link href="/news" className="flex items-center gap-2 text-sm text-zinc-600 hover:text-yellow-500 dark:text-gray-400 transition-colors font-medium uppercase tracking-wider group self-start md:self-auto">
            Barchasi
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>

        {/* Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">

          {/* Featured card — takes 3/5 */}
          <Link href={`/news/${featured.slug}`} className="lg:col-span-3 block">
            <motion.article
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="h-full group cursor-pointer bg-white dark:bg-zinc-900 rounded-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800 hover:border-yellow-500/40 transition-colors duration-300 flex flex-col shadow-lg dark:shadow-none"
            >
              <div className="relative h-64 md:h-80 w-full overflow-hidden flex-shrink-0">
                <Image
                  src={featured.image}
                  alt={featured.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 60vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-white/90 via-black/5 to-transparent dark:from-zinc-900/90 dark:via-black/20" />
                <span className={`absolute top-4 left-4 text-xs font-bold uppercase px-3 py-1 rounded-full tracking-widest shadow ${featured.categoryColor}`}>
                  {featured.category}
                </span>
              </div>
              <div className="p-6 flex flex-col flex-1">
                <div className="flex items-center gap-2 text-xs text-zinc-500 dark:text-gray-500 mb-3">
                  <Calendar size={12} />
                  {featured.date}
                </div>
                <h3 className="text-xl font-bold text-zinc-950 dark:text-white mb-3 group-hover:text-yellow-500 transition-colors leading-snug">
                  {featured.title}
                </h3>
                <p className="text-sm text-zinc-600 dark:text-gray-400 leading-relaxed flex-1 line-clamp-3">
                  {featured.excerpt}
                </p>
                <div className="flex items-center gap-1 mt-5 text-yellow-500 text-sm font-semibold">
                  Batafsil <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </motion.article>
          </Link>

          {/* Right column — 3 small cards stacked */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            {rest.map((item, i) => (
              <Link href={`/news/${item.slug}`} key={item.id} className="block flex-1">
                <motion.article
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="h-full group cursor-pointer bg-white dark:bg-zinc-900 rounded-xl overflow-hidden border border-zinc-200 dark:border-zinc-800 hover:border-yellow-500/40 transition-colors duration-300 flex gap-0 shadow-sm dark:shadow-none"
                >
                  {/* Image */}
                  <div className="relative w-28 md:w-36 shrink-0 overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      sizes="150px"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white/20 dark:to-zinc-900/20" />
                  </div>

                  {/* Text */}
                  <div className="p-4 flex flex-col justify-between flex-1 min-w-0">
                    <div>
                      <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full tracking-widest inline-block mb-2 ${item.categoryColor}`}>
                        {item.category}
                      </span>
                      <h4 className="text-sm font-semibold text-zinc-950 dark:text-white group-hover:text-yellow-500 transition-colors leading-snug line-clamp-2">
                        {item.title}
                      </h4>
                    </div>
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center gap-1.5 text-xs text-zinc-500 dark:text-gray-500">
                        <Calendar size={11} />
                        {item.date}
                      </div>
                      <ArrowRight size={14} className="text-zinc-400 dark:text-gray-600 group-hover:text-yellow-500 group-hover:translate-x-0.5 transition-all" />
                    </div>
                  </div>
                </motion.article>
              </Link>
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}
