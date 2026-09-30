<template>
  <!-- One click from a topic with no Activity of Integration yet: pick a suggested scenario, confirm
       the title and due date, and a complete draft AOI is created (topic linked, scenario question
       with its tasks, marking guide) and opened in the builder to review before publishing -->
  <AoiScenarioSuggest v-if="!chosen" :topic-ids="topicIds" use-label="Use this - create the AOI" @close="$emit('close')" @use="chosen = $event" />

  <Teleport v-else to="body">
    <div class="fixed inset-0 z-[60] flex items-end sm:items-center justify-center bg-black/50 p-0 sm:p-4" @click.self="$emit('close')">
      <div class="w-full sm:max-w-md bg-white dark:bg-gray-800 rounded-t-2xl sm:rounded-2xl shadow-2xl p-5">
        <p class="text-[10px] font-bold uppercase tracking-wider text-violet-700 dark:text-violet-300">New Activity of Integration · {{ classLabel }}</p>
        <h2 class="text-base font-bold text-gray-900 dark:text-white">{{ chosen.title }}</h2>
        <p class="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{{ chosen.tasks.length }} task{{ chosen.tasks.length === 1 ? '' : 's' }} · {{ totalMarks(chosen) }} marks · created as a draft for you to review</p>

        <div class="mt-4 space-y-3">
          <div>
            <label class="block text-xs font-semibold text-gray-700 dark:text-gray-200 mb-1">Title</label>
            <input v-model="title" type="text" maxlength="200" class="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white">
          </div>
          <div>
            <label class="block text-xs font-semibold text-gray-700 dark:text-gray-200 mb-1">Due date</label>
            <input v-model="dueDate" type="date" class="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white">
          </div>
          <p v-if="error" class="text-xs text-red-600 dark:text-red-400">{{ error }}</p>
        </div>

        <div class="mt-5 flex justify-between gap-2">
          <button type="button" class="px-3 py-2 text-sm font-semibold rounded-lg text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700" @click="chosen = null">Back to scenarios</button>
          <button type="button" class="px-4 py-2 text-sm font-semibold rounded-lg bg-violet-600 text-white hover:bg-violet-700 disabled:opacity-50" :disabled="creating || !title.trim() || !dueDate" @click="create">
            {{ creating ? 'Creating…' : 'Create & open' }}
          </button>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import AoiScenarioSuggest from '@/components/assignment/AoiScenarioSuggest.vue'
import { createAoiDraft, totalMarks, type AoiSuggestion } from '@/utils/aoiDraft'

const props = defineProps<{
  topicIds: number[]
  topicName: string
  subjectId: number
  // The class level (all its streams), e.g. 'S.1'
  classLabel: string
  academicYear: string
  termId: number | null
}>()
defineEmits<{ close: [] }>()
const router = useRouter()

const chosen = ref<AoiSuggestion | null>(null)
const niceName = (t: string) => (t === t.toUpperCase() ? t.toLowerCase().replace(/\b\w/g, c => c.toUpperCase()) : t)
const title = ref(`${niceName(props.topicName)} - Activity of Integration`)
const inTwoWeeks = () => {
  const d = new Date(Date.now() + 14 * 86400000)
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}
const dueDate = ref(inTwoWeeks())
const creating = ref(false)
const error = ref('')
watch(chosen, () => { error.value = '' })

const create = async () => {
  if (!chosen.value) return
  creating.value = true
  error.value = ''
  try {
    const id = await createAoiDraft({
      suggestion: chosen.value,
      title: title.value.trim(),
      subjectId: props.subjectId,
      classTarget: { scope: 'all_streams', class_id: null, class_group_name: props.classLabel },
      academicYear: props.academicYear,
      termId: props.termId,
      dueDate: dueDate.value,
      topicIds: props.topicIds
    })
    router.push(`/teacher/assignments/${id}/edit`)
  } catch (e: any) {
    const errors = e?.response?.data?.errors
    error.value = (errors && Object.values(errors)[0]) as string || e?.response?.data?.message || 'Could not create the AOI'
  } finally {
    creating.value = false
  }
}
</script>
