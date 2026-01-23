'use client'

import Script from 'next/script'
import { useEffect, useState } from 'react'
import { getTrackingSettings } from '@/lib/settings'

export function GoogleTagManager() {
  const [gtmId, setGtmId] = useState<string | null>(null)

  useEffect(() => {
    getTrackingSettings().then(settings => {
      if (settings?.gtm?.enabled && settings?.gtm?.containerId) {
        setGtmId(settings.gtm.containerId)
      }
    })
  }, [])

  if (!gtmId || gtmId === 'GTM-XXXXXXX') return null

  return (
    <>
      <Script
        id="gtm-script"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${gtmId}');
          `,
        }}
      />
      <noscript>
        <iframe
          src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`}
          height="0"
          width="0"
          style={{ display: 'none', visibility: 'hidden' }}
        />
      </noscript>
    </>
  )
}
