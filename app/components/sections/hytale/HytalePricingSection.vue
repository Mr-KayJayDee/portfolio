<script setup lang="ts">
import { hytalePricing } from '~/data/pricing'

const { t } = useI18n()
const localePath = useLocalePath()
</script>

<template>
  <section class="py-16 md:py-24 px-4 sm:px-6 lg:px-8">
    <div class="max-w-7xl mx-auto">
      <div class="text-center mb-16">
        <span class="font-mono text-sm text-brand-500 dark:text-brand-400 tracking-wider">{{ t('hytale.pricing.label') }}</span>
        <h2 class="text-3xl sm:text-4xl lg:text-5xl font-bold mt-3 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-600 dark:from-white dark:via-gray-200 dark:to-gray-500 bg-clip-text text-transparent">{{ t('hytale.pricing.title') }}</h2>
        <p class="text-lg text-gray-500 dark:text-gray-400 mt-4 max-w-2xl mx-auto leading-relaxed">{{ t('hytale.pricing.subtitle') }}</p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <UCard
          v-for="tier in hytalePricing"
          :key="tier.id"
          class="hover:border-brand-500/40 hover:shadow-xl hover:shadow-brand-500/10 hover:-translate-y-1 transition-all duration-200"
          :class="{ 'ring-2 ring-brand-500': tier.featured }"
        >
          <div class="flex flex-col gap-4 p-2">
            <div class="flex items-center justify-between">
              <h3 class="text-xl font-bold text-gray-900 dark:text-white">{{ t(`hytale.pricing.${tier.id}.name`) }}</h3>
              <UBadge v-if="tier.featured" color="primary" variant="subtle">{{ t('hytale.pricing.popular') }}</UBadge>
            </div>

            <div class="text-3xl font-extrabold text-gray-900 dark:text-white">
              <template v-if="tier.priceFixed">
                <span class="text-sm font-normal text-gray-500 dark:text-gray-400">{{ t('hytale.pricing.from') }} </span>
                {{ tier.priceFixed }}
              </template>
              <template v-else>
                <span class="text-lg">{{ t('hytale.pricing.onQuote') }}</span>
              </template>
            </div>

            <p class="text-sm text-gray-500 dark:text-gray-400">{{ t(`hytale.pricing.${tier.id}.description`) }}</p>

            <ul class="space-y-2 flex-1">
              <li v-for="i in 4" :key="i" class="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                <UIcon name="i-lucide-check" class="w-4 h-4 text-brand-500 shrink-0" />
                {{ t(`hytale.pricing.${tier.id}.features.${i - 1}`) }}
              </li>
            </ul>

            <UButton
              :to="localePath('/contact')"
              :color="tier.featured ? 'primary' : 'neutral'"
              :variant="tier.featured ? 'solid' : 'outline'"
              block
              class="mt-4"
            >
              {{ t('hytale.pricing.cta') }}
            </UButton>
          </div>
        </UCard>
      </div>
    </div>
  </section>
</template>
