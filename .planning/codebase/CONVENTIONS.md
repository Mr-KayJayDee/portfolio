# Coding Conventions

**Analysis Date:** 2026-04-07

## Naming Patterns

**Files:**
- Vue components: PascalCase (e.g., `AppHeader.vue`, `ProjectCard.vue`)
- Composables: camelCase with `use` prefix (e.g., `useTheme.ts`, `useProjects.ts`)
- Utility/config files: camelCase (e.g., `site.ts`, `techstack.ts`)
- Data files: camelCase (e.g., `testimonials.ts`, `faq.ts`)
- Type definitions: camelCase in `types/index.ts`

**Functions:**
- All functions use camelCase (e.g., `toggleTheme`, `openGallery`, `getImageUrl`)
- Composables are named with `use` prefix: `useTheme()`, `useGallery()`, `useSeo()`
- Getter functions use `get` prefix: `getTheme()`, `getImageUrl()`
- Boolean functions/computed use `is`/`has` prefix: `isDark`, `hasNext`, `isOpen`
- Handler functions use verb + `Handler`: `toggleTheme`, `openGallery`, `closeGallery`

**Variables:**
- Refs and computed properties: camelCase (e.g., `isDark`, `currentIndex`, `isOpen`)
- Interfaces and types: PascalCase (e.g., `Props`, `SeoOptions`, `Theme`)
- Constants: UPPER_SNAKE_CASE for config constants (not extensively used in codebase)
- Private/module state: camelCase prefixed with `_` if truly private

**Types:**
- Type aliases: PascalCase (e.g., `type Theme = 'light' | 'dark'`)
- Interface names: PascalCase (e.g., `interface Props`, `interface SeoOptions`)
- Props interfaces: Always named `Props` (e.g., in `<script setup lang="ts">` components)
- Generic types from Vue use their original names (e.g., `Ref<boolean>`, `Computed<string>`)

## Code Style

**Formatting:**
- Tool: Prettier 3.5.3
- Semi-colons: **disabled** (`semi: false`)
- Quotes: **single quotes** (`singleQuote: true`)
- Print width: **100 characters** (`printWidth: 100`)

**Linting:**
- Tool: ESLint 9.22.0 with Vue support
- Config: `eslint.config.ts` using flat config format
- Plugins: 
  - `@vue/eslint-config-typescript` - TypeScript support
  - `eslint-plugin-vue` v10.0.0 - Vue 3 rules
  - `@vue/eslint-config-prettier/skip-formatting` - Prettier integration (skip-formatting enabled)

## Import Organization

**Order:**
1. Vue and framework imports (`vue`, `vue-router`, `pinia`, `vue-i18n`)
2. Type imports (use `import type` for TypeScript types)
3. Local components (`@/components/...`)
4. Composables (`@/composables/...`)
5. Utilities and helpers
6. Data and configuration files
7. Styles (scoped CSS imported at end of `<style>`)

**Path Aliases:**
- `@/` maps to `./src/` (configured in `tsconfig.app.json`)
- Always use `@/` prefix for imports from src directory
- Examples:
  - `import AppHeader from '@/components/layout/AppHeader.vue'`
  - `import { useTheme } from '@/composables/useTheme'`
  - `import type { Project } from '@/types'`
  - `import { techStack } from '@/data/techstack'`

## Error Handling

**Patterns:**
- Try-catch blocks wrap risky operations (e.g., dynamic imports, DOM manipulation)
- Fallback values provided when operations fail:
  - In `useAssets()`: returns placeholder image URL if asset fails to load
  - In `useSeo()`: gracefully handles missing meta elements by creating them
- Console warnings for non-critical failures:
  - `console.warn('message')` for warnings during execution
  - Error objects logged with context: `console.warn('Failed to load image: ${path}', error)`
- Silent failures with fallbacks preferred over throwing errors for UI operations

**Examples from codebase:**
```typescript
// In useAssets.ts - graceful fallback
if (!path || path.trim() === '') {
  console.warn('getImageUrl called with empty or undefined path')
  return `https://via.placeholder.com/400x300/f3f4f6/9ca3af?text=${encodeURIComponent('No image')}`
}

// In useSeo.ts - create if missing
let meta = document.querySelector(`meta[${property ? 'property' : 'name'}="${name}"]`)
if (!meta) {
  meta = document.createElement('meta')
  // ... setup ...
  document.head.appendChild(meta)
}
```

## Logging

**Framework:** `console` object (no dedicated logging library)

**Patterns:**
- `console.warn()` for warnings (missing assets, invalid input)
- Logging only in composables for utility functions
- No console.log() in production code (only development/debugging)
- Error context included: `console.warn('context', error)`

## Comments

**When to Comment:**
- JSDoc comments for composable functions (exported functions)
- Inline comments for non-obvious logic (especially SEO handling in router)
- Comments explaining why (not what the code does)
- TODO comments for known issues: `// TODO: page 404` in `src/router/index.ts`

**JSDoc/TSDoc:**
- Composables include JSDoc for exported functions
- Example from `useAssets.ts`:
  ```typescript
  /**
   * Get image URL from assets folder
   * @param path - Path like '@/assets/images/filename.webp' or 'filename.webp'
   * @returns string - The image URL
   */
  const getImageUrl = (path: string | undefined): string => { ... }
  ```
- Not consistently applied across all files; use when function signature isn't obvious

## Function Design

**Size:** Composables are typically 50-100 lines; keep focused on single responsibility

**Parameters:** 
- Props interfaces always named `Props` in components
- Use destructuring in setup: `const { t } = useI18n()`
- Optional config objects in composables (e.g., `SeoOptions` with defaults)
- Explicit typing on all parameters

**Return Values:**
- Composables return object with all exposed functions and reactive state
- Always return computed versions of reactive state when exposing refs:
  ```typescript
  return {
    isOpen,           // reactive ref
    currentImage,     // computed from ref
    openGallery,      // function
    closeGallery      // function
  }
  ```
- Functions return early on validation failures with fallbacks

## Module Design

**Exports:**
- Composables export single named function: `export function useTheme() { ... }`
- Config files export named constants: `export const siteConfig: SiteConfig = { ... }`
- Type definitions export interfaces and types: `export interface Project { ... }`
- Data files export arrays or objects: `export const techStack: TechStack = { ... }`

**Barrel Files:**
- Not extensively used; direct imports preferred
- Only `src/types/index.ts` serves as barrel export for type definitions
- Components use direct imports: `import AppHeader from '@/components/layout/AppHeader.vue'`

**Component Structure (Vue SFC):**
- `<script setup lang="ts">` for all components (Vue 3 Composition API)
- Props validated with TypeScript interfaces
- Composables called at top of setup
- Computed properties for derived state
- Functions defined after setup calls
- `<template>` uses semantic HTML and accessibility attributes
- Scoped styles at bottom with `@import` for external stylesheets

**Example pattern from `AppHeader.vue`:**
```typescript
<script setup lang="ts">
import { ref, computed } from 'vue'
// Composables first
const { getImageUrl } = useAssets()
const { t } = useI18n()
// State
const isMenuOpen = ref(false)
// Computed
const navigation = computed(() => [ ... ])
// Functions
const toggleMenu = () => { ... }
</script>
```

## Type Safety

**TypeScript Configuration:**
- Version: ~5.8.0
- DOM-focused (`tsconfig.dom.json` from @vue/tsconfig)
- Path alias `@/*` points to `./src/*`
- Type checking enabled in build: `npm run type-check` runs `vue-tsc --build`

**Type Usage Patterns:**
- All component Props use interface definitions
- Composable return values typed explicitly
- Function parameters and return types annotated
- Type imports use `import type` syntax
- Avoid `any` type; use proper interfaces/generics

## Vue 3 Specific

**Composition API:**
- `<script setup>` syntax exclusively used
- No Options API in codebase
- Composables follow Composition API patterns

**Lifecycle Hooks:**
- `onMounted()` for initialization (theme loading, SEO setup)
- `onUnmounted()` for cleanup (removing DOM elements in useSeo)
- `watch()` for reactive side effects (theme changes)

**Reactivity:**
- `ref()` for primitive state
- `computed()` for derived state
- Avoid unnecessary reactivity; use constants when possible
- Return computed versions of refs from composables

---

*Convention analysis: 2026-04-07*
