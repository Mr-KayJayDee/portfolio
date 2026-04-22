/**
 * Global Person identity for schema.org (Killian Dal-Cin).
 * Consumed by: app/app.vue (definePerson global) and app/pages/blog/[slug].vue (author/publisher @id ref).
 * Derives URLs from siteConfig — single source of truth.
 */
import { siteConfig } from '~/data/site'

export const KILLIAN_PERSON_ID = '#killian'

export const killianPerson = {
  '@id': KILLIAN_PERSON_ID,
  name: "Killian' Dal-Cin",
  url: siteConfig.url,
  jobTitle: siteConfig.jobTitle,
  sameAs: siteConfig.social
    .filter((s) => s.name !== 'Email')
    .map((s) => s.url),
} as const
