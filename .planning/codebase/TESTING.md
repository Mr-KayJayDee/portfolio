# Testing Patterns

**Analysis Date:** 2026-04-10

## Test Framework

**Runner:** None detected
**Assertion Library:** None detected

No test runner or test framework is installed. `package.json` contains no testing dependencies (no Vitest, Jest, Playwright, Cypress, or any `@testing-library/*` package). No `test` script is defined in `package.json`.

**Run Commands:**
```bash
# No test commands available
pnpm run lint        # ESLint only
pnpm run typecheck   # Nuxt type checking (vue-tsc via nuxt typecheck)
```

## Test File Organization

No test files exist in the codebase. A search for `*.test.*` and `*.spec.*` across the entire project returned no results.

## What Currently Exists as Quality Gates

**TypeScript strict mode** (`nuxt.config.ts`):
- `typescript: { strict: true }` — all strict checks enforced at compile time
- `pnpm run typecheck` runs `nuxt typecheck` (wraps vue-tsc)

**ESLint** (`eslint.config.mjs`):
- `@nuxt/eslint` module with auto-generated type-aware rules
- `pnpm run lint` runs `eslint .`

**Runtime validation:**
- Client side: Zod schema in `app/components/ContactForm.vue` validates form input before API call
- Server side: Manual validation in `server/api/contact.post.ts` rejects malformed payloads with HTTP 400

## Test Coverage

**Current coverage: 0%** — no automated tests of any kind.

---

*Testing analysis: 2026-04-10*
