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
const techData = computed(() => {
  if (typeof props.tech === 'string') {
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
      .find(t => t.name.toLowerCase() === props.tech.toLowerCase())

    // If not found, try the mapping
    if (!foundTech && techMapping[props.tech]) {
      foundTech = Object.values(techStack)
        .flat()
        .find(t => t.name.toLowerCase() === techMapping[props.tech].toLowerCase())
    }

    if (foundTech) {
      return foundTech
    }

    // Fallback: create a basic tech object from string
    return {
      name: props.tech,
      image: '', // No image for unknown techs
      level: 'Intermediate' as const
    }
  }

  return props.tech
})

// Get the actual image URL
const imageUrl = computed(() => {
  if (!techData.value.image) return ''
  return getImageUrl(techData.value.image)
})

const getLevelColor = (level: string) => {
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
  <div class="tech-badge">
    <!-- Tech image -->
    <img v-if="showImage && imageUrl" :src="imageUrl" :alt="techData.name" class="tech-image" loading="lazy">

    <!-- Tech name -->
    <span class="tech-name">{{ techData.name }}</span>

    <!-- Level indicator -->
    <span v-if="showLevel" :class="['badge', getLevelColor(techData.level)]" class="tech-level">
      {{ techData.level }}
    </span>
  </div>
</template>

<style scoped>
.tech-badge {
  display: inline-flex;
  align-items: center;
  gap: var(--space-sm);
  padding: var(--space-sm) var(--space-md);
  background: var(--bg-primary);
  border: var(--border-width) solid var(--border-color);
  border-radius: var(--border-radius-lg);
  transition: all var(--transition-fast);
  white-space: nowrap;
}

.tech-badge:hover {
  box-shadow: var(--shadow-md);
  transform: translateY(-1px);
}

.tech-image {
  width: 20px;
  height: 20px;
  object-fit: contain;
  flex-shrink: 0;
}

.tech-name {
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  color: var(--text-primary);
}

.tech-level {
  font-size: var(--font-size-xs);
  padding: var(--space-xs) var(--space-sm);
}
</style>
