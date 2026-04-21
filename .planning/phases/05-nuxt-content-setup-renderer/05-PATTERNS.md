# Phase 5: @nuxt/content Setup & Renderer — Pattern Map

**Mapped:** 2026-04-21
**Files analyzed:** 7 (2 modifications + 5 créations)
**Analogs found:** 5 / 7

---

## File Classification

| New/Modified File | Role | Data Flow | Closest Analog | Match Quality |
|---|---|---|---|---|
| `nuxt.config.ts` | config | — | `nuxt.config.ts` (lui-même, existant) | exact — extension |
| `content.config.ts` | config | CRUD | `nuxt.config.ts` (structure `defineNuxtConfig`) | role-match |
| `app/assets/css/main.css` | config | — | `app/assets/css/main.css` (lui-même, existant) | exact — extension |
| `app/components/content/ProseImg.vue` | component | request-response | `app/components/ProjectCard.vue` (NuxtImg + Props interface) | role-match |
| `app/components/content/Alert.vue` | component | request-response | `app/components/TechBadge.vue` (withDefaults + UBadge + computed map) | role-match |
| `content/fr/blog/test-kotlin-syntax.md` | content | — | aucun | no-analog |
| `content/en/blog/test-kotlin-syntax.md` | content | — | aucun | no-analog |

---

## Pattern Assignments

### `nuxt.config.ts` (config — extension)

**Analog:** `nuxt.config.ts` lui-même (ligne 1–65)

**État actuel** (lignes 7–14) :
```typescript
modules: [
  '@nuxt/ui',
  '@nuxtjs/i18n',
  '@nuxt/eslint',
  '@nuxtjs/sitemap',
  'nuxt-gtag',
  '@nuxt/image'
],
```

**Pattern à ajouter — ajout dans `modules`** :
```typescript
modules: [
  '@nuxt/ui',
  '@nuxtjs/i18n',
  '@nuxt/eslint',
  '@nuxtjs/sitemap',
  'nuxt-gtag',
  '@nuxt/image',
  '@nuxt/content'       // ← ajouter ici
],
```

**Pattern à ajouter — bloc `content` après les modules existants** :
```typescript
content: {
  build: {
    markdown: {
      highlight: {
        theme: {
          default: 'github-light',
          dark: 'github-dark'
        },
        langs: ['kotlin', 'java', 'typescript', 'shell', 'bash', 'json', 'vue', 'html', 'css']
      }
    }
  },
  experimental: {
    sqliteConnector: 'native'  // Node 22+ — pas de better-sqlite3
  }
},
```

**Contexte critique :** `colorMode.classSuffix: ''` est déjà configuré ligne 29 — Shiki dual-theme fonctionne via `html.dark`, donc compatible sans modification.

---

### `content.config.ts` (config — création, racine du projet)

**Analog:** Structure `nuxt.config.ts` (pattern `defineNuxtConfig` → `defineContentConfig`)

**Pattern complet** (source: RESEARCH.md Pattern 2) :
```typescript
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
      source: { include: 'fr/blog/**/*.md', prefix: '/blog' },
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

**Note sur le prefix :** `i18n.strategy: 'prefix_except_default'` avec `defaultLocale: 'fr'` → les articles FR sont sous `/blog/slug`, les EN sous `/en/blog/slug`. (Assumption A3 de RESEARCH.md — valider avec l'article de test.)

---

### `app/assets/css/main.css` (config — extension)

**Analog:** `app/assets/css/main.css` lui-même (lignes 1–3, existant)

**État actuel** (lignes 1–3) :
```css
@import "tailwindcss";
@import "@nuxt/ui";
```

**Pattern à ajouter — une ligne après `@import "@nuxt/ui"`** :
```css
@import "tailwindcss";
@import "@nuxt/ui";
@plugin "@tailwindcss/typography";  /* ← ajouter ici — syntaxe Tailwind v4 obligatoire */
```

**Anti-pattern à éviter :** Ne pas utiliser `plugins: [require('@tailwindcss/typography')]` dans `tailwind.config.js` — ignoré en Tailwind v4.

---

### `app/components/content/ProseImg.vue` (component, request-response)

**Analog:** `app/components/ProjectCard.vue` — utilisation de `NuxtImg` avec Props interface (lignes 1–16, 25–35)

**Imports pattern** (depuis ProjectCard.vue, lignes 1–3) :
```vue
<script setup lang="ts">
// Pas d'import externe — NuxtImg est auto-importé par @nuxt/image
```

**Props pattern** (depuis ProjectCard.vue, lignes 4–8) :
```typescript
interface Props {
  project: Project
}
const props = defineProps<Props>()
```

**NuxtImg pattern** (depuis ProjectCard.vue, lignes 26–35) :
```vue
<NuxtImg
  :src="project.image"
  :alt="`...`"
  loading="lazy"
  format="webp"
  width="400"
  height="300"
  class="w-full h-52 object-cover"
/>
```

**Pattern cible pour ProseImg.vue** (adapté avec `withDefaults` — depuis TechBadge.vue ligne 11) :
```vue
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

---

### `app/components/content/Alert.vue` (component, request-response)

**Analog:** `app/components/TechBadge.vue` — `withDefaults` + computed map de valeurs + composant Nuxt UI (`UBadge`) (lignes 1–57)

**withDefaults pattern** (depuis TechBadge.vue, lignes 11–13) :
```typescript
const props = withDefaults(defineProps<Props>(), {
  showLevel: true,
  showImage: true,
})
```

**Computed map pattern** (depuis TechBadge.vue, lignes 44–56) :
```typescript
const levelColor = computed(() => {
  switch (techData.value.level) {
    case 'Advanced': return 'success' as const
    case 'Intermediate': return 'primary' as const
    default: return 'neutral' as const
  }
})
```

**Pattern cible pour Alert.vue** (adapté avec `UAlert` Nuxt UI + `ContentSlot` MDC) :
```vue
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

**Point critique :** `<ContentSlot :use="$slots.default" unwrap="p" />` est obligatoire — sans lui le contenu entre `::alert` et `::` n'est pas rendu (Pitfall 4 RESEARCH.md).

---

### `content/fr/blog/test-kotlin-syntax.md` (content — création)

**Analog:** aucun (pas de fichiers markdown dans le projet actuellement)

**Pattern depuis RESEARCH.md (Code Examples)** :
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

**Critère de validation :** Ce fichier doit couvrir les 4 success criteria : bloc Kotlin coloré (BLOG-04), image via ProseImg (BLOG-05), tableau, callout (BLOG-01).

---

### `content/en/blog/test-kotlin-syntax.md` (content — création)

**Analog:** même structure que la version FR, même slug, contenu traduit en anglais.

---

## Shared Patterns

### Props avec valeurs par défaut (withDefaults)
**Source:** `app/components/TechBadge.vue` lignes 11–14
**Apply to:** `ProseImg.vue`, `Alert.vue`
```typescript
const props = withDefaults(defineProps<Props>(), {
  // valeurs par défaut pour props optionnelles
})
```

### NuxtImg usage
**Source:** `app/components/ProjectCard.vue` lignes 26–35, `app/components/TechBadge.vue` lignes 65–74
**Apply to:** `ProseImg.vue`
- Toujours utiliser `:src`, `:alt`, `loading="lazy"` au minimum
- `format="webp"` si format fixe, sinon laisser @nuxt/image décider
- `sizes` pour responsive

### Composants Nuxt UI (UAlert, UBadge)
**Source:** `app/components/TechBadge.vue` ligne 76, `app/components/FAQSection.vue` ligne 33
**Apply to:** `Alert.vue`
- Nuxt UI est auto-importé — pas d'import explicite nécessaire
- Utiliser `color` + `variant` pour le style
- `as any` acceptable pour les types union non-exhaustifs de Nuxt UI

### Convention import types
**Source:** `app/components/ProjectCard.vue` ligne 2
**Apply to:** `content.config.ts`
```typescript
import type { ... } from '~~/shared/types'  // types partagés
import { ... } from '@nuxt/content'          // imports de librairie
```

### Auto-import composants
**Source:** `nuxt.config.ts` lignes 15–19
**Apply to:** `ProseImg.vue`, `Alert.vue`
```typescript
components: [
  {
    path: '~/components',
    pathPrefix: false,  // → components/content/Alert.vue est auto-importé
  },
],
```
Les composants dans `components/content/` sont auto-importés par Nuxt ET reconnus par `@nuxt/content` comme Prose overrides / composants MDC.

---

## No Analog Found

| File | Role | Data Flow | Reason |
|---|---|---|---|
| `content/fr/blog/test-kotlin-syntax.md` | content | — | Pas de fichiers markdown dans le projet — nouveau format |
| `content/en/blog/test-kotlin-syntax.md` | content | — | Pas de fichiers markdown dans le projet — nouveau format |

Le planner doit utiliser le pattern RESEARCH.md "Code Examples" pour ces deux fichiers.

---

## Metadata

**Analog search scope:** `app/components/`, `app/assets/css/`, `nuxt.config.ts`
**Files scanned:** 6 (nuxt.config.ts, main.css, ProjectCard.vue, TechBadge.vue, FAQSection.vue, app.vue partiel)
**Pattern extraction date:** 2026-04-21
