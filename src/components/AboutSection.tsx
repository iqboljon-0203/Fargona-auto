
'use client'

import React from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Award, Users, Wrench, ShieldCheck } from 'lucide-react'

const stats = [
  { icon: Award, value: "15+", label: "Yillik tajriba" },
  { icon: Users, value: "5 000+", label: "Mamnun mijozlar" },
  { icon: Wrench, value: "8 000+", label: "Xizmat ko'rsatilgan" },
  { icon: ShieldCheck, value: "100%", label: "Rasmiy kafolat" },
]

export default function AboutSection() {
  return (
    <section id="about" className="bg-zinc-950 py-24 text-white overflow-hidden">
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
              Rasmiy Chevrolet Diler
            </p>
            <h2 className="text-4xl md:text-5xl font-bold uppercase tracking-tighter mb-6 leading-tight">
              Biz <span className="text-yellow-500">haqimizda</span>
            </h2>

            <div className="space-y-4 text-gray-400 text-sm leading-relaxed">
              <p>
                <strong className="text-white">&quot;Farg&apos;ona Avtotexxizmat-F&quot; MCHJ</strong> — Farg&apos;ona viloyatida Chevrolet brendining yagona rasmiy dileridir.
                Biz 2009 yildan beri faoliyat yuritib, mintaqada avtomobil sohasida ishonch va sifat ramzi sifatida tanilganmiz.
              </p>
              <p>
                Kompaniyamiz mijozlarga yangi avtomobillar sotish, rasmiy texnik xizmat ko&apos;rsatish,
                original ehtiyot qismlar ta&apos;minlash va Trade-In xizmatlarini taklif etadi.
                Har bir mijozga individual yondashuv bizning asosiy tamoyilimizdir.
              </p>
              <p>
                Showroomimizda Chevrolet brendi ostidagi barcha dolzarb modellarni jonli ko&apos;rishingiz,
                sinov haydovini amalga oshirishingiz va qulay muddatli to&apos;lov sharoitlarida avtomobil
                xarid qilishingiz mumkin.
              </p>
            </div>

            {/* Stats grid */}
            <div className="grid grid-cols-2 gap-4 mt-10">
              {stats.map(({ icon: Icon, value, label }) => (
                <div
                  key={label}
                  className="flex items-center gap-4 bg-zinc-900 border border-zinc-800 rounded-xl p-4 hover:border-yellow-500/40 transition-colors"
                >
                  <div className="w-10 h-10 rounded-lg bg-yellow-500/10 flex items-center justify-center shrink-0">
                    <Icon size={20} className="text-yellow-500" />
                  </div>
                  <div>
                    <p className="text-xl font-bold text-white leading-none">{value}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{label}</p>
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
            <div className="relative flex-1 rounded-2xl overflow-hidden border border-zinc-800 shadow-2xl group">
              <Image
                src="https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=2070&auto=format&fit=crop"
                alt="Chevrolet showroom"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              {/* Yellow left accent line */}
              <div className="absolute left-0 top-8 bottom-8 w-[3px] bg-yellow-500 rounded-r-full" />
              {/* Label */}
              <div className="absolute bottom-5 left-5">
                <span className="text-xs text-yellow-500 uppercase tracking-widest font-semibold">Showroom</span>
              </div>
            </div>

            {/* Column 2 — two stacked images */}
            <div className="flex flex-col gap-3 w-[45%]">
              {/* Top image */}
              <div className="relative flex-1 rounded-2xl overflow-hidden border border-zinc-800 shadow-xl group">
                <Image
                  src="https://images.unsplash.com/photo-1617788138017-80ad40651399?q=80&w=2070&auto=format&fit=crop"
                  alt="Chevrolet Tahoe"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4">
                  <span className="text-xs text-yellow-500 uppercase tracking-widest font-semibold">Tahoe</span>
                </div>
              </div>

              {/* Bottom image — yellow border highlight */}
              <div className="relative flex-1 rounded-2xl overflow-hidden border-2 border-yellow-500/60 shadow-xl shadow-yellow-900/20 group">
                <Image
                  src="https://images.unsplash.com/photo-1583121274602-3e2820c69888?q=80&w=2070&auto=format&fit=crop"
                  alt="Chevrolet Equinox"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                {/* Glow at yellow border */}
                <div className="absolute inset-0 rounded-2xl ring-1 ring-yellow-500/20 pointer-events-none" />
                <div className="absolute bottom-4 left-4">
                  <span className="text-xs text-yellow-500 uppercase tracking-widest font-semibold">Equinox</span>
                </div>
                {/* Badge */}
                <div className="absolute top-4 right-4 bg-yellow-500 text-black text-[10px] font-bold uppercase px-3 py-1 rounded-full tracking-widest shadow-lg">
                  Rasmiy Diler
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
