# External Integrations

**Analysis Date:** 2026-04-10

## APIs & External Services

**Analytics:**
- Google Analytics / Google Tag Manager via `nuxt-gtag` ^4.1.0
  - SDK/Client: `nuxt-gtag` Nuxt module
  - Auth: `NUXT_PUBLIC_GTAG_ID` env var (public runtime config)
  - Enabled only in production: `enabled: import.meta.env.NODE_ENV === 'production'`
  - Config in `nuxt.config.ts` under `gtag:` and `runtimeConfig.public.gtag`

## Data Storage

**Databases:**
- None — all portfolio data is static (TypeScript data files in `app/data/`)

**File Storage:**
- Local filesystem only — images served from `public/` or via `@nuxt/image`

**Caching:**
- None — Nuxt SSR per-request rendering

## Authentication & Identity

**Auth Provider:**
- None — no user authentication required for this portfolio site

## Email

**SMTP Email (Contact Form):**
- Provider: Any SMTP-compatible server (configured at runtime)
- Implementation: `nodemailer` ^8.0.5 in server API route `app/api/contact.post.ts`
- Validation: `zod` ^4.3.6 validates request body server-side
- Auth env vars:
  - `NUXT_SMTP_HOST` - SMTP server hostname
  - `NUXT_SMTP_USER` - SMTP credentials username
  - `NUXT_SMTP_PASS` - SMTP credentials password
  - `NUXT_SMTP_TO` - Destination email address for contact messages

## SEO & Discoverability

**Sitemap:**
- `@nuxtjs/sitemap` ^8.0.12 — automatic XML sitemap generation
- Base URL: `https://killiandalcin.fr` (configured in `nuxt.config.ts` under `site:`)
- Site name: "Killian' DAL-CIN - Developpeur Full Stack"

## Monitoring & Observability

**Error Tracking:**
- None detected

**Logs:**
- Standard Node.js stdout/stderr (captured by Docker/host)

## CI/CD & Deployment

**Hosting:**
- Self-hosted Docker container on VPS
- Image: `node:22-alpine` (multi-stage build)
- Container port: 3000
- Reverse proxy: Traefik
  - TLS via Let's Encrypt (`certresolver=public`)
  - Wildcard cert covering `killiandalcin.fr` and `*.killiandalcin.fr`
  - www → non-www permanent redirect middleware
  - Config via Docker labels in `docker-compose.yml`

**CI Pipeline:**
- None detected — manual Docker image build and deploy

**Build process:**
1. `docker build` — runs `npm ci` + `nuxt build` in `node:22-alpine`
2. Output `.output/` copied to runtime stage
3. `docker-compose up` starts the container with runtime env vars

## Internationalization

**i18n Provider:**
- `@nuxtjs/i18n` ^10.2.4
- Strategy: `prefix_except_default` (French at `/`, English at `/en/`)
- Default locale: `fr`
- Supported locales: `fr` (fr-FR), `en` (en-US)
- Locale files: `i18n/locales/fr.json`, `i18n/locales/en.json`
- Browser detection: cookie-based (`i18n_redirected`) for SSR safety

## Image Optimization

**Provider:**
- `@nuxt/image` ^2.0.0
- Default provider: local (no external image CDN configured)
- Images served from `public/`

## Webhooks & Callbacks

**Incoming:**
- `POST /api/contact` — contact form submission endpoint (`app/api/contact.post.ts`)

**Outgoing:**
- None

## Environment Configuration

**Required env vars (production):**
- `NUXT_SMTP_HOST` - SMTP server hostname
- `NUXT_SMTP_USER` - SMTP username
- `NUXT_SMTP_PASS` - SMTP password
- `NUXT_SMTP_TO` - Contact form recipient email
- `NUXT_PUBLIC_GTAG_ID` - Google Analytics tag ID
- `PORTFOLIO_URL` - Primary domain (used in Traefik labels)
- `PORTFOLIO_URL_WWW` - WWW variant (used in Traefik www-redirect rule)

**Secrets location:**
- Passed as Docker environment variables at runtime (not committed to repo)
- `docker-compose.yml` reads from host environment via `${VAR_NAME}` syntax

---

*Integration audit: 2026-04-10*
