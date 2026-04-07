# Feature Landscape

**Domain:** Freelance developer portfolio — Nuxt 4 SSR migration
**Researched:** 2026-04-07
**Confidence:** MEDIUM — Nuxt UI v3 component coverage from training knowledge (cutoff Aug 2025); Nuxt 4 stable by then. Flag for validation against current ui.nuxt.com docs before implementation.

---

## Table Stakes

Features users and search engines expect. Missing = product feels incomplete or hurts SEO directly.

| Feature | Why Expected | Complexity | Nuxt UI v3 Coverage | Notes |
|---------|--------------|------------|---------------------|-------|
| SSR on every route | Google crawls without JS; core migration reason | Low (Nuxt default) | N/A — framework concern | `nuxt build` gives SSR; `nuxt generate` gives SSG. SSR preferred for dynamic og:image |
| Per-route SEO meta | Each page needs unique title, description, og:image | Low | `useSeoMeta()` (Nuxt built-in) | Already implemented in SPA via custom `useSeo()` — replace with `useSeoMeta()` |
| JSON-LD structured data | Enables rich results in Google for Person, CreativeWork, ContactPage | Low | `useHead()` with script injection | Already on Home + Contact + Projects — migrate all pages |
| Sitemap.xml | Required for indexing; Google Search Console standard | Low | `@nuxtjs/sitemap` module | Out-of-the-box with i18n support |
| robots.txt | Crawl control; expected by all search engines | Trivial | `@nuxtjs/sitemap` handles it | |
| Dark/light mode — no FOUC | Flash of unstyled content = unprofessional | Medium | `@nuxtjs/color-mode` with cookie strategy | The SPA currently uses localStorage — causes FOUC on SSR. Cookie strategy required |
| i18n FR/EN | Already a feature; SSR-safe version expected | Medium | `@nuxtjs/i18n` v9 (Nuxt 4 compatible) | Current vue-i18n with localStorage is not SSR-safe; cookie persistence required |
| Language switch persisted across sessions | Users hate re-setting language on return | Low | `@nuxtjs/i18n` `detectBrowserLanguage` with `cookieSecure` | |
| Responsive layout — mobile first | 60%+ of portfolio visitors on mobile | Low | Nuxt UI v3 + Tailwind v4 | All Nuxt UI components are mobile-first |
| Project list with filters | Portfolio core feature; already built | Medium | `UInput` (search), `USelectMenu` or `UTabs` (filter), `UBadge` (category tags) | Current: custom `<select>` + text `<input>`. Migrate to Nuxt UI |
| Project detail page with gallery | Proves depth of work | Medium | `UModal` (lightbox), `UCarousel` (thumbnails) | Current GalleryModal.vue (custom) → replace with `UModal` + `UCarousel` |
| Contact methods display | GitHub, LinkedIn, email, phone — visitors need this | Low | `UCard`, `UButton`, `ULink` | Current ContactPage.vue uses custom card design |
| Navigation header with mobile menu | Standard expectation | Low | `UNavigationMenu` or `UHeader` (Nuxt UI Pro) | If not using Pro: compose with `UDrawer` for mobile nav overlay |
| Footer with links | Standard; also helps SEO via internal links | Low | Custom with `ULink` | |
| 404 page | Missing = 404 error shows server default | Trivial | `error.vue` in Nuxt root | |
| Image optimization | Core Web Vitals; LCP often an image | Medium | `@nuxt/image` → `<NuxtImg>` | Hero image preload + lazy load for project thumbnails |
| Local fonts (no Google Fonts FOUT) | Flash of unstyled text on SSR | Low | `@nuxtjs/google-fonts` with `download: true` or manual `public/fonts/` | Prefer manual: zero dependency |

---

## Differentiators

Features that elevate the portfolio above average. Not universally expected but add credibility.

| Feature | Value Proposition | Complexity | Nuxt UI v3 Coverage | Notes |
|---------|-------------------|------------|---------------------|-------|
| Contact form with email delivery | Visitors can send a message directly — reduces friction vs email link only | Medium | `UForm` + `UFormField` + `UInput` + `UTextarea` + `UButton` | Backend-free via EmailJS. `UForm` handles validation schema (Zod/Valibot). Current SPA has NO form — this is new |
| Testimonials section | Social proof — differentiates freelancer from agency | Low | `UCard` for testimonial cards, custom grid | Already has TestimonialsSection.vue — migrate design to Nuxt UI cards |
| Services/pricing page (Fiverr landing) | Conversion-focused; makes offering concrete | Medium | `UCard` (service cards), `UBadge` (tags), `UAccordion` (FAQ) | Already exists as FiverrPage.vue — migrate FAQ to `UAccordion` |
| Tech stack badges | Visual proof of skills without reading text | Low | `UBadge` with `color` and `variant` props | Current TechBadge.vue is custom — replace with `UBadge` |
| Stats display (projects count, featured, etc.) | Builds credibility at a glance | Low | Custom with Tailwind / `UCard` | Already on Projects page and Contact page |
| Formation/training page | Demonstrates continued learning | Low | `UCard`, `UBadge`, `UTimeline` (if available in v3) | Already exists — migrate |
| Keyboard navigation in gallery | Accessibility + power-user UX | Low | `UModal` supports keyboard close (Escape) natively; add arrow key handler | Current GalleryModal.vue already handles keyboard — preserve in migration |
| og:image per project | Rich previews when shared on LinkedIn/Twitter | Low | `useSeoMeta()` with `ogImage` per page | Already implemented in SPA — ensure NuxtImg doesn't break paths |
| Preload hero image | LCP optimization — measurable Google ranking signal | Low | `useHead({ link: [{ rel: 'preload', as: 'image' }] })` | Single line addition |
| Google Analytics 4 via nuxt-gtag | Current hardcoded GA in index.html is fragile | Low | `nuxt-gtag` module | Replace `index.html` script tag with proper module |

---

## Anti-Features

Things to deliberately NOT build in this migration.

| Anti-Feature | Why Avoid | What to Do Instead |
|--------------|-----------|-------------------|
| Contact form with custom backend / API route | Adds infra complexity, auth, spam handling — out of scope per PROJECT.md | EmailJS from client — form submits directly, no Nuxt server route needed |
| @nuxt/content for project data | CMS markdown adds indirection when data is already typed TS | Keep `src/data/` as `.ts` files imported by composables |
| Blog / articles section | Not in scope; adds content maintenance burden | If needed later, add as a separate milestone |
| Portfolio password protection | Friction for recruiters / clients browsing | Open portfolio is the point |
| Infinite scroll on projects page | Premature — project count is small; adds complexity | Paginated list or full list is sufficient |
| Animation library (GSAP, Motion One) | Heavy; Tailwind CSS animations + CSS transitions are sufficient | CSS `transition`, `@keyframes` via Tailwind |
| Umami analytics self-hosted | Out of scope per PROJECT.md — requires infra | GA4 via nuxt-gtag |
| Custom color theme picker | Dark/light binary is sufficient; theme builder adds JS weight and UX surface | `@nuxtjs/color-mode` toggle only |
| CMS admin panel | No need for non-dev content editing | Static TS data files, update via code |
| i18n for more than FR/EN | Scope creep; translation maintenance doubles for each language | FR/EN only |

---

## Nuxt UI v3 Component Coverage Map

Mapped against every portfolio pattern in this project. Confidence: MEDIUM (training data on v3 alpha/beta; verify against ui.nuxt.com before building).

| Portfolio Pattern | Nuxt UI v3 Component(s) | Replaces (current) | Notes |
|-------------------|------------------------|---------------------|-------|
| Navigation menu desktop | `UNavigationMenu` | Custom `AppHeader.vue` nav links | Composable nav with active state |
| Mobile menu drawer | `UDrawer` or `UModal` | Custom hamburger + overlay | `UDrawer` preferred for slide-in nav |
| Dark/light toggle button | `UButton` with icon slot | `ThemeToggle.vue` (custom) | Toggle reads `useColorMode()` |
| Language switcher dropdown | `UDropdownMenu` | `LanguageSwitcher.vue` (custom) | `UDropdownMenu` items = `[{ label: 'FR' }, { label: 'EN' }]` |
| Project card | `UCard` | `ProjectCard.vue` (custom) | `UCard` header/footer/body slots |
| Project filter search input | `UInput` with icon | Custom `<input>` | Leading icon slot for magnifier |
| Project category filter | `USelectMenu` or `UTabs` | Custom `<select>` | `UTabs` better UX if <6 categories |
| Project gallery modal/lightbox | `UModal` + `UCarousel` | `GalleryModal.vue` (custom) | `UModal` handles focus trap + Escape; `UCarousel` for image navigation with prev/next |
| Contact form fields | `UForm` + `UFormField` + `UInput` + `UTextarea` | No form currently | `UForm` integrates with Zod/Valibot for schema validation |
| Contact form submit button with loading | `UButton` with `loading` prop | N/A | `UButton loading` shows spinner during EmailJS send |
| Social link items | `ULink` or `UButton` variant=link | Custom `<a>` tags | |
| Service/Fiverr service cards | `UCard` | `FiverrServiceCard.vue` (custom) | |
| FAQ accordion | `UAccordion` | `ServiceFAQ.vue` (custom) | Built-in open/close, accessible |
| Testimonial cards | `UCard` | `TestimonialCard.vue` (custom) | |
| Tech skill badges | `UBadge` | `TechBadge.vue` (custom) | `color` and `variant` props cover current custom styles |
| Section CTA buttons | `UButton` | `CTAButtons.vue` (custom) | `UButton` size/variant props handle all current btn variants |
| 404 error page | Custom `error.vue` with `UButton` | N/A (SPA handled by router) | Nuxt `error.vue` gets `error` prop |
| Toast / form feedback | `useToast()` + `UToastProvider` | None currently | Show success/error after EmailJS send |
| Page loading indicator | `NuxtLoadingIndicator` (Nuxt built-in) | None in SPA | One-liner in `app.vue` |

---

## Feature Dependencies

```
SSR (nuxt build)
  → i18n cookie persistence (@nuxtjs/i18n v9)
    → Language switcher UI (UDropdownMenu)
  → Dark mode cookie (@nuxtjs/color-mode)
    → Theme toggle UI (UButton + useColorMode)
  → Per-route SEO (useSeoMeta)
    → Sitemap (@nuxtjs/sitemap)
    → og:image per project

Contact form (UForm + Zod)
  → EmailJS client send
    → UButton loading state
    → useToast() success/error feedback

Project gallery (UModal + UCarousel)
  → Project detail page
    → Project data (TS static files)
      → useProjects() composable (useAsyncData wrapper)

Image optimization (NuxtImg)
  → @nuxt/image module
  → Hero preload (useHead link preload)
```

---

## MVP Recommendation

Phases should prioritize in this order to unblock everything else:

1. **SSR foundation** — Nuxt 4 project scaffold, routing, layouts, @nuxtjs/color-mode, @nuxtjs/i18n. Without this nothing else works correctly.
2. **Static data migration** — Port `src/data/` TS files + composables to Nuxt conventions. Unblocks all page content.
3. **Page migrations** (Home, Projects, Project Detail, About, Contact, Fiverr, Formation) — Migrate one page at a time with Nuxt UI v3 components replacing custom ones.
4. **Contact form** — New feature, not a migration. Add EmailJS + UForm + useToast after pages are stable.
5. **SEO + sitemap** — Add after pages exist; useSeoMeta() per page, sitemap module, JSON-LD.
6. **Performance polish** — NuxtImg, font preloads, GA4 via nuxt-gtag, Docker production build.

Defer:
- Formation page: low traffic value; migrate last
- Fiverr page: secondary conversion path; migrate after core pages
- Testimonials stats: nice-to-have; fold into About or Home as a section

---

## Sources

- Training knowledge: Nuxt UI v3 component API (alpha/beta period, up to Aug 2025) — MEDIUM confidence
- Training knowledge: Nuxt 4 release features, `@nuxtjs/i18n` v9, `@nuxtjs/color-mode`, `@nuxt/image` — MEDIUM confidence
- Direct codebase analysis: `src/views/`, `src/components/` in this repository — HIGH confidence
- PROJECT.md constraints and out-of-scope declarations — HIGH confidence

**Validate before building:** Confirm `UCarousel`, `UDrawer`, `UNavigationMenu`, `UAccordion`, `UForm`/`UFormField` names against current ui.nuxt.com/components — component names may have changed between v3 beta and v3 stable.
