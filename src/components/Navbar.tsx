
'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Globe } from 'lucide-react'
import { ModeToggle } from './mode-toggle'

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [language, setLanguage] = useState<'uz' | 'ru'>('uz')

  const navLinks = [
    { name: 'Modellar', href: '#models' },
    { name: 'Biz haqimizda', href: '#about' },
    { name: 'Yangiliklar', href: '#news' },
    { name: 'Aloqa', href: '#contact' },
    { name: 'Manzil', href: '#dealers' },
  ]

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    const target = document.querySelector(href)
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
    setIsMobileMenuOpen(false)
  }

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'uz' ? 'ru' : 'uz')
  }

  return (
    <nav
      className="sticky top-0 left-0 w-full z-50 bg-zinc-950 border-b border-white/10 shadow-lg"
    >
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          {/* Chevrolet Logo */}
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
            <span className="text-[1.15rem] font-bold text-white tracking-[0.22em] uppercase" style={{ letterSpacing: '0.22em' }}>
              Farg'ona
            </span>
            <span className="text-[0.6rem] font-semibold tracking-[0.55em] uppercase" style={{ 
              background: 'linear-gradient(90deg, #F4D78F 0%, #E1B63D 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              letterSpacing: '0.55em'
            }}>
              Auto
            </span>
          </div>
        </Link>
        
        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-6">
          <div className="flex space-x-6 mr-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="text-gray-300 hover:text-white transition-colors text-sm uppercase tracking-wider font-medium relative group"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-yellow-500 group-hover:w-full transition-all duration-300" />
              </Link>
            ))}
          </div>

          <div className="h-6 w-px bg-zinc-800"></div>

          <div className="flex items-center space-x-4">
            {/* Dark Mode Toggle */}
            <ModeToggle />

            {/* Language Switcher */}
            <button 
              onClick={toggleLanguage}
              className="flex items-center gap-1 text-sm font-bold uppercase hover:text-yellow-500 transition-colors text-white"
            >
              <Globe size={18} />
              <span>{language === 'uz' ? 'Uz' : 'Ru'}</span>
            </button>

            {/* Phone Number */}
            <a 
              href="tel:+998954002087" 
              className="bg-yellow-500 text-black px-5 py-2 rounded-full font-bold text-sm uppercase hover:bg-yellow-400 transition-colors shadow-md hover:shadow-yellow-500/20"
            >
              +998 95 400 20 87
            </a>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white focus:outline-none p-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full bg-zinc-950 border-t border-white/10 p-6 md:hidden shadow-xl"
          >
            <div className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-gray-300 hover:text-yellow-500 transition-colors text-lg font-medium"
                  onClick={(e) => handleNavClick(e as React.MouseEvent<HTMLAnchorElement>, link.href)}
                >
                  {link.name}
                </Link>
              ))}
               
               <div className="flex items-center justify-between pt-4 border-t border-zinc-800 mt-2">
                 <div className="flex items-center gap-4">
                   <ModeToggle />
                   <button 
                      onClick={toggleLanguage}
                      className="flex items-center gap-1 text-sm font-bold uppercase text-white"
                    >
                      <Globe size={18} />
                      {language === 'uz' ? 'Uz' : 'Ru'}
                    </button>
                 </div>
                 <a 
                   href="tel:+998954002087" 
                   className="bg-yellow-500 text-black px-6 py-2 rounded font-bold uppercase text-sm mt-4 block text-center"
                 >
                   +998 95 400 20 87
                </a>
               </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
