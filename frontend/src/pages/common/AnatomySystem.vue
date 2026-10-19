<template>
  <div>
    <div class="flex flex-wrap items-center gap-x-2 gap-y-2 mb-2">
      <RouterLink :to="`/${role}/anatomy`" class="p-1.5 rounded-lg text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800" aria-label="Back to the Anatomy Explorer">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" /></svg>
      </RouterLink>
      <div class="min-w-0 flex-1">
        <p class="text-[10px] font-semibold uppercase tracking-wide text-indigo-600 dark:text-indigo-300">Anatomy Explorer · system on its own</p>
        <!-- the selected tab below shows the system; the heading stays for screen readers -->
        <h1 class="sr-only">{{ def?.name ?? 'Unknown system' }}</h1>
      </div>
    </div>

    <!-- system tabs -->
    <nav class="flex gap-1.5 overflow-x-auto pb-2 mb-2 -mx-4 px-4 sm:mx-0 sm:px-0" aria-label="Body systems">
      <RouterLink
        v-for="s in SYSTEMS"
        :key="s.key"
        :to="`/${role}/anatomy/systems/${s.key}`"
        class="flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-sm font-semibold"
        :class="s.key === key ? 'bg-indigo-600 border-indigo-600 text-white' : 'border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:border-indigo-400'"
        :aria-current="s.key === key ? 'page' : undefined"
      ><span class="w-2.5 h-2.5 rounded-sm" :style="{ background: s.colour }" aria-hidden="true"></span>{{ s.name.replace(' system', '').replace(' (integumentary)', '') }}</RouterLink>
    </nav>

    <AnatomyErrorState v-if="!def || !guide" class="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 min-h-[30vh]" title="Unknown system" message="Choose a body system above." />
    <AnatomyErrorState v-else-if="error" class="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 min-h-[30vh]" title="The anatomy model could not be loaded" :message="error" retryable @retry="load" />
    <div v-else-if="!index" class="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 min-h-[30vh] flex items-center justify-center" role="status"><p class="text-sm text-gray-500">Loading the anatomy model…</p></div>

    <div
      v-else
      class="grid grid-cols-1 gap-3"
      :style="panelOpen && isLarge ? { gridTemplateColumns: '22rem minmax(0,1fr)' } : {}"
      :class="labMaximized ? 'fixed inset-0 z-[60] bg-white dark:bg-gray-900 p-2 grid-rows-[minmax(0,1fr)_auto] lg:grid-rows-1' : ''"
    >
      <!-- guide -->
      <aside v-show="panelOpen" class="order-2 lg:order-none rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-4 space-y-4 lg:overflow-y-auto" :class="labMaximized ? 'hidden lg:block lg:h-full' : 'lg:h-[calc(100vh-13rem)]'">
        <p class="text-sm text-gray-700 dark:text-gray-200">{{ guide.overview }}</p>
        <p v-if="def.gaps" class="text-[11px] text-gray-500 dark:text-gray-400">{{ def.gaps }}</p>

        <!-- age-appropriate gate -->
        <label v-if="def.sensitive" class="flex items-start gap-2 text-xs rounded-lg bg-amber-50 dark:bg-amber-900/30 text-amber-900 dark:text-amber-100 px-3 py-2">
          <input v-model="showSensitive" type="checkbox" class="mt-0.5 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
          <span>Show the reproductive organs (for reproduction lessons, upper secondary).</span>
        </label>
        <div v-if="def.sensitive && showSensitive" class="grid grid-cols-2 gap-1 p-1 rounded-lg bg-gray-100 dark:bg-gray-900/60" role="radiogroup" aria-label="Which reproductive organs">
          <button v-for="o in [{ k: 'female', l: 'Female' }, { k: 'male', l: 'Male' }] as const" :key="o.k" type="button" role="radio" :aria-checked="reproSex === o.k"
            class="py-1.5 rounded-md text-xs font-semibold focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
            :class="reproSex === o.k ? 'bg-white dark:bg-gray-700 text-indigo-700 dark:text-indigo-200 shadow-sm' : 'text-gray-600 dark:text-gray-300'"
            @click="reproSex = o.k">{{ o.l }}</button>
        </div>

        <section>
          <h2 class="text-xs font-bold uppercase tracking-wide text-gray-500 dark:text-gray-400">How it works</h2>
          <ol class="mt-2 space-y-1.5">
            <li v-for="(s, i) in guide.steps" :key="i">
              <button
                type="button"
                class="w-full text-left rounded-xl border px-3 py-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
                :class="i === stepIndex ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20' : 'border-gray-200 dark:border-gray-700 hover:border-indigo-300'"
                :aria-current="i === stepIndex ? 'step' : undefined"
                @click="chooseStep(i)"
              >
                <span class="flex items-center gap-2 text-sm font-semibold text-gray-900 dark:text-white">
                  <span class="w-5 h-5 rounded-full text-[11px] flex items-center justify-center" :class="i === stepIndex ? 'bg-indigo-600 text-white' : 'bg-gray-200 dark:bg-gray-700'">{{ i + 1 }}</span>
                  {{ s.title }}
                  <span v-if="s.effect" class="ml-auto text-[10px] font-semibold text-indigo-600 dark:text-indigo-300">animated</span>
                </span>
              </button>
              <div v-if="i === stepIndex" class="px-1 pt-2">
                <p v-for="(para, j) in s.text" :key="j" class="text-sm leading-relaxed text-gray-700 dark:text-gray-200 mb-1.5">
                  <template v-for="(seg, k) in richText(para)" :key="k"><strong v-if="seg.bold" class="text-gray-900 dark:text-white">{{ seg.text }}</strong><template v-else>{{ seg.text }}</template></template>
                </p>
                <a v-for="l in s.links ?? []" :key="l.url" :href="l.url" target="_blank" rel="noopener noreferrer" class="mt-1 flex items-start gap-2 rounded-lg border border-gray-200 dark:border-gray-700 px-3 py-2 hover:border-indigo-400">
                  <svg class="w-4 h-4 mt-0.5 flex-shrink-0 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5h5v5M19 5l-8 8M10 5H6a1 1 0 00-1 1v12a1 1 0 001 1h12a1 1 0 001-1v-4" /></svg>
                  <span><span class="block text-sm font-semibold text-indigo-700 dark:text-indigo-300">{{ l.label }}</span><span class="block text-[11px] text-gray-500">{{ l.note }}</span></span>
                </a>
              </div>
            </li>
          </ol>
        </section>

        <div v-if="showDiagram" class="rounded-xl bg-gray-50 dark:bg-gray-700/50 px-3 py-2 text-sm" aria-live="polite">
          <template v-if="diagramInfo">
            <p class="font-semibold text-gray-900 dark:text-white">{{ diagramInfo.title }}</p>
            <p class="text-gray-700 dark:text-gray-200 mt-0.5">{{ diagramInfo.summary }} {{ diagramInfo.fn }}</p>
          </template>
          <p v-else class="text-gray-600 dark:text-gray-300">Click a part of the diagram to read what it does.</p>
        </div>

        <section>
          <h2 class="text-xs font-bold uppercase tracking-wide text-gray-500 dark:text-gray-400">Main parts</h2>
          <ul class="mt-2 flex flex-wrap gap-1.5">
            <li v-for="p in parts" :key="p.key">
              <button type="button" class="px-2 py-1 rounded-md border text-xs focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
                :class="p.key === partKey ? 'bg-indigo-600 border-indigo-600 text-white' : 'border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:border-indigo-400'"
                :aria-pressed="p.key === partKey" @click="choosePart(p.key)">{{ p.name }}</button>
            </li>
          </ul>
          <div v-if="partInfo" class="mt-2 rounded-xl bg-gray-50 dark:bg-gray-700/50 px-3 py-2 text-sm" aria-live="polite">
            <p class="font-semibold text-gray-900 dark:text-white">{{ partInfo.title }}</p>
            <p v-if="partInfo.function" class="text-gray-700 dark:text-gray-200 mt-0.5">{{ partInfo.function }}</p>
          </div>
        </section>

        <AnatomySystemStructures :index="index" :system="key" :selected-key="partKey" :show-sensitive="showSensitive" :sex="reproSex" @select="selectStructure" />
      </aside>

      <!-- 3D -->
      <section class="order-1 lg:order-none relative rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden" :class="labMaximized ? 'h-full min-h-0' : 'h-[55vh] min-h-[320px] lg:h-[calc(100vh-13rem)]'">
        <!-- female organs as a 3D textbook diagram (our own drawing), or the real body model -->
        <AnatomyDiagramViewer v-if="showDiagram" :selected="diagramPart" @pick="diagramPart = $event">
          <template #toolbar-start><button type="button" :class="btn(false)" :aria-pressed="!panelOpen" :aria-label="panelOpen ? 'Hide the side panel' : 'Show the side panel'" @click="panelOpen = !panelOpen">{{ panelOpen ? 'Hide panel' : 'Show panel' }}</button></template>
          <template #toolbar-end>
            <button type="button" :class="btn(false)" title="Show the organs from a real (female) body" @click="diagramMode = false">Real body model</button>
            <button type="button" :class="[btn(labMaximized), 'ml-auto']" :aria-pressed="labMaximized" @click="labMaximized ? exitMaximize() : enterMaximize()">{{ labMaximized ? 'Exit full screen' : 'Full screen' }}</button>
          </template>
        </AnatomyDiagramViewer>
        <AnatomyViewer
          v-else
          ref="viewer"
          :key="key"
          :index="index"
          :base-url="ANATOMY_BASE"
          :systems="shownSystems"
          :selection="selection"
          :isolate="false"
          :see-through="true"
          :show-sensitive="showSensitive"
          :repro-sex="reproSex"
          :labels-on="labelsOn"
          :labels="labels"
          :selected-label-key="partKey"
          @pick="onPick"
          @load-state="onLoadState"
        >
          <AnatomyLoadingState :states="loadStates" />
          <div class="absolute top-2 left-2 right-2 flex flex-wrap gap-1.5">
            <button
              type="button"
              :class="btn(false)"
              :aria-pressed="!panelOpen"
              :aria-label="panelOpen ? 'Hide the side panel' : 'Show the side panel'"
              :title="panelOpen ? 'Hide the side panel' : 'Show the side panel'"
              @click="panelOpen = !panelOpen"
            >
              <svg class="w-3.5 h-3.5 inline -mt-0.5 mr-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="4" width="18" height="16" rx="2" stroke-width="2" /><path stroke-width="2" d="M9 4v16" /><path v-if="panelOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l-2 2 2 2" /><path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10l2 2-2 2" /></svg>
              {{ panelOpen ? 'Hide panel' : 'Show panel' }}
            </button>
            <button v-if="step?.effect" type="button" :class="btn(playing)" :aria-pressed="playing" @click="togglePlay">{{ playing ? '❚❚ Pause' : '▶ Play' }}</button>
            <button type="button" :class="btn(turning)" :aria-pressed="turning" @click="turning = !turning">Turn</button>
            <button type="button" :class="btn(inBody)" :aria-pressed="inBody" @click="inBody = !inBody">Show inside the body</button>
            <button type="button" :class="btn(labelsOn)" :aria-pressed="labelsOn" @click="labelsOn = !labelsOn">Labels</button>
            <button v-if="key === 'reproductive' && reproSex === 'female' && showSensitive" type="button" :class="btn(false)" title="The same organs as a 3D textbook diagram" @click="diagramMode = true">3D diagram</button>
            <button type="button" :class="btn(false)" title="See the whole system" @click="frameWhole">Whole system</button>
            <button type="button" :class="btn(false)" title="Back to this step's view" @click="placeCamera">Reset view</button>
            <span class="inline-flex rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden bg-white/95 dark:bg-gray-900/95">
              <button type="button" class="px-2.5 py-1.5 text-xs font-bold text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 border-r border-gray-200 dark:border-gray-700" aria-label="Zoom in" title="Zoom in" @click="viewer?.zoom(0.8)">＋</button>
              <button type="button" class="px-2.5 py-1.5 text-xs font-bold text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800" aria-label="Zoom out" title="Zoom out" @click="viewer?.zoom(1.25)">−</button>
            </span>
            <button type="button" :class="[btn(labMaximized), 'ml-auto']" :aria-pressed="labMaximized" :aria-label="labMaximized ? 'Exit full screen' : 'Full screen'" @click="labMaximized ? exitMaximize() : enterMaximize()">
              <svg class="w-3.5 h-3.5 inline -mt-0.5 mr-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path v-if="!labMaximized" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5" /><path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 4v5H4M15 4v5h5M9 20v-5H4M15 20v-5h5" /></svg>
              {{ labMaximized ? 'Exit full screen' : 'Full screen' }}
            </button>
          </div>
          <!-- live caption for the animation -->
          <div v-if="caption" class="absolute bottom-3 left-1/2 -translate-x-1/2 w-[min(34rem,calc(100%-1.5rem))] px-4 py-2.5 rounded-2xl bg-gray-900/85 text-white text-sm text-center shadow-lg" role="status" aria-live="polite">{{ caption }}</div>
        </AnatomyViewer>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, onBeforeUnmount } from 'vue'
import { useRoute } from 'vue-router'
import { labRoleOf } from '@/components/ictlab/types'
import { useAnatomyData, ANATOMY_BASE, richText } from '@/anatomy/useAnatomyData'
import { SYSTEMS, SYSTEM_BY_KEY, filesForSystem } from '@/anatomy/systems'
import { guideFor } from '@/anatomy/systemGuides'
import { buildEffect, type Effect } from '@/anatomy/effects'
import type { LoadState, SystemKey } from '@/anatomy/types'
import AnatomyViewer, { type LabelSpec } from '@/components/anatomy/AnatomyViewer.vue'
import AnatomyLoadingState from '@/components/anatomy/AnatomyLoadingState.vue'
import AnatomyErrorState from '@/components/anatomy/AnatomyErrorState.vue'
import AnatomySystemStructures from '@/components/anatomy/AnatomySystemStructures.vue'
import AnatomyDiagramViewer from '@/components/anatomy/AnatomyDiagramViewer.vue'
import { contentFor } from '@/anatomy/content'
import { useFullscreenLab } from '@/components/virtuallab/lab3d/useFullscreenLab'
import { useReproSex } from '@/anatomy/useReproSex'

const route = useRoute()
const role = computed(() => labRoleOf(route.path))
const key = computed(() => String(route.params.key) as SystemKey)
const def = computed(() => SYSTEM_BY_KEY[key.value] ?? null)
const guide = computed(() => guideFor(key.value))
const { index, error, load } = useAnatomyData()
onMounted(load)

const viewer = ref<InstanceType<typeof AnatomyViewer> | null>(null)
const reproSex = useReproSex()
// female organs: the 3D textbook diagram first, the real-body model one click away
const diagramMode = ref(true)
const diagramPart = ref<string | null>(null)
const showDiagram = computed(() => key.value === 'reproductive' && reproSex.value === 'female' && showSensitive.value && diagramMode.value)
const DIAGRAM_NAMES: Record<string, [string, string]> = {
  uterus: ['Uterus', 'uterus'], cervix: ['Cervix', 'cervix'], vagina: ['Vagina', 'vagina'],
  'left-ovary': ['Ovary', 'ovary'], 'right-ovary': ['Ovary', 'ovary'],
  'left-uterine-tube': ['Fallopian tube (uterine tube)', 'uterine-tube'], 'right-uterine-tube': ['Fallopian tube (uterine tube)', 'uterine-tube'],
}
const diagramInfo = computed(() => {
  const n = diagramPart.value ? DIAGRAM_NAMES[diagramPart.value] : null
  const c = n ? contentFor(n[1]) : null
  return n && c ? { title: n[0], summary: c.summary, fn: c.function } : null
})
const { labMaximized, enterMaximize, exitMaximize } = useFullscreenLab()

// the side panel can be hidden to give the model the whole width; remembered on this device
const PANEL_KEY = 'anatomy.systemPanelOpen'
const panelOpen = ref((() => { try { return localStorage.getItem(PANEL_KEY) !== '0' } catch { return true } })())
watch(panelOpen, v => { try { localStorage.setItem(PANEL_KEY, v ? '1' : '0') } catch { /* private mode */ } })
const largeQuery = typeof window !== 'undefined' ? window.matchMedia('(min-width: 1024px)') : null
const isLarge = ref(!!largeQuery?.matches)
const onLarge = () => { isLarge.value = !!largeQuery?.matches }
largeQuery?.addEventListener('change', onLarge)
onBeforeUnmount(() => largeQuery?.removeEventListener('change', onLarge))
// the view changed size (full screen, panel): show the whole system, centred
watch([labMaximized, panelOpen], () => setTimeout(() => frameWhole(), 250))
// switching between female and male organs: frame what is now shown
watch(() => reproSex.value, (sx) => {
  partKey.value = null
  // follow the switch to the guide step about those organs
  const i = guide.value?.steps.findIndex(st => st.sex === sx) ?? -1
  if (i >= 0 && step.value?.sex && step.value.sex !== sx) stepIndex.value = i
  else setTimeout(() => frameWhole(), 150)
})
const loadStates = ref<Partial<Record<SystemKey, LoadState>>>({})
const stepIndex = ref(0)
const step = computed(() => guide.value?.steps[stepIndex.value] ?? null)
const partKey = ref<string | null>(null)
const playing = ref(true)
const turning = ref(false)
const inBody = ref(false)
const labelsOn = ref(true)
const showSensitive = ref(false)
const stage = ref(0)

const btn = (on: boolean) => ['px-2.5 py-1.5 rounded-lg shadow-sm border text-xs font-semibold focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500',
  on ? 'bg-indigo-600 border-indigo-600 text-white' : 'bg-white/95 dark:bg-gray-900/95 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200']

/** the system, plus its companions or (in body) skin and skeleton */
const shownSystems = computed<SystemKey[]>(() => {
  const set = new Set<SystemKey>([key.value, ...(guide.value?.companions ?? [])])
  if (inBody.value) { set.add('integumentary'); set.add('skeletal') }
  for (const x of step.value?.extraSystems ?? []) set.add(x)
  return [...set]
})
const parts = computed(() => (guide.value?.parts ?? []).map(k => ({ key: k, name: index.value?.group(k)?.name ?? k })).filter(p => index.value?.group(p.key) && index.value.fitsSex(p.key, reproSex.value)))
const idsOf = (keys: string[] = []) => keys.flatMap(k => index.value?.group(k)?.ids ?? [])
const selection = computed(() => partKey.value ? idsOf([partKey.value]) : idsOf(step.value?.highlight))
const labels = computed<LabelSpec[]>(() => {
  // a step can label organs with textbook names (e.g. "Fallopian tube"), like a diagram
  const own = step.value?.labels
  const out: LabelSpec[] = own && index.value
    ? own.map((l, i) => ({ key: `step-${i}`, name: l.name, ids: l.group ? idsOf([l.group]) : index.value!.manifest.structures.filter(x => l.match!.test(x.name)).map(x => x.id) })).filter(l => l.ids.length)
    : parts.value.map(p => ({ key: p.key, name: p.name, ids: idsOf([p.key]) }))
  // whatever is selected from the full list gets a label too
  const g = partKey.value ? index.value?.group(partKey.value) : null
  if (g && !out.some(l => l.key === g.key)) out.push({ key: g.key, name: g.name, ids: g.ids })
  return out
})
const partInfo = computed(() => partKey.value && index.value ? index.value.describe({ scope: 'group', key: partKey.value }, 'school') : null)
const caption = computed(() => (playing.value && step.value?.captions) ? step.value.captions[Math.min(stage.value, step.value.captions.length - 1)] : null)

/** structures that make up this system (not its companions) - the camera frames these */
const ownIds = computed(() => index.value
  ? index.value.structuresIn([key.value]).filter(s => !s.cover && (key.value === 'reproductive' || s.system !== 'reproductive') && !/^Skin of the external/.test(s.name) && (!s.sex || s.sex === reproSex.value)).map(s => s.id)
  : [])

function frame() { viewer.value?.focus(ownIds.value, 'front', 1.12) }
/** the whole system in view, from the side the current step looks at */
function frameWhole() { viewer.value?.focus(ownIds.value, step.value?.view ?? 'front', 1.08) }
/** the camera for the current step: its own close-up, or the whole system */
function placeCamera() {
  const s = step.value
  if (s?.focus?.length) viewer.value?.focus(idsOf(s.focus), s.view ?? 'front', 1.4)
  else if (s?.view) viewer.value?.focus(ownIds.value, s.view, 1.12)
  else frame()
}

function onLoadState(s: SystemKey, st: LoadState) {
  loadStates.value = { ...loadStates.value, [s]: st }
  if (st.status === 'ready') {
    if (s === key.value) setTimeout(placeCamera, 30)
    restartEffect()
  }
}
function onPick(id: string | null) {
  const g = id ? index.value?.groupOf(id) : null
  partKey.value = g && parts.value.some(p => p.key === g.key) ? g.key : g?.key ?? null
}
function choosePart(k: string) {
  partKey.value = partKey.value === k ? null : k
  if (partKey.value) viewer.value?.focus(idsOf([k]))
}
/** from the full list: select it, zoom to it and say what it is (selecting it again clears it) */
function selectStructure(k: string) {
  partKey.value = partKey.value === k ? null : k
  if (partKey.value) viewer.value?.focus(idsOf([k]))
}
function chooseStep(i: number) {
  stepIndex.value = i
  partKey.value = null
  playing.value = true
}
function togglePlay() { playing.value = !playing.value }

// --- the animation: built when its systems are loaded, removed on any change ---
let effect: Effect | null = null
let offFrame: (() => void) | null = null
function stopEffect() {
  offFrame?.(); offFrame = null
  effect?.dispose(); effect = null
  viewer.value?.engine?.setAnimating(false)
  stage.value = 0
}
function restartEffect() {
  stopEffect()
  const engine = viewer.value?.engine
  const spec = step.value?.effect
  if (!engine || !spec || !playing.value || !index.value) return
  // every file the view needs must be in before parts can be moved
  for (const s of shownSystems.value) for (const f of filesForSystem(index.value.manifest, s)) if (!engine.isLoaded(f)) return
  effect = buildEffect({ engine, index: index.value }, spec)
  let t0 = -1
  offFrame = engine.view.onBeforeFrame((t) => {
    if (t0 < 0) t0 = t
    effect?.update(t - t0)
    stage.value = effect?.stage() ?? 0
  })
  engine.setAnimating(true)
}
watch([stepIndex, playing, inBody, showSensitive], () => restartEffect())
watch(stepIndex, () => placeCamera())
// a step about female or male organs switches to them
watch(() => step.value?.sex, sx => { if (sx) reproSex.value = sx }, { immediate: true })
watch(turning, on => viewer.value?.engine?.setAutoRotate(on))
watch(key, () => { stopEffect(); stepIndex.value = 0; partKey.value = null; loadStates.value = {}; turning.value = false; showSensitive.value = false })
onBeforeUnmount(stopEffect)
</script>
