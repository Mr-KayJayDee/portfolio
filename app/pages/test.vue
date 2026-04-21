<script setup lang="ts">
const { data: page } = await useAsyncData('test', () =>
  queryCollection('blog_fr').path('/blog/test-kotlin-syntax').first()
)
</script>

<template>
  <div class="min-h-screen bg-white dark:bg-neutral-950">
    <div class="mx-auto max-w-3xl px-8 py-16">
      <header class="mb-10">
        <div class="mb-3 text-xs font-semibold uppercase tracking-widest text-neutral-400">
          Renderer Test
        </div>
        <h1 class="text-3xl font-bold text-neutral-900 dark:text-white">
          {{ page?.title }}
        </h1>
        <p class="mt-2 text-neutral-500 dark:text-neutral-400">
          {{ page?.description }}
        </p>
      </header>

      <article class="prose prose-neutral dark:prose-invert max-w-none
        prose-headings:font-semibold
        prose-code:before:content-none prose-code:after:content-none
        prose-pre:p-0 prose-pre:bg-transparent">
        <ContentRenderer v-if="page" :value="page" />
      </article>
    </div>
  </div>
</template>
