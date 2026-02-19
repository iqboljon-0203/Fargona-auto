
'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react'

interface CarModel {
  id: string
  name: string
  subtitle: string
  price: string
  monthlyPayment: string
  description: string
  features: string[]
  images: string[]
  badge?: string
}

const carModels: CarModel[] = [
  {
    id: '1',
    name: 'Chevrolet Tracker',
    subtitle: '1.2L Turbo · 6AT · AWD',
    price: '215 951 360',
    monthlyPayment: '3 599 189',
    description:
      'Tracker — zamonaviy shahar krossoveri. Chiroyli dizayni, qulay salon va iqtisodiy yoqilg\'i sarfi bilan ajralib turadi. Yosh va faol haydovchilar uchun ideal tanlov.',
    features: [
      'Foizsiz muddatli to\'lov',
      'Oylik to\'lov — 3 599 189 so\'mdan',
      '5 yil yoki 100 000 km kafolat',
      'Trade-in imkoniyati',
    ],
    images: [
      'https://images.unsplash.com/photo-1627454819213-f77efe10a562?q=80&w=2070&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=2070&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1555215695-3004980ad54e?q=80&w=2070&auto=format&fit=crop',
    ],
    badge: 'Ommabop',
  },
  {
    id: '2',
    name: 'Chevrolet Captiva',
    subtitle: '1.5L Turbo · CVT · FWD',
    price: '284 900 000',
    monthlyPayment: '4 748 334',
    description:
      'Captiva — keng saloni va zamonaviy xususiyatlari bilan oilaviy sayohatlar uchun yaratilgan. Yuk sig\'imi, xavfsizlik tizimlari va qulaylik bilan murosa qilmagan model.',
    features: [
      'Foizsiz muddatli to\'lov',
      'Oylik to\'lov — 4 748 334 so\'mdan',
      '5 yil yoki 100 000 km kafolat',
      'Bepul texnik ko\'rik (1 yil)',
    ],
    images: [
      'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?q=80&w=1974&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=2070&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=2083&auto=format&fit=crop',
    ],
    badge: 'Yangi',
  },
  {
    id: '3',
    name: 'Chevrolet Equinox',
    subtitle: '2.0L Turbo · 9AT · AWD',
    price: '360 000 000',
    monthlyPayment: '6 000 000',
    description:
      'Equinox — kuchli dvigatel va to\'liq yuldosh navigatsiya tizimi bilan premium sinf tajribasini taqdim etadi. Har qanday yo\'lda ishonchli va qulay haydash uchun yaratilgan.',
    features: [
      'Foizsiz muddatli to\'lov',
      'Oylik to\'lov — 6 000 000 so\'mdan',
      '5 yil yoki 150 000 km kafolat',
      'Trade-in + bepul sug\'urta',
    ],
    images: [
      'https://images.unsplash.com/photo-1583121274602-3e2820c69888?q=80&w=2070&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?q=80&w=2070&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1580414057403-c5f451f30e1c?q=80&w=2070&auto=format&fit=crop',
    ],
  },
  {
    id: '4',
    name: 'Chevrolet Tahoe',
    subtitle: '5.3L V8 · 10AT · 4WD',
    price: '1 109 274 880',
    monthlyPayment: '18 487 915',
    description:
      'Tahoe — amerikalik kuch va hashamat timsoli. Kuchli V8 dvigateli, keng 7-8 o\'rindiqli saloni va premium texnologik jihozlanishi bilan lider o\'rnini saqlab kelmoqda.',
    features: [
      'Muddatli to\'lov imkoniyati',
      'Oylik to\'lov — 18 487 915 so\'mdan',
      '3 yil yoki 60 000 km kafolat',
      'VIP xizmat paketi',
    ],
    images: [
      'https://images.unsplash.com/photo-1617788138017-80ad40651399?q=80&w=2070&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?q=80&w=2071&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1561361058-c24cecae35ca?q=80&w=2070&auto=format&fit=crop',
    ],
    badge: 'Premium',
  },
]

function CarSlider({ images }: { images: string[] }) {
  const [current, setCurrent] = useState(0)
  const [direction, setDirection] = useState(0)

  const go = (dir: number) => {
    setDirection(dir)
    setCurrent((prev) => (prev + dir + images.length) % images.length)
  }

  const variants = {
    enter: (d: number) => ({ x: d > 0 ? '100%' : '-100%', opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (d: number) => ({ x: d < 0 ? '100%' : '-100%', opacity: 0 }),
  }

  return (
    <div className="relative w-full h-full overflow-hidden bg-zinc-900 rounded-l-2xl">
      <AnimatePresence custom={direction} initial={false}>
        <motion.div
          key={current}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.45, ease: 'easeInOut' }}
          className="absolute inset-0"
        >
          <Image
            src={images[current]}
            alt={`slide-${current}`}
            fill
            className="object-cover"
          />
          {/* subtle dark overlay at edges */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-transparent" />
        </motion.div>
      </AnimatePresence>

      {/* Arrows */}
      <button
        onClick={() => go(-1)}
        className="absolute left-3 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-black/50 hover:bg-yellow-500 text-white hover:text-black flex items-center justify-center transition-all duration-200"
      >
        <ChevronLeft size={20} />
      </button>
      <button
        onClick={() => go(1)}
        className="absolute right-3 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-black/50 hover:bg-yellow-500 text-white hover:text-black flex items-center justify-center transition-all duration-200"
      >
        <ChevronRight size={20} />
      </button>

      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => { setDirection(i > current ? 1 : -1); setCurrent(i) }}
            className={`h-1.5 rounded-full transition-all duration-300 ${i === current ? 'w-6 bg-yellow-500' : 'w-1.5 bg-white/50'}`}
          />
        ))}
      </div>
    </div>
  )
}

export default function CarShowcase() {
  return (
    <section id="models" className="py-24 bg-zinc-950 text-white">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <h2 className="text-4xl md:text-5xl font-bold uppercase tracking-tighter mb-4">
            Bizning <span className="text-yellow-500">Modellarimiz</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Hamyonbop shahar avtomobillaridan tortib, kuchli yo&apos;ldan tashqari modellargacha — barchasini o&apos;zingiz uchun kashf eting.
          </p>
        </motion.div>

        {/* Car Cards */}
        <div className="flex flex-col gap-10">
          {carModels.map((car, index) => (
            <motion.div
              key={car.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              className="grid grid-cols-1 md:grid-cols-2 rounded-2xl overflow-hidden border border-zinc-800 hover:border-yellow-500/30 transition-colors duration-300 shadow-xl shadow-black/40 min-h-[340px]"
            >
              {/* LEFT — Image Slider */}
              <div className="relative h-72 md:h-auto">
                <CarSlider images={car.images} />
                {car.badge && (
                  <span className="absolute top-4 left-4 z-20 bg-yellow-500 text-black text-xs font-bold uppercase px-3 py-1 rounded-full tracking-widest">
                    {car.badge}
                  </span>
                )}
              </div>

              {/* RIGHT — Details */}
              <div className="bg-zinc-900 p-8 flex flex-col justify-between">
                <div>
                  <h3 className="text-3xl font-bold text-white mb-1">{car.name}</h3>
                  <p className="text-sm text-gray-400 mb-5">{car.subtitle}</p>

                  {/* Price */}
                  <div className="mb-6">
                    <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Narxidan boshlab</p>
                    <p className="text-2xl font-bold text-white">
                      {car.price}{' '}
                      <span className="text-base font-normal text-gray-400">so&apos;m</span>
                    </p>
                  </div>

                  {/* Features list */}
                  <ul className="space-y-2 mb-6">
                    {car.features.map((f, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-gray-300">
                        <span className="mt-1 w-2 h-2 rounded-full bg-yellow-500 flex-shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>

                  {/* Divider */}
                  <div className="border-t border-zinc-800 mb-5" />

                  {/* Description */}
                  <p className="text-sm text-gray-400 leading-relaxed">{car.description}</p>
                </div>

                {/* Buttons */}
                <div className="flex flex-wrap gap-3 mt-6">
                  <button className="flex items-center gap-2 bg-yellow-500 hover:bg-yellow-400 text-black font-bold uppercase text-sm px-6 py-3 rounded-lg transition-colors duration-200">
                    Batafsil <ArrowRight size={16} />
                  </button>
                  <button className="flex items-center gap-2 border border-zinc-700 hover:border-yellow-500 text-white font-semibold uppercase text-sm px-6 py-3 rounded-lg transition-colors duration-200">
                    Narxlar ro&apos;yxati
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* All Models Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 flex justify-center"
        >
          <Link
            href="/models"
            className="flex items-center gap-3 border border-yellow-500/60 hover:border-yellow-500 hover:bg-yellow-500 hover:text-black text-white font-bold uppercase text-sm px-10 py-4 rounded-lg transition-all duration-300 tracking-widest group"
          >
            Barcha modellar
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform duration-200" />
          </Link>
        </motion.div>

      </div>
    </section>
  )
}
