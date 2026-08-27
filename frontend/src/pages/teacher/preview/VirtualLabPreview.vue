<template>
  <div>
    <PreviewBanner module-label="Virtual Lab" />

    <div class="flex items-center gap-2 mb-6">
      <RouterLink to="/teacher/preview" class="inline-flex items-center gap-1.5 text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path></svg>
        Back to Preview
      </RouterLink>
      <template v-if="activeCategory || activeAssignment">
        <span class="text-gray-300 dark:text-gray-600">/</span>
        <button @click="reset" class="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-cyan-600 dark:hover:text-cyan-400">All Experiments</button>
      </template>
      <template v-if="activeAssignment">
        <span class="text-gray-300 dark:text-gray-600">/</span>
        <button @click="activeAssignment = null" class="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-cyan-600 dark:hover:text-cyan-400">
          {{ CATEGORY_LABELS[activeCategory!] }}
        </button>
      </template>
    </div>

    <!-- Loading -->
    <div v-if="loading" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
      <div v-for="i in 8" :key="i" class="animate-pulse">
        <div class="aspect-square rounded-2xl bg-gray-200 dark:bg-gray-700"></div>
      </div>
    </div>

    <!-- Category picker -->
    <template v-else-if="!activeCategory">
      <div v-if="categoryGroups.length === 0" class="text-center py-16 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
        <p class="text-gray-500 dark:text-gray-400">No virtual lab experiments assigned to this class yet.</p>
      </div>
      <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <button
          v-for="group in categoryGroups"
          :key="group.category"
          @click="activeCategory = group.category"
          class="text-left bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 p-6"
        >
          <div
            class="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl shadow-sm mb-4 bg-gradient-to-br"
            :class="CATEGORY_COLORS[group.category]"
          >
            {{ CATEGORY_ICONS[group.category] }}
          </div>
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">{{ CATEGORY_LABELS[group.category] }}</h3>
          <span class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-cyan-50 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-300">
            {{ group.assignments.length }} {{ group.assignments.length === 1 ? 'experiment' : 'experiments' }}
          </span>
        </button>
      </div>
    </template>

    <!-- Assignment list within a category -->
    <template v-else-if="!activeAssignment">
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        <button
          v-for="a in activeCategoryAssignments"
          :key="a.id"
          @click="openAssignment(a)"
          class="text-left bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 overflow-hidden"
        >
          <div class="h-24 flex items-center justify-center text-4xl bg-gradient-to-br" :class="CATEGORY_COLORS[a.category]">
            {{ CATEGORY_ICONS[a.category] }}
          </div>
          <div class="p-4">
            <h3 class="text-sm font-semibold text-gray-900 dark:text-white line-clamp-2 mb-2">{{ a.experiment_title }}</h3>
            <div class="flex items-center gap-2 flex-wrap">
              <span v-if="a.due_date" class="text-xs text-gray-500 dark:text-gray-400">Due {{ formatDate(a.due_date) }}</span>
              <span class="text-xs text-gray-400">&middot;</span>
              <span class="text-xs text-gray-500 dark:text-gray-400">{{ a.marks }} marks</span>
            </div>
          </div>
        </button>
      </div>
    </template>

    <!-- Experiment detail: read-only scene + info -->
    <template v-else>
      <div v-if="detailLoading" class="flex items-center justify-center py-24">
        <div class="inline-block animate-spin rounded-full h-8 w-8 border-2 border-gray-200 dark:border-gray-700 border-t-cyan-600"></div>
      </div>

      <div v-else-if="detail" class="space-y-5">
        <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-5 sm:p-6">
          <div class="flex items-start gap-4">
            <div class="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0 bg-gradient-to-br" :class="CATEGORY_COLORS[detail.category]">
              {{ CATEGORY_ICONS[detail.category] }}
            </div>
            <div class="min-w-0">
              <h1 class="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">{{ detail.title }}</h1>
              <p v-if="detail.topic" class="text-sm text-gray-500 dark:text-gray-400 mt-0.5">{{ detail.topic }}</p>
            </div>
          </div>
          <p v-if="detail.objective" class="mt-4 text-sm text-gray-600 dark:text-gray-300 leading-relaxed">{{ detail.objective }}</p>

          <div class="mt-4 flex flex-wrap gap-2">
            <span v-if="detail.apparatus" class="tag-pill bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300">Apparatus: {{ detail.apparatus }}</span>
            <span v-if="detail.estimated_duration_minutes" class="tag-pill bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300">~{{ detail.estimated_duration_minutes }} min</span>
          </div>

          <div v-if="detail.safety_precautions" class="mt-4 flex items-start gap-2.5 px-3.5 py-3 rounded-xl bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800">
            <svg class="w-4 h-4 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
            </svg>
            <p class="text-sm text-amber-800 dark:text-amber-200">{{ detail.safety_precautions }}</p>
          </div>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-5">
          <!-- Scene -->
          <div class="lg:col-span-2 h-[320px] sm:h-[440px] lg:h-[520px] rounded-2xl overflow-hidden shadow-lg ring-1 ring-gray-900/5">
            <component
              :is="active2DRenderer ?? VirtualLabScene"
              :scene-objects="detail.scene_objects"
              :object-catalog="objectCatalog"
              :read-only="true"
            />
          </div>

          <!-- Steps -->
          <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-5 max-h-[520px] overflow-y-auto">
            <h3 class="text-xs font-semibold text-cyan-600 dark:text-cyan-400 uppercase tracking-wide mb-3">Instructions</h3>
            <ol class="space-y-3">
              <li v-for="step in detail.steps" :key="step.id" class="flex items-start gap-2.5">
                <span
                  class="mt-0.5 w-5 h-5 rounded-full text-[11px] font-semibold flex items-center justify-center flex-shrink-0"
                  :class="step.is_safety_check ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300' : 'bg-cyan-50 text-cyan-600 dark:bg-cyan-900/30 dark:text-cyan-400'"
                >
                  {{ step.step_number }}
                </span>
                <p class="text-sm text-gray-700 dark:text-gray-300 leading-snug">{{ step.instruction }}</p>
              </li>
            </ol>
            <p v-if="!detail.steps.length" class="text-sm text-gray-400">No instructions defined.</p>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'
import PreviewBanner from '@/components/preview/PreviewBanner.vue'
import VirtualLabScene from '@/components/virtuallab/VirtualLabScene.vue'
import { resolve2DRenderer } from '@/components/virtuallab/render2d/registry'
import { CATEGORY_ICONS, CATEGORY_LABELS, CATEGORY_COLORS } from '@/types/virtualLab'
import type { TeacherAssignment, LabObjectDef, ExperimentDetail, LabCategory } from '@/types/virtualLab'

interface CategoryGroup {
  category: LabCategory
  assignments: TeacherAssignment[]
}

const route = useRoute()

const assignments = ref<TeacherAssignment[]>([])
const objectCatalog = ref<LabObjectDef[]>([])
const loading = ref(false)

const activeCategory = ref<LabCategory | null>(null)
const activeAssignment = ref<TeacherAssignment | null>(null)
const detail = ref<ExperimentDetail | null>(null)
const detailLoading = ref(false)

const active2DRenderer = computed(() => {
  if (!detail.value || detail.value.render_mode !== '2d') return null
  return resolve2DRenderer(detail.value.render_component)
})

const categoryGroups = computed<CategoryGroup[]>(() => {
  const map = new Map<LabCategory, CategoryGroup>()
  assignments.value.forEach(a => {
    if (!map.has(a.category)) map.set(a.category, { category: a.category, assignments: [] })
    map.get(a.category)!.assignments.push(a)
  })
  return Array.from(map.values())
})

const activeCategoryAssignments = computed(() => categoryGroups.value.find(g => g.category === activeCategory.value)?.assignments || [])

const reset = () => {
  activeCategory.value = null
  activeAssignment.value = null
  detail.value = null
}

const formatDate = (d: string) => new Date(d).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })

const openAssignment = async (a: TeacherAssignment) => {
  activeAssignment.value = a
  detailLoading.value = true
  try {
    const res = await axios.get(`/api/teacher/virtual-lab/assignments/${a.id}/preview`)
    if (res.data.success) detail.value = res.data.data
  } catch (error) {
    console.error('Failed to load experiment preview:', error)
  } finally {
    detailLoading.value = false
  }
}

const loadAssignments = async () => {
  loading.value = true
  try {
    const res = await axios.get('/api/teacher/virtual-lab/assignments', { params: { class_id: route.params.classId } })
    if (res.data.success) assignments.value = res.data.data.assignments || []
  } catch (error) {
    console.error('Failed to load virtual lab assignments:', error)
  } finally {
    loading.value = false
  }
}

const loadObjectCatalog = async () => {
  try {
    const res = await axios.get('/api/teacher/virtual-lab/objects')
    if (res.data.success) objectCatalog.value = res.data.data.objects || []
  } catch (error) {
    console.error('Failed to load virtual lab object catalog:', error)
  }
}

watch(() => route.params.classId, () => {
  reset()
  loadAssignments()
})

onMounted(() => {
  loadAssignments()
  loadObjectCatalog()
})
</script>

<style scoped>
.tag-pill {
  @apply inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium;
}
</style>
