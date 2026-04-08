<script setup lang="ts">
interface Props {
  gallery: string[]
  projectTitle: string
}

const props = defineProps<Props>()

const isOpen = ref(false)
const currentIndex = ref(0)
const carouselRef = useTemplateRef('carousel')

function openGallery(index: number) {
  currentIndex.value = index
  isOpen.value = true
  nextTick(() => {
    carouselRef.value?.emblaApi?.scrollTo(index, true)
  })
}

function goTo(index: number) {
  currentIndex.value = index
  carouselRef.value?.emblaApi?.scrollTo(index, true)
}

function onKeydown(e: KeyboardEvent) {
  if (!isOpen.value) return
  if (e.key === 'ArrowRight') carouselRef.value?.emblaApi?.scrollNext()
  if (e.key === 'ArrowLeft') carouselRef.value?.emblaApi?.scrollPrev()
  if (e.key === 'Escape') isOpen.value = false
}

onMounted(() => document.addEventListener('keydown', onKeydown))
onUnmounted(() => document.removeEventListener('keydown', onKeydown))

defineExpose({ openGallery })
</script>

<template>
  <UModal v-model:open="isOpen" fullscreen>
    <template #content>
      <div class="flex flex-col items-center justify-center h-full p-4 gap-4">
        <div class="flex items-center justify-between w-full max-w-4xl">
          <h3 class="text-lg font-semibold">{{ projectTitle }}</h3>
          <UButton
            icon="i-lucide-x"
            variant="ghost"
            size="lg"
            @click="isOpen = false"
            :aria-label="'Close gallery'"
          />
        </div>

        <UCarousel
          ref="carousel"
          v-slot="{ item }"
          :items="props.gallery"
          arrows
          loop
          class="w-full max-w-4xl"
          @select="(i: number) => (currentIndex = i)"
        >
          <NuxtImg
            :src="item"
            :alt="`${projectTitle} - Image ${currentIndex + 1}`"
            loading="lazy"
            format="webp"
            class="w-full h-auto max-h-[70vh] object-contain"
          />
        </UCarousel>

        <!-- Thumbnails -->
        <div class="flex gap-2 justify-center flex-wrap">
          <button
            v-for="(img, i) in props.gallery"
            :key="i"
            :class="[
              'rounded overflow-hidden border-2 transition-all',
              i === currentIndex ? 'border-primary ring-2 ring-primary' : 'border-transparent opacity-60 hover:opacity-100',
            ]"
            @click="goTo(i)"
          >
            <NuxtImg :src="img" width="80" height="60" class="object-cover" loading="lazy" />
          </button>
        </div>

        <p class="text-sm text-muted">{{ currentIndex + 1 }} / {{ props.gallery.length }}</p>
      </div>
    </template>
  </UModal>
</template>
