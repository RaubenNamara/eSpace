<template>
  <div ref="root" class="relative">
    <!-- looks like the other selects in the form -->
    <button
      type="button"
      :disabled="disabled"
      class="w-full flex items-center justify-between gap-2 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg text-left focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 dark:bg-gray-700 dark:text-white disabled:opacity-50 bg-white"
      :aria-expanded="open"
      aria-haspopup="listbox"
      @click="open = !open"
    >
      <span class="truncate" :class="modelValue.length ? '' : 'text-gray-500 dark:text-gray-400'">{{ summary || placeholder }}</span>
      <svg class="w-4 h-4 flex-shrink-0 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" /></svg>
    </button>

    <div
      v-if="open"
      class="absolute z-30 left-0 right-0 mt-1 max-h-72 overflow-y-auto rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 shadow-xl py-1"
      role="listbox"
      aria-multiselectable="true"
      :aria-label="placeholder"
    >
      <p v-if="!groups.length" class="px-3 py-2 text-sm text-gray-500">No class-streams available.</p>
      <template v-for="g in groups" :key="g.level">
        <!-- the whole class: every stream of it -->
        <label class="flex items-center gap-2 px-3 py-1.5 text-sm font-semibold text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-900/40 cursor-pointer hover:bg-indigo-50 dark:hover:bg-indigo-900/30">
          <input
            type="checkbox"
            class="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
            :checked="state(g) === 'all'"
            :indeterminate.prop="state(g) === 'some'"
            @change="toggleGroup(g, ($event.target as HTMLInputElement).checked)"
          >
          {{ g.level }} <span class="font-normal text-gray-500 dark:text-gray-400">&middot; all streams</span>
        </label>
        <label
          v-for="c in g.streams"
          :key="c.id"
          class="flex items-center gap-2 pl-8 pr-3 py-1.5 text-sm text-gray-800 dark:text-gray-100 cursor-pointer hover:bg-indigo-50 dark:hover:bg-indigo-900/30"
          role="option"
          :aria-selected="modelValue.includes(c.id)"
        >
          <input
            type="checkbox"
            class="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
            :checked="modelValue.includes(c.id)"
            @change="toggle(c.id, ($event.target as HTMLInputElement).checked)"
          >
          {{ c.display_name }}
        </label>
      </template>
      <div class="sticky bottom-0 flex items-center justify-between gap-2 px-3 py-2 border-t border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800">
        <span class="text-xs text-gray-500 dark:text-gray-400">{{ modelValue.length }} selected</span>
        <button type="button" class="px-3 py-1 rounded-md bg-indigo-600 text-white text-xs font-semibold hover:bg-indigo-700" @click="open = false">Done</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
/**
 * The Class-Stream field of the eNote curriculum form, with checkboxes: tick one stream (as the
 * plain dropdown it replaces), several, or a whole class ("S.5 · all streams").
 */
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'

export interface StreamOption { id: number; display_name: string; class_name?: string; stream_name?: string }
export interface StreamGroup { level: string; streams: StreamOption[] }

const props = withDefaults(defineProps<{ options: StreamOption[]; modelValue: number[]; disabled?: boolean; placeholder?: string }>(), {
  disabled: false,
  placeholder: 'Select Class-Stream',
})
const emit = defineEmits<{ 'update:modelValue': [number[]] }>()

const open = ref(false)
const root = ref<HTMLElement | null>(null)

const levelOf = (c: StreamOption) => c.class_name || c.display_name.replace(/-[^-]*$/, '')
const groups = computed<StreamGroup[]>(() => {
  const out: StreamGroup[] = []
  for (const c of props.options) {
    const level = levelOf(c)
    let g = out.find(x => x.level === level)
    if (!g) { g = { level, streams: [] }; out.push(g) }
    g.streams.push(c)
  }
  return out
})
const state = (g: StreamGroup) => {
  const n = g.streams.filter(c => props.modelValue.includes(c.id)).length
  return n === 0 ? 'none' : n === g.streams.length ? 'all' : 'some'
}
/** "S.1 (all streams), S.2-A" */
const summary = computed(() => {
  const parts: string[] = []
  for (const g of groups.value) {
    const st = state(g)
    if (st === 'all' && g.streams.length > 1) parts.push(`${g.level} (all streams)`)
    else if (st !== 'none') parts.push(...g.streams.filter(c => props.modelValue.includes(c.id)).map(c => c.display_name))
  }
  return parts.join(', ')
})
/** keeps the list order, so the first ticked stream is always the first one in the list */
const ordered = (ids: number[]) => props.options.filter(c => ids.includes(c.id)).map(c => c.id)
const toggle = (id: number, on: boolean) => emit('update:modelValue', ordered(on ? [...props.modelValue, id] : props.modelValue.filter(x => x !== id)))
const toggleGroup = (g: StreamGroup, on: boolean) => {
  const ids = g.streams.map(c => c.id)
  emit('update:modelValue', ordered(on ? [...props.modelValue, ...ids] : props.modelValue.filter(x => !ids.includes(x))))
}

const onOutside = (e: MouseEvent) => { if (open.value && root.value && !root.value.contains(e.target as Node)) open.value = false }
const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') open.value = false }
onMounted(() => { document.addEventListener('mousedown', onOutside); document.addEventListener('keydown', onKey) })
onBeforeUnmount(() => { document.removeEventListener('mousedown', onOutside); document.removeEventListener('keydown', onKey) })

defineExpose({ groups, state, summary })
</script>
