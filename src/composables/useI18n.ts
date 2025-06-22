import { useI18n as useVueI18n } from 'vue-i18n'
import { computed } from 'vue'

export function useI18n() {
    const { locale, t, availableLocales } = useVueI18n()

    const currentLocale = computed(() => locale.value)

    const isEnglish = computed(() => locale.value === 'en')
    const isFrench = computed(() => locale.value === 'fr')

    const switchLocale = (newLocale: string) => {
        if (availableLocales.includes(newLocale)) {
            locale.value = newLocale
            localStorage.setItem('locale', newLocale)
        }
    }

    const toggleLocale = () => {
        const newLocale = locale.value === 'en' ? 'fr' : 'en'
        switchLocale(newLocale)
    }

    return {
        t,
        locale,
        currentLocale,
        isEnglish,
        isFrench,
        switchLocale,
        toggleLocale,
        availableLocales
    }
}
