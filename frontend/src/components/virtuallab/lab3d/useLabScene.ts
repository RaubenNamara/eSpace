import { ref, shallowRef, onMounted, onBeforeUnmount, nextTick, useTemplateRef } from 'vue'
import * as THREE from 'three'
import { createLabRoom, type LabRoom, type LabRoomOptions } from './labRoom'

/**
 * Mounts a 3D lab room into the component's `ref="labHost"` element, calls `build` once it exists,
 * and disposes everything on unmount. `unsupported` turns true when the device can't run WebGL, so
 * the component can show LabUnsupported instead.
 */
export function useLabScene(opts: LabRoomOptions, build: (room: LabRoom) => void) {
  const host = useTemplateRef<HTMLDivElement>('labHost')
  const room = shallowRef<LabRoom | null>(null)
  const unsupported = ref(false)

  onMounted(async () => {
    await nextTick()
    if (!host.value) return
    try {
      room.value = createLabRoom(host.value, opts)
    } catch (err) {
      console.error('Virtual Lab: WebGL unavailable', err)
      unsupported.value = true
      return
    }
    build(room.value)
  })

  onBeforeUnmount(() => room.value?.dispose())

  const raycaster = new THREE.Raycaster()

  /** Which of `targets` (each matched by itself or any descendant) is under the pointer. */
  function pick<T extends THREE.Object3D>(ev: PointerEvent, targets: T[]): T | null {
    if (!room.value) return null
    raycaster.setFromCamera(room.value.toNdc(ev), room.value.camera)
    const visible = targets.filter(t => t.visible)
    const hit = raycaster.intersectObjects(visible, true)[0]
    if (!hit) return null
    for (let o: THREE.Object3D | null = hit.object; o; o = o.parent) {
      const match = visible.find(t => t === o)
      if (match) return match
    }
    return null
  }

  /** Where the pointer ray meets `plane`; false if it runs parallel. */
  function pointOnPlane(ev: PointerEvent, plane: THREE.Plane, out: THREE.Vector3): boolean {
    if (!room.value) return false
    raycaster.setFromCamera(room.value.toNdc(ev), room.value.camera)
    return raycaster.ray.intersectPlane(plane, out) !== null
  }

  return { room, unsupported, pick, pointOnPlane }
}
