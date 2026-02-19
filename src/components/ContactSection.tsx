
'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ChevronDown, Send } from 'lucide-react'



const models = [
  'Chevrolet Tracker',
  'Chevrolet Captiva',
  'Chevrolet Equinox',
  'Chevrolet Tahoe',
  'Chevrolet Malibu',
  'Chevrolet Spark',
]

export default function ContactSection() {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    model: models[0],
  })
  const [sent, setSent] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSent(true)
    setTimeout(() => setSent(false), 4000)
  }

  return (
    <section id="contact" className="relative min-h-[520px] flex items-center overflow-hidden bg-zinc-950">
      {/* Background car image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=2070&auto=format&fit=crop"
          alt="Contact background"
          fill
          className="object-cover object-center"
        />
        {/* Dark overlay: right half lighter (for form), left darker */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-black/60" />
      </div>

      <div className="relative z-10 container mx-auto px-6 py-20 flex justify-center">
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-xl bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 shadow-2xl"
        >
          <h2 className="text-3xl font-bold text-white mb-7">Aloqa</h2>

          {sent ? (
            <div className="flex flex-col items-center justify-center h-48 gap-4">
              <div className="w-14 h-14 rounded-full bg-yellow-500 flex items-center justify-center">
                <Send size={24} className="text-black" />
              </div>
              <p className="text-white font-semibold text-center">
                So'rovingiz qabul qilindi!<br />
                <span className="text-gray-300 font-normal text-sm">Tez orada siz bilan bog'lanamiz.</span>
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              {/* Name */}
              <div>
                <label className="block text-xs text-gray-300 mb-1.5 font-medium tracking-wide uppercase">
                  Ism
                </label>
                <input
                  required
                  type="text"
                  placeholder="Ismingiz"
                  value={form.name}
                  onChange={e => setForm({ ...form, name: e.target.value })}
                  className="w-full bg-white/15 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 text-sm focus:outline-none focus:border-yellow-500 transition-colors"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block text-xs text-gray-300 mb-1.5 font-medium tracking-wide uppercase">
                  Telefon raqami
                </label>
                <div className="flex items-center bg-white/15 border border-white/20 rounded-lg overflow-hidden focus-within:border-yellow-500 transition-colors">
                  <span className="px-4 py-3 text-white font-medium text-sm border-r border-white/20 select-none whitespace-nowrap">+998</span>
                  <input
                    required
                    type="tel"
                    placeholder="__ ___ __ __"
                    value={form.phone}
                    onChange={e => {
                      const val = e.target.value.replace(/[^0-9 ]/g, '')
                      setForm({ ...form, phone: val })
                    }}
                    maxLength={12}
                    className="w-full bg-transparent px-3 py-3 text-white placeholder-gray-400 text-sm focus:outline-none"
                  />
                </div>
              </div>



              {/* Model */}
              <div>
                <label className="block text-xs text-gray-300 mb-1.5 font-medium tracking-wide uppercase">
                  Model
                </label>
                <div className="relative">
                  <select
                    value={form.model}
                    onChange={e => setForm({ ...form, model: e.target.value })}
                    className="w-full appearance-none bg-white/15 border border-white/20 rounded-lg px-4 py-3 text-yellow-400 text-sm focus:outline-none focus:border-yellow-500 transition-colors cursor-pointer"
                  >
                    {models.map(m => (
                      <option key={m} value={m} className="bg-zinc-900 text-white">{m}</option>
                    ))}
                  </select>
                  <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="mt-2 w-full bg-yellow-500 hover:bg-yellow-400 text-black font-bold uppercase tracking-widest py-3.5 rounded-lg text-sm transition-colors duration-200"
              >
                Yuborish
              </button>

              <p className="text-center text-xs text-gray-400 mt-1">
                Yuborish tugmasini bosib, siz{' '}
                <a href="#" className="underline hover:text-white transition-colors">
                  shaxsiy ma&apos;lumotlarni qayta ishlash
                </a>{' '}
                ga rozilik bildirasiz.
              </p>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  )
}
