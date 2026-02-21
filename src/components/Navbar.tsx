
'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useState, useRef, useEffect } from 'react'
import { useParams, usePathname, useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Globe, ChevronDown } from 'lucide-react'
import { ModeToggle } from './mode-toggle'
import { useDictionary } from '@/components/DictionaryProvider'

const languages = [
  { code: 'uz', label: 'UZ', full: "O'zbekcha" },
  { code: 'ru', label: 'RU', full: 'Русский' },
  { code: 'en', label: 'EN', full: 'English' },
] as const

export default function Navbar() {
  const dict = useDictionary() as any
  const t = dict.nav
  
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isLangOpen, setIsLangOpen] = useState(false)
  const langRef = useRef<HTMLDivElement>(null)

  const params = useParams()
  const pathname = usePathname()
  const router = useRouter()

  const currentLang = dict.lang || 'uz'
  
  const links = [
    { name: t.models, href: '#models' },
    { name: t.about, href: '#about' },
    { name: t.news, href: '#news' },
    { name: t.contact, href: '#contact' },
    { name: t.location, href: '#dealers' },
  ]
  const currentLangObj = languages.find(l => l.code === currentLang) || languages[0]

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(event.target as Node)) {
        setIsLangOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const switchLanguage = (newLang: string) => {
    // Replace current lang prefix in pathname
    const segments = pathname.split('/')
    segments[1] = newLang // /uz/news -> /ru/news
    router.push(segments.join('/'))
    setIsLangOpen(false)
    setIsMobileMenuOpen(false)
  }

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    setIsMobileMenuOpen(false)
    if (href.startsWith('/')) return
    e.preventDefault()
    const target = document.querySelector(href)
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <nav
      aria-label="Asosiy navigatsiya"
      className="sticky top-0 left-0 w-full z-50 bg-white dark:bg-zinc-950 border-b border-zinc-200 dark:border-white/10 shadow-lg"
    >
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link href={`/${currentLang}`} className="flex items-center gap-3 group">
          <div className="flex items-center justify-center">
             <Image 
               src="/chevrolet.svg" 
               alt="Chevrolet Logo" 
               width={80} 
               height={18} 
               className="object-contain"
               style={{ width: 'auto', height: 'auto' }}
             />
          </div>
          
          <div className="flex flex-col leading-none gap-[1px]" style={{ fontFamily: 'var(--font-rajdhani)' }}>
            <span className="text-[1.15rem] font-bold text-zinc-950 dark:text-white tracking-[0.22em] uppercase" style={{ letterSpacing: '0.22em' }}>
              Farg&apos;ona
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
            {links.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="text-zinc-600 hover:text-zinc-950 dark:text-gray-300 dark:hover:text-white transition-colors text-sm uppercase tracking-wider font-medium relative group"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-yellow-500 group-hover:w-full transition-all duration-300" />
              </Link>
            ))}
          </div>

          <div className="h-6 w-px bg-zinc-200 dark:bg-zinc-800"></div>

          <div className="flex items-center space-x-4">
            {/* Dark Mode Toggle */}
            <ModeToggle />

            {/* Language Switcher */}
            <div className="relative" ref={langRef}>
              <button 
                onClick={() => setIsLangOpen(!isLangOpen)}
                className="flex items-center gap-1.5 text-sm font-bold uppercase hover:text-yellow-500 transition-colors text-zinc-950 dark:text-white"
              >
                <Globe size={18} />
                <span>{currentLangObj.label}</span>
                <ChevronDown size={14} className={`transition-transform duration-200 ${isLangOpen ? 'rotate-180' : ''}`} />
              </button>

              <AnimatePresence>
                {isLangOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    transition={{ duration: 0.15 }}
                    className="absolute top-full right-0 mt-2 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-lg shadow-xl overflow-hidden min-w-[140px]"
                  >
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => switchLanguage(lang.code)}
                        className={`w-full text-left px-4 py-2.5 text-sm font-medium transition-colors flex items-center justify-between gap-3 ${
                          currentLang === lang.code
                            ? 'bg-yellow-500/10 text-yellow-500'
                            : 'text-zinc-700 dark:text-gray-300 hover:bg-zinc-100 dark:hover:bg-zinc-800'
                        }`}
                      >
                        <span>{lang.full}</span>
                        <span className="text-xs font-bold opacity-50">{lang.label}</span>
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

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
          className="md:hidden text-zinc-950 dark:text-white focus:outline-none p-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label={isMobileMenuOpen ? dict.common.menu_close : dict.common.menu_open}
          aria-expanded={isMobileMenuOpen}
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
            className="absolute top-full left-0 w-full bg-white dark:bg-zinc-950 border-t border-zinc-200 dark:border-white/10 p-6 md:hidden shadow-xl"
          >
            <div className="flex flex-col space-y-4">
              {links.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-zinc-600 hover:text-yellow-500 dark:text-gray-300 transition-colors text-lg font-medium"
                  onClick={(e) => handleNavClick(e as React.MouseEvent<HTMLAnchorElement>, link.href)}
                >
                  {link.name}
                </Link>
              ))}
               
               <div className="flex items-center justify-between pt-4 border-t border-zinc-200 dark:border-zinc-800 mt-2">
                 <div className="flex items-center gap-4">
                   <ModeToggle />
                   {/* Mobile Language Switcher */}
                   <div className="flex items-center gap-1 border border-zinc-200 dark:border-zinc-700 rounded-lg overflow-hidden">
                     {languages.map((lang) => (
                       <button
                         key={lang.code}
                         onClick={() => switchLanguage(lang.code)}
                         className={`px-3 py-1.5 text-xs font-bold uppercase transition-colors ${
                           currentLang === lang.code
                             ? 'bg-yellow-500 text-black'
                             : 'text-zinc-600 dark:text-gray-400 hover:text-zinc-950 dark:hover:text-white'
                         }`}
                       >
                         {lang.label}
                       </button>
                     ))}
                   </div>
                 </div>
                 <a 
                   href="tel:+998954002087" 
                   className="bg-yellow-500 text-black px-6 py-2 rounded font-bold uppercase text-sm block text-center"
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
