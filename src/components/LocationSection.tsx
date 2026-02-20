
'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { MapPin, Phone, Mail, Clock } from 'lucide-react'

import { useDictionary } from '@/components/DictionaryProvider'

export default function LocationSection() {
  const dict = useDictionary() as any
  const t = dict.location
  
  const info = [
    {
      icon: MapPin,
      label: t.address_label,
      value: t.address,
    },
    {
      icon: Phone,
      label: t.phone_label,
      value: '+998 95 400 20 87 | +998 99 401 20 87',
    },
    {
      icon: Mail,
      label: t.email_label,
      value: 'feravtotech@umail.uz',
    },
    {
      icon: Clock,
      label: t.hours_label,
      value: t.hours,
    },
  ]

  return (
    <section id="dealers" className="bg-zinc-50 dark:bg-zinc-900 py-24 text-zinc-950 dark:text-white">
      <div className="container mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <h2 className="text-4xl md:text-5xl font-bold uppercase tracking-tighter mb-4">
            {t.title_1} <span className="text-yellow-500">{t.title_2}</span>
          </h2>
          <p className="text-zinc-600 dark:text-gray-400 max-w-xl mx-auto">
            {t.subtitle}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 lg:grid-cols-5 rounded-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800 shadow-2xl min-h-[420px]"
        >
          {/* LEFT — Info panel */}
          <div className="lg:col-span-2 bg-white dark:bg-zinc-950 flex flex-col justify-between p-8 gap-6">
            <div>
              <p className="text-xs text-yellow-500 uppercase tracking-widest mb-2 font-semibold">{t.label}</p>
              <h3 className="text-xl font-bold text-zinc-950 dark:text-white mb-6 leading-snug">
                {t.company_name}
              </h3>

              <div className="flex flex-col gap-5">
                {info.map(({ icon: Icon, label, value }) => (
                  <div key={label} className="flex items-start gap-3">
                    <div className="mt-0.5 w-8 h-8 rounded-lg bg-yellow-500/10 flex items-center justify-center shrink-0">
                      <Icon size={16} className="text-yellow-500" />
                    </div>
                    <div>
                      <p className="text-xs text-zinc-500 dark:text-gray-500 uppercase tracking-wider mb-0.5">{label}</p>
                      <p className="text-sm text-zinc-800 dark:text-gray-200 whitespace-pre-line">{value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <a
              href="tel:+998954002087"
              className="flex items-center justify-center gap-2 w-full bg-yellow-500 hover:bg-yellow-400 text-black font-bold uppercase text-sm py-3.5 rounded-lg transition-colors duration-200"
            >
              <Phone size={16} />
              {t.call}
            </a>
          </div>

          {/* RIGHT — Google Maps embed */}
          <div className="lg:col-span-3 min-h-[380px]">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2999.8!2d71.7465!3d40.3786!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38bb9ca9b00915f1%3A0xf6e5d4a35a0b72df!2sFarg%CA%BBona%20ATX(AVTOTEXSERVIS)!5e1!3m2!1suz!2suz!4v1700000000000"
              width="100%"
              height="100%"
              className="w-full h-full min-h-[380px] border-0"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title={`${t.title_1} ${t.title_2}`}
            />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
