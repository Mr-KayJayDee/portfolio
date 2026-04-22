---
phase: 06-blog-pages
plan: 02
subsystem: ui-components
tags: [blog, i18n, nav, blog-card, shared-components]

requires:
  - phase: 06-blog-pages
    plan: 01
    provides: "blogSchema étendu (draft/wordCount/minutes) + useReadingTime composable fallback — consommés par BlogCard.vue"
provides:
  - "Clés i18n complètes blog.* + nav.blog + a11y.blog* en FR et EN (14 clés par locale)"
  - "Lien nav Blog dans AppHeader entre Hytale et Projects (desktop + mobile)"
  - "Composant BlogCard.vue unifié avec variant default (listing) + compact (prev/next)"
affects: [06-03-blog-listing, 06-04-blog-article-chrome]

tech-stack:
  added: []
  patterns:
    - "Pattern composant multi-variant via prop discriminante + v-if branch (variant='default'|'compact')"
    - "Pattern slug derivation depuis article.path @nuxt/content (split /filter(Boolean).pop())"
    - "Pattern i18n date formatting via Intl.DateTimeFormat + locale.value guard"
    - "Pattern absolute inset-0 NuxtLink pour SEO + full-card click (cohabite avec tags non-cliquables D-02)"
    - "Pattern Schema.org BlogPosting prêt pour JSON-LD Phase 7 (headline/description/keywords/url/image/datePublished)"
    - "Pattern reading-time avec injection hook + fallback composable (minutes ?? useReadingTime(description))"

key-files:
  created:
    - app/components/BlogCard.vue
  modified:
    - i18n/locales/fr.json
    - i18n/locales/en.json
    - app/components/layout/AppHeader.vue

key-decisions:
  - "BlogCard unique avec variant prop (D-20) plutôt que 2 composants séparés — 1 source of truth pour date/slug/reading-time"
  - "Slug extrait du dernier segment du path (split/filter/pop) plutôt qu'un champ frontmatter dédié — cohérent @nuxt/content convention, zero burden pour auteur"
  - "Reading-time : minutes injecté par hook Nitro prioritaire, useReadingTime(description) en fallback uniquement — évite drift listing vs article"
  - "Variant compact sans image (D-10) + text-right sur next / text-left sur prev — UX directionnelle (flèche + texte suivent la direction du clic)"
  - "FR i18n accentué dans bloc blog.* (Bientôt, précédent, Sommaire) suivant convention PATTERNS.md §i18n — cohérent avec bloc projects, distinct de a11y/seo (ASCII)"

requirements-completed: [BLOG-02, BLOG-03, BLOG-06]

duration: ~15min
completed: 2026-04-22
---

# Phase 6 Plan 02 : Components UI + i18n Locales Summary

**Couche composition partagée : clés i18n blog complètes (FR+EN), lien nav Blog, composant BlogCard.vue unifié variant default/compact — prêt pour Wave 3 (pages listing + article).**

## Performance

- **Duration:** ~15 min
- **Started:** 2026-04-22T09:10Z
- **Completed:** 2026-04-22T09:25Z
- **Tasks:** 3 / 3
- **Files modified:** 4 (1 créé, 3 modifiés)

## Accomplishments

- **i18n complet** : 14 clés par locale ajoutées — `nav.blog`, 3 clés `a11y.blog*` avec interpolation `{title}`, bloc `blog.*` de 14 clés (title, subtitle, stats.articles/tags/languages, readingTime avec `{minutes}`, prevArticle, nextArticle, backToBlog, toc.title, emptyState.title/description/cta, breadcrumb.home/blog). FR accentué, EN traduction complète. JSON valide des 2 fichiers.
- **Nav link Blog** : insertion d'1 ligne dans `navLinks` computed de AppHeader.vue, position ligne 11 (entre hytale ligne 10 et projects ligne 12). Aucune autre modification — template `v-for` existant propage automatiquement au desktop + mobile slideover.
- **BlogCard.vue** : composant unique 192 lignes, 2 variants branchés par `v-if="variant === 'default'"` / `v-else` (compact). Script setup TS strict. Props `article` + `variant?='default'|'compact'` + `direction?='prev'|'next'`. Date formatée `Intl.DateTimeFormat` avec locale dynamique. Reading time avec fallback composable. Schema.org `BlogPosting` markup prêt pour JSON-LD Phase 7. 3 occurrences de `localePath(\`/blog/\${slug}\`)` (NuxtLink image + full-card SEO + variant compact).

## Task Commits

1. **Task 2.1 : i18n FR + EN** — `d299383` (feat)
2. **Task 2.2 : Nav link Blog dans AppHeader** — `0e42a05` (feat)
3. **Task 2.3 : BlogCard.vue variant default + compact** — `d0ebf35` (feat)

## Files Created/Modified

### Created

- `app/components/BlogCard.vue` *(NEW, 192 lignes)*
  - `<script setup lang="ts">` avec interfaces `BlogArticle` + `Props`
  - `withDefaults(defineProps<Props>(), { variant: 'default', direction: 'next' })`
  - Computed : `slug` (last segment de `article.path`), `formattedDate` (Intl avec try/catch), `readingMinutes` (minutes ?? useReadingTime), `directionIcon`, `directionLabel`
  - Template dual-branch :
    - `variant === 'default'` : article wrapper identique ProjectCard + cover conditional (v-if article.image) + padding p-5/sm:p-6 + tag UBadge + date mono + h2 + description line-clamp-2 + reading time avec UIcon clock + extra tags pills (+N) + full-card NuxtLink SEO
    - `variant === 'compact'` (v-else) : no image + label row direction (arrow-left/right selon direction) + h3 + date mono + NuxtLink aria-label interpolé `a11y.blogPrev`/`a11y.blogNext`
  - Schema.org attributes : `itemscope itemtype="https://schema.org/BlogPosting"`, `itemprop` sur image/keywords/datePublished/headline/description/url

### Modified

- `i18n/locales/fr.json` — +29 lignes (1 clé `nav.blog` + 3 clés `a11y.blog*` + bloc `blog` 14 clés). JSON valide. Blocs existants (nav.home, nav.hytale, seo, projects...) inchangés.
- `i18n/locales/en.json` — +29 lignes symétriques (mêmes clés, traductions EN : "Technical articles...", "min read", "Previous/Next article", "Table of contents", "Back to blog", "Hytale articles coming soon", "Contact me", "Home"/"Blog"). JSON valide.
- `app/components/layout/AppHeader.vue` — +1 ligne : `{ key: 'blog', path: '/blog' },` inséré ligne 11 dans l'array navLinks computed, entre hytale et projects. Script + template intacts.

## i18n Diff (clés ajoutées, par locale)

```
nav.blog
a11y.blogTocToggle
a11y.blogPrev             // avec interpolation {title}
a11y.blogNext             // avec interpolation {title}
blog.title
blog.subtitle
blog.stats.articles
blog.stats.tags
blog.stats.languages
blog.readingTime          // avec interpolation {minutes}
blog.prevArticle
blog.nextArticle
blog.backToBlog
blog.toc.title
blog.emptyState.title
blog.emptyState.description
blog.emptyState.cta
blog.breadcrumb.home
blog.breadcrumb.blog
```

**Total** : 19 clés ajoutées par locale = 38 clés au total. Toutes traduites FR/EN, structure JSON symétrique.

## AppHeader diff (ligne 11 ajoutée)

```diff
 const navLinks = computed(() => [
   { key: 'home', path: '/' },
   { key: 'hytale', path: '/hytale' },
+  { key: 'blog', path: '/blog' },
   { key: 'projects', path: '/projects' },
   { key: 'about', path: '/about' },
   { key: 'contact', path: '/contact' },
   { key: 'fiverr', path: '/fiverr' },
 ])
```

Position finale de nav : Home / Hytale / **Blog** / Projects / About / Contact / Fiverr (conforme D-15).

## BlogCard Design Decisions

### Slug derivation
`article.path` a la forme `/fr/blog/my-slug` ou `/en/blog/my-slug` (strategy prefix @nuxtjs/i18n). Pour construire un lien locale-agnostique vers `localePath('/blog/my-slug')`, on extrait le dernier segment :
```typescript
const slug = computed(() => {
  const parts = props.article.path.split('/').filter(Boolean)
  return parts[parts.length - 1] ?? ''
})
```
Avantage : zero burden pour l'auteur de l'article (pas besoin d'un champ `slug` dans le frontmatter), compatible avec la convention @nuxt/content qui dérive le path depuis le nom de fichier.

### Reading-time dual source
```typescript
const readingMinutes = computed(() => {
  if (typeof props.article.minutes === 'number') return props.article.minutes
  return useReadingTime(props.article.description ?? '')
})
```
- **Priorité 1** : `article.minutes` injecté par le hook Nitro `content:file:afterParse` (Plan 06-01) — calcul exact basé sur le body markdown, 200 wpm, snippets code exclus.
- **Fallback** : `useReadingTime(description)` — utile uniquement en dev hot-reload si le hook n'a pas encore persisté la valeur (ou si `minutes` vraiment absent).
- **Conséquence** : drift listing ↔ article impossible (même source of truth en prod, même formule en fallback).

### Direction UX (variant compact)
- `direction='prev'` : `text-left items-start`, icône `i-lucide-arrow-left` AVANT le label, hover `-translate-x-1` (glisse vers la gauche).
- `direction='next'` : `text-right items-end`, icône `i-lucide-arrow-right` APRÈS le label, hover `translate-x-1` (glisse vers la droite).

Le texte et la flèche suivent la direction du clic — affordance visuelle naturelle. Pattern emprunté à la doc Nuxt / Stripe.

### a11y label template
```html
:aria-label="t(direction === 'prev' ? 'a11y.blogPrev' : 'a11y.blogNext', { title: article.title })"
```
Compose le message depuis les clés i18n avec interpolation `{title}` — screen readers annoncent "Article précédent : [titre]" / "Previous article: [title]" au focus du lien. Respect WCAG 2.4.4 (Link Purpose in Context).

### Schema.org BlogPosting prep Phase 7
Le variant default porte déjà tous les `itemprop` requis pour un JSON-LD `Article` / `BlogPosting` :
- `itemscope itemtype="https://schema.org/BlogPosting"` sur le `<article>`
- `itemprop="image"` sur NuxtImg
- `itemprop="keywords"` sur le tag UBadge
- `itemprop="datePublished"` sur `<time>`
- `itemprop="headline"` sur le h2
- `itemprop="description"` sur le paragraphe
- `itemprop="url"` sur le NuxtLink full-card

Phase 7 pourra injecter un JSON-LD parallèle sans modifier le markup — les crawlers qui ne parsent pas JSON-LD trouvent déjà les microdata. Double-ceinture SEO.

## Decisions Made

Aucune décision nouvelle au-delà de celles figées dans CONTEXT.md (D-02, D-03, D-10, D-15, D-20, D-21). Le plan a été exécuté conformément à UI-SPEC + RESEARCH + PATTERNS.

## Deviations from Plan

**None — plan executed exactly as written.**

- Aucun bug inline (Rule 1) : ProjectCard pattern transposé sans accroc.
- Aucune fonctionnalité critique manquante (Rule 2) : a11y labels + Schema.org déjà dans la spec.
- Aucun blocage technique (Rule 3) : typecheck vert après Task 2.3.
- Aucune décision architecturale surprise (Rule 4).

## Issues Encountered

- **Hook runtime warnings (non-bloquant)** : Plusieurs avertissements `READ-BEFORE-EDIT REMINDER` ont été déclenchés lors d'éditions successives sur le même fichier (fr.json, en.json, AppHeader.vue). Les fichiers avaient bien été lus en début de session, mais le hook est prudent pour les éditions multiples. Impact nul sur le code, les éditions sont toutes passées.
- Aucun autre incident.

## User Setup Required

**None.** Tous les changements sont du code — aucune configuration externe, aucune credential, aucune migration DB.

## Next Phase Readiness

**Plan 06-03 (Listing /blog)** peut démarrer immédiatement :
- `nav.blog` + `blog.title/subtitle/stats.*/emptyState.*` disponibles pour `app/pages/blog/index.vue`.
- `BlogCard` auto-importé par Nuxt (`app/components/BlogCard.vue`) — utilisable directement avec `<BlogCard :article="article" />` (variant default par défaut).
- Le listing pourra appeler `queryCollection('blog_fr').where('draft', '=', false).order('date', 'DESC').all()` et passer chaque article à `<BlogCard>`.
- Empty state : icône `i-lucide-book-open` + `blog.emptyState.title/description/cta` → `UButton` vers `localePath('/contact')`.

**Plan 06-04 (Article chrome)** peut démarrer immédiatement :
- `blog.toc.title`, `blog.backToBlog`, `a11y.blogTocToggle` disponibles pour le chrome.
- `blog.breadcrumb.home`, `blog.breadcrumb.blog` disponibles pour UBreadcrumb.
- `<BlogPrevNext>` (à créer) utilisera `<BlogCard :article :variant="'compact'" :direction="'prev'|'next'" />`.

**Nav visible** : Le lien Blog apparaît dès le prochain refresh dev server sur `/fr/` et `/en/`. Clic → `/fr/blog` ou `/en/blog` = 404 attendu tant que `app/pages/blog/index.vue` n'existe pas (à créer Plan 06-03).

Aucun blocker. Typecheck vert. 4 fichiers cibles, 0 fichier hors-scope modifié.

## Self-Check: PASSED

**Files exist:**
- FOUND: `app/components/BlogCard.vue` (192 lignes, 2 variants, Schema.org BlogPosting)
- FOUND: `i18n/locales/fr.json` (JSON valide, nav.blog, a11y.blog*, blog.* complets)
- FOUND: `i18n/locales/en.json` (JSON valide, symétrique FR)
- FOUND: `app/components/layout/AppHeader.vue` (navLinks ligne 11 = blog)

**Commits exist:**
- FOUND: `d299383` (feat 06-02: i18n keys)
- FOUND: `0e42a05` (feat 06-02: nav link)
- FOUND: `d0ebf35` (feat 06-02: BlogCard)

**Typecheck:** `pnpm typecheck` → exit 0 après Task 2.3 (vérifié en toute fin d'exécution avant commit BlogCard).

**Acceptance criteria (all tasks):**
- Task 2.1 : tous les asserts `node -e "...fr.nav.blog"`, `fr.blog.title`, `fr.blog.subtitle starts with Articles techniques`, `fr.blog.readingTime = {minutes} min de lecture`, `en.blog.readingTime = {minutes} min read`, `fr.blog.emptyState.cta = Me contacter`, `en.blog.emptyState.cta = Contact me`, `fr.blog.toc.title = Sommaire`, `en.blog.toc.title = Table of contents`, `fr.a11y.blogTocToggle = Afficher le sommaire`, `fr.a11y.blogPrev contains {title}`, `fr.blog.breadcrumb.home = Accueil`, `en.blog.breadcrumb.home = Home` → TOUS VALIDÉS. JSON parse sans throw des 2 fichiers. Clé existante `fr.nav.hytale = Hytale` préservée.
- Task 2.2 : `grep "{ key: 'blog', path: '/blog' }"` = 1, `key: 'hytale'` ligne 10, `key: 'blog'` ligne 11, `key: 'projects'` ligne 12 (ordre strict respecté), `v-for="link in navLinks"` = 2 occurrences (desktop + mobile templates intacts), pas de duplication home/fiverr.
- Task 2.3 : fichier existe, tous les greps retournent ≥ le compte attendu (1 pour `variant === 'default'`, `withDefaults`, `Intl.DateTimeFormat`, `t('blog.readingTime'`, `useReadingTime`, `i-lucide-arrow-left/right`, `BlogPosting`, `aspect-[16/9]`, `a11y.blogPrev`, `a11y.blogNext`), 3 pour `localePath(\`/blog/\${slug}\`)`. Typecheck exit 0.

---
*Phase: 06-blog-pages*
*Plan: 02*
*Completed: 2026-04-22*
