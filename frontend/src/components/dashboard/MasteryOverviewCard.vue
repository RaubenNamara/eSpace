<template>
  <!-- Curriculum mastery per subject, on the three layers of the student Learning Map: learning
       outcomes (LOA), topic competencies (AOI) and Elements of Construct (EOC). Coverage is how
       much of this year's curriculum has an assessment linked; results are the share of returned
       results at Satisfactory or above. -->
  <div v-if="data && data.subjects.length" class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4 sm:p-5 mb-6">
    <div class="flex flex-wrap items-start justify-between gap-2 mb-4">
      <div>
        <h3 class="text-base font-bold text-gray-900 dark:text-white">Curriculum mastery<template v-if="data.year"> · {{ data.year }}</template></h3>
        <p class="text-xs text-gray-500 dark:text-gray-400">How much of the curriculum has an assessment linked, and how students are doing on it</p>
      </div>
      <slot name="filter" />
    </div>

    <!-- The three layers, school- or department-wide -->
    <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
      <div v-for="layer in LAYERS" :key="layer.key" class="rounded-lg border border-gray-200 dark:border-gray-700 p-3">
        <div class="flex items-center gap-2 mb-2">
          <span class="w-2.5 h-2.5 rounded-full" :style="{ background: layer.color }"></span>
          <p class="text-sm font-semibold text-gray-900 dark:text-white">{{ layer.label }}</p>
          <span class="ml-auto text-[10px] font-semibold text-gray-400 dark:text-gray-500">{{ layer.by }}</span>
        </div>
        <p class="text-2xl font-bold text-gray-900 dark:text-white leading-none"><CountUp :value="`${data.totals[layer.key].coverage}%`" /></p>
        <p class="text-[11px] text-gray-500 dark:text-gray-400 mt-0.5">linked · {{ data.totals[layer.key].covered.toLocaleString() }} of {{ data.totals[layer.key].total.toLocaleString() }} {{ layer.unit }}</p>
        <div class="h-1.5 mt-2 rounded-full bg-gray-100 dark:bg-gray-700 overflow-hidden">
          <div class="h-full rounded-full transition-all duration-700" :style="{ width: `${data.totals[layer.key].coverage}%`, background: layer.color }"></div>
        </div>
        <p class="text-xs mt-2" :class="rateClass(data.totals[layer.key].rate)">
          {{ data.totals[layer.key].rate === null ? 'No returned results yet' : `${data.totals[layer.key].rate}% of results Satisfactory or above` }}
        </p>
      </div>
    </div>

    <!-- Per subject -->
    <div class="overflow-x-auto -mx-1">
      <table class="w-full text-sm min-w-[560px]">
        <thead>
          <tr class="text-left text-[11px] uppercase tracking-wider text-gray-500 dark:text-gray-400">
            <th class="px-1 py-1.5 font-semibold">Subject</th>
            <th v-for="layer in LAYERS" :key="layer.key" class="px-1 py-1.5 font-semibold">{{ layer.short }}</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-100 dark:divide-gray-700">
          <tr v-for="s in sortedSubjects" :key="s.id">
            <td class="px-1 py-2">
              <p class="font-semibold text-gray-900 dark:text-white">{{ s.name }}</p>
              <p v-if="showDepartment && s.department_name && s.department_name.toLowerCase() !== s.name.toLowerCase()" class="text-[11px] text-gray-500 dark:text-gray-400">{{ s.department_name }}</p>
            </td>
            <td v-for="layer in LAYERS" :key="layer.key" class="px-1 py-2 align-top">
              <template v-if="s[layer.key].total">
                <div class="flex items-center gap-2">
                  <div class="h-1.5 w-16 rounded-full bg-gray-100 dark:bg-gray-700 overflow-hidden">
                    <div class="h-full rounded-full" :style="{ width: `${s[layer.key].coverage}%`, background: layer.color }"></div>
                  </div>
                  <span class="text-[11px] text-gray-600 dark:text-gray-300">{{ s[layer.key].covered }}/{{ s[layer.key].total }}</span>
                </div>
                <p class="text-[11px] mt-0.5" :class="rateClass(s[layer.key].rate)">{{ s[layer.key].rate === null ? 'no results yet' : `${s[layer.key].rate}% satisfactory+` }}</p>
              </template>
              <span v-else class="text-[11px] text-gray-400 dark:text-gray-500">not in curriculum</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import axios from 'axios'
import CountUp from '@/components/common/CountUp.vue'

type LayerKey = 'outcomes' | 'competencies' | 'constructs'
interface Layer { total: number; covered: number; results: number; achieved: number; coverage: number; rate: number | null }
interface SubjectRow extends Record<LayerKey, Layer> { id: number; name: string; code: string | null; department_name: string | null }
interface Overview { year: string | null; subjects: SubjectRow[]; totals: Record<LayerKey, Layer> }

const props = withDefaults(defineProps<{ endpoint: string; params?: Record<string, unknown>; showDepartment?: boolean }>(), { params: () => ({}), showDepartment: false })

const LAYERS: { key: LayerKey; label: string; short: string; by: string; unit: string; color: string }[] = [
  { key: 'outcomes', label: 'Learning outcomes', short: 'Outcomes (LOA)', by: 'LOA', unit: 'outcomes', color: '#059669' },
  { key: 'competencies', label: 'Topic competencies', short: 'Competencies (AOI)', by: 'AOI', unit: 'topics', color: '#7c3aed' },
  { key: 'constructs', label: 'Elements of Construct', short: 'Constructs (EOC)', by: 'EOC', unit: 'constructs', color: '#d97706' }
]

const data = ref<Overview | null>(null)

// Least linked first - where attention is needed
const sortedSubjects = computed(() => [...(data.value?.subjects ?? [])].sort((a, b) =>
  (a.outcomes.coverage + a.competencies.coverage + a.constructs.coverage) - (b.outcomes.coverage + b.competencies.coverage + b.constructs.coverage)
  || a.name.localeCompare(b.name)))

const rateClass = (rate: number | null) => rate === null ? 'text-gray-400 dark:text-gray-500'
  : rate >= 60 ? 'text-emerald-700 dark:text-emerald-300 font-semibold'
    : rate >= 50 ? 'text-amber-700 dark:text-amber-300 font-semibold'
      : 'text-rose-700 dark:text-rose-300 font-semibold'

const load = async () => {
  try {
    const response = await axios.get(props.endpoint, { params: props.params })
    if (response.data.success) data.value = response.data.data
  } catch {
    // the panel simply doesn't show
  }
}
onMounted(load)
watch(() => JSON.stringify(props.params), load)

defineExpose({ reload: load })
</script>
