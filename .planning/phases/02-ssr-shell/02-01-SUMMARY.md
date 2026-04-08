---
phase: 02-ssr-shell
plan: 01
subsystem: design-system-i18n
tags: [color-mode, i18n, sitemap, css, config]
dependency_graph:
  requires: []
  provides: [brand-color-theme, color-mode-cookie, i18n-translations, sitemap-hreflang, og-image]
  affects: [nuxt.config.ts, app.config.ts]
tech_stack:
  added: []
  patterns: [tailwind-v4-theme, nuxt-ui-color-mapping, cookie-color-mode]
key_files:
  created:
    - app/assets/css/main.css
    - app.config.ts
    - public/og-image.png
  modified:
    - nuxt.config.ts
    - app/locales/fr.json
    - app/locales/en.json
decisions:
  - "Emojis stripped from migrated translations for clean SSR rendering"
  - "og-image.png is placeholder text file pending real 1200x630 image"
metrics:
  duration: 394s
  completed: 2026-04-08
---

# Phase 02 Plan 01: Design System + i18n Config Summary

Brand color #85cb85 palette in Tailwind v4 @theme, Nuxt UI primary mapped to brand, color-mode with cookie/dark default, i18n baseUrl for absolute SEO URLs, all translation keys migrated from src/locales/ plus Phase 2 nav/footer/a11y/seo keys.

## Tasks Completed

| Task | Name | Commit | Files |
|------|------|--------|-------|
| 1 | Design system + color-mode + sitemap config | d27b9a3 | app/assets/css/main.css, app.config.ts, nuxt.config.ts, public/og-image.png |
| 2 | Migrate i18n translations | 898ef5c | app/locales/fr.json, app/locales/en.json |

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 2 - Correctness] Stripped emojis from migrated translations**
- **Found during:** Task 2
- **Issue:** Source src/locales/*.ts files contained emoji characters in translation values which could cause inconsistent SSR/client rendering
- **Fix:** Removed all emoji prefixes from translation values during migration
- **Files modified:** app/locales/fr.json, app/locales/en.json

## Known Stubs

| Stub | File | Reason |
|------|------|--------|
| Placeholder og-image | public/og-image.png | Text placeholder, needs real 1200x630 PNG image |

## Verification Results

- fr.json and en.json valid JSON with all Phase 2 keys (nav, footer, a11y, seo): PASS
- app/assets/css/main.css contains --color-brand-500: PASS
- app.config.ts contains primary: 'brand': PASS
- nuxt.config.ts contains colorMode with cookie storage: PASS
- nuxt.config.ts contains baseUrl: PASS
- nuxt.config.ts does NOT contain @nuxtjs/color-mode in modules: PASS
