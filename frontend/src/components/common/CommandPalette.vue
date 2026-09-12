<template>
  <Transition name="palette-fade">
    <div
      v-if="modelValue"
      class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-start justify-center pt-[12vh] z-[9999] p-4"
      @click.self="close"
    >
      <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden flex flex-col max-h-[70vh]">
        <div class="flex items-center gap-3 px-4 py-3 border-b border-gray-100 dark:border-gray-700 flex-shrink-0">
          <svg class="w-5 h-5 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
          </svg>
          <input
            ref="inputRef"
            v-model="query"
            type="text"
            placeholder="Jump to a page..."
            class="flex-1 bg-transparent outline-none text-sm text-gray-900 dark:text-white placeholder-gray-400"
            @keydown.down.prevent="moveSelection(1)"
            @keydown.up.prevent="moveSelection(-1)"
            @keydown.enter.prevent="selectActive"
            @keydown.esc="close"
          >
          <kbd class="hidden sm:inline text-[10px] font-semibold text-gray-400 border border-gray-200 dark:border-gray-600 rounded px-1.5 py-0.5 flex-shrink-0">Esc</kbd>
        </div>

        <div ref="listRef" class="overflow-y-auto flex-1 py-2">
          <p v-if="filtered.length === 0" class="px-4 py-8 text-center text-sm text-gray-400">No matching pages</p>
          <button
            v-for="(item, index) in filtered"
            :key="item.path"
            :ref="el => setItemRef(el, index)"
            type="button"
            class="w-full flex items-center gap-3 px-4 py-2.5 text-left text-sm transition-colors"
            :class="index === activeIndex ? 'bg-indigo-50 dark:bg-indigo-500/10 text-indigo-700 dark:text-indigo-300' : 'text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700/50'"
            @click="select(item)"
            @mouseenter="activeIndex = index"
          >
            <component :is="item.icon" v-if="item.icon" class="w-4 h-4 flex-shrink-0 text-gray-400" />
            <span class="flex-1 truncate font-medium">{{ item.label }}</span>
            <span v-if="item.section" class="text-xs text-gray-400 flex-shrink-0">{{ item.section }}</span>
          </button>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { ref, computed, watch, nextTick } from 'vue'
import { useRouter } from 'vue-router'

export interface CommandItem {
  path: string
  label: string
  section?: string
  icon?: any
}

const props = defineProps<{ modelValue: boolean; items: CommandItem[] }>()
const emit = defineEmits<{ 'update:modelValue': [value: boolean] }>()

const router = useRouter()
const query = ref('')
const activeIndex = ref(0)
const inputRef = ref<HTMLInputElement | null>(null)
const itemRefs = ref<(HTMLElement | null)[]>([])

const setItemRef = (el: any, index: number) => {
  itemRefs.value[index] = el
}

const filtered = computed(() => {
  const q = query.value.trim().toLowerCase()
  if (!q) return props.items
  return props.items.filter(item => item.label.toLowerCase().includes(q) || item.section?.toLowerCase().includes(q))
})

// Keep the highlighted row in range whenever the filtered list shrinks/changes with typing.
watch(filtered, () => {
  activeIndex.value = 0
})

watch(() => props.modelValue, async (open) => {
  if (open) {
    query.value = ''
    activeIndex.value = 0
    await nextTick()
    inputRef.value?.focus()
  }
})

const moveSelection = (delta: number) => {
  if (filtered.value.length === 0) return
  activeIndex.value = (activeIndex.value + delta + filtered.value.length) % filtered.value.length
  itemRefs.value[activeIndex.value]?.scrollIntoView?.({ block: 'nearest' })
}

const close = () => emit('update:modelValue', false)

const select = (item: CommandItem) => {
  close()
  router.push(item.path)
}

const selectActive = () => {
  const item = filtered.value[activeIndex.value]
  if (item) select(item)
}
</script>

<style scoped>
.palette-fade-enter-active,
.palette-fade-leave-active {
  transition: opacity 0.15s ease;
}
.palette-fade-enter-from,
.palette-fade-leave-to {
  opacity: 0;
}
</style>
