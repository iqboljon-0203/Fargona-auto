'use client'

import React, { useState } from 'react'
import { 
  Shield, 
  Save,
  Lock,
  ChevronRight
} from 'lucide-react'
import { motion } from 'framer-motion'
import { supabase } from '@/lib/supabase'

export default function AdminSettingsPage() {
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (newPassword !== confirmPassword) {
      alert('Parollar bir-biriga mos kelmadi!')
      return
    }

    if (newPassword.length < 6) {
      alert('Parol kamida 6 ta belgidan iborat bo\'lishi kerak!')
      return
    }

    setLoading(true)
    const { error } = await supabase.auth.updateUser({
      password: newPassword
    })

    if (error) {
      alert('Xatolik yuz berdi: ' + error.message)
    } else {
      alert('Parol muvaffaqiyatli o\'zgartirildi!')
      setNewPassword('')
      setConfirmPassword('')
    }
    setLoading(false)
  }

  return (
    <div className="space-y-8 text-white max-w-4xl mx-auto">
      <div>
        <h1 className="text-3xl font-black uppercase tracking-tighter">Xavfsizlik <span className="text-yellow-500">Sozlamalari</span></h1>
        <p className="text-zinc-500 text-sm mt-1">Admin panel parolini xavfsiz boshqaring</p>
      </div>

      <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 shadow-2xl overflow-hidden relative">
        {/* Background glow Decor */}
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-yellow-500/5 blur-[100px] rounded-full" />
        
        <div className="relative z-10 flex flex-col md:flex-row gap-12">
          {/* Left info side */}
          <div className="md:w-1/3 space-y-4">
            <div className="w-12 h-12 bg-yellow-500/10 rounded-2xl flex items-center justify-center text-yellow-500">
              <Shield size={24} />
            </div>
            <h3 className="text-lg font-bold uppercase tracking-tight">Parolni Yangilash</h3>
            <p className="text-zinc-500 text-xs leading-relaxed">
              Tizim xavfsizligini ta'minlash uchun parolingizni muntazam ravishda yangilab turing. Yangi parol kamida 6 ta belgidan iborat bo'lishi lozim.
            </p>
          </div>

          {/* Form side */}
          <div className="flex-1">
            <form onSubmit={handlePasswordChange} className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 ml-1">Yangi parol</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600" size={16} />
                  <input 
                    required
                    type="password" 
                    placeholder="••••••••" 
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full bg-zinc-800/50 border border-zinc-700 rounded-xl py-4 pl-12 pr-4 text-sm focus:outline-none focus:border-yellow-500 transition-all text-white placeholder:text-zinc-700 font-mono" 
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 ml-1">Yangi parolni tasdiqlang</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600" size={16} />
                  <input 
                    required
                    type="password" 
                    placeholder="••••••••" 
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full bg-zinc-800/50 border border-zinc-700 rounded-xl py-4 pl-12 pr-4 text-sm focus:outline-none focus:border-yellow-500 transition-all text-white placeholder:text-zinc-700 font-mono" 
                  />
                </div>
              </div>

              <div className="pt-4 flex items-center justify-end border-t border-zinc-800/50">
                <button 
                  type="submit"
                  disabled={loading}
                  className={`flex items-center gap-3 bg-yellow-500 hover:bg-yellow-400 text-black font-black uppercase text-xs px-10 py-4 rounded-2xl transition-all shadow-lg shadow-yellow-500/10 ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105 active:scale-95'}`}
                >
                  {loading ? (
                    <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <Save size={18} />
                  )}
                  {loading ? 'Saqlanmoqda...' : 'Parolni Saqlash'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Info Card */}
      <div className="bg-zinc-900/50 border border-zinc-800/50 rounded-2xl p-6 flex items-start gap-4">
        <div className="p-2 bg-blue-500/10 rounded-lg text-blue-500 shrink-0">
          <Shield size={16} />
        </div>
        <div className="space-y-1">
          <h4 className="text-xs font-bold uppercase tracking-wide text-zinc-300">Xavfsizlik bo'yicha tavsiya</h4>
          <p className="text-xs text-zinc-500 leading-relaxed">
            Parolda kamida bitta katta harf, raqam va maxsus belgi (!@#$%^&*) bo'lishi tavsiya etiladi. Hech qachon parolingizni boshqa shaxslarga bermang.
          </p>
        </div>
      </div>
    </div>
  )
}
