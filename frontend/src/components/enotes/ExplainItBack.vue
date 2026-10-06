<template>
  <!-- "Explain it back": after a page, the student puts it in one sentence of their own. Their
       teacher reads these (unlike "My summary", which stays private). Folded to one line until
       the student opens it; a saved sentence shows as done. -->
  <div class="explain-it-back mt-4">
    <button
      v-if="!open"
      type="button"
      class="w-full flex items-center gap-2 rounded-xl border border-dashed px-3 py-2 text-left text-xs transition-colors"
      :class="saved ? 'border-emerald-300 dark:border-emerald-700 text-emerald-700 dark:text-emerald-300' : 'border-indigo-300 dark:border-indigo-700 text-indigo-700 dark:text-indigo-300 hover:bg-indigo-50/60 dark:hover:bg-indigo-900/20'"
      @click="open = true"
    >
      <span class="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0" :class="saved ? 'bg-emerald-500 text-white' : 'bg-indigo-100 dark:bg-indigo-900/50'">
        <svg v-if="saved" class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"></path></svg>
        <span v-else class="text-[11px] font-bold">?</span>
      </span>
      <span class="flex-1 min-w-0 truncate">
        <template v-if="saved">You explained this page: “{{ saved }}”</template>
        <template v-else><b>Explain it back</b> - this page in one sentence of your own</template>
      </span>
    </button>

    <div v-else class="rounded-xl border border-indigo-200 dark:border-indigo-800 bg-indigo-50/50 dark:bg-indigo-900/15 p-3">
      <label :for="`explain-${pageId}`" class="block text-xs font-semibold text-indigo-900 dark:text-indigo-100">In one sentence, what is this page saying?</label>
      <textarea
        :id="`explain-${pageId}`"
        ref="box"
        v-model="draft"
        rows="2"
        maxlength="400"
        placeholder="Use your own words - not copied from the page"
        class="mt-1.5 w-full px-3 py-2 rounded-lg border border-indigo-200 dark:border-indigo-700 bg-white dark:bg-gray-900 text-sm text-gray-900 dark:text-white resize-none"
        @keydown.enter.exact.prevent="save"
      ></textarea>
      <div class="mt-2 flex items-center gap-2">
        <button type="button" class="px-3 py-1.5 rounded-lg text-xs font-semibold bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-50" :disabled="saving || draft.trim() === (saved || '')" @click="save">{{ saving ? 'Saving…' : 'Save' }}</button>
        <button type="button" class="px-3 py-1.5 rounded-lg text-xs font-semibold text-gray-600 dark:text-gray-300" @click="open = false">Close</button>
        <span class="ml-auto text-[11px] text-gray-500 dark:text-gray-400">Your teacher sees this</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, nextTick, ref, watch } from 'vue'
import { useExplanations } from '@/composables/useExplanations'

const props = defineProps<{ topicId: number; pageId: number }>()
const store = useExplanations(props.topicId)
const saved = computed(() => store.get(props.pageId))
const open = ref(false)
const draft = ref('')
const saving = ref(false)
const box = ref<HTMLTextAreaElement | null>(null)

watch(open, async isOpen => {
  if (!isOpen) return
  draft.value = saved.value || ''
  await nextTick()
  box.value?.focus()
})

const save = async () => {
  if (saving.value) return
  saving.value = true
  const ok = await store.save(props.pageId, draft.value)
  saving.value = false
  if (ok) open.value = false
}
</script>
