# Phase 6: Blog Pages - Research

**Researched:** 2026-04-22
**Domain:** Nuxt 4 SSR + @nuxt/content v3 listing/article pages, TOC avec active state, prev/next via surroundings, i18n prefix strategy
**Confidence:** HIGH (APIs officielles + docs Nuxt UI/Content v3 + pattern éprouvés)

<user_constraints>
## User Constraints (from 06-CONTEXT.md)

### Locked Decisions (21 décisions D-01..D-21)

**Layout listing `/blog`**
- **D-01:** Grille 1/2/3 cols responsive (mobile/tablet/desktop), même pattern visuel que `/projects` (ProjectCard).
- **D-02:** Chaque card = titre (h2) + description tronquée + date formatée i18n + tags (UBadge non-cliquables) + image cover (si frontmatter `image`) + reading time.
- **D-03:** Aucun fallback image cover (cards homogènes sans placeholder branded).
- **D-04:** Hero section en haut de `/blog` = slogan `// blog` + H1 gradient + subtitle + stats (articles, tags uniques, langues).

**Chrome article `/blog/[slug]`**
- **D-05:** TOC = sidebar sticky à droite sur desktop (≥lg), drawer mobile sur <lg. Génération depuis `page.body.toc`. Pas de TOC inline au-dessus du body.
- **D-06:** Highlight TOC actif via `IntersectionObserver`. Implémentation client-only, hydrate proprement après SSR.
- **D-07:** Header article complet = titre H1 + date i18n + tags UBadge + cover hero (aspect 21/9 ou 16/9 pleine largeur) + reading time + breadcrumb UBreadcrumb (Accueil → Blog → Titre). Visuel uniquement — JSON-LD BreadcrumbList = Phase 7.
- **D-08:** Largeur max body markdown = `max-w-3xl` (~768px). Wrapper `prose dark:prose-invert` de Phase 5 conservé.

**Nav prev/next en bas d'article**
- **D-09:** Style = cards riches côte à côte (titre + date + icon flèche + label "Article précédent/suivant"). Fond subtil, hover bg-brand.
- **D-10:** Pas d'image cover dans ces cards.
- **D-11:** Helper utilisé = `surround()` de @nuxt/content (en pratique `queryCollectionItemSurroundings`). Zero logique de tri custom.
- **D-12:** Ordre = date frontmatter descendant. Plus récent en haut du listing, "Article précédent" = plus ancien.
- **D-13:** Edge cases (pas de voisin) = afficher seul le lien existant. Pas de fallback vers `/blog`.

**Visibilité blog & article de test**
- **D-14:** `content/{fr,en}/blog/test-kotlin-syntax.md` = ajouter `draft: true`. Toutes les queries filtrent `draft: false`. Article reste accessible par URL directe.
- **D-15:** Ajouter un lien "Blog" dans `AppHeader.vue` entre "Hytale" et "Projects". Ordre final nav : Home / Hytale / **Blog** / Projects / About / Contact / Fiverr.
- **D-16:** Empty state listing = message "Bientôt des articles Hytale" + icône `i-lucide-book-open` + CTA UButton vers `/contact`.
- **D-17:** URLs finales : `/fr/blog`, `/en/blog`, `/fr/blog/[slug]`, `/en/blog/[slug]`. `/blog` sans préfixe → 302 via `detectBrowserLanguage`.

**Additions techniques**
- **D-18:** Étendre schema Zod dans `content.config.ts` : ajouter `draft: z.boolean().optional().default(false)`.
- **D-19:** Créer un composable `useReadingTime(content): number` (200 mots/min) OU équivalent hook `content:file:afterParse`.
- **D-20:** Composant unique `BlogCard.vue` avec variant prop (`default` / `compact`) réutilisé par listing ET prev/next.
- **D-21:** Ajouter clés i18n `blog.*`, `nav.blog`, `a11y.blogTocToggle/blogPrev/blogNext` dans fr.json/en.json.

### Claude's Discretion
- Nom exact du composable reading time (`useReadingTime` recommandé).
- Structure interne du composant TOC (sticky container, drawer composition).
- Format exact de la date i18n (`Intl.DateTimeFormat` recommandé).
- Classes Tailwind exactes du hero cover image (aspect-[21/9] retenu dans UI-SPEC).
- Emplacement exact du breadcrumb (UI-SPEC impose : AU-DESSUS du H1).

### Deferred Ideas (OUT OF SCOPE Phase 6)
- Filtrage par tag cliquable — backlog post-M1.1.
- Recherche full-text blog — backlog.
- Pagination / infinite scroll — backlog (<20 articles).
- JSON-LD `Article` + `BreadcrumbList` — Phase 7.
- `useSeoMeta` enrichi par article (og:image, canonical, dateModified) — Phase 7.
- Sitemap étendu avec URLs blog — Phase 7.
- OG image generator dynamique — backlog SEO-06.
- Articles Hytale réels (2+ seed) — Phase 8.
- Section "Articles récents" sur /hytale — Phase 8.
- Alias /articles, tags pages, RSS — scope creep / backlog.
</user_constraints>

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| BLOG-02 | Page listing `/blog` — liste articles SSR bilingue (titre, description, date, tags) | §API queryCollection + §BlogCard pattern + §Hero listing |
| BLOG-03 | Page article `/blog/[slug]` — rendu SSR + TOC + prev/next | §queryCollectionItemSurroundings + §page.body.toc + §IntersectionObserver + §BlogToc |
| BLOG-06 | Articles bilingues FR/EN via i18n content | §Littéraux queryCollection + §strategy prefix + §Gotchas Phase 5 |
</phase_requirements>

## Summary

Phase 6 est une phase de **composition de composants** : aucune nouvelle dépendance, aucun nouveau module. Tout le stack est déjà installé (Phase 5) : `@nuxt/content@^3.13`, `@nuxt/ui@^3.3`, `@nuxt/image@^2`, `@nuxtjs/i18n@^10.2`, `@tailwindcss/typography@^0.5`, `zod@^4.3`. Le travail consiste à (1) étendre le schema `blog_fr`/`blog_en` avec `draft`, (2) créer un listing `/blog/index.vue`, (3) enrichir `/blog/[slug].vue` avec TOC + header + breadcrumb + prev/next, (4) créer 3 composants (BlogCard, BlogToc, BlogPrevNext) + 1 composable (useReadingTime), (5) câbler i18n et nav.

**Trois pièges connus dominent la planification :**
1. Le Vite extractor de @nuxt/content refuse `queryCollection(variable)` → littéraux uniquement, donc **branches if/else `isFr`** à chaque query (listing, surround, [slug]).
2. La catch-all route `[...slug].vue` casse avec i18n strategy `prefix` → rester sur `[slug].vue` single-segment (déjà conforme Phase 5).
3. Le body de `page` en v3 est `type: 'minimal'` (tuples `[tag, attrs, ...children]`), PAS l'AST unist v2 → traversal récursif custom ou utiliser un hook `content:file:afterParse` (recommandé).

**Primary recommendation:** Utiliser `queryCollectionItemSurroundings('blog_fr', path, { fields: [...] })` pour prev/next (API officielle v3, retourne `[prev | null, next | null]`). Calculer le reading time dans un hook Nitro `content:file:afterParse` avec injection de `minutes` + `wordCount` dans le content object, et étendre le schema Zod avec ces champs pour les rendre queryables. Implémenter le TOC highlight avec un `IntersectionObserver` manuel (pas de `@vueuse/core` installé) dans `onMounted` + cleanup `onBeforeUnmount`.

## Architectural Responsibility Map

| Capability | Primary Tier | Secondary Tier | Rationale |
|------------|-------------|----------------|-----------|
| Listing articles SSR | Frontend Server (SSR) | — | `useAsyncData` + `queryCollection` résolvent côté serveur au render, HTML complet envoyé au browser (SEO) |
| Rendu markdown article | Frontend Server (SSR) | Browser (hydration) | `ContentRenderer` SSR puis hydrate MDC components côté client |
| TOC sticky highlight | Browser (client-only) | — | IntersectionObserver ne peut fonctionner qu'après mount; initial state = premier heading côté SSR |
| TOC drawer mobile | Browser | — | UDrawer Nuxt UI = composant client-interactif |
| Prev/next articles | Frontend Server (SSR) | — | `queryCollectionItemSurroundings` dans `useAsyncData`, rendu SSR |
| Reading time computation | Build time (Nitro hook) | — | Calculé dans `content:file:afterParse` à l'ingestion, stocké dans la DB SQLite, requêté côté SSR |
| Filtrage draft:false | Frontend Server (SSR) | — | `.where('draft', '=', false)` au niveau query, jamais côté client |
| i18n routing (/fr/blog vs /en/blog) | Frontend Server (SSR) | — | `useLocalePath` résout côté serveur, strategy `prefix` impose la langue dans l'URL |
| Nav link Blog dans AppHeader | Frontend Server (SSR) | — | Rendu dans le layout SSR, hydraté côté client |

## Standard Stack

### Core (tout déjà installé — NE RIEN AJOUTER)

| Library | Version installée | Purpose | Why Standard |
|---------|-------------------|---------|--------------|
| `@nuxt/content` | `^3.13.0` `[VERIFIED: package.json]` | queryCollection + ContentRenderer + Shiki intégré | Officiel Nuxt, v3 remplace v2 findSurround par `queryCollectionItemSurroundings` `[CITED: content.nuxt.com/docs/utils/query-collection-item-surroundings]` |
| `@nuxt/ui` | `^3.3.2` `[VERIFIED: package.json]` | UBreadcrumb, UDrawer, UBadge, UButton, UIcon | Officiel Nuxt, déjà consommé partout dans le projet |
| `@nuxt/image` | `^2.0.0` `[VERIFIED: package.json]` | NuxtImg cover card + article hero | Officiel, déjà utilisé (AppHeader, ProjectCard) |
| `@nuxtjs/i18n` | `^10.2.4` `[VERIFIED: package.json]` | useI18n, useLocalePath, switchLocalePath | Officiel Nuxt SEO stack, strategy `prefix` déjà configurée |
| `@tailwindcss/typography` | `^0.5.19` `[VERIFIED: package.json]` | prose + dark:prose-invert (hérité Phase 5) | Ecosystem Tailwind officiel |
| `zod` | `^4.3.6` `[VERIFIED: package.json]` | Schema frontmatter collections | Requis par @nuxt/content v3 |

### Supporting (également installé)

| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| `@iconify-json/lucide` | `^1.2.102` `[VERIFIED: package.json]` | Icônes `i-lucide-*` (list, book-open, mail, arrow-left/right, clock, calendar) | Toutes les UIcon de cette phase |

### Alternatives Considered / NON RETENUES

| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| Custom `BlogToc.vue` | **`UContentToc` officiel Nuxt UI v3** | `UContentToc` gère highlight auto + links shape compatible avec `page.body.toc.links` `[CITED: ui.nuxt.com/docs/components/content-toc]`. **MAIS** : design imposé, customization limitée au `ui` slot prop, et UI-SPEC §BlogToc contract impose une mise en page custom (aside sticky desktop + UDrawer mobile unifié). Décision : rester sur custom pour contrôle total de la composition sticky/drawer. À mentionner au planner comme fallback rapide si budget serré. |
| Custom `BlogPrevNext.vue` | **`UContentSurround` officiel Nuxt UI v3** | `UContentSurround` prend directement `:surround="[prev,next]"` et rend un grid 2-cols avec prevIcon/nextIcon `[CITED: ui.nuxt.com/docs/components/content-surround]`. **MAIS** : D-20 exige composant unique `BlogCard.vue` réutilisé via variant `compact`. Décision : custom (aligné D-20). ContentSurround mentionné pour info. |
| `@vueuse/core` `useIntersectionObserver` | **IntersectionObserver natif manuel** | `@vueuse/core` PAS INSTALLÉ `[VERIFIED: package.json ne contient aucune entry @vueuse]`. Installation = nouvelle dépendance refusée par contrainte "Zéro dépendance payante + stack minimale". Pattern natif dans `onMounted` + cleanup `onBeforeUnmount` suffit largement — code ~25 lignes. |
| Composable `useReadingTime(text)` client-side | **Nitro hook `content:file:afterParse`** | Hook calcule à l'ingestion et stocke `minutes` + `wordCount` sur le document → queryable côté SSR, zero compute runtime. Pattern officiel `[CITED: content.nuxt.com/docs/advanced/hooks]`. Retenu. |

**Installation requise :** AUCUNE. Phase 6 est 100% composition sur stack existant.

**Version verification (pinned) :**
- `@nuxt/content@^3.13.0` — confirmé current stable (2025 era) `[VERIFIED: package.json]`
- `@nuxt/ui@^3.3.2` — confirmé current stable `[VERIFIED: package.json]`
- `@nuxtjs/i18n@^10.2.4` — confirmé current stable `[VERIFIED: package.json]`

## Architecture Patterns

### System Architecture Diagram

```
                                 ┌──────────────────────────────────────┐
                                 │ Browser request /fr/blog             │
                                 └──────────────────┬───────────────────┘
                                                    ▼
                 ┌──────────────────────────────────────────────────────────┐
                 │ Nuxt 4 SSR → @nuxtjs/i18n strategy prefix résout locale │
                 │   locale.value === 'fr' → path /fr/blog                 │
                 └──────────────────┬───────────────────────────────────────┘
                                    ▼
          ┌─────────────────────────────────────────────────────────────────┐
          │ app/pages/blog/index.vue                                        │
          │   useAsyncData('blog-list-fr', () =>                            │
          │     queryCollection('blog_fr')   ← littéral !                   │
          │       .where('draft','=', false)                                │
          │       .order('date','DESC')                                     │
          │       .all()                                                    │
          │   )                                                             │
          └─────────────────┬───────────────────────────────────────────────┘
                            ▼
          ┌──────────────────────────────────────────────────────────────────┐
          │ @nuxt/content SQLite (Nitro runtime)                             │
          │   Returns [article, article, ...] avec frontmatter + path +      │
          │   minutes (hook afterParse) + draft                              │
          └─────────────────┬────────────────────────────────────────────────┘
                            ▼
          ┌──────────────────────────────────────────────────────────────────┐
          │ Render SSR:                                                       │
          │   Hero section (stats = articles.length, tags uniques, 2)        │
          │   Grid (BlogCard variant="default" ×N)                           │
          │   OR empty state (UButton CTA /contact)                          │
          └─────────────────┬────────────────────────────────────────────────┘
                            ▼
                 ┌──────────────────────────────────────┐
                 │ HTML SSR complet → Browser           │
                 │ Hydrate NuxtLink + UButton interactifs│
                 └──────────────────────────────────────┘

─────────────── Article path /fr/blog/[slug] ────────────────────────

                 ┌──────────────────────────────────────┐
                 │ Browser /fr/blog/ma-premier-article  │
                 └──────────────────┬───────────────────┘
                                    ▼
          ┌──────────────────────────────────────────────────────────────────┐
          │ app/pages/blog/[slug].vue                                        │
          │   1. useAsyncData('blog-fr-slug', () =>                          │
          │        queryCollection('blog_fr').path(path).first())            │
          │   2. useAsyncData('blog-fr-slug-surround', () =>                 │
          │        queryCollectionItemSurroundings('blog_fr', path, {        │
          │          fields: ['title','description','date','image'] })      │
          │          .where('draft','=', false)                              │
          │          .order('date','DESC'))                                  │
          │                                                                  │
          │   Renders sequentially:                                          │
          │     UBreadcrumb [Accueil → Blog → titre]                         │
          │     H1 + meta row (date i18n + · + minutes + UBtn TOC mobile)    │
          │     Tags UBadge row                                              │
          │     NuxtImg cover (aspect-21/9) si image                         │
          │     grid grid-cols-[1fr_16rem] desktop :                         │
          │       ├─ <article class="prose"> ContentRenderer                 │
          │       └─ <aside sticky> BlogToc (desktop)                        │
          │     BlogPrevNext (surround[0], surround[1])                      │
          └─────────────────┬────────────────────────────────────────────────┘
                            ▼
          ┌──────────────────────────────────────────────────────────────────┐
          │ Client hydrate                                                    │
          │   onMounted → IntersectionObserver sur h2[id], h3[id]            │
          │   Update activeId ref → BlogToc classe text-brand-500 conditionnel│
          │   UDrawer mobile ouvre au clic UButton trigger                   │
          └──────────────────────────────────────────────────────────────────┘

─────────────── Build-time Nitro hook ──────────────────────────────

┌─────────────────────────────────────────────────────────────┐
│ server/plugins/reading-time.ts (NEW)                        │
│   nitroApp.hooks.hook('content:file:afterParse', (ctx) => { │
│     // ctx.content = parsed doc                              │
│     const wordCount = countWordsMinimal(ctx.content.body)   │
│     ctx.content.wordCount = wordCount                       │
│     ctx.content.minutes = Math.ceil(wordCount / 200)        │
│   })                                                         │
│                                                              │
│ content.config.ts : ajouter wordCount + minutes au schema   │
│ pour exposer via queryCollection                            │
└─────────────────────────────────────────────────────────────┘
```

### Recommended Project Structure

```
app/
├── pages/
│   └── blog/
│       ├── index.vue           # NEW — listing SSR
│       └── [slug].vue          # ENRICH — phase 5 minimal → header + TOC + prev/next
├── components/
│   ├── BlogCard.vue            # NEW — variants default + compact
│   ├── BlogToc.vue             # NEW — sticky aside + UDrawer mobile + IntersectionObserver
│   ├── BlogPrevNext.vue        # NEW — 2× BlogCard variant=compact + icons
│   └── layout/
│       └── AppHeader.vue       # MODIFY — ajouter { key:'blog', path:'/blog' } dans navLinks
├── composables/
│   └── useReadingTime.ts       # NEW — helper client si besoin; source of truth = hook Nitro
├── utils/                      # CREATE folder
│   └── countWords.ts           # NEW — traversal minimal body pour fallback client
server/
└── plugins/
    └── reading-time.ts         # NEW — Nitro hook content:file:afterParse
content.config.ts               # MODIFY — ajouter draft + wordCount + minutes au schema
i18n/locales/
├── fr.json                     # MODIFY — ajouter blog.* + nav.blog + a11y.*
└── en.json                     # MODIFY — idem
```

### Pattern 1: queryCollection littéral avec branches if/else

**What:** Le Vite extractor de @nuxt/content v3 scan le code source à build pour extraire les queries et pré-compiler les collections. Il ne peut pas analyser des variables dynamiques. Conséquence : `queryCollection(locale.value === 'fr' ? 'blog_fr' : 'blog_en')` retourne un objet vide. `[VERIFIED: 05-STATE.md Gotchas + 05-02-SUMMARY]`

**When to use:** Toutes les queries `@nuxt/content` de Phase 6.

**Example:**
```typescript
// ✅ CORRECT — littéral séparé par branche
const { locale } = useI18n()
const isFr = computed(() => locale.value === 'fr')
const route = useRoute()

const { data: articles } = await useAsyncData(
  `blog-list-${locale.value}`,
  () => isFr.value
    ? queryCollection('blog_fr').where('draft', '=', false).order('date', 'DESC').all()
    : queryCollection('blog_en').where('draft', '=', false).order('date', 'DESC').all(),
  { watch: [locale] }  // re-fetch au switch de langue
)

// ❌ INCORRECT — extractor casse
const col = isFr.value ? 'blog_fr' : 'blog_en'
const { data } = await useAsyncData(() => queryCollection(col).all())  // ← returns empty
```

### Pattern 2: queryCollectionItemSurroundings (prev/next)

**What:** API v3 officielle qui remplace `findSurround()` de v2 `[CITED: masteringnuxt.com/blog/upgrading-from-nuxt-content-v2-to-v3]`. Signature `[CITED: content.nuxt.com/docs/utils/query-collection-item-surroundings]`:

```typescript
function queryCollectionItemSurroundings<T extends keyof PageCollections>(
  collection: T,
  path: string,
  opts?: { before?: number, after?: number, fields?: Array<keyof Item> }
): ChainablePromise<T, ContentNavigationItem[]>
```

**Retour :** Array `[previousItem, nextItem]` (longueur 2 par défaut). Si currentItem est le premier article : `[null, nextItem]`. Si dernier : `[previousItem, null]`. Si un seul article dans la collection : `[null, null]`. `[CITED: content.nuxt.com/docs/utils/query-collection-item-surroundings]`

**Chaînable avec :** `.where()`, `.andWhere()`, `.orWhere()`, `.order()`. IMPORTANT : les filtres où/order s'appliquent à la collection AVANT calcul des voisins — donc filtrer `draft = false` ici exclut correctement les brouillons des surroundings.

**Example canonique :**
```typescript
const { data: surround } = await useAsyncData(
  `blog-surround-${locale.value}-${slug}`,
  () => isFr.value
    ? queryCollectionItemSurroundings('blog_fr', path, {
        fields: ['title', 'description', 'date', 'image', 'path']
      })
        .where('draft', '=', false)
        .order('date', 'DESC')
    : queryCollectionItemSurroundings('blog_en', path, {
        fields: ['title', 'description', 'date', 'image', 'path']
      })
        .where('draft', '=', false)
        .order('date', 'DESC')
)

const prev = computed(() => surround.value?.[0] ?? null)
const next = computed(() => surround.value?.[1] ?? null)
```

**Avec D-12 order DESC** : articles plus récents en haut de listing. Dans un DESC feed, le "previous article" au sens temporel (plus ancien) est logiquement à droite (suivant dans la liste). Le nommage UI est **un choix éditorial** : UI-SPEC i18n `blog.prevArticle` = "Article précédent" pointe par convention vers l'article plus ancien. Vérifier avec le planner/UX que `surround[0]` correspond bien à "plus ancien" dans l'ordre DESC. **Semantique `queryCollectionItemSurroundings` par défaut : `[0]` = élément AVANT dans la liste ordonnée, `[1]` = élément APRÈS.** En DESC, `[0]` = plus récent, `[1]` = plus ancien. → **inverser l'affectation UI** : UI "précédent" (ancien) = `surround[1]`, UI "suivant" (nouveau) = `surround[0]`. `[ASSUMED — À VALIDER EN IMPLÉMENTATION]`

### Pattern 3: page.body.toc structure (flat + nested)

**What:** `@nuxt/content` v3 expose automatiquement `page.body.toc.links` comme array d'objets typés. `[CITED: github.com/nuxt/content discussions + damieng.com]`

**Structure exacte :**
```typescript
interface TocLink {
  id: string         // anchor id auto-généré depuis le texte du heading (kebab-case)
  depth: number      // 2 pour h2, 3 pour h3, etc.
  text: string       // texte du heading sans markdown
  children?: TocLink[]  // optionnel, uniquement si heading plus profond suit
}

interface Toc {
  title: string
  searchDepth: number
  depth: number          // max depth inclus
  links: TocLink[]
}
```

**Exemple réel :**
```json
{
  "depth": 5,
  "searchDepth": 5,
  "links": [
    { "id": "my-first-blog-post", "depth": 2, "text": "My first blog post" },
    {
      "id": "tailwindcss", "depth": 2, "text": "TailwindCSS",
      "children": [
        { "id": "tailwindcss-typography", "depth": 3, "text": "TailwindCSS Typography" }
      ]
    }
  ]
}
```

**When to use:** Rendu sidebar TOC + drawer mobile (BlogToc.vue).

**Example :**
```vue
<script setup lang="ts">
const props = defineProps<{ links: TocLink[], activeId: string | null }>()
</script>

<template>
  <ol class="space-y-2 text-sm">
    <li v-for="link in links" :key="link.id">
      <a
        :href="`#${link.id}`"
        :class="[
          activeId === link.id
            ? 'text-brand-500 dark:text-brand-400 font-medium'
            : 'text-gray-500 hover:text-gray-900 dark:hover:text-white'
        ]"
      >{{ link.text }}</a>
      <ol v-if="link.children" class="mt-1 ml-4 space-y-1">
        <li v-for="child in link.children" :key="child.id">
          <a :href="`#${child.id}`" :class="activeId === child.id ? 'text-brand-500' : 'text-gray-500'">
            {{ child.text }}
          </a>
        </li>
      </ol>
    </li>
  </ol>
</template>
```

### Pattern 4: IntersectionObserver client-only pour TOC highlight

**What:** Observer les headings h2/h3 dans l'article, surligner le premier heading actuellement visible. SSR-safe car l'init se fait en `onMounted`. `[CITED: mokkapps.de/blog/create-a-table-of-contents-with-active-states-in-nuxt-3]`

**rootMargin recommandé :** `'-20% 0px -70% 0px'` — le heading devient actif quand il entre dans les 20%–30% supérieurs du viewport (sweet spot lecture). UI-SPEC impose cette valeur.

**Example complet (à mettre dans BlogToc.vue) :**
```typescript
<script setup lang="ts">
const props = defineProps<{ links: TocLink[] }>()

const activeId = ref<string | null>(null)
let observer: IntersectionObserver | null = null

onMounted(() => {
  if (typeof window === 'undefined') return

  // Flatten TOC pour inclure les children
  const allIds: string[] = []
  const collect = (links: TocLink[]) => {
    for (const link of links) {
      allIds.push(link.id)
      if (link.children) collect(link.children)
    }
  }
  collect(props.links)

  // Initialiser activeId au premier heading pour SSR-hydration cohérence
  activeId.value = allIds[0] ?? null

  observer = new IntersectionObserver(
    (entries) => {
      // Prendre le premier heading visible dans le "zone active"
      const visible = entries
        .filter((e) => e.isIntersecting)
        .sort((a, b) => a.target.getBoundingClientRect().top - b.target.getBoundingClientRect().top)
      if (visible.length > 0) {
        activeId.value = visible[0].target.id
      }
    },
    { rootMargin: '-20% 0px -70% 0px', threshold: 0 }
  )

  for (const id of allIds) {
    const el = document.getElementById(id)
    if (el) observer.observe(el)
  }
})

onBeforeUnmount(() => {
  observer?.disconnect()
  observer = null
})
</script>
```

**Note hydration :** Si on initialise `activeId.value = null` côté SSR, puis qu'on le met à `allIds[0]` côté client dans `onMounted`, il n'y a PAS de mismatch (l'HTML initial avec `null` est juste pas de highlight, puis au mount on update — update reactive après hydration = comportement normal). Alternative : `initial state = allIds[0]` déjà côté SSR, mais `document.getElementById` n'existe pas côté serveur. Solution simple : laisser `activeId = ref(null)` init, `onMounted` set le premier.

### Pattern 5: Reading time via Nitro hook (recommandé) + fallback composable

**What:** Calcul WORD COUNT au parse de chaque fichier markdown, injecté comme propriété du content object, persisté dans la DB SQLite, queryable via `queryCollection`. `[CITED: content.nuxt.com/docs/advanced/hooks]`

**Pourquoi hook > composable client :** (1) zero compute runtime par requête, (2) cohérent listing ↔ article (même valeur affichée partout), (3) queryable (`.where('minutes', '>', 5)` possible).

**Structure body v3 `type: 'minimal'` :** `[tagName, attributes, ...children]` où children peut être `string` (noeud texte) ou un autre tuple `[tag, attrs, ...]`. `[CITED: github.com/nuxt/content/issues/3072]`

**server/plugins/reading-time.ts :**
```typescript
export default defineNitroPlugin((nitroApp) => {
  nitroApp.hooks.hook('content:file:afterParse', (ctx) => {
    const { file, content } = ctx
    if (!file.id?.endsWith('.md')) return

    const wordCount = countWordsInMinimalBody(content.body)
    content.wordCount = wordCount
    content.minutes = Math.max(1, Math.ceil(wordCount / 200))  // 200 wpm per D-19
  })
})

function countWordsInMinimalBody(body: unknown): number {
  let count = 0
  // body = { type: 'minimal', value: MinimalNode[] }
  // MinimalNode = string | [tag, attrs, ...children]
  const visit = (node: unknown) => {
    if (typeof node === 'string') {
      const trimmed = node.trim()
      if (trimmed) count += trimmed.split(/\s+/).length
      return
    }
    if (Array.isArray(node)) {
      const tag = node[0]
      // Ignorer les blocs de code (le texte des snippets n'est pas "lisible")
      if (tag === 'code' || tag === 'pre') return
      // children = node[2..]
      for (let i = 2; i < node.length; i++) visit(node[i])
    }
  }
  const body_ = body as { type: string, value: unknown[] } | undefined
  if (body_?.value && Array.isArray(body_.value)) {
    for (const n of body_.value) visit(n)
  }
  return count
}
```

**content.config.ts updated :**
```typescript
const blogSchema = z.object({
  title: z.string(),
  description: z.string(),
  date: z.string(),
  tags: z.array(z.string()).optional(),
  image: z.string().optional(),
  draft: z.boolean().optional().default(false),  // D-18
  // Ajoutés par hook — exposés via schema pour queryability
  wordCount: z.number().optional(),
  minutes: z.number().optional(),
})
```

**IMPORTANT :** Les propriétés injectées par hook DOIVENT être déclarées dans le schema Zod pour être visibles via `queryCollection` `[CITED: content.nuxt.com/docs/advanced/hooks]`. Sinon elles existent en DB mais sont strippées au return.

**Composable fallback `app/composables/useReadingTime.ts` :**
```typescript
export function useReadingTime(wordCountOrText: number | string): number {
  if (typeof wordCountOrText === 'number') {
    return Math.max(1, Math.ceil(wordCountOrText / 200))
  }
  const count = wordCountOrText.trim().split(/\s+/).filter(Boolean).length
  return Math.max(1, Math.ceil(count / 200))
}
```
→ Usage template : `{{ t('blog.readingTime', { minutes: article.minutes ?? useReadingTime(article.description) }) }}` (fallback description si hook pas exécuté, ex: dev mode).

### Pattern 6: BlogCard unifié avec variant prop (D-20)

**Pattern :** Un seul composant, deux rendus visuels. Approche déclarative via prop :

```typescript
<script setup lang="ts">
interface BlogCardProps {
  article: {
    path: string
    title: string
    description?: string
    date: string
    tags?: string[]
    image?: string
    minutes?: number
  }
  variant?: 'default' | 'compact'
  direction?: 'prev' | 'next'  // uniquement si variant=compact
}
const props = withDefaults(defineProps<BlogCardProps>(), { variant: 'default' })
const { t, locale } = useI18n()
const localePath = useLocalePath()

const formattedDate = computed(() => {
  try {
    return new Intl.DateTimeFormat(locale.value === 'fr' ? 'fr-FR' : 'en-US', {
      year: 'numeric', month: 'long', day: 'numeric'
    }).format(new Date(props.article.date))
  } catch {
    return props.article.date
  }
})
</script>
```

Templates branchés via `<template v-if="variant === 'default'">` et `<template v-else>` selon UI-SPEC §BlogCard variant contract.

### Anti-Patterns to Avoid

- **`queryCollection(variableName)`** → retourne `{}` silencieusement. Utiliser toujours littéraux avec if/else.
- **`[...slug].vue` catch-all route** + i18n prefix strategy → page resolve `{}` + Vue warn. Toujours single-segment `[slug].vue`.
- **Retirer `i18n.baseUrl`** dans `nuxt.config.ts` → casse `useLocaleHead` (donc les meta tags SEO Phase 7). NE PAS TOUCHER.
- **Ajouter `routeRules: { '/blog/**': { redirect: '/fr/blog' } }`** → casse `detectBrowserLanguage` ET bloque la résolution des slugs. La redirection langue-less se fait EXCLUSIVEMENT via `detectBrowserLanguage.redirectOn: 'no prefix'` (déjà configuré).
- **Utiliser `useState` pour `activeId` TOC** → state partagé global, casse au changement de route. Utiliser `ref` local dans BlogToc.vue.
- **Appeler `document.querySelector` dans `setup()` top-level** → crash SSR. Toujours dans `onMounted`.
- **Filtrer `draft === false` côté client** après `.all()` → gaspille du bandwidth + expose les brouillons dans le payload initial. Filter côté query avec `.where('draft', '=', false)`.
- **Appeler `useIntersectionObserver` de `@vueuse/core`** → pas installé. Soit natif, soit installer `@vueuse/core` comme nouvelle dépendance (refusée).
- **Ne pas unobserve dans `onBeforeUnmount`** → memory leak au navigate entre articles. Toujours `observer.disconnect()`.

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Prev/next articles calculation | Tri manuel par date + index find | `queryCollectionItemSurroundings('blog_fr', path)` | Gère edge cases (null), chaînable avec where/order, type-safe `[CITED: content.nuxt.com]` |
| Date formatting i18n | `const m = ['janvier','février',...]` manuel | `new Intl.DateTimeFormat(locale, { dateStyle: 'long' }).format(new Date(date))` | Native, 100% des locales du monde, zero bug |
| Word count pour reading time | Regex `/\w+/g` sur rawbody string | Hook `content:file:afterParse` + traversal minimal AST ignorant `<code>/<pre>` | Consistance + queryability + cohérence listing/article |
| Breadcrumb UI | Flexbox custom avec séparateurs chevron | `<UBreadcrumb :items="[...]" />` | Nuxt UI v3 officiel, `items` supporte `{ label, to, icon }` + NuxtLink auto `[CITED: ui.nuxt.com/components/breadcrumb]` |
| Drawer mobile TOC | Custom overlay + transition + focus trap | `<UDrawer v-model:open="open" direction="right">` | Nuxt UI v3 gère escape, click-outside, transitions, a11y `[CITED: ui.nuxt.com/components/drawer]` |
| TOC extraction depuis markdown | Regex sur `#` lines | `page.body.toc.links` (auto-généré par @nuxt/content) | Flat + nested depth handled natively |
| Cover image optimization | `<img src="/cover.jpg">` raw | `<NuxtImg :src format="webp" :width :height loading="lazy">` | @nuxt/image déjà installé, WebP auto + lazy + responsive sizes |
| Locale routing | String concat `/\${locale.value}/blog` | `useLocalePath()` | Respecte strategy + fallback + defaultLocale |
| Active route detection | `route.path === '/fr/blog'` string | `aria-current="page"` + `isActive()` pattern AppHeader existant | Pattern du projet déjà établi (AppHeader.vue ligne 25-27) |
| Syntax highlighting blocs code | Custom highlighter | Shiki via `@nuxt/content` (déjà Phase 5, single theme github-dark) | Aucun travail requis — hérité |

**Key insight :** Phase 6 est presque 100% composition. Tout ce qui semble "custom" (TOC, prev/next cards, breadcrumb, cover) a une solution officielle ou un helper auto-importé. Le seul vrai code custom justifié = `BlogCard.vue` (D-20 variant) et `BlogToc.vue` (layout sticky+drawer unifié custom hors du design Nuxt UI par D-05).

## Runtime State Inventory

Phase 6 ≠ rename/refactor/migration. **Section non applicable.** Les seuls side-effects runtime sont :

- **SQLite @nuxt/content** : schema étendu (ajout colonnes `draft`, `wordCount`, `minutes`) → auto-rebuild de la DB par @nuxt/content à la prochaine `nuxt dev` / `nuxt build`. Aucune migration manuelle.
- **Build artifacts** : `node_modules/.cache/content/` contient la DB SQLite buildée — supprimer en cas d'incohérence post-schema-change (`rm -rf node_modules/.cache`).

## Common Pitfalls

### Pitfall 1: `queryCollection` variable → collection vide silencieusement
**What goes wrong:** Aucune erreur au runtime, les articles n'apparaissent simplement pas (array vide). Impossible à diagnostiquer si on ne connaît pas le piège.
**Why it happens:** Le plugin Vite de @nuxt/content parse le code source statiquement pour extraire les noms de collections et les pré-compiler dans la DB. Il ne fait pas de type-flow analysis runtime.
**How to avoid:** **TOUJOURS** brancher en if/else isFr avec deux littéraux string. Jamais de ternaire ou variable.
**Warning signs:** Dev tools Network tab montre un fetch content réussi mais vide. Le dev mode log peut afficher un warn `Could not resolve collection variable`.

### Pitfall 2: Hydration mismatch si activeId initialisé différemment SSR vs client
**What goes wrong:** Vue warn `Hydration text mismatch` ou `Hydration class mismatch` sur le premier heading de la TOC au chargement article.
**Why it happens:** Si on met `activeId.value = 'first-heading-id'` en synchrone (même dans `ref()`), ça fait partie du render SSR, mais côté client il n'y a pas encore de heading dans le DOM à observer, donc re-render = mismatch.
**How to avoid:** `activeId = ref<string | null>(null)` initial. `onMounted` set la valeur après IntersectionObserver setup. Le premier heading devient visuellement actif après ~1 frame.
**Warning signs:** Console warnings au premier mount d'un article, TOC highlight flash.

### Pitfall 3: Breadcrumb avec label dynamique côté serveur vs hydration
**What goes wrong:** `UBreadcrumb items` avec `{ label: page.title }` fonctionne SSR, mais au changement de langue sans reload → l'item reste stale si pas watché.
**Why it happens:** `useAsyncData` ne re-fetch pas automatiquement au changement de `locale` si `watch` non déclaré.
**How to avoid:** Ajouter `{ watch: [locale] }` dans les `useAsyncData` pour listing ET article ET surround. Invalider la key avec locale : `useAsyncData(\`blog-\${locale.value}-\${slug}\`, …)`.
**Warning signs:** Switch FR/EN recharge partiellement la page mais titre/breadcrumb anciens.

### Pitfall 4: `surround[0]` vs `surround[1]` sémantique en order DESC
**What goes wrong:** Labels "Article précédent" et "Article suivant" pointent vers les mauvais articles. UX cassée.
**Why it happens:** `queryCollectionItemSurroundings` retourne `[before, after]` dans l'ORDRE DE LA COLLECTION. En `.order('date', 'DESC')`, "before" = article plus récent (vient avant dans la liste descendante). D-12 impose "Article précédent = plus ancien" (sémantique blog classique).
**How to avoid:** Mapper `prev (ancien) = surround[1]`, `next (récent) = surround[0]`. OU renverser en `.order('date', 'ASC')` et mapper direct. **À tester en implémentation sur l'article du milieu avec 3 articles seed.**
**Warning signs:** Les fleches vont "à l'envers" au navigate entre articles.

### Pitfall 5: Schema properties non déclarées dans Zod → strippées
**What goes wrong:** Hook `content:file:afterParse` pose `content.minutes = 5`, mais `queryCollection(...).first().minutes === undefined`.
**Why it happens:** @nuxt/content v3 valide le return de queryCollection contre le Zod schema. Les propriétés extra sont drop silencieusement.
**How to avoid:** Déclarer `wordCount: z.number().optional()` + `minutes: z.number().optional()` dans `blogSchema`. `optional()` permet de ne pas casser sur les fichiers existants sans hook (ex: en dev hot-reload avant hook rerun).
**Warning signs:** Reading time affiche `undefined min de lecture`.

### Pitfall 6: Accessibilité cards avec NuxtLink absolute inset-0
**What goes wrong:** `<a>` imbriqués ou conflicts de focus quand la card contient d'autres `<a>` (ex: tags cliquables futur).
**Why it happens:** Pattern ProjectCard.vue utilise `<NuxtLink class="absolute inset-0">` par dessus tout. OK tant que rien d'autre n'est cliquable. Tags UBadge non-cliquables (D-02) → safe. MAIS si quelqu'un rend UBadge `:to="..."` plus tard, conflit.
**How to avoid:** Garder tags en `<span>` (pas UBadge `to` prop). Commenter dans BlogCard.vue : "Tags non-cliquables (D-02 Phase 6) — si cliquables ajoutés plus tard, retirer absolute inset-0 NuxtLink et revoir le focus order".
**Warning signs:** Screen readers lisent le titre deux fois, tab focus saute le lien principal.

### Pitfall 7: Empty state affichage quand TOUS les articles sont draft
**What goes wrong:** `/blog` rend "Bientôt des articles Hytale" alors qu'il y a 1 article test (test-kotlin-syntax.md) mais avec `draft: true`. Comportement correct mais surprenant en dev.
**Why it happens:** D-14 impose `draft: true` sur le test article → après filter `draft = false`, tableau vide → empty state.
**How to avoid:** Rien à fixer — comportement voulu. Pour valider le listing en dev, créer un article seed sans `draft` (pas dans le scope Phase 6, mais noter pour Phase 8 ou dans un article "welcome" minimal).
**Warning signs:** Dev test visuel `/fr/blog` sans articles réels → confusion possible.

## Code Examples

Patterns complets vérifiés pour copie directe par le planner.

### Page listing `/blog/index.vue` (skeleton)

```vue
<script setup lang="ts">
const { t, locale } = useI18n()
const localePath = useLocalePath()
const isFr = computed(() => locale.value === 'fr')

// useAsyncData avec key incluant locale pour refetch au switch
const { data: articles } = await useAsyncData(
  `blog-list-${locale.value}`,
  () => isFr.value
    ? queryCollection('blog_fr').where('draft', '=', false).order('date', 'DESC').all()
    : queryCollection('blog_en').where('draft', '=', false).order('date', 'DESC').all(),
  { watch: [locale] }
)

// Stats computed
const totalArticles = computed(() => articles.value?.length ?? 0)
const uniqueTags = computed(() => {
  const set = new Set<string>()
  for (const a of articles.value ?? []) {
    for (const t of a.tags ?? []) set.add(t)
  }
  return set.size
})
const totalLanguages = 2  // FR + EN fixe

useSeoMeta({
  title: () => t('seo.blog.title', t('blog.title')),  // fallback blog.title si seo key manquante (Phase 7 enrichira)
  description: () => t('blog.subtitle'),
})
</script>

<template>
  <div>
    <!-- Hero (pattern projects.vue L56-83) -->
    <section class="relative pt-20 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <!-- background gradient identical /projects -->
      <div class="relative z-10 max-w-7xl mx-auto text-center">
        <span class="font-mono text-sm text-brand-500 dark:text-brand-400 tracking-wider">// blog</span>
        <h1 class="text-4xl sm:text-5xl lg:text-6xl font-bold mt-3 mb-5 bg-gradient-to-r …">{{ t('blog.title') }}</h1>
        <p class="text-lg sm:text-xl text-gray-500 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
          {{ t('blog.subtitle') }}
        </p>
        <!-- Stats 3× (articles / tags / languages) -->
      </div>
    </section>

    <!-- Grid or Empty state -->
    <section class="py-16 md:py-20 px-4 sm:px-6 lg:px-8">
      <div class="max-w-7xl mx-auto">
        <div v-if="articles && articles.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
          <BlogCard v-for="a in articles" :key="a.path" :article="a" variant="default" />
        </div>
        <div v-else class="text-center py-32">
          <!-- UI-SPEC empty state contract -->
          <UIcon name="i-lucide-book-open" class="..." />
          <h3>{{ t('blog.emptyState.title') }}</h3>
          <p>{{ t('blog.emptyState.description') }}</p>
          <UButton color="primary" variant="solid" icon="i-lucide-mail" :to="localePath('/contact')">
            {{ t('blog.emptyState.cta') }}
          </UButton>
        </div>
      </div>
    </section>
  </div>
</template>
```

### Page article `/blog/[slug].vue` (enrichment skeleton)

```vue
<script setup lang="ts">
const { t, locale } = useI18n()
const localePath = useLocalePath()
const route = useRoute()
const isFr = computed(() => locale.value === 'fr')
const slug = route.params.slug as string
const path = computed(() => isFr.value ? `/fr/blog/${slug}` : `/en/blog/${slug}`)

// 1. Article principal
const { data: page } = await useAsyncData(
  `blog-${locale.value}-${slug}`,
  () => isFr.value
    ? queryCollection('blog_fr').path(path.value).first()
    : queryCollection('blog_en').path(path.value).first(),
  { watch: [locale] }
)

if (!page.value) {
  throw createError({ statusCode: 404, statusMessage: 'Article introuvable' })
}

// 2. Surrounding prev/next (seconde query — OK, même useAsyncData)
const { data: surround } = await useAsyncData(
  `blog-surround-${locale.value}-${slug}`,
  () => isFr.value
    ? queryCollectionItemSurroundings('blog_fr', path.value, {
        fields: ['title', 'description', 'date', 'image', 'path', 'minutes']
      }).where('draft', '=', false).order('date', 'DESC')
    : queryCollectionItemSurroundings('blog_en', path.value, {
        fields: ['title', 'description', 'date', 'image', 'path', 'minutes']
      }).where('draft', '=', false).order('date', 'DESC'),
  { watch: [locale] }
)

// D-12 en order DESC : surround[0] = récent (nouveau), surround[1] = ancien (ancien)
// UI "Article précédent" (plus ancien) = surround[1], "Article suivant" (plus récent) = surround[0]
const nextArticle = computed(() => surround.value?.[0] ?? null)  // récent
const prevArticle = computed(() => surround.value?.[1] ?? null)  // ancien

// Breadcrumb items
const breadcrumbItems = computed(() => [
  { label: t('nav.home'), to: localePath('/'), icon: 'i-lucide-home' },
  { label: t('nav.blog'), to: localePath('/blog') },
  { label: page.value!.title },
])

// Minimal SEO (Phase 7 enrichira avec JSON-LD + og:image)
useSeoMeta({
  title: () => page.value?.title,
  description: () => page.value?.description,
  ogTitle: () => page.value?.title,
  ogDescription: () => page.value?.description,
})

// Date formattée i18n
const formattedDate = computed(() => {
  if (!page.value?.date) return ''
  return new Intl.DateTimeFormat(isFr.value ? 'fr-FR' : 'en-US', {
    year: 'numeric', month: 'long', day: 'numeric',
  }).format(new Date(page.value.date))
})

const tocDrawerOpen = ref(false)
</script>

<template>
  <div class="max-w-7xl mx-auto px-4 py-12">
    <!-- Breadcrumb -->
    <UBreadcrumb :items="breadcrumbItems" class="mb-6 text-sm" />

    <div class="lg:grid lg:grid-cols-[1fr_16rem] lg:gap-12">
      <!-- Main column -->
      <div class="max-w-3xl mx-auto lg:mx-0">
        <!-- Header -->
        <header class="mb-8">
          <h1 class="text-3xl sm:text-4xl font-bold mb-4">{{ page?.title }}</h1>
          <div class="flex flex-wrap items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
            <time :datetime="page?.date" class="font-mono">{{ formattedDate }}</time>
            <span>·</span>
            <span>{{ t('blog.readingTime', { minutes: page?.minutes ?? 1 }) }}</span>
            <!-- UButton trigger drawer mobile only -->
            <UButton
              class="lg:hidden ml-auto"
              variant="ghost" color="neutral" size="sm"
              icon="i-lucide-list"
              :aria-label="t('a11y.blogTocToggle')"
              @click="tocDrawerOpen = true"
            >{{ t('blog.toc.title') }}</UButton>
          </div>
          <div v-if="page?.tags?.length" class="flex flex-wrap gap-2 mt-4">
            <UBadge v-for="tag in page.tags" :key="tag" color="primary" variant="subtle">{{ tag }}</UBadge>
          </div>
          <NuxtImg
            v-if="page?.image"
            :src="page.image"
            :alt="page.title"
            format="webp"
            loading="eager"
            class="w-full aspect-[21/9] object-cover rounded-2xl mt-8 mb-12"
          />
        </header>

        <!-- Body -->
        <article class="prose dark:prose-invert max-w-none">
          <ContentRenderer v-if="page" :value="page" />
        </article>

        <!-- Prev/Next -->
        <BlogPrevNext :prev="prevArticle" :next="nextArticle" class="mt-16" />
      </div>

      <!-- TOC desktop -->
      <aside class="hidden lg:block">
        <BlogToc
          v-if="page?.body?.toc?.links?.length"
          :links="page.body.toc.links"
          class="sticky top-24"
        />
      </aside>
    </div>

    <!-- TOC drawer mobile -->
    <UDrawer v-model:open="tocDrawerOpen" direction="right" :title="t('blog.toc.title')">
      <template #body>
        <BlogToc
          v-if="page?.body?.toc?.links?.length"
          :links="page.body.toc.links"
          @select="tocDrawerOpen = false"
        />
      </template>
    </UDrawer>
  </div>
</template>
```

### UBreadcrumb items shape (reference)

```typescript
import type { BreadcrumbItem } from '@nuxt/ui'
// BreadcrumbItem = { label?, icon?, avatar?, to?, target?, class?, ui? }
```
`[CITED: ui.nuxt.com/docs/components/breadcrumb]`

### Extension schema `content.config.ts`

```typescript
import { defineContentConfig, defineCollection, z } from '@nuxt/content'

const blogSchema = z.object({
  title: z.string(),
  description: z.string(),
  date: z.string(),
  tags: z.array(z.string()).optional(),
  image: z.string().optional(),
  draft: z.boolean().optional().default(false),        // D-18
  wordCount: z.number().optional(),                    // hook-injected
  minutes: z.number().optional(),                      // hook-injected (reading time)
})

export default defineContentConfig({
  collections: {
    blog_fr: defineCollection({
      type: 'page',
      source: { include: 'fr/blog/**/*.md', prefix: '/fr/blog' },
      schema: blogSchema,
    }),
    blog_en: defineCollection({
      type: 'page',
      source: { include: 'en/blog/**/*.md', prefix: '/en/blog' },
      schema: blogSchema,
    }),
  },
})
```

## State of the Art

| Old Approach (v2) | Current Approach (v3) | When Changed | Impact |
|-------------------|-----------------------|--------------|--------|
| `queryContent('/blog').findSurround()` | `queryCollectionItemSurroundings('blog', path)` | v3 release | Retour `[prev \| null, next \| null]`, chaînable (where/order) `[CITED: masteringnuxt.com upgrade guide]` |
| `queryContent().where({ draft: { $ne: true } })` | `queryCollection('blog').where('draft', '=', false)` | v3 release | Syntax SQL-like au lieu de Mongo-like `[CITED: content.nuxt.com/docs/utils/query-collection]` |
| Body = unist AST (`file.body.children[].type`) | Body = minimal tuples (`[tag, attrs, ...children]`) | v3 release | `unist-util-visit` ne fonctionne plus — traversal récursif custom requis `[CITED: github.com/nuxt/content/issues/3072]` |
| `_draft`, `_partial` underscore fields | `draft` direct field | v3 release | Schema Zod à jour. Les pages draft peuvent être opt-in via `.where('draft','=', false)` sans underscore |
| `<NuxtContent :document="doc">` | `<ContentRenderer :value="page">` | v3 release | Pattern déjà adopté Phase 5, inchangé |

**Deprecated/outdated :**
- `@vueuse/core useIntersectionObserver` serait sur-kill pour un seul usage : natif suffit. Non-deprecated mais sous-optimal ici.
- `@nuxt/content` v2 syntax — ne plus référencer dans les docs projet.

## Environment Availability

| Dependency | Required By | Available | Version | Fallback |
|------------|------------|-----------|---------|----------|
| `@nuxt/content` | queryCollection, ContentRenderer, Shiki, page.body.toc | ✓ | `^3.13.0` `[VERIFIED: package.json]` | — |
| `@nuxt/ui` | UBreadcrumb, UDrawer, UBadge, UButton, UIcon | ✓ | `^3.3.2` | — |
| `@nuxt/image` | NuxtImg cover listing + article | ✓ | `^2.0.0` | — |
| `@nuxtjs/i18n` | useI18n, useLocalePath, locale watching | ✓ | `^10.2.4` | — |
| `@tailwindcss/typography` | prose styling body article | ✓ | `^0.5.19` | — |
| `@iconify-json/lucide` | icônes UIcon `i-lucide-*` | ✓ | `^1.2.102` | — |
| `zod` | schema collections (draft, wordCount, minutes) | ✓ | `^4.3.6` | — |
| Shiki (intégré) | Syntax highlight blocs code | ✓ (via @nuxt/content) | `github-dark` theme unique | — |
| SQLite native | @nuxt/content DB runtime | ✓ (via `experimental.sqliteConnector: 'native'`) | — | `better-sqlite3` (fallback auto par module) |
| `@vueuse/core` | IntersectionObserver wrapper | ✗ | — | IntersectionObserver natif (fallback retenu, pas d'install) |
| Node 22 | Runtime build | ✓ assumed per Dockerfile | 22 | — |
| pnpm | Package manager | ✓ assumed per CI/Docker | 10+ | — |

**Missing dependencies with no fallback :** NONE — tout le stack requis est présent.

**Missing dependencies with fallback :** `@vueuse/core` absent → IntersectionObserver natif (25 lignes dans BlogToc.vue, sans install).

## Validation Architecture

> `workflow.nyquist_validation: false` dans `.planning/config.json` `[VERIFIED: config.json]` — section **SKIPPED** par directive de config. Le projet a sciemment opté pour un flow manuel Phase 5 qui a bien marché (checkpoint visuel humain). Phase 6 suit la même approche.

## Security Domain

> `security_enforcement` non présent dans `.planning/config.json`. Par défaut enabled. Phase 6 est **content read-only** (aucun formulaire, aucun user input, aucune upload, aucune auth). Le security footprint est minimal.

### Applicable ASVS Categories

| ASVS Category | Applies | Standard Control |
|---------------|---------|-----------------|
| V2 Authentication | no | — |
| V3 Session Management | no | — |
| V4 Access Control | no | Routes blog publiques |
| V5 Input Validation | yes (partiel) | **Zod schema `blogSchema`** valide frontmatter à l'ingestion content `[VERIFIED: content.config.ts]`. Pas d'input utilisateur runtime — les seuls inputs sont les MD files au build |
| V6 Cryptography | no | — |
| V7 Error Handling | yes | `throw createError({ statusCode: 404 })` sur slug introuvable — déjà appliqué Phase 5 `[VERIFIED: [slug].vue L15-17]` |
| V8 Data Protection | no | Pas de PII |
| V11 Business Logic | no | Pas de logique métier sensible |
| V14 Configuration | yes (partiel) | `i18n.baseUrl` + `detectBrowserLanguage` déjà protégés contre redirect abuse par module officiel |

### Known Threat Patterns for Nuxt 4 + @nuxt/content blog

| Pattern | STRIDE | Standard Mitigation |
|---------|--------|---------------------|
| XSS via markdown content | Tampering | @nuxt/content + MDC sanitize par défaut. Le seul vecteur serait un composant MDC custom qui `v-html` sans escape. **Vérifier que les composants content/*.vue existants (Phase 5) n'utilisent pas `v-html`.** |
| Open Redirect via breadcrumb/link manipulation | Spoofing | Tous les liens passent par `localePath()` qui ne résout que les routes connues. Pas de `?redirect=` pattern dans cette phase. |
| Arbitrary path traversal via slug | Tampering | Route `[slug].vue` single-segment interdit les `/` dans slug → pas d'escape vers `/etc/passwd`. `queryCollection().path()` accepte seulement paths de la DB pré-buildée. |
| Render DoS via markdown géant | DoS | Reading-time hook protège partiellement (log warning si wordCount > 10k possible à ajouter en enhancement). Cover image optim via @nuxt/image (limites width/height). |
| Content injection via frontmatter non validé | Tampering | Zod schema strict sur tous les champs. Les keys extras non déclarées sont droppées par Zod. |

**Aucune action security critique requise pour Phase 6.** Les contrôles existent déjà ou sont inhérents au stack Nuxt officiel.

## Assumptions Log

| # | Claim | Section | Risk if Wrong |
|---|-------|---------|---------------|
| A1 | `queryCollectionItemSurroundings` avec `.order('date','DESC')` retourne `[0]=article_avant_dans_ordre_DESC`, `[1]=article_après` → mapping UI : prev(ancien)=`surround[1]`, next(récent)=`surround[0]` | Pattern 2 + Pitfall 4 | UX cassée (fleches inversées). **Vérifier empiriquement au premier test manuel avec 3 articles seed.** Mitigation : tester en dev, inverser si besoin. Trivial à fixer. |
| A2 | La prop `direction="right"` de UDrawer v3 remplace l'ancienne `side="right"` (suivant doc) | Pattern UDrawer | Si `direction` rejeté, fallback sur `side`. Warning console. Fix 1 ligne. `[CITED: ui.nuxt.com/components/drawer]` indique `direction`, confiance HIGH. |
| A3 | Le hook Nitro `content:file:afterParse` se déclenche en dev ET build pour chaque MD parsé | Pattern 5 | Si ne se déclenche qu'au build : reading-time manquant en dev. Fallback : composable `useReadingTime(page.description || fallback)` côté client. |
| A4 | La propriété `page.body.toc.links` est présente même si l'article n'a pas de h2/h3 (array vide `[]` vs `undefined`) | Pattern 3 | Si undefined, `v-if="page.body.toc.links?.length"` handle déjà le cas. Zero risk. |
| A5 | L'ordre des modules (`@nuxtjs/sitemap` AVANT `@nuxt/content`) nécessaire pour Phase 7, non requis pour Phase 6 | Phase 7 preview | Hors scope Phase 6. Juste un heads-up pour planner Phase 7. |
| A6 | `package.json` sur cette machine reflète l'état réel de `node_modules` (pnpm install à jour) | Standard Stack | Si versions divergent, risque incompatibilité API. Mitigation : `pnpm install --frozen-lockfile` au début de l'exec phase. |
| A7 | Le Vite extractor de @nuxt/content bloque SEULEMENT les variables, pas les const-inlined literals | Anti-Patterns | Conservative : toujours if/else littéral, jamais de ternaire même avec const. |

**Total:** 7 assumptions mineures, toutes low-risk, toutes mitigeables en implémentation (tests empiriques). Aucune ne bloque le planning.

## Open Questions

1. **BlogCard unique avec variant prop : template conditionnel inline OU 2 sous-composants ?**
   - What we know: D-20 impose composant unique nommé BlogCard.vue avec variants default/compact.
   - What's unclear: Template `v-if="variant === 'default'"` dans un seul `<template>` vs `<component :is="variant === 'default' ? DefaultTpl : CompactTpl" />` avec 2 sous-composants privés.
   - Recommendation: Template v-if inline (simplicité, 1 fichier). Maintainable tant qu'on ne dépasse pas 2 variants. Si un 3ème variant émerge, refactor vers sous-composants.

2. **BlogToc : émettre un événement `select` pour fermer le drawer mobile, ou faire gérer par le parent via watch sur `activeId` ?**
   - What we know: UDrawer doit se fermer quand l'utilisateur clique un item dans le drawer mobile.
   - What's unclear: Pattern événementiel (emit) OU pattern reactif (parent watch).
   - Recommendation: `emit('select', id)` au click de `<a>` → simple et explicite. Pattern Vue idiomatic.

3. **Stats hero : `uniqueTags.length` calculé côté client ou exposé par une meta collection ?**
   - What we know: Stat 2 = tags uniques de la collection.
   - What's unclear: Soit computed sur `articles.value` côté page listing (dépend de `.all()` déjà fetché — OK), soit requête séparée dédiée.
   - Recommendation: Computed sur articles déjà fetchés — zero overhead, une seule source of truth.

4. **Locale watching : `watch: [locale]` dans chaque `useAsyncData` OU recomputer manuel ?**
   - What we know: Au switch de langue, les articles doivent re-fetch avec la bonne collection.
   - What's unclear: Impact perf du watch sur 3 queries simultanées.
   - Recommendation: `watch: [locale]` — pattern Nuxt canonique, négligeable en perf (un event switch locale = rare).

5. **Empty state affiche-t-il quand même le Hero avec stats = 0 ?**
   - What we know: UI-SPEC §Empty state est dans une section séparée du hero.
   - What's unclear: Le hero reste visible (stats 0/0/2) OU tout le layout passe en empty state ?
   - Recommendation: Hero TOUJOURS rendu (D-04 implique identité visuelle de la page). Empty state dans la section grid uniquement. Stats 0, 0, 2 restent cohérentes sémantiquement.

## Sources

### Primary (HIGH confidence)
- `@nuxt/content` v3 docs — queryCollection : https://content.nuxt.com/docs/utils/query-collection
- `@nuxt/content` v3 docs — queryCollectionItemSurroundings : https://content.nuxt.com/docs/utils/query-collection-item-surroundings
- `@nuxt/content` v3 docs — hooks : https://content.nuxt.com/docs/advanced/hooks
- Nuxt UI v3 docs — UBreadcrumb : https://ui.nuxt.com/docs/components/breadcrumb (items shape { label, icon, to, avatar, slot, class, ui })
- Nuxt UI v3 docs — UDrawer : https://ui.nuxt.com/docs/components/drawer (direction prop, v-model:open, dismissible)
- Nuxt UI v3 docs — UContentToc : https://ui.nuxt.com/docs/components/content-toc (mentionné en alternative non retenue)
- Nuxt UI v3 docs — UContentSurround : https://ui.nuxt.com/docs/components/content-surround (mentionné en alternative non retenue)
- `package.json` et `content.config.ts` locaux — pinning de versions et schema actuel `[VERIFIED]`
- Phase 5 artifacts : `05-CONTEXT.md`, `05-02-SUMMARY.md`, `STATE.md` Gotchas — pièges éprouvés

### Secondary (MEDIUM confidence)
- Mokkapps IntersectionObserver Nuxt 3 TOC pattern : https://mokkapps.de/blog/create-a-table-of-contents-with-active-states-in-nuxt-3
- DamienG reading time Nuxt Content : https://damieng.com/blog/2023/02/07/reading-time-with-nuxt3-content/
- Mastering Nuxt v2 → v3 upgrade guide : https://masteringnuxt.com/blog/upgrading-from-nuxt-content-v2-to-v3
- Nuxt SEO guide Content integration : https://nuxtseo.com/docs/nuxt-seo/guides/nuxt-content

### Tertiary (LOW confidence — à valider)
- GitHub discussion #3072 sur `type: 'minimal'` body structure : https://github.com/nuxt/content/issues/3072 (auteur souligne que les types minimal sont "purely internal" et pas exposés — API pourrait évoluer).

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH — toutes versions verified dans `package.json`, docs officielles consultées
- Architecture: HIGH — patterns éprouvés Phase 5 + APIs officielles documentées
- Pitfalls: HIGH — 4/7 pitfalls viennent d'expérience Phase 5 réelle (queryCollection literal, catch-all, hydration, schema Zod). 3/7 sont cités depuis docs officielles.
- Reading time impl: MEDIUM — hook `content:file:afterParse` documenté officiellement, mais la structure body `minimal` en v3 est "internal" — traversal custom validé empiriquement recommandé avant prod.
- Surround mapping (A1): MEDIUM — doc officielle donne le return shape mais pas la sémantique exacte selon `order()`. À valider au premier test.

**Research date:** 2026-04-22
**Valid until:** 2026-05-22 (~30 jours — @nuxt/content v3.13 est stable, changements breaking peu probables). Au-delà, re-vérifier `queryCollectionItemSurroundings` shape et `page.body.toc.links` format en cas de bump majeur.
