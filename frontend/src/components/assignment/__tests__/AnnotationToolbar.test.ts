import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import AnnotationToolbar from '../AnnotationToolbar.vue'

const mountBar = (variant: 'marking' | 'author') =>
  mount(AnnotationToolbar, { props: { variant, tool: 'pen', color: '#dc2626', strokeWidth: 2 } })

const titles = (w: ReturnType<typeof mountBar>) => w.findAll('button.tool-btn').map(b => b.attributes('title'))

describe('AnnotationToolbar - marking', () => {
  it('offers only the marking tools, then undo, redo, clear selected and delete', () => {
    expect(titles(mountBar('marking'))).toEqual([
      'Select', 'Pen', 'Eraser', 'Tick / Correct', 'Cross / Incorrect', 'Underline', 'Text',
      'Undo', 'Redo', 'Clear Selected', 'Delete all marks on this page',
    ])
  })

  it('has red, blue and green ink only, as small dots after the delete button', () => {
    const w = mountBar('marking')
    const colours = w.findAll('button.color-btn')
    expect(colours.map(b => b.attributes('title'))).toEqual(['#dc2626', '#2563eb', '#16a34a'])
    expect(colours.every(b => b.classes('color-btn--small'))).toBe(true)
    // in document order, every colour comes after the delete button
    const order = w.findAll('button').map(b => b.attributes('title'))
    expect(order.indexOf('#dc2626')).toBeGreaterThan(order.indexOf('Delete all marks on this page'))
    expect(order.at(-1)).toBe('#16a34a')
  })

  it('has no size control: marking keeps a fixed 2px line', () => {
    const w = mountBar('marking')
    expect(w.find('input[type=range]').exists()).toBe(false)
    expect(w.emitted('update:strokeWidth')).toBeUndefined()
  })

  it('emits the chosen tool, colour, undo and delete', async () => {
    const w = mountBar('marking')
    await w.find('button[title="Tick / Correct"]').trigger('click')
    await w.find('button[title="#16a34a"]').trigger('click')
    await w.find('button[title="Undo"]').trigger('click')
    await w.find('button[title="Clear Selected"]').trigger('click')
    await w.find('button[title="Delete all marks on this page"]').trigger('click')
    expect(w.emitted('update:tool')?.[0]).toEqual(['tick'])
    expect(w.emitted('update:color')?.[0]).toEqual(['#16a34a'])
    expect(w.emitted('undo')).toHaveLength(1)
    expect(w.emitted('clear-selected')).toHaveLength(1)
    expect(w.emitted('clear-all')).toHaveLength(1)
  })

  it('leaves the author toolbar as it was', () => {
    const t = titles(mountBar('author'))
    expect(t).toContain('Select')
    expect(t).toContain('Comment')
    expect(t).toContain('Clear Selected')
    expect(mountBar('author').findAll('button.color-btn')).toHaveLength(7)
    expect(mountBar('author').find('input[type=range]').exists()).toBe(true)
  })
})
