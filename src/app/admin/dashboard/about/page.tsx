'use client'

import React, { useState, useEffect } from 'react'
import { 
  Plus, 
  Save, 
  Image as ImageIcon, 
  Users, 
  Zap,
  Loader2
} from 'lucide-react'
import { supabase } from '@/lib/supabase'

export default function AdminAboutPage() {
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [aboutData, setAboutData] = useState({
    id: null,
    title: 'Biz Haqimizda',
    subtitle: 'Rasmiy Chevrolet Diller',
    description: '',
    experience_years: '15+',
    happy_customers: '5 000+',
    service_done: '8 000+',
    guarantee: '100%',
    image_main: '',
    image_tahoe: '',
    image_traverse: ''
  })

  useEffect(() => {
    fetchAbout()
  }, [])

  const fetchAbout = async () => {
    setLoading(true)
    try {
      const { data, error } = await supabase
        .from('about')
        .select('*')
        .maybeSingle()
      
      if (data) {
        setAboutData(data)
      } else if (error) {
        console.error('Error fetching about:', error)
      }
    } catch (err) {
      console.error('Fetch error:', err)
    } finally {
      setLoading(false)
    }
  }

  const uploadImage = async (file: File) => {
    const fileExt = file.name.split('.').pop()
    const fileName = `${Math.random()}.${fileExt}`
    const filePath = `about/${fileName}`

    const { error: uploadError } = await supabase.storage
      .from('news-images')
      .upload(filePath, file)

    if (uploadError) throw uploadError

    const { data: { publicUrl } } = supabase.storage
      .from('news-images')
      .getPublicUrl(filePath)

    return publicUrl
  }

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>, field: string) => {
    if (e.target.files && e.target.files[0]) {
      setSaving(true)
      try {
        const url = await uploadImage(e.target.files[0])
        setAboutData(prev => ({ ...prev, [field]: url }))
      } catch (error: any) {
        alert('Rasm yuklashda xatolik: ' + error.message)
      } finally {
        setSaving(false)
      }
    }
  }

  const handleSave = async () => {
    setSaving(true)
    try {
      const { id, ...dataToSave } = aboutData

      let result;
      
      if (id) {
        // Agar ID bo'lsa - yangilaymiz
        result = await supabase
          .from('about')
          .update(dataToSave)
          .eq('id', id)
      } else {
        // Agar ID bo'lmasa - yangi qo'shamiz
        result = await supabase
          .from('about')
          .insert([dataToSave])
      }

      if (!result.error) {
        alert('Ma\'lumotlar muvaffaqiyatli saqlandi!')
        fetchAbout()
      } else {
        console.error('Supabase error:', result.error)
        alert('Xatolik: ' + result.error.message)
      }
    } catch (err: any) {
      console.error('System error:', err)
      alert('Tizim xatosi: ' + err.message)
    } finally {
      setSaving(false)
    }
  }

  if (loading) return (
    <div className="flex h-[60vh] items-center justify-center">
      <Loader2 className="animate-spin text-yellow-500" size={48} />
    </div>
  )

  return (
    <div className="space-y-8 text-white max-w-6xl mx-auto pb-20">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-black uppercase tracking-tighter">Sahifa <span className="text-yellow-500">Sozlamalari</span></h1>
          <p className="text-zinc-500 text-sm mt-1">"Biz haqimizda" bo'limi tarkibini boshqaring</p>
        </div>
        <button 
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 bg-yellow-500 hover:bg-yellow-400 text-black font-black uppercase text-xs px-8 py-4 rounded-2xl transition-all shadow-lg shadow-yellow-500/10 disabled:opacity-50"
        >
          {saving ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />}
          Saqlash
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6 bg-zinc-900 border border-zinc-800 rounded-3xl p-8 shadow-2xl">
          <h3 className="text-lg font-bold uppercase tracking-tight flex items-center gap-3">
            <Users className="text-yellow-500" size={20} />
            Matnlar va Ma'lumotlar
          </h3>
          
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 ml-1">Kichik Sarlavha</label>
                <input 
                  type="text" 
                  value={aboutData.subtitle}
                  onChange={e => setAboutData({...aboutData, subtitle: e.target.value})}
                  className="w-full bg-zinc-800/50 border border-zinc-700 rounded-xl py-3 px-4 text-sm focus:border-yellow-500 transition-all outline-none" 
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 ml-1">Asosiy Sarlavha</label>
                <input 
                  type="text" 
                  value={aboutData.title}
                  onChange={e => setAboutData({...aboutData, title: e.target.value})}
                  className="w-full bg-zinc-800/50 border border-zinc-700 rounded-xl py-3 px-4 text-sm focus:border-yellow-500 transition-all outline-none" 
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 ml-1">Tavsif (Asosiy matn)</label>
              <textarea 
                rows={8}
                value={aboutData.description}
                onChange={e => setAboutData({...aboutData, description: e.target.value})}
                className="w-full bg-zinc-800/50 border border-zinc-700 rounded-xl py-3 px-4 text-sm focus:border-yellow-500 transition-all outline-none resize-none leading-relaxed" 
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 ml-1">Yillik tajriba</label>
                <input type="text" value={aboutData.experience_years} onChange={e => setAboutData({...aboutData, experience_years: e.target.value})} className="w-full bg-zinc-800/50 border border-zinc-700 rounded-xl py-3 px-4 text-sm outline-none" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 ml-1">Mijozlar soni</label>
                <input type="text" value={aboutData.happy_customers} onChange={e => setAboutData({...aboutData, happy_customers: e.target.value})} className="w-full bg-zinc-800/50 border border-zinc-700 rounded-xl py-3 px-4 text-sm outline-none" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 ml-1">Xizmatlar soni</label>
                <input type="text" value={aboutData.service_done} onChange={e => setAboutData({...aboutData, service_done: e.target.value})} className="w-full bg-zinc-800/50 border border-zinc-700 rounded-xl py-3 px-4 text-sm outline-none" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 ml-1">Kafolat (%)</label>
                <input type="text" value={aboutData.guarantee} onChange={e => setAboutData({...aboutData, guarantee: e.target.value})} className="w-full bg-zinc-800/50 border border-zinc-700 rounded-xl py-3 px-4 text-sm outline-none" />
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 shadow-2xl">
            <h3 className="text-lg font-bold uppercase tracking-tight flex items-center gap-3 mb-6">
              <ImageIcon className="text-yellow-500" size={20} />
              Galereya va Rasmlar
            </h3>

            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">Showroom (Katta rasm)</label>
                <label className="relative block h-48 bg-zinc-800 rounded-2xl overflow-hidden cursor-pointer group border-2 border-dashed border-zinc-700 hover:border-yellow-500 transition-all">
                  <input type="file" onChange={e => handleImageChange(e, 'image_main')} className="hidden" />
                  {aboutData.image_main ? (
                    <img src={aboutData.image_main} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  ) : (
                    <div className="flex flex-col items-center justify-center h-full text-zinc-500 gap-2">
                      <Plus size={24} />
                      <span className="text-[10px] font-bold uppercase">Rasm yuklash</span>
                    </div>
                  )}
                </label>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">Tahoe</label>
                  <label className="relative block h-32 bg-zinc-800 rounded-2xl overflow-hidden cursor-pointer group border-2 border-dashed border-zinc-700 hover:border-yellow-500 transition-all">
                    <input type="file" onChange={e => handleImageChange(e, 'image_tahoe')} className="hidden" />
                    {aboutData.image_tahoe ? (
                      <img src={aboutData.image_tahoe} className="w-full h-full object-cover" />
                    ) : (
                      <div className="flex items-center justify-center h-full text-zinc-500">
                        <Plus size={20} />
                      </div>
                    )}
                  </label>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">Traverse</label>
                  <label className="relative block h-32 bg-zinc-800 rounded-2xl overflow-hidden cursor-pointer group border-2 border-dashed border-zinc-700 hover:border-yellow-500 transition-all">
                    <input type="file" onChange={e => handleImageChange(e, 'image_traverse')} className="hidden" />
                    {aboutData.image_traverse ? (
                      <img src={aboutData.image_traverse} className="w-full h-full object-cover" />
                    ) : (
                      <div className="flex items-center justify-center h-full text-zinc-500">
                        <Plus size={20} />
                      </div>
                    )}
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-yellow-500/5 border border-yellow-500/10 rounded-2xl p-6">
            <div className="flex gap-3">
              <Zap className="text-yellow-500 shrink-0" size={18} />
              <p className="text-[10px] text-zinc-400 leading-relaxed uppercase tracking-wider">
                Ma'lumotlarni saqlashdan oldin rasmlar to'g'ri yuklanganligiga ishonch hosil qiling. O'zgarishlar saytda darhol aks etadi.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
