import type { PricingTier } from '~~/shared/types'

// Pricing calibrated from Hytale-native market research (April 2026)
// Source: RESEARCH/Hytale/3 — Hytale Freelance Plugin Pricing Calibration
// Réalité marché : top server Runeteria = 29 CCU peak, €200-800/mois gross revenue
// Aucun serveur Hytale n'a payé €500+ pour un plugin single en 2026 (sauf flagship rare)
// Grille pensée pour capturer 85%+ de la demande Hytale observée
export const hytalePricing: PricingTier[] = [
  { id: 'simple', priceFixed: '149€', featured: false },
  { id: 'complex', priceFixed: '349€', featured: true },
  { id: 'custom', priceFixed: '790€', featured: false },
  { id: 'maintenance', priceFixed: '450€/mois', featured: false },
  { id: 'web', priceFixed: '500€', featured: false },
]
