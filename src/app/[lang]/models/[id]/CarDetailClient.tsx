
'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import LangLink from '@/components/LangLink'
import { motion } from 'framer-motion'
import {
  ArrowLeft, ArrowRight, ChevronLeft, ChevronRight,
  Fuel, Gauge, Settings2, Package, Users, Star,
  Phone, Send, Shield, CheckCircle2,
} from 'lucide-react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { Car, carsData } from '@/data/carsData'

import { useDictionary } from '@/components/DictionaryProvider'

export default function CarDetailClient({ car }: { car: Car }) {
  const dict = useDictionary() as any
  const t = dict.car_detail
  const m = dict.models
  const comm = dict.common

  const carDict = dict.cars?.[car.id] || {}
  const carSubtitle = carDict.subtitle || car.subtitle
  const carTagline = carDict.tagline || car.tagline
  const carDescription = carDict.description || car.description
  const carBadge = carDict.badge || car.badge

  const [activeImage, setActiveImage] = useState(0)
  const [activeColor, setActiveColor] = useState(0)
  const [showColorImage, setShowColorImage] = useState(false)

  const carColors = car.colors.map(c => ({
    ...c,
    name: carDict.colors?.[c.name] || c.name
  }))

  const currentColorImage = carColors[activeColor]?.image

  const nextImage = () => { setShowColorImage(false); setActiveImage(i => (i + 1) % car.images.length) }
  const prevImage = () => { setShowColorImage(false); setActiveImage(i => (i - 1 + car.images.length) % car.images.length) }

  const handleColorSelect = (i: number) => {
    setActiveColor(i)
    if (carColors[i]?.image) {
      setShowColorImage(true)
    }
  }

  const carFeatures = car.features.map(f => {
    const fDict = carDict.features?.[f.title]
    return {
      ...f,
      title: fDict?.title || f.title,
      description: fDict?.description || f.description
    }
  })

  const specItems = [
    { icon: Fuel,      label: t.engine,         value: carDict.specs?.engine || car.specs.engine },
    { icon: Gauge,     label: t.power,            value: carDict.specs?.power || car.specs.power },
    { icon: Settings2, label: t.transmission,  value: carDict.specs?.transmission || car.specs.transmission },
    { icon: Fuel,      label: t.fuel_consumption,    value: carDict.specs?.fuel || car.specs.fuel },
    { icon: Package,   label: t.trunk_volume,       value: carDict.specs?.trunkVolume || car.specs.trunkVolume },
    { icon: Users,     label: t.seats,       value: carDict.specs?.seats || car.specs.seats },
  ]

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-950 dark:text-white">
      <Navbar />

      {/* Breadcrumb */}
      <div className="bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800">
        <div className="container mx-auto px-6 py-4 flex items-center gap-2 text-sm text-zinc-500 dark:text-gray-500">
          <LangLink href="/" className="hover:text-yellow-500 transition-colors">{m.back}</LangLink>
          <ChevronRight size={14} />
          <LangLink href="/models" className="hover:text-yellow-500 transition-colors">{m.page_title_2}</LangLink>
          <ChevronRight size={14} />
          <span className="text-zinc-950 dark:text-white">{car.name}</span>
        </div>
      </div>

      {/* Hero — Image + Price panel */}
      <section className="bg-zinc-50 dark:bg-zinc-950">
        <div className="container mx-auto px-6 py-10">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 items-start">

            {/* LEFT — Image slider */}
            <div className="lg:col-span-3">
              <div className="flex items-center justify-between mb-4">
                <LangLink
                  href="/models"
                  className="flex items-center gap-2 text-sm text-zinc-600 dark:text-gray-400 hover:text-yellow-500 transition-colors group"
                >
                  <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
                  {t.back}
                </LangLink>
                {carBadge && (
                  <span className={`text-xs font-bold uppercase px-3 py-1 rounded-full tracking-widest ${car.badgeColor}`}>
                    {carBadge}
                  </span>
                )}
              </div>

              {/* Main image */}
              <div className="relative rounded-2xl overflow-hidden bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 aspect-[16/9]">
                {showColorImage && currentColorImage ? (
                  <motion.div
                    key={`color-${activeColor}`}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4 }}
                    className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900"
                  >
                    <Image
                      src={currentColorImage}
                      alt={`${car.name} — ${car.colors[activeColor].name}`}
                      fill
                      className="object-contain p-4"
                      priority
                    />
                    <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-sm rounded-lg px-3 py-1.5">
                      <span className="text-xs text-gray-400">{t.color}: </span>
                      <span className="text-sm font-semibold text-white">{car.colors[activeColor].name}</span>
                    </div>
                  </motion.div>
                ) : (
                  <Image
                    key={activeImage}
                    src={car.images[activeImage]}
                    alt={car.name}
                    fill
                    className="object-cover"
                    priority
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent pointer-events-none" />

                <button
                  onClick={prevImage}
                  aria-label={t.prev_image}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 hover:bg-yellow-500 hover:text-black flex items-center justify-center transition-all z-10"
                >
                  <ChevronLeft size={20} />
                </button>
                <button
                  onClick={nextImage}
                  aria-label={t.next_image}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 hover:bg-yellow-500 hover:text-black flex items-center justify-center transition-all z-10"
                >
                  <ChevronRight size={20} />
                </button>

                {!showColorImage && (
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                    {car.images.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setActiveImage(i)}
                        aria-label={`${t.image} ${i + 1}`}
                        className={`transition-all rounded-full ${i === activeImage ? 'w-6 h-2 bg-yellow-500' : 'w-2 h-2 bg-white/40 hover:bg-white/70'}`}
                      />
                    ))}
                  </div>
                )}
              </div>

              {/* Thumbnails */}
              <div className="flex gap-3 mt-3">
                {car.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImage(i)}
                    aria-label={`${i + 1}-${t.select_image}`}
                    className={`relative flex-1 aspect-video rounded-xl overflow-hidden border-2 transition-all ${i === activeImage ? 'border-yellow-500' : 'border-zinc-200 dark:border-zinc-800 hover:border-zinc-400 dark:hover:border-zinc-600'}`}
                  >
                    <Image src={img} alt={`${car.name} ${t.image} ${i + 1}`} fill className="object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* RIGHT — Info panel */}
            <div className="lg:col-span-2 flex flex-col gap-5 lg:sticky lg:top-24">
              <div>
                <p className="text-xs text-yellow-500 uppercase tracking-widest font-semibold mb-1">{carSubtitle}</p>
                <h1 className="text-3xl md:text-4xl font-bold text-zinc-950 dark:text-white uppercase tracking-tight leading-tight">
                  {car.name}
                </h1>
                <p className="text-zinc-600 dark:text-gray-400 text-sm mt-2 italic">&ldquo;{carTagline}&rdquo;</p>
              </div>

              {/* Price */}
              <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-5 shadow-sm dark:shadow-none">
                {car.oldPrice && (
                  <p className="text-sm text-zinc-500 dark:text-gray-500 line-through mb-0.5">{car.oldPrice} {m.currency}</p>
                )}
                <p className="text-xs text-zinc-500 dark:text-gray-500 uppercase tracking-wider mb-1">{m.price_from}</p>
                <p className="text-3xl font-bold text-zinc-950 dark:text-white mb-1">
                  {car.price} <span className="text-base font-normal text-zinc-500 dark:text-gray-400">{m.currency}</span>
                </p>
                <p className="text-sm text-yellow-500">
                  {t.monthly} <strong>{car.monthlyPayment}</strong> {t.monthly_suffix}
                </p>
              </div>

              {/* Color picker */}
              <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-5 shadow-sm dark:shadow-none">
                <p className="text-xs text-zinc-500 dark:text-gray-500 uppercase tracking-wider mb-3">
                  {t.color}: <span className="text-zinc-950 dark:text-white font-semibold">{car.colors[activeColor].name}</span>
                </p>
                <div className="flex gap-3 flex-wrap">
                  {car.colors.map((c, i) => (
                    <button
                      key={i}
                      onClick={() => handleColorSelect(i)}
                      title={c.name}
                      style={{ backgroundColor: c.hex }}
                      className={`w-8 h-8 rounded-full border-2 transition-all ${
                        i === activeColor
                          ? 'border-yellow-500 scale-110 ring-2 ring-yellow-500/30'
                          : 'border-zinc-300 dark:border-zinc-700 hover:border-zinc-400'
                      }`}
                    />
                  ))}
                </div>
                <p className="text-xs text-zinc-500 dark:text-gray-600 mt-2">{t.color_note}</p>
              </div>

              {/* Safety */}
              <div className="flex items-center gap-2">
                <Shield size={16} className="text-yellow-500" />
                <span className="text-xs text-zinc-500 dark:text-gray-400 uppercase tracking-wider">{t.safety}:</span>
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={14}
                      fill={i < car.safetyRating ? '#EAB308' : 'none'}
                      className={i < car.safetyRating ? 'text-yellow-500' : 'text-zinc-300 dark:text-zinc-700'}
                    />
                  ))}
                </div>
              </div>

              {/* CTA */}
              <div className="flex flex-col gap-3">
                <a
                  href="tel:+998954002087"
                  className="flex items-center justify-center gap-2 bg-yellow-500 hover:bg-yellow-400 text-black font-bold uppercase tracking-widest py-3.5 rounded-xl transition-colors text-sm"
                >
                  <Phone size={16} />
                  {t.order}
                </a>
                <LangLink
                  href="/#contact"
                  className="flex items-center justify-center gap-2 border border-zinc-300 dark:border-zinc-700 hover:border-yellow-500 text-zinc-950 dark:text-white font-semibold uppercase tracking-wider py-3.5 rounded-xl transition-colors text-sm"
                >
                  <Send size={16} />
                  {t.send_request}
                </LangLink>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Specs */}
      <section id="specs" className="bg-white dark:bg-zinc-900 border-y border-zinc-200 dark:border-zinc-800 py-14">
        <div className="container mx-auto px-6">
          <h2 className="text-2xl font-bold uppercase tracking-tighter mb-8">
            {t.specs_title_1} <span className="text-yellow-500">{t.specs_title_2}</span>
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {specItems.map(({ icon: Icon, label, value }, i) => (
              <div
                key={`${label}-${i}`}
                className="bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl p-4 text-center flex flex-col items-center gap-2 hover:border-yellow-500/40 transition-colors"
              >
                <div className="w-10 h-10 rounded-lg bg-yellow-500/10 flex items-center justify-center">
                  <Icon size={18} className="text-yellow-500" />
                </div>
                <p className="text-base font-bold text-zinc-950 dark:text-white leading-tight">{value}</p>
                <p className="text-[10px] text-zinc-500 dark:text-gray-500 uppercase tracking-wider">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Description + Features */}
      <section className="bg-zinc-50 dark:bg-zinc-950 py-16">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14">

            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <h2 className="text-2xl font-bold uppercase tracking-tighter mb-5">
                {t.about_title_1} <span className="text-yellow-500">{t.about_title_2}</span>
              </h2>
              <p className="text-zinc-600 dark:text-gray-400 leading-relaxed text-sm">{carDescription}</p>
              <div className="mt-8 space-y-3">
                {(t.benefits || []).map((item: string, i: number) => (
                  <div key={i} className="flex items-center gap-3">
                    <CheckCircle2 size={16} className="text-yellow-500 shrink-0" />
                    <span className="text-sm text-zinc-600 dark:text-gray-300">{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
              <h2 className="text-2xl font-bold uppercase tracking-tighter mb-5">
                {t.features_title_1} <span className="text-yellow-500">{t.features_title_2}</span>
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {carFeatures.map((f, i) => (
                  <div
                    key={`${f.title}-${i}`}
                    className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-yellow-500/40 transition-colors rounded-xl p-4 shadow-sm dark:shadow-none"
                  >
                    <div className="text-2xl mb-3">{f.icon}</div>
                    <p className="font-bold text-zinc-950 dark:text-white text-sm mb-1">{f.title}</p>
                    <p className="text-xs text-zinc-500 dark:text-gray-500 leading-relaxed">{f.description}</p>
                  </div>
                ))}
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Other models */}
      <section className="bg-white dark:bg-zinc-900 border-t border-zinc-200 dark:border-zinc-800 py-14">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold uppercase tracking-tighter">
              {t.other_models_1} <span className="text-yellow-500">{t.other_models_2}</span>
            </h2>
            <LangLink href="/models" className="flex items-center gap-1.5 text-sm text-zinc-500 dark:text-gray-400 hover:text-yellow-500 transition-colors group">
              {m.all} <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </LangLink>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {carsData.filter(c => c.id !== car.id).slice(0, 4).map(c => {
              const otherCarDict = dict.cars?.[c.id] || {}
              const otherCarName = otherCarDict.name || c.name
              return (
                <LangLink
                  key={c.id}
                  href={`/models/${c.id}`}
                  className="group bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 hover:border-yellow-500/40 rounded-xl overflow-hidden transition-colors"
                >
                  <div className="relative h-32 overflow-hidden">
                    <Image
                      src={c.images[0]}
                      alt={otherCarName}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-50 dark:from-zinc-950 to-transparent" />
                  </div>
                  <div className="p-3">
                    <p className="text-xs font-bold text-zinc-950 dark:text-white group-hover:text-yellow-500 transition-colors">{otherCarName}</p>
                    <p className="text-[10px] text-zinc-500 dark:text-gray-500 mt-0.5">{c.price} {m.currency}</p>
                  </div>
                </LangLink>
              )
            })}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
