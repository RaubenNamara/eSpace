<template>
  <!-- A parent's private weekly update on their child, opened from the link the school sent
       (/parent/{token}) - no login. Read-only: this week's reading and work, results that came
       back, outcomes achieved so far, and what is due next. -->
  <div class="site-plain min-h-screen bg-cream-100 font-sans text-slate-900 antialiased dark:bg-slate-950 dark:text-white">
    <header class="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-white/10">
      <div class="mx-auto max-w-3xl px-4 py-3 flex items-center gap-3">
        <Wordmark size="sm" />
        <span class="flex-1"></span>
        <span v-if="data?.school.name" class="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 dark:text-slate-300 min-w-0">
          <img v-if="data.school.logo && !logoFailed" :src="resolveAssetUrl(data.school.logo)" alt="" class="w-7 h-7 rounded-lg object-contain bg-white" @error="logoFailed = true">
          <span class="truncate capitalize">{{ data.school.name }}</span>
        </span>
      </div>
    </header>

    <main class="mx-auto max-w-3xl px-4 py-6 sm:py-10">
      <div v-if="loading" class="py-24 text-center text-slate-400">Loading the update…</div>

      <div v-else-if="error" class="py-16 text-center">
        <span class="mx-auto w-14 h-14 rounded-2xl bg-slate-200 dark:bg-white/10 flex items-center justify-center text-slate-500"><AppIcon name="warning" class="w-7 h-7" /></span>
        <h1 class="font-heading mt-4 text-xl font-bold">This link isn't working</h1>
        <p class="mt-2 text-slate-600 dark:text-slate-400 max-w-sm mx-auto">{{ error }}</p>
      </div>

      <template v-else-if="data">
        <p class="text-sm text-slate-500 dark:text-slate-400">Weekly update · {{ range }}</p>
        <h1 class="mt-1 font-heading text-3xl sm:text-4xl font-extrabold tracking-tight">{{ first }}'s week</h1>
        <p class="mt-2 text-slate-600 dark:text-slate-300">Hello {{ data.guardian_name }}. Here is how {{ first }}<template v-if="data.student.class_label"> ({{ data.student.class_label }})</template> got on in the last seven days.</p>

        <!-- The week in numbers -->
        <div class="mt-6 grid grid-cols-2 sm:grid-cols-3 gap-3">
          <div v-for="t in tiles" :key="t.label" class="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 p-4">
            <AppIcon :name="t.icon" class="w-5 h-5 text-indigo-600 dark:text-indigo-300" />
            <p class="mt-2 font-jakarta text-2xl font-extrabold tabular-nums">{{ t.value }}</p>
            <p class="text-xs text-slate-500 dark:text-slate-400">{{ t.label }}</p>
          </div>
        </div>

        <!-- One thing to do at home this week, from the numbers above -->
        <section v-if="tip" class="mt-4 rounded-2xl border border-amber-200 bg-amber-50 dark:border-amber-500/30 dark:bg-amber-500/10 p-4 flex gap-3">
          <AppIcon name="bulb" class="w-5 h-5 flex-shrink-0 text-amber-600 dark:text-amber-300" />
          <p class="text-sm text-slate-800 dark:text-slate-100"><b>How you can help this week.</b> {{ tip }}</p>
        </section>

        <!-- Outcomes -->
        <section class="mt-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 p-5">
          <h2 class="font-heading font-bold">Learning outcomes this year</h2>
          <template v-if="data.outcomes.assessed">
            <div class="mt-3 flex items-center gap-4">
              <div class="flex-1 h-3 rounded-full bg-slate-100 dark:bg-white/10 overflow-hidden"><div class="h-full rounded-full bg-emerald-500" :style="{ width: `${outcomePct}%` }"></div></div>
              <span class="font-jakarta font-bold tabular-nums">{{ outcomePct }}%</span>
            </div>
            <p class="mt-2 text-sm text-slate-600 dark:text-slate-400">{{ data.outcomes.achieved }} of {{ data.outcomes.assessed }} outcomes achieved so far<template v-if="data.outcomes.average !== null"> · average {{ Math.round(data.outcomes.average) }}%</template>. An outcome counts as achieved at 60% or more.</p>
          </template>
          <p v-else class="mt-2 text-sm text-slate-600 dark:text-slate-400">No outcomes have been assessed yet this year.</p>
        </section>

        <!-- Results -->
        <section class="mt-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 p-5">
          <h2 class="font-heading font-bold">Results this week</h2>
          <ul v-if="data.results.length" class="mt-3 divide-y divide-slate-100 dark:divide-white/10">
            <li v-for="r in data.results" :key="r.title + r.date" class="py-2.5 flex items-center gap-3">
              <span class="flex-1 min-w-0">
                <span class="block text-sm font-semibold truncate">{{ r.title }}</span>
                <span class="block text-xs text-slate-500">{{ [r.category, r.subject].filter(Boolean).join(' · ') }}</span>
              </span>
              <span class="px-2.5 py-1 rounded-lg text-sm font-bold tabular-nums" :class="r.percentage >= 60 ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300' : 'bg-amber-50 text-amber-700 dark:bg-amber-500/15 dark:text-amber-300'">{{ r.percentage }}%</span>
            </li>
          </ul>
          <p v-else class="mt-2 text-sm text-slate-600 dark:text-slate-400">No marked work came back this week.</p>
        </section>

        <!-- Missed -->
        <section v-if="data.missed?.length" class="mt-4 rounded-2xl bg-white dark:bg-slate-900 border border-amber-300 dark:border-amber-500/40 p-5">
          <h2 class="font-heading font-bold">Not handed in this week</h2>
          <p class="text-xs text-slate-500 dark:text-slate-400">The deadline passed and no work came in. It may still be worth asking the teacher whether it can be handed in late.</p>
          <ul class="mt-3 space-y-2">
            <li v-for="d in data.missed" :key="d.title + d.due" class="flex items-center gap-3 text-sm">
              <span class="w-14 flex-shrink-0 text-center rounded-lg bg-amber-100 text-amber-900 dark:bg-amber-500/20 dark:text-amber-200 py-1 text-xs font-bold">{{ shortDay(d.due) }}</span>
              <span class="flex-1 min-w-0"><b>{{ d.title }}</b><span class="text-slate-500"> · {{ d.subject }}</span></span>
            </li>
          </ul>
        </section>

        <!-- Coming up -->
        <section class="mt-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 p-5">
          <h2 class="font-heading font-bold">Due in the next seven days</h2>
          <ul v-if="data.due.length" class="mt-3 space-y-2">
            <li v-for="d in data.due" :key="d.title + d.due" class="flex items-center gap-3 text-sm">
              <span class="w-14 flex-shrink-0 text-center rounded-lg bg-slate-100 dark:bg-white/10 py-1 text-xs font-bold">{{ shortDay(d.due) }}</span>
              <span class="flex-1 min-w-0"><b>{{ d.title }}</b><span class="text-slate-500"> · {{ d.subject }}</span></span>
            </li>
          </ul>
          <p v-else class="mt-2 text-sm text-slate-600 dark:text-slate-400">Nothing due - or it's all handed in already.</p>
        </section>

        <!-- Report card, when the school shares it with parents -->
        <section v-if="data.report_terms?.length" class="mt-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 p-5">
          <h2 class="font-heading font-bold">Report card</h2>
          <p class="text-xs text-slate-500 dark:text-slate-400">The school's report for the term. Until the school finalises it, it fills in as marked work comes back.</p>
          <div class="mt-3 flex flex-wrap gap-2">
            <button v-for="t in data.report_terms" :key="t.id" type="button" class="px-3 py-1.5 rounded-xl text-sm font-semibold border transition"
              :class="cardTerm === t.id ? 'bg-indigo-600 border-indigo-600 text-white' : 'border-slate-300 dark:border-white/20 hover:bg-slate-50 dark:hover:bg-white/5'" @click="openCard(t.id)">
              {{ t.name }}{{ t.academic_year ? ` ${t.academic_year}` : '' }}
            </button>
          </div>
          <p v-if="cardLoading" class="mt-4 text-sm text-slate-400">Opening the report card…</p>
          <p v-else-if="cardError" class="mt-4 text-sm text-rose-600">{{ cardError }}</p>
          <div v-else-if="card" class="mt-4">
            <div class="flex justify-end mb-2">
              <button type="button" class="px-3 py-1.5 rounded-lg bg-indigo-600 text-white text-xs font-semibold disabled:opacity-50" :disabled="cardDownloading" @click="downloadCard">{{ cardDownloading ? 'Preparing…' : 'Download PDF' }}</button>
            </div>
            <div class="-mx-3 sm:mx-0"><ReportCard ref="cardRef" :report="card" /></div>
          </div>
        </section>

        <p class="mt-8 text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
          This private page is for {{ first }}'s parent or guardian - please don't share it. It updates every day.
          <template v-if="data.student.last_active_at"> {{ first }} last used Tusome {{ timeAgo(data.student.last_active_at) }}.</template>
          Questions? Please contact the school.
        </p>
      </template>
    </main>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'
import Wordmark from '@/components/brand/Wordmark.vue'
import AppIcon from '@/components/common/AppIcon.vue'
import { resolveAssetUrl } from '@/utils/url'
import { timeAgo } from '@/components/dashboard/teacher/time'
import ReportCard from '@/components/reportcard/ReportCard.vue'
import type { ReportCard as ReportCardType } from '@/types/reportCard'
import { downloadElementAsPdf, sanitizeFilename } from '@/utils/reportCardPdf'

interface ParentData {
  student: { first_name: string; name: string; class_label: string | null; last_active_at: string | null }
  school: { name: string | null; logo: string | null }
  week: { from: string; to: string; topics_read: number; topics_finished: number; reading_minutes: number; handed_in: number; revision_days: number; days_active?: number; live_classes?: number }
  results: { title: string; category: string | null; subject: string; percentage: number; date: string }[]
  outcomes: { achieved: number; assessed: number; average: number | null }
  due: { title: string; category: string | null; subject: string; due: string }[]
  missed?: { title: string; category: string | null; subject: string; due: string }[]
  report_terms?: { id: number; name: string; academic_year: string | null; is_current: boolean }[]
  guardian_name: string
}

const route = useRoute()
const data = ref<ParentData | null>(null)
const loading = ref(true)
const error = ref('')
const logoFailed = ref(false)

const first = computed(() => {
  const n = data.value?.student.first_name ?? ''
  return n.charAt(0).toUpperCase() + n.slice(1).toLowerCase()
})
const fmt = (d: string) => new Date(`${d}T12:00:00`).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })
const range = computed(() => (data.value ? `${fmt(data.value.week.from)} - ${fmt(data.value.week.to)}` : ''))
const shortDay = (d: string) => new Date(d.replace(' ', 'T')).toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric' })
const outcomePct = computed(() => {
  const o = data.value?.outcomes
  return o && o.assessed ? Math.round((o.achieved / o.assessed) * 100) : 0
})
const tiles = computed(() => {
  const w = data.value?.week
  if (!w) return []
  return [
    { label: 'days on Tusome', value: `${w.days_active ?? 0}/7`, icon: 'clock' },
    { label: 'topics read', value: w.topics_read, icon: 'book' },
    { label: 'topics finished', value: w.topics_finished, icon: 'check-circle' },
    { label: 'pieces of work handed in', value: w.handed_in, icon: 'send' },
    { label: 'live classes joined', value: w.live_classes ?? 0, icon: 'video' },
    { label: 'days of revision', value: `${w.revision_days}/7`, icon: 'flame' }
  ]
})

// One plain suggestion, from the week's numbers - the most useful thing first
const tip = computed(() => {
  const d = data.value
  if (!d) return ''
  const w = d.week
  const name = first.value
  if (d.missed?.length) return `Ask ${name} about ${d.missed[0].title} (${d.missed[0].subject}) - it wasn't handed in. A short chat about what got in the way helps more than a telling-off.`
  if (!(w.days_active ?? 0)) return `${name} didn't sign in to Tusome this week. Agree on a time each evening, even 20 minutes, to read one eNote topic.`
  if (d.due.length) return `${d.due.length} piece${d.due.length === 1 ? '' : 's'} of work ${d.due.length === 1 ? 'is' : 'are'} due in the next seven days. Ask ${name} which one comes first and when they plan to do it.`
  if (!w.topics_read) return `Ask ${name} to show you one eNote topic and explain it to you - teaching it back is one of the best ways to learn.`
  if (w.revision_days < 3) return `${name} revised on ${w.revision_days} day${w.revision_days === 1 ? '' : 's'}. Daily Revision takes about five minutes - a few days a week makes a real difference.`
  return `${name} is keeping up well. Tell them you noticed - praise for effort keeps it going.`
})

// The demo school's parent page names its school (?school=demo); a real link never does
const schoolParam = () => (route.query.school ? { school: String(route.query.school) } : {})

// The report card, opened term by term
const card = ref<ReportCardType | null>(null)
const cardTerm = ref(0)
const cardLoading = ref(false)
const cardError = ref('')
const cardDownloading = ref(false)
const cardRef = ref<InstanceType<typeof ReportCard> | null>(null)
const openCard = async (termId: number) => {
  cardTerm.value = termId
  cardLoading.value = true
  cardError.value = ''
  try {
    const res = await axios.get(`/api/parent/${encodeURIComponent(String(route.params.token))}/report-card/${termId}`, { params: schoolParam() })
    card.value = res.data.data
  } catch (err: any) {
    card.value = null
    cardError.value = err.response?.data?.message || 'Could not open the report card.'
  } finally {
    cardLoading.value = false
  }
}
const downloadCard = async () => {
  if (!cardRef.value?.rootEl || !card.value) return
  cardDownloading.value = true
  try {
    const r = card.value
    await downloadElementAsPdf(cardRef.value.rootEl, `${sanitizeFilename(`${r.student.first_name}_${r.student.last_name}_${r.term.name}`)}_ReportCard.pdf`)
  } finally {
    cardDownloading.value = false
  }
}

onMounted(async () => {
  document.title = 'Weekly update - Tusome'
  let meta = document.head.querySelector<HTMLMetaElement>('meta[name="robots"]')
  if (!meta) { meta = document.createElement('meta'); meta.name = 'robots'; document.head.appendChild(meta) }
  meta.content = 'noindex, nofollow'
  try {
    const res = await axios.get(`/api/parent/${encodeURIComponent(String(route.params.token))}`, { params: schoolParam() })
    data.value = res.data.data
  } catch (err: any) {
    error.value = err.response?.data?.message || 'Ask the school for a new link.'
  } finally {
    loading.value = false
  }
})
</script>
