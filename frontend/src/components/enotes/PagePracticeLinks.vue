<template>
  <!-- Questions from the Item Bank placed on this eNote page: students meet them right under the
       page as they read. A question from a written paper, or a page of an uploaded past paper -
       set once in the Item Bank, used on any page that needs it. -->
  <div class="pt-4 border-t border-gray-200 dark:border-gray-700">
    <h3 class="text-sm font-medium text-gray-900 dark:text-white mb-1">Practice from the Item Bank</h3>
    <p class="text-[11px] text-gray-500 dark:text-gray-400 mb-2">Students try these right under this page.</p>

    <div v-if="loading" class="h-12 rounded-lg bg-gray-100 dark:bg-gray-700/50 animate-pulse"></div>
    <ul v-else-if="items.length" class="space-y-1.5 mb-2">
      <li v-for="(it, i) in items" :key="`${it.item_id}-${it.item_page}`" class="flex items-start gap-2 rounded-lg border border-gray-200 dark:border-gray-700 px-2.5 py-2">
        <span class="mt-0.5 w-6 h-6 flex-shrink-0 rounded-md flex items-center justify-center text-[10px] font-bold" :class="it.kind === 'paper' ? 'bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-200' : 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300'">{{ it.kind === 'paper' ? 'Q' : 'PDF' }}</span>
        <span class="min-w-0 flex-1">
          <span class="block text-xs font-semibold text-gray-900 dark:text-white truncate">{{ it.title }}</span>
          <span class="block text-[11px] text-gray-500 dark:text-gray-400 line-clamp-2">{{ it.kind === 'paper' ? `Question ${it.item_page}: ${glimpse(it.question?.content)}` : `Page ${it.item_page}` }}</span>
          <span v-if="it.status !== 'published'" class="block text-[10px] font-semibold text-amber-600 dark:text-amber-400">Not published - students won't see it until it is</span>
        </span>
        <button type="button" class="p-1 text-gray-400 hover:text-rose-500" :aria-label="`Remove ${it.title}`" @click="remove(i)">✕</button>
      </li>
    </ul>

    <button type="button" class="w-full px-3 py-2 rounded-lg text-xs font-semibold border border-dashed border-amber-300 dark:border-amber-700 text-amber-800 dark:text-amber-200 hover:bg-amber-50 dark:hover:bg-amber-900/20" :disabled="items.length >= 6" @click="picking = true">
      + Add a question from the Item Bank
    </button>

    <ItemPickerModal v-if="picking" :subject-id="subjectId" :allow-assess="allowAssess" @close="picking = false" @pick="onPick" />
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import axios from 'axios'
import ItemPickerModal, { type ItemPick } from '@/components/enotes/ItemPickerModal.vue'
import { useToastStore } from '@/stores/toast'

interface Linked { item_id: number; item_page: number; title: string; kind: string; status: string; question: { content: string } | null }

const props = withDefaults(defineProps<{ pageId: number; subjectId: number | null; allowAssess?: boolean }>(), { allowAssess: false })
const emit = defineEmits<{ assess: [pick: ItemPick] }>()
const toast = useToastStore()
const items = ref<Linked[]>([])
const loading = ref(false)
const picking = ref(false)

const glimpse = (html?: string) => (html || '').replace(/<[^>]+>/g, ' ').replace(/&nbsp;/g, ' ').replace(/\s+/g, ' ').trim().slice(0, 80)

const load = async () => {
  loading.value = true
  try {
    const res = await axios.get(`/api/teacher/enotes/pages/${props.pageId}/items`)
    items.value = res.data.data.items || []
  } catch {
    items.value = []
  } finally {
    loading.value = false
  }
}

const save = async (list: { item_id: number; item_page: number }[]) => {
  try {
    const res = await axios.put(`/api/teacher/enotes/pages/${props.pageId}/items`, { items: list })
    items.value = res.data.data.items || []
    return true
  } catch (err: any) {
    toast.error(err.response?.data?.errors?.items || err.response?.data?.message || 'Could not save that')
    return false
  }
}

const add = async (pick: { item_id: number; item_page: number }) => {
  if (items.value.some(i => i.item_id === pick.item_id && i.item_page === pick.item_page)) {
    toast.info('That question is already on this page')
    picking.value = false
    return
  }
  if (await save([...items.value.map(i => ({ item_id: i.item_id, item_page: i.item_page })), pick])) {
    picking.value = false
    toast.success('Added - students will meet it under this page')
  }
}

// Practice goes on the page; LOA / AOI become (or join) the ordinary assessment - the builder handles that
const onPick = (pick: ItemPick) => {
  if (pick.purpose === 'practice') return add({ item_id: pick.item_id, item_page: pick.item_page })
  picking.value = false
  emit('assess', pick)
}

const remove = (i: number) => save(items.value.filter((_, j) => j !== i).map(x => ({ item_id: x.item_id, item_page: x.item_page })))

watch(() => props.pageId, load, { immediate: true })
</script>
