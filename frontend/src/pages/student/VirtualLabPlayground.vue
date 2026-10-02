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
        <!-- Camera views of the room -->
        <div class="inline-flex flex-wrap rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm p-1 gap-1">
          <button
            v-for="v in CAMERA_VIEWS"
            :key="v.key"
            type="button"
            @click="goToView(v.key)"
            class="inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-semibold rounded-lg transition-colors"
            :class="cameraView === v.key ? 'bg-indigo-600 text-white shadow-sm' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'"
            :title="v.title"
          >
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M15 10l4.55-2.28A1 1 0 0121 8.62v6.76a1 1 0 01-1.45.9L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
            {{ v.label }}
          </button>
        </div>
        <button @click="enterMaximize" class="ml-auto inline-flex items-center gap-1.5 px-3.5 py-2 text-sm font-semibold rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 shadow-sm" title="Fill the whole screen with the lab">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2.2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5" /></svg>
          Full Screen Lab
        </button>
      </div>

      <!-- The lab takes all the width; the apparatus lives in the room itself, in the glass
           cabinets on the wall behind the bench, and the chemicals in the cupboard under it -->
      <div class="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_12rem] 2xl:grid-cols-[minmax(0,1fr)_14rem] gap-4 sm:gap-5">
        <!-- 3D scene - full screen only changes this wrapper's classes, so the scene isn't rebuilt -->
        <div :class="labMaximized ? 'fixed inset-0 z-[200] flex flex-col bg-slate-900' : ''">
          <div v-if="labMaximized" class="flex-shrink-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-3 sm:px-4 py-2 flex items-center gap-2 sm:gap-3">
            <p class="hidden sm:block text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 whitespace-nowrap">Apparatus Playground</p>
            <!-- Camera views of the room -->
            <div class="inline-flex flex-wrap rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm p-1 gap-1">
              <button
                v-for="v in CAMERA_VIEWS"
                :key="v.key"
                type="button"
                @click="goToView(v.key)"
                class="inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-semibold rounded-lg transition-colors"
                :class="cameraView === v.key ? 'bg-indigo-600 text-white shadow-sm' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'"
                :title="v.title"
              >
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M15 10l4.55-2.28A1 1 0 0121 8.62v6.76a1 1 0 01-1.45.9L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                {{ v.label }}
              </button>
            </div>
            <p class="flex-1 min-w-0 truncate text-[11px] text-gray-500 dark:text-gray-400">
              <template v-if="sceneObjects.length">{{ sceneObjects.length }} on the benches · working at the {{ BENCHES[activeBench].label.toLowerCase() }}</template>
              <template v-else>Open the glass cabinets for apparatus, or the cupboard for chemicals</template>
            </p>
            <button v-if="sceneObjects.length > 0" @click="clearBench" class="flex-shrink-0 px-2.5 py-1.5 text-xs font-medium rounded-lg text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20">Clear</button>
            <button @click="exitMaximize" class="flex-shrink-0 inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-semibold rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700">
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2.2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9 4v5H4M15 4v5h5M9 20v-5H4M15 20v-5h5" /></svg>
              Exit<span class="hidden sm:inline">&nbsp;Full Screen</span>
            </button>
          </div>

          <div
            class="relative overflow-hidden"
            :class="labMaximized ? 'flex-1 min-h-0 min-w-0' : 'h-[68svh] min-h-[340px] sm:h-[72svh] lg:h-[calc(100svh-7rem)] lg:min-h-[560px] rounded-2xl shadow-lg ring-1 ring-gray-900/5'"
          >
            <!-- The room is always there, even with an empty bench, so its cabinets can be opened -->
            <VirtualLabScene
              ref="sceneRef"
              :scene-objects="sceneObjects"
              :object-catalog="sceneCatalog"
              fixed-view
              cupboard
              wall-shelves
              :bench-length="BENCH_LENGTH"
              side-benches
              @action="onSceneAction"
              @take-chemical="takeChemical"
              @pick-apparatus="pickApparatus"
              @put-back="putBack"
            />
            <p v-if="sceneObjects.length === 0" class="pointer-events-none absolute top-3 left-1/2 -translate-x-1/2 w-max max-w-[90%] px-3 py-1.5 rounded-full bg-white/85 dark:bg-gray-900/80 text-gray-700 dark:text-gray-200 text-xs font-medium shadow text-center">
              {{ loadingCatalog ? 'Stocking the shelves...' : 'Open the glass cabinets on the wall for apparatus, or the cupboard under the bench for chemicals.' }}
            </p>
            <!-- Brief confirmation when something comes off a shelf or goes back -->
            <transition enter-active-class="transition duration-150" enter-from-class="opacity-0 translate-y-1" leave-active-class="transition duration-300" leave-to-class="opacity-0">
              <p v-if="lastPicked" :class="sceneObjects.length === 0 ? 'top-14' : 'top-3'" class="pointer-events-none absolute z-10 left-1/2 -translate-x-1/2 px-3 py-1.5 rounded-full bg-gray-900/80 text-white text-xs font-semibold shadow">
                {{ lastPicked }}
              </p>
            </transition>
          </div>
        </div>

        <!-- Items on bench -->
        <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-3 lg:h-[calc(100svh-7rem)] lg:min-h-[560px] lg:overflow-y-auto">
          <div class="flex items-center justify-between mb-3">
            <p class="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">On Your Bench <span class="normal-case font-semibold text-gray-400">· {{ BENCHES[activeBench].label }}</span></p>
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
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'
import VirtualLabScene, { type CameraView } from '@/components/virtuallab/VirtualLabScene.vue'
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

// The playground's long bench, in metres (the guided experiments use the standard 1.8 m one)
const BENCH_LENGTH = 3
// Grid auto-layout on the bench top (usable area about 14 x 3.4 units; 1 unit = 20 cm). The grid
// widens as more apparatus is added so every row stays on the bench, never past its front edge.
function layoutPosition(index: number, count: number) {
  const cols = count <= 6 ? Math.max(1, count) : count <= 14 ? 7 : count <= 24 ? 8 : 10
  const rows = Math.ceil(count / cols)
  const spacingX = Math.min(1.4, ((BENCH_LENGTH - 0.25) * 5) / cols)
  const spacingZ = Math.min(1.05, 3.2 / rows)
  const col = index % cols
  const row = Math.floor(index / cols)
  return { x: (col - (cols - 1) / 2) * spacingX, y: 0, z: (row - (rows - 1) / 2) * spacingZ - 0.15 }
}
// The three working benches (must match the room in lab3d/labRoom.ts, 1 unit = 20 cm): the front
// bench in the middle, and the long benches against the left and right walls, turned to face
// into the room. Apparatus is laid out in each bench's own frame, then turned and moved there.
type BenchKey = 'front' | 'left' | 'right'
const SIDE_BENCH_X = (7 - 0.375 - 0.02) * 5
const SIDE_BENCH_Z = 1.6 * 5
const BENCHES: Record<BenchKey, { label: string; rotY: number; x: number; z: number }> = {
  front: { label: 'Front table', rotY: 0, x: 0, z: 0 },
  left: { label: 'Left table', rotY: Math.PI / 2, x: -SIDE_BENCH_X, z: SIDE_BENCH_Z },
  right: { label: 'Right table', rotY: -Math.PI / 2, x: SIDE_BENCH_X, z: SIDE_BENCH_Z },
}
/** Which bench each object on the benches stands on */
const benchOf: Record<string, BenchKey> = {}
/** The bench new apparatus goes on - follows the camera view */
const activeBench = ref<BenchKey>('front')

function relayout() {
  ;(Object.keys(BENCHES) as BenchKey[]).forEach((bk) => {
    const bench = BENCHES[bk]
    const onIt = sceneObjects.value.filter(o => (benchOf[o.key] ?? 'front') === bk)
    const c = Math.cos(bench.rotY), sn = Math.sin(bench.rotY)
    onIt.forEach((o, i) => {
      const p = layoutPosition(i, onIt.length)
      // Rotate about the vertical (same sense as Object3D.rotation.y), then move onto the bench
      o.position = { x: bench.x + p.x * c + p.z * sn, y: 0, z: bench.z - p.x * sn + p.z * c }
      o.rotation = { y: bench.rotY }
    })
  })
}
/** A new object goes on the bench the user is working at */
function assignBench(key: string) {
  benchOf[key] = activeBench.value
}

const addToScene = (obj: LabObjectDef) => {
  const count = (placedCounts[obj.object_type] = (placedCounts[obj.object_type] || 0) + 1)
  const key = `${obj.object_type}_${count}`
  sceneObjects.value.push({ key, object_type: obj.object_type, position: { x: 0, y: 0, z: 0 } })
  assignBench(key)
  relayout()
}

// Camera views of the room - the scene glides the camera to each
const CAMERA_VIEWS: { key: CameraView; label: string; title: string }[] = [
  { key: 'bench', label: 'Front', title: 'Work at the front table, with the subject cabinets behind it' },
  { key: 'entrance', label: 'Entrance', title: 'Look at the lab entrance' },
  { key: 'left', label: 'Left', title: 'Work at the left table, under the General cabinet' },
  { key: 'right', label: 'Right', title: 'Work at the right table' },
]
const cameraView = ref<CameraView>('bench')
const goToView = (v: CameraView) => {
  cameraView.value = v
  // Choosing a table's camera makes it the table to work at (the entrance has no table, so the
  // last table stays in use)
  if (v === 'bench') activeBench.value = 'front'
  else if (v === 'left' || v === 'right') activeBench.value = v
  sceneRef.value?.goToView(v)
}

const lastPicked = ref<string | null>(null)
let pickedTimer: ReturnType<typeof setTimeout> | null = null
/** Taken off a shelf in one of the glass wall cabinets */
const pickApparatus = (type: string) => {
  const def = catalog.value.find(o => o.object_type === type)
  // One of each on the shelves - it is already out if it's on the bench
  if (!def || sceneObjects.value.some(o => o.object_type === type && !o.props?.chemical_id)) return
  addToScene(def)
  flash(`${def.display_name} placed on the ${BENCHES[activeBench.value].label.toLowerCase()}`)
}

const takeChemical = (id: string) => {
  const chem = chemicalById(id)
  if (!chem || sceneObjects.value.some(o => o.props?.chemical_id === id)) return
  sceneObjects.value.push({ key: `chem_${id}`, object_type: chemicalObjectType(chem), position: { x: 0, y: 0, z: 0 }, props: chemicalProps(chem) })
  assignBench(`chem_${id}`)
  relayout()
  flash(`${chem.name} placed on the ${BENCHES[activeBench.value].label.toLowerCase()}`)
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

