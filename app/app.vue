<script setup lang="ts">
import { killianPerson } from '~/utils/seo-person'

const { locale } = useI18n()
const head = useLocaleHead({ seo: true })

useHead({
  htmlAttrs: { lang: locale },
  link: computed(() => head.value.link || []),
  meta: computed(() => head.value.meta || []),
})

useSchemaOrg([
  definePerson(killianPerson),
  defineWebSite({
    name: "Killian' Dal-Cin — Hytale Plugin Developer",
    inLanguage: ['fr-FR', 'en-US'],
  }),
])
</script>

<template>
  <UApp>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </UApp>
</template>
