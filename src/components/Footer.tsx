'use client'

import React from 'react'
import LangLink from '@/components/LangLink'
import Image from 'next/image'
import { Facebook, Instagram, Send, Phone, MapPin, Mail, Youtube, Clock } from 'lucide-react'
import { useDictionary } from '@/components/DictionaryProvider'

const modelLinks = [
  { name: 'Tracker', href: '/models/tracker' },
  { name: 'Captiva', href: '/models/captiva' },
  { name: 'Traverse', href: '/models/traverse' },
  { name: 'Tahoe RST', href: '/models/tahoe-rst' },
  { name: 'Onix', href: '/models/onix' },
  { name: 'Malibu XL', href: '/models/malibu-xl' },
  { name: 'Cobalt', href: '/models/cobalt' },
]

export default function Footer() {
  const dict = useDictionary() as any
  const t = dict.footer
  const nav = dict.nav

  const localizedCompanyLinks = [
    { name: nav.home, href: '/' },
    { name: nav.about, href: '/#about' },
    { name: nav.news, href: '/#news' },
    { name: nav.models, href: '/models' },
    { name: nav.contact, href: '/#contact' },
  ]
  return (
    <footer className="bg-zinc-100 dark:bg-zinc-950 text-zinc-600 dark:text-gray-400 border-t border-zinc-200 dark:border-zinc-800">

      {/* Main footer */}
      <div className="container mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

        {/* Brand */}
        <div>
          <LangLink href="/" className="flex items-center gap-3 mb-5 group w-fit">
            <div className="flex items-center justify-center">
              <Image
                src="/chevrolet.svg"
                alt="Chevrolet Logo"
                width={80}
                height={18}
                className="object-contain"
              />
            </div>
            <div className="flex flex-col leading-none gap-[1px]" style={{ fontFamily: 'var(--font-rajdhani)' }}>
              <span className="text-[1.15rem] font-bold text-zinc-950 dark:text-white tracking-[0.22em] uppercase">
                Farg&apos;ona
              </span>
              <span
                className="text-[0.6rem] font-semibold tracking-[0.55em] uppercase"
                style={{
                  background: 'linear-gradient(90deg, #F4D78F 0%, #E1B63D 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  letterSpacing: '0.55em',
                }}
              >
                Auto
              </span>
            </div>
          </LangLink>
          <p className="text-sm leading-relaxed mb-5">
            {t.description}
          </p>
          <div className="flex gap-3">
            <a href="https://t.me/+fCfNaggJ56ZhMWQ6" target="_blank" rel="noopener noreferrer" aria-label="Telegram" className="w-9 h-9 rounded-lg bg-white dark:bg-zinc-900 flex items-center justify-center text-zinc-500 dark:text-gray-400 hover:bg-yellow-500 hover:text-black transition-all shadow-sm dark:shadow-none">
              <Send size={16} />
            </a>
            <a href="https://instagram.com/fargona_avtotexxizmat/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="w-9 h-9 rounded-lg bg-white dark:bg-zinc-900 flex items-center justify-center text-zinc-500 dark:text-gray-400 hover:bg-yellow-500 hover:text-black transition-all shadow-sm dark:shadow-none">
              <Instagram size={16} />
            </a>
            <a href="https://www.facebook.com/61562625920113" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="w-9 h-9 rounded-lg bg-white dark:bg-zinc-900 flex items-center justify-center text-zinc-500 dark:text-gray-400 hover:bg-yellow-500 hover:text-black transition-all shadow-sm dark:shadow-none">
              <Facebook size={16} />
            </a>
            <a href="https://www.youtube.com/@Avtotexxizmat_fargona" target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="w-9 h-9 rounded-lg bg-white dark:bg-zinc-900 flex items-center justify-center text-zinc-500 dark:text-gray-400 hover:bg-yellow-500 hover:text-black transition-all shadow-sm dark:shadow-none">
              <Youtube size={16} />
            </a>
          </div>
        </div>

        <div>
          <h4 className="text-zinc-950 dark:text-white font-bold uppercase mb-5 text-sm tracking-widest">{t.company}</h4>
          <ul className="space-y-3">
            {localizedCompanyLinks.map(link => (
              <li key={link.name}>
                <LangLink href={link.href} className="text-sm hover:text-yellow-500 transition-colors flex items-center gap-1.5">
                  {link.name}
                </LangLink>
              </li>
            ))}
          </ul>
        </div>

        {/* Models */}
        <div>
          <h4 className="text-zinc-950 dark:text-white font-bold uppercase mb-5 text-sm tracking-widest">{t.models}</h4>
          <ul className="space-y-3">
            {modelLinks.map(link => (
              <li key={link.name}>
                <LangLink href={link.href} className="text-sm hover:text-yellow-500 transition-colors">
                  {link.name}
                </LangLink>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-zinc-950 dark:text-white font-bold uppercase mb-5 text-sm tracking-widest">{t.contact_title}</h4>
          <ul className="space-y-4">
            <li className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-white dark:bg-zinc-900 flex items-center justify-center text-yellow-500 flex-shrink-0">
                <Phone size={14} />
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-wider text-zinc-400 mb-0.5">{t.phone_label}</p>
                <a href="tel:+998954002087" className="text-sm text-zinc-800 dark:text-gray-300 hover:text-yellow-500 transition-colors">
                  +998 95 400 20 87
                </a>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-white dark:bg-zinc-900 flex items-center justify-center text-yellow-500 flex-shrink-0">
                <Mail size={14} />
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-wider text-zinc-400 mb-0.5">{t.email_label}</p>
                <a href="mailto:feravtotech@umail.uz" className="text-sm text-zinc-800 dark:text-gray-300 hover:text-yellow-500 transition-colors">
                  feravtotech@umail.uz
                </a>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-white dark:bg-zinc-900 flex items-center justify-center text-yellow-500 flex-shrink-0">
                <Clock size={14} />
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-wider text-zinc-400 mb-0.5">{t.hours_label}</p>
                <p className="text-sm text-zinc-800 dark:text-gray-300 line-clamp-1">{t.hours}</p>
              </div>
            </li>
          </ul>
        </div>

      </div>

      {/* Bottom bar */}
      <div className="border-t border-zinc-200 dark:border-zinc-800 bg-white dark:bg-black/20">
        <div className="container mx-auto px-6 py-8 flex flex-col md:flex-row justify-between items-center gap-6 text-[11px] md:text-xs">
          <p>&copy; {new Date().getFullYear()} Farg&apos;ona Auto — {t.rights}</p>
          <div className="flex items-center gap-4 text-zinc-400">
            <p>
              {t.official_dealer} —{' '}
              <span className="text-zinc-950 dark:text-white font-semibold uppercase tracking-wider">
                &ldquo;Farg&apos;ona Avtotexxizmat-F&rdquo; MCHJ
              </span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
