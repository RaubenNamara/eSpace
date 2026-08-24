<template>
  <div class="min-h-full">
    <div class="p-4 sm:p-6 lg:p-8">
      <!-- Hero -->
      <div class="relative overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-600 via-purple-600 to-fuchsia-600 shadow-lg shadow-indigo-500/20 p-4 sm:p-5 mb-6 print-color-exact">
        <div class="absolute inset-0 opacity-20" style="background-image: radial-gradient(circle at 20% 20%, white 1px, transparent 1px), radial-gradient(circle at 80% 60%, white 1px, transparent 1px); background-size: 32px 32px;"></div>
        <div class="absolute -right-8 -top-8 w-36 h-36 rounded-full bg-white/10"></div>
        <div class="absolute -right-3 bottom-0 w-24 h-24 rounded-full bg-white/10"></div>
        <div class="relative flex items-center gap-3">
          <span class="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-white/15 backdrop-blur-sm flex items-center justify-center shadow-sm text-xl sm:text-2xl flex-shrink-0 ring-2 ring-white/20">🧪</span>
          <div class="min-w-0">
            <h1 class="text-lg sm:text-2xl font-bold text-white leading-tight">Virtual Lab</h1>
            <p class="text-xs sm:text-sm text-indigo-100">Step into a 3D laboratory and run real science experiments &mdash; Physics, Chemistry, Biology and Agriculture, right from your browser.</p>
          </div>
        </div>
      </div>
      <!-- Tabs -->
      <div class="inline-flex flex-wrap gap-1 mb-5 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-1 shadow-sm">
        <button @click="activeTab = 'experiments'" class="px-3.5 sm:px-4 py-2 text-sm font-semibold rounded-lg transition-colors" :class="activeTab === 'experiments' ? 'bg-indigo-600 text-white shadow-sm' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'">Experiments</button>
        <button @click="activeTab = 'skills'" class="px-3.5 sm:px-4 py-2 text-sm font-semibold rounded-lg transition-colors" :class="activeTab === 'skills' ? 'bg-indigo-600 text-white shadow-sm' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'">My Practical Skills</button>
      </div>

      <!-- ===================== EXPERIMENTS TAB ===================== -->
      <div v-if="activeTab === 'experiments'">
        <!-- Apparatus Playground CTA -->
        <router-link
          to="/student/virtual-lab/playground"
          class="group flex items-center justify-between gap-3 bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-4 sm:p-5 mb-6 hover:shadow-md hover:border-emerald-300 dark:hover:border-emerald-700 transition-all"
        >
          <div class="flex items-center gap-3 min-w-0">
            <span class="w-10 h-10 flex-shrink-0 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-lg print-color-exact">🧰</span>
            <div class="min-w-0">
              <p class="font-bold text-gray-900 dark:text-white text-sm">Apparatus Playground</p>
              <p class="text-xs text-gray-500 dark:text-gray-400 truncate">Not graded &mdash; pick any equipment and get familiar with it before your next practical.</p>
            </div>
          </div>
          <span class="flex-shrink-0 text-emerald-600 dark:text-emerald-400 text-sm font-semibold transition-transform group-hover:translate-x-0.5">Explore &rarr;</span>
        </router-link>

        <!-- Search + filters (client-side only - the assignment list is already fully loaded) -->
        <div class="flex flex-wrap items-center gap-2 mb-4">
          <input v-model="search" type="text" placeholder="Search experiments..." class="input-field flex-1 min-w-[10rem] text-sm">
          <select v-model="subjectFilter" class="input-field text-sm w-auto">
            <option value="">All Subjects</option>
            <option v-for="s in subjectOptions" :key="s" :value="s">{{ s }}</option>
          </select>
          <select v-model="topicFilter" class="input-field text-sm w-auto">
            <option value="">All Topics</option>
            <option v-for="t in topicOptions" :key="t" :value="t">{{ t }}</option>
          </select>
          <select v-model="difficultyFilter" class="input-field text-sm w-auto">
            <option value="">All Difficulties</option>
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </select>
          <select v-model="statusFilter" class="input-field text-sm w-auto">
            <option value="">All Statuses</option>
            <option value="not_started">Not Started</option>
            <option value="in_progress">In Progress</option>
            <option value="submitted">Submitted</option>
            <option value="graded">Marked</option>
            <option value="overdue">Overdue</option>
          </select>
        </div>

        <div class="flex flex-wrap gap-2 mb-6">
          <button
            v-for="cat in categories"
            :key="cat"
            @click="activeCategory = activeCategory === cat ? null : cat"
            class="inline-flex items-center gap-1.5 px-3.5 py-2 text-sm font-semibold rounded-full border shadow-sm transition-all"
            :class="activeCategory === cat
              ? `bg-gradient-to-r ${CATEGORY_COLORS[cat]} text-white border-transparent shadow-md scale-[1.03]`
              : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'"
          >
            <span>{{ CATEGORY_ICONS[cat] }}</span> {{ CATEGORY_LABELS[cat] }}
          </button>
          <button v-if="activeCategory" @click="activeCategory = null" class="inline-flex items-center gap-1 px-3 py-2 text-xs font-medium rounded-full text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300">Clear filter ✕</button>
        </div>

        <!-- Loading skeleton -->
        <div v-if="loading" class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 sm:gap-5">
          <div v-for="i in 6" :key="i" class="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden animate-pulse">
            <div class="h-2 bg-gray-200 dark:bg-gray-700"></div>
            <div class="p-5 space-y-3">
              <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
              <div class="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
              <div class="h-3 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
              <div class="h-9 bg-gray-200 dark:bg-gray-700 rounded-lg w-full mt-4"></div>
            </div>
          </div>
        </div>

        <!-- Error state -->
        <div v-else-if="loadError" class="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-2xl p-6 text-center text-sm text-red-600 dark:text-red-300">{{ loadError }}</div>

        <!-- Empty state -->
        <div v-else-if="filteredAssignments.length === 0" class="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-10 sm:p-16 text-center">
          <span class="text-4xl sm:text-5xl block mb-3">🔬</span>
          <p class="text-gray-500 dark:text-gray-400 text-sm sm:text-base">
            {{ assignments.length === 0 ? 'No experiments have been published to your class yet.' : 'No experiments match your filters.' }}
          </p>
        </div>

        <!-- Experiment cards -->
        <div v-else class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 sm:gap-5">
          <div
            v-for="a in filteredAssignments"
            :key="a.assignment_id"
            class="group bg-white dark:bg-gray-800 rounded-2xl shadow-sm hover:shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden flex flex-col transition-all duration-200 hover:-translate-y-0.5 cursor-pointer"
            @click="openPreview(a)"
          >
            <div class="h-2 bg-gradient-to-r print-color-exact" :class="CATEGORY_COLORS[a.category]"></div>
            <div class="p-5 flex-1 flex flex-col">
              <div class="flex items-start justify-between gap-2 mb-2">
                <h3 class="font-bold text-gray-900 dark:text-white leading-snug">{{ a.experiment_title }}</h3>
                <span class="w-9 h-9 flex-shrink-0 rounded-xl bg-gradient-to-br flex items-center justify-center text-lg print-color-exact" :class="CATEGORY_COLORS[a.category]">{{ CATEGORY_ICONS[a.category] }}</span>
              </div>
              <p class="text-xs font-medium text-gray-400 dark:text-gray-500 mb-2 uppercase tracking-wide">{{ a.subject_name || CATEGORY_LABELS[a.category] }}<span v-if="a.topic"> · {{ a.topic }}</span></p>

              <div class="flex items-center gap-1.5 flex-wrap text-[11px] mb-3">
                <span class="px-2 py-0.5 rounded-full font-semibold capitalize" :class="DIFFICULTY_BADGE[a.difficulty]">{{ a.difficulty }}</span>
                <span v-if="a.estimated_duration_minutes" class="px-2 py-0.5 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400">⏱ {{ a.estimated_duration_minutes }} min</span>
                <span v-if="a.due_date" class="px-2 py-0.5 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400">Due {{ formatDate(a.due_date) }}</span>
              </div>

              <p class="text-sm text-gray-600 dark:text-gray-300 flex-1 line-clamp-3">{{ a.objective }}</p>

              <div class="flex items-center justify-between mt-4 gap-2">
                <span class="px-2.5 py-1 text-xs font-semibold rounded-full whitespace-nowrap" :class="statusBadgeClass(a)">{{ statusLabel(a) }}</span>
                <span class="text-xs font-medium text-gray-400 dark:text-gray-500 whitespace-nowrap">{{ a.marks }} marks</span>
              </div>

              <button class="mt-4 flex items-center justify-center gap-1.5 px-4 py-2.5 text-sm font-semibold rounded-xl bg-indigo-600 text-white shadow-sm hover:bg-indigo-700 hover:shadow-md transition-all group-hover:gap-2.5">
                {{ a.attempt_status === 'not_started' ? 'Preview' : a.attempt_status === 'in_progress' ? 'Continue' : 'View' }}
                <span class="transition-transform group-hover:translate-x-0.5">&rarr;</span>
              </button>
            </div>
          </div>
        </div>

        <!-- Experiment Preview -->
        <div v-if="previewAssignment" class="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/50 p-0 sm:p-4" @click.self="previewAssignment = null">
          <div class="bg-white dark:bg-gray-800 rounded-t-2xl sm:rounded-2xl shadow-xl w-full sm:max-w-lg max-h-[90vh] overflow-y-auto">
            <div class="p-5 sm:p-6 space-y-4">
              <div class="flex items-start justify-between gap-2">
                <div>
                  <h3 class="font-bold text-lg text-gray-900 dark:text-white">{{ previewAssignment.experiment_title }}</h3>
                  <p class="text-xs text-gray-400 dark:text-gray-500 mt-0.5">{{ previewAssignment.subject_name }}<span v-if="previewAssignment.topic"> · {{ previewAssignment.topic }}</span></p>
                </div>
                <button @click="previewAssignment = null" class="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700">✕</button>
              </div>

              <div v-if="loadingPreview" class="py-8 text-center"><div class="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 mx-auto"></div></div>
              <template v-else-if="previewDetail">
                <div class="flex items-center gap-1.5 flex-wrap text-xs">
                  <span class="px-2 py-0.5 rounded-full font-semibold capitalize" :class="DIFFICULTY_BADGE[previewDetail.difficulty]">{{ previewDetail.difficulty }}</span>
                  <span v-if="previewDetail.estimated_duration_minutes" class="px-2 py-0.5 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400">⏱ {{ previewDetail.estimated_duration_minutes }} min</span>
                  <span class="px-2 py-0.5 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400">{{ previewAssignment.marks }} marks</span>
                  <span class="px-2 py-0.5 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400">{{ previewDetail.steps.length }} steps</span>
                </div>

                <div v-if="previewDetail.objective"><p class="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1">Objective</p><p class="text-sm text-gray-700 dark:text-gray-300">{{ previewDetail.objective }}</p></div>
                <div v-if="previewDetail.learning_outcomes"><p class="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1">Learning Outcomes</p><p class="text-sm text-gray-700 dark:text-gray-300">{{ previewDetail.learning_outcomes }}</p></div>
                <div v-if="previewDetail.apparatus"><p class="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1">Apparatus</p><p class="text-sm text-gray-700 dark:text-gray-300">{{ previewDetail.apparatus }}</p></div>
                <div v-if="previewDetail.safety_precautions" class="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-3">
                  <p class="text-xs font-semibold text-red-600 dark:text-red-400 mb-1">⚠️ Safety</p>
                  <p class="text-sm text-red-700 dark:text-red-300">{{ previewDetail.safety_precautions }}</p>
                </div>

                <div v-if="previewDetail.practical_skills?.length">
                  <p class="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1.5">Practical Skills</p>
                  <div class="flex items-center gap-1 flex-wrap">
                    <span v-for="sk in previewDetail.practical_skills" :key="sk" class="px-2 py-0.5 text-[11px] font-medium rounded-full bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-300">{{ humanizeSkill(sk) }}</span>
                  </div>
                </div>

                <button @click="startOrContinue(previewAssignment)" class="w-full px-4 py-3 text-sm font-bold rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-sm hover:shadow-md transition-all">
                  {{ previewAssignment.attempt_status === 'not_started' ? 'Start Experiment' : previewAssignment.attempt_status === 'in_progress' ? 'Continue Experiment' : 'View Result' }}
                </button>
              </template>
              <p v-else class="text-sm text-red-500 text-center py-6">Could not load this experiment's preview.</p>
            </div>
          </div>
        </div>
      </div>

      <!-- ===================== MY PRACTICAL SKILLS TAB ===================== -->
      <VirtualLabSkillsPanel v-else viewer="student" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
import { CATEGORY_ICONS, CATEGORY_LABELS, CATEGORY_COLORS } from '@/types/virtualLab'
import type { StudentAssignment, LabCategory, ExperimentDetail } from '@/types/virtualLab'
import VirtualLabSkillsPanel from '@/components/virtuallab/VirtualLabSkillsPanel.vue'

const DIFFICULTY_BADGE: Record<string, string> = {
  beginner: 'bg-emerald-100 dark:bg-emerald-900 text-emerald-700 dark:text-emerald-300',
  intermediate: 'bg-amber-100 dark:bg-amber-900 text-amber-700 dark:text-amber-300',
  advanced: 'bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300',
}
const humanizeSkill = (slug: string) => slug.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase())
const formatDate = (iso: string) => new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })

const router = useRouter()
const activeTab = ref<'experiments' | 'skills'>('experiments')

const assignments = ref<StudentAssignment[]>([])
const loading = ref(true)
const loadError = ref<string | null>(null)
const activeCategory = ref<LabCategory | null>(null)
const search = ref('')
const subjectFilter = ref('')
const topicFilter = ref('')
const difficultyFilter = ref('')
const statusFilter = ref('')

const categories: LabCategory[] = ['physics', 'chemistry', 'biology', 'agriculture']

const isOverdue = (a: StudentAssignment) => !!a.due_date && new Date(a.due_date) < new Date() && (a.attempt_status === 'not_started' || a.attempt_status === 'in_progress')

const subjectOptions = computed(() => [...new Set(assignments.value.map(a => a.subject_name).filter((s): s is string => !!s))].sort())
const topicOptions = computed(() => [...new Set(assignments.value.map(a => a.topic).filter((t): t is string => !!t))].sort())

const filteredAssignments = computed(() => assignments.value.filter(a => {
  if (activeCategory.value && a.category !== activeCategory.value) return false
  if (subjectFilter.value && a.subject_name !== subjectFilter.value) return false
  if (topicFilter.value && a.topic !== topicFilter.value) return false
  if (difficultyFilter.value && a.difficulty !== difficultyFilter.value) return false
  if (statusFilter.value) {
    if (statusFilter.value === 'overdue') { if (!isOverdue(a)) return false }
    else if (a.attempt_status !== statusFilter.value) return false
  }
  if (search.value) {
    const q = search.value.toLowerCase()
    if (!a.experiment_title.toLowerCase().includes(q) && !(a.topic || '').toLowerCase().includes(q)) return false
  }
  return true
}))

const statusLabel = (a: StudentAssignment) => {
  if (isOverdue(a)) return 'Overdue'
  if (a.attempt_status === 'not_started') return 'Not started'
  if (a.attempt_status === 'in_progress') return 'In progress'
  if (a.attempt_status === 'submitted') return 'Submitted'
  return `Marked${a.attempt_score !== null ? ` - ${a.attempt_score}/${a.marks}` : ''}`
}

const statusBadgeClass = (a: StudentAssignment) => {
  if (isOverdue(a)) return 'bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300'
  const map: Record<string, string> = {
    not_started: 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300',
    in_progress: 'bg-amber-100 dark:bg-amber-900 text-amber-800 dark:text-amber-200',
    submitted: 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200',
    graded: 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200',
  }
  return map[a.attempt_status] || map.not_started
}

// --- Preview - never starts an attempt on its own; only the explicit Start/Continue button does,
// and that reuses the existing startAttempt() upsert (resumes an in-progress attempt rather than
// creating a duplicate - unique_lab_attempt(assignment_id, student_id) already guarantees this). --
const previewAssignment = ref<StudentAssignment | null>(null)
const previewDetail = ref<ExperimentDetail | null>(null)
const loadingPreview = ref(false)

const openPreview = async (a: StudentAssignment) => {
  previewAssignment.value = a
  previewDetail.value = null
  loadingPreview.value = true
  try {
    const res = await axios.get(`/api/student/virtual-lab/assignments/${a.assignment_id}/preview`)
    previewDetail.value = res.data.data
  } catch {
    previewDetail.value = null
  } finally {
    loadingPreview.value = false
  }
}

const startOrContinue = (a: StudentAssignment) => {
  router.push(`/student/virtual-lab/${a.assignment_id}`)
}

onMounted(async () => {
  try {
    const res = await axios.get('/api/student/virtual-lab/assignments')
    assignments.value = res.data.data.assignments
  } catch {
    loadError.value = 'Could not load your Virtual Lab experiments. Please try again later.'
  } finally {
    loading.value = false
  }
})
</script>
