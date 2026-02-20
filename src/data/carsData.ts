
export type Category = 'SUV' | 'Sedan' | 'LCV'

export interface CarSpec {
  engine: string
  power: string
  transmission: string
  fuel: string
  trunkVolume: string
  seats: string
}

export interface CarColor {
  name: string
  hex: string
  image?: string
}

export interface CarFeature {
  title: string
  description: string
  icon: string
}

export interface Car {
  id: string
  name: string
  subtitle: string
  tagline: string
  description: string
  price: string
  oldPrice?: string
  monthlyPayment: string
  category: Category
  badge?: string
  badgeColor?: string
  images: string[]
  specs: CarSpec
  features: CarFeature[]
  colors: CarColor[]
  safetyRating: number
  featured?: boolean
}

export const carsData: Car[] = [
  // ═══════════════════ SUV ═══════════════════
  {
    id: 'tracker',
    name: 'Chevrolet Tracker',
    subtitle: 'Kompakt krossover',
    tagline: "Dadil dizayn. Aqlli texnologiyalar. Yo'lda ishonch.",
    description:
      "Chevrolet Tracker — bu yangi avlod shahar krossoveri bo'lib, ilg'or texnologiyalar, ta'sirchan dizayn va amaliy qulaylikni o'zida mujassamlashtirgan. 132 ot kuchiga ega 1.2 litrlik turbodvigatel, 6 pog'onali avtomatik uzatmalar qutisi tufayli, u shahar ritmiga ham, shahar tashqarisidagi sayohatlarga ham osonlik bilan moslashadi.",
    price: '215 951 360',
    monthlyPayment: '3 599 189',
    category: 'SUV',
    badge: 'Ommabop',
    badgeColor: 'bg-yellow-500 text-black',
    featured: true,
    images: [
      '/cars/tracker/tracker-uz.webp',
      '/cars/tracker/ex-1.jpg',
      '/cars/tracker/interyer.jpg',
    ],
    specs: {
      engine: '1.2L Turbo',
      power: '132 ot kuchi',
      transmission: '6AT',
      fuel: '6,5 L/100km',
      trunkVolume: '390/1311 L',
      seats: "5 o'rindiq",
    },
    features: [
      { title: 'Panorama lyuk', description: "Panoramali shisha lyuk — salon yanada yorug'", icon: '☀️' },
      { title: '360° kamera', description: 'Barcha tomondan parklovchi kamera tizimi', icon: '📷' },
      { title: 'Apple CarPlay', description: 'iPhone va Android Auto integratsiyasi', icon: '📱' },
      { title: 'Avtomatik tormozlash', description: 'Avtonom favqulodda tormozlash tizimi', icon: '🛡️' },
    ],
    colors: [
      { name: 'Oq', hex: '#F5F5F5', image: '/cars/tracker/07.png' },
      { name: "Ko'k", hex: '#1A3A5C', image: '/cars/tracker/04.png' },
      { name: 'Qora', hex: '#1A1A1A', image: '/cars/tracker/01.png' },
      { name: 'Kumush', hex: '#C0C0C0', image: '/cars/tracker/02.png' },
      { name: 'Qizil', hex: '#8B0000', image: '/cars/tracker/03.png' },
      { name: "To'q ko'k", hex: '#0D1B2A', image: '/cars/tracker/05.png' },
      { name: 'Kulrang', hex: '#808080', image: '/cars/tracker/06.png' },
    ],
    safetyRating: 5,
  },
  {
    id: 'captiva',
    name: 'Chevrolet Captiva',
    subtitle: 'Oilaviy krossover',
    tagline: 'Kenglik, ishonch va texnologiya',
    description:
      "Chevrolet Captiva — bu kundalik qulaylik va uzoq safarlar uchun mo'ljallangan keng, texnologik SUV. Old g'ildirakdan tortish, turbomotor va silliq CVT uzatmalar qutisi bilan Captiva haydovchi uchun muvozanatli samaradorlik va boshqaruvni taqdim etadi. Model 5 yoki 7 o'rinli konfiguratsiyada taklif qilinadi.",
    price: '284 900 000',
    monthlyPayment: '4 748 334',
    category: 'SUV',
    badge: 'Yangi',
    badgeColor: 'bg-emerald-500 text-black',
    featured: true,
    images: [
      '/cars/captiva/ex-1.jpg',
      '/cars/captiva/interyer.jpg',
      '/cars/captiva/2.jpg',
    ],
    specs: {
      engine: '1.5L Turbo',
      power: '149 ot kuchi',
      transmission: 'CVT Variator',
      fuel: '11,6 L/100km',
      trunkVolume: '275/538 L',
      seats: "5-7 o'rindiq",
    },
    features: [
      { title: 'Panorama lyuk', description: 'Keng panorama shisha lyuk', icon: '☀️' },
      { title: '360° kamera', description: "Doiraviy ko'rish tizimi", icon: '📷' },
      { title: '18" disklar', description: '18 dyuymli yengil quyma disklar', icon: '⚙️' },
      { title: 'LED faralar', description: 'Svetodiod avtomobil faralari', icon: '💡' },
    ],
    colors: [
      { name: 'Oq', hex: '#FFFFFF', image: '/cars/captiva/GSB.png' },
      { name: 'Kumush', hex: '#C0C0C0', image: '/cars/captiva/77U.png' },
      { name: 'Qora', hex: '#1A1A1A', image: '/cars/captiva/GBA.png' },
      { name: 'Kulrang', hex: '#808080', image: '/cars/captiva/GIR.png' },
      { name: 'Qizil', hex: '#CC0000', image: '/cars/captiva/J0U.png' },
    ],
    safetyRating: 5,
  },
  {
    id: 'traverse',
    name: 'Chevrolet Traverse',
    subtitle: '3 qatorli krossover',
    tagline: "Oilangizning to'laqonli a'zosi",
    description:
      "Chevrolet Traverse – oilangizning to'laqonli a'zosi bo'la oladigan ishonchli krossover. Ilg'or texnologiyalar yordamida yaratilgan Traverse sizning eng buyuk rejalaringizni amalga oshirishda yordam beradi. Bagajni qo'lsiz ochish, simsiz zaryadlash qurilmasi, 360 gradusli kamera va boshqalar.",
    price: '657 730 560',
    monthlyPayment: '10 962 176',
    category: 'SUV',
    badge: 'Chegirma',
    badgeColor: 'bg-orange-500 text-white',
    featured: true,
    images: [
      '/cars/traverse/1.jpg',
      '/cars/traverse/gallery05.jpg',
      '/cars/traverse/gallery02.jpg',
    ],
    specs: {
      engine: '3.6L V6',
      power: '318 ot kuchi',
      transmission: '9-AT',
      fuel: '10 L/100km',
      trunkVolume: '651/2781 L',
      seats: "7-8 o'rindiq",
    },
    features: [
      { title: "Qo'lsiz bagaj", description: "Oyog'ingizni oldingizda silkitib bagajni oching", icon: '🚀' },
      { title: '360° kamera', description: "To'liq atrofiy ko'rinish tizimi", icon: '📷' },
      { title: 'Simsiz zaryadlash', description: 'Qi standartidagi induktiv zaryadlash', icon: '⚡' },
      { title: 'Uzoq chiroq avto', description: "Qarama-qarshi avtomobilni ilg'ab avtomatik sozlash", icon: '💡' },
    ],
    colors: [
      { name: 'Oq', hex: '#F8F8F8', image: '/cars/traverse/1 (1).png' },
      { name: 'Qora', hex: '#1A1A1A', image: '/cars/traverse/2 (1).png' },
      { name: "Ko'k", hex: '#1B3A6B' },
      { name: 'Kumush', hex: '#B8B8B8' },
      { name: 'Bronza', hex: '#8C7B5A' },
    ],
    safetyRating: 5,
  },
  {
    id: 'traverse-z71',
    name: 'Chevrolet Traverse Z71',
    subtitle: 'Off-road krossover',
    tagline: "Har qanday yo'l sharoitida ishonchli",
    description:
      "Chevrolet Traverse Z71 — faol oilaviy hayot va har qanday yo'l sharoitida ishonchli harakatlanish uchun yaratilgan kuchli va keng to'liq tortuvchi SUV. 328 ot kuchiga ega 2,5 litrli turbo benzin dvigateli hamda 8 pog'onali avtomat uzatmalar qutisi bilan jihozlangan.",
    price: '795 000 000',
    monthlyPayment: '13 250 000',
    category: 'SUV',
    images: [
      '/cars/traverse-z71/traverse-1.jpg',
      '/cars/traverse-z71/main.png',
      '/cars/traverse-z71/exterior-main.png',
    ],
    specs: {
      engine: '2.5L Turbo',
      power: '328 ot kuchi',
      transmission: 'AT-8',
      fuel: '11,7 L/100km',
      trunkVolume: '648/1602 L',
      seats: "7 o'rindiq",
    },
    features: [
      { title: "To'liq yuritma", description: "Ikki muftali to'liq yuritma tizimi", icon: '🏔️' },
      { title: 'Terrain Mode', description: "Turli yo'l rejimlarini tanlash", icon: '🌄' },
      { title: 'Hill Descent', description: "Tog'dan tushishda yordam beruvchi tizim", icon: '⛰️' },
      { title: 'Adaptive amortizator', description: 'Tebranish chastotasiga moslashuvchan', icon: '⚙️' },
    ],
    colors: [
      { name: 'Qora', hex: '#0A0A0A', image: '/cars/traverse-z71/24CHTE_Ext_Global_Beltline_01_MBC_1LC56_2Z7_LHD_GB8.png' },
      { name: 'Oq', hex: '#FFFFFF', image: '/cars/traverse-z71/24CHTE_Ext_Global_Beltline_01_MBC_1LC56_2Z7_LHD_GXD.png' }, // Using silver as closest to white/metallic
      { name: "To'q ko'k", hex: '#0D1B2A', image: '/cars/traverse-z71/24CHTE_Ext_Global_Beltline_01_MBC_1LC56_2Z7_LHD_GXP.png' },
      { name: 'Qizil', hex: '#8B0000', image: '/cars/traverse-z71/24CHTE_Ext_Global_Beltline_01_MBC_1LC56_2Z7_LHD_GNT.png' },
      { name: 'Qumrang', hex: '#D2B48C', image: '/cars/traverse-z71/Sandstone-Gray-1.png' },
    ],
    safetyRating: 5,
  },
  {
    id: 'tahoe-rst',
    name: 'Chevrolet Tahoe RST',
    subtitle: 'Kuchli fullsize SUV',
    tagline: 'Yanada jasur. Yanada mukammal.',
    description:
      "Yangi Chevrolet Tahoe - afsonaviy hamda yirik o'lchamli yo'ltanlamas, faqat sizga tegishli bo'lgan ta'sirchan kuchning timsoli. V8 hajmdagi 5.3 litr va 343 ot kuchi bilan quvvatlantirilgan, 10 pog'onali avtomatik uzatma va moslashuvchan osma bilan jihozlangan.",
    price: '1 109 274 880',
    monthlyPayment: '18 487 915',
    category: 'SUV',
    badge: 'Premium',
    badgeColor: 'bg-purple-500 text-white',
    featured: true,
    images: [
      '/cars/tahoe-rst/car-gallery.webp',
      '/cars/tahoe-rst/tahoe-uz1.webp',
      '/cars/tahoe-rst/car-gallery-4.webp',
      '/cars/tahoe-rst/taho-inter.png',
      '/cars/tahoe-rst/taho-middle-1.png',
      '/cars/tahoe-rst/taho-safe.png',
    ],
    specs: {
      engine: '5.3L V8',
      power: '343 ot kuchi',
      transmission: '10-AT',
      fuel: '12,6 L/100km',
      trunkVolume: '722/2056/3480 L',
      seats: "8 o'rindiq",
    },
    features: [
      { title: 'Air Suspension', description: "Havo amortizatorlari — haydash balandligini boshqaring", icon: '🌬️' },
      { title: "10'' Ekran", description: 'HD sensorli infoteyment ekran', icon: '📺' },
      { title: 'LED faralar', description: 'Yorqin va samarali LED faralar', icon: '💡' },
      { title: 'V8 Kuch', description: '343 ot kuchli V8 dvigatelning beqiyos kuchi', icon: '🔥' },
    ],
    colors: [
      { name: 'Qora', hex: '#0A0A0A', image: '/cars/tahoe-rst/01.png' },
      { name: 'Oq', hex: '#FFFFFF', image: '/cars/tahoe-rst/02.png' },
    ],
    safetyRating: 5,
  },
  {
    id: 'tahoe-hc',
    name: 'Tahoe High Country 2025',
    subtitle: 'Premium fullsize SUV',
    tagline: 'Hayratlanarli kuchning mujassamlashuvi',
    description:
      "Yangi Chevrolet Tahoe High Country 2025 — afsonaviy to'liq o'lchamli yo'ltanlamas. 420 ot kuchiga ega 6,2 litrli V8 dvigateli, 10 pog'onali avtomat uzatmalar qutisi va moslashuvchan pnevmatik osma bilan jihozlangan.",
    price: '1 464 500 000',
    monthlyPayment: '24 408 334',
    category: 'SUV',
    badge: 'Top',
    badgeColor: 'bg-amber-600 text-white',
    images: [
      '/cars/tahoe-hc/main.jpg',
      '/cars/tahoe-hc/1.jpg',
      '/cars/tahoe-hc/3.jpg',
    ],
    specs: {
      engine: '6.2L V8',
      power: '420 ot kuchi',
      transmission: '10-AT',
      fuel: '16,8 L/100km',
      trunkVolume: '722/2056/3480 L',
      seats: "7 o'rindiq",
    },
    features: [
      { title: 'Pnevmatik osma', description: 'Moslashuvchan pnevmatik osma tizimi', icon: '🌬️' },
      { title: '6.2L V8', description: '420 ot kuchli mega dvigatel', icon: '🔥' },
      { title: 'Premium interyeri', description: "Yuqori sifatli charm va yog'och bezaklar", icon: '✨' },
      { title: 'Multimedia', description: 'Zamonaviy infoteyment tizimi', icon: '📺' },
    ],
    colors: [
      { name: 'Oq', hex: '#F8F6F2', image: '/cars/tahoe-hc/1 (1).png' },
      { name: "To'q ko'k", hex: '#000033', image: '/cars/tahoe-hc/2 (1).png' },
      { name: 'Qora', hex: '#0A0A0A', image: '/cars/tahoe-hc/3.png' },
      { name: 'Qizil', hex: '#8B0000', image: '/cars/tahoe-hc/4.png' },
      { name: 'Kumush', hex: '#D4D4D4', image: '/cars/tahoe-hc/5.png' },
      { name: "Ko'k", hex: '#1B3A6B', image: '/cars/tahoe-hc/6.png' },
    ],
    safetyRating: 5,
  },

  // ═══════════════════ SEDAN ═══════════════════
  {
    id: 'onix',
    name: 'Chevrolet Onix',
    subtitle: 'Zamonaviy sedan',
    tagline: 'Barchasi u haqida',
    description:
      "Chevrolet Onix — yangi model yorqin dizayn, zamonaviy interyer hamda qulaylik va xavfsizlik uchun barcha zarur opsiyalarni o'zida mujassamlashtiradi. Shahar hayotiga mos, iqtisodiy va zamonaviy sedan.",
    price: '161 900 000',
    monthlyPayment: '2 698 334',
    category: 'Sedan',
    badge: 'Chegirma',
    badgeColor: 'bg-orange-500 text-white',
    featured: true,
    images: [
      'https://images.unsplash.com/photo-1550355291-bbee04a92027?q=80&w=2072&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1580414057403-c5f451f30e1c?q=80&w=2070&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=2070&auto=format&fit=crop',
    ],
    specs: {
      engine: '1.2 / 1.2 Turbo',
      power: '90/132 ot kuchi',
      transmission: '5MT/6AT',
      fuel: '4,7/4,8 L/100km',
      trunkVolume: '469 L',
      seats: "5 o'rindiq",
    },
    features: [
      { title: 'Touchscreen', description: '8 dyuymli sensorli multimedia ekrani', icon: '📱' },
      { title: 'Android Auto', description: 'Android va Apple CarPlay ulanishi', icon: '🔗' },
      { title: 'Iqtisodiy rejim', description: "Yoqilg'i tejash uchun maxsus haydash rejimi", icon: '🌿' },
      { title: 'AEB tizimi', description: 'Avtonom favqulodda tormozlash tizimi', icon: '🛡️' },
    ],
    colors: [
      { name: 'Oq', hex: '#FFFFFF' },
      { name: 'Qizil', hex: '#CC0000' },
      { name: "Ko'k", hex: '#1A3A5C' },
      { name: 'Kulrang', hex: '#888888' },
    ],
    safetyRating: 4,
  },
  {
    id: 'cobalt-mcm',
    name: 'Chevrolet Cobalt MCM',
    subtitle: 'Yangilangan sedan',
    tagline: 'Yangilangan va zamonaviy',
    description:
      "Chevrolet Cobalt MCM — mashhur Cobalt modelining yangilangan versiyasi. Zamonaviy dizayn, yaxshilangan xavfsizlik tizimlari va qulaylik bilan jihozlangan. O'zbekiston yo'llariga moslashtirilgan ishonchli sedan.",
    price: '156 100 000',
    monthlyPayment: '2 601 667',
    category: 'Sedan',
    images: [
      'https://images.unsplash.com/photo-1555215695-3004980ad54e?q=80&w=2070&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=2083&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?q=80&w=2070&auto=format&fit=crop',
    ],
    specs: {
      engine: '1.5L',
      power: '106 ot kuchi',
      transmission: '5MT/6AT',
      fuel: '7,3 L/100km',
      trunkVolume: '563 L',
      seats: "5 o'rindiq",
    },
    features: [
      { title: 'Multimedia', description: 'Touchscreen multimedia tizimi', icon: '📱' },
      { title: 'Xavfsizlik', description: 'ABS, EBD, tormoz kuchaytirgich', icon: '🛡️' },
      { title: 'Qulay salon', description: "Keng va qulay 5 o'rindiqli salon", icon: '🪑' },
      { title: 'Arzon xarajat', description: "Kam yoqilg'i sarfi va arzon texkuzatuv", icon: '💰' },
    ],
    colors: [
      { name: 'Oq', hex: '#FFFFFF' },
      { name: 'Kumush', hex: '#C0C0C0' },
      { name: 'Qora', hex: '#1A1A1A' },
      { name: 'Kulrang', hex: '#808080' },
    ],
    safetyRating: 4,
  },
  {
    id: 'cobalt',
    name: 'Chevrolet Cobalt',
    subtitle: 'Hamyonbop sedan',
    tagline: 'Hammaga yetarli qulay',
    description:
      'Chevrolet Cobalt - bu neytral dizaynga ega Yevropa standartlari bo\'yicha "B-segment"ga kiruvchi ergonomik va qulay interyerga va vaqt sinovidan o\'tgan texnik "tarkibga" ega bo\'lgan subkompakt FWD sedan hisoblanadi.',
    price: '146 455 000',
    monthlyPayment: '2 440 917',
    category: 'Sedan',
    images: [
      'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?q=80&w=1974&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1580414057403-c5f451f30e1c?q=80&w=2070&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=2083&auto=format&fit=crop',
    ],
    specs: {
      engine: '1.5L',
      power: '106 ot kuchi',
      transmission: '5MT/6AT',
      fuel: '7,3 L/100km',
      trunkVolume: '563 L',
      seats: "5 o'rindiq",
    },
    features: [
      { title: 'Multimedia', description: "Bluetooth'li multimedia tizimi", icon: '📱' },
      { title: 'Xavfsizlik', description: 'ABS, EBD, tormoz kuchaytirgich', icon: '🛡️' },
      { title: 'Qulay salon', description: "Keng va qulay 5 o'rindiqli salon", icon: '🪑' },
      { title: 'Arzon xarajat', description: "Kam yoqilg'i sarfi va arzon texkuzatuv", icon: '💰' },
    ],
    colors: [
      { name: 'Oq', hex: '#FFFFFF' },
      { name: 'Kumush', hex: '#C0C0C0' },
      { name: 'Qora', hex: '#1A1A1A' },
      { name: 'Qizil', hex: '#8B0000' },
    ],
    safetyRating: 4,
  },
  {
    id: 'malibu-xl',
    name: 'Chevrolet Malibu XL',
    subtitle: 'Biznes sedan',
    tagline: 'Zamonaviy klassik dizayn',
    description:
      "Malibu XL 2023 shahar muhiti uchun mo'ljallangan va eng zamonaviy dizayn, texnologiya, sifat va xavfsizlikni birlashtiradi. Dadil, ishonchli va jozibali tashqi ko'rinish keng va xashamatli interyer bilan birlashtirilgan. O'rta va yuqori sinfning flagman sedanidir.",
    price: '375 000 640',
    monthlyPayment: '6 250 011',
    category: 'Sedan',
    images: [
      'https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=2070&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1555215695-3004980ad54e?q=80&w=2070&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1583121274602-3e2820c69888?q=80&w=2070&auto=format&fit=crop',
    ],
    specs: {
      engine: '2.0L Turbo',
      power: '236 ot kuchi',
      transmission: '9-AT',
      fuel: '7,2 L/100km',
      trunkVolume: '520 L',
      seats: "5 o'rindiq",
    },
    features: [
      { title: 'Bose Audio', description: '9 dinamikli Bose premium audio tizimi', icon: '🎵' },
      { title: 'LED faralar', description: 'Zamonaviy LED faralar tizimi', icon: '💡' },
      { title: 'Simsiz zaryadlash', description: 'Induktiv telefon zaryadlovchi', icon: '⚡' },
      { title: 'Adaptive kruiz', description: 'Moslashuvchan kruiz nazorati', icon: '🚗' },
    ],
    colors: [
      { name: 'Oq', hex: '#FFFFFF' },
      { name: 'Qora', hex: '#1A1A1A' },
      { name: 'Kumush', hex: '#C0C0C0' },
      { name: 'Qizil', hex: '#8B0000' },
      { name: "Ko'k", hex: '#1B3A6B' },
    ],
    safetyRating: 5,
  },

  // ═══════════════════ LCV ═══════════════════
  {
    id: 'labo',
    name: 'Chevrolet Labo',
    subtitle: 'Yengil yuk mashinasi',
    tagline: 'Ishonchli yuk hamrohingiz',
    description:
      "Chevrolet Labo — kichik biznes va kundalik yuk tashish uchun mo'ljallangan ishonchli yengil tijorat avtomobili. Iqtisodiy yoqilg'i sarfi va arzon narxi bilan kichik tadbirkorlar uchun ideal tanlov.",
    price: '93 771 000',
    monthlyPayment: '1 562 850',
    category: 'LCV',
    images: [
      'https://images.unsplash.com/photo-1561361058-c24cecae35ca?q=80&w=2070&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?q=80&w=2070&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?q=80&w=2071&auto=format&fit=crop',
    ],
    specs: {
      engine: '0.8L',
      power: '38 ot kuchi',
      transmission: '5MT',
      fuel: '5,7 L/100km',
      trunkVolume: 'Ochiq kuzov',
      seats: "2 o'rindiq",
    },
    features: [
      { title: 'Iqtisodiy', description: "Kam yoqilg'i sarfi — faqat 5,7L", icon: '⛽' },
      { title: 'Ochiq kuzov', description: 'Turli yuklar uchun qulay ochiq kuzov', icon: '📦' },
      { title: 'Ishonchli', description: "Vaqt sinovidan o'tgan mexanika", icon: '⚙️' },
      { title: 'Hamyonbop', description: 'Eng arzon narxdagi tijorat avtomobili', icon: '💰' },
    ],
    colors: [
      { name: 'Oq', hex: '#FFFFFF' },
      { name: 'Kumush', hex: '#C0C0C0' },
    ],
    safetyRating: 3,
  },
  {
    id: 'damas',
    name: 'Chevrolet Damas',
    subtitle: 'Miniven',
    tagline: 'Kompakt va qulaylik',
    description:
      "Chevrolet Damas — O'zbekistonda eng mashhur minivenlardan biri. Yuk va passajir tashish uchun ishonchli va iqtisodiy tijorat transporti. Kompakt o'lchamlari shahar ichida harakatlanishni osonlashtiradi.",
    price: '93 156 000',
    monthlyPayment: '1 552 600',
    category: 'LCV',
    images: [
      'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?q=80&w=2070&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1561361058-c24cecae35ca?q=80&w=2070&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?q=80&w=2071&auto=format&fit=crop',
    ],
    specs: {
      engine: '0.8L',
      power: '38 ot kuchi',
      transmission: '5MT',
      fuel: '6,5 L/100km',
      trunkVolume: 'Yuk/Passajir',
      seats: "2-7 o'rindiq",
    },
    features: [
      { title: 'Kompakt', description: "Tor ko'chalarda oson manevr", icon: '🚐' },
      { title: 'Iqtisodiy', description: "Kam yoqilg'i sarfi", icon: '⛽' },
      { title: 'Ikki funksiya', description: 'Yuk va passajir tashish imkoniyati', icon: '🔄' },
      { title: 'Hamyonbop', description: 'Arzon narx va texnik xizmat', icon: '💰' },
    ],
    colors: [
      { name: 'Oq', hex: '#FFFFFF' },
      { name: 'Kumush', hex: '#C0C0C0' },
    ],
    safetyRating: 3,
  },
  {
    id: 'damas-move-max',
    name: 'Damas Move & Max',
    subtitle: 'Yangilangan miniven',
    tagline: 'Kuchaytirilgan va yangilangan',
    description:
      'Damas Move & Max — klassik Damas modelining kuchaytirilgan versiyasi. Yangilangan dvigatel, yaxshilangan salon va zamonaviy dizayn. Kichik biznes va oila uchun ishonchli tanlov.',
    price: '134 439 000',
    monthlyPayment: '2 240 650',
    category: 'LCV',
    images: [
      'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?q=80&w=1974&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?q=80&w=2070&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1561361058-c24cecae35ca?q=80&w=2070&auto=format&fit=crop',
    ],
    specs: {
      engine: '1.2L',
      power: '84 ot kuchi',
      transmission: '5MT',
      fuel: '7,0 L/100km',
      trunkVolume: 'Yuk/Passajir',
      seats: "2-7 o'rindiq",
    },
    features: [
      { title: 'Kuchli dvigatel', description: "1.2L dvigatel - Damas'dan kuchli", icon: '🔥' },
      { title: 'Zamonaviy dizayn', description: "Yangilangan tashqi ko'rinish", icon: '✨' },
      { title: 'Xavfsizlik', description: 'Yaxshilangan xavfsizlik tizimlari', icon: '🛡️' },
      { title: 'Keng tanlov', description: 'Move va Max versiyalari', icon: '🔄' },
    ],
    colors: [
      { name: 'Oq', hex: '#FFFFFF' },
      { name: 'Kumush', hex: '#C0C0C0' },
      { name: 'Kulrang', hex: '#808080' },
    ],
    safetyRating: 4,
  },
]

export function getCarById(id: string): Car | undefined {
  return carsData.find((car) => car.id === id)
}
