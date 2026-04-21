# Phase 5: @nuxt/content Setup & Renderer — Research

**Researched:** 2026-04-21
**Domain:** @nuxt/content v3, Shiki, @tailwindcss/typography v4, MDC components
**Confidence:** HIGH

---

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions
- **D-01:** Utiliser `@tailwindcss/typography` (plugin officiel). Classe `prose dark:prose-invert` sur le wrapper `<article>`. Compatible Tailwind v4, support dark mode natif synchronisé avec `colorMode` existant.
- **D-02:** Implémenter les callouts via la syntaxe MDC de `@nuxt/content` — `::alert{type="warning"}` dans le markdown appelle un composant Vue dédié (`components/content/Alert.vue`). Aucun HTML brut dans les fichiers markdown.
- **D-03:** Dossiers par langue : `content/fr/blog/` et `content/en/blog/`. Un fichier markdown par article par langue, avec le même slug. Aligné avec `@nuxtjs/i18n` strategy `prefix_except_default`.
- **D-04:** Shiki intégré à `@nuxt/content` v3 (zéro dépendance supplémentaire). Langages à déclarer dans `nuxt.config.ts` : Kotlin, Java, TypeScript, Shell. Thème dark/light synchronisé avec `colorMode` du site.

### Claude's Discretion
- Choix du thème Shiki exact (ex: `github-dark` / `github-light` ou variante) — cohérence avec la charte dark/light du site.
- Nombre et types de callouts MDC à créer au minimum (au moins : info, warning, tip).
- Frontmatter schema exact des articles (title, description, date, tags, image...) — à définir mais pas bloquant pour cette phase.

### Deferred Ideas (OUT OF SCOPE)
- Pages /blog et /blog/[slug] — Phase 6
- SEO par article (useSeoMeta, JSON-LD Article) — Phase 7
- Articles seed Hytale réels — Phase 8
- Frontmatter complet avec og:image par article — Phase 7
</user_constraints>

---

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| BLOG-01 | Intégration `@nuxt/content` — renderer markdown complet (syntax highlighting, images, embeds, tables, callouts/alerts) | Couvert par stack + patterns ci-dessous |
| BLOG-04 | Blocs de code avec syntax highlighting (Kotlin, Java, TypeScript, Shell) | Shiki intégré, config `highlight.langs` confirmée |
| BLOG-05 | Support images dans articles — images optimisées avec `<NuxtImg>` | ProseImg.vue override pattern confirmé |
</phase_requirements>

---

## Summary

`@nuxt/content` v3 (actuellement v3.6.3) est pleinement compatible avec Nuxt 4 (`compatibilityVersion: 4`). La v3 introduit une rupture majeure par rapport à la v2 : une nouvelle architecture basée sur **SQLite** (au lieu de fichiers parsés en mémoire) et un fichier de configuration dédié `content.config.ts` où l'on déclare les **collections**. Cette approche collection-based est exactement ce qu'il faut pour la structure bilingue `content/fr/blog/` et `content/en/blog/`.

Le stack se compose de trois briques : (1) `@nuxt/content` v3 pour le parsing et la query API, (2) Shiki intégré pour le highlighting sans dépendance supplémentaire, (3) `@tailwindcss/typography` pour le styling `prose`. L'intégration avec `@nuxt/image` se fait via un composant override `components/content/ProseImg.vue`. Sur Node.js 22 (la cible de ce projet), le connecteur SQLite natif est disponible sans installer `better-sqlite3`.

Point d'attention pnpm : `@nuxt/content` nécessite l'ajout de `better-sqlite3` OU l'activation du connecteur natif Node 22 dans `onlyBuiltDependencies`. Le projet utilise déjà `pnpm.onlyBuiltDependencies` dans `package.json` — il faudra soit y ajouter `better-sqlite3`, soit activer `experimental.sqliteConnector: 'native'` (recommandé car Node 22 est déjà la cible).

**Recommandation principale :** Utiliser `experimental.sqliteConnector: 'native'` pour éviter toute dépendance supplémentaire — le Dockerfile cible déjà `node:22-alpine` (Node 22.5+).

---

## Architectural Responsibility Map

| Capability | Tier Primaire | Tier Secondaire | Rationale |
|------------|---------------|-----------------|-----------|
| Parsing et indexation markdown | Serveur (build) | — | @nuxt/content compile les fichiers en DB SQLite au build |
| Rendu HTML depuis markdown | Serveur (SSR) | Client (hydration) | ContentRenderer s'exécute côté serveur |
| Syntax highlighting | Build/Serveur | — | Shiki génère le HTML coloré au build, pas au runtime |
| Images optimisées dans articles | Serveur (SSR) | CDN/Edge | NuxtImg génère les directives d'optimisation SSR-side |
| Composants MDC (callouts) | Serveur (SSR) | Client | Composants Vue auto-importés, rendus en SSR |
| Query des articles par locale | Serveur (SSR) | — | `queryCollection()` dans les pages = data fetching SSR |

---

## Standard Stack

### Core
| Librairie | Version | Rôle | Pourquoi |
|-----------|---------|------|---------|
| @nuxt/content | ^3.6.3 | CMS file-based, parsing markdown, query API | Module officiel Nuxt, Shiki intégré, MDC natif |
| @tailwindcss/typography | ^0.5.x | Styles `prose` pour le HTML généré | Plugin officiel, syntaxe `@plugin` Tailwind v4 |

### Supporting (déjà installés)
| Librairie | Version | Rôle | Note |
|-----------|---------|------|------|
| @nuxt/image | ^2.0.0 | Optimisation images via ProseImg override | Déjà dans le projet |
| tailwindcss | ^4.2.2 | Déjà présent | Supporte `@plugin` directive |

### Alternatives considérées
| Standard | Alternative | Tradeoff |
|----------|-------------|----------|
| Shiki intégré | Prism.js | Shiki = zero install, meilleur rendu, thèmes Shiki-compatibles |
| @tailwindcss/typography | CSS prose custom | Typography = 0 maintenance, dark mode natif |
| ProseImg override | MDC component custom | Override = transparent pour les auteurs |

**Installation :**
```bash
pnpm add @nuxt/content
pnpm add -D @tailwindcss/typography
```

**Versions vérifiées :**
- `@nuxt/content` : v3.6.3 [VERIFIED: Context7 registry]
- `@tailwindcss/typography` : compatible Tailwind v4 via `@plugin` directive [VERIFIED: github.com/tailwindlabs/tailwindcss-typography]

---

## Architecture Patterns

### Diagramme de flux

```
Fichiers markdown (content/fr/blog/, content/en/blog/)
          │
          ▼ (build time)
  @nuxt/content parser + Shiki
          │  SQLite DB générée
          ▼
  content.config.ts collections (blog_fr, blog_en)
          │
          ▼ (SSR request)
  queryCollection('blog_fr' | 'blog_en')
          │  document parsé retourné
          ▼
  <ContentRenderer :value="page" />
          │
          ├─── ProseImg.vue → <NuxtImg> (images optimisées)
          ├─── ProsePre.vue / ProseCode → HTML Shiki (coloration)
          ├─── Alert.vue (MDC ::alert{type}) → <UAlert> stylisé
          └─── prose dark:prose-invert wrapper (typography)
```

### Structure de fichiers recommandée
```
content/
├── fr/
│   └── blog/
│       └── test-kotlin-syntax.md    # article de test
└── en/
    └── blog/
        └── test-kotlin-syntax.md    # même slug, contenu EN

content.config.ts                    # collections blog_fr + blog_en

components/
└── content/
    ├── ProseImg.vue                  # override → NuxtImg
    ├── Alert.vue                     # MDC ::alert{type="info|warning|tip"}
    └── (optionnel: ProseCode.vue)    # si customisation inline code

assets/css/main.css                  # ajouter @plugin "@tailwindcss/typography"
```

### Pattern 1 : Configuration nuxt.config.ts
```typescript
// Source: content.nuxt.com/docs/getting-started/configuration
export default defineNuxtConfig({
  modules: [
    // ... modules existants
    '@nuxt/content'
  ],
  content: {
    build: {
      markdown: {
        highlight: {
          theme: {
            default: 'github-light',
            dark: 'github-dark'
          },
          langs: ['kotlin', 'java', 'typescript', 'shell', 'bash', 'json', 'vue']
        }
      }
    },
    experimental: {
      sqliteConnector: 'native'  // Node 22+ natif, pas de better-sqlite3
    }
  }
})
```

### Pattern 2 : content.config.ts (collections bilingues)
```typescript
// Source: content.nuxt.com/docs/integrations/i18n
import { defineContentConfig, defineCollection, z } from '@nuxt/content'

const blogSchema = z.object({
  title: z.string(),
  description: z.string(),
  date: z.string(),
  tags: z.array(z.string()).optional(),
  image: z.string().optional(),
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

### Pattern 3 : @tailwindcss/typography avec Tailwind v4
```css
/* assets/css/main.css */
/* Source: github.com/tailwindlabs/tailwindcss-typography */
@import "tailwindcss";
@plugin "@tailwindcss/typography";
```

Usage dans un composant :
```html
<article class="prose dark:prose-invert max-w-none">
  <ContentRenderer :value="page" />
</article>
```

### Pattern 4 : ProseImg.vue — override NuxtImg
```vue
<!-- components/content/ProseImg.vue -->
<!-- Source: github.com/nuxt/content/discussions/2082 -->
<script setup lang="ts">
interface Props {
  src: string
  alt?: string
  title?: string
  width?: string | number
  height?: string | number
}
const props = withDefaults(defineProps<Props>(), {
  alt: '',
})
</script>

<template>
  <NuxtImg
    :src="props.src"
    :alt="props.alt"
    :title="props.title"
    :width="props.width"
    :height="props.height"
    class="rounded-lg w-full"
    sizes="sm:600px md:800px lg:1000px"
  />
</template>
```

### Pattern 5 : Composant MDC Alert.vue
```vue
<!-- components/content/Alert.vue -->
<!-- Usage markdown: ::alert{type="warning"} Contenu :: -->
<script setup lang="ts">
interface Props {
  type?: 'info' | 'warning' | 'tip' | 'danger'
}
const props = withDefaults(defineProps<Props>(), {
  type: 'info',
})

const iconMap = {
  info: 'i-heroicons-information-circle',
  warning: 'i-heroicons-exclamation-triangle',
  tip: 'i-heroicons-light-bulb',
  danger: 'i-heroicons-x-circle',
}
const colorMap = {
  info: 'info',
  warning: 'warning',
  tip: 'success',
  danger: 'error',
}
</script>

<template>
  <UAlert
    :icon="iconMap[props.type]"
    :color="colorMap[props.type] as any"
    variant="soft"
    class="my-4"
  >
    <template #description>
      <ContentSlot :use="$slots.default" unwrap="p" />
    </template>
  </UAlert>
</template>
```

### Pattern 6 : Requête dans une page (preview Phase 6)
```typescript
// Source: content.nuxt.com/docs/integrations/i18n
const { locale } = useI18n()
const collectionName = computed(
  () => ('blog_' + locale.value) as 'blog_fr' | 'blog_en'
)
const { data: page } = await useAsyncData('article', () =>
  queryCollection(collectionName.value).path(route.path).first()
)
```

### Anti-Patterns à éviter
- **Ne pas utiliser `nativeSqlite: true`** — option dépréciée, utiliser `sqliteConnector: 'native'` à la place.
- **Ne pas mettre `better-sqlite3` dans dependencies** — inutile avec Node 22 natif ; alourdit l'image Docker.
- **Ne pas nommer les composants MDC avec des tirets dans le fichier** — nommer `Alert.vue` pas `alert-component.vue`. Le mapping MDC utilise le nom PascalCase du fichier.
- **Ne pas utiliser `v-html` pour le rendu markdown** — toujours passer par `<ContentRenderer>` pour bénéficier des Prose overrides.
- **Ne pas oublier `ContentSlot` dans les composants MDC avec slots** — le contenu entre `::alert` et `::` doit passer par `<ContentSlot :use="$slots.default" />` sinon il n'est pas rendu.
- **Ne pas confondre `prefix` et dossier source** dans `content.config.ts` — `prefix` définit le path URL, `source.include` définit où chercher les fichiers.

---

## Don't Hand-Roll

| Problème | Ne pas construire | Utiliser à la place | Pourquoi |
|----------|------------------|---------------------|---------|
| Syntax highlighting | Parseur custom regex | Shiki (intégré @nuxt/content) | 200+ langages, thèmes CSS variables, SSR-safe |
| Typography styles | CSS prose custom | @tailwindcss/typography | Dark mode, responsive, rythme vertical correct |
| Image optimisation dans articles | `<img>` natif | ProseImg.vue + NuxtImg | Lazy loading, formats modernes, responsive sizes |
| Callouts/alerts | HTML brut dans markdown | MDC + composants Vue | Type-safe, ré-utilisable, stylisable via Nuxt UI |
| Parsing SQLite | Driver custom | `experimental.sqliteConnector: 'native'` | Node 22 built-in, zéro install |

---

## Common Pitfalls

### Pitfall 1 : pnpm build scripts bloqués pour SQLite
**Ce qui se passe :** `pnpm install` refuse d'exécuter les scripts de build de `better-sqlite3` par défaut.
**Pourquoi :** pnpm v10+ restreint les scripts de build.
**Comment éviter :** Utiliser `experimental.sqliteConnector: 'native'` — aucune dépendance SQLite externe nécessaire sur Node 22. Si `better-sqlite3` est quand même nécessaire, ajouter `"better-sqlite3"` dans `pnpm.onlyBuiltDependencies` (déjà configuré dans `package.json`).
**Signal d'alerte :** Erreur `Cannot find module 'better-sqlite3'` au démarrage.

### Pitfall 2 : Thèmes Shiki et classe CSS du dark mode
**Ce qui se passe :** Le thème `dark` ne s'applique pas — le code reste en thème clair.
**Pourquoi :** Shiki dual-theme fonctionne via la classe `html.dark`. Le projet configure `colorMode` avec `classSuffix: ''`, ce qui génère bien `class="dark"` sur `<html>` — c'est compatible.
**Comment éviter :** Vérifier que `colorMode.classSuffix` reste `''` dans `nuxt.config.ts`. Shiki génère automatiquement les CSS variables pour les deux thèmes.
**Signal d'alerte :** Code toujours en clair même en mode dark → inspecter `<html class>`.

### Pitfall 3 : `source.prefix` mal configuré dans content.config.ts
**Ce qui se passe :** Les articles FR apparaissent sous `/blog/...` au lieu de `/fr/blog/...`, ou vice-versa.
**Pourquoi :** La valeur `prefix` dans `defineCollection.source` définit le path URL racine de la collection.
**Comment éviter :** Pour `content/fr/blog/*.md` avec i18n `prefix_except_default` (FR = default sans préfixe) : `prefix: '/blog'` pour la collection FR, `prefix: '/en/blog'` pour EN.

### Pitfall 4 : ContentSlot manquant dans composants MDC avec contenu
**Ce qui se passe :** Le contenu entre `::alert` et `::` n'est pas affiché.
**Pourquoi :** Les composants MDC reçoivent leur contenu via un slot — il faut explicitement le rendre avec `<ContentSlot :use="$slots.default" unwrap="p" />`.
**Comment éviter :** Toujours inclure `ContentSlot` dans les composants MDC qui acceptent du contenu.
**Signal d'alerte :** Alert visible mais vide.

### Pitfall 5 : @tailwindcss/typography et Tailwind v4 — ancienne syntaxe
**Ce qui se passe :** `plugins: [require('@tailwindcss/typography')]` dans `tailwind.config.js` est ignoré.
**Pourquoi :** Tailwind v4 n'utilise plus `tailwind.config.js` pour les plugins — tout passe par le CSS avec `@plugin`.
**Comment éviter :** Utiliser `@plugin "@tailwindcss/typography";` dans `assets/css/main.css`.
**Signal d'alerte :** Les classes `prose` n'ont aucun effet visible.

---

## Code Examples

### Article de test markdown (critère de validation)
```markdown
---
title: "Test Kotlin Syntax Highlighting"
description: "Article de test pour valider le renderer"
date: "2026-04-21"
tags: ["kotlin", "hytale", "test"]
---

## Bloc de code Kotlin

```kotlin
fun main() {
    println("Hello, Hytale!")
}
```

## Image optimisée

![Test image](/images/test.png)

## Tableau

| Colonne A | Colonne B |
|-----------|-----------|
| Valeur 1  | Valeur 2  |

## Callout

::alert{type="info"}
Ceci est un callout d'information.
::
```

### Kotlin dans Shiki — langages Shiki acceptés
```typescript
// Noms de langages valides pour Shiki :
// 'kotlin' ✓, 'java' ✓, 'typescript' ✓ (ou 'ts'), 'shell' ✓ (ou 'bash', 'sh')
highlight: {
  langs: ['kotlin', 'java', 'typescript', 'shell', 'bash', 'json', 'vue', 'html', 'css']
}
```

---

## State of the Art

| Ancienne approche | Approche actuelle | Changement | Impact |
|-------------------|-------------------|------------|--------|
| @nuxt/content v2 (fichiers en mémoire) | v3 (SQLite) | v3.0.0 (2024) | Nouvelle API `queryCollection()`, fichier `content.config.ts` requis |
| `experimental.nativeSqlite: true` | `experimental.sqliteConnector: 'native'` | v3.x (2025) | Ancienne option dépréciée |
| `plugins: [require('...')]` dans tailwind.config.js | `@plugin "..."` dans CSS | Tailwind v4 (2024) | tailwind.config.js supprimé |
| `<NuxtContent>` (v2) | `<ContentRenderer :value="page">` (v3) | v3.0.0 | Composant renommé et refactorisé |

**Déprécié :**
- `queryContent()` (v2) → remplacé par `queryCollection()` (v3) — ne pas utiliser l'ancienne API
- `experimental.nativeSqlite` → utiliser `experimental.sqliteConnector: 'native'`

---

## Assumptions Log

| # | Claim | Section | Risque si faux |
|---|-------|---------|----------------|
| A1 | Le thème Shiki `github-dark`/`github-light` est cohérent avec la charte visuelle du site | Standard Stack / Pattern 1 | Mineur — changeable post-implémentation |
| A2 | `assets/css/main.css` existe et est déjà l'entrée CSS principale (référencé dans nuxt.config.ts `css: ['~/assets/css/main.css']`) | Pattern 3 | Si le fichier n'existe pas, il faut le créer avec le contenu complet |
| A3 | Le prefix collection FR doit être `/blog` (pas `/fr/blog`) car `prefix_except_default` avec FR comme locale par défaut | Pattern 2 | Moyen — si faux, les URLs des articles seront mal formées |

---

## Open Questions (RESOLVED)

1. **Frontmatter schema définitif** — RESOLVED
   - `tags`: `z.array(z.string()).optional()` dans content.config.ts (array, pas string)
   - `image`: chemin relatif depuis `public/` (ex: `/images/og-image.png`) — string optionnel
   - `author`: implicite depuis `site.ts` (pas dans le frontmatter de cette phase — ajouté en Phase 7 si besoin)

2. **Prefix des collections i18n** — RESOLVED
   - `source.prefix` pour `blog_fr` : `/blog` (FR est la locale par défaut, pas de préfixe `/fr/` grâce à `prefix_except_default`)
   - `source.prefix` pour `blog_en` : `/en/blog` (EN est préfixé)
   - Aligné avec la strategy `prefix_except_default` de `@nuxtjs/i18n`

---

## Environment Availability

| Dépendance | Requis par | Disponible | Version | Fallback |
|------------|-----------|-----------|---------|----------|
| Node.js 22 | `sqliteConnector: 'native'` (22.5+) | ✓ (Dockerfile node:22-alpine) | 22+ | Installer better-sqlite3 |
| pnpm | Install @nuxt/content | ✓ (package.json pnpm field présent) | — | — |
| @nuxt/image | ProseImg.vue → NuxtImg | ✓ (déjà dans package.json) | ^2.0.0 | — |

**Aucune dépendance bloquante sans fallback.**

---

## Validation Architecture

> `workflow.nyquist_validation` non configuré — traité comme activé.

### Test Framework
| Propriété | Valeur |
|-----------|--------|
| Framework | Manuel (vitest non configuré) |
| Config file | Aucune |
| Quick run command | `pnpm dev` + navigation sur l'article de test |
| Full suite command | `pnpm build && pnpm preview` |

### Phase Requirements → Test Map

| Req ID | Comportement | Type de test | Commande | Fichier existe? |
|--------|-------------|-------------|----------|----------------|
| BLOG-01 | ContentRenderer rend un fichier .md | smoke | `pnpm dev` — vérifier /blog/test-kotlin-syntax | ❌ Wave 0 |
| BLOG-04 | Bloc ```kotlin coloré avec thème dark/light | visuel | Inspecter DOM — spans avec classes Shiki | ❌ Wave 0 |
| BLOG-05 | Image dans article rendue via NuxtImg | visuel | Inspecter balise `<img>` — attributs srcset présents | ❌ Wave 0 |

### Wave 0 Gaps
- [ ] `content/fr/blog/test-kotlin-syntax.md` — article de test couvrant BLOG-01, BLOG-04, BLOG-05
- [ ] `content/en/blog/test-kotlin-syntax.md` — version EN du même article
- [ ] `content.config.ts` — collections blog_fr + blog_en
- [ ] `components/content/ProseImg.vue` — override NuxtImg
- [ ] `components/content/Alert.vue` — composant MDC callout
- [ ] `assets/css/main.css` — vérifier/créer avec `@plugin "@tailwindcss/typography"`

---

## Security Domain

### Applicable ASVS Categories

| Catégorie ASVS | Applicable | Contrôle standard |
|----------------|-----------|-------------------|
| V5 Input Validation | Oui (faible) | Le markdown est statique (fichiers gérés par l'auteur) — pas d'input utilisateur dans cette phase |
| V6 Cryptography | Non | — |

**Note sécurité :** Le markdown est géré par l'auteur (fichiers statiques). Pas d'injection utilisateur possible dans cette phase. Le rendu HTML via ContentRenderer est sûr — Shiki génère du HTML échappé. Aucun XSS vector identifié.

---

## Sources

### Primaires (HIGH confidence)
- [content.nuxt.com/docs/getting-started/installation](https://content.nuxt.com/docs/getting-started/installation) — installation, pnpm, SQLite native
- [content.nuxt.com/docs/getting-started/configuration](https://content.nuxt.com/docs/getting-started/configuration#highlight) — Shiki dual theme, langs
- [content.nuxt.com/docs/components/prose](https://content.nuxt.com/docs/components/prose) — liste composants Prose, ProseImg
- [content.nuxt.com/docs/files/markdown](https://content.nuxt.com/docs/files/markdown) — MDC syntax
- [content.nuxt.com/docs/integrations/i18n](https://content.nuxt.com/docs/integrations/i18n) — collections bilingues
- [github.com/tailwindlabs/tailwindcss-typography](https://github.com/tailwindlabs/tailwindcss-typography) — `@plugin` syntax Tailwind v4
- Context7 `/nuxt/content` — version v3.6.3 confirmée

### Secondaires (MEDIUM confidence)
- [masteringnuxt.com/blog/mastering-prose-components-in-nuxt-content](https://masteringnuxt.com/blog/mastering-prose-components-in-nuxt-content) — ProseImg.vue pattern avec NuxtImg
- [github.com/nuxt/content/discussions/2082](https://github.com/nuxt/content/discussions/2082) — recommandation ProseImg + NuxtImg

---

## Metadata

**Confidence breakdown :**
- Standard stack : HIGH — versions vérifiées, docs officielles consultées
- Architecture patterns : HIGH — examples tirés de la doc officielle
- Pitfalls : MEDIUM — combinaison doc officielle + patterns communautaires vérifiés
- Tailwind v4 + typography : HIGH — vérifié sur le repo officiel

**Research date :** 2026-04-21
**Valid until :** 2026-05-21 (librairies stables, pas de breaking changes attendus)
