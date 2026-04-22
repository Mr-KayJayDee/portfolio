# Phase 7: SEO Blog — Pattern Map

**Mapped:** 2026-04-22
**Files analyzed:** 8 (4 new, 4 modified)
**Analogs found:** 8 / 8

## File Classification

| New/Modified File | Role | Data Flow | Closest Analog | Match Quality |
|---|---|---|---|---|
| `app/utils/seo-person.ts` (new) | utility / const | static export | `app/data/site.ts` | role-match |
| `app/utils/resolve-og-image.ts` (new) | utility / pure fn | transform | `app/utils/countWords.ts` | exact |
| `server/api/__sitemap__/urls.ts` (new) | nitro route | request-response (dynamic feed) | `server/plugins/reading-time.ts` (nitro ctx) + `server/api/contact.post.ts` (route shape) | role-match |
| `public/og-blog-default.jpg` (new) | static asset | file-I/O | n/a (asset) | — |
| `content.config.ts` (modify) | config | schema extension | itself (existing `blogSchema`) | exact |
| `nuxt.config.ts` (modify) | config | module registration + sitemap sources | itself | exact |
| `app/app.vue` (modify) | root component | global schema-org identity | itself (existing `useHead` + `useLocaleHead`) | exact |
| `app/pages/blog/[slug].vue` (modify) | page | request-response (SSR SEO + JSON-LD) | itself (existing `useSeoMeta`) + `app/pages/blog/index.vue` | exact |
| `app/pages/blog/index.vue` (modify) | page | request-response (SSR SEO + JSON-LD listing) | itself | exact |

## Pattern Assignments

### `app/utils/seo-person.ts` (new, utility/const)

**Analog:** `app/data/site.ts` (lines 1-12) — pattern for exported typed constants sourced from shared types.

**Convention to copy:**
```ts
// Named export of a typed const object, imported via `~/` alias elsewhere.
export const siteConfig: SiteConfig = {
  name: 'Killian',
  url: 'https://killiandalcin.fr',
  ...
}
```

**Apply:** Export `KILLIAN_PERSON_ID = '#killian'` string const + `killianPerson` object. Reuse `siteConfig.url`, `siteConfig.social[]` (LinkedIn, Gitea URLs at lines 20-36) as source of truth for `sameAs[]`. No new identity drift.

---

### `app/utils/resolve-og-image.ts` (new, utility/pure fn)

**Analog:** `app/utils/countWords.ts` (lines 1-34)

**Imports / JSDoc / export pattern** (lines 1-10):
```ts
/**
 * <one-line purpose>
 * <detail lines>
 *
 * Used by <consumer files>.
 */
export function countWordsInMinimalBody(body: unknown): number {
```

**Apply:** Same shape — top-level JSDoc naming consumers (`useSeoMeta` on `[slug].vue` + `index.vue`, `defineArticle` on `[slug].vue`), single named export, explicit param/return types, no external imports. Hard-code `SITE_URL` + `FALLBACK` constants at module top (mirrors `countWords.ts` self-contained style).

---

### `server/api/__sitemap__/urls.ts` (new, nitro route)

**Analogs:**
- `server/plugins/reading-time.ts` (lines 12-23) — nitro plugin pattern with `defineNitroPlugin`, hook-based, shows how nitro files wire into the app.
- `server/api/contact.post.ts` (lines 22-28) — route handler pattern with `defineEventHandler(async (event) => {...})`, Zod validation, typed responses.

**Route handler shape to copy** (contact.post.ts lines 22-28):
```ts
export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const parsed = contactSchema.safeParse(body)
  if (!parsed.success) {
    throw createError({ statusCode: 400, message: 'Invalid payload' })
  }
  ...
})
```

**Apply:** Replace `defineEventHandler` with `defineSitemapEventHandler` (from `#imports`, per RESEARCH Pattern 3). Use `event` as first arg for `queryCollection(event, 'blog_fr')` / `queryCollection(event, 'blog_en')` (Pitfall 1+2 RESEARCH). Return typed `SitemapUrl[]` from `#sitemap/types`. No Zod validation needed (no input body). No try/catch — let Nitro bubble.

**Content query pattern to copy** from `app/pages/blog/index.vue` lines 10-20:
```ts
isFr.value
  ? queryCollection('blog_fr').where('draft', '=', false).order('date', 'DESC').all()
  : queryCollection('blog_en').where('draft', '=', false).order('date', 'DESC').all()
```

**Apply:** Run BOTH branches in `Promise.all` (server context aggregates both locales, no i18n conditional). Literal collection strings mandatory.

---

### `content.config.ts` (modify)

**Analog:** itself (lines 3-12, existing `blogSchema`)

**Extension pattern** (current file):
```ts
const blogSchema = z.object({
  title: z.string(),
  description: z.string(),
  date: z.string(),
  tags: z.array(z.string()).optional(),
  image: z.string().optional(),     // already present — D-14 #2 is a no-op
  draft: z.boolean().optional().default(false),
  wordCount: z.number().optional(),
  minutes: z.number().optional(),
})
```

**Apply:** Add ONE line: `updated: z.string().optional(),` (D-13/D-14). `image` already declared — verify only. Mirrors Phase 6 precedent (`wordCount` / `minutes` `.optional()`). Document cache invalidation: `rm -rf node_modules/.cache/content .nuxt` after schema edit (Pitfall 8 RESEARCH).

---

### `nuxt.config.ts` (modify)

**Analog:** itself

**Modules array pattern** (lines 5-13):
```ts
modules: [
  '@nuxt/ui',
  '@nuxt/image',
  '@nuxt/content',
  '@nuxt/eslint',
  '@nuxtjs/i18n',
  '@nuxtjs/sitemap',
  'nuxt-gtag',
],
```

**Apply:** Add `'nuxt-schema-org'` to the array (order indifferent per D-01; place next to `@nuxtjs/sitemap` for cohesion). Add top-level `sitemap: { sources: ['/api/__sitemap__/urls'] }` block (no existing `sitemap` block — new top-level key, same indent as `site`, `i18n`, `content`). Do NOT touch existing `site`, `i18n`, `content` blocks.

---

### `app/app.vue` (modify, global schema-org)

**Analog:** itself (entire file, 10 lines)

**Current script setup pattern** (lines 1-10):
```ts
const { locale } = useI18n()
const head = useLocaleHead({ seo: true })

useHead({
  htmlAttrs: { lang: locale },
  link: computed(() => head.value.link || []),
  meta: computed(() => head.value.meta || []),
})
```

**Apply:** APPEND (do not replace) after `useHead(...)`:
```ts
import { killianPerson } from '~/utils/seo-person'
useSchemaOrg([
  definePerson(killianPerson),
  defineWebSite({ name: '...', inLanguage: ['fr-FR', 'en-US'] }),
])
```
`definePerson` / `defineWebSite` / `useSchemaOrg` are auto-imports from `nuxt-schema-org`. Do NOT duplicate `useLocaleHead` hreflang logic (already shipped).

---

### `app/pages/blog/[slug].vue` (modify, article page)

**Analog:** itself (lines 93-99 — existing `useSeoMeta`)

**Current useSeoMeta pattern to EXTEND** (lines 93-99):
```ts
useSeoMeta({
  title: () => page.value?.title,
  description: () => page.value?.description,
  ogTitle: () => page.value?.title,
  ogDescription: () => page.value?.description,
  ogType: 'article',
})
```

**Locale/localePath pattern already in file** (lines 2-7):
```ts
const { t, locale } = useI18n()
const localePath = useLocalePath()
const route = useRoute()
const isFr = computed(() => locale.value === 'fr')
const slug = route.params.slug as string
```

**Breadcrumb items already in file** (lines 57-61) — **re-use labels (`t('blog.breadcrumb.home')`, `t('blog.breadcrumb.blog')`) for `defineBreadcrumb`:**
```ts
const breadcrumbItems = computed(() => [
  { label: t('blog.breadcrumb.home'), to: localePath('/'), icon: 'i-lucide-home' },
  { label: t('blog.breadcrumb.blog'), to: localePath('/blog') },
  { label: page.value?.title ?? '' },
])
```

**useAsyncData bilingual branch pattern already in file** (lines 10-17) — copy shape for the new "bilingual pair detector" async data (D-15 `ogLocaleAlternate`):
```ts
const { data: page } = await useAsyncData(
  `blog-${locale.value}-${slug}`,
  () => isFr.value
    ? queryCollection('blog_fr').path(path.value).first()
    : queryCollection('blog_en').path(path.value).first(),
  { watch: [locale] },
)
```

**Apply:**
1. Add helper imports: `import { KILLIAN_PERSON_ID } from '~/utils/seo-person'` and `import { resolveOgImage } from '~/utils/resolve-og-image'`.
2. Add `altExists` `useAsyncData` block (opposite locale, same slug) — mirror lines 10-17 exactly, swap collection.
3. EXTEND (not replace) the `useSeoMeta({...})` call with D-15 keys: `ogImage`, `ogUrl`, `ogLocale`, `ogLocaleAlternate`, `twitterCard: 'summary_large_image'`, `twitterImage`, `articlePublishedTime`, `articleModifiedTime`, `articleAuthor`. Wrap all dynamic values in `() => ...` arrow fns (reactive pattern, mirrors existing `title: () => page.value?.title`).
4. ADD `useSchemaOrg([defineArticle({...}), defineBreadcrumb({...})])` after `useSeoMeta` — use `{ '@id': KILLIAN_PERSON_ID }` for `author`/`publisher` (Pitfall 4).

---

### `app/pages/blog/index.vue` (modify, listing page)

**Analog:** itself (lines 37-43 — existing `useSeoMeta`)

**Apply:**
1. EXTEND the existing `useSeoMeta` (lines 37-43) with D-16 keys: `ogImage` (= absolute `/og-blog-default.jpg`), `ogLocale`, `ogLocaleAlternate`, `twitterCard`, `twitterImage`. Keep `ogType: 'website'`.
2. ADD `useSchemaOrg([defineWebPage({ '@type': 'CollectionPage', ... }), defineBreadcrumb({ itemListElement: [home, blog] })])` after `useSeoMeta`.
3. Re-use `resolveOgImage(null)` to emit the fallback consistently (D-06).

---

## Shared Patterns

### Bilingual `queryCollection` branching (literal strings mandatory)
**Source:** `app/pages/blog/index.vue` lines 10-20 and `[slug].vue` lines 10-17.
**Apply to:** `server/api/__sitemap__/urls.ts` (both branches via `Promise.all`), `[slug].vue` alt-exists detection.
```ts
isFr.value
  ? queryCollection('blog_fr').where('draft', '=', false).order('date', 'DESC').all()
  : queryCollection('blog_en').where('draft', '=', false).order('date', 'DESC').all()
```
**Rule:** Never `queryCollection('blog_' + locale)` — Vite extractor breaks in build (Phase 5 gotcha, Pitfall 2 RESEARCH).

### Reactive arrow-fn values in `useSeoMeta`
**Source:** `[slug].vue` lines 94-98 (`title: () => page.value?.title`).
**Apply to:** All new `useSeoMeta` keys in `[slug].vue` and `index.vue`. Static strings are fine; anything reading from `page.value` / `locale.value` / `altExists.value` MUST be wrapped `() => ...`.

### `localePath()` for canonical URLs (never concat slug)
**Source:** `[slug].vue` line 3 + breadcrumb lines 58-59.
**Apply to:** `ogUrl`, `mainEntityOfPage`, `defineBreadcrumb` items in both pages. Canonical form: `` `${siteConfig.url}${localePath('/blog/' + slug)}` `` (Pitfall 6).

### Single source of truth for identity (Killian)
**Source:** `app/data/site.ts` lines 5-43 (`siteConfig`).
**Apply to:** `app/utils/seo-person.ts` must re-import (or re-derive from) `siteConfig.url`, `siteConfig.social[]` URLs. No duplicated LinkedIn/Gitea strings.

### Content schema extension via `.optional()`
**Source:** `content.config.ts` lines 3-12 — precedent set by Phase 6 `wordCount`/`minutes`.
**Apply to:** new `updated: z.string().optional()` field.

### Nitro ctx + `queryCollection(event, ...)` first-arg rule
**Source:** `server/plugins/reading-time.ts` lines 12-23 (nitro ctx patterns in this repo).
**Apply to:** `server/api/__sitemap__/urls.ts` — pass `event` as first arg (Pitfall 1).

---

## No Analog Found

| File | Role | Reason |
|---|---|---|
| `public/og-blog-default.jpg` | static asset | Binary asset; no code analog. Planner task: ship 1200×630 branded JPG (placeholder acceptable per Open Question #2 RESEARCH). |
| `useSchemaOrg` / `defineArticle` / `defineBreadcrumb` / `definePerson` / `defineWebSite` / `defineSitemapEventHandler` calls | schema-org / sitemap APIs | No prior usage in the codebase; follow RESEARCH Patterns 1–3 verbatim. |

## Metadata

**Analog search scope:** `app/`, `server/`, `content.config.ts`, `nuxt.config.ts`
**Files scanned:** 9 read in full (all ≤ 160 lines; no large-file targeted reads needed)
**Pattern extraction date:** 2026-04-22
