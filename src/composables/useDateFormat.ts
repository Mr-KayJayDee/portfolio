import { useI18n } from './useI18n'

export function useDateFormat() {
  const { currentLocale } = useI18n()

  const formatRelativeTime = (dateString: string): string => {
    // Parse DD/MM/YYYY format
    const [day, month, year] = dateString.split('/').map(Number)
    const date = new Date(year, month - 1, day) // month is 0-indexed
    const now = new Date()

    const diffInMs = now.getTime() - date.getTime()
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24))
    const diffInMonths = Math.floor(diffInDays / 30)
    const diffInYears = Math.floor(diffInDays / 365)

    if (currentLocale.value === 'fr') {
      if (diffInYears >= 2) {
        return `il y a ${diffInYears} ans`
      } else if (diffInYears === 1) {
        return 'il y a 1 an'
      } else if (diffInMonths >= 2) {
        return `il y a ${diffInMonths} mois`
      } else if (diffInMonths === 1) {
        return 'il y a 1 mois'
      } else if (diffInDays >= 2) {
        return `il y a ${diffInDays} jours`
      } else if (diffInDays === 1) {
        return 'il y a 1 jour'
      } else {
        return 'aujourd\'hui'
      }
    } else {
      if (diffInYears >= 2) {
        return `${diffInYears} years ago`
      } else if (diffInYears === 1) {
        return '1 year ago'
      } else if (diffInMonths >= 2) {
        return `${diffInMonths} months ago`
      } else if (diffInMonths === 1) {
        return '1 month ago'
      } else if (diffInDays >= 2) {
        return `${diffInDays} days ago`
      } else if (diffInDays === 1) {
        return '1 day ago'
      } else {
        return 'today'
      }
    }
  }

  const formatDate = (dateString: string): string => {
    const [day, month, year] = dateString.split('/').map(Number)
    const date = new Date(year, month - 1, day)

    if (currentLocale.value === 'fr') {
      return date.toLocaleDateString('fr-FR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      })
    } else {
      return date.toLocaleDateString('en-US', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      })
    }
  }

  return {
    formatRelativeTime,
    formatDate
  }
}