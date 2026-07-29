'use client'

import { motion } from 'framer-motion'
import { useTheme } from './ThemeProvider'
import { useLang } from './LangProvider'

const ORANGE = '#FF6400'

export default function Vision() {
  const { theme } = useTheme()
  const { t, lang } = useLang()
  const isDark = theme === 'dark'

  const bg = isDark ? 'bg-[#050505]' : 'bg-[#f8f8f8]'
  const textPrimary = isDark ? 'text-white' : 'text-gray-900'
  const textMuted = isDark ? 'text-white/50' : 'text-gray-500'
  const borderColor = isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.07)'

  const lines = lang === 'zh'
    ? [
        '游戏是创造力的终极载体，',
        'AI 是这个时代最强大的创造引擎。',
        '我们相信，二者的交汇将重新定义',
        '游戏的生产方式、交互方式与体验边界。',
      ]
    : [
        'Games are the ultimate medium for creativity,',
        'and AI is the most powerful creative engine of our time.',
        'We believe their convergence will redefine how games are built,',
        'how they are experienced, and the boundaries they can reach.',
      ]

  return (
    <section id="vision" className={`py-32 px-6 ${bg} relative overflow-hidden`}>
      {/* Ambient glow top-right */}
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: `radial-gradient(ellipse 50% 60% at 100% 0%, rgba(255,100,0,0.08) 0%, transparent 65%)`,
      }} />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-16 items-start">
          {/* Left label column */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="text-[11px] font-semibold tracking-[0.35em] uppercase mb-4" style={{ color: ORANGE }}>
              Our Vision
            </p>
            <div
              className="w-px mt-2"
              style={{ height: 80, background: `linear-gradient(to bottom, ${ORANGE}, transparent)` }}
            />
          </motion.div>

          {/* Right: big quote text */}
          <div>
            <div className="mb-12">
              {lines.map((line, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.7, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                  className={`leading-[1.2] font-black ${textPrimary} ${i === 2 ? 'mt-6' : ''}`}
                  style={{
                    fontSize: i >= 2 ? 'clamp(1.3rem, 3.2vw, 2.6rem)' : 'clamp(1.6rem, 4vw, 3.2rem)',
                    fontFamily: 'Inter, sans-serif',
                    letterSpacing: '-0.03em',
                    color: i >= 2
                      ? (isDark ? 'rgba(255,255,255,0.35)' : 'rgba(0,0,0,0.35)')
                      : (isDark ? '#fff' : '#0a0a0a'),
                  }}
                >
                  {line}
                </motion.p>
              ))}
            </div>

            {/* Three mission statements */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7, delay: 0.5 }}
              className="grid grid-cols-1 sm:grid-cols-3 gap-0"
              style={{
                borderTop: `1px solid ${borderColor}`,
                borderLeft: `1px solid ${borderColor}`,
              }}
            >
              {[
                {
                  labelZh: '构建游戏智能内核',
                  labelEn: 'Build the Intelligence Core for Games',
                },
                {
                  labelZh: '连接前沿技术与游戏制作',
                  labelEn: 'Bridge Frontier Tech and Game Production',
                },
                {
                  labelZh: '定义下一代游戏基础设施',
                  labelEn: 'Define the Next Generation of Game Infrastructure',
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="px-7 py-8"
                  style={{
                    borderRight: `1px solid ${borderColor}`,
                    borderBottom: `1px solid ${borderColor}`,
                  }}
                >
                  <div
                    className="w-1.5 h-1.5 rounded-full mb-4"
                    style={{ background: ORANGE }}
                  />
                  <h4
                    className={`text-[15px] font-bold ${textPrimary}`}
                    style={{ fontFamily: 'Inter, sans-serif', letterSpacing: '-0.02em' }}
                  >
                    {lang === 'zh' ? item.labelZh : item.labelEn}
                  </h4>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
