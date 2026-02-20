'use client'

import React, { useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import { 
  LayoutDashboard, 
  Newspaper, 
  Users, 
  Settings, 
  Bell, 
  LogOut,
  Menu,
  X,
  ChevronRight,
  Search
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const menuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/admin/dashboard' },
  { icon: Newspaper, label: 'Yangiliklar', href: '/admin/dashboard/news' },
  { icon: Users, label: 'Biz haqimizda', href: '/admin/dashboard/about' },
  { icon: Bell, label: 'Arizalar', href: '/admin/dashboard/requests' },
  { icon: Settings, label: 'Sozlamalar', href: '/admin/dashboard/settings' },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [isMobile, setIsMobile] = useState(false)
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) {
        router.push('/admin/login')
      }
    }

    checkSession()

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_OUT' || !session) {
        router.push('/admin/login')
      }
    })

    const checkMobile = () => setIsMobile(window.innerWidth < 1024)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    
    return () => {
      window.removeEventListener('resize', checkMobile)
      subscription.unsubscribe()
    }
  }, [router])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/admin/login')
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-white flex selection:bg-yellow-500 selection:text-black">
      {/* Sidebar */}
      <AnimatePresence mode="wait">
        {(sidebarOpen || !isMobile) && (
          <motion.aside
            initial={isMobile ? { x: -300 } : { width: 0 }}
            animate={isMobile ? { x: 0 } : { width: 280 }}
            exit={isMobile ? { x: -300 } : { width: 0 }}
            className={`fixed lg:relative z-50 h-screen bg-zinc-900 border-r border-zinc-800 flex flex-col shrink-0 overflow-hidden shadow-2xl`}
          >
            <div className="p-6 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-yellow-500 rounded-lg flex items-center justify-center">
                  <span className="text-black font-black">F</span>
                </div>
                <span className="font-black uppercase tracking-tighter text-lg">Admin<span className="text-yellow-500">Panel</span></span>
              </div>
              {isMobile && <button onClick={() => setSidebarOpen(false)}><X size={20} /></button>}
            </div>

            <nav className="flex-1 px-4 py-4 space-y-1">
              {menuItems.map((item) => {
                const isActive = pathname === item.href
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all group ${
                      isActive 
                        ? 'bg-yellow-500 text-black font-bold' 
                        : 'text-zinc-400 hover:bg-zinc-800 hover:text-white'
                    }`}
                  >
                    <item.icon size={20} className={isActive ? 'text-black' : 'group-hover:text-yellow-500 transition-colors'} />
                    <span className="text-sm tracking-wide">{item.label}</span>
                  </Link>
                )
              })}
            </nav>

            <div className="p-4 mt-auto">
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-500 hover:bg-red-500/10 transition-all font-bold"
              >
                <LogOut size={20} />
                <span className="text-sm">Chiqish</span>
              </button>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        {/* Header */}
        <header className="h-16 bg-zinc-900/50 backdrop-blur-md border-b border-zinc-800 px-6 flex items-center justify-between">
          <button 
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 hover:bg-zinc-800 rounded-lg transition-colors lg:hidden"
          >
            <Menu size={20} />
          </button>

          <div className="flex-1 max-w-md mx-6 hidden md:block">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={16} />
              <input 
                type="text" 
                placeholder="Qidirish..." 
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    router.push(`/admin/dashboard/news?search=${(e.target as HTMLInputElement).value}`)
                  }
                }}
                className="w-full bg-zinc-800/50 border border-zinc-700 rounded-full py-2 pl-10 pr-4 text-xs focus:outline-none focus:border-yellow-500 transition-all text-white"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button className="relative p-2 hover:bg-zinc-800 rounded-lg transition-colors">
              <Bell size={20} className="text-zinc-400" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-yellow-500 rounded-full border-2 border-zinc-900" />
            </button>
            <div className="w-8 h-8 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center text-xs font-bold text-white">
              AD
            </div>
          </div>
        </header>

        {/* Page Area */}
        <main className="flex-1 overflow-y-auto p-6 md:p-10">
          {children}
        </main>
      </div>
    </div>
  )
}
