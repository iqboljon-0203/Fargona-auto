import type { Metadata } from "next";
import { Geist, Geist_Mono, Rajdhani } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import dynamic from 'next/dynamic'
import { i18n, type Locale } from "@/i18n-config";

const FloatingContact = dynamic(() => import('@/components/FloatingContact'))
const ViewTracker = dynamic(() => import('@/components/ViewTracker'))
import "../globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const rajdhani = Rajdhani({
  variable: "--font-rajdhani",
  subsets: ["latin"],
  weight: ["600", "700"],
});

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const lang = resolvedParams.lang || 'uz';

  const titles: Record<string, string> = {
    uz: "Farg'ona Chevrolet - Rasmiy Diller",
    ru: "Farg'ona Chevrolet - Официальный дилер",
    en: "Farg'ona Chevrolet - Official Dealer"
  };

  const descriptions: Record<string, string> = {
    uz: "Chevrolet avtomobillari: Onix, Tracker, Cobalt va boshqalar. Farg'ona viloyatida yagona rasmiy diller. Muddatli to'lov.",
    ru: "Автомобили Chevrolet в Фергане: Onix, Tracker, Cobalt. Официальный дилер, рассрочка, гарантия.",
    en: "Chevrolet vehicles in Fergana: Onix, Tracker, Cobalt. Official dealer, installments, warranty."
  };

  const siteUrl = "https://fargona-chevrolet.uz"; // Update explicitly if needed

  return {
    title: titles[lang] || titles.uz,
    description: descriptions[lang] || descriptions.uz,
    metadataBase: new URL(siteUrl),
    icons: {
      icon: '/chevrolet.svg',
      shortcut: '/chevrolet.svg',
      apple: '/chevrolet.svg',
    },
    openGraph: {
      title: titles[lang] || titles.uz,
      description: descriptions[lang] || descriptions.uz,
      url: `${siteUrl}/${lang}`,
      siteName: "Farg'ona Chevrolet",
      images: [
        {
          url: "/cars/tahoe-rst/car-gallery.webp",
          width: 1200,
          height: 630,
          alt: titles[lang] || titles.uz,
        }
      ],
      locale: lang,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: titles[lang] || titles.uz,
      description: descriptions[lang] || descriptions.uz,
      images: ['/cars/tahoe-rst/car-gallery.webp'],
    },
    alternates: {
      canonical: `${siteUrl}/${lang}`,
      languages: {
        'uz-UZ': `${siteUrl}/uz`,
        'ru-RU': `${siteUrl}/ru`,
        'en-US': `${siteUrl}/en`,
      },
    },
  };
}

export function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }))
}

import { DictionaryProvider } from "@/components/DictionaryProvider";
import { getDictionary } from "@/get-dictionary";

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}>) {
  const { lang } = await params
  const dict = await getDictionary(lang as Locale)

  return (
    <html lang={lang} suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} ${rajdhani.variable} antialiased`}>
        <DictionaryProvider dictionary={dict} lang={lang}>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem={false}
            disableTransitionOnChange
          >
            <a
              href="#main-content"
              className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:bg-yellow-500 focus:text-black focus:px-4 focus:py-2 focus:rounded-lg focus:font-bold focus:text-sm"
            >
              {(dict as any).common.skip_to_content || 'Asosiy kontentga o\'tish'}
            </a>
            {children}
            <FloatingContact />
            <ViewTracker />
          </ThemeProvider>
        </DictionaryProvider>
      </body>
    </html>
  );
}
