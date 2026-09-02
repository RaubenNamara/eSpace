<template>
  <div class="relative w-full h-full rounded-xl overflow-hidden bg-gradient-to-b from-sky-50 to-slate-100 dark:from-slate-800 dark:to-slate-900">
    <svg :viewBox="`0 0 ${VB_W} ${VB_H}`" class="w-full h-full select-none" ref="svgEl" @pointermove="onPointerMove" @pointerup="onGlobalPointerUp" @pointerleave="onGlobalPointerUp">
      <line :x1="0" :y1="BENCH_Y" :x2="VB_W" :y2="BENCH_Y" stroke="currentColor" class="text-gray-300 dark:text-gray-600" stroke-width="2" />

      <!-- Wires - drawn first so components sit visually on top of their own terminals. -->
      <LabWire
        v-for="(w, i) in wires" :key="i"
        :x1="terminalPos(w.aKey, w.aSide).x" :y1="terminalPos(w.aKey, w.aSide).y"
        :x2="terminalPos(w.bKey, w.bSide).x" :y2="terminalPos(w.bKey, w.bSide).y"
        @remove="removeWire(i)"
      />
      <path v-if="dragPreviewPos && armedTerminal" :d="`M ${armedTerminal.x} ${armedTerminal.y} L ${dragPreviewPos.x} ${dragPreviewPos.y}`" stroke="#94a3b8" stroke-width="2.5" stroke-dasharray="5 4" fill="none" />

      <!-- Components -->
      <g v-for="c in placedComponents" :key="c.key" @pointerdown="onComponentPointerDown(c.key, $event)" class="cursor-grab active:cursor-grabbing">
        <template v-if="c.type === 'battery'">
          <rect :x="c.x - 35" :y="c.y - 18" width="70" height="36" rx="6" fill="#1f2937" :stroke="selectedKey === c.key ? '#4f46e5' : '#111827'" :stroke-width="selectedKey === c.key ? 3 : 1.5" />
          <rect :x="c.x - 35" :y="c.y - 6" width="70" height="12" fill="#dc2626" />
          <text :x="c.x" :y="c.y + 34" text-anchor="middle" class="fill-gray-600 dark:fill-gray-300 text-[10px] font-semibold">{{ batteryVoltages.get(c.key) ?? mergedProps(c.key).voltage ?? 6 }}V</text>
        </template>

        <template v-else-if="c.type === 'switch'">
          <rect :x="c.x - 35" :y="c.y - 12" width="70" height="24" rx="4" fill="#374151" :stroke="selectedKey === c.key ? '#4f46e5' : '#111827'" :stroke-width="selectedKey === c.key ? 3 : 1.5" />
          <line :x1="c.x - 22" :y1="c.y" :x2="switchStates.get(c.key) === 'on' ? c.x + 22 : c.x + 6" :y2="switchStates.get(c.key) === 'on' ? c.y : c.y - 14" stroke="#e5e7eb" stroke-width="4" stroke-linecap="round" />
          <circle :cx="c.x - 22" :cy="c.y" r="3.5" fill="#e5e7eb" />
          <text :x="c.x" :y="c.y + 30" text-anchor="middle" class="text-[10px] font-semibold" :class="switchStates.get(c.key) === 'on' ? 'fill-emerald-600' : 'fill-gray-400'">{{ switchStates.get(c.key) === 'on' ? 'CLOSED' : 'OPEN' }}</text>
        </template>

        <template v-else-if="c.type === 'resistor'">
          <rect :x="c.x - 35" :y="c.y - 14" width="70" height="28" rx="4" fill="#ead9b4" :stroke="selectedKey === c.key ? '#4f46e5' : '#78716c'" :stroke-width="selectedKey === c.key ? 3 : 1.5" />
          <polyline :points="resistorZigzag(c.x, c.y)" fill="none" stroke="#78350f" stroke-width="2" />
          <text :x="c.x" :y="c.y + 30" text-anchor="middle" class="fill-gray-600 dark:fill-gray-300 text-[10px] font-semibold">{{ mergedProps(c.key).resistance_ohm ?? 10 }}&Omega;</text>
        </template>

        <template v-else-if="c.type === 'bulb'">
          <circle :cx="c.x" :cy="c.y" r="20" :fill="bulbFill(c.key)" :stroke="selectedKey === c.key ? '#4f46e5' : '#78350f'" :stroke-width="selectedKey === c.key ? 3 : 1.5" />
          <line :x1="c.x - 9" :y1="c.y - 9" :x2="c.x + 9" :y2="c.y + 9" stroke="#78350f" stroke-width="1.5" />
          <line :x1="c.x - 9" :y1="c.y + 9" :x2="c.x + 9" :y2="c.y - 9" stroke="#78350f" stroke-width="1.5" />
        </template>

        <template v-else-if="c.type === 'ammeter' || c.type === 'voltmeter'">
          <circle :cx="c.x" :cy="c.y" r="22" fill="#f8fafc" :stroke="selectedKey === c.key ? '#4f46e5' : '#334155'" :stroke-width="selectedKey === c.key ? 3 : 1.5" />
          <text :x="c.x" :y="c.y + 6" text-anchor="middle" class="fill-slate-700 text-sm font-bold">{{ c.type === 'ammeter' ? 'A' : 'V' }}</text>
        </template>

        <!-- Terminals -->
        <LabTerminal
          :x="terminalPos(c.key, 'left').x" :y="terminalPos(c.key, 'left').y"
          :active="isValidTarget(c.key)" :connected="isTerminalConnected(c.key, 'left')"
          @pointerdown="(ev) => onTerminalPointerDown(c.key, 'left', ev)"
        />
        <LabTerminal
          :x="terminalPos(c.key, 'right').x" :y="terminalPos(c.key, 'right').y"
          :active="isValidTarget(c.key)" :connected="isTerminalConnected(c.key, 'right')"
          @pointerdown="(ev) => onTerminalPointerDown(c.key, 'right', ev)"
        />
      </g>

      <!-- Live digital readouts - always visible once a real value exists, never a hidden tooltip. -->
      <g v-for="c in placedComponents.filter(c => c.type === 'ammeter' || c.type === 'voltmeter')" :key="'d-' + c.key">
        <foreignObject :x="c.x - 30" :y="c.y + 26" width="60" height="26">
          <LabDigitalDisplay :text="liveReading(c.key).text" size="sm" :color="liveReading(c.key).reason ? '#f87171' : '#34d399'" />
        </foreignObject>
      </g>
    </svg>

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
    <div v-if="selectedKey" class="absolute right-2 top-2 sm:right-3 sm:top-3 bg-white/95 dark:bg-gray-800/95 backdrop-blur rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-3 max-w-[14rem] max-h-[calc(100%-1rem)] sm:max-h-[calc(100%-1.5rem)] overflow-y-auto">
      <div class="flex items-center justify-between gap-2 mb-2">
        <p class="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide truncate">{{ catalogFor(selectedType || '')?.display_name || selectedKey }}</p>
        <button @click="deselect" class="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 text-xs leading-none">&times;</button>
      </div>

      <div class="flex flex-wrap gap-1.5 mb-2">
        <LabButton v-if="selectedType === 'battery'" size="sm" @click="inspectBattery">Inspect</LabButton>
        <LabButton v-if="(selectedType === 'ammeter' || selectedType === 'voltmeter') && !pendingReading" size="sm" :disabled="props.readOnly" @click="armMeterMeasure">Measure</LabButton>
      </div>

      <div v-if="selectedType === 'battery'" class="space-y-2">
        <LabScale label="Voltage" :model-value="batteryVoltages.get(selectedKey) ?? 6" :min="0" :max="12" unit="V" :disabled="props.readOnly" @update:model-value="setBatteryVoltage" />
        <div class="flex items-center justify-between">
          <span class="text-[11px] text-gray-500 dark:text-gray-400">Power</span>
          <LabToggle :model-value="switchStates.get(selectedKey) !== 'off'" :disabled="props.readOnly" @update:model-value="v => setBatteryPower(v)" />
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

    <button v-if="wires.length > 0" @click="resetCircuit" :disabled="props.readOnly" class="absolute left-2 bottom-2 sm:left-3 sm:bottom-3 px-3 py-1.5 text-xs font-semibold rounded-lg border border-gray-300 dark:border-gray-600 bg-white/95 dark:bg-gray-800/95 backdrop-blur text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 shadow-lg">Reset Circuit</button>

    <transition enter-active-class="transition duration-200 ease-out" enter-from-class="opacity-0 -translate-y-1" leave-active-class="transition duration-150 ease-in" leave-to-class="opacity-0">
      <div v-if="hint" class="absolute left-1/2 -translate-x-1/2 top-2 sm:top-3 bg-amber-500 text-white text-xs font-medium px-4 py-2 rounded-2xl shadow-lg text-center max-w-[calc(100vw-2rem)]">{{ hint }}</div>
    </transition>
    <transition enter-active-class="transition duration-200 ease-out" enter-from-class="opacity-0 -translate-y-1" leave-active-class="transition duration-150 ease-in" leave-to-class="opacity-0">
      <div v-if="warning" class="absolute left-1/2 -translate-x-1/2 bottom-16 sm:bottom-3 bg-red-500 text-white text-xs sm:text-sm font-medium px-4 py-2.5 rounded-2xl shadow-lg text-center max-w-[calc(100vw-2rem)]">{{ warning }}</div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted } from 'vue'
import type { SceneObjectConfig, LabObjectDef, LabAction } from '@/types/virtualLab'
import { connectedComponent, circuitDiagnosis } from './circuitEngine'
import LabTerminal from './lab2d/LabTerminal.vue'
import LabWire from './lab2d/LabWire.vue'
import LabButton from './lab2d/LabButton.vue'
import LabScale from './lab2d/LabScale.vue'
import LabToggle from './lab2d/LabToggle.vue'
import LabDigitalDisplay from './lab2d/LabDigitalDisplay.vue'

const props = defineProps<{
  sceneObjects: SceneObjectConfig[]
  objectCatalog: LabObjectDef[]
  connections?: { from: string; to: string }[]
  readOnly?: boolean
}>()

const emit = defineEmits<{
  action: [{ objectKey: string | null; action: LabAction; value: string | null; unit?: string | null; label?: string | null; safetyIssue?: boolean; targetObjectKey?: string | null; springLoadG?: number }]
}>()

// --- Fixed educational layout --------------------------------------------------------------
const VB_W = 600, VB_H = 420
const BENCH_Y = 380
const MAIN_ROW_TYPES = ['battery', 'switch', 'resistor', 'bulb', 'ammeter']
const MAIN_ROW_Y = 260
const PARALLEL_ROW_Y = 140
const SLOT_GAP = 100
const SLOT_START_X = 110
const COMPONENT_W = 70

function catalogFor(objectType: string) {
  return props.objectCatalog.find(o => o.object_type === objectType)
}
function mergedProps(key: string): Record<string, any> {
  const cfg = props.sceneObjects.find(o => o.key === key)
  const def = cfg ? catalogFor(cfg.object_type) : null
  return { ...(def?.default_props || {}), ...(cfg?.props || {}) }
}

// --- Apparatus tray - pre-placed items (no in_tray flag) are placed immediately on mount,
// exactly matching the 3D engine's convention. ------------------------------------------------
const placedKeys = reactive(new Set<string>())
const trayItems = computed(() => props.sceneObjects.filter(o => o.in_tray && !placedKeys.has(o.key)))
function pickFromTray(key: string) {
  if (props.readOnly) return
  placedKeys.add(key)
  const cfg = props.sceneObjects.find(o => o.key === key)
  if (cfg) ensurePosition(cfg)
  emit('action', { objectKey: key, action: 'move', value: key })
}

function slotCenter(cfg: SceneObjectConfig): { x: number; y: number } {
  if (cfg.object_type === 'voltmeter') {
    const acrossType = props.sceneObjects.some(o => o.object_type === 'resistor') ? 'resistor' : 'bulb'
    const idx = MAIN_ROW_TYPES.indexOf(acrossType)
    return { x: SLOT_START_X + Math.max(0, idx) * SLOT_GAP, y: PARALLEL_ROW_Y }
  }
  const idx = MAIN_ROW_TYPES.indexOf(cfg.object_type)
  if (idx === -1) return { x: 500, y: PARALLEL_ROW_Y }
  return { x: SLOT_START_X + idx * SLOT_GAP, y: MAIN_ROW_Y }
}

// --- Free repositioning - a component starts at its default slot but can be dragged anywhere on
// the bench afterward; purely visual/organizational, the 'move' step is already graded at
// pick-from-tray time above, so repositioning never re-fires it. ------------------------------
const positions = reactive<Record<string, { x: number; y: number }>>({})
function ensurePosition(cfg: SceneObjectConfig) {
  if (!positions[cfg.key]) positions[cfg.key] = { ...slotCenter(cfg) }
}

const placedComponents = computed(() =>
  props.sceneObjects
    .filter(o => placedKeys.has(o.key))
    .map(o => ({ key: o.key, type: o.object_type, ...(positions[o.key] ?? slotCenter(o)) }))
)

function terminalPos(key: string, side: 'left' | 'right'): { x: number; y: number } {
  const c = positions[key]
  if (!c) return { x: 0, y: 0 }
  return { x: c.x + (side === 'left' ? -COMPONENT_W / 2 : COMPONENT_W / 2), y: c.y }
}

const POSITION_BOUNDS = { minX: 55, maxX: VB_W - 55, minY: 60, maxY: BENCH_Y - 15 }
let draggingComponentKey: string | null = null
let componentDragStart: { x: number; y: number } | null = null

function onComponentPointerDown(key: string, ev: PointerEvent) {
  if (props.readOnly || armedTerminal.value) return
  ev.stopPropagation()
  draggingComponentKey = key
  componentDragStart = svgPoint(ev)
}

function resistorZigzag(cx: number, cy: number): string {
  const pts = [-24, -16, -8, 0, 8, 16, 24].map((dx, i) => `${cx + dx},${cy + (i % 2 === 0 ? -8 : 8)}`)
  return pts.join(' ')
}

// --- Circuit graph - the same shared engine the 3D renderer's algorithm is ported from --------
interface Wire { aKey: string; aSide: 'left' | 'right'; bKey: string; bSide: 'left' | 'right' }
const wires = reactive<Wire[]>([])
const connections = computed(() => wires.map(w => ({ from: w.aKey, to: w.bKey })))
const switchStates = reactive(new Map<string, 'on' | 'off'>())
const batteryVoltages = reactive(new Map<string, number>())

function isTerminalConnected(key: string, side: 'left' | 'right'): boolean {
  return wires.some(w => (w.aKey === key && w.aSide === side) || (w.bKey === key && w.bSide === side))
}

function liveReading(key: string): { text: string; reason: string | null } {
  const cfg = props.sceneObjects.find(o => o.key === key)
  if (!cfg) return { text: '--', reason: null }
  const diag = circuitDiagnosis(key, props.sceneObjects, connections.value, switchStates, batteryVoltages, mergedProps)
  const unit = cfg.object_type === 'ammeter' ? 'A' : 'V'
  return { text: `${diag.value.toFixed(2)}${unit}`, reason: diag.reason }
}

function bulbFill(key: string): string {
  const battery = props.sceneObjects.find(o => o.object_type === 'battery')
  if (!battery) return '#fde68a'
  const component = connectedComponent(battery.key, connections.value)
  if (!component.has(key) || switchStates.get(battery.key) === 'off') return '#e5e7eb'
  const voltage = batteryVoltages.get(battery.key) ?? mergedProps(battery.key).voltage ?? 6
  const ratedV = Number(mergedProps(key).rating_v ?? 6)
  const brightness = Math.max(0, Math.min(1, voltage / ratedV))
  const alpha = 0.25 + brightness * 0.75
  return `rgba(253, 224, 71, ${alpha})`
}

// --- Wire connect interaction - supports both click-then-click and a real pointer drag --------
const armedTerminal = ref<{ key: string; side: 'left' | 'right'; x: number; y: number } | null>(null)
const dragPreviewPos = ref<{ x: number; y: number } | null>(null)
let dragStartPos: { x: number; y: number } | null = null
const svgEl = ref<SVGSVGElement | null>(null)

function isValidTarget(key: string): boolean {
  return !!armedTerminal.value && armedTerminal.value.key !== key
}

function svgPoint(ev: PointerEvent): { x: number; y: number } {
  const svg = svgEl.value!
  const pt = svg.createSVGPoint()
  pt.x = ev.clientX
  pt.y = ev.clientY
  const ctm = svg.getScreenCTM()
  if (!ctm) return { x: 0, y: 0 }
  const local = pt.matrixTransform(ctm.inverse())
  return { x: local.x, y: local.y }
}

function addOrToggleWire(a: { key: string; side: 'left' | 'right' }, b: { key: string; side: 'left' | 'right' }) {
  const existingIdx = wires.findIndex(w =>
    (w.aKey === a.key && w.bKey === b.key) || (w.aKey === b.key && w.bKey === a.key)
  )
  if (existingIdx >= 0) {
    wires.splice(existingIdx, 1)
    return
  }
  wires.push({ aKey: a.key, aSide: a.side, bKey: b.key, bSide: b.side })
  emit('action', { objectKey: a.key, action: 'connect', value: b.key })
}

function removeWire(index: number) {
  if (props.readOnly) return
  wires.splice(index, 1)
}

function onTerminalPointerDown(key: string, side: 'left' | 'right', ev: PointerEvent) {
  if (props.readOnly) return
  ev.stopPropagation()
  const pos = terminalPos(key, side)
  if (!armedTerminal.value) {
    armedTerminal.value = { key, side, ...pos }
    dragStartPos = svgPoint(ev)
    dragPreviewPos.value = pos
    return
  }
  if (armedTerminal.value.key === key) {
    // Clicked the same component again - cancel.
    armedTerminal.value = null
    dragPreviewPos.value = null
    return
  }
  addOrToggleWire({ key: armedTerminal.value.key, side: armedTerminal.value.side }, { key, side })
  armedTerminal.value = null
  dragPreviewPos.value = null
}

function onPointerMove(ev: PointerEvent) {
  if (draggingComponentKey) {
    const p = svgPoint(ev)
    positions[draggingComponentKey] = {
      x: Math.min(POSITION_BOUNDS.maxX, Math.max(POSITION_BOUNDS.minX, p.x)),
      y: Math.min(POSITION_BOUNDS.maxY, Math.max(POSITION_BOUNDS.minY, p.y)),
    }
    return
  }
  if (!armedTerminal.value) return
  dragPreviewPos.value = svgPoint(ev)
}

const allTerminals = computed(() =>
  placedComponents.value.flatMap(c => ([
    { key: c.key, side: 'left' as const, ...terminalPos(c.key, 'left') },
    { key: c.key, side: 'right' as const, ...terminalPos(c.key, 'right') },
  ]))
)

function hitTestTerminal(x: number, y: number): { key: string; side: 'left' | 'right' } | null {
  const HIT_RADIUS = 16
  let best: { key: string; side: 'left' | 'right' } | null = null
  let bestDist = HIT_RADIUS
  for (const t of allTerminals.value) {
    const d = Math.hypot(t.x - x, t.y - y)
    if (d < bestDist) { bestDist = d; best = { key: t.key, side: t.side } }
  }
  return best
}

/**
 * Handles a true continuous drag: mobile browsers implicitly capture touch pointer events to the
 * element pointerdown started on, so pointerup often fires back on the source terminal rather
 * than wherever the finger actually lifted - hit-testing the release *coordinates* (not the
 * event target) against every terminal is what makes drag-to-connect work reliably on touch. A
 * plain click-then-click sequence is still supported separately by onTerminalPointerDown itself.
 */
function onGlobalPointerUp(ev: PointerEvent) {
  if (draggingComponentKey) {
    const key = draggingComponentKey
    const p = svgPoint(ev)
    const moved = !!componentDragStart && Math.hypot(p.x - componentDragStart.x, p.y - componentDragStart.y) > 6
    draggingComponentKey = null
    componentDragStart = null
    if (!moved) onComponentClick(key) // a plain click - preserves the switch on/off toggle
    return
  }
  if (!armedTerminal.value || !dragStartPos) return
  const p = svgPoint(ev)
  const moved = Math.hypot(p.x - dragStartPos.x, p.y - dragStartPos.y) > 6
  dragStartPos = null
  if (!moved) return // a plain click - stays armed, waiting for a second click elsewhere

  const hit = hitTestTerminal(p.x, p.y)
  if (hit && hit.key !== armedTerminal.value.key) {
    addOrToggleWire({ key: armedTerminal.value.key, side: armedTerminal.value.side }, hit)
  }
  armedTerminal.value = null
  dragPreviewPos.value = null
}

function resetCircuit() {
  if (props.readOnly) return
  wires.splice(0, wires.length)
  armedTerminal.value = null
  dragPreviewPos.value = null
}

// --- Selection / component actions -------------------------------------------------------------
const selectedKey = ref<string | null>(null)
const selectedType = computed(() => props.sceneObjects.find(o => o.key === selectedKey.value)?.object_type ?? null)
const inspectText = ref<string | null>(null)
const pendingReading = ref<{ value: string; unit: string } | null>(null)
const hint = ref<string | null>(null)
const warning = ref<string | null>(null)

function flash(text: string) { hint.value = text; setTimeout(() => { if (hint.value === text) hint.value = null }, 3000) }
function flashWarning(text: string) { warning.value = text; setTimeout(() => { if (warning.value === text) warning.value = null }, 4500) }

function deselect() { selectedKey.value = null; inspectText.value = null; pendingReading.value = null }

function onComponentClick(key: string) {
  if (armedTerminal.value) return // mid-connection - a body click shouldn't also select
  const cfg = props.sceneObjects.find(o => o.key === key)
  if (!cfg) return
  selectedKey.value = key
  inspectText.value = null
  pendingReading.value = null

  if (cfg.object_type === 'switch') {
    if (props.readOnly) return
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

/** Free, unscored realism adjustment - matches the 3D engine's battery voltage picker exactly:
 *  it feeds the live simulation but isn't itself a graded action. */
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
  const diag = circuitDiagnosis(selectedKey.value, props.sceneObjects, connections.value, switchStates, batteryVoltages, mergedProps)
  if (diag.reason) {
    flash(diag.reason)
    if (diag.reason.includes('Short circuit')) flashWarning('Short circuit detected. Disconnect the power supply and check your wiring.')
  }
  const unit = selectedType.value === 'ammeter' ? 'A' : 'V'
  pendingReading.value = { value: String(diag.value), unit }
}

function confirmReading() {
  if (!pendingReading.value || !selectedKey.value) return
  const diag = circuitDiagnosis(selectedKey.value, props.sceneObjects, connections.value, switchStates, batteryVoltages, mergedProps)
  const isShortCircuit = !!diag.reason && diag.reason.includes('Short circuit')
  emit('action', {
    objectKey: selectedKey.value, action: 'measure', value: pendingReading.value.value,
    unit: pendingReading.value.unit, label: catalogFor(selectedType.value || '')?.display_name,
    safetyIssue: isShortCircuit,
  })
  pendingReading.value = null
}

onMounted(() => {
  // Pre-placed apparatus (no in_tray flag) starts on the board immediately, exactly like the
  // 3D engine's buildScene().
  props.sceneObjects.forEach((o) => { if (!o.in_tray) { placedKeys.add(o.key); ensurePosition(o) } })
  props.sceneObjects.forEach((o) => {
    if (o.object_type === 'battery') batteryVoltages.set(o.key, Number(mergedProps(o.key).voltage ?? 6))
  })
  if (!props.readOnly) flash('Pick up the apparatus, then drag between terminals to wire the circuit.')
})

function setObjectState(key: string, patch: Record<string, any>) {
  if ('state' in patch) switchStates.set(key, patch.state === 'on' ? 'on' : 'off')
}
defineExpose({ setObjectState })
</script>
