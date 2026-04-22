---
title: "Créer son premier plugin Hytale : guide pas à pas"
description: "Apprends à coder ton premier plugin Hytale en Kotlin : setup, event listener, et commande custom — avec le code source complet."
date: "2026-04-22"
tags: ["hytale", "tutorial", "kotlin"]
draft: false
---

## Pourquoi Hytale, pourquoi maintenant

La première fois que j'ai branché un serveur Hytale en local, j'ai compris que cette plateforme allait rejouer exactement ce que Minecraft a fait avec Bukkit en 2012 — sauf qu'en 2026, on démarre avec Kotlin, une API typée, et un SDK pensé dès le jour 1 pour les développeurs de plugins. Autrement dit : fenêtre d'opportunité grande ouverte pour qui veut se positionner tôt.

Dans ce guide, je te montre comment j'ai construit mon premier plugin Hytale : un module minimal qui écoute l'arrivée d'un joueur et ajoute une commande `/hello`. Rien de spectaculaire, mais c'est exactement le squelette dont tu as besoin pour itérer sur des features plus ambitieuses. Si tu préfères déléguer et faire [commissionner un plugin Hytale sur-mesure](/hytale) plutôt que de l'écrire toi-même, c'est aussi une option — mais si tu es là, tu as probablement envie de mettre les mains dedans.

::alert{type="info"}
**Note API** — Les noms d'API cités ici sont basés sur la documentation publique du SDK Hytale 2026. Ils peuvent évoluer au lancement officiel — adapte selon la doc la plus récente au moment où tu lis ceci.
::

## Prérequis

Avant de cloner quoi que ce soit, assure-toi d'avoir :

- **JDK 17+** (je recommande Temurin 21 — le SDK Hytale 2026 tourne dessus sans broncher)
- **IntelliJ IDEA Community Edition** — gratuit, et l'intégration Gradle + Kotlin y est excellente
- **Gradle 8.x** (IntelliJ le bundle, pas besoin de l'installer séparément)
- Des bases solides en **Kotlin** : classes, lambdas, annotations, nullabilité

Je pars du principe que tu as déjà un serveur Hytale local qui démarre. Si ce n'est pas le cas, la doc officielle du serveur est ton point de départ — ce guide se concentre sur le plugin, pas sur l'hébergement.

## Scaffold du projet

L'arborescence minimale ressemble à ceci :

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

Le fichier `build.gradle.kts` minimal que j'utilise :

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

Le manifest `plugin.toml` déclare ton plugin au serveur :

```toml
name = "MyPlugin"
version = "0.1.0"
main = "com.example.myplugin.MyPlugin"
authors = ["toi"]
```

C'est tout. Aucun boilerplate ne t'attend avant de pouvoir écrire la première ligne utile.

## Premier event listener — le cœur du plugin

Voici la classe principale. C'est le fichier sur lequel tu vas passer le plus de temps dans les premières semaines, donc prends-le au sérieux :

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

Décortique rapidement :

- `HytalePlugin` est la classe de base fournie par l'API. Elle expose `logger`, `server`, et les hooks de cycle de vie (`onEnable` / `onDisable`).
- `server.events.register(this)` indique au serveur que cette instance contient des méthodes `@EventHandler`. Sans cette ligne, ton listener ne sera jamais appelé — erreur classique que j'ai faite la première fois.
- L'annotation `@EventHandler` marque la méthode comme cible d'un event. Le type `PlayerJoinEvent` en paramètre fait office de filtre : seul cet event déclenche la méthode.
- `event.player` expose un objet `Player` avec `sendMessage`, `teleport`, `inventory`, etc.

Compile, démarre le serveur, connecte-toi : tu devrais voir le message de bienvenue dans le chat. Si ce n'est pas le cas, vérifie les logs serveur — une `ClassNotFoundException` est généralement un souci de shadow jar mal configuré.

## Ajouter une commande custom

Écouter des events, c'est la moitié du job. L'autre moitié, c'est de laisser les joueurs interagir avec ton plugin via des commandes. Ajoute cette méthode dans la même classe :

```kotlin
import io.hytale.api.command.Command
import io.hytale.api.command.CommandSender

@Command(name = "hello", description = "Says hello back")
fun onHelloCommand(sender: CommandSender, args: List<String>) {
    val target = args.firstOrNull() ?: sender.name
    sender.sendMessage("Hello, $target!")
}
```

Tu peux maintenant taper `/hello` ou `/hello Killian` en jeu. L'annotation `@Command` enregistre la commande automatiquement — pas besoin de l'inscrire dans `plugin.toml`. Si tu veux de la validation stricte sur les arguments, `CommandSender` expose `hasPermission(node)` pour restreindre l'accès.

## Build + deploy local

Le cycle que je fais 20 fois par jour :

```bash
./gradlew shadowJar
cp build/libs/my-first-plugin-all.jar ~/hytale-server/plugins/
# Puis dans la console serveur :
> reload MyPlugin
```

Le flag `shadowJar` empaquette toutes tes dépendances runtime dans un seul `.jar`, ce qui évite les galères de classpath. Sur des plugins plus ambitieux — persistance SQLite, API REST embarquée, intégrations Discord — c'est vite indispensable. Si ce genre de scope te parle mais que tu préfères déléguer la partie développement, tu peux toujours [commissionner un plugin Hytale sur-mesure](/hytale) auprès de quelqu'un qui fait ça au quotidien.

## Prochaines étapes

Une fois ton premier plugin qui tourne, les pistes naturelles sont :

- Écouter plus d'events : `BlockBreakEvent`, `PlayerChatEvent`, `EntityDamageEvent` — la liste complète est dans le package `io.hytale.api.event`.
- Persister de la donnée : commence avec un simple `JsonFile` dans le dossier plugin, passe à SQLite quand tu dépasses 50 Ko de state.
- Ajouter des permissions : l'API Hytale embarque un système de nodes type `myplugin.admin.reload` qui s'intègre avec les groupes serveur.
- Profiler tes handlers : un event listener lent impacte directement le TPS du serveur. `logger.info` avec timestamps est ton premier outil, puis Flight Recorder pour le sérieux.

## Conclusion

Un plugin Hytale, c'est essentiellement une classe Kotlin qui hérite de `HytalePlugin`, enregistre des listeners, et expose des commandes. Tout le reste — persistance, UI, intégrations — se construit sur ce socle de 50 lignes. Si tu as suivi jusqu'ici, tu as déjà la base technique pour livrer n'importe quelle idée que tu as en tête. Code un premier truc moche, fais-le tourner, itère. C'est toujours comme ça que ça commence.
