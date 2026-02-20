
'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react'

const slides = [
  {
    id: 1,
    image: '/cars/tracker/tracker-uz.webp',
    title: 'CHEVROLET TRACKER',
    subtitle: "Dadil dizayn. Aqlli texnologiyalar. Yo'lda ishonch.",
    buttonText: "Batafsil ma'lumot",
    href: '/models/tracker',
  },
  {
    id: 2,
    image: '/cars/tahoe-rst/car-gallery.webp',
    title: 'CHEVROLET TAHOE RST',
    subtitle: "Yanada jasur. Yanada mukammal. Yanada funksional.",
    buttonText: 'Batafsil',
    href: '/models/tahoe-rst',
  },
  {
    id: 3,
    image: '/cars/captiva/ex-1.jpg',
    title: 'CHEVROLET CAPTIVA',
    subtitle: "Kenglik, ishonch va texnologiya — oilaviy SUV",
    buttonText: "Ko'proq bilish",
    href: '/models/captiva',
  },
  {
    id: 4,
    image: '/cars/traverse/2 (1).jpg',
    title: 'CHEVROLET TRAVERSE',
    subtitle: "Oilangizning to'laqonli a'zosi",
    buttonText: "Batafsil",
    href: '/models/traverse',
  },
  {
    id: 5,
    image: '/cars/tahoe-hc/main.jpg',
    title: 'CHEVROLET TAHOE HC',
    subtitle: "Premium klassdagi haqiqiy hashamat",
    buttonText: "Ko'rish",
    href: '/models/tahoe-hc',
  },
]

const sliderVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 1000 : -1000,
    opacity: 0,
    zIndex: 0
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1
  },
  exit: (direction: number) => ({
    zIndex: 0,
    x: direction < 0 ? 1000 : -1000,
    opacity: 0
  })
}

export default function Hero() {
  const [[page, direction], setPage] = useState([0, 0])

  const imageIndex = Math.abs(page % slides.length)

  useEffect(() => {
    const timer = setInterval(() => {
      setPage([page + 1, 1])
    }, 5000)
    return () => clearInterval(timer)
  }, [page])

  const paginate = (newDirection: number) => {
    setPage([page + newDirection, newDirection])
  }

  return (
    <section className="relative h-[calc(100vh-80px)] w-full overflow-hidden bg-black text-white">
      {/* Carousel Slides */}
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={page}
          custom={direction}
          variants={sliderVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 }
          }}
          className="absolute inset-0 w-full h-full"
        >
          {/* Background Image */}
          <div className="relative h-full w-full">
            <Image
              src={slides[imageIndex].image}
              alt={slides[imageIndex].title}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent" />
          </div>

          {/* Text Content */}
          <div className="absolute inset-0 container mx-auto px-6 md:px-16 flex flex-col justify-center items-center md:items-start h-full z-10 pointer-events-none">
            <div className="max-w-xl text-center md:text-left md:ml-12 pointer-events-auto">
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-xs text-yellow-500 uppercase tracking-[0.4em] font-semibold mb-3"
              >
                Rasmiy diller
              </motion.p>
              <h1 className="text-4xl md:text-7xl font-bold uppercase tracking-tight mb-3 text-white drop-shadow-lg">
                {slides[imageIndex].title}
              </h1>
              <p className="text-base md:text-lg text-gray-300 mb-8 font-light drop-shadow-md">
                {slides[imageIndex].subtitle}
              </p>

              <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                <Link
                  href={slides[imageIndex].href}
                  className="bg-yellow-500 hover:bg-yellow-400 text-black px-6 md:px-8 py-3 md:py-3.5 rounded-lg font-bold uppercase text-sm flex items-center gap-2 transition-colors tracking-wider"
                >
                  {slides[imageIndex].buttonText} <ArrowRight size={18} />
                </Link>
                <Link
                  href="/models"
                  className="border border-white/30 hover:border-yellow-500 hover:text-yellow-500 text-white px-6 md:px-8 py-3 md:py-3.5 rounded-lg font-semibold uppercase text-sm flex items-center gap-2 transition-all backdrop-blur-sm tracking-wider"
                >
                  Barcha modellar
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Arrows */}
      <div className="absolute inset-0 flex items-center justify-between px-2 md:px-4 pointer-events-none z-20">
        <button
          onClick={() => paginate(-1)}
          className="p-2 md:p-3 bg-black/30 hover:bg-yellow-500 hover:text-black rounded-full backdrop-blur-sm transition-all text-white border border-white/20 pointer-events-auto hover:scale-110 active:scale-95"
        >
          <ChevronLeft size={18} className="md:hidden" />
          <ChevronLeft size={24} className="hidden md:block" />
        </button>

        <button
          onClick={() => paginate(1)}
          className="p-2 md:p-3 bg-black/30 hover:bg-yellow-500 hover:text-black rounded-full backdrop-blur-sm transition-all text-white border border-white/20 pointer-events-auto hover:scale-110 active:scale-95"
        >
          <ChevronRight size={18} className="md:hidden" />
          <ChevronRight size={24} className="hidden md:block" />
        </button>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-30">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setPage([index, index > imageIndex ? 1 : -1])}
            className={`transition-all rounded-full ${
              index === imageIndex
                ? 'w-8 h-2.5 bg-yellow-500'
                : 'w-2.5 h-2.5 bg-white/40 hover:bg-white/70'
            }`}
          />
        ))}
      </div>
    </section>
  )
}
