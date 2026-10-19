import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { MeshoptDecoder } from 'three/examples/jsm/libs/meshopt_decoder.module.js'
import type { SystemKey } from './types'
import { disposeObject } from './dispose'

export class ModelLoadError extends Error {
  constructor(readonly system: SystemKey, message: string) { super(message) }
}

export interface LoadedSystem {
  system: SystemKey
  root: THREE.Group
  /** structure id -> mesh */
  meshes: Map<string, THREE.Mesh>
}

/** gltfpack keeps one named node per structure ("FJ1234", "FJ1234M") and hangs the (quantised)
 *  mesh under it as an unnamed child, which three.js calls "mesh_N" - so look up the tree. */
export function structureIdOf(o: THREE.Object3D): string | null {
  for (let p: THREE.Object3D | null = o; p; p = p.parent) {
    // FJ... = release 4.0 element files; V3FMA... = release 3.0 (the lung lobes); HRAF.. = Human Reference Atlas female organs
    if (/^(FJ\d+[A-Z]?|V3FMA\d+|HRAF\d+)$/.test(p.name)) return p.name
  }
  return null
}

/** Loads one GLB per body system, once. Concurrent requests for the same system share one download. */
export class SystemLoader {
  private gltf = new GLTFLoader()
  private pending = new Map<SystemKey, Promise<LoadedSystem>>()
  private disposed = false

  constructor(private baseUrl: string) {
    this.gltf.setMeshoptDecoder(MeshoptDecoder)
  }

  load(system: SystemKey, file: string, onProgress?: (fraction: number) => void): Promise<LoadedSystem> {
    const existing = this.pending.get(system)
    if (existing) return existing
    const url = `${this.baseUrl.replace(/\/$/, '')}/${file}`
    let failed = false
    const fail = (reject: (e: unknown) => void) => (err: unknown) => {
      failed = true
      this.pending.delete(system) // allow a retry
      const msg = err instanceof Error ? err.message : String(err)
      reject(new ModelLoadError(system, /404|not found/i.test(msg) ? 'The model file for this system is missing.' : `The model could not be loaded (${msg}).`))
    }
    const p = new Promise<LoadedSystem>((resolve, reject) => {
      // a bad URL can make the loader throw straight away rather than call onError
      try { this.start(url, system, resolve, reject, onProgress, fail(reject)) } catch (e) { fail(reject)(e) }
    })
    if (!failed) this.pending.set(system, p)
    return p
  }

  private start(url: string, system: SystemKey, resolve: (s: LoadedSystem) => void, reject: (e: unknown) => void,
    onProgress: ((f: number) => void) | undefined, onError: (e: unknown) => void) {
    this.gltf.load(url, (g) => {
      // the viewer was closed while this was downloading: free it straight away
      if (this.disposed) { disposeObject(g.scene); reject(new ModelLoadError(system, 'Viewer closed')); return }
      const meshes = new Map<string, THREE.Mesh>()
      g.scene.traverse((o) => {
        const mesh = o as THREE.Mesh
        if (!mesh.isMesh) return
        const id = structureIdOf(mesh)
        if (!id) return
        mesh.userData.structureId = id
        meshes.set(id, mesh)
      })
      g.scene.name = `system:${system}`
      resolve({ system, root: g.scene, meshes })
    }, (e) => {
      if (onProgress && e.lengthComputable && e.total > 0) onProgress(e.loaded / e.total)
    }, onError)
  }

  isRequested(system: SystemKey) { return this.pending.has(system) }

  dispose() {
    this.disposed = true
    this.pending.clear()
  }
}
