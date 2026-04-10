const ipMap = new Map<string, { count: number; reset: number }>()

// Clean stale entries every 5 minutes to prevent memory leak
setInterval(() => {
  const now = Date.now()
  for (const [ip, entry] of ipMap) {
    if (entry.reset < now) ipMap.delete(ip)
  }
}, 5 * 60 * 1000)

export default defineNitroPlugin((nitro) => {
  nitro.hooks.hook('request', (event) => {
    // Only rate-limit the contact POST endpoint
    if (event.method !== 'POST' || !event.path.startsWith('/api/contact')) return

    const ip = getRequestIP(event, { xForwardedFor: true }) ?? 'unknown'
    const now = Date.now()
    const window = 60_000 // 1 minute window
    const limit = 3 // max 3 requests per minute per IP

    const entry = ipMap.get(ip)
    if (!entry || entry.reset < now) {
      ipMap.set(ip, { count: 1, reset: now + window })
      return
    }

    entry.count++
    if (entry.count > limit) {
      throw createError({ statusCode: 429, message: 'Too many requests. Please try again later.' })
    }
  })
})
