import { ref, computed } from 'vue'

export function useGallery() {
  const isOpen = ref(false)
  const currentIndex = ref(0)
  const images = ref<string[]>([])

  const currentImage = computed(() => images.value[currentIndex.value])
  const hasNext = computed(() => currentIndex.value < images.value.length - 1)
  const hasPrevious = computed(() => currentIndex.value > 0)

  const openGallery = (galleryImages: string[], index: number = 0) => {
    images.value = galleryImages
    currentIndex.value = index
    isOpen.value = true
    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden'
  }

  const closeGallery = () => {
    isOpen.value = false
    currentIndex.value = 0
    images.value = []
    // Restore body scroll
    document.body.style.overflow = ''
  }

  const nextImage = () => {
    if (hasNext.value) {
      currentIndex.value++
    }
  }

  const previousImage = () => {
    if (hasPrevious.value) {
      currentIndex.value--
    }
  }

  const goToImage = (index: number) => {
    if (index >= 0 && index < images.value.length) {
      currentIndex.value = index
    }
  }

  return {
    isOpen,
    currentIndex,
    currentImage,
    hasNext,
    hasPrevious,
    openGallery,
    closeGallery,
    nextImage,
    previousImage,
    goToImage,
    images: computed(() => images.value)
  }
}
