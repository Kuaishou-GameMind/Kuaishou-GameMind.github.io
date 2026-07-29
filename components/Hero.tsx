'use client'

import { useRef, useEffect, useState } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import { ArrowRight, Github } from 'lucide-react'
import { useTheme } from './ThemeProvider'
import { useLang } from './LangProvider'

interface HeroProps {
  onExplore: () => void
}

const stats = [
  { value: '12+', labelZh: '开源项目', labelEn: 'Open Source' },
  { value: '3', labelZh: '研究方向', labelEn: 'Research Tracks' },
  { value: '100%', labelZh: 'AI × 游戏', labelEn: 'AI × Gaming' },
]

export default function Hero({ onExplore }: HeroProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 })
  const { theme } = useTheme()
  const { t } = useLang()
  const { scrollYProgress } = useScroll()

  const isDark = theme === 'dark'
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 80, damping: 25 })
  const y = useTransform(smoothProgress, [0, 1], [0, -120])
  const opacity = useTransform(smoothProgress, [0, 0.55], [1, 0])

  useEffect(() => {
    const handle = (e: MouseEvent) => setMousePos({
      x: e.clientX / window.innerWidth,
      y: e.clientY / window.innerHeight,
    })
    window.addEventListener('mousemove', handle, { passive: true })
    return () => window.removeEventListener('mousemove', handle)
  }, [])

  const bgBase = isDark ? '#0a0a0a' : '#ffffff'
  const borderCol = isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)'
  const textMuted = isDark ? 'text-white/40' : 'text-black/40'
  const textSub = isDark ? 'text-white/60' : 'text-black/60'

  // Parallax glow follows mouse
  const glowX = mousePos.x * 100
  const glowY = mousePos.y * 100

  return (
    <motion.section
      ref={containerRef}
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ y, opacity, backgroundColor: bgBase }}
    >
      {/* Ambient glow — orange */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse 60% 50% at ${glowX}% ${glowY}%, rgba(255,100,0,${isDark ? '0.12' : '0.07'}) 0%, transparent 65%)`,
          transition: 'background 0.4s ease',
        }}
      />

      {/* Subtle grid lines — Framer aesthetic */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(${borderCol} 1px, transparent 1px), linear-gradient(90deg, ${borderCol} 1px, transparent 1px)`,
          backgroundSize: '120px 120px',
          opacity: 0.5,
        }}
      />

      {/* Top rule */}
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: borderCol }} />

      <div className="relative z-10 w-full px-6 sm:px-12 lg:px-20 max-w-[1400px] mx-auto pt-32 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-16 items-end">

          {/* Left — main content */}
          <div>
            {/* Label */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="flex items-center gap-3 mb-10"
            >
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-[#FF6400] animate-pulse" />
                <span className={`text-xs font-medium tracking-[0.18em] uppercase ${textMuted}`}>
                  {t('Kuaishou GameMind Lab', 'Kuaishou GameMind Lab')}
                </span>
              </div>
            </motion.div>

            {/* Headline — Framer scale: massive, tight */}
            <motion.h1
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="font-black leading-[0.92] tracking-[-0.04em] mb-8"
              style={{
                fontSize: 'clamp(3.5rem, 10vw, 9rem)',
                fontFamily: "'Inter', sans-serif",
                color: isDark ? '#fff' : '#0a0a0a',
              }}
            >
              <span className="block">{t('Kuaishou', 'Kuaishou')}</span>
              <span
                className="block"
                style={{
                  background: 'linear-gradient(135deg, #FF6400 0%, #ffb347 60%, rgba(255,100,0,0.5) 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                {t('GameMind Lab', 'GameMind Lab')}
              </span>
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className={`text-base sm:text-lg max-w-lg leading-relaxed mb-12 ${textSub}`}
              style={{ fontWeight: 400 }}
            >
              {t(
                '连接前沿 AI 与真实游戏世界，探索新一代游戏研发与互动体验的全新可能，让人工智能成为游戏世界的核心驱动力。',
                'Bridging frontier AI with the real game world, exploring new possibilities for next-generation game development and interactive experiences — making AI the core driving force of the gaming world.'
              )}
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-wrap items-center gap-3"
            >
              <motion.button
                onClick={onExplore}
                className="group inline-flex items-center gap-2.5 px-6 py-3 rounded-full text-sm font-semibold text-white transition-all duration-200"
                style={{
                  background: '#FF6400',
                  boxShadow: '0 0 0 1px rgba(0,85,255,0.5), 0 8px 24px rgba(0,85,255,0.3)',
                }}
                whileHover={{ scale: 1.03, boxShadow: '0 0 0 1px rgba(0,85,255,0.7), 0 12px 32px rgba(0,85,255,0.4)' }}
                whileTap={{ scale: 0.97 }}
              >
                {t('探索开源项目', 'Explore Projects')}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </motion.button>

              <motion.a
                href="https://github.com/Kuaishou-GameMind"
                className={`inline-flex items-center gap-2.5 px-6 py-3 rounded-full text-sm font-medium border transition-all duration-200 ${
                  isDark
                    ? 'border-white/12 text-white/70 hover:border-white/25 hover:text-white hover:bg-white/5'
                    : 'border-black/12 text-black/60 hover:border-black/25 hover:text-black hover:bg-black/4'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
              >
                <Github className="w-4 h-4" />
                GitHub
              </motion.a>
            </motion.div>
          </div>

          {/* Right — decorative GameMind logo, aligned to production */}
          <div
            className="hidden lg:flex items-end justify-end self-end pointer-events-none select-none"
            style={{ width: 420, height: 420, marginRight: -100, marginBottom: -140 }}
          >
            <div
              style={{
                width: '100%',
                height: '100%',
                position: 'relative',
                opacity: 0.18,
                maskImage: 'linear-gradient(black 40%, transparent 100%)',
                WebkitMaskImage: 'linear-gradient(black 40%, transparent 100%)',
              }}
            >
              <img
                src="/logo.svg"
                alt=""
                aria-hidden="true"
                className="w-full h-full object-contain"
                draggable={false}
                style={{ pointerEvents: 'none', userSelect: 'none' }}
              />
            </div>
          </div>

        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className={`absolute bottom-10 left-6 sm:left-12 lg:left-20 flex items-center gap-3 ${textMuted}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <motion.div
          className="w-px h-10 origin-top"
          style={{ background: '#FF6400', opacity: 0.5 }}
          animate={{ scaleY: [0.3, 1, 0.3] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        />
        <span className="text-[10px] uppercase tracking-[0.2em]">{t('向下滚动', 'Scroll')}</span>
      </motion.div>
    </motion.section>
  )
}
