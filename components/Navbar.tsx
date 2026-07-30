'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Sun, Moon, Github, Languages } from 'lucide-react'
import { useTheme } from './ThemeProvider'
import { useLang } from './LangProvider'

export default function Navbar() {
  const [mounted, setMounted] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { theme, toggleTheme } = useTheme()
  const { lang, toggleLang, t } = useLang()

  useEffect(() => {
    setMounted(true)
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  if (!mounted) return null

  const isDark = theme === 'dark'

  const navBg = scrolled
    ? isDark
      ? 'bg-black/85 backdrop-blur-2xl border-b border-white/[0.06]'
      : 'bg-white/85 backdrop-blur-2xl border-b border-gray-200/80'
    : 'bg-transparent'

  const textPrimary = isDark ? 'text-white' : 'text-gray-900'
  const textSecondary = isDark ? 'text-white/55' : 'text-gray-500'
  const borderColor = isDark ? 'border-white/[0.06]' : 'border-gray-100'
  const hoverBg = isDark ? 'hover:bg-white/[0.05]' : 'hover:bg-gray-50'
  const navLinkHover = isDark ? 'hover:text-white' : 'hover:text-gray-900'

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false)
    if (href.startsWith('#')) {
      const id = href.replace('#', '')
      const el = document.getElementById(id)
      if (el) el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const navItems = [
    { label: t('首页', 'Home'), href: '#home' },
    { label: t('团队介绍', 'About'), href: '#team' },
    { label: t('开源项目', 'Projects'), href: '#projects' },
  ]

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${navBg}`}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-20">
          <div className="flex items-center justify-between h-16 sm:h-20">

            {/* Logo — GameMind square icon + wordmark */}
            <button onClick={() => handleNavClick('#home')} className="flex items-center gap-3 group">
              <img
                src="/logo.svg"
                alt="Kuaishou GameMind Lab"
                className="w-9 h-9 flex-shrink-0 transition-transform duration-200 group-hover:scale-95"
              />
              <span
                className={`font-bold text-[13px] hidden sm:block ${textPrimary} transition-opacity duration-200 group-hover:opacity-70`}
                style={{ fontFamily: 'Inter, sans-serif', letterSpacing: '-0.02em' }}
              >
                {t('Kuaishou GameMind Lab', 'Kuaishou GameMind Lab')}
              </span>
            </button>

            {/* Desktop nav links */}
            <div className="hidden md:flex items-center gap-0.5">
              {navItems.map((item) => (
                <button
                  key={item.href}
                  onClick={() => handleNavClick(item.href)}
                  className={`px-4 py-2 text-[13px] font-medium ${textSecondary} ${navLinkHover} transition-colors duration-200 rounded-lg ${hoverBg}`}
                  style={{ fontFamily: 'Inter, sans-serif' }}
                >
                  {item.label}
                </button>
              ))}

            </div>

            {/* Right actions */}
            <div className="flex items-center gap-1.5">
              {/* Language toggle — pill style */}
              <button
                onClick={toggleLang}
                title={t('切换英文', 'Switch to Chinese')}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-full border ${borderColor} ${textSecondary} ${navLinkHover} transition-all duration-200`}
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                <Languages className="w-3.5 h-3.5" />
                {lang === 'zh' ? 'EN' : '中'}
              </button>

              {/* Theme toggle */}
              <button
                onClick={toggleTheme}
                className={`p-2 ${textSecondary} ${navLinkHover} transition-colors duration-200 rounded-lg ${hoverBg}`}
                title={isDark ? 'Light mode' : 'Dark mode'}
              >
                {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </button>

              {/* GitHub — orange background */}
              <a
                href="https://github.com/Kuaishou-GameMind"
                className="hidden sm:flex items-center p-2 rounded-lg transition-all duration-200 hover:opacity-85 hover:scale-[0.97]"
                style={{ background: '#FF6400', color: '#fff', boxShadow: '0 0 16px rgba(255,100,0,0.35)' }}
              >
                <Github className="w-4 h-4" />
              </a>

              {/* Mobile menu button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className={`md:hidden p-2 ${textSecondary} ${navLinkHover} transition-colors duration-200`}
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className={`md:hidden ${isDark ? 'bg-black/95' : 'bg-white/95'} backdrop-blur-2xl border-t ${borderColor} overflow-hidden`}
            >
              <div className="px-6 py-4 space-y-1">
                {navItems.map((item) => (
                  <button
                    key={item.href}
                    onClick={() => handleNavClick(item.href)}
                    className={`w-full text-left flex items-center px-4 py-3 text-base font-medium ${textSecondary} ${navLinkHover} rounded-xl ${hoverBg} transition-all duration-200`}
                    style={{ fontFamily: 'Inter, sans-serif' }}
                  >
                    {item.label}
                  </button>
                ))}
                <div className={`pt-4 border-t ${borderColor}`}>
                  <a
                    href="https://github.com/Kuaishou-GameMind"
                    className={`flex items-center gap-3 px-4 py-3 text-base font-medium ${textSecondary} ${navLinkHover} rounded-xl ${hoverBg} transition-all duration-200`}
                    style={{ fontFamily: 'Inter, sans-serif' }}
                  >
                    <Github className="w-4 h-4" />
                    GitHub
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      <div className="h-16 sm:h-20" />
    </>
  )
}
