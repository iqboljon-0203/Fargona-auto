'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Plus, 
  Trash2, 
  Edit3, 
  Search, 
  Filter, 
  ExternalLink,
  Save,
  X,
  Image as ImageIcon,
  Newspaper as NewspaperIcon
} from 'lucide-react'
import { supabase } from '@/lib/supabase'
import { parseLocalizedField, getLocalizedText } from '@/lib/i18n-utils'

import { useRouter, useSearchParams } from 'next/navigation'
import { Suspense } from 'react'

function AdminNewsContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const defaultSearch = searchParams.get('search') || ''
  
  const [isAdding, setIsAdding] = useState(false)
  const [editId, setEditId] = useState<string | null>(null)
  const [news, setNews] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)
  const [file, setFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [activeLang, setActiveLang] = useState('uz')
  const [formData, setFormData] = useState({ 
    title: {uz:'', ru:'', en:''}, 
    excerpt: {uz:'', ru:'', en:''}, 
    content: {uz:'', ru:'', en:''}, 
    category: {uz:'Yangilik', ru:'Новость', en:'News'}, 
    image: '' 
  })
  const [searchQuery, setSearchQuery] = useState(defaultSearch)

  useEffect(() => {
    setSearchQuery(searchParams.get('search') || '')
  }, [searchParams])

  const fetchNews = async () => {
    setLoading(true)
    const { data, error } = await supabase
      .from('news')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (data) setNews(data)
    setLoading(false)
    return data // Return data for auto-migrate check
  }

  const autoMigrate = async () => {
    const staticNews = [
      {
        slug: 'chevrolet-tracker-2026-yangilangan-versiya',
        title: 'Chevrolet Tracker 2026 — yangilangan versiya taqdim etildi',
        excerpt: "Farg'ona Avtotexxizmat-F showroomida Tracker-ning yangilangan 2026 yil versiyasi rasman taqdim etildi. Yangi model zamonaviy dizayn va kengaytirilgan xususiyatlar bilan jihozlangan.",
        content: `<p>Farg'ona Avtotexxizmat-F showroomida Tracker-ning yangilangan 2026 yil versiyasi rasman taqdim etildi. Yangi model zamonaviy dizayn va kengaytirilgan xususiyatlar bilan jihozlangan. Ushbu modelda haydovchi va yo'lovchilar uchun qulayliklar yanada oshirildi.</p><p>Yangi Tracker quyidagi o'zgarishlarga ega:</p><ul><li>Yangilangan old panjara va LED faralar.</li><li>Kengaytirilgan multimedia tizimi va raqamli asboblar paneli.</li><li>Yaxshilangan xavfsizlik tizimlari, jumladan avtomatik to'xtash yordamchisi.</li><li>Yoqilg'i tejamkorligi oshirilgan yangi avlod dvigateli.</li></ul><p>Avtomobilni bugunoq dillerimizdan xarid qilishingiz mumkin. Batafsil ma'lumot uchun biz bilan bog'laning.</p>`,
        image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?q=80&w=1000&auto=format&fit=crop',
        category: 'Yangi model',
        featured: true,
      },
      {
        slug: 'foizsiz-muddatli-tolov-2026-yanvar',
        title: "Foizsiz muddatli to'lov: 2026 yil yanvar imkoniyatlari",
        excerpt: "Yanvar oyida Chevrolet avtomobillarini 0% foiz bilan muddatli to'lovga sotib olish imkoniyati.",
        content: `<p>Yanvar oyida Chevrolet avtomobillarini 0% foiz bilan muddatli to'lovga sotib olish imkoniyati taqdim etiladi. Bu aksiya doirasida siz:</p><ul><li>Chevrolet Onix va Tracker modellari uchun maxsus shartlar.</li><li>Boshlang'ich to'lov 30% dan boshlanadi.</li><li>To'lov muddati 18 oygacha foizsiz.</li></ul><p>Aksiya muddati cheklangan. Shoshiling, imkoniyatdan foydalanib qoling!</p>`,
        image: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?q=80&w=1000&auto=format&fit=crop',
        category: 'Aksiya',
        featured: false,
      },
      {
        slug: 'chevrolet-tahoe-2026-kuchli-v8',
        title: 'Chevrolet Tahoe 2026: kuchli V8 va yangi Premium paket',
        excerpt: "Tahoe-ning yangi avlodi 5.3L V8 dvigatel va yangilangan multimedia tizimi bilan yetib keldi.",
        content: `<p>Tahoe-ning yangi avlodi 5.3L V8 dvigatel va yangilangan multimedia tizimi bilan yetib keldi. Bu haqiqiy kuch va hashamat uyg'unligi.</p><p>Yangi modelda nimalar bor?</p><ul><li>5.3L V8 Ecotec3 dvigateli, 355 ot kuchi.</li><li>10 bosqichli avtomat uzatmalar qutisi.</li><li>Premium charm salon va yog'och qoplamalar.</li><li>Magnetic Ride Control suspenziyasi.</li></ul><p>Sinov haydovi (Test Drive) ga yozilish uchun hoziroq qo'ng'iroq qiling.</p>`,
        image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=1000&auto=format&fit=crop',
        category: "Yangilik",
        featured: false,
      },
      {
        slug: 'trade-in-xizmati-eski-avtomobilingizni-yangisiga-almashtiring',
        title: 'Trade-In xizmati: eski avtomobilingizni yangisiga almashtiring',
        excerpt: "Har qanday markadagi avtomobilingizni bozor narxida qabul qilamiz va yangi Chevrolet xarid qilishingizga yordam beramiz.",
        content: `<p>Trade-In dasturi orqali eski avtomobilingizni yeni Chevrolet ga almashtirish endi yanada oson. Biz sizning avtomobilingizni bozor narxida baholaymiz va yangi avtomobil narxidan chegirib beramiz.</p><p>Afzalliklari:</p><ul><li>Tezkor baholash va rasmiylashtirish.</li><li>Bozor narxida adolatli baho.</li><li>Eski avtomobilni sotish tashvishlaridan xalos bo'lasiz.</li><li>Yangi avtomobilni bir kun ichida haydab ketishingiz mumkin.</li></ul><p>Batafsil ma'lumot uchun Trade-In bo'limiga murojaat qiling.</p>`,
        image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?q=80&w=1000&auto=format&fit=crop',
        category: 'Xizmat',
        featured: false,
      }
    ]

    console.log('Auto-migration starting...')
    const { error } = await supabase.from('news').insert(staticNews)
    if (!error) {
      console.log('Auto-migration successful')
      fetchNews()
    } else {
      console.error('Auto-migration error:', error)
    }
  }

  useEffect(() => {
    fetchNews().then((data: any) => {
      // If table is empty, auto-migrate
      if (data && data.length === 0) {
        autoMigrate()
      }
    })
  }, [])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0]
      setFile(selectedFile)
      setImagePreview(URL.createObjectURL(selectedFile))
    }
  }

  const uploadImage = async (file: File) => {
    try {
      const fileExt = file.name.split('.').pop()
      const fileName = `${Math.random()}.${fileExt}`
      const filePath = `news/${fileName}`

      const { error: uploadError, data } = await supabase.storage
        .from('news-images')
        .upload(filePath, file)

      if (uploadError) {
        if (uploadError.message.includes('bucket not found')) {
          throw new Error("Supabase-da 'news-images' bucketi ochilmagan. Iltimos, Storage bo'limida 'news-images' nomli public bucket yarating.")
        }
        throw uploadError
      }

      const { data: { publicUrl } } = supabase.storage
        .from('news-images')
        .getPublicUrl(filePath)

      return publicUrl
    } catch (error: any) {
      console.error('Upload process error:', error)
      throw error
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setUploading(true)
    
    try {
      let imageUrl = formData.image

      // If a new file is selected, upload it
      if (file) {
        console.log('Uploading file...', file.name)
        imageUrl = await uploadImage(file)
        console.log('File uploaded, URL:', imageUrl)
      }

      // Improved slug generation
      const baseTitle = typeof formData.title === 'string' ? formData.title : (formData.title as any).uz || (formData.title as any).ru || 'post';
      const slug = baseTitle
        .toLowerCase()
        .trim()
        .replace(/o'/g, 'o')
        .replace(/g'/g, 'g')
        .replace(/sh/g, 'sh')
        .replace(/ch/g, 'ch')
        .replace(/['`]/g, '')
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/[\s-]+/g, '-')
        .replace(/^-+|-+$/g, '')
      
      const payload = {
        title: JSON.stringify(formData.title),
        excerpt: JSON.stringify(formData.excerpt),
        content: JSON.stringify(formData.content),
        category: JSON.stringify(formData.category),
        image: imageUrl,
        slug
      }
      
      if (editId) {
        const { error } = await supabase
          .from('news')
          .update(payload)
          .eq('id', editId)

        if (!error) {
          alert('Yangilik muvaffaqiyatli tahrirlandi!')
          resetForm()
          fetchNews()
        } else throw error
      } else {
        const { error } = await supabase.from('news').insert([payload])

        if (!error) {
          alert('Yangilik muvaffaqiyatli qo\'shildi!')
          resetForm()
          fetchNews()
        } else throw error
      }
    } catch (error: any) {
      console.error('Submit error:', error)
      alert('Xatolik yuz berdi: ' + error.message)
    } finally {
      setUploading(false)
    }
  }

  const resetForm = () => {
    setIsAdding(false)
    setEditId(null)
    setFile(null)
    setImagePreview(null)
    setFormData({ 
      title: {uz:'', ru:'', en:''}, 
      excerpt: {uz:'', ru:'', en:''}, 
      content: {uz:'', ru:'', en:''}, 
      category: {uz:'Yangilik', ru:'Новость', en:'News'}, 
      image: '' 
    })
  }

  const scrollToForm = () => {
    setTimeout(() => {
      const element = document.getElementById('news-form')
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }, 100)
  }

  const handleAddNew = () => {
    resetForm()
    setIsAdding(true)
    scrollToForm()
  }

  const handleEdit = (item: any) => {
    setFormData({
      title: parseLocalizedField(item.title),
      excerpt: parseLocalizedField(item.excerpt),
      content: parseLocalizedField(item.content),
      category: parseLocalizedField(item.category),
      image: item.image || ''
    })
    setImagePreview(item.image || null)
    setEditId(item.id)
    setIsAdding(true)
    scrollToForm()
  }

  const deleteNews = async (id: string) => {
    if (confirm('Ushbu yangilikni o\'chirib tashlamoqchimisiz?')) {
      const { error } = await supabase.from('news').delete().eq('id', id)
      if (!error) fetchNews()
    }
  }

  const filteredNews = news.filter(item => 
    item.title?.toLowerCase().includes(searchQuery.toLowerCase()) || 
    item.category?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.excerpt?.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="space-y-8 text-white">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black uppercase tracking-tighter">Yangiliklar <span className="text-yellow-500">Boshqaruvi</span></h1>
          <p className="text-zinc-500 text-sm mt-1">Yangiliklarni qo'shing yoki mavjudlarini tahrirlang</p>
        </div>
        <button 
          onClick={handleAddNew}
          className="flex items-center gap-2 bg-yellow-500 hover:bg-yellow-400 text-black font-bold uppercase text-xs px-6 py-3 rounded-xl transition-all shadow-lg shadow-yellow-500/10"
        >
          <Plus size={18} />
          Yangi Qo'shish
        </button>
      </div>

      {/* Grid container */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* List Column */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 flex items-center justify-between gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={16} />
              <input 
                type="text" 
                placeholder="Yangiliklarda qidirish..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-zinc-800/50 border border-zinc-700 rounded-xl py-2 pl-10 pr-4 text-xs focus:outline-none focus:border-yellow-500 transition-all text-white"
              />
            </div>
            <button className="p-2.5 bg-zinc-800 rounded-xl text-zinc-400 hover:text-white transition-all">
              <Filter size={18} />
            </button>
          </div>

          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl overflow-hidden">
            <div className="overflow-x-auto">
              {loading ? (
                <div className="p-20 text-center animate-pulse text-zinc-500 uppercase font-black tracking-widest">Yuklanmoqda...</div>
              ) : filteredNews.length === 0 ? (
                <div className="p-20 text-center text-zinc-600 italic">Hech narsa topilmadi</div>
              ) : (
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-zinc-800 bg-zinc-800/30">
                      <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-zinc-500">Mavzu</th>
                      <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-zinc-500">Kategoriya</th>
                      <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-zinc-500">Sana</th>
                      <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-zinc-500 text-right">Amallar</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-800">
                    {filteredNews.map((item) => (
                      <tr key={item.id} className="group hover:bg-zinc-800/30 transition-colors">
                        <td className="px-6 py-5">
                          <p className="text-sm font-bold text-white line-clamp-1 group-hover:text-yellow-500 transition-colors">{getLocalizedText(item.title, 'uz')}</p>
                        </td>
                        <td className="px-6 py-5">
                          <span className="text-[10px] font-bold uppercase tracking-widest bg-zinc-800 px-2 py-1 rounded-full text-zinc-400">
                            {getLocalizedText(item.category, 'uz')}
                          </span>
                        </td>
                        <td className="px-6 py-5 text-xs text-zinc-500">
                          {new Date(item.created_at).toLocaleDateString('uz-UZ')}
                        </td>
                        <td className="px-6 py-5">
                          <div className="flex items-center justify-end gap-2">
                            <button 
                              onClick={() => handleEdit(item)}
                              className="p-2 text-zinc-500 hover:text-yellow-500 hover:bg-yellow-500/10 rounded-lg transition-all"
                            >
                              <Edit3 size={16} />
                            </button>
                            <button 
                              onClick={() => deleteNews(item.id)}
                              className="p-2 text-zinc-500 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-all"
                            >
                              <Trash2 size={16} />
                            </button>
                            <button className="p-2 text-zinc-500 hover:text-white hover:bg-zinc-800 rounded-lg transition-all">
                              <ExternalLink size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>

        {/* Form / Sidebar Column */}
        <div id="news-form" className="lg:col-span-1 text-white">
          {isAdding ? (
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 sticky top-6"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold uppercase tracking-tighter">
                  {editId ? 'Yangilikni Tahrirlash' : 'Yangi Yangilik'}
                </h3>
                <button onClick={resetForm} className="text-zinc-500 hover:text-white transition-colors">
                  <X size={20} />
                </button>
              </div>

              <div className="flex border border-zinc-800 rounded-xl overflow-hidden shadow-lg p-1 bg-zinc-900 w-fit mb-6">
                {(['uz', 'ru', 'en'] as const).map(l => (
                  <button type="button" key={l} onClick={() => setActiveLang(l)} className={`px-4 py-2 text-xs font-bold uppercase rounded-lg transition-all ${activeLang === l ? 'bg-yellow-500 text-black' : 'text-zinc-400 hover:text-white hover:bg-zinc-800'}`}>{l}</button>
                ))}
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 ml-1">Mavzu</label>
                  <input 
                    required={activeLang === 'uz'}
                    type="text" 
                    placeholder={`Yangilik sarlavhasi (${activeLang.toUpperCase()})`}
                    value={(formData.title as any)[activeLang] || ''}
                    onChange={e => setFormData({...formData, title: {...formData.title, [activeLang]: e.target.value}})}
                    className="w-full bg-zinc-800/50 border border-zinc-700 rounded-xl py-3 px-4 text-sm focus:outline-none focus:border-yellow-500 transition-all text-white"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 ml-1">Kategoriya</label>
                  <input 
                    required={activeLang === 'uz'}
                    type="text" 
                    placeholder={`Kategoriya rasmiy nomi (${activeLang.toUpperCase()})`}
                    value={(formData.category as any)[activeLang] || ''}
                    onChange={e => setFormData({...formData, category: {...formData.category, [activeLang]: e.target.value}})}
                    className="w-full bg-zinc-800/50 border border-zinc-700 rounded-xl py-3 px-4 text-sm focus:outline-none focus:border-yellow-500 transition-all text-white"
                  />
                  <p className="text-[10px] text-zinc-500 ml-1 italic">* "Yangilik", "Yangi model", "Aksiya" yoki "Xizmat" kabi yoza olasiz</p>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 ml-1">Rasim</label>
                  <label className="relative border-2 border-dashed border-zinc-800 rounded-2xl p-4 flex flex-col items-center justify-center gap-3 hover:border-yellow-500/50 transition-all cursor-pointer group min-h-[160px] overflow-hidden">
                    <input 
                      type="file" 
                      accept="image/*"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                    {imagePreview ? (
                      <div className="absolute inset-0 w-full h-full">
                        <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <ImageIcon size={24} className="text-white" />
                        </div>
                      </div>
                    ) : (
                      <>
                        <div className="p-3 bg-zinc-800 rounded-xl text-zinc-500 group-hover:text-yellow-500 transition-colors">
                          <ImageIcon size={24} />
                        </div>
                        <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-600">Rasimni tanlang</p>
                      </>
                    )}
                  </label>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 ml-1">Qisqacha mazmun</label>
                  <textarea 
                    rows={2}
                    placeholder={`Yangilik haqida qisqacha... (${activeLang.toUpperCase()})`}
                    value={(formData.excerpt as any)[activeLang] || ''}
                    onChange={e => setFormData({...formData, excerpt: {...formData.excerpt, [activeLang]: e.target.value}})}
                    className="w-full bg-zinc-800/50 border border-zinc-700 rounded-xl py-3 px-4 text-sm focus:outline-none focus:border-yellow-500 transition-all resize-none text-white placeholder:text-zinc-600"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 ml-1">To'liq matn</label>
                  <textarea 
                    required={activeLang === 'uz'}
                    rows={6}
                    placeholder={`Yangilikning to'liq tafsilotlari... (${activeLang.toUpperCase()})`}
                    value={(formData.content as any)[activeLang] || ''}
                    onChange={e => setFormData({...formData, content: {...formData.content, [activeLang]: e.target.value}})}
                    className="w-full bg-zinc-800/50 border border-zinc-700 rounded-xl py-3 px-4 text-sm focus:outline-none focus:border-yellow-500 transition-all resize-none text-white placeholder:text-zinc-600"
                  />
                </div>

                <button 
                  type="submit"
                  disabled={uploading}
                  className={`w-full bg-yellow-500 hover:bg-yellow-400 text-black font-black uppercase tracking-widest py-4 rounded-xl transition-all shadow-lg shadow-yellow-500/20 flex items-center justify-center gap-2 mt-4 ${uploading ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  {uploading ? (
                    <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <Save size={18} />
                  )}
                  {uploading ? 'Yuklanmoqda...' : (editId ? 'Yangilash' : 'Saqlash')}
                </button>
              </form>
            </motion.div>
          ) : (
            <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 flex flex-col items-center justify-center text-center h-[400px]">
              <div className="w-16 h-16 bg-zinc-800 rounded-2xl flex items-center justify-center text-zinc-600 mb-4">
                <NewspaperIcon size={32} />
              </div>
              <h4 className="text-lg font-bold uppercase tracking-tighter mb-2">Yangilik Tanlash</h4>
              <p className="text-zinc-500 text-xs leading-relaxed max-w-[200px]">
                Tahrirlash uchun ro'yxatdan yangilikni tanlang yoki yangisini qo'shing.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default function AdminNewsPage() {
  return (
    <Suspense fallback={<div className="p-20 text-center animate-pulse text-zinc-500 uppercase font-black tracking-widest">Yuklanmoqda...</div>}>
      <AdminNewsContent />
    </Suspense>
  )
}
