
'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ChevronDown, Send } from 'lucide-react'



import { useDictionary } from '@/components/DictionaryProvider'

const models = [
  'Chevrolet Tracker',
  'Chevrolet Captiva',
  'Chevrolet Equinox',
  'Chevrolet Tahoe',
  'Chevrolet Malibu',
  'Chevrolet Spark',
]

export default function ContactSection() {
  const dict = useDictionary() as any
  const t = dict.contact
  
  const [form, setForm] = useState({
    name: '',
    phone: '',
    model: models[0],
  })
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      })

      if (response.ok) {
        setSent(true)
        setForm({ name: '', phone: '', model: models[0] })
      } else {
        alert('Xatolik yuz berdi. Iltimos qaytadan urinib ko\'ring.')
      }
    } catch (error) {
      console.error('Submission error:', error)
      alert('Xatolik yuz berdi. Iltimos qaytadan urinib ko\'ring.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="contact" className="relative min-h-[520px] flex items-center overflow-hidden bg-zinc-100 dark:bg-zinc-950">
      {/* Background car image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/cars/malibu-xl/DSCF5268.jpg"
          alt="Contact background"
          fill
          className="object-cover object-center"
        />
        {/* Dark overlay: right half lighter (for form), left darker */}
        <div className="absolute inset-0 bg-gradient-to-r from-white/80 via-white/50 to-white/70 dark:from-black/70 dark:via-black/40 dark:to-black/60" />
      </div>

      <div className="relative z-10 container mx-auto px-6 py-20 flex justify-center">
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-xl bg-white/80 dark:bg-white/10 backdrop-blur-md border border-zinc-200 dark:border-white/20 rounded-2xl p-8 shadow-2xl"
        >
          <h2 className="text-3xl font-bold text-zinc-950 dark:text-white mb-7">{t.title}</h2>

          {sent ? (
            <div className="flex flex-col items-center justify-center h-48 gap-4">
              <div className="w-14 h-14 rounded-full bg-yellow-500 flex items-center justify-center">
                <Send size={24} className="text-black" />
              </div>
              <p className="text-zinc-950 dark:text-white font-semibold text-center">
                {t.success_title}<br />
                <span className="text-zinc-600 dark:text-gray-300 font-normal text-sm">{t.success_subtitle}</span>
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              {/* Name */}
              <div>
                <label htmlFor="contact-name" className="block text-xs text-zinc-600 dark:text-gray-300 mb-1.5 font-medium tracking-wide uppercase">
                  {t.name_label}
                </label>
                <input
                  id="contact-name"
                  required
                  type="text"
                  placeholder={t.name_placeholder}
                  value={form.name}
                  onChange={e => setForm({ ...form, name: e.target.value })}
                  className="w-full bg-white dark:bg-white/15 border border-zinc-300 dark:border-white/20 rounded-lg px-4 py-3 text-zinc-950 dark:text-white placeholder-zinc-400 dark:placeholder-gray-400 text-sm focus:outline-none focus:border-yellow-500 transition-colors"
                />
              </div>

              {/* Phone */}
              <div>
                <label htmlFor="contact-phone" className="block text-xs text-zinc-600 dark:text-gray-300 mb-1.5 font-medium tracking-wide uppercase">
                  {t.phone_label}
                </label>
                <div className="flex items-center bg-white dark:bg-white/15 border border-zinc-300 dark:border-white/20 rounded-lg overflow-hidden focus-within:border-yellow-500 transition-colors">
                  <span className="px-4 py-3 text-zinc-950 dark:text-white font-medium text-sm border-r border-zinc-300 dark:border-white/20 select-none whitespace-nowrap">+998</span>
                  <input
                    id="contact-phone"
                    required
                    type="tel"
                    placeholder={t.phone_placeholder}
                    value={form.phone}
                    onChange={e => {
                      const val = e.target.value.replace(/[^0-9 ]/g, '')
                      setForm({ ...form, phone: val })
                    }}
                    maxLength={12}
                    className="w-full bg-transparent px-3 py-3 text-zinc-950 dark:text-white placeholder-zinc-400 dark:placeholder-gray-400 text-sm focus:outline-none"
                  />
                </div>
              </div>



              {/* Model */}
              <div>
                <label htmlFor="contact-model" className="block text-xs text-zinc-600 dark:text-gray-300 mb-1.5 font-medium tracking-wide uppercase">
                  {t.model_label}
                </label>
                <div className="relative">
                  <select
                    id="contact-model"
                    value={form.model}
                    onChange={e => setForm({ ...form, model: e.target.value })}
                    className="w-full appearance-none bg-white dark:bg-white/15 border border-zinc-300 dark:border-white/20 rounded-lg px-4 py-3 text-zinc-950 dark:text-yellow-400 text-sm focus:outline-none focus:border-yellow-500 transition-colors cursor-pointer"
                  >
                    {models.map(m => (
                      <option key={m} value={m} className="bg-white text-zinc-950 dark:bg-zinc-900 dark:text-white">{m}</option>
                    ))}
                  </select>
                  <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="mt-2 w-full bg-yellow-500 hover:bg-yellow-400 disabled:bg-yellow-800 disabled:cursor-not-allowed text-black font-bold uppercase tracking-widest py-3.5 rounded-lg text-sm transition-colors duration-200"
              >
                {loading ? 'Yuborilmoqda...' : t.submit}
              </button>

              <p className="text-center text-xs text-zinc-500 dark:text-gray-400 mt-1">
                {t.privacy}{' '}
                <a href="#" className="underline hover:text-zinc-950 dark:hover:text-white transition-colors">
                  {t.privacy_link}
                </a>{' '}
                {t.privacy_end}
              </p>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  )
}
