<script setup lang="ts">
interface SurroundArticle {
  path: string
  title: string
  description?: string
  date: string
  tags?: string[]
  image?: string
  minutes?: number
}

interface Props {
  prev: SurroundArticle | null
  next: SurroundArticle | null
}

defineProps<Props>()
const { t } = useI18n()
</script>

<template>
  <nav
    v-if="prev || next"
    class="mt-16 grid md:grid-cols-2 gap-5"
    :aria-label="t('blog.prevArticle') + ' / ' + t('blog.nextArticle')"
  >
    <!-- Prev (older article in DESC order) -->
    <div v-if="prev">
      <BlogCard :article="prev" variant="compact" direction="prev" />
    </div>
    <div v-else aria-hidden="true" />

    <!-- Next (newer article in DESC order) -->
    <div v-if="next">
      <BlogCard :article="next" variant="compact" direction="next" />
    </div>
    <div v-else aria-hidden="true" />
  </nav>
</template>
