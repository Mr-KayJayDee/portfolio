# Technology Stack Research

**Project:** Portfolio Killian' Dalcin — Nuxt 4 SSR
**Researched:** 2026-04-10
**Confidence note:** Web search and WebFetch tools were unavailable. All findings are based on codebase inspection + training knowledge (cutoff August 2025). Items marked LOW confidence require manual verification against current changelogs.

---

## Current Stack Assessment

### Dependency Version Audit

| Package | Current Spec | Assessment | Notes |
|---------|-------------|------------|-------|
| `nuxt` | `^4.0.0` | WATCH | `^4.0.0` resolves to whatever 4.x is latest — fine for dev, pin for prod Docker |
| `@nuxt/ui` | `^3.0.0` | WATCH | v3 was released ~May 2025 with breaking changes from v2; still maturing |
| `@nuxtjs/i18n` | `^10.2.4` | OK | v10 is the Nuxt 4 compatible branch; 10.x has known cookie-detection edge cases |
| `@nuxtjs/sitemap` | `^8.0.12` | OK | v8 is actively maintained for Nuxt 4 |
| `nuxt-gtag` | `^4.1.0` | OK | v4 targets Nuxt 4; works with SSR |
| `@nuxt/image` | `^2.0.0` | OK | v2 is stable for Nuxt 4 |
| `@nuxt/eslint` | `^1.15.2` | OK | Maintained by Nuxt team |
| `zod` | `^4.3.6` | VERIFY | Zod v4 has a changed API vs v3 — confirm your server route imports are v4-compatible |
| `nodemailer` | `^8.0.5` | OK | v8 is stable, ESM-compatible |
| `tailwindcss` | `^4.2.2` | OK | v4 is required by Nuxt UI v3 |
| `vue` | `latest` | RISK | Pinning to `latest` is dangerous — a Vue 3→4 jump (when it ships) would break everything. Pin to `^3.5.0` |
| `vue-router` | `latest` | RISK | Same issue as `vue` — pin to `^4.5.0` |

**Confidence:** MEDIUM (based on release history known through Aug 2025; verify zod v4 API changes specifically)

### Critical Issue: Dockerfile Uses npm, Codebase Uses pnpm

The Dockerfile currently runs `npm ci` and `npm run build`, but the project uses pnpm (`pnpm-lock.yaml` is the canonical lockfile). This means:

- Docker builds ignore `pnpm-lock.yaml` and use `package-lock.json` instead
- Dependency versions in production may differ from development
- `npm ci` with a stale `package-lock.json` is a latent correctness bug

**Fix:** Migrate Dockerfile to pnpm (see pnpm + Docker section below).

---

## Nuxt 4 Breaking Changes and Migration Gotchas

**Confidence:** MEDIUM (verified against nuxt.com docs through Aug 2025)

### Directory Structure (`compatibilityVersion: 4`)

Nuxt 4 moves app code under `app/` by default. The codebase already reflects this (`app/pages/`, `app/components/`, etc.) — this is correct.

Key structural changes vs Nuxt 3:
- `app/` directory is the application root (pages, components, layouts, composables, middleware)
- `server/` stays at project root for API routes
- `public/` stays at project root for static assets
- `~/` alias now resolves to `app/` directory, not project root
- `#imports` auto-imports still work as before

### Auto-imports Scope Change

In Nuxt 4 with `compatibilityVersion: 4`, `~/composables/` means `app/composables/`. Any composable or utility imported with `~/` is relative to `app/` — this is already how the codebase is structured.

### `useAsyncData` and `useFetch` Key Deduplication

Nuxt 4 changed how keys are generated for `useAsyncData`. If two calls share the same auto-generated key, only one runs. When using `useAsyncData` in loops or dynamic components, always pass an explicit unique key. This is especially relevant if you add project detail pages that fetch by ID.

### `useHead` and SSR Hydration

`useHead` in Nuxt 4 requires that reactive values be wrapped in functions (arrow functions returning computed values) to be reactive on the server. The current codebase already uses `() => t('seo.home.title')` pattern in `useSeoMeta` — this is correct.

Static strings (like `ogImage: 'https://killiandalcin.fr/og-image.png'`) are fine as-is for pages where the image doesn't change per-route.

### Server API Routes Location

In Nuxt 4, server routes live in `server/api/` at the project root (not `app/api/`). The codebase `STACK.md` references `app/api/contact.post.ts` — verify this file's actual location and confirm it resolves correctly. If it's under `app/`, it will not be treated as a server route.

**Action required:** Verify `contact.post.ts` is at `server/api/contact.post.ts`.

### `runtimeConfig` Key Naming

In `nuxt.config.ts`, `runtimeConfig` keys like `smtpHost` are accessed as `useRuntimeConfig().smtpHost` in server code, and are populated from environment variables named `NUXT_SMTP_HOST` (Nuxt auto-maps UPPER_SNAKE_CASE env vars to camelCase config keys). This is working correctly in the current config.

---

## Nuxt 4 SEO Best Practices

**Confidence:** HIGH (useSeoMeta is documented Nuxt API; canonical link patterns are well-established)

### Canonical Links (Currently Missing)

The current `index.vue` sets `ogImage`, `ogTitle`, `ogDescription`, `ogType` but does not set a canonical URL. For a bilingual site with `prefix_except_default` strategy, this creates duplicate content risk:

- `https://killiandalcin.fr/` (FR, no prefix)
- `https://killiandalcin.fr/en/` (EN, prefixed)

Both URLs serve different content, so they are not true duplicates. However, canonical tags still prevent ambiguity for crawlers.

**Recommended pattern for every page:**

```typescript
const { locale } = useI18n()
const route = useRoute()

useSeoMeta({
  title: () => t('seo.home.title'),
  description: () => t('seo.home.description'),
  ogTitle: () => t('seo.home.title'),
  ogDescription: () => t('seo.home.description'),
  ogUrl: () => `https://killiandalcin.fr${route.path}`,
  ogImage: '/og-image.png',  // absolute URL resolved by Nuxt at runtime
  ogImageWidth: 1200,
  ogImageHeight: 630,
  ogType: 'website',
})

useHead({
  link: [
    { rel: 'canonical', href: () => `https://killiandalcin.fr${route.path}` },
  ],
})
```

This sets the canonical to the current page's own URL (deduplicated per-language). If you want FR as the canonical for EN pages, that requires a different strategy — but same-URL canonical is simpler and correct for truly separate FR/EN content.

### hreflang (Currently via Sitemap)

The sitemap module (`@nuxtjs/sitemap` v8) generates `<loc>` and `<xhtml:link rel="alternate">` hreflang entries automatically when configured with i18n. This is the recommended approach — do not manually manage hreflang in `useHead`.

Verify the sitemap module config includes:
```typescript
// nuxt.config.ts
sitemap: {
  // sitemap module v8 auto-detects i18n routes when @nuxtjs/i18n is present
}
```

If not configured, add explicit i18n awareness:
```typescript
sitemap: {
  i18n: true,
}
```

### og:image Per Page

The current implementation uses a single hardcoded `og-image.png` for all pages. For project detail pages (`/project/[id]`), a per-project og:image significantly improves social sharing CTR.

**Recommended approach (no external service needed):**

Option A — Static images per project (simplest):
```typescript
// app/pages/project/[id].vue
const project = computed(() => getProjectById(id))
useSeoMeta({
  ogImage: () => project.value?.image
    ? `https://killiandalcin.fr${project.value.image}`
    : 'https://killiandalcin.fr/og-image.png',
})
```

Option B — `@nuxt/og-image` module (generates OG images via Satori/Canvas):
- Generates server-side OG images from Vue templates
- Zero cost, no external service
- Adds ~30s to build time for static generation
- Well-maintained Nuxt module
- LOW confidence on current stability with Nuxt 4 — verify before adopting

For this portfolio, Option A is sufficient and zero-risk.

### Structured Data per Page

The current homepage has `Person` + `ProfessionalService` JSON-LD. For SEO targeting Hytale plugin searches, additional schema on inner pages adds signal:

| Page | Recommended Schema |
|------|-------------------|
| `/` (homepage) | `Person` + `ProfessionalService` (already present) |
| `/projects` | `ItemList` of `SoftwareApplication` or `CreativeWork` |
| `/project/[id]` | `SoftwareApplication` with `name`, `description`, `author` |
| `/about` | `Person` with skills, `alumniOf`, `knowsAbout: ["Hytale", "Kotlin", ...]` |
| `/contact` | `ContactPage` |
| `/fiverr` | `Offer` or `Service` with `price`, `priceCurrency` |

The `jobTitle` on the Person schema should be updated to "Hytale Plugin Developer" or "Game Plugin Developer" to match target keyword positioning.

---

## pnpm + Docker Best Practices for Nuxt SSR

**Confidence:** HIGH (pnpm Docker documentation is stable)

### Current Problem

The Dockerfile uses `npm ci` while the project uses pnpm. This must be fixed. The two lockfiles coexisting (`pnpm-lock.yaml` + `package-lock.json`) will cause permanent drift between dev and prod.

**Recommendation:** Delete `package-lock.json` from the repo, use pnpm exclusively.

### Recommended Dockerfile

```dockerfile
# Stage 1: Build
FROM node:22-alpine AS builder
WORKDIR /app

# Install pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

# Copy manifests first for layer caching
COPY package.json pnpm-lock.yaml ./

# Install all dependencies (including devDeps needed for build)
RUN pnpm install --frozen-lockfile

# Copy source and build
COPY . .
RUN pnpm build

# Stage 2: Runtime
FROM node:22-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV HOST=0.0.0.0
ENV PORT=3000

# Only copy built output — no node_modules needed at runtime
# Nuxt SSR bundles all server deps into .output/server/
COPY --from=builder /app/.output /app/.output

EXPOSE 3000
CMD ["node", "/app/.output/server/index.mjs"]
```

Key points:
- `corepack enable` activates pnpm without a separate install step
- `--frozen-lockfile` ensures exact reproducibility (fails if lockfile is stale)
- The `.output/` directory is self-contained — all server-side node_modules are bundled by Nitro
- No `node_modules` copy to runtime stage (keeps image ~50-100MB smaller)

### .dockerignore

Ensure `.dockerignore` excludes dev artifacts:
```
node_modules
.nuxt
.output
*.log
.env
```

### Build-time vs Runtime Environment Variables

Nuxt `runtimeConfig` values with defaults in `nuxt.config.ts` are injected at **runtime** via environment variables — this is correct. However, `public.*` keys are embedded at **build time**.

Current config:
```typescript
runtimeConfig: {
  smtpHost: '',   // runtime — correct
  public: {
    gtag: { id: '' },  // build time — value must be known at docker build
  },
}
```

If `NUXT_PUBLIC_GTAG_ID` needs to differ between environments without rebuilding, this is a limitation. For a single-deployment portfolio this is fine. Just pass `NUXT_PUBLIC_GTAG_ID` as a Docker build arg if you need it baked in, or accept the empty default and override in a startup script.

---

## Additional Concerns Found in Codebase

### `vue: "latest"` and `vue-router: "latest"` — High Risk

These should be pinned. `latest` resolves at install time and will break on a major Vue version bump. Vue 4 (when it ships) will be a breaking change.

**Fix in `package.json`:**
```json
"vue": "^3.5.0",
"vue-router": "^4.5.0"
```

### `site.name` is Generic

```typescript
site: {
  url: 'https://killiandalcin.fr',
  name: "Killian' DAL-CIN - Developpeur Full Stack"
}
```

This drives the sitemap module's `<name>` field and potentially OG titles. Update to reflect Hytale positioning when the Hero rewrite ships.

### `jobTitle` in JSON-LD

Currently `"jobTitle": "Developpeur Full Stack Freelance"` — should become `"Hytale Plugin Developer & Full Stack Freelance"` or similar to match target keyword.

### `colorMode` Module Sourcing

`colorMode` is provided by `@nuxtjs/color-mode`, which is bundled within `@nuxt/ui` v3. No separate install needed. The `nuxt.config.ts` configuration is correct. However, `classSuffix: ''` means the class applied to `<html>` is `dark`/`light` (no suffix) — confirm your Tailwind v4 config uses `darkMode: 'class'` (it should be automatic via Nuxt UI).

---

## Alternatives Considered

| Category | Recommended | Alternative | Why Not |
|----------|-------------|-------------|---------|
| SEO meta | `useSeoMeta()` (built-in) | `vue-meta`, `@vueuse/head` | Built-in is SSR-correct, zero config |
| OG image | Static files per page | `@nuxt/og-image` | Static is simpler for a portfolio |
| Email | `nodemailer` | Resend API, SendGrid | Zero cost, self-hosted SMTP sufficient |
| Analytics | `nuxt-gtag` | Manual `useHead` script | Module handles SSR-safe loading |
| Package manager | pnpm | npm | Faster, better monorepo support, already adopted |

---

## Summary Recommendations

1. **Fix Dockerfile** — Switch from `npm ci` to `pnpm install --frozen-lockfile` (critical)
2. **Pin `vue` and `vue-router`** — Replace `"latest"` with `"^3.5.0"` and `"^4.5.0"` (high priority)
3. **Add canonical link** — `useHead({ link: [{ rel: 'canonical', href: () => ... }] })` on every page
4. **Set `ogUrl` per page** — Add `ogUrl: () => \`https://killiandalcin.fr${route.path}\`` to all `useSeoMeta()` calls
5. **Verify server API location** — Confirm `contact.post.ts` is at `server/api/`, not `app/api/`
6. **Update JSON-LD jobTitle** — Reflect Hytale positioning
7. **Update `site.name`** — Align with Hytale-first branding when Hero ships
8. **Remove `package-lock.json`** — One lockfile, one package manager
9. **Verify zod v4 API** — The `zod@^4.3.6` spec means v4 is required; confirm server route uses v4 schema API (not v3 `.parse()` patterns that changed)

---

*Confidence levels: HIGH = codebase-verified or stable Nuxt docs. MEDIUM = training knowledge, verify against current changelog. LOW = flagged as needing manual verification.*
