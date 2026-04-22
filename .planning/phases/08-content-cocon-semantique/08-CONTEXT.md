# Phase 8: Content & Cocon Sémantique - Context

**Gathered:** 2026-04-22
**Status:** Ready for planning

<domain>
## Phase Boundary

Publier le blog Hytale avec 2 articles seed complets (FR+EN, `draft: false`) et établir le cocon sémantique bidirectionnel entre `/blog` et `/hytale` : chaque article seed contient des liens internes inline vers `/hytale`, et la page `/hytale` affiche une section "Articles récents" qui query dynamiquement les 2 plus récents articles tagués `hytale`.

**Hors scope :**
- Plus de 2 articles (backlog éditorial continu, pas une phase)
- og:image dynamique via Satori (déferré Phase 7, toujours hors scope)
- Refonte SEO autres pages
- Analytics / tracking de conversion sur les CTA
- RSS feed (peut surgir plus tard si trafic le justifie)
</domain>

<decisions>
## Implementation Decisions

### Sujets des 2 articles seed
- **D-01:** Article 1 — `how-to-build-your-first-hytale-plugin` (tutorial débutant, 800-1500 mots, intent transactionnel-info, convertit vers `/hytale` commission).
- **D-02:** Article 2 — `hytale-plugin-development-2026` (positionnement/autorité, état de l'art 2026, stack, outlook — capte trafic info long-tail).
- **D-03:** Slugs FR et EN identiques (convention Phase 5/6/7 maintenue) pour que les hreflang alternates fonctionnent côté sitemap (Phase 7 D-11). Le titre/contenu est localisé, le slug reste technique anglais (simplifie le matching bilingue et évite les caractères accentués dans les URLs).

### Rédaction
- **D-04:** Claude rédige les 2 articles **complets en FR ET EN**, `draft: false`, prêts à publier. Minimum 800 mots, cible 1200-1500.
- **D-05:** Chaque article contient au moins 1 bloc de code Kotlin réaliste (le rendu Shiki est déjà shippé Phase 5). Pas d'image obligatoire dans le corps à cette phase — un frontmatter `image:` facultatif pointant vers un asset existant de `public/` OU absent (fallback `/og-blog-default.jpg` Phase 7 D-05 s'applique). Pas de nouveau travail design dans cette phase.
- **D-06:** Frontmatter obligatoire par article : `title`, `description`, `date` (ISO), `tags: ['hytale', ...]` (le tag `hytale` est obligatoire sur les 2 seeds pour alimenter le filtre de la section `/hytale`), `draft: false`. Champ `updated` omis à la publication initiale.
- **D-07:** Ton éditorial : première personne, concret, technique mais accessible — cohérent avec la voix portfolio Killian (dev full-stack 7 ans, auto-entrepreneur, pas corporate).

### Liens internes article → /hytale
- **D-08:** Stratégie **inline dans la prose** uniquement (pas de composant CTA block). 1 à 2 liens markdown `[commissioner un plugin Hytale](/hytale)` ou équivalent locale-aware par article, anchor text naturel SEO-friendly. Le lien DOIT pointer vers `/hytale` en FR et `/en/hytale` en EN (respecter la strategy `prefix` i18n).
- **D-09:** Dans l'article EN, lien `/en/hytale` ; dans l'article FR, lien `/hytale` (le prefix par défaut FR est vide). Ne PAS utiliser `localePath()` côté markdown — écrire les paths en dur car `@nuxt/content` ne wrappe pas les liens markdown avec le router i18n (vérifier comportement `<NuxtLink>` auto-conversion dans ProseA — si comportement attendu, simplifier).

### Section "Articles récents" sur /hytale
- **D-10:** Composant `HytaleRecentArticles.vue` auto-importé, inséré dans `app/pages/hytale/index.vue` (ou chemin équivalent — à vérifier au planning). Section ajoutée en bas de page, avant le footer-CTA existant.
- **D-11:** Query : `queryCollection('blog_fr' | 'blog_en')` (branches littérales — Pitfall Phase 5 D-03) avec `.where('draft', '=', false)`, `.where('tags', 'LIKE', '%hytale%')` OU filtre JS post-query sur `article.tags?.includes('hytale')` si l'opérateur SQLite LIKE sur champ JSON n'est pas fiable — au planning de trancher. `.order('date', 'DESC')`. `.limit(2)`.
- **D-12:** Si moins de 2 articles tagués `hytale` existent → la section entière est masquée (`v-if="recent.length"`). Pas d'empty state — comportement "progressive enhancement" du cocon.
- **D-13:** Affichage : réutilise `BlogCard.vue` variant `compact` (créé Phase 6-02) en grid 2 colonnes desktop / 1 colonne mobile. Titre de section i18n-ready (`hytale.recentArticles.title` + `.subtitle` si besoin) — ajouter clés FR/EN.
- **D-14:** i18n keys à ajouter dans `app/locales/fr.json` + `en.json` : `hytale.recentArticles.title`, `hytale.recentArticles.subtitle` (optionnel), `hytale.recentArticles.viewAll` (lien "Voir tous les articles" → `/blog` / `/en/blog`).

### Tags taxonomy
- **D-15:** Les articles seed utilisent au minimum `['hytale']`. Tags secondaires libres (ex: `['hytale', 'tutorial', 'kotlin']` pour article 1, `['hytale', 'industry', 'analysis']` pour article 2). Pas de page `/blog/tags/[tag]` dans cette phase (backlog).

### Claude's Discretion
- Formulation exacte des titres finaux FR et EN (dérivés des slugs de travail D-01/D-02)
- Choix et placement précis des 1-2 liens `/hytale` inline dans chaque article (dépend du flow rédactionnel)
- Frontmatter `image:` optionnel par article — si un asset pertinent existe déjà dans `public/`, l'utiliser ; sinon laisser vide (fallback Phase 7 prend le relai)
- Choix entre filtre SQL `LIKE` vs filtre JS post-query pour le tag `hytale` (dépend du comportement runtime de `@nuxt/content` v3 sur les champs array — testable au planning)
- Copy exacte de la section "Articles récents" sur `/hytale` (titre + sous-titre)
</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Specs Phase 8 — sources internes
- `.planning/REQUIREMENTS.md` §BLOG-07, §SEO-14
- `.planning/ROADMAP.md` §"Phase 8: Content & Cocon Semantique" — 4 Success Criteria

### Décisions héritées
- `.planning/phases/05-nuxt-content-setup-renderer/05-CONTEXT.md` — schémas Zod blog_fr/blog_en, convention slugs bilingues identiques, Pitfall `queryCollection(variable)` vs littéraux
- `.planning/phases/06-blog-pages/06-CONTEXT.md` — BlogCard variants (default + compact), conventions listing
- `.planning/phases/06-blog-pages/06-02-SUMMARY.md` — BlogCard.vue (compact variant spec, slug derivation via `article.path.split`)
- `.planning/phases/07-seo-blog/07-CONTEXT.md` — frontmatter `image:` optional dans schema (D-14 Phase 7), og:image fallback stratégie

### Code existant
- `app/pages/hytale/index.vue` (ou chemin actuel de la page Hytale — à vérifier au planning) — y insérer le nouveau composant
- `app/components/BlogCard.vue` — variant `compact` réutilisable
- `app/pages/blog/index.vue` — pattern `queryCollection` page-level (non-event)
- `content.config.ts` — schema blog_fr/blog_en (pas d'extension requise Phase 8)
- `content/fr/blog/`, `content/en/blog/` — dossiers cibles pour les 2 nouveaux articles
- `app/locales/fr.json`, `app/locales/en.json` — i18n keys à étendre (section `hytale.recentArticles.*`)

### Docs externes
- `@nuxt/content` v3 queryCollection filter API (tags / array fields) : https://content.nuxt.com/docs/utils/query-collection
- Schema.org `BlogPosting` interlinking (hreflang déjà géré Phase 7)
</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `BlogCard.vue` variant `compact` — déjà spec'é Phase 6-02, auto-importé
- `queryCollection` avec littéraux (Pitfall Phase 5) — pattern éprouvé sur `app/pages/blog/index.vue`
- `useAsyncData({ watch: [locale] })` + key `hytale-recent-${locale.value}` — invalidation SSR/switch langue
- i18n keys déjà structurées par scope (`blog.*`, `hytale.*`, `nav.*`) — ajouter `hytale.recentArticles.*` cohérent

### Established Patterns
- Articles markdown dans `content/fr/blog/*.md` et `content/en/blog/*.md` — convention slug identique
- Frontmatter Zod validé (Phase 5 + Phase 7 D-14) — les champs supplémentaires non déclarés sont strippés
- Blocs code Kotlin rendus par Shiki single theme github-dark (Phase 5)
- Tag `hytale` n'existe pas encore dans le contenu réel (articles seed = première instance)

### Integration Points
- `app/pages/hytale/index.vue` : injecter `<HytaleRecentArticles />` (composant auto-importé) à la position décidée au planning (probablement avant la dernière section CTA)
- `content/fr/blog/how-to-build-your-first-hytale-plugin.md` + EN : nouveaux fichiers
- `content/fr/blog/hytale-plugin-development-2026.md` + EN : nouveaux fichiers
- `app/components/HytaleRecentArticles.vue` : nouveau composant
- `app/locales/fr.json` + `en.json` : ajouter clés `hytale.recentArticles.*`

### Sitemap / SEO (déjà géré Phase 7)
- Les 2 nouveaux articles apparaîtront automatiquement dans `/sitemap.xml` via l'endpoint `/api/__sitemap__/urls` avec alternates hreflang (confirmé Phase 7 D-11) — **aucune action spécifique requise**. Tester curl en verification.
- og:image fallback `/og-blog-default.jpg` s'appliquera automatiquement si frontmatter `image:` absent (Phase 7 D-05/D-06).
- JSON-LD Article auto-émis par `app/pages/blog/[slug].vue` (Phase 7 D-02).
</code_context>

<specifics>
## Specific Ideas

- Les articles seed sont la première démonstration publique de l'expertise Hytale de Killian — qualité éditoriale > quantité. Chaque article DOIT avoir au moins 1 bloc code Kotlin réaliste (pas pseudo-code).
- Success criteria ROADMAP §3 : "La page `/hytale` affiche une section Articles récents avec liens vers les 2 articles seed" — validation curl + DOM structuré.
- Success criteria ROADMAP §2 : "Chaque article blog contient au moins un lien interne vers `/hytale` dans le corps du texte" — grep `/hytale` dans le markdown final.
- Les articles doivent survivre au `pnpm typecheck` + SSR curl — un frontmatter cassé ou un bloc markdown mal formé sera rattrapé par le Zod schema.
</specifics>

<deferred>
## Deferred Ideas

- **Plus de 2 articles / backlog éditorial** — pipeline continu, pas une phase. Ajouter au backlog.
- **Page `/blog/tags/[tag]`** — intéressant pour le SEO long-tail mais pas nécessaire tant qu'on a <10 articles. Backlog.
- **CTA block `<HytaleCTA />`** (rejeté D-08) — reconsidérer si les analytics montrent que les liens inline ne convertissent pas.
- **RSS feed** — à envisager si audience organique > 500 sessions/mois sur `/blog`.
- **Articles avec images custom** — les 2 seeds shippent sans image dédiée (fallback og suffit). Design backlog.
- **Analytics / conversion tracking sur les liens inline** — hors scope SEO-14, relève d'une phase Analytics ultérieure.
</deferred>

---

*Phase: 08-content-cocon-semantique*
*Context gathered: 2026-04-22*
