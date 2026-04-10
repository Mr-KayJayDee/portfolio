# Coding Conventions

**Analysis Date:** 2026-04-10

## Naming Patterns

**Files:**
- Vue components: PascalCase — `AppHeader.vue`, `ProjectCard.vue`, `ContactForm.vue`
- Pages (Nuxt file-based routing): kebab-case — `about.vue`, `project/[id].vue`
- Layouts: kebab-case — `default.vue`
- Composables: camelCase with `use` prefix — `useProjects.ts`
- Data files: camelCase — `projects.ts`, `faq.ts`, `site.ts`, `techstack.ts`, `testimonials.ts`
- Type files: `index.ts` in a typed directory — `shared/types/index.ts`
- Server routes: `[name].[method].ts` Nitro convention — `contact.post.ts`
- Config files: camelCase — `nuxt.config.ts`, `app.config.ts`

**Functions:**
- Exported composables: `useX()` — `useProjects()` in `app/composables/useProjects.ts`
- Toggle handlers: verb + noun — `toggleLocale()`, `toggleTheme()`
- Query predicates: verb + noun — `isActive(path)`, `findById(id)`, `filterByCategory(category)`, `search(query)`
- Async handlers: `onX` prefix — `onSubmit(event)`
- Event handlers: `defineEventHandler` (Nitro server) — `server/api/contact.post.ts`

**Variables:**
- Reactive refs: camelCase — `mobileOpen`, `loading`
- Computed values: camelCase — `navLinks`, `translatedCategory`, `relatedProjects`, `featuredProjects`
- Constants/config exports: camelCase — `siteConfig`, `projects`, `homeFAQs`

**Types:**
- Interfaces: PascalCase — `Project`, `ProjectButton`, `Technology`, `TechStack`, `SiteConfig`, `FAQ`
- Props interfaces: always named `Props` in `<script setup>` — see `app/components/ProjectCard.vue`
- Type aliases derived from Zod: inline `type Schema = z.output<typeof schema>` — `app/components/ContactForm.vue`
- Enum-like string unions: `'Beginner' | 'Intermediate' | 'Advanced'` — `Technology.level` in `shared/types/index.ts`

## Code Style

**Formatting:**
- No dedicated Prettier config at root; formatting via ESLint through `@nuxt/eslint`
- ESLint config `eslint.config.mjs` delegates entirely to `withNuxt()` from `.nuxt/eslint.config.mjs`
- `@nuxt/eslint` module generates type-aware rules; `typescript: { strict: true }` in `nuxt.config.ts`

**Observed style from source:**
- No semicolons
- Single quotes for strings
- Trailing commas in multi-line objects/arrays
- 2-space indentation
- Long template attribute chains are NOT broken across lines (single long lines acceptable in templates)

## TypeScript Usage

**Strict Mode:** `typescript: { strict: true }` in `nuxt.config.ts` — all strict checks enforced project-wide.

**Type imports:** Always use `import type` for type-only imports:
```typescript
import type { Project } from '~~/shared/types'
import type { FormSubmitEvent } from '@nuxt/ui'
```

**Props typing:** Always `defineProps<Props>()` with an explicit interface named `Props`:
```typescript
interface Props {
  project: Project
}
const props = defineProps<Props>()
```

**Return type inference:** Composables rely on inference; explicit generics where needed:
```typescript
const projects = computed<Project[]>(() => projectsData.map(...))
```

**Zod for runtime validation:** Client-side form schemas with Zod in components (`ContactForm.vue`). Server-side uses manual validation with `createError` — Zod not used on server.

## Import Organization

**Path Aliases:**
- `~/` -> `app/` directory (Nuxt 4 convention)
- `~~/` -> project root (for cross-layer imports: `~~/shared/types`)
- Use `~/data/projects` for app-internal imports; `~~/shared/types` to reach shared layer

**Import order (observed):**
1. Third-party: `import { z } from 'zod'`
2. Nuxt UI types: `import type { FormSubmitEvent } from '@nuxt/ui'`
3. Internal types: `import type { Project } from '~~/shared/types'`
4. Internal data: `import { projects as projectsData } from '~/data/projects'`
5. Auto-imports (no explicit import): `ref`, `computed`, `reactive`, `useI18n`, `useRoute`, `useColorMode`, `useSeoMeta`, `useHead`, `useToast`, `useLocalePath`

**Auto-imports:** All Nuxt/Vue composables and all `app/components/**/*.vue` components are auto-imported. Never write explicit `import ref from 'vue'` or component imports in `.vue` files. `pathPrefix: false` in `nuxt.config.ts` means `AppHeader` registers as `AppHeader` not `LayoutAppHeader`.

## Vue Patterns

**Component structure order:**
1. `<script setup lang="ts">` — always first, always `lang="ts"`
2. `<template>` — second
3. No `<style>` blocks — all styling via Tailwind utility classes

**Composition API rules:**
- `<script setup>` exclusively — no Options API
- Destructure composables at top: `const { t } = useI18n()`
- `ref()` for mutable primitives: `const mobileOpen = ref(false)`
- `reactive()` for multi-field form state: `const state = reactive({ name: '', email: '', message: '' })`
- `computed()` for derived state: `const relatedProjects = computed(() => [...])`
- `useTemplateRef()` for component refs (Vue 3.5 API): `const galleryRef = useTemplateRef('gallery')`

**Pages pattern:**
- `useSeoMeta()` called at top of each page's `<script setup>` with reactive getter functions
- Structured data injected via `useHead({ script: [{ type: 'application/ld+json', innerHTML: JSON.stringify({...}) }] })`
- 404s thrown inline: `throw createError({ status: 404, statusText: 'Project not found' })`

**i18n:**
- `useI18n()` called at component level; `t`, `locale`, `setLocale`, `te` destructured as needed
- `useLocalePath()` used for all `<NuxtLink :to>` values: `:to="localePath('/projects')"`
- `te()` guards optional translation keys before `t()` call

**Error handling:**
- Async operations wrapped in `try/catch/finally` with user feedback via `useToast()`

**Template conventions:**
- Semantic HTML: `<header>`, `<nav>`, `<article>`, `<aside>`, `<section>`, `<time>`
- Schema.org microdata: `itemscope`, `itemtype`, `itemprop` attributes directly on elements
- `aria-*` on all interactive elements and navigation landmarks
- `aria-current="page"` on active nav links
- `aria-hidden="true"` on decorative/background elements

## Composable Design

```typescript
export function useProjects() {
  // logic
  return {
    projects,
    featuredProjects,
    filterByCategory,
    search,
    findById,
  }
}
```

- Always return a named object, never a single value
- Filter/find functions return `computed()` so callers get reactivity

## Data Layer Conventions

**Static data** in `app/data/`:
- Export named typed constants
- Translatable fields omitted; resolved at runtime via i18n in the composable layer
- `app/data/projects.ts` exports `Omit<Project, 'title' | 'description' | 'longDescription'>[]`

**Shared types** in `shared/types/index.ts`:
- Single source for all domain interfaces
- Imported by both `app/` and `server/` via `~~/shared/types`

**Server routes** in `server/api/`:
- Use `defineEventHandler`, `readBody`, `useRuntimeConfig(event)`
- Manual input validation with `createError({ statusCode: 400 })`
- Return plain serializable objects

---

*Convention analysis: 2026-04-10*
