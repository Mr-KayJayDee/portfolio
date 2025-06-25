<template>
  <div class="cta-buttons-container">
    <div class="cta-buttons" :class="layoutClass">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  layout?: 'columns' | 'row' | 'stack'
  maxButtons?: number
}

const props = withDefaults(defineProps<Props>(), {
  layout: 'columns',
  maxButtons: 3
})

const layoutClass = computed(() => {
  switch (props.layout) {
    case 'row':
      return 'cta-buttons--row'
    case 'stack':
      return 'cta-buttons--stack'
    default:
      return 'cta-buttons--columns'
  }
})
</script>

<style scoped>
@import '@/components/styles/CTAButtons.css';
</style>
