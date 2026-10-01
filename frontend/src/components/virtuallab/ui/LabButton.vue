<template>
  <button
    type="button"
    :disabled="disabled"
    class="font-semibold rounded-lg active:scale-95 transition-transform disabled:opacity-50 disabled:pointer-events-none disabled:active:scale-100"
    :class="[variantClass, sizeClass]"
  >
    <slot />
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(defineProps<{
  variant?: 'primary' | 'secondary' | 'danger' | 'success' | 'ghost'
  size?: 'sm' | 'md'
  disabled?: boolean
}>(), { variant: 'primary', size: 'md' })

const variantClass = computed(() => ({
  primary: 'bg-indigo-600 text-white hover:bg-indigo-700',
  secondary: 'border border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 bg-white dark:bg-gray-700',
  danger: 'bg-red-500 text-white hover:bg-red-600',
  success: 'bg-emerald-600 text-white hover:bg-emerald-700',
  ghost: 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700',
}[props.variant]))

const sizeClass = computed(() => (props.size === 'sm' ? 'px-2 py-1 text-[11px]' : 'px-2.5 py-1.5 text-xs'))
</script>
