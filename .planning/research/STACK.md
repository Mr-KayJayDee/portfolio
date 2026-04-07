# Technology Stack

**Project:** Portfolio Killian Dalcin — Nuxt 4 SSR Migration
**Researched:** 2026-04-07
**Knowledge cutoff:** August 2025 — all versions marked LOW confidence must be verified against npm before pinning

---

## IMPORTANT: Version Verification Required

All network tools were unavailable during this research session. Versions below are from training data (cutoff August 2025). Before starting the project, run:

```bash
npm info nuxt version
npm info @nuxt/ui version
npm info @nuxtjs/i18n version
npm info @nuxtjs/color-mode version
npm info @nuxtjs/sitemap version
npm info @nuxtjs/seo version
npm info nuxt-gtag version
npm info @pinia/nuxt version
npm info @nuxt/image version
npm info @nuxt/eslint version
```

---

## Recommended Stack

### Core Framework

| Technology | Version (training data) | Confidence | Purpose | Why |
|------------|------------------------|------------|---------|-----|
| nuxt | ^4.0.0 | LOW — verify on npm | SSR framework | Only reason this migration exists: per-route SSR so every page is crawlable without client JS. Nuxt 4 is the current stable major. |
| vue | ^3.5.x | MEDIUM | UI layer | Peer dependency of Nuxt 4; Vue 3.5 introduces `useTemplateRef` and improved reactivity — no action needed, Nuxt manages it |
| typescript | ^5.x | MEDIUM | Type safety | Nuxt 4 ships its own TS config; strict mode enforced via `tsconfig.json` extends |
| node | 22.x LTS | HIGH | Runtime | Matches Docker base image `node:22-alpine`; Node 22 is current LTS as of April 2026 |

### UI & Styling

| Technology | Version (training data) | Confidence | Purpose | Why |
|------------|------------------------|------------|---------|-----|
| @nuxt/ui | ^3.0.0 | LOW — verify on npm | Component library | v3 is built on Tailwind v4 and Radix Vue, ships production-ready components (UModal, UForm, UInput, UTextarea). Replaces ~80% of custom component work. v2 is NOT compatible with Tailwind v4. |
| tailwindcss | ^4.0.0 | LOW — verify on npm | Utility CSS | Bundled as a dependency of @nuxt/ui v3; do NOT install separately or pin a conflicting version. Tailwind v4 ships as a Vite/PostCSS plugin, no `tailwind.config.js` needed. |
| @nuxtjs/color-mode | ^3.5.x | LOW — verify on npm | Dark/light mode | Nuxt-native module; writes a cookie on the server, so no FOUC and no hydration mismatch. `localStorage` alternative is explicitly broken for SSR. Must set `storage: 'cookie'` in config. |

### Internationalisation

| Technology | Version (training data) | Confidence | Purpose | Why |
|------------|------------------------|------------|---------|-----|
| @nuxtjs/i18n | ^9.x | LOW — verify on npm | FR/EN i18n | v9 is the Nuxt 4-compatible major. v8 targets Nuxt 3. Uses `useCookie()` for locale persistence (SSR-safe). Must set `detectBrowserLanguage.cookieKey` and `cookieCrossOrigin` appropriately; `localStorage` fallback must be disabled. |
| vue-i18n | ^10.x | LOW — peer dep | Translation runtime | Peer dep of @nuxtjs/i18n v9; do not install vue-i18n v9 (Nuxt 3 era). |

### SEO

| Technology | Version (training data) | Confidence | Purpose | Why |
|------------|------------------------|------------|---------|-----|
| @nuxtjs/sitemap | ^6.x | LOW — verify on npm | sitemap.xml | Auto-generates sitemap from Nuxt routes including i18n alternates. Required by the PROJECT.md spec. Must be configured with `i18n` option when @nuxtjs/i18n is present to emit `hreflang` entries. |
| @nuxtjs/seo | ^2.x | LOW — verify on npm | SEO meta bundle | Meta-module that installs and pre-configures `@nuxtjs/sitemap`, `nuxt-og-image`, `nuxt-schema-org`, `nuxt-link-checker`. Using it avoids duplicate sitemap config. If using @nuxtjs/seo, do NOT also install @nuxtjs/sitemap standalone (conflict risk). Choose one. |

> **Decision needed:** Use `@nuxtjs/seo` (meta-module, installs sitemap + og-image + schema-org) OR install `@nuxtjs/sitemap` standalone and `useSeoMeta()` manually. Recommendation: use `@nuxtjs/seo` because the portfolio needs og:image and JSON-LD (project requirement), and the meta-module wires them together with zero boilerplate.

### Analytics

| Technology | Version (training data) | Confidence | Purpose | Why |
|------------|------------------------|------------|---------|-----|
| nuxt-gtag | ^3.x | LOW — verify on npm | Google Analytics 4 | Replaces GA4 hardcoded in `index.html`. Injects `gtag.js` via Nuxt's head management, respects SSR. Must be configured with `id: 'G-XXXXXXXX'` from `runtimeConfig.public`. |

### State Management

| Technology | Version (training data) | Confidence | Purpose | Why |
|------------|------------------------|------------|---------|-----|
| @pinia/nuxt | ^0.9.x | LOW — verify on npm | Global state | Required if any state needs to survive navigation (e.g., project filter state). For a portfolio with mostly static data this may be optional; include it anyway because Pinia integrates with Nuxt devtools and SSR hydration is handled automatically. |
| pinia | ^3.x | LOW — peer dep | Pinia core | Peer dep of @pinia/nuxt; version must match. |

### Images

| Technology | Version (training data) | Confidence | Purpose | Why |
|------------|------------------------|------------|---------|-----|
| @nuxt/image | ^1.x | LOW — verify on npm | Optimised images | `<NuxtImg>` replaces `<img>` for automatic lazy loading, srcset, and format conversion. Project requirement: lazy load project gallery images. Use `provider: 'ipx'` (built-in, no external service). |

### Developer Tooling

| Technology | Version (training data) | Confidence | Purpose | Why |
|------------|------------------------|------------|---------|-----|
| @nuxt/eslint | ^0.7.x | LOW — verify on npm | ESLint + Prettier | Nuxt-native flat config ESLint. Replaces manual eslint + prettier wiring. Enforces Vue 3 best practices. One module, one config file. |

### Infrastructure

| Technology | Version | Confidence | Purpose | Why |
|------------|---------|------------|---------|-----|
| Docker node:22-alpine | 22-alpine | HIGH | Container base | Alpine keeps image small (~50MB base). Node 22 matches the runtime. Multi-stage build: stage 1 installs deps + builds, stage 2 copies `.output/` only. |

---

## Alternatives Considered

| Category | Recommended | Alternative | Why Not |
|----------|-------------|-------------|---------|
| UI library | @nuxt/ui v3 | Vuetify, PrimeVue, custom | Nuxt UI v3 is Tailwind-native, ships ready for Nuxt 4, has UModal/UForm exactly as specced. Others require extra adapter work. |
| CSS | Tailwind v4 (via @nuxt/ui) | Tailwind v3, UnoCSS, plain CSS | v4 is the current generation; UnoCSS is a valid alternative but adds config overhead with no benefit for this scope. |
| i18n | @nuxtjs/i18n v9 | lingui, custom composable | @nuxtjs/i18n has Nuxt 4 SSR cookie support built-in; alternatives require manual SSR wiring. |
| Analytics | nuxt-gtag | Umami (self-hosted) | Umami is out of scope per PROJECT.md. nuxt-gtag is the standard Nuxt-native GA4 module. |
| State | @pinia/nuxt | useState() only | useState() is fine for simple per-component state but Pinia is needed for shared filter state across pages. Include it from day one to avoid a refactor. |
| CMS | Static TS data files | @nuxt/content | PROJECT.md explicitly rules out @nuxt/content. Data is bilingual TS objects already; keep them. |
| Contact form backend | EmailJS | Custom API, Formspree | No backend to maintain. EmailJS free tier is sufficient for a portfolio contact form. Not a Nuxt module — just an npm package (`emailjs-com`). |
| Sitemap + SEO meta | @nuxtjs/seo (bundle) | @nuxtjs/sitemap standalone | @nuxtjs/seo includes og-image and schema-org which the project spec requires. One module is simpler. |

---

## What NOT to Use

| Package | Reason |
|---------|--------|
| vue-router (manual) | Nuxt 4 ships file-based routing on top of vue-router; never import vue-router directly in a Nuxt project |
| @nuxt/content | Explicitly out of scope; TS data files are simpler and already exist |
| localStorage for i18n/theme | Not readable on server; causes hydration mismatch and FOUC. Use cookies only. |
| Tailwind v3 | @nuxt/ui v3 requires Tailwind v4. Mixing versions breaks everything. |
| @nuxtjs/i18n v8 | Only compatible with Nuxt 3. v9 is required for Nuxt 4. |
| nuxt generate (full SSG) | May be considered for perf, but SSR is the core value of this migration (per PROJECT.md). Use `nuxt build` + node server in Docker. Revisit after launch if edge deployment is added. |

---

## nuxt.config.ts Skeleton

```typescript
export default defineNuxtConfig({
  compatibilityDate: '2025-01-01',

  modules: [
    '@nuxt/ui',
    '@nuxtjs/i18n',
    '@nuxtjs/color-mode',
    '@nuxtjs/seo',       // includes sitemap, og-image, schema-org
    'nuxt-gtag',
    '@pinia/nuxt',
    '@nuxt/image',
    '@nuxt/eslint',
  ],

  colorMode: {
    preference: 'system',
    fallback: 'light',
    storage: 'cookie',   // SSR-safe: no FOUC
  },

  i18n: {
    locales: ['fr', 'en'],
    defaultLocale: 'fr',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      redirectOn: 'root',
    },
  },

  gtag: {
    id: '', // set via runtimeConfig.public.gtag.id
  },

  image: {
    provider: 'ipx',
  },

  typescript: {
    strict: true,
  },
})
```

---

## Docker Production Setup

```dockerfile
# Stage 1: build
FROM node:22-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Stage 2: runtime
FROM node:22-alpine AS runner
WORKDIR /app
COPY --from=builder /app/.output ./output
ENV NODE_ENV=production
ENV PORT=3000
EXPOSE 3000
CMD ["node", "output/server/index.mjs"]
```

Key points:
- Only `.output/` is copied to the final image. No `node_modules/`, no source files.
- `node:22-alpine` is the project constraint (matches dev runtime).
- Nuxt 4 SSR server entry is `.output/server/index.mjs`.

---

## Installation

```bash
# Scaffold Nuxt 4 project
npx nuxi@latest init portfolio --template=v4-compat
cd portfolio

# Core modules
npm install @nuxt/ui @nuxtjs/i18n @nuxtjs/color-mode @nuxtjs/seo nuxt-gtag @pinia/nuxt pinia @nuxt/image

# Dev tooling
npm install -D @nuxt/eslint typescript

# Contact form (not a Nuxt module)
npm install @emailjs/browser
```

---

## Confidence Summary

| Area | Confidence | Notes |
|------|------------|-------|
| Nuxt 4 as framework | MEDIUM | Nuxt 4 was in RC/stable as of mid-2025; verify exact version on npm |
| @nuxt/ui v3 | LOW | v3 was in active development; confirm stable tag on npm |
| @nuxtjs/i18n v9 (Nuxt 4 compat) | LOW | v9 announced for Nuxt 4; confirm it's the `latest` dist-tag |
| @nuxtjs/color-mode cookie storage | MEDIUM | This feature existed in v3.3+; verify it persists in latest |
| @nuxtjs/seo as meta-bundle | MEDIUM | Module has been stable; inclusion of sitemap+og-image confirmed in v2 docs |
| nuxt-gtag | LOW | Verify v3 is compatible with Nuxt 4 |
| @pinia/nuxt | MEDIUM | Pinia 3 + @pinia/nuxt 0.9 tracked Nuxt 4 compat closely |
| Docker node:22-alpine | HIGH | Node 22 is current LTS; Alpine variant is standard |
| EmailJS (non-Nuxt) | HIGH | Stable library, no Nuxt dependency |

---

## Sources

- Training data (knowledge cutoff August 2025) — all external tools blocked during this research session
- PROJECT.md constraints and requirements: `.planning/PROJECT.md`
- npm registry verification required before pinning versions (see commands at top of this file)
