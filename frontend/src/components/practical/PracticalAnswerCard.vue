<template>
  <!-- A practical question on the learner's assessment. The learner chooses the programs the task
       needs (Tusome's Word, Excel, PowerPoint, Access) - the others stay greyed out - and can come
       back and choose another later. One file each; each saves as they work and can be handed in
       on its own, the rest go with the assessment. A program with saved work stays chosen. View
       only once handed in. -->
  <div class="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 overflow-hidden">
    <div class="px-4 py-3 border-b border-gray-100 dark:border-gray-700 flex flex-wrap items-center gap-x-3 gap-y-1">
      <p class="text-sm font-bold text-gray-900 dark:text-white">ICT practical</p>
      <p class="text-xs text-gray-500 dark:text-gray-400 flex-1 min-w-0">
        <template v-if="readonly">{{ files.length ? `Your work in ${files.length} ${files.length === 1 ? 'app' : 'apps'}. Open a file to look at it.` : 'Nothing was done in this practical.' }}</template>
        <template v-else-if="!anyChosen">Choose the program this task needs. You can add another one later.</template>
        <template v-else>Work in the programs you chose. Need another one? Choose it below. Each file saves as you work.</template>
      </p>
      <span v-if="files.length" class="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200">{{ files.length }} {{ files.length === 1 ? 'file' : 'files' }}</span>
    </div>

    <ul class="grid sm:grid-cols-2 gap-px bg-gray-100 dark:bg-gray-700">
      <li v-for="t in tiles" :key="t.app" class="p-3 flex items-center gap-3 min-w-0 transition-colors" :class="t.chosen ? 'bg-white dark:bg-gray-800' : 'bg-gray-50 dark:bg-gray-800/60'">
        <span class="w-10 h-10 rounded-lg flex items-center justify-center text-lg font-black flex-shrink-0 transition" :class="t.chosen ? t.info.badge : 'bg-gray-200 text-gray-400 dark:bg-gray-700 dark:text-gray-500'" aria-hidden="true">{{ t.info.letter }}</span>
        <div class="min-w-0 flex-1">
          <p class="text-sm font-semibold truncate" :class="t.chosen ? 'text-gray-900 dark:text-white' : 'text-gray-400 dark:text-gray-500'">
            {{ t.info.short }}
            <span v-if="t.app === main" class="ml-1 align-middle px-1.5 py-0.5 rounded text-[10px] font-bold bg-indigo-50 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-200">Set by your teacher</span>
          </p>
          <p class="text-[11px] truncate" :class="t.file?.handed_in_at ? 'text-emerald-700 dark:text-emerald-300 font-semibold' : 'text-gray-500 dark:text-gray-400'">
            <template v-if="t.file?.handed_in_at">✓ Handed in</template>
            <template v-else-if="t.file">{{ readonly ? 'Handed in with the assessment' : 'Saved' }}</template>
            <template v-else-if="readonly">Not used</template>
            <template v-else-if="!t.chosen">Not chosen</template>
            <template v-else>{{ t.app === main && question.practical_starter_path ? 'Starts from your teacher’s file' : 'Chosen · not started' }}</template>
          </p>
        </div>
        <div class="flex items-center gap-1.5 flex-shrink-0">
          <button
            v-if="t.file && !t.file.handed_in_at && !readonly"
            type="button"
            class="px-2.5 py-1.5 rounded-lg text-xs font-semibold border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50"
            :disabled="handingIn === t.app"
            @click="handIn(t.app)"
          >{{ handingIn === t.app ? 'Handing in…' : 'Hand in' }}</button>
          <template v-if="t.chosen">
            <button v-if="!t.file && !readonly" type="button" class="px-2 py-1.5 rounded-lg text-xs font-semibold text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-100" :title="`Not using ${t.info.short} after all`" @click="choose(t.app, false)">Remove</button>
            <button type="button" class="px-3 py-1.5 rounded-lg text-xs font-semibold text-white disabled:opacity-50" :class="t.info.bar" :disabled="!t.canOpen" @click="openApp = t.app">
              {{ t.locked ? (t.file ? 'View' : 'Open') : t.file ? 'Continue' : 'Open' }}
            </button>
          </template>
          <button v-else-if="!readonly" type="button" class="px-3 py-1.5 rounded-lg text-xs font-semibold border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-white dark:hover:bg-gray-700" :aria-label="`Use ${t.info.short}`" @click="choose(t.app, true)">＋ Use</button>
        </div>
      </li>
    </ul>
    <p v-if="error" class="px-4 py-2 text-xs text-rose-700 dark:text-rose-300 border-t border-gray-100 dark:border-gray-700">{{ error }}</p>

    <Teleport to="body">
      <PracticalWorkspace
        v-if="openTile"
        :key="openTile.app"
        :app="openTile.app"
        :title="title"
        :instructions="question.question_text"
        :src="openTile.file?.path || (openTile.app === main ? question.practical_starter_path : null) || null"
        :readonly="openTile.locked"
        :saver="openTile.locked ? null : (blob: Blob) => save(openTile!.app, blob)"
        :file-name="title"
        @close="openApp = null"
      />
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import axios from 'axios'
import PracticalWorkspace from './PracticalWorkspace.vue'
import { PRACTICAL_APPS, type PracticalApp } from './apps'
import { useConfirmStore } from '@/stores/confirm'

export interface PracticalFile { app: string; path: string; name?: string | null; handed_in_at?: string | null; updated_at?: string | null }

const props = defineProps<{
  question: { id: number; question_text?: string | null; practical_app: string; practical_starter_path?: string | null }
  assignmentId: number
  /** the learner's saved files, one per app */
  savedFiles?: PracticalFile[] | null
  readonly?: boolean
  title: string
}>()
const emit = defineEmits<{ saved: [files: PracticalFile[], submissionId: number] }>()
const confirmDialog = useConfirmStore()

const SAVE_EXT: Record<PracticalApp, string> = { word: 'html', excel: 'json', powerpoint: 'json', access: 'sqlite' }
const main = computed(() => (props.question.practical_app in PRACTICAL_APPS ? props.question.practical_app : 'word') as PracticalApp)
const files = ref<PracticalFile[]>([...(props.savedFiles || [])])
watch(() => props.savedFiles, f => { if (f) files.value = [...f] })

// The programs the learner chose: any with saved work, and any picked (kept on this device so a
// choice not yet opened is still there when they come back)
const choiceKey = computed(() => `tusome:practical-apps:${props.assignmentId}:${props.question.id}`)
const readChoice = (): PracticalApp[] => {
  try { return JSON.parse(localStorage.getItem(choiceKey.value) || '[]') } catch { return [] }
}
const picked = ref<PracticalApp[]>(readChoice())
const choose = (app: PracticalApp, on: boolean) => {
  picked.value = on ? [...new Set([...picked.value, app])] : picked.value.filter(a => a !== app)
  try { localStorage.setItem(choiceKey.value, JSON.stringify(picked.value)) } catch { /* private window */ }
}
const anyChosen = computed(() => tiles.value.some(t => t.chosen))

const tiles = computed(() => {
  const order = [main.value, ...(Object.keys(PRACTICAL_APPS) as PracticalApp[]).filter(a => a !== main.value)]
  return order.map(app => {
    const file = files.value.find(f => f.app === app) || null
    const locked = !!props.readonly || !!file?.handed_in_at
    // once handed in, only what was done (or the teacher's starting file) opens
    const canOpen = !props.readonly || !!file || (app === main.value && !!props.question.practical_starter_path)
    const chosen = !!file || (!props.readonly && picked.value.includes(app))
    return { app, info: PRACTICAL_APPS[app], file, locked, canOpen, chosen }
  })
})
const openApp = ref<PracticalApp | null>(null)
const openTile = computed(() => tiles.value.find(t => t.app === openApp.value) || null)
const handingIn = ref<PracticalApp | null>(null)
const error = ref('')

const put = (file: PracticalFile) => {
  files.value = [...files.value.filter(f => f.app !== file.app), file]
}

const save = async (app: PracticalApp, blob: Blob) => {
  const form = new FormData()
  form.append('file', blob, `work.${SAVE_EXT[app]}`)
  form.append('assignment_id', String(props.assignmentId))
  form.append('app', app)
  form.append('name', `${props.title}.${PRACTICAL_APPS[app].downloadExt}`)
  const res = await axios.post(`/api/student/assignments/questions/${props.question.id}/practical`, form, { headers: { 'Content-Type': 'multipart/form-data' } })
  put({ ...(files.value.find(f => f.app === app) || {}), app, path: res.data.data.path, handed_in_at: null })
  emit('saved', files.value, res.data.data.submission_id)
}

const handIn = async (app: PracticalApp) => {
  const label = PRACTICAL_APPS[app].short
  if (!await confirmDialog.open({ title: `Hand in your ${label} file`, message: `Your teacher gets this file as it is now, and you can't change it after. Your other files stay open until you hand them in.`, confirmLabel: 'Hand in' })) return
  handingIn.value = app
  error.value = ''
  try {
    const res = await axios.post(`/api/student/assignments/questions/${props.question.id}/practical/hand-in`, { assignment_id: props.assignmentId, app })
    const file = files.value.find(f => f.app === app)
    if (file) put({ ...file, handed_in_at: res.data.data.handed_in_at || new Date().toISOString() })
    emit('saved', files.value, 0)
  } catch (e: any) {
    error.value = e?.response?.data?.message || `The ${label} file could not be handed in. Try again.`
  } finally {
    handingIn.value = null
  }
}
</script>
