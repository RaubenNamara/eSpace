import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'
import AnatomySearch from '../AnatomySearch.vue'
import AnatomySystemSelector from '../AnatomySystemSelector.vue'
import AnatomyDetailsPanel from '../AnatomyDetailsPanel.vue'
import AnatomyLoadingState from '../AnatomyLoadingState.vue'
import AnatomyErrorState from '../AnatomyErrorState.vue'
import { AnatomyIndex } from '@/anatomy/metadata'
import { fixtureManifest } from '@/anatomy/__tests__/fixture'

const index = new AnatomyIndex(fixtureManifest())

describe('AnatomySearch', () => {
  it('lists matches and selects one with the keyboard', async () => {
    const w = mount(AnatomySearch, { props: { index, level: 'school' } })
    const input = w.find('input')
    await input.trigger('focus')
    await input.setValue('femur')
    const options = w.findAll('[role=option]')
    expect(options.map(o => o.text())).toEqual(expect.arrayContaining([expect.stringContaining('Left femur')]))
    await input.trigger('keydown', { key: 'ArrowDown' })
    await input.trigger('keydown', { key: 'Enter' })
    const ev = w.emitted('select')![0][0] as { name: string }
    expect(ev.name).toMatch(/femur/)
  })

  it('says when nothing matches', async () => {
    const w = mount(AnatomySearch, { props: { index, level: 'school' } })
    await w.find('input').trigger('focus')
    await w.find('input').setValue('zzzz')
    expect(w.text()).toContain('No structure called')
  })

  it('hides systems it is told to hide (age-appropriate setting)', async () => {
    const w = mount(AnatomySearch, { props: { index, level: 'school', hidden: ['reproductive'] } })
    await w.find('input').trigger('focus')
    await w.find('input').setValue('testis')
    expect(w.findAll('[role=option]').length).toBe(0)
  })
})

describe('AnatomySystemSelector', () => {
  it('disables systems with no model and says so', () => {
    const w = mount(AnatomySystemSelector, { props: { modelValue: ['skeletal'], manifest: fixtureManifest(), states: {}, showSensitive: false } })
    const muscular = w.find('input[aria-describedby="sys-note-muscular"]')
    expect((muscular.element as HTMLInputElement).disabled).toBe(true)
    expect(w.find('#sys-note-muscular').text()).toMatch(/Not available/)
  })

  it('toggles systems and shows the age-appropriate switch only for the reproductive system', async () => {
    const w = mount(AnatomySystemSelector, { props: { modelValue: ['skeletal'], manifest: fixtureManifest(), states: {}, showSensitive: false } })
    await w.find('input[aria-describedby="sys-note-reproductive"]').setValue(true)
    expect(w.emitted('update:modelValue')![0][0]).toEqual(['skeletal', 'reproductive'])
    await w.setProps({ modelValue: ['skeletal', 'reproductive'] })
    expect(w.text()).toContain('Show the reproductive organs')
  })

  it('shows load failures with a retry', async () => {
    const w = mount(AnatomySystemSelector, { props: { modelValue: ['skeletal'], manifest: fixtureManifest(), states: { skeletal: { status: 'error', message: 'x' } }, showSensitive: false } })
    expect(w.text()).toContain('failed')
    await w.find('button:not([class*="rounded-md"])').trigger('click')
    expect(w.emitted('retry')![0]).toEqual(['skeletal'])
  })
})

describe('AnatomyDetailsPanel', () => {
  it('shows name, function, location and facts for a selection', () => {
    const info = index.describe({ scope: 'group', key: 'digestive/liver' }, 'school')
    const w = mount(AnatomyDetailsPanel, { props: { info, level: 'school' } })
    expect(w.find('h2').text()).toBe('Liver')
    expect(w.text()).toContain('Function')
    expect(w.text()).toContain('Location')
    expect(w.text()).toContain('Facts')
  })

  it('emits clear, focus and full view', async () => {
    const info = index.describe({ scope: 'group', key: 'digestive/liver' }, 'school')
    const w = mount(AnatomyDetailsPanel, { props: { info, level: 'school' } })
    await w.find('button[aria-label="Clear selection"]').trigger('click')
    await w.find('button:nth-of-type(1)').trigger('click')
    const buttons = w.findAll('button')
    await buttons.find(b => b.text() === 'Zoom to it')!.trigger('click')
    await buttons.find(b => b.text() === 'Return to full view')!.trigger('click')
    expect(w.emitted('clear')).toBeTruthy()
    expect(w.emitted('focus')).toBeTruthy()
    expect(w.emitted('full-view')).toBeTruthy()
  })

  it('explains how to start when nothing is selected', () => {
    const w = mount(AnatomyDetailsPanel, { props: { info: null, level: 'school' } })
    expect(w.text()).toContain('Nothing selected')
  })
})

describe('loading and error states', () => {
  it('shows overall progress while systems load and nothing when done', async () => {
    const w = mount(AnatomyLoadingState, { props: { states: { skeletal: { status: 'loading', progress: 0.5 }, nervous: { status: 'ready' } } } })
    expect(w.text()).toMatch(/Loading skeletal system/i)
    expect(w.text()).toContain('50%')
    await w.setProps({ states: { skeletal: { status: 'ready' } } })
    await nextTick()
    expect(w.text()).toBe('')
  })

  it('offers a retry', async () => {
    const w = mount(AnatomyErrorState, { props: { message: 'The model file is missing.', retryable: true } })
    await w.find('button').trigger('click')
    expect(w.emitted('retry')).toBeTruthy()
    expect(w.attributes('role')).toBe('alert')
  })
})
