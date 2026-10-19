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
      <p class="text-[10px] font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wide mb-1">Launch Velocity: {{ velocity }} m/s<span v-if="guided"> (fixed)</span></p>
      <input v-if="!guided" v-model.number="velocity" type="range" min="6" max="16" step="1" class="w-full accent-indigo-600" :disabled="readOnly || flightState === 'flying'">
      <p class="text-[10px] font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wide mt-2 mb-1">Launch Angle: <span class="text-sky-600 dark:text-sky-400">{{ Math.round(angleDeg) }}&deg;</span></p>
      <input v-model.number="angleDeg" type="range" min="5" max="85" step="1" class="w-full accent-sky-600" :disabled="readOnly || flightState === 'flying'" @change="emitAngle">
      <div v-if="guided" class="mt-1 grid grid-cols-2 gap-1">
        <button type="button" :disabled="readOnly || flightState === 'flying'" @click="nudgeAngle(-1)" class="px-2 py-1 text-[11px] font-semibold rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 disabled:opacity-50">&minus;1&deg;</button>
        <button type="button" :disabled="readOnly || flightState === 'flying'" @click="nudgeAngle(1)" class="px-2 py-1 text-[11px] font-semibold rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 disabled:opacity-50">+1&deg;</button>
      </div>
      <button
        :disabled="readOnly || flightState === 'flying'"
        @click="fire"
        class="mt-2.5 w-full px-3 py-2 text-xs font-bold rounded-lg bg-red-600 text-white hover:bg-red-700 disabled:opacity-50"
      >{{ flightState === 'flying' ? 'In flight...' : 'Fire' }}</button>
      <p class="mt-1.5 text-[10px] text-gray-400 dark:text-gray-500 text-center">Or drag the barrel tip to aim.</p>
      <p class="mt-1 text-[10px] text-gray-400 dark:text-gray-500 text-center">The flight is shown in slow motion.</p>
    </div>

    <!-- Measure panel -->
    <!-- top left (the tray is empty by now): the camera frames each shot with the landing point low on the right, where a panel would cover the ball -->
    <div v-if="selectedKey === rulerKey" class="absolute left-2 top-2 sm:left-3 sm:top-3 bg-white/95 dark:bg-gray-800/95 backdrop-blur rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-3 w-44">
      <div class="flex items-center justify-between gap-2 mb-2">
        <p class="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">Measuring Tape</p>
        <button @click="selectedKey = null" class="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 text-xs leading-none">&times;</button>
      </div>
      <LabButton v-if="!measureArmed && !pendingReading" size="sm" :disabled="readOnly" @click="armMeasure">Measure</LabButton>
      <div v-if="measureArmed" class="text-[11px] text-amber-600 dark:text-amber-400">Click the ball where it landed - the glowing ring.</div>
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
import { ref, reactive, computed, watch, onMounted, onBeforeUnmount } from 'vue'
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
  /** The step the student is on (guided practical only) */
  currentStep?: { required_action: string; target_object_key: string | null; expected_value: string | null } | null
}>()

const emit = defineEmits<{
  action: [{ objectKey: string | null; action: LabAction; value: string | null; unit?: string | null; label?: string | null; safetyIssue?: boolean; targetObjectKey?: string | null; springLoadG?: number; projectileTrial?: ProjectileTrial }]
}>()

/** One measured shot of the guided range practical */
export interface ProjectileTrial {
  angle_deg: number
  /** The range the student recorded, m */
  range_m: number
  /** Where the ball really landed, m from the launcher */
  true_range_m: number
  speed_ms: number
}

const GRAVITY = 9.8
/** The flight is shown in slow motion so the ball can be followed - 0.35 = about a third of real time */
const FLIGHT_PLAYBACK = 0.35
const PIVOT = new THREE.Vector3(0, 0.14, 0)
const BARREL_LEN = 0.3
const BALL_R = 0.026 // a ball that fits the barrel
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
/** The guided practical "angle of projection and range" (launcher prop experiment: 'range_angles'):
 *  fixed speed, each angle/fire/measure checked against the step, and every measured shot reported. */
const guided = computed(() => mergedProps(launcherCfg.value?.key || '').experiment === 'range_angles')
const st = () => props.currentStep ?? null
const stepAngle = computed(() => {
  const s = props.currentStep
  if (!guided.value || !s || s.required_action !== 'rotate' || s.expected_value === null) return null
  const n = Number(s.expected_value)
  return Number.isFinite(n) ? n : null
})

// --- Apparatus tray (the ball is never tray-picked; it sits in the launcher) ----------------------
const placedKeys = reactive(new Set<string>())
const trayItems = computed(() => props.sceneObjects.filter(o => o.in_tray && !placedKeys.has(o.key)))
const launcherPlaced = computed(() => !!launcherCfg.value && placedKeys.has(launcherCfg.value.key))
function pickFromTray(key: string) {
  if (props.readOnly) return
  placedKeys.add(key)
  if (!guided.value) {
    emit('action', { objectKey: key, action: 'move', value: key })
    return
  }
  if (trayItems.value.length === 0) emit('action', { objectKey: null, action: 'move', value: 'apparatus_ready' })
}

const angleDeg = ref(45)
const velocity = ref<number>(Number(mergedProps(launcherCfg.value?.key || '').launch_velocity_ms ?? 12))

let angleSentFor: number | null = null
/** The angle the last accepted "set the angle" step was for - the shot must be fired at it */
const setAngle = ref<number | null>(null)
function emitAngle() {
  if (props.readOnly) return
  if (!guided.value) {
    emit('action', { objectKey: launcherCfg.value?.key ?? null, action: 'rotate', label: 'Launch Angle', value: String(Math.round(angleDeg.value)), unit: '°' })
    return
  }
  const want = stepAngle.value
  if (want === null) return
  if (Math.round(angleDeg.value) !== want) { flash(`This step asks for an angle of ${want}° - read the quadrant scale on the launcher.`); return }
  if (angleSentFor === want) return
  angleSentFor = want
  setAngle.value = want
  emit('action', { objectKey: launcherCfg.value?.key ?? null, action: 'rotate', label: 'Launch Angle', value: String(want), unit: '°' })
}
function nudgeAngle(d: number) {
  if (props.readOnly || flightState.value === 'flying') return
  angleDeg.value = Math.max(5, Math.min(85, Math.round(angleDeg.value) + d))
  emitAngle()
}
watch(stepAngle, () => { if (stepAngle.value !== null && Math.round(angleDeg.value) === stepAngle.value) emitAngle() })

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

let firedAngle = 0
function fire() {
  if (props.readOnly || flightState.value === 'flying' || !launcherPlaced.value) return
  if (guided.value) {
    const s = st()
    if (s && s.required_action !== 'switch_on') { flash(s.required_action === 'rotate' ? 'Set the angle the step asks for first.' : 'Measure where the ball landed first.'); return }
    if (setAngle.value !== null && Math.round(angleDeg.value) !== setAngle.value) { flash(`Put the angle back to ${setAngle.value}° before firing.`); return }
  }
  firedAngle = Math.round(angleDeg.value)
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
  viewMode = 'setup'
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
  // Launcher, built like a school projectile launcher: a black base plate on rubber feet, two
  // aluminium side plates (the yoke) carrying the barrel on a chrome pivot bolt, a clear acrylic
  // protractor on the front plate (1° marks, numbered every 10°) and a red pointer fixed to the
  // barrel - the angle of projection is read where the pointer crosses the scale.
  launcher = new THREE.Group()
  const blackMetal = new THREE.MeshStandardMaterial({ color: 0x1f2328, metalness: 0.55, roughness: 0.45 })
  const aluminium = new THREE.MeshStandardMaterial({ color: 0xb8bec6, metalness: 0.85, roughness: 0.32 })
  const rubber = new THREE.MeshStandardMaterial({ color: 0x111111, roughness: 0.9 })
  const base = new THREE.Mesh(new RoundedBoxGeometry(0.38, 0.026, 0.3, 3, 0.008), blackMetal)
  base.position.set(0.02, 0.019, 0)
  launcher.add(base)
  for (const [fx, fz] of [[-0.14, -0.12], [-0.14, 0.12], [0.18, -0.12], [0.18, 0.12]]) {
    const foot = new THREE.Mesh(new THREE.CylinderGeometry(0.018, 0.02, 0.008, 16), rubber)
    foot.position.set(fx, 0.004, fz)
    launcher.add(foot)
  }
  // yoke side plates, rounded at the top round the pivot
  const plateShape = new THREE.Shape()
  const pw = 0.075, ph = PIVOT.y - 0.032
  plateShape.moveTo(-pw / 2, 0)
  plateShape.lineTo(pw / 2, 0)
  plateShape.lineTo(pw / 2, ph)
  plateShape.absarc(0, ph, pw / 2, 0, Math.PI, false)
  plateShape.lineTo(-pw / 2, 0)
  const plateGeo = new THREE.ExtrudeGeometry(plateShape, { depth: 0.008, bevelEnabled: true, bevelSize: 0.002, bevelThickness: 0.002, bevelSegments: 2 })
  for (const z of [-0.066, 0.058]) {
    const plate = new THREE.Mesh(plateGeo, aluminium)
    plate.position.set(0, 0.032, z)
    launcher.add(plate)
  }
  const bolt = new THREE.Mesh(new THREE.CylinderGeometry(0.011, 0.011, 0.16, 20), labMaterials.chrome())
  bolt.rotation.x = Math.PI / 2
  bolt.position.copy(PIVOT)
  const boltHead = new THREE.Mesh(new THREE.CylinderGeometry(0.018, 0.018, 0.008, 6), labMaterials.chrome())
  boltHead.rotation.x = Math.PI / 2
  boltHead.position.set(PIVOT.x, PIVOT.y, 0.082)
  launcher.add(bolt, boltHead)

  // clear protractor (quarter circle, 0° horizontal to 90° straight up), centred on the pivot
  const PROT_R = 0.27
  const protractorTex = canvasTexture(1024, 1024, (ctx, w, h) => {
    ctx.clearRect(0, 0, w, h)
    const cx = 6, cy = h - 6, R = w - 16
    ctx.fillStyle = 'rgba(240,248,255,0.72)'
    ctx.beginPath(); ctx.moveTo(cx, cy); ctx.arc(cx, cy, R, -Math.PI / 2, 0); ctx.closePath(); ctx.fill()
    ctx.strokeStyle = 'rgba(30,41,59,0.85)'; ctx.lineWidth = 3
    ctx.beginPath(); ctx.arc(cx, cy, R, -Math.PI / 2, 0); ctx.stroke()
    ctx.beginPath(); ctx.arc(cx, cy, R * 0.34, -Math.PI / 2, 0); ctx.stroke()
    ctx.fillStyle = '#0f172a'; ctx.strokeStyle = '#0f172a'
    for (let a = 0; a <= 90; a++) {
      const r = (a * Math.PI) / 180
      const len = a % 10 === 0 ? 70 : a % 5 === 0 ? 46 : 26
      ctx.lineWidth = a % 10 === 0 ? 4 : a % 5 === 0 ? 2.5 : 1.5
      ctx.beginPath()
      ctx.moveTo(cx + R * Math.cos(r), cy - R * Math.sin(r))
      ctx.lineTo(cx + (R - len) * Math.cos(r), cy - (R - len) * Math.sin(r))
      ctx.stroke()
      if (a % 10 === 0) {
        ctx.save()
        // pulled in a little at 0° and 90° so those labels stay on the plastic
        const lr = R - (a === 0 || a === 90 ? 150 : 130)
        const edge = a === 90 ? 34 : 0, base = a === 0 ? -30 : 0
        ctx.translate(cx + lr * Math.cos(r) + edge, cy - lr * Math.sin(r) + base)
        ctx.rotate(-r + Math.PI / 2)
        ctx.font = 'bold 64px sans-serif'
        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'
        ctx.fillText(`${a}°`, 0, 0)
        ctx.restore()
      }
    }
  })
  protractorTex.anisotropy = 8
  const protractor = new THREE.Mesh(new THREE.PlaneGeometry(PROT_R, PROT_R), new THREE.MeshBasicMaterial({ map: protractorTex, transparent: true, side: THREE.DoubleSide, depthWrite: false }))
  protractor.position.set(PIVOT.x + PROT_R / 2 - 0.0012, PIVOT.y + PROT_R / 2 - 0.0012, 0.078)
  launcher.add(protractor)

  barrelPivot = new THREE.Group()
  barrelPivot.position.copy(PIVOT)
  const gunmetal = new THREE.MeshStandardMaterial({ color: 0x2b3440, metalness: 0.7, roughness: 0.3 })
  const barrel = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.032, BARREL_LEN, 32), gunmetal)
  barrel.rotation.z = -Math.PI / 2
  barrel.position.x = BARREL_LEN / 2 - 0.04
  // yellow band and muzzle collar
  const band = new THREE.Mesh(new THREE.CylinderGeometry(0.0325, 0.0325, 0.03, 32), new THREE.MeshStandardMaterial({ color: 0xfacc15, roughness: 0.4 }))
  band.rotation.z = -Math.PI / 2
  band.position.x = BARREL_LEN - 0.1
  const collar = new THREE.Mesh(new THREE.CylinderGeometry(0.038, 0.038, 0.026, 32), blackMetal)
  collar.rotation.z = -Math.PI / 2
  collar.position.x = BARREL_LEN - 0.053
  // spring plunger and pull ring at the back
  const cap = new THREE.Mesh(new THREE.CylinderGeometry(0.034, 0.034, 0.02, 32), blackMetal)
  cap.rotation.z = -Math.PI / 2
  cap.position.x = -0.05
  const plunger = new THREE.Mesh(new THREE.CylinderGeometry(0.006, 0.006, 0.06, 12), labMaterials.steel())
  plunger.rotation.z = -Math.PI / 2
  plunger.position.x = -0.085
  const ring = new THREE.Mesh(new THREE.TorusGeometry(0.014, 0.003, 10, 24), labMaterials.steel())
  ring.rotation.y = Math.PI / 2
  ring.position.x = -0.118
  barrelTip = new THREE.Mesh(new THREE.TorusGeometry(0.031, 0.006, 12, 28), labMaterials.chrome())
  barrelTip.rotation.y = Math.PI / 2
  barrelTip.position.x = BARREL_LEN - 0.04
  // Wider invisible handle so the tip is easy to grab
  const tipHandle = new THREE.Mesh(new THREE.SphereGeometry(0.07, 12, 8), new THREE.MeshBasicMaterial({ visible: false }))
  tipHandle.position.x = BARREL_LEN - 0.04
  barrelTip.userData.handle = tipHandle
  // red pointer along the barrel's axis, just in front of the protractor
  const pointer = new THREE.Mesh(new THREE.BoxGeometry(PROT_R * 0.98, 0.0028, 0.0015), new THREE.MeshBasicMaterial({ color: 0xdc2626 }))
  pointer.position.set(PROT_R * 0.49, 0, 0.0795)
  barrelPivot.add(barrel, band, collar, cap, plunger, ring, barrelTip, tipHandle, pointer)
  launcher.add(barrelPivot)
  launcher.traverse(o => { if (o instanceof THREE.Mesh && o !== protractor && o !== pointer) o.castShadow = true })
  scene.add(launcher)

  ball = new THREE.Mesh(new THREE.SphereGeometry(BALL_R, 32, 20), new THREE.MeshStandardMaterial({ color: 0xf97316, roughness: 0.28, metalness: 0.05 }))
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
// close enough to read the protractor and its pointer
const LAUNCHER_VIEW = { pos: new THREE.Vector3(0.28, 0.38, 0.98), target: new THREE.Vector3(0.1, 0.2, 0) }
/** What the camera is centred on: the launcher close up, or the whole set-up (launcher, tape and
 *  where the ball lands). Zooming always closes in on this, so the experiment stays in the middle. */
let viewMode: 'launcher' | 'setup' = 'launcher'
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
  zoomPct.value = z
  try { localStorage.setItem(ZOOM_KEY, String(z)) } catch { /* storage unavailable */ }
  // Re-frames the current view at the new zoom, always centred on the experiment - the launcher in
  // Launcher View, otherwise the launcher, tape and landing point together - so zooming in never
  // pushes the set-up off the screen.
  if (!room.value) return
  cameraGoal = focusView()
}

const LAUNCHER_FOCUS = new THREE.Vector3(0.6, 0.2, 0) // the launcher and the start of the tape
const MIN_LAUNCHER_VIEW_DIST = 0.72 // the whole launcher, protractor included, stays in frame
/** The camera framing for the current view and zoom, centred on the experiment:
 *  - Launcher View: the launcher, never so close that it leaves the screen;
 *  - measuring: the landed ball, so it can be clicked at any zoom;
 *  - otherwise: the whole set-up at 100%, gliding onto the launcher and tape as you zoom in
 *    (centred on them from 200%). */
function focusView(): { pos: THREE.Vector3; target: THREE.Vector3 } {
  if (viewMode === 'launcher') {
    const v = zoomed(LAUNCHER_VIEW)
    const off = v.pos.clone().sub(v.target)
    if (off.length() < MIN_LAUNCHER_VIEW_DIST) v.pos.copy(v.target).addScaledVector(off.normalize(), MIN_LAUNCHER_VIEW_DIST)
    return v
  }
  const base = setupView()
  const offset = base.pos.clone().sub(base.target).multiplyScalar(100 / zoomPct.value)
  let target = base.target.clone()
  if (measureArmed.value && flightState.value === 'landed') {
    target = new THREE.Vector3(ballPos.x, 0.3, 0)
  } else if (zoomPct.value > 100) {
    const t = Math.min(1, (zoomPct.value - 100) / 100)
    target.lerp(LAUNCHER_FOCUS, t)
  }
  return { pos: target.clone().add(offset), target }
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
  return framedView(shot.x0 + shot.vx * shot.T, shot.y0 + (shot.vy * shot.vy) / (2 * GRAVITY))
}
/** Range and highest point of the shot the launcher would fire at its current angle and speed */
function predictedShot() {
  const a = (angleDeg.value * Math.PI) / 180
  const m = muzzle()
  const vx = velocity.value * Math.cos(a), vy = velocity.value * Math.sin(a)
  const T = (vy + Math.sqrt(vy ** 2 + 2 * GRAVITY * (m.y - BALL_R))) / GRAVITY
  return { range: m.x + vx * T, apex: m.y + (vy * vy) / (2 * GRAVITY) }
}
/** The whole set-up: launcher, tape and landing point (the last shot's, or the one coming) */
function setupView() {
  if (flightState.value !== 'idle') return trajectoryView()
  const p = predictedShot()
  return framedView(p.range, p.apex)
}
function framedView(range: number, apex: number) {
  const cam = room.value!.camera as THREE.PerspectiveCamera
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

function viewLauncher() { viewMode = 'launcher'; cameraGoal = focusView() }
function viewField() { viewMode = 'setup'; cameraGoal = focusView() }

function syncScene(dt: number) {
  if (!room.value) return
  launcher.visible = launcherPlaced.value
  tape.visible = !!rulerKey.value && placedKeys.has(rulerKey.value)
  ball.visible = launcherPlaced.value && !!ballCfg.value

  barrelPivot.rotation.z = (angleDeg.value * Math.PI) / 180

  if (flightState.value === 'flying') {
    flightT += dt * FLIGHT_PLAYBACK
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
    // loaded: sitting just inside the mouth of the barrel
    const a = (angleDeg.value * Math.PI) / 180
    ballPos.copy(muzzle()).add(new THREE.Vector3(-Math.cos(a) * 0.05, -Math.sin(a) * 0.05, 0))
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

  if (landingMark.visible) {
    const m = landingMark.material as THREE.MeshBasicMaterial
    if (measureArmed.value) {
      const pulse = 0.5 + 0.5 * Math.sin(performance.now() / 180)
      m.color.setRGB(1, 0.75 + 0.25 * pulse, 0.2 + 0.5 * pulse)
      landingMark.scale.setScalar(1.3 + 0.35 * pulse)
    } else {
      m.color.setHex(0xffffff)
      landingMark.scale.setScalar(1)
    }
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

/** How far (px) a click is from the landed ball on screen */
function screenDistanceToBall(ev: PointerEvent): number {
  const r = room.value
  if (!r) return Infinity
  const rect = r.renderer.domElement.getBoundingClientRect()
  const v = ballPos.clone().project(r.camera)
  const x = rect.left + ((v.x + 1) / 2) * rect.width
  const y = rect.top + ((1 - v.y) / 2) * rect.height
  return Math.hypot(ev.clientX - x, ev.clientY - y)
}

function onPointerDown(ev: PointerEvent) {
  // Measuring: any click near the landed ball counts - the tape lying beside it must not take it
  if (measureArmed.value && flightState.value === 'landed' && screenDistanceToBall(ev) <= 48) {
    ev.stopPropagation()
    takeReading()
    return
  }
  const target = pickTarget(ev)
  if (!target || !room.value) return
  room.value.controls.enabled = false
  cameraGoal = null
  window.addEventListener('pointerup', onPointerUp, { once: true })

  if (target === 'tape') {
    if (measureArmed.value) { flash('Click the ball where it landed (the glowing ring) - zoom in with + if it is small.'); return }
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
  if (guided.value && st() && st()!.required_action !== 'measure') { flash('Follow the steps.'); return }
  measureArmed.value = true
  if (room.value) { viewMode = 'setup'; cameraGoal = focusView() }
}
function takeReading() {
  // the ball is read - the view goes back to the set-up after this
  setTimeout(() => { if (room.value && !measureArmed.value) cameraGoal = focusView() }, 0)
  const noise = (Math.random() - 0.5) * 0.1
  pendingReading.value = { value: String(Math.round((ballPos.x + noise) * 100) / 100) }
  measureArmed.value = false
}
function confirmReading() {
  if (!pendingReading.value) return
  const trial: ProjectileTrial | undefined = guided.value
    ? { angle_deg: firedAngle, range_m: Number(pendingReading.value.value), true_range_m: Math.round(ballPos.x * 100) / 100, speed_ms: velocity.value }
    : undefined
  emit('action', { objectKey: rulerKey.value, action: 'measure', value: pendingReading.value.value, unit: 'm', label: 'Range', targetObjectKey: ballCfg.value?.key ?? null, projectileTrial: trial })
  pendingReading.value = null
}

const { room, unsupported, pick, pointOnPlane } = useLabScene(
  { setting: 'field', cameraPosition: zoomed(LAUNCHER_VIEW).pos.toArray(), target: LAUNCHER_VIEW.target.toArray(), minDistance: 0.3, maxDistance: 90 },
  (r) => {
    buildScene(r.scene)
    r.onFrame(syncScene)
    if (!props.readOnly) flash(guided.value ? 'Take the launcher and the measuring tape from the tray, then follow the steps.' : 'Take the launcher from the tray, set the angle, then fire.')
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
defineExpose({ screenDistanceToBall, measureArmed, setObjectState, angleDeg, nudgeAngle, emitAngle, fire, flightState, armMeasure, takeReading, confirmReading, pendingReading, placedKeys, pickFromTray, selectedKey, ballPos })
</script>
