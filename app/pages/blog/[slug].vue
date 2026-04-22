<script setup lang="ts">
import { KILLIAN_PERSON_ID } from '~/utils/seo-person'
import { resolveOgImage } from '~/utils/resolve-og-image'

const { t, locale } = useI18n()
const localePath = useLocalePath()
const route = useRoute()
const isFr = computed(() => locale.value === 'fr')
const slug = route.params.slug as string
const path = computed(() => (isFr.value ? `/fr/blog/${slug}` : `/en/blog/${slug}`))

// 1) Main article (NO draft filter — direct URL access allowed for drafts, D-14)
const { data: page } = await useAsyncData(
  `blog-${locale.value}-${slug}`,
  () =>
    isFr.value
      ? queryCollection('blog_fr').path(path.value).first()
      : queryCollection('blog_en').path(path.value).first(),
  { watch: [locale] },
)

if (!page.value) {
  throw createError({ statusCode: 404, statusMessage: 'Article introuvable' })
}

// 2) Surroundings (prev/next) WITH draft filter + order DESC
const { data: surround } = await useAsyncData(
  `blog-surround-${locale.value}-${slug}`,
  () =>
    isFr.value
      ? queryCollectionItemSurroundings('blog_fr', path.value, {
          fields: ['title', 'description', 'date', 'image', 'path', 'minutes'],
        })
          .where('draft', '=', false)
          .order('date', 'DESC')
      : queryCollectionItemSurroundings('blog_en', path.value, {
          fields: ['title', 'description', 'date', 'image', 'path', 'minutes'],
        })
          .where('draft', '=', false)
          .order('date', 'DESC'),
  { watch: [locale] },
)

// Détecter la version dans l'autre langue (pour og:locale:alternate, D-15, Pitfall 7)
const { data: altExists } = await useAsyncData(
  `blog-alt-${locale.value}-${slug}`,
  () =>
    isFr.value
      ? queryCollection('blog_en').path(`/en/blog/${slug}`).first()
      : queryCollection('blog_fr').path(`/fr/blog/${slug}`).first(),
  { watch: [locale] },
)

interface SurroundArticle {
  path: string
  title: string
  description?: string
  date: string
  tags?: string[]
  image?: string
  minutes?: number
}

// D-12 + Pitfall 4: order DESC → surround[0] = newer (next UI), surround[1] = older (prev UI)
// @nuxt/content v3 surround return type is ContentNavigationItem (minimal) but with fields[] option
// the runtime object carries the requested fields. Cast to SurroundArticle for BlogPrevNext props.
const nextArticle = computed(() => (surround.value?.[0] as SurroundArticle | undefined) ?? null)
const prevArticle = computed(() => (surround.value?.[1] as SurroundArticle | undefined) ?? null)

const breadcrumbItems = computed(() => [
  { label: t('blog.breadcrumb.home'), to: localePath('/'), icon: 'i-lucide-home' },
  { label: t('blog.breadcrumb.blog'), to: localePath('/blog') },
  { label: page.value?.title ?? '' },
])

const formattedDate = computed(() => {
  if (!page.value?.date) return ''
  try {
    return new Intl.DateTimeFormat(isFr.value ? 'fr-FR' : 'en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(new Date(page.value.date))
  } catch {
    return page.value.date
  }
})

const readingMinutes = computed(() => {
  if (typeof page.value?.minutes === 'number') return page.value.minutes
  return useReadingTime(page.value?.description ?? '')
})

const SITE_URL = 'https://killiandalcin.fr'
const ogImage = computed(() => resolveOgImage(page.value as { image?: string } | null))
const canonicalUrl = computed(() => `${SITE_URL}${localePath('/blog/' + slug)}`)
const publishedIso = computed(() => page.value?.date)
const modifiedIso = computed(() => page.value?.updated ?? page.value?.date) // D-13
const inLanguageTag = computed(() => (isFr.value ? 'fr-FR' : 'en-US')) as unknown as ComputedRef<'fr-FR'>

interface TocLink {
  id: string
  depth: number
  text: string
  children?: TocLink[]
}

const tocLinks = computed<TocLink[]>(() => {
  const body = page.value?.body as { toc?: { links?: TocLink[] } } | undefined
  return body?.toc?.links ?? []
})

useSeoMeta({
  title: () => page.value?.title,
  description: () => page.value?.description,
  ogTitle: () => page.value?.title,
  ogDescription: () => page.value?.description,
  ogType: 'article',
  ogImage,
  ogUrl: canonicalUrl,
  ogLocale: () => (isFr.value ? 'fr_FR' : 'en_US'),
  ogLocaleAlternate: () => (altExists.value ? [isFr.value ? 'en_US' : 'fr_FR'] : []),
  twitterCard: 'summary_large_image',
  twitterImage: ogImage,
  articlePublishedTime: publishedIso,
  articleModifiedTime: modifiedIso,
  articleAuthor: () => ["Killian' Dal-Cin"],
})

useSchemaOrg([
  defineArticle({
    headline: () => page.value?.title,
    description: () => page.value?.description,
    image: ogImage,
    datePublished: publishedIso,
    dateModified: modifiedIso,
    inLanguage: inLanguageTag,
    author: { '@id': KILLIAN_PERSON_ID },
    publisher: { '@id': KILLIAN_PERSON_ID },
    mainEntityOfPage: canonicalUrl,
  }),
  defineBreadcrumb({
    itemListElement: [
      { name: () => t('blog.breadcrumb.home'), item: () => localePath('/') },
      { name: () => t('blog.breadcrumb.blog'), item: () => localePath('/blog') },
      { name: () => page.value?.title ?? '' },
    ],
  }),
])
</script>

<template>
  <div class="max-w-7xl mx-auto px-4 py-12">
    <UBreadcrumb :items="breadcrumbItems" class="mb-6 text-sm" />

    <div class="lg:grid lg:grid-cols-[1fr_16rem] lg:gap-12">
      <!-- Main column -->
      <div class="max-w-3xl mx-auto lg:mx-0 w-full">
        <header class="mb-8">
          <h1 class="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {{ page?.title }}
          </h1>

          <div class="flex flex-wrap items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-4">
            <time :datetime="page?.date" class="font-mono inline-flex items-center gap-1.5">
              <UIcon name="i-lucide-calendar" class="w-3.5 h-3.5" />
              {{ formattedDate }}
            </time>
            <span aria-hidden="true">·</span>
            <span class="inline-flex items-center gap-1.5">
              <UIcon name="i-lucide-clock" class="w-3.5 h-3.5" />
              {{ t('blog.readingTime', { minutes: readingMinutes }) }}
            </span>
          </div>

          <div v-if="page?.tags?.length" class="flex flex-wrap gap-2 mb-6">
            <UBadge
              v-for="tag in page.tags"
              :key="tag"
              color="primary"
              variant="subtle"
            >
              {{ tag }}
            </UBadge>
          </div>

          <NuxtImg
            v-if="page?.image"
            :src="page.image"
            :alt="page.title"
            loading="eager"
            format="webp"
            class="w-full aspect-[21/9] object-cover rounded-2xl mt-2 mb-4"
          />
        </header>

        <article class="prose dark:prose-invert max-w-none">
          <ContentRenderer v-if="page" :value="page" />
        </article>

        <BlogPrevNext :prev="prevArticle" :next="nextArticle" />
      </div>

      <BlogToc v-if="tocLinks.length > 0" :links="tocLinks" />
    </div>
  </div>
</template>
