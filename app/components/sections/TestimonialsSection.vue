<script setup lang="ts">
import { testimonials, testimonialsStats } from '~/data/testimonials'

const { t } = useI18n()
</script>

<template>
  <section class="py-24 md:py-32 px-4 sm:px-6 lg:px-8">
    <div class="max-w-7xl mx-auto">
      <div class="text-center mb-16">
        <span class="font-mono text-sm text-brand-500 dark:text-brand-400 tracking-wider">// testimonials</span>
        <h2 class="text-3xl sm:text-4xl lg:text-5xl font-bold mt-3 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-600 dark:from-white dark:via-gray-200 dark:to-gray-500 bg-clip-text text-transparent">{{ t('testimonials.title') }}</h2>
        <p class="text-lg text-gray-500 dark:text-gray-400 mt-4 max-w-2xl mx-auto leading-relaxed">{{ t('testimonials.subtitle') }}</p>

        <!-- Stats row -->
        <div class="flex justify-center gap-8 sm:gap-12 mt-12">
          <div class="text-center group">
            <p class="text-4xl sm:text-5xl font-black bg-gradient-to-b from-brand-400 to-brand-600 bg-clip-text text-transparent">{{ testimonialsStats.totalReviews }}</p>
            <p class="text-sm text-gray-500 dark:text-gray-400 mt-2 font-medium">{{ t('testimonials.stats.clients') }}</p>
          </div>
          <div class="w-px bg-gradient-to-b from-transparent via-gray-300 dark:via-gray-700 to-transparent" />
          <div class="text-center group">
            <p class="text-4xl sm:text-5xl font-black bg-gradient-to-b from-brand-400 to-brand-600 bg-clip-text text-transparent">{{ testimonialsStats.averageRating }}/5</p>
            <p class="text-sm text-gray-500 dark:text-gray-400 mt-2 font-medium">{{ t('testimonials.stats.rating') }}</p>
          </div>
          <div class="w-px bg-gradient-to-b from-transparent via-gray-300 dark:via-gray-700 to-transparent" />
          <div class="text-center group">
            <p class="text-4xl sm:text-5xl font-black bg-gradient-to-b from-brand-400 to-brand-600 bg-clip-text text-transparent">{{ testimonialsStats.projectsCompleted }}</p>
            <p class="text-sm text-gray-500 dark:text-gray-400 mt-2 font-medium">{{ t('testimonials.stats.projects') }}</p>
          </div>
        </div>
      </div>

      <!-- Horizontal scrolling testimonials -->
      <div class="flex gap-5 overflow-x-auto overflow-y-visible pb-8 -mx-4 px-4 pt-2 snap-x snap-mandatory scrollbar-hide">
        <div
          v-for="(testimonial, index) in testimonials"
          :key="index"
          class="flex-none w-[340px] sm:w-[400px] snap-start"
        >
          <div class="h-full relative rounded-2xl border border-gray-200/80 dark:border-gray-800/50 bg-white/80 dark:bg-gray-900/60 backdrop-blur-sm p-7 flex flex-col gap-5 transition-all duration-300 hover:border-brand-500/40 hover:shadow-xl hover:shadow-brand-500/10 hover:-translate-y-1">
            <!-- Decorative quote mark -->
            <div class="absolute top-5 right-6 text-6xl font-serif text-brand-500/10 dark:text-brand-400/10 leading-none select-none pointer-events-none" aria-hidden="true">"</div>

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
            <p class="text-sm text-gray-600 dark:text-gray-300 leading-relaxed flex-1 relative z-10">
              "{{ testimonial.content }}"
            </p>

            <!-- Author -->
            <div class="flex items-center gap-3 pt-4 border-t border-gray-100 dark:border-gray-800/60">
              <NuxtImg
                :src="testimonial.avatar"
                :alt="testimonial.name"
                width="40"
                height="40"
                class="rounded-full ring-2 ring-brand-500/20 dark:ring-brand-400/20"
                loading="lazy"
              />
              <div>
                <p class="font-semibold text-sm text-gray-900 dark:text-white">{{ testimonial.name }}</p>
                <p class="text-xs text-gray-500 dark:text-gray-400 font-mono">{{ testimonial.project_type }} - {{ testimonial.platform }}</p>
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
