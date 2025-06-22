import { computed } from 'vue'
import { useI18n } from '@/composables/useI18n'
import { siteConfig as baseSiteConfig } from '@/config/site'

export function useSiteConfig() {
  const { t } = useI18n()

  const siteConfig = computed(() => ({
    ...baseSiteConfig,
    title: t('seo.home.title'),
    description: t('seo.home.description'),
    contact: {
      ...baseSiteConfig.contact
    }
  }))

  return {
    siteConfig
  }
}
