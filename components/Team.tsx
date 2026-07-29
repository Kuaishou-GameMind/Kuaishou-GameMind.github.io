'use client'

import { useRef, useState, useCallback, useEffect } from 'react'
import { motion, useSpring, useMotionValue } from 'framer-motion'
import { useTheme } from './ThemeProvider'
import { useLang } from './LangProvider'
import { Brain, Gamepad2, Sparkles } from 'lucide-react'

const ORANGE = '#FF6400'

const pillars = [
  {
    icon: <Gamepad2 className="w-5 h-5" />,
    titleZh: 'AI 赋能游戏玩法',
    titleEn: 'AI-Empowered Gameplay',
    descZh: '探索 AI 在游戏交互与玩法中的原生融合，包括 AI 智能体、AI NPC、AI 驱动的动态世界与 AI Native Game 形态，推动 AI 从工具能力走向游戏核心机制。',
    descEn: 'Exploring the native integration of AI into game interaction and gameplay — AI agents, AI NPCs, AI-driven dynamic worlds, and AI Native Game forms — driving AI from tooling into the core mechanics of games.',
  },
  {
    icon: <Brain className="w-5 h-5" />,
    titleZh: 'AI 参与游戏制作',
    titleEn: 'AI-Assisted Game Production',
    descZh: '将生成式 AI 与多模态模型引入游戏研发流程，覆盖策划、资产生产、动画与剧情生成、测试验证等关键环节，构建 AI 驱动的游戏生产工具链，持续提升内容生产效率与创作空间。',
    descEn: 'Bringing generative AI and multimodal models into game development workflows — spanning planning, asset production, animation and narrative generation, and testing — to build an AI-driven game production toolchain and expand creative capacity.',
  },
  {
    icon: <Sparkles className="w-5 h-5" />,
    titleZh: '游戏垂类 AI 模型',
    titleEn: 'Game-Specific Vertical AI Models',
    descZh: '面向游戏场景构建垂直领域 AI 能力，包括游戏多模态理解与生成、行为模拟与评测、游戏数据与知识体系建模等，为 AI 在游戏行业的规模化落地提供模型与基础设施支撑。',
    descEn: 'Building vertical AI capabilities for game scenarios — multimodal understanding and generation, behavior simulation and evaluation, game data and knowledge modeling — providing the model and infrastructure foundation for AI adoption at scale in the game industry.',
  },
]

// ── Marquee strip with mouse interaction ───────────────────────
function MarqueeStrip({ isDark }: { isDark: boolean }) {
  const [mouseX, setMouseX] = useState(0.5)
  const stripRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handle = (e: MouseEvent) => {
      const el = stripRef.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      setMouseX((e.clientX - rect.left) / rect.width)
    }
    window.addEventListener('mousemove', handle, { passive: true })
    return () => window.removeEventListener('mousemove', handle)
  }, [])

  return (
    <div
      ref={stripRef}
      className="relative w-full overflow-hidden"
      style={{
        height: '72px',
        background: 'linear-gradient(90deg, #b84a00 0%, #e8752a 40%, #f0a060 70%, #c85a18 100%)',
        filter: 'saturate(0.6) brightness(0.88)',
      }}
    >
      {/* Static diagonal highlight */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'linear-gradient(105deg, rgba(255,255,255,0.10) 0%, transparent 50%, rgba(0,0,0,0.08) 100%)',
      }} />

      {/* Mouse-following shine */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-300"
        style={{
          background: `radial-gradient(ellipse 30% 120% at ${mouseX * 100}% 50%, rgba(255,255,255,0.22) 0%, transparent 70%)`,
        }}
      />

      {/* Scrolling text */}
      <div className="absolute inset-0 flex items-center overflow-hidden">
        <motion.div
          className="flex items-center gap-16 whitespace-nowrap"
          animate={{ x: ['0%', '-50%'] }}
          transition={{ duration: 28, repeat: Infinity, ease: 'linear' }}
        >
          {Array.from({ length: 8 }).map((_, i) => (
            <span
              key={i}
              className="text-[13px] font-bold tracking-[0.32em] uppercase select-none"
              style={{ color: 'rgba(255,255,255,0.22)', fontFamily: 'Inter, sans-serif', letterSpacing: '0.32em' }}
            >
              Kuaishou GameMind Lab
              <span className="mx-8 opacity-40">✦</span>
            </span>
          ))}
        </motion.div>
      </div>

      {/* Vignette */}
      <div className="absolute inset-y-0 left-0 w-20 pointer-events-none" style={{ background: 'linear-gradient(to right, #b84a00, transparent)' }} />
      <div className="absolute inset-y-0 right-0 w-20 pointer-events-none" style={{ background: 'linear-gradient(to left, #c85a18, transparent)' }} />
    </div>
  )
}

// ── Tilt card ──────────────────────────────────────────────────
function TiltCard({ children, className, style, borderColor, cardBg }: {
  children: React.ReactNode
  className?: string
  style?: React.CSSProperties
  borderColor: string
  cardBg: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const rotX = useMotionValue(0)
  const rotY = useMotionValue(0)

  const springRotX = useSpring(rotX, { stiffness: 200, damping: 28 })
  const springRotY = useSpring(rotY, { stiffness: 200, damping: 28 })

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    const dx = (e.clientX - cx) / (rect.width / 2)
    const dy = (e.clientY - cy) / (rect.height / 2)
    rotX.set(-dy * 6)
    rotY.set(dx * 6)
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
        perspective: 800,
        position: 'relative',
        overflow: 'hidden',
        cursor: 'default',
      }}
      whileHover={{ scale: 1.018 }}
      transition={{ scale: { duration: 0.25 } }}
    >
      {children}
    </motion.div>
  )
}

export default function Team() {
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

  const bg = isDark ? 'bg-[#070707]' : 'bg-white'
  const textPrimary = isDark ? 'text-white' : 'text-gray-900'
  const textMuted = isDark ? 'text-white/50' : 'text-gray-500'
  const borderColor = isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.07)'
  const cardBg = isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)'

  return (
    <section id="team" className={`${bg} relative overflow-hidden`}>

      {/* ── Marquee strip ─────────────────────────────── */}
      <MarqueeStrip isDark={isDark} />

      {/* ── Main section content ─────────────────────────────── */}
      <div className="py-32 px-6 relative overflow-hidden">
        {/* Mouse-following ambient glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(ellipse 55% 45% at ${mousePos.x * 100}% ${mousePos.y * 100}%, rgba(255,100,0,${isDark ? '0.10' : '0.06'}) 0%, transparent 65%)`,
            transition: 'background 0.4s ease',
          }}
        />
        {/* Static corner glow */}
        <div className="absolute inset-0 pointer-events-none" style={{
          backgroundImage: `radial-gradient(ellipse 55% 45% at 0% 100%, rgba(255,100,0,0.05) 0%, transparent 70%)`,
        }} />

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="mb-20"
          >
            <p className="text-[11px] font-semibold tracking-[0.35em] uppercase mb-5" style={{ color: ORANGE }}>
              About Us
            </p>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-end">
              <h2
                className={`font-black leading-[1.0] tracking-tight ${textPrimary}`}
                style={{ fontSize: 'clamp(2.8rem, 7vw, 5.5rem)', fontFamily: 'Inter, sans-serif', letterSpacing: '-0.04em' }}
              >
                {t('我们是谁', 'Who We Are')}
              </h2>
              <div>
                <p className={`text-base sm:text-lg ${textMuted} leading-relaxed mb-4`}>
                  {t(
                    'Kuaishou GameMind Lab 是快手游戏旗下专注于 AI 与游戏深度融合的技术研究与工程创新团队，致力于探索 AI 如何从底层技术到产品形态，全面重塑游戏的玩法创新与生产方式。',
                    'Kuaishou GameMind Lab is a technology research and engineering innovation team under Kuaishou Games, dedicated to the deep integration of AI and games — exploring how AI can reshape gameplay innovation and game production from foundational technology to product form.'
                  )}
                </p>
                <p className={`text-base sm:text-lg ${textMuted} leading-relaxed mb-4`}>
                  {t(
                    '团队围绕 AI 赋能游戏玩法、AI 参与游戏制作以及构建游戏领域垂类 AI 模型三大核心方向持续建设能力。',
                    'The team continuously builds capabilities across three core directions: AI-empowered gameplay, AI-assisted game production, and game-specific vertical AI models.'
                  )}
                </p>
                <p className={`text-base sm:text-lg ${textMuted} leading-relaxed`}>
                  {t(
                    '深度参与游戏从玩法创新、内容生产、开发测试到运营支持的全生命周期，通过模型能力、工程平台与工具体系的持续建设，将前沿 AI 技术转化为可复用、可规模化的游戏生产力，并探索下一代 AI Native 游戏的全新范式。',
                    'Deeply involved across the full game lifecycle — from gameplay innovation and content production to development testing and operational support — we transform frontier AI into reusable, scalable game productivity through model capabilities, engineering platforms, and toolchains, while exploring the new paradigm of AI Native games.'
                  )}
                </p>
              </div>
            </div>
          </motion.div>

          {/* Pillars grid — 3 cards */}
          <div
            className="grid grid-cols-1 sm:grid-cols-3"
            style={{
              borderTop: `1px solid ${borderColor}`,
              borderLeft: `1px solid ${borderColor}`,
            }}
          >
            {pillars.map((p, i) => (
              <TiltCard
                key={i}
                borderColor={borderColor}
                cardBg={cardBg}
                className="px-8 py-10"
                style={{
                  borderRight: `1px solid ${borderColor}`,
                  borderBottom: `1px solid ${borderColor}`,
                }}
              >
                <motion.div
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.6, delay: i * 0.08 }}
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center mb-6 transition-colors duration-300 group-hover:scale-110"
                    style={{ background: `${ORANGE}18`, color: ORANGE }}
                  >
                    {p.icon}
                  </div>
                  <h3
                    className={`text-base font-bold mb-3 ${textPrimary}`}
                    style={{ fontFamily: 'Inter, sans-serif', letterSpacing: '-0.02em' }}
                  >
                    {lang === 'zh' ? p.titleZh : p.titleEn}
                  </h3>
                  <p className={`text-sm leading-relaxed ${textMuted}`}>
                    {lang === 'zh' ? p.descZh : p.descEn}
                  </p>
                </motion.div>
              </TiltCard>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
