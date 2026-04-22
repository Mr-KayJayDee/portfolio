# Milestones

## M1 — Portfolio Hytale-first, SEO-ready, production

**Version:** v1.0
**Completed:** 2026-04-21
**Phases:** 4

**Delivered:**
- Hero Hytale-first avec H1 "Hytale Plugin Developer"
- Page `/hytale` avec pricing 3 tiers, témoignages
- SEO complet : canonical, ogUrl, og:image, JSON-LD, sitemap dynamique
- i18n bilingue FR/EN audit complet
- Dockerfile SSR pnpm, rate limiting contact form
- Déployé en production sur killiandalcin.fr

## M1.1 — SEO Hytale — Autorité & Contenu

**Version:** v1.1
**Completed:** 2026-04-22 (partial — Phase 8 composant HytaleRecentArticles reporté en M1.2)
**Phases:** 4 (5–8), Plans 17/18
**Archive:** [v1.1-ROADMAP.md](./milestones/v1.1-ROADMAP.md) · [v1.1-REQUIREMENTS.md](./milestones/v1.1-REQUIREMENTS.md)

**Delivered:**
- Blog markdown bilingue FR/EN (@nuxt/content v3 + Shiki)
- Page `/blog` listing + `/blog/[slug]` SSR avec TOC et prev/next
- SEO par article : useSeoMeta enrichi, JSON-LD Article/Breadcrumb/CollectionPage, og:image résolu
- Sitemap dynamique avec hreflang x-default (endpoint Nitro)
- 2 articles seed Hytale publiés FR+EN (API Java réelle `com.hypixel.hytale.plugin`)

**Carried to M1.2:** Composant HytaleRecentArticles (finalisation cocon sémantique — Phase 11)

## M1.2 — Ship to Prod + Credibility Gap

**Version:** v1.2
**Started:** 2026-04-22
**Status:** Active
**Phases:** 3 (9–11), Plans: 6

**Goal:** Débloquer la prospection active en déployant M1.1 en prod, combler le gap crédibilité (démos plugins open-source), finaliser cohérence branding Hytale.

**Planned:**
- Phase 9 : Deploy prod via Portainer (M1.1 live sur killiandalcin.fr)
- Phase 10 : 2-3 mini-plugins Hytale open-source (GitHub public + README EN + section Live Demos sur `/hytale`)
- Phase 11 : Fix JSON-LD `index.vue` (REBRAND-01..03) + composant `HytaleRecentArticles` (COCON-01)
