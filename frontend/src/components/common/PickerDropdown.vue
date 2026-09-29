<template>
  <!-- A styled dropdown: a button showing the current choice (with a small label above it), and a
       menu of options, each with an optional hint on the right (e.g. a count or a percentage) -->
  <div ref="root" class="relative">
    <button
      type="button"
      class="flex items-center gap-2 min-w-[9rem] pl-3 pr-2.5 py-1.5 rounded-xl border bg-white dark:bg-gray-800 text-left transition-colors"
      :class="open ? 'border-indigo-400 ring-2 ring-indigo-100 dark:ring-indigo-900' : 'border-gray-300 dark:border-gray-600 hover:border-gray-400'"
      :aria-expanded="open"
      aria-haspopup="listbox"
      @click="open = !open"
    >
      <span class="flex flex-col min-w-0 flex-1 leading-tight">
        <span v-if="label" class="text-[10px] font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">{{ label }}</span>
        <span class="text-sm font-semibold text-gray-900 dark:text-white truncate">{{ current?.label ?? placeholder }}</span>
      </span>
      <svg class="w-4 h-4 text-gray-400 flex-shrink-0 transition-transform" :class="{ 'rotate-180': open }" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
    </button>

    <transition
      enter-active-class="transition duration-100 ease-out"
      enter-from-class="opacity-0 -translate-y-1"
      leave-active-class="transition duration-75 ease-in"
      leave-to-class="opacity-0 -translate-y-1"
    >
      <ul
        v-if="open"
        role="listbox"
        class="absolute z-30 mt-1.5 min-w-full w-max max-w-[18rem] max-h-72 overflow-y-auto rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-lg p-1"
        :class="align === 'right' ? 'right-0' : 'left-0'"
      >
        <li v-for="o in options" :key="String(o.value)">
          <button
            type="button"
            role="option"
            :aria-selected="o.value === modelValue"
            class="w-full flex items-center gap-3 px-2.5 py-2 rounded-lg text-left text-sm transition-colors"
            :class="o.value === modelValue ? 'bg-indigo-50 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-200 font-semibold' : 'text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700/60'"
            @click="choose(o.value)"
          >
            <span class="flex-1 min-w-0 truncate">{{ o.label }}</span>
            <span v-if="o.hint" class="text-[11px] font-medium flex-shrink-0" :class="o.hintClass || 'text-gray-400 dark:text-gray-500'">{{ o.hint }}</span>
            <svg v-if="o.value === modelValue" class="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"></path></svg>
          </button>
        </li>
      </ul>
    </transition>
  </div>
</template>

<script setup lang="ts" generic="T extends string | number">
import { computed, onBeforeUnmount, ref, watch } from 'vue'

export interface PickerOption<V> { value: V; label: string; hint?: string; hintClass?: string }

const props = withDefaults(defineProps<{
  modelValue: T | null
  options: PickerOption<T>[]
  label?: string
  placeholder?: string
  align?: 'left' | 'right'
}>(), { label: '', placeholder: 'Choose…', align: 'left' })
const emit = defineEmits<{ 'update:modelValue': [value: T] }>()

const root = ref<HTMLElement | null>(null)
const open = ref(false)
const current = computed(() => props.options.find(o => o.value === props.modelValue) ?? null)

const choose = (value: T) => {
  emit('update:modelValue', value)
  open.value = false
}

// Closes on a click outside or Escape
const onPointer = (e: PointerEvent) => { if (!root.value?.contains(e.target as Node)) open.value = false }
const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') open.value = false }
watch(open, (isOpen) => {
  if (isOpen) {
    document.addEventListener('pointerdown', onPointer)
    document.addEventListener('keydown', onKey)
  } else {
    document.removeEventListener('pointerdown', onPointer)
    document.removeEventListener('keydown', onKey)
  }
})
onBeforeUnmount(() => {
  document.removeEventListener('pointerdown', onPointer)
  document.removeEventListener('keydown', onKey)
})
</script>
