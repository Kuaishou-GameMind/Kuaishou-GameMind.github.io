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
      <script
        dangerouslySetInnerHTML={{
          __html:
            'document.documentElement.lang=(localStorage.getItem("gamemind-lang")==="zh")?"zh-CN":"en";',
        }}
      />
      {scripts.map(({ src }) => (
        <script key={src} src={src} defer />
      ))}
    </>
  )
}