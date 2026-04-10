# Architecture Patterns

**Project:** Portfolio Killian' Dalcin — Nuxt 4 SSR
**Researched:** 2026-04-10
**Confidence:** HIGH (verified against actual codebase + Nuxt 4 docs patterns)

---

## Is the Current Architecture Sound?

**Yes — the foundation is solid.** The core SSR pipeline is correctly implemented:

- `ssr: true` + `compatibilityVersion: 4` — full SSR, not hybrid
- `@nuxtjs/i18n` with `prefix_except_default` — SEO-correct URL scheme (FR at `/`, EN at `/en/`)
- `@nuxtjs/color-mode` with `storage: 'cookie'` — theme class applied server-side, no flash
- `useSeoMeta()` with reactive `() => t('...')` callbacks — meta resolves server-side per locale
- `useLocaleHead()` in `app.vue` — injects `hreflang` alternates on every page automatically
- Data layer (`app/data/*.ts` + `useProjects()`) is clean: static IDs, translated fields via i18n keys, reactive recomputation on locale change

Three real problems exist in the current implementation (not architecture flaws — just execution gaps):

1. **og:image hardcoded** to `https://killiandalcin.fr/og-image.png` on all 6 pages, including project detail where `project.image` is already available
2. **JSON-LD only on homepage** — other pages have no structured data; `jobTitle` still says "Developpeur Full Stack Freelance" instead of positioning Hytale
3. **ogUrl missing** — `useSeoMeta()` calls don't include `ogUrl`, so the canonical URL is absent from Open Graph, though `<link rel="canonical">` is provided by `@nuxtjs/i18n`

---

## Recommended Architecture

The existing layer structure is correct. No refactoring needed. Extensions follow the same pattern:

```
Pages (app/pages/)
  hytale.vue                          ← new page, same pattern as fiverr.vue
  project/[id].vue                    ← add dynamic og:image (project.image already there)

Composables (app/composables/)
  useSeoMeta → per-page calls         ← add ogUrl to every page
  useJsonLd.ts                        ← new: centralize JSON-LD generation

Data (app/data/)
  hytale.ts                           ← new: pricing tiers, service cards, tech highlights
  site.ts                             ← update jobTitle to Hytale positioning

Locales (app/locales/fr.json, en.json)
  seo.hytale.*                        ← new SEO keys
  hytale.*                            ← new page content keys
```

### Component Boundaries for the Hytale Page

| Component | Responsibility | Communicates With |
|-----------|---------------|-------------------|
| `pages/hytale.vue` | Page assembly, SEO, JSON-LD | `HytaleHeroSection`, `HytalePricingGrid`, `HytaleServiceCards`, `FAQSection`, `CTASection` |
| `sections/HytaleHeroSection.vue` | Hero — "Hytale Plugin Developer" headline, early access badge | `useI18n()` |
| `sections/HytalePricingGrid.vue` | 3-column pricing table (Simple / Complex / Sur-mesure + Maintenance) | `app/data/hytale.ts` via props |
| `sections/HytaleServiceCards.vue` | What's included per service, tech stack used | `app/data/hytale.ts` via props |
| Reuse `FAQSection.vue` | Hytale-specific FAQs | `data/faq.ts` (add `hytaleFAQs` export) |
| Reuse `CTASection.vue` | Call to action to contact / Fiverr | props |

Follow the `fiverr.vue` structural pattern exactly — it already does service cards correctly. The Hytale page is a thematic variant, not a new pattern.

---

## og:image Hardcoding Fix

**Problem:** All pages including `project/[id].vue` use the same static `og-image.png`. The project detail page already has `project.value?.image` available but ignores it.

**Fix: per-page og:image strategy**

```typescript
// pages/project/[id].vue — already has project data, just use it
useSeoMeta({
  // ...
  ogImage: () => project.value?.image
    ? `https://killiandalcin.fr${project.value.image}`
    : 'https://killiandalcin.fr/og-image.png',
})
```

For all other pages, create dedicated OG images rather than sharing one. The naming convention:

| Page | File | Dimensions |
|------|------|-----------|
| Default / fallback | `/public/og/og-default.png` | 1200×630 |
| Hytale | `/public/og/og-hytale.png` | 1200×630 |
| Fiverr | `/public/og/og-fiverr.png` | 1200×630 |
| Projects | `/public/og/og-projects.png` | 1200×630 |

Each page's `useSeoMeta()` references its own file. This is the simplest, most reliable approach — no server-side image generation required, works perfectly with SSR, zero dependencies.

**Do not use `@vercel/og` or `nuxt-og-image`.** The portfolio is Docker-deployed, not Vercel. `nuxt-og-image` adds a Satori/Chromium dependency and requires additional config for non-Vercel deployments. Static pre-made images are sufficient for a portfolio and have zero runtime cost.

---

## Canonical URL Strategy with prefix_except_default

**Current situation:** `@nuxtjs/i18n` with `prefix_except_default` + `baseUrl: 'https://killiandalcin.fr'` automatically generates:

```html
<!-- On / (FR default, no prefix) -->
<link rel="canonical" href="https://killiandalcin.fr/" />
<link rel="alternate" hreflang="fr" href="https://killiandalcin.fr/" />
<link rel="alternate" hreflang="en" href="https://killiandalcin.fr/en/" />
<link rel="alternate" hreflang="x-default" href="https://killiandalcin.fr/" />

<!-- On /en/ -->
<link rel="canonical" href="https://killiandalcin.fr/en/" />
<link rel="alternate" hreflang="fr" href="https://killiandalcin.fr/" />
<link rel="alternate" hreflang="en" href="https://killiandalcin.fr/en/" />
```

This is correct — `useLocaleHead()` in `app.vue` handles all of this automatically. **No manual canonical management needed.**

The one gap is `ogUrl` in Open Graph. Add it to every page's `useSeoMeta()`:

```typescript
// Pattern for every page
const { locale } = useI18n()
const localePath = useLocalePath()

useSeoMeta({
  // ... existing fields ...
  ogUrl: () => `https://killiandalcin.fr${localePath('/hytale')}`,
})
```

`useLocalePath()` resolves the correct prefixed path for the current locale (`/hytale` for FR, `/en/hytale` for EN), making `ogUrl` SSR-safe and locale-correct.

**For the sitemap:** `@nuxtjs/sitemap` already reads from `@nuxtjs/i18n` configuration and generates hreflang entries automatically. No manual sitemap management needed for the Hytale page — it appears automatically when `pages/hytale.vue` is created.

---

## JSON-LD Structured Data Patterns

### What to Use Per Page

| Page | Schema Types | Priority |
|------|-------------|----------|
| `/` (homepage) | `Person` + `WebSite` + `ProfessionalService` | Exists, needs update |
| `/hytale` | `Service` (×3 tiers) + `SoftwareApplication` | New |
| `/projects` | `ItemList` of `SoftwareSourceCode` | Nice to have |
| `/project/[id]` | `SoftwareSourceCode` or `CreativeWork` | Nice to have |
| `/fiverr` | `Offer` per service | Nice to have |
| `/contact` | `ContactPage` | Low value |

### Centralize with a Composable

The current pattern inlines JSON-LD in each page's `useHead()`. This works but leads to duplication of `Person` data across pages. Centralize reusable schemas:

```typescript
// app/composables/useJsonLd.ts
export function usePersonSchema() {
  return {
    '@type': 'Person',
    name: "Killian' DAL-CIN",
    url: 'https://killiandalcin.fr',
    jobTitle: 'Hytale Plugin Developer & Full Stack Developer',
    email: 'contact@killiandalcin.fr',
    sameAs: [
      'https://linkedin.com/in/killian-dal-cin',
      'https://www.fiverr.com/users/mr_kayjaydee',
      'https://gitea.kamisama.ovh/kayjaydee',
    ],
  }
}

export function useWebSiteSchema() {
  return {
    '@type': 'WebSite',
    name: "Killian' DAL-CIN",
    url: 'https://killiandalcin.fr',
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://killiandalcin.fr/projects?q={search_term_string}',
      'query-input': 'required name=search_term_string',
    },
  }
}

export function useHytaleServiceSchemas() {
  return [
    {
      '@type': 'Service',
      name: 'Hytale Plugin Development — Simple',
      provider: { '@type': 'Person', name: "Killian' DAL-CIN" },
      serviceType: 'Software Development',
      description: 'Basic Hytale plugin: single mechanic, standard features',
      offers: { '@type': 'Offer', priceCurrency: 'USD', price: '150' },
    },
    {
      '@type': 'Service',
      name: 'Hytale Plugin Development — Complex',
      provider: { '@type': 'Person', name: "Killian' DAL-CIN" },
      serviceType: 'Software Development',
      description: 'Advanced Hytale plugin with custom systems, multiplayer, persistence',
      offers: { '@type': 'Offer', priceCurrency: 'USD', price: '400' },
    },
    {
      '@type': 'Service',
      name: 'Hytale Plugin Maintenance',
      provider: { '@type': 'Person', name: "Killian' DAL-CIN" },
      serviceType: 'Software Maintenance',
      description: 'Monthly plugin maintenance: update compatibility after Hytale patches',
      offers: { '@type': 'Offer', priceCurrency: 'USD', priceSpecification: { '@type': 'UnitPriceSpecification', price: '50', unitCode: 'MON' } },
    },
  ]
}
```

Each page then composes what it needs:

```typescript
// pages/index.vue
const { usePersonSchema, useWebSiteSchema } = useJsonLd()
useHead({
  script: [{
    type: 'application/ld+json',
    innerHTML: JSON.stringify({
      '@context': 'https://schema.org',
      '@graph': [usePersonSchema(), useWebSiteSchema()],
    }),
  }],
})

// pages/hytale.vue
const { usePersonSchema, useHytaleServiceSchemas } = useJsonLd()
useHead({
  script: [{
    type: 'application/ld+json',
    innerHTML: JSON.stringify({
      '@context': 'https://schema.org',
      '@graph': [usePersonSchema(), ...useHytaleServiceSchemas()],
    }),
  }],
})
```

### SoftwareApplication for Hytale Plugins

For the Hytale page, `SoftwareApplication` is the most SEO-relevant schema for plugin demos or featured work:

```json
{
  "@type": "SoftwareApplication",
  "name": "Hytale Plugin — [Plugin Name]",
  "applicationCategory": "GameApplication",
  "operatingSystem": "Hytale",
  "author": { "@type": "Person", "name": "Killian' DAL-CIN" },
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
}
```

Use `SoftwareApplication` only when there are real plugin demos or releasable plugins. Use placeholder data with clearly marked demo content for now.

---

## Hytale Page: Pricing Grid Pattern

The most effective pricing grid for this use case is a 3-tier table with a highlighted middle tier. Nuxt UI v3 provides everything needed without custom components:

```vue
<!-- Structure recommendation — implement with UCard inside a CSS grid -->
<div class="grid grid-cols-1 md:grid-cols-3 gap-6">
  <!-- Tier: Simple Plugin -->
  <UCard>...</UCard>

  <!-- Tier: Complex Plugin — highlighted -->
  <UCard class="ring-2 ring-brand-500 scale-105">
    <template #header>
      <UBadge>Most Popular</UBadge>
    </template>
    ...
  </UCard>

  <!-- Tier: Sur-mesure -->
  <UCard>...</UCard>
</div>
```

Pricing data belongs in `app/data/hytale.ts` (not `siteConfig`) because it is Hytale-specific content, not site-wide configuration. Translatable labels live in locale files; prices stay in the data file (they are locale-independent).

---

## Anti-Patterns to Avoid

### Anti-Pattern 1: Duplicating Person schema across pages as raw objects
**What:** Copy-pasting the full `Person` object in every page file
**Why bad:** When Killian's jobTitle changes to "Hytale Plugin Developer", every page needs updating manually
**Instead:** `useJsonLd.ts` composable as shown above — single source of truth

### Anti-Pattern 2: Using localStorage for any SSR state
**What:** Storing locale or theme in localStorage
**Why bad:** Causes hydration mismatch — server renders with default, client re-renders after mount
**Instead:** Cookie-only (already correctly implemented)

### Anti-Pattern 3: Static ogUrl strings
**What:** `ogUrl: 'https://killiandalcin.fr/hytale'` hardcoded
**Why bad:** EN version at `/en/hytale` gets wrong ogUrl, confusing social crawlers
**Instead:** `ogUrl: () => \`https://killiandalcin.fr\${localePath('/hytale')}\``

### Anti-Pattern 4: Translating prices
**What:** Putting price strings like "$150" or "150€" in locale files
**Why bad:** Prices change independently of language; mixes content types
**Instead:** Prices in data file, currency/format computed if needed

### Anti-Pattern 5: nuxt-og-image for a Docker-SSR deployment
**What:** Using Satori-based dynamic OG image generation
**Why bad:** Adds Chromium/Satori dependency, complex config for non-Vercel targets, overhead per request
**Instead:** Static pre-made OG images per page in `/public/og/`

---

## Scalability Considerations

This is a static-content portfolio. Scalability is not a concern. The architecture is appropriate for:
- ~10 pages
- ~20 projects
- 2 locales
- No user accounts, no dynamic data beyond the contact form

The only scaling vector is content volume (more projects, more services). The current data layer (`app/data/`) handles this cleanly — add entries to arrays, add i18n keys, done.

---

## Sources

- Nuxt 4 docs: `ssr: true`, `compatibilityVersion: 4` — verified against current nuxt.config.ts
- `@nuxtjs/i18n` v9 docs: `prefix_except_default`, `useLocaleHead()`, `useLocalePath()` — HIGH confidence
- Schema.org: `Service`, `SoftwareApplication`, `Person`, `WebSite` — HIGH confidence
- `@nuxtjs/sitemap` v6: auto i18n integration — HIGH confidence (verified module is installed)
- Pattern for `useJsonLd.ts` composable: derived from existing codebase conventions (composable-per-concern)
- og:image static file strategy: MEDIUM confidence (sufficient for use case, no dynamic content needed)
