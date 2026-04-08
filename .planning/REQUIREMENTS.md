# Requirements: Portfolio Killian Dalcin — Nuxt 4 Migration

**Defined:** 2026-04-07
**Core Value:** Chaque page du portfolio doit être crawlable par les moteurs de recherche sans JavaScript côté client

## v1 Requirements

### SSR Foundation

- [ ] **SSR-01**: Chaque route retourne du HTML complet côté serveur, crawlable sans JS client
- [ ] **SSR-02**: Le projet utilise Nuxt 4 avec la structure `app/` et les auto-imports
- [ ] **SSR-03**: `nuxt.config.ts` configure tous les modules (UI, i18n, color-mode, SEO, gtag, image)

### Internationalization

- [x] **I18N-01**: Le site supporte FR et EN avec stratégie `prefix_except_default` (FR à `/`, EN à `/en/*`)
- [x] **I18N-02**: La locale est détectée depuis le navigateur au premier accès et persistée en cookie
- [ ] **I18N-03**: L'utilisateur peut changer de langue via un switcher dans le header
- [x] **I18N-04**: Le serveur lit le cookie et rend la bonne langue sans hydration mismatch
- [x] **I18N-05**: Les fichiers de traduction FR/EN sont migrés depuis les locales existantes

### Theme

- [ ] **THEME-01**: L'utilisateur peut basculer entre dark et light mode via un toggle dans le header
- [x] **THEME-02**: Le thème est persisté en cookie SSR-safe (pas localStorage)
- [x] **THEME-03**: Aucun FOUC au chargement — le serveur rend le bon thème dès la première requête

### SEO

- [x] **SEO-01**: Chaque page a un `<title>`, `<meta description>`, `og:title`, `og:description` uniques via `useSeoMeta()`
- [x] **SEO-02**: La page d'accueil inclut du JSON-LD structuré (Person / CreativeWork)
- [x] **SEO-03**: Le sitemap.xml est généré automatiquement avec les alternates i18n (hreflang)
- [x] **SEO-04**: Les og:image utilisent des URLs absolues et sont présentes sur chaque page

### Pages

- [ ] **PAGE-01**: Page Landing `/` — hero, projets vedettes, services, CTA
- [ ] **PAGE-02**: Page Projects `/projects` — liste de projets avec filtres (recherche + catégorie)
- [ ] **PAGE-03**: Page Project Detail `/project/[id]` — détail projet avec galerie modale d'images
- [ ] **PAGE-04**: Page About `/about` — biographie, tech stack badges
- [ ] **PAGE-05**: Page Contact `/contact` — formulaire avec validation + envoi EmailJS
- [ ] **PAGE-06**: Page Fiverr `/fiverr` — landing services, cards, FAQ accordion, CTA
- [ ] **PAGE-07**: Page Formation `/formation` — page formations/cours
- [ ] **PAGE-08**: Page 404 — `error.vue` avec redirection vers home

### Components

- [ ] **COMP-01**: Galerie modale d'images — UModal + UCarousel avec navigation clavier (flèches + Escape)
- [ ] **COMP-02**: Formulaire contact — UForm + UFormField + UInput + UTextarea + validation Zod + envoi EmailJS
- [ ] **COMP-03**: FAQ accordion — UAccordion pour la page Fiverr, localisé FR/EN
- [ ] **COMP-04**: Section témoignages clients — UCard pour chaque témoignage
- [ ] **COMP-05**: Header avec navigation desktop (UNavigationMenu) + mobile (UDrawer) + toggles langue/thème
- [ ] **COMP-06**: Footer avec liens et informations

### Data

- [ ] **DATA-01**: Données projets migrées depuis `src/data/` vers `data/` avec interfaces TypeScript
- [ ] **DATA-02**: Données témoignages migrées avec interfaces TypeScript
- [ ] **DATA-03**: Données FAQ migrées avec support FR/EN et interfaces TypeScript
- [ ] **DATA-04**: Données tech stack migrées avec interfaces TypeScript
- [ ] **DATA-05**: Composable `useProjects()` migré — filtrage, recherche, findById

### Infrastructure

- [ ] **INFRA-01**: Dockerfile production multi-stage (node:22-alpine build → node:22-alpine runtime, copie `.output/` uniquement)
- [ ] **INFRA-02**: TypeScript en mode strict avec interfaces pour toutes les données
- [ ] **INFRA-03**: ESLint + Prettier configurés via @nuxt/eslint
- [ ] **INFRA-04**: Google Analytics 4 via nuxt-gtag, actif uniquement en production

## v2 Requirements

### Performance avancée

- **PERF-01**: Preload hero image via useHead link preload
- **PERF-02**: Fonts locales (pas Google Fonts) pour éviter FOUT
- **PERF-03**: NuxtImg avec optimisation WebP automatique pour toutes les images projet

### SEO avancé

- **SEOV2-01**: og:image générée dynamiquement par route via nuxt-og-image
- **SEOV2-02**: robots.txt optimisé avec directives spécifiques

## Out of Scope

| Feature | Reason |
|---------|--------|
| Umami Analytics | Self-hosted, infrastructure hors scope |
| AdSense | Script externe simple, pas un module Nuxt |
| Backend custom | Formulaire contact via EmailJS uniquement |
| @nuxt/content | Données statiques en TS, pas besoin de CMS markdown |
| Blog / articles | Pas dans le scope, maintenance contenu supplémentaire |
| Animation library (GSAP) | CSS transitions suffisantes, poids JS inutile |
| i18n > 2 langues | FR/EN uniquement, scope creep |
| CMS admin panel | Données statiques modifiées via code |
| Tests automatisés | Migration d'abord, tests ensuite si nécessaire |

## Traceability

| Requirement | Phase | Status |
|-------------|-------|--------|
| SSR-01 | Phase 1 | Pending |
| SSR-02 | Phase 1 | Pending |
| SSR-03 | Phase 1 | Pending |
| DATA-01 | Phase 1 | Pending |
| DATA-02 | Phase 1 | Pending |
| DATA-03 | Phase 1 | Pending |
| DATA-04 | Phase 1 | Pending |
| DATA-05 | Phase 1 | Pending |
| INFRA-02 | Phase 1 | Pending |
| INFRA-03 | Phase 1 | Pending |
| I18N-01 | Phase 2 | Complete |
| I18N-02 | Phase 2 | Complete |
| I18N-03 | Phase 2 | Pending |
| I18N-04 | Phase 2 | Complete |
| I18N-05 | Phase 2 | Complete |
| THEME-01 | Phase 2 | Pending |
| THEME-02 | Phase 2 | Complete |
| THEME-03 | Phase 2 | Complete |
| SEO-01 | Phase 2 | Complete |
| SEO-02 | Phase 2 | Complete |
| SEO-03 | Phase 2 | Complete |
| SEO-04 | Phase 2 | Complete |
| COMP-05 | Phase 2 | Pending |
| COMP-06 | Phase 2 | Pending |
| PAGE-01 | Phase 3 | Pending |
| PAGE-02 | Phase 3 | Pending |
| PAGE-03 | Phase 3 | Pending |
| PAGE-04 | Phase 3 | Pending |
| PAGE-05 | Phase 3 | Pending |
| PAGE-06 | Phase 3 | Pending |
| PAGE-07 | Phase 3 | Pending |
| PAGE-08 | Phase 3 | Pending |
| COMP-01 | Phase 3 | Pending |
| COMP-02 | Phase 3 | Pending |
| COMP-03 | Phase 3 | Pending |
| COMP-04 | Phase 3 | Pending |
| INFRA-01 | Phase 3 | Pending |
| INFRA-04 | Phase 3 | Pending |

**Coverage:**
- v1 requirements: 38 total
- Mapped to phases: 38
- Unmapped: 0 ✓

---
*Requirements defined: 2026-04-07*
*Last updated: 2026-04-07 after roadmap creation*
