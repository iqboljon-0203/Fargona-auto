
import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Facebook, Instagram, Send, Phone, MapPin, Mail } from 'lucide-react'

const modelLinks = [
  { name: 'Tracker', href: '/models/tracker' },
  { name: 'Captiva', href: '/models/captiva' },
  { name: 'Traverse', href: '/models/traverse' },
  { name: 'Tahoe RST', href: '/models/tahoe-rst' },
  { name: 'Onix', href: '/models/onix' },
  { name: 'Malibu XL', href: '/models/malibu-xl' },
  { name: 'Cobalt', href: '/models/cobalt' },
]

const companyLinks = [
  { name: 'Biz haqimizda', href: '/#about' },
  { name: 'Yangiliklar', href: '/#news' },
  { name: 'Barcha modellar', href: '/models' },
  { name: 'Aloqa', href: '/#contact' },
]

export default function Footer() {
  return (
    <footer className="bg-zinc-950 text-gray-400 border-t border-zinc-800">

      {/* Main footer */}
      <div className="container mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

        {/* Brand */}
        <div>
          <Link href="/" className="flex items-center gap-3 mb-5 group w-fit">
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
              <span className="text-[1.15rem] font-bold text-white tracking-[0.22em] uppercase">
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
          </Link>
          <p className="text-sm leading-relaxed mb-5">
            Sizga eng yaxshi avtomobillarni taqdim etish va xizmat ko&apos;rsatishning yuqori darajasini
            ta&apos;minlash — bizning maqsadimiz.
          </p>
          <div className="flex gap-3">
            <a href="https://t.me/fargonachevrolet" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-lg bg-zinc-900 flex items-center justify-center text-gray-400 hover:bg-yellow-500 hover:text-black transition-all">
              <Send size={16} />
            </a>
            <a href="#" className="w-9 h-9 rounded-lg bg-zinc-900 flex items-center justify-center text-gray-400 hover:bg-yellow-500 hover:text-black transition-all">
              <Instagram size={16} />
            </a>
            <a href="#" className="w-9 h-9 rounded-lg bg-zinc-900 flex items-center justify-center text-gray-400 hover:bg-yellow-500 hover:text-black transition-all">
              <Facebook size={16} />
            </a>
          </div>
        </div>

        {/* Company */}
        <div>
          <h4 className="text-white font-bold uppercase mb-5 text-sm tracking-widest">Kompaniya</h4>
          <ul className="space-y-3">
            {companyLinks.map(link => (
              <li key={link.name}>
                <Link href={link.href} className="text-sm hover:text-yellow-500 transition-colors flex items-center gap-1.5">
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Models */}
        <div>
          <h4 className="text-white font-bold uppercase mb-5 text-sm tracking-widest">Modellar</h4>
          <ul className="space-y-3">
            {modelLinks.map(link => (
              <li key={link.name}>
                <Link href={link.href} className="text-sm hover:text-yellow-500 transition-colors">
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-white font-bold uppercase mb-5 text-sm tracking-widest">Bog&apos;lanish</h4>
          <ul className="space-y-4 text-sm">
            <li className="flex items-start gap-3">
              <MapPin size={16} className="text-yellow-500 shrink-0 mt-0.5" />
              <span>Farg&apos;ona sh., Aeroport ko&apos;chasi, 78-uy</span>
            </li>
            <li>
              <a href="tel:+998954002087" className="flex items-center gap-3 hover:text-yellow-500 transition-colors">
                <Phone size={16} className="text-yellow-500 shrink-0" />
                +998 95 400 20 87
              </a>
            </li>
            <li>
              <a href="mailto:feravtotech@umail.uz" className="flex items-center gap-3 hover:text-yellow-500 transition-colors">
                <Mail size={16} className="text-yellow-500 shrink-0" />
                feravtotech@umail.uz
              </a>
            </li>
          </ul>

          {/* Work hours */}
          <div className="mt-5 pt-4 border-t border-zinc-800">
            <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Ish vaqti</p>
            <p className="text-sm text-gray-300">Du–Sha: 09:00 – 18:00</p>
            <p className="text-sm text-gray-300">Yak: Dam olish</p>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-zinc-800">
        <div className="container mx-auto px-6 py-5 flex flex-col md:flex-row justify-between items-center gap-3 text-xs text-gray-600">
          <p>&copy; {new Date().getFullYear()} Farg&apos;ona Auto — Barcha huquqlar himoyalangan.</p>
          <p>
            Rasmiy Chevrolet dilleri —{' '}
            <span className="text-yellow-500/80 font-semibold uppercase tracking-wider">
              &ldquo;Farg&apos;ona Avtotexxizmat-F&rdquo; MCHJ
            </span>
          </p>
        </div>
      </div>
    </footer>
  )
}
