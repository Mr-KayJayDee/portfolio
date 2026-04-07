# Domain Pitfalls — Vue 3 SPA → Nuxt 4 SSR Migration

**Domain:** Portfolio SSR migration (Nuxt 4 + Nuxt UI v3 + @nuxtjs/i18n + @nuxtjs/color-mode)
**Researched:** 2026-04-07
**Confidence:** MEDIUM (training data + ecosystem knowledge as of Aug 2025; web access unavailable for live verification)

---

## Critical Pitfalls

Mistakes that cause rewrites or block SSR from working correctly.

---

### Pitfall 1: Hydration Mismatch from localStorage-based State

**What goes wrong:** The existing SPA uses `localStorage` for both locale and theme persistence. During SSR, the server renders with the default locale/theme (server has no access to localStorage). The client then reads localStorage and switches — causing a visible flash and a Vue hydration warning (`[Vue warn]: Hydration mismatch`). In strict hydration mode (Nuxt 4 default), this can throw an error, not just a warning.

**Why it happens:** `localStorage` is a browser-only API. The server renders `lang="fr"` but the client's stored preference is `lang="en"`. The DOM differs between server render and client mount.

**Consequences:**
- FOUC (Flash of Unstyled Content) for dark mode
- Wrong locale briefly visible on first paint
- Hydration errors that can fully break page interactivity in strict mode
- SEO crawlers see the default locale/theme, not the user's preference (but this is acceptable for SEO)

**Prevention:**
- Replace ALL `localStorage` reads with cookie reads — cookies are sent with every HTTP request, so the server can read them via `useCookie()` during SSR
- For locale: configure `@nuxtjs/i18n` with `detectBrowserLanguage: { useCookie: true, cookieKey: 'i18n_locale' }`
- For theme: configure `@nuxtjs/color-mode` with `storageKey: 'color-mode'` and ensure it uses its built-in cookie strategy (it does by default in SSR mode)
- Never call `localStorage` directly in composables that run during SSR — wrap in `if (import.meta.client)` or `onMounted()`

**Detection:** Run `nuxt build && nuxt preview`, open DevTools Console — any `[Vue warn]: Hydration` message is a failure.

**Phase:** Foundation setup (Phase 1 — before any page migration)

---

### Pitfall 2: @nuxtjs/i18n v9 Breaking Config Changes

**What goes wrong:** `@nuxtjs/i18n` v9 (required for Nuxt 4) has significant breaking changes from v8. The `vueI18n` config file path changed, `strategy: 'no_prefix'` behavior changed, and the `detectBrowserLanguage` defaults changed. Copying the old config causes silent failures where locale switching appears to work client-side but SSR always renders the default locale.

**Why it happens:** i18n v9 moved to a Nuxt-native config approach; the old `vueI18n.config.ts` file requires an explicit `vueI18n` option pointing to it. Without this, messages load client-side only (from the bundle) but are missing during SSR rendering.

**Consequences:**
- Server renders untranslated keys (e.g. `"page.hero.title"`) instead of translated text
- SEO crawlers index translation keys, not content
- Locale cookies set but not respected on server

**Prevention:**
- Set `vueI18n: './i18n.config.ts'` explicitly in `nuxt.config.ts`
- Use `lazy: true` with `langDir` for large translation files, but test SSR with `nuxt preview` (not `nuxt dev`) since lazy loading behaves differently
- Set `strategy: 'no_prefix'` only if both FR and EN share the same URL structure — verify the SEO implication (Google prefers `hreflang` differentiation)
- Test locale detection server-side: curl the deployed URL with `Cookie: i18n_locale=en` and verify English content is in the HTML response

**Detection:** `curl -H "Cookie: i18n_locale=en" http://localhost:3000/ | grep -i "hero"` — if French text appears, SSR locale is broken.

**Phase:** Foundation setup (Phase 1)

---

### Pitfall 3: @nuxtjs/color-mode FOUC Despite Cookie Strategy

**What goes wrong:** Even with `@nuxtjs/color-mode` configured for cookie storage, a FOUC (Flash of Unstyled Content / Flash of Wrong Theme) can still occur. This happens when Tailwind CSS v4 dark mode is configured as `class`-based but the `<html>` class is added after hydration rather than during SSR.

**Why it happens:** `@nuxtjs/color-mode` adds the color mode class to `<html>` via a server-side plugin. If the plugin runs after the initial HTML render, or if Tailwind's dark variant is not using `darkMode: 'class'` correctly, the flash occurs. A common mistake is having `darkMode: 'media'` in Tailwind config while `@nuxtjs/color-mode` controls a class — these conflict.

**Consequences:**
- White flash when loading dark mode (or vice versa)
- User sees theme switch on every page load
- Poor perceived performance

**Prevention:**
- In `tailwind.config.ts` (or `@import "tailwindcss"` in CSS for v4), ensure dark mode variant matches `@nuxtjs/color-mode`'s `classSuffix: ''` and `classPrefix: ''` settings
- In Nuxt UI v3 + Tailwind v4, dark mode is configured via CSS `@variant dark (.dark &)` — verify this aligns with the class `color-mode` adds (`dark` not `dark-mode`)
- Set `colorMode.preference: 'system'` as fallback but ensure the cookie override takes precedence
- Test with Network throttling (Slow 3G) in DevTools — FOUC is most visible on slow connections

**Detection:** Record a screen capture of first page load with DevTools CPU 6x throttle. Any flash = FOUC present.

**Phase:** Foundation setup (Phase 1) — must be validated before any page migration

---

### Pitfall 4: Nuxt 4 `app/` Directory Structure — Component/Composable Resolution

**What goes wrong:** Nuxt 4 changes the default directory layout. The `srcDir` default is now `app/` instead of the root. Components placed in `components/`, composables in `composables/`, and pages in `pages/` at the root level are NOT auto-imported in Nuxt 4 if you've opted into the new directory structure.

**Why it happens:** Nuxt 4 introduces `app/` as the application root (analogous to how Next.js uses `app/`). Migrating without updating import paths or without setting `future.compatibilityVersion: 4` in nuxt.config causes either broken auto-imports or requires manual path updates.

**Consequences:**
- Components silently fail to auto-import → runtime errors
- Composables work in dev (because Nuxt falls back) but fail in production build
- Hours debugging "component not found" errors

**Prevention:**
- Decide upfront: use new `app/` structure (recommended) or stay at root with explicit `srcDir: '.'`
- If using `app/`: move `components/`, `composables/`, `pages/`, `layouts/`, `middleware/`, `plugins/` into `app/`
- `server/` stays at root (it's a Nitro convention, not a Nuxt app convention)
- `public/` stays at root
- `nuxt.config.ts`, `package.json` stay at root
- Validate with `nuxt info` — it shows resolved directories

**Detection:** Run `nuxt build` and check for "Auto-imported composable used but not resolved" warnings.

**Phase:** Foundation setup (Phase 1 — structural decision before any files are created)

---

### Pitfall 5: Nuxt UI v3 + Tailwind CSS v4 Configuration Conflicts

**What goes wrong:** Nuxt UI v3 ships its own Tailwind CSS v4 preset and expects to control the Tailwind configuration via its module. Manually adding a `tailwind.config.ts` alongside Nuxt UI v3 can cause duplicate utility class generation, broken component styles, or the Nuxt UI design tokens being overridden.

**Why it happens:** Tailwind CSS v4 moved from `tailwind.config.js` to CSS-based configuration (`@import "tailwindcss"` + `@theme`). Nuxt UI v3 injects its theme tokens via this CSS mechanism. If the developer also adds a separate Tailwind config file, the two configurations merge unpredictably.

**Consequences:**
- Nuxt UI components render without their default styles
- Custom colors/spacing defined in config override Nuxt UI tokens instead of extending them
- `@apply` directives fail silently in production (different behavior than dev)

**Prevention:**
- Do NOT create a standalone `tailwind.config.ts` with Nuxt UI v3 — extend via `app.config.ts` using Nuxt UI's theme API instead
- For custom colors: use `ui.colors` in `app.config.ts`, not raw Tailwind config
- For custom CSS utilities: add them to `assets/css/main.css` using Tailwind v4's `@layer utilities` syntax
- Read Nuxt UI v3 theming docs before writing any custom styles

**Detection:** After setup, run `nuxt dev` and inspect a `UButton` — if it renders unstyled, Tailwind integration is broken.

**Phase:** Foundation setup (Phase 1)

---

## Moderate Pitfalls

---

### Pitfall 6: `useAsyncData` Key Collisions Across Pages

**What goes wrong:** Multiple pages call `useAsyncData('projects', ...)` with the same key. In SSR, Nuxt caches `useAsyncData` results by key in the payload. If two different pages use the same key for different data shapes, one page gets the other's cached data.

**Why it happens:** Copy-paste of composable calls without updating the key. This is a regression from SPA behavior — in a SPA, `useAsyncData` re-executes on every navigation; in SSR, the payload cache can serve stale data.

**Prevention:**
- Use route-scoped keys: `useAsyncData(\`project-\${slug}\`, ...)` for detail pages
- For shared data (projects list): use a single composable (`useProjects`) that internally calls `useAsyncData('projects-list', ...)` — single definition, consistent key
- Audit all `useAsyncData` calls and ensure every key is unique across the app

**Detection:** Navigate between two pages that use the same key and check if data bleeds across.

**Phase:** Data migration (composables phase)

---

### Pitfall 7: EmailJS Client-Only Execution in SSR Context

**What goes wrong:** EmailJS is a browser SDK (`emailjs-com` or `@emailjs/browser`). If the contact form composable calls `emailjs.sendForm()` in a context that can run server-side, the build will fail or throw a `window is not defined` error.

**Why it happens:** SSR executes component setup code on the server. Any direct `import emailjs from '@emailjs/browser'` at module level that accesses browser globals during import causes the server render to crash.

**Prevention:**
- Use `import.meta.client` guard: only call emailjs inside `onMounted` or an event handler (not in `setup()` body)
- Alternatively, use `nuxt-only` dynamic import: `const emailjs = await import('@emailjs/browser')` inside the submit handler
- Never call `emailjs.init()` at the top level of a composable — defer to client-side execution

**Detection:** Run `nuxt build && nuxt preview`, submit the contact form — if it throws, check server logs for `window is not defined`.

**Phase:** Contact page migration

---

### Pitfall 8: `useSeoMeta()` Duplicate Meta Tags

**What goes wrong:** The `useSeoMeta()` composable in Nuxt merges meta tags reactively. If a base `useSeoMeta()` call is in `app.vue` AND a route-level call is in a page component, the page-level tags should override the base — but some tags (especially `og:image`) may render twice if not using the `key` deduplication mechanism.

**Why it happens:** Nuxt uses Unhead under the hood. Without explicit `key` on duplicate meta entries, Unhead appends rather than replaces.

**Prevention:**
- Define global defaults in `app.vue` using `useHead()` or `useSeoMeta()` with low-priority defaults
- Override at page level — Nuxt/Unhead will deduplicate by meta `name`/`property` automatically for standard tags
- For `og:image`: provide absolute URLs (not relative paths) — relative paths resolve to `null` in SSR and crawlers see empty og:image
- Test with `curl http://localhost:3000/ | grep -i "og:image"` — count occurrences

**Detection:** View source of any page and check for duplicate `<meta property="og:image">` tags.

**Phase:** SEO implementation phase

---

### Pitfall 9: NuxtImg with External/Dynamic Image Sources

**What goes wrong:** `<NuxtImg>` with `provider: 'ipx'` (default) works fine for local images in `public/`. For images with dynamic URLs (e.g. project thumbnails loaded from a data array with paths like `/images/projects/foo.jpg`), the image optimization pipeline may fail silently in Docker if the IPX cache directory is not writable.

**Why it happens:** IPX (the image optimization engine) writes optimized images to `.nuxt/image-cache/` or a configurable dir. In Docker containers running as non-root, this directory may not be writable. The request falls through to the original image without optimization — no error, just no optimization.

**Prevention:**
- In Dockerfile: ensure the working directory and `.nuxt/` subdirectories are owned by the runtime user
- Or: use `sharp` provider with pre-optimized images at build time (simpler for static images)
- For a portfolio with static project images: consider running `nuxt generate` (SSG) instead of SSR — eliminates the runtime IPX issue entirely
- Test Docker image locally: `docker run --rm -p 3000:3000 portfolio-image` and verify images load optimized (check response headers for `Content-Type: image/webp`)

**Detection:** After Docker deploy, check Network tab — if project images are served as `image/jpeg` instead of `image/webp`, IPX optimization is failing.

**Phase:** Docker/deployment phase

---

### Pitfall 10: SSG vs SSR Decision — Critical for Docker Strategy

**What goes wrong:** The project currently deploys as static files served by nginx. A direct "lift and shift" to Nuxt 4 with `nuxt build` (SSR) requires a Node.js runtime in Docker — fundamentally different from the current nginx static serving. Teams often start with SSR, hit Docker complexity, then realize their portfolio (fully static content, no user-specific server responses) could just use `nuxt generate` (SSG).

**Why it happens:** "SSR" is the stated goal, but for a portfolio with static content, SSG provides identical SEO benefits with zero runtime complexity. The decision is deferred until deployment, causing wasted work.

**Consequences:**
- Docker image is 10x larger (Node.js runtime vs static files)
- Cold starts on container restarts
- Memory management overhead
- Unnecessary complexity for static content

**Prevention:**
- Decide SSR vs SSG in Phase 1, not Phase N
- SSG (`nuxt generate`) is appropriate if: no user-specific server responses, no server-side auth, no real-time data
- For this portfolio: SSG is almost certainly sufficient — locale/theme from cookies still works client-side after hydration, and pre-rendered HTML satisfies SEO
- If SSG: keep nginx in Docker, only Nuxt is involved at build time, not runtime

**Detection:** List every route — does any route return different HTML based on the authenticated user or real-time data? If no → SSG is viable.

**Phase:** Phase 1 decision, before any implementation

---

## Minor Pitfalls

---

### Pitfall 11: `definePageMeta()` Not Respected in Certain Nuxt 4 Contexts

**What goes wrong:** `definePageMeta({ layout: 'default' })` is a compile-time macro in Nuxt 4. Using it inside a `<script setup lang="ts">` that also contains conditional logic or computed values causes the macro extraction to fail silently — the layout falls back to default without error.

**Prevention:** Keep `definePageMeta()` at the top of `<script setup>`, with only static values. Never wrap it in conditionals.

**Phase:** Page migration

---

### Pitfall 12: Google Analytics / nuxt-gtag Firing Twice in Dev

**What goes wrong:** `nuxt-gtag` (or `nuxt-google-analytics`) sends a pageview event on every route change. In development with HMR, events can fire multiple times. This pollutes GA4 debug data.

**Prevention:** Configure `gtag: { enabled: process.env.NODE_ENV === 'production' }` so GA only fires in production builds. Current hardcoded GA in `index.html` will be dead code after migration — remove it.

**Phase:** Analytics migration (can be last)

---

### Pitfall 13: TypeScript Strict Mode Breaking Existing Data Files

**What goes wrong:** The existing `src/data/` files (projects, testimonials, FAQ) were likely written with implicit `any` types or loose typing. Enabling `strict: true` in `tsconfig.json` (Nuxt 4 default) will cause build errors for these files.

**Prevention:** Migrate data files first and define explicit interfaces (`Project`, `Testimonial`, etc.) before TypeScript strict errors compound. Use `satisfies` operator for type-safe data definitions without losing literal types.

**Phase:** Data migration phase (early)

---

## Phase-Specific Warnings

| Phase Topic | Likely Pitfall | Mitigation |
|-------------|----------------|------------|
| Foundation / nuxt.config setup | Missing `future: { compatibilityVersion: 4 }` → wrong directory structure | Set this in nuxt.config on day 1 |
| i18n integration | SSR locale mismatch (server renders default, client switches) | Cookie strategy, test with curl |
| Color mode integration | FOUC despite cookie config — Tailwind v4 dark variant mismatch | Align `classSuffix` with Tailwind v4 `@variant dark` |
| Nuxt UI v3 setup | Tailwind config conflicts, broken component styles | No standalone tailwind.config.ts |
| Data composables migration | `useAsyncData` key collisions | Route-scoped keys |
| Contact page | EmailJS `window is not defined` in SSR | Client-only execution guards |
| SEO meta | Duplicate `og:image` tags, relative URL og:image | Absolute URLs, dedup check with curl |
| Docker deploy | IPX cache not writable, Node memory | Consider SSG first; if SSR, set writable cache dir |
| Analytics | GA firing in dev or firing twice | `enabled: production` flag |

---

## Sources

- Confidence: MEDIUM — based on Nuxt 3/4 ecosystem knowledge as of August 2025. Web search was unavailable during this research session.
- Key source areas (unverifiable without web access): Nuxt 4 migration guide (nuxt.com/docs/getting-started/upgrade), @nuxtjs/i18n v9 changelog, @nuxtjs/color-mode SSR docs, Nuxt UI v3 theming docs, Unhead deduplication behavior.
- **Flag:** Pitfalls 2 (@nuxtjs/i18n v9 config), 5 (Nuxt UI v3 + Tailwind v4), and 4 (app/ directory structure) are most likely to have changed since August 2025. These should be verified against current docs before implementation.
