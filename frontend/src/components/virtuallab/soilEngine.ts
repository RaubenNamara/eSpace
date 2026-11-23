/**
 * Soil practicals (O-level Biology, physical and chemical properties of soil): drainage and water
 * retention, the volume of air in a soil, and soil pH with universal indicator. Pure logic - the
 * soil bench (VirtualLabSceneSoilTests) draws what this returns.
 *
 * Sandy soil: large particles and air spaces, drains fast, holds little water.
 * Clay soil: tiny packed particles, drains slowly, holds a lot of water, little air.
 * Loam: in between.
 */
export type SoilType = 'sand' | 'loam' | 'clay'

export interface SoilDef {
  name: string
  color: string
  /** Fraction of the water poured on that eventually drains through */
  drains: number
  /** How quickly it drains (seconds for most of it to come through - speeded up) */
  tau: number
  /** Air as a percentage of the soil's volume */
  airPct: number
}

export const SOILS: Record<SoilType, SoilDef> = {
  sand: { name: 'Sandy soil', color: '#d8b77c', drains: 0.85, tau: 3, airPct: 30 },
  loam: { name: 'Loam soil', color: '#5b4127', drains: 0.6, tau: 6, airPct: 20 },
  clay: { name: 'Clay soil', color: '#8a5a44', drains: 0.32, tau: 12, airPct: 10 },
}

/** When the dripping stops: once 97% of what will drain has come through */
export function stopsDrainingAt(soil: SoilType, _added = 0): number {
  return Math.round(SOILS[soil].tau * Math.log(1 / 0.03))
}

/** Water (cm³) collected in the cylinder `t` seconds after pouring `added` cm³ onto the soil.
 *  Once the dripping has stopped the reading no longer changes. */
export function collected(soil: SoilType, added: number, t: number): number {
  const s = SOILS[soil]
  const final = Math.round(added * s.drains * 2) / 2
  if (t >= stopsDrainingAt(soil, added)) return final
  return Math.min(final, Math.round(added * s.drains * (1 - Math.exp(-t / s.tau)) * 2) / 2)
}

/** Air test: soil to volume a, water b poured on; when the bubbling stops the mixture reads c */
export function airTest(soil: SoilType, a: number, b: number) {
  const air = Math.round((a * SOILS[soil].airPct) / 100)
  return { air, c: a + b - air, percent: Math.round((air / a) * 1000) / 10 }
}

/** Universal indicator colour for a pH (the indicator chart) */
export const PH_CHART: { ph: number; color: string; name: string }[] = [
  { ph: 3, color: '#dc2626', name: 'red' },
  { ph: 4, color: '#ea580c', name: 'orange-red' },
  { ph: 5, color: '#f59e0b', name: 'orange' },
  { ph: 6, color: '#facc15', name: 'yellow' },
  { ph: 7, color: '#22c55e', name: 'green' },
  { ph: 8, color: '#0d9488', name: 'blue-green' },
  { ph: 9, color: '#2563eb', name: 'blue' },
  { ph: 10, color: '#4338ca', name: 'indigo' },
  { ph: 11, color: '#7c3aed', name: 'violet' },
]
export function indicatorColor(ph: number): string {
  const r = Math.round(Math.max(3, Math.min(11, ph)))
  return PH_CHART.find(c => c.ph === r)!.color
}
export function phWord(ph: number) {
  return ph < 6.5 ? 'acidic' : ph > 7.5 ? 'alkaline' : 'neutral'
}
