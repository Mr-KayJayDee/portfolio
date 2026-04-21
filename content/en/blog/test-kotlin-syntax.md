---
title: "Markdown Format Guide"
description: "Complete reference of all elements and components available in articles"
date: "2026-04-21"
tags: ["guide", "markdown", "mdc"]
---

## Basic Typography

Normal paragraph with **bold**, *italic*, ~~strikethrough~~ and `inline code`.

Simple link: [killiandalcin.fr](https://killiandalcin.fr)

Blockquote:

> The best Hytale plugins are born from an obsession with details.

---

## Code Blocks

Kotlin block with syntax highlighting:

```kotlin
fun createPlugin(name: String): HytalePlugin {
    return HytalePlugin.builder()
        .name(name)
        .version("1.0.0")
        .onLoad { println("Plugin $name loaded!") }
        .build()
}
```

TypeScript:

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

Shell:

```bash
pnpm install @hytale/sdk
pnpm run build
docker build -t portfolio:latest .
```

---

## Images

**Full width (default):**

![Full width logo](/images/logo.webp)

**Centered with fixed size and caption:**

![Centered logo](/images/logo.webp){align="center" width="120" caption="Killian' DAL-CIN Logo"}

**Floating left:**

![Left logo](/images/logo.webp){align="left" caption="Float left"}

Text wrapping around the floating image. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.

::clear
::

**Floating right:**

![Right logo](/images/logo.webp){align="right" caption="Float right"}

Text wrapping around the right-floating image. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.

::clear
::

**Direct Tailwind classes:**

![Small centered logo](/images/logo.webp){.w-16 .mx-auto .block}

---

## Tables

| Component | Syntax | Usage |
|-----------|--------|-------|
| Alert | `::alert{type="info"}` | Colored callouts |
| Image | `![alt](src){align="left"}` | Floating photos |
| Columns | `::columns{cols=2}` | Page layout |
| Details | `::details{summary="View"}` | Collapsible content |
| Video | `::video{src="..."}` | YouTube/local embed |
| Badge | `:badge[text]{color="blue"}` | Inline tags |

---

## Callouts

::alert{type="info"}
**Info** — Informational message. Supports **bold** and `inline code`.
::

::alert{type="warning"}
**Warning** — Check Nuxt 4 compatibility before installing a module.
::

::alert{type="tip"}
**Tip** — Use `pnpm` instead of `npm` for Nuxt projects (faster resolution).
::

::alert{type="danger"}
**Danger** — Never commit API keys or secrets in plain text.
::

---

## Columns

::columns{cols=2}
  ::div
  **Column 1**

  Content of the first column. Ideal for comparing two approaches, showing before/after, or listing pros and cons.
  ::

  ::div
  **Column 2**

  Content of the second column. Columns automatically stack on mobile.
  ::
::

::columns{cols=3 gap="lg"}
  ::div
  🚀 **Fast**

  Nuxt SSR generates HTML server-side.
  ::

  ::div
  🔍 **SEO**

  Every page is crawlable without JavaScript.
  ::

  ::div
  🎨 **Flexible**

  Tailwind + Nuxt UI for all your styling needs.
  ::
::

---

## Collapsible Content

::details{summary="View full plugin implementation"}
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

::details{summary="Why use @nuxt/content?" open=true}
`@nuxt/content` transforms Markdown files into crawlable SSR pages. Benefits:

- **Zero CMS** — articles live in the Git repo
- **Typed** — Zod schema on every collection
- **MDC** — Vue components inside Markdown
::

---

## Inline Badges

Versions: :badge[v1.0]{color="green"} :badge[v0.9 LTS]{color="blue"} :badge[deprecated]{color="red"}

Status: :badge[stable]{color="green"} :badge[beta]{color="yellow"} :badge[wip]{color="orange"}

Technologies: :badge[Kotlin]{color="purple"} :badge[Nuxt 4]{color="green"} :badge[TypeScript]{color="blue"}

---

## Video

**YouTube:**

::video{src="https://www.youtube.com/watch?v=dQw4w9WgXcQ" title="YouTube embed example"}
::

---

## Lists

Unordered list:

- First item
- Second item with `code`
- Third item with **bold**
  - Nested sub-item
  - Another sub-item

Ordered list:

1. Install dependencies: `pnpm install`
2. Start the dev server: `pnpm dev`
3. Build for production: `pnpm build`
