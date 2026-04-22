import { countWordsInMinimalBody } from '~/utils/countWords'

/**
 * Nitro plugin: compute reading time for every markdown content file at parse time.
 *
 * Injects `wordCount` (number) and `minutes` (number, min 1) on the content object.
 * Values are persisted in the @nuxt/content SQLite DB and queryable via queryCollection
 * thanks to the matching Zod schema fields in content.config.ts (per D-18 + D-19).
 *
 * Hook reference: https://content.nuxt.com/docs/advanced/hooks
 */
export default defineNitroPlugin((nitroApp) => {
  nitroApp.hooks.hook('content:file:afterParse', (ctx) => {
    const { file, content } = ctx

    // Only process markdown files (defensive — hook fires on all sources)
    if (!file.id?.endsWith('.md')) return

    const wordCount = countWordsInMinimalBody(content.body)
    content.wordCount = wordCount
    content.minutes = Math.max(1, Math.ceil(wordCount / 200)) // D-19: 200 wpm, floor 1 min
  })
})
