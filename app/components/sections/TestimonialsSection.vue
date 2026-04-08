<script setup lang="ts">
import { testimonials, testimonialsStats } from '~/data/testimonials'

const { t } = useI18n()
</script>

<template>
  <section class="py-16 px-4">
    <div class="max-w-6xl mx-auto">
      <div class="text-center mb-12">
        <h2 class="text-3xl font-bold mb-4">{{ t('testimonials.title') }}</h2>
        <p class="text-lg text-muted max-w-2xl mx-auto">{{ t('testimonials.subtitle') }}</p>

        <!-- Stats -->
        <div class="flex justify-center gap-8 mt-8">
          <div class="text-center">
            <p class="text-3xl font-bold text-primary">{{ testimonialsStats.totalReviews }}</p>
            <p class="text-sm text-muted">{{ t('testimonials.stats.clients') }}</p>
          </div>
          <div class="text-center">
            <p class="text-3xl font-bold text-primary">{{ testimonialsStats.averageRating }}/5</p>
            <p class="text-sm text-muted">{{ t('testimonials.stats.rating') }}</p>
          </div>
          <div class="text-center">
            <p class="text-3xl font-bold text-primary">{{ testimonialsStats.projectsCompleted }}</p>
            <p class="text-sm text-muted">{{ t('testimonials.stats.projects') }}</p>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <UCard v-for="(testimonial, index) in testimonials" :key="index">
          <div class="flex flex-col gap-3">
            <!-- Rating -->
            <div class="flex gap-1">
              <UIcon
                v-for="star in 5"
                :key="star"
                name="i-lucide-star"
                :class="star <= testimonial.rating ? 'text-yellow-400' : 'text-gray-300'"
              />
            </div>

            <!-- Content -->
            <p class="text-sm italic">"{{ testimonial.content }}"</p>

            <!-- Author -->
            <div class="flex items-center gap-3 mt-2">
              <NuxtImg
                :src="testimonial.avatar"
                :alt="testimonial.name"
                width="40"
                height="40"
                class="rounded-full"
                loading="lazy"
              />
              <div>
                <p class="font-semibold text-sm">{{ testimonial.name }}</p>
                <p class="text-xs text-muted">{{ testimonial.project_type }} - {{ testimonial.platform }}</p>
              </div>
            </div>
          </div>
        </UCard>
      </div>
    </div>
  </section>
</template>
