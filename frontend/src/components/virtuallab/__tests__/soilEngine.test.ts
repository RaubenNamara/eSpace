import { describe, it, expect } from 'vitest'
import { collected, stopsDrainingAt, airTest, indicatorColor, phWord } from '../soilEngine'

describe('soil engine', () => {
  it('sand drains more water, faster, than clay', () => {
    expect(collected('sand', 30, 60)).toBeGreaterThan(collected('loam', 30, 60))
    expect(collected('loam', 30, 60)).toBeGreaterThan(collected('clay', 30, 60))
    expect(stopsDrainingAt('sand', 30)).toBeLessThan(stopsDrainingAt('clay', 30))
  })

  it('retained water is what did not come through', () => {
    const sandRetained = 30 - collected('sand', 30, 200)
    const clayRetained = 30 - collected('clay', 30, 200)
    expect(clayRetained).toBeGreaterThan(sandRetained)
  })

  it('air test: V = a + b - c, sand has the most air', () => {
    const s = airTest('sand', 50, 50)
    expect(s.air).toBe(50 + 50 - s.c)
    expect(s.percent).toBeGreaterThan(airTest('clay', 50, 50).percent)
  })

  it('universal indicator chart', () => {
    expect(indicatorColor(7)).toBe('#22c55e')
    expect(phWord(5)).toBe('acidic')
    expect(phWord(8)).toBe('alkaline')
  })
})
