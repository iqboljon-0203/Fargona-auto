'use client'

import React, { createContext, useContext } from 'react'

type Dictionary = Record<string, unknown>

const DictionaryContext = createContext<Dictionary>({})

export function DictionaryProvider({
  dictionary,
  lang,
  children,
}: {
  dictionary: Dictionary
  lang: string
  children: React.ReactNode
}) {
  return (
    <DictionaryContext.Provider value={{ ...dictionary, lang }}>
      {children}
    </DictionaryContext.Provider>
  )
}

export function useDictionary() {
  const context = useContext(DictionaryContext)
  if (!context) {
    throw new Error('useDictionary must be used within a DictionaryProvider')
  }
  return context
}
