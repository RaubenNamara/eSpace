<template>
  <LabUnsupported v-if="unsupported" />
  <div v-else class="relative w-full h-full rounded-xl overflow-hidden bg-white select-none">
    <div ref="labHost" class="absolute inset-0" :style="{ cursor: hoverCursor }" @pointerdown.capture="onPointerDown" @pointermove="onHover"></div>

    <!-- Hand lens view -->
    <div v-if="lensActive" class="absolute inset-0 pointer-events-none" style="background: radial-gradient(circle at 50% 50%, transparent 0, transparent 34%, rgba(15,23,42,0.55) 35.5%, rgba(15,23,42,0.85) 60%)"></div>

    <!-- Frog anatomy: find the parts -->
    <div v-if="phase === 'anatomy'" class="absolute left-2 top-2 bottom-20 sm:left-3 sm:top-3 w-[11.5rem] bg-slate-100/95 dark:bg-gray-800/95 rounded-xl border border-slate-200 dark:border-gray-700 p-3 overflow-y-auto text-gray-800 dark:text-gray-100">
      <p class="text-[15px] font-extrabold tracking-wide mb-0.5">Find the parts</p>
      <p class="text-[11px] text-gray-500 dark:text-gray-400 mb-2.5">Click or tap different parts of the frog to find the following.</p>
      <button type="button" @click="chooseSection('external')" class="flex items-center gap-1.5 text-sm font-bold mb-1" :class="section === 'external' ? 'text-gray-900 dark:text-white' : 'text-gray-500 dark:text-gray-400'">
        External <span class="text-base leading-none" :title="section === 'external' ? 'Showing the outside' : 'Show the outside'">{{ section === 'external' ? '\u{1F441}️' : '\u{1F441}' }}</span>
      </button>
      <ul class="space-y-1 mb-3">
        <li v-for="p in EXTERNAL" :key="p.key" class="flex items-start gap-2 text-[13px] leading-tight">
          <span class="mt-px w-4 h-4 flex-shrink-0 rounded border-2 flex items-center justify-center text-[10px] font-bold" :class="record.features_found.includes(p.key) ? 'bg-emerald-600 border-emerald-600 text-white' : 'border-gray-400 bg-white dark:bg-gray-900'">{{ record.features_found.includes(p.key) ? '✓' : '' }}</span>
          <span>{{ p.label }}</span>
        </li>
      </ul>
      <button type="button" @click="chooseSection('internal')" class="flex items-center gap-1.5 text-sm font-bold mb-1" :class="section === 'internal' ? 'text-gray-900 dark:text-white' : 'text-gray-500 dark:text-gray-400'">
        Internal <span class="text-base leading-none" :title="section === 'internal' ? 'Showing the organs inside' : 'See the organs inside'">{{ section === 'internal' ? '\u{1F441}️' : '\u{1F441}' }}</span>
      </button>
      <p class="text-[11px] text-gray-500 dark:text-gray-400 mb-1.5">Click the eye to see inside the living frog. You can discover more organs than those listed, but you must find these six.</p>
      <ul class="space-y-1">
        <li v-for="p in INTERNAL" :key="p.key" class="flex items-start gap-2 text-[13px] leading-tight">
          <span class="mt-px w-4 h-4 flex-shrink-0 rounded border-2 flex items-center justify-center text-[10px] font-bold" :class="record.organs_found.includes(p.key) ? 'bg-emerald-600 border-emerald-600 text-white' : 'border-gray-400 bg-white dark:bg-gray-900'">{{ record.organs_found.includes(p.key) ? '✓' : '' }}</span>
          <span>{{ p.label }}</span>
        </li>
      </ul>
    </div>

    <!-- Frog anatomy: the control bar -->
    <div v-if="phase === 'anatomy'" class="absolute bottom-2 sm:bottom-3 left-1/2 -translate-x-1/2 flex flex-nowrap items-center justify-center gap-2 px-3 py-1.5 rounded-2xl bg-gray-900/90 whitespace-nowrap text-white text-[12px] font-semibold shadow-lg max-w-[calc(100%-1rem)]">
      <div class="relative">
        <button type="button" @click="menuOpen = !menuOpen" class="flex items-center gap-1.5 px-1 py-0.5 rounded-md hover:bg-white/10" aria-haspopup="menu" :aria-expanded="menuOpen" data-section-menu>
          <span aria-hidden="true">{{ currentSection.icon }}</span>
          <span>{{ sectionLabel(currentSection) }}</span>
          <span class="text-[10px]">&#9662;</span>
        </button>
        <!-- External / internal, anatomy planes and anatomy systems -->
        <div v-if="menuOpen" role="menu" class="absolute bottom-full mb-3 left-0 w-60 max-h-[19rem] overflow-y-auto rounded-xl bg-gray-900 shadow-2xl border border-gray-700 p-2 whitespace-normal">
          <template v-for="g in SECTION_GROUPS" :key="g.title">
            <p v-if="g.title" class="px-2 pt-2 pb-1 text-[10px] font-extrabold uppercase tracking-wider text-gray-400 border-t border-gray-700 mt-1">{{ g.title }}</p>
            <button v-for="it in g.items" :key="it.key" type="button" role="menuitem" @click="chooseSection(it.key)"
              class="w-full flex items-center gap-2.5 px-2 py-2 rounded-lg text-left text-[13px] font-semibold"
              :class="section === it.key ? 'bg-white text-gray-900' : 'text-white hover:bg-white/10'">
              <span class="text-lg leading-none w-6 text-center">{{ it.icon }}</span>
              <span>{{ sectionLabel(it) }}</span>
            </button>
          </template>
        </div>
      </div>
      <select :value="view" @change="setView(($event.target as HTMLSelectElement).value as ViewKey)" class="bg-transparent border-0 text-white text-[12px] font-semibold py-0 pl-0 pr-6 focus:ring-0 cursor-pointer" aria-label="View">
        <option v-for="v in VIEW_KEYS" :key="v" :value="v" class="text-gray-900">{{ viewLabel(v) }}</option>
      </select>
      <label class="flex items-center gap-1.5">
        <span class="hidden md:inline">Drag Sensitivity:</span>
        <select v-model.number="sensitivity" class="bg-gray-700 border border-gray-500 rounded-md text-white text-[12px] py-0 pl-1.5 pr-6 focus:ring-0 cursor-pointer" aria-label="Drag sensitivity">
          <option :value="0.025" class="text-gray-900">0.025</option>
          <option :value="0.05" class="text-gray-900">0.05</option>
          <option :value="0.1" class="text-gray-900">0.1</option>
        </select>
      </label>
    </div>

    <!-- First time: how to turn the frog -->
    <div v-if="phase === 'anatomy' && !dragged" class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none px-4 py-3 rounded-2xl bg-gray-900/80 text-white text-center shadow-xl">
      <div class="text-2xl leading-none mb-1">&#x2194;&#xFE0F;&#x1F446;</div>
      <p class="text-sm font-bold">Drag the frog left or right.</p>
    </div>

    <!-- The part just clicked -->
    <div v-if="tip" class="absolute pointer-events-none px-2 py-1 rounded-md bg-gray-900 text-white text-[11px] font-semibold shadow -translate-x-1/2 whitespace-nowrap" :style="{ left: tip.x + 'px', top: tip.y + 16 + 'px' }">{{ tip.text }}</div>

    <!-- Apparatus tray -->
    <div v-if="showTray" class="absolute left-2 top-2 sm:left-3 sm:top-3 max-w-[10rem] bg-white/95 dark:bg-gray-800/95 backdrop-blur rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-2.5 max-h-[calc(100%-1rem)] sm:max-h-[calc(100%-1.5rem)] overflow-y-auto">
      <p class="text-[10px] font-bold uppercase tracking-wide text-gray-400 dark:text-gray-500 mb-1.5">Apparatus Tray</p>
      <div class="space-y-1">
        <button v-for="item in trayItems" :key="item.key" @click="pickFromTray(item.key)" class="w-full flex items-center gap-1.5 px-2 py-1.5 text-xs font-medium rounded-lg bg-gray-50 dark:bg-gray-900/40 text-gray-700 dark:text-gray-200 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors text-left">
          <span>{{ catalogFor(item.object_type)?.icon || '\u{1F9EA}' }}</span>
          <span class="truncate">{{ trayLabel(item) }}</span>
        </button>
      </div>
    </div>

    <!-- Dissection: instruments and the frog -->
    <div v-if="phase !== 'anatomy' || (anatomyDone && trayItems.length === 0)" class="absolute right-2 top-2 sm:right-3 sm:top-3 w-[12.5rem] bg-white/95 dark:bg-gray-800/95 backdrop-blur rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-2.5 overflow-y-auto space-y-2 text-xs" :class="sortOpen ? 'max-h-[calc(100%-10.5rem)]' : 'max-h-[calc(100%-4rem)]'">
      <div v-if="trayItems.length === 0">
        <p class="font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide text-[10px] mb-1">Instrument in your hand</p>
        <div class="grid grid-cols-2 gap-1">
          <button v-for="t in TOOLS" :key="t.key" type="button" :disabled="readOnly" @click="selectTool(t.key)"
            class="flex items-center gap-1 px-2 py-1.5 rounded-lg border text-[11px] font-semibold transition-colors"
            :class="tool === t.key ? 'border-indigo-500 bg-indigo-600 text-white' : 'border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200 hover:bg-indigo-50 dark:hover:bg-indigo-900/30'">
            <span>{{ t.icon }}</span><span class="truncate">{{ t.label }}</span>
          </button>
        </div>
        <p class="mt-1 text-[10px] text-gray-400 dark:text-gray-500">{{ TOOL_HELP[tool] }}</p>
      </div>
      <div class="pt-2 border-t border-gray-100 dark:border-gray-700">
        <p class="font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide text-[10px] mb-1">The frog</p>
        <template v-if="phase === 'anatomy'">
          <LabButton size="sm" variant="success" class="w-full" :disabled="readOnly" @click="layOnBack()">Lay it on its back to dissect</LabButton>
        </template>
        <template v-else>
          <p class="text-[11px] text-gray-600 dark:text-gray-300 mb-1">On its back for dissection{{ pinnedFeet.size ? ` (${pinnedFeet.size} of 4 feet pinned)` : '' }}. Drag to look round it.</p>
          <button v-if="bodyOpen" type="button" @click="alive = !alive" class="mt-1 w-full flex items-center justify-between gap-2 px-2 py-1.5 rounded-lg border text-[11px] font-semibold" :class="alive ? 'border-rose-300 bg-rose-50 text-rose-700 dark:border-rose-700 dark:bg-rose-900/30 dark:text-rose-300' : 'border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300'">
            <span>&#10084;&#65039; Living functions</span><span>{{ alive ? 'On' : 'Off' }}</span>
          </button>
          <p v-if="bodyOpen && alive" class="mt-1 text-[10px] text-gray-500 dark:text-gray-400">The heart beats, the lungs fill and empty and the intestine moves food along - as in a living frog. Click an organ to read what it does.</p>
        </template>
      </div>
    </div>

    <!-- About the part you clicked -->
    <div v-if="info" class="absolute w-[16rem] max-w-[calc(100%-1rem)] bg-white/95 dark:bg-gray-800/95 backdrop-blur rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-2.5 text-xs" :class="phase === 'anatomy' ? 'right-2 top-2 sm:right-3 sm:top-3' : sortOpen ? 'left-2 top-12 sm:left-3' : 'left-2 top-2 sm:left-3 sm:top-3'">
      <div class="flex items-start justify-between gap-2 mb-1">
        <p class="font-bold text-gray-900 dark:text-white text-sm">{{ info.name }}</p>
        <button type="button" @click="infoKey = null" class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 leading-none text-base" aria-label="Close">&times;</button>
      </div>
      <p class="text-gray-700 dark:text-gray-200"><span class="font-semibold">What it does: </span>{{ info.fn }}</p>
      <p class="mt-1 text-gray-600 dark:text-gray-300"><span class="font-semibold">In the living frog: </span>{{ info.life }}</p>
      <button v-if="closeUpKey" type="button" class="mt-2 w-full px-2 py-1.5 rounded-lg bg-emerald-600 text-white text-[12px] font-semibold hover:bg-emerald-700" @click="closeUpOrgan = closeUpKey">
        &#x1F50D; Close-up{{ closeUpKey === 'heart' ? ': heartbeat and blood flow' : '' }}
      </button>
    </div>

    <!-- one organ on its own, enlarged (a view only: it never changes the dissection) -->
    <FrogOrganCloseUp v-if="closeUpOrgan && model()" :organ="closeUpOrgan" :frog="model()!" :title="INFO[closeUpOrgan]?.name ?? closeUpOrgan" :info="INFO[closeUpOrgan] ?? null" @close="closeUpOrgan = null" />

    <!-- Deep dissection: a box for each organ -->
    <div v-if="sortOpen" class="absolute inset-x-2 bottom-2 sm:inset-x-3 sm:bottom-3 bg-white/95 dark:bg-gray-800/95 backdrop-blur rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-2">
      <p class="text-[11px] font-semibold text-gray-600 dark:text-gray-300 mb-1.5 text-center">{{ heldOrgan ? 'Click the box this organ belongs in.' : 'Lift an organ out with the forceps, then put it in its box.' }} <span class="text-gray-400">({{ sorted.length }}/{{ BOXES.length }})</span></p>
      <div class="grid grid-cols-3 sm:grid-cols-4 gap-1">
        <button v-for="b in BOXES" :key="b.key" type="button" :disabled="readOnly || sorted.includes(b.key)" @click="pickBox(b.key)"
          class="flex items-center gap-1.5 px-1.5 py-1 rounded-lg border text-[10px] sm:text-[11px] font-semibold text-left transition-colors"
          :class="sorted.includes(b.key) ? 'border-emerald-300 bg-emerald-50 text-emerald-700 dark:border-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300' : heldOrgan ? 'border-indigo-300 border-dashed text-gray-700 dark:text-gray-200 hover:bg-indigo-50 dark:hover:bg-indigo-900/30' : 'border-gray-300 border-dashed text-gray-500 dark:text-gray-400'">
          <span class="w-3 h-3 rounded-full flex-shrink-0" :style="{ background: sorted.includes(b.key) ? b.colour : 'transparent', border: '1.5px solid ' + b.colour }"></span>
          <span class="truncate">{{ b.label }}</span>
          <span v-if="sorted.includes(b.key)" class="ml-auto">&#10003;</span>
        </button>
      </div>
    </div>

    <div v-if="phase !== 'anatomy'" class="absolute left-2 sm:left-3 flex gap-1.5" :class="sortOpen ? 'top-2 sm:top-3' : 'bottom-2 sm:bottom-3'">
      <button @click="resetView" class="px-3 py-1.5 text-xs font-semibold rounded-lg bg-white/95 dark:bg-gray-800/95 shadow-lg border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700">Reset View</button>
      <button v-if="lensActive" @click="stopLens()" class="px-3 py-1.5 text-xs font-semibold rounded-lg bg-white/95 dark:bg-gray-800/95 shadow-lg border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700">Put the lens down</button>
    </div>

    <transition enter-active-class="transition duration-200 ease-out" enter-from-class="opacity-0 -translate-y-1" leave-active-class="transition duration-150 ease-in" leave-to-class="opacity-0">
      <div v-if="hint" class="absolute left-1/2 -translate-x-1/2 top-2 sm:top-3 bg-amber-500 text-white text-xs font-medium px-4 py-2 rounded-2xl shadow-lg text-center max-w-[min(26rem,calc(100%-2rem))] z-10">{{ hint }}</div>
    </transition>
  </div>
</template>

<script setup lang="ts">
/*
 * Dissection of a frog (render_component 'frog_dissection'), in a plain white studio.
 *
 * Frog anatomy: the frog (lab3d/frogModel.ts) sits on the white ground. Dragging turns it any way
 * (the View menu jumps to left, right, top, bottom, front or back); clicking a part names it and ticks
 * it off the "Find the parts" list - seven external parts, then, with the Internal eye on (see-through
 * skin, the heart beating and the lungs breathing inside), six organs.
 * Dissection: the frog is laid on its back and opened with real instruments - pins through the feet,
 * forceps to lift the skin, scissors along a guide line, pins to fold back each flap, the same for
 * the muscle wall beside the abdominal vein - then the heart is watched through a hand lens.
 * Deep dissection: each organ is lifted out with the forceps into its box (a wrong box gives a clue),
 * uncovering the kidneys and testes, spleen, pancreas and bladder beneath.
 *
 * Every action is gated by the current step; a reloaded attempt is rebuilt up to the current step.
 */
import { ref, reactive, computed, watch, shallowRef, onMounted, onBeforeUnmount, nextTick, useTemplateRef } from 'vue'
import * as THREE from 'three'
import { makeScreenLabel } from './lab3d/labRoom'
import { createStudio, type Studio } from './lab3d/studio'
import { buildFrog, makePin, organOf, PART_NAMES, SIT_TILT, SIT_H, type FrogModel, type FrogPart, type FootKey, type FlapKey, type OrganKey } from './lab3d/frogModel'
import LabUnsupported from './lab3d/LabUnsupported.vue'
import LabButton from './ui/LabButton.vue'
import FrogOrganCloseUp from './FrogOrganCloseUp.vue'
import type { SceneObjectConfig, LabObjectDef, LabAction } from '@/types/virtualLab'
import type { CameraView } from './VirtualLabScene.vue'

/** What the student did, sent with each step for the analysis and its marking. */
export interface FrogRecord {
  /** External parts found in the anatomy view */
  features_found: string[]
  /** Internal organs found in the anatomy view */
  organs_found: string[]
  /** Clicked the wrong part when asked to find one */
  wrong_ids: number
  /** Times the scissors left the guide line */
  cut_slips: number
  pins_used: number
  /** Organs lifted out into their boxes in the deep dissection */
  sorted: string[]
  /** Organs put in the wrong box first */
  sort_mistakes: number
}

const props = defineProps<{
  sceneObjects: SceneObjectConfig[]
  objectCatalog: LabObjectDef[]
  connections?: { from: string; to: string }[]
  readOnly?: boolean
  currentStep?: { required_action: string; target_object_key: string | null; expected_value: string | null } | null
}>()

const emit = defineEmits<{
  action: [{ objectKey: string | null; action: LabAction; value: string | null; unit?: string | null; label?: string | null; targetObjectKey?: string | null; frogRecord?: FrogRecord }]
}>()

function catalogFor(objectType: string) {
  return props.objectCatalog.find(o => o.object_type === objectType)
}
function trayLabel(item: SceneObjectConfig) {
  return catalogFor(item.object_type)?.display_name || item.object_type
}
const keyOf = (type: string, fallback: string) => props.sceneObjects.find(o => o.object_type === type)?.key ?? fallback
const frogKey = computed(() => keyOf('preserved_frog', 'frog1'))
const pinsKey = computed(() => keyOf('dissecting_pins', 'pins1'))
const forcepsKey = computed(() => keyOf('forceps', 'forceps1'))
const scissorsKey = computed(() => keyOf('dissecting_scissors', 'scissors1'))

// --- Steps ------------------------------------------------------------------------------------------
/** The practical's stages in order, as `action:value` - used to gate actions and to rebuild the
 *  dissection up to the current step after a reload. */
const STAGES = [
  'inspect:external_parts', 'inspect:internal_parts', 'move:apparatus_ready', 'move:tray',
  'move:limbs_pinned', 'move:skin_lifted', 'move:skin_cut', 'move:skin_pinned', 'move:muscle_lifted', 'move:muscle_cut',
  'move:muscle_pinned', 'zoom:heart', 'move:organs_sorted',
]
const stageKey = computed(() => (props.currentStep ? `${props.currentStep.required_action}:${props.currentStep.expected_value ?? ''}` : null))
const stageIndex = computed(() => (stageKey.value ? STAGES.indexOf(stageKey.value) : -1))
/** Free practice (no step list): everything is allowed in a sensible order */
const guided = computed(() => stageIndex.value >= 0)
const atStage = (key: string) => !guided.value || stageKey.value === key

/** The parts to find, as on the worksheet */
const EXTERNAL = [
  { key: 'eyes', label: 'Eyes' }, { key: 'nostrils', label: 'Nostrils (nares)' }, { key: 'mouth', label: 'Mouth' },
  { key: 'tympanum', label: 'External ears (tympanic membrane)' }, { key: 'skin', label: 'Skin' }, { key: 'vocal_sac', label: 'Vocal sac' }, { key: 'legs', label: 'Legs' },
]
const INTERNAL = [
  { key: 'fat_bodies', label: 'Fat bodies' }, { key: 'stomach', label: 'Stomach' }, { key: 'liver', label: 'Liver' },
  { key: 'lungs', label: 'Lungs' }, { key: 'heart', label: 'Heart' }, { key: 'kidneys', label: 'Kidneys' },
]
const LABEL_OF: Record<string, string> = Object.fromEntries([...EXTERNAL, ...INTERNAL].map(p => [p.key, p.label]))
/** Which list item a clicked part ticks (the body skin under the throat is the vocal sac) */
function findKeyOf(part: FrogPart, local: THREE.Vector3): string | null {
  switch (part) {
    case 'eye': return 'eyes'
    case 'nostril': return 'nostrils'
    case 'mouth': return 'mouth'
    case 'tympanum': return 'tympanum'
    case 'body': return local.x > 0.03 && local.y < -0.004 ? 'vocal_sac' : 'skin'
    case 'hind_leg': case 'fore_leg': case 'hind_foot': case 'fore_foot': return 'legs'
    case 'testes': return 'kidneys'
    default: return INTERNAL.some(p => p.key === part) ? part : null
  }
}

const FOUND_WORDS: Record<string, string> = {
  heart: 'Heart', liver: 'Liver', lungs: 'Lungs', stomach: 'Stomach', small_intestine: 'Small intestine', large_intestine: 'Large intestine',
  kidneys: 'Kidneys', fat_bodies: 'Fat bodies', gall_bladder: 'Gall bladder', spleen: 'Spleen', pancreas: 'Pancreas', bladder: 'Bladder', testes: 'Testes',
}
/** What each part does, and what it does in the living frog (shown when it is clicked) */
const INFO: Record<string, { name: string; fn: string; life: string; clue?: string }> = {
  eyes: { name: 'Eyes', fn: 'Sight. Bulging on top of the head, the eyes see almost all round.', life: 'The frog can float with just its eyes and nostrils above the water. When it swallows it pulls its eyes down to help push the food down its throat.' },
  nostrils: { name: 'Nostrils (nares)', fn: 'Let air in and out for breathing, and smell.', life: 'High on the snout, so it can breathe with only the top of its head out of the water.' },
  mouth: { name: 'Mouth', fn: 'Catches and swallows prey whole - the sticky tongue flicks out to catch insects.', life: 'The floor of the mouth pumps air into the lungs (buccal pumping).' },
  tympanum: { name: 'Tympanum (eardrum)', fn: 'Picks up sound - frogs have no outer ear.', life: 'It vibrates with sound in air and in water; males call to attract mates.' },
  skin: { name: 'Skin', fn: 'Protects the body and takes in oxygen (cutaneous breathing).', life: 'Kept moist and slimy with mucus; dark on the back and pale below for camouflage.' },
  vocal_sac: { name: 'Vocal sac', fn: 'Amplifies the male’s mating call.', life: 'In males the thin skin of the throat balloons out as air is pushed through the voice box.' },
  legs: { name: 'Legs', fn: 'The long, powerful hind legs jump and swim; the short fore limbs prop up the body and break its landing.', life: 'The webbed hind feet push against the water when it swims.' },
  heart: { name: 'Heart', fn: 'Pumps blood around the body. It has three chambers: two atria and one ventricle.', life: 'Beats about 40-50 times a minute: the two atria contract first, then the ventricle pushes the blood out through the truncus arteriosus.', clue: 'This three-chambered organ pumps blood throughout the body.' },
  lungs: { name: 'Lungs', fn: 'Gaseous exchange: oxygen into the blood, carbon dioxide out.', life: 'Thin, elastic sacs that fill and empty as the frog pumps air in with the floor of its mouth. It also breathes through its moist skin.', clue: 'These pink, spongy sacs fill with air and take in oxygen.' },
  liver: { name: 'Liver', fn: 'Makes bile, stores glycogen and breaks down excess amino acids and poisons.', life: 'The largest organ, with three lobes; it receives the food-rich blood from the intestine.', clue: 'This large, dark, three-lobed organ makes bile and stores glycogen.' },
  gall_bladder: { name: 'Gall bladder', fn: 'Stores bile made by the liver and releases it into the duodenum.', life: 'A small green sac among the liver lobes that squeezes bile into the gut after a meal.', clue: 'This small green sac stores bile made by the liver.' },
  stomach: { name: 'Stomach', fn: 'Stores food and begins the digestion of protein.', life: 'Its muscular walls churn the swallowed prey with gastric juice.', clue: 'This muscular, J-shaped sac stores food and begins digesting protein.' },
  small_intestine: { name: 'Small intestine', fn: 'Completes digestion and absorbs the digested food into the blood.', life: 'Waves of muscle contraction (peristalsis) squeeze the food along its long, coiled length.', clue: 'This long, coiled tube absorbs digested food.' },
  large_intestine: { name: 'Large intestine (rectum)', fn: 'Absorbs water and passes the undigested waste to the cloaca.', life: 'It holds the waste until it is passed out through the cloaca.', clue: 'This short, wide tube absorbs water before the waste is expelled.' },
  fat_bodies: { name: 'Fat bodies', fn: 'Store fat - food for hibernation (or the dry season) and for making eggs or sperm.', life: 'Large after feeding well; they shrink as the frog uses them up while it is inactive.', clue: 'These yellow, finger-like bodies store fat.' },
  kidneys: { name: 'Kidneys and testes', fn: 'The kidneys remove urea and other wastes from the blood, making urine. The yellow testes on them make sperm.', life: 'Blood is filtered all the time; the urine runs to the cloaca and is stored in the bladder.', clue: 'These dark-red organs on the back wall filter the blood; the yellow testes lie on them.' },
  testes: { name: 'Testes', fn: 'Make sperm (this frog is a male).', life: 'Small yellow bodies on the front of the kidneys; the sperm pass out through the kidney ducts.' },
  spleen: { name: 'Spleen', fn: 'Makes and stores blood cells and breaks down old red blood cells.', life: 'A small, round, dark-red organ in the folds of the gut.', clue: 'This small, round, dark-red organ deals with blood cells.' },
  pancreas: { name: 'Pancreas', fn: 'Makes digestive enzymes (and the hormone insulin) and passes the enzymes into the duodenum.', life: 'A pale strip in the loop between the stomach and the small intestine.', clue: 'This pale strip beside the stomach makes digestive enzymes.' },
  bladder: { name: 'Urinary bladder', fn: 'Stores urine. On land the frog can take water back from it.', life: 'A thin, two-lobed sac that fills from the cloaca.', clue: 'This thin, two-lobed sac stores the waste from the kidneys.' },
}
Object.assign(INFO, {
  transverse: { name: 'Transverse plane', fn: 'Cuts across the body, dividing it into a front (anterior) and a back (posterior) part.', life: 'Here the frog is cut across the middle of its trunk: you see the body wall all round and the organs packed inside it.' },
  sagittal: { name: 'Sagittal plane', fn: 'Runs lengthways down the middle, dividing the body into left and right halves.', life: 'The cut runs along the midline - from the snout, past the heart and the gut, to the cloaca.' },
  frontal: { name: 'Frontal plane', fn: 'Runs lengthways from side to side, dividing the body into a dorsal (back) and a ventral (belly) part.', life: 'Looking down on the ventral half you see the organs lying in the body cavity from above.' },
  skeletal: { name: 'Skeletal system', fn: 'Frogs have a light skeleton adapted for jumping and swimming: a short backbone of nine vertebrae, a long rod (the urostyle) behind it, and very long, strong hip bones (ilia) that take the force of each jump. Click a bone to see its name.', life: 'The long hind-leg bones - femur, tibiofibula and the lengthened ankle bones - act as levers that fling the frog forwards; the short fore limbs and the shoulder girdle cushion its landing.' },
  muscular: { name: 'Muscular system', fn: 'Muscles move the skeleton. The frog\u2019s hind legs are far more muscular than its front legs - the large thigh and calf muscles power jumping and swimming.', life: 'Muscles of the throat pump air into the lungs, and the muscles of the body wall support and protect the organs inside.' },
  digestive: { name: 'Digestive system', fn: 'Takes in food, digests it and absorbs it: mouth, stomach, small intestine, large intestine, with the liver, gall bladder and pancreas.', life: 'Waves of peristalsis move the food along the gut; bile and enzymes are added in the duodenum.' },
  respiratory: { name: 'Respiratory system', fn: 'Gaseous exchange: the two lungs - helped by the moist skin and the lining of the mouth.', life: 'The floor of the mouth pumps air into the lungs, which fill and empty about 20 times a minute.' },
  circulatory: { name: 'Circulatory system', fn: 'Carries blood round the body: the three-chambered heart, the blood vessels, and the spleen, which deals with blood cells.', life: 'The heart beats about 40-50 times a minute; oxygenated and deoxygenated blood partly mix in the single ventricle.' },
  urogenital: { name: 'Urogenital system', fn: 'The kidneys filter the blood and make urine, stored in the bladder; the testes (or ovaries) make sex cells.', life: 'Urine and sperm both leave the body through the cloaca.' },
} as Record<string, { name: string; fn: string; life: string }>)

/** The boxes for the deep dissection (as on the worksheet - not in body order) */
const BOXES: { key: OrganKey; label: string; colour: string }[] = [
  { key: 'bladder', label: 'Bladder', colour: '#e8c9c0' }, { key: 'kidneys', label: 'Kidneys and testes', colour: '#7e2020' },
  { key: 'spleen', label: 'Spleen', colour: '#7a1c24' }, { key: 'large_intestine', label: 'Rectum', colour: '#b88f80' },
  { key: 'pancreas', label: 'Pancreas', colour: '#e2bf8e' }, { key: 'stomach', label: 'Stomach', colour: '#e9d6c6' },
  { key: 'small_intestine', label: 'Small intestine', colour: '#ecc9b5' }, { key: 'gall_bladder', label: 'Gall bladder', colour: '#4e7d2a' },
  { key: 'lungs', label: 'Lungs', colour: '#e59c9c' }, { key: 'liver', label: 'Liver', colour: '#6d2116' },
  { key: 'heart', label: 'Heart', colour: '#9a1f1f' }, { key: 'fat_bodies', label: 'Fat bodies', colour: '#f0c445' },
]

const record = reactive<FrogRecord>({ features_found: [], organs_found: [], wrong_ids: 0, cut_slips: 0, pins_used: 0, sorted: [], sort_mistakes: 0 })
const externalCount = computed(() => EXTERNAL.filter(p => record.features_found.includes(p.key)).length)
const internalCount = computed(() => INTERNAL.filter(p => record.organs_found.includes(p.key)).length)
function send(objectKey: string | null, action: LabAction, value: string, label?: string) {
  emit('action', { objectKey, action, value, label: label ?? null, targetObjectKey: objectKey, frogRecord: JSON.parse(JSON.stringify(record)) })
}

// --- Apparatus tray ---------------------------------------------------------------------------------
const placedKeys = reactive(new Set<string>())
const trayItems = computed(() => props.sceneObjects.filter(o => o.in_tray !== false && !placedKeys.has(o.key)))
const anatomyDone = computed(() => !guided.value || stageIndex.value >= 2)
const showTray = computed(() => anatomyDone.value && phase.value === 'anatomy' && trayItems.value.length > 0)
let readySent = false
function pickFromTray(key: string) {
  if (props.readOnly) return
  placedKeys.add(key)
  if (!readySent && trayItems.value.length === 0) {
    readySent = true
    send(null, 'move', 'apparatus_ready')
  }
}
const has = (type: string) => { const k = props.sceneObjects.find(o => o.object_type === type)?.key; return !k || placedKeys.has(k) }

// --- Instruments ------------------------------------------------------------------------------------
type Tool = 'pointer' | 'forceps' | 'scissors' | 'pins' | 'lens'
const TOOLS: { key: Tool; label: string; icon: string }[] = [
  { key: 'pointer', label: 'Hand', icon: '✋' }, { key: 'forceps', label: 'Forceps', icon: '\u{1F962}' },
  { key: 'scissors', label: 'Scissors', icon: '✂️' }, { key: 'pins', label: 'Pins', icon: '\u{1F4CC}' },
  { key: 'lens', label: 'Hand lens', icon: '\u{1F50D}' },
]
const TOOL_HELP: Record<Tool, string> = {
  pointer: 'Click a part to identify it. Drag to look around.',
  forceps: 'Click to grip and lift.',
  scissors: 'Press on the dotted line and drag along it.',
  pins: 'Click where a pin should go.',
  lens: 'Click a part to look at it closely.',
}
const tool = ref<Tool>('pointer')
function selectTool(t: Tool) {
  const needs: Record<Tool, string | null> = { pointer: null, forceps: 'forceps', scissors: 'dissecting_scissors', pins: 'dissecting_pins', lens: 'hand_lens' }
  const type = needs[t]
  if (type && !has(type)) { flash('Take it from the Apparatus Tray first.'); return }
  tool.value = t
  if (t !== 'lens') stopLens(false)
}

// --- The studio, the camera and the frog --------------------------------------------------------------
type ViewKey = 'left' | 'right' | 'top' | 'bottom' | 'front' | 'back' | 'front left' | 'front right' | 'back left' | 'back right'
const VIEW_KEYS: ViewKey[] = ['left', 'front left', 'front', 'front right', 'right', 'back right', 'back', 'back left', 'top', 'bottom']
const viewLabel = (v: string) => v.split(' ').map(w => w[0].toUpperCase() + w.slice(1)).join(' ')
const basis = (x: THREE.Vector3Tuple, y: THREE.Vector3Tuple, z: THREE.Vector3Tuple) =>
  new THREE.Quaternion().setFromRotationMatrix(new THREE.Matrix4().makeBasis(new THREE.Vector3(...x), new THREE.Vector3(...y), new THREE.Vector3(...z)))
/** The frog's orientation for each view (the camera looks along -Z) */
const VIEWS: Record<ViewKey, THREE.Quaternion> = {
  left: basis([-1, 0, 0], [0, 1, 0], [0, 0, -1]),
  right: basis([1, 0, 0], [0, 1, 0], [0, 0, 1]),
  top: basis([-1, 0, 0], [0, 0, 1], [0, 1, 0]),
  bottom: basis([-1, 0, 0], [0, 0, -1], [0, -1, 0]),
  front: basis([0, 0, 1], [0, 1, 0], [-1, 0, 0]),
  back: basis([0, 0, -1], [0, 1, 0], [1, 0, 0]),
  'front left': new THREE.Quaternion(), 'front right': new THREE.Quaternion(), 'back left': new THREE.Quaternion(), 'back right': new THREE.Quaternion(),
}
// the four three-quarter views: the side views turned 45 degrees towards or away from you
{
  const turn = (a: number, q: THREE.Quaternion) => new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0, 1, 0), a).multiply(q)
  VIEWS['front left'] = turn(Math.PI / 4, VIEWS.left)
  VIEWS['back left'] = turn(-Math.PI / 4, VIEWS.left)
  VIEWS['front right'] = turn(-Math.PI / 4, VIEWS.right)
  VIEWS['back right'] = turn(Math.PI / 4, VIEWS.right)
}
/** On its back for dissection, snout away from you */
const Q_ON_BACK = basis([0, 0, -1], [0, -1, 0], [-1, 0, 0])
/** The frog is turned about this point (the middle of its body) while you look at it */
const PIVOT = new THREE.Vector3(0, 0.03, 0)

// cameras: the anatomy view a little to the right of centre (the list is on the left)
const ANATOMY_POS = new THREE.Vector3(-0.065, 0.075, 0.56)
const ANATOMY_TARGET = new THREE.Vector3(-0.065, 0.035, 0)
/** The whole frog on its back, feet and all (for pinning and cutting) */
const DISSECT_POS = new THREE.Vector3(0.035, 0.5, 0.38)
const DISSECT_TARGET = new THREE.Vector3(0.035, 0, 0.05)
/** Closer in on the opened body cavity (for the organs) */
const ORGANS_POS = new THREE.Vector3(0.035, 0.28, 0.2)
const ORGANS_TARGET = new THREE.Vector3(0.035, 0, 0.01)

const host = useTemplateRef<HTMLDivElement>('labHost')
const room = shallowRef<Studio | null>(null)
const unsupported = ref(false)

const phase = ref<'anatomy' | 'tray'>('anatomy')
type Section = 'external' | 'internal' | 'transverse' | 'sagittal' | 'frontal' | 'skeletal' | 'muscular' | 'digestive' | 'respiratory' | 'circulatory' | 'urogenital'
const section = ref<Section>('external')
const menuOpen = ref(false)
interface SectionItem { key: Section; label: string; icon: string }
const SECTION_GROUPS: { title: string; items: SectionItem[] }[] = [
  { title: '', items: [{ key: 'external', label: 'External', icon: '\u{1F438}' }, { key: 'internal', label: 'Internal', icon: '\u{1FAC0}' }] },
  { title: 'Anatomy planes', items: [{ key: 'transverse', label: 'Transverse', icon: '\u{1F7E5}' }, { key: 'sagittal', label: 'Sagittal', icon: '\u{1F7E6}' }, { key: 'frontal', label: 'Frontal', icon: '\u{1F7E9}' }] },
  { title: 'Anatomy systems', items: [{ key: 'skeletal', label: 'Skeletal system', icon: '\u{1F9B4}' }, { key: 'muscular', label: 'Muscular system', icon: '\u{1F4AA}' }, { key: 'digestive', label: 'Digestive system', icon: '\u{1F37D}\uFE0F' }, { key: 'respiratory', label: 'Respiratory system', icon: '\u{1FAC1}' }, { key: 'circulatory', label: 'Circulatory system', icon: '\u2764\uFE0F' }, { key: 'urogenital', label: 'Urogenital system', icon: '\u{1F4A7}' }] },
]
const currentSection = computed(() => SECTION_GROUPS.flatMap(g => g.items).find(i => i.key === section.value)!)
function sectionLabel(it: SectionItem) {
  if (it.key === 'external') return `External (${externalCount.value}/${EXTERNAL.length})`
  if (it.key === 'internal') return `Internal (${internalCount.value}/${INTERNAL.length})`
  return it.label
}
/** The organs each system shows clearly (the rest fade) */
const SYSTEMS: Partial<Record<Section, OrganKey[]>> = {
  digestive: ['stomach', 'small_intestine', 'large_intestine', 'liver', 'gall_bladder', 'pancreas'],
  respiratory: ['lungs'],
  circulatory: ['heart', 'spleen'],
  urogenital: ['kidneys', 'bladder'],
}
/** Each anatomy plane, in the frog's own axes (the part on the far side is cut away), and the view that shows the cut */
const PLANES: Partial<Record<Section, { plane: THREE.Plane; view: ViewKey }>> = {
  transverse: { plane: new THREE.Plane(new THREE.Vector3(-1, 0, 0), 0.012), view: 'front left' },
  sagittal: { plane: new THREE.Plane(new THREE.Vector3(0, 0, -1), 0), view: 'right' },
  frontal: { plane: new THREE.Plane(new THREE.Vector3(0, -1, 0), 0.002), view: 'top' },
}
const worldClip = new THREE.Plane()
const clipActive = computed(() => phase.value === 'anatomy' && !!PLANES[section.value])
function chooseSection(s: Section) {
  menuOpen.value = false
  setSection(s)
  const p = PLANES[s]
  if (p) setView(p.view)
  if (SYSTEMS[s] || PLANES[s] || s === 'skeletal' || s === 'muscular') infoKey.value = s
  else if (infoKey.value && INFO[infoKey.value] && ['transverse', 'sagittal', 'frontal', 'skeletal', 'muscular', 'digestive', 'respiratory', 'circulatory', 'urogenital'].includes(infoKey.value)) infoKey.value = null
  // the skeleton and the muscles are seen closer up
  if (s === 'skeletal' || s === 'muscular') room.value?.flyTo(new THREE.Vector3(-0.045, 0.07, 0.42), new THREE.Vector3(-0.045, 0.035, 0))
  else room.value?.flyTo(ANATOMY_POS.clone(), ANATOMY_TARGET.clone())
}
const view = ref<ViewKey>('left')
const sensitivity = ref(0.05)
const dragged = ref(false)

let frog: FrogModel
/** Holds the frog: turned by dragging (anatomy), or laid on its back (dissection) */
const holder = new THREE.Group()
const holderGoal = { pos: PIVOT.clone(), quat: VIEWS.left.clone() }
let sitGoal = 1
let sitNow = 1
let poseGoal = -1
let poseNow = -1
const cursorTools: Partial<Record<Tool, THREE.Object3D>> = {}
let liftForceps: THREE.Object3D
let liftForcepsAt: THREE.Vector3 | null = null

const chrome = () => new THREE.MeshStandardMaterial({ color: 0xdfe3e7, metalness: 1, roughness: 0.18 })
/** Forceps: tip at the origin, handle up +Y */
function makeForceps() {
  const g = new THREE.Group()
  for (const s of [-1, 1]) {
    const arm = new THREE.Mesh(new THREE.BoxGeometry(0.0022, 0.11, 0.0012), chrome())
    arm.geometry.translate(0, 0.055, 0)
    arm.rotation.z = s * 0.045
    arm.position.x = s * 0.0006
    g.add(arm)
    const grip = new THREE.Mesh(new THREE.BoxGeometry(0.0026, 0.03, 0.0016), new THREE.MeshStandardMaterial({ color: 0xbfc5cb, metalness: 0.9, roughness: 0.55 }))
    grip.position.set(s * 0.0035, 0.06, 0)
    grip.rotation.z = s * 0.045
    g.add(grip)
  }
  const top = new THREE.Mesh(new THREE.BoxGeometry(0.012, 0.006, 0.0016), chrome())
  top.position.y = 0.109
  g.add(top)
  return g
}
/** Dissecting scissors: points at the origin, finger rings up +Y */
function makeScissors() {
  const g = new THREE.Group()
  for (const s of [-1, 1]) {
    const blade = new THREE.Mesh(new THREE.BoxGeometry(0.0028, 0.05, 0.0012), chrome())
    blade.geometry.translate(0, 0.025, 0)
    blade.rotation.z = s * 0.1
    g.add(blade)
    const shank = new THREE.Mesh(new THREE.BoxGeometry(0.0026, 0.045, 0.0018), chrome())
    shank.position.set(-s * 0.005, 0.072, 0)
    shank.rotation.z = -s * 0.2
    g.add(shank)
    const ring = new THREE.Mesh(new THREE.TorusGeometry(0.0075, 0.0016, 10, 28), chrome())
    ring.position.set(-s * 0.012, 0.1, 0)
    g.add(ring)
  }
  const screw = new THREE.Mesh(new THREE.CylinderGeometry(0.0022, 0.0022, 0.0035, 16), new THREE.MeshStandardMaterial({ color: 0x9aa1a8, metalness: 1, roughness: 0.3 }))
  screw.rotation.x = Math.PI / 2
  screw.position.y = 0.05
  g.add(screw)
  return g
}
/** Hand lens: glass facing +Z, handle down -Y */
function makeLens() {
  const g = new THREE.Group()
  const rim = new THREE.Mesh(new THREE.TorusGeometry(0.03, 0.003, 12, 48), new THREE.MeshStandardMaterial({ color: 0x1f2937, roughness: 0.4 }))
  const glass = new THREE.Mesh(new THREE.CircleGeometry(0.03, 48), new THREE.MeshPhysicalMaterial({ color: 0xeef6ff, transparent: true, opacity: 0.18, roughness: 0.02, clearcoat: 1, depthWrite: false }))
  const handle = new THREE.Mesh(new THREE.CylinderGeometry(0.005, 0.0055, 0.07, 16), new THREE.MeshStandardMaterial({ color: 0x111827, roughness: 0.5 }))
  handle.position.y = -0.068
  g.add(rim, glass, handle)
  return g
}

function buildScene(scene: THREE.Scene) {
  frog = buildFrog()
  frog.setPose(-1)
  poseNow = -1
  holder.add(frog.root)
  holder.position.copy(holderGoal.pos)
  holder.quaternion.copy(holderGoal.quat)
  applySit(1)
  scene.add(holder)

  cursorTools.forceps = makeForceps()
  cursorTools.scissors = makeScissors()
  cursorTools.pins = makePin(0)
  cursorTools.pins.scale.setScalar(1.4)
  cursorTools.lens = makeLens()
  Object.values(cursorTools).forEach((o) => { o!.visible = false; scene.add(o!) })
  liftForceps = makeForceps()
  liftForceps.visible = false
  frog.root.add(liftForceps)
  buildGuides()
}
/** Sitting up (1) or lying flat (0): the body's tilt inside the holder */
function applySit(amount: number) {
  frog.root.rotation.set(0, 0, SIT_TILT * amount)
  frog.root.position.set(0, (SIT_H - PIVOT.y) * amount, 0)
}

function setSection(s: Section) {
  section.value = s
  if (!frog) return
  frog.setLayer(s === 'skeletal' ? 'skeleton' : s === 'muscular' ? 'muscle' : 'skin')
  frog.setXray(s === 'internal' || !!SYSTEMS[s])
  frog.setFocus(SYSTEMS[s] ?? null)
  if (PLANES[s]) updateClip()
  frog.setClip(PLANES[s] ? worldClip : null)
}
/** The anatomy plane in world coordinates, following the frog as it turns */
function updateClip() {
  const p = PLANES[section.value]
  if (!p || !frog) return
  frog.root.updateWorldMatrix(true, false)
  worldClip.copy(p.plane).applyMatrix4(frog.root.matrixWorld)
}
function setView(v: ViewKey) {
  view.value = v
  holderGoal.quat.copy(VIEWS[v])
}

/** Lays the frog on its back for the dissection */
function layOnBack(opts: { instant?: boolean } = {}) {
  if (!frog) return
  if (!opts.instant) {
    if (props.readOnly) return
    if (!atStage('move:tray')) { flash(stepHint('Find all the parts first.')); return }
  }
  phase.value = 'tray'
  setSection('external')
  infoKey.value = null
  tip.value = null
  holderGoal.pos.set(0, frog.restHeight.back, 0)
  holderGoal.quat.copy(Q_ON_BACK)
  sitGoal = 0
  poseGoal = 1
  if (room.value) room.value.controls.enableRotate = true
  if (opts.instant) snap()
  else {
    room.value?.flyTo(DISSECT_POS.clone(), DISSECT_TARGET.clone())
    send(frogKey.value, 'move', 'tray')
  }
}
function flyToTray() {
  const open = flapGoal.muscleR === 1 && flapGoal.muscleL === 1
  room.value?.flyTo((open ? ORGANS_POS : DISSECT_POS).clone(), (open ? ORGANS_TARGET : DISSECT_TARGET).clone())
}

function cameraAxes() {
  const cam = room.value!.camera
  const right = new THREE.Vector3(), up = new THREE.Vector3(), fwd = new THREE.Vector3()
  cam.matrixWorld.extractBasis(right, up, fwd)
  return { right, up, fwd }
}
/** Turns the frog by a drag of (dx, dy) pixels */
function trackball(dx: number, dy: number) {
  const { right, up } = cameraAxes()
  const k = sensitivity.value * 0.22
  const q = new THREE.Quaternion().setFromAxisAngle(up, dx * k).premultiply(new THREE.Quaternion().setFromAxisAngle(right, dy * k))
  holderGoal.quat.premultiply(q)
  holder.quaternion.premultiply(q)
}

// --- Finding the parts ---------------------------------------------------------------------------------
const tip = ref<{ text: string; x: number; y: number } | null>(null)
let tipTimer = 0
function showTip(text: string, ev: PointerEvent) {
  const r = room.value
  if (!r) return
  const rect = r.renderer.domElement.getBoundingClientRect()
  tip.value = { text, x: ev.clientX - rect.left, y: ev.clientY - rect.top }
  window.clearTimeout(tipTimer)
  tipTimer = window.setTimeout(() => { tip.value = null }, 2600)
}
function findPart(hit: Hit, ev: PointerEvent) {
  if (hit.part === 'bone') { showTip(capitalise(hit.name ?? 'bone'), ev); return }
  const key = findKeyOf(hit.part, hit.local)
  showTip(key ? LABEL_OF[key] ?? INFO[key]?.name ?? PART_NAMES[hit.part] : capitalise(PART_NAMES[hit.part]), ev)
  const infoK = key ?? (INFO[hit.part] ? hit.part : null)
  if (infoK && INFO[infoK]) infoKey.value = infoK
  if (!key) return
  const list = EXTERNAL.some(p => p.key === key) ? record.features_found : record.organs_found
  if (!list.includes(key)) list.push(key)
  checkFindSteps()
}
const capitalise = (s: string) => s.charAt(0).toUpperCase() + s.slice(1)
const findSent = new Set<string>()
function checkFindSteps() {
  if (!guided.value) return
  if (stageKey.value === 'inspect:external_parts' && externalCount.value === EXTERNAL.length && !findSent.has('external')) {
    findSent.add('external')
    send(frogKey.value, 'inspect', 'external_parts', 'All the external parts found')
    flash('All seven external parts found. Now click the eye beside "Internal" to see inside the frog.')
  }
  if (stageKey.value === 'inspect:internal_parts' && internalCount.value === INTERNAL.length && !findSent.has('internal')) {
    findSent.add('internal')
    send(frogKey.value, 'inspect', 'internal_parts', 'All six internal organs found')
    flash('All six organs found. Now take the instruments from the Apparatus Tray.')
  }
}
watch(stageKey, checkFindSteps)

// --- Pins, flaps, cuts ------------------------------------------------------------------------------------
const pinnedFeet = reactive(new Set<FootKey>())
let pinColour = 0
function addPin(local: THREE.Vector3, outward: THREE.Vector3) {
  const p = makePin(pinColour++)
  p.position.copy(local)
  p.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), new THREE.Vector3(0, -1, 0).addScaledVector(outward, 0.45).normalize())
  frog.root.add(p)
  record.pins_used++
}
function pinFoot(k: FootKey) {
  if (pinnedFeet.has(k)) return false
  pinnedFeet.add(k)
  const side = k.endsWith('r') ? 1 : -1
  const out = new THREE.Vector3(k.startsWith('h') ? -0.6 : 0.6, 0, side)
  addPin(frog.footPinPoint(k), out.normalize())
  return true
}

const flapGoal: Record<FlapKey, number> = reactive({ skinR: 0, skinL: 0, muscleR: 0, muscleL: 0 })
const liftGoal = { skin: 0, muscle: 0 }
const flapPinsWanted = new Set<FlapKey>()
const flapPinsDone = new Set<FlapKey>()
const layerOf = (k: FlapKey): 'skin' | 'muscle' => (k.startsWith('skin') ? 'skin' : 'muscle')
function openFlap(k: FlapKey) {
  flapGoal[k] = 1
  flapPinsWanted.add(k)
}
function pinFlapsWhenOpen() {
  for (const k of flapPinsWanted) {
    if (flapPinsDone.has(k) || frog.flaps[k].open < 0.995) continue
    flapPinsDone.add(k)
    const side = k.endsWith('R') ? 1 : -1
    frog.flapPinPoints(k).forEach(p => addPin(p, new THREE.Vector3(0, 0, side)))
  }
}

const cutProgress = reactive({ skin: -0.0525, muscle: -0.0525 })
const cutDone = reactive({ skin: false, muscle: false })
const lifted = reactive({ skin: false, muscle: false })
const cutLines: Record<'skin' | 'muscle', THREE.Mesh | null> = { skin: null, muscle: null }
const guides: Record<'skin' | 'muscle', THREE.Group | null> = { skin: null, muscle: null }
function buildGuides() {
  for (const layer of ['skin', 'muscle'] as const) {
    const g = new THREE.Group()
    const pts = frog.cutLine(layer)
    const dot = new THREE.SphereGeometry(0.0006, 8, 6)
    const mat = new THREE.MeshBasicMaterial({ color: 0x1d4ed8, toneMapped: false })
    pts.forEach((p, i) => { if (i % 2 === 0) { const m = new THREE.Mesh(dot, mat); m.position.copy(p).add(new THREE.Vector3(0, -0.0003, 0)); g.add(m) } })
    const start = new THREE.Mesh(new THREE.TorusGeometry(0.0022, 0.0005, 8, 24), new THREE.MeshBasicMaterial({ color: 0x16a34a, toneMapped: false }))
    start.position.copy(pts[0]).add(new THREE.Vector3(0, -0.0004, 0))
    start.rotation.x = Math.PI / 2
    g.add(start)
    g.visible = false
    g.traverse(o => { o.raycast = () => {} })
    frog.root.add(g)
    guides[layer] = g
  }
}
function drawCut(layer: 'skin' | 'muscle') {
  const old = cutLines[layer]
  if (old) { frog.root.remove(old); old.geometry.dispose() }
  cutLines[layer] = null
  const x0 = frog.windowX.from
  const x1 = Math.min(cutProgress[layer], frog.windowX.to)
  if (x1 - x0 < 0.001) return
  const pts = frog.cutLine(layer, x0 / 0.07, x1 / 0.07)
  const m = new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts), 60, 0.00045, 6), new THREE.MeshStandardMaterial({ color: layer === 'skin' ? 0x5b1a1a : 0x3d0d12, roughness: 0.5 }))
  m.raycast = () => {}
  frog.root.add(m)
  cutLines[layer] = m
}
function finishCut(layer: 'skin' | 'muscle') {
  cutProgress[layer] = frog.windowX.to
  cutDone[layer] = true
  lifted[layer] = false
  liftGoal[layer] = 0
  liftForcepsAt = null
  drawCut(layer)
}
function lift(layer: 'skin' | 'muscle') {
  lifted[layer] = true
  liftGoal[layer] = 1
  liftForcepsAt = frog.liftPoint(layer)
}

// the living frog, the organ card and the deep dissection
const alive = ref(true)
const bodyOpen = computed(() => flapGoal.muscleR === 1 && flapGoal.muscleL === 1)
const infoKey = ref<string | null>(null)
const info = computed(() => (infoKey.value ? INFO[infoKey.value] ?? null : null))
/** the organ close-up: offered on the card of any organ (the testes open the kidneys) */
const closeUpOrgan = ref<OrganKey | null>(null)
const closeUpKey = computed<OrganKey | null>(() => (infoKey.value ? organOf(infoKey.value as FrogPart) : null))
const sortOpen = computed(() => (guided.value ? stageKey.value === 'move:organs_sorted' : bodyOpen.value))
const sorted = computed(() => record.sorted)
// the organ card would cover the organs being lifted out
watch(sortOpen, (open) => { if (open) infoKey.value = null })
const heldOrgan = ref<OrganKey | null>(null)
let heldLift = 0
function liftOut(k: OrganKey) {
  if (heldOrgan.value && heldOrgan.value !== k) frog.setOrganLift(heldOrgan.value, 0)
  heldOrgan.value = k
  heldLift = 0
  flash('Now click the box this organ belongs in.')
}
function pickBox(k: OrganKey) {
  if (props.readOnly) return
  const held = heldOrgan.value
  if (!held) { flash('First select the Forceps and click an organ to lift it out.'); return }
  if (held !== k) {
    record.sort_mistakes++
    flash(`Not quite. ${INFO[held]?.clue ?? ''}`)
    return
  }
  sortOrgan(k)
  heldOrgan.value = null
  if (record.sorted.length === BOXES.length) send(forcepsKey.value, 'move', 'organs_sorted', 'Every organ in its box')
  else flash(`Correct - the ${INFO[k].name.toLowerCase()}. ${BOXES.length - record.sorted.length} to go.`)
}
function sortOrgan(k: OrganKey) {
  frog.removeOrgan(k)
  if (!record.sorted.includes(k)) record.sorted.push(k)
  labels.get(k)?.removeFromParent()
  if (infoKey.value === k) infoKey.value = null
}

// organ labels in the opened body
const labels = new Map<string, THREE.Sprite>()
function labelPart(name: string, local: THREE.Vector3) {
  if (labels.has(name)) return
  const s = makeScreenLabel(FOUND_WORDS[name] || name, 13)
  ;(s.material as THREE.SpriteMaterial).depthTest = false
  s.renderOrder = 20
  s.position.copy(local)
  const inGut = name === 'small_intestine' || name === 'large_intestine'
  if (inGut) s.position.sub(frog.gut.position)
  ;(inGut ? frog.gut : frog.root).add(s)
  labels.set(name, s)
}

// --- Rebuilding up to the current step ---------------------------------------------------------------
function applyStage(key: string) {
  switch (key) {
    case 'inspect:external_parts': EXTERNAL.forEach(p => { if (!record.features_found.includes(p.key)) record.features_found.push(p.key) }); findSent.add('external'); break
    case 'inspect:internal_parts': INTERNAL.forEach(p => { if (!record.organs_found.includes(p.key)) record.organs_found.push(p.key) }); findSent.add('internal'); break
    case 'move:apparatus_ready':
      props.sceneObjects.forEach(o => placedKeys.add(o.key))
      readySent = true
      break
    case 'move:tray': layOnBack({ instant: true }); break
    case 'move:limbs_pinned': (['fl', 'fr', 'hl', 'hr'] as FootKey[]).forEach(pinFoot); break
    case 'move:skin_lifted': lift('skin'); break
    case 'move:skin_cut': finishCut('skin'); break
    case 'move:skin_pinned': openFlap('skinR'); openFlap('skinL'); break
    case 'move:muscle_lifted': lift('muscle'); break
    case 'move:muscle_cut': finishCut('muscle'); break
    case 'move:muscle_pinned': openFlap('muscleR'); openFlap('muscleL'); break
    case 'move:organs_sorted': BOXES.forEach(b => sortOrgan(b.key)); break
  }
}
let restored = false
function restoreToStep() {
  if (restored || !frog || !props.currentStep) return
  restored = true
  const idx = stageIndex.value
  if (idx <= 0) return
  for (let k = 0; k < idx; k++) applyStage(STAGES[k])
  snap()
  if (idx >= 4) flyToTray()
}
watch(() => props.currentStep, () => restoreToStep())

/** Jump every animation to its end (used when rebuilding) */
function snap() {
  holder.position.copy(holderGoal.pos)
  holder.quaternion.copy(holderGoal.quat)
  sitNow = sitGoal
  applySit(sitNow)
  poseNow = poseGoal
  frog.setPose(poseNow)
  for (const k of Object.keys(flapGoal) as FlapKey[]) {
    const f = frog.flaps[k]
    f.open = flapGoal[k]
    f.lift = liftGoal[layerOf(k)]
    f.update()
  }
  pinFlapsWhenOpen()
}

// --- Picking ----------------------------------------------------------------------------------------
const hoverCursor = ref('grab')
interface Hit { part: FrogPart; side: 'l' | 'r' | null; flap: FlapKey | null; point: THREE.Vector3; local: THREE.Vector3; normal: THREE.Vector3; name?: string }
const raycaster = new THREE.Raycaster()
const SKIN_PARTS: FrogPart[] = ['body', 'skin', 'muscle', 'cavity']
function raycastFrog(ev: PointerEvent, only?: THREE.Object3D[]): Hit | null {
  const r = room.value
  if (!r || !frog) return null
  raycaster.setFromCamera(r.toNdc(ev), r.camera)
  const xray = phase.value === 'anatomy' && (section.value === 'internal' || !!SYSTEMS[section.value])
  const clip = clipActive.value
  for (const h of raycaster.intersectObjects(only ?? [frog.root], true)) {
    if (!h.object.visible || (h.object as THREE.Mesh).isMesh !== true) continue
    const info = frog.partOf(h.object)
    if (!info) continue
    // with the see-through skin, clicks go through it to the organs
    if (xray && SKIN_PARTS.includes(info.part)) continue
    // the part cut away by an anatomy plane can't be clicked
    if (clip && worldClip.distanceToPoint(h.point) < 0) continue
    const n = h.face ? h.face.normal.clone().transformDirection(h.object.matrixWorld) : new THREE.Vector3(0, 1, 0)
    return { ...info, point: h.point.clone(), local: frog.root.worldToLocal(h.point.clone()), normal: n, name: h.object.userData.boneName as string | undefined }
  }
  return null
}

let press: { x: number; y: number; lastX: number; lastY: number; mode: 'orbit' | 'rotate' | 'cut' | 'tool'; hit: Hit | null; slipped: boolean } | null = null
function onPointerDown(ev: PointerEvent) {
  if (!room.value || !frog) return
  menuOpen.value = false
  const hit = raycastFrog(ev)
  let mode: 'orbit' | 'rotate' | 'cut' | 'tool' = 'orbit'
  const cutLayer = activeCutLayer()
  if (phase.value === 'anatomy') mode = 'rotate' // drag anywhere turns the frog
  // a press anywhere on the frog starts the cut - cutAt() checks it follows the guide line
  else if (!props.readOnly && tool.value === 'scissors' && cutLayer && hit) mode = 'cut'
  else if (!props.readOnly && tool.value !== 'pointer' && hit) mode = 'tool'
  press = { x: ev.clientX, y: ev.clientY, lastX: ev.clientX, lastY: ev.clientY, mode, hit, slipped: false }
  if (mode !== 'orbit') room.value.controls.enabled = false
  if (mode === 'tool') toolClick(hit)
  if (mode === 'cut') cutAt(ev)
  window.addEventListener('pointermove', onPressMove)
  window.addEventListener('pointerup', onPressUp, { once: true })
}
function onPressMove(ev: PointerEvent) {
  if (!press) return
  if (press.mode === 'rotate') {
    trackball(ev.clientX - press.lastX, ev.clientY - press.lastY)
    if (Math.hypot(ev.clientX - press.x, ev.clientY - press.y) > 6) dragged.value = true
  }
  if (press.mode === 'cut') cutAt(ev)
  if (!press) return // the cut just finished
  press.lastX = ev.clientX
  press.lastY = ev.clientY
}
function onPressUp(ev: PointerEvent) {
  window.removeEventListener('pointermove', onPressMove)
  if (room.value) room.value.controls.enabled = true
  const p = press
  press = null
  if (!p) return
  const moved = Math.hypot(ev.clientX - p.x, ev.clientY - p.y)
  if ((p.mode === 'orbit' || p.mode === 'rotate') && moved < 6 && !props.readOnly) {
    if (phase.value === 'anatomy') { if (p.hit) findPart(p.hit, ev) }
    else if (tool.value === 'pointer') handClick(p.hit)
  }
}

function onHover(ev: PointerEvent) {
  if (press || !frog) return
  const hit = raycastFrog(ev)
  updateCursorTool(hit)
  if (phase.value === 'anatomy') hoverCursor.value = hit ? 'pointer' : 'grab'
  else if (tool.value === 'scissors' || tool.value === 'pins') hoverCursor.value = hit ? 'crosshair' : 'grab'
  else if (tool.value === 'lens') hoverCursor.value = hit ? 'zoom-in' : 'grab'
  else hoverCursor.value = hit ? 'pointer' : 'grab'
}
/** The instrument in your hand follows the pointer over the frog */
function updateCursorTool(hit: Hit | null) {
  const r = room.value
  if (!r) return
  const active = phase.value === 'tray' && !!hit && !props.readOnly
  for (const [k, o] of Object.entries(cursorTools)) o!.visible = active && k === tool.value
  const o = cursorTools[tool.value]
  if (!o || !hit || !active) return
  const toCam = r.camera.position.clone().sub(hit.point).normalize()
  if (tool.value === 'lens') {
    o.position.copy(hit.point).addScaledVector(toCam, 0.05)
    o.quaternion.setFromUnitVectors(new THREE.Vector3(0, 0, 1), toCam)
    return
  }
  const dir = hit.normal.clone().multiplyScalar(0.45).addScaledVector(toCam, 0.7).add(new THREE.Vector3(0, 0.35, 0)).normalize()
  o.position.copy(hit.point).addScaledVector(dir, tool.value === 'pins' ? 0.012 : 0.001)
  o.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir)
}

// --- What each instrument does (dissection) ----------------------------------------------------------
function stepHint(fallback: string) {
  return guided.value ? 'Follow the steps - read the current step on the left.' : fallback
}
/** Clicking an organ in the opened frog: its label and card */
function handClick(hit: Hit | null) {
  if (!hit) return
  const k = organOf(hit.part) ?? (INFO[hit.part] ? hit.part : null)
  if (k && bodyOpen.value && FOUND_WORDS[k]) labelPart(k, hit.local.clone().add(new THREE.Vector3(0, -0.009, 0)))
  if (k && INFO[k]) infoKey.value = k
  else flash(`That is the ${PART_NAMES[hit.part]}.`)
}

function toolClick(hit: Hit | null) {
  if (tool.value === 'pins') return pinsClick(hit)
  if (tool.value === 'forceps') return forcepsClick(hit)
  if (tool.value === 'scissors') return scissorsClick()
  if (tool.value === 'lens' && hit) return lensClick(hit)
}
function pinsClick(hit: Hit | null) {
  if (phase.value !== 'tray') { flash('Lay the frog on its back before pinning it.'); return }
  // the feet
  if (hit && ['hind_foot', 'fore_foot', 'hind_leg', 'fore_leg'].includes(hit.part) && hit.side) {
    if (!atStage('move:limbs_pinned')) { flash(stepHint('The feet are already pinned.')); return }
    const k = `${hit.part.startsWith('hind') ? 'h' : 'f'}${hit.side}` as FootKey
    if (!pinFoot(k)) { flash('That foot is already pinned - pin the others.'); return }
    if (pinnedFeet.size === 4) send(pinsKey.value, 'move', 'limbs_pinned', 'All four feet pinned')
    else flash(`${pinnedFeet.size} of 4 feet pinned.`)
    return
  }
  // pinning the skin back: a click just inside the cut (on the muscle beneath) means the skin flap on that side
  if (hit && stageKey.value === 'move:skin_pinned' && (hit.part === 'muscle' || hit.part === 'cavity')) hit = { ...hit, part: 'skin', flap: hit.local.z >= 0 ? 'skinR' : 'skinL' }
  // a flap of skin or muscle
  if (hit && hit.flap) {
    const layer = layerOf(hit.flap)
    if (!cutDone[layer]) { flash(layer === 'skin' ? 'Cut the skin first.' : 'Cut the muscle wall first.'); return }
    const stage = layer === 'skin' ? 'move:skin_pinned' : 'move:muscle_pinned'
    if (!atStage(stage)) { flash(stepHint('That flap is already pinned back.')); return }
    if (flapGoal[hit.flap] === 1) { flash('That flap is already pinned back - now the other one.'); return }
    openFlap(hit.flap)
    const both = layer === 'skin' ? flapGoal.skinR === 1 && flapGoal.skinL === 1 : flapGoal.muscleR === 1 && flapGoal.muscleL === 1
    if (both) {
      send(pinsKey.value, 'move', stage.slice(5), layer === 'skin' ? 'Skin pinned back' : 'Muscle pinned back')
      if (layer === 'muscle') setTimeout(flyToTray, 900)
    }
    return
  }
  flash(stageKey.value === 'move:limbs_pinned' ? 'Click a foot to pin it.' : 'Click a cut flap to fold it back and pin it.')
}
function forcepsClick(hit: Hit | null) {
  if (sortOpen.value) {
    const k = hit ? organOf(hit.part) : null
    if (!k) { flash('Grip one of the organs with the forceps to lift it out.'); return }
    liftOut(k)
    return
  }
  const layer: 'skin' | 'muscle' | null = stageKey.value === 'move:skin_lifted' ? 'skin' : stageKey.value === 'move:muscle_lifted' ? 'muscle' : !guided.value ? (cutDone.skin ? 'muscle' : 'skin') : null
  if (!layer) { flash(stepHint('The forceps are for lifting the skin, the muscle wall or the organs.')); return }
  if (phase.value !== 'tray' || pinnedFeet.size < 4) { flash('Pin the frog on its back first.'); return }
  if (layer === 'muscle' && flapGoal.skinR < 1) { flash('Pin back the skin first.'); return }
  if (!hit || hit.part !== layer) { flash(layer === 'skin' ? 'Grip the skin of the belly.' : 'Grip the muscle wall of the belly (under the skin).'); return }
  if (hit.local.x > frog.windowX.from + 0.03) { flash(`Lift the ${layer === 'skin' ? 'skin' : 'muscle wall'} at the lower belly, just in front of the hind legs.`); return }
  lift(layer)
  send(forcepsKey.value, 'move', `${layer}_lifted`, layer === 'skin' ? 'Skin lifted' : 'Muscle wall lifted')
}
function activeCutLayer(): 'skin' | 'muscle' | null {
  if (guided.value) return stageKey.value === 'move:skin_cut' ? 'skin' : stageKey.value === 'move:muscle_cut' ? 'muscle' : null
  if (!cutDone.skin && lifted.skin) return 'skin'
  if (cutDone.skin && flapGoal.skinR === 1 && !cutDone.muscle && lifted.muscle) return 'muscle'
  return null
}
function scissorsClick() {
  if (stageKey.value === 'move:skin_lifted' || stageKey.value === 'move:muscle_lifted') { flash('Lift it with the forceps first, so the scissors do not cut the organs underneath.'); return }
  flash(stepHint('Lift the skin with the forceps before cutting.'))
}
function cutAt(ev: PointerEvent) {
  const layer = activeCutLayer()
  if (!layer || cutDone[layer]) return
  const meshes = layer === 'skin' ? [frog.flaps.skinR.mesh, frog.flaps.skinL.mesh] : [frog.flaps.muscleR.mesh, frog.flaps.muscleL.mesh]
  const hit = raycastFrog(ev, meshes)
  if (!hit) return
  updateCursorTool(hit)
  const d = frog.cutLineDistance(layer, hit.local)
  if (d.dist > 0.0045) {
    if (press && !press.slipped) { press.slipped = true; record.cut_slips++ }
    flash('Keep the scissors on the dotted line.')
    return
  }
  if (d.x > cutProgress[layer] + 0.012) { flash('Start at the green ring by the hind legs and cut steadily forwards along the line.'); return }
  if (d.x > cutProgress[layer]) {
    cutProgress[layer] = d.x
    drawCut(layer)
  }
  if (cutProgress[layer] >= frog.windowX.to - 0.004) {
    finishCut(layer)
    send(scissorsKey.value, 'move', `${layer}_cut`, layer === 'skin' ? 'Skin cut' : 'Muscle wall cut')
    press = null
    if (room.value) room.value.controls.enabled = true
  }
}

const lensActive = ref(false)
function lensClick(hit: Hit) {
  const r = room.value
  if (!r) return
  const dir = r.camera.position.clone().sub(r.controls.target).normalize()
  r.flyTo(hit.point.clone().addScaledVector(dir, 0.085), hit.point.clone())
  lensActive.value = true
  if (hit.part === 'heart') infoKey.value = 'heart'
  if (stageKey.value?.startsWith('zoom:')) {
    const want = stageKey.value.slice(5)
    if (hit.part === want) send(frogKey.value, 'zoom', want, `Hand lens on the ${want}`)
    else flash(`That is the ${PART_NAMES[hit.part]}. Look at the ${PART_NAMES[want as FrogPart] ?? want} through the lens.`)
  }
}
function stopLens(fly = true) {
  if (!lensActive.value) return
  lensActive.value = false
  if (fly) resetView()
}
function resetView() {
  lensActive.value = false
  if (phase.value === 'tray') flyToTray()
  else room.value?.flyTo(ANATOMY_POS.clone(), ANATOMY_TARGET.clone())
}

const hint = ref<string | null>(null)
function flash(text: string) {
  hint.value = text
  setTimeout(() => { if (hint.value === text) hint.value = null }, 4200)
}

// --- Each frame ---------------------------------------------------------------------------------------
let clock = 0
function syncScene(dt: number) {
  clock += dt
  const k = 1 - Math.exp(-dt * 7)
  holder.position.lerp(holderGoal.pos, k)
  holder.quaternion.slerp(holderGoal.quat, k)
  if (Math.abs(sitGoal - sitNow) > 0.002) { sitNow += (sitGoal - sitNow) * k; applySit(sitNow) }
  if (Math.abs(poseGoal - poseNow) > 0.002) {
    poseNow += (poseGoal - poseNow) * k
    frog.setPose(poseNow)
  }
  for (const key of Object.keys(flapGoal) as FlapKey[]) {
    const f = frog.flaps[key]
    const lg = liftGoal[layerOf(key)]
    if (Math.abs(f.open - flapGoal[key]) > 0.001 || Math.abs(f.lift - lg) > 0.001) {
      f.open += (flapGoal[key] - f.open) * Math.min(1, dt * 3.2)
      f.lift += (lg - f.lift) * k
      if (Math.abs(f.open - flapGoal[key]) < 0.002) f.open = flapGoal[key]
      if (Math.abs(f.lift - lg) < 0.002) f.lift = lg
      f.update()
    }
  }
  pinFlapsWhenOpen()
  if (heldOrgan.value && heldLift < 1) {
    heldLift = Math.min(1, heldLift + dt * 2.5)
    frog.setOrganLift(heldOrgan.value, heldLift)
  }
  frog.tick(clock, alive.value)
  if (clipActive.value) updateClip()

  // the forceps holding up the skin while it is cut
  liftForceps.visible = !!liftForcepsAt
  if (liftForcepsAt) {
    liftForceps.position.copy(liftForcepsAt).add(new THREE.Vector3(0, -0.0035, 0))
    liftForceps.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), new THREE.Vector3(-0.55, -1, 0.25).normalize())
  }
  const layer = activeCutLayer()
  if (guides.skin) guides.skin.visible = layer === 'skin' && !cutDone.skin
  if (guides.muscle) guides.muscle.visible = layer === 'muscle' && !cutDone.muscle
  if (cutLines.skin) cutLines.skin.visible = flapGoal.skinR === 0
  if (cutLines.muscle) cutLines.muscle.visible = flapGoal.muscleR === 0 && flapGoal.skinR === 1
}

onMounted(async () => {
  await nextTick()
  if (!host.value) return
  try {
    room.value = createStudio(host.value, { cameraPosition: ANATOMY_POS, target: ANATOMY_TARGET })
  } catch (err) {
    console.error('Virtual Lab: WebGL unavailable', err)
    unsupported.value = true
    return
  }
  // looking at the frog: dragging turns the frog itself, the wheel zooms
  room.value.controls.enableRotate = false
  room.value.controls.enablePan = false
  buildScene(room.value.scene)
  room.value.onFrame(syncScene)
  restoreToStep()
})

onBeforeUnmount(() => {
  window.removeEventListener('pointermove', onPressMove)
  window.removeEventListener('pointerup', onPressUp)
  window.clearTimeout(tipTimer)
  frog?.dispose()
  room.value?.dispose()
})

function setObjectState() {
  // Nothing switchable in this practical - kept for the renderer interface.
}
function goToView(_view: CameraView) {
  resetView()
}

/** Where a frog-local point is on the screen (for tests and tours) */
function screenOf(local: { x: number; y: number; z: number }) {
  const r = room.value
  if (!r || !frog) return null
  const w = frog.root.localToWorld(new THREE.Vector3(local.x, local.y, local.z)).project(r.camera)
  const rect = r.renderer.domElement.getBoundingClientRect()
  return { x: rect.left + ((w.x + 1) / 2) * rect.width, y: rect.top + ((1 - w.y) / 2) * rect.height }
}
const model = (): FrogModel | undefined => frog

defineExpose({
  setObjectState, goToView, pickFromTray, placedKeys, selectTool, tool, layOnBack, setSection, setView, section, phase,
  pinnedFeet, cutProgress, cutDone, lifted, flapGoal, record, screenOf, heldOrgan, pickBox, sortOpen, alive, infoKey, model,
  applyStage, snap, sortOrgan, activeCutLayer, room, closeUpOrgan,
})
</script>
