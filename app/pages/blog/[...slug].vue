<script setup lang="ts">
const { locale } = useI18n()
const route = useRoute()

const slug = Array.isArray(route.params.slug) ? route.params.slug.join('/') : route.params.slug
const path = `/blog/${slug}`

const { data: page } = await useAsyncData(`blog-${locale.value}-${slug}`, () => {
  const collection = locale.value === 'fr' ? 'blog_fr' : 'blog_en'
  return queryCollection(collection).path(path).first()
})

if (!page.value) {
  throw createError({ statusCode: 404, statusMessage: 'Article introuvable' })
}

useSeoMeta({
  title: page.value.title,
  description: page.value.description,
  ogTitle: page.value.title,
  ogDescription: page.value.description,
})
</script>

<template>
  <div class="mx-auto max-w-3xl px-4 py-12">
    <article class="prose dark:prose-invert max-w-none">
      <ContentRenderer v-if="page" :value="page" />
    </article>
  </div>
</template>
