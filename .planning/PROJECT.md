# Portfolio Killian Dalcin — Migration Nuxt 4

## What This Is

Migration complète d'un portfolio freelance de Vue 3 SPA vers Nuxt 4 avec SSR complet. Le site présente les projets, services et compétences de Killian Dalcin, développeur freelance, avec support bilingue FR/EN. L'objectif est un SEO parfait et un développement rapide via des composants prêts à l'emploi (Nuxt UI v3).

## Core Value

Chaque page du portfolio doit être crawlable par les moteurs de recherche sans JavaScript côté client — le SSR est la raison d'être de cette migration.

## Requirements

### Validated

(None yet — ship to validate)

### Active

- [ ] SSR complet — chaque route crawlable sans JS client
- [ ] i18n FR/EN — détection navigateur + switch manuel + persistance cookie (SSR-safe)
- [ ] Dark/light mode — persistance cookie SSR-safe via @nuxtjs/color-mode, pas de FOUC
- [ ] SEO par route — useSeoMeta(), og:image auto, JSON-LD page home
- [ ] Sitemap.xml généré automatiquement (@nuxtjs/sitemap)
- [ ] Galerie modale images projets — UModal de Nuxt UI v3
- [ ] Formulaire contact — UForm + UInput + UTextarea (Nuxt UI), envoi EmailJS
- [ ] Performance — lazy load images (NuxtImg), fonts locales, preload hero
- [ ] Migration page Landing (hero + projets vedettes + services + CTA)
- [ ] Migration page Projects (liste avec filtres)
- [ ] Migration page Project Detail (détail + galerie modale)
- [ ] Migration page About (bio)
- [ ] Migration page Contact (formulaire)
- [ ] Migration page Fiverr (landing services)
- [ ] Migration page Formation (formations)
- [ ] Migration données statiques (projets, témoignages, FAQ, tech stack)
- [ ] Migration composables (useProjects → useAsyncData, useSiteConfig → useAppConfig, useGallery → UModal)
- [ ] Dockerfile production optimisé (multi-stage, node:22-alpine)
- [ ] TypeScript strict partout
- [ ] ESLint + Prettier (@nuxt/eslint)

### Out of Scope

- Umami Analytics — self-hosted, hors scope de cette migration
- AdSense — script externe simple à injecter via app.head, pas un module
- Backend custom — formulaire contact via EmailJS/Formspree uniquement
- @nuxt/content — données statiques en fichiers TS, pas besoin de CMS markdown
- Tests automatisés — migration d'abord, tests ensuite si nécessaire

## Context

- Portfolio freelance existant en production (Vue 3 SPA)
- Le site actuel fonctionne mais le SPA nuit au SEO (pas de SSR)
- Données statiques dans `src/data/` (projets, témoignages, FAQ, tech stack) — format TS avec textes FR/EN
- Composables existants : useProjects(), useSiteConfig(), useGallery()
- i18n actuel via vue-i18n standalone avec persistance localStorage (non SSR-safe)
- Thème actuel via class CSS `dark` avec persistance localStorage (FOUC au chargement)
- Déploiement Docker existant (Node 22 build → nginx serve static)
- Google Analytics 4 hardcodé dans index.html (à migrer vers nuxt-gtag)

## Constraints

- **Stack**: Nuxt 4 + Nuxt UI v3 + Tailwind v4 — dernières versions stables
- **Coût**: Zéro dépendance payante
- **Composants**: Nuxt UI v3 en priorité sur le custom (80% suffit)
- **TypeScript**: Mode strict partout
- **Déploiement**: Docker node:22-alpine, nuxt build (SSR) ou nuxt generate (SSG) selon stratégie
- **i18n/Theme**: Persistance cookie uniquement (SSR-safe), pas de localStorage

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Nuxt 4 plutôt que Nuxt 3 | Dernière version stable, meilleure DX et perf | — Pending |
| Nuxt UI v3 plutôt que composants custom | Vitesse de dev, composants production-ready | — Pending |
| EmailJS pour le contact | Pas de backend à maintenir | — Pending |
| Cookie plutôt que localStorage pour i18n/theme | SSR-safe, pas de flash/hydration mismatch | — Pending |
| Données statiques en TS plutôt que @nuxt/content | Simplicité, pas besoin de CMS | — Pending |

## Evolution

This document evolves at phase transitions and milestone boundaries.

**After each phase transition** (via `/gsd-transition`):
1. Requirements invalidated? → Move to Out of Scope with reason
2. Requirements validated? → Move to Validated with phase reference
3. New requirements emerged? → Add to Active
4. Decisions to log? → Add to Key Decisions
5. "What This Is" still accurate? → Update if drifted

**After each milestone** (via `/gsd-complete-milestone`):
1. Full review of all sections
2. Core Value check — still the right priority?
3. Audit Out of Scope — reasons still valid?
4. Update Context with current state

---
*Last updated: 2026-04-07 after initialization*
