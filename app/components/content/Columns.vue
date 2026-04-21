<script setup lang="ts">
interface Props {
  cols?: 2 | 3 | 4
  gap?: 'sm' | 'md' | 'lg'
}
const props = withDefaults(defineProps<Props>(), {
  cols: 2,
  gap: 'md',
})

const gridClass = computed(() => {
  const cols = { 2: 'md:grid-cols-2', 3: 'md:grid-cols-3', 4: 'md:grid-cols-4' }[props.cols]
  const gap = { sm: 'gap-4', md: 'gap-6', lg: 'gap-10' }[props.gap]
  return `not-prose my-6 grid grid-cols-1 ${cols} ${gap}`
})
</script>

<template>
  <div :class="gridClass">
    <slot />
  </div>
</template>
