// @vitest-environment node
// Checks the generated assets in public/anatomy/bodyparts3d agree with each other.
import { describe, it, expect } from 'vitest'
import fs from 'node:fs'
import path from 'node:path'
import type { AnatomyManifest, SystemKey } from '../types'
import { SYSTEMS } from '../systems'

const DIR = path.resolve(__dirname, '../../../public/anatomy/bodyparts3d')
const manifest = JSON.parse(fs.readFileSync(path.join(DIR, 'manifest.json'), 'utf8')) as AnatomyManifest

/** names of the nodes in a .glb (from its JSON chunk) */
function glbNodeNames(file: string) {
  const b = fs.readFileSync(path.join(DIR, file))
  expect(b.readUInt32LE(0)).toBe(0x46546c67) // "glTF"
  const len = b.readUInt32LE(12)
  const json = JSON.parse(b.subarray(20, 20 + len).toString('utf8')) as { nodes: { name?: string }[]; extensionsUsed?: string[] }
  return { names: json.nodes.map(n => n.name).filter((n): n is string => !!n), extensions: json.extensionsUsed ?? [] }
}

describe('generated anatomy assets', () => {
  it('credits the source under its licence', () => {
    expect(manifest.source.name).toBe('BodyParts3D')
    expect(manifest.source.licence).toBe('CC BY 4.0')
    expect(manifest.source.attribution).toMatch(/Database Center for Life Science/)
  })

  it('has unique structure ids and only known systems', () => {
    const ids = manifest.structures.map(s => s.id)
    expect(new Set(ids).size).toBe(ids.length)
    const known = new Set(SYSTEMS.map(s => s.key))
    for (const s of manifest.structures) {
      expect(known.has(s.system)).toBe(true)
      for (const a of s.also) expect(known.has(a)).toBe(true)
    }
  })

  it('has one named node in the right GLB for every structure, and nothing extra', () => {
    for (const [system, asset] of Object.entries(manifest.systems) as [SystemKey, NonNullable<AnatomyManifest['systems'][SystemKey]>][]) {
      if (!asset.file) continue
      const { names, extensions } = glbNodeNames(asset.file)
      const expected = manifest.structures.filter(s => s.system === system).map(s => s.id).sort()
      expect(names.sort()).toEqual(expected)
      expect(asset.count).toBe(expected.length)
      // compressed with meshopt; three.js decodes it with MeshoptDecoder
      expect(extensions).toContain('EXT_meshopt_compression')
    }
  })

  it('keeps every system file small enough to load on a school connection', () => {
    for (const asset of Object.values(manifest.systems)) {
      if (asset?.file) expect(fs.statSync(path.join(DIR, asset.file)).size).toBeLessThan(6_000_000)
    }
  })

  it('has a body of adult height standing on y = 0', () => {
    expect(manifest.height).toBeGreaterThan(1.6)
    expect(manifest.height).toBeLessThan(1.9)
    const skin = manifest.structures.find(s => s.name === 'Skin' && !s.cover)!
    expect(skin.centre[1] - skin.size[1] / 2).toBeCloseTo(0, 2)
  })

  it('has female reproductive organs, credited, and one sex per reproductive organ', async () => {
    const { AnatomyIndex } = await import('../metadata')
    const idx = new AnatomyIndex(manifest)
    for (const g of ['reproductive/uterus', 'reproductive/left-ovary', 'reproductive/right-ovary', 'reproductive/left-uterine-tube', 'reproductive/right-uterine-tube']) {
      expect(idx.group(g), g).not.toBeNull()
      expect(idx.sexOf(g)).toBe('female')
      expect(idx.fitsSex(g, 'male')).toBe(false)
    }
    expect(idx.sexOf('reproductive/prostate')).toBe('male')
    expect(idx.fitsSex('digestive/liver', 'female')).toBe(true)
    // the ovaries also count as endocrine glands
    expect(idx.group('reproductive/left-ovary')!.systems).toContain('endocrine')
    expect(manifest.extraSources?.some(x => x.licence === 'CC BY 4.0' && /Human Reference Atlas/.test(x.name))).toBe(true)
    // placed in the pelvis, above the bottom of the bladder and within the hip bones' width
    const uterus = idx.group('reproductive/uterus')!
    expect(uterus.centre[1]).toBeGreaterThan(0.85)
    expect(uterus.centre[1]).toBeLessThan(1.0)
    expect(Math.abs(uterus.centre[0])).toBeLessThan(0.05)
  })

  it('separates the genital skin and its smooth cover for the age-appropriate setting', () => {
    expect(manifest.structures.filter(s => s.cover)).toHaveLength(1)
    expect(manifest.structures.find(s => s.name === 'Skin of the external genitalia')?.system).toBe('reproductive')
  })
})
