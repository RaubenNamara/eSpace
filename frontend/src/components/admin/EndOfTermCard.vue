<template>
  <!-- In the last four weeks of a term (and for a while after it ends), what is left before it
       closes - marking, paper marks, report cards, promotion, the next term - with the way to
       the full checklist (pages/admin/EndOfTerm.vue). Hidden the rest of the term. -->
  <section v-if="show && data?.term" class="dash-box">
    <h2 class="dash-bar">
      End of {{ data.term.name }}
      <span class="px-2 py-0.5 rounded-full text-xs font-extrabold tabular-nums" :class="left ? 'bg-amber-400 text-gray-900' : 'bg-indigo-600 text-white'">{{ data.steps.length - left }}/{{ data.steps.length }}</span>
      <span class="ml-auto text-xs font-semibold text-indigo-800 dark:text-indigo-200">{{ whenText }}</span>
    </h2>
    <ul class="p-3 space-y-1.5">
      <li v-for="s in data.steps" :key="s.key" class="flex items-start gap-2.5 text-sm">
        <span class="mt-0.5 w-4 h-4 rounded-full flex-shrink-0 flex items-center justify-center" :class="s.done ? 'bg-emerald-600 text-white' : 'border-2 border-amber-400'">
          <AppIcon v-if="s.done" name="check" class="w-3 h-3" />
        </span>
        <span class="min-w-0">
          <span class="font-semibold" :class="s.done ? 'text-gray-500 dark:text-gray-400' : 'text-gray-900 dark:text-white'">{{ s.title }}</span>
          <span v-if="!s.done" class="block text-xs text-gray-600 dark:text-gray-300">{{ s.detail }}</span>
        </span>
      </li>
    </ul>
    <div class="px-3 pb-3">
      <RouterLink to="/admin/end-of-term" class="text-sm font-semibold text-indigo-700 dark:text-indigo-300 hover:underline">Open the end-of-term checklist →</RouterLink>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { apiService } from '@/services/api'
import AppIcon from '@/components/common/AppIcon.vue'

interface Data {
  term: { id: number; name: string; days_left: number } | null
  steps: { key: string; title: string; done: boolean; detail: string }[]
}

const data = ref<Data | null>(null)
const left = computed(() => data.value?.steps.filter(s => !s.done).length ?? 0)
// from four weeks before the end until six weeks after, while something is left
const show = computed(() => {
  const d = data.value?.term?.days_left
  return d !== undefined && d <= 28 && d >= -42 && left.value > 0
})
const whenText = computed(() => {
  const d = data.value?.term?.days_left ?? 0
  if (d > 1) return `ends in ${d} days`
  if (d === 1) return 'ends tomorrow'
  if (d === 0) return 'ends today'
  return `ended ${-d} day${d === -1 ? '' : 's'} ago`
})

onMounted(async () => {
  try {
    const res = await apiService.get('/admin/end-of-term')
    data.value = res.data.data
  } catch { /* the card simply stays hidden */ }
})
</script>
