<!--
  Shared class/stream picker for every teacher content module (Live Class, eNotes, eLibrary,
  Videos, Item Bank, Assignments, Virtual Lab). Renders one "<Class> (All Streams)" entry per
  class level - shown in green, distinct from individual streams - plus the individual streams
  themselves. A native <select> can't reliably colour individual options across browsers, hence
  a small custom listbox here instead.

  The backend never sees or trusts the "(All Streams)" label - selecting it emits
  { scope: 'all_streams', class_id: null, class_group_name: '<name>' }, and an individual stream
  emits { scope: 'stream', class_id: <id>, class_group_name: null }. See
  Controller::resolveClassTarget() for how the backend re-validates this regardless of what's sent.
-->
<template>
  <div ref="rootRef" class="relative">
    <button
      type="button"
      class="w-full flex items-center justify-between px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-left focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 disabled:opacity-60"
      :disabled="disabled || loading"
      :aria-expanded="isOpen"
      aria-haspopup="listbox"
      @click="toggleOpen"
      @keydown.down.prevent="onArrowDown"
      @keydown.up.prevent="onArrowUp"
      @keydown.enter.prevent="onEnterKey"
      @keydown.escape="isOpen = false"
    >
      <span
        class="truncate"
        :class="selectedIsAllStreams ? 'text-green-600 dark:text-green-400 font-medium' : (selectedLabel ? 'text-gray-900 dark:text-white' : 'text-gray-400 dark:text-gray-500')"
      >
        {{ loading ? 'Loading classes...' : (selectedLabel || placeholder) }}
      </span>
      <svg class="w-4 h-4 text-gray-400 flex-shrink-0 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
      </svg>
    </button>

    <ul
      v-if="isOpen"
      role="listbox"
      class="absolute z-20 mt-1 w-full max-h-72 overflow-y-auto bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg py-1"
    >
      <li v-if="groups.length === 0" class="px-3 py-2 text-sm text-gray-500 dark:text-gray-400">
        No classes found in your department
      </li>
      <template v-for="group in groups" :key="group.name + group.level">
        <li
          role="option"
          :aria-selected="modelValue.scope === 'all_streams' && modelValue.class_group_name === group.name"
          class="px-3 py-2 text-sm font-semibold text-green-600 dark:text-green-400 cursor-pointer hover:bg-green-50 dark:hover:bg-green-900/20"
          :class="{ 'bg-green-50 dark:bg-green-900/20': highlightedKey === `all:${group.name}` }"
          @click="selectAllStreams(group)"
          @mouseenter="highlightedKey = `all:${group.name}`"
        >
          {{ group.name }} (All Streams)
        </li>
        <li
          v-for="stream in group.streams"
          :key="stream.id"
          role="option"
          :aria-selected="modelValue.scope === 'stream' && modelValue.class_id === stream.id"
          class="px-3 py-2 pl-6 text-sm text-gray-700 dark:text-gray-300 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700"
          :class="{ 'bg-gray-50 dark:bg-gray-700': highlightedKey === `stream:${stream.id}` }"
          @click="selectStream(stream)"
          @mouseenter="highlightedKey = `stream:${stream.id}`"
        >
          {{ group.name }} - {{ stream.stream_name || 'N/A' }}
          <span class="text-gray-400 dark:text-gray-500">({{ stream.student_count }})</span>
        </li>
      </template>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount, watch } from 'vue'
import apiService from '@/services/api'

export interface ClassTarget {
  scope: 'stream' | 'all_streams'
  class_id: number | null
  class_group_name: string | null
}

interface ClassOption {
  id: number
  name: string
  level: string
  stream_name: string | null
  student_count: number
}

interface ClassGroup {
  name: string
  level: string
  streams: ClassOption[]
}

const props = withDefaults(defineProps<{
  modelValue: ClassTarget
  academicYear?: string
  disabled?: boolean
  placeholder?: string
}>(), {
  disabled: false,
  placeholder: 'Select a class'
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: ClassTarget): void
}>()

const rootRef = ref<HTMLElement | null>(null)
const isOpen = ref(false)
const loading = ref(false)
const classes = ref<ClassOption[]>([])
const highlightedKey = ref<string | null>(null)

const groups = computed<ClassGroup[]>(() => {
  const map = new Map<string, ClassGroup>()
  for (const cls of classes.value) {
    const key = `${cls.name}|${cls.level}`
    if (!map.has(key)) {
      map.set(key, { name: cls.name, level: cls.level, streams: [] })
    }
    map.get(key)!.streams.push(cls)
  }
  return Array.from(map.values())
})

const selectedIsAllStreams = computed(() => props.modelValue.scope === 'all_streams')

const selectedLabel = computed(() => {
  if (props.modelValue.scope === 'all_streams' && props.modelValue.class_group_name) {
    return `${props.modelValue.class_group_name} (All Streams)`
  }
  if (props.modelValue.scope === 'stream' && props.modelValue.class_id) {
    const match = classes.value.find(c => c.id === props.modelValue.class_id)
    if (match) return `${match.name} - ${match.stream_name || 'N/A'}`
  }
  return ''
})

const toggleOpen = () => {
  if (props.disabled || loading.value) return
  isOpen.value = !isOpen.value
}

const selectStream = (stream: ClassOption) => {
  emit('update:modelValue', { scope: 'stream', class_id: stream.id, class_group_name: null })
  isOpen.value = false
}

const selectAllStreams = (group: ClassGroup) => {
  emit('update:modelValue', { scope: 'all_streams', class_id: null, class_group_name: group.name })
  isOpen.value = false
}

// Flattened order for keyboard navigation, mirroring the rendered list.
const flatItems = computed(() => {
  const items: Array<{ key: string; select: () => void }> = []
  for (const group of groups.value) {
    items.push({ key: `all:${group.name}`, select: () => selectAllStreams(group) })
    for (const stream of group.streams) {
      items.push({ key: `stream:${stream.id}`, select: () => selectStream(stream) })
    }
  }
  return items
})

const onArrowDown = () => {
  if (!isOpen.value) {
    isOpen.value = true
    return
  }
  const items = flatItems.value
  if (items.length === 0) return
  const currentIndex = items.findIndex(i => i.key === highlightedKey.value)
  const nextIndex = currentIndex < items.length - 1 ? currentIndex + 1 : 0
  highlightedKey.value = items[nextIndex].key
}

const onArrowUp = () => {
  if (!isOpen.value) return
  const items = flatItems.value
  if (items.length === 0) return
  const currentIndex = items.findIndex(i => i.key === highlightedKey.value)
  const prevIndex = currentIndex > 0 ? currentIndex - 1 : items.length - 1
  highlightedKey.value = items[prevIndex].key
}

const onEnterKey = () => {
  if (!isOpen.value) {
    isOpen.value = true
    return
  }
  const item = flatItems.value.find(i => i.key === highlightedKey.value)
  item?.select()
}

const onClickOutside = (event: MouseEvent) => {
  if (rootRef.value && !rootRef.value.contains(event.target as Node)) {
    isOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', onClickOutside)
  loadClasses()
})

onBeforeUnmount(() => {
  document.removeEventListener('click', onClickOutside)
})

const loadClasses = async () => {
  loading.value = true
  try {
    const params: Record<string, string> = {}
    if (props.academicYear) params.academic_year = props.academicYear
    const response = await apiService.get('/teacher/classes', { params })
    if (response.data?.success && response.data?.data) {
      classes.value = response.data.data
    }
  } catch (error) {
    console.error('TeacherClassSelector: failed to load classes:', error)
  } finally {
    loading.value = false
  }
}

watch(() => props.academicYear, loadClasses)

defineExpose({ reload: loadClasses })
</script>
