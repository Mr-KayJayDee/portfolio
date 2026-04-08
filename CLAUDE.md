<!-- GSD:project-start source:PROJECT.md -->
## Project

**Portfolio Killian' Dalcin — Migration Nuxt 4**

Migration complète d'un portfolio freelance de Vue 3 SPA vers Nuxt 4 avec SSR complet. Le site présente les projets, services et compétences de Killian' Dalcin, développeur freelance, avec support bilingue FR/EN. L'objectif est un SEO parfait et un développement rapide via des composants prêts à l'emploi (Nuxt UI v3).

**Core Value:** Chaque page du portfolio doit être crawlable par les moteurs de recherche sans JavaScript côté client — le SSR est la raison d'être de cette migration.

### Constraints

- **Stack**: Nuxt 4 + Nuxt UI v3 + Tailwind v4 — dernières versions stables
- **Coût**: Zéro dépendance payante
- **Composants**: Nuxt UI v3 en priorité sur le custom (80% suffit)
- **TypeScript**: Mode strict partout
- **Déploiement**: Docker node:22-alpine, nuxt build (SSR) ou nuxt generate (SSG) selon stratégie
- **i18n/Theme**: Persistance cookie uniquement (SSR-safe), pas de localStorage
<!-- GSD:project-end -->

<!-- GSD:stack-start source:codebase/STACK.md -->
## Technology Stack

## Languages
- TypeScript ~5.8.0 - Full application development
- JavaScript (ES modules) - Frontend runtime
- HTML5 - Document structure (in `index.html`)
- CSS - Styling with Tailwind CSS
- Markdown - Documentation (README.md)
- YAML - Configuration (implied through Dockerfile)
## Runtime
- Node.js 22 - Development and build environment
- Browser environment - Vue 3 SFC runtime
- npm - Dependency management
- Lockfile: `package-lock.json` (present and tracked)
## Frameworks
- Vue 3.5.13 - Progressive JavaScript framework for UI
- Vue Router 4.5.0 - Client-side routing with lazy-loaded pages
- Pinia 3.0.1 - State management (minimal usage - currently only `counter.ts`)
- Vue I18n 9.14.4 - Internationalization (English and French locale files in `src/locales/`)
- Vite 6.2.4 - Build tool and dev server
- Vite Plugin Vue DevTools 7.7.2 - Development utilities
- @vitejs/plugin-vue 5.2.3 - Vue 3 SFC support
- Tailwind CSS 4.1.10 - Utility-first CSS framework
- @tailwindcss/postcss 4.1.10 - PostCSS plugin for Tailwind
- PostCSS 8.5.6 - CSS transformation pipeline
- Autoprefixer 10.4.21 - Vendor prefix handling
- Terser 5.43.1 - JavaScript minification
- ESLint 9.22.0 - Linting (config: `eslint.config.ts`)
- Prettier 3.5.3 - Code formatting (config: `.prettierrc.json`)
- vue-tsc 2.2.8 - Vue component type checking
- TypeScript compiler with `type-check` npm script
- @vueuse/head 2.0.0 - Dynamic document head management for meta tags and SEO
## Key Dependencies
- vue 3.5.13 - Core framework
- vue-router 4.5.0 - SPA routing with code splitting
- pinia 3.0.1 - State management store
- vue-i18n 9.14.4 - Multi-language support
- vite 6.2.4 - Next-gen build tool with HMR
- tailwindcss 4.1.10 - Rapid UI development
- typescript 5.8.0 - Static typing and compilation
- eslint 9.22.0 - Code linting
- prettier 3.5.3 - Code formatting
- npm-run-all2 7.0.2 - Parallel script execution (used in build process)
- @tsconfig/node22 22.0.1 - TSConfig preset for Node 22
- @types/node 22.14.0 - Node.js type definitions
- jiti 2.4.2 - CommonJS loader for TypeScript modules
## Configuration
- No `.env` files detected in source
- Google Analytics tracking ID hardcoded: `G-CDVVNFY6MV` (in `index.html`)
- Umami analytics script loaded from `umami.killiandalcin.fr` (in `index.html`)
- Google AdSense client ID hardcoded: `ca-pub-5219367964457248` (in `index.html`)
- `vite.config.ts` - Build optimizations:
- `tsconfig.json` - References `tsconfig.app.json` and `tsconfig.node.json`
- `tsconfig.app.json`:
- `eslint.config.ts` - Flat config format:
- `.prettierrc.json`:
- `postcss.config.js` - Tailwind CSS and Autoprefixer
- `tailwind.config.js` - Content scanning for `index.html` and `src/**/*.{vue,js,ts,jsx,tsx}`
## Platform Requirements
- Node.js 22+ (specified in Dockerfile)
- npm 10+ (implied by Node 22)
- TypeScript 5.8+
- Any Unix-like shell (bash/zsh) or Windows with Node.js
- Docker - Multi-stage build with Node 22-alpine and nginx stable-alpine
- Web server: nginx (configured in `nginx.conf`)
- Deployment target: Static HTML served via nginx
- JavaScript enabled (noscript fallback message in `index.html`)
- Modern browsers with ES2020+ support (Vite default targets)
## Scripts & Commands
<!-- GSD:stack-end -->

<!-- GSD:conventions-start source:CONVENTIONS.md -->
## Conventions

## Naming Patterns
- Vue components: PascalCase (e.g., `AppHeader.vue`, `ProjectCard.vue`)
- Composables: camelCase with `use` prefix (e.g., `useTheme.ts`, `useProjects.ts`)
- Utility/config files: camelCase (e.g., `site.ts`, `techstack.ts`)
- Data files: camelCase (e.g., `testimonials.ts`, `faq.ts`)
- Type definitions: camelCase in `types/index.ts`
- All functions use camelCase (e.g., `toggleTheme`, `openGallery`, `getImageUrl`)
- Composables are named with `use` prefix: `useTheme()`, `useGallery()`, `useSeo()`
- Getter functions use `get` prefix: `getTheme()`, `getImageUrl()`
- Boolean functions/computed use `is`/`has` prefix: `isDark`, `hasNext`, `isOpen`
- Handler functions use verb + `Handler`: `toggleTheme`, `openGallery`, `closeGallery`
- Refs and computed properties: camelCase (e.g., `isDark`, `currentIndex`, `isOpen`)
- Interfaces and types: PascalCase (e.g., `Props`, `SeoOptions`, `Theme`)
- Constants: UPPER_SNAKE_CASE for config constants (not extensively used in codebase)
- Private/module state: camelCase prefixed with `_` if truly private
- Type aliases: PascalCase (e.g., `type Theme = 'light' | 'dark'`)
- Interface names: PascalCase (e.g., `interface Props`, `interface SeoOptions`)
- Props interfaces: Always named `Props` (e.g., in `<script setup lang="ts">` components)
- Generic types from Vue use their original names (e.g., `Ref<boolean>`, `Computed<string>`)
## Code Style
- Tool: Prettier 3.5.3
- Semi-colons: **disabled** (`semi: false`)
- Quotes: **single quotes** (`singleQuote: true`)
- Print width: **100 characters** (`printWidth: 100`)
- Tool: ESLint 9.22.0 with Vue support
- Config: `eslint.config.ts` using flat config format
- Plugins: 
## Import Organization
- `@/` maps to `./src/` (configured in `tsconfig.app.json`)
- Always use `@/` prefix for imports from src directory
- Examples:
## Error Handling
- Try-catch blocks wrap risky operations (e.g., dynamic imports, DOM manipulation)
- Fallback values provided when operations fail:
- Console warnings for non-critical failures:
- Silent failures with fallbacks preferred over throwing errors for UI operations
## Logging
- `console.warn()` for warnings (missing assets, invalid input)
- Logging only in composables for utility functions
- No console.log() in production code (only development/debugging)
- Error context included: `console.warn('context', error)`
## Comments
- JSDoc comments for composable functions (exported functions)
- Inline comments for non-obvious logic (especially SEO handling in router)
- Comments explaining why (not what the code does)
- TODO comments for known issues: `// TODO: page 404` in `src/router/index.ts`
- Composables include JSDoc for exported functions
- Example from `useAssets.ts`:
- Not consistently applied across all files; use when function signature isn't obvious
## Function Design
- Props interfaces always named `Props` in components
- Use destructuring in setup: `const { t } = useI18n()`
- Optional config objects in composables (e.g., `SeoOptions` with defaults)
- Explicit typing on all parameters
- Composables return object with all exposed functions and reactive state
- Always return computed versions of reactive state when exposing refs:
- Functions return early on validation failures with fallbacks
## Module Design
- Composables export single named function: `export function useTheme() { ... }`
- Config files export named constants: `export const siteConfig: SiteConfig = { ... }`
- Type definitions export interfaces and types: `export interface Project { ... }`
- Data files export arrays or objects: `export const techStack: TechStack = { ... }`
- Not extensively used; direct imports preferred
- Only `src/types/index.ts` serves as barrel export for type definitions
- Components use direct imports: `import AppHeader from '@/components/layout/AppHeader.vue'`
- `<script setup lang="ts">` for all components (Vue 3 Composition API)
- Props validated with TypeScript interfaces
- Composables called at top of setup
- Computed properties for derived state
- Functions defined after setup calls
- `<template>` uses semantic HTML and accessibility attributes
- Scoped styles at bottom with `@import` for external stylesheets
## Type Safety
- Version: ~5.8.0
- DOM-focused (`tsconfig.dom.json` from @vue/tsconfig)
- Path alias `@/*` points to `./src/*`
- Type checking enabled in build: `npm run type-check` runs `vue-tsc --build`
- All component Props use interface definitions
- Composable return values typed explicitly
- Function parameters and return types annotated
- Type imports use `import type` syntax
- Avoid `any` type; use proper interfaces/generics
## Vue 3 Specific
- `<script setup>` syntax exclusively used
- No Options API in codebase
- Composables follow Composition API patterns
- `onMounted()` for initialization (theme loading, SEO setup)
- `onUnmounted()` for cleanup (removing DOM elements in useSeo)
- `watch()` for reactive side effects (theme changes)
- `ref()` for primitive state
- `computed()` for derived state
- Avoid unnecessary reactivity; use constants when possible
- Return computed versions of refs from composables
<!-- GSD:conventions-end -->

<!-- GSD:architecture-start source:ARCHITECTURE.md -->
## Architecture

## Pattern Overview
- Client-side routing with lazy-loaded views for performance optimization
- Composition API-based composables for shared logic and state management
- Global state managed via Pinia stores
- Multi-language support with vue-i18n
- Theme switching with localStorage persistence
- SEO-optimized with dynamic meta tags and structured data
- Google Analytics and GTM integration for tracking
## Layers
- Purpose: Render UI and handle user interactions
- Location: `src/components/`
- Contains: Vue Single File Components organized by domain (layout, sections, shared, testimonials, icons)
- Depends on: Composables for data access and side effects, Router for navigation
- Used by: Views and other components
- Purpose: Page-level component assembly and routing targets
- Location: `src/views/`
- Contains: Full page components (HomePage, ProjectsPage, ContactPage, AboutPage, FiverrPage, FormationPage, ProjectDetailPage)
- Depends on: Composables (useSeo, useI18n, useProjects), components, data stores
- Used by: Router for navigation
- Purpose: Encapsulate reusable logic, data fetching, and side effects
- Location: `src/composables/`
- Contains: Vue composables for projects, SEO, i18n, themes, galleries, date formatting, assets, site config
- Depends on: Types, stores, external libraries (vue-router, vue-i18n)
- Used by: Components and views
- Purpose: Global state and static data management
- Location: `src/stores/`, `src/data/`
- Contains: Pinia stores, static project data, testimonials, tech stack, FAQs
- Depends on: Types, composables (useI18n for localized data)
- Used by: Composables and components
- Purpose: Application-wide settings and configuration
- Location: `src/config/`, `src/router/`, `src/i18n/`
- Contains: Site configuration, router setup, i18n initialization, locale messages
- Depends on: Types, data
- Used by: Main entry point and throughout app
- Purpose: TypeScript interfaces and types
- Location: `src/types/index.ts`
- Contains: Project, Technology, TechStack, SocialLink, ContactInfo, FiverrService, SiteConfig interfaces
## Data Flow
- **Global:** Pinia stores (currently minimal - `useCounterStore` exists but unused)
- **Composable State:** Reactive refs in composables (theme, locale, gallery state)
- **Component State:** Local reactive refs for UI state (menu toggle, form inputs)
- **Persistence:** localStorage for theme and locale preferences
- **Server-Side Data:** Static JSON-like data in `src/data/` files, not fetched from API
## Key Abstractions
- Purpose: Unified i18n access with convenience methods
- Examples: `src/composables/useI18n.ts`
- Pattern: Wraps vue-i18n's `useI18n()`, adds locale switching and computed locale state
- Usage: Available in all components via injection
- Purpose: Dynamic SEO tag management for SPA
- Examples: `src/composables/useSeo.ts`
- Pattern: Lifecycle hooks to create/remove meta tags on mount/unmount, prevents tag duplication
- Usage: Called in view components with options object for title, description, OG tags, structured data
- Purpose: Project data access with localization
- Examples: `src/composables/useProjects.ts`
- Pattern: Base data stored separately, computed properties merge translations on read
- Usage: Returns computed `projects` array that updates when language changes
- Purpose: Centralized theme state and persistence
- Examples: `src/composables/useTheme.ts`
- Pattern: Reactive boolean with computed getter, watch for persistence, DOM manipulation
- Usage: Injected globally in App.vue, consumed by ThemeToggle component
- Purpose: Typed structure for technology categories
- Examples: `src/types/index.ts`
- Pattern: Categorized array structure (programming, front, database, devtools, operating_systems, socials)
- Usage: Imported in `src/data/techstack.ts` and AboutPage.vue
- Purpose: Single source of truth for site-wide settings
- Examples: `src/config/site.ts`
- Pattern: Exported constant object with typed structure, includes contact info, social links, SEO config
- Usage: Imported where needed for links, contact info, performance settings
## Entry Points
- Location: `index.html`
- Triggers: Browser page load
- Responsibilities: Define DOM root (`#app`), load analytics/ads scripts, include meta tags, defer main.ts loading
- Location: `src/main.ts`
- Triggers: After HTML DOM ready
- Responsibilities: Create Vue app, install plugins (Pinia, Router, i18n), mount to #app
- Location: `src/router/index.ts`
- Triggers: App.use(router) in main.ts
- Responsibilities: Define route table, implement beforeEach/afterEach hooks for SEO and analytics
- Location: `src/App.vue`
- Triggers: After Vue app mounts
- Responsibilities: Initialize theme, render layout structure (header + router-view + footer), handle route-change scroll behavior
- Location: `src/views/*.vue`
- Triggers: Router navigation to matching path
- Responsibilities: Page-specific SEO setup via `useSeo()`, compose sections and content, manage page-level state
## Error Handling
- Lazy-loaded routes with no 404 component (TODO comment in router) - currently redirects to HomePage
- SEO composable safely creates/finds meta elements before updating
- Theme fallback to 'dark' if localStorage empty
- Locale fallback to 'en' if not in localStorage
- Gallery modal (GalleryModal.vue) handles missing images gracefully
- Contact form likely has validation but not visible in read scope
## Cross-Cutting Concerns
<!-- GSD:architecture-end -->

<!-- GSD:skills-start source:skills/ -->
## Project Skills

No project skills found. Add skills to any of: `.claude/skills/`, `.agents/skills/`, `.cursor/skills/`, or `.github/skills/` with a `SKILL.md` index file.
<!-- GSD:skills-end -->

<!-- GSD:workflow-start source:GSD defaults -->
## GSD Workflow Enforcement

Before using Edit, Write, or other file-changing tools, start work through a GSD command so planning artifacts and execution context stay in sync.

Use these entry points:
- `/gsd-quick` for small fixes, doc updates, and ad-hoc tasks
- `/gsd-debug` for investigation and bug fixing
- `/gsd-execute-phase` for planned phase work

Do not make direct repo edits outside a GSD workflow unless the user explicitly asks to bypass it.
<!-- GSD:workflow-end -->



<!-- GSD:profile-start -->
## Developer Profile

> Profile not yet configured. Run `/gsd-profile-user` to generate your developer profile.
> This section is managed by `generate-claude-profile` -- do not edit manually.
<!-- GSD:profile-end -->
