# Requirements: Portfolio Killian' Dalcin

**Defined:** 2026-04-10
**Updated:** 2026-04-21 (v1.1 added)
**Core Value:** Positionner Killian comme dev Hytale #1, crawlable sans JS, SEO optimise

## v1 Requirements (M1 — Complété 2026-04-21)

### Content

- [x] **CONT-01**: Refonte Hero accueil — "Hytale Plugin Developer" en H1, CTA Discord/contact, bilingue
- [x] **CONT-02**: Page Hytale dediee `/hytale` — services plugin dev, tiers pricing, demos placeholders, maintenance recurrente, bilingue
- [x] **CONT-03**: Grille tarifaire — plugin simple/complexe/sur-mesure/maintenance/web avec prix visibles
- [x] **CONT-04**: Temoignages — section featured + stats sur homepage et page Hytale (5 avis Fiverr existants)

### SEO

- [x] **SEO-01**: Canonical links — `<link rel="canonical">` sur chaque page pour eviter duplication i18n
- [x] **SEO-02**: ogUrl par page — chaque `useSeoMeta()` inclut `ogUrl` specifique
- [x] **SEO-03**: og:image par page — images distinctes au lieu du meme og-image.png partout
- [x] **SEO-04**: JSON-LD complet — Person (homepage), Service (hytale), SoftwareApplication (projets), composable `useJsonLd.ts`
- [x] **SEO-05**: jobTitle corrige — "Hytale Plugin Developer" dans site.ts et JSON-LD, pas "Full Stack Freelance"

### i18n

- [x] **I18N-01**: Audit complet FR/EN — chaque cle FR doit exister en EN avec traduction reelle
- [x] **I18N-02**: Qualite traductions FR — reformuler les traductions approximatives/anglicismes
- [x] **I18N-03**: Hardcoded strings — eliminer toutes les chaines en dur dans les composants
- [x] **I18N-04**: SEO keys Hytale — title/description/og specifiques pour la page Hytale en FR et EN

### Fixes

- [x] **FIX-01**: Supprimer `public/sitemap.xml` statique — conflit avec `@nuxtjs/sitemap` dynamique
- [x] **FIX-02**: Dockerfile pnpm — remplacer `npm ci` par `pnpm install --frozen-lockfile`
- [x] **FIX-03**: Rate limiting contact API — protection anti-spam in-memory sur `/api/contact`
- [x] **FIX-04**: Donnees incoherentes — `reviewCount: '50'` vs `totalReviews: 10`, Fiverr URLs `#`
- [x] **FIX-05**: Pinning deps — `vue: "latest"` et `vue-router: "latest"` a pincer sur `^3.5.0` / `^4.5.0`

### Deployment

- [x] **DEPLOY-01**: Dockerfile production corrige — pnpm, node:22-alpine, env vars SMTP/gtag runtime

---

## v1.1 Requirements (M1.1 — Shipped 2026-04-22)

All 13 requirements (BLOG-01..07, SEO-10..15) validated and shipped.
→ See archived: [v1.1-REQUIREMENTS.md](./milestones/v1.1-REQUIREMENTS.md)

## Future Requirements (backlog)

- **SEO-06**: og:image dynamique générée par page (OG image generator)
- **FEAT-01**: Formulaire devis en ligne
- **FEAT-02**: Section portfolio Minecraft Java
- **CONT-08**: Newsletter / liste email pour communauté Hytale

## Out of Scope

| Feature | Reason |
|---------|--------|
| Tests automatises | Ship d'abord, tests ensuite |
| Dashboard admin | Blog statique markdown, pas de CMS |
| PWA/Service Workers | Pas de besoin offline |
| Pub payante | Budget zero |
| Payment integration | Paiements via Fiverr ou virement |
| Core Web Vitals | Milestone dédié si besoin |
| OG image generator | Complexité vs impact — backlog |

## Traceability v1.1

All v1.1 requirements shipped — see [v1.1-REQUIREMENTS.md](./milestones/v1.1-REQUIREMENTS.md) for phase mapping and outcomes.
