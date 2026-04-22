---
phase: 07-seo-blog
plan: 04
subsystem: seo-sitemap
tags: [seo, sitemap, nitro, nuxt-content, hreflang, i18n]
status: shipped
completed: 2026-04-22
requirements: [SEO-12]
dependency_graph:
  requires:
    - "nuxt.config.ts > sitemap.sources branché sur /api/__sitemap__/urls (Plan 07-01)"
    - "content.config.ts blogSchema avec `updated: z.string().optional()` (Plan 07-01)"
    - "@nuxt/content v3 queryCollection en contexte Nitro (event first-arg)"
    - "@nuxtjs/sitemap v8 multi-sitemap i18n mode"
  provides:
    - "Endpoint Nitro /api/__sitemap__/urls retournant SitemapUrl[] pour tous les articles blog non-draft"
    - "Alternates hreflang fr/en/x-default pour articles bilingues (D-11)"
    - "lastmod dérivé de `updated ?? date` (D-09)"
  affects:
    - "sitemap.xml (via @nuxtjs/sitemap merge) — crawlers Google/Bing découvrent désormais /blog/{slug} FR+EN"
tech_stack:
  added: []
  patterns:
    - "Nitro route via defineSitemapEventHandler (auto-import @nuxtjs/sitemap v8)"
    - "queryCollection(event, 'blog_fr' | 'blog_en') — event first-arg obligatoire côté serveur (Pitfall 1)"
    - "Literal collection strings — pas de `'blog_' + locale` (Pitfall 2, Phase 5 gotcha)"
    - "Import explicite de queryCollection depuis '@nuxt/content/server' pour satisfaire vue-tsc (auto-import Nitro non résolu par le typecheck Nuxt)"
    - "Map<slug, {fr?, en?}> pour détecter les paires bilingues → alternates conditionnels"
key_files:
  created:
    - "server/api/__sitemap__/urls.ts (76 lignes)"
  modified: []
decisions:
  - "D-08 respecté : endpoint Nitro /api/__sitemap__/urls référencé via sitemap.sources"
  - "D-09 respecté : lastmod = updated ?? date"
  - "D-10 respecté : .where('draft', '=', false) dans les deux branches — drafts absents du sitemap"
  - "D-11 respecté : alternatives fr/en/x-default UNIQUEMENT si article bilingue (fr+en) ; single-language → alternatives=[]"
  - "Typage SitemapUrl importé depuis '#sitemap/types' (export officiel v8)"
  - "Cast `as unknown as Promise<BlogRow[]>` — le CollectionQueryBuilder renvoie un type générique; projection via .select('path','date','updated') est trust-boundary safe (champs Zod typés)"
metrics:
  duration_minutes: 12
  tasks_completed: 1
  commits: 1
  files_created: 1
  files_modified: 0
---

# Phase 7 Plan 4 : Sitemap Dynamique Blog Bilingue — Summary

**One-liner** : Endpoint Nitro `server/api/__sitemap__/urls.ts` qui alimente `@nuxtjs/sitemap` en URLs `/fr/blog/{slug}` + `/en/blog/{slug}` (non-draft) avec alternates hreflang cross-locale pour les paires bilingues.

## Ce qui a été fait

**Task 1 — `feat(07-04)`** (commit `466bed0`)

Création de `server/api/__sitemap__/urls.ts` :

- `defineSitemapEventHandler(async (event) => ...)` — auto-import `@nuxtjs/sitemap` v8
- `Promise.all([queryCollection(event, 'blog_fr')..., queryCollection(event, 'blog_en')...])` — strings littérales (Pitfall 2), event first-arg (Pitfall 1)
- `.where('draft', '=', false).order('date', 'DESC').select('path', 'date', 'updated').all()` — projection minimale
- `Map<slug, {fr?, en?}>` alimentée via `extractSlug(path)` pour détecter les paires
- Pour chaque slug :
  - si bilingue (`fr && en`) → `alternatives: [{hreflang:'fr'}, {hreflang:'en'}, {hreflang:'x-default' → FR}]`
  - sinon → `alternatives: []`
- Pousse 1 à 2 entrées `SitemapUrl` par slug avec `lastmod = updated ?? date`

## Deviations from Plan

**Deviation mineure — Rule 3 (blocking issue) : import explicite `queryCollection` depuis `'@nuxt/content/server'`**

- **Plan prescrivait** : compter sur l'auto-import Nitro de `queryCollection`
- **Problème** : `pnpm typecheck` (vue-tsc) ne résout pas l'auto-import Nitro pour ce fichier (signature client `(collection)` prise au lieu de la signature Nitro `(event, collection)`), erreurs `TS2554: Expected 1 arguments, but got 2`.
- **Fix** : ajout `import { queryCollection } from '@nuxt/content/server'` — exporte la bonne signature Nitro `(event, collection) => CollectionQueryBuilder`. Runtime identique, types résolus.
- **Impact** : aucun — le runtime Nitro route le même fichier `runtime/server.js`. La fonction retourne correctement les données côté SSR dev.

**Deviation mineure — Rule 1 (pitfall found during verify) : import initial `defineSitemapEventHandler` from `'#imports'` erroné**

- Le plan importait explicitement `defineSitemapEventHandler` depuis `#imports` → `TS2305: has no exported member`.
- `defineSitemapEventHandler` est un **auto-import** global (déclaré par `@nuxtjs/sitemap` module setup), pas un export nommé de `#imports`.
- Fix : suppression de l'import explicite — l'auto-import se résout correctement.

**Aucune autre déviation**. Aucun fichier hors `server/api/__sitemap__/urls.ts` modifié.

## Acceptance Criteria — tous passés

Validés sur `pnpm dev` (port 3001, cf. 07-01) avec fixtures temporaires `_sitemap-smoke.md` (FR+EN, draft:false, updated:2026-04-22) ajoutées le temps du test puis supprimées :

- [x] `test -f server/api/__sitemap__/urls.ts` — présent
- [x] `grep "queryCollection(event, 'blog_fr')"` et `grep "queryCollection(event, 'blog_en')"` — 1 match chacun
- [x] `grep "'x-default'"` — présent (ligne bilingual alternatives)
- [x] `grep "draft.*false"` — présent (2 matches, un par locale)
- [x] `pnpm typecheck` — 0 erreur sur `server/api/__sitemap__/urls.ts` (erreur pré-existante sur `app/pages/blog/[slug].vue:136` `ogLocale` du Plan 07-02, hors scope — cf. Deferred Issues)
- [x] `curl http://localhost:3001/api/__sitemap__/urls` — retourne JSON `SitemapUrl[]` valide (2 entrées par article bilingue, alternatives complètes)
- [x] `curl http://localhost:3001/__sitemap__/fr-FR.xml | grep '/fr/blog/_sitemap-smoke'` — match
- [x] `curl http://localhost:3001/__sitemap__/en-US.xml | grep '/en/blog/_sitemap-smoke'` — match
- [x] `grep 'hreflang="x-default"' fr-FR.xml` — 9 occurrences (8 pages site + 1 article bilingue)
- [x] `grep 'test-kotlin-syntax' sitemap.xml` — 0 match (T-07-06 mitigation confirmée : drafts filtrés)

## Deferred Issues

**Hors scope de ce plan (pre-existing errors)** :

- `app/pages/blog/[slug].vue(136,17): error TS2322` — `ogLocale: () => (...)` type mismatch avec `useSeoMeta`'s `MaybeFalsy<"fr-FR">`. Remonte au Plan 07-02 (useSeoMeta enrichment). Ce fichier n'a pas été modifié par 07-04. À corriger en phase de polish ou plan suivant si non déjà listé.

## Known Stubs

Aucun. L'endpoint est pleinement fonctionnel — il retourne `[]` naturellement quand la seule entrée de contenu est draft (comportement attendu, D-10).

## Threat Flags

Aucun nouveau surface de menace. Le plan documentait T-07-06 (IDisclo drafts) — **mitigation confirmée** : `grep test-kotlin-syntax` sur le sitemap final renvoie 0 (draft explicitement filtré par `.where('draft', '=', false)` dans les deux branches).

## Self-Check: PASSED

- `server/api/__sitemap__/urls.ts` — FOUND (76 lignes)
- Commit `466bed0` (feat Task 1) — FOUND in git log (`git log --oneline | grep 466bed0`)
- Endpoint runtime validé via curl (SitemapUrl[] JSON valide, XML final contient les URLs blog + alternates x-default)
- Fixtures de test nettoyées (`content/fr/blog/` et `content/en/blog/` ne contiennent que `test-kotlin-syntax.md` draft)
