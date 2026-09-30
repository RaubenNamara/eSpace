<template>
  <!-- The teacher's support groups for the class on view: who has revised, and each student's
       result when the group was made against now; remind the rest, or close the group -->
  <div class="space-y-3">
    <div v-if="!groups.length" class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-8 text-center">
      <p class="text-sm font-semibold text-gray-900 dark:text-white">No support groups yet</p>
      <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">Open an outcome or competency under "By outcome" and choose Create support group to send the students who need help to revise it.</p>
    </div>

    <div
      v-for="g in groups"
      :key="g.id"
      class="bg-white dark:bg-gray-800 rounded-xl border p-4"
      :class="g.status === 'open' ? 'border-gray-200 dark:border-gray-700' : 'border-dashed border-gray-300 dark:border-gray-600 opacity-75'"
    >
      <div class="flex flex-col sm:flex-row sm:items-start gap-2">
        <div class="flex-1 min-w-0">
          <p class="text-[10px] font-bold uppercase tracking-wider" :class="g.kind === 'competency' ? 'text-violet-700 dark:text-violet-300' : 'text-emerald-700 dark:text-emerald-300'">
            {{ g.kind === 'competency' ? 'Topic competency' : 'Learning outcome' }} · {{ g.topic_text }}
            <span v-if="g.status === 'closed'" class="ml-1 px-1.5 py-0.5 rounded bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300">Closed</span>
          </p>
          <p class="text-sm font-semibold text-gray-900 dark:text-white leading-snug">{{ g.item_text }}</p>
          <p class="text-[11px] text-gray-500 dark:text-gray-400 mt-0.5">
            Sent {{ formatDate(g.created_at) }}<template v-if="g.meet_at || g.meet_place"> · Session {{ [g.meet_at ? formatDateTime(g.meet_at) : '', g.meet_place].filter(Boolean).join(' · ') }}</template>
          </p>
          <p v-if="g.note" class="text-xs text-gray-600 dark:text-gray-300 mt-1 italic">"{{ g.note }}"</p>
        </div>
        <div v-if="g.status === 'open'" class="flex gap-2 flex-shrink-0">
          <button type="button" class="px-3 py-1.5 text-xs font-semibold rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-40" :disabled="g.counts.revised === g.counts.members || busy === g.id" @click="remind(g)">Remind</button>
          <button type="button" class="px-3 py-1.5 text-xs font-semibold rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-40" :disabled="busy === g.id" @click="close(g)">Close</button>
        </div>
      </div>

      <!-- Progress -->
      <div class="grid grid-cols-2 gap-3 mt-3">
        <div>
          <div class="flex justify-between text-[11px] mb-1"><span class="text-gray-500 dark:text-gray-400">Revised</span><span class="font-semibold text-gray-800 dark:text-gray-100">{{ g.counts.revised }}/{{ g.counts.members }}</span></div>
          <div class="h-1.5 rounded-full bg-gray-100 dark:bg-gray-700 overflow-hidden"><div class="h-full bg-indigo-500 rounded-full" :style="{ width: `${pct(g.counts.revised, g.counts.members)}%` }"></div></div>
        </div>
        <div>
          <div class="flex justify-between text-[11px] mb-1"><span class="text-gray-500 dark:text-gray-400">Achieved now</span><span class="font-semibold text-gray-800 dark:text-gray-100">{{ g.counts.achieved }}/{{ g.counts.members }}</span></div>
          <div class="h-1.5 rounded-full bg-gray-100 dark:bg-gray-700 overflow-hidden"><div class="h-full bg-emerald-500 rounded-full" :style="{ width: `${pct(g.counts.achieved, g.counts.members)}%` }"></div></div>
        </div>
      </div>

      <!-- Members -->
      <button type="button" class="mt-3 text-xs font-semibold text-indigo-600 dark:text-indigo-300" @click="expanded[g.id] = !expanded[g.id]">
        {{ expanded[g.id] ? 'Hide students' : `Show ${g.counts.members} student${g.counts.members === 1 ? '' : 's'}` }}
      </button>
      <ul v-if="expanded[g.id]" class="mt-2 divide-y divide-gray-100 dark:divide-gray-700">
        <li v-for="m in g.members" :key="m.student_id" class="py-1.5 flex items-center gap-2 text-xs">
          <span class="flex-1 min-w-0 truncate text-gray-900 dark:text-white">{{ m.name }} <span v-if="m.class_name" class="text-gray-400">· {{ m.class_name }}</span></span>
          <span class="flex-shrink-0 w-24 text-right text-gray-600 dark:text-gray-300">
            {{ m.start_percentage !== null ? `${m.start_percentage}%` : '–' }} → <span class="font-semibold" :class="m.percentage !== null && m.percentage >= 60 ? 'text-emerald-700 dark:text-emerald-300' : ''">{{ m.percentage !== null ? `${m.percentage}%` : '–' }}</span>
          </span>
          <span class="flex-shrink-0 w-20 text-right font-semibold" :class="m.revised_at ? 'text-emerald-700 dark:text-emerald-300' : 'text-gray-400 dark:text-gray-500'">{{ m.revised_at ? 'Revised' : 'Not yet' }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import axios from 'axios'
import { useToastStore } from '@/stores/toast'
import { useConfirmStore } from '@/stores/confirm'

export interface SupportGroup {
  id: number
  kind: 'outcome' | 'competency'
  item_ids: number[]
  item_text: string
  topic_text: string
  note: string | null
  meet_at: string | null
  meet_place: string | null
  status: 'open' | 'closed'
  created_at: string
  closed_at: string | null
  members: { student_id: number; name: string; class_name: string | null; start_percentage: number | null; percentage: number | null; revised_at: string | null }[]
  counts: { members: number; revised: number; achieved: number }
}

defineProps<{ groups: SupportGroup[] }>()
const emit = defineEmits<{ changed: [] }>()
const toast = useToastStore()
const confirm = useConfirmStore()
const expanded = ref<Record<number, boolean>>({})
const busy = ref<number | null>(null)

const pct = (n: number, of: number) => (of ? n / of * 100 : 0)
const formatDate = (s: string) => new Date(s.replace(' ', 'T')).toLocaleDateString(undefined, { day: 'numeric', month: 'short' })
const formatDateTime = (s: string) => new Date(s.replace(' ', 'T')).toLocaleString(undefined, { weekday: 'short', day: 'numeric', month: 'short', hour: 'numeric', minute: '2-digit' })

const remind = async (g: SupportGroup) => {
  busy.value = g.id
  try {
    const response = await axios.post(`/api/teacher/support-groups/${g.id}/remind`)
    toast.success(response.data.message || 'Reminder sent')
  } catch (e: any) {
    toast.error(e?.response?.data?.message || 'Could not send the reminder')
  } finally {
    busy.value = null
  }
}

const close = async (g: SupportGroup) => {
  const ok = await confirm.open({
    title: 'Close this support group?',
    message: 'Students who haven\'t revised yet will no longer see it in "What to do next". You can still see the group here.',
    confirmLabel: 'Close group'
  })
  if (!ok) return
  busy.value = g.id
  try {
    await axios.put(`/api/teacher/support-groups/${g.id}/close`)
    emit('changed')
  } catch (e: any) {
    toast.error(e?.response?.data?.message || 'Could not close the group')
  } finally {
    busy.value = null
  }
}
</script>
