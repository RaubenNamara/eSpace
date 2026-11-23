import { describe, it, expect } from 'vitest'
import { emptyTube, addFood, addReagent, tick, lookOf, foodOf, translucentMark, NO_FOOD, type Composition } from '../foodTestEngine'

// Food mixture Q from the worked example: starch, reducing sugar, protein, no vitamin C
const Q: Composition = { starch: 3, reducing: 3, nonReducing: 0, protein: 2, vitaminC: 0, lipid: 0 }
const juice: Composition = { ...NO_FOOD, reducing: 2, vitaminC: 3 }
const sucrose: Composition = { ...NO_FOOD, nonReducing: 3 }
const oil: Composition = { ...NO_FOOD, lipid: 3 }

function tubeWith(food: Composition, appearance: 'turbid' | 'colourless' = 'turbid') {
  const t = emptyTube()
  addFood(t, food, appearance, '#eeeeee')
  return t
}

describe('food tests', () => {
  it('iodine turns a starchy solution blue-black', () => {
    const t = tubeWith(Q)
    addReagent(t, 'iodine')
    const l = lookOf(t)
    expect(l.observation).toBe('Turbid solution turned to a blue-black solution')
    expect(l.correct).toBe('Much starch present')
  })

  it("Benedict's needs boiling and climbs through green, yellow to orange", () => {
    const t = tubeWith(Q)
    addReagent(t, 'benedicts')
    expect(lookOf(t).waiting).toBeTruthy()
    tick(t, 12, 100)
    const l = lookOf(t)
    expect(l.observation).toContain('orange (brick-red) precipitate')
    expect(l.correct).toBe('Much reducing sugars present')
  })

  it('non-reducing sugar only shows after acid hydrolysis and neutralising', () => {
    const t = tubeWith(sucrose, 'colourless')
    addReagent(t, 'benedicts'); tick(t, 12, 100)
    expect(lookOf(t).correct).toBe('Reducing sugars absent')

    const h = tubeWith(sucrose, 'colourless')
    addReagent(h, 'hcl'); tick(h, 8, 100); addReagent(h, 'naoh'); addReagent(h, 'benedicts'); tick(h, 12, 100)
    const l = lookOf(h)
    expect(l.test).toBe('non_reducing')
    expect(l.correct).toBe('Non-reducing sugars present')
  })

  it('Biuret goes purple with protein, blue without', () => {
    const t = tubeWith(Q)
    addReagent(t, 'naoh'); addReagent(t, 'cuso4'); t.shaken = true
    expect(lookOf(t).correct).toBe('Proteins present')
    const n = tubeWith(juice, 'colourless')
    addReagent(n, 'naoh'); addReagent(n, 'cuso4'); n.shaken = true
    expect(lookOf(n).observation).toBe('Colourless solution turned to a blue solution')
  })

  it('DCPIP decolourises with vitamin C, and boiling destroys vitamin C', () => {
    const t = emptyTube(); addReagent(t, 'dcpip')
    addFood(t, juice, 'colourless', '#fde68a'); t.dcpipDrops = 3
    expect(lookOf(t).correct).toBe('Vitamin C present')

    const boiled = tubeWith(juice, 'colourless'); tick(boiled, 10, 100)
    const d = emptyTube(); addReagent(d, 'dcpip')
    addFood(d, foodOf(boiled), 'colourless', '#fde68a'); d.dcpipDrops = 12
    expect(lookOf(d).correct).toBe('Vitamin C absent')
  })

  it('emulsion test and translucent mark find lipids', () => {
    const t = tubeWith(oil, 'colourless')
    addReagent(t, 'ethanol'); t.shaken = true; addReagent(t, 'water'); t.pouredIntoWater = true
    expect(lookOf(t).correct).toBe('Lipids present')
    expect(translucentMark(oil, true).correct).toBe('Lipids present')
    expect(translucentMark(juice, true).correct).toBe('Lipids absent')
  })
})

describe('enzyme activity', () => {
  it('amylase digests starch at 37 °C but not when boiled', () => {
    const warm = emptyTube(); addReagent(warm, 'starch'); addReagent(warm, 'amylase')
    const dead = emptyTube(); addReagent(dead, 'starch'); addReagent(dead, 'boiled_amylase')
    for (let i = 0; i < 60; i++) { tick(warm, 1, 37); tick(dead, 1, 37) }
    addReagent(warm, 'iodine'); addReagent(dead, 'iodine')
    expect(lookOf(warm).correct).toBe('Starch absent')
    expect(lookOf(dead).correct).toBe('Starch present')
  })

  it('cold slows amylase down', () => {
    const cold = emptyTube(); addReagent(cold, 'starch'); addReagent(cold, 'amylase')
    for (let i = 0; i < 60; i++) tick(cold, 1, 10)
    addReagent(cold, 'iodine')
    expect(lookOf(cold).correct).toBe('Starch present')
  })
})

describe('enzyme products', () => {
  it("digested starch gives maltose, so Benedict's turns orange", () => {
    const t = emptyTube(); addReagent(t, 'starch'); addReagent(t, 'amylase')
    for (let i = 0; i < 60; i++) tick(t, 1, 37)
    addReagent(t, 'benedicts'); tick(t, 12, 100)
    expect(lookOf(t).correct).toBe('Much reducing sugars present')
  })
})
