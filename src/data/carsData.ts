
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
}

export const carsData: Car[] = [
  {
    id: 'tracker',
    name: 'Chevrolet Tracker',
    subtitle: 'Kompakt krossover',
    tagline: 'Yangi darajadagi shahar harakati',
    description:
      "Tracker — zamonaviy shahar krossoveri. Chiroyli dizayni, qulay salon va iqtisodiy yoqilg'i sarfi bilan ajralib turadi. Yosh va faol haydovchilar uchun ideal tanlov. Turbo dvigatel, avtomatik uzatmalar qutisi va AWD tizimi bilan jihozlangan.",
    price: '215 951 360',
    monthlyPayment: '3 599 189',
    category: 'SUV',
    badge: 'Ommabop',
    badgeColor: 'bg-yellow-500 text-black',
    images: [
      'https://images.unsplash.com/photo-1627454819213-f77efe10a562?q=80&w=2070&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=2070&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1555215695-3004980ad54e?q=80&w=2070&auto=format&fit=crop',
    ],
    specs: {
      engine: '1.2L Turbo',
      power: '130 ot kuchi',
      transmission: '6AT · AWD',
      fuel: '7.2 l/100km',
      trunkVolume: '350/1320 L',
      seats: '5 o\'rindiq',
    },
    features: [
      { title: 'Simsiz zaryadlash', description: "Telefoningizni sim ulashmasdan zaryadlang", icon: '⚡' },
      { title: '360° kamera', description: "Barcha tomondan parklovchi kamera tizimi", icon: '📷' },
      { title: 'Apple CarPlay', description: "iPhone va Android Auto integratsiyasi", icon: '📱' },
      { title: 'Avtomatik tormozlash', description: 'Avtonom favqulodda tormozlash tizimi', icon: '🛡️' },
    ],
    colors: [
      { name: 'Oq', hex: '#F5F5F5' },
      { name: "Ko'k", hex: '#1A3A5C' },
      { name: 'Qora', hex: '#1A1A1A' },
      { name: 'Kumush', hex: '#C0C0C0' },
      { name: 'Qizil', hex: '#8B0000' },
    ],
    safetyRating: 5,
  },
  {
    id: 'captiva',
    name: 'Chevrolet Captiva',
    subtitle: 'Oilaviy krossover',
    tagline: "Oila sevgisi bilan yaratilgan",
    description:
      "Captiva — keng saloni va zamonaviy xususiyatlari bilan oilaviy sayohatlar uchun yaratilgan. Yuk sig'imi, xavfsizlik tizimlari va qulaylik bilan murosa qilmagan model. 7 o'rindiqli versiyasi bilan katta oilalar uchun ideal.",
    price: '284 900 000',
    monthlyPayment: '4 748 334',
    category: 'SUV',
    badge: 'Yangi',
    badgeColor: 'bg-emerald-500 text-black',
    images: [
      'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?q=80&w=1974&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=2070&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=2083&auto=format&fit=crop',
    ],
    specs: {
      engine: '1.5L Turbo',
      power: '150 ot kuchi',
      transmission: 'CVT · FWD',
      fuel: '7.8 l/100km',
      trunkVolume: '467/1601 L',
      seats: '7 o\'rindiq',
    },
    features: [
      { title: 'Panorama lyuk', description: 'Keng panorama shisha lyuk — salon yorug\' va kengroq', icon: '☀️' },
      { title: 'Keyingi kamera', description: 'Park qilishni osonlashtiruvchi orqa kamera', icon: '📷' },
      { title: 'Isitiluvchi o\'rindiqlar', description: 'Old va orqa o\'rindiqlar isitish tizimi', icon: '🌡️' },
      { title: 'Lane Assist', description: "Harakatlanish yo'nalishini saqlash tizimi", icon: '🛡️' },
    ],
    colors: [
      { name: 'Oq', hex: '#FFFFFF' },
      { name: 'Kumush', hex: '#C0C0C0' },
      { name: 'Qora', hex: '#1A1A1A' },
      { name: 'Bronza', hex: '#8B7355' },
    ],
    safetyRating: 5,
  },
  {
    id: 'traverse',
    name: 'Chevrolet Traverse',
    subtitle: '3 qatorli krossover',
    tagline: "Oilangizning to'laqonli a'zosi",
    description:
      "Chevrolet Traverse – oilangizning to'laqonli a'zosi bo'la oladigan ishonchli krossover. Ilg'or texnologiyalar yordamida yaratilgan Traverse sizning eng buyuk rejalaringizni amalga oshirishda yordam beradi. 360 gradusli kamera, simsiz zaryadlash, bagajni qo'lsiz ochish — barchasini o'z ichiga oladi.",
    price: '657 730 560',
    oldPrice: '680 000 000',
    monthlyPayment: '10 962 176',
    category: 'SUV',
    images: [
      'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=2070&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?q=80&w=2071&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1617788138017-80ad40651399?q=80&w=2070&auto=format&fit=crop',
    ],
    specs: {
      engine: '3.6L V6',
      power: '318 ot kuchi',
      transmission: '9AT · AWD',
      fuel: '10 l/100km',
      trunkVolume: '651/2781 L',
      seats: '7-8 o\'rindiq',
    },
    features: [
      { title: 'Qo\'lsiz bagaj', description: "Oyog'ingizni oldingizda silkitib bagajni oching", icon: '🚀' },
      { title: '360° kamera', description: "To'liq atrofiy ko'rinish tizimi", icon: '📷' },
      { title: 'Simsiz zaryadlash', description: 'Qi standartidagi induktiv zaryadlash', icon: '⚡' },
      { title: 'Uzoq chiroq avto', description: "Qarama-qarshi avtomobilni ilg'ab avtomatik sozlash", icon: '💡' },
    ],
    colors: [
      { name: 'Oq', hex: '#F8F8F8' },
      { name: 'Qora', hex: '#1A1A1A' },
      { name: "Ko'k", hex: '#1B3A6B' },
      { name: 'Kumush', hex: '#B8B8B8' },
      { name: 'Bronza', hex: '#8C7B5A' },
    ],
    safetyRating: 5,
  },
  {
    id: 'equinox',
    name: 'Chevrolet Equinox',
    subtitle: 'Zamonaviy krossover',
    tagline: "Har yo'lda ishonchli hamroh",
    description:
      "Equinox — kuchli dvigatel va to'liq yuldosh navigatsiya tizimi bilan premium sinf tajribasini taqdim etadi. Har qanday yo'lda ishonchli va qulay haydash uchun yaratilgan. Turbo dvigatel, AWD tizimi va zamonaviy xavfsizlik tizimlari bilan jihozlangan.",
    price: '360 000 000',
    monthlyPayment: '6 000 000',
    category: 'SUV',
    badge: 'Yangi',
    badgeColor: 'bg-emerald-500 text-black',
    images: [
      'https://images.unsplash.com/photo-1583121274602-3e2820c69888?q=80&w=2070&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?q=80&w=2070&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1580414057403-c5f451f30e1c?q=80&w=2070&auto=format&fit=crop',
    ],
    specs: {
      engine: '2.0L Turbo',
      power: '252 ot kuchi',
      transmission: '9AT · AWD',
      fuel: '8.5 l/100km',
      trunkVolume: '840/1795 L',
      seats: '5 o\'rindiq',
    },
    features: [
      { title: 'Adaptive Cruise', description: "Oldingi masofani saqlovchi aqlli kruiz-kontrol", icon: '🚗' },
      { title: 'Blind Spot', description: "Ko'r burchak nazorat tizimi", icon: '👁️' },
      { title: 'Bose Audio', description: "10 ta dinamikli premium audio tizimi", icon: '🎵' },
      { title: 'Panorama lyuk', description: "Elektrli panorama shisha lyuk", icon: '☀️' },
    ],
    colors: [
      { name: 'Oq', hex: '#FAFAFA' },
      { name: 'Qizil', hex: '#8B1A1A' },
      { name: 'Qora', hex: '#111111' },
      { name: 'Kulrang', hex: '#808080' },
    ],
    safetyRating: 5,
  },
  {
    id: 'tahoe-rst',
    name: 'Chevrolet Tahoe RST',
    subtitle: 'Kuchli fullsize SUV',
    tagline: "Amerika kuchi va hashamati",
    description:
      "Tahoe — amerikalik kuch va hashamat timsoli. Kuchli V8 dvigateli, keng 7-8 o'rindiqli saloni va premium texnologik jihozlanishi bilan lider o'rnini saqlab kelmoqda. RST paketi sport dizayni va kuchaytirilgan ishlash ko'rsatkichlari bilan.",
    price: '1 109 274 880',
    monthlyPayment: '18 487 915',
    category: 'SUV',
    badge: 'Premium',
    badgeColor: 'bg-purple-500 text-white',
    images: [
      'https://images.unsplash.com/photo-1617788138017-80ad40651399?q=80&w=2070&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?q=80&w=2071&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1561361058-c24cecae35ca?q=80&w=2070&auto=format&fit=crop',
    ],
    specs: {
      engine: '5.3L V8',
      power: '355 ot kuchi',
      transmission: '10AT · 4WD',
      fuel: '12 l/100km',
      trunkVolume: '776/3180 L',
      seats: '8 o\'rindiq',
    },
    features: [
      { title: 'Air Suspension', description: "Havo amortizatorlari — haydash balandligini boshqaring", icon: '🌬️' },
      { title: 'Super Cruise', description: "Qo'lsiz haydash imkoniyati (avtoulov yo'lda)", icon: '🤖' },
      { title: '15\" Ekran', description: "HD sensorli infoteyment ekran", icon: '📺' },
      { title: 'V8 Kuch', description: "355 ot kuchli V8 dvigatelning beqiyos kuchi", icon: '🔥' },
    ],
    colors: [
      { name: 'Qora', hex: '#0A0A0A' },
      { name: 'Oq', hex: '#FFFFFF' },
      { name: 'Kumush', hex: '#C0C0C0' },
      { name: "To'q ko'k", hex: '#0D1B2A' },
    ],
    safetyRating: 4,
  },
  {
    id: 'tahoe-hc',
    name: 'Tahoe High Country',
    subtitle: 'Luxe fullsize SUV',
    tagline: "Hech narsadan chekinmaslik",
    description:
      "Tahoe High Country — GM avtomobillari ichida eng yuqori darajadagi hashamat. 6.2L V8 dvigatel, charm qoplama interyeri, o'rnatilgan massaj o'rindiqlari va barcha premium qo'shimchalar bilan jihozlangan.",
    price: '1 464 500 000',
    monthlyPayment: '24 408 334',
    category: 'SUV',
    badge: 'Top',
    badgeColor: 'bg-amber-600 text-white',
    images: [
      'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?q=80&w=2071&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1617788138017-80ad40651399?q=80&w=2070&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=2070&auto=format&fit=crop',
    ],
    specs: {
      engine: '6.2L V8',
      power: '420 ot kuchi',
      transmission: '10AT · 4WD',
      fuel: '13.5 l/100km',
      trunkVolume: '776/3180 L',
      seats: '7 o\'rindiq',
    },
    features: [
      { title: 'Massaj o\'rindiq', description: "Old o'rindiqlar ichida o'rnatilgan massaj tizimi", icon: '💆' },
      { title: 'Charm interyeri', description: "Yuqori sifatli charm va yog\'och bezaklar", icon: '✨' },
      { title: 'Night Vision', description: "Tungi ko'rish kamerasi — xavfsiz tun harakati", icon: '🌙' },
      { title: '6.2L V8', description: "420 ot kuchli mega dvigatel", icon: '🔥' },
    ],
    colors: [
      { name: 'Qora', hex: '#0A0A0A' },
      { name: 'Bronza-Qora', hex: '#3D2B1F' },
      { name: 'Oq', hex: '#F8F6F2' },
      { name: 'Kumush', hex: '#D4D4D4' },
    ],
    safetyRating: 5,
  },
  {
    id: 'malibu',
    name: 'Chevrolet Malibu',
    subtitle: 'Biznes sedan',
    tagline: "Biznes uchun yaratilgan",
    description:
      "Malibu — zamonaviy biznes sedani. Aerodynamik dizayni, qulay saloni va turbo dvigateli bilan shahar va magistral yo'llarda muvaffaqiyatli haydash uchun yaratilgan. Yuqori xavfsizlik reytingi va boy komplekatatsiya.",
    price: '289 900 000',
    monthlyPayment: '4 831 667',
    category: 'Sedan',
    badge: 'Ommabop',
    badgeColor: 'bg-yellow-500 text-black',
    images: [
      'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?q=80&w=2070&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1580414057403-c5f451f30e1c?q=80&w=2070&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=2083&auto=format&fit=crop',
    ],
    specs: {
      engine: '1.5L Turbo',
      power: '163 ot kuchi',
      transmission: '6AT · FWD',
      fuel: '7.0 l/100km',
      trunkVolume: '447 L',
      seats: '5 o\'rindiq',
    },
    features: [
      { title: 'Bose Audio', description: "8 dinamikli Bose premium audio tizimi", icon: '🎵' },
      { title: 'Aqlli park', description: "Avtonom parallel park qilish tizimi", icon: '🅿️' },
      { title: 'Simsiz zaryadlash', description: "Induktiv telefon zaryadlovchi panelik", icon: '⚡' },
      { title: 'Adaptive LED', description: "Aqlli LED faralar — burilishda yoritadi", icon: '💡' },
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
  {
    id: 'onix',
    name: 'Chevrolet Onix',
    subtitle: 'Shaharda qulay sedan',
    tagline: "Shahar hayotiga mos",
    description:
      "Onix — iqtisodiy va zamonaviy sedan. Shahar harakatiga moslashtirilgan, yoqilg'i tejamkor va qulay boshqarish bilan ajralib turadi. Yosh haydovchilar va birinchi avtomobil sifatida ideal tanlov.",
    price: '165 000 000',
    monthlyPayment: '2 750 000',
    category: 'Sedan',
    badge: 'Yangi',
    badgeColor: 'bg-emerald-500 text-black',
    images: [
      'https://images.unsplash.com/photo-1580414057403-c5f451f30e1c?q=80&w=2070&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=2083&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?q=80&w=2070&auto=format&fit=crop',
    ],
    specs: {
      engine: '1.2L',
      power: '101 ot kuchi',
      transmission: '6AT · FWD',
      fuel: '5.8 l/100km',
      trunkVolume: '412 L',
      seats: '5 o\'rindiq',
    },
    features: [
      { title: 'Touchscreen', description: "8 dyuymli sensorli multimedia ekrani", icon: '📱' },
      { title: 'Android Auto', description: "Android va Apple CarPlay ulanishi", icon: '🔗' },
      { title: 'Iqtisodiy rejim', description: "Yoqilg'i tejash uchun maxsus haydash rejimi", icon: '🌿' },
      { title: 'AEB tizimi', description: "Avtonom favqulodda tormozlash tizimi", icon: '🛡️' },
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
    id: 'cobalt',
    name: 'Chevrolet Cobalt',
    subtitle: 'Hamyonbop sedan',
    tagline: "Hammaga yetarli qulay",
    description:
      "Cobalt — O'zbekistonda eng ko'p sotilgan avtomobillardan biri. Hamyonbop narxi, past yoqilg'i sarfi va ishonchli dvigateli bilan birinchi avtomobil xaridi uchun eng to'g'ri tanlov. Ehtiyot qismlari arzon va keng tarqalgan.",
    price: '135 000 000',
    monthlyPayment: '2 250 000',
    category: 'Sedan',
    images: [
      'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=2083&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1580414057403-c5f451f30e1c?q=80&w=2070&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?q=80&w=2070&auto=format&fit=crop',
    ],
    specs: {
      engine: '1.5L',
      power: '106 ot kuchi',
      transmission: '6AT · FWD',
      fuel: '6.2 l/100km',
      trunkVolume: '420 L',
      seats: '5 o\'rindiq',
    },
    features: [
      { title: 'Multimedia', description: "Touchscreen multimedia tizimi bilan", icon: '📱' },
      { title: 'Xavfsizlik', description: "ABS, EBD, tormoz kuchaytirgich", icon: '🛡️' },
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
    id: 'express',
    name: 'Chevrolet Express',
    subtitle: 'Yuk miniveni',
    tagline: "Biznesingiz uchun ishonchli",
    description:
      "Express — yuk va passajir tashish uchun ishonchli tijorat transporti. Kuchli V8 dvigateli va katta yuk bo'shlig'i bilan biznes maqsadlari uchun ideal. Ishonchli va uzoq muddatli xizmat ko'rsatishi uchun yaratilgan.",
    price: '980 000 000',
    monthlyPayment: '16 333 334',
    category: 'LCV',
    images: [
      'https://images.unsplash.com/photo-1561361058-c24cecae35ca?q=80&w=2070&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?q=80&w=2071&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=2070&auto=format&fit=crop',
    ],
    specs: {
      engine: '6.0L V8',
      power: '342 ot kuchi',
      transmission: '6AT · RWD',
      fuel: '14 l/100km',
      trunkVolume: '5700 L',
      seats: '15 o\'rindiq',
    },
    features: [
      { title: 'Katta yuk', description: "5700 litr yuk bo'shlig'i", icon: '📦' },
      { title: 'V8 Kuch', description: "342 ot kuchli ishonchli V8", icon: '🔥' },
      { title: 'Durability', description: "Og'ir sharoitda uzoq xizmat", icon: '⚙️' },
      { title: 'Passajir yoki yuk', description: "Oson konvertatsiya qilinadi", icon: '🔄' },
    ],
    colors: [
      { name: 'Oq', hex: '#FFFFFF' },
      { name: 'Kumush', hex: '#C0C0C0' },
      { name: 'Qora', hex: '#1A1A1A' },
    ],
    safetyRating: 4,
  },
  {
    id: 'silverado',
    name: 'Chevrolet Silverado',
    subtitle: 'Pickup yuk mashinasi',
    tagline: "Hech qanday chiqim undan oshmassin",
    description:
      "Silverado — Amerikaning eng mashxur pickupi. 3.0L Duramax diesel dvigateli, kuchli burilish va tortish quvvati bilan og'ir yuklar va yo'ldan tashqari harakatlar uchun ideal. Mustahkamligi va ishonchliligi bilan ajralib turadi.",
    price: '1 250 000 000',
    monthlyPayment: '20 833 334',
    category: 'LCV',
    badge: 'Top',
    badgeColor: 'bg-amber-600 text-white',
    images: [
      'https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=2070&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1561361058-c24cecae35ca?q=80&w=2070&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?q=80&w=2071&auto=format&fit=crop',
    ],
    specs: {
      engine: '3.0L Diesel',
      power: '277 ot kuchi',
      transmission: '10AT · 4WD',
      fuel: '10.5 l/100km',
      trunkVolume: '1700 L (kuzov)',
      seats: '5 o\'rindiq',
    },
    features: [
      { title: 'Tortish 4500 kg', description: "4500 kg gacha yuk tortish qobiliyati", icon: '⛓️' },
      { title: 'Multi-Flex kuzov', description: "Kuzov bo'shlig'ini moslashtiring", icon: '📦' },
      { title: '4WD Turbo', description: "Boshqariladigan to'liq yuldosh uzatma", icon: '🌄' },
      { title: 'Diesel sarfkor', description: "Diesel dvigatel — uzoq safar uchun", icon: '⛽' },
    ],
    colors: [
      { name: 'Qora', hex: '#0A0A0A' },
      { name: 'Oq', hex: '#FFFFFF' },
      { name: "To'q kulrang", hex: '#4A4A4A' },
      { name: "Qizil", hex: '#8B0000' },
    ],
    safetyRating: 4,
  },
]

export function getCarById(id: string): Car | undefined {
  return carsData.find(car => car.id === id)
}
