# Phase 6: Blog Pages - Context

**Gathered:** 2026-04-22
**Status:** Ready for planning

<domain>
## Phase Boundary

Construire les deux pages SSR bilingues qui composent l'expérience blog :

1. **Listing `/blog`** (nouveau) — grille d'articles publiés avec hero de page, tri chronologique descendant, cards riches (titre, description, date, tags, image cover, reading time).
2. **Article `/blog/[slug]`** (amélioration de l'existant phase 5) — ajout d'un chrome complet : header riche (titre, date, tags, cover hero, reading time, breadcrumb visuel), TOC sidebar sticky avec highlight au scroll + drawer mobile, navigation prev/next en bas via cards riches.

Hors scope de cette phase (→ autres phases) : JSON-LD `Article`, `useSeoMeta` enrichi par article, `og:image` par article, sitemap étendu, `BreadcrumbList` structured data (Phase 7). Articles Hytale réels et cocon sémantique blog ↔ /hytale (Phase 8). Recherche full-text, filtres cliquables, pagination (hors roadmap — backlog).

</domain>

<decisions>
## Implementation Decisions

### Layout listing `/blog`
- **D-01:** Format = grille de cards (1 col mobile, 2 col tablet, 3 col desktop). Même pattern visuel que `/projects` (ProjectCard) — cohérence du site.
- **D-02:** Infos par card = titre (h2) + description tronquée + date formatée i18n + tags (UBadge, non-cliquables) + image cover (si frontmatter `image`) + reading time ("X min de lecture" / "X min read").
- **D-03:** Fallback image cover = aucun (pas d'image si `image` absent du frontmatter). Pas de placeholder branded générique — cards homogènes visuellement même sans image, incite l'auteur à fournir une image pour les articles importants.
- **D-04:** Hero section en haut de `/blog` = pattern `/projects` (slogan `// blog`, H1 gradient, subtitle, stats total articles + total tags uniques). Coche avec la charte existante.

### Chrome article `/blog/[slug]`
- **D-05:** TOC = sidebar sticky à droite sur desktop (≥lg), drawer mobile déclenché par bouton "Sommaire" sur <lg. Génération depuis `page.body.toc` (@nuxt/content expose auto les headings). Pas de TOC inline au-dessus du body.
- **D-06:** Highlight du heading courant dans la TOC au scroll via `IntersectionObserver` — heading visible surligné `text-brand-500`. Implémentation client-only, hydrate proprement après SSR.
- **D-07:** Header article (au-dessus du body markdown) = **tout** le combo : titre H1, date formatée i18n, tags badges (UBadge), image cover hero (si frontmatter `image`, aspect 21/9 ou 16/9 pleine largeur), reading time, breadcrumb visuel (Accueil → Blog → Titre) via UBreadcrumb Nuxt UI. Le JSON-LD BreadcrumbList viendra en Phase 7 — Phase 6 = visuel uniquement.
- **D-08:** Largeur max body markdown = `max-w-3xl` (~768px), confirmer l'existant. Wrapper `prose dark:prose-invert` de Phase 5 conservé tel quel.

### Nav prev/next en bas d'article
- **D-09:** Style = cards riches côte à côte (titre de l'article cible + date + icon flèche + label "Article précédent" / "Article suivant"). Fond subtil, hover bg-brand. Pattern docs Nuxt / Stripe.
- **D-10:** Pas d'image cover dans ces cards (fallback image non décidé, cohérent avec D-03).
- **D-11:** Helper utilisé = `surround()` de @nuxt/content — `queryCollection('blog_fr').path(currentPath).surround()`. Zero logique de tri custom.
- **D-12:** Ordre = date frontmatter descendant. Plus récent en haut du listing, "Article précédent" = plus ancien. Nécessite `date` fiable (schéma actuel le requiert déjà).
- **D-13:** Edge cases (pas de voisin) = afficher seul le lien existant. Cards alignées, la case absente reste vide. Pas de fallback vers `/blog`.

### Visibilité blog & article de test
- **D-14:** `content/{fr,en}/blog/test-kotlin-syntax.md` = ajouter `draft: true` dans le frontmatter. Schéma `blog_fr`/`blog_en` à étendre dans `content.config.ts` avec `draft: z.boolean().optional().default(false)`. Toutes les queries (listing, surround, [slug] direct) filtrent `draft: false`. Article reste accessible par URL directe pour les tests internes si besoin.
- **D-15:** Ajouter un lien "Blog" dans `AppHeader.vue` entre "Hytale" et "Projects". Ordre final nav : Home / Hytale / Blog / Projects / About / Contact / Fiverr. Le blog est un levier SEO — à rendre découvrable prioritairement.
- **D-16:** Empty state listing `/blog` (0 article non-draft) = message "Bientôt des articles Hytale" / "Hytale articles coming soon" + icône lucide + CTA `UButton` vers `/contact`. Pattern similaire à `/projects` noResults. Non-bloquant, professionnel.
- **D-17:** Structure URLs finale = `/fr/blog`, `/en/blog` (listings), `/fr/blog/[slug]`, `/en/blog/[slug]` (articles). Pas de changement vs Phase 5. `/blog` sans préfixe → 302 via `detectBrowserLanguage` (déjà configuré). Pas d'alias `/articles`.

### Additions techniques requises
- **D-18:** Étendre le schéma Zod dans `content.config.ts` : ajouter `draft: z.boolean().optional().default(false)` sur `blogSchema`.
- **D-19:** Créer un composable `useReadingTime(content: string): number` (200 mots/min) ou utiliser `page.body.toc` + word count helper — à décider en research/planning.
- **D-20:** Composant unique `BlogCard.vue` réutilisé par le listing ET les cards prev/next (variant prop pour adapter le rendu).
- **D-21:** i18n : ajouter les clés `blog.*` (title, subtitle, stats, emptyState, readingTime, prevArticle, nextArticle, toc, backToBlog, breadcrumb) dans `i18n/locales/fr.json` et `en.json`. Ainsi que `nav.blog` + `a11y.blogTocToggle`.

### Claude's Discretion
- Nom exact du composable reading time (`useReadingTime`, `useArticleMeta` …)
- Structure interne du composant TOC (`BlogToc.vue`) : sticky container, drawer composition (UDrawer vs custom `<details>`)
- Format exact de la date i18n (`Intl.DateTimeFormat` avec locale / style `long`)
- Classes Tailwind exactes du hero cover image (aspect-[21/9] vs aspect-[16/9])
- Emplacement exact du breadcrumb (au-dessus du titre vs sous la nav vs inside header)

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Requirements & roadmap
- `.planning/REQUIREMENTS.md` §BLOG-02, BLOG-03, BLOG-06 — success criteria exacts
- `.planning/ROADMAP.md` Phase 6 — goal, dependencies, success criteria

### Décisions héritées Phase 5 (à respecter tel quel)
- `.planning/phases/05-nuxt-content-setup-renderer/05-CONTEXT.md` §D-01..D-04 — prose Tailwind, MDC callouts, structure content/, Shiki github-dark
- `.planning/phases/05-nuxt-content-setup-renderer/05-02-SUMMARY.md` — gotchas (Alert SVG inline, ProseImg `<span class="block">`, Shiki single theme, [slug].vue single-segment)
- `.planning/STATE.md` §Gotchas Phase 5 — pièges i18n `prefix` strategy + queryCollection littéral obligatoire

### Stack existant à étendre (NE PAS réécrire)
- `content.config.ts` — collections `blog_fr`/`blog_en`, schéma Zod à étendre avec `draft`
- `nuxt.config.ts` — config `content`, `i18n` (prefix strategy, baseUrl, detectBrowserLanguage), `routeRules` (aucune sur `/blog/**` — déjà nettoyée phase 5)
- `app/pages/blog/[slug].vue` — page actuelle minimale (post-phase 5) à enrichir avec TOC, header riche, prev/next
- `app/pages/projects.vue` — référence de pattern pour hero listing + grille + empty state
- `app/components/ProjectCard.vue` — référence de pattern pour BlogCard
- `app/components/layout/AppHeader.vue` — ajout du lien "Blog"
- `app/components/content/*.vue` — MDC components phase 5 (Alert, ProseImg, ProsePre, Columns, Details, Badge, Video, Clear) — réutilisés par ContentRenderer

### Localisation
- `i18n/locales/fr.json` et `i18n/locales/en.json` — ajouter les clés `blog.*`, `nav.blog`, `a11y.blogTocToggle`

### Documentation externe
- `@nuxt/content` v3 docs : https://content.nuxt.com/docs/utils/query-collection — `queryCollection`, `surround()`, `order()`, filter patterns
- `@nuxt/content` v3 docs : https://content.nuxt.com/docs/components/content-renderer — page.body.toc structure
- `@nuxtjs/i18n` v10 : https://i18n.nuxtjs.org — `useLocalePath`, `useLocaleRoute`, `switchLocalePath`
- Nuxt UI v3 : https://ui.nuxt.com/components — UBreadcrumb, UBadge, UDrawer, UButton, UIcon
- Nuxt Image : https://image.nuxt.com — NuxtImg avec preset (déjà configuré)

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- **ProjectCard.vue** — pattern de card existant (hover effects, shadow, rounded, dark/light). BlogCard.vue doit s'en inspirer pour cohérence visuelle.
- **`useI18n()` + `useLocalePath()`** — pattern déjà établi dans tous les composants pour routage i18n + strings traduits.
- **`useSeoMeta()`** — déjà appelé dans `[slug].vue` (minimal phase 5). À enrichir en Phase 7.
- **MDC components `app/components/content/*`** — auto-importés par @nuxt/content via `pathPrefix: false`. Utilisables dans les articles markdown et réutilisables dans les templates si pertinent.
- **`colorMode()` cookie-based** — SSR-safe. TOC highlight peut s'adapter au dark/light naturellement via Tailwind classes `dark:`.

### Established Patterns
- **Hero listing pattern** (`/projects.vue`) : slogan mono font + H1 gradient + subtitle + stats inline (3 items séparés par divider vertical). Direct transposable à `/blog`.
- **Empty state pattern** (`/projects.vue` noResults) : icon lucide dans un round carré + h3 + p + CTA UButton. Réplicable pour blog.
- **i18n strategy prefix** : toutes les routes doivent être préfixées (`/fr/*` ou `/en/*`). Pas de route `/blog` directe — 302 via `detectBrowserLanguage`.
- **queryCollection littéral** : le Vite extractor de @nuxt/content n'analyse PAS les variables. Toujours `queryCollection('blog_fr')` / `queryCollection('blog_en')` en dur, jamais `queryCollection(variable)`. Conséquence : chaque page blog aura un bloc if/else isFr ↔ isEn.

### Integration Points
- `app/pages/blog/index.vue` (nouveau) → listing SSR
- `app/pages/blog/[slug].vue` (existant → à enrichir)
- `app/components/BlogCard.vue` (nouveau)
- `app/components/BlogToc.vue` (nouveau) — sidebar sticky + drawer mobile
- `app/components/BlogPrevNext.vue` (nouveau) — ou intégré dans `[slug].vue`
- `app/composables/useReadingTime.ts` (nouveau)
- `content.config.ts` (étendre schema avec `draft`)
- `app/components/layout/AppHeader.vue` (ajouter lien Blog dans `navLinks`)
- `i18n/locales/fr.json` + `en.json` (ajouter clés blog.*, nav.blog, a11y.blogTocToggle)

</code_context>

<specifics>
## Specific Ideas

- Highlight TOC via IntersectionObserver avec threshold `[0, 1]` et `rootMargin` ajusté (ex: `-20% 0px -70% 0px`) pour que l'active switch soit naturel au scroll.
- Reading time affiché **cohérent listing ↔ article** : même calcul côté card et côté article header.
- `UBreadcrumb` de Nuxt UI v3 avec items `[{ label: t('nav.home'), to: localePath('/') }, { label: t('nav.blog'), to: localePath('/blog') }, { label: page.title }]`.
- Empty state CTA : `{ label: t('blog.emptyState.cta'), to: localePath('/contact') }` — réutilise la route contact déjà existante.
- Drawer TOC mobile : UDrawer Nuxt UI (side="right") avec bouton trigger `UButton icon="i-lucide-list"` dans le header article sur mobile.

</specifics>

<deferred>
## Deferred Ideas

- **Filtrage par tag cliquable** (tags clickables → liste filtrée) — nouveau capability, backlog après M1.1.
- **Recherche full-text blog** — feature dédiée, backlog.
- **Pagination / infinite scroll** — non pertinent tant qu'on a <20 articles. Backlog.
- **JSON-LD Article + BreadcrumbList structured data** — Phase 7.
- **useSeoMeta enrichi par article (og:image, canonical, dateModified)** — Phase 7.
- **Sitemap étendu avec URLs blog** — Phase 7 (auto via `@nuxtjs/sitemap` + @nuxt/content ? à confirmer par researcher).
- **OG image generator dynamique** — backlog SEO-06.
- **Articles Hytale réels (2+ seed)** — Phase 8.
- **Section "Articles récents" sur /hytale** (cocon sémantique) — Phase 8.
- **Alias /articles** — scope creep.
- **Tags page `/blog/tag/[tag]`** — nouveau capability, backlog.
- **RSS feed** — non demandé, backlog.

</deferred>

---

*Phase: 06-blog-pages*
*Context gathered: 2026-04-22*
