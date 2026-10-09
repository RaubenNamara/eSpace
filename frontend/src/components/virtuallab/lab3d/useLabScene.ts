import { ref, shallowRef, onMounted, onBeforeUnmount, nextTick, useTemplateRef, watch } from 'vue'
import * as THREE from 'three'
import type { LabObjectDef } from '@/types/virtualLab'
import { createLabRoom, type LabRoom, type LabRoomOptions } from './labRoom'
import { stockWallShelves, type StockedShelves } from './wallShelves'

/**
 * Mounts a 3D lab room into the component's `ref="labHost"` element, calls `build` once it exists,
 * and disposes everything on unmount. `unsupported` turns true when the device can't run WebGL, so
 * the component can show LabUnsupported instead.
 */
export function useLabScene(
  opts: LabRoomOptions & {
    /** Stocks the wall cabinets (when the room has them) with this catalogue, grouped by subject */
    shelfCatalog?: () => LabObjectDef[]
  },
  build: (room: LabRoom) => void,
) {
  const host = useTemplateRef<HTMLDivElement>('labHost')
  const room = shallowRef<LabRoom | null>(null)
  const unsupported = ref(false)
  let shelves: StockedShelves | null = null

  function stockShelves() {
    const r = room.value
    if (!r?.wallCabinets || !opts.shelfCatalog) return
    shelves?.dispose()
    shelves = stockWallShelves(r.scene, r.wallCabinets, opts.shelfCatalog(), r.unitScale)
  }

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
    stockShelves()
  })

  // The catalogue can arrive after the room is built
  if (opts.shelfCatalog) watch(() => opts.shelfCatalog!().map(d => d.object_type).join(','), () => stockShelves())

  onBeforeUnmount(() => {
    shelves?.dispose()
    room.value?.dispose()
  })

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

  /** A cupboard/wall-cabinet door or a sink tap under the pointer (cosmetic room furniture, not
   *  stocked with anything here - these bespoke scenes always build their own fixed apparatus). */
  function pickFurniture(ev: PointerEvent): { kind: 'door'; door: THREE.Object3D } | { kind: 'tap'; tap: THREE.Object3D } | null {
    const r = room.value
    if (!r) return null
    const targets: THREE.Object3D[] = []
    if (r.cupboard) targets.push(...r.cupboard.doors, ...r.cupboard.blockers)
    if (r.wallCabinets) targets.push(...r.wallCabinets.doors, ...r.wallCabinets.blockers)
    if (r.furniture) targets.push(...r.furniture.doors, ...r.furniture.blockers)
    if (r.taps) targets.push(...r.taps.taps)
    if (!targets.length) return null
    raycaster.setFromCamera(r.toNdc(ev), r.camera)
    const hit = raycaster.intersectObjects(targets, true)[0]
    if (!hit) return null
    const tap = r.taps?.tapOf(hit.object)
    if (tap) return { kind: 'tap', tap }
    const door = r.doorOf(hit.object)
    return door ? { kind: 'door', door } : null
  }

  /** Opens/closes a cabinet door or toggles a tap under the pointer - true if the click was room
   *  furniture, so the caller can skip its own apparatus pick logic for this click. */
  function handleFurnitureClick(ev: PointerEvent): boolean {
    const hit = pickFurniture(ev)
    if (!hit) return false
    if (hit.kind === 'tap') room.value!.taps!.toggle(hit.tap)
    else room.value!.toggleDoor(hit.door)
    return true
  }

  return { room, unsupported, pick, pointOnPlane, handleFurnitureClick }
}
