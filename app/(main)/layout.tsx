import './globals.css'
import { ThemeProvider } from '@/components/ThemeProvider'
import { LangProvider } from '@/components/LangProvider'

export default function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ThemeProvider>
      <LangProvider>
        <div className="grain-overlay" />
        {children}
      </LangProvider>
    </ThemeProvider>
  )
}