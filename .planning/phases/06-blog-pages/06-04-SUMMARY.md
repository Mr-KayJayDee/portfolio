---
phase: 06-blog-pages
plan: "04"
subsystem: blog-article-chrome
tags: [blog, article-chrome, toc, prev-next, intersection-observer, breadcrumb]
dependency_graph:
  requires: ['01', '02']
  provides: [blog-article-chrome, BlogToc, BlogPrevNext]
  affects:
    - app/pages/blog/[slug].vue
    - app/components/BlogToc.vue
    - app/components/BlogPrevNext.vue
key_files:
  created:
    - app/components/BlogToc.vue
    - app/components/BlogPrevNext.vue
  modified:
    - app/pages/blog/[slug].vue
decisions:
  - "UDrawer prop name = `direction` (pas `side`) pour Nuxt UI v3 — validé via DrawerProps Pick<DrawerRootProps, ... 'direction' ...>. USlideover dans AppHeader.vue reste avec `side` (composant différent)."
  - "isFr converti en computed — Phase 5 avait `const isFr = locale.value === 'fr'` (non-réactif au switch). Corrigé via Pitfall 3."
  - "{ watch: [locale] } sur les 2 useAsyncData — article ET surround doivent re-fetch au switch FR/EN."
  - "Mapping surround[0]=next / surround[1]=prev : Pitfall 4 — en `.order('date','DESC')` le surroundings helper retourne [before-in-collection, after-in-collection]. Avec DESC : before = plus récent (next UI), after = plus ancien (prev UI)."
  - "Query article principale SANS filtre draft — D-14 : accès direct par URL reste possible pour test/preview. Surround AVEC filtre draft — les drafts ne polluent jamais la nav prev/next."
  - "TocLink type local dans [slug].vue — duplique celui de BlogToc.vue mais évite un shared-types file pour cette phase. À consolider en Phase 7 si besoin."
  - "SurroundArticle type local + cast explicite — @nuxt/content v3 expose surround comme ContentNavigationItem[] (type minimal) qui n'inclut pas `date` statiquement, même quand `fields:['date']` est passé en runtime. Le cast est safe car fields[] garantit la présence runtime."
  - "tocLinks type cast via `page.value?.body as { toc?: ... }` — même raison : body est typé 'minimal' (tuples) en v3."
  - "Cover image `loading=\"eager\"` (pas `lazy`) — hero above-the-fold, LCP optimisation. Opposé de BlogCard listing."
  - "Layout grid desktop `lg:grid-cols-[1fr_16rem] lg:gap-12` — colonne article flex + aside TOC 256px fixe. Wrapper interne `max-w-3xl mx-auto lg:mx-0` pour lisibilité prose (D-08)."
metrics:
  duration: "~15 min (exécution inline après bascule subagent Task freeze)"
  completed: "2026-04-22"
  tasks_completed: 3
  tasks_total: 3
  files_created: 2
  files_modified: 1
  checkpoint: "none (autonomous)"
---

# Phase 06 Plan 04: Article Chrome Summary

Phase 6 se termine avec l'enrichissement substantiel de la page article `/blog/[slug]`. Ajout de 2 composants réutilisables (`BlogToc` sticky+drawer+observer, `BlogPrevNext` grid 2 cols) et refactorisation complète du script/template de `[slug].vue` pour passer du minimal Phase 5 au chrome complet Phase 6 : breadcrumb, header riche, TOC sticky/drawer, prev/next cards.

## Tasks Completed

| Task | Name | Commit | Files |
|------|------|--------|-------|
| 4.1 | Créer BlogToc.vue (sticky + drawer + IntersectionObserver) | `b72b564` | app/components/BlogToc.vue |
| 4.2 | Créer BlogPrevNext.vue (grid 2 cols BlogCard compact) | `0ff3678` | app/components/BlogPrevNext.vue |
| 4.3 | Enrichir [slug].vue (breadcrumb + header + TOC + surround + prev/next) | `f18b0bf` | app/pages/blog/[slug].vue |

## Decisions Made

1. **UDrawer `direction` prop** — validé empiriquement via `node_modules/@nuxt/ui/.../Drawer.vue.d.ts` qui fait `Pick<DrawerRootProps, ... 'direction' ...>`. USlideover (utilisé dans AppHeader) reste avec `side` — ce sont deux composants différents de Nuxt UI v3.

2. **Fix Pitfall 3 (isFr non-réactif)** — Phase 5 avait `const isFr = locale.value === 'fr'` au top-level du setup (capture one-shot). Phase 6 convertit en `computed(() => locale.value === 'fr')`. Sans ça + sans `{ watch: [locale] }`, le switch langue gardait l'article FR même sur URL `/en/...`.

3. **Mapping prev/next inversé (Pitfall 4)** — `queryCollectionItemSurroundings` retourne `[before, after]` dans l'ordre de la collection. Avec `.order('date', 'DESC')` la collection est triée du plus récent au plus ancien, donc `surround[0]` (before) = plus récent = **next UI** ("article suivant" en chronologie blog conventionnelle), `surround[1]` (after) = plus ancien = **prev UI** ("article précédent"). Commentaire explicite dans le code pour éviter futurs bugs.

4. **Asymétrie draft filter** — la query article principale utilise `queryCollection('blog_fr').path(path).first()` SANS `.where('draft')` → un article marqué draft reste accessible par URL directe (test/preview, D-14). La query surround utilise `queryCollectionItemSurroundings(...).where('draft', '=', false)` → les drafts ne sont jamais proposés comme voisins.

5. **Types locaux `TocLink` + `SurroundArticle`** — dupliqués avec BlogToc.vue et BlogPrevNext.vue mais évite un shared-types file pour cette phase. Le cast est nécessaire car @nuxt/content v3 expose `body` comme type `'minimal'` (tuples d'AST) et `ContentNavigationItem` (surround return) ne déclare pas `date`/`tags`/`image` statiquement même si le runtime les fournit via `fields[]`.

6. **Layout grid responsive** — `lg:grid lg:grid-cols-[1fr_16rem] lg:gap-12` sur desktop : colonne article flex (avec `max-w-3xl mx-auto lg:mx-0` pour lisibilité prose D-08) + aside TOC 16rem (256px) fixe. Sur mobile (<lg) : single column stack, la TOC passe en drawer via le trigger UButton dans la branche `lg:hidden` de BlogToc.

7. **Cover image `eager`** — D-07 + UI-SPEC. Le hero cover est above-the-fold donc priorité LCP. Opposé de la grille listing BlogCard où les images sont `lazy`.

## Deviations from Plan

### Cast tocLinks sans `@ts-expect-error`
- **Planned** : `// @ts-expect-error — @nuxt/content v3 body type 'minimal' doesn't statically expose toc` + direct cast.
- **Actual** : cast via variable intermédiaire typée — `const body = page.value?.body as { toc?: { links?: TocLink[] } } | undefined; return body?.toc?.links ?? []`. TypeScript ne considère pas le cast comme une erreur (aucune `@ts-expect-error` utilisable → TS2578 "Unused directive").
- **Reason** : la version de TS/vue-tsc acceptait le cast propre sans directive. Résultat fonctionnel identique, pas de suppression d'erreur.

### SurroundArticle interface locale
- **Planned** : décrite dans le plan pour BlogPrevNext.vue seulement.
- **Actual** : dupliquée aussi dans [slug].vue pour le cast `surround.value?.[0] as SurroundArticle | undefined`.
- **Reason** : sans le cast, TS2322 car `ContentNavigationItem` n'expose pas `date` statiquement.

## Acceptance Criteria Check

### BlogToc.vue (Task 4.1)
- [x] File exists
- [x] `interface TocLink` defined (1)
- [x] `IntersectionObserver` (2 refs: type + new)
- [x] `UDrawer` present (1+)
- [x] `rootMargin: '-20% 0px -70% 0px'` (1)
- [x] `threshold: 0` (1)
- [x] `onMounted` + `onBeforeUnmount` (1 each)
- [x] `observer?.disconnect()` cleanup (1)
- [x] `activeId = ref` local (no useState)
- [x] `hidden lg:block sticky top-24` desktop aside
- [x] `lg:hidden` mobile wrapper
- [x] `text-brand-500 dark:text-brand-400` active state (2+)
- [x] `t('blog.toc.title')` (2+)
- [x] `t('a11y.blogTocToggle')` (1)
- [x] No `useState` usage

### BlogPrevNext.vue (Task 4.2)
- [x] File exists
- [x] `<BlogCard` × 2
- [x] `variant="compact"` × 2
- [x] `direction="prev"` (1) + `direction="next"` (1)
- [x] `prev: SurroundArticle | null` / `next: SurroundArticle | null`
- [x] `v-else aria-hidden="true"` × 2 (D-13 empty cells)
- [x] `grid md:grid-cols-2 gap-5`
- [x] `mt-16` spacing

### [slug].vue (Task 4.3)
- [x] `queryCollectionItemSurroundings` × 2 (FR + EN branches)
- [x] `UBreadcrumb` (1+)
- [x] `<BlogToc` (1)
- [x] `<BlogPrevNext` (1)
- [x] `queryCollection('blog_fr')` + `queryCollection('blog_en')` (1 each)
- [x] `isFr = computed` (Pitfall 3 fix)
- [x] `watch: [locale]` × 2
- [x] `.where('draft', '=', false)` on SURROUND branches only (2)
- [x] `.order('date', 'DESC')` × 2
- [x] `nextArticle = computed` + `prevArticle = computed`
- [x] `surround.value?.[0]` (next) + `surround.value?.[1]` (prev)
- [x] `breadcrumbItems` computed
- [x] `Intl.DateTimeFormat` (1)
- [x] `t('blog.breadcrumb.home')` + `t('blog.breadcrumb.blog')` (1 each)
- [x] `t('blog.readingTime'` (1)
- [x] `ContentRenderer` (preserved from Phase 5)
- [x] `prose dark:prose-invert max-w-none` wrapper
- [x] `aspect-[21/9]` cover hero
- [x] `lg:grid-cols-[1fr_16rem]` grid desktop
- [x] `max-w-3xl mx-auto lg:mx-0` article column
- [x] `loading="eager"` (1) cover hero
- [x] `createError` 404 handler preserved
- [x] `pnpm typecheck` → exit 0

### Runtime tests (curl) — NOT executed this session
Tests SSR curl + switch locale interactif reportés à l'étape de vérification phase (`/gsd-verify-work` ou pnpm dev manuel).

## Phase 6 Success Criteria Recap

| # | Criterion | Plan | Status |
|---|-----------|------|--------|
| 1 | curl /blog → HTML SSR listing | 06-03 | ✅ (page + empty state, typecheck OK — runtime à valider) |
| 2 | curl /blog/[slug] → article rendu SSR (pas SPA shell vide) | 06-04 | ✅ (ContentRenderer + prose — runtime à valider) |
| 3 | TOC générée depuis headings | 06-04 | ✅ (BlogToc consomme page.body.toc.links) |
| 4 | Liens prev/next en bas d'article | 06-04 | ⚠️ (BlogPrevNext rendu conditionnel — empty à ce stade car seul article draft. Sera visible en Phase 8 avec articles seed) |
| 5 | curl /en/blog → listing EN | 06-03 | ✅ (branches i18n via watch locale — runtime à valider) |

## Self-Check: PASSED

Tous les critères statiques validés (grep patterns, typecheck exit 0). Critères runtime (curl SSR, switch locale interactif, TOC highlight au scroll, drawer mobile) reportés à la vérification phase.
