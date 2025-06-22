import { onMounted, onUnmounted } from 'vue'

interface SeoOptions {
  title?: string
  description?: string
  ogTitle?: string
  ogDescription?: string
  ogImage?: string
}

export function useSeo(options: SeoOptions = {}) {
  const originalTitle = document.title
  const metaElements: HTMLMetaElement[] = []

  const setTitle = (title: string) => {
    document.title = title
  }

  const setMetaTag = (name: string, content: string, property?: boolean) => {
    let meta = document.querySelector(`meta[${property ? 'property' : 'name'}="${name}"]`) as HTMLMetaElement

    if (!meta) {
      meta = document.createElement('meta')
      if (property) {
        meta.setAttribute('property', name)
      } else {
        meta.setAttribute('name', name)
      }
      document.head.appendChild(meta)
      metaElements.push(meta)
    }

    meta.setAttribute('content', content)
  }

  onMounted(() => {
    if (options.title) {
      setTitle(options.title)
    }

    if (options.description) {
      setMetaTag('description', options.description)
    }

    if (options.ogTitle) {
      setMetaTag('og:title', options.ogTitle, true)
    }

    if (options.ogDescription) {
      setMetaTag('og:description', options.ogDescription, true)
    }

    if (options.ogImage) {
      setMetaTag('og:image', options.ogImage, true)
    }

    // Set default Open Graph type
    setMetaTag('og:type', 'website', true)
  })

  onUnmounted(() => {
    // Restore original title
    document.title = originalTitle

    // Remove meta tags we added
    metaElements.forEach(meta => {
      if (meta.parentNode) {
        meta.parentNode.removeChild(meta)
      }
    })
  })

  return {
    setTitle,
    setMetaTag
  }
}
