/**
 * Dynamic sitemap URL feed for @nuxtjs/sitemap.
 * Referenced via nuxt.config.ts > sitemap.sources: ['/api/__sitemap__/urls'].
 * Emits /fr/blog/{slug} + /en/blog/{slug} with hreflang alternates for bilingual pairs.
 * Excludes drafts (D-10). lastmod = updated ?? date (D-09). See Pitfalls 1, 2, 5, 6 in RESEARCH.
 */
import { queryCollection } from '@nuxt/content/server'
import type { SitemapUrl } from '#sitemap/types'

const SITE_URL = 'https://killiandalcin.fr'

type BlogRow = {
  path: string
  date: string
  updated?: string
}

export default defineSitemapEventHandler(async (event) => {
  // Literal collection strings (Pitfall 2). Pass event first (Pitfall 1).
  const [frArticles, enArticles] = await Promise.all([
    queryCollection(event, 'blog_fr')
      .where('draft', '=', false)
      .order('date', 'DESC')
      .select('path', 'date', 'updated')
      .all() as unknown as Promise<BlogRow[]>,
    queryCollection(event, 'blog_en')
      .where('draft', '=', false)
      .order('date', 'DESC')
      .select('path', 'date', 'updated')
      .all() as unknown as Promise<BlogRow[]>,
  ])

  // Build slug → { fr?, en? } index for pair detection (D-11)
  const extractSlug = (p: string) => p.split('/').filter(Boolean).pop()!
  const index = new Map<string, { fr?: BlogRow; en?: BlogRow }>()
  for (const a of frArticles) {
    const s = extractSlug(a.path)
    const e = index.get(s) ?? {}
    e.fr = a
    index.set(s, e)
  }
  for (const a of enArticles) {
    const s = extractSlug(a.path)
    const e = index.get(s) ?? {}
    e.en = a
    index.set(s, e)
  }

  const urls: SitemapUrl[] = []
  for (const [slug, pair] of index) {
    const bilingual = !!(pair.fr && pair.en)
    const alternatives = bilingual
      ? [
          { hreflang: 'fr', href: `${SITE_URL}/fr/blog/${slug}` },
          { hreflang: 'en', href: `${SITE_URL}/en/blog/${slug}` },
          { hreflang: 'x-default', href: `${SITE_URL}/fr/blog/${slug}` },
        ]
      : []

    if (pair.fr) {
      urls.push({
        loc: `/fr/blog/${slug}`,
        lastmod: pair.fr.updated ?? pair.fr.date,
        alternatives,
      })
    }
    if (pair.en) {
      urls.push({
        loc: `/en/blog/${slug}`,
        lastmod: pair.en.updated ?? pair.en.date,
        alternatives,
      })
    }
  }
  return urls
})
