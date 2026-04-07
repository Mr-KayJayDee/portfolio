# External Integrations

**Analysis Date:** 2026-04-07

## APIs & External Services

**Analytics & Tracking:**
- Google Analytics (GTM)
  - Measurement ID: `G-CDVVNFY6MV`
  - Script: Injected in `index.html` lines 8-16
  - Implementation: Inline gtag.js initialization with window.dataLayer
  - Page tracking: Configured in `src/router/index.ts` lines 105-136 via `trackPageView()` function
  - Tracks: Page path, title, and location on route changes

- Umami Analytics
  - Website ID: `83631152-9b6b-4724-aad1-828459ff36dc`
  - Hosted at: `umami.killiandalcin.fr`
  - Script tag: `index.html` line 239
  - Implementation: Self-hosted privacy-focused alternative to Google Analytics

**Advertising:**
- Google AdSense
  - Client ID: `ca-pub-5219367964457248`
  - Script: Async loaded in `index.html` lines 18-20
  - Purpose: Display contextual ads on portfolio pages

**Social Integration:**
Social media links configured in `src/config/site.ts` (no direct API integration):
- GitHub/Gitea: `https://gitea.kamisama.ovh/kayjaydee`
- LinkedIn: `https://linkedin.com/in/killian-dal-cin`
- Discord: `https://discord.com/users/370940770225618954`
- Fiverr: `https://www.fiverr.com/users/mr_kayjaydee`
- Twitter: `@killiandalcin`

**Third-Party Services Referenced (Portfolio Content, Not Integrated):**
- Instagram API - Referenced in `src/components/TechBadge.vue` and `src/composables/useProjects.ts` as portfolio technology (instagram-bot project)
- Crowdin API - Referenced in `src/composables/useProjects.ts` as portfolio technology (crowdin status bot)
- Discord.js - Referenced in `src/composables/useProjects.ts` as portfolio technology (Discord bot development)
- NPM Package Registry - discord-image-generation published at `https://www.npmjs.com/package/discord-image-generation`

## Data Storage

**Databases:**
- None detected - Portfolio is static content
- Technologies showcased (not used in this app):
  - MongoDB - Referenced in `src/data/techstack.ts`
  - MySQL - Referenced in `src/data/techstack.ts`
  - PostgreSQL - Referenced in `src/data/techstack.ts`
  - Redis - Referenced in `src/data/techstack.ts`
  - SQLite - Referenced in `src/data/techstack.ts`

**File Storage:**
- Local filesystem only
  - Images: `src/assets/images/` directory
  - Compiled assets: `dist/` directory (generated on build)
  - Public assets: `public/` directory (favicon, manifest, logos, etc.)

**Caching:**
- Browser caching via content hash in filenames:
  - Pattern: `assets/[ext]/[name]-[hash].[ext]` (configured in `vite.config.ts` lines 40-42)
  - CSS: `assets/css/[name]-[hash].css`
  - JS: `assets/js/[name]-[hash].js`
- No server-side caching layer detected

## Authentication & Identity

**Auth Provider:**
- None - Portfolio is fully public
- No authentication system implemented
- Fiverr links redirect to external Fiverr service for user authentication

## Monitoring & Observability

**Error Tracking:**
- None detected
- Errors not sent to external service
- Console errors only (JavaScript errors in browser dev tools)

**Logs:**
- Browser console logging only
- No server-side logging or aggregation
- Analytics events sent to Google Analytics and Umami for page views

**Performance Monitoring:**
- Google Analytics provides basic performance metrics
- Umami provides engagement metrics
- No dedicated APM (Application Performance Monitoring) service

## CI/CD & Deployment

**Hosting:**
- Static hosting environment (implied)
- Docker containerization available:
  - Build image: `node:22-alpine` (lines 2-17 in `Dockerfile`)
  - Runtime image: `nginx:stable-alpine` (lines 20-32 in `Dockerfile`)
  - Port: 80

**CI Pipeline:**
- None detected in repository
- Build commands available:
  - `npm run build` - Full build with type checking
  - `npm run build-only` - Build only without type checking

**Deployment Configuration:**
- `Dockerfile` - Multi-stage Docker build:
  1. Build stage: Node 22-alpine with npm install + build
  2. Production stage: nginx serving built files
  3. Custom nginx config: `nginx.conf`
- `nginx.conf` - SPA routing configuration:
  - Listens on port 80 (IPv4 and IPv6)
  - Document root: `/usr/share/nginx/html`
  - Fallback: All non-file requests route to `/index.html` (SPA requirement)

## Environment Configuration

**Required for Development:**
- Node.js 22+
- npm 10+

**Required at Runtime:**
- No environment variables required (analytics IDs hardcoded in HTML)
- Optional (for containerization):
  - Docker
  - Docker Compose

**Hardcoded Configuration:**
- Google Analytics: `G-CDVVNFY6MV` - in `index.html` line 9
- Google AdSense: `ca-pub-5219367964457248` - in `index.html` line 19
- Umami Site ID: `83631152-9b6b-4724-aad1-828459ff36dc` - in `index.html` line 240
- Umami URL: `umami.killiandalcin.fr` - in `index.html` line 239
- Base URL: `https://killiandalcin.fr` - in multiple config files (`src/config/site.ts`, `index.html`)

**Secrets Location:**
- No secrets management system
- All credentials are public analytics/advertising IDs (not sensitive)
- No API keys, database passwords, or private credentials in codebase

## Webhooks & Callbacks

**Incoming:**
- None - Portfolio is read-only

**Outgoing:**
- Google Analytics pageview tracking:
  - Method: GET requests to Google Analytics endpoint
  - Triggered: On route navigation
  - Data: Page path, title, URL
  - Implementation: `src/router/index.ts` `trackPageView()` function

- Umami analytics events:
  - Method: Beacon API (automatic page tracking)
  - Triggered: Page load and navigation
  - Data: Standard web vitals

## CDN & External Resources

**Fonts:**
- Preconnected in `index.html`:
  - `https://fonts.googleapis.com`
  - `https://fonts.gstatic.com`
  - Actual fonts: Not loaded (preconnect only, fonts not referenced in CSS)

**Images & Media:**
- UI Avatar API:
  - Service: `https://ui-avatars.com/api/`
  - Usage: Testimonial avatars in `src/data/testimonials.ts` (4 instances)
  - Pattern: Query-based avatar generation with initials and colors

- Placeholder Images:
  - Service: `https://via.placeholder.com/`
  - Usage: Fallback images in `src/composables/useAssets.ts`
  - Pattern: 400x300 gray placeholders

- Portfolio Preview Image:
  - Hosted at: `https://killiandalcin.fr/portfolio-preview.webp`
  - Usage: Open Graph and Twitter meta tags (lines 42, 55 in `index.html`)

---

*Integration audit: 2026-04-07*
