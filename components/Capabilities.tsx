'use client'

import { useRef, useState, useCallback, useEffect } from 'react'
import { motion, useSpring, useMotionValue } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { useTheme } from './ThemeProvider'
import { useLang } from './LangProvider'
import { getProject } from './projects'

const ORANGE = '#FF6400'

const liveProject = getProject('cutscene_agent')!

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

export default function Capabilities() {
  const { theme } = useTheme()
  const { t, lang } = useLang()
  const isDark = theme === 'dark'
  const ProjectIcon = liveProject.icon

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
  const cardBg = isDark ? 'bg-[#0d0d0d]' : 'bg-white'
  const textPrimary = isDark ? 'text-white' : 'text-gray-900'
  const textMuted = isDark ? 'text-white/45' : 'text-gray-500'
  const textSubtle = isDark ? 'text-white/25' : 'text-gray-400'
  const border = isDark ? 'border-white/[0.06]' : 'border-gray-200'
  const borderColor = isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.07)'

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

        {/* ── Live project: 3D Cutscene Engine ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <TiltCard
            className={`relative ${cardBg} border ${border} rounded-3xl`}
            style={{
              boxShadow: isDark
                ? '0 0 0 1px rgba(255,100,0,0.12), 0 0 60px rgba(255,100,0,0.06)'
                : '0 2px 24px rgba(0,0,0,0.07)',
            }}
          >
            {/* Live badge — top right */}
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
              <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-8 items-start">
                {/* Left content */}
                <div>
                  <div className="flex items-center gap-2 mb-5 flex-wrap">
                    <span
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold text-white"
                      style={{ background: ORANGE }}
                    >
                      <ProjectIcon className="w-5 h-5" />
                      {liveProject.subtitle}
                    </span>
                    {(lang === 'zh' ? liveProject.tagsZh : liveProject.tagsEn).map(tag => (
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
                    {lang === 'zh' ? liveProject.titleZh : liveProject.titleEn}
                  </h3>
                  <p className={`text-base sm:text-lg font-semibold mb-3 leading-snug max-w-2xl`} style={{ color: ORANGE, fontFamily: 'Inter, sans-serif' }}>
                    {lang === 'zh' ? liveProject.subtitleDescZh : liveProject.subtitleDescEn}
                  </p>
                  <p className={`text-sm sm:text-[15px] ${textMuted} leading-relaxed max-w-2xl mb-8`}>
                    {lang === 'zh' ? liveProject.descZh : liveProject.descEn}
                  </p>
                  <a
                    href={liveProject.link}
                    className="group inline-flex items-center gap-2 text-sm font-semibold transition-all duration-200 hover:opacity-80"
                    style={{ color: ORANGE, fontFamily: 'Inter, sans-serif' }}
                  >
                    {t('查看项目', 'View Project')}
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </a>
                </div>

                {/* Right stat */}
                <div className="hidden lg:flex flex-col justify-end text-right pt-6 max-w-[180px]">
                  <p
                    className={`text-[13px] font-medium leading-relaxed ${textMuted}`}
                    style={{ fontFamily: 'Inter, sans-serif' }}
                  >
                    {lang === 'zh' ? (
                      <>一句话生成<br />3D 游戏的可消费剧情</>
                    ) : (
                      <>Generate consumable<br />3D game cinematics<br />from a single prompt</>
                    )}
                  </p>
                </div>
              </div>
            </div>

            {/* Visual preview area */}
            <div
              className={`mx-6 sm:mx-10 mb-6 rounded-2xl overflow-hidden border ${border}`}
              style={{ position: 'relative' }}
            >
              <img
                src="/project-preview.png"
                alt="Cutscene Agent for Unreal – project preview"
                style={{
                  width: '100%',
                  height: 'auto',
                  display: 'block',
                  filter: 'brightness(0.72)',
                  transition: 'filter 0.4s ease',
                }}
                onMouseEnter={e => (e.currentTarget.style.filter = 'brightness(1)')}
                onMouseLeave={e => (e.currentTarget.style.filter = 'brightness(0.72)')}
              />
            </div>
          </TiltCard>
        </motion.div>

      </div>
    </section>
  )
}
