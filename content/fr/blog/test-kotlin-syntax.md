---
title: "Test Kotlin Syntax Highlighting"
description: "Article de test pour valider le renderer @nuxt/content"
date: "2026-04-21"
tags: ["kotlin", "hytale", "test"]
---

## Bloc de code Kotlin

```kotlin
fun main() {
    println("Hello, Hytale!")
}

fun createPlugin(name: String): Plugin {
    return Plugin(name = name, version = "1.0.0")
}
```

## Image optimisée

![Image de test pour NuxtImg dans les articles](/og-image.png)

## Tableau

| Fonctionnalité | Statut | Notes |
|----------------|--------|-------|
| Syntax highlighting | ✅ Actif | Kotlin, Java, TypeScript, Shell |
| Images optimisées | ✅ Actif | Via NuxtImg (lazy + srcset) |
| Tableaux | ✅ Actif | Rendu prose |
| Callouts | ✅ Actif | MDC ::alert{type} |

## Callouts

::alert{type="info"}
Ceci est un callout d'information.
::

::alert{type="warning"}
Ceci est un avertissement.
::

::alert{type="tip"}
Conseil pratique de développement Kotlin.
::

::alert{type="danger"}
Erreur critique — à ne pas ignorer.
::
