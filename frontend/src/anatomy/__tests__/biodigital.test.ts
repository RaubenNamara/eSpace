import { describe, it, expect } from 'vitest'
import { parseBioDigitalInput, bioDigitalViewerUrl } from '../biodigital'
import { richText } from '../useAnatomyData'

describe('BioDigital embed', () => {
  it('accepts a module id', () => {
    expect(parseBioDigitalInput('production/maleAdult/neonatal_blood_flow')).toEqual({ kind: 'id', value: 'production/maleAdult/neonatal_blood_flow' })
  })

  it('accepts human.biodigital.com links', () => {
    expect(parseBioDigitalInput('https://human.biodigital.com/view?id=production/maleAdult/abdomen_wall_quiz&lang=en')).toEqual({ kind: 'id', value: 'production/maleAdult/abdomen_wall_quiz' })
    expect(parseBioDigitalInput('https://human.biodigital.com/widget/?be=2Ndt')).toEqual({ kind: 'be', value: '2Ndt' })
  })

  it('refuses other sites, plain http and junk', () => {
    expect(parseBioDigitalInput('https://evil.example.com/view?id=production/maleAdult/heart')).toBeNull()
    expect(parseBioDigitalInput('http://human.biodigital.com/view?id=production/maleAdult/heart')).toBeNull()
    expect(parseBioDigitalInput('javascript:alert(1)')).toBeNull()
    expect(parseBioDigitalInput('heart')).toBeNull()
    expect(parseBioDigitalInput('')).toBeNull()
    expect(parseBioDigitalInput('https://human.biodigital.com/view?id=../../etc"><script>')).toBeNull()
  })

  it('builds the viewer URL with the developer key', () => {
    const u = new URL(bioDigitalViewerUrl({ kind: 'id', value: 'production/maleAdult/heart' }, 'KEY123'))
    expect(u.origin).toBe('https://human.biodigital.com')
    expect(u.searchParams.get('id')).toBe('production/maleAdult/heart')
    expect(u.searchParams.get('dk')).toBe('KEY123')
  })
})

describe('richText', () => {
  it('splits bold segments without HTML', () => {
    expect(richText('The **heart** pumps <b>')).toEqual([{ text: 'The ', bold: false }, { text: 'heart', bold: true }, { text: ' pumps <b>', bold: false }])
  })
})
