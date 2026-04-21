---
title: "Guide du format Markdown"
description: "Référence complète de tous les éléments et composants disponibles dans les articles"
date: "2026-04-21"
tags: ["guide", "markdown", "mdc"]
---

## Typographie de base

Paragraphe normal avec du **gras**, de l'*italique*, du ~~barré~~ et du `code inline`.

Lien simple : [killiandalcin.fr](https://killiandalcin.fr)

Citation :

> Les meilleurs plugins Hytale naissent d'une obsession pour les détails.

---

## Blocs de code

Bloc Kotlin avec coloration syntaxique :

```kotlin
fun createPlugin(name: String): HytalePlugin {
    return HytalePlugin.builder()
        .name(name)
        .version("1.0.0")
        .onLoad { println("Plugin $name loaded!") }
        .build()
}
```

TypeScript :

```typescript
interface PluginConfig {
  name: string
  version: `${number}.${number}.${number}`
  enabled: boolean
}

const config: PluginConfig = {
  name: 'hytale-core',
  version: '1.0.0',
  enabled: true,
}
```

Shell :

```bash
pnpm install @hytale/sdk
pnpm run build
docker build -t portfolio:latest .
```

---

## Images

**Pleine largeur (défaut) :**

![Logo pleine largeur](/images/logo.webp)

**Centrée avec taille fixe et légende :**

![Logo centré](/images/logo.webp){align="center" width="120" caption="Logo Killian' DAL-CIN"}

**Flottant à gauche :**

![Logo gauche](/images/logo.webp){align="left" caption="Float left"}

Texte qui entoure l'image flottante. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.

<div style="clear:both"></div>

**Flottant à droite :**

![Logo droite](/images/logo.webp){align="right" caption="Float right"}

Texte qui entoure l'image flottante à droite. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.

<div style="clear:both"></div>

**Classes Tailwind directes :**

![Logo petit centré](/images/logo.webp){.w-16 .mx-auto .block}

---

## Tableaux

| Composant | Syntaxe | Usage |
|-----------|---------|-------|
| Alert | `::alert{type="info"}` | Callouts colorés |
| Image | `![alt](src){align="left"}` | Photos flottantes |
| Columns | `::columns{cols=2}` | Mise en page |
| Details | `::details{summary="Voir"}` | Contenu repliable |
| Video | `::video{src="..."}` | Embed YouTube/local |
| Badge | `:badge[text]{color="blue"}` | Tags inline |

---

## Callouts

::alert{type="info"}
**Info** — Message informatif. Supporte le **gras** et le `code inline`.
::

::alert{type="warning"}
**Attention** — Vérifiez la compatibilité Nuxt 4 avant d'installer un module.
::

::alert{type="tip"}
**Astuce** — Utilisez `pnpm` plutôt que `npm` pour les projets Nuxt (résolution plus rapide).
::

::alert{type="danger"}
**Danger** — Ne jamais committer de clés API ou secrets en clair.
::

---

## Colonnes

::columns{cols=2}
  ::div
  **Colonne 1**

  Contenu de la première colonne. Idéal pour comparer deux approches, montrer avant/après, ou lister des avantages et inconvénients.
  ::

  ::div
  **Colonne 2**

  Contenu de la seconde colonne. Les colonnes passent en empilé sur mobile automatiquement.
  ::
::

::columns{cols=3 gap="lg"}
  ::div
  🚀 **Rapide**

  Nuxt SSR génère le HTML côté serveur.
  ::

  ::div
  🔍 **SEO**

  Chaque page est crawlable sans JavaScript.
  ::

  ::div
  🎨 **Flexible**

  Tailwind + Nuxt UI pour tout styliser.
  ::
::

---

## Contenu repliable

::details{summary="Voir l'implémentation complète du plugin"}
```kotlin
class HytalePlugin(
    val name: String,
    val version: String,
    private val onLoad: () -> Unit,
) {
    fun load() {
        println("Loading plugin: $name v$version")
        onLoad()
    }

    companion object {
        fun builder() = Builder()
    }

    class Builder {
        private var name = ""
        private var version = "0.0.1"
        private var onLoad: () -> Unit = {}

        fun name(n: String) = apply { name = n }
        fun version(v: String) = apply { version = v }
        fun onLoad(fn: () -> Unit) = apply { onLoad = fn }
        fun build() = HytalePlugin(name, version, onLoad)
    }
}
```
::

::details{summary="Pourquoi utiliser @nuxt/content ?" open=true}
`@nuxt/content` transforme des fichiers Markdown en pages SSR crawlables. Avantages :

- **Zéro CMS** — les articles sont dans le repo Git
- **Typé** — schema Zod sur chaque collection
- **MDC** — composants Vue dans le Markdown
::

---

## Badges inline

Versions : :badge[v1.0]{color="green"} :badge[v0.9 LTS]{color="blue"} :badge[deprecated]{color="red"}

Statuts : :badge[stable]{color="green"} :badge[beta]{color="yellow"} :badge[wip]{color="orange"}

Technologies : :badge[Kotlin]{color="purple"} :badge[Nuxt 4]{color="green"} :badge[TypeScript]{color="blue"}

---

## Vidéo

**YouTube :**

::video{src="https://www.youtube.com/watch?v=dQw4w9WgXcQ" title="Exemple d'embed YouTube"}
::

---

## Listes

Liste non ordonnée :

- Premier point
- Deuxième point avec `code`
- Troisième point avec **gras**
  - Sous-point imbriqué
  - Autre sous-point

Liste ordonnée :

1. Installer les dépendances : `pnpm install`
2. Lancer le dev server : `pnpm dev`
3. Builder pour la prod : `pnpm build`
