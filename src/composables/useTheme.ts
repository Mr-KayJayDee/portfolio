import { ref, watch, onMounted } from 'vue'

export type Theme = 'light' | 'dark'

const isDark = ref<boolean>(false)

export function useTheme() {
  const toggleTheme = () => {
    isDark.value = !isDark.value
  }

  const setTheme = (theme: Theme) => {
    isDark.value = theme === 'dark'
  }

  const getTheme = (): Theme => {
    return isDark.value ? 'dark' : 'light'
  }

  // Apply theme to document
  const applyTheme = () => {
    if (typeof document !== 'undefined') {
      document.documentElement.classList.toggle('dark', isDark.value)
      document.documentElement.setAttribute('data-theme', getTheme())
    }
  }

  // Save theme to localStorage
  const saveTheme = () => {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('theme', getTheme())
    }
  }

  // Load theme from localStorage or default to dark mode
  const loadTheme = () => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme') as Theme | null

      if (savedTheme) {
        setTheme(savedTheme)
      } else {
        // Default to dark mode instead of system preference
        setTheme('dark')
      }
    }
  }

  // Watch for theme changes
  watch(isDark, () => {
    applyTheme()
    saveTheme()
  })

  // Initialize theme on mount
  onMounted(() => {
    loadTheme()
    applyTheme()
  })

  return {
    isDark,
    toggleTheme,
    setTheme,
    getTheme
  }
}
