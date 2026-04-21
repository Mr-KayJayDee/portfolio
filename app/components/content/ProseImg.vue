<script setup lang="ts">
interface Props {
  src: string
  alt?: string
  title?: string
  width?: string | number
  height?: string | number
}
const props = withDefaults(defineProps<Props>(), {
  alt: '',
})
</script>

<template>
  <NuxtImg
    :src="props.src"
    :alt="props.alt"
    :title="props.title"
    :width="props.width"
    :height="props.height"
    format="webp"
    class="rounded-lg w-full"
  />
</template>
