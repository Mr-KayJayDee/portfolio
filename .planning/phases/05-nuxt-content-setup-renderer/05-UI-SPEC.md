---
phase: 5
slug: nuxt-content-setup-renderer
status: draft
shadcn_initialized: false
preset: none
created: 2026-04-21
---

# Phase 5 — UI Design Contract
## @nuxt/content Setup & Renderer

> Contrat visuel et d'interaction pour la phase d'infrastructure de rendu markdown.
> Généré par gsd-ui-researcher — à valider par gsd-ui-checker.

---

## Design System

| Property | Value | Source |
|----------|-------|--------|
| Tool | Nuxt UI v3 | CONTEXT.md / nuxt.config.ts |
| Preset | not applicable (Nuxt UI, pas shadcn) | nuxt.config.ts |
| Component library | Nuxt UI v3 (@nuxt/ui) | nuxt.config.ts modules |
| Icon library | Heroicons via Nuxt UI (i-heroicons-*) | RESEARCH.md Pattern 5 |
| Font | Hérité du site (pas de font custom déclarée dans main.css) | app/assets/css/main.css |
| Tailwind | v4 avec @theme tokens brand-* | app/assets/css/main.css |

> Note : pas de shadcn dans ce projet — stack Nuxt UI v3 + Tailwind v4. La shadcn gate ne s'applique pas.

---

## Spacing Scale

Échelle 8-points standard (multiples de 4). Tailwind v4 gère ces valeurs via ses classes utilitaires.

| Token | Value | Usage dans cette phase |
|-------|-------|------------------------|
| xs | 4px | Gap icône/texte dans les callouts Alert |
| sm | 8px | Padding interne compact (inline code, badges tags) |
| md | 16px | Padding article, espacement entre blocs prose |
| lg | 24px | Marge verticale entre sections de l'article |
| xl | 32px | Padding extérieur du wrapper `<article>` |
| 2xl | 48px | — (réservé Phase 6 pour les pages) |
| 3xl | 64px | — (réservé Phase 6 pour les pages) |

Exceptions :
- `my-4` (16px) sur les composants `Alert.vue` — conforme à l'échelle, source : RESEARCH.md Pattern 5
- Images prose : `rounded-lg w-full` sans contrainte de hauteur fixe — taille naturelle de l'image

---

## Typography

La typographie du corps de l'article est entièrement gérée par `@tailwindcss/typography` via la classe `prose`.
Les valeurs ci-dessous reflètent les valeurs par défaut du plugin, conformes aux décisions D-01.

| Role | Size | Weight | Line Height | Usage |
|------|------|--------|-------------|-------|
| Body prose | 16px (1rem) | 400 (regular) | 1.75 | Corps du texte dans `<article class="prose">` |
| Label / caption | 14px (0.875rem) | 400 (regular) | 1.5 | Tags frontmatter, métadonnées date |
| Heading article (h2/h3) | 20–24px | 600 (semibold) | 1.25 | Titres de sections générés par prose |
| Inline code | 14px (0.875rem) | 400 (regular) | 1.5 | `` `code` `` inline dans prose |

> Source : valeurs par défaut `@tailwindcss/typography` — RESEARCH.md D-01, Pattern 3.
> Police héritée du site (system-ui ou celle définie par Nuxt UI). Pas de font custom dans cette phase.

---

## Color

Le site utilise dark mode par défaut (`colorMode.preference: 'dark'`) avec cookie SSR-safe.

| Role | Value | Usage |
|------|-------|-------|
| Dominant (60%) | `bg-background` (Nuxt UI token — dark: ~#0f172a, light: #ffffff) | Surface principale de l'article, fond de page |
| Secondary (30%) | `bg-muted` / `bg-elevated` (Nuxt UI token) | Blocs de code Shiki (fond), callouts Alert background |
| Accent (10%) | `--color-brand-500: #85cb85` (vert) | Liens dans prose, bordure left des callouts `tip`, focus states |
| Destructive | `color-error` (Nuxt UI token — rouge) | Callouts `danger` uniquement |

Accent réservé exclusivement à :
- Liens hypertextes dans le contenu `prose` (`:hover` underline brand-500)
- Bordure gauche du callout `::alert{type="tip"}` (couleur success = vert)
- Aucun autre usage dans cette phase

Thème Shiki :
- `default: 'github-light'` en mode light
- `dark: 'github-dark'` en mode dark
- Synchronisé via `html.dark` (classSuffix: '' confirmé dans nuxt.config.ts)
- Source : RESEARCH.md Pattern 1, assumption A1 validée (cohérence avec charte vert/dark du site)

---

## Component Inventory

Composants à créer dans cette phase (zéro shadcn — tout Nuxt UI ou Tailwind CSS) :

| Composant | Chemin | Rôle | Base |
|-----------|--------|------|------|
| ProseImg | `components/content/ProseImg.vue` | Override prose img → NuxtImg optimisé | `<NuxtImg>` déjà installé |
| Alert | `components/content/Alert.vue` | Callout MDC `::alert{type}` | `<UAlert>` Nuxt UI |

Types de callouts MDC à implémenter (minimum) :

| Type | Icône Heroicons | Couleur Nuxt UI | Usage |
|------|-----------------|-----------------|-------|
| `info` | `i-heroicons-information-circle` | `info` | Notes générales |
| `warning` | `i-heroicons-exclamation-triangle` | `warning` | Avertissements |
| `tip` | `i-heroicons-light-bulb` | `success` (vert brand) | Conseils pratiques |
| `danger` | `i-heroicons-x-circle` | `error` | Erreurs critiques |

Source : RESEARCH.md Pattern 5 — iconMap et colorMap déjà définis, à utiliser tel quel.

---

## Copywriting Contract

Cette phase est une phase d'infrastructure — aucune page publique n'est exposée.
Le seul contenu visible est l'article de test servant à valider les critères de succès.

| Element | Copy (FR) | Copy (EN) |
|---------|-----------|-----------|
| Titre article de test | "Test Kotlin Syntax Highlighting" | "Test Kotlin Syntax Highlighting" |
| Description article de test | "Article de test pour valider le renderer @nuxt/content" | "Test article to validate the @nuxt/content renderer" |
| Contenu callout info de test | "Ceci est un callout d'information." | "This is an information callout." |
| Contenu callout warning de test | "Ceci est un avertissement." | "This is a warning." |
| Contenu callout tip de test | "Conseil pratique de développement Kotlin." | "Practical Kotlin development tip." |
| Alt image de test | "Image de test pour NuxtImg dans les articles" | "Test image for NuxtImg in articles" |

États d'erreur (infrastructure — pas d'UI utilisateur) :
- Aucun état d'erreur visible par l'utilisateur dans cette phase
- En cas d'échec du build SQLite : erreur côté serveur uniquement (logs), pas de fallback UI

Aucune action destructive dans cette phase.

---

## Prose Wrapper Contract

Le wrapper autour de `<ContentRenderer>` suit ce contrat exact :

```html
<article class="prose dark:prose-invert max-w-none">
  <ContentRenderer :value="page" />
</article>
```

- `max-w-none` : la contrainte de largeur est gérée par le layout parent (Phase 6), pas par prose
- `dark:prose-invert` : inverse automatiquement les couleurs prose en dark mode
- Source : RESEARCH.md D-01, Pattern 3

---

## Frontmatter Schema (minimal Phase 5)

Déclaré dans `content.config.ts` via Zod. Utilisé par l'article de test.

| Champ | Type | Requis | Usage |
|-------|------|--------|-------|
| `title` | `z.string()` | Oui | Titre de l'article |
| `description` | `z.string()` | Oui | Meta description (Phase 7) |
| `date` | `z.string()` | Oui | Date ISO 8601 (YYYY-MM-DD) |
| `tags` | `z.array(z.string()).optional()` | Non | Tags thématiques |
| `image` | `z.string().optional()` | Non | Chemin image og (Phase 7) |

Source : RESEARCH.md Pattern 2 — schema `blogSchema` à utiliser tel quel.

---

## Registry Safety

| Registry | Blocks Used | Safety Gate |
|----------|-------------|-------------|
| Nuxt UI officiel | `UAlert` | Non requis — composant officiel @nuxt/ui |
| @nuxt/content officiel | `ContentRenderer`, `ContentSlot` | Non requis — module officiel Nuxt |
| Tiers | aucun | Non applicable |

> Note : Ce projet utilise Nuxt UI, pas shadcn. La registry safety gate shadcn ne s'applique pas.
> Aucun composant tiers hors ecosystem Nuxt officiel dans cette phase.

---

## Checker Sign-Off

- [ ] Dimension 1 Copywriting: PASS
- [ ] Dimension 2 Visuals: PASS
- [ ] Dimension 3 Color: PASS
- [ ] Dimension 4 Typography: PASS
- [ ] Dimension 5 Spacing: PASS
- [ ] Dimension 6 Registry Safety: PASS

**Approval:** pending
