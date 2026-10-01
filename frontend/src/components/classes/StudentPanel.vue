<template>
  <!-- A student at a glance, from their class page: their figures, and what the teacher can do -
       their "What I can do" report, a message, or de-enrolling them. A side panel on wide
       screens, a bottom sheet on a phone. -->
  <Teleport to="body">
    <div class="fixed inset-0 z-50 flex items-end sm:items-stretch sm:justify-end bg-black/40" @click.self="$emit('close')">
      <aside class="w-full sm:w-96 max-h-[88vh] sm:max-h-none overflow-y-auto bg-white dark:bg-gray-800 rounded-t-2xl sm:rounded-none shadow-2xl p-5">
        <div class="flex items-start gap-3">
          <span class="w-14 h-14 rounded-2xl text-lg font-extrabold flex items-center justify-center flex-shrink-0" :class="student.gender === 'female' ? 'bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-200' : 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-200'">{{ initials(student.name) }}</span>
          <div class="min-w-0 flex-1">
            <p class="text-lg font-bold text-gray-900 dark:text-white leading-tight">{{ niceName(student.name) }}</p>
            <p class="text-xs text-gray-500 dark:text-gray-400">{{ className }} · {{ student.admission_number }} · <span class="capitalize">{{ student.gender }}</span></p>
          </div>
          <button type="button" class="p-1.5 rounded-lg text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700" aria-label="Close" @click="$emit('close')">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>
        </div>

        <div class="mt-5 grid grid-cols-2 gap-2">
          <div v-for="f in facts" :key="f.label" class="rounded-xl bg-gray-50 dark:bg-gray-700/50 p-3">
            <p class="text-[10px] font-bold uppercase tracking-wider text-gray-400">{{ f.label }}</p>
            <p class="text-lg font-bold" :class="f.tone">{{ f.value }}</p>
          </div>
        </div>

        <div class="mt-5 space-y-2">
          <button type="button" class="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700" @click="$emit('report')">
            <AppIcon name="document" class="w-5 h-5" /> "What I can do" report
          </button>
          <RouterLink :to="`/teacher/chat?student=${student.student_id}`" class="w-full flex items-center gap-3 px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 text-sm font-semibold text-gray-800 dark:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-700">
            <AppIcon name="chat" class="w-5 h-5" /> Message {{ niceName(student.name).split(' ')[0] }}
          </RouterLink>
          <button type="button" class="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-rose-600 hover:bg-rose-50 dark:text-rose-300 dark:hover:bg-rose-900/20" @click="$emit('de-enroll')">
            <AppIcon name="trash" class="w-5 h-5" /> De-enroll from your account
          </button>
        </div>
      </aside>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import AppIcon from '@/components/common/AppIcon.vue'
import { initials, niceName, timeAgo } from '@/components/dashboard/teacher/time'

export interface ClassStudent {
  enrollment_id: number
  student_id: number
  name: string
  admission_number: string
  gender: string
  average: number | null
  outcomes_achieved: number
  outcomes_assessed: number
  submissions: number
  improvement: number | null
  last_active: string | null
}

const props = defineProps<{ student: ClassStudent; className: string }>()
defineEmits<{ close: []; report: []; 'de-enroll': [] }>()

const facts = computed(() => {
  const s = props.student
  return [
    { label: 'Average', value: s.average === null ? '–' : `${s.average}%`, tone: s.average === null ? 'text-gray-400' : s.average >= 60 ? 'text-emerald-600 dark:text-emerald-300' : s.average >= 50 ? 'text-amber-600 dark:text-amber-300' : 'text-rose-600 dark:text-rose-300' },
    { label: 'Outcomes achieved', value: s.outcomes_assessed ? `${s.outcomes_achieved}/${s.outcomes_assessed}` : '–', tone: 'text-gray-900 dark:text-white' },
    { label: 'Submissions', value: String(s.submissions), tone: 'text-gray-900 dark:text-white' },
    { label: 'Growth', value: s.improvement === null ? '–' : `${s.improvement > 0 ? '+' : ''}${s.improvement}%`, tone: s.improvement === null ? 'text-gray-400' : s.improvement >= 0 ? 'text-emerald-600 dark:text-emerald-300' : 'text-rose-600 dark:text-rose-300' },
    { label: 'Last active', value: s.last_active ? timeAgo(s.last_active) : 'Not yet', tone: 'text-gray-900 dark:text-white text-sm' }
  ]
})
</script>
