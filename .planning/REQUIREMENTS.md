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

## v1.1 Requirements (M1.1 — SEO Hytale — Autorité & Contenu)

### Blog — Système

- [ ] **BLOG-01**: Intégration `@nuxt/content` ou équivalent — renderer markdown complet (syntax highlighting, images, embeds, tables, callouts/alerts)
- [ ] **BLOG-02**: Page listing `/blog` — liste de tous les articles avec titre, description, date, tags, SSR
- [ ] **BLOG-03**: Page article `/blog/[slug]` — rendu SSR complet, table des matières, navigation prev/next
- [ ] **BLOG-04**: Blocs de code avec syntax highlighting (Kotlin, Java, TypeScript, Shell prioritaires pour Hytale)
- [ ] **BLOG-05**: Support images dans articles — images optimisées avec `<NuxtImg>` ou `<nuxt-img>`

### Blog — Contenu

- [ ] **BLOG-06**: Articles bilingues FR/EN — structure i18n dans le système de contenu
- [ ] **BLOG-07**: Au moins 2 articles seed Hytale au lancement (ex: "How to build your first Hytale plugin", "Hytale plugin development in 2026")

### SEO — Blog

- [ ] **SEO-10**: `useSeoMeta()` par article — title, description, og:title, og:description, og:image uniques
- [ ] **SEO-11**: JSON-LD `Article` par billet de blog — author, datePublished, dateModified, headline
- [x] **SEO-12**: Sitemap étendu — URLs `/blog/[slug]` et `/en/blog/[slug]` incluses automatiquement
- [ ] **SEO-13**: Open Graph image par article — og:image spécifique (image de l'article ou fallback branded)

### SEO — Cocon sémantique

- [ ] **SEO-14**: Liens internes structurés — articles de blog pointent vers `/hytale`, page `/hytale` liste les articles récents
- [ ] **SEO-15**: BreadcrumbList JSON-LD sur les pages blog (Accueil → Blog → Article)

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

| Requirement | Phase | Status |
|-------------|-------|--------|
| BLOG-01 | Phase 5 | Pending |
| BLOG-04 | Phase 5 | Pending |
| BLOG-05 | Phase 5 | Pending |
| BLOG-02 | Phase 6 | Pending |
| BLOG-03 | Phase 6 | Pending |
| BLOG-06 | Phase 6 | Pending |
| SEO-10 | Phase 7 | Pending |
| SEO-11 | Phase 7 | Pending |
| SEO-12 | Phase 7 | Done (07-04) |
| SEO-13 | Phase 7 | Pending |
| SEO-15 | Phase 7 | Pending |
| BLOG-07 | Phase 8 | Pending |
| SEO-14 | Phase 8 | Pending |
