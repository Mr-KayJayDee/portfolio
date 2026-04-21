<script setup lang="ts">
interface Props {
  src: string
  alt?: string
  title?: string
  caption?: string
  align?: 'left' | 'right' | 'center' | 'full'
  width?: string | number
  height?: string | number
}
const props = withDefaults(defineProps<Props>(), {
  alt: '',
  align: 'full',
})

const figureClass = computed(() => {
  const base = 'not-prose my-6'
  switch (props.align) {
    case 'left':
      return `${base} float-left mr-6 mb-2 w-1/2 max-w-xs`
    case 'right':
      return `${base} float-right ml-6 mb-2 w-1/2 max-w-xs`
    case 'center':
      return `${base} mx-auto table`
    default:
      return `${base} w-full`
  }
})

const imgClass = computed(() => {
  const base = 'rounded-lg'
  return props.align === 'full' ? `${base} w-full` : `${base} w-full`
})
</script>

<template>
  <figure :class="figureClass" :style="props.width && props.align !== 'full' ? `width: ${props.width}px` : undefined">
    <img
      :src="props.src"
      :alt="props.alt"
      :title="props.title || props.caption"
      loading="lazy"
      :class="imgClass"
    />
    <figcaption
      v-if="props.caption"
      class="mt-2 text-center text-xs text-neutral-500 dark:text-neutral-400 italic"
    >
      {{ props.caption }}
    </figcaption>
  </figure>
</template>
