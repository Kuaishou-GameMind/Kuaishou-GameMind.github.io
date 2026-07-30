'use client'

import { useRef, useState, useCallback, useEffect } from 'react'
import { motion, useSpring, useMotionValue } from 'framer-motion'
import { ArrowRight, Github } from 'lucide-react'
import { useTheme } from './ThemeProvider'
import { useLang } from './LangProvider'
import { timelineProjects, type Project } from './projects'

const ORANGE = '#FF6400'

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

// ── Compact card (one timeline entry) ──────────────────────────
function CompactCard({ project, isDark, lang, t }: {
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

  return (
    <TiltCard
      className={`relative ${cardBg} border ${border} rounded-2xl`}
      style={{
        boxShadow: isDark
          ? '0 0 0 1px rgba(255,100,0,0.10), 0 0 40px rgba(255,100,0,0.05)'
          : '0 2px 16px rgba(0,0,0,0.06)',
      }}
    >
      <a href={project.link} className="relative z-10 flex items-center gap-5 sm:gap-6 p-5 sm:p-6">
        {/* 左侧 80px 方块图标区 */}
        <div
          className={`shrink-0 w-20 h-20 rounded-xl overflow-hidden border ${border} flex items-center justify-center`}
          style={{ background: isDark ? '#000' : '#f4f4f4' }}
        >
          {project.logo ? (
            <img
              src={project.logo}
              alt={project.nameEn}
              className="w-full h-full object-contain p-2"
            />
          ) : project.preview ? (
            <img
              src={project.preview}
              alt={project.nameEn}
              className="w-full h-full object-contain p-2"
            />
          ) : (
            <project.icon className="w-9 h-9" style={{ color: ORANGE }} />
          )}
        </div>

        {/* 右侧文本区 */}
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 mb-1.5">
            <span
              className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold text-white"
              style={{ background: ORANGE }}
            >
              {project.subtitle}
            </span>
          </div>
          <h3
            className={`text-lg sm:text-xl font-bold ${textPrimary} leading-snug mb-1 truncate`}
            style={{ fontFamily: 'Inter, sans-serif', letterSpacing: '-0.02em' }}
          >
            {lang === 'zh' ? project.titleZh : project.titleEn}
          </h3>
          <p className={`text-xs sm:text-[13px] ${textMuted} leading-snug mb-2.5 line-clamp-2`}>
            {lang === 'zh' ? project.subtitleDescZh : project.subtitleDescEn}
          </p>
          <div className="flex items-center gap-1.5 flex-wrap">
            {tags.slice(0, 3).map(tag => (
              <span
                key={tag}
                className={`px-2 py-0.5 text-[10px] rounded-full font-medium ${isDark ? 'bg-white/[0.06] text-white/45' : 'bg-gray-100 text-gray-500'}`}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* 右侧箭头 */}
        <ArrowRight
          className="shrink-0 w-4 h-4 hidden sm:block"
          style={{ color: ORANGE }}
        />
      </a>
    </TiltCard>
  )
}

// ── Timeline ───────────────────────────────────────────────────
function Timeline({ projects, isDark, lang, t }: {
  projects: Project[]
  isDark: boolean
  lang: 'zh' | 'en'
  t: (zh: string, en: string) => string
}) {
  const lineColor = isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)'

  return (
    <div className="relative">
      {/* 竖直时间轴主线 */}
      <div
        className="absolute left-4 sm:left-6 top-3 bottom-3 w-px"
        style={{ background: lineColor }}
      />

      <div className="space-y-5">
        {projects.map((project, i) => {
          const [y, m] = project.date.split('-')
          const dateLabel = lang === 'zh'
            ? `${y}年${Number(m)}月`
            : new Intl.DateTimeFormat('en', { month: 'short', year: 'numeric' }).format(new Date(project.date))

          return (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="relative pl-12 sm:pl-16"
            >
              {/* 时间节点圆点 */}
              <div
                className="absolute left-0 top-7 flex items-center justify-center w-8 sm:w-10"
                aria-hidden
              >
                <span
                  className="w-3 h-3 rounded-full ring-4 transition-transform duration-300 hover:scale-125"
                  style={{ background: ORANGE, boxShadow: `0 0 0 1px ${ORANGE}, 0 0 12px ${ORANGE}55`, ['--tw-ring-color' as string]: isDark ? '#050505' : '#f8f8f8' }}
                />
              </div>

              {/* 日期 + GitHub 行 */}
              <div className="mb-2 flex items-center gap-3">
                <span
                  className="text-sm font-bold tracking-wide"
                  style={{ color: ORANGE, fontFamily: 'Inter, sans-serif' }}
                >
                  {dateLabel}
                </span>
                {i === 0 && (
                  <span
                    className="flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-semibold text-white"
                    style={{ background: '#22c55e' }}
                  >
                    <span className="w-1 h-1 rounded-full bg-white animate-pulse" />
                    {t('最新', 'Latest')}
                  </span>
                )}
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={e => e.stopPropagation()}
                    className={`ml-auto inline-flex items-center gap-1 text-xs font-medium transition-opacity hover:opacity-70 ${isDark ? 'text-white/40' : 'text-gray-400'}`}
                    style={{ fontFamily: 'Inter, sans-serif' }}
                  >
                    <Github className="w-3.5 h-3.5" />
                    GitHub
                  </a>
                )}
              </div>

              {/* 项目紧凑卡 */}
              <CompactCard project={project} isDark={isDark} lang={lang} t={t} />
            </motion.div>
          )
        })}
      </div>
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
          <Timeline projects={timelineProjects} isDark={isDark} lang={lang} t={t} />
        </motion.div>
      </div>
    </section>
  )
}