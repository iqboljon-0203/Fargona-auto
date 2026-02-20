export interface NewsItem {
  id: number
  date: string
  title: string
  excerpt: string
  content?: string // Added for detail view
  image: string
  category: string
  categoryColor: string
  featured: boolean
}

export const newsData: NewsItem[] = [
  {
    id: 1,
    date: '15.02.2026',
    title: 'Chevrolet Tracker 2026 — yangilangan versiya taqdim etildi',
    excerpt:
      "Farg'ona Avtotexxizmat-F showroomida Tracker-ning yangilangan 2026 yil versiyasi rasman taqdim etildi. Yangi model zamonaviy dizayn va kengaytirilgan xususiyatlar bilan jihozlangan.",
    content: `
      <p>Farg'ona Avtotexxizmat-F showroomida Tracker-ning yangilangan 2026 yil versiyasi rasman taqdim etildi. Yangi model zamonaviy dizayn va kengaytirilgan xususiyatlar bilan jihozlangan. Ushbu modelda haydovchi va yo'lovchilar uchun qulayliklar yanada oshirildi.</p>
      <p>Yangi Tracker quyidagi o'zgarishlarga ega:</p>
      <ul>
        <li>Yangilangan old panjara va LED faralar.</li>
        <li>Kengaytirilgan multimedia tizimi va raqamli asboblar paneli.</li>
        <li>Yaxshilangan xavfsizlik tizimlari, jumladan avtomatik to'xtash yordamchisi.</li>
        <li>Yoqilg'i tejamkorligi oshirilgan yangi avlod dvigateli.</li>
      </ul>
      <p>Avtomobilni bugunoq dillerimizdan xarid qilishingiz mumkin. Batafsil ma'lumot uchun biz bilan bog'laning.</p>
    `,
    image: '/cars/tracker/tracker-uz.webp',
    category: 'Yangi model',
    categoryColor: 'bg-yellow-500 text-black',
    featured: true,
  },
  {
    id: 2,
    date: '01.02.2026',
    title: "Foizsiz muddatli to'lov: 2026 yil yanvar imkoniyatlari",
    excerpt:
      "Yanvar oyida Chevrolet avtomobillarini 0% foiz bilan muddatli to'lovga sotib olish imkoniyati.",
    content: `
      <p>Yanvar oyida Chevrolet avtomobillarini 0% foiz bilan muddatli to'lovga sotib olish imkoniyati taqdim etiladi. Bu aksiya doirasida siz:</p>
      <ul>
        <li>Chevrolet Onix va Tracker modellari uchun maxsus shartlar.</li>
        <li>Boshlang'ich to'lov 30% dan boshlanadi.</li>
        <li>To'lov muddati 18 oygacha foizsiz.</li>
      </ul>
      <p>Aksiya muddati cheklangan. Shoshiling, imkoniyatdan foydalanib qoling!</p>
    `,
    image: '/cars/onix/download.png',
    category: 'Aksiya',
    categoryColor: 'bg-emerald-500 text-black',
    featured: false,
  },
  {
    id: 3,
    date: '20.01.2026',
    title: 'Chevrolet Tahoe 2026: kuchli V8 va yangi Premium paket',
    excerpt:
      "Tahoe-ning yangi avlodi 5.3L V8 dvigatel va yangilangan multimedia tizimi bilan yetib keldi.",
    content: `
      <p>Tahoe-ning yangi avlodi 5.3L V8 dvigatel va yangilangan multimedia tizimi bilan yetib keldi. Bu haqiqiy kuch va hashamat uyg'unligi.</p>
      <p>Yangi modelda nimalar bor?</p>
      <ul>
        <li>5.3L V8 Ecotec3 dvigateli, 355 ot kuchi.</li>
        <li>10 bosqichli avtomat uzatmalar qutisi.</li>
        <li>Premium charm salon va yog'och qoplamalar.</li>
        <li>Magnetic Ride Control suspenziyasi.</li>
      </ul>
      <p>Sinov haydovi (Test Drive) ga yozilish uchun hoziroq qo'ng'iroq qiling.</p>
    `,
    image: '/cars/tahoe-rst/tahoe-uz1.webp',
    category: "Yangilik",
    categoryColor: 'bg-blue-500 text-white',
    featured: false,
  },
  {
    id: 4,
    date: '10.01.2026',
    title: 'Trade-In xizmati: eski avtomobilingizni yangisiga almashtiring',
    excerpt:
      "Har qanday markadagi avtomobilingizni bozor narxida qabul qilamiz va yangi Chevrolet xarid qilishingizga yordam beramiz.",
    content: `
      <p>Trade-In dasturi orqali eski avtomobilingizni yangi Chevrolet ga almashtirish endi yanada oson. Biz sizning avtomobilingizni bozor narxida baholaymiz va yangi avtomobil narxidan chegirib beramiz.</p>
      <p>Afzalliklari:</p>
      <ul>
        <li>Tezkor baholash va rasmiylashtirish.</li>
        <li>Bozor narxida adolatli baho.</li>
        <li>Eski avtomobilni sotish tashvishlaridan xalos bo'lasiz.</li>
        <li>Yangi avtomobilni bir kun ichida haydab ketishingiz mumkin.</li>
      </ul>
      <p>Batafsil ma'lumot uchun Trade-In bo'limiga murojaat qiling.</p>
    `,
    image: '/cars/captiva/captiva-uz.webp',
    category: 'Xizmat',
    categoryColor: 'bg-purple-500 text-white',
    featured: false,
  },
]
