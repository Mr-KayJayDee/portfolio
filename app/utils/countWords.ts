/**
 * Count words in a @nuxt/content v3 "minimal" body AST.
 * Ignores code and pre tags (code snippets are not "readable" for reading-time purposes).
 *
 * Body shape (v3): { type: 'minimal', value: MinimalNode[] }
 * MinimalNode = string | [tag: string, attrs: object, ...children: MinimalNode[]]
 *
 * Used by server/plugins/reading-time.ts at content:file:afterParse.
 */
export function countWordsInMinimalBody(body: unknown): number {
  let count = 0

  const visit = (node: unknown): void => {
    if (typeof node === 'string') {
      const trimmed = node.trim()
      if (trimmed) count += trimmed.split(/\s+/).length
      return
    }
    if (Array.isArray(node)) {
      const tag = node[0]
      // Skip code/pre — not counted as reading content
      if (tag === 'code' || tag === 'pre') return
      // children start at index 2 (index 0 = tag, index 1 = attrs)
      for (let i = 2; i < node.length; i++) visit(node[i])
    }
  }

  const body_ = body as { type?: string; value?: unknown[] } | undefined
  if (body_?.value && Array.isArray(body_.value)) {
    for (const node of body_.value) visit(node)
  }

  return count
}
