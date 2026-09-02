<template>
  <div class="relative w-full h-full rounded-xl overflow-hidden bg-gradient-to-b from-sky-50 to-slate-100 dark:from-slate-800 dark:to-slate-900">
    <svg :viewBox="`0 0 ${VB_W} ${VB_H}`" class="w-full h-full select-none" ref="svgEl" @pointermove="onPointerMove" @pointerup="onPointerUp" @pointerleave="onPointerUp">
      <line :x1="0" :y1="BENCH_Y" :x2="VB_W" :y2="BENCH_Y" stroke="currentColor" class="text-gray-300 dark:text-gray-600" stroke-width="2" />

      <!-- Retort stand -->
      <g v-if="isPlaced('stand1')" class="text-gray-500 dark:text-gray-400">
        <rect :x="STAND_X - 8" :y="BENCH_Y - 10" width="16" height="10" fill="currentColor" />
        <rect :x="STAND_X - 6" :y="CLAMP_Y" :height="BENCH_Y - CLAMP_Y" width="12" fill="currentColor" />
        <rect :x="STAND_X - 6" :y="CLAMP_Y - 6" width="70" height="12" rx="3" fill="currentColor" />
        <rect :x="STAND_X + 50" :y="CLAMP_Y - 10" width="14" height="20" rx="2" fill="#6b7280" />
      </g>

      <!-- Spring - mounted under the clamp, or free-floating while being placed/dragged -->
      <g v-if="isPlaced('spring1')" class="cursor-grab active:cursor-grabbing" @pointerdown="onSpringPointerDown">
        <polyline :points="springCoilPoints" fill="none" stroke="#4338ca" stroke-width="3" stroke-linejoin="round" />
        <rect :x="springPos.x - 16" :y="hangerY" width="32" height="8" rx="2" fill="#334155" />
      </g>

      <!-- Measurement marker - a highlighted line across the ruler at the current hanger height -->
      <line v-if="isPlaced('ruler1') && isPlaced('spring1') && springMounted" :x1="springPos.x + 16" :y1="hangerY + 4" :x2="RULER_X + 16" :y2="hangerY + 4" stroke="#dc2626" stroke-width="1.5" stroke-dasharray="3 3" />

      <!-- Ruler -->
      <LabRuler
        v-if="isPlaced('ruler1')"
        :x="RULER_X" :y="CLAMP_Y - 6" :max-value="40" :px-per-unit="PX_PER_CM"
        :armed="measureArmed" clickable @click="selectObject('ruler1')"
      />

      <!-- Masses - stacked when attached to the hanger, otherwise sitting in their holding slot -->
      <g v-for="m in massRenderList" :key="m.key" class="cursor-grab active:cursor-grabbing" @pointerdown="onMassPointerDown(m.key, $event)">
        <rect :x="m.x - 20" :y="m.y" width="40" height="22" rx="4" fill="#78716c" :stroke="selectedKey === m.key ? '#4f46e5' : '#44403c'" :stroke-width="selectedKey === m.key ? 3 : 1.5" />
        <text :x="m.x" :y="m.y + 15" text-anchor="middle" class="fill-white text-[10px] font-bold">{{ m.massG }}g</text>
      </g>
    </svg>

    <!-- Apparatus tray - matches the 3D engine's tray visual language exactly. -->
    <div v-if="trayItems.length > 0" class="absolute left-2 top-2 sm:left-3 sm:top-3 max-w-[9rem] bg-white/95 dark:bg-gray-800/95 backdrop-blur rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-2.5 max-h-[calc(100%-1rem)] sm:max-h-[calc(100%-1.5rem)] overflow-y-auto">
      <p class="text-[10px] font-bold uppercase tracking-wide text-gray-400 dark:text-gray-500 mb-1.5">Apparatus Tray</p>
      <div class="space-y-1">
        <button v-for="item in trayItems" :key="item.key" @click="pickFromTray(item.key)" class="w-full flex items-center gap-1.5 px-2 py-1.5 text-xs font-medium rounded-lg bg-gray-50 dark:bg-gray-900/40 text-gray-700 dark:text-gray-200 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors text-left">
          <span>{{ catalogFor(item.object_type)?.icon || '\u{1F9EA}' }}</span>
          <span class="truncate">{{ catalogFor(item.object_type)?.display_name || item.object_type }}</span>
        </button>
      </div>
    </div>

    <!-- Selection panel - Measure on the ruler, plus the live reading/record flow. -->
    <div v-if="selectedKey === 'ruler1'" class="absolute right-2 top-2 sm:right-3 sm:top-3 bg-white/95 dark:bg-gray-800/95 backdrop-blur rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-3 max-w-[13rem] max-h-[calc(100%-1rem)] sm:max-h-[calc(100%-1.5rem)] overflow-y-auto">
      <div class="flex items-center justify-between gap-2 mb-2">
        <p class="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">Ruler</p>
        <button @click="deselect" class="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 text-xs leading-none">&times;</button>
      </div>
      <LabButton v-if="!measureArmed && !pendingReading" size="sm" :disabled="props.readOnly || !springMounted" @click="armMeasure">Measure</LabButton>
      <p v-if="!springMounted" class="text-[11px] text-amber-600 dark:text-amber-400 mt-1">Mount the spring on the stand first.</p>
      <div v-if="measureArmed" class="mt-2 pt-2 border-t border-gray-100 dark:border-gray-700 text-[11px] text-amber-600 dark:text-amber-400">Click the spring to measure its length.</div>
      <div v-if="pendingReading" class="mt-2 pt-2 border-t border-gray-100 dark:border-gray-700">
        <p class="text-[11px] font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wide mb-1">Reading</p>
        <div class="flex items-center gap-2">
          <span class="flex-1 text-base font-bold text-gray-900 dark:text-white">{{ pendingReading.value }}<span class="text-xs font-medium text-gray-400 ml-1">cm</span></span>
          <LabButton size="sm" variant="success" @click="confirmReading">Record</LabButton>
        </div>
      </div>
    </div>

    <!-- Live readouts - only shown once there is something real to display. -->
    <div v-if="springMounted" class="absolute right-2 bottom-2 sm:right-3 sm:bottom-3 bg-white/95 dark:bg-gray-800/95 backdrop-blur rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-3 flex flex-col gap-1.5">
      <LabMeasurementLabel label="Mass" :value="totalMassG" unit=" g" />
      <LabMeasurementLabel label="Force" :value="forceN" unit=" N" />
      <LabMeasurementLabel label="Extension" :value="displayExtension.toFixed(1)" unit=" cm" />
    </div>

    <transition enter-active-class="transition duration-200 ease-out" enter-from-class="opacity-0 -translate-y-1" leave-active-class="transition duration-150 ease-in" leave-to-class="opacity-0">
      <div v-if="hint" class="absolute left-1/2 -translate-x-1/2 top-2 sm:top-3 bg-amber-500 text-white text-xs font-medium px-4 py-2 rounded-2xl shadow-lg text-center max-w-[calc(100vw-2rem)]">{{ hint }}</div>
    </transition>
    <transition enter-active-class="transition duration-200 ease-out" enter-from-class="opacity-0 -translate-y-1" leave-active-class="transition duration-150 ease-in" leave-to-class="opacity-0">
      <div v-if="warning" class="absolute left-1/2 -translate-x-1/2 bottom-16 sm:bottom-3 bg-red-500 text-white text-xs sm:text-sm font-medium px-4 py-2.5 rounded-2xl shadow-lg text-center max-w-[calc(100vw-2rem)]">{{ warning }}</div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted, onBeforeUnmount } from 'vue'
import type { SceneObjectConfig, LabObjectDef, LabAction } from '@/types/virtualLab'
import LabRuler from './lab2d/LabRuler.vue'
import LabButton from './lab2d/LabButton.vue'
import LabMeasurementLabel from './lab2d/LabMeasurementLabel.vue'

const props = defineProps<{
  sceneObjects: SceneObjectConfig[]
  objectCatalog: LabObjectDef[]
  connections?: { from: string; to: string }[]
  readOnly?: boolean
}>()

const emit = defineEmits<{
  action: [{ objectKey: string | null; action: LabAction; value: string | null; unit?: string | null; label?: string | null; safetyIssue?: boolean; targetObjectKey?: string | null; springLoadG?: number }]
}>()

// --- Fixed educational layout - no free camera, everything at a known, stable position ---------
const VB_W = 600, VB_H = 420
const BENCH_Y = 400
const STAND_X = 150
const CLAMP_Y = 110
const RULER_X = 280
const PX_PER_CM = 6
const HOLD_SLOT_Y = 355

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

// --- Apparatus tray - identical semantics to the 3D engine's: pick once, it's placed for good. -
const placedKeys = reactive(new Set<string>())
const trayItems = computed(() => props.sceneObjects.filter(o => !placedKeys.has(o.key)))
function isPlaced(key: string) { return placedKeys.has(key) }

function pickFromTray(key: string) {
  if (props.readOnly) return
  placedKeys.add(key)
  emit('action', { objectKey: key, action: 'move', value: key })
}

// --- Spring mounting - drag from its holding spot onto the stand's clamp -----------------------
const springMounted = ref(false)
const springHoldPos = { x: 90, y: 250 }
const springPos = reactive({ x: springHoldPos.x, y: springHoldPos.y })
let draggingSpring = false

function onSpringPointerDown(ev: PointerEvent) {
  if (props.readOnly) return
  // A click while the ruler's measurement is armed reads the spring's real live length instead
  // of starting a drag.
  if (measureArmed.value && springMounted.value) {
    const noise = (Math.random() - 0.5) * 0.2
    const value = Math.round((naturalLengthCm.value + extensionCm.value + noise) * 10) / 10
    pendingReading.value = { value: String(value) }
    measureArmed.value = false
    ev.stopPropagation()
    return
  }
  if (springMounted.value) return
  draggingSpring = true
  ev.stopPropagation()
}

function withinClampDropZone(x: number, y: number) {
  return Math.abs(x - STAND_X) < 45 && y > CLAMP_Y - 20 && y < CLAMP_Y + 60
}

// --- Masses - drag onto/off the hanger; several stack at once ----------------------------------
const attachedMassKeys = reactive<string[]>([])
let draggingMassKey: string | null = null
const freeMassPos = reactive<Record<string, { x: number; y: number }>>({})

function holdSlotX(index: number) { return 350 + index * 55 }

const massRenderList = computed(() => {
  const list: { key: string; massG: number; x: number; y: number }[] = []
  let freeIndex = 0
  massCfgs.value.forEach((cfg) => {
    if (!isPlaced(cfg.key)) return
    const massG = Number(mergedProps(cfg.key).mass_g ?? 50)
    const stackIndex = attachedMassKeys.indexOf(cfg.key)
    if (stackIndex >= 0) {
      list.push({ key: cfg.key, massG, x: springPos.x, y: hangerY.value + 10 + stackIndex * 24 })
    } else {
      const pos = freeMassPos[cfg.key] ?? { x: holdSlotX(freeIndex), y: HOLD_SLOT_Y }
      list.push({ key: cfg.key, massG, x: pos.x, y: pos.y })
      freeIndex++
    }
  })
  return list
})

function onMassPointerDown(key: string, ev: PointerEvent) {
  if (props.readOnly) return
  draggingMassKey = key
  ev.stopPropagation()
}

function withinHangerDropZone(x: number, y: number) {
  return Math.abs(x - springPos.x) < 40 && Math.abs(y - (hangerY.value + 10)) < 60
}

// --- Real spring physics: F = mg, x = F/k - the same formula and elastic-limit handling as the
// 3D engine's spring, so the behaviour (and safety-mistake trigger) is identical either way. ----
const permanentDeformCm = ref(0)
const rawExtensionCm = computed(() => {
  const k = Number(mergedProps(springCfg.value?.key ?? '').spring_constant_n_per_m ?? 40)
  const forceN = (totalMassG.value / 1000) * 9.8
  return (forceN / k) * 100
})
const maxSafeCm = computed(() => Number(mergedProps(springCfg.value?.key ?? '').max_safe_extension_cm ?? 12))
const extensionCm = computed(() => rawExtensionCm.value + permanentDeformCm.value)
const totalMassG = computed(() => attachedMassKeys.reduce((sum, k) => sum + Number(mergedProps(k).mass_g ?? 0), 0))
const forceN = computed(() => Math.round((totalMassG.value / 1000) * 9.8 * 100) / 100)

const naturalLengthCm = computed(() => Number(mergedProps(springCfg.value?.key ?? '').natural_length_cm ?? 15))
const hangerY = computed(() => CLAMP_Y + naturalLengthCm.value * PX_PER_CM + displayExtension.value * PX_PER_CM)
const springCoilPoints = computed(() => {
  const top = { x: springPos.x, y: springMounted.value ? CLAMP_Y : springPos.y - 40 }
  const bottom = { x: springPos.x, y: springMounted.value ? hangerY.value : springPos.y }
  const coilCount = 8
  const pts: string[] = [`${top.x},${top.y}`]
  for (let i = 1; i < coilCount; i++) {
    const t = i / coilCount
    const y = top.y + (bottom.y - top.y) * t
    const x = top.x + (i % 2 === 0 ? -10 : 10)
    pts.push(`${x},${y}`)
  }
  pts.push(`${bottom.x},${bottom.y}`)
  return pts.join(' ')
})

// Smoothly eases the visible extension toward the real target rather than snapping instantly -
// the underlying value used for grading/measurement is always the real target, this is purely
// the "settling animation" the brief asks for.
const displayExtension = ref(0)
let settleRaf = 0
function settleLoop() {
  settleRaf = requestAnimationFrame(settleLoop)
  const diff = extensionCm.value - displayExtension.value
  if (Math.abs(diff) < 0.02) { displayExtension.value = extensionCm.value; return }
  displayExtension.value += diff * 0.18
}

function svgPoint(ev: PointerEvent, svgEl: SVGSVGElement): { x: number; y: number } {
  const pt = svgEl.createSVGPoint()
  pt.x = ev.clientX
  pt.y = ev.clientY
  const ctm = svgEl.getScreenCTM()
  if (!ctm) return { x: 0, y: 0 }
  const local = pt.matrixTransform(ctm.inverse())
  return { x: local.x, y: local.y }
}

const svgEl = ref<SVGSVGElement | null>(null)

function onPointerMove(ev: PointerEvent) {
  if (!svgEl.value) return
  const p = svgPoint(ev, svgEl.value)
  if (draggingSpring) {
    springPos.x = p.x
    springPos.y = p.y
  } else if (draggingMassKey) {
    freeMassPos[draggingMassKey] = { x: p.x, y: p.y }
  }
}

function flash(text: string) {
  hint.value = text
  setTimeout(() => { if (hint.value === text) hint.value = null }, 3000)
}
function flashWarning(text: string) {
  warning.value = text
  setTimeout(() => { if (warning.value === text) warning.value = null }, 4500)
}

function onPointerUp(ev: PointerEvent) {
  if (!svgEl.value) return
  const p = svgPoint(ev, svgEl.value)

  if (draggingSpring) {
    draggingSpring = false
    if (withinClampDropZone(p.x, p.y)) {
      springMounted.value = true
      springPos.x = STAND_X
      emit('action', { objectKey: springCfg.value?.key ?? 'spring1', action: 'move', value: standCfg.value?.key ?? 'stand1' })
    } else {
      springPos.x = springHoldPos.x
      springPos.y = springHoldPos.y
      flash('Drag the spring onto the retort stand’s clamp.')
    }
    return
  }

  if (draggingMassKey) {
    const key = draggingMassKey
    draggingMassKey = null
    const wasAttached = attachedMassKeys.includes(key)
    const droppedOnHanger = springMounted.value && withinHangerDropZone(p.x, p.y)

    if (droppedOnHanger && !wasAttached) {
      attachedMassKeys.push(key)
      delete freeMassPos[key]
      const exceeded = rawExtensionCm.value > maxSafeCm.value
      if (exceeded && permanentDeformCm.value === 0) {
        permanentDeformCm.value = (rawExtensionCm.value - maxSafeCm.value) * 0.3
      }
      if (exceeded) flashWarning('Load exceeds the spring’s safe extension limit - it may not return to its original length.')
      emit('action', { objectKey: key, action: 'move', value: springCfg.value?.key ?? 'spring1', springLoadG: totalMassG.value, safetyIssue: exceeded })
    } else if (!droppedOnHanger && wasAttached) {
      // Removing a mass is a free, unscored action - real immediately, but no step requires it.
      attachedMassKeys.splice(attachedMassKeys.indexOf(key), 1)
      freeMassPos[key] = { x: p.x, y: p.y }
    } else if (!wasAttached) {
      freeMassPos[key] = { x: p.x, y: p.y }
    }
  }
}

// --- Ruler measurement - selects, arms, click the spring to read its real live length ----------
const selectedKey = ref<string | null>(null)
const measureArmed = ref(false)
const pendingReading = ref<{ value: string } | null>(null)
const hint = ref<string | null>(null)
const warning = ref<string | null>(null)

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
  emit('action', { objectKey: rulerCfg.value.key, action: 'measure', value: pendingReading.value.value, unit: 'cm', label: 'Ruler', targetObjectKey: springCfg.value?.key ?? 'spring1' })
  pendingReading.value = null
}

onMounted(() => {
  settleRaf = requestAnimationFrame(settleLoop)
  if (!props.readOnly) flash('Pick up the apparatus from the tray, then drag pieces into place.')
})
onBeforeUnmount(() => {
  cancelAnimationFrame(settleRaf)
})

function setObjectState() {
  // No switch_on/off apparatus in this experiment - kept for interface parity with the 3D engine.
}
defineExpose({ setObjectState })
</script>
