import { getServerSideSitemap } from 'next-sitemap'
import { getPayload } from 'payload'
import config from '@payload-config'
import { unstable_cache } from 'next/cache'
import { routing } from '@/i18n/routing'

const getPagesSitemap = unstable_cache(
  async () => {
    const payload = await getPayload({ config })
    const SITE_URL =
      process.env.NEXT_PUBLIC_SERVER_URL ||
      process.env.VERCEL_PROJECT_PRODUCTION_URL ||
      'https://example.com'

    // 1. 获取所有语种
    const locales = routing.locales

    const results = await payload.find({
      collection: 'pages',
      overrideAccess: false,
      draft: false,
      depth: 0,
      limit: 1000,
      pagination: false,
      where: {
        _status: {
          equals: 'published',
        },
      },
      select: {
        slug: true,
        updatedAt: true,
      },
    })

    const dateFallback = new Date().toISOString()

    // 2. 为默认页面（search, posts）生成多语言链接
    const defaultSitemap = locales.flatMap((locale) => [
      {
        loc: `${SITE_URL}/${locale}/search`,
        lastmod: dateFallback,
      },
      {
        loc: `${SITE_URL}/${locale}/posts`,
        lastmod: dateFallback,
      },
    ])

    // 3. 为 Collection 中的页面生成多语言链接
    const sitemap = results.docs
      ? results.docs
          .filter((page) => Boolean(page?.slug))
          .flatMap((page) => {
            // 对每个页面，循环所有语种
            return locales.map((locale) => {
              const isHome = page?.slug === 'home'
              return {
                // 如果是 home，链接为 /zh 或 /en；否则为 /zh/slug
                loc: isHome ? `${SITE_URL}/${locale}` : `${SITE_URL}/${locale}/${page?.slug}`,
                lastmod: page.updatedAt || dateFallback,
              }
            })
          })
      : []

    return [...defaultSitemap, ...sitemap]
  },
  ['pages-sitemap'],
  {
    tags: ['pages-sitemap'],
  },
)

export async function GET() {
  const sitemap = await getPagesSitemap()
  return getServerSideSitemap(sitemap)
}
