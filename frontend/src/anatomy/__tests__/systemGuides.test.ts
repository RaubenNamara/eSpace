// @vitest-environment node
import { describe, it, expect } from 'vitest'
import fs from 'node:fs'
import path from 'node:path'
import { GUIDES, guideFor } from '../systemGuides'
import { SYSTEMS } from '../systems'
import { AnatomyIndex } from '../metadata'
import type { EffectSpec } from '../effects'
import { LIVING } from '../living'
import type { AnatomyManifest } from '../types'

const manifest = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../../../public/anatomy/bodyparts3d/manifest.json'), 'utf8')) as AnatomyManifest
const index = new AnatomyIndex(manifest)
const names = new Set(manifest.structures.map(s => s.name))

/** everything an effect refers to, as problems */
function problems(e: EffectSpec, where: string): string[] {
  const out: string[] = []
  switch (e.type) {
    case 'all': for (const x of e.effects) out.push(...problems(x, where)); break
    case 'heartbeat': if (!manifest.structures.some(s => e.structures.test(s.name))) out.push(`${where}: heartbeat matches nothing`); break
    case 'flow': if (!names.has(e.origin)) out.push(`${where}: flow origin ${e.origin}`); break
    case 'breathe': for (const g of e.lungs) if (!index.group(g)) out.push(`${where}: ${g}`); if (!names.has(e.diaphragm)) out.push(`${where}: ${e.diaphragm}`); break
    case 'travel': for (const p of e.path) if ('at' in p && !names.has(p.at)) out.push(`${where}: path point ${p.at}`); break
    case 'hinge':
      if (!names.has(e.pivotOf)) out.push(`${where}: pivot ${e.pivotOf}`)
      if (!manifest.structures.some(s => e.moving(s))) out.push(`${where}: nothing moves`)
      if (e.contract && !manifest.structures.some(s => e.contract!.test(s.name))) out.push(`${where}: contract matches nothing`)
      break
    case 'glow': for (const g of e.groups) for (const k of g) if (!index.group(k)) out.push(`${where}: glow ${k}`); break
    case 'fill': if (!names.has(e.structure)) out.push(`${where}: fill ${e.structure}`); break
    case 'cut': if (!index.group(e.group)) out.push(`${where}: cut ${e.group}`); break
    case 'wobble': if (!names.has(e.structure)) out.push(`${where}: wobble ${e.structure}`); break
  }
  return out
}

describe('system guides', () => {
  it('cover every body system once', () => {
    expect(GUIDES.map(g => g.key).sort()).toEqual(SYSTEMS.map(s => s.key).sort())
    expect(guideFor('circulatory')?.steps.length).toBeGreaterThan(0)
  })

  it('refer only to organs and structures in the model', () => {
    const out: string[] = []
    for (const g of GUIDES) {
      for (const k of g.parts) if (!index.group(k)) out.push(`${g.key} part ${k}`)
      for (const s of g.steps) {
        for (const k of [...(s.highlight ?? []), ...(s.focus ?? [])]) if (!index.group(k)) out.push(`${g.key} highlight/focus ${k}`)
        for (const l of s.labels ?? []) if (l.group ? !index.group(l.group) : !manifest.structures.some(x => l.match!.test(x.name))) out.push(`${g.key} label ${l.name}`)
        if (s.effect) out.push(...problems(s.effect, `${g.key} / ${s.title}`))
      }
    }
    expect(out).toEqual([])
  })

  it('give a caption for every stage an animation reaches', () => {
    for (const g of GUIDES) for (const s of g.steps) {
      const stages: number[] = []
      const collect = (e: EffectSpec) => { if (e.type === 'all') e.effects.forEach(collect); if (e.type === 'travel') e.path.forEach(p => stages.push(p.stage)); if (e.type === 'glow') e.groups.forEach((_, i) => stages.push(i)) }
      if (s.effect) collect(s.effect)
      if (stages.length) expect(s.captions?.length ?? 0, `${g.key} / ${s.title}`).toBeGreaterThan(Math.max(...stages))
    }
  })

  it('living body: every animation and focus points at real structures', () => {
    const out: string[] = []
    for (const [key, l] of Object.entries(LIVING)) {
      for (const e of l!.specs) out.push(...problems(e, `living ${key}`))
      for (const k of l!.focus ?? []) if (!index.group(k)) out.push(`living ${key} focus ${k}`)
      // a flow must find something to animate
      for (const e of l!.specs) if (e.type === 'flow') {
        const n = manifest.structures.filter(st => (!e.kinds || e.kinds.includes(st.kind)) && (!e.names || e.names.test(st.name))).length
        if (!n) out.push(`living ${key}: flow matches nothing`)
      }
    }
    expect(out).toEqual([])
  })
})
