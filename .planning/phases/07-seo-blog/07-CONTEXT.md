# Phase 7: SEO Blog - Context

**Gathered:** 2026-04-22
**Status:** Ready for planning

<domain>
## Phase Boundary

Rendre chaque page blog (article + listing) parfaitement indexable par les moteurs de recherche : meta tags complets et uniques par article, JSON-LD `Article` + `BreadcrumbList` valides côté article, JSON-LD `Blog` simple côté listing, sitemap incluant `/blog/[slug]` FR+EN avec alternates hreflang. Aucun JavaScript client requis pour que le crawl fonctionne (SSR pur).

**Hors scope :** JSON-LD `WebSite`/`Person` global sur la home, refonte SEO des autres pages (projets, hytale, contact), liens internes /hytale ↔ articles (= SEO-14, Phase 8 cocon sémantique).

</domain>

<decisions>
## Implementation Decisions

### Génération JSON-LD
- **D-01:** Installer le module `nuxt-schema-org` (famille Nuxt SEO). API `defineArticle()` / `defineBreadcrumb()` typée, auto-merge avec `site.url`, locale-aware FR/EN. Évite le hand-rolled `useHead({ script: [...] })` répétitif et le drift schema.org.
- **D-02:** Sur `/blog/[slug]` → `useSchemaOrg([defineArticle(...), defineBreadcrumb(...)])`. Champs Article : `headline`, `description`, `image`, `datePublished`, `dateModified`, `author` (Person Killian), `publisher` (Person Killian), `inLanguage` (fr-FR / en-US), `mainEntityOfPage`.
- **D-03:** Sur `/blog` (listing) → `useSchemaOrg([defineCollectionPage(...)])` ou équivalent `Blog` minimal (pas de `BlogPosting[]` exhaustif — coût/bruit). Breadcrumb Accueil → Blog.
- **D-04:** Ne PAS installer le bundle `@nuxtjs/seo` umbrella — doublonne avec `@nuxtjs/sitemap` déjà présent et embarque modules non désirés (link-checker, robots déjà géré). Cherry-pick `nuxt-schema-org` (+ éventuellement `nuxt-og-image` reporté en Phase 8 si besoin).

### og:image
- **D-05:** Stratégie hybride frontmatter → fallback statique. Si l'article a `image:` en frontmatter (chemin relatif depuis `public/`) → utilisé tel quel. Sinon → fallback branded statique `/og-blog-default.jpg` (1200×630, à créer une fois sous `public/`, design : logo Killian' + accent typographique "Blog · killiandalcin.fr").
- **D-06:** Composable ou helper `resolveOgImage(article)` qui retourne le chemin absolu (préfixé `site.url`) — utilisé à la fois par `useSeoMeta({ ogImage })` ET par `defineArticle({ image })` pour cohérence.
- **D-07:** Génération dynamique via `nuxt-og-image` (Satori) explicitement reportée — coût (asset à designer + runtime edge) > bénéfice tant qu'on n'a pas validé le ratio articles publiés × engagement social.

### Sitemap
- **D-08:** Endpoint Nitro `server/api/__sitemap__/urls.ts` qui query `blog_fr` et `blog_en` (where `draft = false`), retourne pour chaque article `{ loc, lastmod, alternatives: [{ hreflang, href }] }`. Référencé dans `nuxt.config.ts > sitemap.sources`. Pattern officiel `@nuxtjs/sitemap` + i18n.
- **D-09:** `lastmod` = `dateModified` de l'article (= `updated` frontmatter si présent, sinon `date`).
- **D-10:** Drafts (`draft: true`) **EXCLUS** du sitemap — cohérent avec le filtrage des listings (Phase 6 D-14). Restent accessibles par URL directe pour preview.
- **D-11:** Alternates hreflang générés par paire de slugs : si `mon-slug.md` existe en FR ET EN → entrées sitemap déclarent `xhtml:link rel="alternate" hreflang="fr"` et `hreflang="en"` croisés (+ `x-default` pointant vers FR, locale par défaut). Si l'article n'existe que dans une langue → pas d'alternate.

### Article metadata
- **D-12:** `author` et `publisher` : constante globale Killian (single Person identity), définie dans un helper partagé (ex: `app/utils/seo-person.ts`) ou directement dans la config schema-org globale (`useSchemaOrg` au niveau app.vue avec `defineWebSite` + `definePerson` Killian, hérité par les Article enfants). Pas de support frontmatter `author:` override (pas de guest authors planifiés).
- **D-13:** `dateModified` source : champ `updated` optionnel dans le frontmatter (Zod `updated.optional()` à ajouter au schema `blog_fr`/`blog_en`). Si absent → `dateModified = date`. Pas de git mtime (casse en build Docker sans .git layer).

### Schema content extension
- **D-14:** Étendre les collections `blog_fr` / `blog_en` (config @nuxt/content) avec :
  - `updated: z.string().optional()` (ISO date, alimente dateModified)
  - `image: z.string().optional()` (déjà présent en pratique frontmatter, formaliser dans le schema)

### useSeoMeta enrichissement
- **D-15:** `[slug].vue` `useSeoMeta` complété avec : `ogImage` (résolu via D-06), `ogUrl` (URL canonique localisée), `ogLocale` (`fr_FR` / `en_US`), `ogLocaleAlternate` (l'autre locale si l'article existe dans les deux), `twitterCard: 'summary_large_image'`, `twitterImage` (= ogImage), `articlePublishedTime`, `articleModifiedTime`, `articleAuthor`.
- **D-16:** `/blog` index : `useSeoMeta` enrichi avec `ogImage` (= fallback statique `/og-blog-default.jpg`), `ogType: 'website'`, `ogLocale`, `ogLocaleAlternate`.

### Claude's Discretion
- Naming exact du composable/helper de résolution og:image (D-06)
- Format précis de la `description` du JSON-LD `Blog`/`CollectionPage` du listing (D-03)
- Choix entre déclarer Killian en `definePerson` global au niveau `app.vue` vs en `author` inline dans chaque `defineArticle` — selon ce que `nuxt-schema-org` recommande (à confirmer en research/plan)
- Design exact de `/og-blog-default.jpg` (juste un fallback branded, pas critique tant que ≠ `og-image.png` M1 générique)

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Specs Phase 7 — sources internes
- `.planning/REQUIREMENTS.md` §SEO-10 → SEO-13, SEO-15 — exigences acceptance pour cette phase
- `.planning/ROADMAP.md` §"Phase 7: SEO Blog" — Success Criteria (5 critères curl)

### Décisions héritées des phases précédentes
- `.planning/phases/03-seo-i18n/03-CONTEXT.md` — décisions SEO M1 (siteConfig, baseUrl, useLocaleHead pattern)
- `.planning/phases/05-nuxt-content-setup-renderer/05-CONTEXT.md` — schémas Zod blog_fr/blog_en, conventions @nuxt/content v3
- `.planning/phases/06-blog-pages/06-CONTEXT.md` — D-14 (drafts accessibles direct URL mais filtrés des listings), conventions BlogCard / breadcrumb
- `.planning/phases/06-blog-pages/06-04-SUMMARY.md` — état actuel useSeoMeta sur `[slug].vue`

### Code existant à étendre
- `app/pages/blog/[slug].vue` — useSeoMeta minimal à enrichir + ajout useSchemaOrg (D-02, D-15)
- `app/pages/blog/index.vue` — useSeoMeta minimal à enrichir + JSON-LD listing (D-03, D-16)
- `app/app.vue` — useLocaleHead({ seo: true }) déjà présent ; potentiellement y ajouter le definePerson/defineWebSite global (D-12)
- `nuxt.config.ts` — `site`, `i18n`, `@nuxtjs/sitemap` config existante ; ajouter `nuxt-schema-org` au modules array + `sitemap.sources`
- `server/plugins/reading-time.ts` — pattern Nitro hook `content:file:afterParse` (référence pour ajouter d'autres injections schema si nécessaire)
- `app/data/site.ts` (ou équivalent siteConfig) — source identité Killian pour Person/publisher

### Docs externes (officielles)
- `nuxt-schema-org` docs : https://nuxtseo.com/schema-org — defineArticle, defineBreadcrumb, defineWebSite, definePerson
- `@nuxtjs/sitemap` docs : https://nuxtseo.com/sitemap — sources config, multi-sitemap i18n, alternates hreflang
- `@nuxt/content v3` queryCollection API — déjà maîtrisé Phase 5/6
- schema.org/Article — champs requis Google : headline, image, datePublished, author, publisher (Organization OR Person)
- Google Search Central — Article structured data : https://developers.google.com/search/docs/appearance/structured-data/article

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `useSeoMeta()` (Nuxt auto-import) : déjà utilisé sur `[slug].vue` et `index.vue` — étendre, ne pas réécrire
- `useLocaleHead({ seo: true })` (`@nuxtjs/i18n`) : déjà géré au niveau `app.vue` pour les hreflang globaux et og:locale — ne pas dupliquer côté pages
- `queryCollection('blog_fr' | 'blog_en')` : pattern figé Phase 5/6, à réutiliser pour le sitemap source endpoint
- `useReadingTime()` composable + champs `minutes` / `wordCount` Phase 6 : disponibles si on veut les exposer en JSON-LD `wordCount`
- `siteConfig` / `app/data/site.ts` (à confirmer chemin) : source de vérité identité Killian (nom, URL, social) pour Person

### Established Patterns
- Locale via `useI18n()` + `localePath()` partout — toute URL canonique doit passer par `localePath` pour respecter `prefix` strategy
- `useAsyncData` keys incluent `${locale.value}` pour invalidation correcte au switch FR/EN
- Schema Zod content : extension via `.optional()` pattern (cf. Phase 6 D-01 pour `wordCount`/`minutes`) — appliquer même approche pour `updated`/`image`
- Convention og:image M1 explicite : **jamais** réutiliser `og-image.png` générique sur les pages blog

### Integration Points
- `nuxt.config.ts > modules[]` : ajouter `'nuxt-schema-org'` (ordre indifférent, mais cohérent à côté de `@nuxtjs/sitemap`)
- `nuxt.config.ts > sitemap` : ajouter `sources: ['/api/__sitemap__/urls']` et confirmer config i18n auto-detection
- `server/api/__sitemap__/urls.ts` : nouveau fichier — pattern Nitro server route, retourne `SitemapUrlInput[]`
- `content.config.ts` (ou bloc équivalent) : étendre les schémas `blog_fr`/`blog_en` avec `updated`, `image`
- `public/og-blog-default.jpg` : nouvel asset 1200×630 à créer

</code_context>

<specifics>
## Specific Ideas

- Killian = Person unique (pas d'Organization) — portfolio personnel freelance, pas une marque collective
- Articles bilingues = même slug FR et EN doivent rester appairables (cohérent avec convention Phase 5/6 : nom de fichier identique entre `content/fr/blog/` et `content/en/blog/`)
- Validation finale doit pouvoir se faire en pur `curl` sans navigateur (cf. Success Criteria ROADMAP) — donc tout le SEO doit être SSR, jamais hydraté côté client

</specifics>

<deferred>
## Deferred Ideas

- **og:image dynamique via nuxt-og-image (Satori)** — reportée. À reconsidérer si traction social mesurée justifie l'investissement design + runtime edge.
- **JSON-LD WebSite + Person globaux sur la home** — relève d'une phase SEO globale du portfolio, pas SEO blog. À ajouter si Phase 8 ou audit SEO ultérieur le demande.
- **Liens internes structurés /hytale ↔ articles (SEO-14)** — explicitement Phase 8 (Cocon Sémantique).
- **git mtime pour dateModified** — non retenu (casse Docker sans .git). À reconsidérer si on ajoute un layer git ou un build-time stamping en CI.
- **JSON-LD `BlogPosting[]` exhaustif sur /blog** — bruit pour Google, pas standard pour les listings. Si besoin de richesse listing, préférer `ItemList` minimal en Phase 8.

</deferred>

---

*Phase: 07-seo-blog*
*Context gathered: 2026-04-22*
