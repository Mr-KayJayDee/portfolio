# Phase 6: Blog Pages - Pattern Map

**Mapped:** 2026-04-22
**Files analyzed:** 10 (3 new components, 1 new page, 1 new composable, 1 new Nitro plugin, 4 modifications)
**Analogs found:** 10 / 10

## File Classification

| New/Modified File | Role | Data Flow | Closest Analog | Match Quality |
|-------------------|------|-----------|----------------|---------------|
| `app/pages/blog/index.vue` (NEW) | page (listing) | SSR request-response | `app/pages/projects.vue` | exact (hero + grid + empty state) |
| `app/pages/blog/[slug].vue` (MODIFY) | page (detail) | SSR request-response | `app/pages/blog/[slug].vue` (existing) + `app/pages/test.vue` | self + role-match |
| `app/components/BlogCard.vue` (NEW) | component (presentational) | prop-driven | `app/components/ProjectCard.vue` | exact (card pattern) |
| `app/components/BlogToc.vue` (NEW) | component (stateful client) | event-driven (IntersectionObserver) | `app/components/layout/AppHeader.vue` (USlideover) + `app/components/content/ProseImg.vue` (defineProps) | partial |
| `app/components/BlogPrevNext.vue` (NEW) | component (presentational) | prop-driven | `app/components/ProjectCard.vue` | role-match (card wrapper) |
| `app/composables/useReadingTime.ts` (NEW) | composable (utility) | pure transform | n/a (aucun composable existant hors `useProjects`) | no analog |
| `app/utils/countWords.ts` (NEW) | utility | pure transform | n/a | no analog |
| `server/plugins/reading-time.ts` (NEW) | Nitro plugin | build-time hook | `server/plugins/rate-limit.ts` | role-match (defineNitroPlugin + hooks.hook) |
| `content.config.ts` (MODIFY) | config (schema) | Zod schema | `content.config.ts` (existing) | self |
| `app/components/layout/AppHeader.vue` (MODIFY) | component (navigation) | prop-driven | `app/components/layout/AppHeader.vue` (existing) | self |
| `i18n/locales/fr.json` + `en.json` (MODIFY) | config (locale) | key-value | existing `fr.json` / `en.json` | self |

## Pattern Assignments

### `app/pages/blog/index.vue` (page listing, SSR)

**Analog:** `app/pages/projects.vue` (lines 1-132)

**Script setup pattern** (projects.vue lines 1-51):
```typescript
const { t } = useI18n()
const { projects } = useProjects()

useSeoMeta({
  title: () => t('seo.projects.title'),
  description: () => t('seo.projects.description'),
  // ...
})

const totalProjects = computed(() => projects.value.length)
const featuredCount = computed(() => projects.value.filter((p) => p.featured).length)
```

**Adaptation Phase 6:** Remplacer `useProjects()` par `useAsyncData` + `queryCollection` littéraux isFr (voir Pitfall 1 RESEARCH §Pattern 1). Ajouter `watch: [locale]`.

**Hero section pattern** (projects.vue lines 56-83) — **à copier tel quel** avec substitution des clés i18n :
```vue
<section class="relative pt-20 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
  <div class="absolute inset-0 bg-gray-50/80 dark:bg-gray-900/40" aria-hidden="true" />
  <div class="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-brand-500/5 dark:bg-brand-500/8 rounded-full blur-3xl pointer-events-none" aria-hidden="true" />

  <div class="relative z-10 max-w-7xl mx-auto text-center">
    <span class="font-mono text-sm text-brand-500 dark:text-brand-400 tracking-wider">// blog</span>
    <h1 class="text-4xl sm:text-5xl lg:text-6xl font-bold mt-3 mb-5 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-600 dark:from-white dark:via-gray-200 dark:to-gray-500 bg-clip-text text-transparent">{{ t('blog.title') }}</h1>
    <p class="text-lg sm:text-xl text-gray-500 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">{{ t('blog.subtitle') }}</p>

    <!-- Stats: 3 items + 2 dividers verticaux — pattern identique -->
    <div class="flex justify-center gap-8 sm:gap-12 mt-12">
      <div class="text-center">
        <p class="text-3xl sm:text-4xl font-black bg-gradient-to-b from-brand-400 to-brand-600 bg-clip-text text-transparent">{{ totalArticles }}</p>
        <p class="text-sm text-gray-500 dark:text-gray-400 mt-2 font-medium">{{ t('blog.stats.articles') }}</p>
      </div>
      <div class="w-px bg-gradient-to-b from-transparent via-gray-300 dark:via-gray-700 to-transparent" />
      <!-- etc. tags / languages -->
    </div>
  </div>
</section>
```

**Grid pattern** (projects.vue lines 114-116):
```vue
<div v-if="articles && articles.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
  <BlogCard v-for="a in articles" :key="a.path" :article="a" variant="default" />
</div>
```

**Empty state pattern** (projects.vue lines 119-128) — **adapter texte et CTA** :
```vue
<div v-else class="text-center py-32">
  <div class="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gray-100 dark:bg-gray-800/60 border border-gray-200/80 dark:border-gray-700/30 flex items-center justify-center">
    <UIcon name="i-lucide-book-open" class="text-2xl text-gray-400" />
  </div>
  <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-3">{{ t('blog.emptyState.title') }}</h3>
  <p class="text-gray-500 dark:text-gray-400 mb-8 max-w-md mx-auto leading-relaxed">{{ t('blog.emptyState.description') }}</p>
  <UButton color="primary" variant="solid" size="md" icon="i-lucide-mail" :to="localePath('/contact')">
    {{ t('blog.emptyState.cta') }}
  </UButton>
</div>
```

**Query pattern** (from RESEARCH §Pattern 1 + existing `app/pages/test.vue`):
```typescript
const { t, locale } = useI18n()
const localePath = useLocalePath()
const isFr = computed(() => locale.value === 'fr')

const { data: articles } = await useAsyncData(
  `blog-list-${locale.value}`,
  () => isFr.value
    ? queryCollection('blog_fr').where('draft', '=', false).order('date', 'DESC').all()
    : queryCollection('blog_en').where('draft', '=', false).order('date', 'DESC').all(),
  { watch: [locale] }
)
```

---

### `app/pages/blog/[slug].vue` (page article, enrichment)

**Analog:** Fichier existant (`app/pages/blog/[slug].vue` lines 1-34) — base SSR Phase 5 à conserver, enrichir avec breadcrumb + TOC + prev/next.

**Current base pattern** (lines 1-25) — **à garder tel quel** :
```typescript
const { locale } = useI18n()
const route = useRoute()

const slug = route.params.slug as string
const isFr = locale.value === 'fr'
const path = isFr ? `/fr/blog/${slug}` : `/en/blog/${slug}`

const { data: page } = await useAsyncData(`blog-${locale.value}-${slug}`, () =>
  isFr
    ? queryCollection('blog_fr').path(path).first()
    : queryCollection('blog_en').path(path).first()
)

if (!page.value) {
  throw createError({ statusCode: 404, statusMessage: 'Article introuvable' })
}

useSeoMeta({ title: page.value.title, description: page.value.description, /* ... */ })
```

**Gotcha à corriger pendant enrichment** : Ajouter `{ watch: [locale] }` dans `useAsyncData` (voir Pitfall 3 RESEARCH) et convertir `isFr` en `computed` pour que les refetches se déclenchent sur switch locale.

**Wrapper prose à conserver** (line 28-32) :
```vue
<article class="prose dark:prose-invert max-w-none">
  <ContentRenderer v-if="page" :value="page" />
</article>
```

**Enrichments à ajouter** (voir RESEARCH §Code Examples lignes 713-830 pour le skeleton complet) :
1. UBreadcrumb avant le `<article>`
2. Header (H1 + meta row date/minutes + UButton trigger TOC mobile + tags UBadge row + NuxtImg cover)
3. Layout grid `lg:grid-cols-[1fr_16rem] lg:gap-12` pour intégrer `<BlogToc>` sticky desktop
4. `<BlogPrevNext :prev :next />` après `</article>`
5. Seconde `useAsyncData` pour `queryCollectionItemSurroundings` (voir RESEARCH §Pattern 2 — inverser `surround[0]` et `surround[1]` pour order DESC, voir Pitfall 4)

---

### `app/components/BlogCard.vue` (component, variant default)

**Analog:** `app/components/ProjectCard.vue` (lines 1-91) — **match exact** pour variant `default`.

**Props interface pattern** (ProjectCard.vue lines 1-9):
```typescript
<script setup lang="ts">
import type { Project } from '~~/shared/types'

interface Props {
  project: Project
}

const props = defineProps<Props>()
const { t } = useI18n()
```

**Adaptation BlogCard :** Type inline (le type Article vient de `queryCollection('blog_fr').all()` — inférer ou déclarer explicitement). Ajouter variant prop :
```typescript
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
```

**Card wrapper pattern** (ProjectCard.vue lines 19-23) — **à copier tel quel** :
```vue
<article
  class="group relative rounded-2xl border border-gray-200/80 dark:border-gray-800/50 bg-white/80 dark:bg-gray-900/60 backdrop-blur-sm overflow-hidden transition-all duration-300 hover:border-brand-500/40 hover:shadow-xl hover:shadow-brand-500/10 hover:-translate-y-1.5"
  itemscope
  itemtype="https://schema.org/BlogPosting"
>
```

**Cover image pattern** (ProjectCard.vue lines 25-43):
```vue
<NuxtLink :to="localePath(`/blog/${slug}`)" class="block relative overflow-hidden">
  <NuxtImg
    :src="article.image"
    :alt="`${article.title} - ${article.description?.slice(0, 60)}...`"
    loading="lazy"
    format="webp"
    width="400"
    height="225"
    class="w-full aspect-[16/9] object-cover transition-transform duration-500 group-hover:scale-105"
  />
</NuxtLink>
```

**Content section pattern** (ProjectCard.vue lines 46-79):
```vue
<div class="p-5 sm:p-6 flex flex-col gap-3">
  <div class="flex items-center justify-between">
    <UBadge v-if="article.tags?.[0]" color="primary" variant="subtle">{{ article.tags[0] }}</UBadge>
    <time class="text-xs text-gray-400 dark:text-gray-500 font-mono" :datetime="article.date">
      {{ formattedDate }}
    </time>
  </div>
  <h2 class="text-lg font-bold text-gray-900 dark:text-white group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
    {{ article.title }}
  </h2>
  <p class="text-sm text-gray-500 dark:text-gray-400 line-clamp-2 leading-relaxed">
    {{ article.description }}
  </p>
  <!-- reading time + tags supplémentaires (+N) -->
</div>
```

**Absolute SEO link pattern** (ProjectCard.vue lines 83-88) — **critique a11y** :
```vue
<NuxtLink
  :to="localePath(`/blog/${slug}`)"
  class="absolute inset-0 z-10"
  :aria-label="`${t('blog.readingTime', { minutes })} - ${article.title}`"
/>
```

**Variant compact** : Pas de NuxtImg, padding `p-5`, label row avec UIcon arrow — voir UI-SPEC §BlogCard variant contract pour le contrat exact.

**Date formatting (nouveau)** — pas d'analog dans ProjectCard (qui affiche `project.date` brut) :
```typescript
const formattedDate = computed(() => {
  try {
    return new Intl.DateTimeFormat(locale.value === 'fr' ? 'fr-FR' : 'en-US', {
      year: 'numeric', month: 'long', day: 'numeric'
    }).format(new Date(props.article.date))
  } catch {
    return props.article.date
  }
})
```

---

### `app/components/BlogToc.vue` (component, stateful client)

**Analog partiel:** `app/components/layout/AppHeader.vue` (USlideover pattern lines 80-114) + `app/components/content/ProseImg.vue` (defineProps typé lines 1-38).

**USlideover/UDrawer control pattern** (AppHeader.vue lines 6 + 80):
```typescript
const mobileOpen = ref(false)
```
```vue
<USlideover v-model:open="mobileOpen" side="left" class="md:hidden">
  <template #header>...</template>
  <template #body>...</template>
</USlideover>
```

**Adaptation BlogToc** : Remplacer `USlideover` par `UDrawer` (UI-SPEC D-05), `side="right"` (UI-SPEC). Ref locale `tocDrawerOpen` — ne **pas** utiliser `useState` (Pitfall 8 RESEARCH).

**Props typed pattern** (ProseImg.vue lines 3-16):
```typescript
interface Props {
  src: string
  alt?: string
  /* ... */
}
const props = withDefaults(defineProps<Props>(), {
  alt: '',
})
```

**Adaptation BlogToc** :
```typescript
interface TocLink {
  id: string
  depth: number
  text: string
  children?: TocLink[]
}
const props = defineProps<{ links: TocLink[] }>()
```

**IntersectionObserver pattern** — **aucun analog dans le codebase**, copier directement RESEARCH §Pattern 4 (lines 393-440). Points critiques :
- `activeId = ref<string | null>(null)` initial (Pitfall 2 hydration mismatch)
- Setup dans `onMounted`, cleanup dans `onBeforeUnmount`
- `rootMargin: '-20% 0px -70% 0px'` (imposé UI-SPEC)

**Sticky desktop pattern (nouveau)** — voir UI-SPEC §BlogToc contract Desktop :
```vue
<aside class="hidden lg:block sticky top-24 w-64 self-start">
  <p class="text-sm font-bold uppercase tracking-wider text-gray-500 mb-4">{{ t('blog.toc.title') }}</p>
  <ol class="space-y-2 text-sm">
    <!-- liste flat + nested -->
  </ol>
</aside>
```

---

### `app/components/BlogPrevNext.vue` (component, prop-driven)

**Analog:** `app/components/ProjectCard.vue` (réutilise `BlogCard variant="compact"` ×2).

**Composition pattern** (nouveau, inspiré UI-SPEC) :
```vue
<script setup lang="ts">
const props = defineProps<{
  prev: BlogArticle | null
  next: BlogArticle | null
}>()
</script>

<template>
  <nav class="mt-16 grid md:grid-cols-2 gap-5" :aria-label="t('blog.breadcrumb.blog')">
    <div v-if="prev">
      <BlogCard :article="prev" variant="compact" direction="prev" />
    </div>
    <div v-else />
    <div v-if="next">
      <BlogCard :article="next" variant="compact" direction="next" />
    </div>
    <div v-else />
  </nav>
</template>
```

Pattern "empty cell kept for alignment" imposé par D-13 RESEARCH.

---

### `app/composables/useReadingTime.ts` (composable, pure transform)

**Analog:** **Aucun composable existant n'a le même rôle** (`useProjects` manipule des stores, pas de pure compute). Utiliser directement RESEARCH §Pattern 5 ligne 509-517 :
```typescript
export function useReadingTime(wordCountOrText: number | string): number {
  if (typeof wordCountOrText === 'number') {
    return Math.max(1, Math.ceil(wordCountOrText / 200))
  }
  const count = wordCountOrText.trim().split(/\s+/).filter(Boolean).length
  return Math.max(1, Math.ceil(count / 200))
}
```

**Role :** Fallback client si `page.minutes` absent (dev mode, hook pas encore exécuté). Source of truth = hook Nitro.

---

### `app/utils/countWords.ts` (utility, pure)

**Analog:** Aucun — dossier `app/utils/` à créer. Copier RESEARCH §Pattern 5 lignes 465-488 (fonction `countWordsInMinimalBody`). Exporté et importé par le Nitro plugin.

---

### `server/plugins/reading-time.ts` (Nitro plugin, build-time hook)

**Analog:** `server/plugins/rate-limit.ts` (lines 1-32) — **même structure** `defineNitroPlugin` + `nitro.hooks.hook(...)`.

**Plugin skeleton pattern** (rate-limit.ts lines 11-32):
```typescript
export default defineNitroPlugin((nitro) => {
  nitro.hooks.hook('request', (event) => {
    // ...
  })
})
```

**Adaptation Phase 6** (RESEARCH §Pattern 5 lines 453-463):
```typescript
export default defineNitroPlugin((nitroApp) => {
  nitroApp.hooks.hook('content:file:afterParse', (ctx) => {
    const { file, content } = ctx
    if (!file.id?.endsWith('.md')) return

    const wordCount = countWordsInMinimalBody(content.body)
    content.wordCount = wordCount
    content.minutes = Math.max(1, Math.ceil(wordCount / 200))
  })
})
```

Convention de nommage paramètre : `nitro` (rate-limit) vs `nitroApp` (RESEARCH example) — les deux valent ; préférer `nitroApp` ici pour coller à la convention Nuxt docs du hook content.

---

### `content.config.ts` (config, schema)

**Analog:** `content.config.ts` existant (lines 1-25) — **étendre**, ne pas réécrire.

**Existing schema** (lines 3-9) :
```typescript
const blogSchema = z.object({
  title: z.string(),
  description: z.string(),
  date: z.string(),
  tags: z.array(z.string()).optional(),
  image: z.string().optional(),
})
```

**Additions Phase 6** (D-18 + RESEARCH §Pattern 5 + Pitfall 5) :
```typescript
const blogSchema = z.object({
  title: z.string(),
  description: z.string(),
  date: z.string(),
  tags: z.array(z.string()).optional(),
  image: z.string().optional(),
  draft: z.boolean().optional().default(false),       // D-18
  wordCount: z.number().optional(),                    // injecté par hook
  minutes: z.number().optional(),                      // injecté par hook
})
```

**Structure `collections` inchangée** (lines 11-24).

---

### `app/components/layout/AppHeader.vue` (component, navigation — MODIFY)

**Analog:** Fichier lui-même (AppHeader.vue lines 8-15) — **ajouter un item** dans `navLinks` array.

**Current pattern** (lines 8-15):
```typescript
const navLinks = computed(() => [
  { key: 'home', path: '/' },
  { key: 'hytale', path: '/hytale' },
  { key: 'projects', path: '/projects' },
  { key: 'about', path: '/about' },
  { key: 'contact', path: '/contact' },
  { key: 'fiverr', path: '/fiverr' },
])
```

**Modification D-15** (ajout entre hytale et projects) :
```typescript
const navLinks = computed(() => [
  { key: 'home', path: '/' },
  { key: 'hytale', path: '/hytale' },
  { key: 'blog', path: '/blog' },         // NEW (D-15)
  { key: 'projects', path: '/projects' },
  { key: 'about', path: '/about' },
  { key: 'contact', path: '/contact' },
  { key: 'fiverr', path: '/fiverr' },
])
```

Le template ne change pas : `{{ t(\`nav.${link.key}\`) }}` lira automatiquement `nav.blog` depuis les locales.

---

### `i18n/locales/fr.json` + `en.json` (config, locale — MODIFY)

**Analog:** fichiers existants (fr.json lines 1-9 pour `nav`, lines 23-34 pour `a11y`, lines 112-149 pour `projects` pattern).

**Existing `nav` block** (fr.json lines 2-9):
```json
"nav": {
  "home": "Accueil",
  "projects": "Projets",
  "about": "A propos",
  "contact": "Contact",
  "fiverr": "Fiverr",
  "hytale": "Hytale"
}
```

**Add D-21** : `"blog": "Blog"` dans `nav`, plus bloc complet `blog.*` et `a11y.blogTocToggle/blogPrev/blogNext`. Structure exacte dans UI-SPEC §i18n Keys à créer (lines 341-379).

**Convention observée** : accents encodés en ASCII (`A propos` sans accent, `Developpeur` sans accent) dans les clés existantes `a11y` et `seo`. Les nouveaux libellés `blog.*` peuvent utiliser les accents (cohérent avec bloc `projects` qui les utilise) — **suivre le pattern du bloc `projects`**, pas `a11y/seo`.

---

## Shared Patterns

### i18n access
**Source:** `app/pages/projects.vue` ligne 2, `app/components/ProjectCard.vue` ligne 9
**Apply to:** Tous les composants/pages créés en Phase 6
```typescript
const { t } = useI18n()
const { t, locale } = useI18n()        // si locale réactive nécessaire
const localePath = useLocalePath()     // pour les NuxtLink/:to
```

### SEO meta (minimal Phase 6, enrichi Phase 7)
**Source:** `app/pages/projects.vue` lines 5-14, `app/pages/blog/[slug].vue` lines 19-24
**Apply to:** `app/pages/blog/index.vue`, `app/pages/blog/[slug].vue`
```typescript
useSeoMeta({
  title: () => t('blog.title'),
  description: () => t('blog.subtitle'),
  ogTitle: () => t('blog.title'),
  ogDescription: () => t('blog.subtitle'),
})
```

### queryCollection littéral branching (CRITIQUE — Phase 5 gotcha hérité)
**Source:** `app/pages/blog/[slug].vue` lines 9-13 + `app/pages/test.vue` lines 2-4
**Apply to:** Toute query @nuxt/content en Phase 6 (listing, surround, article)
```typescript
const { data } = await useAsyncData(
  `key-${locale.value}`,
  () => isFr.value
    ? queryCollection('blog_fr').where(...).all()
    : queryCollection('blog_en').where(...).all(),
  { watch: [locale] }
)
```
**Interdiction absolue** : `queryCollection(variable)` → retourne `{}` silencieusement (Pitfall 1 RESEARCH).

### Active route detection (AppHeader pattern)
**Source:** `app/components/layout/AppHeader.vue` lines 25-27 + 45-54
**Apply to:** Pas d'usage direct en Phase 6 — mais pattern suivi implicitement par NuxtLink `aria-current` dans BlogCard et BlogPrevNext si besoin.
```typescript
function isActive(path: string): boolean {
  return route.path === localePath(path)
}
```

### Card hover effect (design system)
**Source:** `app/components/ProjectCard.vue` line 20
**Apply to:** `app/components/BlogCard.vue` (les deux variants)
```
transition-all duration-300 hover:border-brand-500/40 hover:shadow-xl hover:shadow-brand-500/10 hover:-translate-y-1.5
```

### Nitro plugin structure
**Source:** `server/plugins/rate-limit.ts`
**Apply to:** `server/plugins/reading-time.ts`
```typescript
export default defineNitroPlugin((nitroApp) => {
  nitroApp.hooks.hook('<hook-name>', (ctx) => { /* ... */ })
})
```

### Error handling SSR
**Source:** `app/pages/blog/[slug].vue` lines 15-17
**Apply to:** `app/pages/blog/[slug].vue` (conservé dans enrichment)
```typescript
if (!page.value) {
  throw createError({ statusCode: 404, statusMessage: 'Article introuvable' })
}
```
Pas d'UI custom 404 — `error.vue` layout global du projet prend le relais (UI-SPEC §Error state).

---

## No Analog Found

Les fichiers ci-dessous ont un rôle que le codebase n'a jamais implémenté. Le planner doit utiliser les patterns **RESEARCH.md** directement (déjà cités ci-dessus par référence).

| File | Role | Reason | Source à copier |
|------|------|--------|-----------------|
| `app/composables/useReadingTime.ts` | composable pure compute | Aucun composable "transform" pur existe (`useProjects` = data store) | RESEARCH §Pattern 5 ligne 509-517 |
| `app/utils/countWords.ts` | util transform AST | Dossier `app/utils/` à créer | RESEARCH §Pattern 5 ligne 465-488 |
| `server/plugins/reading-time.ts` (hook content:file:afterParse) | Nitro hook ingestion-time | `rate-limit.ts` utilise le hook `request` (runtime), pas `content:file:afterParse` (build/ingest). Structure `defineNitroPlugin` identique mais hook différent | Analog structurel OK (rate-limit.ts) + RESEARCH §Pattern 5 ligne 453-463 pour le body du hook |
| `app/components/BlogToc.vue` IntersectionObserver | client-side DOM observer | Aucun composant existant n'observe le scroll | RESEARCH §Pattern 4 ligne 393-440 |

---

## Metadata

**Analog search scope:** `app/pages/`, `app/components/`, `app/composables/`, `server/plugins/`, `content.config.ts`, `i18n/locales/`
**Files scanned:** 10+ (projects.vue, ProjectCard.vue, blog/[slug].vue, test.vue, AppHeader.vue, ProseImg.vue, rate-limit.ts, contact.post.ts, content.config.ts, fr.json, en.json)
**Pattern extraction date:** 2026-04-22
