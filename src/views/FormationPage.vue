<template>
  <div class="formation-page page-enter">
    <!-- Hero Section -->
    <section class="hero-section">
      <div class="container">
        <div class="hero-content animate-fade-in-up">
          <h1 class="hero-title">{{ $t('pricing.title') }}</h1>
          <p class="hero-subtitle">{{ $t('pricing.subtitle') }}</p>

          <!-- Billing Toggle -->
          <div class="billing-toggle">
            <span :class="{ active: billingType === 'monthly' }">{{ $t('pricing.monthly') }}</span>
            <label class="toggle-switch">
              <input type="checkbox" v-model="isAnnual" @change="toggleBilling">
              <span class="slider"></span>
            </label>
            <span :class="{ active: billingType === 'annual' }">
              {{ $t('pricing.annual') }}
              <span class="discount-badge">-20%</span>
            </span>
          </div>
        </div>
      </div>
    </section>

    <!-- Pricing Cards -->
    <section class="pricing-section">
      <div class="container">
        <div class="pricing-grid">
          <div v-for="(plan, index) in pricingPlans" :key="plan.id" :class="['pricing-card', { popular: plan.popular }]"
            class="animate-fade-in-up" :style="{ 'animation-delay': `${index * 0.1}s` }">
            <div v-if="plan.popular" class="popular-badge">
              {{ $t('pricing.mostPopular') }}
            </div>

            <div class="card-header">
              <h3 class="plan-name">{{ $t(`pricing.plans.${plan.id}.name`) }}</h3>
              <div class="plan-price">
                <span class="currency">€</span>
                <span class="amount">{{ getCurrentPrice(plan) }}</span>
                <span class="period">/{{ billingType === 'monthly' ? 'mois' : 'an' }}</span>
              </div>
              <p class="plan-description">{{ $t(`pricing.plans.${plan.id}.description`) }}</p>
            </div>

            <div class="card-body">
              <ul class="features-list">
                <li v-for="feature in plan.features" :key="feature" class="feature-item">
                  <svg class="check-icon" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clip-rule="evenodd" />
                  </svg>
                  {{ $t(`pricing.features.${feature}`) }}
                </li>
              </ul>

              <div class="card-actions">
                <button :class="['cta-button', plan.popular ? 'primary' : 'secondary']">
                  {{ $t('pricing.startTrial') }}
                </button>
                <p class="trial-info">{{ $t('pricing.trialInfo') }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- FAQ Section -->
    <section class="faq-section">
      <div class="container">
        <h2 class="section-title animate-fade-in-up">{{ $t('pricing.faq.title') }}</h2>
        <div class="faq-grid">
          <div v-for="(faq, index) in pricingFAQ" :key="faq.id" class="faq-item animate-fade-in-up"
            :style="{ 'animation-delay': `${index * 0.1}s` }">
            <h3 class="faq-question">{{ $t(`pricing.faq.items.${faq.id}.question`) }}</h3>
            <p class="faq-answer">{{ $t(`pricing.faq.items.${faq.id}.answer`) }}</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useSeo } from '@/composables/useSeo'

// SEO
useSeo({
  title: 'Tarifs - Formation Développement Web',
  description: 'Découvrez nos plans de formation en développement web. Choisissez l\'abonnement qui vous convient avec des prix flexibles mensuels ou annuels.',
  keywords: 'formation développement web, tarifs, abonnement, cours en ligne, prix'
})

// Billing state
const isAnnual = ref(false)
const billingType = computed(() => isAnnual.value ? 'annual' : 'monthly')

const toggleBilling = () => {
  // The billingType is computed, no need to manually set it
}

// Pricing plans
const pricingPlans = [
  {
    id: 'starter',
    popular: false,
    monthlyPrice: 29,
    annualPrice: 279, // 20% discount
    features: [
      'basicCourses',
      'communityAccess',
      'mobileApp',
      'basicSupport',
      'certificates'
    ]
  },
  {
    id: 'pro',
    popular: true,
    monthlyPrice: 59,
    annualPrice: 567, // 20% discount
    features: [
      'allCourses',
      'liveWorkshops',
      'mentorship',
      'prioritySupport',
      'certificates',
      'jobBoard',
      'portfolioReview'
    ]
  },
  {
    id: 'expert',
    popular: false,
    monthlyPrice: 99,
    annualPrice: 950, // 20% discount
    features: [
      'everythingPro',
      'oneOnOneCoaching',
      'customProjects',
      'internshipPlacement',
      'careerGuidance',
      'exclusiveContent',
      'networkingEvents'
    ]
  }
]

// FAQ data
const pricingFAQ = [
  { id: 'trial' },
  { id: 'cancel' },
  { id: 'refund' },
  { id: 'upgrade' },
  { id: 'certificates' },
  { id: 'support' }
]

// Helper function to get current price
const getCurrentPrice = (plan: { monthlyPrice: number; annualPrice: number }) => {
  return billingType.value === 'monthly' ? plan.monthlyPrice : plan.annualPrice
}
</script>

<style scoped>
@import './styles/FormationPage.css';
</style>
