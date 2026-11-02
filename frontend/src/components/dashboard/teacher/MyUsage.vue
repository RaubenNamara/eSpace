<template>
  <!-- The teacher's own use of Tusome: totals, and how much they did each day -->
  <section class="dash-box">
    <h2 class="dash-bar">
      My usage
      <span class="inline-flex rounded-lg bg-white/70 dark:bg-gray-900/40 p-0.5 ring-1 ring-black/5 dark:ring-white/10">
        <button
          v-for="d in [7, 30]"
          :key="d"
          type="button"
          class="px-2.5 py-0.5 rounded-md text-xs font-semibold transition"
          :class="days === d ? 'bg-indigo-600 text-white' : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'"
          :aria-pressed="days === d"
          @click="days = d"
        >{{ d }} days</button>
      </span>
    </h2>

    <div v-if="loading && !data" class="p-4 space-y-3">
      <div class="grid grid-cols-3 gap-2"><div v-for="i in 3" :key="i" class="h-14 rounded-xl bg-gray-100 dark:bg-gray-700/50 animate-pulse"></div></div>
      <div class="h-32 rounded-xl bg-gray-100 dark:bg-gray-700/50 animate-pulse"></div>
    </div>
    <p v-else-if="failed" class="p-4 text-sm text-gray-500 dark:text-gray-400">Your usage couldn't be loaded just now.</p>

    <div v-else-if="data" class="p-3 sm:p-4 space-y-4">
      <!-- Totals -->
      <div class="grid grid-cols-3 gap-2">
        <div v-for="t in totals" :key="t.label" class="rounded-xl bg-gray-50 dark:bg-gray-900/40 px-3 py-2 min-w-0">
          <p class="text-[10px] font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400 truncate">{{ t.label }}</p>
          <p class="text-lg font-bold leading-tight text-gray-900 dark:text-white tabular-nums">{{ t.value }}</p>
          <p class="text-[10px] text-gray-500 dark:text-gray-400 truncate">{{ t.hint }}</p>
        </div>
      </div>

      <!-- One bar per day: how much work was done in Tusome that day -->
      <div>
        <p class="text-sm font-semibold text-gray-800 dark:text-gray-100">Your activity each day</p>
        <p class="text-[11px] text-gray-500 dark:text-gray-400 mb-3">Each bar counts the things you did that day: marking, eNotes, assessments, videos and more. Taller means busier.</p>

        <p v-if="!data.totals.actions" class="py-6 text-center text-sm text-gray-500 dark:text-gray-400">No activity in the last {{ days }} days yet.</p>
        <div v-else class="flex gap-2">
          <!-- scale -->
          <div class="h-32 flex flex-col justify-between text-[9px] tabular-nums text-gray-400 dark:text-gray-500 text-right w-5 -mt-1.5">
            <span>{{ maxActions }}</span>
            <span>{{ Math.round(maxActions / 2) }}</span>
            <span>0</span>
          </div>

          <div class="relative flex-1 min-w-0" @mouseleave="hover = null">
            <div class="absolute inset-x-0 top-0 h-32 flex flex-col justify-between pointer-events-none">
              <div class="border-t border-dashed border-gray-200 dark:border-gray-700"></div>
              <div class="border-t border-dashed border-gray-200 dark:border-gray-700"></div>
              <div class="border-t border-gray-300 dark:border-gray-600"></div>
            </div>

            <div class="relative flex items-end h-32" :class="days === 30 ? 'gap-[3px]' : 'gap-3'">
              <button
                v-for="(d, i) in data.series"
                :key="d.date"
                type="button"
                class="relative flex-1 h-full flex flex-col items-center justify-end focus:outline-none"
                :aria-label="`${dayLabel(d.date)}: ${d.actions} things done`"
                @mouseenter="hover = i"
                @focus="hover = i"
                @click="hover = i"
              >
                <span v-if="d.actions" class="mb-0.5 font-bold tabular-nums text-gray-700 dark:text-gray-200" :class="days === 30 ? 'text-[9px]' : 'text-xs'">{{ d.actions }}</span>
                <span
                  class="block w-full rounded-t transition-colors"
                  :class="[d.actions ? (hover === i ? 'bg-indigo-700' : 'bg-indigo-600') : '', days === 7 ? 'max-w-[3rem]' : '']"
                  :style="{ height: d.actions ? `${Math.max(3, (d.actions / maxActions) * 85)}%` : '0' }"
                ></span>
              </button>
            </div>
            <!-- dates: every day for a week, every fifth day for a month -->
            <div class="flex mt-1 text-[10px] text-gray-500 dark:text-gray-400" :class="days === 30 ? 'gap-[3px]' : 'gap-3'">
              <span v-for="(d, i) in data.series" :key="d.date" class="flex-1 text-center whitespace-nowrap">
                <template v-if="days === 7 || (data.series.length - 1 - i) % 5 === 0">{{ shortDay(d.date) }}</template>
              </span>
            </div>

            <!-- the day under the pointer -->
            <div
              v-if="hover !== null && data.series[hover]"
              class="absolute -top-1 z-10 -translate-y-full px-2.5 py-1.5 rounded-lg bg-gray-900 text-white text-[11px] shadow-lg whitespace-nowrap pointer-events-none"
              :class="tipSide"
              :style="{ left: `${((hover + 0.5) / data.series.length) * 100}%` }"
            >
              <p class="font-semibold">{{ dayLabel(data.series[hover].date) }}</p>
              <p>{{ data.series[hover].actions }} {{ data.series[hover].actions === 1 ? 'thing' : 'things' }} done · {{ data.series[hover].signins ? `signed in ${data.series[hover].signins}×` : 'not signed in' }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'
import apiService from '@/services/api'

interface Usage {
  days: number
  series: { date: string; signins: number; actions: number }[]
  totals: { signins: number; actions: number; active_days: number }
  by_kind: { type: string; count: number }[]
}

const days = ref<7 | 30>(30)
const data = ref<Usage | null>(null)
const loading = ref(false)
const failed = ref(false)
const hover = ref<number | null>(null)

const load = async () => {
  loading.value = true
  failed.value = false
  try {
    const res = await apiService.get('/teacher/usage', { params: { days: days.value } })
    data.value = res.data.data
  } catch {
    failed.value = true
  } finally {
    loading.value = false
  }
}
watch(days, () => { hover.value = null; load() })
onMounted(load)

// The tooltip stays inside the card: anchored left near the start, right near the end
const tipSide = computed(() => {
  const f = hover.value === null || !data.value ? 0.5 : (hover.value + 0.5) / data.value.series.length
  return f < 0.25 ? '-translate-x-4' : f > 0.75 ? '-translate-x-[calc(100%-1rem)]' : '-translate-x-1/2'
})
const maxActions = computed(() => Math.max(1, ...(data.value?.series.map(s => s.actions) ?? [1])))
const totals = computed(() => {
  const t = data.value!.totals
  return [
    { label: 'Active days', value: t.active_days, hint: `of the last ${days.value}` },
    { label: 'Sign-ins', value: t.signins, hint: t.signins ? `${(t.signins / days.value).toFixed(1)} a day` : 'none yet' },
    { label: 'Things done', value: t.actions, hint: 'marking, notes, sets...' }
  ]
})

const asDate = (d: string) => new Date(`${d}T00:00:00`)
const dayLabel = (d: string) => asDate(d).toLocaleDateString(undefined, { weekday: 'short', day: 'numeric', month: 'short' })
const shortDay = (d: string) => (days.value === 7 ? asDate(d).toLocaleDateString(undefined, { weekday: 'short' }) : asDate(d).toLocaleDateString(undefined, { day: 'numeric', month: 'short' }))
</script>
