# Roadmap: Portfolio Killian' Dalcin

**Milestone:** M1 — Portfolio Hytale-first, SEO-ready, production
**Granularity:** Coarse
**Coverage:** 19/19 requirements mapped

---

## Phases

- [x] **Phase 1: Cleanup & Fixes** - Sitemap conflit, Dockerfile pnpm, deps pinning, donnees incoherentes, rate limiting
- [x] **Phase 2: Content** - Hero Hytale, page Hytale, pricing, temoignages, jobTitle
- [x] **Phase 3: SEO & i18n** - Canonical, ogUrl, og:image, JSON-LD, audit i18n, traductions
- [x] **Phase 4: Ship** - Dockerfile final, verification production, deploy

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
**Plans:** 4 plans
Plans:
- [ ] 06-01-PLAN.md — Content schema Zod extension (draft/wordCount/minutes) + Nitro reading-time hook + draft:true sur test articles
- [ ] 06-02-PLAN.md — i18n keys blog.*/nav.blog/a11y.blog* + lien Blog dans AppHeader + BlogCard.vue unifié (default + compact)
- [ ] 06-03-PLAN.md — Page listing app/pages/blog/index.vue (hero + grid + empty state, SSR bilingue)
- [ ] 06-04-PLAN.md — BlogToc.vue + BlogPrevNext.vue + enrichissement app/pages/blog/[slug].vue (breadcrumb + header + TOC + surround)

### Phase 4: Ship
**Goal**: Le site est deployable en production via Docker et passe tous les checks
**Depends on**: Phase 3
**Requirements**: DEPLOY-01
**Success Criteria** (what must be TRUE):
  1. `docker build` complete sans erreur
  2. Le container sert le site SSR sur le port attendu
  3. `pnpm typecheck` et `pnpm lint` passent avec 0 erreurs
  4. `curl` sur chaque page retourne `<title>`, `<meta description>`, `og:title` dans le HTML brut
**Plans:** 4 plans
Plans:
- [ ] 06-01-PLAN.md — Content schema Zod extension (draft/wordCount/minutes) + Nitro reading-time hook + draft:true sur test articles
- [ ] 06-02-PLAN.md — i18n keys blog.*/nav.blog/a11y.blog* + lien Blog dans AppHeader + BlogCard.vue unifié (default + compact)
- [ ] 06-03-PLAN.md — Page listing app/pages/blog/index.vue (hero + grid + empty state, SSR bilingue)
- [ ] 06-04-PLAN.md — BlogToc.vue + BlogPrevNext.vue + enrichissement app/pages/blog/[slug].vue (breadcrumb + header + TOC + surround)

---

## Progress

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. Cleanup & Fixes | 2/2 | Complete | 2026-04-21 |
| 2. Content | 3/3 | Complete | 2026-04-21 |
| 3. SEO & i18n | 1/1 | Complete | 2026-04-21 |
| 4. Ship | 1/1 | Complete | 2026-04-21 |

---

---

# Roadmap: Portfolio Killian' Dalcin — M1.1

**Milestone:** M1.1 — SEO Hytale — Autorité & Contenu
**Granularity:** Standard
**Coverage:** 13/13 requirements mapped

---

## Phases (M1.1)

- [x] **Phase 5: @nuxt/content Setup & Renderer** - Integration @nuxt/content, markdown renderer complet avec syntax highlighting et images — Completed 2026-04-22 (2/2 plans)
- [x] **Phase 6: Blog Pages** - Page listing /blog et page article /blog/[slug] SSR, bilingue, avec TOC et nav prev/next — Completed 2026-04-22 (4/4 plans)
- [x] **Phase 7: SEO Blog** - useSeoMeta par article, JSON-LD Article, sitemap etendu, og:image, BreadcrumbList — Completed 2026-04-22 (4/4 plans)
- [ ] **Phase 8: Content & Cocon Semantique** - 2 articles seed Hytale, liens internes blog-hytale

---

## Phase Details (M1.1)

### Phase 5: @nuxt/content Setup & Renderer
**Goal**: Le systeme de contenu markdown est installe et rend fidelement le contenu technique — blocs de code colores, images optimisees, tables, alerts — sans configuration supplementaire dans les phases suivantes
**Depends on**: Phase 4 (M1 complete)
**Requirements**: BLOG-01, BLOG-04, BLOG-05
**Success Criteria** (what must be TRUE):
  1. `@nuxt/content` est installe et configure dans `nuxt.config.ts` — `pnpm dev` demarre sans erreur
  2. Un article markdown de test avec un bloc Kotlin est rendu avec coloration syntaxique visible dans le navigateur
  3. Une image referencee dans un article s'affiche via `<NuxtImg>` avec les optimisations (lazy, format webp)
  4. Un tableau markdown et un callout/alert sont rendus avec le style correct
**Plans:** 2 plans
Plans:
- [ ] 05-01-PLAN.md — Installation @nuxt/content, configuration Shiki dual-theme, content.config.ts collections bilingues
- [ ] 05-02-PLAN.md — Composants MDC ProseImg + Alert, articles de test FR/EN, checkpoint visuel
**UI hint**: yes

### Phase 6: Blog Pages
**Goal**: Un visiteur peut naviguer vers /blog, parcourir la liste des articles, ouvrir un article, voir sa table des matieres et naviguer vers l'article precedent/suivant — le tout en SSR et en FR ou EN
**Depends on**: Phase 5
**Requirements**: BLOG-02, BLOG-03, BLOG-06
**Success Criteria** (what must be TRUE):
  1. `curl localhost:3000/blog` retourne du HTML SSR avec une liste d'articles (titre, description, date, tags)
  2. `curl localhost:3000/blog/[slug]` retourne le contenu de l'article rendu en HTML, pas de SPA shell vide
  3. La page article affiche une table des matieres generee depuis les headings du markdown
  4. Des liens "Article precedent" et "Article suivant" sont presents en bas de chaque article
  5. `curl localhost:3000/en/blog` retourne le listing en anglais — les articles ont leur version EN
**Plans:** 4 plans
Plans:
- [x] 06-01-PLAN.md — Content schema Zod extension (draft/wordCount/minutes) + Nitro reading-time hook + draft:true sur test articles
- [x] 06-02-PLAN.md — i18n keys blog.*/nav.blog/a11y.blog* + lien Blog dans AppHeader + BlogCard.vue unifié (default + compact)
- [x] 06-03-PLAN.md — Page listing app/pages/blog/index.vue (hero + grid + empty state, SSR bilingue)
- [x] 06-04-PLAN.md — BlogToc.vue + BlogPrevNext.vue + enrichissement app/pages/blog/[slug].vue (breadcrumb + header + TOC + surround)
**UI hint**: yes

### Phase 7: SEO Blog
**Goal**: Chaque page blog est indexable avec des meta tags complets, un JSON-LD Article valide, et les URLs /blog figurent dans le sitemap — Google peut crawler et comprendre le contenu sans ambiguite
**Depends on**: Phase 6
**Requirements**: SEO-10, SEO-11, SEO-12, SEO-13, SEO-15
**Success Criteria** (what must be TRUE):
  1. `curl localhost:3000/blog/[slug]` retourne `<meta property="og:title">`, `<meta property="og:description">` et `<meta property="og:image">` uniques dans le HTML
  2. Le meme curl retourne un JSON-LD de type `Article` avec `author`, `datePublished`, `headline` remplis
  3. `curl localhost:3000/sitemap.xml` contient les URLs `/blog/[slug]` et `/en/blog/[slug]`
  4. `og:image` pointe vers l'image de l'article ou vers un fallback branded — jamais vers og-image.png generique
  5. La page article contient un JSON-LD `BreadcrumbList` : Accueil → Blog → Titre de l'article
**Plans:** 4 plans
Plans:
- [ ] 07-01-PLAN.md — Install nuxt-schema-org + schema updated + definePerson/defineWebSite global + sitemap.sources
- [ ] 07-02-PLAN.md — resolveOgImage helper + og-blog-default.jpg + [slug].vue useSeoMeta enrichi + defineArticle/defineBreadcrumb
- [ ] 07-03-PLAN.md — index.vue useSeoMeta enrichi + defineWebPage(CollectionPage) + defineBreadcrumb
- [x] 07-04-PLAN.md — server/api/__sitemap__/urls.ts (bilingue, draft:false, alternates hreflang, lastmod=updated||date)

### Phase 8: Content & Cocon Semantique
**Goal**: Le blog est lance avec au moins 2 articles Hytale de qualite, et un visiteur qui arrive sur /hytale decouvre les articles recents — le cocon semantique entre blog et page hytale est etabli
**Depends on**: Phase 7
**Requirements**: BLOG-07, SEO-14
**Success Criteria** (what must be TRUE):
  1. `/blog` liste au moins 2 articles avec le tag "hytale", avec titres, descriptions et dates reels
  2. Chaque article blog contient au moins un lien interne vers `/hytale` dans le corps du texte
  3. La page `/hytale` affiche une section "Articles recents" avec liens vers les 2 articles seed
  4. Les articles existent en FR et EN — `curl localhost:3000/en/blog` les liste en anglais
**Plans:** 3 plans
Plans:
- [ ] 08-01-PLAN.md — Scaffold HytaleRecentArticles.vue (queryCollection bilingue + filtre tag hytale + limit 2) + injection hytale.vue + i18n hytale.recentArticles.*
- [ ] 08-02-PLAN.md — Article seed tutorial how-to-build-your-first-hytale-plugin (FR+EN, draft:false, bloc Kotlin, liens inline /hytale)
- [ ] 08-03-PLAN.md — Article seed autorité hytale-plugin-development-2026 (FR+EN, draft:false, bloc Kotlin coroutines, liens inline /hytale)
**UI hint**: yes

---

## Progress (M1.1)

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 5. @nuxt/content Setup & Renderer | 2/2 | Complete | 2026-04-22 |
| 6. Blog Pages | 4/4 | Complete | 2026-04-22 |
| 7. SEO Blog | 4/4 | Complete | 2026-04-22 |
| 8. Content & Cocon Semantique | 0/? | Not started | - |
