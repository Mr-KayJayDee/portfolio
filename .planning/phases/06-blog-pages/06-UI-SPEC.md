---
phase: 6
slug: blog-pages
status: approved
shadcn_initialized: false
preset: none
created: 2026-04-22
reviewed_at: 2026-04-22
---

# Phase 6 — UI Design Contract
## Blog Pages — Listing `/blog` + Article `/blog/[slug]`

> Contrat visuel et d'interaction pour les deux pages blog SSR bilingues.
> Hérite des tokens de Phase 5 (prose, Shiki, MDC). Génère deux nouvelles pages + trois nouveaux composants.
> Généré par gsd-ui-researcher — à valider par gsd-ui-checker.

---

## Design System

| Property | Value | Source |
|----------|-------|--------|
| Tool | Nuxt UI v3 (pas de shadcn) | `nuxt.config.ts` + 05-UI-SPEC |
| Preset | not applicable | — |
| Component library | Nuxt UI v3 (`@nuxt/ui`) | CONTEXT D-05/D-07 (UDrawer, UBreadcrumb, UBadge, UButton, UIcon) |
| Icon library | Lucide via Nuxt UI (`i-lucide-*`) | `AppHeader.vue`, `ProjectCard.vue`, `projects.vue` usage existant |
| Font | Hérité (system-ui via Nuxt UI) + mono pour sloganeuse `// blog` | `app/assets/css/main.css` |
| CSS | Tailwind v4 + `@theme` tokens `--color-brand-*` | `app/assets/css/main.css` |
| Typography plugin | `@tailwindcss/typography` (hérité Phase 5) | `main.css` + 05-UI-SPEC |
| Theme | `colorMode` cookie-based (SSR-safe), dark default | `nuxt.config.ts` |

> La shadcn gate ne s'applique pas — stack Nuxt UI. La vetting gate registry tiers ne s'applique pas non plus.

---

## Spacing Scale

Échelle 8-points standard (multiples de 4). Tailwind v4 fournit ces valeurs via les utilitaires `p-*`, `m-*`, `gap-*`.

| Token | Value | Usage dans cette phase |
|-------|-------|------------------------|
| xs | 4px | Gap icône/texte dans meta article (date + reading time) |
| sm | 8px | Gap entre badges UBadge dans une rangée de tags |
| md | 16px | Padding interne des cards (entêtes, content spacing) |
| lg | 24px | Gap entre cards de la grille, padding BlogCard `p-5 sm:p-6` |
| xl | 32px | Espace vertical entre header article et body markdown |
| 2xl | 48px | Marge verticale de la section hero (pt-20 pb-16 pattern projects) |
| 3xl | 64px | `pt-20 pb-16` du hero listing, espace entre sections de page |

Exceptions :
- Section listing content `py-16 md:py-20` (64→80px responsive) — conforme pattern `/projects`
- Sticky TOC offset top : `top-24` (96px = header 64px + 32px breathing) — multiple de 8, conforme
- Cover hero article `aspect-[21/9]` — ratio uniquement, pas une valeur de spacing
- Grille listing `gap-5 lg:gap-6` (20→24px) — `gap-5` = 20px est hors échelle stricte 8-points ; aligné avec le pattern existant `/projects` pour cohérence visuelle ; le checker doit accepter cette exception documentée
- Prev/Next cards `p-5` (20px) — idem exception alignée sur l'existant

---

## Typography

Le corps de l'article reste géré par `@tailwindcss/typography` via `prose dark:prose-invert` (hérité Phase 5, inchangé).
Le chrome de la page (hero, cards, header article, TOC, prev/next) utilise les valeurs ci-dessous.

| Role | Size | Weight | Line Height | Usage |
|------|------|--------|-------------|-------|
| Display (hero H1) | 36→48→60px (`text-4xl sm:text-5xl lg:text-6xl`) | 700 (bold) | 1.1 (`leading-tight` implicite) | H1 gradient de la section hero `/blog` |
| Heading (card title, article H1) | 18→20px (`text-lg` card / `text-3xl sm:text-4xl` article header) | 700 (bold) | 1.2 | Titres BlogCard + titre article `[slug]` |
| Body (subtitle, description) | 16→20px (`text-lg sm:text-xl` subtitle / `text-sm` card desc) | 400 (regular) | 1.5 (`leading-relaxed`) | Subtitle hero, descriptions cards |
| Meta (date, reading time, slogan) | 12→14px (`text-xs`/`text-sm`) | 400 (regular) | 1.5 | Date ISO mono, reading time, slogan `// blog` |

Règles Phase 6 :
- **2 poids uniquement** : regular (400) + bold (700). Pas de medium/semibold pour éviter la pollution typographique.
- **Mono réservée** : classe `font-mono` uniquement pour le slogan `// blog` et la date `datetime` attribut dans les cards (cohérence avec `ProjectCard.vue`).
- **Gradient text** : le H1 du hero hérite du gradient `from-gray-900 via-gray-800 to-gray-600 dark:from-white dark:via-gray-200 dark:to-gray-500` — identique `projects.vue` pour cohérence.
- **Body article** (prose) : 16px / 400 / 1.75 — inchangé Phase 5.

---

## Color

Dark mode par défaut, light mode synchronisé via cookie. Le palette `--color-brand-*` est déjà déclaré dans `main.css`.

| Role | Value | Usage |
|------|-------|-------|
| Dominant (60%) | `bg-white` light / `bg-gray-950` dark (Tailwind) | Fond page, body article, surface hero dégradée |
| Secondary (30%) | `bg-gray-50/80` light / `bg-gray-900/40` dark — cards/panels `bg-white/80` / `bg-gray-900/60` | Fond hero section, fond BlogCard, fond prev/next card, fond TOC sidebar, fond drawer TOC |
| Accent (10%) | `--color-brand-500: #85cb85` (light) / `--color-brand-400: #a3d6a3` (dark) | Liens prose, slogan `// blog`, hover border cards, TOC highlight heading actif, CTA empty state (solid), gradient stats numbers |
| Destructive | `color-error` (Nuxt UI token, rouge) | Aucun usage dans cette phase (callouts `danger` déjà réservés Phase 5) |

Accent `brand-*` réservé EXCLUSIVEMENT à :
1. Slogan mono `// blog` (hero top) — `text-brand-500 dark:text-brand-400`
2. Gradient numérique des stats dans le hero (`from-brand-400 to-brand-600`) — identique pattern `/projects`
3. Hover border de BlogCard (`hover:border-brand-500/40`)
4. Hover title de BlogCard (`group-hover:text-brand-600 dark:group-hover:text-brand-400`)
5. Shadow hover de BlogCard (`hover:shadow-brand-500/10`)
6. Heading actif courant dans la TOC au scroll (`text-brand-500 dark:text-brand-400`) — IntersectionObserver
7. CTA empty state UButton (`color="primary"` mappé sur brand par Nuxt UI)
8. Liens prose (hérité Phase 5 — inchangé)
9. Icônes arrow de prev/next cards au hover (`group-hover:text-brand-500`)

Accent INTERDIT sur :
- Date, reading time, meta info (gris neutre)
- Tags UBadge (doivent rester en variant `subtle` color `neutral` ou `primary` une seule teinte — voir Registry)
- Breadcrumb inactif (gris)
- Corps de texte général

---

## Copywriting Contract

Tous les textes passent par `useI18n()` — clés déclarées dans `i18n/locales/{fr,en}.json`.
Les clés `blog.*`, `nav.blog`, `a11y.blogTocToggle` sont déjà listées dans CONTEXT D-21.

### Hero listing `/blog`

| Element | FR | EN | i18n key |
|---------|----|----|----------|
| Slogan (mono) | `// blog` | `// blog` | littéral (pas d'i18n) |
| H1 | Blog | Blog | `blog.title` |
| Subtitle | Articles techniques, retours d'expérience et guides pratiques sur le développement de plugins Hytale et l'écosystème web. | Technical articles, experience feedback and practical guides on Hytale plugin development and the web ecosystem. | `blog.subtitle` |
| Stat 1 label | Articles | Articles | `blog.stats.articles` |
| Stat 2 label | Tags | Tags | `blog.stats.tags` |
| Stat 3 label | Langues | Languages | `blog.stats.languages` |

### BlogCard (listing + prev/next)

| Element | FR | EN | i18n key |
|---------|----|----|----------|
| Reading time | `{n} min de lecture` | `{n} min read` | `blog.readingTime` (avec variable `{minutes}`) |
| Label prev article | Article précédent | Previous article | `blog.prevArticle` |
| Label next article | Article suivant | Next article | `blog.nextArticle` |

### Article `/blog/[slug]` chrome

| Element | FR | EN | i18n key |
|---------|----|----|----------|
| Breadcrumb home | Accueil | Home | `nav.home` (existant) |
| Breadcrumb blog | Blog | Blog | `nav.blog` (nouveau) |
| TOC title | Sommaire | Table of contents | `blog.toc.title` |
| Back to blog | Retour au blog | Back to blog | `blog.backToBlog` |

### Empty state listing (0 articles non-draft)

| Element | FR | EN | i18n key |
|---------|----|----|----------|
| Icon | `i-lucide-book-open` | `i-lucide-book-open` | littéral |
| Heading | Bientôt des articles Hytale | Hytale articles coming soon | `blog.emptyState.title` |
| Body | Le blog se prépare. Les premiers articles sur le développement de plugins Hytale arrivent bientôt. | The blog is being prepared. The first articles on Hytale plugin development are coming soon. | `blog.emptyState.description` |
| CTA label (primary) | Me contacter | Contact me | `blog.emptyState.cta` |
| CTA target | `/contact` via `localePath` | `/contact` via `localePath` | — |
| CTA icon | `i-lucide-mail` | `i-lucide-mail` | littéral |

### Error state (404 article introuvable)

Utilise `createError({ statusCode: 404 })` côté serveur → rendu via `error.vue` du layout global. Cette phase **n'ajoute pas** d'UI d'erreur custom — l'erreur 404 existante du projet s'applique. Aucune autre erreur visible prévue.

### Accessibility copy

| Element | FR | EN | i18n key |
|---------|----|----|----------|
| TOC toggle button aria-label | Afficher le sommaire | Show table of contents | `a11y.blogTocToggle` |
| Prev card aria-label | Article précédent : {titre} | Previous article: {title} | `a11y.blogPrev` (avec `{title}`) |
| Next card aria-label | Article suivant : {titre} | Next article: {title} | `a11y.blogNext` (avec `{title}`) |

### Nav link AppHeader

| Element | FR | EN | i18n key |
|---------|----|----|----------|
| Nav label Blog | Blog | Blog | `nav.blog` |

Position finale AppHeader : Home / Hytale / **Blog** / Projects / About / Contact / Fiverr (CONTEXT D-15).

### Destructive actions

Aucune action destructive dans cette phase (lecture seule, pas de suppression, pas de formulaire).

---

## Component Inventory

Tous nouveaux composants — aucun shadcn, 100% Tailwind + Nuxt UI.

| Composant | Chemin | Rôle | Base technique |
|-----------|--------|------|----------------|
| `BlogCard.vue` | `app/components/BlogCard.vue` | Card article réutilisable (listing + prev/next) | Tailwind + NuxtImg + UBadge, variant prop `default` / `compact` |
| `BlogToc.vue` | `app/components/BlogToc.vue` | Sommaire sticky desktop + drawer mobile | UDrawer (mobile) + sticky div (desktop) + IntersectionObserver |
| `BlogPrevNext.vue` | `app/components/BlogPrevNext.vue` | Navigation prev/next cards | 2× BlogCard variant `compact` + UIcon flèches |
| Page listing | `app/pages/blog/index.vue` (NEW) | Hero + grille + empty state | queryCollection(`blog_fr`\|`blog_en`) + BlogCard |
| Page article | `app/pages/blog/[slug].vue` (ENRICH) | Breadcrumb + header + body + TOC + prev/next | Existant Phase 5 enrichi |

### Composants Nuxt UI consommés

| Composant | Variant / Props | Usage |
|-----------|-----------------|-------|
| `UBadge` | `color="primary"` `variant="subtle"` | Tags dans BlogCard + header article (non-cliquables) |
| `UBreadcrumb` | Items array avec `label` + `to` | Breadcrumb visuel en haut de l'article (D-07) |
| `UDrawer` | `side="right"` | TOC mobile (<lg) déclenchée par UButton `i-lucide-list` |
| `UButton` | `variant="solid" color="primary"` | CTA empty state (`Me contacter`) |
| `UButton` | `variant="ghost" color="neutral" icon="i-lucide-list"` | Trigger drawer TOC mobile |
| `UButton` | `variant="ghost" icon="i-lucide-arrow-left"` | Lien "Retour au blog" (optionnel, si budget) |
| `UIcon` | `i-lucide-arrow-right` / `i-lucide-arrow-left` | Flèches prev/next cards |
| `UIcon` | `i-lucide-book-open` | Icon empty state |
| `UIcon` | `i-lucide-clock` | Icon reading time (optionnel, inline avec texte) |
| `UIcon` | `i-lucide-calendar` | Icon date (optionnel, inline avec texte) |
| `UIcon` | `i-lucide-mail` | Icon CTA empty state |
| `NuxtImg` | `loading="lazy"` `format="webp"` | Image cover card + hero article (si frontmatter.image présent) |
| `NuxtLink` | `:to="localePath('/blog/' + slug)"` | Navigation SPA vers article |
| `ContentRenderer` | `:value="page"` | Rendu markdown article (hérité Phase 5, inchangé) |

### BlogCard variant contract

```
variant="default" (listing)
├── NuxtImg cover (si image) — aspect 16/9, rounded-t-2xl
├── Padding p-5 sm:p-6, flex-col gap-3
├── Header row : UBadge tag[0] (primary subtle) + <time> date mono text-xs
├── Title h2 text-lg font-bold, group-hover:text-brand-600
├── Description text-sm line-clamp-2 leading-relaxed
├── Footer row : reading time text-xs gray-400 + tags supplémentaires (+N) pills neutres
└── NuxtLink absolute inset-0 (SEO + a11y)

variant="compact" (prev/next)
├── Pas d'image cover (D-10)
├── Padding p-5, flex-col gap-2
├── Label row : UIcon arrow-left|arrow-right + "Article précédent|suivant" text-xs uppercase tracking-wider gray-500
├── Title h3 text-base font-bold, group-hover:text-brand-500
├── Date <time> text-xs mono gray-400
└── NuxtLink absolute inset-0
```

### BlogToc contract

**Desktop (≥ lg — 1024px)** :
- `<aside>` avec `position: sticky; top: 24 (96px)` — offset header h-16 + breathing
- Largeur `w-64` (256px) dans une grille `lg:grid-cols-[1fr_16rem] gap-12`
- Liste `<ol>` flat ou nested selon `page.body.toc` (niveau h2/h3 uniquement, pas h4+)
- Chaque item : `<a href="#id">` avec classe conditionnelle `text-brand-500` si actif, `text-gray-500 hover:text-gray-900` sinon
- Titre de la TOC `Sommaire` / `Table of contents` — `text-sm font-bold uppercase tracking-wider text-gray-500` en haut
- Indentation nested h3 : `pl-4` sous leur h2 parent

**Mobile (< lg)** :
- `<aside>` hidden
- UButton trigger en haut du header article : `<UButton icon="i-lucide-list" variant="ghost">{{ t('blog.toc.title') }}</UButton>`
- `<UDrawer side="right">` avec header `{ t('blog.toc.title') }` + body identique à la liste desktop
- Fermeture au clic sur un item (navigation ancrée)

**IntersectionObserver (client-only via `onMounted`)** :
- `rootMargin: '-20% 0px -70% 0px'`
- `threshold: 0`
- Observer les headings h2/h3 de l'article
- Met à jour une `ref<string | null>(activeId)` qui pilote la classe active
- Cleanup dans `onBeforeUnmount`

### Hero section `/blog` — contract exact

Structure identique `app/pages/projects.vue` lignes 56-83 (décision D-04) :
```
<section class="relative pt-20 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
  <!-- Background gradient blur (identical pattern) -->
  <div class="absolute inset-0 bg-gray-50/80 dark:bg-gray-900/40" />
  <div class="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-brand-500/5 dark:bg-brand-500/8 rounded-full blur-3xl" />

  <div class="relative z-10 max-w-7xl mx-auto text-center">
    <span class="font-mono text-sm text-brand-500 dark:text-brand-400 tracking-wider">// blog</span>
    <h1 class="text-4xl sm:text-5xl lg:text-6xl font-bold mt-3 mb-5 bg-gradient-to-r ...">{{ t('blog.title') }}</h1>
    <p class="text-lg sm:text-xl text-gray-500 ... max-w-2xl mx-auto">{{ t('blog.subtitle') }}</p>

    <!-- Stats 3× with dividers identical pattern -->
    <div class="flex justify-center gap-8 sm:gap-12 mt-12"> ... </div>
  </div>
</section>
```

Stats calculés :
- Stat 1 : `articles.length` (articles non-draft)
- Stat 2 : `uniqueTags.length` (nouveau — Set depuis tous les articles)
- Stat 3 : `2` (FR + EN — valeur fixe)

### Article header contract (au-dessus du body `prose`)

Ordre de haut en bas dans `app/pages/blog/[slug].vue` :

1. **UBreadcrumb** (Accueil → Blog → Titre) — au-dessus du H1, `text-sm`, `mb-6`
2. **H1 article** (titre frontmatter) — `text-3xl sm:text-4xl font-bold mb-4`
3. **Meta row** (flex inline) : date i18n formatée long + `·` + reading time + UButton trigger TOC (mobile only)
4. **Tags row** (si `tags` frontmatter) : flex wrap gap-2 de UBadge variant subtle color primary
5. **Cover hero image** (si `image` frontmatter) : NuxtImg `aspect-[21/9] w-full object-cover rounded-2xl mt-8 mb-12`
6. **Séparateur implicite** : la marge du cover (ou `mb-12` si pas de cover) sert de séparation avant le body
7. **Body markdown** : `<article class="prose dark:prose-invert max-w-none">` inchangé Phase 5
8. **BlogPrevNext** : composant en bas, `mt-16 grid md:grid-cols-2 gap-5`

### Layout responsive article

```
< lg (mobile/tablet) :
  max-w-3xl mx-auto px-4 py-12 (existant Phase 5)
  TOC dans UDrawer, bouton trigger inline dans meta row

≥ lg (desktop) :
  max-w-7xl mx-auto px-4 py-12
  grid grid-cols-[1fr_16rem] gap-12
  colonne gauche : article prose (max-w-3xl mx-auto pour rester lisible)
  colonne droite : aside sticky TOC
```

---

## Interaction Contract

| Interaction | Déclencheur | Effet | A11y |
|-------------|-------------|-------|------|
| Click card listing | Clic sur BlogCard | Navigation `/blog/[slug]` via NuxtLink `localePath` | NuxtLink absolute inset-0 avec `aria-label="{title} - {description}"` |
| Click TOC item (desktop) | Clic sur `<a href="#id">` | Scroll natif vers heading (offset via `scroll-margin-top: 5rem` hérité Phase 5) | `<a>` native, gère focus |
| Click TOC item (mobile) | Clic dans drawer | Scroll ancré + ferme le drawer (`open = false`) | Drawer close + focus retour sur trigger button |
| Toggle drawer TOC | Clic bouton `i-lucide-list` | Ouvre UDrawer side="right" | `aria-label` via `t('a11y.blogTocToggle')`, `aria-expanded` géré par UDrawer |
| Hover card | Hover BlogCard | border-brand-500/40 + shadow-xl + translate -y-1.5 (pattern ProjectCard) | Transition `duration-300`, respecte `prefers-reduced-motion` |
| Hover card title | Hover | group-hover:text-brand-600 dark:group-hover:text-brand-400 | Effet visuel uniquement |
| Scroll page article | Scroll | IntersectionObserver met à jour TOC active heading | Pas de changement de focus ; mise à jour visuelle uniquement |
| CTA empty state | Clic "Me contacter" | Navigation `/contact` via `localePath` | UButton natif |
| Prev/next card hover | Hover BlogCard variant=compact | border + shadow + flèche icon `group-hover:translate-x-1` (next) ou `-x-1` (prev) | Transition `duration-200` |

---

## Registry Safety

| Registry | Blocks Used | Safety Gate |
|----------|-------------|-------------|
| Nuxt UI officiel | `UBadge`, `UBreadcrumb`, `UDrawer`, `UButton`, `UIcon` | Non requis — composants officiels `@nuxt/ui` |
| @nuxt/content officiel | `ContentRenderer`, `queryCollection`, `surround()` | Non requis — module officiel Nuxt |
| @nuxt/image officiel | `NuxtImg` | Non requis — module officiel Nuxt |
| @nuxtjs/i18n officiel | `useI18n`, `useLocalePath` | Non requis — module officiel Nuxt |
| Tiers | aucun | Non applicable |

> Ce projet utilise Nuxt UI v3, pas shadcn. Aucun composant tiers hors écosystème Nuxt officiel. La vetting gate ne s'applique pas.

---

## i18n Keys à créer (contrat avec planner)

Ajouts dans `i18n/locales/fr.json` et `i18n/locales/en.json` :

```jsonc
{
  "nav": {
    "blog": "Blog" // nouveau
  },
  "a11y": {
    "blogTocToggle": "Afficher le sommaire", // FR
    "blogPrev": "Article précédent : {title}",
    "blogNext": "Article suivant : {title}"
  },
  "blog": {
    "title": "Blog",
    "subtitle": "Articles techniques, retours d'expérience et guides pratiques sur le développement de plugins Hytale et l'écosystème web.",
    "stats": {
      "articles": "Articles",
      "tags": "Tags",
      "languages": "Langues"
    },
    "readingTime": "{minutes} min de lecture",
    "prevArticle": "Article précédent",
    "nextArticle": "Article suivant",
    "backToBlog": "Retour au blog",
    "toc": {
      "title": "Sommaire"
    },
    "emptyState": {
      "title": "Bientôt des articles Hytale",
      "description": "Le blog se prépare. Les premiers articles sur le développement de plugins Hytale arrivent bientôt.",
      "cta": "Me contacter"
    },
    "breadcrumb": {
      "home": "Accueil",
      "blog": "Blog"
    }
  }
}
```

EN : mêmes clés avec traductions correspondantes listées dans la section Copywriting.

---

## Dépendances héritées (Phase 5 — NE PAS modifier)

- `app/assets/css/main.css` : `@plugin "@tailwindcss/typography"` + `--color-brand-*` + `scroll-margin-top: 5rem`
- `content.config.ts` : schema Zod `blog_fr` + `blog_en` (à étendre avec `draft` — voir CONTEXT D-18, couvert par planner)
- `app/components/content/*.vue` : MDC ProseImg, Alert, ProsePre, etc. — utilisés par `<ContentRenderer>`, inchangés
- `nuxt.config.ts` : `i18n` strategy `prefix`, `detectBrowserLanguage`, `colorMode` cookie, `image` preset — inchangés

---

## Checker Sign-Off

- [ ] Dimension 1 Copywriting: PASS
- [ ] Dimension 2 Visuals: PASS
- [ ] Dimension 3 Color: PASS
- [ ] Dimension 4 Typography: PASS
- [ ] Dimension 5 Spacing: PASS
- [ ] Dimension 6 Registry Safety: PASS

**Approval:** pending
