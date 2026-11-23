<template>
  <LabUnsupported v-if="unsupported" />
  <div v-else class="relative w-full h-full rounded-xl overflow-hidden bg-slate-200 select-none">
    <div ref="labHost" class="absolute inset-0" :style="{ cursor: hoverCursor }" @pointerdown.capture="onPointerDown" @pointermove="onHover"></div>

    <!-- The bench panel: choose a test tube, put things in it, heat it, record what you see -->
    <div class="absolute right-2 top-2 sm:right-3 sm:top-3 w-[17.5rem] max-w-[calc(100%-1rem)] max-h-[calc(100%-1rem)] sm:max-h-[calc(100%-1.5rem)] overflow-y-auto bg-white/95 dark:bg-gray-800/95 backdrop-blur rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-3 space-y-2.5 text-xs">
      <div class="flex flex-wrap gap-1">
        <button
          v-for="k in tubeKeys" :key="k" type="button" @click="select(k)"
          class="px-2 py-1 rounded-lg font-semibold border"
          :class="selected === k ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-200 border-gray-300 dark:border-gray-600'"
        >Tube {{ tubeLetter(k) }}</button>
        <button
          v-if="paperEnabled" type="button" @click="select(PAPER)"
          class="px-2 py-1 rounded-lg font-semibold border"
          :class="selected === PAPER ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-200 border-gray-300 dark:border-gray-600'"
        >Filter paper</button>
      </div>

      <!-- A test tube -->
      <template v-if="selected && selected !== PAPER">
        <div>
          <p class="font-bold text-gray-800 dark:text-gray-100">Test tube {{ tubeLetter(selected) }} <span class="font-normal text-gray-400">· {{ placeLabel(selected) }}</span></p>
          <p class="text-gray-500 dark:text-gray-400 mt-0.5">{{ contentsText(selected) || 'Empty and clean.' }}</p>
        </div>

        <div class="space-y-1.5">
          <p class="text-[10px] font-bold uppercase tracking-wide text-gray-400">Add</p>
          <div v-if="samples.length" class="flex gap-1">
            <select v-model="foodSource" class="flex-1 min-w-0 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 px-1.5 py-1">
              <option v-for="s in foodSources" :key="s.key" :value="s.key">{{ s.label }}</option>
            </select>
            <LabButton size="sm" :disabled="readOnly || !foodSource" @click="addFoodTo(selected)">{{ isDcpipTube(selected) ? '+1 drop' : '1 cm³' }}</LabButton>
          </div>
          <div class="flex gap-1">
            <select v-model="reagentChoice" class="flex-1 min-w-0 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 px-1.5 py-1">
              <option v-for="r in reagentList" :key="r.id" :value="r.id">{{ r.name }}</option>
            </select>
            <LabButton size="sm" :disabled="readOnly || !reagentChoice" @click="addReagentTo(selected)">{{ REAGENTS[reagentChoice as ReagentId]?.doseLabel ?? 'Add' }}</LabButton>
          </div>
        </div>

        <div class="flex flex-wrap gap-1">
          <LabButton size="sm" variant="secondary" :disabled="readOnly" @click="shake(selected)">Shake</LabButton>
          <template v-if="!placeOf[selected]">
            <LabButton v-for="b in baths" :key="b.key" size="sm" variant="secondary" :disabled="readOnly" @click="putIn(selected, b.key)">Put in {{ b.short }}</LabButton>
          </template>
          <LabButton v-else size="sm" variant="secondary" :disabled="readOnly" @click="takeOut(selected)">Take out of bath</LabButton>
          <LabButton v-if="tileEnabled" size="sm" variant="secondary" :disabled="readOnly || !canSpot(selected)" @click="spotTest(selected)">Iodine spot test</LabButton>
          <LabButton size="sm" variant="ghost" :disabled="readOnly" @click="wash(selected)">Empty &amp; wash</LabButton>
        </div>
        <div v-if="otherTubes.length" class="flex gap-1 items-center">
          <span class="text-gray-500">Pour into</span>
          <LabButton v-for="k in otherTubes" :key="k" size="sm" variant="secondary" :disabled="readOnly || !hasContents(selected)" @click="pourInto(selected, k)">{{ tubeLetter(k) }}</LabButton>
        </div>

        <div v-if="current" class="rounded-lg border p-2 space-y-1.5" :class="current.observation ? 'border-emerald-300 bg-emerald-50/70 dark:bg-emerald-900/20 dark:border-emerald-700' : 'border-gray-200 dark:border-gray-700'">
          <p v-if="current.waiting" class="text-amber-700 dark:text-amber-300">{{ current.waiting }}</p>
          <template v-if="current.observation">
            <p class="text-[10px] font-bold uppercase tracking-wide text-emerald-700 dark:text-emerald-300">Observation</p>
            <p class="text-gray-800 dark:text-gray-100">{{ current.observation }}</p>
            <p class="text-[10px] font-bold uppercase tracking-wide text-gray-400 pt-1">Deduction</p>
            <select v-model="deduction" class="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 px-1.5 py-1">
              <option value="" disabled>Choose what this shows...</option>
              <option v-for="d in current.deductions" :key="d" :value="d">{{ d }}</option>
            </select>
            <LabButton size="sm" variant="success" :disabled="readOnly || !deduction" @click="record(selected, current)">Record result</LabButton>
          </template>
        </div>

        <!-- Last iodine spot test on the tile, for this tube -->
        <div v-if="spotLook && spotLook.tube === selected" class="rounded-lg border border-emerald-300 bg-emerald-50/70 dark:bg-emerald-900/20 dark:border-emerald-700 p-2 space-y-1.5">
          <p class="text-[10px] font-bold uppercase tracking-wide text-emerald-700 dark:text-emerald-300">Spot on the tile after {{ spotLook.secs }} s</p>
          <p class="text-gray-800 dark:text-gray-100">{{ spotLook.look.observation }}</p>
          <select v-model="spotDeduction" class="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 px-1.5 py-1">
            <option value="" disabled>Choose what this shows...</option>
            <option v-for="d in DEDUCTIONS.spot_starch" :key="d" :value="d">{{ d }}</option>
          </select>
          <LabButton size="sm" variant="success" :disabled="readOnly || !spotDeduction" @click="recordSpot">Record result</LabButton>
        </div>
      </template>

      <!-- The filter paper (translucent-mark test for lipids) -->
      <template v-else-if="selected === PAPER">
        <p class="font-bold text-gray-800 dark:text-gray-100">Filter paper <span class="font-normal text-gray-400">· translucent mark test</span></p>
        <div class="flex gap-1">
          <select v-model="foodSource" class="flex-1 min-w-0 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 px-1.5 py-1">
            <option v-for="s in samples" :key="s.key" :value="s.key">{{ s.label }}</option>
          </select>
          <LabButton size="sm" :disabled="readOnly || !foodSource" @click="paperDrops">3 drops</LabButton>
        </div>
        <div class="flex gap-1">
          <LabButton size="sm" variant="secondary" :disabled="readOnly || !paper.food || paper.dried" @click="dryPaper">Dry near the flame</LabButton>
          <LabButton size="sm" variant="ghost" :disabled="readOnly" @click="resetPaper">New paper</LabButton>
        </div>
        <div class="rounded-lg border p-2 space-y-1.5" :class="paperLook.observation ? 'border-emerald-300 bg-emerald-50/70 dark:bg-emerald-900/20' : 'border-gray-200 dark:border-gray-700'">
          <p v-if="!paper.food" class="text-amber-700 dark:text-amber-300">Put 3 drops of the food at the centre of the paper.</p>
          <p v-else-if="!paper.dried" class="text-amber-700 dark:text-amber-300">Let it dry near the heat, then hold it against the light.</p>
          <template v-if="paperLook.observation">
            <p class="text-[10px] font-bold uppercase tracking-wide text-emerald-700">Observation (held against the light)</p>
            <p class="text-gray-800 dark:text-gray-100">{{ paperLook.observation }}</p>
            <select v-model="deduction" class="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 px-1.5 py-1">
              <option value="" disabled>Choose what this shows...</option>
              <option v-for="d in DEDUCTIONS.lipid" :key="d" :value="d">{{ d }}</option>
            </select>
            <LabButton size="sm" variant="success" :disabled="readOnly || !deduction" @click="recordPaper">Record result</LabButton>
          </template>
        </div>
      </template>
      <p v-else class="text-gray-500">Click a test tube in the rack, or choose one above.</p>

      <p v-if="enzymeClock" class="text-[11px] text-gray-500 border-t border-gray-100 dark:border-gray-700 pt-1.5">{{ enzymeClock }}</p>
    </div>

    <button @click="room?.resetView()" class="absolute left-2 bottom-2 sm:left-3 sm:bottom-3 px-3 py-1.5 text-xs font-semibold rounded-lg bg-white/95 dark:bg-gray-800/95 shadow-lg border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700">Reset View</button>

    <transition enter-active-class="transition duration-200 ease-out" enter-from-class="opacity-0 -translate-y-1" leave-active-class="transition duration-150 ease-in" leave-to-class="opacity-0">
      <div v-if="hint" class="absolute left-1/2 -translate-x-1/2 top-2 sm:top-3 bg-amber-500 text-white text-xs font-medium px-4 py-2 rounded-2xl shadow-lg text-center max-w-[min(26rem,calc(100%-20rem))]">{{ hint }}</div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import * as THREE from 'three'
import { canvasTexture } from './lab3d/labRoom'
import { useLabScene } from './lab3d/useLabScene'
import { createObjectMesh } from './labObjectFactory'
import LabUnsupported from './lab3d/LabUnsupported.vue'
import LabButton from './ui/LabButton.vue'
import {
  REAGENTS, DEDUCTIONS, NO_FOOD, emptyTube, addFood, addReagent, tick, lookOf, foodOf, translucentMark,
  type ReagentId, type TubeState, type Composition, type Appearance, type Look, type FoodSample,
} from './foodTestEngine'
import type { SceneObjectConfig, LabObjectDef, LabAction } from '@/types/virtualLab'
import type { CameraView } from './VirtualLabScene.vue'

/**
 * Food tests and enzyme activity on a real-looking bench: a rack of test tubes, labelled reagent
 * bottles, food samples, a boiling water bath on a tripod over a lit Bunsen burner (and, for enzyme
 * work, a 37 °C bath and an ice bath), a white spotting tile and filter paper. The student builds
 * each test themselves and the tube shows the true result (foodTestEngine.ts); they then choose the
 * deduction, which is what the practical's steps check.
 *
 * scene_objects it reads:
 *  - test_tube (keys like tubeA..tubeD): the tubes in the rack
 *  - test_tube_rack props: { reagents: ReagentId[], tile?: boolean, paper?: boolean }
 *  - specimen_bottle props: { label, composition, appearance, color } - the food samples
 *  - beaker props: { bath_temp, label } - water baths (100 = boiling, over a burner)
 */
const props = defineProps<{
  sceneObjects: SceneObjectConfig[]
  objectCatalog: LabObjectDef[]
  connections?: { from: string; to: string }[]
  readOnly?: boolean
}>()
const emit = defineEmits<{
  action: [{ objectKey: string | null; action: LabAction; value: string | null; unit?: string | null; label?: string | null; safetyIssue?: boolean; targetObjectKey?: string | null }]
}>()

const PAPER = 'paper1'
const ROOM_TEMP = 25

// --- What the practical provides -----------------------------------------------------------------
const tubeKeys = computed(() => props.sceneObjects.filter(o => o.object_type === 'test_tube').map(o => o.key))
const rackProps = computed(() => props.sceneObjects.find(o => o.object_type === 'test_tube_rack')?.props ?? {})
const reagentList = computed(() => ((rackProps.value.reagents as ReagentId[] | undefined) ?? ['iodine', 'benedicts', 'naoh', 'cuso4', 'dcpip']).map(id => REAGENTS[id]).filter(Boolean))
const tileEnabled = computed(() => !!rackProps.value.tile)
const paperEnabled = computed(() => !!rackProps.value.paper)
const samples = computed<FoodSample[]>(() => props.sceneObjects.filter(o => o.object_type === 'specimen_bottle').map(o => ({
  key: o.key,
  label: o.props?.label ?? 'Food sample',
  composition: { ...NO_FOOD, ...(o.props?.composition ?? {}) } as Composition,
  appearance: (o.props?.appearance ?? 'turbid') as Appearance,
  color: o.props?.color ?? '#f1ead2',
})))
const baths = computed(() => props.sceneObjects.filter(o => o.object_type === 'beaker' && o.props?.bath_temp !== undefined).map(o => {
  const temp = Number(o.props!.bath_temp)
  return { key: o.key, temp, label: o.props?.label ?? `${temp} °C water bath`, short: temp >= 95 ? 'boiling bath' : temp <= 12 ? 'ice bath' : `${temp} °C bath` }
}))
const tubeLetter = (k: string) => k.replace(/^tube/i, '')

// --- Tube states (plain objects; `version` tells Vue when to redraw the panel) ----------------------
const tubes = new Map<string, TubeState>()
const placeOf = reactive<Record<string, string | null>>({})
const contents = new Map<string, string[]>()
const emitted = new Set<string>()
const version = ref(0)
const bump = () => { version.value++ }
function tubeOf(k: string): TubeState {
  let t = tubes.get(k)
  if (!t) { t = emptyTube(); tubes.set(k, t); contents.set(k, []) }
  return t
}

const selected = ref<string | null>(null)
const foodSource = ref<string>('')
const reagentChoice = ref<string>('')
const deduction = ref('')
function select(k: string) {
  selected.value = k
  deduction.value = ''
  if (!foodSource.value && samples.value[0]) foodSource.value = samples.value[0].key
  if (!reagentChoice.value && reagentList.value[0]) reagentChoice.value = reagentList.value[0].id
}

const otherTubes = computed(() => tubeKeys.value.filter(k => k !== selected.value))
const foodSources = computed(() => [
  ...samples.value.map(s => ({ key: s.key, label: s.label })),
  ...tubeKeys.value.filter(k => k !== selected.value).map(k => ({ key: k, label: `Contents of tube ${tubeLetter(k)}` })),
])
const current = computed<Look | null>(() => { void version.value; return selected.value && selected.value !== PAPER ? lookOf(tubeOf(selected.value)) : null })
const hasContents = (k: string) => { void version.value; const t = tubeOf(k); return t.hasFood || Object.keys(t.reagents).length > 0 }
const isDcpipTube = (k: string) => { void version.value; return (tubeOf(k).reagents.dcpip ?? 0) > 0 }
const placeLabel = (k: string) => { const b = baths.value.find(x => x.key === placeOf[k]); return b ? `in the ${b.short}` : 'in the rack' }
const contentsText = (k: string) => { void version.value; return (contents.get(k) ?? []).join(', ') }
const canSpot = (k: string) => { void version.value; const t = tubeOf(k); return (t.reagents.starch ?? 0) > 0 }

function once(key: string, payload: Parameters<typeof emit>[1]) {
  if (emitted.has(key)) return
  emitted.add(key)
  emit('action', payload)
}
function note(k: string, text: string) {
  const list = contents.get(k) ?? []
  // "Iodine solution 3 drops" + again -> "Iodine solution 6 drops"
  list.push(text)
  contents.set(k, list)
}

function addFoodTo(k: string) {
  if (props.readOnly || !foodSource.value) return
  const t = tubeOf(k)
  const src = foodSource.value
  const sample = samples.value.find(s => s.key === src)
  const fromTube = tubes.get(src)
  if (sample) addFood(t, sample.composition, sample.appearance, sample.color)
  else if (fromTube && (fromTube.hasFood || Object.keys(fromTube.reagents).length)) addFood(t, foodOf(fromTube), fromTube.appearance, fromTube.foodColor)
  else { flash('That tube is empty.'); return }
  const label = sample?.label ?? `tube ${tubeLetter(src)}`
  if (t.reagents.dcpip) { t.dcpipDrops++; replaceNote(k, label, `${label} ${t.dcpipDrops} drop${t.dcpipDrops > 1 ? 's' : ''}`) }
  else note(k, `${label} 1 cm³`)
  once(`${k}<${src}`, { objectKey: k, action: 'pour', value: src })
  bump()
}
function replaceNote(k: string, startsWith: string, text: string) {
  const list = contents.get(k) ?? []
  const i = list.findIndex(x => x.startsWith(startsWith))
  if (i >= 0) list[i] = text; else list.push(text)
  contents.set(k, list)
}
function addReagentTo(k: string) {
  if (props.readOnly || !reagentChoice.value) return
  const id = reagentChoice.value as ReagentId
  const t = tubeOf(k)
  addReagent(t, id)
  note(k, `${REAGENTS[id].name} ${REAGENTS[id].doseLabel}`)
  if (id === 'benedicts' && t.reagents.hcl && !t.reagents.naoh) flash('Neutralise the acid with sodium hydroxide first, or the Benedict\'s will not work.')
  once(`${k}<${id}`, { objectKey: k, action: 'pour', value: id })
  bump()
}
function shake(k: string) {
  tubeOf(k).shaken = true
  shaking.set(k, 0.6)
  bump()
}
function putIn(k: string, bathKey: string) {
  placeOf[k] = bathKey
  emit('action', { objectKey: k, action: 'heat', value: bathKey })
  bump()
}
function takeOut(k: string) { placeOf[k] = null; bump() }
function wash(k: string) {
  tubes.set(k, emptyTube())
  contents.set(k, [])
  ;[...emitted].filter(e => e.startsWith(`${k}<`)).forEach(e => emitted.delete(e))
  deduction.value = ''
  bump()
}
function pourInto(src: string, dest: string) {
  const a = tubeOf(src), b = tubeOf(dest)
  if (a.reagents.ethanol && b.reagents.water) {
    // Emulsion test: the shaken ethanol extract goes into the cold water
    if (!a.shaken) { flash('Shake the food with the ethanol first.'); return }
    addFood(b, a.food, 'colourless', '#f8fafc')
    b.reagents.ethanol = (b.reagents.ethanol ?? 0) + 1
    b.pouredIntoWater = true
  } else {
    addFood(b, foodOf(a), a.appearance, a.foodColor)
    ;(Object.keys(a.reagents) as ReagentId[]).forEach((r) => { b.reagents[r] = (b.reagents[r] ?? 0) + (a.reagents[r] ?? 0) })
  }
  note(dest, `contents of tube ${tubeLetter(src)}`)
  tubes.set(src, emptyTube()); contents.set(src, [])
  emit('action', { objectKey: dest, action: 'pour', value: src })
  bump()
}

function record(k: string, look: Look) {
  if (!look.observation || !deduction.value) return
  const name = { starch: 'Starch test', reducing: 'Reducing sugar test', non_reducing: 'Non-reducing sugar test', protein: 'Protein test', vitamin_c: 'Vitamin C test', lipid: 'Lipid (emulsion) test', spot_starch: 'Iodine test', none: 'Test' }[look.test]
  emit('action', { objectKey: k, action: 'inspect', value: deduction.value, label: `${name} (tube ${tubeLetter(k)}): ${look.observation}` })
  deduction.value = ''
}

// --- Enzyme work: iodine spot test on the white tile ------------------------------------------------
const spots = reactive<{ color: string; label: string }[]>([])
function spotTest(k: string) {
  const t = tubeOf(k)
  const probe: TubeState = { ...emptyTube(), reagents: { starch: 1 }, starchLeft: t.starchLeft }
  addReagent(probe, 'iodine')
  probe.starchLeft = t.starchLeft
  const look = lookOf(probe)
  const secs = Math.round(t.enzymeSeconds)
  spots.push({ color: look.color, label: `${tubeLetter(k)} ${secs}s` })
  if (spots.length > 12) spots.shift()
  redrawTile()
  // Recorded straight away, like reading a spot on the tile
  spotLook.value = { tube: k, look, secs }
  spotDeduction.value = ''
  bump()
}
const spotDeduction = ref('')
function recordSpot() {
  const s = spotLook.value
  if (!s || !spotDeduction.value) return
  emit('action', { objectKey: s.tube, action: 'inspect', value: spotDeduction.value, label: `Iodine spot test after ${s.secs} s (tube ${tubeLetter(s.tube)}): ${s.look.observation}` })
  spotDeduction.value = ''
}
const spotLook = ref<{ tube: string; look: Look; secs: number } | null>(null)
const enzymeClock = computed(() => {
  void version.value
  const lines = tubeKeys.value.filter(k => (tubeOf(k).reagents.starch ?? 0) > 0 && ((tubeOf(k).reagents.amylase ?? 0) + (tubeOf(k).reagents.boiled_amylase ?? 0)) > 0)
    .map(k => `Tube ${tubeLetter(k)}: ${Math.round(tubeOf(k).enzymeSeconds)} s since the enzyme was added`)
  return lines.join(' · ')
})

// --- Filter paper -----------------------------------------------------------------------------------
const paper = reactive<{ food: Composition | null; dried: boolean }>({ food: null, dried: false })
const paperLook = computed(() => translucentMark(paper.food, paper.dried))
function paperDrops() {
  const s = samples.value.find(x => x.key === foodSource.value)
  if (!s) return
  paper.food = s.composition
  paper.dried = false
  emit('action', { objectKey: PAPER, action: 'pour', value: s.key })
  redrawPaper()
}
function dryPaper() {
  paper.dried = true
  emit('action', { objectKey: PAPER, action: 'heat', value: baths.value.find(b => b.temp >= 95)?.key ?? 'burner' })
  redrawPaper()
}
function resetPaper() { paper.food = null; paper.dried = false; deduction.value = ''; redrawPaper() }
function recordPaper() {
  if (!paperLook.value.observation || !deduction.value) return
  emit('action', { objectKey: PAPER, action: 'inspect', value: deduction.value, label: `Translucent mark test: ${paperLook.value.observation}` })
  deduction.value = ''
}

// --- Hints ------------------------------------------------------------------------------------------
const hint = ref<string | null>(null)
function flash(text: string, ms = 4000) { hint.value = text; setTimeout(() => { if (hint.value === text) hint.value = null }, ms) }

// --- 3D bench (metres, bench top y = 0) ---------------------------------------------------------------
const TUBE_R = 0.009
const TUBE_H = 0.15
const F = 0.2 // factory models are built 5 units to the metre
interface TubeMesh { group: THREE.Group; liquid: THREE.Mesh; ppt: THREE.Mesh; specks: THREE.Group; home: THREE.Vector3 }
const tubeMeshes = new Map<string, TubeMesh>()
const bathMeshes = new Map<string, { group: THREE.Group; water: THREE.Vector3; topY: number; bubbles: THREE.Group | null }>()
const shaking = new Map<string, number>()
let tileTex: THREE.CanvasTexture | null = null
let paperTex: THREE.CanvasTexture | null = null
let burnerGroup: THREE.Group | null = null

function glassMat() {
  return new THREE.MeshPhysicalMaterial({ color: 0xffffff, transparent: true, opacity: 0.22, roughness: 0.05, metalness: 0, depthWrite: false, side: THREE.DoubleSide })
}
function label(text: string, w = 0.05, h = 0.018, bg = '#ffffff', fg = '#111827') {
  const tex = canvasTexture(256, 92, (ctx, cw, ch) => {
    ctx.fillStyle = bg; ctx.fillRect(0, 0, cw, ch)
    ctx.fillStyle = fg; ctx.font = 'bold 34px Arial'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'
    const words = text.split(' ')
    if (text.length > 14 && words.length > 1) {
      const mid = Math.ceil(words.length / 2)
      ctx.font = 'bold 28px Arial'
      ctx.fillText(words.slice(0, mid).join(' '), cw / 2, ch * 0.3)
      ctx.fillText(words.slice(mid).join(' '), cw / 2, ch * 0.72)
    } else ctx.fillText(text, cw / 2, ch / 2)
  })
  return new THREE.Mesh(new THREE.PlaneGeometry(w, h), new THREE.MeshBasicMaterial({ map: tex, transparent: true }))
}

function buildTube(k: string, pos: THREE.Vector3): TubeMesh {
  const g = new THREE.Group()
  g.userData.tubeKey = k
  const wall = new THREE.Mesh(new THREE.CylinderGeometry(TUBE_R, TUBE_R, TUBE_H, 24, 1, true), glassMat())
  wall.position.y = TUBE_H / 2 + TUBE_R
  const bottom = new THREE.Mesh(new THREE.SphereGeometry(TUBE_R, 24, 12, 0, Math.PI * 2, Math.PI / 2, Math.PI / 2), glassMat())
  bottom.position.y = TUBE_R
  const lip = new THREE.Mesh(new THREE.TorusGeometry(TUBE_R, 0.0012, 8, 24), glassMat())
  lip.rotation.x = Math.PI / 2
  lip.position.y = TUBE_H + TUBE_R
  const liquid = new THREE.Mesh(new THREE.CylinderGeometry(TUBE_R * 0.9, TUBE_R * 0.9, 1, 24), new THREE.MeshStandardMaterial({ color: 0xe9f2f6, transparent: true, opacity: 0.4, roughness: 0.15 }))
  liquid.visible = false
  const ppt = new THREE.Mesh(new THREE.CylinderGeometry(TUBE_R * 0.88, TUBE_R * 0.7, 1, 20), new THREE.MeshStandardMaterial({ color: 0xc2410c, roughness: 0.8 }))
  ppt.visible = false
  const specks = new THREE.Group()
  for (let i = 0; i < 10; i++) {
    const s = new THREE.Mesh(new THREE.SphereGeometry(0.0009, 6, 6), new THREE.MeshBasicMaterial({ color: 0x111111 }))
    s.position.set((Math.random() - 0.5) * TUBE_R * 1.4, 0.008 + Math.random() * 0.02, (Math.random() - 0.5) * TUBE_R * 1.4)
    specks.add(s)
  }
  specks.visible = false
  g.add(wall, bottom, lip, liquid, ppt, specks)
  g.position.copy(pos)
  return { group: g, liquid, ppt, specks, home: pos.clone() }
}

/** Shows a tube's liquid: its height from what has gone in, colour and cloudiness from the engine */
function drawTube(k: string, tm: TubeMesh) {
  const t = tubeOf(k)
  const list = contents.get(k) ?? []
  const vol = list.reduce((v, item) => v + (/10 cm³/.test(item) ? 10 : /drop/.test(item) ? 0.25 : 1), 0)
  const h = Math.min(TUBE_H * 0.85, vol * 0.014)
  tm.liquid.visible = h > 0.0005
  if (!tm.liquid.visible) { tm.ppt.visible = false; tm.specks.visible = false; return }
  const look = lookOf(t)
  tm.liquid.scale.y = h
  tm.liquid.position.y = TUBE_R * 0.3 + h / 2
  const mat = tm.liquid.material as THREE.MeshStandardMaterial
  mat.color.set(look.color)
  mat.opacity = 0.35 + look.cloudy * 0.6
  if (look.precipitate) {
    const ph = h * look.precipitate.amount * 0.5
    tm.ppt.visible = true
    tm.ppt.scale.y = ph
    tm.ppt.position.y = TUBE_R * 0.3 + ph / 2
    ;(tm.ppt.material as THREE.MeshStandardMaterial).color.set(look.precipitate.color)
  } else tm.ppt.visible = false
  tm.specks.visible = look.specks
}

function bottle(text: string, color: string, isSample: boolean): THREE.Group {
  const g = new THREE.Group()
  const body = new THREE.Mesh(new THREE.CylinderGeometry(0.018, 0.018, 0.055, 24), new THREE.MeshPhysicalMaterial({ color: isSample ? 0xffffff : 0x8b5a2b, transparent: true, opacity: isSample ? 0.3 : 0.55, roughness: 0.1 }))
  body.position.y = 0.0275
  const fill = new THREE.Mesh(new THREE.CylinderGeometry(0.016, 0.016, 0.04, 20), new THREE.MeshStandardMaterial({ color, transparent: true, opacity: 0.85 }))
  fill.position.y = 0.021
  const neck = new THREE.Mesh(new THREE.CylinderGeometry(0.008, 0.012, 0.012, 16), new THREE.MeshStandardMaterial({ color: 0x1f2937, roughness: 0.6 }))
  neck.position.y = 0.061
  const teat = new THREE.Mesh(new THREE.SphereGeometry(0.008, 12, 10), new THREE.MeshStandardMaterial({ color: isSample ? 0x334155 : 0xdc2626, roughness: 0.7 }))
  teat.scale.y = 1.4
  teat.position.y = 0.074
  const tag = label(text, 0.034, 0.02)
  tag.position.set(0, 0.03, 0.0185)
  g.add(body, fill, neck, teat, tag)
  return g
}

function redrawTile() {
  if (!tileTex) return
  const cv = tileTex.image as HTMLCanvasElement
  const ctx = cv.getContext('2d')!
  ctx.fillStyle = '#fafafa'; ctx.fillRect(0, 0, cv.width, cv.height)
  for (let i = 0; i < 12; i++) {
    const x = 42 + (i % 4) * 58, y = 40 + Math.floor(i / 4) * 58
    ctx.fillStyle = '#e5e7eb'; ctx.beginPath(); ctx.arc(x, y, 22, 0, Math.PI * 2); ctx.fill()
    const s = spots[i]
    if (s) { ctx.fillStyle = s.color; ctx.beginPath(); ctx.arc(x, y, 16, 0, Math.PI * 2); ctx.fill() }
  }
  tileTex.needsUpdate = true
}
function redrawPaper() {
  if (!paperTex) return
  const cv = paperTex.image as HTMLCanvasElement
  const ctx = cv.getContext('2d')!
  ctx.fillStyle = '#f8fafc'; ctx.fillRect(0, 0, cv.width, cv.height)
  if (paper.food) {
    // Wet: a grey damp patch. Dry: only fat leaves a see-through (translucent) mark
    const show = !paper.dried || paper.food.lipid
    if (show) {
      ctx.fillStyle = paper.dried ? 'rgba(190,200,190,0.75)' : 'rgba(170,180,190,0.6)'
      ctx.beginPath(); ctx.arc(cv.width / 2, cv.height / 2, 34, 0, Math.PI * 2); ctx.fill()
    }
  }
  paperTex.needsUpdate = true
}

function buildBench(scene: THREE.Object3D) {
  // Test-tube rack with the tubes standing in it
  const keys = tubeKeys.value
  const rack = new THREE.Group()
  const wood = new THREE.MeshStandardMaterial({ color: 0xb08350, roughness: 0.7 })
  const rackW = Math.max(0.12, keys.length * 0.045 + 0.03)
  const top = new THREE.Mesh(new THREE.BoxGeometry(rackW, 0.006, 0.04), wood); top.position.y = 0.07
  const base = new THREE.Mesh(new THREE.BoxGeometry(rackW, 0.008, 0.05), wood); base.position.y = 0.004
  const ends = [-1, 1].map(s => { const e = new THREE.Mesh(new THREE.BoxGeometry(0.008, 0.075, 0.05), wood); e.position.set(s * (rackW / 2 - 0.004), 0.0375, 0); return e })
  rack.add(top, base, ...ends)
  rack.position.set(-0.05, 0, 0.07)
  scene.add(rack)
  keys.forEach((k, i) => {
    const x = -0.05 - (keys.length - 1) * 0.0225 + i * 0.045
    const tm = buildTube(k, new THREE.Vector3(x, 0.008, 0.07))
    tubeMeshes.set(k, tm)
    scene.add(tm.group)
    const tag = label(tubeLetter(k), 0.016, 0.012, '#fef3c7')
    tag.position.set(x, 0.062, 0.096)
    scene.add(tag)
  })

  // Reagent bottles along the back, food samples on the left
  reagentList.value.forEach((r, i) => {
    const b = bottle(r.name.replace(' solution', ''), r.color, false)
    b.position.set(-0.36 + i * 0.05, 0, -0.1)
    scene.add(b)
  })
  samples.value.forEach((s, i) => {
    const b = bottle(s.label, s.color, true)
    b.position.set(-0.36 + i * 0.05, 0, 0.06)
    scene.add(b)
  })

  // Water baths
  baths.value.forEach((b, i) => {
    const g = new THREE.Group()
    let topY = 0
    if (b.temp >= 95) {
      const burner = createObjectMesh('bunsen_burner', 'burner', 'Bunsen Burner', { flame: 'on' })
      const tripod = createObjectMesh('tripod_stand', 'tripod', 'Tripod Stand', {})
      const gauze = createObjectMesh('wire_gauze', 'gauze', 'Wire Gauze', {})
      gauze.position.y = 0.81
      ;[burner, tripod, gauze].forEach(m => { m.scale.setScalar(F); g.add(m) })
      burner.traverse((c) => { if (c.userData.flameLayer === 'spread') c.visible = true })
      burnerGroup = burner
      topY = 0.818 * F
    }
    const beaker = createObjectMesh('beaker', b.key, b.label, { color: b.temp <= 12 ? '#dbeafe' : '#cfe8f3' })
    beaker.scale.setScalar(F)
    beaker.position.y = topY
    g.add(beaker)
    if (b.temp <= 12) {
      for (let j = 0; j < 7; j++) {
        const ice = new THREE.Mesh(new THREE.BoxGeometry(0.014, 0.012, 0.014), new THREE.MeshPhysicalMaterial({ color: 0xffffff, transparent: true, opacity: 0.6, roughness: 0.2 }))
        ice.position.set((Math.random() - 0.5) * 0.08, topY + 0.065, (Math.random() - 0.5) * 0.08)
        ice.rotation.set(Math.random(), Math.random(), Math.random())
        g.add(ice)
      }
    }
    g.traverse((c) => { if (c.userData.role === 'label') c.visible = false })
    const tag = label(b.temp >= 95 ? 'Boiling water bath' : b.temp <= 12 ? 'Ice bath (~10 °C)' : `Water bath ${b.temp} °C`, 0.07, 0.016, '#ecfeff')
    tag.position.set(0, topY + 0.13, 0.07)
    g.add(tag)
    g.position.set(0.22 + i * 0.17, 0, -0.02)
    scene.add(g)
    bathMeshes.set(b.key, { group: g, water: new THREE.Vector3(0.22 + i * 0.17, topY, -0.02), topY, bubbles: null })
  })

  if (tileEnabled.value) {
    const cv = document.createElement('canvas'); cv.width = 256; cv.height = 192
    tileTex = new THREE.CanvasTexture(cv)
    const tile = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.008, 0.09), [
      new THREE.MeshStandardMaterial({ color: 0xf3f4f6 }), new THREE.MeshStandardMaterial({ color: 0xf3f4f6 }),
      new THREE.MeshStandardMaterial({ map: tileTex, roughness: 0.3 }), new THREE.MeshStandardMaterial({ color: 0xf3f4f6 }),
      new THREE.MeshStandardMaterial({ color: 0xf3f4f6 }), new THREE.MeshStandardMaterial({ color: 0xf3f4f6 }),
    ])
    tile.position.set(-0.2, 0.004, 0.2)
    scene.add(tile)
    redrawTile()
  }
  if (paperEnabled.value) {
    const cv = document.createElement('canvas'); cv.width = 128; cv.height = 128
    paperTex = new THREE.CanvasTexture(cv)
    const p = new THREE.Mesh(new THREE.CircleGeometry(0.045, 40), new THREE.MeshStandardMaterial({ map: paperTex, roughness: 0.9 }))
    p.rotation.x = -Math.PI / 2
    p.position.set(0.02, 0.001, 0.21)
    scene.add(p)
    redrawPaper()
  }
}

let clock = 0
let sinceBump = 0
function frame(dt: number) {
  clock += dt
  // Chemistry and enzymes keep going in real time, in whichever bath (or the room) each tube is in
  tubeKeys.value.forEach((k) => {
    const bath = baths.value.find(b => b.key === placeOf[k])
    tick(tubeOf(k), dt, bath ? bath.temp : ROOM_TEMP)
  })
  sinceBump += dt
  if (sinceBump > 0.3) { sinceBump = 0; bump() }

  // Tubes: stand in the rack, or in a bath (bottom in the water); shaking wiggles them
  const inBath = new Map<string, number>()
  tubeMeshes.forEach((tm, k) => {
    const bathKey = placeOf[k]
    const bm = bathKey ? bathMeshes.get(bathKey) : null
    if (bm) {
      const n = inBath.get(bathKey!) ?? 0
      inBath.set(bathKey!, n + 1)
      const a = n * 1.6
      tm.group.position.set(bm.water.x + Math.cos(a) * 0.03, bm.topY + 0.012, bm.water.z + Math.sin(a) * 0.03)
      tm.group.rotation.z = 0.12
    } else {
      tm.group.position.copy(tm.home)
      tm.group.rotation.z = 0
    }
    const s = shaking.get(k)
    if (s && s > 0) { tm.group.rotation.z += Math.sin(clock * 40) * 0.15; shaking.set(k, s - dt) }
    drawTube(k, tm)
    // The chosen tube is lifted a little so the student can see which one they are working with
    if (selected.value === k && !bathKey) tm.group.position.y += 0.012
  })

  // Burner flame flicker and the boiling bath's bubbles
  burnerGroup?.traverse((c) => {
    const layer = c.userData.flameLayer
    if (!layer) return
    const n = Math.sin(clock * 23) * 0.5 + Math.sin(clock * 37.7) * 0.3 + Math.sin(clock * 61.3) * 0.2
    if (layer === 'outer') c.scale.set(1 + n * 0.05, 1 + n * 0.12, 1 + n * 0.05)
    else if (layer === 'tongue') c.scale.set(1 - n * 0.06, 1 + n * 0.18, 1 - n * 0.06)
    else if (layer === 'light' && c instanceof THREE.PointLight) c.intensity = (0.8 + n * 0.25) * F
  })
  baths.value.filter(b => b.temp >= 95).forEach((b) => {
    const bm = bathMeshes.get(b.key)
    if (!bm) return
    if (!bm.bubbles) {
      const grp = new THREE.Group()
      const mat = new THREE.MeshStandardMaterial({ color: 0xffffff, transparent: true, opacity: 0.75, depthWrite: false })
      for (let i = 0; i < 30; i++) {
        const s = new THREE.Mesh(new THREE.SphereGeometry(0.0018 + Math.random() * 0.002, 8, 6), mat)
        s.position.set((Math.random() - 0.5) * 0.1, Math.random() * 0.06, (Math.random() - 0.5) * 0.1)
        s.userData.v = 0.05 + Math.random() * 0.06
        grp.add(s)
      }
      grp.position.y = bm.topY + 0.004
      bm.group.add(grp)
      bm.bubbles = grp
    }
    bm.bubbles.children.forEach((s) => {
      s.position.y += s.userData.v * dt
      if (s.position.y > 0.065) { s.position.y = 0; s.position.x = (Math.random() - 0.5) * 0.1; s.position.z = (Math.random() - 0.5) * 0.1 }
    })
  })
}

// --- Picking a tube on the bench ----------------------------------------------------------------------
const hoverCursor = ref('grab')
function tubeUnder(ev: PointerEvent): string | null {
  const hit = pick(ev, [...tubeMeshes.values()].map(t => t.group))
  return (hit?.userData.tubeKey as string) ?? null
}
function onHover(ev: PointerEvent) { hoverCursor.value = tubeUnder(ev) ? 'pointer' : 'grab' }
function onPointerDown(ev: PointerEvent) {
  if (handleFurnitureClick(ev)) return
  const k = tubeUnder(ev)
  if (k) select(k)
}

const HOME_POS: THREE.Vector3Tuple = [0.12, 0.52, 1.1]
const HOME_TARGET: THREE.Vector3Tuple = [0.14, 0.04, 0.0]
const { room, unsupported, pick, handleFurnitureClick } = useLabScene(
  { cameraPosition: HOME_POS, target: HOME_TARGET, minDistance: 0.2, maxDistance: 12, cupboard: true, wallCabinets: true, shelfCatalog: () => props.objectCatalog, benchLength: 3 },
  (r) => {
    buildBench(r.scene)
    r.onFrame(frame)
    if (tubeKeys.value[0]) select(tubeKeys.value[0])
    if (!props.readOnly) flash('Choose a test tube, add the food and the reagent, then record what you observe.')
  },
)

function setObjectState() {
  // Nothing switchable from outside - kept for the renderer interface.
}
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
