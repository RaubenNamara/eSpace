<template>
  <div
    ref="wrap"
    class="relative w-full h-full overflow-hidden bg-[radial-gradient(ellipse_at_center,#eef1f5_0%,#d5dce4_60%,#b9c3ce_100%)] dark:bg-[radial-gradient(ellipse_at_center,#2b3442_0%,#161b24_100%)] focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
    tabindex="0"
    aria-label="3D anatomy viewer. Arrow keys rotate, plus and minus zoom, F front view, R reset, Escape clears the selection."
    @keydown="onKey"
  >
    <div v-if="supported" ref="host" class="absolute inset-0 cursor-grab active:cursor-grabbing"></div>
    <AnatomyErrorState
      v-else
      class="absolute inset-0"
      title="3D is not available on this device"
      message="This browser or device cannot show WebGL 3D graphics. You can still browse every structure in the list and read about it."
    />

    <!-- labels follow the model -->
    <div v-if="supported && labelsOn" class="absolute inset-0 pointer-events-none" aria-hidden="true">
      <div
        v-for="l in placed"
        :key="l.key"
        class="absolute -translate-x-1/2 -translate-y-full flex flex-col items-center"
        :style="{ left: `${l.x}px`, top: `${l.y}px` }"
      >
        <span
          class="px-1.5 py-0.5 rounded-md text-[11px] font-semibold whitespace-nowrap shadow-sm"
          :class="l.selected ? 'bg-indigo-600 text-white' : 'bg-white/90 text-gray-800 dark:bg-gray-800/90 dark:text-gray-100'"
        >{{ l.name }}</span>
        <span class="w-px h-2 bg-gray-500/70"></span>
        <span class="w-1.5 h-1.5 rounded-full bg-gray-700 dark:bg-gray-200 -mt-0.5"></span>
      </div>
    </div>

    <div v-if="hoverName" class="absolute bottom-2 left-2 px-2 py-1 rounded-lg bg-black/60 text-white text-xs pointer-events-none">{{ hoverName }}</div>
    <slot />
  </div>
</template>

<script setup lang="ts">
import { ref, shallowRef, watch, onMounted, onBeforeUnmount, computed } from 'vue'
import * as THREE from 'three'
import { AnatomyEngine } from '@/anatomy/engine'
import { webglAvailable } from '@/anatomy/scene'
import type { AnatomyIndex } from '@/anatomy/metadata'
import type { ClipSpec, LoadState, ReproSex, SystemKey, ViewName } from '@/anatomy/types'
import AnatomyErrorState from './AnatomyErrorState.vue'

export interface LabelSpec { key: string; name: string; ids: string[] }

const props = defineProps<{
  index: AnatomyIndex
  baseUrl: string
  systems: SystemKey[]
  selection: string[]
  isolate: boolean
  seeThrough: boolean
  showSensitive: boolean
  labelsOn: boolean
  labels: LabelSpec[]
  selectedLabelKey: string | null
  clip?: ClipSpec | null
  reproSex?: ReproSex
}>()
const emit = defineEmits<{
  pick: [string | null]
  'load-state': [SystemKey, LoadState]
  clear: []
}>()

const wrap = ref<HTMLElement | null>(null)
const host = ref<HTMLElement | null>(null)
const supported = ref(typeof window !== 'undefined' && webglAvailable())
const engine = shallowRef<AnatomyEngine | null>(null)
const hoverId = ref<string | null>(null)
const hoverName = computed(() => {
  const id = hoverId.value
  if (!id) return null
  const g = props.index.groupOf(id)
  return g?.name ?? props.index.structure(id)?.name ?? null
})

// --- labels: projected each rendered frame, overlapping ones dropped ---
const placed = ref<{ key: string; name: string; x: number; y: number; selected: boolean }[]>([])
const centres = new Map<string, THREE.Vector3>()
let offFrame: (() => void) | null = null
function updateLabels() {
  const e = engine.value
  if (!e || !props.labelsOn) { if (placed.value.length) placed.value = []; return }
  const out: typeof placed.value = []
  const boxes: { x0: number; x1: number; y0: number; y1: number }[] = []
  // the selected label first so it is never the one dropped
  const ordered = [...props.labels].sort((a, b) => Number(b.key === props.selectedLabelKey) - Number(a.key === props.selectedLabelKey))
  for (const l of ordered) {
    let c = centres.get(l.key)
    if (!c) { c = e.centreOf(l.ids); centres.set(l.key, c) }
    const p = e.project(c)
    if (!p) continue
    const w = l.name.length * 6.2 + 14, h = 18
    const b = { x0: p.x - w / 2, x1: p.x + w / 2, y0: p.y - 28, y1: p.y - 28 + h }
    if (boxes.some(o => b.x0 < o.x1 && b.x1 > o.x0 && b.y0 < o.y1 && b.y1 > o.y0)) continue
    boxes.push(b)
    out.push({ key: l.key, name: l.name, x: p.x, y: p.y, selected: l.key === props.selectedLabelKey })
  }
  placed.value = out
}

onMounted(() => {
  if (!supported.value || !host.value) return
  try {
    const e = new AnatomyEngine(host.value, props.index, {
      baseUrl: props.baseUrl,
      onLoadState: (s, st) => {
        if (st.status === 'ready') centres.clear()
        emit('load-state', s, st)
      },
      onPick: id => emit('pick', id),
      onHover: id => { hoverId.value = id },
    })
    engine.value = e
    e.setSeeThroughSkin(props.seeThrough)
    e.setShowSensitive(props.showSensitive)
    e.setReproSex(props.reproSex ?? 'female')
    e.setIsolate(props.isolate)
    e.setSelection(props.selection)
    e.setClip(props.clip ?? null)
    void e.setSystems(props.systems)
    offFrame = e.view.onFrame(updateLabels)
  } catch {
    // WebGL context creation can still fail (blocked GPU, too many contexts)
    supported.value = false
  }
})

onBeforeUnmount(() => {
  offFrame?.()
  engine.value?.dispose()
  engine.value = null
})

watch(() => props.systems.slice().sort().join(), () => { void engine.value?.setSystems(props.systems) })
watch(() => props.selection.join(), () => engine.value?.setSelection(props.selection))
watch(() => props.isolate, v => engine.value?.setIsolate(v))
watch(() => props.seeThrough, v => engine.value?.setSeeThroughSkin(v))
watch(() => props.showSensitive, v => engine.value?.setShowSensitive(v))
watch(() => props.reproSex, v => engine.value?.setReproSex(v ?? 'female'))
watch(() => JSON.stringify(props.clip ?? null), () => engine.value?.setClip(props.clip ?? null))
watch(() => [props.labelsOn, props.labels.map(l => l.key).join(), props.selectedLabelKey], () => {
  updateLabels()
  engine.value?.view.requestRender()
})

function onKey(e: KeyboardEvent) {
  const en = engine.value
  if (!en) return
  const step = e.shiftKey ? 0.35 : 0.12
  const keys: Record<string, () => void> = {
    ArrowLeft: () => en.orbit(-step, 0),
    ArrowRight: () => en.orbit(step, 0),
    ArrowUp: () => en.orbit(0, -step),
    ArrowDown: () => en.orbit(0, step),
    '+': () => en.zoom(0.85),
    '=': () => en.zoom(0.85),
    '-': () => en.zoom(1.18),
    f: () => en.setView('front'),
    b: () => en.setView('back'),
    r: () => en.resetCamera(),
    Escape: () => emit('clear'),
  }
  const fn = keys[e.key]
  if (fn) { e.preventDefault(); fn() }
}

defineExpose({
  setView: (v: ViewName) => engine.value?.setView(v),
  resetCamera: () => engine.value?.resetCamera(),
  zoom: (f: number) => engine.value?.zoom(f),
  focus: (ids: string[], from?: ViewName, margin?: number) => engine.value?.focus(ids, from, margin),
  retry: (s: SystemKey) => engine.value?.retry(s),
  engine,
  focusViewer: () => wrap.value?.focus(),
})
</script>
