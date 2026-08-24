<template>
  <div class="min-h-full">
    <!-- Hero -->
    <div class="relative overflow-hidden bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-700 print-color-exact">
      <div class="absolute inset-0 opacity-20" style="background-image: radial-gradient(circle at 20% 20%, white 1px, transparent 1px), radial-gradient(circle at 80% 60%, white 1px, transparent 1px); background-size: 48px 48px;"></div>
      <div class="relative px-4 py-8 sm:px-8 sm:py-10">
        <router-link to="/student/virtual-lab" class="inline-flex items-center gap-1 text-xs font-medium text-emerald-100 hover:text-white mb-2">
          <span>&larr;</span> Back to Virtual Lab
        </router-link>
        <div class="flex items-center gap-3 mb-2">
          <span class="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-white/15 backdrop-blur flex items-center justify-center text-2xl flex-shrink-0">🧰</span>
          <h1 class="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">Apparatus Playground</h1>
        </div>
        <p class="text-sm sm:text-base text-emerald-100 max-w-2xl">
          Pick any piece of lab equipment and get familiar with it in 3D &mdash; move, rotate, connect, pour, heat and measure freely. Nothing here is graded.
        </p>
      </div>
    </div>

    <div class="p-4 sm:p-6 lg:p-8 -mt-4 sm:-mt-5">
      <!-- Category filters -->
      <div class="flex flex-wrap gap-2 mb-5">
        <button
          v-for="cat in categoryOptions"
          :key="cat.value"
          @click="activeCategory = cat.value"
          class="inline-flex items-center gap-1.5 px-3.5 py-2 text-sm font-semibold rounded-full border shadow-sm transition-all"
          :class="activeCategory === cat.value
            ? 'bg-emerald-600 text-white border-transparent shadow-md'
            : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'"
        >
          <span>{{ cat.icon }}</span> {{ cat.label }}
        </button>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-4 gap-4 sm:gap-5">
        <!-- Apparatus palette -->
        <div class="order-1 lg:order-1 lg:col-span-1 bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-4 lg:h-[600px] lg:overflow-y-auto">
          <p class="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 mb-3">Pick Apparatus</p>
          <div v-if="loadingCatalog" class="py-8 text-center text-xs text-gray-400">Loading catalog...</div>
          <div v-else class="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-2 gap-2">
            <button
              v-for="obj in filteredCatalog"
              :key="obj.object_type"
              @click="addToScene(obj)"
              class="flex flex-col items-center gap-1 p-2.5 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-emerald-400 dark:hover:border-emerald-500 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 transition-colors"
            >
              <span class="text-xl">{{ obj.icon || '🔬' }}</span>
              <span class="text-[10px] font-medium text-gray-600 dark:text-gray-300 text-center leading-tight">{{ obj.display_name }}</span>
            </button>
          </div>
        </div>

        <!-- 3D scene -->
        <div class="order-2 lg:order-2 lg:col-span-2 h-[320px] sm:h-[440px] lg:h-[600px] rounded-2xl overflow-hidden shadow-lg ring-1 ring-gray-900/5">
          <div v-if="sceneObjects.length === 0" class="w-full h-full flex flex-col items-center justify-center gap-2 bg-gradient-to-b from-slate-200 to-slate-300 dark:from-slate-800 dark:to-slate-900 text-center px-6">
            <span class="text-4xl">🧪</span>
            <p class="text-sm text-gray-500 dark:text-gray-400">Pick a piece of apparatus from the left to add it to your workbench.</p>
          </div>
          <VirtualLabScene
            v-else
            ref="sceneRef"
            :key="sceneVersion"
            :scene-objects="sceneObjects"
            :object-catalog="catalog"
            @action="onSceneAction"
          />
        </div>

        <!-- Items on bench -->
        <div class="order-3 lg:order-3 lg:col-span-1 bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-4 lg:h-[600px] lg:overflow-y-auto">
          <div class="flex items-center justify-between mb-3">
            <p class="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">On Your Bench</p>
            <button v-if="sceneObjects.length > 0" @click="clearBench" class="text-[11px] font-medium text-red-500 hover:underline">Clear all</button>
          </div>
          <div v-if="sceneObjects.length === 0" class="text-xs text-gray-400 dark:text-gray-500">Nothing here yet.</div>
          <div v-else class="space-y-1.5">
            <div v-for="o in sceneObjects" :key="o.key" class="flex items-center justify-between gap-2 bg-gray-50 dark:bg-gray-900/40 rounded-lg px-2.5 py-1.5">
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
import { ref, computed, onMounted } from 'vue'
import axios from 'axios'
import VirtualLabScene from '@/components/virtuallab/VirtualLabScene.vue'
import type { LabObjectDef, SceneObjectConfig, LabCategory } from '@/types/virtualLab'

const catalog = ref<LabObjectDef[]>([])
const loadingCatalog = ref(true)
const sceneObjects = ref<SceneObjectConfig[]>([])
const sceneVersion = ref(0)
const sceneRef = ref<InstanceType<typeof VirtualLabScene> | null>(null)
const placedCounts: Record<string, number> = {}

type CategoryFilter = LabCategory | 'general' | 'all'
const activeCategory = ref<CategoryFilter>('all')

const categoryOptions: { value: CategoryFilter; label: string; icon: string }[] = [
  { value: 'all', label: 'All', icon: '🧰' },
  { value: 'physics', label: 'Physics', icon: '⚡' },
  { value: 'chemistry', label: 'Chemistry', icon: '🧪' },
  { value: 'biology', label: 'Biology', icon: '🧬' },
  { value: 'general', label: 'General', icon: '🔧' },
]

const catalogByType = computed(() => new Map(catalog.value.map(o => [o.object_type, o])))

const filteredCatalog = computed(() =>
  activeCategory.value === 'all' ? catalog.value : catalog.value.filter(o => o.category === activeCategory.value)
)

// Simple grid auto-layout so newly added apparatus doesn't overlap what's already on the bench.
const GRID_COLS = 4
const SPACING = 0.9
function nextPosition(index: number) {
  const col = index % GRID_COLS
  const row = Math.floor(index / GRID_COLS)
  return { x: (col - (GRID_COLS - 1) / 2) * SPACING, y: 0, z: row * SPACING }
}

const addToScene = (obj: LabObjectDef) => {
  const count = (placedCounts[obj.object_type] = (placedCounts[obj.object_type] || 0) + 1)
  const key = `${obj.object_type}_${count}`
  sceneObjects.value.push({ key, object_type: obj.object_type, position: nextPosition(sceneObjects.value.length) })
  sceneVersion.value++
}

const removeFromScene = (key: string) => {
  sceneObjects.value = sceneObjects.value.filter(o => o.key !== key)
  // Re-layout remaining objects onto the grid so removing one doesn't leave a gap.
  sceneObjects.value.forEach((o, i) => { o.position = nextPosition(i) })
  sceneVersion.value++
}

const clearBench = () => {
  sceneObjects.value = []
  sceneVersion.value++
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
    const res = await axios.get('/api/student/virtual-lab/objects')
    catalog.value = res.data.data.objects
  } finally {
    loadingCatalog.value = false
  }
})
</script>
