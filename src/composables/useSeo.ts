import { onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'

interface SeoOptions {
  title?: string
  description?: string
  keywords?: string
  ogTitle?: string
  ogDescription?: string
  ogImage?: string
  ogUrl?: string
  twitterCard?: string
  twitterTitle?: string
  twitterDescription?: string
  twitterImage?: string
  canonicalUrl?: string
  structuredData?: object
  noindex?: boolean
  nofollow?: boolean
}

export function useSeo(options: SeoOptions = {}) {
  const route = useRoute()
  const originalTitle = document.title
  const metaElements: HTMLMetaElement[] = []
  const linkElements: HTMLLinkElement[] = []
  const scriptElements: HTMLScriptElement[] = []

  const setTitle = (title: string) => {
    document.title = title
    setMetaTag('og:title', title, true)
    setMetaTag('twitter:title', title, true)
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

  const setLinkTag = (rel: string, href: string) => {
    let link = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement

    if (!link) {
      link = document.createElement('link')
      link.setAttribute('rel', rel)
      document.head.appendChild(link)
      linkElements.push(link)
    }

    link.setAttribute('href', href)
  }

  const setStructuredData = (data: object) => {
    const script = document.createElement('script')
    script.type = 'application/ld+json'
    script.textContent = JSON.stringify(data)
    document.head.appendChild(script)
    scriptElements.push(script)
  }

  onMounted(() => {
    // Set title with site name suffix
    if (options.title) {
      const fullTitle = options.title.includes('Killian') ? options.title : `${options.title} | Killian - Full Stack Developer`
      setTitle(fullTitle)
    }

    // Set description
    if (options.description) {
      setMetaTag('description', options.description)
      setMetaTag('og:description', options.ogDescription || options.description, true)
      setMetaTag('twitter:description', options.twitterDescription || options.description, true)
    }

    // Set keywords
    if (options.keywords) {
      setMetaTag('keywords', options.keywords)
    }

    // Set Open Graph tags
    if (options.ogTitle) {
      setMetaTag('og:title', options.ogTitle, true)
    }

    if (options.ogImage) {
      setMetaTag('og:image', options.ogImage, true)
      setMetaTag('twitter:image', options.twitterImage || options.ogImage, true)
    }

    if (options.ogUrl || route) {
      const url = options.ogUrl || `https://killiandalcin.fr${route.path}`
      setMetaTag('og:url', url, true)
      setMetaTag('twitter:url', url, true)
    }

    // Set Twitter Card
    setMetaTag('twitter:card', options.twitterCard || 'summary_large_image', true)

    // Set canonical URL
    if (options.canonicalUrl || route) {
      const canonicalUrl = options.canonicalUrl || `https://killiandalcin.fr${route.path}`
      setLinkTag('canonical', canonicalUrl)
    }

    // Set robots meta
    const robotsContent = []
    if (options.noindex) robotsContent.push('noindex')
    if (options.nofollow) robotsContent.push('nofollow')
    if (robotsContent.length === 0) robotsContent.push('index', 'follow')
    setMetaTag('robots', robotsContent.join(', '))

    // Set default Open Graph type
    setMetaTag('og:type', 'website', true)
    setMetaTag('og:site_name', 'Killian Portfolio', true)

    // Set structured data
    if (options.structuredData) {
      setStructuredData(options.structuredData)
    }

    // Default structured data for breadcrumbs
    if (route && route.name !== 'home') {
      const breadcrumbData = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        'itemListElement': [
          {
            '@type': 'ListItem',
            'position': 1,
            'name': 'Home',
            'item': 'https://killiandalcin.fr'
          },
          {
            '@type': 'ListItem',
            'position': 2,
            'name': options.title || route.name,
            'item': `https://killiandalcin.fr${route.path}`
          }
        ]
      }
      setStructuredData(breadcrumbData)
    }
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

    // Remove link tags we added
    linkElements.forEach(link => {
      if (link.parentNode) {
        link.parentNode.removeChild(link)
      }
    })

    // Remove script tags we added
    scriptElements.forEach(script => {
      if (script.parentNode) {
        script.parentNode.removeChild(script)
      }
    })
  })

  return {
    setTitle,
    setMetaTag,
    setLinkTag,
    setStructuredData
  }
}
