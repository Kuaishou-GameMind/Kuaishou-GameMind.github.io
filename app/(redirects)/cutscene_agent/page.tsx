import RedirectPage, { buildRedirectMetadata } from '@/components/sites/RedirectPage'

export const metadata = buildRedirectMetadata(
  'Redirecting | Kuaishou GameMind Lab',
  'Cutscene Agent has moved to /projects/cutscene_agent/. Redirecting.',
)

export default function CutsceneAgentRedirectPage() {
  return (
    <RedirectPage
      destination="/projects/cutscene_agent/"
      title="Cutscene Agent"
      message={
        <>
          Redirecting to the project page. If the redirect does not start,{' '}
          <a href="/projects/cutscene_agent/" style={{ color: '#ff6400', fontWeight: 700 }}>
            open Cutscene Agent
          </a>.
        </>
      }
      styles={{
        bg: 'radial-gradient(circle at top, rgba(255, 100, 0, 0.14), transparent 32%), #080808',
        panelBg: 'rgba(255, 255, 255, 0.04)',
        panelBorder: 'rgba(255, 255, 255, 0.08)',
        text: '#f5f5f5',
        muted: 'rgba(245, 245, 245, 0.62)',
        accent: '#ff6400',
        fontFamily: '"Inter", "Segoe UI", sans-serif',
        panelRadius: 24,
      }}
    />
  )
}