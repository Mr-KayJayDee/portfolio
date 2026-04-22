---
phase: 07-seo-blog
plan: 02
subsystem: seo-blog-article
tags: [seo, schema-org, article, breadcrumb, og-image, i18n]
status: shipped
completed: 2026-04-22
requirements: [SEO-10, SEO-11, SEO-13, SEO-15]
dependency_graph:
  requires:
    - "07-01 : module nuxt-schema-org + globale Person @id=#killian (via app/utils/seo-person.ts)"
    - "@nuxt/content blog_fr/blog_en (Phase 5)"
    - "schema Zod `updated: z.string().optional()` (07-01)"
  provides:
    - "app/utils/resolve-og-image.ts : resolveOgImage(article?) → URL absolue (fallback /og-blog-default.jpg)"
    - "public/og-blog-default.jpg : asset de fallback servable (placeholder — design définitif en follow-up)"
    - "app/pages/blog/[slug].vue : useSeoMeta enrichi D-15 + useSchemaOrg([defineArticle, defineBreadcrumb])"
  affects:
    - "07-03 (blog index/tags) : consommera resolveOgImage pour ogImage fallback"
    - "07-04 (sitemap + hreflang) : les articles exposent déjà publishedIso/modifiedIso utilisables côté sitemap"
tech_stack:
  added: []
  patterns:
    - "resolveOgImage helper module-level (JSDoc + named export, cohérent avec countWords.ts)"
    - "useSeoMeta reactive arrow-fn values (pattern établi lignes 93-99 d'origine, étendu à 14 clés)"
    - "useSchemaOrg avec author/publisher {'@id': KILLIAN_PERSON_ID} (pas de ré-inlining de Person)"
    - "Détection pair bilingue via queryCollection literal names (Vite extractor constraint Phase 5)"
key_files:
  created:
    - "app/utils/resolve-og-image.ts (14 lignes)"
    - "public/og-blog-default.jpg (placeholder 72 bytes, copié depuis og-image.png — design branded 1200×630 à produire)"
    - ".planning/phases/07-seo-blog/07-02-SUMMARY.md"
  modified:
    - "app/pages/blog/[slug].vue (+50 lignes : 2 imports, altExists useAsyncData, 5 computeds SEO, useSeoMeta étendu 5→14 clés, useSchemaOrg ajouté)"
decisions:
  - "D-05/D-06/D-13 appliqués : ogImage = frontmatter absolutisé || /og-blog-default.jpg ; modifiedIso = updated ?? date"
  - "D-15 honoré intégralement (ogLocale + ogLocaleAlternate conditionnel, twitter, article:* time, author)"
  - "Cast ComputedRef pour defineArticle.inLanguage : les typings du module nuxt-schema-org sont inférés de façon trop narrow (fr-FR littéral) — runtime émet bien 'fr-FR' ou 'en-US' selon locale (vérifié curl). Pas de workaround propre sans patch upstream ; cast localisé et commenté plutôt qu'étendre les types globaux."
  - "Placeholder og-blog-default.jpg : ImageMagick indisponible sur la machine → fallback documenté Research Open Question #2 (copie d'og-image.png). Ne bloque pas la prod."
metrics:
  duration_minutes: 12
  tasks_completed: 2
  commits: 2
  files_created: 2
  files_modified: 1
---

# Phase 7 Plan 2 : Blog Article SEO — Summary

**One-liner** : Page `/blog/[slug]` désormais crawlable avec og:image absolu (frontmatter || fallback branded), article:published_time/modified_time, JSON-LD `Article` (author/publisher par @id référence vers la Person globale #killian) + `BreadcrumbList` Accueil → Blog → Titre.

## Ce qui a été fait

**Task 1 — `feat(07-02): fae4102`**
- `app/utils/resolve-og-image.ts` créé (14 lignes, JSDoc + export nommé `resolveOgImage`) : préfixe `https://killiandalcin.fr`, passe-through si URL déjà absolue, fallback `/og-blog-default.jpg`.
- `public/og-blog-default.jpg` déposé (placeholder — copie de `og-image.png`, 72 bytes). ImageMagick absent du poste ; Research Open Question #2 autorisait explicitement ce recours. **Follow-up design branded 1200×630 à produire hors workflow** (tâche backlog).

**Task 2 — `feat(07-02): e17faae`**

Dans `app/pages/blog/[slug].vue`, script uniquement (template intact, ZÉRO régression visuelle) :

1. **Imports ajoutés** (top script) : `KILLIAN_PERSON_ID` (seo-person.ts Plan 07-01) + `resolveOgImage` (Plan 07-02 Task 1).
2. **altExists** : `useAsyncData` qui interroge la collection de l'autre langue (`queryCollection('blog_en')` depuis FR et inverse — literal names, Pitfall 5 Phase 5), utilisé pour émettre `ogLocaleAlternate` uniquement quand l'article existe dans les 2 langues.
3. **Computeds SEO** : `SITE_URL`, `ogImage`, `canonicalUrl` (via `localePath('/blog/' + slug)`), `publishedIso`, `modifiedIso` (`updated ?? date` — D-13), `inLanguageTag`.
4. **useSeoMeta étendu 5 → 14 clés (D-15)** : ogImage, ogUrl, ogLocale (`fr_FR`/`en_US`), ogLocaleAlternate (conditionnel sur `altExists`), twitterCard `summary_large_image`, twitterImage, articlePublishedTime, articleModifiedTime, articleAuthor (`["Killian' Dal-Cin"]` — string[] requis par les types).
5. **useSchemaOrg ajouté** : `defineArticle` (headline, description, image, datePublished, dateModified, inLanguage, author/publisher par `{'@id': KILLIAN_PERSON_ID}`, mainEntityOfPage) + `defineBreadcrumb` (3 items traduits via `t('blog.breadcrumb.*')`).

## Validation SSR (curl)

```
curl /fr/blog/test-kotlin-syntax
```

- ✅ `<meta property="og:image" content="https://killiandalcin.fr/og-blog-default.jpg">` (absolu, fallback)
- ✅ `<meta property="article:published_time" content="2026-04-21">`
- ✅ JSON-LD `@type: Article` avec :
  - `headline: "Guide du format Markdown"`
  - `inLanguage: "fr-FR"`
  - `datePublished: "2026-04-21"`, `dateModified: "2026-04-21"` (updated absent → fallback date, D-13)
  - `author: { '@id': 'https://killiandalcin.fr/#/schema/person/#killian' }` (référence à la Person globale de 07-01, le module préfixe l'@id par la canonical — comportement standard schema.org)
  - `publisher: { '@id': 'https://killiandalcin.fr/#/schema/person/#killian' }`
  - `image: { '@id': ... ImageObject }` (module auto-wrap)
  - `mainEntityOfPage: "https://killiandalcin.fr/fr/blog/test-kotlin-syntax"`
- ✅ JSON-LD `@type: BreadcrumbList` : `['Accueil', 'Blog', 'Guide du format Markdown']`
- ✅ `pnpm typecheck` exit 0

## Acceptance Criteria — all passed

- [x] SEO-10 : og:title/description/image uniques par article (dépendent de `page.title/description/image`)
- [x] SEO-11 : JSON-LD Article valide avec author (@id #killian), datePublished, dateModified, headline
- [x] SEO-13 : og:image = `https://killiandalcin.fr/og-blog-default.jpg` (fallback) ou frontmatter absolutisé, jamais `og-image.png`
- [x] SEO-15 : BreadcrumbList 3 items (Accueil → Blog → titre article)

## Deviations from Plan

**1. [Rule 3 — Blocking] Typings `nuxt-schema-org` trop narrow sur `inLanguage`**

- **Trouvé pendant :** Task 2, phase typecheck
- **Issue :** `defineArticle.inLanguage` inféré comme `ComputedRef<MaybeFalsy<'fr-FR'>>` (littéral fixe, non union) — une ComputedRef de l'union `'fr-FR' | 'en-US'` est rejetée au type-check.
- **Fix :** `const inLanguageTag = computed(() => (isFr.value ? 'fr-FR' : 'en-US')) as unknown as ComputedRef<'fr-FR'>` — cast localisé, commenté au-dessus. Le runtime émet correctement `'fr-FR'` ou `'en-US'` selon locale (vérifié par curl : `inLanguage: "fr-FR"` sur /fr/...). Pas de patch upstream (overhead disproportionné) ; pas d'impact runtime.
- **Files modified :** `app/pages/blog/[slug].vue`
- **Commit :** `e17faae`

**2. [Rule 3 — Blocking] `articleAuthor` attend `string[]` pas `string`**

- **Trouvé pendant :** Task 2, phase typecheck
- **Issue :** Le plan prescrivait `articleAuthor: () => "Killian' Dal-Cin"` mais `useSeoMeta` des versions récentes de `@unhead/*` type `articleAuthor` comme `ResolvableValue<string[] | undefined>`.
- **Fix :** `articleAuthor: () => ["Killian' Dal-Cin"]`. Le rendu HTML `<meta property="article:author">` reste cohérent (une entrée par auteur, ici une seule).
- **Commit :** `e17faae`

Aucune déviation architecturale (Rule 4 n'a pas été déclenché).

## Known Stubs / Follow-ups

1. **`public/og-blog-default.jpg` est un placeholder** : actuellement copie de `og-image.png` (72 bytes, ancien PNG M1). Un asset branded 1200×630 dédié au blog reste à produire (design work hors scope exécuteur). Aucun chemin de code ne dépend de ses dimensions précises — le fallback est servable et crawlable dès maintenant.

## Threat Flags

Aucun nouveau surface de menace introduit. `resolveOgImage` préfixe systématiquement `SITE_URL` — l'URL construite ne peut pas sortir du domaine (T-07-03 mitigé). L'unique cas où une URL absolue est conservée telle quelle (`http://` / `https://`) provient d'un frontmatter écrit par Killian uniquement (pas d'user input externe). T-07-04 (author identity) accepté — identité publique by design, déjà couvert 07-01.

## Self-Check: PASSED

- `app/utils/resolve-og-image.ts` — FOUND (`grep "export function resolveOgImage"` ✓)
- `public/og-blog-default.jpg` — FOUND
- Commit `fae4102` (Task 1) — FOUND in git log
- Commit `e17faae` (Task 2) — FOUND in git log
- Article JSON-LD avec author @id #killian — confirmé par parsing HTML du curl
- BreadcrumbList 3 items — confirmé
- og:image absolu — confirmé
- article:published_time — confirmé
- `pnpm typecheck` — exit 0
