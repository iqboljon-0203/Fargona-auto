
import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Facebook, Instagram, Twitter } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-zinc-950 text-gray-400 py-16 border-t border-white/10">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
        <div>
          {/* Logo — same as Navbar */}
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
                Farg'ona
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
          <p className="text-sm leading-relaxed mb-6">
            Bizning maqsadimiz - sizga eng yaxshi avtomobillarni taqdim etish va xizmat ko'rsatishning yuqori darajasini ta'minlashdir.
          </p>
          <div className="flex space-x-4">
            <Link href="#" className="text-gray-400 hover:text-white transition-colors">
              <Facebook size={20} />
            </Link>
            <Link href="#" className="text-gray-400 hover:text-white transition-colors">
              <Instagram size={20} />
            </Link>
            <Link href="#" className="text-gray-400 hover:text-white transition-colors">
              <Twitter size={20} />
            </Link>
          </div>
        </div>
        
        <div>
          <h4 className="text-white font-bold uppercase mb-6 tracking-wider">Kompaniya</h4>
          <ul className="space-y-4 text-sm">
            <li><Link href="#" className="hover:text-yellow-500 transition-colors">Biz haqimizda</Link></li>
            <li><Link href="#" className="hover:text-yellow-500 transition-colors">Yangiliklar</Link></li>
            <li><Link href="#" className="hover:text-yellow-500 transition-colors">Karyera</Link></li>
            <li><Link href="#" className="hover:text-yellow-500 transition-colors">Aloqa</Link></li>
          </ul>
        </div>

        <div>
           <h4 className="text-white font-bold uppercase mb-6 tracking-wider">Modellar</h4>
           <ul className="space-y-4 text-sm">
            <li><Link href="#" className="hover:text-yellow-500 transition-colors">Tracker</Link></li>
            <li><Link href="#" className="hover:text-yellow-500 transition-colors">Tahoe</Link></li>
            <li><Link href="#" className="hover:text-yellow-500 transition-colors">Equinox</Link></li>
            <li><Link href="#" className="hover:text-yellow-500 transition-colors">Captiva</Link></li>
           </ul>
        </div>

        <div>
          <h4 className="text-white font-bold uppercase mb-6 tracking-wider">Biz bilan bog'laning</h4>
          <ul className="space-y-4 text-sm">
            <li className="flex items-start gap-3">
              <span className="text-yellow-500 font-bold">Manzil:</span>
              Farg'ona sh., Aeroport ko'chasi, 78-uy
            </li>
            <li className="flex items-center gap-3">
              <span className="text-yellow-500 font-bold">Tel:</span>
              +998 95 400 20 87
            </li>
            <li className="flex items-center gap-3">
               <span className="text-yellow-500 font-bold">Email:</span>
               feravtotech@umail.uz
            </li>
          </ul>
        </div>
      </div>
      
      <div className="border-t border-zinc-900 mt-16 pt-8 text-center text-xs text-gray-600 uppercase tracking-widest">
        &copy; {new Date().getFullYear()} Farg'ona Auto. Barcha huquqlar himoyalangan.
      </div>
    </footer>
  )
}
