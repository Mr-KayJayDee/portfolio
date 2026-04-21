<script setup lang="ts">
defineOptions({ inheritAttrs: false })

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

const attrs = useAttrs()

// Use <span class="block"> instead of <figure> to avoid block-in-<p> invalid HTML
// that breaks SSR hydration (browser auto-removes <p> wrapper around block elements).
const wrapperClass = computed(() => {
  const base = 'not-prose my-6'

  if (attrs.class) return `${base} block`

  switch (props.align) {
    case 'left':  return `${base} block float-left mr-6 mb-2 w-1/2 max-w-xs`
    case 'right': return `${base} block float-right ml-6 mb-2 w-1/2 max-w-xs`
    case 'center': return `${base} block mx-auto`
    default: return `${base} block w-full`
  }
})

const wrapperStyle = computed(() => {
  if (props.width && props.align !== 'full') return `width: ${props.width}px`
  return undefined
})
</script>

<template>
  <span
    v-bind="attrs"
    :class="wrapperClass"
    :style="wrapperStyle"
  >
    <img
      :src="props.src"
      :alt="props.alt"
      :title="props.title || props.caption"
      loading="lazy"
      :class="props.align === 'full' && !attrs.class ? 'w-full rounded-lg' : 'rounded-lg'"
    />
    <span
      v-if="props.caption"
      class="mt-2 block text-center text-xs text-neutral-500 dark:text-neutral-400 italic"
    >
      {{ props.caption }}
    </span>
  </span>
</template>
