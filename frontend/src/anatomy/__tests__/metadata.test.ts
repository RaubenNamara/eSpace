import { describe, it, expect, vi } from 'vitest'
import { AnatomyIndex, loadManifest, ManifestError, normaliseQuery, describeLocation } from '../metadata'
import { contentFor, contentKey } from '../content'
import { fixtureManifest } from './fixture'

describe('AnatomyIndex - lookups and groups', () => {
  const idx = new AnatomyIndex(fixtureManifest())

  it('finds structures by id', () => {
    expect(idx.structure('FJ2')?.name).toBe('Left femur')
    expect(idx.structure('nope')).toBeNull()
  })

  it('collects the parts of an organ into one group with a combined box', () => {
    const heart = idx.group('circulatory/heart')!
    expect(heart.ids.sort()).toEqual(['FJ4', 'FJ5'])
    expect(heart.name).toBe('Heart')
    expect(heart.size[0]).toBeGreaterThan(0.1) // union of two offset 0.1 m boxes
  })

  it('keeps systems a group also belongs to', () => {
    expect(idx.group('digestive/pancreas')!.systems).toEqual(['digestive', 'endocrine'])
  })

  it('lists structures shown for a set of systems, including shared ones', () => {
    const ids = idx.structuresIn(['endocrine']).map(s => s.id).sort()
    expect(ids).toEqual(['FJ11', 'FJ12', 'FJ13'])
  })
})

describe('AnatomyIndex - selection', () => {
  const idx = new AnatomyIndex(fixtureManifest())

  it('selects the whole organ at school level', () => {
    expect(idx.selectionFor('FJ5', 'school')).toEqual({ scope: 'group', key: 'circulatory/heart', ids: ['FJ4', 'FJ5'] })
  })

  it('selects the single part at advanced level', () => {
    expect(idx.selectionFor('FJ5', 'advanced')).toEqual({ scope: 'structure', key: 'FJ5', ids: ['FJ5'] })
  })

  it('returns null for an unknown mesh', () => {
    expect(idx.selectionFor('FJ999', 'school')).toBeNull()
  })
})

describe('AnatomyIndex - search', () => {
  const idx = new AnatomyIndex(fixtureManifest())

  it('finds an organ by name', () => {
    expect(idx.search('heart')[0]).toMatchObject({ type: 'group', key: 'circulatory/heart', parts: 2 })
  })

  it('ranks the exact name first and ignores case and punctuation', () => {
    expect(idx.search('  LIVER!! ')[0].name).toBe('Liver')
  })

  it('understands British spellings and everyday names', () => {
    expect(idx.search('oesophagus')[0].name).toBe('Esophagus')
    expect(idx.search('thigh bone').map(r => r.name)).toEqual(expect.arrayContaining(['Left femur', 'Right femur']))
  })

  it('needs every word to match', () => {
    expect(idx.search('left femur').map(r => r.name)).toEqual(['Left femur'])
  })

  it('only offers single parts at advanced level', () => {
    expect(idx.search('mitral', 'school')).toEqual([])
    expect(idx.search('mitral', 'advanced')[0]).toMatchObject({ type: 'structure', key: 'FJ4' })
  })

  it('can be limited to systems', () => {
    expect(idx.search('femur', 'school', 10, ['digestive'])).toEqual([])
  })

  it('ignores one-letter queries', () => {
    expect(idx.search('h')).toEqual([])
  })

  it('normalises queries', () => {
    expect(normaliseQuery('Faeces & haemoglobin')).toBe('feces hemoglobin')
  })
})

describe('AnatomyIndex - describe', () => {
  const idx = new AnatomyIndex(fixtureManifest())

  it('gives the written school content for an organ', () => {
    const info = idx.describe({ scope: 'group', key: 'circulatory/heart' }, 'school')!
    expect(info.title).toBe('Heart')
    expect(info.function).toMatch(/pumps blood/i)
    expect(info.facts.length).toBeGreaterThan(0)
    expect(info.advanced.find(a => a.label === 'Modelled parts')?.value).toBe('2')
  })

  it('describes a part as part of its organ, with its FMA id', () => {
    const info = idx.describe({ scope: 'structure', key: 'FJ7' }, 'advanced')!
    expect(info.title).toBe('Right superior bronchopulmonary segment')
    expect(info.summary).toMatch(/^Part of the right lung/)
    expect(info.advanced).toEqual(expect.arrayContaining([{ label: 'FMA id', value: 'FMA7' }, { label: 'Part of', value: 'Right lung' }]))
  })

  it('shows extra detail only at advanced level', () => {
    const school = idx.describe({ scope: 'group', key: 'circulatory/heart' }, 'school')!
    const adv = idx.describe({ scope: 'group', key: 'circulatory/heart' }, 'advanced')!
    expect(school.advanced.some(a => a.label === 'More detail')).toBe(false)
    expect(adv.advanced.some(a => a.label === 'More detail')).toBe(true)
  })

  it('invents nothing for a structure without written content', () => {
    const info = idx.describe({ scope: 'group', key: 'circulatory/aorta' }, 'school')!
    expect(info.title).toBe('Aorta')
    // the aorta does have content; a structure with none falls back to the generic kind text
    const generic = idx.describe({ scope: 'structure', key: 'FJ6' }, 'school')!
    expect(generic.function).toBeTruthy()
  })

  it('returns null for unknown targets', () => {
    expect(idx.describe({ scope: 'group', key: 'x/y' }, 'school')).toBeNull()
  })
})

describe('content keys', () => {
  it('drops the side and folds family names', () => {
    expect(contentKey('Left femur')).toBe('femur')
    expect(contentKey('Inferior vena cava')).toBe('vena-cava')
    expect(contentKey('right-cerebral-hemisphere')).toBe('cerebral-hemisphere')
    expect(contentFor('Right kidney')?.function).toMatch(/urine/)
    expect(contentFor('Some unknown thing')).toBeNull()
  })

  it('gives a rough location from coordinates', () => {
    expect(describeLocation([0.06, 1.25, 0.05], 1.72)).toMatch(/chest, on the body's left side/)
    expect(describeLocation([0, 1.6, 0], 1.72)).toMatch(/head, in the midline/)
  })
})

describe('loadManifest', () => {
  const ok = (body: unknown) => vi.fn(async () => new Response(JSON.stringify(body), { status: 200 })) as unknown as typeof fetch

  it('loads a valid manifest', async () => {
    const m = await loadManifest('/m.json', ok(fixtureManifest()))
    expect(m.structures.length).toBe(fixtureManifest().structures.length)
  })

  it('reports a missing file', async () => {
    const f = vi.fn(async () => new Response('nope', { status: 404 })) as unknown as typeof fetch
    await expect(loadManifest('/m.json', f)).rejects.toThrow(/missing on the server \(HTTP 404\)/)
  })

  it('reports a network failure', async () => {
    const f = vi.fn(async () => { throw new TypeError('Failed to fetch') }) as unknown as typeof fetch
    await expect(loadManifest('/m.json', f)).rejects.toBeInstanceOf(ManifestError)
  })

  it('reports damaged JSON', async () => {
    const f = vi.fn(async () => new Response('{not json', { status: 200 })) as unknown as typeof fetch
    await expect(loadManifest('/m.json', f)).rejects.toThrow(/not valid JSON/)
  })

  it('reports the wrong shape', async () => {
    await expect(loadManifest('/m.json', ok({ hello: 1 }))).rejects.toThrow(/expected format/)
  })
})
