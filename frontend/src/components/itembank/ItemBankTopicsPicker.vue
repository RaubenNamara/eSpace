<template>
  <!-- The curriculum topics an Item Bank resource practises - students then find it as practice on
       those topics in their Learning Map. Saved by the parent form (save()) with the rest. -->
  <div class="mb-4">
    <div class="flex items-center justify-between gap-2 mb-1.5">
      <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Topics it practises</label>
      <span v-if="selected.size" class="text-xs font-semibold text-indigo-600 dark:text-indigo-300">{{ selected.size }} selected</span>
    </div>
    <p class="text-xs text-gray-500 dark:text-gray-400 mb-2">Students see it as practice on these topics in their Learning Map.</p>

    <div v-if="loading" class="h-24 rounded-lg bg-gray-100 dark:bg-gray-700 animate-pulse"></div>
    <p v-else-if="!available" class="text-xs text-amber-700 dark:text-amber-300">Topic links aren't set up on this server yet.</p>
    <p v-else-if="!topics.length" class="text-xs text-gray-500 dark:text-gray-400">No curriculum topics this year for this subject and class.</p>
    <template v-else>
      <input v-model="search" type="text" placeholder="Search topics..." class="w-full mb-2 px-3 py-1.5 text-sm border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-indigo-500">
      <div class="max-h-56 overflow-y-auto rounded-lg border border-gray-200 dark:border-gray-700 divide-y divide-gray-100 dark:divide-gray-700">
        <div v-for="group in grouped" :key="group.key">
          <p class="sticky top-0 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-800">{{ group.label }}</p>
          <label v-for="t in group.topics" :key="t.id" class="flex items-start gap-2 px-3 py-1.5 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700/50">
            <input type="checkbox" class="mt-0.5 w-4 h-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" :checked="selected.has(t.id)" @change="toggle(t.id)">
            <span class="text-sm text-gray-800 dark:text-gray-100 leading-snug">{{ t.topic }}</span>
          </label>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import axios from 'axios'

interface TopicGroup { id: number; topic: string; theme_branch: string | null; term_name: string | null; linked: boolean }

const props = defineProps<{ resourceId: number }>()

const loading = ref(true)
const available = ref(true)
const topics = ref<TopicGroup[]>([])
const selected = ref(new Set<number>())
const initial = ref('')
const search = ref('')

const grouped = computed(() => {
  const q = search.value.trim().toLowerCase()
  const groups = new Map<string, { key: string; label: string; topics: TopicGroup[] }>()
  for (const t of topics.value) {
    if (q && !t.topic.toLowerCase().includes(q) && !(t.theme_branch || '').toLowerCase().includes(q)) continue
    const label = [t.term_name, t.theme_branch].filter(Boolean).join(' · ') || 'Topics'
    if (!groups.has(label)) groups.set(label, { key: label, label, topics: [] })
    groups.get(label)!.topics.push(t)
  }
  return [...groups.values()]
})

const toggle = (id: number) => {
  const next = new Set(selected.value)
  if (next.has(id)) next.delete(id)
  else next.add(id)
  selected.value = next
}

const key = () => [...selected.value].sort((a, b) => a - b).join(',')

onMounted(async () => {
  try {
    const response = await axios.get(`/api/teacher/itembank/${props.resourceId}/curriculum`)
    available.value = response.data.data.available !== false
    topics.value = response.data.data.topics || []
    selected.value = new Set(topics.value.filter(t => t.linked).map(t => t.id))
    initial.value = key()
  } catch {
    available.value = false
  } finally {
    loading.value = false
  }
})

/** Saves the chosen topics when they changed; resolves false if saving failed */
const save = async (): Promise<boolean> => {
  if (!available.value || loading.value || key() === initial.value) return true
  try {
    await axios.put(`/api/teacher/itembank/${props.resourceId}/curriculum`, { topic_ids: [...selected.value] })
    initial.value = key()
    return true
  } catch {
    return false
  }
}

defineExpose({ save })
</script>
