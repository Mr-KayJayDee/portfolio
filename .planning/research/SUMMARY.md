# Research Summary

**Project:** Portfolio Killian' DAL-CIN — Vue 3 SPA → Nuxt 4 SSR Migration
**Date:** 2026-04-07
**Sources:** STACK.md, FEATURES.md, ARCHITECTURE.md, PITFALLS.md

---

## Recommended Stack (verify versions on npm before pinning)

| Package | Purpose | Confidence |
|---------|---------|------------|
| nuxt ^4.0.0 | SSR framework | MEDIUM |
| @nuxt/ui ^3.0.0 | Component library (Tailwind v4 + Reka UI) | LOW — verify stable |
| @nuxtjs/i18n ^9.x | FR/EN i18n SSR-safe | LOW — verify v9 stable |
| @nuxtjs/color-mode ^3.5.x | Dark/light mode cookie | MEDIUM |
| @nuxtjs/seo ^2.x | Meta bundle (sitemap + og-image + schema-org) | MEDIUM |
| nuxt-gtag ^3.x | Google Analytics 4 | LOW — verify Nuxt 4 compat |
| @pinia/nuxt ^0.9.x | State management | MEDIUM |
| @nuxt/image ^1.x | Image optimization (NuxtImg) | MEDIUM |
| @nuxt/eslint ^0.7.x | Linting | MEDIUM |
| @emailjs/browser | Contact form (client-only) | HIGH |

**Critical decision:** Use `@nuxtjs/seo` (meta-bundle) instead of standalone `@nuxtjs/sitemap` — it includes sitemap + og-image + schema-org in one module.

**Do NOT install separately:** Tailwind CSS (bundled by @nuxt/ui v3), vue-router (Nuxt manages it), @nuxtjs/sitemap (included in @nuxtjs/seo).

---

## Architecture

```
app/                    ← Nuxt 4 source root
  pages/                ← File-based routing (7 pages)
  components/           ← Auto-imported UI components
  composables/          ← Auto-imported reactive logic
  layouts/default.vue   ← TheHeader + slot + TheFooter
  plugins/              ← EmailJS init (client-only)
  i18n/locales/         ← fr.ts, en.ts
data/                   ← Static TS files (projects, testimonials, FAQ, tech)
public/                 ← Images, fonts
nuxt.config.ts          ← Modules + config
app.config.ts           ← Nuxt UI theme customization
```

**Data flow:** `data/*.ts` → `composables/` → `pages/` → `components/` (props down, events up)

**i18n strategy:** `prefix_except_default` — FR at `/`, EN at `/en/*`. Cookie persistence, SSR-safe.

**Deployment:** `nuxt build` (SSR) → Docker `node:22-alpine` → `node .output/server/index.mjs`. No nginx needed.

---

## Nuxt UI v3 Component Coverage (~80% of custom components replaced)

| Current Custom | Nuxt UI v3 Replacement |
|----------------|----------------------|
| AppHeader nav | UNavigationMenu |
| Mobile menu | UDrawer |
| ThemeToggle | UButton + useColorMode() |
| LanguageSwitcher | UDropdownMenu |
| ProjectCard | UCard |
| GalleryModal | UModal + UCarousel |
| ServiceFAQ | UAccordion |
| TechBadge | UBadge |
| FiverrServiceCard | UCard |
| Contact form (NEW) | UForm + UFormField + UInput + UTextarea |
| Toast feedback (NEW) | useToast() |

---

## Top 5 Pitfalls (Phase 1 blockers)

1. **localStorage → cookie** — Both locale and theme use localStorage in SPA. Must be cookie-only for SSR. Test with `curl` + cookie header.
2. **@nuxtjs/i18n v9 config** — Breaking changes from v8. Must set `vueI18n: './i18n.config.ts'` explicitly or translations render as keys in SSR.
3. **Color mode FOUC** — Even with cookie, Tailwind v4 dark variant must align with color-mode class. Test with CPU throttle.
4. **Nuxt 4 `app/` directory** — Source files must live under `app/`. Root-level files are NOT auto-imported.
5. **Nuxt UI v3 owns Tailwind config** — No standalone `tailwind.config.ts`. Customize via `app.config.ts`.

---

## Build Order (strict dependencies)

```
1. nuxt.config.ts + all modules configured     → gates everything
2. data/ migration (static TS files)            → gates composables
3. composables/ migration                       → gates pages
4. layouts/default.vue + TheHeader + TheFooter  → gates all pages
5. pages/ (leaf nodes, parallelizable)          → independent
6. plugins/ (EmailJS, gtag)                     → after contact page
7. Dockerfile production                        → after all pages
```

---

## Key Decisions Confirmed by Research

| Decision | Research Finding |
|----------|-----------------|
| SSR over SSG | i18n cookie detection requires server execution per request |
| @nuxtjs/seo over standalone sitemap | Portfolio needs og:image + JSON-LD — meta-bundle covers all |
| Static TS data over @nuxt/content | Data is typed, bilingual, static — no CMS overhead needed |
| Cookie over localStorage | Only SSR-safe persistence method for i18n + theme |
| No standalone tailwind.config | Nuxt UI v3 manages Tailwind v4 via CSS — customize in app.config.ts |

---

## Open Questions (verify before implementation)

- [ ] Confirm @nuxtjs/i18n v9 is `latest` on npm and compatible with Nuxt 4
- [ ] Confirm @nuxt/ui v3 is stable (not beta/rc)
- [ ] Confirm nuxt-gtag works with Nuxt 4
- [ ] Confirm UCarousel exists in Nuxt UI v3 stable
- [ ] Confirm exact i18n v9 config syntax for `prefix_except_default` + cookie
- [ ] Confirm Nuxt UI v3 theming API (CSS `@theme` vs `app.config.ts`)
