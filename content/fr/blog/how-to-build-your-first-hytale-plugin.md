---
title: "Créer son premier plugin Hytale : guide pas à pas"
description: "Apprends à coder ton premier plugin Hytale en Java : setup IntelliJ + Gradle, manifest.json, event listener — avec le code source complet."
date: "2026-04-22"
tags: ["hytale", "tutorial", "java"]
draft: false
---

## Pourquoi Hytale, pourquoi maintenant

La première fois que j'ai branché un serveur Hytale en local, j'ai compris que cette plateforme allait rejouer exactement ce que Minecraft a fait avec Bukkit en 2012 — sauf qu'en 2026, on démarre avec Java 25, une API officielle fournie par Hypixel, et un template GitHub maintenu par la communauté HytaleModding. Autrement dit : fenêtre d'opportunité grande ouverte pour qui veut se positionner tôt, pendant l'early access.

Dans ce guide, je te montre comment j'ai construit mon premier plugin Hytale : un module minimal qui écoute l'arrivée d'un joueur et loggue l'événement. Rien de spectaculaire, mais c'est exactement le squelette dont tu as besoin pour itérer sur des features plus ambitieuses. Si tu préfères déléguer et faire [commissionner un plugin Hytale sur-mesure](/hytale) plutôt que de l'écrire toi-même, c'est aussi une option — mais si tu es là, tu as probablement envie de mettre les mains dedans.

::alert{type="info"}
**Note API** — Hytale est en early access en 2026. L'API plugin (package `com.hypixel.hytale.plugin`) est officiellement fournie par Hypixel, mais la doc officielle GitBook est encore en cours de rédaction. Les ressources communautaires de référence sont `hytalemodding.dev` et `britakee-studios.gitbook.io/hytale-modding-documentation`. Les noms d'events exacts peuvent évoluer — adapte selon la doc la plus récente au moment où tu lis ceci.
::

## Prérequis

Avant de cloner quoi que ce soit, assure-toi d'avoir :

- **JDK 25** — la version assumée par la doc plugin Hytale actuelle. Temurin fait très bien l'affaire.
- **IntelliJ IDEA Community Edition** — gratuit, c'est l'IDE recommandé par HytaleModding, et l'intégration Gradle + Java y est irréprochable
- **Gradle** (bundlé par IntelliJ, pas besoin d'install séparée)
- Des bases solides en **Java moderne** : classes, annotations, génériques, lambdas

Je pars du principe que tu as déjà un serveur Hytale local qui démarre. Si ce n'est pas le cas, le template plugin disponible sur `hytalemodding.dev` te pointe vers la bonne version serveur à utiliser — ce guide se concentre sur le plugin, pas sur l'hébergement.

## Scaffold du projet

Le plus simple est de partir du template officiel HytaleModding. L'arborescence minimale ressemble à ceci :

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

Le `settings.gradle` déclare simplement le nom du projet :

```groovy
rootProject.name = 'my-first-plugin'
```

Le `gradle.properties` fixe le group et la version :

```properties
group=com.example
version=1.0.0
```

Le fichier `manifest.json` — **c'est ce fichier qui remplace le `plugin.yml` du monde Bukkit** — déclare ton plugin au serveur Hytale. Il vit dans `src/main/resources/` et contient au minimum :

```json
{
  "Group": "com.example",
  "Name": "MyFirstPlugin",
  "Main": "com.example.myplugin.MyPlugin",
  "Version": "1.0.0",
  "Description": "Mon premier plugin Hytale",
  "Authors": ["toi"],
  "ServerVersion": "*"
}
```

Pas de boilerplate inutile. Le champ `Main` doit pointer vers la classe qui étend `JavaPlugin` — c'est littéralement la seule configuration obligatoire côté runtime.

## Premier event listener — le cœur du plugin

Voici la classe principale. Elle étend `JavaPlugin` du package officiel `com.hypixel.hytale.plugin`, avec la signature de constructeur **exactement** telle qu'exigée par l'API :

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

Décortique rapidement :

- `JavaPlugin` est la classe de base fournie par l'API Hypixel. Elle expose `getLogger()`, `getServer()`, et les hooks de cycle de vie (`onEnable` / `onDisable`).
- Le **constructeur avec `@Nonnull JavaPluginInit init`** est obligatoire — sans cette signature exacte, le plugin manager ne parvient pas à instancier ta classe au chargement. C'est l'erreur que j'ai faite la première fois : oublier le constructeur et passer 30 minutes à debugger un `NoSuchMethodException`.
- `getServer().getPluginManager().registerEvents(...)` enregistre un listener externe auprès du serveur. L'API est volontairement proche de Bukkit dans sa forme — les devs qui viennent de Spigot/Paper retrouvent leurs repères, même si le package et l'implémentation sont propres à Hypixel.

Le listener lui-même vit dans une classe séparée — plus propre et plus testable :

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
**Noms d'events approximatifs** — `PlayerJoinEvent` est un nom plausible et conforme au style Bukkit-like que la doc laisse entrevoir, mais tous les events exacts ne sont pas encore catalogués publiquement. Vérifie la classe exacte disponible dans ta version du SDK Hytale avant d'expédier en prod.
::

Compile, démarre le serveur, connecte-toi : tu devrais voir le message de bienvenue dans le chat. Si ce n'est pas le cas, vérifie les logs serveur — un `NoSuchMethodException` sur le constructeur est quasi certain si tu as oublié la signature `(@Nonnull JavaPluginInit init)`.

## Build + deploy local

Le cycle que je fais 20 fois par jour :

```bash
./gradlew build
cp build/libs/my-first-plugin-1.0.0.jar ~/hytale-server/plugins/
# Puis redémarre le serveur, ou utilise la commande de reload disponible
```

Le `.jar` généré par `./gradlew build` dans `build/libs/` est directement déposable dans le dossier `plugins/` de ton serveur Hytale. Le nom suit le pattern `{rootProject.name}-{version}.jar` défini dans tes fichiers Gradle. Si ton plugin grossit — persistance, intégrations externes, libs tierces — tu passeras sur un `shadowJar` pour embarquer les dépendances, mais pour un premier plugin la config de base suffit largement. Si ce genre de scope te parle mais que tu préfères déléguer la partie développement, tu peux toujours [commissionner un plugin Hytale sur-mesure](/hytale) auprès de quelqu'un qui fait ça au quotidien.

## Prochaines étapes

Une fois ton premier plugin qui tourne, les pistes naturelles sont :

- Écouter plus d'events — la liste exacte des classes d'events disponibles est à récupérer via l'auto-complétion IntelliJ sur le package `com.hypixel.hytale.plugin.event`.
- Persister de la donnée : commence avec un simple fichier JSON dans le dossier du plugin, passe à SQLite quand tu dépasses 50 Ko de state.
- Structurer ton code : un plugin qui grossit mérite une séparation claire listener / service / repository dès que tu passes les 300 lignes.
- Profiler tes handlers : un event listener lent impacte directement le TPS du serveur. `getLogger().info` avec timestamps est ton premier outil, puis Flight Recorder quand tu passes en prod.

## Pour aller plus loin

- [hytalemodding.dev](https://hytalemodding.dev) — template plugin et guides FR+EN
- [britakee-studios.gitbook.io/hytale-modding-documentation](https://britakee-studios.gitbook.io/hytale-modding-documentation) — GitBook communautaire, la source la plus à jour sur l'API

## Conclusion

Un plugin Hytale, c'est essentiellement une classe Java qui étend `JavaPlugin`, expose le bon constructeur, enregistre des listeners via le `PluginManager`, et se décrit dans un `manifest.json`. Tout le reste — persistance, intégrations, UI — se construit sur ce socle de 50 lignes. Si tu as suivi jusqu'ici, tu as déjà la base technique pour livrer n'importe quelle idée que tu as en tête pendant l'early access. Code un premier truc moche, fais-le tourner, itère. C'est toujours comme ça que ça commence.
