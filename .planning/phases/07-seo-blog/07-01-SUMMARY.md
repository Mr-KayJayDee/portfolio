---
phase: 07-seo-blog
plan: 01
subsystem: seo-infrastructure
tags: [seo, schema-org, sitemap, nuxt-content, foundation]
status: shipped
completed: 2026-04-22
requirements: [SEO-11, SEO-12]
dependency_graph:
  requires:
    - "@nuxtjs/sitemap (déjà présent)"
    - "@nuxt/content blog_fr/blog_en (Phase 5)"
    - "app/data/site.ts siteConfig"
  provides:
    - "Module nuxt-schema-org chargé globalement (useSchemaOrg / definePerson / defineWebSite / defineArticle / defineBreadcrumb auto-imports)"
    - "Identité Person Killian globale (@id #killian) injectée via JSON-LD SSR sur chaque page"
    - "WebSite schema.org global (FR+EN inLanguage)"
    - "Schema Zod blog `updated: z.string().optional()` queryable (dateModified upstream)"
    - "nuxt.config.ts > sitemap.sources branché sur /api/__sitemap__/urls (endpoint créé Plan 07-04)"
    - "app/utils/seo-person.ts : KILLIAN_PERSON_ID + killianPerson (single source of truth)"
  affects:
    - "Wave 2 Plans 07-02/07-03/07-04 (consomment l'identité Person + module schema-org)"
tech_stack:
  added:
    - "nuxt-schema-org ^6.0.4 (devDependency)"
  patterns:
    - "Auto-imports nuxt-schema-org : useSchemaOrg, definePerson, defineWebSite (pas d'import explicite requis dans .vue)"
    - "Person helper module-level (pattern app/utils/countWords.ts) : JSDoc top + named const typé `as const`"
key_files:
  created:
    - "app/utils/seo-person.ts (20 lignes, KILLIAN_PERSON_ID + killianPerson)"
  modified:
    - "package.json + pnpm-lock.yaml (devDep nuxt-schema-org ^6.0.4)"
    - "content.config.ts (blogSchema + updated: z.string().optional())"
    - "nuxt.config.ts (modules[] + 'nuxt-schema-org', new sitemap.sources)"
    - "app/app.vue (useSchemaOrg global append, pas de remplacement du useLocaleHead/useHead existant)"
decisions:
  - "D-01, D-04: cherry-pick nuxt-schema-org (pas le bundle @nuxtjs/seo umbrella qui doublonne avec sitemap déjà présent)"
  - "D-12: Person Killian déclarée en global (app.vue) — les defineArticle des plans suivants référenceront @id=#killian au lieu de réinliner author/publisher"
  - "D-13, D-14: `updated` optional dans schema Zod (si absent → dateModified = date dans les plans downstream)"
  - "Sitemap endpoint déclaré mais pas créé ici (Plan 07-04 owner)"
metrics:
  duration_minutes: 8
  tasks_completed: 2
  commits: 2
  files_created: 1
  files_modified: 4
---

# Phase 7 Plan 1 : Foundation SEO Blog — Summary

**One-liner** : Module `nuxt-schema-org` installé + identité Person/WebSite Killian globale + schema Zod blog étendu avec `updated` + `sitemap.sources` branché sur endpoint Nitro futur.

## Ce qui a été fait

**Task 1 — `chore(07-01)`** (commit `17420af`)
- `pnpm add -D nuxt-schema-org@^6.0.4`
- `content.config.ts` : ajout `updated: z.string().optional()` entre `date` et `tags` dans `blogSchema` (partagé `blog_fr` + `blog_en`)
- Caches `node_modules/.cache/content` + `.nuxt` vidés (Pitfall 8 research — forcer la re-ingestion)
- `pnpm typecheck` exit 0

**Task 2 — `feat(07-01)`** (commit `654842b`)
- `nuxt.config.ts` : `'nuxt-schema-org'` ajouté dans `modules[]` juste après `'@nuxtjs/sitemap'`; nouveau bloc `sitemap: { sources: ['/api/__sitemap__/urls'] }` au même niveau d'indentation que `site`/`i18n`
- `app/utils/seo-person.ts` créé : exporte `KILLIAN_PERSON_ID = '#killian'` et `killianPerson` (dérivé de `siteConfig` — `sameAs` filtre l'entrée `Email`)
- `app/app.vue` : append (pas de remplacement) d'un bloc `useSchemaOrg([definePerson(killianPerson), defineWebSite({ name, inLanguage: ['fr-FR','en-US'] })])` après le `useHead` existant
- `pnpm typecheck` exit 0
- Validation SSR curl : `curl http://localhost:3001/fr` renvoie bien un `<script type="application/ld+json" data-nuxt-schema-org="true">` contenant `@type: Person` (id se terminant par `#killian`) + `@type: WebSite` + `@type: WebPage` auto-attaché par le module

## Deviations from Plan

**None critical.** Deux points de friction mineurs rencontrés & résolus sans changer le plan :

1. **Port** : `pnpm dev --port 3000` a basculé automatiquement sur 3001 (port 3000 déjà occupé). Non-bloquant — validation faite sur 3001.
2. **@id Person** : le module `nuxt-schema-org` préfixe l'`@id` fourni (`#killian`) par la route canonique du site (résultat final : `https://killiandalcin.fr/#/schema/person/#killian`). Comportement attendu du module et cohérent avec la spec schema.org — le fragment `#killian` reste identifiable en suffixe, ce qui suffit aux références inter-entités (author/publisher) dans les plans Wave 2 via la forme `{ '@id': '#killian' }` (le module résout le préfixe tout seul).

## Acceptance Criteria — tous passés

- [x] `grep "'nuxt-schema-org'" nuxt.config.ts` — match ligne 12
- [x] `grep "sources.*__sitemap__/urls" nuxt.config.ts` — match bloc sitemap
- [x] `grep "updated: z.string().optional()" content.config.ts` — match ligne 7
- [x] `curl http://localhost:3001/fr` émet JSON-LD global Person (@id suffixe `#killian`) + WebSite + WebPage, en SSR pur (aucun JS client requis — détection `<script type="application/ld+json">` directement dans le HTML renvoyé)
- [x] `pnpm typecheck` exit 0 (sortie clean, seulement banners Nuxt Icon)

## Known Stubs

Aucun. Le seul placeholder explicitement déclaré (`sitemap.sources: ['/api/__sitemap__/urls']`) référence un endpoint Nitro qui sera implémenté par le Plan 07-04 (ownership clair, documenté dans dependency_graph).

## Threat Flags

Aucun nouveau surface de menace introduit. Le module `nuxt-schema-org ^6.0.4` figé en devDependency + `pnpm-lock.yaml` commité mitige T-07-01 (Tampering supply chain). T-07-02 (IDisclo Person public) accepté — URLs du `sameAs` déjà publiques, l'email est explicitement filtré du `sameAs` dans `seo-person.ts` (`filter((s) => s.name !== 'Email')`).

## Self-Check: PASSED

- `app/utils/seo-person.ts` — FOUND
- Commit `17420af` (chore Task 1) — FOUND in git log
- Commit `654842b` (feat Task 2) — FOUND in git log
- Validation SSR JSON-LD — confirmée via curl (Person @id=#killian + WebSite + WebPage émis avant hydratation)
