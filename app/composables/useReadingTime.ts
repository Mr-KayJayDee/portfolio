/**
 * Fallback reading-time helper when `article.minutes` is not available
 * (e.g., dev hot-reload before the Nitro hook has re-parsed).
 *
 * Source of truth = server/plugins/reading-time.ts + content.config.ts schema.
 * This is only a client-side safety net (per D-19).
 *
 * @param wordCountOrText number (word count already computed) OR string (raw text to tokenize)
 * @returns minutes (>= 1), rounded up, using 200 words per minute
 */
export function useReadingTime(wordCountOrText: number | string): number {
  if (typeof wordCountOrText === 'number') {
    return Math.max(1, Math.ceil(wordCountOrText / 200))
  }
  const count = wordCountOrText.trim().split(/\s+/).filter(Boolean).length
  return Math.max(1, Math.ceil(count / 200))
}
