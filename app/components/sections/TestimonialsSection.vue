<script setup lang="ts">
import { testimonials, testimonialsStats } from '~/data/testimonials'

const { t } = useI18n()
</script>

<template>
  <section class="py-20 md:py-28 px-4">
    <div class="max-w-7xl mx-auto">
      <div class="text-center mb-14">
        <span class="text-sm font-semibold text-brand-500 dark:text-brand-400 uppercase tracking-wider">{{ t('testimonials.title') }}</span>
        <h2 class="text-3xl sm:text-4xl font-bold mt-2 text-gray-900 dark:text-white">{{ t('testimonials.title') }}</h2>
        <p class="text-lg text-gray-500 dark:text-gray-400 mt-3 max-w-2xl mx-auto">{{ t('testimonials.subtitle') }}</p>

        <!-- Stats row -->
        <div class="flex justify-center gap-10 mt-10">
          <div class="text-center">
            <p class="text-4xl font-extrabold text-brand-500 dark:text-brand-400">{{ testimonialsStats.totalReviews }}</p>
            <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">{{ t('testimonials.stats.clients') }}</p>
          </div>
          <div class="w-px bg-gray-200 dark:bg-gray-800" />
          <div class="text-center">
            <p class="text-4xl font-extrabold text-brand-500 dark:text-brand-400">{{ testimonialsStats.averageRating }}/5</p>
            <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">{{ t('testimonials.stats.rating') }}</p>
          </div>
          <div class="w-px bg-gray-200 dark:bg-gray-800" />
          <div class="text-center">
            <p class="text-4xl font-extrabold text-brand-500 dark:text-brand-400">{{ testimonialsStats.projectsCompleted }}</p>
            <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">{{ t('testimonials.stats.projects') }}</p>
          </div>
        </div>
      </div>

      <!-- Horizontal scrolling testimonials -->
      <div class="flex gap-6 overflow-x-auto pb-4 -mx-4 px-4 snap-x snap-mandatory scrollbar-hide">
        <div
          v-for="(testimonial, index) in testimonials"
          :key="index"
          class="flex-none w-[340px] sm:w-[380px] snap-start"
        >
          <div class="h-full rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 flex flex-col gap-4 transition-all duration-300 hover:border-brand-500/30 hover:shadow-lg hover:shadow-brand-500/5">
            <!-- Rating stars -->
            <div class="flex gap-1">
              <UIcon
                v-for="star in 5"
                :key="star"
                name="i-lucide-star"
                class="w-4 h-4"
                :class="star <= testimonial.rating ? 'text-yellow-400' : 'text-gray-300 dark:text-gray-700'"
              />
            </div>

            <!-- Quote -->
            <p class="text-sm text-gray-600 dark:text-gray-300 leading-relaxed flex-1 italic">
              "{{ testimonial.content }}"
            </p>

            <!-- Author -->
            <div class="flex items-center gap-3 pt-2 border-t border-gray-100 dark:border-gray-800">
              <NuxtImg
                :src="testimonial.avatar"
                :alt="testimonial.name"
                width="40"
                height="40"
                class="rounded-full ring-2 ring-gray-100 dark:ring-gray-800"
                loading="lazy"
              />
              <div>
                <p class="font-semibold text-sm text-gray-900 dark:text-white">{{ testimonial.name }}</p>
                <p class="text-xs text-gray-500 dark:text-gray-400">{{ testimonial.project_type }} - {{ testimonial.platform }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
