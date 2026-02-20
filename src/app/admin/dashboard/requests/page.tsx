'use client'

import React, { useState, useEffect } from 'react'
import { 
  Bell, 
  CheckCircle2, 
  Clock, 
  User, 
  Phone, 
  Car, 
  Trash2,
  MoreVertical,
  Mail,
  Search
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { supabase } from '@/lib/supabase'

export default function AdminRequestsPage() {
  const [requests, setRequests] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  const fetchRequests = async () => {
    setLoading(true)
    const { data, error } = await supabase
      .from('requests')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (data) setRequests(data)
    setLoading(false)
  }

  useEffect(() => {
    fetchRequests()
  }, [])

  const deleteRequest = async (id: string) => {
    if (confirm('Arizani o\'chirmoqchimisiz?')) {
      const { error } = await supabase.from('requests').delete().eq('id', id)
      if (!error) fetchRequests()
    }
  }

  const updateStatus = async (id: string, currentStatus: string) => {
    const newStatus = currentStatus === 'Yangi' ? 'Bog\'lanilgan' : 'Yangi'
    const { error } = await supabase.from('requests').update({ status: newStatus }).eq('id', id)
    if (!error) fetchRequests()
  }

  return (
    <div className="space-y-8 text-white">
      <div>
        <h1 className="text-3xl font-black uppercase tracking-tighter">Arizalar <span className="text-yellow-500">Boshqaruvi</span></h1>
        <p className="text-zinc-500 text-sm mt-1">Mijozlardan kelgan so'rovlarni kuzatib boring</p>
      </div>

      <div className="bg-zinc-900 border border-zinc-800 rounded-3xl overflow-hidden shadow-2xl">
        <div className="p-6 border-b border-zinc-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4 text-white">
            <button className="px-4 py-2 bg-yellow-500 text-black font-bold text-xs rounded-full uppercase tracking-widest">Hammasi</button>
            <button className="px-4 py-2 hover:bg-zinc-800 text-zinc-500 hover:text-white font-bold text-xs rounded-full uppercase tracking-widest transition-all">Yangi</button>
            <button className="px-4 py-2 hover:bg-zinc-800 text-zinc-500 hover:text-white font-bold text-xs rounded-full uppercase tracking-widest transition-all">Bog'lanilgan</button>
          </div>
          <div className="relative max-w-xs w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={16} />
            <input 
              type="text" 
              placeholder="Arizalarni qidirish..." 
              className="w-full bg-zinc-800 border border-zinc-700 rounded-xl py-2 pl-10 pr-4 text-xs focus:outline-none focus:border-yellow-500 transition-all text-white"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          {loading ? (
            <div className="p-20 text-center animate-pulse text-zinc-500 uppercase font-black tracking-widest">Yuklanmoqda...</div>
          ) : requests.length === 0 ? (
            <div className="p-20 text-center text-zinc-600 italic">Hozircha arizalar yo'q</div>
          ) : (
            <table className="w-full text-left border-collapse text-white">
              <thead>
                <tr className="bg-zinc-800/30">
                  <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-zinc-500">Mijoz</th>
                  <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-zinc-500">Aloqa</th>
                  <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-zinc-500">Model</th>
                  <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-zinc-500">Sana</th>
                  <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-zinc-500">Holat</th>
                  <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-zinc-500 text-right">Amallar</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800/50">
                <AnimatePresence>
                  {requests.map((req, i) => (
                    <motion.tr 
                      key={req.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.05 }}
                      className="group hover:bg-zinc-800/20 transition-all"
                    >
                      <td className="px-8 py-6">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center border border-zinc-700">
                            <User size={18} className="text-zinc-400" />
                          </div>
                          <span className="font-bold text-sm tracking-tight">{req.name}</span>
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <div className="flex flex-col gap-1">
                          <div className="flex items-center gap-2 text-xs text-zinc-400 group-hover:text-yellow-500 transition-colors">
                            <Phone size={12} />
                            +998{req.phone}
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-zinc-300">
                          <Car size={14} className="text-yellow-500" />
                          {req.model}
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <div className="flex items-center gap-2 text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
                          <Clock size={12} />
                          {new Date(req.created_at).toLocaleDateString('uz-UZ')}
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <span className={`text-[9px] font-black uppercase tracking-[0.1em] px-3 py-1 rounded-full cursor-pointer hover:scale-105 transition-transform ${
                          req.status === 'Yangi' 
                            ? 'bg-blue-500/10 text-blue-500 border border-blue-500/20' 
                            : 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20'
                        }`}
                        onClick={() => updateStatus(req.id, req.status)}
                        >
                          {req.status}
                        </span>
                      </td>
                      <td className="px-8 py-6">
                        <div className="flex items-center justify-end gap-2 outline-none">
                          <button className="p-2 text-zinc-500 hover:text-emerald-500 hover:bg-emerald-500/10 rounded-lg transition-all" title="Statusni o'zgartirish" onClick={() => updateStatus(req.id, req.status)}>
                            <CheckCircle2 size={18} />
                          </button>
                          <button className="p-2 text-zinc-500 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-all" title="O'chirish" onClick={() => deleteRequest(req.id)}>
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </tbody>
            </table>
          )}
        </div>

        <div className="p-6 border-t border-zinc-800 flex items-center justify-between text-xs text-zinc-500 font-bold uppercase tracking-widest">
          <span>Jami: {requests.length} ta ariza</span>
        </div>
      </div>
    </div>
  )
}
