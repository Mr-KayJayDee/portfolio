# Phase 7: SEO Blog - Research

**Researched:** 2026-04-22
**Domain:** JSON-LD Article/Breadcrumb/Blog, i18n sitemap, SSR SEO meta
**Confidence:** HIGH

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions

- **D-01** — Install `nuxt-schema-org` (Nuxt SEO family). Typed `defineArticle()` / `defineBreadcrumb()` API, auto-merge with `site.url`, locale-aware FR/EN. No hand-rolled `useHead({ script })`.
- **D-02** — On `/blog/[slug]`: `useSchemaOrg([defineArticle(...), defineBreadcrumb(...)])`. Article fields: `headline`, `description`, `image`, `datePublished`, `dateModified`, `author` (Person Killian), `publisher` (Person Killian), `inLanguage` (fr-FR / en-US), `mainEntityOfPage`.
- **D-03** — On `/blog`: `useSchemaOrg([defineCollectionPage(...)])` or minimal `Blog` equivalent. Breadcrumb Home → Blog.
- **D-04** — Do NOT install `@nuxtjs/seo` umbrella bundle. Cherry-pick `nuxt-schema-org` only (nuxt-og-image deferred).
- **D-05** — og:image hybrid: frontmatter `image:` if present, else static fallback `/og-blog-default.jpg` (1200×630, to create under `public/`).
- **D-06** — Helper `resolveOgImage(article)` returning absolute URL (prefixed with `site.url`), used by both `useSeoMeta({ ogImage })` AND `defineArticle({ image })` for consistency.
- **D-07** — Dynamic og:image via nuxt-og-image (Satori) explicitly deferred.
- **D-08** — Nitro endpoint `server/api/__sitemap__/urls.ts` queries `blog_fr` + `blog_en` (draft=false), returns `{ loc, lastmod, alternatives: [{ hreflang, href }] }`. Referenced via `sitemap.sources` in `nuxt.config.ts`.
- **D-09** — `lastmod` = `dateModified` (= `updated` frontmatter if present, else `date`).
- **D-10** — Drafts (`draft: true`) EXCLUDED from sitemap. Remain accessible via direct URL.
- **D-11** — hreflang alternates per slug pair: if slug exists in FR AND EN → cross-declared `hreflang="fr"` + `hreflang="en"` + `x-default` → FR. If article exists in only one language → no alternate.
- **D-12** — `author` and `publisher` = single Person Killian constant, defined in shared helper (`app/utils/seo-person.ts`) or global schema-org config (`useSchemaOrg` in app.vue with `defineWebSite` + `definePerson`, inherited by child Article).
- **D-13** — `dateModified` source: optional `updated` frontmatter field (add `updated.optional()` to `blog_fr`/`blog_en` Zod schema). If absent → `dateModified = date`. No git mtime (Docker build has no .git).
- **D-14** — Extend `blog_fr`/`blog_en` collections with `updated: z.string().optional()` and `image: z.string().optional()`.
- **D-15** — `[slug].vue` `useSeoMeta` enriched with: `ogImage`, `ogUrl` (localized canonical), `ogLocale` (fr_FR/en_US), `ogLocaleAlternate` (other locale if bilingual article), `twitterCard: 'summary_large_image'`, `twitterImage`, `articlePublishedTime`, `articleModifiedTime`, `articleAuthor`.
- **D-16** — `/blog` index `useSeoMeta` enriched with `ogImage` (= `/og-blog-default.jpg` absolute), `ogType: 'website'`, `ogLocale`, `ogLocaleAlternate`.

### Claude's Discretion

- Exact naming of og:image resolution helper (D-06)
- Exact `description` format of `Blog`/`CollectionPage` JSON-LD listing (D-03)
- Global `definePerson` in `app.vue` vs inline `author` in each `defineArticle` (→ recommendation below: global)
- Exact design of `/og-blog-default.jpg` (branded fallback)

### Deferred Ideas (OUT OF SCOPE)

- Dynamic og:image via nuxt-og-image (Satori)
- Global JSON-LD WebSite + Person on home (separate SEO phase)
- Structured internal links `/hytale` ↔ articles (= SEO-14, Phase 8)
- git mtime for dateModified
- Exhaustive `BlogPosting[]` JSON-LD on `/blog` (noise for Google)

</user_constraints>

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| SEO-10 | `useSeoMeta()` par article — title, description, og:title, og:description, og:image uniques | §useSeoMeta Enrichment (article page) |
| SEO-11 | JSON-LD `Article` per post — author, datePublished, dateModified, headline | §nuxt-schema-org defineArticle pattern |
| SEO-12 | Sitemap étendu — URLs `/blog/[slug]` + `/en/blog/[slug]` | §Nitro sitemap endpoint + sources config |
| SEO-13 | Open Graph image per article — frontmatter or branded fallback | §og:image Resolution (resolveOgImage helper) |
| SEO-15 | `BreadcrumbList` JSON-LD on blog pages (Home → Blog → Article) | §defineBreadcrumb pattern |

</phase_requirements>

## Summary

Phase 7 extends the already-shipped blog (Phase 5/6) with three orthogonal SEO layers: (1) JSON-LD structured data via `nuxt-schema-org` (Nuxt SEO family, package `nuxt-schema-org` v6.x, native Nuxt 4 compat), (2) enriched Open Graph meta via the existing `useSeoMeta` composable (adding `ogImage`, `ogUrl`, `ogLocaleAlternate`, `articlePublishedTime`, `articleModifiedTime`), and (3) a dynamic Nitro sitemap source endpoint that feeds `@nuxtjs/sitemap` with `/blog/[slug]` URLs + hreflang alternates.

The existing stack already has three assets that make this cheap: `site.url` is set in `nuxt.config.ts > site`, `@nuxtjs/sitemap` v8 is installed and wired, and `useLocaleHead({ seo: true })` in `app/app.vue` already emits global hreflang `<link>` tags. Phase 7 never replaces any of this — it augments.

**Primary recommendation:** Install `nuxt-schema-org` via `npx nuxt module add schema-org`. Declare a **global** `useSchemaOrg([definePerson(killian), defineWebSite(...)])` in `app/app.vue`. Use page-level `useSchemaOrg([defineArticle({...}), defineBreadcrumb({...})])` in `[slug].vue` — it auto-links author/publisher by graph @id to the global Person. For the sitemap, create `server/api/__sitemap__/urls.ts` using `defineSitemapEventHandler` + server-side `queryCollection(event, 'blog_fr')` (pass `event` as first arg — critical).

## Architectural Responsibility Map

| Capability | Primary Tier | Secondary Tier | Rationale |
|------------|-------------|----------------|-----------|
| JSON-LD Article/Breadcrumb | Frontend Server (SSR) | — | Must be in initial HTML for crawlers; page-level `useSchemaOrg` emits `<script type="application/ld+json">` server-rendered |
| JSON-LD Person/WebSite global | Frontend Server (SSR) | — | Declared once in `app.vue`, inherited by all pages via `nuxt-schema-org` graph |
| useSeoMeta enrichment | Frontend Server (SSR) | — | Tags must exist in initial HTML (curl validation) — no client hydration |
| Sitemap URL generation | Nitro server route | — | `/api/__sitemap__/urls` runs at request time (or build for SSG) and feeds `@nuxtjs/sitemap` |
| og:image URL building | Frontend Server (SSR) | Shared util | Same helper used by `useSeoMeta` AND `defineArticle` — `app/utils/` location for both page + schema use |
| hreflang alternates (per-URL) | Nitro server route | — | Listing-level alternates already emitted by `useLocaleHead` at page level; per-article alternates must live in the sitemap feed |
| Content schema extension | Build time | — | `content.config.ts` Zod schema change → re-ingest on next `nuxt dev`/`build` |

## Standard Stack

### Core

| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| nuxt-schema-org | ^6.0.4 | JSON-LD via `defineArticle`, `defineBreadcrumb`, `definePerson`, `defineWebSite`, `useSchemaOrg` | Official Nuxt SEO family, SSR-safe, auto-merges `site.url`, graph @id inheritance, used by Nuxt team [VERIFIED: nuxtseo.com/docs/schema-org/getting-started/installation] |
| @nuxtjs/sitemap | ^8.0.12 (installed) | Sitemap generation + `sources` config for dynamic URLs | Already installed and functional for existing routes [VERIFIED: package.json] |
| @nuxt/content | ^3.13.0 (installed) | `queryCollection` in Nitro routes (must pass `event` as first arg in server ctx) | Already installed [VERIFIED: package.json + content.nuxt.com/docs/utils/query-collection] |
| @nuxtjs/i18n | ^10.2.4 (installed) | `useLocaleHead({ seo: true })` for global hreflang, `localePath()` for canonical URLs | Already installed [VERIFIED: package.json + app/app.vue] |

### Supporting

| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| @unhead/vue (transitive via Nuxt) | (bundled) | `useSeoMeta` typed 100+ meta keys incl. `articlePublishedTime`, `articleModifiedTime`, `ogLocaleAlternate` | Already in use — just add fields [VERIFIED: unhead.unjs.io + nuxt.com/docs/4.x/api/composables/use-seo-meta] |

### Alternatives Considered

| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| nuxt-schema-org | Hand-rolled `useHead({ script: [{ type:'application/ld+json', innerHTML: ... }] })` | Schema.org drift, no typing, repetition across pages — rejected by D-01 |
| nuxt-schema-org | `@nuxtjs/seo` umbrella | Pulls redundant modules (link-checker, robots-already-handled) — rejected by D-04 |
| Nitro sitemap endpoint | Static XML file | Drafts filter can't be dynamic, hreflang alternates require code — rejected by D-08 |
| Global `definePerson` in app.vue | Inline `author:` in each `defineArticle` | Inline is repetitive and creates duplicate Person nodes in graph; global + @id ref is canonical [VERIFIED: nuxtseo.com/docs/schema-org/guides/setup-identity] |

**Installation:**
```bash
npx nuxt module add schema-org
# (equivalent to: pnpm add -D nuxt-schema-org && add 'nuxt-schema-org' to modules[])
```

**Version verification:** `nuxt-schema-org` current version is 6.0.4 per nuxtseo.com installation page [CITED: nuxtseo.com/docs/schema-org/getting-started/installation, fetched 2026-04-22]. Verify with `pnpm view nuxt-schema-org version` before install.

## Architecture Patterns

### System Architecture Diagram

```
[ Browser / Crawler ]
        │
        ▼ GET /fr/blog/my-slug
[ Nuxt SSR Renderer ]
        │
        ├── app.vue
        │     ├── useLocaleHead({ seo: true }) ──► <link rel="alternate" hreflang="fr|en|x-default">
        │     └── useSchemaOrg([definePerson(killian), defineWebSite]) ──► Global JSON-LD graph
        │
        └── pages/blog/[slug].vue
              ├── queryCollection('blog_fr').path(...).first() ──► page data
              ├── useSeoMeta({ title, ogImage, ogUrl, articlePublishedTime, ... }) ──► <meta> tags
              └── useSchemaOrg([defineArticle(...), defineBreadcrumb(...)]) ──► <script type="application/ld+json">
                        │
                        └── author: { '@id': '#killian' } ──► resolves to global Person node

[ Browser / Crawler ]
        │
        ▼ GET /sitemap.xml
[ @nuxtjs/sitemap ]
        │
        ├── source: /api/__sitemap__/urls   (Nitro route)
        │     ├── queryCollection(event, 'blog_fr').where('draft','=',false).all()
        │     ├── queryCollection(event, 'blog_en').where('draft','=',false).all()
        │     └── Map to SitemapUrl[] with { loc, lastmod, alternatives: [{hreflang, href}] }
        │
        └── Merges with auto-discovered pages + i18n routes ──► <urlset> XML
```

### Recommended File Structure (additions only)

```
app/
  utils/
    seo-person.ts          # Killian Person constant (id, name, url, sameAs, image)
    resolve-og-image.ts    # resolveOgImage(article) → absolute URL
  app.vue                  # ADD: useSchemaOrg([definePerson, defineWebSite])
  pages/blog/
    [slug].vue             # ADD: useSchemaOrg([defineArticle, defineBreadcrumb]); EXTEND useSeoMeta
    index.vue              # ADD: useSchemaOrg([defineCollectionPage, defineBreadcrumb]); EXTEND useSeoMeta
server/
  api/
    __sitemap__/
      urls.ts              # NEW: defineSitemapEventHandler
content.config.ts          # EXTEND: blogSchema + updated.optional(), image already present
public/
  og-blog-default.jpg      # NEW: 1200×630 branded fallback
nuxt.config.ts             # ADD: 'nuxt-schema-org' to modules; sitemap.sources
```

### Pattern 1: Global Schema Identity (app.vue)

**What:** Declare Person + WebSite once so every page's `defineArticle` inherits author/publisher by graph @id.
**When to use:** Always for a single-author portfolio blog (D-12).
**Example:**
```ts
// app/utils/seo-person.ts
export const KILLIAN_PERSON_ID = '#killian'
export const killianPerson = {
  '@id': KILLIAN_PERSON_ID,
  name: "Killian' Dal-Cin",
  url: 'https://killiandalcin.fr',
  jobTitle: 'Hytale Plugin Developer',
  sameAs: [
    'https://linkedin.com/in/killian-dal-cin',
    'https://gitea.kamisama.ovh/kayjaydee',
  ],
} as const
```

```vue
<!-- app/app.vue -->
<script setup lang="ts">
import { killianPerson } from '~/utils/seo-person'
const { locale } = useI18n()
const head = useLocaleHead({ seo: true })

useHead({
  htmlAttrs: { lang: locale },
  link: computed(() => head.value.link || []),
  meta: computed(() => head.value.meta || []),
})

// Global graph: Person + WebSite (inherited by child defineArticle via @id)
useSchemaOrg([
  definePerson(killianPerson),
  defineWebSite({
    name: "Killian' Dal-Cin — Hytale Plugin Developer",
    inLanguage: ['fr-FR', 'en-US'],
  }),
])
</script>
```
Source: [CITED: nuxtseo.com/docs/schema-org/guides/setup-identity, nuxtseo.com/docs/schema-org/guides/default-schema-org]

### Pattern 2: Article Page JSON-LD + Meta

**Example:**
```vue
<!-- app/pages/blog/[slug].vue (additions) -->
<script setup lang="ts">
import { KILLIAN_PERSON_ID } from '~/utils/seo-person'
import { resolveOgImage } from '~/utils/resolve-og-image'

// ... existing page query from current [slug].vue ...

const siteUrl = 'https://killiandalcin.fr'
const ogImage = computed(() => resolveOgImage(page.value))                  // absolute URL
const canonicalUrl = computed(() => `${siteUrl}${localePath('/blog/' + slug)}`)
const publishedIso = computed(() => page.value?.date)
const modifiedIso = computed(() => page.value?.updated ?? page.value?.date)  // D-13

// Detect bilingual pair (checked at build via paired slug) to emit ogLocaleAlternate
const { data: altExists } = await useAsyncData(
  `blog-alt-${locale.value}-${slug}`,
  () => (isFr.value
    ? queryCollection('blog_en').path(`/en/blog/${slug}`).first()
    : queryCollection('blog_fr').path(`/fr/blog/${slug}`).first()),
  { watch: [locale] },
)

useSeoMeta({
  title: () => page.value?.title,
  description: () => page.value?.description,
  ogTitle: () => page.value?.title,
  ogDescription: () => page.value?.description,
  ogType: 'article',
  ogImage,
  ogUrl: canonicalUrl,
  ogLocale: () => (isFr.value ? 'fr_FR' : 'en_US'),
  ogLocaleAlternate: () => (altExists.value ? (isFr.value ? ['en_US'] : ['fr_FR']) : []),
  twitterCard: 'summary_large_image',
  twitterImage: ogImage,
  articlePublishedTime: publishedIso,
  articleModifiedTime: modifiedIso,
  articleAuthor: () => "Killian' Dal-Cin",
})

useSchemaOrg([
  defineArticle({
    headline: () => page.value?.title,
    description: () => page.value?.description,
    image: ogImage,                                   // absolute URL (same helper)
    datePublished: publishedIso,
    dateModified: modifiedIso,
    inLanguage: () => (isFr.value ? 'fr-FR' : 'en-US'),
    author: { '@id': KILLIAN_PERSON_ID },             // refs global definePerson
    publisher: { '@id': KILLIAN_PERSON_ID },
    mainEntityOfPage: canonicalUrl,
  }),
  defineBreadcrumb({
    itemListElement: [
      { name: t('blog.breadcrumb.home'), item: localePath('/') },
      { name: t('blog.breadcrumb.blog'), item: localePath('/blog') },
      { name: () => page.value?.title ?? '' },
    ],
  }),
])
</script>
```
Source: [CITED: nuxtseo.com/docs/schema-org/api/define-article, unhead.unjs.io/docs/schema-org/api/composables/use-schema-org]

### Pattern 3: Nitro Sitemap Source Endpoint

**What:** Dynamic URL feed consumed by `@nuxtjs/sitemap` via `sources` config.
**Critical:** In Nitro routes, `queryCollection` requires `event` as first argument (verified). Always use literal collection strings.
**Example:**
```ts
// server/api/__sitemap__/urls.ts
import { defineSitemapEventHandler } from '#imports'
import type { SitemapUrl } from '#sitemap/types'

const SITE_URL = 'https://killiandalcin.fr'

export default defineSitemapEventHandler(async (event) => {
  const [frArticles, enArticles] = await Promise.all([
    queryCollection(event, 'blog_fr')
      .where('draft', '=', false)
      .order('date', 'DESC')
      .select('path', 'date', 'updated')
      .all(),
    queryCollection(event, 'blog_en')
      .where('draft', '=', false)
      .order('date', 'DESC')
      .select('path', 'date', 'updated')
      .all(),
  ])

  // Build slug → { fr?, en? } index for alternate pairing (D-11)
  type Row = { path: string; date: string; updated?: string }
  const extractSlug = (p: string) => p.split('/').filter(Boolean).pop()!
  const index = new Map<string, { fr?: Row; en?: Row }>()
  for (const a of frArticles) {
    const s = extractSlug(a.path); const e = index.get(s) ?? {}; e.fr = a; index.set(s, e)
  }
  for (const a of enArticles) {
    const s = extractSlug(a.path); const e = index.get(s) ?? {}; e.en = a; index.set(s, e)
  }

  const urls: SitemapUrl[] = []
  for (const [slug, pair] of index) {
    const alternatives = []
    if (pair.fr) alternatives.push({ hreflang: 'fr', href: `${SITE_URL}/fr/blog/${slug}` })
    if (pair.en) alternatives.push({ hreflang: 'en', href: `${SITE_URL}/en/blog/${slug}` })
    if (pair.fr && pair.en) {
      alternatives.push({ hreflang: 'x-default', href: `${SITE_URL}/fr/blog/${slug}` })
    }
    // else: single-language article → no alternatives (D-11)
    const altsForEntry = (pair.fr && pair.en) ? alternatives : []

    if (pair.fr) {
      urls.push({
        loc: `/fr/blog/${slug}`,
        lastmod: pair.fr.updated ?? pair.fr.date,     // D-09
        alternatives: altsForEntry,
      })
    }
    if (pair.en) {
      urls.push({
        loc: `/en/blog/${slug}`,
        lastmod: pair.en.updated ?? pair.en.date,
        alternatives: altsForEntry,
      })
    }
  }
  return urls
})
```

```ts
// nuxt.config.ts addition
export default defineNuxtConfig({
  // ... existing ...
  modules: [/* ... */, 'nuxt-schema-org'],
  sitemap: {
    sources: ['/api/__sitemap__/urls'],
  },
})
```
Source: [CITED: nuxtseo.com/docs/sitemap (dynamic URLs guide), content.nuxt.com/docs/utils/query-collection (server usage)]

### Pattern 4: resolveOgImage helper (D-06)

```ts
// app/utils/resolve-og-image.ts
const SITE_URL = 'https://killiandalcin.fr'
const FALLBACK = '/og-blog-default.jpg'

export function resolveOgImage(article?: { image?: string } | null): string {
  const raw = article?.image?.trim() || FALLBACK
  if (raw.startsWith('http://') || raw.startsWith('https://')) return raw
  return `${SITE_URL}${raw.startsWith('/') ? raw : `/${raw}`}`
}
```

### Anti-Patterns to Avoid

- **Inline `author` in every defineArticle:** Creates duplicate Person nodes in the graph. Use global `definePerson` + `author: { '@id': KILLIAN_PERSON_ID }` ref instead.
- **Relative `ogImage`:** Breaks social share crawlers. `og:image` MUST be absolute (why `resolveOgImage` prefixes `site.url`).
- **`queryCollection('blog_' + locale.value)` in server route:** Vite extractor can't analyze the variable (Phase 5 gotcha) AND server routes need `event` as first arg. Always literal: `queryCollection(event, 'blog_fr')` + `queryCollection(event, 'blog_en')` branch.
- **Hand-rolled `useHead({ script: [{ innerHTML: JSON.stringify(...) }] })`:** D-01 explicitly rejects this.
- **Adding `/sitemap.xml` static file:** FIX-01 already removed it — do NOT re-add.

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| JSON-LD Article/Breadcrumb | Custom `useHead({ script })` with hand-written `@context`/`@type` | `nuxt-schema-org` `defineArticle` / `defineBreadcrumb` | Schema.org drift, no typing, no graph @id resolution, no locale merging |
| Person identity duplication | Inline author in each page | Global `definePerson` in app.vue + `@id` refs | Canonical graph, single source of truth |
| Sitemap XML serialization | Hand-crafted XML string | `defineSitemapEventHandler` returning `SitemapUrl[]` | Auto xhtml:link generation, URL encoding, merge with auto-discovered routes |
| hreflang `<link>` at page level | Custom `useHead({ link })` | Existing `useLocaleHead({ seo: true })` in app.vue (already in place) | Already ships correct tags; don't duplicate |
| og:image URL building | Copy-pasted string concat | Shared `resolveOgImage(article)` util | D-06 mandates one helper used by BOTH useSeoMeta AND defineArticle |

## Runtime State Inventory

**Phase type:** Additive (new schema fields, new files, new module install). No rename/migration.

| Category | Items Found | Action Required |
|----------|-------------|------------------|
| Stored data | @nuxt/content SQLite DB caches parsed markdown — new schema fields (`updated`) require cache invalidation on first run | Document: delete `node_modules/.cache/content` + `.nuxt` after schema change (Phase 6 precedent) |
| Live service config | None | None — verified by inspection |
| OS-registered state | None | None |
| Secrets/env vars | None new | None |
| Build artifacts | `.output/` (Docker build) — sitemap is regenerated each build; no stale artifact risk | None |

## useSeoMeta Enrichment — Exact Keys

Verified against Nuxt 4 docs and Unhead typings [CITED: nuxt.com/docs/4.x/api/composables/use-seo-meta, unhead.unjs.io/docs/head/api/composables/use-seo-meta]:

| Key | Type | Maps to meta tag | Notes |
|-----|------|------------------|-------|
| `ogImage` | string \| () => string | `<meta property="og:image">` | Must be absolute URL |
| `ogUrl` | string \| () => string | `<meta property="og:url">` | Canonical URL |
| `ogLocale` | string \| () => string | `<meta property="og:locale">` | `fr_FR` or `en_US` (underscore, not dash) |
| `ogLocaleAlternate` | string[] \| () => string[] | `<meta property="og:locale:alternate">` (one per entry) | Pass only the OTHER locale(s), not current |
| `twitterCard` | 'summary' \| 'summary_large_image' \| ... | `<meta name="twitter:card">` | `'summary_large_image'` per D-15 |
| `twitterImage` | string | `<meta name="twitter:image">` | Mirror of ogImage |
| `articlePublishedTime` | string (ISO 8601) | `<meta property="article:published_time">` | From frontmatter `date` |
| `articleModifiedTime` | string (ISO 8601) | `<meta property="article:modified_time">` | From `updated` ?? `date` |
| `articleAuthor` | string \| string[] | `<meta property="article:author">` | Killian's name or URL |

**Reactive pattern:** Wrap dynamic values in arrow functions (`() => page.value?.title`) — critical for `useAsyncData`-loaded content [VERIFIED: Nuxt 4 docs].

## Common Pitfalls

### Pitfall 1: `queryCollection` in Nitro route without `event`
**What goes wrong:** Returns empty or throws at runtime when `/sitemap.xml` is requested.
**Why it happens:** Nuxt Content v3 server-side `queryCollection` requires the `event` object to resolve SQL binding per request. Client/SSR page context wires this automatically; Nitro routes don't.
**How to avoid:** `queryCollection(event, 'blog_fr')` — always pass event first arg in server routes.
**Warning signs:** Empty sitemap, or TypeScript error "Expected 2 arguments". Source: [VERIFIED: content.nuxt.com/docs/utils/query-collection + GitHub issue nuxt/content#3037].

### Pitfall 2: Variable collection name in `queryCollection`
**What goes wrong:** Vite extractor can't statically analyze, query returns empty.
**Why it happens:** @nuxt/content v3 uses a build-time Vite plugin to extract collection references for SQL codegen. Only string literals work.
**How to avoid:** Use `if (isFr) queryCollection(event, 'blog_fr') else queryCollection(event, 'blog_en')` — both branches literal.
**Warning signs:** Works in dev, breaks in build. Documented as Phase 5 gotcha in `.planning/STATE.md`.

### Pitfall 3: Relative og:image URL
**What goes wrong:** Facebook/Twitter/LinkedIn crawlers fail to preview share cards.
**Why:** Open Graph spec requires absolute URLs; social crawlers don't resolve relative paths.
**How to avoid:** Use `resolveOgImage()` helper that always prefixes `site.url`. Test with `curl localhost:3000/fr/blog/foo | grep 'og:image'` — value must start with `https://`.

### Pitfall 4: Duplicate Person nodes in JSON-LD graph
**What goes wrong:** Google Rich Results test flags multiple competing Person identities.
**Why:** Inline `author: { name: 'Killian' }` in each `defineArticle` creates a fresh node. Global `definePerson` + `@id` ref resolves to one canonical node.
**How to avoid:** Declare `definePerson({ '@id': '#killian', ... })` in app.vue once. In articles: `author: { '@id': '#killian' }`. Verify via Rich Results test that graph contains exactly one Person.

### Pitfall 5: Drafts leaking into sitemap
**What goes wrong:** Unpublished content appears in Google index.
**Why:** Forgetting `.where('draft', '=', false)` in the sitemap endpoint.
**How to avoid:** Apply the filter in `server/api/__sitemap__/urls.ts` — mirrors listing page (Phase 6 D-14).

### Pitfall 6: Canonical URL drift with i18n `prefix` strategy
**What goes wrong:** `ogUrl` and `mainEntityOfPage` don't match the actual route.
**Why:** `@nuxtjs/i18n` strategy `prefix` means even default locale has `/fr/...` prefix (verified in nuxt.config.ts). `localePath('/blog/' + slug)` already includes the prefix.
**How to avoid:** Always build canonical as `${site.url}${localePath(...)}` — never concat slug directly.

### Pitfall 7: `ogLocaleAlternate` includes current locale
**What goes wrong:** Redundant/incorrect meta emission.
**Why:** The key is for the *other* locales, not the current one. Current locale goes in `ogLocale`.
**How to avoid:** Array contains only the counterpart when bilingual pair exists; empty array when single-language.

### Pitfall 8: Schema change not reflected after hot-reload
**What goes wrong:** New `updated` field not queryable even with frontmatter populated.
**Why:** @nuxt/content SQLite cache persists stale schema. Phase 6 Gotcha 06-01 precedent.
**How to avoid:** `rm -rf node_modules/.cache/content .nuxt` then restart dev server after schema edit in `content.config.ts`.

## Code Examples

All verified patterns embedded in §Architecture Patterns above (Patterns 1–4). Key quick reference:

### Sitemap entry shape (per URL)
```ts
{
  loc: '/fr/blog/my-slug',
  lastmod: '2026-04-22',              // ISO string from updated ?? date
  alternatives: [
    { hreflang: 'fr', href: 'https://killiandalcin.fr/fr/blog/my-slug' },
    { hreflang: 'en', href: 'https://killiandalcin.fr/en/blog/my-slug' },
    { hreflang: 'x-default', href: 'https://killiandalcin.fr/fr/blog/my-slug' },
  ],
}
```

### content.config.ts schema extension (D-14)
```ts
const blogSchema = z.object({
  title: z.string(),
  description: z.string(),
  date: z.string(),
  updated: z.string().optional(),            // NEW (D-13/D-14)
  tags: z.array(z.string()).optional(),
  image: z.string().optional(),              // already present — confirm
  draft: z.boolean().optional().default(false),
  wordCount: z.number().optional(),
  minutes: z.number().optional(),
})
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| Hand-rolled `<script type="application/ld+json">` via `useHead` | `nuxt-schema-org` `defineArticle`/`defineBreadcrumb` with graph @id inheritance | Nuxt SEO family v5→v6 (2024–2025) | Less code, auto site.url merge, locale-aware |
| Static `sitemap.xml` in public/ | `@nuxtjs/sitemap` v8 with `sources: ['/api/...']` | @nuxtjs/sitemap v7+ | Dynamic URLs, hreflang alternates, drafts filter |
| `queryContent()` (v2) | `queryCollection(event, 'name')` in Nitro (v3) | @nuxt/content v3 (2024) | Typed collections via Zod, explicit event arg in server |

**Deprecated/outdated:**
- Nuxt Content v2 `queryContent` — replaced by v3 `queryCollection`
- `@nuxtjs/seo` umbrella install — rejected by D-04 (bloats with link-checker, redundant robots)

## Assumptions Log

| # | Claim | Section | Risk if Wrong |
|---|-------|---------|---------------|
| A1 | `defineSitemapEventHandler` is the current canonical export name in `@nuxtjs/sitemap` v8 | Pattern 3 | Low — fallback to `eventHandler` + manual return. Verify on first commit. |
| A2 | `defineCollectionPage` is the best fit JSON-LD type for `/blog` listing (vs `defineBlog`) | D-03 sketch | Low — both are valid; planner will finalize based on module export signatures. |
| A3 | `select()` accepts field names as rest args in @nuxt/content v3 server context | Pattern 3 | Low — if not, use `.all()` and map at JS level; no functional impact, just slightly more payload. |
| A4 | `content.config.ts` `image` field is already declared (shown in current file read) | D-14 | None — verified by reading `content.config.ts`. |

**All other claims are VERIFIED via code inspection, Nuxt SEO docs, or Nuxt Content docs (see Sources).**

## Open Questions

1. **Exact listing JSON-LD type — `CollectionPage` vs `Blog` vs `ItemList`?**
   - What we know: D-03 leaves this to Claude's discretion; spec prefers minimal over exhaustive `BlogPosting[]`.
   - What's unclear: `nuxt-schema-org` v6 exports — `defineCollectionPage` is standard; `defineWebPage` with `@type: 'CollectionPage'` also works.
   - Recommendation: Use `defineWebPage({ '@type': 'CollectionPage' })` + `defineBreadcrumb`. Avoid emitting individual `BlogPosting` nodes (noise). Planner confirms via `pnpm view nuxt-schema-org` exports.

2. **`/og-blog-default.jpg` asset creation — who, when, what tool?**
   - What we know: 1200×630 branded fallback (D-05).
   - What's unclear: Design ownership.
   - Recommendation: Planner creates a task "design + drop `/public/og-blog-default.jpg`" — use Figma template or simple gradient + logo. Non-blocking: can ship with a placeholder JPG and swap later.

3. **Should `useLocaleHead({ seo: true })` in app.vue be reviewed for completeness?**
   - What we know: It already emits hreflang `<link>` tags at page level (not in sitemap).
   - What's unclear: Whether it also emits `og:locale:alternate` (redundant with our new `useSeoMeta` usage).
   - Recommendation: Planner inspects generated HTML in dev — if `useLocaleHead` already emits og:locale:alternate, do NOT duplicate in `useSeoMeta`; only set `ogLocale` per page.

## Environment Availability

| Dependency | Required By | Available | Version | Fallback |
|------------|------------|-----------|---------|----------|
| Node.js | Build + Nitro | ✓ | 22 (Dockerfile) | — |
| pnpm | Install | ✓ | lockfile-tracked | — |
| nuxt-schema-org | New install | ✗ | — | `pnpm add -D nuxt-schema-org` (zero cost) |
| @nuxtjs/sitemap | Already installed | ✓ | ^8.0.12 | — |
| @nuxt/content | Already installed | ✓ | ^3.13.0 | — |
| Existing site.url config | Referenced | ✓ | `https://killiandalcin.fr` (nuxt.config.ts) | — |
| `/og-blog-default.jpg` asset | og:image fallback | ✗ | — | Ship with placeholder JPG; swap design later |

**Missing dependencies with no fallback:** None.
**Missing dependencies with fallback:** og-blog-default.jpg image asset (design task, non-blocking).

## Project Constraints (from CLAUDE.md)

- **SSR mandatory:** Every SEO tag MUST be present in initial HTML (curl validation). No client-only JSON-LD injection. `nuxt-schema-org` is SSR-safe by design.
- **Zero cost deps:** `nuxt-schema-org` is MIT open-source. No paid service.
- **Nuxt UI v3 priority over custom:** No UI work in this phase — pure SEO metadata. N/A.
- **TypeScript strict:** All new files (`seo-person.ts`, `resolve-og-image.ts`, `urls.ts`) must type-check with `pnpm typecheck` (same bar as Phase 6).
- **Cookie-only persistence (no localStorage):** No new persistence surface in this phase. N/A.
- **pnpm:** Install via `pnpm add -D nuxt-schema-org` (or `npx nuxt module add schema-org` which detects pnpm).
- **GSD workflow enforcement:** Phase 7 must be planned via `/gsd-plan-phase` and executed via `/gsd-execute-phase`. This research feeds the planner.

## Sources

### Primary (HIGH confidence)
- Nuxt SEO — Schema.org installation: https://nuxtseo.com/docs/schema-org/getting-started/installation (fetched 2026-04-22)
- Nuxt SEO — Schema.org setup identity & default schema guide (setup-identity, default-schema-org)
- Nuxt SEO — Sitemap dynamic URLs: https://nuxtseo.com/docs/sitemap/guides/dynamic-urls (fetched 2026-04-22)
- Nuxt 4 useSeoMeta composable: https://nuxt.com/docs/4.x/api/composables/use-seo-meta
- Unhead useSeoMeta: https://unhead.unjs.io/docs/head/api/composables/use-seo-meta
- Unhead Schema.org useSchemaOrg: https://unhead.unjs.io/docs/schema-org/api/composables/use-schema-org
- @nuxt/content v3 queryCollection docs: https://content.nuxt.com/docs/utils/query-collection
- Codebase inspection: `nuxt.config.ts`, `app/app.vue`, `app/pages/blog/[slug].vue`, `app/pages/blog/index.vue`, `content.config.ts`, `server/plugins/reading-time.ts`, `app/data/site.ts`, `package.json`

### Secondary (MEDIUM confidence)
- Nuxt SEO — Learn mastering-meta / schema-org (concept + identity patterns)
- GitHub issues confirming `queryCollection` server-side `event` arg requirement (nuxt/content #3037)

### Tertiary (LOW confidence)
- None — all critical claims cross-verified.

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH — package versions verified via `package.json`, `nuxt-schema-org` current version from official docs.
- Architecture: HIGH — patterns directly from official Nuxt SEO + Nuxt Content docs; app.vue + existing pages read first-hand.
- Pitfalls: HIGH — pitfalls 1, 2, 8 are repeated from Phase 5/6 gotchas (known ground truth); 3–7 from Open Graph spec + schema.org semantics.

**Research date:** 2026-04-22
**Valid until:** 2026-05-22 (30 days — stable SEO ecosystem; re-verify if Nuxt 5 or @nuxtjs/sitemap v9 ships)
