<template>
  <div>
    <!-- Top bar -->
    <div class="flex flex-wrap items-center gap-x-3 gap-y-2 mb-3">
      <RouterLink :to="`/${role}/virtual-lab`" class="p-2 rounded-xl text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800" aria-label="Back to the Science Lab">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" /></svg>
      </RouterLink>
      <div class="min-w-0 flex-1">
        <p class="text-[11px] font-bold uppercase tracking-wide text-indigo-600 dark:text-indigo-300">Virtual Lab · Biology</p>
        <h1 class="text-lg sm:text-xl font-bold text-gray-900 dark:text-white leading-tight">Anatomy Explorer</h1>
      </div>
      <RouterLink :to="`/${role}/anatomy/modules`" class="px-3 py-1.5 rounded-lg bg-indigo-600 text-white text-xs font-semibold hover:bg-indigo-700">Modules, tours &amp; quizzes</RouterLink>
      <div class="flex rounded-lg border border-gray-300 dark:border-gray-600 overflow-hidden" role="radiogroup" aria-label="Level of detail">
        <button
          v-for="l in LEVELS"
          :key="l.key"
          type="button"
          role="radio"
          :aria-checked="level === l.key"
          class="px-3 py-1.5 text-xs font-semibold focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-indigo-500"
          :class="level === l.key ? 'bg-indigo-600 text-white' : 'text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800'"
          :title="l.hint"
          @click="setLevel(l.key)"
        >{{ l.label }}</button>
      </div>
    </div>

    <AnatomyErrorState
      v-if="manifestError"
      class="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 min-h-[40vh]"
      title="The anatomy model could not be loaded"
      :message="manifestError"
      retryable
      @retry="loadData"
    />
    <div v-else-if="!index" class="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 min-h-[40vh] flex items-center justify-center" role="status">
      <p class="text-sm text-gray-500">Loading the anatomy model…</p>
    </div>

    <div
      v-else
      :class="labMaximized
        ? 'fixed inset-0 z-[60] bg-white dark:bg-gray-900 p-2 grid gap-2 grid-rows-[auto_minmax(0,1fr)] lg:grid-rows-1'
        : 'grid gap-3'"
      :style="gridStyle"
    >
      <!-- Left: search, systems, text list -->
      <aside
        v-show="leftOpen"
        class="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-3 space-y-4 overflow-x-hidden lg:overflow-y-auto"
        :class="[labMaximized ? 'hidden lg:block' : '', 'order-3 lg:order-none lg:max-h-[calc(100vh-10rem)]']"
        aria-label="Anatomy panel"
      >
        <AnatomySearch :index="index" :level="level" :hidden="showSensitive ? [] : ['reproductive']" :sex="reproSex" @select="onSearch" />
        <AnatomySystemSelector v-model="systems" v-model:show-sensitive="showSensitive" v-model:repro-sex="reproSex" :manifest="manifest" :states="loadStates" @retry="retrySystem" @watch="watchSystem" />
        <details class="group border-t border-gray-100 dark:border-gray-700 pt-3" :open="!webgl">
          <summary class="flex items-center justify-between text-[11px] font-bold uppercase tracking-wide text-gray-500 dark:text-gray-400 cursor-pointer select-none list-none">
            All structures as a list
            <svg class="w-4 h-4 transition-transform group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 9l6 6 6-6" /></svg>
          </summary>
          <div class="mt-2">
            <AnatomyStructureList :index="index" :systems="systems" :selected-key="selected?.scope === 'group' ? selected.key : selectedGroupKey" :show-sensitive="showSensitive" :sex="reproSex" @select="selectGroup" />
          </div>
        </details>
      </aside>

      <!-- Middle: the 3D view -->
      <section class="relative order-1 lg:order-none rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden" :class="labMaximized ? 'h-full min-h-0' : 'h-[58vh] min-h-[340px] lg:h-[calc(100vh-10rem)]'">
        <AnatomyViewer
          ref="viewer"
          :index="index"
          :base-url="BASE"
          :systems="systems"
          :selection="selected?.ids ?? []"
          :isolate="isolate"
          :see-through="seeThrough"
          :show-sensitive="showSensitive"
          :repro-sex="reproSex"
          :labels-on="labelsOn"
          :labels="labelSpecs"
          :selected-label-key="selectedGroupKey"
          @pick="onPick"
          @load-state="onLoadState"
          @clear="clearSelection"
        >
          <div class="absolute top-2 left-2 right-2">
            <AnatomyToolbar
              v-model:labels="labelsOn"
              v-model:see-through="seeThrough"
              v-model:isolate="isolate"
              v-model:living="living"
              :has-selection="!!selected"
              :fullscreen="labMaximized"
              @view="v => viewer?.setView(v)"
              @zoom="f => viewer?.zoom(f)"
              @reset="viewer?.resetCamera()"
              @fullscreen="labMaximized ? exitMaximize() : enterMaximize()"
            />
          </div>
          <AnatomyLoadingState :states="loadStates" class="!top-14" />
          <!-- what the system being watched is doing -->
          <div v-if="watching && living && LIVING[watching]" class="absolute bottom-12 left-1/2 -translate-x-1/2 w-[min(36rem,calc(100%-1.5rem))] flex items-start gap-3 px-4 py-2.5 rounded-2xl bg-gray-900/85 text-white text-sm shadow-lg" role="status" aria-live="polite">
            <span class="flex-1"><span class="font-semibold">{{ SYSTEM_BY_KEY[watching].name }}:</span> {{ LIVING[watching]!.caption }}</span>
            <RouterLink :to="`/${role}/anatomy/systems/${watching}`" class="flex-shrink-0 text-xs font-semibold underline text-indigo-200">Step by step ›</RouterLink>
            <button type="button" class="flex-shrink-0 text-white/70 hover:text-white" aria-label="Close" @click="watching = null">✕</button>
          </div>
          <div class="absolute bottom-2 right-2 flex gap-1.5">
            <button type="button" class="px-2 py-1 rounded-lg bg-white/90 dark:bg-gray-800/90 shadow-sm text-[11px] font-semibold text-gray-700 dark:text-gray-200 hidden lg:block" :aria-pressed="!leftOpen" @click="leftOpen = !leftOpen">{{ leftOpen ? 'Hide' : 'Show' }} panel</button>
            <button type="button" class="px-2 py-1 rounded-lg bg-white/90 dark:bg-gray-800/90 shadow-sm text-[11px] font-semibold text-gray-700 dark:text-gray-200 hidden lg:block" :aria-pressed="!rightOpen" @click="rightOpen = !rightOpen">{{ rightOpen ? 'Hide' : 'Show' }} details</button>
          </div>
          <p v-if="!systems.length" class="absolute inset-0 flex items-center justify-center text-sm text-gray-500 pointer-events-none">Choose a body system to show.</p>
        </AnatomyViewer>
      </section>

      <!-- Right: details -->
      <aside
        v-show="rightOpen || !!selected"
        class="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-4 lg:overflow-y-auto"
        :class="[labMaximized ? 'hidden lg:block' : '', 'order-2 lg:order-none lg:max-h-[calc(100vh-10rem)]', !rightOpen ? 'lg:hidden' : '']"
        aria-label="Details"
      >
        <AnatomyDetailsPanel :info="info" :level="level" @clear="clearSelection" @focus="focusSelection" @full-view="fullView" />
      </aside>
    </div>

    <!-- Licence / attribution, as the CC BY licence requires -->
    <p v-if="manifest" class="mt-3 text-[11px] text-gray-500 dark:text-gray-400">
      3D anatomy: <a :href="manifest.source.url" target="_blank" rel="noopener" class="underline">{{ manifest.source.name }} {{ manifest.source.version }}</a>,
      © {{ manifest.source.holder }}, licensed under <a :href="manifest.source.licenceUrl" target="_blank" rel="noopener" class="underline">{{ manifest.source.licence }}</a>.
      <template v-for="x in manifest.extraSources ?? []" :key="x.version">
        {{ x.covers }}: <a :href="x.url" target="_blank" rel="noopener" class="underline">{{ x.name }} {{ x.version }}</a>, © {{ x.holder }}, licensed under <a :href="x.licenceUrl" target="_blank" rel="noopener" class="underline">{{ x.licence }}</a>.
      </template>
      {{ manifest.source.changes }} The model is of one adult male; it is a teaching aid, not a medical reference.
    </p>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, onBeforeUnmount, shallowRef } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { labRoleOf } from '@/components/ictlab/types'
import { useFullscreenLab } from '@/components/virtuallab/lab3d/useFullscreenLab'
import { AnatomyIndex, loadManifest, type SearchResult } from '@/anatomy/metadata'
import { contentFor } from '@/anatomy/content'
import { SYSTEMS, SYSTEM_BY_KEY, systemAvailability, filesForSystem } from '@/anatomy/systems'
import { LIVING, livingEffect } from '@/anatomy/living'
import { useReproSex } from '@/anatomy/useReproSex'
import type { Effect } from '@/anatomy/effects'
import { webglAvailable } from '@/anatomy/scene'
import type { AnatomyManifest, DetailLevel, LoadState, SystemKey } from '@/anatomy/types'
import AnatomyViewer, { type LabelSpec } from '@/components/anatomy/AnatomyViewer.vue'
import AnatomyToolbar from '@/components/anatomy/AnatomyToolbar.vue'
import AnatomySystemSelector from '@/components/anatomy/AnatomySystemSelector.vue'
import AnatomySearch from '@/components/anatomy/AnatomySearch.vue'
import AnatomyDetailsPanel from '@/components/anatomy/AnatomyDetailsPanel.vue'
import AnatomyLoadingState from '@/components/anatomy/AnatomyLoadingState.vue'
import AnatomyErrorState from '@/components/anatomy/AnatomyErrorState.vue'
import AnatomyStructureList from '@/components/anatomy/AnatomyStructureList.vue'

const BASE = `${import.meta.env.BASE_URL}anatomy/bodyparts3d`
const LEVELS: { key: DetailLevel; label: string; hint: string }[] = [
  { key: 'school', label: 'School', hint: 'Select whole organs, with school-level descriptions' },
  { key: 'advanced', label: 'Advanced', hint: 'Select each named part, with technical names and ids' },
]
/** First view: the skin see-through over the skeleton and the main organs (about 4 MB) */
const DEFAULT_SYSTEMS: SystemKey[] = ['integumentary', 'skeletal', 'respiratory', 'digestive', 'nervous', 'urinary']

const route = useRoute()
const router = useRouter()
const role = computed(() => labRoleOf(route.path))
const { labMaximized, enterMaximize, exitMaximize } = useFullscreenLab()
const webgl = typeof window !== 'undefined' && webglAvailable()

const manifest = shallowRef<AnatomyManifest | null>(null)
const index = shallowRef<AnatomyIndex | null>(null)
const manifestError = ref<string | null>(null)
const viewer = ref<InstanceType<typeof AnatomyViewer> | null>(null)

const level = ref<DetailLevel>('school')
const systems = ref<SystemKey[]>([])
const showSensitive = ref(false)
const reproSex = useReproSex()
const seeThrough = ref(true)
const isolate = ref(false)
const labelsOn = ref(false)
const leftOpen = ref(true)
const rightOpen = ref(true)
const loadStates = ref<Partial<Record<SystemKey, LoadState>>>({})
const selected = ref<{ scope: 'group' | 'structure'; key: string; ids: string[] } | null>(null)

const gridStyle = computed(() => {
  const cols = [leftOpen.value ? '18rem' : null, 'minmax(0,1fr)', rightOpen.value ? '20rem' : null].filter(Boolean).join(' ')
  return isLarge.value ? { gridTemplateColumns: cols } : {}
})
const largeQuery = typeof window !== 'undefined' ? window.matchMedia('(min-width: 1024px)') : null
const isLarge = ref(!!largeQuery?.matches)
const onLarge = () => { isLarge.value = !!largeQuery?.matches }
largeQuery?.addEventListener('change', onLarge)
onBeforeUnmount(() => largeQuery?.removeEventListener('change', onLarge))

async function loadData() {
  manifestError.value = null
  try {
    const m = await loadManifest(`${BASE}/manifest.json`)
    manifest.value = m
    index.value = new AnatomyIndex(m)
    // deep links from lessons: ?systems=skeletal,muscular&focus=digestive/liver
    const fromUrl = String(route.query.systems ?? '').split(',').filter(Boolean) as SystemKey[]
    const wanted = fromUrl.length ? fromUrl : DEFAULT_SYSTEMS
    systems.value = wanted.filter(s => SYSTEMS.some(d => d.key === s) && systemAvailability(m, s) === 'available')
    const focus = typeof route.query.focus === 'string' ? route.query.focus : null
    if (focus && index.value.group(focus)) setTimeout(() => selectGroup(focus), 0)
  } catch (e) {
    manifestError.value = e instanceof Error ? e.message : 'Unknown error'
  }
}
onMounted(loadData)

// keep the shown systems in the address bar so a teacher can share the exact view
watch(systems, (s) => {
  if (!index.value) return
  const q = { ...route.query, systems: s.join(',') }
  if (q.systems !== route.query.systems) router.replace({ query: q }).catch(() => {})
})

function onLoadState(system: SystemKey, state: LoadState) {
  loadStates.value = { ...loadStates.value, [system]: state }
  if (state.status === 'ready') restartLiving()
}

// --- living body: every shown system working (heartbeat, blood flow, breathing, digestion...) ---
const living = ref(true)
const watching = ref<SystemKey | null>(null)
let livingFx: Effect | null = null
let offLiving: (() => void) | null = null
function stopLiving() {
  offLiving?.(); offLiving = null
  livingFx?.dispose(); livingFx = null
  viewer.value?.engine?.setAnimating(false)
}
function restartLiving() {
  stopLiving()
  const engine = viewer.value?.engine
  const idx = index.value
  if (!engine || !idx || !living.value) return
  // only systems whose files are in; the rest join when they finish loading
  const ready = systems.value.filter(s => filesForSystem(idx.manifest, s).every(f => engine.isLoaded(f)))
  if (!ready.some(s => LIVING[s]?.specs.length)) return
  livingFx = livingEffect({ engine, index: idx }, ready)
  let t0 = -1
  offLiving = engine.view.onBeforeFrame(t => { if (t0 < 0) t0 = t; livingFx?.update(t - t0) })
  engine.setAnimating(true)
}
watch([() => systems.value.join(), living, showSensitive], () => restartLiving())
watch(systems, s => { if (watching.value && !s.includes(watching.value)) watching.value = null })
onBeforeUnmount(stopLiving)

/** "See it working": show the system (with what it needs), turn on living, frame it, explain it */
function watchSystem(key: SystemKey) {
  const def = LIVING[key]
  systems.value = [key, ...(def?.companions ?? [])].filter(s => manifest.value && systemAvailability(manifest.value, s) === 'available')
  living.value = true
  isolate.value = false
  selected.value = null
  watching.value = key
  const ids = def?.focus?.flatMap(k => index.value?.group(k)?.ids ?? []) ?? index.value?.structuresIn([key]).map(s => s.id) ?? []
  setTimeout(() => viewer.value?.focus(ids, def?.view ?? 'front', 1.25), 60)
}
function retrySystem(system: SystemKey) { viewer.value?.retry(system) }

// --- selection ---
const selectedGroupKey = computed(() => {
  const s = selected.value
  if (!s || !index.value) return null
  return s.scope === 'group' ? s.key : index.value.groupOf(s.key)?.key ?? null
})
const info = computed(() => selected.value && index.value ? index.value.describe(selected.value, level.value) : null)

function onPick(id: string | null) {
  if (!id || !index.value) { clearSelection(); return }
  selected.value = index.value.selectionFor(id, level.value)
  rightOpen.value = true
}
function clearSelection() {
  selected.value = null
  isolate.value = false
}
function setLevel(l: DetailLevel) {
  level.value = l
  // from a single part back to its whole organ when going to school level
  const s = selected.value
  if (l === 'school' && s?.scope === 'structure' && index.value) selected.value = index.value.selectionFor(s.key, 'school')
}
/** make sure the system holding a structure is shown */
function showSystemOf(system: SystemKey) {
  if (!systems.value.includes(system)) systems.value = [...systems.value, system]
}
function selectGroup(key: string) {
  const g = index.value?.group(key)
  if (!g) return
  showSystemOf(g.system)
  selected.value = { scope: 'group', key: g.key, ids: [...g.ids] }
  rightOpen.value = true
  viewer.value?.focus(g.ids)
}
function onSearch(r: SearchResult) {
  if (r.type === 'group') { selectGroup(r.key); return }
  const s = index.value?.structure(r.key)
  if (!s) return
  showSystemOf(s.system)
  selected.value = { scope: 'structure', key: s.id, ids: [s.id] }
  rightOpen.value = true
  viewer.value?.focus([s.id])
}
function focusSelection() { if (selected.value) viewer.value?.focus(selected.value.ids) }
function fullView() {
  isolate.value = false
  viewer.value?.resetCamera()
}

// --- labels: organs with a written description in the shown systems ---
const labelSpecs = computed<LabelSpec[]>(() => {
  const idx = index.value
  if (!idx || !labelsOn.value) return []
  const on = new Set(systems.value)
  const seeInside = seeThrough.value && on.size > 1
  const out: LabelSpec[] = []
  for (const g of idx.groups.values()) {
    if (!(on.has(g.system) || g.systems.some(s => on.has(s)))) continue
    if (g.system === 'reproductive' && !showSensitive.value) continue
    if (!idx.fitsSex(g.key, reproSex.value)) continue
    if (g.system === 'integumentary' && seeInside) continue
    if (!contentFor(g.name) && g.key !== selectedGroupKey.value) continue
    out.push({ key: g.key, name: g.name, ids: g.ids })
  }
  return out.slice(0, 60)
})

</script>
