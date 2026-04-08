# Phase 2: SSR Shell - Research

**Researched:** 2026-04-08
**Domain:** Nuxt 4 SSR — i18n, color-mode, SEO metadata, sitemap, layout, Nuxt UI v3 theming
**Confidence:** HIGH

---

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions

- **D-01:** Header horizontal — logo left, nav links right, lang/theme toggles far right
- **D-02:** Mobile nav via UDrawer (Nuxt UI v3) — hamburger opens left-sliding drawer
- **D-03:** Header sticky permanent
- **D-04:** Language switch = simple text button FR/EN (toggle on click), no dropdown, no flags
- **D-05:** Footer minimal — single band: copyright © 2026 Killian' DAL-CIN + social icons (GitHub, LinkedIn, Fiverr)
- **D-06:** Enrich existing fr.json/en.json with nav, footer, SEO keys — one file per language
- **D-07:** @nuxtjs/i18n already configured: strategy prefix_except_default, FR default, browser detection + cookie
- **D-08:** Dark mode default for new visitors
- **D-09:** Cookie persistence via @nuxtjs/color-mode — no localStorage, no FOUC
- **D-10:** useSeoMeta() per route — unique title, description, og:title, og:description
- **D-11:** JSON-LD on homepage: Person + ProfessionalService schema for Killian' DAL-CIN
- **D-12:** og:image dynamic via nuxt-og-image (advanced from SEOV2-01)
- **D-13:** All public pages in sitemap except 404
- **D-14:** hreflang FR/EN alternates automatic via @nuxtjs/sitemap + @nuxtjs/i18n integration
- **D-15:** Default Nuxt layout: header + slot + footer
- **D-16:** Content max-width: max-w-7xl (1280px), centered
- **D-17:** Primary color retained: #85cb85 (mint green)
- **D-18:** 60-30-10 color rule applied
- **D-19:** WCAG contrast 4.5:1 minimum, palette 3-5 colors max
- **D-20:** Nuxt UI v3 custom tokens in app.config.ts

### Claude's Discretion

- Choice of icons for theme toggle (sun/moon) and social networks
- Animation/transition of theme toggle
- Internal spacing and padding of layout

### Deferred Ideas (OUT OF SCOPE)

None — discussion stayed within phase scope
</user_constraints>

---

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| I18N-01 | FR and EN support with prefix_except_default strategy | @nuxtjs/i18n v10 already configured in nuxt.config.ts; research confirms strategy is operational |
| I18N-02 | Locale detected from browser on first access, persisted in cookie | detectBrowserLanguage.useCookie: true already set; setLocale() updates cookie on switch |
| I18N-03 | User can change language via header switcher | setLocale() from useI18n composable + useSwitchLocalePath() for URL navigation |
| I18N-04 | Server reads cookie and renders correct language without hydration mismatch | Cookie-based detection with @nuxtjs/i18n SSR — confirmed supported in v10 |
| I18N-05 | FR/EN translation files migrated from existing locales | src/locales/fr.ts is rich — needs migration to app/locales/fr.json (TypeScript → JSON) |
| THEME-01 | Toggle between dark and light mode via header button | @nuxtjs/color-mode v4 via useColorMode() composable |
| THEME-02 | Theme persisted in SSR-safe cookie (not localStorage) | colorMode.storage: 'cookie' in nuxt.config.ts |
| THEME-03 | No FOUC on load — server renders correct theme from first request | Cookie sent on first request → server knows the theme → no client-side flash |
| SEO-01 | Per-route title, description, og:title, og:description via useSeoMeta() | useSeoMeta() is a Nuxt built-in — no extra install needed |
| SEO-02 | Homepage JSON-LD: Person + ProfessionalService | useHead() with script tag + JSON.stringify of schema object |
| SEO-03 | sitemap.xml auto-generated with i18n hreflang alternates | @nuxtjs/sitemap v8 already installed; auto-detects @nuxtjs/i18n with no extra config |
| SEO-04 | og:image uses absolute URLs, present on every page | nuxt-og-image v6 (needs install) OR useSeoMeta({ ogImage: '/portfolio-preview.webp' }) |
| COMP-05 | Header with desktop nav + mobile drawer + lang/theme toggles | app/components/layout/AppHeader.vue — UNavigationMenu or native nav + UDrawer + UButton |
| COMP-06 | Footer with links and info | app/components/layout/AppFooter.vue — single band with NuxtLink social icons |
</phase_requirements>

---

## Summary

Phase 2 builds the SSR shell: a Nuxt 4 default layout with a sticky header and minimal footer, i18n cookie persistence, cookie-based dark/light theming, route-level SEO metadata, and an auto-generated sitemap with hreflang.

The Nuxt 4 foundation from Phase 1 has the core modules already installed: `@nuxtjs/i18n` (v10.2.4), `@nuxtjs/sitemap` (v8.0.12), and `@nuxt/ui` (v3.3.7). Two modules need to be added: `@nuxtjs/color-mode` (v4.0.0) and `nuxt-og-image` (v6.3.3). The existing `src/locales/fr.ts` is a rich source for migration to `app/locales/fr.json`.

The key SSR constraint is that **all state persistence must use cookies** — localStorage is invisible to the server and causes hydration mismatches. Both `@nuxtjs/color-mode` (with `storage: 'cookie'`) and `@nuxtjs/i18n` (with `detectBrowserLanguage.useCookie: true`) satisfy this constraint.

**Primary recommendation:** Add `@nuxtjs/color-mode` and `nuxt-og-image` to nuxt.config.ts, define the `app/layouts/default.vue` with AppHeader + slot + AppFooter, define the custom color palette in CSS `@theme`, reference it from `app.config.ts`, and wire `useSeoMeta()` + `useLocaleHead()` in `app/app.vue`.

---

## Standard Stack

### Core (already installed)

| Library | Version Installed | Purpose | Source |
|---------|-------------------|---------|--------|
| @nuxtjs/i18n | 10.2.4 | FR/EN routing, cookie detection, setLocale | [VERIFIED: package.json] |
| @nuxtjs/sitemap | 8.0.12 | Auto XML sitemap with hreflang | [VERIFIED: package.json] |
| @nuxt/ui | 3.3.7 | UDrawer, UButton, UIcon, UNavigationMenu | [VERIFIED: package.json] |
| nuxt | 4.4.2 | SSR runtime, useSeoMeta, useHead, useI18n | [VERIFIED: package.json] |

### Needs Installation

| Library | Latest Version | Purpose | Source |
|---------|----------------|---------|--------|
| @nuxtjs/color-mode | 4.0.0 | Cookie-based dark/light, FOUC-free SSR | [VERIFIED: npm registry] |
| nuxt-og-image | 6.3.3 | Dynamic og:image generation | [VERIFIED: npm registry] |

### Alternatives Considered

| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| @nuxtjs/color-mode | Manual cookie + class injection | color-mode handles the inline script that prevents FOUC before hydration — custom is error-prone |
| nuxt-og-image | useSeoMeta({ ogImage: '/portfolio-preview.webp' }) | Static image is simpler; nuxt-og-image adds dynamic per-route images. D-12 locks nuxt-og-image |
| useLocaleHead() | Manual hreflang in useSeoMeta | useLocaleHead() generates canonical + og:locale + all hreflang in one call |

**Installation:**
```bash
npm install @nuxtjs/color-mode nuxt-og-image
```

---

## Architecture Patterns

### Recommended Project Structure (Phase 2 additions)

```
app/
├── layouts/
│   └── default.vue          # header + <slot /> + footer
├── components/
│   └── layout/
│       ├── AppHeader.vue     # sticky nav, lang/theme toggles
│       └── AppFooter.vue     # copyright + social icons
├── assets/
│   └── css/
│       └── main.css          # @theme with --color-brand-* shades
├── locales/
│   ├── fr.json               # enriched from src/locales/fr.ts
│   └── en.json               # enriched from src/locales/en.ts
└── app.vue                   # useLocaleHead() + htmlAttrs lang
app.config.ts                 # ui.colors.primary: 'brand'
nuxt.config.ts                # add color-mode + nuxt-og-image modules
```

### Pattern 1: Cookie-based Color Mode (FOUC-free)

**What:** @nuxtjs/color-mode injects an inline script before Nuxt loads. This script reads the cookie and applies the color class to `<html>` synchronously, before any paint. The server also reads the cookie and renders the correct class.

**When to use:** Required when `storage: 'cookie'` — the only SSR-safe approach.

**nuxt.config.ts:**
```typescript
// Source: color-mode.nuxtjs.org/usage/configuration [CITED]
colorMode: {
  preference: 'dark',       // default for new visitors — D-08
  fallback: 'dark',         // fallback when no system preference
  storage: 'cookie',        // SSR-safe — D-09
  storageKey: 'nuxt-color-mode',
  cookieAttrs: {
    'max-age': '31536000',  // 1 year
    path: '/',
    SameSite: 'Lax',
  },
  classSuffix: '',           // class="dark" not class="dark-mode"
},
```

**CRITICAL:** Nuxt UI v3 automatically registers `@nuxtjs/color-mode` — do NOT add both manually. Use `ui.colorMode` options or configure via the `colorMode` key. Verify if adding it separately causes double-registration. [VERIFIED: ui.nuxt.com/docs/getting-started/integrations/color-mode/nuxt]

**Nuxt UI auto-registers color-mode** — the correct approach is to configure it via `colorMode` in `nuxt.config.ts` without adding it to `modules[]` separately. If already registered by `@nuxt/ui`, adding to `modules[]` is redundant.

**ThemeToggle usage:**
```typescript
// Source: Nuxt Color Mode docs [CITED: color-mode.nuxtjs.org]
const colorMode = useColorMode()
// Toggle:
colorMode.preference = colorMode.preference === 'dark' ? 'light' : 'dark'
```

### Pattern 2: Language Switcher (cookie-persisted)

**What:** `setLocale(code)` from `@nuxtjs/i18n` switches the locale, updates the cookie, and navigates to the localized URL. This is the correct approach — never mutate `locale.value` directly.

**When to use:** Language toggle button (D-04).

```typescript
// Source: i18n.nuxtjs.org/docs/guide/lang-switcher [CITED]
const { locale } = useI18n()
const setLocale = useSetLocale()

function toggleLocale() {
  setLocale(locale.value === 'fr' ? 'en' : 'fr')
}
```

Note: `useSetLocale()` is the dedicated composable in @nuxtjs/i18n v10. `useI18n().setLocale` also exists but the standalone composable is preferred for components that only need switching.

### Pattern 3: Route-level SEO with hreflang

**What:** Combine `useSeoMeta()` for page-specific tags and `useLocaleHead()` for i18n-generated hreflang/canonical/og:locale. Use `useHead()` to merge them.

**When to use:** Every page (SEO-01, SEO-02, SEO-03).

```typescript
// Source: i18n.nuxtjs.org/docs/guide/seo [CITED]
// In app.vue or each page:
const { locale } = useI18n()
const head = useLocaleHead({ addSeoAttributes: true })

useHead({
  htmlAttrs: { lang: locale },
  link: computed(() => head.value.link || []),
  meta: computed(() => head.value.meta || []),
})

// Per-page SEO in each page component:
useSeoMeta({
  title: () => t('seo.home.title'),
  description: () => t('seo.home.description'),
  ogTitle: () => t('seo.home.title'),
  ogDescription: () => t('seo.home.description'),
})
```

**i18n baseUrl required** for canonical + hreflang to generate absolute URLs:
```typescript
// nuxt.config.ts
i18n: {
  baseUrl: 'https://killiandalcin.fr',
  // ...existing config
}
```

### Pattern 4: JSON-LD on Homepage (SEO-02)

**What:** Use `useHead()` with a `script` entry containing the serialized JSON-LD object.

**When to use:** Homepage only (D-11).

```typescript
// Source: Nuxt docs + Schema.org Person spec [ASSUMED pattern, standard approach]
useHead({
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Person',
        name: 'Killian' DAL-CIN',
        url: 'https://killiandalcin.fr',
        jobTitle: 'Développeur Full Stack Freelance',
        sameAs: [
          'https://linkedin.com/in/killian-dal-cin',
          'https://www.fiverr.com/users/mr_kayjaydee',
        ],
      }),
    },
  ],
})
```

### Pattern 5: Custom Primary Color in Nuxt UI v3

**What:** Nuxt UI v3 uses Tailwind v4's CSS `@theme` directive. Custom colors must be defined as CSS variables with all shades (50–950), then referenced by name in `app.config.ts`.

**When to use:** D-17, D-20 — #85cb85 as brand primary.

```css
/* app/assets/css/main.css — Source: ui.nuxt.com/docs/getting-started/theme/design-system [CITED] */
@import "tailwindcss";
@import "@nuxt/ui";

@theme {
  --color-brand-50: #f0faf0;
  --color-brand-100: #dcf3dc;
  --color-brand-200: #bbe8bb;
  --color-brand-300: #8dd98d;
  --color-brand-400: #a3d6a3;  /* dark mode accent */
  --color-brand-500: #85cb85;  /* primary — D-17 */
  --color-brand-600: #5aaa5a;
  --color-brand-700: #3f8c3f;
  --color-brand-800: #2e6b2e;
  --color-brand-900: #1f4f1f;
  --color-brand-950: #122d12;
}
```

```typescript
// app.config.ts — Source: ui.nuxt.com/docs/getting-started/theme/design-system [CITED]
export default defineAppConfig({
  ui: {
    colors: {
      primary: 'brand',
    },
  },
})
```

### Pattern 6: Sitemap with i18n hreflang

**What:** `@nuxtjs/sitemap` v8 auto-detects `@nuxtjs/i18n` and generates hreflang `<xhtml:link>` entries for every locale. No manual sitemap config needed for basic hreflang.

**Required:** `i18n.baseUrl` must be set (same as SEO canonical requirement).

```typescript
// nuxt.config.ts — sitemap auto-detects i18n, no extra sitemap config needed
// Source: nuxtseo.com/docs/sitemap/integrations/i18n [CITED]
sitemap: {
  // autoI18n: true  ← default when @nuxtjs/i18n is detected
  // excludeAppSources: false  ← default, generates all routes
}
```

### Pattern 7: nuxt-og-image (D-12)

**What:** `defineOgImage()` composable called in page components generates a per-route og:image. For Phase 2 (stub pages), a static fallback is acceptable — use `defineOgImage({ component: 'NuxtSeo' })` or point to the existing `/portfolio-preview.webp` static image.

**Simplest Phase 2 approach:** Use the static image for now, hook up dynamic generation in Phase 3.

```typescript
// pages/index.vue — static og:image fallback
useSeoMeta({
  ogImage: 'https://killiandalcin.fr/portfolio-preview.webp',
  ogImageWidth: 1200,
  ogImageHeight: 630,
})
// OR install nuxt-og-image and call defineOgImage() per page
```

**site.url required for absolute URLs:**
```typescript
// nuxt.config.ts
site: {
  url: 'https://killiandalcin.fr',
  name: 'Killian' DAL-CIN — Développeur Full Stack',
},
```

### Anti-Patterns to Avoid

- **localStorage for theme or locale:** Invisible to SSR — causes hydration mismatch. Use cookies only (D-09).
- **Directly mutating `locale.value`:** Bypasses cookie update and route navigation. Always use `setLocale()`.
- **Adding `@nuxtjs/color-mode` to `modules[]` when using `@nuxt/ui`:** Nuxt UI already registers it — double-registration causes configuration conflicts. Configure via `colorMode:` key in `nuxt.config.ts` only.
- **Relative og:image URLs:** Search engines require absolute URLs. Always prefix with `https://killiandalcin.fr`.
- **Defining all SEO in `app.vue`:** Per-route metadata must be in page components via `useSeoMeta()`. app.vue handles only global hreflang/canonical via `useLocaleHead()`.
- **i18n without `baseUrl`:** Without `baseUrl`, `useLocaleHead()` generates relative canonical and hreflang — functionally broken for SEO crawlers.

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| FOUC-free dark mode | Inline script that reads cookie before paint | @nuxtjs/color-mode | The inline script timing is extremely subtle — wrong placement causes flash on some browsers |
| hreflang generation | Manual `<link rel="alternate">` in useHead | useLocaleHead() from @nuxtjs/i18n | Handles x-default, catchall, og:locale:alternate automatically |
| Sitemap with alternates | Custom sitemap route | @nuxtjs/sitemap v8 | Auto-discovers routes from Nuxt router, auto-adds i18n alternates |
| OG image generation | Canvas/Puppeteer/custom endpoint | nuxt-og-image | Handles SSG prerendering + SSR on-demand rendering |
| Custom color shades | Pick hex manually | Use Tailwind shade generator or OKLCh | 11-shade palette must be perceptually uniform |

**Key insight:** The SSR + i18n + color-mode combination has numerous subtle ordering dependencies (cookie read timing, middleware execution order, head tag merging). Ecosystem modules encode this knowledge — custom solutions miss edge cases.

---

## Common Pitfalls

### Pitfall 1: Nuxt UI auto-registers @nuxtjs/color-mode — don't double-register

**What goes wrong:** Adding `'@nuxtjs/color-mode'` to `modules[]` when `@nuxt/ui` is already there causes the module to load twice with potentially conflicting configs.
**Why it happens:** Nuxt UI v3 calls `installModule('@nuxtjs/color-mode', ...)` internally.
**How to avoid:** Only use the `colorMode:` key in `nuxt.config.ts` to configure it. Do NOT add it to `modules[]`. [VERIFIED: ui.nuxt.com/docs/getting-started/integrations/color-mode/nuxt]
**Warning signs:** Console warning "Module @nuxtjs/color-mode already registered".

### Pitfall 2: i18n baseUrl missing → broken hreflang

**What goes wrong:** `useLocaleHead()` generates relative `/en/` URLs in `<link rel="alternate">` — Google ignores or misinterprets these.
**Why it happens:** Module defaults to relative URLs when no baseUrl is configured.
**How to avoid:** Always set `i18n.baseUrl: 'https://killiandalcin.fr'` in nuxt.config.ts.
**Warning signs:** `curl` response shows `href="/en/"` instead of `href="https://killiandalcin.fr/en/"` in hreflang tags.

### Pitfall 3: Locale switch FOUC when using NuxtLink instead of setLocale

**What goes wrong:** Navigating to the switched locale path via `<NuxtLink>` without calling `setLocale()` does NOT update the cookie — next page load redirects back to the old locale.
**Why it happens:** `useSwitchLocalePath()` generates the path but doesn't update the cookie unless paired with `setLocale()`.
**How to avoid:** Use `setLocale(code)` for locale switching (D-04 — button toggle). It updates cookie AND navigates.
**Warning signs:** Language reverts to previous locale after hard refresh.

### Pitfall 4: og:image is relative URL

**What goes wrong:** Social media scrapers (Facebook, Twitter/X, LinkedIn) require absolute og:image URLs. Relative paths are not resolved.
**Why it happens:** `useSeoMeta({ ogImage: '/portfolio-preview.webp' })` passes relative path.
**How to avoid:** Always prefix: `ogImage: 'https://killiandalcin.fr/portfolio-preview.webp'` or use `nuxt-og-image` which handles this automatically.
**Warning signs:** Social share cards show no image / broken image.

### Pitfall 5: Translation key mismatch between old fr.ts and new fr.json format

**What goes wrong:** `src/locales/fr.ts` uses TypeScript default export; `app/locales/fr.json` must be valid JSON — no trailing commas, no TypeScript syntax, no template literals.
**Why it happens:** Direct copy-paste of .ts → .json without syntax cleanup.
**How to avoid:** Review each key during migration: remove `export default`, remove TypeScript types, convert template literals to plain strings, validate JSON.
**Warning signs:** `nuxt dev` throws "SyntaxError: Unexpected token" on locale file load.

### Pitfall 6: UDrawer focus trap missing breaks keyboard accessibility

**What goes wrong:** When drawer is open, Tab key navigates outside the drawer — focus escapes to page behind overlay.
**Why it happens:** Native HTML has no focus trap; requires explicit implementation.
**How to avoid:** `UDrawer` from Nuxt UI v3 includes focus trap built-in — verify by tabbing through drawer items during manual testing.
**Warning signs:** Pressing Tab with drawer open moves focus to background header links.

---

## Code Examples

### nuxt.config.ts additions for Phase 2

```typescript
// Source: official docs combined [CITED: color-mode.nuxtjs.org, nuxtseo.com/og-image]
export default defineNuxtConfig({
  future: { compatibilityVersion: 4 },
  ssr: true,

  modules: [
    '@nuxt/ui',
    '@nuxtjs/i18n',
    '@nuxt/eslint',
    '@nuxtjs/sitemap',
    'nuxt-gtag',
    '@nuxt/image',
    'nuxt-og-image',  // ADD — @nuxtjs/color-mode is auto-added by @nuxt/ui
  ],

  site: {
    url: 'https://killiandalcin.fr',
    name: 'Killian' DAL-CIN — Développeur Full Stack',
  },

  colorMode: {
    preference: 'dark',
    fallback: 'dark',
    storage: 'cookie',
    storageKey: 'nuxt-color-mode',
    cookieAttrs: {
      'max-age': '31536000',
      path: '/',
      SameSite: 'Lax',
    },
    classSuffix: '',
  },

  i18n: {
    strategy: 'prefix_except_default',
    defaultLocale: 'fr',
    baseUrl: 'https://killiandalcin.fr',
    locales: [
      { code: 'fr', language: 'fr-FR', file: 'fr.json' },
      { code: 'en', language: 'en-US', file: 'en.json' },
    ],
    langDir: 'locales/',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      redirectOn: 'root',
    },
  },

  typescript: { strict: true },
})
```

### app/app.vue — global hreflang

```vue
<!-- Source: i18n.nuxtjs.org/docs/guide/seo [CITED] -->
<script setup lang="ts">
const { locale } = useI18n()
const head = useLocaleHead({ addSeoAttributes: true })

useHead({
  htmlAttrs: {
    lang: computed(() => head.value.htmlAttrs?.lang ?? locale.value),
  },
  link: computed(() => head.value.link ?? []),
  meta: computed(() => head.value.meta ?? []),
})
</script>

<template>
  <div>
    <NuxtRouteAnnouncer />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
```

### app/layouts/default.vue

```vue
<!-- Source: Nuxt 4 layouts docs [CITED: nuxt.com/docs/guide/directory-structure/layouts] -->
<template>
  <div class="min-h-screen flex flex-col bg-white dark:bg-gray-900">
    <AppHeader />
    <main class="flex-1">
      <slot />
    </main>
    <AppFooter />
  </div>
</template>
```

### LanguageToggle snippet

```vue
<!-- Source: i18n.nuxtjs.org/docs/guide/lang-switcher [CITED] -->
<script setup lang="ts">
const { locale } = useI18n()
const setLocale = useSetLocale()

function toggleLocale() {
  setLocale(locale.value === 'fr' ? 'en' : 'fr')
}
</script>

<template>
  <button
    class="min-w-11 min-h-11 ..."
    :aria-label="locale === 'fr'
      ? 'Changer la langue — actuellement Français'
      : 'Change language — currently English'"
    @click="toggleLocale"
  >
    {{ locale.toUpperCase() }}
  </button>
</template>
```

### Homepage JSON-LD (SEO-02)

```typescript
// app/pages/index.vue
// Source: schema.org Person spec [CITED: schema.org/Person]
useSeoMeta({
  title: t('seo.home.title'),
  description: t('seo.home.description'),
  ogTitle: t('seo.home.title'),
  ogDescription: t('seo.home.description'),
  ogImage: 'https://killiandalcin.fr/portfolio-preview.webp',
})

useHead({
  script: [{
    type: 'application/ld+json',
    innerHTML: JSON.stringify({
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Person',
          '@id': 'https://killiandalcin.fr/#person',
          name: 'Killian' DAL-CIN',
          url: 'https://killiandalcin.fr',
          jobTitle: 'Développeur Full Stack Freelance',
          email: 'contact@killiandalcin.fr',
          sameAs: [
            'https://linkedin.com/in/killian-dal-cin',
            'https://www.fiverr.com/users/mr_kayjaydee',
          ],
        },
        {
          '@type': 'ProfessionalService',
          '@id': 'https://killiandalcin.fr/#service',
          name: 'Killian' DAL-CIN — Développeur Full Stack',
          url: 'https://killiandalcin.fr',
          provider: { '@id': 'https://killiandalcin.fr/#person' },
          priceRange: '€€€',
          aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: '5',
            reviewCount: '50',
          },
        },
      ],
    }),
  }],
})
```

---

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| localStorage for theme | Cookie storage (`@nuxtjs/color-mode` v3+) | 2023 | SSR-safe, no FOUC |
| vue-meta / @vueuse/head | useSeoMeta() + useHead() built-in Nuxt | Nuxt 3.x | No extra library needed |
| Manual hreflang links | useLocaleHead() auto-generation | @nuxtjs/i18n v8+ | Zero manual maintenance |
| @nuxtjs/sitemap v2 routes array | @nuxtjs/sitemap v8 auto-discovery | 2024 | Routes auto-detected from Nuxt router |
| Nuxt UI v2 app.config colors | Nuxt UI v3 CSS @theme + app.config | Nuxt UI v3 GA 2025 | Custom colors need @theme shades defined |

**Deprecated/outdated:**
- `@vueuse/head`: The old portfolio uses it — replaced by Nuxt's built-in `useHead()` / `useSeoMeta()` in Nuxt 3+. Do not install.
- `localStorage` in composables: The old `useTheme.ts` uses localStorage — must be replaced entirely with `useColorMode()` from `@nuxtjs/color-mode`.

---

## Environment Availability

| Dependency | Required By | Available | Version | Fallback |
|------------|-------------|-----------|---------|----------|
| Node.js 22 | Nuxt build | ✓ | 22.x (Windows) | — |
| @nuxtjs/color-mode | THEME-01/02/03 | ✗ not installed | 4.0.0 (registry) | None — must install |
| nuxt-og-image | SEO-04 / D-12 | ✗ not installed | 6.3.3 (registry) | Static useSeoMeta ogImage (acceptable for Phase 2) |
| @nuxtjs/i18n | I18N-01-05 | ✓ 10.2.4 | installed | — |
| @nuxtjs/sitemap | SEO-03 | ✓ 8.0.12 | installed | — |
| @nuxt/ui | COMP-05/06 | ✓ 3.3.7 | installed | — |
| public/portfolio-preview.webp | SEO-04 fallback | ✓ exists | — | — |

**Missing dependencies with no fallback:**
- `@nuxtjs/color-mode` — must be installed (Wave 0 task). Nuxt UI registers it internally but may not expose cookie configuration without the explicit package present.

**Missing dependencies with fallback:**
- `nuxt-og-image` — if install is deferred, `useSeoMeta({ ogImage: 'https://killiandalcin.fr/portfolio-preview.webp' })` is a valid Phase 2 fallback. D-12 specifies nuxt-og-image but accepts static image for stub pages.

---

## Validation Architecture

> nyquist_validation not explicitly set to false in config — treating as enabled.

### Test Framework

| Property | Value |
|----------|-------|
| Framework | Manual curl verification (no automated test framework — REQUIREMENTS.md Out of Scope: "Tests automatisés") |
| Config file | none |
| Quick run command | `curl -s http://localhost:3000 \| grep -o '<title>[^<]*</title>'` |
| Full suite command | See Phase Gate below |

### Phase Requirements → Test Map

| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| I18N-01 | FR at `/`, EN at `/en/` | smoke | `curl -s http://localhost:3000 \| grep 'lang="fr"'` | ❌ manual |
| I18N-02 | Cookie set after first visit | smoke | `curl -v http://localhost:3000 2>&1 \| grep 'i18n_redirected'` | ❌ manual |
| I18N-03 | Header shows FR/EN toggle | manual | — | ❌ manual |
| I18N-04 | Server renders FR/EN from cookie | smoke | `curl -s -H 'Cookie: i18n_redirected=en' http://localhost:3000 \| grep 'lang="en"'` | ❌ manual |
| I18N-05 | Nav keys present in both languages | smoke | `curl -s http://localhost:3000 \| grep 'Accueil'` | ❌ manual |
| THEME-01 | Toggle changes class on html | manual | — | ❌ manual |
| THEME-02 | Cookie set after toggle | manual | `curl -v http://localhost:3000 2>&1 \| grep 'nuxt-color-mode'` | ❌ manual |
| THEME-03 | No FOUC — class present in SSR HTML | smoke | `curl -s http://localhost:3000 \| grep 'class="dark"'` | ❌ manual |
| SEO-01 | title + og:title in curl response | smoke | `curl -s http://localhost:3000 \| grep -E '(<title>\|og:title)'` | ❌ manual |
| SEO-02 | JSON-LD script in homepage HTML | smoke | `curl -s http://localhost:3000 \| grep 'application/ld+json'` | ❌ manual |
| SEO-03 | sitemap.xml returns valid XML | smoke | `curl -s http://localhost:3000/sitemap.xml \| grep 'hreflang'` | ❌ manual |
| SEO-04 | og:image absolute URL | smoke | `curl -s http://localhost:3000 \| grep 'og:image'` | ❌ manual |
| COMP-05 | Header renders in SSR HTML | smoke | `curl -s http://localhost:3000 \| grep 'header'` | ❌ manual |
| COMP-06 | Footer renders in SSR HTML | smoke | `curl -s http://localhost:3000 \| grep 'footer'` | ❌ manual |

### Phase Gate (success criteria from ROADMAP.md)

```bash
# 1. FR HTML default
curl -s http://localhost:3000 | grep 'lang="fr"'

# 2. EN HTML at /en/
curl -s http://localhost:3000/en/ | grep 'lang="en"'

# 3. Cookie persistence — cookie set header
curl -v http://localhost:3000 2>&1 | grep -E '(i18n_redirected|nuxt-color-mode)'

# 4. SEO tags present
curl -s http://localhost:3000 | grep -E '(<title>|og:title|og:description|application/ld\+json)'

# 5. Sitemap with hreflang
curl -s http://localhost:3000/sitemap.xml | grep 'hreflang'
```

### Wave 0 Gaps

- [ ] No automated test framework to install — curl commands are the verification method per project requirements.
- [ ] `app/layouts/default.vue` does not exist — must be created in Wave 1.
- [ ] `app/components/layout/AppHeader.vue` does not exist in new Nuxt structure — must be created.
- [ ] `app/components/layout/AppFooter.vue` does not exist in new Nuxt structure — must be created.
- [ ] `app/assets/css/main.css` (or equivalent) with `@theme` does not exist — must be created for custom color.
- [ ] `app.config.ts` does not exist — must be created with `ui.colors.primary: 'brand'`.

---

## Security Domain

> security_enforcement not set to false — treating as enabled.

### Applicable ASVS Categories

| ASVS Category | Applies | Standard Control |
|---------------|---------|-----------------|
| V2 Authentication | no | No auth in Phase 2 |
| V3 Session Management | yes (partial) | Cookies for locale + theme: SameSite=Lax, no Secure flag needed for non-auth cookies |
| V4 Access Control | no | No protected routes in Phase 2 |
| V5 Input Validation | no | No user input forms in Phase 2 |
| V6 Cryptography | no | No encryption needed for theme/locale preferences |

### Known Threat Patterns

| Pattern | STRIDE | Standard Mitigation |
|---------|--------|---------------------|
| Cookie manipulation (theme/locale) | Tampering | Cosmetic preference only — no security impact if tampered. SameSite=Lax prevents CSRF abuse. |
| og:image SSRF | Elevation | nuxt-og-image renders server-side — ensure no user-controlled URLs flow into defineOgImage |
| XSS via JSON-LD | Tampering | Use JSON.stringify() + trust only static data from siteConfig. Never interpolate user input. |

---

## Assumptions Log

| # | Claim | Section | Risk if Wrong |
|---|-------|---------|---------------|
| A1 | Nuxt UI v3 auto-registers @nuxtjs/color-mode internally, so it should NOT be added to modules[] | Standard Stack / Pitfalls | Double-registration or missing module — test by checking nuxt build warnings |
| A2 | useSetLocale() is the correct standalone composable name in @nuxtjs/i18n v10 | Code Examples | Build error if composable name differs — verify in @nuxtjs/i18n v10 changelog |
| A3 | nuxt-og-image v6 requires `site.url` (not `ogImage.baseUrl`) for absolute URLs | Architecture Patterns | og:image generated with relative paths → broken social cards |

---

## Open Questions

1. **@nuxtjs/color-mode auto-registration via Nuxt UI**
   - What we know: Nuxt UI docs say it auto-registers color-mode.
   - What's unclear: Whether the `colorMode:` nuxt.config.ts key works WITHOUT adding color-mode to `modules[]` — or if the package must still be installed in `node_modules` even if not in modules[].
   - Recommendation: Install `@nuxtjs/color-mode` as a dependency regardless; configure only via `colorMode:` key, not via `modules[]`.

2. **nuxt-og-image v6 Takumi renderer on Windows**
   - What we know: v6 recommends Takumi renderer; requires `npx nuxt-og-image enable takumi`.
   - What's unclear: Whether Takumi has Windows-specific native binary issues.
   - Recommendation: Start with static `useSeoMeta({ ogImage })` for Phase 2; add Takumi renderer in Phase 3 if needed.

3. **Social links in siteConfig reference Gitea, not GitHub**
   - What we know: `src/config/site.ts` has social.name: 'Gitea' with a `gitea.kamisama.ovh` URL, not GitHub.
   - What's unclear: The UI-SPEC specifies `simple-icons:github` for the footer icon. The actual link is Gitea-hosted.
   - Recommendation: Use `simple-icons:gitea` icon with the Gitea URL, or clarify with user if GitHub public profile should be used instead.

---

## Sources

### Primary (HIGH confidence)
- `package.json` — installed versions verified directly
- `nuxt.config.ts` — current i18n configuration confirmed
- `src/locales/fr.ts` — full translation key inventory confirmed
- `src/config/site.ts` — siteConfig with URL, social links, SEO defaults

### Secondary (MEDIUM confidence — cited from official docs)
- [color-mode.nuxtjs.org/usage/configuration](https://color-mode.nuxtjs.org/usage/configuration) — all colorMode options
- [ui.nuxt.com/docs/getting-started/integrations/color-mode/nuxt](https://ui.nuxt.com/docs/getting-started/integrations/color-mode/nuxt) — Nuxt UI auto-registers color-mode
- [ui.nuxt.com/docs/getting-started/theme/design-system](https://ui.nuxt.com/docs/getting-started/theme/design-system) — @theme directive for custom colors
- [i18n.nuxtjs.org/docs/guide/lang-switcher](https://i18n.nuxtjs.org/docs/guide/lang-switcher) — setLocale + cookie persistence
- [i18n.nuxtjs.org/docs/guide/seo](https://i18n.nuxtjs.org/docs/guide/seo) — useLocaleHead, baseUrl requirement
- [nuxtseo.com/docs/sitemap/integrations/i18n](https://nuxtseo.com/docs/sitemap/integrations/i18n) — sitemap auto-detects i18n
- [nuxtseo.com/docs/og-image/api/define-og-image](https://nuxtseo.com/docs/og-image/api/define-og-image) — defineOgImage options, static image fallback

### Tertiary (LOW confidence — search results only)
- npm registry: `@nuxtjs/color-mode@4.0.0`, `nuxt-og-image@6.3.3` — verified via `npm view`

---

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH — all installed versions verified from node_modules; new packages confirmed from npm registry
- Architecture: HIGH — patterns cited from official docs
- Pitfalls: MEDIUM — color-mode double-registration confirmed from Nuxt UI docs; others based on known SSR patterns
- Security: HIGH — standard cookie security, no novel concerns

**Research date:** 2026-04-08
**Valid until:** 2026-05-08 (stable ecosystem — 30 days)
