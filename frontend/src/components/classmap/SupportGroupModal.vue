<template>
  <!-- Create a support group from a Class Learning Map row: the students who haven't achieved the
       outcome / competency (all ticked to begin with), a note and an optional remedial session.
       Each student is sent to revise it - see Teacher\SupportGroupController. -->
  <Teleport to="body">
    <div class="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/50 p-0 sm:p-4" @click.self="$emit('close')">
      <div class="w-full sm:max-w-lg max-h-[92vh] flex flex-col bg-white dark:bg-gray-800 rounded-t-2xl sm:rounded-2xl shadow-2xl">
        <div class="px-5 pt-5 pb-3 border-b border-gray-100 dark:border-gray-700">
          <p class="text-[10px] font-bold uppercase tracking-wider" :class="row.kind === 'competency' ? 'text-violet-700 dark:text-violet-300' : 'text-emerald-700 dark:text-emerald-300'">
            Support group · {{ row.kind === 'competency' ? 'Topic competency' : 'Learning outcome' }}
          </p>
          <h2 class="text-base font-bold text-gray-900 dark:text-white leading-snug mt-0.5">{{ row.text }}</h2>
          <p class="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{{ topic }}</p>
        </div>

        <div class="flex-1 overflow-y-auto px-5 py-4 space-y-4">
          <p class="text-xs text-gray-600 dark:text-gray-300">
            Each student gets a notification, and "What to do next" on their dashboard leads with this: the notes page it's taught on (else the topic's notes or practice). You'll see who has revised and how their results move.
          </p>

          <div>
            <div class="flex items-center justify-between mb-1.5">
              <p class="text-xs font-semibold text-gray-700 dark:text-gray-200">Students ({{ chosen.length }} of {{ row.support.length }})</p>
              <button type="button" class="text-xs font-semibold text-indigo-600 dark:text-indigo-300" @click="toggleAll">{{ chosen.length === row.support.length ? 'Clear all' : 'Select all' }}</button>
            </div>
            <ul class="max-h-48 overflow-y-auto rounded-lg border border-gray-200 dark:border-gray-700 divide-y divide-gray-100 dark:divide-gray-700">
              <li v-for="s in row.support" :key="s.student_id">
                <label class="flex items-center gap-2.5 px-3 py-2 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700/50">
                  <input v-model="chosen" type="checkbox" :value="s.student_id" class="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500">
                  <span class="flex-1 min-w-0 text-sm text-gray-900 dark:text-white truncate">{{ s.name }}</span>
                  <span class="text-[11px] font-semibold px-1.5 py-0.5 rounded" :class="s.status === 'needs_support' ? 'bg-rose-50 text-rose-700 dark:bg-rose-900/30 dark:text-rose-200' : 'bg-amber-50 text-amber-800 dark:bg-amber-900/30 dark:text-amber-200'">{{ s.percentage }}%</span>
                </label>
              </li>
            </ul>
          </div>

          <div>
            <label class="block text-xs font-semibold text-gray-700 dark:text-gray-200 mb-1">Note to the students <span class="font-normal text-gray-400">(optional)</span></label>
            <textarea v-model="note" rows="2" maxlength="500" placeholder="e.g. Re-read the page on measuring length, then try the practice questions." class="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"></textarea>
          </div>

          <div>
            <p class="text-xs font-semibold text-gray-700 dark:text-gray-200 mb-1">Support session <span class="font-normal text-gray-400">(optional)</span></p>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <input v-model="meetAt" type="datetime-local" class="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white">
              <input v-model="meetPlace" type="text" maxlength="120" placeholder="Where, e.g. Physics Lab 2" class="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white">
            </div>
          </div>
        </div>

        <div class="px-5 py-3 border-t border-gray-100 dark:border-gray-700 flex gap-2 justify-end">
          <button type="button" class="px-4 py-2 text-sm font-semibold rounded-lg text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700" @click="$emit('close')">Cancel</button>
          <button type="button" class="px-4 py-2 text-sm font-semibold rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-50" :disabled="!chosen.length || saving" @click="save">
            {{ saving ? 'Sending…' : `Send to ${chosen.length} student${chosen.length === 1 ? '' : 's'}` }}
          </button>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import axios from 'axios'
import { useToastStore } from '@/stores/toast'

export interface SupportRow {
  kind: 'outcome' | 'competency'
  ids: number[]
  text: string
  support: { student_id: number; name: string; percentage: number; status: 'developing' | 'needs_support' }[]
}

const props = defineProps<{ row: SupportRow; topic: string; subjectId: number }>()
const emit = defineEmits<{ close: []; created: [] }>()
const toast = useToastStore()

const chosen = ref<number[]>(props.row.support.map(s => s.student_id))
const note = ref('')
const meetAt = ref('')
const meetPlace = ref('')
const saving = ref(false)

const toggleAll = () => {
  chosen.value = chosen.value.length === props.row.support.length ? [] : props.row.support.map(s => s.student_id)
}

const save = async () => {
  saving.value = true
  try {
    const response = await axios.post('/api/teacher/support-groups', {
      subject_id: props.subjectId,
      kind: props.row.kind,
      item_ids: props.row.ids,
      student_ids: chosen.value,
      note: note.value,
      meet_at: meetAt.value,
      meet_place: meetPlace.value
    })
    toast.success(`Sent to ${response.data.data.members} student${response.data.data.members === 1 ? '' : 's'}`)
    emit('created')
  } catch (e: any) {
    toast.error(e?.response?.data?.message || 'Could not create the support group')
  } finally {
    saving.value = false
  }
}
</script>
