// @vitest-environment node
import { describe, it, expect } from 'vitest'
import fs from 'node:fs'
import path from 'node:path'
import { MODULES, moduleById } from '../modules'
import { AnatomyIndex } from '../metadata'
import { systemAvailability } from '../systems'
import type { AnatomyManifest } from '../types'

const manifest = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../../../public/anatomy/bodyparts3d/manifest.json'), 'utf8')) as AnatomyManifest
const index = new AnatomyIndex(manifest)

describe('anatomy modules', () => {
  it('have unique ids and content', () => {
    expect(new Set(MODULES.map(m => m.id)).size).toBe(MODULES.length)
    for (const m of MODULES) expect((m.steps?.length ?? 0) + (m.quiz?.length ?? 0)).toBeGreaterThan(0)
    expect(moduleById('heart')?.title).toMatch(/heart/i)
    expect(moduleById('nope')).toBeNull()
  })

  it('only point at organs that exist in the model', () => {
    const missing: string[] = []
    for (const m of MODULES) {
      for (const s of m.steps ?? []) for (const k of [...(s.highlight ?? []), ...(s.labels ?? []), ...(s.focus ?? [])]) if (!index.group(k)) missing.push(`${m.id}: ${k}`)
      for (const q of m.quiz ?? []) {
        // every answer key must exist: a quiz must never ask for something that is not there
        for (const k of q.answer) if (!index.group(k)) missing.push(`${m.id} quiz: ${k}`)
      }
    }
    expect(missing).toEqual([])
  })

  it('only use systems that have models', () => {
    for (const m of MODULES) {
      for (const s of [...(m.steps ?? []), ...(m.quiz ?? [])]) for (const sys of s.systems) expect(systemAvailability(manifest, sys), `${m.id} ${sys}`).toBe('available')
    }
  })

  it('show each highlighted organ in a system that is switched on', () => {
    for (const m of MODULES) for (const s of m.steps ?? []) for (const k of s.highlight ?? []) {
      const g = index.group(k)!
      expect(g.systems.some(x => s.systems.includes(x)), `${m.id} / ${s.title}: ${k}`).toBe(true)
    }
    for (const m of MODULES) for (const q of m.quiz ?? []) for (const k of q.answer) {
      const g = index.group(k)!
      expect(g.systems.some(x => q.systems.includes(x)), `${m.id} quiz: ${k}`).toBe(true)
    }
  })
})
