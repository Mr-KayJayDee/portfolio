# Structure

**Analysis Date:** 2026-04-10

## Directory Layout

```
portfolio/
├── app/                              # Nuxt 4 app directory (srcDir)
│   ├── app.vue                       # Root component (UApp wrapper)
│   ├── error.vue                     # Error/404 page
│   ├── assets/css/main.css           # Global CSS (Tailwind imports)
│   ├── components/
│   │   ├── layout/
│   │   │   ├── AppHeader.vue         # Sticky header with nav, locale/theme toggles
│   │   │   └── AppFooter.vue         # Footer with social links, copyright
│   │   ├── sections/
│   │   │   ├── HeroSection.vue       # Landing hero with CTA
│   │   │   ├── FeaturedProjectsSection.vue
│   │   │   ├── ServicesSection.vue
│   │   │   ├── TestimonialsSection.vue
│   │   │   ├── FAQSection.vue
│   │   │   └── CTASection.vue
│   │   ├── ContactForm.vue           # Form with Zod validation + honeypot
│   │   ├── ProjectCard.vue           # Project display card
│   │   ├── ProjectGallery.vue        # Image gallery modal
│   │   └── TechBadge.vue             # Technology badge with icon
│   ├── composables/
│   │   └── useProjects.ts            # Project data access + i18n + filtering
│   ├── data/                         # Static typed data
│   │   ├── projects.ts               # 7 projects (Omit translatable fields)
│   │   ├── testimonials.ts           # Client testimonials
│   │   ├── techstack.ts              # Technology categories
│   │   ├── faq.ts                    # FAQ entries (i18n keys)
│   │   └── site.ts                   # Site config (SEO, contact, social)
│   ├── layouts/
│   │   └── default.vue               # Main layout (header + slot + footer)
│   └── pages/                        # File-based routing
│       ├── index.vue                 # Homepage
│       ├── about.vue                 # About page
│       ├── contact.vue               # Contact form page
│       ├── projects.vue              # Project listing with filters
│       ├── fiverr.vue                # Fiverr services page
│       └── project/[id].vue          # Dynamic project detail
├── i18n/locales/                     # Translation files
│   ├── fr.json                       # French (default locale)
│   └── en.json                       # English
├── server/api/
│   └── contact.post.ts               # Contact form POST handler (nodemailer)
├── shared/types/
│   └── index.ts                      # All TypeScript interfaces
├── public/images/                    # Static images (WebP)
├── nuxt.config.ts                    # Nuxt configuration
├── app.config.ts                     # Nuxt UI theme tokens
├── Dockerfile                        # Multi-stage SSR build (node:22-alpine)
├── docker-compose.yml                # Docker compose with Traefik
├── package.json                      # Dependencies (pnpm)
└── pnpm-lock.yaml                    # pnpm lockfile
```

## Page Inventory

| Route | File | Description |
|-------|------|-------------|
| `/` | `index.vue` | Homepage with 6 sections (hero, projects, services, testimonials, FAQ, CTA) |
| `/about` | `about.vue` | About page with tech stack badges |
| `/projects` | `projects.vue` | Project listing with search + category filters |
| `/project/:id` | `project/[id].vue` | Dynamic project detail with gallery |
| `/contact` | `contact.vue` | Contact form page |
| `/fiverr` | `fiverr.vue` | Fiverr services page |
| `/en/*` | (same files) | English prefix routes via i18n |

## Component Hierarchy

- **Layout components** (`layout/`): AppHeader, AppFooter — used in `default.vue` layout
- **Section components** (`sections/`): 6 homepage sections — composed in `index.vue`
- **Shared components** (root): ContactForm, ProjectCard, ProjectGallery, TechBadge — reused across pages

All components auto-imported with `pathPrefix: false` — use `AppHeader` not `LayoutAppHeader`.

## Where to Add Things

| To add... | Location |
|-----------|----------|
| New page | `app/pages/newpage.vue` (auto-routed) |
| New component | `app/components/` (auto-imported) |
| New section | `app/components/sections/` |
| New API route | `server/api/name.method.ts` |
| New data file | `app/data/name.ts` |
| New type | `shared/types/index.ts` |
| New i18n keys | `i18n/locales/fr.json` + `en.json` |

---

*Structure analysis: 2026-04-10*
