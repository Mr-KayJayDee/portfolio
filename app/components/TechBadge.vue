<script setup lang="ts">
import type { Technology } from '~~/shared/types'
import { techStack } from '~/data/techstack'

interface Props {
  tech: Technology | string
  showLevel?: boolean
  showImage?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  showLevel: true,
  showImage: true,
})

const techMapping: Record<string, string> = {
  'Three.js': 'JavaScript',
  'WebGL': 'JavaScript',
  'Discord.js': 'JavaScript',
  'Express': 'Node.js',
  'Canvas': 'JavaScript',
  'Insta.js': 'JavaScript',
  'Instagram API': 'JavaScript',
  'Crowdin API': 'JavaScript',
  'Cron': 'Node.js',
}

const techData = computed((): Technology => {
  if (typeof props.tech !== 'string') {
    return props.tech
  }

  const techName = props.tech
  const allTechs = Object.values(techStack).flat()

  let found = allTechs.find((t) => t.name.toLowerCase() === techName.toLowerCase())

  if (!found && techMapping[techName]) {
    found = allTechs.find((t) => t.name.toLowerCase() === techMapping[techName].toLowerCase())
  }

  return found ?? { name: techName, image: '', level: 'Intermediate' as const }
})

const levelColor = computed(() => {
  switch (techData.value.level) {
    case 'Advanced':
      return 'success' as const
    case 'Intermediate':
      return 'primary' as const
    case 'Beginner':
      return 'neutral' as const
    default:
      return 'neutral' as const
  }
})
</script>

<template>
  <div class="flex items-center gap-2" itemscope itemtype="https://schema.org/ComputerLanguage">
    <NuxtImg
      v-if="showImage && techData.image"
      :src="techData.image"
      :alt="`${techData.name} logo`"
      width="24"
      height="24"
      loading="lazy"
      class="shrink-0"
      itemprop="image"
    />
    <span class="text-sm font-medium" itemprop="name">{{ techData.name }}</span>
    <UBadge v-if="showLevel" :color="levelColor" variant="subtle" size="xs">
      {{ techData.level }}
    </UBadge>
  </div>
</template>
