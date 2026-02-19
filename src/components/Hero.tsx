
'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, ArrowRight, Phone } from 'lucide-react'

const slides = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1627454819213-f77efe10a562?q=80&w=2070&auto=format&fit=crop',
    title: 'CHEVROLET TRACKER',
    subtitle: "Zamonaviy va tejamkor",
    buttonText: 'Batafsil ma\'lumot',
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1617788138017-80ad40651399?q=80&w=2070&auto=format&fit=crop',
    title: 'CHEVROLET TAHOE',
    subtitle: "Kuch va hashamat uyg'unligi",
    buttonText: 'Sinov yurishi',
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?q=80&w=2070&auto=format&fit=crop',
    title: 'CHEVROLET EQUINOX',
    subtitle: "Har qanday yo'l uchun",
    buttonText: 'Aloqaga chiqing',
  }
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

  // We only have 3 slides, so we wrap the index
  const imageIndex = Math.abs(page % slides.length)

  // Auto-play interval
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
            {/* Dark overlay gradients */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent" />
          </div>

          {/* Text Content */}
          <div className="absolute inset-0 container mx-auto px-6 md:px-16 flex flex-col justify-center h-full z-10 pointer-events-none">
             {/* Use pointer-events-auto for interactive elements inside */}
            <div
              className="max-w-xl text-left mt-0 md:ml-12 pointer-events-auto"
            >
              <h1 className="text-5xl md:text-7xl font-bold uppercase tracking-tight mb-4 text-white drop-shadow-lg">
                {slides[imageIndex].title}
              </h1>
              <p className="text-xl text-gray-200 mb-8 font-light drop-shadow-md">
                {slides[imageIndex].subtitle}
              </p>
              
              <button className="bg-white text-black px-8 py-4 rounded font-bold uppercase flex items-center gap-2 hover:bg-gray-200 transition-colors">
                {slides[imageIndex].buttonText} <ArrowRight size={20} />
              </button>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Arrows */}
      <div className="absolute inset-0 flex items-center justify-between px-4 pointer-events-none z-20">
        <button 
          onClick={() => paginate(-1)}
          className="p-3 bg-black/30 hover:bg-black/50 rounded-full backdrop-blur-sm transition-all text-white border border-white/20 pointer-events-auto hover:scale-110 active:scale-95"
        >
          <ChevronLeft size={32} />
        </button>

        <button 
          onClick={() => paginate(1)}
          className="p-3 bg-black/30 hover:bg-black/50 rounded-full backdrop-blur-sm transition-all text-white border border-white/20 pointer-events-auto hover:scale-110 active:scale-95"
        >
          <ChevronRight size={32} />
        </button>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-30">
        {slides.map((_, index) => (
          <div
            key={index}
            className={`w-3 h-3 rounded-full transition-all border border-white ${
              index === imageIndex ? 'bg-white scale-125' : 'bg-transparent'
            }`}
          />
        ))}
      </div>
    </section>
  )
}
