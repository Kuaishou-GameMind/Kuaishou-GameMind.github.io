'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

type Lang = 'zh' | 'en'

interface LangContextType {
  lang: Lang
  toggleLang: () => void
  t: (zh: string, en: string) => string
}

const LangContext = createContext<LangContextType>({
  lang: 'zh',
  toggleLang: () => {},
  t: (zh) => zh,
})

const STORAGE_KEY = 'gamemind-lang'

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>('zh')

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved === 'zh' || saved === 'en') {
        setLang(saved)
      } else {
        localStorage.setItem(STORAGE_KEY, 'zh')
      }
    } catch (e) {}
  }, [])

  useEffect(() => {
    document.documentElement.lang = lang === 'zh' ? 'zh-CN' : 'en'
  }, [lang])

  const toggleLang = () => {
    setLang(l => {
      const next = l === 'zh' ? 'en' : 'zh'
      try { localStorage.setItem(STORAGE_KEY, next) } catch (e) {}
      return next
    })
  }

  const t = (zh: string, en: string) => lang === 'zh' ? zh : en

  return (
    <LangContext.Provider value={{ lang, toggleLang, t }}>
      {children}
    </LangContext.Provider>
  )
}

export function useLang() {
  return useContext(LangContext)
}