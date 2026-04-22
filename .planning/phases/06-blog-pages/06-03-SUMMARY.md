---
phase: 06-blog-pages
plan: "03"
subsystem: blog-listing-page
tags: [blog, listing, page, ssr, i18n]
dependency_graph:
  requires: ['01', '02']
  provides: [blog-listing-page]
  affects:
    - app/pages/blog/index.vue
key_files:
  created:
    - app/pages/blog/index.vue
  modified: []
decisions:
  - "queryCollection literal branches (D-03 Phase 5 gotcha): jamais queryCollection(variable) — branches if/else isFr obligatoires pour le Vite extractor"
  - "{ watch: [locale] } dans useAsyncData: sans ça, switch FR/EN garde l'ancienne langue (Pitfall 3 RESEARCH)"
  - "key useAsyncData = `blog-list-${locale.value}`: cache invalidé proprement au switch"
  - "Empty state conscious à ce stade: tous les articles ont draft:true (Wave 1 T1.5) — comportement voulu, blog ship-ready avec CTA contact"
  - "SEO minimal (title/description/ogType) — JSON-LD Article + og:image par page sera Phase 7"
  - "Pas de routeRules /blog/** ajouté: la redirection sans préfixe reste gérée par detectBrowserLanguage (Phase 5)"
metrics:
  duration: "~5 min (exécution inline après rollback subagent Task freeze)"
  completed: "2026-04-22"
  tasks_completed: 1
  tasks_total: 1
  files_created: 1
  files_modified: 0
  checkpoint: "none (autonomous)"
---

# Phase 06 Plan 03: Blog Listing Page Summary

Création de la page listing `/blog` en SSR bilingue — hero avec stats, grille responsive 1/2/3 cols de BlogCard (variant default), empty state avec CTA vers `/contact`. Query bilingue @nuxt/content v3 avec branches littérales (Phase 5 gotcha respecté), filtre `draft`, tri par date descendant.

## Tasks Completed

| Task | Name | Commit | Files |
|------|------|--------|-------|
| 3.1 | Créer `app/pages/blog/index.vue` (hero + query bilingue + grille + empty state) | `eca09e0` | app/pages/blog/index.vue |

## Decisions Made

1. **queryCollection littéral** — branches `if isFr.value ? queryCollection('blog_fr') : queryCollection('blog_en')`. Le Vite extractor de @nuxt/content analyse seulement les littéraux — toute variable casse l'extraction et retourne `{}` silencieusement (Phase 5 gotcha Pitfall 1 RESEARCH).

2. **`{ watch: [locale] }` sur useAsyncData** — sans cette option, le switch FR↔EN ne re-fetch pas et affiche l'ancienne langue. Indispensable pour le comportement réactif de la locale (Pitfall 3 RESEARCH).

3. **Stats : articles + tags uniques + langues fixes (2)** — computed sur `articles.value` côté client après fetch. `Set<string>` pour dédupliquer les tags. La valeur `2` pour les langues est fixée (FR + EN) — à dériver si une 3ème langue apparaît (note UI-SPEC checker).

4. **Empty state intentionnel** — à la sortie de Phase 6, tous les articles ont `draft: true` (article test marqué Wave 1). Le listing affiche donc l'empty state "Bientôt des articles Hytale" avec CTA contact — comportement voulu et professionnel, le blog est prêt pour Phase 8 (articles seed réels).

5. **useSeoMeta minimal** — seulement title + description + ogType. Phase 7 ajoutera JSON-LD Article, og:image par page, BreadcrumbList, canonical avec variants i18n.

## Deviations from Plan

Aucune — plan exécuté exactement selon spec. Le fichier avait déjà été créé par un subagent précédent (interrompu avant commit) avec exactement le même contenu que le plan. Vérification intégrale faite ; commit et SUMMARY ajoutés.

## Acceptance Criteria Check

- [x] `test -f app/pages/blog/index.vue` → file exists
- [x] `grep -c "queryCollection('blog_fr')" app/pages/blog/index.vue` = 1
- [x] `grep -c "queryCollection('blog_en')" app/pages/blog/index.vue` = 1
- [x] `grep "queryCollection(locale" ...` → nothing (literal-only)
- [x] `grep -c "\.where('draft'" app/pages/blog/index.vue` = 2 (une par branche)
- [x] `grep -c "\.order('date', 'DESC')" app/pages/blog/index.vue` = 2
- [x] `grep -c "watch: \[locale\]" app/pages/blog/index.vue` = 1
- [x] `grep "<BlogCard" app/pages/blog/index.vue` matches
- [x] `grep "variant=\"default\"" app/pages/blog/index.vue` matches
- [x] `grep "localePath('/contact')" app/pages/blog/index.vue` matches
- [x] `grep "// blog" app/pages/blog/index.vue` matches
- [x] `grep "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" app/pages/blog/index.vue` matches
- [x] `pnpm typecheck` → exit 0
- [ ] `pnpm build` → non exécuté à ce stade (déléguée à l'étape de vérification phase)
- [ ] Tests runtime curl /fr/blog + /en/blog → non exécutés (pnpm dev pas lancé ici, à valider par gsd-verifier ou via /gsd-verify-work)

## Self-Check: PASSED

Tous les critères statiques (fichiers, grep, typecheck) passent. Les critères runtime (curl, switch locale) sont reportés à l'étape de vérification phase (post Wave 3 complète).
