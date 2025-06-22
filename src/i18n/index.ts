import { createI18n } from 'vue-i18n'
import en from '@/locales/en'
import fr from '@/locales/fr'

// Get the saved locale from localStorage or default to French
const savedLocale = localStorage.getItem('locale') || 'fr'

const i18n = createI18n({
  legacy: false,
  locale: savedLocale,
  fallbackLocale: 'fr',
  messages: {
    en,
    fr
  }
})

export default i18n