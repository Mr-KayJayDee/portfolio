# Concerns

## Security

- No rate limiting on `server/api/contact.post.ts` — the contact API accepts unlimited POST requests, enabling spam/email flooding
- No CAPTCHA or honeypot bot protection on `app/components/ContactForm.vue`
- `.env.example` only documents `NUXT_PUBLIC_GTAG_ID` but the contact form requires four SMTP vars (`NUXT_SMTP_HOST`, `NUXT_SMTP_USER`, `NUXT_SMTP_PASS`, `NUXT_SMTP_TO`) with no documentation
- Server-side email validation in `contact.post.ts` line 12 uses `email.includes('@')` instead of a proper regex, while client-side already uses Zod's `z.string().email()`

## Tech Debt

- `'https://killiandalcin.fr/og-image.png'` hardcoded verbatim in 6 page files — any domain change requires editing all of them
- Static `public/sitemap.xml` bypasses the installed `@nuxtjs/sitemap` module — new projects are never indexed, and `/formation` in the sitemap has no matching page
- Both `package-lock.json` (npm) and `pnpm-lock.yaml` (pnpm) coexist; `Dockerfile` uses `npm ci` after migration to pnpm
- `flowboard` project `features[]` array in `app/data/projects.ts` (lines 91-97) is hardcoded English, not i18n keys, while all other project content goes through `useProjects.ts`
- `siteConfig.seo.organization.aggregateRating` in `app/data/site.ts` claims `reviewCount: '50'` while `app/data/testimonials.ts` has `totalReviews: 10` — mismatched structured data Google could flag
- Two Fiverr services have `url: '#'` in `app/data/site.ts` — non-functional CTAs on the `/fiverr` page

## Performance / UX

- `HeroSection.vue` splits the title string by `.split(' ').slice(-2)` to apply gradient styling — breaks if the FR/EN title has a different word count
- All testimonial avatar URLs point to `https://ui-avatars.com/api/...` (external CDN, external HTTP requests per avatar on every render)

## Missing SEO Features

- No `ogUrl` set on any page (all `useSeoMeta` calls omit it)
- `app/pages/project/[id].vue` uses the generic `og-image.png` instead of `project.value?.image`
- No `<link rel="canonical">` — the `prefix_except_default` i18n strategy produces `/` and `/en/` duplicate URLs without canonical deduplication
- `/formation` in `public/sitemap.xml` has no corresponding page (`app/pages/formation.vue` does not exist)

## i18n Completeness

- `app/error.vue` lines 39-44: two hardcoded English error description strings not in locale files
- `app/components/sections/HeroSection.vue` line 30: `'Available for projects'` badge is raw English, not `t()`
- Same file lines 148, 153: `'50+ projects'` and `'5.0 rating'` decorative stats are hardcoded English
- `a11y.langToggle` in both locale files hardcodes the current language name as a static string

## Testing

- Zero test files exist anywhere in the project — no coverage for the security-sensitive contact API validation, `useProjects` composable, or i18n key resolution
