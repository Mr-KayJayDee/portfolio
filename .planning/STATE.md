---
gsd_state_version: 1.0
milestone: v1.0
milestone_name: milestone
status: Context gathered — ready for /gsd-plan-phase 6
last_updated: "2026-04-21T23:11:57.514Z"
last_activity: 2026-04-21
progress:
  total_phases: 8
  completed_phases: 3
  total_plans: 11
  completed_plans: 9
  percent: 82
---

# Project State

## Project Reference

- PROJECT.md: .planning/PROJECT.md
- REQUIREMENTS.md: .planning/REQUIREMENTS.md
- ROADMAP.md: .planning/ROADMAP.md

## Current Focus

Phase: Phase 6 — Blog Pages
Plan: —
Status: Context gathered — ready for /gsd-plan-phase 6
Last activity: 2026-04-21
Resume file: .planning/phases/06-blog-pages/06-UI-SPEC.md

## Accumulated Context

- M1 complet — déployé en production sur killiandalcin.fr (phases 1–4)
- Stack : Nuxt 4 SSR + Nuxt UI v3 + Tailwind v4 + pnpm + @nuxt/content v3
- Phase 5 shipped: @nuxt/content installé, collections bilingues `blog_fr`/`blog_en`, composants MDC (ProseImg, Alert, ProsePre, Columns, Details, Badge, Video, Clear), Shiki single github-dark, `app/pages/blog/[slug].vue` rend les articles FR/EN
- **Gotchas Phase 5 (à retenir)** :
  - Catch-all `[...slug].vue` + `@nuxtjs/i18n` strategy `prefix` → page component résout à `{}` (Vue warn: missing template). Fix : single-segment `[slug].vue`.
  - `queryCollection(variable)` pas analysable par le Vite extractor de @nuxt/content → utiliser toujours des littéraux `queryCollection('blog_fr')` / `queryCollection('blog_en')`.
  - `i18n.baseUrl` requis pour `useLocaleHead` (SEO tags). Ne pas retirer.
  - Redirection langue-détectée sans langue dans l'URL : `detectBrowserLanguage.redirectOn: 'no prefix'` + `fallbackLocale`. Éviter les `routeRules` `/blog/**` hardcodés (cassent le slug + bloquent la détection navigateur).
- Objectif double : ranker sur "Hytale plugin developer" ET capter trafic longue traîne via contenu communauté
- Articles bilingues : structure FR/EN dans content/ (ex: content/fr/blog/, content/en/blog/)
- og:image par article : image frontmatter ou fallback branded — jamais l'og-image.png générique M1
