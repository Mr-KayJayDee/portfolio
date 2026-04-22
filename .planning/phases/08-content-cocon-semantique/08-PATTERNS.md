# Phase 8: Content & Cocon Sémantique — Pattern Map

**Mapped:** 2026-04-22
**Files analyzed:** 7 (6 new + 1 modified) plus 2 locale files modified
**Analogs found:** 7 / 7

## File Classification

| New/Modified File | Role | Data Flow | Closest Analog | Match Quality |
|-------------------|------|-----------|----------------|---------------|
| `content/fr/blog/how-to-build-your-first-hytale-plugin.md` | content (markdown article) | file-I/O (static content) | `content/fr/blog/test-kotlin-syntax.md` | exact |
| `content/en/blog/how-to-build-your-first-hytale-plugin.md` | content (markdown article) | file-I/O (static content) | `content/en/blog/test-kotlin-syntax.md` | exact |
| `content/fr/blog/hytale-plugin-development-2026.md` | content (markdown article) | file-I/O (static content) | `content/fr/blog/test-kotlin-syntax.md` | exact |
| `content/en/blog/hytale-plugin-development-2026.md` | content (markdown article) | file-I/O (static content) | `content/en/blog/test-kotlin-syntax.md` | exact |
| `app/components/HytaleRecentArticles.vue` | component (section) | request-response (queryCollection SSR) | `app/pages/blog/index.vue` | role-match (page→component) |
| `app/pages/hytale.vue` | page (composition) | request-response | current state (self) | exact |
| `i18n/locales/fr.json` + `en.json` | config (i18n) | static | existing `hytale.*` + `blog.*` blocks | exact |

**Note path correction:** CONTEXT mentions `app/locales/` but actual path is `i18n/locales/` (confirmed via Glob). Planner should use `i18n/locales/fr.json` and `i18n/locales/en.json`.

**Note page path correction:** CONTEXT mentions `app/pages/hytale/index.vue`. Actual page is `app/pages/hytale.vue` (flat, 39 lines). No directory routing.

## Pattern Assignments

### `content/{fr,en}/blog/how-to-build-your-first-hytale-plugin.md` (content, file-I/O)

**Analog:** `content/fr/blog/test-kotlin-syntax.md` (FR) and `content/en/blog/test-kotlin-syntax.md` (EN)

**Frontmatter pattern** (lines 1-7 of analog) — adapt for Phase 8 (`draft: false`, tags include `hytale`):
```markdown
---
title: "Guide du format Markdown"
description: "Référence complète de tous les éléments et composants disponibles dans les articles"
date: "2026-04-21"
tags: ["guide", "markdown", "mdc"]
draft: true
---
```

**Required changes for Phase 8 articles (per CONTEXT D-06):**
- `draft: false` (CONTEXT D-04)
- `tags: ['hytale', 'tutorial', 'kotlin']` (article 1) or `['hytale', 'industry', 'analysis']` (article 2) — tag `hytale` MANDATORY (D-11, D-15)
- `date: "2026-04-22"` (ISO)
- Omit `updated` field at initial publish (D-06)
- `image:` optional — if present must point to existing asset in `public/` (D-05, Phase 7 D-14)

**Kotlin code block pattern** (lines 25-33 of analog):
```markdown
\`\`\`kotlin
fun createPlugin(name: String): HytalePlugin {
    return HytalePlugin.builder()
        .name(name)
        .version("1.0.0")
        .onLoad { println("Plugin $name loaded!") }
        .build()
}
\`\`\`
```

Every seed article MUST include ≥1 realistic Kotlin block (not pseudo-code) per D-05.

**Internal link pattern (D-08, D-09):** In FR article, inline markdown link uses `/hytale`. In EN article, uses `/en/hytale`:
```markdown
Pour un plugin sur-mesure, vous pouvez [commissionner un plugin Hytale](/hytale) directement.
```
```markdown
For a custom plugin, you can [commission a Hytale plugin](/en/hytale) directly.
```
Hard-code paths (D-09); do NOT use `localePath()` in markdown. Minimum 1–2 inline links per article.

**Callout pattern available (optional):**
```markdown
::alert{type="tip"}
**Astuce** — Utilisez `pnpm` plutôt que `npm` pour les projets Nuxt.
::
```

---

### `app/components/HytaleRecentArticles.vue` (component, request-response)

**Analog:** `app/pages/blog/index.vue` — same `queryCollection` bilingual branch pattern, slimmed to section-level component.

**queryCollection bilingual pattern** (lines 2-21 of analog) — the critical Phase 5 Pitfall-safe pattern:
```typescript
const { t, locale } = useI18n()
const localePath = useLocalePath()
const isFr = computed(() => locale.value === 'fr')

const { data: articles } = await useAsyncData(
  `blog-list-${locale.value}`,
  () =>
    isFr.value
      ? queryCollection('blog_fr')
          .where('draft', '=', false)
          .order('date', 'DESC')
          .all()
      : queryCollection('blog_en')
          .where('draft', '=', false)
          .order('date', 'DESC')
          .all(),
  { watch: [locale] },
)
```

**Adaptation for HytaleRecentArticles:**
- Key: `hytale-recent-${locale.value}` (per CONTEXT "Reusable Assets")
- Add tag filter: either `.where('tags', 'LIKE', '%hytale%')` SQL OR JS post-filter `article.tags?.includes('hytale')` (CONTEXT D-11 — planner decides).
- Add `.limit(2)` (D-11).
- Branches must be LITERAL strings `'blog_fr'` / `'blog_en'` — never `queryCollection(variableName)` (Phase 5 D-03 Pitfall).

**Conditional render + grid pattern** (lines 141-151 of analog) adapted for compact variant + 2-col grid:
```vue
<section v-if="articles && articles.length" class="...">
  <h2>{{ t('hytale.recentArticles.title') }}</h2>
  <div class="grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-6">
    <BlogCard
      v-for="article in articles"
      :key="article.path"
      :article="article"
      variant="compact"
    />
  </div>
  <NuxtLink :to="localePath('/blog')">{{ t('hytale.recentArticles.viewAll') }}</NuxtLink>
</section>
```

**BlogCard compact invocation** — confirmed in `app/components/BlogCard.vue` lines 18-21 + 152-191:
- Props: `article` (required), `variant="compact"`, `direction` (default `'next'`, can omit here since not prev/next semantics — acceptable since direction only affects icon alignment; choose one OR add neutral behavior).
- Auto-imported — no explicit import needed.

**Hide-if-empty rule (D-12):** `v-if="articles && articles.length"` — section entirely hidden when 0 or <2 hytale-tagged articles. No empty state UI.

---

### `app/pages/hytale.vue` (page, modification)

**Current state** (full 39 lines read):
```vue
<template>
  <div>
    <HytaleHeroSection />
    <HytaleServicesSection />
    <HytalePricingSection />
    <div class="relative bg-gray-50/50 dark:bg-gray-900/20">
      <TestimonialsSection />
    </div>
  </div>
</template>
```

**Insertion point (CONTEXT D-10):** Add `<HytaleRecentArticles />` before the last section. Current last section is `TestimonialsSection` wrapped in a bg div. Two viable positions:
1. Between `HytalePricingSection` and the Testimonials wrapper (before testimonials).
2. After Testimonials wrapper (just before closing `</div>`).

CONTEXT says "en bas de page, avant le footer-CTA existant". There is no explicit footer-CTA in this page — TestimonialsSection is the last thing. Planner should insert **after Testimonials, before closing `</div>`** — or reconcile with actual footer CTA location (may live in AppFooter layout, outside page scope).

Recommended diff:
```diff
     <div class="relative bg-gray-50/50 dark:bg-gray-900/20">
       <TestimonialsSection />
     </div>
+    <HytaleRecentArticles />
   </div>
 </template>
```

No script changes required — component is auto-imported.

---

### `i18n/locales/fr.json` + `i18n/locales/en.json` (config)

**Analog:** existing `hytale.*` block in fr.json lines 471-556; existing `blog.*` block lines 557-581 (structure for i18n interpolation / nesting).

**Insertion point:** Inside the existing `"hytale": { ... }` object (line 471). Add a new `recentArticles` sub-object as sibling to `hero`, `services`, `pricing`.

**Keys to add (CONTEXT D-14):**

FR (`i18n/locales/fr.json`):
```json
"recentArticles": {
  "title": "Articles récents",
  "subtitle": "Les dernières publications sur le développement Hytale",
  "viewAll": "Voir tous les articles"
}
```

EN (`i18n/locales/en.json`) — mirror structure:
```json
"recentArticles": {
  "title": "Recent articles",
  "subtitle": "Latest writing on Hytale plugin development",
  "viewAll": "View all articles"
}
```

**Style conventions observed:**
- FR `hytale.*` block currently uses **ASCII only** (no accents in lines 471-556 — e.g. "Developpement", "Tarifs", "A partir de"). Verify per PATTERNS.md §i18n convention: `hytale.*` appears to follow ASCII convention. But `blog.*` block (added Phase 6-02) is **accentué** ("précédent", "Sommaire", "Bientôt"). CONTEXT D-14 places new keys under `hytale.recentArticles.*` — planner should decide: either match sibling `hytale.*` ASCII style OR follow the more recent `blog.*` accentué style. Given 06-02 SUMMARY states "FR i18n accentué dans bloc blog.*", the `hytale.*` ASCII may be legacy. **Recommendation:** use accentué for new keys (consistent with 2026 content direction).
- JSON structure is flat-nested objects; no trailing commas; double quotes.

---

## Shared Patterns

### queryCollection Phase 5 Pitfall Guard
**Source:** `app/pages/blog/index.vue` lines 11-20
**Apply to:** `HytaleRecentArticles.vue`
**Rule:** ALWAYS branch on `isFr.value` with literal strings `'blog_fr'` / `'blog_en'` inside the ternary. Never call `queryCollection(someVariable)`. `useAsyncData` key must include `locale.value`; pass `{ watch: [locale] }` to invalidate on language switch.

### BlogCard auto-import
**Source:** `app/components/BlogCard.vue` (auto-importable via Nuxt components dir)
**Apply to:** `HytaleRecentArticles.vue`
**Rule:** No explicit import. Use `<BlogCard :article variant="compact" />`. Article object must include `path` (used for slug derivation), `title`, `date`; `description`, `tags`, `image`, `minutes` optional.

### Locale-aware routing in templates
**Source:** `app/pages/blog/index.vue` line 3, 41, 171
**Apply to:** `HytaleRecentArticles.vue` (for "view all articles" link)
**Rule:** Use `useLocalePath()` in script setup, then `:to="localePath('/blog')"` in template. Do NOT hardcode `/fr/blog` — let i18n prefix strategy resolve. (Exception: markdown files — hardcode per D-09 since `@nuxt/content` doesn't wrap Prose links in i18n router automatically unless ProseA is customized.)

### Markdown article frontmatter Zod contract
**Source:** `content.config.ts` schema `blog_fr` / `blog_en` (Phase 5, extended Phase 7 D-14 with optional `image`)
**Apply to:** All 4 new `.md` files
**Rule:** Required: `title`, `description`, `date`, `tags`, `draft`. Optional: `image`, `updated`. Unknown fields are stripped. A broken frontmatter breaks `pnpm typecheck` / SSR curl.

## No Analog Found

None — all 7 files have strong analogs in the current codebase.

## Metadata

**Analog search scope:**
- `app/pages/blog/` (index.vue, [slug].vue)
- `app/pages/hytale.vue`
- `app/components/BlogCard.vue`
- `content/fr/blog/`, `content/en/blog/`
- `i18n/locales/fr.json`, `i18n/locales/en.json`

**Files scanned:** 8
**Pattern extraction date:** 2026-04-22
