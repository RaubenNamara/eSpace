<template>
  <!-- Report cards of the learners a teacher teaches, and of their whole class if they are a class
       teacher - only when the school has opened report cards to teachers. The class teacher writes
       the class teacher's comment here. -->
  <div class="w-full">
    <PageHeader title="Report cards" description="Every learner you teach, term by term. Cards fill in as marks are returned; the school finalises them." icon="document" accent="indigo">
      <template #actions>
        <select v-if="terms.length" v-model.number="termId" class="py-2 pl-3 pr-8 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm text-gray-900 dark:text-white" aria-label="Term">
          <option v-for="t in terms" :key="t.id" :value="t.id">{{ t.name }}{{ t.academic_year ? ` · ${t.academic_year}` : '' }}{{ Number(t.is_current) ? ' (current)' : '' }}</option>
        </select>
      </template>
    </PageHeader>

    <div v-if="closed" class="rounded-2xl border border-dashed border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 p-10 text-center">
      <p class="font-semibold text-gray-900 dark:text-white">Report cards aren't open to teachers yet</p>
      <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">The school's super admin opens them from Reports.</p>
    </div>

    <template v-else>
      <div class="flex flex-wrap items-center gap-2 mb-3">
        <select v-model="classFilter" class="py-2 pl-3 pr-8 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm text-gray-900 dark:text-white" aria-label="Class">
          <option value="">All my classes ({{ learners.length }})</option>
          <option v-for="c in classes" :key="c.label" :value="c.label">{{ c.label }}{{ c.mine ? ' · my class' : '' }} ({{ c.count }})</option>
        </select>
        <input v-model="search" type="text" placeholder="Search a learner…" class="flex-1 min-w-[12rem] py-2 px-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm text-gray-900 dark:text-white">
      </div>

      <div v-if="loading" class="space-y-2"><div v-for="i in 6" :key="i" class="h-12 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 animate-pulse"></div></div>
      <p v-else-if="error" class="rounded-xl bg-rose-50 dark:bg-rose-900/20 text-rose-700 dark:text-rose-300 text-sm p-4">{{ error }}</p>
      <div v-else class="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 divide-y divide-gray-100 dark:divide-gray-700/60 overflow-hidden">
        <button v-for="l in shown" :key="l.id" type="button" class="w-full flex items-center gap-3 px-4 py-2.5 text-left hover:bg-indigo-50/60 dark:hover:bg-indigo-950/30" @click="open(l.id)">
          <span class="flex-1 min-w-0">
            <span class="block text-sm font-semibold text-gray-900 dark:text-white truncate">{{ l.name }}</span>
            <span class="block text-xs text-gray-500 dark:text-gray-400">{{ l.admission_number }} · {{ l.class_label }}</span>
          </span>
          <span class="flex-shrink-0 px-2 py-0.5 rounded-full text-[11px] font-semibold" :class="l.made ? 'bg-indigo-50 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-200' : 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300'">{{ l.made ? 'Finalised' : 'Provisional' }}</span>
        </button>
        <p v-if="!shown.length" class="px-4 py-10 text-center text-sm text-gray-500">{{ learners.length ? 'No learner matches.' : 'You have no learners enrolled with you yet.' }}</p>
      </div>
    </template>

    <!-- The card -->
    <div v-if="active" class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-start justify-center z-50 p-2 sm:p-4 overflow-y-auto" @click.self="active = null">
      <div class="max-w-5xl w-full my-4 sm:my-8">
        <div class="sticky top-0 z-20 flex justify-end mb-2 gap-2 bg-black/40 backdrop-blur-sm rounded-lg p-2">
          <button :disabled="downloading" class="px-3 py-1.5 text-xs font-medium rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-50" @click="download">{{ downloading ? 'Preparing PDF…' : 'Download PDF' }}</button>
          <button class="px-3 py-1.5 text-xs font-medium rounded-lg bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 border border-gray-300 dark:border-gray-600" @click="active = null">Close</button>
        </div>
        <ReportCard ref="cardRef" :report="active" :editable-class-teacher-comment="!!active.can_comment" @save-class-teacher-comment="saveComment" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'
import axios from 'axios'
import PageHeader from '@/components/ui/PageHeader.vue'
import ReportCard from '@/components/reportcard/ReportCard.vue'
import type { ReportCard as ReportCardType } from '@/types/reportCard'
import { downloadElementAsPdf, sanitizeFilename } from '@/utils/reportCardPdf'
import { useToastStore } from '@/stores/toast'

interface Learner { id: number; name: string; admission_number: string; class_label: string; my_class: boolean; made: boolean }

const toast = useToastStore()
const terms = ref<{ id: number; name: string; academic_year: string | null; is_current: number | boolean }[]>([])
const termId = ref(0)
const learners = ref<Learner[]>([])
const loading = ref(true)
const closed = ref(false)
const error = ref('')
const classFilter = ref('')
const search = ref('')
const active = ref<ReportCardType | null>(null)
const cardRef = ref<InstanceType<typeof ReportCard> | null>(null)
const downloading = ref(false)

const classes = computed(() => {
  const by = new Map<string, { label: string; mine: boolean; count: number }>()
  for (const l of learners.value) {
    const c = by.get(l.class_label) ?? { label: l.class_label, mine: l.my_class, count: 0 }
    c.count++
    by.set(l.class_label, c)
  }
  return [...by.values()].sort((a, b) => Number(b.mine) - Number(a.mine) || a.label.localeCompare(b.label, undefined, { numeric: true }))
})
const shown = computed(() => {
  const q = search.value.trim().toLowerCase()
  return learners.value.filter(l => (!classFilter.value || l.class_label === classFilter.value)
    && (!q || `${l.name} ${l.admission_number}`.toLowerCase().includes(q)))
})

const load = async () => {
  loading.value = true
  error.value = ''
  try {
    const res = await axios.get('/api/teacher/report-cards/learners', { params: termId.value ? { term_id: termId.value } : {} })
    const d = res.data.data
    terms.value = d.terms
    learners.value = d.learners
    if (termId.value !== d.term_id) termId.value = d.term_id
  } catch (err: any) {
    if (err.response?.status === 403) closed.value = true
    else error.value = err.response?.data?.message || 'Could not load your learners'
  } finally {
    loading.value = false
  }
}

const open = async (studentId: number) => {
  try {
    const res = await axios.get(`/api/teacher/report-cards/${studentId}/${termId.value}`)
    active.value = res.data.data
  } catch (err: any) {
    toast.error(err.response?.data?.message || 'Could not open the report card')
  }
}

const saveComment = async (comment: string) => {
  if (!active.value) return
  try {
    await axios.put(`/api/teacher/report-cards/${active.value.student.id}/${termId.value}/class-teacher-comment`, { comment })
    active.value.class_teacher_comment = comment
    toast.success('Comment saved')
  } catch (err: any) {
    toast.error(err.response?.data?.message || 'Could not save the comment')
  }
}

const download = async () => {
  if (!cardRef.value?.rootEl || !active.value) return
  downloading.value = true
  try {
    const r = active.value
    await downloadElementAsPdf(cardRef.value.rootEl, `${sanitizeFilename(`${r.student.first_name}_${r.student.last_name}_${r.term.name}`)}_ReportCard.pdf`)
  } finally {
    downloading.value = false
  }
}

const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') active.value = null }
watch(termId, (id, old) => { if (old && id !== old) load() })
onMounted(() => { window.addEventListener('keydown', onKey); load() })
onUnmounted(() => window.removeEventListener('keydown', onKey))
</script>
