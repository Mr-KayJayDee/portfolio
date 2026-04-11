import type { PricingTier } from '~~/shared/types'

export const hytalePricing: PricingTier[] = [
  { id: 'simple', priceFixed: '50€', featured: false },
  { id: 'complex', priceFixed: null, priceLabel: 'Sur devis', featured: true },
  { id: 'custom', priceFixed: null, priceLabel: 'Sur devis', featured: false },
  { id: 'maintenance', priceFixed: '30€/mois', featured: false },
  { id: 'web', priceFixed: null, priceLabel: 'Sur devis', featured: false },
]
