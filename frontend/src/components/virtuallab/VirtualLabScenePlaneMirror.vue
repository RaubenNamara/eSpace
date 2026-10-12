<template>
  <div class="relative w-full h-full rounded-xl overflow-hidden bg-[#d9c4a0] select-none flex flex-col sm:flex-row">
    <!-- The soft board with the white sheet - seen from above, as the pins are used -->
    <div class="relative flex-1 min-h-0 min-w-0 p-2 sm:p-3">
      <svg
        ref="svgEl"
        :viewBox="`-1 -1 ${W + 2} ${H + 2}`"
        preserveAspectRatio="xMidYMid meet"
        class="w-full h-full touch-none"
        :style="{ cursor: placing ? 'crosshair' : drag ? 'grabbing' : 'default' }"
        @pointerdown="onPaperDown"
        @pointermove="onMove"
        @pointerup="onUp"
        @pointerleave="onUp"
      >
        <!-- soft board -->
        <rect x="-1" y="-1" :width="W + 2" :height="H + 2" rx="0.4" fill="#b98b55" />
        <template v-if="paperShown">
          <!-- white sheet, held by four drawing pins -->
          <rect x="0" y="0" :width="W" :height="H" fill="#ffffff" stroke="#e5e7eb" stroke-width="0.04" />
          <circle v-for="(c, i) in [[0.6, 0.6], [W - 0.6, 0.6], [0.6, H - 0.6], [W - 0.6, H - 0.6]]" :key="'dp' + i" :cx="c[0]" :cy="c[1]" r="0.28" fill="#dc2626" stroke="#7f1d1d" stroke-width="0.05" />
          <!-- line ML (where the mirror stands) and the normal RS -->
          <line :x1="1.5" :y1="ML_Y" :x2="W - 1.5" :y2="ML_Y" stroke="#111827" stroke-width="0.06" />
          <text x="0.6" :y="ML_Y + 0.35" font-size="0.9" font-weight="700" fill="#111827">M</text>
          <text :x="W - 1.2" :y="ML_Y + 0.35" font-size="0.9" font-weight="700" fill="#111827">L</text>
          <line :x1="RS_X" y1="0.8" :x2="RS_X" :y2="H - 0.8" stroke="#111827" stroke-width="0.05" stroke-dasharray="0.4 0.25" />
          <text :x="RS_X + 0.3" y="1.1" font-size="0.9" font-weight="700" fill="#111827">R</text>
          <text :x="RS_X + 0.3" :y="H - 0.45" font-size="0.9" font-weight="700" fill="#111827">S</text>
          <!-- A clear plastic ruler from the geometry set, laid along RS with its edge on the line:
               mm, half-cm and cm graduations, numbered in cm from ML both ways. Only once it is taken from the tray. -->
          <g v-if="picked.has(rulerKey)" pointer-events="none">
            <rect :x="RS_X - RULER_W" y="0.35" :width="RULER_W" :height="H - 0.7" rx="0.18" fill="#fef9c3" fill-opacity="0.55" stroke="#a16207" stroke-opacity="0.6" stroke-width="0.04" />
            <rect :x="RS_X - RULER_W + 0.06" y="0.42" width="0.1" :height="H - 0.84" rx="0.05" fill="#ffffff" fill-opacity="0.7" />
            <g stroke="#1f2937">
              <line v-for="m in RULER_MM" :key="'mm' + m" :x1="RS_X" :y1="ML_Y + m / 10" :x2="RS_X - (m % 10 === 0 ? 0.55 : m % 5 === 0 ? 0.38 : 0.22)" :y2="ML_Y + m / 10" :stroke-width="m % 10 === 0 ? 0.035 : 0.018" />
            </g>
            <g font-size="0.42" font-weight="600" fill="#1f2937" text-anchor="middle">
              <text v-for="k in TICKS" :key="'rl' + k" :x="RS_X - 0.82" :y="ML_Y + k + 0.15">{{ Math.abs(k) }}</text>
            </g>
            <text :x="RS_X - 0.82" :y="ML_Y - 10.45" font-size="0.36" fill="#92400e" text-anchor="middle">cm</text>
          </g>

          <!-- earlier trials' rays, kept on the sheet -->
          <g v-for="(h, i) in history" :key="'h' + i" stroke="#94a3b8" stroke-width="0.05" fill="none">
            <polyline :points="`${h.o.x},${h.o.y} ${h.t.x},${h.t.y} ${h.p3.x},${h.p3.y}`" />
            <line :x1="h.t.x" :y1="h.t.y" :x2="h.i.x" :y2="h.i.y" stroke-dasharray="0.3 0.25" />
            <circle :cx="h.i.x" :cy="h.i.y" r="0.12" fill="#94a3b8" />
          </g>

          <!-- the traced ray of this trial (mirror removed) -->
          <g v-if="trace" fill="none" stroke-width="0.07">
            <line :x1="trace.o.x" :y1="trace.o.y" :x2="trace.t.x" :y2="trace.t.y" stroke="#dc2626" />
            <line :x1="trace.t.x" :y1="trace.t.y" :x2="trace.far.x" :y2="trace.far.y" stroke="#dc2626" />
            <line :x1="trace.t.x" :y1="trace.t.y" :x2="trace.i.x" :y2="trace.i.y" stroke="#dc2626" stroke-dasharray="0.35 0.25" />
            <circle :cx="trace.i.x" :cy="trace.i.y" r="0.16" fill="#dc2626" stroke="none" />
            <text :x="trace.i.x + 0.4" :y="trace.i.y + 0.2" font-size="0.7" font-weight="700" fill="#dc2626" stroke="none">I</text>
            <text :x="trace.t.x + 0.25" :y="trace.t.y - 0.3" font-size="0.7" font-weight="700" fill="#111827" stroke="none">T</text>
          </g>

          <!-- the normal TN at T and the protractor (centre at T, base on ML), scaled in degrees from the
               normal: 0 along TN, 90 along the mirror - the student reads where each ray crosses it -->
          <g v-if="trace && protractorPlaced" pointer-events="none">
            <path :d="`M ${trace.t.x - PROT_R} ${ML_Y} A ${PROT_R} ${PROT_R} 0 0 0 ${trace.t.x + PROT_R} ${ML_Y} Z`" fill="#e0f2fe" fill-opacity="0.45" stroke="#0369a1" stroke-opacity="0.75" stroke-width="0.035" />
            <path :d="`M ${trace.t.x - PROT_R * 0.42} ${ML_Y} A ${PROT_R * 0.42} ${PROT_R * 0.42} 0 0 0 ${trace.t.x + PROT_R * 0.42} ${ML_Y}`" fill="none" stroke="#0369a1" stroke-opacity="0.4" stroke-width="0.025" />
            <g stroke="#0c4a6e">
              <line v-for="d in PROT_TICKS" :key="'pt' + d" :x1="pxAt(d, PROT_R).x" :y1="pxAt(d, PROT_R).y" :x2="pxAt(d, PROT_R - (d % 10 === 0 ? 0.45 : d % 5 === 0 ? 0.3 : 0.16)).x" :y2="pxAt(d, PROT_R - (d % 10 === 0 ? 0.45 : d % 5 === 0 ? 0.3 : 0.16)).y" :stroke-width="d % 10 === 0 ? 0.03 : 0.015" />
            </g>
            <g font-size="0.32" font-weight="600" fill="#0c4a6e" text-anchor="middle">
              <text v-for="d in PROT_LABELS" :key="'pl' + d" :x="pxAt(d, PROT_R - 0.75).x" :y="pxAt(d, PROT_R - 0.75).y + 0.11">{{ Math.abs(90 - d) }}</text>
            </g>
            <circle :cx="trace.t.x" :cy="ML_Y" r="0.07" fill="#0c4a6e" />
            <line :x1="trace.t.x" :y1="ML_Y - 1.5" :x2="trace.t.x" :y2="ML_Y + PROT_R + 1.6" stroke="#111827" stroke-width="0.05" stroke-dasharray="0.25 0.2" />
            <text :x="trace.t.x + 0.2" :y="ML_Y + PROT_R + 1.9" font-size="0.65" font-weight="700" fill="#111827">N</text>
          </g>
          <g v-if="trace && angles" pointer-events="none">
            <path :d="arcPath(trace.o)" fill="none" stroke="#7c3aed" stroke-width="0.07" />
            <path :d="arcPath(trace.far)" fill="none" stroke="#059669" stroke-width="0.07" />
            <text :x="angleLabel(trace.o).x" :y="angleLabel(trace.o).y" font-size="0.6" font-weight="700" fill="#7c3aed" :text-anchor="trace.o.x < trace.t.x ? 'end' : 'start'">i = {{ angles.i }}°</text>
            <text :x="angleLabel(trace.far).x" :y="angleLabel(trace.far).y" font-size="0.6" font-weight="700" fill="#059669" :text-anchor="trace.far.x < trace.t.x ? 'end' : 'start'">r = {{ angles.r }}°</text>
          </g>

          <!-- plane mirror: standing on ML (reflecting side facing the pins), or lying on the board -->
          <g v-if="mirrorShown" @pointerdown.stop="startDrag('mirror', $event)" style="cursor: grab">
            <rect :x="mirrorPos.x - MIRROR_HALF" :y="mirrorPos.y - 0.45" :width="MIRROR_HALF * 2" height="0.45" fill="#94a3b8" />
            <rect :x="mirrorPos.x - MIRROR_HALF" :y="mirrorPos.y - 0.12" :width="MIRROR_HALF * 2" height="0.12" fill="#bae6fd" />
            <g stroke="#475569" stroke-width="0.04"><line v-for="k in 30" :key="'hatch' + k" :x1="mirrorPos.x - MIRROR_HALF + (k - 1) * (MIRROR_HALF * 2 / 30)" :y1="mirrorPos.y - 0.45" :x2="mirrorPos.x - MIRROR_HALF + (k - 0.4) * (MIRROR_HALF * 2 / 30)" :y2="mirrorPos.y - 0.12" /></g>
            <text v-if="!mirrorOn" :x="mirrorPos.x" :y="mirrorPos.y + 0.8" font-size="0.6" text-anchor="middle" fill="#334155">plane mirror - drag it onto ML</text>
          </g>

          <!-- line of sight: the direction in which the eye sees the image of P1 in the mirror -->
          <g v-if="sightT && !trace" pointer-events="none">
            <line :x1="eye.x" :y1="eye.y" :x2="sightT.x" :y2="sightT.y" stroke="#2563eb" stroke-width="0.07" stroke-dasharray="0.3 0.22" />
            <text :x="(eye.x + sightT.x) / 2 + 0.3" :y="(eye.y + sightT.y) / 2 - 0.3" font-size="0.55" fill="#1d4ed8" :transform="`rotate(${sightAngle} ${(eye.x + sightT.x) / 2 + 0.3} ${(eye.y + sightT.y) / 2 - 0.3})`">line of sight to the image of P1</text>
          </g>

          <!-- the eye -->
          <g v-if="eyeShown" :transform="`translate(${eye.x} ${eye.y})`" @pointerdown.stop="startDrag('eye', $event)" style="cursor: grab">
            <ellipse rx="0.75" ry="0.42" fill="#ffffff" stroke="#111827" stroke-width="0.07" />
            <circle r="0.26" fill="#1d4ed8" /><circle r="0.11" fill="#0f172a" />
            <text x="0" y="1.15" font-size="0.6" text-anchor="middle" fill="#111827">eye (A)</text>
          </g>

          <!-- pins -->
          <g v-for="p in pinList" :key="p.key" :transform="`translate(${p.pos.x} ${p.pos.y})`" @pointerdown.stop="startDrag(p.key, $event)" :style="{ cursor: readOnly ? 'default' : 'grab' }">
            <circle r="0.5" fill="transparent" />
            <circle r="0.16" :fill="p.color" stroke="#111827" stroke-width="0.04" />
            <text x="0.32" y="-0.25" font-size="0.62" font-weight="700" fill="#111827">{{ p.label }}</text>
          </g>
        </template>
        <text v-else :x="W / 2" :y="H / 2" font-size="0.9" text-anchor="middle" fill="#fff7ed">Take the soft board with its white sheet from the tray</text>
      </svg>

      <transition enter-active-class="transition duration-200 ease-out" enter-from-class="opacity-0 -translate-y-1" leave-active-class="transition duration-150 ease-in" leave-to-class="opacity-0">
        <div v-if="hint" class="absolute left-1/2 -translate-x-1/2 top-2 bg-amber-500 text-white text-xs font-medium px-4 py-2 rounded-2xl shadow-lg text-center max-w-[calc(100%-1rem)]">{{ hint }}</div>
      </transition>
    </div>

    <!-- Controls -->
    <div class="sm:w-64 flex-shrink-0 bg-white/95 dark:bg-gray-800/95 border-t sm:border-t-0 sm:border-l border-gray-200 dark:border-gray-700 p-2.5 overflow-y-auto max-h-[45%] sm:max-h-none text-xs space-y-3">
      <div v-if="trayItems.length">
        <p class="text-[10px] font-bold uppercase tracking-wide text-gray-400 mb-1.5">Apparatus tray</p>
        <div class="space-y-1">
          <button v-for="item in trayItems" :key="item.key" type="button" @click="pickFromTray(item.key)" class="w-full flex items-center gap-1.5 px-2 py-1.5 font-medium rounded-lg bg-gray-50 dark:bg-gray-900/40 text-gray-700 dark:text-gray-200 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 text-left">
            <span>{{ catalogFor(item.object_type)?.icon || '\u{1F4CC}' }}</span><span class="truncate">{{ LABELS[item.object_type] || catalogFor(item.object_type)?.display_name || item.object_type }}</span>
          </button>
        </div>
      </div>

      <!-- What to do now: this trial's actions in order, ticked off as they're done -->
      <div v-if="todo.length" class="rounded-xl bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-100 dark:border-indigo-800 p-2.5">
        <p class="text-[10px] font-bold uppercase tracking-wide text-indigo-500 dark:text-indigo-300 mb-1.5">What to do now</p>
        <ol class="space-y-1">
          <li v-for="(t, i) in todo" :key="i" class="flex gap-1.5" :class="t.done ? 'text-emerald-700 dark:text-emerald-400' : t.current ? 'text-gray-900 dark:text-white font-semibold' : 'text-gray-400 dark:text-gray-500'">
            <span class="flex-shrink-0 w-4 text-center">{{ t.done ? '✓' : i + 1 + '.' }}</span><span>{{ t.text }}</span>
          </li>
        </ol>
      </div>

      <!-- What the eye sees, looking into the mirror -->
      <div v-if="paperShown && pinsReady">
        <p class="text-[10px] font-bold uppercase tracking-wide text-gray-400 mb-1">What the eye at A sees (check)</p>
        <svg viewBox="0 0 240 74" class="w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50">
          <rect v-if="mirrorOn" x="0" y="0" width="240" height="40" fill="#e0f2fe" />
          <text v-if="mirrorOn" x="6" y="12" font-size="9" fill="#0369a1">in the mirror</text>
          <line x1="0" y1="40" x2="240" y2="40" stroke="#cbd5e1" />
          <line x1="120" y1="2" x2="120" y2="72" stroke="#e2e8f0" stroke-dasharray="3 3" />
          <g v-if="imageVisible">
            <line :x1="viewX(0)" y1="10" :x2="viewX(0)" y2="40" stroke="#64748b" stroke-width="3" stroke-dasharray="4 2" />
            <text :x="viewX(0)" y="8" font-size="8" text-anchor="middle" fill="#475569">image of P1</text>
          </g>
          <g v-for="v in viewPins" :key="'v' + v.label">
            <line :x1="v.x" :y1="v.top" :x2="v.x" y2="72" :stroke="v.color" :stroke-width="v.width" />
            <text :x="v.x + 4" :y="v.top + 8" font-size="8" fill="#111827">{{ v.label }}</text>
          </g>
          <text v-if="!imageVisible" x="120" y="24" font-size="9" text-anchor="middle" fill="#b45309">{{ mirrorOn ? 'P1’s image is not in view - move the eye' : 'Mirror removed' }}</text>
        </svg>
        <p class="mt-1 font-semibold" :class="aligned ? 'text-emerald-700 dark:text-emerald-400' : 'text-gray-500 dark:text-gray-400'">{{ alignText }}</p>
      </div>

      <div v-if="paperShown && pinsReady" class="space-y-1.5">
        <p class="text-[10px] font-bold uppercase tracking-wide text-gray-400">Optical pins</p>
        <div class="grid grid-cols-3 gap-1">
          <button v-for="k in (['p1', 'p2', 'p3'] as const)" :key="k" type="button" :disabled="readOnly || (k !== 'p1' && !!trace)" @click="placing = placing === k ? null : k"
            class="px-2 py-1.5 font-semibold rounded-lg border disabled:opacity-40" :class="placing === k ? 'bg-indigo-600 text-white border-indigo-600' : 'border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200'">{{ pins[k] ? 'Move' : 'Stick' }} {{ k.toUpperCase() }}</button>
        </div>
        <p v-if="placing" class="text-[11px] text-indigo-700 dark:text-indigo-300">Click on the sheet to stick {{ placing.toUpperCase() }}{{ placing === 'p1' ? ' on the line RS' : '' }}.</p>
        <template v-if="pins.p1">
          <p class="text-gray-600 dark:text-gray-300">P1 is <strong>{{ objectDistance.toFixed(1) }} cm</strong> in front of the mirror</p>
          <div class="grid grid-cols-4 gap-1">
            <LabButton v-for="b in NUDGES" :key="'n' + b.d" size="sm" :disabled="readOnly || !!trace" @click="nudgeP1(b.d)">{{ b.label }}</LabButton>
          </div>
        </template>
      </div>

      <div v-if="paperShown && pinsReady" class="pt-2 border-t border-gray-100 dark:border-gray-700 space-y-1.5">
        <LabButton v-if="!trace" size="sm" :disabled="readOnly || !pins.p2 || !pins.p3" @click="traceRay">Remove mirror &amp; draw the ray</LabButton>
        <template v-else>
          <template v-if="!anglesRecorded">
            <LabButton v-if="!protractorPlaced" size="sm" :disabled="readOnly" @click="placeProtractor">Draw the normal &amp; place the protractor at T</LabButton>
            <form v-else class="space-y-1.5" @submit.prevent="recordAngles">
              <p class="text-[11px] text-gray-600 dark:text-gray-300">Read the protractor where each ray crosses its scale (degrees from the normal TN):</p>
              <div class="flex items-end gap-2">
                <label class="text-[11px] font-semibold text-violet-700 dark:text-violet-300">i (OT)<input v-model="typedI" type="number" min="0" max="90" step="1" :disabled="readOnly" class="input-field w-16 text-sm py-1 block" placeholder="°"></label>
                <label class="text-[11px] font-semibold text-emerald-700 dark:text-emerald-400">r (reflected)<input v-model="typedR" type="number" min="0" max="90" step="1" :disabled="readOnly" class="input-field w-16 text-sm py-1 block" placeholder="°"></label>
                <LabButton size="sm" variant="success" :disabled="readOnly" @click="recordAngles">Record</LabButton>
              </div>
            </form>
          </template>
          <LabButton v-else-if="!pendingReading" size="sm" :disabled="readOnly" @click="measureImage">Measure x (I to the mirror)</LabButton>
          <div v-else>
            <p class="text-[10px] font-semibold text-gray-400 uppercase tracking-wide mb-1">Image distance x</p>
            <div class="flex items-center gap-2">
              <span class="flex-1 text-base font-bold text-gray-900 dark:text-white">{{ pendingReading.value }}<span class="text-xs font-medium text-gray-400 ml-1">cm</span></span>
              <LabButton size="sm" variant="success" @click="confirmReading">Record</LabButton>
            </div>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
/*
 * Plane mirror - image distance against object distance by the no-parallax pin method
 * (render_component 'plane_mirror_pins'). A top view of the soft board: line ML (the mirror line)
 * across the white sheet and the normal RS through it. The student stands the mirror on ML, sticks
 * the object pin P1 on RS at a distance y in front, and from an eye position A sticks P2 and P3 so
 * that they and the image of P1 seen in the mirror are in one line. The "What the eye sees" strip
 * shows each one at the angle the eye sees it. Removing the mirror, the line through P3 and P2 is
 * drawn and produced behind ML to meet RS at I; x is the distance of I from the mirror.
 * The image of P1 is its reflection in ML, so a well-aligned line gives x close to y.
 */
import { ref, reactive, computed, watch } from 'vue'
import LabButton from './ui/LabButton.vue'
import type { SceneObjectConfig, LabObjectDef, LabAction } from '@/types/virtualLab'

interface Pt { x: number; y: number }
export interface MirrorPinTrial {
  /** Object distance y (P1 to the mirror), cm */
  object_cm: number
  /** The image distance x the student recorded, cm */
  image_cm: number
  /** Where their drawn line actually met RS (cm behind the mirror, unrounded to 0.01) */
  line_image_cm: number
  /** How far P2 and P3 were from the line of sight to the image, at worst (cm) */
  misalignment_cm: number
  /** Distance between P2 and P3, cm */
  pin_gap_cm: number
  /** Angle of incidence i and angle of reflection r at T, read with the protractor (nearest degree) */
  i_deg: number
  r_deg: number
}
export interface MirrorPinRecord {
  /** Tried to draw the ray before P2, P3 and the image were in line */
  misaligned_attempts: number
  /** Traces made with P2 and P3 close together (a less accurate line) */
  close_pins: number
  /** P1 stuck off the line RS */
  off_line_attempts: number
  /** Protractor readings typed more than a degree out */
  misread_angles?: number
}

const props = defineProps<{
  sceneObjects: SceneObjectConfig[]
  objectCatalog: LabObjectDef[]
  readOnly?: boolean
  currentStep?: { required_action: string; target_object_key: string | null; expected_value: string | null } | null
}>()
const emit = defineEmits<{
  action: [{ objectKey: string | null; action: LabAction; value: string | null; unit?: string | null; label?: string | null; targetObjectKey?: string | null; mirrorTrial?: MirrorPinTrial; mirrorRecord?: MirrorPinRecord }]
}>()

function catalogFor(objectType: string) {
  return props.objectCatalog.find(o => o.object_type === objectType)
}
const keyOf = (type: string, fallback: string) => props.sceneObjects.find(o => o.object_type === type)?.key ?? fallback
const boardKey = keyOf('soft_board', 'board1')
const mirrorKey = keyOf('mirror', 'mirror1')
const pinsKey = keyOf('optical_pin', 'pins1')
const rulerKey = keyOf('ruler', 'ruler1')
const protractorKey = keyOf('protractor', 'protractor1')
const LABELS: Record<string, string> = { soft_board: 'Soft board & white sheet', mirror: 'Plane mirror', optical_pin: 'Optical pins (4)', ruler: 'Ruler (geometry set)', protractor: 'Protractor (geometry set)' }

// Sheet geometry, in cm: ML across at ML_Y, the normal RS down at RS_X
const W = 30, H = 22, ML_Y = 11, RS_X = 6, MIRROR_HALF = 11
const TICKS = Array.from({ length: 21 }, (_, i) => i - 10)
// The ruler along RS: 1.1 cm wide, graduated every millimetre from 10 cm behind ML to 10 cm in front
const RULER_W = 1.1
const RULER_MM = Array.from({ length: 201 }, (_, i) => i - 100)
const NUDGES = [{ d: -1, label: '-1 cm' }, { d: -0.1, label: '-1 mm' }, { d: 0.1, label: '+1 mm' }, { d: 1, label: '+1 cm' }]
/** A pin counts as in line when it is within this distance (cm) of the line from the eye to the image */
const ALIGN_TOLERANCE_CM = 0.08

const round1 = (n: number) => Math.round(n * 10) / 10
const round2 = (n: number) => Math.round(n * 100) / 100
const deg = (a: number) => (a * 180) / Math.PI

// --- Tray -----------------------------------------------------------------------------------------
const picked = reactive(new Set<string>())
const trayItems = computed(() => props.sceneObjects.filter(o => !picked.has(o.key)))
const paperShown = computed(() => picked.has(boardKey))
// pins come into play once the mirror stands on ML (and stay while this trial's ray is drawn)
const pinsReady = computed(() => picked.has(pinsKey) && (mirrorOn.value || !!trace.value))
const eyeShown = computed(() => pinsReady.value && !trace.value)
let readySent = false
function pickFromTray(key: string) {
  if (props.readOnly) return
  picked.add(key)
  if (!readySent && trayItems.value.length === 0) {
    readySent = true
    emit('action', { objectKey: null, action: 'move', value: 'apparatus_ready', mirrorRecord: { ...record } })
  }
}

// --- State ------------------------------------------------------------------------------------------
const mirrorOn = ref(false)
const mirrorPos = reactive<Pt>({ x: 15, y: 19.5 })
const mirrorShown = computed(() => picked.has(mirrorKey) && !trace.value)
const pins = reactive<{ p1: Pt | null; p2: Pt | null; p3: Pt | null }>({ p1: null, p2: null, p3: null })
const eye = reactive<Pt>({ x: 25, y: 19.5 })
const placing = ref<'p1' | 'p2' | 'p3' | null>(null)
const trace = ref<{ o: Pt; t: Pt; i: Pt; p3: Pt; far: Pt; misalignment: number } | null>(null)
const history = ref<{ o: Pt; t: Pt; i: Pt; p3: Pt }[]>([])
const record = reactive<MirrorPinRecord>({ misaligned_attempts: 0, close_pins: 0, off_line_attempts: 0 })
const hint = ref<string | null>(null)
function flash(text: string) {
  hint.value = text
  setTimeout(() => { if (hint.value === text) hint.value = null }, 3800)
}

const PIN_COLORS = { p1: '#dc2626', p2: '#2563eb', p3: '#16a34a' }
const pinList = computed(() => (['p1', 'p2', 'p3'] as const).filter(k => pins[k]).map(k => ({ key: k, label: k.toUpperCase(), pos: pins[k]!, color: PIN_COLORS[k] })))
const objectDistance = computed(() => (pins.p1 ? round1(pins.p1.y - ML_Y) : 0))

// --- Optics: the image of P1 is its reflection in ML ----------------------------------------------------
const image = computed<Pt | null>(() => (pins.p1 ? { x: pins.p1.x, y: 2 * ML_Y - pins.p1.y } : null))
const angleTo = (from: Pt, to: Pt) => Math.atan2(to.y - from.y, to.x - from.x)
/** The image is seen if the line from the eye to it crosses ML on the mirror */
const imageVisible = computed(() => {
  if (!mirrorOn.value || !image.value || eye.y <= ML_Y) return false
  const I = image.value
  const xT = eye.x + (I.x - eye.x) * (ML_Y - eye.y) / (I.y - eye.y)
  return xT >= mirrorPos.x - MIRROR_HALF && xT <= mirrorPos.x + MIRROR_HALF
})
const refAngle = computed(() => (imageVisible.value ? angleTo(eye, image.value!) : null))
/** Angle (degrees) at which the eye sees a point, relative to the image's direction */
function offsetDeg(p: Pt): number | null {
  if (refAngle.value === null) return null
  let d = deg(angleTo(eye, p) - refAngle.value)
  d = ((d + 540) % 360) - 180
  return Math.abs(d) > 60 ? null : d
}
const viewX = (d: number) => Math.max(6, Math.min(234, 120 + d * 22))
const viewPins = computed(() => (['p2', 'p3'] as const).filter(k => pins[k]).map((k) => {
  const p = pins[k]!
  const off = offsetDeg(p)
  const dist = Math.hypot(p.x - eye.x, p.y - eye.y)
  return { label: k.toUpperCase(), x: off === null ? -20 : viewX(off), top: Math.max(14, 44 - 260 / Math.max(dist, 2)), width: Math.max(2, Math.min(7, 40 / Math.max(dist, 2))), color: PIN_COLORS[k] }
}).filter(v => v.x > 0))
/** Sideways distance (cm) of a pin from the line of sight from the eye to the image of P1 */
function offLine(p: Pt): number | null {
  if (!imageVisible.value || offsetDeg(p) === null) return null
  const I = image.value!
  const dx = I.x - eye.x, dy = I.y - eye.y
  return Math.abs((p.x - eye.x) * dy - (p.y - eye.y) * dx) / Math.hypot(dx, dy)
}
const misalignment = computed(() => {
  if (!pins.p2 || !pins.p3) return null
  const a = offLine(pins.p2), b = offLine(pins.p3)
  return a === null || b === null ? null : Math.max(a, b)
})
const aligned = computed(() => misalignment.value !== null && misalignment.value <= ALIGN_TOLERANCE_CM)

/** Where the line of sight from the eye to the image meets the mirror (ML) - the dotted line ends here */
const sightT = computed<Pt | null>(() => {
  if (!imageVisible.value) return null
  const I = image.value!
  return { x: eye.x + (I.x - eye.x) * (ML_Y - eye.y) / (I.y - eye.y), y: ML_Y }
})
const sightAngle = computed(() => (sightT.value ? deg(Math.atan2(sightT.value.y - eye.y, sightT.value.x - eye.x)) + (sightT.value.x < eye.x ? 180 : 0) : 0))
/** A pin dropped close to the line of sight goes exactly onto it (as a student moves it until it hides the image) */
const SNAP_CM = 0.4
function snapToSight(p: Pt): { p: Pt; onLine: boolean } {
  if (!imageVisible.value) return { p, onLine: false }
  const d = offLine(p)
  if (d === null || d > SNAP_CM) return { p, onLine: false }
  const I = image.value!
  const dx = I.x - eye.x, dy = I.y - eye.y
  const t = ((p.x - eye.x) * dx + (p.y - eye.y) * dy) / (dx * dx + dy * dy)
  return { p: { x: eye.x + dx * t, y: eye.y + dy * t }, onLine: true }
}
const onSight = (k: 'p2' | 'p3') => !!pins[k] && (offLine(pins[k]!) ?? 99) <= ALIGN_TOLERANCE_CM

/** This trial's actions, in order */
const todo = computed(() => {
  if (!paperShown.value || trayItems.value.length) return []
  const list: { text: string; done: boolean }[] = []
  list.push({ text: 'Drag the mirror onto the line ML.', done: mirrorOn.value || !!trace.value })
  const want = stepDistance.value
  list.push({ text: want !== null ? `Click "Stick P1", then click on RS ${want.toFixed(1)} cm in front of the mirror (fine-tune with the P1 buttons).` : (pins.p1 ? `Stick P1 on RS (${objectDistance.value.toFixed(1)} cm in front of the mirror).` : 'Stick P1 on RS at the distance the step gives.'), done: !!pins.p1 && (want === null || Math.abs(objectDistance.value - want) <= 0.05) })
  list.push({ text: 'Look into the mirror from the eye: a dotted line of sight appears. (No line? Drag the eye.)', done: imageVisible.value || !!trace.value })
  list.push({ text: 'Click "Stick P2", then click on the dotted line close to the mirror.', done: onSight('p2') || !!trace.value })
  list.push({ text: 'Click "Stick P3", then click on the dotted line near the eye - far from P2.', done: onSight('p3') || !!trace.value })
  list.push({ text: 'Click "Remove mirror & draw the ray".', done: !!trace.value })
  list.push({ text: 'Click "Draw the normal & place the protractor at T".', done: protractorPlaced.value || anglesRecorded.value })
  list.push({ text: 'Read i (incident ray OT) and r (reflected ray) on the protractor, type them in and click "Record".', done: anglesRecorded.value })
  list.push({ text: 'Click "Measure x", then "Record".', done: false })
  const first = list.findIndex(t => !t.done)
  return list.map((t, i) => ({ ...t, current: i === first }))
})

// P3, P2 and the image in line completes the "stick P2 and P3" step
let alignedSent = false
watch(aligned, (ok) => {
  if (!ok || alignedSent || trace.value || !stepIs('move', 'pins_aligned') || !props.currentStep) return
  alignedSent = true
  emit('action', { objectKey: pinsKey, action: 'move', value: 'pins_aligned', mirrorRecord: { ...record } })
})
watch(() => props.currentStep?.expected_value, (v) => { if (v === 'pins_aligned' && aligned.value && !alignedSent && !trace.value) { alignedSent = true; emit('action', { objectKey: pinsKey, action: 'move', value: 'pins_aligned', mirrorRecord: { ...record } }) } })
const alignText = computed(() => {
  if (!imageVisible.value) return ''
  if (!pins.p2 || !pins.p3) return 'Stick P2, then P3, so they cover the image of P1.'
  return aligned.value ? 'P3, P2 and the image of P1 are in one line.' : 'Not in line yet - move P2 or P3 (or the eye).'
})

// --- Pointer -------------------------------------------------------------------------------------------
const svgEl = ref<SVGSVGElement | null>(null)
type DragKey = 'p1' | 'p2' | 'p3' | 'eye' | 'mirror'
const drag = ref<DragKey | null>(null)
function toPaper(ev: PointerEvent): Pt {
  const svg = svgEl.value!
  const pt = svg.createSVGPoint()
  pt.x = ev.clientX; pt.y = ev.clientY
  const q = pt.matrixTransform(svg.getScreenCTM()!.inverse())
  return { x: q.x, y: q.y }
}
function onPaperDown(ev: PointerEvent) {
  if (props.readOnly || !placing.value || !paperShown.value) return
  setPin(placing.value, toPaper(ev))
  placing.value = null
}
function startDrag(key: DragKey, ev: PointerEvent) {
  if (props.readOnly || placing.value) return
  if (key !== 'p1' && key !== 'eye' && key !== 'mirror' && trace.value) return
  if (key === 'p1' && trace.value) return
  drag.value = key
  ;(ev.target as Element).setPointerCapture?.(ev.pointerId)
}
function onMove(ev: PointerEvent) {
  if (!drag.value) return
  const p = toPaper(ev)
  if (drag.value === 'eye') { eye.x = Math.min(W - 0.8, Math.max(0.8, p.x)); eye.y = Math.min(H - 0.6, Math.max(ML_Y + 1, p.y)); return }
  if (drag.value === 'mirror') { mirrorPos.x = 15; mirrorPos.y = Math.min(H - 0.5, Math.max(1, p.y)); return }
  setPin(drag.value, p, true)
}
function onUp() {
  if (drag.value === 'mirror') {
    if (Math.abs(mirrorPos.y - ML_Y) <= 1.2) {
      mirrorPos.y = ML_Y
      if (!mirrorOn.value) {
        mirrorOn.value = true
        emit('action', { objectKey: mirrorKey, action: 'move', value: 'ML', mirrorRecord: { ...record } })
      }
    } else {
      mirrorOn.value = false
      flash('Stand the mirror on the line ML.')
    }
  }
  if (drag.value === 'p2' || drag.value === 'p3') {
    const k = drag.value
    if (pins[k]) {
      const snapped = snapToSight(pins[k]!)
      pins[k] = snapped.p
    }
  }
  drag.value = null
}

function setPin(key: 'p1' | 'p2' | 'p3', p: Pt, dragging = false) {
  if (key === 'p1') {
    if (Math.abs(p.x - RS_X) > 1.2) {
      if (!dragging) { record.off_line_attempts++; flash('Stick P1 on the line RS, in front of the mirror.') }
      return
    }
    pins.p1 = { x: RS_X, y: Math.min(H - 0.5, Math.max(ML_Y + 0.5, round1(p.y))) }
    if (!dragging) checkObjectStep()
    return
  }
  if (p.y <= ML_Y + 0.3) { if (!dragging) flash('The pins go in front of the mirror, on the same side as P1.'); return }
  let q = p
  if (!dragging) {
    const snapped = snapToSight(p)
    q = snapped.p
    if (!snapped.onLine) flash(imageVisible.value ? 'Put the pin on the dotted line of sight - then it hides the image of P1.' : 'First move the eye until you can see the image of P1 (the dotted line appears).')
  }
  pins[key] = { x: Math.min(W - 0.3, Math.max(0.3, q.x)), y: Math.min(H - 0.3, q.y) }
}
function nudgeP1(d: number) {
  if (props.readOnly || !pins.p1 || trace.value) return
  setPin('p1', { x: RS_X, y: pins.p1.y + d })
}
watch(() => pins.p1?.y, () => { if (!drag.value) checkObjectStep() })
watch(drag, (d, was) => { if (!d && was === 'p1') checkObjectStep() })

/** The object distance the current step asks for, if it is a "stick P1" step */
const stepDistance = computed(() => {
  const st = props.currentStep
  if (!st || st.required_action !== 'move' || st.target_object_key !== pinsKey || st.expected_value === null) return null
  const n = Number(st.expected_value)
  return Number.isFinite(n) ? n : null
})
let lastObjectEmit: string | null = null
function checkObjectStep() {
  if (!pins.p1 || stepDistance.value === null || drag.value) return
  if (Math.abs(objectDistance.value - stepDistance.value) <= 0.05) {
    const v = stepDistance.value.toFixed(1)
    if (lastObjectEmit === v) return
    lastObjectEmit = v
    emit('action', { objectKey: pinsKey, action: 'move', value: v, unit: 'cm', mirrorRecord: { ...record } })
  }
}
watch(stepDistance, () => checkObjectStep())

// --- Tracing and measuring ----------------------------------------------------------------------------
function stepIs(action: string, value: string | null = null) {
  const st = props.currentStep
  return !st || (st.required_action === action && (value === null || st.expected_value === value))
}
function traceRay() {
  if (props.readOnly || !pins.p1 || !pins.p2 || !pins.p3) return
  if (!stepIs('move', 'ray_traced')) { flash(stepIs('move', 'pins_aligned') ? 'Stick P2 and P3 on the dotted line of sight first.' : 'Follow the steps - stick P1 where the step says first.'); return }
  if (!imageVisible.value) { flash('Look at the image of P1 in the mirror first - move the eye until you can see it.'); return }
  if (!aligned.value) {
    record.misaligned_attempts++
    flash('P2 and P3 must both be on the dotted line of sight before you remove the mirror.')
    return
  }
  const a = pins.p3, b = pins.p2
  if (Math.abs(b.y - a.y) < 1e-6) return
  // the line through P3 and P2, produced: where it meets ML (T) and RS behind the mirror (I)
  const atY = (y: number): Pt => ({ x: a.x + (b.x - a.x) * (y - a.y) / (b.y - a.y), y })
  const t = atY(ML_Y)
  const s = (RS_X - a.x) / (b.x - a.x)
  const i: Pt = { x: RS_X, y: a.y + (b.y - a.y) * s }
  const far = a.y > b.y ? a : b
  const gap = Math.hypot(a.x - b.x, a.y - b.y)
  if (gap < 4) { record.close_pins++; flash('Tip: stick P2 and P3 further apart - the line through them is then more accurate.') }
  trace.value = { o: { ...pins.p1 }, t, i, p3: { ...a }, far: { ...far }, misalignment: misalignment.value ?? 0 }
  mirrorOn.value = false
  emit('action', { objectKey: null, action: 'move', value: 'ray_traced', mirrorRecord: { ...record } })
}

// --- Angles of incidence and reflection at T (the laws of reflection) -----------------------------------
const PROT_R = 3.4
const PROT_TICKS = Array.from({ length: 181 }, (_, k) => k)
const PROT_LABELS = Array.from({ length: 19 }, (_, k) => k * 10)
/** Point on the protractor at angle d (degrees round from the +x direction, on the room side of ML) */
function pxAt(d: number, r: number): Pt {
  const a = (d * Math.PI) / 180
  return { x: (trace.value?.t.x ?? 0) + Math.cos(a) * r, y: ML_Y + Math.sin(a) * r }
}
const protractorPlaced = ref(false)
const typedI = ref('')
const typedR = ref('')
/** Recorded this trial (drawn on the sheet) */
const angles = ref<{ i: number; r: number } | null>(null)
const anglesRecorded = ref(false)
/** Angle (degrees) between the normal at T (pointing into the room, +y) and the ray from T to p */
function angleFromNormal(p: Pt): number {
  const t = trace.value!.t
  return deg(Math.atan2(Math.abs(p.x - t.x), p.y - t.y))
}
const ARC_R = 1.3
function arcPath(p: Pt): string {
  const t = trace.value!.t
  const len = Math.hypot(p.x - t.x, p.y - t.y) || 1
  const u = { x: (p.x - t.x) / len, y: (p.y - t.y) / len }
  return `M ${t.x} ${t.y + ARC_R} A ${ARC_R} ${ARC_R} 0 0 ${u.x < 0 ? 1 : 0} ${t.x + u.x * ARC_R} ${t.y + u.y * ARC_R}`
}
function angleLabel(p: Pt): Pt {
  const t = trace.value!.t
  // just outside the arc, on the ray's own side of the normal
  const side = p.x < t.x ? -1 : 1
  return { x: t.x + side * 0.35, y: t.y + ARC_R + 0.75 }
}
function placeProtractor() {
  if (props.readOnly || !trace.value) return
  if (!picked.has(protractorKey)) { flash('Take the protractor from the tray first.'); return }
  protractorPlaced.value = true
}
/** The student's own protractor readings - accepted within a degree of where the rays really cross */
function recordAngles() {
  if (props.readOnly || !trace.value) return
  const i = Number(typedI.value), r = Number(typedR.value)
  if (typedI.value === '' || typedR.value === '' || !Number.isFinite(i) || !Number.isFinite(r)) { flash('Type both readings, i and r.'); return }
  const trueI = angleFromNormal(trace.value.o), trueR = angleFromNormal(trace.value.far)
  const badI = Math.abs(i - trueI) > 1.2, badR = Math.abs(r - trueR) > 1.2
  if (badI || badR) {
    record.misread_angles = (record.misread_angles ?? 0) + 1
    flash(`Read ${badI && badR ? 'both angles' : badI ? 'i' : 'r'} again - find where ${badI && !badR ? 'the incident ray OT' : !badI ? 'the reflected ray' : 'each ray'} crosses the protractor scale, counting from 0 at the normal.`)
    return
  }
  angles.value = { i: Math.round(i), r: Math.round(r) }
  anglesRecorded.value = true
  // logged against the step only when the step list has the angles step (a page opened before it was
  // added keeps working instead of getting stuck)
  const st = props.currentStep
  if (!st || (st.required_action === 'measure' && st.target_object_key === protractorKey)) {
    emit('action', { objectKey: protractorKey, action: 'measure', value: String(Math.round(i)), unit: '°', label: 'Angles i and r', targetObjectKey: protractorKey, mirrorRecord: { ...record } })
  }
}

const pendingReading = ref<{ value: string; trial: MirrorPinTrial } | null>(null)
function measureImage() {
  if (props.readOnly || !trace.value || !pins.p2 || !pins.p3) return
  if (!anglesRecorded.value || !angles.value) { flash('Draw the normal at T and measure i and r first.'); return }
  if (!stepIs('measure')) { flash('Follow the steps.'); return }
  const lineX = ML_Y - trace.value.i.y
  pendingReading.value = {
    value: round1(lineX).toFixed(1),
    trial: {
      object_cm: objectDistance.value,
      image_cm: round1(lineX),
      line_image_cm: round2(lineX),
      misalignment_cm: round2(trace.value.misalignment),
      pin_gap_cm: round1(Math.hypot(pins.p2.x - pins.p3.x, pins.p2.y - pins.p3.y)),
      i_deg: angles.value.i,
      r_deg: angles.value.r,
    },
  }
}
function confirmReading() {
  const p = pendingReading.value
  if (!p || !trace.value) return
  pendingReading.value = null
  emit('action', { objectKey: rulerKey, action: 'measure', value: p.value, unit: 'cm', label: 'Image distance x', targetObjectKey: rulerKey, mirrorTrial: p.trial, mirrorRecord: { ...record } })
  // ready for the next trial: this ray stays on the sheet, the mirror goes back on ML
  history.value.push({ o: trace.value.o, t: trace.value.t, i: trace.value.i, p3: trace.value.p3 })
  trace.value = null
  pins.p2 = null
  pins.p3 = null
  alignedSent = false
  angles.value = null
  anglesRecorded.value = false
  protractorPlaced.value = false
  typedI.value = ''
  typedR.value = ''
  mirrorPos.y = ML_Y
  mirrorOn.value = true
}

function setObjectState() {
  // Nothing switchable - kept for the renderer interface.
}
function goToView() {
  // A flat top view of the board - there are no camera positions to move between.
}
if (!props.readOnly) setTimeout(() => flash('Take the apparatus from the tray, then follow "What to do now" on the right.'), 400)

defineExpose({ angles, anglesRecorded, placeProtractor, recordAngles, typedI, typedR, protractorPlaced, angleFromNormal, sightT, todo, setObjectState, goToView, pickFromTray, pins, eye, mirrorPos, mirrorOn, setPin, traceRay, measureImage, confirmReading, pendingReading, aligned, misalignment, imageVisible, image, record, trace, onUp, drag, offsetDeg })
</script>
