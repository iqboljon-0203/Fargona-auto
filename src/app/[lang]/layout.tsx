import type { Metadata } from "next";
import { Geist, Geist_Mono, Rajdhani } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import FloatingContact from "@/components/FloatingContact";
import ViewTracker from "@/components/ViewTracker";
import { i18n, type Locale } from "@/i18n-config";
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

export const metadata: Metadata = {
  title: "Farg'ona Chevrolet - Rasmiy Diller",
  description: "Chevrolet avtomobillari Farg'ona viloyatida rasmiy dilleri.",
  icons: {
    icon: '/chevrolet.svg',
    shortcut: '/chevrolet.svg',
    apple: '/chevrolet.svg',
  },
};

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
  params: Promise<{ lang: Locale }>;
}>) {
  const { lang } = await params
  const dict = await getDictionary(lang)

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
