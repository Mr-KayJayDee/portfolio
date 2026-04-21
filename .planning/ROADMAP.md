# Roadmap: Portfolio Killian' Dalcin

**Milestone:** M1 — Portfolio Hytale-first, SEO-ready, production
**Granularity:** Coarse
**Coverage:** 19/19 requirements mapped

---

## Phases

- [x] **Phase 1: Cleanup & Fixes** - Sitemap conflit, Dockerfile pnpm, deps pinning, donnees incoherentes, rate limiting
- [x] **Phase 2: Content** - Hero Hytale, page Hytale, pricing, temoignages, jobTitle
- [ ] **Phase 3: SEO & i18n** - Canonical, ogUrl, og:image, JSON-LD, audit i18n, traductions
- [ ] **Phase 4: Ship** - Dockerfile final, verification production, deploy

---

## Phase Details

### Phase 1: Cleanup & Fixes
**Goal**: Le codebase est propre — pas de conflits de config, deps pinees, contact form protege, donnees coherentes
**Depends on**: Nothing
**Requirements**: FIX-01, FIX-02, FIX-03, FIX-04, FIX-05, DEPLOY-01
**Success Criteria** (what must be TRUE):
  1. `public/sitemap.xml` supprime — `curl localhost:3000/sitemap.xml` retourne le sitemap dynamique genere par `@nuxtjs/sitemap`
  2. `Dockerfile` utilise `pnpm install --frozen-lockfile` — `docker build` reussit sans npm
  3. `package.json` ne contient ni `"latest"` ni `"*"` dans les deps
  4. `siteConfig.seo.organization.aggregateRating.reviewCount` correspond a `testimonials.totalReviews`
  5. 10 requetes POST rapides sur `/api/contact` → les dernieres sont rejetees (rate limit)
**Plans:** 2 plans
Plans:
- [ ] 01-01-PLAN.md — Delete static sitemap, pin deps, fix data inconsistencies
- [ ] 01-02-PLAN.md — Migrate Dockerfile to pnpm, add contact API rate limiting

### Phase 2: Content
**Goal**: Un visiteur comprend immediatement que Killian est dev Hytale, peut voir les services/prix, et lire des temoignages clients
**Depends on**: Phase 1
**Requirements**: CONT-01, CONT-02, CONT-03, CONT-04, SEO-05
**Success Criteria** (what must be TRUE):
  1. Le H1 de la homepage contient "Hytale" — `curl localhost:3000 | grep -i hytale` dans le `<h1>`
  2. `/hytale` existe avec 3+ tiers de pricing visibles et un CTA contact/Discord
  3. `app/data/site.ts` contient `jobTitle: 'Hytale Plugin Developer'`
  4. Les temoignages apparaissent sur la homepage ET la page Hytale
  5. Tout le contenu est bilingue — `curl localhost:3000/en/hytale` retourne du contenu anglais
**Plans:** 3 plans
Plans:
- [ ] 02-01-PLAN.md — Types, data files, site.ts config, i18n keys (foundation)
- [ ] 02-02-PLAN.md — Hero refonte Hytale, testimonials featured prop, nav link
- [ ] 02-03-PLAN.md — Hytale page creation with pricing, services, and sections
**UI hint**: yes

### Phase 3: SEO & i18n
**Goal**: Chaque page a des meta tags complets, JSON-LD, canonical links, et des traductions FR/EN naturelles et completes
**Depends on**: Phase 2
**Requirements**: SEO-01, SEO-02, SEO-03, SEO-04, I18N-01, I18N-02, I18N-03, I18N-04
**Success Criteria** (what must be TRUE):
  1. `curl localhost:3000` retourne `<link rel="canonical">` et `ogUrl` dans le HTML
  2. `curl localhost:3000/hytale` retourne un JSON-LD `Service` avec les 3 tiers
  3. `curl localhost:3000/en/` retourne du HTML anglais sans hardcoded French strings
  4. Aucun composant ne contient de chaine en dur (grep pour strings hors `t()` dans les templates)
  5. Les traductions FR sonnent naturel — pas de calque anglais
**Plans**: TBD

### Phase 4: Ship
**Goal**: Le site est deployable en production via Docker et passe tous les checks
**Depends on**: Phase 3
**Requirements**: DEPLOY-01
**Success Criteria** (what must be TRUE):
  1. `docker build` complete sans erreur
  2. Le container sert le site SSR sur le port attendu
  3. `pnpm typecheck` et `pnpm lint` passent avec 0 erreurs
  4. `curl` sur chaque page retourne `<title>`, `<meta description>`, `og:title` dans le HTML brut
**Plans**: TBD

---

## Progress

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. Cleanup & Fixes | 2/2 | Complete | 2026-04-21 |
| 2. Content | 3/3 | Complete | 2026-04-21 |
| 3. SEO & i18n | 0/? | Not started | - |
| 4. Ship | 0/? | Not started | - |
