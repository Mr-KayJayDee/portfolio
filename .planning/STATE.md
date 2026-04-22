---
gsd_state_version: 1.0
milestone: v1.2
milestone_name: Ship to Prod + Credibility Gap
status: Phase 9 shipped — M1.1 live en prod (blog/SEO/sitemap sur killiandalcin.fr). Nuxt build hang fixé via hook close (nuxt/nuxt#33987)
last_updated: "2026-04-22T22:45:00.000Z"
last_activity: 2026-04-22
progress:
  total_phases: 3
  completed_phases: 1
  total_plans: 6
  completed_plans: 1
  percent: 17
---

# Project State

## Project Reference

- PROJECT.md: .planning/PROJECT.md
- REQUIREMENTS.md: .planning/REQUIREMENTS.md
- ROADMAP.md: .planning/ROADMAP.md

## Current Focus

Milestone: M1.2 — Ship to Prod + Credibility Gap
Phase: Phase 10 — Demo Plugins Hytale (next)
Plan: 10-01 (to be planned — brainstorm + choix 2-3 concepts plugins, critères simple/wow/API avancée)
Status: Phase 9 shipped — M1.1 live sur killiandalcin.fr
Last activity: 2026-04-22
Resume file: lancer `/gsd-plan-phase 9`

## Milestone Context (v1.2)

- **Why v1.2** : débloquer prospection active (Discord + DMs 5-10h/sem) qui suit. Deploy + démos + cohérence branding.
- **Phase 9** : Deploy prod (Portainer autobuild pull) — M1.1 codée mais pas live
- **Phase 10** : 2-3 mini-plugins Hytale open-source — effet wahou, simple à coder, API Hytale poussée au max. Crédibilité DM Discord.
- **Phase 11** : Fix JSON-LD `index.vue` (Full Stack → Hytale Plugin Developer via siteConfig) + audit cohérence + composant `HytaleRecentArticles` sur `/hytale`

## Accumulated Context (carried from v1.1)

- Stack : Nuxt 4 SSR + Nuxt UI v3 + Tailwind v4 + pnpm + @nuxt/content v3 + nuxt-schema-org + @nuxtjs/sitemap v8
- Deployment : Docker node:22-alpine, Portainer autobuild, pull manuel par Killian côté prod
- Gotchas M1.1 (à retenir pour plans à venir) :
  - `queryCollection(variable)` pas analysable par Vite extractor @nuxt/content → toujours littéraux `queryCollection('blog_fr')`
  - Dans server/, importer `queryCollection` depuis `@nuxt/content/server` pour vue-tsc (sinon signature client incompatible)
  - `defineSitemapEventHandler` = auto-import @nuxtjs/sitemap (pas d'import explicite)
  - `defineArticle.inLanguage` typing narrow → cast `as unknown as ComputedRef<'fr-FR'>`
  - `useSeoMeta.articleAuthor` attend `string[]` (pas string)
  - Hook `content:file:afterParse` : propriétés injectées doivent être déclarées `.optional()` dans le schema Zod
  - Imports Nitro plugin : `~/utils/...` (Nuxt 4 `~/` → `app/`)
- Articles seed Hytale en prod : `how-to-build-your-first-hytale-plugin`, `hytale-plugin-development-2026` (FR+EN, draft:false)
- `app/data/site.ts` / `app/pages/hytale.vue` / `app/utils/seo-person.ts` : `jobTitle` = "Hytale Plugin Developer" (aligné)
- `app/pages/index.vue` lignes 28 + 38 : encore "Developpeur Full Stack" (cible REBRAND-01)
