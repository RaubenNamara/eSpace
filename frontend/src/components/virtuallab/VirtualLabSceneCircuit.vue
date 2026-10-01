<template>
  <LabUnsupported v-if="unsupported" />
  <div v-else class="relative w-full h-full rounded-xl overflow-hidden bg-slate-200 select-none">
    <div ref="labHost" class="absolute inset-0" :style="{ cursor: hoverCursor }" @pointerdown.capture="onPointerDown" @pointermove="onHover"></div>

    <!-- Apparatus tray -->
    <div v-if="trayItems.length > 0" class="absolute left-2 top-2 sm:left-3 sm:top-3 max-w-[9rem] bg-white/95 dark:bg-gray-800/95 backdrop-blur rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-2.5 max-h-[calc(100%-1rem)] sm:max-h-[calc(100%-1.5rem)] overflow-y-auto">
      <p class="text-[10px] font-bold uppercase tracking-wide text-gray-400 dark:text-gray-500 mb-1.5">Apparatus Tray</p>
      <div class="space-y-1">
        <button v-for="item in trayItems" :key="item.key" @click="pickFromTray(item.key)" class="w-full flex items-center gap-1.5 px-2 py-1.5 text-xs font-medium rounded-lg bg-gray-50 dark:bg-gray-900/40 text-gray-700 dark:text-gray-200 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors text-left">
          <span>{{ catalogFor(item.object_type)?.icon || '\u{26A1}' }}</span>
          <span class="truncate">{{ catalogFor(item.object_type)?.display_name || item.object_type }}</span>
        </button>
      </div>
    </div>

    <!-- Selection panel -->
    <div v-if="selectedKey" class="absolute right-2 top-2 sm:right-3 sm:top-3 bg-white/95 dark:bg-gray-800/95 backdrop-blur rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-3 w-52 max-h-[calc(100%-1rem)] sm:max-h-[calc(100%-1.5rem)] overflow-y-auto">
      <div class="flex items-center justify-between gap-2 mb-2">
        <p class="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide truncate">{{ catalogFor(selectedType || '')?.display_name || selectedKey }}</p>
        <button @click="deselect" class="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 text-xs leading-none">&times;</button>
      </div>

      <div class="flex flex-wrap gap-1.5 mb-2">
        <LabButton v-if="selectedType === 'battery'" size="sm" @click="inspectBattery">Inspect</LabButton>
        <LabButton v-if="(selectedType === 'ammeter' || selectedType === 'voltmeter') && !pendingReading" size="sm" :disabled="readOnly" @click="armMeterMeasure">Measure</LabButton>
        <p v-if="selectedType === 'switch'" class="text-[11px] text-gray-500 dark:text-gray-400">Click the switch to open or close it.</p>
      </div>

      <div v-if="selectedType === 'battery' && selectedKey" class="space-y-2">
        <p class="text-[10px] font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wide">Voltage: {{ batteryVoltages.get(selectedKey) ?? 6 }} V</p>
        <input type="range" min="0" max="12" step="0.5" class="w-full accent-indigo-600" :value="batteryVoltages.get(selectedKey) ?? 6" :disabled="readOnly" @input="e => setBatteryVoltage(Number((e.target as HTMLInputElement).value))">
        <div class="flex items-center justify-between">
          <span class="text-[11px] text-gray-500 dark:text-gray-400">Power</span>
          <LabToggle :model-value="switchStates.get(selectedKey) !== 'off'" :disabled="readOnly" @update:model-value="v => setBatteryPower(v)" />
        </div>
      </div>

      <div v-if="inspectText" class="mt-2 pt-2 border-t border-gray-100 dark:border-gray-700 text-xs text-gray-600 dark:text-gray-300">{{ inspectText }}</div>

      <div v-if="pendingReading" class="mt-2 pt-2 border-t border-gray-100 dark:border-gray-700">
        <p class="text-[11px] font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wide mb-1">Reading</p>
        <div class="flex items-center gap-2">
          <span class="flex-1 text-base font-bold text-gray-900 dark:text-white">{{ pendingReading.value }}<span class="text-xs font-medium text-gray-400 ml-1">{{ pendingReading.unit }}</span></span>
          <LabButton size="sm" variant="success" @click="confirmReading">Record</LabButton>
        </div>
      </div>
    </div>

    <!-- Selected wire -->
    <div v-if="selectedWire !== null" class="absolute right-2 top-2 sm:right-3 sm:top-3 bg-white/95 dark:bg-gray-800/95 backdrop-blur rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-3 w-44">
      <div class="flex items-center justify-between gap-2 mb-2">
        <p class="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">Wire</p>
        <button @click="selectedWire = null" class="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 text-xs leading-none">&times;</button>
      </div>
      <LabButton size="sm" variant="danger" :disabled="readOnly" @click="removeSelectedWire">Remove wire</LabButton>
    </div>

    <div class="absolute left-2 bottom-2 sm:left-3 sm:bottom-3 flex gap-1.5">
      <button v-if="wires.length > 0" @click="resetCircuit" :disabled="readOnly" class="px-3 py-1.5 text-xs font-semibold rounded-lg bg-white/95 dark:bg-gray-800/95 shadow-lg border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50">Reset Circuit</button>
      <button @click="room?.resetView()" class="px-3 py-1.5 text-xs font-semibold rounded-lg bg-white/95 dark:bg-gray-800/95 shadow-lg border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700">Reset View</button>
    </div>
    <p class="hidden sm:block absolute right-3 bottom-3 text-[10px] text-gray-500 bg-white/70 rounded px-2 py-1 pointer-events-none">Drag from one brass terminal to another to wire &middot; click a wire to select it</p>

    <transition enter-active-class="transition duration-200 ease-out" enter-from-class="opacity-0 -translate-y-1" leave-active-class="transition duration-150 ease-in" leave-to-class="opacity-0">
      <div v-if="hint" class="absolute left-1/2 -translate-x-1/2 top-2 sm:top-3 bg-amber-500 text-white text-xs font-medium px-4 py-2 rounded-2xl shadow-lg text-center max-w-[calc(100vw-2rem)]">{{ hint }}</div>
    </transition>
    <transition enter-active-class="transition duration-200 ease-out" enter-from-class="opacity-0 -translate-y-1" leave-active-class="transition duration-150 ease-in" leave-to-class="opacity-0">
      <div v-if="warning" class="absolute left-1/2 -translate-x-1/2 bottom-14 bg-red-500 text-white text-xs sm:text-sm font-medium px-4 py-2.5 rounded-2xl shadow-lg text-center max-w-[calc(100vw-2rem)]">{{ warning }}</div>
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
import LabToggle from './ui/LabToggle.vue'
import { connectedComponent, circuitDiagnosis } from './circuitEngine'
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

/* The circuit is laid out on a wooden board in centimetres: (x, y) cm = world (x, z) / 100. */
type Side = 'left' | 'right'
const TERMINAL_OFFSET = 3.5
const POST_TOP = 0.02
const MAIN_ROW_TYPES = ['battery', 'switch', 'resistor', 'bulb', 'ammeter']
const MAIN_ROW_Y = 4
const PARALLEL_ROW_Y = -8
const SLOT_GAP = 9.5
const SLOT_START_X = -19
const BOUNDS = { minX: -23, maxX: 23, minY: -13, maxY: 13 }
const cm = (v: number) => v / 100

function catalogFor(objectType: string) { return props.objectCatalog.find(o => o.object_type === objectType) }
function mergedProps(key: string): Record<string, any> {
  const cfg = props.sceneObjects.find(o => o.key === key)
  const def = cfg ? catalogFor(cfg.object_type) : null
  return { ...(def?.default_props || {}), ...(cfg?.props || {}) }
}

// --- Tray and positions ----------------------------------------------------------------------------
const placedKeys = reactive(new Set<string>())
const trayItems = computed(() => props.sceneObjects.filter(o => o.in_tray && !placedKeys.has(o.key)))
const positions = reactive<Record<string, { x: number; y: number }>>({})

function slotCenter(cfg: SceneObjectConfig): { x: number; y: number } {
  if (cfg.object_type === 'voltmeter') {
    const acrossType = props.sceneObjects.some(o => o.object_type === 'resistor') ? 'resistor' : 'bulb'
    return { x: SLOT_START_X + Math.max(0, MAIN_ROW_TYPES.indexOf(acrossType)) * SLOT_GAP, y: PARALLEL_ROW_Y }
  }
  const idx = MAIN_ROW_TYPES.indexOf(cfg.object_type)
  if (idx === -1) return { x: 17, y: PARALLEL_ROW_Y }
  return { x: SLOT_START_X + idx * SLOT_GAP, y: MAIN_ROW_Y }
}
function ensurePosition(cfg: SceneObjectConfig) {
  if (!positions[cfg.key]) positions[cfg.key] = { ...slotCenter(cfg) }
}
function pickFromTray(key: string) {
  if (props.readOnly) return
  placedKeys.add(key)
  const cfg = props.sceneObjects.find(o => o.key === key)
  if (cfg) ensurePosition(cfg)
  emit('action', { objectKey: key, action: 'move', value: key })
}
function terminalPos(key: string, side: Side) {
  const c = positions[key] ?? { x: 0, y: 0 }
  return { x: c.x + (side === 'left' ? -TERMINAL_OFFSET : TERMINAL_OFFSET), y: c.y }
}

// --- Circuit state (same engine as before) --------------------------------------------------------
interface Wire { aKey: string; aSide: Side; bKey: string; bSide: Side }
const wires = reactive<Wire[]>([])
const circuitConnections = computed(() => wires.map(w => ({ from: w.aKey, to: w.bKey })))
const switchStates = reactive(new Map<string, 'on' | 'off'>())
const batteryVoltages = reactive(new Map<string, number>())

function diagnosis(key: string) {
  return circuitDiagnosis(key, props.sceneObjects, circuitConnections.value, switchStates, batteryVoltages, mergedProps)
}
function bulbBrightness(key: string): number {
  const battery = props.sceneObjects.find(o => o.object_type === 'battery')
  if (!battery) return 0
  const loop = connectedComponent(battery.key, circuitConnections.value)
  const sw = props.sceneObjects.find(o => o.object_type === 'switch')
  if (!loop.has(key) || switchStates.get(battery.key) === 'off') return 0
  if (sw && (!loop.has(sw.key) || switchStates.get(sw.key) !== 'on')) return 0
  const voltage = batteryVoltages.get(battery.key) ?? mergedProps(battery.key).voltage ?? 6
  return Math.max(0, Math.min(1, voltage / Number(mergedProps(key).rating_v ?? 6)))
}

/** Re-wiring the exact same pair of terminals removes that wire; a second wire between the same two
 *  components on other terminals (e.g. a voltmeter across both ends of a resistor) is a new wire. */
function addOrToggleWire(a: { key: string; side: Side }, b: { key: string; side: Side }) {
  const same = (w: Wire, x: typeof a, y: typeof b) => w.aKey === x.key && w.aSide === x.side && w.bKey === y.key && w.bSide === y.side
  const existing = wires.findIndex(w => same(w, a, b) || same(w, b, a))
  if (existing >= 0) { wires.splice(existing, 1); return }
  wires.push({ aKey: a.key, aSide: a.side, bKey: b.key, bSide: b.side })
  emit('action', { objectKey: a.key, action: 'connect', value: b.key })
}
function resetCircuit() {
  if (props.readOnly) return
  wires.splice(0, wires.length)
  armed.value = null
  selectedWire.value = null
}

// --- 3D components ------------------------------------------------------------------------------------
interface Built { group: THREE.Group; body: THREE.Object3D[]; terminals: Record<Side, THREE.Mesh>; update?: () => void }
const built = new Map<string, Built>()
const wireMeshes: THREE.Mesh[] = []
let previewLine: THREE.Line
let sceneRef: THREE.Scene
const WIRE_COLORS = [0xdc2626, 0x111827, 0x2563eb, 0xdc2626, 0x111827, 0x16a34a]

function labelTexture(text: string, bg = '#f8fafc', fg = '#111827') {
  return canvasTexture(256, 96, (ctx, w, h) => {
    ctx.fillStyle = bg; ctx.fillRect(0, 0, w, h)
    ctx.fillStyle = fg; ctx.font = 'bold 54px sans-serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'
    ctx.fillText(text, w / 2, h / 2 + 2)
  })
}
function labelPlate(text: string, w: number, bg?: string, fg?: string) {
  const m = new THREE.Mesh(new THREE.PlaneGeometry(w, w * 0.375), new THREE.MeshStandardMaterial({ map: labelTexture(text, bg, fg), roughness: 0.6 }))
  m.rotation.x = -Math.PI / 2
  return m
}

function terminalPost(): THREE.Mesh {
  const post = new THREE.Mesh(new THREE.CylinderGeometry(0.0028, 0.0035, POST_TOP, 16), labMaterials.brass())
  post.position.y = POST_TOP / 2
  const cap = new THREE.Mesh(new THREE.CylinderGeometry(0.0045, 0.0045, 0.004, 16), labMaterials.brass())
  cap.position.y = POST_TOP / 2
  post.add(cap)
  const zone = new THREE.Mesh(new THREE.SphereGeometry(0.013, 10, 8), new THREE.MeshBasicMaterial({ visible: false }))
  zone.position.y = POST_TOP / 2
  post.add(zone)
  const ring = new THREE.Mesh(new THREE.TorusGeometry(0.009, 0.0015, 8, 24), new THREE.MeshBasicMaterial({ color: 0x22c55e, toneMapped: false }))
  ring.rotation.x = Math.PI / 2
  ring.position.y = -POST_TOP / 2 + 0.001
  ring.visible = false
  ring.name = 'ring'
  post.add(ring)
  post.castShadow = true
  return post
}

function base(w: number, d: number, color = 0x7c4a2d) {
  const m = new THREE.Mesh(new RoundedBoxGeometry(w, 0.012, d, 2, 0.002), new THREE.MeshStandardMaterial({ color, roughness: 0.7 }))
  m.position.y = 0.006
  m.castShadow = m.receiveShadow = true
  return m
}

function buildComponent(cfg: SceneObjectConfig): Built {
  const group = new THREE.Group()
  const body: THREE.Object3D[] = []
  let update: (() => void) | undefined
  const t = cfg.object_type

  if (t === 'battery') {
    const cell = new THREE.Mesh(new RoundedBoxGeometry(0.06, 0.032, 0.034, 3, 0.004), new THREE.MeshStandardMaterial({ color: 0x1f2937, roughness: 0.45 }))
    cell.position.y = 0.016
    const band = new THREE.Mesh(new THREE.BoxGeometry(0.0605, 0.01, 0.0345), new THREE.MeshStandardMaterial({ color: 0xdc2626, roughness: 0.45 }))
    band.position.y = 0.02
    const volts = labelPlate('6 V', 0.04, '#1f2937', '#fde68a')
    volts.position.set(0, 0.0325, 0)
    const plus = labelPlate('+', 0.012, '#dc2626', '#ffffff'); plus.position.set(0.03, 0.0325, -0.01)
    group.add(cell, band, volts, plus)
    body.push(cell, band, volts)
    let last = ''
    update = () => {
      const v = String(batteryVoltages.get(cfg.key) ?? mergedProps(cfg.key).voltage ?? 6)
      if (v === last) return
      last = v
      const mat = volts.material as THREE.MeshStandardMaterial
      mat.map?.dispose()
      mat.map = labelTexture(`${v} V`, '#1f2937', '#fde68a')
      mat.needsUpdate = true
    }
  } else if (t === 'switch') {
    const b = base(0.07, 0.03)
    const hinge = new THREE.Mesh(new THREE.BoxGeometry(0.006, 0.012, 0.012), labMaterials.brass())
    hinge.position.set(-0.022, 0.018, 0)
    const clip = new THREE.Mesh(new THREE.BoxGeometry(0.006, 0.012, 0.012), labMaterials.brass())
    clip.position.set(0.022, 0.018, 0)
    const leverPivot = new THREE.Group()
    leverPivot.position.set(-0.022, 0.022, 0)
    const lever = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.003, 0.008), labMaterials.chrome())
    lever.position.x = 0.025
    const knobM = new THREE.Mesh(new THREE.SphereGeometry(0.005, 12, 8), new THREE.MeshStandardMaterial({ color: 0x111827, roughness: 0.4 }))
    knobM.position.x = 0.05
    leverPivot.add(lever, knobM)
    group.add(b, hinge, clip, leverPivot)
    body.push(b, hinge, clip, lever, knobM)
    update = () => {
      const target = switchStates.get(cfg.key) === 'on' ? 0 : 0.55
      leverPivot.rotation.z += (target - leverPivot.rotation.z) * 0.3
    }
  } else if (t === 'resistor') {
    const b = base(0.07, 0.03, 0xe7dcc4)
    const bandsTex = canvasTexture(256, 64, (ctx, w, h) => {
      ctx.fillStyle = '#d9c6a1'; ctx.fillRect(0, 0, w, h)
      ;['#8b4513', '#111111', '#111111', '#d4af37'].forEach((c, i) => { ctx.fillStyle = c; ctx.fillRect(60 + i * 36 + (i === 3 ? 20 : 0), 0, 16, h) })
    })
    const resistor = new THREE.Mesh(new THREE.CylinderGeometry(0.006, 0.006, 0.032, 20), new THREE.MeshStandardMaterial({ map: bandsTex, roughness: 0.5 }))
    resistor.rotation.z = Math.PI / 2
    resistor.position.y = 0.022
    const lead = new THREE.Mesh(new THREE.CylinderGeometry(0.0008, 0.0008, 0.07, 6), labMaterials.steel())
    lead.rotation.z = Math.PI / 2
    lead.position.y = 0.022
    const label = labelPlate(`${mergedProps(cfg.key).resistance_ohm ?? 10} Ω`, 0.03, '#e7dcc4')
    label.position.set(0, 0.0125, 0.01)
    group.add(b, resistor, lead, label)
    body.push(b, resistor, label)
  } else if (t === 'bulb') {
    const b = base(0.07, 0.03)
    const holder = new THREE.Mesh(new THREE.CylinderGeometry(0.009, 0.01, 0.014, 20), labMaterials.brass())
    holder.position.y = 0.019
    const glassMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.05, metalness: 0, transparent: true, opacity: 0.4, emissive: 0xffd27a, emissiveIntensity: 0, depthWrite: false })
    const glass = new THREE.Mesh(new THREE.SphereGeometry(0.014, 24, 16), glassMat)
    glass.position.y = 0.038
    const filamentMat = new THREE.MeshBasicMaterial({ color: 0x57534e })
    const filament = new THREE.Mesh(new THREE.TorusGeometry(0.004, 0.0006, 6, 16, Math.PI), filamentMat)
    filament.position.y = 0.036
    const light = new THREE.PointLight(0xffc56e, 0, 0.5, 2)
    light.position.y = 0.04
    group.add(b, holder, glass, filament, light)
    body.push(b, holder, glass)
    update = () => {
      const k = bulbBrightness(cfg.key)
      glassMat.emissiveIntensity = k * 2.2
      filamentMat.color.setHex(k > 0 ? 0xfff3c4 : 0x57534e)
      light.intensity = k * 0.35
    }
  } else if (t === 'ammeter' || t === 'voltmeter') {
    const isAmm = t === 'ammeter'
    const case_ = new THREE.Mesh(new RoundedBoxGeometry(0.06, 0.03, 0.045, 3, 0.004), new THREE.MeshStandardMaterial({ color: isAmm ? 0x1e3a8a : 0x7f1d1d, roughness: 0.5 }))
    case_.position.y = 0.015
    const fullScale = isAmm ? 3 : 15
    const dial = new THREE.Mesh(new THREE.PlaneGeometry(0.05, 0.028), new THREE.MeshStandardMaterial({
      roughness: 0.5,
      map: canvasTexture(512, 288, (ctx, w, h) => {
        ctx.fillStyle = '#f8fafc'; ctx.fillRect(0, 0, w, h)
        ctx.strokeStyle = '#111827'; ctx.fillStyle = '#111827'; ctx.font = 'bold 30px sans-serif'; ctx.textAlign = 'center'
        const cx = w / 2, cy = h - 20, R = h - 60
        for (let i = 0; i <= 15; i++) {
          const a = (-50 + (100 * i) / 15) * Math.PI / 180
          const len = i % 5 === 0 ? 30 : 16
          ctx.lineWidth = i % 5 === 0 ? 4 : 2
          ctx.beginPath(); ctx.moveTo(cx + R * Math.sin(a), cy - R * Math.cos(a)); ctx.lineTo(cx + (R - len) * Math.sin(a), cy - (R - len) * Math.cos(a)); ctx.stroke()
          if (i % 5 === 0) ctx.fillText(String((fullScale * i) / 15), cx + (R + 22) * Math.sin(a), cy - (R + 22) * Math.cos(a) + 10)
        }
        ctx.font = 'bold 64px serif'; ctx.fillText(isAmm ? 'A' : 'V', cx, cy - 40)
      }),
    }))
    dial.rotation.x = -Math.PI / 2
    dial.position.set(0, 0.0302, -0.004)
    const needlePivot = new THREE.Group()
    needlePivot.position.set(0, 0.031, 0.008)
    const needle = new THREE.Mesh(new THREE.BoxGeometry(0.0008, 0.0006, 0.022), new THREE.MeshBasicMaterial({ color: 0xdc2626 }))
    needle.position.z = -0.011
    needlePivot.add(needle)
    const lcdMat = new THREE.MeshBasicMaterial({ toneMapped: false })
    const lcd = new THREE.Mesh(new THREE.PlaneGeometry(0.034, 0.0095), lcdMat)
    lcd.position.set(0, 0.018, 0.0226)
    group.add(case_, dial, needlePivot, lcd)
    body.push(case_, dial, lcd)
    let lastText = ''
    update = () => {
      const d = diagnosis(cfg.key)
      needlePivot.rotation.y = -((-50 + 100 * Math.min(1, d.value / fullScale)) * Math.PI) / 180
      const text = `${d.value.toFixed(2)}${isAmm ? 'A' : 'V'}`
      const color = d.reason ? '#f87171' : '#34d399'
      if (text + color === lastText) return
      lastText = text + color
      lcdMat.map?.dispose()
      lcdMat.map = canvasTexture(256, 72, (ctx, w, h) => {
        ctx.fillStyle = '#0b1220'; ctx.fillRect(0, 0, w, h)
        ctx.fillStyle = color; ctx.font = 'bold 50px monospace'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'
        ctx.fillText(text, w / 2, h / 2 + 2)
      })
      lcdMat.needsUpdate = true
    }
  }

  body.forEach(o => { if (o instanceof THREE.Mesh) o.castShadow = true })
  const terminals = { left: terminalPost(), right: terminalPost() } as Record<Side, THREE.Mesh>
  terminals.left.position.x = cm(-TERMINAL_OFFSET)
  terminals.right.position.x = cm(TERMINAL_OFFSET)
  group.add(terminals.left, terminals.right)
  sceneRef.add(group)
  return { group, body, terminals, update }
}

function wireCurve(a: { x: number; y: number }, b: { x: number; y: number }) {
  const p0 = new THREE.Vector3(cm(a.x), POST_TOP + 0.001, cm(a.y))
  const p2 = new THREE.Vector3(cm(b.x), POST_TOP + 0.001, cm(b.y))
  const lift = Math.min(0.045, 0.012 + p0.distanceTo(p2) * 0.07)
  const p1 = p0.clone().lerp(p2, 0.5).setY(POST_TOP + lift)
  return new THREE.QuadraticBezierCurve3(p0, p1, p2)
}

let wiresSignature = ''
function syncWires() {
  const sig = `${selectedWire.value}#` + wires.map(w => `${w.aKey}${w.aSide}${w.bKey}${w.bSide}${JSON.stringify(positions[w.aKey])}${JSON.stringify(positions[w.bKey])}`).join('|')
  if (sig === wiresSignature) return
  wiresSignature = sig
  wireMeshes.forEach(m => { sceneRef.remove(m); m.geometry.dispose(); (m.material as THREE.Material).dispose() })
  wireMeshes.length = 0
  wires.forEach((w, i) => {
    const mesh = new THREE.Mesh(
      new THREE.TubeGeometry(wireCurve(terminalPos(w.aKey, w.aSide), terminalPos(w.bKey, w.bSide)), 32, 0.0016, 8, false),
      new THREE.MeshStandardMaterial({ color: WIRE_COLORS[i % WIRE_COLORS.length], roughness: 0.45, emissive: i === selectedWire.value ? 0x6366f1 : 0x000000, emissiveIntensity: 0.8 }),
    )
    mesh.castShadow = true
    mesh.userData.wireIndex = i
    const zone = new THREE.Mesh(new THREE.TubeGeometry(wireCurve(terminalPos(w.aKey, w.aSide), terminalPos(w.bKey, w.bSide)), 16, 0.0035, 6, false), new THREE.MeshBasicMaterial({ visible: false }))
    mesh.add(zone)
    sceneRef.add(mesh)
    wireMeshes.push(mesh)
  })
}

function buildScene(scene: THREE.Scene) {
  sceneRef = scene
  const boardTex = canvasTexture(512, 360, (ctx, w, h) => {
    ctx.fillStyle = '#c69a6b'; ctx.fillRect(0, 0, w, h)
    for (let i = 0; i < 70; i++) {
      ctx.strokeStyle = `rgba(${Math.random() > 0.5 ? '120,80,45' : '220,180,130'},0.18)`
      ctx.lineWidth = 1 + Math.random() * 2
      const y = Math.random() * h
      ctx.beginPath(); ctx.moveTo(0, y); for (let x = 0; x <= w; x += 32) ctx.lineTo(x, y + Math.sin(x / 50 + i) * 3); ctx.stroke()
    }
  })
  const board = new THREE.Mesh(new RoundedBoxGeometry(0.52, 0.01, 0.32, 2, 0.003), new THREE.MeshStandardMaterial({ map: boardTex, roughness: 0.75 }))
  board.position.y = -0.005 + 0.0001
  board.receiveShadow = true
  scene.add(board)

  previewLine = new THREE.Line(
    new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(), new THREE.Vector3()]),
    new THREE.LineDashedMaterial({ color: 0x475569, dashSize: 0.006, gapSize: 0.004 }),
  )
  previewLine.visible = false
  scene.add(previewLine)
}

function syncScene() {
  props.sceneObjects.forEach((cfg) => {
    if (!placedKeys.has(cfg.key)) return
    let b = built.get(cfg.key)
    if (!b) { b = buildComponent(cfg); built.set(cfg.key, b) }
    const pos = positions[cfg.key]
    b.group.position.set(cm(pos.x), 0, cm(pos.y))
    b.update?.()
    ;(['left', 'right'] as Side[]).forEach((side) => {
      const ring = b!.terminals[side].getObjectByName('ring')!
      const connected = wires.some(w => (w.aKey === cfg.key && w.aSide === side) || (w.bKey === cfg.key && w.bSide === side))
      const isArmed = armed.value?.key === cfg.key && armed.value.side === side
      const isTarget = !!armed.value && armed.value.key !== cfg.key
      ring.visible = isArmed || isTarget || connected
      ;((ring as THREE.Mesh).material as THREE.MeshBasicMaterial).color.setHex(isArmed ? 0xf59e0b : isTarget ? 0x6366f1 : 0x22c55e)
    })
  })
  syncWires()

  previewLine.visible = !!armed.value && !!previewPoint.value
  if (previewLine.visible) {
    const a = terminalPos(armed.value!.key, armed.value!.side)
    const pos = previewLine.geometry.attributes.position as THREE.BufferAttribute
    pos.setXYZ(0, cm(a.x), POST_TOP, cm(a.y))
    pos.setXYZ(1, cm(previewPoint.value!.x), POST_TOP, cm(previewPoint.value!.y))
    pos.needsUpdate = true
    previewLine.computeLineDistances()
  }
}

// --- Pointer interaction ----------------------------------------------------------------------------
const boardPlane = new THREE.Plane(new THREE.Vector3(0, 1, 0), -POST_TOP)
const hitPt = new THREE.Vector3()
const hoverCursor = ref('grab')
const armed = ref<{ key: string; side: Side } | null>(null)
const previewPoint = ref<{ x: number; y: number } | null>(null)
let press: { kind: 'terminal' | 'component'; key: string; start: { x: number; y: number }; offset: { x: number; y: number }; moved: boolean } | null = null

type Target = { kind: 'terminal'; key: string; side: Side } | { kind: 'wire'; index: number } | { kind: 'component'; key: string }
function pickTarget(ev: PointerEvent): Target | null {
  const terminalMeshes: THREE.Object3D[] = []
  const terminalIds: { key: string; side: Side }[] = []
  built.forEach((b, key) => (['left', 'right'] as Side[]).forEach((side) => { terminalMeshes.push(b.terminals[side]); terminalIds.push({ key, side }) }))
  const tHit = pick(ev, terminalMeshes)
  if (tHit) return { kind: 'terminal', ...terminalIds[terminalMeshes.indexOf(tHit)] }
  // Wires and components compete on distance, so a wire arching past a meter doesn't steal its clicks
  const groups = [...built.values()].map(b => b.group)
  const hit = pick(ev, [...wireMeshes, ...groups])
  if (!hit) return null
  if (wireMeshes.includes(hit as THREE.Mesh)) return { kind: 'wire', index: hit.userData.wireIndex }
  return { kind: 'component', key: [...built.keys()][groups.indexOf(hit as THREE.Group)] }
}

function boardPoint(ev: PointerEvent) {
  return pointOnPlane(ev, boardPlane, hitPt) ? { x: hitPt.x * 100, y: hitPt.z * 100 } : null
}

function onHover(ev: PointerEvent) {
  if (press) return
  if (armed.value) { previewPoint.value = boardPoint(ev) }
  const t = pickTarget(ev)
  hoverCursor.value = !t ? 'grab' : t.kind === 'component' ? 'move' : 'pointer'
}

function onPointerDown(ev: PointerEvent) {
  const t = pickTarget(ev)
  if (!t || !room.value) return
  room.value.controls.enabled = false
  window.addEventListener('pointermove', onDragMove)
  window.addEventListener('pointerup', onPointerUp, { once: true })
  const p = boardPoint(ev) ?? { x: 0, y: 0 }

  if (t.kind === 'wire') {
    deselect()
    selectedWire.value = t.index
    return
  }
  if (t.kind === 'terminal') {
    if (props.readOnly) return
    if (!armed.value) {
      armed.value = { key: t.key, side: t.side }
      previewPoint.value = p
      press = { kind: 'terminal', key: t.key, start: p, offset: { x: 0, y: 0 }, moved: false }
    } else if (armed.value.key === t.key) {
      armed.value = null
    } else {
      addOrToggleWire(armed.value, { key: t.key, side: t.side })
      armed.value = null
    }
    return
  }
  if (armed.value) return
  const pos = positions[t.key]
  press = { kind: 'component', key: t.key, start: p, offset: { x: pos.x - p.x, y: pos.y - p.y }, moved: false }
}

function onDragMove(ev: PointerEvent) {
  if (!press) return
  const p = boardPoint(ev)
  if (!p) return
  if (Math.hypot(p.x - press.start.x, p.y - press.start.y) > 0.6) press.moved = true
  if (press.kind === 'terminal') { previewPoint.value = p; return }
  if (props.readOnly) return
  positions[press.key] = {
    x: Math.min(BOUNDS.maxX, Math.max(BOUNDS.minX, p.x + press.offset.x)),
    y: Math.min(BOUNDS.maxY, Math.max(BOUNDS.minY, p.y + press.offset.y)),
  }
}

/** A real drag ends on whichever terminal the pointer is released over (coordinates, not the event
 *  target - touch browsers keep delivering events to the element the press started on). */
function onPointerUp(ev: PointerEvent) {
  window.removeEventListener('pointermove', onDragMove)
  if (room.value) room.value.controls.enabled = true
  const was = press
  press = null
  if (!was) return
  if (was.kind === 'component') {
    if (!was.moved) onComponentClick(was.key)
    return
  }
  if (!was.moved || !armed.value) return
  const t = pickTarget(ev)
  if (t?.kind === 'terminal' && t.key !== armed.value.key) addOrToggleWire(armed.value, { key: t.key, side: t.side })
  armed.value = null
  previewPoint.value = null
}

// --- Selection, meters and battery ------------------------------------------------------------------
const selectedKey = ref<string | null>(null)
const selectedType = computed(() => props.sceneObjects.find(o => o.key === selectedKey.value)?.object_type ?? null)
const inspectText = ref<string | null>(null)
const pendingReading = ref<{ value: string; unit: string } | null>(null)
const hint = ref<string | null>(null)
const warning = ref<string | null>(null)
function flash(text: string) { hint.value = text; setTimeout(() => { if (hint.value === text) hint.value = null }, 3000) }
function flashWarning(text: string) { warning.value = text; setTimeout(() => { if (warning.value === text) warning.value = null }, 4500) }

const selectedWire = ref<number | null>(null)

function deselect() { selectedKey.value = null; selectedWire.value = null; inspectText.value = null; pendingReading.value = null }

function removeSelectedWire() {
  if (props.readOnly || selectedWire.value === null) return
  wires.splice(selectedWire.value, 1)
  selectedWire.value = null
}

function onComponentClick(key: string) {
  const cfg = props.sceneObjects.find(o => o.key === key)
  if (!cfg) return
  selectedWire.value = null
  selectedKey.value = key
  inspectText.value = null
  pendingReading.value = null
  if (cfg.object_type === 'switch' && !props.readOnly) {
    const next = switchStates.get(key) === 'on' ? 'off' : 'on'
    switchStates.set(key, next)
    emit('action', { objectKey: key, action: next === 'on' ? 'switch_on' : 'switch_off', value: null })
  }
}

function inspectBattery() {
  if (!selectedKey.value) return
  inspectText.value = catalogFor('battery')?.description || 'A DC power source for the circuit.'
  emit('action', { objectKey: selectedKey.value, action: 'inspect', value: null })
}
function setBatteryVoltage(v: number) {
  if (!selectedKey.value || props.readOnly) return
  batteryVoltages.set(selectedKey.value, Math.round(v * 10) / 10)
}
function setBatteryPower(on: boolean) {
  if (!selectedKey.value || props.readOnly) return
  switchStates.set(selectedKey.value, on ? 'on' : 'off')
}

function armMeterMeasure() {
  if (!selectedKey.value || props.readOnly) return
  const d = diagnosis(selectedKey.value)
  if (d.reason) {
    flash(d.reason)
    if (d.reason.includes('Short circuit')) flashWarning('Short circuit detected. Disconnect the power supply and check your wiring.')
  }
  pendingReading.value = { value: String(d.value), unit: selectedType.value === 'ammeter' ? 'A' : 'V' }
}
function confirmReading() {
  if (!pendingReading.value || !selectedKey.value) return
  const d = diagnosis(selectedKey.value)
  emit('action', {
    objectKey: selectedKey.value, action: 'measure', value: pendingReading.value.value,
    unit: pendingReading.value.unit, label: catalogFor(selectedType.value || '')?.display_name,
    safetyIssue: !!d.reason && d.reason.includes('Short circuit'),
  })
  pendingReading.value = null
}

const { room, unsupported, pick, pointOnPlane } = useLabScene(
  { cameraPosition: [0, 0.4, 0.36], target: [0, 0, 0.015], minDistance: 0.18, maxDistance: 1.2 },
  (r) => {
    buildScene(r.scene)
    r.onFrame(syncScene)
    if (!props.readOnly) flash('Take the apparatus from the tray, then drag between brass terminals to wire the circuit.')
  },
)

onMounted(() => {
  props.sceneObjects.forEach((o) => { if (!o.in_tray) { placedKeys.add(o.key); ensurePosition(o) } })
  props.sceneObjects.forEach((o) => { if (o.object_type === 'battery') batteryVoltages.set(o.key, Number(mergedProps(o.key).voltage ?? 6)) })
})
onBeforeUnmount(() => {
  window.removeEventListener('pointermove', onDragMove)
  window.removeEventListener('pointerup', onPointerUp)
})

function setObjectState(key: string, patch: Record<string, any>) {
  if ('state' in patch) switchStates.set(key, patch.state === 'on' ? 'on' : 'off')
}
defineExpose({ setObjectState })
</script>
