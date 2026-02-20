
'use client'

import { useState } from 'react'
import { Phone, X, Send, MessageCircle } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const contacts = [
  {
    name: 'Telefon',
    href: 'tel:+998954002087',
    icon: Phone,
    color: 'bg-blue-500',
    label: '+998 95 400 20 87',
  },
  {
    name: 'Telegram',
    href: 'https://t.me/fargonachevrolet',
    icon: Send,
    color: 'bg-sky-500',
    label: 'Telegram',
  },
]

export default function FloatingContact() {
  const [open, setOpen] = useState(false)

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {/* Expanded menu */}
      <AnimatePresence>
        {open && (
          <>
            {contacts.map((c, i) => (
              <motion.a
                key={c.name}
                href={c.href}
                target={c.href.startsWith('http') ? '_blank' : undefined}
                rel={c.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                initial={{ opacity: 0, y: 20, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.8 }}
                transition={{ delay: i * 0.05 }}
                className="flex items-center gap-3 group"
              >
                <span className="bg-zinc-900 text-white text-xs font-semibold px-3 py-1.5 rounded-lg shadow-lg border border-zinc-800 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  {c.label}
                </span>
                <div className={`w-12 h-12 rounded-full ${c.color} flex items-center justify-center text-white shadow-lg hover:scale-110 transition-transform`}>
                  <c.icon size={20} />
                </div>
              </motion.a>
            ))}
          </>
        )}
      </AnimatePresence>

      {/* Main FAB */}
      <button
        onClick={() => setOpen(!open)}
        className={`w-14 h-14 rounded-full flex items-center justify-center text-white shadow-xl transition-all duration-300 ${
          open
            ? 'bg-zinc-800 rotate-90'
            : 'bg-emerald-500 hover:bg-emerald-400 animate-pulse hover:animate-none'
        }`}
      >
        {open ? <X size={24} /> : <MessageCircle size={24} />}
      </button>
    </div>
  )
}
