<template>
  <LabUnsupported v-if="unsupported" />
  <div v-else class="relative w-full h-full rounded-xl overflow-hidden bg-sky-200 select-none">
    <div ref="labHost" class="absolute inset-0" :style="{ cursor: hoverCursor }" @pointerdown.capture="onPointerDown" @pointermove="onHover" @wheel.capture="onWheel"></div>

    <!-- Apparatus tray -->
    <div v-if="trayItems.length > 0" class="absolute left-2 top-2 sm:left-3 sm:top-3 max-w-[9rem] bg-white/95 dark:bg-gray-800/95 backdrop-blur rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-2.5 max-h-[calc(100%-1rem)] sm:max-h-[calc(100%-1.5rem)] overflow-y-auto">
      <p class="text-[10px] font-bold uppercase tracking-wide text-gray-400 dark:text-gray-500 mb-1.5">Apparatus Tray</p>
      <div class="space-y-1">
        <button v-for="item in trayItems" :key="item.key" @click="pickFromTray(item.key)" class="w-full flex items-center gap-1.5 px-2 py-1.5 text-xs font-medium rounded-lg bg-gray-50 dark:bg-gray-900/40 text-gray-700 dark:text-gray-200 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors text-left">
          <span>{{ catalogFor(item.object_type)?.icon || '\u{1F3AF}' }}</span>
          <span class="truncate">{{ catalogFor(item.object_type)?.display_name || item.object_type }}</span>
        </button>
      </div>
    </div>

    <!-- Launcher controls -->
    <div v-if="launcherPlaced" class="absolute right-2 top-2 sm:right-3 sm:top-3 bg-white/95 dark:bg-gray-800/95 backdrop-blur rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-3 w-44 sm:w-48 max-h-[calc(100%-1rem)] sm:max-h-[calc(100%-1.5rem)] overflow-y-auto">
      <p class="text-[10px] font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wide mb-1">Launch Velocity: {{ velocity }} m/s</p>
      <input v-model.number="velocity" type="range" min="6" max="16" step="1" class="w-full accent-indigo-600" :disabled="readOnly || flightState === 'flying'">
      <p class="text-[10px] font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wide mt-2 mb-1">Launch Angle: <span class="text-sky-600 dark:text-sky-400">{{ Math.round(angleDeg) }}&deg;</span></p>
      <input v-model.number="angleDeg" type="range" min="5" max="85" step="1" class="w-full accent-sky-600" :disabled="readOnly || flightState === 'flying'" @change="emitAngle">
      <button
        :disabled="readOnly || flightState === 'flying'"
        @click="fire"
        class="mt-2.5 w-full px-3 py-2 text-xs font-bold rounded-lg bg-red-600 text-white hover:bg-red-700 disabled:opacity-50"
      >{{ flightState === 'flying' ? 'In flight...' : 'Fire' }}</button>
      <p class="mt-1.5 text-[10px] text-gray-400 dark:text-gray-500 text-center">Or drag the barrel tip to aim.</p>
    </div>

    <!-- Measure panel -->
    <div v-if="selectedKey === rulerKey" class="absolute right-2 bottom-12 sm:right-3 sm:bottom-14 bg-white/95 dark:bg-gray-800/95 backdrop-blur rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-3 w-44">
      <div class="flex items-center justify-between gap-2 mb-2">
        <p class="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">Measuring Tape</p>
        <button @click="selectedKey = null" class="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 text-xs leading-none">&times;</button>
      </div>
      <LabButton v-if="!measureArmed && !pendingReading" size="sm" :disabled="readOnly" @click="armMeasure">Measure</LabButton>
      <div v-if="measureArmed" class="text-[11px] text-amber-600 dark:text-amber-400">Click the ball where it landed.</div>
      <div v-if="pendingReading" class="pt-1">
        <p class="text-[11px] font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wide mb-1">Reading</p>
        <div class="flex items-center gap-2">
          <span class="flex-1 text-base font-bold text-gray-900 dark:text-white">{{ pendingReading.value }}<span class="text-xs font-medium text-gray-400 ml-1">m</span></span>
          <LabButton size="sm" variant="success" @click="confirmReading">Record</LabButton>
        </div>
      </div>
    </div>

    <div class="absolute left-2 bottom-2 sm:left-3 sm:bottom-3 flex flex-wrap items-center gap-1.5">
      <!-- Zoom: kept while the ball is in flight and between shots (the follow camera and both
           views use it), so a student can set a close-up or a wide view once and fire repeatedly. -->
      <div class="flex items-center rounded-lg bg-white/95 dark:bg-gray-800/95 shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden" title="Zoom - stays at this level while you fire">
        <button @click="stepZoom(-1)" :disabled="zoomPct <= ZOOM_MIN" aria-label="Zoom out" class="w-8 py-1.5 text-sm font-bold text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-40">&minus;</button>
        <button @click="setZoom(100)" aria-label="Reset zoom to 100%" class="min-w-[3.25rem] px-1 py-1.5 text-xs font-semibold tabular-nums text-indigo-600 dark:text-indigo-400 border-x border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700">{{ zoomPct }}%</button>
        <button @click="stepZoom(1)" :disabled="zoomPct >= ZOOM_MAX" aria-label="Zoom in" class="w-8 py-1.5 text-sm font-bold text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-40">+</button>
      </div>
      <button @click="viewLauncher" class="px-3 py-1.5 text-xs font-semibold rounded-lg bg-white/95 dark:bg-gray-800/95 shadow-lg border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700">Launcher View</button>
      <button @click="viewField" class="px-3 py-1.5 text-xs font-semibold rounded-lg bg-white/95 dark:bg-gray-800/95 shadow-lg border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700">Field View</button>
    </div>

    <transition enter-active-class="transition duration-200 ease-out" enter-from-class="opacity-0 -translate-y-1" leave-active-class="transition duration-150 ease-in" leave-to-class="opacity-0">
      <div v-if="hint" class="absolute left-1/2 -translate-x-1/2 top-2 sm:top-3 bg-amber-500 text-white text-xs font-medium px-4 py-2 rounded-2xl shadow-lg text-center max-w-[calc(100vw-2rem)]">{{ hint }}</div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted, onBeforeUnmount } from 'vue'
import * as THREE from 'three'
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js'
import { canvasTexture, labMaterials } from './lab3d/labRoom'
import { useLabScene } from './lab3d/useLabScene'
import LabUnsupported from './lab3d/LabUnsupported.vue'
import LabButton from './ui/LabButton.vue'
import type { SceneObjectConfig, LabObjectDef, LabAction } from '@/types/virtualLab'

const props = defineProps<{
  sceneObjects: SceneObjectConfig[]
  objectCatalog: LabObjectDef[]
  connections?: { from: string; to: string }[]
  readOnly?: boolean
}>()

const emit = defineEmits<{
  action: [{ objectKey: string | null; action: LabAction; value: string | null; unit?: string | null; label?: string | null; safetyIssue?: boolean; targetObjectKey?: string | null; springLoadG?: number }]
}>()

const GRAVITY = 9.8
const PIVOT = new THREE.Vector3(0, 0.14, 0)
const BARREL_LEN = 0.3
const BALL_R = 0.05
const TAPE_MAX_M = 30
const TAPE_Z = 0.45

function catalogFor(objectType: string) { return props.objectCatalog.find(o => o.object_type === objectType) }
function mergedProps(key: string): Record<string, any> {
  const cfg = props.sceneObjects.find(o => o.key === key)
  const def = cfg ? catalogFor(cfg.object_type) : null
  return { ...(def?.default_props || {}), ...(cfg?.props || {}) }
}

const launcherCfg = computed(() => props.sceneObjects.find(o => o.object_type === 'projectile_launcher'))
const ballCfg = computed(() => props.sceneObjects.find(o => o.object_type === 'projectile'))
const rulerCfg = computed(() => props.sceneObjects.find(o => o.object_type === 'ruler'))
const rulerKey = computed(() => rulerCfg.value?.key ?? null)

// --- Apparatus tray (the ball is never tray-picked; it sits in the launcher) ----------------------
const placedKeys = reactive(new Set<string>())
const trayItems = computed(() => props.sceneObjects.filter(o => o.in_tray && !placedKeys.has(o.key)))
const launcherPlaced = computed(() => !!launcherCfg.value && placedKeys.has(launcherCfg.value.key))
function pickFromTray(key: string) {
  if (props.readOnly) return
  placedKeys.add(key)
  emit('action', { objectKey: key, action: 'move', value: key })
}

const angleDeg = ref(45)
const velocity = ref<number>(Number(mergedProps(launcherCfg.value?.key || '').launch_velocity_ms ?? 12))

function emitAngle() {
  if (props.readOnly) return
  emit('action', { objectKey: launcherCfg.value?.key ?? null, action: 'rotate', label: 'Launch Angle', value: String(Math.round(angleDeg.value)), unit: '°' })
}

// --- Flight: launched from the real muzzle, lands when the ball touches the ground ---------------
const flightState = ref<'idle' | 'flying' | 'landed'>('idle')
const muzzle = () => {
  const a = (angleDeg.value * Math.PI) / 180
  return new THREE.Vector3(PIVOT.x + BARREL_LEN * Math.cos(a), PIVOT.y + BARREL_LEN * Math.sin(a), 0)
}
let shot = { x0: 0, y0: 0, vx: 0, vy: 0, T: 0 }
let flightT = 0
const ballPos = new THREE.Vector3()

function positionAt(t: number, out: THREE.Vector3) {
  return out.set(shot.x0 + shot.vx * t, shot.y0 + shot.vy * t - 0.5 * GRAVITY * t * t, 0)
}

function fire() {
  if (props.readOnly || flightState.value === 'flying' || !launcherPlaced.value) return
  const a = (angleDeg.value * Math.PI) / 180
  const m = muzzle()
  shot = { x0: m.x, y0: m.y, vx: velocity.value * Math.cos(a), vy: velocity.value * Math.sin(a), T: 0 }
  // Time until the ball's bottom touches the ground: y0 + vy t - g t^2 / 2 = BALL_R
  shot.T = (shot.vy + Math.sqrt(shot.vy ** 2 + 2 * GRAVITY * (shot.y0 - BALL_R))) / GRAVITY
  flightT = 0
  measureArmed.value = false
  pendingReading.value = null

  const pos = trail.geometry.attributes.position as THREE.BufferAttribute
  const p = new THREE.Vector3()
  for (let i = 0; i < pos.count; i++) {
    positionAt((shot.T * i) / (pos.count - 1), p)
    pos.setXYZ(i, p.x, p.y, p.z)
  }
  pos.needsUpdate = true
  trail.computeLineDistances()
  landingMark.visible = false

  flightState.value = 'flying'
  if (room.value) cameraGoal = zoomed(trajectoryView())
  emit('action', { objectKey: launcherCfg.value?.key ?? null, action: 'switch_on', value: null })
}

// --- Scene ----------------------------------------------------------------------------------------
let launcher: THREE.Group
let barrelPivot: THREE.Group
let barrelTip: THREE.Mesh
let ball: THREE.Mesh
let ballGrabZone: THREE.Mesh
let tape: THREE.Group
let tapeFace: THREE.MeshStandardMaterial
let tapePickZone: THREE.Mesh
let trail: THREE.Line
let landingMark: THREE.Mesh

function buildScene(scene: THREE.Scene) {
  // Launcher: steel base, two brackets carrying the barrel's axle, and a quadrant scale
  launcher = new THREE.Group()
  const dark = new THREE.MeshStandardMaterial({ color: 0x2d333b, metalness: 0.6, roughness: 0.4 })
  const base = new THREE.Mesh(new RoundedBoxGeometry(0.34, 0.03, 0.26, 2, 0.006), dark)
  base.position.set(0, 0.015, 0)
  launcher.add(base)
  for (const z of [-0.06, 0.06]) {
    const bracket = new THREE.Mesh(new RoundedBoxGeometry(0.06, PIVOT.y, 0.012, 2, 0.003), dark)
    bracket.position.set(0, PIVOT.y / 2 + 0.01, z)
    launcher.add(bracket)
  }
  const quadrantTex = canvasTexture(512, 512, (ctx, w, h) => {
    ctx.clearRect(0, 0, w, h)
    const cx = 8, cy = h - 8, R = w - 24
    ctx.fillStyle = 'rgba(251,146,60,0.96)'
    ctx.beginPath(); ctx.moveTo(cx, cy); ctx.arc(cx, cy, R, -Math.PI / 2, 0); ctx.fill()
    ctx.strokeStyle = '#000000'; ctx.fillStyle = '#000000'; ctx.font = 'bold 30px sans-serif'
    for (let a = 0; a <= 90; a += 5) {
      const r = (a * Math.PI) / 180
      const len = a % 10 === 0 ? 50 : 26
      ctx.lineWidth = a % 10 === 0 ? 4 : 2
      ctx.beginPath()
      ctx.moveTo(cx + R * Math.cos(r), cy - R * Math.sin(r))
      ctx.lineTo(cx + (R - len) * Math.cos(r), cy - (R - len) * Math.sin(r))
      ctx.stroke()
      if (a % 30 === 0) ctx.fillText(String(a), cx + (R - 95) * Math.cos(r) - 12, cy - (R - 95) * Math.sin(r) + 10)
    }
  })
  const quadrant = new THREE.Mesh(new THREE.PlaneGeometry(0.2, 0.2), new THREE.MeshBasicMaterial({ map: quadrantTex, transparent: true, side: THREE.DoubleSide }))
  quadrant.position.set(0.1 - 0.004, PIVOT.y + 0.1 - 0.004, 0.068)
  launcher.add(quadrant)

  barrelPivot = new THREE.Group()
  barrelPivot.position.copy(PIVOT)
  const barrelMat = new THREE.MeshStandardMaterial({ color: 0x1d4ed8, metalness: 0.5, roughness: 0.35 })
  const barrel = new THREE.Mesh(new THREE.CylinderGeometry(0.032, 0.036, BARREL_LEN, 28), barrelMat)
  barrel.rotation.z = -Math.PI / 2
  barrel.position.x = BARREL_LEN / 2 - 0.04
  const axle = new THREE.Mesh(new THREE.CylinderGeometry(0.012, 0.012, 0.15, 16), labMaterials.steel())
  axle.rotation.x = Math.PI / 2
  barrelTip = new THREE.Mesh(new THREE.TorusGeometry(0.036, 0.008, 12, 28), labMaterials.chrome())
  barrelTip.rotation.y = Math.PI / 2
  barrelTip.position.x = BARREL_LEN - 0.04
  // Wider invisible handle so the tip is easy to grab
  const tipHandle = new THREE.Mesh(new THREE.SphereGeometry(0.07, 12, 8), new THREE.MeshBasicMaterial({ visible: false }))
  tipHandle.position.x = BARREL_LEN - 0.04
  barrelTip.userData.handle = tipHandle
  barrelPivot.add(barrel, axle, barrelTip, tipHandle)
  launcher.add(barrelPivot)
  launcher.traverse(o => { if (o instanceof THREE.Mesh) o.castShadow = true })
  scene.add(launcher)

  ball = new THREE.Mesh(new THREE.SphereGeometry(BALL_R, 32, 20), new THREE.MeshStandardMaterial({ color: 0xdc2626, roughness: 0.35 }))
  ball.castShadow = true
  scene.add(ball)
  ballGrabZone = new THREE.Mesh(new THREE.SphereGeometry(0.45, 12, 8), new THREE.MeshBasicMaterial({ visible: false }))
  scene.add(ballGrabZone)

  // 30 m measuring tape laid along the ground from the launcher
  tape = new THREE.Group()
  tapeFace = new THREE.MeshStandardMaterial({ roughness: 0.6 })
  tapeFace.map = canvasTexture(4096, 64, (ctx, w, h) => {
    ctx.fillStyle = '#facc15'
    ctx.fillRect(0, 0, w, h)
    const pxPerM = w / TAPE_MAX_M
    ctx.fillStyle = '#111827'
    ctx.font = 'bold 30px sans-serif'
    for (let dm = 0; dm <= TAPE_MAX_M * 10; dm++) {
      const x = dm * pxPerM / 10
      const len = dm % 10 === 0 ? 40 : dm % 5 === 0 ? 24 : 12
      ctx.fillRect(x, 0, dm % 10 === 0 ? 4 : 2, len)
      if (dm % 10 === 0 && dm > 0) ctx.fillText(String(dm / 10), x + 6, 58)
    }
  })
  const tapeMesh = new THREE.Mesh(new THREE.PlaneGeometry(TAPE_MAX_M, 0.14), tapeFace)
  tapeMesh.rotation.x = -Math.PI / 2
  tapeMesh.position.set(TAPE_MAX_M / 2, 0.004, TAPE_Z)
  tapeMesh.receiveShadow = true
  const reel = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.09, 0.05, 28), new THREE.MeshStandardMaterial({ color: 0x111827, roughness: 0.5 }))
  reel.position.set(-0.12, 0.025, TAPE_Z)
  reel.castShadow = true
  tapePickZone = new THREE.Mesh(new THREE.BoxGeometry(TAPE_MAX_M + 0.3, 0.2, 0.5), new THREE.MeshBasicMaterial({ visible: false }))
  tapePickZone.position.set(TAPE_MAX_M / 2 - 0.15, 0.1, TAPE_Z)
  tape.add(tapeMesh, reel, tapePickZone)
  scene.add(tape)

  trail = new THREE.Line(
    new THREE.BufferGeometry().setFromPoints(new Array(80).fill(0).map(() => new THREE.Vector3())),
    new THREE.LineDashedMaterial({ color: 0xffffff, dashSize: 0.25, gapSize: 0.18 }),
  )
  trail.visible = false
  scene.add(trail)

  landingMark = new THREE.Mesh(new THREE.RingGeometry(0.12, 0.17, 32), new THREE.MeshBasicMaterial({ color: 0xffffff }))
  landingMark.rotation.x = -Math.PI / 2
  landingMark.visible = false
  scene.add(landingMark)
}

// --- Camera: frames each whole shot; presets for the launcher and the whole field ----------------
const LAUNCHER_VIEW = { pos: new THREE.Vector3(0.95, 0.6, 1.7), target: new THREE.Vector3(0.25, 0.2, 0) }
const FIELD_VIEW = { pos: new THREE.Vector3(13, 13, 21), target: new THREE.Vector3(13, 0, 0) }
let cameraGoal: { pos: THREE.Vector3; target: THREE.Vector3 } | null = null

// Zoom as a percentage of each view's normal framing: 200% puts the camera half as far away. It is
// the student's choice and is kept - the shot view and the view presets all apply it, and it is
// remembered for next time on this device. At 100% a shot's whole path fits on screen.
const ZOOM_MIN = 50
const ZOOM_MAX = 400
const ZOOM_STEPS = [50, 75, 100, 125, 150, 200, 250, 300, 400]
const ZOOM_KEY = 'vl-projectile-zoom'
function loadZoom(): number {
  try {
    const n = Number(localStorage.getItem(ZOOM_KEY))
    if (n >= ZOOM_MIN && n <= ZOOM_MAX) return n
  } catch { /* storage unavailable */ }
  return 100
}
const zoomPct = ref(loadZoom())

function setZoom(next: number) {
  const z = Math.round(Math.max(ZOOM_MIN, Math.min(ZOOM_MAX, next)))
  if (z === zoomPct.value) return
  const ratio = zoomPct.value / z
  zoomPct.value = z
  try { localStorage.setItem(ZOOM_KEY, String(z)) } catch { /* storage unavailable */ }
  // Applied straight away by moving the camera along its line of sight (or rescaling a view it is
  // still gliding to).
  if (!room.value) return
  if (cameraGoal) {
    cameraGoal.pos.sub(cameraGoal.target).multiplyScalar(ratio).add(cameraGoal.target)
  } else {
    const t = room.value.controls.target
    room.value.camera.position.sub(t).multiplyScalar(ratio).add(t)
    room.value.controls.update()
  }
}
function stepZoom(dir: 1 | -1) {
  const next = dir > 0 ? ZOOM_STEPS.find(s => s > zoomPct.value) : [...ZOOM_STEPS].reverse().find(s => s < zoomPct.value)
  setZoom(next ?? (dir > 0 ? ZOOM_MAX : ZOOM_MIN))
}
// The mouse wheel drives the same zoom (instead of the orbit controls' own dolly), so it works in
// flight too and the percentage always matches what is on screen.
function onWheel(ev: WheelEvent) {
  ev.preventDefault()
  ev.stopPropagation()
  setZoom(zoomPct.value * Math.exp(-ev.deltaY * 0.0015))
}
function zoomed(view: { pos: THREE.Vector3; target: THREE.Vector3 }) {
  return { pos: view.pos.clone().sub(view.target).multiplyScalar(100 / zoomPct.value).add(view.target), target: view.target.clone() }
}

// The whole flight - launcher, top of the arc and landing point - framed from the side the moment
// the shot is fired (its path is known in advance), then held still so the entire movement plays out
// on screen instead of the camera chasing the ball.
function trajectoryView() {
  const cam = room.value!.camera as THREE.PerspectiveCamera
  const range = shot.x0 + shot.vx * shot.T
  const apex = shot.y0 + (shot.vy * shot.vy) / (2 * GRAVITY)
  const box = { minX: -0.6, maxX: range + 0.8, minY: 0, maxY: apex + 0.4 }
  const w = box.maxX - box.minX
  const h = box.maxY - box.minY
  const vFov = (cam.fov * Math.PI) / 180
  const hFov = 2 * Math.atan(Math.tan(vFov / 2) * cam.aspect)
  const dist = Math.max((w / 2) / Math.tan(hFov / 2), (h / 2) / Math.tan(vFov / 2)) * 1.15
  const target = new THREE.Vector3((box.minX + box.maxX) / 2, (box.minY + box.maxY) / 2, 0)
  const dir = new THREE.Vector3(0, 0.18, 1).normalize() // side on, a little above the field
  return { pos: target.clone().addScaledVector(dir, dist), target }
}

function viewLauncher() { cameraGoal = zoomed(LAUNCHER_VIEW) }
function viewField() { cameraGoal = zoomed(FIELD_VIEW) }

function syncScene(dt: number) {
  if (!room.value) return
  launcher.visible = launcherPlaced.value
  tape.visible = !!rulerKey.value && placedKeys.has(rulerKey.value)
  ball.visible = launcherPlaced.value && !!ballCfg.value

  barrelPivot.rotation.z = (angleDeg.value * Math.PI) / 180

  if (flightState.value === 'flying') {
    flightT += dt
    if (flightT >= shot.T) {
      flightT = shot.T
      flightState.value = 'landed'
      landingMark.position.set(shot.x0 + shot.vx * shot.T, 0.006, 0)
      landingMark.visible = true
    }
    positionAt(flightT, ballPos)
    const shown = Math.max(2, Math.ceil((flightT / shot.T) * 79) + 1)
    trail.geometry.setDrawRange(0, shown)
    trail.visible = true
    // Follow from the side, far enough back to keep the whole arc's height in frame
  } else if (flightState.value === 'idle') {
    ballPos.copy(muzzle())
  }
  ball.position.copy(ballPos)
  ballGrabZone.position.copy(ballPos)

  if (cameraGoal) {
    // settles quickly at the start of a shot so the ball never leaves the frame on the way there
    const k = 1 - Math.exp(-dt * (flightState.value === 'flying' ? 9 : 4))
    room.value.camera.position.lerp(cameraGoal.pos, k)
    room.value.controls.target.lerp(cameraGoal.target, k)
    if (room.value.camera.position.distanceTo(cameraGoal.pos) < 0.02) cameraGoal = null
  }

  tapeFace.emissive.setHex(measureArmed.value ? 0x4f46e5 : 0x000000)
  tapeFace.emissiveIntensity = measureArmed.value ? 0.2 : 0
}

// --- Pointer: aim by dragging the barrel tip, select the tape, click the landed ball -------------
const aimPlane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0)
const aimPoint = new THREE.Vector3()
const hoverCursor = ref('grab')
let aiming = false

type Target = 'tip' | 'ball' | 'tape'
function pickTarget(ev: PointerEvent): Target | null {
  if (!launcher) return null
  const handle = barrelTip.userData.handle as THREE.Mesh
  const targets: THREE.Object3D[] = []
  if (launcher.visible) targets.push(handle)
  if (ball.visible && flightState.value === 'landed') targets.push(ballGrabZone)
  if (tape.visible) targets.push(tapePickZone)
  const hit = pick(ev, targets)
  if (hit === handle) return 'tip'
  if (hit === ballGrabZone) return 'ball'
  if (hit === tapePickZone) return 'tape'
  return null
}

function onHover(ev: PointerEvent) {
  if (aiming) return
  hoverCursor.value = pickTarget(ev) ? 'pointer' : 'grab'
}

function onPointerDown(ev: PointerEvent) {
  const target = pickTarget(ev)
  if (!target || !room.value) return
  room.value.controls.enabled = false
  cameraGoal = null
  window.addEventListener('pointerup', onPointerUp, { once: true })

  if (target === 'tape') {
    if (!props.readOnly) selectedKey.value = rulerKey.value
    return
  }
  if (target === 'ball') {
    if (measureArmed.value) takeReading()
    return
  }
  if (props.readOnly || flightState.value === 'flying') return
  aiming = true
  hoverCursor.value = 'grabbing'
  window.addEventListener('pointermove', onAimMove)
}

function onAimMove(ev: PointerEvent) {
  if (!aiming || !pointOnPlane(ev, aimPlane, aimPoint)) return
  const deg = (Math.atan2(aimPoint.y - PIVOT.y, aimPoint.x - PIVOT.x) * 180) / Math.PI
  angleDeg.value = Math.round(Math.max(5, Math.min(85, deg)))
}

function onPointerUp() {
  window.removeEventListener('pointermove', onAimMove)
  if (room.value) room.value.controls.enabled = true
  if (aiming) {
    aiming = false
    hoverCursor.value = 'grab'
    emitAngle()
  }
}

// --- Measuring: the tape reads from the launcher base (x = 0) to where the ball came to rest ------
const selectedKey = ref<string | null>(null)
const measureArmed = ref(false)
const pendingReading = ref<{ value: string } | null>(null)
const hint = ref<string | null>(null)
function flash(text: string) { hint.value = text; setTimeout(() => { if (hint.value === text) hint.value = null }, 3500) }

function armMeasure() {
  if (props.readOnly) return
  if (flightState.value !== 'landed') { flash('Fire the projectile first, then measure where it landed.'); return }
  measureArmed.value = true
}
function takeReading() {
  const noise = (Math.random() - 0.5) * 0.1
  pendingReading.value = { value: String(Math.round((ballPos.x + noise) * 100) / 100) }
  measureArmed.value = false
}
function confirmReading() {
  if (!pendingReading.value) return
  emit('action', { objectKey: rulerKey.value, action: 'measure', value: pendingReading.value.value, unit: 'm', label: 'Range', targetObjectKey: ballCfg.value?.key ?? null })
  pendingReading.value = null
}

const { room, unsupported, pick, pointOnPlane } = useLabScene(
  { setting: 'field', cameraPosition: zoomed(LAUNCHER_VIEW).pos.toArray(), target: LAUNCHER_VIEW.target.toArray(), minDistance: 0.3, maxDistance: 90 },
  (r) => {
    buildScene(r.scene)
    r.onFrame(syncScene)
    if (!props.readOnly) flash('Take the launcher from the tray, set the angle, then fire.')
  },
)

onMounted(() => {
  props.sceneObjects.forEach((o) => { if (!o.in_tray) placedKeys.add(o.key) })
})
onBeforeUnmount(() => {
  window.removeEventListener('pointermove', onAimMove)
  window.removeEventListener('pointerup', onPointerUp)
})

function setObjectState() {
  // Nothing in this experiment resumes mid-flight - kept for the renderer interface.
}
defineExpose({ setObjectState })
</script>
