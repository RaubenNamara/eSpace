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
          <span class="truncate">{{ catalogFor(item.object_type)?.display_name || item.object_type }}</span>
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
      <div v-if="measureArmed" class="mt-2 pt-2 border-t border-gray-100 dark:border-gray-700 text-[11px] text-amber-600 dark:text-amber-400">Click the spring to measure its length.</div>
      <div v-if="pendingReading" class="mt-2 pt-2 border-t border-gray-100 dark:border-gray-700">
        <p class="text-[11px] font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wide mb-1">Reading</p>
        <div class="flex items-center gap-2">
          <span class="flex-1 text-base font-bold text-gray-900 dark:text-white">{{ pendingReading.value }}<span class="text-xs font-medium text-gray-400 ml-1">cm</span></span>
          <LabButton size="sm" variant="success" @click="confirmReading">Record</LabButton>
        </div>
      </div>
    </div>

    <!-- Live readouts -->
    <div v-if="springMounted" class="absolute right-2 bottom-2 sm:right-3 sm:bottom-3 bg-white/95 dark:bg-gray-800/95 backdrop-blur rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-3 flex flex-col gap-1.5">
      <LabMeasurementLabel label="Mass" :value="totalMassG" unit=" g" />
      <LabMeasurementLabel label="Force" :value="forceN" unit=" N" />
      <LabMeasurementLabel label="Extension" :value="displayExtension.toFixed(1)" unit=" cm" />
    </div>

    <button @click="room?.resetView()" class="absolute left-2 bottom-2 sm:left-3 sm:bottom-3 px-3 py-1.5 text-xs font-semibold rounded-lg bg-white/95 dark:bg-gray-800/95 shadow-lg border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700">Reset View</button>

    <transition enter-active-class="transition duration-200 ease-out" enter-from-class="opacity-0 -translate-y-1" leave-active-class="transition duration-150 ease-in" leave-to-class="opacity-0">
      <div v-if="hint" class="absolute left-1/2 -translate-x-1/2 top-2 sm:top-3 bg-amber-500 text-white text-xs font-medium px-4 py-2 rounded-2xl shadow-lg text-center max-w-[calc(100vw-2rem)]">{{ hint }}</div>
    </transition>
    <transition enter-active-class="transition duration-200 ease-out" enter-from-class="opacity-0 -translate-y-1" leave-active-class="transition duration-150 ease-in" leave-to-class="opacity-0">
      <div v-if="warning" class="absolute left-1/2 -translate-x-1/2 bottom-14 bg-red-500 text-white text-xs sm:text-sm font-medium px-4 py-2.5 rounded-2xl shadow-lg text-center max-w-[calc(100vw-2rem)]">{{ warning }}</div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onBeforeUnmount } from 'vue'
import * as THREE from 'three'
import { canvasTexture, labMaterials } from './lab3d/labRoom'
import { useLabScene } from './lab3d/useLabScene'
import { buildRetortStand, buildHangingRuler, type HangingRuler } from './lab3d/apparatus'
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
  action: [{ objectKey: string | null; action: LabAction; value: string | null; unit?: string | null; label?: string | null; safetyIssue?: boolean; targetObjectKey?: string | null; springLoadG?: number }]
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
const massCfgs = computed(() => props.sceneObjects.filter(o => o.object_type === 'mass_piece'))
const standKey = computed(() => standCfg.value?.key ?? 'stand1')
const springKey = computed(() => springCfg.value?.key ?? 'spring1')
const rulerKey = computed(() => rulerCfg.value?.key ?? 'ruler1')

// --- Apparatus tray: pick once and it's placed on the bench for good ---------------------------
const placedKeys = reactive(new Set<string>())
const trayItems = computed(() => props.sceneObjects.filter(o => !placedKeys.has(o.key)))

function pickFromTray(key: string) {
  if (props.readOnly) return
  placedKeys.add(key)
  emit('action', { objectKey: key, action: 'move', value: key })
}

// --- Spring physics: F = mg, x = F/k, with a permanent set once the elastic limit is passed ----
const springMounted = ref(false)
const attachedMassKeys = reactive<string[]>([])
const permanentDeformCm = ref(0)

const massOf = (key: string) => Number(mergedProps(key).mass_g ?? 50)
const totalMassG = computed(() => attachedMassKeys.reduce((sum, k) => sum + massOf(k), 0))
const forceN = computed(() => Math.round((totalMassG.value / 1000) * 9.8 * 100) / 100)
const springProps = computed(() => mergedProps(springKey.value))
const rawExtensionCm = computed(() => {
  const k = Number(springProps.value.spring_constant_n_per_m ?? 40)
  return ((totalMassG.value / 1000) * 9.8 / k) * 100
})
const maxSafeCm = computed(() => Number(springProps.value.max_safe_extension_cm ?? 12))
const extensionCm = computed(() => rawExtensionCm.value + permanentDeformCm.value)
const naturalLengthCm = computed(() => Number(springProps.value.natural_length_cm ?? 15))

/** Eases toward the real extension (the settling animation); readings use the real value. */
const displayExtension = ref(0)

// --- Scene (metres; bench top y = 0; the spring hangs in the z = 0 plane) -----------------------
const CLAMP = new THREE.Vector3(0, 0.62, 0)
const RULER_MAX_CM = 40
const HANGER_ROD = 0.07
const MASS_RADIUS = 0.022
const SPRING_REST = new THREE.Vector3(0.28, 0.014, 0.24)

let stand: THREE.Group
let springGroup: THREE.Group
let coil: THREE.Mesh
let bottomHook: THREE.Mesh
let hanger: THREE.Group
/** Invisible but raycastable - the coil wire alone is far too thin to grab. */
let grabZone: THREE.Mesh
let marker: THREE.Line
let ruler: HangingRuler | null = null
const massMeshes = new Map<string, THREE.Mesh>()
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
  coil.geometry = new THREE.TubeGeometry(new Helix(lengthM, 0.011, 18), 288, 0.0013, 6, false)
  bottomHook.position.y = -lengthM - 0.004
  hanger.position.y = -lengthM - 0.008
  const total = lengthM + 0.008 + HANGER_ROD
  grabZone.scale.y = total
  grabZone.position.y = -total / 2
}

function massHeight(key: string) {
  // Real slotted iron mass: 7.8 g/cm^3, so thickness follows from the weight
  return massOf(key) / (7.8 * Math.PI * (MASS_RADIUS * 100) ** 2) / 100
}

function massTexture(label: string) {
  return canvasTexture(256, 256, (ctx, w, h) => {
    ctx.fillStyle = '#3f4650'
    ctx.fillRect(0, 0, w, h)
    ctx.fillStyle = '#1f2328'
    ctx.beginPath()
    ctx.arc(w / 2, h / 2, 26, 0, Math.PI * 2)
    ctx.fill()
    ctx.fillRect(w / 2 - 10, h / 2, 20, h / 2)
    ctx.fillStyle = '#e5e7eb'
    ctx.font = 'bold 54px sans-serif'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillText(label, w / 2, h / 2 - 66)
  })
}

function buildApparatus(scene: THREE.Scene) {
  stand = buildRetortStand({ pivot: CLAMP, rodX: -0.2, armZ: -0.07, armEnd: 0.1 })
  scene.add(stand)

  // Spring with a top eye, bottom hook, and the slotted-mass hanger below it
  springGroup = new THREE.Group()
  const topEye = new THREE.Mesh(new THREE.TorusGeometry(0.006, 0.0013, 8, 20), coilMaterial)
  topEye.position.y = 0.005
  springGroup.add(topEye)
  coil = new THREE.Mesh(new THREE.BufferGeometry(), coilMaterial)
  coil.castShadow = true
  springGroup.add(coil)
  bottomHook = new THREE.Mesh(new THREE.TorusGeometry(0.006, 0.0013, 8, 20), coilMaterial)
  springGroup.add(bottomHook)

  hanger = new THREE.Group()
  const hangerMat = labMaterials.chrome()
  const rod = new THREE.Mesh(new THREE.CylinderGeometry(0.0025, 0.0025, HANGER_ROD, 12), hangerMat)
  rod.position.y = -HANGER_ROD / 2
  const base = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.02, 0.004, 32), hangerMat)
  base.position.y = -HANGER_ROD
  rod.castShadow = base.castShadow = true
  hanger.add(rod, base)
  springGroup.add(hanger)
  grabZone = new THREE.Mesh(new THREE.CylinderGeometry(0.024, 0.024, 1, 12), new THREE.MeshBasicMaterial({ visible: false }))
  springGroup.add(grabZone)
  scene.add(springGroup)

  massCfgs.value.forEach((cfg) => {
    const h = massHeight(cfg.key)
    const side = labMaterials.castIron()
    side.color.setHex(0x4a525c)
    const top = new THREE.MeshStandardMaterial({ map: massTexture(`${massOf(cfg.key)}g`), metalness: 0.4, roughness: 0.55 })
    const mesh = new THREE.Mesh(new THREE.CylinderGeometry(MASS_RADIUS, MASS_RADIUS, h, 40), [side, top, side])
    mesh.castShadow = true
    mesh.receiveShadow = true
    mesh.userData.height = h
    scene.add(mesh)
    massMeshes.set(cfg.key, mesh)
  })

  if (rulerCfg.value) {
    ruler = buildHangingRuler(RULER_MAX_CM, new THREE.Vector3(0.06, CLAMP.y, -0.03), -0.07)
    scene.add(ruler.group)
  }

  marker = new THREE.Line(
    new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(), new THREE.Vector3()]),
    new THREE.LineDashedMaterial({ color: 0xdc2626, dashSize: 0.004, gapSize: 0.003 }),
  )
  scene.add(marker)

  rebuildCoil(naturalLengthCm.value / 100)
}

// --- Dragging --------------------------------------------------------------------------------------
const dragPlane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0)
const dragPoint = new THREE.Vector3()
const hoverCursor = ref('grab')
let dragging: { kind: 'spring' } | { kind: 'mass'; key: string } | null = null

function benchSlot(key: string) {
  const i = massCfgs.value.findIndex(c => c.key === key)
  return new THREE.Vector3(0.2 + (i % 5) * 0.05, massHeight(key) / 2, 0.08 + Math.floor(i / 5) * 0.05)
}

function hangerBaseTop(): THREE.Vector3 {
  return new THREE.Vector3(CLAMP.x, CLAMP.y - builtCoilLength - 0.008 - HANGER_ROD + 0.002, 0)
}

function syncScene(dt: number) {
  const diff = extensionCm.value - displayExtension.value
  displayExtension.value = Math.abs(diff) < 0.01 ? extensionCm.value : displayExtension.value + diff * (1 - Math.exp(-dt * 10))

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
    // Lying on its side on the bench
    springGroup.position.copy(SPRING_REST)
    springGroup.rotation.set(0, 0, Math.PI / 2)
    rebuildCoil(naturalLengthCm.value / 100)
  }

  const draggedKey = dragging?.kind === 'mass' ? dragging.key : null
  massMeshes.forEach((mesh, key) => {
    mesh.visible = placedKeys.has(key)
    if (key === draggedKey) mesh.position.copy(dragPoint)
    else if (!attachedMassKeys.includes(key)) mesh.position.copy(benchSlot(key))
  })
  // Attached masses stack on the hanger in the order they were hung
  let stackY = hangerBaseTop().y
  attachedMassKeys.forEach((key) => {
    const mesh = massMeshes.get(key)
    if (!mesh || key === draggedKey) return
    const h = mesh.userData.height as number
    mesh.position.set(CLAMP.x, stackY + h / 2, 0)
    stackY += h
  })

  const showMarker = springMounted.value && !!ruler?.group.visible
  marker.visible = showMarker
  if (showMarker) {
    const y = CLAMP.y - builtCoilLength
    const pos = marker.geometry.attributes.position as THREE.BufferAttribute
    pos.setXYZ(0, 0.013, y, 0)
    pos.setXYZ(1, 0.045, y, -0.028)
    pos.needsUpdate = true
    marker.computeLineDistances()
  }

  ruler?.setArmed(measureArmed.value)
}

type Target = { kind: 'spring' } | { kind: 'mass'; key: string } | { kind: 'ruler' }
function pickTarget(ev: PointerEvent): Target | null {
  if (!springGroup) return null
  const targets: THREE.Object3D[] = [springGroup, ...massMeshes.values()]
  if (ruler) targets.push(ruler.mesh)
  const hit = pick(ev, targets)
  if (!hit) return null
  if (hit === springGroup) return { kind: 'spring' }
  if (ruler && hit === ruler.mesh) return { kind: 'ruler' }
  for (const [key, mesh] of massMeshes) if (mesh === hit) return { kind: 'mass', key }
  return null
}

function onHover(ev: PointerEvent) {
  if (dragging) return
  hoverCursor.value = pickTarget(ev) ? 'pointer' : 'grab'
}

function onPointerDown(ev: PointerEvent) {
  if (handleFurnitureClick(ev)) return
  const target = pickTarget(ev)
  if (!target || !room.value) return
  room.value.controls.enabled = false
  window.addEventListener('pointerup', onPointerUp, { once: true })

  if (target.kind === 'ruler') {
    selectObject(rulerKey.value)
    return
  }
  if (props.readOnly) return

  if (measureArmed.value && target.kind === 'spring' && springMounted.value) {
    const noise = (Math.random() - 0.5) * 0.2
    pendingReading.value = { value: String(Math.round((naturalLengthCm.value + extensionCm.value + noise) * 10) / 10) }
    measureArmed.value = false
    return
  }

  if (target.kind === 'spring' && springMounted.value) return
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
    if (nearClamp && placedKeys.has(standKey.value)) {
      springMounted.value = true
      emit('action', { objectKey: springKey.value, action: 'move', value: standKey.value })
    } else {
      flash(placedKeys.has(standKey.value) ? 'Drag the spring up to the retort stand’s clamp.' : 'Place the retort stand from the tray first.')
    }
    return
  }

  const key = was.key
  const wasAttached = attachedMassKeys.includes(key)
  const base = hangerBaseTop()
  const onHanger = springMounted.value && Math.abs(dragPoint.x - base.x) < 0.05 && dragPoint.y > base.y - 0.06 && dragPoint.y < base.y + 0.12

  if (onHanger && !wasAttached) {
    attachedMassKeys.push(key)
    const exceeded = rawExtensionCm.value > maxSafeCm.value
    if (exceeded && permanentDeformCm.value === 0) {
      permanentDeformCm.value = (rawExtensionCm.value - maxSafeCm.value) * 0.3
    }
    if (exceeded) flashWarning('Load exceeds the spring’s safe extension limit - it may not return to its original length.')
    emit('action', { objectKey: key, action: 'move', value: springKey.value, springLoadG: totalMassG.value, safetyIssue: exceeded })
  } else if (!onHanger && wasAttached) {
    // Removing a mass is free and unscored
    attachedMassKeys.splice(attachedMassKeys.indexOf(key), 1)
  } else if (!onHanger && springMounted.value) {
    flash('Drop the mass onto the hanger under the spring.')
  }
}

// --- Ruler measurement ---------------------------------------------------------------------------
const selectedKey = ref<string | null>(null)
const measureArmed = ref(false)
const pendingReading = ref<{ value: string } | null>(null)
const hint = ref<string | null>(null)
const warning = ref<string | null>(null)

function flash(text: string) {
  hint.value = text
  setTimeout(() => { if (hint.value === text) hint.value = null }, 3500)
}
function flashWarning(text: string) {
  warning.value = text
  setTimeout(() => { if (warning.value === text) warning.value = null }, 4500)
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
  measureArmed.value = true
  pendingReading.value = null
}
function confirmReading() {
  if (!pendingReading.value || !rulerCfg.value) return
  emit('action', { objectKey: rulerCfg.value.key, action: 'measure', value: pendingReading.value.value, unit: 'cm', label: 'Ruler', targetObjectKey: springKey.value })
  pendingReading.value = null
}

const HOME_POS: THREE.Vector3Tuple = [0.3, 0.48, 1.35]
const HOME_TARGET: THREE.Vector3Tuple = [0.06, 0.3, 0]
const { room, unsupported, pick, pointOnPlane, handleFurnitureClick } = useLabScene(
  { cameraPosition: HOME_POS, target: HOME_TARGET, minDistance: 0.45, maxDistance: 12, cupboard: true, wallCabinets: true, shelfCatalog: () => props.objectCatalog, benchLength: 3 },
  (r) => {
    buildApparatus(r.scene)
    r.onFrame(syncScene)
    if (!props.readOnly) flash('Take the apparatus from the tray, then drag the spring onto the clamp and masses onto the hanger.')
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
