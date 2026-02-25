'use client'

import React, { useState, useEffect, Suspense } from 'react'
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
  FileText,
  File as FileIcon,
  Download
} from 'lucide-react'
import { supabase } from '@/lib/supabase'
import { parseLocalizedField, getLocalizedText } from '@/lib/i18n-utils'
import { useRouter, useSearchParams } from 'next/navigation'

function AdminReportsContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const defaultSearch = searchParams.get('search') || ''
  
  const [isAdding, setIsAdding] = useState(false)
  const [editId, setEditId] = useState<string | null>(null)
  const [reports, setReports] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)
  
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  
  const [docFile, setDocFile] = useState<File | null>(null)
  
  const [activeLang, setActiveLang] = useState('uz')
  const [formData, setFormData] = useState({ 
    title: {uz:'', ru:'', en:''}, 
    description: {uz:'', ru:'', en:''}, 
    content: {uz:'', ru:'', en:''},
    image: '',
    file_url: '',
    file_name: ''
  })
  const [searchQuery, setSearchQuery] = useState(defaultSearch)

  useEffect(() => {
    setSearchQuery(searchParams.get('search') || '')
  }, [searchParams])

  const fetchReports = async () => {
    setLoading(true)
    const { data, error } = await supabase
      .from('reports')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (data) setReports(data)
    setLoading(false)
  }

  useEffect(() => {
    fetchReports()
  }, [])

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0]
      setImageFile(selectedFile)
      setImagePreview(URL.createObjectURL(selectedFile))
    }
  }

  const handleDocChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0]
      setDocFile(selectedFile)
      setFormData({ ...formData, file_name: selectedFile.name })
    }
  }

  const uploadFile = async (file: File, folder: string) => {
    try {
      const fileExt = file.name.split('.').pop()
      const fileName = `${Math.random().toString(36).substring(2, 15)}.${fileExt}`
      const filePath = `${folder}/${fileName}`

      const { error: uploadError, data } = await supabase.storage
        .from('reports')
        .upload(filePath, file)

      if (uploadError) {
        if (uploadError.message.includes('bucket not found')) {
          throw new Error("Supabase-da 'reports' bucketi ochilmagan. Iltimos, Storage bo'limida 'reports' nomli public bucket yarating.")
        }
        throw uploadError
      }

      const { data: { publicUrl } } = supabase.storage
        .from('reports')
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
      let docUrl = formData.file_url

      if (imageFile) {
        imageUrl = await uploadFile(imageFile, 'images')
      }

      if (docFile) {
        docUrl = await uploadFile(docFile, 'docs')
      }

      // Generate slug from UZ title or random if empty
      const baseTitle = typeof formData.title === 'string' ? formData.title : (formData.title as any).uz || (formData.title as any).ru || 'hisobot';
      const generatedSlug = baseTitle
        .toLowerCase()
        .trim()
        .replace(/o'/g, 'o')
        .replace(/g'/g, 'g')
        .replace(/sh/g, 'sh')
        .replace(/ch/g, 'ch')
        .replace(/[\'`]/g, '')
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/[\s-]+/g, '-')
        .replace(/^-+|-+$/g, '')

      const payload = {
        title: JSON.stringify(formData.title),
        description: JSON.stringify(formData.description),
        content: JSON.stringify(formData.content),
        image: imageUrl,
        file_url: docUrl,
        file_name: formData.file_name,
        slug: generatedSlug
      }
      
      if (editId) {
        const { error } = await supabase
          .from('reports')
          .update(payload)
          .eq('id', editId)

        if (!error) {
          alert('Hisobot muvaffaqiyatli tahrirlandi!')
          resetForm()
          fetchReports()
        } else throw error
      } else {
        const { error } = await supabase.from('reports').insert([payload])

        if (!error) {
          alert("Hisobot muvaffaqiyatli qo'shildi!")
          resetForm()
          fetchReports()
        } else {
          if (error.message.includes('relation "reports" does not exist')) {
            alert('Xatolik: "reports" jadvali mavjud emas. Iltimos Supabase-da maqolada berilgan SQL ni ishlating.')
          }
          throw error
        }
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
    setImageFile(null)
    setImagePreview(null)
    setDocFile(null)
    setFormData({ 
      title: {uz:'', ru:'', en:''}, 
      description: {uz:'', ru:'', en:''}, 
      content: {uz:'', ru:'', en:''},
      image: '',
      file_url: '',
      file_name: ''
    })
  }

  const scrollToForm = () => {
    setTimeout(() => {
      const element = document.getElementById('report-form')
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
      description: parseLocalizedField(item.description),
      content: parseLocalizedField(item.content),
      image: item.image || '',
      file_url: item.file_url || '',
      file_name: item.file_name || ''
    })
    setImagePreview(item.image || null)
    setEditId(item.id)
    setIsAdding(true)
    scrollToForm()
  }

  const deleteReport = async (id: string) => {
    if (confirm("Ushbu hisobotni o'chirib tashlamoqchimisiz?")) {
      const { error } = await supabase.from('reports').delete().eq('id', id)
      if (!error) fetchReports()
    }
  }

  const filteredReports = reports.filter(item => 
    item.title?.toLowerCase().includes(searchQuery.toLowerCase()) || 
    item.description?.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="space-y-8 text-white">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black uppercase tracking-tighter">Jamiyat <span className="text-yellow-500">Hisobotlari</span></h1>
          <p className="text-zinc-500 text-sm mt-1">Hisobotlarni qo'shing (PDF, DOC, XLS) yoki mavjudlarini tahrirlang</p>
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
                placeholder="Hisobotlarda qidirish..." 
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
              ) : filteredReports.length === 0 ? (
                <div className="p-20 text-center text-zinc-600 italic">Hech narsa topilmadi</div>
              ) : (
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-zinc-800 bg-zinc-800/30">
                      <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-zinc-500">Mavzu</th>
                      <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-zinc-500">Hujjat</th>
                      <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-zinc-500">Sana</th>
                      <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-zinc-500 text-right">Amallar</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-800">
                    {filteredReports.map((item) => (
                      <tr key={item.id} className="group hover:bg-zinc-800/30 transition-colors">
                        <td className="px-6 py-5">
                          <p className="text-sm font-bold text-white line-clamp-1 group-hover:text-yellow-500 transition-colors">{getLocalizedText(item.title, 'uz')}</p>
                        </td>
                        <td className="px-6 py-5">
                          {item.file_url ? (
                            <a href={item.file_url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest bg-zinc-800 hover:bg-zinc-700 px-3 py-1.5 rounded-full text-zinc-300 w-fit transition-all">
                              <FileIcon size={12} />
                              {item.file_name?.slice(-4) || 'FILE'}
                            </a>
                          ) : (
                            <span className="text-[10px] text-zinc-600">Yo'q</span>
                          )}
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
                              onClick={() => deleteReport(item.id)}
                              className="p-2 text-zinc-500 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-all"
                            >
                              <Trash2 size={16} />
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
        <div id="report-form" className="lg:col-span-1 text-white">
          {isAdding ? (
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 sticky top-6"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold uppercase tracking-tighter">
                  {editId ? 'Hisobotni Tahrirlash' : 'Yangi Hisobot'}
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
                    placeholder={`Hisobot sarlavhasi (${activeLang.toUpperCase()})`}
                    value={(formData.title as any)[activeLang] || ''}
                    onChange={e => setFormData({...formData, title: {...formData.title, [activeLang]: e.target.value}})}
                    className="w-full bg-zinc-800/50 border border-zinc-700 rounded-xl py-3 px-4 text-sm focus:outline-none focus:border-yellow-500 transition-all text-white"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 ml-1">Hujjat (PDF, DOC, XLS)</label>
                  <label className="relative border-2 border-dashed border-zinc-800 rounded-2xl p-4 flex flex-col items-center justify-center gap-3 hover:border-yellow-500/50 transition-all cursor-pointer group min-h-[100px] overflow-hidden bg-zinc-800/20">
                    <input 
                      type="file" 
                      accept=".pdf,.doc,.docx,.xls,.xlsx"
                      onChange={handleDocChange}
                      className="hidden"
                    />
                    <div className="p-3 bg-zinc-800 rounded-xl text-zinc-500 group-hover:text-yellow-500 transition-colors">
                      <FileIcon size={24} />
                    </div>
                    {formData.file_name ? (
                      <p className="text-xs font-bold text-yellow-500 text-center break-all">{formData.file_name}</p>
                    ) : (
                      <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-600">Hujjat tanlang</p>
                    )}
                  </label>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 ml-1">Rasim (Muqova)</label>
                  <label className="relative border-2 border-dashed border-zinc-800 rounded-2xl p-4 flex flex-col items-center justify-center gap-3 hover:border-yellow-500/50 transition-all cursor-pointer group min-h-[160px] overflow-hidden">
                    <input 
                      type="file" 
                      accept="image/*"
                      onChange={handleImageChange}
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
                  <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 ml-1">Qisqacha matn (Izoh)</label>
                  <textarea 
                    rows={4}
                    placeholder={`Hisobot haqida ma'lumot... (${activeLang.toUpperCase()})`}
                    value={(formData.description as any)[activeLang] || ''}
                    onChange={e => setFormData({...formData, description: {...formData.description, [activeLang]: e.target.value}})}
                    className="w-full bg-zinc-800/50 border border-zinc-700 rounded-xl py-3 px-4 text-sm focus:outline-none focus:border-yellow-500 transition-all resize-none text-white placeholder:text-zinc-600"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 ml-1">To'liq matn (Content)</label>
                  <textarea 
                    rows={8}
                    placeholder={`Hisobotning to'liq tafsiloti... (${activeLang.toUpperCase()})`}
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
                <FileText size={32} />
              </div>
              <h4 className="text-lg font-bold uppercase tracking-tighter mb-2">Hisobot Tanlash</h4>
              <p className="text-zinc-500 text-xs leading-relaxed max-w-[200px]">
                Tahrirlash uchun ro'yxatdan hisobotni tanlang yoki yangisini qo'shing.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default function AdminReportsPage() {
  return (
    <Suspense fallback={<div className="p-20 text-center animate-pulse text-zinc-500 uppercase font-black tracking-widest">Yuklanmoqda...</div>}>
      <AdminReportsContent />
    </Suspense>
  )
}
