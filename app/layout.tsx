import type { Metadata } from 'next'

const FONT_CSS = 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap'

export const metadata: Metadata = {
  title: 'Kuaishou GameMind Lab',
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
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preload" as="style" href={FONT_CSS} fetchPriority="high" />
        <link rel="stylesheet" href={FONT_CSS} />
        {/* 在 React hydration 前根据 localStorage 设置 data-theme，避免主题闪烁 */}
        <script
          dangerouslySetInnerHTML={{
            __html: `try{var t=localStorage.getItem('theme');if(t!=='light'&&t!=='dark')t='light';document.documentElement.setAttribute('data-theme',t)}catch(e){document.documentElement.setAttribute('data-theme','light')}`,
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  )
}
