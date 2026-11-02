<template>
  <!-- Support files on an ICT assessment (AssignmentResourceController): starter documents,
       spreadsheets, databases, zip archives... students download them from the assessment. -->
  <div v-if="assignmentId ? allowed : assumeIct" class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
    <div class="px-4 sm:px-6 py-3 sm:py-4 border-b border-gray-200 dark:border-gray-700">
      <h2 class="text-base sm:text-lg font-semibold text-gray-900 dark:text-white flex items-center">
        <span class="w-8 h-8 mr-2.5 rounded-lg bg-sky-50 dark:bg-sky-900/30 flex items-center justify-center flex-shrink-0">
          <AppIcon name="document" class="w-4 h-4 text-sky-600 dark:text-sky-400" />
        </span>
        Support files
      </h2>
      <p class="mt-1 text-xs text-gray-500 dark:text-gray-400">Files students download to do the work - Word, Excel, PowerPoint, Publisher, Access, PDF, pictures, text, or a zip of several files. Up to 50 MB each.</p>
    </div>
    <div class="p-4 sm:p-6 space-y-3">
      <p v-if="!assignmentId" class="text-sm text-gray-500 dark:text-gray-400">Add a question first - the draft then saves itself and files can be attached here.</p>
      <template v-else>
        <ul v-if="files.length" class="divide-y divide-gray-100 dark:divide-gray-700 rounded-lg border border-gray-200 dark:border-gray-700">
          <li v-for="f in files" :key="f.id" class="flex items-center gap-3 px-3 py-2">
            <span class="px-1.5 py-0.5 rounded text-[10px] font-bold uppercase bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300">{{ extOf(f.original_name) }}</span>
            <a :href="resolveAssetUrl(f.file_path)" :download="f.original_name" class="flex-1 min-w-0 truncate text-sm text-indigo-700 dark:text-indigo-300 hover:underline">{{ f.original_name }}</a>
            <span class="text-xs text-gray-400 tabular-nums">{{ sizeOf(f.file_size) }}</span>
            <button type="button" :disabled="busy" class="text-xs font-semibold text-rose-600 hover:underline disabled:opacity-50" @click="remove(f)">Remove</button>
          </li>
        </ul>
        <label class="inline-flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-semibold border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer" :class="busy ? 'opacity-50 pointer-events-none' : ''">
          <input type="file" multiple class="hidden" :accept="ACCEPT" @change="onPick">
          {{ busy ? 'Uploading...' : 'Add files' }}
        </label>
        <p v-if="error" class="text-sm text-rose-600 whitespace-pre-line">{{ error }}</p>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import axios from 'axios'
import AppIcon from '@/components/common/AppIcon.vue'
import { resolveAssetUrl } from '@/utils/url'

interface SupportFile { id: number; file_path: string; original_name: string; file_size: number | null }

// assumeIct: before the assessment is saved there is no id to ask the server with - the
// builder's guess from the subject's name decides whether the card shows until then
const props = defineProps<{ assignmentId: number | string | null; assumeIct?: boolean }>()
// Whether the assessment may have support files (ICT) - asked of the server, from the
// assessment's own subject; the card shows only then
const allowed = ref(false)

const ACCEPT = '.pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.pub,.mdb,.accdb,.odt,.ods,.odp,.rtf,.txt,.csv,.zip,.rar,.7z,.jpg,.jpeg,.png,.gif,.webp'
const files = ref<SupportFile[]>([])
const busy = ref(false)
const error = ref('')

const extOf = (name: string) => (name.split('.').pop() || '').slice(0, 5)
const sizeOf = (b: number | null) => (!b ? '' : b >= 1048576 ? `${(b / 1048576).toFixed(1)} MB` : `${Math.max(1, Math.round(b / 1024))} KB`)

const load = async () => {
  if (!props.assignmentId) return
  try {
    const d = (await axios.get(`/api/teacher/assignments/${props.assignmentId}/resources`)).data.data
    files.value = d.files
    allowed.value = !!d.allowed
  } catch { /* the card stays as it was */ }
}
watch(() => props.assignmentId, load, { immediate: true })

const onPick = async (e: Event) => {
  const input = e.target as HTMLInputElement
  const picked = Array.from(input.files || [])
  input.value = ''
  if (!picked.length) return
  busy.value = true
  error.value = ''
  const failed: string[] = []
  for (const file of picked) {
    const form = new FormData()
    form.append('file', file)
    try {
      const d = (await axios.post(`/api/teacher/assignments/${props.assignmentId}/resources`, form, { headers: { 'Content-Type': 'multipart/form-data' } })).data.data
      files.value.push(d)
    } catch (err: any) {
      failed.push(`${file.name}: ${err.response?.data?.message || 'could not be added'}`)
    }
  }
  error.value = failed.join('\n')
  busy.value = false
}

const remove = async (f: SupportFile) => {
  busy.value = true
  try {
    await axios.delete(`/api/teacher/assignments/${props.assignmentId}/resources/${f.id}`)
    files.value = files.value.filter(x => x.id !== f.id)
  } catch (err: any) {
    error.value = err.response?.data?.message || 'It could not be removed'
  } finally {
    busy.value = false
  }
}

defineExpose({ reload: load })
</script>
