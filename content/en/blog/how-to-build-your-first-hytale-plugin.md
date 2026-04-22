---
title: "How to build your first Hytale plugin: a step-by-step guide"
description: "Learn to build your first Hytale plugin in Java: IntelliJ + Gradle setup, manifest.json, event listener — with the complete source code."
date: "2026-04-22"
tags: ["hytale", "tutorial", "java"]
draft: false
---

## Why Hytale, why now

The first time I booted a local Hytale server, I realized this platform was about to replay exactly what Minecraft did with Bukkit back in 2012 — except that in 2026, we start with Java 25, an official API shipped by Hypixel, and a GitHub plugin template maintained by the HytaleModding community. Translation: wide-open window for anyone who wants to get in early during the early-access phase.

In this guide, I'll walk you through building my first Hytale plugin — a minimal module that listens for a player joining and logs the event. Nothing spectacular, but it's exactly the skeleton you need to iterate on more ambitious features. If you'd rather [commission a Hytale plugin](/en/hytale) instead of writing it yourself, that works too — but if you're here, you probably want to get your hands dirty.

::alert{type="info"}
**API note** — Hytale is in early access in 2026. The plugin API (package `com.hypixel.hytale.plugin`) is officially provided by Hypixel, but the official GitBook documentation is still being written. The reference community resources are `hytalemodding.dev` and `britakee-studios.gitbook.io/hytale-modding-documentation`. Exact event class names may still evolve — double-check against the latest docs whenever you're reading this.
::

## Prerequisites

Before cloning anything, make sure you have:

- **JDK 25** — the version assumed by the current Hytale plugin docs. Temurin works great.
- **IntelliJ IDEA Community Edition** — free, it's the IDE recommended by HytaleModding, and its Gradle + Java integration is flawless
- **Gradle** (bundled with IntelliJ, no separate install needed)
- Solid basics in **modern Java**: classes, annotations, generics, lambdas

I'm assuming you already have a local Hytale server that boots. If not, the plugin template available on `hytalemodding.dev` points you to the right server version — this guide focuses on the plugin, not on hosting.

## Project scaffold

The easiest path is to start from the official HytaleModding template. The minimal tree looks like this:

```
my-first-plugin/
├── build.gradle
├── settings.gradle
├── gradle.properties
└── src/
    └── main/
        ├── java/
        │   └── com/example/myplugin/
        │       └── MyPlugin.java
        └── resources/
            └── manifest.json
```

The `settings.gradle` simply declares the project name:

```groovy
rootProject.name = 'my-first-plugin'
```

The `gradle.properties` sets the group and version:

```properties
group=com.example
version=1.0.0
```

The `manifest.json` file — **this is what replaces the `plugin.yml` from the Bukkit world** — declares your plugin to the Hytale server. It lives under `src/main/resources/` and minimally contains:

```json
{
  "Group": "com.example",
  "Name": "MyFirstPlugin",
  "Main": "com.example.myplugin.MyPlugin",
  "Version": "1.0.0",
  "Description": "My first Hytale plugin",
  "Authors": ["you"],
  "ServerVersion": "*"
}
```

No useless boilerplate. The `Main` field must point to the class that extends `JavaPlugin` — that's literally the only required runtime configuration.

## First event listener — the heart of the plugin

Here's the main class. It extends `JavaPlugin` from the official `com.hypixel.hytale.plugin` package, with the constructor signature **exactly** as required by the API:

```java
package com.example.myplugin;

import com.hypixel.hytale.plugin.JavaPlugin;
import com.hypixel.hytale.plugin.JavaPluginInit;
import jakarta.annotation.Nonnull;

public class MyPlugin extends JavaPlugin {

    public MyPlugin(@Nonnull JavaPluginInit init) {
        super(init);
    }

    @Override
    public void onEnable() {
        getLogger().info("MyPlugin enabled");
        getServer().getPluginManager().registerEvents(new JoinListener(), this);
    }

    @Override
    public void onDisable() {
        getLogger().info("MyPlugin disabled — cleaning up");
    }
}
```

Quick breakdown:

- `JavaPlugin` is the base class provided by the Hypixel API. It exposes `getLogger()`, `getServer()`, and the lifecycle hooks (`onEnable` / `onDisable`).
- The **constructor taking `@Nonnull JavaPluginInit init`** is mandatory — without that exact signature, the plugin manager cannot instantiate your class at load time. That's the mistake I made the first time around: forget the constructor, and spend 30 minutes debugging a `NoSuchMethodException`.
- `getServer().getPluginManager().registerEvents(...)` registers an external listener with the server. The API shape is deliberately close to Bukkit — devs coming from Spigot/Paper feel right at home, even though the package and implementation are Hypixel's own.

The listener itself lives in its own class — cleaner and more testable:

```java
package com.example.myplugin;

import com.hypixel.hytale.plugin.event.EventHandler;
import com.hypixel.hytale.plugin.event.Listener;
import com.hypixel.hytale.plugin.event.player.PlayerJoinEvent;

public class JoinListener implements Listener {

    @EventHandler
    public void onPlayerJoin(PlayerJoinEvent event) {
        var player = event.getPlayer();
        player.sendMessage("Welcome to the server, " + player.getName() + "!");
    }
}
```

::alert{type="warning"}
**Approximate event names** — `PlayerJoinEvent` is a plausible name that follows the Bukkit-like style the docs hint at, but not every exact event class is publicly catalogued yet. Verify the actual class available in your Hytale SDK version before shipping to production.
::

Compile, start the server, connect: you should see the welcome message in chat. If not, check the server logs — a `NoSuchMethodException` on the constructor almost always means you forgot the `(@Nonnull JavaPluginInit init)` signature.

## Build + local deploy

The loop I run 20 times a day:

```bash
./gradlew build
cp build/libs/my-first-plugin-1.0.0.jar ~/hytale-server/plugins/
# Then restart the server, or use the reload command if available
```

The `.jar` produced by `./gradlew build` under `build/libs/` drops directly into your Hytale server's `plugins/` folder. The name follows the `{rootProject.name}-{version}.jar` pattern defined in your Gradle files. Once the plugin grows — persistence, external integrations, third-party libs — you'll switch to a `shadowJar` to bundle dependencies, but for a first plugin the base config is plenty. If that kind of scope resonates but you'd rather delegate the development side, you can always [commission a custom Hytale plugin](/en/hytale) from someone doing it day in, day out.

## Next steps

Once your first plugin is running, the natural paths forward are:

- Listen to more events — the exact list of available event classes is easiest to discover through IntelliJ autocomplete on the `com.hypixel.hytale.plugin.event` package.
- Persist data: start with a simple JSON file in your plugin folder, switch to SQLite once you cross 50 KB of state.
- Structure your code: a growing plugin deserves a clean listener / service / repository separation the moment you cross 300 lines.
- Profile your handlers: a slow event listener directly impacts the server's TPS. `getLogger().info` with timestamps is your first tool, then Flight Recorder when you go to production.

## Further reading

- [hytalemodding.dev](https://hytalemodding.dev) — plugin template and FR+EN guides
- [britakee-studios.gitbook.io/hytale-modding-documentation](https://britakee-studios.gitbook.io/hytale-modding-documentation) — community GitBook, the most up-to-date source on the API

## Wrapping up

A Hytale plugin is essentially a Java class that extends `JavaPlugin`, exposes the right constructor, registers listeners via the `PluginManager`, and describes itself in a `manifest.json`. Everything else — persistence, integrations, UI — builds on top of that 50-line foundation. If you've followed along this far, you already have the technical base to ship any idea you have in mind during this early-access window. Code an ugly first thing, get it running, iterate. That's always how it starts.
