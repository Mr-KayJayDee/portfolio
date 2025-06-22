<script setup lang="ts">
import { useSeo } from '@/composables/useSeo'
import { useI18n } from '@/composables/useI18n'
import { useSiteConfig } from '@/composables/useSiteConfig'

const { t } = useI18n()
const { siteConfig } = useSiteConfig()

// SEO
useSeo({
  title: t('seo.contact.title'),
  description: t('seo.contact.description'),
  ogTitle: t('seo.contact.title'),
  ogDescription: t('seo.contact.description')
})

</script>

<template>
  <main class="contact-page">
    <!-- Hero Section -->
    <section class="contact-hero">
      <div class="container">
        <div class="hero-content text-center">
          <h1 class="hero-title">{{ t('contact.title') }}</h1>
          <p class="hero-subtitle">
            {{ t('contact.subtitle') }}
          </p>

          <!-- Contact Stats -->
          <div class="stats-grid">
            <div class="stat-item">
              <div class="stat-number">24-48h</div>
              <div class="stat-label">{{ t('contact.stats.responseTime') }}</div>
            </div>
            <div class="stat-item">
              <div class="stat-number">100%</div>
              <div class="stat-label">{{ t('contact.stats.satisfaction') }}</div>
            </div>
            <div class="stat-item">
              <div class="stat-number">Remote</div>
              <div class="stat-label">{{ t('contact.stats.collaboration') }}</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Contact Info Section -->
    <section class="section">
      <div class="container">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-2xl max-w-4xl mx-auto">
          <!-- Contact Methods -->
          <div class="card">
            <div class="card-body">
              <h2 class="text-2xl font-bold mb-lg">{{ t('contact.quickContact') }}</h2>
              <div class="space-y-md">
                <!-- Email -->
                <div class="contact-method">
                  <div class="contact-icon" style="background: var(--color-primary); color: var(--text-inverse);">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z">
                      </path>
                    </svg>
                  </div>
                  <div class="contact-info">
                    <div class="contact-title">{{ t('contact.methods.email') }}</div>
                    <a :href="siteConfig.social.find(s => s.icon === 'email')?.url" class="contact-link">
                      {{ siteConfig.contact.email }}
                    </a>
                    <div class="contact-description">{{ t('contact.methods.responseTime') }}</div>
                  </div>
                </div>

                <!-- Phone -->
                <div class="contact-method">
                  <div class="contact-icon" style="background: var(--color-info); color: var(--text-inverse);">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z">
                      </path>
                    </svg>
                  </div>
                  <div class="contact-info">
                    <div class="contact-title">{{ t('contact.methods.phone') }}</div>
                    <a :href="`tel:${siteConfig.contact.phone.replace(/\s/g, '')}`" class="contact-link">
                      {{ siteConfig.contact.phone }}
                    </a>
                    <div class="contact-description">{{ t('contact.methods.availability') }}</div>
                  </div>
                </div>

                <!-- Location -->
                <div class="contact-method">
                  <div class="contact-icon" style="background: var(--color-secondary); color: var(--text-inverse);">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z">
                      </path>
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z">
                      </path>
                    </svg>
                  </div>
                  <div class="contact-info">
                    <div class="contact-title">{{ t('contact.methods.location') }}</div>
                    <div class="contact-text">{{ siteConfig.contact.location }}</div>
                    <div class="contact-description">{{ t('contact.methods.availability') }}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Social Links -->
          <div class="card">
            <div class="card-body">
              <h2 class="text-2xl font-bold mb-lg">{{ t('contact.findMeOn') }}</h2>
              <div class="space-y-sm">
                <a v-for="social in siteConfig.social.filter(s => s.icon !== 'email')" :key="social.name"
                  :href="social.url" target="_blank" rel="noopener noreferrer" class="social-link">
                  <div class="social-icon">
                    <!-- GitHub Icon -->
                    <svg v-if="social.icon === 'github'" class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path
                        d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.237 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                    </svg>

                    <!-- LinkedIn Icon -->
                    <svg v-else-if="social.icon === 'linkedin'" class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path
                        d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>

                    <!-- Discord Icon -->
                    <svg v-else-if="social.icon === 'discord'" class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path
                        d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419-.0190 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9460 2.4189-2.1568 2.4189Z" />
                    </svg>
                  </div>
                  <span class="social-name">{{ social.name }}</span>
                  <svg class="social-arrow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- FAQ Section -->
    <section class="section" style="background: var(--bg-secondary);">
      <div class="container">
        <div class="text-center mb-2xl">
          <h2 class="mb-lg">{{ t('contact.faq.title') }}</h2>
          <p class="text-xl text-secondary max-w-2xl mx-auto">
            {{ t('contact.faq.subtitle') }}
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-xl">
          <div class="card text-center">
            <div class="card-body">
              <div class="w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-lg"
                style="background: var(--color-success); color: var(--text-inverse);">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <h3 class="text-xl font-bold mb-md">{{ t('contact.faq.responseTime.title') }}</h3>
              <p class="text-secondary">{{ t('contact.faq.responseTime.description') }}</p>
            </div>
          </div>

          <div class="card text-center">
            <div class="card-body">
              <div class="w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-lg"
                style="background: var(--color-primary); color: var(--text-inverse);">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4">
                  </path>
                </svg>
              </div>
              <h3 class="text-xl font-bold mb-md">{{ t('contact.faq.projectTypes.title') }}</h3>
              <p class="text-secondary">{{ t('contact.faq.projectTypes.description') }}</p>
            </div>
          </div>

          <div class="card text-center">
            <div class="card-body">
              <div class="w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-lg"
                style="background: var(--color-secondary); color: var(--text-inverse);">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z">
                  </path>
                </svg>
              </div>
              <h3 class="text-xl font-bold mb-md">{{ t('contact.faq.collaboration.title') }}</h3>
              <p class="text-secondary">{{ t('contact.faq.collaboration.description') }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<style scoped>
/* Contact Page Styles */
.contact-page {
  min-height: 100vh;
  background: var(--bg-primary);
}

/* Hero Section */
.contact-hero {
  background: linear-gradient(135deg, var(--bg-primary) 0%, var(--bg-secondary) 100%);
  padding: var(--space-4xl) 0 var(--space-3xl);
  position: relative;
  overflow: hidden;
}

.contact-hero::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23f3f4f6' fill-opacity='0.4'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
  opacity: 0.5;
}

.hero-content {
  position: relative;
  z-index: 1;
}

/* Stats Grid */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: var(--space-xl);
  max-width: 500px;
  margin: var(--space-2xl) auto 0;
}

.stat-item {
  text-align: center;
}

.stat-number {
  font-size: 2rem;
  font-weight: bold;
  color: var(--color-primary);
  line-height: 1;
}

.stat-label {
  font-size: 0.875rem;
  color: var(--text-secondary);
  margin-top: var(--space-xs);
}

/* Contact Methods */
.contact-method {
  display: flex;
  align-items: flex-start;
  padding: var(--space-md);
  background: var(--bg-secondary);
  border-radius: var(--border-radius-lg);
  transition: all var(--transition-fast);
}

.contact-method:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-lg);
}

.contact-icon {
  width: 40px;
  height: 40px;
  border-radius: var(--border-radius-lg);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: var(--space-md);
  flex-shrink: 0;
}

.contact-info {
  flex: 1;
}

.contact-title {
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: var(--space-xs);
}

.contact-link {
  color: var(--color-primary);
  text-decoration: none;
  font-weight: 500;
  transition: color var(--transition-fast);
}

.contact-link:hover {
  color: var(--color-primary-dark);
}

.contact-text {
  color: var(--text-primary);
  font-weight: 500;
}

.contact-description {
  font-size: 0.875rem;
  color: var(--text-secondary);
  margin-top: var(--space-xs);
}

/* Social Links */
.social-link {
  display: flex;
  align-items: center;
  padding: var(--space-sm) var(--space-md);
  background: var(--bg-secondary);
  border-radius: var(--border-radius-lg);
  text-decoration: none;
  transition: all var(--transition-fast);
  group: true;
}

.social-link:hover {
  background: var(--color-primary);
  color: var(--text-inverse);
  transform: translateX(4px);
}

.social-icon {
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: var(--space-sm);
  color: var(--text-secondary);
  transition: color var(--transition-fast);
}

.social-link:hover .social-icon {
  color: var(--text-inverse);
}

.social-name {
  flex: 1;
  font-weight: 500;
  color: var(--text-primary);
  transition: color var(--transition-fast);
}

.social-link:hover .social-name {
  color: var(--text-inverse);
}

.social-arrow {
  width: 16px;
  height: 16px;
  color: var(--text-secondary);
  transition: all var(--transition-fast);
}

.social-link:hover .social-arrow {
  color: var(--text-inverse);
  transform: translateX(2px);
}

/* Responsive */
@media (min-width: 768px) {
  .md\:grid-cols-3 {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (min-width: 1024px) {
  .lg\:grid-cols-2 {
    grid-template-columns: repeat(2, 1fr);
  }
}

/* Utilities */
.max-w-2xl {
  max-width: 42rem;
}

.max-w-4xl {
  max-width: 56rem;
}

.mx-auto {
  margin-left: auto;
  margin-right: auto;
}

.text-center {
  text-align: center;
}

.space-y-sm>*+* {
  margin-top: var(--space-sm);
}

.space-y-md>*+* {
  margin-top: var(--space-md);
}

.grid {
  display: grid;
}

.gap-xl {
  gap: var(--space-xl);
}

.gap-2xl {
  gap: var(--space-2xl);
}

.flex {
  display: flex;
}

.items-center {
  align-items: center;
}

.justify-center {
  justify-content: center;
}

.mb-lg {
  margin-bottom: var(--space-lg);
}

.mb-md {
  margin-bottom: var(--space-md);
}

.mb-2xl {
  margin-bottom: var(--space-2xl);
}

.text-xl {
  font-size: 1.25rem;
}

.text-2xl {
  font-size: 1.5rem;
}

.font-bold {
  font-weight: 700;
}

/* Removed hardcoded colors - using CSS variables instead */

.w-5 {
  width: 1.25rem;
}

.h-5 {
  height: 1.25rem;
}

.w-6 {
  width: 1.5rem;
}

.h-6 {
  height: 1.5rem;
}

.w-12 {
  width: 3rem;
}

.h-12 {
  height: 3rem;
}

.rounded-lg {
  border-radius: var(--border-radius-lg);
}
</style>
