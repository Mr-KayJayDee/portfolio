<script setup lang="ts">
interface Props {
  src: string
  title?: string
  aspect?: '16/9' | '4/3' | '1/1'
  autoplay?: boolean
  loop?: boolean
  muted?: boolean
}
const props = withDefaults(defineProps<Props>(), {
  title: '',
  aspect: '16/9',
  autoplay: false,
  loop: false,
  muted: false,
})

const isYoutube = computed(() =>
  /youtube\.com|youtu\.be/.test(props.src)
)

const youtubeId = computed(() => {
  const match = props.src.match(
    /(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
  )
  return match?.[1] ?? ''
})

const youtubeUrl = computed(() => {
  const params = new URLSearchParams({
    ...(props.autoplay ? { autoplay: '1' } : {}),
    ...(props.loop ? { loop: '1', playlist: youtubeId.value } : {}),
    modestbranding: '1',
    rel: '0',
  })
  return `https://www.youtube.com/embed/${youtubeId.value}?${params}`
})

const aspectClass = computed(() => ({
  '16/9': 'aspect-video',
  '4/3': 'aspect-[4/3]',
  '1/1': 'aspect-square',
}[props.aspect]))
</script>

<template>
  <figure class="not-prose my-6 w-full overflow-hidden rounded-lg bg-black">
    <!-- YouTube embed -->
    <iframe
      v-if="isYoutube"
      :src="youtubeUrl"
      :title="props.title"
      :class="['w-full', aspectClass]"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen
      loading="lazy"
    />
    <!-- Local video -->
    <video
      v-else
      :src="props.src"
      :title="props.title"
      :class="['w-full', aspectClass]"
      :autoplay="props.autoplay"
      :loop="props.loop"
      :muted="props.muted || props.autoplay"
      controls
      playsinline
    />
    <figcaption
      v-if="props.title"
      class="bg-neutral-900 px-4 py-2 text-center text-xs text-neutral-400 italic"
    >
      {{ props.title }}
    </figcaption>
  </figure>
</template>
