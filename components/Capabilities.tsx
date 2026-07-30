'use client'

import { useRef, useState, useCallback, useEffect } from 'react'
import { motion, AnimatePresence, useSpring, useMotionValue } from 'framer-motion'
import { ArrowRight, Github, ChevronLeft, ChevronRight } from 'lucide-react'
import { useTheme } from './ThemeProvider'
import { useLang } from './LangProvider'
import { liveProjects, type Project } from './projects'

const ORANGE = '#FF6400'
const AUTO_PLAY_MS = 6000

// ── Tilt card ──────────────────────────────────────────────────
function TiltCard({ children, className, style }: {
  children: React.ReactNode
  className?: string
  style?: React.CSSProperties
}) {
  const ref = useRef<HTMLDivElement>(null)
  const rotX = useMotionValue(0)
  const rotY = useMotionValue(0)

  const springRotX = useSpring(rotX, { stiffness: 180, damping: 26 })
  const springRotY = useSpring(rotY, { stiffness: 180, damping: 26 })

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    const dx = (e.clientX - cx) / (rect.width / 2)
    const dy = (e.clientY - cy) / (rect.height / 2)
    rotX.set(-dy * 5)
    rotY.set(dx * 5)
  }, [rotX, rotY])

  const handleMouseLeave = useCallback(() => {
    rotX.set(0)
    rotY.set(0)
  }, [rotX, rotY])

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={className}
      style={{
        ...style,
        rotateX: springRotX,
        rotateY: springRotY,
        transformStyle: 'preserve-3d',
        perspective: 1000,
        position: 'relative',
        overflow: 'hidden',
      }}
      whileHover={{ scale: 1.012 }}
      transition={{ scale: { duration: 0.3 } }}
    >
      {children}
    </motion.div>
  )
}

// ── Big card (one slide) ────────────────────────────────────────
function BigCard({ project, isDark, lang, t }: {
  project: Project
  isDark: boolean
  lang: 'zh' | 'en'
  t: (zh: string, en: string) => string
}) {
  const cardBg = isDark ? 'bg-[#0d0d0d]' : 'bg-white'
  const textPrimary = isDark ? 'text-white' : 'text-gray-900'
  const textMuted = isDark ? 'text-white/45' : 'text-gray-500'
  const border = isDark ? 'border-white/[0.06]' : 'border-gray-200'
  const tags = lang === 'zh' ? project.tagsZh : project.tagsEn
  const fit = project.previewFit ?? 'contain'

  return (
    <TiltCard
      className={`relative ${cardBg} border ${border} rounded-3xl`}
      style={{
        boxShadow: isDark
          ? '0 0 0 1px rgba(255,100,0,0.12), 0 0 60px rgba(255,100,0,0.06)'
          : '0 2px 24px rgba(0,0,0,0.07)',
      }}
    >
      {/* Open-source badge */}
      <div className="absolute top-6 right-10 z-20">
        <span
          className="flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold text-white"
          style={{ background: '#22c55e' }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
          {t('已开源', 'Open Source')}
        </span>
      </div>

      <div className="relative z-10 px-8 sm:px-12 pt-10 pb-8">
        <div className="flex items-center gap-2 mb-5 flex-wrap">
          <span
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold text-white"
            style={{ background: ORANGE }}
          >
            <project.icon className="w-5 h-5" />
            {project.subtitle}
          </span>
          {tags.map(tag => (
            <span
              key={tag}
              className={`px-2.5 py-1 text-[11px] rounded-full font-medium ${isDark ? 'bg-white/[0.06] text-white/40' : 'bg-gray-100 text-gray-500'}`}
            >
              {tag}
            </span>
          ))}
        </div>
        <h3
          className={`text-2xl sm:text-4xl font-black mb-4 ${textPrimary} leading-snug`}
          style={{ fontFamily: 'Inter, sans-serif', letterSpacing: '-0.03em' }}
        >
          {lang === 'zh' ? project.titleZh : project.titleEn}
        </h3>
        <p
          className="text-base sm:text-lg font-semibold mb-3 leading-snug max-w-2xl"
          style={{ color: ORANGE, fontFamily: 'Inter, sans-serif' }}
        >
          {lang === 'zh' ? project.subtitleDescZh : project.subtitleDescEn}
        </p>
        <p className={`text-sm sm:text-[15px] ${textMuted} leading-relaxed max-w-2xl mb-8`}>
          {lang === 'zh' ? project.descZh : project.descEn}
        </p>
        <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
          <a
            href={project.link}
            className="group inline-flex items-center gap-2 text-sm font-semibold transition-all duration-200 hover:opacity-80"
            style={{ color: ORANGE, fontFamily: 'Inter, sans-serif' }}
          >
            {t('查看项目', 'View Project')}
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </a>
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className={`group inline-flex items-center gap-2 text-sm font-medium transition-all duration-200 hover:opacity-80 ${textMuted}`}
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              <Github className="w-3.5 h-3.5" />
              GitHub
            </a>
          )}
        </div>
      </div>

      {/* Visual preview area */}
      <div
        className={`mx-6 sm:mx-10 mb-6 rounded-2xl overflow-hidden border ${border} aspect-[16/9]`}
        style={{ position: 'relative', background: isDark ? '#000' : '#f4f4f4' }}
      >
        {project.preview ? (
          <img
            src={project.preview}
            alt={project.nameEn}
            className="w-full h-full"
            style={{ objectFit: fit, display: 'block' }}
          />
        ) : (
          // 降级版式：logo + 品牌色径向渐变
          <div
            className="w-full h-full flex items-center justify-center"
            style={{
              background: `radial-gradient(ellipse 70% 60% at 50% 50%, rgba(255,100,0,${isDark ? '0.18' : '0.12'}) 0%, transparent 70%)`,
            }}
          >
            {project.logo ? (
              <img
                src={project.logo}
                alt={project.nameEn}
                className="w-28 h-28 object-contain opacity-80"
              />
            ) : (
              <project.icon className="w-24 h-24 opacity-70" style={{ color: ORANGE }} />
            )}
          </div>
        )}
      </div>
    </TiltCard>
  )
}

// ── Carousel ───────────────────────────────────────────────────
function Carousel({ projects, isDark, lang, t }: {
  projects: Project[]
  isDark: boolean
  lang: 'zh' | 'en'
  t: (zh: string, en: string) => string
}) {
  const count = projects.length
  // [direction, index]：direction 决定滑入方向
  const [[dir, idx], setState] = useState<[number, number]>([1, 0])
  const [paused, setPaused] = useState(false)

  const go = useCallback((next: number, direction: number) => {
    setState([direction, ((next % count) + count) % count])
  }, [count])

  const prev = useCallback(() => go(idx - 1, -1), [go, idx])
  const next = useCallback(() => go(idx + 1, 1), [go, idx])

  // 自动播放：paused 或仅 1 项时不启动
  useEffect(() => {
    if (paused || count <= 1) return
    const id = setInterval(() => setState(s => [1, (s[1] + 1) % count]), AUTO_PLAY_MS)
    return () => clearInterval(id)
  }, [paused, count])

  const showControls = count > 1

  return (
    <div
      className="relative"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Slides viewport */}
      <div className="relative">
        <AnimatePresence custom={dir} mode="popLayout" initial={false}>
          <motion.div
            key={idx}
            custom={dir}
            initial={{ opacity: 0, x: dir > 0 ? 60 : -60 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: dir > 0 ? -60 : 60 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <BigCard project={projects[idx]} isDark={isDark} lang={lang} t={t} />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Controls */}
      {showControls && (
        <div className="flex items-center justify-center gap-6 mt-8">
          {/* Prev arrow */}
          <button
            onClick={prev}
            aria-label={t('上一个项目', 'Previous project')}
            className={`flex items-center justify-center w-11 h-11 rounded-full border transition-all duration-200 hover:scale-105 ${
              isDark
                ? 'border-white/10 text-white/70 hover:text-white hover:border-white/20'
                : 'border-gray-300 text-gray-500 hover:text-gray-900 hover:border-gray-400'
            }`}
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Dots */}
          <div className="flex items-center gap-2">
            {projects.map((_, i) => (
              <button
                key={i}
                onClick={() => go(i, i > idx ? 1 : -1)}
                aria-label={t('第 {n} 个项目', 'Go to project {n}').replace('{n}', String(i + 1))}
                className="group p-1"
              >
                <span
                  className="block rounded-full transition-all duration-300"
                  style={{
                    width: i === idx ? 28 : 8,
                    height: 8,
                    background: i === idx ? ORANGE : (isDark ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.15)'),
                  }}
                />
              </button>
            ))}
          </div>

          {/* Next arrow */}
          <button
            onClick={next}
            aria-label={t('下一个项目', 'Next project')}
            className={`flex items-center justify-center w-11 h-11 rounded-full border transition-all duration-200 hover:scale-105 ${
              isDark
                ? 'border-white/10 text-white/70 hover:text-white hover:border-white/20'
                : 'border-gray-300 text-gray-500 hover:text-gray-900 hover:border-gray-400'
            }`}
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      )}
    </div>
  )
}

export default function Capabilities() {
  const { theme } = useTheme()
  const { t, lang } = useLang()
  const isDark = theme === 'dark'

  // Mouse-following section glow
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 })
  useEffect(() => {
    const handle = (e: MouseEvent) => setMousePos({
      x: e.clientX / window.innerWidth,
      y: e.clientY / window.innerHeight,
    })
    window.addEventListener('mousemove', handle, { passive: true })
    return () => window.removeEventListener('mousemove', handle)
  }, [])

  const bg = isDark ? 'bg-[#050505]' : 'bg-[#f8f8f8]'
  const textPrimary = isDark ? 'text-white' : 'text-gray-900'

  return (
    <section id="projects" className={`py-32 px-6 ${bg} relative overflow-hidden`}>
      {/* Static top glow */}
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: `radial-gradient(ellipse 60% 50% at 50% 0%, rgba(255,100,0,0.07) 0%, transparent 70%)`,
      }} />

      {/* Mouse-following ambient glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse 55% 50% at ${mousePos.x * 100}% ${mousePos.y * 100}%, rgba(255,100,0,${isDark ? '0.10' : '0.05'}) 0%, transparent 65%)`,
          transition: 'background 0.4s ease',
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="mb-20"
        >
          <p className="text-[11px] font-semibold tracking-[0.35em] uppercase mb-5" style={{ color: ORANGE }}>
            Open Source
          </p>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
            <h2
              className={`font-black leading-[1.0] tracking-tight ${textPrimary}`}
              style={{ fontSize: 'clamp(3rem, 8vw, 6rem)', fontFamily: 'Inter, sans-serif', letterSpacing: '-0.04em' }}
            >
              {t('开源项目', 'Projects')}
            </h2>
          </div>
        </motion.div>

        {/* Project carousel */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.8 }}
        >
          <Carousel projects={liveProjects} isDark={isDark} lang={lang} t={t} />
        </motion.div>
      </div>
    </section>
  )
}