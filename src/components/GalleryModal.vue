<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
import { useAssets } from '@/composables/useAssets'
import './styles/GalleryModal.css'

interface Props {
  isOpen: boolean
  currentImage: string
  currentIndex: number
  totalImages: number
  hasNext: boolean
  hasPrevious: boolean
  projectTitle: string
}

const props = defineProps<Props>()

const emit = defineEmits<{
  close: []
  next: []
  previous: []
  goTo: [index: number]
}>()

const { getImageUrl } = useAssets()

// Keyboard navigation
const handleKeydown = (event: KeyboardEvent) => {
  if (!props.isOpen) return

  switch (event.key) {
    case 'Escape':
      emit('close')
      break
    case 'ArrowLeft':
      if (props.hasPrevious) emit('previous')
      break
    case 'ArrowRight':
      if (props.hasNext) emit('next')
      break
  }
}

onMounted(() => {
  document.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleKeydown)
})
</script>

<template>
  <Teleport to="body">
    <div v-if="isOpen" class="gallery-modal" @click="emit('close')">
      <div class="gallery-modal-overlay"></div>

      <!-- Close Button -->
      <button class="gallery-close" @click="emit('close')">
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
        </svg>
      </button>

      <!-- Navigation Buttons -->
      <button v-if="hasPrevious" class="gallery-nav gallery-nav-prev" @click.stop="emit('previous')">
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
        </svg>
      </button>

      <button v-if="hasNext" class="gallery-nav gallery-nav-next" @click.stop="emit('next')">
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
        </svg>
      </button>

      <!-- Main Image -->
      <div class="gallery-content" @click.stop>
        <img :src="getImageUrl(currentImage)" :alt="`${projectTitle} - Image ${currentIndex + 1}`"
          class="gallery-image">

        <!-- Image Info -->
        <div class="gallery-info">
          <h3 class="gallery-title">{{ projectTitle }}</h3>
          <p class="gallery-counter">{{ currentIndex + 1 }} / {{ totalImages }}</p>
        </div>

        <!-- Thumbnails -->
        <div v-if="totalImages > 1" class="gallery-thumbnails">
          <button v-for="(_, index) in totalImages" :key="index" class="gallery-thumbnail"
            :class="{ active: index === currentIndex }" @click="emit('goTo', index)">
            <div class="thumbnail-indicator"></div>
          </button>
        </div>
      </div>
    </div>
  </Teleport>
</template>
