<template>
  <LabUnsupported v-if="unsupported" />
  <div v-else class="relative w-full h-full rounded-xl overflow-hidden bg-slate-200 select-none">
    <div ref="labHost" class="absolute inset-0" :style="{ cursor: hoverCursor }" @pointerdown.capture="onPointerDown" @pointermove="onHover"></div>

    <!-- Apparatus tray -->
    <div v-if="trayItems.length > 0" class="absolute left-2 top-2 sm:left-3 sm:top-3 max-w-[9rem] bg-white/95 dark:bg-gray-800/95 backdrop-blur rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-2.5 max-h-[calc(100%-1rem)] sm:max-h-[calc(100%-1.5rem)] overflow-y-auto">
      <p class="text-[10px] font-bold uppercase tracking-wide text-gray-400 dark:text-gray-500 mb-1.5">Apparatus Tray</p>
      <div class="space-y-1">
        <button v-for="item in trayItems" :key="item.key" @click="pickFromTray(item.key)" class="w-full flex items-center gap-1.5 px-2 py-1.5 text-xs font-medium rounded-lg bg-gray-50 dark:bg-gray-900/40 text-gray-700 dark:text-gray-200 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors text-left">
          <span>{{ catalogFor(item.object_type)?.icon || '\u{1F9EA}' }}</span>
          <span class="truncate">{{ trayLabel(item) }}</span>
        </button>
      </div>
    </div>

    <!-- Ruler: Measure, then the live reading/record flow -->
    <div v-if="selectedKey === rulerKey" class="absolute right-2 top-2 sm:right-3 sm:top-3 bg-white/95 dark:bg-gray-800/95 backdrop-blur rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-3 max-w-[13rem] max-h-[calc(100%-1rem)] sm:max-h-[calc(100%-1.5rem)] overflow-y-auto">
      <div class="flex items-center justify-between gap-2 mb-2">
        <p class="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">Ruler</p>
        <button @click="deselect" class="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 text-xs leading-none">&times;</button>
      </div>
      <LabButton v-if="!measureArmed && !pendingReading" size="sm" :disabled="readOnly || !springMounted" @click="armMeasure">Measure</LabButton>
      <p v-if="!springMounted" class="text-[11px] text-amber-600 dark:text-amber-400 mt-1">Hang the spring on the stand first.</p>
      <p v-else-if="!currentMetalKey && referenceCm === null" class="text-[11px] text-amber-600 dark:text-amber-400 mt-1">Measure now to record the reference (unloaded) pointer position.</p>
      <p v-else-if="!currentMetalKey" class="text-[11px] text-gray-400 dark:text-gray-500 mt-1">Reference: {{ referenceCm!.toFixed(2) }} cm. Hang a metal sample to begin a trial.</p>
      <div v-if="measureArmed" class="mt-2 pt-2 border-t border-gray-100 dark:border-gray-700 text-[11px] text-amber-600 dark:text-amber-400">Click the spring to read the pointer.</div>
      <div v-if="pendingReading" class="mt-2 pt-2 border-t border-gray-100 dark:border-gray-700">
        <p class="text-[11px] font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wide mb-1">{{ !currentMetalKey ? 'Reference reading' : (immersed ? 'Reading in water' : 'Reading in air') }}</p>
        <div class="flex items-center gap-2">
          <span class="flex-1 text-base font-bold text-gray-900 dark:text-white">{{ pendingReading.value }}<span class="text-xs font-medium text-gray-400 ml-1">cm</span></span>
          <LabButton size="sm" variant="success" @click="confirmReading">Record</LabButton>
        </div>
      </div>
    </div>

    <!-- Current trial status -->
    <div v-if="springMounted" class="absolute right-2 bottom-2 sm:right-3 sm:bottom-3 bg-white/95 dark:bg-gray-800/95 backdrop-blur rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-3 flex flex-col gap-1.5 w-48">
      <p class="text-[11px] font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wide">{{ currentMetalKey ? metalLabel(currentMetalKey) : 'No metal attached' }}</p>
      <LabMeasurementLabel label="Reference" :value="referenceCm !== null ? referenceCm.toFixed(2) : '—'" unit=" cm" />
      <LabMeasurementLabel label="e (air)" :value="localEaCm !== null ? localEaCm.toFixed(2) : '—'" unit=" cm" />
      <LabMeasurementLabel label="e (water)" :value="localEwCm !== null ? localEwCm.toFixed(2) : '—'" unit=" cm" />
      <LabButton
        v-if="currentMetalKey"
        size="sm"
        :variant="immersed ? 'secondary' : 'primary'"
        :disabled="readOnly || !beakerPlaced"
        @click="toggleImmersed"
      >{{ immersed ? 'Remove from Water' : 'Immerse in Water' }}</LabButton>
      <p v-if="currentMetalKey && !beakerPlaced" class="text-[11px] text-amber-600 dark:text-amber-400">Place the beaker first.</p>
    </div>

    <button @click="room?.resetView()" class="absolute left-2 bottom-2 sm:left-3 sm:bottom-3 px-3 py-1.5 text-xs font-semibold rounded-lg bg-white/95 dark:bg-gray-800/95 shadow-lg border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700">Reset View</button>

    <transition enter-active-class="transition duration-200 ease-out" enter-from-class="opacity-0 -translate-y-1" leave-active-class="transition duration-150 ease-in" leave-to-class="opacity-0">
      <div v-if="hint" class="absolute left-1/2 -translate-x-1/2 top-2 sm:top-3 bg-amber-500 text-white text-xs font-medium px-4 py-2 rounded-2xl shadow-lg text-center max-w-[calc(100vw-2rem)]">{{ hint }}</div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onBeforeUnmount } from 'vue'
import * as THREE from 'three'
import { canvasTexture, labMaterials } from './lab3d/labRoom'
import { useLabScene } from './lab3d/useLabScene'
import { buildRetortStand, buildHangingRuler, type HangingRuler } from './lab3d/apparatus'
import { createObjectMesh } from './labObjectFactory'
import LabUnsupported from './lab3d/LabUnsupported.vue'
import LabButton from './ui/LabButton.vue'
import LabMeasurementLabel from './ui/LabMeasurementLabel.vue'
import type { SceneObjectConfig, LabObjectDef, LabAction } from '@/types/virtualLab'
import type { CameraView } from './VirtualLabScene.vue'

const props = defineProps<{
  sceneObjects: SceneObjectConfig[]
  objectCatalog: LabObjectDef[]
  connections?: { from: string; to: string }[]
  readOnly?: boolean
}>()

const emit = defineEmits<{
  action: [{ objectKey: string | null; action: LabAction; value: string | null; unit?: string | null; label?: string | null; safetyIssue?: boolean; targetObjectKey?: string | null }]
}>()

function catalogFor(objectType: string) {
  return props.objectCatalog.find(o => o.object_type === objectType)
}
function mergedProps(key: string): Record<string, any> {
  const cfg = props.sceneObjects.find(o => o.key === key)
  const def = cfg ? catalogFor(cfg.object_type) : null
  return { ...(def?.default_props || {}), ...(cfg?.props || {}) }
}

const standCfg = computed(() => props.sceneObjects.find(o => o.object_type === 'retort_stand'))
const springCfg = computed(() => props.sceneObjects.find(o => o.object_type === 'spring'))
const rulerCfg = computed(() => props.sceneObjects.find(o => o.object_type === 'ruler'))
const beakerCfg = computed(() => props.sceneObjects.find(o => o.object_type === 'beaker'))
const metalCfgs = computed(() => props.sceneObjects.filter(o => o.object_type === 'mass_piece'))
const standKey = computed(() => standCfg.value?.key ?? 'stand1')
const springKey = computed(() => springCfg.value?.key ?? 'spring1')
const rulerKey = computed(() => rulerCfg.value?.key ?? 'rule1')
const beakerKey = computed(() => beakerCfg.value?.key ?? 'beaker1')

function metalLabel(key: string) {
  const n = parseInt(key.replace('metal', ''), 10) || 0
  return `M${n}`
}
function trayLabel(item: SceneObjectConfig) {
  return item.object_type === 'mass_piece' ? metalLabel(item.key) : (catalogFor(item.object_type)?.display_name || item.object_type)
}

// --- Apparatus tray: pick once and it's placed on the bench for good ---------------------------
const placedKeys = reactive(new Set<string>())
const trayItems = computed(() => props.sceneObjects.filter(o => !placedKeys.has(o.key)))

function pickFromTray(key: string) {
  if (props.readOnly) return
  placedKeys.add(key)
  // Taking a sample out of the tray isn't a graded step - hanging it on the thread is.
  if (props.sceneObjects.find(o => o.key === key)?.object_type === 'mass_piece') return
  // 'tray' marks this as a pick-up, distinct from mounting the spring or hanging a sample (also
  // 'move' actions) - so the pick-up steps can never swallow one of those and leave its own step
  // waiting for an action that can't happen twice.
  emit('action', { objectKey: key, action: 'move', value: 'tray' })
}

const coreApparatusPlaced = computed(() => [standKey.value, springKey.value, rulerKey.value, beakerKey.value].every(k => placedKeys.has(k)))

// --- Spring physics: F = mg, upthrust = rho_water * V * g when immersed, x = F/k ----------------
// Each metal is the same 100g, but a hidden true density (unknown to the student, same idea as the
// concave mirror's hidden focal length) sets how much upthrust it feels in water - a denser sample
// loses less extension, which is exactly what a real relative-density-by-spring-extension practical
// measures. Three of the six are genuine silver (10200-10500 kg/m3); the other three are not. The
// silver ones sit near the middle of the band: density ~ e_a / (e_a - e_w) magnifies any reading
// error about tenfold, so a sample right at the edge could land either side on reading error alone.
const TRUE_DENSITY_KGM3: Record<string, number> = {
  metal1: 10350, // silver
  metal2: 8960, // copper
  metal3: 10340, // silver
  metal4: 11340, // lead
  metal5: 7850, // iron
  metal6: 10360, // silver
}

const springMounted = ref(false)
const currentMetalKey = ref<string | null>(null)
const immersed = ref(false)

const massOf = (key: string) => Number(mergedProps(key).mass_g ?? 100)
const springProps = computed(() => mergedProps(springKey.value))
const naturalLengthCm = computed(() => Number(springProps.value.natural_length_cm ?? 10))
// A soft spring (5 N/m: ~19.6 cm for 100 g) on purpose - with a stiff one the loss of extension in
// water is only a few millimetres and ordinary reading error swamps the density result.
const springConstant = computed(() => Number(springProps.value.spring_constant_n_per_m ?? 5))

const forceAirN = computed(() => (currentMetalKey.value ? (massOf(currentMetalKey.value) / 1000) * 9.8 : 0))
const upthrustN = computed(() => {
  if (!currentMetalKey.value || !immersed.value) return 0
  const density = TRUE_DENSITY_KGM3[currentMetalKey.value] ?? 10000
  const volumeM3 = massOf(currentMetalKey.value) / 1000 / density
  return 1000 * volumeM3 * 9.8
})
const rawExtensionCm = computed(() => (Math.max(0, forceAirN.value - upthrustN.value) / springConstant.value) * 100)
/** Eases toward the real extension (the settling animation); readings use the real value. */
const displayExtension = ref(0)
/** True once the pointer's on-screen position has actually caught up with the real extension - a
 *  reading taken before this would be reading a spring that's still swinging/settling. */
const isSettled = computed(() => Math.abs(rawExtensionCm.value - displayExtension.value) < 0.03)

// --- Scene (metres; bench top y = 0; the spring hangs in the z = 0 plane) -----------------------
// Same stand height and proportions as every other retort-stand experiment (Hooke's Law, Pendulum,
// Titration) - a shoulder-height clamp, not a low one. A thread (THREAD_LEN_M) carries the hanging
// metal the rest of the way down to just above a beaker standing directly on the bench, the same
// role the real apparatus's 20cm thread plays - no riser block needed. Immersing it lowers it a
// further IMMERSE_DROP_M down the same thread, into the water; the spring itself never gets near it.
const CLAMP = new THREE.Vector3(0, 0.62, 0)
const RULER_MAX_CM = 100
const HANGER_ROD = 0.05
const METAL_RADIUS = 0.02
const METAL_HEIGHT = 0.025
// Behind the row of samples (see benchSlot), clear of the beaker and the rule
const SPRING_REST = new THREE.Vector3(0.3, 0.014, -0.02)
const BEAKER_XZ = new THREE.Vector3(0, 0, 0) // fixed, directly under the hanging metal
const THREAD_LEN_M = 0.14
// Enough to clear every sample's top below the water line (~5.6 cm) once the upthrust has shortened
// the spring again, while its bottom stays clear of the beaker floor.
const IMMERSE_DROP_M = 0.13
const THREAD_RADIUS = 0.0012

let stand: THREE.Group
let springGroup: THREE.Group
let coil: THREE.Mesh
let bottomHook: THREE.Mesh
let hanger: THREE.Group
let grabZone: THREE.Mesh
let marker: THREE.Line
let thread: THREE.Mesh
let ruler: HangingRuler | null = null
let beakerGroup: THREE.Group | null = null
/** createObjectMesh's name tag - shown only while the beaker is hovered, or it sits over the sample. */
let beakerLabel: THREE.Object3D | null = null
const metalMeshes = new Map<string, THREE.Mesh>()
const coilMaterial = labMaterials.steel()
let builtCoilLength = -1

class Helix extends THREE.Curve<THREE.Vector3> {
  constructor(private length: number, private radius: number, private turns: number) { super() }
  getPoint(t: number, target = new THREE.Vector3()) {
    const a = t * this.turns * Math.PI * 2
    return target.set(this.radius * Math.cos(a), -t * this.length, this.radius * Math.sin(a))
  }
}

function rebuildCoil(lengthM: number) {
  if (Math.abs(lengthM - builtCoilLength) < 0.0005) return
  builtCoilLength = lengthM
  coil.geometry.dispose()
  coil.geometry = new THREE.TubeGeometry(new Helix(lengthM, 0.009, 14), 220, 0.0011, 6, false)
  bottomHook.position.y = -lengthM - 0.004
  hanger.position.y = -lengthM - 0.008
  const total = lengthM + 0.008 + HANGER_ROD
  grabZone.scale.y = total
  grabZone.position.y = -total / 2
}

function metalTexture(label: string) {
  return canvasTexture(256, 256, (ctx, w, h) => {
    ctx.fillStyle = '#c9a227'
    ctx.fillRect(0, 0, w, h)
    ctx.fillStyle = '#8a6d1a'
    ctx.beginPath()
    ctx.arc(w / 2, h / 2, 26, 0, Math.PI * 2)
    ctx.fill()
    ctx.fillRect(w / 2 - 10, h / 2, 20, h / 2)
    ctx.fillStyle = '#fff7e0'
    ctx.font = 'bold 44px sans-serif'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillText(label, w / 2, h / 2 - 66)
  })
}

function buildApparatus(scene: THREE.Scene) {
  stand = buildRetortStand({ pivot: CLAMP, rodX: -0.2, armZ: -0.07, armEnd: 0.1 })
  scene.add(stand)

  springGroup = new THREE.Group()
  const topEye = new THREE.Mesh(new THREE.TorusGeometry(0.005, 0.0012, 8, 20), coilMaterial)
  topEye.position.y = 0.005
  springGroup.add(topEye)
  coil = new THREE.Mesh(new THREE.BufferGeometry(), coilMaterial)
  coil.castShadow = true
  springGroup.add(coil)
  bottomHook = new THREE.Mesh(new THREE.TorusGeometry(0.005, 0.0012, 8, 20), coilMaterial)
  springGroup.add(bottomHook)

  hanger = new THREE.Group()
  const hangerMat = labMaterials.chrome()
  const rod = new THREE.Mesh(new THREE.CylinderGeometry(0.002, 0.002, HANGER_ROD, 12), hangerMat)
  rod.position.y = -HANGER_ROD / 2
  const base = new THREE.Mesh(new THREE.CylinderGeometry(0.016, 0.016, 0.003, 32), hangerMat)
  base.position.y = -HANGER_ROD
  rod.castShadow = base.castShadow = true
  hanger.add(rod, base)
  springGroup.add(hanger)
  grabZone = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.02, 1, 12), new THREE.MeshBasicMaterial({ visible: false }))
  springGroup.add(grabZone)
  scene.add(springGroup)

  metalCfgs.value.forEach((cfg) => {
    const side = labMaterials.castIron()
    side.color.setHex(0xb8860b)
    const top = new THREE.MeshStandardMaterial({ map: metalTexture(metalLabel(cfg.key)), metalness: 0.45, roughness: 0.4 })
    const mesh = new THREE.Mesh(new THREE.CylinderGeometry(METAL_RADIUS, METAL_RADIUS, METAL_HEIGHT, 32), [side, top, side])
    mesh.castShadow = true
    mesh.receiveShadow = true
    scene.add(mesh)
    metalMeshes.set(cfg.key, mesh)
  })

  if (rulerCfg.value) {
    ruler = buildHangingRuler(RULER_MAX_CM, new THREE.Vector3(0.06, CLAMP.y, -0.03), -0.07)
    scene.add(ruler.group)
  }

  if (beakerCfg.value) {
    beakerGroup = createObjectMesh('beaker', beakerKey.value, 'Beaker', { color: '#bcd9f2' })
    beakerGroup.scale.setScalar(0.2)
    beakerGroup.position.copy(BEAKER_XZ)
    beakerLabel = beakerGroup.children.find(c => c.userData?.role === 'label') ?? null
    if (beakerLabel) beakerLabel.visible = false
    scene.add(beakerGroup)
  }

  marker = new THREE.Line(
    new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(), new THREE.Vector3()]),
    new THREE.LineDashedMaterial({ color: 0xdc2626, dashSize: 0.004, gapSize: 0.003 }),
  )
  scene.add(marker)

  // Thread: ties whichever metal is on the hook to the hanger, the rest of the way down to the
  // beaker - stretched and re-aimed between the two points every frame in syncScene.
  thread = new THREE.Mesh(new THREE.CylinderGeometry(THREAD_RADIUS, THREAD_RADIUS, 1, 8), new THREE.MeshStandardMaterial({ color: 0xe5e7eb, roughness: 0.8 }))
  scene.add(thread)

  rebuildCoil(naturalLengthCm.value / 100)
}

/** Stretches and aims a unit cylinder from `a` to `b` (e.g. the thread). */
function stretchBetween(mesh: THREE.Mesh, a: THREE.Vector3, b: THREE.Vector3) {
  const dir = b.clone().sub(a)
  const len = dir.length()
  mesh.position.copy(a).addScaledVector(dir, 0.5)
  mesh.scale.y = Math.max(0.0001, len)
  if (len > 0.0001) mesh.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir.normalize())
}

// --- Dragging --------------------------------------------------------------------------------------
const dragPlane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0)
const dragPoint = new THREE.Vector3()
const hoverCursor = ref('grab')
let dragging: { kind: 'spring' } | { kind: 'metal'; key: string } | null = null

/** M1-M6 in one row along the front of the bench, in order. */
function benchSlot(key: string) {
  const i = metalCfgs.value.findIndex(c => c.key === key)
  return new THREE.Vector3(0.14 + i * 0.065, METAL_HEIGHT / 2, 0.16)
}

function hangerBaseTop(): THREE.Vector3 {
  return new THREE.Vector3(CLAMP.x, CLAMP.y - builtCoilLength - 0.008 - HANGER_ROD + 0.002, CLAMP.z)
}

/** Where a metal sample actually hangs: down the thread from the hanger, and a further
 *  IMMERSE_DROP_M lower still once it's been lowered into the water. */
function metalAttachPoint(): THREE.Vector3 {
  const base = hangerBaseTop()
  const drop = THREAD_LEN_M + (immersed.value ? IMMERSE_DROP_M : 0)
  return new THREE.Vector3(base.x, base.y - drop, base.z)
}

const beakerPlaced = computed(() => placedKeys.has(beakerKey.value))

function syncScene(dt: number) {
  const diff = rawExtensionCm.value - displayExtension.value
  displayExtension.value = Math.abs(diff) < 0.01 ? rawExtensionCm.value : displayExtension.value + diff * (1 - Math.exp(-dt * 10))

  stand.visible = placedKeys.has(standKey.value)
  springGroup.visible = placedKeys.has(springKey.value)
  if (ruler) ruler.group.visible = placedKeys.has(rulerKey.value)

  if (springMounted.value) {
    springGroup.position.copy(CLAMP)
    springGroup.rotation.set(0, 0, 0)
    rebuildCoil((naturalLengthCm.value + displayExtension.value) / 100)
  } else if (dragging?.kind === 'spring') {
    springGroup.position.copy(dragPoint)
    springGroup.rotation.set(0, 0, 0)
    rebuildCoil(naturalLengthCm.value / 100)
  } else {
    springGroup.position.copy(SPRING_REST)
    springGroup.rotation.set(0, 0, Math.PI / 2)
    rebuildCoil(naturalLengthCm.value / 100)
  }

  if (beakerGroup) beakerGroup.visible = placedKeys.has(beakerKey.value)

  const draggedKey = dragging?.kind === 'metal' ? dragging.key : null
  metalMeshes.forEach((mesh, key) => {
    mesh.visible = placedKeys.has(key)
    if (key === draggedKey) mesh.position.copy(dragPoint)
    else if (key === currentMetalKey.value) {
      const at = metalAttachPoint()
      mesh.position.set(at.x, at.y + METAL_HEIGHT / 2, at.z)
    } else mesh.position.copy(benchSlot(key))
  })

  thread.visible = springMounted.value && !!currentMetalKey.value && draggedKey !== currentMetalKey.value
  if (thread.visible) {
    const top = hangerBaseTop()
    const at = metalAttachPoint()
    stretchBetween(thread, top, new THREE.Vector3(at.x, at.y + METAL_HEIGHT, at.z))
  }

  const showMarker = springMounted.value && !!currentMetalKey.value && !!ruler?.group.visible
  marker.visible = showMarker
  if (showMarker) {
    const y = CLAMP.y - builtCoilLength
    const pos = marker.geometry.attributes.position as THREE.BufferAttribute
    pos.setXYZ(0, 0.012, y, 0)
    pos.setXYZ(1, 0.04, y, -0.028)
    pos.needsUpdate = true
    marker.computeLineDistances()
  }

  ruler?.setArmed(measureArmed.value)
}

type Target = { kind: 'spring' } | { kind: 'metal'; key: string } | { kind: 'ruler' } | { kind: 'beaker' }
function pickTarget(ev: PointerEvent): Target | null {
  if (!springGroup) return null
  const targets: THREE.Object3D[] = [springGroup, ...metalMeshes.values()]
  if (ruler) targets.push(ruler.mesh)
  if (beakerGroup) targets.push(beakerGroup)
  const hit = pick(ev, targets)
  if (!hit) return null
  if (hit === springGroup) return { kind: 'spring' }
  if (ruler && hit === ruler.mesh) return { kind: 'ruler' }
  if (beakerGroup && hit === beakerGroup) return { kind: 'beaker' }
  for (const [key, mesh] of metalMeshes) if (mesh === hit) return { kind: 'metal', key }
  return null
}

function onHover(ev: PointerEvent) {
  if (dragging) return
  const target = pickTarget(ev)
  hoverCursor.value = target ? 'pointer' : 'grab'
  if (beakerLabel) beakerLabel.visible = target?.kind === 'beaker'
}

function toggleImmersed() {
  if (props.readOnly || !currentMetalKey.value || !beakerPlaced.value) return
  immersed.value = !immersed.value
}

function onPointerDown(ev: PointerEvent) {
  if (handleFurnitureClick(ev)) return
  const target = pickTarget(ev)
  if (!target || !room.value) return

  if (target.kind === 'ruler') {
    selectObject(rulerKey.value)
    return
  }
  if (props.readOnly) return

  if (target.kind === 'beaker') {
    toggleImmersed()
    return
  }

  if (measureArmed.value && target.kind === 'spring' && springMounted.value) {
    const noise = (Math.random() - 0.5) * 0.01
    pendingReading.value = { value: String(Math.round((naturalLengthCm.value + rawExtensionCm.value + noise) * 100) / 100) }
    measureArmed.value = false
    return
  }

  if (target.kind === 'spring' && springMounted.value) return
  room.value.controls.enabled = false
  window.addEventListener('pointerup', onPointerUp, { once: true })
  dragging = target
  hoverCursor.value = 'grabbing'
  onDragMove(ev)
  window.addEventListener('pointermove', onDragMove)
}

function onDragMove(ev: PointerEvent) {
  if (!dragging) return
  pointOnPlane(ev, dragPlane, dragPoint)
  dragPoint.y = Math.max(0.02, dragPoint.y)
}

function onPointerUp() {
  window.removeEventListener('pointermove', onDragMove)
  if (room.value) room.value.controls.enabled = true
  if (!dragging) return
  const was = dragging
  dragging = null
  hoverCursor.value = 'grab'

  if (was.kind === 'spring') {
    const nearClamp = dragPoint.distanceTo(CLAMP) < 0.08
    if (nearClamp && placedKeys.has(standKey.value) && !coreApparatusPlaced.value) {
      flash('Take the rest of the apparatus out of the tray first, then hang the spring.')
    } else if (nearClamp && placedKeys.has(standKey.value)) {
      springMounted.value = true
      emit('action', { objectKey: springKey.value, action: 'move', value: standKey.value })
    } else {
      flash(placedKeys.has(standKey.value) ? 'Drag the spring up to the retort stand’s clamp.' : 'Place the retort stand from the tray first.')
    }
    return
  }

  const key = was.key
  const wasAttached = key === currentMetalKey.value
  // Anywhere under the hook counts, from the hanger itself down to just above the beaker - where it
  // actually ends up depends on how far its weight then stretches the spring.
  const base = hangerBaseTop()
  const onHanger = springMounted.value && Math.abs(dragPoint.x - base.x) < 0.08 && dragPoint.y > 0.08 && dragPoint.y < base.y + 0.05

  if (onHanger && !wasAttached) {
    if (referenceCm.value === null) {
      flash('Record the reference position (nothing on the hook) before hanging a sample.')
      return
    }
    if (currentMetalKey.value) {
      flash('Remove the current metal from the hook before hanging another.')
      return
    }
    currentMetalKey.value = key
    immersed.value = false
    localAirCm.value = null
    localWaterCm.value = null
    emit('action', { objectKey: key, action: 'move', value: springKey.value })
  } else if (!onHanger && wasAttached) {
    // Removing a metal is free and unscored - it just ends this trial.
    currentMetalKey.value = null
    immersed.value = false
    localAirCm.value = null
    localWaterCm.value = null
  } else if (!onHanger && springMounted.value && !currentMetalKey.value) {
    flash('Drop the metal sample onto the hook under the spring.')
  }
}

// --- Ruler measurement ---------------------------------------------------------------------------
const selectedKey = ref<string | null>(null)
const measureArmed = ref(false)
const pendingReading = ref<{ value: string } | null>(null)
const hint = ref<string | null>(null)
// The reference (unloaded) pointer position - taken once, with nothing on the hook, and reused for
// every sample's ea/ew; the raw air/water readings for whichever sample is currently attached.
const referenceCm = ref<number | null>(null)
const localAirCm = ref<number | null>(null)
const localWaterCm = ref<number | null>(null)
const localEaCm = computed(() => (localAirCm.value !== null && referenceCm.value !== null) ? Math.round((localAirCm.value - referenceCm.value) * 100) / 100 : null)
const localEwCm = computed(() => (localWaterCm.value !== null && referenceCm.value !== null) ? Math.round((localWaterCm.value - referenceCm.value) * 100) / 100 : null)

function flash(text: string) {
  hint.value = text
  setTimeout(() => { if (hint.value === text) hint.value = null }, 3500)
}

function selectObject(key: string) {
  selectedKey.value = key
  measureArmed.value = false
  pendingReading.value = null
}
function deselect() {
  selectedKey.value = null
  measureArmed.value = false
  pendingReading.value = null
}
function armMeasure() {
  if (props.readOnly || !springMounted.value) return
  if (currentMetalKey.value && referenceCm.value === null) {
    flash('Record the reference position before measuring the extension.')
    return
  }
  if (!isSettled.value) {
    flash('Wait for the spring and pointer to become stationary.')
    return
  }
  measureArmed.value = true
  pendingReading.value = null
}
function confirmReading() {
  if (!pendingReading.value || !rulerCfg.value) return
  const value = pendingReading.value.value
  const num = parseFloat(value)
  pendingReading.value = null

  if (!currentMetalKey.value) {
    // Nothing on the hook - this is the reference (unloaded) reading, reused for every sample.
    referenceCm.value = num
    emit('action', { objectKey: springKey.value, action: 'measure', value, unit: 'cm', label: 'Reference Reading', targetObjectKey: springKey.value })
    flash('Reference recorded. Now hang a metal sample on the hook.')
    return
  }

  if (immersed.value) localWaterCm.value = num
  else localAirCm.value = num
  emit('action', {
    objectKey: currentMetalKey.value, action: 'measure', value, unit: 'cm',
    label: immersed.value ? 'Metal Water Reading' : 'Metal Air Reading',
    targetObjectKey: springKey.value,
  })
  // Once both readings are in for this metal, the trial is complete - free the hook for the next one.
  if (localAirCm.value !== null && localWaterCm.value !== null) {
    flash(`${metalLabel(currentMetalKey.value)} done - remove it and hang the next sample.`)
  }
}

const HOME_POS: THREE.Vector3Tuple = [0.34, 0.42, 1.55]
const HOME_TARGET: THREE.Vector3Tuple = [0.06, 0.28, 0]
const { room, unsupported, pick, pointOnPlane, handleFurnitureClick } = useLabScene(
  { cameraPosition: HOME_POS, target: HOME_TARGET, minDistance: 0.35, maxDistance: 12, cupboard: true, wallCabinets: true, shelfCatalog: () => props.objectCatalog, benchLength: 3 },
  (r) => {
    buildApparatus(r.scene)
    r.onFrame(syncScene)
    if (!props.readOnly) flash('Take the apparatus from the tray, hang the spring on the clamp, then measure the reference (unloaded) pointer position before hanging a sample.')
  },
)

onBeforeUnmount(() => {
  window.removeEventListener('pointermove', onDragMove)
  window.removeEventListener('pointerup', onPointerUp)
})

function setObjectState() {
  // No switchable apparatus in this experiment - kept for the renderer interface.
}

// Same room-navigation views as the Apparatus Playground / free-layout engine.
function goToView(view: CameraView) {
  const r = room.value
  if (!r) return
  if (view === 'bench') r.flyTo(new THREE.Vector3(...HOME_POS), new THREE.Vector3(...HOME_TARGET))
  else if (view === 'entrance') r.flyTo(new THREE.Vector3(2.4, 0.95, 2.4), new THREE.Vector3(0, 0.25, 7))
  else if (view === 'left') r.flyTo(new THREE.Vector3(-1.2, 1.0, 1.6), new THREE.Vector3(-7, 0.45, 1.6))
  else r.flyTo(new THREE.Vector3(1.2, 1.0, 1.6), new THREE.Vector3(7, 0.45, 1.6))
}

defineExpose({ setObjectState, goToView })
</script>
