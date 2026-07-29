import type { Metadata } from 'next'

interface RedirectPageProps {
  destination: string
  title: string
  message: React.ReactNode
  styles: {
    bg: string
    panelBg: string
    panelBorder: string
    text: string
    muted: string
    accent: string
    fontFamily: string
    panelRadius: number
  }
}

export function buildRedirectMetadata(title: string, description: string): Metadata {
  return { title, description }
}

export default function RedirectPage({ destination, title, message, styles }: RedirectPageProps) {
  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'grid',
        placeItems: 'center',
        margin: 0,
        padding: 24,
        color: styles.text,
        background: styles.bg,
        fontFamily: styles.fontFamily,
      }}
    >
      <main
        style={{
          width: 'min(560px, 100%)',
          padding: 32,
          border: `1px solid ${styles.panelBorder}`,
          borderRadius: styles.panelRadius,
          background: styles.panelBg,
          textAlign: 'center',
        }}
      >
        <h1 style={{ margin: '0 0 12px', color: styles.accent, fontSize: 'clamp(1.6rem, 5vw, 2.4rem)' }}>
          {title}
        </h1>
        <p style={{ margin: 0, color: styles.muted, lineHeight: 1.7 }}>
          {message}
        </p>
      </main>
      <script dangerouslySetInnerHTML={{ __html: `window.location.replace('${destination}');` }} />
      <meta httpEquiv="refresh" content={`0; url=${destination}`} />
    </div>
  )
}