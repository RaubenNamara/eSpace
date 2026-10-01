<template>
  <div class="min-h-full">
    <div>
      <!-- Header - same compact icon + title + subtitle pattern as the other student pages -->
      <router-link :to="`/${role}/virtual-lab`" class="inline-flex items-center gap-1 text-xs font-medium text-indigo-600 dark:text-indigo-400 hover:underline mb-2">
        <span>&larr;</span> Virtual Lab
      </router-link>
      <div class="flex items-center gap-2 mb-1">
        <div class="hidden sm:flex w-7 h-7 rounded-lg bg-indigo-600 items-center justify-center flex-shrink-0">
          <svg class="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 3v6.5L4.5 18A2 2 0 006.3 21h11.4a2 2 0 001.8-3L15 9.5V3M8 3h8M7 15h10" /></svg>
        </div>
        <h1 class="text-base sm:text-lg font-bold text-gray-900 dark:text-white leading-tight">Apparatus Playground</h1>
      </div>
      <p class="text-xs text-gray-500 dark:text-gray-400 mb-4">Pick any lab equipment from any subject and get familiar with it in 3D. Move, rotate, connect, pour, heat and measure freely. Nothing here is graded.</p>

      <!-- Category filter (same segmented style as the Virtual Lab tabs) + full screen -->
      <div class="flex flex-wrap items-center gap-2 mb-5">
        <div class="inline-flex flex-wrap gap-1 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-1 shadow-sm">
          <button
            v-for="cat in categoryOptions"
            :key="cat.value"
            @click="activeCategory = cat.value"
            class="inline-flex items-center gap-1.5 px-3 sm:px-3.5 py-2 text-sm font-semibold rounded-lg transition-colors"
            :class="activeCategory === cat.value ? 'bg-indigo-600 text-white shadow-sm' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'"
          >
            <AppIcon :name="cat.icon" class="w-4 h-4" /> {{ cat.label }}
          </button>
        </div>
        <button @click="enterMaximize" class="ml-auto inline-flex items-center gap-1.5 px-3.5 py-2 text-sm font-semibold rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 shadow-sm" title="Fill the whole screen with the lab">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2.2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5" /></svg>
          Full Screen Lab
        </button>
      </div>

      <!-- Slim fixed side columns on large screens so the lab takes all the remaining width -->
      <div class="grid grid-cols-1 lg:grid-cols-[10.5rem_minmax(0,1fr)_13rem] 2xl:grid-cols-[12rem_minmax(0,1fr)_14rem] gap-4 sm:gap-5">
        <!-- Apparatus palette: tiles on phones/tablets, a compact one-column list beside the lab -->
        <div class="order-1 bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-3 lg:h-[calc(100svh-7rem)] lg:min-h-[560px] lg:overflow-y-auto">
          <p class="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 mb-2.5">Pick Apparatus</p>
          <div v-if="loadingCatalog" class="py-8 text-center text-xs text-gray-400">Loading catalog...</div>
          <div v-else class="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-1 gap-1.5">
            <button
              v-for="obj in filteredCatalog"
              :key="obj.object_type"
              @click="addToScene(obj)"
              class="flex flex-col lg:flex-row items-center gap-1 lg:gap-2 p-2.5 lg:px-2 lg:py-1.5 rounded-xl lg:rounded-lg border border-gray-200 dark:border-gray-700 hover:border-indigo-400 dark:hover:border-indigo-500 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-colors"
            >
              <span class="text-xl lg:text-base flex-shrink-0">{{ obj.icon || '🔬' }}</span>
              <span class="text-[10px] lg:text-[11px] font-medium text-gray-600 dark:text-gray-300 text-center lg:text-left leading-tight lg:truncate">{{ obj.display_name }}</span>
            </button>
          </div>
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
                class="cabinet absolute sm:relative inset-y-0 left-0 z-20 w-[86%] max-w-[22rem] sm:w-80 lg:w-[22rem] flex-shrink-0 flex flex-col shadow-2xl sm:shadow-none"
              >
                <div class="px-3 pt-3 pb-2">
                  <div class="relative">
                    <svg class="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-amber-900/50" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                    <input v-model="shelfSearch" type="text" placeholder="Find apparatus..." class="w-full pl-8 pr-2.5 py-1.5 text-xs rounded-lg border-0 bg-amber-50/90 text-amber-950 placeholder-amber-900/40 focus:ring-2 focus:ring-amber-400">
                  </div>
                </div>
                <div class="flex-1 min-h-0 overflow-y-auto px-3 pb-4 space-y-4">
                  <p v-if="shelves.length === 0" class="text-center text-xs text-amber-100/80 py-8">No apparatus matches "{{ shelfSearch }}".</p>
                  <section v-for="shelf in shelves" :key="shelf.key">
                    <div class="flex justify-center -mb-1 relative z-10">
                      <span class="plate">{{ shelf.label }} <span class="plate-count">{{ shelf.items.length }}</span></span>
                    </div>
                    <div class="shelf">
                      <div class="grid grid-cols-3 gap-x-1.5 gap-y-0">
                        <button
                          v-for="obj in shelf.items"
                          :key="obj.object_type"
                          type="button"
                          @click="pickFromShelf(obj)"
                          class="shelf-item group"
                          :title="`Put ${obj.display_name} on the bench`"
                        >
                          <span class="shelf-icon">{{ obj.icon || '🔬' }}</span>
                          <span class="shelf-name">{{ obj.display_name }}</span>
                          <span v-if="benchCount(obj.object_type)" class="shelf-badge">{{ benchCount(obj.object_type) }}</span>
                        </button>
                      </div>
                    </div>
                  </section>
                </div>
              </aside>
            </transition>
            <!-- Phones: tap the lab beside the drawer to close it -->
            <div v-if="labMaximized && shelvesOpen" class="sm:hidden absolute inset-0 z-10 bg-black/30" @click="shelvesOpen = false"></div>

          <div
            class="relative overflow-hidden"
            :class="labMaximized ? 'flex-1 min-h-0 min-w-0' : 'h-[68svh] min-h-[340px] sm:h-[72svh] lg:h-[calc(100svh-7rem)] lg:min-h-[560px] rounded-2xl shadow-lg ring-1 ring-gray-900/5'"
          >
            <div v-if="sceneObjects.length === 0" class="w-full h-full flex flex-col items-center justify-center gap-2 bg-slate-200 dark:bg-slate-800 text-center px-6">
              <AppIcon name="beaker" class="w-10 h-10 text-gray-400" />
              <p class="text-sm text-gray-500 dark:text-gray-400">{{ labMaximized ? 'Pick apparatus from the shelves to put it on your workbench.' : 'Pick a piece of apparatus from the list to add it to your workbench.' }}</p>
            </div>
            <VirtualLabScene
              v-else
              ref="sceneRef"
              :scene-objects="sceneObjects"
              :object-catalog="catalog"
              @action="onSceneAction"
            />
            <!-- Brief confirmation when something comes off a shelf -->
            <transition enter-active-class="transition duration-150" enter-from-class="opacity-0 translate-y-1" leave-active-class="transition duration-300" leave-to-class="opacity-0">
              <p v-if="labMaximized && lastPicked" class="pointer-events-none absolute top-3 left-1/2 -translate-x-1/2 px-3 py-1.5 rounded-full bg-gray-900/80 text-white text-xs font-semibold shadow">
                {{ lastPicked }} placed on the bench
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
              <span class="text-xs text-gray-700 dark:text-gray-200 truncate">{{ catalogByType.get(o.object_type)?.icon || '🔬' }} {{ catalogByType.get(o.object_type)?.display_name || o.object_type }}</span>
              <button @click="removeFromScene(o.key)" class="flex-shrink-0 text-gray-400 hover:text-red-500 text-xs">✕</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import AppIcon from '@/components/common/AppIcon.vue'
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'
import VirtualLabScene from '@/components/virtuallab/VirtualLabScene.vue'
import { useFullscreenLab } from '@/components/virtuallab/lab3d/useFullscreenLab'
import type { LabObjectDef, SceneObjectConfig, LabCategory } from '@/types/virtualLab'

// Shared by the student and teacher routes - each reads the catalogue from its own API
const role = useRoute().path.startsWith('/teacher') ? 'teacher' : 'student'

const catalog = ref<LabObjectDef[]>([])
const loadingCatalog = ref(true)
const sceneObjects = ref<SceneObjectConfig[]>([])
const sceneRef = ref<InstanceType<typeof VirtualLabScene> | null>(null)
const placedCounts: Record<string, number> = {}
const { labMaximized, enterMaximize, exitMaximize } = useFullscreenLab()

type CategoryFilter = LabCategory | 'general' | 'all'
const activeCategory = ref<CategoryFilter>('all')

const categoryOptions: { value: CategoryFilter; label: string; icon: string }[] = [
  { value: 'all', label: 'All', icon: 'kit' },
  { value: 'physics', label: 'Physics', icon: 'bolt' },
  { value: 'chemistry', label: 'Chemistry', icon: 'beaker' },
  { value: 'biology', label: 'Biology', icon: 'leaf' },
  { value: 'agriculture', label: 'Agriculture', icon: 'sprout' },
  { value: 'general', label: 'General', icon: 'wrench' },
]

const catalogByType = computed(() => new Map(catalog.value.map(o => [o.object_type, o])))

const filteredCatalog = computed(() =>
  activeCategory.value === 'all' ? catalog.value : catalog.value.filter(o => o.category === activeCategory.value)
)

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
const benchCount = (type: string) => sceneObjects.value.filter(o => o.object_type === type).length
const lastPicked = ref<string | null>(null)
let pickedTimer: ReturnType<typeof setTimeout> | null = null
const pickFromShelf = (obj: LabObjectDef) => {
  addToScene(obj)
  lastPicked.value = obj.display_name
  if (pickedTimer) clearTimeout(pickedTimer)
  pickedTimer = setTimeout(() => { lastPicked.value = null }, 1600)
  // On phones the drawer covers the lab, so close it to show what was placed
  if (window.innerWidth < 640) shelvesOpen.value = false
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

<style scoped>
/* A wooden apparatus cabinet: dark frame, lighter back panel, a plank under every row of items */
.cabinet {
  background:
    repeating-linear-gradient(90deg, rgba(0, 0, 0, 0.035) 0 2px, transparent 2px 9px),
    linear-gradient(180deg, #7a4a24, #5e3518);
  border-right: 6px solid #4a2a12;
}
.shelf {
  border-radius: 10px;
  padding: 14px 8px 0;
  background:
    linear-gradient(180deg, rgba(0, 0, 0, 0.18), transparent 30px),
    #a8743f;
  box-shadow: inset 0 2px 8px rgba(0, 0, 0, 0.35);
}
/* Each row of three items stands on its own plank */
.shelf-item {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  gap: 2px;
  padding: 6px 2px 9px;
  min-height: 84px;
  border-bottom: 9px solid #6b3f1d;
  box-shadow: 0 7px 0 -2px #4a2a12;
  margin-bottom: 10px;
  transition: transform 0.15s ease;
}
.shelf-item:hover,
.shelf-item:focus-visible {
  transform: translateY(-4px);
  outline: none;
}
.shelf-icon {
  font-size: 30px;
  line-height: 1;
  filter: drop-shadow(0 3px 2px rgba(0, 0, 0, 0.35));
}
.shelf-name {
  font-size: 10px;
  font-weight: 600;
  line-height: 1.15;
  color: #fff7ed;
  text-align: center;
  text-shadow: 0 1px 1px rgba(0, 0, 0, 0.5);
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.shelf-item:hover .shelf-name,
.shelf-item:focus-visible .shelf-name {
  color: #fde68a;
}
.shelf-badge {
  position: absolute;
  top: 2px;
  right: 6px;
  min-width: 16px;
  height: 16px;
  padding: 0 4px;
  border-radius: 9999px;
  background: #4f46e5;
  color: #fff;
  font-size: 10px;
  font-weight: 700;
  line-height: 16px;
}
/* Brass name plate */
.plate {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 3px 12px;
  border-radius: 6px;
  background: linear-gradient(180deg, #f6d98b, #c9962f);
  border: 1px solid #8a6416;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.5);
  color: #3b2606;
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}
.plate-count {
  padding: 0 6px;
  border-radius: 9999px;
  background: rgba(59, 38, 6, 0.18);
  font-size: 10px;
}
</style>
