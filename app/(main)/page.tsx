'use client'

import { useRef, useState, useEffect } from 'react'
import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import Team from '@/components/Team'
import Capabilities from '@/components/Capabilities'
import Vision from '@/components/Vision'
import { useTheme } from '@/components/ThemeProvider'

export default function Home() {
  const capabilitiesRef = useRef<HTMLDivElement>(null)
  const [mounted, setMounted] = useState(false)
  const { theme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  const scrollToCapabilities = () => {
    capabilitiesRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  if (!mounted) return null

  const bgColor = theme === 'dark' ? '#080808' : '#fafafa'

  return (
    <main className="min-h-screen" style={{ backgroundColor: bgColor }}>
      <Navbar />
      <div id="home">
        <Hero onExplore={scrollToCapabilities} />
      </div>
      <div id="team">
        <Team />
      </div>
      <div ref={capabilitiesRef} id="projects">
        <Capabilities />
      </div>
      <div id="vision">
        <Vision />
      </div>
    </main>
  )
}
