# Architecture

**Analysis Date:** 2026-04-10

## SSR Strategy

Nuxt 4 with `ssr: true` and `compatibilityVersion: 4`. Every page renders server-side HTML with SEO metadata before hydrating client-side. Cookie-only persistence for locale and theme (no localStorage, SSR-safe).

## Layer Breakdown

```
Pages (app/pages/)
  └─> Layout (app/layouts/default.vue)
       ├─> AppHeader (nav, locale toggle, theme toggle)
       ├─> Page content (slot)
       └─> AppFooter (social links, copyright)
            └─> Components (app/components/)
                 └─> Composables (app/composables/)
                      └─> Static Data (app/data/)
                           └─> Shared Types (shared/types/)

Server (server/api/)
  └─> Contact POST handler (nodemailer SMTP)
```

## Data Flow

### Static Data + i18n
1. `app/data/projects.ts` exports projects WITHOUT translatable fields (title, description, longDescription omitted)
2. `app/composables/useProjects.ts` merges static data with i18n translations at runtime via `computed()`
3. Components consume `useProjects()` which returns reactive translated data
4. Language changes trigger recomputation automatically

### SSR Render Flow
1. Request hits Nitro server
2. Nuxt resolves locale from cookie (`i18n_redirected`) or URL prefix (`/en/`)
3. `useLocaleHead()` in `app.vue` sets `<html lang="...">` and alternate links
4. Page's `useSeoMeta()` resolves i18n keys server-side
5. `useHead()` injects JSON-LD structured data
6. Full HTML sent to client with correct locale, theme class, SEO metadata

### Theme Resolution
1. `@nuxtjs/color-mode` reads `nuxt-color-mode` cookie
2. Default: `dark` for new visitors
3. Cookie persistence — no flash on cold load (class applied server-side)

### Contact Form Flow
1. Client: Zod validation in `ContactForm.vue`
2. POST to `/api/contact` (Nitro route)
3. Server: manual validation, nodemailer SMTP via `useRuntimeConfig()` env vars
4. Response: success/error JSON

## Module System

| Module | Purpose |
|--------|---------|
| `@nuxt/ui` | Component library (Nuxt UI v3) |
| `@nuxtjs/i18n` | Internationalization (prefix_except_default, FR default) |
| `@nuxtjs/sitemap` | Auto-generated sitemap with i18n alternates |
| `nuxt-gtag` | Google Analytics (runtime config) |
| `@nuxt/image` | Image optimization |
| `@nuxt/eslint` | ESLint integration |

## Entry Points

| File | Role |
|------|------|
| `app/app.vue` | Root — wraps in `<UApp>`, applies `useLocaleHead()` |
| `app/layouts/default.vue` | Default layout — AppHeader + slot + AppFooter |
| `app/error.vue` | Global error handler (404 page) |
| `nuxt.config.ts` | App configuration |
| `app.config.ts` | Nuxt UI theme tokens (primary color) |

## State Management

No Pinia store. All state is:
- **Composable-scoped:** `useProjects()` returns reactive computed data
- **Module-managed:** locale via `@nuxtjs/i18n`, theme via `@nuxtjs/color-mode`
- **Component-local:** `ref()` / `reactive()` in `<script setup>`

## Error Handling

- Pages: `throw createError({ status: 404 })` for invalid routes/IDs
- `app/error.vue` catches all errors with i18n messages and navigation back
- Contact form: `try/catch/finally` with `useToast()` user feedback
- Server routes: `createError({ statusCode: 400 })` for validation failures

## Cross-Cutting Concerns

- **SEO:** `useSeoMeta()` per page + `useHead()` for JSON-LD + `useLocaleHead()` global
- **Accessibility:** Semantic HTML, aria attributes, keyboard navigation
- **i18n:** All user-facing text via `t()` keys, `te()` guards for optional keys
- **Images:** WebP in `public/images/`, served via `@nuxt/image`

---

*Architecture analysis: 2026-04-10*
