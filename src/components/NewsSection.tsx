
'use client'

import React from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ArrowRight, Calendar } from 'lucide-react'

const news = [
  {
    id: 1,
    date: '15.02.2026',
    title: 'Chevrolet Tracker 2026 — yangilangan versiya taqdim etildi',
    excerpt:
      "Farg'ona Avtotexxizmat-F showroomida Tracker-ning yangilangan 2026 yil versiyasi rasman taqdim etildi. Yangi model zamonaviy dizayn va kengaytirilgan xususiyatlar bilan jihozlangan.",
    image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=2070&auto=format&fit=crop',
    category: 'Yangi model',
    categoryColor: 'bg-yellow-500 text-black',
    featured: true,
  },
  {
    id: 2,
    date: '01.02.2026',
    title: "Foizsiz muddatli to'lov: 2026 yil yanvar imkoniyatlari",
    excerpt:
      "Yanvar oyida Chevrolet avtomobillarini 0% foiz bilan muddatli to'lovga sotib olish imkoniyati.",
    image: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?q=80&w=1974&auto=format&fit=crop',
    category: 'Aksiya',
    categoryColor: 'bg-emerald-500 text-black',
    featured: false,
  },
  {
    id: 3,
    date: '20.01.2026',
    title: 'Chevrolet Tahoe 2026: kuchli V8 va yangi Premium paket',
    excerpt:
      "Tahoe-ning yangi avlodi 5.3L V8 dvigatel va yangilangan multimedia tizimi bilan yetib keldi.",
    image: 'https://images.unsplash.com/photo-1617788138017-80ad40651399?q=80&w=2070&auto=format&fit=crop',
    category: "Yangilik",
    categoryColor: 'bg-blue-500 text-white',
    featured: false,
  },
  {
    id: 4,
    date: '10.01.2026',
    title: 'Trade-In xizmati: eski avtomobilingizni yangisiga almashtiring',
    excerpt:
      "Har qanday markadagi avtomobilingizni bozor narxida qabul qilamiz va yangi Chevrolet xarid qilishingizga yordam beramiz.",
    image: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?q=80&w=2070&auto=format&fit=crop',
    category: 'Xizmat',
    categoryColor: 'bg-purple-500 text-white',
    featured: false,
  },
]

export default function NewsSection() {
  const [featured, ...rest] = news

  return (
    <section id="news" className="bg-zinc-950 py-24 text-white">
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
          <button className="flex items-center gap-2 text-sm text-gray-400 hover:text-yellow-500 transition-colors font-medium uppercase tracking-wider group self-start md:self-auto">
            Barchasi
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>

        {/* Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">

          {/* Featured card — takes 3/5 */}
          <motion.article
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-3 group cursor-pointer bg-zinc-900 rounded-2xl overflow-hidden border border-zinc-800 hover:border-yellow-500/40 transition-colors duration-300 flex flex-col"
          >
            <div className="relative h-64 md:h-80 w-full overflow-hidden flex-shrink-0">
              <Image
                src={featured.image}
                alt={featured.title}
                fill
                sizes="(max-width: 768px) 100vw, 60vw"
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/90 via-black/20 to-transparent" />
              <span className={`absolute top-4 left-4 text-xs font-bold uppercase px-3 py-1 rounded-full tracking-widest shadow ${featured.categoryColor}`}>
                {featured.category}
              </span>
            </div>
            <div className="p-6 flex flex-col flex-1">
              <div className="flex items-center gap-2 text-xs text-gray-500 mb-3">
                <Calendar size={12} />
                {featured.date}
              </div>
              <h3 className="text-xl font-bold text-white mb-3 group-hover:text-yellow-500 transition-colors leading-snug">
                {featured.title}
              </h3>
              <p className="text-sm text-gray-400 leading-relaxed flex-1 line-clamp-3">
                {featured.excerpt}
              </p>
              <div className="flex items-center gap-1 mt-5 text-yellow-500 text-sm font-semibold">
                Batafsil <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </motion.article>

          {/* Right column — 3 small cards stacked */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            {rest.map((item, i) => (
              <motion.article
                key={item.id}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group cursor-pointer bg-zinc-900 rounded-xl overflow-hidden border border-zinc-800 hover:border-yellow-500/40 transition-colors duration-300 flex gap-0 flex-1"
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
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent to-zinc-900/20" />
                </div>

                {/* Text */}
                <div className="p-4 flex flex-col justify-between flex-1 min-w-0">
                  <div>
                    <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full tracking-widest inline-block mb-2 ${item.categoryColor}`}>
                      {item.category}
                    </span>
                    <h4 className="text-sm font-semibold text-white group-hover:text-yellow-500 transition-colors leading-snug line-clamp-2">
                      {item.title}
                    </h4>
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center gap-1.5 text-xs text-gray-500">
                      <Calendar size={11} />
                      {item.date}
                    </div>
                    <ArrowRight size={14} className="text-gray-600 group-hover:text-yellow-500 group-hover:translate-x-0.5 transition-all" />
                  </div>
                </div>
              </motion.article>
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}
