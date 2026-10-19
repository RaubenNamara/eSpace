// @vitest-environment node
import { describe, it, expect, vi } from 'vitest'
import * as THREE from 'three'
import { systemAvailability, filesForSystem, SYSTEMS } from '../systems'
import { fitRectDistance, viewPose, focusPose, CameraTween } from '../camera'
import { structureIdOf, SystemLoader, ModelLoadError } from '../loader'
import { colourOf, KIND_COLOUR } from '../materials'
import { disposeObject } from '../dispose'
import { fixtureManifest } from './fixture'

describe('systems', () => {
  const m = fixtureManifest()

  it('marks a system without a model file as missing (shown as unavailable, not faked)', () => {
    expect(systemAvailability(m, 'muscular')).toBe('missing')
    expect(systemAvailability(m, 'nervous')).toBe('missing')
    expect(systemAvailability(m, 'skeletal')).toBe('available')
    expect(systemAvailability(null, 'skeletal')).toBe('missing')
  })

  it('loads the files that hold shared structures', () => {
    expect(filesForSystem(m, 'endocrine').sort()).toEqual(['digestive', 'endocrine', 'reproductive'])
    expect(filesForSystem(m, 'skeletal')).toEqual(['skeletal'])
  })

  it('lists all ten systems once, with the reproductive system flagged as sensitive', () => {
    expect(SYSTEMS.map(s => s.key).sort()).toEqual(['circulatory', 'digestive', 'endocrine', 'integumentary', 'muscular', 'nervous', 'reproductive', 'respiratory', 'skeletal', 'urinary'])
    expect(SYSTEMS.find(s => s.key === 'reproductive')?.sensitive).toBe(true)
  })
})

describe('camera', () => {
  const box = new THREE.Box3(new THREE.Vector3(-0.34, 0, -0.16), new THREE.Vector3(0.34, 1.72, 0.16))

  it('backs off further for a narrow view than a wide one', () => {
    expect(fitRectDistance(0.68, 1.72, 0, 35, 0.2)).toBeGreaterThan(fitRectDistance(0.68, 1.72, 0, 35, 2))
  })

  it('places preset views on the right side of the body', () => {
    expect(viewPose('front', box, 35, 1).position.z).toBeGreaterThan(1)
    expect(viewPose('back', box, 35, 1).position.z).toBeLessThan(-1)
    expect(viewPose('left', box, 35, 1).position.x).toBeGreaterThan(1) // the body's own left is +x
    expect(viewPose('right', box, 35, 1).position.x).toBeLessThan(-1)
    expect(viewPose('top', box, 35, 1).position.y).toBeGreaterThan(2)
    expect(viewPose('front', box, 35, 1).target.y).toBeCloseTo(0.86)
  })

  it('focuses on a small box from the current direction', () => {
    const cam = new THREE.PerspectiveCamera(35, 1)
    cam.position.set(0, 1, 4)
    const target = new THREE.Vector3(0, 1, 0)
    const organ = new THREE.Box3(new THREE.Vector3(0, 1.2, 0), new THREE.Vector3(0.1, 1.3, 0.1))
    const pose = focusPose(organ, cam, target)
    expect(pose.target.y).toBeCloseTo(1.25)
    expect(pose.position.z).toBeGreaterThan(pose.target.z)
    expect(pose.position.distanceTo(pose.target)).toBeLessThan(2)
  })

  it('tweens to the end pose and stops', () => {
    const tw = new CameraTween()
    const p = new THREE.Vector3(), t = new THREE.Vector3()
    tw.begin({ position: new THREE.Vector3(0, 0, 0), target: new THREE.Vector3() }, { position: new THREE.Vector3(10, 0, 0), target: new THREE.Vector3(0, 1, 0) }, 0, 100)
    expect(tw.step(50, p, t)).toBe(true)
    expect(p.x).toBeGreaterThan(0)
    expect(p.x).toBeLessThan(10)
    expect(tw.step(100, p, t)).toBe(false)
    expect(p.x).toBe(10)
    expect(t.y).toBe(1)
    expect(tw.active).toBe(false)
  })
})

describe('loader', () => {
  it('reads the structure id from the named node above the mesh', () => {
    const node = new THREE.Group(); node.name = 'FJ1234M'
    const mesh = new THREE.Mesh(); mesh.name = 'mesh_0'
    node.add(mesh)
    expect(structureIdOf(mesh)).toBe('FJ1234M')
    expect(structureIdOf(new THREE.Mesh())).toBeNull()
  })

  it('turns a loader that throws straight away into a ModelLoadError too', async () => {
    const loader = new SystemLoader('::not a url::')
    const err = await loader.load('skeletal', 'skeletal.glb').catch(e => e)
    expect(err).toBeInstanceOf(ModelLoadError)
    expect(loader.isRequested('skeletal')).toBe(false)
  })

  it('turns a failed download into a readable ModelLoadError and allows a retry', async () => {
    const loader = new SystemLoader('http://localhost/anatomy/missing')
    // GLTFLoader.load -> FileLoader -> fetch; make it fail like a 404
    const fetchSpy = vi.spyOn(globalThis, 'fetch').mockResolvedValue(new Response('not found', { status: 404, statusText: 'Not Found' }))
    const err = await loader.load('skeletal', 'skeletal.glb').catch(e => e)
    expect(err).toBeInstanceOf(ModelLoadError)
    expect((err as ModelLoadError).system).toBe('skeletal')
    expect(String((err as Error).message)).toMatch(/missing|could not be loaded/i)
    expect(loader.isRequested('skeletal')).toBe(false) // can be retried
    fetchSpy.mockRestore()
  })

  it('shares one download between concurrent requests', () => {
    const loader = new SystemLoader('http://localhost/x')
    const fetchSpy = vi.spyOn(globalThis, 'fetch').mockReturnValue(new Promise(() => {}))
    const a = loader.load('skeletal', 'skeletal.glb')
    const b = loader.load('skeletal', 'skeletal.glb')
    expect(a).toBe(b)
    expect(fetchSpy).toHaveBeenCalledTimes(1)
    fetchSpy.mockRestore()
  })
})

describe('materials and disposal', () => {
  it('colours pulmonary arteries like veins (deoxygenated) and vice versa', () => {
    expect(colourOf({ name: 'Right pulmonary artery', kind: 'artery' })).toBe(KIND_COLOUR.vein)
    expect(colourOf({ name: 'Left pulmonary vein', kind: 'vein' })).toBe(KIND_COLOUR.artery)
    expect(colourOf({ name: 'Femoral artery', kind: 'artery' })).toBe(KIND_COLOUR.artery)
  })

  it('disposes geometry and unshared materials but keeps shared ones', () => {
    const shared = new THREE.MeshBasicMaterial()
    const own = new THREE.MeshBasicMaterial()
    const g1 = new THREE.BoxGeometry(), g2 = new THREE.BoxGeometry()
    const root = new THREE.Group()
    root.add(new THREE.Mesh(g1, shared), new THREE.Mesh(g2, own))
    const parent = new THREE.Group(); parent.add(root)
    const spies = [vi.spyOn(g1, 'dispose'), vi.spyOn(g2, 'dispose'), vi.spyOn(own, 'dispose'), vi.spyOn(shared, 'dispose')]
    disposeObject(root, new Set([shared]))
    expect(spies[0]).toHaveBeenCalled()
    expect(spies[1]).toHaveBeenCalled()
    expect(spies[2]).toHaveBeenCalled()
    expect(spies[3]).not.toHaveBeenCalled()
    expect(root.parent).toBeNull()
  })
})
