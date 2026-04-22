---
phase: 07-seo-blog
verified: 2026-04-22T00:00:00Z
status: human_needed
score: 8/8 must-haves verified (static)
overrides_applied: 0
human_verification:
  - test: "Boot dev server (pnpm dev) and curl http://localhost:3000/fr/blog/{slug}"
    expected: "HTML contains og:image absolute https://..., article:published_time, JSON-LD Article (author @id=#killian), JSON-LD BreadcrumbList"
    why_human: "Static grep confirms source emits correct calls; runtime SSR output requires a live server (not booted during verification per curl-optional instructions)"
  - test: "curl http://localhost:3000/sitemap.xml"
    expected: "Contains /fr/blog/ and /en/blog/ entries, xhtml:link hreflang fr/en/x-default for bilingual pairs, no draft slugs (e.g. test-kotlin-syntax absent)"
    why_human: "Sitemap XML generation combines @nuxtjs/sitemap merging + Nitro endpoint — only a running server can confirm the final merged XML"
  - test: "Visual/social validation of /og-blog-default.jpg"
    expected: "1200x630 branded fallback image renders correctly on Twitter/LinkedIn/Facebook sharing debuggers"
    why_human: "Placeholder accepted as deferred design; final branding is a UX judgment"
  - test: "pnpm typecheck"
    expected: "exit 0"
    why_human: "Quality signal declared as optional in verification context; requires local run"
---

# Phase 07: SEO Blog — Verification Report

**Phase Goal:** Chaque page blog indexable avec meta tags complets, JSON-LD Article+BreadcrumbList+Blog/CollectionPage, sitemap avec alternates hreflang. Validation curl (SSR pur).

**Status:** human_needed (static verification complete; runtime curl + typecheck require live server)

## Goal Achievement — Observable Truths

| # | Truth | Status | Evidence |
|---|-------|--------|----------|
| 1 | [slug].vue emits useSchemaOrg([defineArticle, defineBreadcrumb]) + useSeoMeta D-15 | ✓ VERIFIED | `app/pages/blog/[slug].vue` lines 113-149 — defineArticle, defineBreadcrumb, articlePublishedTime, articleModifiedTime, ogLocaleAlternate, ogImage, canonicalUrl all present |
| 2 | blog/index.vue emits defineWebPage(CollectionPage) + defineBreadcrumb | ✓ VERIFIED | `app/pages/blog/index.vue` lines 57-71 — `'@type': 'CollectionPage'` and defineBreadcrumb present |
| 3 | Sitemap endpoint filters draft=false + emits hreflang fr/en/x-default | ✓ VERIFIED | `server/api/__sitemap__/urls.ts` lines 22,28 (`.where('draft', '=', false)`), lines 54-56 (fr/en/x-default alternates) |
| 4 | nuxt.config.ts has sitemap.sources + nuxt-schema-org module | ✓ VERIFIED | `nuxt.config.ts` line 12 (`'nuxt-schema-org'`), lines 35-37 (`sitemap.sources: ['/api/__sitemap__/urls']`) |
| 5 | app/app.vue uses useSchemaOrg(definePerson + defineWebSite) | ✓ VERIFIED | `app/app.vue` lines 13-19 |
| 6 | public/og-blog-default.jpg exists | ✓ VERIFIED | File present (placeholder accepted, deferred design noted in 07-02 SUMMARY) |
| 7 | content.config.ts schema blog_fr/blog_en contains `updated` optional | ✓ VERIFIED | `content.config.ts` line 7 — `updated: z.string().optional(),` applied to shared blogSchema used by both collections |
| 8 | package.json has nuxt-schema-org ^6.0.4 | ✓ VERIFIED | `package.json` line 32 |

**Static Score:** 8/8

## Required Artifacts

| Artifact | Status | Details |
|----------|--------|---------|
| `app/utils/seo-person.ts` | ✓ VERIFIED | exports KILLIAN_PERSON_ID + killianPerson; derived from siteConfig |
| `app/utils/resolve-og-image.ts` | ✓ VERIFIED | exports resolveOgImage returning absolute URL with /og-blog-default.jpg fallback |
| `public/og-blog-default.jpg` | ✓ VERIFIED | File exists (placeholder) |
| `server/api/__sitemap__/urls.ts` | ✓ VERIFIED | defineSitemapEventHandler with bilingual pair detection |
| `app/pages/blog/[slug].vue` | ✓ VERIFIED | Enriched with useSeoMeta D-15 + useSchemaOrg([defineArticle, defineBreadcrumb]) |
| `app/pages/blog/index.vue` | ✓ VERIFIED | Enriched with useSeoMeta D-16 + useSchemaOrg([defineWebPage, defineBreadcrumb]) |
| `app/app.vue` | ✓ VERIFIED | Global useSchemaOrg definePerson + defineWebSite |
| `nuxt.config.ts` | ✓ VERIFIED | nuxt-schema-org module + sitemap.sources wired |
| `content.config.ts` | ✓ VERIFIED | `updated` field added |

## Key Link Verification

| From | To | Via | Status |
|------|----|----|--------|
| app/app.vue | app/utils/seo-person.ts | `import { killianPerson }` | ✓ WIRED |
| nuxt.config.ts | /api/__sitemap__/urls | sitemap.sources | ✓ WIRED |
| app/pages/blog/[slug].vue | app/utils/resolve-og-image.ts | `import { resolveOgImage }` | ✓ WIRED |
| [slug].vue defineArticle.author | app.vue definePerson | `'@id': KILLIAN_PERSON_ID` | ✓ WIRED |
| blog/index.vue | OG fallback | hardcoded constant (07-03 independence note documented in plan) | ✓ WIRED (intentional deviation from resolveOgImage import — plan 07-03 explicitly permits this) |

## Requirements Coverage

| Requirement | Status | Evidence |
|-------------|--------|----------|
| SEO-10 (unique og meta per article) | ✓ SATISFIED | useSeoMeta D-15 in [slug].vue with arrow-fn reactive ogTitle/ogDescription/ogImage |
| SEO-11 (JSON-LD Article) | ✓ SATISFIED | defineArticle with headline, datePublished, dateModified, author/publisher @id |
| SEO-12 (sitemap with hreflang alternates) | ✓ SATISFIED | urls.ts emits fr/en/x-default for bilingual pairs; draft filter applied |
| SEO-13 (og:image fallback branded) | ✓ SATISFIED | resolveOgImage helper + /og-blog-default.jpg fallback + absolute URL always |
| SEO-15 (JSON-LD BreadcrumbList) | ✓ SATISFIED | defineBreadcrumb on both [slug].vue (3-level) and index.vue (2-level) |

## Anti-Patterns Scan

No blockers. Minor notes:
- `app/pages/blog/index.vue` uses hardcoded `OG_FALLBACK` constant instead of `resolveOgImage(null)` — explicitly documented in 07-03 PLAN as acceptable Wave-2 decoupling; not a stub.
- `inLanguageTag` in [slug].vue uses `as unknown as ComputedRef<'fr-FR'>` cast — documented type-narrowing for defineArticle; not a smell.

## Gaps Summary

No structural gaps. All 8 must-haves satisfied by static inspection of code + config + artifacts. Goal-backward chain is complete:

Goal (blog indexable with meta + JSON-LD + sitemap hreflang)
→ requires [slug].vue emits Article + Breadcrumb + D-15 meta ✓
→ requires blog/index.vue emits CollectionPage + Breadcrumb ✓
→ requires dynamic sitemap with bilingual alternates + draft exclusion ✓
→ requires global Person/@id identity ✓
→ requires module + schema extension + fallback asset ✓

All wiring verified (imports, @id references, sitemap.sources → endpoint).

**Outstanding:** Runtime validation (curl against live dev server) + `pnpm typecheck` are the last-mile confirmations. These were explicitly marked optional in the verification context ("preferably curl/grep, pas de dev server boot obligatoire si vérification statique suffit"). Static verification suffices for structural goal achievement; runtime validation is routed to human for final sign-off.

---

_Verified: 2026-04-22_
_Verifier: Claude (gsd-verifier)_
