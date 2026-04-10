# Technology Stack

**Analysis Date:** 2026-04-10

## Languages

**Primary:**
- TypeScript ~5.8.0 - Full application (strict mode enforced via `nuxt.config.ts`)
- HTML5 - Server-rendered markup via Nuxt SSR

**Secondary:**
- CSS - Styling via Tailwind CSS v4 (`app/assets/css/main.css`)

## Runtime

**Environment:**
- Node.js 22 (Alpine) - Development, build, and production server

**Package Manager:**
- pnpm (primary — `pnpm-lock.yaml` present)
- npm also supported (used in Dockerfile via `npm ci`)
- Lockfile: both `pnpm-lock.yaml` and `package-lock.json` present

## Frameworks

**Core:**
- Nuxt 4 (`^4.0.0`) - SSR framework, `compatibilityVersion: 4` set in `nuxt.config.ts`
- Vue (latest) - Component framework
- Vue Router (latest) - File-based routing via Nuxt

**Nuxt Modules:**
- `@nuxt/ui` ^3.0.0 - Component library (Tailwind v4 based, configured in `app.config.ts`)
- `@nuxtjs/i18n` ^10.2.4 - Internationalization with FR/EN support
- `@nuxtjs/sitemap` ^8.0.12 - Automatic sitemap generation
- `nuxt-gtag` ^4.1.0 - Google Analytics/Google Tag Manager integration
- `@nuxt/image` ^2.0.0 - Optimized image handling
- `@nuxt/eslint` ^1.15.2 - ESLint integration

**Build/Dev:**
- Tailwind CSS ^4.2.2 (devDependency — compiled at build time)
- ESLint (via `@nuxt/eslint`) - Config: `eslint.config.mjs`
- TypeScript ~5.8.0 - Compiler and type checking via `nuxt typecheck`

## Key Dependencies

**Critical:**
- `nuxt` ^4.0.0 - Core framework with SSR engine
- `@nuxt/ui` ^3.0.0 - Provides all UI primitives (buttons, forms, modals, etc.)
- `@nuxtjs/i18n` ^10.2.4 - Multilingual routing (`fr` default, `en` prefixed via `/en/`)
- `zod` ^4.3.6 - Schema validation (used in server API routes for contact form)

**Infrastructure:**
- `nodemailer` ^8.0.5 - SMTP email sending from server API (`app/api/contact.post.ts`)
- `@types/nodemailer` ^8.0.0 - Type definitions for nodemailer

## Configuration

**Environment:**
- No `.env` committed; secrets passed at runtime via Docker environment variables
- Key runtime config variables (defined in `nuxt.config.ts` `runtimeConfig`):
  - `NUXT_SMTP_HOST` - SMTP server hostname
  - `NUXT_SMTP_USER` - SMTP username
  - `NUXT_SMTP_PASS` - SMTP password
  - `NUXT_SMTP_TO` - Recipient email address
  - `NUXT_PUBLIC_GTAG_ID` - Google Analytics tag ID

**Build:**
- `nuxt.config.ts` - Main Nuxt configuration (SSR enabled, modules, i18n, color mode, sitemap)
- `app.config.ts` - App-level UI config (primary color: `brand`)
- `tsconfig.json` + `tsconfig.app.json` + `tsconfig.node.json` - TypeScript project references
- `eslint.config.mjs` - ESLint flat config

**Key nuxt.config.ts settings:**
- `ssr: true` — SSR always enabled
- `colorMode.storage: 'cookie'` — SSR-safe theme persistence
- `i18n.detectBrowserLanguage.useCookie: true` — SSR-safe locale detection
- `typescript.strict: true` — Strict TypeScript mode

## Platform Requirements

**Development:**
- Node.js 22+
- pnpm (or npm)

**Production:**
- Docker with Node.js 22 Alpine image
- SSR server runs on port 3000 (`node .output/server/index.mjs`)
- Reverse proxy: Traefik (TLS termination, www redirect, routing)

## Scripts & Commands

```bash
pnpm dev          # Start dev server with HMR
pnpm build        # Build SSR bundle → .output/
pnpm generate     # Static generation (SSG mode)
pnpm preview      # Preview built output
pnpm lint         # Run ESLint
pnpm typecheck    # Run nuxt typecheck (vue-tsc)
```

---

*Stack analysis: 2026-04-10*
