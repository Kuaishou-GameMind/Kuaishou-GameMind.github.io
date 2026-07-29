import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '快手游戏 TeamLab | AI × 游戏技术团队',
  description: '快手游戏 AI 技术研究团队，专注于 AI 在游戏领域的增效实践，持续开源前沿工具与研究成果。',
  icons: {
    icon: '/logo.svg',
    apple: '/logo.svg',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  )
}