import * as THREE from 'three'

/** Frees the GPU memory of everything under `root`: geometries, materials and their textures.
 *  Shared materials passed in `keep` are left alone (they are disposed by their owner). */
export function disposeObject(root: THREE.Object3D, keep: Set<THREE.Material> = new Set()) {
  const materials = new Set<THREE.Material>()
  root.traverse((o) => {
    const mesh = o as THREE.Mesh
    if (mesh.isMesh) {
      mesh.geometry?.dispose()
      const m = mesh.material
      for (const mat of Array.isArray(m) ? m : [m]) if (mat && !keep.has(mat)) materials.add(mat)
      // materials that were swapped out for highlighting are remembered here
      const original = mesh.userData.baseMaterial as THREE.Material | undefined
      if (original && !keep.has(original)) materials.add(original)
    }
  })
  for (const m of materials) disposeMaterial(m)
  root.removeFromParent()
}

export function disposeMaterial(m: THREE.Material) {
  for (const value of Object.values(m)) if (value instanceof THREE.Texture) value.dispose()
  m.dispose()
}
