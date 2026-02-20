
'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, ArrowRight, Fuel, Settings2, Gauge } from 'lucide-react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { carsData } from '@/data/carsData'

type FilterCategory = 'Barchasi' | 'SUV' | 'Sedan' | 'LCV'

const categories: { id: FilterCategory; label: string }[] = [
  { id: 'Barchasi', label: 'Barchasi' },
  { id: 'SUV', label: 'SUV / Crossover' },
  { id: 'Sedan', label: 'Sedan' },
  { id: 'LCV', label: 'LCV / Pickup' },
]

export default function ModelsPage() {
  const [active, setActive] = useState<FilterCategory>('Barchasi')

  const filtered = active === 'Barchasi'
    ? carsData
    : carsData.filter(car => car.category === active)

  const countFor = (cat: FilterCategory) =>
    cat === 'Barchasi' ? carsData.length : carsData.filter(c => c.category === active).length

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-950 dark:text-white">
      <Navbar />

      {/* Hero Header */}
      <div className="relative bg-white dark:bg-zinc-950 border-b border-zinc-200 dark:border-zinc-800 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-yellow-500/10 via-transparent to-transparent pointer-events-none" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-yellow-500/40 to-transparent" />

        <div className="container mx-auto px-6 py-10">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-yellow-500 transition-colors mb-5 group"
          >
            <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
            Bosh sahifa
          </Link>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <p className="text-xs text-yellow-500 uppercase tracking-[0.3em] font-semibold mb-2">
                Rasmiy diller katalogi
              </p>
              <h1 className="text-4xl md:text-6xl font-bold uppercase tracking-tighter">
                Barcha <span className="text-yellow-500">Modellar</span>
              </h1>
              <p className="text-zinc-600 dark:text-gray-400 text-sm mt-3">
                {carsData.length} ta model — Farg&apos;ona Chevrolet rasmiy assortimenti
              </p>
            </div>
            <div className="flex gap-6 text-center shrink-0">
              {[{ v: '6', l: 'SUV model' }, { v: '3', l: 'Sedan' }, { v: '2', l: 'LCV/Pickup' }].map(s => (
                <div key={s.l}>
                  <p className="text-2xl font-bold text-yellow-500">{s.v}</p>
                  <p className="text-xs text-zinc-500 dark:text-gray-500 uppercase tracking-wider">{s.l}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-10">
        {/* Filter tabs */}
        <div className="flex flex-wrap gap-2 mb-10">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActive(cat.id)}
              className={`px-5 py-2.5 rounded-full text-sm font-semibold uppercase tracking-wider transition-all duration-200 ${
                active === cat.id
                  ? 'bg-yellow-500 text-black shadow-lg shadow-yellow-500/25'
                  : 'bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-gray-400 hover:text-zinc-950 dark:hover:text-white hover:border-zinc-400 dark:hover:border-zinc-600'
              }`}
            >
              {cat.label}
              <span className={`ml-2 text-xs rounded-full px-1.5 py-0.5 ${active === cat.id ? 'bg-black/20 text-black' : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-gray-500'}`}>
                {cat.id === 'Barchasi' ? carsData.length : carsData.filter(c => c.category === cat.id).length}
              </span>
            </button>
          ))}
        </div>

        {/* Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6"
          >
            {filtered.map((car, i) => (
              <motion.div
                key={car.id}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="bg-white dark:bg-zinc-900 rounded-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800 hover:border-yellow-500/50 transition-all duration-300 group flex flex-col shadow-lg dark:shadow-black/30"
              >
                {/* Image */}
                <div className="relative h-52 overflow-hidden">
                  <Image
                    src={car.images[0]}
                    alt={car.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-white/10 dark:from-zinc-900 via-transparent to-transparent" />
                  {car.badge && (
                    <span className={`absolute top-3 left-3 text-[10px] font-bold uppercase px-2.5 py-1 rounded-full tracking-widest shadow-md ${car.badgeColor}`}>
                      {car.badge}
                    </span>
                  )}
                  <span className="absolute top-3 right-3 text-[10px] text-gray-400 bg-black/40 backdrop-blur-sm border border-white/10 px-2 py-0.5 rounded-full uppercase tracking-widest">
                    {car.category}
                  </span>
                </div>

                {/* Info */}
                <div className="p-5 flex flex-col flex-1">
                  <div className="mb-3">
                    <h3 className="text-base font-bold text-zinc-950 dark:text-white group-hover:text-yellow-500 transition-colors mb-0.5 leading-tight">
                      {car.name}
                    </h3>
                    <p className="text-xs text-zinc-500 dark:text-gray-500">{car.subtitle}</p>
                  </div>

                  {/* Specs row */}
                  <div className="flex gap-3 mb-4 pb-4 border-b border-zinc-200 dark:border-zinc-800 flex-wrap">
                    <div className="flex items-center gap-1.5 text-xs text-zinc-500 dark:text-gray-400">
                      <Fuel size={12} className="text-yellow-500 shrink-0" />
                      {car.specs.engine}
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-zinc-500 dark:text-gray-400">
                      <Gauge size={12} className="text-yellow-500 shrink-0" />
                      {car.specs.power}
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-zinc-500 dark:text-gray-400">
                      <Settings2 size={12} className="text-yellow-500 shrink-0" />
                      {car.specs.transmission}
                    </div>
                  </div>

                  {/* Price + Button */}
                  <div className="mt-auto flex items-center justify-between gap-3">
                    <div>
                      <p className="text-[10px] text-zinc-500 dark:text-gray-500 uppercase tracking-wider leading-none mb-1">
                        Narxidan boshlab
                      </p>
                      <p className="text-base font-bold text-zinc-950 dark:text-white leading-none">
                        {car.price}
                        <span className="text-xs font-normal text-zinc-500 dark:text-gray-400 ml-1">so&apos;m</span>
                      </p>
                    </div>
                    <Link
                      href={`/models/${car.id}`}
                      className="shrink-0 flex items-center gap-1.5 bg-transparent border border-zinc-300 dark:border-zinc-700 group-hover:border-yellow-500 group-hover:bg-yellow-500 group-hover:text-black text-zinc-950 dark:text-white text-xs font-bold uppercase tracking-wider px-4 py-2.5 rounded-lg transition-all duration-300"
                    >
                      Batafsil
                      <ArrowRight size={12} />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      <Footer />
    </div>
  )
}
