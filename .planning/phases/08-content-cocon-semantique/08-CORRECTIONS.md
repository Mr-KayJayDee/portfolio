# Phase 08 — Corrections API Hytale

**Date :** 2026-04-22
**Auteur :** Killian' Dalcin

## Contexte

Les plans 08-02 et 08-03 ont livré les articles blog « Créer son premier plugin Hytale » et « Développement de plugins Hytale en 2026 » rédigés en prenant **Kotlin** comme langage cible, avec une API imaginaire (`HytalePlugin` base class, annotations `@EventHandler` côté SDK `io.hytale.api.*`, manifest `plugin.toml`, etc.).

Après fetch des sources communautaires officielles le 2026-04-22, cette hypothèse s'est révélée **incorrecte**. Le stack réel Hytale plugin est en Java.

## Correction appliquée

Les quatre articles ont été réécrits pour refléter l'API réelle :

| Fichier | Commit |
|---|---|
| `content/fr/blog/how-to-build-your-first-hytale-plugin.md` | `301ab48` |
| `content/en/blog/how-to-build-your-first-hytale-plugin.md` | `be613f8` |
| `content/fr/blog/hytale-plugin-development-2026.md` | `a61596a` |
| `content/en/blog/hytale-plugin-development-2026.md` | `bc1c451` |

## Stack réel Hytale (vérifié 2026-04-22)

- **Langage :** Java (JDK 25)
- **IDE :** IntelliJ IDEA Community Edition
- **Build :** Gradle (`settings.gradle`, `gradle.properties`, `build.gradle`)
- **Classe de base :** `JavaPlugin` (package `com.hypixel.hytale.plugin`)
- **Constructeur obligatoire :** `public YourPlugin(@Nonnull JavaPluginInit init) { super(init); }`
- **Lifecycle :** `@Override public void onEnable()` / `@Override public void onDisable()`
- **Logger :** `getLogger().info(...)`
- **Enregistrement de listeners :** `getServer().getPluginManager().registerEvents(new MyListener(), this);` (API Bukkit-like dans sa forme, mais implémentation Hypixel native)
- **Manifest :** `src/main/resources/manifest.json` (pas `plugin.yml`), champs capitalisés : `Group`, `Name`, `Main`, `Version`, `Description`, `Authors`, `ServerVersion`
- **Statut 2026 :** early access (pas « au lancement ») — API plugin officiellement fournie, doc officielle GitBook en cours de rédaction

## Sources consultées

- [hytalemodding.dev](https://hytalemodding.dev) — template plugin + guides FR+EN
- [britakee-studios.gitbook.io/hytale-modding-documentation](https://britakee-studios.gitbook.io/hytale-modding-documentation) — GitBook communautaire, doc la plus à jour

## Ajustements de ton

- Tout le vocabulaire « when Hytale launches » a été remplacé par « while Hytale is in early access ».
- Les affirmations Bukkit/Spigot directes ont été relativisées : l'API **ressemble** à Bukkit dans sa forme (bon onboarding pour devs Paper) mais **n'est pas** Bukkit — package et implémentation Hypixel natifs.
- Un avertissement explicite sur le caractère approximatif des noms d'events exacts a été conservé (alert `warning` + mention `britakee-studios` GitBook comme source à jour).

## Vérification

- `pnpm typecheck` : ✅ passe, schéma Zod du content collection respecté
- Frontmatter `draft: false` : ✅ préservé pour les 4 articles
- Slugs : ✅ inchangés
- Dates : ✅ inchangées (`2026-04-22` pour article 1, `2026-04-21` pour article 2)
- Word counts : FR1 1209, EN1 1123, FR2 1468, EN2 1335 — tous dans la fenêtre 1000-1500 (EN2 légèrement au-dessus, acceptable)
- Liens `/hytale` et `/en/hytale` : ✅ 2 par article

## Leçon pour la suite

Avant tout article technique portant sur un écosystème externe (Hytale, Hypixel, autre), **fetch au moins une source officielle ou communautaire de référence** avant rédaction. Les plans 08-02 et 08-03 ont été rédigés sur une hypothèse langue (Kotlin) issue de ce qui « semblait plausible » en 2026 — le coût de la correction (4 réécritures) aurait été évitable avec un fetch de 5 minutes au planning.
