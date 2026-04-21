<script setup lang="ts">
const { locale } = useI18n()
const route = useRoute()

const slug = route.params.slug as string
const isFr = locale.value === 'fr'
const path = isFr ? `/fr/blog/${slug}` : `/en/blog/${slug}`

const { data: page } = await useAsyncData(`blog-${locale.value}-${slug}`, () =>
  isFr
    ? queryCollection('blog_fr').path(path).first()
    : queryCollection('blog_en').path(path).first()
)

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
