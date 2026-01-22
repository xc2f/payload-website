import type { Metadata } from 'next'
import { getServerSideURL } from './getURL'

const SITE_NAME = process.env.NEXT_PUBLIC_SITE_NAME || 'XC2F'
const defaultOpenGraph: Metadata['openGraph'] = {
  type: 'website',
  description: 'xc2f.com',
  images: [
    {
      url: `${getServerSideURL()}/og.jpg`,
    },
  ],
  siteName: SITE_NAME,
  title: SITE_NAME,
}

export const mergeOpenGraph = (og?: Metadata['openGraph']): Metadata['openGraph'] => {
  return {
    ...defaultOpenGraph,
    ...og,
    images: og?.images ? og.images : defaultOpenGraph.images,
  }
}
