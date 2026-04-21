---
title: "Test Kotlin Syntax Highlighting"
description: "Test article to validate the @nuxt/content renderer"
date: "2026-04-21"
tags: ["kotlin", "hytale", "test"]
---

## Kotlin Code Block

```kotlin
fun main() {
    println("Hello, Hytale!")
}

fun createPlugin(name: String): Plugin {
    return Plugin(name = name, version = "1.0.0")
}
```

## Optimized Image

![Test image for NuxtImg in articles](/images/og-image.png)

## Table

| Feature | Status | Notes |
|---------|--------|-------|
| Syntax highlighting | ✅ Active | Kotlin, Java, TypeScript, Shell |
| Optimized images | ✅ Active | Via NuxtImg (lazy + srcset) |
| Tables | ✅ Active | Prose rendering |
| Callouts | ✅ Active | MDC ::alert{type} |

## Callouts

::alert{type="info"}
This is an information callout.
::

::alert{type="warning"}
This is a warning.
::

::alert{type="tip"}
Practical Kotlin development tip.
::

::alert{type="danger"}
Critical error — do not ignore.
::
