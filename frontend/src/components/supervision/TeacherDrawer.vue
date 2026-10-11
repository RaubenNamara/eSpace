<template>
  <!-- One teacher this term: every assessment they set, how many learners handed it in, what is
       still waiting to be marked (and for how long), and by name the learners who didn't hand in.
       "Send a reminder" notifies the teacher, already worded from what needs following up. -->
  <div class="fixed inset-0 z-50 flex justify-end bg-black/40" @click.self="emit('close')">
    <aside class="w-full max-w-xl h-full overflow-y-auto bg-white dark:bg-gray-800 shadow-2xl flex flex-col">
      <header class="sticky top-0 z-10 bg-white/95 dark:bg-gray-800/95 backdrop-blur border-b border-gray-200 dark:border-gray-700 px-5 py-4 flex items-start gap-3">
        <span class="w-11 h-11 flex-shrink-0 rounded-full bg-indigo-600 text-white flex items-center justify-center text-sm font-bold">{{ initials }}</span>
        <div class="flex-1 min-w-0">
          <h2 class="text-base font-bold text-gray-900 dark:text-white truncate">{{ niceName(name) }}</h2>
          <p class="text-xs text-gray-500 dark:text-gray-400 truncate">
            <template v-if="contact">{{ contact }}</template><template v-else>This term's work</template>
          </p>
        </div>
        <button type="button" class="p-1.5 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-gray-200" aria-label="Close" @click="emit('close')">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
        </button>
      </header>

      <!-- The figures -->
      <div v-if="teacher" class="px-5 pt-4 grid grid-cols-3 gap-2 text-center">
        <div class="rounded-xl bg-indigo-50 dark:bg-indigo-900/30 py-3">
          <p class="text-2xl font-extrabold tabular-nums text-indigo-700 dark:text-indigo-200">{{ teacher.set }}</p>
          <p class="text-[10px] font-semibold uppercase tracking-wide text-indigo-500 dark:text-indigo-300">Set this term</p>
        </div>
        <div class="rounded-xl py-3" :class="teacher.overdue ? 'bg-amber-50 dark:bg-amber-900/30' : 'bg-gray-50 dark:bg-gray-900/40'">
          <p class="text-2xl font-extrabold tabular-nums" :class="teacher.overdue ? 'text-amber-700 dark:text-amber-200' : 'text-gray-900 dark:text-white'">{{ teacher.waiting }}</p>
          <p class="text-[10px] font-semibold uppercase tracking-wide text-gray-400">To mark<template v-if="teacher.overdue"> · {{ teacher.overdue }} late</template></p>
        </div>
        <div class="rounded-xl bg-gray-50 dark:bg-gray-900/40 py-3">
          <p class="text-2xl font-extrabold tabular-nums text-gray-900 dark:text-white">{{ teacher.hand_in_rate === null ? '–' : `${teacher.hand_in_rate}%` }}</p>
          <p class="text-[10px] font-semibold uppercase tracking-wide text-gray-400">Handed in</p>
        </div>
      </div>

      <div v-if="teacher" class="px-5 pt-3 flex flex-wrap items-center gap-1.5">
        <span v-for="f in teacher.flags" :key="f" class="px-2 py-0.5 rounded-full text-[11px] font-bold" :class="FLAG[f].cls">{{ FLAG[f].label }}</span>
        <span v-if="!teacher.flags.length" class="px-2 py-0.5 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-200">On track</span>
        <button
          type="button"
          class="ml-auto inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-50"
          :disabled="sending"
          @click="remind"
        >
          <AppIcon name="chat" class="w-3.5 h-3.5" />{{ sending ? 'Sending…' : 'Send a reminder' }}
        </button>
      </div>

      <!-- Assessments -->
      <div class="px-5 py-4 flex-1">
        <h3 class="text-xs font-bold uppercase tracking-wide text-gray-500 dark:text-gray-400 mb-2">Assessments this term</h3>
        <div v-if="loading" class="space-y-2">
          <div v-for="i in 3" :key="i" class="h-24 rounded-xl bg-gray-100 dark:bg-gray-700/50 animate-pulse"></div>
        </div>
        <p v-else-if="!assessments.length" class="rounded-xl border border-dashed border-gray-300 dark:border-gray-600 p-5 text-sm text-center text-gray-500 dark:text-gray-400">
          No assessments published this term yet.
        </p>
        <div v-else class="space-y-2.5">
          <article v-for="a in assessments" :key="a.id" class="rounded-xl border border-gray-200 dark:border-gray-700 p-3.5">
            <div class="flex items-start gap-2">
              <span v-if="a.category" class="flex-shrink-0 mt-0.5 px-1.5 py-0.5 rounded text-[10px] font-bold bg-indigo-50 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-200">{{ a.category }}</span>
              <div class="min-w-0 flex-1">
                <p class="text-sm font-semibold text-gray-900 dark:text-white leading-snug">{{ a.title }}</p>
                <p class="text-xs text-gray-500 dark:text-gray-400">{{ a.subject }} · {{ a.class }} · {{ deadlineText(a) }}</p>
              </div>
            </div>

            <!-- handed in out of expected -->
            <div class="mt-2.5 h-2 rounded-full bg-gray-100 dark:bg-gray-700 overflow-hidden flex">
              <div class="h-full bg-emerald-500" :style="{ width: pct(a.marked, a.expected) }"></div>
              <div class="h-full bg-amber-400" :style="{ width: pct(a.waiting, a.expected) }"></div>
            </div>
            <div class="mt-1.5 flex flex-wrap gap-x-3 gap-y-0.5 text-[11px] text-gray-600 dark:text-gray-300">
              <span><b class="tabular-nums">{{ a.handed_in }}</b> of {{ a.expected }} handed in</span>
              <span v-if="a.marked" class="text-emerald-700 dark:text-emerald-300"><b class="tabular-nums">{{ a.marked }}</b> marked</span>
              <span v-if="a.waiting" :class="(a.waiting_days ?? 0) > markingDays ? 'text-amber-700 dark:text-amber-300 font-semibold' : ''">
                <b class="tabular-nums">{{ a.waiting }}</b> waiting to mark<template v-if="a.waiting_days !== null"> · oldest {{ a.waiting_days }}d</template>
              </span>
              <span v-if="a.not_yet" class="text-gray-400">{{ a.not_yet }} not in yet</span>
            </div>

            <button
              v-if="a.missing"
              type="button"
              class="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-rose-600 dark:text-rose-300 hover:underline"
              @click="toggleMissing(a.id)"
            >
              {{ a.missing }} didn't hand in
              <svg class="w-3.5 h-3.5 transition-transform" :class="{ 'rotate-180': openMissing === a.id }" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" /></svg>
            </button>
            <div v-if="openMissing === a.id" class="mt-2 rounded-lg bg-gray-50 dark:bg-gray-900/40 max-h-72 overflow-y-auto">
              <p v-if="missingLoading" class="p-3 text-xs text-gray-500">Loading…</p>
              <ul v-else class="divide-y divide-gray-200 dark:divide-gray-700">
                <li v-for="l in missing" :key="l.id" class="px-3 py-1.5 flex items-center gap-2 text-xs">
                  <span class="flex-1 min-w-0 truncate text-gray-900 dark:text-white">{{ niceName(l.name) }}</span>
                  <span v-if="l.started" class="px-1.5 py-0.5 rounded text-[10px] font-bold bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-200">Started</span>
                  <span class="text-gray-500 dark:text-gray-400 whitespace-nowrap">{{ l.class }} · {{ l.admission_number }}</span>
                </li>
              </ul>
            </div>
          </article>
        </div>
      </div>
    </aside>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import axios from 'axios'
import AppIcon from '@/components/common/AppIcon.vue'
import { niceName } from '@/components/dashboard/teacher/time'
import { useToastStore } from '@/stores/toast'
import { useConfirmStore } from '@/stores/confirm'
import { FLAG, type SupAssessment, type SupLearner, type SupTeacher } from './types'

const props = defineProps<{
  teacher: SupTeacher | null
  teacherId: number
  termId: number
  markingDays: number
}>()
const emit = defineEmits<{ close: [] }>()

const toast = useToastStore()
const confirmDialog = useConfirmStore()

const loading = ref(true)
const assessments = ref<SupAssessment[]>([])
const info = ref<{ name: string; email: string | null; phone: string | null } | null>(null)

const name = computed(() => props.teacher?.name || info.value?.name || '')
const initials = computed(() => name.value.split(/\s+/).filter(Boolean).slice(0, 2).map(w => w[0]).join('').toUpperCase())
const contact = computed(() => [info.value?.phone, info.value?.email].filter(Boolean).join(' · '))

onMounted(async () => {
  try {
    const res = await axios.get(`/api/admin/supervision/teachers/${props.teacherId}`, { params: { term_id: props.termId } })
    assessments.value = res.data.data.assessments
    info.value = res.data.data.teacher
  } catch (e: any) {
    toast.error(e.response?.data?.message || 'Could not load this teacher')
  } finally {
    loading.value = false
  }
})

const pct = (n: number, of: number) => `${of > 0 ? Math.min(100, (n * 100) / of) : 0}%`

const deadlineText = (a: SupAssessment) => {
  if (!a.deadline) return 'no deadline'
  const d = new Date(a.deadline.replace(' ', 'T')).toLocaleDateString(undefined, { day: 'numeric', month: 'short' })
  return a.closed ? `closed ${d}` : `open until ${d}`
}

// The learners who didn't hand an assessment in
const openMissing = ref(0)
const missing = ref<SupLearner[]>([])
const missingLoading = ref(false)
const toggleMissing = async (id: number) => {
  if (openMissing.value === id) { openMissing.value = 0; return }
  openMissing.value = id
  missing.value = []
  missingLoading.value = true
  try {
    const res = await axios.get(`/api/admin/supervision/assignments/${id}/missing`)
    if (openMissing.value === id) missing.value = res.data.data.learners
  } catch {
    toast.error('Could not load the learners')
  } finally {
    missingLoading.value = false
  }
}

// A reminder, already worded from what needs following up
const draftReminder = () => {
  const t = props.teacher
  const lines: string[] = []
  if (t?.flags.includes('none_set')) lines.push('No assessment has been set for your classes this term yet - please set one.')
  if (t && t.waiting) lines.push(`${t.waiting} script${t.waiting === 1 ? ' is' : 's are'} waiting to be marked${t.overdue ? `, ${t.overdue} for more than ${props.markingDays} days` : ''}.`)
  if (t && t.missing) lines.push(`${t.missing} learner hand-in${t.missing === 1 ? ' is' : 's are'} missing on closed assessments - please follow those learners up.`)
  return lines.join(' ') || 'Please check your Assessments page.'
}
const sending = ref(false)
const remind = async () => {
  const message = await confirmDialog.ask({
    title: `Remind ${niceName(name.value)}`,
    message: 'They get this as a notification (and on their phone, if they turned that on).',
    value: draftReminder(),
    multiline: true,
    confirmLabel: 'Send'
  })
  if (!message) return
  sending.value = true
  try {
    await axios.post(`/api/admin/supervision/teachers/${props.teacherId}/remind`, { message })
    toast.success('Reminder sent')
  } catch (e: any) {
    toast.error(e.response?.data?.message || 'Could not send the reminder')
  } finally {
    sending.value = false
  }
}
</script>
