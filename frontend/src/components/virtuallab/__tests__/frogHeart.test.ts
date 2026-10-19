// @vitest-environment node
import { describe, it, expect } from 'vitest'
import { FROG_PHASES, FROG_HEART_PARTS, avOpen, conusOpen, sinusContraction, atrialContraction, ventricularContraction, frogPhaseAt, flowRate, buildFrogHeart } from '../lab3d/frogHeartModel'

const samples = Array.from({ length: 1000 }, (_, i) => i / 1000)

describe('frog heartbeat', () => {
  it('runs sinus venosus -> atria -> ventricle -> truncus -> filling, with no gaps', () => {
    expect(FROG_PHASES.map(p => p.key)).toEqual(['sinus', 'atria', 'ventricle', 'truncus', 'filling'])
    expect(FROG_PHASES[0].start).toBe(0)
    expect(FROG_PHASES.at(-1)!.end).toBe(1)
    for (let i = 1; i < FROG_PHASES.length; i++) expect(FROG_PHASES[i].start).toBe(FROG_PHASES[i - 1].end)
  })
  it('never has the atrioventricular and truncus valves open together', () => {
    for (const c of samples) expect(Math.min(avOpen(c), conusOpen(c))).toBeLessThan(0.02)
  })
  it('contracts in the right order: sinus venosus, then atria, then ventricle', () => {
    const peak = (f: (c: number) => number) => samples.reduce((b, c) => (f(c) > f(b) ? c : b), 0)
    expect(peak(sinusContraction)).toBeLessThan(peak(atrialContraction))
    expect(peak(atrialContraction)).toBeLessThan(peak(ventricularContraction))
    expect(frogPhaseAt(0.45).key).toBe('ventricle')
  })
  it('never moves blood backwards', () => {
    for (const c of samples) for (const s of ['vein', 'sinus', 'atrium', 'ventricle-in', 'ventricle-out', 'artery'] as const) expect(flowRate(c, s)).toBeGreaterThanOrEqual(0)
  })
})

describe('frog heart model', () => {
  it('has every part it describes, each clickable', () => {
    const h = buildFrogHeart()
    const found = new Set<string>()
    h.root.traverse(o => { const p = h.partOf(o); if (p) found.add(p) })
    for (const k of Object.keys(FROG_HEART_PARTS)) expect(found.has(k), k).toBe(true)
    h.dispose()
  })
  it('cuts the heart open only in the inside view', () => {
    const h = buildFrogHeart()
    expect(h.clipPlanes()).toHaveLength(0)
    h.setView('inside')
    expect(h.clipPlanes().length).toBeGreaterThan(0)
    h.dispose()
  })
  it('labels the three chambers and the three arches', () => {
    const h = buildFrogHeart()
    const parts = h.labels().map(l => l.part)
    for (const k of ['right_atrium', 'left_atrium', 'ventricle', 'carotid_arch', 'systemic_arch', 'pulmocutaneous_arch'] as const) expect(parts).toContain(k)
    h.dispose()
  })
})
