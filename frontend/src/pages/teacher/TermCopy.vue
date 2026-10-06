<template>
  <!-- Starting a term from one already taught: pick the term to copy from and the one to copy
       into, choose the assessments, and they come across as drafts with their dates moved; the
       scheme of work's topic weeks can move across too. -->
  <div class="w-full max-w-4xl">
    <PageHeader title="Copy a past term" description="Reuse a term you've already taught - assessments come across as drafts with dates moved, and your scheme of work's weeks can move too." icon="clock" accent="indigo" />

    <section class="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-4 sm:p-5 mb-4">
      <div class="grid sm:grid-cols-[1fr_auto_1fr] gap-3 items-end">
        <label class="block">
          <span class="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1">Copy from</span>
          <select v-model.number="fromTerm" class="w-full py-2 pl-3 pr-8 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-sm text-gray-900 dark:text-white">
            <option :value="0">Choose a term…</option>
            <option v-for="t in terms" :key="t.id" :value="t.id">{{ termLabel(t) }}</option>
          </select>
        </label>
        <span class="hidden sm:block pb-2 text-gray-400">→</span>
        <label class="block">
          <span class="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1">Into</span>
          <select v-model.number="toTerm" class="w-full py-2 pl-3 pr-8 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-sm text-gray-900 dark:text-white">
            <option :value="0">Choose a term…</option>
            <option v-for="t in terms" :key="t.id" :value="t.id" :disabled="t.id === fromTerm">{{ termLabel(t) }}</option>
          </select>
        </label>
      </div>
      <p v-if="gapDays !== null" class="mt-2 text-xs text-gray-500 dark:text-gray-400">
        Dates move {{ Math.abs(gapDays) }} days {{ gapDays >= 0 ? 'later' : 'earlier' }} - kept inside the new term.
      </p>
    </section>

    <section v-if="fromTerm" class="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-4 sm:p-5 mb-4">
      <div class="flex items-center gap-2 mb-3">
        <h2 class="text-sm font-bold text-gray-900 dark:text-white">Assessments from {{ termById(fromTerm)?.name }}</h2>
        <label v-if="assessments.length" class="ml-auto inline-flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400 cursor-pointer">
          <input type="checkbox" class="w-4 h-4 rounded border-gray-300 text-indigo-600" :checked="picked.size === assessments.length" @change="toggleAll"> All
        </label>
      </div>
      <div v-if="loadingPreview" class="space-y-2"><div v-for="i in 3" :key="i" class="h-12 rounded-xl bg-gray-100 dark:bg-gray-700/50 animate-pulse"></div></div>
      <p v-else-if="!assessments.length" class="text-sm text-gray-500 dark:text-gray-400">You set no assessments in that term.</p>
      <ul v-else class="space-y-1.5">
        <li v-for="a in assessments" :key="a.id">
          <label class="flex items-center gap-3 rounded-xl border px-3 py-2 cursor-pointer" :class="picked.has(a.id) ? 'border-indigo-300 bg-indigo-50/60 dark:border-indigo-700 dark:bg-indigo-900/20' : 'border-gray-200 dark:border-gray-700'">
            <input type="checkbox" class="w-4 h-4 rounded border-gray-300 text-indigo-600" :checked="picked.has(a.id)" @change="toggle(a.id)">
            <span class="min-w-0 flex-1">
              <span class="block text-sm font-semibold text-gray-900 dark:text-white truncate">{{ a.title }}</span>
              <span class="block text-xs text-gray-500 dark:text-gray-400 truncate">{{ [a.subject, a.class, a.category, `${a.questions} question${a.questions === 1 ? '' : 's'}`].filter(Boolean).join(' · ') }}</span>
            </span>
          </label>
        </li>
      </ul>

      <label v-if="schemeTopics" class="mt-4 flex items-start gap-3 rounded-xl bg-gray-50 dark:bg-gray-900/40 px-3 py-2.5 cursor-pointer">
        <input v-model="moveScheme" type="checkbox" class="mt-0.5 w-4 h-4 rounded border-gray-300 text-indigo-600">
        <span class="text-sm text-gray-700 dark:text-gray-200">
          Also move my scheme of work - {{ schemeTopics }} topic{{ schemeTopics === 1 ? '' : 's' }} planned in that term move to the same weeks of the new term, unticked.
        </span>
      </label>
    </section>

    <div class="flex flex-wrap items-center gap-3">
      <button type="button" class="btn-primary" :disabled="!canCopy || copying" @click="copy">{{ copying ? 'Copying…' : copyLabel }}</button>
      <p class="text-xs text-gray-500 dark:text-gray-400">Copies are drafts - check the class and dates, then publish when ready.</p>
    </div>

    <div v-if="result" class="mt-4 rounded-2xl border border-emerald-200 dark:border-emerald-800 bg-emerald-50 dark:bg-emerald-900/20 p-4 text-sm text-emerald-900 dark:text-emerald-100">
      Copied {{ result.copied }} assessment{{ result.copied === 1 ? '' : 's' }} as drafts<template v-if="result.scheme_moved"> and moved {{ result.scheme_moved }} scheme topic{{ result.scheme_moved === 1 ? '' : 's' }}</template>.
      <RouterLink to="/teacher/assignments" class="ml-1 font-semibold underline">Open Assessments</RouterLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import axios from 'axios'
import PageHeader from '@/components/ui/PageHeader.vue'
import { useToastStore } from '@/stores/toast'

interface TermItem { id: number; name: string; year: string | null; start_date: string; end_date: string; is_current: boolean }
interface Assessment { id: number; title: string; status: string; category: string | null; class: string; subject: string | null; questions: number }

const toast = useToastStore()
const terms = ref<TermItem[]>([])
const fromTerm = ref(0)
const toTerm = ref(0)
const assessments = ref<Assessment[]>([])
const schemeTopics = ref(0)
const picked = ref(new Set<number>())
const moveScheme = ref(true)
const loadingPreview = ref(false)
const copying = ref(false)
const result = ref<{ copied: number; scheme_moved: number } | null>(null)

const termById = (id: number) => terms.value.find(t => t.id === id)
const termLabel = (t: TermItem) => `${t.name}${t.year ? ` · ${t.year}` : ''}${t.is_current ? ' (current)' : ''}`
const gapDays = computed(() => {
  const a = termById(fromTerm.value)
  const b = termById(toTerm.value)
  return a && b ? Math.round((Date.parse(b.start_date) - Date.parse(a.start_date)) / 86400000) : null
})
const canCopy = computed(() => !!fromTerm.value && !!toTerm.value && fromTerm.value !== toTerm.value && (picked.value.size > 0 || (moveScheme.value && schemeTopics.value > 0)))
const copyLabel = computed(() => {
  const n = picked.value.size
  const parts = [n ? `${n} assessment${n === 1 ? '' : 's'}` : '', moveScheme.value && schemeTopics.value ? 'scheme weeks' : ''].filter(Boolean)
  return parts.length ? `Copy ${parts.join(' and ')}` : 'Copy'
})

const toggle = (id: number) => {
  const s = new Set(picked.value)
  if (s.has(id)) s.delete(id)
  else s.add(id)
  picked.value = s
}
const toggleAll = () => {
  picked.value = picked.value.size === assessments.value.length ? new Set() : new Set(assessments.value.map(a => a.id))
}

const loadPreview = async () => {
  result.value = null
  if (!fromTerm.value) { assessments.value = []; schemeTopics.value = 0; return }
  loadingPreview.value = true
  try {
    const res = await axios.get('/api/teacher/term-copy', { params: { from_term: fromTerm.value } })
    assessments.value = res.data.data.assessments || []
    schemeTopics.value = res.data.data.scheme_topics || 0
    picked.value = new Set(assessments.value.map(a => a.id))
  } catch (err: any) {
    toast.error(err.response?.data?.message || 'Could not load that term')
  } finally {
    loadingPreview.value = false
  }
}

const copy = async () => {
  copying.value = true
  try {
    const res = await axios.post('/api/teacher/term-copy', {
      from_term: fromTerm.value,
      to_term: toTerm.value,
      assignment_ids: [...picked.value],
      scheme: moveScheme.value && schemeTopics.value > 0
    })
    result.value = res.data.data
    toast.success('Copied')
  } catch (err: any) {
    toast.error(err.response?.data?.message || 'The copy did not go through - nothing was changed')
  } finally {
    copying.value = false
  }
}

watch(fromTerm, loadPreview)

onMounted(async () => {
  try {
    const res = await axios.get('/api/teacher/term-copy')
    terms.value = res.data.data.terms || []
    // Sensible start: copy from the term before the current one, into the current one
    const current = terms.value.find(t => t.is_current)
    if (current) {
      toTerm.value = current.id
      const earlier = terms.value.filter(t => t.start_date < current.start_date)
      if (earlier.length) fromTerm.value = earlier[0].id
    }
  } catch (err: any) {
    toast.error(err.response?.data?.message || 'Could not load the terms')
  }
})
</script>
