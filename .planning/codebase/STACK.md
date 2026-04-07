# Technology Stack

**Analysis Date:** 2026-04-07

## Languages

**Primary:**
- TypeScript ~5.8.0 - Full application development
- JavaScript (ES modules) - Frontend runtime

**Secondary:**
- HTML5 - Document structure (in `index.html`)
- CSS - Styling with Tailwind CSS
- Markdown - Documentation (README.md)
- YAML - Configuration (implied through Dockerfile)

## Runtime

**Environment:**
- Node.js 22 - Development and build environment
- Browser environment - Vue 3 SFC runtime

**Package Manager:**
- npm - Dependency management
- Lockfile: `package-lock.json` (present and tracked)

## Frameworks

**Core Frontend:**
- Vue 3.5.13 - Progressive JavaScript framework for UI
- Vue Router 4.5.0 - Client-side routing with lazy-loaded pages
- Pinia 3.0.1 - State management (minimal usage - currently only `counter.ts`)
- Vue I18n 9.14.4 - Internationalization (English and French locale files in `src/locales/`)

**Build & Dev:**
- Vite 6.2.4 - Build tool and dev server
  - Config: `vite.config.ts` with Vue plugin, DevTools plugin, chunk splitting optimization
  - Build output: `dist/` with CSS code splitting, Terser minification
- Vite Plugin Vue DevTools 7.7.2 - Development utilities
- @vitejs/plugin-vue 5.2.3 - Vue 3 SFC support

**Styling:**
- Tailwind CSS 4.1.10 - Utility-first CSS framework
- @tailwindcss/postcss 4.1.10 - PostCSS plugin for Tailwind
- PostCSS 8.5.6 - CSS transformation pipeline
- Autoprefixer 10.4.21 - Vendor prefix handling
- Terser 5.43.1 - JavaScript minification

**Code Quality:**
- ESLint 9.22.0 - Linting (config: `eslint.config.ts`)
  - @vue/eslint-config-typescript 14.5.0
  - @vue/eslint-config-prettier 10.2.0 - Prettier integration
  - eslint-plugin-vue ~10.0.0
- Prettier 3.5.3 - Code formatting (config: `.prettierrc.json`)
  - Format settings: `semi: false`, `singleQuote: true`, `printWidth: 100`

**Type Checking:**
- vue-tsc 2.2.8 - Vue component type checking
- TypeScript compiler with `type-check` npm script

**Head Management:**
- @vueuse/head 2.0.0 - Dynamic document head management for meta tags and SEO

## Key Dependencies

**Critical:**
- vue 3.5.13 - Core framework
- vue-router 4.5.0 - SPA routing with code splitting
- pinia 3.0.1 - State management store
- vue-i18n 9.14.4 - Multi-language support

**Infrastructure & Build:**
- vite 6.2.4 - Next-gen build tool with HMR
- tailwindcss 4.1.10 - Rapid UI development
- typescript 5.8.0 - Static typing and compilation

**Developer Tools:**
- eslint 9.22.0 - Code linting
- prettier 3.5.3 - Code formatting
- npm-run-all2 7.0.2 - Parallel script execution (used in build process)
- @tsconfig/node22 22.0.1 - TSConfig preset for Node 22
- @types/node 22.14.0 - Node.js type definitions
- jiti 2.4.2 - CommonJS loader for TypeScript modules

## Configuration

**Environment:**
- No `.env` files detected in source
- Google Analytics tracking ID hardcoded: `G-CDVVNFY6MV` (in `index.html`)
- Umami analytics script loaded from `umami.killiandalcin.fr` (in `index.html`)
- Google AdSense client ID hardcoded: `ca-pub-5219367964457248` (in `index.html`)

**Build Configuration:**
- `vite.config.ts` - Build optimizations:
  - Path alias: `@/` → `./src/`
  - CSS code splitting enabled
  - Terser minification with console/debugger removal
  - Manual chunk splitting: `vue-vendor` and `ui-components`
  - Content hash in chunk filenames for cache busting
  - Source maps disabled
  - Chunk size warning limit: 1000 KB

**Type Configuration:**
- `tsconfig.json` - References `tsconfig.app.json` and `tsconfig.node.json`
- `tsconfig.app.json`:
  - Extends `@vue/tsconfig/dom.json`
  - Includes `src/**/*` and `*.vue` files
  - Path alias: `@/*` → `./src/*`
  - Excludes `src/**/__tests__/*`

**Linting Configuration:**
- `eslint.config.ts` - Flat config format:
  - Files: `**/*.{ts,mts,tsx,vue}`
  - Rules: Vue essential, TypeScript recommended
  - Skips Prettier formatting enforcement

**Formatting Configuration:**
- `.prettierrc.json`:
  - No semicolons
  - Single quotes for strings
  - 100 character line width

**PostCSS Configuration:**
- `postcss.config.js` - Tailwind CSS and Autoprefixer

**Tailwind Configuration:**
- `tailwind.config.js` - Content scanning for `index.html` and `src/**/*.{vue,js,ts,jsx,tsx}`

## Platform Requirements

**Development:**
- Node.js 22+ (specified in Dockerfile)
- npm 10+ (implied by Node 22)
- TypeScript 5.8+
- Any Unix-like shell (bash/zsh) or Windows with Node.js

**Production:**
- Docker - Multi-stage build with Node 22-alpine and nginx stable-alpine
- Web server: nginx (configured in `nginx.conf`)
- Deployment target: Static HTML served via nginx
  - Base image: `nginx:stable-alpine`
  - Document root: `/usr/share/nginx/html`
  - Port: 80
  - SPA fallback: All requests route to `/index.html`

**Browser Support:**
- JavaScript enabled (noscript fallback message in `index.html`)
- Modern browsers with ES2020+ support (Vite default targets)

## Scripts & Commands

```bash
npm run dev              # Start Vite dev server with HMR
npm run build           # Type check + build (parallel with npm-run-all2)
npm run type-check      # Run vue-tsc type checking
npm run build-only      # Build without type checking
npm run preview         # Preview production build
npm run lint            # Run ESLint with --fix
npm run format          # Format src/ with Prettier
```

---

*Stack analysis: 2026-04-07*
