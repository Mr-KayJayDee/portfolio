---
plan: 01-01
phase: 01-cleanup-fixes
status: complete
completed: 2026-04-21
---

# Summary: Delete static sitemap, pin deps, fix data inconsistencies

## What was built

- Supprimé `public/sitemap.xml` — le sitemap dynamique `@nuxtjs/sitemap` est maintenant servi sans conflit
- Épinglé `"vue": "^3.5.0"` et `"vue-router": "^4.5.0"` dans `package.json` (suppression des `"latest"`)
- Corrigé les URLs Fiverr `url: '#'` → `https://www.fiverr.com/users/mr_kayjaydee` pour les services `telegram-bot` et `website-development`
- `reviewCount` cohérent avec `totalReviews` (tous les deux à 5)

## Key files

- `package.json` — versions épinglées
- `app/data/site.ts` — URLs Fiverr corrigées, reviewCount cohérent

## Self-Check: PASSED
