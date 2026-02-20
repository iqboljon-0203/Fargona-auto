
'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react'
import { carsData } from '@/data/carsData'

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

  const featuredCars = carsData.filter(car => car.featured)

  return (
    <section id="models" className="py-24 bg-zinc-950 text-white">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-14 text-center"
        >
          <h2 className="text-4xl md:text-5xl font-bold uppercase tracking-tighter mb-4">
            Mashhur <span className="text-yellow-500">Modellar</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Eng ko&apos;p so&apos;ralgan va ommabop Chevrolet modellari — tanlang va haydang.
          </p>
        </motion.div>

        {/* Car Cards */}
        <div className="flex flex-col gap-10">
          <AnimatePresence mode="wait">
            {featuredCars.map((car, index) => (
              <motion.div
                key={car.id}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: index * 0.05 }}
                className="grid grid-cols-1 md:grid-cols-2 rounded-2xl overflow-hidden border border-zinc-800 hover:border-yellow-500/30 transition-colors duration-300 shadow-xl shadow-black/40 min-h-[340px]"
              >
                {/* LEFT — Image Slider */}
                <div className="relative h-72 md:h-auto">
                  <CarSlider images={car.images} />
                  {car.badge && (
                    <span className={`absolute top-4 left-4 z-20 text-xs font-bold uppercase px-3 py-1 rounded-full tracking-widest ${car.badgeColor || 'bg-yellow-500 text-black'}`}>
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
                      {car.oldPrice && (
                        <p className="text-sm text-gray-500 line-through">{car.oldPrice} so&apos;m</p>
                      )}
                      <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Narxidan boshlab</p>
                      <p className="text-2xl font-bold text-white">
                        {car.price}{' '}
                        <span className="text-base font-normal text-gray-400">so&apos;m</span>
                      </p>
                    </div>

                    {/* Features list */}
                    <ul className="space-y-2 mb-6">
                      {[
                        `Oylik to'lov — ${car.monthlyPayment} so'mdan`,
                        `Dvigatel: ${car.specs.engine}`,
                        `Quvvat: ${car.specs.power}`,
                        `Uzatmalar: ${car.specs.transmission}`,
                      ].map((f, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-gray-300">
                          <span className="mt-1 w-2 h-2 rounded-full bg-yellow-500 flex-shrink-0" />
                          {f}
                        </li>
                      ))}
                    </ul>

                    {/* Divider */}
                    <div className="border-t border-zinc-800 mb-5" />

                    {/* Description */}
                    <p className="text-sm text-gray-400 leading-relaxed line-clamp-3">{car.description}</p>
                  </div>

                  {/* Buttons */}
                  <div className="flex flex-wrap gap-3 mt-6">
                    <Link
                      href={`/models/${car.id}`}
                      className="flex items-center gap-2 bg-yellow-500 hover:bg-yellow-400 text-black font-bold uppercase text-sm px-6 py-3 rounded-lg transition-colors duration-200"
                    >
                      Batafsil <ArrowRight size={16} />
                    </Link>
                    <Link
                      href={`/models/${car.id}#specs`}
                      className="flex items-center gap-2 border border-zinc-700 hover:border-yellow-500 text-white font-semibold uppercase text-sm px-6 py-3 rounded-lg transition-colors duration-200"
                    >
                      Narxlar ro&apos;yxati
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
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
