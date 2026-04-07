# Codebase Structure

**Analysis Date:** 2026-04-07

## Directory Layout

```
portfolio/
├── .claude/              # Claude editor configuration
├── .planning/            # GSD planning documents
│   └── codebase/        # Architecture and analysis docs
├── .vscode/             # VS Code workspace settings
├── dist/                # Vite production build output
├── docs/                # Documentation files
├── node_modules/        # Dependencies (git-ignored)
├── old/                 # Archived or deprecated code
├── public/              # Static assets served at root
│   └── images/          # Public static images
├── src/                 # Application source code
│   ├── assets/          # Static assets imported in code
│   │   └── images/      # Project and UI images (webp format)
│   ├── components/      # Vue component library
│   │   ├── icons/       # Icon SVG components
│   │   ├── layout/      # Layout components (Header, Footer)
│   │   ├── sections/    # Page section components
│   │   ├── shared/      # Reusable UI components
│   │   ├── styles/      # Component-scoped CSS files
│   │   └── testimonials/ # Testimonial-related components
│   ├── composables/     # Vue composables (reusable logic)
│   ├── config/          # Application configuration
│   ├── data/            # Static data files (projects, testimonials, FAQ)
│   ├── i18n/            # Internationalization setup
│   ├── locales/         # Translation files (en.ts, fr.ts)
│   ├── plugins/         # Vue plugins
│   ├── router/          # Vue Router configuration
│   ├── stores/          # Pinia state stores
│   ├── types/           # TypeScript type definitions
│   ├── views/           # Page components (route targets)
│   │   └── styles/      # Page-level CSS files
│   ├── App.vue          # Root component
│   ├── main.ts          # Application entry point
│   └── style.css        # Global stylesheet
├── .env*                # Environment variables (git-ignored)
├── .eslintrc.ts         # ESLint configuration
├── .gitignore           # Git ignore rules
├── .prettierrc.json     # Prettier code formatter config
├── eslint.config.ts     # ESLint flat config
├── index.html           # HTML entry point
├── package-lock.json    # Dependency lock file
├── package.json         # Project metadata and scripts
├── postcss.config.js    # PostCSS configuration (Tailwind)
├── tailwind.config.js   # Tailwind CSS configuration
├── tsconfig.app.json    # TypeScript config for app code
├── tsconfig.json        # Base TypeScript config
├── tsconfig.node.json   # TypeScript config for build tools
├── vite.config.ts       # Vite build configuration
└── [formation.md]       # Formation page documentation (uncommitted)
```

## Directory Purposes

**src/components/**
- Purpose: Vue Single File Components for UI building blocks
- Contains: Presentational components organized by domain
- Key files: `AppHeader.vue`, `ProjectCard.vue`, `HeroSection.vue`

**src/components/layout/**
- Purpose: Layout wrapper components used across pages
- Contains: `AppHeader.vue`, `AppFooter.vue`
- Key files: Header navigation, footer with social links

**src/components/sections/**
- Purpose: Full-width page section components
- Contains: `HeroSection.vue`, `FeaturedProjectsSection.vue`, `ServicesSection.vue`, `CTASection.vue`
- Key files: Large reusable page sections with styling

**src/components/shared/**
- Purpose: Shared utility components
- Contains: `CTAButtons.vue`, `SectionCTA.vue`
- Key files: Reusable button groups and CTA patterns

**src/components/testimonials/**
- Purpose: Testimonial display components
- Contains: `TestimonialCard.vue`, `TestimonialsCTA.vue`, `TestimonialsStats.vue`
- Key files: Fiverr review display and stats

**src/composables/**
- Purpose: Vue 3 Composition API utilities for reusable logic
- Contains: Custom hooks for i18n, SEO, theme, projects, gallery, date formatting, assets, site config
- Key files: `useI18n.ts`, `useSeo.ts`, `useTheme.ts`, `useProjects.ts`

**src/stores/**
- Purpose: Pinia state management
- Contains: Global reactive state stores
- Key files: `counter.ts` (minimal unused example), `auth.ts` (new, for authentication)

**src/views/**
- Purpose: Page-level Vue components matching routes
- Contains: `HomePage.vue`, `ProjectsPage.vue`, `ProjectDetailPage.vue`, `AboutPage.vue`, `ContactPage.vue`, `FiverrPage.vue`, `FormationPage.vue`
- Key files: Route target components, each handles own SEO and data fetching

**src/router/**
- Purpose: Vue Router configuration and navigation logic
- Contains: Route definitions, navigation guards, analytics tracking
- Key files: `index.ts` (main router), `guards.ts` (new, for route guards)

**src/types/**
- Purpose: TypeScript interface definitions
- Contains: Project, Technology, TechStack, SocialLink, ContactInfo, FiverrService, SiteConfig interfaces
- Key files: `index.ts`

**src/data/**
- Purpose: Static data files (non-API)
- Contains: Project definitions, testimonials, tech stack, FAQ data
- Key files: `techstack.ts`, `testimonials.ts`, `faq.ts`

**src/config/**
- Purpose: Application-wide configuration constants
- Contains: Site configuration with contact info, social links, SEO settings, performance flags
- Key files: `site.ts` (siteConfig export)

**src/locales/**
- Purpose: Translation message files
- Contains: English and French translation objects
- Key files: `en.ts`, `fr.ts`

**src/i18n/**
- Purpose: vue-i18n setup and initialization
- Contains: i18n instance creation and locale loading
- Key files: `index.ts`

**src/assets/images/**
- Purpose: Images imported in code (processed by Vite)
- Contains: Tech stack icons, project images, app images in webp format
- Subdirs: `fiverr/`, `flowboard/` for project-specific images

**public/images/**
- Purpose: Static images served at root URL without processing
- Contains: Logos, favicons, og:image preview images

**dist/**
- Purpose: Vite production build output
- Contains: Optimized HTML, JS chunks, CSS, images
- Generated: Automatically by `npm run build`

## Key File Locations

**Entry Points:**
- `index.html` - HTML entry point with Google Analytics, AdSense, structured data schemas
- `src/main.ts` - Vue app initialization, plugin registration (Pinia, Router, i18n)
- `src/router/index.ts` - Route table and navigation hooks

**Configuration:**
- `vite.config.ts` - Build optimization, chunk splitting, alias resolution (@)
- `tsconfig.json` - Base TypeScript settings with references to app and node configs
- `tailwind.config.js` - Tailwind CSS customization
- `postcss.config.js` - PostCSS with Tailwind
- `.eslintrc.ts` - ESLint rules and Vue plugin
- `.prettierrc.json` - Code formatting rules

**Core Logic:**
- `src/App.vue` - Root component with theme init, layout structure, scroll on route change
- `src/composables/useI18n.ts` - i18n convenience wrapper with locale switching
- `src/composables/useSeo.ts` - Dynamic meta tag management for SPA
- `src/composables/useTheme.ts` - Theme state and persistence
- `src/config/site.ts` - Centralized site configuration and constants

**Testing:**
- No test files detected in committed code (*.test.ts, *.spec.ts not found)
- Test setup tools not configured (Jest/Vitest not in package.json)

## Naming Conventions

**Files:**
- Components: PascalCase.vue (e.g., `AppHeader.vue`, `ProjectCard.vue`)
- Composables: camelCase prefixed with 'use' (e.g., `useProjects.ts`, `useSeo.ts`)
- Data/Config: camelCase or lowercase (e.g., `techstack.ts`, `site.ts`)
- Pages/Views: PascalCase with 'Page' suffix (e.g., `HomePage.vue`, `ProjectsPage.vue`)
- CSS: Matches component name or function (e.g., `AppHeader.css`, `HomePage.css`)
- Types: camelCase in index.ts (e.g., `Project`, `Technology`, `SiteConfig`)

**Directories:**
- Feature directories: lowercase plural (e.g., `components/`, `composables/`, `views/`)
- Subdirectories: lowercase descriptive names (e.g., `layout/`, `sections/`, `shared/`)
- Asset subdirectories: descriptive lowercase (e.g., `images/`, `fiverr/`, `flowboard/`)

**Vue Components:**
- Props: camelCase in script, kebab-case in template (Vue standard)
- Methods: camelCase (e.g., `toggleTheme()`, `setMetaTag()`)
- Computed: camelCase (e.g., `isDark`, `currentLocale`)
- Refs: camelCase (e.g., `isMenuOpen`, `galleryIndex`)
- CSS classes: kebab-case (e.g., `.hero-title`, `.nav-link`, `.btn-primary`)

**Constants:**
- Global config exports: camelCase (e.g., `siteConfig`)
- Array constants in data files: camelCase plural (e.g., `testimonials`, `baseProjects`)
- Type/Interface names: PascalCase (e.g., `Project`, `Testimonial`, `Technology`)

## Where to Add New Code

**New Feature (e.g., New Page):**
- Primary code: `src/views/FeaturePage.vue`
- Add route: `src/router/index.ts` (add route object to routes array)
- Add SEO data: Route meta object with title/description
- Translations: Add keys to `src/locales/en.ts` and `src/locales/fr.ts`
- Data files: Create in `src/data/feature.ts` if needed
- Tests: Would go in `src/views/__tests__/FeaturePage.spec.ts` (not yet configured)

**New Component/Module:**
- Reusable component: `src/components/FeatureName.vue`
- Layout component: `src/components/layout/ComponentName.vue`
- Section component: `src/components/sections/SectionName.vue`
- Shared/utility component: `src/components/shared/UtilityName.vue`
- Component CSS: `src/components/styles/ComponentName.css` (imported in component)

**New Composable:**
- Implementation: `src/composables/useFeatureName.ts`
- Return: Object with reactive state and methods
- Pattern: Use `onMounted`/`onUnmounted` for lifecycle, return refs/computed/methods
- Export: Named export of function (not default)

**Utilities/Services:**
- Shared helpers: `src/composables/useUtilityName.ts` (if stateful) or create `src/utils/utilityName.ts` (if stateless)
- Type definitions: Add to `src/types/index.ts`
- Config constants: Add to `src/config/site.ts` or create new `src/config/featureName.ts`

**Styling:**
- Global styles: `src/style.css` (imported in main.ts)
- Component scoped: `<style scoped>` in .vue file or separate `src/components/styles/ComponentName.css`
- Page styles: `src/views/styles/PageName.css`
- Tailwind classes: Use directly in templates (no separate CSS needed for basic styling)

**Translations:**
- English messages: `src/locales/en.ts` (export default object with nested structure)
- French messages: `src/locales/fr.ts` (same structure as English)
- Usage in components: `const { t } = useI18n()` then `{{ t('section.key') }}`

**Data/State:**
- Static data: `src/data/featureName.ts` (export arrays/objects)
- Global state: `src/stores/featureName.ts` (defineStore with Pinia)
- Site config: Update `src/config/site.ts` with new configuration

## Special Directories

**dist/:**
- Purpose: Production build output
- Generated: Yes (by Vite during `npm run build`)
- Committed: No (in .gitignore)
- Content: Optimized HTML, JS chunks with hashes, CSS, images

**node_modules/:**
- Purpose: Installed npm dependencies
- Generated: Yes (by npm install)
- Committed: No (in .gitignore)
- Content: Third-party packages

**public/:**
- Purpose: Static files served at root during dev and prod
- Generated: No (manually maintained)
- Committed: Yes
- Content: favicon.ico, favicon.webp, site.webmanifest, static images

**.git/:**
- Purpose: Git version control metadata
- Generated: Yes (by git init)
- Committed: No (in .gitignore)
- Content: Commit history, branches, objects

**old/:**
- Purpose: Archived or deprecated code
- Generated: No (manually maintained)
- Committed: Yes
- Content: Previous versions of components or features

---

*Structure analysis: 2026-04-07*
