import Script from 'next/script'

interface SiteScript {
  src: string
  strategy?: 'beforeInteractive' | 'afterInteractive' | 'lazyOnload'
}

interface SiteStylesheet {
  href: string
}

interface SitePageProps {
  bodyHtml: string
  stylesheets: SiteStylesheet[]
  scripts: SiteScript[]
}

export default function SitePage({ bodyHtml, stylesheets, scripts }: SitePageProps) {
  return (
    <>
      {stylesheets.map(({ href }) => (
        <link key={href} rel="stylesheet" href={href} />
      ))}
      <div dangerouslySetInnerHTML={{ __html: bodyHtml }} />
      {scripts.map(({ src, strategy = 'afterInteractive' }) => (
        <Script key={src} src={src} strategy={strategy} />
      ))}
    </>
  )
}