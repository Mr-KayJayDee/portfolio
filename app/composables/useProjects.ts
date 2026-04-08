import { projects as projectsData } from '~/data/projects'
import type { Project } from '~~/shared/types'

/**
 * Composable for accessing and filtering project data with i18n support.
 * Titles, descriptions, and long descriptions are resolved via i18n keys.
 */
export function useProjects() {
  const { t, te } = useI18n()

  const projects = computed<Project[]>(() =>
    projectsData.map((p) => ({
      ...p,
      title: t(`projects.${p.id}.title`),
      description: t(`projects.${p.id}.description`),
      longDescription: te(`projects.${p.id}.longDescription`)
        ? t(`projects.${p.id}.longDescription`)
        : undefined,
    })),
  )

  const featuredProjects = computed(() => projects.value.filter((p) => p.featured))

  function filterByCategory(category: string) {
    return computed(() => projects.value.filter((p) => p.category === category))
  }

  function search(query: Ref<string> | string) {
    return computed(() => {
      const q = typeof query === 'string' ? query : query.value
      if (!q) return projects.value
      const lower = q.toLowerCase()
      return projects.value.filter(
        (p) =>
          p.title.toLowerCase().includes(lower) ||
          p.description.toLowerCase().includes(lower) ||
          p.technologies.some((tech) => tech.toLowerCase().includes(lower)),
      )
    })
  }

  function findById(id: string) {
    return computed(() => projects.value.find((p) => p.id === id))
  }

  return {
    projects,
    featuredProjects,
    filterByCategory,
    search,
    findById,
  }
}
