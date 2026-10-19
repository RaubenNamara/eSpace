import { describe, it, expect } from 'vitest'
import * as THREE from 'three'
import { buildFemaleDiagram, diagramPartAt } from '../diagrams/femaleReproductive'
import { contentFor } from '../content'

describe('female reproductive 3D diagram', () => {
  const d = buildFemaleDiagram()
  const parts = new Set<string>()
  d.root.traverse(o => { if ((o as THREE.Mesh).isMesh) parts.add(o.userData.part) })

  it('has every part of the textbook diagram, both sides', () => {
    for (const p of ['uterus', 'vagina', 'left-ovary', 'right-ovary', 'left-uterine-tube', 'right-uterine-tube']) expect(parts.has(p), p).toBe(true)
    expect(d.parts.map(p => p.name)).toEqual(expect.arrayContaining(['Fallopian tube', 'Ovary', 'Uterus', 'Cervix', 'Vagina']))
  })

  it('is roughly life size and symmetric', () => {
    const box = new THREE.Box3().setFromObject(d.root)
    const size = box.getSize(new THREE.Vector3())
    expect(size.x).toBeGreaterThan(0.17) // tubes and ovaries span ~20 cm
    expect(size.x).toBeLessThan(0.25)
    expect(size.y).toBeGreaterThan(0.14) // vagina to the top of the tubes
    expect(Math.abs(box.min.x + box.max.x)).toBeLessThan(0.01)
  })

  it('is cut open: nothing of the uterus or vagina lies in front of the cut', () => {
    d.root.traverse((o) => {
      const m = o as THREE.Mesh
      if (!m.isMesh || !['uterus', 'vagina'].includes(m.userData.part)) return
      m.geometry.computeBoundingBox()
      expect(m.geometry.boundingBox!.max.z + m.position.z).toBeLessThan(0.001)
    })
  })

  it('counts a click low on the uterus as the cervix', () => {
    const mesh = d.root.children.find(o => o.userData.part === 'uterus') as THREE.Mesh
    expect(diagramPartAt({ object: mesh, point: new THREE.Vector3(0, 0.01, 0), distance: 1 } as unknown as THREE.Intersection)).toBe('cervix')
    expect(diagramPartAt({ object: mesh, point: new THREE.Vector3(0, 0.05, 0), distance: 1 } as unknown as THREE.Intersection)).toBe('uterus')
  })

  it('has school text for every labelled part', () => {
    for (const k of ['uterus', 'cervix', 'vagina', 'ovary', 'uterine-tube']) expect(contentFor(k), k).not.toBeNull()
  })

  it('has an egg path from the ovary into the uterus', () => {
    expect(d.eggPath.getPointAt(0).x).toBeGreaterThan(0.06)
    expect(Math.abs(d.eggPath.getPointAt(1).x)).toBeLessThan(0.01)
  })

  it('frees everything', () => {
    const g = new THREE.Group(); g.add(d.root)
    d.dispose()
    expect(d.root.parent).toBeNull()
  })
})
