import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import AnatomySystemStructures from '../AnatomySystemStructures.vue'
import { AnatomyIndex } from '@/anatomy/metadata'
import { regionOf } from '@/anatomy/regions'
import { fixtureManifest } from '@/anatomy/__tests__/fixture'

const index = new AnatomyIndex(fixtureManifest())

describe('regionOf', () => {
  it('places structures in body regions', () => {
    expect(regionOf([0, 1.6, 0], 1.72)).toBe('Head')
    expect(regionOf([0.02, 1.25, 0], 1.72)).toBe('Chest')
    expect(regionOf([0, 1.0, 0], 1.72)).toBe('Abdomen')
    expect(regionOf([0.1, 0.65, 0], 1.72)).toBe('Legs & feet')
    expect(regionOf([0.25, 1.0, 0], 1.72)).toBe('Arms & hands')
  })
})

describe('AnatomySystemStructures', () => {
  it('lists every structure of the system, grouped by region, with a count', () => {
    const w = mount(AnatomySystemStructures, { props: { index, system: 'skeletal', selectedKey: null, showSensitive: false } })
    expect(w.text()).toContain('(2)')
    expect(w.text()).toContain('Legs & feet')
    expect(w.findAll('li button').map(b => b.text())).toEqual(['Left femur', 'Right femur'])
  })

  it('filters by name and emits the chosen structure', async () => {
    const w = mount(AnatomySystemStructures, { props: { index, system: 'digestive', selectedKey: null, showSensitive: false } })
    await w.find('input').setValue('liver')
    const buttons = w.findAll('li button')
    expect(buttons.map(b => b.text())).toEqual(['Liver'])
    await buttons[0].trigger('click')
    expect(w.emitted('select')![0]).toEqual(['digestive/liver'])
  })

  it('shows multi-part organs with their part count', () => {
    const w = mount(AnatomySystemStructures, { props: { index, system: 'circulatory', selectedKey: null, showSensitive: false } })
    expect(w.text()).toContain('2 parts')
  })

  it('keeps reproductive structures out unless allowed', () => {
    const off = mount(AnatomySystemStructures, { props: { index, system: 'endocrine', selectedKey: null, showSensitive: false } })
    expect(off.text()).not.toContain('testis')
    const on = mount(AnatomySystemStructures, { props: { index, system: 'endocrine', selectedKey: null, showSensitive: true } })
    expect(on.text()).toContain('Right testis')
  })
})
