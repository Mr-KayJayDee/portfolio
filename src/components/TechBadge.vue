<script setup lang="ts">
import { computed } from 'vue'
import { type Technology } from '@/types'
import { useAssets } from '@/composables/useAssets'
import { techStack } from '@/data/techstack'

interface Props {
  tech: Technology | string
  showLevel?: boolean
  showImage?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  showLevel: true,
  showImage: true
})

const { getImageUrl } = useAssets()

// Get the technology data (handle both string and object)
const techData = computed((): Technology => {
  if (typeof props.tech === 'string') {
    const techName = props.tech as string

    // Create a mapping for technologies that don't match exactly
    const techMapping: Record<string, string> = {
      'Three.js': 'JavaScript',
      'WebGL': 'JavaScript',
      'Discord.js': 'JavaScript',
      'Express': 'Node.js',
      'Canvas': 'JavaScript',
      'Insta.js': 'JavaScript',
      'Instagram API': 'JavaScript',
      'Crowdin API': 'JavaScript',
      'Cron': 'Node.js'
    }

    // Try to find the exact match first
    let foundTech = Object.values(techStack)
      .flat()
      .find(t => t.name.toLowerCase() === techName.toLowerCase())

    // If not found, try the mapping
    if (!foundTech && techMapping[techName]) {
      const mappedName = techMapping[techName]
      foundTech = Object.values(techStack)
        .flat()
        .find(t => t.name.toLowerCase() === mappedName.toLowerCase())
    }

    if (foundTech) {
      return foundTech
    }

    // Fallback: create a basic tech object from string
    return {
      name: techName,
      image: '', // No image for unknown techs
      level: 'Intermediate' as const
    }
  }

  return props.tech as Technology
})

// Get the actual image URL
const imageUrl = computed(() => {
  if (!techData.value.image) return ''
  return getImageUrl(techData.value.image)
})

const getLevelColor = (level: Technology['level']) => {
  switch (level) {
    case 'Advanced':
      return 'badge-success'
    case 'Intermediate':
      return 'badge-primary'
    case 'Beginner':
      return 'badge-secondary'
    default:
      return 'badge-secondary'
  }
}
</script>

<template>
  <div class="tech-badge" itemscope itemtype="https://schema.org/ComputerLanguage">
    <!-- Tech image -->
    <img v-if="showImage && imageUrl" :src="imageUrl" :alt="`${techData.name} programming language logo`"
      class="tech-image" loading="lazy" width="24" height="24" itemprop="image">

    <!-- Tech name -->
    <span class="tech-name" itemprop="name">{{ techData.name }}</span>

    <!-- Level indicator -->
    <span v-if="showLevel" :class="['badge', getLevelColor(techData.level)]" class="tech-level"
      :aria-label="`Skill level: ${techData.level}`">
      {{ techData.level }}
    </span>
  </div>
</template>

<style scoped>
@import './styles/TechBadge.css';
</style>
