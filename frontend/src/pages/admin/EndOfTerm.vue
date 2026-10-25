<template>
  <!-- Closing a term, step by step: marking finished, paper exam marks in, report cards made for
       every class, learners promoted (last term of the year), and the next term set up. Each step
       says what is left and opens the page where it is done. -->
  <div class="w-full max-w-4xl">
    <PageHeader title="End of term" :description="data?.term ? headline : 'Everything to finish before the term closes.'" icon="check-circle" accent="indigo">
      <template #actions>
        <RouterLink :to="reportLink" class="btn-secondary">Teacher report</RouterLink>
      </template>
      <template #filters>
        <select v-model.number="termId" aria-label="Term" class="w-full sm:w-auto py-2 pl-3 pr-8 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm text-gray-900 dark:text-white">
          <option v-for="t in data?.terms || []" :key="t.id" :value="t.id">{{ t.name }}{{ t.is_current ? ' (current)' : '' }}</option>
        </select>
      </template>
    </PageHeader>

    <div v-if="loading && !data" class="space-y-3"><div v-for="i in 4" :key="i" class="h-20 rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 animate-pulse"></div></div>

    <template v-else-if="data?.term">
      <!-- progress -->
      <section class="dash-box mb-4">
        <h2 class="dash-bar">
          {{ data.term.name }}
          <span class="px-2 py-0.5 rounded-full text-xs font-extrabold tabular-nums" :class="doneCount === data.steps.length ? 'bg-indigo-600 text-white' : 'bg-amber-400 text-gray-900'">{{ doneCount }}/{{ data.steps.length }}</span>
          <span class="ml-auto text-xs font-semibold text-indigo-800 dark:text-indigo-200">{{ whenText }}</span>
        </h2>
        <div class="px-4 py-3">
          <div class="h-2 rounded-full bg-white/80 dark:bg-gray-700 ring-1 ring-black/5 overflow-hidden"><div class="h-full bg-indigo-600 transition-all duration-700" :style="{ width: `${Math.max(3, (doneCount / Math.max(1, data.steps.length)) * 100)}%` }"></div></div>
          <p class="mt-1.5 text-xs text-gray-600 dark:text-gray-300">{{ doneCount === data.steps.length ? 'Everything is done - the term can close.' : `${data.steps.length - doneCount} step${data.steps.length - doneCount === 1 ? '' : 's'} left before the term closes.` }}</p>
        </div>
      </section>

      <ol class="space-y-4">
        <li v-for="(s, i) in data.steps" :key="s.key" class="dash-box">
          <h2 class="dash-bar">
            <span class="w-6 h-6 rounded-full flex-shrink-0 flex items-center justify-center text-xs font-extrabold" :class="s.done ? 'bg-indigo-600 text-white' : 'bg-amber-400 text-gray-900'">
              <AppIcon v-if="s.done" name="check" class="w-3.5 h-3.5" />
              <template v-else>{{ i + 1 }}</template>
            </span>
            {{ s.title }}
            <RouterLink v-if="!s.done" :to="s.key === 'marking' ? reportLink : s.link" class="dash-bar-link">{{ s.action }} →</RouterLink>
            <span v-else class="ml-auto text-xs font-semibold text-indigo-700 dark:text-indigo-300">Done</span>
          </h2>
          <div class="px-4 py-3">
            <p class="text-sm" :class="s.done ? 'text-gray-600 dark:text-gray-300' : 'text-gray-800 dark:text-gray-100'">{{ s.detail }}</p>
            <ul v-if="s.items.length" class="mt-2.5 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
              <li v-for="it in s.items" :key="it.label">
                <component :is="it.link ? RouterLink : 'div'" :to="it.link" class="dash-chip dash-chip-alert justify-between">
                  <span class="text-sm font-semibold text-gray-900 dark:text-white truncate">{{ it.label }}</span>
                  <span class="text-[11px] text-rose-700 dark:text-rose-300 tabular-nums flex-shrink-0">{{ it.value }}</span>
                </component>
              </li>
            </ul>
          </div>
        </li>
      </ol>

      <p class="mt-4 text-xs text-gray-500 dark:text-gray-400">
        {{ data.auto_switch ? 'The current term follows the calendar: when the next term starts, it becomes the current one by itself.' : 'You choose the current term by hand.' }}
        <RouterLink to="/admin/terms" class="font-semibold text-indigo-600 dark:text-indigo-300 hover:underline">Change on Terms</RouterLink>
      </p>
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import { apiService } from '@/services/api'
import PageHeader from '@/components/ui/PageHeader.vue'
import AppIcon from '@/components/common/AppIcon.vue'
import { useToastStore } from '@/stores/toast'

interface Step { key: string; title: string; done: boolean; detail: string; link: string; action: string; items: { label: string; value: string; link?: string }[] }
interface Data {
  terms: { id: number; name: string; is_current: boolean }[]
  term: { id: number; name: string; start_date: string; end_date: string; days_left: number; last_of_year: boolean } | null
  steps: Step[]
  auto_switch: boolean
}

const toast = useToastStore()
const data = ref<Data | null>(null)
const loading = ref(false)
const termId = ref(0)

const doneCount = computed(() => data.value?.steps.filter(s => s.done).length || 0)
const fmt = (d: string) => new Date(d).toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' })
const headline = computed(() => `${data.value!.term!.name} · ${fmt(data.value!.term!.start_date)} – ${fmt(data.value!.term!.end_date)}`)
const whenText = computed(() => {
  const d = data.value?.term?.days_left ?? 0
  if (d > 1) return `The term ends in ${d} days`
  if (d === 1) return 'The term ends tomorrow'
  if (d === 0) return 'The term ends today'
  return `The term ended ${-d} day${d === -1 ? '' : 's'} ago`
})
const reportLink = computed(() => `/admin/supervision/report${data.value?.term ? `?term_id=${data.value.term.id}` : ''}`)

const load = async () => {
  loading.value = true
  try {
    const res = await apiService.get('/admin/end-of-term', termId.value ? { term_id: termId.value } : {})
    data.value = res.data.data
    if (data.value?.term && termId.value !== data.value.term.id) termId.value = data.value.term.id
  } catch (err: any) {
    toast.error(err.response?.data?.message || 'Could not load the checklist')
  } finally {
    loading.value = false
  }
}

watch(termId, (id, old) => { if (old && id !== old) load() })
onMounted(load)
</script>
