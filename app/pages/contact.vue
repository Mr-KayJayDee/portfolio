<script setup lang="ts">
import { siteConfig } from '~/data/site'

const { t } = useI18n()

useSeoMeta({
  title: () => t('seo.contact.title'),
  description: () => t('seo.contact.description'),
  ogTitle: () => t('seo.contact.title'),
  ogDescription: () => t('seo.contact.description'),
  ogImage: 'https://killiandalcin.fr/og-image.png',
  ogImageWidth: 1200,
  ogImageHeight: 630,
  ogType: 'website',
})
</script>

<template>
  <div>
    <!-- Hero Section -->
    <section class="py-20 px-4 text-center">
      <div class="max-w-4xl mx-auto">
        <h1 class="text-4xl sm:text-5xl font-bold mb-6">
          {{ t('contact.title') }}
        </h1>
        <p class="text-xl text-muted mb-8">
          {{ t('contact.subtitle') }}
        </p>

        <!-- Stats -->
        <div class="flex flex-wrap justify-center gap-8">
          <div class="text-center">
            <div class="text-2xl font-bold text-primary">24-48h</div>
            <div class="text-sm text-muted">{{ t('contact.stats.responseTime') }}</div>
          </div>
          <div class="text-center">
            <div class="text-2xl font-bold text-primary">100%</div>
            <div class="text-sm text-muted">{{ t('contact.stats.satisfaction') }}</div>
          </div>
          <div class="text-center">
            <div class="text-2xl font-bold text-primary">Remote</div>
            <div class="text-sm text-muted">{{ t('contact.stats.collaboration') }}</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Two Column Layout -->
    <section class="py-16 px-4">
      <div class="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
        <!-- Left: Contact Form -->
        <UCard>
          <template #header>
            <h2 class="text-2xl font-bold">{{ t('contact.form.title') }}</h2>
          </template>
          <ContactForm />
        </UCard>

        <!-- Right: Contact Info + Social -->
        <div class="flex flex-col gap-6">
          <!-- Contact Info -->
          <UCard>
            <template #header>
              <h2 class="text-xl font-bold">{{ t('contact.quickContact') }}</h2>
            </template>
            <div class="flex flex-col gap-4">
              <a :href="`mailto:${siteConfig.contact.email}`" class="flex items-center gap-3 hover:text-primary transition-colors">
                <UIcon name="i-lucide-mail" class="text-xl text-primary shrink-0" />
                <span>{{ siteConfig.contact.email }}</span>
              </a>
              <a :href="`tel:${siteConfig.contact.phone.replace(/\s/g, '')}`" class="flex items-center gap-3 hover:text-primary transition-colors">
                <UIcon name="i-lucide-phone" class="text-xl text-primary shrink-0" />
                <span>{{ siteConfig.contact.phone }}</span>
              </a>
              <div class="flex items-center gap-3">
                <UIcon name="i-lucide-map-pin" class="text-xl text-primary shrink-0" />
                <span>{{ siteConfig.contact.location }}</span>
              </div>
            </div>
          </UCard>

          <!-- Social Links -->
          <UCard>
            <template #header>
              <h2 class="text-xl font-bold">{{ t('contact.findMeOn') }}</h2>
            </template>
            <div class="flex flex-col gap-3">
              <a
                v-for="social in siteConfig.social.filter(s => s.icon !== 'i-lucide-mail')"
                :key="social.name"
                :href="social.url"
                target="_blank"
                rel="noopener noreferrer"
                class="flex items-center gap-3 hover:text-primary transition-colors"
              >
                <UIcon :name="social.icon" class="text-xl shrink-0" />
                <span>{{ social.name }}</span>
                <UIcon name="i-lucide-external-link" class="text-sm text-muted ml-auto" />
              </a>
            </div>
          </UCard>
        </div>
      </div>
    </section>

    <!-- FAQ Info Cards -->
    <section class="py-16 px-4">
      <div class="max-w-5xl mx-auto">
        <div class="text-center mb-12">
          <h2 class="text-3xl font-bold mb-4">{{ t('contact.faq.title') }}</h2>
          <p class="text-lg text-muted max-w-2xl mx-auto">
            {{ t('contact.faq.subtitle') }}
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <UCard class="text-center">
            <UIcon name="i-lucide-clock" class="text-3xl text-primary mb-4 mx-auto" />
            <h3 class="text-lg font-bold mb-2">{{ t('contact.faq.responseTime.title') }}</h3>
            <p class="text-muted text-sm">{{ t('contact.faq.responseTime.description') }}</p>
          </UCard>

          <UCard class="text-center">
            <UIcon name="i-lucide-building" class="text-3xl text-primary mb-4 mx-auto" />
            <h3 class="text-lg font-bold mb-2">{{ t('contact.faq.projectTypes.title') }}</h3>
            <p class="text-muted text-sm">{{ t('contact.faq.projectTypes.description') }}</p>
          </UCard>

          <UCard class="text-center">
            <UIcon name="i-lucide-users" class="text-3xl text-primary mb-4 mx-auto" />
            <h3 class="text-lg font-bold mb-2">{{ t('contact.faq.collaboration.title') }}</h3>
            <p class="text-muted text-sm">{{ t('contact.faq.collaboration.description') }}</p>
          </UCard>
        </div>
      </div>
    </section>
  </div>
</template>
