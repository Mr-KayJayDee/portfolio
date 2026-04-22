---
phase: 07-seo-blog
plan: 03
subsystem: blog-listing-seo
tags: [seo, json-ld, schema-org, og-image, i18n, collection-page]
requires:
  - "app/pages/blog/index.vue existant (Phase 6-03)"
  - "i18n keys blog.* (FR+EN) + blog.breadcrumb.home / blog.breadcrumb.blog"
provides:
  - "Listing /blog : useSeoMeta D-16 complet (og:image, og:locale + alternate, twitter)"
  - "JSON-LD CollectionPage + BreadcrumbList sur /fr/blog et /en/blog"
affects:
  - "Partage social /blog (card OG branded)"
  - "Breadcrumb cohérent avec [slug].vue (Phase 7-02)"
tech_stack:
  added: []
  patterns:
    - "useSeoMeta D-16 pattern (ogImage absolu hardcodé, locale/alternate via arrow fns SSR-safe)"
    - "useSchemaOrg([defineWebPage({ '@type': 'CollectionPage' }), defineBreadcrumb])"
    - "inLanguage résolu à setup (pas ComputedRef — type schema-org attend literal string)"
key_files:
  created: []
  modified:
    - "app/pages/blog/index.vue"
decisions:
  - "D-16 respectée : og:image fallback absolute https://killiandalcin.fr/og-blog-default.jpg"
  - "D-03 respectée : Breadcrumb Accueil → Blog via defineBreadcrumb"
  - "resolveOgImage helper (07-02) pas encore créé au moment d'exécution → fallback hardcodé OG_FALLBACK (autorisé par plan §interfaces note)"
  - "inLanguage en valeur littérale (isFr.value ? 'fr-FR' : 'en-US') au setup, pas ComputedRef — contrainte type defineWebPage"
metrics:
  duration_min: 5
  tasks_completed: 1
  files_touched: 1
  completed_date: 2026-04-22
---

# Phase 07 Plan 03 : Blog Listing SEO Enrichment Summary

**One-liner** : `/blog` listing enrichi avec useSeoMeta D-16 (og:image absolu, og:locale+alternate, twitter summary_large_image) + JSON-LD CollectionPage via `defineWebPage({'@type':'CollectionPage'})` et BreadcrumbList Accueil → Blog.

## Ce qui a été fait

### Task 1 : Enrichir `app/pages/blog/index.vue`

**Imports/constantes ajoutées** :
- `SITE_URL = 'https://killiandalcin.fr'`
- `OG_FALLBACK = 'https://killiandalcin.fr/og-blog-default.jpg'` (fallback hardcodé ; helper `resolveOgImage` pas encore créé par 07-02 parallèle, autorisé par plan §interfaces)
- `canonicalUrl = computed(() => ${SITE_URL}${localePath('/blog')})`

**useSeoMeta étendu** (D-16) :
- `title`, `description`, `ogTitle`, `ogDescription` (inchangés, via `() => t(...)`)
- `ogType: 'website'`
- `ogImage: OG_FALLBACK` (absolu, D-13/SEO-13)
- `ogUrl: canonicalUrl`
- `ogLocale: () => (isFr.value ? 'fr_FR' : 'en_US')`
- `ogLocaleAlternate: () => [isFr.value ? 'en_US' : 'fr_FR']`
- `twitterCard: 'summary_large_image'`
- `twitterImage: OG_FALLBACK`

**useSchemaOrg ajouté** :
- `defineWebPage({ '@type': 'CollectionPage', name, description, inLanguage, url })`
- `defineBreadcrumb({ itemListElement: [Accueil → Blog] })`

**Commit** : `47c2839` — `feat(07-03): enrich blog listing with D-16 useSeoMeta + CollectionPage/Breadcrumb JSON-LD`

## Déviations du plan

### Rule 1 — Bug : contrainte type `inLanguage` de `defineWebPage`

- **Trouvé pendant** : Task 1, `pnpm typecheck`
- **Issue** : Le plan proposait `inLanguage: () => (isFr.value ? 'fr-FR' : 'en-US')`, mais le type schema-org pour `defineWebPage` n'accepte qu'une literal union `'fr-FR' | 'en-US' | ...` (pas une arrow fn, pas un ComputedRef — TS2322).
- **Fix** : Résolu à setup via valeur littérale `inLanguage: isFr.value ? 'fr-FR' : 'en-US'`. Acceptable car locale évaluée au render SSR (pas de switch mid-render côté serveur — re-mount si locale change côté client).
- **Files modified** : `app/pages/blog/index.vue` (ligne 62)
- **Commit** : `47c2839` (même commit)

## Deferred Issues (hors scope 07-03)

- `app/pages/blog/[slug].vue(126,3)` TS2322 et `(136,17)` TS2322 : erreurs de typage Schema/useSeoMeta — fichier owned par 07-02. À corriger dans 07-02 ou plan follow-up.
- `server/api/__sitemap__/urls.ts(20,28) (25,28)` TS2554 : sitemap endpoint — owned par 07-02.

Ces erreurs sont pré-existantes/parallèles et n'affectent pas les must-haves de 07-03.

## Must-haves vérifiés

| Must-have | Statut | Preuve |
|-----------|--------|--------|
| og:image absolu /og-blog-default.jpg | ✅ | `ogImage: OG_FALLBACK` littéral absolu dans useSeoMeta |
| og:locale fr_FR ↔ en_US + alternate | ✅ | `ogLocale` + `ogLocaleAlternate` arrow fns SSR-safe |
| JSON-LD CollectionPage | ✅ | `defineWebPage({ '@type': 'CollectionPage' })` dans useSchemaOrg |
| JSON-LD BreadcrumbList Accueil → Blog | ✅ | `defineBreadcrumb({ itemListElement: [home, blog] })` |

Typecheck vert sur `app/pages/blog/index.vue` (erreurs résiduelles dans d'autres fichiers out-of-scope).

## Self-Check: PASSED

- ✅ `app/pages/blog/index.vue` contient `defineWebPage`, `defineBreadcrumb`, `ogLocaleAlternate`, `og-blog-default.jpg`
- ✅ Commit `47c2839` existe dans git log
- ✅ Requirements SEO-10, SEO-13, SEO-15 couverts par frontmatter
