<script setup lang="ts">
const { locale } = useI18n()
const head = useLocaleHead({ addSeoAttributes: true })

useHead({
  htmlAttrs: { lang: locale },
  link: computed(() => head.value.link || []),
  meta: computed(() => head.value.meta || []),
})
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
