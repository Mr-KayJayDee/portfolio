# Phase 6: Blog Pages - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md — this log preserves the alternatives considered.

**Date:** 2026-04-22
**Phase:** 06-blog-pages
**Areas discussed:** Layout listing /blog, Chrome article (TOC + header), Nav prev/next article, Visibilité blog & article de test

---

## Layout listing /blog

### Q1 — Format de la liste

| Option | Description | Selected |
|--------|-------------|----------|
| Grille de cards | Pattern /projects, 1/2/3 col responsive | ✓ |
| Liste verticale pleine largeur | Cards larges empilées, style éditorial | |
| Hybride : hero + grille | Dernier article en hero, suivants en grille | |

**User's choice:** Grille de cards (recommended)

### Q2 — Infos par card (multi-select)

| Option | Description | Selected |
|--------|-------------|----------|
| Titre + description + date | Minimum vital | ✓ |
| Tags (UBadge) | Visuels seulement, non-cliquables | ✓ |
| Image cover (frontmatter `image`) | 16/9 ou 3/2 via NuxtImg | ✓ |
| Reading time | Calculé depuis word count | ✓ |

**User's choice:** Tous les 4

### Q3 — Fallback image cover

| Option | Description | Selected |
|--------|-------------|----------|
| Pas de fallback, pas d'image | Cards sans image si absent | ✓ |
| Gradient branded générique | Bloc coloré avec titre overlay | |
| og-image.png branded du site | Réutiliser l'OG existant | |

**User's choice:** Pas de fallback (recommended)

### Q4 — Hero section en haut de /blog

| Option | Description | Selected |
|--------|-------------|----------|
| Hero comme /projects | Slogan + H1 + subtitle + stats | ✓ |
| Header minimal | H1 + subtitle uniquement | |
| Aucun header | Direct sur la grille | |

**User's choice:** Hero comme /projects (recommended)

---

## Chrome article (TOC + header)

### Q1 — Placement TOC (premier essai)

**User's choice (free text):** "what table des matières c'est quoi ???" — demande d'explication, pas un choix.

### Q1bis — Placement TOC après explication vulgarisée

| Option | Description | Selected |
|--------|-------------|----------|
| Sidebar sticky droite + drawer mobile | Pattern blog dev moderne, tutos longs | ✓ |
| Inline en haut de l'article, dépliable | Plus simple SSR pur | |
| Pas de TOC | Retire la feature (⚠ roadmap criterion) | |

**User's choice:** Sidebar sticky droite + drawer mobile (recommended)

**Notes:** l'utilisateur ne connaissait pas le terme "Table des matières". Explication fournie avec exemple concret (tuto Hytale à 5 sections) avant de présenter le choix.

### Q2 — Header article (multi-select)

| Option | Description | Selected |
|--------|-------------|----------|
| Titre H1 + date + tags badges | Minimum vital | ✓ |
| Image cover en hero | Aspect 21/9 si frontmatter `image` | ✓ |
| Reading time | Cohérent avec listing | ✓ |
| Breadcrumb visuel (Accueil > Blog > Titre) | UBreadcrumb Nuxt UI | ✓ |

**User's choice:** Tous les 4

### Q3 — Largeur max body markdown

| Option | Description | Selected |
|--------|-------------|----------|
| max-w-3xl (~768px) | Déjà en place, standard | ✓ |
| max-w-4xl (~896px) | Plus large pour blocs code | |

**User's choice:** max-w-3xl (recommended)

### Q4 — Highlight heading courant au scroll

| Option | Description | Selected |
|--------|-------------|----------|
| Oui, IntersectionObserver | Heading visible surligné brand-500 | ✓ |
| Non, liens d'ancre statiques | Plus simple, moins JS | |

**User's choice:** Oui, IntersectionObserver (recommended)

---

## Nav prev/next article

### Q1 — Style des liens prev/next

| Option | Description | Selected |
|--------|-------------|----------|
| Cards riches : titre + date + flèche | Pattern docs Nuxt/Stripe | ✓ |
| Liens texte simples | Minimaliste | |
| Cards avec image cover | Plus visuel mais cassé si pas d'image | |

**User's choice:** Cards riches (recommended)

### Q2 — Comment déterminer prev/next

| Option | Description | Selected |
|--------|-------------|----------|
| surround() de @nuxt/content | Helper officiel, zero logique custom | ✓ |
| Query custom triée par date | Plus verbeux mais contrôle total | |

**User's choice:** surround() (recommended)

### Q3 — Ordre des articles

| Option | Description | Selected |
|--------|-------------|----------|
| Date frontmatter descendant | Plus récent en premier | ✓ |
| Alphabetic par titre | Style docs/références | |
| Ordre de fichier | Alphabétique slug | |

**User's choice:** Date descendant (recommended)

### Q4 — Edge cases (pas de voisin)

| Option | Description | Selected |
|--------|-------------|----------|
| Afficher seul le lien existant | Case vide à droite ou gauche | ✓ |
| Lien de fallback vers /blog | Toujours 2 actions | |
| Cacher la section si 1 seul article | Pas de section du tout | |

**User's choice:** Afficher seul le lien existant (recommended)

---

## Visibilité blog & article de test

### Q1 — Que faire de `test-kotlin-syntax.md`

| Option | Description | Selected |
|--------|-------------|----------|
| Masquer via `draft: true` | Pattern standard @nuxt/content | ✓ |
| Déplacer vers `content/_drafts/` | Ignoré complètement, 404 URL | |
| Le garder visible dans /blog | Risque blog vide/démo | |
| Renommer en article réel "Guide Markdown" | Contenu permanent | |

**User's choice:** draft: true (recommended)

### Q2 — Lien "Blog" dans AppHeader.vue

| Option | Description | Selected |
|--------|-------------|----------|
| Oui, entre 'Hytale' et 'Projects' | Blog = levier SEO majeur | ✓ |
| Oui, en fin de nav (après Fiverr) | Moins proéminent | |
| Non, accessible via footer uniquement | Nav épurée | |

**User's choice:** Oui, entre Hytale et Projects (recommended)

### Q3 — Empty state listing /blog

| Option | Description | Selected |
|--------|-------------|----------|
| "Articles à venir" + CTA contact | Pattern /projects noResults | ✓ |
| Rediriger /blog vers / si vide | Cache le blog | |
| Page 404 si vide | Dur sur SEO | |

**User's choice:** "Articles à venir" + CTA contact (recommended)

### Q4 — Structure URLs finale

| Option | Description | Selected |
|--------|-------------|----------|
| /fr/blog + /en/blog + slugs, pas d'alias | Pattern phase 5, pas de changement | ✓ |
| Ajouter /fr/articles alias | Scope creep | |

**User's choice:** Pattern phase 5 (recommended)

---

## Claude's Discretion

- Nom exact du composable reading time
- Structure interne du composant TOC (UDrawer vs `<details>`)
- Format exact de la date i18n
- Classes Tailwind exactes du hero cover (21/9 vs 16/9)
- Emplacement exact du breadcrumb

## Deferred Ideas

- Filtrage par tag cliquable (backlog)
- Recherche full-text blog (backlog)
- Pagination / infinite scroll (backlog)
- JSON-LD Article + BreadcrumbList (Phase 7)
- useSeoMeta enrichi par article (Phase 7)
- Sitemap étendu (Phase 7)
- OG image generator (backlog SEO-06)
- Articles Hytale réels + cocon /hytale (Phase 8)
- Alias /articles, tags page, RSS feed (backlog)
