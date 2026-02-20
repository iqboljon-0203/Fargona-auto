'use client'

import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Users, 
  Newspaper, 
  TrendingUp, 
  Clock,
  ArrowUpRight,
  Plus
} from 'lucide-react'
import { supabase } from '@/lib/supabase'
import Link from 'next/link'

export default function DashboardPage() {
  const [stats, setStats] = useState([
    { label: 'Jami Arizalar', value: '0', icon: Users, color: 'text-blue-500', trend: '...' },
    { label: 'Yangiliklar', value: '0', icon: Newspaper, color: 'text-emerald-500', trend: '...' },
    { label: 'Ko\'rishlar', value: '1.2k', icon: TrendingUp, color: 'text-purple-500', trend: '+18%' },
  ])
  const [recentActivities, setRecentActivities] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchStats() {
      try {
        // Fetch requests count
        const { count: requestsCount, error: reqError } = await supabase
          .from('requests')
          .select('*', { count: 'exact', head: true })

        // Fetch news count
        const { count: newsCount, error: newsError } = await supabase
          .from('news')
          .select('*', { count: 'exact', head: true })
          
        // Fetch page views
        const { data: viewsData } = await supabase
          .from('page_views')
          .select('views')
          .eq('id', 1)
          .single()
        
        // Fetch recent news for activity
        const { data: latestNews } = await supabase
          .from('news')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(3)

        if (reqError || newsError) throw new Error('Data fetch error')

        setStats([
          { label: 'Jami Arizalar', value: (requestsCount || 0).toString(), icon: Users, color: 'text-blue-500', trend: 'Real vaqt' },
          { label: 'Yangiliklar', value: (newsCount || 0).toString(), icon: Newspaper, color: 'text-emerald-500', trend: 'Real vaqt' },
          { label: 'Ko\'rishlar', value: (viewsData?.views || 0).toString(), icon: TrendingUp, color: 'text-purple-500', trend: 'Real vaqt' },
        ])

        if (latestNews) {
          setRecentActivities(latestNews)
        }

      } catch (err) {
        console.error('Stats fetch error:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
  }, [])

  return (
    <div className="space-y-10 text-white">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black uppercase tracking-tighter">Xush kelibsiz, <span className="text-yellow-500">Admin</span></h1>
          <p className="text-zinc-500 text-sm mt-1">Bugungi statistikalar bilan tanishing</p>
        </div>
        <Link href="/admin/dashboard/news" className="flex items-center gap-2 bg-yellow-500 hover:bg-yellow-400 text-black font-bold uppercase text-xs px-6 py-3 rounded-xl transition-all shadow-lg shadow-yellow-500/10">
          <Plus size={18} />
          Yangi Yangilik Qo'shish
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-zinc-900 border border-zinc-800 p-6 rounded-3xl"
          >
            <div className="flex items-start justify-between mb-4">
              <div className={`p-3 rounded-2xl bg-zinc-800 ${stat.color}`}>
                <stat.icon size={24} />
              </div>
              <div className="flex items-center gap-1 text-[10px] font-bold text-emerald-500 bg-emerald-500/10 px-2 py-1 rounded-full">
                <ArrowUpRight size={12} />
                {stat.trend}
              </div>
            </div>
            <p className="text-zinc-500 text-xs font-bold uppercase tracking-widest">{stat.label}</p>
            <h3 className="text-3xl font-black mt-1">
              {loading ? <span className="animate-pulse">...</span> : stat.value}
            </h3>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Activity */}
        <div className="lg:col-span-2 bg-zinc-900 border border-zinc-800 rounded-3xl p-8">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-bold uppercase tracking-tighter flex items-center gap-3 text-white">
              <Clock className="text-yellow-500" size={20} />
              Oxirgi faolliklar
            </h3>
            <Link href="/admin/dashboard/news" className="text-xs text-zinc-500 hover:text-white transition-colors uppercase font-bold tracking-widest">Hammasi</Link>
          </div>

          <div className="space-y-6">
            {recentActivities.length > 0 ? recentActivities.map((activity, i) => (
              <div key={i} className="flex items-center gap-4 group">
                <div className="w-12 h-12 rounded-xl bg-zinc-800 overflow-hidden shrink-0 flex items-center justify-center">
                  <Newspaper size={20} className="text-zinc-500" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-white line-clamp-1 group-hover:text-yellow-500 transition-colors">
                    {activity.title}
                  </p>
                  <p className="text-xs text-zinc-500 mt-0.5">
                    {new Date(activity.created_at).toLocaleString('uz-UZ')} • Yangilik qo'shildi
                  </p>
                </div>
                <Link href="/admin/dashboard/news" className="text-xs font-bold text-zinc-500 hover:text-white p-2 rounded-lg hover:bg-zinc-800 transition-all uppercase tracking-widest">
                  Tahrirlash
                </Link>
              </div>
            )) : (
              <p className="text-zinc-600 text-sm italic">Hozircha faolliklar yo'q</p>
            )}
          </div>
        </div>

        {/* Quick Tips */}
        <div className="bg-yellow-500 rounded-3xl p-8 flex flex-col justify-between overflow-hidden relative group">
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/20 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-1000" />
          <div className="relative z-10">
            <h3 className="text-2xl font-black text-black uppercase tracking-tighter leading-tight mb-4">
              Ma'lumotlarni <br />Boshqarish
            </h3>
            <p className="text-black/70 text-sm leading-relaxed mb-8">
              Yangiliklarni shu yerdan real vaqtda boshqaring. Barcha arizalar bazada xavfsiz saqlanadi.
            </p>
          </div>
          <Link href="/admin/dashboard/requests" className="relative z-10 w-full text-center block bg-black text-white font-bold uppercase tracking-widest text-xs py-4 rounded-2xl hover:bg-zinc-900 transition-all">
            Arizalarni ko'rish
          </Link>
        </div>
      </div>
    </div>
  )
}
