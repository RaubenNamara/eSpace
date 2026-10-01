<template>
  <div class="min-h-full">
    <div>
      <!-- Header: back link and title on one line, full screen on the right -->
      <div class="flex flex-wrap items-center gap-x-2 gap-y-2 mb-4">
        <router-link :to="`/${role}/virtual-lab`" class="inline-flex items-center gap-1 text-xs font-medium text-indigo-600 dark:text-indigo-400 hover:underline">
          <span>&larr;</span> Virtual Lab
        </router-link>
        <span class="text-gray-300 dark:text-gray-600" aria-hidden="true">/</span>
        <h1 class="text-base sm:text-lg font-bold text-gray-900 dark:text-white leading-tight">Apparatus Playground</h1>
        <button @click="enterMaximize" class="ml-auto inline-flex items-center gap-1.5 px-3.5 py-2 text-sm font-semibold rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 shadow-sm" title="Fill the whole screen with the lab">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2.2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5" /></svg>
          Full Screen Lab
        </button>
      </div>

      <!-- Slim fixed side columns on large screens so the lab takes all the remaining width -->
      <div
        class="grid grid-cols-1 gap-4 sm:gap-5 lg:transition-[grid-template-columns] lg:duration-300"
        :class="shelfPanelOpen
          ? 'lg:grid-cols-[17rem_minmax(0,1fr)_12rem] 2xl:grid-cols-[19rem_minmax(0,1fr)_14rem]'
          : 'lg:grid-cols-[3rem_minmax(0,1fr)_12rem] 2xl:grid-cols-[3rem_minmax(0,1fr)_14rem]'"
      >
        <!-- Apparatus shelves beside the lab (above it on phones and tablets). Hidden away like the
             main sidebar: a round arrow straddling the middle of its right edge, leaving a slim rail. -->
        <div class="order-1 relative">
        <div
          class="rounded-2xl shadow-sm overflow-hidden flex flex-col ring-1 ring-amber-950/20 lg:h-[calc(100svh-7rem)] lg:min-h-[560px]"
          :class="shelfPanelOpen ? 'max-h-[55svh] lg:max-h-none' : 'lg:bg-amber-950/90'"
        >
          <!-- Title bar (on large screens only while open; the rail below replaces it when hidden) -->
          <div class="flex-shrink-0 px-2 py-1.5 bg-amber-950/90 items-center gap-1.5" :class="shelfPanelOpen ? 'flex' : 'flex lg:hidden'">
            <!-- Phones and tablets: the panel sits above the lab, so it folds up and down from here -->
            <button
              type="button"
              @click="shelfPanelOpen = !shelfPanelOpen"
              class="lg:hidden flex-shrink-0 w-7 h-7 inline-flex items-center justify-center rounded-md bg-amber-100/15 text-amber-100 hover:bg-amber-100/30"
              :aria-expanded="shelfPanelOpen"
              :title="shelfPanelOpen ? 'Hide the apparatus shelves' : 'Show the apparatus shelves'"
            >
              <svg class="w-4 h-4 transition-transform" :class="shelfPanelOpen ? '' : '-rotate-90'" fill="none" stroke="currentColor" stroke-width="2.4" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M6 9l6 6 6-6" /></svg>
            </button>
            <p class="flex-1 min-w-0 truncate text-xs font-bold uppercase tracking-wider text-amber-100 flex items-center gap-1.5 lg:px-1 lg:py-1">
              <AppIcon name="kit" class="w-3.5 h-3.5" /> Apparatus Shelves
            </p>
          </div>

          <!-- Slim rail when hidden on large screens: click anywhere on it to open the shelves again -->
          <button
            v-if="!shelfPanelOpen"
            type="button"
            @click="shelfPanelOpen = true"
            class="hidden lg:flex flex-1 flex-col items-center gap-3 pt-4 text-amber-100 hover:bg-amber-100/10"
            title="Show the apparatus shelves"
            aria-label="Show the apparatus shelves"
          >
            <AppIcon name="kit" class="w-4 h-4" />
            <span class="text-[11px] font-bold uppercase tracking-[0.2em] [writing-mode:vertical-rl]">Apparatus Shelves</span>
          </button>

          <ApparatusShelves
            v-show="shelfPanelOpen"
            class="flex-1"
            :shelves="shelves"
            :counts="benchCounts"
            v-model:collapsed="collapsedShelves"
            v-model:search="shelfSearch"
            :loading="loadingCatalog"
            grid-class="grid-cols-3 sm:grid-cols-5 lg:grid-cols-3"
            @pick="addToScene"
          />
        </div>
          <!-- Large screens: round arrow on the middle of the panel's right edge, like the sidebar's -->
          <button
            type="button"
            @click="shelfPanelOpen = !shelfPanelOpen"
            class="hidden lg:flex absolute top-1/2 -right-3 -translate-y-1/2 z-10 w-6 h-6 rounded-full bg-white dark:bg-slate-800 border border-slate-400 dark:border-white/10 shadow-md items-center justify-center text-slate-600 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400 hover:border-indigo-300 dark:hover:border-indigo-500/50 transition-colors"
            :aria-expanded="shelfPanelOpen"
            :title="shelfPanelOpen ? 'Hide the apparatus shelves' : 'Show the apparatus shelves'"
          >
            <svg class="w-3.5 h-3.5 transition-transform duration-300" :class="{ 'rotate-180': !shelfPanelOpen }" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" /></svg>
          </button>
        </div>

        <!-- 3D scene - full screen only changes this wrapper's classes, so the scene isn't rebuilt -->
        <div class="order-2" :class="labMaximized ? 'fixed inset-0 z-[200] flex flex-col bg-slate-900' : ''">
          <div v-if="labMaximized" class="flex-shrink-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-3 sm:px-4 py-2 flex items-center gap-2 sm:gap-3">
            <button
              @click="shelvesOpen = !shelvesOpen"
              class="flex-shrink-0 inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-semibold rounded-lg transition-colors"
              :class="shelvesOpen ? 'bg-amber-700 text-white' : 'border border-amber-300 dark:border-amber-800 text-amber-800 dark:text-amber-300 hover:bg-amber-50 dark:hover:bg-amber-900/20'"
              :title="shelvesOpen ? 'Hide the apparatus shelves' : 'Show the apparatus shelves'"
            >
              <AppIcon name="kit" class="w-3.5 h-3.5" /> Shelves
            </button>
            <p class="hidden sm:block text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 whitespace-nowrap">Apparatus Playground</p>
            <p class="flex-1 min-w-0 truncate text-[11px] text-gray-500 dark:text-gray-400">
              <template v-if="sceneObjects.length">{{ sceneObjects.length }} on your bench</template>
              <template v-else>Pick apparatus from the shelves</template>
            </p>
            <button v-if="sceneObjects.length > 0" @click="clearBench" class="flex-shrink-0 px-2.5 py-1.5 text-xs font-medium rounded-lg text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20">Clear</button>
            <button @click="exitMaximize" class="flex-shrink-0 inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-semibold rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700">
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2.2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9 4v5H4M15 4v5h5M9 20v-5H4M15 20v-5h5" /></svg>
              Exit<span class="hidden sm:inline">&nbsp;Full Screen</span>
            </button>
          </div>

          <!-- Always present (display: contents outside full screen) so the scene below is never re-created -->
          <div :class="labMaximized ? 'relative flex flex-1 min-h-0' : 'contents'">
            <!-- The apparatus cabinet: one wooden shelf per subject, each with its name plate -->
            <transition
              enter-active-class="transition duration-200 ease-out"
              enter-from-class="-translate-x-4 opacity-0"
              leave-active-class="transition duration-150 ease-in"
              leave-to-class="-translate-x-4 opacity-0"
            >
              <aside
                v-if="labMaximized && shelvesOpen"
                class="absolute sm:relative inset-y-0 left-0 z-20 w-[86%] max-w-[22rem] sm:w-80 lg:w-[22rem] flex-shrink-0 flex flex-col shadow-2xl sm:shadow-none border-r-[6px] border-[#4a2a12]"
              >
                <ApparatusShelves
                  class="flex-1"
                  :shelves="shelves"
                  :counts="benchCounts"
                  v-model:collapsed="collapsedShelves"
                  v-model:search="shelfSearch"
                  :loading="loadingCatalog"
                  @pick="pickFromShelf"
                />
                <!-- Round hide arrow on the middle of the shelves' right edge, like the sidebar's -->
                <button
                  type="button"
                  @click="shelvesOpen = false"
                  class="absolute -right-[15px] top-1/2 -translate-y-1/2 z-30 w-6 h-6 rounded-full bg-white dark:bg-slate-800 border border-slate-400 dark:border-white/10 shadow-md flex items-center justify-center text-slate-600 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400 hover:border-indigo-300 dark:hover:border-indigo-500/50 transition-colors"
                  title="Hide the apparatus shelves"
                  aria-label="Hide the apparatus shelves"
                >
                  <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" /></svg>
                </button>
              </aside>
            </transition>
            <!-- Shelves hidden: the same round arrow on the middle of the lab's left edge brings them back -->
            <button
              v-if="labMaximized && !shelvesOpen"
              type="button"
              @click="shelvesOpen = true"
              class="absolute left-1.5 top-1/2 -translate-y-1/2 z-30 w-6 h-6 rounded-full bg-white dark:bg-slate-800 border border-slate-400 dark:border-white/10 shadow-md flex items-center justify-center text-slate-600 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400 hover:border-indigo-300 dark:hover:border-indigo-500/50 transition-colors"
              title="Show the apparatus shelves"
              aria-label="Show the apparatus shelves"
            >
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" /></svg>
            </button>
            <!-- Phones: tap the lab beside the drawer to close it -->
            <div v-if="labMaximized && shelvesOpen" class="sm:hidden absolute inset-0 z-10 bg-black/30" @click="shelvesOpen = false"></div>

          <div
            class="relative overflow-hidden"
            :class="labMaximized ? 'flex-1 min-h-0 min-w-0' : 'h-[68svh] min-h-[340px] sm:h-[72svh] lg:h-[calc(100svh-7rem)] lg:min-h-[560px] rounded-2xl shadow-lg ring-1 ring-gray-900/5'"
          >
            <!-- The bench is always there, even when empty, so its cupboard can be opened -->
            <VirtualLabScene
              ref="sceneRef"
              :scene-objects="sceneObjects"
              :object-catalog="sceneCatalog"
              fixed-view
              cupboard
              @action="onSceneAction"
              @take-chemical="takeChemical"
              @put-back="putBack"
            />
            <p v-if="sceneObjects.length === 0" class="pointer-events-none absolute top-3 left-1/2 -translate-x-1/2 w-max max-w-[90%] px-3 py-1.5 rounded-full bg-white/85 dark:bg-gray-900/80 text-gray-700 dark:text-gray-200 text-xs font-medium shadow text-center">
              Pick apparatus from the shelves, or open the cupboard doors under the bench for chemicals.
            </p>
            <!-- Brief confirmation when something comes off a shelf -->
            <transition enter-active-class="transition duration-150" enter-from-class="opacity-0 translate-y-1" leave-active-class="transition duration-300" leave-to-class="opacity-0">
              <p v-if="lastPicked" :class="sceneObjects.length === 0 ? 'top-14' : 'top-3'" class="pointer-events-none absolute z-10 left-1/2 -translate-x-1/2 px-3 py-1.5 rounded-full bg-gray-900/80 text-white text-xs font-semibold shadow">
                {{ lastPicked }}
              </p>
            </transition>
          </div>
          </div>
        </div>

        <!-- Items on bench -->
        <div class="order-3 bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-3 lg:h-[calc(100svh-7rem)] lg:min-h-[560px] lg:overflow-y-auto">
          <div class="flex items-center justify-between mb-3">
            <p class="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">On Your Bench</p>
            <button v-if="sceneObjects.length > 0" @click="clearBench" class="text-[11px] font-medium text-red-500 hover:underline">Clear all</button>
          </div>
          <div v-if="sceneObjects.length === 0" class="text-xs text-gray-400 dark:text-gray-500">Nothing here yet.</div>
          <div v-else class="space-y-1.5">
            <div v-for="o in sceneObjects" :key="o.key" class="flex items-center justify-between gap-2 bg-gray-50 dark:bg-gray-950/40 rounded-lg px-2.5 py-1.5">
              <span class="text-xs text-gray-700 dark:text-gray-200 truncate">{{ catalogByType.get(o.object_type)?.icon || '🔬' }} {{ o.props?.display_name || catalogByType.get(o.object_type)?.display_name || o.object_type }}</span>
              <button
                @click="putBack(o.key)"
                class="flex-shrink-0 w-6 h-6 inline-flex items-center justify-center rounded-md text-gray-400 hover:text-amber-700 hover:bg-amber-50 dark:hover:bg-amber-900/20"
                :title="o.props?.chemical_id ? 'Put back in the cupboard' : 'Put back on the shelf'"
                :aria-label="o.props?.chemical_id ? 'Put back in the cupboard' : 'Put back on the shelf'"
              >
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2.2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9 14L4 9l5-5M4 9h11a5 5 0 010 10h-3" /></svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import AppIcon from '@/components/common/AppIcon.vue'
import { ref, computed, watch, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'
import VirtualLabScene from '@/components/virtuallab/VirtualLabScene.vue'
import ApparatusShelves from '@/components/virtuallab/ApparatusShelves.vue'
import { chemicalById, chemicalObjectType, chemicalProps } from '@/components/virtuallab/chemicals'
import { useFullscreenLab } from '@/components/virtuallab/lab3d/useFullscreenLab'
import type { LabObjectDef, SceneObjectConfig } from '@/types/virtualLab'

// Shared by the student and teacher routes - each reads the catalogue from its own API
const role = useRoute().path.startsWith('/teacher') ? 'teacher' : 'student'

const catalog = ref<LabObjectDef[]>([])
const loadingCatalog = ref(true)
const sceneObjects = ref<SceneObjectConfig[]>([])
const sceneRef = ref<InstanceType<typeof VirtualLabScene> | null>(null)
const placedCounts: Record<string, number> = {}
const { labMaximized, enterMaximize, exitMaximize } = useFullscreenLab()

// Chemicals from the bench cupboard come out as reagent bottles (liquids) and jars (solids)
const CHEMICAL_DEFS: LabObjectDef[] = [
  { id: -1, object_type: 'reagent_bottle', display_name: 'Reagent Bottle', category: 'chemistry', description: null, default_props: { capacity_ml: 250 }, supported_actions: ['move', 'rotate', 'pour', 'inspect'], icon: '🧪', is_active: true },
  { id: -2, object_type: 'reagent_jar', display_name: 'Reagent Jar', category: 'chemistry', description: null, default_props: {}, supported_actions: ['move', 'rotate', 'inspect'], icon: '🫙', is_active: true },
]
const sceneCatalog = computed(() => [...catalog.value, ...CHEMICAL_DEFS])
const catalogByType = computed(() => new Map(sceneCatalog.value.map(o => [o.object_type, o])))

// Grid auto-layout on the bench top (usable area about 8 x 3.4 units; 1 unit = 20 cm). The grid
// widens as more apparatus is added so every row stays on the bench, never past its front edge.
function layoutPosition(index: number, count: number) {
  const cols = count <= 4 ? Math.max(1, count) : count <= 8 ? 4 : count <= 15 ? 5 : 7
  const rows = Math.ceil(count / cols)
  const spacingX = Math.min(1.2, 7.6 / cols)
  const spacingZ = Math.min(1.05, 3.2 / rows)
  const col = index % cols
  const row = Math.floor(index / cols)
  return { x: (col - (cols - 1) / 2) * spacingX, y: 0, z: (row - (rows - 1) / 2) * spacingZ - 0.15 }
}
function relayout() {
  const n = sceneObjects.value.length
  sceneObjects.value.forEach((o, i) => { o.position = layoutPosition(i, n) })
}

const addToScene = (obj: LabObjectDef) => {
  const count = (placedCounts[obj.object_type] = (placedCounts[obj.object_type] || 0) + 1)
  const key = `${obj.object_type}_${count}`
  sceneObjects.value.push({ key, object_type: obj.object_type, position: { x: 0, y: 0, z: 0 } })
  relayout()
}

// --- Full screen apparatus shelves ---------------------------------------------------------
const SHELF_ORDER: { key: string; label: string }[] = [
  { key: 'physics', label: 'Physics' },
  { key: 'chemistry', label: 'Chemistry' },
  { key: 'biology', label: 'Biology' },
  { key: 'agriculture', label: 'Agriculture' },
  { key: 'general', label: 'General' },
]
const shelvesOpen = ref(true)
const shelfSearch = ref('')
const shelves = computed(() => {
  const q = shelfSearch.value.trim().toLowerCase()
  return SHELF_ORDER
    .map(sh => ({
      ...sh,
      items: catalog.value
        .filter(o => (SHELF_ORDER.some(x => x.key === o.category) ? o.category : 'general') === sh.key)
        .filter(o => !q || o.display_name.toLowerCase().includes(q))
        .sort((a, b) => a.display_name.localeCompare(b.display_name)),
    }))
    .filter(sh => sh.items.length > 0)
})
const benchCounts = computed<Record<string, number>>(() => {
  const out: Record<string, number> = {}
  sceneObjects.value.forEach(o => { out[o.object_type] = (out[o.object_type] || 0) + 1 })
  return out
})

// Which shelves are folded away - remembered on this device
const FOLD_KEY = 'vl-playground-folded-shelves'
const readFolded = (): string[] => {
  try { return JSON.parse(localStorage.getItem(FOLD_KEY) || '[]') } catch { return [] }
}
const collapsedShelves = ref<string[]>(readFolded())
watch(collapsedShelves, (v) => {
  try { localStorage.setItem(FOLD_KEY, JSON.stringify(v)) } catch { /* storage unavailable */ }
})
// Whether the shelves panel beside the lab is shown or hidden away like a sidebar - remembered too
const PANEL_KEY = 'vl-playground-shelves-panel'
const readPanel = (): boolean => {
  try { return localStorage.getItem(PANEL_KEY) !== 'hidden' } catch { return true }
}
const shelfPanelOpen = ref(readPanel())
watch(shelfPanelOpen, (v) => {
  try { localStorage.setItem(PANEL_KEY, v ? 'shown' : 'hidden') } catch { /* storage unavailable */ }
})
const lastPicked = ref<string | null>(null)
let pickedTimer: ReturnType<typeof setTimeout> | null = null
const pickFromShelf = (obj: LabObjectDef) => {
  addToScene(obj)
  flash(`${obj.display_name} placed on the bench`)
  // On phones the drawer covers the lab, so close it to show what was placed
  if (window.innerWidth < 640) shelvesOpen.value = false
}

const takeChemical = (id: string) => {
  const chem = chemicalById(id)
  if (!chem || sceneObjects.value.some(o => o.props?.chemical_id === id)) return
  sceneObjects.value.push({ key: `chem_${id}`, object_type: chemicalObjectType(chem), position: { x: 0, y: 0, z: 0 }, props: chemicalProps(chem) })
  relayout()
  flash(`${chem.name} placed on the bench`)
}

const flash = (msg: string) => {
  lastPicked.value = msg
  if (pickedTimer) clearTimeout(pickedTimer)
  pickedTimer = setTimeout(() => { lastPicked.value = null }, 1800)
}

/** Back where it came from: chemicals into the bench cupboard, apparatus onto its shelf. */
const putBack = (key: string) => {
  const o = sceneObjects.value.find(x => x.key === key)
  if (!o) return
  const name = o.props?.display_name || catalogByType.value.get(o.object_type)?.display_name || 'It'
  removeFromScene(key)
  flash(o.props?.chemical_id ? `${name} put back in the cupboard` : `${name} put back on the shelf`)
}

const removeFromScene = (key: string) => {
  sceneObjects.value = sceneObjects.value.filter(o => o.key !== key)
  relayout()
}

const clearBench = () => {
  sceneObjects.value = []
}

const onSceneAction = (payload: { objectKey: string | null; action: string; value: string | null }) => {
  // Purely exploratory - nothing here is tracked or graded, just applied locally so switches,
  // bulbs and burners actually respond when clicked (mirrors the same local toggle used in the
  // real guided experiment player).
  if ((payload.action === 'switch_on' || payload.action === 'switch_off') && payload.objectKey) {
    sceneRef.value?.setObjectState(payload.objectKey, { state: payload.action === 'switch_on' ? 'on' : 'off' })
  }
  if (payload.action === 'heat' && payload.value) {
    sceneRef.value?.setObjectState(payload.objectKey!, { flame: 'on' })
  }
}

onMounted(async () => {
  try {
    const res = await axios.get(`/api/${role}/virtual-lab/objects`)
    catalog.value = res.data.data.objects
  } finally {
    loadingCatalog.value = false
  }
})
</script>

