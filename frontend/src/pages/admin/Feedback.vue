<template>
  <!-- Anonymous feedback from /feedback, added up (super admins only): the headline figures, how
       each kind of person rates Tusome, then every question's answers - narrowed to one kind of
       person and a period with the filters. -->
  <div class="w-full">
    <PageHeader title="Feedback" description="Anonymous answers from the feedback form - who said what, added up. Nothing here identifies anyone." icon="chat" accent="indigo">
      <template #actions>
        <a href="/feedback" target="_blank" rel="noopener" class="px-3 py-2 rounded-lg text-sm font-semibold border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700">Open the form</a>
      </template>
    </PageHeader>

    <!-- Filters: one row -->
    <div class="mb-5 flex flex-wrap items-center gap-2">
      <button v-for="r in roleChips" :key="r.key" type="button" class="px-3 py-1.5 rounded-full text-xs font-semibold border transition"
        :class="role === r.key ? 'bg-indigo-600 border-indigo-600 text-white' : 'border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700'"
        @click="role = r.key">{{ r.label }}</button>
      <select v-model="days" class="ml-auto px-3 py-1.5 text-sm border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white" aria-label="Period">
        <option value="">All time</option>
        <option value="30">Last 30 days</option>
        <option value="90">Last 90 days</option>
      </select>
    </div>

    <Skeleton v-if="loading" variant="list" :count="4" />
    <EmptyState v-else-if="!data || !data.responses" icon="chat" tone="indigo" title="No feedback yet" :message="role || days ? 'Nothing for these filters - try All, or All time.' : 'Share the form - tusome.ug/feedback - and the answers add up here.'" />

    <template v-else>
      <!-- Headline -->
      <div class="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <div v-for="t in tiles" :key="t.label" class="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-4">
          <p class="text-xs font-semibold text-gray-500 dark:text-gray-400">{{ t.label }}</p>
          <p class="mt-1 text-2xl font-extrabold text-gray-900 dark:text-white tabular-nums">{{ t.value }}</p>
          <p v-if="t.hint" class="mt-0.5 text-xs text-gray-500 dark:text-gray-400 truncate">{{ t.hint }}</p>
        </div>
      </div>

      <!-- By who answered -->
      <section v-if="!role" :class="[SECTION, 'mt-5']">
        <h2 :class="H2">By who answered</h2>
        <div class="mt-3 overflow-x-auto">
          <table class="w-full text-sm">
            <thead><tr class="text-left text-xs text-gray-500 dark:text-gray-400"><th class="py-2 pr-3 font-semibold">Who</th><th class="py-2 px-3 font-semibold text-right">Responses</th><th class="py-2 px-3 font-semibold text-right">Average rating</th><th class="py-2 pl-3 font-semibold text-right">Would recommend</th></tr></thead>
            <tbody class="divide-y divide-gray-100 dark:divide-gray-700">
              <tr v-for="r in data.roles" :key="r.role" class="cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700/40" @click="role = r.role">
                <td class="py-2 pr-3 font-medium text-gray-900 dark:text-white">{{ r.label }}</td>
                <td class="py-2 px-3 text-right tabular-nums">{{ r.responses }}</td>
                <td class="py-2 px-3 text-right tabular-nums">{{ r.average !== null ? `${r.average} / 5` : '-' }}</td>
                <td class="py-2 pl-3 text-right tabular-nums">{{ r.recommend !== null ? `${r.recommend}%` : '-' }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p v-if="data.other_roles.length" class="mt-3 text-xs text-gray-500 dark:text-gray-400">"Other" said: {{ data.other_roles.map(o => `${o.label} (${o.count})`).join(', ') }}</p>
      </section>

      <!-- Every question -->
      <div class="mt-5 grid lg:grid-cols-2 gap-5">
        <section v-for="q in data.questions" :key="q.key" :class="[SECTION, q.type === 'grid' ? 'lg:col-span-2' : '']">
          <h2 :class="H2">{{ q.text }}</h2>
          <p class="text-xs text-gray-500 dark:text-gray-400">{{ data.answered[q.key] }} answered{{ q.type === 'multi' ? ' · could tick more than one' : '' }}</p>

          <!-- Parts of Tusome: good / okay / poor per part, among those who used it -->
          <template v-if="q.type === 'grid'">
            <div class="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs text-gray-600 dark:text-gray-300">
              <span v-for="k in GRID_KEYS" :key="k" class="inline-flex items-center gap-1.5"><span class="w-3 h-3 rounded-sm" :class="GRID_FILL[k]"></span>{{ q.options[k] }}</span>
              <span class="text-gray-400">· sorted by how many said Poor</span>
            </div>
            <ul class="mt-3 space-y-2.5">
              <li v-for="row in gridRows(q)" :key="row.key" class="grid grid-cols-[8rem_1fr_auto] sm:grid-cols-[12rem_1fr_7rem] items-center gap-3">
                <span class="text-sm text-gray-800 dark:text-gray-100 truncate" :title="row.label">{{ row.label }}</span>
                <div v-if="row.used" class="flex h-3.5 gap-0.5" role="img" :aria-label="`${row.label}: ${row.parts.map(p => `${p.label} ${p.pct}%`).join(', ')}`">
                  <span v-for="p in row.parts" v-show="p.count" :key="p.key" class="h-full first:rounded-l last:rounded-r" :class="GRID_FILL[p.key]" :style="{ width: p.pct + '%' }" :title="`${p.label}: ${p.count} (${p.pct}%)`"></span>
                </div>
                <span v-else class="text-xs text-gray-400">Nobody has used it yet</span>
                <span class="text-xs text-gray-500 dark:text-gray-400 text-right tabular-nums">{{ row.used ? `${row.goodPct}% good · ${row.used}` : '' }}<span v-if="row.unused" class="block">{{ row.unused }} not used</span></span>
              </li>
            </ul>
          </template>

          <!-- Everything else: one bar per answer -->
          <ul v-else class="mt-3 space-y-2">
            <li v-for="b in bars(q)" :key="b.key" class="grid grid-cols-[minmax(0,9rem)_1fr_4.5rem] sm:grid-cols-[minmax(0,13rem)_1fr_5rem] items-center gap-3" :title="`${b.label}: ${b.count} (${b.pct}%)`">
              <span class="text-sm text-gray-800 dark:text-gray-100 truncate">{{ q.type === 'scale' ? `${b.key} · ` : '' }}{{ b.label }}</span>
              <div class="h-3 rounded bg-gray-100 dark:bg-gray-700/60">
                <div class="h-full rounded bg-indigo-600 dark:bg-indigo-400" :style="{ width: b.pct + '%' }"></div>
              </div>
              <span class="text-xs text-gray-600 dark:text-gray-300 text-right tabular-nums">{{ b.count }} · {{ b.pct }}%</span>
            </li>
          </ul>
        </section>
      </div>

      <!-- What people wrote -->
      <section :class="[SECTION, 'mt-5']">
        <h2 :class="H2">What people wrote</h2>
        <p v-if="!data.comments.length" class="mt-2 text-sm text-gray-500 dark:text-gray-400">No written comments for these filters.</p>
        <ul v-else class="mt-3 divide-y divide-gray-100 dark:divide-gray-700">
          <li v-for="(c, i) in data.comments" :key="i" class="py-3">
            <p class="text-sm text-gray-800 dark:text-gray-100 whitespace-pre-line">{{ c.comment }}</p>
            <p class="mt-1 text-xs text-gray-500 dark:text-gray-400">
              {{ c.role_other ? `Other: ${c.role_other}` : c.role }}<template v-if="c.level"> · {{ c.level }}</template><template v-if="c.overall"> · rated {{ c.overall }}/5</template> · {{ c.date }}
            </p>
          </li>
        </ul>
      </section>
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'
import axios from 'axios'
import PageHeader from '@/components/ui/PageHeader.vue'
import EmptyState from '@/components/ui/EmptyState.vue'
import Skeleton from '@/components/ui/Skeleton.vue'
import { useToastStore } from '@/stores/toast'

interface Question { key: string; type: 'single' | 'scale' | 'grid' | 'multi'; text: string; options: Record<string, string>; rows?: Record<string, string> }
interface Analysis {
  responses: number
  average: number | null
  recommend: number | null
  roles: { role: string; label: string; responses: number; average: number | null; recommend: number | null }[]
  role_options: Record<string, string>
  other_roles: { label: string; count: number }[]
  questions: Question[]
  totals: Record<string, any>
  answered: Record<string, number>
  comments: { role: string; role_other: string | null; level: string | null; overall: number | null; comment: string; date: string }[]
}

const SECTION = 'rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-4 sm:p-5'
const H2 = 'text-base font-semibold text-gray-900 dark:text-white'
// Good / okay / poor: an ordered scale - green, grey, red - always with a legend and the figures
const GRID_KEYS = ['good', 'okay', 'poor'] as const
const GRID_FILL: Record<string, string> = { good: 'bg-emerald-600 dark:bg-emerald-400', okay: 'bg-gray-300 dark:bg-gray-500', poor: 'bg-rose-500 dark:bg-rose-400' }

const toast = useToastStore()
const data = ref<Analysis | null>(null)
const loading = ref(true)
const role = ref('')
const days = ref('')

const roleChips = computed(() => [{ key: '', label: 'Everyone' }, ...Object.entries(data.value?.role_options ?? {}).map(([key, label]) => ({ key, label }))])

const tiles = computed(() => {
  const d = data.value!
  const blockers = d.totals.blockers ?? {}
  const top = Object.entries(blockers as Record<string, number>).filter(([k]) => k !== 'nothing').sort((a, b) => b[1] - a[1])[0]
  const blockerQ = d.questions.find(q => q.key === 'blockers')
  return [
    { label: 'Responses', value: String(d.responses), hint: role.value ? d.role_options[role.value] : 'everyone' },
    { label: 'Average rating', value: d.average !== null ? `${d.average} / 5` : '-', hint: 'Overall, how good is Tusome?' },
    { label: 'Would recommend', value: d.recommend !== null ? `${d.recommend}%` : '-', hint: 'answered Yes' },
    { label: 'Biggest obstacle', value: top && top[1] ? `${Math.round(top[1] / Math.max(1, d.answered.blockers) * 100)}%` : '-', hint: top && top[1] ? blockerQ?.options[top[0]] : 'none reported' }
  ]
})

const pctOf = (n: number, of: number) => (of ? Math.round(n / of * 100) : 0)
// Single and scale answers keep their own order (a scale reads in order); ticked lists rank by count
const bars = (q: Question) => {
  const counts: Record<string, number> = data.value?.totals[q.key] ?? {}
  const of = data.value?.answered[q.key] ?? 0
  const list = Object.entries(q.options).map(([key, label]) => ({ key, label, count: counts[key] ?? 0, pct: pctOf(counts[key] ?? 0, of) }))
  return q.type === 'multi' ? list.sort((a, b) => b.count - a.count) : list
}
const gridRows = (q: Question) => Object.entries(q.rows ?? {}).map(([key, label]) => {
  const c: Record<string, number> = data.value?.totals[q.key]?.[key] ?? {}
  const used = (c.good ?? 0) + (c.okay ?? 0) + (c.poor ?? 0)
  return {
    key, label, used, unused: c.unused ?? 0,
    goodPct: pctOf(c.good ?? 0, used),
    poorShare: used ? (c.poor ?? 0) / used : -1,
    parts: GRID_KEYS.map(k => ({ key: k, label: q.options[k], count: c[k] ?? 0, pct: pctOf(c[k] ?? 0, used) }))
  }
}).sort((a, b) => b.poorShare - a.poorShare)

const load = async () => {
  loading.value = true
  try {
    const res = await axios.get('/api/admin/feedback', { params: { role: role.value, days: days.value } })
    data.value = res.data.data
  } catch (err: any) {
    toast.error(err.response?.data?.message || 'Could not load feedback')
  } finally {
    loading.value = false
  }
}
watch([role, days], load)
onMounted(load)
</script>
