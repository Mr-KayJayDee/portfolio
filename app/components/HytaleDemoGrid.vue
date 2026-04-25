<script setup lang="ts">
import { hytaleDemos } from '~/data/hytaleDemos'

const { t } = useI18n()
</script>

<template>
  <section
    id="demos"
    class="py-16 md:py-24 px-4 sm:px-6 lg:px-8"
  >
    <div class="max-w-7xl mx-auto">
      <div class="text-center mb-12">
        <span class="font-mono text-sm text-brand-500 dark:text-brand-400 tracking-wider">
          {{ t('hytale.demos.label') }}
        </span>
        <h2
          class="text-3xl sm:text-4xl lg:text-5xl font-bold mt-3 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-600 dark:from-white dark:via-gray-200 dark:to-gray-500 bg-clip-text text-transparent"
        >
          {{ t('hytale.demos.title') }}
        </h2>
        <p class="text-base sm:text-lg text-gray-500 dark:text-gray-400 mt-4 max-w-2xl mx-auto leading-relaxed">
          {{ t('hytale.demos.subtitle') }}
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <UCard
          v-for="demo in hytaleDemos"
          :key="demo.id"
          class="hover:border-brand-500/40 hover:shadow-xl hover:shadow-brand-500/10 hover:-translate-y-1 transition-all duration-200 overflow-hidden"
          :class="{ 'ring-2 ring-brand-500': demo.featured }"
        >
          <template #header>
            <div class="aspect-video w-full bg-gray-100 dark:bg-gray-900 -m-4 mb-2 overflow-hidden">
              <NuxtImg
                :src="demo.image"
                :alt="t(`hytale.demos.${demo.id}.title`)"
                width="600"
                height="338"
                loading="lazy"
                class="w-full h-full object-cover"
              />
            </div>
          </template>

          <div class="flex flex-col gap-3 p-2">
            <div class="flex items-center justify-between gap-2">
              <h3 class="text-lg font-bold text-gray-900 dark:text-white">
                {{ t(`hytale.demos.${demo.id}.title`) }}
              </h3>
              <UBadge
                v-if="demo.featured"
                color="primary"
                variant="subtle"
                size="sm"
              >
                {{ t('hytale.demos.featured') }}
              </UBadge>
            </div>

            <p class="text-sm text-gray-600 dark:text-gray-300 leading-relaxed line-clamp-3">
              {{ t(`hytale.demos.${demo.id}.tagline`) }}
            </p>

            <div class="flex flex-wrap gap-1.5">
              <UBadge
                v-for="t in demo.tech"
                :key="t"
                color="neutral"
                variant="soft"
                size="xs"
              >
                {{ t }}
              </UBadge>
            </div>

            <div class="flex flex-wrap gap-2 mt-2">
              <UButton
                v-if="demo.website"
                :to="demo.website"
                target="_blank"
                rel="noopener noreferrer"
                color="primary"
                variant="solid"
                size="sm"
                trailing-icon="i-lucide-external-link"
              >
                {{ t('hytale.demos.viewSite') }}
              </UButton>
              <UButton
                v-if="demo.modtale"
                :to="demo.modtale"
                target="_blank"
                rel="noopener noreferrer"
                color="neutral"
                variant="outline"
                size="sm"
              >
                Modtale
              </UButton>
              <UButton
                v-if="demo.curseforge"
                :to="demo.curseforge"
                target="_blank"
                rel="noopener noreferrer"
                color="neutral"
                variant="outline"
                size="sm"
              >
                CurseForge
              </UButton>
              <UButton
                v-if="demo.github"
                :to="demo.github"
                target="_blank"
                rel="noopener noreferrer"
                color="neutral"
                variant="outline"
                size="sm"
                icon="i-simple-icons-github"
              />
            </div>
          </div>
        </UCard>
      </div>

      <p class="text-center text-sm text-gray-500 dark:text-gray-400 mt-10 italic">
        {{ t('hytale.demos.footnote') }}
      </p>
    </div>
  </section>
</template>
