<template>
  <div class="relative w-full h-full rounded-xl overflow-hidden bg-gradient-to-b from-slate-200 to-slate-300 dark:from-slate-800 dark:to-slate-900">
    <div ref="canvasHost" class="w-full h-full"></div>

    <!-- Apparatus tray - apparatus this experiment needs that hasn't been placed on the bench
         yet. Left-docked so it never collides with the top-center armed-mode banner on desktop;
         on mobile that banner goes full-width, so the tray drops below it instead of overlapping. -->
    <div
      v-if="trayItems.length > 0"
      class="absolute left-2 sm:left-3 sm:top-3 max-w-[8.5rem] sm:max-w-[10rem] bg-white/95 dark:bg-gray-800/95 backdrop-blur rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-2.5"
      :class="armedAction || pouring ? 'top-16 sm:top-3' : 'top-2 sm:top-3'"
    >
      <p class="text-[10px] font-bold uppercase tracking-wide text-gray-400 dark:text-gray-500 mb-1.5 px-0.5">Apparatus Tray</p>
      <div class="space-y-1">
        <button
          v-for="item in trayItems"
          :key="item.key"
          @click="placeFromTray(item.key)"
          class="w-full flex items-center gap-1.5 px-2 py-1.5 text-xs font-medium rounded-lg bg-gray-50 dark:bg-gray-900/40 text-gray-700 dark:text-gray-200 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors text-left"
        >
          <span>{{ catalogByType().get(item.object_type)?.icon || '🔬' }}</span>
          <span class="truncate">{{ catalogByType().get(item.object_type)?.display_name || item.object_type }}</span>
        </button>
      </div>
    </div>

    <!-- Selection / action toolbar -->
    <div v-if="selectedKey && !armedAction" class="absolute left-2 right-2 bottom-2 sm:left-3 sm:right-auto sm:bottom-3 bg-white/95 dark:bg-gray-800/95 backdrop-blur rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-3 sm:max-w-[min(20rem,calc(100vw-1.5rem))]">
      <div class="flex items-center justify-between gap-2 mb-2">
        <p class="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide truncate">{{ selectedDisplayName }}</p>
        <button @click="deselect" class="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 text-xs leading-none">✕</button>
      </div>
      <div class="flex flex-wrap gap-1.5">
        <button
          v-for="act in selectedActions"
          :key="act"
          @click="handleActionButton(act)"
          class="px-2.5 py-1.5 sm:py-1 text-xs font-semibold rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 active:scale-95 transition-transform"
        >
          {{ actionLabel(act) }}
        </button>
      </div>

      <!-- Real, simulation-derived reading - never free-typed. -->
      <div v-if="measurePromptFor && measureMode === 'readonly'" class="mt-3 pt-3 border-t border-gray-100 dark:border-gray-700">
        <p class="text-[11px] font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wide mb-1">Reading</p>
        <div class="flex items-center gap-2">
          <span class="flex-1 text-lg font-bold text-gray-900 dark:text-white">{{ measureReading }}<span class="text-xs font-medium text-gray-400 ml-1">{{ measureUnit }}</span></span>
          <button @click="confirmMeasure" class="flex-shrink-0 px-2.5 py-1.5 sm:py-1 text-xs font-semibold rounded-lg bg-emerald-600 text-white hover:bg-emerald-700">Record</button>
        </div>
      </div>

      <!-- Bounded slider fallback for instruments without a dedicated simulation - still a real
           constrained scale, never an arbitrary typed number. -->
      <div v-if="measurePromptFor && measureMode === 'slider'" class="mt-3 pt-3 border-t border-gray-100 dark:border-gray-700">
        <p class="text-[11px] font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wide mb-1">Reading: {{ Math.round(measureSliderValue) }}{{ measureUnit }}</p>
        <input v-model.number="measureSliderValue" type="range" min="0" :max="measureSliderMax" step="1" class="w-full accent-emerald-600">
        <button @click="confirmMeasure" class="mt-2 w-full px-2.5 py-1.5 sm:py-1 text-xs font-semibold rounded-lg bg-emerald-600 text-white hover:bg-emerald-700">Record</button>
      </div>

      <!-- Battery voltage picker - a free, unscored adjustment purely for realism; not logged as
           an action, doesn't affect grading (what a step actually requires is unaffected). -->
      <div v-if="selectedObjectType === 'battery'" class="mt-3 pt-3 border-t border-gray-100 dark:border-gray-700">
        <p class="text-[11px] font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wide mb-1.5">Cell Voltage</p>
        <div class="flex flex-wrap gap-1.5">
          <button
            v-for="v in [1.5, 3, 6, 9, 12]"
            :key="v"
            @click="pickBatteryVoltage(v)"
            class="px-2.5 py-1.5 sm:py-1 text-xs font-semibold rounded-lg border transition-colors"
            :class="batteryVoltage === v ? 'bg-emerald-600 text-white border-emerald-600' : 'bg-white dark:bg-gray-700 text-gray-600 dark:text-gray-300 border-gray-300 dark:border-gray-600'"
          >{{ v }}V</button>
        </div>
      </div>

      <!-- Stopwatch - live display, plus Reset which (unlike Start/Stop) isn't logged as an
           action since it doesn't represent a lab procedure step, just clearing the timer. -->
      <div v-if="selectedObjectType === 'stopwatch'" class="mt-3 pt-3 border-t border-gray-100 dark:border-gray-700">
        <p class="text-[11px] font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wide mb-1.5">Elapsed: {{ stopwatchDisplayText }}</p>
        <button @click="resetStopwatch(selectedKey!)" class="px-2.5 py-1.5 sm:py-1 text-xs font-semibold rounded-lg border border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700">Reset</button>
      </div>

      <!-- Microscope - illumination reuses the generic switch buttons above; lens and focus need
           a real value, so they get their own controls here rather than a generic toolbar click. -->
      <div v-if="selectedObjectType === 'microscope'" class="mt-3 pt-3 border-t border-gray-100 dark:border-gray-700 space-y-2.5">
        <div v-if="!microscopeHasSlideDisplay" class="text-[11px] text-amber-600 dark:text-amber-400">Place a specimen slide on the stage first.</div>
        <template v-else>
          <div>
            <p class="text-[11px] font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wide mb-1.5">Objective Lens</p>
            <div class="flex gap-1.5">
              <button v-for="m in [40, 100, 400]" :key="m" @click="pickObjective(m)"
                class="px-2.5 py-1.5 sm:py-1 text-xs font-semibold rounded-lg border transition-colors"
                :class="microscopeObjectiveDisplay === m ? 'bg-emerald-600 text-white border-emerald-600' : 'bg-white dark:bg-gray-700 text-gray-600 dark:text-gray-300 border-gray-300 dark:border-gray-600'"
              >&times;{{ m }}</button>
            </div>
          </div>
          <div>
            <p class="text-[11px] font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wide mb-1">Coarse Focus: {{ Math.round(microscopeFocusDisplay) }}</p>
            <input :value="microscopeFocusDisplay" @change="setCoarseFocus(Number(($event.target as HTMLInputElement).value))" type="range" min="0" max="100" step="10" class="w-full accent-indigo-600">
          </div>
          <div class="flex items-center justify-between">
            <p class="text-[11px] font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wide">Fine Focus</p>
            <div class="flex gap-1.5">
              <button @click="nudgeFineFocus(-1)" class="w-7 h-7 text-sm font-bold rounded-lg border border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700">-</button>
              <button @click="nudgeFineFocus(1)" class="w-7 h-7 text-sm font-bold rounded-lg border border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700">+</button>
            </div>
          </div>
          <div v-if="microscopeLitDisplay" class="pt-1">
            <p class="text-[11px] font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wide mb-1.5 text-center">Eyepiece View</p>
            <div class="relative w-24 h-24 mx-auto rounded-full overflow-hidden border-4 border-gray-800 bg-black">
              <div class="absolute inset-0 flex items-center justify-center" :style="{ filter: `blur(${MICROSCOPE_BLUR_PX[microscopeQualityDisplay]}px)` }">
                <div class="w-16 h-16 rounded-full" style="background: radial-gradient(circle at 30% 30%, #86efac 0 8px, transparent 9px), radial-gradient(circle at 60% 55%, #4ade80 0 10px, transparent 11px), radial-gradient(circle at 45% 70%, #22c55e 0 6px, transparent 7px), #bbf7d0;"></div>
              </div>
            </div>
            <p class="text-center text-[11px] mt-1 text-gray-500 dark:text-gray-400 capitalize">{{ microscopeQualityDisplay.replace('_', ' ') }} &middot; &times;{{ microscopeObjectiveDisplay }}</p>
          </div>
        </template>
      </div>

      <!-- Hooke's Law spring - the load is whatever mass pieces are actually attached; extension
           is read via the ruler (or here directly), never typed. -->
      <div v-if="selectedObjectType === 'spring'" class="mt-3 pt-3 border-t border-gray-100 dark:border-gray-700">
        <p class="text-[11px] font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wide mb-1">Attached Load: {{ springLoadDisplay }} g &middot; Extension: {{ springExtensionDisplay }} cm</p>
        <p v-if="springExceededDisplay" class="text-[11px] text-red-500 dark:text-red-400 mt-1">Beyond the spring's safe extension limit.</p>
      </div>

      <!-- Protractor - two explicit angle choices, since the same click on the mirror/glass block
           could mean either the incoming or the outgoing ray depending on what's being verified. -->
      <div v-if="selectedObjectType === 'protractor'" class="mt-3 pt-3 border-t border-gray-100 dark:border-gray-700">
        <p class="text-[11px] font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wide mb-1.5">Measure</p>
        <div class="flex flex-wrap gap-1.5">
          <button @click="armProtractorMeasure('incidence')"
            class="px-2.5 py-1.5 sm:py-1 text-xs font-semibold rounded-lg border transition-colors"
            :class="measureAngleMode === 'incidence' && armedAction === 'measure' ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white dark:bg-gray-700 text-gray-600 dark:text-gray-300 border-gray-300 dark:border-gray-600'"
          >Angle of Incidence</button>
          <button @click="armProtractorMeasure('outgoing')"
            class="px-2.5 py-1.5 sm:py-1 text-xs font-semibold rounded-lg border transition-colors"
            :class="measureAngleMode === 'outgoing' && armedAction === 'measure' ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white dark:bg-gray-700 text-gray-600 dark:text-gray-300 border-gray-300 dark:border-gray-600'"
          >Angle of Reflection / Refraction</button>
        </div>
      </div>
    </div>

    <!-- Armed-mode banner -->
    <div v-if="armedAction && !pouring" class="absolute left-2 right-2 sm:left-1/2 sm:right-auto sm:-translate-x-1/2 top-2 sm:top-3 bg-amber-500 text-white text-xs sm:text-sm font-medium px-3.5 sm:px-4 py-2 rounded-2xl sm:rounded-full shadow-lg flex flex-wrap items-center justify-center gap-2 sm:gap-3 sm:max-w-[calc(100vw-1.5rem)]">
      <span class="text-center">{{ armedBannerText }}</span>
      <span class="flex items-center gap-2 flex-shrink-0">
        <button v-if="armedAction === 'move' || armedAction === 'rotate'" @click="commitArmedManipulation" class="px-2.5 py-1 sm:py-0.5 text-xs font-semibold bg-white text-amber-700 rounded-full active:scale-95 transition-transform">Done</button>
        <button @click="cancelArmed" class="px-2.5 py-1 sm:py-0.5 text-xs font-semibold bg-black/20 rounded-full active:scale-95 transition-transform">Cancel</button>
      </span>
    </div>

    <!-- Live pouring control - the amount is chosen interactively and both containers' liquid
         levels update in real time, rather than the pour completing instantly on click. -->
    <div v-if="pouring" class="absolute left-2 right-2 sm:left-1/2 sm:right-auto sm:-translate-x-1/2 sm:w-80 top-2 sm:top-3 bg-white/95 dark:bg-gray-800/95 backdrop-blur rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-3.5">
      <p class="text-xs font-semibold text-gray-600 dark:text-gray-300 mb-2">Pouring {{ pouring.fromLabel }} &rarr; {{ pouring.toLabel }}</p>
      <p class="text-lg font-bold text-gray-900 dark:text-white mb-1">{{ Math.round(pouring.amount) }} <span class="text-xs font-medium text-gray-400">ml</span></p>
      <input v-model.number="pouring.amount" type="range" min="0" :max="pouring.max" step="1" class="w-full accent-indigo-600">
      <div class="flex items-center gap-2 mt-2">
        <button @click="cancelPouring" class="flex-1 px-2.5 py-1.5 text-xs font-semibold rounded-lg border border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300">Cancel</button>
        <button @click="finishPouring" class="flex-1 px-2.5 py-1.5 text-xs font-semibold rounded-lg bg-indigo-600 text-white hover:bg-indigo-700">Stop Pouring</button>
      </div>
    </div>

    <!-- Warning feedback - ruler alignment or a circuit problem (open switch, wrong wiring, short) -->
    <transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0 -translate-y-1"
      leave-active-class="transition duration-150 ease-in"
      leave-to-class="opacity-0"
    >
      <div v-if="warningToast" class="absolute left-2 right-2 sm:left-1/2 sm:right-auto sm:-translate-x-1/2 bottom-16 sm:bottom-3 bg-red-500 text-white text-xs sm:text-sm font-medium px-4 py-2.5 rounded-2xl shadow-lg text-center sm:max-w-[calc(100vw-1.5rem)]">
        {{ warningToast }}
      </div>
    </transition>

    <!-- Inspect popover -->
    <div v-if="inspectText" class="absolute left-2 right-2 top-2 sm:left-auto sm:right-3 sm:top-3 sm:max-w-[min(20rem,calc(100vw-1.5rem))] bg-white/95 dark:bg-gray-800/95 backdrop-blur rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-3">
      <div class="flex items-start justify-between gap-2">
        <p class="text-xs text-gray-700 dark:text-gray-200">{{ inspectText }}</p>
        <button @click="inspectText = null" class="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 text-xs leading-none">✕</button>
      </div>
    </div>

    <p class="hidden sm:block absolute right-3 bottom-3 text-[10px] text-gray-500 dark:text-gray-400 bg-white/70 dark:bg-gray-900/60 rounded px-2 py-1 pointer-events-none">
      Drag to orbit &middot; Scroll to zoom &middot; Click equipment to interact
    </p>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch } from 'vue'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { createObjectMesh, createConnectionLine, voltageSpriteTexture, digitalDisplayTexture } from './labObjectFactory'
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

const canvasHost = ref<HTMLDivElement | null>(null)
let renderer: THREE.WebGLRenderer
let scene: THREE.Scene
let camera: THREE.PerspectiveCamera
let controls: OrbitControls
let raf = 0
let resizeObserver: ResizeObserver | null = null

const groups = new Map<string, THREE.Group>()
const raycaster = new THREE.Raycaster()
const pointerNdc = new THREE.Vector2()
const groundPlane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0)

const selectedKey = ref<string | null>(null)
const armedAction = ref<LabAction | null>(null)
const inspectText = ref<string | null>(null)
const measurePromptFor = ref<string | null>(null)
let dragging = false
let rotateStartX = 0

const ACTION_LABELS: Record<LabAction, string> = {
  move: 'Move', rotate: 'Rotate', connect: 'Connect', pour: 'Pour', heat: 'Heat',
  measure: 'Measure', switch_on: 'Switch On', switch_off: 'Switch Off', zoom: 'Zoom', inspect: 'Inspect', acknowledge: 'Acknowledge',
  focus_coarse: 'Coarse Focus', focus_fine: 'Fine Focus', select_objective: 'Select Lens',
}
const actionLabel = (a: LabAction) => {
  // A stopwatch reuses the generic switch_on/switch_off/measure vocabulary rather than adding
  // new action types just for it - relabel the buttons to read naturally for a timer. Likewise a
  // microscope reuses switch_on/off for its illumination lamp, and 'inspect' doubles as "observe
  // through the eyepiece" once a slide is loaded.
  if (selectedObjectType.value === 'stopwatch') {
    if (a === 'switch_on') return 'Start'
    if (a === 'switch_off') return 'Stop'
    if (a === 'measure') return 'Read Time'
  }
  if (selectedObjectType.value === 'microscope') {
    if (a === 'switch_on') return 'Light On'
    if (a === 'switch_off') return 'Light Off'
    if (a === 'inspect') return 'Observe'
  }
  return ACTION_LABELS[a] || a
}

const catalogByType = () => new Map(props.objectCatalog.map(o => [o.object_type, o]))

const selectedActions = ref<LabAction[]>([])
const selectedDisplayName = ref('')
const selectedObjectType = ref<string | null>(null)
const batteryVoltage = ref<number | null>(null)

// --- Real-measurement simulation state ---------------------------------------------------
// A container's actual ml (not a fixed decorative fill level) - what a "measure" on it reads
// back, and what a "pour" transfers between two of these. Objects with a tracked volume.
const LIQUID_CONTAINER_TYPES = ['beaker', 'test_tube', 'burette', 'measuring_cylinder', 'water_container']
const containerVolumes = new Map<string, number>()
const batteryVoltages = new Map<string, number>()
const switchStates = new Map<string, 'on' | 'off'>()
const heatingStarted = new Map<string, number>()
const liveConnections = ref<{ from: string; to: string }[]>([...(props.connections || [])])
const ALIGN_THRESHOLD = 0.9

const measureMode = ref<'readonly' | 'slider' | null>(null)
const measureReading = ref<number | null>(null)
const measureUnit = ref('')
const measureSliderValue = ref(0)
const measureSliderMax = ref(100)
const measureTargetPickerFor = ref<'ruler' | 'thermometer' | 'protractor' | null>(null)
const measureIsSafetyIssue = ref(false)
const measureTargetKey = ref<string | null>(null)
const measureAngleMode = ref<'incidence' | 'outgoing' | null>(null)
const warningToast = ref<string | null>(null)

// --- Microscope ------------------------------------------------------------------------------
// focus_position is a 0-100 scale; a slide's optimal_focus/focus_tolerance (authored on the slide
// object's props) define where "in focus" actually is - never revealed directly, only through the
// blur/sharpness of what the student observes.
const slidePlacements = new Map<string, string>()
const microscopeFocus = new Map<string, number>()
const microscopeObjective = new Map<string, number>()
// Mirrors the currently-selected microscope's live state into the panel - Maps themselves aren't
// reactive, so these refs are what the template actually reads (same pattern as stopwatchDisplayText).
const microscopeFocusDisplay = ref(50)
const microscopeObjectiveDisplay = ref(40)
const microscopeQualityDisplay = ref<'very_blurred' | 'blurred' | 'almost_focused' | 'focused'>('very_blurred')
const microscopeLitDisplay = ref(false)
const microscopeHasSlideDisplay = ref(false)

// --- Hooke's Law spring ------------------------------------------------------------------------
// springKey -> the set of mass_piece keys currently attached (stacked loads accumulate, unlike
// balance's single-item placement) - extension is derived from their real combined mass, F = kx.
const springLoad = new Map<string, Set<string>>()
const springExtension = new Map<string, number>()
const springPermanentDeformCm = new Map<string, number>()
const springExtensionDisplay = ref(0)
const springLoadDisplay = ref(0)
const springExceededDisplay = ref(false)

// --- Optics (reflection/refraction) -----------------------------------------------------------
let rayVisuals: THREE.Object3D[] = []
const MICROSCOPE_BLUR_PX: Record<string, number> = { very_blurred: 10, blurred: 5, almost_focused: 2, focused: 0 }

function armProtractorMeasure(mode: 'incidence' | 'outgoing') {
  measureAngleMode.value = mode
  measureTargetPickerFor.value = 'protractor'
  armedAction.value = 'measure'
}

const pouring = ref<{ from: string; to: string; amount: number; max: number; fromLabel: string; toLabel: string; fromTracked: boolean } | null>(null)

// --- Apparatus tray -----------------------------------------------------------------------
// Objects authored with in_tray:true stay off the bench until the student explicitly places
// them - existing experiments never set this flag, so they're placed immediately exactly as
// before (fully backward compatible).
const trayItems = ref<SceneObjectConfig[]>([])

function placeObject(cfg: SceneObjectConfig) {
  const def = catalogByType().get(cfg.object_type)
  const merged = { ...(def?.default_props || {}), ...(cfg.props || {}) }
  const group = createObjectMesh(cfg.object_type, cfg.key, def?.display_name || cfg.object_type, merged)
  group.position.set(cfg.position.x, cfg.position.y, cfg.position.z)
  if (cfg.rotation) group.rotation.y = cfg.rotation.y
  scene.add(group)
  groups.set(cfg.key, group)

  if (LIQUID_CONTAINER_TYPES.includes(cfg.object_type)) {
    const vol = initialVolume(cfg.object_type, merged)
    containerVolumes.set(cfg.key, vol)
    setLiquidLevel(cfg.key, vol / Number(merged.capacity_ml ?? 250))
  }
  if (cfg.object_type === 'battery') {
    batteryVoltages.set(cfg.key, Number(merged.voltage ?? 6))
  }
}

/** Picking an apparatus item off the tray and placing it on the bench - itself a real "move"
 *  action a step can require (target_object_key matching the item's own key). */
function placeFromTray(key: string) {
  if (props.readOnly) return
  const idx = trayItems.value.findIndex(o => o.key === key)
  if (idx === -1) return
  const cfg = trayItems.value[idx]
  placeObject(cfg)
  trayItems.value.splice(idx, 1)
  emit('action', { objectKey: key, action: 'move', value: key })
}

function mergedProps(key: string): Record<string, any> {
  const cfg = props.sceneObjects.find(o => o.key === key)
  if (!cfg) return {}
  const def = catalogByType().get(cfg.object_type)
  return { ...(def?.default_props || {}), ...(cfg.props || {}) }
}

function initialVolume(objectType: string, mergedP: Record<string, any>): number {
  if (mergedP.current_volume !== undefined) return Number(mergedP.current_volume)
  if (objectType === 'water_container' || objectType === 'burette') return Number(mergedP.capacity_ml ?? 50)
  return 0
}

function setLiquidLevel(key: string, fraction: number) {
  const group = groups.get(key)
  if (!group) return
  const f = Math.max(0.001, Math.min(1, fraction))
  group.traverse((child) => {
    if (child instanceof THREE.Mesh && child.userData.role === 'liquid') {
      const maxH = child.userData.maxFillHeight as number
      child.scale.y = f
      child.position.y = (maxH * f) / 2
    }
  })
}

/**
 * Only models a single series loop (one battery, one switch, one resistor, one meter) - enough
 * for Ohm's Law and similar simple-circuit practicals. Ammeter/voltmeter readings are 0 unless
 * the loop is actually closed (all four connected in one component) and the switch is on, so the
 * reading genuinely depends on what the student wired up and the voltage they picked, rather
 * than being a fixed number.
 */
function connectedComponent(startKey: string): Set<string> {
  const visited = new Set<string>([startKey])
  const queue = [startKey]
  while (queue.length) {
    const cur = queue.shift()!
    liveConnections.value.forEach((c) => {
      if (c.from === cur && !visited.has(c.to)) { visited.add(c.to); queue.push(c.to) }
      if (c.to === cur && !visited.has(c.from)) { visited.add(c.from); queue.push(c.from) }
    })
  }
  return visited
}

/**
 * Same single-series-loop model as before, but now explains *why* a reading is 0 instead of just
 * returning 0 - the specific feedback ("close the switch", "connect the ammeter in series") is
 * what actually teaches circuit troubleshooting, not just a blank/zero meter.
 */
function circuitDiagnosis(instrumentKey: string): { value: number; reason: string | null } {
  const battery = props.sceneObjects.find(o => o.object_type === 'battery')
  const switchObj = props.sceneObjects.find(o => o.object_type === 'switch')
  const resistor = props.sceneObjects.find(o => o.object_type === 'resistor')
  const instrumentCfg = props.sceneObjects.find(o => o.key === instrumentKey)
  if (!instrumentCfg) return { value: 0, reason: null }
  if (!battery || !switchObj || !resistor) {
    return { value: 0, reason: 'The circuit is incomplete. Check your connections.' }
  }

  const component = connectedComponent(battery.key)
  const hasSwitch = component.has(switchObj.key)
  const hasResistor = component.has(resistor.key)
  const hasInstrument = component.has(instrumentKey)
  const switchOn = switchStates.get(switchObj.key) === 'on'

  if (hasSwitch && switchOn && !hasResistor) {
    return { value: 0, reason: '⚠️ Short circuit! Connect a resistor into the circuit before closing the switch.' }
  }
  if (!hasSwitch || !hasResistor) {
    return { value: 0, reason: 'The circuit is incomplete. Check your connections.' }
  }
  if ((switchStates.get(battery.key) ?? 'on') === 'off') {
    return { value: 0, reason: 'Switch on the power supply.' }
  }
  if (!switchOn) {
    return { value: 0, reason: 'Close the switch before taking the reading.' }
  }
  if (!hasInstrument) {
    if (instrumentCfg.object_type === 'ammeter') {
      return { value: 0, reason: 'The ammeter should be connected in series with the circuit.' }
    }
    if (instrumentCfg.object_type === 'voltmeter') {
      return { value: 0, reason: 'The voltmeter should be connected in parallel across the component being measured.' }
    }
    return { value: 0, reason: 'Check the circuit arrangement.' }
  }

  const voltage = batteryVoltages.get(battery.key) ?? mergedProps(battery.key).voltage ?? 6
  const resistance = mergedProps(resistor.key).resistance_ohm ?? 10
  const current = voltage / resistance

  if (instrumentCfg.object_type === 'ammeter') return { value: Math.round(current * 100) / 100, reason: null }
  if (instrumentCfg.object_type === 'voltmeter') return { value: voltage, reason: null }
  return { value: 0, reason: null }
}

function simulatedTemperature(targetKey: string): number {
  const start = heatingStarted.get(targetKey)
  if (!start) return 25
  const elapsedSec = (Date.now() - start) / 1000
  const RAMP_RATE = 3.5
  return Math.min(100, Math.round(25 + elapsedSec * RAMP_RATE))
}

function rulerReading(rulerKey: string, targetKey: string): { ok: boolean; value?: number } {
  const rulerGroup = groups.get(rulerKey)
  const targetGroup = groups.get(targetKey)
  if (!rulerGroup || !targetGroup) return { ok: false }
  if (rulerGroup.position.distanceTo(targetGroup.position) > ALIGN_THRESHOLD) return { ok: false }
  // A spring's length changes live with its real attached load - read that instead of its static
  // natural_length_cm prop when one has been established (i.e. the spring has been loaded at least
  // once, even with 0g, so the natural-length reading before any mass is added is also real).
  const lengthCm = springExtension.has(targetKey)
    ? Number(mergedProps(targetKey).natural_length_cm ?? 15) + (springExtension.get(targetKey) ?? 0)
    : (mergedProps(targetKey).length_cm ?? mergedProps(targetKey).natural_length_cm ?? 10)
  const noise = (Math.random() - 0.5) * 0.2
  return { ok: true, value: Math.round((lengthCm + noise) * 10) / 10 }
}

// --- Microscope focus/magnification simulation ------------------------------------------------
function microscopeFocusQuality(microscopeKey: string): 'very_blurred' | 'blurred' | 'almost_focused' | 'focused' {
  const slideKey = slidePlacements.get(microscopeKey)
  if (!slideKey) return 'very_blurred'
  const optimal = Number(mergedProps(slideKey).optimal_focus ?? 50)
  const baseTolerance = Number(mergedProps(slideKey).focus_tolerance ?? 6)
  // Higher magnification has a shallower depth of field - a focus that reads "focused" at x40
  // genuinely needs to be re-checked at x400, exactly like a real microscope.
  const objective = microscopeObjective.get(microscopeKey) ?? 40
  const tolerance = baseTolerance * (40 / objective)
  const pos = microscopeFocus.get(microscopeKey) ?? 0
  const diff = Math.abs(pos - optimal)
  if (diff <= tolerance) return 'focused'
  if (diff <= tolerance * 2) return 'almost_focused'
  if (diff <= tolerance * 4) return 'blurred'
  return 'very_blurred'
}

/** Refreshes the panel refs for whichever microscope is currently selected - a no-op for every
 *  other selection, matching the stopwatch/balance display-ref pattern used elsewhere. */
function updateMicroscopeDisplay(key: string) {
  if (selectedKey.value !== key) return
  microscopeFocusDisplay.value = microscopeFocus.get(key) ?? 50
  microscopeObjectiveDisplay.value = microscopeObjective.get(key) ?? 40
  microscopeLitDisplay.value = switchStates.get(key) === 'on'
  microscopeHasSlideDisplay.value = slidePlacements.has(key)
  microscopeQualityDisplay.value = microscopeFocusQuality(key)
}

function pickObjective(value: number) {
  if (!selectedKey.value) return
  microscopeObjective.set(selectedKey.value, value)
  emit('action', { objectKey: selectedKey.value, action: 'select_objective', value: String(value) })
  updateMicroscopeDisplay(selectedKey.value)
}

function setCoarseFocus(value: number) {
  if (!selectedKey.value) return
  microscopeFocus.set(selectedKey.value, value)
  emit('action', { objectKey: selectedKey.value, action: 'focus_coarse', value: String(Math.round(value)) })
  updateMicroscopeDisplay(selectedKey.value)
}

function nudgeFineFocus(delta: number) {
  if (!selectedKey.value) return
  const key = selectedKey.value
  const next = Math.max(0, Math.min(100, (microscopeFocus.get(key) ?? 50) + delta))
  microscopeFocus.set(key, next)
  emit('action', { objectKey: key, action: 'focus_fine', value: String(next) })
  updateMicroscopeDisplay(key)
}

// --- Hooke's Law spring --------------------------------------------------------------------
/** F = kx (with the load's real weight, mg) - recomputed from the actual set of mass pieces
 *  currently attached, so the spring's visible length always matches the real load, never a typed
 *  or preset value. Exceeding max_safe_extension_cm leaves a small permanent deformation once, the
 *  optional "doesn't spring back perfectly" mechanic the brief allows. */
function updateSpringExtension(springKey: string) {
  const attached = springLoad.get(springKey) ?? new Set<string>()
  const totalMassG = [...attached].reduce((sum, k) => sum + Number(mergedProps(k).mass_g ?? 0), 0)
  const k = Number(mergedProps(springKey).spring_constant_n_per_m ?? 40)
  const forceN = (totalMassG / 1000) * 9.8
  const rawExtensionCm = (forceN / k) * 100
  const maxSafeCm = Number(mergedProps(springKey).max_safe_extension_cm ?? 12)
  const priorDeform = springPermanentDeformCm.get(springKey) ?? 0
  const exceeded = rawExtensionCm > maxSafeCm
  if (exceeded && priorDeform === 0) {
    springPermanentDeformCm.set(springKey, (rawExtensionCm - maxSafeCm) * 0.3)
  }
  const extensionCm = rawExtensionCm + (springPermanentDeformCm.get(springKey) ?? 0)
  springExtension.set(springKey, Math.round(extensionCm * 100) / 100)
  updateSpringVisual(springKey, extensionCm)

  if (selectedKey.value === springKey) {
    springLoadDisplay.value = totalMassG
    springExtensionDisplay.value = Math.round(extensionCm * 100) / 100
    springExceededDisplay.value = exceeded
  }
  return { totalMassG, exceeded }
}

function updateSpringVisual(springKey: string, extensionCm: number) {
  const group = groups.get(springKey)
  if (!group) return
  group.traverse((child) => {
    if (child instanceof THREE.Mesh && child.userData.role === 'spring_body') {
      const naturalUnits = child.userData.naturalLengthUnits as number
      const maxUnits = child.userData.maxLengthUnits as number
      const currentUnits = Math.min(maxUnits, naturalUnits + Math.max(0, extensionCm) * 0.05)
      child.scale.y = currentUnits / maxUnits
      child.position.y = 0.85 - (maxUnits * child.scale.y) / 2
    }
    if (child.userData.role === 'spring_hanger') {
      const bodyChild = [...group.children].find(c => c.userData.role === 'spring_body') as THREE.Mesh | undefined
      if (bodyChild) child.position.y = 0.85 - (bodyChild.userData.maxLengthUnits as number) * bodyChild.scale.y
    }
  })
}

// --- Optics: reflection & refraction ------------------------------------------------------------
function dirFromRotY(rotY: number): THREE.Vector3 {
  return new THREE.Vector3(Math.sin(rotY), 0, Math.cos(rotY))
}

function reflectVec(incident: THREE.Vector3, normal: THREE.Vector3): THREE.Vector3 {
  return incident.clone().sub(normal.clone().multiplyScalar(2 * incident.dot(normal)))
}

/** Standard vector refraction (Snell's Law) - n1 is always air (1.0) since every template only has
 *  a ray box in air striking a glass surface. */
function refractVec(incident: THREE.Vector3, normal: THREE.Vector3, n1: number, n2: number): THREE.Vector3 | null {
  let n = normal.clone()
  let cosI = -n.dot(incident)
  if (cosI < 0) { cosI = -cosI; n = n.clone().negate() }
  const eta = n1 / n2
  const sin2T = eta * eta * (1 - cosI * cosI)
  if (sin2T > 1) return null // total internal reflection - not expected at these teaching angles
  const cosT = Math.sqrt(1 - sin2T)
  return incident.clone().multiplyScalar(eta).add(n.clone().multiplyScalar(eta * cosI - cosT))
}

/** Finds where the ray box's aim actually strikes a flat target (mirror or glass block), treating
 *  the target as an infinite plane through its position with the target's local +Z (rotated by its
 *  own rotation.y) as the face normal - real geometry derived from where the student has actually
 *  positioned and rotated both objects, not a scripted angle. */
function computeRayHit(rayBoxKey: string, targetKey: string): { point: THREE.Vector3; normal: THREE.Vector3; incidentDir: THREE.Vector3 } | null {
  const rayBox = groups.get(rayBoxKey)
  const target = groups.get(targetKey)
  if (!rayBox || !target) return null
  const origin = rayBox.position.clone()
  const dir = dirFromRotY(rayBox.rotation.y)
  const normal = dirFromRotY(target.rotation.y)
  const denom = dir.dot(normal)
  if (Math.abs(denom) < 0.001) return null // ray travels parallel to the surface, never strikes it
  const t = target.position.clone().sub(origin).dot(normal) / denom
  if (t <= 0.05) return null // surface is behind the ray box, or the box is touching it
  const point = origin.clone().add(dir.clone().multiplyScalar(t))
  // Must land within the target's physical extent, not just its infinite plane.
  if (point.distanceTo(target.position) > 0.35) return null
  return { point, normal, incidentDir: dir }
}

function clearRayVisuals() {
  rayVisuals.forEach((obj) => { scene.remove(obj); if (obj instanceof THREE.Mesh) { obj.geometry.dispose(); (obj.material as THREE.Material).dispose() } })
  rayVisuals = []
}

/** A thin straight segment between two exact points - unlike createConnectionLine (which offsets
 *  upward for wire visuals), a ray needs to sit exactly where the geometry says it does. */
function rayLine(a: THREE.Vector3, b: THREE.Vector3, color: number): THREE.Mesh {
  const mid = a.clone().add(b).multiplyScalar(0.5)
  const distance = Math.max(0.01, a.distanceTo(b))
  const mesh = new THREE.Mesh(
    new THREE.CylinderGeometry(0.006, 0.006, distance, 8),
    new THREE.MeshStandardMaterial({ color, emissive: color, emissiveIntensity: 0.4, roughness: 0.4 })
  )
  mesh.position.copy(mid)
  const dir = b.clone().sub(a).normalize()
  mesh.quaternion.copy(new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir))
  return mesh
}

/** Redraws the incident/reflected-or-refracted ray and the surface normal from the real, current
 *  positions/rotations of the ray box and whichever optical target is present - called after any
 *  move/rotate/switch on a ray_box, mirror or glass_block so the diagram always reflects what the
 *  student has actually set up, never a fixed illustration. */
function recomputeOptics() {
  clearRayVisuals()
  const rayBox = props.sceneObjects.find(o => o.object_type === 'ray_box')
  const mirror = props.sceneObjects.find(o => o.object_type === 'mirror')
  const glassBlock = props.sceneObjects.find(o => o.object_type === 'glass_block')
  const target = mirror || glassBlock
  if (!rayBox || !target || switchStates.get(rayBox.key) !== 'on') return
  const hit = computeRayHit(rayBox.key, target.key)
  if (!hit) return

  const rayBoxGroup = groups.get(rayBox.key)!
  const incidentLine = rayLine(rayBoxGroup.position, hit.point, 0xfbbf24)
  const normalLine = rayLine(hit.point.clone().sub(hit.normal.clone().multiplyScalar(0.01)), hit.point.clone().add(hit.normal.clone().multiplyScalar(0.4)), 0x94a3b8)
  scene.add(incidentLine, normalLine)
  rayVisuals.push(incidentLine, normalLine)

  if (mirror) {
    const reflected = reflectVec(hit.incidentDir, hit.normal)
    const outLine = rayLine(hit.point, hit.point.clone().add(reflected.multiplyScalar(1.2)), 0xfbbf24)
    scene.add(outLine)
    rayVisuals.push(outLine)
  } else if (glassBlock) {
    const n2 = Number(mergedProps(glassBlock.key).refractive_index ?? 1.5)
    const refracted = refractVec(hit.incidentDir, hit.normal, 1.0, n2)
    if (refracted) {
      const exitPoint = hit.point.clone().add(refracted.clone().multiplyScalar(0.4))
      const inLine = rayLine(hit.point, exitPoint, 0x60a5fa)
      const emergentLine = rayLine(exitPoint, exitPoint.clone().add(hit.incidentDir.clone().multiplyScalar(1)), 0xfbbf24)
      scene.add(inLine, emergentLine)
      rayVisuals.push(inLine, emergentLine)
    }
  }
}

/**
 * A protractor reading is only valid when its centre (its group position) sits close to the actual
 * ray/surface intersection - otherwise it returns not-ok with the same guidance the brief quotes,
 * rather than a number. When valid, the angle comes from the real incident/outgoing vectors, not a
 * value chosen by the teacher.
 */
function opticsAngle(protractorKey: string, targetKey: string, mode: 'incidence' | 'outgoing'): { ok: boolean; value?: number } {
  const rayBox = props.sceneObjects.find(o => o.object_type === 'ray_box')
  if (!rayBox) return { ok: false }
  const hit = computeRayHit(rayBox.key, targetKey)
  if (!hit) return { ok: false }
  const protractorGroup = groups.get(protractorKey)
  if (!protractorGroup || protractorGroup.position.distanceTo(hit.point) > 0.4) return { ok: false }

  let vec: THREE.Vector3
  if (mode === 'incidence') {
    vec = hit.incidentDir.clone().negate()
  } else {
    const targetCfg = props.sceneObjects.find(o => o.key === targetKey)
    if (targetCfg?.object_type === 'glass_block') {
      const n2 = Number(mergedProps(targetKey).refractive_index ?? 1.5)
      const refracted = refractVec(hit.incidentDir, hit.normal, 1.0, n2)
      if (!refracted) return { ok: false }
      vec = refracted
    } else {
      vec = reflectVec(hit.incidentDir, hit.normal)
    }
  }
  const cos = Math.abs(vec.normalize().dot(hit.normal))
  const angleDeg = (Math.acos(Math.min(1, Math.max(-1, cos))) * 180) / Math.PI
  const noise = (Math.random() - 0.5) * 0.6
  return { ok: true, value: Math.round((angleDeg + noise) * 10) / 10 }
}

// --- Balance -------------------------------------------------------------------------------
// balanceKey -> the object currently sitting on it. Placement/removal both happen through the
// existing "move near another object" mechanic already used to drop a slide on a microscope -
// no new action type needed, the balance just reacts to what gets moved onto or off it.
const balancePlacements = new Map<string, string>()
// objectKey -> the liquid container it's currently submerged in (water-displacement tracking).
const submergedIn = new Map<string, string>()

function updateBalanceDisplay(balanceKey: string) {
  const group = groups.get(balanceKey)
  if (!group) return
  const placedKey = balancePlacements.get(balanceKey)
  const mass = placedKey ? Number(mergedProps(placedKey).mass_g ?? 0) : 0
  group.traverse((child) => {
    if (child instanceof THREE.Sprite && child.userData.role === 'balance_display') {
      const mat = child.material as THREE.SpriteMaterial
      mat.map?.dispose()
      mat.map = digitalDisplayTexture(`${mass.toFixed(1)} g`)
      mat.needsUpdate = true
    }
  })
}

// --- Stopwatch -------------------------------------------------------------------------------
const stopwatchRunning = new Map<string, boolean>()
const stopwatchStartedAt = new Map<string, number>()
const stopwatchElapsedMs = new Map<string, number>()
const stopwatchDisplayText = ref('00:00.0')

function formatStopwatch(ms: number): string {
  const totalSec = Math.max(0, ms) / 1000
  const mm = Math.floor(totalSec / 60).toString().padStart(2, '0')
  const ss = (totalSec % 60).toFixed(1).padStart(4, '0')
  return `${mm}:${ss}`
}

function currentStopwatchMs(key: string): number {
  const base = stopwatchElapsedMs.get(key) ?? 0
  if (stopwatchRunning.get(key)) {
    return base + (Date.now() - (stopwatchStartedAt.get(key) ?? Date.now()))
  }
  return base
}

function updateStopwatchDisplay(key: string) {
  const group = groups.get(key)
  const ms = currentStopwatchMs(key)
  if (selectedKey.value === key) stopwatchDisplayText.value = formatStopwatch(ms)
  if (!group) return
  group.traverse((child) => {
    if (child instanceof THREE.Sprite && child.userData.role === 'stopwatch_display') {
      const mat = child.material as THREE.SpriteMaterial
      mat.map?.dispose()
      mat.map = digitalDisplayTexture(formatStopwatch(ms))
      mat.needsUpdate = true
    }
  })
}

function resetStopwatch(key: string) {
  stopwatchRunning.set(key, false)
  stopwatchElapsedMs.set(key, 0)
  stopwatchStartedAt.delete(key)
  updateStopwatchDisplay(key)
}

function highlight(key: string | null) {
  groups.forEach((g, k) => {
    g.traverse((child) => {
      if (child instanceof THREE.Mesh && child.userData.role !== 'label') {
        const mat = child.material as THREE.MeshStandardMaterial
        if ('emissive' in mat) {
          mat.emissive = new THREE.Color(k === key ? 0x22d3ee : 0x000000)
          mat.emissiveIntensity = k === key ? 0.35 : (child.userData.role === 'flame' || child.userData.role === 'led' ? mat.emissiveIntensity : 0)
        }
      }
    })
  })
}

function selectObject(key: string) {
  selectedKey.value = key
  measurePromptFor.value = null
  inspectText.value = null
  const cfg = props.sceneObjects.find(o => o.key === key)
  const def = cfg ? catalogByType().get(cfg.object_type) : null
  selectedActions.value = def?.supported_actions ?? []
  selectedDisplayName.value = def?.display_name ?? key
  selectedObjectType.value = cfg?.object_type ?? null
  batteryVoltage.value = cfg?.object_type === 'battery' ? (batteryVoltages.get(key) ?? mergedProps(key).voltage ?? 6) : null
  if (cfg?.object_type === 'microscope') updateMicroscopeDisplay(key)
  if (cfg?.object_type === 'spring') updateSpringExtension(key)
  highlight(key)
}

function deselect() {
  selectedKey.value = null
  measurePromptFor.value = null
  measureMode.value = null
  selectedObjectType.value = null
  highlight(null)
}

/** Free, unscored realism adjustment - relabels the battery, doesn't touch grading logic, but
 *  does feed the circuit simulation (a real ammeter/voltmeter reading depends on this). */
function pickBatteryVoltage(volts: number) {
  if (!selectedKey.value) return
  batteryVoltage.value = volts
  batteryVoltages.set(selectedKey.value, volts)
  const group = groups.get(selectedKey.value)
  if (!group) return
  group.traverse((child) => {
    if (child instanceof THREE.Sprite && child.userData.role === 'voltage') {
      const mat = child.material as THREE.SpriteMaterial
      mat.map?.dispose()
      mat.map = voltageSpriteTexture(volts)
      mat.needsUpdate = true
    }
  })
}

/**
 * A real, simulation-derived reading wherever one is possible; a bounded slider (never free
 * typing) everywhere else. Ruler and thermometer need a second click (the thing being measured),
 * so they arm the same two-click flow connect/pour/heat already use rather than reading
 * immediately.
 */
function beginMeasure(key: string) {
  const cfg = props.sceneObjects.find(o => o.key === key)
  if (!cfg) return
  const type = cfg.object_type
  measureIsSafetyIssue.value = false
  measureTargetKey.value = key

  if (LIQUID_CONTAINER_TYPES.includes(type)) {
    measureMode.value = 'readonly'
    measureUnit.value = 'ml'
    measureReading.value = Math.round(containerVolumes.get(key) ?? 0)
    measurePromptFor.value = key
    return
  }
  if (type === 'ammeter' || type === 'voltmeter') {
    const diag = circuitDiagnosis(key)
    if (diag.reason) {
      warningToast.value = diag.reason
      setTimeout(() => { warningToast.value = null }, 4000)
    }
    measureMode.value = 'readonly'
    measureUnit.value = type === 'ammeter' ? 'A' : 'V'
    measureReading.value = diag.value
    measurePromptFor.value = key
    measureIsSafetyIssue.value = !!diag.reason && diag.reason.includes('Short circuit')
    return
  }
  if (type === 'balance') {
    measureMode.value = 'readonly'
    measureUnit.value = 'g'
    const placedKey = balancePlacements.get(key)
    measureReading.value = placedKey ? Number(mergedProps(placedKey).mass_g ?? 0) : 0
    measurePromptFor.value = key
    return
  }
  if (type === 'stopwatch') {
    measureMode.value = 'readonly'
    measureUnit.value = 's'
    measureReading.value = Math.round(currentStopwatchMs(key) / 100) / 10
    measurePromptFor.value = key
    return
  }
  if (type === 'spring') {
    measureMode.value = 'readonly'
    measureUnit.value = 'cm'
    const naturalCm = Number(mergedProps(key).natural_length_cm ?? 15)
    measureReading.value = Math.round((naturalCm + (springExtension.get(key) ?? 0)) * 10) / 10
    measurePromptFor.value = key
    measureTargetKey.value = key
    return
  }
  if (type === 'protractor') {
    // Defaults to angle of incidence - the dedicated buttons in the panel below let the student
    // choose the reflected/refracted angle explicitly instead.
    measureAngleMode.value = 'incidence'
    measureTargetPickerFor.value = 'protractor'
    armedAction.value = 'measure'
    return
  }
  if (type === 'ruler' || type === 'thermometer') {
    measureTargetPickerFor.value = type
    armedAction.value = 'measure'
    return
  }

  // Fallback for instruments without a dedicated simulation yet (e.g. a pipette drawing from an
  // untracked source) - still bounded by a real capacity rather than free-typed.
  measureMode.value = 'slider'
  measureUnit.value = 'ml'
  measureSliderMax.value = Number(mergedProps(key).capacity_ml ?? 100)
  measureSliderValue.value = Math.round(measureSliderMax.value / 2)
  measurePromptFor.value = key
}

function handleActionButton(action: LabAction) {
  if (!selectedKey.value) return
  if (props.readOnly) return

  if (action === 'focus_coarse' || action === 'focus_fine' || action === 'select_objective') {
    // These need a value the generic toolbar button can't carry (which focus level / which lens) -
    // real interaction happens via the dedicated microscope panel, always visible once selected.
    return
  }
  if (action === 'inspect') {
    const cfg = props.sceneObjects.find(o => o.key === selectedKey.value)
    const def = cfg ? catalogByType().get(cfg.object_type) : null
    let text = def?.description || 'No further detail available.'
    let observedValue: string | null = null
    if (selectedObjectType.value === 'microscope') {
      const key = selectedKey.value
      const slideKey = slidePlacements.get(key)
      const objective = microscopeObjective.get(key) ?? 40
      if (!slideKey) {
        text = 'Place a specimen slide on the stage first.'
      } else if (switchStates.get(key) !== 'on') {
        text = 'Switch on the illumination to see anything through the eyepiece.'
      } else {
        const quality = microscopeFocusQuality(key)
        const structures = mergedProps(slideKey).expected_structures || 'the specimen'
        if (quality === 'focused') text = `At ×${objective}, clearly focused - you can see ${structures}.`
        else if (quality === 'almost_focused') text = `At ×${objective}, almost in focus - fine-tune the focus a little more.`
        else if (quality === 'blurred') text = `At ×${objective}, blurred - adjust the coarse and fine focus.`
        else text = `At ×${objective}, very blurred - use the focus knobs before observing.`
        observedValue = quality
      }
    }
    inspectText.value = text
    emit('action', { objectKey: selectedKey.value, action, value: observedValue })
    return
  }
  if (action === 'zoom') {
    zoomToObject(selectedKey.value)
    emit('action', { objectKey: selectedKey.value, action, value: null })
    return
  }
  if (action === 'switch_on' || action === 'switch_off') {
    switchStates.set(selectedKey.value, action === 'switch_on' ? 'on' : 'off')
    if (selectedObjectType.value === 'stopwatch') {
      if (action === 'switch_on' && !stopwatchRunning.get(selectedKey.value)) {
        stopwatchRunning.set(selectedKey.value, true)
        stopwatchStartedAt.set(selectedKey.value, Date.now())
      } else if (action === 'switch_off' && stopwatchRunning.get(selectedKey.value)) {
        stopwatchElapsedMs.set(selectedKey.value, currentStopwatchMs(selectedKey.value))
        stopwatchRunning.set(selectedKey.value, false)
      }
      updateStopwatchDisplay(selectedKey.value)
    }
    if (selectedObjectType.value === 'microscope') updateMicroscopeDisplay(selectedKey.value)
    if (selectedObjectType.value === 'ray_box') recomputeOptics()
    emit('action', { objectKey: selectedKey.value, action, value: null })
    return
  }
  if (action === 'measure') {
    beginMeasure(selectedKey.value)
    return
  }
  if (action === 'connect' || action === 'pour' || action === 'heat' || action === 'move' || action === 'rotate') {
    armedAction.value = action
    controls.enabled = action !== 'move' && action !== 'rotate'
    return
  }
}

const armedBannerText = ref('')
watch(armedAction, (a) => {
  if (a === 'connect') armedBannerText.value = 'Click the object to connect to.'
  else if (a === 'pour') armedBannerText.value = 'Click the container to pour into.'
  else if (a === 'heat') armedBannerText.value = 'Click the object to place over the flame.'
  else if (a === 'move') armedBannerText.value = 'Drag the object to reposition it, then click Done.'
  else if (a === 'rotate') armedBannerText.value = 'Drag left/right to rotate, then click Done.'
  else if (a === 'measure' && measureTargetPickerFor.value === 'ruler') armedBannerText.value = 'Click the object to measure - place the ruler close to it first.'
  else if (a === 'measure' && measureTargetPickerFor.value === 'thermometer') armedBannerText.value = 'Click the substance to take a temperature reading.'
  else if (a === 'measure' && measureTargetPickerFor.value === 'protractor') armedBannerText.value = 'Click the mirror or glass block - centre the protractor on the ray first.'
})

function confirmMeasure() {
  if (!measurePromptFor.value) return
  const value = measureMode.value === 'slider'
    ? String(Math.round(measureSliderValue.value))
    : (measureReading.value !== null ? String(measureReading.value) : null)
  emit('action', { objectKey: measurePromptFor.value, action: 'measure', value, unit: measureUnit.value, label: selectedDisplayName.value, safetyIssue: measureIsSafetyIssue.value, targetObjectKey: measureTargetKey.value })
  measurePromptFor.value = null
  measureMode.value = null
  measureReading.value = null
  measureIsSafetyIssue.value = false
  measureAngleMode.value = null
}

function cancelArmed() {
  if (pouring.value) {
    cancelPouring()
    return
  }
  armedAction.value = null
  measureTargetPickerFor.value = null
  measureAngleMode.value = null
  controls.enabled = true
}

function commitArmedManipulation() {
  if (!selectedKey.value || !armedAction.value) return
  if (armedAction.value === 'move') {
    const group = groups.get(selectedKey.value)
    let nearby: string | null = null
    if (group) {
      groups.forEach((g, k) => {
        if (k === selectedKey.value) return
        if (g.position.distanceTo(group.position) < 0.6) nearby = k
      })
    }

    // Balance placement - moved onto it (nearby is a balance) or off it (was on one, now isn't).
    const movedKey = selectedKey.value
    balancePlacements.forEach((placedKey, balanceKey) => {
      if (placedKey === movedKey && balanceKey !== nearby) {
        balancePlacements.delete(balanceKey)
        updateBalanceDisplay(balanceKey)
      }
    })
    const nearbyType = nearby ? props.sceneObjects.find(o => o.key === nearby)?.object_type : null
    if (nearbyType === 'balance' && nearby) {
      balancePlacements.set(nearby, movedKey)
      updateBalanceDisplay(nearby)
    }

    // Water displacement - submerging an object with a real volume_ml into a liquid container
    // genuinely raises its tracked level by that amount (a real density-by-displacement
    // practical), and removing it lowers it back down.
    submergedIn.forEach((containerKey, objKey) => {
      if (objKey === movedKey && containerKey !== nearby) {
        const vol = Number(mergedProps(objKey).volume_ml ?? 0)
        const newLevel = Math.max(0, (containerVolumes.get(containerKey) ?? 0) - vol)
        containerVolumes.set(containerKey, newLevel)
        setLiquidLevel(containerKey, newLevel / Number(mergedProps(containerKey).capacity_ml ?? 250))
        submergedIn.delete(objKey)
      }
    })
    const movedVolume = Number(mergedProps(movedKey).volume_ml ?? 0)
    if (nearbyType && LIQUID_CONTAINER_TYPES.includes(nearbyType) && nearby && movedVolume > 0 && !submergedIn.has(movedKey)) {
      submergedIn.set(movedKey, nearby)
      const newLevel = (containerVolumes.get(nearby) ?? 0) + movedVolume
      containerVolumes.set(nearby, newLevel)
      setLiquidLevel(nearby, newLevel / Number(mergedProps(nearby).capacity_ml ?? 250))
    }

    // Slide placement on a microscope - dropping a fresh slide starts it off deliberately away
    // from the optimal focus (never pre-focused), matching "should not immediately appear
    // perfectly focused".
    const movedType = props.sceneObjects.find(o => o.key === movedKey)?.object_type
    slidePlacements.forEach((placedSlide, microscopeKey) => {
      if (placedSlide === movedKey && microscopeKey !== nearby) slidePlacements.delete(microscopeKey)
    })
    if (nearbyType === 'microscope' && nearby && movedType === 'biological_model') {
      slidePlacements.set(nearby, movedKey)
      const optimal = Number(mergedProps(movedKey).optimal_focus ?? 50)
      const tolerance = Number(mergedProps(movedKey).focus_tolerance ?? 6)
      const sign = Math.random() < 0.5 ? -1 : 1
      const offset = tolerance * (3 + Math.random() * 3) * sign
      microscopeFocus.set(nearby, Math.max(0, Math.min(100, optimal + offset)))
      microscopeObjective.set(nearby, 40)
      updateMicroscopeDisplay(nearby)
    }

    // Mass pieces stack on a spring's hanger - unlike balance's single placement, several can be
    // attached at once, so the extension reflects their real combined weight.
    let springLoadG: number | undefined
    let springOverloaded = false
    if (movedType === 'mass_piece') {
      springLoad.forEach((set, springKey) => {
        if (set.has(movedKey) && springKey !== nearby) set.delete(movedKey)
      })
      if (nearbyType === 'spring' && nearby) {
        if (!springLoad.has(nearby)) springLoad.set(nearby, new Set())
        springLoad.get(nearby)!.add(movedKey)
      }
      // Recompute every spring's extension (the moved mass may have left one and/or joined another).
      const affected = new Set<string>(nearby && nearbyType === 'spring' ? [nearby] : [])
      springLoad.forEach((_, springKey) => affected.add(springKey))
      affected.forEach((springKey) => {
        const result = updateSpringExtension(springKey)
        if (nearby === springKey) { springLoadG = result.totalMassG; springOverloaded = result.exceeded }
      })
      if (springOverloaded) {
        warningToast.value = "Load exceeds the spring's safe extension limit - it may not return to its original length."
        setTimeout(() => { warningToast.value = null }, 4500)
      }
    }

    if (['ray_box', 'mirror', 'glass_block'].includes(movedType || '')) recomputeOptics()

    emit('action', { objectKey: selectedKey.value, action: 'move', value: nearby, springLoadG, safetyIssue: springOverloaded })
  } else if (armedAction.value === 'rotate') {
    const group = groups.get(selectedKey.value)
    const degrees = group ? Math.round((group.rotation.y * 180) / Math.PI) : 0
    const rotatedType = props.sceneObjects.find(o => o.key === selectedKey.value)?.object_type
    if (['ray_box', 'mirror', 'glass_block'].includes(rotatedType || '')) recomputeOptics()
    emit('action', { objectKey: selectedKey.value, action: 'rotate', value: String(degrees) })
  }
  armedAction.value = null
  controls.enabled = true
}

function zoomToObject(key: string) {
  const group = groups.get(key)
  if (!group) return
  const target = group.position.clone().add(new THREE.Vector3(0, 0.3, 0))
  const dir = camera.position.clone().sub(controls.target).normalize()
  const newCamPos = target.clone().add(dir.multiplyScalar(1.4))
  const startCam = camera.position.clone()
  const startTarget = controls.target.clone()
  let t = 0
  const step = () => {
    t += 0.05
    camera.position.lerpVectors(startCam, newCamPos, Math.min(t, 1))
    controls.target.lerpVectors(startTarget, target, Math.min(t, 1))
    controls.update()
    if (t < 1) requestAnimationFrame(step)
  }
  step()
}

function pointerToNdc(ev: PointerEvent) {
  const rect = renderer.domElement.getBoundingClientRect()
  pointerNdc.x = ((ev.clientX - rect.left) / rect.width) * 2 - 1
  pointerNdc.y = -((ev.clientY - rect.top) / rect.height) * 2 + 1
}

function raycastGroupKey(): string | null {
  raycaster.setFromCamera(pointerNdc, camera)
  const objects: THREE.Object3D[] = []
  groups.forEach((g) => objects.push(g))
  const hits = raycaster.intersectObjects(objects, true)
  if (hits.length === 0) return null
  let obj: THREE.Object3D | null = hits[0].object
  while (obj && !obj.userData.objectKey) obj = obj.parent
  return obj ? (obj.userData.objectKey as string) : null
}

let dragStart: { x: number; y: number } | null = null

function onPointerDown(ev: PointerEvent) {
  pointerToNdc(ev)
  dragStart = { x: ev.clientX, y: ev.clientY }

  if (armedAction.value === 'move' && selectedKey.value) {
    dragging = true
    return
  }
  if (armedAction.value === 'rotate' && selectedKey.value) {
    dragging = true
    rotateStartX = ev.clientX
    return
  }
}

function onPointerMove(ev: PointerEvent) {
  if (!dragging || !selectedKey.value) return
  pointerToNdc(ev)

  if (armedAction.value === 'move') {
    raycaster.setFromCamera(pointerNdc, camera)
    const point = new THREE.Vector3()
    raycaster.ray.intersectPlane(groundPlane, point)
    const group = groups.get(selectedKey.value)
    if (group && point) {
      group.position.x = point.x
      group.position.z = point.z
    }
  } else if (armedAction.value === 'rotate') {
    const deltaX = ev.clientX - rotateStartX
    const group = groups.get(selectedKey.value)
    if (group) group.rotation.y = deltaX * 0.02
  }
}

function onPointerUp(ev: PointerEvent) {
  const moved = dragStart && (Math.abs(ev.clientX - dragStart.x) > 4 || Math.abs(ev.clientY - dragStart.y) > 4)
  dragging = false

  if (armedAction.value === 'move' || armedAction.value === 'rotate') {
    return // waits for explicit "Done" click
  }

  if (moved) return // was an orbit drag, not a click

  pointerToNdc(ev)
  const key = raycastGroupKey()
  if (!key) {
    deselect()
    return
  }

  if (armedAction.value === 'connect' || armedAction.value === 'pour' || armedAction.value === 'heat' || armedAction.value === 'measure') {
    if (key === selectedKey.value) return
    const from = selectedKey.value!
    const action = armedAction.value

    if (action === 'measure') {
      if (measureTargetPickerFor.value === 'ruler') {
        const result = rulerReading(from, key)
        if (!result.ok) {
          warningToast.value = 'Align the zero mark of the ruler with the beginning of the object.'
          setTimeout(() => { warningToast.value = null }, 3500)
          return // stays armed - move the ruler closer and click the object again
        }
        measureMode.value = 'readonly'
        measureUnit.value = 'cm'
        measureReading.value = result.value!
      } else if (measureTargetPickerFor.value === 'thermometer') {
        measureMode.value = 'readonly'
        measureUnit.value = '°C'
        measureReading.value = simulatedTemperature(key)
      } else if (measureTargetPickerFor.value === 'protractor') {
        const mode = measureAngleMode.value ?? 'incidence'
        const result = opticsAngle(from, key, mode)
        if (!result.ok) {
          warningToast.value = 'Position the centre of the protractor at the point where the ray meets the surface.'
          setTimeout(() => { warningToast.value = null }, 3500)
          return // stays armed - reposition the protractor and click the mirror/glass block again
        }
        measureMode.value = 'readonly'
        measureUnit.value = '°'
        measureReading.value = result.value!
      }
      measureTargetKey.value = key
      measurePromptFor.value = from
      armedAction.value = null
      measureTargetPickerFor.value = null
      controls.enabled = true
      return
    }

    if (action === 'connect') {
      const a = groups.get(from), b = groups.get(key)
      if (a && b) scene.add(createConnectionLine(a.position, b.position))
      liveConnections.value.push({ from, to: key })
      emit('action', { objectKey: from, action, value: key })
      armedAction.value = null
      controls.enabled = true
      return
    }

    if (action === 'heat') {
      heatingStarted.set(key, Date.now())
      emit('action', { objectKey: from, action, value: key })
      armedAction.value = null
      controls.enabled = true
      return
    }

    if (action === 'pour') {
      beginPour(from, key)
      // armedAction stays set - the pouring control takes over the toolbar until finished
      return
    }
  }

  selectObject(key)
}

/** Opens the live pour control - amount is chosen interactively, not typed, and both containers'
 *  liquid levels update in real time as the student drags the amount. */
function beginPour(fromKey: string, toKey: string) {
  const fromCfg = props.sceneObjects.find(o => o.key === fromKey)
  const toCfg = props.sceneObjects.find(o => o.key === toKey)
  if (!fromCfg || !toCfg) return

  const toCapacity = Number(mergedProps(toKey).capacity_ml ?? 250)
  const toCurrent = containerVolumes.get(toKey) ?? 0
  const roomInDest = Math.max(0, toCapacity - toCurrent)

  const fromTracked = LIQUID_CONTAINER_TYPES.includes(fromCfg.object_type)
  const fromRemaining = fromTracked ? (containerVolumes.get(fromKey) ?? 0) : roomInDest

  pouring.value = {
    from: fromKey, to: toKey, amount: 0, max: Math.max(1, Math.round(Math.min(roomInDest, fromRemaining))),
    fromLabel: catalogByType().get(fromCfg.object_type)?.display_name ?? fromCfg.object_type,
    toLabel: catalogByType().get(toCfg.object_type)?.display_name ?? toCfg.object_type,
    fromTracked,
  }
}

function updatePourPreview() {
  if (!pouring.value) return
  const { from, to, amount, fromTracked } = pouring.value
  const toCapacity = Number(mergedProps(to).capacity_ml ?? 250)
  setLiquidLevel(to, ((containerVolumes.get(to) ?? 0) + amount) / toCapacity)
  if (fromTracked) {
    const fromCapacity = Number(mergedProps(from).capacity_ml ?? 250)
    setLiquidLevel(from, Math.max(0, (containerVolumes.get(from) ?? 0) - amount) / fromCapacity)
  }
}

watch(() => pouring.value?.amount, updatePourPreview)

function finishPouring() {
  if (!pouring.value) return
  const { from, to, amount, fromTracked } = pouring.value
  containerVolumes.set(to, Math.round((containerVolumes.get(to) ?? 0) + amount))
  if (fromTracked) containerVolumes.set(from, Math.max(0, Math.round((containerVolumes.get(from) ?? 0) - amount)))
  emit('action', { objectKey: to, action: 'pour', value: String(Math.round(amount)) })
  pouring.value = null
  armedAction.value = null
  controls.enabled = true
}

function cancelPouring() {
  if (pouring.value) {
    const { from, to, fromTracked } = pouring.value
    const toCapacity = Number(mergedProps(to).capacity_ml ?? 250)
    setLiquidLevel(to, (containerVolumes.get(to) ?? 0) / toCapacity)
    if (fromTracked) {
      const fromCapacity = Number(mergedProps(from).capacity_ml ?? 250)
      setLiquidLevel(from, (containerVolumes.get(from) ?? 0) / fromCapacity)
    }
  }
  pouring.value = null
  armedAction.value = null
  controls.enabled = true
}

function buildScene() {
  const host = canvasHost.value!
  scene = new THREE.Scene()
  scene.background = null

  camera = new THREE.PerspectiveCamera(45, host.clientWidth / host.clientHeight, 0.1, 100)
  camera.position.set(2.5, 2.2, 3.2)

  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' })
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  renderer.setSize(host.clientWidth, host.clientHeight)
  renderer.shadowMap.enabled = true
  renderer.shadowMap.type = THREE.PCFSoftShadowMap
  renderer.outputColorSpace = THREE.SRGBColorSpace
  renderer.toneMapping = THREE.ACESFilmicToneMapping
  renderer.toneMappingExposure = 1.05
  host.appendChild(renderer.domElement)

  controls = new OrbitControls(camera, renderer.domElement)
  controls.target.set(0, 0.3, 0)
  controls.enableDamping = true
  controls.maxPolarAngle = Math.PI / 2.1
  controls.minDistance = 1.5
  controls.maxDistance = 8

  // A sky/ground hemisphere light reads as far more natural ambient fill than a flat AmbientLight
  // (which lights every face equally and flattens the objects), plus a soft fill light on the
  // opposite side of the key light so shadowed faces never go fully black.
  const hemi = new THREE.HemisphereLight(0xe8f0ff, 0xb8b0a0, 0.65)
  const key = new THREE.DirectionalLight(0xffffff, 1.5)
  key.position.set(3, 5, 2)
  key.castShadow = true
  key.shadow.mapSize.set(2048, 2048)
  key.shadow.camera.near = 0.5
  key.shadow.camera.far = 15
  key.shadow.camera.left = -4
  key.shadow.camera.right = 4
  key.shadow.camera.top = 4
  key.shadow.camera.bottom = -4
  key.shadow.bias = -0.0015
  key.shadow.radius = 3
  const fill = new THREE.DirectionalLight(0xdbe8ff, 0.35)
  fill.position.set(-3, 2, -2)
  scene.add(hemi, key, fill)

  const bench = new THREE.Mesh(
    new THREE.CylinderGeometry(4, 4, 0.1, 64),
    new THREE.MeshStandardMaterial({ color: 0xe2e8f0, roughness: 0.85, metalness: 0.05 })
  )
  bench.position.y = -0.05
  bench.receiveShadow = true
  scene.add(bench)

  props.sceneObjects.forEach((cfg) => {
    if (cfg.in_tray) {
      trayItems.value.push(cfg)
      return
    }
    placeObject(cfg)
  })

  ;(props.connections || []).forEach((c) => {
    const a = groups.get(c.from), b = groups.get(c.to)
    if (a && b) scene.add(createConnectionLine(a.position, b.position))
  })

  recomputeOptics()

  renderer.domElement.addEventListener('pointerdown', onPointerDown)
  renderer.domElement.addEventListener('pointermove', onPointerMove)
  renderer.domElement.addEventListener('pointerup', onPointerUp)

  let lastStopwatchTick = 0
  const animate = (now?: number) => {
    raf = requestAnimationFrame(animate)
    controls.update()
    // Throttled - regenerating a canvas texture every frame would be wasteful; a tenth-of-a-
    // second display only needs updating a few times a second to read as "live".
    if ((now ?? 0) - lastStopwatchTick > 150) {
      lastStopwatchTick = now ?? 0
      stopwatchRunning.forEach((running, key) => { if (running) updateStopwatchDisplay(key) })
    }
    renderer.render(scene, camera)
  }
  animate()

  resizeObserver = new ResizeObserver(() => {
    if (!host.clientWidth || !host.clientHeight) return
    camera.aspect = host.clientWidth / host.clientHeight
    camera.updateProjectionMatrix()
    renderer.setSize(host.clientWidth, host.clientHeight)
  })
  resizeObserver.observe(host)
}

/** Toggles a switch's lever position and a connected bulb's glow, called by the parent after it validates the action server-side. */
function setObjectState(key: string, patch: Record<string, any>) {
  if (patch.state === 'on' || patch.state === 'off') {
    switchStates.set(key, patch.state)
  }
  const group = groups.get(key)
  if (!group) return
  group.traverse((child) => {
    if (child.userData.role === 'lever' && 'state' in patch) {
      // Matches labObjectFactory's switch lever: a cylinder pivoted near vertical when open,
      // tipped toward horizontal (onto the contacts) when closed/on.
      const on = patch.state === 'on' || patch.state === 'closed'
      child.rotation.z = on ? Math.PI / 2 - 0.35 : Math.PI / 2 - 0.9
      child.position.x = on ? 0 : -0.06
    }
    if (child.userData.role === 'led' && 'state' in patch && child instanceof THREE.Mesh) {
      const mat = child.material as THREE.MeshStandardMaterial
      mat.emissiveIntensity = patch.state === 'on' ? 1.2 : 0
    }
    if (child.userData.role === 'flame' && 'flame' in patch && child instanceof THREE.Mesh) {
      const mat = child.material as THREE.MeshStandardMaterial
      mat.emissiveIntensity = patch.flame === 'on' ? 1 : 0
      mat.opacity = patch.flame === 'on' ? 0.9 : 0
    }
  })
}

defineExpose({ setObjectState })

onMounted(buildScene)

onBeforeUnmount(() => {
  cancelAnimationFrame(raf)
  resizeObserver?.disconnect()
  renderer?.domElement.removeEventListener('pointerdown', onPointerDown)
  renderer?.domElement.removeEventListener('pointermove', onPointerMove)
  renderer?.domElement.removeEventListener('pointerup', onPointerUp)
  scene?.traverse((obj) => {
    if (obj instanceof THREE.Mesh) {
      obj.geometry.dispose()
      if (Array.isArray(obj.material)) obj.material.forEach(m => m.dispose())
      else obj.material.dispose()
    }
  })
  renderer?.dispose()
})
</script>
