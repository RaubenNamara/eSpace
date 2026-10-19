// @vitest-environment node
import { describe, it, expect, beforeAll } from 'vitest'
import fs from 'node:fs'
import path from 'node:path'
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { MeshoptDecoder } from 'three/examples/jsm/libs/meshopt_decoder.module.js'
import {
  PHASES, phaseAt, atrialContraction, ventricularContraction, avValveOpen, semilunarValveOpen, flowRate, type FlowSegment,
} from '../heart/heartCycle'
import { HEART_PARTS, ANCHORS, partForName } from '../heart/heartParts'
import { HeartMode } from '../heart/heartMode'
import { AnatomyIndex } from '../metadata'
import { structureIdOf } from '../loader'
import type { AnatomyEngine } from '../engine'
import type { AnatomyManifest } from '../types'

const DIR = path.resolve(__dirname, '../../../public/anatomy/bodyparts3d')
const manifest = JSON.parse(fs.readFileSync(path.join(DIR, 'manifest.json'), 'utf8')) as AnatomyManifest
const index = new AnatomyIndex(manifest)
const circulatory = manifest.structures.filter(s => s.system === 'circulatory')
const samples = Array.from({ length: 1000 }, (_, i) => i / 1000)

describe('cardiac cycle', () => {
  it('phases cover one beat with no gaps, in textbook order', () => {
    expect(PHASES[0].start).toBe(0)
    expect(PHASES[PHASES.length - 1].end).toBe(1)
    for (let i = 1; i < PHASES.length; i++) expect(PHASES[i].start).toBe(PHASES[i - 1].end)
    expect(PHASES.map(p => p.key)).toEqual(['atrial-systole', 'isovolumetric-contraction', 'ejection', 'isovolumetric-relaxation', 'filling'])
  })

  it('the AV and semilunar valves are never open at the same time', () => {
    for (const c of samples) expect(Math.min(avValveOpen(c), semilunarValveOpen(c))).toBeLessThan(0.02)
  })

  it('all four valves are shut in the isovolumetric phases', () => {
    for (const k of ['isovolumetric-contraction', 'isovolumetric-relaxation']) {
      const p = PHASES.find(x => x.key === k)!
      const mid = (p.start + p.end) / 2
      expect(avValveOpen(mid)).toBeLessThan(0.05)
      expect(semilunarValveOpen(mid)).toBeLessThan(0.05)
    }
  })

  it('the atria contract only in atrial systole; the ventricles are contracted while they eject', () => {
    for (const c of samples) if (phaseAt(c).key !== 'atrial-systole') expect(atrialContraction(c)).toBe(0)
    const ej = PHASES.find(x => x.key === 'ejection')!
    expect(ventricularContraction((ej.start + ej.end) / 2)).toBeGreaterThan(0.9)
    expect(ventricularContraction(0.85)).toBeLessThan(0.01)
    expect(avValveOpen(0.85)).toBeGreaterThan(0.99)
    expect(semilunarValveOpen((ej.start + ej.end) / 2)).toBeGreaterThan(0.99)
  })

  it('blood never flows backwards', () => {
    const segs: FlowSegment[] = ['vein', 'atrium', 'ventricle-in', 'ventricle-out', 'artery']
    for (const c of samples) for (const s of segs) expect(flowRate(c, s)).toBeGreaterThanOrEqual(0)
  })
})

describe('heart parts', () => {
  it('every part (except the septa, found from the walls) matches structures in the model', () => {
    for (const p of HEART_PARTS) {
      if (p.kind === 'septum') { expect(p.regions?.length).toBeTruthy(); continue }
      expect(circulatory.some(s => p.match.test(s.name)), p.key).toBe(true)
    }
  })

  it('has the right number of leaflets and cusps for each valve', () => {
    const count = (key: string) => circulatory.filter(s => partForName(s.name)?.key === key).length
    expect(count('tricuspid-valve')).toBe(3)
    expect(count('mitral-valve')).toBe(2)
    expect(count('pulmonary-valve')).toBe(3)
    expect(count('aortic-valve')).toBe(3)
  })

  it('every structure of the heart belongs to a part (the ventricle wall is split by region)', () => {
    for (const s of circulatory.filter(x => x.group === 'heart')) {
      if (s.name === ANCHORS.ventricleWall) continue
      expect(partForName(s.name), s.name).not.toBeNull()
    }
  })

  it('names every anchor the close-up measures from', () => {
    const names = new Set(manifest.structures.map(s => s.name))
    for (const v of Object.values(ANCHORS)) for (const n of Array.isArray(v) ? v : [v]) expect(names.has(n), n).toBe(true)
  })

  it('pulmonary arteries carry oxygen-poor blood and pulmonary veins oxygen-rich', () => {
    expect(partForName('Left pulmonary artery')?.blood).toBe('poor')
    expect(partForName('Right superior pulmonary vein')?.blood).toBe('rich')
    expect(partForName('Arch of aorta')?.blood).toBe('rich')
    expect(partForName('Superior vena cava')?.blood).toBe('poor')
  })
})

/** the real circulatory model, with just enough of an engine around it */
describe('heart close-up on the real model', () => {
  let heart: HeartMode
  let meshes: Map<string, THREE.Mesh>
  let calls: { only: Set<string> | null; overrides: Map<string, THREE.Material | null> }

  beforeAll(async () => {
    await MeshoptDecoder.ready
    const buf = fs.readFileSync(path.join(DIR, 'circulatory.glb'))
    const loader = new GLTFLoader().setMeshoptDecoder(MeshoptDecoder)
    const gltf = await loader.parseAsync(buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength), '')
    const scene = new THREE.Scene()
    scene.add(gltf.scene)
    scene.updateMatrixWorld(true)
    meshes = new Map()
    gltf.scene.traverse(o => { const m = o as THREE.Mesh; if (m.isMesh) { const id = structureIdOf(m); if (id) meshes.set(id, m) } })
    calls = { only: null, overrides: new Map() }
    const camera = new THREE.PerspectiveCamera(35, 1.5, 0.01, 50)
    const engine = {
      meshOf: (id: string) => meshes.get(id) ?? null,
      nodeOf: (id: string) => meshes.get(id)?.parent ?? null,
      view: { scene, camera, controls: { minDistance: 0.12, target: new THREE.Vector3() }, onBeforeFrame: () => () => {}, requestRender: () => {}, flyTo: () => {} },
      setHoverHighlight: () => {},
      setOnly: (ids: Iterable<string> | null) => { calls.only = ids ? new Set(ids) : null },
      setOverrides: (m: Map<string, THREE.Material | null>) => { for (const [k, v] of m) calls.overrides.set(k, v) },
      setAnimating: () => {},
      addObject: (o: THREE.Object3D) => scene.add(o),
      removeObject: (o: THREE.Object3D) => o.removeFromParent(),
    } as unknown as AnatomyEngine
    heart = new HeartMode(engine, index)
  }, 60000)

  it('shows the heart and its great vessels, not the rest of the body', () => {
    const names = [...calls.only!].map(id => index.structure(id)!.name)
    for (const n of ['Wall of ventricle', 'Wall of left atrium', 'Ascending aorta', 'Superior vena cava', 'Pulmonary trunk', 'Trunk of right coronary artery']) expect(names).toContain(n)
    expect(names).not.toContain('Abdominal aorta')
    // from outside, what is inside the walls is hidden
    expect(names.some(n => n.startsWith('Cavity of') || /leaflet|cusp|papillary/.test(n))).toBe(false)
  })

  it('finds the septum between the ventricles and splits each click on the wall correctly', () => {
    const wall = [...meshes].find(([id]) => index.structure(id)?.name === 'Wall of ventricle')!
    const lv = index.manifest.structures.find(s => s.name === 'Cavity of left ventricle')!
    const rv = index.manifest.structures.find(s => s.name === 'Cavity of right ventricle')!
    // a point between the two cavity centres lies in the septum
    const mid = new THREE.Vector3(...lv.centre).lerp(new THREE.Vector3(...rv.centre), 0.5)
    expect(heart.partAt(wall[0], mid)).toBe('interventricular-septum')
    // the far side of each ventricle is its own wall
    const lvFar = new THREE.Vector3(...lv.centre).add(new THREE.Vector3(...lv.centre).sub(new THREE.Vector3(...rv.centre)).setLength(0.03))
    expect(heart.partAt(wall[0], lvFar)).toBe('left-ventricle')
    const rvFar = new THREE.Vector3(...rv.centre).add(new THREE.Vector3(...rv.centre).sub(new THREE.Vector3(...lv.centre)).setLength(0.03))
    expect(heart.partAt(wall[0], rvFar)).toBe('right-ventricle')
  })

  it('frames the whole heart: every heart vertex is inside the camera view', () => {
    const pose = heart.framePose()
    const cam = new THREE.PerspectiveCamera(35, 1.5, 0.01, 50)
    cam.position.copy(pose.position); cam.lookAt(pose.target); cam.updateMatrixWorld(); cam.updateProjectionMatrix()
    const v = new THREE.Vector3()
    for (const [id, m] of meshes) {
      if (index.structure(id)?.group !== 'heart') continue
      const p = m.geometry.attributes.position
      for (let i = 0; i < p.count; i += 7) {
        v.fromBufferAttribute(p, i).applyMatrix4(m.matrixWorld).project(cam)
        expect(Math.abs(v.x)).toBeLessThan(1)
        expect(Math.abs(v.y)).toBeLessThan(1)
      }
    }
  })

  it('labels the four chambers and the great vessels from outside; valves only inside', () => {
    const outside = heart.labels().map(l => l.key)
    for (const k of ['right-atrium', 'right-ventricle', 'left-atrium', 'left-ventricle', 'aorta', 'superior-vena-cava']) expect(outside).toContain(k)
    expect(outside).not.toContain('mitral-valve')
    heart.setView('internal')
    const inside = heart.labels().map(l => l.key)
    for (const k of ['tricuspid-valve', 'mitral-valve', 'interventricular-septum']) expect(inside).toContain(k)
    expect([...calls.only!].some(id => index.structure(id)!.name.startsWith('Cavity of'))).toBe(true)
    heart.setView('external')
  })

  it('moves the valves with the beat: AV leaflets shut and cusps open during ejection, the reverse while filling', () => {
    const nodeOf = (name: string) => [...meshes].find(([id]) => index.structure(id)?.name === name)![1].parent!
    const mitral = nodeOf('Anterior leaflet of mitral valve'), aortic = nodeOf('Anterior cusp of aortic valve')
    const I = new THREE.Matrix4()
    // BodyParts3D models the AV leaflets open and the cusps shut: that is the filling pose
    heart.setCycle(0.85)
    expect(mitral.matrix.equals(I)).toBe(true)
    expect(aortic.matrix.equals(I)).toBe(true)
    heart.setCycle(0.33)
    expect(mitral.matrix.equals(I)).toBe(false)
    expect(aortic.matrix.equals(I)).toBe(false)
    // the shut mitral leaflet swings back up towards the atrium (against the base-to-apex axis)
    const s = index.manifest.structures.find(x => x.name === 'Anterior leaflet of mitral valve')!
    const c = new THREE.Vector3(...s.centre)
    const moved = c.clone().applyMatrix4(mitral.matrix).sub(c)
    const lv = new THREE.Vector3(...index.manifest.structures.find(x => x.name === 'Cavity of left ventricle')!.centre)
    expect(moved.length()).toBeGreaterThan(0.005)
    expect(moved.dot(lv.clone().sub(c))).toBeLessThan(0)
  })

  it('puts every node back when it closes', () => {
    heart.setCycle(0.3)
    heart.dispose()
    for (const m of meshes.values()) { expect(m.parent!.matrix.equals(new THREE.Matrix4())).toBe(true); expect(m.parent!.matrixAutoUpdate).toBe(true) }
    expect(calls.only).toBeNull()
    expect([...calls.overrides.values()].every(v => v === null)).toBe(true)
  })
})
