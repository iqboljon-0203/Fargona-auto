'use client'

import { useEffect } from 'react'


export default function ViewTracker() {
  useEffect(() => {
    // SessionStorage yordamida har bir tashrifni bir marta hisoblaymiz (sahifani ketma-ket yangilaganda ko'payib ketmasligi uchun)
    const tracked = sessionStorage.getItem('page_view_tracked')
    if (!tracked) {
      const incrementView = async () => {
        try {
          // API endpointni chaqiramiz
          await fetch('/api/track', { method: 'POST' })
          sessionStorage.setItem('page_view_tracked', 'true')
        } catch (error) {
          // Xatolik bo'lsa indamaymiz
          console.error("Tracking error:", error)
        }
      }
      incrementView()
    }
  }, [])

  return null // Hech narsa ko'rsatmaydi, FAQAT orqa fonda ishlaydi
}
