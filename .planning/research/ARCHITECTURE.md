# Architecture Patterns

**Project:** Portfolio Killian' DAL-CIN — Nuxt 4 SSR Migration
**Researched:** 2026-04-07
**Confidence:** HIGH (based on official Nuxt 4 conventions + existing codebase analysis)

---

## Recommended Architecture

```
[ Browser ]
    |
    | HTTP request (SSR-rendered HTML on first load)
    v
[ Nuxt 4 Server (Node 22) ]
    |
    |-- [ app/ ]
    |       |-- [ pages/ ]           File-based routing
    |       |-- [ components/ ]      Auto-imported UI components
    |       |-- [ composables/ ]     Auto-imported reactive logic
    |       |-- [ layouts/ ]         default.vue (header + footer)
    |       |-- [ assets/ ]          Static assets (images, fonts)
    |       |-- [ plugins/ ]         EmailJS init, gtag init
    |
    |-- [ server/ ]
    |       |-- (optional) api/      Not needed — no dynamic data
    |
    |-- [ data/ ]                    Static TS files (projects, testimonials, FAQ, techstack)
    |
    |-- nuxt.config.ts               Modules, runtime config, i18n, color-mode
```

Nuxt 4 uses `app/` as the root source directory (replaces Nuxt 3's flat root layout). All pages, components, composables, layouts, and plugins live under `app/`.

---

## Component Boundaries

| Component | Responsibility | Communicates With |
|-----------|---------------|-------------------|
| `layouts/default.vue` | Shell: TheHeader + TheFooter + `<slot />` | All pages via slot |
| `TheHeader.vue` | Navigation + locale toggle + color-mode toggle | `useI18n()`, `useColorMode()` |
| `TheFooter.vue` | Links, copyright, social | `useI18n()` |
| `pages/index.vue` | Hero + featured projects + services + CTA | `useProjects()`, `useSeoMeta()` |
| `pages/projects.vue` | Project list + filters | `useProjects()` |
| `pages/project/[id].vue` | Project detail + image gallery modal | `useProjects()`, `UModal` (Nuxt UI) |
| `pages/about.vue` | Bio, tech stack | `useI18n()`, static `techstack.ts` |
| `pages/contact.vue` | UForm + EmailJS send | `useContactForm()`, EmailJS plugin |
| `pages/fiverr.vue` | Fiverr landing, service cards | `useI18n()`, static config |
| `pages/formation.vue` | Training/course landing | `useI18n()` |
| `components/ProjectCard.vue` | Reusable card (list + featured) | Props only, no store |
| `components/GalleryModal.vue` | UModal wrapper for project images | Emits only, props: images[] |
| `composables/useProjects.ts` | Filter/search logic over static data | Imports `data/projects.ts` |
| `composables/useSeoMeta.ts` | Per-route `useSeoMeta()` + JSON-LD | Nuxt built-in `useSeoMeta` |
| `data/*.ts` | Static typed data — single source of truth | Imported by composables only |

**Rule:** Pages import composables. Composables import data files. Components receive props and emit events. No page imports another page. No component imports data files directly.

---

## Data Flow

```
data/projects.ts  (static TS, bilingual strings)
        |
        v
composables/useProjects.ts
  - filter by category
  - find by id
  - expose featuredProjects, allProjects
        |
        v
pages/index.vue          → featuredProjects → <ProjectCard />
pages/projects.vue       → allProjects + filters → <ProjectCard />
pages/project/[id].vue   → findById(route.params.id) → detail view + <GalleryModal />
```

```
i18n locale (cookie, SSR-safe)
        |
        v
@nuxtjs/i18n module  (strategy: 'prefix_except_default', defaultLocale: 'fr')
  - /fr/* and /* (default) both work
  - /en/* for English
        |
        v
All pages and composables via useI18n() (auto-imported by @nuxtjs/i18n)
```

```
Color mode (cookie, SSR-safe)
        |
        v
@nuxtjs/color-mode (cookie strategy, no FOUC)
        |
        v
TheHeader.vue toggle → Tailwind dark: classes respond immediately
```

```
Contact form
        |
        v
pages/contact.vue → UForm validation → composables/useContactForm.ts
        |
        v
EmailJS plugin (client-side send, no server route needed)
```

```
SEO per route
        |
        v
Each page calls useSeoMeta() with i18n-translated values
  + JSON-LD script tag on pages/index.vue only
        |
        v
@nuxtjs/sitemap generates sitemap.xml from route list at build time
```

---

## i18n Architecture Decision

Use `@nuxtjs/i18n` v9 with `strategy: 'prefix_except_default'`:
- French (`fr`) is default, served at `/`, `/projects`, `/project/[id]`, etc.
- English served at `/en`, `/en/projects`, `/en/project/[id]`, etc.
- Locale detected from browser `Accept-Language` header on first visit (server-side), then persisted in cookie.
- **No redirect strategy** — prefix_except_default avoids redirect chains that hurt Core Web Vitals.
- Translation strings live in `app/i18n/locales/fr.ts` and `app/i18n/locales/en.ts` (migrated from existing `src/locales/`).

The existing `useI18n.ts` composable wrapping vue-i18n is replaced entirely by the `useI18n()` auto-import provided by `@nuxtjs/i18n`.

---

## Static Data Layer

Decision: static TS files in `data/` (not `@nuxt/content`, not `server/api`).

Rationale:
- All project data is known at build time and changes infrequently.
- `@nuxt/content` adds markdown parsing overhead and a file-system watcher not needed for typed data.
- `server/api` routes add network round-trips and cold-start latency for data that never changes.
- Static TS files are tree-shakeable, fully typed, and zero-overhead.

Migration from `src/data/` is direct: copy files to `data/`, ensure bilingual structure is preserved (FR/EN fields in same object, selected by locale in composables).

---

## Deployment: SSR vs SSG

**Recommendation: `nuxt build` (SSR) not `nuxt generate` (SSG).**

Rationale:
- i18n with cookie-based locale detection requires server execution to read the cookie and render the correct language on first request. SSG pre-renders all routes in one language only.
- `useSeoMeta()` with i18n-reactive values requires server-side execution per request.
- The Docker image runs `node server/index.mjs` (the Nuxt nitro server) — not nginx serving static files.
- SSR does not meaningfully increase operational complexity for a portfolio (low traffic, single container).

Dockerfile pattern: multi-stage — build stage (`node:22-alpine` + `nuxt build`), production stage (copy `.output/` only, `CMD ["node", ".output/server/index.mjs"]`). No nginx layer needed.

---

## Suggested Build Order (Phase Dependencies)

```
1. nuxt.config.ts + nuxt.config modules
   Depends on: nothing
   Blocks: everything — module config must exist before page/component work

2. data/ migration (static TS files)
   Depends on: nothing
   Blocks: composables, all pages that display content

3. composables/ migration
   Depends on: data/
   Blocks: pages that use useProjects(), useSeoMeta()

4. layouts/default.vue + TheHeader + TheFooter
   Depends on: @nuxtjs/i18n working, @nuxtjs/color-mode working
   Blocks: all page development (every page needs a shell)

5. pages/ migration (one page at a time, start with index.vue)
   Depends on: composables, layouts, Nuxt UI v3 components
   Blocks: nothing else — pages are leaf nodes

6. plugins/ (EmailJS, nuxt-gtag)
   Depends on: contact page, nuxt.config
   Blocks: contact form functionality, GA tracking

7. Dockerfile + deployment
   Depends on: all pages complete
   Blocks: production ship
```

**Critical dependency:** `nuxt.config.ts` with `@nuxtjs/i18n`, `@nuxtjs/color-mode`, `@nuxt/ui`, and `@nuxtjs/sitemap` must be functional before any page/component work begins. All auto-imports, CSS variables, and the `useI18n()` composable availability depend on this configuration.

---

## Anti-Patterns to Avoid

### Anti-Pattern 1: localStorage in SSR Context
**What goes wrong:** `localStorage.setItem('locale', ...)` throws ReferenceError on server, causes hydration mismatch.
**Prevention:** Use only `useCookie()` (Nuxt built-in) for any client-persisted state (locale, color mode). Both `@nuxtjs/i18n` and `@nuxtjs/color-mode` handle this when configured with `cookieName`.

### Anti-Pattern 2: `document.*` or `window.*` at module scope
**What goes wrong:** Runs during SSR, crashes server render.
**Prevention:** Wrap in `onMounted()` or use `import.meta.client` guard. The existing router `beforeEach` that calls `document.title` must move to `useSeoMeta()` calls inside each page.

### Anti-Pattern 3: Flat root structure (Nuxt 3 pattern in Nuxt 4)
**What goes wrong:** Nuxt 4 expects `app/` as source directory. Files at project root are not auto-imported.
**Prevention:** All Vue files, composables, components go under `app/`. Configure `srcDir: 'app'` in `nuxt.config.ts` (or rely on Nuxt 4 default).

### Anti-Pattern 4: useAsyncData for static data
**What goes wrong:** `useAsyncData` with a static import adds unnecessary async overhead and serialization. Static data does not need SSR serialization.
**Prevention:** Import static TS data directly in composables. Reserve `useAsyncData` for genuine async operations (external fetch, server routes).

### Anti-Pattern 5: Per-page SEO via router.beforeEach
**What goes wrong:** `document.title` manipulation in router guards is SPA-only, invisible to crawlers.
**Prevention:** Each page calls `useSeoMeta({ title, description, ogTitle, ogDescription, ogImage })` at setup scope — Nuxt handles server-side `<head>` injection.

---

## Sources

- Nuxt 4 source directory convention: official Nuxt 4 migration guide (app/ directory)
- Existing codebase analysis: `src/composables/`, `src/router/index.ts`, `src/locales/`
- PROJECT.md constraints: cookie-only persistence, EmailJS, static TS data, Docker SSR deployment
- Confidence: HIGH for Nuxt 4 file conventions; HIGH for SSR vs SSG decision given i18n cookie requirement; MEDIUM for @nuxtjs/i18n v9 prefix_except_default (verify exact config key names against current docs before implementing)
