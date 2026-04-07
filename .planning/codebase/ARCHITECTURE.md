# Architecture

**Analysis Date:** 2026-04-07

## Pattern Overview

**Overall:** Vue 3 SPA (Single Page Application) with component-based architecture and SSR-friendly design patterns

**Key Characteristics:**
- Client-side routing with lazy-loaded views for performance optimization
- Composition API-based composables for shared logic and state management
- Global state managed via Pinia stores
- Multi-language support with vue-i18n
- Theme switching with localStorage persistence
- SEO-optimized with dynamic meta tags and structured data
- Google Analytics and GTM integration for tracking

## Layers

**Presentation Layer (Components):**
- Purpose: Render UI and handle user interactions
- Location: `src/components/`
- Contains: Vue Single File Components organized by domain (layout, sections, shared, testimonials, icons)
- Depends on: Composables for data access and side effects, Router for navigation
- Used by: Views and other components

**View Layer (Pages):**
- Purpose: Page-level component assembly and routing targets
- Location: `src/views/`
- Contains: Full page components (HomePage, ProjectsPage, ContactPage, AboutPage, FiverrPage, FormationPage, ProjectDetailPage)
- Depends on: Composables (useSeo, useI18n, useProjects), components, data stores
- Used by: Router for navigation

**Business Logic Layer (Composables):**
- Purpose: Encapsulate reusable logic, data fetching, and side effects
- Location: `src/composables/`
- Contains: Vue composables for projects, SEO, i18n, themes, galleries, date formatting, assets, site config
- Depends on: Types, stores, external libraries (vue-router, vue-i18n)
- Used by: Components and views

**Data/State Layer (Stores & Data):**
- Purpose: Global state and static data management
- Location: `src/stores/`, `src/data/`
- Contains: Pinia stores, static project data, testimonials, tech stack, FAQs
- Depends on: Types, composables (useI18n for localized data)
- Used by: Composables and components

**Configuration Layer:**
- Purpose: Application-wide settings and configuration
- Location: `src/config/`, `src/router/`, `src/i18n/`
- Contains: Site configuration, router setup, i18n initialization, locale messages
- Depends on: Types, data
- Used by: Main entry point and throughout app

**Type Definitions:**
- Purpose: TypeScript interfaces and types
- Location: `src/types/index.ts`
- Contains: Project, Technology, TechStack, SocialLink, ContactInfo, FiverrService, SiteConfig interfaces

## Data Flow

**1. Initial Page Load:**
1. `index.html` loads with embedded Google Analytics and Google AdSense scripts
2. `src/main.ts` initializes Vue app, Pinia store, router, and i18n
3. `src/App.vue` applies theme from localStorage and renders AppHeader + RouterView + AppFooter
4. Router initializes and loads HomePage or requested route
5. `useTheme()` applies saved theme class to document
6. `useI18n()` loads saved locale from localStorage

**2. Route Navigation:**
1. User clicks link or navigates directly
2. Router's `beforeEach` hook updates document title and meta description from route.meta
3. Router's `afterEach` hook triggers scroll to top and Google Analytics page view tracking
4. Target view component mounts and runs `useSeo()` for SEO metadata
5. View renders child components with fetched data
6. Components subscribe to composables for reactive data

**3. Data Access Pattern (Example: Projects):**
1. Component imports `useProjects()` composable
2. Composable accesses base project data from `src/data/` or static store
3. Composable uses `useI18n()` to localize strings
4. Component receives computed reactive `projects` array
5. Component renders with v-for or passes data to child components

**4. Theme Switching:**
1. `ThemeToggle` component toggles `isDark` ref in `useTheme()`
2. Watch handler applies class to document.documentElement
3. Watch handler saves to localStorage
4. Browser CSS respects `dark` class on document

**5. Language Switching:**
1. `LanguageSwitcher` component calls `switchLocale()` from `useI18n()`
2. vue-i18n locale updates and all `{{ t() }}` expressions re-evaluate
3. New locale saved to localStorage
4. Computed properties like `homeFAQs` in HomePage.vue re-evaluate with new translations

**State Management:**
- **Global:** Pinia stores (currently minimal - `useCounterStore` exists but unused)
- **Composable State:** Reactive refs in composables (theme, locale, gallery state)
- **Component State:** Local reactive refs for UI state (menu toggle, form inputs)
- **Persistence:** localStorage for theme and locale preferences
- **Server-Side Data:** Static JSON-like data in `src/data/` files, not fetched from API

## Key Abstractions

**useI18n() Composable:**
- Purpose: Unified i18n access with convenience methods
- Examples: `src/composables/useI18n.ts`
- Pattern: Wraps vue-i18n's `useI18n()`, adds locale switching and computed locale state
- Usage: Available in all components via injection

**useSeo() Composable:**
- Purpose: Dynamic SEO tag management for SPA
- Examples: `src/composables/useSeo.ts`
- Pattern: Lifecycle hooks to create/remove meta tags on mount/unmount, prevents tag duplication
- Usage: Called in view components with options object for title, description, OG tags, structured data

**useProjects() Composable:**
- Purpose: Project data access with localization
- Examples: `src/composables/useProjects.ts`
- Pattern: Base data stored separately, computed properties merge translations on read
- Usage: Returns computed `projects` array that updates when language changes

**useTheme() Composable:**
- Purpose: Centralized theme state and persistence
- Examples: `src/composables/useTheme.ts`
- Pattern: Reactive boolean with computed getter, watch for persistence, DOM manipulation
- Usage: Injected globally in App.vue, consumed by ThemeToggle component

**TechStack Interface:**
- Purpose: Typed structure for technology categories
- Examples: `src/types/index.ts`
- Pattern: Categorized array structure (programming, front, database, devtools, operating_systems, socials)
- Usage: Imported in `src/data/techstack.ts` and AboutPage.vue

**SiteConfig:**
- Purpose: Single source of truth for site-wide settings
- Examples: `src/config/site.ts`
- Pattern: Exported constant object with typed structure, includes contact info, social links, SEO config
- Usage: Imported where needed for links, contact info, performance settings

## Entry Points

**HTML Entry Point:**
- Location: `index.html`
- Triggers: Browser page load
- Responsibilities: Define DOM root (`#app`), load analytics/ads scripts, include meta tags, defer main.ts loading

**Application Entry Point:**
- Location: `src/main.ts`
- Triggers: After HTML DOM ready
- Responsibilities: Create Vue app, install plugins (Pinia, Router, i18n), mount to #app

**Router Entry Point:**
- Location: `src/router/index.ts`
- Triggers: App.use(router) in main.ts
- Responsibilities: Define route table, implement beforeEach/afterEach hooks for SEO and analytics

**Root Component:**
- Location: `src/App.vue`
- Triggers: After Vue app mounts
- Responsibilities: Initialize theme, render layout structure (header + router-view + footer), handle route-change scroll behavior

**View Components:**
- Location: `src/views/*.vue`
- Triggers: Router navigation to matching path
- Responsibilities: Page-specific SEO setup via `useSeo()`, compose sections and content, manage page-level state

## Error Handling

**Strategy:** Graceful degradation with fallback content; no explicit error boundaries detected

**Patterns:**
- Lazy-loaded routes with no 404 component (TODO comment in router) - currently redirects to HomePage
- SEO composable safely creates/finds meta elements before updating
- Theme fallback to 'dark' if localStorage empty
- Locale fallback to 'en' if not in localStorage
- Gallery modal (GalleryModal.vue) handles missing images gracefully
- Contact form likely has validation but not visible in read scope

## Cross-Cutting Concerns

**Logging:** Console-based or via external services - no custom logger detected; development uses Vue DevTools plugin

**Validation:** Form validation in components (ContactPage uses validation likely); no centralized validation layer

**Authentication:** No built-in auth system - portfolio is public facing; new auth stores/views added (LoginView, RegisterView, VerifyEmailView, DashboardView, ForgotPasswordView, guards.ts) but not integrated into main router

**SEO:** Centralized via `useSeo()` composable and router hooks; dynamic meta tags, Open Graph, Twitter cards, structured data; Google Analytics via gtag in router afterEach; Umami analytics via deferred script tag in index.html

**Performance:** Code splitting via lazy routes, vendor chunk separation in vite.config.ts, CSS code splitting enabled, Terser minification, webp image support configured, lazy image loading configurable in siteConfig

**Accessibility:** ARIA labels on interactive elements (AppHeader navigation, buttons); semantic HTML (header, nav, main, section roles); focus styles defined in App.vue

---

*Architecture analysis: 2026-04-07*
