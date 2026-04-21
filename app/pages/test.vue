<script setup lang="ts">
const { data: page } = await useAsyncData('test', () =>
  queryCollection('blog_fr').path('/blog/test-kotlin-syntax').first()
)
</script>

<template>
  <article class="prose dark:prose-invert max-w-none p-8">
    <ContentRenderer v-if="page" :value="page" />
  </article>
</template>
