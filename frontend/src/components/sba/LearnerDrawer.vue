<template>
  <!-- One learner's continuous assessment in a subject: every AOI and project they were set, its
       score or why there isn't one, and the evidence kept for it - add a photo straight from the
       phone's camera, or a scan. -->
  <div class="fixed inset-0 z-50 flex justify-end bg-black/40" @click.self="emit('close')">
    <aside class="w-full max-w-lg h-full overflow-y-auto bg-white dark:bg-gray-800 shadow-2xl flex flex-col">
      <header class="sticky top-0 z-10 bg-white/95 dark:bg-gray-800/95 backdrop-blur border-b border-gray-200 dark:border-gray-700 px-5 py-4 flex items-start gap-3">
        <span class="w-11 h-11 flex-shrink-0 rounded-full bg-indigo-600 text-white flex items-center justify-center text-sm font-bold">{{ initials(learner.name) }}</span>
        <div class="flex-1 min-w-0">
          <h2 class="text-base font-bold text-gray-900 dark:text-white truncate">{{ niceName(learner.name) }}</h2>
          <p class="text-xs text-gray-500 dark:text-gray-400">
            {{ learner.stream }} · No. {{ learner.admission_number }}
            <template v-if="learner.lin"> · LIN {{ learner.lin }}</template>
            <span v-else class="text-rose-600 dark:text-rose-300 font-semibold"> · no LIN yet</span>
          </p>
        </div>
        <button type="button" class="p-1.5 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-gray-200" aria-label="Close" @click="emit('close')">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
        </button>
      </header>

      <!-- The figures -->
      <div class="px-5 py-4 grid grid-cols-3 gap-2 text-center">
        <div class="rounded-xl bg-indigo-50 dark:bg-indigo-900/30 py-3">
          <p class="text-2xl font-extrabold tabular-nums text-indigo-700 dark:text-indigo-200">{{ learner.ca_score ?? '–' }}</p>
          <p class="text-[10px] font-semibold uppercase tracking-wide text-indigo-500 dark:text-indigo-300">CA out of {{ outOf }}</p>
        </div>
        <div class="rounded-xl bg-gray-50 dark:bg-gray-900/40 py-3">
          <p class="text-2xl font-extrabold tabular-nums text-gray-900 dark:text-white">{{ learner.average !== null ? `${learner.average}%` : '–' }}</p>
          <p class="text-[10px] font-semibold uppercase tracking-wide text-gray-400">AOI average</p>
        </div>
        <div class="rounded-xl bg-gray-50 dark:bg-gray-900/40 py-3">
          <p class="text-2xl font-extrabold tabular-nums text-gray-900 dark:text-white">{{ learner.aoi_marked }}<span class="text-sm text-gray-400">/{{ learner.aoi_set }}</span></p>
          <p class="text-[10px] font-semibold uppercase tracking-wide text-gray-400">AOIs scored</p>
        </div>
      </div>

      <ul class="px-5 pb-4 space-y-3 flex-1">
        <li v-if="!learner.items.length" class="text-sm text-gray-500 dark:text-gray-400 py-6 text-center">No AOI or project has been set for this learner's classes in this subject yet.</li>
        <li v-for="it in learner.items" :key="it.key" class="rounded-2xl border border-gray-200 dark:border-gray-700 p-3.5">
          <div class="flex items-start gap-3">
            <span class="mt-0.5 px-1.5 py-0.5 rounded-md text-[10px] font-bold flex-shrink-0" :class="it.kind === 'PROJECT' ? 'bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-200' : 'bg-indigo-50 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-200'">{{ it.kind === 'PROJECT' ? 'Project' : 'AOI' }}</span>
            <div class="flex-1 min-w-0">
              <p class="text-sm font-semibold text-gray-900 dark:text-white">{{ it.title }}</p>
              <p class="text-[11px] text-gray-500 dark:text-gray-400">{{ it.source === 'paper' ? 'On paper' : 'Online' }}<template v-if="it.date"> · {{ shortDate(it.date) }}</template></p>
            </div>
            <span class="flex-shrink-0 text-right">
              <span v-if="it.state === 'marked'" class="block text-lg font-extrabold tabular-nums text-gray-900 dark:text-white leading-none">{{ Math.round(it.percent ?? 0) }}%</span>
              <span class="inline-block mt-0.5 px-2 py-0.5 rounded-full text-[10px] font-bold" :class="STATE[it.state].cls">{{ STATE[it.state].label(it) }}</span>
            </span>
          </div>

          <!-- Evidence -->
          <div class="mt-3 flex flex-wrap items-center gap-2">
            <div v-for="e in it.evidence" :key="`${e.from}-${e.id}`" class="relative group">
              <a :href="e.url" target="_blank" rel="noopener" class="block w-16 h-16 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900" :title="`${e.from === 'learner' ? 'From the learner\'s answer' : 'Kept by staff'}${e.note ? ' - ' + e.note : ''}`">
                <img v-if="e.kind === 'image'" :src="e.url" alt="" class="w-full h-full object-cover" loading="lazy">
                <span v-else class="w-full h-full flex flex-col items-center justify-center text-rose-600"><AppIcon name="document" class="w-6 h-6" /><span class="text-[9px] font-bold">PDF</span></span>
              </a>
              <span v-if="e.from === 'learner'" class="absolute bottom-0.5 left-0.5 px-1 rounded bg-black/60 text-white text-[8px] font-bold">learner</span>
              <button v-else type="button" class="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-gray-900/80 text-white text-xs leading-none opacity-0 group-hover:opacity-100 focus:opacity-100 transition" title="Remove" @click="remove(e.id)">×</button>
            </div>
            <label class="w-16 h-16 rounded-xl border-2 border-dashed border-gray-300 dark:border-gray-600 flex flex-col items-center justify-center gap-0.5 text-gray-400 hover:border-indigo-400 hover:text-indigo-500 cursor-pointer transition-colors" :class="uploading === it.key ? 'opacity-50 pointer-events-none' : ''">
              <AppIcon name="camera" class="w-5 h-5" />
              <span class="text-[9px] font-bold">{{ uploading === it.key ? 'Saving' : 'Add' }}</span>
              <input type="file" accept="image/*,application/pdf" class="sr-only" @change="upload(it.key, $event)">
            </label>
            <span v-if="!it.evidence.length" class="text-[11px] text-gray-400">No evidence yet - a photo of the work is enough.</span>
          </div>
        </li>

        <!-- Evidence not tied to one AOI -->
        <li class="rounded-2xl border border-dashed border-gray-300 dark:border-gray-600 p-3.5">
          <p class="text-sm font-semibold text-gray-900 dark:text-white">Other evidence</p>
          <p class="text-[11px] text-gray-500 dark:text-gray-400 mb-2">Anything else that shows this learner's work in the subject.</p>
          <div class="flex flex-wrap items-center gap-2">
            <div v-for="e in learner.general_evidence" :key="e.id" class="relative group">
              <a :href="e.url" target="_blank" rel="noopener" class="block w-16 h-16 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
                <img v-if="e.kind === 'image'" :src="e.url" alt="" class="w-full h-full object-cover" loading="lazy">
                <span v-else class="w-full h-full flex flex-col items-center justify-center text-rose-600"><AppIcon name="document" class="w-6 h-6" /><span class="text-[9px] font-bold">PDF</span></span>
              </a>
              <button type="button" class="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-gray-900/80 text-white text-xs leading-none opacity-0 group-hover:opacity-100 focus:opacity-100 transition" title="Remove" @click="remove(e.id)">×</button>
            </div>
            <label class="w-16 h-16 rounded-xl border-2 border-dashed border-gray-300 dark:border-gray-600 flex flex-col items-center justify-center gap-0.5 text-gray-400 hover:border-indigo-400 hover:text-indigo-500 cursor-pointer" :class="uploading === 'general' ? 'opacity-50 pointer-events-none' : ''">
              <AppIcon name="camera" class="w-5 h-5" />
              <span class="text-[9px] font-bold">{{ uploading === 'general' ? 'Saving' : 'Add' }}</span>
              <input type="file" accept="image/*,application/pdf" class="sr-only" @change="upload('', $event)">
            </label>
          </div>
        </li>
      </ul>
    </aside>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import axios from 'axios'
import AppIcon from '@/components/common/AppIcon.vue'
import { initials, niceName } from '@/components/dashboard/teacher/time'
import { useToastStore } from '@/stores/toast'
import { useConfirmStore } from '@/stores/confirm'
import type { SbaItem, SbaLearner } from './types'

const props = defineProps<{ learner: SbaLearner; subjectId: number; role: string; outOf: number }>()
const emit = defineEmits<{ close: []; changed: [] }>()
const toast = useToastStore()
const confirmDialog = useConfirmStore()

const STATE: Record<SbaItem['state'], { label: (i: SbaItem) => string; cls: string }> = {
  marked: { label: () => 'Scored', cls: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-200' },
  waiting: { label: () => 'To mark', cls: 'bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-200' },
  missing: { label: (i) => (i.source === 'paper' ? 'No score' : 'Not done'), cls: 'bg-rose-50 text-rose-700 dark:bg-rose-900/30 dark:text-rose-200' },
  upcoming: { label: () => 'Not due yet', cls: 'bg-gray-100 text-gray-500 dark:bg-gray-700 dark:text-gray-300' }
}

const shortDate = (s: string) => new Date(s.replace(' ', 'T')).toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' })

const uploading = ref<string | null>(null)
const upload = async (item: string, ev: Event) => {
  const input = ev.target as HTMLInputElement
  const file = input.files?.[0]
  input.value = ''
  if (!file) return
  if (file.size > 8 * 1024 * 1024) {
    toast.error('That file is larger than 8 MB')
    return
  }
  const body = new FormData()
  body.append('student_id', String(props.learner.id))
  body.append('subject_id', String(props.subjectId))
  body.append('item', item)
  body.append('file', file)
  uploading.value = item || 'general'
  try {
    await axios.post(`/api/${props.role}/sba/evidence`, body)
    toast.success('Evidence saved')
    emit('changed')
  } catch (e: any) {
    toast.error(e?.response?.data?.errors?.file || e?.response?.data?.message || 'The file could not be saved')
  } finally {
    uploading.value = null
  }
}

const remove = async (id: number) => {
  if (!await confirmDialog.open({ title: 'Remove evidence', message: 'Remove this file from the learner\'s evidence?', confirmLabel: 'Remove', danger: true })) return
  try {
    await axios.delete(`/api/${props.role}/sba/evidence/${id}`)
    emit('changed')
  } catch {
    toast.error('It could not be removed')
  }
}
</script>
