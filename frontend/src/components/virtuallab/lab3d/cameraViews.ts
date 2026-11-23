import * as THREE from 'three'

/**
 * The lab's camera views and the extra "camera windows".
 *
 * One view is the main, interactive camera (it fills the lab, the student works in it). Any other
 * views the student switches on are live windows in a strip under the lab (LabCameraWindows.vue
 * registers a canvas per window, labRoom.ts draws into them). Clicking a window makes it the main view.
 *
 * Only one lab room is on screen at a time, so the page talks to whichever room was created last
 * (setActiveLabRoom) instead of every scene component having to pass its room up.
 */
export type LabViewKey = 'bench' | 'top' | 'entrance' | 'left' | 'right'

export const LAB_VIEWS: { key: LabViewKey; label: string; title: string }[] = [
  { key: 'bench', label: 'Bench', title: 'The apparatus on the bench' },
  { key: 'top', label: 'Top', title: 'The whole room from above, like a drone under the roof' },
  { key: 'entrance', label: 'Entrance', title: 'The lab entrance' },
  { key: 'left', label: 'Left', title: 'The left wall' },
  { key: 'right', label: 'Right', title: 'The right wall' },
]

export const LAB_VIEW_LABEL: Record<LabViewKey, string> = Object.fromEntries(LAB_VIEWS.map(v => [v.key, v.label])) as Record<LabViewKey, string>

interface Pose { pos: THREE.Vector3; target: THREE.Vector3 }

// The enclosed room, in metres: side walls at x = ±7, back wall at z ≈ -0.6, entrance wall at
// z = 7, floor 0.9 m below the bench top, walls 5 m high (see labRoom.ts)
const ROOM_HALF_W = 7
const ROOM_BACK_Z = -0.62
const ROOM_FRONT_Z = 7
const ROOM_CENTRE_Z = (ROOM_BACK_Z + ROOM_FRONT_Z) / 2
const ROOM_TOP_Y = 3.9
const ROOM_FLOOR_Y = -0.9

/** Vertical field of view (degrees) that fits the whole floor into a view of this shape from the top camera. */
export function roomFov(aspect: number) {
  const dist = ROOM_TOP_Y - ROOM_FLOOR_Y
  const halfD = (ROOM_FRONT_Z - ROOM_BACK_Z) / 2
  const t = Math.max(halfD / dist, ROOM_HALF_W / dist / Math.max(aspect, 0.2)) * 1.04
  return Math.min(120, (2 * Math.atan(t) * 180) / Math.PI)
}

/** Fixed views of the room, in metres (bench top is y = 0, the room is centred on the bench). */
const ROOM_POSES: Record<Exclude<LabViewKey, 'bench'>, Pose> = {
  // Over the middle of the room just under the top of the walls, looking straight down with a wide
  // lens (roomFov) so the whole floor fits. A small z offset keeps the orbit controls clear of
  // looking exactly straight down.
  top: { pos: new THREE.Vector3(0, ROOM_TOP_Y, ROOM_CENTRE_Z + 0.02), target: new THREE.Vector3(0, -0.9, ROOM_CENTRE_Z) },
  entrance: { pos: new THREE.Vector3(2.4, 0.95, 2.4), target: new THREE.Vector3(0, 0.25, 7) },
  left: { pos: new THREE.Vector3(-1.2, 1.0, 1.6), target: new THREE.Vector3(-7, 0.45, 1.6) },
  right: { pos: new THREE.Vector3(1.2, 1.0, 1.6), target: new THREE.Vector3(7, 0.45, 1.6) },
}

export interface ActiveLabRoom {
  camera: THREE.PerspectiveCamera
  controls: { target: THREE.Vector3 }
  unitScale: number
  flyTo: (pos: THREE.Vector3, target: THREE.Vector3) => void
  /** Main camera's wide room lens on (the top view) or back to the normal lens */
  setRoomLens: (on: boolean) => void
}

let active: ActiveLabRoom | null = null
export function setActiveLabRoom(room: ActiveLabRoom) { active = room }
export function clearActiveLabRoom(room: ActiveLabRoom) { if (active === room) active = null }
export function isActiveLabRoom(room: ActiveLabRoom) { return active === room }

/** Which camera windows to draw, their canvases, and what clicking one does. Read by the room every frame. */
export const labInsets: { views: LabViewKey[]; onPick: ((key: LabViewKey) => void) | null; canvases: Map<LabViewKey, HTMLCanvasElement> } = { views: [], onPick: null, canvases: new Map() }

export function setLabInsetCanvas(key: LabViewKey, el: HTMLCanvasElement | null) {
  if (el) labInsets.canvases.set(key, el)
  else labInsets.canvases.delete(key)
}

export function setLabInsets(views: LabViewKey[], onPick: ((key: LabViewKey) => void) | null) {
  labInsets.views = views
  labInsets.onPick = onPick
}

// The bench view differs per practical (each frames its own apparatus), so the bench window shows
// wherever the main camera was looking at the bench when the student last switched away from it.
let benchPose: Pose | null = null
export function snapshotBenchPose() {
  if (!active) return
  const s = active.unitScale || 1
  benchPose = { pos: active.camera.position.clone().divideScalar(s), target: active.controls.target.clone().divideScalar(s) }
}

/** Where a view's camera stands, in metres (null: bench view not known yet). */
export function labViewPose(key: LabViewKey): Pose | null {
  return key === 'bench' ? benchPose : ROOM_POSES[key]
}

/** Glide the main camera to one of the fixed room views. */
export function flyActiveRoomTo(key: Exclude<LabViewKey, 'bench'>) {
  const p = ROOM_POSES[key]
  active?.setRoomLens(key === 'top')
  active?.flyTo(p.pos.clone(), p.target.clone())
}

/** Back to the normal lens before a scene frames its own bench view. */
export function normalLens() {
  active?.setRoomLens(false)
}

export function resetLabCameras() {
  setLabInsets([], null)
  benchPose = null
}
