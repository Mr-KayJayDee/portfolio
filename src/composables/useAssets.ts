/**
 * Composable for handling dynamic asset imports in Vite
 */
export function useAssets() {
  // Pre-load all images using Vite's import.meta.glob
  const imageModules = import.meta.glob('../assets/images/**/*', { eager: true })

  /**
   * Get image URL from assets folder
   * @param path - Path like '@/assets/images/filename.png' or 'filename.png'
   * @returns string - The image URL
   */
  const getImageUrl = (path: string | undefined): string => {
    try {
      // Handle undefined or empty path
      if (!path || path.trim() === '') {
        console.warn('getImageUrl called with empty or undefined path')
        return `https://via.placeholder.com/400x300/f3f4f6/9ca3af?text=${encodeURIComponent('No image')}`
      }

      // Clean the path to get just the filename
      let cleanPath = path
      if (path.startsWith('@/assets/images/')) {
        cleanPath = path.replace('@/assets/images/', '')
      }

      // Build the full path for the module lookup
      const fullPath = `../assets/images/${cleanPath}`

      // Get the image module
      const imageModule = imageModules[fullPath] as { default: string }

      if (imageModule && imageModule.default) {
        return imageModule.default
      }

      // Fallback: try to construct URL directly
      return new URL(`../assets/images/${cleanPath}`, import.meta.url).href
    } catch (error) {
      console.warn(`Failed to load image: ${path}`, error)
      // Return a placeholder image
      return `https://via.placeholder.com/400x300/f3f4f6/9ca3af?text=${encodeURIComponent('Image not found')}`
    }
  }

  return {
    getImageUrl
  }
}
