<template>
  <div class="contact-method">
    <div class="contact-icon" :class="iconClass">
      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="iconPath" />
      </svg>
    </div>
    <div class="contact-info">
      <div class="contact-title">{{ title }}</div>
      <component :is="linkComponent" :href="href" :class="linkClass">
        {{ text }}
      </component>
      <div class="contact-description">{{ description }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  type: 'email' | 'phone' | 'location'
  title: string
  text: string
  description: string
  href?: string
}

const props = defineProps<Props>()

const iconClass = computed(() => `contact-icon-${props.type}`)

const linkComponent = computed(() => props.href ? 'a' : 'div')

const linkClass = computed(() => props.href ? 'contact-link' : 'contact-text')

const iconPath = computed(() => {
  switch (props.type) {
    case 'email':
      return 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z'
    case 'phone':
      return 'M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z'
    case 'location':
      return 'M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z'
    default:
      return ''
  }
})
</script>

<style scoped>
@import './styles/ContactMethod.css';
</style>
