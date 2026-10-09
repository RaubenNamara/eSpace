<template>
  <LabUnsupported v-if="unsupported" />
  <div v-else class="relative w-full h-full rounded-xl overflow-hidden bg-slate-200 select-none">
    <div ref="labHost" class="absolute inset-0" :style="{ cursor: hoverCursor }" @pointerdown.capture="onPointerDown" @pointermove="onHover"></div>

    <!-- Apparatus tray: compact - short names (full name on hover), one-line instruction -->
    <div v-if="phase === 'collect'" ref="trayEl" class="absolute left-2 top-2 sm:left-3 sm:top-3 w-[8.25rem] bg-white/95 dark:bg-gray-800/95 backdrop-blur rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-1.5 max-h-[calc(100%-1rem)] sm:max-h-[calc(100%-1.5rem)] overflow-y-auto">
      <div class="flex items-center justify-between px-1 mb-0.5">
        <p class="text-[10px] font-bold uppercase tracking-wide text-gray-400 dark:text-gray-500">Tray</p>
        <span class="text-[10px] font-semibold text-gray-500 dark:text-gray-400">{{ placedRequiredCount }}/{{ requiredItems.length }}</span>
      </div>
      <p class="text-[10px] text-gray-400 dark:text-gray-500 px-1 mb-1">Click, then place on the bench</p>
      <div class="space-y-0.5">
        <button v-for="item in trayItems" :key="item.key" :disabled="readOnly" :title="itemName(item)" @click="pickFromTray(item.key)" class="w-full flex items-center gap-1.5 px-1.5 py-1 text-[11px] font-medium rounded-md transition-colors text-left disabled:opacity-60" :class="carrying === item.key ? 'bg-indigo-600 text-white' : 'text-gray-700 dark:text-gray-200 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 hover:text-indigo-700 dark:hover:text-indigo-300'">
          <span class="w-4 text-center flex-shrink-0">{{ catalogFor(item.object_type)?.icon || '⚡' }}</span>
          <span class="truncate">{{ SHORT_NAME[item.object_type] || itemName(item) }}</span>
        </button>
      </div>
    </div>

    <!-- Bench panel -->
    <div v-if="panelOpen && phase !== 'collect'" ref="panelEl" class="absolute right-2 top-2 sm:right-3 sm:top-3 w-[15.5rem] sm:w-[17.5rem] bg-white/95 dark:bg-gray-800/95 backdrop-blur rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-3 max-h-[calc(100%-1rem)] sm:max-h-[calc(100%-1.5rem)] overflow-y-auto">
      <div class="flex items-center justify-between gap-2 mb-2">
        <p class="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">Lab Bench</p>
        <button @click="panelOpen = false" class="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 text-xs leading-none" title="Hide panel">&times;</button>
      </div>

      <div v-if="phase === 'tape'" class="text-xs text-gray-600 dark:text-gray-300 space-y-1.5">
        <p>Fix the bare constantan wire <strong>P</strong> along the metre rule: click each of the two dashed marks at the ends of the wire to stick a piece of Sellotape there.</p>
        <p class="font-semibold text-gray-700 dark:text-gray-200">Taped: {{ taped.size }} of 2</p>
      </div>

      <template v-else>
        <!-- Connections -->
        <div class="mb-2.5">
          <p class="text-[10px] font-bold uppercase tracking-wide text-gray-400 dark:text-gray-500 mb-1">Circuit connections</p>
          <ul class="space-y-0.5 text-[11px]">
            <li v-for="c in connectionChecks" :key="c.text" class="flex items-start gap-1.5" :class="c.ok ? 'text-emerald-700 dark:text-emerald-400' : 'text-gray-500 dark:text-gray-400'">
              <span class="flex-shrink-0 font-bold">{{ c.ok ? '✓' : '○' }}</span><span>{{ c.text }}</span>
            </li>
          </ul>
          <!-- What exactly is wrong with the wiring so far, in plain words -->
          <div v-if="!circuitReady && leads.length > 0 && wiringAdvice.length" class="mt-1.5 rounded-lg bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 p-2 space-y-1">
            <p v-for="(a, i) in wiringAdvice" :key="i" class="text-[11px] text-amber-800 dark:text-amber-200">{{ a }}</p>
            <p v-if="problemTerminals.size" class="text-[10px] text-amber-700 dark:text-amber-300">Terminals with a problem have a red ring.</p>
          </div>
          <p v-if="!circuitReady" class="text-[10px] text-gray-500 dark:text-gray-400 mt-1">To connect a lead: click a terminal (the grey rings), then click the terminal to join it to - or drag from one to the other. Red caps are +. Click a lead to select or remove it.</p>
          <LabButton v-if="selectedLead !== null" size="sm" variant="danger" class="mt-1.5" :disabled="readOnly" @click="removeSelectedLead">Remove selected lead</LabButton>
        </div>

        <template v-if="circuitReady">
          <!-- Effective length -->
          <div class="rounded-lg bg-gray-50 dark:bg-gray-900/40 p-2 mb-2">
            <div class="flex items-baseline justify-between">
              <span class="text-[11px] text-gray-500 dark:text-gray-400">{{ batteryMode ? 'Wire length l' : 'Effective length x' }}</span>
              <span class="text-base font-bold text-gray-900 dark:text-white tabular-nums">{{ lengthText(clipX) }}</span>
            </div>
            <div class="flex gap-1 mt-1">
              <button v-for="n in NUDGES" :key="n.label" @click="nudge(n.dm)" :disabled="readOnly" class="flex-1 px-1 py-1 text-[10px] font-semibold rounded-md border border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:bg-white dark:hover:bg-gray-700 disabled:opacity-50">{{ n.label }}</button>
            </div>
            <p class="text-[10px] text-gray-400 dark:text-gray-500 mt-1">Or drag the right-hand crocodile clip along wire P.</p>
          </div>
          <p v-if="stepGuide" class="mb-2 rounded-lg bg-indigo-50 dark:bg-indigo-900/30 px-2 py-1.5 text-[11px] font-semibold text-indigo-700 dark:text-indigo-300">{{ stepGuide }}</p>

          <!-- Switch K + filament -->
          <div class="flex items-center justify-between gap-2 mb-1.5">
            <span class="text-[11px] text-gray-500 dark:text-gray-400">Switch K: <strong :class="switchClosed ? 'text-emerald-600 dark:text-emerald-400' : 'text-gray-700 dark:text-gray-200'">{{ switchClosed ? 'Closed' : 'Open' }}</strong></span>
            <LabButton size="sm" :variant="switchClosed ? 'danger' : 'primary'" :disabled="readOnly" @click="toggleSwitch">{{ switchClosed ? 'Open K' : 'Close K' }}</LabButton>
          </div>
          <div v-if="!batteryMode" class="mb-2">
            <div class="flex justify-between text-[10px] text-gray-500 dark:text-gray-400 mb-0.5"><span>Filament</span><span :class="filamentStatus.cls">{{ filamentStatus.text }}</span></div>
            <div class="h-1.5 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden"><div class="h-full rounded-full transition-[width] duration-200" :class="filamentStatus.bar" :style="{ width: Math.min(100, filamentHeat * 70) + '%' }"></div></div>
          </div>

          <!-- Meters: voltmeter first, then ammeter - the order the procedure records them in -->
          <!-- In the battery practical the ammeter is read first, then the voltmeter -->
          <div class="flex flex-col gap-2">
            <div>
              <LabAnalogueMeter :value="voltDisplay" :max="VOLT_RANGE" :divisions="30" :label-every="5" unit="V" label="Voltmeter" />
              <form class="flex items-center gap-1.5 mt-1" @submit.prevent="recordReading('V')">
                <label class="text-[11px] font-semibold text-gray-600 dark:text-gray-300">V =</label>
                <input v-model="typedV" type="number" step="0.01" min="0" inputmode="decimal" :disabled="readOnly" class="input-field w-20 text-xs py-1" placeholder="0.00">
                <span class="text-[11px] text-gray-500">V</span>
                <LabButton size="sm" variant="success" class="ml-auto" :disabled="readOnly" @click="recordReading('V')">Record V</LabButton>
              </form>
            </div>
            <div :class="batteryMode ? 'order-first' : ''">
              <LabAnalogueMeter :value="ampDisplay" :max="AMP_RANGE" :divisions="50" :label-every="10" unit="A" label="Ammeter" />
              <form class="flex items-center gap-1.5 mt-1" @submit.prevent="recordReading('I')">
                <label class="text-[11px] font-semibold text-gray-600 dark:text-gray-300">I =</label>
                <input v-model="typedI" type="number" step="0.01" min="0" inputmode="decimal" :disabled="readOnly" class="input-field w-20 text-xs py-1" placeholder="0.00">
                <span class="text-[11px] text-gray-500">A</span>
                <LabButton size="sm" variant="success" class="ml-auto" :disabled="readOnly" @click="recordReading('I')">Record I</LabButton>
              </form>
            </div>
            <p v-if="switchClosed && !stable" class="text-[10px] text-amber-600 dark:text-amber-400">Readings stabilising...</p>
          </div>

          <!-- Readings taken so far -->
          <table class="w-full mt-2.5 text-[11px] border-collapse">
            <thead><tr class="text-gray-400 dark:text-gray-500 text-left"><th class="font-semibold py-0.5">{{ batteryMode ? 'l (cm)' : 'x (m)' }}</th><th class="font-semibold">V (V)</th><th class="font-semibold">I (A)</th></tr></thead>
            <tbody>
              <tr v-for="t in trialRows" :key="t.x" class="border-t border-gray-100 dark:border-gray-700" :class="isCurrentTarget(t.x) ? 'bg-indigo-50 dark:bg-indigo-900/30' : ''">
                <td class="py-0.5 tabular-nums text-gray-700 dark:text-gray-200">{{ batteryMode ? (t.x * 100).toFixed(1) : t.x.toFixed(3) }}</td>
                <td class="tabular-nums text-gray-700 dark:text-gray-200">{{ t.v ?? '-' }}</td>
                <td class="tabular-nums text-gray-700 dark:text-gray-200">{{ t.i ?? '-' }}</td>
              </tr>
            </tbody>
          </table>
        </template>
      </template>
    </div>
    <button v-else-if="phase !== 'collect'" @click="panelOpen = true" class="absolute right-2 top-2 sm:right-3 sm:top-3 px-3 py-1.5 text-xs font-semibold rounded-lg bg-white/95 dark:bg-gray-800/95 shadow-lg border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700">Show Lab Bench</button>

    <!-- Carrying an item from the tray -->
    <div v-if="carrying" class="absolute left-1/2 -translate-x-1/2 bottom-3 flex flex-wrap items-center justify-center gap-1.5 bg-indigo-600 text-white text-xs font-medium px-3 py-2 rounded-2xl shadow-lg max-w-[calc(100vw-2rem)]">
      <span>Placing <strong>{{ carryingName }}</strong> - click on the bench to put it down</span>
      <button @click="rotateActive(-1)" class="w-6 h-6 rounded-lg bg-white/20 hover:bg-white/30" title="Rotate left (Q)">&#10226;</button>
      <button @click="rotateActive(1)" class="w-6 h-6 rounded-lg bg-white/20 hover:bg-white/30" title="Rotate right (E)">&#10227;</button>
      <button @click="cancelCarry" class="px-2 h-6 rounded-lg bg-white/20 hover:bg-white/30">Cancel</button>
    </div>
    <!-- A placed item that has been clicked: move or rotate it -->
    <div v-else-if="selectedItem" class="absolute left-2 bottom-12 sm:left-3 sm:bottom-14 flex items-center gap-1.5 bg-white/95 dark:bg-gray-800/95 backdrop-blur rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 px-2.5 py-1.5">
      <span class="text-[11px] font-semibold text-gray-700 dark:text-gray-200 max-w-[9rem] truncate">{{ selectedName }}</span>
      <button :disabled="readOnly" @click="rotateActive(-1)" class="w-7 h-7 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50" title="Rotate left (Q)">&#10226;</button>
      <button :disabled="readOnly" @click="rotateActive(1)" class="w-7 h-7 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50" title="Rotate right (E)">&#10227;</button>
      <span class="hidden sm:inline text-[10px] text-gray-400 dark:text-gray-500">Drag to move &middot; Q / E to rotate</span>
      <button @click="selectedItem = null" class="w-5 h-5 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 text-xs leading-none">&times;</button>
    </div>
    <!-- Name of whatever the pointer is over -->
    <div v-if="hoverLabel && !carrying" class="absolute pointer-events-none px-2 py-0.5 rounded-md bg-gray-900/80 text-white text-[11px] font-medium whitespace-nowrap" :style="{ left: hoverLabel.x + 14 + 'px', top: hoverLabel.y + 12 + 'px' }">{{ hoverLabel.text }}</div>

    <div class="absolute left-2 bottom-2 sm:left-3 sm:bottom-3 flex gap-1.5">
      <button v-if="leads.length > 0 && !switchClosed" @click="resetLeads" :disabled="readOnly" class="px-3 py-1.5 text-xs font-semibold rounded-lg bg-white/95 dark:bg-gray-800/95 shadow-lg border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50">Remove All Leads</button>
      <button @click="room?.resetView()" class="px-3 py-1.5 text-xs font-semibold rounded-lg bg-white/95 dark:bg-gray-800/95 shadow-lg border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700">Reset View</button>
    </div>

    <transition enter-active-class="transition duration-200 ease-out" enter-from-class="opacity-0 -translate-y-1" leave-active-class="transition duration-150 ease-in" leave-to-class="opacity-0">
      <div v-if="hint" class="absolute left-1/2 -translate-x-1/2 top-2 sm:top-3 bg-amber-500 text-white text-xs font-medium px-4 py-2 rounded-2xl shadow-lg text-center max-w-[calc(100vw-2rem)] sm:max-w-md">{{ hint }}</div>
    </transition>
    <transition enter-active-class="transition duration-200 ease-out" enter-from-class="opacity-0 -translate-y-1" leave-active-class="transition duration-150 ease-in" leave-to-class="opacity-0">
      <div v-if="warning" class="absolute left-1/2 -translate-x-1/2 bottom-14 bg-red-500 text-white text-xs sm:text-sm font-medium px-4 py-2.5 rounded-2xl shadow-lg text-center max-w-[calc(100vw-2rem)] sm:max-w-md">{{ warning }}</div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, watch, nextTick, onMounted, onBeforeUnmount } from 'vue'
import * as THREE from 'three'
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js'
import { canvasTexture, labMaterials } from './lab3d/labRoom'
import { useLabScene } from './lab3d/useLabScene'
import LabUnsupported from './lab3d/LabUnsupported.vue'
import LabButton from './ui/LabButton.vue'
import LabAnalogueMeter from './ui/LabAnalogueMeter.vue'
import {
  solve, buildNodes, isSeriesLoop, isAcross, term, emptyLabRecord, BULB_TARGET_LENGTHS,
  CONSTANTAN_OHM_PER_M, CELLS_EMF_V, CELLS_INTERNAL_OHM, AMMETER_OHM, VOLTMETER_OHM, SWITCH_CLOSED_OHM, FILAMENT_HOT_RISE,
  type Element, type Lead, type Side, type BulbTrial, type BulbLabRecord,
} from './bulbCircuitEngine'
import type { SceneObjectConfig, LabObjectDef, LabAction } from '@/types/virtualLab'
import type { CameraView } from './VirtualLabScene.vue'

const props = defineProps<{
  sceneObjects: SceneObjectConfig[]
  objectCatalog: LabObjectDef[]
  connections?: { from: string; to: string }[]
  readOnly?: boolean
  /** Admin review: everything already out of the tray and taped down, ready to wire. */
  forcePlaced?: boolean
  /** The step the step list is on, so the lab reports what that step is waiting for (and never runs
   *  ahead of it or falls behind it). */
  currentStep?: { required_action: string; target_object_key: string | null; expected_value: string | null } | null
}>()

const emit = defineEmits<{
  action: [{ objectKey: string | null; action: LabAction; value: string | null; unit?: string | null; label?: string | null; safetyIssue?: boolean; targetObjectKey?: string | null; bulbTrial?: BulbTrial; labRecord?: BulbLabRecord }]
}>()

function catalogFor(objectType: string) { return props.objectCatalog.find(o => o.object_type === objectType) }
function mergedProps(cfg: SceneObjectConfig | undefined): Record<string, any> {
  if (!cfg) return {}
  return { ...(catalogFor(cfg.object_type)?.default_props || {}), ...(cfg.props || {}) }
}
/** Short tray labels - the full name shows on hover and everywhere else. */
const SHORT_NAME: Record<string, string> = {
  cell_holder: 'Dry cells', switch: 'Switch', ammeter: 'Ammeter', voltmeter: 'Voltmeter', metre_rule: 'Metre rule', torch_bulb: 'Torch bulb',
  constantan_wire: 'Constantan wire', crocodile_clip: 'Crocodile clips', sellotape: 'Sellotape', wire: 'Leads',
}
const itemName = (cfg: SceneObjectConfig) => cfg.props?.label || catalogFor(cfg.object_type)?.display_name || cfg.object_type

// --- Apparatus ---------------------------------------------------------------------------------------
const cfgOf = (type: string) => props.sceneObjects.find(o => o.object_type === type && !o.props?.distractor)
const K = {
  cells: computed(() => cfgOf('cell_holder')?.key ?? 'cells1'),
  switch: computed(() => cfgOf('switch')?.key ?? 'switch1'),
  wire: computed(() => cfgOf('constantan_wire')?.key ?? 'wireP'),
  bulb: computed(() => cfgOf('torch_bulb')?.key ?? 'bulb1'),
  ammeter: computed(() => cfgOf('ammeter')?.key ?? 'ammeter1'),
  voltmeter: computed(() => cfgOf('voltmeter')?.key ?? 'voltmeter1'),
}
const bulbR0 = computed(() => Number(mergedProps(cfgOf('torch_bulb')).cold_resistance_ohm ?? 1.1))
const emf0 = computed(() => Number(mergedProps(cfgOf('cell_holder')).emf_v ?? CELLS_EMF_V))
const cellsR = computed(() => Number(mergedProps(cfgOf('cell_holder')).internal_resistance_ohm ?? CELLS_INTERNAL_OHM))
const ohmPerM = computed(() => Number(mergedProps(cfgOf('constantan_wire')).ohm_per_m ?? CONSTANTAN_OHM_PER_M))
const AMP_RANGE = 1
const VOLT_RANGE = 3

const requiredItems = computed(() => props.sceneObjects.filter(o => !o.props?.distractor))
const placedKeys = reactive(new Set<string>())
const returnedKeys = reactive(new Set<string>())
const trayItems = computed(() => props.sceneObjects.filter(o => o.in_tray !== false && !placedKeys.has(o.key) && !returnedKeys.has(o.key)))
const placedRequiredCount = computed(() => requiredItems.value.filter(o => placedKeys.has(o.key)).length)
const allRequiredPlaced = computed(() => placedRequiredCount.value === requiredItems.value.length)
const taped = reactive(new Set<'left' | 'right'>())
const phase = computed<'collect' | 'tape' | 'experiment'>(() => !allRequiredPlaced.value ? 'collect' : taped.size < 2 ? 'tape' : 'experiment')

const record = reactive<BulbLabRecord>(emptyLabRecord())
const snapshotRecord = (): BulbLabRecord => ({ ...record })

function pickFromTray(key: string) {
  if (props.readOnly) return
  const cfg = props.sceneObjects.find(o => o.key === key)
  if (!cfg) return
  if (cfg.props?.distractor) {
    returnedKeys.add(key)
    record.distractor_picks++
    flash(`A ${itemName(cfg).toLowerCase()} isn't needed to find the filament's resistance - it has gone back on the shelf.`)
    return
  }
  if (carrying.value === key) { cancelCarry(); return }
  const mv = MOVABLE_OF_TYPE[cfg.object_type]
  if (!mv) {
    // The wire, clips and tape aren't put down on their own - they go onto the metre rule
    if (!placedTypes.value.has('metre_rule')) { flash('Put the metre rule on the bench first - the constantan wire is fixed along it.'); return }
    if (cfg.object_type !== 'constantan_wire' && !placedTypes.value.has('constantan_wire')) { flash('Lay the constantan wire along the metre rule first.'); return }
    place(key)
    flash(cfg.object_type === 'constantan_wire' ? 'Wire P is laid along the metre rule.' : cfg.object_type === 'crocodile_clip' ? 'The crocodile clips are on wire P: one at 0 cm, the other at x0 = 1.000 m.' : 'The Sellotape is beside the rule, ready to fix the wire.')
    return
  }
  carrying.value = key
  carryPose.rot = 0
  selectedItem.value = null
  flash(`Click on the bench where you want to put the ${itemName(cfg).toLowerCase()}.`)
}

function place(key: string) {
  placedKeys.add(key)
  if (allRequiredPlaced.value) {
    emit('action', { objectKey: null, action: 'move', value: 'apparatus_ready', labRecord: snapshotRecord() })
    flash('All the apparatus is on the bench. Now fix wire P to the metre rule with the Sellotape.')
  }
}

// --- Placing, moving and rotating apparatus on the bench -------------------------------------------------
type Movable = 'cells' | 'switch' | 'bulb' | 'ammeter' | 'voltmeter' | 'rule' | 'leads'
interface Pose { x: number; z: number; rot: number }
const MOVABLE_OF_TYPE: Record<string, Movable> = { cell_holder: 'cells', switch: 'switch', torch_bulb: 'bulb', ammeter: 'ammeter', voltmeter: 'voltmeter', metre_rule: 'rule', wire: 'leads' }
const MOVABLES: Movable[] = ['cells', 'switch', 'bulb', 'ammeter', 'voltmeter', 'rule', 'leads']
/** Half length and half depth of each item's footprint (m), to keep it on the bench top. */
const HALF_EXTENT: Record<Movable, [number, number]> = { cells: [0.09, 0.04], switch: [0.055, 0.025], bulb: [0.055, 0.025], ammeter: [0.08, 0.055], voltmeter: [0.08, 0.055], rule: [0.53, 0.06], leads: [0.03, 0.03] }
const BENCH_HALF_X = 1.45
const BENCH_HALF_Z = 0.355
const ROTATE_STEP = Math.PI / 12 // 15 degrees
const poses = reactive<Partial<Record<Movable, Pose>>>({})
const placedTypes = computed(() => new Set([...placedKeys].map(k => props.sceneObjects.find(o => o.key === k)?.object_type)))
const carrying = ref<string | null>(null)
const carryPose = reactive<Pose>({ x: 0, z: 0, rot: 0 })
let carryOnBench = false
const selectedItem = ref<Movable | null>(null)
const keyOfMovable = (m: Movable) => props.sceneObjects.find(o => !o.props?.distractor && MOVABLE_OF_TYPE[o.object_type] === m)?.key ?? null
const nameOfMovable = (m: Movable) => { const k = keyOfMovable(m); const cfg = props.sceneObjects.find(o => o.key === k); return cfg ? itemName(cfg) : m }
const carryingMovable = computed(() => { const cfg = props.sceneObjects.find(o => o.key === carrying.value); return cfg ? MOVABLE_OF_TYPE[cfg.object_type] ?? null : null })
const carryingName = computed(() => { const cfg = props.sceneObjects.find(o => o.key === carrying.value); return cfg ? itemName(cfg) : '' })
const selectedName = computed(() => (selectedItem.value ? nameOfMovable(selectedItem.value) : ''))

function clampPose(m: Movable, x: number, z: number, rot: number): Pose {
  const [hx, hz] = HALF_EXTENT[m]
  const c = Math.abs(Math.cos(rot)), sn = Math.abs(Math.sin(rot))
  const ex = hx * c + hz * sn, ez = hx * sn + hz * c
  const clamp = (v: number, lim: number) => (lim <= 0 ? 0 : Math.max(-lim, Math.min(lim, v)))
  return { x: clamp(x, BENCH_HALF_X - ex), z: clamp(z, BENCH_HALF_Z - ez), rot }
}
function cancelCarry() { carrying.value = null; carryOnBench = false }
function dropCarried() {
  const m = carryingMovable.value
  if (!m || !carrying.value) return
  if (!carryOnBench) { flash('Put it down on the bench top.'); return }
  poses[m] = clampPose(m, carryPose.x, carryPose.z, carryPose.rot)
  const key = carrying.value
  cancelCarry()
  place(key)
}
/** Rotates whatever is being placed, or the selected item, by 15 degrees. */
function rotateActive(dir: 1 | -1) {
  if (props.readOnly) return
  if (carrying.value) { carryPose.rot += dir * ROTATE_STEP; return }
  const m = selectedItem.value
  const p = m ? poses[m] : null
  if (m && p) poses[m] = clampPose(m, p.x, p.z, p.rot + dir * ROTATE_STEP)
}
function onKey(ev: KeyboardEvent) {
  const tag = (ev.target as HTMLElement | null)?.tagName
  if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return
  if (ev.key === 'Escape') { cancelCarry(); armed.value = null; selectedItem.value = null }
  else if (ev.key === 'q' || ev.key === 'Q') rotateActive(-1)
  else if (ev.key === 'e' || ev.key === 'E') rotateActive(1)
}

// --- Geometry (metres; bench top y = 0, +z towards the student) ------------------------------------
const RULE_Z = 0.13
const RULE_X0 = -0.5 // the rule's 0 cm mark, where the fixed crocodile clip sits
const WIRE_Y = 0.0115
const CLIP_TAIL = 0.04 // the clip's lead post sits this far behind the wire
const MIN_X = 0.05
const clipX = ref(1.0) // x0 = 1.000 m: the whole wire, until the student sets the first length

interface Slot { x: number; z: number; half: number; postY: number }
const SLOTS: Record<'cells' | 'switch' | 'bulb' | 'ammeter' | 'voltmeter', Slot> = {
  cells: { x: -0.40, z: -0.08, half: 0.078, postY: 0.046 },
  switch: { x: -0.16, z: -0.08, half: 0.04, postY: 0.022 },
  bulb: { x: 0.09, z: -0.08, half: 0.04, postY: 0.022 },
  ammeter: { x: 0.35, z: -0.08, half: 0.058, postY: 0.052 },
  voltmeter: { x: 0.09, z: -0.26, half: 0.058, postY: 0.052 },
}
const roleOfKey = (key: string): keyof typeof SLOTS | 'wire' | null => {
  if (key === K.wire.value) return 'wire'
  if (key === K.cells.value) return 'cells'
  if (key === K.switch.value) return 'switch'
  if (key === K.bulb.value) return 'bulb'
  if (key === K.ammeter.value) return 'ammeter'
  if (key === K.voltmeter.value) return 'voltmeter'
  return null
}

/** World position of a terminal. Side 'a' is the left/negative one; for wire P, 'a' is the fixed clip
 *  at 0 cm and 'b' the movable clip at x. */
function terminalPos(t: string): THREE.Vector3 {
  const [key, side] = t.split(':') as [string, Side]
  const role = roleOfKey(key)
  if (role === 'wire') {
    const x = side === 'a' ? RULE_X0 : RULE_X0 + clipX.value
    ruleOuter.updateMatrixWorld(true)
    return ruleInner.localToWorld(new THREE.Vector3(x, 0.03, RULE_Z - CLIP_TAIL))
  }
  if (!role) return new THREE.Vector3()
  const s = SLOTS[role]
  const g = groups.get(key)
  if (!g) return new THREE.Vector3()
  g.updateMatrixWorld(true)
  return g.localToWorld(new THREE.Vector3(side === 'a' ? -s.half : s.half, s.postY, 0))
}

// --- Leads and circuit state ---------------------------------------------------------------------------
const leads = reactive<Lead[]>([])
const switchClosed = ref(false)
const filamentHeat = ref(0) // 0 = room temperature, ~1 = normal working temperature
let sag = 0 // EMF lost to the cells running down while K is closed (recovers when open)
let onSeconds = 0
let leftOnWarned = false
let warmStartThisClosure = false

// --- Battery set-up ("Determination of Internal Resistance and EMF of a Battery") ----------------------
// With no torch bulb among the apparatus the same bench becomes the internal-resistance practical: the
// loop is cells - K - ammeter - wire P, the voltmeter goes across the battery (its terminal p.d. V),
// lengths are in cm, and the cells' hidden emf / internal resistance come from their props.
const batteryMode = computed(() => !props.sceneObjects.some(o => o.object_type === 'torch_bulb'))
/** What the voltmeter must be connected across. */
const acrossKey = computed(() => (batteryMode.value ? K.cells.value : K.bulb.value))
const acrossName = computed(() => (batteryMode.value ? 'the battery' : 'the bulb'))
/** The lengths the results table asks for (metres). */
const targetLengths = computed<number[]>(() => {
  const fromProps = mergedProps(cfgOf('constantan_wire')).target_lengths_m
  return Array.isArray(fromProps) && fromProps.length ? fromProps.map(Number) : BULB_TARGET_LENGTHS
})
const lengthText = (x: number) => (batteryMode.value ? `${(x * 100).toFixed(1)} cm` : `${x.toFixed(3)} m`)
const CONNECTIONS_MSG = 'Check the circuit connections. The ammeter must be in series and the voltmeter must be connected across the battery.'

const circuitKeys = computed(() => (batteryMode.value
  ? [K.cells.value, K.switch.value, K.wire.value, K.ammeter.value]
  : [K.cells.value, K.switch.value, K.wire.value, K.bulb.value, K.ammeter.value]))

function elements(opts: { forceClosed?: boolean; cold?: boolean } = {}): Element[] {
  const els: Element[] = [
    { key: K.cells.value, kind: 'source', r: cellsR.value, emf: Math.max(0, emf0.value - (opts.cold ? 0 : sag)) },
    { key: K.wire.value, kind: 'resistor', r: ohmPerM.value * clipX.value },
    { key: K.bulb.value, kind: 'resistor', r: bulbR0.value * (1 + FILAMENT_HOT_RISE * (opts.cold ? 0 : filamentHeat.value)) },
    { key: K.ammeter.value, kind: 'resistor', r: AMMETER_OHM },
    { key: K.voltmeter.value, kind: 'resistor', r: VOLTMETER_OHM },
  ]
  // An open switch is simply absent - its two terminals are left floating
  if (switchClosed.value || opts.forceClosed) els.push({ key: K.switch.value, kind: 'resistor', r: SWITCH_CLOSED_OHM })
  return els
}

/** Wiring state with K treated as closed (topology doesn't depend on the switch). */
const topology = computed(() => {
  const nodes = buildNodes(elements({ forceClosed: true }), leads)
  const loop = isSeriesLoop(circuitKeys.value, nodes)
  const vAcross = isAcross(K.voltmeter.value, acrossKey.value, nodes)
  const sol = solve(elements({ forceClosed: true, cold: true }), leads)
  const ammForward = sol.currentBA(K.ammeter.value) > 0.01
  const voltForward = sol.voltageBA(K.voltmeter.value) > 0.01
  return {
    loop, vAcross, ammForward, voltForward,
    ammAcrossBulb: isAcross(K.ammeter.value, acrossKey.value, nodes),
    voltInSeries: isSeriesLoop([...circuitKeys.value, K.voltmeter.value], nodes),
    shortCircuit: Math.abs(sol.currentBA(K.cells.value)) > 2.0,
  }
})
const seriesOk = computed(() => topology.value.loop && topology.value.ammForward)
const voltmeterOk = computed(() => topology.value.vAcross && topology.value.voltForward)
const circuitReady = computed(() => seriesOk.value && voltmeterOk.value)
/** Plain names for the components in wiring advice. */
const LOOP_NAME = computed<Record<string, string>>(() => ({
  [K.cells.value]: 'the cells', [K.switch.value]: 'switch K', [K.wire.value]: 'wire P (the crocodile clips)',
  [K.bulb.value]: 'the bulb', [K.ammeter.value]: 'the ammeter', [K.voltmeter.value]: 'the voltmeter',
}))
const listNames = (keys: string[]) => {
  const n = keys.map(k => LOOP_NAME.value[k] ?? k)
  return n.length <= 1 ? n.join('') : n.slice(0, -1).join(', ') + ' and ' + n[n.length - 1]
}
/**
 * Explains what stops the wiring being one series loop with the voltmeter across the bulb - which
 * components meet at a junction of three or more (a branch), which terminal is a dead end, what is
 * short-circuited - and which terminals are involved, so they can be ringed in red.
 */
const wiringDiagnosis = computed(() => {
  const advice: string[] = []
  const bad = new Set<string>()
  const nodes = buildNodes(elements({ forceClosed: true }), leads)
  const loopKeys = circuitKeys.value
  const terminalsAt = new Map<number, string[]>()
  loopKeys.forEach(k => (['a', 'b'] as Side[]).forEach((sd) => {
    const n = nodes.get(term(k, sd))!
    terminalsAt.set(n, [...(terminalsAt.get(n) ?? []), term(k, sd)])
  }))
  const hasLead = (t: string) => leads.some(l => l.from === t || l.to === t)

  const unconnected = loopKeys.filter(k => !hasLead(term(k, 'a')) && !hasLead(term(k, 'b')))
  if (unconnected.length) advice.push(`Connect ${listNames(unconnected)} into the loop - no leads go to ${unconnected.length > 1 ? 'them' : 'it'} yet.`)

  loopKeys.forEach((k) => {
    if (nodes.get(term(k, 'a')) === nodes.get(term(k, 'b'))) {
      advice.push(`${LOOP_NAME.value[k][0].toUpperCase()}${LOOP_NAME.value[k].slice(1)} is short-circuited: its two terminals end up joined to each other. Remove one of its leads.`)
      bad.add(term(k, 'a')); bad.add(term(k, 'b'))
    }
  })

  terminalsAt.forEach((terms) => {
    const keys = [...new Set(terms.map(t => t.split(':')[0]))]
    if (terms.length > 2 && keys.length > 2) {
      advice.push(`${listNames(keys)} are all joined at one point. That makes a branch, so the current splits. In a series loop each join links just two components - move one of these leads.`)
      terms.forEach(t => bad.add(t))
    }
  })

  if (!unconnected.length) {
    terminalsAt.forEach((terms) => {
      if (terms.length !== 1) return
      const t = terms[0]
      if (!hasLead(t)) return // a free terminal is covered by "connect it"
      // Joined only to the voltmeter: the voltmeter is sitting in the loop
      advice.push(`One terminal of ${LOOP_NAME.value[t.split(':')[0]]} only leads to the voltmeter. The voltmeter must not be part of the loop - connect it across ${acrossName.value} instead.`)
      bad.add(t)
    })
    loopKeys.forEach((k) => {
      ;(['a', 'b'] as Side[]).forEach((sd) => {
        const t = term(k, sd)
        if (!hasLead(t) && !bad.has(t)) { advice.push(`One terminal of ${LOOP_NAME.value[k]} has nothing connected to it - join it to the next component in the loop.`); bad.add(t) }
      })
    })
  }

  if (topology.value.loop && !topology.value.ammForward) {
    advice.push("The ammeter is the wrong way round: its red + terminal must be on the side nearer the cells' + (red) terminal. Swap its two leads.")
    bad.add(term(K.ammeter.value, 'a')); bad.add(term(K.ammeter.value, 'b'))
  }
  if (topology.value.loop && !topology.value.vAcross) {
    const vLeads = leads.filter(l => l.from.startsWith(K.voltmeter.value + ':') || l.to.startsWith(K.voltmeter.value + ':')).length
    const holder = batteryMode.value ? 'the cell holder' : 'the bulb holder'
    advice.push(vLeads ? `The voltmeter is not across ${acrossName.value}: join one voltmeter terminal to each terminal of ${holder}.` : `Now connect the voltmeter across ${acrossName.value}: one lead from each voltmeter terminal to each terminal of ${holder}.`)
  } else if (topology.value.loop && topology.value.vAcross && !topology.value.voltForward) {
    advice.push(batteryMode.value ? "The voltmeter is the wrong way round: its red + terminal must go to the cells' + (red) terminal. Swap its two leads." : "The voltmeter is the wrong way round: its red + terminal must go to the bulb terminal nearer the cells' +. Swap its two leads.")
    bad.add(term(K.voltmeter.value, 'a')); bad.add(term(K.voltmeter.value, 'b'))
  }
  const cap = (t: string) => t[0].toUpperCase() + t.slice(1)
  return { advice: [...new Set(advice.map(cap))], bad }
})
const wiringAdvice = computed(() => wiringDiagnosis.value.advice)
const problemTerminals = computed(() => wiringDiagnosis.value.bad)

const connectionChecks = computed(() => [
  { ok: topology.value.loop, text: batteryMode.value ? 'Cells, switch K, ammeter and wire P (via the clips) in one series loop' : 'Cells, switch K, wire P (via the clips), bulb and ammeter in one series loop' },
  { ok: topology.value.loop && topology.value.ammForward, text: 'Ammeter in series, + terminal towards the cells\' +' },
  { ok: voltmeterOk.value, text: batteryMode.value ? 'Voltmeter across the battery, + to the cells\' +' : 'Voltmeter across the bulb, + on the side nearer the cells\' +' },
])

/** What's wrong with the wiring when K is closed, if anything worth a warning. */
function wiringFault(): string | null {
  const t = topology.value
  if (t.shortCircuit) return 'Short circuit! The cells are connected straight across with almost no resistance. Open switch K and check your leads.'
  if (batteryMode.value && (t.ammAcrossBulb || t.voltInSeries || (t.loop && !t.ammForward) || (t.vAcross && !t.voltForward))) return CONNECTIONS_MSG
  if (t.ammAcrossBulb) return 'The ammeter is connected across the bulb - it short-circuits the bulb. An ammeter must be connected in series.'
  if (t.voltInSeries) return 'The voltmeter is connected in series, so almost no current flows. A voltmeter must be connected across the bulb.'
  if (t.loop && !t.ammForward) return 'The ammeter is connected the wrong way round - its needle goes below zero. Open K and swap its leads.'
  if (t.vAcross && !t.voltForward) return 'The voltmeter is connected the wrong way round - its needle goes below zero. Open K and swap its leads.'
  return null
}

let seriesAnnounced = false
let voltmeterAnnounced = false
/** Tell the step list each time a wiring milestone is first reached, in procedure order. A voltmeter
 *  wired before the loop was finished is announced a moment after the loop, never in the same tick,
 *  so the two step checks can't race each other. */
function announceWiring() {
  if (phase.value !== 'experiment') return
  if (seriesOk.value && !seriesAnnounced) {
    seriesAnnounced = true
    emit('action', { objectKey: null, action: 'connect', value: 'series_loop', labRecord: snapshotRecord() })
    flash(`Series loop complete, with the ammeter in series. Now connect the voltmeter across ${acrossName.value}.`)
  }
  if (seriesAnnounced && voltmeterOk.value && !voltmeterAnnounced) {
    voltmeterAnnounced = true
    window.setTimeout(() => {
      emit('action', { objectKey: null, action: 'connect', value: batteryMode.value ? 'voltmeter_across_battery' : 'voltmeter_across_bulb', labRecord: snapshotRecord() })
      flash(`Circuit connected. Set ${batteryMode.value ? 'l' : 'x'} = ${lengthText(targetLengths.value[0])}, then close switch K.`)
    }, 900)
  }
}

function addOrToggleLead(a: string, b: string) {
  const existing = leads.findIndex(l => (l.from === a && l.to === b) || (l.from === b && l.to === a))
  if (existing >= 0) leads.splice(existing, 1)
  else leads.push({ from: a, to: b })
  selectedLead.value = null
  announceWiring()
}
function resetLeads() {
  if (props.readOnly || switchClosed.value) return
  leads.splice(0, leads.length)
  armed.value = null
  selectedLead.value = null
}
const selectedLead = ref<number | null>(null)
function removeSelectedLead() {
  if (props.readOnly || selectedLead.value === null) return
  if (switchClosed.value) { flashWarning('Open switch K before changing the connections.'); return }
  leads.splice(selectedLead.value, 1)
  selectedLead.value = null
}

// --- Switch K ------------------------------------------------------------------------------------------
function toggleSwitch() {
  if (props.readOnly) return
  if (phase.value !== 'experiment') { flash('Set up and connect the circuit first.'); return }
  if (!switchClosed.value) {
    const fault = wiringFault()
    if (fault) {
      record.wiring_faults++
      if (topology.value.loop && !topology.value.ammForward) record.ammeter_reversed++
      if (topology.value.vAcross && !topology.value.voltForward) record.voltmeter_reversed++
      flashWarning(fault)
    } else if (!circuitReady.value) {
      flash('The circuit is incomplete - check the connections list.')
    }
    warmStartThisClosure = filamentHeat.value > 0.3
    if (warmStartThisClosure) {
      record.warm_starts++
      flashWarning('Allow the bulb to cool before taking another reading - a hot filament has a higher resistance.')
    }
    switchClosed.value = true
    onSeconds = 0
    leftOnWarned = false
    ampDisplay.value = 0
    voltDisplay.value = 0
    emit('action', { objectKey: K.switch.value, action: 'switch_on', value: null, safetyIssue: topology.value.shortCircuit })
  } else {
    const t = currentTrial()
    if (t && (t.v === undefined) !== (t.i === undefined)) {
      record.incomplete_pairs++
      flashWarning('Record both the ammeter and voltmeter readings before proceeding.')
    }
    switchClosed.value = false
    emit('action', { objectKey: K.switch.value, action: 'switch_off', value: null, labRecord: snapshotRecord() })
    if (t && t.v !== undefined && t.i !== undefined) flash(batteryMode.value ? 'Switch K open. Now set the next length.' : 'Switch K open. Let the bulb cool, then set the next length.')
  }
}

// --- Effective length ----------------------------------------------------------------------------------
const NUDGES = [{ label: '-10 mm', dm: -0.01 }, { label: '-1 mm', dm: -0.001 }, { label: '+1 mm', dm: 0.001 }, { label: '+10 mm', dm: 0.01 }]
const nearTarget = (x: number) => targetLengths.value.find(tl => Math.abs(tl - x) < 0.0015) ?? null
/** The first length in the results table without both readings yet - the one the procedure is on. */
const nextTarget = computed(() => targetLengths.value.find((x) => {
  const t = trials.get(x.toFixed(3))
  return !(t && t.v !== undefined && t.i !== undefined)
}) ?? null)
let lastEmittedLength: string | null = null
let nudgeTimer = 0

function blockIfOn(): boolean {
  if (!switchClosed.value) return false
  record.length_change_while_on++
  flashWarning(batteryMode.value ? 'Open switch K before changing the wire length.' : 'Open switch K before adjusting the wire length.')
  return true
}
function setClip(x: number) {
  clipX.value = Math.round(Math.max(MIN_X, Math.min(1.0, x)) * 1000) / 1000
  // Moving off a table length means arriving at it again reports it again
  if (nearTarget(clipX.value) === null) lastEmittedLength = null
}
/** The length the step list is waiting for - or, without step information, the next table length. */
const wantedLength = computed<number | null>(() => {
  const st = props.currentStep
  if (st) return st.required_action === 'move' && st.target_object_key === 'clip2' && st.expected_value ? Number(st.expected_value) : null
  return nextTarget.value
})
function nudge(dm: number) {
  if (props.readOnly || blockIfOn()) return
  setClip(clipX.value + dm)
  window.clearTimeout(nudgeTimer)
  nudgeTimer = window.setTimeout(emitLengthIfTarget, 500)
}
/** Only the length the procedure is on is reported to the step list, so passing other table lengths
 *  on the way there (e.g. nudging down from 1.000 m through 0.600 m to 0.200 m) never counts as a
 *  wrong attempt. */
function emitLengthIfTarget(force = false) {
  const tl = nearTarget(clipX.value)
  if (tl === null || wantedLength.value === null || Math.abs(tl - wantedLength.value) > 0.0015) return
  const value = tl.toFixed(3)
  if (value === lastEmittedLength && !force) return
  lastEmittedLength = value
  emit('action', { objectKey: 'clip2', action: 'move', value, unit: 'm', label: 'Effective length x' })
}

// --- Readings -------------------------------------------------------------------------------------------
interface TrialState { v?: number; i?: number; trueV?: number; trueI?: number; warm: boolean }
const trials = reactive(new Map<string, TrialState>())
const typedV = ref('')
const typedI = ref('')
const ampDisplay = ref(0)
const voltDisplay = ref(0)
let ampTrue = 0
let voltTrue = 0
const stable = ref(false)

/** A one-line reminder of what the step list wants next, when it's something done on the bench panel. */
const stepGuide = computed(() => {
  const st = props.currentStep
  if (!st) return ''
  if (st.required_action === 'move' && st.target_object_key === 'clip2' && st.expected_value) return `Next: ${switchClosed.value ? 'open K, then ' : ''}set ${batteryMode.value ? 'l' : 'x'} = ${lengthText(Number(st.expected_value))}`
  if (st.required_action === 'switch_on') return 'Next: close switch K'
  if (st.required_action === 'switch_off') return 'Next: open switch K'
  if (st.required_action === 'measure') return st.target_object_key === K.voltmeter.value ? 'Next: read the voltmeter and click Record V' : 'Next: read the ammeter and click Record I'
  return ''
})
// When the step list moves on to a length the clip is already at, report it straight away
watch(() => props.currentStep, () => { if (!switchClosed.value) emitLengthIfTarget(true) })

const currentTrial = () => {
  const tl = nearTarget(clipX.value)
  return tl === null ? null : trials.get(tl.toFixed(3)) ?? null
}
const isCurrentTarget = (x: number) => Math.abs(x - clipX.value) < 0.0015
const trialRows = computed(() => targetLengths.value.map(x => {
  const t = trials.get(x.toFixed(3))
  return { x, v: t?.v, i: t?.i }
}))

function recordReading(which: 'V' | 'I') {
  if (props.readOnly) return
  if (!switchClosed.value) {
    record.record_while_open++
    flashWarning(batteryMode.value ? 'Close switch K before taking the current and terminal voltage readings.' : 'The circuit is open. Close switch K before taking the reading.')
    return
  }
  const tl = nearTarget(clipX.value)
  if (props.currentStep) {
    // Follow the step list: readings are taken when it asks for them, at whatever table length the
    // clip is on (re-recording a length simply replaces that row)
    if (props.currentStep.required_action !== 'measure') { flash(stepGuide.value || 'Follow the current step first.'); return }
    if (tl === null) { flash(batteryMode.value ? 'Select the required wire length before taking the reading.' : 'Set x to one of the lengths in the results table first.'); return }
  } else {
    if (nextTarget.value === null) { flash('All five pairs of readings are recorded. You can correct any of them in the results table in your notebook.'); return }
    if (tl !== nextTarget.value) { flash(`The next length in the results table is x = ${nextTarget.value.toFixed(3)} m. Open K and set the clip to it first.`); return }
  }
  if (!stable.value) { flash('Wait a moment for the readings to stabilise.'); return }
  const typed = parseFloat(which === 'V' ? typedV.value : typedI.value)
  if (!Number.isFinite(typed)) { flash(`Type the ${which === 'V' ? 'voltmeter' : 'ammeter'} reading first.`); return }
  const actual = which === 'V' ? voltTrue : ampTrue
  // More than about 1.5 scale divisions away from where the needle actually is
  if (Math.abs(typed - actual) > (which === 'V' ? 0.15 : 0.03)) {
    flash(`Look at the ${which === 'V' ? 'voltmeter' : 'ammeter'} again - your value doesn't match where the needle is pointing. Read with your eye directly above the needle.`)
    return
  }
  const key = tl.toFixed(3)
  const t = trials.get(key) ?? { warm: false }
  if (which === 'V') { t.v = typed; t.trueV = Math.round(actual * 1000) / 1000 } else { t.i = typed; t.trueI = Math.round(actual * 1000) / 1000 }
  t.warm = t.warm || warmStartThisClosure
  trials.set(key, t)
  if (which === 'V') typedV.value = ''
  else typedI.value = ''

  const complete = t.v !== undefined && t.i !== undefined
  const bulbTrial: BulbTrial | undefined = complete
    ? { x_m: tl, voltage_v: t.v!, current_a: t.i!, true_voltage_v: t.trueV!, true_current_a: t.trueI!, warm_start: t.warm, on_seconds: Math.round(onSeconds * 10) / 10 }
    : undefined
  emit('action', {
    objectKey: which === 'V' ? K.voltmeter.value : K.ammeter.value, action: 'measure', value: String(typed),
    unit: which === 'V' ? 'V' : 'A', label: which === 'V' ? 'Voltmeter reading' : 'Ammeter reading',
    bulbTrial, labRecord: complete ? snapshotRecord() : undefined,
  })
  if (complete) flash('Both readings recorded. Open switch K now to stop the filament heating.')
  else flash(`${which === 'V' ? 'Voltmeter' : 'Ammeter'} reading recorded - now record the ${which === 'V' ? 'ammeter (I)' : 'voltmeter (V)'} reading.`)
}

const filamentStatus = computed(() => {
  const h = filamentHeat.value
  if (switchClosed.value) return h > 1.05 ? { text: 'Overheating - open K', cls: 'text-red-600 font-semibold', bar: 'bg-red-500' } : { text: 'Glowing', cls: 'text-amber-600', bar: 'bg-amber-400' }
  if (h > 0.3) return { text: 'Cooling...', cls: 'text-amber-600', bar: 'bg-orange-400' }
  return { text: 'Cool', cls: 'text-emerald-600', bar: 'bg-emerald-400' }
})

// --- Per-frame physics ---------------------------------------------------------------------------------
const HEAT_REF_W = 1.0 // filament power at which it reaches its normal working temperature
function step(dt: number) {
  const sol = solve(elements(), leads)
  const bulbI = Math.abs(sol.currentBA(K.bulb.value))
  const power = bulbI * bulbI * bulbR0.value * (1 + FILAMENT_HOT_RISE * filamentHeat.value)

  if (switchClosed.value) {
    onSeconds += dt
    // Left on far longer than needed, the holder and filament keep creeping hotter
    const soak = 1 + Math.min(1.5, Math.max(0, onSeconds - 12) * 0.05)
    const target = (power / HEAT_REF_W) * soak
    filamentHeat.value += (target - filamentHeat.value) * Math.min(1, dt / (target > filamentHeat.value ? 1.6 : 3))
    sag = Math.min(0.4, sag + dt * Math.abs(sol.currentBA(K.cells.value)) * 0.006)
    if (onSeconds > 10 && !leftOnWarned && bulbI > 0.05) {
      leftOnWarned = true
      record.left_on++
      flashWarning('Open the switch after taking the reading to prevent unnecessary heating of the bulb.')
    }
    const amm = sol.currentBA(K.ammeter.value)
    const volt = sol.voltageBA(K.voltmeter.value)
    if (amm > AMP_RANGE * 1.05 && !overRangeWarned) { overRangeWarned = true; flashWarning('The ammeter is over its 0-1 A range! Open switch K at once and check the circuit.') }
    ampTrue = amm
    voltTrue = volt
  } else {
    filamentHeat.value += (0 - filamentHeat.value) * Math.min(1, dt / 3)
    sag = Math.max(0, sag - dt * 0.03)
    ampTrue = 0
    voltTrue = 0
    overRangeWarned = false
  }
  // Meter needles are damped - they swing to the reading over a fraction of a second
  const k = Math.min(1, dt / 0.35)
  ampDisplay.value += (ampTrue - ampDisplay.value) * k
  voltDisplay.value += (voltTrue - voltDisplay.value) * k
  stable.value = switchClosed.value && onSeconds > 2.2 && Math.abs(ampTrue - ampDisplay.value) < 0.004 && Math.abs(voltTrue - voltDisplay.value) < 0.01
  brightness = switchClosed.value ? Math.min(1, power / 1.3) : Math.max(0, brightness - dt * 2)
}
let overRangeWarned = false
let brightness = 0

// --- 3D models ------------------------------------------------------------------------------------------
let sceneRef: THREE.Scene
const groups = new Map<string, THREE.Group>()
const terminalMeshes = new Map<string, THREE.Mesh>() // terminal id -> post
const leadMeshes: THREE.Mesh[] = []
let previewLine: THREE.Line
let clip2Group: THREE.Group
let switchLever: THREE.Group
let switchGroup: THREE.Group
let bulbGlass: THREE.MeshStandardMaterial
let bulbFilament: THREE.MeshBasicMaterial
let bulbLight: THREE.PointLight
let ammNeedle: THREE.Group
let voltNeedle: THREE.Group
const tapeMarkers: Record<'left' | 'right', THREE.Mesh> = {} as any
const tapeStrips: Record<'left' | 'right', THREE.Mesh> = {} as any
const LEAD_COLORS = [0xdc2626, 0x111827, 0x2563eb, 0xdc2626, 0x111827, 0x16a34a, 0xeab308, 0x2563eb]

function textTexture(text: string, bg: string, fg: string, w = 256, h = 96, font = 'bold 54px sans-serif') {
  return canvasTexture(w, h, (ctx, cw, ch) => {
    ctx.fillStyle = bg; ctx.fillRect(0, 0, cw, ch)
    ctx.fillStyle = fg; ctx.font = font; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'
    ctx.fillText(text, cw / 2, ch / 2 + 2)
  })
}
function labelPlate(text: string, w: number, bg = '#f8fafc', fg = '#111827') {
  const m = new THREE.Mesh(new THREE.PlaneGeometry(w, w * 0.375), new THREE.MeshStandardMaterial({ map: textTexture(text, bg, fg), roughness: 0.6 }))
  m.rotation.x = -Math.PI / 2
  return m
}
function terminalPost(color: number): THREE.Mesh {
  const h = 0.016
  const post = new THREE.Mesh(new THREE.CylinderGeometry(0.003, 0.0036, h, 16), labMaterials.brass())
  const cap = new THREE.Mesh(new THREE.CylinderGeometry(0.0048, 0.0048, 0.004, 16), new THREE.MeshStandardMaterial({ color, roughness: 0.4 }))
  cap.position.y = h / 2
  post.add(cap)
  const zone = new THREE.Mesh(new THREE.SphereGeometry(0.02, 10, 8), new THREE.MeshBasicMaterial({ visible: false }))
  post.add(zone)
  const ring = new THREE.Mesh(new THREE.TorusGeometry(0.011, 0.0022, 8, 24), new THREE.MeshBasicMaterial({ color: 0x22c55e, toneMapped: false }))
  ring.rotation.x = Math.PI / 2
  ring.position.y = -h / 2 + 0.001
  ring.visible = false
  ring.name = 'ring'
  post.add(ring)
  post.castShadow = true
  return post
}
function addTerminals(group: THREE.Group, key: string, half: number, y: number, colors: [number, number] = [0x111827, 0xdc2626]) {
  ;(['a', 'b'] as Side[]).forEach((side, i) => {
    const post = terminalPost(colors[i])
    post.position.set(side === 'a' ? -half : half, y - 0.008, 0)
    group.add(post)
    terminalMeshes.set(term(key, side), post)
  })
}
function woodBase(w: number, d: number, color = 0x7c4a2d) {
  const m = new THREE.Mesh(new RoundedBoxGeometry(w, 0.014, d, 2, 0.003), new THREE.MeshStandardMaterial({ color, roughness: 0.7 }))
  m.position.y = 0.007
  return m
}

function meterDialTexture(max: number, divisions: number, labelEvery: number, unit: string) {
  return canvasTexture(512, 300, (ctx, w, h) => {
    ctx.fillStyle = '#f8fafc'; ctx.fillRect(0, 0, w, h)
    ctx.strokeStyle = '#111827'; ctx.fillStyle = '#111827'; ctx.textAlign = 'center'
    const cx = w / 2, cy = h - 18, R = h - 64
    for (let i = 0; i <= divisions; i++) {
      const a = (-50 + (100 * i) / divisions) * Math.PI / 180
      const major = i % labelEvery === 0
      const len = major ? 30 : 14
      ctx.lineWidth = major ? 4 : 1.6
      ctx.beginPath(); ctx.moveTo(cx + R * Math.sin(a), cy - R * Math.cos(a)); ctx.lineTo(cx + (R - len) * Math.sin(a), cy - (R - len) * Math.cos(a)); ctx.stroke()
      if (major) { ctx.font = 'bold 28px sans-serif'; ctx.fillText(String(Math.round(((max * i) / divisions) * 10) / 10), cx + (R + 22) * Math.sin(a), cy - (R + 22) * Math.cos(a) + 10) }
    }
    ctx.font = 'bold 66px serif'; ctx.fillText(unit, cx, cy - 46)
  })
}

function buildMeter(key: string, slot: Slot, unit: 'A' | 'V', max: number, divisions: number, labelEvery: number): THREE.Group {
  const g = new THREE.Group()
  const isAmm = unit === 'A'
  const body = new THREE.Mesh(new RoundedBoxGeometry(0.15, 0.044, 0.1, 3, 0.006), new THREE.MeshStandardMaterial({ color: isAmm ? 0x1e3a8a : 0x7f1d1d, roughness: 0.5 }))
  body.position.y = 0.022
  // Dial on a face tilted towards the student, like a bench meter's sloping front
  const face = new THREE.Group()
  face.position.set(0, 0.0445, 0.002)
  face.rotation.x = -Math.PI / 2 + 0.35
  const dial = new THREE.Mesh(new THREE.PlaneGeometry(0.11, 0.064), new THREE.MeshStandardMaterial({ map: meterDialTexture(max, divisions, labelEvery, unit), roughness: 0.5 }))
  face.add(dial)
  const pivot = new THREE.Group()
  pivot.position.set(0, -0.028, 0.001)
  const needle = new THREE.Mesh(new THREE.BoxGeometry(0.0009, 0.05, 0.0006), new THREE.MeshBasicMaterial({ color: 0xdc2626 }))
  needle.position.y = 0.025
  pivot.add(needle)
  face.add(pivot)
  const range = labelPlate(`0-${max} ${unit}`, 0.05, isAmm ? '#1e3a8a' : '#7f1d1d', '#f8fafc')
  range.position.set(0, 0.0445, 0.043)
  g.add(body, face, range)
  addTerminals(g, key, slot.half, slot.postY)
  if (isAmm) ammNeedle = pivot
  else voltNeedle = pivot
  return g
}

let ruleOuter: THREE.Group
let ruleInner: THREE.Group
function buildRuleAndWire(room: THREE.Scene) {
  // Rule, wire, tape and clips move together. Their own coordinates are kept as before (rule along x
  // from RULE_X0, at z = RULE_Z); the inner group shifts that so the outer group pivots on the rule's centre.
  ruleOuter = new THREE.Group()
  ruleInner = new THREE.Group()
  ruleInner.position.set(-(RULE_X0 + 0.5), 0, -RULE_Z)
  ruleOuter.add(ruleInner)
  room.add(ruleOuter)
  const scene = ruleInner
  const ruleLen = 1.04
  const tex = canvasTexture(4096, 160, (ctx, w, h) => {
    ctx.fillStyle = '#f2d39a'; ctx.fillRect(0, 0, w, h)
    ctx.strokeStyle = '#1f2937'; ctx.fillStyle = '#1f2937'; ctx.textAlign = 'center'; ctx.font = 'bold 34px Arial'
    for (let mm = 0; mm <= 1000; mm += 5) {
      const x = ((0.02 + mm / 1000) / ruleLen) * w
      const len = mm % 100 === 0 ? 70 : mm % 50 === 0 ? 52 : mm % 10 === 0 ? 38 : 20
      ctx.lineWidth = mm % 100 === 0 ? 4 : 2
      ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, len); ctx.stroke()
      if (mm % 100 === 0) ctx.fillText(String(mm / 10), x, 112)
    }
    ctx.font = 'bold 26px Arial'; ctx.fillText('cm', w - 70, 140)
  })
  tex.anisotropy = 8
  const edge = new THREE.MeshStandardMaterial({ color: 0xc8955a, roughness: 0.6 })
  const face = new THREE.MeshStandardMaterial({ map: tex, roughness: 0.55 })
  const rule = new THREE.Mesh(new THREE.BoxGeometry(ruleLen, 0.008, 0.045), [edge, edge, face, edge, edge, edge])
  rule.position.set(RULE_X0 + 0.5, 0.004, RULE_Z + 0.006)
  rule.receiveShadow = true
  const ruleGroup = new THREE.Group()
  ruleGroup.add(rule)
  scene.add(ruleGroup)
  groups.set('rule', ruleGroup)

  // Bare constantan wire P stretched along the rule's top edge
  const wireGroup = new THREE.Group()
  const wire = new THREE.Mesh(new THREE.CylinderGeometry(0.0007, 0.0007, 1.04, 8), new THREE.MeshStandardMaterial({ color: 0xc0c4cc, metalness: 0.9, roughness: 0.3 }))
  wire.rotation.z = Math.PI / 2
  wire.position.set(RULE_X0 + 0.5, WIRE_Y, RULE_Z - 0.008)
  const pLabel = labelPlate('P', 0.03)
  pLabel.position.set(RULE_X0 + 0.5, 0.0085, RULE_Z + 0.042)
  wireGroup.add(wire, pLabel)
  scene.add(wireGroup)
  groups.set('wire', wireGroup)

  // Sellotape: dashed targets until each piece is stuck down
  ;(['left', 'right'] as const).forEach((side) => {
    const x = side === 'left' ? RULE_X0 - 0.012 : RULE_X0 + 1.012
    const marker = new THREE.Mesh(new THREE.BoxGeometry(0.02, 0.004, 0.05), new THREE.MeshBasicMaterial({ color: 0xf59e0b, transparent: true, opacity: 0.45, depthWrite: false }))
    marker.position.set(x, 0.011, RULE_Z + 0.004)
    scene.add(marker)
    tapeMarkers[side] = marker
    const strip = new THREE.Mesh(new THREE.BoxGeometry(0.018, 0.0012, 0.05), new THREE.MeshStandardMaterial({ color: 0xf5f0d0, transparent: true, opacity: 0.7, roughness: 0.2 }))
    strip.position.set(x, 0.0128, RULE_Z + 0.004)
    strip.visible = false
    scene.add(strip)
    tapeStrips[side] = strip
  })

  // Crocodile clips: the fixed one at 0 cm, the movable one at x
  const buildClip = (color: number) => {
    const g = new THREE.Group()
    const mat = new THREE.MeshStandardMaterial({ color, roughness: 0.45 })
    const jawTop = new THREE.Mesh(new THREE.BoxGeometry(0.008, 0.004, 0.03), labMaterials.steel())
    jawTop.position.set(0, WIRE_Y + 0.004, RULE_Z - 0.02)
    jawTop.rotation.x = 0.12
    const jawBottom = jawTop.clone()
    jawBottom.position.y = WIRE_Y - 0.002
    jawBottom.rotation.x = -0.05
    const sleeve = new THREE.Mesh(new THREE.CylinderGeometry(0.0055, 0.0065, 0.026, 12), mat)
    sleeve.rotation.x = Math.PI / 2
    sleeve.position.set(0, WIRE_Y + 0.006, RULE_Z - CLIP_TAIL + 0.004)
    g.add(jawTop, jawBottom, sleeve)
    // Lead post on the tail of the clip (its terminal)
    const post = terminalPost(color)
    post.position.set(0, 0.03 - 0.008, RULE_Z - CLIP_TAIL)
    g.add(post)
    // Generous invisible handle so the clip is easy to grab on a phone
    const handle = new THREE.Mesh(new THREE.BoxGeometry(0.03, 0.03, 0.07), new THREE.MeshBasicMaterial({ visible: false }))
    handle.position.set(0, 0.015, RULE_Z - 0.02)
    g.add(handle)
    scene.add(g)
    return { g, post }
  }
  const c1 = buildClip(0x111827)
  c1.g.position.x = RULE_X0
  terminalMeshes.set(term(K.wire.value, 'a'), c1.post)
  groups.set('clip1', c1.g)
  const c2 = buildClip(0xdc2626)
  clip2Group = c2.g
  terminalMeshes.set(term(K.wire.value, 'b'), c2.post)
  groups.set('clip2', c2.g)
}

function buildScene(scene: THREE.Scene) {
  sceneRef = scene
  buildRuleAndWire(scene)

  // Two dry cells in a double-cell holder
  const cells = new THREE.Group()
  const holder = new THREE.Mesh(new RoundedBoxGeometry(0.17, 0.03, 0.07, 2, 0.004), new THREE.MeshStandardMaterial({ color: 0x1f2937, roughness: 0.55 }))
  holder.position.y = 0.015
  cells.add(holder)
  ;[-0.035, 0.035].forEach((dx) => {
    const cell = new THREE.Mesh(new THREE.CylinderGeometry(0.0155, 0.0155, 0.062, 24), new THREE.MeshStandardMaterial({ color: 0xd61f26, roughness: 0.35 }))
    cell.rotation.z = Math.PI / 2
    cell.position.set(dx, 0.035, 0)
    const cap = new THREE.Mesh(new THREE.CylinderGeometry(0.006, 0.006, 0.006, 16), labMaterials.chrome())
    cap.rotation.z = Math.PI / 2
    cap.position.set(dx + 0.034, 0.035, 0)
    cells.add(cell, cap)
  })
  const cellsLabel = labelPlate('1.5 V + 1.5 V', 0.07, '#1f2937', '#fde68a')
  cellsLabel.position.set(0, 0.0305, 0.026)
  cells.add(cellsLabel)
  addTerminals(cells, K.cells.value, SLOTS.cells.half, SLOTS.cells.postY)
  scene.add(cells)
  groups.set(K.cells.value, cells)

  // Switch K: a knife switch on a wooden base
  switchGroup = new THREE.Group()
  const sb = woodBase(0.1, 0.04)
  const hinge = new THREE.Mesh(new THREE.BoxGeometry(0.006, 0.012, 0.012), labMaterials.brass())
  hinge.position.set(-0.026, 0.02, 0)
  const clip = hinge.clone()
  clip.position.x = 0.026
  switchLever = new THREE.Group()
  switchLever.position.set(-0.026, 0.025, 0)
  const lever = new THREE.Mesh(new THREE.BoxGeometry(0.056, 0.003, 0.008), labMaterials.chrome())
  lever.position.x = 0.028
  const knob = new THREE.Mesh(new THREE.SphereGeometry(0.0055, 12, 8), new THREE.MeshStandardMaterial({ color: 0x111827, roughness: 0.4 }))
  knob.position.x = 0.056
  switchLever.add(lever, knob)
  const kLabel = labelPlate('K', 0.024)
  kLabel.position.set(0, 0.0145, 0.014)
  const switchHandle = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.05, 0.04), new THREE.MeshBasicMaterial({ visible: false }))
  switchHandle.position.y = 0.025
  switchGroup.add(sb, hinge, clip, switchLever, kLabel, switchHandle)
  addTerminals(switchGroup, K.switch.value, SLOTS.switch.half, SLOTS.switch.postY, [0x111827, 0x111827])
  scene.add(switchGroup)
  groups.set(K.switch.value, switchGroup)

  // Torch bulb in a holder
  const bulb = new THREE.Group()
  const bb = woodBase(0.1, 0.04)
  const socket = new THREE.Mesh(new THREE.CylinderGeometry(0.008, 0.009, 0.014, 20), labMaterials.brass())
  socket.position.y = 0.021
  bulbGlass = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.05, transparent: true, opacity: 0.4, emissive: 0xffd27a, emissiveIntensity: 0, depthWrite: false })
  const glass = new THREE.Mesh(new THREE.SphereGeometry(0.011, 24, 16), bulbGlass)
  glass.scale.y = 1.3
  glass.position.y = 0.04
  bulbFilament = new THREE.MeshBasicMaterial({ color: 0x57534e })
  const filament = new THREE.Mesh(new THREE.TorusGeometry(0.0035, 0.0005, 6, 16, Math.PI), bulbFilament)
  filament.position.y = 0.039
  bulbLight = new THREE.PointLight(0xffc56e, 0, 0.6, 2)
  bulbLight.position.y = 0.045
  bulb.add(bb, socket, glass, filament, bulbLight)
  addTerminals(bulb, K.bulb.value, SLOTS.bulb.half, SLOTS.bulb.postY, [0x111827, 0x111827])
  scene.add(bulb)
  groups.set(K.bulb.value, bulb)

  const amm = buildMeter(K.ammeter.value, SLOTS.ammeter, 'A', AMP_RANGE, 50, 10)
  scene.add(amm)
  groups.set(K.ammeter.value, amm)
  const volt = buildMeter(K.voltmeter.value, SLOTS.voltmeter, 'V', VOLT_RANGE, 30, 5)
  scene.add(volt)
  groups.set(K.voltmeter.value, volt)

  // A coil of spare connecting leads at the front of the bench
  const coil = new THREE.Group()
  ;[0xdc2626, 0x111827, 0x2563eb].forEach((c, i) => {
    const t = new THREE.Mesh(new THREE.TorusGeometry(0.022 - i * 0.003, 0.0018, 8, 32), new THREE.MeshStandardMaterial({ color: c, roughness: 0.45 }))
    t.rotation.x = Math.PI / 2
    t.position.y = 0.002 + i * 0.0035
    coil.add(t)
  })
  scene.add(coil)
  groups.set('leads', coil)

  previewLine = new THREE.Line(new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(), new THREE.Vector3()]), new THREE.LineDashedMaterial({ color: 0x475569, dashSize: 0.006, gapSize: 0.004 }))
  previewLine.visible = false
  scene.add(previewLine)
}

const typeOfKey = (key: string) => props.sceneObjects.find(o => o.key === key)?.object_type
/** Which 3D group(s) each placed tray item shows. */
function syncVisibility() {
  const carriedType = carrying.value ? typeOfKey(carrying.value) : null
  const placed = new Set([...placedKeys].map(typeOfKey))
  if (carriedType && carryOnBench) placed.add(carriedType)
  const show = (name: string, type: string) => { const g = groups.get(name); if (g) g.visible = placed.has(type) }
  ruleOuter.visible = placed.has('metre_rule')
  show('rule', 'metre_rule')
  show('wire', 'constantan_wire')
  show('clip1', 'crocodile_clip')
  show('clip2', 'crocodile_clip')
  show('leads', 'wire')
  show(K.cells.value, 'cell_holder')
  show(K.switch.value, 'switch')
  show(K.bulb.value, 'torch_bulb')
  show(K.ammeter.value, 'ammeter')
  show(K.voltmeter.value, 'voltmeter')
  ;(['left', 'right'] as const).forEach((s) => {
    tapeMarkers[s].visible = phase.value === 'tape' && !taped.has(s)
    tapeStrips[s].visible = taped.has(s)
  })
}

const curveFor = (a: THREE.Vector3, b: THREE.Vector3) => {
  const p0 = a.clone().setY(a.y + 0.004)
  const p2 = b.clone().setY(b.y + 0.004)
  const p1 = p0.clone().lerp(p2, 0.5)
  p1.y = Math.max(p0.y, p2.y) + Math.min(0.06, 0.015 + p0.distanceTo(p2) * 0.08)
  return new THREE.QuadraticBezierCurve3(p0, p1, p2)
}
let leadsSignature = ''
function syncLeads() {
  const sig = `${selectedLead.value}|${clipX.value}|${JSON.stringify(poses)}|` + leads.map(l => `${l.from}-${l.to}`).join(',')
  if (sig === leadsSignature) return
  leadsSignature = sig
  // Each lead carries an invisible, wider grab zone as a child - dispose that too, or every clip
  // movement (which rebuilds the leads attached to it) would leak GPU buffers
  leadMeshes.forEach((m) => {
    sceneRef.remove(m)
    m.traverse((o) => { if (o instanceof THREE.Mesh) { o.geometry.dispose(); (o.material as THREE.Material).dispose() } })
  })
  leadMeshes.length = 0
  leads.forEach((l, i) => {
    const curve = curveFor(terminalPos(l.from), terminalPos(l.to))
    const mesh = new THREE.Mesh(
      new THREE.TubeGeometry(curve, 32, 0.0016, 8, false),
      new THREE.MeshStandardMaterial({ color: LEAD_COLORS[i % LEAD_COLORS.length], roughness: 0.45, emissive: i === selectedLead.value ? 0x6366f1 : 0x000000, emissiveIntensity: 0.8 }),
    )
    mesh.castShadow = true
    mesh.userData.leadIndex = i
    mesh.add(new THREE.Mesh(new THREE.TubeGeometry(curve, 16, 0.004, 6, false), new THREE.MeshBasicMaterial({ visible: false })))
    sceneRef.add(mesh)
    leadMeshes.push(mesh)
  })
}

function syncPoses() {
  MOVABLES.forEach((m) => {
    const g = m === 'rule' ? ruleOuter : m === 'leads' ? groups.get('leads') : groups.get(keyOfMovable(m) ?? '')
    const p = carryingMovable.value === m ? carryPose : poses[m]
    if (!g || !p) return
    g.position.set(p.x, 0, p.z)
    g.rotation.y = p.rot
  })
}

function syncScene(dt: number) {
  step(Math.min(dt, 0.1))
  syncPoses()
  syncVisibility()
  clip2Group.position.x = RULE_X0 + clipX.value
  switchLever.rotation.z += ((switchClosed.value ? 0 : 0.6) - switchLever.rotation.z) * 0.3
  bulbGlass.emissiveIntensity = brightness * 2.2
  bulbFilament.color.setHex(brightness > 0.05 ? 0xfff3c4 : 0x57534e)
  bulbLight.intensity = brightness * 0.4
  const needleAngle = (v: number, max: number) => -((-50 + 100 * Math.max(-0.04, Math.min(1.04, v / max))) * Math.PI) / 180
  ammNeedle.rotation.z = needleAngle(ampDisplay.value, AMP_RANGE)
  voltNeedle.rotation.z = needleAngle(voltDisplay.value, VOLT_RANGE)
  syncLeads()

  const wiringAllowed = canWire.value
  terminalMeshes.forEach((post, id) => {
    const ring = post.getObjectByName('ring') as THREE.Mesh
    const connected = leads.some(l => l.from === id || l.to === id)
    const isArmed = armed.value === id
    const isTarget = !!armed.value && armed.value.split(':')[0] !== id.split(':')[0]
    ring.visible = wiringAllowed && terminalAvailable(id)
    ;(ring.material as THREE.MeshBasicMaterial).color.setHex(isArmed ? 0xf59e0b : isTarget ? 0x6366f1 : problemTerminals.value.has(id) ? 0xef4444 : connected ? 0x22c55e : 0x94a3b8)
  })
  previewLine.visible = !!armed.value && !!previewPoint.value
  if (previewLine.visible) {
    const a = terminalPos(armed.value!)
    const pos = previewLine.geometry.attributes.position as THREE.BufferAttribute
    pos.setXYZ(0, a.x, a.y, a.z)
    pos.setXYZ(1, previewPoint.value!.x, a.y, previewPoint.value!.z)
    pos.needsUpdate = true
    previewLine.computeLineDistances()
  }
}

// --- Pointer interaction ----------------------------------------------------------------------------------
const hoverCursor = ref('grab')
const armed = ref<string | null>(null)
const previewPoint = ref<THREE.Vector3 | null>(null)
const benchPlane = new THREE.Plane(new THREE.Vector3(0, 1, 0), -0.03)
const clipPlane = new THREE.Plane(new THREE.Vector3(0, 1, 0), -WIRE_Y)
const hitPt = new THREE.Vector3()
const tablePlane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0)
let press: { kind: 'terminal' | 'clip' | 'body'; id: string; moved: boolean; startX: number; startY: number; mv?: Movable; offX?: number; offZ?: number } | null = null

type Target = { kind: 'terminal'; id: string } | { kind: 'lead'; index: number } | { kind: 'clip' } | { kind: 'tape'; side: 'left' | 'right' } | { kind: 'body'; mv: Movable }
/** Placed apparatus under the pointer (the whole item, for moving/rotating it). */
function pickBody(ev: PointerEvent): Movable | null {
  const list = MOVABLES.filter(m => poses[m])
    .map(m => ({ m, g: m === 'rule' ? ruleOuter : m === 'leads' ? groups.get('leads') : groups.get(keyOfMovable(m) ?? '') }))
    .filter((e): e is { m: Movable; g: THREE.Group } => !!e.g)
  const hit = pick(ev, list.map(e => e.g))
  return list.find(e => e.g === hit)?.m ?? null
}
function pickTarget(ev: PointerEvent): Target | null {
  if (phase.value === 'tape') {
    const hit = pick(ev, [tapeMarkers.left, tapeMarkers.right].filter(m => m.visible))
    if (hit) return { kind: 'tape', side: hit === tapeMarkers.left ? 'left' : 'right' }
  }
  // Terminals of apparatus not yet on the bench are hidden, but raycasting doesn't skip hidden
  // objects - so only offer the ones that are really there
  const ids = [...terminalMeshes.keys()].filter(terminalAvailable)
  const posts = ids.map(id => terminalMeshes.get(id)!)
  const tHit = pick(ev, posts)
  if (tHit) return { kind: 'terminal', id: ids[posts.indexOf(tHit as THREE.Mesh)] }
  const hit = pick(ev, [...leadMeshes, ...(placedTypes.value.has('crocodile_clip') && phase.value !== 'collect' ? [clip2Group] : [])])
  if (hit === clip2Group) return { kind: 'clip' }
  if (hit) return { kind: 'lead', index: hit.userData.leadIndex }
  const mv = pickBody(ev)
  return mv ? { kind: 'body', mv } : null
}

/** Leads can be connected once the connecting wires are on the bench - to any terminal of apparatus
 *  that has been put down (wire P's terminals are its two crocodile clips). */
const canWire = computed(() => placedTypes.value.has('wire'))
function terminalAvailable(id: string): boolean {
  const key = id.split(':')[0]
  if (key === K.wire.value) return placedTypes.value.has('crocodile_clip')
  return placedKeys.has(key)
}

const hoverLabel = ref<{ text: string; x: number; y: number } | null>(null)
function onHover(ev: PointerEvent) {
  if (press) return
  if (carrying.value && carryingMovable.value) {
    carryOnBench = pointOnPlane(ev, tablePlane, hitPt) && Math.abs(hitPt.x) < BENCH_HALF_X + 0.05 && Math.abs(hitPt.z) < BENCH_HALF_Z + 0.05
    if (carryOnBench) Object.assign(carryPose, clampPose(carryingMovable.value, hitPt.x, hitPt.z, carryPose.rot))
    hoverCursor.value = carryOnBench ? 'copy' : 'not-allowed'
    return
  }
  if (armed.value && pointOnPlane(ev, benchPlane, hitPt)) previewPoint.value = hitPt.clone()
  const t = pickTarget(ev)
  hoverCursor.value = !t ? 'grab' : t.kind === 'clip' ? 'ew-resize' : t.kind === 'body' ? 'move' : 'pointer'
  const rect = (ev.currentTarget as HTMLElement).getBoundingClientRect()
  const text = t?.kind === 'clip' ? 'Crocodile clip - drag along P to set x' : t?.kind === 'terminal' ? 'Terminal - click to connect a lead' : t?.kind === 'body' ? nameOfMovable(t.mv) : null
  hoverLabel.value = text ? { text, x: ev.clientX - rect.left, y: ev.clientY - rect.top } : null
}

function onPointerDown(ev: PointerEvent) {
  if (handleFurnitureClick(ev)) return
  if (carrying.value && !props.readOnly) {
    // Putting an item down shouldn't also start orbiting the camera
    if (room.value) { room.value.controls.enabled = false; window.addEventListener('pointerup', () => { if (room.value) room.value.controls.enabled = true }, { once: true }) }
    onHover(ev)
    dropCarried()
    return
  }
  const t = pickTarget(ev)
  if (!t) selectedItem.value = null
  if (!t || !room.value || props.readOnly) return
  room.value.controls.enabled = false
  window.addEventListener('pointermove', onDragMove)
  window.addEventListener('pointerup', onPointerUp, { once: true })

  if (t.kind === 'tape') {
    taped.add(t.side)
    if (taped.size === 2) {
      emit('action', { objectKey: K.wire.value, action: 'move', value: 'taped' })
      flash('Wire P is fixed to the rule. Now connect the circuit as shown in the setup diagram.')
    }
    return
  }
  if (t.kind === 'lead') { selectedLead.value = t.index; return }
  if (t.kind === 'body') {
    // Drag to move it anywhere on the bench; a click without moving selects it (and works switch K)
    const p = poses[t.mv]!
    const at = pointOnPlane(ev, tablePlane, hitPt) ? hitPt.clone() : new THREE.Vector3(p.x, 0, p.z)
    press = { kind: 'body', id: t.mv, mv: t.mv, moved: false, startX: ev.clientX, startY: ev.clientY, offX: p.x - at.x, offZ: p.z - at.z }
    hoverCursor.value = 'grabbing'
    return
  }
  if (t.kind === 'clip') {
    if (blockIfOn()) return
    press = { kind: 'clip', id: 'clip2', moved: false, startX: ev.clientX, startY: ev.clientY }
    hoverCursor.value = 'ew-resize'
    return
  }
  // Terminal: first click arms it, a click (or drag-release) on another component's terminal joins them
  if (!canWire.value) { flash('Take the connecting wires from the tray first.'); return }
  if (switchClosed.value) { flashWarning('Open switch K before changing the connections.'); return }
  if (!armed.value) {
    armed.value = t.id
    press = { kind: 'terminal', id: t.id, moved: false, startX: ev.clientX, startY: ev.clientY }
  } else if (armed.value.split(':')[0] === t.id.split(':')[0]) {
    armed.value = null
  } else {
    addOrToggleLead(armed.value, t.id)
    armed.value = null
  }
}

function onDragMove(ev: PointerEvent) {
  if (!press) return
  if (Math.hypot(ev.clientX - press.startX, ev.clientY - press.startY) > 6) press.moved = true
  if (press.kind === 'clip') {
    if (pointOnPlane(ev, clipPlane, hitPt)) setClip(ruleInner.worldToLocal(hitPt.clone()).x - RULE_X0)
    return
  }
  if (press.kind === 'body') {
    if (press.moved && pointOnPlane(ev, tablePlane, hitPt)) {
      const m = press.mv!
      poses[m] = clampPose(m, hitPt.x + press.offX!, hitPt.z + press.offZ!, poses[m]!.rot)
    }
    return
  }
  if (pointOnPlane(ev, benchPlane, hitPt)) previewPoint.value = hitPt.clone()
}

function onPointerUp(ev: PointerEvent) {
  window.removeEventListener('pointermove', onDragMove)
  if (room.value) room.value.controls.enabled = true
  const was = press
  press = null
  if (!was) return
  if (was.kind === 'clip') { emitLengthIfTarget(); hoverCursor.value = 'grab'; return }
  if (was.kind === 'body') {
    hoverCursor.value = 'move'
    if (!was.moved) {
      selectedItem.value = was.mv!
      if (was.mv === 'switch' && phase.value === 'experiment') toggleSwitch()
    }
    return
  }
  if (!was.moved || !armed.value) {
    if (armed.value) flash('Now click the terminal you want to connect it to.')
    return
  }
  const t = pickTarget(ev)
  if (t?.kind === 'terminal' && t.id.split(':')[0] !== armed.value.split(':')[0]) addOrToggleLead(armed.value, t.id)
  armed.value = null
  previewPoint.value = null
}

// --- Messages ---------------------------------------------------------------------------------------------
const panelOpen = ref(true)
const hint = ref<string | null>(null)
const warning = ref<string | null>(null)
function flash(text: string) { hint.value = text; setTimeout(() => { if (hint.value === text) hint.value = null }, 4000) }
function flashWarning(text: string) { warning.value = text; setTimeout(() => { if (warning.value === text) warning.value = null }, 5000) }

const HOME_POS: THREE.Vector3Tuple = [0.08, 0.98, 0.98]
const HOME_TARGET: THREE.Vector3Tuple = [0.08, 0, -0.04]
// Everything on the bench - cells to ammeter, voltmeter at the back, rule and clips at the front -
// kept on screen whatever the canvas shape. The box reaches further right than the apparatus so it
// sits clear of the Lab Bench panel.
const BENCH_DIR = new THREE.Vector3(...HOME_POS).sub(new THREE.Vector3(...HOME_TARGET)).normalize()
const APPARATUS_MIN_X = -0.6
const APPARATUS_MAX_X = 0.6
const panelEl = ref<HTMLElement | null>(null)
const trayEl = ref<HTMLElement | null>(null)
let cameraMovedByUser = false
let framedWidth = 0
/** The box the bench view frames: all the apparatus, widened on the right by however much of the
 *  canvas the Lab Bench panel covers, so nothing (e.g. the clip at x0 = 1.000 m) hides behind it. */
function benchBox(): THREE.Box3 {
  const w = room.value?.renderer.domElement.clientWidth || 1
  // The tray (while collecting) covers the left of the canvas and the Lab Bench panel the right
  const left = phase.value === 'collect' && trayEl.value ? trayEl.value.offsetWidth + 16 : 0
  const right = panelOpen.value && phase.value !== 'collect' ? (panelEl.value?.offsetWidth ?? 280) + 16 : 0
  const free = Math.max(0.4, 1 - (left + right) / w)
  const span = (APPARATUS_MAX_X - APPARATUS_MIN_X) / free
  const minX = APPARATUS_MIN_X - span * (left / w)
  return new THREE.Box3(new THREE.Vector3(minX, 0, -0.32), new THREE.Vector3(minX + span, 0.07, 0.3))
}
function frameBench(animate = false) {
  const r = room.value
  if (!r) return
  cameraMovedByUser = false
  framedWidth = r.renderer.domElement.clientWidth
  r.fitBox(benchBox(), 0.94, { dir: BENCH_DIR, animate })
}
watch([panelOpen, phase], () => nextTick(() => { if (!cameraMovedByUser) frameBench(true) }))
watch(phase, (ph) => { if (ph === 'experiment') window.setTimeout(announceWiring, 900) })
let resizeObserver: ResizeObserver | null = null
const { room, unsupported, pick, pointOnPlane, handleFurnitureClick } = useLabScene(
  { cameraPosition: HOME_POS, target: HOME_TARGET, minDistance: 0.18, maxDistance: 12, cupboard: true, wallCabinets: true, shelfCatalog: () => props.objectCatalog, benchLength: 3 },
  (r) => {
    buildScene(r.scene)
    r.onFrame(syncScene)
    frameBench()
    // Only a real orbit/zoom counts as the student moving the camera - a plain click on the bench
    // (e.g. putting an item down) also fires the controls' start/end events
    let camAtStart: THREE.Vector3 | null = null
    r.controls.addEventListener('start', () => { camAtStart = r.camera.position.clone() })
    r.controls.addEventListener('end', () => { if (camAtStart && r.camera.position.distanceTo(camAtStart) > 1e-3) cameraMovedByUser = true; camAtStart = null })
    // Full screen, the steps drawer and device rotation all change how much the panel covers
    resizeObserver = new ResizeObserver(() => {
      const w = r.renderer.domElement.clientWidth
      if (!cameraMovedByUser && w && Math.abs(w - framedWidth) > framedWidth * 0.05) frameBench()
    })
    resizeObserver.observe(r.renderer.domElement)
    if (!props.readOnly) flash('Pick the apparatus you need from the tray and put each piece down on the bench - leave out anything this practical does not use.')
  },
)

// Every role starts with an empty bench and picks the apparatus from the tray - including admin review
// (forcePlaced is ignored here), since choosing and laying out the apparatus is part of this practical.
onMounted(() => {
  window.addEventListener('keydown', onKey)
  // A template may still put an item on the bench from the start (in_tray: false)
  props.sceneObjects.forEach((o) => {
    if (o.in_tray !== false || o.props?.distractor) return
    placedKeys.add(o.key)
    const m = MOVABLE_OF_TYPE[o.object_type]
    if (m) poses[m] = clampPose(m, o.position?.x ?? 0, o.position?.z ?? 0, 0)
  })
})
onBeforeUnmount(() => {
  window.removeEventListener('pointermove', onDragMove)
  window.removeEventListener('pointerup', onPointerUp)
  window.clearTimeout(nudgeTimer)
  window.removeEventListener('keydown', onKey)
  resizeObserver?.disconnect()
})

function setObjectState(_key: string, _patch: Record<string, any>) {
  // This bench owns switch K: the page echoes each switch action back, but the echoes are checked one
  // at a time and can arrive after the student has already flipped K again - applying them would undo
  // the student's own click. So echoes are ignored.
}

function goToView(view: CameraView) {
  const r = room.value
  if (!r) return
  if (view === 'bench') frameBench(true)
  else if (view === 'entrance') r.flyTo(new THREE.Vector3(2.4, 0.95, 2.4), new THREE.Vector3(0, 0.25, 7))
  else if (view === 'left') r.flyTo(new THREE.Vector3(-1.2, 1.0, 1.6), new THREE.Vector3(-7, 0.45, 1.6))
  else r.flyTo(new THREE.Vector3(1.2, 1.0, 1.6), new THREE.Vector3(7, 0.45, 1.6))
}

defineExpose({ setObjectState, goToView })
</script>
