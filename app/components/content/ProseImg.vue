<script setup lang="ts">
interface Props {
  src: string
  alt?: string
  title?: string
  width?: string | number
  height?: string | number
}
const props = withDefaults(defineProps<Props>(), { alt: '' })
</script>

<template>
  <img
    :src="props.src"
    :alt="props.alt"
    :title="props.title"
    :width="props.width"
    :height="props.height"
    loading="lazy"
    class="not-prose my-6 w-full rounded-lg"
  />
</template>
