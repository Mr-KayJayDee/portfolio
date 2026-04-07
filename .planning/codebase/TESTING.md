# Testing Patterns

**Analysis Date:** 2026-04-07

## Test Framework

**Status:** NOT IMPLEMENTED

No testing framework is currently configured in this project. There are:
- No test files (no `.test.ts`, `.spec.ts`, `.test.vue`, or `.spec.vue` files found)
- No test runner configured (Jest, Vitest, Cypress, Playwright, etc.)
- No test configuration files in project root

**Recommendations for Implementation:**

Given this is a Vue 3 + TypeScript portfolio, recommended testing setup would be:

1. **Unit Testing:** Vitest (modern, Vue 3 native, fast)
   - Lightweight alternative to Jest
   - Built-in TypeScript support
   - Fast HMR for test-driven development
   
2. **Component Testing:** Vitest + `@vue/test-utils`
   - Test Vue components in isolation
   - Mock composables and routing
   
3. **E2E Testing:** Playwright or Cypress
   - Full user journey testing
   - SEO/routing validation
   - Analytics tracking verification

## Current Development Practices

**Build Pipeline:**
```bash
npm run type-check    # Vue TypeScript compilation check
npm run build         # Production build with type checking
npm run lint          # ESLint with --fix flag
npm run format        # Prettier formatting on src/
npm run dev           # Vite dev server
```

**Type Safety as Testing:**
- Type-checking replaces some unit test coverage
- `npm run type-check` validates all TypeScript during build
- ESLint prevents common errors with Vue and TypeScript plugins

## What Should Be Tested (If Framework Were Added)

### Composables (`src/composables/`)

**`useTheme.ts` - Unit Tests Needed:**
- `toggleTheme()` flips isDark state
- `setTheme('dark')` / `setTheme('light')` correctly sets theme
- `getTheme()` returns current theme string
- `applyTheme()` sets correct class on `document.documentElement`
- `saveTheme()` persists to localStorage
- `loadTheme()` reads from localStorage and defaults to 'dark'
- Watch effect triggers applyTheme and saveTheme on isDark change
- onMounted initialization sequence

**`useGallery.ts` - Unit Tests Needed:**
- `openGallery(images, index)` sets state correctly
- `closeGallery()` resets all state
- `nextImage()` increments index when available
- `previousImage()` decrements index when available
- `goToImage(index)` validates index bounds
- Computed properties (`currentImage`, `hasNext`, `hasPrevious`) reflect correct values
- Body scroll overflow is managed correctly

**`useSeo.ts` - Unit Tests Needed:**
- Meta tags are created and updated correctly
- `setTitle()` updates document.title and og:title
- `setMetaTag()` creates new tags if missing
- `setLinkTag()` manages canonical links
- `setStructuredData()` adds JSON-LD scripts
- onUnmounted cleanup removes all added elements (no memory leaks)
- Structured breadcrumb data is generated for non-home routes
- Title suffix appended only when needed

**`useI18n.ts` - Unit Tests Needed:**
- `switchLocale()` changes locale and saves to localStorage
- `toggleLocale()` switches between en/fr
- Computed properties reflect current locale
- Invalid locales rejected

**`useAssets.ts` - Unit Tests Needed:**
- `getImageUrl()` resolves asset paths correctly
- Fallback placeholder returned for missing images
- Handles both `@/assets/images/` and plain filename formats
- Warns on console for missing/empty paths
- Graceful error handling with placeholder fallback

**`useProjects.ts` - Unit Tests Needed:**
- Projects computed array returns correct structure
- Translations applied to titles, descriptions, buttons
- Project count matches expected baseline (7 projects)
- Featured flag correctly identifies featured projects

**`useDateFormat.ts` - Unit Tests Needed:**
- `formatRelativeTime()` returns correct French/English strings
- Year boundaries handled correctly (1 year = "1 year ago", 2+ = "X years ago")
- Month, day granularity works in both locales
- Date parsing from DD/MM/YYYY format works correctly

### Router (`src/router/index.ts`)

**Navigation Tests:**
- All routes load their components (lazy-loaded pages)
- ScrollBehavior resets to top on normal navigation
- ScrollBehavior restores position on back/forward
- ScrollBehavior smooth-scrolls to hash anchors
- Meta tags (title, description) updated on route change

**TODO:** 404 page implementation and testing needed (see comment on line 51)

### Components (if component testing added)

**High-value components to test:**
- `AppHeader.vue` - Navigation links active state, mobile menu toggle
- `ProjectCard.vue` - Image loading, translated content, button visibility
- `ContactMethod.vue` - Props validation, conditional link component rendering
- `ServiceFAQ.vue` - Q&A toggle state, feature list rendering

## No Mocking Currently Used

Since there are no tests, no mocking framework is configured. When tests are added:

**What to Mock:**
- Vue Router (`useRouter`, `useRoute`) - use `@vue/test-utils` mocking
- localStorage - mock in test setup
- Window/Document APIs - mock in unit tests
- Dynamic image imports - mock in `useAssets` tests
- Translation (`useI18n`) - provide test translations

**What NOT to Mock:**
- Composable logic itself - test composables directly
- Type validation - let TypeScript handle it
- Vue reactivity - test against real ref/computed behavior
- Business logic in utility functions

## Missing Infrastructure

### Configuration Files Needed:

1. **Vitest config** (`vitest.config.ts`):
   ```typescript
   import { defineConfig } from 'vitest/config'
   import vue from '@vitejs/plugin-vue'
   // ... rest of config
   ```

2. **Test utilities setup** (`src/__tests__/setup.ts`):
   - Global test configuration
   - Mock setup for localStorage, window
   - Test utilities/helpers

3. **Component test examples** structure:
   - `src/__tests__/unit/` for unit tests
   - `src/__tests__/components/` for component tests
   - Matching file structure to src/

### Package Dependencies Needed:

```json
{
  "devDependencies": {
    "vitest": "^1.x",
    "@vue/test-utils": "^2.x",
    "@testing-library/vue": "^8.x",
    "happy-dom": "^12.x",
    "playwright": "^1.x"
  }
}
```

## Coverage Targets (If Implemented)

**Recommended targets:**
- Composables: 85%+ coverage (critical for reliability)
- Router: 90%+ coverage (navigation is critical)
- Components: 70%+ coverage (UI changes less frequently)
- Overall: 75%+ coverage

**High-risk areas needing coverage:**
- SEO meta tag manipulation (`useSeo`)
- Theme persistence and DOM manipulation (`useTheme`)
- Image asset loading with fallbacks (`useAssets`)
- Locale switching and persistence (`useI18n`)

## Development Testing Approach (Current)

Without automated tests, verification is manual:

1. **Type checking:** `npm run type-check` validates types
2. **Linting:** `npm run lint` catches code style issues
3. **Manual testing:** `npm run dev` starts dev server for browser testing
4. **Build validation:** `npm run build` ensures code compiles

This is appropriate for a portfolio site but would need proper testing for production applications or team projects.

---

*Testing analysis: 2026-04-07*
