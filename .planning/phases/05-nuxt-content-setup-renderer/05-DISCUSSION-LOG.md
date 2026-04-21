# Phase 5: @nuxt/content Setup & Renderer - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md — this log preserves the alternatives considered.

**Date:** 2026-04-21
**Phase:** 05-nuxt-content-setup-renderer
**Areas discussed:** Style du rendu markdown, Callouts / Alerts, Structure content/, Syntax highlighting

---

## Style du rendu markdown

| Option | Description | Selected |
|--------|-------------|----------|
| @tailwindcss/typography | Plugin officiel Tailwind — classe `prose dark:prose-invert`, dark mode natif | ✓ |
| Nuxt UI prose styles | Via `UProse`, cohérent avec le design system existant | |
| CSS custom à la main | Tout écrire dans assets/css/ — contrôle total, effort élevé | |

**User's choice:** @tailwindcss/typography  
**Notes:** —

---

## Callouts / Alerts

| Option | Description | Selected |
|--------|-------------|----------|
| MDC Components | Syntaxe `::alert{type}` dans le markdown, composant Vue dédié | ✓ |
| HTML dans le markdown | `<div class="callout">` directement dans les .md | |

**User's choice:** MDC Components  
**Notes:** —

---

## Structure content/

| Option | Description | Selected |
|--------|-------------|----------|
| content/fr/ + content/en/ | Un dossier par langue, aligné avec @nuxtjs/i18n | ✓ |
| content/blog/ avec champ locale | Fichiers `.fr.md` / `.en.md` dans un seul dossier | |

**User's choice:** content/fr/ + content/en/  
**Notes:** —

---

## Syntax highlighting

| Option | Description | Selected |
|--------|-------------|----------|
| Shiki intégré | Zéro config, langues déclarées dans nuxt.config.ts, thème dark/light | ✓ |
| Prism | Alternative plus ancienne, moins performante | |

**User's choice:** Shiki intégré  
**Notes:** Langages prioritaires : Kotlin, Java, TypeScript, Shell

---

## Claude's Discretion

- Thème Shiki exact (dark/light)
- Types de callouts MDC à créer (minimum : info, warning, tip)
- Frontmatter schema des articles

## Deferred Ideas

- Pages /blog et /blog/[slug] → Phase 6
- SEO par article → Phase 7
- Articles Hytale réels → Phase 8
