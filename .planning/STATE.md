---
gsd_state_version: 1.0
milestone: v1.0
milestone_name: milestone
status: Phase 6 — Plan 06-01 shipped (1/4), ready for Plan 06-02
last_updated: "2026-04-22T09:10:00.000Z"
last_activity: 2026-04-22
progress:
  total_phases: 8
  completed_phases: 3
  total_plans: 15
  completed_plans: 10
  percent: 66
---

# Project State

## Project Reference

- PROJECT.md: .planning/PROJECT.md
- REQUIREMENTS.md: .planning/REQUIREMENTS.md
- ROADMAP.md: .planning/ROADMAP.md

## Current Focus

Phase: Phase 6 — Blog Pages
Plan: 06-02 (next — Wave 1 also, components UI + i18n locales)
Status: Plan 06-01 shipped — schema + reading-time hook + drafts en place, typecheck vert, cache @nuxt/content vidé
Last activity: 2026-04-22
Resume file: .planning/phases/06-blog-pages/06-02-PLAN.md

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
- **Plan 06-01 shipped (2026-04-22)** : blogSchema étendu (draft.default(false) + wordCount.optional + minutes.optional), Nitro hook `content:file:afterParse` injecte wordCount+minutes (200 wpm, floor 1 min) sur chaque `.md` via `countWordsInMinimalBody`, composable fallback `useReadingTime(number|string)` auto-importé, articles `test-kotlin-syntax.md` (FR+EN) marqués `draft: true` — exclus des listings `where('draft', '=', false)` mais accessibles par URL directe. Cache `node_modules/.cache/content` + `.nuxt` vidés.
- **Gotcha 06-01** : Le hook `content:file:afterParse` exige que `wordCount`/`minutes` soient déclarés dans le schema Zod (`.optional()` sans default) sinon ils sont strippés avant persistance DB — les propriétés injectées par hook ne sont queryables que si le schema les expose.
- **Gotcha 06-01 (convention)** : Dans un plugin Nitro, importer depuis `app/utils/` se fait via `~/utils/...` (et non `~~/app/utils/...`). Nuxt 4 mappe `~/` → `app/` par défaut. Vérifié par typecheck vert sur server/plugins/reading-time.ts.
