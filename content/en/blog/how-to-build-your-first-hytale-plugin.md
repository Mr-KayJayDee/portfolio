---
title: "How to build your first Hytale plugin: a step-by-step guide"
description: "Learn to build your first Hytale plugin in Kotlin: project setup, event listener, custom command — with the complete source code."
date: "2026-04-22"
tags: ["hytale", "tutorial", "kotlin"]
draft: false
---

## Why Hytale, why now

The first time I booted a local Hytale server, I realized this platform was about to replay exactly what Minecraft did with Bukkit back in 2012 — except that in 2026, we start with Kotlin, a typed API, and an SDK designed from day one for plugin developers. Translation: wide-open window for anyone who wants to get in early.

In this guide, I'll walk you through building my first Hytale plugin — a minimal module that listens for a player joining and adds a `/hello` command. Nothing spectacular, but it's exactly the skeleton you need to iterate on more ambitious features. If you'd rather [commission a Hytale plugin](/en/hytale) instead of writing it yourself, that works too — but if you're here, you probably want to get your hands dirty.

::alert{type="info"}
**API note** — The API names referenced here are based on the public Hytale SDK 2026 documentation. They may evolve at official launch — adapt based on the most current docs at the time you're reading this.
::

## Prerequisites

Before cloning anything, make sure you have:

- **JDK 17+** (I recommend Temurin 21 — the Hytale 2026 SDK runs on it without issue)
- **IntelliJ IDEA Community Edition** — free, and the Gradle + Kotlin integration is excellent
- **Gradle 8.x** (IntelliJ bundles it, no need to install separately)
- Solid basics in **Kotlin**: classes, lambdas, annotations, nullability

I'm assuming you already have a local Hytale server that boots. If not, the official server docs are your starting point — this guide focuses on the plugin, not on hosting.

## Project scaffold

The minimal tree looks like this:

```
my-first-plugin/
├── build.gradle.kts
├── src/
│   └── main/
│       ├── kotlin/
│       │   └── com/example/myplugin/
│       │       └── MyPlugin.kt
│       └── resources/
│           └── plugin.toml
```

The minimal `build.gradle.kts` I use:

```kotlin
plugins {
    kotlin("jvm") version "2.0.0"
    id("com.github.johnrengelman.shadow") version "8.1.1"
}

repositories {
    mavenCentral()
    maven("https://repo.hytale.io/public")
}

dependencies {
    compileOnly("io.hytale:hytale-api:1.0.0")
}

tasks {
    build { dependsOn("shadowJar") }
}
```

The `plugin.toml` manifest declares your plugin to the server:

```toml
name = "MyPlugin"
version = "0.1.0"
main = "com.example.myplugin.MyPlugin"
authors = ["you"]
```

That's it. No boilerplate stands between you and the first useful line of code.

## First event listener — the heart of the plugin

Here's the main class. This is the file you'll spend the most time in during the first weeks, so treat it seriously:

```kotlin
package com.example.myplugin

import io.hytale.api.HytalePlugin
import io.hytale.api.event.EventHandler
import io.hytale.api.event.player.PlayerJoinEvent

class MyPlugin : HytalePlugin() {

    override fun onEnable() {
        logger.info("MyPlugin enabled")
        server.events.register(this)
    }

    override fun onDisable() {
        logger.info("MyPlugin disabled — cleaning up")
    }

    @EventHandler
    fun onPlayerJoin(event: PlayerJoinEvent) {
        val player = event.player
        player.sendMessage("Welcome to the server, ${player.name}!")
        logger.info("Player ${player.name} joined at ${event.timestamp}")
    }
}
```

Quick breakdown:

- `HytalePlugin` is the base class provided by the API. It exposes `logger`, `server`, and the lifecycle hooks (`onEnable` / `onDisable`).
- `server.events.register(this)` tells the server that this instance holds `@EventHandler` methods. Without that line, your listener will never fire — classic mistake I made the first time around.
- The `@EventHandler` annotation marks the method as an event target. The `PlayerJoinEvent` parameter type acts as a filter: only that event triggers the method.
- `event.player` exposes a `Player` object with `sendMessage`, `teleport`, `inventory`, and so on.

Compile, start the server, connect: you should see the welcome message in chat. If not, check the server logs — a `ClassNotFoundException` usually means the shadow jar isn't packed correctly.

## Adding a custom command

Listening to events is half the job. The other half is letting players interact with your plugin through commands. Add this method in the same class:

```kotlin
import io.hytale.api.command.Command
import io.hytale.api.command.CommandSender

@Command(name = "hello", description = "Says hello back")
fun onHelloCommand(sender: CommandSender, args: List<String>) {
    val target = args.firstOrNull() ?: sender.name
    sender.sendMessage("Hello, $target!")
}
```

You can now type `/hello` or `/hello Killian` in-game. The `@Command` annotation registers the command automatically — no need to list it in `plugin.toml`. If you want strict argument validation, `CommandSender` exposes `hasPermission(node)` to gate access.

## Build + local deploy

The loop I run 20 times a day:

```bash
./gradlew shadowJar
cp build/libs/my-first-plugin-all.jar ~/hytale-server/plugins/
# Then in the server console:
> reload MyPlugin
```

The `shadowJar` task packs all your runtime dependencies into a single `.jar`, which avoids classpath headaches. On more ambitious plugins — SQLite persistence, embedded REST API, Discord integrations — it quickly becomes essential. If that kind of scope resonates but you'd rather delegate the development side, you can always [commission a custom Hytale plugin](/en/hytale) from someone doing it day in, day out.

## Next steps

Once your first plugin is running, the natural paths forward are:

- Listen to more events: `BlockBreakEvent`, `PlayerChatEvent`, `EntityDamageEvent` — the full list lives in the `io.hytale.api.event` package.
- Persist data: start with a simple `JsonFile` in your plugin folder, switch to SQLite once you cross 50 KB of state.
- Add permissions: the Hytale API ships with a node system like `myplugin.admin.reload` that integrates with server groups.
- Profile your handlers: a slow event listener directly impacts the server's TPS. `logger.info` with timestamps is your first tool, then Flight Recorder when you get serious.

## Wrapping up

A Hytale plugin is essentially a Kotlin class that extends `HytalePlugin`, registers listeners, and exposes commands. Everything else — persistence, UI, integrations — builds on top of that 50-line foundation. If you've followed along this far, you already have the technical base to ship any idea you have in mind. Code an ugly first thing, get it running, iterate. That's always how it starts.
