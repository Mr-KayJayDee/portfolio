/**
 * Resolves an article's og:image to an absolute URL.
 * Strategy (D-05): frontmatter `image` if present, else branded fallback `/og-blog-default.jpg`.
 * Consumed by: app/pages/blog/[slug].vue (useSeoMeta.ogImage + defineArticle.image)
 *              app/pages/blog/index.vue (useSeoMeta.ogImage fallback only).
 */
const SITE_URL = 'https://killiandalcin.fr'
const FALLBACK = '/og-blog-default.jpg'

export function resolveOgImage(article?: { image?: string } | null): string {
  const raw = article?.image?.trim() || FALLBACK
  if (raw.startsWith('http://') || raw.startsWith('https://')) return raw
  return `${SITE_URL}${raw.startsWith('/') ? raw : `/${raw}`}`
}
