import { getServerSideSitemap } from 'next-sitemap'
import { getPayload } from 'payload'
import config from '@payload-config'
import { unstable_cache } from 'next/cache'
import { routing } from '@/i18n/routing'

const getPostsSitemap = unstable_cache(
  async () => {
    const payload = await getPayload({ config })
    const SITE_URL =
      process.env.NEXT_PUBLIC_SERVER_URL ||
      process.env.VERCEL_PROJECT_PRODUCTION_URL ||
      'https://example.com'

    const locales = routing.locales

    const results = await payload.find({
      collection: 'posts',
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

    // 使用 flatMap 为每篇文章生成所有语言版本的链接
    const sitemap = results.docs
      ? results.docs
          .filter((post) => Boolean(post?.slug))
          .flatMap((post) => {
            return locales.map((locale) => ({
              // 链接格式：域名/语言/posts/路径
              loc: `${SITE_URL}/${locale}/posts/${post.slug}`,
              lastmod: post.updatedAt || dateFallback,
              // 可选：添加 alternateRefs 让搜索引擎识别多语言关联
              alternateRefs: locales.map((l) => ({
                href: `${SITE_URL}/${l}/posts/${post.slug}`,
                hreflang: l,
              })),
            }))
          })
      : []

    return sitemap
  },
  ['posts-sitemap'],
  {
    tags: ['posts-sitemap'],
  },
)

export async function GET() {
  const sitemap = await getPostsSitemap()
  return getServerSideSitemap(sitemap)
}
