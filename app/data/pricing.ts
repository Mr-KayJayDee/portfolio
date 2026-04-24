import type { PricingTier } from '~~/shared/types'

// Pricing calibrated from Hytale/Minecraft market research (April 2026)
// Source: RESEARCH/Hytale/ — TJM senior Java FR €450-650/jour
// Segments cibles : small network (2-5 staff) + mid-tier RPG/MMO (5-15 staff)
export const hytalePricing: PricingTier[] = [
  { id: 'simple', priceFixed: '400€', featured: false },
  { id: 'complex', priceFixed: '1 500€', featured: true },
  { id: 'custom', priceFixed: '5 000€', featured: false },
  { id: 'maintenance', priceFixed: '800€/mois', featured: false },
  { id: 'web', priceFixed: '1 000€', featured: false },
]
