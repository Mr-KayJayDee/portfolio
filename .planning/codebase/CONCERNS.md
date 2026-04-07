# Codebase Concerns

**Analysis Date:** 2026-04-07

## Tech Debt

**Missing 404 Page Implementation:**
- Issue: 404 catch-all route currently redirects to HomePage instead of a dedicated 404 page
- Files: `src/router/index.ts` (line 51: TODO comment)
- Impact: Users encountering invalid routes see the homepage instead of a proper error page, creating confusion and poor UX. SEO also treats all invalid URLs as the homepage.
- Fix approach: Create a new `NotFoundPage.vue` component in `src/views/` with proper 404 messaging, then update the route in `src/router/index.ts` to point to this component.

**Hardcoded GA Tracking ID:**
- Issue: Google Analytics tracking ID `G-CDVVNFY6MV` is hardcoded in multiple places
- Files: `index.html` (line 9), `src/router/index.ts` (line 109)
- Impact: Cannot change analytics without code updates. Difficult to manage different GA IDs for development vs production environments.
- Fix approach: Move tracking ID to environment variables (`.env`), access via `import.meta.env.VITE_GA_ID`.

**Hardcoded Site URL and Analytics:**
- Issue: URLs and site identifiers hardcoded throughout the codebase
- Files: `src/composables/useSeo.ts` (lines 103, 113, 143, 149), `src/config/site.ts` (line 69), `src/router/index.ts` (line 109)
- Impact: Difficult to deploy to different environments (staging vs production). Requires code changes for different domains.
- Fix approach: Move to environment configuration. Create environment-based config: `VITE_SITE_URL`, `VITE_SITE_DOMAIN`, etc.

**External Image Asset Dependency on Placeholder Service:**
- Issue: Missing images fallback to external placeholder.com service without reliability guarantee
- Files: `src/composables/useAssets.ts` (lines 18, 42)
- Impact: If placeholder.com goes down or is rate-limited, missing images break visually. External dependency increases load time.
- Fix approach: Use local SVG or base64-encoded placeholder image instead of external URL.

## Known Bugs

**Scroll Position Duplication:**
- Symptoms: Multiple scroll handlers (in router and App.vue) could cause double-scrolling or jank
- Files: `src/App.vue` (lines 14-18), `src/router/index.ts` (lines 62-82, 118-125)
- Trigger: Navigation between routes
- Workaround: Currently works, but behavior is fragile due to redundancy

**FormationPage Billing Toggle State Issue:**
- Symptoms: Billing toggle (monthly/annual) uses `isAnnual` state but HTML shows `billingType` variable
- Files: `src/views/FormationPage.vue` (lines 12-20, 41)
- Trigger: When switching between monthly and annual billing
- Workaround: Component probably has missing reactive computed for `billingType`

## Security Considerations

**v-html Usage in FAQ Component:**
- Risk: XSS vulnerability if FAQ answers contain user-generated content or external data
- Files: `src/components/ServiceFAQ.vue` (line 22: `<p v-html="faq.answer"></p>`)
- Current mitigation: FAQ content is hardcoded in component props (trusted source), but pattern is risky if content source changes
- Recommendations: Replace with v-text or plain text content. If HTML is needed, use a sanitization library like `DOMPurify`.

**Personal Information Exposed in Configuration:**
- Risk: Email, phone number, and social profile IDs hardcoded in public config
- Files: `src/config/site.ts` (lines 71-100), `index.html` (lines 88, 239-240)
- Current mitigation: This is intentional (portfolio/contact site), but increases spam/scraping risk
- Recommendations: Consider using form submission instead of direct email/phone links on sensitive pages. Monitor contact form for abuse.

**Hardcoded Analytics and AdSense IDs:**
- Risk: Analytics and AdSense IDs in HTML source reveal account information
- Files: `index.html` (lines 9, 19)
- Current mitigation: None - IDs are public by design (Google Analytics is meant to be public)
- Recommendations: Ensure AdSense account is properly secured with password/2FA. Monitor for unauthorized modifications.

**Discord User ID Exposed:**
- Risk: Discord user ID `370940770225618954` is hardcoded and publicly visible
- Files: `src/config/site.ts` (line 92)
- Current mitigation: Discord doesn't allow impersonation via ID alone, but enables targeted attacks
- Recommendations: Keep Discord contact via link only, without exposing raw user ID. Use Discord username instead.

## Performance Bottlenecks

**Eager Image Loading with import.meta.glob:**
- Problem: All images under `src/assets/images/**` are eagerly loaded into memory at startup
- Files: `src/composables/useAssets.ts` (line 6: `eager: true`)
- Cause: `eager: true` loads all matching modules immediately instead of lazy-loading on-demand
- Improvement path: Change to lazy loading and implement on-demand imports, or at minimum separate critical images from lazy ones.

**External Script Dependencies Block Rendering:**
- Problem: Google Analytics, Google AdSense, and Umami scripts are loaded synchronously
- Files: `index.html` (lines 9, 19, 239-240)
- Cause: Multiple external scripts without proper `async` loading strategy
- Improvement path: Ensure all external scripts use `async` or `defer` attributes. Currently Umami and GTM use `defer` (good), but ensure they don't block critical rendering path.

**No Lazy Loading on Images:**
- Problem: No lazy-loading attributes on images, causing initial page load to fetch all images
- Files: Multiple components (`src/components/layout/AppFooter.vue` line 35, `src/components/layout/AppHeader.vue` line 33)
- Cause: `loading="eager"` and `loading="lazy"` not used strategically
- Improvement path: Set `loading="lazy"` on all below-fold images. Keep only above-fold images with `loading="eager"`.

## Fragile Areas

**GalleryModal Event Listener Management:**
- Files: `src/components/GalleryModal.vue` (lines 44-50)
- Why fragile: Global document keydown listener added/removed on mount/unmount. If component unmounts unexpectedly, listener could remain attached or fail to attach.
- Safe modification: Add try-catch around removeEventListener. Consider using a ref-based approach or delegated events.
- Test coverage: No test coverage visible for keyboard navigation. Recommend adding unit tests for keyboard shortcuts.

**Image URL Resolution Fallback Chain:**
- Files: `src/composables/useAssets.ts` (lines 13-44)
- Why fragile: Multiple fallback layers (module lookup → URL construction → placeholder) make debugging hard. If one fallback path fails, error is silently logged.
- Safe modification: Add explicit logging for each fallback step. Document expected path formats clearly.
- Test coverage: Recommend unit tests for edge cases (empty path, missing extensions, malformed paths).

**SEO Composable DOM Manipulation:**
- Files: `src/composables/useSeo.ts` (lines 35-70)
- Why fragile: Directly manipulates DOM with `document.querySelector`, `createElement`, `appendChild`. No error handling if DOM structure changes.
- Safe modification: Use Vue's ref system or a dedicated SEO library (e.g., `@unhead/vue`). Add error boundaries.
- Test coverage: No test coverage for SSR compatibility or DOM cleanup on route changes.

**Route-based SEO Title Dependency:**
- Files: `src/composables/useSeo.ts` (lines 75-76)
- Why fragile: Relies on route being available in useRoute() hook. If used in wrong context (non-routed component), will fail silently.
- Safe modification: Add null checks. Consider creating a composable specifically for page-level SEO that enforces route dependency.
- Test coverage: Recommend tests for components used in and outside routing context.

## Scaling Limits

**Single-Page History State:**
- Current capacity: Router handles typical portfolio page count (6-8 pages)
- Limit: If projects list grows beyond 50-100 items, ProjectsPage.vue performance degrades (all projects loaded at once)
- Scaling path: Implement pagination or virtual scrolling in ProjectsPage. Use server-side filtering if projects become dynamic.

**Inline Image Modules:**
- Current capacity: ~15-20 images loaded eagerly in memory
- Limit: If image count exceeds 100+, startup time and memory usage increase significantly
- Scaling path: Migrate to lazy-loading strategy. Consider CDN for image serving in production.

**Localization Key Lookups:**
- Current capacity: 500+ localization keys across en.ts and fr.ts
- Limit: If keys exceed 1000+, lookup performance and bundle size become concerns
- Scaling path: Implement lazy-loaded locale files (load only active language). Consider JSON-based locale format for better optimization.

## Dependencies at Risk

**No Testing Framework:**
- Risk: Zero test coverage visible in codebase. Refactoring breaks are undetectable.
- Impact: Security fixes, performance optimizations, and feature additions are risky.
- Migration plan: Add Jest + Vue Test Utils. Start with critical paths (router guards, composables, SEO).

**Hardcoded Translation Keys:**
- Risk: If translation key structure changes, UI silently breaks (missing translations show key names)
- Impact: Refactoring translations is error-prone and breaks are not caught in CI
- Migration plan: Add TypeScript strict typing for i18n keys using type-safe i18n library.

**External Analytics Dependency:**
- Risk: If Google Analytics changes API or service, tracking breaks
- Impact: Loss of analytics data, no visibility into user behavior
- Migration plan: Already using Umami (self-hosted alternative). Consider making analytics provider pluggable.

## Missing Critical Features

**No Error Boundary:**
- Problem: No Vue error boundary or fallback component for runtime errors
- Blocks: Cannot gracefully handle component errors or show error UI
- Fix approach: Create an error boundary component using Vue 3 error handling hooks (errorCaptured), wrap main app with it.

**No Offline Support:**
- Problem: No service worker or offline fallback
- Blocks: Portfolio becomes completely unavailable if user loses connection
- Fix approach: Implement service worker with offline fallback. Cache critical assets (HTML, CSS, JS).

**No Loading States:**
- Problem: No skeleton loaders or loading indicators for async operations
- Blocks: Users don't know if page is loading or broken. Especially impacts image loading.
- Fix approach: Add skeleton screens for ProjectDetailPage. Add loading indicators for gallery modal.

**No Proper 404 Page:**
- Problem: 404 redirects to homepage (mentioned in Tech Debt)
- Blocks: Users cannot identify when they've hit an invalid URL
- Fix approach: Create NotFoundPage.vue with suggestions for navigation.

**No Analytics Event Tracking:**
- Problem: Only page views tracked, no event analytics (clicks, form submissions, etc.)
- Blocks: Cannot understand user behavior beyond page traffic
- Fix approach: Add event tracking for CTA clicks, social link clicks, gallery interactions.

## Test Coverage Gaps

**No Unit Tests:**
- What's not tested: Composables (useSeo, useAssets, useProjects, useI18n), utility functions
- Files: All of `src/composables/` and `src/data/`
- Risk: Refactoring introduces subtle bugs. Type safety is partial (TypeScript, but no runtime checks).
- Priority: High - composables are core to the app and impact SEO/styling

**No Component Tests:**
- What's not tested: Interactive components (GalleryModal, ServiceFAQ, language switcher, theme toggle)
- Files: `src/components/GalleryModal.vue`, `src/components/ServiceFAQ.vue`, `src/components/ThemeToggle.vue`, `src/components/LanguageSwitcher.vue`
- Risk: UI behavior breaks silently. Accessibility features (keyboard nav, ARIA) may regress.
- Priority: High - GalleryModal keyboard navigation and language switching are user-facing

**No Integration Tests:**
- What's not tested: Router navigation, SEO meta tag updates, i18n language switching across pages
- Files: `src/router/index.ts`, cross-file composable interactions
- Risk: Multi-step user flows break. SEO meta tags may not update correctly on navigation.
- Priority: Medium - can catch cross-cutting issues

**No E2E Tests:**
- What's not tested: Full user journeys (landing → project detail → gallery → contact)
- Framework: None (not using Cypress, Playwright, etc.)
- Risk: Visual regressions, layout issues, navigation bugs in real browser contexts
- Priority: Medium - would catch integration issues and performance regressions

**No Accessibility Tests:**
- What's not tested: Keyboard navigation, screen reader compatibility, color contrast, focus management
- Files: All components with interactive elements
- Risk: Accessibility fails silently. Users with disabilities cannot navigate.
- Priority: High - portfolio should be accessible to all users

---

*Concerns audit: 2026-04-07*
