# Requirements: Portfolio Killian' Dalcin

**Defined:** 2026-04-10
**Core Value:** Positionner Killian comme dev Hytale #1, crawlable sans JS, SEO optimise

## v1 Requirements

### Content

- [ ] **CONT-01**: Refonte Hero accueil — "Hytale Plugin Developer" en H1, CTA Discord/contact, bilingue
- [ ] **CONT-02**: Page Hytale dediee `/hytale` — services plugin dev, tiers pricing, demos placeholders, maintenance recurrente, bilingue
- [ ] **CONT-03**: Grille tarifaire — plugin simple/complexe/sur-mesure/maintenance/web avec prix visibles
- [ ] **CONT-04**: Temoignages — section featured + stats sur homepage et page Hytale (5 avis Fiverr existants)

### SEO

- [ ] **SEO-01**: Canonical links — `<link rel="canonical">` sur chaque page pour eviter duplication i18n
- [ ] **SEO-02**: ogUrl par page — chaque `useSeoMeta()` inclut `ogUrl` specifique
- [ ] **SEO-03**: og:image par page — images distinctes au lieu du meme og-image.png partout
- [ ] **SEO-04**: JSON-LD complet — Person (homepage), Service (hytale), SoftwareApplication (projets), composable `useJsonLd.ts`
- [ ] **SEO-05**: jobTitle corrige — "Hytale Plugin Developer" dans site.ts et JSON-LD, pas "Full Stack Freelance"

### i18n

- [ ] **I18N-01**: Audit complet FR/EN — chaque cle FR doit exister en EN avec traduction reelle
- [ ] **I18N-02**: Qualite traductions FR — reformuler les traductions approximatives/anglicismes
- [ ] **I18N-03**: Hardcoded strings — eliminer toutes les chaines en dur dans les composants (HeroSection, error.vue)
- [ ] **I18N-04**: SEO keys Hytale — title/description/og specifiques pour la page Hytale en FR et EN

### Fixes

- [ ] **FIX-01**: Supprimer `public/sitemap.xml` statique — conflit avec `@nuxtjs/sitemap` dynamique
- [ ] **FIX-02**: Dockerfile pnpm — remplacer `npm ci` par `pnpm install --frozen-lockfile`
- [ ] **FIX-03**: Rate limiting contact API — protection anti-spam in-memory sur `/api/contact`
- [ ] **FIX-04**: Donnees incoherentes — `reviewCount: '50'` vs `totalReviews: 10`, Fiverr URLs `#`
- [ ] **FIX-05**: Pinning deps — `vue: "latest"` et `vue-router: "latest"` a pincer sur `^3.5.0` / `^4.5.0`

### Deployment

- [ ] **DEPLOY-01**: Dockerfile production corrige — pnpm, node:22-alpine, env vars SMTP/gtag runtime

## v2 Requirements

- **CONT-05**: Blog technique — articles Hytale plugin dev pour SEO long-tail
- **SEO-06**: og:image dynamique generee par page
- **FEAT-01**: Formulaire devis en ligne
- **FEAT-02**: Section portfolio Minecraft Java

## Out of Scope

| Feature | Reason |
|---------|--------|
| Tests automatises | Ship d'abord, tests ensuite |
| Blog/CMS | Pas de contenu dynamique pour l'instant |
| Dashboard admin | Portfolio statique |
| PWA/Service Workers | Pas de besoin offline |
| Pub payante | Budget zero |
| Payment integration | Paiements via Fiverr ou virement |

## Traceability

| Requirement | Phase | Status |
|-------------|-------|--------|
| CONT-01 | TBD | Pending |
| CONT-02 | TBD | Pending |
| CONT-03 | TBD | Pending |
| CONT-04 | TBD | Pending |
| SEO-01 | TBD | Pending |
| SEO-02 | TBD | Pending |
| SEO-03 | TBD | Pending |
| SEO-04 | TBD | Pending |
| SEO-05 | TBD | Pending |
| I18N-01 | TBD | Pending |
| I18N-02 | TBD | Pending |
| I18N-03 | TBD | Pending |
| I18N-04 | TBD | Pending |
| FIX-01 | TBD | Pending |
| FIX-02 | TBD | Pending |
| FIX-03 | TBD | Pending |
| FIX-04 | TBD | Pending |
| FIX-05 | TBD | Pending |
| DEPLOY-01 | TBD | Pending |
