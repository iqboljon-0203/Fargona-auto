
'use client'

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Award, Users, Wrench, ShieldCheck } from 'lucide-react'
import { useDictionary } from '@/components/DictionaryProvider'
import { supabase } from '@/lib/supabase'

export default function AboutSection() {
  const [dbData, setDbData] = useState<any>(null)
  const dict = useDictionary() as {
    about: {
      label: string
      title_1: string
      title_2: string
      p1: string
      p2: string
      p3: string
      stats: {
        experience: string
        clients: string
        serviced: string
        warranty: string
      }
    }
  }

  useEffect(() => {
    const fetchAbout = async () => {
      const { data } = await supabase
        .from('about')
        .select('*')
        .single()
      if (data) setDbData(data)
    }
    fetchAbout()
  }, [])

  const t = dict.about

  // Stats priority: DB > Dict
  const stats = [
    { icon: Award, value: dbData?.experience_years || "15+", label: t.stats.experience },
    { icon: Users, value: dbData?.happy_customers || "5 000+", label: t.stats.clients },
    { icon: Wrench, value: dbData?.service_done || "8 000+", label: t.stats.serviced },
    { icon: ShieldCheck, value: dbData?.guarantee || "100%", label: t.stats.warranty },
  ]

  // Image priority: DB > Local Assets
  const images = {
    main: dbData?.image_main || "/cars/tahoe-hc/1.jpg",
    tahoe: dbData?.image_tahoe || "/cars/tahoe-hc/main.jpg",
    traverse: dbData?.image_traverse || "/cars/traverse-z71/traverse-1.jpg"
  }

  return (
    <section id="about" className="bg-zinc-50 dark:bg-zinc-950 py-24 text-zinc-950 dark:text-white overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* LEFT — Text */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-xs text-yellow-500 uppercase tracking-widest font-semibold mb-3">
              {dbData?.subtitle || t.label}
            </p>
            <h2 className="text-4xl md:text-5xl font-bold uppercase tracking-tighter mb-6 leading-tight">
              {dbData?.title || t.title_1} <span className="text-yellow-500">{!dbData && t.title_2}</span>
            </h2>

            <div className="space-y-4 text-zinc-600 dark:text-gray-400 text-sm leading-relaxed whitespace-pre-line">
              {dbData?.description ? (
                <p>{dbData.description}</p>
              ) : (
                <>
                  <p>{t.p1}</p>
                  <p>{t.p2}</p>
                  <p>{t.p3}</p>
                </>
              )}
            </div>

            {/* Stats grid */}
            <div className="grid grid-cols-2 gap-4 mt-10">
              {stats.map(({ icon: Icon, value, label }) => (
                <div
                  key={label}
                  className="flex items-center gap-4 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-4 hover:border-yellow-500/40 transition-colors shadow-sm dark:shadow-none"
                >
                  <div className="w-10 h-10 rounded-lg bg-yellow-500/10 flex items-center justify-center shrink-0">
                    <Icon size={20} className="text-yellow-500" />
                  </div>
                  <div>
                    <p className="text-xl font-bold text-zinc-950 dark:text-white leading-none">{value}</p>
                    <p className="text-xs text-zinc-500 dark:text-gray-500 mt-0.5">{label}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* RIGHT — Premium Image Mosaic */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative h-[480px] hidden lg:flex gap-3"
          >
            {/* Column 1 — tall image */}
            <div className="relative flex-1 rounded-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800 shadow-2xl group">
              <Image
                src={images.main}
                alt="Chevrolet showroom"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute left-0 top-8 bottom-8 w-[3px] bg-yellow-500 rounded-r-full" />
              <div className="absolute bottom-5 left-5">
                <span className="text-xs text-yellow-500 uppercase tracking-widest font-semibold">Showroom</span>
              </div>
            </div>

            {/* Column 2 — two stacked images */}
            <div className="flex flex-col gap-3 w-[45%]">
              <div className="relative flex-1 rounded-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800 shadow-xl group">
                <Image
                  src={images.tahoe}
                  alt="Chevrolet Tahoe"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4">
                  <span className="text-xs text-yellow-500 uppercase tracking-widest font-semibold">Tahoe</span>
                </div>
              </div>

              <div className="relative flex-1 rounded-2xl overflow-hidden border-2 border-yellow-500/60 shadow-xl shadow-yellow-900/20 group">
                <Image
                  src={images.traverse}
                  alt="Chevrolet Traverse"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute inset-0 rounded-2xl ring-1 ring-yellow-500/20 pointer-events-none" />
                <div className="absolute bottom-4 left-4">
                  <span className="text-xs text-yellow-500 uppercase tracking-widest font-semibold">Traverse</span>
                </div>
                <div className="absolute top-4 right-4 bg-yellow-500 text-black text-[10px] font-bold uppercase px-3 py-1 rounded-full tracking-widest shadow-lg">
                  {dbData?.subtitle || t.label}
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
