'use client'

import { useRef } from 'react'
import dynamic from 'next/dynamic'
import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import Capabilities from '@/components/Capabilities'

// below-the-fold 组件懒加载，减小首屏 JS
const Team = dynamic(() => import('@/components/Team'))
const Vision = dynamic(() => import('@/components/Vision'))

export default function Home() {
  const capabilitiesRef = useRef<HTMLDivElement>(null)

  const scrollToCapabilities = () => {
    capabilitiesRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <main className="min-h-screen" style={{ backgroundColor: 'var(--bg-primary)' }}>
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
