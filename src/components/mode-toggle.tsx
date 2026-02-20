
"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { useDictionary } from "./DictionaryProvider"

export function ModeToggle() {
  const dict = useDictionary()
  const { setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <button aria-label="Toggle theme" className="relative p-2 rounded-full w-9 h-9 border border-zinc-200 dark:border-zinc-800 opacity-50 cursor-pointer-events-none" />
    )
  }

  return (
    <button
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      className="relative p-2 rounded-full hover:bg-zinc-100 dark:hover:bg-white/10 transition-colors"
      aria-label={(dict as any).common.toggle_theme || 'Toggle theme'}
    >
      <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 text-zinc-950 dark:text-white" />
      <Moon className="absolute top-2 left-2 h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 text-zinc-950 dark:text-white" />
    </button>
  )
}
