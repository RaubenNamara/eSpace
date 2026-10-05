<template>
  <!-- One-tap marking comments under a feedback box: the teacher's most-used first. Tap one to add
       it; "Save" keeps what's in the box for next time; "All" shows the rest (with delete). -->
  <div class="comment-chips">
    <button v-for="c in top" :key="c.id" type="button" class="comment-chips__chip" :disabled="disabled" :title="c.text" @click="use(c)">{{ c.text }}</button>
    <button v-if="current.trim() && !saved" type="button" class="comment-chips__chip comment-chips__chip--action" :disabled="disabled" title="Keep this comment for next time" @click="save">+ Save</button>
    <button v-if="bank.comments.length > top.length" type="button" class="comment-chips__chip comment-chips__chip--action" @click="open = !open">{{ open ? 'Less' : `All (${bank.comments.length})` }}</button>

    <div v-if="open" class="comment-chips__all">
      <input v-model="search" type="search" placeholder="Search your comments" class="comment-chips__search">
      <ul>
        <li v-for="c in found" :key="c.id">
          <button type="button" class="comment-chips__row" :disabled="disabled" @click="use(c)">{{ c.text }}</button>
          <button type="button" class="comment-chips__delete" :title="`Delete: ${c.text}`" @click="remove(c)">
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>
        </li>
      </ul>
      <p v-if="!found.length" class="comment-chips__empty">No comment matches.</p>
    </div>
  </div>
</template>

<script lang="ts">
import { reactive } from 'vue'
import axios from 'axios'

interface BankComment { id: number; text: string; uses: number }

// One list for every feedback box on the page, loaded once
const bank = reactive<{ comments: BankComment[]; loaded: boolean; loading: Promise<void> | null }>({ comments: [], loaded: false, loading: null })
function loadBank() {
  if (bank.loaded || bank.loading) return bank.loading
  bank.loading = axios.get('/api/teacher/comment-bank')
    .then(res => { bank.comments = res.data.data.comments || []; bank.loaded = true })
    .catch(() => { /* no chips - typing still works */ })
    .finally(() => { bank.loading = null })
  return bank.loading
}
</script>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useToastStore } from '@/stores/toast'

const props = withDefaults(defineProps<{ current?: string; disabled?: boolean; show?: number }>(), { current: '', disabled: false, show: 4 })
const emit = defineEmits<{ insert: [text: string] }>()
const toast = useToastStore()

const open = ref(false)
const search = ref('')
const top = computed(() => bank.comments.slice(0, props.show))
const found = computed(() => {
  const q = search.value.trim().toLowerCase()
  return q ? bank.comments.filter(c => c.text.toLowerCase().includes(q)) : bank.comments
})
const saved = computed(() => bank.comments.some(c => c.text === props.current.trim()))

const use = (c: BankComment) => {
  emit('insert', c.text)
  c.uses++
  axios.post(`/api/teacher/comment-bank/${c.id}/used`).catch(() => {})
}
const save = async () => {
  try {
    const res = await axios.post('/api/teacher/comment-bank', { text: props.current })
    bank.comments = res.data.data.comments || bank.comments
    toast.success('Saved to your comments')
  } catch (err: any) {
    toast.error(err.response?.data?.message || 'Could not save the comment')
  }
}
const remove = async (c: BankComment) => {
  try {
    const res = await axios.delete(`/api/teacher/comment-bank/${c.id}`)
    bank.comments = res.data.data.comments || bank.comments.filter(x => x.id !== c.id)
  } catch {
    toast.error('Could not delete the comment')
  }
}

onMounted(loadBank)
</script>

<style scoped>
.comment-chips { display: flex; flex-wrap: wrap; gap: 0.375rem; margin-top: 0.375rem; }
.comment-chips__chip {
  max-width: 100%; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
  padding: 0.25rem 0.625rem; border-radius: 9999px; font-size: 0.75rem; font-weight: 500;
  background: #eef2ff; color: #3730a3; border: 1px solid #e0e7ff; transition: background 0.15s;
}
.comment-chips__chip:hover:not(:disabled) { background: #e0e7ff; }
.comment-chips__chip:disabled { opacity: 0.5; cursor: not-allowed; }
.comment-chips__chip--action { background: transparent; color: #4f46e5; border-style: dashed; border-color: #c7d2fe; font-weight: 600; }
.comment-chips__all { flex-basis: 100%; margin-top: 0.25rem; border: 1px solid #e5e7eb; border-radius: 0.75rem; padding: 0.5rem; background: #fff; }
.comment-chips__search { width: 100%; padding: 0.375rem 0.625rem; border-radius: 0.5rem; border: 1px solid #d1d5db; font-size: 0.8125rem; margin-bottom: 0.375rem; background: inherit; color: inherit; }
.comment-chips__all ul { max-height: 12rem; overflow-y: auto; }
.comment-chips__all li { display: flex; align-items: center; gap: 0.25rem; }
.comment-chips__row { flex: 1; text-align: left; padding: 0.375rem 0.5rem; border-radius: 0.5rem; font-size: 0.8125rem; color: #374151; }
.comment-chips__row:hover:not(:disabled) { background: #f3f4f6; }
.comment-chips__delete { padding: 0.375rem; border-radius: 0.5rem; color: #9ca3af; }
.comment-chips__delete:hover { color: #e11d48; background: #fff1f2; }
.comment-chips__empty { padding: 0.5rem; font-size: 0.8125rem; color: #6b7280; }
.dark .comment-chips__chip { background: rgba(99, 102, 241, 0.15); color: #c7d2fe; border-color: rgba(99, 102, 241, 0.3); }
.dark .comment-chips__chip--action { background: transparent; color: #a5b4fc; }
.dark .comment-chips__all { background: #1f2937; border-color: #374151; }
.dark .comment-chips__row { color: #e5e7eb; }
.dark .comment-chips__row:hover:not(:disabled) { background: #374151; }
.dark .comment-chips__search { border-color: #4b5563; }
</style>
