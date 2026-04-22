# Portfolio Killian' Dalcin — Refonte Nuxt 4 SSR

## What This Is

Portfolio professionnel de Killian' Dalcin, developpeur freelance specialise en plugins Hytale et developpement web gaming. Le site presente ses services, projets et competences en bilingue FR/EN. Migration d'une SPA Vue 3 (invisible sur Google) vers Nuxt 4 SSR pour un SEO complet. Objectif business : qu'un server owner Hytale qui cherche "Hytale plugin developer" trouve Killian sur Google.

## Core Value

Le portfolio doit positionner Killian comme LE developpeur de plugins Hytale professionnel — pas un "dev web freelance generique" perdu parmi 500 000 autres. Chaque page doit etre crawlable sans JavaScript (SSR), avec un SEO optimise pour le marche Hytale.

## Current State

**Active:** v1.2 (started 2026-04-22) — Ship to Prod + Credibility Gap
- Ship-first : déployer M1.1 en prod (blog/SEO/sitemap pas encore live)
- Combler le gap crédibilité : 2-3 plugins Hytale démo open-source (effet wahou)
- Finaliser cohérence branding : fix JSON-LD homepage, HytaleRecentArticles, audit jobTitle

**Shipped:**
- v1.1 (2026-04-22) — SEO Hytale — Autorité & Contenu (blog bilingue, JSON-LD, sitemap hreflang)
- v1.0 (2026-04-21) — Portfolio Hytale-first SSR déployé

Voir `.planning/milestones/` pour archives.

## Why v1.2 Now

Le portfolio est prêt techniquement mais :
1. M1.1 n'est pas déployée en prod → SEO Hytale invisible
2. Zéro démo plugin concret à montrer en DM Discord (blocker business #1 selon plan stratégique)
3. Incohérence JSON-LD `index.vue` (encore "Developpeur Full Stack")

Objectif : débloquer la prospection active (5-10h/sem Discord + DMs) qui vient après.

## Requirements

### Validated

- ✓ Nuxt 4 SSR configure avec compatibilityVersion 4 — existant
- ✓ Systeme i18n bilingue FR/EN avec prefix_except_default — existant
- ✓ Dark/light theme avec persistence cookie (SSR-safe) — existant
- ✓ Nuxt UI v3 integre comme bibliotheque de composants — existant
- ✓ Pages : accueil, projets, about, contact, fiverr — existant
- ✓ Formulaire de contact avec Zod validation + honeypot — existant
- ✓ Donnees projets typees avec composable useProjects() — existant
- ✓ Layout responsive avec header sticky et navigation mobile — existant
- ✓ JSON-LD structured data (Person, WebSite) sur homepage — existant
- ✓ Sitemap dynamique avec hreflang FR/EN — existant
- ✓ useSeoMeta() par route avec title, description, og:tags bilingues — existant
- ✓ Dockerfile SSR multi-stage node:22-alpine — existant

### Active (v1.2)

- [ ] **DEPLOY**: Pull image autobuild Portainer → M1.1 live sur killiandalcin.fr (blog, sitemap, JSON-LD)
- [ ] **DEMO-1**: 2-3 mini-plugins Hytale open-source, simples à coder mais effet wahou (GitHub public + README EN)
- [ ] **DEMO-2**: Section "Live Demos" sur `/hytale` listant les plugins démo (screenshots, lien GitHub, lien code)
- [ ] **REBRAND**: Fix JSON-LD `app/pages/index.vue` (Developpeur Full Stack → Hytale Plugin Developer) + audit cohérence jobTitle toutes pages
- [ ] **COCON**: Composant `HytaleRecentArticles` sur `/hytale` (tire derniers articles blog, renforce maillage interne)

### Out of Scope

- Tests automatises — priorite au shipping, tests si necessaire apres
- Blog/CMS — promu en Active pour M1.1 (blog markdown statique)
- Dashboard admin — portfolio statique
- PWA/Service Workers — pas de besoin offline
- Pub payante — budget zero
- Plugin marketplace — trop complexe pour 5-10h/semaine
- Payment integration — paiements via Fiverr ou virement direct

## Context

- **Developpeur:** Killian' Dalcin, 7+ ans autodidacte, JS/TS/Vue/React/Node/Java/Kotlin
- **Situation:** CDI chez Mashe + auto-entrepreneur (micro-entreprise) a cote
- **Marche:** Hytale en Early Access (2026), marche de plugins quasi vide sur Fiverr (~1 concurrent direct a $45)
- **Avantage structurel:** Chaque update Hytale casse les plugins = clients recurrents pour maintenance
- **Probleme resolu:** Portfolio SPA invisible sur Google, positionnement generique "dev web freelance"
- **Codebase:** Migration Nuxt 4 deja avancee — pages, composants, data, i18n, contact form, SEO, Docker fonctionnels
- **Disponibilite:** 5-10h/semaine pour prospection hors CDI
- **Anglais:** Courant/Pro — acces marche international

## Constraints

- **Stack**: Nuxt 4 + Nuxt UI v3 + Tailwind v4 — versions stables actuelles
- **Budget**: Zero dependance payante (hors Claude)
- **Composants**: Nuxt UI v3 en priorite (80% suffit, pas de custom inutile)
- **TypeScript**: Mode strict partout
- **i18n/Theme**: Persistance cookie uniquement (SSR-safe), pas de localStorage
- **Deploiement**: Docker node:22-alpine, SSR
- **Design**: Garder le dark theme et brand green (#85cb85) actuels — ameliorer, pas refaire
- **Scope**: Ameliorer l'existant et ajouter le contenu Hytale, pas tout refaire from scratch

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Hytale en positionnement principal | Marche emergent quasi vide, avantage first-mover, clients recurrents | Pending |
| Nuxt 4 SSR over static generation | SEO dynamique, meta tags par page, i18n avec prefix routing | Good |
| Cookie-only persistence | SSR-safe, pas de flash/hydration mismatch | Good |
| pnpm comme package manager | Standard Nuxt 4, plus rapide que npm | Good |
| Grille tarifaire visible sur le site | Filtrer les clients non-serieux, transparence | Pending |

## Evolution

This document evolves at phase transitions and milestone boundaries.

---
*Last updated: 2026-04-22 — M1.2 bootstrap*
