
'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import LangLink from '@/components/LangLink'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react'
import { carsData } from '@/data/carsData'
import { useDictionary } from '@/components/DictionaryProvider'

function CarSlider({ images, labels }: { images: string[], labels: { prev: string, next: string, image: string } }) {
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
    <div className="relative w-full h-full overflow-hidden bg-zinc-100 dark:bg-zinc-900 rounded-l-2xl">
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
            alt={`${labels.image} ${current + 1}`}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-transparent" />
        </motion.div>
      </AnimatePresence>

      {/* Arrows */}
      <button
        onClick={() => go(-1)}
        aria-label={labels.prev}
        className="absolute left-3 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-black/50 hover:bg-yellow-500 text-white hover:text-black flex items-center justify-center transition-all duration-200"
      >
        <ChevronLeft size={20} />
      </button>
      <button
        onClick={() => go(1)}
        aria-label={labels.next}
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
            aria-label={`${labels.image} ${i + 1}`}
            className={`h-1.5 rounded-full transition-all duration-300 ${i === current ? 'w-6 bg-yellow-500' : 'w-1.5 bg-white/50'}`}
          />
        ))}
      </div>
    </div>
  )
}

export default function CarShowcase() {
  const dict = useDictionary() as any
  const t = dict.models
  const cd = dict.car_detail
  const comm = dict.common

  const sliderLabels = {
    prev: comm.prev_image || 'Oldingi rasm',
    next: comm.next_image || 'Keyingi rasm',
    image: comm.image || 'Rasm'
  }

  const featuredCars = carsData.filter(car => car.featured)

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  }

  const itemVariants: any = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' }
    }
  }

  return (
    <section id="models" className="py-24 bg-zinc-50 dark:bg-zinc-950 text-zinc-950 dark:text-white">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-14 text-center"
        >
          <h2 className="text-4xl md:text-5xl font-bold uppercase tracking-tighter mb-4">
            {t.section_title_1} <span className="text-yellow-500">{t.section_title_2}</span>
          </h2>
          <p className="text-zinc-600 dark:text-gray-400 max-w-2xl mx-auto">
            {t.section_subtitle}
          </p>
        </motion.div>

        {/* Car Cards */}
        <motion.div 
          className="flex flex-col gap-10"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {featuredCars.map((car) => {
              const carDict = dict.cars?.[car.id] || {}
              const carSubtitle = carDict.subtitle || car.subtitle
              const carBadge = carDict.badge || car.badge
              const carSpecs = {
                ...car.specs,
                power: carDict.specs?.power || car.specs.power,
                seats: carDict.specs?.seats || car.specs.seats,
              }

              return (
                <motion.div
                  key={car.id}
                  variants={itemVariants}
                  className="group relative grid grid-cols-1 md:grid-cols-2 bg-white dark:bg-zinc-900 rounded-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800 hover:border-yellow-500/50 transition-all duration-500 shadow-xl shadow-black/5"
                >
                  {/* LEFT — Image Slider */}
                  <div className="relative h-72 md:h-auto">
                    <CarSlider images={car.images} labels={sliderLabels} />
                    {carBadge && (
                      <span className={`absolute top-4 left-4 z-20 text-xs font-bold uppercase px-3 py-1 rounded-full tracking-widest ${car.badgeColor || 'bg-yellow-500 text-black'}`}>
                        {carBadge}
                      </span>
                    )}
                  </div>

                  {/* RIGHT — Content */}
                  <div className="p-8 md:p-12 flex flex-col justify-center">
                    <div className="mb-6">
                      <p className="text-yellow-500 text-sm font-bold uppercase tracking-widest mb-2">
                        {carSubtitle}
                      </p>
                      <h3 className="text-3xl md:text-4xl font-black text-zinc-900 dark:text-white uppercase tracking-tighter">
                        {car.name}
                      </h3>
                    </div>

                    <div className="grid grid-cols-2 gap-6 mb-8">
                      <div className="space-y-1">
                        <p className="text-[10px] uppercase tracking-widest text-zinc-400 font-bold">{cd.engine}</p>
                        <p className="text-sm font-bold text-zinc-900 dark:text-zinc-100 uppercase">{carSpecs.engine}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-[10px] uppercase tracking-widest text-zinc-400 font-bold">{cd.power}</p>
                        <p className="text-sm font-bold text-zinc-900 dark:text-zinc-100 uppercase">{carSpecs.power}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-[10px] uppercase tracking-widest text-zinc-400 font-bold">{cd.transmission}</p>
                        <p className="text-sm font-bold text-zinc-900 dark:text-zinc-100 uppercase">{carSpecs.transmission}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-[10px] uppercase tracking-widest text-zinc-400 font-bold">{dict.car_detail.seats || 'Seats'}</p>
                        <p className="text-sm font-bold text-zinc-900 dark:text-zinc-100 uppercase">{carSpecs.seats}</p>
                      </div>
                    </div>
                    {/* Price */}
                    <div className="mb-6">
                      {car.oldPrice && (
                        <p className="text-sm text-gray-500 line-through">{car.oldPrice} {t.currency}</p>
                      )}
                      <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">{t.price_from}</p>
                      <p className="text-2xl font-bold text-zinc-950 dark:text-white">
                        {car.price}{' '}
                        <span className="text-base font-normal text-zinc-500 dark:text-gray-400">{t.currency}</span>
                      </p>
                    </div>

                    {/* Features list */}
                    <ul className="space-y-2 mb-6">
                      {[
                        `${cd.monthly} — ${car.monthlyPayment} ${cd.monthly_suffix}`,
                        `${cd.engine}: ${car.specs.engine}`,
                        `${cd.power}: ${car.specs.power}`,
                        `${cd.transmission}: ${car.specs.transmission}`,
                      ].map((f, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-zinc-700 dark:text-gray-300">
                          <span className="mt-1 w-2 h-2 rounded-full bg-yellow-500 flex-shrink-0" />
                          {f}
                        </li>
                      ))}
                    </ul>

                    {/* Divider */}
                    <div className="border-t border-zinc-200 dark:border-zinc-800 mb-5" />

                    {/* Description */}
                    <p className="text-sm text-zinc-600 dark:text-gray-400 leading-relaxed line-clamp-3">
                      {carDict.description || car.description}
                    </p>

                    {/* Buttons */}
                    <div className="flex flex-wrap gap-3 mt-8">
                      <LangLink
                        href={`/models/${car.id}`}
                        className="flex items-center gap-2 bg-yellow-500 hover:bg-yellow-400 text-black font-bold uppercase text-sm px-10 py-3.5 rounded-lg transition-colors duration-200"
                      >
                        {t.details} <ArrowRight size={16} />
                      </LangLink>
                    </div>
                  </div>
                </motion.div>
              )
            })}
        </motion.div>

        {/* All Models Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 flex justify-center"
        >
          <LangLink
            href="/models"
            className="flex items-center gap-3 border border-yellow-500/60 hover:border-yellow-500 hover:bg-yellow-500 hover:text-black text-zinc-950 dark:text-white font-bold uppercase text-sm px-10 py-4 rounded-lg transition-all duration-300 tracking-widest group"
          >
            {t.all_models}
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform duration-200" />
          </LangLink>
        </motion.div>

      </div>
    </section>
  )
}
