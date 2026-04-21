<script setup lang="ts">
import { siteConfig } from '~/data/site'

const { t } = useI18n()
const localePath = useLocalePath()

const discordUrl = siteConfig.social.find(s => s.name === 'Discord')?.url ?? '#'
</script>

<template>
  <section class="relative min-h-[80vh] flex items-center overflow-hidden bg-white dark:bg-gray-950">
    <!-- Dot grid background pattern -->
    <div class="absolute inset-0 opacity-[0.03] dark:opacity-[0.06]" aria-hidden="true">
      <div
class="absolute inset-0"
        style="background-image: radial-gradient(circle, currentColor 1px, transparent 1px); background-size: 32px 32px;" />
    </div>

    <!-- Gradient glow -->
    <div
      class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-brand-500/5 dark:bg-brand-500/10 rounded-full blur-3xl pointer-events-none"
      aria-hidden="true" />

    <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-16 md:py-24">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        <!-- Left: Content -->
        <div class="space-y-8">
          <!-- Status badge -->
          <div
            class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-500/10 dark:bg-brand-500/15 border border-brand-500/20">
            <span class="relative flex h-2 w-2">
              <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-400 opacity-75" />
              <span class="relative inline-flex rounded-full h-2 w-2 bg-brand-500" />
            </span>
            <span class="text-sm font-medium text-brand-700 dark:text-brand-400">{{ t('home.badge.available') }}</span>
          </div>

          <div class="space-y-4">
            <h1 class="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.1]">
              <span
                class="bg-gradient-to-r from-brand-500 via-brand-400 to-emerald-400 bg-clip-text text-transparent">{{
                  t('home.title') }}</span>
            </h1>
            <p class="text-lg sm:text-xl text-gray-600 dark:text-gray-400 max-w-xl leading-relaxed">
              {{ t('home.subtitle') }}
            </p>
          </div>

          <!-- CTA Buttons -->
          <div class="flex flex-col sm:flex-row gap-3">
            <UButton
              :to="discordUrl"
              target="_blank"
              rel="noopener"
              color="primary"
              icon="i-simple-icons-discord"
              size="lg"
            >
              {{ t('home.cta.discord') }}
            </UButton>
            <UButton
              :to="localePath('/contact')"
              variant="outline"
              size="lg"
            >
              {{ t('home.cta.contact') }}
            </UButton>
          </div>
        </div>

        <!-- Right: Decorative terminal/code block -->
        <div class="hidden lg:block" aria-hidden="true">
          <div class="relative">
            <!-- Terminal window -->
            <div
              class="rounded-2xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 shadow-2xl shadow-brand-500/5 overflow-hidden">
              <!-- Title bar -->
              <div
                class="flex items-center gap-2 px-4 py-3 bg-gray-100 dark:bg-gray-800/80 border-b border-gray-200 dark:border-gray-700/50">
                <div class="flex gap-1.5">
                  <div class="w-3 h-3 rounded-full bg-red-400/80" />
                  <div class="w-3 h-3 rounded-full bg-yellow-400/80" />
                  <div class="w-3 h-3 rounded-full bg-green-400/80" />
                </div>
                <span class="text-xs text-gray-400 dark:text-gray-500 ml-2 font-mono">killian@dev ~</span>
              </div>

              <!-- Code content -->
              <div class="p-5 font-mono text-sm leading-7 space-y-1">
                <div>
                  <span class="text-brand-500">const</span>
                  <span class="text-gray-900 dark:text-white"> developer</span>
                  <span class="text-gray-500"> = </span>
                  <span class="text-gray-500">{</span>
                </div>
                <div class="pl-6">
                  <span class="text-purple-500 dark:text-purple-400">name</span><span class="text-gray-500">: </span>
                  <span class="text-amber-600 dark:text-amber-400">'Killian\' DAL-CIN'</span><span
                    class="text-gray-500">,</span>
                </div>
                <div class="pl-6">
                  <span class="text-purple-500 dark:text-purple-400">role</span><span class="text-gray-500">: </span>
                  <span class="text-amber-600 dark:text-amber-400">'{{ t('home.terminal.role') }}'</span><span
                    class="text-gray-500">,</span>
                </div>
                <div class="pl-6">
                  <span class="text-purple-500 dark:text-purple-400">skills</span><span class="text-gray-500">: [</span>
                </div>
                <div class="pl-10">
                  <span class="text-amber-600 dark:text-amber-400">'Vue.js'</span><span class="text-gray-500">, </span>
                  <span class="text-amber-600 dark:text-amber-400">'Nuxt'</span><span class="text-gray-500">, </span>
                  <span class="text-amber-600 dark:text-amber-400">'Node.js'</span><span class="text-gray-500">,</span>
                </div>
                <div class="pl-10">
                  <span class="text-amber-600 dark:text-amber-400">'Java'</span><span class="text-gray-500">, </span>
                  <span class="text-amber-600 dark:text-amber-400">'Hytale Plugins'</span><span
                    class="text-gray-500">,</span>
                </div>
                <div class="pl-10">
                  <span class="text-amber-600 dark:text-amber-400">'Docker'</span><span class="text-gray-500">, </span>
                  <span class="text-amber-600 dark:text-amber-400">'TypeScript'</span>
                </div>
                <div class="pl-6">
                  <span class="text-gray-500">],</span>
                </div>
                <div class="pl-6">
                  <span class="text-purple-500 dark:text-purple-400">available</span><span class="text-gray-500">:
                  </span>
                  <span class="text-brand-500">true</span>
                </div>
                <div>
                  <span class="text-gray-500">}</span>
                </div>
                <!-- Blinking cursor -->
                <div class="mt-2 flex items-center gap-1">
                  <span class="text-brand-500">$</span>
                  <span class="w-2.5 h-5 bg-brand-500 animate-pulse" />
                </div>
              </div>
            </div>

            <!-- Floating decoration cards -->
            <div
              class="absolute -top-4 -right-4 px-3 py-2 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-lg text-xs font-medium flex items-center gap-2">
              <span class="w-2 h-2 rounded-full bg-brand-500" />
              <span class="text-gray-700 dark:text-gray-300">{{ t('home.stats.projects') }}</span>
            </div>
            <div
              class="absolute -bottom-3 -left-3 px-3 py-2 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-lg text-xs font-medium flex items-center gap-2">
              <UIcon name="i-lucide-star" class="text-yellow-400 w-3.5 h-3.5" />
              <span class="text-gray-700 dark:text-gray-300">{{ t('home.stats.rating') }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
