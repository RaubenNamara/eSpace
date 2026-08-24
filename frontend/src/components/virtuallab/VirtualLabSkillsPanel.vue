<!--
  Shared practical-skills display, reused by both the student's own "My Practical Skills" tab and
  the teacher's "Student Skills" view - same cards/evidence/labels either way, just a different
  data source and a couple of teacher-only fields, so the two experiences never visually diverge.
-->
<template>
  <div>
    <div v-if="loading" class="py-10 text-center"><div class="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 mx-auto"></div></div>
    <div v-else-if="loadError" class="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-2xl p-6 text-center text-sm text-red-600 dark:text-red-300">{{ loadError }}</div>

    <template v-else>
      <div v-if="skillsWithEvidence.length === 0" class="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-10 sm:p-14 text-center">
        <span class="text-4xl block mb-3">📊</span>
        <p class="text-gray-500 dark:text-gray-400 text-sm sm:text-base max-w-md mx-auto">No practical skills assessed yet. Complete a Virtual Lab experiment to begin building {{ viewer === 'student' ? 'your' : 'a' }} skills profile.</p>
      </div>

      <template v-else>
        <!-- Overview -->
        <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-5 mb-5">
          <p class="text-sm font-bold text-gray-700 dark:text-gray-300 mb-4">Overall Practical Skills</p>
          <div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div class="bg-gray-50 dark:bg-gray-900/40 rounded-xl p-3">
              <p class="text-[11px] font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wide mb-1">Strongest Skill</p>
              <p class="text-sm font-bold text-emerald-600 dark:text-emerald-400">{{ overview?.strongest_skill?.skill_name ?? '—' }}</p>
              <p v-if="overview?.strongest_skill" class="text-xs text-gray-400">{{ overview.strongest_skill.score_percent }}%</p>
            </div>
            <div class="bg-gray-50 dark:bg-gray-900/40 rounded-xl p-3">
              <p class="text-[11px] font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wide mb-1">Needs Most Practice</p>
              <p class="text-sm font-bold text-amber-600 dark:text-amber-400">{{ overview?.weakest_skill?.skill_name ?? '—' }}</p>
              <p v-if="overview?.weakest_skill" class="text-xs text-gray-400">{{ overview.weakest_skill.score_percent }}%</p>
            </div>
            <div class="bg-gray-50 dark:bg-gray-900/40 rounded-xl p-3">
              <p class="text-[11px] font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wide mb-1">Experiments Completed</p>
              <p class="text-lg font-bold text-gray-900 dark:text-white">{{ overview?.results_summary?.experiments_completed ?? 0 }}</p>
            </div>
            <div class="bg-gray-50 dark:bg-gray-900/40 rounded-xl p-3">
              <p class="text-[11px] font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wide mb-1">Overall Practical Average</p>
              <p class="text-lg font-bold text-gray-900 dark:text-white">{{ overview?.results_summary?.average_percentage !== null && overview?.results_summary?.average_percentage !== undefined ? overview.results_summary.average_percentage + '%' : '—' }}</p>
            </div>
          </div>
        </div>

        <!-- Skill cards -->
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          <div v-for="s in skills" :key="s.skill_key" class="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-4">
            <button class="w-full text-left" @click="toggleSkill(s.skill_key)">
              <div class="flex items-center justify-between gap-2 mb-1.5">
                <p class="font-semibold text-gray-900 dark:text-white text-sm">{{ s.skill_name }}</p>
                <span v-if="s.total_steps > 0" class="text-lg font-extrabold" :class="scoreColorClass(s.score_percent)">{{ s.score_percent }}%</span>
                <span v-else class="text-xs font-semibold text-gray-400 dark:text-gray-500">Not Assessed Yet</span>
              </div>
              <div v-if="s.total_steps > 0" class="h-2 rounded-full bg-gray-100 dark:bg-gray-700 overflow-hidden mb-1.5">
                <div class="h-full rounded-full print-color-exact" :class="scoreBarClass(s.score_percent)" :style="{ width: (s.score_percent ?? 0) + '%' }"></div>
              </div>
              <div class="flex items-center justify-between gap-2">
                <span v-if="s.total_steps > 0" class="text-[11px] px-1.5 py-0.5 rounded-full font-medium" :class="scoreLabelClass(s.score_percent)">{{ s.label }}</span>
                <span v-else class="text-[11px] text-gray-400 dark:text-gray-500">Complete an experiment using this skill to get started.</span>
                <span v-if="s.total_steps > 0" class="text-[11px] text-gray-400 dark:text-gray-500 ml-auto">Based on {{ s.total_steps }} assessed action{{ s.total_steps === 1 ? '' : 's' }}</span>
              </div>
            </button>

            <div v-if="expandedSkill === s.skill_key" class="mt-3 pt-3 border-t border-gray-100 dark:border-gray-700 space-y-3">
              <div v-if="loadingEvidence" class="text-xs text-gray-400 text-center py-2">Loading evidence...</div>
              <template v-else-if="evidence">
                <div v-if="s.improvement_message" class="bg-indigo-50 dark:bg-indigo-900/20 rounded-xl p-3 text-xs text-indigo-700 dark:text-indigo-300">{{ s.improvement_message }}</div>

                <div v-if="evidence.experiments.length > 0">
                  <p class="text-[11px] font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wide mb-1.5">Evidence</p>
                  <div class="space-y-1">
                    <div v-for="e in evidence.experiments" :key="e.experiment_title" class="flex items-center justify-between text-xs">
                      <span class="text-gray-600 dark:text-gray-300 truncate">{{ e.experiment_title }}</span>
                      <span class="font-semibold text-gray-500 dark:text-gray-400 flex-shrink-0 ml-2">{{ e.correct }}/{{ e.total }}</span>
                    </div>
                  </div>
                  <p v-if="evidence.latest_activity" class="text-[10px] text-gray-400 dark:text-gray-500 mt-1.5">Latest activity: {{ formatDate(evidence.latest_activity) }}</p>
                </div>

                <div v-if="viewer === 'student' && recommendations.length > 0">
                  <p class="text-[11px] font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wide mb-1.5">Recommended Practice</p>
                  <div class="flex flex-wrap gap-1.5">
                    <span v-for="t in recommendations" :key="t.id" class="px-2 py-1 text-[11px] font-medium rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300">{{ t.title }}</span>
                  </div>
                </div>
              </template>
            </div>
          </div>
        </div>
      </template>
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import axios from 'axios'
import type { SkillScore, SkillsOverview, SkillEvidenceSummary, RecommendedTemplate } from '@/types/virtualLab'

const props = defineProps<{
  viewer: 'student' | 'teacher'
  studentId?: number
}>()

const API_BASE = computed(() => (props.viewer === 'teacher' ? '/api/teacher' : '/api/student'))

const loading = ref(true)
const loadError = ref<string | null>(null)
const skills = ref<SkillScore[]>([])
const overview = ref<SkillsOverview | null>(null)

const skillsWithEvidence = computed(() => skills.value.filter(s => s.total_steps > 0))

const SCORE_COLORS = [
  { min: 95, text: 'text-emerald-600 dark:text-emerald-400', bar: 'bg-emerald-500', badge: 'bg-emerald-100 dark:bg-emerald-900 text-emerald-700 dark:text-emerald-300' },
  { min: 85, text: 'text-teal-600 dark:text-teal-400', bar: 'bg-teal-500', badge: 'bg-teal-100 dark:bg-teal-900 text-teal-700 dark:text-teal-300' },
  { min: 70, text: 'text-indigo-600 dark:text-indigo-400', bar: 'bg-indigo-500', badge: 'bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300' },
  { min: 50, text: 'text-amber-600 dark:text-amber-400', bar: 'bg-amber-500', badge: 'bg-amber-100 dark:bg-amber-900 text-amber-700 dark:text-amber-300' },
  { min: 0, text: 'text-red-500 dark:text-red-400', bar: 'bg-red-500', badge: 'bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300' },
]
const bandFor = (pct: number | null) => SCORE_COLORS.find(b => (pct ?? 0) >= b.min) ?? SCORE_COLORS[SCORE_COLORS.length - 1]
const scoreColorClass = (pct: number | null) => bandFor(pct).text
const scoreBarClass = (pct: number | null) => bandFor(pct).bar
const scoreLabelClass = (pct: number | null) => bandFor(pct).badge
const formatDate = (iso: string) => new Date(iso).toLocaleString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })

const load = async () => {
  loading.value = true
  loadError.value = null
  try {
    if (props.viewer === 'student') {
      const [skillsRes, overviewRes] = await Promise.all([
        axios.get(`${API_BASE.value}/virtual-lab/skills`),
        axios.get(`${API_BASE.value}/virtual-lab/skills/overview`),
      ])
      skills.value = skillsRes.data.data.skills
      overview.value = overviewRes.data.data
    } else if (props.studentId) {
      const res = await axios.get(`${API_BASE.value}/virtual-lab/students/${props.studentId}/skills`)
      skills.value = res.data.data.skills
      overview.value = res.data.data.overview
    }
  } catch {
    loadError.value = 'Could not load practical skills. Please try again later.'
  } finally {
    loading.value = false
  }
}

const expandedSkill = ref<string | null>(null)
const evidence = ref<SkillEvidenceSummary | null>(null)
const loadingEvidence = ref(false)
const recommendations = ref<RecommendedTemplate[]>([])

const toggleSkill = async (skillKey: string) => {
  if (expandedSkill.value === skillKey) {
    expandedSkill.value = null
    return
  }
  expandedSkill.value = skillKey
  evidence.value = null
  recommendations.value = []
  loadingEvidence.value = true
  try {
    if (props.viewer === 'student') {
      const [evRes, recRes] = await Promise.all([
        axios.get(`${API_BASE.value}/virtual-lab/skills/${skillKey}/evidence`),
        axios.get(`${API_BASE.value}/virtual-lab/skills/${skillKey}/recommendations`),
      ])
      evidence.value = evRes.data.data
      recommendations.value = recRes.data.data.templates
    } else if (props.studentId) {
      const evRes = await axios.get(`${API_BASE.value}/virtual-lab/students/${props.studentId}/skills/${skillKey}/evidence`)
      evidence.value = evRes.data.data
    }
  } finally {
    loadingEvidence.value = false
  }
}

onMounted(load)
watch(() => props.studentId, () => { expandedSkill.value = null; if (props.viewer === 'teacher') load() })
</script>
