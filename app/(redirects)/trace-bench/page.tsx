import RedirectPage, { buildRedirectMetadata } from '@/components/sites/RedirectPage'

export const metadata = buildRedirectMetadata(
  'TRACE BENCH: Kuaishou GameMind Lab',
  'TRACE BENCH has moved to /projects/trace_bench/. Redirecting.',
)

export default function TraceBenchRedirectPage() {
  return (
    <RedirectPage
      destination="/projects/trace_bench/"
      title="TRACE BENCH"
      message={
        <>
          Redirecting to the project page. If the redirect does not start,{' '}
          <a href="/projects/trace_bench/" style={{ color: '#a94d2f', fontWeight: 700 }}>
            open TRACE BENCH
          </a>.
        </>
      }
      styles={{
        bg: '#f4ede2',
        panelBg: '#fffaf1',
        panelBorder: 'rgba(72, 54, 38, 0.18)',
        text: '#2b2118',
        muted: '#746557',
        accent: '#a94d2f',
        fontFamily: "Georgia, 'Noto Serif SC', serif",
        panelRadius: 18,
      }}
    />
  )
}