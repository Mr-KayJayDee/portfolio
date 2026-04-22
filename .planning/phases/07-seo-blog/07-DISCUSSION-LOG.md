# Phase 7: SEO Blog - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md — this log preserves the alternatives considered.

**Date:** 2026-04-22
**Phase:** 07-seo-blog
**Areas discussed:** JSON-LD strategy, og:image fallback, Sitemap source, Périmètre listing, Author/publisher, dateModified, Drafts in sitemap, hreflang alternates

---

## JSON-LD strategy

| Option | Description | Selected |
|--------|-------------|----------|
| nuxt-schema-org (Recommended) | Module Nuxt SEO. defineArticle/defineBreadcrumb typés, locale-aware. | ✓ |
| Hand-rolled via useHead | Construction manuelle JSON-LD. Zero dep mais répétitif et risque drift. | |
| @nuxtjs/seo (umbrella) | Bundle complet — doublonne avec @nuxtjs/sitemap. | |

**User's choice:** nuxt-schema-org
**Notes:** Recommandation suivie — typage + auto-merge site.url + cohérence Nuxt SEO ecosystem.

---

## og:image fallback

| Option | Description | Selected |
|--------|-------------|----------|
| Frontmatter image OR static fallback (Recommended) | image: frontmatter sinon /og-blog-default.jpg statique. KISS, zero runtime. | ✓ |
| nuxt-og-image (Satori, runtime) | Génération dynamique. Joli mais build-time + edge runtime + design. | |
| Frontmatter only, fail si absent | Strict, bloque les articles texte-only. | |

**User's choice:** Hybride frontmatter + fallback statique
**Notes:** nuxt-og-image reporté en deferred ideas (à reconsidérer si traction social).

---

## Sitemap source

| Option | Description | Selected |
|--------|-------------|----------|
| Endpoint Nitro /api/__sitemap__/urls.ts (Recommended) | Server route query collections, retourne loc+lastmod+alternates. | ✓ |
| Auto-discovery via prerender hooks | Marche en SSG uniquement. | |
| Liste statique régénérée à chaque build | Pas reactive aux nouveaux articles post-build. | |

**User's choice:** Endpoint Nitro
**Notes:** Pattern officiel @nuxtjs/sitemap + i18n. Compatible SSR pur (déploiement Docker actuel).

---

## Périmètre listing

| Option | Description | Selected |
|--------|-------------|----------|
| Articles + listing minimal (Recommended) | /blog reçoit useSeoMeta enrichi + JSON-LD Blog simple ; /blog/[slug] le pack complet. | ✓ |
| Articles uniquement | Plus rapide mais ranking listing affaibli. | |
| Articles + listing + page d'accueil / | Scope creep — relève d'une phase SEO globale. | |

**User's choice:** Articles + listing minimal
**Notes:** WebSite/Person globaux home reportés en deferred.

---

## Author/publisher

| Option | Description | Selected |
|--------|-------------|----------|
| Constante globale Killian (Recommended) | Single Person identity dans config. Pas de frontmatter override. | ✓ |
| Frontmatter author override + fallback Killian | Flexibilité guest-posts non planifiée. | |

**User's choice:** Constante globale Killian
**Notes:** Pas de guest authors prévus — over-engineering évité.

---

## dateModified

| Option | Description | Selected |
|--------|-------------|----------|
| Frontmatter `updated` optionnel, fallback `date` (Recommended) | Schema Zod enrichi updated.optional(). Semantically correct. | ✓ |
| Toujours = date | Perte signal SEO si article révisé. | |
| git mtime du fichier .md | Hook git — casse en build Docker sans .git layer. | |

**User's choice:** updated optional + fallback date
**Notes:** git mtime déféré — à reconsidérer si on ajoute un layer git ou stamping CI.

---

## Drafts in sitemap

| Option | Description | Selected |
|--------|-------------|----------|
| Non, draft=false uniquement (Recommended) | Cohérent avec Phase 6 D-14. Drafts accessibles direct URL only. | ✓ |
| Oui, tous articles + drafts | Risque indexation drafts (test-kotlin-syntax.md). | |

**User's choice:** Drafts exclus
**Notes:** Cohérence avec filtrage listings établi Phase 6.

---

## hreflang alternates

| Option | Description | Selected |
|--------|-------------|----------|
| Oui, par paire de slugs (Recommended) | xhtml:link rel='alternate' hreflang='fr/en' croisés + x-default FR. | ✓ |
| Non, sitemap par locale indépendant | Risque duplicate content vu par Google. | |

**User's choice:** Alternates par paire de slugs
**Notes:** Fr = locale par défaut → x-default pointe sur FR.

---

## Claude's Discretion

- Naming exact composable/helper résolution og:image
- Format précis description JSON-LD Blog/CollectionPage du listing
- Choix definePerson global app.vue vs author inline par defineArticle (à confirmer en research)
- Design exact /og-blog-default.jpg

## Deferred Ideas

- og:image dynamique via nuxt-og-image (Satori)
- JSON-LD WebSite + Person globaux sur la home
- Liens internes /hytale ↔ articles (SEO-14, déjà planifié Phase 8)
- git mtime pour dateModified
- JSON-LD BlogPosting[] exhaustif sur /blog
